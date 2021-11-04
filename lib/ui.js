import { el } from "./helpers.js";
import { playAsText } from "./rock-paper-scissors.js";


/**
 * Býr til takka fyrir umferðir, festir `onClick` við og bætir
 * við `.rounds__buttons`.
 *
 * @param {number} max Hámark umferða
 * @param {function} onClick Fall sem keyra skal þegar ýtt er á takka
 */
export function createButtons(max, onClick) {
  let container = document.querySelector(".rounds__buttons");

	for (let i = 1; i < max; i += 2) {
		const button = el("button", i.toString());
		button.addEventListener("click", onClick);
		button.classList.add("rounds__buttons");
		button.classList.add("button");
		container.appendChild(button);
	}
}

export function show(part) {
  // TODO klára að útfæra fyrir allar stöður

  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start = document.querySelector('.start');
  const rounds = document.querySelector('.rounds');
	const play = document.querySelector('.play');
	const result = document.querySelector('.result');

  // Felum allt
  start.classList.add('hidden');
  rounds.classList.add('hidden');
	play.classList.add('hidden');
	result.classList.add('hidden');

  // og sýnum það sem beðið er um
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
	case "play":
		play.classList.remove("hidden");
		break;
	case "result":
		result.classList.remove("hidden");
		break;
  default:
      console.warn(`${part} óþekkt`);
  }
}

/**
 * @typedef {Object} Results
 * @property {string} player Það sem spilari spilaði
 * @property {string} computer Það sem tölva spilaði
 * @property {number} result Útkoma úr leik, `-1`, `0`, eða `1`
 * @property {number} currentRound Núverandi umferð
 * @property {number} totalRounds Heildarfjöldi umferð
 * @property {number} playerWins Sigrar spilara í umferð
 * @property {number} computerWins Sigrar tölvu í umferð
 */

/**
 * Uppfærir öll gildi stöðu skjás innan `.result` áður en sýndur.
 * @param {Results} r Gildi fyrir skjá
 */
export function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
  const resultPlayer = document.querySelector('.result__player');
	const resultComputer = document.querySelector(".result__computer");
	const resultResult = document.querySelector(".result__result");
	const resultStatus = document.querySelector(".result__status");

	const resultCurrentRound = document.querySelector(".result__currentRound");
	const resultTotalRounds = document.querySelector(".result__totalRounds");

  resultPlayer.textContent = `${playAsText(player)}`;
	resultComputer.textContent = `${playAsText(computer)}`;

	let resultString;
	switch (result) {
	case -1:
		resultString = "Tölva vinur";
		break;
	case 0:
		resultString = "Jafntefli";
		break;
	case 1:
		resultString = "Þú vinnur";
		break;
	}
	resultResult.textContent = `${resultString}`;
	resultStatus.textContent = `Staðan er: ${playerWins}–${computerWins}`;

	resultCurrentRound.textContent = currentRound;
	resultTotalRounds.textContent = totalRounds;
}
