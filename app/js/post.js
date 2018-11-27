
$(document).ready(function () {
  $("body").on("click", ".likedStar", function (e) {
    e.preventDefault();
    var post = $.trim($(this).attr("postid"));
    var tieneLike = $.trim($(this).attr("tieneLike"));
    evaluarLike(post, tieneLike);
  })

  getPost();
})

function evaluarLike(post, tieneLike) {
  console.log(tieneLike);
  console.log(post);
  if (tieneLike === 1) {
    quitarLike(post);
  } else {
    generarLike(post);
  }
}

function generarLike(postId) {
  fetch(direccionApi + `/post/${postId}/like`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("blog_api_user_token")
    },
    method: 'PUT'
  }).then(response => {
    if (response.ok) {
      console.log('like puesto');
    }
  }).catch((error) => console.log(error));
}

function quitarLike(postId) {
  fetch(direccionApi + `/post/${postId}/like`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("blog_api_user_token")
    },
    method: 'DELETE'
  }).then(response => {
    if (response.ok) {
      console.log('like quitado');
    }
  }).catch((error) => console.log(error));
}

function abrirInfoUsuario(userId) {
  localStorage.setItem("blog_api_userId", userId);
  location.href = "userInfo.html";
}

function getPost() {

  var lista = $("#listaPost")

  var itemPost = `
    <div class="card mb-3">
      <div class="card-header">
        <div class="row">
          <i postid="{postId}" tieneLike={tieneLike} class="{likePost} fa-star fa-lg mt-1 likedStar id="{likePostId}" "></i> &nbsp 
          <h5><a href="#"> {titulo}</a></h5>
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
              <i class="far fa-star"></i>
              <p>{likes} stars</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer text-muted text-right">
        Creado en fecha: {fechaCreado}
      </div>
    </div>
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
          .replace('{likePostId}', `likePost${post.id}`)
          .replace('{postId}', `${post.id}`)
          .replace('{fechaCreado}', fecha)
          .replace('{userId}', post.userId);

        if (post.liked) {
          item = item.replace('{likePost}', 'fa');
          item = item.replace('{tieneLike}','1');
        } else {
          item = item.replace('{likePost}', 'far');
          item = item.replace('{tieneLike}','0')
        }

        if (tamanoPost > 150) {
          lista.append(`<li>${item}</li>`);
        }

      }
    })
    .catch((error) => console.log(error));
}

function getTags(tags) {

  var htmlTag = `<span class="badge badge-pill badge-primary">{tag}</span> &nbsp`
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
