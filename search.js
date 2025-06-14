const searchInput = document.getElementById('searchInput');
const includeTranslation = document.getElementById('includeTranslation');
const resultsContainer = document.getElementById('results');

let quranData = [];

// Fungsi untuk memuat data Al-Quran
async function loadQuranData() {
    for (let i = 1; i <= 114; i++) {
        try {
            const response = await fetch(`api/qurandata/${i}.json`);
            const data = await response.json();
            quranData.push(data.data);
        } catch (error) {
            console.error(`Error loading surah ${i}:`, error);
        }
    }
}

// Fungsi untuk mencari kata kunci dalam Al-Quran
function searchQuran(keyword) {
    const results = [];
    const keywordRegex = new RegExp(keyword, 'i');

    quranData.forEach(surah => {
        surah.ayat.forEach(ayat => {
            if (keywordRegex.test(ayat.teksLatin) || 
                (includeTranslation.checked && keywordRegex.test(ayat.teksIndonesia))) {
                results.push({
                    surah: surah.namaLatin,
                    nomorSurah: surah.nomor,
                    nomorAyat: ayat.nomorAyat,
                    teksArab: ayat.teksArab,
                    teksLatin: ayat.teksLatin,
                    teksIndonesia: ayat.teksIndonesia
                });
            }
        });
    });

    return results;
}

// Fungsi untuk meng-highlight teks yang cocok
function highlightText(text, keyword) {
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
}

// Fungsi untuk menampilkan hasil pencarian
function displayResults(results, keyword) {
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center text-gray-600">Tidak ada hasil yang ditemukan.</p>';
        return;
    }

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'bg-white p-4 rounded-lg shadow mb-4';
        resultElement.innerHTML = `
            <h2 class="text-xl font-semibold text-green-600">${result.surah} (${result.nomorSurah}:${result.nomorAyat})</h2>
            <p class="text-right text-2xl my-2">${result.teksArab}</p>
            <p class="text-gray-700 italic">${highlightText(result.teksLatin, keyword)}</p>
            <p class="text-gray-600 mt-2">${highlightText(result.teksIndonesia, keyword)}</p>
        `;
        resultsContainer.appendChild(resultElement);
    });
}

// Event listener untuk input pencarian
searchInput.addEventListener('input', debounce(() => {
    const keyword = searchInput.value.trim();
    if (keyword.length > 1) {
        const results = searchQuran(keyword);
        displayResults(results, keyword);
    } else {
        resultsContainer.innerHTML = '';
    }
}, 300));

// Event listener untuk checkbox
includeTranslation.addEventListener('change', () => {
    const keyword = searchInput.value.trim();
    if (keyword.length > 1) {
        const results = searchQuran(keyword);
        displayResults(results, keyword);
    }
});

// Fungsi debounce untuk mengurangi frekuensi pencarian
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Memuat data Al-Quran saat halaman dimuat
loadQuranData();