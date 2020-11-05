
function guardarProf(){//función que guarda todos los datos del perfil junto con el nombre de usuario

    var profUsuario = document.getElementById("userloga").innerHTML;
    var profNombre = document.getElementById("profNombre").value;
    var profApellido = document.getElementById("profApellido").value;
    var profEdad = document.getElementById("profEdad").value;
    var profEmail = document.getElementById("profEmail").value;
    var profTel = document.getElementById("profTel").value;
    var miPerfil = {'nombre': profNombre, 'apellido': profApellido, 'edad': profEdad, 'email': profEmail, 'tel': profTel};
    localStorage.setItem(profUsuario, JSON.stringify(miPerfil));
    cargarGrilla();

}

function desactivarCampos(){//Desactiva los input y esconde el botón de guardar perfil
    $('input').attr('disabled', true);
    $("#saveProfButton").hide();
}

function cargarGrilla(){//Función que guarda el perfil modificado del usuario
    
    var profUsuario = document.getElementById("userloga").innerHTML;
    var itemPerfil = localStorage.getItem(profUsuario);
    var perfil = JSON.parse(itemPerfil);
    document.getElementById("profNombre").placeholder = perfil.nombre;
    document.getElementById("profApellido").placeholder = perfil.apellido;
    document.getElementById("profEdad").placeholder = perfil.edad;
    document.getElementById("profEmail").placeholder = perfil.email;
    document.getElementById("profTel").placeholder = perfil.tel;
    

}

function grillaInicial(){//funcion que carga la grilla con los datos de perfil actuales si ya existe datos de perfiles guardados
    var usuario = document.getElementById("userloga").innerHTML;
    var perfil = localStorage.getItem(usuario);
    if(!(perfil === null)){
        cargarGrilla();
    }else{
        
    }
}

function habilitarEdicion(){//habilita los campos del formulario al hacer click en el boton de edit
    $('#editProfButton').on('click', function(e) {
        e.preventDefault();
        $('input').attr('disabled', false);
        $("#saveProfButton").show();
    });
    
    
}
function alerta(){//Revisa que todos los campos required esten completos, de ser así o no devolverá un mensaje determinado
    //si se actualiza el perfil se aplica la función guardar y refresca la página
    $('#saveProfButton').on("click", function(){
        let valid = true;
        $('[required]').each(function() {
          if ($(this).is(':invalid') || !$(this).val()) valid = false;
          if($(this).is(':invalid'))$(this).css({"background":"rgb(242, 135, 90)"});//rellena en color los campos requeridos faltantes     
        })
        if (!valid){
            alert("no olvide completar los campos obligatorios");
        }else{
            alert('¡Actualización de Perfil exitosa!');
            $('input').attr('disabled', true);
            guardarProf();
            location.reload();
        }
    }); 
} 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    grillaInicial();
    habilitarEdicion();
    desactivarCampos();
    alerta();
});