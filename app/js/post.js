
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
 debugger;
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
  debugger;
  localStorage.setItem("blog_api_postId", postId);
  location.href = "postInfo.html";
}

function getPost() {

  var lista = $("#listaPost")

  var itemPost = `
    <div class="card border-primary mb-3">
      <div class="card-header bg-primary">
        <div class="row">
          <i postid="{postId}" class="{likePost} fa-heart fa-lg mt-1 likedStar"  style="color:white" id="{likePostId}"></i> &nbsp 
          <h5><a style="color:white" href="#">{titulo}</a></h5>
          <h5><button class="btn btn-link" onclick="abrirInfoPost({postId})">{titulo}</button></h5>
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
            <div class="text-right">
              <i class="fas fa-thumbs-up" style="color:blue"></i>
              <p id="{likesCount}" style="color:blue">{likes} likes</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer text-muted text-right">
        Creado en fecha: {fechaCreado}
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
        var fecha = getDatePost(post.createdAt);

        var item = itemPost.replace('{titulo}', post.title)
          .replace('{cuerpo}', cuerpo)
          .replace('{user}', `${post.userName} (${post.userEmail})`)
          .replace('{likes}', post.likes)
          .replace('{tags}', tag)
          .replace('{likePostId}', $.trim(`likePost${post.id}`))
          .replace('{postId}', `${post.id}`)
          .replace('{postId}', `${post.id}`)
          .replace('{fechaCreado}', fecha)
          .replace('{userId}', post.userId)
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

function getTags(tags) {

  var htmlTag = `<span class="badge badge-pill badge-success">{tag}</span> &nbsp`
  var htmlTag2 = '';
  var listaTags = tags;
  var tag = ''

  for (const tags of listaTags) {
    tag = htmlTag;
    tag = tag.replace('{tag}', tags)
    htmlTag2 += tag;
  }

  return htmlTag2;
}
