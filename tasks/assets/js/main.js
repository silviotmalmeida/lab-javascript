// selecionando o input
const inputTarefa = document.querySelector(".input-tarefa");

// selecionando o botão
const btnTarefa = document.querySelector(".btn-tarefa");

// selecionando a lista de tarefas
const tarefas = document.querySelector(".tarefas");

// função responsável por criar um item de lista
function criaLi() {
  const li = document.createElement("li");
  return li;
}

// inserindo um listener no input para criar uma nova tarefa ao clicar ENTER
inputTarefa.addEventListener("keypress", function (e) {
  // se a tecla pressionada for ENTER
  if (e.keyCode === 13) {
    // se não existir texto no input, ignora
    if (!inputTarefa.value) return;

    // adiciona uma nova tarefa na lista
    criaTarefa(inputTarefa.value);
  }
});

// função responsável por responsável por limpar o input e focá-lo
function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

// função responsável por inserir um botão de Apagar um item da lista
function criaBotaoApagar(li) {
  // inserindo um espaço em branco no texto do item
  li.innerText += " ";

  // criando o botão
  const botaoApagar = document.createElement("button");

  // ajustando o label, a classe e o título do botão
  botaoApagar.innerText = "Apagar";
  botaoApagar.setAttribute("class", "apagar");
  botaoApagar.setAttribute("title", "Apagar esta tarefa");

  // insefindo o botão no item de lista
  li.appendChild(botaoApagar);
}

// função responsável pela criação do item de lista
function criaTarefa(textoInput) {

  // criando o item de lista
  const li = criaLi();

  // inserindo o texto do item
  li.innerText = textoInput;

  // inserindo o item na lista
  tarefas.appendChild(li);

  // limpando e focando o input
  limpaInput();

  // adicionando o botão de apagar o item
  criaBotaoApagar(li);

  
  salvarTarefas();
}

btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
