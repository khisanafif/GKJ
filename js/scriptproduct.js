// Fungsi untuk mengarahkan ke WhatsApp
function redirectToWhatsApp(whatsappNumber, productName) {
    const encodedMessage = encodeURIComponent(`Halo, Saya tertarik dengan ${productName}. Apakah masih tersedia?`);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}