function downloadSurahDetail(surah) {
  const tempDiv = document.createElement("div");
  tempDiv.style.width = "1080px";
  tempDiv.style.height = "1920px";
  tempDiv.style.background = "linear-gradient(180deg, #1a1c1e 0%, #26282A 100%)";
  tempDiv.style.color = "white";
  tempDiv.style.fontFamily = "Poppins, sans-serif";
  tempDiv.style.position = "relative";
  tempDiv.style.overflow = "hidden";

  // Simple decorative lines
  const decorLines = document.createElement("div");
  decorLines.style.position = "absolute";
  decorLines.style.top = "0";
  decorLines.style.left = "0";
  decorLines.style.width = "100%";
  decorLines.style.height = "100%";
  decorLines.style.opacity = "0.15";
  decorLines.innerHTML = `
    <div style="position: absolute; top: 20%; left: 10%; width: 200px; height: 2px; background: linear-gradient(90deg, #FFD700, transparent);"></div>
    <div style="position: absolute; top: 80%; right: 10%; width: 250px; height: 2px; background: linear-gradient(90deg, transparent, #FFD700);"></div>
    <div style="position: absolute; top: 50%; left: 5%; width: 100px; height: 2px; background: #87CEEB; transform: rotate(90deg);"></div>
    <div style="position: absolute; top: 50%; right: 5%; width: 100px; height: 2px; background: #87CEEB; transform: rotate(90deg);"></div>
  `;

  const contentWrapper = document.createElement("div");
  contentWrapper.style.position = "absolute";
  contentWrapper.style.top = "50%";
  contentWrapper.style.left = "50%";
  contentWrapper.style.transform = "translate(-50%, -50%)";
  contentWrapper.style.width = "900px";
  contentWrapper.style.textAlign = "center";

  // Nama Surah - BESAR dan mencolok
  const surahName = document.createElement("h1");
  surahName.textContent = `${surah.namaLatin}`;
  surahName.style.fontSize = "90px";
  surahName.style.fontWeight = "900";
  surahName.style.color = "#FFD700";
  surahName.style.marginBottom = "20px";
  surahName.style.textShadow = "0 0 30px rgba(255, 217, 0, 0.6)";
  surahName.style.letterSpacing = "2px";

  // Nama Arab
  const surahArabic = document.createElement("h2");
  surahArabic.textContent = `${surah.nama}`;
  surahArabic.style.fontSize = "56px";
  surahArabic.style.fontWeight = "400";
  surahArabic.style.color = "#FFFFFF";
  surahArabic.style.marginBottom = "60px";
  surahArabic.style.textShadow = "0 2px 10px rgba(0, 0, 0, 0.7)";

  // Garis pembatas simple
  const divider = document.createElement("div");
  divider.style.width = "400px";
  divider.style.height = "4px";
  divider.style.background = "linear-gradient(90deg, transparent, #FFD700, #FFA500, #FFD700, transparent)";
  divider.style.margin = "0 auto 60px auto";
  divider.style.borderRadius = "2px";

  // Info section - layout vertical yang bersih
  const artiSection = document.createElement("div");
  artiSection.style.marginBottom = "50px";
  artiSection.innerHTML = `
    <div style="font-size: 32px; color: #87CEEB; font-weight: 600; margin-bottom: 15px; letter-spacing: 1px;">ARTI</div>
    <div style="font-size: 60px; font-weight: 900; color:rgb(230, 230, 230); text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);">"${surah.arti}"</div>
    
  `;

  const ayatSection = document.createElement("div");
  ayatSection.style.marginBottom = "40px";
  ayatSection.innerHTML = `
    <div style="font-size: 32px; color: #87CEEB; font-weight: 600; margin-bottom: 15px; letter-spacing: 1px;">JUMLAH AYAT</div>
    <div style="font-size: 48px; font-weight: 600; color: #FFFFFF; line-height: 1.3; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);">${surah.jumlahAyat}</div>
  `;

  const tempatSection = document.createElement("div");
  tempatSection.innerHTML = `
    <div style="font-size: 32px; color: #87CEEB; font-weight: 600; margin-bottom: 15px; letter-spacing: 1px;">TEMPAT TURUN</div>
    <div style="font-size: 52px; font-weight: 700; color: #FFFFFF; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);">${surah.tempatTurun}</div>
  `;

  contentWrapper.appendChild(surahName);
  contentWrapper.appendChild(surahArabic);
  contentWrapper.appendChild(divider);
  contentWrapper.appendChild(artiSection);
  contentWrapper.appendChild(ayatSection);
  contentWrapper.appendChild(tempatSection);

  // Arrow yang lebih simple tapi eye-catching
  const arrowContainer = document.createElement("div");
  arrowContainer.style.position = "absolute";
  arrowContainer.style.top = "40px";
  arrowContainer.style.right = "40px";
  arrowContainer.style.display = "flex";
  arrowContainer.style.flexDirection = "column";
  arrowContainer.style.alignItems = "center";

  const arrow = document.createElement("div");
  arrow.innerHTML = "➤";
  arrow.style.fontSize = "64px";
  arrow.style.color = "#FFD700";
  arrow.style.fontWeight = "bold";
  arrow.style.textShadow = "0 0 15px rgba(255, 215, 0, 0.8)";
  arrow.style.animation = "slideArrow 2s ease-in-out infinite";

  const geserText = document.createElement("p");
  geserText.textContent = "GESER";
  geserText.style.fontSize = "24px";
  geserText.style.margin = "10px 0 0 0";
  geserText.style.color = "#FFFFFF";
  geserText.style.fontWeight = "700";
  geserText.style.letterSpacing = "2px";
  geserText.style.textShadow = "0 2px 6px rgba(0, 0, 0, 0.8)";

  arrowContainer.appendChild(arrow);
  arrowContainer.appendChild(geserText);

  // Simple animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideArrow {
      0%, 100% { transform: translateX(0); opacity: 1; }
      50% { transform: translateX(10px); opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);

  tempDiv.appendChild(decorLines);
  tempDiv.appendChild(contentWrapper);
  tempDiv.appendChild(arrowContainer);

  document.body.appendChild(tempDiv);

  html2canvas(tempDiv, {
    width: 1080,
    height: 1920,
    scale: 1,
  }).then((canvas) => {
    document.body.removeChild(tempDiv);
    document.head.removeChild(style);

    const link = document.createElement("a");
    link.download = `${surah.namaLatin}-Detail.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
}