import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Configuração do Firebase (mesma do login.js)
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
  const logoutButton = document.getElementById("logoutButton");

  if (!logoutButton) {
    console.error("Erro: Botão de logout não encontrado!");
    return;
  }

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    
    console.log("Tentando fazer logout...");

    signOut(auth)
      .then(() => {
        console.log("Logout bem-sucedido!");
        alert("Você saiu com sucesso!");
        window.location.href = "login.html"; // Redirecionar para a página de login
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
        alert("Erro ao sair: " + error.message);
      });
  });
});
