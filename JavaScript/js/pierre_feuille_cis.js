let playerWinStreak = 0;
let interruptionTimeout;
const comboClasses = ["combo-5", "combo-10", "combo-15", "combo-20", "interrupted"];

document.addEventListener("click", (event) => {
	const button = event.target.closest("button");
	if (!button) return;

	const choiceName = button.dataset.choice || button.textContent.trim();
	const choice = choiceName.toLowerCase();
	const choices = {
		pierre: { name: "Pierre", image: "img/pierre.png" },
		feuille: { name: "Feuille", image: "img/feuille.png" },
		ciseau: { name: "Ciseau", image: "img/ciseau.png" }
	};
	const selected = choices[choice];
	if (!selected) return;

	const image = document.getElementById("player-choice");
	const name = document.getElementById("player-choice-name");
	if (!image || !name) return;

	image.src = button.dataset.image || selected.image;
	image.alt = selected.name;
	name.textContent = selected.name;

	const computerChoice = choices[["pierre", "feuille", "ciseau"][Math.floor(Math.random() * 3)]];
	const computerImage = document.getElementById("computer-choice");
	const computerName = document.getElementById("computer-choice-name");
	if (computerImage && computerName) {
		computerImage.src = computerChoice.image;
		computerImage.alt = computerChoice.name;
		computerName.textContent = computerChoice.name;
	}

	const playerWins =
		(choice === "pierre" && computerChoice.name === "Ciseau") ||
		(choice === "feuille" && computerChoice.name === "Pierre") ||
		(choice === "ciseau" && computerChoice.name === "Feuille");
	const computerWins =
		(computerChoice.name === "Pierre" && choice === "ciseau") ||
		(computerChoice.name === "Feuille" && choice === "pierre") ||
		(computerChoice.name === "Ciseau" && choice === "feuille");

	if (playerWins || computerWins) {
		const score = document.getElementById(playerWins ? "player-score" : "computer-score");
		if (score) score.textContent = String((Number.parseInt(score.textContent, 10) || 0) + 1);
	}

	const combo = document.getElementById("combo");
	if (playerWins) {
		playerWinStreak += 1;
		clearTimeout(interruptionTimeout);
		if (combo) {
			combo.classList.remove(...comboClasses);
			if (playerWinStreak >= 2) {
				combo.textContent = playerWinStreak === 2 ? "COMBO !" : `COMBO X${playerWinStreak} !`;
				const tier = Math.min(Math.floor(playerWinStreak / 5) * 5, 20);
				if (tier) combo.classList.add(`combo-${tier}`);
			} else {
				combo.textContent = "";
			}
		}
	} else if (computerWins) {
		const comboWasInProgress = playerWinStreak >= 2;
		playerWinStreak = 0;
		clearTimeout(interruptionTimeout);
		if (combo) {
			combo.classList.remove(...comboClasses);
			if (comboWasInProgress) {
                combo.classList.add("interrupted");
				combo.textContent = "Interruption !";
				interruptionTimeout = setTimeout(() => {
					combo.textContent = "";
					combo.classList.remove("interrupted");
				}, 2500);
			} else {
				combo.textContent = "";
				combo.classList.remove("interrupted");
			}
		}
	} else {
		playerWinStreak = 0;
		clearTimeout(interruptionTimeout);
		if (combo) {
			combo.classList.remove(...comboClasses);
			combo.textContent = "";
		}
	}
});
