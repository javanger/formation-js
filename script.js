function sendPersonne() {

    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;

    var myObj = { name: name, password: password }

    var xhr = new XMLHttpRequest();
    var url = "http://loisirs-web-backend.cleverapps.io/users";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(myObj));

}

function deleteUndefined(id) {

    var xhr = new XMLHttpRequest();
    var url = "http://loisirs-web-backend.cleverapps.io/users/" + id;
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();

}

function JSONtoUndefined(reponse) {

    var myObj = JSON.parse(reponse);

    var compteur = 0

    myObj.forEach(function (personne) {

        if (personne.name == undefined || personne.name == "" || personne.password == "") {
            deleteUndefined(personne.id);

            compteur += 1;
        }

    });

    alert("Suppression de " + compteur + " personnes");
}

function getAllPersonns() {

    const req = new XMLHttpRequest();

    req.onreadystatechange = function (event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log("Réponse reçue: %s", this.responseText);
                var reponse = this.responseText;

                JSONtoUndefined(reponse);

            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('GET', 'http://loisirs-web-backend.cleverapps.io/users', true);
    req.send(null);
}