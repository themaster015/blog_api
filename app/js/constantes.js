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

function obtenerHeaderMethot(metodo) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("blog_api_user_token")
    },
    method: metodo
  }
}


function getDatePost(DateTimeStamp) {

  let date = new Date(DateTimeStamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var formattedTime = `${day}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

  return formattedTime;
}