export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  prodi_id: number;
  nama_prodi: string;
  angkatan: number;
  foto?: string | null;
};

export type MahasiswaResponse = {
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Mahasiswa[];
};

export async function getMahasiswa(params: {
  search?: string;
  prodi_id?: string;
  page?: number;
  limit?: number;
}): Promise<MahasiswaResponse> {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.prodi_id) query.set("prodi_id", params.prodi_id);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const response = await fetch(
    `${API_URL}/mahasiswa?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function createMahasiswa(formData: FormData) {
  const response = await fetch(`${API_URL}/mahasiswa`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function updateMahasiswa(
  id: number,
  formData: FormData
) {
  const response = await fetch(`${API_URL}/mahasiswa/${id}`, {
    method: "PUT",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteMahasiswa(id: number) {
  const response = await fetch(`${API_URL}/mahasiswa/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function getProdi() {
  const response = await fetch(`${API_URL}/prodi`, {
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
}

// export const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// export type Mahasiswa = {
//   id: number;
//   nim: string;
//   nama: string;
//   prodi: string;
//   angkatan: number;
//   created_at?: string;
// };

// export type MahasiswaInput = {
//   nim: string;
//   nama: string;
//   prodi: string;
//   angkatan: number;
// };

// type ApiResponse<T> = {
//   message: string;
//   data?: T;
// };

// async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
//   const result = await response.json();

//   if (!response.ok) {
//     throw new Error(result.message || "Terjadi kesalahan saat mengakses API");
//   }

//   return result;
// }

// // 1. GET MAHASISWA 
// export async function getMahasiswa(): Promise<Mahasiswa[]> {
//   const response = await fetch(`${API_URL}/db/mahasiswa`, {
//     cache: "no-store",
//   });

//   const result = await handleResponse<Mahasiswa[]>(response);
//   return result.data || [];
// }

// // 2. CREATE MAHASISWA 
// export async function createMahasiswa(
//   payload: MahasiswaInput
// ): Promise<Mahasiswa> {
//   const response = await fetch(`${API_URL}/db/mahasiswa`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   const result = await handleResponse<Mahasiswa>(response);
//   return result.data as Mahasiswa;
// }

// // 3. UPDATE MAHASISWA 
// export async function updateMahasiswa(
//   id: number,
//   payload: MahasiswaInput
// ): Promise<void> {
//   const response = await fetch(`${API_URL}/db/mahasiswa/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   await handleResponse(response);
// }

// // 4. DELETE MAHASISWA 
// export async function deleteMahasiswa(id: number): Promise<void> {
//   const response = await fetch(`${API_URL}/db/mahasiswa/${id}`, {
//     method: "DELETE",
//   });

//   await handleResponse(response);
// }