/* admin.js - para admin_panel.html */
(function(){
  function renderSolicitudes(){
    const list = getSolicitudes();
    const el = document.getElementById('solList');
    el.innerHTML = '';
    if(!list.length) el.innerHTML = '<p class="muted">No hay solicitudes.</p>';
    else list.forEach((s,idx)=>{
      const d = document.createElement('div'); d.className='sol-item';
      d.innerHTML = `<strong>${s.nombre || s.email}</strong> • ${new Date(s.fecha||s.date||s.fecha || Date.now()).toLocaleString()}<p>${s.mensaje || s.detalle || ''}</p><button class="btn ghost" data-idx="${idx}">Eliminar</button>`;
      el.appendChild(d);
    });
    el.querySelectorAll('.sol-item .btn.ghost').forEach(b=>{
      b.addEventListener('click', function(){
        const i = parseInt(this.dataset.idx,10);
        const arr = getSolicitudes(); arr.splice(i,1); localStorage.setItem('yv_solicitudes', JSON.stringify(arr));
        renderSolicitudes();
      });
    });
  }

  function renderUsers(){
    const users = getUsers();
    const el = document.getElementById('usersList');
    el.innerHTML = '';
    if(!users.length) el.innerHTML = '<p class="muted">Sin usuarios.</p>';
    else users.forEach(u=>{
      const d = document.createElement('div'); d.className='user-item';
      d.innerHTML = `<strong>${u.email}</strong> • role: ${u.role} • creado: ${u.created || ''}`;
      el.appendChild(d);
    });
  }

  function renderProducts(){
    const cat = getCatalog();
    const el = document.getElementById('productsList');
    el.innerHTML = '';
    if(!cat.length) el.innerHTML = '<p class="muted">No hay productos.</p>';
    else cat.forEach(p=>{
      const d = document.createElement('div'); d.className='prod-item';
      d.innerHTML = `<strong>${p.title}</strong> • S/ ${p.price.toFixed(2)} • cat: ${p.category || ''} <button class="btn ghost edit" data-id="${p.id}">Editar</button>`;
      el.appendChild(d);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementById('addSampleProducts')){
      document.getElementById('addSampleProducts').addEventListener('click', function(){
        saveSampleCatalog();
        renderProducts();
        alert('Catálogo de ejemplo guardado.');
      });
    }
    renderSolicitudes();
    renderUsers();
    renderProducts();

    // orders
    const orders = getOrders();
    const oel = document.getElementById('ordersList');
    if(!orders.length) oel.innerHTML = '<p class="muted">No hay pedidos.</p>';
    else orders.forEach(o=>{
      const d = document.createElement('div'); d.className='order-item';
      d.innerHTML = `<strong>${o.id}</strong> • ${o.user} • S/ ${o.total.toFixed(2)} • ${o.date}`;
      oel.appendChild(d);
    });
  });

})();
