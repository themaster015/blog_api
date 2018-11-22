

$(document).ready(function() {
  $("#login").click(function(){
    login();

    validarToken();
  });
})

function validarToken() {
  localStorage.removeItem("blog_api_user_token");
  var token = localStorage.getItem("blog_api_user_token");
  
  fetch("http://68.183.27.173:8080/post", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then(res => res.json())
  .then(response => {
    
    var resp = JSON.parse(JSON.stringify(response));
    if (resp.estado === 'error') {
      localStorage.removeItem("blog_api_user_token");
    } else {
      location.href = "dashboard.html";    
    }
  })
  .catch(error => {
    console.error('error', error)
  });
}


