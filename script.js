// Base de dados simulada de produtos da loja
const products = [
    { id: 1, name: "Rato Sem Fios", price: 25.99, icon: "🖱️" },
    { id: 2, name: "Teclado Mecânico", price: 69.90, icon: "⌨️" },
    { id: 3, name: "Monitor Gaming 24'", price: 149.99, icon: "🖥️" },
    { id: 4, name: "Auscultadores Bluetooth", price: 45.50, icon: "🎧" },
    { id: 5, name: "Tapete RGB XL", price: 19.95, icon: "🟥" }
];

// Estado da aplicação (Carrinho de compras)
let cart = [];

// Seleção de elementos do DOM
const productsGrid = document.getElementById('products-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalValue = document.getElementById('cart-total-value');
const checkoutBtn = document.getElementById('checkout-btn');

// Função para renderizar os produtos na tela
function renderProducts() {
    productsGrid.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">${product.icon}</div>
            <h3>${product.name}</h3>
            <p class="product-price">${product.price.toFixed(2)}€</p>
            <button class="btn-add" onclick="addToCart(${product.id})">Adicionar</button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Função para remover uma unidade ou o item do carrinho
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    
    updateCart();
}

// Função para atualizar a interface do carrinho e calcular totais
function updateCart() {
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">O carrinho está vazio.</p>';
        cartCount.innerText = "0";
        cartTotalValue.innerText = "0.00€";
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong> <br>
                <small>${item.quantity}x ${item.price.toFixed(2)}€</small>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">❌</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = totalItems;
    cartTotalValue.innerText = `${totalPrice.toFixed(2)}€`;
}

// Evento de finalização de compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("O seu carrinho está vazio! Adicione produtos antes de finalizar.");
    } else {
        alert(`Compra finalizada com sucesso! Total: ${cartTotalValue.innerText}\nObrigado pela preferência.`);
        cart = []; // Limpa o carrinho
        updateCart();
    }
});

// Inicialização do sistema ao carregar a página
renderProducts();
