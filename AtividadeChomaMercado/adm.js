document.addEventListener('DOMContentLoaded', function() {
    const itemList = document.getElementById('itemList');
    let nextId = 10; // Próximo ID disponível para adicionar
    
    // Função para adicionar um item à lista do painel de administração
    function addItemToAdminPanel(id, name, price) {
        const li = document.createElement('li');
        li.innerHTML = `<span>ID: ${id}, Nome: ${name}, Preço: R$ ${price.toFixed(2)}</span>
                        <button class="edit">Editar</button>
                        <button class="remove">Remover</button>`;
        li.dataset.id = id; // Adicionando o ID como atributo de dados
        itemList.appendChild(li);
    }

    // Função para adicionar um item à lista
    function addItem(id, name, price) {
        addItemToAdminPanel(id, name, price);
    }

    // Adicionando os produtos fornecidos ao painel de administração
    addItem(1, 'Óleo de Cozinha', 15.00);
    addItem(2, 'Arroz Branco', 14.00);
    addItem(3, 'Feijão', 12.00);
    addItem(4, 'Macarrão', 16.00);
    addItem(5, 'Café', 12.00);
    addItem(6, 'Açúcar', 6.50);
    addItem(7, 'Sal', 8.00);
    addItem(8, 'Pão Tradicional', 9.00);
    addItem(9, 'Salgadinho', 8.50);

    // Event listener para adicionar um novo item
    document.getElementById('addItemForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('itemName').value;
        const price = parseFloat(document.getElementById('itemPrice').value);
        if (name && price) {
            addItem(nextId, name, price); // Usando o próximo ID disponível
            nextId++; // Incrementando o próximo ID disponível
            this.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Event listener para remover ou editar um item
    itemList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('remove')) {
            target.parentElement.remove();
        } else if (target.classList.contains('edit')) {
            const li = target.parentElement;
            const id = parseInt(li.dataset.id);
            const name = prompt('Digite o novo nome do item:', li.querySelector('span').textContent.split(',')[1].trim().split(':')[1]);
            const price = parseFloat(prompt('Digite o novo preço do item:', li.querySelector('span').textContent.split(',')[2].trim().split(':')[1].replace('R$', '').trim()));
            if (name !== null && !isNaN(price)) {
                li.querySelector('span').textContent = `ID: ${id}, Nome: ${name}, Preço: R$ ${price.toFixed(2)}`;
            } else {
                alert('Por favor, preencha os campos corretamente.');
            }
        }
    });
});
