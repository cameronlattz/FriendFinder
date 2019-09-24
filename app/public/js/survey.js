(function() {
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
                console.log(responseJson);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();