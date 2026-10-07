// ============================================================
// PRODUTOS
// ============================================================

const initialProducts = [
    {
        id: 1,
        name: "Mouse Sem Fio Pro",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Teclado Mecânico RGB",
        price: 74.50,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Monitor UltraWide 29'",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Auscultadores Bluetooth ANC",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Webcam Full HD 1080p",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Cadeira Gaming Ergonómica",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Disco Externo SSD 1TB",
        price: 79.95,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Mouse Pad XL",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Microfone Condensador USB",
        price: 54.00,
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Coluna Bluetooth Portátil",
        price: 34.90,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Suporte Articulado Monitor",
        price: 39.90,
        image: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Carregador Sem Fios Qi",
        price: 22.50,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 13,
        name: "Hub USB-C 6 em 1",
        price: 27.80,
        image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80"
    }
];


const fallbackImg =
    "https://placehold.co/600x400/e9ecef/2c3e50?text=Imagem+indisponivel";


// ============================================================
// CARREGAR PRODUTOS
// ============================================================

let products =
    JSON.parse(
        localStorage.getItem("store_products")
    ) || initialProducts;


// Corrigir produtos antigos

products = products.map(product => {

    if (
        !product.image ||
        product.image === "https://unsplash.com" ||
        product.image === "https://placehold.co"
    ) {

        const original =
            initialProducts.find(
                p => p.id === product.id
            );

        if (original) {
            product.image = original.image;
        }

    }

    return product;

});


localStorage.setItem(
    "store_products",
    JSON.stringify(products)
);


// ============================================================
// CLIENTES
// ============================================================

let clients =
    JSON.parse(
        localStorage.getItem("store_clients")
    ) || [];


// ============================================================
// CARRINHO
// ============================================================

let cart = [];


// ============================================================
// ELEMENTOS
// ============================================================

// Views

const shopView =
    document.getElementById("shop-view");

const adminView =
    document.getElementById("admin-view");

const clientsView =
    document.getElementById("clients-view");


// Navegação

const viewShopBtn =
    document.getElementById("view-shop-btn");

const viewAdminBtn =
    document.getElementById("view-admin-btn");

const viewClientsBtn =
    document.getElementById("view-clients-btn");


// Produtos

const productsGrid =
    document.getElementById("products-grid");

const searchInput =
    document.getElementById("search-input");

const adminTableBody =
    document.getElementById("admin-table-body");


// Carrinho

const cartItemsContainer =
    document.getElementById("cart-items");

const cartTotalValue =
    document.getElementById("cart-total-value");

const checkoutBtn =
    document.getElementById("checkout-btn");


// Modal produto

const productModal =
    document.getElementById("product-modal");

const productForm =
    document.getElementById("product-form");

const modalTitle =
    document.getElementById("modal-title");

const openAddModalBtn =
    document.getElementById("open-add-modal-btn");

const closeModalBtn =
    document.getElementById("close-modal-btn");


// Clientes

const clientsTableBody =
    document.getElementById("clients-table-body");

const clientSearchInput =
    document.getElementById("client-search-input");

const clientModal =
    document.getElementById("client-modal");

const clientForm =
    document.getElementById("client-form");

const clientModalTitle =
    document.getElementById("client-modal-title");

const openAddClientBtn =
    document.getElementById("open-add-client-btn");

const closeClientModalBtn =
    document.getElementById(
        "close-client-modal-btn"
    );


// ============================================================
// NAVEGAÇÃO
// ============================================================

viewShopBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        switchView("shop");

    }
);


viewAdminBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        switchView("admin");

    }
);


viewClientsBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        switchView("clients");

    }
);


function switchView(view) {

    shopView.classList.remove("active");
    adminView.classList.remove("active");
    clientsView.classList.remove("active");

    viewShopBtn.classList.remove("active");
    viewAdminBtn.classList.remove("active");
    viewClientsBtn.classList.remove("active");


    if (view === "shop") {

        shopView.classList.add("active");
        viewShopBtn.classList.add("active");

        renderShop();

    }


    else if (view === "admin") {

        adminView.classList.add("active");
        viewAdminBtn.classList.add("active");

        renderAdminTable();

    }


    else if (view === "clients") {

        clientsView.classList.add("active");
        viewClientsBtn.classList.add("active");

        renderClients();

    }

}


// ============================================================
// STORAGE
// ============================================================

function saveProducts() {

    localStorage.setItem(
        "store_products",
        JSON.stringify(products)
    );

}


function saveClients() {

    localStorage.setItem(
        "store_clients",
        JSON.stringify(clients)
    );

}


// ============================================================
// LOJA
// ============================================================

function renderShop(filterText = "") {

    productsGrid.innerHTML = "";


    const search =
        filterText
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search)
        );


    if (filtered.length === 0) {

        productsGrid.innerHTML =
            "<p>Nenhum produto encontrado.</p>";

        return;

    }


    filtered.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        const image =
            document.createElement("img");

        image.className =
            "product-img";

        image.src =
            product.image || fallbackImg;

        image.alt =
            product.name;


        image.onerror =
            function () {

                this.onerror = null;

                this.src = fallbackImg;

            };


        const title =
            document.createElement("h3");

        title.className =
            "product-title";

        title.textContent =
            product.name;


        const price =
            document.createElement("p");

        price.className =
            "product-price";

        price.textContent =
            `${Number(product.price).toFixed(2)}€`;


        const button =
            document.createElement("button");

        button.className =
            "btn btn-primary w-100";

        button.innerHTML =
            `
            <i class="fa-solid fa-cart-plus"></i>
            Adicionar
            `;


        button.addEventListener(
            "click",
            function () {

                addToCart(product.id);

            }
        );


        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(button);

        productsGrid.appendChild(card);

    });

}


searchInput.addEventListener(
    "input",
    function (event) {

        renderShop(event.target.value);

    }
);


// ============================================================
// CARRINHO
// ============================================================

function addToCart(id) {

    const product =
        products.find(
            p => p.id === id
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCartUI();

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    updateCartUI();

}


function updateCartUI() {

    cartItemsContainer.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            `
            <p style="
                color:#7f8c8d;
                font-style:italic;
            ">
                Vazio.
            </p>
            `;

        cartTotalValue.innerText =
            "0.00€";

        return;

    }


    cart.forEach(item => {

        total +=
            Number(item.price) *
            item.quantity;


        const div =
            document.createElement("div");

        div.className =
            "cart-item";


        div.innerHTML =
            `
            <div>
                <strong>${item.name}</strong>
                <br>
                <small>${item.quantity}x</small>
            </div>

            <button
                class="btn-remove"
                style="
                    background:none;
                    border:none;
                    color:red;
                    cursor:pointer;
                "
            >
                <i class="fa-solid fa-trash"></i>
            </button>
            `;


        div.querySelector(
            ".btn-remove"
        ).addEventListener(
            "click",
            function () {

                removeFromCart(item.id);

            }
        );


        cartItemsContainer.appendChild(div);

    });


    cartTotalValue.innerText =
        `${total.toFixed(2)}€`;

}


// ============================================================
// FINALIZAR COMPRA
// ============================================================

checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "O carrinho está vazio."
            );

            return;

        }


        if (clients.length === 0) {

            alert(
                "Cadastre pelo menos um cliente antes de finalizar a compra."
            );

            switchView("clients");

            return;

        }


        alert(
            "Compra preparada com sucesso!"
        );

    }
);


// ============================================================
// PRODUTOS - ADMIN
// ============================================================

function renderAdminTable() {

    adminTableBody.innerHTML = "";


    products.forEach(product => {

        const tr =
            document.createElement("tr");


        tr.innerHTML =
            `
            <td>
                <img
                    src="${product.image || fallbackImg}"
                    class="table-img"
                    alt="${product.name}"
                >
            </td>

            <td>${product.name}</td>

            <td>
                ${Number(product.price).toFixed(2)}€
            </td>

            <td class="actions-cell">

                <button
                    class="btn btn-warning edit-product"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="btn btn-danger delete-product"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>
            `;


        const image =
            tr.querySelector("img");


        image.onerror =
            function () {

                this.onerror = null;

                this.src = fallbackImg;

            };


        tr.querySelector(
            ".edit-product"
        ).addEventListener(
            "click",
            function () {

                openEditModal(product.id);

            }
        );


        tr.querySelector(
            ".delete-product"
        ).addEventListener(
            "click",
            function () {

                deleteProduct(product.id);

            }
        );


        adminTableBody.appendChild(tr);

    });

}


// ============================================================
// MODAL PRODUTO
// ============================================================

openAddModalBtn.addEventListener(
    "click",
    function () {

        productForm.reset();

        document.getElementById(
            "product-id"
        ).value = "";


        modalTitle.innerText =
            "Cadastrar Produto";


        productModal.classList.add(
            "active"
        );

    }
);


closeModalBtn.addEventListener(
    "click",
    function () {

        productModal.classList.remove(
            "active"
        );

    }
);


productModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === productModal
        ) {

            productModal.classList.remove(
                "active"
            );

        }

    }
);


// ============================================================
// SALVAR PRODUTO
// ============================================================

productForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "product-id"
            ).value;


        const name =
            document.getElementById(
                "prod-name"
            ).value.trim();


        const price =
            parseFloat(
                document.getElementById(
                    "prod-price"
                ).value
            );


        const image =
            document.getElementById(
                "prod-image"
            ).value.trim();


        if (!name) {

            alert(
                "Informe o nome do produto."
            );

            return;

        }


        if (
            isNaN(price) ||
            price < 0
        ) {

            alert(
                "Informe um preço válido."
            );

            return;

        }


        if (id) {

            const index =
                products.findIndex(
                    p => p.id == id
                );


            if (index !== -1) {

                products[index] = {

                    id: Number(id),

                    name,

                    price,

                    image:
                        image || fallbackImg

                };

            }

        }

        else {

            products.push({

                id: Date.now(),

                name,

                price,

                image:
                    image || fallbackImg

            });

        }


        saveProducts();


        productModal.classList.remove(
            "active"
        );


        renderAdminTable();

        renderShop();

    }
);


// ============================================================
// EDITAR PRODUTO
// ============================================================

function openEditModal(id) {

    const product =
        products.find(
            p => p.id === id
        );


    if (!product) {
        return;
    }


    document.getElementById(
        "product-id"
    ).value = product.id;


    document.getElementById(
        "prod-name"
    ).value = product.name;


    document.getElementById(
        "prod-price"
    ).value = product.price;


    document.getElementById(
        "prod-image"
    ).value =
        product.image || "";


    modalTitle.innerText =
        "Alterar Produto";


    productModal.classList.add(
        "active"
    );

}


// ============================================================
// EXCLUIR PRODUTO
// ============================================================

function deleteProduct(id) {

    if (
        !confirm(
            "Tem certeza que deseja excluir este produto?"
        )
    ) {

        return;

    }


    products =
        products.filter(
            p => p.id !== id
        );


    cart =
        cart.filter(
            item => item.id !== id
        );


    saveProducts();

    renderAdminTable();

    renderShop();

    updateCartUI();

}


// ============================================================
// CLIENTES - RENDERIZAÇÃO
// ============================================================

function renderClients(filterText = "") {

    clientsTableBody.innerHTML = "";


    const search =
        filterText
            .trim()
            .toLowerCase();


    const filtered =
        clients.filter(client => {

            return (
                client.name
                    .toLowerCase()
                    .includes(search)

                ||

                client.email
                    .toLowerCase()
                    .includes(search)

                ||

                client.cpf
                    .toLowerCase()
                    .includes(search)
            );

        });


    if (filtered.length === 0) {

        clientsTableBody.innerHTML =
            `
            <tr>
                <td
                    colspan="6"
                    class="empty-table"
                >
                    <i class="fa-solid fa-user-slash"></i>
                    <br>
                    Nenhum cliente cadastrado.
                </td>
            </tr>
            `;

        return;

    }


    filtered.forEach(client => {

        const tr =
            document.createElement("tr");


        tr.innerHTML =
            `
            <td>
                <strong>
                    ${client.name}
                </strong>
            </td>

            <td>
                ${client.email}
            </td>

            <td>
                ${client.phone || "-"}
            </td>

            <td>
                ${client.cpf || "-"}
            </td>

            <td>
                ${client.city || "-"}
            </td>

            <td class="actions-cell">

                <button
                    class="btn btn-warning edit-client"
                    title="Editar"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="btn btn-danger delete-client"
                    title="Excluir"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>
            `;


        tr.querySelector(
            ".edit-client"
        ).addEventListener(
            "click",
            function () {

                openEditClientModal(
                    client.id
                );

            }
        );


        tr.querySelector(
            ".delete-client"
        ).addEventListener(
            "click",
            function () {

                deleteClient(
                    client.id
                );

            }
        );


        clientsTableBody.appendChild(tr);

    });

}


// ============================================================
// PESQUISA CLIENTES
// ============================================================

clientSearchInput.addEventListener(
    "input",
    function (event) {

        renderClients(
            event.target.value
        );

    }
);


// ============================================================
// ABRIR MODAL - NOVO CLIENTE
// ============================================================

openAddClientBtn.addEventListener(
    "click",
    function () {

        clientForm.reset();


        document.getElementById(
            "client-id"
        ).value = "";


        clientModalTitle.innerText =
            "Cadastrar Cliente";


        clientModal.classList.add(
            "active"
        );

    }
);


// ============================================================
// FECHAR MODAL CLIENTE
// ============================================================

closeClientModalBtn.addEventListener(
    "click",
    function () {

        clientModal.classList.remove(
            "active"
        );

    }
);


clientModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === clientModal
        ) {

            clientModal.classList.remove(
                "active"
            );

        }

    }
);


// ============================================================
// SALVAR CLIENTE
// ============================================================

clientForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "client-id"
            ).value;


        const name =
            document.getElementById(
                "client-name"
            ).value.trim();


        const email =
            document.getElementById(
                "client-email"
            ).value.trim();


        const phone =
            document.getElementById(
                "client-phone"
            ).value.trim();


        const cpf =
            document.getElementById(
                "client-cpf"
            ).value.trim();


        const address =
            document.getElementById(
                "client-address"
            ).value.trim();


        const city =
            document.getElementById(
                "client-city"
            ).value.trim();


        const cep =
            document.getElementById(
                "client-cep"
            ).value.trim();


        if (!name) {

            alert(
                "Informe o nome do cliente."
            );

            return;

        }


        if (!email) {

            alert(
                "Informe o e-mail do cliente."
            );

            return;

        }


        // ====================================================
        // EDITAR
        // ====================================================

        if (id) {

            const index =
                clients.findIndex(
                    client =>
                        client.id == id
                );


            if (index !== -1) {

                clients[index] = {

                    id: Number(id),

                    name,

                    email,

                    phone,

                    cpf,

                    address,

                    city,

                    cep

                };

            }

        }


        // ====================================================
        // NOVO
        // ====================================================

        else {

            const newClient = {

                id: Date.now(),

                name,

                email,

                phone,

                cpf,

                address,

                city,

                cep

            };


            clients.push(
                newClient
            );

        }


        saveClients();


        clientModal.classList.remove(
            "active"
        );


        renderClients();

    }
);


// ============================================================
// EDITAR CLIENTE
// ============================================================

function openEditClientModal(id) {

    const client =
        clients.find(
            c => c.id === id
        );


    if (!client) {
        return;
    }


    document.getElementById(
        "client-id"
    ).value = client.id;


    document.getElementById(
        "client-name"
    ).value =
        client.name;


    document.getElementById(
        "client-email"
    ).value =
        client.email;


    document.getElementById(
        "client-phone"
    ).value =
        client.phone || "";


    document.getElementById(
        "client-cpf"
    ).value =
        client.cpf || "";


    document.getElementById(
        "client-address"
    ).value =
        client.address || "";


    document.getElementById(
        "client-city"
    ).value =
        client.city || "";


    document.getElementById(
        "client-cep"
    ).value =
        client.cep || "";


    clientModalTitle.innerText =
        "Alterar Cliente";


    clientModal.classList.add(
        "active"
    );

}


// ============================================================
// EXCLUIR CLIENTE
// ============================================================

function deleteClient(id) {

    const client =
        clients.find(
            c => c.id === id
        );


    if (!client) {
        return;
    }


    const confirmed =
        confirm(
            `Deseja excluir o cliente "${client.name}"?`
        );


    if (!confirmed) {
        return;
    }


    clients =
        clients.filter(
            c => c.id !== id
        );


    saveClients();

    renderClients();

}


// ============================================================
// MÁSCARA CPF
// ============================================================

document
    .getElementById("client-cpf")
    .addEventListener(
        "input",
        function () {

            let value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 11);


            value =
                value.replace(
                    /(\d{3})(\d)/,
                    "$1.$2"
                );


            value =
                value.replace(
                    /(\d{3})(\d)/,
                    "$1.$2"
                );


            value =
                value.replace(
                    /(\d{3})(\d{1,2})$/,
                    "$1-$2"
                );


            this.value = value;

        }
    );


// ============================================================
// MÁSCARA CEP
// ============================================================

document
    .getElementById("client-cep")
    .addEventListener(
        "input",
        function () {

            let value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 8);


            if (value.length > 5) {

                value =
                    value.substring(0, 5)
                    + "-"
                    + value.substring(5);

            }


            this.value = value;

        }
    );


// ============================================================
// INICIALIZAÇÃO
// ============================================================

renderShop();

updateCartUI();