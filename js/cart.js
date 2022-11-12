let carro = ` https://japceibal.github.io/emercado-api/user_cart/25801.json `;

document.addEventListener("DOMContentLoaded", async () => {
    let promesa = await fetch(carro)
    let datos = await promesa.json();
    mostrarCarrito = datos.articles
    mostrar();
    calcularTotal();
});

function mostrar() {
    for (let articles of mostrarCarrito) {
        const { id, name, unitCost, count, currency, image } = articles
        document.getElementById("carrito").innerHTML = `
        <tr>
        <th> <img src =" ${image} " class="img-thumbnail float-md-start cursor-active 
        border border-dark" width="100"
        onclick="productosID (${id})"> </th>
        <td class="text-start"> ${name} </td>
        <td class="text-start"> ${currency} <p class="costo">${unitCost}</p></td>
        <td> <input type="number" placeholder= "${count}" min ="1" 
        class="col-8 col-md-2 cantidad" oninput="calcularSubTotal()"></td>
        <td>${currency} <p id="subTotal">${unitCost} </p></td>
        </tr>`
    }
};

function calcularSubTotal() {
    let costo = document.querySelector("p.costo").innerHTML
    let cantidad = document.querySelector("input.cantidad").value
    let total = parseInt(cantidad) * parseInt(costo)
    if (isNaN(total)) {
        return 0
    } else {
        document.getElementById("subTotal").innerHTML = total
    };
    calcularTotal()
};

function productosID(id) {
    localStorage.setItem("productosID", id);
    window.location.href = "product-info.html"
};

function calcularTotal() {
    let subtotal = document.getElementById("subTotalGeneral")
    let totalSub = parseFloat(document.getElementById("subTotal").textContent)
    let radios = document.getElementsByName("gridRadios")
    let costoE = document.getElementById("costoEnvio")

    subtotal.innerHTML = parseFloat(totalSub)
    for (let radio of radios) {
        if (radio.checked) {
            let costoEnvio = parseFloat(radio.value) * totalSub;
            costoE.innerHTML = costoEnvio
            document.getElementById("total").innerHTML = parseFloat(totalSub + costoEnvio);
        };
    }
};

function modal() {
    let tarjeta = document.getElementById("tarj")
    let transferencia = document.getElementById("transf")
    let pagoNoSelecionado = document.getElementById("pagoNoSelecionado")
    let selecionadoTarjeta = document.getElementById("SelecionadoTarjeta")
    let selecionadoTransferencia = document.getElementById("SelecionadoTransferencia")
    let numeroCuenta = document.getElementById("4")
    let numTarj = document.getElementById("1")
    let codSeg = document.getElementById("2")
    let venc = document.getElementById("3")

    if (tarjeta.checked) {
        numeroCuenta.disabled = true
        numeroCuenta.value = ""
        selecionadoTarjeta.classList.remove("d-none")
        selecionadoTransferencia.classList.add("d-none")
        pagoNoSelecionado.classList.add("d-none")
    };
    if (!tarjeta.checked) {
        numeroCuenta.disabled = false
    };
    if (transferencia.checked) {
        numTarj.disabled = true
        numTarj.value = ""
        codSeg.disabled = true
        codSeg.value = ""
        venc.disabled = true
        venc.value = ""
        selecionadoTransferencia.classList.remove("d-none")
        selecionadoTarjeta.classList.add("d-none")
        pagoNoSelecionado.classList.add("d-none")
    };
    if (!transferencia.checked) {
        numTarj.disabled = false
        codSeg.disabled = false
        venc.disabled = false
    };
    if (!transferencia.checked && !tarjeta.checked) {
        pagoNoSelecionado.classList.remove("d-none")
    };
};

(() => {
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {

        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault()
                event.stopPropagation()
                compraExitosa()
            };
            form.classList.add('was-validated')
        }, false);
    });
})();

function compraExitosa() {
    document.getElementById("compraExitosa").classList.add("show")
};
