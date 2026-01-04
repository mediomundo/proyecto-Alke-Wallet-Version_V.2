$(document).ready(() => {
  // Obtener el historial del localStorage
  let historial = JSON.parse(localStorage.getItem("movimientos"));

  // Si está vacío, carga 6 movimientos base
  if (!historial || historial.length === 0) {
    historial = [
      "Compra en línea - -$50000",
      "Depósito - +$100000",
      "Transferencia recibida - +$175000",
      "Compra en línea - -$55500",
      "Pago de servicios - -$20500",
      "Depósito - +$75500",
    ];

    // Guarda los movimientos base para que persistan
    localStorage.setItem("movimientos", JSON.stringify(historial));
  }

  // Función de flecha para renderizar la lista
  const mostrarMovimientos = (datos) => {
    const $contenedor = $("#listaTransacciones");
    $contenedor.empty(); // Limpiamos la lista para evitar duplicados

    // Tomar solo los últimos 10 movimientos
    const ultimosDiez = datos.slice(0, 10);

    ultimosDiez.forEach((mov) => {
      // Separamos el texto del monto usando el guion central " - "
      const partes = mov.split(" - ");
      const descripcion = partes[0];
      const monto = partes[1] || ""; // Si no hay guion, queda vacío

      // Determinar color de icono o texto (Verde para depósitos, Rojo para envíos)
      let colorClase = "text-muted"; // Color gris por defecto

      if (
        monto.includes("+") ||
        descripcion.toLowerCase().includes("recibida")
      ) {
        colorClase = "text-success fw-bold";
      } else if (
        monto.includes("-") ||
        descripcion.toLowerCase().includes("compra")
      ) {
        colorClase = "text-danger fw-bold";
      }

      // Inyecto el HTML de cada fila
      $contenedor.append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="text-secondary">${descripcion}</span>
            <span class="${colorClase}">${monto}</span>
        </li>
      `);
    });
  };

  // Ejecutar renderizado con los datos obtenidos
  mostrarMovimientos(historial);

  $("#btnSalir").on("click", () => {
    if (confirm("¿Deseas cerrar sesión y volver al inicio?")) {
      // Usamos window.location para volver al login
      window.location.href = "index_login.html";
    }
  });
});
