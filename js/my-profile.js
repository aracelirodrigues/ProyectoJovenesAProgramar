addEventListener("DOMContentLoaded", () => {
    document.getElementById("email").value = localStorage.getItem("email")
    document.getElementById("nombre").value = localStorage.getItem("nombre")
    document.getElementById("apellido").value = localStorage.getItem("apellido")
    document.getElementById("telContacto").value = localStorage.getItem("telContacto")
    document.getElementById("segundoNombre").value = localStorage.getItem("segundoNombre")
    document.getElementById("segundoApellido").value = localStorage.getItem("segundoApellido")
})



function guardarDatos() {
    let nombre = document.getElementById("nombre")
    let apellido = document.getElementById("apellido")
    let telContacto = document.getElementById("telContacto")
    let segundoNombre = document.getElementById("segundoNombre")
    let segundoApellido = document.getElementById("segundoApellido")

    nombre = localStorage.setItem("nombre", nombre.value)
    apellido = localStorage.setItem("apellido", apellido.value)
    telContacto = localStorage.setItem("telContacto", telContacto.value)
    segundoNombre = localStorage.setItem("segundoNombre", segundoNombre.value)
    segundoApellido = localStorage.setItem("segundoApellido", segundoApellido.value)
    
}

