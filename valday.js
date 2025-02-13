document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.querySelector(".envelope");
    const letterText = document.getElementById("letterText");
    const openLetterButton = document.getElementById("openLetter");
    const audioButton = document.getElementById("audioButton");
    const audioIcon = document.getElementById("audioIcon");
    const audio = document.getElementById("valentineAudio");

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

    // EVENT BUKA / TUTUP SURAT
    openLetterButton.addEventListener("click", function () {
        envelope.classList.toggle("open");

        if (envelope.classList.contains("open")) {
            openLetterButton.innerHTML = "Close ✉️";
            setTimeout(typeWriter, 500);
        } else {
            openLetterButton.innerHTML = "Open 💌";
            letterText.innerHTML = "";
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
});
