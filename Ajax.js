const url = 'http://loisirs-web-backend.cleverapps.io/users';    
window.addEventListener('DOMContentLoaded',function(){
    function actualiser(){
        const req = new XMLHttpRequest();
        req.onreadystatechange = function(event) {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
    
                    var tabUsers = JSON.parse(this.responseText);
    
                    var chaine = 'Je suis un titre de tableau (╯°□°）╯︵ ┻━┻ <br/>';
                    chaine += '<table border ="1" width = "25%">';
    
                    tabUsers.forEach(element => {
                        chaine +='</tr><tr>';
                        chaine +='<td>' + element.name + '</td>';
                        chaine +='<td>' + element.password + '</td>';
                    });
    
                    chaine +='</table>'; 
                    document.getElementById('affichage').innerHTML = chaine;
                } else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                }
            }
        };
        req.open('GET', url, true);
        req.send(null);
    }
    
    document.querySelector('button').addEventListener('click', function(evt){
    
        evt.preventDefault();	
    
        const requete = new XMLHttpRequest();
        var nom = document.querySelector('#Nom').value;
        var password = document.querySelector('#Password').value;
        var value = JSON.stringify({name : nom, password : password});
        requete.open('POST', url, true);
        requete.setRequestHeader("Content-Type","application/json");
        requete.send(value);
        requete.onreadystatechange = function(event) {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 201) {
                    actualiser();
                }
            }
        }
    });
    actualiser();
}); 