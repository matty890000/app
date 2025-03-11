// 📌 Importações Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  fetchSignInMethodsForEmail 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitSignUp");

  if (!submitButton) {
    console.error("Erro: O botão de submissão não foi encontrado.");
    return;
  }

  // 📌 Criar container para notificações (Toast)
  function createToast() {
    let toast = document.querySelector(".toast");
    
    // Remover toast anterior para evitar acúmulo
    if (toast) {
      toast.remove();
    }

    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <div class="toast-content">
          <div class="icon"><i class="fa-solid"></i></div>
          <div class="message">
              <span class="text text-1"></span>
              <span class="text text-2"></span>
          </div>
          <i class="fa-solid fa-xmark close"></i>
      </div>
      <div class="progress"></div>
    `;
    document.body.appendChild(toast);

    return toast;
  }

  // 🔔 Função para exibir a Toast
  function showToast(type, title, message) {
    const toast = createToast();
    const icon = toast.querySelector(".icon i");
    const text1 = toast.querySelector(".text-1");
    const text2 = toast.querySelector(".text-2");
    const progressBar = toast.querySelector(".progress");
    const closeIcon = toast.querySelector(".close");

    if (type === "success") {
      toast.style.borderLeft = "6px solid rgb(126, 255, 121)";
      icon.className = "fa-solid fa-check";
      icon.style.backgroundColor = "rgb(85, 250, 129)";
    } else if (type === "error") {
      toast.style.borderLeft = "6px solid #fe3b3b";
      icon.className = "fa-solid fa-xmark";
      icon.style.backgroundColor = "#fe3b3b";
    } else if (type === "warning") {
      toast.style.borderLeft = "6px solid rgb(252, 176, 69)";
      icon.className = "fa-solid fa-exclamation-triangle";
      icon.style.backgroundColor = "rgb(252, 176, 69)";
    } else if (type === "info") {
      toast.style.borderLeft = "6px solid #4070f4";
      icon.className = "fa-solid fa-info-circle";
      icon.style.backgroundColor = "#4070f4";
    }

    text1.textContent = title;
    text2.textContent = message;

    toast.classList.add("active");
    progressBar.classList.add("active");

    const timer1 = setTimeout(() => {
      toast.classList.remove("active");
    }, 7000);

    const timer2 = setTimeout(() => {
      progressBar.classList.remove("active");
    }, 7300);

    closeIcon.addEventListener("click", () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      toast.classList.remove("active");
      progressBar.classList.remove("active");
    });
  }

  submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const name = document.getElementById("fName").value.trim();
    const email = document.getElementById("rEmail").value.trim();
    const password = document.getElementById("rPassword").value;

    if (!name || !email || !password) {
      showToast("warning", "Atenção!", "Preencha todos os campos!");
      return;
    }

    showToast("info", "Verificando...", "Aguarde enquanto verificamos seu e-mail...");

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        showToast("error", "Conta já existe!", "Este e-mail já está cadastrado.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date()
      });

      showToast("success", "Sucesso!", "Conta criada com sucesso!");

      setTimeout(() => {
        window.location.href = "./loginpage.html";
      }, 3000);
    } catch (error) {
      let errorMessage = "Ocorreu um erro. Tente novamente.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este e-mail já está cadastrado.";
          break;
        case "auth/invalid-email":
          errorMessage = "O e-mail fornecido é inválido.";
          break;
        case "auth/weak-password":
          errorMessage = "A senha deve ter pelo menos 6 caracteres.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Falha na conexão. Verifique sua internet.";
          break;
      }

      showToast("error", "Erro!", errorMessage);
    }
  });
});

// 📌 Adicionar estilos ao documento
const style = document.createElement("style");
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');

  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
  .toast { position: absolute; top: 25px; right: 30px; border-radius: 12px; background: #fff; padding: 20px; box-shadow: 0 5px 10px rgba(0,0,0,0.1); border-left: 6px solid #4070f4; overflow: hidden; transition: 0.5s; }
  .toast.active { transform: translateX(0%); }
  .toast-content { display: flex; align-items: center; }
  .icon { display: flex; align-items: center; justify-content: center; height: 35px; width: 35px; font-size: 20px; border-radius: 50%; }
  .message { margin: 0 20px; }
  .text-1 { font-weight: 600; color: #333; }
`;
document.head.appendChild(style);
