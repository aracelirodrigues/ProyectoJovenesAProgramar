let carro = ` https://japceibal.github.io/emercado-api/user_cart/25801.json `;

document.addEventListener("DOMContentLoaded", async () => {
let promesa = await fetch(carro)
let datos = await promesa.json();
mostrarCarrito = datos.articles
mostrar() ;
})

function mostrar(){
    for (let articles of mostrarCarrito) {
        const{id, name, unitCost, count, currency, image} = articles
        document.getElementById("carrito").innerHTML = `
        <tr>
        <th> <img src =" ${image} " class="img-thumbnail float-md-start cursor-active 
        border border-dark" width="100"
        onclick="productosID (${id})"> </th>
        <td class="text-muted"> ${name} </td>
        <td class="text-muted"> ${currency} <p class="costo">${unitCost}</p></td>
        <td> <input type="number" placeholder= "${count}" min ="1" 
        class="col-7 col-md-3 cantidad" oninput="calcularTotal()"></td>
        <td>${currency} <p id="total"> </p> </td>
        </tr>`
    }};

function calcularTotal () {
    let costo = document.querySelector("p.costo").innerHTML
    let cantidad = document.querySelector("input.cantidad").value 
    let total = parseInt (cantidad) * parseInt (costo) 
    if (isNaN(total)){
        return 0
    } else {
    document.getElementById("total").innerHTML = total
 }};

 function productosID (id) {
    localStorage.setItem("productosID", id);
    window.location.href = "product-info.html"
};