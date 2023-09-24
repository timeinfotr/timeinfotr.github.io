document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    themeToggle.addEventListener("click", function() {
        if (body.classList.contains("tema-turuncu")) {
            body.classList.remove("tema-turuncu");
        } else {
            body.classList.add("tema-turuncu");
        }
    });

    let intervalId; // Değişkenlere başlangıç değeri atanmıyor.
    let isRunning = false;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    const zamanEkrani = document.getElementById("zaman");
    const basDurdurButonu = document.getElementById("basDurdur");
    const sifirlaButonu = document.getElementById("sifirla");

    function basDurdurKronometre() {
        if (isRunning) {
            clearInterval(intervalId);
            basDurdurButonu.textContent = "Başlat";
        } else {
            intervalId = setInterval(artirZamani, 1000);
            basDurdurButonu.textContent = "Durdur";
        }
        isRunning = !isRunning;
    }

    function sifirlaKronometre() {
        clearInterval(intervalId);
        isRunning = false;
        seconds = 0;
        minutes = 0;
        hours = 0;
        zamanEkrani.textContent = "00:00:00";
        basDurdurButonu.textContent = "Başlat";
    }

    function artirZamani() {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        zamanEkrani.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    basDurdurButonu.addEventListener("click", basDurdurKronometre);
    sifirlaButonu.addEventListener("click", sifirlaKronometre);
});
