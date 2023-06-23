/*----------- Game State Data ----------*/

const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

// DOM references
const cells = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll("p");
let blacksPieces = document.querySelectorAll("span")
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurntext = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider")

// player properties
let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;

// selected piece properties
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

/*---------- Event Listeners ----------*/

// initialize event listeners on pieces
function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", event => {getPlayerPieces(event)});
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", event => {getPlayerPieces(event)});
        }
    }
}

/*---------- Logic ----------*/

// holds the length of the players piece count
function getPlayerPieces(event) {
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removeCellonclick();
    resetBorders(event);
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// resets borders to default
function resetBorders(event) {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece(event);
}

// resets selected piece properties
function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}


// gets ID and index of the board cell its on
function getSelectedPiece(event) {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

// parses pieceId's and returns the index of that piece's place on the board
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

givePiecesEventListeners();