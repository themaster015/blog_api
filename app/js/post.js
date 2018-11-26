
$(document).ready(function () {
  getPost();
})

function abrirInfoUsuario(userId) {
  console.log('hola');
  localStorage.setItem("blog_api_userId", userId); 
  location.href ="userInfo.html";
}

function getPost() {

  var lista = $("#listaPost")

  var itemPost = `
    <div class="card mb-3">
      <div class="card-header">
        <div class="row">
          <i class="{likePost} fa-star fa-lg mt-1 id="{likePostId}""></i> &nbsp 
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
        .replace('{fechaCreado}', fecha)
        .replace('{userId}', post.userId);

        if (post.liked) {
          item = item.replace('{likePost}', 'fa');
        } else {
          item = item.replace('{likePost}', 'far');
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
