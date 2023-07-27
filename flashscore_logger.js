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
	overlayOpacity: '0.8',
	// Time in milliseconds between consecutive chat messages
	chatInterval: 0
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
		cs: 'https://www.livesport.cz/zapas/',
		sk: 'https://www.flashscore.sk/zapas/',
		sl: 'https://www.flashscore.si/tekma/',
		hr: 'https://www.rezultati.com/utakmica/',
		sr: 'https://www.livesport.com/rs/detalji/',
		fi: 'https://www.flashscore.fi/ottelu/',
		ro: 'https://www.flashscore.ro/meci/',
		hu: 'https://www.livesport.com/hu/merkozes/',
		el: 'https://www.flashscore.gr/match/',
		id: 'https://www.livesport.com/id/pertandingan/',
		vi: 'https://www.flashscore.vn/trandau/'
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
		cs: '/#/prehled-zapasu/live-komentar/0',
		sk: '/#/prehlad-zapasu/live-komentar/0',
		sl: '/#/povzetek-dogodka/komentarji-v-zivo/0',
		hr: '/#/detalji/uzivo-komentar/0',
		sr: '/#/pregled-meca/komentari-uzivo/0',
		fi: '/#/ottelun-yhteenveto/live-kommentit/0',
		ro: '/#/sumar-meci/comentariu-live/0',
		hu: '/#/osszefoglalas/elo-kommentar/0',
		el: '/#/match-summary/live-commentary/0',
		id: '/#/ringkasan-pertandingan/komentatori-langsung/0',
		vi: '/#/tom-tat-tran-dau/binh-luan-truc-tiep/0'
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
		cs: 'KONEC',
		sk: 'KONIEC',
		sl: 'KONČANA',
		hr: 'KRAJ',
		sr: 'ZAVRŠENO',
		fi: 'LOPPUTULOS',
		ro: 'FINAL',
		hu: 'VÉGE',
		el: 'ΤΕΛΙΚΟ',
		id: 'SELESAI',
		vi: 'KẾT THÚC'
	},
	OWN_GOAL_ABBR: {
		pl: 'sam.',
		en: 'OG',
		es: 'p.p.',
		de: 'ET',
		it: 'AUT',
		fr: 'c.s.c.',
		pt: 'AG',
		tr: 'kk',
		uk: 'аг',
		dk: 'sm.',
		nl: 'e.d.',
		sv: 'sjm.',
		cs: 'vl.',
		sk: 'vl.',
		sl: 'AG',
		hr: 'AG',
		sr: 'AG',
		fi: 'om.',
		ro: 'aut.',
		hu: 'ög',
		el: 'αυτ.',
		id: 'b.d.',
		vi: 'l.n.'
	},
	PENALTY_ABBR: {
		pl: 'k.',
		en: 'P',
		es: 'PJ',
		de: 'P',
		it: 'G',
		fr: 'J',
		pt: 'J',
		tr: 'P',
		uk: 'пен.',
		dk: 'str.',
		nl: 'str.',
		sv: 'str.',
		cs: 'pk.',
		sk: 'pk.',
		sl: '11 m',
		hr: '11 m',
		sr: 'P',
		fi: 'rp.',
		ro: 'pen.',
		hu: 'bünt',
		el: 'πεν.',
		id: 'P',
		vi: 'ph.đ.'
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
 * @param {boolean} suspended if true, you have to call startFlashscore manually to print comments.
 * @param {string} width iFrame css width.
 * @param {string} height iFrame css height.
 */
function loadFlashscoreMatchCommentary(matchId, team1Code = '', team2Code = '', language = 'pl', suspended = false, width = '560px', height = '600px') {
	if (!(matchId?.length > 0)) {
		console.error('Oh no! You forgot to specify the match ID');
		console.log('%cMatch identifier can be found in the middle of match commentary URL.\nAn English link is always composed of: "http﻿s://ww﻿w.flashscore.com/match/" + matchId + "/#/match-summary/live-commentary/0".'
			, 'background: #00141E; color: #FFCD00; font-size: 1.3em');
		console.log('%cFor example: in this url – https://www.flashscore.com/match/GbHo73tP/#/match-summary/live-commentary/0 – the matchId is %cGbHo73tP'
			, 'background: #00141E; color: #FFCD00; font-size:1.3em', 'background: #00141E; color: #FFCD00; font-size:1.3em; font-weight:900');
		return;
	}
	// Stop the observer
	stopFlashscore();

	let prevLink = getCommentaryLink();

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

	// If iframe link didn't change, just restart the observer
	if (prevLink === getCommentaryLink()) {
		if (!suspended)
			restartFlashscore();
	}
	// Else wait for another page to load
	else {
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
				if (!suspended)
					restartFlashscore();

				// Delete redundant elements
				flashscoreFrame.contentDocument.querySelector('.detailLeaderboard')?.remove();
				Array.from(flashscoreFrame.contentDocument.querySelector('.bannerEnvelope')?.children ?? []).forEach(e => e.remove());
				flashscoreFrame.contentDocument.querySelector('#onetrust-banner-sdk')?.remove();
				flashscoreFrame.contentDocument.querySelector('.sg-b-f')?.remove();
			}, 3000);
		};
	}
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
	if (FlashscoreSettings.language === 'pl')
		commentText = spolszczNazwiska(commentText);

	// Two-element score array
	const scores = Array.from(flashscoreFrame.contentDocument.querySelectorAll('.detailScore__wrapper > span:not(.detailScore__divider)')).map(e => e.innerText);
	const scoreHome = scores[0] || '';
	const scoreAway = scores[1] || '';
	// This will precede every chat message
	const prefix = '[' + FlashscoreSettings.team1Code + ' ' + scoreHome + ':' + scoreAway + ' ' + FlashscoreSettings.team2Code + '] ';
	return prefix + minuteText + ' ' + iconEmoji + goalText + commentText;
}

/**
 * Splits long text into arrays of up to maxFragmentLength character long texts.
 *
 * @param {string} text
 * @param {number} maxFragmentLength Max number of characters inside one part
 * @return {string[]} Split text parts
 */
function getSlicedHaxballText(text, maxFragmentLength = 140) {
	/* In Haxball it's possible to send message up to 140 characters, so it must be split.
			 Usual flashscore comments are 1-3 Haxball lines long. */
	// Array containing sliced text fragments
	const slicedTextArr = [];
	// While generated sentence is too long
	while (text?.length > maxFragmentLength) {
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

function getCurrentRoomManager() {
	return insideRoom ? g?.getRoomManager() : null;
}

// Function to send chat, no matter if the modified game-min.js is present or not
function sendChat_s(message) {
	const roomManager = getCurrentRoomManager();
	// If modified game-min.js is loaded
	if (roomManager?.sendChat != null)
		roomManager.sendChat(message);
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

/**
 * Sends multiple lines of text to chat.
 *
 * @param {string[]} textArray Array of chat messages
 * @param {number} delay Delay between each chat message in milliseconds
 */
function sendTextArrayToChat(textArray, delay = 0) {
	// For each text fragment, send it to chat
	textArray.filter(text => text?.length > 0).forEach((text, i) => setTimeout(() => sendChat_s(text), i * delay));
}

/** @return {[team1: string, team2: string]} Two team names array. */
let getTeamNamesArray = () => {
	let teamNames = Array.from(flashscoreFrame.contentDocument.querySelectorAll('div.participant__participantName'))
		.map(e => e.innerText.substring(0, e.innerText.indexOf('(')).trim());
	if (FlashscoreSettings.language === 'pl')
		teamNames = teamNames.map(e => spolszczNazwiska(e));
	return teamNames;
};

/** @return {string} Which half is it and what minute or if the match is finished or cancelled. */
let getMatchDetailsString = () => Array.from(flashscoreFrame.contentDocument.querySelector('.detailScore__status')?.children ?? []).map(d => d.innerText).filter(d => d.trim().length > 0).join(' ').trim() ?? '';

/** @return {string} Referee and stadium. */
let getMatchRefereeStadiumString = () => Array.from(flashscoreFrame.contentDocument.querySelector('.mi__data')?.children ?? []).map(m => Array.from(m.children)).flat().map(i => i.innerText).join(' ');

/** @return {string} Match start date and time. */
let getStartTimeString = () => flashscoreFrame.contentDocument.querySelector('.duelParticipant__startTime')?.innerText ?? '';

/** @return {[score1: number, score2: number]} Scores array. */
let getScoresArray = () => Array.from(flashscoreFrame.contentDocument.querySelectorAll('.detailScore__wrapper > span:not(.detailScore__divider)')).map(e => Number.parseInt(e.innerText));

/**
 * Returns odd value for specified team and if it's valid.
 *
 * @param {number} teamId 1 – home win, 0 – tie, 2 – away win
 * @return {null|{valid: boolean, value: number}}
 */
function getOdd(teamId) {
	if (teamId >= 0 && teamId <= 2) {
		const odd = flashscoreFrame.contentDocument.querySelector('.o_' + teamId)?.children[1];
		if (odd != null) {
			const oddValue = Number.parseFloat(odd.innerText);
			const isValid = !odd.classList.contains('not-published');
			return {value: oddValue, valid: isValid};
		}
		else {
			console.warn('No odds found for this match');
			return null;
		}
	}
	else {
		console.warn('Cannot get odds for team ' + teamId);
		return null;
	}
}

/**
 * Returns goalscorers array.
 *
 * @return {string[]} Example: ["21' G. Ramos (B. Silva)", "37' M. Neuer (OG)"]
 */
function getGoalscorers() {
	// Goals, cards, substitutions...
	const incidents = Array.from(flashscoreFrame.contentDocument.querySelectorAll('.smv__incident'));
	// Filter goals
	const soccerIncidents = incidents.filter(i => i.querySelector('svg')?.classList?.[0] === 'soccer');
	// Extract minute, goalscorer and assist from each goal
	return soccerIncidents.map(si => {
		const minuteText = si.querySelector('.smv__timeBox').innerText;
		let scorerText = si.querySelector('.smv__playerName')?.innerText ?? '';
		let assistText = si.querySelector('.smv__assist')?.innerText ?? '';
		let isOwnGoal = si.querySelector('.footballOwnGoal-ico') != null;
		let isPenalty = !isOwnGoal && si.querySelector('.smv__subIncident') != null;
		let ownGoalText = '';
		let penaltyText = '';
		if (scorerText.length > 0) {
			// Swap name initials and surname
			const scorerMatches = scorerText.match(/\S+\..*/);
			if (scorerMatches != null)
				scorerText = scorerMatches[0] + ' ' + scorerMatches.input.substring(0, scorerMatches.index - 1);
			if (FlashscoreSettings.language === 'pl')
				scorerText = spolszczNazwiska(scorerText);
			scorerText = ' ' + scorerText;
			if (assistText.length > 0) {
				// Remove brackets
				assistText = assistText.substring(1).substring(0, assistText.length - 2);
				// Swap name initials and surname
				const assistMatches = assistText.match(/\S+\..*/);
				if (assistMatches != null)
					assistText = assistMatches[0] + ' ' + assistMatches.input.substring(0, assistMatches.index - 1);
				if (FlashscoreSettings.language === 'pl')
					assistText = spolszczNazwiska(assistText);
				assistText = ' (' + assistText + ')';
			}
			if (isOwnGoal)
				ownGoalText = ' (' + translate(Str.OWN_GOAL_ABBR) + ')';
			if (isPenalty)
				penaltyText = ' (' + translate(Str.PENALTY_ABBR) + ')';
		}

		return minuteText + scorerText + assistText + ownGoalText + penaltyText;
	});
}

/**
 * Returns current match summary as array of two strings.
 *
 * @return {[result: string, goalscorers: string]} Two-element array of strings ready to send to chat. The first element contains the results, the second element contains goalscorers.
 */
function getMatchSummary() {
	const startTimeString = getStartTimeString();
	const teamNamesArray = getTeamNamesArray();
	// Which half and minute
	const matchDetailsString = getMatchDetailsString();
	let scores = getScoresArray();
	if (scores.length < 2)
		scores = ['-', '-'];
	let refereeStadiumString = getMatchRefereeStadiumString();

	// Minute, goalscorer and assist from each goal
	const scorersArray = getGoalscorers();

	const line1TeamScores = teamNamesArray[0] + ' ' + scores[0] + ':' + scores[1] + ' ' + teamNamesArray[1];
	let line1Info;
	let line2;
	if (matchDetailsString.length > 0) {
		line1Info = matchDetailsString;
		line2 = scorersArray.join(' ◽ ');
	}
	else {
		line1Info = startTimeString;
		line2 = refereeStadiumString;
		if (FlashscoreSettings.language === 'pl')
			line2 = spolszczNazwiska(line2);
	}

	// Display match results
	return [line1TeamScores + ' ' + line1Info, line2];
}

function printMatchSummary() {
	let tabs = flashscoreFrame.contentDocument.querySelectorAll('.tabs__detail--nav .tabs__tab');
	if (tabs?.length === 0)
		tabs = flashscoreFrame.contentDocument.querySelectorAll('.filter__filter');
	// Click SUMMARY
	if (tabs?.length > 0)
		tabs[0].click();
	else
		console.warn('Could not switch tabs for goalscorers');
	// After a while
	setTimeout(() => {
		const matchSummary = getMatchSummary().filter(a => a.length > 0);
		// Send match summary
		const matchSummaryArray = [matchSummary[0]].concat(getSlicedHaxballText(matchSummary[1]));
		sendTextArrayToChat(matchSummaryArray, FlashscoreSettings.chatInterval);
		// Click COMMENTARY
		if (tabs?.length >= 3)
			tabs[tabs.length - 1].click();
	}, 500);
}

function printResultsWithOdds() {
	const startTimeString = getStartTimeString();
	const teamNamesArray = getTeamNamesArray();
	// Which half and minute
	const matchDetailsString = getMatchDetailsString();
	let scores = getScoresArray();
	if (scores.length < 2)
		scores = ['-', '-'];
	const odds = [getOdd(1), getOdd(0), getOdd(2)];
	const st = String.fromCharCode(822);
	const oddsStr = odds.map(odd => {
		return odd == null || isNaN(odd.value) ? '-' : odd.valid ? odd.value.toString() : [...odd.value.toString()].map(c => c + st).join('');
	});

	const line1TeamScores = teamNamesArray[0] + ' ' + scores[0] + ':' + scores[1] + ' ' + teamNamesArray[1];
	const line1Info = matchDetailsString.length > 0 ? matchDetailsString : startTimeString;
	const line2 = '𝟏: ' + oddsStr[0] + ' 𝐗: ' + oddsStr[1] + ' 𝟐: ' + oddsStr[2];

	const resultsWithOddsArray = [line1TeamScores + ' ' + line1Info, line2];
	sendTextArrayToChat(resultsWithOddsArray, FlashscoreSettings.chatInterval);
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
		// If the top comment is the same as one of the last four written comments
		if (lastCommentsQueue.length > 0 && (
			commentFromTopSoccerRow === lastCommentsQueue[0] ||
			commentFromTopSoccerRow === lastCommentsQueue[1] ||
			commentFromTopSoccerRow === lastCommentsQueue[2] ||
			commentFromTopSoccerRow === lastCommentsQueue[3]
		)) {
			// Don't write the same comment for the second time
			console.debug('Top comment was already written before');
			// If lastCommentsQueue has max 1 comment OR if the second top comment is the same as the second or third or fourth last written comment
			if (lastCommentsQueue.length <= 1 || (
				commentFromSecondSoccerRow === lastCommentsQueue[1] ||
				commentFromSecondSoccerRow === lastCommentsQueue[2] ||
				commentFromSecondSoccerRow === lastCommentsQueue[3]
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
		sendTextArrayToChat(botCommentFragments, FlashscoreSettings.chatInterval);

		previousRowCount = soccerRows.length;
	}
	else {
		console.debug('No soccer rows found');
	}

	// Score status element
	const scoreStatusText = flashscoreFrame.contentDocument.querySelector('.fixedHeaderDuel__detailStatus')?.innerText?.toUpperCase();

	// If the match has ended
	if (scoreStatusText === translate(Str.FINISHED) && !endPending) {
		console.log('Match has ended. End pending...');
		setTimeout(() => {
			console.log('Match has ended. Stopping.');
			// Display match results
			printMatchSummary();
			// Stop observing
			stopFlashscore();
			endPending = false;
		}, 5000);
		endPending = true;
	}
};

// Start observing the target node for configured mutations
let startFlashscore = () => {
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
let stopFlashscore = () => {
	//fCommentsObserverInterval.disconnect();
	clearInterval(fCommentsObserverInterval);
	console.log('Stopped observing flashscore commentary section');
};

let restartFlashscore = () => {
	stopFlashscore();
	startFlashscore();
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
			case '\'':
				// Write last comment
				if (lastCommentsQueue.length > 0)
					sendTextArrayToChat(getSlicedHaxballText(lastCommentsQueue[0]), FlashscoreSettings.chatInterval);
				break;
			case '[':
				// Send current match results and goalscorers
				printMatchSummary();
				break;
			case ']':
				// Send current match results and odds
				printResultsWithOdds();
				break;
		}
	}
}, false);

// Returns localized names. Before calling this, check if language is set to pl
function spolszczNazwiska(text) {
	let commentText = text;
	commentText = commentText.replaceAll('Pantelis Chatzidiakos', 'Pandelis Chadzidiakos');
	commentText = commentText.replaceAll('P. Chatzidiakos', 'P. Chadzidiakos');
	commentText = commentText.replaceAll('Konstantinos Tsimikas', 'Kostas Tsimikas');
	commentText = commentText.replaceAll('Georgios Masouras', 'Giorgos Masouras');
	commentText = commentText.replaceAll('Georgios Giakoumakis', 'Jorgos Jakumakis');
	commentText = commentText.replaceAll('Petros Mantalos', 'Petros Mandalos');
	commentText = commentText.replaceAll('Georgios Athanasiadis', 'Jorgos Atanasiadis');
	commentText = commentText.replaceAll('Efthymios Koulouris', 'Eftimis Kuluris');
	commentText = commentText.replaceAll('Athanasiadis', 'Atanasiadis');
	commentText = commentText.replaceAll('Mavropanos', 'Mawropanos');
	commentText = commentText.replaceAll('Vlachodimos', 'Wlachodimos');
	commentText = commentText.replaceAll('Fortounis', 'Fortunis');
	commentText = commentText.replaceAll('Vasilantonopoulos', 'Wasilandonopulos');
	commentText = commentText.replaceAll('Chatzidiakos', 'Chadzidiakos');
	commentText = commentText.replaceAll('Papanikolaou', 'Papanikolau');
	commentText = commentText.replaceAll('Odysseas', 'Odiseas');
	commentText = commentText.replaceAll('Vasilis', 'Wasilis');
	commentText = commentText.replaceAll('Stavros', 'Stawros');
	commentText = commentText.replaceAll('Tzavellas', 'Dzawelas');
	commentText = commentText.replaceAll('Giannis', 'Janis');
	commentText = commentText.replaceAll('Konstantinos', 'Konstandinos');
	commentText = commentText.replaceAll(/(\w*)poulos\b/g, '$1pulos');
	commentText = commentText.replaceAll('E. Koulouris', 'E. Kuluris');

	commentText = commentText.replaceAll('Georgiy Tsitaishvili', 'Giorgi Citaiszwili');
	commentText = commentText.replaceAll('Tsitaishvili', 'Citaiszwili');
	commentText = commentText.replaceAll('Kvaratskhelia', 'Kwaracchelia');
	commentText = commentText.replaceAll('Davitashvili', 'Dawitaszwili');
	commentText = commentText.replaceAll('Gugeshashvili', 'Gugeszaszwili');
	commentText = commentText.replaceAll('Zivzivadze', 'Ziwziwadze');
	commentText = commentText.replaceAll('Khvicha', 'Chwicza');
	commentText = commentText.replaceAll('shvili', 'szwili');
	commentText = commentText.replaceAll('Kvekve', 'Kwekwe');

	commentText = commentText.replaceAll('Danylo Ignatenko', 'Danyło Ihnatenko');
	commentText = commentText.replaceAll('Vladyslav Vanat', 'Władysław Wanat');
	commentText = commentText.replaceAll('Sergiy Rebrov', 'Serhij Rebrow');
	commentText = commentText.replaceAll('Oleksandr Svatok', 'Ołeksandr Swatok');
	commentText = commentText.replaceAll('Oleksandr Tymchyk', 'Ołeksandr Tymczyk');
	commentText = commentText.replaceAll('Vladyslav Kochergin', 'Władysław Koczerhin');
	commentText = commentText.replaceAll('Igor Kharatin', 'Ihor Charatin');
	commentText = commentText.replaceAll('Kochergin', 'Koczerhin');
	commentText = commentText.replaceAll('Konoplyanka', 'Konoplianka');
	commentText = commentText.replaceAll('Dzyuba', 'Dziuba');
	commentText = commentText.replaceAll('Yarmolenko', 'Jarmołenko');
	commentText = commentText.replaceAll('Yaremchuk', 'Jaremczuk');
	commentText = commentText.replaceAll('Zinchenko', 'Zinczenko');
	commentText = commentText.replaceAll('Malinovsky', 'Malinowski');
	commentText = commentText.replaceAll('Malinovskyi', 'Malinowski');
	commentText = commentText.replaceAll('Mykolenko', 'Mykołenko');
	commentText = commentText.replaceAll('Viktor Tsygankov', 'Wiktor Cyhankow');
	commentText = commentText.replaceAll('Tsygankov', 'Cyhankow');
	commentText = commentText.replaceAll('Shevchenko', 'Szewczenko');
	commentText = commentText.replaceAll('Dovbyk', 'Dowbyk');
	commentText = commentText.replaceAll('Karavaev', 'Karawajew');
	commentText = commentText.replaceAll('Zaytsev', 'Zajcew');
	commentText = commentText.replaceAll('Matviienko', 'Matwijenko');
	commentText = commentText.replaceAll('Yukhym Konoplya', 'Juchym Konopla');
	commentText = commentText.replaceAll('Konoplya', 'Konopla');
	commentText = commentText.replaceAll('Ilya Zabarnyi', 'Illa Zabarny');
	commentText = commentText.replaceAll('Zabarnyi', 'Zabarny');
	commentText = commentText.replaceAll('Georgiy Sudakov', 'Heorhij Sudakow');
	commentText = commentText.replaceAll('Georgi Bushchan', 'Heorhij Buszczan');
	commentText = commentText.replaceAll('Bushchan', 'Buszczan');
	commentText = commentText.replaceAll('Vitaliy Buyalskyy', 'Witalij Bujalski');
	commentText = commentText.replaceAll(/Lunin\b/g, 'Łunin');
	commentText = commentText.replaceAll('Mykhailo', 'Michajło');
	commentText = commentText.replaceAll('Anatolii', 'Anatolij');
	commentText = commentText.replaceAll('Andriy', 'Andrij');
	commentText = commentText.replaceAll('Dmitriy', 'Dmitrij');
	commentText = commentText.replaceAll('Ruslan', 'Rusłan');
	commentText = commentText.replaceAll('Vitali', 'Witalij');
	commentText = commentText.replaceAll('Vitaliy', 'Witalij');
	commentText = commentText.replaceAll('Vladyslav', 'Władysław');
	commentText = commentText.replaceAll('Oleksandr', 'Ołeksandr');
	commentText = commentText.replaceAll('Evgen', 'Jewhen');
	commentText = commentText.replaceAll('I. Kharatin', 'I. Charatin');
	commentText = commentText.replaceAll(/(\w*)chenko\b/g, '$1czenko');
	commentText = commentText.replaceAll(/(\w*)vsky\b/g, '$1wski');
	commentText = commentText.replaceAll(/(\w*)chuk\b/g, '$1czuk');
	commentText = commentText.replaceAll(/(\w*)lenko\b/g, '$1łenko');

	commentText = commentText.replaceAll('Velkovski', 'Wełkowski');
	commentText = commentText.replaceAll(/Stole\b/g, 'Stołe');
	commentText = commentText.replaceAll(/(\w*)vski\b/g, '$1wski');
	// Nie zamieniać Robert Ivanov
	//commentText = commentText.replaceAll(/(\w*)ov\b/g, '$1ow');

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
	commentText = commentText.replaceAll('Lucas Zelarayan', 'Lucas Zelarayán');
	commentText = commentText.replaceAll('Barseghyan', 'Barseghian');
	commentText = commentText.replaceAll('Dashyan', 'Daszian');
	commentText = commentText.replaceAll('Varazdat Haroyan', 'Warazdat Harojan');
	commentText = commentText.replaceAll('Styopa Mkrtchyan', 'Stiopa Mkrtczian');
	commentText = commentText.replaceAll('Harutyunyan', 'Harutiunian');

	commentText = commentText.replaceAll('Shahrudin Mahammadaliyev', 'Szachrudin Magomiedalijew');
	commentText = commentText.replaceAll('Bahlul Mustafazada', 'Bəhlul Mustafazadə');
	commentText = commentText.replaceAll('Elvin Cafarquliyev', 'Elvin Cəfərquliyev');
	commentText = commentText.replaceAll('Badavi Huseynov', 'Badawi Gusiejnow');
	commentText = commentText.replaceAll('Rahil Mammadov', 'Rahil Məmmədov');
	commentText = commentText.replaceAll('Richard Almeyda', 'Richard Almeida');
	commentText = commentText.replaceAll('Gurban Gurbanov', 'Gurban Gurbanow');
	commentText = commentText.replaceAll('B. Mustafazada', 'B. Mustafazadə');
	commentText = commentText.replaceAll('E. Cafarquliyev', 'E. Cəfərquliyev');
	commentText = commentText.replaceAll('B. Huseynov', 'B. Gusiejnow');
	commentText = commentText.replaceAll('R. Mammadov', 'R. Məmmədov');
	commentText = commentText.replaceAll('R. Almeyda', 'R. Almeida');
	commentText = commentText.replaceAll('G. Gurbanov', 'G. Gurbanow');


	commentText = commentText.replaceAll('Mukhammedzhan Seysen', 'Muchammiedżan Siejsien');
	commentText = commentText.replaceAll('Temirlan Erlanov', 'Temyrłan Jerłanow');
	commentText = commentText.replaceAll('Bauyrzhan Islamkhan', 'Bauyrżan Isłamchan');
	commentText = commentText.replaceAll('Evgen Makarenko', 'Jewhenij Makarenko');
	commentText = commentText.replaceAll('Sergey Maliy', 'Siergiej Mały');
	commentText = commentText.replaceAll('Gafurzhan Suyumbaev', 'Gafurżan Sujumbajew');
	commentText = commentText.replaceAll('Askhat Tagybergen', 'Aschat Tagybergen');
	commentText = commentText.replaceAll('Sultanbek Astanov', 'Sułtanbiek Astanow');
	commentText = commentText.replaceAll('Akmal Bakhtiyarov', 'Akmał Bachtijarow');
	commentText = commentText.replaceAll('Maxim Fedin', 'Maksim Fedin');
	commentText = commentText.replaceAll('Duman Narzildaev', 'Duman Narziłdajew');
	commentText = commentText.replaceAll('Bekkhan Shaizada', 'Biekchan Szajzada');
	commentText = commentText.replaceAll('Batyrkhan Tazhibay', 'Batyrchan Tażybaj');
	commentText = commentText.replaceAll('Kazhimukan Tolepbergen', 'Każymukan Tolepbiergien');
	commentText = commentText.replaceAll('Yerkebulan Tungyshbayev', 'Jerkiebułan Tungyszbajew');
	commentText = commentText.replaceAll('Vladislav Vasiljev', 'Władisław Wasiljew');
	commentText = commentText.replaceAll('Aybar Zhaksylykov', 'Ajbar Żaksyłykow');
	commentText = commentText.replaceAll('Usevalad Sadovski', 'Wsiewołod Sadowskij');
	commentText = commentText.replaceAll('Shakhboz Umarov', 'Szochboz Umarow');
	commentText = commentText.replaceAll('Bobur Abdikholikov', 'Bobir Abdicholikow');
	commentText = commentText.replaceAll('Aleksandr Sednev', 'Alaksandr Siadniou');
	commentText = commentText.replaceAll('S. Astanov', 'S. Astanow');
	commentText = commentText.replaceAll('M. Seysen', 'M. Siejsien');
	commentText = commentText.replaceAll('T. Erlanov', 'T. Jerłanow');
	commentText = commentText.replaceAll('B. Islamkhan', 'B. Isłamchan');
	commentText = commentText.replaceAll('E. Makarenko', 'Je. Makarenko');
	commentText = commentText.replaceAll('S. Maliy', 'S. Mały');
	commentText = commentText.replaceAll('G. Suyumbaev', 'G. Sujumbajew');
	commentText = commentText.replaceAll('S. Astanov', 'S. Astanow');
	commentText = commentText.replaceAll('D. Narzildaev', 'D. Narziłdajew');
	commentText = commentText.replaceAll('B. Shaizada', 'B. Szajzada');
	commentText = commentText.replaceAll('B. Tazhibay', 'B. Tażybaj');
	commentText = commentText.replaceAll('K. Tolepbergen', 'K. Tolepbiergien');
	commentText = commentText.replaceAll('Y. Tungyshbayev', 'J. Tungyszbajew');
	commentText = commentText.replaceAll('V. Vasiljev', 'W. Wasiljew');
	commentText = commentText.replaceAll('U. Sadovski', 'W. Sadowskij');
	commentText = commentText.replaceAll('S. Umarov', 'S. Umarow');
	commentText = commentText.replaceAll('B. Abdikholikov', 'B. Abdicholikow');
	commentText = commentText.replaceAll('A. Sednev', 'A. Siadniou');

	commentText = commentText.replaceAll('Bernardo Matic', 'Bernardo Matić');
	commentText = commentText.replaceAll('Kosta Runjaic', 'Kosta Runjaić');
	commentText = commentText.replaceAll('Rafal Augustyniak', 'Rafał Augustyniak');
	commentText = commentText.replaceAll('Blaz Kramer', 'Blaž Kramer');
	commentText = commentText.replaceAll('Tomas Pekhart', 'Tomáš Pekhart');
	commentText = commentText.replaceAll('Ernest Muci', 'Ernest Muçi');
	commentText = commentText.replaceAll('Jurgen Celhaka', 'Jurgen Çelhaka');
	commentText = commentText.replaceAll('Antonio Milic', 'Antonio Milić');
	commentText = commentText.replaceAll('Miha Blazic', 'Miha Blažič');
	commentText = commentText.replaceAll('Luka Zahovic', 'Luka Zahovič');
	commentText = commentText.replaceAll('David Smajc', 'David Šmajc');
	commentText = commentText.replaceAll('B. Matic', 'B. Matić');
	commentText = commentText.replaceAll('K. Runjaic', 'K. Runjaić');
	commentText = commentText.replaceAll('E. Muci', 'E. Muçi');
	commentText = commentText.replaceAll('J. Celhaka', 'J. Çelhaka');
	commentText = commentText.replaceAll('A. Milic', 'A. Milić');
	commentText = commentText.replaceAll('M. Blazic', 'M. Blažič');
	commentText = commentText.replaceAll('L. Zahovic', 'L. Zahovič');
	commentText = commentText.replaceAll('D. Smajc', 'D. Šmajc');
	commentText = commentText.replaceAll('Smajc D.', 'D. Šmajc');

	commentText = commentText.replaceAll('Qarabag', 'Karabach');
	commentText = commentText.replaceAll('Ordabasy Shymkent', 'Ordabasy Szymkent');
	commentText = commentText.replaceAll('Kauno Zalgiris', 'Żalgiris Kowno');

	commentText = commentText.replaceAll('Stadion Kazhymukan Munaitpasov (Šymkent)', 'Stadion Każymukana Mungajtpasuły (Szymkent)');

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
//loadFlashscoreMatchCommentary('2R3myONg', 'LPO', 'FIO', 'en', false, '560px', '600px');