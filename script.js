const req = new XMLHttpRequest();
const url = 'http://app-6443389f-f19e-4b11-80f6-6975352681e5.cleverapps.io/users';

  req.onreadystatechange = function(event) {
    // XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        var donnee = JSON.parse(this.responseText);
        var affichage = "";
        affichage += "<table border=2 >";
        donnee.forEach(person => {affichage +="<tr><td width= 30 align=center>"+ person.name +"</td>";
                                  affichage +="<td width= 30 align=center>"+ person.password +"</td></tr>";});
        affichage +="</table>";
        document.getElementById('tableau').innerHTML = affichage;
      } else {
        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
      }
    }
  };
  req.open('GET', url, true);
  req.send(null);

document.querySelector('button').addEventListener('click', function(evt){
evt.preventDefault();
var nom = document.querySelector("#name").value;
var pass = document.querySelector("#pass").value;
var value = JSON.stringify({name : nom, password : pass})
req.open("POST", url, true);
req.setRequestHeader("Content-type", "application/json");
req.send(value);
})
