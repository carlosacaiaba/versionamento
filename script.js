// Base de dados inicial simulada com links de imagens reais públicas
const initialProducts = [
    { id: 1, name: "mouse Sem Fios Pro", price: 29.99, image: "https://unsplash.com" },
    { id: 2, name: "Teclado Mecânico RGB", price: 74.50, image: "https://unsplash.com" },
    { id: 3, name: "Monitor UltraWide 29'", price: 189.90, image: "https://unsplash.com" }
];

// Carrega dados do LocalStorage ou assume a lista inicial padrão
let products = JSON.parse(localStorage.getItem('store_products')) || initialProducts;
let cart = [];

// Elementos de Navegação
const shopView = document.getElementById('shop-view');
const adminView = document.getElementById('admin-view');
const viewShopBtn = document.getElementById('view-shop-btn');
const viewAdminBtn = document.getElementById('view-admin-btn');

// Elementos da Loja / Filtro
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');

// Elementos do Carrinho
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-value');

// Elementos da Administração / Modal
const adminTableBody = document.getElementById('admin-table-body');
const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');
const openAddModalBtn = document.getElementById('open-add-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

// --- CONTROLO DAS ABAS DE NAVEGAÇÃO ---
viewShopBtn.addEventListener('click', () => switchView('shop'));
viewAdminBtn.addEventListener('click', () => switchView('admin'));

function switchView(view) {
    if(view === 'shop') {
        shopView.classList.add('active');
        adminView.classList.remove('active');
        viewShopBtn.classList.add('active');
        viewAdminBtn.classList.remove('active');
        renderShop();
    } else {
        adminView.classList.add('active');
        shopView.classList.remove('active');
        viewAdminBtn.classList.add('active');
        viewShopBtn.classList.remove('active');
        renderAdminTable();
    }
}

// Salvar alterações no Armazenamento Local do Navegador
function saveToStorage() {
    localStorage.setItem('store_products', JSON.stringify(products));
}

// --- FUNCIONALIDADE: RENDERIZAR / CONSULTAR PRODUTOS (LOJA) ---
function renderShop(filterText = "") {
    productsGrid.innerHTML = "";
    const filtered = products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));

    if(filtered.length === 0) {
        productsGrid.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    filtered.forEach(product => {
        const fallbackImg = "https://placehold.co";
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image || fallbackImg}" class="product-img" alt="${product.name}" onerror="this.src='${fallbackImg}'">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${parseFloat(product.price).toFixed(2)}€</p>
            <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-plus"></i> Adicionar
            </button>
        `;
        productsGrid.appendChild(card);
    });
}

// Evento de Consulta / Barra de Pesquisa
searchInput.addEventListener('input', (e) => {
    renderShop(e.target.value);
});

// --- FUNCIONALIDADE: ADICIONAR / REMOVER NO CARRINHO ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const inCart = cart.find(item => item.id === id);

    if (inCart) {
        inCart.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color:#7f8c8d; font-style:italic;">Vazio.</p>';
        cartTotalValue.innerText = "0.00€";
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div><strong>${item.name}</strong><br><small>${item.quantity}x</small></div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(div);
    });
    cartTotalValue.innerText = `${total.toFixed(2)}€`;
}

// --- FUNCIONALIDADES DO CRUD (ÁREA ADMINISTRATIVA) ---

// 1. LEITURA (Listar na Tabela)
function renderAdminTable() {
    adminTableBody.innerHTML = "";
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.image || 'https://placehold.co'}" class="table-img"></td>
            <td>${product.name}</td>
            <td>${parseFloat(product.price).toFixed(2)}€</td>
            <td class="actions-cell">
                <button class="btn btn-warning" onclick="openEditModal(${product.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        adminTableBody.appendChild(tr);
    });
}

// Controladores das Modais de abertura/fecho
openAddModalBtn.addEventListener('click', () => {
    productForm.reset();
    document.getElementById('product-id').value = "";
    modalTitle.innerText = "Cadastrar Produto";
    productModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => productModal.classList.remove('active'));

// 2. CADASTRO E ALTERAÇÃO (Criar & Atualizar)
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('prod-name').value;
    const price = parseFloat(document.getElementById('prod-price').value);
    const image = document.getElementById('prod-image').value;

    if (id) {
        // Modo Alteração (Update)
        const index = products.findIndex(p => p.id == id);
        if(index > -1) {
            products[index] = { id: parseInt(id), name, price, image };
        }
    } else {
        // Modo Cadastro (Create)
        const newProduct = {
            id: Date.now(), // Gera um ID único simples baseado no tempo atual
            name,
            price,
            image
        };
        products.push(newProduct);
    }

    saveToStorage();
    productModal.classList.remove('active');
    renderAdminTable();
});

// Formulário preenchido automaticamente ao clicar para Alterar
function openEditModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('product-id').value = product.id;
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-image').value = product.image;

    modalTitle.innerText = "Alterar Produto";
    productModal.classList.add('active');
}

// 3. EXCLUSÃO (Deletar)
function deleteProduct(id) {
    if(confirm("Tem a certeza que deseja excluir este produto?")) {
        products = products.filter(p => p.id !== id);
        cart = cart.filter(item => item.id !== id); // Remove também do carrinho caso esteja lá
        saveToStorage();
        renderAdminTable();
        updateCartUI();
    }
}

// Inicializar aplicação exibindo o catálogo da loja
renderShop();
