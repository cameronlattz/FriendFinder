const express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routing/apiRoutes.js")(app);
require("./routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});