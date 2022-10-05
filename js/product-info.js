let producto = localStorage.getItem("productosID");
let url = `https://japceibal.github.io/emercado-api/products/${producto}.json`;
let comentarios = `https://japceibal.github.io/emercado-api/products_comments/${producto}.json`;

document.addEventListener('DOMContentLoaded', async () => {

    let result= {};
    let datos = await fetch(url);
    let detalleP = await datos.json();
    result = detalleP;

        const {category, cost, currency, description, images, name, soldCount, relatedProducts} = result
        document.getElementById("nombreProducto").innerHTML = name

        document.getElementById("detalleProducto").innerHTML = `
        <h5><strong> Precio: </strong></h5>
        <p> ${currency}  ${cost}. </p>
        <h5><strong> Descripción: </strong></h5>
        <p> ${description} </p>
        <h5><strong> Categoría: </strong></h5>
        <p> ${category}. </p>
        <h5><strong> Cantidad de Vendidos: </strong></h5>
        <p> ${soldCount} Vendidos. </p>
        <h5 class="pb-1"><strong> Imágenes Ilustrativas del Producto Seleccionado: </strong></h5>
        <div class="row pt-3 d-flex" id='imagenesProducto' >
        </div> `
        for(let i = 0; i < images.length ; i++) {
            document.getElementById('imagenesProducto').innerHTML += ` 
            <div class="card gx-4" style="width: 25%;">
                <img src="${images[i]}" class="card-img img-thumbnail" alt="...">
            </div> `
        };
        for (pRelacionados of relatedProducts) { 
            const {id, name, image} = pRelacionados 
        
                document.getElementById("pRelacionados").innerHTML += `
                <div onclick="productosID(${id})" 
                class="card m-3 list-group-item list-group-item-action cursor-active mx-auto" style="width:35%">
                <img src="${image}" class="card-img-top" alt="....">
                <p class="card-text">${name}</p>
                </div> `
        }; 
        let comen= {};
        let coment = await fetch(comentarios);
        let detalleC = await coment.json();
        comen = detalleC;
      
    for (data of comen) {
      const { dateTime, description, user, score } = data 
       listarComentarios ( user, dateTime, description, score )
         }});

    function listarComentarios(user, dateTime, description, score){

        document.getElementById("comentarios").innerHTML +=`
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                <div class="text-start"> ${user}  <span class="text-muted"> -${dateTime}- </span> 
                <span class="stars" style="color: black" id="${user}"> </span>
                </div class="text-start" ><span class="fst-italic"> ${description}</span>
                </div>
                </li> `

             for (let i = 0; i < 5; i++) {
                 if (i < score) {
                document.getElementById(user).innerHTML += `
                <span class="fa fa-star checked" style="color: red"></span>
                `} else {
                document.getElementById(user).innerHTML +=`
                <span class="fa fa-star"></span> `
            }}
        };

        function productosID (id) {
            localStorage.setItem("productosID", id);
            window.location.href = "product-info.html"
        };
        