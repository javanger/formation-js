const req = new XMLHttpRequest();

  req.onreadystatechange = function(event) {
    // XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            console.log("Réponse reçue: %s", this.responseText);
            var tableau = JSON.parse(this.responseText);
            var chaine = "<table border='2' width='200'>"
            chaine += "<tr><th>Id.</th><th>Name</th><th>Password</th></tr>"
            tableau.forEach(personne => {
              if(personne.name)
                chaine +="<tr><td>" + personne.id + "</td><td>"
                  + personne.name + "</td><td>"
                  + personne.password + "</td></tr>"
              }
            )
            chaine +="</table>"
            document.getElementById('test').innerHTML = chaine
        } else {
            console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
    }
  };
  req.open('GET', 'http://app-6443389f-f19e-4b11-80f6-6975352681e5.cleverapps.io/users', true);
  req.send(null);

  document.querySelector('#add').addEventListener('click', function(evt){
    evt.preventDefault();

    const requete = new XMLHttpRequest();

    var nom = document.getElementById('nom').value;
    var pass = document.getElementById('password').value;
    var temp = { name : nom , password : pass };
    var variable = JSON.stringify(temp);

    requete.open('POST', 'http://app-6443389f-f19e-4b11-80f6-6975352681e5.cleverapps.io/users', true);
    requete.setRequestHeader("Content-type", 'application/json');
    requete.send(variable);
  })

  function deleteUndefined(id) {

      var xhr = new XMLHttpRequest();
      var url = "http://app-6443389f-f19e-4b11-80f6-6975352681e5.cleverapps.io/users/" + id;
      xhr.open("DELETE", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              var json = JSON.parse(xhr.responseText);
          }
      };
      xhr.send();

  }
  document.querySelector('#suppr').addEventListener('click', function(evt){
          evt.preventDefault();
          const req3 = new XMLHttpRequest();
          req3.onreadystatechange = function (event) {
                // XMLHttpRequest.DONE === 4
               if (this.readyState === XMLHttpRequest.DONE) {
                   if (this.status === 200) {
                      console.log("Réponse reçue: %s", this.responseText);
                      var reponse = this.responseText;

                      var tabDelete = JSON.parse(reponse);

                       var compteur = 0

                       tabDelete.forEach(personne => {
                           if(personne.name === "undefined" ||personne.name === undefined || personne.name === "" || personne.password === "") {
                               deleteUndefined(personne.id);
                               compteur += 1;
                           }

                       });

                       alert("Suppression de " + compteur + " personnes");
                   } else {
                       console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                   }
               }
           };
          req3.open('GET', 'http://loisirs-web-backend.cleverapps.io/users', true);
          req3.send(null);
  })
