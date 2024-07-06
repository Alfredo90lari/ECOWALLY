document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.querySelectorAll(".toggle-password");

  togglePassword.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const passwordInput = this.parentNode.querySelector("input");
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.querySelector("i").classList.toggle("fa-eye");
      this.querySelector("i").classList.toggle("fa-eye-slash");
    });
  });
});
