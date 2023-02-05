const csv = require('csv-parse');
const fs = require('fs');

const parseFlights = async () => {
    const lines = await new Promise((resolve, reject) => {
        const parser = csv.parse({delimiter: ','}, function (err, data) {
            if (data) resolve(data);
            if (err) reject(err);
        });
        fs.createReadStream('./flights.csv').pipe(parser);
    });

    const header = lines.shift();
    const flights = lines.map((line) => {
        const [
            order,
            day,
            year,
            mission,
            shuttle,
            duration,
            commander,
            pilot,
            mission1,
            mission2,
            mission3,
            mission4,
            mission5,
            payload1,
            payload2,
            payload3,
            landing,
        ] = line.map((v) => v.trim());

        const crewValues = [
            ['commander', commander],
            ['pilot', pilot],
            ['mission1', mission1],
            ['mission2', mission2],
            ['mission3', mission3],
            ['mission4', mission4],
            ['mission5', mission5],
            ['payload1', payload1],
            ['payload2', payload2],
            ['payload3', payload3],
            ['landing', landing],
        ];
        const crewEntries = crewValues.filter((e) => e[1]);

        const crew = Object.fromEntries(crewEntries);

        return {order, day, year, mission, shuttle, duration, crew};
    });
    return flights;
};

const main = async () => {
    const flights = await parseFlights();
    const flightStr = JSON.stringify(flights);
    fs.writeFileSync('flights.json', flightStr);
};

main();
