// Daftar produk
const products = [
    {
        name: 'Produk 1',
        arModel: '../assets/produk/product1.glb',
        img: '../assets/produk/produk1.jpg',
        whatsappNumber: '6281230670853' // Ganti dengan nomor WhatsApp yang sesuai
    },
    {
        name: 'Produk 2',
        arModel: '../assets/produk/product2.glb',
        img: '../assets/produk/produk2.jpg',
        whatsappNumber: '6281230670853' // Ganti dengan nomor WhatsApp yang sesuai
    },
    {
        name: 'Produk 3',
        arModel: '../assets/produk/product3.glb',
        img: '../assets/produk/produk3.jpg',
        whatsappNumber: '6281230670853' // Ganti dengan nomor WhatsApp yang sesuai
    },
    {
        name: 'Produk 4',
        arModel: '../assets/produk/product4.glb',
        img: '../assets/produk/produk4.jpg',
        whatsappNumber: '6281230670853' // Ganti dengan nomor WhatsApp yang sesuai
    }
    // Tambahkan produk lain sesuai kebutuhan
];

// Tambahkan daftar produk ke dalam HTML
const productContainer = document.getElementById('product-container');

productContainer.className = 'product-card-container';

products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <h3>${product.name}</h3>
        <div class="product-image-container">
            <img src="${product.img}" alt="${product.name}" class="product-image" />
            <div class="hover-overlay">
                <button class="ar-button" onclick="loadModelAndShowAR('${product.arModel}')">Show In 3D</button>
                <button class="buy-button" onclick="redirectToWhatsApp('${product.whatsappNumber}', '${product.name}')">Beli</button>
            </div>
        </div>
    `;

    productContainer.appendChild(card);
});

// Fungsi untuk mengarahkan ke WhatsApp
function redirectToWhatsApp(whatsappNumber, productName) {
    const encodedMessage = encodeURIComponent(`Halo, Saya tertarik dengan ${productName}. Apakah masih tersedia?`);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Function to load the AR model and show the AR content
function loadModelAndShowAR(modelUrl) {
    const arContent = document.getElementById('ar-content');
    const arSceneContainer = document.getElementById('ar-scene-container');
    const arCamera = document.getElementById('ar-camera');
    const arOverlay = document.getElementById('ar-overlay');
    const productContainer = document.getElementById('product-container');
    const footer = document.querySelector('footer');

    // Remove existing models
    const existingModels = arContent.querySelectorAll('a-entity');
    existingModels.forEach(model => model.parentNode.removeChild(model));

    // Add new model
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', modelUrl);
    model.setAttribute('scale', '0.1 0.1 0.1'); // Sesuaikan skala model sesuai kebutuhan
    model.setAttribute('position', '0 0 -5'); // Sesuaikan posisi model sesuai kebutuhan
    arContent.appendChild(model);

    // Hide the entire website content
    productContainer.style.display = 'none';
    footer.style.display = 'none';

    // Show the AR scene and hide the button overlay
    arSceneContainer.style.display = 'block';
    arCamera.setAttribute('camera', 'active', true); // Activate the AR camera
    arOverlay.style.display = 'block';
}

// Function to hide the AR content and show the website
function hideAR() {
    const arContent = document.getElementById('ar-content');
    const arSceneContainer = document.getElementById('ar-scene-container');
    const arCamera = document.getElementById('ar-camera');
    const arOverlay = document.getElementById('ar-overlay');
    const productContainer = document.getElementById('product-container');
    const footer = document.querySelector('footer');

    // Remove existing models
    const existingModels = arContent.querySelectorAll('a-entity');
    existingModels.forEach(model => model.parentNode.removeChild(model));

    // Show the entire website content
    productContainer.style.display = 'block';
    footer.style.display = 'block';

    // Hide the AR scene and show the button overlay
    arSceneContainer.style.display = 'none';
    arCamera.setAttribute('camera', 'active', false); // Deactivate the AR camera
    arOverlay.style.display = 'none';
}

// Function to initialize the AR scene and disable the camera
function initARScene() {
    const arSceneContainer = document.getElementById('ar-scene-container');
    const arOverlay = document.getElementById('ar-overlay');

    // Hide the AR scene and button overlay by default
    arSceneContainer.style.display = 'none';
    arOverlay.style.display = 'none';

    // Function to hide the AR camera
function hideARCamera() {
    const arCamera = document.getElementById('ar-camera');
    arCamera.setAttribute('camera', 'active', false); // Deactivate the AR camera
}
}



// Call the initARScene function to initialize the AR scene when the page loads
initARScene();
