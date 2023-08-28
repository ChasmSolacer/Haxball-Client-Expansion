const flashscore_logger_version = 'Alpha 1.7.1';
/*
* Description: This script observes the Flashscore commentary section. When a comment appears, it gets printed to Haxball chat.
*
* ⚠️ WARNING ⚠️: it uses iFrames. Working with them will violate the same domain policy.
* To circumvent the same origin policy, you need to add some FLAGS to browser executable.
* This will only work in Chromium based browsers (Chrome, Edge, Brave), steps for other browsers are unknown. (There could be a better way to do this, but it is also unknown.)
* Source: https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome#comment124721890_3177718
*
* 🪟 Steps for Windows 🪟:
* 1.  ❌ Close all Chromium instances.
* 2.  📁 Make a new folder inside C: and name it ChromeDev (or whatever but make sure to replace the C://ChromeDev part later). It will use up to 1 GB
* 3.  Make a shortcut of the browser exe file, open its Properties → Shortcut and paste the following at the bottom of the text field (between quotes, without quotes):
*     "--disable-web-security --disable-site-isolation-trials --disable-features=IsolateOrigins,site-per-process --user-data-dir="C://ChromeDev"
*     Remember, if your new folder is not C://ChromeDev, replace C://ChromeDev with the patch where you created the new folder
* 4.  Apply and OK.
* 5.  Open the shortcut and go to https://www.haxball.com/play.
* 6.  Disable ad blockers and/or Brave Shield for this site.
* 7.  Paste this script to the console.
*
* After that a flashscore overlay will appear. It will only show some text.
* You can press "Alt + ;" to hide/show it (click outside the overlay first for keyboard shortcuts to work).
*
* If you are in a room, a comment will be sent in the chat as soon as it appears in Flashscore commentary section.
*
* If you want to load a match, call OverlayManager.createOverlay().loadFlashscoreMatchCommentary function. Scroll to bottom of this file for an example.
* After a flashscore page appears, don't click anything on it (but if you do, don't panic, just don't switch tabs).
*/

// Version check
fetch('https://raw.githubusercontent.com/ChasmSolacer/Haxball-Client-Expansion/master/versions.json')
	.then(r => r.json()).then(vs => {
	const githubVersion = vs?.['hce_flashscore-logger'];
	console.info('Flashscore Logger ' + flashscore_logger_version);
	if (githubVersion?.length > 0) {
		if (flashscore_logger_version !== githubVersion)
			console.info('⬇️ Latest main version: ' + githubVersion + '. Get it at https://raw.githubusercontent.com/ChasmSolacer/Haxball-Client-Expansion/master/flashscore_logger.js');
	}
	else
		console.warn('Version check failed');
});

// Modified game-min.js g object. Not necessary in this script.
let g = window.g;
// Haxball iframe body
let iframeDocument = document.querySelector('.gameframe').contentDocument;
let iframeBody = document.querySelector('.gameframe').contentDocument.body;

// List of all active overlays in bottom right corner
const overlayListDiv = document.createElement('div');
overlayListDiv.style.className = 'overlayList';
overlayListDiv.style.position = 'absolute';
overlayListDiv.style.float = 'right';
overlayListDiv.style.bottom = '1px';
overlayListDiv.style.right = '1px';
overlayListDiv.style.maxWidth = '150px';
overlayListDiv.style.maxHeight = '150px';
overlayListDiv.style.backgroundColor = '#0008';
overlayListDiv.style.paddingBottom = '1px';
overlayListDiv.style.color = '#FFC';
overlayListDiv.style.fontSize = '0.85em';
overlayListDiv.style.overflowY = 'auto';
overlayListDiv.style.zIndex = '5';
// Toolbar with buttons
const overlayListToolbarDiv = document.createElement('div');
overlayListToolbarDiv.className = 'overlayListToolbar';
overlayListToolbarDiv.style.display = 'block';
overlayListToolbarDiv.style.padding = '4px';
// Create overlay button
const btnCreateOverlay = document.createElement('button');
btnCreateOverlay.className = 'btnCreateOverlay';
btnCreateOverlay.innerText = '+';
btnCreateOverlay.title = 'Create overlay';
btnCreateOverlay.style.fontSize = '20px';
btnCreateOverlay.style.lineHeight = '17px';
btnCreateOverlay.style.width = '20px';
btnCreateOverlay.style.height = '20px';
btnCreateOverlay.style.overflow = 'hidden';
btnCreateOverlay.onclick = () => OverlayManager.createOverlay();
// Append elements
overlayListToolbarDiv.appendChild(btnCreateOverlay);
overlayListDiv.appendChild(overlayListToolbarDiv);
iframeBody.appendChild(overlayListDiv);

class CMEntry {
	/**
	 *
	 * @param {ContextMenu} parentMenu
	 * @param {string} text
	 * @param {Function} onclickFunction
	 * @param {ContextMenu} subMenu
	 */
	constructor(parentMenu, text, onclickFunction, subMenu) {
		this.parentMenu = parentMenu;
		this.text = text;
		this.onclickFunction = onclickFunction;
		this.subMenu = subMenu;

		this.element = document.createElement('span');
		this.element.className = 'contextMenuEntry';
		this.element.innerText = text + (subMenu != null ? ' >' : '');
		this.element.style.display = 'block';
		this.element.style.cursor = 'pointer';
		this.element.style.whiteSpace = 'pre';
		this.element.style.paddingTop = '2px';
		this.element.style.paddingBottom = '2px';
		this.element.style.paddingLeft = '4px';
		this.element.style.paddingRight = '4px';
		this.element.style.borderBottom = '1px solid #FFC';

		this.element.onmouseover = () => {
			// Unhighlight other same-level entries
			this.parentMenu.entries.forEach(entry => entry.unhighlight());
			// Highlight entry
			this.highlight();
		};
		if (this.subMenu != null) {
			this.subMenu.onmouseover = () => {
				console.debug('addEntry cm onmouseover: Mouse over submenu ' + this.subMenu.menu.id);
			};
		}
		if (onclickFunction != null)
			this.element.onclick = onclickFunction;
		else {
			this.element.onclick = ev => {
				// Prevent other onclick events from firing
				ev.stopPropagation();
			};
		}
	}

	highlight() {
		this.element.style.backgroundColor = '#339E';
		// If this entry contains a context menu, show it
		if (this.subMenu != null) {
			//this.subMenu.show(this.element.getBoundingClientRect().right + iframeDocument.defaultView.scrollX, this.element.getBoundingClientRect().top + iframeDocument.defaultView.scrollY);
			this.subMenu.showAtEntry(this);
		}
	}

	unhighlight() {
		this.element.style.backgroundColor = 'inherit';
		// If this entry contains a context menu, remove it
		if (this.subMenu != null)
			this.subMenu.remove();
	}
}

// Context menu, added on right click. Don't use new ContextMenu directly, use ContextMenuManager.createContextMenu() instead.
class ContextMenu {
	constructor() {
		this.level = 0;
		this.parentMenu = null;
		this.menu = document.createElement('div');
		this.menu.className = 'contextMenu';
		this.menu.id = 'menuLevel0';
		this.menu.style.position = 'absolute';
		this.menu.style.zIndex = '99';
		this.menu.style.backgroundColor = '#333E';
		this.menu.style.color = '#FFC';
		this.menu.style.fontSize = '0.9em';
		this.menu.style.borderTop = '1px solid #FFC';
		this.menu.style.borderLeft = '1px solid #FFC';
		this.menu.style.borderRight = '1px solid #FFC';
		this.menu.style.overflow = 'auto';

		/** @type {CMEntry[]} */
		this.entries = [];
	}

	setLevel(number) {
		this.level = number;
		this.menu.id = 'menuLevel' + number;
	}

	remove() {
		for (const entry of this.entries) {
			const subMenu = entry.subMenu;
			if (subMenu != null)
				// Do this again for the submenu
				subMenu.remove();
		}
		// Remove menu element from document
		this.menu.remove();
	}

	addEntry(text, onclickFunction, contextMenu) {
		if (contextMenu != null)
			contextMenu.setLevel(this.level + 1);
		const newEntry = new CMEntry(this, text, onclickFunction, contextMenu);

		// Add entry to entries array
		this.entries.push(newEntry);
		// Add entry span to menu div
		this.menu.appendChild(newEntry.element);
	}

	/**
	 * Temporarily adds this menu to DOM and gets its bounding box.
	 *
	 * @return {DOMRect}
	 */
	getRect() {
		this.menu.hidden = false;
		iframeBody.appendChild(this.menu);
		const rect = this.menu.getBoundingClientRect();
		iframeBody.removeChild(this.menu);
		return rect;
	}

	/**
	 * Moves one of this menu's corner to the specified coordinates so that the menu doesn't go offscreen, and then shows it.
	 *
	 * @param {number} x Page coordinate x in pixels
	 * @param {number} y Page coordinate y in pixels
	 * @param {number} offset Diagonal distance between coordinates and menu's corner
	 */
	showAtPoint(x, y, offset = 2) {
		const parentDocument = iframeDocument.documentElement;
		// Get page dimensions
		const pageWidth = parentDocument.scrollWidth;
		const pageHeight = parentDocument.scrollHeight;
		const clientWidth = parentDocument.clientWidth;
		const clientHeight = parentDocument.clientHeight;
		const scrollX = parentDocument.scrollLeft;
		const scrollY = parentDocument.scrollTop;
		// Get menu dimensions
		let menuRect = this.getRect();
		const rectWidth = menuRect.width;
		const rectHeight = menuRect.height;
		// Assuming left corner
		const rectRightP = x + offset + rectWidth;
		// Assuming right corner
		const rectLeftP = x - offset - rectWidth;
		// Assuming top corner
		const rectBottomP = y + offset + rectHeight;
		// Assuming bottom corner
		const rectTopP = y - offset - rectHeight;

		// If menu is wider than page
		if (rectWidth > pageWidth) {
			// Shrink it to fit the page
			this.menu.style.width = 'calc(100% - 2px)';
		}
		// If menu fits in horizontally when x is left corner
		else if (rectRightP <= pageWidth) {
			// Stick menu's left to the x coordinate
			this.menu.style.left = (x + offset) + 'px';
		}
		// If menu goes offscreen when x is left corner
		else {
			// If menu fits in horizontally when x is right corner
			if (rectLeftP >= 0) {
				// Stick menu's right to the x coordinate
				this.menu.style.right = (clientWidth - x + offset) + 'px';
			}
			// If menu goes offscreen when x is right (and left) corner
			else {
				// Stick menu to the nearest horizontal page bound
				if (rectLeftP > pageWidth - x) {
					// left = 0 will stick to client left side but not page left side when it's scrolled horizontally. This needs to be corrected.
					this.menu.style.left = -scrollX + 'px';
				}
				else {
					this.menu.style.right = -(pageWidth - clientWidth) + 'px';
				}
			}
		}

		// If menu is higher than page
		if (rectHeight > pageHeight) {
			// Shrink it to fit the page
			this.menu.style.height = 'calc(100% - 1px)';
		}
		// If menu fits in vertically when y is top corner
		else if (rectBottomP <= pageHeight) {
			// Stick menu's top to the y coordinate
			this.menu.style.top = (y + offset) + 'px';
		}
		// If menu goes offscreen when y is top corner
		else {
			// If menu fits in horizontally when y is bottom corner
			if (rectTopP >= 0) {
				// Stick menu's bottom to the y coordinate
				this.menu.style.bottom = (clientHeight - y + offset) + 'px';
			}
			// If menu goes offscreen when y is bottom (and top) corner
			else {
				// Stick menu to the nearest vertical page bound
				if (rectTopP > pageWidth - y) {
					// left = 0 will stick to client top side but not page top side when it's scrolled vertically. This needs to be corrected.
					this.menu.style.top = -scrollY + 'px';
				}
				else {
					this.menu.style.bottom = -(pageHeight - clientHeight) + 'px';
				}
			}
		}

		this.show();
	}

	/**
	 * Moves this menu next to entry provided but not offscreen, and then shows it.
	 *
	 * @param {CMEntry} entry Entry object that has its div added to DOM.
	 */
	showAtEntry(entry) {
		if (entry?.element != null) {
			const parentDocument = iframeDocument.documentElement;
			// Get page dimensions
			const pageWidth = parentDocument.scrollWidth;
			const pageHeight = parentDocument.scrollHeight;
			const clientWidth = parentDocument.clientWidth;
			const clientHeight = parentDocument.clientHeight;
			const scrollX = parentDocument.scrollLeft;
			const scrollY = parentDocument.scrollTop;
			// Get entry bounds
			const entryRect = entry.element.getBoundingClientRect();
			// Entry sides' page coordinates
			const entryTopP = entryRect.top + scrollY;
			const entryRightP = entryRect.right + scrollX;
			const entryBottomP = entryRect.bottom + scrollY;
			const entryLeftP = entryRect.left + scrollX;

			// Get menu dimensions
			let rect = this.getRect();
			const menuWidth = rect.width;
			const menuHeight = rect.height;

			// If menu is wider than page |000000|00
			if (menuWidth > pageWidth) {
				// Shrink it to fit the page
				this.menu.style.width = 'calc(100% - 2px)';
			}
			// If menu fits in horizontally when attached to right of entry |----00001111--|
			else if (entryRightP + menuWidth <= pageWidth) {
				// Stick menu's left to the right of the entry
				this.menu.style.left = entryRightP + 'px';
			}
			// If menu goes offscreen when attached to right of entry |--------000011|11
			else {
				// If menu fits in horizontally when attached to left of entry |-11110000000--|
				if (entryLeftP - menuWidth >= 0) {
					// Stick menu's right to the left of the entry
					this.menu.style.right = (clientWidth - entryLeftP) + 'px';
				}
				// If menu goes offscreen when attached to left (and right) of entry 1|111100000000--|
				else {
					// Stick menu to the nearest horizontal page bound
					if (entryLeftP > pageWidth - entryRightP) {
						// left = 0 will stick to client left side but not page left side when it's scrolled horizontally. This needs to be corrected.
						this.menu.style.left = -scrollX + 'px';
					}
					else {
						this.menu.style.right = -(pageWidth - clientWidth) + 'px';
					}
				}
			}

			// If menu is higher than page
			if (menuHeight > pageHeight) {
				console.debug('Menu is higher than page: ' + menuHeight + ' > ' + pageHeight);
				// Shrink it to fit the page
				this.menu.style.height = 'calc(100% - 1px)';
			}
			// If menu fits in vertically when attached to top of entry |--°𝙸--|
			else if (entryTopP + menuHeight <= pageHeight) {
				// Stick menu's top to the top of the entry
				this.menu.style.top = entryTopP + 'px';
			}
			// If menu goes offscreen when attached to top of entry |--°T--|
			else {
				console.debug('Out of bottom bound: ' + (entryTopP + menuHeight) + ' > ' + pageHeight);
				// If menu fits in vertically when attached to bottom of entry |--o𝙸--|
				if (entryBottomP - menuHeight >= 0) {
					// Stick menu's bottom to the bottom of the entry
					this.menu.style.bottom = (clientHeight - entryBottomP) + 'px';
				}
				// If menu goes offscreen when attached to bottom (and top) of entry |--o⟘--|
				else {
					console.debug('Out of top bound: ' + (entryBottomP - menuHeight) + ' < 0');
					// Stick menu to the nearest vertical page bound
					if (entryTopP > pageHeight - entryBottomP) {
						console.debug('Need to stick to top page bound');
						// top = 0 will stick to client top side but not page top side when it's scrolled vertically. This needs to be corrected.
						this.menu.style.top = -scrollY + 'px';
					}
					else {
						console.debug('Need to stick to bottom page bound');
						this.menu.style.bottom = -(pageHeight - clientHeight) + 'px';
					}
				}
			}

			this.show();
		}
		else {
			console.warn('Menu ' + this.menu.id + ' cannot be shown because parent entry doesn\'t exist');
		}
	}

	/**
	 * Adds this menu to DOM with a fade-in animation.
	 */
	show() {
		iframeBody.appendChild(this.menu);

		this.menu.animate(
			[
				{opacity: '0'},
				{opacity: '1'}
			], {
				duration: 250
			}
		);
	}
}

class ContextMenuManager {
	/** @type {ContextMenu} */
	static contextMenu = null;

	static createContextMenu() {
		ContextMenuManager.removeContextMenu();
		ContextMenuManager.contextMenu = new ContextMenu();
	}

	static removeContextMenu() {
		if (ContextMenuManager.contextMenu?.remove != null)
			ContextMenuManager.contextMenu?.remove();
	}
}

iframeDocument.onclick = () => ContextMenuManager.removeContextMenu();

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
		pl: '/#/szczegoly-meczu/komentarz-live',
		en: '/#/match-summary/live-commentary',
		es: '/#/resumen-del-partido/comentarios-en-directo',
		de: '/#/spiel-zusammenfassung/live-kommentar',
		it: '/#/informazioni-partita/cronaca-live',
		fr: '/#/resume-du-match/match-en-direct',
		pt: '/#/sumario-do-jogo/comentarios-ao-vivo',
		tr: '/#/mac-ozeti/canli-yorum',
		uk: '/#/match-summary/live-commentary',
		dk: '/#/kampreferat/live-kommentarer',
		nl: '/#/samenvatting-wedstrijd/live-commentaar',
		sv: '/#/matchsummering/livereferat',
		cs: '/#/prehled-zapasu/live-komentar',
		sk: '/#/prehlad-zapasu/live-komentar',
		sl: '/#/povzetek-dogodka/komentarji-v-zivo',
		hr: '/#/detalji/uzivo-komentar',
		sr: '/#/pregled-meca/komentari-uzivo',
		fi: '/#/ottelun-yhteenveto/live-kommentit',
		ro: '/#/sumar-meci/comentariu-live',
		hu: '/#/osszefoglalas/elo-kommentar',
		el: '/#/match-summary/live-commentary',
		id: '/#/ringkasan-pertandingan/komentatori-langsung',
		vi: '/#/tom-tat-tran-dau/binh-luan-truc-tiep'
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
const translate = (translatableObject, language) => translatableObject[language] || translatableObject['en'];

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

// If game-mod.js is loaded, it returns room manager which is needed to send chat without using a text field
function getCurrentRoomManager() {
	let roomManager;
	try {
		roomManager = insideRoom ? g?.getRoomManager() : null;
	}
	catch (e) {
		return null;
	}

	return roomManager;
}

// Function to send chat, no matter if the modified game-min.js is present or not
function sendChat_s(message) {
	const roomManager = getCurrentRoomManager();
	// If modified game-min.js is loaded, just send chat
	if (roomManager?.sendChat != null)
		roomManager.sendChat(message);
	// Legacy, uses input text field
	else {
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

/**
 * Extracts a comment text from soccer row.
 *
 * @param {Element} row
 * @return {string}
 */
function getCommentFromSoccerRow(row) {
	return row?.querySelector('.soccer__comment')?.innerText?.trim() || '';
}

const sIcon = ['◽', '🔸', '🔹'];

class Overlay {
	/**
	 * Don't call new Overlay, use {@link OverlayManager.createOverlay} for proper initialization.
	 * Creates an overlay with blank iFrames and adds it to document.
	 *
	 * @param {string} language Language code
	 */
	constructor(language = 'en') {
		this.id = OverlayManager.overlays.length + 1;
		this.matchId = '';
		this.team1Code = '';
		this.team2Code = '';
		this.language = language;
		this.suspended = false;
		this.chatInterval = 0;

		// Overlay – div which will contain the flashscore iFrame.
		// It is draggable followed by the orange area, show and hide it by pressing Alt + ;
		this.fDivOverlay = document.createElement('div');
		this.fDivOverlay.className = 'overlay';
		this.fDivOverlay.style.position = 'absolute';
		this.fDivOverlay.style.float = 'left';
		this.fDivOverlay.style.padding = '8px';
		this.fDivOverlay.style.paddingTop = '16px';
		this.fDivOverlay.style.opacity = '0.75';
		this.fDivOverlay.style.textAlign = 'center';
		this.fDivOverlay.style.backgroundColor = '#f8' + OverlayManager.overlays.length % 10;
		this.fDivOverlay.style.border = '3px solid #666';
		this.fDivOverlay.style.zIndex = '3';
		this.fDivOverlay.style.cursor = 'move';
		this.fDivOverlay.style.top = OverlayManager.overlays.length * 10 + 'px';
		this.fDivOverlay.style.left = OverlayManager.overlays.length * 10 + 'px';

		// Some hints on what can be done to the overlay
		this.hintSpan = document.createElement('span');
		this.hintSpan.style.display = 'block';
		this.hintSpan.style.color = 'black';
		this.hintSpan.style.fontWeight = '900';
		this.hintSpan.style.fontSize = '1.3em';
		this.hintSpan.style.maxWidth = '400px';

		// Link input container
		this.linkInputDiv = document.createElement('div');
		this.linkInputDiv.style.display = 'table';
		this.linkInputDiv.style.color = 'black';
		this.linkInputDiv.style.fontSize = '0.95em';
		this.linkInputDiv.style.width = '100%';
		this.linkInputDiv.style.maxWidth = '400px';
		this.linkInputDiv.style.paddingTop = '4px';
		this.linkInputDiv.style.paddingBottom = '4px';
		this.linkInputDiv.style.whiteSpace = 'nowrap';
		this.linkInputDiv.style.overflowX = 'auto';
		this.linkInputDiv.style.cursor = 'auto';
		// Prevent dragging from this element
		this.linkInputDiv.onmousedown = ev => {
			ev.stopPropagation();
		};
		// Prevent conflicting with game input keys
		this.linkInputDiv.onkeydown = ev => {
			ev.stopPropagation();
		};

		// Link input label
		this.labelLink = document.createElement('label');
		this.labelLink.htmlFor = 'matchLink';
		this.labelLink.innerText = 'Match link'
		this.labelLink.style.display = 'table-cell';
		this.labelLink.style.width = '1px';
		this.labelLink.style.whiteSpace = 'nowrap';
		this.labelLink.style.paddingRight = '4px';
		this.linkInputDiv.appendChild(this.labelLink);

		// Match id input
		this.inputLink = document.createElement('input');
		this.inputLink.name = 'matchLink';
		this.inputLink.placeholder = 'https://www.flashscore.com/match/GbHo73tP';
		this.inputLink.title = 'Flashscore match link goes here';
		this.labelLink.style.display = 'table-cell';
		this.inputLink.style.backgroundColor = 'white';
		this.inputLink.style.borderWidth = '1px';
		this.inputLink.style.width = 'calc(100% - 2px)';
		this.inputLink.oninput = ev => {
			const inputVal = ev.target.value;
			if (inputVal.startsWith('https://')) {
				// Get 4th occurence of "/" in inputVal
				const matchIdIndex = inputVal.split('/', 4).join('/').length + 1;
				const link1 = inputVal.substring(0, matchIdIndex);
				this.matchId = inputVal.substring(matchIdIndex, matchIdIndex + 8);
				for (let lang in Str.COMMENTARY_LINK1) {
					if (Str.COMMENTARY_LINK1[lang] === link1) {
						// Change language to lang
						this.language = lang;
					}
				}
				this.updateElements();
			}
		};
		this.linkInputDiv.appendChild(this.inputLink);

		// Parameters input container
		this.paramInputsDiv = document.createElement('div');
		this.paramInputsDiv.style.display = 'block';
		this.paramInputsDiv.style.color = 'black';
		this.paramInputsDiv.style.fontSize = '0.95em';
		this.paramInputsDiv.style.maxWidth = '400px';
		this.paramInputsDiv.style.paddingTop = '4px';
		this.paramInputsDiv.style.paddingBottom = '4px';
		this.paramInputsDiv.style.whiteSpace = 'nowrap';
		this.paramInputsDiv.style.overflowX = 'auto';
		this.paramInputsDiv.style.cursor = 'auto';
		// Prevent dragging from this element
		this.paramInputsDiv.onmousedown = ev => {
			ev.stopPropagation();
		};
		// Prevent conflicting with game input keys
		this.paramInputsDiv.onkeydown = ev => {
			ev.stopPropagation();
		};
		// Animations
		function greenFadeOut(element) {
			element.animate(
				[
					{backgroundColor: '#0F05'},
					{backgroundColor: 'revert'}
				],
				{
					duration: 250
				}
			);
		}
		// Match id input
		this.inputMatchId = document.createElement('input');
		this.inputMatchId.placeholder = 'GbHo73tP';
		this.inputMatchId.title = 'Match id';
		this.inputMatchId.style.width = '100px';
		this.inputMatchId.style.display = 'inline-block';
		this.inputMatchId.style.backgroundColor = 'white';
		this.inputMatchId.style.borderWidth = '1px';
		this.paramInputsDiv.appendChild(this.inputMatchId);
		// Team1 input
		this.inputTeam1 = document.createElement('input');
		this.inputTeam1.placeholder = 'BRA';
		this.inputTeam1.title = 'Home team abbreviation';
		this.inputTeam1.style.width = '50px';
		this.inputTeam1.style.display = 'inline-block';
		this.inputTeam1.style.backgroundColor = 'white';
		this.inputTeam1.style.borderWidth = '1px';
		this.inputTeam1.oninput = ev => {
			this.team1Code = ev.target.value;
			this.updateElements();
			greenFadeOut(ev.target);
		};
		this.paramInputsDiv.appendChild(this.inputTeam1);
		// Team2 input
		this.inputTeam2 = document.createElement('input');
		this.inputTeam2.placeholder = 'GER';
		this.inputTeam2.title = 'Away team abbreviation';
		this.inputTeam2.style.width = '50px';
		this.inputTeam2.style.display = 'inline-block';
		this.inputTeam2.style.backgroundColor = 'white';
		this.inputTeam2.style.borderWidth = '1px';
		this.inputTeam2.oninput = ev => {
			this.team2Code = ev.target.value;
			this.updateElements();
			greenFadeOut(ev.target);
		};
		this.paramInputsDiv.appendChild(this.inputTeam2);
		// Lang select
		this.selectLang = document.createElement('select');
		this.selectLang.title = 'Language';
		this.selectLang.style.display = 'inline-block';
		this.selectLang.style.backgroundColor = 'white';
		Object.keys(Str.COMMENTARY_LINK1).forEach(lang => {
			const option = document.createElement('option');
			option.innerText = lang;
			option.value = lang;
			this.selectLang.appendChild(option);
		});
		this.paramInputsDiv.appendChild(this.selectLang);
		// Suspended select
		this.selectSuspended = document.createElement('select');
		this.selectSuspended.title = 'Suspend observer start?';
		this.selectSuspended.style.display = 'inline-block';
		this.selectSuspended.style.backgroundColor = 'white';
		const optionFalse = document.createElement('option');
		optionFalse.innerText = 'false';
		optionFalse.value = 'false';
		this.selectSuspended.appendChild(optionFalse);
		const optionTrue = document.createElement('option');
		optionTrue.innerText = 'true';
		optionTrue.value = 'true';
		this.selectSuspended.appendChild(optionTrue);
		this.selectSuspended.onchange = ev => {
			this.suspended = ev.target.selectedIndex === 1;
			greenFadeOut(ev.target);
		};
		this.paramInputsDiv.appendChild(this.selectSuspended);
		// Chat interval input
		this.inputChatInterval = document.createElement('input');
		this.inputChatInterval.title = 'Time in milliseconds between consecutive chat messages';
		this.inputChatInterval.style.width = '50px';
		this.inputChatInterval.style.display = 'inline-block';
		this.inputChatInterval.style.backgroundColor = 'white';
		this.inputChatInterval.style.borderWidth = '1px';
		this.inputChatInterval.type = 'number';
		this.inputChatInterval.min = '0';
		this.inputChatInterval.oninput = ev => {
			const num = Number.parseInt(ev.target.value);
			this.chatInterval = isNaN(num) ? 0 : num;
			this.updateElements();
			greenFadeOut(ev.target);
		};
		this.paramInputsDiv.appendChild(this.inputChatInterval);
		// Load button
		this.btnLoad = document.createElement('button');
		this.btnLoad.title = 'Load match to iframes below';
		this.btnLoad.innerText = 'Load';
		this.btnLoad.style.display = 'inline-block';
		this.btnLoad.style.overflow = 'hidden';
		this.btnLoad.onclick = () => {
			this.loadFlashscoreMatchCommentary(
				this.inputMatchId.value,
				this.inputTeam1.value,
				this.inputTeam2.value,
				this.selectLang.selectedOptions[0].value,
				this.selectSuspended.selectedIndex === 1,
				Number.parseInt(this.inputChatInterval.value)
			);
		};
		this.paramInputsDiv.appendChild(this.btnLoad);

		// Create new list entry
		this.listEntrySpan = document.createElement('span');
		this.listEntrySpan.className = 'overlayListEntry';
		this.listEntrySpan.style.display = 'block';
		this.listEntrySpan.style.cursor = 'pointer';
		this.listEntrySpan.style.whiteSpace = 'pre';
		this.listEntrySpan.style.paddingTop = '2px';
		this.listEntrySpan.style.paddingBottom = '2px';
		this.listEntrySpan.style.paddingLeft = '4px';
		this.listEntrySpan.style.paddingRight = '4px';
		// Add entry to list
		overlayListDiv.appendChild(this.listEntrySpan);

		// Add upper elements to div
		this.fDivOverlay.appendChild(this.hintSpan);
		this.fDivOverlay.appendChild(this.linkInputDiv);
		this.fDivOverlay.appendChild(this.paramInputsDiv);
		// Flashscore iframe which will be placed inside the div. It will occupy 2/3 of its space
		this.flashscoreFrame = document.createElement('iframe');
		this.flashscoreFrame.className = 'flashscoreFrame';
		this.flashscoreFrame.style.display = 'block';
		this.flashscoreFrame.style.marginTop = '16px';
		this.flashscoreFrame.style.backgroundColor = '#001e28';
		// Flashscore commentary iframe which will be placed inside the div below the flashscoreFrame. It will occupy 1/3 of its space
		this.flashscoreCommentFrame = document.createElement('iframe');
		this.flashscoreCommentFrame.className = 'flashscoreCommentFrame';
		this.flashscoreCommentFrame.style.display = 'block';
		this.flashscoreCommentFrame.style.marginTop = '16px';
		this.flashscoreCommentFrame.style.backgroundColor = '#001e28';

		// Add iframes to div
		this.fDivOverlay.appendChild(this.flashscoreFrame);
		this.fDivOverlay.appendChild(this.flashscoreCommentFrame);
		// Add div to haxball
		iframeBody.appendChild(this.fDivOverlay);
		// Make div draggable
		makeElementDraggable(this.fDivOverlay);

		// Commentary section element
		this.fCommentsSection = null;
		// Observer interval
		this.fCommentsObserverInterval = null;
		// Previous number of comments
		this.previousRowCount = 0;
		// Comments array. The latest is at index 0
		this.lastCommentsQueue = [];
		// Match finished flag
		this.endPending = false;
		// Previous commentary link
		this.prevLink = '';
		// Handlers
		this.findCommentaryTabInterval = null;
		this.endTimeout = null;

		// Update overlay handlers and titles
		this.updateElements();
	}

	/** Changes overlay appearance if its focus state has changed. */
	onFocusChange() {
		// If overlay gains focus
		if (this === OverlayManager.focusedOverlay) {
			this.fDivOverlay.style.border = '3px solid #0FF';
			this.fDivOverlay.style.zIndex = '4';
			this.listEntrySpan.style.backgroundColor = '#0FF4';
		}
		// If overlay loses focus
		else {
			this.fDivOverlay.style.border = '3px solid #666';
			this.fDivOverlay.style.zIndex = '3';
			this.listEntrySpan.style.backgroundColor = '';
		}
	}

	updateElements() {
		this.hintSpan.innerText = this.translate(Str.PRESS_TO_SHOW_HIDE);
		this.inputMatchId.value = this.matchId;
		this.inputTeam1.value = this.team1Code;
		this.inputTeam2.value = this.team2Code;
		this.selectLang.selectedIndex = Object.keys(Str.COMMENTARY_LINK1).indexOf(this.language);
		this.selectSuspended.selectedIndex = this.suspended ? 1 : 0;
		this.inputChatInterval.value = this.chatInterval.toString();
		this.listEntrySpan.innerText = this.id + ') ' + this.matchId + ' ' + this.team1Code + '-' + this.team2Code + ' ' + this.language;

		const doRightClickAction = ev => {
			ContextMenuManager.createContextMenu();
			const contextMenu = ContextMenuManager.contextMenu;

			contextMenu.addEntry('Delete', () => {
				OverlayManager.deleteOverlay(this.id);
			});
			contextMenu.addEntry('Start/Restart observer', () => {
				this.restartFlashscore();
			});
			contextMenu.addEntry('Stop observer', () => {
				this.stopFlashscore();
			});
			contextMenu.addEntry((this.fDivOverlay.hidden ? 'Show' : 'Hide') + ' overlay', () => {
				this.toggleHidden();
			});
			contextMenu.addEntry((this.printUpdates ? 'Ignore ' : 'Detect ') + 'comment edits', () => {
				this.printUpdates = !this.printUpdates;
			});
			const langSubMenu = new ContextMenu();
			Object.keys(Str.COMMENTARY_LINK1).forEach(lang => {
				langSubMenu.addEntry(lang, () => {
					this.changeLanguage(lang);
				});
			});
			contextMenu.addEntry('Change language', null, langSubMenu);
			contextMenu.addEntry('Send results', () => {
				this.printMatchResults();
			});
			contextMenu.addEntry('Send results with summary', () => {
				this.printMatchResultsWithSummary();
			});
			contextMenu.addEntry('Send results with odds', () => {
				this.printMatchResultsWithOdds();
			});
			contextMenu.addEntry('Send results & summary & odds', () => {
				this.printMatchResultsWithSummaryAndOdds();
			});
			contextMenu.addEntry('Cancel', () => {
			});

			contextMenu.showAtPoint(ev.pageX, ev.pageY, 2);

			ev.preventDefault();
		};

		this.fDivOverlay.onclick = () => {
			OverlayManager.setFocus(this.id);
		};
		this.fDivOverlay.oncontextmenu = ev => {
			doRightClickAction(ev);
		};
		this.listEntrySpan.onclick = () => {
			OverlayManager.setFocus(this.id);
			this.toggleHidden();
		};
		this.listEntrySpan.oncontextmenu = ev => {
			doRightClickAction(ev);
		};
	}

	/** Closes all iframes, clears all intervals and removes this overlay from document. */
	terminate() {
		clearInterval(this.findCommentaryTabInterval);
		clearTimeout(this.endTimeout);
		this.stopFlashscore();
		this.flashscoreFrame.src = '';
		this.flashscoreCommentFrame.src = '';
		iframeBody.removeChild(this.fDivOverlay);
	}

	hide() {
		this.fDivOverlay.hidden = true;
	}

	show() {
		this.fDivOverlay.hidden = false;
	}

	toggleHidden() {
		this.fDivOverlay.hidden = !this.fDivOverlay.hidden;
	}

	/**
	 * Converts an object in {@link Str} into string based on current {@link Overlay.language}.
	 * @param translatableObject
	 * @return {*}
	 */
	translate(translatableObject) {
		return translatableObject[this.language] || translatableObject['en'];
	}

	getMatchLink() {
		return this.translate(Str.COMMENTARY_LINK1, this.language) + this.matchId;
	}

	getCommentaryLink() {
		return this.translate(Str.COMMENTARY_LINK1, this.language) + this.matchId + this.translate(Str.COMMENTARY_LINK2, this.language);
	}

	/**
	 * This function loads a flashscore commentary page within the flashscoreFrame.
	 * It can be called at any time.
	 *
	 * @param {string} matchId Match identifier can be found inside the URL, in the middle of it.
	 * An English link is always composed of: "https://www.flashscore.com/match/" + matchId + "/#/match-summary/live-commentary".
	 * @param {string} team1Code A short home team abbreviation that is usually seen on a score bug.
	 * @param {string} team2Code A short away team abbreviation that is usually seen on a score bug.
	 * @param {string} language Language code. Example codes are "pl" or "en", see all codes in {@link Str.COMMENTARY_LINK1} object.
	 * @param {boolean} suspended If true, you have to call startFlashscore manually to print comments.
	 * @param {number} chatInterval Number in milliseconds of delay between consecutive chat messages. Helpful in rooms with chat slow mode.
	 * @param {number} width iFrame width in pixels.
	 * @param {number} height iFrame height in pixels.
	 */
	loadFlashscoreMatchCommentary(matchId, team1Code = '', team2Code = '', language = 'pl', suspended = false, chatInterval = 0, width = 560, height = 600) {
		// Use self instead of this in inner functions (in lambda (arrow) => functions you can use this)
		const self = this;

		if (!(matchId?.length > 0)) {
			console.error('Oh no! You forgot to specify the match ID');
			console.log('%cMatch identifier can be found in the middle of match commentary URL.\nAn English link is always composed of: "http﻿s://ww﻿w.flashscore.com/match/" + matchId + "/#/match-summary/live-commentary".'
				, 'background: #00141E; color: #FFCD00; font-size: 1.3em');
			console.log('%cFor example: in this url – https://www.flashscore.com/match/GbHo73tP/#/match-summary/live-commentary – the matchId is %cGbHo73tP'
				, 'background: #00141E; color: #FFCD00; font-size:1.3em', 'background: #00141E; color: #FFCD00; font-size:1.3em; font-weight:900');
			return;
		}

		this.matchId = matchId;
		this.team1Code = team1Code;
		this.team2Code = team2Code;
		this.language = language;
		this.suspended = suspended;
		this.chatInterval = chatInterval;
		this.width = width;
		this.height = height;

		this.printUpdates = true;

		// Stop the observer
		this.stopFlashscore();
		this.fCommentsSection = null;

		this.flashscoreFrame.onload = null;
		this.flashscoreFrame.src = this.getMatchLink();
		this.flashscoreFrame.width = this.width + 'px';
		this.flashscoreFrame.height = this.height + 'px';

		this.flashscoreCommentFrame.onload = null;
		this.flashscoreCommentFrame.width = this.width + 'px';
		this.flashscoreCommentFrame.height = '0';

		this.hintSpan.style.maxWidth = this.width + 'px';
		this.linkInputDiv.style.maxWidth = this.width + 'px';
		this.paramInputsDiv.style.maxWidth = this.width + 'px';
		this.updateElements();

		if (this.prevLink !== this.getCommentaryLink()) {
			this.prevLink = this.getCommentaryLink();
		}
		// When the flashscore match frame is loaded
		this.flashscoreFrame.onload = ev => {
			console.log('Flashscore match frame loaded: ' + this.getMatchLink());
			// Empty last comments queue
			this.lastCommentsQueue = [];
			clearInterval(this.findCommentaryTabInterval);

			// Wait 3 seconds for the comments section to load (should be sufficient)
			setTimeout(() => {
				console.log('Flashscore page should have already been loaded');

				// Delete redundant elements
				console.log('Deleting redundant elements from flashscore frame');
				this.flashscoreFrame.contentDocument.querySelector('.detailLeaderboard')?.remove();
				Array.from(this.flashscoreFrame.contentDocument.querySelector('.bannerEnvelope')?.children ?? []).forEach(e => e.remove());
				this.flashscoreFrame.contentDocument.querySelector('#onetrust-banner-sdk')?.remove();
				this.flashscoreFrame.contentDocument.querySelector('.sg-b-f')?.remove();

				// Check periodically if a commentary section appeared
				function findCommentaryTab() {
					const tabs = self.flashscoreFrame.contentDocument.querySelector('.filter__group');
					const tabsArr = tabs != null ? Array.from(tabs?.children) : null;
					// If there is a COMMENTARY tab
					if (tabsArr?.find(t => t.href.endsWith(self.translate(Str.COMMENTARY_LINK2))) != null) {
						console.log('Commentary tab found, loading it...');
						// Show the commentary frame
						self.flashscoreFrame.height = self.height * 2 / 3 + 'px';
						self.flashscoreCommentFrame.height = self.height / 3 + 'px';
						// Load commentary section in comment frame
						self.flashscoreCommentFrame.src = self.getCommentaryLink();
						clearInterval(self.findCommentaryTabInterval);
					}
				}

				findCommentaryTab();
				this.findCommentaryTabInterval = setInterval(() => findCommentaryTab(), 5000);
			}, 2000);
		};

		// When the flashscore comment frame is loaded
		this.flashscoreCommentFrame.onload = ev => {
			console.log('Flashscore comment frame loaded: ' + this.getCommentaryLink());

			// Wait 3 seconds for the comments section to load (should be sufficient)
			setTimeout(() => {
				console.log('Flashscore comment section should have already been loaded');
				// Flashscore comments section element
				this.fCommentsSection = this.flashscoreCommentFrame.contentDocument.querySelector('#detail > .section');

				// Start a new observer
				if (!this.suspended)
					this.restartFlashscore();

				// Delete redundant elements
				console.log('Deleting redundant elements from comment frame');
				this.flashscoreCommentFrame.contentDocument.querySelector('.detailLeaderboard')?.remove();
				Array.from(this.flashscoreCommentFrame.contentDocument.querySelector('.bannerEnvelope')?.children ?? []).forEach(e => e.remove());
				this.flashscoreCommentFrame.contentDocument.querySelector('#onetrust-banner-sdk')?.remove();
				this.flashscoreCommentFrame.contentDocument.querySelector('.sg-b-f')?.remove();

				this.flashscoreCommentFrame.contentWindow.scrollTo({top: this.fCommentsSection?.offsetTop - 70, behavior: 'smooth'});
			}, 2000);
		};
	}

	/**
	 * Loads the same match with different language.
	 *
	 * @param {string} language Language code. Example codes are "pl" or "en", see all codes in {@link Str.COMMENTARY_LINK1} object.
	 */
	changeLanguage(language) {
		if (this.matchId?.length > 0)
			this.loadFlashscoreMatchCommentary(this.matchId, this.team1Code, this.team2Code, language, this.suspended, this.chatInterval, this.width, this.height);
		else {
			this.language = language;
			this.updateElements();
		}
	}

	getBotCommentFromSoccerRow(row) {
		if (row == null || this.flashscoreCommentFrame == null)
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
		// Second yellow
		else if (row.querySelector('.card-ico') != null)
			iconEmoji = '🟥 ';
		else if (goalScoreText.length === 0 && (row.querySelector('svg')?.dataset?.testid === 'wcl-icon-soccer' || row.querySelector('svg.footballOwnGoal-ico') != null))
			iconEmoji = '⚽ ';

		let goalText = '';
		if (goalScoreText)
			goalText = ' ⚽ ' + goalScoreText + ' ⚽ ';

		let commentText = getCommentFromSoccerRow(row);
		// Polska pisownia nazwisk z alfabetów niełacińskich
		if (this.language === 'pl')
			commentText = spolszczNazwiska(commentText);

		// Two-element score array
		let scores = this.getScoresArray();
		if (scores.length < 2)
			scores = ['-', '-'];

		const redCardsArray = this.getRedCardsArray();
		const redCardsHome = '🟥'.repeat(redCardsArray[0]);
		const redCardsAway = '🟥'.repeat(redCardsArray[1]);
		let firstLegScores = this.getFirstLegScoresArray();
		let scoresString = scores[0] + ':' + scores[1] +
			(firstLegScores != null ? ' (' + (isNaN(scores[0]) ? firstLegScores[0] : scores[0] + firstLegScores[0]) + ':' + (isNaN(scores[1]) ? firstLegScores[1] : scores[1] + firstLegScores[1]) + ')' : '');
		// This will precede every chat message
		const prefix = '[' + this.team1Code + redCardsHome + ' ' + scoresString + ' ' + redCardsAway + this.team2Code + '] ';
		return prefix + minuteText + ' ' + iconEmoji + goalText + commentText;
	}

	/** @return {[team1: string, team2: string]} Two team names array. */
	getTeamNamesArray() {
		let teamNames = Array.from(this.flashscoreFrame.contentDocument.querySelectorAll('div.participant__participantName'))
			.map(e => {
				const bracketIndex = e.innerText.indexOf('(');
				return bracketIndex > -1 ? e.innerText.substring(0, bracketIndex).trim() : e.innerText.trim();
			});
		if (this.language === 'pl')
			teamNames = teamNames.map(e => spolszczNazwiska(e));
		return teamNames;
	}

	/** @return {string} Which half is it and what minute or if the match is finished or cancelled. */
	getMatchDetailsString() {
		return Array.from(this.flashscoreFrame.contentDocument.querySelector('.detailScore__status')?.children ?? []).map(d => d.innerText).filter(d => d.trim().length > 0).join(' ').trim() ?? '';
	}

	/** @return {string} Referee and stadium. */
	getMatchRefereeStadiumString() {
		return Array.from(this.flashscoreFrame.contentDocument.querySelector('.mi__data')?.children ?? []).map(m => Array.from(m.children)).flat().map(i => i.innerText).join(' ');
	}

	/** @return {string} Match start date and time. */
	getStartTimeString() {
		return this.flashscoreFrame.contentDocument.querySelector('.duelParticipant__startTime')?.innerText ?? '';
	}

	/** @return {[score1: number, score2: number]} Scores array. */
	getScoresArray() {
		return Array.from(this.flashscoreFrame.contentDocument.querySelectorAll('.detailScore__wrapper > span:not(.detailScore__divider)')).map(e => Number.parseInt(e.innerText));
	}

	/**
	 * Works only on 2nd match of a two-legged tie. It returns scores of the first match.
	 *
	 * @return {[score1: number, score2: number]} Scores array or undefined.
	 * */
	getFirstLegScoresArray() {
		const infoBox = this.flashscoreFrame.contentDocument.querySelector('.infoBox__info');
		const firstScoreRaw = infoBox?.innerText?.match(/: (\d+)-(\d+)\./);
		if (firstScoreRaw?.length === 3) {
			return [Number.parseInt(firstScoreRaw[1]), Number.parseInt(firstScoreRaw[2])];
		}
	}

	/**
	 * Returns odd value for specified team and if it's valid.
	 *
	 * @param {number} teamId 1 – home win, 0 – tie, 2 – away win
	 * @return {null|{valid: boolean, value: number}}
	 */
	getOdd(teamId) {
		if (teamId >= 0 && teamId <= 2) {
			const odd = this.flashscoreFrame.contentDocument.querySelector('.o_' + teamId)?.children[1];
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
	 * Returns goalscorers object array.
	 *
	 * @return {{entry, team: number}[]} Example: [{team: 1, entry: "21' G. Ramos (B. Silva)"}, {team: 1, entry: "37' M. Neuer (OG)"}]
	 */
	getGoalscorers() {
		// Goals, cards, substitutions...
		const incidents = Array.from(this.flashscoreFrame.contentDocument.querySelectorAll('.smv__incident'));
		// Filter goals
		const soccerIncidents = incidents.filter(i => i.querySelector('svg')?.dataset?.testid === 'wcl-icon-soccer' || i.querySelector('svg.footballOwnGoal-ico') != null);
		// Extract minute, goalscorer and assist from each goal
		return soccerIncidents.map(si => {
			const team = si.parentElement.classList.contains('smv__homeParticipant') ? 1 : si.parentElement.classList.contains('smv__awayParticipant') ? 2 : 0;
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
				if (this.language === 'pl')
					scorerText = spolszczNazwiska(scorerText);
				scorerText = ' ' + scorerText;
				if (assistText.length > 0) {
					// Remove brackets
					assistText = assistText.substring(1).substring(0, assistText.length - 2);
					// Swap name initials and surname
					const assistMatches = assistText.match(/\S+\..*/);
					if (assistMatches != null)
						assistText = assistMatches[0] + ' ' + assistMatches.input.substring(0, assistMatches.index - 1);
					if (this.language === 'pl')
						assistText = spolszczNazwiska(assistText);
					assistText = ' (' + assistText + ')';
				}
				if (isOwnGoal)
					ownGoalText = ' (' + this.translate(Str.OWN_GOAL_ABBR) + ')';
				if (isPenalty)
					penaltyText = ' (' + this.translate(Str.PENALTY_ABBR) + ')';
			}

			return {team: team, entry: minuteText + scorerText + assistText + ownGoalText + penaltyText};
		});
	}

	/**
	 * Returns array of red cards per team.
	 *
	 * @return {[number, number]} Home team red cards and away team red cards.
	 */
	getRedCardsArray() {
		// Goals, cards, substitutions...
		const incidents = Array.from(this.flashscoreFrame.contentDocument.querySelectorAll('.smv__incident'));
		// Filter red cards
		const redCardIncidents = incidents.filter(i => i.querySelector('svg.card-ico:not(.yellowCard-ico)') != null);
		const redCardsArray = [0, 0];
		// For each red card find which team earned it
		redCardIncidents.forEach(rci => {
			const isOutOfPitch = rci.querySelector('.smv__assist') != null;
			if (!isOutOfPitch) {
				const team = rci.parentElement.classList.contains('smv__homeParticipant') ? 0 : rci.parentElement.classList.contains('smv__awayParticipant') ? 1 : -1;
				// Add one red card to team
				redCardsArray[team] += 1;
			}
		});

		return redCardsArray;
	}

	/**
	 * Returns match result as string. This is:
	 * Team names with red cards and result (with aggregate score from two-legged match) followed by em space
	 * and match details string ({@link Overlay.getMatchDetailsString}) or match start time.
	 *
	 * @return {string} Example: "🔶 The reds🟥 1:2 (2:2) The blues 🔷 2 half 69:42"
	 */
	getMatchResultString() {
		const startTimeString = this.getStartTimeString();
		const teamNamesArray = this.getTeamNamesArray();
		const redCardsArray = this.getRedCardsArray();
		const redCardsHome = '🟥'.repeat(redCardsArray[0]);
		const redCardsAway = '🟥'.repeat(redCardsArray[1]);
		// Which half and minute
		const matchDetailsString = this.getMatchDetailsString();
		let scores = this.getScoresArray();
		if (scores.length < 2)
			scores = ['-', '-'];
		let firstLegScores = this.getFirstLegScoresArray();
		let scoresString = scores[0] + ':' + scores[1] +
			(firstLegScores != null ? ' (' + (isNaN(scores[0]) ? firstLegScores[0] : scores[0] + firstLegScores[0]) + ':' + (isNaN(scores[1]) ? firstLegScores[1] : scores[1] + firstLegScores[1]) + ')' : '');

		const teamWithScoresAndCards = '🔶 ' + teamNamesArray[0] + redCardsHome + ' ' + scoresString + ' ' + redCardsAway + teamNamesArray[1] + ' 🔷';
		const matchPhaseWithTime = matchDetailsString.length > 0 ? matchDetailsString : startTimeString;

		return teamWithScoresAndCards + ' ' + matchPhaseWithTime;
	}

	printMatchResults() {
		sendChat_s(this.getMatchResultString());
	}

	/**
	 * Returns current match summary which is goalscorers or stadium with referee.
	 *
	 * @return {string}
	 */
	getMatchSummaryString() {
		let summary;
		if (this.getMatchDetailsString().length > 0) {
			// Minute, goalscorer and assist from each goal
			const scorersArray = this.getGoalscorers();
			summary = scorersArray.map(te => sIcon[te.team] + te.entry).join(' ');
		}
		else {
			summary = this.getMatchRefereeStadiumString();
			if (this.language === 'pl')
				summary = spolszczNazwiska(summary);
		}

		// Display match results
		return summary;
	}

	printMatchResultsWithSummary() {
		const results = this.getMatchResultString();
		const summary = this.getMatchSummaryString();
		const slicedSummary = getSlicedHaxballText(summary);
		const resultsWithSummary = [results].concat(slicedSummary);
		sendTextArrayToChat(resultsWithSummary, this.chatInterval);
	}

	getOddsString() {
		const odds = [this.getOdd(1), this.getOdd(0), this.getOdd(2)];
		const st = String.fromCharCode(822);
		const oddsStr = odds.map(odd => {
			return odd == null || isNaN(odd.value) ? '-' : odd.valid ? odd.value.toString() : [...odd.value.toString()].map(c => c + st).join('');
		});
		return '𝟏: ' + oddsStr[0] + ' 𝐗: ' + oddsStr[1] + ' 𝟐: ' + oddsStr[2];
	}

	printMatchResultsWithOdds() {
		sendTextArrayToChat([this.getMatchResultString(), this.getOddsString()], this.chatInterval);
	}

	printMatchResultsWithSummaryAndOdds() {
		const results = this.getMatchResultString();
		const summary = this.getMatchSummaryString();
		const slicedSummary = getSlicedHaxballText(summary);
		const odds = this.getOddsString();
		const resultsWithSummaryAndOdds = [results].concat(slicedSummary, [odds]);
		sendTextArrayToChat(resultsWithSummaryAndOdds, this.chatInterval);
	}

	// Callback function to execute when mutations are observed.
	// If you want to modify this function at runtime, modify it, paste it to console and call restart() to reload the observer
	fCommentsCallback() {
		this.fCommentsSection = this.flashscoreCommentFrame?.contentDocument.querySelector('#detail > .section');
		if (this.fCommentsSection != null) {
			// Soccer rows array
			const soccerRows = Array.from(this.fCommentsSection.querySelectorAll('.soccer__row'));
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
				let isUpdate = rowCount === this.previousRowCount;

				// Reducing some spam.
				// If the top comment is the same as one of the last four written comments
				if (this.lastCommentsQueue.length > 0 && (
					commentFromTopSoccerRow === this.lastCommentsQueue[0] ||
					commentFromTopSoccerRow === this.lastCommentsQueue[1] ||
					commentFromTopSoccerRow === this.lastCommentsQueue[2] ||
					commentFromTopSoccerRow === this.lastCommentsQueue[3]
				)) {
					// Don't write the same comment for the second time
					console.debug('Top comment was already written before');
					// If lastCommentsQueue has max 1 comment OR if the second top comment is the same as the second or third or fourth last written comment
					if (this.lastCommentsQueue.length <= 1 || (
						commentFromSecondSoccerRow === this.lastCommentsQueue[1] ||
						commentFromSecondSoccerRow === this.lastCommentsQueue[2] ||
						commentFromSecondSoccerRow === this.lastCommentsQueue[3]
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
						const lastComment = this.lastCommentsQueue.shift();
						this.lastCommentsQueue.unshift(commentFromSecondSoccerRow);
						this.lastCommentsQueue.unshift(lastComment);
						// Print the second row
						triggeringRow = secondSoccerRow;
					}
				}
				// If the top comment is different
				else {
					console.debug('Top comment is different');
					triggeringRow = topSoccerRow;
					// Add the comment text at the beginning of the last comments queue
					this.lastCommentsQueue.unshift(commentFromTopSoccerRow);
				}

				// The final comment that will appear in the Haxball chat
				let botComment = this.getBotCommentFromSoccerRow(triggeringRow);
				// Mark an update
				if (isUpdate) {
					if (this.printUpdates)
						botComment = '[' + this.translate(Str.UPDATE) + '] ' + botComment;
					else {
						console.log('(Discarded) ' + botComment);
						return;
					}
				}

				// Split the bot comment to fit in the chat
				const botCommentFragments = getSlicedHaxballText(botComment);

				// Print the whole comment to the console
				console.log(botComment);

				// For each bot comment fragment, send it to chat
				sendTextArrayToChat(botCommentFragments, this.chatInterval);

				this.previousRowCount = soccerRows.length;
			}
			else {
				console.debug('No soccer rows found');
			}
		}
		else {
			console.debug('No comment section found');
		}

		// Score status element
		const scoreStatusText = this.flashscoreFrame.contentDocument.querySelector('.fixedHeaderDuel__detailStatus')?.innerText?.toUpperCase();

		// If the match has ended
		if (scoreStatusText === this.translate(Str.FINISHED) && !this.endPending) {
			console.log('Match has ended. End pending...');
			this.endTimeout = setTimeout(() => {
				console.log('Match has ended. Stopping.');
				// Display match results
				this.printMatchResultsWithSummary();
				// Stop observing
				this.stopFlashscore();
				this.endPending = false;
			}, 5000);
			this.endPending = true;
		}
	}

	// Start observing the target node for configured mutations
	startFlashscore() {
		if (this.fCommentsSection == null) {
			this.fCommentsSection = this.flashscoreCommentFrame.contentDocument?.querySelector('#detail > .section');
		}
		if (this.fCommentsSection != null) {
			this.fCommentsObserverInterval = setInterval(() => this.fCommentsCallback(), 2000);
			console.log('Started observing flashscore commentary section');
		}
		else
			console.error('Flashscore commentary section NOT FOUND!');
	}

	// Later, you can stop observing
	stopFlashscore() {
		clearInterval(this.fCommentsObserverInterval);
		console.log('Stopped observing flashscore commentary section');
	}

	restartFlashscore() {
		this.stopFlashscore();
		this.startFlashscore();
	}
}

class OverlayManager {
	/**
	 * All active overlays. Note that overlay ids start with 1, so indexes are off by -1.
	 * @type {Overlay[]}
	 */
	static overlays = [];
	/**
	 * Focused overlay.
	 * @type {Overlay}
	 */
	static focusedOverlay = null;
	/**
	 * Index of focused overlay
	 * @type {number}
	 */
	static focusedId = null;

	/**
	 * Creates new Overlay object and adds it to {@link OverlayManager.overlays} array.
	 *
	 * @param {string} language Language code of the overlay
	 * @param {boolean} focus Create focused
	 * @return {Overlay} Created Overlay object
	 */
	static createOverlay(language = 'en', focus = true) {
		const overlay = new Overlay(language);
		this.overlays.push(overlay);
		console.log('Created overlay ' + this.overlays.length);
		if (focus) {
			this.focusedOverlay = overlay;
			// Ids start with 1
			this.focusedId = this.overlays.length;
			this.overlays.forEach(o => o.onFocusChange());
		}
		return overlay;
	}

	/**
	 * Terminates the Overlay object specified by index and removes it from {@link OverlayManager.overlays} array.
	 *
	 * @param {number} overlayId Index of the overlay in the overlays array
	 * @return {Overlay} Deleted Overlay object
	 */
	static deleteOverlay(overlayId) {
		let deletedOverlay = null;
		if (overlayId >= 1 && overlayId <= this.overlays.length) {
			deletedOverlay = this.overlays[overlayId - 1];
			// Remove the overlay's entry from list div
			overlayListDiv.removeChild(deletedOverlay.listEntrySpan);
			// Terminate the overlay
			deletedOverlay.terminate();
			// Remove the overlay from the array
			this.overlays.splice(overlayId - 1, 1);
			console.log('Deleted overlay ' + overlayId);
			// Set focus on previous overlay (id 1 or greater)
			this.setFocus(Math.max(overlayId - 1, 1));
			// Update ids and spans
			this.overlays.forEach((o, i) => {
				o.id = i + 1;
				o.updateElements();
			});
		}
		return deletedOverlay;
	}

	// Sets focus on one overlay and disables it on the other remaining
	static setFocus(overlayId) {
		if (overlayId >= 1 && overlayId <= this.overlays.length) {
			this.focusedOverlay = this.overlays[overlayId - 1];
			this.focusedId = overlayId;
			this.overlays.forEach(o => o.onFocusChange());
		}
	}

	/** Hides all overlays */
	static hideAll() {
		this.overlays.forEach(o => o.hide());
	}

	/** Shows all overlays */
	static showAll() {
		this.overlays.forEach(o => o.show());
	}
}

// KEY EVENTS
iframeBody.addEventListener('keydown', event => {
	const keyName = event.key;

	// If Alt key is also pressed
	if (event.altKey) {
		switch (keyName) {
			case ';':
				// Show or hide the overlay
				OverlayManager.focusedOverlay?.toggleHidden();
				break;
			case '\'':
				// Write last comment
				if (OverlayManager.focusedOverlay?.lastCommentsQueue.length > 0)
					sendTextArrayToChat(getSlicedHaxballText(OverlayManager.focusedOverlay.lastCommentsQueue[0]), OverlayManager.focusedOverlay.chatInterval);
				break;
			case '[':
				// Send current match results and goalscorers
				OverlayManager.focusedOverlay?.printMatchResultsWithSummary();
				break;
			case ']':
				// Send current match results and odds
				OverlayManager.focusedOverlay?.printMatchResultsWithOdds();
				break;
			case '\\':
				// Send current match results and odds
				OverlayManager.focusedOverlay?.printMatchResultsWithSummaryAndOdds();
				break;
			case '1':
				OverlayManager.setFocus(1);
				break;
			case '2':
				OverlayManager.setFocus(2);
				break;
			case '3':
				OverlayManager.setFocus(3);
				break;
			case '4':
				OverlayManager.setFocus(4);
				break;
			case '5':
				OverlayManager.setFocus(5);
				break;
			case '6':
				OverlayManager.setFocus(6);
				break;
			case '7':
				OverlayManager.setFocus(7);
				break;
			case '8':
				OverlayManager.setFocus(8);
				break;
			case '9':
				OverlayManager.setFocus(9);
				break;
			case '0':
				OverlayManager.setFocus(10);
				break;
		}
	}
}, false);

// Returns localized names. Before calling this, check if language is set to pl
function spolszczNazwiska(text) {
	let commentText = text;
	commentText = commentText.replaceAll('Efthymios Koulouris', 'Eftimis Kuluris');
	commentText = commentText.replaceAll('Pantelis Chatzidiakos', 'Pandelis Chadzidiakos');
	commentText = commentText.replaceAll('Georgios Vagiannidis', 'Jeorjos Wajanidis');
	commentText = commentText.replaceAll('Fotis Ioannidis', 'Fotis Joanidis');
	commentText = commentText.replaceAll('Georgios Karakasidis', 'Jeorjos Karakasidis');
	commentText = commentText.replaceAll('Giannis Sourdis', 'Janis Surdis');
	commentText = commentText.replaceAll('Vasilios Xenopoulos', 'Wasilios Ksenopulos');
	commentText = commentText.replaceAll('Georgios Sideras', 'Jeorjos Sideras');
	commentText = commentText.replaceAll('Georgios Masouras', 'Giorgos Masuras');
	commentText = commentText.replaceAll('Georgios Giakoumakis', 'Jorgos Jakumakis');
	commentText = commentText.replaceAll('Petros Mantalos', 'Petros Mandalos');
	commentText = commentText.replaceAll('Georgios Athanasiadis', 'Jorgos Atanasiadis');
	commentText = commentText.replaceAll('Christos Chatziioannou', 'Christos Chadziioanu');
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
	commentText = commentText.replaceAll('Konstantinos Tsimikas', 'Kostas Tsimikas');
	commentText = commentText.replaceAll(/(\w*)poulos\b/g, '$1pulos');
	commentText = commentText.replaceAll('E. Koulouris', 'E. Kuluris');
	commentText = commentText.replaceAll('P. Chatzidiakos', 'P. Chadzidiakos');
	commentText = commentText.replaceAll('G. Vagiannidis', 'J. Wajanidis');
	commentText = commentText.replaceAll('F. Ioannidis', 'F. Joanidis');
	commentText = commentText.replaceAll('G. Karakasidis', 'J. Karakasidis');
	commentText = commentText.replaceAll('G. Sourdis', 'J. Surdis');
	commentText = commentText.replaceAll('V. Xenopoulos', 'W. Ksenopulos');
	commentText = commentText.replaceAll('G. Sideras', 'J. Sideras');
	commentText = commentText.replaceAll('G. Giakoumakis', 'J. Jakumakis');
	commentText = commentText.replaceAll('P. Mantalos', 'P. Mandalos');
	commentText = commentText.replaceAll('G. Athanasiadis', 'J. Atanasiadis');
	commentText = commentText.replaceAll('C. Chatziioannou', 'C. Chadziioanu');

	commentText = commentText.replaceAll('Kvaratskhelia', 'Kwaracchelia');
	commentText = commentText.replaceAll('Davitashvili', 'Dawitaszwili');
	commentText = commentText.replaceAll('Gugeshashvili', 'Gugeszaszwili');
	commentText = commentText.replaceAll('Zivzivadze', 'Ziwziwadze');
	commentText = commentText.replaceAll('Khvicha', 'Chwicza');
	commentText = commentText.replaceAll('shvili', 'szwili');
	commentText = commentText.replaceAll('Kvekve', 'Kwekwe');
	commentText = commentText.replaceAll('Georgiy Tsitaishvili', 'Giorgi Citaiszwili');
	commentText = commentText.replaceAll('Davit Khocholava', 'Dawit Choczolawa');
	commentText = commentText.replaceAll('Guram Kashia', 'Guram Kaszia');
	commentText = commentText.replaceAll('Jaba Kankava', 'Dżaba Kankawa');
	commentText = commentText.replaceAll('G. Tsitaishvili', 'G. Citaiszwili');
	commentText = commentText.replaceAll('D. Khocholava', 'D. Choczolawa');
	commentText = commentText.replaceAll('G. Kashia', 'G. Kaszia');
	commentText = commentText.replaceAll('J. Kankava', 'Dż. Kankawa');

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
		iframeBody.onmouseup = null;
		iframeBody.onmousemove = null;
	}

	function elementDrag(ev) {
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
		// get the mouse cursor position at startup:
		pos3 = ev.clientX;
		pos4 = ev.clientY;
		iframeBody.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		iframeBody.onmousemove = elementDrag;
	}

	// move the DIV from anywhere inside the DIV
	element.onmousedown = dragMouseDown;
	// Make the cursor different on hover
	element.style.cursor = 'move';
}

// LET'S LOAD SOME FLASHSCORE COMMENTARY NOW. Copy this line (without //) to the console and modify the arguments!
//OverlayManager.createOverlay();
//OverlayManager.focusedOverlay.loadFlashscoreMatchCommentary('jciYwiXp', 'AUV', 'LEG', 'en');
