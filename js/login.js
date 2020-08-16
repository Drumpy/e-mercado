//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    buttonDOM.addEventListener("click", (e) => {
        let inputEmailDOM = document.getElementById("inputEmailDOM");
        let inputPasswordDOM = document.getElementById("inputPasswordDOM");
        let buttonDOM = document.getElementById("buttonDOM");
        let alertDOM = document.getElementById("alertDOM");
        let validación = true;

        if (inputPasswordDOM.value.trim() === "") {
            inputPasswordDOM.classList.add("invalid");
            validación = false;
            alertDOM.classList.remove("alertNone");
            alertDOM.classList.add(
                "animate__animated",
                "animate__fadeInUp",
                "animate__fast"
            );
            alertDOM.innerText = "⛔ Favor de ingresar una contraseña ⛔";
        } else {
            inputPasswordDOM.classList.remove("invalid");
        }

        if (inputEmailDOM.value.trim() === "") {
            inputEmailDOM.classList.add("invalid");
            validación = false;
            alertDOM.classList.remove("alertNone");
            alertDOM.classList.add(
                "animate__animated",
                "animate__fadeInUp",
                "animate__fast"
            );
            alertDOM.innerText = "⛔ Favor de ingresar un nombre de usuario ⛔";
        } else {
            inputEmailDOM.classList.remove("invalid");
        }

        if (validación) {
            localStorage.setItem(
                "User",
                JSON.stringify({ email: inputEmailDOM.value })
            );
            console.log({ localStorage });
            window.location = "home.html";
        }

        setTimeout(() => {
            alertDOM.classList.add("alertNone");
        }, 2500);
    });
});
