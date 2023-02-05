const chartElement = document.getElementById('lineage-chart');
const myChart = echarts.init(chartElement);

const resumesToAdd = [...resumes];
const progenitors = {
    Young: {
        id: 'Young',
        name: 'Young',
        symbolSize: 20,
        fixed: true,
        x: myChart.getWidth() * (1 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    Engle: {
        id: 'Engle',
        name: 'Engle',
        symbolSize: 20,
        fixed: true,
        x: myChart.getWidth() * (2 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    Lousma: {
        id: 'Lousma',
        name: 'Lousma',
        symbolSize: 20,
        fixed: true,
        x: myChart.getWidth() * (3 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    Mattingly: {
        id: 'Mattingly',
        name: 'Mattingly',
        symbolSize: 20,
        fixed: true,
        x: myChart.getWidth() * (4 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    Brand: {
        id: 'Brand',
        name: 'Brand',
        symbolSize: 20,
        fixed: true,
        x: myChart.getWidth() * (5 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    Weitz: {
        id: 'Weitz',
        name: 'Weitz',
        symbolSize: 20,
        fixed: true,
        x: myChart.getWidth() * (6 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
};

const option = {
    series: [
        {
            data: [],
            links: [],

            type: 'graph',
            layout: 'force',
            roam: true,
            animation: false,
            force: {
                // initLayout: 'circular'
                gravity: 0.3,
                repulsion: 100,
                edgeLength: 5,
            },
        },
    ],
};

myChart.setOption(option);

const sharesFlight = (myMissions, resume) => {
    const sharedFlight = resume.flights.find((f) =>
        myMissions.includes(f.mission),
    );
    if (sharedFlight) return true;
};

const addResume = ({name, flights}) => {
    //
    // Add person
    //
    const datapoint = progenitors[name] ? progenitors[name] : {id: name, name};
    option.series[0].data.push(datapoint);

    //
    // Add links
    //
    // Assemble mission names
    const myMissions = flights.map((f) => f.mission);

    // Filter all resumes down to those that share a flight
    const linkTargets = resumes.filter((resume) =>
        sharesFlight(myMissions, resume),
    );

    // Get names of people that share a flight
    const linkTargetIds = linkTargets.map((r) => r.name);

    // Create links between me and them
    const newLinks = linkTargetIds.map((theirName) => [name, theirName]);

    // Add links
    option.series[0].links.push(...newLinks);

    //
    // Update chart
    //
    myChart.setOption(option);
};

const resumeTick = () => {
    let resume = resumesToAdd.shift();

    addResume(resume);
    setTimeout(resumeTick, 500);
};

// resumeTick();
