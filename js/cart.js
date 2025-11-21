// cart.js - funcional (final)

function leerCarrito(){ return JSON.parse(localStorage.getItem("carrito")) || []; }
function guardarCarrito(c){ localStorage.setItem("carrito", JSON.stringify(c)); }

window.agregarAlCarrito = function(id){
    const carrito = leerCarrito();
    // permitir múltiples unidades: guardamos ids repetidos
    carrito.push(id);
    guardarCarrito(carrito);
    window.actualizarCarrito && window.actualizarCarrito();
    // feedback sutil
    const toast = document.createElement('div');
    toast.textContent = "Producto agregado al carrito";
    toast.style.position='fixed'; toast.style.bottom='20px'; toast.style.right='20px';
    toast.style.background='#333'; toast.style.color='#fff'; toast.style.padding='8px 12px'; toast.style.borderRadius='6px';
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(),1400);
};

window.eliminarDelCarrito = function(id){
    let carrito = leerCarrito();
    const idx = carrito.indexOf(id);
    if(idx > -1) carrito.splice(idx,1);
    guardarCarrito(carrito);
    window.actualizarCarrito && window.actualizarCarrito();
};

window.actualizarCarrito = function(){
    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("totalCarrito");
    if(!lista || !total) return;
    const carrito = leerCarrito();
    const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
    lista.innerHTML = "";
    let suma = 0;
    // contemos cantidades por id
    const resumen = {};
    carrito.forEach(id => resumen[id] = (resumen[id] || 0) + 1);
    Object.keys(resumen).forEach(idStr=>{
        const id = parseInt(idStr);
        const cantidad = resumen[id];
        const p = catalogo.find(x => x.id === id);
        if(!p) return;
        suma += p.precio * cantidad;
        const li = document.createElement("li");
        li.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="${p.imagen}" alt="${p.nombre}" style="width:56px;height:42px;object-fit:cover;border-radius:6px;">
              <div style="flex:1">
                <strong>${p.nombre}</strong><br>
                Bs ${p.precio} x ${cantidad}
              </div>
              <div>
                <button onclick="eliminarDelCarrito(${p.id})" class="btn">Eliminar</button>
              </div>
            </div>
        `;
        lista.appendChild(li);
    });
    total.textContent = suma;
};

document.addEventListener("DOMContentLoaded", ()=>{ window.actualizarCarrito && window.actualizarCarrito(); });
