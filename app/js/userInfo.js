$(document).ready(function () {
  getUserInfo();

  $("#volverAtrasUserInfo").click(function () {
    volverAtras();
  });
})

function getUserInfo() {
  
  var userId = localStorage.getItem("blog_api_userId");

  fetch(direccionApi + `/users/${userId}`, obtenerHeader())
    .then(res => res.json())
    .then(response => {
      
      $("#usuarioNombre").text(response.name);
      $("#email").text(response.email);
      $("#fechaCreacion").text(getDatePost(response.createdAt));
      $("#cantidadPost").text(response.posts);

      console.log(response);

    })
    .catch((error) => console.log(error));
}

function volverAtras() {
  location.href="posts.html";
}
