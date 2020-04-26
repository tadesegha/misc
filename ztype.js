/*
	This plays the typing game on the site https://zty.pe/
	Start a new game then copy these functions into the console window.
*/
const playComputerLike = () => {
	const scan = async () => {
		let entities = ig.game.entities.filter(entity => entity.word && !entity.dead);

		if (!entities.length) {
			setTimeout(scan);
			return;
		}

		entities.forEach(entity => {
			let word = entity.word;
			while (word) {
				ig.game.shoot(word[0]);
				word = word.slice(1);
			}
		});

		setTimeout(scan);
	}
	scan();
}

const playHumanLike = () => {
	let waitTime = 20;
	const scan = async () => {
		let entity = ig.game.entities
			.filter(entity => entity.word && !entity.dead)
			.sort((a, b) => a.pos.y - b.pos.y)
			.pop();

		if (!entity) {
			setTimeout(scan, waitTime);
			return;
		}

		let word = entity.word;
		while (word) {
			ig.game.shoot(word[0]);
			await wait();

			word = word.slice(1);
			if (!word) setTimeout(scan);
		}
	}

	const wait = () => new Promise(resolve => { setTimeout(resolve, waitTime); })
	scan();
}
