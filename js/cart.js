function llenar_tabla(){//agrega el artículo a la tabla y realiza los cálculos base para este con el envío por defecto
    var tabla = `
        <tr id="artic">
            <td></td>
            <td id="tabla_nombre"> `+ articulos.articles[0].name +` </td>
            <td id="costo_tabla"> `+ articulos.articles[0].unitCost +` </td> 
            <td> <input class="form-control cant_cart" type="number" id="cant_cart" min="1" value="`+ articulos.articles[0].count +`"> </td>
            <td id="subtotal_tabla"> `+ (articulos.articles[0].count*articulos.articles[0].unitCost) +` </td>
            <td><button onclick="elimArt()" class="badge badge-primary badge-pill"> X </button></td>
        </tr>`
    ;
    document.getElementById("articlesWrapper").innerHTML=tabla;
    document.getElementById("productCostText").innerHTML=document.getElementById("subtotal_tabla").innerHTML;
    document.getElementById("comissionText").innerHTML=(document.getElementById("subtotal_tabla").innerHTML)*(document.getElementById("premium").value);
    total();
}
function elimArt(){//Función que elimina el artículo
    document.getElementById("artic").remove();
    document.getElementById("productCostText").innerHTML="0";
    document.getElementById("comissionText").innerHTML="0";
    document.getElementById("totalCostText").innerHTML="0";
}
function pagos(){//Agrega a los medios de pago la funcion de mostrar u ocultar su formulario en base a si esta seleccionado o no
    var radios = document.getElementsByName("tipoDePago");
    var credito =  document.getElementById("formularioCredito");
    var banco =  document.getElementById("transBanco");

    for(var i = 0; i < radios.length; i++) {
        radios[i].onclick = function() {
            var val = this.value;
            if(val == 'credito'){  
                credito.style.display = 'block';   // show
                banco.style.display = 'none';// hide
                //requireds de credito activos y los de banco no
                $('#name').prop('required', true);
                $('#ccnumber').prop('required', true);
                $('#cvv').prop('required', true);
                $('#banco').prop('required', false);
                $('#sucursal').prop('required', false);
                $('#numCuenta').prop('required', false);
            }
            else if(val == 'bancaria'){
                credito.style.display = 'none';
                banco.style.display = 'block';
                //requireds de banco activos y los de credito no
                $('#name').prop('required', false);
                $('#ccnumber').prop('required', false);
                $('#cvv').prop('required', false);
                $('#banco').prop('required', true);
                $('#sucursal').prop('required', true);
                $('#numCuenta').prop('required', true);

            }    

        }
    }
}
function envios(){//genera el evento en los radios de Envios para calcular dinámicamente el costo
    var envioSelect = document.getElementsByClassName("custom-control-input");
    for (var i=0; i< envioSelect.length; i++) {
        
        envioSelect[i].addEventListener("click", function() {
            idRadioButton = this.id
            document.getElementById("comissionText").innerHTML=(document.getElementById("subtotal_tabla").innerHTML)*(document.getElementById(idRadioButton).value);
            total();
        });
    }
    
}

function envioActivo(){//Obtiene el envío por defecto y genera los calculos necesarios
    var $radio = $('input[class=custom-control-input]:checked');
    var updateDay = $radio.val();
    var id = $radio.attr('id'); 
    document.getElementById("comissionText").innerHTML=(document.getElementById("subtotal_tabla").innerHTML)*(document.getElementById(id).value);
    total();
}

function total(){//Realiza los cálculos de Subtotal, Costo de Envio y Costo Total.
    subt = parseInt(document.getElementById("productCostText").innerHTML);
    costenv = parseInt(document.getElementById("comissionText").innerHTML);
    document.getElementById("totalCostText").innerHTML=subt+costenv;
}

function subTotales() {//Genera evento en caso de cambio de Cantidades realizar las cuentas dinámicamente
    
    const selectElement = document.getElementById("cant_cart");

    selectElement.addEventListener('change', (event) => {
        
        const costo_unitario = document.getElementById("costo_tabla");
        const subt =((event.target.value)*(articulos.articles[0].unitCost));
        document.getElementById("subtotal_tabla").innerHTML=subt;
        document.getElementById("productCostText").innerHTML=document.getElementById("subtotal_tabla").innerHTML;
        envioActivo();
    });
  
}



function alerta(){//Revisa que todos los campos required esten completos, de ser así o no devolverá un mensaje determinado
    document.getElementById("finCompra").onclick = function() {
        let allAreFilled = true;
        document.getElementById("formPerfil").querySelectorAll("[required]").forEach(function(i) {
          if (!allAreFilled) return;
          if (!i.value) allAreFilled = false;
          if (i.type === "radio") {
            let radioValueCheck = false;
            document.getElementById("formPerfil").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
              if (r.checked) radioValueCheck = true;
            })
            allAreFilled = radioValueCheck;
          }
        })
        if (!allAreFilled) {
            alert('No olvide completar todos los campos');
        }else{
            alert(msjCart.msg); 
        }
    };  
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARRITO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            articulos = resultObj.data;

            llenar_tabla();
            subTotales();
            envios();
            pagos();
            //camposRequeridos();
            alerta();
        }
        
    });

    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            msjCart = resultObj.data;
        }             
    });
});
