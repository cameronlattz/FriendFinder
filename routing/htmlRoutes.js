const path = require("path");

module.exports = function(app) {
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../app/public/survey.html"));
    });

    app.get("/js/survey.js", function(req, res) {
        res.sendFile(path.join(__dirname, "../app/public/js/survey.js"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../app/public/home.html"));
    });
};