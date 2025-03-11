    document.getElementById("signup-form")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            var btn = document.getElementById("submitSignUp");
            btn.textContent = "Enviando...";

            const serviceID = "service_57xpk6j";
            const templateID = "template_g0l1706";

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.textContent = "Criar conta";
                    alert("Email enviado com sucesso!");
                }, (err) => {
                    btn.textContent = "Criar conta";
                    alert("Erro ao enviar email: " + JSON.stringify(err));
                });
        });
