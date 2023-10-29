import { Area } from "react-easy-crop/types";
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

export function formatTagsInText(text: string) {
   // Definisikan ekspresi reguler untuk mencari tag
   const tagRegex = /#(\w+)/g;

   // Temukan semua tag dalam teks dan tambahkan elemen <span> dengan gaya CSS
   const formattedText = text.split(tagRegex).map((part, index) => {
      if (index % 2 === 0) {
         return part; // Bagian teks biasa
      } else {
         const tag = part.slice(0); // Hilangkan tanda pagar dari tag
         return (
            <span key={index} className="rounded-sm cursor-pointer text-teal">
               #{tag}
            </span>
         );
      }
   });

   return formattedText;
}

export function openModal(id: string) {
   let modal: any = document.getElementById(id);
   if (!modal) return;
   return modal.showModal();
}

export function getRadianAngle(degreeValue: number) {
   return (degreeValue * Math.PI) / 180;
}

export async function fetchBlobFromURL(url: string) {
   const response = await fetch(url);
   return await response.blob();
}

export function getCroppedImg(imageUrl: string, crop: Area): Promise<string> {
   return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");

         if (!ctx) {
            return Promise.resolve("");
         }

         canvas.width = img.width;
         canvas.height = img.height;

         ctx.drawImage(
            img,
            (img.width * crop.x) / 100,
            (img.height * crop.y) / 100,
            (img.width * crop.width) / 100,
            (img.height * crop.height) / 100,
            0,
            0,
            canvas.width,
            canvas.height
         );

         canvas.toBlob((blob) => {
            if (!blob) {
               resolve("");
               return;
            }
            resolve(URL.createObjectURL(blob));
         }, "image/jpeg");
      };
   });
}

export const generateTimestamps = (time: string) => {
   let currentTime = new Date();
   let postTime = new Date(time);

   const timeDifference = Math.floor((currentTime.getTime() - postTime.getTime()) / 1000);

   if (timeDifference < 60) {
      return `${timeDifference} detik yang lalu`;
   } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} menit yang lalu`;
   } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} jam yang lalu`;
   } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days} hari yang lalu`;
   }
};
