$(document).ready(() => {
  // Obtener el historial del localStorage
  // Si está vacío, carga 6 movimientos base
  let historial = JSON.parse(localStorage.getItem("movimientos"));

  if (!historial || historial.length === 0) {
    historial = [
      "Compra en línea - $50.00",
      "Depósito - $100.00",
      "Transferencia recibida - $75.00",
      "Compra en línea - $5550.00",
      "Depósito misma cuenta - $10500.00",
      "Transferencia recibida - $7575.00",
    ];
    // Guarda los movimientos base para que persistan
    localStorage.setItem("movimientos", JSON.stringify(historial));
  }

  // Función de flecha para renderizar la lista
  const mostrarMovimientos = (datos) => {
    const $contenedor = $("#listaTransacciones");
    $contenedor.empty(); // Limpiar lista estática

    // Tomar solo los últimos 10 movimientos
    const ultimosDiez = datos.slice(0, 10);

    ultimosDiez.forEach((mov) => {
      // Determinar color de icono o texto (Verde para depósitos, Rojo para envíos)
      let colorClase =
        mov.includes("+") || mov.includes("recibida")
          ? "text-success"
          : "text-danger";

      $contenedor.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="fw-bold">${mov.split(" - ")[0]}</span>
                    <span class="${colorClase}">${
        mov.split(" - ")[1] || ""
      }</span>
                </li>
            `);
    });
  };

  // Ejecutar renderizado
  mostrarMovimientos(historial);

  // Botón Salir
  $("#btnSalir").click(() => {
    if (confirm("¿Deseas cerrar sesión y volver al Login?")) {
      globalThis.location.href = "index_login.html";
    }
  });
});
