const {lookupArtifact} = require('../../artifacts');
const {generateArtifactDetails} = require('../../idlecanvas');

function check(artifact, channel) {
    if (artifact.flagged) {
        channel.send(`I'm unsure of that... did you mean '*${artifact.name}*'?`);
        return false;
    }

    return true;
}

async function lookup(channel, scope) {
    if (scope.length === 0) {
        channel.send('Please specify an artifact name.');
        return;
    }

    const artifactRaw = scope.join(' ');

    if (artifactRaw.includes('vs') || artifactRaw.includes('compare')) {
        // Try to get two artifacts to compare?
        const both = artifactRaw
            .replace(/([ ]+vs[ ]+)|([ ]+compare[d]?[ ]+(to *)?)/g, ',')
            .split(',');

        if (both.length < 2) {
            channel.send('When comparing artifacts, specify two.');
            return;
        }

        const a1 = lookupArtifact(both[0]), a2 = lookupArtifact(both[1]);

        if (!a1 || !a2) {
            channel.send(`I don't know what one of these is, ${both[0]} or ${both[1]}`);
            return;
        }

        if (!check(a1, channel) || !check(a2, channel)) {
            return;
        }

        channel.send({
            files: [{
                attachment: await generateArtifactDetails([a1, a2]),
                name: 'compare.png'
            }]
        });
        return;
    }

    const artifact = lookupArtifact(artifactRaw);

    if (!artifact) {
        channel.send(`No such artifact, ${artifactRaw}`);
        return;
    }

    if (!check(artifact, channel)) {
        return;
    }

    channel.send({
        files: [{
            attachment: await generateArtifactDetails(artifact),
            name: 'artifact.png'
        }]
    });
}

module.exports = {
    artifact: {
        aliases: ['artifact', 'art', 'a', 'artifacts'],
        command: lookup
    }
};
