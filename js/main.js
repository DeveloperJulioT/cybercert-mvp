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

// --- Lógica del Módulo de Aprendizaje ---

// Función para cambiar entre pestañas (Teoría, Lab, Examen)
window.showTab = function(tabId, element) {
    // Ocultar todos los contenidos
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    // Quitar la clase active de todos los items del menú
    const menuItems = document.querySelectorAll('.module-menu li');
    menuItems.forEach(item => item.classList.remove('active'));

    // Mostrar el contenido seleccionado y marcar el item como activo
    document.getElementById(tabId).style.display = 'block';
    element.classList.add('active');
};

// Lógica de calificación del Examen
const examForm = document.getElementById('examForm');
if (examForm) {
    examForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores (1 si es correcto, 0 si es incorrecto)
        const q1 = parseInt(document.querySelector('input[name="q1"]:checked').value);
        const q2 = parseInt(document.querySelector('input[name="q2"]:checked').value);
        
        // Calcular porcentaje (2 preguntas = 100%, 1 pregunta = 50%)
        const totalScore = ((q1 + q2) / 2) * 100;
        
        const resultDiv = document.getElementById('examResult');
        resultDiv.style.display = 'block';
        
        // Criterio de Aceptación: Nota mayor o igual al 80%
        if (totalScore >= 80) {
            resultDiv.className = 'exam-result result-pass';
            resultDiv.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i><br>
                ¡Felicidades! Has aprobado con un ${totalScore}%.<br><br>
                <button id="downloadBtn" class="btn-primary" style="width: auto; padding: 10px 20px;">
                    <i class="fas fa-download"></i> Emitir Certificado
                </button>
            `;
            
            // Evento para el botón de descarga
            document.getElementById('downloadBtn').addEventListener('click', generateCertificate);
            examForm.style.display = 'none';
        } else {
            resultDiv.className = 'exam-result result-fail';
            resultDiv.innerHTML = `
                <i class="fas fa-times-circle" style="font-size: 2rem; margin-bottom: 10px;"></i><br>
                Has obtenido un ${totalScore}%.<br>
                Necesitas al menos un 80% para aprobar. Por favor, revisa el laboratorio y vuelve a intentarlo.
            `;
        }
    });
}
// --- Función que genera el PDF en el navegador ---
function generateCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');

    // Estilo del certificado
    doc.setDrawColor(147, 51, 234); // Morado
    doc.setLineWidth(2);
    doc.rect(5, 5, 287, 200); // Borde

    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text("EduTech Platform", 148.5, 30, { align: "center" });
    
    doc.setFontSize(22);
    doc.text("CERTIFICADO DE FINALIZACION", 148.5, 60, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Se otorga el presente reconocimiento a:", 148.5, 90, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Invitado (Usuario Estudiante)", 148.5, 110, { align: "center" });
    
    doc.setFontSize(16);
    doc.text("Por completar el curso: Cybersecurity Fundamentals", 148.5, 130, { align: "center" });

    // Pie de firma
    doc.line(100, 170, 200, 170);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Julio Tarquino", 148.5, 180, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Ingeniero de Software y Especialista en Ciberseguridad", 148.5, 187, { align: "center" });

    // Descargar archivo
    doc.save("Certificado_CyberTech.pdf");
}