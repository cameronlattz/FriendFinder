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
        readFile(function(friends) {
            res.send(friends);
        });
    });

    app.post("/api/friends", function(req, res) {
        const user = req.body;
        readFile(function(friends) {
            // setting a default friend in case none are found
            let closestFriend = {
                name: "No friends added yet.",
                photo: "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/blogs/148105/2014/07/154399-158210.png",
            };
            // setting the difference between scores as the highest number possible so any other friend besides default
            // will have a lower score
            let closestFriendDifference = Number.MAX_SAFE_INTEGER;
            friends.forEach(friend => {
                let difference = 0;
                friend.scores.forEach((friendScore, index) => {
                   difference += Math.abs(friendScore - user.scores[index]);
                });
                if (difference < closestFriendDifference) {
                    closestFriend = friend;
                    closestFriendDifference = difference;
                }
            });
            friends.push(user);
            fs.writeFile("app/data/friends.js", JSON.stringify(friends), function(error) {
                if (error) return console.log(error);
            });
            res.send(closestFriend);
        });
    });
};