const tabelaDinamica = document.getElementById('tabela-dinamica');
const gerarTabelaBtn = document.getElementById('gerar-tabela-btn');
let cabecalhosGlobais = [];

function criarParagrafo() {
    const inputParagrafo = document.getElementById('input-paragrafo');
    const resultadoParagrafo = document.getElementById('paragrafo-resultado');
    const texto = inputParagrafo.value;

    if (texto.trim() === '') {
        alert('Por favor, digite algum texto para o parágrafo.');
        return;
    }

    const novoParagrafo = document.createElement('p');
    novoParagrafo.textContent = texto;
    resultadoParagrafo.appendChild(novoParagrafo);
    inputParagrafo.value = '';
}

function criarLista() {
    const inputLista = document.getElementById('input-lista');
    const selectTipoLista = document.getElementById('select-lista');
    const resultadoLista = document.getElementById('lista-resultado');
    
    const textoItens = inputLista.value;
    const tipoLista = selectTipoLista.value;

    if (textoItens.trim() === '') {
        alert('Por favor, digite os itens da lista separados por vírgula.');
        return;
    }
    
    const itens = textoItens.split(',').map(item => item.trim()).filter(item => item !== '');

    if (itens.length === 0) {
        alert('Nenhum item válido foi digitado.');
        return;
    }

    const novaLista = document.createElement(tipoLista);
    itens.forEach(itemTexto => {
        const novoItem = document.createElement('li');
        novoItem.textContent = itemTexto;
        novaLista.appendChild(novoItem);
    });

    resultadoLista.appendChild(novaLista);
    inputLista.value = '';
}

function criarLink() {
    const inputTexto = document.getElementById('input-link-texto');
    const inputUrl = document.getElementById('input-link-url');
    const resultadoLink = document.getElementById('link-resultado');

    const texto = inputTexto.value;
    const url = inputUrl.value;

    if (texto.trim() === '' || url.trim() === '') {
        alert('Por favor, preencha o texto e a URL do link.');
        return;
    }

    const novoLink = document.createElement('a');
    novoLink.textContent = texto;
    novoLink.href = url;
    
    resultadoLink.appendChild(novoLink);

    inputTexto.value = '';
    inputUrl.value = '';
}

function adicionarCamposParaDados() {
    const inputCabecalhos = document.getElementById('input-tabela-cabecalhos');
    const textoCabecalhos = inputCabecalhos.value;

    if (textoCabecalhos.trim() === '') {
        alert('Por favor, digite os nomes dos cabeçalhos separados por vírgula.');
        return;
    }

    tabelaDinamica.innerHTML = '';
    
    cabecalhosGlobais = textoCabecalhos.split(',').map(item => item.trim()).filter(item => item !== '');

    if (cabecalhosGlobais.length === 0) {
        alert('Nenhum cabeçalho válido foi digitado.');
        return;
    }

    const linhaDeInputs = document.createElement('div');
    linhaDeInputs.className = 'linha-tabela-input';
    cabecalhosGlobais.forEach(cabecalho => {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-tabela';
        input.placeholder = `Valor para "${cabecalho}"`;
        linhaDeInputs.appendChild(input);
    });
    
    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Adicionar Linha';
    btnAdd.onclick = adicionarLinhaTabela;

    tabelaDinamica.appendChild(linhaDeInputs);
    tabelaDinamica.appendChild(btnAdd);
    
    gerarTabelaBtn.style.display = 'inline-block';
}

// Passo B: Adicionar uma nova linha de inputs de dados
function adicionarLinhaTabela() {
    const novaLinhaDiv = document.createElement('div');
    novaLinhaDiv.className = 'linha-tabela-input';
    
    cabecalhosGlobais.forEach(() => {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-tabela';
        novaLinhaDiv.appendChild(input);
    });
    
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.onclick = () => novaLinhaDiv.remove();
    novaLinhaDiv.appendChild(btnRemover);

    tabelaDinamica.insertBefore(novaLinhaDiv, tabelaDinamica.lastChild);
}

// Passo C: Gerar a tabela completa
function criarTabela() {
    const linhasDeDados = document.querySelectorAll('.linha-tabela-input');
    const resultadoTabela = document.getElementById('tabela-resultado');
    const dados = [];
    
    linhasDeDados.forEach(linhaDiv => {
        const inputs = linhaDiv.querySelectorAll('.input-tabela');
        const linha = {};
        let linhaCompleta = true;
        
        inputs.forEach((input, index) => {
            if (input.value.trim() === '') {
                linhaCompleta = false;
            }
            linha[cabecalhosGlobais[index]] = input.value;
        });

        if (linhaCompleta) {
            dados.push(linha);
        }
    });

    if (dados.length === 0) {
        alert('Nenhum dado válido para a tabela foi inserido.');
        return;
    }
    
    const novaTabela = document.createElement('table');
    
    const thead = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');
    cabecalhosGlobais.forEach(cabecalho => {
        const th = document.createElement('th');
        th.textContent = cabecalho;
        linhaCabecalho.appendChild(th);
    });
    thead.appendChild(linhaCabecalho);
    novaTabela.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    dados.forEach(linhaDeDados => {
        const novaLinha = document.createElement('tr');
        Object.values(linhaDeDados).forEach(valor => {
            const novaCelula = document.createElement('td');
            novaCelula.textContent = valor;
            novaLinha.appendChild(novaCelula);
        });
        tbody.appendChild(novaLinha);
    });
    
    novaTabela.appendChild(tbody);
    resultadoTabela.innerHTML = ''; // Limpa o conteúdo anterior
    resultadoTabela.appendChild(novaTabela);
    
    tabelaDinamica.innerHTML = '';
    gerarTabelaBtn.style.display = 'none';
    document.getElementById('input-tabela-cabecalhos').value = '';
}