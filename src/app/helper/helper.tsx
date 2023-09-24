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

interface CropOptions {
   unit?: "%" | "px";
   width: number;
   height: number;
}

export function getCroppedImg(
   imageUrl: string,
   crop: Area,
   rotation: number,
   cropOptions: CropOptions
): Promise<string | null> {
   return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");
         const { width, height, unit = "%" } = cropOptions;

         if (!ctx) {
            return Promise.resolve(null);
         }

         canvas.width = unit === "%" ? (width / 100) * img.width : width;
         canvas.height = unit === "%" ? (height / 100) * img.height : height;

         ctx.translate(canvas.width / 2, canvas.height / 2);
         ctx.rotate((rotation * Math.PI) / 180);
         ctx.translate(-canvas.width / 2, -canvas.height / 2);

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
               resolve(null);
               return;
            }
            resolve(URL.createObjectURL(blob));
         }, "image/jpeg");
      };
   });
}
