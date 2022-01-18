
let currentColor = 'black'; // Cor padrão.
let canDraw = false; // POde desenhar = não.
let mouseX = 0; // Mouse horizontal.
let mouseY = 0; // Mouse vertical.

let screen = document.querySelector('#screen__'); // Seleciona o canvas.
let context = screen.getContext('2d'); // largura e altura (2d) do canvas.

// EVENTS
document.querySelectorAll('.color__wrapper .color__item').forEach(element => { // Seleciona todos os elementos com a class color__item.
    element.addEventListener('click', handleColor); // evento de click chamando a função handleColor.
});

/*  Passo a passo desenho canvas:
    - Quando o click do mouse abaixar (Faz o click), ative o modo desenho.
    - Quando o mouse se mover, se o modo desenho estiver ativado (click pressionado), desenhe.
    - Quando o click do mouse levantar (soltar o click), desative o modo desenho.
*/
screen.addEventListener('mousedown', handleMouseDown); // Adiciona evento de mouse down ao screen.
screen.addEventListener('mousemove', handleMouseMove); // Adiciona evento de mouse move ao screen.
screen.addEventListener('mouseup', handleMouseUp); // Adiciona evento de mouse up ao screen.

document.querySelector('.clear__').addEventListener('click', handleClearScreen); // Adiciona evento de click chamando a função de limpar.

// FUNCTIONS
function handleColor(event) { // Lida com o click na cor.
    let color = event.target.getAttribute('data-color'); // Pega o valor do atributo data-color.
    currentColor = color; // Passa o valor da variável color para o currentColor.

    document.querySelector('.color__item.active').classList.remove('active'); // Remove a class active do item que tiver ela.
    event.target.classList.add('active'); // Adiciona a class active ao item clicado.
}

function handleMouseDown(event) { // Lida com o click do mouse.
    canDraw = true; // Permite desenhar.

    // Atribui as variáveis os valores dos eixos X e Y do mouse quando ele foi clicado.
    // Subtraindo os valores da tela em relação ao canvas.
    mouseX = event.pageX - screen.offsetLeft;
    mouseY = event.pageY - screen.offsetTop;
}

function handleMouseMove(event) { // Lida com o movimento do mouse.
    if (canDraw) { // verifica se pode desenhar.
        handleDraw(event.pageX, event.pageY);
    }
}

function handleMouseUp() { // Lida com o soltar do click do mouse.
    canDraw = false; // Proíbe desenhar.
}

function handleDraw(x, y) { // Lida com o desenho.
    // Recebe os valores do mouse down e passam para variáveis subtraindo os valores do canvas em relação a tela.
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // Desenhar.
    context.beginPath(); // Iniciando processo de desenho.
    context.lineWidth = 5; // Largura da linha.
    context.lineJoin = "round"; // Formato da linha.
    context.moveTo(mouseX, mouseY); // Move o cursor para a posição inicial.
    context.lineTo(pointX, pointY); // Fazendo a linha até os parâmetros.
    context.closePath(); // Fechar o processo de desenho.
    context.strokeStyle = currentColor; // Definindo a cor do desenho.
    context.stroke(); // Finaliza o processo.

    // Salva a posição atual do mouse.
    mouseX = pointX;
    mouseY = pointY;
}

function handleClearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0); // Zera o cursor e o processo e desenho.
    // Limpa o screen.
    // Vai da posição zero até o fim da largura.
    // Vai da posição zero até o fim da altura.
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}