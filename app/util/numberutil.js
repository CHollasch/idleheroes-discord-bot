module.exports = {
    commas: (number) => {
        const str = number.toString();
        const matcher = /\B(?=(\d{3})+(?!\d))/g;

        if (str.includes('.')) {
            return str.substring(0, str.indexOf('.')).replace(matcher, ',') + str.substring(str.indexOf('.'));
        } else {
            return number.toString().replace(matcher, ",");
        }
    }
};
