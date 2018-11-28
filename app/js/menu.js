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
  swal({
    title: 'Esta Seguro?',
    text: "Esta Apunto de Cerrar Su Sesion De Usuario. Desea Continuar?!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Continuar!'
  }).then((result) => {
    if (result.value) {
        localStorage.removeItem("blog_api_user_token");
        location.href = "login.html";
    }
  })

}
