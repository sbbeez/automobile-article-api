exports.validateString = (value) => {
    return value == "" || value == undefined;
}

exports.validateNumber = (value) => {
    return value == "" || value == undefined || value < 0;
}
