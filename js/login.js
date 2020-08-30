function check() {
    var usrName = document.getElementById('emaillogin').value;
    var usrPw = document.getElementById('pass').value;
    

    let stored_users = JSON.parse(localStorage.getItem('users'))
    if(stored_users) {
        for (let u = 0; u < stored_users.length; u++){
            if (usrName == stored_users[u].name && usrPw == stored_users[u].password) {
                alert('Bienvenido ' + usrName);  
                localStorage.setItem('loggedUser', usrName);                                              
                return location.replace("./mainpage.html");
            }
        }
    } else {
        localStorage.setItem('users', '[]');
    }

    return alert('Acceso denegado. Se requieren mail y password válidos ');
}

function store() {
    var usrName = document.getElementById('nuevomail').value;
    var usrPw = document.getElementById('nuevopassword').value;

    let stored_users = JSON.parse(localStorage.getItem('users'));
    if(usrName===""||usrPw===""){
        alert("Ingrese email y contraseña correctamente (no se admiten campos en blanco)");        
    }else{
        if(stored_users) {
            stored_users.push({name: usrName, password: usrPw});
            localStorage.setItem('users', JSON.stringify(stored_users));
            alert ("Te registraste con éxito");
        } else {
            localStorage.setItem('users', JSON.stringify([{name: usrName, password: usrPw}]));
        }
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});