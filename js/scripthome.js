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
            <button class="ar-button" onclick="loadModel('${product.arModel}')">Show In 3D</button>
                <button class="buy-button" onclick="redirectToWhatsApp('${product.whatsappNumber}', '${product.name}')">Beli</button>
            </div>
        </div>
    `;

    productContainer.appendChild(card);
});

// Fungsi untuk mengarahkan ke WhatsAppa
function redirectToWhatsApp(whatsappNumber, productName) {
    const encodedMessage = encodeURIComponent(`Halo, Saya tertarik dengan ${productName}. Apakah masih tersedia?`);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Function to show the AR content and hide other elements
function showAR(modelUrl) {
    const arContent = document.getElementById('ar-content');
    const arOverlay = document.getElementById('ar-overlay');
    const productContainer = document.getElementById('product-container');
    const footer = document.querySelector('footer');
  
    // Hide other elements
    productContainer.style.display = 'none';
    footer.style.display = 'none';
  
    // Remove existing models
    const existingModels = arContent.querySelectorAll('a-entity');
    existingModels.forEach(model => model.parentNode.removeChild(model));
  
    // Add new model
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', modelUrl);
    model.setAttribute('scale', '0.1 0.1 0.1'); // Sesuaikan skala model sesuai kebutuhan
    model.setAttribute('position', '0 0 -5'); // Sesuaikan posisi model sesuai kebutuhan
    arContent.appendChild(model);
  
    // Show the AR overlay
    arOverlay.style.display = 'block';
  }
  
  // Function to hide the AR content and show other elements
  function hideAR() {
    const arContent = document.getElementById('ar-content');
    const arOverlay = document.getElementById('ar-overlay');
    const productContainer = document.getElementById('product-container');
    const footer = document.querySelector('footer');
  
    // Hide the AR overlay
    arOverlay.style.display = 'none';
  
    // Remove existing models
    const existingModels = arContent.querySelectorAll('a-entity');
    existingModels.forEach(model => model.parentNode.removeChild(model));
  
    // Show other elements
    productContainer.style.display = 'block';
    footer.style.display = 'block';
  }
  
  
