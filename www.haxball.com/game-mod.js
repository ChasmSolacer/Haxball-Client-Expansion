/*
 HaxBall @ 2023 - Mario Carbajal - All rights reserved.
 d962bc67
*/
'use strict';
(function (globalScope) {
		window.parent.g = {};
		/**
		 * 0 – None, 1 – Up, 2 – Down, 4 – Left, 8 – Right, 16 – Kick.
		 * To go up and left and kick simultaneously, set this to 1|4|16 which equals 21
		 * @type {number}
		 */
		window.parent.g.emulatedInput = 0;

		/* Utility functions begin */
		/**
		 * @param {class_xa} dynDisc
		 * @return {{}}
		 */
		function getDynamicDiscObject(dynDisc) {
			if (dynDisc == null)
				return null;
			return {
				frameNo: dynDisc.jc,
				self: dynDisc.ic,
				id: dynDisc.Cl,
				cGroup: dynDisc.w,
				cMask: dynDisc.h,
				u1: dynDisc.$j,
				color: dynDisc.S,
				damping: dynDisc.Da,
				invMass: dynDisc.ba,
				bCoeff: dynDisc.o,
				radius: dynDisc.V,
				xgravity: dynDisc.pa.x,
				ygravity: dynDisc.pa.y,
				xspeed: dynDisc.G.x,
				yspeed: dynDisc.G.y,
				x: dynDisc.a.x,
				y: dynDisc.a.y
			};
		}

		/**
		 * @param {class_ta} fullPlayer
		 * @return {{}}
		 */
		function getFullPlayerObject(fullPlayer) {
			if (fullPlayer == null)
				return null;
			const playerDisc = getDynamicDiscObject(fullPlayer.J);
			return {
				frameNo: fullPlayer.Cc,
				self: fullPlayer.tn,
				team: fullPlayer.ea?.aa,
				disc: playerDisc,
				position: playerDisc == null ? null : {x: playerDisc.x, y: playerDisc.y},
				// When a player kicks the ball, it is set to min and decrements every frame. When it reaches 0, the player can kick when kickMana > 0.
				nextKickIn: fullPlayer.Zc,
				// This equals to rate * burst. When the player kicks the ball, burst is subtracted from it, and it increments every frame.
				// When it goes below 0, the player can't kick.
				kickRateBurst: fullPlayer.Bc,
				isBlinking: fullPlayer.Yb,
				id: fullPlayer.X,
				inputKey: fullPlayer.Ea,
				name: fullPlayer.D,
				ping: fullPlayer.Ab,
				u1: fullPlayer.dh,
				flag: fullPlayer.country,
				desynchronized: fullPlayer.Td,
				avatarOverride: fullPlayer.Sd,
				avatar: fullPlayer.Zb,
				order: fullPlayer.Mb,
				admin: fullPlayer.eb
			};
		}

		/**
		 * @param {class_eb} gameObjects
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
		 * @param {class_ba} game
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
					u1: game.Qa,
					time: game.Mc,
					blue: game.Nb,
					red: game.Sb,
					team: game.he,
					phase: game.Db,
					u2: game.yc,
					gameObjects: getGameObjectsObject(game.ua),
					timeLimit: 60 * game.Fa,
					scoreLimit: game.jb,
					stadium: getStadiumObject(game.T)
				};
			}
		}

		/**
		 * @param {class_q} stadium
		 * @return {{}}
		 */
		function getStadiumObject(stadium) {
			if (stadium == null)
				return null;
			return {
				vertexes: stadium.L,
				segments: stadium.W,
				planes: stadium.ra,
				goals: stadium.vc.map(rawGoal => class_q.cp(rawGoal)),
				discs: stadium.H.map(rawDisc => getDynamicDiscObject(rawDisc)),
				joints: stadium.pb,
				redSpawnPoints: stadium.Nd,
				blueSpawnPoints: stadium.vd,
				playerPhysics: stadium.Ld,
				limit: stadium.Gh,
				maxViewWidth: stadium.jf,
				cameraFollowsPlayer: stadium.Re,
				canBeStored: stadium.Xf,
				kickOffResetFull: stadium.zf,
				name: stadium.D
			};
		}

		/**
		 * @param {class_sa} roomState
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
				burst: roomState.je,
				timeLimit: roomState.Fa,
				scoreLimit: roomState.jb,
				teamsLocked: roomState.Vc,
				game: getGameObject(roomState.M),
				players: roomState.K.map(fullPlayer => getFullPlayerObject(fullPlayer)),
				name: roomState.lc,
				teamColors: roomState.lb,

				getFullPlayerById: id => roomState.oa(id)
			};
		}

		/**
		 * @param {class_Ha|class_Rb} room
		 * @return {{}}
		 */
		function getRoomObject(room) {
			return {
				self: room,
				password: room.kb,
				roomState: getRoomStateObject(room.U)
			}
		}

		/**
		 * @param {class_Ea} roomManager
		 * @return {{}}
		 */
		function getRoomManagerObject(roomManager) {
			return {
				self: roomManager,
				roomLink: roomManager.Lg,
				room: getRoomObject(roomManager.ya),

				sendChat: roomManager.l.Oa.yl,
				showChatIndicator: roomManager.l.Oa.ug,
				setAvatar: text => roomManager.$f.ym(text)
			};
		}
		/* Utility functions end */

		function function_ja() {
			return class_w.Me(this, '');
		}

		function function_fc(a) {
			return 66 > a ? 66 : 400 < a ? 400 : a;
		}

		function function_M(a, b) {
			if (null == b)
				return null;
			null == b.rh && (b.rh = globalScope.Ej++);
			var c;
			null == a.pj ? a.pj = {} : c = a.pj[b.rh];
			null == c && (c = b.bind(a),
				a.pj[b.rh] = c);
			return c;
		}

		class class_gc {
			constructor() {
				this.Fh = 0;
				this.Tp = 400;
				this.Pk = 64;
				this.fj = 32;
				this.la = window.document.createElement('canvas');
				this.cg = window.document.createElement('canvas');
				this.f = window.document.createElement('div');
				this.cg.width = this.la.width = this.fj;
				this.cg.height = this.la.height = this.Pk;
				this.Jh = this.cg.getContext('2d', null);
				this.c = this.la.getContext('2d', null);
				this.c.fillStyle = 'green';
				let a = []
					,
					b = 0
					,
					c = this.fj;
				for (; b < c;)
					++b,
						a.push(0);
				this.Fq = a;
				this.f.appendChild(this.cg);
				this.f.className = 'graph';
				this.f.hidden = true;
			}

			Ln(a) {
				this.f.hidden = false;
				0 > a ? (a = 150,
					this.c.fillStyle = '#c13535') : this.c.fillStyle = '#32FF32';
				let b = this.fj
					,
					c = this.Pk
					,
					d = this.Fh++;
				this.Fh >= b && (this.Fh = 0);
				this.Fq[d] = a;
				this.c.clearRect(d, 0, 1, c);
				a = a * c / this.Tp;
				this.c.fillRect(d, c - a, 1, a);
				this.Jh.clearRect(0, 0, b, c);
				this.Jh.drawImage(this.la, b - d - 1, 0);
				this.Jh.drawImage(this.la, -d - 1, 0);
			}
		}

		class class_Nb {
			constructor(a) {
				this.rd = null;
				this.dr = 1E4;
				this.Fd = true;
				a.ik();
				this.Sa = a.Sa;
				this.bd = a.bd;
				this.xe = a.xe;
				this.rd = a.rd;
				this.Qm = window.performance.now();
				let b = null
					,
					c = this;
				b = function () {
					var e = c.dr - c.es();
					0 >= e ? c.ja() : (window.clearTimeout(c.Sm),
						e = window.setTimeout(b, e + 1E3),
						c.Sm = e);
				}
				;
				b();
				this.Sa.oniceconnectionstatechange = function () {
					let e = c.Sa.iceConnectionState;
					'closed' != e && 'failed' != e || c.ja();
				}
				;
				a = 0;
				let d = this.bd;
				for (; a < d.length;) {
					let e = d[a];
					++a;
					e.onmessage = function (f) {
						c.Fd && (c.Qm = window.performance.now(),
						null != c.xg && c.xg(f.data));
					}
					;
					e.onclose = function () {
						c.ja();
					};
				}
			}

			es() {
				return window.performance.now() - this.Qm;
			}

			Ub(a, b) {
				if (this.Fd && (a = this.bd[a],
				'open' == a.readyState)) {
					b = b.Sg();
					try {
						a.send(b);
					}
					catch (c) {
						b = class_v.Lb(c).Gb(),
							globalScope.console.log(b);
					}
				}
			}

			ja() {
				window.clearTimeout(this.Sm);
				this.Fd && (this.Fd = false,
					this.Sa.close(),
				null != this.pf && this.pf());
			}
		}

		class class_Ra {
			constructor(a) {
				this.Up = a;
			}
		}

		class class_hc {
			constructor() {
				this.Wc = 0;
				this.bb = [];
				this.ds = new class_da(['Time is', 'Up!'], 16777215);
				this.fr = new class_da(['Red is', 'Victorious!'], 15035990);
				this.er = new class_da(['Red', 'Scores!'], 15035990);
				this.Wn = new class_da(['Blue is', 'Victorious!'], 625603);
				this.Vn = new class_da(['Blue', 'Scores!'], 625603);
				this.Eq = new class_da(['Game', 'Paused'], 16777215);
			}

			Ra(a) {
				this.bb.push(a);
			}

			io() {
				this.bb = [];
				this.Wc = 0;
			}

			B(a) {
				0 < this.bb.length && (this.Wc += a) > this.bb[0].To() && (this.Wc = 0,
					this.bb.shift());
			}

			Qc(a) {
				0 < this.bb.length && this.bb[0].Qc(a, this.Wc);
			}
		}

		class class_ic {
			constructor() {
				function a(g) {
					return new class_qa(g, f, function (h) {
							if (null == h)
								return null;
							try {
								return class_ka.Mh(h);
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
					return new class_qa(g, f, function (k) {
							return null != k ? '0' != k : h;
						}
						, function (k) {
							return k ? '1' : '0';
						}
					);
				}

				function c(g, h) {
					return new class_qa(g, f, function (k) {
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
					return new class_qa(g, f, function (k) {
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
					return new class_qa(g, f, function (l) {
							return null == l ? h : class_ha.Xc(l, k);
						}
						, function (l) {
							return l;
						}
					);
				}

				let f = class_zc.gn();
				this.ne = e('player_name', '', 25);
				this.Ac = d('view_mode', -1);
				this.Kh = d('fps_limit', 0);
				this.uh = e('avatar', null, 2);
				e('rctoken', null, 1024);
				this.Pm = b('team_colors', true);
				this.Rk = b('show_indicators', true);
				this.Si = c('sound_volume', 1);
				this.ve = b('sound_main', true);
				this.Ri = b('sound_chat', true);
				this.Hm = b('sound_highlight', true);
				this.Gm = b('sound_crowd', true);
				this.Uj = e('player_auth_key', null, 1024);
				this.Ad = d('extrapolation', 0);
				this.Fi = c('resolution_scale', 1);
				this.Em = b('show_avatars', true);
				this.gk = d('chat_height', 160);
				this.Ah = d('chat_focus_height', 140);
				this.Bh = c('chat_opacity', .8);
				this.fk = e('chat_bg_mode', 'compact', 50);
				this.di = b('low_latency_canvas', true);
				this.Xe = a('geo');
				this.Ye = a('geo_override');
				this.me = function () {
					return new class_qa('player_keys', f, function (g) {
							if (null == g)
								return class_ra.rk();
							try {
								return class_ra.Mh(g);
							}
							catch (h) {
								return class_ra.rk();
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

			Ph() {
				return null != this.Ye.A() ? this.Ye.A() : null != this.Xe.A() ? this.Xe.A() : new class_ka;
			}
		}

		class class_gb {
			constructor(a) {
				this.xk = false;
				this.Im = new class_Aa(class_u.Ma);
				this.Zj = new class_Aa(class_u.Ca);
				this.am = new class_Aa(class_u.ga);
				this.f = class_x.Ha(class_gb.O);
				let b = class_x.Aa(this.f);
				this.lc = b.get('room-name');
				this.Lm = b.get('start-btn');
				this.Nm = b.get('stop-btn');
				this.oi = b.get('pause-btn');
				this.Pn = b.get('auto-btn');
				this.cl = b.get('lock-btn');
				this.km = b.get('reset-all-btn');
				this.Zl = b.get('rec-btn');
				let c = b.get('link-btn')
					,
					d = b.get('leave-btn')
					,
					e = b.get('rand-btn');
				this.Hf = b.get('time-limit-sel');
				this.Af = b.get('score-limit-sel');
				this.Jm = b.get('stadium-name');
				this.Km = b.get('stadium-pick');
				let f = this;
				this.Km.onclick = function () {
					class_H.i(f.xq);
				}
				;
				this.Xh(b.get('red-list'), this.am, a);
				this.Xh(b.get('blue-list'), this.Zj, a);
				this.Xh(b.get('spec-list'), this.Im, a);
				this.jl(this.Hf, this.il());
				this.jl(this.Af, this.il());
				this.Hf.onchange = function () {
					class_D.i(f.Bq, f.Hf.selectedIndex);
				}
				;
				this.Af.onchange = function () {
					class_D.i(f.tq, f.Af.selectedIndex);
				}
				;
				this.Lm.onclick = function () {
					class_H.i(f.yq);
				}
				;
				this.Nm.onclick = function () {
					class_H.i(f.zq);
				}
				;
				this.oi.onclick = function () {
					class_H.i(f.mq);
				}
				;
				this.Pn.onclick = function () {
					class_H.i(f.bq);
				}
				;
				this.cl.onclick = function () {
					class_D.i(f.Aq, !f.bi);
				}
				;
				this.km.onclick = function () {
					null != f.le && (f.le(class_u.Ca),
						f.le(class_u.ga));
				}
				;
				this.Zl.onclick = function () {
					class_H.i(f.qq);
				}
				;
				c.onclick = function () {
					class_H.i(f.wq);
				}
				;
				d.onclick = function () {
					class_H.i(f.ke);
				}
				;
				e.onclick = function () {
					class_H.i(f.pq);
				}
				;
				this.Pj(false);
				this.Qj(false);
			}

			Xh(a, b, c) {
				class_x.replaceWith(a, b.f);
				let d = this;
				b.yg = function (e, f) {
					class_Ba.i(d.yg, e, f);
				}
				;
				b.le = function (e) {
					class_D.i(d.le, e);
				}
				;
				b.jq = function (e) {
					class_Ba.i(d.yg, c, e);
				}
				;
				b.sf = function (e) {
					class_D.i(d.sf, e);
				};
			}

			il() {
				let a = []
					,
					b = 0;
				for (; 15 > b;) {
					let c = b++;
					a.push(null == c ? 'null' : '' + c);
				}
				return a;
			}

			jl(a, b) {
				let c = 0;
				for (; c < b.length;) {
					let d = b[c++]
						,
						e = window.document.createElement('option');
					e.textContent = d;
					a.appendChild(e);
				}
			}

			Tr(a) {
				this.Zl.classList.toggle('active', a);
			}

			B(a, b) {
				this.ur != a.lc && (this.ur = a.lc,
					this.lc.textContent = a.lc);
				b = null == b ? false : b.eb;
				this.xk != b && (this.f.className = 'room-view' + (b ? ' admin' : ''),
					this.xk = b);
				var c = !b || null != a.M;
				this.Hf.disabled = c;
				this.Af.disabled = c;
				this.Km.disabled = c;
				c = null != a.M;
				this.Lm.hidden = c;
				this.Nm.hidden = !c;
				this.oi.hidden = !c;
				this.Hf.selectedIndex = a.Fa;
				this.Af.selectedIndex = a.jb;
				this.Jm.textContent = a.T.D;
				this.Jm.classList.toggle('custom', !a.T.$e());
				let d = a.Vc;
				for (var e = this.am, f = a.K, g = [], h = 0; h < f.length;) {
					var k = f[h];
					++h;
					k.ea == class_u.ga && g.push(k);
				}
				e.B(g, d, c, b);
				e = this.Zj;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == class_u.Ca && g.push(k);
				e.B(g, d, c, b);
				e = this.Im;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == class_u.Ma && g.push(k);
				e.B(g, d, c, b);
				this.km.disabled = c;
				this.bi != a.Vc && this.Pj(a.Vc);
				c && (a = 120 == a.M.Qa,
				this.El != a && this.Qj(a));
			}

			Pj(a) {
				this.bi = a;
				this.cl.innerHTML = this.bi ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
			}

			Qj(a) {
				this.El = a;
				this.oi.innerHTML = '<i class=\'icon-pause\'></i>' + (this.El ? 'Resume (P)' : 'Pause (P)');
			}
		}

		class class_hb {
			constructor() {
				this.Cf = null;
				this.f = class_x.Ha(class_hb.O);
				var a = class_x.Aa(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.qb);
				}
				;
				this.zh = a.get('change');
				this.zh.disabled = true;
				this.zh.onclick = function () {
					null != b.Cf && b.rm(b.Cf.index);
				}
				;
				a = a.get('list');
				this.ti(a);
				let c = class_ib.fi(a);
				window.setTimeout(function () {
					c.update();
				}, 0);
			}

			ti(a) {
				let b = this
					,
					c = 0
					,
					d = class_Ca.bb.length >> 2;
				for (; c < d;) {
					var e = c++;
					let f = e
						,
						g = class_Ca.bb[e << 2];
					e = class_Ca.bb[(e << 2) + 1].toLowerCase();
					let h = window.document.createElement('div');
					h.className = 'elem';
					h.innerHTML = '<div class="flagico f-' + e + '"></div> ' + g;
					a.appendChild(h);
					h.onclick = function () {
						null != b.Cf && b.Cf.Ja.classList.remove('selected');
						b.zh.disabled = false;
						b.Cf = {
							Ja: h,
							index: f
						};
						h.classList.add('selected');
					}
					;
					h.ondblclick = function () {
						b.rm(f);
					};
				}
			}

			rm(a) {
				let b = new class_ka;
				b.vb = class_Ca.bb[(a << 2) + 1].toLowerCase();
				b.Jc = class_Ca.bb[(a << 2) + 2];
				b.Lc = class_Ca.bb[(a << 2) + 3];
				class_m.j.Ye.ta(b);
				class_H.i(this.qb);
			}
		}

		class class_C {
			static Ss() {
				try {
					return window.self != window.top;
				}
				catch (a) {
					return true;
				}
			}

			static fh(a) {
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

			static qj(a) {
				class_C.Ss() && class_C.Ms(function () {
					class_Gc.qj();
					let b = null == class_m.j.Xe.A() ? class_ka.Zo().then(function (d) {
							class_m.j.Xe.ta(d);
						}, function () {
						}) : Promise.resolve(null)
						,
						c = class_Y.A(window.parent._gdir + 'res.dat', 'arraybuffer').then(function (d) {
							d = new JSZip(d);
							class_m.Na = new class_jc(d);
							return Promise.all([class_m.Na.Lo, class_C.fh(d.file('images/grass.png').asArrayBuffer()).then(function (e) {
								return class_m.ep = e;
							}), class_C.fh(d.file('images/concrete.png').asArrayBuffer()).then(function (e) {
								return class_m.qo = e;
							}), class_C.fh(d.file('images/concrete2.png').asArrayBuffer()).then(function (e) {
								return class_m.oo = e;
							}), class_C.fh(d.file('images/typing.png').asArrayBuffer()).then(function (e) {
								return class_m.Vm = e;
							})]);
						});
					Promise.all([c, b]).then(function () {
						class_C.at(a);
					});
				});
			}

			static Ms(a) {
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
					class_C.Yg = window.document.createElement('div'),
					window.document.body.appendChild(class_C.Yg),
					a = new class_jb(d),
					class_C.La(a.f)) : a();
			}

			static at(a) {
				window.document.body.innerHTML = '';
				class_C.Yg = window.document.createElement('div');
				window.document.body.appendChild(class_C.Yg);
				let b = null;
				b = function () {
					class_m.Na.lm();
					window.document.removeEventListener('click', b, true);
				}
				;
				window.document.addEventListener('click', b, true);
				a();
			}

			static La(a) {
				null != class_C.nn && class_C.nn.remove();
				null != a && (class_C.Yg.appendChild(a),
					class_C.nn = a);
			}
		}

		class class_kb {
			constructor() {
				this.Qb = -1;
				this.fb = new class_T(class_m.j.di.A());
				this.Wc = new class_kc;
				this.f = class_x.Ha(class_kb.O);
				let a = class_x.Aa(this.f);
				this.Sb = new class_Ob(a.get('red-score'), 0);
				this.Nb = new class_Ob(a.get('blue-score'), 0);
				class_x.replaceWith(a.get('timer'), this.Wc.f);
				class_x.replaceWith(a.get('canvas'), this.fb.la);
			}

			B(a) {
				var b = class_m.j.di.A();
				if (this.fb.up != b) {
					let c = this.fb.la;
					this.fb = new class_T(b);
					class_x.replaceWith(c, this.fb.la);
				}
				b = a.M;
				null == b ? this.f.hidden = true : (this.f.hidden = false,
					this.Wc.Wr(60 * a.Fa),
					this.Wc.Vr(b.Mc | 0),
					this.Nb.set(b.Nb),
					this.Sb.set(b.Sb),
					this.fb.Qc(a, this.Qb));
			}
		}

		class class_Sa {
			constructor(a, b, c) {
				this.rd = this.ze = null;
				this.xe = [];
				this.sk = 0;
				this.Al = false;
				this.hg = [];
				this.bd = [];
				this.Sa = new RTCPeerConnection({
					iceServers: b
				}, class_Sa.to);
				let d = this;
				this.Wh = new Promise(function (e) {
						d.pp = e;
					}
				);
				this.Sa.onicecandidate = function (e) {
					null == e.candidate ? d.pp(d.hg) : (e = e.candidate,
					null != e.candidate && '' != e.candidate && (null != d.vg && d.vg(e),
						d.hg.push(e)));
				}
				;
				for (b = 0; b < c.length;)
					this.yo(c[b++]);
				this.aa = a;
			}

			Xi(a) {
				null == a && (a = 1E4);
				window.clearTimeout(this.ze);
				this.ze = window.setTimeout(function_M(this, this.np), a);
			}

			xo(a, b) {
				let c = this;
				this.uk(this.Sa.setRemoteDescription(a).then(function () {
					return c.Sa.createAnswer();
				}), b, 500);
			}

			zo() {
				this.uk(this.Sa.createOffer(), [], 1E3);
			}

			uk(a, b, c) {
				let d = this;
				a.then(function (e) {
					return d.Sa.setLocalDescription(e).then(function () {
						return e;
					});
				}).then(function (e) {
					function f() {
						return e;
					}

					let g = 0;
					for (; g < b.length;)
						d.Mj(b[g++]);
					return class_Hc.gs(d.Wh, c).then(f, f);
				}).then(function (e) {
					d.li(e);
				}).catch(function () {
					d.fg();
				});
			}

			yo(a) {
				let b = {
					id: this.bd.length,
					negotiated: true,
					ordered: a.ordered
				};
				a.reliable || (b.maxRetransmits = 0);
				a = this.Sa.createDataChannel(a.name, b);
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

			Mj(a) {
				let b = this;
				window.setTimeout(function () {
					b.Sa.addIceCandidate(a);
				}, this.sk);
			}

			np() {
				this.fg();
			}

			fg() {
				null != this.kd && this.kd();
				this.ja();
			}

			ja() {
				this.ik();
				this.Sa.close();
			}

			ik() {
				window.clearTimeout(this.ze);
				this.li = this.Id = this.vg = this.kd = null;
				this.Sa.onicecandidate = null;
				this.Sa.ondatachannel = null;
				this.Sa.onsignalingstatechange = null;
				this.Sa.oniceconnectionstatechange = null;
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

		class class_Pb {
		}

		class class_zc {
			static gn() {
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

		class class_J {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Ta = b;
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

			Wl(a) {
				let b = this.tb(a);
				a = new ArrayBuffer(a);
				(new Uint8Array(a)).set(b);
				return a;
			}

			vf() {
				return this.s.getInt8(this.a++);
			}

			F() {
				return this.s.getUint8(this.a++);
			}

			wi() {
				let a = this.s.getInt16(this.a, this.Ta);
				this.a += 2;
				return a;
			}

			Rb() {
				let a = this.s.getUint16(this.a, this.Ta);
				this.a += 2;
				return a;
			}

			N() {
				let a = this.s.getInt32(this.a, this.Ta);
				this.a += 4;
				return a;
			}

			ib() {
				let a = this.s.getUint32(this.a, this.Ta);
				this.a += 4;
				return a;
			}

			vi() {
				let a = this.s.getFloat32(this.a, this.Ta);
				this.a += 4;
				return a;
			}

			v() {
				let a = this.s.getFloat64(this.a, this.Ta);
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
					c = class_J.Do(this.s, b),
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

			Yl() {
				return this.pe(this.F());
			}

			Hg() {
				let a = this.kc();
				return JSON.parse(a);
			}

			static Do(a, b) {
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

		class class_Aa {
			constructor(a) {
				this.Gd = new Map;
				this.f = class_x.Ha(class_Aa.O);
				this.f.className += ' ' + a.Co;
				let b = class_x.Aa(this.f);
				this.bb = b.get('list');
				this.$h = b.get('join-btn');
				this.Ei = b.get('reset-btn');
				a == class_u.Ma && this.Ei.remove();
				this.$h.textContent = '' + a.D;
				this.f.ondragover = this.f.vt = function (d) {
					-1 != d.dataTransfer.types.indexOf('player') && d.preventDefault();
				}
				;
				let c = this;
				this.f.ondrop = function (d) {
					d.preventDefault();
					d = d.dataTransfer.getData('player');
					null != d && (d = class_Q.parseInt(d),
					null != d && class_Ba.i(c.yg, d, a));
				}
				;
				this.$h.onclick = function () {
					class_D.i(c.jq, a);
				}
				;
				this.Ei.onclick = function () {
					class_D.i(c.le, a);
				};
			}

			B(a, b, c, d) {
				this.$h.disabled = b || c;
				this.Ei.disabled = c;
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
						f = this.Gd.get(e.X),
					null == f && (f = new class_lb(e),
						f.sf = function (h) {
							class_D.i(g.sf, h);
						}
						,
						this.Gd.set(e.X, f),
						this.bb.appendChild(f.f)),
						f.B(e, d),
						b.delete(e.X);
				d = b.values();
				for (b = d.next(); !b.done;)
					c = b.value,
						b = d.next(),
						this.Gd.get(c).f.remove(),
						this.Gd.delete(c);
				d = 0;
				for (b = a.length - 1; d < b;)
					e = d++,
						c = this.Gd.get(a[e].X).f,
						e = this.Gd.get(a[e + 1].X).f,
					c.nextSibling != e && this.bb.insertBefore(c, e);
			}
		}

		class class_jc {
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
				this.og = this.c.createGain();
				this.zi();
				this.og.connect(this.c.destination);
				let c = this;
				this.Lo = Promise.all([b('sounds/chat.ogg').then(function (d) {
					return c.ek = d;
				}), b('sounds/highlight.wav').then(function (d) {
					return c.Qk = d;
				}), b('sounds/kick.ogg').then(function (d) {
					return c.yp = d;
				}), b('sounds/goal.ogg').then(function (d) {
					return c.bp = d;
				}), b('sounds/join.ogg').then(function (d) {
					return c.wp = d;
				}), b('sounds/leave.ogg').then(function (d) {
					return c.Cp = d;
				}), b('sounds/crowd.ogg').then(function (d) {
					c.Bo = d;
					c.nk = new class_lc(c.Bo, c.c);
					c.nk.connect(c.og);
				})]);
			}

			lm() {
				this.c.resume();
			}

			ld(a) {
				let b = this.c.createBufferSource();
				b.buffer = a;
				b.connect(this.og);
				b.start();
			}

			zi() {
				let a = class_m.j.Si.A();
				class_m.j.ve.A() || (a = 0);
				this.og.gain.value = a;
			}
		}

		class class_mc {
			constructor(a, b) {
				this.r = new RegExp(a, b.split('u').join(''));
			}

			match(a) {
				this.r.global && (this.r.lastIndex = 0);
				this.r.pc = this.r.exec(a);
				this.r.lh = a;
				return null != this.r.pc;
			}

			on(a) {
				if (null != this.r.pc && 0 <= a && a < this.r.pc.length)
					return this.r.pc[a];
				throw class_v.C('EReg::matched');
			}

			Xs() {
				if (null == this.r.pc)
					throw class_v.C('No string matched');
				return {
					wj: this.r.pc.index,
					Us: this.r.pc[0].length
				};
			}

			Ws(a, b) {
				var c;
				null == c && (c = -1);
				if (this.r.global) {
					this.r.lastIndex = b;
					this.r.pc = this.r.exec(0 > c ? a : class_O.substr(a, 0, b + c));
					if (b = null != this.r.pc)
						this.r.lh = a;
					return b;
				}
				if (c = this.match(0 > c ? class_O.substr(a, b, null) : class_O.substr(a, b, c)))
					this.r.lh = a,
						this.r.pc.index += b;
				return c;
			}
		}

		class class_mb {
			constructor() {
				this.Gl = new class_gc;
				this.f = class_x.Ha(class_mb.O);
				let a = class_x.Aa(this.f);
				this.Dg = a.get('ping');
				this.Qo = a.get('fps');
				class_x.replaceWith(a.get('graph'), this.Gl.f);
			}

			Sr(a, b) {
				this.Dg.textContent = 'Ping: ' + a + ' - ' + b;
			}

			Am(a) {
				this.Qo.textContent = 'Fps: ' + a;
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

		/** Point */
		class class_P {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_R {
			constructor() {
				this.w = 32;
				this.h = 63;
				this.o = 1;
				this.Ua = 0;
				this.xa = new class_P(0, 0);
			}

			fa(a) {
				let b = this.xa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.Ua);
				a.u(this.o);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				let b = this.xa;
				b.x = a.v();
				b.y = a.v();
				this.Ua = a.v();
				this.o = a.v();
				this.h = a.N();
				this.w = a.N();
			}
		}

		class class_Da {
		}

		class class_nc {
			constructor(a, b) {
				this.pn = 0;
				this.version = 1;
				this.kh = 0;
				this.Vd = class_A.ia(1E3);
				this.Nf = class_A.ia(16384);
				this.version = b;
				let c = this.kh = a.$;
				this.sj = a;
				a.U.fa(this.Nf);
				let d = this;
				a.hc = function (f) {
					let g = a.$;
					d.Nf.mb(g - c);
					c = g;
					d.Nf.Wb(f.R);
					class_p.vj(f, d.Nf);
				}
				;
				this.Vd.Wb(0);
				let e = this.kh;
				a.U.Cm(function (f) {
					let g = a.$;
					d.Vd.mb(g - e);
					d.Vd.m(f);
					d.pn++;
					e = g;
				});
			}

			stop() {
				this.sj.hc = null;
				this.sj.U.Cm(null);
				this.Vd.s.setUint16(0, this.pn, this.Vd.Ta);
				this.Vd.Xb(this.Nf.Vb());
				let a = pako.deflateRaw(this.Vd.Vb())
					,
					b = class_A.ia(a.byteLength + 32);
				b.Xg('HBR2');
				b.ub(this.version);
				b.ub(this.sj.$ - this.kh);
				b.Xb(a);
				return b.Vb();
			}
		}

		class class_U {
			constructor() {
			}

			ms() {
				return 'idkey.' + this.ij + '.' + this.jj + '.' + this.qk;
			}

			Zr(a) {
				try {
					let b = class_A.ia(1024);
					b.m(1);
					let c = b.a;
					b.Wb(0);
					let d = b.a;
					b.oc(this.ij);
					b.oc(this.jj);
					b.Xb(a);
					let e = b.a - d;
					b.s.setUint16(c, e, b.Ta);
					let f = new Uint8Array(b.s.buffer, b.s.byteOffset + d, e);
					return window.crypto.subtle.sign(class_U.Fm, this.Tl, f).then(function (g) {
						b.Vg(g);
						return b.Vb();
					});
				}
				catch (b) {
					return Promise.reject(class_v.Lb(b).Gb());
				}
			}

			static So() {
				try {
					return window.crypto.subtle.generateKey(class_U.sh, true, ['sign', 'verify']).then(function (a) {
						let b = a.privateKey;
						return window.crypto.subtle.exportKey('jwk', b).then(function (c) {
							let d = c.y
								,
								e = c.d
								,
								f = new class_U;
							f.ij = c.x;
							f.jj = d;
							f.qk = e;
							f.Tl = b;
							return f;
						});
					});
				}
				catch (a) {
					return Promise.reject(class_v.Lb(a).Gb());
				}
			}

			static Ro(a) {
				a = a.split('.');
				if (4 != a.length || 'idkey' != a[0])
					return Promise.reject('Invalid id format');
				let b = a[1]
					,
					c = a[2]
					,
					d = a[3];
				return class_U.Ds(b, c, d).then(function (e) {
					let f = new class_U;
					f.ij = b;
					f.jj = c;
					f.qk = d;
					f.Tl = e;
					return f;
				});
			}

			static xs(a, b) {
				try {
					let c = new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
					c.F();
					let d = c.tb(c.Rb())
						,
						e = c.tb()
						,
						f = new class_J(new DataView(d.buffer, d.byteOffset, d.byteLength), false)
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
					return class_U.Cs(g, h).then(function (n) {
						return window.crypto.subtle.verify(class_U.Fm, n, e, d);
					}).then(function (n) {
						if (!n)
							throw class_v.C(null);
						return g;
					});
				}
				catch (c) {
					return Promise.reject(class_v.Lb(c).Gb());
				}
			}

			static Ds(a, b, c) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['sign'],
						kty: 'EC',
						d: c,
						x: a,
						y: b
					}, class_U.sh, true, ['sign']);
				}
				catch (d) {
					return Promise.reject(class_v.Lb(d).Gb());
				}
			}

			static Cs(a, b) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['verify'],
						kty: 'EC',
						x: a,
						y: b
					}, class_U.sh, true, ['verify']);
				}
				catch (c) {
					return Promise.reject(class_v.Lb(c).Gb());
				}
			}
		}

		class class_B {
			static Op() {
				class_C.qj(function () {
					class_B.Bk(class_B.Xq);
				});
				class_B.Fp();
			}

			static Fp() {
				let a = class_m.j.Uj.A();
				null == a ? class_U.So().then(function (b) {
					class_B.Ue = b;
					class_m.j.Uj.ta(b.ms());
				}).catch(function () {
				}) : class_U.Ro(a).then(function (b) {
					return class_B.Ue = b;
				}).catch(function () {
				});
			}

			static Vo() {
				let a = class_zc.gn();
				return null != a ? null != a.getItem('crappy_router') : false;
			}

			static Bk(a) {
				let b = new class_nb(class_m.j.ne.A());
				b.vl = function (c) {
					class_m.j.ne.ta(c);
					class_m.Na.lm();
					a();
				}
				;
				class_C.La(b.f);
				b.Eb.focus();
			}

			static Ck(a, b) {
				a = new class_Z(a);
				a.Va = b;
				class_C.La(a.f);
			}

			static Ho(a, b) {
				function c() {
					let f = new class_Ta('Failed', null);
					f.Va = function () {
						class_B.yb();
					}
					;
					class_C.La(f.f);
				}

				function d(f) {
					f = f.sitekey;
					if (null == f)
						throw class_v.C(null);
					class_B.Ck(f, function (g) {
						e(a, g);
					});
				}

				class_C.La((new class_aa('Connecting', 'Connecting...', [])).f);
				let e = null;
				e = function (f, g) {
					class_Y.Sl(class_m.Pe + 'api/client', 'room=' + f + '&rcr=' + g, class_Y.Gj).then(function (h) {
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

			static Xq() {
				let a = class_Ac.A()
					,
					b = a.get('c')
					,
					c = a.get('p');
				a.get('v');
				null != b ? null != c ? class_B.Ih(b) : class_B.ag(b) : class_B.yb();
			}

			static yb() {
				let a = new class_Ua(class_m.j.Ph());
				class_C.La(a.Ja);
				a.qn = function (b) {
					if (9 != b.Ed.Rd) {
						let c;
						9 > b.Ed.Rd ? (b = 'Old version room',
							c = 'The room is running an older version, an update must have happened recently.') : (b = 'New version',
							c = 'The room is running a new version of haxball, refresh the site to update.');
						let d = new class_aa(b, c, ['Ok']);
						class_C.La(d.f);
						d.Va = function () {
							class_C.La(a.Ja);
							d.Va = null;
						};
					}
					else
						b.Ed.Kb ? class_B.Ih(b.aa) : class_B.ag(b.aa);
				}
				;
				a.ct = function () {
					class_B.Io();
				}
				;
				a.bt = function () {
					class_B.Bk(class_B.yb);
				}
				;
				a.et = function () {
					class_B.Ek();
				}
				;
				a.dt = function (b) {
					class_B.Jo(b);
				};
			}

			static Ek() {
				let a = new class_la(true)
					,
					b = window.document.createElement('div');
				b.className = 'view-wrapper';
				b.appendChild(a.f);
				class_C.La(b);
				a.qb = function () {
					class_B.yb();
				}
				;
				a.cq = function () {
					let c = new class_hb
						,
						d = window.document.createElement('div');
					d.className = 'view-wrapper';
					d.appendChild(c.f);
					class_C.La(d);
					c.qb = function () {
						class_B.Ek();
					};
				};
			}

			static hi(a, b) {
				return '' + globalScope.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
			}

			static Io() {
				let a = class_m.j.ne.A()
					,
					b = new class_ob('' + a + '\'s room');
				class_C.La(b.f);
				b.ki = function () {
					class_B.yb();
				}
				;
				b.iq = function (c) {
					function d() {
						if (!c.pt) {
							var t = new class_Qb;
							t.Rd = 9;
							t.D = g.lc;
							t.K = g.K.length;
							t.hf = k.rg + 1;
							t.vb = f.vb;
							t.Kb = null != k.Kb;
							t.Jc = f.Jc;
							t.Lc = f.Lc;
							var z = class_A.ia(16);
							t.fa(z);
							k.Pi(z.Sg());
						}
					}

					class_C.La((new class_aa('Creating room', 'Connecting...', [])).f);
					let e = null
						,
						f = class_m.j.Ph()
						,
						g = new class_sa;
					g.lc = c.name;
					let h = new class_ta;
					h.D = a;
					h.eb = true;
					h.country = f.vb;
					h.Zb = class_m.j.uh.A();
					g.K.push(h);
					let k = new class_Rb({
						iceServers: class_m.ig,
						tj: class_m.Pe + 'api/host',
						state: g,
						version: 9
					});
					k.rg = c.Ys - 1;
					k.Kb = c.password;
					d();
					let l = new class_Ea(k)
						,
						n = false;
					k.rf = function (t, z) {
						class_B.Ck(t, function (K) {
							z(K);
							class_C.La(l.l.f);
							n = true;
						});
					}
					;
					let r = window.setInterval(function () {
						k.sa(class_Fa.na(k));
					}, 3E3);
					k.sl = function (t) {
						null != g.oa(t) && k.sa(class_ma.na(t, 'Bad actor', false));
					}
					;
					k.gq = function (t, z) {
						let K = z.kc();
						if (25 < K.length)
							throw class_v.C('name too long');
						let N = z.kc();
						if (3 < N.length)
							throw class_v.C('country too long');
						z = z.Bb();
						if (null != z && 2 < z.length)
							throw class_v.C('avatar too long');
						k.sa(class_Ga.na(t, K, N, z));
						d();
					}
					;
					k.hq = function (t) {
						null != g.oa(t) && k.sa(class_ma.na(t, null, false));
					}
					;
					k.wg = function (t) {
						e = t;
						l.Lg = class_B.hi(t, null != k.Kb);
						n || (n = true,
							class_C.La(l.l.f));
					}
					;
					l.Nh.nq = function (t, z, K, N) {
						k.No(t, z, K, N);
					}
					;
					l.Nh.oq = function () {
						d();
					}
					;
					l.l.ke = function () {
						k.ja();
						l.ja();
						class_B.yb();
						window.clearInterval(r);
					}
					;
					l.$f.Og = function (t) {
						k.Kb = t;
						d();
						null != e && (l.Lg = class_B.hi(e, null != k.Kb));
					}
					;
					l.$f.Bm = function (t) {
						k.Oi(t);
					}
					;
					l.$f.be = function_M(k, k.be);
				};
			}

			static Ih(a) {
				let b = new class_pb;
				class_C.La(b.f);
				b.Va = function (c) {
					null == c ? class_B.yb() : class_B.ag(a, c);
				};
			}

			static Jo(a) {
				try {
					let b = new class_oc(new class_Sb(new Uint8Array(a), new class_sa, 3));
					b.qe.ke = function () {
						b.ja();
						class_B.yb();
					}
					;
					class_C.La(b.l.f);
				}
				catch (b) {
					let c = class_v.Lb(b).Gb();
					if (c instanceof class_Tb)
						a = new class_aa('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']),
							class_C.La(a.f),
							a.Va = function (d) {
								0 == d ? (d = window.top.location,
									window.top.open(d.protocol + '//' + d.hostname + (null != d.port ? ':' + d.port : '') + '/replay?v=' + c.Rd, '_self')) : class_B.yb();
							}
						;
					else {
						let d = new class_aa('Replay error', 'Couldn\'t load the file.', ['Ok']);
						class_C.La(d.f);
						d.Va = function () {
							d.Va = null;
							class_B.yb();
						};
					}
				}
			}

			static ag(a, b, c) {
				try {
					let d = class_B.Vo()
						,
						e = new class_sa
						,
						f = class_A.ia();
					f.oc(class_m.j.ne.A());
					f.oc(class_m.j.Ph().vb);
					f.Fb(class_m.j.uh.A());
					let g = new class_Ha(a, {
							iceServers: class_m.ig,
							tj: class_m.Bs,
							state: e,
							version: 9,
							rt: f.Sg(),
							password: b,
							vn: d,
							zn: c,
							Ls: class_B.Ue
						})
						,
						h = new class_qb;
					h.ca('Connecting to master...');
					h.yh.onclick = function () {
						g.Jd = null;
						g.qf = null;
						g.ja();
						class_B.yb();
					}
					;
					class_C.La(h.f);
					let k = function (r, t) {
							r = new class_Ta(r, t);
							r.Va = function () {
								class_B.yb();
							}
							;
							class_C.La(r.f);
						}
						,
						l = function () {
							let r = new class_aa('Connection Failed', '', ['Ok']);
							r.ce.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
							r.Va = function () {
								class_B.yb();
							}
							;
							class_C.La(r.f);
						}
						,
						n = function () {
							let r = new class_Ea(g);
							g.wl = function (t) {
								r.l.Ff.Sr(g.Eg.jh() | 0, g.Eg.max() | 0);
								r.l.Ff.Gl.Ln(t);
							}
							;
							r.Lg = class_B.hi(a, false);
							class_C.La(r.l.f);
							r.l.ke = function () {
								g.Jd = null;
								g.ja();
								r.ja();
								class_B.yb();
							}
							;
							g.Jd = function () {
								g.Jd = null;
								r.ja();
								let t = null == r.Od ? null : r.Od.stop();
								k(g.wk, t);
							};
						};
					g.qf = function (r) {
						g.qf = null;
						g.Jd = null;
						switch (r.ob) {
							case 1:
								l();
								break;
							case 2:
								switch (r.reason) {
									case 4004:
										class_B.Ho(a, function (t) {
											class_B.ag(a, b, t);
										});
										break;
									case 4101:
										null == b ? class_B.Ih(a) : k(class_Ha.Ch(r), null);
										break;
									default:
										k(class_Ha.Ch(r), null);
								}
								break;
							default:
								k(class_Ha.Ch(r), null);
						}
					}
					;
					g.Jd = function (r) {
						switch (r) {
							case 1:
								h.ca('Connecting to peer...');
								break;
							case 2:
								h.ca('Awaiting state...');
								break;
							case 3:
								n();
						}
					}
					;
					g.sq = function () {
						h.ca('Trying reverse connection...');
					};
				}
				catch (d) {
					c = class_v.Lb(d).Gb(),
						globalScope.console.log(c),
						c = new class_aa('Unexpected Error', '', []),
						c.ce.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.',
						class_C.La(c.f);
				}
			}
		}

		/** Room state */
		class class_sa {
			constructor() {
				this.jc = -1;
				this.T = this.ic = null;
				this.Hd = 2;
				this.fd = 0;
				this.je = 1;
				this.jb = this.Fa = 3;
				this.Vc = false;
				/** @type {class_ba} */
				this.M = null;
				/** @type {class_ta[]} */
				this.K = [];
				this.lc = '';
				/** @type {class_q} */
				this.T = class_q.Oh()[0];
				this.lb = [null, new class_ua, new class_ua];
				this.lb[1].gb.push(class_u.ga.S);
				this.lb[2].gb.push(class_u.Ca.S);
			}

			bs(a) {
				if (null == this.M) {
					this.M = new class_ba;
					for (var b = 0, c = this.K; b < c.length;) {
						let d = c[b];
						++b;
						d.J = null;
						d.Mb = 0;
					}
					this.M.rp(this);
					null != this.Vi && this.Vi(a);
				}
			}

			Yf(a, b, c) {
				if (b.ea != c) {
					b.ea = c;
					class_O.remove(this.K, b);
					this.K.push(b);
					if (null != this.M) {
						null != b.J && (class_O.remove(this.M.ua.H, b.J),
							b.J = null);
						this.M.Tk(b);
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
								if (h != b && h.ea == b.ea && h.Mb == d) {
									e = false;
									break;
								}
							}
						}
						b.Mb = d;
					}
					class_pc.i(this.Ql, a, b, c);
				}
			}

			oa(a) {
				let b = 0
					,
					c = this.K;
				for (; b < c.length;) {
					let d = c[b];
					++b;
					if (d.X == a)
						return d;
				}
				return null;
			}

			B(a) {
				null != this.M && this.M.B(a);
			}

			fa(a) {
				a.Fb(this.lc);
				a.m(this.Vc ? 1 : 0);
				a.P(this.jb);
				a.P(this.Fa);
				a.hj(this.je);
				a.m(this.fd);
				a.m(this.Hd);
				this.T.fa(a);
				a.m(null != this.M ? 1 : 0);
				null != this.M && this.M.fa(a);
				a.m(this.K.length);
				let b = 0
					,
					c = this.K;
				for (; b < c.length;)
					c[b++].va(a);
				this.lb[1].fa(a);
				this.lb[2].fa(a);
			}

			ka(a) {
				this.lc = a.Bb();
				this.Vc = 0 != a.F();
				this.jb = a.N();
				this.Fa = a.N();
				this.je = a.wi();
				this.fd = a.F();
				this.Hd = a.F();
				this.T = class_q.ka(a);
				var b = 0 != a.F();
				this.M = null;
				b && (this.M = new class_ba,
					this.M.ka(a, this));
				b = null == this.M ? null : this.M.ua.H;
				let c = a.F();
				for (var d = this.K; d.length > c;)
					d.pop();
				for (d = 0; d < c;) {
					let e = new class_ta;
					e.wa(a, b);
					this.K[d++] = e;
				}
				this.lb[1].ka(a);
				this.lb[2].ka(a);
			}

			Lk() {
				let a = 0;
				var b = class_A.ia();
				this.fa(b);
				for (b = b.ks(); 4 <= b.s.byteLength - b.a;)
					a ^= b.N();
				return a;
			}

			Uo() {
				let a = class_A.ia(4);
				a.P(this.Lk());
				return a.Sg();
			}

			no(a) {
				a = (new class_J(new DataView(a))).N();
				class_D.i(this.Eo, this.Lk() != a);
			}

			Cm(a) {
				this.hm = a;
			}

			Ob(a) {
				if (0 == a)
					return true;
				a = this.oa(a);
				return null != a && a.eb ? true : false;
			}

			Pr(a, b, c, d) {
				this.Hd = 0 > b ? 0 : 255 < b ? 255 : b;
				this.fd = 0 > c ? 0 : 255 < c ? 255 : c;
				0 > d ? d = 0 : 100 < d && (d = 100);
				this.je = this.fd * d;
				class_Ub.i(this.Xk, a, this.Hd, this.fd, d);
			}

			uc() {
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_sa),
					this.jc = a,
					class_sa.zd(b, this));
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
						d[g] = e[g].Qs();
					}
				}
				a.M = null == b.M ? null : b.M.uc();
				a.Vc = b.Vc;
				a.jb = b.jb;
				a.Fa = b.Fa;
				a.je = b.je;
				a.fd = b.fd;
				a.Hd = b.Hd;
				a.T = b.T;
				a.lb = b.lb;
			}
		}

		class class_rb {
			constructor(a, b) {
				this.f = class_x.Ha(class_rb.O);
				let c = class_x.Aa(this.f);
				this.kf = c.get('name');
				this.Tf = c.get('admin');
				this.af = c.get('kick');
				this.wd = c.get('close');
				let d = this;
				this.Tf.onclick = function () {
					class_Ba.i(d.aq, d.Qb, !d.Jl);
				}
				;
				this.af.onclick = function () {
					class_D.i(d.mi, d.Qb);
				}
				;
				this.wd.onclick = function () {
					class_H.i(d.qb);
				}
				;
				this.Qb = a.X;
				this.Sj(a.D);
				this.Rj(a.eb);
				this.Tf.disabled = !b || 0 == this.Qb;
				this.af.disabled = !b || 0 == this.Qb;
			}

			B(a, b) {
				a = a.oa(this.Qb);
				null == a ? class_H.i(this.qb) : (this.ts(a),
					this.Tf.disabled = !b || 0 == this.Qb,
					this.af.disabled = !b || 0 == this.Qb);
			}

			ts(a) {
				this.ne != a.D && this.Sj(a.D);
				this.Jl != a.eb && this.Rj(a.eb);
			}

			Sj(a) {
				this.ne = a;
				this.kf.textContent = a;
			}

			Rj(a) {
				this.Jl = a;
				this.Tf.textContent = a ? 'Remove Admin' : 'Give Admin';
			}
		}

		class class_Va {
			constructor() {
				this.list = [];
			}

			jn(a) {
				let b = 0
					,
					c = a.nb
					,
					d = a.Dc
					,
					e = 0
					,
					f = this.list;
				for (; e < f.length;) {
					var g = f[e];
					++e;
					let h = g.nb;
					if (h > c)
						break;
					if (h == c) {
						g = g.Dc;
						if (g > d)
							break;
						g == d && ++d;
					}
					++b;
				}
				a.Dc = d;
				this.list.splice(b, 0, a);
			}

			it(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].nb >= a);)
					++b;
				this.list.splice(0, b);
			}

			Is(a, b) {
				let c = this.list;
				for (; 0 < c.length;)
					c.pop();
				class_Va.$s(a.list, b.list, this.list);
			}

			jt(a) {
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

			Js(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].nb >= a);)
					++b;
				return b;
			}

			static $s(a, b, c) {
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
						if (h.nb <= k.nb) {
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
			static Aa(a) {
				let b = new Map
					,
					c = 0;
				for (a = a.querySelectorAll('[data-hook]'); c < a.length;) {
					let d = a[c++];
					b.set(d.getAttribute('data-hook'), d);
				}
				return b;
			}

			static Ha(a, b) {
				null == b && (b = 'div');
				b = window.document.createElement(b);
				b.innerHTML = a;
				return b.firstElementChild;
			}

			static replaceWith(a, b) {
				a.parentElement.replaceChild(b, a);
			}

			static Mf(a) {
				let b = a.firstChild;
				for (; null != b;)
					a.removeChild(b),
						b = a.firstChild;
			}
		}

		class class_pc {
			static i(a, b, c, d) {
				null != a && a(b, c, d);
			}
		}

		class class_sb {
			constructor(a) {
				this.ml = a.get('notice');
				this.vo = a.get('notice-contents');
				this.wd = a.get('notice-close');
				this.bm();
			}

			bm() {
				let a = this;
				class_Y.Kk(class_m.Pe + 'api/notice').then(function (b) {
					let c = b.content;
					null != c && '' != c && class_sb.jo != c && (a.vo.innerHTML = c,
							a.ml.hidden = false,
							a.wd.onclick = function () {
								class_sb.jo = c;
								return a.ml.hidden = true;
							}
					);
				});
			}
		}

		class class_tb {
			constructor() {
				this.yk = null;
				this.f = class_x.Ha(class_tb.O);
				var a = class_x.Aa(this.f);
				this.mg = a.get('link');
				let b = a.get('copy');
				a = a.get('close');
				let c = this;
				this.mg.onfocus = function () {
					c.mg.select();
				}
				;
				b.onclick = function () {
					c.mg.select();
					return window.document.execCommand('Copy');
				}
				;
				a.onclick = function () {
					class_H.i(c.qb);
				};
			}

			Qr(a) {
				this.yk != a && (this.yk = a,
					this.mg.value = a);
			}
		}

		class class_ub {
			static Ep() {
				if (null != class_ub.ui)
					return class_ub.ui;
				class_ub.ui = new Promise(function (a, b) {
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
				return class_ub.ui;
			}
		}

		class class_Ta {
			constructor(a, b) {
				this.f = class_x.Ha(class_Ta.O);
				let c = class_x.Aa(this.f);
				this.Yp = c.get('ok');
				let d = this;
				this.Yp.onclick = function () {
					class_H.i(d.Va);
				}
				;
				this.gm = c.get('replay');
				let e = null != b;
				this.gm.hidden = !e;
				e && (this.gm.onclick = function () {
						class_Ea.qm(b);
					}
				);
				c.get('reason').textContent = a;
			}
		}

		class class_va {
		}

		class class_da {
			constructor(a, b) {
				let c = []
					,
					d = 0;
				for (; d < a.length;)
					c.push(this.Qp(a[d++], b));
				this.gf = c;
			}

			To() {
				return 2.31 + .1155 * (this.gf.length - 1);
			}

			Qc(a, b) {
				b /= 2.31;
				let c = 0;
				a.imageSmoothingEnabled = true;
				let d = 0
					,
					e = this.gf;
				for (; d < e.length;) {
					let g = e[d];
					++d;
					var f = b - .05 * c;
					let h = class_da.An.eval(f)
						,
						k = 35 * -(this.gf.length - 1) + 70 * c;
					f = 180 * class_da.Bn.eval(f);
					a.globalAlpha = h;
					a.drawImage(g, f * (0 != (c & 1) ? -1 : 1) - .5 * g.width, k - .5 * g.height);
					a.globalAlpha = 1;
					++c;
				}
				a.imageSmoothingEnabled = false;
			}

			tr(a) {
				let b = 0;
				a.imageSmoothingEnabled = true;
				let c = 0
					,
					d = this.gf;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					a.drawImage(e, .5 * -e.width, 35 * -(this.gf.length - 1) + 70 * b - .5 * e.height);
					++b;
				}
				a.imageSmoothingEnabled = false;
			}

			nc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			Qp(a, b) {
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

		class class_Vb {
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

		class class_nb {
			constructor(a) {
				function b() {
					d.Ic() && null != d.vl && d.vl(d.Eb.value);
				}

				this.f = class_x.Ha(class_nb.O);
				let c = class_x.Aa(this.f);
				this.Eb = c.get('input');
				this.mf = c.get('ok');
				let d = this;
				this.Eb.maxLength = 25;
				this.Eb.value = a;
				this.Eb.oninput = function () {
					d.B();
				}
				;
				this.Eb.onkeydown = function (e) {
					13 == e.keyCode && b();
				}
				;
				this.mf.onclick = b;
				this.B();
			}

			Ic() {
				let a = this.Eb.value;
				return 25 >= a.length ? 0 < a.length : false;
			}

			B() {
				this.mf.disabled = !this.Ic();
			}
		}

		class class_ha {
			static Xc(a, b) {
				return a.length <= b ? a : class_O.substr(a, 0, b);
			}

			static Gs(a) {
				let b = ''
					,
					c = 0
					,
					d = a.byteLength;
				for (; c < d;)
					b += class_ca.eh(a[c++], 2);
				return b;
			}
		}

		class class_ca {
			static Ts(a, b) {
				a = class_O.mj(a, b);
				return 8 < a && 14 > a ? true : 32 == a;
			}

			static mt(a) {
				let b = a.length
					,
					c = 0;
				for (; c < b && class_ca.Ts(a, b - c - 1);)
					++c;
				return 0 < c ? class_O.substr(a, 0, b - c) : a;
			}

			static Kf(a) {
				var b;
				let c = '';
				for (b = 2 - a.length; c.length < b;)
					c += '0';
				return c + (null == a ? 'null' : '' + a);
			}

			static replace(a, b, c) {
				return a.split(b).join(c);
			}

			static eh(a, b) {
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

		class class_vb {
			constructor() {
				this.kb = null;
				this.f = class_x.Ha(class_vb.O);
				let a = class_x.Aa(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.ki);
				}
				;
				this.pi = a.get('pick');
				this.tk = a.get('delete');
				this.Ik = a.get('export');
				let c = a.get('list')
					,
					d = a.get('file');
				this.Ug();
				this.pi.onclick = function () {
					null != b.kb && b.kb.Xd().then(function (e) {
						class_D.i(b.Ag, e);
					});
				}
				;
				this.tk.onclick = function () {
					if (null != b.kb) {
						var e = b.kb.cn;
						null != e && (b.kb.Ja.remove(),
							b.kb = null,
							e(),
							b.Ug());
					}
				}
				;
				this.Ik.onclick = function () {
					null != b.kb && b.kb.Xd().then(function (e) {
						class_Wb.Cr(e.Ae(), e.D + '.hbs');
					});
				}
				;
				this.ti(c);
				this.Vl = class_ib.fi(c);
				window.setTimeout(function () {
					b.Vl.update();
				}, 0);
				d.onchange = function () {
					var e = d.files;
					if (!(1 > e.length)) {
						e = e.item(0);
						var f = new FileReader;
						f.onload = function () {
							try {
								var g = f.result;
								let h = new class_q;
								h.al(g);
								class_D.i(b.Ag, h);
							}
							catch (h) {
								g = class_v.Lb(h).Gb(),
									g instanceof SyntaxError ? class_D.i(b.ni, 'SyntaxError in line: ' + class_Q.Fe(g.lineNumber)) : g instanceof class_Ra ? class_D.i(b.ni, g.Up) : class_D.i(b.ni, 'Error loading stadium file.');
							}
						}
						;
						f.readAsText(e);
					}
				};
			}

			Ug() {
				this.pi.disabled = null == this.kb;
				this.tk.disabled = null == this.kb || null == this.kb.cn;
				this.Ik.disabled = null == this.kb;
			}

			hl(a, b, c) {
				let d = window.document.createElement('div');
				d.textContent = a;
				d.className = 'elem';
				null != c && d.classList.add('custom');
				let e = {
						Ja: d,
						Xd: b,
						cn: c
					}
					,
					f = this;
				d.onclick = function () {
					null != f.kb && f.kb.Ja.classList.remove('selected');
					f.kb = e;
					d.classList.add('selected');
					f.Ug();
				}
				;
				d.ondblclick = function () {
					f.kb = e;
					f.Ug();
					return f.pi.onclick();
				}
				;
				return d;
			}

			ti(a) {
				let b = class_q.Oh()
					,
					c = 0;
				for (; c < b.length;) {
					let e = b[c];
					++c;
					a.appendChild(this.hl(e.D, function () {
						return Promise.resolve(e);
					}, null));
				}
				let d = this;
				class_wb.getAll().then(function (e) {
					let f = 0;
					for (; f < e.length;) {
						let g = e[f];
						++f;
						let h = g.id;
						a.appendChild(d.hl(g.name, function () {
							return class_wb.get(h);
						}, function () {
							return class_wb.delete(h);
						}));
					}
					d.Vl.update();
				});
			}
		}

		class class_lc {
			constructor(a, b) {
				this.ph = null;
				this.ot = .025;
				this.De = this.mh = this.Of = 0;
				this.bh = b.createGain();
				this.bh.gain.value = 0;
				b = b.createBufferSource();
				b.buffer = a;
				b.connect(this.bh);
				b.loop = true;
				b.start();
			}

			update() {
				var a = window.performance.now();
				let b = a - this.mn;
				this.mn = a;
				this.De += (this.mh - this.De) * this.ot;
				this.Of -= b;
				0 >= this.Of && (this.Of = this.mh = 0);
				0 >= this.mh && .05 > this.De && (window.clearInterval(this.ph),
					this.ph = null,
					this.De = 0);
				a = class_m.j.Gm.A() ? this.De : 0;
				this.bh.gain.value = a;
			}

			zj(a) {
				this.mh = a;
				this.Of = 166.66666666666666;
				let b = this;
				null == this.ph && (this.ph = window.setInterval(function () {
					b.update();
				}, 17),
					this.mn = window.performance.now());
			}

			connect(a) {
				this.bh.connect(a);
			}

			qt(a) {
				let b = a.M;
				if (null != b)
					if (2 == b.Db)
						0 >= b.Qa && this.zj(1);
					else if (1 == b.Db) {
						let e = b.ua.H[0]
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
							z = class_u.ga.Hh
							,
							K = 0;
						for (a = a.K; K < a.length;) {
							let N = a[K];
							++K;
							if (null == N.J)
								continue;
							var c = N.J.a;
							let xb = e.a;
							var d = c.x - xb.x;
							c = c.y - xb.y;
							d = d * d + c * c;
							if (N.ea == class_u.ga) {
								if (null == f || f.a.x * z < N.J.a.x * z)
									f = N.J;
								if (null == g || g.a.x * z > N.J.a.x * z)
									g = N.J;
								if (null == h || d < k)
									h = N.J,
										k = d;
							}
							else if (N.ea == class_u.Ca) {
								if (null == l || l.a.x * z < N.J.a.x * z)
									l = N.J;
								if (null == n || n.a.x * z > N.J.a.x * z)
									n = N.J;
								if (null == r || d < t)
									r = N.J,
										t = d;
							}
						}
						null != n && null != g && 0 >= b.Qa && (h.a.x > n.a.x && e.a.x > n.a.x && 20 < e.a.x && this.zj(.3),
						r.a.x < g.a.x && e.a.x < g.a.x && -20 > e.a.x && this.zj(.3));
					}
			}
		}

		class class_Xb {
			constructor(a, b) {
				this.Vh = null;
				this.l = a;
				null != b && (this.Vh = '@' + class_ca.replace(b, ' ', '_'));
			}

			dj(a) {
				let b = this.l.Oa.Fc
					,
					c = []
					,
					d = 0;
				for (a = a.K; d < a.length;) {
					let e = a[d];
					++d;
					c.push({
						D: e.D,
						aa: e.X
					});
				}
				b.Vj = c;
			}

			Ai(a) {
				function b(d) {
					return null == d ? '' : ' by ' + d.D;
				}

				this.dj(a);
				let c = this;
				// Invoking global fields begin
				a.Ml = function (d) {
					c.l.Oa.Ib('' + d.D + ' has joined');
					class_m.Na.ld(class_m.Na.wp);
					c.dj(a);

					if (window.parent.g.onPlayerJoin != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerJoin(player);
					}
				}
				;
				a.Nl = function (d, e, f, g) {
					class_D.i(c.oq, d.X);

					if (window.parent.g.onPlayerLeave != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerLeave(player);
					}

					let noticeText;
					if (null == e) {
						noticeText = '' + d.D + ' has left';
					}
					else {
						class_Ub.i(c.nq, d.X, e, null != g ? g.D : null, f);
						noticeText = '' + d.D + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' : '');

						if (window.parent.g.onPlayerKicked != null) {
							const player = getFullPlayerObject(d);
							const byPlayer = getFullPlayerObject(g);
							window.parent.g.onPlayerKicked(player, e, f, byPlayer);
						}
					}
					c.l.Oa.Ib(noticeText);
					class_m.Na.ld(class_m.Na.Cp);
					c.dj(a);
				}
				;
				a.Kl = function (d, e) {
					let f = null != c.Vh && -1 != e.indexOf(c.Vh);
					c.l.Oa.ca('' + d.D + ': ' + e, f ? 'highlight' : null);
					class_m.j.Hm.A() && f ? class_m.Na.ld(class_m.Na.Qk) : class_m.j.Ri.A() && class_m.Na.ld(class_m.Na.ek);

					if (window.parent.g.onPlayerChat != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerChat(player, e);
					}
				}
				;
				a.nm = function (d, e, f, g) {
					c.l.Oa.Np(d, e, f);
					if (class_m.j.Ri.A())
						switch (g) {
							case 1:
								class_m.Na.ld(class_m.Na.ek);
								break;
							case 2:
								class_m.Na.ld(class_m.Na.Qk);
						}

					if (window.parent.g.onAnnouncement != null) {
						window.parent.g.onAnnouncement(d, e, f, g);
					}
				}
				;
				a.si = function (byFullPlayer) {
					class_m.Na.ld(class_m.Na.yp);

					if (window.parent.g.onPlayerBallKick != null) {
						const byPlayer = getFullPlayerObject(byFullPlayer);
						window.parent.g.onPlayerBallKick(byPlayer);
					}
				}
				;
				a.Yi = function (d) {
					class_m.Na.ld(class_m.Na.bp);
					let e = c.l.hb.fb.Cd;
					e.Ra(d == class_u.ga ? e.er : e.Vn);

					if (window.parent.g.onTeamGoal != null) {
						const teamId = d.aa;
						window.parent.g.onTeamGoal(teamId);
					}
				}
				;
				a.Zi = function (d) {
					let e = c.l.hb.fb.Cd;
					e.Ra(d == class_u.ga ? e.fr : e.Wn);
					c.l.Oa.Ib('' + d.D + ' team won the match');

					if (window.parent.g.onTeamVictory != null) {
						const teamId = d.aa;
						window.parent.g.onTeamVictory(teamId);
					}
				}
				;
				a.Fl = function (d, e, f) {
					e && !f && c.l.Oa.Ib('Game paused' + b(d));

					if (window.parent.g.onGamePause != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGamePause(byPlayer, e);
					}
				}
				;
				a.$i = function () {
					let d = c.l.hb.fb.Cd;
					d.Ra(d.ds);

					if (window.parent.g.onTimeIsUp != null) {
						window.parent.g.onTimeIsUp();
					}
				}
				;
				a.Lq = () => {
					if (window.parent.g.onPositionsReset != null) {
						window.parent.g.onPositionsReset();
					}
				}
				;
				a.Vi = function (d) {
					c.l.ue(false);
					c.l.hb.fb.Cd.io();
					c.l.Oa.Ib('Game started' + b(d));

					if (window.parent.g.onGameStart != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGameStart(byPlayer);
					}
				}
				;
				a.Gf = function (d) {
					null != d && c.l.Oa.Ib('Game stopped' + b(d));

					if (window.parent.g.onGameStop != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGameStop(byPlayer);
					}
				}
				;
				a.Ti = function (d, e) {
					if (!e.$e()) {
						let f = class_ca.eh(e.hk(), 8);
						c.l.Oa.Ib('Stadium "' + e.D + '" (' + f + ') loaded' + b(d));

						if (window.parent.g.onStadiumChange != null) {
							const byPlayer = getFullPlayerObject(d);
							window.parent.g.onStadiumChange(byPlayer, e.D, f);
						}
					}
				}
				;
				a.Ll = function (d) {
					c.l.Oa.Ib('' + d.D + ' ' + (d.Td ? 'has desynchronized' : 'is back in sync'));

					if (window.parent.g.onPlayerDesyncChange != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerDesyncChange(player, player.desynchronized);
					}
				}
				;
				a.Ql = function (d, e, f) {
					null != a.M && c.l.Oa.Ib('' + e.D + ' was moved to ' + f.D + b(d));

					if (window.parent.g.onPlayerTeamChange != null) {
						const player = getFullPlayerObject(e);
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onPlayerTeamChange(player, byPlayer, f.aa);
					}
				}
				;
				a.ri = function (d, e) {
					let f = e.D;
					const noticeText = (e.eb ? '' + f + ' was given admin rights' : '' + f + '\'s admin rights were taken away') + b(d);
					c.l.Oa.Ib(noticeText);

					if (window.parent.g.onPlayerAdminChange != null) {
						const player = getFullPlayerObject(e);
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onPlayerAdminChange(player, byPlayer, player.admin);
					}
				}
				;
				a.Pl = function (d, e) {
					c.l.hb.fb.jp(d, e);

					if (window.parent.g.onChatIndicatorStateChange != null) {
						const player = getFullPlayerObject(d);
						const chatIndicatorShown = e === 0;
						window.parent.g.onChatIndicatorStateChange(player, chatIndicatorShown);
					}
				}
				;
				a.Xk = function (d, e, f, g) {
					c.l.Oa.Ib('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(d));

					if (window.parent.g.onKickRateLimitSet != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onKickRateLimitSet(e, f, g, byPlayer);
					}
				};
				// Invoking global fields end
			}

			rs(a) {
				a.Ml = null;
				a.Nl = null;
				a.Kl = null;
				a.nm = null;
				a.si = null;
				a.Yi = null;
				a.Zi = null;
				a.Fl = null;
				a.$i = null;
				a.Vi = null;
				a.Gf = null;
				a.Ti = null;
				a.Ll = null;
				a.Ql = null;
				a.ri = null;
				a.Pl = null;
				a.Xk = null;
			}
		}

		class class_H {
			static i(a) {
				null != a && a();
			}
		}

		class class_Yb {
			constructor(a) {
				this.Zs = a;
				this.ab = [];
			}

			add(a) {
				var b = this.ab.length;
				let c = 0
					,
					d = this.Yd = 0;
				for (; d < b;) {
					let e = d++
						,
						f = this.ab[e];
					f.index++;
					f.weight *= .97;
					this.ab[c].index < f.index && (c = e);
					this.Yd += f.weight;
				}
				b >= this.Zs ? (b = this.ab[c],
					this.Yd -= b.weight,
					this.ab.splice(c, 1)) : b = new class_qc;
				b.value = a;
				b.weight = 1;
				b.index = 0;
				this.Yd += b.weight;
				for (a = 0; a < this.ab.length && this.ab[a].value <= b.value;)
					++a;
				this.ab.splice(a, 0, b);
			}

			jh() {
				if (0 == this.ab.length)
					return 0;
				if (1 == this.ab.length)
					return this.ab[0].value;
				var a = .5 * this.Yd;
				let b = this.ab[0].weight
					,
					c = 0;
				for (; c < this.ab.length - 1 && !(b >= a);)
					++c,
						b += this.ab[c].weight;
				return this.ab[c].value;
			}

			max() {
				return 0 == this.ab.length ? 0 : this.ab[this.ab.length - 1].value;
			}
		}

		class class_la {
			constructor(a) {
				function b(y) {
					let F = window.document.createElement('div');
					F.className = 'inputrow';
					var L = window.document.createElement('div');
					L.textContent = y;
					F.appendChild(L);
					L = yb.Yo(y);
					let ea = 0;
					for (; ea < L.length;) {
						let V = L[ea];
						++ea;
						let rc = window.document.createElement('div');
						var S = V;
						V.startsWith('Key') && (S = class_O.substr(V, 3, null));
						rc.textContent = S;
						F.appendChild(rc);
						S = window.document.createElement('i');
						S.className = 'icon-cancel';
						S.onclick = function () {
							yb.ir(V);
							class_m.j.me.ta(yb);
							rc.remove();
						}
						;
						rc.appendChild(S);
					}
					L = window.document.createElement('i');
					L.className = 'icon-plus';
					F.appendChild(L);
					L.onclick = function () {
						sc.classList.toggle('show', true);
						sc.focus();
						sc.onkeydown = function (V) {
							sc.classList.toggle('show', false);
							V.stopPropagation();
							V = V.code;
							null == yb.A(V) && (yb.Ra(V, y),
								class_m.j.me.ta(yb),
								Bc());
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
					let y = class_m.j.Ah.A();
					K.textContent = '' + y;
					N.value = '' + y;
				}

				function e() {
					let y = class_m.j.Bh.A();
					t.textContent = '' + y;
					z.value = '' + y;
				}

				function f(y, F, L, ea) {
					let S = l.get(y);
					y = F.A();
					S.selectedIndex = ea(y);
					S.onchange = function () {
						F.ta(L(S.selectedIndex));
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
						let V = !F.A();
						F.ta(V);
						ea(V);
						null != L && L(V);
					}
					;
					ea(F.A());
				}

				function h(y) {
					let F = {
						bn: l.get(y + 'btn'),
						lh: l.get(y + 'sec')
					};
					n.push(F);
					F.bn.onclick = function () {
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
						S && (class_la.sm = F);
						ea.lh.classList.toggle('selected', S);
						ea.bn.classList.toggle('selected', S);
						++F;
					}
				}

				null == a && (a = false);
				this.f = class_x.Ha(class_la.O);
				let l = class_x.Aa(this.f);
				this.wd = l.get('close');
				let n = [];
				h('sound');
				h('video');
				h('misc');
				h('input');
				k(n[class_la.sm]);
				g('tsound-main', class_m.j.ve, function () {
					class_m.Na.zi();
				});
				g('tsound-chat', class_m.j.Ri);
				g('tsound-highlight', class_m.j.Hm);
				g('tsound-crowd', class_m.j.Gm);
				f('viewmode', class_m.j.Ac, function (y) {
					return y - 1;
				}, function (y) {
					return y + 1;
				});
				f('fps', class_m.j.Kh, function (y) {
					return y;
				}, function (y) {
					return y;
				});
				let r = [1, .75, .5, .25];
				f('resscale', class_m.j.Fi, function (y) {
					return r[y];
				}, function (y) {
					let F = 0
						,
						L = r.length - 1;
					for (; F < L && !(r[F] <= y);)
						++F;
					return F;
				});
				g('tvideo-lowlatency', class_m.j.di);
				g('tvideo-teamcol', class_m.j.Pm);
				g('tvideo-showindicators', class_m.j.Rk);
				g('tvideo-showavatars', class_m.j.Em);
				let t = l.get('chatopacity-value')
					,
					z = l.get('chatopacity-range');
				e();
				z.oninput = function () {
					class_m.j.Bh.ta(parseFloat(z.value));
					e();
				}
				;
				let K = l.get('chatfocusheight-value')
					,
					N = l.get('chatfocusheight-range');
				d();
				N.oninput = function () {
					class_m.j.Ah.ta(class_Q.parseInt(N.value));
					d();
				}
				;
				f('chatbgmode', class_m.j.fk, function (y) {
					return 0 == y ? 'full' : 'compact';
				}, function (y) {
					return 'full' == y ? 0 : 1;
				});
				let xb = null
					,
					Ic = this;
				xb = function () {
					let y = class_m.j.Ye.A();
					c('loc', 'Detected location', class_m.j.Xe.A());
					c('loc-ovr', 'Location override', y);
					let F = l.get('loc-ovr-btn');
					F.disabled = !a;
					null == y ? (F.textContent = 'Override location',
							F.onclick = function () {
								class_H.i(Ic.cq);
							}
					) : (F.textContent = 'Remove override',
							F.onclick = function () {
								class_m.j.Ye.ta(null);
								xb();
							}
					);
				}
				;
				xb();
				let yb = class_m.j.me.A()
					,
					sc = l.get('presskey')
					,
					Bc = null
					,
					Wa = l.get('inputsec');
				Bc = function () {
					class_x.Mf(Wa);
					Wa.appendChild(b('Up'));
					Wa.appendChild(b('Down'));
					Wa.appendChild(b('Left'));
					Wa.appendChild(b('Right'));
					Wa.appendChild(b('Kick'));
					Wa.appendChild(b('ToggleChat'));
				}
				;
				Bc();
				this.wd.onclick = function () {
					class_H.i(Ic.qb);
				};
			}
		}

		class class_Zb {
			constructor(a, b, c, d, e, f) {
				this.th = this.Dh = false;
				this.qa = new class_Sa(0, b, d);
				let g = this;
				this.qa.kd = function () {
					g.Ze(na.Je);
				}
				;
				this.qa.Id = function () {
					null != g.Id && g.Id(new class_Nb(g.qa));
					g.qa = null;
					g.jk();
				}
				;
				this.qa.li = function (h) {
					g.Kr = h;
					g.Z = new WebSocket(a + 'client?id=' + c + (null == f ? '' : '&token=' + f));
					g.Z.binaryType = 'arraybuffer';
					g.Z.onclose = function (k) {
						g.Dh || g.Ze(na.Ke(k.code));
					}
					;
					g.Z.onerror = function () {
						g.Dh || g.Ze(na.Error);
					}
					;
					g.Z.onmessage = function_M(g, g.Th);
					g.Z.onopen = function () {
						null != g.zl && g.zl();
						g.qa.Xi();
						g.Li(g.Kr, g.qa.hg, e);
						g.qa.vg = function_M(g, g.Ii);
						g.qa.Wh.then(function () {
							g.Tc(0, null);
						});
					};
				}
				;
				this.qa.zo();
			}

			$n() {
				this.Ze(na.Ie);
			}

			jk() {
				null != this.Z && (this.Z.onclose = null,
					this.Z.onmessage = null,
					this.Z.onerror = null,
					this.Z.onopen = null,
					this.Z.close(),
					this.Z = null);
				null != this.qa && (this.qa.ja(),
					this.qa = null);
			}

			Ze(a) {
				null != this.kd && this.kd(a);
				this.jk();
			}

			Th(a) {
				var b = new class_J(new DataView(a.data));
				a = b.F();
				0 < b.s.byteLength - b.a && (b = new class_J(new DataView(pako.inflateRaw(b.tb()).buffer), false));
				switch (a) {
					case 1:
						a = b.kc();
						b = b.Hg();
						let c = []
							,
							d = 0;
						for (; d < b.length;)
							c.push(new RTCIceCandidate(b[d++]));
						this.Sh(a, c);
						break;
					case 4:
						this.Rh(new RTCIceCandidate(b.Hg()));
				}
			}

			Sh(a, b) {
				this.qa.Xi(this.th ? 1E4 : 4E3);
				this.Dh = true;
				null != this.rl && this.rl();
				let c = this;
				this.qa.Sa.setRemoteDescription(new RTCSessionDescription({
					sdp: a,
					type: 'answer'
				}), function () {
					let d = 0;
					for (; d < b.length;)
						c.qa.Sa.addIceCandidate(b[d++]);
				}, function () {
					c.Ze(na.Error);
				});
			}

			Rh(a) {
				this.qa.Sa.addIceCandidate(a);
			}

			Tc(a, b) {
				if (null != this.Z) {
					var c = class_A.ia(32, false);
					c.m(a);
					null != b && (a = pako.deflateRaw(b.Vb()),
						c.Xb(a));
					this.Z.send(c.Qd());
				}
			}

			Li(a, b, c) {
				let d = class_A.ia(32, false);
				d.m(this.th ? 1 : 0);
				d.oc(a.sdp);
				d.Wg(b);
				null != c && d.Xb(c.Vb());
				this.Tc(1, d);
			}

			Ii(a) {
				let b = class_A.ia(32, false);
				b.Wg(a);
				this.Tc(4, b);
			}

			static Xo(a) {
				switch (a.ob) {
					case 0:
						return 'Failed';
					case 1:
						return class_Jc.description(a.code);
					case 2:
						return '';
					case 3:
						return 'Master connection error';
				}
			}
		}

		class class_zb {
			constructor(a) {
				this.Ja = class_x.Ha(class_zb.Cj, 'tbody');
				var b = class_x.Aa(this.Ja);
				let c = b.get('name')
					,
					d = b.get('players')
					,
					e = b.get('distance')
					,
					f = b.get('pass');
				b = b.get('flag');
				this.lt = a;
				let g = a.Ed;
				c.textContent = g.D;
				d.textContent = '' + g.K + '/' + g.hf;
				f.textContent = g.Kb ? 'Yes' : 'No';
				e.textContent = '' + (a.We | 0) + 'km';
				try {
					b.classList.add('f-' + g.vb.toLowerCase());
				}
				catch (h) {
				}
				9 > a.Ed.Rd && this.Ja.classList.add('old');
			}
		}

		class class_Ab {
			constructor(a, b) {
				this.ak = a;
				this.cj = b;
				this.qc = a;
				this.ff = window.performance.now();
			}

			Um() {
				var a;
				null == a && (a = 1);
				this.B();
				return a <= this.qc ? (this.qc -= a,
					true) : false;
			}

			fs() {
				this.B();
				let a = 1 - this.qc;
				if (0 >= a)
					return 0;
				let b = window.performance.now();
				return this.ff + a * this.cj - b;
			}

			uo(a) {
				let b = this.fs();
				--this.qc;
				window.setTimeout(a, b | 0);
			}

			B() {
				let a = window.performance.now()
					,
					b = Math.floor((a - this.ff) / this.cj);
				this.ff += b * this.cj;
				this.qc += b;
				this.qc >= this.ak && (this.qc = this.ak,
					this.ff = a);
			}
		}

		class class_lb {
			constructor(a) {
				this.D = a.D;
				this.Ab = a.Ab;
				this.aa = a.X;
				this.f = class_x.Ha(class_lb.O);
				let b = class_x.Aa(this.f);
				this.kf = b.get('name');
				this.Dg = b.get('ping');
				try {
					b.get('flag').classList.add('f-' + a.country);
				}
				catch (d) {
				}
				this.kf.textContent = this.D;
				this.Dg.textContent = '' + this.Ab;
				let c = this;
				this.f.ondragstart = function (d) {
					d.dataTransfer.setData('player', class_Q.Fe(c.aa));
				}
				;
				this.f.oncontextmenu = function (d) {
					d.preventDefault();
					class_D.i(c.sf, c.aa);
				}
				;
				this.xm(a.eb);
			}

			B(a, b) {
				this.f.draggable = b;
				this.Ab != a.Ab && (this.Ab = a.Ab,
					this.Dg.textContent = '' + this.Ab);
				this.Mn != a.eb && this.xm(a.eb);
			}

			xm(a) {
				this.Mn = a;
				this.f.className = 'player-list-item' + (a ? ' admin' : '');
			}
		}

		class class_Bb {
			constructor(a, b, c, d) {
				this.vh = new Set;
				this.Uf = new Set;
				this.Kg = this.yf = this.wm = false;
				this.Sc = null;
				this.Bf = this.aa = '';
				this.Ar = 5E4;
				this.zr = 1E4;
				this.xd = new Map;
				this.$r = a;
				this.ig = b;
				this.bo = c;
				this.Bf = d;
				null == this.Bf && (this.Bf = '');
				this.Ui();
			}

			ja() {
				window.clearTimeout(this.mm);
				window.clearTimeout(this.se);
				this.se = null;
				window.clearInterval(this.Hl);
				this.Z.onmessage = null;
				this.Z.onerror = null;
				this.Z.onclose = null;
				this.Z.onopen = null;
				this.Z.close();
				this.Z = null;
				this.Hk();
			}

			Pi(a) {
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
					this.Kg = true;
					var b = this;
					null != this.Z && 1 == this.Z.readyState && null == this.se && (this.Ki(),
						this.se = window.setTimeout(function () {
							b.se = null;
							1 == b.Z.readyState && b.Kg && b.Ki();
						}, 1E4));
				}
			}

			Oi(a) {
				function b() {
					null != c.Z && 1 == c.Z.readyState && c.yf != c.wm && c.vm();
					c.jm = null;
				}

				this.yf = a;
				let c = this;
				null == this.jm && (b(),
					this.jm = window.setTimeout(b, 1E3));
			}

			Ui(a) {
				function b(e) {
					e = e.sitekey;
					if (null == e)
						throw class_v.C(null);
					null != d.rf && d.rf(e, function (f) {
						d.Ui(f);
					});
				}

				function c(e) {
					let f = e.url;
					if (null == f)
						throw class_v.C(null);
					e = e.token;
					if (null == e)
						throw class_v.C(null);
					d.Z = new WebSocket(f + '?token=' + e);
					d.Z.binaryType = 'arraybuffer';
					d.Z.onopen = function () {
						d.mp();
					}
					;
					d.Z.onclose = function (g) {
						d.Qh(4001 != g.code);
					}
					;
					d.Z.onerror = function () {
						d.Qh(true);
					}
					;
					d.Z.onmessage = function_M(d, d.Th);
				}

				null == a && (a = '');
				let d = this;
				class_Y.Sl(this.$r, 'token=' + this.Bf + '&rcr=' + a, class_Y.Gj).then(function (e) {
					switch (e.action) {
						case 'connect':
							c(e);
							break;
						case 'recaptcha':
							b(e);
					}
				}).catch(function () {
					d.Qh(true);
				});
			}

			mp() {
				null != this.Sc && this.Ki();
				0 != this.yf && this.vm();
				let a = this;
				this.Hl = window.setInterval(function () {
					a.Ji();
				}, 4E4);
			}

			Th(a) {
				a = new class_J(new DataView(a.data), false);
				switch (a.F()) {
					case 1:
						this.Sh(a);
						break;
					case 4:
						this.Rh(a);
						break;
					case 5:
						this.hp(a);
						break;
					case 6:
						this.kp(a);
				}
			}

			Sh(a) {
				let b = a.ib(),
					c = class_ha.Gs(a.tb(a.F())),
					d,
					e,
					f;
				try {
					a = new class_J(new DataView(pako.inflateRaw(a.tb()).buffer), false);
					d = 0 != a.F();
					e = a.kc();
					let g = a.Hg()
						,
						h = []
						,
						k = 0;
					for (; k < g.length;)
						h.push(new RTCIceCandidate(g[k++]));
					f = h;
				}
				catch (g) {
					this.Df(b, 0);
					return;
				}
				this.lp(b, c, e, f, a, d);
			}

			lp(a, b, c, d, e, f) {
				if (16 <= this.xd.size)
					this.Df(a, 4104);
				else if (this.vh.has(b))
					this.Df(a, 4102);
				else {
					for (var g = [], h = 0; h < d.length;) {
						let n = class_Bb.Mk(d[h++]);
						if (null != n) {
							if (this.Uf.has(n)) {
								this.Df(a, 4102);
								return;
							}
							g.push(n);
						}
					}
					if (null != this.lk && (h = new class_J(e.s),
						h.a = e.a,
						e = this.lk(b, h),
					1 == e.ob)) {
						this.Df(a, e.reason);
						return;
					}
					var k = new class_Sa(a, this.ig, this.bo);
					f && (k.sk = 2500);
					k.xe = g;
					k.rd = b;
					this.xd.set(a, k);
					var l = this;
					k.kd = function () {
						l.Tc(0, k, null);
						l.xd.delete(k.aa);
					}
					;
					k.Id = function () {
						l.xd.delete(k.aa);
						l.Tc(0, k, null);
						null != l.ul && l.ul(new class_Nb(k));
					}
					;
					k.li = function (n) {
						l.Li(k, n, k.hg, null);
						k.Wh.then(function () {
							l.Tc(0, k, null);
						});
						k.vg = function (r) {
							l.Ii(k, r);
						};
					}
					;
					k.Xi();
					k.xo(new RTCSessionDescription({
						sdp: c,
						type: 'offer'
					}), d);
				}
			}

			Rh(a) {
				let b = a.ib(),
					c;
				try {
					a = new class_J(new DataView(pako.inflateRaw(a.tb()).buffer), false),
						c = new RTCIceCandidate(a.Hg());
				}
				catch (d) {
					return;
				}
				this.gp(b, c);
			}

			gp(a, b) {
				a = this.xd.get(a);
				if (null != a) {
					let c = class_Bb.Mk(b);
					if (null != c && (a.xe.push(c),
						this.Uf.has(c)))
						return;
					a.Mj(b);
				}
			}

			hp(a) {
				this.aa = a.pe(a.F());
				null != this.wg && this.wg(this.aa);
			}

			kp(a) {
				this.Bf = a.pe(a.s.byteLength - a.a);
			}

			Tc(a, b, c) {
				if (!b.Al) {
					0 == a && (b.Al = true);
					var d = b.aa;
					b = class_A.ia(32, false);
					b.m(a);
					b.ub(d);
					null != c && (a = pako.deflateRaw(c.Vb()),
						b.Xb(a));
					this.Z.send(b.Qd());
				}
			}

			Df(a, b) {
				let c = class_A.ia(16, false);
				c.m(0);
				c.ub(a);
				c.Wb(b);
				this.Z.send(c.Qd());
			}

			Ji() {
				let a = class_A.ia(1, false);
				a.m(8);
				this.Z.send(a.Qd());
			}

			Ki() {
				this.Kg = false;
				let a = class_A.ia(256, false);
				a.m(7);
				null != this.Sc && a.Vg(this.Sc);
				this.Z.send(a.Qd());
			}

			vm() {
				let a = class_A.ia(2, false);
				a.m(9);
				a.m(this.yf ? 1 : 0);
				this.Z.send(a.Qd());
				this.wm = this.yf;
			}

			Li(a, b, c, d) {
				let e = class_A.ia(32, false);
				e.oc(b.sdp);
				e.Wg(c);
				null != d && e.Xb(d.Vb());
				this.Tc(1, a, e);
			}

			Ii(a, b) {
				let c = class_A.ia(32, false);
				c.Wg(b);
				this.Tc(4, a, c);
			}

			Hk() {
				let a = this.xd.values()
					,
					b = a.next();
				for (; !b.done;) {
					let c = b.value;
					b = a.next();
					c.ja();
				}
				this.xd.clear();
			}

			Qh(a) {
				this.Hk();
				window.clearTimeout(this.se);
				this.se = null;
				this.Kg = false;
				window.clearInterval(this.Hl);
				window.clearTimeout(this.mm);
				let b = this;
				a && (this.mm = window.setTimeout(function () {
					b.Ui();
				}, this.zr + Math.random() * this.Ar | 0));
			}

			Rn(a) {
				let b = 0
					,
					c = a.xe;
				for (; b < c.length;)
					this.Uf.add(c[b++]);
				null != a.rd && this.vh.add(a.rd);
				return {
					wt: a.xe,
					ut: a.rd
				};
			}

			be() {
				this.Uf.clear();
				this.vh.clear();
			}

			static Mk(a) {
				try {
					let b = class_Kc.tf(a.candidate);
					if ('srflx' == b.ps)
						return b.sp;
				}
				catch (b) {
				}
				return null;
			}
		}

		class class_wa {
			constructor(a) {
				this.ol = this.nl = this.ql = null;
				this.hb = new class_kb;
				this.nd = false;
				this.Ff = new class_mb;
				this.Oa = new class_Xa;
				this.Wa = new class_gb(a);
				this.hb.Qb = a;
				this.f = class_x.Ha(class_wa.O);
				a = class_x.Aa(this.f);
				this.os = a.get('top-section');
				this.uf = a.get('popups');
				this.uf.style.display = 'none';
				a.get('gameplay').appendChild(this.hb.f);
				class_x.replaceWith(a.get('chatbox'), this.Oa.f);
				class_x.replaceWith(a.get('stats'), this.Ff.f);
				this.ji = a.get('menu');
				let b = this;
				this.ji.onclick = function () {
					b.ue(!b.nd);
					b.ji.blur();
				}
				;
				new class_tc(a.get('sound'));
				a.get('settings').onclick = function () {
					let c = new class_la;
					c.qb = function () {
						b.cb(null);
					}
					;
					b.cb(c.f);
				}
				;
				this.Wa.ke = function () {
					let c = new class_Cb;
					c.qb = function (d) {
						b.cb(null);
						d && class_H.i(b.ke);
					}
					;
					b.cb(c.f);
				}
				;
				this.Wa.xq = function () {
					let c = new class_vb;
					c.ki = function () {
						b.cb(null);
					}
					;
					c.Ag = function (d) {
						class_D.i(b.Ag, d);
						b.cb(null);
					}
					;
					c.ni = function (d) {
						d = new class_aa('Error loading stadium', d, ['Ok']);
						d.Va = function () {
							b.cb(null);
						}
						;
						b.cb(d.f);
					}
					;
					b.cb(c.f);
				};
			}

			Mr(a) {
				this.ol != a && (this.ol = a,
					this.f.style.setProperty('--chat-opacity', '' + a));
			}

			Lr(a) {
				this.nl != a && (this.nl = a,
					this.f.classList.toggle('chat-bg-full', a));
			}

			Ur(a) {
				this.ql != a && (this.ql = a,
					this.hb.f.classList.toggle('restricted', a));
			}

			B(a) {
				null == a.U.M && this.ue(true);
				this.nd && this.Wa.B(a.U, a.U.oa(a.xc));
				class_H.i(this.Rl);
				this.ji.disabled = null == a.U.M;
				let b = class_m.j.Ac.A()
					,
					c = this.hb.fb;
				c.re = class_m.j.Fi.A();
				this.Mr(class_m.j.Bh.A());
				this.Lr('full' == class_m.j.fk.A());
				this.Ur(0 == b);
				let d = this.Oa.f.getBoundingClientRect().height;
				0 == b ? (c.Gg = 1,
					c.Md = 0,
					c.Tg = 0,
					this.hb.fb.xh = 0,
					this.hb.f.style.paddingBottom = d + 'px') : (c.Tg = 35,
					// Modified zoom
					c.Md = 0,
					c.Gg = 1 + .25 * (b - 1),
					this.hb.fb.xh = d * window.devicePixelRatio,
					this.hb.f.style.paddingBottom = '0');
				a = a.eg();
				this.hb.B(a);
				class_m.Na.nk.qt(a);
			}

			ue(a) {
				this.nd != a && (this.nd = a,
					this.f.classList.toggle('showing-room-view', this.nd),
					this.nd ? this.os.appendChild(this.Wa.f) : this.Wa.f.remove());
			}

			vp() {
				return null != class_wa.Kq;
			}

			cb(a, b) {
				class_x.Mf(this.uf);
				class_wa.Kq = a;
				null != a ? (this.uf.style.display = 'flex',
					this.uf.appendChild(a),
					this.Rl = b) : (this.uf.style.display = 'none',
					this.Rl = null);
			}
		}

		class class_uc {
			constructor(a) {
				this.Lj = new Map;
				this.ap = new class_Ab(100, 16);
				this.Jg = false;
				this.Ab = 0;
				this.qa = a;
				a = class_A.ia(8);
				a.u(Math.random());
				this.Se = a.Vb();
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.qa.Ub(b, a);
			}
		}

		class class_ka {
			constructor() {
				this.vb = '';
				this.Jc = this.Lc = 0;
			}

			Ae() {
				return JSON.stringify({
					lat: this.Jc,
					lon: this.Lc,
					code: this.vb
				});
			}

			static Mh(a) {
				return class_ka.dg(JSON.parse(a));
			}

			static dg(a) {
				let b = new class_ka;
				b.Jc = a.lat;
				b.Lc = a.lon;
				b.vb = a.code.toLowerCase();
				return b;
			}

			static Zo() {
				return class_Y.Kk(class_m.Pe + 'api/geo').then(function (a) {
					return class_ka.dg(a);
				});
			}
		}

		class class_$b {
			static nh(a) {
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

		class class_T {
			constructor(a) {
				this.gd = window.performance.now();
				this.Rg = new Map;
				this.md = new Map;
				this.re = 1;
				this.xh = 100;
				this.Tg = 35;
				this.Md = 0;
				this.Gg = 1.5;
				this.Xa = new class_P(0, 0);
				this.Uk = false;
				this.Cd = new class_hc;
				this.up = a;
				this.la = window.document.createElement('canvas');
				this.la.mozOpaque = true;
				this.c = this.la.getContext('2d', {
					alpha: false,
					desynchronized: a
				});
				this.fp = this.c.createPattern(class_m.ep, null);
				this.ro = this.c.createPattern(class_m.qo, null);
				this.po = this.c.createPattern(class_m.oo, null);
			}

			jp(a, b) {
				a = this.md.get(a.X);
				if (null != a)
					switch (b) {
						case 0:
							a.kg = true;
							break;
						case 1:
							a.kg = false;
					}
			}

			vs() {
				if (null != this.la.parentElement) {
					var a = window.devicePixelRatio * this.re;
					let b = this.la.getBoundingClientRect()
						,
						c = Math.round(b.width * a);
					a = Math.round(b.height * a);
					if (this.la.width != c || this.la.height != a)
						this.la.width = c,
							this.la.height = a;
				}
			}

			Qc(a, b) {
				var c = window.performance.now();
				let d = (c - this.gd) / 1E3;
				this.gd = c;
				this.Rg.clear();
				this.vs();
				class_T.Qi(this.c, true);
				this.c.resetTransform();
				if (null != a.M) {
					c = a.M;
					var e = c.ua
						,
						f = a.oa(b)
						,
						g = null != f ? f.J : null
						,
						h = 0 != this.Md ? this.la.height / this.Md : this.Gg * window.devicePixelRatio * this.re;
					b = this.Tg * this.re;
					var k = this.xh * this.re
						,
						l = c.T.jf
						,
						n = this.la.width / h;
					0 < l && n > l && (n = l,
						h = this.la.width / l);
					l = (this.la.height - b - k) / h;
					this.ss(c, g, n, l, d);
					for (var r = 0, t = a.K; r < t.length;) {
						let z = t[r];
						++r;
						if (null == z.J)
							continue;
						let K = this.md.get(z.X);
						null == K && (K = new class_Db,
							this.md.set(z.X, K));
						K.B(z, a);
						this.Rg.set(z.J, K);
					}
					this.c.translate(this.la.width / 2, (this.la.height + b - k) / 2);
					this.c.scale(h, h);
					this.c.translate(-this.Xa.x, -this.Xa.y);
					this.c.lineWidth = 3;
					this.sr(c.T);
					this.rr(c.T);
					h = e.H;
					r = 0;
					for (t = e.pb; r < t.length;)
						this.lr(t[r++], h);
					this.kr(a, n, l);
					this.mr(a, f);
					null != g && this.pr(g.a);
					this.c.lineWidth = 2;
					f = 0;
					for (g = a.K; f < g.length;)
						l = g[f],
							++f,
							n = l.J,
						null != n && (l = this.md.get(l.X),
							this.em(n, l));
					f = 0;
					for (e = e.H; f < e.length;)
						if (g = e[f],
							++f,
						null == this.Rg.get(g)) {
							if (0 > g.V)
								break;
							this.em(g, null);
						}
					this.c.lineWidth = 3;
					this.c.resetTransform();
					this.c.translate(this.la.width / 2, b + (this.la.height - b - k) / 2);
					this.nr(c);
					0 >= c.Qa && (this.Cd.B(d),
						this.Cd.Qc(this.c));
					this.Rg.clear();
					this.jr(a);
				}
			}

			jr(a) {
				let b = new Set;
				var c = 0;
				for (a = a.K; c < a.length;)
					b.add(a[c++].X);
				c = this.md.keys();
				for (a = c.next(); !a.done;) {
					let d = a.value;
					a = c.next();
					b.has(d) || this.md.delete(d);
				}
			}

			ss(a, b, c, d, e) {
				if (null != b && 1 == a.T.Re) {
					var f = b.a;
					var g = f.x;
					f = f.y;
					null == f && (f = 0);
					null == g && (g = 0);
				}
				else if (f = a.ua.H[0].a,
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
				b && (k = b = this.Xa,
					e *= .04,
					h = k.x,
					k = k.y,
					b.x = h + (g - h) * e,
					b.y = k + (f - k) * e);
				this.so(c, d, a.T);
			}

			so(a, b, c) {
				a > 2 * c.bc ? this.Xa.x = 0 : this.Xa.x + .5 * a > c.bc ? this.Xa.x = c.bc - .5 * a : this.Xa.x - .5 * a < -c.bc && (this.Xa.x = -c.bc + .5 * a);
				b > 2 * c.sc ? this.Xa.y = 0 : this.Xa.y + .5 * b > c.sc ? this.Xa.y = c.sc - .5 * b : this.Xa.y - .5 * b < -c.sc && (this.Xa.y = -c.sc + .5 * b);
			}

			pr(a) {
				this.c.beginPath();
				this.c.strokeStyle = 'white';
				this.c.globalAlpha = .3;
				this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, false);
				this.c.stroke();
				this.c.globalAlpha = 1;
			}

			nr(a) {
				let b = 0 < a.Qa;
				this.Or(b);
				b && (120 != a.Qa && (a = a.Qa / 120 * 200,
					this.c.fillStyle = 'white',
					this.c.fillRect(.5 * -a, 100, a, 20)),
					this.Cd.Eq.tr(this.c));
			}

			Or(a) {
				this.Uk != a && (this.la.style.filter = a ? 'grayscale(70%)' : '',
					this.Uk = a);
			}

			om(a, b, c, d, e, f) {
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

			sr(a) {
				class_T.Qi(this.c, false);
				var b = a.ae;
				let c = a.$d
					,
					d = this;
				if (1 == a.ud)
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_T.nc(a.td),
						this.c.fillRect(0, 0, this.la.width, this.la.height),
						this.c.restore(),
						this.c.strokeStyle = '#C7E6BD',
						this.c.fillStyle = this.fp,
						this.om(this.c, -b, -c, 2 * b, 2 * c, a.Gc),
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
					this.c.rect(this.Xa.x - 1E4, this.Xa.y - 1E4, 2E4, 2E4);
					this.c.scale(2, 2);
					this.c.fillStyle = this.po;
					this.c.fill();
					this.c.restore();
					this.c.save();
					this.om(this.c, -b, -c, 2 * b, 2 * c, a.Gc);
					this.c.scale(2, 2);
					this.c.fillStyle = this.ro;
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
					e < a.Gc && (b = 0);
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
						this.c.fillStyle = class_T.nc(a.td),
						this.c.fillRect(0, 0, this.la.width, this.la.height),
						this.c.restore();
				class_T.Qi(this.c, true);
			}

			mr(a, b) {
				let c = class_m.j.Rk.A()
					,
					d = 0;
				for (a = a.K; d < a.length;) {
					let f = a[d];
					++d;
					var e = f.J;
					if (null == e)
						continue;
					e = e.a;
					let g = this.md.get(f.X);
					c && g.kg && this.c.drawImage(class_m.Vm, e.x - .5 * class_m.Vm.width, e.y - 35);
					f != b && g.Mo(this.c, e.x, e.y + 50);
				}
			}

			em(a, b) {
				0 > a.V || (this.c.beginPath(),
					null == b ? (this.c.fillStyle = class_T.nc(a.S),
						this.c.strokeStyle = 'black') : (this.c.fillStyle = b.Wj,
						this.c.strokeStyle = b.Fo),
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

			rr(a) {
				if (null != a) {
					var b = 0;
					for (a = a.W; b < a.length;)
						this.qr(a[b++]);
				}
			}

			lr(a, b) {
				if (!(0 > a.S)) {
					this.c.beginPath();
					this.c.strokeStyle = class_T.nc(a.S);
					var c = b[a.fe];
					a = b[a.ge];
					null != c && null != a && (c = c.a,
						a = a.a,
						this.c.moveTo(c.x, c.y),
						this.c.lineTo(a.x, a.y),
						this.c.stroke());
				}
			}

			qr(a) {
				if (a.$a) {
					this.c.beginPath();
					this.c.strokeStyle = class_T.nc(a.S);
					var b = a.Y.a
						,
						c = a.da.a;
					if (0 != 0 * a.wb)
						this.c.moveTo(b.x, b.y),
							this.c.lineTo(c.x, c.y);
					else {
						a = a.ee;
						let d = b.x - a.x;
						b = b.y - a.y;
						this.c.arc(a.x, a.y, Math.sqrt(d * d + b * b), Math.atan2(b, d), Math.atan2(c.y - a.y, c.x - a.x));
					}
					this.c.stroke();
				}
			}

			kr(a, b, c) {
				var d = a.M;
				if (null != d)
					for (d = d.ua.H[0],
						     this.Fk(d.a, d.S, b, c),
						     d = 0,
						     a = a.K; d < a.length;) {
						let e = a[d];
						++d;
						null != e.J && this.Fk(e.J.a, e.ea.S, b, c);
					}
			}

			Fk(a, b, c, d) {
				c = .5 * c - 25;
				var e = .5 * d - 25;
				null == e && (e = 0);
				null == c && (c = 0);
				d = c;
				c = e;
				var f = this.Xa;
				e = a.x - f.x;
				f = a.y - f.y;
				let g = -d
					,
					h = -c
					,
					k = this.Xa;
				d = k.x + (e > d ? d : e < g ? g : e);
				c = k.y + (f > c ? c : f < h ? h : f);
				e = a.x - d;
				a = a.y - c;
				900 < e * e + a * a && (this.c.fillStyle = 'rgba(0,0,0,0.5)',
					this.Gk(d + 2, c + 2, Math.atan2(a, e)),
					this.c.fillStyle = class_T.nc(b),
					this.Gk(d - 2, c - 2, Math.atan2(a, e)));
			}

			Gk(a, b, c) {
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

			xr() {
				let a = this.md.values()
					,
					b = a.next();
				for (; !b.done;) {
					let c = b.value;
					b = a.next();
					c.kg = false;
				}
			}

			static nc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			static Qi(a, b) {
				a.imageSmoothingEnabled = b;
				a.mozImageSmoothingEnabled = b;
			}
		}

		class class_jb {
			constructor(a) {
				this.f = class_x.Ha(class_jb.O);
				class_x.Aa(this.f).get('features').textContent = a.join(', ');
			}
		}

		class class_ra {
			constructor() {
				this.ed = new Map;
			}

			Ra(a, b) {
				this.ed.set(a, b);
			}

			A(a) {
				return this.ed.get(a);
			}

			ir(a) {
				this.ed.delete(a);
			}

			Yo(a) {
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
					c = class_Cc.dn(a)
					,
					d = 0;
				for (; d < c.length;) {
					let e = c[d];
					++d;
					b.ed.set(e, a[e]);
				}
				return b;
			}

			static Mh(a) {
				return class_ra.dg(JSON.parse(a));
			}

			static rk() {
				let a = new class_ra;
				a.Ra('ArrowUp', 'Up');
				a.Ra('KeyW', 'Up');
				a.Ra('ArrowDown', 'Down');
				a.Ra('KeyS', 'Down');
				a.Ra('ArrowLeft', 'Left');
				a.Ra('KeyA', 'Left');
				a.Ra('ArrowRight', 'Right');
				a.Ra('KeyD', 'Right');
				a.Ra('KeyX', 'Kick');
				a.Ra('Space', 'Kick');
				a.Ra('ControlLeft', 'Kick');
				a.Ra('ControlRight', 'Kick');
				a.Ra('ShiftLeft', 'Kick');
				a.Ra('ShiftRight', 'Kick');
				a.Ra('Numpad0', 'Kick');
				return a;
			}
		}

		class class_Db {
			constructor() {
				this.kg = false;
				this.D = '';
				this.wh = 0;
				this.Vf = '';
				this.lb = new class_ua;
				let a = window.document.createElement('canvas');
				a.width = 64;
				a.height = 64;
				this.sb = a.getContext('2d', null);
				this.Wj = this.sb.createPattern(this.sb.canvas, 'no-repeat');
				this.Ao();
			}

			Ao() {
				let a = window.document.createElement('canvas');
				a.width = 160;
				a.height = 34;
				this.Ol = a.getContext('2d', null);
			}

			us() {
				let a = this.Ol;
				a.resetTransform();
				a.clearRect(0, 0, 160, 34);
				a.font = '26px sans-serif';
				a.fillStyle = 'white';
				160 < a.measureText(this.D).width ? (a.textAlign = 'left',
					a.translate(2, 29)) : (a.textAlign = 'center',
					a.translate(80, 29));
				a.fillText(this.D, 0, 0);
			}

			Mo(a, b, c) {
				a.drawImage(this.Ol.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17);
			}

			B(a, b) {
				if (null != a.J) {
					let c = class_m.j.Pm.A() ? b.lb[a.ea.aa] : a.ea.Om
						,
						d = null != a.Sd ? a.Sd : a.Zb
						,
						e = class_m.j.Em.A() && null != d;
					if (!class_Db.fo(this.lb, c) || !e && a.Mb != this.wh || e && this.Vf != d)
						class_Db.wo(this.lb, c),
							e ? (this.Vf = d,
								this.wh = -1) : (this.Vf = '' + a.Mb,
								this.wh = a.Mb),
							this.gr(this.Vf);
				}
				this.Fo = 0 < b.M.Qa || !a.Yb ? 'black' : a.Yb && 0 >= a.Zc && 0 <= a.Bc ? 'white' : 'black';
				a.D != this.D && (this.D = a.D,
					this.us());
			}

			gr(a) {
				let b = this.lb.gb;
				if (!(1 > b.length)) {
					this.sb.save();
					this.sb.translate(32, 32);
					this.sb.rotate(3.141592653589793 * this.lb.sd / 128);
					for (var c = -32, d = 64 / b.length, e = 0; e < b.length;)
						this.sb.fillStyle = class_T.nc(b[e++]),
							this.sb.fillRect(c, -32, d + 4, 64),
							c += d;
					this.sb.restore();
					this.sb.fillStyle = class_T.nc(this.lb.od);
					this.sb.textAlign = 'center';
					this.sb.textBaseline = 'alphabetic';
					this.sb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
					this.sb.fillText(a, 32, 44);
					this.Wj = this.sb.createPattern(this.sb.canvas, 'no-repeat');
				}
			}

			static fo(a, b) {
				if (a.sd != b.sd || a.od != b.od)
					return false;
				a = a.gb;
				b = b.gb;
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

			static wo(a, b) {
				a.sd = b.sd;
				a.od = b.od;
				a.gb = b.gb.slice(0);
			}
		}

		class class_Cc {
			static dn(a) {
				let b = [];
				if (null != a) {
					let d = Object.prototype.hasOwnProperty;
					for (var c in a)
						'__id__' != c && 'hx__closures__' != c && d.call(a, c) && b.push(c);
				}
				return b;
			}
		}

		class class_wb {
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
							class_$b.nh(f.objectStore('files').get(a)).then(function (g) {
								try {
									let h = new class_q;
									h.al(g);
									b(h);
								}
								catch (h) {
									g = class_v.Lb(h).Gb(),
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
							class_$b.nh(e.objectStore('meta').getAll()).then(a, b);
						};
					}
				);
			}

			static kt() {
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
								class_$b.nh(f.objectStore('files').add(a.Ae())).then(function (g) {
									g = {
										name: a.D,
										id: g
									};
									return class_$b.nh(f.objectStore('meta').add(g));
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

		class class_D {
			static i(a, b) {
				null != a && a(b);
			}
		}

		/** Full Player */
		class class_ta {
			constructor() {
				this.Cc = -1;
				this.tn = null;
				/** @type {class_u} */
				this.ea = class_u.Ma;
				/** @type {class_xa} */
				this.J = null;
				this.Bc = this.Zc = 0;
				this.Yb = false;
				this.Ea = this.X = 0;
				this.D = 'Player';
				this.dh = this.Ab = 0;
				this.country = null;
				this.Td = false;
				this.Zb = this.Sd = null;
				this.Mb = 0;
				this.eb = false;
			}

			va(a) {
				a.m(this.eb ? 1 : 0);
				a.P(this.Mb);
				a.Fb(this.Zb);
				a.Fb(this.Sd);
				a.m(this.Td ? 1 : 0);
				a.Fb(this.country);
				a.P(this.dh);
				a.Fb(this.D);
				a.P(this.Ea);
				a.mb(this.X);
				a.m(this.Yb ? 1 : 0);
				a.hj(this.Bc);
				a.m(this.Zc);
				a.m(this.ea.aa);
				a.hj(null == this.J ? -1 : this.J.Cl);
			}

			wa(a, b) {
				this.eb = 0 != a.F();
				this.Mb = a.N();
				this.Zb = a.Bb();
				this.Sd = a.Bb();
				this.Td = 0 != a.F();
				this.country = a.Bb();
				this.dh = a.N();
				this.D = a.Bb();
				this.Ea = a.N();
				this.X = a.Cb();
				this.Yb = 0 != a.F();
				this.Bc = a.wi();
				this.Zc = a.F();
				let c = a.vf();
				this.ea = 1 == c ? class_u.ga : 2 == c ? class_u.Ca : class_u.Ma;
				a = a.wi();
				this.J = 0 > a ? null : b[a];
			}

			Qs() {
				let a = class_va.Cc
					,
					b = this.tn;
				this.Cc != a && (null == b && (this.tn = b = new class_ta),
					this.Cc = a,
					class_ta.Hs(b, this));
				return b;
			}

			static Hs(a, b) {
				a.eb = b.eb;
				a.Mb = b.Mb;
				a.Zb = b.Zb;
				a.Sd = b.Sd;
				a.Td = b.Td;
				a.country = b.country;
				a.dh = b.dh;
				a.Ab = b.Ab;
				a.D = b.D;
				a.Ea = b.Ea;
				a.X = b.X;
				a.Yb = b.Yb;
				a.Bc = b.Bc;
				a.Zc = b.Zc;
				a.J = null == b.J ? null : b.J.uc();
				a.ea = b.ea;
			}
		}

		class class_Ca {
		}

		class class_G {
			constructor() {
				this.Dd = 0;
				this.w = 32;
				this.h = 63;
				this.o = 1;
				this.a = new class_P(0, 0);
			}

			fa(a) {
				let b = this.a;
				a.u(b.x);
				a.u(b.y);
				a.u(this.o);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				let b = this.a;
				b.x = a.v();
				b.y = a.v();
				this.o = a.v();
				this.h = a.N();
				this.w = a.N();
			}
		}

		class class_kc {
			constructor() {
				this.Fa = 0;
				this.zk = this.Ak = false;
				this.Ve = 0;
				this.f = window.document.createElement('div');
				this.f.className = 'game-timer-view';
				this.f.appendChild(this.Cq = this.de('OVERTIME!', 'overtime'));
				this.f.appendChild(this.Wp = this.de('0', 'digit'));
				this.f.appendChild(this.Vp = this.de('0', 'digit'));
				this.f.appendChild(this.de(':', null));
				this.f.appendChild(this.Er = this.de('0', 'digit'));
				this.f.appendChild(this.Dr = this.de('0', 'digit'));
			}

			de(a, b) {
				let c = window.document.createElement('span');
				c.textContent = a;
				c.className = b;
				return c;
			}

			Vr(a) {
				if (a != this.Ve) {
					let b = a % 60
						,
						c = a / 60 | 0;
					this.Dr.textContent = '' + b % 10;
					this.Er.textContent = '' + (b / 10 | 0) % 10;
					this.Vp.textContent = '' + c % 10;
					this.Wp.textContent = '' + (c / 10 | 0) % 10;
					this.Ve = a;
				}
				this.cm();
				this.dm();
			}

			Wr(a) {
				this.Fa = a;
				this.cm();
				this.dm();
			}

			cm() {
				this.Rr(0 != this.Fa && this.Ve > this.Fa);
			}

			dm() {
				this.Xr(this.Ve < this.Fa && this.Ve > this.Fa - 30);
			}

			Rr(a) {
				a != this.zk && (this.Cq.className = a ? 'overtime on' : 'overtime',
					this.zk = a);
			}

			Xr(a) {
				a != this.Ak && (this.f.className = a ? 'game-timer-view time-warn' : 'game-timer-view',
					this.Ak = a);
			}
		}

		class class_Ua {
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
						e.un(e.oj);
					}
					;
					return n;
				}

				this.oj = [];
				this.Ps = a;
				this.Ja = class_x.Ha(class_Ua.Cj);
				let c = class_x.Aa(this.Ja)
					,
					d = new class_sb(c);
				this.yj = c.get('refresh');
				this.ln = c.get('join');
				a = c.get('create');
				this.Ks = c.get('count');
				let e = this;
				a.onclick = function () {
					class_H.i(e.ct);
				}
				;
				c.get('changenick').onclick = function () {
					class_H.i(e.bt);
				}
				;
				c.get('settings').onclick = function () {
					class_H.i(e.et);
				}
				;
				let f = c.get('replayfile');
				f.onchange = function () {
					var g = f.files;
					if (!(1 > g.length)) {
						g = g.item(0);
						var h = new FileReader;
						h.onload = function () {
							class_D.i(e.dt, h.result);
						}
						;
						h.readAsArrayBuffer(g);
					}
				}
				;
				this.Os = b('fil-full', true);
				this.ft = b('fil-pass', false); // Hide locked rooms
				this.Ns = b('fil-empty', true);
				this.Vs = c.get('listscroll');
				this.ht = class_ib.fi(this.Vs);
				this.rj = c.get('list');
				this.yj.onclick = function () {
					d.bm();
					e.fn();
				}
				;
				this.ln.onclick = function () {
					null != e.Wd && class_D.i(e.qn, e.Wd.lt);
				}
				;
				this.fn();
			}

			fn() {
				function a() {
					d.yj.disabled = false;
					d.un(b);
					return null;
				}

				this.xn(null);
				this.yj.disabled = true;
				class_x.Mf(this.rj);
				let b = [];
				this.oj = [];
				let c = class_ac.get().then(function (e) {
						return b = e;
					}, function () {
						return null;
					})
					,
					d = this;
				class_Ua.gt(c).then(a, a);
			}

			un(a) {
				this.oj = a;
				class_ac.nt(this.Ps, a);
				a.sort(function (k, l) {
					return k.We - l.We;
				});
				class_x.Mf(this.rj);
				let b = 0
					,
					c = 0
					,
					d = !this.Os.He
					,
					e = !this.ft.He
					,
					f = !this.Ns.He
					,
					g = this
					,
					h = 0;
				for (; h < a.length;) {
					let k = a[h];
					++h;
					let l = k.Ed;
					if (d && l.K >= l.hf)
						continue;
					if (e && l.Kb)
						continue;
					if (f && 0 == l.K)
						continue;
					let n = new class_zb(k);
					n.Ja.ondblclick = function () {
						class_D.i(g.qn, k);
					}
					;
					n.Ja.onclick = function () {
						g.xn(n);
					}
					;
					this.rj.appendChild(n.Ja);
					b += l.K;
					++c;
				}
				this.Ks.textContent = '' + b + ' players in ' + c + ' rooms';
				this.ht.update();
			}

			xn(a) {
				null != this.Wd && this.Wd.Ja.classList.remove('selected');
				this.Wd = a;
				null != this.Wd && this.Wd.Ja.classList.add('selected');
				this.ln.disabled = null == this.Wd;
			}

			static gt(a) {
				let b = new Promise(function (c, d) {
						window.setTimeout(function () {
							d(null);
						}, 5E3);
					}
				);
				return Promise.race([b, a]);
			}
		}

		class class_Tb {
			constructor(a) {
				this.Rd = a;
			}
		}

		class class_I {
			constructor() {
				this.Pg = this.Qg = this.xa = null;
				this.pk = 0;
				this.da = this.Y = this.ee = null;
				this.Hc = 0;
				this.o = 1;
				this.h = 63;
				this.w = 32;
				this.wb = 1 / 0;
				this.$a = true;
				this.S = 0;
			}

			fa(a) {
				let b = 0
					,
					c = a.a;
				a.m(0);
				a.m(this.Y.Dd);
				a.m(this.da.Dd);
				0 != this.Hc && (b = 1,
					a.u(this.Hc));
				this.wb != 1 / 0 && (b |= 2,
					a.u(this.wb));
				0 != this.S && (b |= 4,
					a.P(this.S));
				this.$a && (b |= 8);
				a.s.setUint8(c, b);
				a.u(this.o);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a, b) {
				let c = a.F();
				this.Y = b[a.F()];
				this.da = b[a.F()];
				this.Hc = 0 != (c & 1) ? a.v() : 0;
				this.wb = 0 != (c & 2) ? a.v() : 1 / 0;
				this.S = 0 != (c & 4) ? a.N() : 0;
				this.$a = 0 != (c & 8);
				this.o = a.v();
				this.h = a.N();
				this.w = a.N();
			}

			Uc(a) {
				a *= .017453292519943295;
				if (0 > a) {
					a = -a;
					let b = this.Y;
					this.Y = this.da;
					this.da = b;
					this.Hc = -this.Hc;
				}
				a > class_I.Dn && a < class_I.Cn && (this.wb = 1 / Math.tan(a / 2));
			}

			Wo() {
				return 0 != 0 * this.wb ? 0 : 114.59155902616465 * Math.atan(1 / this.wb);
			}

			oe() {
				if (0 == 0 * this.wb) {
					var a = this.da.a
						,
						b = this.Y.a
						,
						c = .5 * (a.x - b.x);
					a = .5 * (a.y - b.y);
					b = this.Y.a;
					let d = this.wb;
					this.ee = new class_P(b.x + c + -a * d, b.y + a + c * d);
					a = this.Y.a;
					b = this.ee;
					c = a.x - b.x;
					a = a.y - b.y;
					this.pk = Math.sqrt(c * c + a * a);
					c = this.Y.a;
					a = this.ee;
					this.Pg = new class_P(-(c.y - a.y), c.x - a.x);
					c = this.ee;
					a = this.da.a;
					this.Qg = new class_P(-(c.y - a.y), c.x - a.x);
					0 >= this.wb && (a = c = this.Pg,
						c.x = -a.x,
						c.y = -a.y,
						a = c = this.Qg,
						c.x = -a.x,
						c.y = -a.y);
				}
				else
					a = this.Y.a,
						b = this.da.a,
						c = a.x - b.x,
						a = -(a.y - b.y),
						b = Math.sqrt(a * a + c * c),
						this.xa = new class_P(a / b, c / b);
			}
		}

		class class_ib {
			static fi(a) {
				return new PerfectScrollbar(a, {
					handlers: class_ib.op
				});
			}
		}

		/** Dynamic disc */
		class class_xa {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Cl = 0;
				this.h = this.w = 63;
				this.$j = 0;
				this.S = 16777215;
				this.Da = .99;
				this.ba = 1;
				this.o = .5;
				this.V = 10;
				this.pa = new class_P(0, 0);
				this.G = new class_P(0, 0);
				this.a = new class_P(0, 0);
			}

			fa(a) {
				var b = this.a;
				a.u(b.x);
				a.u(b.y);
				b = this.G;
				a.u(b.x);
				a.u(b.y);
				b = this.pa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.V);
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Da);
				a.ub(this.S);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				var b = this.a;
				b.x = a.v();
				b.y = a.v();
				b = this.G;
				b.x = a.v();
				b.y = a.v();
				b = this.pa;
				b.x = a.v();
				b.y = a.v();
				this.V = a.v();
				this.o = a.v();
				this.ba = a.v();
				this.Da = a.v();
				this.S = a.ib();
				this.h = a.N();
				this.w = a.N();
			}

			ko(a) {
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
					c = this.ba / (this.ba + a.ba);
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

			lo(a) {
				if (0 != 0 * a.wb) {
					var b = a.Y.a;
					var c = a.da.a;
					var d = c.x - b.x;
					var e = c.y - b.y
						,
						f = this.a;
					var g = f.x - c.x;
					c = f.y - c.y;
					f = this.a;
					if (0 >= (f.x - b.x) * d + (f.y - b.y) * e || 0 <= g * d + c * e)
						return;
					d = a.xa;
					b = d.x;
					d = d.y;
					g = b * g + d * c;
				}
				else {
					d = a.ee;
					g = this.a;
					b = g.x - d.x;
					d = g.y - d.y;
					g = a.Pg;
					c = a.Qg;
					if ((0 < g.x * b + g.y * d && 0 < c.x * b + c.y * d) == 0 >= a.wb)
						return;
					c = Math.sqrt(b * b + d * d);
					if (0 == c)
						return;
					g = c - a.pk;
					b /= c;
					d /= c;
				}
				c = a.Hc;
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
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_xa),
					this.jc = a,
					class_xa.zd(b, this));
				return b;
			}

			static zd(a, b) {
				a.V = b.V;
				a.o = b.o;
				a.ba = b.ba;
				a.Da = b.Da;
				a.S = b.S;
				a.$j = b.$j;
				a.h = b.h;
				a.w = b.w;
				var c = a.a
					,
					d = b.a;
				c.x = d.x;
				c.y = d.y;
				c = a.G;
				d = b.G;
				c.x = d.x;
				c.y = d.y;
				a = a.pa;
				b = b.pa;
				a.x = b.x;
				a.y = b.y;
			}
		}

		class class_O {
			static mj(a, b) {
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

		class class_pb {
			constructor() {
				this.f = class_x.Ha(class_pb.O);
				let a = class_x.Aa(this.f);
				this.Eb = a.get('input');
				this.mf = a.get('ok');
				let b = this;
				a.get('cancel').onclick = function () {
					null != b.Va && b.Va(null);
				}
				;
				this.Eb.maxLength = 30;
				this.Eb.oninput = function () {
					b.B();
				}
				;
				this.Eb.onkeydown = function (c) {
					13 == c.keyCode && b.Ic() && null != b.Va && b.Va(b.Eb.value);
				}
				;
				this.mf.onclick = function () {
					b.Ic() && null != b.Va && b.Va(b.Eb.value);
				}
				;
				this.B();
			}

			Ic() {
				let a = this.Eb.value;
				return 30 >= a.length ? 0 < a.length : false;
			}

			B() {
				this.mf.disabled = !this.Ic();
			}
		}

		class class_ob {
			constructor(a) {
				this.f = class_x.Ha(class_ob.O);
				var b = class_x.Aa(this.f);
				this.yh = b.get('cancel');
				this.mk = b.get('create');
				this.lf = b.get('name');
				this.Dl = b.get('pass');
				this.ii = b.get('max-pl');
				this.Wm = b.get('unlisted');
				this.lf.maxLength = 40;
				this.lf.value = a;
				let c = this;
				this.lf.oninput = function () {
					c.B();
				}
				;
				this.Dl.maxLength = 30;
				this.Wm.onclick = function () {
					c.Tj(!c.Xm);
				}
				;
				this.yh.onclick = function () {
					class_H.i(c.ki);
				}
				;
				this.mk.onclick = function () {
					if (c.Ic()) {
						let d = c.Dl.value;
						'' == d && (d = null);
						class_D.i(c.iq, {
							name: c.lf.value,
							password: d,
							Ys: c.ii.selectedIndex + 2,
							pt: c.Xm
						});
					}
				}
				;
				for (a = 2; 21 > a;)
					b = window.document.createElement('option'),
						b.textContent = '' + a++,
						this.ii.appendChild(b);
				this.ii.selectedIndex = 10;
				this.Tj(false);
				this.B();
			}

			Tj(a) {
				this.Xm = a;
				this.Wm.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes');
			}

			Ic() {
				let a = this.lf.value;
				return 40 >= a.length ? 0 < a.length : false;
			}

			B() {
				this.mk.disabled = !this.Ic();
			}
		}

		/** Goal */
		class class_Eb {
			constructor() {
				this.ye = class_u.Ma;
				this.da = new class_P(0, 0);
				this.Y = new class_P(0, 0);
			}

			fa(a) {
				var b = this.Y;
				a.u(b.x);
				a.u(b.y);
				b = this.da;
				a.u(b.x);
				a.u(b.y);
				a.m(this.ye.aa);
			}

			ka(a) {
				var b = this.Y;
				b.x = a.v();
				b.y = a.v();
				b = this.da;
				b.x = a.v();
				b.y = a.v();
				a = a.vf();
				this.ye = 1 == a ? class_u.ga : 2 == a ? class_u.Ca : class_u.Ma;
			}
		}

		class class_Ba {
			static i(a, b, c) {
				null != a && a(b, c);
			}
		}

		class class_vc {
		}

		/** Player physics */
		class class_bc {
			constructor() {
				this.cf = 0;
				this.V = 15;
				this.w = 0;
				this.pa = new class_P(0, 0);
				this.ba = this.o = .5;
				this.Da = .96;
				this.Ne = .1;
				this.df = .07;
				this.ef = .96;
				this.bf = 5;
			}

			fa(a) {
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Da);
				a.u(this.Ne);
				a.u(this.df);
				a.u(this.ef);
				a.u(this.bf);
				let b = this.pa;
				a.u(b.x);
				a.u(b.y);
				a.P(this.w);
				a.u(this.V);
				a.u(this.cf);
			}

			ka(a) {
				this.o = a.v();
				this.ba = a.v();
				this.Da = a.v();
				this.Ne = a.v();
				this.df = a.v();
				this.ef = a.v();
				this.bf = a.v();
				let b = this.pa;
				b.x = a.v();
				b.y = a.v();
				this.w = a.N();
				this.V = a.v();
				this.cf = a.v();
			}
		}

		class class_Gc {
			static qj() {
				class_p.Ia(class_Fb);
				class_p.Ia(class_Ia);
				class_p.Ia(class_Ya);
				class_p.Ia(class_Ja);
				class_p.Ia(class_Za);
				class_p.Ia(class_Ga);
				class_p.Ia(class_ma);
				class_p.Ia(class_$a);
				class_p.Ia(class_ab);
				class_p.Ia(class_bb);
				class_p.Ia(class_ya);
				class_p.Ia(class_Ka);
				class_p.Ia(class_fa);
				class_p.Ia(class_La);
				class_p.Ia(class_Ma);
				class_p.Ia(class_cb);
				class_p.Ia(class_Na);
				class_p.Ia(class_Fa);
				class_p.Ia(class_Oa);
				class_p.Ia(class_db);
				class_p.Ia(class_Gb);
				class_p.Ia(class_Pa);
				class_p.Ia(class_Hb);
				class_p.Ia(class_Ib);
			}
		}

		/** Room Manager */
		class class_Ea {
			/** @param {class_Ha|class_Rb} a */
			constructor(a) {
				this.Zf = null;
				this.Yk = this.Eh = false;
				this.gd = window.performance.now();
				this.Od = null;
				this.Oe = 0;
				this.co = new class_Ab(3, 1E3);
				this.Ea = new class_wc;
				this.Lg = 'Waiting for link';
				this.Hi = this.tm = false;
				this.Bd = 0;
				let b = this;
				this.$f = new class_cc(a, function (d) {
						b.l.Oa.Ib(d);
					}
				);
				this.ya = a;
				a.U.Eo = function (d) {
					b.tm != d && (b.tm = d,
						a.sa(class_Na.na(d)));
				}
				;
				this.l = new class_wa(a.xc);
				window.top.document.body.classList.add('hb-playing');
				this.Nh = new class_Xb(this.l, a.U.oa(a.xc).D);
				this.Nh.Ai(a.U);
				this.l.Oa.yl = function_M(this, this.fq);
				this.l.Oa.ug = function_M(this, this.eq);
				window.document.addEventListener('keydown', function_M(this, this.rb));
				window.document.addEventListener('keyup', function_M(this, this.Kd));
				window.onbeforeunload = function () {
					return 'Are you sure you want to leave the room?';
				}
				;
				this.Ea.zg = function (d) {
					a.B();
					a.sa(d);
				}
				;
				this.Ea.Zp = function (d) {
					'ToggleChat' == d && b.l.Oa.ns();
				}
				;
				this.l.Wa.Bq = function (d) {
					a.sa(class_ya.na(1, d));
				}
				;
				this.l.Wa.tq = function (d) {
					a.sa(class_ya.na(0, d));
				}
				;
				this.l.Ag = function (d) {
					a.sa(class_Ka.na(d));
				}
				;
				this.l.Wa.yq = function () {
					a.sa(new class_$a);
				}
				;
				this.l.Wa.zq = function () {
					a.sa(new class_ab);
				}
				;
				this.l.Wa.mq = function () {
					b.Tm();
				}
				;
				this.l.Wa.yg = function (d, e) {
					a.sa(class_fa.na(d, e));
				}
				;
				this.l.Wa.le = function_M(this, this.wr);
				this.l.Wa.bq = function () {
					a.sa(new class_cb);
				}
				;
				this.l.Wa.pq = function () {
					class_Ea.ar(a);
				}
				;
				this.l.Wa.Aq = function (d) {
					a.sa(class_La.na(d));
				}
				;
				this.l.Wa.sf = function (d) {
					let e = a.U.oa(d);
					if (null != e) {
						let f = new class_rb(e, b.Hi);
						f.qb = function () {
							b.l.cb(null);
						}
						;
						f.aq = function (g, h) {
							a.sa(class_Ma.na(g, h));
						}
						;
						f.mi = function () {
							b.Yr(e);
						}
						;
						b.l.cb(f.f, function () {
							f.B(a.U, b.Hi);
						});
					}
				}
				;
				this.l.Wa.wq = function () {
					let d = new class_tb;
					d.qb = function () {
						b.l.cb(null);
					}
					;
					b.l.cb(d.f, function () {
						d.Qr(b.Lg);
					});
				}
				;
				this.l.Wa.qq = function () {
					if (null == b.Od)
						b.cs();
					else {
						let d = b.Od.stop();
						b.Od = null;
						class_Ea.qm(d);
					}
					b.l.Wa.Tr(null != b.Od);
				}
				;
				window.requestAnimationFrame(function_M(this, this.nf));
				this.Lh = window.setInterval(function () {
					b.l.Ff.Am(b.Bd);
					b.Bd = 0;
				}, 1E3);
				this.ws = window.setInterval(function () {
					a.B();
				}, 50);
				var c = class_m.j.Ad.A();
				c = -200 > c ? -200 : 1E3 < c ? 1E3 : c;
				0 != c && (a.zm(class_m.j.Ad.A()),
					this.l.Oa.Ib('Extrapolation set to ' + c + ' msec'));


				// Exposing global fields begin
				window.parent.g.insideRoom = true;
				window.parent.g.roomManager = b;
				console.log('Room manager: %o', b);

				window.parent.g.getRoomManager = () => getRoomManagerObject(b);
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
								x: Math.abs(goals[0].p0.x),
								y: Math.abs(goals[0].p0.y)
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
				// Exposing global fields end
			}

			cs() {
				this.Od = new class_nc(this.ya, 3);
			}

			Yr(a) {
				a = new class_Jb(a);
				let b = this;
				a.qb = function () {
					b.l.cb(null);
				}
				;
				a.mi = function (c, d, e) {
					b.ya.sa(class_ma.na(c, d, e));
					b.l.cb(null);
				}
				;
				this.l.cb(a.f);
			}

			ja() {
				window.document.removeEventListener('keydown', function_M(this, this.rb));
				window.document.removeEventListener('keyup', function_M(this, this.Kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Oe);
				window.top.document.body.classList.remove('hb-playing');
				this.Ea.ja();
				window.clearInterval(this.Lh);
				window.clearInterval(this.ws);
				window.clearTimeout(this.Zf);
			}

			wr(a) {
				let b = []
					,
					c = 0
					,
					d = this.ya.U.K;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.ea == a && b.push(class_fa.na(e.X, class_u.Ma));
				}
				for (a = 0; a < b.length;)
					this.ya.sa(b[a++]);
			}

			nf() {
				this.Oe = window.requestAnimationFrame(function_M(this, this.nf));
				this.Ea.B();
				this.ya.B();
				this.Qc();
			}

			Qc() {
				var a = window.performance.now();
				1 == class_m.j.Kh.A() && 28.333333333333336 > a - this.gd || (this.gd = a,
					this.Bd++,
					a = this.ya.U.oa(this.ya.xc),
				null != a && (this.Hi = a.eb),
					this.l.B(this.ya));
			}

			fq(a) {
				let b = this;
				this.$f.tf(a) || this.co.uo(function () {
					let c = new class_Za;
					c.$c = a;
					b.ya.sa(c);
				});
			}

			eq(a) {
				this.Eh = a;
				let b = this;
				null == this.Zf && (this.Zf = window.setTimeout(function () {
					b.Zf = null;
					b.um(b.Eh);
				}, 1E3),
					this.um(this.Eh));
			}

			um(a) {
				a != this.Yk && (this.ya.sa(class_Ia.na(a ? 0 : 1)),
					this.Yk = a);
			}

			Tm() {
				if (null != this.ya.U.M) {
					let a = new class_bb;
					a.Lf = 120 != this.ya.U.M.Qa;
					this.ya.sa(a);
				}
			}

			rb(a) {
				var b = class_m.j.Ac;
				let c = null != class_m.j.me.A().A(a.code);
				switch (a.keyCode) {
					case 9:
					case 13:
						this.l.Oa.Za.focus({
							preventScroll: true
						});
						a.preventDefault();
						break;
					case 27:
						this.l.vp() ? this.l.cb(null) : (b = this.l,
							b.ue(!b.nd));
						a.preventDefault();
						break;
					case 48:
						c ? this.Ea.rb(a) : b.ta(0.1);
						break;
					case 49:
						c ? this.Ea.rb(a) : b.ta(1);
						break;
					case 50:
						c ? this.Ea.rb(a) : b.ta(2);
						break;
					case 51:
						c ? this.Ea.rb(a) : b.ta(3);
						break;
					case 52:
						c ? this.Ea.rb(a) : b.ta(4);
						break;
					case 53:
						c ? this.Ea.rb(a) : b.ta(5);
						break;
					case 54:
						c ? this.Ea.rb(a) : b.ta(6);
						break;
					case 55:
						c ? this.Ea.rb(a) : b.ta(7);
						break;
					case 56:
						c ? this.Ea.rb(a) : b.ta(15);
						break;
					case 57:
						c ? this.Ea.rb(a) : b.ta(-1.5);
						break;
					case 80:
						this.Tm();
						break;
					default:
						this.Ea.rb(a);
				}
			}

			Kd(a) {
				this.Ea.Kd(a);
			}

			static qm(a) {
				let b = new Date;
				class_Wb.Br(a, 'HBReplay-' + b.getFullYear() + '-' + class_ca.Kf('' + (b.getMonth() + 1)) + '-' + class_ca.Kf('' + b.getDate()) + '-' + class_ca.Kf('' + b.getHours()) + 'h' + class_ca.Kf('' + b.getMinutes()) + 'm.hbr2');
			}

			static ar(a) {
				var b = a.U.K;
				let c = [];
				var d = 0;
				let e = 0;
				for (var f = 0; f < b.length;) {
					let g = b[f];
					++f;
					g.ea == class_u.Ma && c.push(g.X);
					g.ea == class_u.ga ? ++d : g.ea == class_u.Ca && ++e;
				}
				f = c.length;
				0 != f && (b = function () {
					return c.splice(Math.random() * c.length | 0, 1)[0];
				}
					,
					e == d ? 2 > f || (a.sa(class_fa.na(b(), class_u.ga)),
						a.sa(class_fa.na(b(), class_u.Ca))) : (d = e > d ? class_u.ga : class_u.Ca,
						a.sa(class_fa.na(b(), d))));
			}
		}

		class class_qa {
			constructor(a, b, c, d) {
				this.D = a;
				this.As = d;
				this.ei = b;
				d = null;
				null != b && (d = b.getItem(a));
				this.$m = c(d);
			}

			A() {
				return this.$m;
			}

			ta(a) {
				this.$m = a;
				if (null != this.ei)
					try {
						let b = this.As(a);
						null == b ? this.ei.removeItem(this.D) : this.ei.setItem(this.D, b);
					}
					catch (b) {
					}
			}
		}

		class class_Kb {
			constructor() {
				this.S = 0;
				this.we = 1 / 0;
				this.Jb = this.fc = 100;
				this.fe = this.ge = 0;
			}

			fa(a) {
				a.m(this.fe);
				a.m(this.ge);
				a.u(this.Jb);
				a.u(this.fc);
				a.u(this.we);
				a.P(this.S);
			}

			ka(a) {
				this.fe = a.F();
				this.ge = a.F();
				this.Jb = a.v();
				this.fc = a.v();
				this.we = a.v();
				this.S = a.N();
			}

			B(a) {
				var b = a[this.fe];
				a = a[this.ge];
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
						d = b.ba / (b.ba + a.ba);
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
								b = b.ba,
								d.x = h.x + e * b,
								d.y = h.y + c * b,
								d = b = a.G,
								a = a.ba,
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

		class class_oc {
			constructor(a) {
				this.gd = window.performance.now();
				this.Bd = this.Oe = 0;
				this.ya = a;
				this.l = new class_wa(a.xc);
				let b = new class_Xb(this.l);
				b.Ai(a.U);
				window.document.addEventListener('keydown', function_M(this, this.rb));
				window.document.addEventListener('keyup', function_M(this, this.Kd));
				window.requestAnimationFrame(function_M(this, this.nf));
				let c = this;
				this.Lh = window.setInterval(function () {
					c.l.Ff.Am(c.Bd);
					c.Bd = 0;
				}, 1E3);
				this.Dm(class_m.j.Ac.A());
				this.l.f.classList.add('replayer');
				this.qe = new class_Qa(a);
				this.qe.vq = function () {
					b.rs(a.U);
				}
				;
				this.qe.uq = function () {
					c.l.ue(null == a.U.M);
					b.Ai(a.U);
				}
				;
				this.qe.xl = function () {
					c.l.hb.fb.xr();
				}
				;
				this.l.f.appendChild(this.qe.f);
			}

			ja() {
				window.document.removeEventListener('keydown', function_M(this, this.rb));
				window.document.removeEventListener('keyup', function_M(this, this.Kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Oe);
				window.clearInterval(this.Lh);
			}

			nf() {
				this.Oe = window.requestAnimationFrame(function_M(this, this.nf));
				this.ya.B();
				this.Qc();
			}

			Qc() {
				this.qe.B();
				let a = window.performance.now();
				1 == class_m.j.Kh.A() && 28.333333333333336 > a - this.gd || (this.gd = a,
					this.Bd++,
					this.Dm(class_m.j.Ac.A()),
				0 < this.ya.Pd || this.l.B(this.ya));
			}

			rb(a) {
				switch (a.keyCode) {
					case 27:
						let b = this.l;
						b.ue(!b.nd);
						a.preventDefault();
						break;
					case 48:
						class_m.j.Ac.ta(0.1);
						break;
					case 49:
						class_m.j.Ac.ta(1);
						break;
					case 50:
						class_m.j.Ac.ta(2);
						break;
					case 51:
						class_m.j.Ac.ta(3);
						break;
					case 52:
						class_m.j.Ac.ta(4);
						break;
					case 53:
						class_m.j.Ac.ta(5);
						break;
					case 54:
						class_m.j.Ac.ta(6);
						break;
					case 55:
						class_m.j.Ac.ta(7);
						break;
					case 56:
						class_m.j.Ac.ta(15);
						break;
					case 57:
						class_m.j.Ac.ta(-1.5);
						break;
				}
			}

			Dm() {
				let a = class_m.j.Ac.A()
					,
					b = this.l.hb.fb;
				b.re = class_m.j.Fi.A();
				b.Tg = 35;
				// Modified zoom
				b.Md = 0;
				b.Gg = 1 + .25 * (a - 1);
			}

			Kd() {
			}
		}

		class class_Jb {
			constructor(a) {
				this.f = class_x.Ha(class_Jb.O);
				let b = class_x.Aa(this.f);
				this.kf = b.get('title');
				this.xi = b.get('reason');
				this.Qn = b.get('ban-btn');
				this.Sn = b.get('ban-text');
				this.af = b.get('kick');
				this.wd = b.get('close');
				let c = this;
				this.Qn.onclick = function () {
					c.Oj(!c.Xj);
				}
				;
				this.wd.onclick = function () {
					class_H.i(c.qb);
				}
				;
				this.af.onclick = function () {
					class_pc.i(c.mi, c.Qb, c.xi.value, c.Xj);
				}
				;
				this.xi.onkeydown = function (d) {
					return d.stopPropagation();
				}
				;
				this.xi.maxLength = 100;
				this.Qb = a.X;
				this.kf.textContent = 'Kick ' + a.D;
				this.Oj(false);
			}

			Oj(a) {
				this.Xj = a;
				this.Sn.textContent = a ? 'Yes' : 'No';
			}
		}

		/** Game */
		class class_ba {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Sb = this.Nb = this.Mc = this.Qa = 0;
				this.he = class_u.ga;
				this.yc = this.Db = 0;
				this.ua = new class_eb;
				this.Fa = 0;
				this.jb = 5;
				/** @type {class_q} */
				this.T = null;
			}

			rp(a) {
				this.Pa = a;
				this.jb = a.jb;
				this.Fa = a.Fa;
				this.T = a.T;
				this.ua.L = this.T.L;
				this.ua.ra = this.T.ra;
				this.ua.W = this.T.W;
				this.ua.pb = this.T.pb;
				a = 0;
				let b = this.T.H;
				for (; a < b.length;)
					this.ua.H.push(b[a++].Pp());
				this.Wk();
			}

			Tk(a) {
				if (a.ea == class_u.Ma)
					a.J = null;
				else {
					a.Ea = 0;
					var b = a.J;
					null == b && (b = new class_xa,
						a.J = b,
						this.ua.H.push(b));
					var c = this.T.Ld;
					b.S = 0;
					b.V = c.V;
					b.ba = c.ba;
					b.Da = c.Da;
					b.o = c.o;
					b.h = 39;
					b.w = a.ea.w | c.w;
					var d = a.ea == class_u.ga ? this.T.Nd : this.T.vd;
					0 == d.length ? (b.a.x = a.ea.Hh * this.T.bc,
						b.a.y = 0) : (a = b.a,
						d = d[d.length - 1],
						a.x = d.x,
						a.y = d.y);
					d = b.G;
					d.x = 0;
					d.y = 0;
					b = b.pa;
					c = c.pa;
					b.x = c.x;
					b.y = c.y;
				}
			}

			B(a) {
				if (0 < this.Qa)
					120 > this.Qa && this.Qa--;
				else {
					// Exposing global fields begin
					const onGameTickFun = window.parent.g.onGameTick;
					if (onGameTickFun != null)
						onGameTickFun(getGameObject(this));
					// Exposing global fields end

					var b = this.Pa.tt;
					null != b && b();
					b = this.Pa.K;
					for (var c = 0; c < b.length;) {
						var d = b[c];
						++c;
						if (null != d.J) {
							0 == (d.Ea & 16) && (d.Yb = false);
							var e = this.T.Ld;
							0 < d.Zc && d.Zc--;
							d.Bc < this.Pa.je && d.Bc++;
							if (d.Yb && 0 >= d.Zc && 0 <= d.Bc) {
								for (var f = false, g = 0, h = this.ua.H; g < h.length;) {
									var k = h[g];
									++g;
									if (0 != (k.w & 64) && k != d.J) {
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
											l = e.bf;
											var t = n = k.G;
											k = k.ba;
											n.x = t.x + f * l * k;
											n.y = t.y + r * l * k;
											t = d.J;
											k = -e.cf;
											n = l = t.G;
											t = t.ba;
											l.x = n.x + f * k * t;
											l.y = n.y + r * k * t;
											f = true;
										}
									}
								}
								f && (null != this.Pa.si && this.Pa.si(d),
									d.Yb = false,
									d.Zc = this.Pa.Hd,
									d.Bc -= this.Pa.fd);
							}
							f = d.Ea;
							h = g = 0;
							0 != (f & 1) && --h;
							0 != (f & 2) && ++h;
							0 != (f & 4) && --g;
							0 != (f & 8) && ++g;
							0 != g && 0 != h && (f = Math.sqrt(g * g + h * h),
								g /= f,
								h /= f);
							f = d.J.G;
							k = d.Yb ? e.df : e.Ne;
							f.x += g * k;
							f.y += h * k;
							d.J.Da = d.Yb ? e.ef : e.Da;
						}
					}
					c = 0;
					d = this.ua.H;
					e = 0;
					for (g = d.length; e < g;)
						f = e++,
							h = d[f],
						0 != (h.w & 128) && (class_ba.vk[c] = f,
							f = class_ba.pl[c],
							h = h.a,
							f.x = h.x,
							f.y = h.y,
							++c);
					this.ua.B(a);
					if (0 == this.Db) {
						for (a = 0; a < b.length;)
							c = b[a],
								++a,
							null != c.J && (c.J.h = 39 | this.he.zp);
						b = this.ua.H[0].G;
						0 < b.x * b.x + b.y * b.y && (this.Db = 1);
					}
					else if (1 == this.Db) {
						this.Mc += .016666666666666666;
						for (a = 0; a < b.length;)
							d = b[a],
								++a,
							null != d.J && (d.J.h = 39);
						d = class_u.Ma;
						b = this.ua.H;
						for (a = 0; a < c && (d = a++,
							d = this.T.eo(b[class_ba.vk[d]].a, class_ba.pl[d]),
						d == class_u.Ma);)
							;
						d != class_u.Ma ? (this.Db = 2,
							this.yc = 150,
							this.he = d,
							d == class_u.ga ? this.Nb++ : this.Sb++,
						null != this.Pa.Yi && this.Pa.Yi(d.Bg),
						null != this.Pa.hm && this.Pa.hm(d.aa)) : 0 < this.Fa && this.Mc >= 60 * this.Fa && this.Sb != this.Nb && (null != this.Pa.$i && this.Pa.$i(),
							this.Mm());
					}
					else if (2 == this.Db)
						this.yc--,
						0 >= this.yc && (0 < this.jb && (this.Sb >= this.jb || this.Nb >= this.jb) || 0 < this.Fa && this.Mc >= 60 * this.Fa && this.Sb != this.Nb ? this.Mm() : (this.Wk(),
						null != this.Pa.Lq && this.Pa.Lq()));
					else if (3 == this.Db && (this.yc--,
					0 >= this.yc && (b = this.Pa,
					null != b.M))) {
						b.M = null;
						a = 0;
						for (c = b.K; a < c.length;)
							d = c[a],
								++a,
								d.J = null,
								d.Mb = 0;
						null != b.Gf && b.Gf(null);
					}
				}
			}

			Mm() {
				this.yc = 300;
				this.Db = 3;
				null != this.Pa.Zi && this.Pa.Zi(this.Sb > this.Nb ? class_u.ga : class_u.Ca);
			}

			Wk() {
				let a = this.Pa.K;
				this.Db = 0;
				for (var b = this.T.H, c = this.ua.H, d = 0, e = this.T.zf ? b.length : 1; d < e;) {
					var f = d++;
					b[f].Sk(c[f]);
				}
				b = [0, 0, 0];
				for (c = 0; c < a.length;)
					if (d = a[c],
						++c,
						this.Tk(d),
						e = d.ea,
					e != class_u.Ma) {
						f = d.J.a;
						var g = this.T
							,
							h = b[e.aa]
							,
							k = e == class_u.ga ? g.Nd : g.vd;
						0 == k.length ? (k = h + 1 >> 1,
						0 == (h & 1) && (k = -k),
							g = g.mc * e.Hh,
							h = 55 * k) : (h >= k.length && (h = k.length - 1),
							h = k[h],
							g = h.x,
							h = h.y);
						f.x = g;
						f.y = h;
						b[e.aa]++;
						d.Mb = b[e.aa];
					}
			}

			fa(a) {
				this.ua.fa(a);
				a.P(this.yc);
				a.P(this.Db);
				a.P(this.Sb);
				a.P(this.Nb);
				a.u(this.Mc);
				a.P(this.Qa);
				a.m(this.he.aa);
			}

			ka(a, b) {
				this.ua.ka(a);
				this.yc = a.N();
				this.Db = a.N();
				this.Sb = a.N();
				this.Nb = a.N();
				this.Mc = a.v();
				this.Qa = a.N();
				a = a.vf();
				this.he = 1 == a ? class_u.ga : 2 == a ? class_u.Ca : class_u.Ma;
				this.Pa = b;
				this.jb = b.jb;
				this.Fa = b.Fa;
				this.T = b.T;
				this.ua.L = this.T.L;
				this.ua.W = this.T.W;
				this.ua.ra = this.T.ra;
				this.ua.pb = this.T.pb;
			}

			uc() {
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_ba),
					this.jc = a,
					class_ba.zd(b, this));
				return b;
			}

			static zd(a, b) {
				a.Pa = b.Pa.uc();
				a.jb = b.jb;
				a.Fa = b.Fa;
				a.ua = b.ua.uc();
				a.yc = b.yc;
				a.Db = b.Db;
				a.Sb = b.Sb;
				a.Nb = b.Nb;
				a.Mc = b.Mc;
				a.Qa = b.Qa;
				a.T = b.T;
				a.he = b.he;
			}
		}

		class class_aa {
			constructor(a, b, c) {
				this.f = class_x.Ha(class_aa.O);
				var d = class_x.Aa(this.f);
				d.get('ok');
				d.get('cancel');
				this.ce = d.get('content');
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
						class_D.i(g.Va, l);
					}
					;
					d.appendChild(n);
				}
				this.ce.textContent = b;
				e.textContent = a;
			}
		}

		class class_Xa {
			constructor() {
				this.gg = this.Yh = false;
				this.f = class_x.Ha(class_Xa.O);
				let a = class_x.Aa(this.f);
				this.hd = a.get('log');
				this.ci = a.get('log-contents');
				this.Za = a.get('input');
				this.Za.maxLength = 140;
				let b = this;
				a.get('drag').onmousedown = function (c) {
					function d(h) {
						h.preventDefault();
						class_m.j.gk.ta(function_fc(function_fc(e + (f - h.y))));
						b.Za.blur();
						b.gg = false;
						b.wf();
					}

					b.f.classList.add('dragging');
					let e = b.kk()
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
				this.Fc = new class_dc(a.get('autocompletebox'), function (c, d) {
						b.Za.value = c;
						b.Za.setSelectionRange(d, d);
					}
				);
				this.Za.onkeydown = function (c) {
					switch (c.keyCode) {
						case 9:
							c.preventDefault();
							b.Fc.Pb.hidden ? b.Za.blur() : b.Fc.Ko();
							break;
						case 13:
							null != b.yl && '' != b.Za.value && b.yl(b.Za.value);
							b.Za.value = '';
							b.Za.blur();
							break;
						case 27:
							b.Fc.Pb.hidden ? (b.Za.value = '',
								b.Za.blur()) : b.Fc.Uh();
							break;
						case 38:
							b.Fc.dk(-1);
							break;
						case 40:
							b.Fc.dk(1);
					}
					c.stopPropagation();
				}
				;
				this.Za.onfocus = function () {
					null != b.ug && b.ug(true);
					b.Yh = true;
					b.wf();
				}
				;
				this.Za.onblur = function () {
					null != b.ug && b.ug(false);
					b.Yh = false;
					b.Fc.Uh();
					b.wf();
				}
				;
				this.Za.oninput = function () {
					b.Fc.ao(b.Za.value, b.Za.selectionStart);
				}
				;
				this.wf();
			}

			ns() {
				this.gg = !this.gg;
				this.wf();
			}

			wf() {
				let a = '' + this.kk();
				this.f.style.height = a + 'px';
			}

			kk() {
				let a = function_fc(class_m.j.gk.A());
				if (this.Yh) {
					let b = function_fc(class_m.j.Ah.A());
					a <= b && (a = b);
				}
				else
					this.gg && (a = 0);
				return a;
			}

			Np(a, b, c) {
				let d = window.document.createElement('p');
				d.className = 'announcement';
				d.textContent = a;
				0 <= b && (d.style.color = class_T.nc(b));
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
				this.dl(d);
			}

			dl(a) {
				var b = this.hd.clientHeight;
				b = this.hd.scrollTop + b - this.hd.scrollHeight >= .5 * -b || !class_Xa.tp(this.hd);
				this.ci.appendChild(a);
				b && (this.hd.scrollTop = this.hd.scrollHeight);
				for (a = b ? 50 : 100; this.ci.childElementCount > a;)
					this.ci.firstElementChild.remove();
			}

			ca(a, b) {
				let c = window.document.createElement('p');
				null != b && (c.className = b);
				c.textContent = a;
				this.dl(c);
			}

			Ib(a) {
				this.ca(a, 'notice');
			}

			static tp(a) {
				return a.parentElement.querySelector(':hover') == a;
			}
		}

		class class_Kc {
			static tf(a) {
				a = a.split(' ');
				let b = a[4];
				if ('typ' != a[6])
					throw class_v.C(null);
				return {
					ps: a[7],
					sp: b
				};
			}
		}

		class class_ua {
			constructor() {
				this.od = 16777215;
				this.gb = [];
			}

			fa(a) {
				a.m(this.sd);
				a.P(this.od);
				a.m(this.gb.length);
				let b = 0
					,
					c = this.gb;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			ka(a) {
				this.sd = a.F();
				this.od = a.N();
				let b = a.F();
				if (3 < b)
					throw class_v.C('too many');
				this.gb = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.gb.push(a.N());
			}
		}

		class class_Ub {
			static i(a, b, c, d, e) {
				null != a && a(b, c, d, e);
			}
		}

		class class_dc {
			constructor(a, b) {
				this.Vj = [];
				this.hr = /[#@][^\s@#]*$/;
				this.Pb = a;
				this.rq = b;
				a.hidden = true;
			}

			Uh() {
				this.ej(null);
			}

			ao(a, b) {
				b = this.hr.exec(class_O.substr(a, 0, b));
				if (null != b) {
					var c = b[0]
						,
						d = class_O.substr(c, 1, null).split('')
						,
						e = class_dc.Po
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
					this.Vk = '#' == c.charAt(0);
					this.Bi = b.index;
					this.vr = c.length;
					this.fm = a;
					a = function (l) {
						l = k.exec(l.D);
						return null == l ? -1 : l.index + l[0].length;
					}
					;
					b = [];
					c = 0;
					for (d = this.Vj; c < d.length;)
						e = d[c],
							++c,
							f = a(e),
						0 <= f && b.push({
							wn: f,
							item: e
						});
					b.sort(function (l, n) {
						return l.wn - n.wn;
					});
					this.ej(b);
				}
				else
					this.ej(null);
			}

			Dk(a) {
				a = this.Vk ? '#' + a.aa : '@' + class_ca.replace(a.D, ' ', '_');
				this.rq(class_O.substr(this.fm, 0, this.Bi) + a + ' ' + class_O.substr(this.fm, this.Bi + this.vr, null), this.Bi + a.length + 1);
			}

			ej(a) {
				var b = null != a && 0 != a.length;
				this.Pb.hidden || class_x.Mf(this.Pb);
				this.cd = null;
				this.Pb.hidden = !b;
				if (b) {
					var c = this;
					b = [];
					for (var d = 0; d < a.length;) {
						var e = a[d++];
						let f = window.document.createElement('div')
							,
							g = e.item;
						e = g.D;
						this.Vk && (e = '(' + g.aa + ') ' + e);
						f.textContent = e;
						this.Pb.appendChild(f);
						f.onclick = function () {
							c.Dk(g);
						}
						;
						b.push({
							item: g,
							Ja: f
						});
					}
					this.cd = b;
					this.cd[0].Ja.classList.toggle('selected', true);
					this.zc = 0;
				}
			}

			dk(a) {
				if (null != this.cd) {
					var b = this.zc;
					this.zc += a;
					a = this.cd.length - 1;
					0 > this.zc ? this.zc = a : this.zc > a && (this.zc = 0);
					a = this.cd[this.zc];
					b != this.zc && (a.Ja.classList.toggle('selected', true),
						this.cd[b].Ja.classList.toggle('selected', false));
					a = a.Ja;
					b = a.offsetTop;
					a = b + a.offsetHeight;
					var c = this.Pb.scrollTop + this.Pb.clientHeight;
					b < this.Pb.scrollTop ? this.Pb.scrollTop = b : a > c && (this.Pb.scrollTop = a - this.Pb.clientHeight);
				}
			}

			Ko() {
				null != this.cd && (this.Dk(this.cd[this.zc].item),
					this.Uh());
			}

			static Po(a) {
				return -1 != '.$^{[(|)*+?\\'.indexOf(a) ? '\\' + a : a;
			}
		}

		class class_Qa {
			constructor(a) {
				function b() {
					let t = g[f];
					a.Il = e ? t : 0;
					c.get('spd').textContent = t + 'x';
				}

				this.jg = false;
				this.f = class_x.Ha(class_Qa.O);
				let c = class_x.Aa(this.f);
				this.Ci = a;
				let d = this;
				c.get('reset').onclick = function () {
					a.Di();
					d.xl();
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
				this.hs = c.get('time');
				let k = c.get('timebar');
				this.$q = c.get('progbar');
				let l = c.get('timetooltip')
					,
					n = 0
					,
					r = a.kl;
				for (; n < r.length;) {
					let t = r[n];
					++n;
					let z = window.document.createElement('div');
					z.className = 'marker';
					z.classList.add('k' + t.kind);
					z.style.left = 100 * t.wj + '%';
					k.appendChild(z);
				}
				k.onclick = function (t) {
					a.Fr((t.pageX - k.offsetLeft) / k.clientWidth * a.qh * a.xf);
					d.jg || (d.jg = true,
						d.vq(),
						d.xl());
				}
				;
				k.onmousemove = function (t) {
					t = (t.pageX - k.offsetLeft) / k.clientWidth;
					l.textContent = class_Qa.ll(a.xf * a.qh * t);
					return l.style.left = 'calc(' + 100 * t + '% - 30px)';
				}
				;
				this.Dp = c.get('leave');
				this.Dp.onclick = function () {
					class_H.i(d.ke);
				};
			}

			B() {
				this.hs.textContent = class_Qa.ll(this.Ci.Tb);
				this.$q.style.width = 100 * this.Ci.$o() + '%';
				!this.jg || 0 < this.Ci.Pd || (this.jg = false,
					this.uq());
			}

			static ll(a) {
				a = a / 1E3 | 0;
				return (a / 60 | 0) + ':' + class_ca.Kf(class_Q.Fe(a % 60));
			}
		}

		/** Team */
		class class_u {
			constructor(a, b, c, d, e, f, g, h) {
				/** @type {class_u} */
				this.Bg = null;
				this.aa = a;
				this.S = b;
				this.Hh = c;
				this.zp = d;
				this.D = e;
				this.Co = f;
				this.w = h;
				this.Om = new class_ua;
				this.Om.gb.push(b);
			}
		}

		class class_Dc {
			constructor(a) {
				this.current = 0;
				this.Es = a;
			}

			next() {
				return this.Es[this.current++];
			}
		}

		class class_Ob {
			constructor(a, b) {
				this.Ja = a;
				this.value = b;
				a.textContent = '' + b;
			}

			set(a) {
				this.value != a && (this.value = a,
					this.Ja.textContent = '' + this.value);
			}
		}

		class class_cc {
			constructor(a, b) {
				this.ya = a;
				this.ca = b;
			}

			tf(a) {
				if ('/' != a.charAt(0))
					return false;
				if (1 == a.length)
					return true;
				a = class_ca.mt(class_O.substr(a, 1, null)).split(' ');
				let b = a[0]
					,
					c = this;
				switch (b) {
					case 'avatar':
						2 == a.length && (this.ym(a[1]),
							this.ca('Avatar set'));
						break;
					case 'checksum':
						var d = this.ya.U.T;
						a = d.D;
						d.$e() ? this.ca('Current stadium is original: "' + a + '"') : (d = class_ca.eh(d.hk(), 8),
							this.ca('Stadium: "' + a + '" (checksum: ' + d + ')'));
						break;
					case 'clear_avatar':
						this.ym(null);
						this.ca('Avatar cleared');
						break;
					case 'clear_bans':
						null == this.be ? this.ca('Only the host can clear bans') : (this.be(),
							this.ca('All bans have been cleared'));
						break;
					case 'clear_password':
						null == this.Og ? this.ca('Only the host can change the password') : (this.Og(null),
							this.ca('Password cleared'));
						break;
					case 'colors':
						try {
							d = class_cc.Dq(a),
								this.ya.sa(d);
						}
						catch (g) {
							a = class_v.Lb(g).Gb(),
							'string' == typeof a && this.ca(a);
						}
						break;
					case 'extrapolation':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && -200 <= a && 1E3 >= a ? (class_m.j.Ad.ta(a),
								this.ya.zm(a),
								this.ca('Extrapolation set to ' + a + ' msec')) : this.ca('Extrapolation must be a value between -200 and 50 milliseconds')) : this.ca('Extrapolation requires a value in milliseconds.');
						break;
					case 'handicap':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && 0 <= a && 300 >= a ? (this.ya.Nr(a),
								this.ca('Ping handicap set to ' + a + ' msec')) : this.ca('Ping handicap must be a value between 0 and 300 milliseconds')) : this.ca('Ping handicap requires a value in milliseconds.');
						break;
					case 'kick_ratelimit':
						if (4 > a.length)
							this.ca('Usage: /kick_ratelimit <min> <rate> <burst>');
						else {
							d = class_Q.parseInt(a[1]);
							var e = class_Q.parseInt(a[2]);
							a = class_Q.parseInt(a[3]);
							null == d || null == e || null == a ? this.ca('Invalid arguments') : this.ya.sa(class_Pa.na(d, e, a));
						}
						break;
					case 'recaptcha':
						if (null == this.Bm)
							this.ca('Only the host can set recaptcha mode');
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
									this.Bm(e);
									this.ca('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
								}
								else
									throw class_v.C(null);
							}
							catch (g) {
								this.ca('Usage: /recaptcha <on|off>');
							}
						break;
					case 'set_password':
						2 == a.length && (null == this.Og ? this.ca('Only the host can change the password') : (this.Og(a[1]),
							this.ca('Password set')));
						break;
					case 'store':
						let f = this.ya.U.T;
						f.$e() ? this.ca('Can\'t store default stadium.') : class_wb.kt().then(function () {
							return class_wb.add(f);
						}).then(function () {
							c.ca('Stadium stored');
						}, function () {
							c.ca('Couldn\'t store stadium');
						});
						break;
					default:
						this.ca('Unrecognized command: "' + b + '"');
				}
				return true;
			}

			ym(a) {
				null != a && (a = class_ha.Xc(a, 2));
				class_m.j.uh.ta(a);
				this.ya.sa(class_Oa.na(a));
			}

			static Dq(a) {
				if (3 > a.length)
					throw class_v.C('Not enough arguments');
				if (7 < a.length)
					throw class_v.C('Too many arguments');
				let b = new class_db
					,
					c = new class_ua;
				b.ah = c;
				switch (a[1]) {
					case 'blue':
						c.gb = [class_u.Ca.S];
						b.ea = class_u.Ca;
						break;
					case 'red':
						c.gb = [class_u.ga.S];
						b.ea = class_u.ga;
						break;
					default:
						throw class_v.C('First argument must be either "red" or "blue"');
				}
				if ('clear' == a[2])
					return b;
				c.sd = 256 * class_Q.parseInt(a[2]) / 360 | 0;
				c.od = class_Q.parseInt('0x' + a[3]);
				if (4 < a.length) {
					c.gb = [];
					let d = 4
						,
						e = a.length;
					for (; d < e;)
						c.gb.push(class_Q.parseInt('0x' + a[d++]));
				}
				return b;
			}
		}

		class class_tc {
			constructor(a) {
				this.f = a;
				let b = class_x.Aa(a);
				this.Un = b.get('sound-bar');
				this.qp = b.get('sound-icon');
				this.Tn = b.get('sound-bar-bg');
				let c = this;
				b.get('sound-btn').onclick = function () {
					class_m.j.ve.ta(!class_m.j.ve.A());
					c.B();
				}
				;
				b.get('sound-slider').onmousedown = function (d) {
					function e(g) {
						g.preventDefault();
						{
							let h = c.Tn.getBoundingClientRect();
							g = (g.clientY - h.top) / h.height;
						}
						g = 1 - g;
						class_m.j.Si.ta(1 < g ? 1 : 0 > g ? 0 : g);
						class_m.j.ve.ta(true);
						c.B();
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
				this.B();
			}

			B() {
				let a = class_m.j.Si.A()
					,
					b = !class_m.j.ve.A();
				if (this.Bp != a || this.Ap != b)
					this.Bp = a,
					(this.Ap = b) && (a = 0),
						this.qp.className = 'icon-' + (0 >= a ? 'volume-off' : .5 >= a ? 'volume-down' : 'volume-up'),
						this.Un.style.top = 100 * (1 - a) + '%',
						class_m.Na.zi();
			}
		}

		class class_m {
		}

		class class_ac {
			static parse(a) {
				a.F();
				let b = [];
				for (; 0 != a.s.byteLength - a.a;) {
					let c = a.pe(a.Rb())
						,
						d = a.Wl(a.Rb());
					try {
						let e = new class_Qb;
						e.ka(new class_J(new DataView(d), false));
						let f = new class_xc;
						f.Ed = e;
						f.aa = c;
						b.push(f);
					}
					catch (e) {
					}
				}
				return b;
			}

			static Rs(a, b, c, d) {
				return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
			}

			static nt(a, b) {
				let c = a.Jc;
				a = a.Lc;
				let d = 0;
				for (; d < b.length;) {
					let e = b[d];
					++d;
					let f = e.Ed;
					e.We = 6378 * class_ac.Rs(.017453292519943295 * f.Jc, .017453292519943295 * f.Lc, .017453292519943295 * c, .017453292519943295 * a);
					isFinite(e.We) || (e.We = 22E3);
				}
			}

			static get() {
				return class_Y.A(class_m.Pe + 'api/list', 'arraybuffer').then(function (a) {
					return class_ac.parse(new class_J(new DataView(a), false));
				});
			}
		}

		class class_Qb {
			constructor() {
			}

			ck() {
				this.D = class_ha.Xc(this.D, 40);
				this.vb = class_ha.Xc(this.vb, 3);
			}

			fa(a) {
				this.ck();
				a.Ta = true;
				a.Wb(this.Rd);
				a.an(this.D);
				a.an(this.vb);
				a.gj(this.Jc);
				a.gj(this.Lc);
				a.m(this.Kb ? 1 : 0);
				a.m(this.hf);
				a.m(this.K);
				a.Ta = false;
			}

			ka(a) {
				a.Ta = true;
				this.Rd = a.Rb();
				this.D = a.Yl();
				this.vb = a.Yl();
				this.Jc = a.vi();
				this.Lc = a.vi();
				this.Kb = 0 != a.F();
				this.hf = a.F();
				this.K = a.F();
				a.Ta = false;
				if (30 < this.K || 30 < this.hf)
					throw class_v.C(null);
				this.ck();
			}
		}

		class class_Ec {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_p {
			constructor() {
				class_p.zb || this.Ya();
			}

			Ya() {
				this.Dc = 0;
			}

			sn() {
				return true;
			}

			apply() {
				throw class_v.C('missing implementation');
			}

			wa() {
				throw class_v.C('missing implementation');
			}

			va() {
				throw class_v.C('missing implementation');
			}

			static Ga(a) {
				null == a.delay && (a.delay = true);
				null == a.Ba && (a.Ba = true);
				return a;
			}

			static Ia(a) {
				a.Fn = class_p.If;
				if (null == a.za)
					throw class_v.C('Class doesn\'t have a config');
				a.prototype.Jf = a.za;
				class_p.hn.set(class_p.If, a);
				class_p.If++;
			}

			static vj(a, b) {
				let c = class_w.en(a).Fn;
				if (null == c)
					throw class_v.C('Tried to pack unregistered action');
				b.m(c);
				a.va(b);
			}

			static oh(a) {
				var b = a.F();
				b = Object.create(class_p.hn.get(b).prototype);
				b.Dc = 0;
				b.nb = 0;
				b.wa(a);
				return b;
			}
		}

		class class_Jc {
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

		class class_Cb {
			constructor() {
				this.f = class_x.Ha(class_Cb.O);
				let a = class_x.Aa(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_D.i(b.qb, false);
				}
				;
				a.get('leave').onclick = function () {
					class_D.i(b.qb, true);
				};
			}
		}

		class class_Ac {
			static tf(a) {
				let b = new class_mc('([^&=]+)=?([^&]*)', 'g');
				a = a.substring(1);
				var c = 0;
				let d = new Map;
				for (; b.Ws(a, c);) {
					c = b.on(1);
					c = decodeURIComponent(c.split('+').join(' '));
					let e = b.on(2);
					d.set(c, decodeURIComponent(e.split('+').join(' ')));
					c = b.Xs();
					c = c.wj + c.Us;
				}
				return d;
			}

			static A() {
				return class_Ac.tf(window.top.location.search);
			}
		}

		class class_A {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Ta = b;
				this.a = 0;
			}

			Sg() {
				let a = new ArrayBuffer(this.a)
					,
					b = new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
				(new Uint8Array(a)).set(b);
				return a;
			}

			Vb() {
				return new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
			}

			Qd() {
				return new DataView(this.s.buffer, this.s.byteOffset, this.a);
			}

			ks() {
				return new class_J(this.Qd(), this.Ta);
			}

			tc(a) {
				this.s.byteLength < a && this.yr(2 * this.s.byteLength >= a ? 2 * this.s.byteLength : a);
			}

			yr(a) {
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
				this.s.setInt16(b, a, this.Ta);
			}

			Wb(a) {
				let b = this.a;
				this.a += 2;
				this.tc(this.a);
				this.s.setUint16(b, a, this.Ta);
			}

			P(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setInt32(b, a, this.Ta);
			}

			ub(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setUint32(b, a, this.Ta);
			}

			gj(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setFloat32(b, a, this.Ta);
			}

			u(a) {
				let b = this.a;
				this.a += 8;
				this.tc(this.a);
				this.s.setFloat64(b, a, this.Ta);
			}

			Xb(a) {
				let b = this.a;
				this.a += a.byteLength;
				this.tc(this.a);
				(new Uint8Array(this.s.buffer, this.s.byteOffset, this.s.byteLength)).set(a, b);
			}

			Vg(a) {
				this.Xb(new Uint8Array(a));
			}

			oc(a) {
				this.mb(class_A.Wf(a));
				this.Xg(a);
			}

			Fb(a) {
				null == a ? this.mb(0) : (this.mb(class_A.Wf(a) + 1),
					this.Xg(a));
			}

			an(a) {
				let b = class_A.Wf(a);
				if (255 < b)
					throw class_v.C(null);
				this.m(b);
				this.Xg(a);
			}

			Wg(a) {
				this.oc(JSON.stringify(a));
			}

			Xg(a) {
				let b = this.a;
				this.tc(b + class_A.Wf(a));
				let c = a.length
					,
					d = 0;
				for (; d < c;)
					b += class_A.Oo(class_O.mj(a, d++), this.s, b);
				this.a = b;
			}

			mb(a) {
				let b = this.a;
				a >>>= 0;
				this.tc(b + class_A.Zn(a));
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

			static ia(a, b) {
				null == b && (b = false);
				null == a && (a = 16);
				return new class_A(new DataView(new ArrayBuffer(a)), b);
			}

			static Oo(a, b, c) {
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

			static Yn(a) {
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

			static Wf(a) {
				let b = 0
					,
					c = a.length
					,
					d = 0;
				for (; d < c;)
					b += class_A.Yn(class_O.mj(a, d++));
				return b;
			}

			static Zn(a) {
				a >>>= 0;
				return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5;
			}
		}

		class class_xc {
			constructor() {
			}
		}

		class class_Z {
			constructor(a) {
				let b = new class_aa('Only humans', '', []);
				this.f = b.f;
				b.ce.style.minHeight = '78px';
				let c = this;
				class_ub.Ep().then(function (d) {
					null == class_Z.Ig && (class_Z.Ig = window.document.createElement('div'),
						b.ce.appendChild(class_Z.Ig),
						class_Z.cr = d.render(class_Z.Ig, {
							sitekey: a,
							callback: function (e) {
								class_D.i(class_Z.$l, e);
							},
							theme: 'dark'
						}));
					d.reset(class_Z.cr);
					class_Z.$l = function (e) {
						window.setTimeout(function () {
							class_D.i(c.Va, e);
						}, 1E3);
						class_Z.$l = null;
					}
					;
					b.ce.appendChild(class_Z.Ig);
				});
			}
		}

		/** Stadium */
		class class_q {
			constructor() {
				this.L = [];
				this.W = [];
				this.ra = [];
				this.vc = [];
				this.H = [];
				this.pb = [];
				this.Nd = [];
				this.vd = [];
				this.Ld = new class_bc;
				this.Gh = 255;
				this.Re = this.jf = 0;
				this.Xf = true;
				this.zf = false;
			}

			pg() {
				let a = new class_za;
				a.S = 16777215;
				a.h = 63;
				a.w = 193;
				a.V = 10;
				a.Da = .99;
				a.ba = 1;
				a.o = .5;
				return a;
			}

			fa(a) {
				a.m(this.Gh);
				if (!this.$e()) {
					a.Fb(this.D);
					a.P(this.ud);
					a.u(this.ae);
					a.u(this.$d);
					a.u(this.ad);
					a.u(this.Gc);
					a.u(this.Qe);
					a.P(this.td);
					a.u(this.bc);
					a.u(this.sc);
					a.u(this.mc);
					this.Ld.fa(a);
					a.Wb(this.jf);
					a.m(this.Re);
					a.m(this.Xf ? 1 : 0);
					a.m(this.zf ? 1 : 0);
					a.m(this.L.length);
					for (var b = 0, c = this.L.length; b < c;) {
						var d = b++;
						let e = this.L[d];
						e.Dd = d;
						e.fa(a);
					}
					a.m(this.W.length);
					b = 0;
					for (c = this.W; b < c.length;)
						c[b++].fa(a);
					a.m(this.ra.length);
					b = 0;
					for (c = this.ra; b < c.length;)
						c[b++].fa(a);
					a.m(this.vc.length);
					b = 0;
					for (c = this.vc; b < c.length;)
						c[b++].fa(a);
					a.m(this.H.length);
					b = 0;
					for (c = this.H; b < c.length;)
						c[b++].fa(a);
					a.m(this.pb.length);
					b = 0;
					for (c = this.pb; b < c.length;)
						c[b++].fa(a);
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

			qs(a) {
				function b() {
					let f = []
						,
						g = a.F()
						,
						h = 0;
					for (; h < g;) {
						++h;
						let k = new class_P(0, 0);
						k.x = a.v();
						k.y = a.v();
						f.push(k);
					}
					return f;
				}

				this.D = a.Bb();
				this.ud = a.N();
				this.ae = a.v();
				this.$d = a.v();
				this.ad = a.v();
				this.Gc = a.v();
				this.Qe = a.v();
				this.td = a.N();
				this.bc = a.v();
				this.sc = a.v();
				this.mc = a.v();
				this.Ld.ka(a);
				this.jf = a.Rb();
				this.Re = a.F();
				this.Xf = 0 != a.F();
				this.zf = 0 != a.F();
				this.L = [];
				for (var c = a.F(), d = 0; d < c;) {
					var e = new class_G;
					e.ka(a);
					e.Dd = d++;
					this.L.push(e);
				}
				this.W = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_I,
						e.ka(a, this.L),
						this.W.push(e);
				this.ra = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_R,
						e.ka(a),
						this.ra.push(e);
				this.vc = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_Eb,
						e.ka(a),
						this.vc.push(e);
				this.H = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_za,
						e.ka(a),
						this.H.push(e);
				this.pb = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_Kb,
						e.ka(a),
						this.pb.push(e);
				this.Nd = b();
				this.vd = b();
				this.oe();
				if (!this.Zm())
					throw class_v.C(new class_Ra('Invalid stadium'));
			}

			Zm() {
				return 0 >= this.H.length || 0 > this.Gc || 0 > this.ad || 0 > this.Ld.V ? false : true;
			}

			oe() {
				let a = 0
					,
					b = this.W;
				for (; a < b.length;)
					b[a++].oe();
			}

			$e() {
				return 255 != this.Gh;
			}

			ie(a, b) {
				a = a[b];
				return null != a ? class_w.I(a, E) : 0;
			}

			Mp(a) {
				a = a.canBeStored;
				return null != a ? class_w.I(a, Fc) : true;
			}

			Ae() {
				return JSON.stringify(this.ls());
			}

			ls() {
				if (!this.Xf) {
					//throw class_v.C(0);
					console.debug(getStadiumObject(this).name + ' canBeStored bypassed');
				}
				let a = {};
				for (var b = 0, c = [], d = 0, e = this.L; d < e.length;) {
					var f = e[d];
					++d;
					f.Dd = b++;
					c.push(class_q.zs(f));
				}
				d = new class_I;
				b = [];
				e = 0;
				for (f = this.W; e < f.length;)
					b.push(class_q.Gr(f[e++], d));
				d = [];
				e = 0;
				for (f = this.ra; e < f.length;)
					d.push(class_q.Gq(f[e++]));
				e = [];
				f = 0;
				for (var g = this.vc; f < g.length;)
					e.push(class_q.cp(g[f++]));
				f = class_q.Jq(this.Ld);
				var h = new class_za;
				g = [];
				for (var k = 0, l = this.H; k < l.length;)
					g.push(class_q.Go(l[k++], h));
				h = [];
				k = 0;
				for (l = this.pb; k < l.length;)
					h.push(class_q.xp(l[k++]));
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
				class_q.ma(c, 'maxViewWidth', this.jf, 0);
				class_q.ma(c, 'cameraFollow', 1 == this.Re ? 'player' : '', '');
				class_q.ma(c, 'spawnDistance', this.mc, 200);
				0 != h.length && (c.joints = h);
				0 != k.length && (c.redSpawnPoints = k);
				0 != l.length && (c.blueSpawnPoints = l);
				class_q.ma(c, 'kickOffReset', this.zf ? 'full' : 'partial', 'partial');
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
				class_q.ma(a, 'type', b, 'none');
				class_q.ma(a, 'width', this.ae, 0);
				class_q.ma(a, 'height', this.$d, 0);
				class_q.ma(a, 'kickOffRadius', this.ad, 0);
				class_q.ma(a, 'cornerRadius', this.Gc, 0);
				class_q.Cg(a, this.td, 7441498);
				class_q.ma(a, 'goalLine', this.Qe, 0);
				return c;
			}

			al(a) {
				function b(h) {
					let k = class_w.I(h[0], E);
					h = class_w.I(h[1], E);
					null == h && (h = 0);
					null == k && (k = 0);
					return new class_P(k, h);
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
									class_q.On(t, f),
										h.push(l(t));
								}
								catch (z) {
									throw class_v.C(new class_Ra('Error in "' + k + '" index: ' + h.length));
								}
							}
				}

				let d = JSON5.parse(a);
				this.L = [];
				this.W = [];
				this.ra = [];
				this.vc = [];
				this.H = [];
				this.pb = [];
				this.D = class_w.I(d.name, String);
				this.bc = class_w.I(d.width, E);
				this.sc = class_w.I(d.height, E);
				this.jf = this.ie(d, 'maxViewWidth') | 0;
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
				this.ae = this.ie(a, 'width');
				this.$d = this.ie(a, 'height');
				this.ad = this.ie(a, 'kickOffRadius');
				this.Gc = this.ie(a, 'cornerRadius');
				this.td = 7441498;
				null != a.color && (this.td = class_q.ng(a.color));
				this.Qe = this.ie(a, 'goalLine');
				this.Xf = this.Mp(d);
				this.zf = 'full' == d.kickOffReset;
				let f = d.traits;
				a = d.ballPhysics;
				'disc0' != a && (null != a ? (a = class_q.bl(a, this.pg()),
					a.w |= 192,
					this.H.push(a)) : this.H.push(this.pg()));
				c(this.L, 'vertexes', class_q.Lp);
				let g = this;
				c(this.W, 'segments', function (h) {
					return class_q.Kp(h, g.L);
				});
				c(this.vc, 'goals', class_q.Gp);
				c(this.H, 'discs', function (h) {
					return class_q.bl(h, new class_za);
				});
				c(this.ra, 'planes', class_q.Ip);
				c(this.pb, 'joints', function (h) {
					return class_q.Hp(h, g.H);
				}, true);
				c(this.Nd, 'redSpawnPoints', b, true);
				c(this.vd, 'blueSpawnPoints', b, true);
				a = d.playerPhysics;
				null != a && (this.Ld = class_q.Jp(a));
				if (255 < this.L.length || 255 < this.W.length || 255 < this.ra.length || 255 < this.vc.length || 255 < this.H.length)
					throw class_v.C('Error');
				this.oe();
				if (!this.Zm())
					throw class_v.C(new class_Ra('Invalid stadium'));
			}

			hk() {
				let a = class_q.js;
				a.a = 0;
				this.fa(a);
				let b = new class_yc;
				b.Fs(a.Vb());
				b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
				b.hash += b.hash << 15;
				return b.hash | 0;
			}

			eo(a, b) {
				let c = 0
					,
					d = this.vc;
				for (; c < d.length;) {
					let h = d[c];
					++c;
					var e = h.Y
						,
						f = h.da
						,
						g = b.x - a.x;
					let k = b.y - a.y;
					0 < -(e.y - a.y) * g + (e.x - a.x) * k == 0 < -(f.y - a.y) * g + (f.x - a.x) * k ? e = false : (g = f.x - e.x,
						f = f.y - e.y,
						e = 0 < -(a.y - e.y) * g + (a.x - e.x) * f == 0 < -(b.y - e.y) * g + (b.x - e.x) * f ? false : true);
					if (e)
						return h.ye;
				}
				return class_u.Ma;
			}

			jd(a, b, c, d, e, f, g, h) {
				null == h && (h = 0);
				this.D = a;
				this.H.push(this.pg());
				this.bc = b;
				this.sc = c;
				this.ud = 1;
				this.td = 7441498;
				this.ae = d;
				this.$d = e;
				this.ad = g;
				this.Gc = h;
				this.mc = .75 * d;
				400 < this.mc && (this.mc = 400);
				a = new class_R;
				var k = a.xa;
				k.x = 0;
				k.y = 1;
				a.Ua = -c;
				a.o = 0;
				this.ra.push(a);
				a = new class_R;
				k = a.xa;
				k.x = 0;
				k.y = -1;
				a.Ua = -c;
				a.o = 0;
				this.ra.push(a);
				a = new class_R;
				k = a.xa;
				k.x = 1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.ra.push(a);
				a = new class_R;
				k = a.xa;
				k.x = -1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.ra.push(a);
				this.qg(d, 1, f, 13421823, class_u.Ca);
				this.qg(-d, -1, f, 16764108, class_u.ga);
				this.gl(g, c);
				b = new class_R;
				c = b.xa;
				c.x = 0;
				c.y = 1;
				b.Ua = -e;
				b.h = 1;
				this.ra.push(b);
				b = new class_R;
				c = b.xa;
				c.x = 0;
				c.y = -1;
				b.Ua = -e;
				b.h = 1;
				this.ra.push(b);
				b = new class_G;
				c = b.a;
				c.x = -d;
				c.y = -e;
				b.h = 0;
				c = new class_G;
				g = c.a;
				g.x = d;
				g.y = -e;
				c.h = 0;
				g = new class_G;
				a = g.a;
				a.x = d;
				a.y = -f;
				g.h = 0;
				a = new class_G;
				k = a.a;
				k.x = d;
				k.y = f;
				a.h = 0;
				k = new class_G;
				var l = k.a;
				l.x = d;
				l.y = e;
				k.h = 0;
				l = new class_G;
				var n = l.a;
				n.x = -d;
				n.y = e;
				l.h = 0;
				n = new class_G;
				var r = n.a;
				r.x = -d;
				r.y = f;
				n.h = 0;
				r = new class_G;
				var t = r.a;
				t.x = -d;
				t.y = -f;
				r.h = 0;
				f = new class_I;
				f.Y = c;
				f.da = g;
				f.h = 1;
				f.$a = false;
				t = new class_I;
				t.Y = a;
				t.da = k;
				t.h = 1;
				t.$a = false;
				let z = new class_I;
				z.Y = l;
				z.da = n;
				z.h = 1;
				z.$a = false;
				let K = new class_I;
				K.Y = r;
				K.da = b;
				K.h = 1;
				K.$a = false;
				this.L.push(b);
				this.L.push(c);
				this.L.push(g);
				this.L.push(a);
				this.L.push(k);
				this.L.push(l);
				this.L.push(n);
				this.L.push(r);
				this.W.push(f);
				this.W.push(t);
				this.W.push(z);
				this.W.push(K);
				this.el(d, e, h);
				this.oe();
			}

			fl(a, b, c, d, e, f, g, h) {
				this.D = a;
				this.H.push(this.pg());
				this.bc = b;
				this.sc = c;
				this.ud = 2;
				this.ae = d;
				this.$d = e;
				this.ad = 75;
				this.Gc = h;
				this.Qe = g;
				this.mc = .75 * (d - g);
				400 < this.mc && (this.mc = 400);
				a = new class_R;
				var k = a.xa;
				k.x = 0;
				k.y = 1;
				a.Ua = -c;
				a.o = 0;
				this.ra.push(a);
				a = new class_R;
				k = a.xa;
				k.x = 0;
				k.y = -1;
				a.Ua = -c;
				a.o = 0;
				this.ra.push(a);
				a = new class_R;
				k = a.xa;
				k.x = 1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.ra.push(a);
				a = new class_R;
				k = a.xa;
				k.x = -1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.ra.push(a);
				this.qg(d - g, 1, f, 13421823, class_u.Ca, 63);
				this.qg(-d + g, -1, f, 16764108, class_u.ga, 63);
				this.gl(75, c);
				b = new class_R;
				c = b.xa;
				c.x = 0;
				c.y = 1;
				b.Ua = -e;
				b.h = 1;
				this.ra.push(b);
				b = new class_R;
				c = b.xa;
				c.x = 0;
				c.y = -1;
				b.Ua = -e;
				b.h = 1;
				this.ra.push(b);
				b = new class_R;
				c = b.xa;
				c.x = 1;
				c.y = 0;
				b.Ua = -d;
				b.h = 1;
				this.ra.push(b);
				b = new class_R;
				c = b.xa;
				c.x = -1;
				c.y = 0;
				b.Ua = -d;
				b.h = 1;
				this.ra.push(b);
				this.el(d, e, h);
				this.oe();
			}

			qg(a, b, c, d, e, f) {
				var g;
				null == g && (g = 32);
				null == f && (f = 1);
				var h = new class_G
					,
					k = h.a;
				k.x = a + 8 * b;
				k.y = -c;
				k = new class_G;
				var l = k.a;
				l.x = a + 8 * b;
				l.y = c;
				let n = new class_G;
				l = n.a;
				l.x = h.a.x + 22 * b;
				l.y = h.a.y + 22;
				let r = new class_G;
				l = r.a;
				l.x = k.a.x + 22 * b;
				l.y = k.a.y - 22;
				l = new class_I;
				l.Y = h;
				l.da = n;
				l.Uc(90 * b);
				let t = new class_I;
				t.Y = r;
				t.da = n;
				let z = new class_I;
				z.Y = r;
				z.da = k;
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
						this.L[k].w = g,
						this.L[k].o = .1;
				b = this.W.length;
				this.W.push(l);
				this.W.push(t);
				this.W.push(z);
				h = b;
				for (b = this.W.length; h < b;)
					k = h++,
						this.W[k].h = f,
						this.W[k].w = g,
						this.W[k].o = .1;
				f = new class_za;
				g = f.a;
				g.x = a;
				g.y = -c;
				f.ba = 0;
				f.V = 8;
				f.S = d;
				this.H.push(f);
				f = new class_za;
				g = f.a;
				g.x = a;
				g.y = c;
				f.ba = 0;
				f.V = 8;
				f.S = d;
				this.H.push(f);
				d = new class_Eb;
				f = d.Y;
				f.x = a;
				f.y = -c;
				f = d.da;
				f.x = a;
				f.y = c;
				d.ye = e;
				this.vc.push(d);
			}

			gl(a, b) {
				let c = new class_G;
				var d = c.a;
				d.x = 0;
				d.y = -b;
				c.o = .1;
				c.w = 24;
				c.h = 6;
				d = new class_G;
				var e = d.a;
				e.x = 0;
				e.y = -a;
				d.o = .1;
				d.w = 24;
				d.h = 6;
				e = new class_G;
				var f = e.a;
				f.x = 0;
				f.y = a;
				e.o = .1;
				e.w = 24;
				e.h = 6;
				a = new class_G;
				f = a.a;
				f.x = 0;
				f.y = b;
				a.o = .1;
				a.w = 24;
				a.h = 6;
				b = new class_I;
				b.Y = c;
				b.da = d;
				b.w = 24;
				b.h = 6;
				b.$a = false;
				b.o = .1;
				f = new class_I;
				f.Y = e;
				f.da = a;
				f.w = 24;
				f.h = 6;
				f.$a = false;
				f.o = .1;
				let g = new class_I;
				g.Y = d;
				g.da = e;
				g.w = 8;
				g.h = 6;
				g.$a = false;
				g.Uc(180);
				g.o = .1;
				let h = new class_I;
				h.Y = e;
				h.da = d;
				h.w = 16;
				h.h = 6;
				h.$a = false;
				h.Uc(180);
				h.o = .1;
				this.L.push(c);
				this.L.push(d);
				this.L.push(e);
				this.L.push(a);
				this.W.push(b);
				this.W.push(f);
				this.W.push(g);
				this.W.push(h);
			}

			el(a, b, c) {
				if (!(0 >= c)) {
					var d = new class_G
						,
						e = d.a;
					e.x = -a + c;
					e.y = -b;
					d.h = 0;
					e = new class_G;
					var f = e.a;
					f.x = -a;
					f.y = -b + c;
					e.h = 0;
					f = new class_G;
					var g = f.a;
					g.x = -a + c;
					g.y = b;
					f.h = 0;
					g = new class_G;
					var h = g.a;
					h.x = -a;
					h.y = b - c;
					g.h = 0;
					h = new class_G;
					var k = h.a;
					k.x = a - c;
					k.y = b;
					h.h = 0;
					k = new class_G;
					var l = k.a;
					l.x = a;
					l.y = b - c;
					k.h = 0;
					l = new class_G;
					var n = l.a;
					n.x = a - c;
					n.y = -b;
					l.h = 0;
					n = new class_G;
					var r = n.a;
					r.x = a;
					r.y = -b + c;
					n.h = 0;
					a = new class_I;
					a.Y = d;
					a.da = e;
					a.h = 1;
					a.$a = false;
					a.o = 1;
					a.Uc(-90);
					b = new class_I;
					b.Y = f;
					b.da = g;
					b.h = 1;
					b.$a = false;
					b.o = 1;
					b.Uc(90);
					c = new class_I;
					c.Y = h;
					c.da = k;
					c.h = 1;
					c.$a = false;
					c.o = 1;
					c.Uc(-90);
					r = new class_I;
					r.Y = l;
					r.da = n;
					r.h = 1;
					r.$a = false;
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
					this.W.push(a);
					this.W.push(b);
					this.W.push(c);
					this.W.push(r);
				}
			}

			static ka(a) {
				var b = a.F();
				return 255 == b ? (b = new class_q,
					b.qs(a),
					b) : class_q.Oh()[b];
			}

			static Oh() {
				if (null == class_q.xb) {
					class_q.xb = [];
					var a = new class_q;
					a.jd('Classic', 420, 200, 370, 170, 64, 75);
					class_q.xb.push(a);
					a = new class_q;
					a.jd('Easy', 420, 200, 370, 170, 90, 75);
					class_q.xb.push(a);
					a = new class_q;
					a.jd('Small', 420, 200, 320, 130, 55, 70);
					class_q.xb.push(a);
					a = new class_q;
					a.jd('Big', 600, 270, 550, 240, 80, 80);
					class_q.xb.push(a);
					a = new class_q;
					a.jd('Rounded', 420, 200, 370, 170, 64, 75, 75);
					class_q.xb.push(a);
					a = new class_q;
					a.fl('Hockey', 420, 204, 398, 182, 68, 120, 100);
					class_q.xb.push(a);
					a = new class_q;
					a.fl('Big Hockey', 600, 270, 550, 240, 90, 160, 150);
					class_q.xb.push(a);
					a = new class_q;
					a.jd('Big Easy', 600, 270, 550, 240, 95, 80);
					class_q.xb.push(a);
					a = new class_q;
					a.jd('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
					class_q.xb.push(a);
					a = new class_q;
					a.jd('Huge', 750, 350, 700, 320, 100, 80);
					class_q.xb.push(a);
					a = 0;
					let b = class_q.xb.length;
					for (; a < b;) {
						let c = a++;
						class_q.xb[c].Gh = c;
					}
				}
				return class_q.xb;
			}

			static On(a, b) {
				if (null != a.trait && (b = b[class_w.I(a.trait, String)],
				null != b)) {
					let c = 0
						,
						d = class_Cc.dn(b);
					for (; c < d.length;) {
						let e = d[c];
						++c;
						null == a[e] && (a[e] = b[e]);
					}
				}
			}

			static Xn(a) {
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

			static Kc(a) {
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
				c != d && (a[b] = class_q.Xn(c));
			}

			static Cg(a, b, c) {
				b != c && (a.color = class_q.mo(b));
			}

			static mo(a) {
				a |= 0;
				return 0 > a ? 'transparent' : class_ca.eh(a);
			}

			static ng(a) {
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
				class_q.ma(b, 'bCoef', a.o, 1);
				class_q.Oc(b, 'cMask', a.h, 63);
				class_q.Oc(b, 'cGroup', a.w, 32);
				return b;
			}

			static Lp(a) {
				let b = new class_G;
				b.a.x = class_w.I(a.x, E);
				b.a.y = class_w.I(a.y, E);
				var c = a.bCoef;
				null != c && (b.o = class_w.I(c, E));
				c = a.cMask;
				null != c && (b.h = class_q.Kc(c));
				a = a.cGroup;
				null != a && (b.w = class_q.Kc(a));
				return b;
			}

			static Gr(a, b) {
				let c = {
					v0: a.Y.Dd,
					v1: a.da.Dd
				};
				class_q.ma(c, 'bias', a.Hc, b.Hc);
				class_q.ma(c, 'bCoef', a.o, b.o);
				let d = a.Wo();
				class_q.ma(c, 'curve', d, 0);
				0 != d && (c.curveF = a.wb);
				class_q.ma(c, 'vis', a.$a, b.$a);
				class_q.Oc(c, 'cMask', a.h, b.h);
				class_q.Oc(c, 'cGroup', a.w, b.w);
				class_q.Cg(c, a.S, b.S);
				return c;
			}

			static Kp(a, b) {
				let c = new class_I;
				var d = class_w.I(a.v1, ec);
				c.Y = b[class_w.I(a.v0, ec)];
				c.da = b[d];
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
				null != b && (c.Hc = class_w.I(b, E));
				null != d && (c.o = class_w.I(d, E));
				null != f ? c.wb = class_w.I(f, E) : null != e && c.Uc(class_w.I(e, E));
				null != g && (c.$a = class_w.I(g, Fc));
				null != h && (c.h = class_q.Kc(h));
				null != k && (c.w = class_q.Kc(k));
				null != a && (c.S = class_q.ng(a));
				return c;
			}

			static xp(a) {
				let b = {
					d0: a.fe,
					d1: a.ge,
					length: a.Jb >= a.fc ? a.Jb : [a.Jb, a.fc]
				};
				class_q.Cg(b, a.S, 0);
				class_q.ma(b, 'strength', a.we, 1 / 0);
				return b;
			}

			static Hp(a, b) {
				let c = new class_Kb;
				var d = class_w.I(a.d0, ec)
					,
					e = class_w.I(a.d1, ec);
				let f = a.color
					,
					g = a.strength;
				a = a.length;
				if (d >= b.length || 0 > d)
					throw class_v.C(null);
				if (e >= b.length || 0 > e)
					throw class_v.C(null);
				c.fe = d;
				c.ge = e;
				null == a ? (d = b[d],
					e = b[e],
					null == d || null == e ? c.fc = c.Jb = 100 : (b = d.a,
						d = e.a,
						e = b.x - d.x,
						b = b.y - d.y,
						c.fc = c.Jb = Math.sqrt(e * e + b * b))) : a instanceof Array ? (c.Jb = class_w.I(a[0], E),
					c.fc = class_w.I(a[1], E)) : c.fc = c.Jb = class_w.I(a, E);
				c.we = null == g || 'rigid' == g ? 1 / 0 : class_w.I(g, E);
				null != f && (c.S = class_q.ng(f));
				return c;
			}

			static Gq(a) {
				let b = {
					normal: [a.xa.x, a.xa.y],
					dist: a.Ua
				};
				class_q.ma(b, 'bCoef', a.o, 1);
				class_q.Oc(b, 'cMask', a.h, 63);
				class_q.Oc(b, 'cGroup', a.w, 32);
				return b;
			}

			static Ip(a) {
				let b = new class_R;
				var c = class_w.I(a.normal, Array)
					,
					d = class_w.I(c[0], E)
					,
					e = class_w.I(c[1], E);
				c = b.xa;
				let f = d;
				var g = e;
				null == e && (g = 0);
				null == d && (f = 0);
				d = f;
				e = Math.sqrt(d * d + g * g);
				c.x = d / e;
				c.y = g / e;
				b.Ua = class_w.I(a.dist, E);
				c = a.bCoef;
				d = a.cMask;
				a = a.cGroup;
				null != c && (b.o = class_w.I(c, E));
				null != d && (b.h = class_q.Kc(d));
				null != a && (b.w = class_q.Kc(a));
				return b;
			}

			static cp(a) {
				return {
					p0: [a.Y.x, a.Y.y],
					p1: [a.da.x, a.da.y],
					team: a.ye == class_u.ga ? 'red' : 'blue'
				};
			}

			static Gp(a) {
				let b = new class_Eb;
				var c = class_w.I(a.p0, Array);
				let d = class_w.I(a.p1, Array)
					,
					e = b.Y;
				e.x = c[0];
				e.y = c[1];
				c = b.da;
				c.x = d[0];
				c.y = d[1];
				switch (a.team) {
					case 'blue':
						a = class_u.Ca;
						break;
					case 'red':
						a = class_u.ga;
						break;
					default:
						throw class_v.C('Bad team value');
				}
				b.ye = a;
				return b;
			}

			static Jq(a) {
				let b = {};
				class_q.ma(b, 'bCoef', a.o, .5);
				class_q.ma(b, 'invMass', a.ba, .5);
				class_q.ma(b, 'damping', a.Da, .96);
				class_q.ma(b, 'acceleration', a.Ne, .1);
				class_q.ma(b, 'kickingAcceleration', a.df, .07);
				class_q.ma(b, 'kickingDamping', a.ef, .96);
				class_q.ma(b, 'kickStrength', a.bf, 5);
				class_q.Oc(b, 'cGroup', a.w, 0);
				if (0 != a.pa.x || 0 != a.pa.y)
					b.gravity = [a.pa.x, a.pa.y];
				class_q.ma(b, 'radius', a.V, 15);
				class_q.ma(b, 'kickback', a.cf, 0);
				return b;
			}

			static Jp(a) {
				let b = new class_bc;
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
				null != d && (b.ba = class_w.I(d, E));
				null != e && (b.Da = class_w.I(e, E));
				null != f && (b.Ne = class_w.I(f, E));
				null != g && (b.df = class_w.I(g, E));
				null != h && (b.ef = class_w.I(h, E));
				null != k && (b.bf = class_w.I(k, E));
				null != l && (c = b.pa,
					d = class_w.I(l[1], E),
					c.x = class_w.I(l[0], E),
					c.y = d);
				null != n && (b.w = class_q.Kc(n));
				null != r && (b.V = class_w.I(r, E));
				null != a && (b.cf = class_w.I(a, E));
				return b;
			}

			static Go(a, b) {
				let c = {};
				if (a.a.x != b.a.x || a.a.y != b.a.y)
					c.pos = [a.a.x, a.a.y];
				if (a.G.x != b.G.x || a.G.y != b.G.y)
					c.speed = [a.G.x, a.G.y];
				if (a.pa.x != b.pa.x || a.pa.y != b.pa.y)
					c.gravity = [a.pa.x, a.pa.y];
				class_q.ma(c, 'radius', a.V, b.V);
				class_q.ma(c, 'bCoef', a.o, b.o);
				class_q.ma(c, 'invMass', a.ba, b.ba);
				class_q.ma(c, 'damping', a.Da, b.Da);
				class_q.Cg(c, a.S, b.S);
				class_q.Oc(c, 'cMask', a.h, b.h);
				class_q.Oc(c, 'cGroup', a.w, b.w);
				return c;
			}

			static bl(a, b) {
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
				null != e && (d = b.pa,
					d.x = e[0],
					d.y = e[1]);
				null != f && (b.V = class_w.I(f, E));
				null != g && (b.o = class_w.I(g, E));
				null != h && (b.ba = class_w.I(h, E));
				null != k && (b.Da = class_w.I(k, E));
				null != l && (b.S = class_q.ng(l));
				null != n && (b.h = class_q.Kc(n));
				null != a && (b.w = class_q.Kc(a));
				return b;
			}

			static ma(a, b, c, d) {
				c != d && (a[b] = c);
			}
		}

		class class_w {
			static en(a) {
				if (null == a)
					return null;
				if (a instanceof Array)
					return Array;
				{
					let b = a.g;
					if (null != b)
						return b;
					a = class_w.Jj(a);
					return null != a ? class_w.Jn(a) : null;
				}
			}

			static Me(a, b) {
				if (null == a)
					return 'null';
				if (5 <= b.length)
					return '<...>';
				var c = typeof a;
				'function' == c && (a.b || a.Sf) && (c = 'object');
				switch (c) {
					case 'function':
						return '<function>';
					case 'object':
						if (a.Hb) {
							var d = Lb[a.Hb].Zd[a.ob];
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

			static Hj(a, b) {
				for (; ;) {
					if (null == a)
						return false;
					if (a == b)
						return true;
					let c = a.qd;
					if (null != c && (null == a.ha || a.ha.qd != c)) {
						let d = 0
							,
							e = c.length;
						for (; d < e;) {
							let f = c[d++];
							if (f == b || class_w.Hj(f, b))
								return true;
						}
					}
					a = a.ha;
				}
			}

			static Hn(a, b) {
				if (null == b)
					return false;
				switch (b) {
					case Array:
						return a instanceof Array;
					case Fc:
						return 'boolean' == typeof a;
					case Lc:
						return null != a;
					case E:
						return 'number' == typeof a;
					case ec:
						return 'number' == typeof a ? (a | 0) === a : false;
					case String:
						return 'string' == typeof a;
					default:
						if (null != a)
							if ('function' == typeof b) {
								if (class_w.Gn(a, b))
									return true;
							}
							else {
								if ('object' == typeof b && class_w.In(b) && a instanceof b)
									return true;
							}
						else
							return false;
						return b == Mc && null != a.b || b == Nc && null != a.Sf ? true : null != a.Hb ? Lb[a.Hb] == b : false;
				}
			}

			static Gn(a, b) {
				return a instanceof b ? true : b.Ij ? class_w.Hj(class_w.en(a), b) : false;
			}

			static I(a, b) {
				if (null == a || class_w.Hn(a, b))
					return a;
				throw class_v.C('Cannot cast ' + class_Q.Fe(a) + ' to ' + class_Q.Fe(b));
			}

			static Jj(a) {
				a = class_w.Kn.call(a).slice(8, -1);
				return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a;
			}

			static In(a) {
				return null != class_w.Jj(a);
			}

			static Jn(a) {
				return globalScope[a];
			}
		}

		class class_wc {
			constructor() {
				this.Pc = new Set;
				this.lg = 0;
				window.document.addEventListener('focusout', function_M(this, this.tl));
			}

			ja() {
				window.document.removeEventListener('focusout', function_M(this, this.tl));
			}

			B() {
				let a = 0;
				this.Pc.has('Up') && (a = 1);
				this.Pc.has('Down') && (a |= 2);
				this.Pc.has('Left') && (a |= 4);
				this.Pc.has('Right') && (a |= 8);
				this.Pc.has('Kick') && (a |= 16);
				a |= window.parent.g.emulatedInput;
				if (null != this.zg && a != this.lg) {
					this.lg = a;
					let b = new class_Ja;
					b.input = a;
					this.zg(b);
				}
			}

			rb(a) {
				var b = a.code;
				b = class_m.j.me.A().A(b);
				null != b && (a.preventDefault(),
					this.kq(b));
			}

			Kd(a) {
				a = class_m.j.me.A().A(a.code);
				null != a && this.$p(a);
			}

			kq(a) {
				this.Pc.has(a) || (this.Pc.add(a),
					this.B(),
					class_D.i(this.Zp, a));
			}

			$p(a) {
				this.Pc.delete(a) && this.B();
			}

			tl() {
				if (null != this.zg && 0 != this.lg) {
					this.Pc.clear();
					this.lg = 0;
					let a = new class_Ja;
					a.input = 0;
					this.zg(a);
				}
			}
		}

		class class_Y {
			static im(a, b, c, d, e) {
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

			static A(a, b) {
				return class_Y.im(a, 'GET', b, null);
			}

			static Kk(a) {
				return class_Y.A(a, 'json').then(function (b) {
					let c = b.error;
					if (null != c)
						throw class_v.C(c);
					return b.data;
				});
			}

			static Mq(a, b, c) {
				return class_Y.im(a, 'POST', 'json', b, c);
			}

			static Sl(a, b, c) {
				return class_Y.Mq(a, b, c).then(function (d) {
					let e = d.error;
					if (null != e)
						throw class_v.C(e);
					return d.data;
				});
			}
		}

		class class_qb {
			constructor() {
				this.f = class_x.Ha(class_qb.O);
				let a = class_x.Aa(this.f);
				this.hd = a.get('log');
				this.yh = a.get('cancel');
			}

			ca(a) {
				let b = window.document.createElement('p');
				b.textContent = a;
				this.hd.appendChild(b);
			}
		}

		class class_yc {
			constructor() {
				this.hash = 0;
			}

			Fs(a) {
				let b = 0
					,
					c = a.length;
				for (; b < c;)
					this.hash = (this.hash += a[b++]) + (this.hash << 10),
						this.hash ^= this.hash >>> 6;
			}
		}

		class class_W {
			constructor(a) {
				class_W.zb || this.Ya(a);
			}

			Ya(a) {
				this.$ = 0;
				this.U = a;
			}
		}

		class class_za {
			constructor() {
				this.h = this.w = 63;
				this.S = 16777215;
				this.Da = .99;
				this.ba = 1;
				this.o = .5;
				this.V = 10;
				this.pa = new class_P(0, 0);
				this.G = new class_P(0, 0);
				this.a = new class_P(0, 0);
			}

			fa(a) {
				var b = this.a;
				a.u(b.x);
				a.u(b.y);
				b = this.G;
				a.u(b.x);
				a.u(b.y);
				b = this.pa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.V);
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Da);
				a.ub(this.S);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				var b = this.a;
				b.x = a.v();
				b.y = a.v();
				b = this.G;
				b.x = a.v();
				b.y = a.v();
				b = this.pa;
				b.x = a.v();
				b.y = a.v();
				this.V = a.v();
				this.o = a.v();
				this.ba = a.v();
				this.Da = a.v();
				this.S = a.ib();
				this.h = a.N();
				this.w = a.N();
			}

			Pp() {
				let a = new class_xa;
				this.Sk(a);
				return a;
			}

			Sk(a) {
				var b = a.a
					,
					c = this.a;
				b.x = c.x;
				b.y = c.y;
				b = a.G;
				c = this.G;
				b.x = c.x;
				b.y = c.y;
				b = a.pa;
				c = this.pa;
				b.x = c.x;
				b.y = c.y;
				a.V = this.V;
				a.o = this.o;
				a.ba = this.ba;
				a.Da = this.Da;
				a.S = this.S;
				a.h = this.h;
				a.w = this.w;
			}
		}

		class class_qc {
			constructor() {
			}
		}

		class class_Wb {
			static Br(a, b) {
				class_Wb.pm(new Blob([a], {
					type: 'octet/stream'
				}), b);
			}

			static Cr(a, b) {
				class_Wb.pm(new Blob([a], {
					type: 'text/plain'
				}), b);
			}

			static pm(a, b) {
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

		class class_Hc {
			static gs(a, b) {
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

		/** Game Objects */
		class class_eb {
			constructor() {
				this.jc = -1;
				this.ic = null;
				/** @type {class_xa[]} */
				this.H = [];
			}

			fa(a) {
				a.m(this.H.length);
				let b = 0
					,
					c = this.H.length;
				for (; b < c;) {
					let d = b++
						,
						e = this.H[d];
					e.Cl = d;
					e.fa(a);
				}
			}

			ka(a) {
				this.H = [];
				let b = a.F()
					,
					c = 0;
				for (; c < b;) {
					++c;
					let d = new class_xa;
					d.ka(a);
					this.H.push(d);
				}
			}

			B(a) {
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
					g = d.pa;
					d = d.Da;
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
						0 != (f.h & c.w) && 0 != (f.w & c.h) && c.ko(f);
					if (0 != c.ba) {
						d = 0;
						for (e = this.ra; d < e.length;)
							if (f = e[d],
								++d,
							0 != (f.h & c.w) && 0 != (f.w & c.h)) {
								g = f.xa;
								var h = c.a;
								g = f.Ua - (g.x * h.x + g.y * h.y) + c.V;
								if (0 < g) {
									var k = h = c.a
										,
										l = f.xa;
									h.x = k.x + l.x * g;
									h.y = k.y + l.y * g;
									g = c.G;
									h = f.xa;
									g = g.x * h.x + g.y * h.y;
									0 > g && (g *= c.o * f.o + 1,
										k = h = c.G,
										f = f.xa,
										h.x = k.x - f.x * g,
										h.y = k.y - f.y * g);
								}
							}
						d = 0;
						for (e = this.W; d < e.length;)
							f = e[d],
								++d,
							0 != (f.h & c.w) && 0 != (f.w & c.h) && c.lo(f);
						d = 0;
						for (e = this.L; d < e.length;)
							if (f = e[d],
								++d,
							0 != (f.h & c.w) && 0 != (f.w & c.h) && (h = c.a,
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
						     c = this.pb; b < c.length;)
						c[b++].B(this.H);
			}

			uc() {
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_eb),
					this.jc = a,
					class_eb.zd(b, this));
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
				a.W = b.W;
				a.ra = b.ra;
				a.pb = b.pb;
			}
		}

		class class_Ya extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.no(this.$g);
			}

			va(a) {
				a.mb(this.$g.byteLength);
				a.Vg(this.$g);
			}

			wa(a) {
				this.$g = a.Wl(a.Cb());
			}
		}

		/** Room */
		class class_oa extends class_W {
			constructor(a) {
				class_W.zb ? super() : (class_W.zb = true,
					super(),
					class_W.zb = false,
					this.Ya(a));
			}

			Ya(a) {
				this.bj = new class_Va;
				this.Be = this.ec = 0;
				this.te = new class_Va;
				this.xc = this.dc = this.Ad = 0;
				this.Ec = .06;
				this.qh = 16.666666666666668;
				this.Rf = 120;
				super.Ya(a);
			}

			sa() {
				throw class_v.C('missing implementation');
			}

			eg() {
				throw class_v.C('missing implementation');
			}

			B() {
				throw class_v.C('missing implementation');
			}

			Nj(a) {
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
						if (f.nb != this.$)
							break;
						f.apply(this.U);
						null != this.hc && this.hc(f);
						this.ec++;
						++c;
					}
					this.U.B(1);
					this.Be += this.ec;
					this.ec = 0;
					this.$++;
				}
				for (; c < d;) {
					a = b[c];
					if (a.nb != this.$ || a.Dc != this.ec)
						break;
					a.apply(this.U);
					null != this.hc && this.hc(a);
					this.ec++;
					++c;
				}
				b.splice(0, c);
			}

			Mg(a) {
				a.nb == this.$ && a.Dc <= this.ec ? (a.Dc = this.ec++,
					a.apply(this.U),
				null != this.hc && this.hc(a)) : this.te.jn(a);
			}

			Nk(a, b) {
				if (0 >= a)
					return this.U;
				a > this.Rf && (a = this.Rf);
				class_va.Cc++;
				let c = this.U.uc();
				null != b ? (this.bj.Is(this.te, b),
					b = this.bj) : b = this.te;
				b = b.list;
				let d = 0
					,
					e = b.length
					,
					f = this.$
					,
					g = a | 0
					,
					h = f + g;
				for (; f <= h;) {
					for (; d < e;) {
						let k = b[d];
						if (k.nb > f)
							break;
						k.Jf.Ba && k.apply(c);
						++d;
					}
					c.B(f != h ? 1 : a - g);
					++f;
				}
				for (a = this.bj.list; 0 < a.length;)
					a.pop();
				return c;
			}

			Nr(a) {
				300 < a && (a = 300);
				0 > a && (a = 0);
				this.dc = this.Ec * a | 0;
			}

			zm(a) {
				this.Ad = this.Ec * (-200 > a ? -200 : 1E3 < a ? 1E3 : a);
			}
		}

		/** Server room */
		class class_Ha extends class_oa {
			constructor(a, b) {
				class_W.zb = true;
				super();
				class_W.zb = false;
				this.Ya(a, b);
			}

			Ya(a, b) {
				this.Ni = [];
				this.yi = [];
				this.Fg = new class_Va;
				this.Xp = 1;
				this.yd = this.Rm = 0;
				this.aj = new class_Yb(50);
				this.Eg = new class_Yb(50);
				this.En = 1E3;
				this.wk = '';
				super.Ya(b.state);
				this.Zh = b.rt;
				this.Ue = b.Ls;
				let c = null
					,
					d = this;
				c = function (e) {
					d.Ef(0);
					let f = class_A.ia();
					f.Wb(b.version);
					f.Fb(b.password);
					d.rc = new class_Zb(b.tj, b.iceServers, a, class_vc.channels, f, b.zn);
					d.rc.th = e;
					d.rc.Id = function (h) {
						d.rc = null;
						d.qa = h;
						h.xg = function (k) {
							k = new class_J(new DataView(k));
							d.Uq(k);
						}
						;
						h.pf = function () {
							3 != d.yd && class_D.i(d.qf, ia.Pf('Connection closed'));
							d.ja();
						}
						;
						h = window.setTimeout(function () {
							class_D.i(d.qf, ia.Pf('Game state timeout'));
							d.ja();
						}, 1E4);
						d.ze = h;
						d.Ef(2);
					}
					;
					d.rc.zl = function () {
						d.Ef(1);
					}
					;
					let g = false;
					d.rc.rl = function () {
						g = true;
					}
					;
					d.rc.kd = function (h) {
						if (!e && 1 == d.yd && g)
							class_H.i(d.sq),
								c(true);
						else {
							let k = class_Zb.Xo(h);
							switch (h.ob) {
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
									h = ia.Pf(k);
							}
							class_D.i(d.qf, h);
							d.ja(k);
						}
					};
				}
				;
				c(null != b.vn && b.vn);
			}

			ja(a) {
				null != this.rc && (this.rc.kd = null,
					this.rc.$n(),
					this.rc = null);
				window.clearTimeout(this.ze);
				null != this.qa && (this.qa.pf = null,
					this.qa.ja(),
					this.qa = null);
				this.wk = null == a ? 'Connection closed' : a;
				this.Ef(4);
			}

			Ef(a) {
				this.yd != a && (this.yd = a,
				null != this.Jd && this.Jd(a));
			}

			Fd() {
				return 3 == this.yd;
			}

			B() {
				this.Fd() && window.performance.now() - this.Rm > this.En && this.Ji();
				this.dd = window.performance.now() * this.Ec + this.aj.jh() - this.$;
				this.bk();
			}

			eg() {
				return this.Fd() ? (0 > this.dc && (this.dc = 0),
					this.Nk(window.performance.now() * this.Ec + this.aj.jh() - this.$ + this.dc + this.Ad, this.Fg)) : this.U;
			}

			bk() {
				0 > this.dd && (this.dd = 0);
				this.dd > this.Rf && (this.dd = this.Rf);
			}

			Uq(a) {
				switch (a.F()) {
					case 0:
						this.Rq(a);
						break;
					case 1:
						this.Qq(a);
						break;
					case 2:
						this.Nq(a);
						break;
					case 3:
						this.Wq(a);
						break;
					case 4:
						this.Tq(a);
						break;
					case 5:
						this.Pq(a);
						break;
					case 6:
						this.Vq(a);
				}
			}

			Rq(a) {
				a = a.tb(a.Cb());
				let b = Promise.resolve(null);
				null != this.Ue && (b = this.Ue.Zr(a));
				let c = this;
				b.catch(function () {
					return null;
				}).then(function (d) {
					c.Jr(d);
				});
			}

			Qq(a) {
				a = pako.inflateRaw(a.tb());
				a = new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength));
				this.xc = a.Rb();
				this.$ = a.ib();
				this.Be = a.ib();
				this.ec = a.Cb();
				this.dd = 10;
				for (this.U.ka(a); 0 < a.s.byteLength - a.a;)
					this.Mg(this.Ym(a));
				window.clearTimeout(this.ze);
				this.Ef(3);
			}

			Jr(a) {
				let b = class_A.ia();
				b.m(0);
				null != a ? (b.mb(a.byteLength),
					b.Xb(a)) : b.mb(0);
				b.mb(this.Zh.byteLength);
				b.Vg(this.Zh);
				this.Ub(b);
				this.Zh = null;
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.qa.Ub(b, a);
			}

			Ym(a) {
				let b = a.ib()
					,
					c = a.Cb()
					,
					d = a.Rb()
					,
					e = a.ib();
				a = class_p.oh(a);
				a.R = d;
				a.Ce = e;
				a.nb = b;
				a.Dc = c;
				return a;
			}

			Nq(a) {
				a = this.Ym(a);
				this.Mg(a);
				a.R == this.xc && this.Fg.jt(a.Ce);
				this.Ul();
			}

			Vq(a) {
				a = class_p.oh(a);
				a.R = 0;
				a.Ce = 0;
				a.apply(this.U);
				null != this.hc && this.hc(a);
			}

			Wq(a) {
				let b = a.ib();
				a = a.ib();
				this.yi.push({
					frame: b,
					If: a
				});
				this.Ul();
			}

			Ul() {
				if (3 == this.yd) {
					for (var a = 0, b = this.yi; a < b.length;) {
						var c = b[a];
						++a;
						c.frame <= this.$ || c.If == this.Be + this.ec + this.te.Js(c.frame) && this.Nn(c.frame - this.$);
					}
					a = 0;
					b = this.yi;
					c = 0;
					for (var d = b.length; c < d;) {
						let e = b[c++];
						e.frame > this.$ && (b[a] = e,
							++a);
					}
					for (; b.length > a;)
						b.pop();
					this.Fg.it(this.$);
				}
			}

			Pq(a) {
				let b = 0 != a.F()
					,
					c = a.kc()
					,
					d = '';
				0 < a.s.byteLength - a.a && (d = a.kc());
				a = b ? 'You were banned' : 'You were kicked';
				'' != d && (a += ' by ' + d);
				'' != c && (a += ' (' + c + ')');
				this.ja(a);
			}

			Tq(a) {
				var b = a.v();
				a = a.v();
				let c = window.performance.now() - a;
				this.aj.add(b - a * this.Ec);
				this.Eg.add(c);
				let d = b = 0
					,
					e = this.Ni;
				for (; d < e.length;) {
					let f = e[d];
					++d;
					if (f > a)
						break;
					f < a ? class_D.i(this.wl, -1) : class_D.i(this.wl, c);
					++b;
				}
				this.Ni.splice(0, b);
			}

			Ji() {
				let a = window.performance.now();
				this.Rm = a;
				this.Ni.push(a);
				let b = this.Eg.jh() | 0
					,
					c = class_A.ia();
				c.m(2);
				c.u(a);
				c.mb(b);
				this.Ub(c, 2);
			}

			Nn(a) {
				this.Nj(a);
				this.dd -= a;
				this.bk();
			}

			sa(a) {
				if (3 == this.yd) {
					var b = this.Xp++
						,
						c = 0;
					0 > this.dc && (this.dc = 0);
					a.Jf.delay && (c = this.$ + (this.dd | 0) + this.dc);
					var d = class_A.ia();
					d.m(1);
					d.ub(c);
					d.ub(b);
					class_p.vj(a, d);
					this.Ub(d);
					a.Jf.Ba && (a.Ce = b,
						a.R = this.xc,
						a.nb = c,
						this.Fg.jn(a));
				}
			}

			static Ch(a) {
				switch (a.ob) {
					case 0:
						return 'Cancelled';
					case 1:
						return 'Failed to connect to peer.';
					case 2:
						return class_Jc.description(a.reason);
					case 3:
						return a.description;
				}
			}
		}

		/** Client room */
		class class_Rb extends class_oa {
			constructor(a) {
				class_W.zb = true;
				super();
				class_W.zb = false;
				this.Ya(a);
			}

			Ya(a) {
				this.Yj = new Map;
				this.Kb = null;
				this.rg = 32;
				this.Te = new Map;
				this.cc = [];
				this.Gi = 2;
				this.ho = 600;
				super.Ya(a.state);
				this.Rp = a.tj;
				this.ys = a.version;
				this.Sp = 1;
				this.Zk = this.xc = 0;
				this.Wi = window.performance.now();
				this.Nc = new class_Bb(this.Rp, a.iceServers, class_vc.channels, a.zn);
				this.Nc.lk = function_M(this, this.ip);
				let b = this;
				this.Nc.ul = function (c) {
					b.lq(c);
				}
				;
				this.Nc.wg = function (c) {
					class_D.i(b.wg, c);
				}
				;
				this.Nc.rf = function (c, d) {
					null != b.rf && b.rf(c, d);
				};
			}

			ja() {
				this.Nc.ja();
				let a = 0
					,
					b = this.cc;
				for (; a < b.length;) {
					let c = b[a++].qa;
					c.pf = null;
					c.xg = null;
					c.ja();
				}
			}

			No(a, b, c, d) {
				let e = this.Te.get(a);
				if (null != e) {
					if (d) {
						let f = this.Nc.Rn(e.qa);
						this.Yj.set(a, f);
					}
					a = class_A.ia();
					a.m(5);
					a.m(d ? 1 : 0);
					a.oc(b);
					null == c && (c = '');
					a.oc(c);
					e.Ub(a);
					e.qa.ja();
				}
			}

			be() {
				this.Nc.be();
				this.Yj.clear();
			}

			Pi(a) {
				this.Nc.Pi(a);
			}

			Oi(a) {
				this.Nc.Oi(a);
			}

			sa(a) {
				a.R = 0;
				let b = this.$ + this.Gi + this.dc;
				a.Jf.delay || (b = this.$);
				a.nb = b;
				this.Mg(a);
				this.Mi();
				0 < this.cc.length && this.Ng(this.gi(a), 1);
			}

			B() {
				let a = ((window.performance.now() - this.Wi) * this.Ec | 0) - this.$;
				0 < a && this.Nj(a);
				7 <= this.$ - this.$k && this.Mi();
				this.$ - this.Zk >= this.ho && (this.Mi(),
					this.Hr());
			}

			eg() {
				0 > this.dc && (this.dc = 0);
				return this.Nk((window.performance.now() - this.Wi) * this.Ec - this.$ + this.Gi + this.dc + this.Ad);
			}

			ip(a, b) {
				if (this.cc.length >= this.rg)
					return fb.Qf(4100);
				try {
					if (b.Rb() != this.ys)
						throw class_v.C(null);
				}
				catch (c) {
					return fb.Qf(4103);
				}
				try {
					let c = b.Bb();
					if (null != this.Kb && c != this.Kb)
						throw class_v.C(null);
				}
				catch (c) {
					return fb.Qf(4101);
				}
				return fb.Fj;
			}

			lq(a) {
				if (this.cc.length >= this.rg)
					a.ja();
				else {
					var b = new class_uc(a);
					this.cc.push(b);
					var c = this;
					a.xg = function (d) {
						d = new class_J(new DataView(d));
						c.Oq(d, b);
					}
					;
					a.pf = function () {
						class_O.remove(c.cc, b);
						c.Te.delete(b.aa);
						class_D.i(c.hq, b.aa);
					}
					;
					a = class_A.ia(1 + b.Se.byteLength);
					a.m(0);
					a.mb(b.Se.byteLength);
					a.Xb(b.Se);
					b.Ub(a);
				}
			}

			gi(a) {
				let b = class_A.ia();
				b.m(2);
				this.Bl(a, b);
				return b;
			}

			Bl(a, b) {
				b.ub(a.nb);
				b.mb(a.Dc);
				b.Wb(a.R);
				b.ub(a.Ce);
				class_p.vj(a, b);
			}

			Mi() {
				if (!(0 >= this.$ - this.$k) && 0 != this.cc.length) {
					var a = class_A.ia();
					a.m(3);
					a.ub(this.$);
					a.ub(this.Be);
					this.Ng(a, 2);
					this.$k = this.$;
				}
			}

			Ng(a, b) {
				null == b && (b = 0);
				let c = 0
					,
					d = this.cc;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.Jg && e.Ub(a, b);
				}
			}

			Ir(a) {
				let b = class_A.ia();
				b.m(1);
				let c = class_A.ia();
				c.Wb(a.aa);
				c.ub(this.$);
				c.ub(this.Be);
				c.mb(this.ec);
				this.U.fa(c);
				let d = this.te.list
					,
					e = 0
					,
					f = d.length;
				for (; e < f;)
					this.Bl(d[e++], c);
				b.Xb(pako.deflateRaw(c.Vb()));
				a.Ub(b);
			}

			Hr() {
				this.Zk = this.$;
				if (0 != this.cc.length) {
					var a = new class_Ya;
					a.nb = this.$;
					a.Dc = this.ec++;
					a.R = 0;
					a.$g = this.U.Uo();
					this.Ng(this.gi(a));
				}
			}

			Yq(a, b) {
				let c = a.tb(a.Cb())
					,
					d = a.tb(a.Cb());
				a = b.Se;
				b.Se = null;
				let e = this;
				class_U.xs(c, a).catch(function () {
					return null;
				}).then(function (f) {
					try {
						if (-1 != e.cc.indexOf(b)) {
							b.st = f;
							var g = e.Sp++;
							b.aa = g;
							e.Te.set(g, b);
							class_Ba.i(e.gq, g, new class_J(new DataView(d.buffer, d.byteOffset, d.byteLength), false));
							b.Jg = true;
							e.Ir(b);
						}
					}
					catch (h) {
						f = class_v.Lb(h).Gb(),
							e.Ok(b, f);
					}
				});
			}

			Oq(a, b) {
				this.B();
				try {
					if (!b.ap.Um())
						throw class_v.C(1);
					let c = a.F();
					if (b.Jg)
						switch (c) {
							case 1:
								this.Zq(a, b);
								break;
							case 2:
								this.Sq(a, b);
								break;
							default:
								throw class_v.C(0);
						}
					else if (0 == c)
						this.Yq(a, b);
					else
						throw class_v.C(0);
					if (0 < a.s.byteLength - a.a)
						throw class_v.C(2);
				}
				catch (c) {
					this.Ok(b, class_v.Lb(c).Gb());
				}
			}

			Ok(a, b) {
				globalScope.console.log(b);
				this.Te.delete(a.aa);
				class_O.remove(this.cc, a);
				a.Jg && null != this.sl && this.sl(a.aa);
				a.qa.ja();
			}

			Sq(a, b) {
				let c = a.v();
				b.Ab = a.Cb();
				a = class_A.ia();
				a.m(4);
				a.u((window.performance.now() - this.Wi) * this.Ec + this.Gi);
				a.u(c);
				b.Ub(a, 2);
			}

			Zq(a, b) {
				let c = a.ib()
					,
					d = a.ib();
				a = class_p.oh(a);
				var e = a.Jf.xj;
				if (null != e) {
					var f = b.Lj.get(e);
					null == f && (f = new class_Ab(e.kj, e.Dj),
						b.Lj.set(e, f));
					if (!f.Um())
						throw class_v.C(3);
				}
				e = this.$;
				f = this.$ + 20;
				c < e ? c = e : c > f && (c = f);
				a.Ce = d;
				a.R = b.aa;
				a.nb = c;
				a.sn(this.U) && (this.Mg(a),
					this.Ng(this.gi(a), 1));
			}
		}

		class class_Sb extends class_oa {
			constructor(a, b, c) {
				class_W.zb = true;
				super();
				class_W.zb = false;
				this.Ya(a, b, c);
			}

			Ya(a, b, c) {
				this.kl = [];
				this.Il = 5;
				this.Pd = -1;
				this.tg = this.Tb = this.ai = this.Jk = 0;
				super.Ya(b);
				a = new class_J(new DataView(a.buffer), false);
				if (1212305970 != a.ib())
					throw class_v.C('');
				b = a.ib();
				if (c != b)
					throw class_v.C(new class_Tb(b));
				this.xf = a.ib();
				c = pako.inflateRaw(a.tb());
				this.Rc = new class_J(new DataView(c.buffer, c.byteOffset, c.byteLength));
				this.br(this.Rc);
				c = this.Rc.tb();
				this.Rc = new class_J(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
				this.Di();
				this.ai = window.performance.now();
				this.xc = -1;
			}

			br(a) {
				let b = a.Rb()
					,
					c = 0
					,
					d = 0;
				for (; d < b;) {
					++d;
					c += a.Cb();
					let e = a.F();
					this.kl.push({
						wj: c / this.xf,
						kind: e
					});
				}
			}

			Xl() {
				var a = this.Rc;
				0 < a.s.byteLength - a.a ? (a = this.Rc.Cb(),
					this.tg += a,
					a = this.Rc.Rb(),
					this.sg = class_p.oh(this.Rc),
					this.sg.R = a) : this.sg = null;
			}

			$o() {
				return this.$ / this.xf;
			}

			sa() {
			}

			eg() {
				this.B();
				class_va.Cc++;
				let a = this.U.uc();
				a.B(this.Jk);
				return a;
			}

			B() {
				var a = window.performance.now()
					,
					b = a - this.ai;
				this.ai = a;
				0 < this.Pd ? (this.Tb += 1E4,
				this.Tb > this.Pd && (this.Tb = this.Pd,
					this.Pd = -1)) : this.Tb += b * this.Il;
				a = this.xf * this.qh;
				this.Tb > a && (this.Tb = a);
				b = this.Tb * this.Ec;
				a = b | 0;
				for (this.Jk = b - a; this.$ < a;) {
					for (; null != this.sg && this.tg == this.$;)
						b = this.sg,
							b.apply(this.U),
						null != this.hc && this.hc(b),
							this.Xl();
					this.$++;
					this.U.B(1);
				}
			}

			Fr(a) {
				this.Pd = a;
				a < this.Tb && this.Di();
			}

			Di() {
				this.tg = 0;
				this.Tb = this.$ = this.Rc.a = 0;
				this.U.ka(this.Rc);
				this.Xl();
			}
		}

		class class_Na extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.oa(this.R);
				null != b && this.hh != b.Td && (b.Td = this.hh,
					class_D.i(a.Ll, b));
			}

			va(a) {
				a.m(this.hh ? 1 : 0);
			}

			wa(a) {
				this.hh = 0 != a.F();
			}

			static na(a) {
				let b = new class_Na;
				b.hh = a;
				return b;
			}
		}

		class class_Fb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				0 == this.R && class_Ub.i(a.nm, this.$c, this.color, this.style, this.yn);
			}

			va(a) {
				a.oc(class_ha.Xc(this.$c, 1E3));
				a.P(this.color);
				a.m(this.style);
				a.m(this.yn);
			}

			wa(a) {
				this.$c = a.kc();
				if (1E3 < this.$c.length)
					throw class_v.C('message too long');
				this.color = a.N();
				this.style = a.F();
				this.yn = a.F();
			}
		}

		class class_cb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					for (var b = a.oa(this.R), c = a.K, d = [], e = 0, f = 0, g = 0; g < c.length;) {
						let h = c[g];
						++g;
						h.ea == class_u.Ma && d.push(h);
						h.ea == class_u.ga ? ++e : h.ea == class_u.Ca && ++f;
					}
					c = d.length;
					0 != c && (f == e ? 2 > c || (a.Yf(b, d[0], class_u.ga),
						a.Yf(b, d[1], class_u.Ca)) : a.Yf(b, d[0], f > e ? class_u.ga : class_u.Ca));
				}
			}

			va() {
			}

			wa() {
			}
		}

		class class_ya extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R) && null == a.M)
					switch (this.Aj) {
						case 0:
							var b = this.newValue;
							a.jb = 0 > b ? 0 : 99 < b ? 99 : b;
							break;
						case 1:
							b = this.newValue,
								a.Fa = 0 > b ? 0 : 99 < b ? 99 : b;
					}
			}

			va(a) {
				a.P(this.Aj);
				a.P(this.newValue);
			}

			wa(a) {
				this.Aj = a.N();
				this.newValue = a.N();
			}

			static na(a, b) {
				let c = new class_ya;
				c.Aj = a;
				c.newValue = b;
				return c;
			}
		}

		class class_Ma extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.oa(this.R)
						,
						c = a.oa(this.Ud);
					null != c && 0 != c.X && c.eb != this.gh && (c.eb = this.gh,
					null != a.ri && a.ri(b, c));
				}
			}

			va(a) {
				a.P(this.Ud);
				a.m(this.gh ? 1 : 0);
			}

			wa(a) {
				this.Ud = a.N();
				this.gh = 0 != a.F();
			}

			static na(a, b) {
				let c = new class_Ma;
				c.Ud = a;
				c.gh = b;
				return c;
			}
		}

		class class_Oa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a = a.oa(this.R);
				null != a && (a.Zb = this.ac);
			}

			va(a) {
				a.Fb(this.ac);
			}

			wa(a) {
				this.ac = a.Bb();
				null != this.ac && (this.ac = class_ha.Xc(this.ac, 2));
			}

			static na(a) {
				let b = new class_Oa;
				b.ac = a;
				return b;
			}
		}

		class class_fa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.oa(this.Ud);
				if (null != b) {
					var c = a.oa(this.R)
						,
						d = a.Ob(this.R);
					(d = d || b == c && !a.Vc && null == a.M) && a.Yf(c, b, this.uj);
				}
			}

			va(a) {
				a.P(this.Ud);
				a.m(this.uj.aa);
			}

			wa(a) {
				this.Ud = a.N();
				a = a.vf();
				this.uj = 1 == a ? class_u.ga : 2 == a ? class_u.Ca : class_u.Ma;
			}

			static na(a, b) {
				let c = new class_fa;
				c.Ud = a;
				c.uj = b;
				return c;
			}
		}

		class class_Ka extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.oa(this.R);
					null == a.M && (a.T = this.Xd,
					null != a.Ti && a.Ti(b, this.Xd));
				}
			}

			va(a) {
				var b = class_A.ia();
				this.Xd.fa(b);
				b = pako.deflateRaw(b.Vb());
				a.Wb(b.byteLength);
				a.Xb(b);
			}

			wa(a) {
				a = pako.inflateRaw(a.tb(a.Rb()));
				this.Xd = class_q.ka(new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength)));
			}

			static na(a) {
				let b = new class_Ka;
				b.Xd = a;
				return b;
			}
		}

		class class_db extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && this.ea != class_u.Ma && (a.lb[this.ea.aa] = this.ah);
			}

			va(a) {
				a.m(this.ea.aa);
				this.ah.fa(a);
			}

			wa(a) {
				let b = a.vf();
				this.ea = 1 == b ? class_u.ga : 2 == b ? class_u.Ca : class_u.Ma;
				this.ah = new class_ua;
				this.ah.ka(a);
			}
		}

		class class_La extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && (a.Vc = this.newValue);
			}

			va(a) {
				a.m(this.newValue ? 1 : 0);
			}

			wa(a) {
				this.newValue = 0 != a.F();
			}

			static na(a) {
				let b = new class_La;
				b.newValue = a;
				return b;
			}
		}

		class class_Ga extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = new class_ta;
					b.X = this.X;
					b.D = this.name;
					b.country = this.nj;
					b.Zb = this.Zb;
					a.K.push(b);
					a = a.Ml;
					null != a && a(b);
				}
			}

			va(a) {
				a.P(this.X);
				a.Fb(this.name);
				a.Fb(this.nj);
				a.Fb(this.Zb);
			}

			wa(a) {
				this.X = a.N();
				this.name = a.Bb();
				this.nj = a.Bb();
				this.Zb = a.Bb();
			}

			static na(a, b, c, d) {
				let e = new class_Ga;
				e.X = a;
				e.name = b;
				e.nj = c;
				e.Zb = d;
				return e;
			}
		}

		class class_Hb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a = a.oa(this.Ge);
				null != a && 0 == this.R && (a.Sd = this.ac);
			}

			va(a) {
				a.Fb(this.ac);
				a.P(this.Ge);
			}

			wa(a) {
				this.ac = a.Bb();
				this.Ge = a.N();
				null != this.ac && (this.ac = class_ha.Xc(this.ac, 2));
			}
		}

		class class_bb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.M;
				if (null != b && a.Ob(this.R)) {
					var c = a.oa(this.R)
						,
						d = 120 == b.Qa
						,
						e = 0 < b.Qa;
					this.Lf ? b.Qa = 120 : 120 == b.Qa && (b.Qa = 119);
					d != this.Lf && class_pc.i(a.Fl, c, this.Lf, e);
				}
			}

			va(a) {
				a.m(this.Lf ? 1 : 0);
			}

			wa(a) {
				this.Lf = 0 != a.F();
			}
		}

		class class_Za extends class_p {
			constructor() {
				super();
			}

			sn(a) {
				if (null != a.Hq) {
					let b = a.oa(this.R);
					return null == b ? false : a.Hq(b, this.$c);
				}
				return true;
			}

			apply(a) {
				let b = a.oa(this.R);
				null != b && class_Ba.i(a.Kl, b, this.$c);
			}

			va(a) {
				a.oc(class_ha.Xc(this.$c, 140));
			}

			wa(a) {
				this.$c = a.kc();
				if (140 < this.$c.length)
					throw class_v.C('message too long');
			}
		}

		class class_Ja extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.oa(this.R);
				if (null != b) {
					var c = this.input;
					0 == (b.Ea & 16) && 0 != (c & 16) && (b.Yb = true);
					b.Ea = c;
					null != a.Iq && a.Iq(b);
				}
			}

			va(a) {
				a.ub(this.input);
			}

			wa(a) {
				this.input = a.ib();
			}
		}

		class class_Ia extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.oa(this.R);
				null != b && class_Ba.i(a.Pl, b, this.Bj);
			}

			va(a) {
				a.m(this.Bj);
			}

			wa(a) {
				this.Bj = a.F();
			}

			static na(a) {
				let b = new class_Ia;
				b.Bj = a;
				return b;
			}
		}

		class class_ma extends class_p {
			constructor() {
				class_p.zb = true;
				super();
				class_p.zb = false;
				this.Ya();
			}

			Ya() {
				this.Zg = false;
				super.Ya();
			}

			apply(a) {
				if (0 != this.X && a.Ob(this.R)) {
					var b = a.oa(this.X);
					if (null != b) {
						var c = a.oa(this.R);
						class_O.remove(a.K, b);
						null != a.M && class_O.remove(a.M.ua.H, b.J);
						class_Ub.i(a.Nl, b, this.pd, this.Zg, c);
					}
				}
			}

			va(a) {
				null != this.pd && (this.pd = class_ha.Xc(this.pd, 100));
				a.P(this.X);
				a.Fb(this.pd);
				a.m(this.Zg ? 1 : 0);
			}

			wa(a) {
				this.X = a.N();
				this.pd = a.Bb();
				this.Zg = 0 != a.F();
				if (null != this.pd && 100 < this.pd.length)
					throw class_v.C('string too long');
			}

			static na(a, b, c) {
				let d = new class_ma;
				d.X = a;
				d.pd = b;
				d.Zg = c;
				return d;
			}
		}

		class class_Gb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					for (var b = new Map, c = 0, d = a.K; c < d.length;) {
						var e = d[c];
						++c;
						b.set(e.X, e);
					}
					c = [];
					d = 0;
					for (e = this.ih; d < e.length;) {
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
					a.K = this.rn ? c.concat(d) : d.concat(c);
				}
			}

			va(a) {
				a.m(this.rn ? 1 : 0);
				a.m(this.ih.length);
				let b = 0
					,
					c = this.ih;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			wa(a) {
				this.rn = 0 != a.F();
				let b = a.F();
				this.ih = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.ih.push(a.N());
			}
		}

		class class_Ib extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = a.M;
					if (null != b) {
						if (this.kn) {
							a = a.oa(this.Ge);
							if (null == a)
								return;
							a = a.J;
						}
						else
							a = b.ua.H[this.Ge];
						null != a && (null != this.Ka[0] && (a.a.x = this.Ka[0]),
						null != this.Ka[1] && (a.a.y = this.Ka[1]),
						null != this.Ka[2] && (a.G.x = this.Ka[2]),
						null != this.Ka[3] && (a.G.y = this.Ka[3]),
						null != this.Ka[4] && (a.pa.x = this.Ka[4]),
						null != this.Ka[5] && (a.pa.y = this.Ka[5]),
						null != this.Ka[6] && (a.V = this.Ka[6]),
						null != this.Ka[7] && (a.o = this.Ka[7]),
						null != this.Ka[8] && (a.ba = this.Ka[8]),
						null != this.Ka[9] && (a.Da = this.Ka[9]),
						null != this.Yc[0] && (a.S = this.Yc[0]),
						null != this.Yc[1] && (a.h = this.Yc[1]),
						null != this.Yc[2] && (a.w = this.Yc[2]));
					}
				}
			}

			va(a) {
				a.P(this.Ge);
				a.m(this.kn ? 1 : 0);
				let b = a.a;
				a.Wb(0);
				let c = 0;
				for (var d = 1, e = 0, f = this.Ka; e < f.length;) {
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
				a.Wb(c);
				a.a = d;
			}

			wa(a) {
				this.Ge = a.N();
				this.kn = 0 != a.F();
				let b = a.Rb();
				this.Ka = [];
				for (var c = 0; 10 > c;) {
					var d = c++;
					this.Ka[d] = null;
					0 != (b & 1) && (this.Ka[d] = a.vi());
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
				a.Ob(this.R) && a.Pr(a.oa(this.R), this.min, this.rate, this.lj);
			}

			va(a) {
				a.P(this.min);
				a.P(this.rate);
				a.P(this.lj);
			}

			wa(a) {
				this.min = a.N();
				this.rate = a.N();
				this.lj = a.N();
			}

			static na(a, b, c) {
				let d = new class_Pa;
				d.min = a;
				d.rate = b;
				d.lj = c;
				return d;
			}
		}

		class class_$a extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && a.bs(a.oa(this.R));
			}

			va() {
			}

			wa() {
			}
		}

		class class_ab extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.oa(this.R);
					if (null != a.M) {
						a.M = null;
						let c = 0
							,
							d = a.K;
						for (; c < d.length;) {
							let e = d[c];
							++c;
							e.J = null;
							e.Mb = 0;
						}
						null != a.Gf && a.Gf(b);
					}
				}
			}

			va() {
			}

			wa() {
			}
		}

		class class_Fa extends class_p {
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

			va(a) {
				a.mb(this.Ee.length);
				let b = 0
					,
					c = this.Ee;
				for (; b < c.length;)
					a.mb(c[b++]);
			}

			wa(a) {
				this.Ee = [];
				let b = a.Cb()
					,
					c = 0;
				for (; c < b;)
					++c,
						this.Ee.push(a.Cb());
			}

			static na(a) {
				let b = new class_Fa
					,
					c = a.U.K
					,
					d = []
					,
					e = 0;
				for (; e < c.length;) {
					let f = a.Te.get(c[e++].X);
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
				this.Kj = null != c ? c : this;
			}

			Gb() {
				return this.Kj;
			}

			static Lb(a) {
				return a instanceof v ? a : a instanceof Error ? new class_v(a.message, null, a) : new class_Mb(a, null, a);
			}

			static C(a) {
				return a instanceof v ? a.Kj : a instanceof Error ? a : new class_Mb(a);
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

		var Lb = Lb || {},
			X;
		class_mc.b = true;
		Object.assign(class_mc.prototype, {
			g: class_mc
		});
		class_O.b = true;
		Math.b = true;
		class_Cc.b = true;
		class_Q.b = true;
		class_ca.b = true;
		class_ha.b = true;
		class_yc.b = true;
		Object.assign(class_yc.prototype, {
			g: class_yc
		});
		var na = Lb['bas.basnet.FailReason'] = {
			Sf: true,
			Zd: null,
			Je: {
				wc: 'PeerFailed',
				ob: 0,
				Hb: 'bas.basnet.FailReason',
				toString: function_ja
			},
			Ke: (X = function (a) {
				return {
					ob: 1,
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
				ob: 2,
				Hb: 'bas.basnet.FailReason',
				toString: function_ja
			},
			Error: {
				wc: 'Error',
				ob: 3,
				Hb: 'bas.basnet.FailReason',
				toString: function_ja
			}
		};
		na.Zd = [na.Je, na.Ke, na.Ie, na.Error];
		class_Zb.b = true;
		Object.assign(class_Zb.prototype, {
			g: class_Zb
		});
		class_Sa.b = true;
		Object.assign(class_Sa.prototype, {
			g: class_Sa
		});
		var fb = Lb['bas.basnet.ConnectionRequestResponse'] = {
			Sf: true,
			Zd: null,
			Fj: {
				wc: 'Accept',
				ob: 0,
				Hb: 'bas.basnet.ConnectionRequestResponse',
				toString: function_ja
			},
			Qf: (X = function (a) {
				return {
					ob: 1,
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
		fb.Zd = [fb.Fj, fb.Qf];
		class_Bb.b = true;
		Object.assign(class_Bb.prototype, {
			g: class_Bb
		});
		class_Kc.b = true;
		class_Nb.b = true;
		Object.assign(class_Nb.prototype, {
			g: class_Nb
		});
		class_J.b = true;
		Object.assign(class_J.prototype, {
			g: class_J
		});
		class_A.b = true;
		Object.assign(class_A.prototype, {
			g: class_A
		});
		class_U.b = true;
		Object.assign(class_U.prototype, {
			g: class_U
		});
		class_ub.b = true;
		class_ib.b = true;
		class_Wb.b = true;
		class_Ob.b = true;
		Object.assign(class_Ob.prototype, {
			g: class_Ob
		});
		class_x.b = true;
		class_$b.b = true;
		class_Hc.b = true;
		class_p.b = true;
		Object.assign(class_p.prototype, {
			g: class_p
		});
		class_Va.b = true;
		Object.assign(class_Va.prototype, {
			g: class_Va
		});
		class_W.b = true;
		Object.assign(class_W.prototype, {
			g: class_W
		});
		class_Ya.b = true;
		class_Ya.ha = class_p;
		Object.assign(class_Ya.prototype, {
			g: class_Ya
		});
		class_Pb.b = true;
		class_Pb.Ij = true;
		Object.assign(class_Pb.prototype, {
			g: class_Pb
		});
		class_Yb.b = true;
		Object.assign(class_Yb.prototype, {
			g: class_Yb
		});
		class_qc.b = true;
		Object.assign(class_qc.prototype, {
			g: class_qc
		});
		class_nc.b = true;
		Object.assign(class_nc.prototype, {
			g: class_nc
		});
		class_Da.b = true;
		class_Da.Ij = true;
		class_va.b = true;
		class_oa.b = true;
		class_oa.ha = class_W;
		Object.assign(class_oa.prototype, {
			g: class_oa
		});
		var ia = Lb['bas.marf.net.ConnFailReason'] = {
			Sf: true,
			Zd: null,
			Ie: {
				wc: 'Cancelled',
				ob: 0,
				Hb: 'bas.marf.net.ConnFailReason',
				toString: function_ja
			},
			Je: {
				wc: 'PeerFailed',
				ob: 1,
				Hb: 'bas.marf.net.ConnFailReason',
				toString: function_ja
			},
			Ke: (X = function (a) {
				return {
					ob: 2,
					reason: a,
					Hb: 'bas.marf.net.ConnFailReason',
					toString: function_ja
				};
			}
				,
				X.wc = 'Rejected',
				X.Le = ['reason'],
				X),
			Pf: (X = function (a) {
				return {
					ob: 3,
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
		ia.Zd = [ia.Ie, ia.Je, ia.Ke, ia.Pf];
		class_Ha.b = true;
		class_Ha.ha = class_oa;
		Object.assign(class_Ha.prototype, {
			g: class_Ha
		});
		class_Rb.b = true;
		class_Rb.ha = class_oa;
		Object.assign(class_Rb.prototype, {
			g: class_Rb
		});
		class_uc.b = true;
		Object.assign(class_uc.prototype, {
			g: class_uc
		});
		class_vc.b = true;
		class_Tb.b = true;
		Object.assign(class_Tb.prototype, {
			g: class_Tb
		});
		class_Sb.b = true;
		class_Sb.ha = class_oa;
		Object.assign(class_Sb.prototype, {
			g: class_Sb
		});
		class_Vb.b = true;
		Object.assign(class_Vb.prototype, {
			g: class_Vb
		});
		class_Ec.b = true;
		Object.assign(class_Ec.prototype, {
			g: class_Ec
		});
		class_P.b = true;
		Object.assign(class_P.prototype, {
			g: class_P
		});
		class_Y.b = true;
		class_H.b = true;
		class_D.b = true;
		class_Ba.b = true;
		class_pc.b = true;
		class_Ub.b = true;
		class_Ab.b = true;
		Object.assign(class_Ab.prototype, {
			g: class_Ab
		});
		class_Ac.b = true;
		class_cc.b = true;
		Object.assign(class_cc.prototype, {
			g: class_cc
		});
		class_Ca.b = true;
		class_Ea.b = true;
		Object.assign(class_Ea.prototype, {
			g: class_Ea
		});
		class_Xb.b = true;
		Object.assign(class_Xb.prototype, {
			g: class_Xb
		});
		class_wc.b = true;
		Object.assign(class_wc.prototype, {
			g: class_wc
		});
		class_ka.b = true;
		Object.assign(class_ka.prototype, {
			g: class_ka
		});
		class_ic.b = true;
		Object.assign(class_ic.prototype, {
			g: class_ic
		});
		class_zc.b = true;
		class_qa.b = true;
		Object.assign(class_qa.prototype, {
			g: class_qa
		});
		class_ra.b = true;
		Object.assign(class_ra.prototype, {
			g: class_ra
		});
		class_m.b = true;
		class_xc.b = true;
		Object.assign(class_xc.prototype, {
			g: class_xc
		});
		class_B.b = true;
		class_C.b = true;
		class_oc.b = true;
		Object.assign(class_oc.prototype, {
			g: class_oc
		});
		class_Qb.b = true;
		Object.assign(class_Qb.prototype, {
			g: class_Qb
		});
		class_ac.b = true;
		class_wb.b = true;
		class_jc.b = true;
		Object.assign(class_jc.prototype, {
			g: class_jc
		});
		class_lc.b = true;
		Object.assign(class_lc.prototype, {
			g: class_lc
		});
		class_za.b = true;
		Object.assign(class_za.prototype, {
			g: class_za
		});
		class_ba.b = true;
		class_ba.qd = [class_Da];
		Object.assign(class_ba.prototype, {
			g: class_ba
		});
		class_Eb.b = true;
		Object.assign(class_Eb.prototype, {
			g: class_Eb
		});
		class_bc.b = true;
		Object.assign(class_bc.prototype, {
			g: class_bc
		});
		class_Ra.b = true;
		Object.assign(class_Ra.prototype, {
			g: class_Ra
		});
		class_q.b = true;
		Object.assign(class_q.prototype, {
			g: class_q
		});
		class_ua.b = true;
		Object.assign(class_ua.prototype, {
			g: class_ua
		});
		class_u.b = true;
		Object.assign(class_u.prototype, {
			g: class_u
		});
		class_sa.b = true;
		class_sa.qd = [class_Da, class_Pb];
		Object.assign(class_sa.prototype, {
			g: class_sa
		});
		class_ta.b = true;
		class_ta.qd = [class_Da];
		Object.assign(class_ta.prototype, {
			g: class_ta
		});
		class_Na.b = true;
		class_Na.ha = class_p;
		Object.assign(class_Na.prototype, {
			g: class_Na
		});
		class_Fb.b = true;
		class_Fb.ha = class_p;
		Object.assign(class_Fb.prototype, {
			g: class_Fb
		});
		class_cb.b = true;
		class_cb.ha = class_p;
		Object.assign(class_cb.prototype, {
			g: class_cb
		});
		class_ya.b = true;
		class_ya.ha = class_p;
		Object.assign(class_ya.prototype, {
			g: class_ya
		});
		class_Ma.b = true;
		class_Ma.ha = class_p;
		Object.assign(class_Ma.prototype, {
			g: class_Ma
		});
		class_Oa.b = true;
		class_Oa.ha = class_p;
		Object.assign(class_Oa.prototype, {
			g: class_Oa
		});
		class_fa.b = true;
		class_fa.ha = class_p;
		Object.assign(class_fa.prototype, {
			g: class_fa
		});
		class_Ka.b = true;
		class_Ka.ha = class_p;
		Object.assign(class_Ka.prototype, {
			g: class_Ka
		});
		class_db.b = true;
		class_db.ha = class_p;
		Object.assign(class_db.prototype, {
			g: class_db
		});
		class_La.b = true;
		class_La.ha = class_p;
		Object.assign(class_La.prototype, {
			g: class_La
		});
		class_Ga.b = true;
		class_Ga.ha = class_p;
		Object.assign(class_Ga.prototype, {
			g: class_Ga
		});
		class_Hb.b = true;
		class_Hb.ha = class_p;
		Object.assign(class_Hb.prototype, {
			g: class_Hb
		});
		class_bb.b = true;
		class_bb.ha = class_p;
		Object.assign(class_bb.prototype, {
			g: class_bb
		});
		class_Za.b = true;
		class_Za.ha = class_p;
		Object.assign(class_Za.prototype, {
			g: class_Za
		});
		class_Ja.b = true;
		class_Ja.ha = class_p;
		Object.assign(class_Ja.prototype, {
			g: class_Ja
		});
		class_Ia.b = true;
		class_Ia.ha = class_p;
		Object.assign(class_Ia.prototype, {
			g: class_Ia
		});
		class_Gc.b = true;
		class_ma.b = true;
		class_ma.ha = class_p;
		Object.assign(class_ma.prototype, {
			g: class_ma
		});
		class_Gb.b = true;
		class_Gb.ha = class_p;
		Object.assign(class_Gb.prototype, {
			g: class_Gb
		});
		class_Ib.b = true;
		class_Ib.ha = class_p;
		Object.assign(class_Ib.prototype, {
			g: class_Ib
		});
		class_Pa.b = true;
		class_Pa.ha = class_p;
		Object.assign(class_Pa.prototype, {
			g: class_Pa
		});
		class_$a.b = true;
		class_$a.ha = class_p;
		Object.assign(class_$a.prototype, {
			g: class_$a
		});
		class_ab.b = true;
		class_ab.ha = class_p;
		Object.assign(class_ab.prototype, {
			g: class_ab
		});
		class_Fa.b = true;
		class_Fa.ha = class_p;
		Object.assign(class_Fa.prototype, {
			g: class_Fa
		});
		class_xa.b = true;
		class_xa.qd = [class_Da];
		Object.assign(class_xa.prototype, {
			g: class_xa
		});
		class_Kb.b = true;
		class_Kb.qd = [class_Da];
		Object.assign(class_Kb.prototype, {
			g: class_Kb
		});
		class_eb.b = true;
		class_eb.qd = [class_Da];
		Object.assign(class_eb.prototype, {
			g: class_eb
		});
		class_R.b = true;
		Object.assign(class_R.prototype, {
			g: class_R
		});
		class_I.b = true;
		Object.assign(class_I.prototype, {
			g: class_I
		});
		class_G.b = true;
		Object.assign(class_G.prototype, {
			g: class_G
		});
		class_T.b = true;
		Object.assign(class_T.prototype, {
			g: class_T
		});
		class_da.b = true;
		Object.assign(class_da.prototype, {
			g: class_da
		});
		class_hc.b = true;
		Object.assign(class_hc.prototype, {
			g: class_hc
		});
		class_Db.b = true;
		Object.assign(class_Db.prototype, {
			g: class_Db
		});
		class_hb.b = true;
		Object.assign(class_hb.prototype, {
			g: class_hb
		});
		class_Xa.b = true;
		Object.assign(class_Xa.prototype, {
			g: class_Xa
		});
		class_dc.b = true;
		Object.assign(class_dc.prototype, {
			g: class_dc
		});
		class_nb.b = true;
		Object.assign(class_nb.prototype, {
			g: class_nb
		});
		class_qb.b = true;
		Object.assign(class_qb.prototype, {
			g: class_qb
		});
		class_ob.b = true;
		Object.assign(class_ob.prototype, {
			g: class_ob
		});
		class_Ta.b = true;
		Object.assign(class_Ta.prototype, {
			g: class_Ta
		});
		class_kb.b = true;
		Object.assign(class_kb.prototype, {
			g: class_kb
		});
		class_kc.b = true;
		Object.assign(class_kc.prototype, {
			g: class_kc
		});
		class_tc.b = true;
		Object.assign(class_tc.prototype, {
			g: class_tc
		});
		class_wa.b = true;
		Object.assign(class_wa.prototype, {
			g: class_wa
		});
		class_Jb.b = true;
		Object.assign(class_Jb.prototype, {
			g: class_Jb
		});
		class_Cb.b = true;
		Object.assign(class_Cb.prototype, {
			g: class_Cb
		});
		class_vb.b = true;
		Object.assign(class_vb.prototype, {
			g: class_vb
		});
		class_gc.b = true;
		Object.assign(class_gc.prototype, {
			g: class_gc
		});
		class_rb.b = true;
		Object.assign(class_rb.prototype, {
			g: class_rb
		});
		class_lb.b = true;
		Object.assign(class_lb.prototype, {
			g: class_lb
		});
		class_Aa.b = true;
		Object.assign(class_Aa.prototype, {
			g: class_Aa
		});
		class_Z.b = true;
		Object.assign(class_Z.prototype, {
			g: class_Z
		});
		class_Qa.b = true;
		Object.assign(class_Qa.prototype, {
			g: class_Qa
		});
		class_tb.b = true;
		Object.assign(class_tb.prototype, {
			g: class_tb
		});
		class_zb.b = true;
		Object.assign(class_zb.prototype, {
			g: class_zb
		});
		class_Ua.b = true;
		Object.assign(class_Ua.prototype, {
			g: class_Ua
		});
		class_sb.b = true;
		Object.assign(class_sb.prototype, {
			g: class_sb
		});
		class_pb.b = true;
		Object.assign(class_pb.prototype, {
			g: class_pb
		});
		class_gb.b = true;
		Object.assign(class_gb.prototype, {
			g: class_gb
		});
		class_la.b = true;
		Object.assign(class_la.prototype, {
			g: class_la
		});
		class_aa.b = true;
		Object.assign(class_aa.prototype, {
			g: class_aa
		});
		class_mb.b = true;
		Object.assign(class_mb.prototype, {
			g: class_mb
		});
		class_jb.b = true;
		Object.assign(class_jb.prototype, {
			g: class_jb
		});
		class_v.b = true;
		class_v.ha = Error;
		Object.assign(class_v.prototype, {
			g: class_v
		});
		class_Mb.b = true;
		class_Mb.ha = class_v;
		Object.assign(class_Mb.prototype, {
			g: class_Mb
		});
		class_Dc.b = true;
		Object.assign(class_Dc.prototype, {
			g: class_Dc
		});
		class_w.b = true;
		globalScope.Ej |= 0;
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
		var ec = {}
			,
			Lc = {}
			,
			E = Number
			,
			Fc = Boolean
			,
			Mc = {}
			,
			Nc = {};
		class_u.Ma = new class_u(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
		class_u.ga = new class_u(1, 15035990, -1, 8, 'Red', 't-red', 15035990, 2);
		class_u.Ca = new class_u(2, 5671397, 1, 16, 'Blue', 't-blue', 625603, 4);
		class_u.Ma.Bg = class_u.Ma;
		class_u.ga.Bg = class_u.Ca;
		class_u.Ca.Bg = class_u.ga;
		class_w.Kn = {}.toString;
		class_Sa.to = {
			mandatory: {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false
			}
		};
		class_U.sh = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};
		class_U.Fm = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};
		class_ib.op = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
		class_p.zb = false;
		class_p.hn = new Map;
		class_p.If = 0;
		class_W.zb = false;
		class_Ya.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_va.Cc = 0;
		class_vc.channels = [{
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
		class_Y.Gj = 'application/x-www-form-urlencoded';
		class_Ca.bb = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
		class_m.Bs = 'wss://p2p.haxball.com/';
		class_m.Pe = 'https://www.haxball.com/rs/';
		class_m.ig = [{
			urls: 'stun:stun.l.google.com:19302'
		}];
		class_m.j = new class_ic;
		class_ba.pl = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(new class_P(0, 0));
			}
			return a;
		}(this);
		class_ba.vk = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(0);
			}
			return a;
		}(this);
		class_q.js = class_A.ia(1024);
		class_Na.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Fb.za = class_p.Ga({
			Ba: false,
			delay: false,
			xj: {
				kj: 10,
				Dj: 900
			}
		});
		class_cb.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_ya.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ma.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Oa.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_fa.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ka.za = class_p.Ga({
			Ba: false,
			delay: false,
			xj: {
				kj: 10,
				Dj: 2E3
			}
		});
		class_db.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_La.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ga.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Hb.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_bb.za = class_p.Ga({});
		class_Za.za = class_p.Ga({
			Ba: false,
			delay: false,
			xj: {
				kj: 10,
				Dj: 900
			}
		});
		class_Ja.za = class_p.Ga({});
		class_Ia.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_ma.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Gb.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ib.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Pa.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_$a.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_ab.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Fa.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_I.Dn = .17435839227423353;
		class_I.Cn = 5.934119456780721;
		class_da.An = new class_Vb([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
		class_da.Bn = new class_Vb([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
		class_hb.O = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_Xa.O = '<div class=\'chatbox-view\'><div class=\'chatbox-view-contents\'><div data-hook=\'drag\' class=\'drag\'></div><div data-hook=\'log\' class=\'log subtle-thin-scrollbar\'><div data-hook=\'log-contents\' class=\'log-contents\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /></div></div></div>';
		class_nb.O = '<div class=\'choose-nickname-view\'><img src="' + window.parent._gdir + 'images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
		class_qb.O = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
		class_ob.O = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
		class_Ta.O = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
		class_kb.O = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div class="fps-limit-fix"></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
		class_wa.O = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'gameplay-section\' data-hook=\'gameplay\'></div><div class=\'top-section\' data-hook=\'top-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'bottom-spacer\'></div></div><div class=\'buttons\'><div class=\'sound-button-container\' data-hook="sound"><div class=\'sound-slider\' data-hook=\'sound-slider\'><div class=\'sound-slider-bar-bg\' data-hook=\'sound-bar-bg\'><div class=\'sound-slider-bar\' data-hook=\'sound-bar\'></div></div></div><button data-hook=\'sound-btn\'><i class=\'icon-volume-up\' data-hook=\'sound-icon\'></i></button></div><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i></button></div><div data-hook=\'popups\'></div></div>';
		class_Jb.O = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
		class_Cb.O = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
		class_vb.O = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_rb.O = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
		class_lb.O = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
		class_Aa.O = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list thin-scrollbar\' data-hook=\'list\'></div></div>';
		class_Qa.O = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
		class_tb.O = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
		class_zb.Cj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
		class_Ua.Cj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span><span class=\'bool\' data-hook=\'fil-empty\'>Show empty <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
		class_pb.O = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
		class_gb.O = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
		class_la.O = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-lowlatency">Use low latency canvas</div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat opacity </div><div style="width: 40px" data-hook="chatopacity-value">1</div><input class="slider" type="range" min="0.5" max="1" step="0.01" data-hook="chatopacity-range"></div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat focus height </div><div style="width: 40px" data-hook="chatfocusheight-value">200</div><input class="slider" type="range" min="0" max="400" step="10" data-hook="chatfocusheight-range"></div><div>Chat background width:<select data-hook=\'chatbgmode\'><option>Full</option><option>Compact</option></select></div></div></div></div>';
		class_la.sm = 0;
		class_aa.O = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
		class_mb.O = '<div class="stats-view-container"><div class=\'stats-view\'><p data-hook=\'ping\'></p><p data-hook=\'fps\'></p><div data-hook=\'graph\'></div></div></div>';
		class_jb.O = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="' + window.parent._gdir + 'images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="' + window.parent._gdir + 'images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="' + window.parent._gdir + 'images/opera-icon.png"/>Opera</a></div></div></div>';
		class_B.Op();
	}
)('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this);
