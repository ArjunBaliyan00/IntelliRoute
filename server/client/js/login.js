// Login Form

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {

        alert("Please enter Username and Password");
        return;

    }

    // Demo Login
    if (username === "admin" && password === "admin123") {

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        window.location.href = "dashboard.html";

    }
    else {

        alert("Invalid Username or Password");

    }

});