$(document).ready(() => {
  // Datos iniciales de contactos
  let contactos = JSON.parse(localStorage.getItem("contactos")) || [
    {
      nombre: "Sergio Pérez",
      rut: "12345678-9",
      banco: "Scotiabank",
      cuenta: "456789321",
      email: "checoperez@f1.com",
    },
    {
      nombre: "Lewis Hamilton",
      rut: "15789654-1",
      banco: "Itaú",
      cuenta: "852741951",
      email: "sirhamilton@f1.com",
    },
  ];

  // Función para renderizar la lista de contactos
  const renderizarContactos = () => {
    const $lista = $("#contactList");
    $lista.empty();

    contactos.forEach((c, index) => {
      $lista.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <input type="radio" name="contactoSel" id="c${index}" value="${c.nombre}" class="form-check-input me-2">
                        <label for="c${index}" class="form-check-label">
                            <strong>${c.nombre}</strong> <br>
                            <small class="text-muted">${c.banco} | CTA: ${c.cuenta}</small>
                        </label>
                    </div>
                    <span class="badge bg-light text-dark border">${c.rut}</span>
                </li>
            `);
    });
    // Guardar en local para que los nuevos persistan
    localStorage.setItem("contactos", JSON.stringify(contactos));
  };

  renderizarContactos();

  // Registro de nuevo contacto (Modal)
  $("#formRegistroContacto").on("submit", (e) => {
    e.preventDefault();

    const nuevo = {
      nombre: $("#regNombre").val(),
      rut: $("#regRut").val(),
      banco: $("#regBanco").val(),
      cuenta: $("#regCuenta").val(),
      email: $("#regEmail").val(),
    };

    contactos.push(nuevo);
    renderizarContactos();

    // Cerrar modal y limpiar
    $("#modalNuevoContacto").modal("hide");
    $("#formRegistroContacto")[0].reset();
    alert("Contacto agregado correctamente.");
  });

  // Simulación de Transferencia
  $("#btnConfirmarEnvio").click(() => {
    const monto = Number.parseFloat($("#montoEnvio").val());
    const contactoSeleccionado = $("input[name='contactoSel']:checked").val();
    let saldoActual = Number.parseFloat(localStorage.getItem("saldo")) || 0;

    if (!contactoSeleccionado) return alert("Selecciona un destinatario.");
    if (Number.isNaN(monto) || monto <= 0)
      return alert("Ingresa un monto válido.");

    if (monto <= saldoActual) {
      saldoActual -= monto;
      localStorage.setItem("saldo", saldoActual);

      // Registrar en historial
      let historial = JSON.parse(localStorage.getItem("movimientos")) || [];
      historial.unshift(`Envío a ${contactoSeleccionado} - -$${monto}`);
      localStorage.setItem("movimientos", JSON.stringify(historial));

      alert(`Transferencia exitosa a ${contactoSeleccionado}`);
      globalThis.location.href = "menu.html";
    } else {
      alert("Saldo insuficiente para esta operación.");
    }
  });

  // Botón Salir
  $("#btnSalir").click(() => {
    if (confirm("¿Cerrar sesión?"))
      globalThis.location.href = "index_login.html";
  });
});
