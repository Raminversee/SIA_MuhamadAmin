import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Sistem Informasi Akademik</h1>
        <p>
          Aplikasi ini merupakan tugas mata kuliah Web Dinamis. 
          Dikembangkan menggunakan arsitektur modern Next.js di sisi frontend dan Express.js di sisi backend yang terhubung langsung ke database MySQL.
          <br /><br />di desain ulang oleh Muhamad Amin

        </p>

        <Link href="/mahasiswa">
          <button className="btn-primary">Buka Data Mahasiswa</button>
        </Link>
      </div>
    </main>
  );
}