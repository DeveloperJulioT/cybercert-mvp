document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Login ---
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorText = document.getElementById('passwordHelp');
            
            // Criterio de Aceptación: La contraseña debe tener al menos 8 caracteres
            if (password.length < 8) {
                errorText.textContent = "Error: La contraseña debe tener al menos 8 caracteres.";
                return; // Detiene la ejecución
            }
            
            errorText.textContent = ""; // Limpia el error
            
            // Simulación de validación exitosa y redirección al catálogo
            console.log(`Usuario autenticado: ${email}`);
            window.location.href = 'catalog.html'; 
        });
    }

    // --- Lógica de Cierre de Sesión (Catálogo) ---
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Redirige de vuelta al login
            window.location.href = 'index.html';
        });
    }
});