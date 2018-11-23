import { direccionApi, obtenerHeader } from "./constantes";
import '../../app/css/general.css'

$(document).ready(function () {
  validarToken();
})

function validarToken() {
  fetch(direccionApi + '/post', obtenerHeader())
    .then(response => {
      
      if (response.ok) {
        location.href = "/pages/dashboard.html";
        return;
      }

      redireccionarLogin();
    })
    .catch(() => console.log(error));
}

function redireccionarLogin() {
  localStorage.removeItem("blog_api_user_token");
  location.href = "/pages/login.html";
}


