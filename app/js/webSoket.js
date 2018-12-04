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
    console.log(data);

    switch (data.type) {
      case "likes":
        $(`#autoLike${data.postId}`).text(data.likes)
        break;
      case "view-post":
        $(`#autoView${data.postId}`).text(data.views);
        break;
      case "new-comment":
        $(`#autoComent${data.postId}`).text(data.comments);
        break;
      case "logged":
        for (var user of data.users) {
          $(`#iconoUser${user.userId}`).addClass("text-success");
        }
        break;
      case "user-connected":
        $(`#iconoUser${data.userId}`).addClass("text-success");
        break;
      case "disconnected":
        $(`#iconoUser${data.userId}`).removeClass("text-success").addClass("text-muted");
        break;
    }
  };
}