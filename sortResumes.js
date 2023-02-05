const fs = require('fs');

const flights = require('./flights.json');
const resumes = {};

flights.forEach(({crew, ...rest}) => {
    Object.entries(crew).forEach(([title, name]) => {
        const flight = {...rest, title};

        if (name in resumes) {
            resumes[name].push(flight);
        } else {
            resumes[name] = [flight];
        }
    });
});

const resumeList = Object.entries(resumes).map(([name, flights]) => {
    return {name, flights};
});

fs.writeFileSync('resumes.json', JSON.stringify(resumeList));
