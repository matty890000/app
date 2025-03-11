const toast = document.querySelector(".toast"),
      toastIcon = document.querySelector(".toast-icon"),
      toastTitle = document.querySelector(".text-1"),
      toastMessage = document.querySelector(".text-2"),
      closeIcon = document.querySelector(".close"),
      progress = document.querySelector(".progress");

let timer1, timer2;

function showToast(type, title, message) {
    // Definir a classe e ícone com base no tipo
    const icons = {
        success: "fa-check",
        error: "fa-times",
        warning: "fa-exclamation"
    };

    toast.classList.remove("success", "error", "warning"); // Remover classes antigas
    toast.classList.add("active", type);
    progress.classList.add("active");

    toastIcon.className = `fas toast-icon ${icons[type]}`;
    toastTitle.innerText = title;
    toastMessage.innerText = message;

    // Fechar automaticamente após 5 segundos
    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 5000);

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 5300);
}

// Fechar ao clicar no botão de fechar
closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");
    setTimeout(() => {
        progress.classList.remove("active");
    }, 300);
    clearTimeout(timer1);
    clearTimeout(timer2);
});
