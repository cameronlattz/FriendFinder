(function() {
    const displayModal = function(show) {
        if (show) {
            document.getElementById("modal").classList.add("show");
            document.getElementById("fade").classList.add("show");
        } else {
            document.getElementById("modal").classList.remove("show");
            document.getElementById("fade").classList.remove("show");
        }
    }
    const init = function() {
        document.getElementById("surveyForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const selects = document.getElementsByTagName("select");
            const scores = Array.from(selects, select => Number(select.value));
            const name = document.getElementById("name").value;
            const photo = document.getElementById("photo").value;
            const body = {
                name,
                photo,
                scores
            };
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
        const closeButtons = Array.from(document.getElementsByClassName("close"));
        closeButtons.forEach(closeButton =>
            closeButton.addEventListener("click", function(event) {
                displayModal(false);
            })
        );
    }

    document.addEventListener("DOMContentLoaded", init);
})();