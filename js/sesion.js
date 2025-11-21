/* sesion.js - simulación simple de sesión (solo front) */
(function(){
  const KEY = 'yv_user';

  window.loginSim = function(email){
    const user = { email: email, role: 'user', loggedAt: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(user));
  };

  window.logoutSim = function(){
    localStorage.removeItem(KEY);
  };

  window.getUser = function(){
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  };
})();
