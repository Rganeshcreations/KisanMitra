function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, role })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("message").innerText = data.message;
    })
    .catch(() => {
      document.getElementById("message").innerText = "Error occurred";
    });
}

// =======================
// Login Function
// =======================
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        document.getElementById("message").innerText = "Login successful";

        // Role-based redirect
        if (data.user.role === "farmer") {
          window.location.href = "farmer.html";
        } else if (data.user.role === "expert") {
          window.location.href = "expert.html";
        } else if (data.user.role === "government") {
          window.location.href = "government.html";
        } else {
          window.location.href = "public.html";
        }
      } else {
        document.getElementById("message").innerText = data.message;
      }
    })
    .catch(() => {
      document.getElementById("message").innerText = "Login failed";
    });
}

