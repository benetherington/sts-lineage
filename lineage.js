const chartElement = document.getElementById('lineage-chart');
const myChart = echarts.init(chartElement);

progenitors = ['Young', 'Engle', 'Lousma', 'Mattingly', 'Brand', 'Weitz'];

const data = [];
const links = [];
const option = {
    backgroundColor: '#333',
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
const progenitorDefautlts = {
    symbolSize: 20,
};
const linkDefaults = {
    lineStyle: {curveness: 0.2},
};

// myChart.on('mouseover', ({dataType, data: {id}}) => {
//     if (dataType !== 'node') return;
//     console.log(id);

//     const outboundConnections = links.filter(({source}) => source === id);
//     const inboundConnections = links.filter(({target}) => target === id);

//     const outboundNames = outboundConnections.map(
//         ({target}) => `${id}-${target}`,
//     );
//     const inboundNames = inboundConnections.map(
//         ({source}) => `${source}-${id}`,
//     );

//     myChart.dispatchAction({
//         type: 'highlight',
//         name: [...outboundNames, ...inboundNames],
//         seriesIndex: 0,
//     });
// });
// myChart.on('mouseout', ({dataType, dataIndex}) => {
//     if (dataType !== 'node') return;
// });

const buildDataPoint = (myResume) => ({
    id: myResume.name,
    name: myResume.name,
    symbolSize: 20,
    label: {show: true},
});

const buildLink = (myResume, theirResume) => ({
    id: `${myResume.name}-${theirResume.name}`,
    source: myResume.name,
    target: theirResume.name,
    // label: {
    //     formatter: getSharedFlights(myResume, theirResume).join(', '),
    // },
    ...linkDefaults,
});

// let y = 200;
const addResume = (myResume) => {
    let addl = {};

    if (progenitors.includes(myResume.name)) {
        addl = progenitorDefautlts;
    }

    let R = 255;
    let G = 255;
    let B = 255;
    if (myResume.wasCDR) {
        R = 128;
    }
    if (myResume.wasPLT) {
        G = 128;
    }

    data.push({
        id: myResume.name,
        name: myResume.name,
        label: {show: true},
        itemStyle: {color: `rgb(${R},${G},${B})`},
        ...addl,
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

    addResume({...resume, wasCDR, wasPLT});
    myChart.setOption(option);
    setTimeout(resumeTick, 1);
};

resumeTick();
