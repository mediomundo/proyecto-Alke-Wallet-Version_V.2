$(document).ready(() => {
// Cargar y mostrar el saldo actualizado
  // Obtener el saldo (si es nulo, usar "0")
  const saldo = localStorage.getItem("saldo") || "0";
  $("#saldoDisplay").text(`$${saldo}`);

  // Manejo de botones de navegación
  $(".btn-lg").on("click", function (e) {
    e.preventDefault(); 
    
    // 1. Declaramos la variable
    const destino = $(this).attr("href"); 
    const nombreSeccion = $(this).find("span").text();

    alert(`Redirigiendo a: ${nombreSeccion}`);
    
    window.location.href = destino; 
  });

  // Botón Salir
  $("#btnSalir").on("click", () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      window.location.href = "index_login.html";
    }
  });
});
