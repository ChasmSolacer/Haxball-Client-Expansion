/*
* Description: This script observes the Flashscore commentary section. When a comment appears, it gets printed to Haxball chat.
*
* This will only work in Chromium based browsers (Chrome, Edge, Brave) with flags enabled, otherwise CORS problems will occur!
* Source: https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome#comment124721890_3177718
*
* Steps for Windows:
* Close all Chromium instances.
* Make a new folder inside C: and name it ChromeDev (or whatever but make sure to replace the C://ChromeDev part later).
* Make a shortcut of the browser exe file, open its Properties → Shortcut and paste the following at the bottom of the text field (between quotes, without quotes):
* " --disable-web-security --disable-site-isolation-trials --disable-features=IsolateOrigins,site-per-process --user-data-dir="C://ChromeDev"
* Apply and OK.
* Open the shortcut and go to https://www.haxball.com/play.
* Disable ad blockers and/or Brave Shield for this site.
* Paste this script to the console.
*
* After that a flashscore overlay will appear. Don't click anything on it,
* you can just press "Alt + ;" to hide it (click outside the overlay first).
*
* If you are in a room, a comment will be sent in the chat as soon as it appears in Flashscore commentary section.
*
* If you want to load a match, call loadFlashscoreMatchCommentary function. Scroll to bottom of this file for an example.
*/

// Modified game-min.js g object. Not necessary in this script.
let g = window.g;

// Important settings
const FlashscoreSettings = {
	// Current language
	language: '',
	// Team 1 abbreviation
	team1Code: '',
	// Team 2 abbreviation
	team2Code: '',
	// Match ID from the commentary url
	matchId: '',
	// fDiv opacity
	overlayOpacity: '0.8'
};

// Translatable objects
const Str = {
	COMMENTARY_LINK1: {
		pl: 'https://www.flashscore.pl/mecz/',
		en: 'https://www.flashscore.com/match/',
		es: 'https://www.flashscore.es/partido/',
		de: 'https://www.flashscore.de/spiel/',
		it: 'https://www.flashscore.it/partita/',
		fr: 'https://www.flashscore.fr/match/',
		pt: 'https://www.flashscore.pt/jogo/',
		tr: 'https://www.flashscore.com.tr/mac/',
		uk: 'https://www.flashscore.ua/match/',
		dk: 'https://www.flashscore.dk/kamp/',
		nl: 'https://www.flashscore.nl/wedstrijd/',
		sv: 'https://www.flashscore.se/match/',
		sk: 'https://www.flashscore.sk/zapas/',
		sl: 'https://www.flashscore.si/tekma/',
		hr: 'https://www.rezultati.com/utakmica/',
		fi: 'https://www.flashscore.fi/ottelu/'
	},
	COMMENTARY_LINK2: {
		pl: '/#/szczegoly-meczu/komentarz-live/0',
		en: '/#/match-summary/live-commentary/0',
		es: '/#/resumen-del-partido/comentarios-en-directo/0',
		de: '/#/spiel-zusammenfassung/live-kommentar/0',
		it: '/#/informazioni-partita/cronaca-live/0',
		fr: '/#/resume-du-match/match-en-direct/0',
		pt: '/#/sumario-do-jogo/comentarios-ao-vivo/0',
		tr: '/#/mac-ozeti/canli-yorum/0',
		uk: '/#/match-summary/live-commentary/0',
		dk: '/#/kampreferat/live-kommentarer/0',
		nl: '/#/samenvatting-wedstrijd/live-commentaar/0',
		sv: '/#/matchsummering/livereferat/0',
		sk: '/#/prehlad-zapasu/live-komentar/0',
		sl: '/#/povzetek-dogodka/komentarji-v-zivo/0',
		hr: '/#/detalji/uzivo-komentar/0',
		fi: '/#/ottelun-yhteenveto/live-kommentit/0'
	},
	PRESS_TO_SHOW_HIDE: {
		pl: 'Naciśnij Alt + ; aby pokazać/ukryć nakładkę',
		en: 'Press Alt + ; to show/hide overlay'
	},
	UPDATE: {
		pl: 'AKTUALIZACJA',
		en: 'UPDATE'
	},
	FINISHED: {
		pl: 'KONIEC',
		en: 'FINISHED',
		es: 'FINALIZADO',
		de: 'BEENDET',
		it: 'FINALE',
		fr: 'TERMINÉ',
		pt: 'TERMINADO',
		tr: 'BİTTİ',
		uk: 'ЗАВЕРШЕНО',
		dk: 'SLUT',
		nl: 'BEËINDIGD',
		sv: 'AVSLUTAD',
		sk: 'KONIEC',
		sl: 'KONČANA',
		hr: 'KRAJ',
		fi: 'LOPPUTULOS'
	}
};

// Translate the translatable object into specified language (or English if no such language)
const translate = (translatableObject, language = FlashscoreSettings.language) => translatableObject[language] || translatableObject['en'];

const getCommentaryLink = (matchId = FlashscoreSettings.matchId, language = FlashscoreSettings.language) =>
	translate(Str.COMMENTARY_LINK1, language) + matchId + translate(Str.COMMENTARY_LINK2, language);

// Overlay – div which will contain the flashscore iFrame.
// It is draggable followed by the orange area, show and hide it by pressing Alt + ;
const fDivOverlay = document.createElement('div');
fDivOverlay.style.position = 'absolute';
fDivOverlay.style.float = 'left';
fDivOverlay.style.padding = '8px';
fDivOverlay.style.paddingTop = '16px';
fDivOverlay.style.opacity = FlashscoreSettings.overlayOpacity;
fDivOverlay.style.textAlign = 'center';
fDivOverlay.style.backgroundColor = '#f84';
fDivOverlay.style.border = '3px solid #F04';
fDivOverlay.style.zIndex = '9';
fDivOverlay.style.cursor = 'move';
// Some info
const infoSpan = document.createElement('span');
infoSpan.innerText = translate(Str.PRESS_TO_SHOW_HIDE);
infoSpan.style.display = 'block';
infoSpan.style.color = 'black';
infoSpan.style.fontWeight = '900';
infoSpan.style.fontSize = '1.3em';
infoSpan.style.maxWidth = '400px';
// Add span to div
fDivOverlay.appendChild(infoSpan);
// Flashscore iframe which will be placed inside the div
const flashscoreFrame = document.createElement('iframe');
// Add div to haxball
document.body.appendChild(fDivOverlay);
// Add iframe to div
fDivOverlay.appendChild(flashscoreFrame);

// Commentary section element
let fCommentsSection;
// Observer interval
let fCommentsObserverInterval;
// Previous number of comments
let previousRowCount = 0;
// Comments array. The latest is at index 0
let lastCommentsQueue = [];
// Match finished flag
let endPending = false;

// Options for the observer (which mutations to observe)
//let config = {attributes: true, childList: true, subtree: true};

/**
 * This function loads a flashscore commentary page within the flashscoreFrame.
 * It can be called at any time.
 *
 * @param {string} matchId Match identifier can be found inside the URL, in the middle of it.
 * An English link is always composed of: "https://www.flashscore.com/match/" + matchId + "/#/match-summary/live-commentary/0".
 * @param {string} team1Code A short home team abbreviation that is usually seen on a score bug.
 * @param {string} team2Code A short away team abbreviation that is usually seen on a score bug.
 * @param {string} language Language code ("pl" or "en").
 * @param {string} width iFrame css width.
 * @param {string} height iFrame css height.
 */
function loadFlashscoreMatchCommentary(matchId, team1Code = '', team2Code = '', language = 'pl', width = '560px', height = '600px') {
	if (!(matchId?.length > 0)) {
		console.error('Oh no! You forgot to specify the match ID');
		return;
	}
	// Stop the observer
	stop();

	FlashscoreSettings.matchId = matchId;
	FlashscoreSettings.team1Code = team1Code;
	FlashscoreSettings.team2Code = team2Code;
	FlashscoreSettings.language = language;
	flashscoreFrame.onload = null;
	flashscoreFrame.className = 'flashscoreframe';
	flashscoreFrame.style.display = 'block';
	flashscoreFrame.style.marginTop = '16px';
	flashscoreFrame.src = getCommentaryLink();
	flashscoreFrame.width = width;
	flashscoreFrame.height = height;
	infoSpan.style.maxWidth = width;
	infoSpan.innerText = translate(Str.PRESS_TO_SHOW_HIDE);
	// When the flashscore page is loaded
	flashscoreFrame.onload = ev => {
		console.log('Flashscore frame loaded');

		// Wait 3 seconds for the comments section to load (should be sufficient)
		setTimeout(() => {
			console.log('Flashscore comment section loaded');
			// Empty last comments queue
			lastCommentsQueue = [];
			// Flashscore comments section element
			fCommentsSection = flashscoreFrame.contentDocument.querySelector('#detail > .section');

			/*
			const soccerRows = Array.from(fCommentsSection.querySelectorAll('.soccer__row'));

			if (soccerRows?.length > 0) {
				// Top row containing minute, icons and comment
				const topSoccerRow = soccerRows[0];
				// Add the comment text at the beginning of the last comments queue
				lastCommentsQueue.unshift(getCommentFromSoccerRow(topSoccerRow));
				// The final comment from top row that will appear in the Haxball chat
				let botComment = getBotCommentFromSoccerRow(topSoccerRow);

				// Print the whole comment to the console
				console.log(botComment);

			}
			*/
			//let soccerRowsToText = soccerRows.map(row => getTextFromRow(row));
			//console.debug(soccerRowsToText);

			// Start a new observer
			restart();
		}, 3000);
	};
}

// Extracts a comment text from soccer row
function getCommentFromSoccerRow(row) {
	return row?.querySelector('.soccer__comment')?.innerText?.trim() || '';
}

function getBotCommentFromSoccerRow(row) {
	if (row == null || flashscoreFrame == null)
		return null;

	const minuteText = row.querySelector('.soccer__time')?.innerText?.trim() || '';
	const goalScoreText = row.querySelector('.soccer__score')?.innerText?.trim() || '';
	let iconEmoji = '';
	if (row.querySelector('.var') != null)
		iconEmoji = '🖥️ ';
	else if (row.querySelector('.stopwatch') != null)
		iconEmoji = '⏱️ ';
	else if (row.querySelector('.substitution') != null)
		iconEmoji = '🔄 ';
	else if (row.querySelector('.corner-ico') != null)
		iconEmoji = '🚩 ';
	else if (row.querySelector('.headphones-ico') != null)
		iconEmoji = 'ℹ️ ';
	else if (row.querySelector('.injury') != null)
		iconEmoji = '🩹 ';
	else if (row.querySelector('.whistle-ico') != null)
		iconEmoji = '';
	else if (row.querySelector('.warning') != null)
		iconEmoji = '⚠️ ';
	else if (row.querySelector('.redCard-ico') != null)
		iconEmoji = '🟥 ';
	else if (row.querySelector('.yellowCard-ico') != null)
		iconEmoji = '🟨 ';
	else if (row.querySelector('.card-ico') != null)
		iconEmoji = '🟥 ';
	else if (goalScoreText.length === 0 && row.querySelector('svg.soccer') != null)
		iconEmoji = '⚽ ';

	let goalText = '';
	if (goalScoreText)
		goalText = ' ⚽ ' + goalScoreText + ' ⚽ ';

	let commentText = getCommentFromSoccerRow(row);
	// Polska pisownia nazwisk z alfabetów niełacińskich
	if (FlashscoreSettings.language === 'pl') {
		commentText = spolszczNazwiska(commentText);
	}

	// Two-element score array
	const scores = Array.from(flashscoreFrame.contentDocument.querySelectorAll('.detailScore__wrapper > span:not(.detailScore__divider)')).map(e => e.innerText);
	const scoreHome = scores[0] || '';
	const scoreAway = scores[1] || '';
	// This will precede every chat message
	const prefix = '[' + FlashscoreSettings.team1Code + ' ' + scoreHome + ':' + scoreAway + ' ' + FlashscoreSettings.team2Code + '] ';
	return prefix + minuteText + ' ' + iconEmoji + goalText + commentText;
}

function getSlicedHaxballText(text, maxFragmentLength = 140) {
	/* In Haxball it's possible to send message up to 140 characters, so it must be split.
			 Usual flashscore comments are 2 Haxball lines long. */
	// Array containing sliced text fragments
	const slicedTextArr = [];
	// While generated sentence is too long
	while (text.length > maxFragmentLength) {
		// Get last space index that is as close to max fragment length as possible
		const sliceIndex1 = text.lastIndexOf(' ', maxFragmentLength);
		// Cut the sentence to last space index
		const ksPart = text.substring(0, sliceIndex1);
		// Add the resulting sentence part to the array
		slicedTextArr.push(ksPart);
		// Process the next sentence part
		text = text.substring(sliceIndex1 + 1);
	}
	// Push the remaining sentence part
	slicedTextArr.push(text);
	return slicedTextArr;
}

// Function to send chat, no matter if the modified game-min.js is present or not
function sendChat_s(message) {
	// If modified game-min.js is loaded
	if (g?.getRoomManager != null && g.getRoomManager().sendChat != null)
		g.getRoomManager().sendChat(message);
	// Legacy
	else {
		const iframeBody = document.querySelector('iframe').contentDocument.body;
		const inputElement = iframeBody.querySelector('[data-hook="input"]');
		// If chat elements were found
		if (inputElement != null) {
			const prevText = inputElement.value;
			inputElement.value = message;
			// Press Enter
			inputElement.dispatchEvent(new KeyboardEvent('keydown', {'keyCode': 13}));
			inputElement.value = prevText;
		}
	}
}

function sendTextArrayToChat(textArray) {
	// For each text fragment, send it to chat
	textArray.forEach(text => {
		//console.debug(text);
		sendChat_s(text);
	});
}

// Callback function to execute when mutations are observed.
// If you want to modify this function at runtime, modify it, paste it to console and call restart() to reload the observer
let fCommentsCallback = () => {
	fCommentsSection = flashscoreFrame.contentDocument.querySelector('#detail > .section');
	// Soccer rows array
	const soccerRows = Array.from(fCommentsSection.querySelectorAll('.soccer__row'));
	// If there are soccer rows
	if (soccerRows.length > 0) {
		const rowCount = soccerRows.length;
		// Top row containing minute, icons and comment
		const topSoccerRow = soccerRows[0];
		// Second top soccer row
		const secondSoccerRow = soccerRows[1];
		// Top row converted to text
		let commentFromTopSoccerRow = getCommentFromSoccerRow(topSoccerRow);
		// Second top row converted to text
		let commentFromSecondSoccerRow = getCommentFromSoccerRow(secondSoccerRow);

		let triggeringRow = topSoccerRow;

		// If a comment row was only updated
		let isUpdate = rowCount === previousRowCount;

		// Reducing some spam.
		// If the top comment is the same as one of the last three written comments
		if (lastCommentsQueue.length > 0 && (
			commentFromTopSoccerRow === lastCommentsQueue[0] ||
			commentFromTopSoccerRow === lastCommentsQueue[1] ||
			commentFromTopSoccerRow === lastCommentsQueue[2]
		)) {
			// Don't write the same comment for the second time
			console.debug('Top comment was already written before');
			// If lastCommentsQueue has max 1 comment OR if the second top comment is the same as the second or third last written comment
			if (lastCommentsQueue.length < 2 || (
				commentFromSecondSoccerRow === lastCommentsQueue[1] ||
				commentFromSecondSoccerRow === lastCommentsQueue[2]
			)) {
				// Nothing has really changed, don't write anything this time
				console.debug('Second top comment was already written too');
				return;
			}
			// If the second top comment contents changed
			else {
				isUpdate = true;
				console.debug('But the second top comment is different');
				// Add the comment text at the second place of the last comments queue
				const lastComment = lastCommentsQueue.shift();
				lastCommentsQueue.unshift(commentFromSecondSoccerRow);
				lastCommentsQueue.unshift(lastComment);
				// Print the second row
				triggeringRow = secondSoccerRow;
			}
		}
		// If the top comment is different
		else {
			console.debug('Top comment is different');
			triggeringRow = topSoccerRow;
			// Add the comment text at the beginning of the last comments queue
			lastCommentsQueue.unshift(commentFromTopSoccerRow);
		}

		// The final comment that will appear in the Haxball chat
		let botComment = getBotCommentFromSoccerRow(triggeringRow);
		// Mark an update
		if (isUpdate)
			botComment = '[' + translate(Str.UPDATE) + '] ' + botComment;

		// Split the bot comment to fit in the chat
		const botCommentFragments = getSlicedHaxballText(botComment);

		// Print the whole comment to the console
		console.log(botComment);

		// For each bot comment fragment, send it to chat
		sendTextArrayToChat(botCommentFragments);

		previousRowCount = soccerRows.length;
	}
	else {
		console.debug('No soccer rows found');
	}

	// Score status element
	const scoreStatusText = flashscoreFrame.contentDocument.querySelector('.fixedHeaderDuel__detailStatus')?.innerText?.toUpperCase();

	// If the match has ended
	if (scoreStatusText === translate(Str.FINISHED) && !endPending) {
		setTimeout(() => {
			console.log('Match has ended. Stopping.');
			const teamNames = Array.from(flashscoreFrame.contentDocument.querySelectorAll('div.participant__participantName')).map(e => e.innerText);
			const scores = Array.from(flashscoreFrame.contentDocument.querySelectorAll('.detailScore__wrapper > span:not(.detailScore__divider)')).map(e => e.innerText);
			// Display match results
			sendTextArrayToChat([scoreStatusText + '! ' + teamNames[0] + ' ' + scores[0] + ':' + scores[1] + ' ' + teamNames[1]]);
			// Stop observing
			stop();
		}, 2500);
		endPending = true;
	}
};

// Start observing the target node for configured mutations
start = () => {
	if (fCommentsSection != null) {
		//fCommentsObserverInterval = new MutationObserver(fCommentsCallback);
		//fCommentsObserverInterval.observe(fCommentsSection, config);
		fCommentsObserverInterval = setInterval(fCommentsCallback, 2000);
		console.log('Started observing flashscore commentary section');
	}
	else
		console.error('Flashscore commentary section NOT FOUND!');
};

// Later, you can stop observing
stop = () => {
	//fCommentsObserverInterval.disconnect();
	clearInterval(fCommentsObserverInterval);
	console.log('Stopped observing flashscore commentary section');
};

restart = () => {
	stop();
	start();
};

// KEY EVENTS
document.querySelector('iframe').contentDocument.body.addEventListener('keydown', event => {
	const keyName = event.key;

	// If Alt key is also pressed
	if (event.altKey) {
		switch (keyName) {
			case ';':
				// Show or hide the overlay
				if (fDivOverlay != null)
					fDivOverlay.hidden = !fDivOverlay.hidden;
				break;
		}
	}
}, false);

function spolszczNazwiska(text) {
	let commentText = text;
	commentText = commentText.replaceAll('Odysseas', 'Odiseas');
	commentText = commentText.replaceAll('Vlachodimos', 'Wlachodimos');
	commentText = commentText.replaceAll('Vasilis', 'Wasilis');
	commentText = commentText.replaceAll('Fortounis', 'Fortunis');
	commentText = commentText.replaceAll('Stavros', 'Stawros');
	commentText = commentText.replaceAll('Vasilantonopoulos', 'Wasilandonopulos');
	commentText = commentText.replaceAll('Chatzidiakos', 'Chadzidiakos');
	commentText = commentText.replaceAll('Giannis', 'Janis');
	commentText = commentText.replaceAll('Papanikolaou', 'Papanikolau');
	commentText = commentText.replaceAll('Georgios', 'Jorgos');
	commentText = commentText.replaceAll('Tzavellas', 'Dzawelas');
	commentText = commentText.replaceAll(/(\w*)poulos\b/g, '$1pulos');

	commentText = commentText.replaceAll('Kvekve', 'Kwekwe');
	commentText = commentText.replaceAll('Tsitaishvili', 'Citaiszwili');
	commentText = commentText.replaceAll('Georgiy Tsitaishvili', 'Giorgi Citaiszwili');
	commentText = commentText.replaceAll('Khvicha', 'Chwicza');
	commentText = commentText.replaceAll('Kvaratskhelia', 'Kwaracchelia');
	commentText = commentText.replaceAll('Davitashvili', 'Dawitaszwili');
	commentText = commentText.replaceAll('Zivzivadze', 'Ziwziwadze');
	commentText = commentText.replaceAll('shvili', 'szwili');

	commentText = commentText.replaceAll('Vladyslav', 'Władysław');
	commentText = commentText.replaceAll('Kochergin', 'Koczerhin');
	commentText = commentText.replaceAll('Evgen', 'Jewhen');
	commentText = commentText.replaceAll('Konoplyanka', 'Konoplianka');
	commentText = commentText.replaceAll('Dzyuba', 'Dziuba');
	commentText = commentText.replaceAll('Yarmolenko', 'Jarmołenko');
	commentText = commentText.replaceAll('Yaremchuk', 'Jaremczuk');
	commentText = commentText.replaceAll('Oleksandr', 'Ołeksandr');
	commentText = commentText.replaceAll('Zinchenko', 'Zinczenko');
	commentText = commentText.replaceAll('Ruslan', 'Rusłan');
	commentText = commentText.replaceAll('Malinovsky', 'Malinowski');
	commentText = commentText.replaceAll('Malinovskyi', 'Malinowski');
	commentText = commentText.replaceAll('Vitali', 'Witalij');
	commentText = commentText.replaceAll('Mykolenko', 'Mykołenko');
	commentText = commentText.replaceAll('Tsygankov', 'Cyhankow');
	commentText = commentText.replaceAll('Shevchenko', 'Szewczenko');
	commentText = commentText.replaceAll('Dovbyk', 'Dowbyk');
	commentText = commentText.replaceAll('Karavaev', 'Karawajew');
	commentText = commentText.replaceAll('Zaytsev', 'Zajcew');
	commentText = commentText.replaceAll('Matviienko', 'Matwijenko');
	commentText = commentText.replaceAll('Mykhailo', 'Michajło');
	commentText = commentText.replaceAll('Georgiy', 'Heorhij');
	commentText = commentText.replaceAll('Anatolii', 'Anatolij');
	commentText = commentText.replaceAll('Andriy', 'Andrij');
	commentText = commentText.replaceAll('Dmitriy', 'Dmitrij');
	commentText = commentText.replaceAll(/Lunin\b/g, 'Łunin');
	commentText = commentText.replaceAll(/(\w*)chenko\b/g, '$1czenko');
	commentText = commentText.replaceAll(/(\w*)vsky\b/g, '$1wski');
	commentText = commentText.replaceAll(/(\w*)chuk\b/g, '$1czuk');
	commentText = commentText.replaceAll(/(\w*)lenko\b/g, '$1łenko');

	commentText = commentText.replaceAll('Velkovski', 'Wełkowski');
	commentText = commentText.replaceAll(/Stole\b/g, 'Stołe');
	commentText = commentText.replaceAll(/(\w*)vski\b/g, '$1wski');
	commentText = commentText.replaceAll(/(\w*)ov\b/g, '$1ow');

	commentText = commentText.replaceAll('Bozhidar', 'Bożidar');
	commentText = commentText.replaceAll('Chorbadzhiyski', 'Czorbadżijski');

	commentText = commentText.replaceAll('Yakhshiboev', 'Jakszibojew');
	commentText = commentText.replaceAll('Yaxshiboyev', 'Jakszibojew');

	commentText = commentText.replaceAll('Henrikh', 'Henrich');
	commentText = commentText.replaceAll('Mkhitaryan', 'Mchitarjan');
	commentText = commentText.replaceAll('Vahan', 'Wahan');
	commentText = commentText.replaceAll('Bichakhchyan', 'Biczachczjan');
	commentText = commentText.replaceAll('Zhirayr', 'Żirajr');
	commentText = commentText.replaceAll('Shaghoyan', 'Szaghojan');
	commentText = commentText.replaceAll('Hovhannisyan', 'Howhannisjan');
	commentText = commentText.replaceAll('Davidyan', 'Dawidjan');
	commentText = commentText.replaceAll('Voskanyan', 'Woskanjan');
	commentText = commentText.replaceAll(/(\w*)dyan\b/g, '$1djan');
	commentText = commentText.replaceAll(/(\w*)ryan\b/g, '$1rjan');
	commentText = commentText.replaceAll(/(\w*)syan\b/g, '$1sjan');
	commentText = commentText.replaceAll(/(\w*)zyan\b/g, '$1zjan');

	return commentText;
}

// Makes the element draggable
// https://www.w3schools.com/howto/howto_js_draggable.asp
function makeElementDraggable(element) {
	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}

	function elementDrag(ev) {
		ev = ev || window.event;
		ev.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - ev.clientX;
		pos2 = pos4 - ev.clientY;
		pos3 = ev.clientX;
		pos4 = ev.clientY;
		// set the element's new position:
		element.style.top = (element.offsetTop - pos2) + 'px';
		element.style.left = (element.offsetLeft - pos1) + 'px';
	}

	function dragMouseDown(ev) {
		ev = ev || window.event;
		ev.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = ev.clientX;
		pos4 = ev.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	// move the DIV from anywhere inside the DIV
	element.onmousedown = dragMouseDown;
	// Make the cursor different on hover
	element.style.cursor = 'move';
}

// iframe can't be dragged, only div
makeElementDraggable(fDivOverlay);

// LET'S LOAD SOME FLASHSCORE COMMENTARY NOW. Copy this line (without //) to the console and modify the arguments!
//loadFlashscoreMatchCommentary('2R3myONg', 'LPO', 'FIO', 'en', '560px', '600px');