const input = document.
getElementById('input');
const botao = document.
getElementById('botao');
const lista = document.
getElementById('lista');

const meuArray = [];

botao.addEventListener('click',
function(){
    meuArray.push(input.value);
    input.value = "";
    console.log(meuArray);
    impressao();
});

function impressao(){
    lista.innerHTML = "";
    for( let index = 0; index <meuArray.length;index ++){
    const li = document.createElement
    ('li');
    li.innerHTML = meuArray[index];
    lista.appendChild(li);

}
}