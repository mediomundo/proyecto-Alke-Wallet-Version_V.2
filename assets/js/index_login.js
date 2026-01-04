$(document).ready(() => {
  // Define las credenciales constantes
  const USER_VALID = "usuario@wallet.com";
  const PASS_VALID = "wallet1234";

  // Manejo del evento submit con jQuery
  $("#formLogin").on("submit", (e) => {
    e.preventDefault();

    // Captura de valores con jQuery
    const emailIngresado = $("#email").val();
    const passIngresada = $("#password").val();

    // Estructura de control para validación
    if (emailIngresado === USER_VALID && passIngresada === PASS_VALID) {
      alert("¡Bienvenido a Alke Wallet!");

      // Inicializa el saldo si no existe
      if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", "160000");
      }

      // Inicializa historial base si está vacío
      if (!localStorage.getItem("movimientos")) {
        const movimientosBase = [
          "Depósito inicial - +$160000",
          "Apertura de cuenta - $0",
        ];
        localStorage.setItem("movimientos", JSON.stringify(movimientosBase));
      }

      // Redirección
      globalThis.location.href = "menu.html";
    } else {
      // Error con feedback visual simple
      alert("Error: El correo o la contraseña no coinciden.");
      $("#password").val(""); // Limpia solo la clave por seguridad
    }
  });
});
