const formulario = document.getElementById('miFormulario');
const estadoFormulario = document.getElementById('form-status');

formulario.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === "" || email === "" || mensaje === "") {
        estadoFormulario.textContent = "⚠️ Error: Todos los campos son obligatorios.";
        estadoFormulario.style.color = "#b91c1c";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        estadoFormulario.textContent = "⚠️ Error: Por favor ingresá un correo válido.";
        estadoFormulario.style.color = "#b91c1c";
        return;
    }

    estadoFormulario.textContent = "⏳ Enviando tu mensaje...";
    estadoFormulario.style.color = "#2563eb";

    const formData = new FormData(formulario);

    try {
        const response = await fetch(formulario.action, {
            method: formulario.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            estadoFormulario.textContent = "✅ ¡Mensaje enviado con éxito!";
            estadoFormulario.style.color = "#16a34a";
            formulario.reset();
        } else {
            estadoFormulario.textContent = "❌ Ocurrió un problema. Reintentá luego.";
            estadoFormulario.style.color = "#b91c1c";
        }
    } catch (error) {
        estadoFormulario.textContent = "❌ Error de conexión.";
        estadoFormulario.style.color = "#b91c1c";
    }
});