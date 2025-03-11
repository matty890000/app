import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8b5OuCb8S-e9SklFV8jmWgx1Cpz2_9Lk",
  authDomain: "main-47b3b.firebaseapp.com",
  projectId: "main-47b3b",
  storageBucket: "main-47b3b.firebasestorage.app",
  messagingSenderId: "741085244179",
  appId: "1:741085244179:web:f93ee2558e569b23a108e6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("submitSignUp");

  if (loginButton) {
    loginButton.addEventListener("click", function (event) {
      event.preventDefault();

      // Obter os valores do formulário
      const email = document.getElementById("rEmail").value.trim();
      const password = document.getElementById("rPassword").value;

      // Elementos da UI
      const progressBarFill = document.querySelector(".progress-bar-fill");
      const notificationContainer = document.getElementById("notification-container");

      // Função para exibir notificações animadas
      function showNotification(message, type = "success") {
        const icons = {
          success: "✅",
          error: "❌",
          warning: "⚠️"
        };

        const notification = document.createElement("div");
        notification.classList.add("notification", type);
        notification.innerHTML = `
          <span class="notification-icon">${icons[type]}</span>
          ${message}
        `;

        notificationContainer.appendChild(notification);

        // Remover após 4 segundos
        setTimeout(() => {
          notification.style.animation = "fadeOut 0.4s ease-in-out forwards";
          setTimeout(() => notification.remove(), 400);
        }, 4000);
      }

      // Função para atualizar a barra de progresso
      function updateProgressBar(value) {
        progressBarFill.style.width = value + "%";
      }

      // Validação inicial
      if (!email || !password) {
        showNotification("⚠️ Preencha todos os campos!", "warning");
        return;
      }

      // Iniciar a barra de progresso
      updateProgressBar(20);
      showNotification("🔄 Verificando credenciais...");

      setTimeout(() => {
        updateProgressBar(40);
        showNotification("🔐 Autenticando usuário...");

        // Fazer login com Firebase
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProgressBar(80);
            showNotification(`✅ Login realizado com sucesso!`);

            setTimeout(() => {
              updateProgressBar(100);
              showNotification("🔄 Redirecionando...");

              setTimeout(() => {
                window.location.href = `dashboard.html?user=${user.email}`;
              }, 1500);
            }, 1000);
          })
          .catch((error) => {
            updateProgressBar(0); // Resetar barra em caso de erro
            showNotification(`❌ Erro ao fazer login: ${error.message}`, "error");
            console.error("Erro:", error);
          });
      }, 1000);
    });
  } else {
    console.error("Erro: O botão de login não foi encontrado.");
  }
});
