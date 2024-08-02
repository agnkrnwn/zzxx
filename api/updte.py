import json
import os

# Buat folder baru jika belum ada
if not os.path.exists('qurandataupdate'):
    os.makedirs('qurandataupdate')
    print("Folder 'qurandataupdate' berhasil dibuat.")

# Proses setiap file JSON dari 1 sampai 114
for i in range(1, 115):
    input_file = f'qurandata/{i}.json'
    output_file = f'qurandataupdate/{i}.json'
    
    print(f"Mencoba memproses file: {input_file}")
    
    # Baca file JSON
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"Berhasil membaca file {input_file}")
    except FileNotFoundError:
        print(f"File tidak ditemukan: {input_file}")
        continue
    except json.JSONDecodeError:
        print(f"Error dalam membaca JSON dari file: {input_file}")
        continue
    
    # Ubah URL audio untuk setiap ayat
    ayat_count = 0
    try:
        for ayat in data['data']['ayat']:
            if '05' in ayat['audio']:
                surah = f"{data['data']['nomor']:03d}"
                ayat_num = f"{ayat['nomorAyat']:03d}"
                ayat['audio']['05'] = f"/api/audioalafasy/{surah}{ayat_num}.mp3"
                ayat_count += 1
    except KeyError as e:
        print(f"Kesalahan struktur JSON dalam file {input_file}: {e}")
        continue
    
    print(f"Jumlah ayat yang diubah dalam {input_file}: {ayat_count}")
    
    # Tulis file JSON yang sudah diubah
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Berhasil menulis file {output_file}")
    except Exception as e:
        print(f"Gagal menulis file {output_file}: {e}")

print("Proses selesai. File-file yang diperbarui tersimpan di folder 'qurandataupdate'.")