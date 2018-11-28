$(document).ready(function() {
  $("#registrarse").click(function(){
    registrar();
  })
})

function registrar() {
  var username = $("#email").val();
  var name = $("#nombre").val();
  var password1 = $("#password1").val();
  var password2 = $("#password2").val();

  if (password1 != password2) {
    alert("La contraseña son diferentes")
  }

  var data = {
    name: name,
    email: username, 
    password: password1
  }
    
  fetch("http://68.183.27.173:8080/register", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then( res => res.json())
  .then(() => {
    location.href = "login.html"
  })
  .catch(error => console.error('error', error));
}

