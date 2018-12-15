function wsConnect(token) {

  // console.log("WS- connect ", token);
  var websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);

  websocket.onopen = function (evt) {
    console.log(evt)
  };

  websocket.onclose = function (evt) {
    console.log(evt)
  };

  websocket.onerror = function (evt) {
    console.log(evt)
  };

  websocket.onmessage = function (evt) {
    var data = JSON.parse(evt.data);
    // console.log(data);

    switch (data.type) {
      case "likes":
        $(`#autoLike${data.postId}`).text(data.likes)
        break;
      case "view-post":
        $(`#autoView${data.postId}`).text(data.views);
        break;
      case "new-comment":
        alertify.success('Nuevo comentario de: ' + data.userName);
        $(`#autoComent${data.postId}`).text(data.comments);
        break;
      case "logged":
        agregarClaseConectado(data.userId);
        for (var user of data.users) {
          agregarClaseConectado(user.userId);
        }
        break;
      case "user-connected":
        var usuario = ''
        if (data.useName === undefined) {
          usuario = 'Usuario Sin Nombre'
        } else {
          usuario = data.userName;
        }

        alertify.success('usuario Conectado: ' + usuario);
        agregarClaseConectado(data.userId);
        break;
      case "disconnected":
        alertify.error('usuario Desconectado: ' + data.userName);
        quitarClaseConectado(data.userId)
        break;
    }
  };
}

function agregarClaseConectado(userId) {
  $(`#iconoUser${userId}`).removeClass("text-muted").addClass("text-success");
}

function quitarClaseConectado(userId) {
  $(`#iconoUser${userId}`).removeClass("text-success").addClass("text-muted");
}
