// definindo a função que irá implementar o funcionamento do relógio
function relogio() {
  
  // selecionando o objeto marcado com a classe relógio
  const relogio = document.querySelector(".relogio");

  // selecionando o objeto marcado com a classe iniciar
  const btIniciar = document.querySelector(".iniciar");

  // selecionando o objeto marcado com a classe pausar
  const btPausar = document.querySelector(".pausar");

  // selecionando o objeto marcado com a classe zerar
  const btZerar = document.querySelector(".zerar");

  // inicializando a contagem dos segundos
  let segundos = 0;

  // declarando a variável do timer
  let timer;

  // método responsável por iniciar a função periódica que incrementa
  // a contagem de segundos e atualiza o texto do relógio
  function iniciaRelogio() {

    // iniciando a função periódica, com loop de 1s
    timer = setInterval(function () {

      // incrementando a contagem de segundos
      segundos++;

      // atualizando o texto do relógio
      relogio.innerHTML = criaHoraDosSegundos(segundos);
    }, 1000);
  }

  // método que converte a contagem de segundos em Date
  function criaHoraDosSegundos(segundos) {

    // obtendo o Date referente à contagem de segundos
    const data = new Date(segundos * 1000);

    // configurando o Date para o fuso brasileiro e para exibir as 24h
    return data.toLocaleTimeString("pt-BR", {
      hour12: false,
      timeZone: "UTC",
    });
  }

  // adicionando um listener para eventos de click
  document.addEventListener("click", function (e) {
    // selecionando o objeto gerador do evento
    const el = e.target;

    // se o objeto do click estiver marcado com a classe zerar
    if (el.classList.contains("zerar")) {
      // encerra a função periódica
      clearInterval(timer);

      // ajusta o texto do relógio
      relogio.innerHTML = "00:00:00";

      // desmarca do texto do relógio a classe 'pausado', retornando à cor original
      relogio.classList.remove("pausado");

      // zera a contagem de segundos
      segundos = 0;

      // alterando o texto do botão iniciar
      btIniciar.innerText = "iniciar";

      // habilitando o botão de iniciar
      btIniciar.disabled = false;

      // desabilitando o botão de pausa
      btPausar.disabled = true;

      // desabilitando o botão de zerar
      btZerar.disabled = true;
    }

    // se o objeto do click estiver marcado com a classe iniciar
    if (el.classList.contains("iniciar")) {
      // desmarca do texto do relógio a classe 'pausado', retornando à cor original
      relogio.classList.remove("pausado");

      // encerra a função periódica
      clearInterval(timer);

      // inicia o relógio
      iniciaRelogio();

      // alterando o texto do botão iniciar
      btIniciar.innerText = "iniciar";

      // desabilitando o botão de iniciar
      btIniciar.disabled = true;

      // habilitando o botão de pausa
      btPausar.disabled = false;

      // habilitando o botão de zerar
      btZerar.disabled = false;
    }

    // se o objeto do click estiver marcado com a classe pausar
    if (el.classList.contains("pausar")) {
      // encerra a função periódica
      clearInterval(timer);

      // marca do texto do relógio com a classe 'pausado', alterando a cor original
      relogio.classList.add("pausado");

      // alterando o texto do botão iniciar
      btIniciar.innerText = "continuar";

      // habilitando o botão de iniciar
      btIniciar.disabled = false;

      // desabilitando o botão de pausa
      btPausar.disabled = true;

      // habilitando o botão de zerar
      btZerar.disabled = false;
    }
  });
}

// iniciando a execução da função
relogio();
