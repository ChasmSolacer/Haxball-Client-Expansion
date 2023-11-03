/*
 HaxBall @ 2023 - Mario Carbajal - All rights reserved.
 00f80ea7
*/
'use strict';
const version = 'Indev 0.6';
// Version check
fetch('https://raw.githubusercontent.com/ChasmSolacer/Haxball-Client-Expansion/master/versions.json')
	.then(r => r.json()).then(vs => {
	const githubVersion = vs?.['hce_game-mod'];
	console.info('HCE ' + version);
	if (githubVersion?.length > 0) {
		if (version !== githubVersion)
			console.info('⬇️ Latest main version: ' + githubVersion + '. Download at https://github.com/ChasmSolacer/Haxball-Client-Expansion/archive/refs/heads/master.zip');
	}
	else
		console.warn('Version check failed');
});

(function (globalScope) {
		window.parent.g = {};
		/**
		 * game-min.js commit short hash as seen in the top comment.
		 * @type {string}
		 */
		window.parent.g.gameBaseVersion = '00f80ea7';
		/**
		 * 0 – None, 1 – Up, 2 – Down, 4 – Left, 8 – Right, 16 – Kick.
		 * To go up and left and kick simultaneously, set this to 1|4|16 which equals 21
		 * @type {number}
		 */
		window.parent.g.emulatedInput = 0;
		/**
		 * This will override player ping if not null.
		 * @type {number|null}
		 */
		window.parent.g.fakePing = null;
		/**
		 * This line will be rendered on the game canvas.
		 * @type {{strokeStyle: string, width: number, enabled: boolean, startPos: {x: number, y: number}, endPos: {x: number, y: number}}}
		 */
		window.parent.g.line = {
			enabled: false,
			width: 1,
			strokeStyle: '#0008',
			startPos: {x: 0, y: 0},
			endPos: {x: 0, y: 0}
		}

		/* Utility functions begin */
		/**
		 * @param {class_sa_DynamicDisc} dynDisc
		 * @return {{}}
		 */
		function getDynamicDiscObject(dynDisc) {
			if (dynDisc == null)
				return null;
			return {
				frameNo: dynDisc.jc,
				self: dynDisc.ic,
				id: dynDisc.Fl,
				cGroup: dynDisc.B,
				cMask: dynDisc.h,
				u1: dynDisc.ak,
				color: dynDisc.S,
				damping: dynDisc.Ea,
				invMass: dynDisc.ca,
				bCoeff: dynDisc.o,
				radius: dynDisc.V,
				xgravity: dynDisc.ra.x,
				ygravity: dynDisc.ra.y,
				xspeed: dynDisc.G.x,
				yspeed: dynDisc.G.y,
				x: dynDisc.a.x,
				y: dynDisc.a.y
			};
		}

		/**
		 * @param {class_ua_FullPlayer} fullPlayer
		 * @return {{}}
		 */
		function getFullPlayerObject(fullPlayer) {
			if (fullPlayer == null)
				return null;
			const playerDisc = getDynamicDiscObject(fullPlayer.J);
			return {
				frameNo: fullPlayer.Bc,
				self: fullPlayer.xn,
				team: fullPlayer.fa?.ba,
				disc: playerDisc,
				position: playerDisc == null ? null : {x: playerDisc.x, y: playerDisc.y},
				// When a player kicks the ball, it is set to min and decrements every frame. When it reaches 0, the player can kick when kickMana > 0.
				nextKickIn: fullPlayer.Zc,
				// This equals to rate * burst. When the player kicks the ball, burst is subtracted from it, and it increments every frame.
				// When it goes below 0, the player can't kick.
				kickRateBurst: fullPlayer.Ac,
				isBlinking: fullPlayer.Yb,
				id: fullPlayer.Y,
				inputKey: fullPlayer.W,
				name: fullPlayer.D,
				ping: fullPlayer.Ab,
				u1: fullPlayer.ah,
				flag: fullPlayer.country,
				desynchronized: fullPlayer.Ud,
				avatarOverride: fullPlayer.Td,
				avatar: fullPlayer.Zb,
				order: fullPlayer.Nb,
				admin: fullPlayer.fb
			};
		}

		/**
		 * @param {class_ab_GameObjects} gameObjects
		 * @return {{}}
		 */
		function getGameObjectsObject(gameObjects) {
			return gameObjects == null ? null : {
				frameNo: gameObjects.jc,
				self: gameObjects.ic,
				dynamicDiscs: gameObjects.H.map(rawDynDisc => getDynamicDiscObject(rawDynDisc))
			};
		}

		/**
		 * @param {class_ca_Game} game
		 * @return {{id, self, time, blue, red, team, phase, gameObjects, timeLimit, scoreLimit, stadium}}
		 */
		function getGameObject(game) {
			if (game == null) {
				return null;
			}
			else {
				return {
					frameNo: game.jc,
					self: game.ic,
					u1: game.Ra,
					time: game.Mc,
					blue: game.Ob,
					red: game.Tb,
					team: game.ie,
					phase: game.Db,
					u2: game.yc,
					gameObjects: getGameObjectsObject(game.va),
					timeLimit: 60 * game.Ga,
					scoreLimit: game.kb,
					stadium: getStadiumObject(game.T)
				};
			}
		}

		/**
		 * @param {class_q_Stadium} stadium
		 * @return {{}}
		 */
		function getStadiumObject(stadium) {
			if (stadium == null)
				return null;
			return {
				vertexes: stadium.L,
				segments: stadium.X,
				planes: stadium.ta,
				goals: stadium.vc.map(rawGoal => class_q_Stadium.hp(rawGoal)),
				discs: stadium.H.map(rawDisc => getDynamicDiscObject(rawDisc)),
				joints: stadium.qb,
				redSpawnPoints: stadium.Nd,
				blueSpawnPoints: stadium.vd,
				playerPhysics: stadium.Ld,
				limit: stadium.Fh,
				maxViewWidth: stadium.kf,
				cameraFollowsPlayer: stadium.Re,
				canBeStored: stadium.Xf,
				kickOffResetFull: stadium.Af,
				name: stadium.D
			};
		}

		/**
		 * @param {class_ta_RoomState} roomState
		 * @return {{id, self, stadium, game, players, name, teamColors}}
		 */
		function getRoomStateObject(roomState) {
			if (roomState == null)
				return null;
			return {
				frameNo: roomState.jc,
				self: roomState.ic,
				stadium: getStadiumObject(roomState.T),
				min: roomState.Hd,
				rate: roomState.fd,
				burst: roomState.ke,
				timeLimit: roomState.Ga,
				scoreLimit: roomState.kb,
				teamsLocked: roomState.Vc,
				game: getGameObject(roomState.M),
				players: roomState.K.map(fullPlayer => getFullPlayerObject(fullPlayer)),
				name: roomState.lc,
				teamColors: roomState.mb,

				getFullPlayerById: id => roomState.qa(id)
			};
		}

		/**
		 * @param {class_Na_ServerRoom|class_Rb_ClientRoom} room
		 * @return {{}}
		 */
		function getRoomObject(room) {
			return {
				self: room,
				password: room.Kb,
				playerId: room.xc,
				roomState: getRoomStateObject(room.U)
			};
		}

		/**
		 * @param {class_Ma_RoomManager} roomManager
		 * @return {{}}
		 */
		function getRoomManagerObject(roomManager) {
			return {
				self: roomManager,
				roomLink: roomManager.Kg,
				replay: roomManager.Od,
				room: getRoomObject(roomManager.za),

				sendChat: roomManager.l.Ka.Bl,
				showChatIndicator: roomManager.l.Ka.tg,
				setAvatar: text => roomManager.$f.Bm(text),
				startReplay: () => {
					if (roomManager.Od == null) {
						// Start replaying
						roomManager.es();
						// Mark rec button as active
						roomManager.l.Xa.Vr(true);
					}
				},
				stopReplay: () => {
					if (roomManager.Od != null) {
						// Stop replaying and save Uint8Array
						const replayArray = roomManager.Od.stop();
						roomManager.Od = null;
						// Mark rec button as inactive
						roomManager.l.Xa.Vr(false);
						return replayArray;
					}
				}
			};
		}
		/* Utility functions end */

		function function_ja() {
			return class_w.Me(this, '');
		}

		function function_gc(a) {
			return 66 > a ? 66 : 400 < a ? 400 : a;
		}

		function function_M(a, b) {
			if (null == b)
				return null;
			null == b.ph && (b.ph = globalScope.Fj++);
			var c;
			null == a.qj ? a.qj = {} : c = a.qj[b.ph];
			null == c && (c = b.bind(a),
				a.qj[b.ph] = c);
			return c;
		}

		class class_W_RoomParent {
			constructor(a) {
				class_W_RoomParent.zb || this.Za(a);
			}

			Za(a) {
				this.aa = 0;
				this.U = a;
			}
		}

		class class_Ma_RoomManager {
			constructor(a) {
				this.Zf = null;
				this.$k = this.Dh = false;
				this.gd = window.performance.now();
				/** @type {class_gc_Replay} */
				this.Od = null;
				this.Oe = 0;
				this.io = new class_tb(3, 1E3);
				this.W = new class_Nb;
				this.Kg = 'Waiting for link';
				this.Gi = this.wm = false;
				this.Bd = 0;
				let b = this;
				this.$f = new class_Xb(a, function (d) {
						b.l.Ka.Ib(d);
					}
				);
				this.za = a;
				a.U.Io = function (d) {
					b.wm != d && (b.wm = d,
						a.ua(class_Ha.pa(d)));
				}
				;
				this.l = new class_ua(a.xc);
				window.top.document.body.classList.add('hb-playing');
				this.Mh = new class_Vb(this.l, a.U.qa(a.xc).D);
				this.Mh.zi(a.U);
				/** Send chat */
				this.l.Ka.Bl = function_M(this, this.hq);
				/** Show chat indicator */
				this.l.Ka.tg = function_M(this, this.gq);
				window.document.addEventListener('keydown', function_M(this, this.Fa));
				window.document.addEventListener('keyup', function_M(this, this.kd));
				window.onbeforeunload = function () {
					return 'Are you sure you want to leave the room?';
				}
				;
				this.W.yg = function (d) {
					a.A();
					a.ua(d);
				}
				;
				this.W.ul = function (d) {
					'ToggleChat' == d && b.l.Ka.Wm();
				}
				;
				this.l.Xa.Dq = function (d) {
					a.ua(class_va.pa(1, d));
				}
				;
				this.l.Xa.vq = function (d) {
					a.ua(class_va.pa(0, d));
				}
				;
				this.l.zg = function (d) {
					a.ua(class_Ia.pa(d));
				}
				;
				this.l.Xa.Aq = function () {
					a.ua(new class_Wa);
				}
				;
				this.l.Xa.Bq = function () {
					a.ua(new class_Xa);
				}
				;
				this.l.Xa.oq = function () {
					b.Xm();
				}
				;
				this.l.Xa.xg = function (d, e) {
					a.ua(class_fa.pa(d, e));
				}
				;
				this.l.Xa.me = function_M(this, this.yr);
				this.l.Xa.eq = function () {
					a.ua(new class_Ya);
				}
				;
				this.l.Xa.rq = function () {
					class_Ma_RoomManager.cr(a);
				}
				;
				this.l.Xa.Cq = function (d) {
					a.ua(class_Ja.pa(d));
				}
				;
				this.l.Xa.tf = function (d) {
					let e = a.U.qa(d);
					if (null != e) {
						let f = new class_ub(e, b.Gi);
						f.rb = function () {
							b.l.ab(null);
						}
						;
						f.cq = function (g, h) {
							a.ua(class_Ka.pa(g, h));
						}
						;
						f.li = function () {
							b.$r(e);
						}
						;
						b.l.ab(f.f, function () {
							f.A(a.U, b.Gi);
						});
					}
				}
				;
				this.l.Xa.yq = function () {
					let d = new class_gb;
					d.rb = function () {
						b.l.ab(null);
					}
					;
					b.l.ab(d.f, function () {
						d.Sr(b.Kg);
					});
				}
				;
				this.l.Xa.sq = function () {
					if (null == b.Od)
						b.es();
					else {
						let d = b.Od.stop();
						b.Od = null;
						class_Ma_RoomManager.tm(d);
					}
					b.l.Xa.Vr(null != b.Od);
				}
				;
				window.requestAnimationFrame(function_M(this, this.pf));
				this.Kh = window.setInterval(function () {
					b.l.Gf.Dm(b.Bd);
					b.Bd = 0;
				}, 1E3);
				this.ej = window.setInterval(function () {
					a.A();
				}, 50);
				var c = class_m.j.Ad.v();
				c = -200 > c ? -200 : 1E3 < c ? 1E3 : c;
				0 != c && (a.Cm(class_m.j.Ad.v()),
					this.l.Ka.Ib('Extrapolation set to ' + c + ' msec'));

				// Exposing global fields begin
				window.parent.g.getRoomManager = () => getRoomManagerObject(this);
				window.parent.g.getRoomState = () => getRoomManagerObject(b).room.roomState;
				window.parent.g.getCurrentStadium = () => {
					const roomState = getRoomManagerObject(b).room.roomState;
					return roomState.stadium;
				};
				// Assuming that goal posts are symmetric with respect to the origin (that only a sign changes in the coordinates)
				window.parent.g.getGoalPostPoint = () => {
					const roomState = getRoomManagerObject(b).room.roomState;
					const currentGame = roomState.game;
					let goalPostPoint = null;
					if (currentGame?.stadium != null) {
						const goals = currentGame.stadium.goals;
						if (goals?.length > 0)
							goalPostPoint = {
								x: Math.abs(goals[0].p0[0]),
								y: Math.abs(goals[0].p0[1])
							};
					}
					return goalPostPoint;
				};
				window.parent.g.getPlayer = playerId => {
					const roomState = getRoomManagerObject(b).room.roomState;
					const fullPlayer = roomState.getFullPlayerById(playerId);
					return fullPlayer == null ? null : getFullPlayerObject(fullPlayer);
				};
				window.parent.g.getPlayerList = () => {
					const roomState = getRoomManagerObject(b).room.roomState;
					return roomState.players;
				};
				window.parent.g.getScores = () => {
					const roomState = getRoomManagerObject(b).room.roomState;
					return roomState.game;
				};
				window.parent.g.getBallPosition = () => {
					const roomState = getRoomManagerObject(b).room.roomState;
					const currentGame = roomState.game;
					if (currentGame == null)
						return null;
					const ballDisc = currentGame.gameObjects.dynamicDiscs[0];
					return {
						x: ballDisc.x,
						y: ballDisc.y
					};
				};
				window.parent.g.getDiscProperties = discIndex => {
					const roomState = getRoomManagerObject(b).room.roomState;
					const currentGame = roomState.game;
					return currentGame == null ? null : currentGame.gameObjects.dynamicDiscs[discIndex];
				};
				window.parent.g.getPlayerDiscProperties = playerId => {
					const roomState = getRoomManagerObject(b).room.roomState;
					const currentGame = roomState.game;
					if (currentGame == null)
						return null;
					const fullPlayer = roomState.getFullPlayerById(playerId);
					const player = getFullPlayerObject(fullPlayer);
					return player?.disc;
				};
				window.parent.g.getDiscCount = () => {
					const roomState = getRoomManagerObject(b).room.roomState;
					const currentGame = roomState.game;
					return currentGame == null ? 0 : currentGame.gameObjects.dynamicDiscs.length;
				};
				window.parent.g.CollisionFlags = {
					ball: 1,
					red: 2,
					blue: 4,
					redKO: 8,
					blueKO: 16,
					wall: 32,
					kick: 64,
					score: 128,
					c0: 268435456,
					c1: 536870912,
					c2: 1073741824,
					c3: -2147483648, // 2^31
					all: 63
				};
				const onRoomJoinFun = window.parent.g.onRoomJoin;
				if (onRoomJoinFun != null)
					onRoomJoinFun(getRoomManagerObject(this));
				// Exposing global fields end
			}

			es() {
				this.Od = new class_gc_Replay(this.za, 3);
			}

			$r(a) {
				a = new class_rb(a);
				let b = this;
				a.rb = function () {
					b.l.ab(null);
				}
				;
				a.li = function (c, d, e) {
					b.za.ua(class_la.pa(c, d, e));
					b.l.ab(null);
				}
				;
				this.l.ab(a.f);
			}

			la() {
				// Exposing global fields begin
				const onRoomLeaveFun = window.parent.g.onRoomLeave;
				if (onRoomLeaveFun != null)
					onRoomLeaveFun(getRoomManagerObject(this));
				// Exposing global fields end
				window.document.removeEventListener('keydown', function_M(this, this.Fa));
				window.document.removeEventListener('keyup', function_M(this, this.kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Oe);
				window.top.document.body.classList.remove('hb-playing');
				this.W.la();
				window.clearInterval(this.Kh);
				window.clearInterval(this.ej);
				window.clearTimeout(this.Zf);
			}

			yr(a) {
				let b = []
					,
					c = 0
					,
					d = this.za.U.K;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.fa == a && b.push(class_fa.pa(e.Y, class_u_Team.Oa));
				}
				for (a = 0; a < b.length;)
					this.za.ua(b[a++]);
			}

			pf() {
				this.Oe = window.requestAnimationFrame(function_M(this, this.pf));
				this.W.A();
				this.za.A();
				this.Qc();
			}

			Qc() {
				var a = window.performance.now();
				1 == class_m.j.Jh.v() && 28.333333333333336 > a - this.gd || (this.gd = a,
					this.Bd++,
					a = this.za.U.qa(this.za.xc),
				null != a && (this.Gi = a.fb),
					this.l.A(this.za));
			}

			hq(a) {
				let b = this;
				this.$f.uf(a) || this.io.yo(function () {
					let c = new class_Za;
					c.$c = a;
					b.za.ua(c);
				});
			}

			gq(a) {
				this.Dh = a;
				let b = this;
				null == this.Zf && (this.Zf = window.setTimeout(function () {
					b.Zf = null;
					b.xm(b.Dh);
				}, 1E3),
					this.xm(this.Dh));
			}

			xm(a) {
				a != this.$k && (this.za.ua(class_La.pa(a ? 0 : 1)),
					this.$k = a);
			}

			Xm() {
				if (null != this.za.U.M) {
					let a = new class_$a;
					a.Mf = 120 != this.za.U.M.Ra;
					this.za.ua(a);
				}
			}

			Fa(a) {
				var b = class_m.j.Sd;
				let c = null != class_m.j.Kd.v().v(a.code);
				switch (a.keyCode) {
					case 9:
					case 13:
						this.l.Ka.$a.focus({
							preventScroll: true
						});
						a.preventDefault();
						break;
					case 27:
						this.l.Xk() ? this.l.ab(null) : (b = this.l,
							b.ue(!b.nd));
						a.preventDefault();
						break;
					case 48: // Modified zoom
						c ? this.W.Fa(a) : b.ha(0.1);
						break;
					case 49:
						c ? this.W.Fa(a) : b.ha(1);
						break;
					case 50:
						c ? this.W.Fa(a) : b.ha(2);
						break;
					case 51:
						c ? this.W.Fa(a) : b.ha(3);
						break;
					case 52:
						c ? this.W.Fa(a) : b.ha(4);
						break;
					case 53:
						c ? this.W.Fa(a) : b.ha(5);
						break;
					case 54:
						c ? this.W.Fa(a) : b.ha(6);
						break;
					case 55:
						c ? this.W.Fa(a) : b.ha(7);
						break;
					case 56: // Modified zoom keys
						c ? this.W.Fa(a) : b.ha(15);
						break;
					case 57:
						c ? this.W.Fa(a) : b.ha(-1.5);
						break;
					case 80:
						this.Xm();
						break;
					default:
						this.W.Fa(a);
				}
			}

			kd(a) {
				this.W.kd(a);
			}

			static tm(a) {
				let b = new Date;
				class_Ob_ReplayDownloader.Dr(a, 'HBReplay-' + b.getFullYear() + '-' + class_ba.Lf('' + (b.getMonth() + 1)) + '-' + class_ba.Lf('' + b.getDate()) + '-' + class_ba.Lf('' + b.getHours()) + 'h' + class_ba.Lf('' + b.getMinutes()) + 'm.hbr2');
			}

			static cr(a) {
				var b = a.U.K;
				let c = [];
				var d = 0;
				let e = 0;
				for (var f = 0; f < b.length;) {
					let g = b[f];
					++f;
					g.fa == class_u_Team.Oa && c.push(g.Y);
					g.fa == class_u_Team.ia ? ++d : g.fa == class_u_Team.Da && ++e;
				}
				f = c.length;
				0 != f && (b = function () {
					return c.splice(Math.random() * c.length | 0, 1)[0];
				}
					,
					e == d ? 2 > f || (a.ua(class_fa.pa(b(), class_u_Team.ia)),
						a.ua(class_fa.pa(b(), class_u_Team.Da))) : (d = e > d ? class_u_Team.ia : class_u_Team.Da,
						a.ua(class_fa.pa(b(), d))));
			}
		}

		class class_ta_RoomState {
			constructor() {
				this.jc = -1;
				this.T = this.ic = null;
				this.Hd = 2;
				this.fd = 0;
				this.ke = 1;
				this.kb = this.Ga = 3;
				this.Vc = false;
				/** @type {class_ca_Game} */
				this.M = null;
				/** @type {class_ua_FullPlayer[]} */
				this.K = [];
				this.lc = '';
				/** @type {class_q_Stadium} */
				this.T = class_q_Stadium.Nh()[0];
				this.mb = [null, new class_va_TeamColors, new class_va_TeamColors];
				this.mb[1].hb.push(class_u_Team.ia.S);
				this.mb[2].hb.push(class_u_Team.Da.S);
			}

			ds(a) {
				if (null == this.M) {
					this.M = new class_ca_Game;
					for (var b = 0, c = this.K; b < c.length;) {
						let d = c[b];
						++b;
						d.J = null;
						d.Nb = 0;
					}
					this.M.vp(this);
					null != this.Ui && this.Ui(a);
				}
			}

			Yf(a, b, c) {
				if (b.fa != c) {
					b.fa = c;
					class_O.remove(this.K, b);
					this.K.push(b);
					if (null != this.M) {
						null != b.J && (class_O.remove(this.M.va.H, b.J),
							b.J = null);
						this.M.Uk(b);
						let d = 0
							,
							e = false;
						for (; !e;) {
							++d;
							e = true;
							let f = 0
								,
								g = this.K;
							for (; f < g.length;) {
								let h = g[f];
								++f;
								if (h != b && h.fa == b.fa && h.Nb == d) {
									e = false;
									break;
								}
							}
						}
						b.Nb = d;
					}
					class_kc.i(this.Tl, a, b, c);
				}
			}

			qa(a) {
				let b = 0
					,
					c = this.K;
				for (; b < c.length;) {
					let d = c[b];
					++b;
					if (d.Y == a)
						return d;
				}
				return null;
			}

			A(a) {
				null != this.M && this.M.A(a);
			}

			ga(a) {
				a.Fb(this.lc);
				a.m(this.Vc ? 1 : 0);
				a.P(this.kb);
				a.P(this.Ga);
				a.hj(this.ke);
				a.m(this.fd);
				a.m(this.Hd);
				this.T.ga(a);
				a.m(null != this.M ? 1 : 0);
				null != this.M && this.M.ga(a);
				a.m(this.K.length);
				let b = 0
					,
					c = this.K;
				for (; b < c.length;)
					c[b++].wa(a);
				this.mb[1].ga(a);
				this.mb[2].ga(a);
			}

			ma(a) {
				this.lc = a.Bb();
				this.Vc = 0 != a.F();
				this.kb = a.N();
				this.Ga = a.N();
				this.ke = a.vi();
				this.fd = a.F();
				this.Hd = a.F();
				this.T = class_q_Stadium.ma(a);
				var b = 0 != a.F();
				this.M = null;
				b && (this.M = new class_ca_Game,
					this.M.ma(a, this));
				b = null == this.M ? null : this.M.va.H;
				let c = a.F();
				for (var d = this.K; d.length > c;)
					d.pop();
				for (d = 0; d < c;) {
					let e = new class_ua_FullPlayer;
					e.xa(a, b);
					this.K[d++] = e;
				}
				this.mb[1].ma(a);
				this.mb[2].ma(a);
			}

			Mk() {
				let a = 0;
				var b = class_A.ka();
				this.ga(b);
				for (b = b.ms(); 4 <= b.s.byteLength - b.a;)
					a ^= b.N();
				return a;
			}

			Yo() {
				let a = class_A.ka(4);
				a.P(this.Mk());
				return a.Rg();
			}

			ro(a) {
				a = (new class_K(new DataView(a))).N();
				class_D.i(this.Io, this.Mk() != a);
			}

			Fm(a) {
				this.km = a;
			}

			Pb(a) {
				if (0 == a)
					return true;
				a = this.qa(a);
				return null != a && a.fb ? true : false;
			}

			Rr(a, b, c, d) {
				this.Hd = 0 > b ? 0 : 255 < b ? 255 : b;
				this.fd = 0 > c ? 0 : 255 < c ? 255 : c;
				0 > d ? d = 0 : 100 < d && (d = 100);
				this.ke = this.fd * d;
				class_bc.i(this.Zk, a, this.Hd, this.fd, d);
			}

			uc() {
				let a = class_qa.Bc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_ta_RoomState),
					this.jc = a,
					class_ta_RoomState.zd(b, this));
				return b;
			}

			static zd(a, b) {
				a.lc = b.lc;
				if (null == b.K)
					a.K = null;
				else {
					null == a.K && (a.K = []);
					let d = a.K
						,
						e = b.K;
					for (var c = e.length; d.length > c;)
						d.pop();
					c = 0;
					let f = e.length;
					for (; c < f;) {
						let g = c++;
						d[g] = e[g].Rs();
					}
				}
				a.M = null == b.M ? null : b.M.uc();
				a.Vc = b.Vc;
				a.kb = b.kb;
				a.Ga = b.Ga;
				a.ke = b.ke;
				a.fd = b.fd;
				a.Hd = b.Hd;
				a.T = b.T;
				a.mb = b.mb;
			}
		}

		class class_oa_Room extends class_W_RoomParent {
			constructor(a) {
				class_W_RoomParent.zb ? super() : (class_W_RoomParent.zb = true,
					super(),
					class_W_RoomParent.zb = false,
					this.Za(a));
			}

			Za(a) {
				this.aj = new class_Va;
				this.Be = this.ec = 0;
				this.te = new class_Va;
				this.xc = this.dc = this.Ad = 0;
				this.Dc = .06;
				this.oh = 16.666666666666668;
				this.Sf = 120;
				super.Za(a);
			}

			ua() {
				throw class_v.C('missing implementation');
			}

			eg() {
				throw class_v.C('missing implementation');
			}

			A() {
				throw class_v.C('missing implementation');
			}

			Oj(a) {
				let b = this.te.list
					,
					c = 0
					,
					d = b.length
					,
					e = 0;
				for (; e < a;) {
					for (++e; c < d;) {
						let f = b[c];
						if (f.ob != this.aa)
							break;
						f.apply(this.U);
						null != this.hc && this.hc(f);
						this.ec++;
						++c;
					}
					this.U.A(1);
					this.Be += this.ec;
					this.ec = 0;
					this.aa++;
				}
				for (; c < d;) {
					a = b[c];
					if (a.ob != this.aa || a.Cc != this.ec)
						break;
					a.apply(this.U);
					null != this.hc && this.hc(a);
					this.ec++;
					++c;
				}
				b.splice(0, c);
			}

			Lg(a) {
				a.ob == this.aa && a.Cc <= this.ec ? (a.Cc = this.ec++,
					a.apply(this.U),
				null != this.hc && this.hc(a)) : this.te.nn(a);
			}

			Ok(a, b) {
				if (0 >= a)
					return this.U;
				a > this.Sf && (a = this.Sf);
				class_qa.Bc++;
				let c = this.U.uc();
				null != b ? (this.aj.Js(this.te, b),
					b = this.aj) : b = this.te;
				b = b.list;
				let d = 0
					,
					e = b.length
					,
					f = this.aa
					,
					g = a | 0
					,
					h = f + g;
				for (; f <= h;) {
					for (; d < e;) {
						let k = b[d];
						if (k.ob > f)
							break;
						k.Kf.Ca && k.apply(c);
						++d;
					}
					c.A(f != h ? 1 : a - g);
					++f;
				}
				for (a = this.aj.list; 0 < a.length;)
					a.pop();
				return c;
			}

			Pr(a) {
				300 < a && (a = 300);
				0 > a && (a = 0);
				this.dc = this.Dc * a | 0;
			}

			Cm(a) {
				this.Ad = this.Dc * (-200 > a ? -200 : 1E3 < a ? 1E3 : a);
			}
		}

		class class_Na_ServerRoom extends class_oa_Room {
			constructor(a, b) {
				class_W_RoomParent.zb = true;
				super();
				class_W_RoomParent.zb = false;
				this.Za(a, b);
			}

			Za(a, b) {
				this.Mi = [];
				this.xi = [];
				this.Eg = new class_Va;
				this.$p = 1;
				this.yd = this.Um = 0;
				this.$i = new class_$b(50);
				this.Dg = new class_$b(50);
				this.In = 500;
				this.xk = '';
				super.Za(b.state);
				this.Yh = b.st;
				this.Ue = b.Ms;
				let c = null
					,
					d = this;
				c = function (e) {
					d.Ff(0);
					let f = class_A.ka();
					f.Xb(b.version);
					f.Fb(b.password);
					d.rc = new class_ac(b.uj, b.iceServers, a, class_qc.channels, f, b.Dn);
					d.rc.rh = e;
					d.rc.Id = function (h) {
						d.rc = null;
						d.sa = h;
						h.wg = function (k) {
							k = new class_K(new DataView(k));
							d.Wq(k);
						}
						;
						h.qf = function () {
							3 != d.yd && class_D.i(d.rf, ia.Qf('Connection closed'));
							d.la();
						}
						;
						h = window.setTimeout(function () {
							class_D.i(d.rf, ia.Qf('Game state timeout'));
							d.la();
						}, 1E4);
						d.ze = h;
						d.Ff(2);
					}
					;
					d.rc.Cl = function () {
						d.Ff(1);
					}
					;
					let g = false;
					d.rc.tl = function () {
						g = true;
					}
					;
					d.rc.jd = function (h) {
						if (!e && 1 == d.yd && g)
							class_H.i(d.uq),
								c(true);
						else {
							let k = class_ac.ap(h);
							switch (h.pb) {
								case 0:
									h = ia.Je;
									break;
								case 1:
									h = ia.Ke(h.code);
									break;
								case 2:
									h = ia.Ie;
									break;
								default:
									h = ia.Qf(k);
							}
							class_D.i(d.rf, h);
							d.la(k);
						}
					};
				}
				;
				c(null != b.zn && b.zn);
			}

			la(a) {
				null != this.rc && (this.rc.jd = null,
					this.rc.eo(),
					this.rc = null);
				window.clearTimeout(this.ze);
				null != this.sa && (this.sa.qf = null,
					this.sa.la(),
					this.sa = null);
				this.xk = null == a ? 'Connection closed' : a;
				this.Ff(4);
			}

			Ff(a) {
				this.yd != a && (this.yd = a,
				null != this.Jd && this.Jd(a));
			}

			Fd() {
				return 3 == this.yd;
			}

			A() {
				this.Fd() && window.performance.now() - this.Um > this.In && this.Ii();
				this.dd = window.performance.now() * this.Dc + this.$i.hh() - this.aa;
				this.ck();
			}

			eg() {
				return this.Fd() ? (0 > this.dc && (this.dc = 0),
					this.Ok(window.performance.now() * this.Dc + this.$i.hh() - this.aa + this.dc + this.Ad, this.Eg)) : this.U;
			}

			ck() {
				0 > this.dd && (this.dd = 0);
				this.dd > this.Sf && (this.dd = this.Sf);
			}

			Wq(a) {
				switch (a.F()) {
					case 0:
						this.Tq(a);
						break;
					case 1:
						this.Sq(a);
						break;
					case 2:
						this.Pq(a);
						break;
					case 3:
						this.Yq(a);
						break;
					case 4:
						this.Vq(a);
						break;
					// Kick/Ban
					case 5:
						this.Rq(a);
						break;
					case 6:
						this.Xq(a);
				}
			}

			Tq(a) {
				a = a.tb(a.Cb());
				let b = Promise.resolve(null);
				null != this.Ue && (b = this.Ue.bs(a));
				let c = this;
				b.catch(function () {
					return null;
				}).then(function (d) {
					c.Lr(d);
				});
			}

			Sq(a) {
				a = pako.inflateRaw(a.tb());
				a = new class_K(new DataView(a.buffer, a.byteOffset, a.byteLength));
				this.xc = a.Sb();
				this.aa = a.jb();
				this.Be = a.jb();
				this.ec = a.Cb();
				this.dd = 10;
				for (this.U.ma(a); 0 < a.s.byteLength - a.a;)
					this.Lg(this.bn(a));
				window.clearTimeout(this.ze);
				this.Ff(3);
			}

			Lr(a) {
				let b = class_A.ka();
				b.m(0);
				null != a ? (b.nb(a.byteLength),
					b.Lb(a)) : b.nb(0);
				b.nb(this.Yh.byteLength);
				b.Ug(this.Yh);
				this.Vb(b);
				this.Yh = null;
			}

			Vb(a, b) {
				null == b && (b = 0);
				this.sa.Vb(b, a);
			}

			bn(a) {
				let b = a.jb()
					,
					c = a.Cb()
					,
					d = a.Sb()
					,
					e = a.jb();
				a = class_p.mh(a);
				a.R = d;
				a.Ce = e;
				a.ob = b;
				a.Cc = c;
				return a;
			}

			Pq(a) {
				a = this.bn(a);
				this.Lg(a);
				a.R == this.xc && this.Eg.kt(a.Ce);
				this.Xl();
			}

			Xq(a) {
				a = class_p.mh(a);
				a.R = 0;
				a.Ce = 0;
				a.apply(this.U);
				null != this.hc && this.hc(a);
			}

			Yq(a) {
				let b = a.jb();
				a = a.jb();
				this.xi.push({
					frame: b,
					Jf: a
				});
				this.Xl();
			}

			Xl() {
				if (3 == this.yd) {
					for (var a = 0, b = this.xi; a < b.length;) {
						var c = b[a];
						++a;
						c.frame <= this.aa || c.Jf == this.Be + this.ec + this.te.Ks(c.frame) && this.Rn(c.frame - this.aa);
					}
					a = 0;
					b = this.xi;
					c = 0;
					for (var d = b.length; c < d;) {
						let e = b[c++];
						e.frame > this.aa && (b[a] = e,
							++a);
					}
					for (; b.length > a;)
						b.pop();
					this.Eg.jt(this.aa);
				}
			}

			Rq(a) {
				let b = 0 != a.F()
					,
					c = a.kc()
					,
					d = '';
				0 < a.s.byteLength - a.a && (d = a.kc());
				a = b ? 'You were banned' : 'You were kicked';
				'' != d && (a += ' by ' + d);
				'' != c && (a += ' (' + c + ')');
				this.la(a);
			}

			Vq(a) {
				var b = a.w();
				a = a.w();
				let c = window.performance.now() - a;
				this.$i.add(b - a * this.Dc);
				this.Dg.add(c);
				let d = b = 0
					,
					e = this.Mi;
				for (; d < e.length;) {
					let f = e[d];
					++d;
					if (f > a)
						break;
					f < a ? class_D.i(this.zl, -1) : class_D.i(this.zl, c);
					++b;
				}
				this.Mi.splice(0, b);
			}

			// Ping
			Ii() {
				let a = window.performance.now();
				this.Um = a;
				this.Mi.push(a);
				let b = this.Dg.hh() | 0
					,
					c = class_A.ka();
				if (window.parent.g.fakePing != null)
					b = window.parent.g.fakePing;
				c.m(2);
				c.u(a);
				c.nb(b);
				this.Vb(c, 2);
			}

			Rn(a) {
				this.Oj(a);
				this.dd -= a;
				this.ck();
			}

			ua(a) {
				if (3 == this.yd) {
					var b = this.$p++
						,
						c = 0;
					0 > this.dc && (this.dc = 0);
					a.Kf.delay && (c = this.aa + (this.dd | 0) + this.dc);
					var d = class_A.ka();
					d.m(1);
					d.ub(c);
					d.ub(b);
					class_p.wj(a, d);
					this.Vb(d);
					a.Kf.Ca && (a.Ce = b,
						a.R = this.xc,
						a.ob = c,
						this.Eg.nn(a));
				}
			}

			static Bh(a) {
				switch (a.pb) {
					case 0:
						return 'Cancelled';
					case 1:
						return 'Failed to connect to peer.';
					case 2:
						return class_Ic.description(a.reason);
					case 3:
						return a.description;
				}
			}
		}

		class class_Rb_ClientRoom extends class_oa_Room {
			constructor(a) {
				class_W_RoomParent.zb = true;
				super();
				class_W_RoomParent.zb = false;
				this.Za(a);
			}

			Za(a) {
				this.Zj = new Map;
				this.Kb = null;
				this.qg = 32;
				this.Te = new Map;
				this.cc = [];
				this.Fi = 2;
				this.lo = 600;
				super.Za(a.state);
				this.Up = a.uj;
				this.ys = a.version;
				this.Vp = 1;
				this.al = this.xc = 0;
				this.Vi = window.performance.now();
				this.Nc = new class_Db(this.Up, a.iceServers, class_qc.channels, a.Dn);
				this.Nc.mk = function_M(this, this.mp);
				let b = this;
				this.Nc.xl = function (c) {
					b.nq(c);
				}
				;
				this.Nc.vg = function (c) {
					class_D.i(b.vg, c);
				}
				;
				this.Nc.sf = function (c, d) {
					null != b.sf && b.sf(c, d);
				};
			}

			la() {
				this.Nc.la();
				let a = 0
					,
					b = this.cc;
				for (; a < b.length;) {
					let c = b[a++].sa;
					c.qf = null;
					c.wg = null;
					c.la();
				}
			}

			Ro(a, b, c, d) {
				let e = this.Te.get(a);
				if (null != e) {
					if (d) {
						let f = this.Nc.Vn(e.sa);
						this.Zj.set(a, f);
					}
					a = class_A.ka();
					a.m(5);
					a.m(d ? 1 : 0);
					a.oc(b);
					null == c && (c = '');
					a.oc(c);
					e.Vb(a);
					e.sa.la();
				}
			}

			ce() {
				this.Nc.ce();
				this.Zj.clear();
			}

			Oi(a) {
				this.Nc.Oi(a);
			}

			Ni(a) {
				this.Nc.Ni(a);
			}

			ua(a) {
				a.R = 0;
				let b = this.aa + this.Fi + this.dc;
				a.Kf.delay || (b = this.aa);
				a.ob = b;
				this.Lg(a);
				this.Li();
				0 < this.cc.length && this.Mg(this.fi(a), 1);
			}

			A() {
				let a = ((window.performance.now() - this.Vi) * this.Dc | 0) - this.aa;
				0 < a && this.Oj(a);
				7 <= this.aa - this.bl && this.Li();
				this.aa - this.al >= this.lo && (this.Li(),
					this.Jr());
			}

			eg() {
				0 > this.dc && (this.dc = 0);
				return this.Ok((window.performance.now() - this.Vi) * this.Dc - this.aa + this.Fi + this.dc + this.Ad);
			}

			mp(a, b) {
				if (this.cc.length >= this.qg)
					return fb.Rf(4100);
				try {
					if (b.Sb() != this.ys)
						throw class_v.C(null);
				}
				catch (c) {
					return fb.Rf(4103);
				}
				try {
					let c = b.Bb();
					if (null != this.Kb && c != this.Kb)
						throw class_v.C(null);
				}
				catch (c) {
					return fb.Rf(4101);
				}
				return fb.Gj;
			}

			nq(a) {
				if (this.cc.length >= this.qg)
					a.la();
				else {
					var b = new class_yc(a);
					this.cc.push(b);
					var c = this;
					a.wg = function (d) {
						d = new class_K(new DataView(d));
						c.Qq(d, b);
					}
					;
					a.qf = function () {
						class_O.remove(c.cc, b);
						c.Te.delete(b.ba);
						class_D.i(c.jq, b.ba);
					}
					;
					a = class_A.ka(1 + b.Se.byteLength);
					a.m(0);
					a.nb(b.Se.byteLength);
					a.Lb(b.Se);
					b.Vb(a);
				}
			}

			fi(a) {
				let b = class_A.ka();
				b.m(2);
				this.El(a, b);
				return b;
			}

			El(a, b) {
				b.ub(a.ob);
				b.nb(a.Cc);
				b.Xb(a.R);
				b.ub(a.Ce);
				class_p.wj(a, b);
			}

			Li() {
				if (!(0 >= this.aa - this.bl) && 0 != this.cc.length) {
					var a = class_A.ka();
					a.m(3);
					a.ub(this.aa);
					a.ub(this.Be);
					this.Mg(a, 2);
					this.bl = this.aa;
				}
			}

			Mg(a, b) {
				null == b && (b = 0);
				let c = 0
					,
					d = this.cc;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.Ig && e.Vb(a, b);
				}
			}

			Kr(a) {
				let b = class_A.ka();
				b.m(1);
				let c = class_A.ka();
				c.Xb(a.ba);
				c.ub(this.aa);
				c.ub(this.Be);
				c.nb(this.ec);
				this.U.ga(c);
				let d = this.te.list
					,
					e = 0
					,
					f = d.length;
				for (; e < f;)
					this.El(d[e++], c);
				b.Lb(pako.deflateRaw(c.Wb()));
				a.Vb(b);
			}

			Jr() {
				this.al = this.aa;
				if (0 != this.cc.length) {
					var a = new class_db;
					a.ob = this.aa;
					a.Cc = this.ec++;
					a.R = 0;
					a.Yg = this.U.Yo();
					this.Mg(this.fi(a));
				}
			}

			$q(a, b) {
				let c = a.tb(a.Cb())
					,
					d = a.tb(a.Cb());
				a = b.Se;
				b.Se = null;
				let e = this;
				class_T.xs(c, a).catch(function () {
					return null;
				}).then(function (f) {
					try {
						if (-1 != e.cc.indexOf(b)) {
							b.tt = f;
							var g = e.Vp++;
							b.ba = g;
							e.Te.set(g, b);
							class_Ma.i(e.iq, g, new class_K(new DataView(d.buffer, d.byteOffset, d.byteLength), false));
							b.Ig = true;
							e.Kr(b);
						}
					}
					catch (h) {
						f = class_v.Mb(h).Gb(),
							e.Pk(b, f);
					}
				});
			}

			Qq(a, b) {
				this.A();
				try {
					if (!b.fp.Ym())
						throw class_v.C(1);
					let c = a.F();
					if (b.Ig)
						switch (c) {
							case 1:
								this.ar(a, b);
								break;
							case 2:
								this.Uq(a, b);
								break;
							default:
								throw class_v.C(0);
						}
					else if (0 == c)
						this.$q(a, b);
					else
						throw class_v.C(0);
					if (0 < a.s.byteLength - a.a)
						throw class_v.C(2);
				}
				catch (c) {
					this.Pk(b, class_v.Mb(c).Gb());
				}
			}

			Pk(a, b) {
				globalScope.console.log(b);
				this.Te.delete(a.ba);
				class_O.remove(this.cc, a);
				a.Ig && null != this.vl && this.vl(a.ba);
				a.sa.la();
			}

			Uq(a, b) {
				let c = a.w();
				b.Ab = a.Cb();
				a = class_A.ka();
				a.m(4);
				a.u((window.performance.now() - this.Vi) * this.Dc + this.Fi);
				a.u(c);
				b.Vb(a, 2);
			}

			ar(a, b) {
				var c = a.jb();
				let d = a.jb();
				a = class_p.mh(a);
				var e = a.Kf.yj;
				if (null != e) {
					var f = b.Mj.get(e);
					null == f && (f = new class_tb(e.lj, e.Ej),
						b.Mj.set(e, f));
					if (!f.Ym())
						throw class_v.C(3);
				}
				e = this.aa + this.Fi;
				f = this.aa;
				var g = this.aa + 20;
				f = c < f ? f : c > g ? g : c;
				g = c - e;
				if (a.Kf.delay) {
					if (g < -this.Fi - 3)
						f = e;
					else {
						let h = -this.Fi;
						let k = this.Fi;
						b.yc_field_new11nc.new11nc_method_1(g < h ? h : g > k ? k : g);
					}
					f < e && -.85 > b.yc_field_new11nc.new11nc_method_2() && (f = e);
					f < b.yc_field_number2 && (f = b.yc_field_number2);
					b.yc_field_number2 = f;
				}
				a.action_field3 = g;
				c = f - c;
				a.action_field2 = 0 < c ? c : 0;
				a.Ce = d;
				a.R = b.ba;
				a.ob = f;
				a.wn(this.U) && (this.Lg(a),
					this.Mg(this.fi(a), 1));
			}
		}

		class class_Sb_ReplayRoom extends class_oa_Room {
			constructor(a, b, c) {
				class_W_RoomParent.zb = true;
				super();
				class_W_RoomParent.zb = false;
				this.Za(a, b, c);
			}

			Za(a, b, c) {
				this.ml = [];
				this.Ll = 5;
				this.Pd = -1;
				this.sg = this.Ub = this.$h = this.Kk = 0;
				super.Za(b);
				a = new class_K(new DataView(a.buffer), false);
				if (1212305970 != a.jb())
					throw class_v.C('');
				b = a.jb();
				if (c != b)
					throw class_v.C(new class_Rb(b));
				this.yf = a.jb();
				c = pako.inflateRaw(a.tb());
				this.Rc = new class_K(new DataView(c.buffer, c.byteOffset, c.byteLength));
				this.dr(this.Rc);
				c = this.Rc.tb();
				this.Rc = new class_K(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
				this.Ci();
				this.$h = window.performance.now();
				this.xc = -1;
			}

			dr(a) {
				let b = a.Sb()
					,
					c = 0
					,
					d = 0;
				for (; d < b;) {
					++d;
					c += a.Cb();
					let e = a.F();
					this.ml.push({
						xj: c / this.yf,
						kind: e
					});
				}
			}

			$l() {
				var a = this.Rc;
				0 < a.s.byteLength - a.a ? (a = this.Rc.Cb(),
					this.sg += a,
					a = this.Rc.Sb(),
					this.rg = class_p.mh(this.Rc),
					this.rg.R = a) : this.rg = null;
			}

			ep() {
				return this.aa / this.yf;
			}

			ua() {
			}

			eg() {
				this.A();
				class_qa.Bc++;
				let a = this.U.uc();
				a.A(this.Kk);
				return a;
			}

			A() {
				var a = window.performance.now()
					,
					b = a - this.$h;
				this.$h = a;
				0 < this.Pd ? (this.Ub += 1E4,
				this.Ub > this.Pd && (this.Ub = this.Pd,
					this.Pd = -1)) : this.Ub += b * this.Ll;
				a = this.yf * this.oh;
				this.Ub > a && (this.Ub = a);
				b = this.Ub * this.Dc;
				a = b | 0;
				for (this.Kk = b - a; this.aa < a;) {
					for (; null != this.rg && this.sg == this.aa;)
						b = this.rg,
							b.apply(this.U),
						null != this.hc && this.hc(b),
							this.$l();
					this.aa++;
					this.U.A(1);
				}
			}

			Hr(a) {
				this.Pd = a;
				a < this.Ub && this.Ci();
			}

			Ci() {
				this.sg = 0;
				this.Ub = this.aa = this.Rc.a = 0;
				this.U.ma(this.Rc);
				this.$l();
			}
		}

		class class_ca_Game {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Tb = this.Ob = this.Mc = this.Ra = 0;
				this.ie = class_u_Team.ia;
				this.yc = this.Db = 0;
				this.va = new class_ab_GameObjects;
				this.Ga = 0;
				this.kb = 5;
				/** @type {class_q_Stadium} */
				this.T = null;
			}

			vp(a) {
				this.Qa = a;
				this.kb = a.kb;
				this.Ga = a.Ga;
				this.T = a.T;
				this.va.L = this.T.L;
				this.va.ta = this.T.ta;
				this.va.X = this.T.X;
				this.va.qb = this.T.qb;
				a = 0;
				let b = this.T.H;
				for (; a < b.length;)
					this.va.H.push(b[a++].Sp());
				this.Yk();
			}

			Uk(a) {
				if (a.fa == class_u_Team.Oa)
					a.J = null;
				else {
					a.W = 0;
					var b = a.J;
					null == b && (b = new class_sa_DynamicDisc,
						a.J = b,
						this.va.H.push(b));
					var c = this.T.Ld;
					b.S = 0;
					b.V = c.V;
					b.ca = c.ca;
					b.Ea = c.Ea;
					b.o = c.o;
					b.h = 39;
					b.B = a.fa.B | c.B;
					var d = a.fa == class_u_Team.ia ? this.T.Nd : this.T.vd;
					0 == d.length ? (b.a.x = a.fa.Gh * this.T.bc,
						b.a.y = 0) : (a = b.a,
						d = d[d.length - 1],
						a.x = d.x,
						a.y = d.y);
					d = b.G;
					d.x = 0;
					d.y = 0;
					b = b.ra;
					c = c.ra;
					b.x = c.x;
					b.y = c.y;
				}
			}

			A(a) {
				if (0 < this.Ra)
					120 > this.Ra && this.Ra--;
				else {
					// Exposing global fields begin
					const onGameTickFun = this.Qa.onGameTickFun;
					if (onGameTickFun != null)
						onGameTickFun(getGameObject(this));
					// Exposing global fields end

					var b = this.Qa.ut;
					null != b && b();
					b = this.Qa.K;
					for (var c = 0; c < b.length;) {
						var d = b[c];
						++c;
						if (null != d.J) {
							0 == (d.W & 16) && (d.Yb = false);
							var e = this.T.Ld;
							0 < d.Zc && d.Zc--;
							d.Ac < this.Qa.ke && d.Ac++;
							if (d.Yb && 0 >= d.Zc && 0 <= d.Ac) {
								for (var f = false, g = 0, h = this.va.H; g < h.length;) {
									var k = h[g];
									++g;
									if (0 != (k.B & 64) && k != d.J) {
										var l = k.a
											,
											n = d.J.a
											,
											r = l.x - n.x;
										l = l.y - n.y;
										n = Math.sqrt(r * r + l * l);
										if (4 > n - k.V - d.J.V) {
											f = r / n;
											r = l / n;
											l = e.cf;
											var t = n = k.G;
											k = k.ca;
											n.x = t.x + f * l * k;
											n.y = t.y + r * l * k;
											t = d.J;
											k = -e.df;
											n = l = t.G;
											t = t.ca;
											l.x = n.x + f * k * t;
											l.y = n.y + r * k * t;
											f = true;
										}
									}
								}
								f && (null != this.Qa.ri && this.Qa.ri(d),
									d.Yb = false,
									d.Zc = this.Qa.Hd,
									d.Ac -= this.Qa.fd);
							}
							f = d.W;
							h = g = 0;
							0 != (f & 1) && --h;
							0 != (f & 2) && ++h;
							0 != (f & 4) && --g;
							0 != (f & 8) && ++g;
							0 != g && 0 != h && (f = Math.sqrt(g * g + h * h),
								g /= f,
								h /= f);
							f = d.J.G;
							k = d.Yb ? e.ef : e.Ne;
							f.x += g * k;
							f.y += h * k;
							d.J.Ea = d.Yb ? e.ff : e.Ea;
						}
					}
					c = 0;
					d = this.va.H;
					e = 0;
					for (g = d.length; e < g;)
						f = e++,
							h = d[f],
						0 != (h.B & 128) && (class_ca_Game.wk[c] = f,
							f = class_ca_Game.rl[c],
							h = h.a,
							f.x = h.x,
							f.y = h.y,
							++c);
					this.va.A(a);
					if (0 == this.Db) {
						for (a = 0; a < b.length;)
							c = b[a],
								++a,
							null != c.J && (c.J.h = 39 | this.ie.Cp);
						b = this.va.H[0].G;
						0 < b.x * b.x + b.y * b.y && (this.Db = 1);
					}
					else if (1 == this.Db) {
						this.Mc += .016666666666666666;
						for (a = 0; a < b.length;)
							d = b[a],
								++a,
							null != d.J && (d.J.h = 39);
						d = class_u_Team.Oa;
						b = this.va.H;
						for (a = 0; a < c && (d = a++,
							d = this.T.jo(b[class_ca_Game.wk[d]].a, class_ca_Game.rl[d]),
						d == class_u_Team.Oa);)
							;
						d != class_u_Team.Oa ? (this.Db = 2,
							this.yc = 150,
							this.ie = d,
							d == class_u_Team.ia ? this.Ob++ : this.Tb++,
						null != this.Qa.Xi && this.Qa.Xi(d.Ag),
						null != this.Qa.km && this.Qa.km(d.ba)) : 0 < this.Ga && this.Mc >= 60 * this.Ga && this.Tb != this.Ob && (null != this.Qa.Zi && this.Qa.Zi(),
							this.Pm());
					}
					else if (2 == this.Db)
						this.yc--,
						0 >= this.yc && (0 < this.kb && (this.Tb >= this.kb || this.Ob >= this.kb) || 0 < this.Ga && this.Mc >= 60 * this.Ga && this.Tb != this.Ob ? this.Pm() : (this.Yk(),
						null != this.Qa.Nq && this.Qa.Nq()));
					else if (3 == this.Db && (this.yc--,
					0 >= this.yc && (b = this.Qa,
					null != b.M))) {
						b.M = null;
						a = 0;
						for (c = b.K; a < c.length;)
							d = c[a],
								++a,
								d.J = null,
								d.Nb = 0;
						null != b.Hf && b.Hf(null);
					}
				}
			}

			Pm() {
				this.yc = 300;
				this.Db = 3;
				null != this.Qa.Yi && this.Qa.Yi(this.Tb > this.Ob ? class_u_Team.ia : class_u_Team.Da);
			}

			Yk() {
				let a = this.Qa.K;
				this.Db = 0;
				for (var b = this.T.H, c = this.va.H, d = 0, e = this.T.Af ? b.length : 1; d < e;) {
					var f = d++;
					b[f].Tk(c[f]);
				}
				b = [0, 0, 0];
				for (c = 0; c < a.length;)
					if (d = a[c],
						++c,
						this.Uk(d),
						e = d.fa,
					e != class_u_Team.Oa) {
						f = d.J.a;
						var g = this.T
							,
							h = b[e.ba]
							,
							k = e == class_u_Team.ia ? g.Nd : g.vd;
						0 == k.length ? (k = h + 1 >> 1,
						0 == (h & 1) && (k = -k),
							g = g.mc * e.Gh,
							h = 55 * k) : (h >= k.length && (h = k.length - 1),
							h = k[h],
							g = h.x,
							h = h.y);
						f.x = g;
						f.y = h;
						b[e.ba]++;
						d.Nb = b[e.ba];
					}
			}

			ga(a) {
				this.va.ga(a);
				a.P(this.yc);
				a.P(this.Db);
				a.P(this.Tb);
				a.P(this.Ob);
				a.u(this.Mc);
				a.P(this.Ra);
				a.m(this.ie.ba);
			}

			ma(a, b) {
				this.va.ma(a);
				this.yc = a.N();
				this.Db = a.N();
				this.Tb = a.N();
				this.Ob = a.N();
				this.Mc = a.w();
				this.Ra = a.N();
				a = a.wf();
				this.ie = 1 == a ? class_u_Team.ia : 2 == a ? class_u_Team.Da : class_u_Team.Oa;
				this.Qa = b;
				this.kb = b.kb;
				this.Ga = b.Ga;
				this.T = b.T;
				this.va.L = this.T.L;
				this.va.X = this.T.X;
				this.va.ta = this.T.ta;
				this.va.qb = this.T.qb;
			}

			uc() {
				let a = class_qa.Bc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_ca_Game),
					this.jc = a,
					class_ca_Game.zd(b, this));
				return b;
			}

			static zd(a, b) {
				a.Qa = b.Qa.uc();
				a.kb = b.kb;
				a.Ga = b.Ga;
				a.va = b.va.uc();
				a.yc = b.yc;
				a.Db = b.Db;
				a.Tb = b.Tb;
				a.Ob = b.Ob;
				a.Mc = b.Mc;
				a.Ra = b.Ra;
				a.T = b.T;
				a.ie = b.ie;
			}
		}

		class class_ab_GameObjects {
			constructor() {
				this.jc = -1;
				this.ic = null;
				/** @type {class_sa_DynamicDisc[]} */
				this.H = [];
			}

			ga(a) {
				a.m(this.H.length);
				let b = 0
					,
					c = this.H.length;
				for (; b < c;) {
					let d = b++
						,
						e = this.H[d];
					e.Fl = d;
					e.ga(a);
				}
			}

			ma(a) {
				this.H = [];
				let b = a.F()
					,
					c = 0;
				for (; c < b;) {
					++c;
					let d = new class_sa_DynamicDisc;
					d.ma(a);
					this.H.push(d);
				}
			}

			A(a) {
				for (var b = 0, c = this.H; b < c.length;) {
					var d = c[b];
					++b;
					var e = d.a
						,
						f = d.a
						,
						g = d.G;
					e.x = f.x + g.x * a;
					e.y = f.y + g.y * a;
					f = e = d.G;
					g = d.ra;
					d = d.Ea;
					e.x = (f.x + g.x) * d;
					e.y = (f.y + g.y) * d;
				}
				a = 0;
				for (b = this.H.length; a < b;) {
					d = a++;
					c = this.H[d];
					d += 1;
					for (e = this.H.length; d < e;)
						f = this.H[d++],
						0 != (f.h & c.B) && 0 != (f.B & c.h) && c.oo(f);
					if (0 != c.ca) {
						d = 0;
						for (e = this.ta; d < e.length;)
							if (f = e[d],
								++d,
							0 != (f.h & c.B) && 0 != (f.B & c.h)) {
								g = f.ya;
								var h = c.a;
								g = f.Va - (g.x * h.x + g.y * h.y) + c.V;
								if (0 < g) {
									var k = h = c.a
										,
										l = f.ya;
									h.x = k.x + l.x * g;
									h.y = k.y + l.y * g;
									g = c.G;
									h = f.ya;
									g = g.x * h.x + g.y * h.y;
									0 > g && (g *= c.o * f.o + 1,
										k = h = c.G,
										f = f.ya,
										h.x = k.x - f.x * g,
										h.y = k.y - f.y * g);
								}
							}
						d = 0;
						for (e = this.X; d < e.length;)
							f = e[d],
								++d,
							0 != (f.h & c.B) && 0 != (f.B & c.h) && c.po(f);
						d = 0;
						for (e = this.L; d < e.length;)
							if (f = e[d],
								++d,
							0 != (f.h & c.B) && 0 != (f.B & c.h) && (h = c.a,
								k = f.a,
								g = h.x - k.x,
								h = h.y - k.y,
								k = g * g + h * h,
							0 < k && k <= c.V * c.V)) {
								k = Math.sqrt(k);
								g /= k;
								h /= k;
								k = c.V - k;
								let n = l = c.a;
								l.x = n.x + g * k;
								l.y = n.y + h * k;
								k = c.G;
								k = g * k.x + h * k.y;
								0 > k && (k *= c.o * f.o + 1,
									l = f = c.G,
									f.x = l.x - g * k,
									f.y = l.y - h * k);
							}
					}
				}
				for (a = 0; 2 > a;)
					for (++a,
						     b = 0,
						     c = this.qb; b < c.length;)
						c[b++].A(this.H);
			}

			uc() {
				let a = class_qa.Bc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_ab_GameObjects),
					this.jc = a,
					class_ab_GameObjects.zd(b, this));
				return b;
			}

			static zd(a, b) {
				if (null == b.H)
					a.H = null;
				else {
					null == a.H && (a.H = []);
					let d = a.H
						,
						e = b.H;
					for (var c = e.length; d.length > c;)
						d.pop();
					c = 0;
					let f = e.length;
					for (; c < f;) {
						let g = c++;
						d[g] = e[g].uc();
					}
				}
				a.L = b.L;
				a.X = b.X;
				a.ta = b.ta;
				a.qb = b.qb;
			}
		}

		class class_va_TeamColors {
			constructor() {
				this.od = 16777215;
				this.hb = [];
			}

			ga(a) {
				a.m(this.sd);
				a.P(this.od);
				a.m(this.hb.length);
				let b = 0
					,
					c = this.hb;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			ma(a) {
				this.sd = a.F();
				this.od = a.N();
				let b = a.F();
				if (3 < b)
					throw class_v.C('too many');
				this.hb = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.hb.push(a.N());
			}
		}

		class class_u_Team {
			constructor(a, b, c, d, e, f, g, h) {
				/** @type {class_u_Team} */
				this.Ag = null;
				this.ba = a;
				this.S = b;
				this.Gh = c;
				this.Cp = d;
				this.D = e;
				this.Go = f;
				this.B = h;
				this.Rm = new class_va_TeamColors;
				this.Rm.hb.push(b);
			}
		}

		class class_Vb_PlayerPhysics {
			constructor() {
				this.df = 0;
				this.V = 15;
				this.B = 0;
				this.ra = new class_P_Point(0, 0);
				this.ca = this.o = .5;
				this.Ea = .96;
				this.Ne = .1;
				this.ef = .07;
				this.ff = .96;
				this.cf = 5;
			}

			ga(a) {
				a.u(this.o);
				a.u(this.ca);
				a.u(this.Ea);
				a.u(this.Ne);
				a.u(this.ef);
				a.u(this.ff);
				a.u(this.cf);
				let b = this.ra;
				a.u(b.x);
				a.u(b.y);
				a.P(this.B);
				a.u(this.V);
				a.u(this.df);
			}

			ma(a) {
				this.o = a.w();
				this.ca = a.w();
				this.Ea = a.w();
				this.Ne = a.w();
				this.ef = a.w();
				this.ff = a.w();
				this.cf = a.w();
				let b = this.ra;
				b.x = a.w();
				b.y = a.w();
				this.B = a.N();
				this.V = a.w();
				this.df = a.w();
			}
		}

		class class_ua_FullPlayer {
			constructor() {
				this.Bc = -1;
				this.xn = null;
				/** @type {class_u_Team} */
				this.fa = class_u_Team.Oa;
				this.J = null;
				this.Ac = this.Zc = 0;
				this.Yb = false;
				this.W = this.Y = 0;
				this.D = 'Player';
				this.ah = this.Ab = 0;
				this.country = null;
				this.Ud = false;
				this.Zb = this.Td = null;
				this.Nb = 0;
				this.fb = false;
			}

			wa(a) {
				a.m(this.fb ? 1 : 0);
				a.P(this.Nb);
				a.Fb(this.Zb);
				a.Fb(this.Td);
				a.m(this.Ud ? 1 : 0);
				a.Fb(this.country);
				a.P(this.ah);
				a.Fb(this.D);
				a.P(this.W);
				a.nb(this.Y);
				a.m(this.Yb ? 1 : 0);
				a.hj(this.Ac);
				a.m(this.Zc);
				a.m(this.fa.ba);
				a.hj(null == this.J ? -1 : this.J.Fl);
			}

			xa(a, b) {
				this.fb = 0 != a.F();
				this.Nb = a.N();
				this.Zb = a.Bb();
				this.Td = a.Bb();
				this.Ud = 0 != a.F();
				this.country = a.Bb();
				this.ah = a.N();
				this.D = a.Bb();
				this.W = a.N();
				this.Y = a.Cb();
				this.Yb = 0 != a.F();
				this.Ac = a.vi();
				this.Zc = a.F();
				let c = a.wf();
				this.fa = 1 == c ? class_u_Team.ia : 2 == c ? class_u_Team.Da : class_u_Team.Oa;
				a = a.vi();
				this.J = 0 > a ? null : b[a];
			}

			Rs() {
				let a = class_qa.Bc
					,
					b = this.xn;
				this.Bc != a && (null == b && (this.xn = b = new class_ua_FullPlayer),
					this.Bc = a,
					class_ua_FullPlayer.Is(b, this));
				return b;
			}

			static Is(a, b) {
				a.fb = b.fb;
				a.Nb = b.Nb;
				a.Zb = b.Zb;
				a.Td = b.Td;
				a.Ud = b.Ud;
				a.country = b.country;
				a.ah = b.ah;
				a.Ab = b.Ab;
				a.D = b.D;
				a.W = b.W;
				a.Y = b.Y;
				a.Yb = b.Yb;
				a.Ac = b.Ac;
				a.Zc = b.Zc;
				a.J = null == b.J ? null : b.J.uc();
				a.fa = b.fa;
			}
		}

		class class_q_Stadium {
			constructor() {
				this.L = [];
				this.X = [];
				this.ta = [];
				this.vc = [];
				this.H = [];
				this.qb = [];
				this.Nd = [];
				this.vd = [];
				this.Ld = new class_Vb_PlayerPhysics;
				this.Fh = 255;
				this.Re = this.kf = 0;
				this.Xf = true;
				this.Af = false;
			}

			og() {
				let a = new class_ra_StadiumDisc;
				a.S = 16777215;
				a.h = 63;
				a.B = 193;
				a.V = 10;
				a.Ea = .99;
				a.ca = 1;
				a.o = .5;
				return a;
			}

			ga(a) {
				a.m(this.Fh);
				if (!this.af()) {
					a.Fb(this.D);
					a.P(this.ud);
					a.u(this.be);
					a.u(this.ae);
					a.u(this.ad);
					a.u(this.Fc);
					a.u(this.Qe);
					a.P(this.td);
					a.u(this.bc);
					a.u(this.sc);
					a.u(this.mc);
					this.Ld.ga(a);
					a.Xb(this.kf);
					a.m(this.Re);
					a.m(this.Xf ? 1 : 0);
					a.m(this.Af ? 1 : 0);
					a.m(this.L.length);
					for (var b = 0, c = this.L.length; b < c;) {
						var d = b++;
						let e = this.L[d];
						e.Dd = d;
						e.ga(a);
					}
					a.m(this.X.length);
					b = 0;
					for (c = this.X; b < c.length;)
						c[b++].ga(a);
					a.m(this.ta.length);
					b = 0;
					for (c = this.ta; b < c.length;)
						c[b++].ga(a);
					a.m(this.vc.length);
					b = 0;
					for (c = this.vc; b < c.length;)
						c[b++].ga(a);
					a.m(this.H.length);
					b = 0;
					for (c = this.H; b < c.length;)
						c[b++].ga(a);
					a.m(this.qb.length);
					b = 0;
					for (c = this.qb; b < c.length;)
						c[b++].ga(a);
					a.m(this.Nd.length);
					b = 0;
					for (c = this.Nd; b < c.length;)
						d = c[b],
							++b,
							a.u(d.x),
							a.u(d.y);
					a.m(this.vd.length);
					b = 0;
					for (c = this.vd; b < c.length;)
						d = c[b],
							++b,
							a.u(d.x),
							a.u(d.y);
				}
			}

			rs(a) {
				function b() {
					let f = []
						,
						g = a.F()
						,
						h = 0;
					for (; h < g;) {
						++h;
						let k = new class_P_Point(0, 0);
						k.x = a.w();
						k.y = a.w();
						f.push(k);
					}
					return f;
				}

				this.D = a.Bb();
				this.ud = a.N();
				this.be = a.w();
				this.ae = a.w();
				this.ad = a.w();
				this.Fc = a.w();
				this.Qe = a.w();
				this.td = a.N();
				this.bc = a.w();
				this.sc = a.w();
				this.mc = a.w();
				this.Ld.ma(a);
				this.kf = a.Sb();
				this.Re = a.F();
				this.Xf = 0 != a.F();
				this.Af = 0 != a.F();
				this.L = [];
				for (var c = a.F(), d = 0; d < c;) {
					var e = new class_G_Vertex;
					e.ma(a);
					e.Dd = d++;
					this.L.push(e);
				}
				this.X = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_I_Segment,
						e.ma(a, this.L),
						this.X.push(e);
				this.ta = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_R_Plane,
						e.ma(a),
						this.ta.push(e);
				this.vc = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_Cb_Goal,
						e.ma(a),
						this.vc.push(e);
				this.H = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_ra_StadiumDisc,
						e.ma(a),
						this.H.push(e);
				this.qb = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_Db_Joint,
						e.ma(a),
						this.qb.push(e);
				this.Nd = b();
				this.vd = b();
				this.oe();
				if (!this.cn())
					throw class_v.C(new class_Ta('Invalid stadium'));
			}

			cn() {
				return 0 >= this.H.length || 0 > this.Fc || 0 > this.ad || 0 > this.Ld.V ? false : true;
			}

			oe() {
				let a = 0
					,
					b = this.X;
				for (; a < b.length;)
					b[a++].oe();
			}

			af() {
				return 255 != this.Fh;
			}

			je(a, b) {
				a = a[b];
				return null != a ? class_w.I(a, E) : 0;
			}

			Pp(a) {
				a = a.canBeStored;
				return null != a ? class_w.I(a, Ec) : true;
			}

			Ae() {
				return JSON.stringify(this.ns());
			}

			ns() {
				if (!this.Xf) {
					// Store every stadium
					//throw class_v.C(0);
					console.debug(getStadiumObject(this).name + ' canBeStored bypassed');
				}
				let a = {};
				for (var b = 0, c = [], d = 0, e = this.L; d < e.length;) {
					var f = e[d];
					++d;
					f.Dd = b++;
					c.push(class_q_Stadium.zs(f));
				}
				d = new class_I_Segment;
				b = [];
				e = 0;
				for (f = this.X; e < f.length;)
					b.push(class_q_Stadium.Ir(f[e++], d));
				d = [];
				e = 0;
				for (f = this.ta; e < f.length;)
					d.push(class_q_Stadium.Iq(f[e++]));
				e = [];
				f = 0;
				for (var g = this.vc; f < g.length;)
					e.push(class_q_Stadium.hp(g[f++]));
				f = class_q_Stadium.Lq(this.Ld);
				var h = new class_ra_StadiumDisc;
				g = [];
				for (var k = 0, l = this.H; k < l.length;)
					g.push(class_q_Stadium.Ko(l[k++], h));
				h = [];
				k = 0;
				for (l = this.qb; k < l.length;)
					h.push(class_q_Stadium.Ap(l[k++]));
				k = [];
				l = 0;
				for (var n = this.Nd; l < n.length;) {
					var r = n[l];
					++l;
					k.push([r.x, r.y]);
				}
				l = [];
				n = 0;
				for (r = this.vd; n < r.length;) {
					let t = r[n];
					++n;
					l.push([t.x, t.y]);
				}
				c = {
					name: this.D,
					width: this.bc,
					height: this.sc,
					bg: a,
					vertexes: c,
					segments: b,
					planes: d,
					goals: e,
					discs: g,
					playerPhysics: f,
					ballPhysics: 'disc0'
				};
				class_q_Stadium.oa(c, 'maxViewWidth', this.kf, 0);
				class_q_Stadium.oa(c, 'cameraFollow', 1 == this.Re ? 'player' : '', '');
				class_q_Stadium.oa(c, 'spawnDistance', this.mc, 200);
				0 != h.length && (c.joints = h);
				0 != k.length && (c.redSpawnPoints = k);
				0 != l.length && (c.blueSpawnPoints = l);
				class_q_Stadium.oa(c, 'kickOffReset', this.Af ? 'full' : 'partial', 'partial');
				switch (this.ud) {
					case 1:
						b = 'grass';
						break;
					case 2:
						b = 'hockey';
						break;
					default:
						b = 'none';
				}
				class_q_Stadium.oa(a, 'type', b, 'none');
				class_q_Stadium.oa(a, 'width', this.be, 0);
				class_q_Stadium.oa(a, 'height', this.ae, 0);
				class_q_Stadium.oa(a, 'kickOffRadius', this.ad, 0);
				class_q_Stadium.oa(a, 'cornerRadius', this.Fc, 0);
				class_q_Stadium.Bg(a, this.td, 7441498);
				class_q_Stadium.oa(a, 'goalLine', this.Qe, 0);
				return c;
			}

			cl(a) {
				function b(h) {
					let k = class_w.I(h[0], E);
					h = class_w.I(h[1], E);
					null == h && (h = 0);
					null == k && (k = 0);
					return new class_P_Point(k, h);
				}

				function c(h, k, l, n) {
					null == n && (n = false);
					var r = d[k];
					if (!n || null != r)
						if (n = class_w.I(r, Array),
						null != n)
							for (r = 0; r < n.length;) {
								let t = n[r];
								++r;
								try {
									class_q_Stadium.Sn(t, f),
										h.push(l(t));
								}
								catch (z) {
									throw class_v.C(new class_Ta('Error in "' + k + '" index: ' + h.length));
								}
							}
				}

				let d = JSON5.parse(a);
				this.L = [];
				this.X = [];
				this.ta = [];
				this.vc = [];
				this.H = [];
				this.qb = [];
				this.D = class_w.I(d.name, String);
				this.bc = class_w.I(d.width, E);
				this.sc = class_w.I(d.height, E);
				this.kf = this.je(d, 'maxViewWidth') | 0;
				'player' == d.cameraFollow && (this.Re = 1);
				this.mc = 200;
				a = d.spawnDistance;
				null != a && (this.mc = class_w.I(a, E));
				a = d.bg;
				let e;
				switch (a.type) {
					case 'grass':
						e = 1;
						break;
					case 'hockey':
						e = 2;
						break;
					default:
						e = 0;
				}
				this.ud = e;
				this.be = this.je(a, 'width');
				this.ae = this.je(a, 'height');
				this.ad = this.je(a, 'kickOffRadius');
				this.Fc = this.je(a, 'cornerRadius');
				this.td = 7441498;
				null != a.color && (this.td = class_q_Stadium.mg(a.color));
				this.Qe = this.je(a, 'goalLine');
				this.Xf = this.Pp(d);
				this.Af = 'full' == d.kickOffReset;
				let f = d.traits;
				a = d.ballPhysics;
				'disc0' != a && (null != a ? (a = class_q_Stadium.dl(a, this.og()),
					a.B |= 192,
					this.H.push(a)) : this.H.push(this.og()));
				c(this.L, 'vertexes', class_q_Stadium.Op);
				let g = this;
				c(this.X, 'segments', function (h) {
					return class_q_Stadium.Np(h, g.L);
				});
				c(this.vc, 'goals', class_q_Stadium.Jp);
				c(this.H, 'discs', function (h) {
					return class_q_Stadium.dl(h, new class_ra_StadiumDisc);
				});
				c(this.ta, 'planes', class_q_Stadium.Lp);
				c(this.qb, 'joints', function (h) {
					return class_q_Stadium.Kp(h, g.H);
				}, true);
				c(this.Nd, 'redSpawnPoints', b, true);
				c(this.vd, 'blueSpawnPoints', b, true);
				a = d.playerPhysics;
				null != a && (this.Ld = class_q_Stadium.Mp(a));
				if (255 < this.L.length || 255 < this.X.length || 255 < this.ta.length || 255 < this.vc.length || 255 < this.H.length)
					throw class_v.C('Error');
				this.oe();
				if (!this.cn())
					throw class_v.C(new class_Ta('Invalid stadium'));
			}

			ik() {
				let a = class_q_Stadium.ls;
				a.a = 0;
				this.ga(a);
				let b = new class_vc;
				b.Gs(a.Wb());
				b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
				b.hash += b.hash << 15;
				return b.hash | 0;
			}

			jo(a, b) {
				let c = 0
					,
					d = this.vc;
				for (; c < d.length;) {
					let h = d[c];
					++c;
					var e = h.Z
						,
						f = h.ea
						,
						g = b.x - a.x;
					let k = b.y - a.y;
					0 < -(e.y - a.y) * g + (e.x - a.x) * k == 0 < -(f.y - a.y) * g + (f.x - a.x) * k ? e = false : (g = f.x - e.x,
						f = f.y - e.y,
						e = 0 < -(a.y - e.y) * g + (a.x - e.x) * f == 0 < -(b.y - e.y) * g + (b.x - e.x) * f ? false : true);
					if (e)
						return h.ye;
				}
				return class_u_Team.Oa;
			}

			hd(a, b, c, d, e, f, g, h) {
				null == h && (h = 0);
				this.D = a;
				this.H.push(this.og());
				this.bc = b;
				this.sc = c;
				this.ud = 1;
				this.td = 7441498;
				this.be = d;
				this.ae = e;
				this.ad = g;
				this.Fc = h;
				this.mc = .75 * d;
				400 < this.mc && (this.mc = 400);
				a = new class_R_Plane;
				var k = a.ya;
				k.x = 0;
				k.y = 1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new class_R_Plane;
				k = a.ya;
				k.x = 0;
				k.y = -1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new class_R_Plane;
				k = a.ya;
				k.x = 1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				a = new class_R_Plane;
				k = a.ya;
				k.x = -1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				this.pg(d, 1, f, 13421823, class_u_Team.Da);
				this.pg(-d, -1, f, 16764108, class_u_Team.ia);
				this.il(g, c);
				b = new class_R_Plane;
				c = b.ya;
				c.x = 0;
				c.y = 1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
				b = new class_R_Plane;
				c = b.ya;
				c.x = 0;
				c.y = -1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
				b = new class_G_Vertex;
				c = b.a;
				c.x = -d;
				c.y = -e;
				b.h = 0;
				c = new class_G_Vertex;
				g = c.a;
				g.x = d;
				g.y = -e;
				c.h = 0;
				g = new class_G_Vertex;
				a = g.a;
				a.x = d;
				a.y = -f;
				g.h = 0;
				a = new class_G_Vertex;
				k = a.a;
				k.x = d;
				k.y = f;
				a.h = 0;
				k = new class_G_Vertex;
				var l = k.a;
				l.x = d;
				l.y = e;
				k.h = 0;
				l = new class_G_Vertex;
				var n = l.a;
				n.x = -d;
				n.y = e;
				l.h = 0;
				n = new class_G_Vertex;
				var r = n.a;
				r.x = -d;
				r.y = f;
				n.h = 0;
				r = new class_G_Vertex;
				var t = r.a;
				t.x = -d;
				t.y = -f;
				r.h = 0;
				f = new class_I_Segment;
				f.Z = c;
				f.ea = g;
				f.h = 1;
				f.bb = false;
				t = new class_I_Segment;
				t.Z = a;
				t.ea = k;
				t.h = 1;
				t.bb = false;
				let z = new class_I_Segment;
				z.Z = l;
				z.ea = n;
				z.h = 1;
				z.bb = false;
				let J = new class_I_Segment;
				J.Z = r;
				J.ea = b;
				J.h = 1;
				J.bb = false;
				this.L.push(b);
				this.L.push(c);
				this.L.push(g);
				this.L.push(a);
				this.L.push(k);
				this.L.push(l);
				this.L.push(n);
				this.L.push(r);
				this.X.push(f);
				this.X.push(t);
				this.X.push(z);
				this.X.push(J);
				this.gl(d, e, h);
				this.oe();
			}

			hl(a, b, c, d, e, f, g, h) {
				this.D = a;
				this.H.push(this.og());
				this.bc = b;
				this.sc = c;
				this.ud = 2;
				this.be = d;
				this.ae = e;
				this.ad = 75;
				this.Fc = h;
				this.Qe = g;
				this.mc = .75 * (d - g);
				400 < this.mc && (this.mc = 400);
				a = new class_R_Plane;
				var k = a.ya;
				k.x = 0;
				k.y = 1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new class_R_Plane;
				k = a.ya;
				k.x = 0;
				k.y = -1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new class_R_Plane;
				k = a.ya;
				k.x = 1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				a = new class_R_Plane;
				k = a.ya;
				k.x = -1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				this.pg(d - g, 1, f, 13421823, class_u_Team.Da, 63);
				this.pg(-d + g, -1, f, 16764108, class_u_Team.ia, 63);
				this.il(75, c);
				b = new class_R_Plane;
				c = b.ya;
				c.x = 0;
				c.y = 1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
				b = new class_R_Plane;
				c = b.ya;
				c.x = 0;
				c.y = -1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
				b = new class_R_Plane;
				c = b.ya;
				c.x = 1;
				c.y = 0;
				b.Va = -d;
				b.h = 1;
				this.ta.push(b);
				b = new class_R_Plane;
				c = b.ya;
				c.x = -1;
				c.y = 0;
				b.Va = -d;
				b.h = 1;
				this.ta.push(b);
				this.gl(d, e, h);
				this.oe();
			}

			pg(a, b, c, d, e, f) {
				var g;
				null == g && (g = 32);
				null == f && (f = 1);
				var h = new class_G_Vertex
					,
					k = h.a;
				k.x = a + 8 * b;
				k.y = -c;
				k = new class_G_Vertex;
				var l = k.a;
				l.x = a + 8 * b;
				l.y = c;
				let n = new class_G_Vertex;
				l = n.a;
				l.x = h.a.x + 22 * b;
				l.y = h.a.y + 22;
				let r = new class_G_Vertex;
				l = r.a;
				l.x = k.a.x + 22 * b;
				l.y = k.a.y - 22;
				l = new class_I_Segment;
				l.Z = h;
				l.ea = n;
				l.Uc(90 * b);
				let t = new class_I_Segment;
				t.Z = r;
				t.ea = n;
				let z = new class_I_Segment;
				z.Z = r;
				z.ea = k;
				z.Uc(90 * b);
				b = this.L.length;
				this.L.push(h);
				this.L.push(k);
				this.L.push(n);
				this.L.push(r);
				h = b;
				for (b = this.L.length; h < b;)
					k = h++,
						this.L[k].h = f,
						this.L[k].B = g,
						this.L[k].o = .1;
				b = this.X.length;
				this.X.push(l);
				this.X.push(t);
				this.X.push(z);
				h = b;
				for (b = this.X.length; h < b;)
					k = h++,
						this.X[k].h = f,
						this.X[k].B = g,
						this.X[k].o = .1;
				f = new class_ra_StadiumDisc;
				g = f.a;
				g.x = a;
				g.y = -c;
				f.ca = 0;
				f.V = 8;
				f.S = d;
				this.H.push(f);
				f = new class_ra_StadiumDisc;
				g = f.a;
				g.x = a;
				g.y = c;
				f.ca = 0;
				f.V = 8;
				f.S = d;
				this.H.push(f);
				d = new class_Cb_Goal;
				f = d.Z;
				f.x = a;
				f.y = -c;
				f = d.ea;
				f.x = a;
				f.y = c;
				d.ye = e;
				this.vc.push(d);
			}

			il(a, b) {
				let c = new class_G_Vertex;
				var d = c.a;
				d.x = 0;
				d.y = -b;
				c.o = .1;
				c.B = 24;
				c.h = 6;
				d = new class_G_Vertex;
				var e = d.a;
				e.x = 0;
				e.y = -a;
				d.o = .1;
				d.B = 24;
				d.h = 6;
				e = new class_G_Vertex;
				var f = e.a;
				f.x = 0;
				f.y = a;
				e.o = .1;
				e.B = 24;
				e.h = 6;
				a = new class_G_Vertex;
				f = a.a;
				f.x = 0;
				f.y = b;
				a.o = .1;
				a.B = 24;
				a.h = 6;
				b = new class_I_Segment;
				b.Z = c;
				b.ea = d;
				b.B = 24;
				b.h = 6;
				b.bb = false;
				b.o = .1;
				f = new class_I_Segment;
				f.Z = e;
				f.ea = a;
				f.B = 24;
				f.h = 6;
				f.bb = false;
				f.o = .1;
				let g = new class_I_Segment;
				g.Z = d;
				g.ea = e;
				g.B = 8;
				g.h = 6;
				g.bb = false;
				g.Uc(180);
				g.o = .1;
				let h = new class_I_Segment;
				h.Z = e;
				h.ea = d;
				h.B = 16;
				h.h = 6;
				h.bb = false;
				h.Uc(180);
				h.o = .1;
				this.L.push(c);
				this.L.push(d);
				this.L.push(e);
				this.L.push(a);
				this.X.push(b);
				this.X.push(f);
				this.X.push(g);
				this.X.push(h);
			}

			gl(a, b, c) {
				if (!(0 >= c)) {
					var d = new class_G_Vertex
						,
						e = d.a;
					e.x = -a + c;
					e.y = -b;
					d.h = 0;
					e = new class_G_Vertex;
					var f = e.a;
					f.x = -a;
					f.y = -b + c;
					e.h = 0;
					f = new class_G_Vertex;
					var g = f.a;
					g.x = -a + c;
					g.y = b;
					f.h = 0;
					g = new class_G_Vertex;
					var h = g.a;
					h.x = -a;
					h.y = b - c;
					g.h = 0;
					h = new class_G_Vertex;
					var k = h.a;
					k.x = a - c;
					k.y = b;
					h.h = 0;
					k = new class_G_Vertex;
					var l = k.a;
					l.x = a;
					l.y = b - c;
					k.h = 0;
					l = new class_G_Vertex;
					var n = l.a;
					n.x = a - c;
					n.y = -b;
					l.h = 0;
					n = new class_G_Vertex;
					var r = n.a;
					r.x = a;
					r.y = -b + c;
					n.h = 0;
					a = new class_I_Segment;
					a.Z = d;
					a.ea = e;
					a.h = 1;
					a.bb = false;
					a.o = 1;
					a.Uc(-90);
					b = new class_I_Segment;
					b.Z = f;
					b.ea = g;
					b.h = 1;
					b.bb = false;
					b.o = 1;
					b.Uc(90);
					c = new class_I_Segment;
					c.Z = h;
					c.ea = k;
					c.h = 1;
					c.bb = false;
					c.o = 1;
					c.Uc(-90);
					r = new class_I_Segment;
					r.Z = l;
					r.ea = n;
					r.h = 1;
					r.bb = false;
					r.o = 1;
					r.Uc(90);
					this.L.push(d);
					this.L.push(e);
					this.L.push(f);
					this.L.push(g);
					this.L.push(h);
					this.L.push(k);
					this.L.push(l);
					this.L.push(n);
					this.X.push(a);
					this.X.push(b);
					this.X.push(c);
					this.X.push(r);
				}
			}

			static ma(a) {
				var b = a.F();
				return 255 == b ? (b = new class_q_Stadium,
					b.rs(a),
					b) : class_q_Stadium.Nh()[b];
			}

			static Nh() {
				if (null == class_q_Stadium.xb) {
					class_q_Stadium.xb = [];
					var a = new class_q_Stadium;
					a.hd('Classic', 420, 200, 370, 170, 64, 75);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hd('Easy', 420, 200, 370, 170, 90, 75);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hd('Small', 420, 200, 320, 130, 55, 70);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hd('Big', 600, 270, 550, 240, 80, 80);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hd('Rounded', 420, 200, 370, 170, 64, 75, 75);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hl('Hockey', 420, 204, 398, 182, 68, 120, 100);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hl('Big Hockey', 600, 270, 550, 240, 90, 160, 150);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hd('Big Easy', 600, 270, 550, 240, 95, 80);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hd('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
					class_q_Stadium.xb.push(a);
					a = new class_q_Stadium;
					a.hd('Huge', 750, 350, 700, 320, 100, 80);
					class_q_Stadium.xb.push(a);
					a = 0;
					let b = class_q_Stadium.xb.length;
					for (; a < b;) {
						let c = a++;
						class_q_Stadium.xb[c].Fh = c;
					}
				}
				return class_q_Stadium.xb;
			}

			static Sn(a, b) {
				if (null != a.trait && (b = b[class_w.I(a.trait, String)],
				null != b)) {
					let c = 0
						,
						d = class_zc.hn(b);
					for (; c < d.length;) {
						let e = d[c];
						++c;
						null == a[e] && (a[e] = b[e]);
					}
				}
			}

			static ao(a) {
				if (63 == a)
					return ['all'];
				let b = [];
				0 != (a & 2) && b.push('red');
				0 != (a & 4) && b.push('blue');
				0 != (a & 1) && b.push('ball');
				0 != (a & 8) && b.push('redKO');
				0 != (a & 16) && b.push('blueKO');
				0 != (a & 32) && b.push('wall');
				0 != (a & 64) && b.push('kick');
				0 != (a & 128) && b.push('score');
				0 != (a & 268435456) && b.push('c0');
				0 != (a & 536870912) && b.push('c1');
				0 != (a & 1073741824) && b.push('c2');
				0 != (a & -2147483648) && b.push('c3');
				return b;
			}

			static Jc(a) {
				a = class_w.I(a, Array);
				let b = 0
					,
					c = 0;
				for (; c < a.length;)
					switch (a[c++]) {
						case 'all':
							b |= 63;
							break;
						case 'ball':
							b |= 1;
							break;
						case 'blue':
							b |= 4;
							break;
						case 'blueKO':
							b |= 16;
							break;
						case 'c0':
							b |= 268435456;
							break;
						case 'c1':
							b |= 536870912;
							break;
						case 'c2':
							b |= 1073741824;
							break;
						case 'c3':
							b |= -2147483648;
							break;
						case 'kick':
							b |= 64;
							break;
						case 'red':
							b |= 2;
							break;
						case 'redKO':
							b |= 8;
							break;
						case 'score':
							b |= 128;
							break;
						case 'wall':
							b |= 32;
					}
				return b;
			}

			static Oc(a, b, c, d) {
				c != d && (a[b] = class_q_Stadium.ao(c));
			}

			static Bg(a, b, c) {
				b != c && (a.color = class_q_Stadium.qo(b));
			}

			static qo(a) {
				a |= 0;
				return 0 > a ? 'transparent' : class_ba.bh(a);
			}

			static mg(a) {
				if ('transparent' == a)
					return -1;
				if ('string' == typeof a)
					return class_Q.parseInt('0x' + class_Q.Fe(a));
				if (a instanceof Array)
					return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
				throw class_v.C('Bad color');
			}

			static zs(a) {
				let b = {
					x: a.a.x,
					y: a.a.y
				};
				class_q_Stadium.oa(b, 'bCoef', a.o, 1);
				class_q_Stadium.Oc(b, 'cMask', a.h, 63);
				class_q_Stadium.Oc(b, 'cGroup', a.B, 32);
				return b;
			}

			static Op(a) {
				let b = new class_G_Vertex;
				b.a.x = class_w.I(a.x, E);
				b.a.y = class_w.I(a.y, E);
				var c = a.bCoef;
				null != c && (b.o = class_w.I(c, E));
				c = a.cMask;
				null != c && (b.h = class_q_Stadium.Jc(c));
				a = a.cGroup;
				null != a && (b.B = class_q_Stadium.Jc(a));
				return b;
			}

			static Ir(a, b) {
				let c = {
					v0: a.Z.Dd,
					v1: a.ea.Dd
				};
				class_q_Stadium.oa(c, 'bias', a.Gc, b.Gc);
				class_q_Stadium.oa(c, 'bCoef', a.o, b.o);
				let d = a.$o();
				class_q_Stadium.oa(c, 'curve', d, 0);
				0 != d && (c.curveF = a.wb);
				class_q_Stadium.oa(c, 'vis', a.bb, b.bb);
				class_q_Stadium.Oc(c, 'cMask', a.h, b.h);
				class_q_Stadium.Oc(c, 'cGroup', a.B, b.B);
				class_q_Stadium.Bg(c, a.S, b.S);
				return c;
			}

			static Np(a, b) {
				let c = new class_I_Segment;
				var d = class_w.I(a.v1, Yb);
				c.Z = b[class_w.I(a.v0, Yb)];
				c.ea = b[d];
				b = a.bias;
				d = a.bCoef;
				let e = a.curve
					,
					f = a.curveF
					,
					g = a.vis
					,
					h = a.cMask
					,
					k = a.cGroup;
				a = a.color;
				null != b && (c.Gc = class_w.I(b, E));
				null != d && (c.o = class_w.I(d, E));
				null != f ? c.wb = class_w.I(f, E) : null != e && c.Uc(class_w.I(e, E));
				null != g && (c.bb = class_w.I(g, Ec));
				null != h && (c.h = class_q_Stadium.Jc(h));
				null != k && (c.B = class_q_Stadium.Jc(k));
				null != a && (c.S = class_q_Stadium.mg(a));
				return c;
			}

			static Ap(a) {
				let b = {
					d0: a.ge,
					d1: a.he,
					length: a.Jb >= a.fc ? a.Jb : [a.Jb, a.fc]
				};
				class_q_Stadium.Bg(b, a.S, 0);
				class_q_Stadium.oa(b, 'strength', a.we, 1 / 0);
				return b;
			}

			static Kp(a, b) {
				let c = new class_Db_Joint;
				var d = class_w.I(a.d0, Yb)
					,
					e = class_w.I(a.d1, Yb);
				let f = a.color
					,
					g = a.strength;
				a = a.length;
				if (d >= b.length || 0 > d)
					throw class_v.C(null);
				if (e >= b.length || 0 > e)
					throw class_v.C(null);
				c.ge = d;
				c.he = e;
				null == a ? (d = b[d],
					e = b[e],
					null == d || null == e ? c.fc = c.Jb = 100 : (b = d.a,
						d = e.a,
						e = b.x - d.x,
						b = b.y - d.y,
						c.fc = c.Jb = Math.sqrt(e * e + b * b))) : a instanceof Array ? (c.Jb = class_w.I(a[0], E),
					c.fc = class_w.I(a[1], E)) : c.fc = c.Jb = class_w.I(a, E);
				c.we = null == g || 'rigid' == g ? 1 / 0 : class_w.I(g, E);
				null != f && (c.S = class_q_Stadium.mg(f));
				return c;
			}

			static Iq(a) {
				let b = {
					normal: [a.ya.x, a.ya.y],
					dist: a.Va
				};
				class_q_Stadium.oa(b, 'bCoef', a.o, 1);
				class_q_Stadium.Oc(b, 'cMask', a.h, 63);
				class_q_Stadium.Oc(b, 'cGroup', a.B, 32);
				return b;
			}

			static Lp(a) {
				let b = new class_R_Plane;
				var c = class_w.I(a.normal, Array)
					,
					d = class_w.I(c[0], E)
					,
					e = class_w.I(c[1], E);
				c = b.ya;
				let f = d;
				var g = e;
				null == e && (g = 0);
				null == d && (f = 0);
				d = f;
				e = Math.sqrt(d * d + g * g);
				c.x = d / e;
				c.y = g / e;
				b.Va = class_w.I(a.dist, E);
				c = a.bCoef;
				d = a.cMask;
				a = a.cGroup;
				null != c && (b.o = class_w.I(c, E));
				null != d && (b.h = class_q_Stadium.Jc(d));
				null != a && (b.B = class_q_Stadium.Jc(a));
				return b;
			}

			static hp(a) {
				return {
					p0: [a.Z.x, a.Z.y],
					p1: [a.ea.x, a.ea.y],
					team: a.ye == class_u_Team.ia ? 'red' : 'blue'
				};
			}

			static Jp(a) {
				let b = new class_Cb_Goal;
				var c = class_w.I(a.p0, Array);
				let d = class_w.I(a.p1, Array)
					,
					e = b.Z;
				e.x = c[0];
				e.y = c[1];
				c = b.ea;
				c.x = d[0];
				c.y = d[1];
				switch (a.team) {
					case 'blue':
						a = class_u_Team.Da;
						break;
					case 'red':
						a = class_u_Team.ia;
						break;
					default:
						throw class_v.C('Bad team value');
				}
				b.ye = a;
				return b;
			}

			static Lq(a) {
				let b = {};
				class_q_Stadium.oa(b, 'bCoef', a.o, .5);
				class_q_Stadium.oa(b, 'invMass', a.ca, .5);
				class_q_Stadium.oa(b, 'damping', a.Ea, .96);
				class_q_Stadium.oa(b, 'acceleration', a.Ne, .1);
				class_q_Stadium.oa(b, 'kickingAcceleration', a.ef, .07);
				class_q_Stadium.oa(b, 'kickingDamping', a.ff, .96);
				class_q_Stadium.oa(b, 'kickStrength', a.cf, 5);
				class_q_Stadium.Oc(b, 'cGroup', a.B, 0);
				if (0 != a.ra.x || 0 != a.ra.y)
					b.gravity = [a.ra.x, a.ra.y];
				class_q_Stadium.oa(b, 'radius', a.V, 15);
				class_q_Stadium.oa(b, 'kickback', a.df, 0);
				return b;
			}

			static Mp(a) {
				let b = new class_Vb_PlayerPhysics;
				var c = a.bCoef
					,
					d = a.invMass;
				let e = a.damping
					,
					f = a.acceleration
					,
					g = a.kickingAcceleration
					,
					h = a.kickingDamping
					,
					k = a.kickStrength
					,
					l = a.gravity
					,
					n = a.cGroup
					,
					r = a.radius;
				a = a.kickback;
				null != c && (b.o = class_w.I(c, E));
				null != d && (b.ca = class_w.I(d, E));
				null != e && (b.Ea = class_w.I(e, E));
				null != f && (b.Ne = class_w.I(f, E));
				null != g && (b.ef = class_w.I(g, E));
				null != h && (b.ff = class_w.I(h, E));
				null != k && (b.cf = class_w.I(k, E));
				null != l && (c = b.ra,
					d = class_w.I(l[1], E),
					c.x = class_w.I(l[0], E),
					c.y = d);
				null != n && (b.B = class_q_Stadium.Jc(n));
				null != r && (b.V = class_w.I(r, E));
				null != a && (b.df = class_w.I(a, E));
				return b;
			}

			static Ko(a, b) {
				let c = {};
				if (a.a.x != b.a.x || a.a.y != b.a.y)
					c.pos = [a.a.x, a.a.y];
				if (a.G.x != b.G.x || a.G.y != b.G.y)
					c.speed = [a.G.x, a.G.y];
				if (a.ra.x != b.ra.x || a.ra.y != b.ra.y)
					c.gravity = [a.ra.x, a.ra.y];
				class_q_Stadium.oa(c, 'radius', a.V, b.V);
				class_q_Stadium.oa(c, 'bCoef', a.o, b.o);
				class_q_Stadium.oa(c, 'invMass', a.ca, b.ca);
				class_q_Stadium.oa(c, 'damping', a.Ea, b.Ea);
				class_q_Stadium.Bg(c, a.S, b.S);
				class_q_Stadium.Oc(c, 'cMask', a.h, b.h);
				class_q_Stadium.Oc(c, 'cGroup', a.B, b.B);
				return c;
			}

			static dl(a, b) {
				var c = a.pos
					,
					d = a.speed;
				let e = a.gravity
					,
					f = a.radius
					,
					g = a.bCoef
					,
					h = a.invMass
					,
					k = a.damping
					,
					l = a.color
					,
					n = a.cMask;
				a = a.cGroup;
				if (null != c) {
					let r = b.a;
					r.x = c[0];
					r.y = c[1];
				}
				null != d && (c = b.G,
					c.x = d[0],
					c.y = d[1]);
				null != e && (d = b.ra,
					d.x = e[0],
					d.y = e[1]);
				null != f && (b.V = class_w.I(f, E));
				null != g && (b.o = class_w.I(g, E));
				null != h && (b.ca = class_w.I(h, E));
				null != k && (b.Ea = class_w.I(k, E));
				null != l && (b.S = class_q_Stadium.mg(l));
				null != n && (b.h = class_q_Stadium.Jc(n));
				null != a && (b.B = class_q_Stadium.Jc(a));
				return b;
			}

			static oa(a, b, c, d) {
				c != d && (a[b] = c);
			}
		}

		class class_G_Vertex {
			constructor() {
				this.Dd = 0;
				this.B = 32;
				this.h = 63;
				this.o = 1;
				this.a = new class_P_Point(0, 0);
			}

			ga(a) {
				let b = this.a;
				a.u(b.x);
				a.u(b.y);
				a.u(this.o);
				a.P(this.h);
				a.P(this.B);
			}

			ma(a) {
				let b = this.a;
				b.x = a.w();
				b.y = a.w();
				this.o = a.w();
				this.h = a.N();
				this.B = a.N();
			}
		}

		class class_I_Segment {
			constructor() {
				this.Og = this.Pg = this.ya = null;
				this.qk = 0;
				this.ea = this.Z = this.fe = null;
				this.Gc = 0;
				this.o = 1;
				this.h = 63;
				this.B = 32;
				this.wb = 1 / 0;
				this.bb = true;
				this.S = 0;
			}

			ga(a) {
				let b = 0
					,
					c = a.a;
				a.m(0);
				a.m(this.Z.Dd);
				a.m(this.ea.Dd);
				0 != this.Gc && (b = 1,
					a.u(this.Gc));
				this.wb != 1 / 0 && (b |= 2,
					a.u(this.wb));
				0 != this.S && (b |= 4,
					a.P(this.S));
				this.bb && (b |= 8);
				a.s.setUint8(c, b);
				a.u(this.o);
				a.P(this.h);
				a.P(this.B);
			}

			ma(a, b) {
				let c = a.F();
				this.Z = b[a.F()];
				this.ea = b[a.F()];
				this.Gc = 0 != (c & 1) ? a.w() : 0;
				this.wb = 0 != (c & 2) ? a.w() : 1 / 0;
				this.S = 0 != (c & 4) ? a.N() : 0;
				this.bb = 0 != (c & 8);
				this.o = a.w();
				this.h = a.N();
				this.B = a.N();
			}

			Uc(a) {
				a *= .017453292519943295;
				if (0 > a) {
					a = -a;
					let b = this.Z;
					this.Z = this.ea;
					this.ea = b;
					this.Gc = -this.Gc;
				}
				a > class_I_Segment.Hn && a < class_I_Segment.Gn && (this.wb = 1 / Math.tan(a / 2));
			}

			$o() {
				return 0 != 0 * this.wb ? 0 : 114.59155902616465 * Math.atan(1 / this.wb);
			}

			oe() {
				if (0 == 0 * this.wb) {
					var a = this.ea.a
						,
						b = this.Z.a
						,
						c = .5 * (a.x - b.x);
					a = .5 * (a.y - b.y);
					b = this.Z.a;
					let d = this.wb;
					this.fe = new class_P_Point(b.x + c + -a * d, b.y + a + c * d);
					a = this.Z.a;
					b = this.fe;
					c = a.x - b.x;
					a = a.y - b.y;
					this.qk = Math.sqrt(c * c + a * a);
					c = this.Z.a;
					a = this.fe;
					this.Og = new class_P_Point(-(c.y - a.y), c.x - a.x);
					c = this.fe;
					a = this.ea.a;
					this.Pg = new class_P_Point(-(c.y - a.y), c.x - a.x);
					0 >= this.wb && (a = c = this.Og,
						c.x = -a.x,
						c.y = -a.y,
						a = c = this.Pg,
						c.x = -a.x,
						c.y = -a.y);
				}
				else
					a = this.Z.a,
						b = this.ea.a,
						c = a.x - b.x,
						a = -(a.y - b.y),
						b = Math.sqrt(a * a + c * c),
						this.ya = new class_P_Point(a / b, c / b);
			}
		}

		class class_R_Plane {
			constructor() {
				this.B = 32;
				this.h = 63;
				this.o = 1;
				this.Va = 0;
				this.ya = new class_P_Point(0, 0);
			}

			ga(a) {
				let b = this.ya;
				a.u(b.x);
				a.u(b.y);
				a.u(this.Va);
				a.u(this.o);
				a.P(this.h);
				a.P(this.B);
			}

			ma(a) {
				let b = this.ya;
				b.x = a.w();
				b.y = a.w();
				this.Va = a.w();
				this.o = a.w();
				this.h = a.N();
				this.B = a.N();
			}
		}

		class class_ra_StadiumDisc {
			constructor() {
				this.h = this.B = 63;
				this.S = 16777215;
				this.Ea = .99;
				this.ca = 1;
				this.o = .5;
				this.V = 10;
				this.ra = new class_P_Point(0, 0);
				this.G = new class_P_Point(0, 0);
				this.a = new class_P_Point(0, 0);
			}

			ga(a) {
				var b = this.a;
				a.u(b.x);
				a.u(b.y);
				b = this.G;
				a.u(b.x);
				a.u(b.y);
				b = this.ra;
				a.u(b.x);
				a.u(b.y);
				a.u(this.V);
				a.u(this.o);
				a.u(this.ca);
				a.u(this.Ea);
				a.ub(this.S);
				a.P(this.h);
				a.P(this.B);
			}

			ma(a) {
				var b = this.a;
				b.x = a.w();
				b.y = a.w();
				b = this.G;
				b.x = a.w();
				b.y = a.w();
				b = this.ra;
				b.x = a.w();
				b.y = a.w();
				this.V = a.w();
				this.o = a.w();
				this.ca = a.w();
				this.Ea = a.w();
				this.S = a.jb();
				this.h = a.N();
				this.B = a.N();
			}

			Sp() {
				let a = new class_sa_DynamicDisc;
				this.Tk(a);
				return a;
			}

			Tk(a) {
				var b = a.a
					,
					c = this.a;
				b.x = c.x;
				b.y = c.y;
				b = a.G;
				c = this.G;
				b.x = c.x;
				b.y = c.y;
				b = a.ra;
				c = this.ra;
				b.x = c.x;
				b.y = c.y;
				a.V = this.V;
				a.o = this.o;
				a.ca = this.ca;
				a.Ea = this.Ea;
				a.S = this.S;
				a.h = this.h;
				a.B = this.B;
			}
		}

		class class_Cb_Goal {
			constructor() {
				this.ye = class_u_Team.Oa;
				this.ea = new class_P_Point(0, 0);
				this.Z = new class_P_Point(0, 0);
			}

			ga(a) {
				var b = this.Z;
				a.u(b.x);
				a.u(b.y);
				b = this.ea;
				a.u(b.x);
				a.u(b.y);
				a.m(this.ye.ba);
			}

			ma(a) {
				var b = this.Z;
				b.x = a.w();
				b.y = a.w();
				b = this.ea;
				b.x = a.w();
				b.y = a.w();
				a = a.wf();
				this.ye = 1 == a ? class_u_Team.ia : 2 == a ? class_u_Team.Da : class_u_Team.Oa;
			}
		}

		class class_Db_Joint {
			constructor() {
				this.S = 0;
				this.we = 1 / 0;
				this.Jb = this.fc = 100;
				this.ge = this.he = 0;
			}

			ga(a) {
				a.m(this.ge);
				a.m(this.he);
				a.u(this.Jb);
				a.u(this.fc);
				a.u(this.we);
				a.P(this.S);
			}

			ma(a) {
				this.ge = a.F();
				this.he = a.F();
				this.Jb = a.w();
				this.fc = a.w();
				this.we = a.w();
				this.S = a.N();
			}

			A(a) {
				var b = a[this.ge];
				a = a[this.he];
				if (null != b && null != a) {
					var c = b.a
						,
						d = a.a
						,
						e = c.x - d.x;
					c = c.y - d.y;
					var f = Math.sqrt(e * e + c * c);
					if (!(0 >= f)) {
						e /= f;
						c /= f;
						d = b.ca / (b.ca + a.ca);
						d != d && (d = .5);
						if (this.Jb >= this.fc) {
							var g = this.Jb;
							var h = 0;
						}
						else if (f <= this.Jb)
							g = this.Jb,
								h = 1;
						else if (f >= this.fc)
							g = this.fc,
								h = -1;
						else
							return;
						f = g - f;
						if (0 == 0 * this.we)
							d = this.we * f * .5,
								e *= d,
								c *= d,
								h = d = b.G,
								b = b.ca,
								d.x = h.x + e * b,
								d.y = h.y + c * b,
								d = b = a.G,
								a = a.ca,
								b.x = d.x + -e * a,
								b.y = d.y + -c * a;
						else {
							g = f * d;
							var k = b.a
								,
								l = b.a;
							k.x = l.x + e * g * .5;
							k.y = l.y + c * g * .5;
							l = k = a.a;
							f -= g;
							k.x = l.x - e * f * .5;
							k.y = l.y - c * f * .5;
							f = b.G;
							g = a.G;
							f = e * (f.x - g.x) + c * (f.y - g.y);
							0 >= f * h && (d *= f,
								b = h = b.G,
								h.x = b.x - e * d,
								h.y = b.y - c * d,
								a = b = a.G,
								d = f - d,
								b.x = a.x + e * d,
								b.y = a.y + c * d);
						}
					}
				}
			}
		}

		class class_sa_DynamicDisc {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Fl = 0;
				this.h = this.B = 63;
				this.ak = 0;
				this.S = 16777215;
				this.Ea = .99;
				this.ca = 1;
				this.o = .5;
				this.V = 10;
				this.ra = new class_P_Point(0, 0);
				this.G = new class_P_Point(0, 0);
				this.a = new class_P_Point(0, 0);
			}

			ga(a) {
				var b = this.a;
				a.u(b.x);
				a.u(b.y);
				b = this.G;
				a.u(b.x);
				a.u(b.y);
				b = this.ra;
				a.u(b.x);
				a.u(b.y);
				a.u(this.V);
				a.u(this.o);
				a.u(this.ca);
				a.u(this.Ea);
				a.ub(this.S);
				a.P(this.h);
				a.P(this.B);
			}

			ma(a) {
				var b = this.a;
				b.x = a.w();
				b.y = a.w();
				b = this.G;
				b.x = a.w();
				b.y = a.w();
				b = this.ra;
				b.x = a.w();
				b.y = a.w();
				this.V = a.w();
				this.o = a.w();
				this.ca = a.w();
				this.Ea = a.w();
				this.S = a.jb();
				this.h = a.N();
				this.B = a.N();
			}

			oo(a) {
				var b = this.a
					,
					c = a.a
					,
					d = b.x - c.x;
				b = b.y - c.y;
				var e = a.V + this.V
					,
					f = d * d + b * b;
				if (0 < f && f <= e * e) {
					f = Math.sqrt(f);
					d /= f;
					b /= f;
					c = this.ca / (this.ca + a.ca);
					e -= f;
					f = e * c;
					var g = this.a
						,
						h = this.a;
					g.x = h.x + d * f;
					g.y = h.y + b * f;
					h = g = a.a;
					e -= f;
					g.x = h.x - d * e;
					g.y = h.y - b * e;
					e = this.G;
					f = a.G;
					e = d * (e.x - f.x) + b * (e.y - f.y);
					0 > e && (e *= this.o * a.o + 1,
						c *= e,
						g = f = this.G,
						f.x = g.x - d * c,
						f.y = g.y - b * c,
						a = f = a.G,
						c = e - c,
						f.x = a.x + d * c,
						f.y = a.y + b * c);
				}
			}

			po(a) {
				if (0 != 0 * a.wb) {
					var b = a.Z.a;
					var c = a.ea.a;
					var d = c.x - b.x;
					var e = c.y - b.y
						,
						f = this.a;
					var g = f.x - c.x;
					c = f.y - c.y;
					f = this.a;
					if (0 >= (f.x - b.x) * d + (f.y - b.y) * e || 0 <= g * d + c * e)
						return;
					d = a.ya;
					b = d.x;
					d = d.y;
					g = b * g + d * c;
				}
				else {
					d = a.fe;
					g = this.a;
					b = g.x - d.x;
					d = g.y - d.y;
					g = a.Og;
					c = a.Pg;
					if ((0 < g.x * b + g.y * d && 0 < c.x * b + c.y * d) == 0 >= a.wb)
						return;
					c = Math.sqrt(b * b + d * d);
					if (0 == c)
						return;
					g = c - a.qk;
					b /= c;
					d /= c;
				}
				c = a.Gc;
				if (0 == c)
					0 > g && (g = -g,
						b = -b,
						d = -d);
				else if (0 > c && (c = -c,
					g = -g,
					b = -b,
					d = -d),
				g < -c)
					return;
				g >= this.V || (g = this.V - g,
					e = c = this.a,
					c.x = e.x + b * g,
					c.y = e.y + d * g,
					g = this.G,
					g = b * g.x + d * g.y,
				0 > g && (g *= this.o * a.o + 1,
					c = a = this.G,
					a.x = c.x - b * g,
					a.y = c.y - d * g));
			}

			uc() {
				let a = class_qa.Bc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_sa_DynamicDisc),
					this.jc = a,
					class_sa_DynamicDisc.zd(b, this));
				return b;
			}

			static zd(a, b) {
				a.V = b.V;
				a.o = b.o;
				a.ca = b.ca;
				a.Ea = b.Ea;
				a.S = b.S;
				a.ak = b.ak;
				a.h = b.h;
				a.B = b.B;
				var c = a.a
					,
					d = b.a;
				c.x = d.x;
				c.y = d.y;
				c = a.G;
				d = b.G;
				c.x = d.x;
				c.y = d.y;
				a = a.ra;
				b = b.ra;
				a.x = b.x;
				a.y = b.y;
			}
		}

		class class_P_Point {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_gc_Replay {
			constructor(a, b) {
				this.tn = 0;
				this.version = 1;
				this.ih = 0;
				this.Wd = class_A.ka(1E3);
				this.Of = class_A.ka(16384);
				this.version = b;
				let c = this.ih = a.aa;
				this.tj = a;
				a.U.ga(this.Of);
				let d = this;
				a.hc = function (f) {
					let g = a.aa;
					d.Of.nb(g - c);
					c = g;
					d.Of.Xb(f.R);
					class_p.wj(f, d.Of);
				}
				;
				this.Wd.Xb(0);
				let e = this.ih;
				a.U.Fm(function (f) {
					let g = a.aa;
					d.Wd.nb(g - e);
					d.Wd.m(f);
					d.tn++;
					e = g;
				});
			}

			stop() {
				this.tj.hc = null;
				this.tj.U.Fm(null);
				this.Wd.s.setUint16(0, this.tn, this.Wd.Ua);
				this.Wd.Lb(this.Of.Wb());
				let a = pako.deflateRaw(this.Wd.Wb())
					,
					b = class_A.ka(a.byteLength + 32);
				b.ij('HBR2');
				b.ub(this.version);
				b.ub(this.tj.aa - this.ih);
				b.Lb(a);
				return b.Wb();
			}
		}

		class class_Ob_ReplayDownloader {
			static Dr(a, b) {
				class_Ob_ReplayDownloader.sm(new Blob([a], {
					type: 'octet/stream'
				}), b);
			}

			static Er(a, b) {
				class_Ob_ReplayDownloader.sm(new Blob([a], {
					type: 'text/plain'
				}), b);
			}

			static sm(a, b) {
				let c = window.document.createElement('a');
				c.style.display = 'display: none';
				window.document.body.appendChild(c);
				a = URL.createObjectURL(a);
				c.href = a;
				c.download = b;
				c.click();
				URL.revokeObjectURL(a);
				c.remove();
			}
		}

		class class_new11_nc {
			constructor(a) {
				let b = []
					,
					c = 0;
				for (; c < a;)
					++c,
						b.push(0);
				this.new11nc_array1 = b;
				this.new11nc_number3 = this.new11nc_number2 = 0;
			}

			new11nc_method_1(a) {
				this.new11nc_number3 -= this.new11nc_array1[this.new11nc_number2];
				this.new11nc_array1[this.new11nc_number2] = a;
				this.new11nc_number3 += a;
				this.new11nc_number2++;
				this.new11nc_number2 >= this.new11nc_array1.length && (this.new11nc_number2 = 0);
			}

			new11nc_method_2() {
				return this.new11nc_number3 / this.new11nc_array1.length;
			}
		}

		class class_new11_empty {
		}

		class class_sc {
			constructor() {
				this.Eh = 0;
				this.Wp = 400;
				this.Qk = 64;
				this.fj = 32;
				this.na = window.document.createElement('canvas');
				this.cg = window.document.createElement('canvas');
				this.f = window.document.createElement('div');
				this.cg.width = this.na.width = this.fj;
				this.cg.height = this.na.height = this.Qk;
				this.Ih = this.cg.getContext('2d', null);
				this.c = this.na.getContext('2d', null);
				this.c.fillStyle = 'green';
				let a = []
					,
					b = 0
					,
					c = this.fj;
				for (; b < c;)
					++b,
						a.push(0);
				this.Hq = a;
				this.f.appendChild(this.cg);
				this.f.className = 'graph';
				this.f.hidden = true;
			}

			Pn(a) {
				this.f.hidden = false;
				0 > a ? (a = 150,
					this.c.fillStyle = '#c13535') : this.c.fillStyle = '#32FF32';
				let b = this.fj
					,
					c = this.Qk
					,
					d = this.Eh++;
				this.Eh >= b && (this.Eh = 0);
				this.Hq[d] = a;
				this.c.clearRect(d, 0, 1, c);
				a = a * c / this.Wp;
				this.c.fillRect(d, c - a, 1, a);
				this.Ih.clearRect(0, 0, b, c);
				this.Ih.drawImage(this.na, b - d - 1, 0);
				this.Ih.drawImage(this.na, -d - 1, 0);
			}
		}

		class class_Zb {
			constructor(a) {
				this.rd = null;
				this.fr = 1E4;
				this.Fd = true;
				a.jk();
				this.Ta = a.Ta;
				this.bd = a.bd;
				this.xe = a.xe;
				this.rd = a.rd;
				this.Tm = window.performance.now();
				let b = null
					,
					c = this;
				b = function () {
					var e = c.fr - c.gs();
					0 >= e ? c.la() : (window.clearTimeout(c.Vm),
						e = window.setTimeout(b, e + 1E3),
						c.Vm = e);
				}
				;
				b();
				this.Ta.oniceconnectionstatechange = function () {
					let e = c.Ta.iceConnectionState;
					'closed' != e && 'failed' != e || c.la();
				}
				;
				a = 0;
				let d = this.bd;
				for (; a < d.length;) {
					let e = d[a];
					++a;
					e.onmessage = function (f) {
						c.Fd && (c.Tm = window.performance.now(),
						null != c.wg && c.wg(f.data));
					}
					;
					e.onclose = function () {
						c.la();
					};
				}
			}

			gs() {
				return window.performance.now() - this.Tm;
			}

			Vb(a, b) {
				if (this.Fd && (a = this.bd[a],
				'open' == a.readyState)) {
					b = b.Rg();
					try {
						a.send(b);
					}
					catch (c) {
						b = class_v.Mb(c).Gb(),
							globalScope.console.log(b);
					}
				}
			}

			la() {
				window.clearTimeout(this.Vm);
				this.Fd && (this.Fd = false,
					this.Ta.close(),
				null != this.qf && this.qf());
			}
		}

		class class_tc {
			constructor() {
				this.Wc = 0;
				this.eb = [];
				this.fs = new class_da(['Time is', 'Up!'], 16777215);
				this.hr = new class_da(['Red is', 'Victorious!'], 15035990);
				this.gr = new class_da(['Red', 'Scores!'], 15035990);
				this.$n = new class_da(['Blue is', 'Victorious!'], 625603);
				this.Zn = new class_da(['Blue', 'Scores!'], 625603);
				this.Gq = new class_da(['Game', 'Paused'], 16777215);
			}

			Sa(a) {
				this.eb.push(a);
			}

			mo() {
				this.eb = [];
				this.Wc = 0;
			}

			A(a) {
				0 < this.eb.length && (this.Wc += a) > this.eb[0].Xo() && (this.Wc = 0,
					this.eb.shift());
			}

			Qc(a) {
				0 < this.eb.length && this.eb[0].Qc(a, this.Wc);
			}
		}

		class class_uc {
			constructor() {
				function a(g) {
					return new class_xa(g, f, function (h) {
							if (null == h)
								return null;
							try {
								return class_ma.Lh(h);
							}
							catch (k) {
								return null;
							}
						}
						, function (h) {
							if (null == h)
								return null;
							try {
								return h.Ae();
							}
							catch (k) {
								return null;
							}
						}
					);
				}

				function b(g, h) {
					return new class_xa(g, f, function (k) {
							return null != k ? '0' != k : h;
						}
						, function (k) {
							return k ? '1' : '0';
						}
					);
				}

				function c(g, h) {
					return new class_xa(g, f, function (k) {
							let l = h;
							try {
								null != k && (l = parseFloat(k));
							}
							catch (n) {
							}
							return l;
						}
						, function (k) {
							return '' + k;
						}
					);
				}

				function d(g, h) {
					return new class_xa(g, f, function (k) {
							let l = h;
							try {
								null != k && (l = class_Q.parseInt(k));
							}
							catch (n) {
							}
							return l;
						}
						, function (k) {
							return '' + k;
						}
					);
				}

				function e(g, h, k) {
					return new class_xa(g, f, function (l) {
							return null == l ? h : class_ha.Xc(l, k);
						}
						, function (l) {
							return l;
						}
					);
				}

				let f = class_Ac.ln();
				this.ne = e('player_name', '', 25);
				this.Sd = d('view_mode', -1);
				this.Jh = d('fps_limit', 0);
				this.sh = e('avatar', null, 2);
				e('rctoken', null, 1024);
				this.Sm = b('team_colors', true);
				this.Sk = b('show_indicators', true);
				this.Ri = c('sound_volume', 1);
				this.ve = b('sound_main', true);
				this.Qi = b('sound_chat', true);
				this.Km = b('sound_highlight', true);
				this.Jm = b('sound_crowd', true);
				this.Vj = e('player_auth_key', null, 1024);
				this.Ad = d('extrapolation', 0);
				this.Ei = c('resolution_scale', 1);
				this.Hm = b('show_avatars', true);
				this.hk = d('chat_height', 160);
				this.zh = d('chat_focus_height', 140);
				this.Ah = c('chat_opacity', .8);
				this.gk = e('chat_bg_mode', 'compact', 50);
				this.ci = b('low_latency_canvas', true);
				this.Xe = a('geo');
				this.Ye = a('geo_override');
				this.Kd = function () {
					return new class_xa('player_keys', f, function (g) {
							if (null == g)
								return class_ra.sk();
							try {
								return class_ra.Lh(g);
							}
							catch (h) {
								return class_ra.sk();
							}
						}
						, function (g) {
							try {
								return g.Ae();
							}
							catch (h) {
								return null;
							}
						}
					);
				}();
			}

			Oh() {
				return null != this.Ye.v() ? this.Ye.v() : null != this.Xe.v() ? this.Xe.v() : new class_ma;
			}
		}

		class class_Bb {
			constructor(a) {
				this.yk = false;
				this.Lm = new class_Na(class_u_Team.Oa);
				this.$j = new class_Na(class_u_Team.Da);
				this.dm = new class_Na(class_u_Team.ia);
				this.f = class_x.Ia(class_Bb.O);
				let b = class_x.Ba(this.f);
				this.lc = b.get('room-name');
				this.Om = b.get('start-btn');
				this.Qm = b.get('stop-btn');
				this.ni = b.get('pause-btn');
				this.Tn = b.get('auto-btn');
				this.el = b.get('lock-btn');
				this.nm = b.get('reset-all-btn');
				this.bm = b.get('rec-btn');
				let c = b.get('link-btn')
					,
					d = b.get('leave-btn')
					,
					e = b.get('rand-btn');
				this.If = b.get('time-limit-sel');
				this.Bf = b.get('score-limit-sel');
				this.Mm = b.get('stadium-name');
				this.Nm = b.get('stadium-pick');
				let f = this;
				this.Nm.onclick = function () {
					class_H.i(f.zq);
				}
				;
				this.Wh(b.get('red-list'), this.dm, a);
				this.Wh(b.get('blue-list'), this.$j, a);
				this.Wh(b.get('spec-list'), this.Lm, a);
				this.ll(this.If, this.kl());
				this.ll(this.Bf, this.kl());
				this.If.onchange = function () {
					class_D.i(f.Dq, f.If.selectedIndex);
				}
				;
				this.Bf.onchange = function () {
					class_D.i(f.vq, f.Bf.selectedIndex);
				}
				;
				this.Om.onclick = function () {
					class_H.i(f.Aq);
				}
				;
				this.Qm.onclick = function () {
					class_H.i(f.Bq);
				}
				;
				this.ni.onclick = function () {
					class_H.i(f.oq);
				}
				;
				this.Tn.onclick = function () {
					class_H.i(f.eq);
				}
				;
				this.el.onclick = function () {
					class_D.i(f.Cq, !f.ai);
				}
				;
				this.nm.onclick = function () {
					null != f.me && (f.me(class_u_Team.Da),
						f.me(class_u_Team.ia));
				}
				;
				this.bm.onclick = function () {
					class_H.i(f.sq);
				}
				;
				c.onclick = function () {
					class_H.i(f.yq);
				}
				;
				d.onclick = function () {
					class_H.i(f.le);
				}
				;
				e.onclick = function () {
					class_H.i(f.rq);
				}
				;
				this.Qj(false);
				this.Rj(false);
			}

			Wh(a, b, c) {
				class_x.replaceWith(a, b.f);
				let d = this;
				b.xg = function (e, f) {
					class_Ma.i(d.xg, e, f);
				}
				;
				b.me = function (e) {
					class_D.i(d.me, e);
				}
				;
				b.lq = function (e) {
					class_Ma.i(d.xg, c, e);
				}
				;
				b.tf = function (e) {
					class_D.i(d.tf, e);
				};
			}

			kl() {
				let a = []
					,
					b = 0;
				for (; 15 > b;) {
					let c = b++;
					a.push(null == c ? 'null' : '' + c);
				}
				return a;
			}

			ll(a, b) {
				let c = 0;
				for (; c < b.length;) {
					let d = b[c++]
						,
						e = window.document.createElement('option');
					e.textContent = d;
					a.appendChild(e);
				}
			}

			Vr(a) {
				this.bm.classList.toggle('active', a);
			}

			A(a, b) {
				this.wr != a.lc && (this.wr = a.lc,
					this.lc.textContent = a.lc);
				b = null == b ? false : b.fb;
				this.yk != b && (this.f.className = 'room-view' + (b ? ' admin' : ''),
					this.yk = b);
				var c = !b || null != a.M;
				this.If.disabled = c;
				this.Bf.disabled = c;
				this.Nm.disabled = c;
				c = null != a.M;
				this.Om.hidden = c;
				this.Qm.hidden = !c;
				this.ni.hidden = !c;
				this.If.selectedIndex = a.Ga;
				this.Bf.selectedIndex = a.kb;
				this.Mm.textContent = a.T.D;
				this.Mm.classList.toggle('custom', !a.T.af());
				let d = a.Vc;
				for (var e = this.dm, f = a.K, g = [], h = 0; h < f.length;) {
					var k = f[h];
					++h;
					k.fa == class_u_Team.ia && g.push(k);
				}
				e.A(g, d, c, b);
				e = this.$j;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.fa == class_u_Team.Da && g.push(k);
				e.A(g, d, c, b);
				e = this.Lm;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.fa == class_u_Team.Oa && g.push(k);
				e.A(g, d, c, b);
				this.nm.disabled = c;
				this.ai != a.Vc && this.Qj(a.Vc);
				c && (a = 120 == a.M.Ra,
				this.Hl != a && this.Rj(a));
			}

			Qj(a) {
				this.ai = a;
				this.el.innerHTML = this.ai ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
			}

			Rj(a) {
				this.Hl = a;
				this.ni.innerHTML = '<i class=\'icon-pause\'></i>' + (this.Hl ? 'Resume (P)' : 'Pause (P)');
			}
		}

		class class_ib {
			constructor() {
				this.Df = null;
				this.f = class_x.Ia(class_ib.O);
				var a = class_x.Ba(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.rb);
				}
				;
				this.yh = a.get('change');
				this.yh.disabled = true;
				this.yh.onclick = function () {
					null != b.Df && b.um(b.Df.index);
				}
				;
				a = a.get('list');
				this.si(a);
				let c = class_nb.ei(a);
				window.setTimeout(function () {
					c.update();
				}, 0);
			}

			si(a) {
				let b = this
					,
					c = 0
					,
					d = class_Ga.eb.length >> 2;
				for (; c < d;) {
					var e = c++;
					let f = e
						,
						g = class_Ga.eb[e << 2];
					e = class_Ga.eb[(e << 2) + 1].toLowerCase();
					let h = window.document.createElement('div');
					h.className = 'elem';
					h.innerHTML = '<div class="flagico f-' + e + '"></div> ' + g;
					a.appendChild(h);
					h.onclick = function () {
						null != b.Df && b.Df.La.classList.remove('selected');
						b.yh.disabled = false;
						b.Df = {
							La: h,
							index: f
						};
						h.classList.add('selected');
					}
					;
					h.ondblclick = function () {
						b.um(f);
					};
				}
			}

			um(a) {
				let b = new class_ma;
				b.vb = class_Ga.eb[(a << 2) + 1].toLowerCase();
				b.Ic = class_Ga.eb[(a << 2) + 2];
				b.Lc = class_Ga.eb[(a << 2) + 3];
				class_m.j.Ye.ha(b);
				class_H.i(this.rb);
			}
		}

		class class_C {
			static Ts() {
				try {
					return window.self != window.top;
				}
				catch (a) {
					return true;
				}
			}

			static dh(a) {
				return new Promise(function (b, c) {
						let d = window.document.createElement('img');
						d.onload = function () {
							URL.revokeObjectURL(d.src);
							d.onload = null;
							b(d);
						}
						;
						d.onerror = function () {
							URL.revokeObjectURL(d.src);
							c(null);
						}
						;
						d.src = URL.createObjectURL(new Blob([a], {
							type: 'image/png'
						}));
					}
				);
			}

			static rj(a) {
				class_C.Ts() && class_C.Ns(function () {
					class_Jc.rj();
					let b = null == class_m.j.Xe.v() ? class_ma.cp().then(function (d) {
							class_m.j.Xe.ha(d);
						}, function () {
						}) : Promise.resolve(null)
						,
						c = class_aa.v(window.parent._gdir + 'res.dat', 'arraybuffer').then(function (d) {
							d = new JSZip(d);
							class_m.Pa = new class_lc(d);
							return Promise.all([class_m.Pa.Po, class_C.dh(d.file('images/grass.png').asArrayBuffer()).then(function (e) {
								return class_m.ip = e;
							}), class_C.dh(d.file('images/concrete.png').asArrayBuffer()).then(function (e) {
								return class_m.uo = e;
							}), class_C.dh(d.file('images/concrete2.png').asArrayBuffer()).then(function (e) {
								return class_m.so = e;
							}), class_C.dh(d.file('images/typing.png').asArrayBuffer()).then(function (e) {
								return class_m.Zm = e;
							})]);
						});
					Promise.all([c, b]).then(function () {
						class_C.bt(a);
					});
				});
			}

			static Ns(a) {
				let b = Modernizr
					,
					c = 'canvas datachannel dataview es6collections peerconnection promises websockets'.split(' ')
					,
					d = []
					,
					e = 0;
				for (; e < c.length;) {
					let f = c[e];
					++e;
					b[f] || d.push(f);
				}
				0 != d.length ? (window.document.body.innerHTML = '',
					class_C.Wg = window.document.createElement('div'),
					window.document.body.appendChild(class_C.Wg),
					a = new class_pb(d),
					class_C.Na(a.f)) : a();
			}

			static bt(a) {
				window.document.body.innerHTML = '';
				class_C.Wg = window.document.createElement('div');
				window.document.body.appendChild(class_C.Wg);
				let b = null;
				b = function () {
					class_m.Pa.om();
					window.document.removeEventListener('click', b, true);
				}
				;
				window.document.addEventListener('click', b, true);
				a();
			}

			static Na(a) {
				null != class_C.rn && class_C.rn.remove();
				null != a && (class_C.Wg.appendChild(a),
					class_C.rn = a);
			}
		}

		class class_qb {
			constructor() {
				this.Rb = -1;
				this.gb = new class_U(class_m.j.ci.v());
				this.Wc = new class_jc;
				this.f = class_x.Ia(class_qb.O);
				let a = class_x.Ba(this.f);
				this.Tb = new class_Wb(a.get('red-score'), 0);
				this.Ob = new class_Wb(a.get('blue-score'), 0);
				class_x.replaceWith(a.get('timer'), this.Wc.f);
				class_x.replaceWith(a.get('canvas'), this.gb.na);
			}

			A(a) {
				var b = class_m.j.ci.v();
				if (this.gb.yp != b) {
					let c = this.gb.na;
					this.gb = new class_U(b);
					class_x.replaceWith(c, this.gb.na);
				}
				b = a.M;
				null == b ? this.f.hidden = true : (this.f.hidden = false,
					this.Wc.Yr(60 * a.Ga),
					this.Wc.Xr(b.Mc | 0),
					this.Ob.set(b.Ob),
					this.Tb.set(b.Tb),
					this.gb.Qc(a, this.Rb));
			}
		}

		class class_Ua {
			constructor(a, b, c) {
				this.rd = this.ze = null;
				this.xe = [];
				this.tk = 0;
				this.Dl = false;
				this.gg = [];
				this.bd = [];
				this.Ta = new RTCPeerConnection({
					iceServers: b
				}, class_Ua.xo);
				let d;
				this.Vh = new Promise(function (f1) {
						d = f1;
					}
				);
				let e = this;
				this.Ta.onicecandidate = function (f2) {
					null == f2.candidate ? d(e.gg) : (f2 = f2.candidate,
					null != f2.candidate && '' != f2.candidate && (null != e.ug && e.ug(f2),
						e.gg.push(f2)));
				}
				;
				for (b = 0; b < c.length;)
					this.Co(c[b++]);
				this.ba = a;
			}

			Wi(a) {
				null == a && (a = 1E4);
				window.clearTimeout(this.ze);
				this.ze = window.setTimeout(function_M(this, this.rp), a);
			}

			async Bo(a, b) {
				await this.Ta.setRemoteDescription(a);
				a = await this.Ta.createAnswer();
				await this.Ta.setLocalDescription(a);
				let c = 0;
				for (; c < b.length;)
					this.Nj(b[c++]);
				try {
					await class_Gc.js(this.Vh, 500);
				}
				catch (d) {
				}
				return a;
			}

			async Do() {
				let a = await this.Ta.createOffer();
				await this.Ta.setLocalDescription(a);
				try {
					await class_Gc.js(this.Vh, 1E3);
				}
				catch (b) {
				}
				return a;
			}

			Co(a) {
				let b = {
					id: this.bd.length,
					negotiated: true,
					ordered: a.ordered
				};
				a.reliable || (b.maxRetransmits = 0);
				a = this.Ta.createDataChannel(a.name, b);
				a.binaryType = 'arraybuffer';
				let c = this;
				a.onopen = function () {
					let d = 0
						,
						e = c.bd;
					for (; d < e.length;)
						if ('open' != e[d++].readyState)
							return;
					null != c.Id && c.Id();
				}
				;
				a.onclose = function () {
					c.fg();
				}
				;
				a.onmessage = function () {
					c.fg();
				}
				;
				this.bd.push(a);
			}

			Nj(a) {
				let b = this;
				window.setTimeout(function () {
					b.Ta.addIceCandidate(a);
				}, this.tk);
			}

			rp() {
				this.fg();
			}

			fg() {
				null != this.jd && this.jd();
				this.la();
			}

			la() {
				this.jk();
				this.Ta.close();
			}

			jk() {
				window.clearTimeout(this.ze);
				this.Id = this.ug = this.jd = null;
				this.Ta.onicecandidate = null;
				this.Ta.ondatachannel = null;
				this.Ta.onsignalingstatechange = null;
				this.Ta.oniceconnectionstatechange = null;
				let a = 0
					,
					b = this.bd;
				for (; a < b.length;) {
					let c = b[a];
					++a;
					c.onopen = null;
					c.onclose = null;
					c.onmessage = null;
				}
			}
		}

		class class_Ac {
			static ln() {
				try {
					let a = window.localStorage;
					a.getItem('');
					if (0 == a.length) {
						let b = '_hx_' + Math.random();
						a.setItem(b, b);
						a.removeItem(b);
					}
					return a;
				}
				catch (a) {
					return null;
				}
			}
		}

		class class_K {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Ua = b;
				this.a = 0;
			}

			tb(a) {
				null == a && (a = this.s.byteLength - this.a);
				if (this.a + a > this.s.byteLength)
					throw class_v.C('Read too much');
				let b = new Uint8Array(this.s.buffer, this.s.byteOffset + this.a, a);
				this.a += a;
				return b;
			}

			Zl(a) {
				let b = this.tb(a);
				a = new ArrayBuffer(a);
				(new Uint8Array(a)).set(b);
				return a;
			}

			wf() {
				return this.s.getInt8(this.a++);
			}

			F() {
				return this.s.getUint8(this.a++);
			}

			vi() {
				let a = this.s.getInt16(this.a, this.Ua);
				this.a += 2;
				return a;
			}

			Sb() {
				let a = this.s.getUint16(this.a, this.Ua);
				this.a += 2;
				return a;
			}

			N() {
				let a = this.s.getInt32(this.a, this.Ua);
				this.a += 4;
				return a;
			}

			jb() {
				let a = this.s.getUint32(this.a, this.Ua);
				this.a += 4;
				return a;
			}

			ui() {
				let a = this.s.getFloat32(this.a, this.Ua);
				this.a += 4;
				return a;
			}

			w() {
				let a = this.s.getFloat64(this.a, this.Ua);
				this.a += 8;
				return a;
			}

			Cb() {
				let a = this.a,
					b = 0,
					c,
					d = 0;
				do
					c = this.s.getUint8(a + b),
					5 > b && (d |= (c & 127) << 7 * b >>> 0),
						++b;
				while (0 != (c & 128));
				this.a += b;
				return d | 0;
			}

			pe(a) {
				let b = this.a,
					c,
					d = '';
				for (a = b + a; b < a;)
					c = class_K.Ho(this.s, b),
						b += c.length,
						d += String.fromCodePoint(c.char);
				if (b != a)
					throw class_v.C('Actual string length differs from the specified: ' + (b - a) + ' bytes');
				this.a = b;
				return d;
			}

			Bb() {
				let a = this.Cb();
				return 0 >= a ? null : this.pe(a - 1);
			}

			kc() {
				return this.pe(this.Cb());
			}

			am() {
				return this.pe(this.F());
			}

			Gg() {
				let a = this.kc();
				return JSON.parse(a);
			}

			static Ho(a, b) {
				var c = a.getUint8(b);
				let d,
					e,
					f,
					g,
					h = b;
				if (0 == (c & 128))
					++b;
				else if (192 == (c & 224))
					d = a.getUint8(b + 1),
						c = (c & 31) << 6 | d & 63,
						b += 2;
				else if (224 == (c & 240))
					d = a.getUint8(b + 1),
						e = a.getUint8(b + 2),
						c = (c & 15) << 12 | (d & 63) << 6 | e & 63,
						b += 3;
				else if (240 == (c & 248))
					d = a.getUint8(b + 1),
						e = a.getUint8(b + 2),
						f = a.getUint8(b + 3),
						c = (c & 7) << 18 | (d & 63) << 12 | (e & 63) << 6 | f & 63,
						b += 4;
				else if (248 == (c & 252))
					d = a.getUint8(b + 1),
						e = a.getUint8(b + 2),
						f = a.getUint8(b + 3),
						g = a.getUint8(b + 4),
						c = (c & 3) << 24 | (d & 63) << 18 | (e & 63) << 12 | (f & 63) << 6 | g & 63,
						b += 5;
				else if (252 == (c & 254))
					d = a.getUint8(b + 1),
						e = a.getUint8(b + 2),
						f = a.getUint8(b + 3),
						g = a.getUint8(b + 4),
						a = a.getUint8(b + 5),
						c = (c & 1) << 30 | (d & 63) << 24 | (e & 63) << 18 | (f & 63) << 12 | (g & 63) << 6 | a & 63,
						b += 6;
				else
					throw class_v.C('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
				return {
					char: c,
					length: b - h
				};
			}
		}

		class class_Na {
			constructor(a) {
				this.Gd = new Map;
				this.f = class_x.Ia(class_Na.O);
				this.f.className += ' ' + a.Go;
				let b = class_x.Ba(this.f);
				this.eb = b.get('list');
				this.Zh = b.get('join-btn');
				this.Di = b.get('reset-btn');
				a == class_u_Team.Oa && this.Di.remove();
				this.Zh.textContent = '' + a.D;
				this.f.ondragover = this.f.wt = function (d) {
					-1 != d.dataTransfer.types.indexOf('player') && d.preventDefault();
				}
				;
				let c = this;
				this.f.ondrop = function (d) {
					d.preventDefault();
					d = d.dataTransfer.getData('player');
					null != d && (d = class_Q.parseInt(d),
					null != d && class_Ma.i(c.xg, d, a));
				}
				;
				this.Zh.onclick = function () {
					class_D.i(c.lq, a);
				}
				;
				this.Di.onclick = function () {
					class_D.i(c.me, a);
				};
			}

			A(a, b, c, d) {
				this.Zh.disabled = b || c;
				this.Di.disabled = c;
				b = new Set;
				c = this.Gd.keys();
				for (var e = c.next(); !e.done;) {
					var f = e.value;
					e = c.next();
					b.add(f);
				}
				let g = this;
				for (c = 0; c < a.length;)
					e = a[c],
						++c,
						f = this.Gd.get(e.Y),
					null == f && (f = new class_wb(e),
						f.tf = function (h) {
							class_D.i(g.tf, h);
						}
						,
						this.Gd.set(e.Y, f),
						this.eb.appendChild(f.f)),
						f.A(e, d),
						b.delete(e.Y);
				d = b.values();
				for (b = d.next(); !b.done;)
					c = b.value,
						b = d.next(),
						this.Gd.get(c).f.remove(),
						this.Gd.delete(c);
				d = 0;
				for (b = a.length - 1; d < b;)
					e = d++,
						c = this.Gd.get(a[e].Y).f,
						e = this.Gd.get(a[e + 1].Y).f,
					c.nextSibling != e && this.eb.insertBefore(c, e);
			}
		}

		class class_lc {
			constructor(a) {
				function b(d) {
					return new Promise(function (e) {
							let f = a.file(d).asArrayBuffer();
							c.c.decodeAudioData(f, e, function () {
								e(null);
							});
						}
					);
				}

				this.c = new AudioContext;
				this.ng = this.c.createGain();
				this.yi();
				this.ng.connect(this.c.destination);
				let c = this;
				this.Po = Promise.all([b('sounds/chat.wav').then(function (d) {
					return c.fk = d;
				}), b('sounds/highlight.wav').then(function (d) {
					return c.Rk = d;
				}), b('sounds/kick.wav').then(function (d) {
					return c.Bp = d;
				}), b('sounds/goal.wav').then(function (d) {
					return c.gp = d;
				}), b('sounds/join.wav').then(function (d) {
					return c.zp = d;
				}), b('sounds/leave.wav').then(function (d) {
					return c.Fp = d;
				}), b('sounds/crowd.ogg').then(function (d) {
					c.Fo = d;
					c.pk = new class_mc(c.Fo, c.c);
					c.pk.connect(c.ng);
				})]);
			}

			om() {
				this.c.resume();
			}

			ld(a) {
				let b = this.c.createBufferSource();
				b.buffer = a;
				b.connect(this.ng);
				b.start();
			}

			yi() {
				let a = class_m.j.Ri.v();
				class_m.j.ve.v() || (a = 0);
				this.ng.gain.value = a;
			}
		}

		class class_rc {
			constructor(a, b) {
				this.r = new RegExp(a, b.split('u').join(''));
			}

			match(a) {
				this.r.global && (this.r.lastIndex = 0);
				this.r.pc = this.r.exec(a);
				this.r.jh = a;
				return null != this.r.pc;
			}

			sn(a) {
				if (null != this.r.pc && 0 <= a && a < this.r.pc.length)
					return this.r.pc[a];
				throw class_v.C('EReg::matched');
			}

			Ys() {
				if (null == this.r.pc)
					throw class_v.C('No string matched');
				return {
					xj: this.r.pc.index,
					Vs: this.r.pc[0].length
				};
			}

			Xs(a, b) {
				var c;
				null == c && (c = -1);
				if (this.r.global) {
					this.r.lastIndex = b;
					this.r.pc = this.r.exec(0 > c ? a : class_O.substr(a, 0, b + c));
					if (b = null != this.r.pc)
						this.r.jh = a;
					return b;
				}
				if (c = this.match(0 > c ? class_O.substr(a, b, null) : class_O.substr(a, b, c)))
					this.r.jh = a,
						this.r.pc.index += b;
				return c;
			}
		}

		class class_zb {
			constructor() {
				this.Jl = new class_sc;
				this.f = class_x.Ia(class_zb.O);
				let a = class_x.Ba(this.f);
				this.Cg = a.get('ping');
				this.Uo = a.get('fps');
				class_x.replaceWith(a.get('graph'), this.Jl.f);
			}

			Ur(a, b) {
				this.Cg.textContent = 'Ping: ' + a + ' - ' + b;
			}

			Dm(a) {
				this.Uo.textContent = 'Fps: ' + a;
			}
		}

		class class_Q {
			static Fe(a) {
				return class_w.Me(a, '');
			}

			static parseInt(a) {
				a = parseInt(a);
				return isNaN(a) ? null : a;
			}
		}

		class class_T {
			constructor() {
			}

			os() {
				return 'idkey.' + this.jj + '.' + this.kj + '.' + this.rk;
			}

			bs(a) {
				try {
					let b = class_A.ka(1024);
					b.m(1);
					let c = b.a;
					b.Xb(0);
					let d = b.a;
					b.oc(this.jj);
					b.oc(this.kj);
					b.Lb(a);
					let e = b.a - d;
					b.s.setUint16(c, e, b.Ua);
					let f = new Uint8Array(b.s.buffer, b.s.byteOffset + d, e);
					return window.crypto.subtle.sign(class_T.Im, this.Wl, f).then(function (g) {
						b.Ug(g);
						return b.Wb();
					});
				}
				catch (b) {
					return Promise.reject(class_v.Mb(b).Gb());
				}
			}

			static Wo() {
				try {
					return window.crypto.subtle.generateKey(class_T.qh, true, ['sign', 'verify']).then(function (a) {
						let b = a.privateKey;
						return window.crypto.subtle.exportKey('jwk', b).then(function (c) {
							let d = c.y
								,
								e = c.d
								,
								f = new class_T;
							f.jj = c.x;
							f.kj = d;
							f.rk = e;
							f.Wl = b;
							return f;
						});
					});
				}
				catch (a) {
					return Promise.reject(class_v.Mb(a).Gb());
				}
			}

			static Vo(a) {
				a = a.split('.');
				if (4 != a.length || 'idkey' != a[0])
					return Promise.reject('Invalid id format');
				let b = a[1]
					,
					c = a[2]
					,
					d = a[3];
				return class_T.Es(b, c, d).then(function (e) {
					let f = new class_T;
					f.jj = b;
					f.kj = c;
					f.rk = d;
					f.Wl = e;
					return f;
				});
			}

			static xs(a, b) {
				try {
					let c = new class_K(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
					c.F();
					let d = c.tb(c.Sb())
						,
						e = c.tb()
						,
						f = new class_K(new DataView(d.buffer, d.byteOffset, d.byteLength), false)
						,
						g = f.kc()
						,
						h = f.kc()
						,
						k = f.tb();
					if (k.byteLength != b.byteLength)
						return Promise.reject(null);
					a = 0;
					let l = k.byteLength;
					for (; a < l;) {
						let n = a++;
						if (k[n] != b[n])
							return Promise.reject(null);
					}
					return class_T.Ds(g, h).then(function (n) {
						return window.crypto.subtle.verify(class_T.Im, n, e, d);
					}).then(function (n) {
						if (!n)
							throw class_v.C(null);
						return g;
					});
				}
				catch (c) {
					return Promise.reject(class_v.Mb(c).Gb());
				}
			}

			static Es(a, b, c) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['sign'],
						kty: 'EC',
						d: c,
						x: a,
						y: b
					}, class_T.qh, true, ['sign']);
				}
				catch (d) {
					return Promise.reject(class_v.Mb(d).Gb());
				}
			}

			static Ds(a, b) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['verify'],
						kty: 'EC',
						x: a,
						y: b
					}, class_T.qh, true, ['verify']);
				}
				catch (c) {
					return Promise.reject(class_v.Mb(c).Gb());
				}
			}
		}

		class class_B {
			static Rp() {
				class_C.rj(function () {
					class_B.Ck(class_B.Zq);
				});
				class_B.Ip();
			}

			static Ip() {
				let a = class_m.j.Vj.v();
				null == a ? class_T.Wo().then(function (b) {
					class_B.Ue = b;
					class_m.j.Vj.ha(b.os());
				}).catch(function () {
				}) : class_T.Vo(a).then(function (b) {
					return class_B.Ue = b;
				}).catch(function () {
				});
			}

			static Zo() {
				let a = class_Ac.ln();
				return null != a ? null != a.getItem('crappy_router') : false;
			}

			static Ck(a) {
				let b = new class_hb(class_m.j.ne.v());
				b.yl = function (c) {
					class_m.j.ne.ha(c);
					class_m.Pa.om();
					a();
				}
				;
				class_C.Na(b.f);
				b.Eb.focus();
			}

			static Dk(a, b) {
				a = new class_Y(a);
				a.Wa = b;
				class_C.Na(a.f);
			}

			static Lo(a, b) {
				function c() {
					let f = new class_Ra('Failed', null);
					f.Wa = function () {
						class_B.yb();
					}
					;
					class_C.Na(f.f);
				}

				function d(f) {
					f = f.sitekey;
					if (null == f)
						throw class_v.C(null);
					class_B.Dk(f, function (g) {
						e(a, g);
					});
				}

				class_C.Na((new class_Z('Connecting', 'Connecting...', [])).f);
				let e = null;
				e = function (f, g) {
					class_aa.Vl(class_m.Pe + 'api/client', 'room=' + f + '&rcr=' + g, class_aa.Hj).then(function (h) {
						switch (h.action) {
							case 'connect':
								h = h.token;
								if (null == h)
									throw class_v.C(null);
								b(h);
								break;
							case 'recaptcha':
								d(h);
								break;
							default:
								throw class_v.C(null);
						}
					}).catch(function () {
						c();
					});
				}
				;
				e(a, '');
			}

			static Zq() {
				let a = class_Bc.v()
					,
					b = a.get('c')
					,
					c = a.get('p');
				a.get('v');
				null != b ? null != c ? class_B.Hh(b) : class_B.ag(b) : class_B.yb();
			}

			static yb() {
				let a = new class_Sa(class_m.j.Oh());
				class_C.Na(a.La);
				a.un = function (b) {
					if (9 != b.Ed.Rd) {
						let c;
						9 > b.Ed.Rd ? (b = 'Old version room',
							c = 'The room is running an older version, an update must have happened recently.') : (b = 'New version',
							c = 'The room is running a new version of haxball, refresh the site to update.');
						let d = new class_Z(b, c, ['Ok']);
						class_C.Na(d.f);
						d.Wa = function () {
							class_C.Na(a.La);
							d.Wa = null;
						};
					}
					else
						b.Ed.Kb ? class_B.Hh(b.ba) : class_B.ag(b.ba);
				}
				;
				a.dt = function () {
					class_B.Mo();
				}
				;
				a.ct = function () {
					class_B.Ck(class_B.yb);
				}
				;
				a.ft = function () {
					class_B.Fk();
				}
				;
				a.et = function (b) {
					class_B.No(b);
				};
			}

			static Fk() {
				let a = new class_ka(true)
					,
					b = window.document.createElement('div');
				b.className = 'view-wrapper';
				b.appendChild(a.f);
				class_C.Na(b);
				a.rb = function () {
					class_B.yb();
				}
				;
				a.fq = function () {
					let c = new class_ib
						,
						d = window.document.createElement('div');
					d.className = 'view-wrapper';
					d.appendChild(c.f);
					class_C.Na(d);
					c.rb = function () {
						class_B.Fk();
					};
				};
			}

			static gi(a, b) {
				// Exposing global fields begin
				let roomLink = '' + globalScope.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
				const onRoomLinkFun = window.parent.g.onRoomLink;
				if (onRoomLinkFun != null)
					onRoomLinkFun(roomLink);
				return roomLink;
				// Exposing global fields end
			}

			static Mo() {
				let a = class_m.j.ne.v()
					,
					b = new class_jb('' + a + '\'s room');
				class_C.Na(b.f);
				b.ji = function () {
					class_B.yb();
				}
				;
				b.kq = function (c) {
					function d() {
						if (!c.qt) {
							var t = new class_Ob;
							t.Rd = 9;
							t.D = g.lc;
							t.K = g.K.length;
							t.jf = k.qg + 1;
							t.vb = f.vb;
							t.Kb = null != k.Kb;
							t.Ic = f.Ic;
							t.Lc = f.Lc;
							var z = class_A.ka(16);
							t.ga(z);
							k.Oi(z.Rg());
						}
					}

					class_C.Na((new class_Z('Creating room', 'Connecting...', [])).f);
					let e = null
						,
						f = class_m.j.Oh()
						,
						g = new class_ta_RoomState;
					g.lc = c.name;
					let h = new class_ua_FullPlayer;
					h.D = a;
					h.fb = true;
					h.country = f.vb;
					h.Zb = class_m.j.sh.v();
					g.K.push(h);
					let k = new class_Rb_ClientRoom({
						iceServers: class_m.hg,
						uj: class_m.Pe + 'api/host',
						state: g,
						version: 9
					});
					k.qg = c.Zs - 1;
					k.Kb = c.password;
					d();
					let l = new class_Ma_RoomManager(k)
						,
						n = false;
					k.sf = function (t, z) {
						class_B.Dk(t, function (J) {
							z(J);
							class_C.Na(l.l.f);
							n = true;
						});
					}
					;
					let r = window.setInterval(function () {
						k.ua(class_Ca.pa(k));
					}, 3E3);
					k.vl = function (t) {
						null != g.qa(t) && k.ua(class_la.pa(t, 'Bad actor', false));
					}
					;
					k.iq = function (t, z) {
						let J = z.kc();
						if (25 < J.length)
							throw class_v.C('name too long');
						let N = z.kc();
						if (3 < N.length)
							throw class_v.C('country too long');
						z = z.Bb();
						if (null != z && 2 < z.length)
							throw class_v.C('avatar too long');
						k.ua(class_Da.pa(t, J, N, z));
						d();
					}
					;
					k.jq = function (t) {
						null != g.qa(t) && k.ua(class_la.pa(t, null, false));
					}
					;
					k.vg = function (t) {
						e = t;
						l.Kg = class_B.gi(t, null != k.Kb);
						n || (n = true,
							class_C.Na(l.l.f));
					}
					;
					l.Mh.pq = function (t, z, J, N) {
						k.Ro(t, z, J, N);
					}
					;
					l.Mh.qq = function () {
						d();
					}
					;
					l.l.le = function () {
						k.la();
						l.la();
						class_B.yb();
						window.clearInterval(r);
					}
					;
					l.$f.Ng = function (t) {
						k.Kb = t;
						d();
						null != e && (l.Kg = class_B.gi(e, null != k.Kb));
					}
					;
					l.$f.Em = function (t) {
						k.Ni(t);
					}
					;
					l.$f.ce = function_M(k, k.ce);
				};
			}

			static Hh(a) {
				let b = new class_kb;
				class_C.Na(b.f);
				b.Wa = function (c) {
					null == c ? class_B.yb() : class_B.ag(a, c);
				};
			}

			static No(a) {
				try {
					let b = new class_hc(new class_Sb_ReplayRoom(new Uint8Array(a), new class_ta_RoomState, 3));
					b.qe.le = function () {
						b.la();
						class_B.yb();
					}
					;
					class_C.Na(b.l.f);
				}
				catch (b) {
					let c = class_v.Mb(b).Gb();
					if (c instanceof class_Rb)
						a = new class_Z('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']),
							class_C.Na(a.f),
							a.Wa = function (d) {
								0 == d ? (d = window.top.location,
									window.top.open(d.protocol + '//' + d.hostname + (null != d.port ? ':' + d.port : '') + '/replay?v=' + c.Rd, '_self')) : class_B.yb();
							}
						;
					else {
						let d = new class_Z('Replay error', 'Couldn\'t load the file.', ['Ok']);
						class_C.Na(d.f);
						d.Wa = function () {
							d.Wa = null;
							class_B.yb();
						};
					}
				}
			}

			static ag(a, b, c) {
				try {
					let d = class_B.Zo()
						,
						e = new class_ta_RoomState
						,
						f = class_A.ka();
					f.oc(class_m.j.ne.v());
					f.oc(class_m.j.Oh().vb);
					f.Fb(class_m.j.sh.v());
					let g = new class_Na_ServerRoom(a, {
							iceServers: class_m.hg,
							uj: class_m.Cs,
							state: e,
							version: 9,
							st: f.Rg(),
							password: b,
							zn: d,
							Dn: c,
							Ms: class_B.Ue
						})
						,
						h = new class_lb;
					h.da('Connecting to master...');
					h.xh.onclick = function () {
						g.Jd = null;
						g.rf = null;
						g.la();
						class_B.yb();
					}
					;
					class_C.Na(h.f);
					let k = function (r, t) {
							r = new class_Ra(r, t);
							r.Wa = function () {
								class_B.yb();
							}
							;
							class_C.Na(r.f);
						}
						,
						l = function () {
							let r = new class_Z('Connection Failed', '', ['Ok']);
							r.de.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
							r.Wa = function () {
								class_B.yb();
							}
							;
							class_C.Na(r.f);
						}
						,
						n = function () {
							let r = new class_Ma_RoomManager(g);
							g.zl = function (t) {
								r.l.Gf.Ur(g.Dg.hh() | 0, g.Dg.max() | 0);
								r.l.Gf.Jl.Pn(t);
							}
							;
							r.Kg = class_B.gi(a, false);
							class_C.Na(r.l.f);
							r.l.le = function () {
								g.Jd = null;
								g.la();
								r.la();
								class_B.yb();
							}
							;
							g.Jd = function () {
								g.Jd = null;
								r.la();
								let t = null == r.Od ? null : r.Od.stop();
								k(g.xk, t);
							};
						};
					g.rf = function (r) {
						g.rf = null;
						g.Jd = null;
						switch (r.pb) {
							case 1:
								l();
								break;
							case 2:
								switch (r.reason) {
									case 4004:
										class_B.Lo(a, function (t) {
											class_B.ag(a, b, t);
										});
										break;
									case 4101:
										null == b ? class_B.Hh(a) : k(class_Na_ServerRoom.Bh(r), null);
										break;
									default:
										k(class_Na_ServerRoom.Bh(r), null);
								}
								break;
							default:
								k(class_Na_ServerRoom.Bh(r), null);
						}
					}
					;
					g.Jd = function (r) {
						switch (r) {
							case 1:
								h.da('Connecting to peer...');
								break;
							case 2:
								h.da('Awaiting state...');
								break;
							case 3:
								n();
						}
					}
					;
					g.uq = function () {
						h.da('Trying reverse connection...');
					};
				}
				catch (d) {
					c = class_v.Mb(d).Gb(),
						globalScope.console.log(c),
						c = new class_Z('Unexpected Error', '', []),
						c.de.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.',
						class_C.Na(c.f);
				}
			}
		}

		class class_ub {
			constructor(a, b) {
				this.f = class_x.Ia(class_ub.O);
				let c = class_x.Ba(this.f);
				this.lf = c.get('name');
				this.Uf = c.get('admin');
				this.bf = c.get('kick');
				this.wd = c.get('close');
				let d = this;
				this.Uf.onclick = function () {
					class_Ma.i(d.cq, d.Rb, !d.Ml);
				}
				;
				this.bf.onclick = function () {
					class_D.i(d.li, d.Rb);
				}
				;
				this.wd.onclick = function () {
					class_H.i(d.rb);
				}
				;
				this.Rb = a.Y;
				this.Tj(a.D);
				this.Sj(a.fb);
				this.Uf.disabled = !b || 0 == this.Rb;
				this.bf.disabled = !b || 0 == this.Rb;
			}

			A(a, b) {
				a = a.qa(this.Rb);
				null == a ? class_H.i(this.rb) : (this.us(a),
					this.Uf.disabled = !b || 0 == this.Rb,
					this.bf.disabled = !b || 0 == this.Rb);
			}

			us(a) {
				this.ne != a.D && this.Tj(a.D);
				this.Ml != a.fb && this.Sj(a.fb);
			}

			Tj(a) {
				this.ne = a;
				this.lf.textContent = a;
			}

			Sj(a) {
				this.Ml = a;
				this.Uf.textContent = a ? 'Remove Admin' : 'Give Admin';
			}
		}

		class class_Va {
			constructor() {
				this.list = [];
			}

			nn(a) {
				let b = 0
					,
					c = a.ob
					,
					d = a.Cc
					,
					e = 0
					,
					f = this.list;
				for (; e < f.length;) {
					var g = f[e];
					++e;
					let h = g.ob;
					if (h > c)
						break;
					if (h == c) {
						g = g.Cc;
						if (g > d)
							break;
						g == d && ++d;
					}
					++b;
				}
				a.Cc = d;
				this.list.splice(b, 0, a);
			}

			jt(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].ob >= a);)
					++b;
				this.list.splice(0, b);
			}

			Js(a, b) {
				let c = this.list;
				for (; 0 < c.length;)
					c.pop();
				class_Va.at(a.list, b.list, this.list);
			}

			kt(a) {
				let b = 0
					,
					c = this.list
					,
					d = 0
					,
					e = c.length;
				for (; d < e;) {
					let f = c[d++];
					f.Ce != a && (c[b] = f,
						++b);
				}
				for (; c.length > b;)
					c.pop();
			}

			Ks(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].ob >= a);)
					++b;
				return b;
			}

			static at(a, b, c) {
				if (0 == a.length)
					for (a = 0; a < b.length;)
						c.push(b[a++]);
				else if (0 == b.length)
					for (b = 0; b < a.length;)
						c.push(a[b++]);
				else {
					let d = 0
						,
						e = a.length
						,
						f = 0
						,
						g = b.length;
					for (; ;) {
						let h = a[d]
							,
							k = b[f];
						if (h.ob <= k.ob) {
							if (c.push(h),
								++d,
							d >= e) {
								for (; f < g;)
									c.push(b[f++]);
								break;
							}
						}
						else if (c.push(k),
							++f,
						f >= g) {
							for (; d < e;)
								c.push(a[d++]);
							break;
						}
					}
				}
			}
		}

		class class_x {
			static Ba(a) {
				let b = new Map
					,
					c = 0;
				for (a = a.querySelectorAll('[data-hook]'); c < a.length;) {
					let d = a[c++];
					b.set(d.getAttribute('data-hook'), d);
				}
				return b;
			}

			static Ia(a, b) {
				null == b && (b = 'div');
				b = window.document.createElement(b);
				b.innerHTML = a;
				return b.firstElementChild;
			}

			static replaceWith(a, b) {
				a.parentElement.replaceChild(b, a);
			}

			static Nf(a) {
				let b = a.firstChild;
				for (; null != b;)
					a.removeChild(b),
						b = a.firstChild;
			}
		}

		class class_kc {
			static i(a, b, c, d) {
				null != a && a(b, c, d);
			}
		}

		class class_vb {
			constructor(a) {
				this.ol = a.get('notice');
				this.zo = a.get('notice-contents');
				this.wd = a.get('notice-close');
				this.em();
			}

			em() {
				let a = this;
				class_aa.Lk(class_m.Pe + 'api/notice').then(function (b) {
					let c = b.content;
					null != c && '' != c && class_vb.no != c && (a.zo.innerHTML = c,
							a.ol.hidden = false,
							a.wd.onclick = function () {
								class_vb.no = c;
								return a.ol.hidden = true;
							}
					);
				});
			}
		}

		class class_gb {
			constructor() {
				this.zk = null;
				this.f = class_x.Ia(class_gb.O);
				var a = class_x.Ba(this.f);
				this.lg = a.get('link');
				let b = a.get('copy');
				a = a.get('close');
				let c = this;
				this.lg.onfocus = function () {
					c.lg.select();
				}
				;
				b.onclick = function () {
					c.lg.select();
					return window.document.execCommand('Copy');
				}
				;
				a.onclick = function () {
					class_H.i(c.rb);
				};
			}

			Sr(a) {
				this.zk != a && (this.zk = a,
					this.lg.value = a);
			}
		}

		class class_sb {
			static Hp() {
				if (null != class_sb.ti)
					return class_sb.ti;
				class_sb.ti = new Promise(function (a, b) {
						var c = window.grecaptcha;
						null != c ? a(c) : (c = window.document.createElement('script'),
								c.src = 'https://www.google.com/recaptcha/api.js?onload=___recaptchaload&render=explicit',
								window.document.head.appendChild(c),
								window.___recaptchaload = function () {
									a(window.grecaptcha);
								}
								,
								c.onerror = function () {
									b(null);
								}
						);
					}
				);
				return class_sb.ti;
			}
		}

		class class_Ra {
			constructor(a, b) {
				this.f = class_x.Ia(class_Ra.O);
				let c = class_x.Ba(this.f);
				this.aq = c.get('ok');
				let d = this;
				this.aq.onclick = function () {
					class_H.i(d.Wa);
				}
				;
				this.jm = c.get('replay');
				let e = null != b;
				this.jm.hidden = !e;
				e && (this.jm.onclick = function () {
						class_Ma_RoomManager.tm(b);
					}
				);
				c.get('reason').textContent = a;
			}
		}

		class class_da {
			constructor(a, b) {
				let c = []
					,
					d = 0;
				for (; d < a.length;)
					c.push(this.Tp(a[d++], b));
				this.hf = c;
			}

			Xo() {
				return 2.31 + .1155 * (this.hf.length - 1);
			}

			Qc(a, b) {
				b /= 2.31;
				let c = 0;
				a.imageSmoothingEnabled = true;
				let d = 0
					,
					e = this.hf;
				for (; d < e.length;) {
					let g = e[d];
					++d;
					var f = b - .05 * c;
					let h = class_da.En.eval(f)
						,
						k = 35 * -(this.hf.length - 1) + 70 * c;
					f = 180 * class_da.Fn.eval(f);
					a.globalAlpha = h;
					a.drawImage(g, f * (0 != (c & 1) ? -1 : 1) - .5 * g.width, k - .5 * g.height);
					a.globalAlpha = 1;
					++c;
				}
				a.imageSmoothingEnabled = false;
			}

			vr(a) {
				let b = 0;
				a.imageSmoothingEnabled = true;
				let c = 0
					,
					d = this.hf;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					a.drawImage(e, .5 * -e.width, 35 * -(this.hf.length - 1) + 70 * b - .5 * e.height);
					++b;
				}
				a.imageSmoothingEnabled = false;
			}

			nc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			Tp(a, b) {
				let c = window.document.createElement('canvas')
					,
					d = c.getContext('2d', null);
				d.font = '900 70px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
				c.width = Math.ceil(d.measureText(a).width) + 7;
				c.height = 90;
				d.font = '900 70px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
				d.textAlign = 'left';
				d.textBaseline = 'middle';
				d.fillStyle = 'black';
				d.fillText(a, 7, 52);
				d.fillStyle = this.nc(b);
				d.fillText(a, 0, 45);
				return c;
			}
		}

		class class_fc {
			constructor(a) {
				this.$b = a.slice();
			}

			eval(a) {
				var b = this.$b.length - 1;
				if (a <= this.$b[0])
					return this.$b[1];
				if (a >= this.$b[b])
					return this.$b[b - 2];
				var c = 0;
				b = b / 5 | 0;
				do {
					var d = b + c >>> 1;
					a > this.$b[5 * d] ? c = d + 1 : b = d - 1;
				} while (c <= b);
				c = 5 * b;
				b = this.$b[c];
				a = (a - b) / (this.$b[c + 5] - b);
				b = a * a;
				d = b * a;
				return (2 * d - 3 * b + 1) * this.$b[c + 1] + (d - 2 * b + a) * this.$b[c + 2] + (-2 * d + 3 * b) * this.$b[c + 3] + (d - b) * this.$b[c + 4];
			}
		}

		class class_hb {
			constructor(a) {
				function b() {
					d.Hc() && null != d.yl && d.yl(d.Eb.value);
				}

				this.f = class_x.Ia(class_hb.O);
				let c = class_x.Ba(this.f);
				this.Eb = c.get('input');
				this.nf = c.get('ok');
				let d = this;
				this.Eb.maxLength = 25;
				this.Eb.value = a;
				this.Eb.oninput = function () {
					d.A();
				}
				;
				this.Eb.onkeydown = function (e) {
					13 == e.keyCode && b();
				}
				;
				this.nf.onclick = b;
				this.A();
			}

			Hc() {
				let a = this.Eb.value;
				return 25 >= a.length ? 0 < a.length : false;
			}

			A() {
				this.nf.disabled = !this.Hc();
			}
		}

		class class_ha {
			static Xc(a, b) {
				return a.length <= b ? a : class_O.substr(a, 0, b);
			}

			static Hs(a) {
				let b = ''
					,
					c = 0
					,
					d = a.byteLength;
				for (; c < d;)
					b += class_ba.bh(a[c++], 2);
				return b;
			}
		}

		class class_ba {
			static Us(a, b) {
				a = class_O.nj(a, b);
				return 8 < a && 14 > a ? true : 32 == a;
			}

			static nt(a) {
				let b = a.length
					,
					c = 0;
				for (; c < b && class_ba.Us(a, b - c - 1);)
					++c;
				return 0 < c ? class_O.substr(a, 0, b - c) : a;
			}

			static Lf(a) {
				var b;
				let c = '';
				for (b = 2 - a.length; c.length < b;)
					c += '0';
				return c + (null == a ? 'null' : '' + a);
			}

			static replace(a, b, c) {
				return a.split(b).join(c);
			}

			static bh(a, b) {
				let c = '';
				do
					c = '0123456789ABCDEF'.charAt(a & 15) + c,
						a >>>= 4;
				while (0 < a);
				if (null != b)
					for (; c.length < b;)
						c = '0' + c;
				return c;
			}
		}

		class class_mb {
			constructor() {
				this.lb = null;
				this.f = class_x.Ia(class_mb.O);
				let a = class_x.Ba(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.ji);
				}
				;
				this.oi = a.get('pick');
				this.uk = a.get('delete');
				this.Jk = a.get('export');
				let c = a.get('list')
					,
					d = a.get('file');
				this.Tg();
				this.oi.onclick = function () {
					null != b.lb && b.lb.Yd().then(function (e) {
						class_D.i(b.zg, e);
					});
				}
				;
				this.uk.onclick = function () {
					if (null != b.lb) {
						var e = b.lb.gn;
						null != e && (b.lb.La.remove(),
							b.lb = null,
							e(),
							b.Tg());
					}
				}
				;
				this.Jk.onclick = function () {
					null != b.lb && b.lb.Yd().then(function (e) {
						class_Ob_ReplayDownloader.Er(e.Ae(), e.D + '.hbs');
					});
				}
				;
				this.si(c);
				this.Yl = class_nb.ei(c);
				window.setTimeout(function () {
					b.Yl.update();
				}, 0);
				d.onchange = function () {
					var e = d.files;
					if (!(1 > e.length)) {
						e = e.item(0);
						var f = new FileReader;
						f.onload = function () {
							try {
								var g = f.result;
								let h = new class_q_Stadium;
								h.cl(g);
								class_D.i(b.zg, h);
							}
							catch (h) {
								g = class_v.Mb(h).Gb(),
									g instanceof SyntaxError ? class_D.i(b.mi, 'SyntaxError in line: ' + class_Q.Fe(g.lineNumber)) : g instanceof class_Ta ? class_D.i(b.mi, g.Xp) : class_D.i(b.mi, 'Error loading stadium file.');
							}
						}
						;
						f.readAsText(e);
					}
				};
			}

			Tg() {
				this.oi.disabled = null == this.lb;
				this.uk.disabled = null == this.lb || null == this.lb.gn;
				this.Jk.disabled = null == this.lb;
			}

			jl(a, b, c) {
				let d = window.document.createElement('div');
				d.textContent = a;
				d.className = 'elem';
				null != c && d.classList.add('custom');
				let e = {
						La: d,
						Yd: b,
						gn: c
					}
					,
					f = this;
				d.onclick = function () {
					null != f.lb && f.lb.La.classList.remove('selected');
					f.lb = e;
					d.classList.add('selected');
					f.Tg();
				}
				;
				d.ondblclick = function () {
					f.lb = e;
					f.Tg();
					return f.oi.onclick();
				}
				;
				return d;
			}

			si(a) {
				let b = class_q_Stadium.Nh()
					,
					c = 0;
				for (; c < b.length;) {
					let e = b[c];
					++c;
					a.appendChild(this.jl(e.D, function () {
						return Promise.resolve(e);
					}, null));
				}
				let d = this;
				class_ob.getAll().then(function (e) {
					let f = 0;
					for (; f < e.length;) {
						let g = e[f];
						++f;
						let h = g.id;
						a.appendChild(d.jl(g.name, function () {
							return class_ob.get(h);
						}, function () {
							return class_ob.delete(h);
						}));
					}
					d.Yl.update();
				});
			}
		}

		class class_mc {
			constructor(a, b) {
				this.nh = null;
				this.pt = .025;
				this.De = this.kh = this.Pf = 0;
				this.$g = b.createGain();
				this.$g.gain.value = 0;
				b = b.createBufferSource();
				b.buffer = a;
				b.connect(this.$g);
				b.loop = true;
				b.start();
			}

			update() {
				var a = window.performance.now();
				let b = a - this.qn;
				this.qn = a;
				this.De += (this.kh - this.De) * this.pt;
				this.Pf -= b;
				0 >= this.Pf && (this.Pf = this.kh = 0);
				0 >= this.kh && .05 > this.De && (window.clearInterval(this.nh),
					this.nh = null,
					this.De = 0);
				a = class_m.j.Jm.v() ? this.De : 0;
				this.$g.gain.value = a;
			}

			Aj(a) {
				this.kh = a;
				this.Pf = 166.66666666666666;
				let b = this;
				null == this.nh && (this.nh = window.setInterval(function () {
					b.update();
				}, 17),
					this.qn = window.performance.now());
			}

			connect(a) {
				this.$g.connect(a);
			}

			rt(a) {
				let b = a.M;
				if (null != b)
					if (2 == b.Db)
						0 >= b.Ra && this.Aj(1);
					else if (1 == b.Db) {
						let e = b.va.H[0]
							,
							f = null
							,
							g = null
							,
							h = null
							,
							k = 0
							,
							l = null
							,
							n = null
							,
							r = null
							,
							t = 0
							,
							z = class_u_Team.ia.Gh
							,
							J = 0;
						for (a = a.K; J < a.length;) {
							let N = a[J];
							++J;
							if (null == N.J)
								continue;
							var c = N.J.a;
							let Gb = e.a;
							var d = c.x - Gb.x;
							c = c.y - Gb.y;
							d = d * d + c * c;
							if (N.fa == class_u_Team.ia) {
								if (null == f || f.a.x * z < N.J.a.x * z)
									f = N.J;
								if (null == g || g.a.x * z > N.J.a.x * z)
									g = N.J;
								if (null == h || d < k)
									h = N.J,
										k = d;
							}
							else if (N.fa == class_u_Team.Da) {
								if (null == l || l.a.x * z < N.J.a.x * z)
									l = N.J;
								if (null == n || n.a.x * z > N.J.a.x * z)
									n = N.J;
								if (null == r || d < t)
									r = N.J,
										t = d;
							}
						}
						null != n && null != g && 0 >= b.Ra && (h.a.x > n.a.x && e.a.x > n.a.x && 20 < e.a.x && this.Aj(.3),
						r.a.x < g.a.x && e.a.x < g.a.x && -20 > e.a.x && this.Aj(.3));
					}
			}
		}

		class class_Vb {
			constructor(a, b) {
				this.Uh = null;
				this.l = a;
				null != b && (this.Uh = '@' + class_ba.replace(b, ' ', '_'));
			}

			cj(a) {
				let b = this.l.Ka.Ec
					,
					c = []
					,
					d = 0;
				for (a = a.K; d < a.length;) {
					let e = a[d];
					++d;
					c.push({
						D: e.D,
						ba: e.Y
					});
				}
				b.Wj = c;
			}

			zi(a) {
				function b(d) {
					return null == d ? '' : ' by ' + d.D;
				}

				this.cj(a);
				let c = this;
				// Invoking global fields begin
				a.Pl = function (d) {
					c.l.Ka.Ib('' + d.D + ' has joined');
					class_m.Pa.ld(class_m.Pa.zp);
					c.cj(a);

					if (window.parent.g.onPlayerJoin != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerJoin(player);
					}
				}
				;
				a.Ql = function (d, e, f, g) {
					class_D.i(c.qq, d.Y);

					if (window.parent.g.onPlayerLeave != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerLeave(player);
					}

					let noticeText;
					if (null == e) {
						noticeText = '' + d.D + ' has left';
					}
					else {
						class_bc.i(c.pq, d.Y, e, null != g ? g.D : null, f);
						noticeText = '' + d.D + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' : '');

						if (window.parent.g.onPlayerKicked != null) {
							const player = getFullPlayerObject(d);
							const byPlayer = getFullPlayerObject(g);
							window.parent.g.onPlayerKicked(player, e, f, byPlayer);
						}
					}
					c.l.Ka.Ib(noticeText);
					class_m.Pa.ld(class_m.Pa.Fp);
					c.cj(a);
				}
				;
				a.Nl = function (d, e) {
					let f = null != c.Uh && -1 != e.indexOf(c.Uh);
					c.l.Ka.da('' + d.D + ': ' + e, f ? 'highlight' : null);
					class_m.j.Km.v() && f ? class_m.Pa.ld(class_m.Pa.Rk) : class_m.j.Qi.v() && class_m.Pa.ld(class_m.Pa.fk);

					if (window.parent.g.onPlayerChat != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerChat(player, e);
					}
				}
				;
				a.qm = function (d, e, f, g) {
					c.l.Ka.Qp(d, e, f);
					if (class_m.j.Qi.v())
						switch (g) {
							case 1:
								class_m.Pa.ld(class_m.Pa.fk);
								break;
							case 2:
								class_m.Pa.ld(class_m.Pa.Rk);
						}

					if (window.parent.g.onAnnouncement != null) {
						window.parent.g.onAnnouncement(d, e, f, g);
					}
				}
				;
				a.ri = function (byFullPlayer) {
					class_m.Pa.ld(class_m.Pa.Bp);

					if (window.parent.g.onPlayerBallKick != null) {
						const byPlayer = getFullPlayerObject(byFullPlayer);
						window.parent.g.onPlayerBallKick(byPlayer);
					}
				}
				;
				a.Xi = function (d) {
					class_m.Pa.ld(class_m.Pa.gp);
					let e = c.l.ib.gb.Cd;
					e.Sa(d == class_u_Team.ia ? e.gr : e.Zn);

					if (window.parent.g.onTeamGoal != null) {
						const teamId = d.ba;
						window.parent.g.onTeamGoal(teamId);
					}
				}
				;
				a.Yi = function (d) {
					let e = c.l.ib.gb.Cd;
					e.Sa(d == class_u_Team.ia ? e.hr : e.$n);
					c.l.Ka.Ib('' + d.D + ' team won the match');

					if (window.parent.g.onTeamVictory != null) {
						const teamId = d.ba;
						window.parent.g.onTeamVictory(teamId);
					}
				}
				;
				a.Il = function (d, e, f) {
					e && !f && c.l.Ka.Ib('Game paused' + b(d));

					if (window.parent.g.onGamePause != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGamePause(byPlayer, e);
					}
				}
				;
				a.Zi = function () {
					let d = c.l.ib.gb.Cd;
					d.Sa(d.fs);

					if (window.parent.g.onTimeIsUp != null) {
						window.parent.g.onTimeIsUp();
					}
				}
				;
				a.Nq = () => {
					if (window.parent.g.onPositionsReset != null) {
						window.parent.g.onPositionsReset();
					}
				}
				;
				a.Ui = function (d) {
					c.l.ue(false);
					c.l.ib.gb.Cd.mo();
					c.l.Ka.Ib('Game started' + b(d));

					if (window.parent.g.onGameStart != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGameStart(byPlayer);
					}
				}
				;
				a.Hf = function (d) {
					null != d && c.l.Ka.Ib('Game stopped' + b(d));

					if (window.parent.g.onGameStop != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGameStop(byPlayer);
					}
				}
				;
				a.Si = function (d, e) {
					if (!e.af()) {
						let f = class_ba.bh(e.ik(), 8);
						c.l.Ka.Ib('Stadium "' + e.D + '" (' + f + ') loaded' + b(d));

						if (window.parent.g.onStadiumChange != null) {
							const byPlayer = getFullPlayerObject(d);
							window.parent.g.onStadiumChange(byPlayer, e.D, f);
						}
					}
				}
				;
				a.Ol = function (d) {
					c.l.Ka.Ib('' + d.D + ' ' + (d.Ud ? 'has desynchronized' : 'is back in sync'));

					if (window.parent.g.onPlayerDesyncChange != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerDesyncChange(player, player.desynchronized);
					}
				}
				;
				a.Tl = function (d, e, f) {
					null != a.M && c.l.Ka.Ib('' + e.D + ' was moved to ' + f.D + b(d));

					if (window.parent.g.onPlayerTeamChange != null) {
						const player = getFullPlayerObject(e);
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onPlayerTeamChange(player, byPlayer, player.team);
					}
				}
				;
				a.pi = function (d, e) {
					let f = e.D;
					const noticeText = (e.fb ? '' + f + ' was given admin rights' : '' + f + '\'s admin rights were taken away') + b(d);
					c.l.Ka.Ib(noticeText);

					if (window.parent.g.onPlayerAdminChange != null) {
						const player = getFullPlayerObject(e);
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onPlayerAdminChange(player, byPlayer, player.admin);
					}
				}
				;
				a.onGameTickFun = function (gameInst) {
					if (window.parent.g.onGameTick != null) {
						window.parent.g.onGameTick(gameInst);
					}
				}
				;
				a.Sl = function (d, e) {
					c.l.ib.gb.np(d, e);

					if (window.parent.g.onChatIndicatorStateChange != null) {
						const player = getFullPlayerObject(d);
						const chatIndicatorShown = e === 0;
						window.parent.g.onChatIndicatorStateChange(player, chatIndicatorShown);
					}
				}
				;
				a.Zk = function (d, e, f, g) {
					c.l.Ka.Ib('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(d));

					if (window.parent.g.onKickRateLimitSet != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onKickRateLimitSet(e, f, g, byPlayer);
					}
				};
				// Invoking global fields end
			}

			ss(a) {
				a.Pl = null;
				a.Ql = null;
				a.Nl = null;
				a.qm = null;
				a.ri = null;
				a.Xi = null;
				a.Yi = null;
				a.Il = null;
				a.Zi = null;
				a.Nq = null;
				a.Ui = null;
				a.Hf = null;
				a.Si = null;
				a.Ol = null;
				a.Tl = null;
				a.pi = null;
				a.Sl = null;
				a.Zk = null;
			}
		}

		class class_H {
			static i(a) {
				null != a && a();
			}
		}

		class class_$b {
			constructor(a) {
				this.$s = a;
				this.cb = [];
			}

			add(a) {
				var b = this.cb.length;
				let c = 0
					,
					d = this.Zd = 0;
				for (; d < b;) {
					let e = d++
						,
						f = this.cb[e];
					f.index++;
					f.weight *= .97;
					this.cb[c].index < f.index && (c = e);
					this.Zd += f.weight;
				}
				b >= this.$s ? (b = this.cb[c],
					this.Zd -= b.weight,
					this.cb.splice(c, 1)) : b = new class_pc;
				b.value = a;
				b.weight = 1;
				b.index = 0;
				this.Zd += b.weight;
				for (a = 0; a < this.cb.length && this.cb[a].value <= b.value;)
					++a;
				this.cb.splice(a, 0, b);
			}

			hh() {
				if (0 == this.cb.length)
					return 0;
				if (1 == this.cb.length)
					return this.cb[0].value;
				var a = .5 * this.Zd;
				let b = this.cb[0].weight
					,
					c = 0;
				for (; c < this.cb.length - 1 && !(b >= a);)
					++c,
						b += this.cb[c].weight;
				return this.cb[c].value;
			}

			max() {
				return 0 == this.cb.length ? 0 : this.cb[this.cb.length - 1].value;
			}
		}

		class class_ka {
			constructor(a) {
				function b(y) {
					let F = window.document.createElement('div');
					F.className = 'inputrow';
					var L = window.document.createElement('div');
					L.textContent = y;
					F.appendChild(L);
					L = Lb.bp(y);
					let ea = 0;
					for (; ea < L.length;) {
						let V = L[ea];
						++ea;
						let wc = window.document.createElement('div');
						var S = V;
						V.startsWith('Key') && (S = class_O.substr(V, 3, null));
						wc.textContent = S;
						F.appendChild(wc);
						S = window.document.createElement('i');
						S.className = 'icon-cancel';
						S.onclick = function () {
							Lb.kr(V);
							class_m.j.Kd.ha(Lb);
							wc.remove();
						}
						;
						wc.appendChild(S);
					}
					L = window.document.createElement('i');
					L.className = 'icon-plus';
					F.appendChild(L);
					L.onclick = function () {
						xc.classList.toggle('show', true);
						xc.focus();
						xc.onkeydown = function (V) {
							xc.classList.toggle('show', false);
							V.stopPropagation();
							V = V.code;
							null == Lb.v(V) && (Lb.Sa(V, y),
								class_m.j.Kd.ha(Lb),
								Fc());
						};
					}
					;
					return F;
				}

				function c(y, F, L) {
					y = l.get(y);
					if (null == L)
						y.hidden = true;
					else {
						y.innerHTML = F + ': <div class=\'flagico\'></div> <span></span>';
						F = y.querySelector('.flagico');
						y = y.querySelector('span');
						try {
							F.classList.add('f-' + L.vb);
						}
						catch (ea) {
						}
						y.textContent = L.vb.toUpperCase();
					}
				}

				function d() {
					let y = class_m.j.zh.v();
					J.textContent = '' + y;
					N.value = '' + y;
				}

				function e() {
					let y = class_m.j.Ah.v();
					t.textContent = '' + y;
					z.value = '' + y;
				}

				function f(y, F, L, ea) {
					let S = l.get(y);
					y = F.v();
					S.selectedIndex = ea(y);
					S.onchange = function () {
						F.ha(L(S.selectedIndex));
					};
				}

				function g(y, F, L) {
					function ea(V) {
						S.classList.toggle('icon-ok', V);
						S.classList.toggle('icon-cancel', !V);
					}

					y = l.get(y);
					y.classList.add('toggle');
					let S = window.document.createElement('i');
					S.classList.add('icon-ok');
					y.insertBefore(S, y.firstChild);
					y.onclick = function () {
						let V = !F.v();
						F.ha(V);
						ea(V);
						null != L && L(V);
					}
					;
					ea(F.v());
				}

				function h(y) {
					let F = {
						fn: l.get(y + 'btn'),
						jh: l.get(y + 'sec')
					};
					n.push(F);
					F.fn.onclick = function () {
						k(F);
					};
				}

				function k(y) {
					let F = 0
						,
						L = 0;
					for (; L < n.length;) {
						let ea = n[L];
						++L;
						let S = ea == y;
						S && (class_ka.vm = F);
						ea.jh.classList.toggle('selected', S);
						ea.fn.classList.toggle('selected', S);
						++F;
					}
				}

				null == a && (a = false);
				this.f = class_x.Ia(class_ka.O);
				let l = class_x.Ba(this.f);
				this.wd = l.get('close');
				let n = [];
				h('sound');
				h('video');
				h('misc');
				h('input');
				k(n[class_ka.vm]);
				g('tsound-main', class_m.j.ve, function () {
					class_m.Pa.yi();
				});
				g('tsound-chat', class_m.j.Qi);
				g('tsound-highlight', class_m.j.Km);
				g('tsound-crowd', class_m.j.Jm);
				f('viewmode', class_m.j.Sd, function (y) {
					return y - 1;
				}, function (y) {
					return y + 1;
				});
				f('fps', class_m.j.Jh, function (y) {
					return y;
				}, function (y) {
					return y;
				});
				let r = [1, .75, .5, .25];
				f('resscale', class_m.j.Ei, function (y) {
					return r[y];
				}, function (y) {
					let F = 0
						,
						L = r.length - 1;
					for (; F < L && !(r[F] <= y);)
						++F;
					return F;
				});
				g('tvideo-lowlatency', class_m.j.ci);
				g('tvideo-teamcol', class_m.j.Sm);
				g('tvideo-showindicators', class_m.j.Sk);
				g('tvideo-showavatars', class_m.j.Hm);
				let t = l.get('chatopacity-value')
					,
					z = l.get('chatopacity-range');
				e();
				z.oninput = function () {
					class_m.j.Ah.ha(parseFloat(z.value));
					e();
				}
				;
				let J = l.get('chatfocusheight-value')
					,
					N = l.get('chatfocusheight-range');
				d();
				N.oninput = function () {
					class_m.j.zh.ha(class_Q.parseInt(N.value));
					d();
				}
				;
				f('chatbgmode', class_m.j.gk, function (y) {
					return 0 == y ? 'full' : 'compact';
				}, function (y) {
					return 'full' == y ? 0 : 1;
				});
				let Gb = null
					,
					Kc = this;
				Gb = function () {
					let y = class_m.j.Ye.v();
					c('loc', 'Detected location', class_m.j.Xe.v());
					c('loc-ovr', 'Location override', y);
					let F = l.get('loc-ovr-btn');
					F.disabled = !a;
					null == y ? (F.textContent = 'Override location',
							F.onclick = function () {
								class_H.i(Kc.fq);
							}
					) : (F.textContent = 'Remove override',
							F.onclick = function () {
								class_m.j.Ye.ha(null);
								Gb();
							}
					);
				}
				;
				Gb();
				let Lb = class_m.j.Kd.v()
					,
					xc = l.get('presskey')
					,
					Fc = null
					,
					eb = l.get('inputsec');
				Fc = function () {
					class_x.Nf(eb);
					eb.appendChild(b('Up'));
					eb.appendChild(b('Down'));
					eb.appendChild(b('Left'));
					eb.appendChild(b('Right'));
					eb.appendChild(b('Kick'));
					eb.appendChild(b('ToggleChat'));
				}
				;
				Fc();
				this.wd.onclick = function () {
					class_H.i(Kc.rb);
				};
			}
		}

		class class_ac {
			constructor(a, b, c, d, e, f) {
				this.rh = this.Ch = false;
				this.sa = new class_Ua(0, b, d);
				let g = this;
				this.sa.jd = function () {
					g.Ze(na.Je);
				}
				;
				this.sa.Id = function () {
					null != g.Id && g.Id(new class_Zb(g.sa));
					g.sa = null;
					g.kk();
				}
				;
				(async function () {
						try {
							let h = await g.sa.Do();
							g.$ = new WebSocket(a + 'client?id=' + c + (null == f ? '' : '&token=' + f));
							g.$.binaryType = 'arraybuffer';
							g.$.onclose = function (k) {
								g.Ch || g.Ze(na.Ke(k.code));
							}
							;
							g.$.onerror = function () {
								g.Ch || g.Ze(na.Error);
							}
							;
							g.$.onmessage = function_M(g, g.Sh);
							g.$.onopen = function () {
								null != g.Cl && g.Cl();
								g.sa.Wi();
								g.Ki(h, g.sa.gg, e);
								g.sa.ug = function_M(g, g.Hi);
								g.sa.Vh.then(function () {
									g.Tc(0, null);
								});
							};
						}
						catch (h) {
							g.Ze(na.Je);
						}
					}
				)();
			}

			eo() {
				this.Ze(na.Ie);
			}

			kk() {
				null != this.$ && (this.$.onclose = null,
					this.$.onmessage = null,
					this.$.onerror = null,
					this.$.onopen = null,
					this.$.close(),
					this.$ = null);
				null != this.sa && (this.sa.la(),
					this.sa = null);
			}

			Ze(a) {
				null != this.jd && this.jd(a);
				this.kk();
			}

			Sh(a) {
				var b = new class_K(new DataView(a.data));
				a = b.F();
				0 < b.s.byteLength - b.a && (b = new class_K(new DataView(pako.inflateRaw(b.tb()).buffer), false));
				switch (a) {
					case 1:
						a = b.kc();
						b = b.Gg();
						let c = []
							,
							d = 0;
						for (; d < b.length;)
							c.push(new RTCIceCandidate(b[d++]));
						this.Rh(a, c);
						break;
					case 4:
						this.Qh(new RTCIceCandidate(b.Gg()));
				}
			}

			Rh(a, b) {
				this.sa.Wi(this.rh ? 1E4 : 4E3);
				this.Ch = true;
				null != this.tl && this.tl();
				let c = this;
				this.sa.Ta.setRemoteDescription(new RTCSessionDescription({
					sdp: a,
					type: 'answer'
				})).then(function () {
					let d = 0;
					for (; d < b.length;)
						c.sa.Ta.addIceCandidate(b[d++]);
				}).catch(function () {
					c.Ze(na.Error);
				})
			}

			Qh(a) {
				this.sa.Ta.addIceCandidate(a);
			}

			Tc(a, b) {
				if (null != this.$) {
					var c = class_A.ka(32, false);
					c.m(a);
					null != b && (a = pako.deflateRaw(b.Wb()),
						c.Lb(a));
					this.$.send(c.Qd());
				}
			}

			Ki(a, b, c) {
				let d = class_A.ka(32, false);
				d.m(this.rh ? 1 : 0);
				d.oc(a.sdp);
				d.Vg(b);
				null != c && d.Lb(c.Wb());
				this.Tc(1, d);
			}

			Hi(a) {
				let b = class_A.ka(32, false);
				b.Vg(a);
				this.Tc(4, b);
			}

			static ap(a) {
				switch (a.pb) {
					case 0:
						return 'Failed';
					case 1:
						return class_Ic.description(a.code);
					case 2:
						return '';
					case 3:
						return 'Master connection error';
				}
			}
		}

		class class_Eb {
			constructor(a) {
				this.La = class_x.Ia(class_Eb.Dj, 'tbody');
				var b = class_x.Ba(this.La);
				let c = b.get('name')
					,
					d = b.get('players')
					,
					e = b.get('distance')
					,
					f = b.get('pass');
				b = b.get('flag');
				this.mt = a;
				let g = a.Ed;
				c.textContent = g.D;
				d.textContent = '' + g.K + '/' + g.jf;
				f.textContent = g.Kb ? 'Yes' : 'No';
				e.textContent = '' + (a.We | 0) + 'km';
				try {
					b.classList.add('f-' + g.vb.toLowerCase());
				}
				catch (h) {
				}
				9 > a.Ed.Rd && this.La.classList.add('old');
			}
		}

		class class_tb {
			constructor(a, b) {
				this.bk = a;
				this.bj = b;
				this.qc = a;
				this.gf = window.performance.now();
			}

			Ym() {
				var a;
				null == a && (a = 1);
				this.A();
				return a <= this.qc ? (this.qc -= a,
					true) : false;
			}

			hs() {
				this.A();
				let a = 1 - this.qc;
				if (0 >= a)
					return 0;
				let b = window.performance.now();
				return this.gf + a * this.bj - b;
			}

			yo(a) {
				let b = this.hs();
				--this.qc;
				window.setTimeout(a, b | 0);
			}

			A() {
				let a = window.performance.now()
					,
					b = Math.floor((a - this.gf) / this.bj);
				this.gf += b * this.bj;
				this.qc += b;
				this.qc >= this.bk && (this.qc = this.bk,
					this.gf = a);
			}
		}

		class class_wb {
			constructor(a) {
				this.D = a.D;
				this.Ab = a.Ab;
				this.ba = a.Y;
				this.f = class_x.Ia(class_wb.O);
				let b = class_x.Ba(this.f);
				this.lf = b.get('name');
				this.Cg = b.get('ping');
				try {
					b.get('flag').classList.add('f-' + a.country);
				}
				catch (d) {
				}
				this.lf.textContent = this.D;
				this.Cg.textContent = '' + this.Ab;
				let c = this;
				this.f.ondragstart = function (d) {
					d.dataTransfer.setData('player', class_Q.Fe(c.ba));
				}
				;
				this.f.oncontextmenu = function (d) {
					d.preventDefault();
					class_D.i(c.tf, c.ba);
				}
				;
				this.Am(a.fb);
			}

			A(a, b) {
				this.f.draggable = b;
				this.Ab != a.Ab && (this.Ab = a.Ab,
					this.Cg.textContent = '' + this.Ab);
				this.Qn != a.fb && this.Am(a.fb);
			}

			Am(a) {
				this.Qn = a;
				this.f.className = 'player-list-item' + (a ? ' admin' : '');
			}
		}

		class class_Db {
			constructor(a, b, c, d) {
				this.th = new Set;
				this.Vf = new Set;
				this.Jg = this.zf = this.zm = false;
				this.Sc = null;
				this.Cf = this.ba = '';
				this.Cr = 5E4;
				this.Br = 1E4;
				this.xd = new Map;
				this.cs = a;
				this.hg = b;
				this.ho = c;
				this.Cf = d;
				null == this.Cf && (this.Cf = '');
				this.Ti();
			}

			la() {
				window.clearTimeout(this.pm);
				window.clearTimeout(this.se);
				this.se = null;
				window.clearInterval(this.Kl);
				this.$.onmessage = null;
				this.$.onerror = null;
				this.$.onclose = null;
				this.$.onopen = null;
				this.$.close();
				this.$ = null;
				this.Ik();
			}

			Oi(a) {
				if (null != this.Sc || null != a) {
					if (null != this.Sc && null != a && this.Sc.byteLength == a.byteLength) {
						let c = new Uint8Array(this.Sc)
							,
							d = new Uint8Array(a)
							,
							e = false
							,
							f = 0
							,
							g = this.Sc.byteLength;
						for (; f < g;) {
							let h = f++;
							if (c[h] != d[h]) {
								e = true;
								break;
							}
						}
						if (!e)
							return;
					}
					this.Sc = a.slice(0);
					this.Jg = true;
					var b = this;
					null != this.$ && 1 == this.$.readyState && null == this.se && (this.Ji(),
						this.se = window.setTimeout(function () {
							b.se = null;
							1 == b.$.readyState && b.Jg && b.Ji();
						}, 1E4));
				}
			}

			Ni(a) {
				function b() {
					null != c.$ && 1 == c.$.readyState && c.zf != c.zm && c.ym();
					c.mm = null;
				}

				this.zf = a;
				let c = this;
				null == this.mm && (b(),
					this.mm = window.setTimeout(b, 1E3));
			}

			Ti(a) {
				function b(e) {
					e = e.sitekey;
					if (null == e)
						throw class_v.C(null);
					null != d.sf && d.sf(e, function (f) {
						d.Ti(f);
					});
				}

				function c(e) {
					let f = e.url;
					if (null == f)
						throw class_v.C(null);
					e = e.token;
					if (null == e)
						throw class_v.C(null);
					d.$ = new WebSocket(f + '?token=' + e);
					d.$.binaryType = 'arraybuffer';
					d.$.onopen = function () {
						d.qp();
					}
					;
					d.$.onclose = function (g) {
						d.Ph(4001 != g.code);
					}
					;
					d.$.onerror = function () {
						d.Ph(true);
					}
					;
					d.$.onmessage = function_M(d, d.Sh);
				}

				null == a && (a = '');
				let d = this;
				class_aa.Vl(this.cs, 'token=' + this.Cf + '&rcr=' + a, class_aa.Hj).then(function (e) {
					switch (e.action) {
						case 'connect':
							c(e);
							break;
						case 'recaptcha':
							b(e);
					}
				}).catch(function () {
					d.Ph(true);
				});
			}

			qp() {
				null != this.Sc && this.Ji();
				0 != this.zf && this.ym();
				let a = this;
				this.Kl = window.setInterval(function () {
					a.Ii();
				}, 4E4);
			}

			Sh(a) {
				a = new class_K(new DataView(a.data), false);
				switch (a.F()) {
					case 1:
						this.Rh(a);
						break;
					case 4:
						this.Qh(a);
						break;
					case 5:
						this.lp(a);
						break;
					case 6:
						this.op(a);
				}
			}

			Rh(a) {
				let b = a.jb(),
					c = class_ha.Hs(a.tb(a.F())),
					d,
					e,
					f;
				try {
					a = new class_K(new DataView(pako.inflateRaw(a.tb()).buffer), false);
					d = 0 != a.F();
					e = a.kc();
					let g = a.Gg()
						,
						h = []
						,
						k = 0;
					for (; k < g.length;)
						h.push(new RTCIceCandidate(g[k++]));
					f = h;
				}
				catch (g) {
					this.Ef(b, 0);
					return;
				}
				this.pp(b, c, e, f, a, d);
			}

			pp(a, b, c, d, e, f) {
				if (16 <= this.xd.size)
					this.Ef(a, 4104);
				else if (this.th.has(b))
					this.Ef(a, 4102);
				else {
					for (var g = [], h = 0; h < d.length;) {
						let n = class_Db.Nk(d[h++]);
						if (null != n) {
							if (this.Vf.has(n)) {
								this.Ef(a, 4102);
								return;
							}
							g.push(n);
						}
					}
					if (null != this.mk && (h = new class_K(e.s),
						h.a = e.a,
						e = this.mk(b, h),
					1 == e.pb)) {
						this.Ef(a, e.reason);
						return;
					}
					var k = new class_Ua(a, this.hg, this.ho);
					f && (k.tk = 2500);
					k.xe = g;
					k.rd = b;
					this.xd.set(a, k);
					var l = this;
					var n = function () {
						l.Tc(0, k, null);
						l.xd.delete(k.ba);
					};
					k.jd = n;
					k.Id = function () {
						l.xd.delete(k.ba);
						l.Tc(0, k, null);
						null != l.xl && l.xl(new class_Zb(k));
					}
					;
					k.Wi();
					(async function () {
							try {
								let r = await k.Bo(new RTCSessionDescription({
									sdp: c,
									type: 'offer'
								}), d);
								l.Ki(k, r, k.gg, null);
								k.Vh.then(function () {
									l.Tc(0, k, null);
								});
								k.ug = function (t) {
									l.Hi(k, t);
								};
							}
							catch (r) {
								n();
							}
						}
					)();
				}
			}

			Qh(a) {
				let b = a.jb(),
					c;
				try {
					a = new class_K(new DataView(pako.inflateRaw(a.tb()).buffer), false),
						c = new RTCIceCandidate(a.Gg());
				}
				catch (d) {
					return;
				}
				this.kp(b, c);
			}

			kp(a, b) {
				a = this.xd.get(a);
				if (null != a) {
					let c = class_Db.Nk(b);
					if (null != c && (a.xe.push(c),
						this.Vf.has(c)))
						return;
					a.Nj(b);
				}
			}

			lp(a) {
				this.ba = a.pe(a.F());
				null != this.vg && this.vg(this.ba);
			}

			op(a) {
				this.Cf = a.pe(a.s.byteLength - a.a);
			}

			Tc(a, b, c) {
				if (!b.Dl) {
					0 == a && (b.Dl = true);
					var d = b.ba;
					b = class_A.ka(32, false);
					b.m(a);
					b.ub(d);
					null != c && (a = pako.deflateRaw(c.Wb()),
						b.Lb(a));
					this.$.send(b.Qd());
				}
			}

			Ef(a, b) {
				let c = class_A.ka(16, false);
				c.m(0);
				c.ub(a);
				c.Xb(b);
				this.$.send(c.Qd());
			}

			Ii() {
				let a = class_A.ka(1, false);
				a.m(8);
				this.$.send(a.Qd());
			}

			Ji() {
				this.Jg = false;
				let a = class_A.ka(256, false);
				a.m(7);
				null != this.Sc && a.Ug(this.Sc);
				this.$.send(a.Qd());
			}

			ym() {
				let a = class_A.ka(2, false);
				a.m(9);
				a.m(this.zf ? 1 : 0);
				this.$.send(a.Qd());
				this.zm = this.zf;
			}

			Ki(a, b, c, d) {
				let e = class_A.ka(32, false);
				e.oc(b.sdp);
				e.Vg(c);
				null != d && e.Lb(d.Wb());
				this.Tc(1, a, e);
			}

			Hi(a, b) {
				let c = class_A.ka(32, false);
				c.Vg(b);
				this.Tc(4, a, c);
			}

			Ik() {
				let a = this.xd.values()
					,
					b = a.next();
				for (; !b.done;) {
					let c = b.value;
					b = a.next();
					c.la();
				}
				this.xd.clear();
			}

			Ph(a) {
				this.Ik();
				window.clearTimeout(this.se);
				this.se = null;
				this.Jg = false;
				window.clearInterval(this.Kl);
				window.clearTimeout(this.pm);
				let b = this;
				a && (this.pm = window.setTimeout(function () {
					b.Ti();
				}, this.Br + Math.random() * this.Cr | 0));
			}

			Vn(a) {
				let b = 0
					,
					c = a.xe;
				for (; b < c.length;)
					this.Vf.add(c[b++]);
				null != a.rd && this.th.add(a.rd);
				return {
					xt: a.xe,
					vt: a.rd
				};
			}

			ce() {
				this.Vf.clear();
				this.th.clear();
			}

			static Nk(a) {
				try {
					let b = class_Hc.uf(a.candidate);
					if ('srflx' == b.qs)
						return b.wp;
				}
				catch (b) {
				}
				return null;
			}
		}

		class class_ua {
			constructor(a) {
				this.ql = this.pl = this.sl = null;
				this.ib = new class_qb;
				this.nd = false;
				this.Gf = new class_zb;
				this.Ka = new class_bb;
				this.Xa = new class_Bb(a);
				this.ib.Rb = a;
				this.f = class_x.Ia(class_ua.O);
				a = class_x.Ba(this.f);
				this.ps = a.get('top-section');
				this.vf = a.get('popups');
				this.vf.style.display = 'none';
				a.get('gameplay').appendChild(this.ib.f);
				class_x.replaceWith(a.get('chatbox'), this.Ka.f);
				class_x.replaceWith(a.get('stats'), this.Gf.f);
				this.ii = a.get('menu');
				let b = this;
				this.ii.onclick = function () {
					b.ue(!b.nd);
					b.ii.blur();
				}
				;
				new class_oc(a.get('sound'));
				a.get('settings').onclick = function () {
					let c = new class_ka;
					c.rb = function () {
						b.ab(null);
					}
					;
					b.ab(c.f);
				}
				;
				this.Xa.le = function () {
					let c = new class_Ab;
					c.rb = function (d) {
						b.ab(null);
						d && class_H.i(b.le);
					}
					;
					b.ab(c.f);
				}
				;
				this.Xa.zq = function () {
					let c = new class_mb;
					c.ji = function () {
						b.ab(null);
					}
					;
					c.zg = function (d) {
						class_D.i(b.zg, d);
						b.ab(null);
					}
					;
					c.mi = function (d) {
						d = new class_Z('Error loading stadium', d, ['Ok']);
						d.Wa = function () {
							b.ab(null);
						}
						;
						b.ab(d.f);
					}
					;
					b.ab(c.f);
				};
			}

			Or(a) {
				this.ql != a && (this.ql = a,
					this.f.style.setProperty('--chat-opacity', '' + a));
			}

			Nr(a) {
				this.pl != a && (this.pl = a,
					this.f.classList.toggle('chat-bg-full', a));
			}

			Wr(a) {
				this.sl != a && (this.sl = a,
					this.ib.f.classList.toggle('restricted', a));
			}

			A(a) {
				null == a.U.M && this.ue(true);
				this.nd && this.Xa.A(a.U, a.U.qa(a.xc));
				class_H.i(this.Ul);
				this.ii.disabled = null == a.U.M;
				let b = class_m.j.Sd.v()
					,
					c = this.ib.gb;
				c.re = class_m.j.Ei.v();
				this.Or(class_m.j.Ah.v());
				this.Nr('full' == class_m.j.gk.v());
				this.Wr(0 == b);
				let d = this.Ka.f.getBoundingClientRect().height;
				0 == b ? (c.Fg = 1,
					c.Md = 0,
					c.Sg = 0,
					this.ib.gb.vh = 0,
					this.ib.f.style.paddingBottom = d + 'px') : (c.Sg = 35,
					// Modified zoom
					c.Md = 0,
					c.Fg = 1 + .25 * (b - 1),
					this.ib.gb.vh = d * window.devicePixelRatio,
					this.ib.f.style.paddingBottom = '0');
				a = a.eg();
				this.ib.A(a);
				class_m.Pa.pk.rt(a);
			}

			ue(a) {
				this.nd != a && (this.nd = a,
					this.f.classList.toggle('showing-room-view', this.nd),
					this.nd ? this.ps.appendChild(this.Xa.f) : this.Xa.f.remove());
			}

			Xk() {
				return null != class_ua.Mq;
			}

			ab(a, b) {
				class_x.Nf(this.vf);
				class_ua.Mq = a;
				null != a ? (this.vf.style.display = 'flex',
					this.vf.appendChild(a),
					this.Ul = b) : (this.vf.style.display = 'none',
					this.Ul = null);
			}
		}

		class class_yc {
			constructor(a) {
				this.yc_field_new11nc = new class_new11_nc(15);
				this.yc_field_number2 = 0;
				this.Mj = new Map;
				this.fp = new class_tb(100, 16);
				this.Ig = false;
				this.Ab = 0;
				this.sa = a;
				a = class_A.ka(8);
				a.u(Math.random());
				this.Se = a.Wb();
			}

			Vb(a, b) {
				null == b && (b = 0);
				this.sa.Vb(b, a);
			}
		}

		class class_ma {
			constructor() {
				this.vb = '';
				this.Ic = this.Lc = 0;
			}

			Ae() {
				return JSON.stringify({
					lat: this.Ic,
					lon: this.Lc,
					code: this.vb
				});
			}

			static Lh(a) {
				return class_ma.dg(JSON.parse(a));
			}

			static dg(a) {
				let b = new class_ma;
				b.Ic = a.lat;
				b.Lc = a.lon;
				b.vb = a.code.toLowerCase();
				return b;
			}

			static cp() {
				return class_aa.Lk(class_m.Pe + 'api/geo').then(function (a) {
					return class_ma.dg(a);
				});
			}
		}

		class class_cc {
			static lh(a) {
				return new Promise(function (b, c) {
						a.onsuccess = function () {
							b(a.result);
						}
						;
						a.onerror = c;
					}
				);
			}
		}

		class class_U {
			constructor(a) {
				this.gd = window.performance.now();
				this.Qg = new Map;
				this.md = new Map;
				this.re = 1;
				this.vh = 100;
				this.Sg = 35;
				this.Md = 0;
				this.Fg = 1.5;
				this.Ya = new class_P_Point(0, 0);
				this.Vk = false;
				this.Cd = new class_tc;
				this.yp = a;
				this.na = window.document.createElement('canvas');
				this.na.mozOpaque = true;
				this.c = this.na.getContext('2d', {
					alpha: false,
					desynchronized: a
				});
				this.jp = this.c.createPattern(class_m.ip, null);
				this.vo = this.c.createPattern(class_m.uo, null);
				this.to = this.c.createPattern(class_m.so, null);
			}

			np(a, b) {
				a = this.md.get(a.Y);
				if (null != a)
					switch (b) {
						case 0:
							a.jg = true;
							break;
						case 1:
							a.jg = false;
					}
			}

			ws() {
				if (null != this.na.parentElement) {
					var a = window.devicePixelRatio * this.re;
					let b = this.na.getBoundingClientRect()
						,
						c = Math.round(b.width * a);
					a = Math.round(b.height * a);
					if (this.na.width != c || this.na.height != a)
						this.na.width = c,
							this.na.height = a;
				}
			}

			Qc(a, b) {
				var c = window.performance.now();
				let d = (c - this.gd) / 1E3;
				this.gd = c;
				this.Qg.clear();
				this.ws();
				class_U.Pi(this.c, true);
				this.c.resetTransform();
				if (null != a.M) {
					c = a.M;
					var e = c.va
						,
						f = a.qa(b)
						,
						g = null != f ? f.J : null
						,
						h = 0 != this.Md ? this.na.height / this.Md : this.Fg * window.devicePixelRatio * this.re;
					b = this.Sg * this.re;
					var k = this.vh * this.re
						,
						l = c.T.kf
						,
						n = this.na.width / h;
					0 < l && n > l && (n = l,
						h = this.na.width / l);
					l = (this.na.height - b - k) / h;
					this.ts(c, g, n, l, d);
					for (var r = 0, t = a.K; r < t.length;) {
						let z = t[r];
						++r;
						if (null == z.J)
							continue;
						let J = this.md.get(z.Y);
						null == J && (J = new class_Cb,
							this.md.set(z.Y, J));
						J.A(z, a);
						this.Qg.set(z.J, J);
					}
					this.c.translate(this.na.width / 2, (this.na.height + b - k) / 2);
					this.c.scale(h, h);
					this.c.translate(-this.Ya.x, -this.Ya.y);
					this.c.lineWidth = 3;
					this.ur(c.T);
					this.tr(c.T);
					h = e.H;
					r = 0;
					for (t = e.qb; r < t.length;)
						this.nr(t[r++], h);
					this.mr(a, n, l);
					this.pr(a, f);
					null != g && this.rr(g.a);
					this.c.lineWidth = 2;
					f = 0;
					// Modified canvas begin
					const lineProp = window.parent.g.line;
					if (lineProp.enabled) {
						this.c.lineWidth = lineProp.width;
						this.c.strokeStyle = lineProp.strokeStyle;
						this.c.beginPath();
						this.c.moveTo(lineProp.startPos.x, lineProp.startPos.y);
						this.c.lineTo(lineProp.endPos.x, lineProp.endPos.y);
						this.c.stroke();
						this.c.lineWidth = 2;
					}
					// Modified canvas end
					for (g = a.K; f < g.length;)
						l = g[f],
							++f,
							n = l.J,
						null != n && (l = this.md.get(l.Y),
							this.hm(n, l));
					f = 0;
					for (e = e.H; f < e.length;)
						if (g = e[f],
							++f,
						null == this.Qg.get(g)) {
							if (0 > g.V)
								break;
							this.hm(g, null);
						}
					this.c.lineWidth = 3;
					this.c.resetTransform();
					this.c.translate(this.na.width / 2, b + (this.na.height - b - k) / 2);
					this.qr(c);
					0 >= c.Ra && (this.Cd.A(d),
						this.Cd.Qc(this.c));
					this.Qg.clear();
					this.lr(a);
				}
			}

			lr(a) {
				let b = new Set;
				var c = 0;
				for (a = a.K; c < a.length;)
					b.add(a[c++].Y);
				c = this.md.keys();
				for (a = c.next(); !a.done;) {
					let d = a.value;
					a = c.next();
					b.has(d) || this.md.delete(d);
				}
			}

			ts(a, b, c, d, e) {
				if (null != b && 1 == a.T.Re) {
					var f = b.a;
					var g = f.x;
					f = f.y;
					null == f && (f = 0);
					null == g && (g = 0);
				}
				else if (f = a.va.H[0].a,
					g = f.x,
					f = f.y,
				null != b) {
					var h = b.a;
					g = .5 * (g + h.x);
					f = .5 * (f + h.y);
					var k = c;
					b = d;
					null == d && (b = 0);
					null == c && (k = 0);
					var l = .5 * k;
					let n = .5 * b;
					b = h.x - l + 50;
					k = h.y - n + 50;
					l = h.x + l - 50;
					h = h.y + n - 50;
					g = g > l ? l : g < b ? b : g;
					f = f > h ? h : f < k ? k : f;
				}
				e *= 60;
				1 < e && (e = 1);
				b = g;
				b == b ? (b = f,
					b = b == b) : b = false;
				b && (k = b = this.Ya,
					e *= .04,
					h = k.x,
					k = k.y,
					b.x = h + (g - h) * e,
					b.y = k + (f - k) * e);
				this.wo(c, d, a.T);
			}

			wo(a, b, c) {
				a > 2 * c.bc ? this.Ya.x = 0 : this.Ya.x + .5 * a > c.bc ? this.Ya.x = c.bc - .5 * a : this.Ya.x - .5 * a < -c.bc && (this.Ya.x = -c.bc + .5 * a);
				b > 2 * c.sc ? this.Ya.y = 0 : this.Ya.y + .5 * b > c.sc ? this.Ya.y = c.sc - .5 * b : this.Ya.y - .5 * b < -c.sc && (this.Ya.y = -c.sc + .5 * b);
			}

			rr(a) {
				this.c.beginPath();
				this.c.strokeStyle = 'white';
				this.c.globalAlpha = .3;
				this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, false);
				this.c.stroke();
				this.c.globalAlpha = 1;
			}

			qr(a) {
				let b = 0 < a.Ra;
				this.Qr(b);
				b && (120 != a.Ra && (a = a.Ra / 120 * 200,
					this.c.fillStyle = 'white',
					this.c.fillRect(.5 * -a, 100, a, 20)),
					this.Cd.Gq.vr(this.c));
			}

			Qr(a) {
				this.Vk != a && (this.na.style.filter = a ? 'grayscale(70%)' : '',
					this.Vk = a);
			}

			rm(a, b, c, d, e, f) {
				d = b + d;
				e = c + e;
				a.beginPath();
				a.moveTo(d - f, c);
				a.arcTo(d, c, d, c + f, f);
				a.lineTo(d, e - f);
				a.arcTo(d, e, d - f, e, f);
				a.lineTo(b + f, e);
				a.arcTo(b, e, b, e - f, f);
				a.lineTo(b, c + f);
				a.arcTo(b, c, b + f, c, f);
				a.closePath();
			}

			ur(a) {
				class_U.Pi(this.c, false);
				var b = a.be;
				let c = a.ae
					,
					d = this;
				if (1 == a.ud)
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_U.nc(a.td),
						this.c.fillRect(0, 0, this.na.width, this.na.height),
						this.c.restore(),
						this.c.strokeStyle = '#C7E6BD',
						this.c.fillStyle = this.jp,
						this.rm(this.c, -b, -c, 2 * b, 2 * c, a.Fc),
						this.c.save(),
						this.c.scale(2, 2),
						this.c.fill(),
						this.c.restore(),
						this.c.moveTo(0, -c),
						this.c.lineTo(0, c),
						this.c.stroke(),
						this.c.beginPath(),
						this.c.arc(0, 0, a.ad, 0, 2 * Math.PI),
						this.c.stroke();
				else if (2 == a.ud) {
					this.c.strokeStyle = '#E9CC6E';
					this.c.save();
					this.c.beginPath();
					this.c.rect(this.Ya.x - 1E4, this.Ya.y - 1E4, 2E4, 2E4);
					this.c.scale(2, 2);
					this.c.fillStyle = this.to;
					this.c.fill();
					this.c.restore();
					this.c.save();
					this.rm(this.c, -b, -c, 2 * b, 2 * c, a.Fc);
					this.c.scale(2, 2);
					this.c.fillStyle = this.vo;
					this.c.fill();
					this.c.restore();
					this.c.stroke();
					this.c.beginPath();
					this.c.moveTo(0, -c);
					this.c.setLineDash([15, 15]);
					this.c.lineTo(0, c);
					this.c.stroke();
					this.c.setLineDash([]);
					var e = a.Qe;
					b -= e;
					e < a.Fc && (b = 0);
					e = function (f, g, h) {
						d.c.beginPath();
						d.c.strokeStyle = f;
						d.c.arc(0, 0, a.ad, -1.5707963267948966, 1.5707963267948966, h);
						0 != g && (d.c.moveTo(g, -c),
							d.c.lineTo(g, c));
						d.c.stroke();
					}
					;
					e('#85ACF3', b, false);
					e('#E18977', -b, true);
				}
				else
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_U.nc(a.td),
						this.c.fillRect(0, 0, this.na.width, this.na.height),
						this.c.restore();
				class_U.Pi(this.c, true);
			}

			pr(a, b) {
				let c = class_m.j.Sk.v()
					,
					d = 0;
				for (a = a.K; d < a.length;) {
					let f = a[d];
					++d;
					var e = f.J;
					if (null == e)
						continue;
					e = e.a;
					let g = this.md.get(f.Y);
					c && g.jg && this.c.drawImage(class_m.Zm, e.x - .5 * class_m.Zm.width, e.y - 35);
					f != b && g.Qo(this.c, e.x, e.y + 50);
				}
			}

			hm(a, b) {
				0 > a.V || (this.c.beginPath(),
					null == b ? (this.c.fillStyle = class_U.nc(a.S),
						this.c.strokeStyle = 'black') : (this.c.fillStyle = b.Xj,
						this.c.strokeStyle = b.Jo),
					this.c.beginPath(),
					this.c.arc(a.a.x, a.a.y, a.V, 0, 2 * Math.PI, false),
					null != b ? (this.c.save(),
						b = a.V / 32,
						this.c.translate(a.a.x, a.a.y),
						this.c.scale(b, b),
						this.c.translate(-32, -32),
						this.c.fill(),
						this.c.restore()) : -1 != (a.S | 0) && this.c.fill(),
					this.c.stroke());
			}

			tr(a) {
				if (null != a) {
					var b = 0;
					for (a = a.X; b < a.length;)
						this.sr(a[b++]);
				}
			}

			nr(a, b) {
				if (!(0 > a.S)) {
					this.c.beginPath();
					this.c.strokeStyle = class_U.nc(a.S);
					var c = b[a.ge];
					a = b[a.he];
					null != c && null != a && (c = c.a,
						a = a.a,
						this.c.moveTo(c.x, c.y),
						this.c.lineTo(a.x, a.y),
						this.c.stroke());
				}
			}

			sr(a) {
				if (a.bb) {
					this.c.beginPath();
					this.c.strokeStyle = class_U.nc(a.S);
					var b = a.Z.a
						,
						c = a.ea.a;
					if (0 != 0 * a.wb)
						this.c.moveTo(b.x, b.y),
							this.c.lineTo(c.x, c.y);
					else {
						a = a.fe;
						let d = b.x - a.x;
						b = b.y - a.y;
						this.c.arc(a.x, a.y, Math.sqrt(d * d + b * b), Math.atan2(b, d), Math.atan2(c.y - a.y, c.x - a.x));
					}
					this.c.stroke();
				}
			}

			mr(a, b, c) {
				var d = a.M;
				if (null != d)
					for (d = d.va.H[0],
						     this.Gk(d.a, d.S, b, c),
						     d = 0,
						     a = a.K; d < a.length;) {
						let e = a[d];
						++d;
						null != e.J && this.Gk(e.J.a, e.fa.S, b, c);
					}
			}

			Gk(a, b, c, d) {
				c = .5 * c - 25;
				var e = .5 * d - 25;
				null == e && (e = 0);
				null == c && (c = 0);
				d = c;
				c = e;
				var f = this.Ya;
				e = a.x - f.x;
				f = a.y - f.y;
				let g = -d
					,
					h = -c
					,
					k = this.Ya;
				d = k.x + (e > d ? d : e < g ? g : e);
				c = k.y + (f > c ? c : f < h ? h : f);
				e = a.x - d;
				a = a.y - c;
				900 < e * e + a * a && (this.c.fillStyle = 'rgba(0,0,0,0.5)',
					this.Hk(d + 2, c + 2, Math.atan2(a, e)),
					this.c.fillStyle = class_U.nc(b),
					this.Hk(d - 2, c - 2, Math.atan2(a, e)));
			}

			Hk(a, b, c) {
				this.c.save();
				this.c.translate(a, b);
				this.c.rotate(c);
				this.c.beginPath();
				this.c.moveTo(15, 0);
				this.c.lineTo(0, 7);
				this.c.lineTo(0, -7);
				this.c.closePath();
				this.c.fill();
				this.c.restore();
			}

			zr() {
				let a = this.md.values()
					,
					b = a.next();
				for (; !b.done;) {
					let c = b.value;
					b = a.next();
					c.jg = false;
				}
			}

			static nc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			static Pi(a, b) {
				a.imageSmoothingEnabled = b;
				a.mozImageSmoothingEnabled = b;
			}
		}

		class class_pb {
			constructor(a) {
				this.f = class_x.Ia(class_pb.O);
				class_x.Ba(this.f).get('features').textContent = a.join(', ');
			}
		}

		class class_ra {
			constructor() {
				this.ed = new Map;
			}

			Sa(a, b) {
				this.ed.set(a, b);
			}

			v(a) {
				return this.ed.get(a);
			}

			kr(a) {
				this.ed.delete(a);
			}

			bp(a) {
				let b = []
					,
					c = this.ed.keys()
					,
					d = c.next();
				for (; !d.done;) {
					let e = d.value;
					d = c.next();
					this.ed.get(e) == a && b.push(e);
				}
				return b;
			}

			Ae() {
				let a = {}
					,
					b = this.ed.keys()
					,
					c = b.next();
				for (; !c.done;) {
					let d = c.value;
					c = b.next();
					a[d] = this.ed.get(d);
				}
				return JSON.stringify(a);
			}

			static dg(a) {
				let b = new class_ra
					,
					c = class_zc.hn(a)
					,
					d = 0;
				for (; d < c.length;) {
					let e = c[d];
					++d;
					b.ed.set(e, a[e]);
				}
				return b;
			}

			static Lh(a) {
				return class_ra.dg(JSON.parse(a));
			}

			static sk() {
				let a = new class_ra;
				a.Sa('ArrowUp', 'Up');
				a.Sa('KeyW', 'Up');
				a.Sa('ArrowDown', 'Down');
				a.Sa('KeyS', 'Down');
				a.Sa('ArrowLeft', 'Left');
				a.Sa('KeyA', 'Left');
				a.Sa('ArrowRight', 'Right');
				a.Sa('KeyD', 'Right');
				a.Sa('KeyX', 'Kick');
				a.Sa('Space', 'Kick');
				a.Sa('ControlLeft', 'Kick');
				a.Sa('ControlRight', 'Kick');
				a.Sa('ShiftLeft', 'Kick');
				a.Sa('ShiftRight', 'Kick');
				a.Sa('Numpad0', 'Kick');
				return a;
			}
		}

		class class_Cb {
			constructor() {
				this.jg = false;
				this.D = '';
				this.uh = 0;
				this.Wf = '';
				this.mb = new class_va_TeamColors;
				let a = window.document.createElement('canvas');
				a.width = 64;
				a.height = 64;
				this.sb = a.getContext('2d', null);
				this.Xj = this.sb.createPattern(this.sb.canvas, 'no-repeat');
				this.Eo();
			}

			Eo() {
				let a = window.document.createElement('canvas');
				a.width = 160;
				a.height = 34;
				this.Rl = a.getContext('2d', null);
			}

			vs() {
				let a = this.Rl;
				a.resetTransform();
				a.clearRect(0, 0, 160, 34);
				a.font = '26px sans-serif';
				a.fillStyle = 'white';
				160 < a.measureText(this.D).width ? (a.textAlign = 'left',
					a.translate(2, 29)) : (a.textAlign = 'center',
					a.translate(80, 29));
				a.fillText(this.D, 0, 0);
			}

			Qo(a, b, c) {
				a.drawImage(this.Rl.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17);
			}

			A(a, b) {
				if (null != a.J) {
					let c = class_m.j.Sm.v() ? b.mb[a.fa.ba] : a.fa.Rm
						,
						d = null != a.Td ? a.Td : a.Zb
						,
						e = class_m.j.Hm.v() && null != d;
					if (!class_Cb.ko(this.mb, c) || !e && a.Nb != this.uh || e && this.Wf != d)
						class_Cb.Ao(this.mb, c),
							e ? (this.Wf = d,
								this.uh = -1) : (this.Wf = '' + a.Nb,
								this.uh = a.Nb),
							this.ir(this.Wf);
				}
				this.Jo = 0 < b.M.Ra || !a.Yb ? 'black' : a.Yb && 0 >= a.Zc && 0 <= a.Ac ? 'white' : 'black';
				a.D != this.D && (this.D = a.D,
					this.vs());
			}

			ir(a) {
				let b = this.mb.hb;
				if (!(1 > b.length)) {
					this.sb.save();
					this.sb.translate(32, 32);
					this.sb.rotate(3.141592653589793 * this.mb.sd / 128);
					for (var c = -32, d = 64 / b.length, e = 0; e < b.length;)
						this.sb.fillStyle = class_U.nc(b[e++]),
							this.sb.fillRect(c, -32, d + 4, 64),
							c += d;
					this.sb.restore();
					this.sb.fillStyle = class_U.nc(this.mb.od);
					this.sb.textAlign = 'center';
					this.sb.textBaseline = 'alphabetic';
					this.sb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
					this.sb.fillText(a, 32, 44);
					this.Xj = this.sb.createPattern(this.sb.canvas, 'no-repeat');
				}
			}

			static ko(a, b) {
				if (a.sd != b.sd || a.od != b.od)
					return false;
				a = a.hb;
				b = b.hb;
				if (a.length != b.length)
					return false;
				let c = 0
					,
					d = a.length;
				for (; c < d;) {
					let e = c++;
					if (a[e] != b[e])
						return false;
				}
				return true;
			}

			static Ao(a, b) {
				a.sd = b.sd;
				a.od = b.od;
				a.hb = b.hb.slice(0);
			}
		}

		class class_zc {
			static hn(a) {
				let b = [];
				if (null != a) {
					let d = Object.prototype.hasOwnProperty;
					for (var c in a)
						'__id__' != c && 'hx__closures__' != c && d.call(a, c) && b.push(c);
				}
				return b;
			}
		}

		class class_ob {
			static delete(a) {
				return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (b, c) {
						let d = window.indexedDB.open('stadiums', 1);
						d.onblocked = d.onerror = c;
						d.onupgradeneeded = function (e) {
							let f = d.result;
							f.onerror = c;
							1 > e.oldVersion && (f.createObjectStore('files', {
								autoIncrement: true
							}),
								f.createObjectStore('meta', {
									keyPath: 'id'
								}));
						}
						;
						d.onsuccess = function () {
							let e = d.result;
							e.onerror = c;
							let f = e.transaction(['meta', 'files'], 'readwrite');
							f.onerror = f.onabort = function (g) {
								c(g);
								e.close();
							}
							;
							f.oncomplete = function () {
								b(0);
								e.close();
							}
							;
							f.objectStore('files').delete(a);
							f.objectStore('meta').delete(a);
						};
					}
				);
			}

			static get(a) {
				return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (b, c) {
						let d = window.indexedDB.open('stadiums', 1);
						d.onblocked = d.onerror = c;
						d.onupgradeneeded = function (e) {
							let f = d.result;
							f.onerror = c;
							1 > e.oldVersion && (f.createObjectStore('files', {
								autoIncrement: true
							}),
								f.createObjectStore('meta', {
									keyPath: 'id'
								}));
						}
						;
						d.onsuccess = function () {
							let e = d.result;
							e.onerror = c;
							let f = e.transaction(['files']);
							f.onerror = f.onabort = function (g) {
								c(g);
								e.close();
							}
							;
							f.oncomplete = function () {
								e.close();
							}
							;
							class_cc.lh(f.objectStore('files').get(a)).then(function (g) {
								try {
									let h = new class_q_Stadium;
									h.cl(g);
									b(h);
								}
								catch (h) {
									g = class_v.Mb(h).Gb(),
										c(g);
								}
							}, c);
						};
					}
				);
			}

			static getAll() {
				return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (a, b) {
						let c = window.indexedDB.open('stadiums', 1);
						c.onblocked = c.onerror = b;
						c.onupgradeneeded = function (d) {
							let e = c.result;
							e.onerror = b;
							1 > d.oldVersion && (e.createObjectStore('files', {
								autoIncrement: true
							}),
								e.createObjectStore('meta', {
									keyPath: 'id'
								}));
						}
						;
						c.onsuccess = function () {
							let d = c.result;
							d.onerror = b;
							let e = d.transaction(['meta']);
							e.onerror = e.onabort = function (f) {
								b(f);
								d.close();
							}
							;
							e.oncomplete = function () {
								d.close();
							}
							;
							class_cc.lh(e.objectStore('meta').getAll()).then(a, b);
						};
					}
				);
			}

			static lt() {
				let a = globalScope.navigator.storage;
				if (null == a || null == a.persist)
					return Promise.resolve(false);
				try {
					return a.persisted().then(function (b) {
						return b ? true : a.persist();
					}).catch(function () {
						return false;
					});
				}
				catch (b) {
					return Promise.resolve(false);
				}
			}

			static add(a) {
				return null == window.indexedDB ? Promise.reject('IndexedDB not supported by browser.') : new Promise(function (b, c) {
						let d = window.indexedDB.open('stadiums', 1);
						d.onblocked = d.onerror = c;
						d.onupgradeneeded = function (e) {
							let f = d.result;
							f.onerror = c;
							1 > e.oldVersion && (f.createObjectStore('files', {
								autoIncrement: true
							}),
								f.createObjectStore('meta', {
									keyPath: 'id'
								}));
						}
						;
						d.onsuccess = function () {
							let e = d.result;
							e.onerror = c;
							let f = e.transaction(['files', 'meta'], 'readwrite');
							f.onerror = f.onabort = function (g) {
								c(g);
								e.close();
							}
							;
							f.oncomplete = function () {
								b(0);
								e.close();
							}
							;
							try {
								class_cc.lh(f.objectStore('files').add(a.Ae())).then(function (g) {
									g = {
										name: a.D,
										id: g
									};
									return class_cc.lh(f.objectStore('meta').add(g));
								}).catch(c);
							}
							catch (g) {
								c(0);
							}
						};
					}
				);
			}
		}

		class class_jc {
			constructor() {
				this.Ga = 0;
				this.Ak = this.Bk = false;
				this.Ve = 0;
				this.f = window.document.createElement('div');
				this.f.className = 'game-timer-view';
				this.f.appendChild(this.Eq = this.ee('OVERTIME!', 'overtime'));
				this.f.appendChild(this.Zp = this.ee('0', 'digit'));
				this.f.appendChild(this.Yp = this.ee('0', 'digit'));
				this.f.appendChild(this.ee(':', null));
				this.f.appendChild(this.Gr = this.ee('0', 'digit'));
				this.f.appendChild(this.Fr = this.ee('0', 'digit'));
			}

			ee(a, b) {
				let c = window.document.createElement('span');
				c.textContent = a;
				c.className = b;
				return c;
			}

			Xr(a) {
				if (a != this.Ve) {
					let b = a % 60
						,
						c = a / 60 | 0;
					this.Fr.textContent = '' + b % 10;
					this.Gr.textContent = '' + (b / 10 | 0) % 10;
					this.Yp.textContent = '' + c % 10;
					this.Zp.textContent = '' + (c / 10 | 0) % 10;
					this.Ve = a;
				}
				this.fm();
				this.gm();
			}

			Yr(a) {
				this.Ga = a;
				this.fm();
				this.gm();
			}

			fm() {
				this.Tr(0 != this.Ga && this.Ve > this.Ga);
			}

			gm() {
				this.Zr(this.Ve < this.Ga && this.Ve > this.Ga - 30);
			}

			Tr(a) {
				a != this.Ak && (this.Eq.className = a ? 'overtime on' : 'overtime',
					this.Ak = a);
			}

			Zr(a) {
				a != this.Bk && (this.f.className = a ? 'game-timer-view time-warn' : 'game-timer-view',
					this.Bk = a);
			}
		}

		class class_Sa {
			constructor(a) {
				function b(g, h) {
					function k() {
						l.className = n.He ? 'icon-ok' : 'icon-cancel';
					}

					g = c.get(g);
					let l = g.querySelector('i')
						,
						n = {
							He: h
						};
					k();
					g.onclick = function () {
						n.He = !n.He;
						k();
						e.yn(e.pj);
					}
					;
					return n;
				}

				this.pj = [];
				this.Qs = a;
				this.La = class_x.Ia(class_Sa.Dj);
				let c = class_x.Ba(this.La)
					,
					d = new class_vb(c);
				this.zj = c.get('refresh');
				this.pn = c.get('join');
				a = c.get('create');
				this.Ls = c.get('count');
				let e = this;
				a.onclick = function () {
					class_H.i(e.dt);
				}
				;
				c.get('changenick').onclick = function () {
					class_H.i(e.ct);
				}
				;
				c.get('settings').onclick = function () {
					class_H.i(e.ft);
				}
				;
				let f = c.get('replayfile');
				f.onchange = function () {
					var g = f.files;
					if (!(1 > g.length)) {
						g = g.item(0);
						var h = new FileReader;
						h.onload = function () {
							class_D.i(e.et, h.result);
						}
						;
						h.readAsArrayBuffer(g);
					}
				}
				;
				this.Ps = b('fil-full', true);
				this.gt = b('fil-pass', false); // Hide locked rooms
				this.Os = b('fil-empty', true);
				this.Ws = c.get('listscroll');
				this.it = class_nb.ei(this.Ws);
				this.sj = c.get('list');
				this.zj.onclick = function () {
					d.em();
					e.kn();
				}
				;
				this.pn.onclick = function () {
					null != e.Xd && class_D.i(e.un, e.Xd.mt);
				}
				;
				this.kn();
			}

			kn() {
				function a() {
					d.zj.disabled = false;
					d.yn(b);
					return null;
				}

				this.Bn(null);
				this.zj.disabled = true;
				class_x.Nf(this.sj);
				let b = [];
				this.pj = [];
				let c = class_Ub.get().then(function (e) {
						return b = e;
					}, function () {
						return null;
					})
					,
					d = this;
				class_Sa.ht(c).then(a, a);
			}

			yn(a) {
				this.pj = a;
				class_Ub.ot(this.Qs, a);
				a.sort(function (k, l) {
					return k.We - l.We;
				});
				class_x.Nf(this.sj);
				let b = 0
					,
					c = 0
					,
					d = !this.Ps.He
					,
					e = !this.gt.He
					,
					f = !this.Os.He
					,
					g = this
					,
					h = 0;
				for (; h < a.length;) {
					let k = a[h];
					++h;
					let l = k.Ed;
					if (d && l.K >= l.jf)
						continue;
					if (e && l.Kb)
						continue;
					if (f && 0 == l.K)
						continue;
					let n = new class_Eb(k);
					n.La.ondblclick = function () {
						class_D.i(g.un, k);
					}
					;
					n.La.onclick = function () {
						g.Bn(n);
					}
					;
					this.sj.appendChild(n.La);
					b += l.K;
					++c;
				}
				this.Ls.textContent = '' + b + ' players in ' + c + ' rooms';
				this.it.update();
			}

			Bn(a) {
				null != this.Xd && this.Xd.La.classList.remove('selected');
				this.Xd = a;
				null != this.Xd && this.Xd.La.classList.add('selected');
				this.pn.disabled = null == this.Xd;
			}

			static ht(a) {
				let b = new Promise(function (c, d) {
						window.setTimeout(function () {
							d(null);
						}, 5E3);
					}
				);
				return Promise.race([b, a]);
			}
		}

		class class_nb {
			static ei(a) {
				return new PerfectScrollbar(a, {
					handlers: class_nb.sp
				});
			}
		}

		class class_O {
			static nj(a, b) {
				a = a.charCodeAt(b);
				if (a == a)
					return a;
			}

			static substr(a, b, c) {
				if (null == c)
					c = a.length;
				else if (0 > c)
					if (0 == b)
						c = a.length + c;
					else
						return '';
				return a.substr(b, c);
			}

			static remove(a, b) {
				b = a.indexOf(b);
				if (-1 == b)
					return false;
				a.splice(b, 1);
				return true;
			}

			static now() {
				return Date.now();
			}
		}

		class class_kb {
			constructor() {
				this.f = class_x.Ia(class_kb.O);
				let a = class_x.Ba(this.f);
				this.Eb = a.get('input');
				this.nf = a.get('ok');
				let b = this;
				a.get('cancel').onclick = function () {
					null != b.Wa && b.Wa(null);
				}
				;
				this.Eb.maxLength = 30;
				this.Eb.oninput = function () {
					b.A();
				}
				;
				this.Eb.onkeydown = function (c) {
					13 == c.keyCode && b.Hc() && null != b.Wa && b.Wa(b.Eb.value);
				}
				;
				this.nf.onclick = function () {
					b.Hc() && null != b.Wa && b.Wa(b.Eb.value);
				}
				;
				this.A();
			}

			Hc() {
				let a = this.Eb.value;
				return 30 >= a.length ? 0 < a.length : false;
			}

			A() {
				this.nf.disabled = !this.Hc();
			}
		}

		class class_jb {
			constructor(a) {
				this.f = class_x.Ia(class_jb.O);
				var b = class_x.Ba(this.f);
				this.xh = b.get('cancel');
				this.nk = b.get('create');
				this.mf = b.get('name');
				this.Gl = b.get('pass');
				this.hi = b.get('max-pl');
				this.$m = b.get('unlisted');
				this.mf.maxLength = 40;
				this.mf.value = a;
				let c = this;
				this.mf.oninput = function () {
					c.A();
				}
				;
				this.Gl.maxLength = 30;
				this.$m.onclick = function () {
					c.Uj(!c.an);
				}
				;
				this.xh.onclick = function () {
					class_H.i(c.ji);
				}
				;
				this.nk.onclick = function () {
					if (c.Hc()) {
						let d = c.Gl.value;
						'' == d && (d = null);
						class_D.i(c.kq, {
							name: c.mf.value,
							password: d,
							Zs: c.hi.selectedIndex + 1, // Max players in rooms from 1-30
							qt: c.an
						});
					}
				}
				;
				// Max players in rooms from 1-30
				for (a = 1; 31 > a;)
					b = window.document.createElement('option'),
						b.textContent = '' + a++,
						this.hi.appendChild(b);
				this.hi.selectedIndex = 11;
				this.Uj(false);
				this.A();
			}

			Uj(a) {
				this.an = a;
				this.$m.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes');
			}

			Hc() {
				let a = this.mf.value;
				return 40 >= a.length ? 0 < a.length : false;
			}

			A() {
				this.nk.disabled = !this.Hc();
			}
		}

		class class_Jc {
			static rj() {
				class_p.Ja(class_Hb);
				class_p.Ja(class_La);
				class_p.Ja(class_db);
				class_p.Ja(class_Aa);
				class_p.Ja(class_Za);
				class_p.Ja(class_Da);
				class_p.Ja(class_la);
				class_p.Ja(class_Wa);
				class_p.Ja(class_Xa);
				class_p.Ja(class_$a);
				class_p.Ja(class_va);
				class_p.Ja(class_Ia);
				class_p.Ja(class_fa);
				class_p.Ja(class_Ja);
				class_p.Ja(class_Ka);
				class_p.Ja(class_Ya);
				class_p.Ja(class_Ha);
				class_p.Ja(class_Ca);
				class_p.Ja(class_Qa);
				class_p.Ja(class_cb);
				class_p.Ja(class_Ib);
				class_p.Ja(class_Pa);
				class_p.Ja(class_Jb);
				class_p.Ja(class_Kb);
			}
		}

		class class_xa {
			constructor(a, b, c, d) {
				this.D = a;
				this.Bs = d;
				this.di = b;
				d = null;
				null != b && (d = b.getItem(a));
				this.dn = c(d);
			}

			v() {
				return this.dn;
			}

			ha(a) {
				this.dn = a;
				if (null != this.di)
					try {
						let b = this.Bs(a);
						null == b ? this.di.removeItem(this.D) : this.di.setItem(this.D, b);
					}
					catch (b) {
					}
			}
		}

		class class_hc {
			constructor(a) {
				this.gd = window.performance.now();
				this.W = new class_Nb; /// Last change
				this.Bd = this.Oe = 0;
				this.za = a;
				this.l = new class_ua(a.xc);
				let b = new class_Vb(this.l);
				b.zi(a.U);
				window.document.addEventListener('keydown', function_M(this, this.Fa));
				window.document.addEventListener('keyup', function_M(this, this.kd));
				let c = this;
				/// Last change
				this.W.ul = function (d) {
					'ToggleChat' == d && c.l.Ka.Wm();
				}
				;
				window.requestAnimationFrame(function_M(this, this.pf));
				this.Kh = window.setInterval(function () {
					c.l.Gf.Dm(c.Bd);
					c.Bd = 0;
				}, 1E3);
				this.Gm(class_m.j.Sd.v());
				this.l.f.classList.add('replayer');
				this.qe = new class_Fa(a);
				this.qe.xq = function () {
					b.ss(a.U);
				}
				;
				this.qe.wq = function () {
					c.l.ue(null == a.U.M);
					b.zi(a.U);
				}
				;
				this.qe.Al = function () {
					c.l.ib.gb.zr();
				}
				;
				this.l.f.appendChild(this.qe.f);
				/// Last change
				this.ej = window.setInterval(function () {
					a.A();
				}, 50);
			}

			la() {
				window.document.removeEventListener('keydown', function_M(this, this.Fa));
				window.document.removeEventListener('keyup', function_M(this, this.kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Oe);
				window.clearInterval(this.Kh);
				/// Last change
				window.clearInterval(this.ej);
				this.W.la();
			}

			pf() {
				this.Oe = window.requestAnimationFrame(function_M(this, this.pf));
				this.za.A();
				this.Qc();
			}

			Qc() {
				this.qe.A();
				let a = window.performance.now();
				1 == class_m.j.Jh.v() && 28.333333333333336 > a - this.gd || (this.gd = a,
					this.Bd++,
					this.Gm(class_m.j.Sd.v()),
				0 < this.za.Pd || this.l.A(this.za));
			}

			Fa(a) {
				/// Last changes
				var b = class_m.j.Sd;
				let c = null != class_m.j.Kd.v().v(a.code);
				switch (a.keyCode) {
					case 27:
						this.l.Xk() ? this.l.ab(null) : (b = this.l,
							b.ue(!b.nd));
						a.preventDefault();
						break;
					case 48: // Modified zoom
						c ? this.W.Fa(a) : b.ha(0.1);
						break;
					case 49:
						c ? this.W.Fa(a) : b.ha(1);
						break;
					case 50:
						c ? this.W.Fa(a) : b.ha(2);
						break;
					case 51:
						c ? this.W.Fa(a) : b.ha(3);
						break;
					case 52:
						c ? this.W.Fa(a) : b.ha(4);
						break;
					case 53:
						c ? this.W.Fa(a) : b.ha(5);
						break;
					case 54:
						c ? this.W.Fa(a) : b.ha(6);
						break;
					case 55:
						c ? this.W.Fa(a) : b.ha(7);
						break;
					case 56: // Modified zoom keys
						c ? this.W.Fa(a) : b.ha(15);
						break;
					case 57:
						c ? this.W.Fa(a) : b.ha(-1.5);
						break;
				}
			}

			/// Last change
			kd(a) {
				this.W.kd(a);
			}

			Gm() {
				let a = class_m.j.Sd.v()
					,
					b = this.l.ib.gb;
				b.re = class_m.j.Ei.v();
				b.Sg = 35;
				// Modified zoom
				b.Md = 0;
				b.Fg = 1 + .25 * (a - 1);
			}
		}

		class class_rb {
			constructor(a) {
				this.f = class_x.Ia(class_rb.O);
				let b = class_x.Ba(this.f);
				this.lf = b.get('title');
				this.wi = b.get('reason');
				this.Un = b.get('ban-btn');
				this.Wn = b.get('ban-text');
				this.bf = b.get('kick');
				this.wd = b.get('close');
				let c = this;
				this.Un.onclick = function () {
					c.Pj(!c.Yj);
				}
				;
				this.wd.onclick = function () {
					class_H.i(c.rb);
				}
				;
				this.bf.onclick = function () {
					class_kc.i(c.li, c.Rb, c.wi.value, c.Yj);
				}
				;
				this.wi.onkeydown = function (d) {
					return d.stopPropagation();
				}
				;
				this.wi.maxLength = 100;
				this.Rb = a.Y;
				this.lf.textContent = 'Kick ' + a.D;
				this.Pj(false);
			}

			Pj(a) {
				this.Yj = a;
				this.Wn.textContent = a ? 'Yes' : 'No';
			}
		}

		class class_Z {
			constructor(a, b, c) {
				this.f = class_x.Ia(class_Z.O);
				var d = class_x.Ba(this.f);
				d.get('ok');
				d.get('cancel');
				this.de = d.get('content');
				let e = d.get('title');
				d = d.get('buttons');
				let f = 0
					,
					g = this
					,
					h = 0;
				for (; h < c.length;) {
					let k = c[h++]
						,
						l = f++
						,
						n = window.document.createElement('button');
					n.textContent = k;
					n.onclick = function () {
						class_D.i(g.Wa, l);
					}
					;
					d.appendChild(n);
				}
				this.de.textContent = b;
				e.textContent = a;
			}
		}

		class class_bb {
			constructor() {
				this.$e = this.Xh = false;
				this.f = class_x.Ia(class_bb.O);
				let a = class_x.Ba(this.f);
				this.Kc = a.get('log');
				this.bi = a.get('log-contents');
				this.$a = a.get('input');
				this.$a.maxLength = 140;
				let b = this;
				a.get('drag').onmousedown = function (c) {
					function d(h) {
						h.preventDefault();
						class_m.j.hk.ha(function_gc(function_gc(e + (f - h.y))));
						b.$a.blur();
						b.$e = false;
						b.xf();
					}

					b.f.classList.add('dragging');
					let e = b.lk()
						,
						f = c.y;
					c.preventDefault();
					let g = null;
					g = function (h) {
						b.f.classList.remove('dragging');
						d(h);
						window.document.removeEventListener('mousemove', d, false);
						window.document.removeEventListener('mouseup', g, false);
					}
					;
					window.document.addEventListener('mousemove', d, false);
					window.document.addEventListener('mouseup', g, false);
				}
				;
				this.Ec = new class_Tb(a.get('autocompletebox'), function (c, d) {
						b.$a.value = c;
						b.$a.setSelectionRange(d, d);
					}
				);
				this.$a.onkeydown = function (c) {
					switch (c.keyCode) {
						case 9:
							c.preventDefault();
							b.Ec.Qb.hidden ? b.$a.blur() : b.Ec.Oo();
							break;
						case 13:
							null != b.Bl && '' != b.$a.value && b.Bl(b.$a.value);
							b.$a.value = '';
							b.$a.blur();
							break;
						case 27:
							b.Ec.Qb.hidden ? (b.$a.value = '',
								b.$a.blur()) : b.Ec.Th();
							break;
						case 38:
							b.Ec.ek(-1);
							break;
						case 40:
							b.Ec.ek(1);
					}
					c.stopPropagation();
				}
				;
				this.$a.onfocus = function () {
					null != b.tg && b.tg(true);
					b.Xh = true;
					b.xf();
				}
				;
				this.$a.onblur = function () {
					null != b.tg && b.tg(false);
					b.Xh = false;
					b.Ec.Th();
					b.xf();
				}
				;
				this.$a.oninput = function () {
					b.Ec.fo(b.$a.value, b.$a.selectionStart);
				}
				;
				this.xf();
			}

			Wm() {
				this.$e = !this.$e;
				this.xf();
				if (!this.$e) {
					let a = this.Kc;
					window.setTimeout(function () {
						a.scrollTop = a.scrollHeight;
					}, 200);
				}
			}

			xf() {
				let a = '' + this.lk();
				this.f.style.height = a + 'px';
			}

			lk() {
				let a = function_gc(class_m.j.hk.v());
				if (this.Xh) {
					let b = function_gc(class_m.j.zh.v());
					a <= b && (a = b);
				}
				else
					this.$e && (a = 0);
				return a;
			}

			Qp(a, b, c) {
				let d = window.document.createElement('p');
				d.className = 'announcement';
				d.textContent = a;
				0 <= b && (d.style.color = class_U.nc(b));
				switch (c) {
					case 1:
					case 4:
						d.style.fontWeight = 'bold';
						break;
					case 2:
					case 5:
						d.style.fontStyle = 'italic';
				}
				switch (c) {
					case 3:
					case 4:
					case 5:
						d.style.fontSize = '12px';
				}
				this.fl(d);
			}

			fl(a) {
				var b = this.Kc.clientHeight;
				b = this.Kc.scrollTop + b - this.Kc.scrollHeight >= .5 * -b || !class_bb.xp(this.Kc);
				this.bi.appendChild(a);
				b && (this.Kc.scrollTop = this.Kc.scrollHeight);
				for (a = b ? 50 : 100; this.bi.childElementCount > a;)
					this.bi.firstElementChild.remove();
			}

			da(a, b) {
				let c = window.document.createElement('p');
				null != b && (c.className = b);
				c.textContent = a;
				this.fl(c);
			}

			Ib(a) {
				this.da(a, 'notice');
			}

			static xp(a) {
				return a.parentElement.querySelector(':hover') == a;
			}
		}

		class class_Hc {
			static uf(a) {
				a = a.split(' ');
				let b = a[4];
				if ('typ' != a[6])
					throw class_v.C(null);
				return {
					qs: a[7],
					wp: b
				};
			}
		}

		class class_Tb {
			constructor(a, b) {
				this.Wj = [];
				this.jr = /[#@][^\s@#]*$/;
				this.Qb = a;
				this.tq = b;
				a.hidden = true;
			}

			Th() {
				this.dj(null);
			}

			fo(a, b) {
				b = this.jr.exec(class_O.substr(a, 0, b));
				if (null != b) {
					var c = b[0]
						,
						d = class_O.substr(c, 1, null).split('')
						,
						e = class_Tb.To
						,
						f = Array(d.length);
					let g = 0
						,
						h = d.length;
					for (; g < h;) {
						let l = g++;
						f[l] = e(d[l]);
					}
					let k = new RegExp(f.join('.*?'), 'i');
					this.Wk = '#' == c.charAt(0);
					this.Ai = b.index;
					this.xr = c.length;
					this.im = a;
					a = function (l) {
						l = k.exec(l.D);
						return null == l ? -1 : l.index + l[0].length;
					}
					;
					b = [];
					c = 0;
					for (d = this.Wj; c < d.length;)
						e = d[c],
							++c,
							f = a(e),
						0 <= f && b.push({
							An: f,
							item: e
						});
					b.sort(function (l, n) {
						return l.An - n.An;
					});
					this.dj(b);
				}
				else
					this.dj(null);
			}

			Ek(a) {
				a = this.Wk ? '#' + a.ba : '@' + class_ba.replace(a.D, ' ', '_');
				this.tq(class_O.substr(this.im, 0, this.Ai) + a + ' ' + class_O.substr(this.im, this.Ai + this.xr, null), this.Ai + a.length + 1);
			}

			dj(a) {
				var b = null != a && 0 != a.length;
				this.Qb.hidden || class_x.Nf(this.Qb);
				this.cd = null;
				this.Qb.hidden = !b;
				if (b) {
					var c = this;
					b = [];
					for (var d = 0; d < a.length;) {
						var e = a[d++];
						let f = window.document.createElement('div')
							,
							g = e.item;
						e = g.D;
						this.Wk && (e = '(' + g.ba + ') ' + e);
						f.textContent = e;
						this.Qb.appendChild(f);
						f.onclick = function () {
							c.Ek(g);
						}
						;
						b.push({
							item: g,
							La: f
						});
					}
					this.cd = b;
					this.cd[0].La.classList.toggle('selected', true);
					this.zc = 0;
				}
			}

			ek(a) {
				if (null != this.cd) {
					var b = this.zc;
					this.zc += a;
					a = this.cd.length - 1;
					0 > this.zc ? this.zc = a : this.zc > a && (this.zc = 0);
					a = this.cd[this.zc];
					b != this.zc && (a.La.classList.toggle('selected', true),
						this.cd[b].La.classList.toggle('selected', false));
					a = a.La;
					b = a.offsetTop;
					a = b + a.offsetHeight;
					var c = this.Qb.scrollTop + this.Qb.clientHeight;
					b < this.Qb.scrollTop ? this.Qb.scrollTop = b : a > c && (this.Qb.scrollTop = a - this.Qb.clientHeight);
				}
			}

			Oo() {
				null != this.cd && (this.Ek(this.cd[this.zc].item),
					this.Th());
			}

			static To(a) {
				return -1 != '.$^{[(|)*+?\\'.indexOf(a) ? '\\' + a : a;
			}
		}

		class class_Fa {
			constructor(a) {
				function b() {
					let t = g[f];
					a.Ll = e ? t : 0;
					c.get('spd').textContent = t + 'x';
				}

				this.ig = false;
				this.f = class_x.Ia(class_Fa.O);
				let c = class_x.Ba(this.f);
				this.Bi = a;
				let d = this;
				c.get('reset').onclick = function () {
					a.Ci();
					d.Al();
				}
				;
				let e = true
					,
					f = 2
					,
					g = [.5, .75, 1, 2, 3];
				b();
				let h = c.get('playicon');
				h.classList.add('icon-pause');
				c.get('play').onclick = function () {
					e = !e;
					let t = h.classList;
					t.toggle('icon-play', !e);
					t.toggle('icon-pause', e);
					b();
				}
				;
				c.get('spdup').onclick = function () {
					f += 1;
					let t = g.length - 1;
					f > t && (f = t);
					b();
				}
				;
				c.get('spddn').onclick = function () {
					--f;
					0 > f && (f = 0);
					b();
				}
				;
				this.ks = c.get('time');
				let k = c.get('timebar');
				this.br = c.get('progbar');
				let l = c.get('timetooltip')
					,
					n = 0
					,
					r = a.ml;
				for (; n < r.length;) {
					let t = r[n];
					++n;
					let z = window.document.createElement('div');
					z.className = 'marker';
					z.classList.add('k' + t.kind);
					z.style.left = 100 * t.xj + '%';
					k.appendChild(z);
				}
				k.onclick = function (t) {
					a.Hr((t.pageX - k.offsetLeft) / k.clientWidth * a.oh * a.yf);
					d.ig || (d.ig = true,
						d.xq(),
						d.Al());
				}
				;
				k.onmousemove = function (t) {
					t = (t.pageX - k.offsetLeft) / k.clientWidth;
					l.textContent = class_Fa.nl(a.yf * a.oh * t);
					return l.style.left = 'calc(' + 100 * t + '% - 30px)';
				}
				;
				this.Gp = c.get('leave');
				this.Gp.onclick = function () {
					class_H.i(d.le);
				};
			}

			A() {
				this.ks.textContent = class_Fa.nl(this.Bi.Ub);
				this.br.style.width = 100 * this.Bi.ep() + '%';
				!this.ig || 0 < this.Bi.Pd || (this.ig = false,
					this.wq());
			}

			static nl(a) {
				a = a / 1E3 | 0;
				return (a / 60 | 0) + ':' + class_ba.Lf(class_Q.Fe(a % 60));
			}
		}

		class class_Cc {
			constructor(a) {
				this.current = 0;
				this.Fs = a;
			}

			next() {
				return this.Fs[this.current++];
			}
		}

		class class_Wb {
			constructor(a, b) {
				this.La = a;
				this.value = b;
				a.textContent = '' + b;
			}

			set(a) {
				this.value != a && (this.value = a,
					this.La.textContent = '' + this.value);
			}
		}

		class class_Xb {
			constructor(a, b) {
				this.za = a;
				this.da = b;
			}

			uf(a) {
				if ('/' != a.charAt(0))
					return false;
				if (1 == a.length)
					return true;
				a = class_ba.nt(class_O.substr(a, 1, null)).split(' ');
				let b = a[0]
					,
					c = this;
				switch (b) {
					case 'avatar':
						2 == a.length && (this.Bm(a[1]),
							this.da('Avatar set'));
						break;
					case 'checksum':
						var d = this.za.U.T;
						a = d.D;
						d.af() ? this.da('Current stadium is original: "' + a + '"') : (d = class_ba.bh(d.ik(), 8),
							this.da('Stadium: "' + a + '" (checksum: ' + d + ')'));
						break;
					case 'clear_avatar':
						this.Bm(null);
						this.da('Avatar cleared');
						break;
					case 'clear_bans':
						null == this.ce ? this.da('Only the host can clear bans') : (this.ce(),
							this.da('All bans have been cleared'));
						break;
					case 'clear_password':
						null == this.Ng ? this.da('Only the host can change the password') : (this.Ng(null),
							this.da('Password cleared'));
						break;
					case 'colors':
						try {
							d = class_Xb.Fq(a),
								this.za.ua(d);
						}
						catch (g) {
							a = class_v.Mb(g).Gb(),
							'string' == typeof a && this.da(a);
						}
						break;
					case 'extrapolation':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && -200 <= a && 1E3 >= a ? (class_m.j.Ad.ha(a),
								this.za.Cm(a),
								this.da('Extrapolation set to ' + a + ' msec')) : this.da('Extrapolation must be a value between -200 and 1000 milliseconds')) : this.da('Extrapolation requires a value in milliseconds.');
						break;
					case 'handicap':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && 0 <= a && 300 >= a ? (this.za.Pr(a),
								this.da('Ping handicap set to ' + a + ' msec')) : this.da('Ping handicap must be a value between 0 and 300 milliseconds')) : this.da('Ping handicap requires a value in milliseconds.');
						break;
					case 'kick_ratelimit':
						if (4 > a.length)
							this.da('Usage: /kick_ratelimit <min> <rate> <burst>');
						else {
							d = class_Q.parseInt(a[1]);
							var e = class_Q.parseInt(a[2]);
							a = class_Q.parseInt(a[3]);
							null == d || null == e || null == a ? this.da('Invalid arguments') : this.za.ua(class_Pa.pa(d, e, a));
						}
						break;
					case 'recaptcha':
						if (null == this.Em)
							this.da('Only the host can set recaptcha mode');
						else
							try {
								if (2 == a.length) {
									switch (a[1]) {
										case 'off':
											e = false;
											break;
										case 'on':
											e = true;
											break;
										default:
											throw class_v.C(null);
									}
									this.Em(e);
									this.da('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
								}
								else
									throw class_v.C(null);
							}
							catch (g) {
								this.da('Usage: /recaptcha <on|off>');
							}
						break;
					case 'set_password':
						2 == a.length && (null == this.Ng ? this.da('Only the host can change the password') : (this.Ng(a[1]),
							this.da('Password set')));
						break;
					case 'store':
						let f = this.za.U.T;
						f.af() ? this.da('Can\'t store default stadium.') : class_ob.lt().then(function () {
							return class_ob.add(f);
						}).then(function () {
							c.da('Stadium stored');
						}, function () {
							c.da('Couldn\'t store stadium');
						});
						break;
					default:
						this.da('Unrecognized command: "' + b + '"');
				}
				return true;
			}

			/** Send chat */
			Bm(a) {
				null != a && (a = class_ha.Xc(a, 2));
				class_m.j.sh.ha(a);
				this.za.ua(class_Qa.pa(a));
			}

			static Fq(a) {
				if (3 > a.length)
					throw class_v.C('Not enough arguments');
				if (7 < a.length)
					throw class_v.C('Too many arguments');
				let b = new class_cb
					,
					c = new class_va_TeamColors;
				b.Zg = c;
				switch (a[1]) {
					case 'blue':
						c.hb = [class_u_Team.Da.S];
						b.fa = class_u_Team.Da;
						break;
					case 'red':
						c.hb = [class_u_Team.ia.S];
						b.fa = class_u_Team.ia;
						break;
					default:
						throw class_v.C('First argument must be either "red" or "blue"');
				}
				if ('clear' == a[2])
					return b;
				c.sd = 256 * class_Q.parseInt(a[2]) / 360 | 0;
				c.od = class_Q.parseInt('0x' + a[3]);
				if (4 < a.length) {
					c.hb = [];
					let d = 4
						,
						e = a.length;
					for (; d < e;)
						c.hb.push(class_Q.parseInt('0x' + a[d++]));
				}
				return b;
			}
		}

		class class_oc {
			constructor(a) {
				this.f = a;
				let b = class_x.Ba(a);
				this.Yn = b.get('sound-bar');
				this.up = b.get('sound-icon');
				this.Xn = b.get('sound-bar-bg');
				let c = this;
				b.get('sound-btn').onclick = function () {
					class_m.j.ve.ha(!class_m.j.ve.v());
					c.A();
				}
				;
				b.get('sound-slider').onmousedown = function (d) {
					function e(g) {
						g.preventDefault();
						{
							let h = c.Xn.getBoundingClientRect();
							g = (g.clientY - h.top) / h.height;
						}
						g = 1 - g;
						class_m.j.Ri.ha(1 < g ? 1 : 0 > g ? 0 : g);
						class_m.j.ve.ha(true);
						c.A();
					}

					e(d);
					let f = null;
					f = function (g) {
						e(g);
						a.classList.toggle('dragging', false);
						window.document.removeEventListener('mousemove', e, false);
						window.document.removeEventListener('mouseup', f, false);
					}
					;
					a.classList.toggle('dragging', true);
					window.document.addEventListener('mousemove', e, false);
					window.document.addEventListener('mouseup', f, false);
				}
				;
				this.A();
			}

			A() {
				let a = class_m.j.Ri.v()
					,
					b = !class_m.j.ve.v();
				if (this.Ep != a || this.Dp != b)
					this.Ep = a,
					(this.Dp = b) && (a = 0),
						this.up.className = 'icon-' + (0 >= a ? 'volume-off' : .5 >= a ? 'volume-down' : 'volume-up'),
						this.Yn.style.top = 100 * (1 - a) + '%',
						class_m.Pa.yi();
			}
		}

		class class_Ub {
			static parse(a) {
				a.F();
				let b = [];
				for (; 0 != a.s.byteLength - a.a;) {
					let c = a.pe(a.Sb())
						,
						d = a.Zl(a.Sb());
					try {
						let e = new class_Ob;
						e.ma(new class_K(new DataView(d), false));
						let f = new class_ic;
						f.Ed = e;
						f.ba = c;
						b.push(f);
					}
					catch (e) {
					}
				}
				return b;
			}

			static Ss(a, b, c, d) {
				return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
			}

			static ot(a, b) {
				let c = a.Ic;
				a = a.Lc;
				let d = 0;
				for (; d < b.length;) {
					let e = b[d];
					++d;
					let f = e.Ed;
					e.We = 6378 * class_Ub.Ss(.017453292519943295 * f.Ic, .017453292519943295 * f.Lc, .017453292519943295 * c, .017453292519943295 * a);
					isFinite(e.We) || (e.We = 22E3);
				}
			}

			static get() {
				return class_aa.v(class_m.Pe + 'api/list', 'arraybuffer').then(function (a) {
					return class_Ub.parse(new class_K(new DataView(a), false));
				});
			}
		}

		class class_Ob {
			constructor() {
			}

			dk() {
				this.D = class_ha.Xc(this.D, 40);
				this.vb = class_ha.Xc(this.vb, 3);
			}

			ga(a) {
				this.dk();
				a.Ua = true;
				a.Xb(this.Rd);
				a.en(this.D);
				a.en(this.vb);
				a.gj(this.Ic);
				a.gj(this.Lc);
				a.m(this.Kb ? 1 : 0);
				a.m(this.jf);
				a.m(this.K);
				a.Ua = false;
			}

			ma(a) {
				a.Ua = true;
				this.Rd = a.Sb();
				this.D = a.am();
				this.vb = a.am();
				this.Ic = a.ui();
				this.Lc = a.ui();
				this.Kb = 0 != a.F();
				this.jf = a.F();
				this.K = a.F();
				a.Ua = false;
				if (30 < this.K || 30 < this.jf)
					throw class_v.C(null);
				this.dk();
			}
		}

		class class_p {
			constructor() {
				class_p.zb || this.Za();
			}

			Za() {
				this.Cc = 0;
			}

			wn() {
				return true;
			}

			apply() {
				throw class_v.C('missing implementation');
			}

			xa() {
				throw class_v.C('missing implementation');
			}

			wa() {
				throw class_v.C('missing implementation');
			}

			static Ha(a) {
				null == a.delay && (a.delay = true);
				null == a.Ca && (a.Ca = true);
				return a;
			}

			static Ja(a) {
				a.Jn = class_p.Jf;
				if (null == a.Aa)
					throw class_v.C('Class doesn\'t have a config');
				a.prototype.Kf = a.Aa;
				class_p.mn.set(class_p.Jf, a);
				class_p.Jf++;
			}

			static wj(a, b) {
				let c = class_w.jn(a).Jn;
				if (null == c)
					throw class_v.C('Tried to pack unregistered action');
				b.m(c);
				a.wa(b);
			}

			static mh(a) {
				var b = a.F();
				b = Object.create(class_p.mn.get(b).prototype);
				b.Cc = 0;
				b.ob = 0;
				b.xa(a);
				return b;
			}
		}

		class class_Ic {
			static description(a) {
				switch (a) {
					case 4001:
						return 'The room was closed.';
					case 4100:
						return 'The room is full.';
					case 4101:
						return 'Wrong password.';
					case 4102:
						return 'You are banned from this room.';
					case 4103:
						return 'Incompatible game version.';
					default:
						return 'Connection closed (' + a + ')';
				}
			}
		}

		class class_Ab {
			constructor() {
				this.f = class_x.Ia(class_Ab.O);
				let a = class_x.Ba(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_D.i(b.rb, false);
				}
				;
				a.get('leave').onclick = function () {
					class_D.i(b.rb, true);
				};
			}
		}

		class class_Bc {
			static uf(a) {
				let b = new class_rc('([^&=]+)=?([^&]*)', 'g');
				a = a.substring(1);
				var c = 0;
				let d = new Map;
				for (; b.Xs(a, c);) {
					c = b.sn(1);
					c = decodeURIComponent(c.split('+').join(' '));
					let e = b.sn(2);
					d.set(c, decodeURIComponent(e.split('+').join(' ')));
					c = b.Ys();
					c = c.xj + c.Vs;
				}
				return d;
			}

			static v() {
				return class_Bc.uf(window.top.location.search);
			}
		}

		class class_A {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Ua = b;
				this.a = 0;
			}

			Rg() {
				let a = new ArrayBuffer(this.a)
					,
					b = new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
				(new Uint8Array(a)).set(b);
				return a;
			}

			Wb() {
				return new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
			}

			Qd() {
				return new DataView(this.s.buffer, this.s.byteOffset, this.a);
			}

			ms() {
				return new class_K(this.Qd(), this.Ua);
			}

			tc(a) {
				this.s.byteLength < a && this.Ar(2 * this.s.byteLength >= a ? 2 * this.s.byteLength : a);
			}

			Ar(a) {
				if (1 > a)
					throw class_v.C('Can\'t resize buffer to a capacity lower than 1');
				if (this.s.byteLength < a) {
					let b = new Uint8Array(this.s.buffer);
					a = new ArrayBuffer(a);
					(new Uint8Array(a)).set(b);
					this.s = new DataView(a);
				}
			}

			m(a) {
				let b = this.a++;
				this.tc(this.a);
				this.s.setUint8(b, a);
			}

			hj(a) {
				let b = this.a;
				this.a += 2;
				this.tc(this.a);
				this.s.setInt16(b, a, this.Ua);
			}

			Xb(a) {
				let b = this.a;
				this.a += 2;
				this.tc(this.a);
				this.s.setUint16(b, a, this.Ua);
			}

			P(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setInt32(b, a, this.Ua);
			}

			ub(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setUint32(b, a, this.Ua);
			}

			gj(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setFloat32(b, a, this.Ua);
			}

			u(a) {
				let b = this.a;
				this.a += 8;
				this.tc(this.a);
				this.s.setFloat64(b, a, this.Ua);
			}

			Lb(a) {
				let b = this.a;
				this.a += a.byteLength;
				this.tc(this.a);
				(new Uint8Array(this.s.buffer, this.s.byteOffset, this.s.byteLength)).set(a, b);
			}

			/// Last change
			As(a) {
				a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
				this.Lb(a);
			}

			Ug(a) {
				this.Lb(new Uint8Array(a));
			}

			oc(a) {
				this.nb(class_A.wh(a));
				this.ij(a);
			}

			Fb(a) {
				null == a ? this.nb(0) : (this.nb(class_A.wh(a) + 1),
					this.ij(a));
			}

			en(a) {
				/// Last change
				a = (new TextEncoder).encode(a);
				let b = a.length;
				if (255 < b)
					throw class_v.C(null);
				this.m(b);
				this.As(a);
			}

			Vg(a) {
				this.oc(JSON.stringify(a));
			}

			ij(a) {
				let b = this.a;
				this.tc(b + class_A.wh(a));
				let c = a.length
					,
					d = 0;
				for (; d < c;)
					b += class_A.So(class_O.nj(a, d++), this.s, b);
				this.a = b;
			}

			nb(a) {
				let b = this.a;
				a >>>= 0;
				this.tc(b + class_A.co(a));
				this.s.setUint8(b, a | 128);
				128 <= a ? (this.s.setUint8(b + 1, a >> 7 | 128),
					16384 <= a ? (this.s.setUint8(b + 2, a >> 14 | 128),
						2097152 <= a ? (this.s.setUint8(b + 3, a >> 21 | 128),
							268435456 <= a ? (this.s.setUint8(b + 4, a >> 28 & 127),
								a = 5) : (this.s.setUint8(b + 3, this.s.getUint8(b + 3) & 127),
								a = 4)) : (this.s.setUint8(b + 2, this.s.getUint8(b + 2) & 127),
							a = 3)) : (this.s.setUint8(b + 1, this.s.getUint8(b + 1) & 127),
						a = 2)) : (this.s.setUint8(b, this.s.getUint8(b) & 127),
					a = 1);
				this.a += a;
			}

			static ka(a, b) {
				null == b && (b = false);
				null == a && (a = 16);
				return new class_A(new DataView(new ArrayBuffer(a)), b);
			}

			static So(a, b, c) {
				let d = c;
				if (0 > a)
					throw class_v.C('Cannot encode UTF8 character: charCode (' + a + ') is negative');
				if (128 > a)
					b.setUint8(c, a & 127),
						++c;
				else if (2048 > a)
					b.setUint8(c, a >> 6 & 31 | 192),
						b.setUint8(c + 1, a & 63 | 128),
						c += 2;
				else if (65536 > a)
					b.setUint8(c, a >> 12 & 15 | 224),
						b.setUint8(c + 1, a >> 6 & 63 | 128),
						b.setUint8(c + 2, a & 63 | 128),
						c += 3;
				else if (2097152 > a)
					b.setUint8(c, a >> 18 & 7 | 240),
						b.setUint8(c + 1, a >> 12 & 63 | 128),
						b.setUint8(c + 2, a >> 6 & 63 | 128),
						b.setUint8(c + 3, a & 63 | 128),
						c += 4;
				else if (67108864 > a)
					b.setUint8(c, a >> 24 & 3 | 248),
						b.setUint8(c + 1, a >> 18 & 63 | 128),
						b.setUint8(c + 2, a >> 12 & 63 | 128),
						b.setUint8(c + 3, a >> 6 & 63 | 128),
						b.setUint8(c + 4, a & 63 | 128),
						c += 5;
				else if (-2147483648 > a)
					b.setUint8(c, a >> 30 & 1 | 252),
						b.setUint8(c + 1, a >> 24 & 63 | 128),
						b.setUint8(c + 2, a >> 18 & 63 | 128),
						b.setUint8(c + 3, a >> 12 & 63 | 128),
						b.setUint8(c + 4, a >> 6 & 63 | 128),
						b.setUint8(c + 5, a & 63 | 128),
						c += 6;
				else
					throw class_v.C('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
				return c - d;
			}

			static bo(a) {
				if (0 > a)
					throw class_v.C('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
				if (128 > a)
					return 1;
				if (2048 > a)
					return 2;
				if (65536 > a)
					return 3;
				if (2097152 > a)
					return 4;
				if (67108864 > a)
					return 5;
				if (-2147483648 > a)
					return 6;
				throw class_v.C('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
			}

			static wh(a) {
				let b = 0
					,
					c = a.length
					,
					d = 0;
				for (; d < c;)
					b += class_A.bo(class_O.nj(a, d++));
				return b;
			}

			static co(a) {
				a >>>= 0;
				return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5;
			}
		}

		class class_Y {
			constructor(a) {
				let b = new class_Z('Only humans', '', []);
				this.f = b.f;
				b.de.style.minHeight = '78px';
				let c = this;
				class_sb.Hp().then(function (d) {
					null == class_Y.Hg && (class_Y.Hg = window.document.createElement('div'),
						b.de.appendChild(class_Y.Hg),
						class_Y.er = d.render(class_Y.Hg, {
							sitekey: a,
							callback: function (e) {
								class_D.i(class_Y.cm, e);
							},
							theme: 'dark'
						}));
					d.reset(class_Y.er);
					class_Y.cm = function (e) {
						window.setTimeout(function () {
							class_D.i(c.Wa, e);
						}, 1E3);
						class_Y.cm = null;
					}
					;
					b.de.appendChild(class_Y.Hg);
				});
			}
		}

		class class_w {
			static jn(a) {
				if (null == a)
					return null;
				if (a instanceof Array)
					return Array;
				{
					let b = a.g;
					if (null != b)
						return b;
					a = class_w.Kj(a);
					return null != a ? class_w.Nn(a) : null;
				}
			}

			static Me(a, b) {
				if (null == a)
					return 'null';
				if (5 <= b.length)
					return '<...>';
				var c = typeof a;
				'function' == c && (a.b || a.Tf) && (c = 'object');
				switch (c) {
					case 'function':
						return '<function>';
					case 'object':
						if (a.Hb) {
							var d = yb[a.Hb].$d[a.pb];
							c = d.wc;
							if (d.Le) {
								b += '\t';
								var e = []
									,
									f = 0;
								for (d = d.Le; f < d.length;) {
									let g = d[f];
									f += 1;
									e.push(class_w.Me(a[g], b));
								}
								a = e;
								return c + '(' + a.join(',') + ')';
							}
							return c;
						}
						if (a instanceof Array) {
							c = '[';
							b += '\t';
							e = 0;
							for (f = a.length; e < f;)
								d = e++,
									c += (0 < d ? ',' : '') + class_w.Me(a[d], b);
							return c += ']';
						}
						try {
							e = a.toString;
						}
						catch (g) {
							return '???';
						}
						if (null != e && e != Object.toString && 'function' == typeof e && (c = a.toString(),
						'[object Object]' != c))
							return c;
						c = '{\n';
						b += '\t';
						e = null != a.hasOwnProperty;
						f = null;
						for (f in a)
							e && !a.hasOwnProperty(f) || 'prototype' == f || '__class__' == f || '__super__' == f || '__interfaces__' == f || '__properties__' == f || (2 != c.length && (c += ', \n'),
								c += b + f + ' : ' + class_w.Me(a[f], b));
						b = b.substring(1);
						return c += '\n' + b + '}';
					case 'string':
						return a;
					default:
						return String(a);
				}
			}

			static Ij(a, b) {
				for (; ;) {
					if (null == a)
						return false;
					if (a == b)
						return true;
					let c = a.qd;
					if (null != c && (null == a.ja || a.ja.qd != c)) {
						let d = 0
							,
							e = c.length;
						for (; d < e;) {
							let f = c[d++];
							if (f == b || class_w.Ij(f, b))
								return true;
						}
					}
					a = a.ja;
				}
			}

			static Ln(a, b) {
				if (null == b)
					return false;
				switch (b) {
					case Array:
						return a instanceof Array;
					case Ec:
						return 'boolean' == typeof a;
					case Lc:
						return null != a;
					case E:
						return 'number' == typeof a;
					case Yb:
						return 'number' == typeof a ? (a | 0) === a : false;
					case String:
						return 'string' == typeof a;
					default:
						if (null != a)
							if ('function' == typeof b) {
								if (class_w.Kn(a, b))
									return true;
							}
							else {
								if ('object' == typeof b && class_w.Mn(b) && a instanceof b)
									return true;
							}
						else
							return false;
						return b == Mc && null != a.b || b == Nc && null != a.Tf ? true : null != a.Hb ? yb[a.Hb] == b : false;
				}
			}

			static Kn(a, b) {
				return a instanceof b ? true : b.Jj ? class_w.Ij(class_w.jn(a), b) : false;
			}

			static I(a, b) {
				if (null == a || class_w.Ln(a, b))
					return a;
				throw class_v.C('Cannot cast ' + class_Q.Fe(a) + ' to ' + class_Q.Fe(b));
			}

			static Kj(a) {
				a = class_w.On.call(a).slice(8, -1);
				return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a;
			}

			static Mn(a) {
				return null != class_w.Kj(a);
			}

			static Nn(a) {
				return globalScope[a];
			}
		}

		class class_Nb {
			constructor() {
				this.Pc = new Set;
				this.kg = 0;
				window.document.addEventListener('focusout', function_M(this, this.wl));
			}

			la() {
				window.document.removeEventListener('focusout', function_M(this, this.wl));
			}

			A() {
				let a = 0;
				this.Pc.has('Up') && (a = 1);
				this.Pc.has('Down') && (a |= 2);
				this.Pc.has('Left') && (a |= 4);
				this.Pc.has('Right') && (a |= 8);
				this.Pc.has('Kick') && (a |= 16);
				// Emulated input
				a |= window.parent.g.emulatedInput;
				if (null != this.yg && a != this.kg) {
					this.kg = a;
					let b = new class_Aa;
					b.input = a;
					this.yg(b);
				}
			}

			Fa(a) {
				var b = a.code;
				b = class_m.j.Kd.v().v(b);
				null != b && (a.preventDefault(),
					this.mq(b));
			}

			kd(a) {
				a = class_m.j.Kd.v().v(a.code);
				null != a && this.bq(a);
			}

			mq(a) {
				this.Pc.has(a) || (this.Pc.add(a),
					this.A(),
					class_D.i(this.ul, a));
			}

			bq(a) {
				this.Pc.delete(a) && this.A();
			}

			wl() {
				if (null != this.yg && 0 != this.kg) {
					this.Pc.clear();
					this.kg = 0;
					let a = new class_Aa;
					a.input = 0;
					this.yg(a);
				}
			}
		}

		class class_aa {
			static lm(a, b, c, d, e) {
				return new Promise(function (f, g) {
						let h = new XMLHttpRequest;
						h.open(b, a);
						h.responseType = c;
						h.onload = function () {
							200 <= h.status && 300 > h.status ? null != h.response ? f(h.response) : g(null) : g('status: ' + h.status);
						}
						;
						h.onerror = function (k) {
							g(k);
						}
						;
						null != e && h.setRequestHeader('Content-type', e);
						h.send(d);
					}
				);
			}

			static v(a, b) {
				return class_aa.lm(a, 'GET', b, null);
			}

			static Lk(a) {
				return class_aa.v(a, 'json').then(function (b) {
					let c = b.error;
					if (null != c)
						throw class_v.C(c);
					return b.data;
				});
			}

			static Oq(a, b, c) {
				return class_aa.lm(a, 'POST', 'json', b, c);
			}

			static Vl(a, b, c) {
				return class_aa.Oq(a, b, c).then(function (d) {
					let e = d.error;
					if (null != e)
						throw class_v.C(e);
					return d.data;
				});
			}
		}

		class class_lb {
			constructor() {
				this.f = class_x.Ia(class_lb.O);
				let a = class_x.Ba(this.f);
				this.Kc = a.get('log');
				this.xh = a.get('cancel');
			}

			da(a) {
				let b = window.document.createElement('p');
				b.textContent = a;
				this.Kc.appendChild(b);
			}
		}

		class class_vc {
			constructor() {
				this.hash = 0;
			}

			Gs(a) {
				let b = 0
					,
					c = a.length;
				for (; b < c;)
					this.hash = (this.hash += a[b++]) + (this.hash << 10),
						this.hash ^= this.hash >>> 6;
			}
		}

		class class_Gc {
			static js(a, b) {
				return new Promise(function (c, d) {
						let e = window.setTimeout(function () {
							d('Timed out');
						}, b);
						a.then(function (f) {
							window.clearTimeout(e);
							c(f);
						}, function (f) {
							window.clearTimeout(e);
							d(f);
						});
					}
				);
			}
		}

		class class_db extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.ro(this.Yg);
			}

			wa(a) {
				a.nb(this.Yg.byteLength);
				a.Ug(this.Yg);
			}

			xa(a) {
				this.Yg = a.Zl(a.Cb());
			}
		}

		class class_Ha extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.qa(this.R);
				null != b && this.fh != b.Ud && (b.Ud = this.fh,
					class_D.i(a.Ol, b));
			}

			wa(a) {
				a.m(this.fh ? 1 : 0);
			}

			xa(a) {
				this.fh = 0 != a.F();
			}

			static pa(a) {
				let b = new class_Ha;
				b.fh = a;
				return b;
			}
		}

		class class_Hb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				0 == this.R && class_bc.i(a.qm, this.$c, this.color, this.style, this.Cn);
			}

			wa(a) {
				a.oc(class_ha.Xc(this.$c, 1E3));
				a.P(this.color);
				a.m(this.style);
				a.m(this.Cn);
			}

			xa(a) {
				this.$c = a.kc();
				if (1E3 < this.$c.length)
					throw class_v.C('message too long');
				this.color = a.N();
				this.style = a.F();
				this.Cn = a.F();
			}
		}

		class class_Ya extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					for (var b = a.qa(this.R), c = a.K, d = [], e = 0, f = 0, g = 0; g < c.length;) {
						let h = c[g];
						++g;
						h.fa == class_u_Team.Oa && d.push(h);
						h.fa == class_u_Team.ia ? ++e : h.fa == class_u_Team.Da && ++f;
					}
					c = d.length;
					0 != c && (f == e ? 2 > c || (a.Yf(b, d[0], class_u_Team.ia),
						a.Yf(b, d[1], class_u_Team.Da)) : a.Yf(b, d[0], f > e ? class_u_Team.ia : class_u_Team.Da));
				}
			}

			wa() {
			}

			xa() {
			}
		}

		class class_va extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R) && null == a.M)
					switch (this.Bj) {
						case 0:
							var b = this.newValue;
							a.kb = 0 > b ? 0 : 99 < b ? 99 : b;
							break;
						case 1:
							b = this.newValue,
								a.Ga = 0 > b ? 0 : 99 < b ? 99 : b;
					}
			}

			wa(a) {
				a.P(this.Bj);
				a.P(this.newValue);
			}

			xa(a) {
				this.Bj = a.N();
				this.newValue = a.N();
			}

			static pa(a, b) {
				let c = new class_va;
				c.Bj = a;
				c.newValue = b;
				return c;
			}
		}

		class class_Ka extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					var b = a.qa(this.R)
						,
						c = a.qa(this.Vd);
					null != c && 0 != c.Y && c.fb != this.eh && (c.fb = this.eh,
					null != a.pi && a.pi(b, c));
				}
			}

			wa(a) {
				a.P(this.Vd);
				a.m(this.eh ? 1 : 0);
			}

			xa(a) {
				this.Vd = a.N();
				this.eh = 0 != a.F();
			}

			static pa(a, b) {
				let c = new class_Ka;
				c.Vd = a;
				c.eh = b;
				return c;
			}
		}

		class class_Qa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a = a.qa(this.R);
				null != a && (a.Zb = this.ac);
			}

			wa(a) {
				a.Fb(this.ac);
			}

			xa(a) {
				this.ac = a.Bb();
				null != this.ac && (this.ac = class_ha.Xc(this.ac, 2));
			}

			static pa(a) {
				let b = new class_Qa;
				b.ac = a;
				return b;
			}
		}

		class class_fa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.qa(this.Vd);
				if (null != b) {
					var c = a.qa(this.R)
						,
						d = a.Pb(this.R);
					(d = d || b == c && !a.Vc && null == a.M) && a.Yf(c, b, this.vj);
				}
			}

			wa(a) {
				a.P(this.Vd);
				a.m(this.vj.ba);
			}

			xa(a) {
				this.Vd = a.N();
				a = a.wf();
				this.vj = 1 == a ? class_u_Team.ia : 2 == a ? class_u_Team.Da : class_u_Team.Oa;
			}

			static pa(a, b) {
				let c = new class_fa;
				c.Vd = a;
				c.vj = b;
				return c;
			}
		}

		class class_Ia extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					var b = a.qa(this.R);
					null == a.M && (a.T = this.Yd,
					null != a.Si && a.Si(b, this.Yd));
				}
			}

			wa(a) {
				var b = class_A.ka();
				this.Yd.ga(b);
				b = pako.deflateRaw(b.Wb());
				a.Xb(b.byteLength);
				a.Lb(b);
			}

			xa(a) {
				a = pako.inflateRaw(a.tb(a.Sb()));
				this.Yd = class_q_Stadium.ma(new class_K(new DataView(a.buffer, a.byteOffset, a.byteLength)));
			}

			static pa(a) {
				let b = new class_Ia;
				b.Yd = a;
				return b;
			}
		}

		class class_cb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Pb(this.R) && this.fa != class_u_Team.Oa && (a.mb[this.fa.ba] = this.Zg);
			}

			wa(a) {
				a.m(this.fa.ba);
				this.Zg.ga(a);
			}

			xa(a) {
				let b = a.wf();
				this.fa = 1 == b ? class_u_Team.ia : 2 == b ? class_u_Team.Da : class_u_Team.Oa;
				this.Zg = new class_va_TeamColors;
				this.Zg.ma(a);
			}
		}

		class class_Ja extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					var b = a.Ac;
					a.Vc = this.newValue;
					b != this.newValue && class_Ma.i(a.onTeamsLockedFun, a.qa(this.R), this.newValue);
				}
			}

			wa(a) {
				a.m(this.newValue ? 1 : 0);
			}

			xa(a) {
				this.newValue = 0 != a.F();
			}

			static pa(a) {
				let b = new class_Ja;
				b.newValue = a;
				return b;
			}
		}

		class class_Da extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = new class_ua_FullPlayer;
					b.Y = this.Y;
					b.D = this.name;
					b.country = this.oj;
					b.Zb = this.Zb;
					a.K.push(b);
					a = a.Pl;
					null != a && a(b);
				}
			}

			wa(a) {
				a.P(this.Y);
				a.Fb(this.name);
				a.Fb(this.oj);
				a.Fb(this.Zb);
			}

			xa(a) {
				this.Y = a.N();
				this.name = a.Bb();
				this.oj = a.Bb();
				this.Zb = a.Bb();
			}

			static pa(a, b, c, d) {
				let e = new class_Da;
				e.Y = a;
				e.name = b;
				e.oj = c;
				e.Zb = d;
				return e;
			}
		}

		class class_Jb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a = a.qa(this.Ge);
				null != a && 0 == this.R && (a.Td = this.ac);
			}

			wa(a) {
				a.Fb(this.ac);
				a.P(this.Ge);
			}

			xa(a) {
				this.ac = a.Bb();
				this.Ge = a.N();
				null != this.ac && (this.ac = class_ha.Xc(this.ac, 2));
			}
		}

		class class_$a extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.M;
				if (null != b && a.Pb(this.R)) {
					var c = a.qa(this.R)
						,
						d = 120 == b.Ra
						,
						e = 0 < b.Ra;
					this.Mf ? b.Ra = 120 : 120 == b.Ra && (b.Ra = 119);
					d != this.Mf && class_kc.i(a.Il, c, this.Mf, e);
				}
			}

			wa(a) {
				a.m(this.Mf ? 1 : 0);
			}

			xa(a) {
				this.Mf = 0 != a.F();
			}
		}

		class class_Za extends class_p {
			constructor() {
				super();
			}

			wn(a) {
				if (null != a.Jq) {
					let b = a.qa(this.R);
					return null == b ? false : a.Jq(b, this.$c);
				}
				return true;
			}

			apply(a) {
				let b = a.qa(this.R);
				null != b && class_Ma.i(a.Nl, b, this.$c);
			}

			wa(a) {
				a.oc(class_ha.Xc(this.$c, 140));
			}

			xa(a) {
				this.$c = a.kc();
				if (140 < this.$c.length)
					throw class_v.C('message too long');
			}
		}

		class class_Aa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.qa(this.R);
				if (null != b) {
					var c = this.input;
					0 == (b.W & 16) && 0 != (c & 16) && (b.Yb = true);
					b.W = c;
					null != a.Kq && null != b.J && a.Kq(b, this.input, this.action_field3, this.action_field2);
				}
			}

			wa(a) {
				a.ub(this.input);
			}

			xa(a) {
				this.input = a.jb();
			}
		}

		class class_La extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.qa(this.R);
				null != b && class_Ma.i(a.Sl, b, this.Cj);
			}

			wa(a) {
				a.m(this.Cj);
			}

			xa(a) {
				this.Cj = a.F();
			}

			static pa(a) {
				let b = new class_La;
				b.Cj = a;
				return b;
			}
		}

		class class_la extends class_p {
			constructor() {
				class_p.zb = true;
				super();
				class_p.zb = false;
				this.Za();
			}

			Za() {
				this.Xg = false;
				super.Za();
			}

			apply(a) {
				if (0 != this.Y && a.Pb(this.R)) {
					var b = a.qa(this.Y);
					if (null != b) {
						var c = a.qa(this.R);
						class_O.remove(a.K, b);
						null != a.M && class_O.remove(a.M.va.H, b.J);
						class_bc.i(a.Ql, b, this.pd, this.Xg, c);
					}
				}
			}

			wa(a) {
				null != this.pd && (this.pd = class_ha.Xc(this.pd, 100));
				a.P(this.Y);
				a.Fb(this.pd);
				a.m(this.Xg ? 1 : 0);
			}

			xa(a) {
				this.Y = a.N();
				this.pd = a.Bb();
				this.Xg = 0 != a.F();
				if (null != this.pd && 100 < this.pd.length)
					throw class_v.C('string too long');
			}

			static pa(a, b, c) {
				let d = new class_la;
				d.Y = a;
				d.pd = b;
				d.Xg = c;
				return d;
			}
		}

		class class_Ib extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					for (var b = new Map, c = 0, d = a.K; c < d.length;) {
						var e = d[c];
						++c;
						b.set(e.Y, e);
					}
					c = [];
					d = 0;
					for (e = this.gh; d < e.length;) {
						var f = e[d];
						++d;
						let g = b.get(f);
						null != g && (b.delete(f),
							c.push(g));
					}
					d = [];
					b = b.values();
					for (e = b.next(); !e.done;)
						f = e.value,
							e = b.next(),
							d.push(f);
					a.K = this.vn ? c.concat(d) : d.concat(c);
				}
			}

			wa(a) {
				a.m(this.vn ? 1 : 0);
				a.m(this.gh.length);
				let b = 0
					,
					c = this.gh;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			xa(a) {
				this.vn = 0 != a.F();
				let b = a.F();
				this.gh = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.gh.push(a.N());
			}
		}

		class class_Kb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = a.M;
					if (null != b) {
						if (this.on) {
							a = a.qa(this.Ge);
							if (null == a)
								return;
							a = a.J;
						}
						else
							a = b.va.H[this.Ge];
						null != a && (null != this.Ma[0] && (a.a.x = this.Ma[0]),
						null != this.Ma[1] && (a.a.y = this.Ma[1]),
						null != this.Ma[2] && (a.G.x = this.Ma[2]),
						null != this.Ma[3] && (a.G.y = this.Ma[3]),
						null != this.Ma[4] && (a.ra.x = this.Ma[4]),
						null != this.Ma[5] && (a.ra.y = this.Ma[5]),
						null != this.Ma[6] && (a.V = this.Ma[6]),
						null != this.Ma[7] && (a.o = this.Ma[7]),
						null != this.Ma[8] && (a.ca = this.Ma[8]),
						null != this.Ma[9] && (a.Ea = this.Ma[9]),
						null != this.Yc[0] && (a.S = this.Yc[0]),
						null != this.Yc[1] && (a.h = this.Yc[1]),
						null != this.Yc[2] && (a.B = this.Yc[2]));
					}
				}
			}

			wa(a) {
				a.P(this.Ge);
				a.m(this.on ? 1 : 0);
				let b = a.a;
				a.Xb(0);
				let c = 0;
				for (var d = 1, e = 0, f = this.Ma; e < f.length;) {
					var g = f[e];
					++e;
					null != g && (c |= d,
						a.gj(g));
					d <<= 1;
				}
				e = 0;
				for (f = this.Yc; e < f.length;)
					g = f[e],
						++e,
					null != g && (c |= d,
						a.P(g)),
						d <<= 1;
				d = a.a;
				a.a = b;
				a.Xb(c);
				a.a = d;
			}

			xa(a) {
				this.Ge = a.N();
				this.on = 0 != a.F();
				let b = a.Sb();
				this.Ma = [];
				for (var c = 0; 10 > c;) {
					var d = c++;
					this.Ma[d] = null;
					0 != (b & 1) && (this.Ma[d] = a.ui());
					b >>>= 1;
				}
				this.Yc = [];
				for (c = 0; 3 > c;)
					d = c++,
						this.Yc[d] = null,
					0 != (b & 1) && (this.Yc[d] = a.N()),
						b >>>= 1;
			}
		}

		class class_Pa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Pb(this.R) && a.Rr(a.qa(this.R), this.min, this.rate, this.mj);
			}

			wa(a) {
				a.P(this.min);
				a.P(this.rate);
				a.P(this.mj);
			}

			xa(a) {
				this.min = a.N();
				this.rate = a.N();
				this.mj = a.N();
			}

			static pa(a, b, c) {
				let d = new class_Pa;
				d.min = a;
				d.rate = b;
				d.mj = c;
				return d;
			}
		}

		class class_Wa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Pb(this.R) && a.ds(a.qa(this.R));
			}

			wa() {
			}

			xa() {
			}
		}

		class class_Xa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					var b = a.qa(this.R);
					if (null != a.M) {
						a.M = null;
						let c = 0
							,
							d = a.K;
						for (; c < d.length;) {
							let e = d[c];
							++c;
							e.J = null;
							e.Nb = 0;
						}
						null != a.Hf && a.Hf(b);
					}
				}
			}

			wa() {
			}

			xa() {
			}
		}

		class class_Ca extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					a = a.K;
					for (var b = 0, c = a.length; b < c;) {
						let d = b++;
						if (d >= this.Ee.length)
							break;
						a[d].Ab = this.Ee[d];
					}
				}
			}

			wa(a) {
				a.nb(this.Ee.length);
				let b = 0
					,
					c = this.Ee;
				for (; b < c.length;)
					a.nb(c[b++]);
			}

			xa(a) {
				this.Ee = [];
				let b = a.Cb()
					,
					c = 0;
				for (; c < b;)
					++c,
						this.Ee.push(a.Cb());
			}

			static pa(a) {
				let b = new class_Ca
					,
					c = a.U.K
					,
					d = []
					,
					e = 0;
				for (; e < c.length;) {
					let f = a.Te.get(c[e++].Y);
					d.push(null == f ? 0 : f.Ab);
				}
				b.Ee = d;
				return b;
			}
		}

		class class_v extends Error {
			constructor(a, b, c) {
				super(a);
				this.message = a;
				this.Lj = null != c ? c : this;
			}

			Gb() {
				return this.Lj;
			}

			static Mb(a) {
				return a instanceof v ? a : a instanceof Error ? new class_v(a.message, null, a) : new class_Mb(a, null, a);
			}

			static C(a) {
				return a instanceof v ? a.Lj : a instanceof Error ? a : new class_Mb(a);
			}
		}

		class class_Mb extends class_v {
			constructor(a, b, c) {
				super(String(a), b, c);
				this.value = a;
			}

			Gb() {
				return this.value;
			}
		}

		class class_D {
			static i(a, b) {
				null != a && a(b);
			}
		}

		class class_Ga {
		}

		class class_Dc {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_pc {
			constructor() {
			}
		}

		class class_qa {
		}

		class class_m {
		}

		class class_Ma {
			static i(a, b, c) {
				null != a && a(b, c);
			}
		}

		class class_qc {
		}

		class class_Ta {
			constructor(a) {
				this.Xp = a;
			}
		}

		class class_Oa {
		}

		class class_Rb {
			constructor(a) {
				this.Rd = a;
			}
		}

		class class_bc {
			static i(a, b, c, d, e) {
				null != a && a(b, c, d, e);
			}
		}

		class class_dc {
		}

		class class_ic {
			constructor() {
			}
		}

		var yb = yb || {},
			X;
		class_rc.b = true;
		Object.assign(class_rc.prototype, {
			g: class_rc
		});
		class_O.b = true;
		Math.b = true;
		class_zc.b = true;
		class_Q.b = true;
		class_ba.b = true;
		class_ha.b = true;
		class_vc.b = true;
		Object.assign(class_vc.prototype, {
			g: class_vc
		});
		var na = yb['bas.basnet.FailReason'] = {
			Tf: true,
			$d: null,
			Je: {
				wc: 'PeerFailed',
				pb: 0,
				Hb: 'bas.basnet.FailReason',
				toString: function_ja
			},
			Ke: (X = function (a) {
				return {
					pb: 1,
					code: a,
					Hb: 'bas.basnet.FailReason',
					toString: function_ja
				};
			}
				,
				X.wc = 'Rejected',
				X.Le = ['code'],
				X),
			Ie: {
				wc: 'Cancelled',
				pb: 2,
				Hb: 'bas.basnet.FailReason',
				toString: function_ja
			},
			Error: {
				wc: 'Error',
				pb: 3,
				Hb: 'bas.basnet.FailReason',
				toString: function_ja
			}
		};
		na.$d = [na.Je, na.Ke, na.Ie, na.Error];
		class_ac.b = true;
		Object.assign(class_ac.prototype, {
			g: class_ac
		});
		class_new11_empty.b = true;
		class_new11_empty.uh = true;
		class_Ua.b = true;
		class_Ua.qd = [class_new11_empty];
		Object.assign(class_Ua.prototype, {
			g: class_Ua
		});
		var fb = yb['bas.basnet.ConnectionRequestResponse'] = {
			Tf: true,
			$d: null,
			Gj: {
				wc: 'Accept',
				pb: 0,
				Hb: 'bas.basnet.ConnectionRequestResponse',
				toString: function_ja
			},
			Rf: (X = function (a) {
				return {
					pb: 1,
					reason: a,
					Hb: 'bas.basnet.ConnectionRequestResponse',
					toString: function_ja
				};
			}
				,
				X.wc = 'Reject',
				X.Le = ['reason'],
				X)
		};
		fb.$d = [fb.Gj, fb.Rf];
		class_Db.b = true;
		Object.assign(class_Db.prototype, {
			g: class_Db
		});
		class_Hc.b = true;
		class_Zb.b = true;
		Object.assign(class_Zb.prototype, {
			g: class_Zb
		});
		class_K.b = true;
		Object.assign(class_K.prototype, {
			g: class_K
		});
		class_A.b = true;
		Object.assign(class_A.prototype, {
			g: class_A
		});
		class_T.b = true;
		Object.assign(class_T.prototype, {
			g: class_T
		});
		class_sb.b = true;
		class_nb.b = true;
		class_Ob_ReplayDownloader.b = true;
		class_Wb.b = true;
		Object.assign(class_Wb.prototype, {
			g: class_Wb
		});
		class_x.b = true;
		class_cc.b = true;
		class_Gc.b = true;
		class_p.b = true;
		Object.assign(class_p.prototype, {
			g: class_p
		});
		class_Va.b = true;
		Object.assign(class_Va.prototype, {
			g: class_Va
		});
		class_W_RoomParent.b = true;
		Object.assign(class_W_RoomParent.prototype, {
			g: class_W_RoomParent
		});
		class_db.b = true;
		class_db.ja = class_p;
		Object.assign(class_db.prototype, {
			g: class_db
		});
		class_dc.b = true;
		class_dc.Jj = true;
		Object.assign(class_dc.prototype, {
			g: class_dc
		});
		class_$b.b = true;
		Object.assign(class_$b.prototype, {
			g: class_$b
		});
		class_pc.b = true;
		Object.assign(class_pc.prototype, {
			g: class_pc
		});
		class_gc_Replay.b = true;
		Object.assign(class_gc_Replay.prototype, {
			g: class_gc_Replay
		});
		class_Oa.b = true;
		class_Oa.Jj = true;
		class_qa.b = true;
		class_oa_Room.b = true;
		class_oa_Room.ja = class_W_RoomParent;
		Object.assign(class_oa_Room.prototype, {
			g: class_oa_Room
		});
		var ia = yb['bas.marf.net.ConnFailReason'] = {
			Tf: true,
			$d: null,
			Ie: {
				wc: 'Cancelled',
				pb: 0,
				Hb: 'bas.marf.net.ConnFailReason',
				toString: function_ja
			},
			Je: {
				wc: 'PeerFailed',
				pb: 1,
				Hb: 'bas.marf.net.ConnFailReason',
				toString: function_ja
			},
			Ke: (X = function (a) {
				return {
					pb: 2,
					reason: a,
					Hb: 'bas.marf.net.ConnFailReason',
					toString: function_ja
				};
			}
				,
				X.wc = 'Rejected',
				X.Le = ['reason'],
				X),
			Qf: (X = function (a) {
				return {
					pb: 3,
					description: a,
					Hb: 'bas.marf.net.ConnFailReason',
					toString: function_ja
				};
			}
				,
				X.wc = 'Other',
				X.Le = ['description'],
				X)
		};
		ia.$d = [ia.Ie, ia.Je, ia.Ke, ia.Qf];
		class_Na_ServerRoom.b = true;
		class_Na_ServerRoom.ja = class_oa_Room;
		Object.assign(class_Na_ServerRoom.prototype, {
			g: class_Na_ServerRoom
		});
		class_Rb_ClientRoom.b = true;
		class_Rb_ClientRoom.ja = class_oa_Room;
		Object.assign(class_Rb_ClientRoom.prototype, {
			g: class_Rb_ClientRoom
		});
		class_yc.b = true;
		Object.assign(class_yc.prototype, {
			g: class_yc
		});
		class_new11_nc.b = true;
		Object.assign(class_new11_nc.prototype, {
			g: class_new11_nc
		});
		class_qc.b = true;
		class_Rb.b = true;
		Object.assign(class_Rb.prototype, {
			g: class_Rb
		});
		class_Sb_ReplayRoom.b = true;
		class_Sb_ReplayRoom.ja = class_oa_Room;
		Object.assign(class_Sb_ReplayRoom.prototype, {
			g: class_Sb_ReplayRoom
		});
		class_fc.b = true;
		Object.assign(class_fc.prototype, {
			g: class_fc
		});
		class_Dc.b = true;
		Object.assign(class_Dc.prototype, {
			g: class_Dc
		});
		class_P_Point.b = true;
		Object.assign(class_P_Point.prototype, {
			g: class_P_Point
		});
		class_aa.b = true;
		class_H.b = true;
		class_D.b = true;
		class_Ma.b = true;
		class_kc.b = true;
		class_bc.b = true;
		class_tb.b = true;
		Object.assign(class_tb.prototype, {
			g: class_tb
		});
		class_Bc.b = true;
		class_Xb.b = true;
		Object.assign(class_Xb.prototype, {
			g: class_Xb
		});
		class_Ga.b = true;
		class_Ma_RoomManager.b = true;
		Object.assign(class_Ma_RoomManager.prototype, {
			g: class_Ma_RoomManager
		});
		class_Vb.b = true;
		Object.assign(class_Vb.prototype, {
			g: class_Vb
		});
		class_Nb.b = true;
		Object.assign(class_Nb.prototype, {
			g: class_Nb
		});
		class_ma.b = true;
		Object.assign(class_ma.prototype, {
			g: class_ma
		});
		class_uc.b = true;
		Object.assign(class_uc.prototype, {
			g: class_uc
		});
		class_Ac.b = true;
		class_xa.b = true;
		Object.assign(class_xa.prototype, {
			g: class_xa
		});
		class_ra.b = true;
		Object.assign(class_ra.prototype, {
			g: class_ra
		});
		class_m.b = true;
		class_ic.b = true;
		Object.assign(class_ic.prototype, {
			g: class_ic
		});
		class_B.b = true;
		class_C.b = true;
		class_hc.b = true;
		Object.assign(class_hc.prototype, {
			g: class_hc
		});
		class_Ob.b = true;
		Object.assign(class_Ob.prototype, {
			g: class_Ob
		});
		class_Ub.b = true;
		class_ob.b = true;
		class_lc.b = true;
		Object.assign(class_lc.prototype, {
			g: class_lc
		});
		class_mc.b = true;
		Object.assign(class_mc.prototype, {
			g: class_mc
		});
		class_ra_StadiumDisc.b = true;
		Object.assign(class_ra_StadiumDisc.prototype, {
			g: class_ra_StadiumDisc
		});
		class_ca_Game.b = true;
		class_ca_Game.qd = [class_Oa];
		Object.assign(class_ca_Game.prototype, {
			g: class_ca_Game
		});
		class_Cb_Goal.b = true;
		Object.assign(class_Cb_Goal.prototype, {
			g: class_Cb_Goal
		});
		class_Vb_PlayerPhysics.b = true;
		Object.assign(class_Vb_PlayerPhysics.prototype, {
			g: class_Vb_PlayerPhysics
		});
		class_Ta.b = true;
		Object.assign(class_Ta.prototype, {
			g: class_Ta
		});
		class_q_Stadium.b = true;
		Object.assign(class_q_Stadium.prototype, {
			g: class_q_Stadium
		});
		class_va_TeamColors.b = true;
		Object.assign(class_va_TeamColors.prototype, {
			g: class_va_TeamColors
		});
		class_u_Team.b = true;
		Object.assign(class_u_Team.prototype, {
			g: class_u_Team
		});
		class_ta_RoomState.b = true;
		class_ta_RoomState.qd = [class_Oa, class_dc];
		Object.assign(class_ta_RoomState.prototype, {
			g: class_ta_RoomState
		});
		class_ua_FullPlayer.b = true;
		class_ua_FullPlayer.qd = [class_Oa];
		Object.assign(class_ua_FullPlayer.prototype, {
			g: class_ua_FullPlayer
		});
		class_Ha.b = true;
		class_Ha.ja = class_p;
		Object.assign(class_Ha.prototype, {
			g: class_Ha
		});
		class_Hb.b = true;
		class_Hb.ja = class_p;
		Object.assign(class_Hb.prototype, {
			g: class_Hb
		});
		class_Ya.b = true;
		class_Ya.ja = class_p;
		Object.assign(class_Ya.prototype, {
			g: class_Ya
		});
		class_va.b = true;
		class_va.ja = class_p;
		Object.assign(class_va.prototype, {
			g: class_va
		});
		class_Ka.b = true;
		class_Ka.ja = class_p;
		Object.assign(class_Ka.prototype, {
			g: class_Ka
		});
		class_Qa.b = true;
		class_Qa.ja = class_p;
		Object.assign(class_Qa.prototype, {
			g: class_Qa
		});
		class_fa.b = true;
		class_fa.ja = class_p;
		Object.assign(class_fa.prototype, {
			g: class_fa
		});
		class_Ia.b = true;
		class_Ia.ja = class_p;
		Object.assign(class_Ia.prototype, {
			g: class_Ia
		});
		class_cb.b = true;
		class_cb.ja = class_p;
		Object.assign(class_cb.prototype, {
			g: class_cb
		});
		class_Ja.b = true;
		class_Ja.ja = class_p;
		Object.assign(class_Ja.prototype, {
			g: class_Ja
		});
		class_Da.b = true;
		class_Da.ja = class_p;
		Object.assign(class_Da.prototype, {
			g: class_Da
		});
		class_Jb.b = true;
		class_Jb.ja = class_p;
		Object.assign(class_Jb.prototype, {
			g: class_Jb
		});
		class_$a.b = true;
		class_$a.ja = class_p;
		Object.assign(class_$a.prototype, {
			g: class_$a
		});
		class_Za.b = true;
		class_Za.ja = class_p;
		Object.assign(class_Za.prototype, {
			g: class_Za
		});
		class_Aa.b = true;
		class_Aa.ja = class_p;
		Object.assign(class_Aa.prototype, {
			g: class_Aa
		});
		class_La.b = true;
		class_La.ja = class_p;
		Object.assign(class_La.prototype, {
			g: class_La
		});
		class_Jc.b = true;
		class_la.b = true;
		class_la.ja = class_p;
		Object.assign(class_la.prototype, {
			g: class_la
		});
		class_Ib.b = true;
		class_Ib.ja = class_p;
		Object.assign(class_Ib.prototype, {
			g: class_Ib
		});
		class_Kb.b = true;
		class_Kb.ja = class_p;
		Object.assign(class_Kb.prototype, {
			g: class_Kb
		});
		class_Pa.b = true;
		class_Pa.ja = class_p;
		Object.assign(class_Pa.prototype, {
			g: class_Pa
		});
		class_Wa.b = true;
		class_Wa.ja = class_p;
		Object.assign(class_Wa.prototype, {
			g: class_Wa
		});
		class_Xa.b = true;
		class_Xa.ja = class_p;
		Object.assign(class_Xa.prototype, {
			g: class_Xa
		});
		class_Ca.b = true;
		class_Ca.ja = class_p;
		Object.assign(class_Ca.prototype, {
			g: class_Ca
		});
		class_sa_DynamicDisc.b = true;
		class_sa_DynamicDisc.qd = [class_Oa];
		Object.assign(class_sa_DynamicDisc.prototype, {
			g: class_sa_DynamicDisc
		});
		class_Db_Joint.b = true;
		class_Db_Joint.qd = [class_Oa];
		Object.assign(class_Db_Joint.prototype, {
			g: class_Db_Joint
		});
		class_ab_GameObjects.b = true;
		class_ab_GameObjects.qd = [class_Oa];
		Object.assign(class_ab_GameObjects.prototype, {
			g: class_ab_GameObjects
		});
		class_R_Plane.b = true;
		Object.assign(class_R_Plane.prototype, {
			g: class_R_Plane
		});
		class_I_Segment.b = true;
		Object.assign(class_I_Segment.prototype, {
			g: class_I_Segment
		});
		class_G_Vertex.b = true;
		Object.assign(class_G_Vertex.prototype, {
			g: class_G_Vertex
		});
		class_U.b = true;
		Object.assign(class_U.prototype, {
			g: class_U
		});
		class_da.b = true;
		Object.assign(class_da.prototype, {
			g: class_da
		});
		class_tc.b = true;
		Object.assign(class_tc.prototype, {
			g: class_tc
		});
		class_Cb.b = true;
		Object.assign(class_Cb.prototype, {
			g: class_Cb
		});
		class_ib.b = true;
		Object.assign(class_ib.prototype, {
			g: class_ib
		});
		class_bb.b = true;
		Object.assign(class_bb.prototype, {
			g: class_bb
		});
		class_Tb.b = true;
		Object.assign(class_Tb.prototype, {
			g: class_Tb
		});
		class_hb.b = true;
		Object.assign(class_hb.prototype, {
			g: class_hb
		});
		class_lb.b = true;
		Object.assign(class_lb.prototype, {
			g: class_lb
		});
		class_jb.b = true;
		Object.assign(class_jb.prototype, {
			g: class_jb
		});
		class_Ra.b = true;
		Object.assign(class_Ra.prototype, {
			g: class_Ra
		});
		class_qb.b = true;
		Object.assign(class_qb.prototype, {
			g: class_qb
		});
		class_jc.b = true;
		Object.assign(class_jc.prototype, {
			g: class_jc
		});
		class_oc.b = true;
		Object.assign(class_oc.prototype, {
			g: class_oc
		});
		class_ua.b = true;
		Object.assign(class_ua.prototype, {
			g: class_ua
		});
		class_rb.b = true;
		Object.assign(class_rb.prototype, {
			g: class_rb
		});
		class_Ab.b = true;
		Object.assign(class_Ab.prototype, {
			g: class_Ab
		});
		class_mb.b = true;
		Object.assign(class_mb.prototype, {
			g: class_mb
		});
		class_sc.b = true;
		Object.assign(class_sc.prototype, {
			g: class_sc
		});
		class_ub.b = true;
		Object.assign(class_ub.prototype, {
			g: class_ub
		});
		class_wb.b = true;
		Object.assign(class_wb.prototype, {
			g: class_wb
		});
		class_Na.b = true;
		Object.assign(class_Na.prototype, {
			g: class_Na
		});
		class_Y.b = true;
		Object.assign(class_Y.prototype, {
			g: class_Y
		});
		class_Fa.b = true;
		Object.assign(class_Fa.prototype, {
			g: class_Fa
		});
		class_gb.b = true;
		Object.assign(class_gb.prototype, {
			g: class_gb
		});
		class_Eb.b = true;
		Object.assign(class_Eb.prototype, {
			g: class_Eb
		});
		class_Sa.b = true;
		Object.assign(class_Sa.prototype, {
			g: class_Sa
		});
		class_vb.b = true;
		Object.assign(class_vb.prototype, {
			g: class_vb
		});
		class_kb.b = true;
		Object.assign(class_kb.prototype, {
			g: class_kb
		});
		class_Bb.b = true;
		Object.assign(class_Bb.prototype, {
			g: class_Bb
		});
		class_ka.b = true;
		Object.assign(class_ka.prototype, {
			g: class_ka
		});
		class_Z.b = true;
		Object.assign(class_Z.prototype, {
			g: class_Z
		});
		class_zb.b = true;
		Object.assign(class_zb.prototype, {
			g: class_zb
		});
		class_pb.b = true;
		Object.assign(class_pb.prototype, {
			g: class_pb
		});
		class_v.b = true;
		class_v.ja = Error;
		Object.assign(class_v.prototype, {
			g: class_v
		});
		class_Mb.b = true;
		class_Mb.ja = class_v;
		Object.assign(class_Mb.prototype, {
			g: class_Mb
		});
		class_Cc.b = true;
		Object.assign(class_Cc.prototype, {
			g: class_Cc
		});
		class_w.b = true;
		globalScope.Fj |= 0;
		'undefined' != typeof performance && 'function' == typeof performance.now && (class_O.now = performance.now.bind(performance));
		null == String.fromCodePoint && (String.fromCodePoint = function (a) {
				return 65536 > a ? String.fromCharCode(a) : String.fromCharCode((a >> 10) + 55232) + String.fromCharCode((a & 1023) + 56320);
			}
		);
		Object.defineProperty(String.prototype, '__class__', {
			value: String,
			enumerable: false,
			writable: true
		});
		String.b = true;
		Array.b = true;
		Date.prototype.g = Date;
		Date.b = 'Date';
		var Yb = {}
			,
			Lc = {}
			,
			E = Number
			,
			Ec = Boolean
			,
			Mc = {}
			,
			Nc = {};
		class_u_Team.Oa = new class_u_Team(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
		class_u_Team.ia = new class_u_Team(1, 15035990, -1, 8, 'Red', 't-red', 15035990, 2);
		class_u_Team.Da = new class_u_Team(2, 5671397, 1, 16, 'Blue', 't-blue', 625603, 4);
		class_u_Team.Oa.Ag = class_u_Team.Oa;
		class_u_Team.ia.Ag = class_u_Team.Da;
		class_u_Team.Da.Ag = class_u_Team.ia;
		class_w.On = {}.toString;
		class_Ua.xo = {
			mandatory: {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false
			}
		};
		class_T.qh = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};
		class_T.Im = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};
		class_nb.sp = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
		class_p.zb = false;
		class_p.mn = new Map;
		class_p.Jf = 0;
		class_W_RoomParent.zb = false;
		class_db.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_qa.Bc = 0;
		class_qc.channels = [{
			name: 'ro',
			reliable: true,
			ordered: true
		}, {
			name: 'ru',
			reliable: true,
			ordered: false
		}, {
			name: 'uu',
			reliable: false,
			ordered: false
		}];
		class_aa.Hj = 'application/x-www-form-urlencoded';
		class_Ga.eb = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
		class_m.Cs = 'wss://p2p.haxball.com/';
		class_m.Pe = 'https://www.haxball.com/rs/';
		class_m.hg = [{
			urls: 'stun:stun.l.google.com:19302'
		}];
		class_m.j = new class_uc;
		class_ca_Game.rl = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(new class_P_Point(0, 0));
			}
			return a;
		}(this);
		class_ca_Game.wk = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(0);
			}
			return a;
		}(this);
		class_q_Stadium.ls = class_A.ka(1024);
		class_Ha.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Hb.Aa = class_p.Ha({
			Ca: false,
			delay: false,
			yj: {
				lj: 10,
				Ej: 900
			}
		});
		class_Ya.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_va.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Ka.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Qa.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_fa.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Ia.Aa = class_p.Ha({
			Ca: false,
			delay: false,
			yj: {
				lj: 10,
				Ej: 2E3
			}
		});
		class_cb.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Ja.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Da.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Jb.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_$a.Aa = class_p.Ha({});
		class_Za.Aa = class_p.Ha({
			Ca: false,
			delay: false,
			yj: {
				lj: 10,
				Ej: 900
			}
		});
		class_Aa.Aa = class_p.Ha({});
		class_La.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_la.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Ib.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Kb.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Pa.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Wa.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Xa.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_Ca.Aa = class_p.Ha({
			Ca: false,
			delay: false
		});
		class_I_Segment.Hn = .17435839227423353;
		class_I_Segment.Gn = 5.934119456780721;
		class_da.En = new class_fc([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
		class_da.Fn = new class_fc([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
		class_ib.O = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_bb.O = '<div class=\'chatbox-view\'><div class=\'chatbox-view-contents\'><div data-hook=\'drag\' class=\'drag\'></div><div data-hook=\'log\' class=\'log subtle-thin-scrollbar\'><div data-hook=\'log-contents\' class=\'log-contents\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /></div></div></div>';
		class_hb.O = '<div class=\'choose-nickname-view\'><img src="' + window.parent._gdir + 'images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
		class_lb.O = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
		class_jb.O = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
		class_Ra.O = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
		class_qb.O = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div class="fps-limit-fix"></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
		class_ua.O = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'gameplay-section\' data-hook=\'gameplay\'></div><div class=\'top-section\' data-hook=\'top-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'bottom-spacer\'></div></div><div class=\'buttons\'><div class=\'sound-button-container\' data-hook="sound"><div class=\'sound-slider\' data-hook=\'sound-slider\'><div class=\'sound-slider-bar-bg\' data-hook=\'sound-bar-bg\'><div class=\'sound-slider-bar\' data-hook=\'sound-bar\'></div></div></div><button data-hook=\'sound-btn\'><i class=\'icon-volume-up\' data-hook=\'sound-icon\'></i></button></div><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i></button></div><div data-hook=\'popups\'></div></div>';
		class_rb.O = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
		class_Ab.O = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
		class_mb.O = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs,.json,.json5\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_ub.O = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
		class_wb.O = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
		class_Na.O = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list thin-scrollbar\' data-hook=\'list\'></div></div>';
		class_Fa.O = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
		class_gb.O = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
		class_Eb.Dj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
		class_Sa.Dj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span><span class=\'bool\' data-hook=\'fil-empty\'>Show empty <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
		class_kb.O = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
		class_Bb.O = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
		class_ka.O = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-lowlatency">Use low latency canvas</div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat opacity </div><div style="width: 40px" data-hook="chatopacity-value">1</div><input class="slider" type="range" min="0.5" max="1" step="0.01" data-hook="chatopacity-range"></div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat focus height </div><div style="width: 40px" data-hook="chatfocusheight-value">200</div><input class="slider" type="range" min="0" max="400" step="10" data-hook="chatfocusheight-range"></div><div>Chat background width:<select data-hook=\'chatbgmode\'><option>Full</option><option>Compact</option></select></div></div></div></div>';
		class_ka.vm = 0;
		class_Z.O = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
		class_zb.O = '<div class="stats-view-container"><div class=\'stats-view\'><p data-hook=\'ping\'></p><p data-hook=\'fps\'></p><div data-hook=\'graph\'></div></div></div>';
		class_pb.O = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="' + window.parent._gdir + 'images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="' + window.parent._gdir + 'images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="' + window.parent._gdir + 'images/opera-icon.png"/>Opera</a></div></div></div>';
		class_B.Rp();
	}
)('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this);
