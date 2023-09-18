// Fungsi untuk mendapatkan item dari local storage dengan nilai default
export function getLocalStorageItem<T>(key: string, defaultValue?: T): T | null {
   try {
      const item = localStorage.getItem(key); // Cobakan untuk mengambil item dari local storage
      return item ? JSON.parse(item) : defaultValue ?? null; // Jika item ditemukan, parse dari JSON (jika diperlukan); jika tidak, kembalikan nilai default
   } catch (error) {
      console.error("Error retrieving item from local storage:", error);
      return defaultValue ?? null; // Mengembalikan nilai default jika terjadi kesalahan
   }
}

// Contoh penggunaan:
//   const userData = getLocalStorageItem<UserData>('user', {} as UserData); // Mendapatkan item 'user' dari local storage dengan tipe UserData dan nilai default objek kosong jika tidak ditemukan
//   console.log('Data pengguna:', userData); // Jika tidak ditemukan, userData akan menjadi objek kosong {}
