const socket = io();
const chatBox = document.getElementById("chatBox");
const messageLogs = document.getElementById("messageLogs");
let user;

Swal.fire({
  title: "Ingrese su nombre",
  input: "text",
  text: "Ingrese su nombre de usuario para continuar",

  inputValidator: (valor) => {
    return !valor && "Ingrese un valor válido";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
});

chatBox.addEventListener("change", (e) => {
  if (chatBox.value.trim().length > 0) {
    socket.emit("mensaje", {
      usuario: user,
      mensaje: chatBox.value,
      hora: new Date().toLocaleString(),
    });
    chatBox.value = "";
  }
});

socket.on("mensajeLogs", (info) => {
  messageLogs.innerHTML = "";
  info.forEach((mensaje) => {
    messageLogs.innerHTML += `<p>${mensaje.hora}hs. Usuario ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`;
  });
  messageLogs.scrollTop = messageLogs.scrollHeight;
});
