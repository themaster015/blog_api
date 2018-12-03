
$(document).ready(function () {
  $("body").on("click", ".likedStar", function (e) {
    e.preventDefault();

    var post = parseInt($.trim($(this).attr("postid")));
    var tieneLike = $(`#likePost${post}`).hasClass("fas");

    evaluarLike(post, tieneLike);
  })

  getPost();
})

function evaluarLike(post, tieneLike) {
  if (tieneLike === true) {
    quitarLike(post);
  } else {
    generarLike(post);
  }
}

function generarLike(postId) {
  fetch(direccionApi + `/post/${postId}/like`, obtenerHeaderMethot('PUT'))
    .then(response => {
      if (response.ok) {
        $(`#likePost${postId}`).removeClass("far").addClass("fas");
        reactualizarLikes(postId, 1);
      }
    })
    .catch((error) => console.log(error));
}

function quitarLike(postId) {
  fetch(direccionApi + `/post/${postId}/like`, obtenerHeaderMethot('DELETE'))
    .then(response => {
      if (response.ok) {
        $(`#likePost${postId}`).removeClass("fas").addClass("far");
        reactualizarLikes(postId, -1);
      }
    }).catch((error) => console.log(error));
}

function reactualizarLikes(postId, cantidad) {
  var likes = $(`#likesCount${postId}`).text();

  var cantlikes = likes.replace("likes","");
  cantlikes = parseInt(cantlikes);
  cantlikes = cantlikes + cantidad;

  $(`#likesCount${postId}`).text(cantlikes + " likes ");
}

function abrirInfoUsuario(userId) {
  localStorage.setItem("blog_api_userId", userId);
  location.href = "userInfo.html";
}

function abrirInfoPost(postId) {
  localStorage.setItem("blog_api_postId", postId);
  location.href = "postInfo.html";
}

function getPost() {

  var lista = $("#listaPost")
  var itemPost = `
    <div class="card border-primary mb-3">
      <div class="card-header bg-primary">
        <div class="row">
          <div class="col-sm-8">
            <i postid="{postId}" class="{likePost} fa-heart fa-lg mt-3 likedStar" style="color:white; cursor: pointer;" id="{likePostId}"></i> &nbsp 
            <button class="btn btn-link" onclick="abrirInfoPost({postId})"><h4 style="color:white">{titulo}</h4></button>
          </div>
          
          <div class="col-sm-4">
            <i class="fa fa-eye mt-3" style="color:white; float: right;" title="Cantidad de vistas"> {views} </i>
          </div>          
        </div>
      </div>

      <div class="card-body">
        
        <div class="text-right">
          {tags}
        </div>

        <p class="card-text">{cuerpo}</p>
        
        <div class="row">
          <div class="col-sm-6">
            <h6 class="card-title">By: <button class="btn btn-link" onclick="abrirInfoUsuario({userId})">{user}</button> </h6>
          </div>

          <div class="col-sm-6">
            <div class="row" style="float: right;">
              <div>
                <i class="fas fa-thumbs-up ml-3" style="color:green"></i> &nbsp &nbsp
                <p id="{likesCount}" style="color:green">{likes} likes &nbsp &nbsp</p>
              </div>
              <div>
                <i class="fas fa-comments ml-4" style="color:green"></i>
                <p id="{likesCount}" style="color:green">{coments} Coments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="row">
          <div class="col-sm-6">
            <button onclick="verComentarios({postId})" class="btn btn-success btn-sm" type="button" data-toggle="collapse" data-target="#{comentarioId}" aria-expanded="false" aria-controls="{comentarioId}">Ver Comentarios</button>
          </div>
          <div class="col-sm-6 text-muted text-right">
            Creado en fecha: {fechaCreado}
          </div>
        </div>        
      </div>
    </div>

    <div class="collapse" id="{comentarioId}">
      <div class="card card-body">
        <div id="detalle{comentarioId}"></div>
        <div class="form-group">
          <label for="comentarioDelPost{postId}">Deja tu Comentario:</label>
          <textarea class="form-control" id="comentarioDelPost{postId}" rows="3"></textarea>
        </div>
        <div style="width:50 px">
          <button class="btn btn-primary"> <i class="fa fa-plus fa-lg"></i> Comentar</button>
        </div>
      </div>
    </div>

    <hr>
  `

  fetch(direccionApi + "/post", obtenerHeader())
    .then(res => res.json())
    .then(response => {
      var listaPosts = response;

      for (var post of listaPosts) {
        var tamanoPost = post.body.length;

        var cuerpo = post.body;

        if (tamanoPost > tamanoMinimoCuerpoPost) {
          var cuerpo = post.body.substr(0, tamanoMinimoCuerpoPost) + '...';
        }

        var tag = getTags(post.tags);
        var fecha = getFechaHora(post.createdAt);
        // var comentarios = getComents(post.coments)

        var item = itemPost.replace('{titulo}', post.title)
          .replace('{cuerpo}', cuerpo)
          .replace('{user}', `${post.userName} (${post.userEmail})`)
          .replace('{likes}', post.likes)
          .replace('{tags}', tag)
          .replace('{likePostId}', $.trim(`likePost${post.id}`))
          .replace('{postId}', `${post.id}`)
          .replace('{postId}', `${post.id}`)
          .replace('{postId}', `${post.id}`)
          .replace('{postId}', `${post.id}`)
          .replace('{fechaCreado}', fecha)
          .replace('{userId}', post.userId)
          .replace('{views}', post.views)
          .replace('{coments}', post.comments)
          .replace('{comentarioId}', `comentarioPost${post.id}`)
          .replace('{comentarioId}', `comentarioPost${post.id}`)
          .replace('{comentarioId}', `comentarioPost${post.id}`)
          .replace('{comentarioId}', `comentarioPost${post.id}`)
          // .replace('{comentario}', comentarios)
          .replace('{likesCount}', `likesCount${post.id}`);

        if (post.liked) {
          item = item
            .replace('{likePost}', 'fas')
            .replace('{colorHeart}', $.trim(`style="color:red"`))
        } else {
          item = item
            .replace('{likePost}', 'far')
            .replace('{colorHeart}', '')
        }

        if (tamanoPost > 150) {
          lista.append(`<li>${item}</li>`);
        }

      }
    })
    .catch((error) => console.log(error));
}


function verComentarios(postId) {

  var detalle = `detallecomentarioPost${postId}`;
  console.log(detalle);

  fetch(direccionApi + `/post/${postId}/comment`, obtenerHeader())
  .then(res => res.json())
  .then(response => {
    var comentarios = getComents(response);
    $(`#${detalle}`).text('');
    $(`#${detalle}`).append(comentarios);
  })
  .catch((error) => console.log(error));
}