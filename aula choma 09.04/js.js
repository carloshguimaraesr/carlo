const input = document.getElementById('input');
const botao = document.getElementById('botao');
const lista = document.getElementById('lista');

botao.addEventListener('click', function(){
    const li = document.createElement('li');
    li.innerHTML = input.value +` <button onclick="remover(this)">remover</button>`
    lista.appendChild(li);
});

function remover(botao){
const itemLista = botao.parentElement;
lista.removeChild(itemLista);


}