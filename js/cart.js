function llenar_tabla(){
    var tabla = `
        <tr>
            <td></td>
            <td id="tabla_nombre"> `+ articulos.articles[0].name +` </td>
            <td id="costo_tabla"> `+ articulos.articles[0].unitCost +` </td> 
            <td> <input class="form-control cant_cart" type="number" id="cant_cart" min="0" value="`+ articulos.articles[0].count +`"> </td>
            <td id="subtotal_tabla"> `+ (articulos.articles[0].count*articulos.articles[0].unitCost) +` </td>
        </tr>`
    ;
    document.getElementById("articlesWrapper").innerHTML=tabla;
    document.getElementById("productCostText").innerHTML=document.getElementById("subtotal_tabla").innerHTML;
    document.getElementById("comissionText").innerHTML=(document.getElementById("subtotal_tabla").innerHTML)*(document.getElementById("premium").value);
    total();
}

function envios(){
    var envioSelect = document.getElementsByClassName("custom-control-input");
    for (var i=0; i< envioSelect.length; i++) {
        
        envioSelect[i].addEventListener("click", function() {
            idRadioButton = this.id
            document.getElementById("comissionText").innerHTML=(document.getElementById("subtotal_tabla").innerHTML)*(document.getElementById(idRadioButton).value);
            total();
        });
    }
    
}

function envioActivo(){
    var $radio = $('input[class=custom-control-input]:checked');
    var updateDay = $radio.val();
    var id = $radio.attr('id'); 
    document.getElementById("comissionText").innerHTML=(document.getElementById("subtotal_tabla").innerHTML)*(document.getElementById(id).value);
    total();
}

function total(){
    subt = parseInt(document.getElementById("productCostText").innerHTML);
    costenv = parseInt(document.getElementById("comissionText").innerHTML);
    document.getElementById("totalCostText").innerHTML=subt+costenv;
}

function subTotales() {
    
    const selectElement = document.getElementById("cant_cart");

    selectElement.addEventListener('change', (event) => {
        
        const costo_unitario = document.getElementById("costo_tabla");
        const subt =((event.target.value)*(articulos.articles[0].unitCost));
        document.getElementById("subtotal_tabla").innerHTML=subt;
        document.getElementById("productCostText").innerHTML=document.getElementById("subtotal_tabla").innerHTML;
        envioActivo();
    });
  
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
        }
        
    });
});