document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMeCheckbox = document.getElementById("rememberMe");
    const togglePassword = document.getElementById("togglePassword");
    const errorMessage = document.getElementById("errorMessage");
  
    const ADMIN_EMAIL = "admin@hisab.com";
    const ADMIN_PASSWORD = "admin123";
  
    // Check if user is already logged in
    checkLoginStatus();
  
    // Toggle password visibility
    togglePassword.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  
    // Handle login form submission
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin();
    });
  
    function handleLogin() {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!email || !password) {
        showMessage("Please fill in all fields", "error");
        return;
      }
  
      // Check if credentials match
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Login successful
        const loginData = {
          email: ADMIN_EMAIL,
          loginTime: Date.now()
        };
  
        // Save login session
        if (rememberMeCheckbox.checked) {
          localStorage.setItem("currentUser", JSON.stringify(loginData));
          localStorage.setItem("rememberMe", "true");
        } else {
          sessionStorage.setItem("currentUser", JSON.stringify(loginData));
        }
  
        showMessage("Login successful! Redirecting...", "success");
  
        // Redirect to home page after 1 second
        setTimeout(() => {
          window.location.href = "home.html";
        }, 1000);
      } else {
        // Invalid credentials
        showMessage("Invalid email or password!", "error");
        // Clear password field for security
        passwordInput.value = "";
      }
    }
  
    function checkLoginStatus() {
      // Check if user is already logged in
      const currentUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
      
      if (currentUser) {
        // User is already logged in, redirect to home
        window.location.href = "home.html";
      }
  
      // Auto-fill email if remember me was checked
      const rememberMe = localStorage.getItem("rememberMe");
      if (rememberMe === "true") {
        emailInput.value = ADMIN_EMAIL;
        rememberMeCheckbox.checked = true;
      }
    }
  
    function showMessage(message, type) {
      errorMessage.textContent = message;
      errorMessage.className = `errorMessage show ${type}`;
  
      // Hide message after 3 seconds
      setTimeout(() => {
        errorMessage.classList.remove("show");
      }, 3000);
    }
  });