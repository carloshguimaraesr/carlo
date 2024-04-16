function somar(){
    let a = 5;
    let b = 5;
    return a+b;
}

function calcularQuadrado(valor){
return valor * valor;

}

function imprimir(valor,nomeId){

document.getElementById(nomeId).innerHTML = valor;

}

imprimir(somar(), 'saida');
imprimir(calcularQuadrado(15), 'saida2');