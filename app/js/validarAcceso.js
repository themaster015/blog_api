
$(document).ready(function () {
  validarToken();
})

function validarToken() {
  var token = localStorage.getItem("blog_api_user_token");
  
  fetch(direccionApi + '/post', obtenerHeader())
    .then(response => {
      
      if (!response.ok) {
        redireccionarLogin();
      } else {
        wsConnect(token);
      }
    })
    .catch((error) => console.log(error));
}

function redireccionarLogin() {
  localStorage.removeItem("blog_api_user_token");
  location.href = "login.html";
}


