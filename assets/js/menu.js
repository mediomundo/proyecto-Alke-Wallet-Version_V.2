$(document).ready(() => {
  // Cargar y mostrar el saldo actualizado
  // Usar el selector de jQuery y el método text()
  const saldo = localStorage.getItem("saldo") || "0";
  $("#saldoDisplay").text(`$${saldo}`);

  // Manejo de botones con alert de redirección con jQuery
  $(".btn-lg").click(function (e) {
    const destino = $(this).attr("href");
    const texto = $(this).find("span").text();

    console.log(`Navegando a: ${texto}`);
  });

  // Botón Salir con jQuery
  $("#btnSalir").on("click", () => {
    if (confirm("¿Seguro que deseas cerrar tu sesión?")) {
      // No borra el saldo para que persista en la siguiente entrada
      globalThis.location.href = "index_login.html";
    }
  });
});
