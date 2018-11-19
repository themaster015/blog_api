$(document).ready(function() {
  $("#login").click(function(){
    login();
  })

  var token = localStorage.getItem("blog_api_user_token");

  if (token !== undefined && token !== null) {
    alert('Usuario Logueado Redireccionando a Dashboard');
    location.href = "dashboard.html";
  }
})
