$(document).ready(() => {
  // Mostrar el saldo actual al cargar la página
  const actualizarVistaSaldo = () => {
    let saldo = localStorage.getItem("saldo") || "0";
    $("#currentBalance").text("$" + saldo);
  };

  actualizarVistaSaldo();

  // Lógica del Formulario de Depósito
  $("#formDeposit").on("submit", (e) => {
    e.preventDefault();

    // Captura del monto con jQuery
    const monto = Number.parseFloat($("#depositAmount").val());
    let saldoActual = Number.parseFloat(localStorage.getItem("saldo")) || 0;

    // Validación técnica
    if (monto > 0) {
      // Operación aritmética de suma
      saldoActual += monto;

      // Guardar nuevo saldo
      localStorage.setItem("saldo", saldoActual);

      // Actualizar Historial de Transacciones
      let historial = JSON.parse(localStorage.getItem("movimientos")) || [];
      historial.unshift(`Depósito realizado: +$${monto}`);
      localStorage.setItem("movimientos", JSON.stringify(historial));

      alert(`¡Depósito exitoso! Tu nuevo saldo es: $${saldoActual}`);

      // Redirección dinámica al menú
      globalThis.location.href = "menu.html";
    } else {
      alert("Por favor, ingresa un monto válido.");
    }
  });

  // Botón Salir
  $("#btnSalir").click(() => {
    if (confirm("¿Estás seguro que deseas salir al Login?")) {
      globalThis.location.href = "index_login.html";
    }
  });
});
