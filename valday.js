document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.querySelector(".envelope");
    const letterText = document.getElementById("letterText");
    const openLetterButton = document.getElementById("openLetter");
    const audioButton = document.getElementById("audioButton");
    const audioIcon = document.getElementById("audioIcon");
    const audio = document.getElementById("valentineAudio");

    let heartInterval; // Variabel untuk animasi hati

    // TEKS UNTUK SURAT
    const text = [
        "Dear Syafira,",
        "Happy Valentine's Day! 💖",
        "You are loved and cherished, today and always! I hope this day brings you happiness and warmth. You are an incredible person, and I appreciate you so much.",
        "Anyway congrats ya udah keterima jadi PNS, sebentar lagi jadi anak kantoran ye, semoga dapet tempat yang nyaman, jadi enak ngejalaninnya. Makasih ya udah mau ngejalanin hubungan ini selama kurang lebih 1 tahun sekarang, semoga makin banyak hal-hal positif yang kita dapet dari hubungan ini kedepannya. See you on February 22.",
        "With love,",
        "Er "
    ];

    // ANIMASI KETIK
    function typeWriter() {
        letterText.innerHTML = "";
        let lineIndex = 0;

        function typeLine() {
            if (lineIndex < text.length) {
                let line = text[lineIndex];
                let charIndex = 0;
                let newParagraph = document.createElement("p");

                letterText.appendChild(newParagraph);

                function typeCharacter() {
                    if (charIndex < line.length) {
                        newParagraph.innerHTML += line.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeCharacter, 50);
                    } else {
                        lineIndex++;
                        setTimeout(typeLine, 300);
                    }
                }

                typeCharacter();
            }
        }

        typeLine();
    }

    // ANIMASI HATI KIRI & KANAN BERKELANJUTAN
    function startHeartAnimation() {
        stopHeartAnimation(); // Pastikan tidak ada interval ganda

        heartInterval = setInterval(() => {
            const heartCount = Math.floor(Math.random() * 3) + 1; // 1-3 hati per spawn
            
            for (let i = 0; i < heartCount; i++) {
                createHeart("left");
                createHeart("right");
            }
        }, 400); // Hati muncul setiap 0.4 detik
    }

    function stopHeartAnimation() {
        clearInterval(heartInterval);
    }

    function createHeart(position) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";

        if (position === "left") {
            heart.style.left = `${Math.random() * 25}%`; // Lebih lebar di kiri
        } else {
            heart.style.left = `${75 + Math.random() * 25}%`; // Lebih lebar di kanan
        }

        heart.style.animationDuration = `${3 + Math.random() * 2}s`; // 3 - 5 detik jatuh
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // EVENT BUKA / TUTUP SURAT
    openLetterButton.addEventListener("click", function () {
        envelope.classList.toggle("open");

        if (envelope.classList.contains("open")) {
            openLetterButton.innerHTML = "Close ✉️";
            setTimeout(typeWriter, 500);
            startHeartAnimation();
        } else {
            openLetterButton.innerHTML = "Open 💌";
            letterText.innerHTML = "";
            stopHeartAnimation();
        }
    });

    // PLAY/PAUSE AUDIO
    audioButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            audioIcon.textContent = "⏸️";
        } else {
            audio.pause();
            audioIcon.textContent = "🎵";
        }
    });
    const leftQuote = document.querySelector(".left-quote");
    const rightQuote = document.querySelector(".right-quote");
    
    const quotes = [
        "You are my today and all of my tomorrows. Happy Valentine's Day!",
        "Every day with you is a blessing. Happy Valentine's Day!",
        "Miles apart but close at heart. Happy Valentine's Day, my love!",
        "Whatever souls are made of, yours and mine are the same. – Emily Brontë",
        "No words are enough to express how much you mean to me.",
        "My heart is forever yours. Today, tomorrow, and always."
    ];
    
    function changeQuotes() {
        let randomIndex1 = Math.floor(Math.random() * quotes.length);
        let randomIndex2;
    
        do {
            randomIndex2 = Math.floor(Math.random() * quotes.length);
        } while (randomIndex2 === randomIndex1);
    
        // Hapus efek fade-in sebelum mengubah teks
        leftQuote.style.animation = "none";
        rightQuote.style.animation = "none";
    
        setTimeout(() => {
            leftQuote.textContent = quotes[randomIndex1];
            rightQuote.textContent = quotes[randomIndex2];
    
            // Tambahkan animasi fade-in
            leftQuote.style.animation = "fadeInOut 5s ease-in-out";
            rightQuote.style.animation = "fadeInOut 5s ease-in-out";
        }, 500); // Tunggu sebentar sebelum mengganti teks
    }
    
    // Jalankan pertama kali dan perbarui setiap 5 detik
    setInterval(changeQuotes, 5000);
    changeQuotes();
    
    
    
});
