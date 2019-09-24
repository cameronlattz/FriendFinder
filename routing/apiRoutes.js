const fs = require("fs");

module.exports = function(app) {
    const readFile = function(func) {
        fs.readFile("app/data/friends.js", "utf8", function(error, data) {
            if (error) return console.log(error);
            const friends = JSON.parse(data);
            func(friends);
        });
    }

    app.get("/api/friends", function(req, res) {
        readFile(res.send);
    });

    app.post("/api/friends", function(req, res) {
        const user = req.body;
        readFile(function(friends) {
            let closestFriend = {
                name: "No friends added yet.",
                photo: "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/blogs/148105/2014/07/154399-158210.png",
                scores: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
            };
            let closestFriendDifference = 200;
            friends.forEach(friend => {
                let difference = 0;
                friend.scores.forEach((friendScore, index) => {
                   difference += Math.abs(friendScore - user.scores[index]);
                });
                if (difference < closestFriendDifference) {
                    closestFriend = friend;
                    closestFriendDifference = difference;
                }
                console.log(closestFriendDifference);
            });
            friends.push(user);
            fs.writeFile("app/data/friends.js", JSON.stringify(friends), function(error) {
                if (error) return console.log(error);
            });
            res.send(closestFriend);
        });
    });
};