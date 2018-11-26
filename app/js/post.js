
$(document).ready(function () {
  getPost();
})

function getPost() {

  var lista = $("#listaPost")

  var itemPost = `
    <div class="card mb-1">
      <div class="card-header">
        <h5>{titulo}</h5>
      </div>
      <div class="card-body">
        
        <div class="text-right">
          <p>{tags}</p>
        </div>  

        <p class="card-text">{cuerpo}</p>
        <h6 class="card-title">By: {user} </h6>
        
        <div class="text-right">
          <i class="far fa-star"></i>
          <p>{likes} stars</p>
        </div>
        
      </div>
    </div>
  `
  var token = localStorage.getItem("blog_api_user_token");

  fetch("http://68.183.27.173:8080/post", obtenerHeader())
    .then(res => res.json())
    .then(response => {
      var listaPosts = response;

      for (var post of listaPosts) {

        var listaTags = post.tags;
        console.log(listaTags);
        var tag = ''

        for (const tags of listaTags) {
          tag += tags + ', '; 
        }
        
        var item = itemPost;
        item = item.replace("{titulo}", post.title);
        item = item.replace('{cuerpo}', post.body);
        item = item.replace('{user}', `${post.userName} (${post.userEmail})`)
        item = item.replace('{likes}', post.likes);
        item = item.replace('{tags}', tag);        

        lista.append(`<li>${item}</li>`);    
      }
    }).catch((error) => console.log(error));
}