// categorias.js - helper para listar categorias (no obligatorio)
function listarCategoriasEnSelect(selectId){
  const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
  const select = document.getElementById(selectId);
  if(!select) return;
  const cats = Array.from(new Set(catalogo.map(p=>p.categoria)));
  select.innerHTML = '<option value="todos">Todas las categorías</option>';
  cats.forEach(c=>{
    const opt = document.createElement("option"); opt.value = c; opt.textContent = c; select.appendChild(opt);
  });
}
