/*
https://www.instructables.com/Making-a-Joystick-With-HTML-pure-JavaScript/
*/
// Modified game-min.js g object
let g = window.g;

let iframeDocument = document.querySelector('.gameframe').contentDocument;
let iframeBody = document.querySelector('.gameframe').contentDocument.body;
let iframeWindow = document.querySelector('.gameframe').contentWindow;

const Input = {
	UP: 1,
	DOWN: 2,
	LEFT: 4,
	RIGHT: 8,
	KICK: 16
};

let radius = 20;
let width = 2 * (radius + 20);
let height = 2 * (radius + 20);
let x_orig = width / 2;
let y_orig = height / 2;

let coord = {x: 0, y: 0};
let paint = false;

// Parameters input container
const joyInputInfoDiv = document.createElement('div');
joyInputInfoDiv.id = 'joyInputInfo';
joyInputInfoDiv.style.position = 'absolute';
joyInputInfoDiv.style.top = '0';
joyInputInfoDiv.style.left = '0';
joyInputInfoDiv.style.maxWidth = '400px';
joyInputInfoDiv.style.maxHeight = '300px';
joyInputInfoDiv.style.backgroundColor = '#000B';
joyInputInfoDiv.style.color = 'white';
joyInputInfoDiv.style.fontSize = '0.9em';
joyInputInfoDiv.style.zIndex = '99';
joyInputInfoDiv.style.paddingBottom = '2px';
joyInputInfoDiv.style.overflow = 'auto';
iframeBody.appendChild(joyInputInfoDiv);
// x coord p
const xCoordP = document.createElement('p');
xCoordP.innerText = 'X: ';
const xCoordSpan = document.createElement('span');
xCoordSpan.id = 'x_coordinate';
xCoordP.appendChild(xCoordSpan);
joyInputInfoDiv.appendChild(xCoordP);
// y coord p
const yCoordP = document.createElement('p');
yCoordP.innerText = 'Y: ';
const yCoordSpan = document.createElement('span');
yCoordSpan.id = 'y_coordinate';
yCoordP.appendChild(yCoordSpan);
joyInputInfoDiv.appendChild(yCoordP);
// speed p
const sCoordP = document.createElement('p');
sCoordP.innerText = 'Speed: ';
const sCoordSpan = document.createElement('span');
sCoordSpan.id = 'speed';
sCoordP.appendChild(sCoordSpan);
joyInputInfoDiv.appendChild(sCoordP);
// angle p
const aCoordP = document.createElement('p');
aCoordP.innerText = 'Angle: ';
const aCoordSpan = document.createElement('span');
aCoordSpan.id = 'angle';
aCoordP.appendChild(aCoordSpan);
joyInputInfoDiv.appendChild(aCoordP);

const joyCanvas = document.createElement('canvas');
joyCanvas.id = 'joyCanvas';
joyCanvas.style.position = 'absolute';
joyCanvas.style.bottom = '100px';
joyCanvas.style.left = '20px';
joyCanvas.style.zIndex = '99';
joyCanvas.style.cursor = 'grab';
iframeBody.appendChild(joyCanvas);
const ctx = joyCanvas.getContext('2d');
onWinResize();

joyCanvas.addEventListener('mousedown', startDrawing);
joyCanvas.addEventListener('mouseup', stopDrawing);
joyCanvas.addEventListener('mousemove', drawJoystick);

joyCanvas.addEventListener('touchstart', startDrawing);
joyCanvas.addEventListener('touchend', stopDrawing);
joyCanvas.addEventListener('touchcancel', stopDrawing);
joyCanvas.addEventListener('touchmove', drawJoystick);
iframeWindow.addEventListener('resize', onWinResize);

iframeDocument.getElementById('x_coordinate').innerText = '0';
iframeDocument.getElementById('y_coordinate').innerText = '0';
iframeDocument.getElementById('speed').innerText = '0';
iframeDocument.getElementById('angle').innerText = '0';

function onWinResize() {
	radius = 20;
	width = 2 * (radius + 20);
	height = 2 * (radius + 20);
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	background();
	joystick(width / 2, height / 2);
}

function background() {
	x_orig = width / 2;
	y_orig = height / 2;

	ctx.beginPath();
	ctx.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
	ctx.fillStyle = '#ECE5E580';
	ctx.fill();
}

function joystick(width, height) {
	ctx.beginPath();
	ctx.arc(width, height, radius, 0, Math.PI * 2, true);
	ctx.fillStyle = '#F08080DD';
	ctx.fill();
	ctx.strokeStyle = '#F6ABABDD';
	ctx.lineWidth = 8;
	ctx.stroke();
}

function getPosition(event) {
	const mouse_x = event.clientX || event.touches[0].clientX;
	const mouse_y = event.clientY || event.touches[0].clientY;
	coord.x = mouse_x - joyCanvas.offsetLeft;
	coord.y = mouse_y - joyCanvas.offsetTop;
}

function is_it_in_the_circle() {
	const current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
	return radius >= current_radius;
}

function startDrawing(event) {
	paint = true;
	getPosition(event);
	if (is_it_in_the_circle()) {
		ctx.clearRect(0, 0, joyCanvas.width, joyCanvas.height);
		background();
		joystick(coord.x, coord.y);
		drawJoystick(event);
	}
	joyCanvas.style.cursor = 'grabbing';
	event.preventDefault();
	event.stopPropagation();
}

function stopDrawing(event) {
	paint = false;
	ctx.clearRect(0, 0, joyCanvas.width, joyCanvas.height);
	background();
	joystick(width / 2, height / 2);
	iframeDocument.getElementById('x_coordinate').innerText = '0';
	iframeDocument.getElementById('y_coordinate').innerText = '0';
	iframeDocument.getElementById('speed').innerText = '0';
	iframeDocument.getElementById('angle').innerText = '0';
	joyCanvas.style.cursor = 'grab';

	g.emulatedInput = 0;
	event.stopPropagation();
}

// Divide circle into 8 sectors and return sector number from given angle
function getSection(angle) {
	let a = angle + 45 / 2;
	a = a % 360;
	if (a < 0)
		a += 360;
	return Math.floor(a / 45);
}

function drawJoystick(event) {
	if (paint) {
		ctx.clearRect(0, 0, joyCanvas.width, joyCanvas.height);
		background();
		let x;
		let y;
		const angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

		const angle_in_degrees = Math.sign(angle) === -1 ? Math.round(-angle * 180 / Math.PI) : Math.round(360 - angle * 180 / Math.PI);
		if (is_it_in_the_circle()) {
			joystick(coord.x, coord.y);
			x = coord.x;
			y = coord.y;
		}
		else {
			x = radius * Math.cos(angle) + x_orig;
			y = radius * Math.sin(angle) + y_orig;
			joystick(x, y);
		}

		getPosition(event);

		const speed = Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);
		const x_relative = Math.round(x - x_orig);
		const y_relative = Math.round(y - y_orig);

		iframeDocument.getElementById('x_coordinate').innerText = x_relative.toString();
		iframeDocument.getElementById('y_coordinate').innerText = y_relative.toString();
		iframeDocument.getElementById('speed').innerText = speed.toString();
		iframeDocument.getElementById('angle').innerText = angle_in_degrees.toString();

		if (speed > 50) {
			switch (getSection(angle_in_degrees)) {
				// start with right and go anti-clockwise
				case 0:
					g.emulatedInput = Input.RIGHT;
					break;
				case 1:
					g.emulatedInput = Input.RIGHT | Input.UP;
					break;
				case 2:
					g.emulatedInput = Input.UP;
					break;
				case 3:
					g.emulatedInput = Input.UP | Input.LEFT;
					break;
				case 4:
					g.emulatedInput = Input.LEFT;
					break;
				case 5:
					g.emulatedInput = Input.LEFT | Input.DOWN;
					break;
				case 6:
					g.emulatedInput = Input.DOWN;
					break;
				case 7:
					g.emulatedInput = Input.DOWN | Input.RIGHT;
					break;
				default:
					g.emulatedInput = 0;
					break;
			}
		}
		else {
			g.emulatedInput = 0;
		}
	}

	event.stopPropagation();
}