const path = require("path");

module.exports = function(app) {
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../app/public/survey.html"));
    });

    // routes that don't have a .
    app.get(/^[^\.]*$/, function(req, res) {
        res.sendFile(path.join(__dirname, "../app/public/home.html"));
    });

    // all other routes
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../app/public/" + req.url));
    });
};