$(document).ready(function () {
  $("#volverAtrasPostInfo").click(function () {
    volverAtrasPostInfo();
  });

  $("#aceptarComentario").click(function () {
    comentarPost();
  });

  obtenerInfoPost();
  obtenerComentarios();
})


function volverAtrasPostInfo() {
  location.href = "posts.html";
}


function obtenerInfoPost() {
  var postId = localStorage.getItem("blog_api_postId");

  fetch(direccionApi + `/post/${postId}`, obtenerHeader())
    .then(res => res.json())
    .then(response => {

      var tags = getTags(response.tags);

      $("#postTitulo").text(response.title);
      $("#postBody").text(response.body);
      $("#postVista").text(parseInt(response.views));
      $("#postLikes").text(parseInt(response.likes));
      $("#postComen").text(parseInt(response.comments));
      $("#postUserInfo").text(`Creado Por: ${response.userName} (${response.userEmail})`)
      $("#postTags").append(tags);
    })
    .catch((error) => console.log(error));
}

function obtenerComentarios() {
  var postId = localStorage.getItem("blog_api_postId");

  fetch(direccionApi + `/post/${postId}/comment`, obtenerHeader())
    .then(res => res.json())
    .then(response => {
      var comentarios = getComents(response);
      $("#postComentarios").append(comentarios);
    })
    .catch((error) => console.log(error));
}

function comentarPost() {
  var comentario = $("#comentarioDelPost").val();

  if (comentario === '') {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'Debe especificar el comentario',
    })
    return;
  }

  var data = {
    body: comentario
  }

  var postId = localStorage.getItem("blog_api_postId");

  fetch(direccionApi + `/post/${postId}/comment`, obtenerHeaderMethot('POST', JSON.stringify(data)))
    .then(response => {
      //$("#modalComentarios").modal('hide');
      $('.modal').removeClass('show');
      location.href="postinfo.html";
    })
    .catch((error) => console.log(error));
}