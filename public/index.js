const url = "http://localhost:3000/api/v1/examen";

window.addEventListener("load", () => {
  let htmlGenerado = "";
  htmlGenerado += `<div class="container p-2">`;
  htmlGenerado += `<h1 class="text-center">Aplicación CSR</h1>`;

  htmlGenerado += `<div class="row mb-3">`;

  htmlGenerado += `<div class="col-2">`;
  htmlGenerado += `<label class="form-label" for="txtCodigo">Codigo:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtCodigo"  />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-5">`;
  htmlGenerado += `<label class="form-label" for="txtFecha">Fecha:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtFecha" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-5">`;
  htmlGenerado += `<label class="form-label" for="txtApostador">Apostador:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtApostador" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="row mb-3">`;

  htmlGenerado += `<div class="col-6">`;
  htmlGenerado += `<label class="form-label" for="txtEvento">Evento:</label>`;
  htmlGenerado += `<input class="form-control" type="text" id="txtEvento" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="col-6">`;
  htmlGenerado += `<label class="form-label" for="txtValor">Valor:</label>`;
  htmlGenerado += `<input class="form-control" type="number" id="txtValor" />`;
  htmlGenerado += `</div>`;

  htmlGenerado += `</div>`;

  htmlGenerado += `<div class="d-flex justify-content-center">`;
  htmlGenerado += `<button class="m-2 btn btn-primary" id="btnNuevo">Nuevo</button>`;
  htmlGenerado += `<button class="m-2 btn btn-dark" id="btnConsultar">Ver Apuestas</button>`;
  htmlGenerado += `<button class="m-2 btn btn-success" id="btnApostar">Apostar</button>`;
  htmlGenerado += `<button class="m-2 btn btn-info" id="btnFiltrar">Filtrar</button>`;
  htmlGenerado += `<button class="m-2 btn btn-warning" id="btnPagar">Pagar</button>`;

  htmlGenerado += `</div>`;
  htmlGenerado += `<div id="divContenido"></div>`;

  htmlGenerado += `</div>`;

  contenidoCSR.innerHTML = htmlGenerado;

  btnNuevo.addEventListener("click", () => {
    txtCodigo.value = "";
    txtFecha.value = "";
    txtApostador.value = "";
    txtEvento.value = "";
    txtValor.value = "";
  });

  btnApostar.addEventListener("click", () => {
    let data = {
      codigo: txtCodigo.value,
      fecha: txtFecha.value,
      apostador: txtApostador.value,
      evento: txtEvento.value,
      valor: parseInt(txtValor.value),
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        txtCodigo.value = "";
        txtFecha.value = "";
        txtApostador.value = "";
        txtEvento.value = "";
        txtValor.value = "";
        alert(data);
      })
      .catch((err) => console.log(err));
  });

  btnPagar.addEventListener("click", () => {
    if (txtCodigo.value === "") {
      alert(
        "Debe filtrar primero por el codigo del apostador y luego sleeccionar que apuesta se va a pagar"
      );
    } else {
      fetch(`${url}/pagado/${txtCodigo.value}`)
        .then((res) => res.json())
        .then((data) => {
          txtCodigo.value = "";
          txtFecha.value = "";
          txtApostador.value = "";
          txtEvento.value = "";
          txtValor.value = "";
          alert(data);
        })
        .catch((err) => console.log(err));
    }
  });

  btnConsultar.addEventListener("click", () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let tabla = `<table class="table table-bordered table-striped my-3 table-hover" border=1>`;

        data.forEach((element) => {
          tabla += `<tr>`;
          tabla += `<td>${element.codigo}`;
          tabla += `<td>${element.fecha}`;
          tabla += `<td>${element.apostador}`;
          tabla += `<td>${element.evento}`;
          tabla += `<td>${element.valor}`;
          tabla += `<td>${element.estado}`;
          tabla += `</tr>`;
        });

        tabla += "</table>";
        divContenido.innerHTML = tabla;
      });
  });

  btnFiltrar.addEventListener("click", () => {
    if (txtApostador.value === "") {
      alert("debe poner el codigo del apostador");
    } else {
      fetch(`${url}/apostador/${txtApostador.value}`)
        .then((res) => res.json())
        .then((data) => {
          let tabla = `<table class="table table-bordered table-striped my-3 table-hover" border=1>`;

          data.forEach((element) => {
            tabla += `<tr class="mostrar" data-id="${element.codigo}">`;
            tabla += `<td>${element.codigo}`;
            tabla += `<td>${element.fecha}`;
            tabla += `<td>${element.apostador}`;
            tabla += `<td>${element.evento}`;
            tabla += `<td>${element.valor}`;
            tabla += `<td>${element.estado}`;
            tabla += `</tr>`;
          });

          tabla += "</table>";
          divContenido.innerHTML = tabla;

          document.querySelectorAll(".mostrar").forEach((e) => {
            e.addEventListener("click", () => {
              fetch(`${url}/${e.getAttribute("data-id")}`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.codigo) {
                    txtCodigo.value = data.codigo;
                    txtFecha.value = data.fecha;
                    txtApostador.value = data.apostador;
                    txtEvento.value = data.evento;
                    txtValor.value = data.valor;
                  } else {
                    txtCodigo.value = "";
                    txtFecha.value = "";
                    txtApostador.value = "";
                    txtEvento.value = "";
                    txtValor.value = "";
                    alert(data);
                  }
                });
            });
          });
        });
    }
  });
});
