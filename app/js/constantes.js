export const direccionApi = "http://68.183.27.173:8080";

export function obtenerHeader() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("blog_api_user_token")
  }
}
