const client_bot_utils_version = 'Indev 0.3';

// Version check
fetch('https://raw.githubusercontent.com/ChasmSolacer/Haxball-Client-Expansion/master/versions.json')
	.then(r => r.json()).then(vs => {
	const githubVersion = vs?.['hce_client-bot-utils'];
	console.info('Client Bot Utils ' + client_bot_utils_version);
	if (githubVersion?.length > 0) {
		if (client_bot_utils_version !== githubVersion)
			console.info('⬇️ Latest main version: ' + githubVersion + '. Get it at https://raw.githubusercontent.com/ChasmSolacer/Haxball-Client-Expansion/master/client_bot_utils.js');
	}
	else
		console.warn('Version check failed');
});

/*
 * Modified game-min.js (game-mod.js) is recommended for some functions to work properly.
 */
let g = window.g;
if (g == null) {
	console.warn('Load modified version of game-min.js first for full functionality');
	g = {};
}

/* Logging functions */
function log_c(text, color) {
	console.log('%c' + text, 'color:' + color);
}

const Color = {
	JOIN: '#0E0',
	LEAVE: '#FF8000',
	GOAL: '#80C0A0',
	VICTORY: '#4169E1',
	START: '#4190E1',
	STOP: '#6069E1',
	ADMIN: '#908000',
	TEAM: '#808080',
	KICK: '#FF6040',
	PAUSE: '#6060B0',
	STADIUM: '#F0F',
	DESYNC: '#DC143C',
	KICKRATE: '#5050FF',
	SPAM: '#696969'
};

// Haxball iframe body
let iframeBody = document.querySelector('iframe').contentDocument.body;

// Your avatar
let defaultAvatar = localStorage.avatar;
let currentAvatar = localStorage.avatar;
let avatarChangedJustBefore = false;
let avatarChangedResetTimeout = null;
let minAvatarIntervalMs = 80;
let intervalAvatar = null;
let avatarIndex = 0;
// If true, pressing left or right will change avatar
let dynamicArrows = false;
let leftPressedLast = false;
let rightPressedLast = false;
let chatIndicatorForced = false;

// For big text. If this is too big, the big text is likely to scramble
let maxLineWidth = 75;

let mutedIds = {};
let mutedNames = {};

let chatHistory = [];
let announcementHistory = [];

// If true, logs all chat messages to console
let logChat = true;
// 1 – log announcements only from players (some rooms only), 2 – log all announcements to the console, other – don't log
let logAnnouncements = 1;
// Activates .korwin command
let isOzjasz = false;
// .korwin command cooldown for specific players
let bannedFromOzjasz = {};
// Write who kicked the ball towards an opponent goal
let announceBallKick = false;
// Write goalscorer to chat on team goal
let announceGoal = false;
// Muted message will be this size
let shrunkFontSize = 0.4;
// Change avatar to the avatar set by the player who touched the ball
let ballTouchChangesAvatar = false;

// Is the script owner inside room. If game-min.js is unmodified, it is always true
let insideRoom = g.gameBaseVersion == null ? true : g.getRoomManager != null;
// ID of the script owner
let lastOwnerId = 0;
// Last room link got from inside g.onRoomLink
let lastRoomLink = '';
// Last recorded scores
let previousScores = null;
/**
 * Array of last 3 objects containing player who touched ball with the BallTouchType (0 – touch, 1 – kick).
 * @type {{player: {}, touchType: number}[]}
 */
let lastPlayersWhoTouchedBall = [];
/**
 * Index is player id. Each element contain last ball kick direction - an array of 2 ball coordinates right after ball kick.
 * @type [{[{x: number, y: number}, {x: number, y: number}]}]
 */
let lastKickDirection = [];
/**
 * Last recorded replay.
 * @type {Replay}
 */
let lastReplay = null;
/**
 * Replay objects array.
 * @type {Replay[]}
 */
let replays = [];

const BallTouchType = {
	TOUCH: 0,
	KICK: 1
};

let onGameTickEndFunctions = [];
let onPlayerBallTouchEndFunctions = [];

class Replay {
	/**
	 * Downloadable Replay object.
	 *
	 * @param {Uint8Array} replayArray hbr2 file contents
	 * @param {number} timestamp Replay time in milliseconds elapsed since the UNIX epoch
	 * @param {string} name Replay name
	 * @param {{}} roomManager Room manager object the replay was recorded in
	 */
	constructor(replayArray, timestamp, name, roomManager) {
		this.replayArray = replayArray;
		this.timestamp = timestamp;
		this.name = name;
		this.roomManager = roomManager;
	}

	download(filename) {
		if (filename == null) {
			const roomName = this.roomManager?.room?.roomState?.name ?? '';
			const dateString = dateToFileString(new Date(this.timestamp));
			filename = roomName + '_' + dateString + '_' + this.name;
		}
		const a = document.createElement('a');
		a.style.display = 'display: none';
		document.body.appendChild(a);
		const downloadUrl = URL.createObjectURL(new Blob([this.replayArray], {
			type: 'octet/stream'
		}));
		a.href = downloadUrl;
		a.download = filename + '.hbr2';
		a.click();
		URL.revokeObjectURL(downloadUrl);
		a.remove();
	}
}

// This script owner's player name
function getOwnerName() {
	const roomManager = getCurrentRoomManager();
	return roomManager != null ? g.getPlayer(getOwnerId()).name : localStorage.player_name ?? '';
}

// This script owner's player id
function getOwnerId() {
	const roomManager = getCurrentRoomManager();
	return roomManager?.room?.playerId;
}

function getCurrentRoomManager() {
	return insideRoom ? g.getRoomManager() : null;
}

function getLastRoomManager() {
	return g.getRoomManager != null ? g.getRoomManager() : null;
}

function dateToFileString(date) {
	const rrrr = date.getFullYear();
	const MM = ('' + (date.getMonth() + 1)).padStart(2, '0');
	const dd = ('' + date.getDate()).padStart(2, '0');
	const HH = ('' + date.getHours()).padStart(2, '0');
	const mm = ('' + date.getMinutes()).padStart(2, '0');
	const ss = ('' + date.getSeconds()).padStart(2, '0');
	return rrrr + '-' + MM + '-' + dd + '_' + HH + '-' + mm + '-' + ss;
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

// Notify the player
function slap(playerName) {
	return '@' + playerName.split(' ').join('_');
}

// Notify all players in the room
function slapAll(message) {
	if (g.getPlayerList != null) {
		let playersStr = '';
		const playerNames = g.getPlayerList().map(p => p.name);
		if (playerNames?.length > 0) {
			playerNames.forEach((playerName) => {
				console.debug(playerName);
				playersStr += slap(playerName) + ' ';
			});

			playersStr = playersStr + '' + message;
			sendChat_s(playersStr);
		}
		else {
			console.warn('[slapAll] No player names found');
		}
	}
}

/* =====  Deklinacja nazwisk przez przypadki (działa najlepiej dla rzeczowników i przymiotników)  ===== */
// Zero-width space
const zws = '\u200b';
const isLetter = c => c != null && c.toLowerCase() !== c.toUpperCase();

// Samogłoski wpływające na deklinację
const vowels = 'AEIOUYАО';

function isVowel(char) {
	if (char?.length === 1) {
		return vowels.indexOf(char) >= 0;
	}
}

function liczbaSylab(wyraz) {
	const foundVowels = wyraz.match(/[AĄEĘIOÓUY]/gi);
	let vowelsCount = foundVowels === null ? 0 : foundVowels.length;
	// Takie zbitki tworzą jedną sylabę, dlatego później trzeba odjąć jedną samogłoskę
	const vowelGroups = ['IA', 'IĄ', 'IE', 'IĘ', 'II', 'IO', 'IÓ', 'IU', 'IY'];
	vowelGroups.forEach(group => {
		if (wyraz.includes(group))
			vowelsCount--;
	});
	return vowelsCount;
}

// Zasady: http://nlp.actaforte.pl:8080/Nomina/Nazwiska
function dopelniacz(wyraz) {
	wyraz = wyraz.trim();
	const len = wyraz.length;
	const wyrazU = wyraz.toUpperCase();

	if (wyrazU === 'Wieprzowa')
		return 'Wieprzowej';

	// Wyrazy z nietypową końcówką, bez samogłosek lub jednosylabowe nazwiska zakończone samogłoską są nieodmienne
	if (wyrazU.endsWith('Ą') || wyrazU.endsWith('Ę') ||
		liczbaSylab(wyrazU) < 1 || liczbaSylab(wyrazU) < 2 && isVowel(wyrazU[len - 1]))
		return wyraz;

	// Musi być litera na końcu
	if (!isLetter(wyraz[len - 1]))
		return wyraz;

	// A
	// Wyrazy kończące się na -a
	if (wyrazU.endsWith('A') || wyrazU.endsWith('А')) {
		// 1-sylabowe lub kończące się na -oa (Wsza, DebOA) nie odmieniamy
		if (liczbaSylab(wyrazU) < 2 || wyrazU.endsWith('OA'))
			return wyraz;
		// Wyrazy co najmniej 2-sylabowe kończące się na -ja
		else if (wyrazU.endsWith('JA')) // -JA
		{
			// Spółgłoska przed -ja (PeZJA – PezjI, KaTJA – KatjI)
			if (!isVowel(wyrazU[len - 3]))
				wyraz = wyraz(0, len - 1) + 'i';
			// Samogłoska przed -ja (PeJA - PeI)
			else
				wyraz = wyraz.substring(0, len - 2) + 'i';
		}
		// Wyrazy co najmniej 2-sylabowe kończące się na -ya (GaYA - GaI)
		else if (wyrazU.endsWith('YA'))
			wyraz = wyraz.substring(0, len - 2) + 'i';
		// Wyrazy co najmniej 2-sylabowe kończące się na -ia (MarIA - MarII)
		else if (wyrazU.endsWith('IA')) {
			// Wyrazy co najmniej 2-sylabowe kończące się na -cia,nia,sia,zia (KaNIA - KanI)
			if (['C', 'N', 'S', 'Z'].includes(wyrazU[len - 3]))
				wyraz = wyraz.substring(0, len - 2) + 'i';
			else
				wyraz = wyraz.substring(0, len - 1) + 'i';
		}
		// Wyrazy co najmniej 2-sylabowe z a,e,g,k,l,q,u przed -a (reliGA – religI, GEA – GeI)
		else if (['A', 'E', 'G', 'K', 'L', 'Q', 'U'].includes(wyrazU[len - 2]))
			wyraz = wyraz.substring(0, len - 1) + 'i';
		// Inne wyrazy co najmniej 2-sylabowe – rzeczowniki twardotematowe na -a (SzukałA - SzukałY)
		else
			wyraz = wyraz.substring(0, len - 1) + 'y';
	}
		// E
	// Wyrazy kończące się na -e (JoE – JoeGO, Able – Ablego)
	else if (wyrazU.endsWith('E')) {
		// NiUE
		if (wyrazU.endsWith('UE'))
			return wyraz;
		// Taką odmianę mają rzeczowniki na -e (gdy nie zachodzą szczególne warunki)
		else
			wyraz += 'go';
	}
		// I
	// Wyrazy kończące się na -i
	else if (wyrazU.endsWith('I')) {
		// Wyrazy kończące się na -ii (WolskII - WolskiEGO)
		if (wyrazU[len - 2] === 'I') {
			// Nazwiska zakończone na -ii w odmianie (przymiotnikowej) mają jedno i
			wyraz = wyraz.substring(0, len - 1) + 'ego';
		}
		// Inne nazwiska zakończone na -i mają odmianę przymiotnikową (PolskI - PolskiEGO)
		else
			wyraz += 'ego';
	}
		// O
	// Wyrazy kończące się na -o
	else if (wyrazU.endsWith('O') || wyrazU.endsWith('О')) {
		// Nazwiska na -o zakończone podwójną samogłoską są nieodmienne. Hugo też.
		if (['A', 'E', 'O', 'U'].includes(wyrazU[len - 2]) || wyrazU === 'HUGO')
			return wyraz;
		// Nazwiska na -[g,k,q]o mają odmianę żeńską (jak gdyby kończyły się na -[g,k,q]a). (SanoGO - SanogI, JanKO, JankI)
		else if (['G', 'K', 'Q'].includes(wyrazU[len - 2]))
			wyraz = wyraz.substring(0, len - 1) + 'i';
		// Wyrazy z i,j,l,y przed -o (MarIO - MariA)
		else if (['I', 'J', 'L', 'Y'])
			wyraz = wyraz.substring(0, len - 1) + 'a';
		// Nazwiska twardotematowe na -o mają odmianę żeńską (tak, jakby kończyły się na -a) (TołopiłO - TołopiłY)
		else
			wyraz = wyraz.substring(0, len - 1) + 'y';
	}
		// U
	// Wyrazy kończące się na -u
	else if (wyrazU.endsWith('U')) {
		// Wyrazy kończące się na -au odmienia się jak -ał (StrejlAU – StrejlauA)
		if (wyrazU[len - 2] === 'A')
			wyraz += 'a';
		// Wyrazy kończące się na -eu (PorEU – PoreuGO)
		else if (wyrazU[len - 2] === 'E')
			wyraz += 'go';
		// Nie odmieniamy wygłosowego -u
		else
			return wyraz;
	}
		// Y
	// Wyrazy kończące się na -y
	else if (wyrazU.endsWith('Y')) {
		// Wyrazy kończące się na -ay,-ey,-oy
		if (['A', 'E', 'O'].includes((wyrazU[len - 2]))) // FaradAY - FaradayA
			wyraz += 'a';
		// Inne wyrazy kończące się na -y (RakoczY – RakoczEGO)
		else
			wyraz = wyraz.substring(0, len - 1) + 'ego';
	}
	// Wyrazy kończące się na samogłoskę ze znakiem diakrytycznym (é, ó, itp.)
	else if (isVowel(removeDiacritics(wyrazU[wyrazU.length - 1]))) {
		// Nie odmieniamy nietypowych końcówek
		return wyraz;
	}
	// 2-sylabowe kończące się na -ec (1-sylabowe: Pec - PecA)
	else if (wyrazU.endsWith('EC') && liczbaSylab(wyrazU) > 1) {
		// ci przed -ec (CzeCIEC – CzeĆCA)
		if (wyrazU.substring(len - 4, len - 2) === 'CI')
			wyraz = wyraz.substring(0, len - 4) + 'ćca';
		// ni przed -ec (CzeNIEC – CzeŃCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'NI')
			wyraz = wyraz.substring(0, len - 4) + 'ńca';
		// si przed -ec (CzeSIEC – CzeŚCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'SI')
			wyraz = wyraz.substring(0, len - 4) + 'śca';
		// szi przed -ec (CzeSZIEC – CzeszCA)
		else if (wyrazU.substring(len - 5, len - 2) === 'SZI')
			wyraz = wyraz.substring(0, len - 4) + 'ca';
		// zi przed -ec (CzeZIEC – CzeŹCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'ZI')
			wyraz = wyraz.substring(0, len - 4) + 'źca';
		// rz przed -ec (MaRZEC – MaRCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'RZ')
			wyraz = wyraz.substring(0, len - 4) + 'rca';
		// i przed -ec (CzepIEC – CzepCA)
		else if (wyrazU.substring(len - 3, len - 2) === 'I')
			wyraz = wyraz.substring(0, len - 3) + 'ca';
		// Inne 2-sylabowe kończące się na -ec (StrzelEC – StrzelCA)
		else
			wyraz = wyraz.substring(0, len - 2) + 'ca';
	}
	// 2-sylabowe kończące się na -ek (1-sylabowe: Pek - PekA)
	else if (wyrazU.endsWith('EK') && liczbaSylab(wyrazU) > 1) {
		// ci przed -ek (MaCIEK – MaĆKA)
		if (wyrazU.substring(len - 4, len - 2) === 'CI')
			wyraz = wyraz.substring(0, len - 4) + 'ćka';
		// ni przed -ek (MaNIEK – MaŃKA)
		else if (wyrazU.substring(len - 4, len - 2) === 'NI')
			wyraz = wyraz.substring(0, len - 4) + 'ńka';
		// si przed -ek (MaSIEK – MaŚKA)
		else if (wyrazU.substring(len - 4, len - 2) === 'SI')
			wyraz = wyraz.substring(0, len - 4) + 'śka';
		// szi przed -ek (MaSZIEK – MaszKA)
		else if (wyrazU.substring(len - 5, len - 2) === 'SZI')
			wyraz = wyraz.substring(0, len - 4) + 'ka';
		// zi przed -ek (MaZIEK – MaŹKA)
		else if (wyrazU.substring(len - 4, len - 2) === 'ZI')
			wyraz = wyraz.substring(0, len - 4) + 'źka';
		// Wyrazy kończące się na -iek lub -ek poprzedzone samogłoską (CzepIEK – CzepiekA, CzepAEK – CzepaekA)
		else if (isVowel(wyrazU[len - 3]))
			wyraz += 'a';
		// Inne 2-sylabowe kończące się na -ek (NeczEK – NeczKA)
		else
			wyraz = wyraz.substring(0, len - 2) + 'ka';
	}
		// Inne 1-sylabowe
	// 1-sylabowe kończące się na -ć (ŚmieĆ – ŚmieCIA)
	else if (wyrazU.endsWith('Ć'))
		wyraz = wyraz.substring(0, len - 1) + 'cia';
	// 1-sylabowe kończące się na -ń (ŚmieŃ – ŚmieNIA)
	else if (wyrazU.endsWith('Ń'))
		wyraz = wyraz.substring(0, len - 1) + 'nia';
	// 1-sylabowe kończące się na -ś (ŚmieŚ – ŚmieSIA)
	else if (wyrazU.endsWith('Ś'))
		wyraz = wyraz.substring(0, len - 1) + 'sia';
	// 1-sylabowe kończące się na -ź (ŚmieŹ – ŚmieZIA)
	else if (wyrazU.endsWith('Ź'))
		wyraz = wyraz.substring(0, len - 1) + 'zia';
	// 1-sylabowe kończące się na -x (WreX – WreKSA)
	else if (wyrazU.endsWith('X'))
		wyraz = wyraz.substring(0, len - 1) + 'ksa';
	// 1-sylabowe kończące się na spółgłoskę
	else if (!isVowel(wyrazU.substring(len - 1))) {
		// 1-sylabowe mające ó przed spółgłoską kończącą (JamrÓz – JamrOzA)
		if (wyrazU[len - 2] === 'Ó')
			wyraz = wyraz.substring(0, len - 2) + 'o' + wyraz.substring(len - 1) + 'a';
		// Inne 1-sylabowe kończące się na spółgłoskę (Kozioł – KoziołA)
		else
			wyraz += 'a';
	}

	return wyraz;
}

function biernik(wyraz) {
	wyraz = wyraz.trim();
	const len = wyraz.length;
	const wyrazU = wyraz.toUpperCase();

	if (wyrazU === 'Wieprzowa')
		return 'Wieprzową';

	// Wyrazy z nietypową końcówką, bez samogłosek lub jednosylabowe nazwiska zakończone samogłoską są nieodmienne
	if (wyrazU.endsWith('Ą') || wyrazU.endsWith('Ę') ||
		liczbaSylab(wyrazU) < 1 || liczbaSylab(wyrazU) < 2 && isVowel(wyrazU[len - 1]))
		return wyraz;

	// Musi być litera na końcu
	if (!isLetter(wyraz[len - 1]))
		return wyraz;

	// A
	// Wyrazy kończące się na -a
	if (wyrazU.endsWith('A') || wyrazU.endsWith('А')) {
		// 1-sylabowe lub kończące się na -oa (Wsza, DebOA) nie odmieniamy
		if (liczbaSylab(wyrazU) < 2 || wyrazU.endsWith('OA'))
			return wyraz;
		// Inne wyrazy co najmniej 2-sylabowe zakończone na -a (SzukałA - SzukałĘ)
		else
			wyraz = wyraz.substring(0, len - 1) + 'ę';
	}
		// E
	// Wyrazy kończące się na -e (JoE – JoeGO, Able – Ablego)
	else if (wyrazU.endsWith('E')) {
		// NiUE
		if (wyrazU.endsWith('UE'))
			return wyraz;
		// Taką odmianę mają rzeczowniki na -e (gdy nie zachodzą szczególne warunki)
		else
			wyraz += 'go';
	}
		// I
	// Wyrazy kończące się na -i
	else if (wyrazU.endsWith('I')) {
		// Wyrazy kończące się na -ii (WolskII - WolskiEGO)
		if (wyrazU[len - 2] === 'I') {
			// Nazwiska zakończone na -ii w odmianie (przymiotnikowej) mają jedno i
			wyraz = wyraz.substring(0, len - 1) + 'ego';
		}
		// Inne nazwiska zakończone na -i mają odmianę przymiotnikową (PolskI - PolskiEGO)
		else
			wyraz += 'ego';
	}
		// O
	// Wyrazy kończące się na -o
	else if (wyrazU.endsWith('O') || wyrazU.endsWith('О')) {
		// Nazwiska na -o zakończone podwójną samogłoską są nieodmienne. Hugo też.
		if (['A', 'E', 'O', 'U'].includes(wyrazU[len - 2]) || wyrazU === 'HUGO')
			return wyraz;
		// Wyrazy z i,j,l,y przed -o (MarIO - MariA)
		else if (['I', 'J', 'L', 'Y'].includes(wyrazU[len - 2]))
			wyraz = wyraz.substring(0, len - 1) + 'a';
		// Nazwiska twardotematowe na -o mają odmianę żeńską (tak, jakby kończyły się na -a) (TołpiłO - TołopiłĘ)
		else
			wyraz = wyraz.substring(0, len - 1) + 'ę';
	}
		// U
	// Wyrazy kończące się na -u
	else if (wyrazU.endsWith('U')) {
		// Wyrazy kończące się na -au odmienia się jak -ał (StrejlAU – StrejlauA)
		if (wyrazU[len - 2] === 'A')
			wyraz += 'a';
		// Wyrazy kończące się na -eu (PorEU – PoreuGO)
		else if (wyrazU[len - 2] === 'E')
			wyraz += 'go';
		// Nie odmieniamy wygłosowego -u
		else
			return wyraz;
	}
		// Y
	// Wyrazy kończące się na -y
	else if (wyrazU.endsWith('Y')) {
		// Wyrazy kończące się na -ay,-ey,-oy
		if (['A', 'E', 'O'].includes((wyrazU[len - 2]))) // FaradAY - FaradayA
			wyraz += 'a';
		// Inne wyrazy kończące się na -y (RakoczY – RakoczEGO)
		else
			wyraz = wyraz.substring(0, len - 1) + 'ego';
	}
	// Wyrazy kończące się na samogłoskę ze znakiem diakrytycznym (é, ó, itp.)
	else if (isVowel(removeDiacritics(wyrazU[wyrazU.length - 1]))) {
		// Nie odmieniamy nietypowych końcówek
		return wyraz;
	}
	// 2-sylabowe kończące się na -ec (1-sylabowe: Pec - PecA)
	else if (wyrazU.endsWith('EC') && liczbaSylab(wyrazU) > 1) {
		// ci przed -ec (CzeCIEC – CzeĆCA)
		if (wyrazU.substring(len - 4, len - 2) === 'CI')
			wyraz = wyraz.substring(0, len - 4) + 'ćca';
		// ni przed -ec (CzeNIEC – CzeŃCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'NI')
			wyraz = wyraz.substring(0, len - 4) + 'ńca';
		// si przed -ec (CzeSIEC – CzeŚCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'SI')
			wyraz = wyraz.substring(0, len - 4) + 'śca';
		// szi przed -ec (CzeSZIEC – CzeszCA)
		else if (wyrazU.substring(len - 5, len - 2) === 'SZI')
			wyraz = wyraz.substring(0, len - 4) + 'ca';
		// zi przed -ec (CzeZIEC – CzeŹCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'ZI')
			wyraz = wyraz.substring(0, len - 4) + 'źca';
		// rz przed -ec (MaRZEC – MaRCA)
		else if (wyrazU.substring(len - 4, len - 2) === 'RZ')
			wyraz = wyraz.substring(0, len - 4) + 'rca';
		// i przed -ec (CzepIEC – CzepCA)
		else if (wyrazU.substring(len - 3, len - 2) === 'I')
			wyraz = wyraz.substring(0, len - 3) + 'ca';
		// Inne 2-sylabowe kończące się na -ec (StrzelEC – StrzelCA)
		else
			wyraz = wyraz.substring(0, len - 2) + 'ca';
	}
	// 2-sylabowe kończące się na -ek (1-sylabowe: Pek - PekA)
	else if (wyrazU.endsWith('EK') && liczbaSylab(wyrazU) > 1) {
		// ci przed -ek (MaCIEK – MaĆKA)
		if (wyrazU.substring(len - 4, len - 2) === 'CI')
			wyraz = wyraz.substring(0, len - 4) + 'ćka';
		// ni przed -ek (MaNIEK – MaŃKA)
		else if (wyrazU.substring(len - 4, len - 2) === 'NI')
			wyraz = wyraz.substring(0, len - 4) + 'ńka';
		// si przed -ek (MaSIEK – MaŚKA)
		else if (wyrazU.substring(len - 4, len - 2) === 'SI')
			wyraz = wyraz.substring(0, len - 4) + 'śka';
		// szi przed -ek (MaSZIEK – MaszKA)
		else if (wyrazU.substring(len - 5, len - 2) === 'SZI')
			wyraz = wyraz.substring(0, len - 4) + 'ka';
		// zi przed -ek (MaZIEK – MaŹKA)
		else if (wyrazU.substring(len - 4, len - 2) === 'ZI')
			wyraz = wyraz.substring(0, len - 4) + 'źka';
		// Wyrazy kończące się na -iek lub -ek poprzedzone samogłoską (CzepIEK – CzepiekA, CzepAEK – CzepaekA)
		else if (isVowel(wyrazU[len - 3]))
			wyraz += 'a';
		// Inne 2-sylabowe kończące się na -ek (NeczEK – NeczKA)
		else
			wyraz = wyraz.substring(0, len - 2) + 'ka';
	}
		// Inne 1-sylabowe
	// 1-sylabowe kończące się na -ć (ŚmieĆ – ŚmieCIA)
	else if (wyrazU.endsWith('Ć'))
		wyraz = wyraz.substring(0, len - 1) + 'cia';
	// 1-sylabowe kończące się na -ń (ŚmieŃ – ŚmieNIA)
	else if (wyrazU.endsWith('Ń'))
		wyraz = wyraz.substring(0, len - 1) + 'nia';
	// 1-sylabowe kończące się na -ś (ŚmieŚ – ŚmieSIA)
	else if (wyrazU.endsWith('Ś'))
		wyraz = wyraz.substring(0, len - 1) + 'sia';
	// 1-sylabowe kończące się na -ź (ŚmieŹ – ŚmieZIA)
	else if (wyrazU.endsWith('Ź'))
		wyraz = wyraz.substring(0, len - 1) + 'zia';
	// 1-sylabowe kończące się na -x (WreX – WreKSA)
	else if (wyrazU.endsWith('X'))
		wyraz = wyraz.substring(0, len - 1) + 'ksa';
	// 1-sylabowe kończące się na spółgłoskę
	else if (!isVowel(wyrazU.substring(len - 1))) {
		// 1-sylabowe mające ó przed spółgłoską kończącą (JamrÓz – JamrOzA)
		if (wyrazU[len - 2] === 'Ó')
			wyraz = wyraz.substring(0, len - 2) + 'o' + wyraz.substring(len - 1) + 'a';
		// Inne 1-sylabowe kończące się na spółgłoskę (Kozioł – KoziołA)
		else
			wyraz += 'a';
	}

	return wyraz;
}

function odmienionaNazwa(nazwa, przypadekFun) {
	let nazwaO = '';
	// Kropka, ale inna
	const krn = '\u2024';
	// Wyjątki dla znanych nazw graczy. Czasami trzeba rozdzielić wyraz, żeby nie był odmieniany lub odwrotnie
	nazwa = nazwa.replace('Klau.dia', 'Klau' + krn + 'dia');
	nazwa = nazwa.replace('BALL-e', 'BA' + zws + 'LL-e');
	nazwa = nazwa.replace('Mac Al', 'Ma' + zws + 'c Al');
	nazwa = nazwa.replace('ga Świątek', 'ga Św' + zws + 'ią' + zws + 'te' + zws + 'k');
	nazwa = nazwa.replace('w gaciach', 'w ga' + zws + 'ci' + zws + 'a' + zws + 'ch');
	nazwa = nazwa.replace('a Grande', 'a Gr' + zws + 'an' + zws + 'de');
	nazwa = nazwa.replace('Emile', 'Emil');
	// Nazwa będzie rozdzielana na człony po tych znakach. Każdy człon będzie odmieniany samodzielnie
	// Nazwę 'Piotr.Samiec-Talar' rozdzieli na ['Piotr', '.', 'Samiec', '-', 'Talar']
	let czlony = nazwa.trim().split(/([\s\-+*\/\\.,_=`~"()\[\]{}:;<>?!\u200b])/g);
	// Dla każdego członu
	czlony.forEach((czlon, i) => {
		let czlonU = czlon.toUpperCase();
		let nieodmienne = ['VAN', 'VON', 'VOM', 'DOS', 'NOT', 'ROKOKO']; // Ulricha von Jungingena
		// Jeżeli człon nie jest ostatni i jest nieodmienny
		if (i < czlony.length - 1 && (nieodmienne.includes(czlonU) || czlon.length < 3))
			nazwaO += czlon;
		else
			nazwaO += przypadekFun(czlon);
	});
	return nazwaO.trim();
}

/* =====  BIG TEXT  ===== */
// For removing accents
const defaultDiacriticsRemovalMap = [{base: 'A', letters: 'AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯᴀ'}, {
	base: 'AA',
	letters: 'Ꜳ'
}, {base: 'AE', letters: 'ÆǼǢ'}, {base: 'AO', letters: 'Ꜵ'}, {base: 'AU', letters: 'Ꜷ'}, {
	base: 'AV',
	letters: 'ꜸꜺ'
}, {base: 'AY', letters: 'Ꜽ'}, {base: 'B', letters: 'BⒷＢḂḄḆɃƂƁʙ'}, {base: 'C', letters: 'CⒸＣĆĈĊČÇḈƇȻꜾcć'}, {
	base: 'D',
	letters: 'DⒹＤḊĎḌḐḒḎĐƋƊƉꝹÐᴅ'
}, {base: 'DZ', letters: 'ǱǄ'}, {base: 'Dz', letters: 'ǲǅ'}, {
	base: 'E',
	letters: 'EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎᴇ'
}, {base: 'F', letters: 'FⒻＦḞƑꝻꜰ'}, {base: 'G', letters: 'GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾɢ'}, {
	base: 'H',
	letters: 'HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍʜ'
}, {base: 'I', letters: 'IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗɪ'}, {base: 'J', letters: 'JⒿＪĴɈᴊ'}, {
	base: 'K',
	letters: 'KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢᴋ'
}, {base: 'L', letters: 'LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀʟᴌ'}, {base: 'LJ', letters: 'Ǉ'}, {base: 'Lj', letters: 'ǈ'}, {
	base: 'M',
	letters: 'MⓂＭḾṀṂⱮƜᴍ'
}, {base: 'N', letters: 'NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤɴ'}, {base: 'NJ', letters: 'Ǌ'}, {base: 'Nj', letters: 'ǋ'}, {
	base: 'O',
	letters: 'OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǬØǾƆƟꝊꝌᴏó'
}, {base: 'OI', letters: 'Ƣ'}, {base: 'OO', letters: 'Ꝏ'}, {base: 'OU', letters: 'Ȣ'}, {
	base: 'OE',
	letters: 'Œ'
}, {base: 'oe', letters: 'œ'}, {base: 'P', letters: 'PⓅＰṔṖƤⱣꝐꝒꝔᴘ'}, {base: 'Q', letters: 'QⓆＱꝖꝘɊǫ'}, {
	base: 'R',
	letters: 'RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂʀ'
}, {base: 'S', letters: 'SⓈＳŚṤŜṠŠṦṢṨȘŞⱾꞨꞄꜱś'}, {base: 'SS', letters: 'ẞ'}, {
	base: 'T',
	letters: 'TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆᴛ'
}, {base: 'TZ', letters: 'Ꜩ'}, {base: 'U', letters: 'UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄᴜ'}, {
	base: 'V',
	letters: 'VⓋＶṼṾƲꝞɅᴠ'
}, {base: 'VY', letters: 'Ꝡ'}, {base: 'W', letters: 'WⓌＷẀẂŴẆẄẈⱲᴡ'}, {base: 'X', letters: 'XⓍＸẊẌx'}, {
	base: 'Y',
	letters: 'YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾʏ'
}, {base: 'Z', letters: 'ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢᴢźƶ'}, {base: 'a', letters: 'aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ'}, {
	base: 'aa',
	letters: 'ꜳ'
}, {base: 'ae', letters: 'æǽǣ'}, {base: 'ao', letters: 'ꜵ'}, {base: 'au', letters: 'ꜷ'}, {
	base: 'av',
	letters: 'ꜹꜻ'
}, {base: 'ay', letters: 'ꜽ'}, {base: 'b', letters: 'bⓑｂḃḅḇƀƃɓ'}, {base: 'c', letters: 'ⓒｃćĉċčçḉƈȼꜿↄ'}, {
	base: 'd',
	letters: 'dⓓｄḋďḍḑḓḏđƌɖɗꝺ'
}, {base: 'dz', letters: 'ǳǆ'}, {base: 'e', letters: 'eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ'}, {
	base: 'f',
	letters: 'fⓕｆḟƒꝼ'
}, {base: 'g', letters: 'gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ'}, {base: 'h', letters: 'hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ'}, {
	base: 'hv',
	letters: 'ƕ'
}, {base: 'i', letters: 'iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı'}, {base: 'j', letters: 'jⓙｊĵǰɉ'}, {
	base: 'k',
	letters: 'kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ'
}, {base: 'l', letters: 'lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ'}, {base: 'lj', letters: 'ǉ'}, {
	base: 'm',
	letters: 'mⓜｍḿṁṃɱɯ'
}, {base: 'n', letters: 'nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ'}, {base: 'nj', letters: 'ǌ'}, {
	base: 'o',
	letters: 'oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǭøǿɔꝋꝍɵ'
}, {base: 'oi', letters: 'ƣ'}, {base: 'ou', letters: 'ȣ'}, {base: 'oo', letters: 'ꝏ'}, {
	base: 'p',
	letters: 'pⓟｐṕṗƥᵽꝑꝓꝕ'
}, {base: 'q', letters: 'qⓠｑɋꝗꝙ'}, {base: 'r', letters: 'rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ'}, {
	base: 's',
	letters: 'sⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛ'
}, {base: 'ss', letters: 'ß'}, {base: 't', letters: 'tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ'}, {base: 'tz', letters: 'ꜩ'}, {
	base: 'u',
	letters: 'uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ'
}, {base: 'v', letters: 'vⓥｖṽṿʋꝟʌ'}, {base: 'vy', letters: 'ꝡ'}, {base: 'w', letters: 'wⓦｗẁẃŵẇẅẘẉⱳ'}, {
	base: 'x',
	letters: 'ⓧｘẋẍ'
}, {base: 'y', letters: 'yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ'}, {base: 'z', letters: 'zⓩｚźẑżžẓẕƶȥɀⱬꝣ'}
];

const diacriticsMap = {};
for (let i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
	let letters = defaultDiacriticsRemovalMap[i].letters;
	for (let j = 0; j < letters.length; j++) {
		diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
	}
}

function removeDiacritics(str) {
	return str.replace(/[^\u0041-\u007A]/g, a => diacriticsMap[a] || a);
}

// Characters with their bigger appearance respectively
const chars = [' ', '!', '"', '#', '$', '%', '&', '*', '\'', '(', ')', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'Ą', 'Ä', 'Á', 'À', 'Å', 'Ā', 'Ă', 'Ǎ', 'Â', 'B', 'C', 'Ć', 'Ç', 'Č', 'D', 'Ď', 'Đ', 'Ð', 'E', 'Ę', 'Ë', 'Ė', 'É', 'È', 'Ě', 'Ē', 'F', 'G', 'Ğ', 'Ģ', 'H', 'I', 'İ', 'Ï', 'Į', 'Í', 'Ì', 'Ī', 'J', 'K', 'Ķ', 'L', 'Ĺ', 'Ľ', 'Ļ', 'Ł', 'M', 'N', 'Ń', 'Ň', 'Ñ', 'Ņ', 'O', 'Ó', 'Ò', 'Ö', 'Ǒ', 'Ô', 'Ő', 'Ø', 'P', 'Q', 'R', 'Ř', 'Ŕ', 'S', 'Ś', 'Ş', 'Š', 'T', 'Ť', 'Ț', 'U', 'Ü', 'Ų', 'Ū', 'Ú', 'Ù', 'Ű', 'Ů', 'V', 'W', 'X', 'Y', 'Ý', 'Z', 'Ź', 'Ż', 'Ž', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', '€', 'ẞ', 'Æ', 'Þ', 'Σ', 'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Ж', 'З', 'І', 'Ї', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', '¡', '¿', '⅟', '↉', '½', '⅓', '⅔', '¼', '¾', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅐', '⅛', '⅜', '⅝', '⅞', '⅑', '⅒'];

const bigChars2 = [
	[' ', '█', '▐▐', '░█▒█▄', '█▐▌▀', '▀░▄▀', '▐█▀', '▀▄▀', '▐', '▄▀', '▀▄', '▄█▄', '░', '▄▄', '░', '░░▄▀', '▐▀▌', '▄█', '▀█', '▀▀█', '█░█', '█▀', '▐▄▄', '▀▀█', '▐█▌', '█▀▌', '▄', '▄', '▄▀', '▄▄', '▀▄', '▀█', '▐▀█░', '▄▀█', '▄▀█░', '▄▀█', '▄▀█', '▄▀█', '▄▀█', '▄▀█', '▄▀█', '▄▀█', '▄▀█', '█▄▄', '█▀▀', '▄█▄', '█▀▀', '▄█▄', '█▀▄', '█▀▄', '░█▀▄', '░█▀▄', '█▀▀', '█▀▀░', '█▀▀', '█▀▀', '▄█▄', '▄█▄', '▄█▄', '█▀▀', '█▀▀', '█▀▀', '██▀▀', '█▀▀▀', '█░█', '█', '▀', '▀░▀', '█', '▐', '▌', '▀▀▀', '░░█', '█▄▀', '█▄▀', '█░░', '█▐░', '█░▐', '█░░', '█░░', '█▀▄▀█', '█▄░█', '█▄▐░█', '█▄▀░█', '█▄▀░█', '█▄▄░█', '█▀█', '███', '███', '█▄█', '▄██', '▄██', '███', '█▀██', '█▀█', '█▀█', '█▀█', '███', '███', '█▀', '█▀', '█▀', '█▀', '▀█▀', '▄█▄', '▀█▀', '█░█', '▀░▀', '█░█', '▀▀▀', '░▐░', '░▌░', '░▌▌', '░▀░', '█░█', '█░█░█', '▀▄▀', '█▄█', '█▄█', '▀█', '▀█', '▀█', '▀█', '█▀', '▀▄░░', '▀█', '▄▀▄', '░░', '▀▄', '▄█▀', '▐', '▀█▄', '▄▀▄▀', '░█▀▀▀', '▐█▄', '▄▀██▀', '█▄', '⎲', '▄▀█', '██▀', '██▄', '█▀▀', '▄▄▌', '▐▀▌', '█▀▀', '▀▄█▄▀', '▀▀█', '█', '▀░▀', '█░▄█', '█░▀▄█', '█▄▀', '▐▀█', '█░█', '█▀▄▀█', '█▀█', '█▀█', '█▀█', '█▀▀', '▀█▀', '█▄█', '█▀█▀█', '▀▄▀', '█░█░', '█▄█', '█░█░█', '█░█░█░', '▀▌░', '▌░▐', '▌░', '▀▀▀█', '▌█▀█', '█▀█', '▀', '▀░', '1 ░▄▀', '0 ░▄▀', '1 ░▄▀', '1 ░▄▀', '2 ░▄▀', '1 ░▄▀', '3 ░▄▀', '1 ░▄▀', '2 ░▄▀', '3 ░▄▀', '4 ░▄▀', '1 ░▄▀', '5 ░▄▀', '1 ░▄▀', '1 ░▄▀', '3 ░▄▀', '5 ░▄▀', '7 ░▄▀', '1 ░▄▀', '1 ░▄▀'],
	[' ', '▄', '░░', '▀█▀█░', '▄▐▌█', '▄▀░▄', '█▄█', '▀░▀', '░', '▀▄', '▄▀', '░▀░', '▌', '░░', '▄', '▄▀░░', '▐▄▌', '░█', '█▄', '▄██', '▀▀█', '▄█', '▐▄█', '░▐▌', '█▄█', '▀▀▌', '▄', '▌', '░▀', '▀▀', '▀░', '░▄', '▐▄█▄', '█▀█', '█▀█▄', '█▀█', '█▀█', '█▀█', '█▀█', '█▀█', '█▀█', '█▀█', '█▀█', '█▄█', '█▄▄', '█▄▄', '▀█▀', '█▄▄', '█▄▀', '█▄▀', '▀█▄▀', '▀█▄▀', '██▄', '██▄▄', '██▄', '██▄', '██▄', '██▄', '██▄', '██▄', '█▀░', '█▄█', '█▄▄█', '█▄██', '█▀█', '█', '█', '░█░', '▐', '█', '█', '░█░', '█▄█', '█░█', '█▒█', '█▄▄', '█▄▄', '█▄▄', '▀█▀', '██▄', '█░▀░█', '█░▀█', '█░▀▀█', '█░▀▀█', '█░▀▀█', '█░▌▀█', '█▄█', '█▄█', '█▄█', '█▄█', '█▄█', '█▄█', '█▄█', '██▄█', '█▀▀', '▀▀█', '█▀▄', '█▀▄', '█▀▄', '▄█', '▄█', '▄█', '▄█', '░█░', '░█░', '░▐░', '█▄█', '█▄█', '▀█▀', '█▄█', '█▄█', '█▄█', '█▄█', '█▄█', '▀▄▀', '▀▄▀▄▀', '█░█', '░█░', '░█░', '█▄', '█▄', '█▄', '█▄', '█▄', '░░▀▄', '▄█', '░░░', '▄▄', '░░', '▀█▄', '▐', '▄█▀', '░░░░', '▀███▄', '█▄█', '█▀█▄▄', '█▀', '⎳', '█▀█', '█▄█', '█▄█', '█░░', '█░░', '█▀█', '██▄', '█░█░█', '▄██', '█', '░█░', '█▀░█', '█▄▀░█', '█░█', '█░█', '█▀█', '█░▀░█', '█▄█', '█░█', '█▀▀', '█▄▄', '░█░', '▄▄▀', '█▄█▄█', '█░█', '█▄█▄', '░░█', '█▄█▄█', '█▄█▄█▄', '░██', '██▐', '██', '▄███', '▌█▄█', '▄▀█', '█', '█▄', '▄▀░░', '▄▀░ 3', '▄▀░ 2', '▄▀░ 3', '▄▀░ 3', '▄▀░ 4', '▄▀░ 4', '▄▀░ 5', '▄▀░ 5', '▄▀░ 5', '▄▀░ 5', '▄▀░ 6', '▄▀░ 6', '▄▀░ 7', '▄▀░ 8', '▄▀░ 8', '▄▀░ 8', '▄▀░ 8', '▄▀░ 9', '▄▀ 10']
];

const bigChars3 = [
	[' ', '█', '▌▐', '▄█▄▄█▄', '█▀█▀█', '▀░░█', '▄▀▀░', '▀▄▀', '█', '▄▀', '▀▄', '░▄░', '░', '░░', '░', '░░░█', '█▀▀█', '▄█░', '█▀█', '█▀▀█', '░█▀█░', '█▀▀', '▄▀▀▄', '▀▀█', '▄▀▀▄', '▄▀▀▄', '▄', '░', '░▄', '▄▄', '▄░', '▀█', '▐▀▀█', '█▀▀█', '█▀▀█░', '▄█▄█', '▄▄▌▄', '▄▐▄▄', '▄▄█▄', '████', '▄██▄', '▄██▄', '▄██▄', '█▀▀█', '█▀▀█', '▄▐▌▄', '█▀▀█', '▄██▄', '█▀▀▄', '▄██░', '█▀▀▄', '█▀▀▄', '█▀▀▀', '█▀▀▀', '▄█▄█', '▄▄▀▄', '▄▄▐▄', '▄▄▌▄', '▄██▄', '████', '█▀▀▀', '█▀▀█', '▄██▄', '█▀▀▀', '█░░█', '▀█▀', '░▀░', '▀░▀', '▀█▀', '░▐░', '░▌░', '▀▀▀', '░░░█', '█░▄▀', '█░▄▀', '█░░░', '█▐░░', '█░░▌', '█░░░', '█░░░', '█▀▄▀█', '█▄░░█', '█▄░▐░█', '▄░▀▄▀▄', '█▄▀▀░█', '█▄░░░█', '█▀▀▀█', '█▀▐▀█', '█▀▌▀█', '▄█▄█▄', '░▀▄▀░', '░▄▀▄░', '█▀██▀█', '█▀▀▀██', '█▀▀█', '█▀▀█', '█▀▀█', '▄██▄', '▄▄█▄', '█▀▀▀█', '█▀█▀█', '█▀▀▀▀', '▄▄██▄', '▀▀█▀▀', '░▀▄▀░', '▀▀█▀▀', '█░░█', '░▀░▀', '█░░█', '▀▀▀▀', '░▄▀░', '░▀▄░', '░▐▐░', '░░▀░', '█░░░█', '█░░░█', '▐▌▐▌', '█░█', '▄░▄▀▄', '█▀▀▀█', '▄▄▄█▄', '▄▄▀▄▄', '▄▄██▄', '█▀', '█░░░', '▀█', '▄▀▄', '░░', '▀▄', '░█▀', '▐', '▀█░', '▄▀▄▀', '░█▀▀▀', '░█▀█░', '█▀▀█▀▀', '█▄▄', '▀█▀▀', '█▀▀█', '█▀▀▀', '█▀▀█', '█▀▀', '▄▄▌', '▐▀▀▌', '█▀▀▀', '█░█░█', '█▀▀█', '▀█▀', '▀░▀', '█░░▄█', '█░▀░█', '█░▄▀', '▐▀▀█', '█▀▄▀█', '█░░█', '█▀▀▀█', '█▀▀█', '█▀▀█', '█▀▀█', '▀▀█▀▀', '█░░░█', '▄▄█▄▄', '▐▌▐▌', '█░░█', '█░░█', '█░█░█', '█░█░█', '▀█░░░', '█░░▐', '█░░░', '▀▀▀▄', '▌█▀▀█', '█▀▀█', '▀', '░▀', '1 ░░█', '0 ░░█', '1 ░░█', '1 ░░█', '2 ░░█', '1 ░░█', '3 ░░█', '1 ░░█', '2 ░░█', '3 ░░█', '4 ░░█', '1 ░░█', '5 ░░█', '1 ░░█', '1 ░░█', '3 ░░█', '5 ░░█', '7 ░░█', '1 ░░█', '1 ░░█'],
	[' ', '█', '░░', '░█░░█░', '▀▀█▄▄', '░▄▀░', '░██▄', '▀░▀', '░', '█░', '░█', '▀█▀', '░', '▀▀', '░', '░▄▀░', '█▄▀█', '░█░', '░▄▀', '░░▀▄', '█▄▄█▄', '▀▀▄', '█▄▄░', '░█░', '▄▀▀▄', '▀▄▄█', '░', '▀', '▀▄', '▄▄', '▄▀', '█▀', '▐▐▄█', '█▄▄█', '█▄▄█░', '█▄▄█', '█▄▄█', '█▄▄█', '█▄▄█', '█▄▄█', '█▄▄█', '█▄▄█', '█▄▄█', '█▀▀▄', '█░░░', '█░░░', '█░░▄', '█░░░', '█░▒█', '█░▒█', '█▄▒█', '█▄▒█', '█▀▀▀', '█▀▀▀', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█▀▀▀', '█░▄▄', '█░▄▄', '█░▀█', '█▀▀█', '░█░', '▀█▀', '▀█▀', '▄█▄', '▀█▀', '▀█▀', '▀█▀', '▄░░█', '█▀▄░', '█▀▄░', '█░░░', '█░░░', '█░░░', '█░░░', '█▄▀░', '█▒█▒█', '█▒█▒█', '█▒▀▄▒█', '█▀▄░░█', '█▒▀▄▒█', '█▒▀▄▒█', '█░░░█', '█░░░█', '█░░░█', '█░░░█', '█▀▀▀█', '█▀▀▀█', '█░░░░█', '█░▄▀░█', '█▄▄█', '█░░█', '█▄▄▀', '█▄▄▀', '█▄▄▀', '▀▀▀▄▄', '▀▀▀▄▄', '▀▀▀▀█', '█▄▄▄▄', '░░█░░', '▀▀█▀▀', '░░█░░', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '▒█░█▒', '█░█░█', '░▐▌░', '█▄█', '█▄▄▄█', '▄▄▄▀▀', '▄▄▄▄█', '▄▄▄▄█', '▄▄▄▄█', '█░', '░▀▄░', '░█', '░░░', '░░', '░░', '█▓░', '▐', '░▓█', '░░░░', '████░', '░█▀▀█', '█▄▄█▀▀', '█░█', '░░█░', '█▄▄█', '█▀▀█', '█▀▀▄', '█░░', '█░░', '▐▄▄▌', '█▀▀▀', '░███░', '░░▀▄', '░█░', '░█░', '█▒█▒█', '█▒▄▀█', '█▀▄░', '▐░░█', '█▒█▒█', '█▀▀█', '█░░░█', '█░░█', '█▄▄█', '█░░░', '░░█░░', '░▀▀█▀', '█░█░█', '░▐▌░', '█░░█', '█▄▄█', '█░█░█', '█░█░█', '░█▀▀█', '█▀█▐', '█▀▀█', '░▀▀█', '██░░█', '▀▄▄█', '█', '▄█', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░', '░▄▀░'],
	[' ', '▄', '░░', '▀█▀▀█▀', '█▄█▄█', '█░░▄', '▀▄▄█', '░░░', '░', '▀▄', '▄▀', '░░░', '▌', '░░', '▄', '█░░░', '█▄▄█', '▄█▄', '█▄▄', '█▄▄█', '░░░█░', '▄▄▀', '▀▄▄▀', '▐▌░', '▀▄▄▀', '░▄▄▀', '▀', '▌', '░░', '░░', '░░', '▄░', '▐▄▄▄', '█░░█', '█░░█▄', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '█░░█', '█▄▄█', '█▄▄█', '█▄▄▄', '▀▀█▀', '█▄▄▄', '█▄▄▀', '█▄▄▀', '█▄▄▀', '█▄▄▀', '█▄▄▄', '▀▀▀█', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█▄▄▄', '█░░░', '█▄▄█', '█▄▄█', '▀▀█▀', '█░░█', '▄█▄', '▄█▄', '▄█▄', '░▐░', '▄█▄', '▄█▄', '▄█▄', '█▄▄█', '█░░█', '█▐░█', '█▄▄█', '█▄▄█', '█▄▄█', '▀▀█▀', '█▄▄█', '█░░░█', '█░░▀█', '█░░░▀█', '█░░▀▄█', '█░░░▀█', '█░▐░▀█', '█▄▄▄█', '█▄▄▄█', '█▄▄▄█', '█▄▄▄█', '█▄▄▄█', '█▄▄▄█', '█▄▄▄▄█', '██▄▄▄█', '█░░░', '▀▀█▄', '█░░█', '█░░█', '█░░█', '█▄▄▄█', '█▄▄▄█', '▀▀█▀▀', '▄▄▄▄█', '░░█░░', '░░█░░', '░░▐░░', '▀▄▄▀', '▀▄▄▀', '░▀█▄', '▀▄▄▀', '▀▄▄▀', '▀▄▄▀', '▀▄▄▀', '▀▄▄▀', '░▀▄▀░', '▐▄▀▄▌', '▐▌▐▌', '░█░', '░░█░░', '█▄▄▄█', '█▄▄▄▄', '█▄▄▄▄', '█▄▄▄▄', '█▄', '░░░█', '▄█', '░░░', '▄▄', '░░', '░█▄', '▐', '▄█░', '░░░░', '░█▄▄▄', '▄█▄▄█', '█░░█▄▄', '█▀▀', '▄█▄▄', '█░░█', '█▄▄█', '█▄▄█', '█░░', '█░░', '█░░█', '█▄▄▄', '█░█░█', '█▄▄█', '▄█▄', '░█░', '█▀░░█', '█▀░░█', '█░░█', '█░░█', '█░░░█', '█░░█', '█▄▄▄█', '█░░█', '█░░░', '█▄▄█', '░░█░░', '░▄▀░░', '▀▀█▀▀', '▐▌▐▌', '▀▀▀█', '░░░█', '▀▀▀▀▀', '▀▀▀▀█', '░█▄▄█', '█▄█▐', '█▄▄█', '▄▄▄▀', '▌█▄▄█', '█░░█', '█', '█▄', '█░░░', '█░░ 3', '█░░ 2', '█░░ 3', '█░░ 3', '█░░ 4', '█░░ 4', '█░░ 5', '█░░ 5', '█░░ 5', '█░░ 5', '█░░ 6', '█░░ 6', '█░░ 7', '█░░ 8', '█░░ 8', '█░░ 8', '█░░ 8', '█░░ 9', '█░ 10']
];

function toBigText(str, bigCharsArray) {
	str = [...str]; // Proper split
	let bigText = [];
	for (let lineNr = 0; lineNr < bigCharsArray.length; lineNr++) {
		bigText[lineNr] = ['', ''];
		let lineWidth = 0;
		let linesExceeded = 0; // Also current chunk number

		for (let charNr = 0; charNr < str.length; charNr++) {
			let bigCharPart = [];
			let charWidth = 0;
			bigCharPart[lineNr] = bigCharsArray[lineNr][chars.indexOf(str[charNr].toUpperCase())];

			if (bigCharPart[lineNr] == null) {
				bigCharPart[lineNr] = bigCharsArray[lineNr][chars.indexOf(removeDiacritics(str[charNr]).toUpperCase())];
				if (bigCharPart[lineNr] == null)
					bigCharPart[lineNr] = str[charNr];
			}

			let bigCharPartS = [...bigCharPart[lineNr]];
			if (str[charNr] === ' ')
				charWidth += 1.4;
			else
				charWidth += (bigCharPartS.length);
			charWidth += 1.4; // Add space to end

			lineWidth += charWidth;

			let playerName = getOwnerName();
			if (lineWidth > (maxLineWidth - [...playerName].length)) {
				linesExceeded++; // 1 line won't fit, add new chunk
				lineWidth = charWidth;
			}

			if (linesExceeded > 1) {
				linesExceeded = 1;
				break;
			}
			// Add big character part
			bigText[lineNr][linesExceeded] += (bigCharPart[lineNr] + ' ');
		}

		// Remove last space
		bigText[lineNr][linesExceeded] = bigText[lineNr][linesExceeded].substring(0, bigText[lineNr][linesExceeded].length - 1);
	}

	return bigText;
}

function sendBigText(str, bigCharsArray) {
	const bigText = toBigText(str, bigCharsArray);
	console.debug(bigText);

	for (let lineNr = 0; lineNr < bigText.length; lineNr++) {
		sendChat_s(bigText[lineNr][0]);
	}
	if (bigText[0][1].length > 0) {
		setTimeout(() => {
			for (let lineNr = 0; lineNr < bigText.length; lineNr++) {
				sendChat_s(bigText[lineNr][1]);
			}
		}, 3000);
	}
}

function sendBigTextFromInput(bigCharsArray) {
	const iframeBody = document.querySelector('iframe').contentDocument.body;
	const input = iframeBody.querySelector('[data-hook="input"]');

	if (input?.value?.length > 0) {
		sendBigText(input.value, bigCharsArray);
	}
}

// Sends chat with avatars of all players in the room
function printPlayerAvatars() {
	// When the player has no avatar set, it is chosen from his order value.
	// Spec players with no avatar set would have avatar 0, so ignore them.
	sendChat_s(g.getPlayerList()
		.filter(p => p.avatar != null || p.order > 0)
		.map(p => p.avatar == null ? p.order : p.avatar).join(' ')
	);
}

function printFlagCounter() {
	const flags = {};
	g.getPlayerList()
		.map(p => p.flag)
		.reduce((acc, val) => {
			flags[val] = (flags[val] == null ? 0 : flags[val]) + 1;
		});
	sendChat_s(JSON.stringify(flags));
}

/* =====  Avatar functions  ===== */
function setAvatar_s(avatar) {
	const roomManager = getCurrentRoomManager();
	if (roomManager?.setAvatar != null) {
		//console.debug("avatar: " + avatar);
		roomManager.setAvatar(avatar);
	}
	else {
		sendChat_s('/avatar ' + avatar);

		const iframeBody = document.querySelector('iframe').contentDocument.body;
		const chatLog = iframeBody.querySelector('.log-contents');
		if (chatLog != null) {
			const paragraphs = Array.from(chatLog.querySelectorAll('p'));
			const lastParagraph = paragraphs[paragraphs.length - 1];

			// Delete the Avatar set notice
			if (lastParagraph.innerText === 'Avatar set') {
				chatLog.removeChild(lastParagraph);
				scrollToBottom(chatLog);
			}
		}
	}
	currentAvatar = avatar;
	avatarChangedJustBefore = true;
	clearTimeout(avatarChangedResetTimeout);
	avatarChangedResetTimeout = setTimeout(() => {
		avatarChangedJustBefore = false;
	}, minAvatarIntervalMs);
}

function setAvatarFromArray(stringArray, intervalInMs) {
	cancelAvatar();

	if (stringArray[avatarIndex] != null) {
		setAvatar_s(stringArray[avatarIndex]);
		avatarIndex++;
	}
	intervalAvatar = setInterval(() => {
		if (stringArray[avatarIndex] != null) {
			setAvatar_s(stringArray[avatarIndex]);
			avatarIndex++;
		}
		else
			cancelAvatar();
	}, intervalInMs);
}

function setAvatarBelt(string, intervalInMs) {
	let string1 = string.replaceAll(/\s/g, '_');
	string1 = '__' + string1 + '__';
	const stringArray = [];
	for (let i = 1; i < string1.length; i++) {
		const twoSubstring = string1.substring(i - 1, i + 1);
		stringArray.push(twoSubstring);
	}

	setAvatarFromArray(stringArray, intervalInMs);
}

function cancelAvatar() {
	setAvatar_s(defaultAvatar);
	avatarIndex = 0;
	clearInterval(intervalAvatar);
}

/* =====  Avatar displaying the alphabet in belt  ===== */
class StringIdGenerator {
	constructor(chars = 'aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ') {
		this._chars = chars;
		this._nextId = [0];
	}

	next() {
		const r = [];
		for (const char of this._nextId) {
			r.unshift(this._chars[char]);
		}
		this._increment();
		return r.join('');
	}

	_increment() {
		for (let i = 0; i < this._nextId.length; i++) {
			const val = ++this._nextId[i];
			if (val >= this._chars.length)
				this._nextId[i] = 0;
			else
				return;
		}
		this._nextId.push(0);
	}

	* [Symbol.iterator]() {
		while (true) {
			yield this.next();
		}
	}
}

// let letters = new StringIdGenerator('AÁĂÂÄÀĀĄÅǺÃÆǼBCĆČÇĈĊDĎĐÐEÉĔĚÊËĖÈĒĘFGĞĢĜĠHĤĦIÍĬÎÏİÌĪĮĨJĴKĶLĹĽĻĿŁMNŃŇŅÑOÓŎÔÖŐÒŌØǾÕŒPÞQRŔŘŖSŚŠŞŜȘẞTŤŢȚŦÞUÚŬÛÜŰÙŪŲŮŨVWẂŴẄẀXYÝŶŸỲĲZŹŽŻaáăâäàāąåǻãæǽbcćčçĉċdďđðeéĕěêëėèēęfgğģĝġhĥħiíĭîïiìīįĩjĵkķlĺľļŀłmnńňņñoóŏôöőòōøǿõœpþqrŕřŗsśšşŝșßtťţțŧþuúŭûüűùūųůũvwẃŵẅẁxyýŷÿỳĳzźžż');
let letters = new StringIdGenerator('AÁĂÂÄÀĀĄÅǺÃÆǼBCĆČÇĈĊDĎĐÐEÉĔĚÊËĖÈĒĘFGĞĢĜĠHĤĦIÍĬÎÏİÌĪĮĨJĴKĶLĹĽĻĿŁMNŃŇŅÑOÓŎÔÖŐÒŌØǾÕŒPÞQRŔŘŖSŚŠŞŜȘẞTŤŢȚŦÞUÚŬÛÜŰÙŪŲŮŨVWẂŴẄẀXYÝŶŸỲĲZŹŽŻ');

function setIncrementalLetterAvatar() {
	setAvatar_s(letters.next());
}

/* =====  Key handling  ===== */
document.querySelector('iframe').contentDocument.body.addEventListener('keydown', (event) => {
	const keyName = event.key;

	// If Alt key is also being pressed
	if (event.altKey) {
		// Jeżeli nie naciśnięto tylko Alta
		// If Alt isn't the only key pressed
		if (keyName !== 'Alt') {
			//console.log('Alt + ' + keyName);
		}

		switch (keyName) {
			case '2':
				if (insideRoom)
					sendBigTextFromInput(bigChars2);
				break;
			case '3':
				if (insideRoom)
					sendBigTextFromInput(bigChars3);
				break;
			case 'i':
				dynamicArrows = !dynamicArrows;
				break;
			case 'a':
				if (insideRoom)
					printPlayerAvatars();
				break;
			case 'f':
				if (insideRoom)
					printFlagCounter();
				break;
			case 'b':
				if (insideRoom)
					sendBigText('BRAMA', bigChars3);
				break;
			case 'g':
				if (insideRoom)
					sendBigText('GOAL', bigChars3);
				break;
			case 's':
				if (insideRoom)
					slapAll('');
				break;
			case 'h':
				if (insideRoom)
					slapAll('Hello there');
				break;
			case 'o':
				if (insideRoom)
					slapAll('Prepare ur anus');
				break;
			case 'n':
				if (insideRoom)
					slapAll('NIE ŚPIMY');
				break;
			case 'y':
				if (insideRoom) {
					// Causes kick with Bad Actor
					cancelAvatar();
					for (let i = 0; i < 500; i++)
						setAvatar_s(defaultAvatar);
				}
				break;
			case ',':
				// Starts/resumes the alphabet avatar
				clearInterval(intervalAvatar);
				if (insideRoom)
					intervalAvatar = setInterval(setIncrementalLetterAvatar, 500);
				break;
			case '.':
				// Pauses the alphabet avatar
				clearInterval(intervalAvatar);
				break;
			case '/':
				// Resets the alphabet to A
				// letters = new StringIdGenerator('AÁĂÂÄÀĀĄÅǺÃÆǼBCĆČÇĈĊDĎĐÐEÉĔĚÊËĖÈĒĘFGĞĢĜĠHĤĦIÍĬÎÏİÌĪĮĨJĴKĶLĹĽĻĿŁMNŃŇŅÑOÓŎÔÖŐÒŌØǾÕŒPÞQRŔŘŖSŚŠŞŜȘẞTŤŢȚŦÞUÚŬÛÜŰÙŪŲŮŨVWẂŴẄẀXYÝŶŸỲĲZŹŽŻaáăâäàāąåǻãæǽbcćčçĉċdďđðeéĕěêëėèēęfgğģĝġhĥħiíĭîïiìīįĩjĵkķlĺľļŀłmnńňņñoóŏôöőòōøǿõœpþqrŕřŗsśšşŝșßtťţțŧþuúŭûüűùūųůũvwẃŵẅẁxyýŷÿỳĳzźžż');
				letters = new StringIdGenerator('AÁĂÂÄÀĀĄÅǺÃÆǼBCĆČÇĈĊDĎĐÐEÉĔĚÊËĖÈĒĘFGĞĢĜĠHĤĦIÍĬÎÏİÌĪĮĨJĴKĶLĹĽĻĿŁMNŃŇŅÑOÓŎÔÖŐÒŌØǾÕŒPÞQRŔŘŖSŚŠŞŜȘẞTŤŢȚŦÞUÚŬÛÜŰÙŪŲŮŨVWẂŴẄẀXYÝŶŸỲĲZŹŽŻ');
				break;
		}
	}
	// If Alt key is released
	else {
		//console.log(keyName);

		switch (keyName) {
			case 'y':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarFromArray(['🟨'], 2500);
					else
						cancelAvatar();
				}
				break;
			case 'k':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarFromArray(['KU', 'R', 'WA'], 300);
					else
						cancelAvatar();
				}
				break;
			case 'l':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarFromArray(['KU', 'R', 'DE'], 300);
					else
						cancelAvatar();
				}
				break;
			case 'b':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarBelt('BRAMA', 300);
					else
						cancelAvatar();
				}
				break;
			case 'f':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarBelt('NIC SIĘ NIE STAŁO', 300);
					else
						cancelAvatar();
				}
				break;
			case 'e':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarBelt('MIAŁEŚ CHAMIE ZŁOTY RÓG', 300);
					else
						cancelAvatar();
				}
				break;
			case 'j':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarFromArray(['mb'], 2500);
					else
						cancelAvatar();
				}
				break;
			case 'n':
				if (insideRoom) {
					if (avatarIndex === 0)
						setAvatarBelt('Natenczas Wojski chwycił na taśmie przypięty swój róg bawoli, długi, cętkowany, kręty jak wąż boa, oburącz do ust go przycisnął, wzdął policzki jak banię, w oczach krwią zabłysnął, zasunął wpół powieki, wciągnął w głąb pół brzucha i do płuc wysłał z niego cały zapas ducha, i zagrał: róg jak wicher, wirowatym dechem niesie w puszczę muzykę i podwaja echem. Umilkli strzelcy, stali szczwacze zadziwieni mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, jakby psiarnię w nie wpuścił i rozpoczął łowy. Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie. Tu przerwał, lecz róg trzymał; wszystkim się zdawało, że Wojski wciąż gra jeszcze, a to echo grało. Zadął znowu; myśliłbyś, że róg kształty zmieniał i że w ustach Wojskiego to grubiał, to cieniał, udając głosy zwierząt: to raz w wilczą szyję przeciągając się, długo, przeraźliwie wyje, znowu jakby w niedźwiedzie rozwarłszy się garło, ryknął; potem beczenie żubra wiatr rozdarło. Tu przerwał, lecz róg trzymał; wszystkim się zdawało, że Wojski wciąż gra jeszcze, a to echo grało. Wysłuchawszy rogowej arcydzieło sztuki, powtarzały je dęby dębom, bukom buki. Dmie znowu: jakby w rogu były setne rogi, słychać zmieszane wrzaski szczwania, gniewu, trwogi, strzelców, psiarni i zwierząt; aż Wojski do góry podniósł róg, i tryumfu hymn uderzył w chmury. Tu przerwał, lecz róg trzymał; wszystkim się zdawało, że Wojski wciąż gra jeszcze, a to echo grało. Ile drzew, tyle rogów znalazło się w boru, jedne drugim pieśń niosą jak z choru do choru. I szła muzyka coraz szersza, coraz dalsza, coraz cichsza i coraz czystsza, doskonalsza, aż znikła gdzieś daleko, gdzieś na niebios progu! Wojski obiedwie ręce odjąwszy od rogu rozkrzyżował; róg opadł, na pasie rzemiennym chwiał się. Wojski z obliczem nabrzmiałym, promiennym, z oczyma wzniesionymi, stał jakby natchniony, łowiąc uchem ostatnie znikające tony. A tymczasem zagrzmiało tysiące oklasków, tysiące powinszowań i wiwatnych wrzasków.', 500);
					else
						cancelAvatar();
				}
				break;
			case 'ArrowLeft':
				if (insideRoom) {
					if (dynamicArrows && !leftPressedLast) {
						leftPressedLast = true;
						rightPressedLast = false;
						avatarIndex = 0;
						clearInterval(intervalAvatar);
						setAvatar_s('👈');
					}
				}
				break;
			case 'ArrowRight':
				if (insideRoom) {
					if (dynamicArrows && !rightPressedLast) {
						leftPressedLast = false;
						rightPressedLast = true;
						avatarIndex = 0;
						clearInterval(intervalAvatar);
						setAvatar_s('👉');
					}
				}
				break;
			case 'i':
				const roomManager = getCurrentRoomManager();
				if (roomManager != null && roomManager.showChatIndicator != null) {
					chatIndicatorForced = !chatIndicatorForced;
					roomManager.showChatIndicator(chatIndicatorForced);
				}
				break;
		}
	}
}, false);

function scrollToBottom(node) {
	// If the node isn't being hovered at
	if (node.querySelector(':hover') == null) {
		// Scroll to top
		node.scrollTop = 0;
		// And after a while, scroll to bottom
		setTimeout(() => {
			node.scrollTop = 9999;
		}, 20);
		// This should prevent the empty space at the bottom of the chat after a row deletion or shrinking
	}
}

/* =====  OZJASZ  ===== */
// Wersja pierwotna: https://codepen.io/AubreyDeLosDestinos/pen/vwrQxr
// Wersja 2.0: https://www.facebook.com/Zblizeniowy/photos/pom%C3%B3%C5%BC-januszowi-korwin-mikkemu-napisa%C4%87-jego-pierwsze-sejmowe-przem%C3%B3wienie-w-nowe/2859621214089525/
const wersy = [
	[
		'Proszę zwrócić uwagę, że ',
		'I tak mam trzy razy mniej czasu, więc proszę mi pozwolić powiedzieć: ',
		'Państwo się śmieją, ale ',
		'Ja nie potrzebowałem edukacji seksualnej, żeby wiedzieć, że ',
		'No niestety: ',
		'Gdzie leży przyczyna problemu? Ja państwu powiem: ',
		'Państwo chyba nie widzą, że ',
		'Oświadczam kategorycznie: ',
		'Powtarzam: ',
		'Powiedzmy to z całą mocą: ',
		'W Polsce dzisiaj: ',
		'Państwo sobie nie zdają sprawy, że ',
		'To ja przepraszam bardzo: ',
		'Otóż nie wiem, czy pan wie, że ',
		'Yyyyy... ',
		'Ja chcę powiedzieć jedną rzecz: ',
		'Trzeba powiedzieć jasno: ',
		'Jak powiedział wybitny krakowianin Stanisław Lem, ',
		'Proszę mnie dobrze zrozumieć: ',
		'Ja chciałem państwu przypomnieć, że ',
		'Niech państwo nie mają złudzeń: ',
		'Powiedzmy to wyraźnie: '
	],
	[
		'właściciele niewolników',
		'związkowcy',
		'trockiści',
		'tak zwane dzieci kwiaty',
		'rozmaici urzędnicy',
		'federaści',
		'etatyści',
		'ci durnie i złodzieje',
		'ludzie wybrani głosami meneli spod budki z piwem',
		'socjaliści pobożni',
		'socjaliści bezbożni',
		'komuniści z krzyżem w zębach',
		'agenci obcych służb',
		'członkowie Bandy Czworga',
		'pseudo-masoni z Wielkiego Wschodu Francji',
		'przedstawiciele czerwonej hołoty',
		'ci wszyscy (tfu!) geje',
		'funkcjonariusze reżymowej telewizji',
		'tak zwani ekolodzy',
		'ci wszyscy (tfu!) demokraci',
		'agenci bezpieki',
		'feminazistki'
	],
	[
		' po przeczytaniu „Manifestu komunistycznego” ',
		', którymi się brzydzę, ',
		', których nienawidzę, ',
		' z okolic „Gazety Wyborczej” ',
		', czyli taka żydokomuna, ',
		', odkąd zniesiono karę śmierci, ',
		', którymi pogardzam, ',
		', których miejsce w normalnym kraju jest w więzieniu, ',
		' na polecenie Brukseli ',
		' posłusznie ',
		' bezmyślnie ',
		' z nieprawdopodobną pogardą dla człowieka ',
		' za pieniądze podatników ',
		' zgodnie z ideologią LGBTQZ ',
		' za wszelką cenę ',
		' zupełnie bezkarnie ',
		' całkowicie bezczelnie ',
		' o poglądach na lewo od komunizmu ',
		' celowo i świadomie ',
		' z premedytacją ',
		' od czasów Okrągłego Stołu ',
		' w ramach postępu '
	],
	[
		'udają homoseksualistów',
		'niszczą rodzinę',
		'idą do polityki',
		'zakazują góralom robienia oscypków',
		'organizują paraolimpiady',
		'wprowadzają ustrój, w którym raz na 4 lata można wybrać sobie pana',
		'ustawiają fotoradary',
		'wprowadzają dotacje',
		'wydzielają buspasy',
		'podnoszą wiek emerytalny',
		'rżną głupa',
		'odbierają dzieci rodziców',
		'wprowadzają absurdalne przepisy',
		'umieszczają dzieci w szkołach koedukacyjnych',
		'wprowadzają parytety',
		'nawołują do podniesienia podatków',
		'próbują wyrzucić kierowców z miast',
		'próbują skłócić Polskę z Rosją',
		'głoszą brednie o globalnym ociepleniu',
		'zakazują posiadania broni',
		'nie dopuszczają prawicy do władzy',
		'uczą dzieci homoseksualizmu'
	],
	[
		', żeby poddawać wszystkich tresurze',
		', bo taka jest ich natura',
		', bo chcą wszystko kontrolować',
		', bo nie rozumieją, że socjalizm nie działa',
		', żeby wreszcie zapanował socjalizm',
		', dokładnie tak jak tow. Janosik',
		', zamiast pozwolić ludziom zarabiać',
		', żeby wyrwać kobiety z domu',
		', bo to jest w interesie tak zwanych ludzi pracy',
		', zamiast pozwolić decydować konsumentowi',
		', żeby nie opłacało się mieć dzieci',
		', zamiast obniżyć podatki',
		', bo nie rozumieją, że selekcja naturalna jest czymś dobrym',
		', żeby mężczyźni przestali być agresywni',
		', bo dzięki temu mogą brać łapówki',
		', bo dzięki temu mogą kraść',
		', bo dostają za to pieniądze',
		', bo tak się uczy w państwowej szkole',
		', bo bez tego (tfu!) demokracja nie może istnieć',
		', bo głupich jest więcej niż mądrych',
		', bo chcą tworzyć raj na ziemi',
		', bo chcą niszczyć cywilizację białego człowieka'
	],
	[
		', co ma zresztą tyle samo sensu, co zawody w szachach dla debili.',
		', co zostało dokładnie zaplanowane w Magdalence przez śp. generała Kiszczaka.',
		' i trzeba być idiotą, żeby ten system popierać.',
		', ale nawet ja jeszcze dożyję normalnych czasów.',
		', co dowodzi, że wyskrobano nie tych, co trzeba.',
		', a zwykłym ludziom wmawiają, że im coś „dadzą”.',
		' – cóż: chcieliście (tfu!) demokracji, to macie.',
		', dlatego trzeba zlikwidować koryto, a nie zmieniać świnie.',
		', a wystarczyłoby przestać wypłacać zasiłki.',
		', podczas gdy normalni ludzie uważani są za dziwaków.',
		', co w wieku dziewiętnastym po prostu by wyśmiano.',
		' – dlatego w społeczeństwie jest równość, a powinno być rozwarstwienie.',
		', co prowadzi Polskę do katastrofy.',
		' – dlatego trzeba przywrócić normalność.',
		', ale w wolnej Polsce pójdą siedzieć',
		' przez kolejne kadencje.',
		', o czym się nie mówi.',
		' i właśnie dlatego Europa umiera.',
		', ale przyjdą muzułmanie i zrobią porządek.',
		' – tak samo zresztą jak za Hitlera.',
		' – proszę zobaczyć, co się dzieje na Zachodzie, jeśli mi państwo nie wierzą.',
		', co lat temu sto nikomu nie przyszłoby nawet do głowy.'
	]
];

let sentence = '';
let previous = [null, null, null, null, null, null];

// https://stackoverflow.com/a/4960020
const random = (from, to) => Math.floor(Math.random() * to) + from;

const differentThan = (value) => {
	const newValue = random(0, 21);
	return newValue === value ? differentThan(value) : newValue;
};

const generateKorwinSentence = () => wersy.reduce((soFar, current, index) => {
		previous[index] = differentThan(previous[index]);
		return '' + soFar + current[previous[index]];
	}, ''
);

/* =====  Functions  ===== */
function mutePlayerId(playerId, duration, fontSize) {
	if (duration == null && isNaN(duration))
		duration = 5 * 60;
	if (fontSize == null && isNaN(fontSize))
		fontSize = shrunkFontSize;

	// If duration or fontSize is 0 or less, unmute
	if (duration <= 0 || fontSize < 0)
		unmutePlayerName(playerId);
	// Else mute
	else {
		// Clear unmute timeout
		clearTimeout(mutedIds[playerId]?.timeoutId);
		// Unmute the player after duration seconds
		const unmuteTimeoutId = setTimeout(() => {
			unmutePlayerId(playerId);
		}, duration * 1000);
		// Add the player name to muted
		mutedIds[playerId] = {size: fontSize, timeoutId: unmuteTimeoutId};
		console.log('#' + playerId + ' muted for ' + duration + ' seconds (font size: ' + fontSize + ')');
	}
}

function unmutePlayerId(playerId) {
	clearTimeout(mutedIds[playerId]?.timeoutId);
	mutedIds[playerId] = null;
	console.log('#' + playerId + ' mute expired');
}

function mutePlayerName(playerName, duration, fontSize) {
	if (duration == null && isNaN(duration))
		duration = 5 * 60;
	if (fontSize == null && isNaN(fontSize))
		fontSize = shrunkFontSize;

	// If duration or fontSize is 0 or less, unmute
	if (duration <= 0 || fontSize < 0)
		unmutePlayerName(playerName);
	// Else mute
	else {
		// Clear unmute timeout
		clearTimeout(mutedNames[playerName]?.timeoutId);
		// Unmute the player after duration seconds
		const unmuteTimeoutId = setTimeout(() => {
			unmutePlayerName(playerName);
		}, duration * 1000);
		// Add the player name to muted
		mutedNames[playerName] = {size: fontSize, timeoutId: unmuteTimeoutId};
		console.log(playerName + ' muted for ' + duration + ' seconds (font size: ' + fontSize + ')');
	}
}

function unmutePlayerName(playerName) {
	clearTimeout(mutedNames[playerName]?.timeoutId);
	mutedNames[playerName] = null;
	console.log(playerName + ' mute expired');
}

function checkAndHandleCommand(message, byPlayer) {
	// Handle admin commands
	if (byPlayer.name === getOwnerName()) {
		// ^mute <name> [fontsize]
		if (message.startsWith('^mute ')) {
			const rest = message.substring(6);
			const lastSpacePos = rest.lastIndexOf(' ');
			const playerName = rest.substring(0, lastSpacePos);
			const fontSize = Number.parseFloat(rest.substring(lastSpacePos + 1));

			mutePlayerName(playerName, 5 * 60, fontSize);
		}
		// ^cicho <name> [fontsize]
		if (message.startsWith('^cicho ')) {
			const rest = message.substring(7);
			const lastSpacePos = rest.lastIndexOf(' ');
			const playerName = rest.substring(0, lastSpacePos);
			const fontSize = Number.parseFloat(rest.substring(lastSpacePos + 1));

			mutePlayerName(playerName, 5 * 60, fontSize);
		}
	}
	// Handle other commands
	// .korwin
	if (isOzjasz && message === '.korwin') {
		const byName = byPlayer.name;

		// If a player can use the command
		if (bannedFromOzjasz[byName] !== true) {
			// Ban the player from using the command
			bannedFromOzjasz[byName] = true;
			// Unban after 10 seconds
			setTimeout(() => {
				bannedFromOzjasz[byName] = false;
			}, 10000);

			let ks = generateKorwinSentence();
			console.log(byPlayer.name + ': ' + ks);
			const ksArray = [];
			// Max message length
			const MAXLEN = 140;
			// While generated sentence is too long
			while (ks.length > MAXLEN) {
				// Last space index so that sentence is no longer than maxLen chars long
				const sliceIndex1 = ks.lastIndexOf(' ', MAXLEN);
				// Sentence cut to last space
				const ksPart = ks.substring(0, sliceIndex1);
				// Add sentence part to array
				ksArray.push(ksPart);
				// Sentence is now the other sentence part
				ks = ks.substring(sliceIndex1 + 1);
			}
			// Push the final sentence part
			ksArray.push(ks);

			ksArray.forEach(ks => {
				sendChat_s(ks);
			});
		}
		else {
			console.log(byPlayer.name + ' tried to use .korwin but failed');
		}
	}
}

// Returns distance between two points with x and y coordinates.
function getDistanceBetweenPoints(point1, point2) {
	const distance1 = point1.x - point2.x;
	const distance2 = point1.y - point2.y;
	return Math.sqrt(distance1 * distance1 + distance2 * distance2);
}

function isTouchingBall(player) {
	const ballPosition = g.getBallPosition();
	const distancePlayerToBall = getDistanceBetweenPoints(player.position, ballPosition);
	const playerRadius = g.getPlayerDiscProperties(player.id).radius;
	const ballRadius = g.getDiscProperties(0).radius;
	const maxBallTouchDistance = ballRadius + playerRadius + 0.01;
	return distancePlayerToBall < maxBallTouchDistance;
}

/**
 * Checks if the last ball kick illustrated by two xy points sent it towards the team's goal.
 *
 * @param {[{x: number, y: number}, {x: number, y: number}]} twoPointsArray two-element array of {x,y} coordinates
 * @param {number} targetTeam team id
 * @param {{x: number, y: number}} goalBounds goal post coordinates (always positive – assuming they are symmetrical to (0,0) point)
 */
function isKickedBallHeadingGoal(twoPointsArray, targetTeam, goalBounds) {
	if (twoPointsArray == null || twoPointsArray.length < 2 || goalBounds == null)
		return false;
	let t = targetTeam === 1 ? -1 : 1;
	let goalX = goalBounds.x * t;
	let goalY = goalBounds.y;
	let k1 = twoPointsArray[0];
	let k2 = twoPointsArray[1];
	// What will be the y if the x is the goal line x
	let fy = (k2.y - k1.y) * (goalX - k1.x) / (k2.x - k1.x) + k1.y;
	return Math.abs(fy) < goalY;
}

function stopAndSaveReplay(roomManager = getCurrentRoomManager()) {
	if (roomManager != null) {
		const gameReplayArray = roomManager.stopReplay();
		if (gameReplayArray != null) {
			const replayName = previousScores == null ? 'n-n' : previousScores.red + '-' + previousScores.blue + '_' + Math.floor(previousScores.time) + 's';
			lastReplay = new Replay(gameReplayArray, Date.now(), replayName, roomManager);
			replays.push(lastReplay);
			console.log('lastReplay: %o. Write lastReplay.download() to save it!', lastReplay);

			addReplayToIDB(lastReplay);
		}
	}
}

/**
 * Gets an object from given object store from given IDB database.
 *
 * @param {string} dbName IDB database name
 * @param {string} objectStoreName Object store name
 * @param {number} id Id of the object store's entry. If omitted, all entries will be returned
 * @param {number} dbVersion Don't pass this argument directly, it will update database to this version if needed.
 * @return {Promise<Array>} If resolved, it returns an array of object store entries.
 */
function getObjectFromStore(dbName, objectStoreName, id, dbVersion) {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, dbVersion);
		request.onupgradeneeded = ev => {
			const db = request.result;
			db.onerror = reject;
			// If db didn't exist
			if (ev.oldVersion < 1) {
				db.createObjectStore(objectStoreName, {autoIncrement: true});
				console.debug('Created db ' + dbName + ' with store ' + objectStoreName);
			}
			// If the object store didn't exist
			else if (!db.objectStoreNames.contains(objectStoreName)) {
				db.createObjectStore(objectStoreName, {autoIncrement: true});
				console.debug('Created store ' + objectStoreName + ' in ' + dbName);
			}
		};

		request.onsuccess = ev => {
			const db = request.result;
			db.onerror = reject;

			// If the object store didn't exist
			if (!db.objectStoreNames.contains(objectStoreName)) {
				db.close();
				console.debug('No ' + objectStoreName + ' store in ' + dbName + '. Closed db.');
				const newVersion = request.result.version + 1;
				console.debug('Opening new request v' + newVersion);
				// Re-run this function to create the object store. It should reach here only once
				const newRequestResult = getObjectFromStore(dbName, objectStoreName, id, newVersion);
				newRequestResult.then(resolve, reject);
			}
			else {
				const transaction = db.transaction(objectStoreName, 'readonly');
				transaction.onabort = ev => {
					reject(ev);
					db.close();
				};
				transaction.onerror = ev => {
					reject(ev);
					db.close();
				};
				transaction.oncomplete = () => db.close();

				let getRequest;
				const store = transaction.objectStore(objectStoreName);
				const results = [];
				if (id == null)
					getRequest = store.openCursor();
				else
					getRequest = store.openCursor(IDBKeyRange.only(id));
				getRequest.onsuccess = () => {
					const cursor = getRequest.result;
					if (cursor) {
						const key = cursor.key;
						const value = cursor.value;
						results.push({id: key, value: value});
						cursor.continue();
					}
					else {
						resolve(results);
					}
				};
				getRequest.onerror = reject;

			}
		};

		request.onerror = reject;
		request.onblocked = reject;
	});
}

/**
 * Adds an object to given object store from given IDB database.
 *
 * @param {string} dbName IDB database name
 * @param {string} objectStoreName Object store name
 * @param {{}} obj Object to add to store
 * @param {number} dbVersion Don't pass this argument directly, it will update database to this version if needed.
 * @return {Promise<Array>} If resolved, it returns the key of added object.
 */
function addObjectToStore(dbName, objectStoreName, obj, dbVersion = undefined) {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, dbVersion);
		request.onupgradeneeded = ev => {
			const db = request.result;
			db.onerror = reject;
			// If db didn't exist
			if (ev.oldVersion < 1) {
				db.createObjectStore(objectStoreName, {autoIncrement: true});
				console.debug('Created db ' + dbName + ' with store ' + objectStoreName);
			}
			// If the object store didn't exist
			else if (!db.objectStoreNames.contains(objectStoreName)) {
				db.createObjectStore(objectStoreName, {autoIncrement: true});
				console.debug('Created store ' + objectStoreName + ' in ' + dbName);
			}
		};

		request.onsuccess = ev => {
			const db = request.result;
			db.onerror = reject;

			// If the object store didn't exist
			if (!db.objectStoreNames.contains(objectStoreName)) {
				db.close();
				console.debug('No ' + objectStoreName + ' store in ' + dbName + '. Closed db.');
				const newVersion = request.result.version + 1;
				console.debug('Opening new request v' + newVersion);
				const newRequestResult = addObjectToStore(dbName, objectStoreName, obj, newVersion);
				newRequestResult.then(resolve, reject);
			}
			else {
				const transaction = db.transaction(objectStoreName, 'readwrite');
				transaction.onabort = ev => {
					reject(ev);
					db.close();
				};
				transaction.onerror = ev => {
					reject(ev);
					db.close();
				};
				transaction.oncomplete = () => db.close();

				let addRequest;
				try {
					addRequest = transaction.objectStore(objectStoreName).add(obj);
					addRequest.onsuccess = () => resolve(addRequest.result);
					addRequest.onerror = reject;
				}
				catch (e) {
					reject(e);
				}
			}
		};

		request.onerror = reject;
		request.onblocked = reject;
	});
}

/**
 * Adds player to players object store.
 *
 * @param {{}} player Player object
 */
function addPlayerToIDB(player) {
	const roomId = lastRoomLink.substring(lastRoomLink.indexOf('?c=') + 3);
	const roomName = g.getRoomState()?.name;
	const playerObject = {
		addDate: Date.now(),
		uuid: roomId + '#' + player.id,
		id: player.id,
		name: player.name,
		flag: player.flag,
		avatar: player.avatar,
		roomName: roomName
	};
	addObjectToStore('db', 'players', playerObject)
		.then(key => console.debug('Added player ' + key + ' to IDB'));
}

/**
 * Adds replay to replays object store.
 *
 * @param {Replay} replay Replay object
 */
function addReplayToIDB(replay) {
	const roomLink = replay.roomManager.roomLink;
	const roomId = roomLink.substring(roomLink.indexOf('?c=') + 3);
	const replayObject = {
		roomId: roomId,
		replayArray: replay.replayArray,
		timestamp: replay.timestamp,
		name: replay.name,
		roomName: replay.roomManager.room.roomState.name
	};
	addObjectToStore('db', 'replays', replayObject)
		.then(key => console.debug('Added replay ' + key + ' to IDB'));
}
/* =====  Functions  ===== */

// Game instance from game-min.js, just for debugging
let gameInst;

/* =====  Events (modified game-min.js required)  ===== */
g.onRoomJoin = roomManager => {
	insideRoom = true;
	console.log('Joined room: %o', roomManager);

	lastOwnerId = roomManager.room.playerId;
	// Save current scores
	previousScores = g.getScores();
	// Start replay
	roomManager.startReplay();
};

g.onRoomLeave = roomManager => {
	insideRoom = false;
	console.log('Left room: %o', roomManager);

	// Stop replay
	stopAndSaveReplay(roomManager);
};

g.onRoomLink = url => {
	if (url !== lastRoomLink) {
		lastRoomLink = url;
		log_c('Room link: ' + url);
		g.getPlayerList().forEach(p => addPlayerToIDB(p));
	}
	else
		log_c('Room link: ' + url, Color.SPAM);
};

g.onPlayerJoin = player => {
	insideRoom = true;
	log_c('[+] ' + player.name + '#' + player.id + ' has joined', Color.JOIN);

	addPlayerToIDB(player);
};

g.onPlayerLeave = player => {
	insideRoom = true;
	log_c('[-] ' + player.name + '#' + player.id + ' has left', Color.LEAVE);
};

g.onPlayerKicked = (player, reason, ban, byPlayer) => {
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	const reasonText = reason?.length > 0 ? ' (' + reason + ')' : '';
	if (ban)
		log_c('[🔫] ' + player.name + '#' + player.id + ' was banned' + byPlayerText + reasonText, Color.KICK);
	else
		log_c('[👟] ' + player.name + '#' + player.id + ' was kicked' + byPlayerText + reasonText, Color.KICK);
};

g.onPlayerChat = (byPlayer, message) => {
	insideRoom = true;
	// Log time and replace all RLTO characters that reverse the message
	const roomName = g.getRoomState().name;
	const datetime = (new Date).toLocaleString();
	const time = (new Date).toLocaleTimeString();
	const playerEntry = byPlayer.name + '#' + byPlayer.id;
	const entry = message.replaceAll('\u202e', '[RTLO]');
	chatHistory.push({roomName: roomName, date: datetime, player: byPlayer, entry: entry});
	if (logChat)
		console.log((time + ' ' + playerEntry + ': ' + message).replaceAll('\u202e', '[RTLO]'));

	// If a bogus character is spammed
	if (message.split('﷽').length > 5) {
		const iframeBody = document.querySelector('iframe').contentDocument.body;
		const chatLog = iframeBody.querySelector('.log');
		const paragraphs = Array.from(chatLog.querySelectorAll('p'));
		const lastParagraph = paragraphs[paragraphs.length - 1];

		// Replace it with dots and shrink chat line
		lastParagraph.innerText = byPlayer.name + ': ' + message.replaceAll('﷽', '.');
		lastParagraph.style.fontSize = shrunkFontSize + 'em';
		scrollToBottom(chatLog);
	}
	// If the player id in muted ids has a positive font size value
	if (mutedIds[byPlayer.id]?.size >= 0) {
		const iframeBody = document.querySelector('iframe').contentDocument.body;
		const chatLog = iframeBody.querySelector('.log');
		const paragraphs = Array.from(chatLog.querySelectorAll('p'));
		const lastParagraph = paragraphs[paragraphs.length - 1];

		// Shrink chat line
		lastParagraph.style.fontSize = mutedIds[byPlayer.id].size + 'em';
		scrollToBottom(chatLog);
	}

	// Handle player commands
	checkAndHandleCommand(message, byPlayer);
};

g.onAnnouncement = (anText, color, style, sound) => {
	insideRoom = true;
	const logAnnouncement = text => {
		const rgbaStringFromInt = a => 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
		let styleStr = '';
		if (color >= 0)
			styleStr += 'color:' + rgbaStringFromInt(color) + ';';
		switch (style) {
			case 1:
			case 4:
				styleStr += 'font-weight:900;';
				break;
			case 2:
			case 5:
				styleStr += 'font-style:italic;';
		}
		switch (style) {
			case 3:
			case 4:
			case 5:
				styleStr += 'font-size:10px;';
		}

		console.log('%c' + text, styleStr);
	};

	const roomName = g.getRoomState().name;
	const datetime = (new Date).toLocaleString();
	const time = (new Date).toLocaleTimeString();
	// Replace all RLTO characters that reverse the message display order
	const entry = anText.replaceAll('\u202e', '[RLTO]');
	announcementHistory.push({roomName: roomName, date: datetime, entry: entry});

	// In jakjus rooms
	if (roomName.includes('hb.jakjus.com')) {
		// Player name
		let playerName = null;
		// Player rank
		let playerRank = null;
		// Player emblems (premium star, card)
		let playerEmblems = null;
		// Only message without player name and rank
		let onlyMessage = null;
		// match returns array of matched capture groups: index 0 is whole match, 1 is the 1st capture group, etc...
		// Example: the announcement – «Player name (Silver): sample text» – matches the following capture groups marked with ⟨⟩:
		// ⟨Player name⟩ (⟨Silver⟩)⟨ 🟥 ⭐⟩: ⟨sample text⟩
		let matches = anText.match(/(.*) \((Unranked|Bronze|Silver|Gold|Diamond|Master)\)(.*): (.*)/);
		if (matches?.length > 1) {
			playerName = matches[1];
			playerRank = matches[2];
			playerEmblems = matches[3];
			onlyMessage = matches[4];
		}

		// If the message is from a player and onlyMessage exists
		if (playerName != null && onlyMessage != null) {
			// If a bogus character is spammed
			if (onlyMessage.split('﷽').length > 5) {
				const iframeBody = document.querySelector('iframe').contentDocument.body;
				const chatLog = iframeBody.querySelector('.log');
				const paragraphs = Array.from(chatLog.querySelectorAll('p'));
				const lastParagraph = paragraphs[paragraphs.length - 1];

				// Replace with dots and shrink chat line
				lastParagraph.innerText = anText.replaceAll('﷽', '.');
				lastParagraph.style.fontSize = shrunkFontSize + 'em';
				lastParagraph.style.minHeight = '0px';
				scrollToBottom(chatLog);
			}
			// If the player id in muted ids has a positive font size value
			if (mutedNames[playerName]?.size >= 0) {
				const iframeBody = document.querySelector('iframe').contentDocument.body;
				const chatLog = iframeBody.querySelector('.log');
				const paragraphs = Array.from(chatLog.querySelectorAll('p'));
				const lastParagraph = paragraphs[paragraphs.length - 1];

				// Shrink chat line
				lastParagraph.style.fontSize = mutedNames[playerName]?.size + 'em';
				lastParagraph.style.minHeight = '0px';
				scrollToBottom(chatLog);
			}

			// Log chat announcement on level 1
			if (logAnnouncements === 1)
				logAnnouncement(time + ' ▌' + entry);

			// Handle player commands
			checkAndHandleCommand(onlyMessage, {name: playerName});
		}
		// Log every announcement on level 2
		if (logAnnouncements === 2)
			logAnnouncement(time + ' ▌' + entry);
	}
	// In other rooms
	else {
		// Log all announcements in other rooms on level 1 and 2
		if (logAnnouncements >= 1)
			logAnnouncement(time + ' ▌' + entry);
	}
};

function onPlayerBallTouch(byPlayer, ballTouchType) {
	insideRoom = true;
	// If the ball was kicked
	if (ballTouchType === BallTouchType.KICK) {
		// This player touched the ball
		// If the player hasn't touched the ball just before
		if (lastPlayersWhoTouchedBall[0]?.player?.id !== byPlayer.id) {
			// Add him to the array
			lastPlayersWhoTouchedBall.unshift({player: byPlayer, touchType: BallTouchType.KICK});
			// And delete the last 4th player
			if (lastPlayersWhoTouchedBall.length > 3)
				lastPlayersWhoTouchedBall.pop();
		}
		// If the player has touched the ball just before
		else if (lastPlayersWhoTouchedBall[0] != null) {
			// Update only his last touch type
			lastPlayersWhoTouchedBall[0].touchType = BallTouchType.KICK;
		}

		// Write first ball position after kick
		// Second position will be added in onGameTick event after it finds 1-element array in lastKickDirection
		const firstBallPos = g.getBallPosition();
		lastKickDirection[byPlayer.id] = [firstBallPos];

		if (announceBallKick) {
			// Delay it a bit because lastKickDirection completes inside onGameTick
			setTimeout(() => {
				const enemyTeam = byPlayer.team === 0 ? 0 : byPlayer.team === 1 ? 2 : 1;
				// Negative: red half. Positive: blue half
				const pitchHalfSign = enemyTeam === 0 ? 0 : enemyTeam === 1 ? -1 : 1;
				// If the ball in on enemy half and ball is heading enemy goal
				if (Math.sign(g.getBallPosition()?.x) === pitchHalfSign && isKickedBallHeadingGoal(lastKickDirection[byPlayer.id], enemyTeam, g.getGoalPostPoint())) {
					const nazwaB = odmienionaNazwa(byPlayer.name, biernik);
					sendChat_s('👟⚽ Piłka kopnięta w światło bramki przez ' + nazwaB);
					console.debug('%c👟⚽ Piłka kopnięta w światło bramki przez ' + nazwaB, 'font-size:0.8em;');
				}
			}, 50);
		}
	}
	// If the ball was touched
	else {
		// If the player hasn't touched the ball just before
		if (lastPlayersWhoTouchedBall[0]?.player == null || lastPlayersWhoTouchedBall[0].player.id !== byPlayer.id) {
			// Add him to the array
			lastPlayersWhoTouchedBall.unshift({player: byPlayer, touchType: BallTouchType.TOUCH});
			// And delete the last 4th player
			if (lastPlayersWhoTouchedBall.length > 3)
				lastPlayersWhoTouchedBall.pop();
		}
		// If the player has touched the ball just before
		else if (lastPlayersWhoTouchedBall[0] != null) {
			// Update only his last touch type
			lastPlayersWhoTouchedBall[0].touchType = BallTouchType.TOUCH;
		}
	}
	// If a touch type is of no consideration
	if (ballTouchChangesAvatar) {
		const touchingAvatar = (byPlayer.avatar == null ? byPlayer.order : byPlayer.avatar).toString();
		// If avatar is going to change
		if (currentAvatar !== touchingAvatar) {
			// If avatar wasn't changed just before
			if (!avatarChangedJustBefore) {
				setAvatar_s(touchingAvatar);
				//console.debug('Ball touched. Avatar changed to ' + touchingAvatar);
			}
		}
	}

	// Invoke pre-defined functions
	onPlayerBallTouchEndFunctions.forEach(f => f(byPlayer, ballTouchType));
}

g.onPlayerBallKick = byPlayer => {
	onPlayerBallTouch(byPlayer, BallTouchType.KICK);
};

g.onTeamGoal = team => {
	insideRoom = true;
	const scores = g.getScores();

	const m = Math.trunc(scores.time / 60);
	const s = Math.trunc(scores.time % 60);
	const goalTime = m + ':' + String(s).padStart(2, '0'); // m:ss

	const enemyTeam = team === 0 ? 0 : team === 1 ? 2 : 1;
	let goalscorer = lastPlayersWhoTouchedBall[0]?.player;
	let lastPasser = lastPlayersWhoTouchedBall[1]?.player;
	let assistGiver = null;

	let isOwnGoal = goalscorer != null ? goalscorer.team !== team : false;
	let goalPostPoint = g.getGoalPostPoint();

	// If last ball kick of last passer is fully registered
	if (lastKickDirection[lastPasser?.id]?.length === 2) {
		// If there was an own goal and last passer was from the other team and kicked ball was heading towards goal
		if (isOwnGoal && goalscorer?.team !== lastPasser.team &&
			isKickedBallHeadingGoal(lastKickDirection[lastPasser.id], enemyTeam, goalPostPoint)) {
			// The goal would be scored regardless of that own goal. Ignore that own goal.
			goalscorer = lastPasser;
			lastPasser = lastPlayersWhoTouchedBall[2]?.player;
			isOwnGoal = false;
		}
	}

	// Check if there is an assist
	if (lastPasser != null) {
		// Both players must be in the same team after normal goal OR in different teams after own goal
		if (!isOwnGoal && lastPasser.team === goalscorer?.team || isOwnGoal && lastPasser.team !== goalscorer?.team)
			assistGiver = lastPasser;
	}

	const teamIcon = team === 1 ? '🔴' : team === 2 ? '🔵' : '⬜';
	const scoreText = scores.red + ':' + scores.blue;
	const goalScorerText = goalscorer != null ? ' ' + goalscorer.name : '';
	const assistText = assistGiver != null ? ' (' + assistGiver.name + ')' : '';
	let ogText = isOwnGoal ? ' (sam.)' : '';
	log_c('⚽ ' + scoreText + ' ' + teamIcon + ' ' + goalTime + goalScorerText + assistText + ogText, Color.GOAL);

	if (announceGoal) {
		ogText = isOwnGoal ? ' samobójcza' : '';
		const goalScorerTextB = goalscorer != null ? ' przez ' + odmienionaNazwa(goalscorer.name, biernik) : '';
		const assistTextD = assistGiver != null ? ' po podaniu ' + odmienionaNazwa(assistGiver.name, dopelniacz) : '';
		sendChat_s('⚽' + teamIcon + ' ' + goalTime + ' Bramka' + ogText + ' na ' + scoreText + ' zdobyta' + goalScorerTextB + assistTextD);
	}
};

g.onTeamVictory = team => {
	insideRoom = true;
	log_c('Team ' + team + ' has won the match', Color.VICTORY);
};

g.onGamePause = (byPlayer, isPaused) => {
	insideRoom = true;
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	if (isPaused)
		log_c('⏸️ Game paused' + byPlayerText, Color.PAUSE);
	else
		log_c('⏯️ Game resumed' + byPlayerText, Color.PAUSE);
};

g.onTimeIsUp = () => {
	insideRoom = true;
	log_c('Time is up', Color.VICTORY);
};

g.onPositionsReset = () => {
	insideRoom = true;
	//log_c('Positions reset');

	lastPlayersWhoTouchedBall = [];
	lastKickDirection = [];
};

g.onGameStart = byPlayer => {
	insideRoom = true;
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	log_c('▶️ Game started' + byPlayerText, Color.START);

	lastPlayersWhoTouchedBall = [];
	lastKickDirection = [];

	// Start replay recording on game start
	getCurrentRoomManager().startReplay();
	// Save current scores
	previousScores = g.getScores();
};

g.onGameStop = byPlayer => {
	insideRoom = true;
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	log_c('⏹️ Game stopped' + byPlayerText, Color.STOP);

	stopAndSaveReplay();
};

g.onStadiumChange = (byPlayer, stadiumName, checksum) => {
	insideRoom = true;
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	const checksumText = checksum != null ? ' (' + checksum + ')' : '';
	log_c('🏟️ Stadium ' + stadiumName + checksumText + ' loaded' + byPlayerText, Color.STADIUM);
};

g.onPlayerDesyncChange = (player, desynchronized) => {
	insideRoom = true;
	if (desynchronized)
		log_c('⚠️ ' + player?.name + '#' + player?.id + ' has desynchronized', Color.DESYNC);
	else
		log_c('🔧 ' + player?.name + '#' + player?.id + ' is back in sync', Color.DESYNC);
};

g.onPlayerTeamChange = (player, byPlayer, team) => {
	insideRoom = true;
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	log_c(player.name + '#' + player.id + ' was moved to ' + team + byPlayerText, Color.TEAM);
};

g.onPlayerAdminChange = (player, byPlayer, admin) => {
	insideRoom = true;
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	if (admin)
		log_c('👑 ' + player.name + '#' + player.id + ' was given admin rights' + byPlayerText, Color.ADMIN);
	else
		log_c('👑❌ ' + player.name + '#' + player.id + ' admin rights were taken away' + byPlayerText, Color.ADMIN);
};

g.onChatIndicatorStateChange = (player, chatIndicatorShown) => {
	insideRoom = true;
	/*
	if (chatIndicatorShown)
		console.log('💬 ' + player?.name + '#' + player?.id + ' is typing');
	else
		console.log('💬 ' + player?.name + '#' + player?.id + ' is no more typing');
	*/
};

g.onGameTick = game => {
	insideRoom = true;
	gameInst = game;

	const ballPos = g.getBallPosition();
	const players = g.getPlayerList();
	// For each player
	players.forEach(p => {
		// If player is in the game
		if (p.position != null) {
			// If the player is touching the ball
			if (isTouchingBall(p)) {
				onPlayerBallTouch(p, BallTouchType.TOUCH);
			}

			// Complete kick direction here
			// Add second ball coordinate. First was written in ball kick event
			if (lastKickDirection[p.id] != null && lastKickDirection[p.id].length === 1) {
				lastKickDirection[p.id].push(ballPos);
			}
		}
	});

	// Invoke pre-defined functions
	onGameTickEndFunctions.forEach(f => f(game));

	// Save current scores
	previousScores = g.getScores();
};

g.onKickRateLimitSet = (min, rate, burst, byPlayer) => {
	insideRoom = true;
	const byPlayerText = byPlayer == null ? '' : ' by ' + byPlayer.name + '#' + byPlayer.id;
	log_c('Kick Rate Limit set to (min: ' + min + ', rate: ' + rate + ', burst: ' + burst + ')' + byPlayerText, Color.KICKRATE);
};
/* =====  Events (modified game-min.js required)  ===== */

console.clear();