document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");
  
    if (logoutButton) {
      logoutButton.addEventListener("click", function (event) {
        event.preventDefault(); // Impede o comportamento padrão do link
  
        // Remover dados do usuário (localStorage ou sessionStorage)
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
  
        // Redirecionar para a página de login
        window.location.href = "login.html"; // Substitua pelo caminho correto
      });
    }
  });
  