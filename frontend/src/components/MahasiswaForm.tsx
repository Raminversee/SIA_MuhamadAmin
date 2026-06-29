"use client";

import { FormEvent, useEffect, useState } from "react";
import { Mahasiswa } from "@/lib/api";


type Props = {
  selectedMahasiswa: Mahasiswa | null;
  prodi: {
    id: number;
    nama_prodi: string;
  }[];
  onSubmit: (formData: FormData) => Promise<void>;
  onCancelEdit: () => void;
};

const initialForm = {
  nim: "",
  nama: "",
  prodi_id: "",
  angkatan: new Date().getFullYear().toString(),
};

export default function MahasiswaForm({
  selectedMahasiswa,
  prodi,
  onSubmit,
  onCancelEdit,
}: Props){

  const [form, setForm] = useState(initialForm);
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({
        nim: selectedMahasiswa.nim,
        nama: selectedMahasiswa.nama,
        prodi_id: selectedMahasiswa.prodi_id.toString(),
        angkatan: selectedMahasiswa.angkatan.toString(),
      });
    } else {
      setForm(initialForm);
      setFoto(null);
    }
  }, [selectedMahasiswa]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // await onSubmit(form);
      const formData = new FormData();
      formData.append("nim", form.nim);
      formData.append("nama", form.nama);
      formData.append("prodi_id", form.prodi_id);
      formData.append("angkatan", form.angkatan);
      if (foto) {
        formData.append("foto", foto);
      }

      await onSubmit(formData);

      setForm(initialForm);
      setFoto(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}</h2>

      <div className="grid">
        <div className="form-group">
          <label htmlFor="nim">NIM</label>
          <input
            id="nim"
            value={form.nim}
            onChange={(e) => setForm({ ...form, nim: e.target.value })}
            placeholder="Contoh: 2201001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Nama mahasiswa"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prodi">Prodi</label>
          <select
            value={form.prodi_id}
            onChange={(e) =>
              setForm({
                ...form,
                prodi_id: e.target.value,
              })
            }
            required
          >
            <option value="">Pilih Prodi</option>

            {prodi.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama_prodi}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="angkatan">Angkatan</label>
          <input
            id="angkatan"
            type="number"
            value={form.angkatan}
            onChange={(e) =>
              setForm({
                ...form,
                angkatan: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Foto</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFoto(e.target.files?.[0] || null)
            }
          />
        </div>



      </div>

      <div className="actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Menyimpan..." : selectedMahasiswa ? "Update" : "Simpan"}
        </button>

        {selectedMahasiswa && (
          <button type="button" className="btn-secondary" onClick={onCancelEdit}>
            Batal Edit
          </button>
        )}
      </div>
    </form>
  );
}
