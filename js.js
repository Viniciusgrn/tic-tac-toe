const cellElement = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const mensagemVitoriaTexto = document.querySelector("[data-mensagem-vitoria-texto]");
const mensagemVitoria = document.querySelector("[data-mensagem-vitoria]");
const botaoReiniciar = document.querySelector("[botao-reiniciar]")

//Inicia a aplicação com o valor de vezDoCirculo como falso
let vezDoCirculo;
// let empates=0;
// let xganhou =0;
// let circuloganhou=0;

//Possiveis combinações de vitória
//o esqueleto do jogo é visualizado assim:
//[0, 1, 2]
//[3, 4, 5]
//[6, 7, 8]
const combinacoesDeVitoria =  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const começoDeJogo = () =>{
    vezDoCirculo = false;

    //For utilizado para permitir que cada célula seja utilizada apenas uma vez
    for (const cell of cellElement) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    };

    selecionaHover();

    mensagemVitoria.classList.remove("mostrar-mensagem-de-vitoria")
}

const fimDeJogo = (empate) =>{
    if(empate){
        mensagemVitoriaTexto.innerText = "Empate!"; 
        // empates ++;
        // localStorage.setItem("empate", empates)
    } else {
        mensagemVitoriaTexto.innerText = vezDoCirculo ? "Circulo venceu!" : "X venceu!";
        // vezDoCirculo ? localStorage.setItem("circulo", circuloganhou++) : localStorage.setItem("x", xganhou++);
        
    }
    // console.log(empates, circuloganhou, xganhou);
    mensagemVitoria.classList.add("mostrar-mensagem-de-vitoria");
};
 
const selecionaHover = () =>{
    //Remove a classe X ou Circle do "<div class="board" data-board>"
    //antes de cada troca de turno
    //impedindo que sejam acumulados X e circles na classe da div
    //como "<div class="board x circle x circle" data-board>" 
    board.classList.remove('circle');
    board.classList.remove('x');

    // Verifica de quem é a vez de jogar e adiciona X ou circle na class do board
    if (vezDoCirculo) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

//Verifica a vitória do jogador atual(X ou circulo)
const verificacaoDeVitoria = (jogadorAtual) =>{
    //Verifica se no jogo atual ocorreu uma combinação de vitória com base na lista de combinações
    return combinacoesDeVitoria.some( combinacao =>{
        //index se refere à célula verificada, 
        //por exemplo para que o jogador Circulo ganhe utilizando a combinação [0, 1, 2]
        //o código verifica se os index 0, 1 e 2 do jogo da velha estão preechidos com circulo
        return combinacao.every(index =>{
            return cellElement[index].classList.contains(jogadorAtual);
        });
    });
};

const verificacaoDeEmpate = () =>{
    return [...cellElement].every((celula) =>{
        return celula.classList.contains('x') || celula.classList.contains('circle');
    });
};

//Função para adicionar o X ou circulo ao clicar em um espaço em branco
const marcador = (cell, classeASerAdicionada) =>{
    cell.classList.add(classeASerAdicionada);
};

//Função utilizada para trocar a vez do jogador
const trocaDeTurno = () =>{
    //Inverte o valor da variavel vezDoCirculo(dando a ela o valor True após a primeira marcação, passando então a vez para o circulo)
    vezDoCirculo = !vezDoCirculo;

    selecionaHover()
}


const handleClick = (e) => {
//Colocar X ou O
    const cell = e.target;
    const classeASerAdicionada = vezDoCirculo ? 'circle' : 'x';

    marcador(cell, classeASerAdicionada);

//Verificar vitória ou empate

    const vitoria = verificacaoDeVitoria(classeASerAdicionada);
    const empate = verificacaoDeEmpate();

    if(vitoria){
        fimDeJogo(false);
    } else if(empate){
        fimDeJogo(true);
    } else {
        //Mudar simbolo
        //Ao fim da função vai para a função de troca de turnos alterando o valor da variavel vezDoCirculo e limpando a div"board"
        trocaDeTurno();
    }

};

começoDeJogo();

botaoReiniciar.addEventListener('click', começoDeJogo);