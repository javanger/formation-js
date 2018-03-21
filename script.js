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

  document.querySelector('button').addEventListener('click', function(evt){
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
