// validaciones.js - contiene validadores compartidos (email simple, etc.)
function emailValido(email){
  return /\S+@\S+\.\S+/.test(email);
}
