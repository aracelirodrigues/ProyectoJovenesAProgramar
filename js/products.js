let jaimito = localStorage.getItem("catID") ;
let url = `https://japceibal.github.io/emercado-api/cats_products/${jaimito}.json` ;

let arregloProductos = [] ;

const ORDER_ASC_COST = "MENORMAYOR";
const ORDER_DESC_COST = "MAYORMENOR";
const ORDER_SOLD_COUNT = "Cant.";
let currentProductArray = [];
let currentSortCriteria = undefined;
let precioMin = undefined;
let precioMax = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function sortAndShowCategories(sortCriteria, arregloProductos2){
    
    currentSortCriteria = sortCriteria;

    if(arregloProductos2 != undefined){
        currentProductArray = arregloProductos2;
    }

    currentProductArray = sortCategories(currentSortCriteria, arregloProductos);

    //Muestro las categorías ordenadas
    showProductosList(currentProductArray);
}


function showProductosList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let productos = array[i];

        if (((precioMin == undefined) || (precioMin != undefined && parseInt(productos.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(productos.cost) <= precioMax))){ 

        htmlContentToAppend +=  `  
        <div onclick = "productosID(${productos.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row-3 d-flex"> 
            <div class="col-3">
            <img src="${productos.image} "alt="${productos.description} "class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ productos.name  +`  `+ productos.currency +`  `+ productos.cost +`</h4> 
                        <p>`+ productos.description +`</p> 
                        </div>
                        <small class="text-muted">`+ productos.soldCount +` Vendidos</small> 
                    </div>
                    </div>
                </div>
                </div>
            </div>
            `
             }  
        document.getElementById("productos").innerHTML = htmlContentToAppend; 
    }
 }


  document.addEventListener("DOMContentLoaded", async () => {
    let datos = await fetch(url);
    let autitos = await datos.json();
    arregloProductos = autitos.products;

    showProductosList(autitos.products);
    let cat = autitos.catName;
    document.getElementById("categoria").innerHTML = cat; 
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_COST);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_COST);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_SOLD_COUNT);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        precioMin = undefined;
        precioMax = undefined;
    
        showProductosList(arregloProductos);
    });
    
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
       
        precioMin = document.getElementById("rangeFilterCountMin").value;
        precioMax = document.getElementById("rangeFilterCountMax").value;
    
        if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0){
            precioMin = parseInt(precioMin);
        }
        else{
            precioMin = undefined;
        }
    
        if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0){
            precioMax = parseInt(precioMax);
        }
        else{
            precioMax = undefined;
        }

        showProductosList(arregloProductos);
    });    
});

function productosID (id) {
    localStorage.setItem("productosID", id);
    window.location.href = "product-info.html"
};
