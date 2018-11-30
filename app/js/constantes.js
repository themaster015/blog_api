const direccionApi = "http://68.183.27.173:8080";
const tamanoMinimoCuerpoPost = 350;

function obtenerHeader() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("blog_api_user_token")
    }
  }
}

function obtenerHeaderMethot(metodo, body = {}) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("blog_api_user_token")
    },
    method: metodo,
    body: body
  }
}


