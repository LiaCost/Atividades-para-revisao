let carrinho = [];

const inputItem = document.getElementById('input-item');
const adicionarBtn = document.getElementById('adicionar-btn');
const listaCarrinho = document.getElementById('lista-carrinho');
const contadorItens = document.getElementById('contador-itens');


function renderizarCarrinho() {
    listaCarrinho.innerHTML = '';
    
    contadorItens.textContent = carrinho.length;

    carrinho.forEach((item, index) => {
        const novoItem = document.createElement('li');
        novoItem.textContent = item;
        
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.className = 'remover-btn';
    
        btnRemover.onclick = () => {
            removerItem(index);
        };

        novoItem.appendChild(btnRemover);
        
        listaCarrinho.appendChild(novoItem);
    });
}

function adicionarItem() {
    const nomeItem = inputItem.value.trim();
    
    if (nomeItem !== '') {
        carrinho.push(nomeItem);

        inputItem.value = '';
        
        renderizarCarrinho();
    } else {
        alert('Por favor, digite o nome de um item.');
    }
}

function removerItem(indice) {
    carrinho.splice(indice, 1);
    
    renderizarCarrinho();
}

adicionarBtn.addEventListener('click', adicionarItem);

inputItem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        adicionarItem();
    }
});

renderizarCarrinho();