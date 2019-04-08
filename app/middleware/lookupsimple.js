module.exports = (channel, scope, term, finder, solved) => {
    if (scope.length === 0) {
        channel.send(`No ${term} specified. Please specify a(n) ${term}.`);
        return;
    }

    const found = finder(scope.join(' ') + '*');

    if (found.flagged) {
        channel.send(`I'm unsure about that... Did you mean '*${found.meant}*'`);
        return;
    }

    solved(found);
};
