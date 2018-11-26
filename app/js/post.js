
$(document).ready(function () {
  getPost();
})

function getPost() {

  var lista = $("#listaPost")

  var itemPost = `
    <div class="card mb-3">
      <div class="card-header">
        <div class="row">
          <i class="{likePost} id="{likePostId}" fa-star fa-lg mt-1"></i> &nbsp 
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
            <h6 class="card-title">By: <a href="#">{user}</a> </h6>
          </div>

          <div class="col-sm-6">
            <div class="text-right">
              <i class="far fa-star"></i>
              <p>{likes} stars</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>
  `
  var token = localStorage.getItem("blog_api_user_token");

  fetch(direccionApi + "/post", obtenerHeader())
    .then(res => res.json())
    .then(response => {
      var listaPosts = response;

      for (var post of listaPosts) {
        var tamanoPost = post.body.length;

        if (tamanoPost > 150) {
          var tag = getTags(post.tags);
          var item = itemPost;
          item = item.replace('{titulo}', post.title);
          item = item.replace('{cuerpo}', post.body);
          item = item.replace('{user}', `${post.userName} (${post.userEmail})`)
          item = item.replace('{likes}', post.likes);
          item = item.replace('{tags}', tag);
          item = item.replace('{likePostId}', `likePost${post.id}`);

          if (post.liked) {
            item = item.replace('{likePost}', 'fa'); 
          } else {
            item = item.replace('{likePost}', 'far'); 
          }

          lista.append(`<li>${item}</li>`);
        }
      }
    }).catch((error) => console.log(error));
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