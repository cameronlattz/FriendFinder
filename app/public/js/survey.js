// anonymous closure to protect data
(function() {
    // function to handle hiding/showing modal
    const displayModal = function(show) {
        if (show) {
            document.getElementById("modal").classList.add("show");
            document.getElementById("fade").classList.add("show");
        } else {
            document.getElementById("modal").classList.remove("show");
            document.getElementById("fade").classList.remove("show");
        }
    }
    // initial function
    const init = function() {
        // when submitting the form
        document.getElementById("surveyForm").addEventListener("submit", function(event) {
            event.preventDefault();
            // get a collection of all the selects on the page
            const selects = document.getElementsByTagName("select");
            // turn the collection into an array of values
            const scores = Array.from(selects, select => Number(select.value));
            const name = document.getElementById("name").value;
            const photo = document.getElementById("photo").value;
            const body = {
                name,
                photo,
                scores
            };
            // post the user's information
            fetch("/api/friends", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              })
            .then(function (response) { return response.json(); })
            .then(function (responseJson) {
                document.getElementById("friendName").innerHTML = responseJson.name;
                document.getElementById("friendPhoto").src = responseJson.photo;
                displayModal(true);
            });
        });
        // get all the close buttons and add an event listener to them
        const closeButtons = Array.from(document.getElementsByClassName("close"));
        closeButtons.forEach(closeButton =>
            closeButton.addEventListener("click", function(event) {
                displayModal(false);
            })
        );
    }

    // run this after the page is loaded
    document.addEventListener("DOMContentLoaded", init);
})();