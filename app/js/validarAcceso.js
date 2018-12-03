
$(document).ready(function () {
  validarToken();
})

function validarToken() {
  fetch(direccionApi + '/post', obtenerHeader())
    .then(response => {
      
      if (!response.ok) {
        redireccionarLogin();
      }
    })
    .catch((error) => console.log(error));
}

function redireccionarLogin() {
  localStorage.removeItem("blog_api_user_token");
  location.href = "login.html";
}


