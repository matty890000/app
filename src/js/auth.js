import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// 🔥 Configuração do Firebase
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
const auth = getAuth();
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitSignUp");

  if (submitButton) {
    submitButton.addEventListener("click", function (event) {
      event.preventDefault();

      // 📝 Obter os valores do formulário
      const name = document.getElementById("fName").value.trim();
      const email = document.getElementById("rEmail").value.trim();
      const password = document.getElementById("rPassword").value;

      // 🎨 Elementos da UI
      const progressBarFill = document.querySelector(".progress-bar-fill");
      const notificationContainer = document.getElementById("notification-container");

      // 🔔 Função para exibir notificações animadas
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

        // ⏳ Remover após 4 segundos
        setTimeout(() => {
          notification.style.animation = "fadeOut 0.4s ease-in-out forwards";
          setTimeout(() => notification.remove(), 400);
        }, 4000);
      }

      // 📊 Função para atualizar a barra de progresso
      function updateProgressBar(value) {
        progressBarFill.style.width = value + "%";
      }

      // ✅ Validação inicial
      if (!name || !email || !password) {
        showNotification("⚠️ Preencha todos os campos!", "warning");
        return;
      }

      // 🚀 Iniciar a barra de progresso
      updateProgressBar(20);
      showNotification("🔄 Validando informações...");

      setTimeout(() => {
        updateProgressBar(40);
        showNotification("🛠️ Criando conta...");

        // 🔐 Criar usuário no Firebase Authentication
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            updateProgressBar(80);
            showNotification(`✅ Conta criada com sucesso!`);

            // 🔥 Salvar dados do usuário no Firestore
            await setDoc(doc(db, "users", user.uid), {
              name: name,
              email: email,
              createdAt: new Date()
            });

            // 🕐 Aguardar 2 segundos antes de redirecionar
            setTimeout(() => {
              updateProgressBar(100);

              setTimeout(() => {
                updateProgressBar(0); // Resetar barra após sucesso
                window.location.href = "./loginpage.html"; // 🔄 Redirecionar para a página de login
              }, 2000);
            }, 1000);

            console.log("Usuário criado:", user);
          })
          .catch((error) => {
            updateProgressBar(0); // Resetar barra em caso de erro
            showNotification(`❌ Erro ao criar conta: ${error.message}`, "error");
            console.error("Erro:", error);
          });
      }, 1000);
    });
  } else {
    console.error("Erro: O botão de submissão não foi encontrado.");
  }
});
