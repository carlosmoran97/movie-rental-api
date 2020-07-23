module.exports = (errors) => {
    return [...new Set(errors.array().map(error => error.msg))];
};