$(document).ready(function () {
  getUserInfo();
  getUserPost();

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
      $("#fechaCreacion").text(getDate(response.createdAt));
      $("#cantidadPost").text(response.posts);

    }).catch((error) => console.log(error));
}

function getUserPost() {
  
  var lista = $("#listaPostUser")

  var userId = localStorage.getItem("blog_api_userId");
  var url = new URL(direccionApi + "/post")
  var params = { userId: userId }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  fetch(url, obtenerHeader())
    .then(res => res.json())
    .then(response => {

      var listaPosts = response;

      for (var post of listaPosts) {
        item = post.title

        if (item !== '') {
          // lista.append(`<li class="list-group-item">${item}</li>`);
          lista.append(`<a href="#" class="list-group-item list-group-item-action list-group-item-primary">${item}</a>`)
        }        
      }
      
    }).catch((error) => console.log(error));
}

function volverAtras() {
  location.href = "posts.html";
}
