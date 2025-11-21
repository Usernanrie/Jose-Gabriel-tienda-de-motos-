// Mostrar usuario activo
document.addEventListener("DOMContentLoaded", function () {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
        document.getElementById("nombreUsuario").textContent = usuarioActivo.nombre;
        document.getElementById("perfilNombre").textContent = usuarioActivo.nombre;
        document.getElementById("perfilCorreo").textContent = usuarioActivo.correo;
    }

    // Toggle sidebar en móviles
    const toggleBtn = document.querySelector(".toggle-btn");
    const sidebar = document.querySelector(".sidebar");
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    // Cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "../index.html";
    });

    // Formulario Blog
    const formBlog = document.getElementById("formBlog");
    const comentariosDiv = document.getElementById("comentarios");
    formBlog.addEventListener("submit", function(e){
        e.preventDefault();
        const textarea = formBlog.querySelector("textarea");
        comentariosDiv.innerHTML += `<p>${textarea.value}</p>`;
        textarea.value = "";
    });

    // Formulario Ventas
    const formVentas = document.getElementById("formVentas");
    const ventasLista = document.getElementById("ventasLista");
    formVentas.addEventListener("submit", function(e){
        e.preventDefault();
        const inputs = formVentas.querySelectorAll("input");
        ventasLista.innerHTML += `<p>Producto: ${inputs[0].value} - Cantidad: ${inputs[1].value}</p>`;
        formVentas.reset();
    });

    // Formulario Compras
    const formCompras = document.getElementById("formCompras");
    const comprasLista = document.getElementById("comprasLista");
    formCompras.addEventListener("submit", function(e){
        e.preventDefault();
        const inputs = formCompras.querySelectorAll("input");
        comprasLista.innerHTML += `<p>Artículo: ${inputs[0].value} - Cantidad: ${inputs[1].value}</p>`;
        formCompras.reset();
    });

    // Formulario Contacto
    const formContacto = document.getElementById("formContacto");
    const contactoOk = document.getElementById("contactoOk");
    formContacto.addEventListener("submit", function(e){
        e.preventDefault();
        contactoOk.innerHTML = "<p>Mensaje enviado correctamente.</p>";
        formContacto.reset();
    });
});
