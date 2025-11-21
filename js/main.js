// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const authScreen = document.getElementById('auth-screen');
  const sidebar = document.getElementById('sidebar');
  const toggleSidebar = document.getElementById('toggle-sidebar');
  const navLinks = document.querySelectorAll('.nav-link[data-page]');
  const pageTitle = document.getElementById('page-title');
  const sidebarUser = document.getElementById('sidebar-user');
  const welcome = document.getElementById('welcome');
  const logoutBtn = document.getElementById('logout');
  const content = document.getElementById('content');

  // localStorage keys
  const COMMENTS_KEY = 'junyhel_comments_v1';
  const ORDERS_KEY = 'junyhel_orders_v1';
  const REQ_KEY = 'junyhel_reqs_v1';

  function getComments(){ return JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]'); }
  function saveComments(c){ localStorage.setItem(COMMENTS_KEY, JSON.stringify(c)); }
  function getOrders(){ return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
  function saveOrders(o){ localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); }
  function getReqs(){ return JSON.parse(localStorage.getItem(REQ_KEY) || '[]'); }
  function saveReqs(r){ localStorage.setItem(REQ_KEY, JSON.stringify(r)); }

  // Utilities
  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function validateEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  // Carga de páginas desde /pages/{page}.html
  async function loadPage(page){
    try{
      const resp = await fetch(`pages/${page}.html`);
      if(!resp.ok) throw new Error('No se pudo cargar la página');
      const html = await resp.text();
      content.innerHTML = html;
      pageTitle.innerText = capitalize(page);
      attachPageHandlers(page);
      // scroll to top
      window.scrollTo({top:0, behavior:'smooth'});
    }catch(err){
      content.innerHTML = `<section class="section"><h2>Error</h2><p>No se pudo cargar la página ${page}.</p></section>`;
      console.error(err);
    }
  }

  function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  // Manejo de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      loadPage(page);
      // close sidebar on mobile
      sidebar.classList.remove('open');
    });
  });

  toggleSidebar.addEventListener('click', () => sidebar.classList.toggle('open'));

  // Logout
  logoutBtn.addEventListener('click', () => {
    if(window.JUNYHEL_SESSION && window.JUNYHEL_SESSION.clearSession){
      window.JUNYHEL_SESSION.clearSession();
    }
    alert('Sesión cerrada. Volviendo al inicio de sesión.');
    authScreen.classList.remove('hidden');
    app.classList.add('hidden');
  });

  // Attaching handlers for forms inside each loaded page
  function attachPageHandlers(page){
    if(page === 'blog'){
      const commentForm = document.getElementById('comment-form');
      const commentsList = document.getElementById('comments-list');
      const commentMsg = document.getElementById('comment-msg');
      function renderComments(){
        const comments = getComments();
        commentsList.innerHTML = '';
        if(comments.length === 0) commentsList.innerHTML = '<p class="muted">No hay comentarios.</p>';
        comments.forEach(c => {
          const el = document.createElement('div');
          el.className = 'comment';
          el.innerHTML = `<strong>${escapeHtml(c.name)}</strong> <small style="color:var(--muted)">· ${new Date(c.date).toLocaleString()}</small>
            <p>${escapeHtml(c.text)}</p>`;
          commentsList.appendChild(el);
        });
      }
      renderComments();
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('comment-name').value.trim();
        const text = document.getElementById('comment-text').value.trim();
        if(!name || !text){ commentMsg.style.color='#c23d3d'; commentMsg.textContent = 'Complete nombre y comentario.'; return; }
        const comments = getComments();
        comments.unshift({name, text, date: new Date().toISOString()});
        saveComments(comments);
        commentMsg.style.color = '#1f8a4f'; commentMsg.textContent = 'Comentario enviado.';
        commentForm.reset();
        renderComments();
      });
    }

    if(page === 'ventas'){
      const orderForm = document.getElementById('order-form');
      const ordersList = document.getElementById('orders-list');
      const orderMsg = document.getElementById('order-msg');
      function renderOrders(){
        const orders = getOrders();
        ordersList.innerHTML = '';
        if(orders.length === 0) ordersList.innerHTML = '<p class="muted">No hay pedidos.</p>';
        orders.forEach(o => {
          const el = document.createElement('div');
          el.className = 'order';
          el.innerHTML = `<strong>${escapeHtml(o.product)}</strong>
            <p>Cantidad: ${o.qty} • Dirección: ${escapeHtml(o.address)} • ${new Date(o.date).toLocaleString()}</p>`;
          ordersList.appendChild(el);
        });
      }
      renderOrders();
      orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const product = document.getElementById('order-product').value.trim();
        const qty = parseInt(document.getElementById('order-qty').value,10);
        const address = document.getElementById('order-address').value.trim();
        if(!product || !qty || !address){ orderMsg.style.color='#c23d3d'; orderMsg.textContent='Complete todos los campos.'; return; }
        const orders = getOrders();
        orders.unshift({product, qty, address, date: new Date().toISOString()});
        saveOrders(orders);
        orderMsg.style.color='#1f8a4f'; orderMsg.textContent='Pedido agregado.';
        orderForm.reset();
        renderOrders();
      });
    }

    if(page === 'compras'){
      const requestForm = document.getElementById('request-form');
      const requestsList = document.getElementById('requests-list');
      const requestMsg = document.getElementById('request-msg');
      function renderRequests(){
        const reqs = getReqs();
        requestsList.innerHTML = '';
        if(reqs.length === 0) requestsList.innerHTML = '<p class="muted">No hay solicitudes.</p>';
        reqs.forEach(r => {
          const el = document.createElement('div');
          el.className = 'order';
          el.innerHTML = `<p>${escapeHtml(r.text)} <small style="color:var(--muted)">· ${new Date(r.date).toLocaleString()}</small></p>`;
          requestsList.appendChild(el);
        });
      }
      renderRequests();
      requestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = document.getElementById('request-text').value.trim();
        if(!text){ requestMsg.style.color='#c23d3d'; requestMsg.textContent='Escriba la solicitud.'; return; }
        const reqs = getReqs();
        reqs.unshift({text, date: new Date().toISOString()});
        saveReqs(reqs);
        requestMsg.style.color='#1f8a4f'; requestMsg.textContent='Solicitud enviada.';
        requestForm.reset();
        renderRequests();
      });
    }

    if(page === 'contacto'){
      const contactForm = document.getElementById('contact-form');
      const contactMsg = document.getElementById('contact-msg');
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        if(!name || !email || !message){ contactMsg.style.color='#c23d3d'; contactMsg.textContent='Complete todos los campos.'; return; }
        if(!validateEmail(email)){ contactMsg.style.color='#c23d3d'; contactMsg.textContent='Correo inválido.'; return; }
        contactMsg.style.color='#1f8a4f'; contactMsg.textContent='Mensaje enviado. Gracias.';
        contactForm.reset();
      });
    }

    if(page === 'perfil'){
      // actualizar info del perfil desde la sesión
      const profileName = document.getElementById('profile-name');
      const profileEmail = document.getElementById('profile-email');
      const session = (window.JUNYHEL_SESSION && window.JUNYHEL_SESSION.getSession) ? window.JUNYHEL_SESSION.getSession() : null;
      if(session){
        if(profileName) profileName.innerText = session.name;
        if(profileEmail) profileEmail.innerText = session.email;
      }
    }
  }

  // Escuchar evento que indica que la sesión ya inició (creado por sesion.js)
  document.addEventListener('junyhel-session-start', () => {
    const session = (window.JUNYHEL_SESSION && window.JUNYHEL_SESSION.getSession) ? window.JUNYHEL_SESSION.getSession() : null;
    if(!session){
      // show auth
      document.getElementById('auth-screen').classList.remove('hidden');
      app.classList.add('hidden');
      return;
    }
    // mostrar app
    document.getElementById('auth-screen').classList.add('hidden');
    app.classList.remove('hidden');
    sidebarUser.innerText = session.name;
    welcome.innerText = `Hola, ${session.name}`;
    // cargar página por defecto (hash o inicio)
    const initial = (window.location.hash && window.location.hash.slice(1)) || 'inicio';
    // activar el nav link correspondiente
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === initial));
    loadPage(initial);
  });

  // Si no hay evento (por seguridad), revisa la sesión
  if(window.JUNYHEL_SESSION && window.JUNYHEL_SESSION.getSession && window.JUNYHEL_SESSION.getSession()){
    document.dispatchEvent(new Event('junyhel-session-start'));
  }
});
