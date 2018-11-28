$(document).ready(function () {
  $("#btnDashboard").click(function () {
    goDashboard();
  });

  $("#btnListadoPost").click(function () {
    goListadoPost();
  });

  $("#btnCrearPost").click(function () {
    goCrearPost();
  });

  $("#btnCerrarSecion").click(function () {
    cerrarSesion();
  });
})

function goDashboard() {
  location.href = "dashboard.html";
}

function goListadoPost() {
  location.href = "posts.html";
}

function goCrearPost() {
  location.href = "crearPost.html";
}

function cerrarSesion() {
  localStorage.removeItem("blog_api_user_token");
  location.href = "login.html";
}
