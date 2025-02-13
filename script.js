const rows = 4;
const cols = 4;
const puzzleContainer = document.getElementById("puzzle-container");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const checkButton = document.getElementById("checkButton");
const closeButton = document.getElementById("closeButton");
const nextPageButton = document.getElementById("nextPageButton");

const pinContainer = document.getElementById("pin-container");
const pinDisplay = document.getElementById("pin-display");
const pinButtons = document.querySelectorAll(".pin-btn");
const pinDelete = document.getElementById("pin-delete");
const pinSubmit = document.getElementById("pin-submit");
const pinError = document.getElementById("pin-error");
const pinClue = document.getElementById("pin-clue");

let pieces = [];
let isUnlocked = false;
let attempts = 0;
let enteredPin = "";
const correctPin = "080524";

// Update tampilan PIN
function updatePinDisplay() {
    pinDisplay.textContent = enteredPin.length > 0 ? "•".repeat(enteredPin.length) : "Enter PIN";
}


// Handle klik tombol angka
pinButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (enteredPin.length < 6) {
            enteredPin += button.dataset.num;
            updatePinDisplay();
        }
    });
});

// Handle tombol hapus
pinDelete.addEventListener("click", () => {
    enteredPin = enteredPin.slice(0, -1);
    updatePinDisplay();
});

// Cek PIN sebelum masuk
function checkPin() {
    if (enteredPin === correctPin) {
        pinContainer.style.display = "none";
        isUnlocked = true;
        createPuzzle();
    } else {
        enteredPin = "";
        updatePinDisplay();
        pinError.classList.remove("hidden");
        attempts++;

        if (attempts >= 3) {
            pinClue.classList.remove("hidden");
        }
    }
}

// Tambahkan event listener untuk PIN submit
pinSubmit.addEventListener("click", checkPin);

// Buat puzzle
function createPuzzle() {
    if (!isUnlocked) return;

    pieces = [];
    puzzleContainer.innerHTML = "";

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement("div");
            piece.classList.add("piece");
            piece.style.backgroundImage = "url('puzzle.jpg')";
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            piece.dataset.index = row * cols + col;
            piece.draggable = true;

            piece.addEventListener("dragstart", dragStart);
            piece.addEventListener("dragover", dragOver);
            piece.addEventListener("drop", drop);
            piece.addEventListener("dragend", dragEnd);

            pieces.push(piece);
            puzzleContainer.appendChild(piece);
        }
    }

    shufflePieces();
}

// Acak puzzle
function shufflePieces() {
    pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = "";
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Drag and Drop
let draggedPiece = null;
let targetPiece = null;

function dragStart(event) {
    if (!isUnlocked) return;
    draggedPiece = event.target;
    draggedPiece.classList.add("dragging");
}

function dragOver(event) {
    if (!isUnlocked) return;
    event.preventDefault();
    if (event.target.classList.contains("piece")) {
        event.target.classList.add("hovered");
    }
}

function drop(event) {
    if (!isUnlocked) return;
    event.preventDefault();

    targetPiece = event.target;
    targetPiece.classList.remove("hovered");

    if (targetPiece.classList.contains("piece") && draggedPiece !== targetPiece) {
        let draggedIndex = [...puzzleContainer.children].indexOf(draggedPiece);
        let targetIndex = [...puzzleContainer.children].indexOf(targetPiece);

        // Tukar elemen
        puzzleContainer.insertBefore(draggedPiece, puzzleContainer.children[targetIndex]);
        puzzleContainer.insertBefore(targetPiece, puzzleContainer.children[draggedIndex]);
    }

    draggedPiece.classList.remove("dragging");
}

checkButton.addEventListener("click", () => {
    console.log("Check button clicked!"); // Debugging
    checkWin();
});

function dragEnd(event) {
    event.target.classList.remove("dragging");
}

// Cek apakah puzzle selesai
function checkWin() {
    if (!isUnlocked) return;

    let isCorrect = [...puzzleContainer.children].every((piece, index) => parseInt(piece.dataset.index) === index);

    console.log("CheckWin function called!");
    
    if (isCorrect) {
        console.log("🎉 Puzzle solved!");
        popupMessage.textContent = "🎉 Congrats! You solved it, go to next page!";
        nextPageButton.classList.remove("hidden");
    } else {
        console.log("❌ Puzzle not solved yet!");
        popupMessage.textContent = "❌ Not yet! If you already finish the puzzle, try to change the white piece position        ";
        nextPageButton.classList.add("hidden");
    }

    popup.classList.remove("hidden");
    popup.classList.add("show");
    console.log("Popup should be visible now:", popup.classList);
}

// Tutup pop-up
function closePopup() {
    popup.classList.remove("show");
}

nextPageButton.addEventListener("click", () => {
    window.location.href = "valday.html";
});

checkButton.addEventListener("click", checkWin);
closeButton.addEventListener("click", closePopup);

window.onload = function () {
    pinContainer.classList.remove("hidden");
};
