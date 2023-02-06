const chartElement = document.getElementById('lineage-chart');
const myChart = echarts.init(chartElement);

progenitors = ['Young', 'Engle', 'Lousma', 'Mattingly', 'Brand', 'Weitz'];

const data = [];
const links = [];
const option = {
    series: [
        {
            data,
            links,

            type: 'graph',
            layout: 'circular',
            roam: true,
            animation: false,

            emphasis: {
                focus: 'adjacency',
                lineStyle: {
                    width: 2,
                },
                edgeLabel: {
                    show: true,
                },
            },

            // force: {
            //     gravity: 0,
            //     repulsion: 20,
            //     edgeLength: 200,
            //     layoutAnimation: false,
            // },
        },
    ],
};
const linkDefaults = {
    curveness: 0.5,
};

const buildDataPoint = (myResume) => ({
    id: myResume.name,
    name: myResume.name,
    symbolSize: 20,
    label: {show: true},
});

const buildLink = (myResume, theirResume) => ({
    source: myResume.name,
    target: theirResume.name,
    // label: {
    //     formatter: getSharedFlights(myResume, theirResume).join(', '),
    // },
    // ...linkDefaults,
});

// let y = 200;
const addResume = (myResume) => {
    // Add this person
    data.push({
        id: myResume.name,
        name: myResume.name,
        label: {show: true},
    });

    // Create links
    const newLinks = myResume.outboundLinks.map((outbound) => {
        const theirResume = resumes.find((r) => r.name === outbound);
        return buildLink(myResume, theirResume);
    });

    // Add links
    links.push(...newLinks);
};

// resumes.forEach((resume) => {
//     if (progenitors[resume.name]) return;
//     addResume(resume);
// });

myChart.setOption(option);

const resumesToAdd = [...resumes];

const resumeTick = () => {
    if (!resumesToAdd.length) return;

    const resume = resumesToAdd.shift();
    const titles = resume.flights.map((f) => f.title);
    const wasCDR = titles.includes('commander');
    const wasPLT = titles.includes('pilot');

    if (!wasCDR && !wasPLT) return resumeTick();

    addResume(resume);
    myChart.setOption(option);
    setTimeout(resumeTick, 1);
};

resumeTick();
