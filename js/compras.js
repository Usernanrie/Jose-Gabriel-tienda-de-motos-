import { getPedidos, getSession } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("listaPedidos");

    if (!contenedor) return;

    let sesion = getSession();
    if (!sesion) return;

    let pedidos = getPedidos().filter(p => p.correo === sesion.correo);

    if (pedidos.length === 0) {
        contenedor.innerHTML = "<p>No tienes pedidos aún.</p>";
        return;
    }

    pedidos.forEach(p => {
        let div = document.createElement("div");
        div.classList.add("pedido-item");

        div.innerHTML = `
            <h3>Pedido #${p.id}</h3>
            <p>Total: Bs ${p.total}</p>
            <p>Fecha: ${p.fecha}</p>
        `;

        contenedor.appendChild(div);
    });

});
