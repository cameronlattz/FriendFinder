const fs = require("fs");

module.exports = function(app) {
    // function that takes in a callback, reads friends.js, and sends the data back in to the callback
    const readFile = function(func) {
        fs.readFile("app/data/friends.js", "utf8", function(error, data) {
            if (error) return console.log(error);
            const friends = JSON.parse(data);
            func(friends);
        });
    }

    // api/friends GET endpoint
    app.get("/api/friends", function(req, res) {
        readFile(function(friends) {
            res.send(friends);
        });
    });

    // api/friends POST endpoint
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
            // iterate through friends
            friends.forEach(friend => {
                // find the difference between each set of scores
                let difference = 0;
                // iterate through the scores
                friend.scores.forEach((friendScore, index) => {
                    // add the difference between two scores to the total difference
                   difference += Math.abs(friendScore - user.scores[index]);
                });
                // if the difference found is less than the currently "closest" friend's difference,
                // set closestFriend and closestFriendDifference to the iterated friend
                if (difference < closestFriendDifference) {
                    closestFriend = friend;
                    closestFriendDifference = difference;
                }
            });
            // add the user to the friends list
            friends.push(user);
            // write the new friends list to the friends.js file
            fs.writeFile("app/data/friends.js", JSON.stringify(friends), function(error) {
                if (error) return console.log(error);
            });
            res.send(closestFriend);
        });
    });
};