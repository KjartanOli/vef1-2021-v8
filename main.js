// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { show, createButtons, updateResultScreen } from './lib/ui.js';
import { computerPlay, checkGame } from "./lib/rock-paper-scissors.js";
import { el } from "./lib/helpers.js";

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds = 0;

/** Númer umferðar í núverandi umferð */
let currentRound = 0;

/** Sigrar spilara í núverandi leik */
let playerWins = 0;

/** Töp spilara í núverandi leik */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

show("start");

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  // Komumst að því hvað tölva spilaði og athugum stöðu leiks
	const computer = computerPlay();

	const result = checkGame(player, computer);

	if (result != 0) {
		++currentRound;
	}

  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
	switch (result) {
		case -1:
		++computerWins;
			break;
		case 1:
		++playerWins;
	}

  updateResultScreen({
    player,
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil

  // Ákveðum hvaða takka skuli sýna

  // Sýnum niðurstöðuskjá

	const finish = document.querySelector(".finishGame");
	const next = document.querySelector(".nextRound");

	function nextRound() {
		next.removeEventListener("click", nextRound);
		show("play");
		finish.classList.remove("hidden");
	}

	function nextGame() {
		finish.removeEventListener("click", nextGame);
		show("start");
		next.classList.remove("hidden");
		const won = playerWins > computerWins;
		if (won) {
			++totalWins;
		}
		saveResults(won);
		updateStatistics();
		updateGameList(playerWins, computerWins);
		reset();
	}
	if (Math.max(playerWins, computerWins) < (totalRounds / 2)) {
		finish.classList.add("hidden");
		next.addEventListener("click", nextRound);
	}
	else {
		next.classList.add("hidden");
		finish.addEventListener("click", nextGame);
	}
	show("result");
}

function updateStatistics() {
	const gameCounter = document.querySelector(".games__played");
	const winCounter = document.querySelector(".games__wins");
	const winRatio = document.querySelector(".games__winratio");
	const lossCounter = document.querySelector(".games__losses");
	const lossRatio = document.querySelector(".games__lossratio");

	gameCounter.textContent = games.length;
	winCounter.textContent = totalWins;
	winRatio.textContent = (totalWins / games.length).toFixed(2);
	const losses = games.length - totalWins;
	lossCounter.textContent = losses;
	lossRatio.textContent = (losses / games.length).toFixed(2);
}

function updateGameList(player, computer) {
	const gameList = document.querySelector(".games__list");
	gameList.appendChild(el("li", `${(player > computer) ? "Þú vannst" : "Tölva vann"} ${player}–${computer}`));
}

function saveResults(win) {
	games.push({
		player: playerWins,
		computer: computerWins,
		win,
	});

}

function updateWinLog() {

}
function reset() {
totalRounds = 0;
	currentRound = 0;
	playerWins = 0;
	computerWins = 0;
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
	const button = e.target;
	const rounds = Number.parseInt(button.textContent, 10);

	totalRounds = rounds;

	show("play");
}

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));

// Búum til takka
createButtons(MAX_BEST_OF, round);

// Event listeners fyrir skæri, blað, steinn takka
// TODO
document.querySelector(".scissor").addEventListener("click", () => playRound(1));
document.querySelector(".paper").addEventListener("click", () => playRound(2));
document.querySelector(".rock").addEventListener("click", () => playRound(3));


/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  // Bætum við nýjasta leik

  // Uppfærum stöðu

  // Bætum leik við lista af spiluðum leikjum

  // Núllstillum breytur

  // Byrjum nýjan leik!
}

// Næsta umferð og ljúka leik takkar
document.querySelector('button.finishGame').addEventListener('click', finishGame);
// TODO takki sem fer með í næstu umferð
