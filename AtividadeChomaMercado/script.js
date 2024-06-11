document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const products = document.querySelectorAll('.product');
  const viewCartButton = document.querySelector('.view-cart');
  const cartPage = createCartPage();
  const checkoutPage = createCheckoutPage();
  const confirmationPage = createConfirmationPage();

  products.forEach(product => {
    const addToCartButton = product.querySelector('.add-to-cart');
    const productId = product.dataset.id;
    const productName = product.querySelector('h3').textContent;
    const productImage = product.querySelector('img').src;
    const productPrice = getProductPrice(productId);

    addToCartButton.addEventListener('click', () => {
      const cartItem = cart.find(item => item.id === productId);

      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ id: productId, name: productName, image: productImage, price: productPrice, quantity: 1 });
      }

      updateCartTotal();
    });
  });

  viewCartButton.addEventListener('click', () => {
    renderCart(cartPage.querySelector('.cart-items'));
    cartPage.classList.add('visible');
  });

  cartPage.querySelector('.checkout').addEventListener('click', () => {
    cartPage.classList.remove('visible');
    checkoutPage.classList.add('visible');
  });

  checkoutPage.querySelector('.close-modal').addEventListener('click', () => {
    checkoutPage.classList.remove('visible');
  });

  checkoutPage.querySelector('#checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    checkoutPage.classList.remove('visible');
    confirmationPage.classList.add('visible');
    setTimeout(() => {
      confirmationPage.classList.remove('visible');
    }, 3000);
    cart.length = 0;
    updateCartTotal(); 
  });

  function createCartPage() {
    const cartPage = document.createElement('div');
    cartPage.classList.add('cart-page');
    cartPage.innerHTML = `
      <div class="cart-header">
        <i class="fas fa-shopping-cart"></i>
        <h2>Carrinho</h2>
      </div>
      <ul class="cart-items"></ul>
      <div class="cart-total">Total: R$ <span class="total-amount">0.00</span></div>
      <button class="checkout">Finalizar Compra</button>
      <button class="close-modal">Fechar</button>
    `;
    document.body.appendChild(cartPage);
    cartPage.querySelector('.close-modal').addEventListener('click', () => {
      cartPage.classList.remove('visible');
    });
    return cartPage;
  }

  function createCheckoutPage() {
    const checkoutPage = document.createElement('div');
    checkoutPage.classList.add('checkout-page');
    checkoutPage.innerHTML = `
      <h2>Finalizar Compra</h2>
      <form id="checkout-form">
        <label for="name">Nome Completo:</label>
        <input type="text" id="name" name="name" required>
        <label for="payment">Forma de Pagamento:</label>
        <div class="payment-option">
          <input type="radio" id="pix" name="payment" value="pix" required>
          <label for="pix"><img src="pix.png" alt="PIX"> PIX</label>
        </div>
        <div class="payment-option">
          <input type="radio" id="debito" name="payment" value="debito" required>
          <label for="debito"><img src="cartao.png" alt="Cartão de Débito"> Cartão de Débito</label>
        </div>
        <div class="payment-option">
          <input type="radio" id="credito" name="payment" value="credito" required>
          <label for="credito"><img src="cartao.png" alt="Cartão de Crédito"> Cartão de Crédito</label>
        </div>
        <label for="address">Endereço:</label>
        <input type="text" id="address" name="address" required>
        <button type="submit">Confirmar</button>
        <button type="button" class="close-modal">Cancelar</button>
      </form>
    `;
    document.body.appendChild(checkoutPage);
    return checkoutPage;
  }

  function createConfirmationPage() {
    const confirmationPage = document.createElement('div');
    confirmationPage.classList.add('confirmation-page');
    confirmationPage.innerHTML = `
      <h2>Compra finalizada com sucesso!</h2>
    `;
    document.body.appendChild(confirmationPage);
    return confirmationPage;
  }

  function renderCart(cartItemsList) {
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('cart-item');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-quantity">Quantidade: ${item.quantity}</p>
          <p class="cart-item-price">Preço: R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="cart-item-remove">Remover</button>
      `;
      li.querySelector('.cart-item-remove').addEventListener('click', () => {
        removeFromCart(item.id);
        renderCart(cartItemsList);
        updateCartTotal();
      });
      cartItemsList.appendChild(li);
    });
  }

  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      cart[index].quantity--;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
      }
    }
  }

  function getProductPrice(productId) {
    const prices = {
      '1': 15.00,   // Oleo De cozinha
      '2': 14.00,    // Arroz Branco
      '3': 12.00,    // Feijão
      '4': 16.00,    // Macarrao
      '5': 12.00,   // Café
      '6': 6.50,    // Açucar
      '7': 8.00,    // Sal
      '8': 9.00,    // Pao Tradicional
      '9': 8.50     // Salgadinho
    };
    return prices[productId] || 0;
  }

function updateCartTotal() {
  const totalAmountElement = cartPage.querySelector('.total-amount');
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  totalAmountElement.textContent = totalAmount.toFixed(2);
}
});

function logar() {
  let login = document.getElementById("username").value;
  let senha = document.getElementById("password").value;

  if (login !== "" || senha !== "") {
    if (login === "adm" && senha === "12345") {
      document.getElementById("respostaLogin").innerHTML = "Bem vindo, ADM!";
      let token = "adm";
      JSON.stringify(token);
      localStorage.setItem("token", token);
      window.location.href = "adm.html";
    } else {
      document.getElementById('respostaLogin').innerHTML = "Login ou senha incorretos";
    }
  } else {
    document.getElementById('respostaLogin').innerHTML = "Preencha todos os campos";
  }
}

const loginButton = document.querySelector('.login');
const loginModal = document.querySelector('.login-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

loginButton.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    loginModal.style.display = 'none';
  });
});

checkoutPage.querySelector('#checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  checkoutPage.classList.remove('visible');
  // Adiciona a classe 'visible' para mostrar a mensagem de confirmação
  confirmationMessage.classList.add('visible');
  setTimeout(() => {
    confirmationPage.classList.remove('visible');
    // Remove a classe 'visible' após alguns segundos
    confirmationMessage.classList.remove('visible');
  }, 3000);
  cart.length = 0;
  updateCartTotal(); 
});

document.addEventListener('DOMContentLoaded', () => {
  const paymentOptions = document.querySelectorAll('.payment-option');

  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      paymentOptions.forEach(opt => {
        opt.classList.remove('selected');
      });
      option.classList.add('selected');
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Função para enviar os dados dos produtos para o painel de administração
  function sendProductsToAdminPanel() {
      const products = document.querySelectorAll('.product');
      const productsData = [];
      products.forEach(product => {
          const id = product.getAttribute('data-id');
          const name = product.querySelector('h3').textContent;
          const price = product.querySelector('.price').textContent.trim();
          productsData.push({ id, name, price });
      });

      // Enviar os dados dos produtos para o painel de administração
      fetch('http://localhost:3000/addProducts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ products: productsData })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao enviar os produtos para o painel de administração');
          }
      })
      .catch(error => {
          console.error(error);
      });
  }

  // Chamada da função ao carregar a página
  sendProductsToAdminPanel();
});