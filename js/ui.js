/* ui.js - pequeñas utilidades */
(function(){
  // simple anim helpers
  window.animFlash = function(el){
    el.classList.add('anim-flash');
    setTimeout(()=>el.classList.remove('anim-flash'),700);
  };
})();
