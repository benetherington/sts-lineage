const fs = require('fs');
const resumes = require('./resumes.json');

const links = [];

const getSharedFlights = ({flights: myFlights}, {flights: theirFlights}) => {
    // Grab mission names
    const myMissions = myFlights.map((f) => f.mission);

    // Find shared flights
    const sharedFlights = theirFlights.filter(({mission: theirMission}) =>
        myMissions.includes(theirMission),
    );

    return sharedFlights.map((f) => f.mission);
};

const isValidLink = ({name: myName}, {name: theirName}) => {
    // Don't link to myself
    if (myName === theirName) return;

    // Don't add duplicate links
    const reverseExists = links.find(
        (link) => link.source === theirName && link.target === myName,
    );
    if (reverseExists) return;

    return true;
};

const buildLink = (myResume, theirResume) => ({
    source: myResume.name,
    target: theirResume.name,
});

const assignInboundLink = ({source, target}) => {
    const targetResume = resumes.find((r) => r.name === target);

    if (!targetResume.inboundLinks) targetResume.inboundLinks = [source];
    else if (!targetResume.inboundLinks.includes(source))
        targetResume.inboundLinks.push(source);
};

const addResume = (myResume) => {
    // Create links
    const newLinks = resumes
        // Filter all resumes down to those that share a flight
        .filter((theirResume) => getSharedFlights(myResume, theirResume).length)
        // Filter out existing links
        .filter((theirResume) => isValidLink(myResume, theirResume))
        // Build link
        .map((theirResume) => buildLink(myResume, theirResume));

    // Add outbound links
    myResume.outboundLinks = newLinks.map((l) => l.target);

    // Invalidate links for future
    links.push(...newLinks);

    // Add inbound links
    newLinks.map(assignInboundLink);
};

resumes.forEach(addResume);

fs.writeFileSync('lineage.json', JSON.stringify(resumes));
fs.writeFileSync(
    'lineage-data.js',
    'const resumes = ' + JSON.stringify(resumes),
);
