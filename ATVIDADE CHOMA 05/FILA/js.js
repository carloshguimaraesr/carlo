let fila = [];

      
      function enfileirar() {
        let input = prompt("Digite o elemento a ser adicionado à fila:");
        fila.push(input);
        atualizarFila();
      }

      
      function desenfileirar() {
        if (fila.length > 0) {
          fila.shift();
          atualizarFila();
        } else {
          alert("A fila está vazia.");
        }
      }

      
      function atualizarFila() {
        document.getElementById("fila").innerHTML = fila.join(", ");
      }