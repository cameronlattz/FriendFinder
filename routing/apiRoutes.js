const fs = require("fs");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        fs.readFile("app/data/friends.js", "utf8", function(error, data) {
            if (error) return console.log(error);
            const friends = JSON.parse(data);
            res.send(friends);
        });
    });

    app.post("/api/friends", function(req, res) {
        const friend = JSON.stringify(req.body);
        fs.appendFile("app/data/friends.js", ",\n" + friend, function(error) {
            if (error) return console.log(error);
        });
    });
};
