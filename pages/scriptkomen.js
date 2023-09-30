document.addEventListener("DOMContentLoaded", function () {
    // Ambil komentar dari server dan tampilkan di halaman
    fetch("php/comments.php")
        .then((response) => response.json())
        .then((data) => {
            const commentsDiv = document.getElementById("comments");
            data.forEach((comment) => {
                commentsDiv.innerHTML += `<p>${comment.name}: ${comment.comment}</p>`;
            });
        });

    // Handle pengiriman komentar baru
    const commentForm = document.getElementById("commentForm");
    commentForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Mencegah perilaku bawaan formulir

        const name = document.getElementById("name").value;
        const commentText = document.getElementById("comment").value;

        // Kirim data komentar ke server
        fetch("php/comments.php", {
            method: "POST",
            body: JSON.stringify({ name, comment: commentText }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Tambahkan komentar baru ke tampilan
                const commentsDiv = document.getElementById("comments");
                commentsDiv.innerHTML += `<p>${data.name}: ${data.comment}</p>`;
                // Bersihkan formulir
                document.getElementById("name").value = "";
                document.getElementById("comment").value = "";
            });
    });
});
