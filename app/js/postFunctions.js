
function getTags(tags) {

  var htmlTag = `<span class="badge badge-pill badge-success">{tag}</span> &nbsp`
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


function getComents(coments) {
  var htmlComent = `<p> {usuarioInfo}: {coment}  <br> <span class="text-muted">{fecha}</span> </p>`
  var htmlComent2 = '';
  var listaComent = coments;
  var comentario = ''

  

  for (const coment of listaComent) {
    
    var fecha = getDate(coment.createdAt);
    // var fechaActual = new Date();
    // var diff = fechaActual - fecha;
    // console.log(diff/(1000*60*60*24));

    comentario = htmlComent;
    comentario = comentario.replace('{coment}', coment.body)
    .replace('{usuarioInfo}', `<span class="text-muted"><i style="color: blue">${coment.userName}</i></span>`)
    .replace('{fecha}', fecha);
    htmlComent2 += comentario;
  }

  return htmlComent2;
}

function getDate(DateTimeStamp) {

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