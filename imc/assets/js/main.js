// selecionando o formulário
const form = document.querySelector("#formulario");

// customizando o evento de submit do formulário
form.addEventListener("submit", function (e) {
  // desabilitando o comportamento padrão
  e.preventDefault();

  // selecionando o input de peso
  const inputPeso = e.target.querySelector("#peso");

  // selecionando o input de altura
  const inputAltura = e.target.querySelector("#altura");

  // obtendo o peso, sanitizado como número
  const peso = Number(inputPeso.value);

  // obtendo a altura, sanitizado como número
  const altura = Number(inputAltura.value);

  // se o peso for inválido, exibe a mensagem de erro
  if (!peso) {
    setResultado("Peso inválido", false);
    return;
  }

  // se a altura for inválida, exibe a mensagem de erro
  if (!altura) {
    setResultado("Altura inválida", false);
    return;
  }

  // calculando o IMC
  const imc = getImc(peso, altura);

  // classificando o IMC
  const nivelImc = getNivelImc(imc);

  // preparando a mensagem com o resultado
  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  // exibindo a mensagem de erro
  setResultado(msg, true);
});

// função responsável por classificar o IMC
function getNivelImc(imc) {
  // lista de categorias
  const nivel = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau 1",
    "Obesidade grau 2",
    "Obesidade grau 3",
  ];

  // realizando a classificação do IMC
  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

// função responsável por calcular o IMC, com duas casas decimais
function getImc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

// função responsável por criar um parágrafo
function criaP() {
  const p = document.createElement("p");
  return p;
}

// função responsável por renderizar as mensagens
function setResultado(msg, isValid) {
  // selecionando a div de resultado
  const resultado = document.querySelector("#resultado");

  // apagando o conteúdo da div
  resultado.innerHTML = "";

  // criando um parágrafo para incluir as mensagens
  const p = criaP();

  // definindo a cor do parágrafo
  if (isValid) {
    p.classList.add("paragrafo-resultado");
  } else {
    p.classList.add("bad");
  }

  // inserindo as mensagens no parágrafo
  p.innerHTML = msg;

  // adicionando o parágrafo dentro da div
  resultado.appendChild(p);
}
