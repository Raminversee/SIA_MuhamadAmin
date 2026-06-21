import { Router, Request, Response } from "express";
import db from "../config/database";
import { ResultSetHeader } from "mysql2"; // Import tipe data untuk status insert/update MySQL

const router = Router();

// 1. GET: Ambil semua data mahasiswa
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM mahasiswa ORDER BY id DESC");
    res.json({
      message: "Data mahasiswa berhasil diambil dari database",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// 2. POST: Tambah data mahasiswa baru ke database
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nim, nama, prodi, angkatan } = req.body;

    // Eksekusi query INSERT
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO mahasiswa (nim, nama, prodi, angkatan) VALUES (?, ?, ?, ?)",
      [nim, nama, prodi, angkatan]
    );

    res.status(201).json({
      message: "Data mahasiswa berhasil disimpan ke database",
      data: {
        id: result.insertId, // Mengambil ID otomatis dari database
        nim,
        nama,
        prodi,
        angkatan,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menyimpan data ke database" });
  }
});

// 3. PUT: Update data mahasiswa berdasarkan ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nim, nama, prodi, angkatan } = req.body;

    await db.query(
      "UPDATE mahasiswa SET nim = ?, nama = ?, prodi = ?, angkatan = ? WHERE id = ?",
      [nim, nama, prodi, angkatan, id]
    );

    res.json({ message: "Data mahasiswa berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui data" });
  }
});

// 4. DELETE: Hapus data mahasiswa berdasarkan ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM mahasiswa WHERE id = ?", [id]);

    res.json({ message: "Data mahasiswa berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus data" });
  }
});

export default router;
