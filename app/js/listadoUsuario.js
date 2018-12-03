
$(document).ready(function () {
  getListadoUsuario();
})


function getListadoUsuario() {

  var lista = $("#ListadoUsuario");

  var plantilla = `
    <div class="col-lg-6 col-xl-3 col-md-6 mb-5">
        <div class="card">
          <div class="card-block">
            <div">
              <img class="img-fluid img-radius" src="../assets/images/{userImage}.jpeg" alt="round-img">
            </div>
            <div class="p-2 text-center">
              <h4 class="mt-1">{nombreUsuario}</h4>
              <p class="m-b-0 text-muted">{emailUsuario}</p>
              <h6> Post: <span class="badge badge-primary">{cantidaPostUsuario}</span> </h6>
              <span>{fecha}</span>
            </div>
          </div>
        </div>
      </div>`

  fetch(direccionApi + "/users", obtenerHeader())
    .then(res => res.json())
    .then(response => {
      var listaUsers = response;

      for (var usuario of listaUsers) {
       
        let esMujer = false;
        let nombre = usuario.name.toLowerCase();

        var mujeres = "manuela, yury, suly, carmen, yureyny, suleyny, yahaira, carmen";
        if (mujeres.includes(nombre)) {
          esMujer = true;
        }

        if (esMujer) {
          let aleatorio = numeroAleatorio(1, 4);
          var imagen = "user" + aleatorio;  
        } else {
          let aleatorio = numeroAleatorio(5, 10);
          var imagen = "user" + aleatorio;
        }

        var fecha = getDate(usuario.createdAt);
        
        var item = plantilla.replace('{nombreUsuario}', usuario.name)
          .replace('{emailUsuario}', usuario.email)
          .replace('{userImage}', imagen)
          .replace('{cantidaPostUsuario}', parseInt(usuario.posts))
          .replace('{fecha}', fecha);

          lista.append(item);
      }
    })
    .catch((error) => console.log(error));
}

function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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