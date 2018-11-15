$(document).ready(function() {
  $("#login").click(function(){
    login();
  })

  $('#register').click(function(){
    register();
  })
})

function login() {
  var username = $("#username").val();
  var password = $("#password").val();

  if ("eduardo" === username && "1234" === password) {
    alert('Bienvenido a Blog Api ' + username);
  } else {
    alert('Usuario y/o contraseña son incorrectos' + username);
  }
}

function register() {
  alert('El Usuario Se va Registrar')
}