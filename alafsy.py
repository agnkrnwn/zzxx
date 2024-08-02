import os
import requests
from tqdm import tqdm

base_url = "https://equran.nos.wjv-1.neo.id/audio-partial/Misyari-Rasyid-Al-Afasi/"
output_folder = "audioalafasy"

# Jumlah ayat untuk setiap surat dalam Al-Quran
ayat_per_surat = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 
    111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 
    54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 
    49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 
    44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 
    26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 
    6, 3, 5, 4, 5, 6
]

# Membuat folder output jika belum ada
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Fungsi untuk mengunduh file
def download_file(url, filename):
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))

    with open(filename, 'wb') as file, tqdm(
        desc=filename,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as progress_bar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            progress_bar.update(size)

# Loop untuk mengunduh semua surat dan ayat
for surat, jumlah_ayat in enumerate(ayat_per_surat, start=1):
    for ayat in range(1, jumlah_ayat + 1):
        # Format nomor surat dan ayat
        surat_str = f"{surat:03d}"
        ayat_str = f"{ayat:03d}"
        
        # Buat nama file
        filename = f"{surat_str}{ayat_str}.mp3"
        url = base_url + filename
        output_path = os.path.join(output_folder, filename)
        
        # Coba unduh file
        try:
            download_file(url, output_path)
            print(f"Berhasil mengunduh {filename}")
        except requests.exceptions.RequestException:
            print(f"Gagal mengunduh {filename}, melanjutkan ke file berikutnya.")

print("Selesai mengunduh semua file.")