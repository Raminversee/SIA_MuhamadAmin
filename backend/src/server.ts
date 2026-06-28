import app from "./app";
import { mahasiswa } from "./data/mahasiswa.data";

const PORT = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Contoh Endpoint Search
app.get("/api/mahasiswa/search/:keyword", (req, res) => {
  const { keyword } = req.params;
  const result = mahasiswa.filter(m => m.nama.toLowerCase().includes(keyword.toLowerCase()));
  res.json(result);
});

// Contoh Validasi POST
app.post("/api/mahasiswa", (req, res) => {
  const { nim, nama } = req.body;

  // 1. Validasi Nama
  if (nama.length < 3) return res.status(400).send("Nama kurang dari 3 karakter");

  // 2. Cek Duplikat NIM
  const isDuplicate = mahasiswa.find(m => m.nim === nim);
  if (isDuplicate) return res.status(400).send("NIM sudah ada");

  // Jika aman, lanjut simpan...
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
