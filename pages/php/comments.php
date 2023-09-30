<?php
// Konfigurasi koneksi ke database
$host = "localhost";
$username = "gkjember_gkjem";
$password = "123";
$database = "gkjember_gkjem";

try {
    // Membuat koneksi ke database menggunakan PDO
    $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);

    // Set mode PDO untuk menampilkan pesan kesalahan
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        // Jika metode permintaan adalah GET, ambil komentar dari database
        $query = "SELECT * FROM comments ORDER BY created_at DESC";
        $stmt = $conn->query($query);

        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($comments) {
            // Mengirim komentar sebagai respon JSON
            header('Content-Type: application/json');
            echo json_encode($comments);
        } else {
            echo "Belum ada komentar.";
        }
    } elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Jika metode permintaan adalah POST, tambahkan komentar ke database
        $name = $_POST["name"];
        $comment = $_POST["comment"];

        // Validasi bahwa input 'name' dan 'comment' tidak boleh kosong
        if (empty($name) || empty($comment)) {
            echo "Nama dan komentar harus diisi.";
            return;
        }

        // Query untuk menambahkan komentar baru ke tabel
        $query = "INSERT INTO comments (name, comment) VALUES (:name, :comment)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":comment", $comment);

        if ($stmt->execute()) {
            // Mengirim data komentar yang baru ditambahkan sebagai respon JSON
            $newComment = array("name" => $name, "comment" => $comment);
            header('Content-Type: application/json');
            echo json_encode($newComment);
        } else {
            echo "Gagal menambahkan komentar.";
        }
    }
} catch (PDOException $e) {
    echo "Koneksi ke database gagal: " . $e->getMessage();
}
?>
