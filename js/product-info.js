function showImagesGallery(array){

    let htmlContentToAppend = "";
    let htmlCarrusel ="";
    htmlContentToAppend +=`
    <div class="carousel-item active">
        <img src="img/prod1.jpg" class="d-block w-100" alt="...">
    </div>
    `
    htmlCarrusel +=` 
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div id="innercarrusel" class="carousel-inner">
        </div>        
    </div>
    `
    document.getElementById("productImagesWrapper").innerHTML = htmlCarrusel;

    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>
        `

        document.getElementById("innercarrusel").innerHTML = htmlContentToAppend;
    }
}


function sentComment() {
    alert ("Tu calificación ha sido enviada con éxito");
}



function showComments() {

    let dataComments = "";
    for (let i = 0; i < currentCommentsArray.length; i++) {
        let com = currentCommentsArray[i];
        
        
        let score = com.score - 1;
        let star = "";
        for (let i = 0; i < 5; i++) {
    
            if(i <= score){
                star += `<i class="fas fa-star checked"></i> `;
            }else{
                star += `<i class="fas fa-star"></i> `;
            }
            
        }  
         
        dataComments += `
        
    <div class="d-flex comment" id="comment">
        
        
        <div class="col-11 comment-body">
            
            <div class="comment-header d-flex flex-wrap justify-content-between">
            <b>` + com.user + `</b>  
            <p>` + com.dateTime + `</p> </div>
            
            <div class="rating-stars mb-2" id="rating` + i + `">` + star + `</div>
            <p><i>` + com.description + `</i></p>
            <hr width=900>
            
           
        </div>
        </div>
        `

        document.getElementById("commentProduct").innerHTML = dataComments;

    }

    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Obtengo lainformación por producto.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productCostHTML = document.getElementById("productCost");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
            
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let products = resultObj.data;
    
            let htmlRelProd= '';
            product.relatedProducts.forEach(function(proIndex){
                let tempProd = products[proIndex];
                htmlRelProd += `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <a href="products.html"><img src="${tempProd.imgSrc}" class="card-img-top" alt="..."></a>
                        <h5 class="car-title"><b>${tempProd.name}</b><h5/>
                        <p class="card-text"> ${tempProd.description}<p/>                        
                    </div>    
                </div> `
                        
            });       
                   
            let htmlRelProdHTML = document.getElementById("relatedProd");
            htmlRelProdHTML.innerHTML = htmlRelProd       
              
                   
                   
                   
                       
        } 
        
    });    
    

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data;

            showComments();
        }
    });

    
});


