const squares = document.querySelectorAll(".grid-square .content");
const headerParagraph = document.querySelector("header p");
const playerIndicators = document.querySelectorAll(".player-indicator");

let roundsLeft = 9;

const players = {
	cross: new Array(9),
	circle: new Array(9),
};
let currentPlayer = "cross";

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
];

function toggleCurrentPlayer() {
	document.querySelector(`.${currentPlayer}`).classList.remove("highlight");
	if (currentPlayer === "cross") {
		currentPlayer = "circle";
	} else {
		currentPlayer = "cross";
	}
	document.querySelector(`.${currentPlayer}`).classList.add("highlight");
}

function gameOver() {
	playerIndicators.forEach((playerIndicator) =>
		playerIndicator.classList.remove("highlight")
	);
	headerParagraph.classList.remove("hide");
	squares.forEach((square) => square.classList.add("inactive"));
}

function playerHasWon() {
	// winCombos.forEach((winCombo) => {
	// 	let sum = 0;
	// 	winCombo.forEach((i) => (sum += players[currentPlayer][i]));
	// 	if (sum === 3) {
	// 		console.log("Går in i if-satsen");
	// 		return true;
	// 	}
	// });
	for (const winCombo of winCombos) {
		let sum = 0;
		for (const i of winCombo) {
			sum += players[currentPlayer][i];
			if (sum === 3) {
				return true;
			}
		}
	}
	return false;
}

squares.forEach((square) => {
	const chosenSquareImg = document.querySelector(`#${square.id} img`);
	square.addEventListener("click", () => {
		chosenSquareImg.setAttribute("src", `./${currentPlayer}.svg`);
		square.classList.add("chosen-square");
		players[currentPlayer][square.id.substring(6)] = 1;
		roundsLeft--;
		if (playerHasWon()) {
			const winningPlayer =
				currentPlayer[0].toUpperCase() + currentPlayer.slice(1);
			headerParagraph.prepend(`${winningPlayer} won - `);
			gameOver();
		} else if (roundsLeft === 0) {
			headerParagraph.prepend("It's a tie - ");
			gameOver();
		} else {
			toggleCurrentPlayer();
		}
	});
});
