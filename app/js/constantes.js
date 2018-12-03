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

function getFechaHora(DateTimeStamp) {
  let date = new Date(DateTimeStamp);
  var formattedTime = moment(date).format('MMMM DD YYYY, h:mm:ss a');
  return formattedTime;
}

function getFecha(DateTimeStamp) {
  let date = new Date(DateTimeStamp);
  var formattedTime = moment(date).format('MMMM DD YYYY');
  return formattedTime;
}

function getTiempoTranscurrido(DateTimeStamp) {
  let date = new Date(DateTimeStamp);  
  var formattedTime = moment(date, "YYYYMMDD").fromNow(); ///moment(date).format('MMMM DD YYYY, h:mm:ss a');
  return formattedTime;
}


