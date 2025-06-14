const API_URL = 'api/qurandata/';
let quranData = [];

async function fetchQuranData() {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');

    for (let i = 1; i <= 114; i++) {
        try {
            const response = await fetch(`${API_URL}${i}.json`);
            const data = await response.json();
            quranData.push(data.data);
        } catch (error) {
            console.error(`Error fetching data for surah ${i}:`, error);
        }
    }

    loading.classList.add('hidden');
}

function searchQuran(query) {
    if (query.length < 3) return;

    const results = quranData.flatMap(surah => 
        surah.ayat.filter(ayat => 
            ayat.teksIndonesia.toLowerCase().includes(query.toLowerCase()) ||
            ayat.teksLatin.toLowerCase().includes(query.toLowerCase())
        ).map(ayat => ({ surah, ayat }))
    );

    displayResults(results, query);
}

function displayResults(results, query) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center text-gray-500">Tidak ada hasil ditemukan.</p>';
        return;
    }

    results.forEach(({ surah, ayat }) => {
        const ayatElement = document.createElement('div');
        ayatElement.className = 'bg-white p-6 rounded-lg shadow-md';
        
        const highlightedIndonesia = highlightText(ayat.teksIndonesia, query);
        const highlightedLatin = highlightText(ayat.teksLatin, query);

        ayatElement.innerHTML = `
            <h2 class="text-xl font-bold text-green-600 mb-2">${surah.namaLatin} (${surah.nama}) - Ayat ${ayat.nomorAyat}</h2>
            <p class="text-right text-2xl my-3 font-arabic">${ayat.teksArab}</p>
            <p class="italic mb-2">${highlightedLatin}</p>
            <p class="mb-4">${highlightedIndonesia}</p>
            <audio controls class="w-full">
                <source src="${ayat.audio['01']}" type="audio/mpeg">
            </audio>
        `;
        resultsContainer.appendChild(ayatElement);
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
}

let debounceTimer;
document.addEventListener('DOMContentLoaded', async () => {
    await fetchQuranData();
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchQuran(e.target.value);
        }, 300);
    });
});