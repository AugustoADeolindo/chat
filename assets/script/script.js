var mensagens = JSON.parse(localStorage.getItem("Mensagens")) || [];

window.onload = function () {
  mensagens.forEach((msg) => adicionarNaTela(msg));
  rolarParaBaixo();
  configurarEnter();
};

function mensagem1() {
  processarEnvio("User1", "texto1");
}

function mensagem2() {
  processarEnvio("User2", "texto2");
}

function processarEnvio(usuario, idInput) {
  var input = document.getElementById(idInput);
  var texto = input.value.trim();

  if (texto === "") return;

  var mensagem = {
    nome: usuario,
    conteudo: texto,
  };

  mensagens.push(mensagem);
  gravarMensagens();

  adicionarNaTela(mensagem);
  input.value = "";
  input.focus();
  rolarParaBaixo();
}

function adicionarNaTela(mensagem) {
  var chat = document.getElementById("chat");

  var idEstilo = mensagem.nome === "User1" ? "mensagem_azul" : "mensagem_verde";

  var htmlMensagem = `
        <div class="textosChat" id="${idEstilo}">
            ${mensagem.conteudo}
        </div>
    `;

  chat.innerHTML += htmlMensagem;
}

function gravarMensagens() {
  localStorage.setItem("Mensagens", JSON.stringify(mensagens));
}

function rolarParaBaixo() {
  var chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
}

function configurarEnter() {
  document
    .getElementById("texto1")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") mensagem1();
    });

  document
    .getElementById("texto2")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") mensagem2();
    });
}
