document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('form-contacto');
    const responseMessage = document.getElementById('form-response');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío tradicional de HTML

            // Usamos FormData para empaquetar de forma automática todos los inputs (incluyendo el select)
            const formData = new FormData(contactForm);

            // Realizamos la petición Fetch a la base de datos a través de PHP
            fetch('guardar_contacto.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Procesamos la respuesta en formato JSON
            .then(data => {
                if (data.status === 'success') {
                    // Si todo salió bien en el backend, mostramos el mensaje de éxito
                    responseMessage.textContent = data.message;
                    responseMessage.className = 'hidden-message success';
                    contactForm.reset(); // Limpiamos el formulario
                } else {
                    // Si el backend detectó un error (ej. campos vacíos o fallo de BD)
                    responseMessage.textContent = `Error: ${data.message}`;
                    responseMessage.className = 'hidden-message error';
                }
            })
            .catch(error => {
                console.error('Error en la conexión:', error);
                responseMessage.textContent = 'Hubo un problema al conectar con el servidor. Inténtalo más tarde.';
                responseMessage.className = 'hidden-message error';
            });
        });
    }
});