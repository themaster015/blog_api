const direccionApi = "http://68.183.27.173:8080";

function obtenerHeader() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("blog_api_user_token")
    }
  }
}

