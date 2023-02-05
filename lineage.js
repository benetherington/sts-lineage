const chartElement = document.getElementById('lineage-chart');
const myChart = echarts.init(chartElement);

const data = [
    {
        id: 'Young',
        name: 'Young',
        symbolSize: 20,
        // fixed: true,
        x: myChart.getWidth() * (1 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    {
        id: 'Engle',
        name: 'Engle',
        symbolSize: 20,
        // fixed: true,
        x: myChart.getWidth() * (2 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    {
        id: 'Lousma',
        name: 'Lousma',
        symbolSize: 20,
        // fixed: true,
        x: myChart.getWidth() * (3 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    {
        id: 'Mattingly',
        name: 'Mattingly',
        symbolSize: 20,
        // fixed: true,
        x: myChart.getWidth() * (4 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    {
        id: 'Brand',
        name: 'Brand',
        symbolSize: 20,
        // fixed: true,
        x: myChart.getWidth() * (5 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
    {
        id: 'Weitz',
        name: 'Weitz',
        symbolSize: 20,
        // fixed: true,
        x: myChart.getWidth() * (6 / 7),
        y: myChart.getHeight() / 5,
        label: {show: true},
    },
];
const links = [
    {source: 'Young', target: 'Crippen'},
    {source: 'Young', target: 'Shaw'},
    {source: 'Young', target: 'Garriott'},
    {source: 'Young', target: 'Parker'},
    {source: 'Young', target: 'Merbold'},
    {source: 'Young', target: 'Lichtenberg'},
    {source: 'Engle', target: 'Truly'},
    {source: 'Engle', target: 'van Hoften'},
    {source: 'Engle', target: 'Covey'},
    {source: 'Engle', target: 'Lounge'},
    {source: 'Engle', target: 'W. Fisher'},
    {source: 'Lousma', target: 'Fullerton'},
    {source: 'Mattingly', target: 'Hartsfield'},
    {source: 'Mattingly', target: 'Shriver'},
    {source: 'Mattingly', target: 'Onizuka'},
    {source: 'Mattingly', target: 'Buchli'},
    {source: 'Mattingly', target: 'Payton MSE'},
    {source: 'Brand', target: 'Overmyer'},
    {source: 'Brand', target: 'J. Allen'},
    {source: 'Brand', target: 'Lenoir'},
    {source: 'Brand', target: 'Parker'},
    {source: 'Brand', target: 'Gibson'},
    {source: 'Brand', target: 'McCandless'},
    {source: 'Brand', target: 'McNair'},
    {source: 'Brand', target: 'Stewart'},
    {source: 'Brand', target: 'Hoffman'},
    {source: 'Brand', target: 'Lounge'},
    {source: 'Brand', target: 'G. Gardner'},
    {source: 'Brand', target: 'Durrance'},
    {source: 'Brand', target: 'Parise'},
    {source: 'Weitz', target: 'Bobko'},
    {source: 'Weitz', target: 'Peterson'},
    {source: 'Weitz', target: 'Musgrave'},
];

progenitors = {
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
            data,
            links,

            type: 'graph',
            layout: 'circular',
            autoCurveness: true,
            roam: true,
            animation: false,
            // force: {
            //     gravity: 0,
            //     repulsion: 20,
            //     edgeLength: 200,
            //     layoutAnimation: false,
            // },
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

// let y = 200;
const addResume = ({name, flights}) => {
    //
    // Add person
    //
    // const x = Math.round(Math.random() * myChart.getWidth());
    // y += 10;
    data.push({
        id: name,
        name,
        label: {show: true},
        y: 400,
    });
    console.log(`Adding ${name}`);

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
    const newLinks = linkTargetIds
        .map((theirName) => {
            // Don't link to myself
            if (name === theirName) return;

            // Don't add duplicate links
            const reverseExists = links.find(
                (link) => link.source === theirName && link.target === name,
            );
            if (!reverseExists) return {source: name, target: theirName};
        })
        .filter((l) => l);

    // Add links
    links.push(...newLinks);

    //
    // Update chart
    //
    myChart.setOption(option);
};

const resumesToAdd = [...resumes];
resumesToAdd.shift();

const resumeTick = () => {
    const resume = resumesToAdd.shift();
    if (progenitors[resume.name]) {
        resumeTick();
    } else {
        addResume(resume);
        setTimeout(resumeTick, 1);
    }
};

resumeTick();
