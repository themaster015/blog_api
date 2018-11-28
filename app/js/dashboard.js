$(document).ready(function () {
  $("#btnPost").click(function () {
    accederPost()
  });

  $("#btnNuevoPost").click(function () {
    crearPost()
  });
})

function accederPost() {
  location.href = "posts.html"
}

function crearPost() {
  location.href = "crearPost.html"
}
