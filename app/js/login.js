$(document).ready(function () {
  $("#login").click(function () {
    login();
  });
})

function login() {
  var username = $("#username").val();
  var password = $("#password").val();

  if (username === '' || password === '') {
    alert('Debe introducir el usuario y la contraseña');
    return;
  }

  var data = {
    email: username,
    password: password,
  }

  fetch(direccionApi + "/login", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => {
      var data = JSON.parse(JSON.stringify(response));
      localStorage.setItem("blog_api_user_token", data.token);
      location.href = "dashboard.html";
  })
  .catch(error => {
    alert('El Usuario o la contraseña son Incorrectos')
    console.error('error', error)
  });
}