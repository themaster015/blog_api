$(document).ready(function () {
  $("#btnDashboard").click(function () {
    goDashboard();
  });
  $("#btnGuardarPost").click(function () {
    guardarPost();
  });

  $("#btnCancelarPost").click(function () {
    cancelarPost();
  });

  $("#btnAgregarTag").click(function () {
    agregarTag();
  });
})

function cancelarPost() {

  swal({
    title: 'Esta Seguro?',
    text: "Puede Perder Los Cambios Que no Haya Registrado. Desea Continuar?!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Continuar!'
  }).then((result) => {
    if (result.value) {
      location.href = "dashboard.html";
    }
  })
}

function agregarTag() {
  // var htmlTag = `<span class="badge badge-success badge-lg">{tag}</span> &nbsp`
  var htmlTag = `<span class="label label-default"><i class="ml-0 fa fa-times"></i> {tag}</span> &nbsp`
  var htmlTag2 = ''; 
  var tag = ''

  var tags = $("#tagsPost").val();

  if (tags === '') {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'Debe especificar almenos un Tag!',
    })
    return;
  }

  var listaTags = tags.split(",");

  for (const tags of listaTags) {
    tag = htmlTag;
    tag = tag.replace('{tag}', tags)
    htmlTag2 += tag;
  }

  $("#tagsDelPost").append(htmlTag2);
  $("#tagsPost").val("");

  // return htmlTag2;
}

function guardarPost() {
  swal({
    type: 'success',
    title: 'Post Registrado Correctamente',
    showConfirmButton: false,
    timer: 1500
  }).then((result) => {
      location.href = "dashboard.html";
  })
}
