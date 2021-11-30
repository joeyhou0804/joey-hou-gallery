module.exports.index = async (req, res) => {
    res.render('stations/index');
}

module.exports.renderNewForm = (req, res) => {
    res.render('stations/new');
}