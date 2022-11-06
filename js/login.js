let usuario = document.getElementById("email");

entrar.addEventListener("submit", check);
function check() {
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("contraseña").value;
    localStorage.setItem("email", usuario.value);
    if (email.value == "" || contraseña.value == "") {
        e.prevenDefault()
    };
    return
};


