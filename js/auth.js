// auth.js - login y registro

document.addEventListener("DOMContentLoaded", () => {
    // LOGIN (index.html)
    const loginForm = document.getElementById("loginForm");
    if(loginForm){
        loginForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            const correo = document.getElementById("correo").value.trim();
            const pass = document.getElementById("password").value.trim();
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const user = usuarios.find(u => u.correo === correo && u.password === pass);
            const error = document.getElementById("loginError");
            if(!correo || !pass){ error && (error.textContent = "Complete todos los campos"); return; }
            if(user){
                localStorage.setItem("usuarioActivo", JSON.stringify(user));
                window.location.href = "pages/inicio.html";
            } else {
                error && (error.textContent = "Correo o contraseña incorrectos");
            }
        });
    }

    // REGISTRO (pages/registro.html)
    const regForm = document.getElementById("registroForm");
    if(regForm){
        regForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correoRegistro").value.trim();
            const pass = document.getElementById("passwordRegistro").value.trim();
            const pass2 = document.getElementById("passwordRegistro2").value.trim();
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const err = document.getElementById("registroError");
            const ok = document.getElementById("registroSuccess");
            err && (err.textContent = "");
            ok && (ok.textContent = "");
            if(!nombre||!correo||!pass||!pass2){ err && (err.textContent = "Complete todos los campos"); return; }
            if(pass.length < 6){ err && (err.textContent = "Contraseña mínimo 6 caracteres"); return; }
            if(pass !== pass2){ err && (err.textContent = "Contraseñas no coinciden"); return; }
            if(usuarios.find(u => u.correo === correo)){ err && (err.textContent = "Correo ya registrado"); return; }
            usuarios.push({nombre, correo, password: pass});
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            ok && (ok.textContent = "Registrado. Redirigiendo a login...");
            setTimeout(()=> window.location.href = "../index.html", 1000);
        });
    }

    // CERRAR SESION (boton logoutBtn en menu)
    const logout = document.getElementById("logoutBtn");
    if(logout){
        logout.addEventListener("click", (e)=>{
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            // si estás en root pages, ajustar ruta:
            const fromPage = window.location.pathname.includes("/pages/") ? "../index.html" : "index.html";
            window.location.href = fromPage;
        });
    }
});
