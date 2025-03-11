import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  if (!logoutButton) {
    console.error("Erro: Botão de logout não encontrado!");
    return;
  }

  // 📌 Criar container para notificações (Toast)
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div class="toast-content">
        <div class="icon">
            <i class="fa-solid fa-check"></i>
        </div>
        <div class="message">
            <span class="text text-1">Sucesso!</span>
            <span class="text text-2">Sessão encerrada.</span>
        </div>
        <i class="fa-solid fa-xmark close"></i>
    </div>
    <div class="progress"></div>
  `;
  document.body.appendChild(toast);

  const progressBar = toast.querySelector(".progress");
  const closeIcon = toast.querySelector(".close");

  // 🔔 Função para exibir a Toast
  function showToast(type, title, message) {
    const icon = toast.querySelector(".icon i");
    const text1 = toast.querySelector(".text-1");
    const text2 = toast.querySelector(".text-2");

    // Configurar conteúdo e cor do toast
    if (type === "success") {
      toast.style.borderLeft = "6px solid #4070f4";
      icon.className = "fa-solid fa-check";
      icon.style.backgroundColor = "#4070f4";
    } else if (type === "error") {
      toast.style.borderLeft = "6px solid #E74C3C";
      icon.className = "fa-solid fa-xmark";
      icon.style.backgroundColor = "#E74C3C";
    } else if (type === "warning") {
      toast.style.borderLeft = "6px solid #F39C12";
      icon.className = "fa-solid fa-exclamation-triangle";
      icon.style.backgroundColor = "#F39C12";
    }

    text1.textContent = title;
    text2.textContent = message;

    // Mostrar Toast
    toast.classList.add("active");
    progressBar.classList.add("active");

    // Fechar automaticamente após 5 segundos
    const timer1 = setTimeout(() => {
      toast.classList.remove("active");
    }, 5000);

    const timer2 = setTimeout(() => {
      progressBar.classList.remove("active");
    }, 5300);

    // Fechar manualmente ao clicar no botão de fechar
    closeIcon.addEventListener("click", () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      toast.classList.remove("active");
      progressBar.classList.remove("active");
    });
  }

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    console.log("Tentando fazer logout...");
    showToast("info", "Saindo...", "Estamos encerrando sua sessão.");

    signOut(auth)
      .then(() => {
        console.log("Logout bem-sucedido!");
        showToast("success", "Sessão Encerrada!", "Você saiu com sucesso.");

        // 🔄 Limpar cache e histórico para evitar que o usuário volte
        sessionStorage.clear();
        localStorage.clear();

        // ⏳ Exibir toast e aguardar antes de redirecionar
        setTimeout(() => {
          window.location.replace("login.html");
          setTimeout(() => {
            window.history.pushState(null, "", "login.html");
          }, 100);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
        showToast("error", "Erro ao sair!", error.message);
      });
  });
});

// 📌 Adicionar estilos ao documento
const style = document.createElement("style");
style.innerHTML = `
  /* Google Font Import - Inter */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  /* Font Awesome */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  .toast {
    position: absolute;
    top: 25px;
    right: 30px;
    border-radius: 12px;
    background: #fff;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    border-left: 6px solid #4070f4;
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
  }
  
  .toast.active {
    transform: translateX(0%);
  }
  
  .toast-content {
    display: flex;
    align-items: center;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    background-color: #4070f4;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
  }
  
  .message {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
  }
  
  .text {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
  }
  
  .text-1 {
    font-weight: 600;
    color: #333;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
  }
  
  .close:hover {
    opacity: 1;
  }
  
  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #ddd;
  }
  
  .progress:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #4070f4;
  }
  
  .progress.active:before {
    animation: progress 5s linear forwards;
  }
  
  @keyframes progress {
    100% {
      right: 100%;
    }
  }
`;
document.head.appendChild(style);
