import requests
from bs4 import BeautifulSoup
import time

def get_links(url):
    links = []
    page = 1
    while url:
        print(f"Mengambil link dari halaman {page}...")
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Mengambil link dari card-clickable
        cards = soup.find_all('a', class_='card card-clickable mb-3')
        for card in cards:
            link = card['href']
            links.append(link)
        
        # Mencari link untuk halaman berikutnya
        next_page = soup.find('a', class_='blog-pager-older-link float-end btn btn-sm btn-outline-primary')
        url = next_page['href'] if next_page else None
        
        print(f"Ditemukan {len(cards)} link pada halaman ini.")
        
        # Jeda sebentar untuk menghindari pembatasan akses
        time.sleep(2)
        page += 1
    
    return links

# URL dasar
base_url = "https://www.muslimidia.com/search/label/Kisah%20Nabi"

# Mengambil semua link
all_links = get_links(base_url)

# Menampilkan hasil
print("\nSemua link yang ditemukan:")
for link in all_links:
    print(link)

print(f"\nTotal link yang ditemukan: {len(all_links)}")