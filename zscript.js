let intervalId;
let isRunning = false;
let remainingHours = 0;
let remainingMinutes = 0;
let remainingSeconds = 0;

const zamanEkrani = document.getElementById("zaman");
const saatInput = document.getElementById("saatInput");
const dakikaInput = document.getElementById("dakikaInput");
const saniyeInput = document.getElementById("saniyeInput");
const baslatDurdurButonu = document.getElementById("baslatDurdur");
const sifirlaButonu = document.getElementById("sifirla");



function baslatDurdurZamanlayici() {
    if (isRunning) {
        clearInterval(intervalId);
        baslatDurdurButonu.textContent = "Başlat";
        // Geri sayımı göster
        document.getElementById("geri-sayim-kutusu").style.display = "none";
        // Zaman ayarlama kutusunu göster
        document.getElementById("zaman-ayar-kutusu").style.display = "block";
    } else {
        remainingHours = parseInt(saatInput.value) || 0;
        remainingMinutes = parseInt(dakikaInput.value) || 0;
        remainingSeconds = parseInt(saniyeInput.value) || 0;
        
        if (remainingHours > 0 || remainingMinutes > 0 || remainingSeconds > 0) {
            intervalId = setInterval(degerleriGuncelle, 1000);
            baslatDurdurButonu.textContent = "Durdur";
            // Zaman ayarlama kutusunu gizle
            document.getElementById("zaman-ayar-kutusu").style.display = "none";
            // Geri sayım kutusunu göster
            document.getElementById("geri-sayim-kutusu").style.display = "block";
        }
    }
    isRunning = !isRunning;
    saatInput.disabled = isRunning;
    dakikaInput.disabled = isRunning;
    saniyeInput.disabled = isRunning;
}

function sifirlaZamanlayici() {
    clearInterval(intervalId);
    isRunning = false;
    saatInput.value = "";
    dakikaInput.value = "";
    saniyeInput.value = "";
    zamanEkrani.textContent = "00:00:00";
    baslatDurdurButonu.textContent = "Başlat";
    saatInput.disabled = false;
    dakikaInput.disabled = false;
    saniyeInput.disabled = false;
    document.getElementById("geri-sayim-kutusu").style.display = "none";
    document.getElementById("zaman-ayar-kutusu").style.display = "block";
}

// Devam Et düğmesini eklemek için bir fonksiyon
function devamEtGeriSayim() {
    if (!isRunning) {
        intervalId = setInterval(degerleriGuncelle, 1000);
        baslatDurdurButonu.textContent = "Durdur";
        isRunning = true;
    }
}

// Devam Et düğmesini dinlemek için
document.getElementById("devamEtGeriSayim").addEventListener("click", devamEtGeriSayim);

// Durdur düğmesini eklemek için bir fonksiyon
function durdurGeriSayim() {
    if (isRunning) {
        clearInterval(intervalId);
        baslatDurdurButonu.textContent = "Başlat";
        isRunning = false;
    }
}

// Durdur düğmesini dinlemek için
document.getElementById("durdurGeriSayim").addEventListener("click", durdurGeriSayim);

function degerleriGuncelle() {
    if (remainingSeconds > 0 || remainingMinutes > 0 || remainingHours > 0) {
        remainingSeconds--;
        if (remainingSeconds < 0) {
            if (remainingMinutes > 0) {
                remainingSeconds = 59;
                remainingMinutes--;
            } else if (remainingHours > 0) {
                remainingSeconds = 59;
                remainingMinutes = 59;
                remainingHours--;
            }
        }
        zamanEkrani.textContent = formatZaman(remainingHours, remainingMinutes, remainingSeconds);
    } else {
        clearInterval(intervalId);
        isRunning = false;
        baslatDurdurButonu.textContent = "Başlat";
        saatInput.value = "";
        dakikaInput.value = "";
        saniyeInput.value = "";
    }
}

function formatZaman(hours, minutes, seconds) {
    return `${Math.max(hours, 0).toString().padStart(2, '0')}:${Math.max(minutes, 0).toString().padStart(2, '0')}:${Math.max(seconds, 0).toString().padStart(2, '0')}`;
}

baslatDurdurButonu.addEventListener("click", baslatDurdurZamanlayici);
sifirlaButonu.addEventListener("click", sifirlaZamanlayici);

