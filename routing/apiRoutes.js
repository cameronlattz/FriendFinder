module.exports = function(app) {
    app.get("/api/all", function(req, res) {
        res.send(["test","two"]);
        console.log("api/all");
    });

    app.post("/api/new", function(req, res) {
        const form = req.body;
        console.log("api/new");
    });
};
