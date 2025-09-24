const botaoClique = document.getElementById('botao-clique');
const resultadoClique = document.getElementById('resultado-clique');
const campoTecla = document.getElementById('campo-tecla');
const resultadoTecla = document.getElementById('resultado-tecla');
const formularioDados = document.getElementById('formulario-dados');
const resultadoFormulario = document.getElementById('resultado-formulario');

function eventClique() {
    const dataHora = new Date().toLocaleString();
    resultadoClique.textContent = `O botão foi clicado às: ${dataHora}`;
}

function eventTecla(evento) {
    resultadoTecla.textContent = `Tecla pressionada: "${evento.key}"`;
}

function eventFormulario(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const mensagem = `Dados Recebidos:<br>Nome: ${nome}<br>Email: ${email}`;

    resultadoFormulario.innerHTML = mensagem;
}


botaoClique.addEventListener('click', eventClique);

campoTecla.addEventListener('keydown', eventTecla);


formularioDados.addEventListener('submit', eventFormulario);