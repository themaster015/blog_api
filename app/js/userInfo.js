$(document).ready(function () {
  getUserInfo();
  getUserPost();

  $("#volverAtrasUserInfo").click(function () {
    volverAtras();
  });

  $("body").on("mouseover", ".pruebaActive", function (e) {
    ponerClase(this);
  });

  $("body").on("mouseleave", ".pruebaActive", function (e) {
    quitarClase(this);
  });
  // $("pruebaActive").mouseover(function () {
  //     ponerClase(this);
  //     // $("p").css("background-color", "yellow");
  //   });
})

function getUserInfo() {

  var userId = localStorage.getItem("blog_api_userId");

  fetch(direccionApi + `/users/${userId}`, obtenerHeader())
    .then(res => res.json())
    .then(response => {

      $("#usuarioNombre").text(response.name);
      $("#email").text(response.email);
      $("#fechaCreacion").text(getFechaHora(response.createdAt));
      $("#cantidadPost").text(response.posts);

    }).catch((error) => console.log(error));
}

function getUserPost() {

  var lista = $("#listaPostUser")

  var plantilla = `
  <a href="javascript:;" id="postUserId{postId}" class="list-group-item list-group-item-action flex-column align-items-start pruebaActive" onclick="abrirInfoPost({postId})">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{titulo}</h5>
      <small>{timeAgo}</small>
    </div>
    <p class="mb-1">{body}</p>
    <small>{infoFooter}</small>
  </a>`

  var userId = localStorage.getItem("blog_api_userId");
  var url = new URL(direccionApi + "/post")
  var params = { userId: userId }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  fetch(url, obtenerHeader())
    .then(res => res.json())
    .then(response => {

      var listaPosts = response;

      for (var post of listaPosts) {
        var cuerpo = post.body.substr(0, 50) + '...';
        var footer = `Views: ${parseInt(post.views)}; likes: ${parseInt(post.likes)}; comments: ${parseInt(post.comments)}`
        var fecha = getTiempoTranscurrido(post.createdAt);

        var item = plantilla
          .replace('{titulo}', post.title)
          .replace('{timeAgo}', fecha)
          .replace('{body}', cuerpo)
          .replace('{infoFooter}', footer)
          .replace('{postId}', parseInt(post.id))
          .replace('{postId}', parseInt(post.id))

        if (post.title !== '') {
          lista.append(item);
        }
      }

    }).catch((error) => console.log(error));
}

function volverAtras() {
  location.href = "posts.html";
}

function abrirInfoPost(postId) {
  localStorage.setItem("blog_api_postId", postId);
  location.href = "postInfo.html";
}

function ponerClase(any) {
  var Id = $(any).attr('id');
  $(`#${Id}`).addClass('active');
}

function quitarClase(any) {
  var Id = $(any).attr('id');
  $(`#${Id}`).removeClass('active');
}