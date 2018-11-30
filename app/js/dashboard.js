$(document).ready(function () {
  $("#btnPost").click(function () {
    accederPost()
  });

  $("#btnNuevoPost").click(function () {
    crearPost()
  });

  
  $("#btnListadousuarios").click(function () {
    accederUsuarios()
  });

})

function accederPost() {
  location.href = "posts.html"
}

function crearPost() {
  location.href = "crearPost.html"
}

function accederUsuarios() {
  location.href = "listadoUsuario.html"
}
