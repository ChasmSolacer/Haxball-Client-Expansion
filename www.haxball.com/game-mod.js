/*
 HaxBall @ 2023 - Mario Carbajal - All rights reserved.
 1f8e31f1
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

		function ja() {
			return class_w.Me(this, '');
		}

		function function_M(a, b) {
			if (null == b)
				return null;
			null == b.rh && (b.rh = globalScope.Dj++);
			var c;
			null == a.oj ? a.oj = {} : c = a.oj[b.rh];
			null == c && (c = b.bind(a),
				a.oj[b.rh] = c);
			return c;
		}

		function function_fc(a) {
			return 66 > a ? 66 : 400 < a ? 400 : a;
		}

		class class_Y {
			static Rs(a, b) {
				a = class_O.lj(a, b);
				return 8 < a && 14 > a ? true : 32 == a;
			}

			static kt(a) {
				let b = a.length
					,
					c = 0;
				for (; c < b && class_Y.Rs(a, b - c - 1);)
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

		class class_Nb {
			constructor(a) {
				this.rd = null;
				this.br = 1E4;
				this.Fd = true;
				a.hk();
				this.Sa = a.Sa;
				this.bd = a.bd;
				this.xe = a.xe;
				this.rd = a.rd;
				this.Pm = window.performance.now();
				let b = null
					,
					c = this;
				b = function () {
					var e = c.br - c.cs();
					0 >= e ? c.ja() : (window.clearTimeout(c.Rm),
						e = window.setTimeout(b, e + 1E3),
						c.Rm = e);
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
						c.Fd && (c.Pm = window.performance.now(),
						null != c.xg && c.xg(f.data));
					}
					;
					e.onclose = function () {
						c.ja();
					};
				}
			}

			cs() {
				return window.performance.now() - this.Pm;
			}

			Ub(a, b) {
				if (this.Fd && (a = this.bd[a],
				'open' == a.readyState)) {
					b = b.Sg();
					try {
						a.send(b);
					}
					catch (c) {
						b = class_v.Kb(c).Fb(),
							globalScope.console.log(b);
					}
				}
			}

			ja() {
				window.clearTimeout(this.Rm);
				this.Fd && (this.Fd = false,
					this.Sa.close(),
				null != this.pf && this.pf());
			}
		}

		class class_gc {
			constructor() {
			}
		}

		class class_Ob {
		}

		class class_w {
			static dn(a) {
				if (null == a)
					return null;
				if (a instanceof Array)
					return Array;
				{
					let b = a.g;
					if (null != b)
						return b;
					a = class_w.Ij(a);
					return null != a ? class_w.In(a) : null;
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
						if (a.Gb) {
							var d = gb[a.Gb].Zd[a.nb];
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

			static Gj(a, b) {
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
							if (f == b || class_w.Gj(f, b))
								return true;
						}
					}
					a = a.ha;
				}
			}

			static Gn(a, b) {
				if (null == b)
					return false;
				switch (b) {
					case Array:
						return a instanceof Array;
					case zc:
						return 'boolean' == typeof a;
					case Lc:
						return null != a;
					case D:
						return 'number' == typeof a;
					case Pb:
						return 'number' == typeof a ? (a | 0) === a : false;
					case String:
						return 'string' == typeof a;
					default:
						if (null != a)
							if ('function' == typeof b) {
								if (class_w.Fn(a, b))
									return true;
							}
							else {
								if ('object' == typeof b && class_w.Hn(b) && a instanceof b)
									return true;
							}
						else
							return false;
						return b == Mc && null != a.b || b == Nc && null != a.Sf ? true : null != a.Gb ? gb[a.Gb] == b : false;
				}
			}

			static Fn(a, b) {
				return a instanceof b ? true : b.Hj ? class_w.Gj(class_w.dn(a), b) : false;
			}

			static I(a, b) {
				if (null == a || class_w.Gn(a, b))
					return a;
				throw class_v.A('Cannot cast ' + class_Q.Fe(a) + ' to ' + class_Q.Fe(b));
			}

			static Ij(a) {
				a = class_w.Jn.call(a).slice(8, -1);
				return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a;
			}

			static Hn(a) {
				return null != class_w.Ij(a);
			}

			static In(a) {
				return globalScope[a];
			}
		}

		class class_Aa {
			constructor(a) {
				this.Zf = null;
				this.Xk = this.Eh = false;
				this.gd = window.performance.now();
				this.Od = null;
				this.Oe = 0;
				this.bo = new class_hb(3, 1E3);
				this.Ea = new class_hc;
				this.Lg = 'Waiting for link';
				this.Gi = this.sm = false;
				this.Bd = 0;
				let b = this;
				this.$f = new class_Qb(a, function (d) {
						b.l.Oa.Hb(d);
					}
				);
				this.ya = a;
				a.U.Do = function (d) {
					b.sm != d && (b.sm = d,
						a.ra(class_Ba.ma(d)));
				}
				;
				this.l = new class_qa(a.xc);
				window.top.document.body.classList.add('hb-playing');
				this.Nh = new class_Rb(this.l, a.U.na(a.xc).B);
				this.Nh.zi(a.U);
				this.l.Oa.xl = function_M(this, this.cq);
				this.l.Oa.ug = function_M(this, this.bq);
				window.document.addEventListener('keydown', function_M(this, this.qb));
				window.document.addEventListener('keyup', function_M(this, this.Kd));
				window.onbeforeunload = function () {
					return 'Are you sure you want to leave the room?';
				}
				;
				this.Ea.zg = function (d) {
					a.ra(d);
				}
				;
				this.Ea.Xp = function (d) {
					'ToggleChat' == d && b.l.Oa.ls();
				}
				;
				this.l.Wa.zq = function (d) {
					a.ra(class_ra.ma(1, d));
				}
				;
				this.l.Wa.rq = function (d) {
					a.ra(class_ra.ma(0, d));
				}
				;
				this.l.Ag = function (d) {
					a.ra(class_Ca.ma(d));
				}
				;
				this.l.Wa.wq = function () {
					a.ra(new class_Ra);
				}
				;
				this.l.Wa.xq = function () {
					a.ra(new class_Sa);
				}
				;
				this.l.Wa.kq = function () {
					b.Sm();
				}
				;
				this.l.Wa.yg = function (d, e) {
					a.ra(class_fa.ma(d, e));
				}
				;
				this.l.Wa.le = function_M(this, this.ur);
				this.l.Wa.$p = function () {
					a.ra(new class_Ta);
				}
				;
				this.l.Wa.nq = function () {
					class_Aa.Zq(a);
				}
				;
				this.l.Wa.yq = function (d) {
					a.ra(class_Da.ma(d));
				}
				;
				this.l.Wa.sf = function (d) {
					let e = a.U.na(d);
					if (null != e) {
						let f = new class_ib(e, b.Gi);
						f.pb = function () {
							b.l.cb(null);
						}
						;
						f.Zp = function (g, h) {
							a.ra(class_Ea.ma(g, h));
						}
						;
						f.li = function () {
							b.Wr(e);
						}
						;
						b.l.cb(f.f, function () {
							f.D(a.U, b.Gi);
						});
					}
				}
				;
				this.l.Wa.uq = function () {
					let d = new class_jb;
					d.pb = function () {
						b.l.cb(null);
					}
					;
					b.l.cb(d.f, function () {
						d.Or(b.Lg);
					});
				}
				;
				this.l.Wa.oq = function () {
					if (null == b.Od)
						b.$r();
					else {
						let d = b.Od.stop();
						b.Od = null;
						class_Aa.pm(d);
					}
					b.l.Wa.Rr(null != b.Od);
				}
				;
				window.requestAnimationFrame(function_M(this, this.nf));
				this.Lh = window.setInterval(function () {
					b.l.Ff.zm(b.Bd);
					b.Bd = 0;
				}, 1E3);
				this.us = window.setInterval(function () {
					a.D();
				}, 50);
				var c = class_n.j.Ad.C();
				c = -200 > c ? -200 : 200 < c ? 200 : c;
				0 != c && (a.ym(class_n.j.Ad.C()),
					this.l.Oa.Hb('Extrapolation set to ' + c + ' msec'));

				// Exposing global fields begin
				/** @type {class_ua} */
				const theRoom = a.U;

				/**
				 * @param {class_sa} dynDisc
				 * @return {{}}
				 */
				function getDiscObject(dynDisc) {
					return dynDisc == null ? null : {
						x: dynDisc.a.x,
						y: dynDisc.a.y,
						xspeed: dynDisc.G.x,
						yspeed: dynDisc.G.y,
						xgravity: dynDisc.oa.x,
						ygravity: dynDisc.oa.y,
						radius: dynDisc.V,
						bCoeff: dynDisc.o,
						invMass: dynDisc.ba,
						damping: dynDisc.Da,
						color: dynDisc.S,
						cMask: dynDisc.h,
						cGroup: dynDisc.w
					};
				}

				function getScoresObject() {
					/** @type {class_aa} */
					const currentGame = theRoom.M;
					return currentGame == null ? null : {
						red: currentGame.Sb,
						blue: currentGame.Mb,
						time: currentGame.Mc,
						scoreLimit: currentGame.ib,
						timeLimit: 60 * currentGame.Fa,
						phase: currentGame.Cb
					};
				}

				/**
				 * @param {class_wa} fullPlayer
				 * @return {{}}
				 */
				function getPlayerObject(fullPlayer) {
					if (fullPlayer == null)
						return null;
					let pos = null;
					const playerDisc = fullPlayer.J;
					if (playerDisc != null) {
						pos = {
							x: playerDisc.a.x,
							y: playerDisc.a.y
						};
					}
					return {
						time: fullPlayer.Cc,
						fullPlayer: fullPlayer.sn,
						team: fullPlayer.ea?.aa,
						position: pos,
						// When a player kicks the ball, it is set to min and decrements every frame. When it reaches 0, the player can kick when kickMana > 0.
						nextKickIn: fullPlayer.Zc,
						// This equals to rate * burst. When the player kicks the ball, burst is subtracted from it, and it increments every frame.
						// When it goes below 0, the player can't kick.
						kickRateBurst: fullPlayer.Bc,
						isBlinking: fullPlayer.Yb,
						id: fullPlayer.X,
						inputKey: fullPlayer.Ea,
						name: fullPlayer.B,
						ping: fullPlayer.zb,
						u1: fullPlayer.dh,
						flag: fullPlayer.country,
						desynchronized: fullPlayer.Td,
						avatarOverride: fullPlayer.Sd,
						avatar: fullPlayer.Zb,
						order: fullPlayer.Lb,
						admin: fullPlayer.eb
					};
				}

				function getRoomPropertiesObject() {
					return {
						name: theRoom.lc
					};
				}

				/**
				 * @param {class_q} stadium
				 * @return {{}}
				 */
				function getStadiumObject(stadium) {
					return {
						vertexes: stadium.L,
						segments: stadium.W,
						planes: stadium.qa,
						goals: stadium.vc,
						discs: stadium.H,
						joints: stadium.ob,
						redSpawnPoints: stadium.Nd,
						blueSpawnPoints: stadium.vd,
						playerPhysics: stadium.Ld,
						limit: stadium.Gh,
						maxViewWidth: stadium.jf,
						cameraFollowsPlayer: stadium.Re,
						canBeStored: stadium.Xf,
						kickOffResetFull: stadium.zf
					};
				}

				window.parent.g.majorInst = this.ya;
				window.parent.g.sendChat = this.l.Oa.xl;
				window.parent.g.showChatIndicator = this.l.Oa.ug;
				window.parent.g.setAvatar = text => this.$f.xm(text);

				window.parent.g.getPlayer = playerId => {
					const fullPlayer = theRoom.na(playerId);
					return fullPlayer == null ? null : getPlayerObject(fullPlayer);
				};
				window.parent.g.getPlayerList = () => {
					const playerList = [];
					const fullPlayers = theRoom.K;
					for (let i = 0; i < fullPlayers.length; i++)
						playerList.push(getPlayerObject(fullPlayers[i]));
					return playerList;
				};
				window.parent.g.getScores = () => getScoresObject();
				window.parent.g.getBallPosition = () => {
					const currentGame = theRoom.M;
					if (currentGame == null)
						return null;
					const ballPos = currentGame.ua.H[0].a;
					return {
						x: ballPos.x,
						y: ballPos.y
					};
				};
				window.parent.g.getDiscProperties = discIndex => {
					const currentGame = theRoom.M;
					return currentGame == null ? null : getDiscObject(currentGame.ua.H[discIndex]);
				};
				window.parent.g.getPlayerDiscProperties = playerId => {
					if (theRoom.M == null)
						return null;
					const fullPlayer = theRoom.na(playerId);
					return fullPlayer == null ? null : getDiscObject(fullPlayer.J);
				};
				window.parent.g.getDiscCount = () => {
					const currentGame = theRoom.M;
					return currentGame == null ? 0 : currentGame.ua.H.length;
				};
				window.parent.g.getRoomProperties = () => getRoomPropertiesObject();
				window.parent.g.getCurrentStadium = () => getStadiumObject(theRoom.T);
				// Assuming that goal posts are symmetric with respect to the origin (that only a sign changes in the coordinates)
				window.parent.g.getGoalPostPoint = () => {
					let goalPostPoint = null;
					const currentGame = theRoom.M;
					if (currentGame != null) {
						const goals = getStadiumObject(currentGame.T).goals;
						if (goals?.length > 0)
							goalPostPoint = {
								x: Math.abs(goals[0].Y.x),
								y: Math.abs(goals[0].Y.y)
							};
					}
					return goalPostPoint;
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

			$r() {
				this.Od = new class_ic(this.ya, 3);
			}

			Wr(a) {
				a = new class_kb(a);
				let b = this;
				a.pb = function () {
					b.l.cb(null);
				}
				;
				a.li = function (c, d, e) {
					b.ya.ra(class_ka.ma(c, d, e));
					b.l.cb(null);
				}
				;
				this.l.cb(a.f);
			}

			ja() {
				window.document.removeEventListener('keydown', function_M(this, this.qb));
				window.document.removeEventListener('keyup', function_M(this, this.Kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Oe);
				window.top.document.body.classList.remove('hb-playing');
				this.Ea.ja();
				window.clearInterval(this.Lh);
				window.clearInterval(this.us);
				window.clearTimeout(this.Zf);
			}

			ur(a) {
				let b = []
					,
					c = 0
					,
					d = this.ya.U.K;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.ea == a && b.push(class_fa.ma(e.X, class_u.Ma));
				}
				for (a = 0; a < b.length;)
					this.ya.ra(b[a++]);
			}

			nf() {
				this.Oe = window.requestAnimationFrame(function_M(this, this.nf));
				this.Ea.D();
				this.ya.D();
				this.Qc();
			}

			Qc() {
				var a = window.performance.now();
				1 == class_n.j.Kh.C() && 28.333333333333336 > a - this.gd || (this.gd = a,
					this.Bd++,
					a = this.ya.U.na(this.ya.xc),
				null != a && (this.Gi = a.eb),
					this.l.D(this.ya));
			}

			cq(a) {
				let b = this;
				this.$f.tf(a) || this.bo.to(function () {
					let c = new class_Ua;
					c.$c = a;
					b.ya.ra(c);
				});
			}

			bq(a) {
				this.Eh = a;
				let b = this;
				null == this.Zf && (this.Zf = window.setTimeout(function () {
					b.Zf = null;
					b.tm(b.Eh);
				}, 1E3),
					this.tm(this.Eh));
			}

			tm(a) {
				a != this.Xk && (this.ya.ra(class_Fa.ma(a ? 0 : 1)),
					this.Xk = a);
			}

			Sm() {
				if (null != this.ya.U.M) {
					let a = new class_Va;
					a.Lf = 120 != this.ya.U.M.Qa;
					this.ya.ra(a);
				}
			}

			qb(a) {
				var b = class_n.j.Ac;
				let c = null != class_n.j.me.C().C(a.code);
				switch (a.keyCode) {
					case 9:
					case 13:
						this.l.Oa.Za.focus({
							preventScroll: true
						});
						a.preventDefault();
						break;
					case 27:
						this.l.tp() ? this.l.cb(null) : (b = this.l,
							b.ue(!b.nd));
						a.preventDefault();
						break;
					case 48:
						c ? this.Ea.qb(a) : b.sa(0.1);
						break;
					case 49:
						c ? this.Ea.qb(a) : b.sa(1);
						break;
					case 50:
						c ? this.Ea.qb(a) : b.sa(2);
						break;
					case 51:
						c ? this.Ea.qb(a) : b.sa(3);
						break;
					case 52:
						c ? this.Ea.qb(a) : b.sa(4);
						break;
					case 53:
						c ? this.Ea.qb(a) : b.sa(5);
						break;
					case 54:
						c ? this.Ea.qb(a) : b.sa(6);
						break;
					case 55:
						c ? this.Ea.qb(a) : b.sa(7);
						break;
					case 56:
						c ? this.Ea.qb(a) : b.sa(15);
						break;
					case 57:
						c ? this.Ea.qb(a) : b.sa(-1.5);
						break;
					case 80:
						this.Sm();
						break;
					default:
						this.Ea.qb(a);
				}
			}

			Kd(a) {
				this.Ea.Kd(a);
			}

			static pm(a) {
				let b = new Date;
				class_Sb.zr(a, 'HBReplay-' + b.getFullYear() + '-' + class_Y.Kf('' + (b.getMonth() + 1)) + '-' + class_Y.Kf('' + b.getDate()) + '-' + class_Y.Kf('' + b.getHours()) + 'h' + class_Y.Kf('' + b.getMinutes()) + 'm.hbr2');
			}

			static Zq(a) {
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
					e == d ? 2 > f || (a.ra(class_fa.ma(b(), class_u.ga)),
						a.ra(class_fa.ma(b(), class_u.Ca))) : (d = e > d ? class_u.ga : class_u.Ca,
						a.ra(class_fa.ma(b(), d))));
			}
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

		class class_Tb {
			static parse(a) {
				a.F();
				let b = [];
				for (; 0 != a.s.byteLength - a.a;) {
					let c = a.pe(a.Rb())
						,
						d = a.Vl(a.Rb());
					try {
						let e = new class_Ub;
						e.ka(new class_J(new DataView(d), false));
						let f = new class_jc;
						f.Ed = e;
						f.aa = c;
						b.push(f);
					}
					catch (e) {
					}
				}
				return b;
			}

			static Ps(a, b, c, d) {
				return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
			}

			static lt(a, b) {
				let c = a.Jc;
				a = a.Lc;
				let d = 0;
				for (; d < b.length;) {
					let e = b[d];
					++d;
					let f = e.Ed;
					e.We = 6378 * class_Tb.Ps(.017453292519943295 * f.Jc, .017453292519943295 * f.Lc, .017453292519943295 * c, .017453292519943295 * a);
					isFinite(e.We) || (e.We = 22E3);
				}
			}

			static get() {
				return class_Z.C(class_n.Pe + 'api/list', 'arraybuffer').then(function (a) {
					return class_Tb.parse(new class_J(new DataView(a), false));
				});
			}
		}

		class class_kb {
			constructor(a) {
				this.f = class_x.Ha(class_kb.O);
				let b = class_x.Aa(this.f);
				this.kf = b.get('title');
				this.wi = b.get('reason');
				this.Pn = b.get('ban-btn');
				this.Rn = b.get('ban-text');
				this.af = b.get('kick');
				this.wd = b.get('close');
				let c = this;
				this.Pn.onclick = function () {
					c.Nj(!c.Wj);
				}
				;
				this.wd.onclick = function () {
					class_H.i(c.pb);
				}
				;
				this.af.onclick = function () {
					class_kc.i(c.li, c.Qb, c.wi.value, c.Wj);
				}
				;
				this.wi.onkeydown = function (d) {
					return d.stopPropagation();
				}
				;
				this.wi.maxLength = 100;
				this.Qb = a.X;
				this.kf.textContent = 'Kick ' + a.B;
				this.Nj(false);
			}

			Nj(a) {
				this.Wj = a;
				this.Rn.textContent = a ? 'Yes' : 'No';
			}
		}

		class class_lc {
			constructor() {
				this.Fa = 0;
				this.yk = this.zk = false;
				this.Ve = 0;
				this.f = window.document.createElement('div');
				this.f.className = 'game-timer-view';
				this.f.appendChild(this.Aq = this.de('OVERTIME!', 'overtime'));
				this.f.appendChild(this.Up = this.de('0', 'digit'));
				this.f.appendChild(this.Tp = this.de('0', 'digit'));
				this.f.appendChild(this.de(':', null));
				this.f.appendChild(this.Cr = this.de('0', 'digit'));
				this.f.appendChild(this.Br = this.de('0', 'digit'));
			}

			de(a, b) {
				let c = window.document.createElement('span');
				c.textContent = a;
				c.className = b;
				return c;
			}

			Tr(a) {
				if (a != this.Ve) {
					let b = a % 60
						,
						c = a / 60 | 0;
					this.Br.textContent = '' + b % 10;
					this.Cr.textContent = '' + (b / 10 | 0) % 10;
					this.Tp.textContent = '' + c % 10;
					this.Up.textContent = '' + (c / 10 | 0) % 10;
					this.Ve = a;
				}
				this.bm();
				this.cm();
			}

			Ur(a) {
				this.Fa = a;
				this.bm();
				this.cm();
			}

			bm() {
				this.Pr(0 != this.Fa && this.Ve > this.Fa);
			}

			cm() {
				this.Vr(this.Ve < this.Fa && this.Ve > this.Fa - 30);
			}

			Pr(a) {
				a != this.yk && (this.Aq.className = a ? 'overtime on' : 'overtime',
					this.yk = a);
			}

			Vr(a) {
				a != this.zk && (this.f.className = a ? 'game-timer-view time-warn' : 'game-timer-view',
					this.zk = a);
			}
		}

		class class_lb {
			constructor(a) {
				this.f = class_x.Ha(class_lb.O);
				class_x.Aa(this.f).get('features').textContent = a.join(', ');
			}
		}

		class class_la {
			constructor(a) {
				function b(y) {
					let F = window.document.createElement('div');
					F.className = 'inputrow';
					var K = window.document.createElement('div');
					K.textContent = y;
					F.appendChild(K);
					K = mb.Xo(y);
					let da = 0;
					for (; da < K.length;) {
						let T = K[da];
						++da;
						let mc = window.document.createElement('div');
						var R = T;
						T.startsWith('Key') && (R = class_O.substr(T, 3, null));
						mc.textContent = R;
						F.appendChild(mc);
						R = window.document.createElement('i');
						R.className = 'icon-cancel';
						R.onclick = function () {
							mb.gr(T);
							class_n.j.me.sa(mb);
							mc.remove();
						}
						;
						mc.appendChild(R);
					}
					K = window.document.createElement('i');
					K.className = 'icon-plus';
					F.appendChild(K);
					K.onclick = function () {
						nc.classList.toggle('show', true);
						nc.focus();
						nc.onkeydown = function (T) {
							nc.classList.toggle('show', false);
							T.stopPropagation();
							T = T.code;
							null == mb.C(T) && (mb.Ra(T, y),
								class_n.j.me.sa(mb),
								Ac());
						};
					}
					;
					return F;
				}

				function c(y, F, K) {
					y = l.get(y);
					if (null == K)
						y.hidden = true;
					else {
						y.innerHTML = F + ': <div class=\'flagico\'></div> <span></span>';
						F = y.querySelector('.flagico');
						y = y.querySelector('span');
						try {
							F.classList.add('f-' + K.ub);
						}
						catch (da) {
						}
						y.textContent = K.ub.toUpperCase();
					}
				}

				function d() {
					let y = class_n.j.Ah.C();
					L.textContent = '' + y;
					N.value = '' + y;
				}

				function e() {
					let y = class_n.j.Bh.C();
					t.textContent = '' + y;
					z.value = '' + y;
				}

				function f(y, F, K, da) {
					let R = l.get(y);
					y = F.C();
					R.selectedIndex = da(y);
					R.onchange = function () {
						F.sa(K(R.selectedIndex));
					};
				}

				function g(y, F, K) {
					function da(T) {
						R.classList.toggle('icon-ok', T);
						R.classList.toggle('icon-cancel', !T);
					}

					y = l.get(y);
					y.classList.add('toggle');
					let R = window.document.createElement('i');
					R.classList.add('icon-ok');
					y.insertBefore(R, y.firstChild);
					y.onclick = function () {
						let T = !F.C();
						F.sa(T);
						da(T);
						null != K && K(T);
					}
					;
					da(F.C());
				}

				function h(y) {
					let F = {
						an: l.get(y + 'btn'),
						lh: l.get(y + 'sec')
					};
					m.push(F);
					F.an.onclick = function () {
						k(F);
					};
				}

				function k(y) {
					let F = 0
						,
						K = 0;
					for (; K < m.length;) {
						let da = m[K];
						++K;
						let R = da == y;
						R && (class_la.rm = F);
						da.lh.classList.toggle('selected', R);
						da.an.classList.toggle('selected', R);
						++F;
					}
				}

				null == a && (a = false);
				this.f = class_x.Ha(class_la.O);
				let l = class_x.Aa(this.f);
				this.wd = l.get('close');
				let m = [];
				h('sound');
				h('video');
				h('misc');
				h('input');
				k(m[class_la.rm]);
				g('tsound-main', class_n.j.ve, function () {
					class_n.Na.yi();
				});
				g('tsound-chat', class_n.j.Qi);
				g('tsound-highlight', class_n.j.Gm);
				g('tsound-crowd', class_n.j.Fm);
				f('viewmode', class_n.j.Ac, function (y) {
					return y - 1;
				}, function (y) {
					return y + 1;
				});
				f('fps', class_n.j.Kh, function (y) {
					return y;
				}, function (y) {
					return y;
				});
				let r = [1, .75, .5, .25];
				f('resscale', class_n.j.Ei, function (y) {
					return r[y];
				}, function (y) {
					let F = 0
						,
						K = r.length - 1;
					for (; F < K && !(r[F] <= y);)
						++F;
					return F;
				});
				g('tvideo-teamcol', class_n.j.Om);
				g('tvideo-showindicators', class_n.j.Qk);
				g('tvideo-showavatars', class_n.j.Dm);
				let t = l.get('chatopacity-value')
					,
					z = l.get('chatopacity-range');
				e();
				z.oninput = function () {
					class_n.j.Bh.sa(parseFloat(z.value));
					e();
				}
				;
				let L = l.get('chatfocusheight-value')
					,
					N = l.get('chatfocusheight-range');
				d();
				N.oninput = function () {
					class_n.j.Ah.sa(class_Q.parseInt(N.value));
					d();
				}
				;
				f('chatbgmode', class_n.j.ek, function (y) {
					return 0 == y ? 'full' : 'compact';
				}, function (y) {
					return 'full' == y ? 0 : 1;
				});
				let nb = null
					,
					Gc = this;
				nb = function () {
					let y = class_n.j.Ye.C();
					c('loc', 'Detected location', class_n.j.Xe.C());
					c('loc-ovr', 'Location override', y);
					let F = l.get('loc-ovr-btn');
					F.disabled = !a;
					null == y ? (F.textContent = 'Override location',
							F.onclick = function () {
								class_H.i(Gc.aq);
							}
					) : (F.textContent = 'Remove override',
							F.onclick = function () {
								class_n.j.Ye.sa(null);
								nb();
							}
					);
				}
				;
				nb();
				let mb = class_n.j.me.C()
					,
					nc = l.get('presskey')
					,
					Ac = null
					,
					Wa = l.get('inputsec');
				Ac = function () {
					class_x.Mf(Wa);
					Wa.appendChild(b('Up'));
					Wa.appendChild(b('Down'));
					Wa.appendChild(b('Left'));
					Wa.appendChild(b('Right'));
					Wa.appendChild(b('Kick'));
					Wa.appendChild(b('ToggleChat'));
				}
				;
				Ac();
				this.wd.onclick = function () {
					class_H.i(Gc.pb);
				};
			}
		}

		class class_ob {
			constructor() {
				this.f = class_x.Ha(class_ob.O);
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

		class class_pb {
			constructor(a) {
				this.B = a.B;
				this.zb = a.zb;
				this.aa = a.X;
				this.f = class_x.Ha(class_pb.O);
				let b = class_x.Aa(this.f);
				this.kf = b.get('name');
				this.Dg = b.get('ping');
				try {
					b.get('flag').classList.add('f-' + a.country);
				}
				catch (d) {
				}
				this.kf.textContent = this.B;
				this.Dg.textContent = '' + this.zb;
				let c = this;
				this.f.ondragstart = function (d) {
					d.dataTransfer.setData('player', class_Q.Fe(c.aa));
				}
				;
				this.f.oncontextmenu = function (d) {
					d.preventDefault();
					class_E.i(c.sf, c.aa);
				}
				;
				this.wm(a.eb);
			}

			D(a, b) {
				this.f.draggable = b;
				this.zb != a.zb && (this.zb = a.zb,
					this.Dg.textContent = '' + this.zb);
				this.Ln != a.eb && this.wm(a.eb);
			}

			wm(a) {
				this.Ln = a;
				this.f.className = 'player-list-item' + (a ? ' admin' : '');
			}
		}

		class class_qb {
			constructor(a) {
				this.wk = false;
				this.Hm = new class_Ga(class_u.Ma);
				this.Yj = new class_Ga(class_u.Ca);
				this.$l = new class_Ga(class_u.ga);
				this.f = class_x.Ha(class_qb.O);
				let b = class_x.Aa(this.f);
				this.lc = b.get('room-name');
				this.Km = b.get('start-btn');
				this.Mm = b.get('stop-btn');
				this.ni = b.get('pause-btn');
				this.On = b.get('auto-btn');
				this.bl = b.get('lock-btn');
				this.jm = b.get('reset-all-btn');
				this.Yl = b.get('rec-btn');
				let c = b.get('link-btn')
					,
					d = b.get('leave-btn')
					,
					e = b.get('rand-btn');
				this.Hf = b.get('time-limit-sel');
				this.Af = b.get('score-limit-sel');
				this.Im = b.get('stadium-name');
				this.Jm = b.get('stadium-pick');
				let f = this;
				this.Jm.onclick = function () {
					class_H.i(f.vq);
				}
				;
				this.Xh(b.get('red-list'), this.$l, a);
				this.Xh(b.get('blue-list'), this.Yj, a);
				this.Xh(b.get('spec-list'), this.Hm, a);
				this.il(this.Hf, this.hl());
				this.il(this.Af, this.hl());
				this.Hf.onchange = function () {
					class_E.i(f.zq, f.Hf.selectedIndex);
				}
				;
				this.Af.onchange = function () {
					class_E.i(f.rq, f.Af.selectedIndex);
				}
				;
				this.Km.onclick = function () {
					class_H.i(f.wq);
				}
				;
				this.Mm.onclick = function () {
					class_H.i(f.xq);
				}
				;
				this.ni.onclick = function () {
					class_H.i(f.kq);
				}
				;
				this.On.onclick = function () {
					class_H.i(f.$p);
				}
				;
				this.bl.onclick = function () {
					class_E.i(f.yq, !f.bi);
				}
				;
				this.jm.onclick = function () {
					null != f.le && (f.le(class_u.Ca),
						f.le(class_u.ga));
				}
				;
				this.Yl.onclick = function () {
					class_H.i(f.oq);
				}
				;
				c.onclick = function () {
					class_H.i(f.uq);
				}
				;
				d.onclick = function () {
					class_H.i(f.ke);
				}
				;
				e.onclick = function () {
					class_H.i(f.nq);
				}
				;
				this.Oj(false);
				this.Pj(false);
			}

			Xh(a, b, c) {
				class_x.replaceWith(a, b.f);
				let d = this;
				b.yg = function (e, f) {
					class_Ha.i(d.yg, e, f);
				}
				;
				b.le = function (e) {
					class_E.i(d.le, e);
				}
				;
				b.hq = function (e) {
					class_Ha.i(d.yg, c, e);
				}
				;
				b.sf = function (e) {
					class_E.i(d.sf, e);
				};
			}

			hl() {
				let a = []
					,
					b = 0;
				for (; 15 > b;) {
					let c = b++;
					a.push(null == c ? 'null' : '' + c);
				}
				return a;
			}

			il(a, b) {
				let c = 0;
				for (; c < b.length;) {
					let d = b[c++]
						,
						e = window.document.createElement('option');
					e.textContent = d;
					a.appendChild(e);
				}
			}

			Rr(a) {
				this.Yl.classList.toggle('active', a);
			}

			D(a, b) {
				this.sr != a.lc && (this.sr = a.lc,
					this.lc.textContent = a.lc);
				b = null == b ? false : b.eb;
				this.wk != b && (this.f.className = 'room-view' + (b ? ' admin' : ''),
					this.wk = b);
				var c = !b || null != a.M;
				this.Hf.disabled = c;
				this.Af.disabled = c;
				this.Jm.disabled = c;
				c = null != a.M;
				this.Km.hidden = c;
				this.Mm.hidden = !c;
				this.ni.hidden = !c;
				this.Hf.selectedIndex = a.Fa;
				this.Af.selectedIndex = a.ib;
				this.Im.textContent = a.T.B;
				this.Im.classList.toggle('custom', !a.T.$e());
				let d = a.Vc;
				for (var e = this.$l, f = a.K, g = [], h = 0; h < f.length;) {
					var k = f[h];
					++h;
					k.ea == class_u.ga && g.push(k);
				}
				e.D(g, d, c, b);
				e = this.Yj;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == class_u.Ca && g.push(k);
				e.D(g, d, c, b);
				e = this.Hm;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == class_u.Ma && g.push(k);
				e.D(g, d, c, b);
				this.jm.disabled = c;
				this.bi != a.Vc && this.Oj(a.Vc);
				c && (a = 120 == a.M.Qa,
				this.Dl != a && this.Pj(a));
			}

			Oj(a) {
				this.bi = a;
				this.bl.innerHTML = this.bi ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
			}

			Pj(a) {
				this.Dl = a;
				this.ni.innerHTML = '<i class=\'icon-pause\'></i>' + (this.Dl ? 'Resume (P)' : 'Pause (P)');
			}
		}

		class class_Z {
			static hm(a, b, c, d, e) {
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

			static C(a, b) {
				return class_Z.hm(a, 'GET', b, null);
			}

			static Jk(a) {
				return class_Z.C(a, 'json').then(function (b) {
					let c = b.error;
					if (null != c)
						throw class_v.A(c);
					return b.data;
				});
			}

			static Kq(a, b, c) {
				return class_Z.hm(a, 'POST', 'json', b, c);
			}

			static Rl(a, b, c) {
				return class_Z.Kq(a, b, c).then(function (d) {
					let e = d.error;
					if (null != e)
						throw class_v.A(e);
					return d.data;
				});
			}
		}

		class class_P {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		/** Game */
		class class_aa {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Sb = this.Mb = this.Mc = this.Qa = 0;
				this.he = class_u.ga;
				this.yc = this.Cb = 0;
				this.ua = new class_Xa;
				this.Fa = 0;
				this.ib = 5;
				/** @type {class_q} */
				this.T = null;
			}

			qp(a) {
				this.Pa = a;
				this.ib = a.ib;
				this.Fa = a.Fa;
				this.T = a.T;
				this.ua.L = this.T.L;
				this.ua.qa = this.T.qa;
				this.ua.W = this.T.W;
				this.ua.ob = this.T.ob;
				a = 0;
				let b = this.T.H;
				for (; a < b.length;)
					this.ua.H.push(b[a++].Np());
				this.Vk();
			}

			Sk(a) {
				if (a.ea == class_u.Ma)
					a.J = null;
				else {
					a.Ea = 0;
					var b = a.J;
					null == b && (b = new class_sa,
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
					b = b.oa;
					c = c.oa;
					b.x = c.x;
					b.y = c.y;
				}
			}

			D(a) {
				if (0 < this.Qa)
					120 > this.Qa && this.Qa--;
				else {
					// Exposing global fields begin
					const onGameTickFun = window.parent.g.onGameTick;
					if (onGameTickFun != null)
						onGameTickFun(this);
					// Exposing global fields end

					var b = this.Pa.rt;
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
											m = d.J.a
											,
											r = l.x - m.x;
										l = l.y - m.y;
										m = Math.sqrt(r * r + l * l);
										if (4 > m - k.V - d.J.V) {
											f = r / m;
											r = l / m;
											l = e.bf;
											var t = m = k.G;
											k = k.ba;
											m.x = t.x + f * l * k;
											m.y = t.y + r * l * k;
											t = d.J;
											k = -e.cf;
											m = l = t.G;
											t = t.ba;
											l.x = m.x + f * k * t;
											l.y = m.y + r * k * t;
											f = true;
										}
									}
								}
								f && (null != this.Pa.ri && this.Pa.ri(d),
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
						0 != (h.w & 128) && (class_aa.uk[c] = f,
							f = class_aa.ol[c],
							h = h.a,
							f.x = h.x,
							f.y = h.y,
							++c);
					this.ua.D(a);
					if (0 == this.Cb) {
						for (a = 0; a < b.length;)
							c = b[a],
								++a,
							null != c.J && (c.J.h = 39 | this.he.xp);
						b = this.ua.H[0].G;
						0 < b.x * b.x + b.y * b.y && (this.Cb = 1);
					}
					else if (1 == this.Cb) {
						this.Mc += .016666666666666666;
						for (a = 0; a < b.length;)
							d = b[a],
								++a,
							null != d.J && (d.J.h = 39);
						d = class_u.Ma;
						b = this.ua.H;
						for (a = 0; a < c && (d = a++,
							d = this.T.co(b[class_aa.uk[d]].a, class_aa.ol[d]),
						d == class_u.Ma);)
							;
						d != class_u.Ma ? (this.Cb = 2,
							this.yc = 150,
							this.he = d,
							d == class_u.ga ? this.Mb++ : this.Sb++,
						null != this.Pa.Xi && this.Pa.Xi(d.Bg),
						null != this.Pa.gm && this.Pa.gm(d.aa)) : 0 < this.Fa && this.Mc >= 60 * this.Fa && this.Sb != this.Mb && (null != this.Pa.Zi && this.Pa.Zi(),
							this.Lm());
					}
					else if (2 == this.Cb)
						this.yc--,
						0 >= this.yc && (0 < this.ib && (this.Sb >= this.ib || this.Mb >= this.ib) || 0 < this.Fa && this.Mc >= 60 * this.Fa && this.Sb != this.Mb ? this.Lm() : (this.Vk(),
						null != this.Pa.Jq && this.Pa.Jq()));
					else if (3 == this.Cb && (this.yc--,
					0 >= this.yc && (b = this.Pa,
					null != b.M))) {
						b.M = null;
						a = 0;
						for (c = b.K; a < c.length;)
							d = c[a],
								++a,
								d.J = null,
								d.Lb = 0;
						null != b.Gf && b.Gf(null);
					}
				}
			}

			Lm() {
				this.yc = 300;
				this.Cb = 3;
				null != this.Pa.Yi && this.Pa.Yi(this.Sb > this.Mb ? class_u.ga : class_u.Ca);
			}

			Vk() {
				let a = this.Pa.K;
				this.Cb = 0;
				for (var b = this.T.H, c = this.ua.H, d = 0, e = this.T.zf ? b.length : 1; d < e;) {
					var f = d++;
					b[f].Rk(c[f]);
				}
				b = [0, 0, 0];
				for (c = 0; c < a.length;)
					if (d = a[c],
						++c,
						this.Sk(d),
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
						d.Lb = b[e.aa];
					}
			}

			fa(a) {
				this.ua.fa(a);
				a.P(this.yc);
				a.P(this.Cb);
				a.P(this.Sb);
				a.P(this.Mb);
				a.u(this.Mc);
				a.P(this.Qa);
				a.m(this.he.aa);
			}

			ka(a, b) {
				this.ua.ka(a);
				this.yc = a.N();
				this.Cb = a.N();
				this.Sb = a.N();
				this.Mb = a.N();
				this.Mc = a.v();
				this.Qa = a.N();
				a = a.vf();
				this.he = 1 == a ? class_u.ga : 2 == a ? class_u.Ca : class_u.Ma;
				this.Pa = b;
				this.ib = b.ib;
				this.Fa = b.Fa;
				this.T = b.T;
				this.ua.L = this.T.L;
				this.ua.W = this.T.W;
				this.ua.qa = this.T.qa;
				this.ua.ob = this.T.ob;
			}

			uc() {
				let a = class_ta.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_aa),
					this.jc = a,
					class_aa.zd(b, this));
				return b;
			}

			static zd(a, b) {
				a.Pa = b.Pa.uc();
				a.ib = b.ib;
				a.Fa = b.Fa;
				a.ua = b.ua.uc();
				a.yc = b.yc;
				a.Cb = b.Cb;
				a.Sb = b.Sb;
				a.Mb = b.Mb;
				a.Mc = b.Mc;
				a.Qa = b.Qa;
				a.T = b.T;
				a.he = b.he;
			}
		}

		class class_hb {
			constructor(a, b) {
				this.$j = a;
				this.bj = b;
				this.qc = a;
				this.ff = window.performance.now();
			}

			Tm() {
				var a;
				null == a && (a = 1);
				this.D();
				return a <= this.qc ? (this.qc -= a,
					true) : false;
			}

			ds() {
				this.D();
				let a = 1 - this.qc;
				if (0 >= a)
					return 0;
				let b = window.performance.now();
				return this.ff + a * this.bj - b;
			}

			to(a) {
				let b = this.ds();
				--this.qc;
				window.setTimeout(a, b | 0);
			}

			D() {
				let a = window.performance.now()
					,
					b = Math.floor((a - this.ff) / this.bj);
				this.ff += b * this.bj;
				this.qc += b;
				this.qc >= this.$j && (this.qc = this.$j,
					this.ff = a);
			}
		}

		class class_Xa {
			constructor() {
				this.jc = -1;
				this.ic = null;
				/** @type {class_sa[]} */
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
					e.Bl = d;
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
					let d = new class_sa;
					d.ka(a);
					this.H.push(d);
				}
			}

			D(a) {
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
					g = d.oa;
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
						0 != (f.h & c.w) && 0 != (f.w & c.h) && c.jo(f);
					if (0 != c.ba) {
						d = 0;
						for (e = this.qa; d < e.length;)
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
							0 != (f.h & c.w) && 0 != (f.w & c.h) && c.ko(f);
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
								let m = l = c.a;
								l.x = m.x + g * k;
								l.y = m.y + h * k;
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
						     c = this.ob; b < c.length;)
						c[b++].D(this.H);
			}

			uc() {
				let a = class_ta.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_Xa),
					this.jc = a,
					class_Xa.zd(b, this));
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
				a.qa = b.qa;
				a.ob = b.ob;
			}
		}

		class class_Ya {
			constructor(a) {
				this.Sp = a;
			}
		}

		class class_rb {
			constructor() {
				this.Qb = -1;
				this.Nb = new class_V;
				this.Wc = new class_lc;
				this.f = class_x.Ha(class_rb.O);
				let a = class_x.Aa(this.f);
				this.Sb = new class_Vb(a.get('red-score'), 0);
				this.Mb = new class_Vb(a.get('blue-score'), 0);
				class_x.replaceWith(a.get('timer'), this.Wc.f);
				class_x.replaceWith(a.get('canvas'), this.Nb.ta);
			}

			D(a) {
				let b = a.M;
				null == b ? this.f.hidden = true : (this.f.hidden = false,
					this.Wc.Ur(60 * a.Fa),
					this.Wc.Tr(b.Mc | 0),
					this.Mb.set(b.Mb),
					this.Sb.set(b.Sb),
					this.Nb.Qc(a, this.Qb));
			}
		}

		class class_sb {
			constructor(a) {
				function b() {
					d.Ic() && null != d.ul && d.ul(d.Db.value);
				}

				this.f = class_x.Ha(class_sb.O);
				let c = class_x.Aa(this.f);
				this.Db = c.get('input');
				this.mf = c.get('ok');
				let d = this;
				this.Db.maxLength = 25;
				this.Db.value = a;
				this.Db.oninput = function () {
					d.D();
				}
				;
				this.Db.onkeydown = function (e) {
					13 == e.keyCode && b();
				}
				;
				this.mf.onclick = b;
				this.D();
			}

			Ic() {
				let a = this.Db.value;
				return 25 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.mf.disabled = !this.Ic();
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

			hs() {
				return new class_J(this.Qd(), this.Ta);
			}

			tc(a) {
				this.s.byteLength < a && this.wr(2 * this.s.byteLength >= a ? 2 * this.s.byteLength : a);
			}

			wr(a) {
				if (1 > a)
					throw class_v.A('Can\'t resize buffer to a capacity lower than 1');
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

			gj(a) {
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

			tb(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setUint32(b, a, this.Ta);
			}

			fj(a) {
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
				this.lb(class_A.Wf(a));
				this.Xg(a);
			}

			Eb(a) {
				null == a ? this.lb(0) : (this.lb(class_A.Wf(a) + 1),
					this.Xg(a));
			}

			$m(a) {
				let b = class_A.Wf(a);
				if (255 < b)
					throw class_v.A(null);
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
					b += class_A.No(class_O.lj(a, d++), this.s, b);
				this.a = b;
			}

			lb(a) {
				let b = this.a;
				a >>>= 0;
				this.tc(b + class_A.Yn(a));
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

			static No(a, b, c) {
				let d = c;
				if (0 > a)
					throw class_v.A('Cannot encode UTF8 character: charCode (' + a + ') is negative');
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
					throw class_v.A('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
				return c - d;
			}

			static Xn(a) {
				if (0 > a)
					throw class_v.A('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
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
				throw class_v.A('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
			}

			static Wf(a) {
				let b = 0
					,
					c = a.length
					,
					d = 0;
				for (; d < c;)
					b += class_A.Xn(class_O.lj(a, d++));
				return b;
			}

			static Yn(a) {
				a >>>= 0;
				return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5;
			}
		}

		class class_V {
			constructor() {
				this.gd = window.performance.now();
				this.Rg = new Map;
				this.md = new Map;
				this.re = 1;
				this.xh = 100;
				this.Tg = 35;
				this.Md = 0;
				this.Gg = 1.5;
				this.Xa = new class_P(0, 0);
				this.Tk = false;
				this.Cd = new class_oc;
				this.ta = window.document.createElement('canvas');
				this.ta.mozOpaque = true;
				this.c = this.ta.getContext('2d', {
					alpha: false
				});
				this.ep = this.c.createPattern(class_n.cp, null);
				this.qo = this.c.createPattern(class_n.po, null);
				this.oo = this.c.createPattern(class_n.no, null);
			}

			ip(a, b) {
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

			ts() {
				if (null != this.ta.parentElement) {
					var a = window.devicePixelRatio * this.re;
					let b = this.ta.getBoundingClientRect()
						,
						c = Math.round(b.width * a);
					a = Math.round(b.height * a);
					if (this.ta.width != c || this.ta.height != a)
						this.ta.width = c,
							this.ta.height = a;
				}
			}

			Qc(a, b) {
				var c = window.performance.now();
				let d = (c - this.gd) / 1E3;
				this.gd = c;
				this.Rg.clear();
				this.ts();
				class_V.Pi(this.c, true);
				this.c.resetTransform();
				if (null != a.M) {
					c = a.M;
					var e = c.ua
						,
						f = a.na(b)
						,
						g = null != f ? f.J : null
						,
						h = 0 != this.Md ? this.ta.height / this.Md : this.Gg * window.devicePixelRatio * this.re;
					b = this.Tg * this.re;
					var k = this.xh * this.re
						,
						l = c.T.jf
						,
						m = this.ta.width / h;
					0 < l && m > l && (m = l,
						h = this.ta.width / l);
					l = (this.ta.height - b - k) / h;
					this.qs(c, g, m, l, d);
					for (var r = 0, t = a.K; r < t.length;) {
						let z = t[r];
						++r;
						if (null == z.J)
							continue;
						let L = this.md.get(z.X);
						null == L && (L = new class_tb,
							this.md.set(z.X, L));
						L.D(z, a);
						this.Rg.set(z.J, L);
					}
					this.c.translate(this.ta.width / 2, (this.ta.height + b - k) / 2);
					this.c.scale(h, h);
					this.c.translate(-this.Xa.x, -this.Xa.y);
					this.c.lineWidth = 3;
					this.qr(c.T);
					this.pr(c.T);
					h = e.H;
					r = 0;
					for (t = e.ob; r < t.length;)
						this.jr(t[r++], h);
					this.ir(a, m, l);
					this.kr(a, f);
					null != g && this.mr(g.a);
					this.c.lineWidth = 2;
					f = 0;
					for (g = a.K; f < g.length;)
						l = g[f],
							++f,
							m = l.J,
						null != m && (l = this.md.get(l.X),
							this.dm(m, l));
					f = 0;
					for (e = e.H; f < e.length;)
						if (g = e[f],
							++f,
						null == this.Rg.get(g)) {
							if (0 > g.V)
								break;
							this.dm(g, null);
						}
					this.c.lineWidth = 3;
					this.c.resetTransform();
					this.c.translate(this.ta.width / 2, b + (this.ta.height - b - k) / 2);
					this.lr(c);
					0 >= c.Qa && (this.Cd.D(d),
						this.Cd.Qc(this.c));
					this.Rg.clear();
					this.hr(a);
				}
			}

			hr(a) {
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

			qs(a, b, c, d, e) {
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
					let m = .5 * b;
					b = h.x - l + 50;
					k = h.y - m + 50;
					l = h.x + l - 50;
					h = h.y + m - 50;
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
				this.ro(c, d, a.T);
			}

			ro(a, b, c) {
				a > 2 * c.bc ? this.Xa.x = 0 : this.Xa.x + .5 * a > c.bc ? this.Xa.x = c.bc - .5 * a : this.Xa.x - .5 * a < -c.bc && (this.Xa.x = -c.bc + .5 * a);
				b > 2 * c.sc ? this.Xa.y = 0 : this.Xa.y + .5 * b > c.sc ? this.Xa.y = c.sc - .5 * b : this.Xa.y - .5 * b < -c.sc && (this.Xa.y = -c.sc + .5 * b);
			}

			mr(a) {
				this.c.beginPath();
				this.c.strokeStyle = 'white';
				this.c.globalAlpha = .3;
				this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, false);
				this.c.stroke();
				this.c.globalAlpha = 1;
			}

			lr(a) {
				let b = 0 < a.Qa;
				this.Mr(b);
				b && (120 != a.Qa && (a = a.Qa / 120 * 200,
					this.c.fillStyle = 'white',
					this.c.fillRect(.5 * -a, 100, a, 20)),
					this.Cd.Cq.rr(this.c));
			}

			Mr(a) {
				this.Tk != a && (this.ta.style.filter = a ? 'grayscale(70%)' : '',
					this.Tk = a);
			}

			nm(a, b, c, d, e, f) {
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

			qr(a) {
				class_V.Pi(this.c, false);
				var b = a.ae;
				let c = a.$d
					,
					d = this;
				if (1 == a.ud)
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_V.nc(a.td),
						this.c.fillRect(0, 0, this.ta.width, this.ta.height),
						this.c.restore(),
						this.c.strokeStyle = '#C7E6BD',
						this.c.fillStyle = this.ep,
						this.nm(this.c, -b, -c, 2 * b, 2 * c, a.Gc),
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
					this.c.fillStyle = this.oo;
					this.c.fill();
					this.c.restore();
					this.c.save();
					this.nm(this.c, -b, -c, 2 * b, 2 * c, a.Gc);
					this.c.scale(2, 2);
					this.c.fillStyle = this.qo;
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
						this.c.fillStyle = class_V.nc(a.td),
						this.c.fillRect(0, 0, this.ta.width, this.ta.height),
						this.c.restore();
				class_V.Pi(this.c, true);
			}

			kr(a, b) {
				let c = class_n.j.Qk.C()
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
					c && g.kg && this.c.drawImage(class_n.Um, e.x - .5 * class_n.Um.width, e.y - 35);
					f != b && g.Lo(this.c, e.x, e.y + 50);
				}
			}

			dm(a, b) {
				0 > a.V || (this.c.beginPath(),
					null == b ? (this.c.fillStyle = class_V.nc(a.S),
						this.c.strokeStyle = 'black') : (this.c.fillStyle = b.Vj,
						this.c.strokeStyle = b.Eo),
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

			pr(a) {
				if (null != a) {
					var b = 0;
					for (a = a.W; b < a.length;)
						this.nr(a[b++]);
				}
			}

			jr(a, b) {
				if (!(0 > a.S)) {
					this.c.beginPath();
					this.c.strokeStyle = class_V.nc(a.S);
					var c = b[a.fe];
					a = b[a.ge];
					null != c && null != a && (c = c.a,
						a = a.a,
						this.c.moveTo(c.x, c.y),
						this.c.lineTo(a.x, a.y),
						this.c.stroke());
				}
			}

			nr(a) {
				if (a.$a) {
					this.c.beginPath();
					this.c.strokeStyle = class_V.nc(a.S);
					var b = a.Y.a
						,
						c = a.da.a;
					if (0 != 0 * a.vb)
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

			ir(a, b, c) {
				var d = a.M;
				if (null != d)
					for (d = d.ua.H[0],
						     this.Ek(d.a, d.S, b, c),
						     d = 0,
						     a = a.K; d < a.length;) {
						let e = a[d];
						++d;
						null != e.J && this.Ek(e.J.a, e.ea.S, b, c);
					}
			}

			Ek(a, b, c, d) {
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
					this.Fk(d + 2, c + 2, Math.atan2(a, e)),
					this.c.fillStyle = class_V.nc(b),
					this.Fk(d - 2, c - 2, Math.atan2(a, e)));
			}

			Fk(a, b, c) {
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

			vr() {
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

			static Pi(a, b) {
				a.imageSmoothingEnabled = b;
				a.mozImageSmoothingEnabled = b;
			}
		}

		class class_ub {
			static Cp() {
				if (null != class_ub.ti)
					return class_ub.ti;
				class_ub.ti = new Promise(function (a, b) {
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
				return class_ub.ti;
			}
		}

		/** Room */
		class class_ua {
			constructor() {
				this.jc = -1;
				this.T = this.ic = null;
				this.Hd = 2;
				this.fd = 0;
				this.je = 1;
				this.ib = this.Fa = 3;
				this.Vc = false;
				/** @type {class_aa} */
				this.M = null;
				/** @type {class_wa[]} */
				this.K = [];
				this.lc = '';
				/** @type {class_q} */
				this.T = class_q.Oh()[0];
				this.kb = [null, new class_va, new class_va];
				this.kb[1].fb.push(class_u.ga.S);
				this.kb[2].fb.push(class_u.Ca.S);
			}

			Zr(a) {
				if (null == this.M) {
					this.M = new class_aa;
					for (var b = 0, c = this.K; b < c.length;) {
						let d = c[b];
						++b;
						d.J = null;
						d.Lb = 0;
					}
					this.M.qp(this);
					null != this.Ui && this.Ui(a);
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
						this.M.Sk(b);
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
								if (h != b && h.ea == b.ea && h.Lb == d) {
									e = false;
									break;
								}
							}
						}
						b.Lb = d;
					}
					class_kc.i(this.Pl, a, b, c);
				}
			}

			na(a) {
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

			D(a) {
				null != this.M && this.M.D(a);
			}

			fa(a) {
				a.Eb(this.lc);
				a.m(this.Vc ? 1 : 0);
				a.P(this.ib);
				a.P(this.Fa);
				a.gj(this.je);
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
				this.kb[1].fa(a);
				this.kb[2].fa(a);
			}

			ka(a) {
				this.lc = a.Ab();
				this.Vc = 0 != a.F();
				this.ib = a.N();
				this.Fa = a.N();
				this.je = a.vi();
				this.fd = a.F();
				this.Hd = a.F();
				this.T = class_q.ka(a);
				var b = 0 != a.F();
				this.M = null;
				b && (this.M = new class_aa,
					this.M.ka(a, this));
				b = null == this.M ? null : this.M.ua.H;
				let c = a.F();
				for (var d = this.K; d.length > c;)
					d.pop();
				for (d = 0; d < c;) {
					let e = new class_wa;
					e.wa(a, b);
					this.K[d++] = e;
				}
				this.kb[1].ka(a);
				this.kb[2].ka(a);
			}

			Kk() {
				let a = 0;
				var b = class_A.ia();
				this.fa(b);
				for (b = b.hs(); 4 <= b.s.byteLength - b.a;)
					a ^= b.N();
				return a;
			}

			To() {
				let a = class_A.ia(4);
				a.P(this.Kk());
				return a.Sg();
			}

			mo(a) {
				a = (new class_J(new DataView(a))).N();
				class_E.i(this.Do, this.Kk() != a);
			}

			Bm(a) {
				this.gm = a;
			}

			Ob(a) {
				if (0 == a)
					return true;
				a = this.na(a);
				return null != a && a.eb ? true : false;
			}

			Nr(a, b, c, d) {
				this.Hd = 0 > b ? 0 : 255 < b ? 255 : b;
				this.fd = 0 > c ? 0 : 255 < c ? 255 : c;
				0 > d ? d = 0 : 100 < d && (d = 100);
				this.je = this.fd * d;
				class_Wb.i(this.Wk, a, this.Hd, this.fd, d);
			}

			uc() {
				let a = class_ta.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_ua),
					this.jc = a,
					class_ua.zd(b, this));
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
						d[g] = e[g].Os();
					}
				}
				a.M = null == b.M ? null : b.M.uc();
				a.Vc = b.Vc;
				a.ib = b.ib;
				a.Fa = b.Fa;
				a.je = b.je;
				a.fd = b.fd;
				a.Hd = b.Hd;
				a.T = b.T;
				a.kb = b.kb;
			}
		}

		class class_pc {
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
				this.yi();
				this.og.connect(this.c.destination);
				let c = this;
				this.Ko = Promise.all([b('sounds/chat.ogg').then(function (d) {
					return c.dk = d;
				}), b('sounds/highlight.wav').then(function (d) {
					return c.Pk = d;
				}), b('sounds/kick.ogg').then(function (d) {
					return c.wp = d;
				}), b('sounds/goal.ogg').then(function (d) {
					return c.ap = d;
				}), b('sounds/join.ogg').then(function (d) {
					return c.up = d;
				}), b('sounds/leave.ogg').then(function (d) {
					return c.Ap = d;
				}), b('sounds/crowd.ogg').then(function (d) {
					c.Ao = d;
					c.mk = new class_qc(c.Ao, c.c);
					c.mk.connect(c.og);
				})]);
			}

			km() {
				this.c.resume();
			}

			ld(a) {
				let b = this.c.createBufferSource();
				b.buffer = a;
				b.connect(this.og);
				b.start();
			}

			yi() {
				let a = class_n.j.Ri.C();
				class_n.j.ve.C() || (a = 0);
				this.og.gain.value = a;
			}
		}

		class class_jc {
			constructor() {
			}
		}

		class class_va {
			constructor() {
				this.od = 16777215;
				this.fb = [];
			}

			fa(a) {
				a.m(this.sd);
				a.P(this.od);
				a.m(this.fb.length);
				let b = 0
					,
					c = this.fb;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			ka(a) {
				this.sd = a.F();
				this.od = a.N();
				let b = a.F();
				if (3 < b)
					throw class_v.A('too many');
				this.fb = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.fb.push(a.N());
			}
		}

		class class_Xb {
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

		class class_S {
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

		class class_Yb {
			constructor(a) {
				this.Rd = a;
			}
		}

		class class_I {
			constructor() {
				this.Pg = this.Qg = this.xa = null;
				this.nk = 0;
				this.da = this.Y = this.ee = null;
				this.Hc = 0;
				this.o = 1;
				this.h = 63;
				this.w = 32;
				this.vb = 1 / 0;
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
				this.vb != 1 / 0 && (b |= 2,
					a.u(this.vb));
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
				this.vb = 0 != (c & 2) ? a.v() : 1 / 0;
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
				a > class_I.Cn && a < class_I.Bn && (this.vb = 1 / Math.tan(a / 2));
			}

			Vo() {
				return 0 != 0 * this.vb ? 0 : 114.59155902616465 * Math.atan(1 / this.vb);
			}

			oe() {
				if (0 == 0 * this.vb) {
					var a = this.da.a
						,
						b = this.Y.a
						,
						c = .5 * (a.x - b.x);
					a = .5 * (a.y - b.y);
					b = this.Y.a;
					let d = this.vb;
					this.ee = new class_P(b.x + c + -a * d, b.y + a + c * d);
					a = this.Y.a;
					b = this.ee;
					c = a.x - b.x;
					a = a.y - b.y;
					this.nk = Math.sqrt(c * c + a * a);
					c = this.Y.a;
					a = this.ee;
					this.Pg = new class_P(-(c.y - a.y), c.x - a.x);
					c = this.ee;
					a = this.da.a;
					this.Qg = new class_P(-(c.y - a.y), c.x - a.x);
					0 >= this.vb && (a = c = this.Pg,
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

		class class_Zb {
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

		class class_$b {
			constructor(a, b, c, d, e, f) {
				this.th = this.Dh = false;
				this.pa = new class_Za(0, b, d);
				let g = this;
				this.pa.kd = function () {
					g.Ze(ma.Je);
				}
				;
				this.pa.Id = function () {
					null != g.Id && g.Id(new class_Nb(g.pa));
					g.pa = null;
					g.ik();
				}
				;
				this.pa.ki = function (h) {
					g.Ir = h;
					g.Z = new WebSocket(a + 'client?id=' + c + (null == f ? '' : '&token=' + f));
					g.Z.binaryType = 'arraybuffer';
					g.Z.onclose = function (k) {
						g.Dh || g.Ze(ma.Ke(k.code));
					}
					;
					g.Z.onerror = function () {
						g.Dh || g.Ze(ma.Error);
					}
					;
					g.Z.onmessage = function_M(g, g.Th);
					g.Z.onopen = function () {
						null != g.yl && g.yl();
						g.pa.Wi();
						g.Ki(g.Ir, g.pa.hg, e);
						g.pa.vg = function_M(g, g.Hi);
						g.pa.Wh.then(function () {
							g.Tc(0, null);
						});
					};
				}
				;
				this.pa.yo();
			}

			Zn() {
				this.Ze(ma.Ie);
			}

			ik() {
				null != this.Z && (this.Z.onclose = null,
					this.Z.onmessage = null,
					this.Z.onerror = null,
					this.Z.onopen = null,
					this.Z.close(),
					this.Z = null);
				null != this.pa && (this.pa.ja(),
					this.pa = null);
			}

			Ze(a) {
				null != this.kd && this.kd(a);
				this.ik();
			}

			Th(a) {
				var b = new class_J(new DataView(a.data));
				a = b.F();
				0 < b.s.byteLength - b.a && (b = new class_J(new DataView(pako.inflateRaw(b.sb()).buffer), false));
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
				this.pa.Wi(this.th ? 1E4 : 4E3);
				this.Dh = true;
				null != this.ql && this.ql();
				let c = this;
				this.pa.Sa.setRemoteDescription(new RTCSessionDescription({
					sdp: a,
					type: 'answer'
				}), function () {
					let d = 0;
					for (; d < b.length;)
						c.pa.Sa.addIceCandidate(b[d++]);
				}, function () {
					c.Ze(ma.Error);
				});
			}

			Rh(a) {
				this.pa.Sa.addIceCandidate(a);
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

			Ki(a, b, c) {
				let d = class_A.ia(32, false);
				d.m(this.th ? 1 : 0);
				d.oc(a.sdp);
				d.Wg(b);
				null != c && d.Xb(c.Vb());
				this.Tc(1, d);
			}

			Hi(a) {
				let b = class_A.ia(32, false);
				b.Wg(a);
				this.Tc(4, b);
			}

			static Wo(a) {
				switch (a.nb) {
					case 0:
						return 'Failed';
					case 1:
						return class_Hc.description(a.code);
					case 2:
						return '';
					case 3:
						return 'Master connection error';
				}
			}
		}

		class class_U {
			constructor() {
			}

			ks() {
				return 'idkey.' + this.hj + '.' + this.ij + '.' + this.pk;
			}

			Xr(a) {
				try {
					let b = class_A.ia(1024);
					b.m(1);
					let c = b.a;
					b.Wb(0);
					let d = b.a;
					b.oc(this.hj);
					b.oc(this.ij);
					b.Xb(a);
					let e = b.a - d;
					b.s.setUint16(c, e, b.Ta);
					let f = new Uint8Array(b.s.buffer, b.s.byteOffset + d, e);
					return window.crypto.subtle.sign(class_U.Em, this.Sl, f).then(function (g) {
						b.Vg(g);
						return b.Vb();
					});
				}
				catch (b) {
					return Promise.reject(class_v.Kb(b).Fb());
				}
			}

			static Ro() {
				try {
					return window.crypto.subtle.generateKey(class_U.sh, true, ['sign', 'verify']).then(function (a) {
						let b = a.privateKey;
						return window.crypto.subtle.exportKey('jwk', b).then(function (c) {
							let d = c.y
								,
								e = c.d
								,
								f = new class_U;
							f.hj = c.x;
							f.ij = d;
							f.pk = e;
							f.Sl = b;
							return f;
						});
					});
				}
				catch (a) {
					return Promise.reject(class_v.Kb(a).Fb());
				}
			}

			static Qo(a) {
				a = a.split('.');
				if (4 != a.length || 'idkey' != a[0])
					return Promise.reject('Invalid id format');
				let b = a[1]
					,
					c = a[2]
					,
					d = a[3];
				return class_U.Bs(b, c, d).then(function (e) {
					let f = new class_U;
					f.hj = b;
					f.ij = c;
					f.pk = d;
					f.Sl = e;
					return f;
				});
			}

			static vs(a, b) {
				try {
					let c = new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
					c.F();
					let d = c.sb(c.Rb())
						,
						e = c.sb()
						,
						f = new class_J(new DataView(d.buffer, d.byteOffset, d.byteLength), false)
						,
						g = f.kc()
						,
						h = f.kc()
						,
						k = f.sb();
					if (k.byteLength != b.byteLength)
						return Promise.reject(null);
					a = 0;
					let l = k.byteLength;
					for (; a < l;) {
						let m = a++;
						if (k[m] != b[m])
							return Promise.reject(null);
					}
					return class_U.As(g, h).then(function (m) {
						return window.crypto.subtle.verify(class_U.Em, m, e, d);
					}).then(function (m) {
						if (!m)
							throw class_v.A(null);
						return g;
					});
				}
				catch (c) {
					return Promise.reject(class_v.Kb(c).Fb());
				}
			}

			static Bs(a, b, c) {
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
					return Promise.reject(class_v.Kb(d).Fb());
				}
			}

			static As(a, b) {
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
					return Promise.reject(class_v.Kb(c).Fb());
				}
			}
		}

		class class_vb {
			constructor() {
				this.f = class_x.Ha(class_vb.O);
				let a = class_x.Aa(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_E.i(b.pb, false);
				}
				;
				a.get('leave').onclick = function () {
					class_E.i(b.pb, true);
				};
			}
		}

		class class_Za {
			constructor(a, b, c) {
				this.rd = this.ze = null;
				this.xe = [];
				this.rk = 0;
				this.zl = false;
				this.hg = [];
				this.bd = [];
				this.Sa = new RTCPeerConnection({
					iceServers: b
				}, class_Za.so);
				let d = this;
				this.Wh = new Promise(function (e) {
						d.op = e;
					}
				);
				this.Sa.onicecandidate = function (e) {
					null == e.candidate ? d.op(d.hg) : (e = e.candidate,
					null != e.candidate && '' != e.candidate && (null != d.vg && d.vg(e),
						d.hg.push(e)));
				}
				;
				for (b = 0; b < c.length;)
					this.xo(c[b++]);
				this.aa = a;
			}

			Wi(a) {
				null == a && (a = 1E4);
				window.clearTimeout(this.ze);
				this.ze = window.setTimeout(function_M(this, this.mp), a);
			}

			wo(a, b) {
				let c = this;
				this.tk(this.Sa.setRemoteDescription(a).then(function () {
					return c.Sa.createAnswer();
				}), b, 500);
			}

			yo() {
				this.tk(this.Sa.createOffer(), [], 1E3);
			}

			tk(a, b, c) {
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
						d.Lj(b[g++]);
					return class_Ic.es(d.Wh, c).then(f, f);
				}).then(function (e) {
					d.ki(e);
				}).catch(function () {
					d.fg();
				});
			}

			xo(a) {
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

			Lj(a) {
				let b = this;
				window.setTimeout(function () {
					b.Sa.addIceCandidate(a);
				}, this.rk);
			}

			mp() {
				this.fg();
			}

			fg() {
				null != this.kd && this.kd();
				this.ja();
			}

			ja() {
				this.hk();
				this.Sa.close();
			}

			hk() {
				window.clearTimeout(this.ze);
				this.ki = this.Id = this.vg = this.kd = null;
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

		class class_wb {
			constructor(a) {
				this.f = class_x.Ha(class_wb.O);
				var b = class_x.Aa(this.f);
				this.yh = b.get('cancel');
				this.lk = b.get('create');
				this.lf = b.get('name');
				this.Cl = b.get('pass');
				this.hi = b.get('max-pl');
				this.Vm = b.get('unlisted');
				this.lf.maxLength = 40;
				this.lf.value = a;
				let c = this;
				this.lf.oninput = function () {
					c.D();
				}
				;
				this.Cl.maxLength = 30;
				this.Vm.onclick = function () {
					c.Sj(!c.Wm);
				}
				;
				this.yh.onclick = function () {
					class_H.i(c.ji);
				}
				;
				this.lk.onclick = function () {
					if (c.Ic()) {
						let d = c.Cl.value;
						'' == d && (d = null);
						class_E.i(c.gq, {
							name: c.lf.value,
							password: d,
							Ws: c.hi.selectedIndex + 2,
							nt: c.Wm
						});
					}
				}
				;
				for (a = 2; 21 > a;)
					b = window.document.createElement('option'),
						b.textContent = '' + a++,
						this.hi.appendChild(b);
				this.hi.selectedIndex = 10;
				this.Sj(false);
				this.D();
			}

			Sj(a) {
				this.Wm = a;
				this.Vm.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes');
			}

			Ic() {
				let a = this.lf.value;
				return 40 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.lk.disabled = !this.Ic();
			}
		}

		class class_Qb {
			constructor(a, b) {
				this.ya = a;
				this.ca = b;
			}

			tf(a) {
				if ('/' != a.charAt(0))
					return false;
				if (1 == a.length)
					return true;
				a = class_Y.kt(class_O.substr(a, 1, null)).split(' ');
				let b = a[0]
					,
					c = this;
				switch (b) {
					case 'avatar':
						2 == a.length && (this.xm(a[1]),
							this.ca('Avatar set'));
						break;
					case 'checksum':
						var d = this.ya.U.T;
						a = d.B;
						d.$e() ? this.ca('Current stadium is original: "' + a + '"') : (d = class_Y.eh(d.gk(), 8),
							this.ca('Stadium: "' + a + '" (checksum: ' + d + ')'));
						break;
					case 'clear_avatar':
						this.xm(null);
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
							d = class_Qb.Bq(a),
								this.ya.ra(d);
						}
						catch (g) {
							a = class_v.Kb(g).Fb(),
							'string' == typeof a && this.ca(a);
						}
						break;
					case 'extrapolation':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && -200 <= a && 1E3 >= a ? (class_n.j.Ad.sa(a),
								this.ya.ym(a),
								this.ca('Extrapolation set to ' + a + ' msec')) : this.ca('Extrapolation must be a value between -200 and 50 milliseconds')) : this.ca('Extrapolation requires a value in milliseconds.');
						break;
					case 'handicap':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && 0 <= a && 300 >= a ? (this.ya.Lr(a),
								this.ca('Ping handicap set to ' + a + ' msec')) : this.ca('Ping handicap must be a value between 0 and 300 milliseconds')) : this.ca('Ping handicap requires a value in milliseconds.');
						break;
					case 'kick_ratelimit':
						if (4 > a.length)
							this.ca('Usage: /kick_ratelimit <min> <rate> <burst>');
						else {
							d = class_Q.parseInt(a[1]);
							var e = class_Q.parseInt(a[2]);
							a = class_Q.parseInt(a[3]);
							null == d || null == e || null == a ? this.ca('Invalid arguments') : this.ya.ra(class_Ia.ma(d, e, a));
						}
						break;
					case 'recaptcha':
						if (null == this.Am)
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
											throw class_v.A(null);
									}
									this.Am(e);
									this.ca('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
								}
								else
									throw class_v.A(null);
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
						f.$e() ? this.ca('Can\'t store default stadium.') : class_xb.it().then(function () {
							return class_xb.add(f);
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

			xm(a) {
				null != a && (a = class_ha.Xc(a, 2));
				class_n.j.uh.sa(a);
				this.ya.ra(class_Ja.ma(a));
			}

			static Bq(a) {
				if (3 > a.length)
					throw class_v.A('Not enough arguments');
				if (7 < a.length)
					throw class_v.A('Too many arguments');
				let b = new class_$a
					,
					c = new class_va;
				b.ah = c;
				switch (a[1]) {
					case 'blue':
						c.fb = [class_u.Ca.S];
						b.ea = class_u.Ca;
						break;
					case 'red':
						c.fb = [class_u.ga.S];
						b.ea = class_u.ga;
						break;
					default:
						throw class_v.A('First argument must be either "red" or "blue"');
				}
				if ('clear' == a[2])
					return b;
				c.sd = 256 * class_Q.parseInt(a[2]) / 360 | 0;
				c.od = class_Q.parseInt('0x' + a[3]);
				if (4 < a.length) {
					c.fb = [];
					let d = 4
						,
						e = a.length;
					for (; d < e;)
						c.fb.push(class_Q.parseInt('0x' + a[d++]));
				}
				return b;
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

		class class_rc {
			constructor(a) {
				this.gd = window.performance.now();
				this.Bd = this.Oe = 0;
				this.ya = a;
				this.l = new class_qa(a.xc);
				let b = new class_Rb(this.l);
				b.zi(a.U);
				window.document.addEventListener('keydown', function_M(this, this.qb));
				window.document.addEventListener('keyup', function_M(this, this.Kd));
				window.requestAnimationFrame(function_M(this, this.nf));
				let c = this;
				this.Lh = window.setInterval(function () {
					c.l.Ff.zm(c.Bd);
					c.Bd = 0;
				}, 1E3);
				this.Cm(class_n.j.Ac.C());
				this.l.f.classList.add('replayer');
				this.qe = new class_Ka(a);
				this.qe.tq = function () {
					b.ps(a.U);
				}
				;
				this.qe.sq = function () {
					c.l.ue(null == a.U.M);
					b.zi(a.U);
				}
				;
				this.qe.wl = function () {
					c.l.gb.Nb.vr();
				}
				;
				this.l.f.appendChild(this.qe.f);
			}

			ja() {
				window.document.removeEventListener('keydown', function_M(this, this.qb));
				window.document.removeEventListener('keyup', function_M(this, this.Kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Oe);
				window.clearInterval(this.Lh);
			}

			nf() {
				this.Oe = window.requestAnimationFrame(function_M(this, this.nf));
				this.ya.D();
				this.Qc();
			}

			Qc() {
				this.qe.D();
				let a = window.performance.now();
				1 == class_n.j.Kh.C() && 28.333333333333336 > a - this.gd || (this.gd = a,
					this.Bd++,
					this.Cm(class_n.j.Ac.C()),
				0 < this.ya.Pd || this.l.D(this.ya));
			}

			qb(a) {
				switch (a.keyCode) {
					case 27:
						let b = this.l;
						b.ue(!b.nd);
						a.preventDefault();
						break;
					case 48:
						class_n.j.Ac.sa(0.1);
						break;
					case 49:
						class_n.j.Ac.sa(1);
						break;
					case 50:
						class_n.j.Ac.sa(2);
						break;
					case 51:
						class_n.j.Ac.sa(3);
						break;
					case 52:
						class_n.j.Ac.sa(4);
						break;
					case 53:
						class_n.j.Ac.sa(5);
						break;
					case 54:
						class_n.j.Ac.sa(6);
						break;
					case 55:
						class_n.j.Ac.sa(7);
						break;
					case 56:
						class_n.j.Ac.sa(15);
						break;
					case 57:
						class_n.j.Ac.sa(-1.5);
						break;
				}
			}

			Cm() {
				let a = class_n.j.Ac.C()
					,
					b = this.l.gb.Nb;
				b.re = class_n.j.Ei.C();
				b.Tg = 35;
				// Modified zoom
				b.Md = 0;
				b.Gg = 1 + .25 * (a - 1);
			}

			Kd() {
			}
		}

		class class_sc {
			constructor() {
				this.Fh = 0;
				this.Rp = 400;
				this.Ok = 64;
				this.ej = 32;
				this.ta = window.document.createElement('canvas');
				this.cg = window.document.createElement('canvas');
				this.f = window.document.createElement('div');
				this.cg.width = this.ta.width = this.ej;
				this.cg.height = this.ta.height = this.Ok;
				this.Jh = this.cg.getContext('2d', null);
				this.c = this.ta.getContext('2d', null);
				this.c.fillStyle = 'green';
				let a = []
					,
					b = 0
					,
					c = this.ej;
				for (; b < c;)
					++b,
						a.push(0);
				this.Dq = a;
				this.f.appendChild(this.cg);
				this.f.className = 'graph';
				this.f.hidden = true;
			}

			Kn(a) {
				this.f.hidden = false;
				0 > a ? (a = 150,
					this.c.fillStyle = '#c13535') : this.c.fillStyle = '#32FF32';
				let b = this.ej
					,
					c = this.Ok
					,
					d = this.Fh++;
				this.Fh >= b && (this.Fh = 0);
				this.Dq[d] = a;
				this.c.clearRect(d, 0, 1, c);
				a = a * c / this.Rp;
				this.c.fillRect(d, c - a, 1, a);
				this.Jh.clearRect(0, 0, b, c);
				this.Jh.drawImage(this.ta, b - d - 1, 0);
				this.Jh.drawImage(this.ta, -d - 1, 0);
			}
		}

		class class_yb {
			constructor(a, b, c, d) {
				this.vh = new Set;
				this.Uf = new Set;
				this.Kg = this.yf = this.vm = false;
				this.Sc = null;
				this.Bf = this.aa = '';
				this.yr = 5E4;
				this.xr = 1E4;
				this.xd = new Map;
				this.Yr = a;
				this.ig = b;
				this.ao = c;
				this.Bf = d;
				null == this.Bf && (this.Bf = '');
				this.Ti();
			}

			ja() {
				window.clearTimeout(this.lm);
				window.clearTimeout(this.se);
				this.se = null;
				window.clearInterval(this.Gl);
				this.Z.onmessage = null;
				this.Z.onerror = null;
				this.Z.onclose = null;
				this.Z.onopen = null;
				this.Z.close();
				this.Z = null;
				this.Gk();
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
					this.Kg = true;
					var b = this;
					null != this.Z && 1 == this.Z.readyState && null == this.se && (this.Ji(),
						this.se = window.setTimeout(function () {
							b.se = null;
							1 == b.Z.readyState && b.Kg && b.Ji();
						}, 1E4));
				}
			}

			Ni(a) {
				function b() {
					null != c.Z && 1 == c.Z.readyState && c.yf != c.vm && c.um();
					c.im = null;
				}

				this.yf = a;
				let c = this;
				null == this.im && (b(),
					this.im = window.setTimeout(b, 1E3));
			}

			Ti(a) {
				function b(e) {
					e = e.sitekey;
					if (null == e)
						throw class_v.A(null);
					null != d.rf && d.rf(e, function (f) {
						d.Ti(f);
					});
				}

				function c(e) {
					let f = e.url;
					if (null == f)
						throw class_v.A(null);
					e = e.token;
					if (null == e)
						throw class_v.A(null);
					d.Z = new WebSocket(f + '?token=' + e);
					d.Z.binaryType = 'arraybuffer';
					d.Z.onopen = function () {
						d.lp();
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
				class_Z.Rl(this.Yr, 'token=' + this.Bf + '&rcr=' + a, class_Z.Fj).then(function (e) {
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

			lp() {
				null != this.Sc && this.Ji();
				0 != this.yf && this.um();
				let a = this;
				this.Gl = window.setInterval(function () {
					a.Ii();
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
						this.gp(a);
						break;
					case 6:
						this.jp(a);
				}
			}

			Sh(a) {
				let b = a.hb(),
					c = class_ha.Es(a.sb(a.F())),
					d,
					e,
					f;
				try {
					a = new class_J(new DataView(pako.inflateRaw(a.sb()).buffer), false);
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
				this.kp(b, c, e, f, a, d);
			}

			kp(a, b, c, d, e, f) {
				if (16 <= this.xd.size)
					this.Df(a, 4104);
				else if (this.vh.has(b))
					this.Df(a, 4102);
				else {
					for (var g = [], h = 0; h < d.length;) {
						let m = class_yb.Lk(d[h++]);
						if (null != m) {
							if (this.Uf.has(m)) {
								this.Df(a, 4102);
								return;
							}
							g.push(m);
						}
					}
					if (null != this.kk && (h = new class_J(e.s),
						h.a = e.a,
						e = this.kk(b, h),
					1 == e.nb)) {
						this.Df(a, e.reason);
						return;
					}
					var k = new class_Za(a, this.ig, this.ao);
					f && (k.rk = 2500);
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
						null != l.tl && l.tl(new class_Nb(k));
					}
					;
					k.ki = function (m) {
						l.Ki(k, m, k.hg, null);
						k.Wh.then(function () {
							l.Tc(0, k, null);
						});
						k.vg = function (r) {
							l.Hi(k, r);
						};
					}
					;
					k.Wi();
					k.wo(new RTCSessionDescription({
						sdp: c,
						type: 'offer'
					}), d);
				}
			}

			Rh(a) {
				let b = a.hb(),
					c;
				try {
					a = new class_J(new DataView(pako.inflateRaw(a.sb()).buffer), false),
						c = new RTCIceCandidate(a.Hg());
				}
				catch (d) {
					return;
				}
				this.fp(b, c);
			}

			fp(a, b) {
				a = this.xd.get(a);
				if (null != a) {
					let c = class_yb.Lk(b);
					if (null != c && (a.xe.push(c),
						this.Uf.has(c)))
						return;
					a.Lj(b);
				}
			}

			gp(a) {
				this.aa = a.pe(a.F());
				null != this.wg && this.wg(this.aa);
			}

			jp(a) {
				this.Bf = a.pe(a.s.byteLength - a.a);
			}

			Tc(a, b, c) {
				if (!b.zl) {
					0 == a && (b.zl = true);
					var d = b.aa;
					b = class_A.ia(32, false);
					b.m(a);
					b.tb(d);
					null != c && (a = pako.deflateRaw(c.Vb()),
						b.Xb(a));
					this.Z.send(b.Qd());
				}
			}

			Df(a, b) {
				let c = class_A.ia(16, false);
				c.m(0);
				c.tb(a);
				c.Wb(b);
				this.Z.send(c.Qd());
			}

			Ii() {
				let a = class_A.ia(1, false);
				a.m(8);
				this.Z.send(a.Qd());
			}

			Ji() {
				this.Kg = false;
				let a = class_A.ia(256, false);
				a.m(7);
				null != this.Sc && a.Vg(this.Sc);
				this.Z.send(a.Qd());
			}

			um() {
				let a = class_A.ia(2, false);
				a.m(9);
				a.m(this.yf ? 1 : 0);
				this.Z.send(a.Qd());
				this.vm = this.yf;
			}

			Ki(a, b, c, d) {
				let e = class_A.ia(32, false);
				e.oc(b.sdp);
				e.Wg(c);
				null != d && e.Xb(d.Vb());
				this.Tc(1, a, e);
			}

			Hi(a, b) {
				let c = class_A.ia(32, false);
				c.Wg(b);
				this.Tc(4, a, c);
			}

			Gk() {
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
				this.Gk();
				window.clearTimeout(this.se);
				this.se = null;
				this.Kg = false;
				window.clearInterval(this.Gl);
				window.clearTimeout(this.lm);
				let b = this;
				a && (this.lm = window.setTimeout(function () {
					b.Ti();
				}, this.xr + Math.random() * this.yr | 0));
			}

			Qn(a) {
				let b = 0
					,
					c = a.xe;
				for (; b < c.length;)
					this.Uf.add(c[b++]);
				null != a.rd && this.vh.add(a.rd);
				return {
					ut: a.xe,
					st: a.rd
				};
			}

			be() {
				this.Uf.clear();
				this.vh.clear();
			}

			static Lk(a) {
				try {
					let b = class_Jc.tf(a.candidate);
					if ('srflx' == b.ns)
						return b.rp;
				}
				catch (b) {
				}
				return null;
			}
		}

		class class_Vb {
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

		class class_zb {
			constructor(a) {
				this.Ja = class_x.Ha(class_zb.Bj, 'tbody');
				var b = class_x.Aa(this.Ja);
				let c = b.get('name')
					,
					d = b.get('players')
					,
					e = b.get('distance')
					,
					f = b.get('pass');
				b = b.get('flag');
				this.jt = a;
				let g = a.Ed;
				c.textContent = g.B;
				d.textContent = '' + g.K + '/' + g.hf;
				f.textContent = g.Jb ? 'Yes' : 'No';
				e.textContent = '' + (a.We | 0) + 'km';
				try {
					b.classList.add('f-' + g.ub.toLowerCase());
				}
				catch (h) {
				}
				9 > a.Ed.Rd && this.Ja.classList.add('old');
			}
		}

		class class_Sb {
			static zr(a, b) {
				class_Sb.om(new Blob([a], {
					type: 'octet/stream'
				}), b);
			}

			static Ar(a, b) {
				class_Sb.om(new Blob([a], {
					type: 'text/plain'
				}), b);
			}

			static om(a, b) {
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

		class class_hc {
			constructor() {
				this.Pc = new Set;
				this.lg = 0;
				window.document.addEventListener('focusout', function_M(this, this.sl));
			}

			ja() {
				window.document.removeEventListener('focusout', function_M(this, this.sl));
			}

			D() {
				let a = 0;
				this.Pc.has('Up') && (a = 1);
				this.Pc.has('Down') && (a |= 2);
				this.Pc.has('Left') && (a |= 4);
				this.Pc.has('Right') && (a |= 8);
				this.Pc.has('Kick') && (a |= 16);
				// After removing this check, it can work in the background, however it will always trigger onPlayerActivity
				if (null != this.zg/* && a != this.lg*/) {
					this.lg = a;
					let b = new class_La;
					//b.input = a;
					b.input = (a | window.parent.g.emulatedInput);
					this.zg(b);
				}
			}

			qb(a) {
				var b = a.code;
				b = class_n.j.me.C().C(b);
				null != b && (a.preventDefault(),
					this.iq(b));
			}

			Kd(a) {
				a = class_n.j.me.C().C(a.code);
				null != a && this.Yp(a);
			}

			iq(a) {
				this.Pc.has(a) || (this.Pc.add(a),
					class_E.i(this.Xp, a));
			}

			Yp(a) {
				this.Pc.delete(a);
			}

			sl() {
				if (null != this.zg && 0 != this.lg) {
					this.Pc.clear();
					this.lg = 0;
					let a = new class_La;
					a.input = 0;
					this.zg(a);
				}
			}
		}

		/** Dynamic disc */
		class class_sa {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Bl = 0;
				this.h = this.w = 63;
				this.Zj = 0;
				this.S = 16777215;
				this.Da = .99;
				this.ba = 1;
				this.o = .5;
				this.V = 10;
				this.oa = new class_P(0, 0);
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
				b = this.oa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.V);
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Da);
				a.tb(this.S);
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
				b = this.oa;
				b.x = a.v();
				b.y = a.v();
				this.V = a.v();
				this.o = a.v();
				this.ba = a.v();
				this.Da = a.v();
				this.S = a.hb();
				this.h = a.N();
				this.w = a.N();
			}

			jo(a) {
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

			ko(a) {
				if (0 != 0 * a.vb) {
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
					if ((0 < g.x * b + g.y * d && 0 < c.x * b + c.y * d) == 0 >= a.vb)
						return;
					c = Math.sqrt(b * b + d * d);
					if (0 == c)
						return;
					g = c - a.nk;
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
				let a = class_ta.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_sa),
					this.jc = a,
					class_sa.zd(b, this));
				return b;
			}

			static zd(a, b) {
				a.V = b.V;
				a.o = b.o;
				a.ba = b.ba;
				a.Da = b.Da;
				a.S = b.S;
				a.Zj = b.Zj;
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
				a = a.oa;
				b = b.oa;
				a.x = b.x;
				a.y = b.y;
			}
		}

		class class_n {
		}

		class class_ab {
			constructor(a, b) {
				this.f = class_x.Ha(class_ab.O);
				let c = class_x.Aa(this.f);
				this.Wp = c.get('ok');
				let d = this;
				this.Wp.onclick = function () {
					class_H.i(d.Va);
				}
				;
				this.fm = c.get('replay');
				let e = null != b;
				this.fm.hidden = !e;
				e && (this.fm.onclick = function () {
						class_Aa.pm(b);
					}
				);
				c.get('reason').textContent = a;
			}
		}

		class class_Bc {
			static cn(a) {
				let b = [];
				if (null != a) {
					let d = Object.prototype.hasOwnProperty;
					for (var c in a)
						'__id__' != c && 'hx__closures__' != c && d.call(a, c) && b.push(c);
				}
				return b;
			}
		}

		class class_Cc {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_tc {
		}

		class class_Dc {
			static tf(a) {
				let b = new class_uc('([^&=]+)=?([^&]*)', 'g');
				a = a.substring(1);
				var c = 0;
				let d = new Map;
				for (; b.Us(a, c);) {
					c = b.nn(1);
					c = decodeURIComponent(c.split('+').join(' '));
					let e = b.nn(2);
					d.set(c, decodeURIComponent(e.split('+').join(' ')));
					c = b.Vs();
					c = c.vj + c.Ss;
				}
				return d;
			}

			static C() {
				return class_Dc.tf(window.top.location.search);
			}
		}

		class class_kc {
			static i(a, b, c, d) {
				null != a && a(b, c, d);
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

		class class_Ab {
			constructor(a) {
				this.ll = a.get('notice');
				this.uo = a.get('notice-contents');
				this.wd = a.get('notice-close');
				this.am();
			}

			am() {
				let a = this;
				class_Z.Jk(class_n.Pe + 'api/notice').then(function (b) {
					let c = b.content;
					null != c && '' != c && class_Ab.io != c && (a.uo.innerHTML = c,
							a.ll.hidden = false,
							a.wd.onclick = function () {
								class_Ab.io = c;
								return a.ll.hidden = true;
							}
					);
				});
			}
		}

		class class_Ec {
			static fn() {
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

		class class_C {
			static Qs() {
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

			static pj(a) {
				class_C.Qs() && class_C.Ks(function () {
					class_Kc.pj();
					let b = null == class_n.j.Xe.C() ? class_na.Yo().then(function (d) {
							class_n.j.Xe.sa(d);
						}, function () {
						}) : Promise.resolve(null)
						,
						c = class_Z.C(window.parent._gdir + 'res.dat', 'arraybuffer').then(function (d) {
							d = new JSZip(d);
							class_n.Na = new class_pc(d);
							return Promise.all([class_n.Na.Ko, class_C.fh(d.file('images/grass.png').asArrayBuffer()).then(function (e) {
								return class_n.cp = e;
							}), class_C.fh(d.file('images/concrete.png').asArrayBuffer()).then(function (e) {
								return class_n.po = e;
							}), class_C.fh(d.file('images/concrete2.png').asArrayBuffer()).then(function (e) {
								return class_n.no = e;
							}), class_C.fh(d.file('images/typing.png').asArrayBuffer()).then(function (e) {
								return class_n.Um = e;
							})]);
						});
					Promise.all([c, b]).then(function () {
						class_C.Zs(a);
					});
				});
			}

			static Ks(a) {
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
					a = new class_lb(d),
					class_C.La(a.f)) : a();
			}

			static Zs(a) {
				window.document.body.innerHTML = '';
				class_C.Yg = window.document.createElement('div');
				window.document.body.appendChild(class_C.Yg);
				let b = null;
				b = function () {
					class_n.Na.km();
					window.document.removeEventListener('click', b, true);
				}
				;
				window.document.addEventListener('click', b, true);
				a();
			}

			static La(a) {
				null != class_C.mn && class_C.mn.remove();
				null != a && (class_C.Yg.appendChild(a),
					class_C.mn = a);
			}
		}

		class class_ea {
			constructor(a, b) {
				let c = []
					,
					d = 0;
				for (; d < a.length;)
					c.push(this.Op(a[d++], b));
				this.gf = c;
			}

			So() {
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
					let h = class_ea.zn.eval(f)
						,
						k = 35 * -(this.gf.length - 1) + 70 * c;
					f = 180 * class_ea.An.eval(f);
					a.globalAlpha = h;
					a.drawImage(g, f * (0 != (c & 1) ? -1 : 1) - .5 * g.width, k - .5 * g.height);
					a.globalAlpha = 1;
					++c;
				}
				a.imageSmoothingEnabled = false;
			}

			rr(a) {
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

			Op(a, b) {
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

		class class_Bb {
			constructor() {
				this.jb = null;
				this.f = class_x.Ha(class_Bb.O);
				let a = class_x.Aa(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.ji);
				}
				;
				this.oi = a.get('pick');
				this.sk = a.get('delete');
				this.Hk = a.get('export');
				let c = a.get('list')
					,
					d = a.get('file');
				this.Ug();
				this.oi.onclick = function () {
					null != b.jb && b.jb.Xd().then(function (e) {
						class_E.i(b.Ag, e);
					});
				}
				;
				this.sk.onclick = function () {
					if (null != b.jb) {
						var e = b.jb.bn;
						null != e && (b.jb.Ja.remove(),
							b.jb = null,
							e(),
							b.Ug());
					}
				}
				;
				this.Hk.onclick = function () {
					null != b.jb && b.jb.Xd().then(function (e) {
						class_Sb.Ar(e.Ae(), e.B + '.hbs');
					});
				}
				;
				this.si(c);
				this.Ul = class_Cb.ei(c);
				window.setTimeout(function () {
					b.Ul.update();
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
								h.$k(g);
								class_E.i(b.Ag, h);
							}
							catch (h) {
								g = class_v.Kb(h).Fb(),
									g instanceof SyntaxError ? class_E.i(b.mi, 'SyntaxError in line: ' + class_Q.Fe(g.lineNumber)) : g instanceof class_Ya ? class_E.i(b.mi, g.Sp) : class_E.i(b.mi, 'Error loading stadium file.');
							}
						}
						;
						f.readAsText(e);
					}
				};
			}

			Ug() {
				this.oi.disabled = null == this.jb;
				this.sk.disabled = null == this.jb || null == this.jb.bn;
				this.Hk.disabled = null == this.jb;
			}

			gl(a, b, c) {
				let d = window.document.createElement('div');
				d.textContent = a;
				d.className = 'elem';
				null != c && d.classList.add('custom');
				let e = {
						Ja: d,
						Xd: b,
						bn: c
					}
					,
					f = this;
				d.onclick = function () {
					null != f.jb && f.jb.Ja.classList.remove('selected');
					f.jb = e;
					d.classList.add('selected');
					f.Ug();
				}
				;
				d.ondblclick = function () {
					f.jb = e;
					f.Ug();
					return f.oi.onclick();
				}
				;
				return d;
			}

			si(a) {
				let b = class_q.Oh()
					,
					c = 0;
				for (; c < b.length;) {
					let e = b[c];
					++c;
					a.appendChild(this.gl(e.B, function () {
						return Promise.resolve(e);
					}, null));
				}
				let d = this;
				class_xb.getAll().then(function (e) {
					let f = 0;
					for (; f < e.length;) {
						let g = e[f];
						++f;
						let h = g.id;
						a.appendChild(d.gl(g.name, function () {
							return class_xb.get(h);
						}, function () {
							return class_xb.delete(h);
						}));
					}
					d.Ul.update();
				});
			}
		}

		class class_xa {
			constructor(a, b, c, d) {
				this.B = a;
				this.ys = d;
				this.di = b;
				d = null;
				null != b && (d = b.getItem(a));
				this.Zm = c(d);
			}

			C() {
				return this.Zm;
			}

			sa(a) {
				this.Zm = a;
				if (null != this.di)
					try {
						let b = this.ys(a);
						null == b ? this.di.removeItem(this.B) : this.di.setItem(this.B, b);
					}
					catch (b) {
					}
			}
		}

		class class_tb {
			constructor() {
				this.kg = false;
				this.B = '';
				this.wh = 0;
				this.Vf = '';
				this.kb = new class_va;
				let a = window.document.createElement('canvas');
				a.width = 64;
				a.height = 64;
				this.rb = a.getContext('2d', null);
				this.Vj = this.rb.createPattern(this.rb.canvas, 'no-repeat');
				this.zo();
			}

			zo() {
				let a = window.document.createElement('canvas');
				a.width = 160;
				a.height = 34;
				this.Nl = a.getContext('2d', null);
			}

			ss() {
				let a = this.Nl;
				a.resetTransform();
				a.clearRect(0, 0, 160, 34);
				a.font = '26px sans-serif';
				a.fillStyle = 'white';
				160 < a.measureText(this.B).width ? (a.textAlign = 'left',
					a.translate(2, 29)) : (a.textAlign = 'center',
					a.translate(80, 29));
				a.fillText(this.B, 0, 0);
			}

			Lo(a, b, c) {
				a.drawImage(this.Nl.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17);
			}

			D(a, b) {
				if (null != a.J) {
					let c = class_n.j.Om.C() ? b.kb[a.ea.aa] : a.ea.Nm
						,
						d = null != a.Sd ? a.Sd : a.Zb
						,
						e = class_n.j.Dm.C() && null != d;
					if (!class_tb.eo(this.kb, c) || !e && a.Lb != this.wh || e && this.Vf != d)
						class_tb.vo(this.kb, c),
							e ? (this.Vf = d,
								this.wh = -1) : (this.Vf = '' + a.Lb,
								this.wh = a.Lb),
							this.er(this.Vf);
				}
				this.Eo = 0 < b.M.Qa || !a.Yb ? 'black' : a.Yb && 0 >= a.Zc && 0 <= a.Bc ? 'white' : 'black';
				a.B != this.B && (this.B = a.B,
					this.ss());
			}

			er(a) {
				let b = this.kb.fb;
				if (!(1 > b.length)) {
					this.rb.save();
					this.rb.translate(32, 32);
					this.rb.rotate(3.141592653589793 * this.kb.sd / 128);
					for (var c = -32, d = 64 / b.length, e = 0; e < b.length;)
						this.rb.fillStyle = class_V.nc(b[e++]),
							this.rb.fillRect(c, -32, d + 4, 64),
							c += d;
					this.rb.restore();
					this.rb.fillStyle = class_V.nc(this.kb.od);
					this.rb.textAlign = 'center';
					this.rb.textBaseline = 'alphabetic';
					this.rb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
					this.rb.fillText(a, 32, 44);
					this.Vj = this.rb.createPattern(this.rb.canvas, 'no-repeat');
				}
			}

			static eo(a, b) {
				if (a.sd != b.sd || a.od != b.od)
					return false;
				a = a.fb;
				b = b.fb;
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

			static vo(a, b) {
				a.sd = b.sd;
				a.od = b.od;
				a.fb = b.fb.slice(0);
			}
		}

		class class_bb {
			constructor(a) {
				function b(g, h) {
					function k() {
						l.className = m.He ? 'icon-ok' : 'icon-cancel';
					}

					g = c.get(g);
					let l = g.querySelector('i')
						,
						m = {
							He: h
						};
					k();
					g.onclick = function () {
						m.He = !m.He;
						k();
						e.tn(e.nj);
					}
					;
					return m;
				}

				this.nj = [];
				this.Ns = a;
				this.Ja = class_x.Ha(class_bb.Bj);
				let c = class_x.Aa(this.Ja)
					,
					d = new class_Ab(c);
				this.xj = c.get('refresh');
				this.kn = c.get('join');
				a = c.get('create');
				this.Is = c.get('count');
				let e = this;
				a.onclick = function () {
					class_H.i(e.at);
				}
				;
				c.get('changenick').onclick = function () {
					class_H.i(e.$s);
				}
				;
				c.get('settings').onclick = function () {
					class_H.i(e.ct);
				}
				;
				let f = c.get('replayfile');
				f.onchange = function () {
					var g = f.files;
					if (!(1 > g.length)) {
						g = g.item(0);
						var h = new FileReader;
						h.onload = function () {
							class_E.i(e.bt, h.result);
						}
						;
						h.readAsArrayBuffer(g);
					}
				}
				;
				this.Ms = b('fil-full', true);
				this.dt = b('fil-pass', false); // Hide locked rooms
				this.Ls = b('fil-empty', true);
				this.Ts = c.get('listscroll');
				this.ft = class_Cb.ei(this.Ts);
				this.qj = c.get('list');
				this.xj.onclick = function () {
					d.am();
					e.en();
				}
				;
				this.kn.onclick = function () {
					null != e.Wd && class_E.i(e.pn, e.Wd.jt);
				}
				;
				this.en();
			}

			en() {
				function a() {
					d.xj.disabled = false;
					d.tn(b);
					return null;
				}

				this.wn(null);
				this.xj.disabled = true;
				class_x.Mf(this.qj);
				let b = [];
				this.nj = [];
				let c = class_Tb.get().then(function (e) {
						return b = e;
					}, function () {
						return null;
					})
					,
					d = this;
				class_bb.et(c).then(a, a);
			}

			tn(a) {
				this.nj = a;
				class_Tb.lt(this.Ns, a);
				a.sort(function (k, l) {
					return k.We - l.We;
				});
				class_x.Mf(this.qj);
				let b = 0
					,
					c = 0
					,
					d = !this.Ms.He
					,
					e = !this.dt.He
					,
					f = !this.Ls.He
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
					if (e && l.Jb)
						continue;
					if (f && 0 == l.K)
						continue;
					let m = new class_zb(k);
					m.Ja.ondblclick = function () {
						class_E.i(g.pn, k);
					}
					;
					m.Ja.onclick = function () {
						g.wn(m);
					}
					;
					this.qj.appendChild(m.Ja);
					b += l.K;
					++c;
				}
				this.Is.textContent = '' + b + ' players in ' + c + ' rooms';
				this.ft.update();
			}

			wn(a) {
				null != this.Wd && this.Wd.Ja.classList.remove('selected');
				this.Wd = a;
				null != this.Wd && this.Wd.Ja.classList.add('selected');
				this.kn.disabled = null == this.Wd;
			}

			static et(a) {
				let b = new Promise(function (c, d) {
						window.setTimeout(function () {
							d(null);
						}, 5E3);
					}
				);
				return Promise.race([b, a]);
			}
		}

		class class_qa {
			constructor(a) {
				this.nl = this.ml = this.pl = null;
				this.gb = new class_rb;
				this.nd = false;
				this.Ff = new class_Db;
				this.Oa = new class_cb;
				this.Wa = new class_qb(a);
				this.gb.Qb = a;
				this.f = class_x.Ha(class_qa.O);
				a = class_x.Aa(this.f);
				this.ms = a.get('top-section');
				this.uf = a.get('popups');
				this.uf.style.display = 'none';
				a.get('gameplay').appendChild(this.gb.f);
				class_x.replaceWith(a.get('chatbox'), this.Oa.f);
				class_x.replaceWith(a.get('stats'), this.Ff.f);
				this.ii = a.get('menu');
				let b = this;
				this.ii.onclick = function () {
					b.ue(!b.nd);
					b.ii.blur();
				}
				;
				new class_vc(a.get('sound'));
				a.get('settings').onclick = function () {
					let c = new class_la;
					c.pb = function () {
						b.cb(null);
					}
					;
					b.cb(c.f);
				}
				;
				this.Wa.ke = function () {
					let c = new class_vb;
					c.pb = function (d) {
						b.cb(null);
						d && class_H.i(b.ke);
					}
					;
					b.cb(c.f);
				}
				;
				this.Wa.vq = function () {
					let c = new class_Bb;
					c.ji = function () {
						b.cb(null);
					}
					;
					c.Ag = function (d) {
						class_E.i(b.Ag, d);
						b.cb(null);
					}
					;
					c.mi = function (d) {
						d = new class_ba('Error loading stadium', d, ['Ok']);
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

			Kr(a) {
				this.nl != a && (this.nl = a,
					this.f.style.setProperty('--chat-opacity', '' + a));
			}

			Jr(a) {
				this.ml != a && (this.ml = a,
					this.f.classList.toggle('chat-bg-full', a));
			}

			Sr(a) {
				this.pl != a && (this.pl = a,
					this.gb.f.classList.toggle('restricted', a));
			}

			D(a) {
				null == a.U.M && this.ue(true);
				this.nd && this.Wa.D(a.U, a.U.na(a.xc));
				class_H.i(this.Ql);
				this.ii.disabled = null == a.U.M;
				let b = class_n.j.Ac.C()
					,
					c = this.gb.Nb;
				c.re = class_n.j.Ei.C();
				this.Kr(class_n.j.Bh.C());
				this.Jr('full' == class_n.j.ek.C());
				this.Sr(0 == b);
				let d = this.Oa.f.getBoundingClientRect().height;
				if (0 == b) {
					c.Gg = 1;
					c.Md = 0;
					c.Tg = 0;
					this.gb.Nb.xh = 0;
					this.gb.f.style.paddingBottom = d + 'px';
				}
				else {
					c.Tg = 35;
					c.Md = 0;
					// Modified zoom
					c.Gg = 1 + .25 * (b - 1);
					this.gb.Nb.xh = d * window.devicePixelRatio;
					this.gb.f.style.paddingBottom = '0';
				}
				a = a.eg();
				this.gb.D(a);
				class_n.Na.mk.ot(a);
			}

			ue(a) {
				this.nd != a && (this.nd = a,
					this.f.classList.toggle('showing-room-view', this.nd),
					this.nd ? this.ms.appendChild(this.Wa.f) : this.Wa.f.remove());
			}

			tp() {
				return null != class_qa.Iq;
			}

			cb(a, b) {
				class_x.Mf(this.uf);
				class_qa.Iq = a;
				null != a ? (this.uf.style.display = 'flex',
					this.uf.appendChild(a),
					this.Ql = b) : (this.uf.style.display = 'none',
					this.Ql = null);
			}
		}

		class class_wc {
			constructor(a) {
				this.Kj = new Map;
				this.$o = new class_hb(100, 16);
				this.Jg = false;
				this.zb = 0;
				this.pa = a;
				a = class_A.ia(8);
				a.u(Math.random());
				this.Se = a.Vb();
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.pa.Ub(b, a);
			}
		}

		class class_Hc {
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

		/** Stadium */
		class class_q {
			constructor() {
				this.L = [];
				this.W = [];
				this.qa = [];
				this.vc = [];
				this.H = [];
				this.ob = [];
				this.Nd = [];
				this.vd = [];
				this.Ld = new class_ac;
				this.Gh = 255;
				this.Re = this.jf = 0;
				this.Xf = true;
				this.zf = false;
			}

			pg() {
				let a = new class_ya;
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
					a.Eb(this.B);
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
					a.m(this.qa.length);
					b = 0;
					for (c = this.qa; b < c.length;)
						c[b++].fa(a);
					a.m(this.vc.length);
					b = 0;
					for (c = this.vc; b < c.length;)
						c[b++].fa(a);
					a.m(this.H.length);
					b = 0;
					for (c = this.H; b < c.length;)
						c[b++].fa(a);
					a.m(this.ob.length);
					b = 0;
					for (c = this.ob; b < c.length;)
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

			os(a) {
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

				this.B = a.Ab();
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
				this.qa = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_S,
						e.ka(a),
						this.qa.push(e);
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
						e = new class_ya,
						e.ka(a),
						this.H.push(e);
				this.ob = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new class_Fb,
						e.ka(a),
						this.ob.push(e);
				this.Nd = b();
				this.vd = b();
				this.oe();
				if (!this.Ym())
					throw class_v.A(new class_Ya('Invalid stadium'));
			}

			Ym() {
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
				return null != a ? class_w.I(a, D) : 0;
			}

			Kp(a) {
				a = a.canBeStored;
				return null != a ? class_w.I(a, zc) : true;
			}

			Ae() {
				return JSON.stringify(this.js());
			}

			js() {
				if (!this.Xf) {
					//throw class_v.A(0);
					console.debug(this.B + ' canBeStored bypassed');
				}
				let a = {};
				for (var b = 0, c = [], d = 0, e = this.L; d < e.length;) {
					var f = e[d];
					++d;
					f.Dd = b++;
					c.push(class_q.xs(f));
				}
				d = new class_I;
				b = [];
				e = 0;
				for (f = this.W; e < f.length;)
					b.push(class_q.Er(f[e++], d));
				d = [];
				e = 0;
				for (f = this.qa; e < f.length;)
					d.push(class_q.Eq(f[e++]));
				e = [];
				f = 0;
				for (var g = this.vc; f < g.length;)
					e.push(class_q.bp(g[f++]));
				f = class_q.Hq(this.Ld);
				var h = new class_ya;
				g = [];
				for (var k = 0, l = this.H; k < l.length;)
					g.push(class_q.Fo(l[k++], h));
				h = [];
				k = 0;
				for (l = this.ob; k < l.length;)
					h.push(class_q.vp(l[k++]));
				k = [];
				l = 0;
				for (var m = this.Nd; l < m.length;) {
					var r = m[l];
					++l;
					k.push([r.x, r.y]);
				}
				l = [];
				m = 0;
				for (r = this.vd; m < r.length;) {
					let t = r[m];
					++m;
					l.push([t.x, t.y]);
				}
				c = {
					name: this.B,
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
				class_q.la(c, 'maxViewWidth', this.jf, 0);
				class_q.la(c, 'cameraFollow', 1 == this.Re ? 'player' : '', '');
				class_q.la(c, 'spawnDistance', this.mc, 200);
				0 != h.length && (c.joints = h);
				0 != k.length && (c.redSpawnPoints = k);
				0 != l.length && (c.blueSpawnPoints = l);
				class_q.la(c, 'kickOffReset', this.zf ? 'full' : 'partial', 'partial');
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
				class_q.la(a, 'type', b, 'none');
				class_q.la(a, 'width', this.ae, 0);
				class_q.la(a, 'height', this.$d, 0);
				class_q.la(a, 'kickOffRadius', this.ad, 0);
				class_q.la(a, 'cornerRadius', this.Gc, 0);
				class_q.Cg(a, this.td, 7441498);
				class_q.la(a, 'goalLine', this.Qe, 0);
				return c;
			}

			$k(a) {
				function b(h) {
					let k = class_w.I(h[0], D);
					h = class_w.I(h[1], D);
					null == h && (h = 0);
					null == k && (k = 0);
					return new class_P(k, h);
				}

				function c(h, k, l, m) {
					null == m && (m = false);
					var r = d[k];
					if (!m || null != r)
						if (m = class_w.I(r, Array),
						null != m)
							for (r = 0; r < m.length;) {
								let t = m[r];
								++r;
								try {
									class_q.Nn(t, f),
										h.push(l(t));
								}
								catch (z) {
									throw class_v.A(new class_Ya('Error in "' + k + '" index: ' + h.length));
								}
							}
				}

				let d = JSON5.parse(a);
				this.L = [];
				this.W = [];
				this.qa = [];
				this.vc = [];
				this.H = [];
				this.ob = [];
				this.B = class_w.I(d.name, String);
				this.bc = class_w.I(d.width, D);
				this.sc = class_w.I(d.height, D);
				this.jf = this.ie(d, 'maxViewWidth') | 0;
				'player' == d.cameraFollow && (this.Re = 1);
				this.mc = 200;
				a = d.spawnDistance;
				null != a && (this.mc = class_w.I(a, D));
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
				this.Xf = this.Kp(d);
				this.zf = 'full' == d.kickOffReset;
				let f = d.traits;
				a = d.ballPhysics;
				'disc0' != a && (null != a ? (a = class_q.al(a, this.pg()),
					a.w |= 192,
					this.H.push(a)) : this.H.push(this.pg()));
				c(this.L, 'vertexes', class_q.Jp);
				let g = this;
				c(this.W, 'segments', function (h) {
					return class_q.Ip(h, g.L);
				});
				c(this.vc, 'goals', class_q.Ep);
				c(this.H, 'discs', function (h) {
					return class_q.al(h, new class_ya);
				});
				c(this.qa, 'planes', class_q.Gp);
				c(this.ob, 'joints', function (h) {
					return class_q.Fp(h, g.H);
				}, true);
				c(this.Nd, 'redSpawnPoints', b, true);
				c(this.vd, 'blueSpawnPoints', b, true);
				a = d.playerPhysics;
				null != a && (this.Ld = class_q.Hp(a));
				if (255 < this.L.length || 255 < this.W.length || 255 < this.qa.length || 255 < this.vc.length || 255 < this.H.length)
					throw class_v.A('Error');
				this.oe();
				if (!this.Ym())
					throw class_v.A(new class_Ya('Invalid stadium'));
			}

			gk() {
				let a = class_q.gs;
				a.a = 0;
				this.fa(a);
				let b = new class_xc;
				b.Ds(a.Vb());
				b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
				b.hash += b.hash << 15;
				return b.hash | 0;
			}

			co(a, b) {
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
				this.B = a;
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
				a = new class_S;
				var k = a.xa;
				k.x = 0;
				k.y = 1;
				a.Ua = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.xa;
				k.x = 0;
				k.y = -1;
				a.Ua = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.xa;
				k.x = 1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.xa;
				k.x = -1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.qa.push(a);
				this.qg(d, 1, f, 13421823, class_u.Ca);
				this.qg(-d, -1, f, 16764108, class_u.ga);
				this.fl(g, c);
				b = new class_S;
				c = b.xa;
				c.x = 0;
				c.y = 1;
				b.Ua = -e;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.xa;
				c.x = 0;
				c.y = -1;
				b.Ua = -e;
				b.h = 1;
				this.qa.push(b);
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
				var m = l.a;
				m.x = -d;
				m.y = e;
				l.h = 0;
				m = new class_G;
				var r = m.a;
				r.x = -d;
				r.y = f;
				m.h = 0;
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
				z.da = m;
				z.h = 1;
				z.$a = false;
				let L = new class_I;
				L.Y = r;
				L.da = b;
				L.h = 1;
				L.$a = false;
				this.L.push(b);
				this.L.push(c);
				this.L.push(g);
				this.L.push(a);
				this.L.push(k);
				this.L.push(l);
				this.L.push(m);
				this.L.push(r);
				this.W.push(f);
				this.W.push(t);
				this.W.push(z);
				this.W.push(L);
				this.dl(d, e, h);
				this.oe();
			}

			el(a, b, c, d, e, f, g, h) {
				this.B = a;
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
				a = new class_S;
				var k = a.xa;
				k.x = 0;
				k.y = 1;
				a.Ua = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.xa;
				k.x = 0;
				k.y = -1;
				a.Ua = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.xa;
				k.x = 1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.xa;
				k.x = -1;
				k.y = 0;
				a.Ua = -b;
				a.o = 0;
				this.qa.push(a);
				this.qg(d - g, 1, f, 13421823, class_u.Ca, 63);
				this.qg(-d + g, -1, f, 16764108, class_u.ga, 63);
				this.fl(75, c);
				b = new class_S;
				c = b.xa;
				c.x = 0;
				c.y = 1;
				b.Ua = -e;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.xa;
				c.x = 0;
				c.y = -1;
				b.Ua = -e;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.xa;
				c.x = 1;
				c.y = 0;
				b.Ua = -d;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.xa;
				c.x = -1;
				c.y = 0;
				b.Ua = -d;
				b.h = 1;
				this.qa.push(b);
				this.dl(d, e, h);
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
				let m = new class_G;
				l = m.a;
				l.x = h.a.x + 22 * b;
				l.y = h.a.y + 22;
				let r = new class_G;
				l = r.a;
				l.x = k.a.x + 22 * b;
				l.y = k.a.y - 22;
				l = new class_I;
				l.Y = h;
				l.da = m;
				l.Uc(90 * b);
				let t = new class_I;
				t.Y = r;
				t.da = m;
				let z = new class_I;
				z.Y = r;
				z.da = k;
				z.Uc(90 * b);
				b = this.L.length;
				this.L.push(h);
				this.L.push(k);
				this.L.push(m);
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
				f = new class_ya;
				g = f.a;
				g.x = a;
				g.y = -c;
				f.ba = 0;
				f.V = 8;
				f.S = d;
				this.H.push(f);
				f = new class_ya;
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

			fl(a, b) {
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

			dl(a, b, c) {
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
					var m = l.a;
					m.x = a - c;
					m.y = -b;
					l.h = 0;
					m = new class_G;
					var r = m.a;
					r.x = a;
					r.y = -b + c;
					m.h = 0;
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
					r.da = m;
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
					this.L.push(m);
					this.W.push(a);
					this.W.push(b);
					this.W.push(c);
					this.W.push(r);
				}
			}

			static ka(a) {
				var b = a.F();
				return 255 == b ? (b = new class_q,
					b.os(a),
					b) : class_q.Oh()[b];
			}

			static Oh() {
				if (null == class_q.wb) {
					class_q.wb = [];
					var a = new class_q;
					a.jd('Classic', 420, 200, 370, 170, 64, 75);
					class_q.wb.push(a);
					a = new class_q;
					a.jd('Easy', 420, 200, 370, 170, 90, 75);
					class_q.wb.push(a);
					a = new class_q;
					a.jd('Small', 420, 200, 320, 130, 55, 70);
					class_q.wb.push(a);
					a = new class_q;
					a.jd('Big', 600, 270, 550, 240, 80, 80);
					class_q.wb.push(a);
					a = new class_q;
					a.jd('Rounded', 420, 200, 370, 170, 64, 75, 75);
					class_q.wb.push(a);
					a = new class_q;
					a.el('Hockey', 420, 204, 398, 182, 68, 120, 100);
					class_q.wb.push(a);
					a = new class_q;
					a.el('Big Hockey', 600, 270, 550, 240, 90, 160, 150);
					class_q.wb.push(a);
					a = new class_q;
					a.jd('Big Easy', 600, 270, 550, 240, 95, 80);
					class_q.wb.push(a);
					a = new class_q;
					a.jd('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
					class_q.wb.push(a);
					a = new class_q;
					a.jd('Huge', 750, 350, 700, 320, 100, 80);
					class_q.wb.push(a);
					a = 0;
					let b = class_q.wb.length;
					for (; a < b;) {
						let c = a++;
						class_q.wb[c].Gh = c;
					}
				}
				return class_q.wb;
			}

			static Nn(a, b) {
				if (null != a.trait && (b = b[class_w.I(a.trait, String)],
				null != b)) {
					let c = 0
						,
						d = class_Bc.cn(b);
					for (; c < d.length;) {
						let e = d[c];
						++c;
						null == a[e] && (a[e] = b[e]);
					}
				}
			}

			static Wn(a) {
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
				c != d && (a[b] = class_q.Wn(c));
			}

			static Cg(a, b, c) {
				b != c && (a.color = class_q.lo(b));
			}

			static lo(a) {
				a |= 0;
				return 0 > a ? 'transparent' : class_Y.eh(a);
			}

			static ng(a) {
				if ('transparent' == a)
					return -1;
				if ('string' == typeof a)
					return class_Q.parseInt('0x' + class_Q.Fe(a));
				if (a instanceof Array)
					return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
				throw class_v.A('Bad color');
			}

			static xs(a) {
				let b = {
					x: a.a.x,
					y: a.a.y
				};
				class_q.la(b, 'bCoef', a.o, 1);
				class_q.Oc(b, 'cMask', a.h, 63);
				class_q.Oc(b, 'cGroup', a.w, 32);
				return b;
			}

			static Jp(a) {
				let b = new class_G;
				b.a.x = class_w.I(a.x, D);
				b.a.y = class_w.I(a.y, D);
				var c = a.bCoef;
				null != c && (b.o = class_w.I(c, D));
				c = a.cMask;
				null != c && (b.h = class_q.Kc(c));
				a = a.cGroup;
				null != a && (b.w = class_q.Kc(a));
				return b;
			}

			static Er(a, b) {
				let c = {
					v0: a.Y.Dd,
					v1: a.da.Dd
				};
				class_q.la(c, 'bias', a.Hc, b.Hc);
				class_q.la(c, 'bCoef', a.o, b.o);
				let d = a.Vo();
				class_q.la(c, 'curve', d, 0);
				0 != d && (c.curveF = a.vb);
				class_q.la(c, 'vis', a.$a, b.$a);
				class_q.Oc(c, 'cMask', a.h, b.h);
				class_q.Oc(c, 'cGroup', a.w, b.w);
				class_q.Cg(c, a.S, b.S);
				return c;
			}

			static Ip(a, b) {
				let c = new class_I;
				var d = class_w.I(a.v1, Pb);
				c.Y = b[class_w.I(a.v0, Pb)];
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
				null != b && (c.Hc = class_w.I(b, D));
				null != d && (c.o = class_w.I(d, D));
				null != f ? c.vb = class_w.I(f, D) : null != e && c.Uc(class_w.I(e, D));
				null != g && (c.$a = class_w.I(g, zc));
				null != h && (c.h = class_q.Kc(h));
				null != k && (c.w = class_q.Kc(k));
				null != a && (c.S = class_q.ng(a));
				return c;
			}

			static vp(a) {
				let b = {
					d0: a.fe,
					d1: a.ge,
					length: a.Ib >= a.fc ? a.Ib : [a.Ib, a.fc]
				};
				class_q.Cg(b, a.S, 0);
				class_q.la(b, 'strength', a.we, 1 / 0);
				return b;
			}

			static Fp(a, b) {
				let c = new class_Fb;
				var d = class_w.I(a.d0, Pb)
					,
					e = class_w.I(a.d1, Pb);
				let f = a.color
					,
					g = a.strength;
				a = a.length;
				if (d >= b.length || 0 > d)
					throw class_v.A(null);
				if (e >= b.length || 0 > e)
					throw class_v.A(null);
				c.fe = d;
				c.ge = e;
				null == a ? (d = b[d],
					e = b[e],
					null == d || null == e ? c.fc = c.Ib = 100 : (b = d.a,
						d = e.a,
						e = b.x - d.x,
						b = b.y - d.y,
						c.fc = c.Ib = Math.sqrt(e * e + b * b))) : a instanceof Array ? (c.Ib = class_w.I(a[0], D),
					c.fc = class_w.I(a[1], D)) : c.fc = c.Ib = class_w.I(a, D);
				c.we = null == g || 'rigid' == g ? 1 / 0 : class_w.I(g, D);
				null != f && (c.S = class_q.ng(f));
				return c;
			}

			static Eq(a) {
				let b = {
					normal: [a.xa.x, a.xa.y],
					dist: a.Ua
				};
				class_q.la(b, 'bCoef', a.o, 1);
				class_q.Oc(b, 'cMask', a.h, 63);
				class_q.Oc(b, 'cGroup', a.w, 32);
				return b;
			}

			static Gp(a) {
				let b = new class_S;
				var c = class_w.I(a.normal, Array)
					,
					d = class_w.I(c[0], D)
					,
					e = class_w.I(c[1], D);
				c = b.xa;
				let f = d;
				var g = e;
				null == e && (g = 0);
				null == d && (f = 0);
				d = f;
				e = Math.sqrt(d * d + g * g);
				c.x = d / e;
				c.y = g / e;
				b.Ua = class_w.I(a.dist, D);
				c = a.bCoef;
				d = a.cMask;
				a = a.cGroup;
				null != c && (b.o = class_w.I(c, D));
				null != d && (b.h = class_q.Kc(d));
				null != a && (b.w = class_q.Kc(a));
				return b;
			}

			static bp(a) {
				return {
					p0: [a.Y.x, a.Y.y],
					p1: [a.da.x, a.da.y],
					team: a.ye == class_u.ga ? 'red' : 'blue'
				};
			}

			static Ep(a) {
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
						throw class_v.A('Bad team value');
				}
				b.ye = a;
				return b;
			}

			static Hq(a) {
				let b = {};
				class_q.la(b, 'bCoef', a.o, .5);
				class_q.la(b, 'invMass', a.ba, .5);
				class_q.la(b, 'damping', a.Da, .96);
				class_q.la(b, 'acceleration', a.Ne, .1);
				class_q.la(b, 'kickingAcceleration', a.df, .07);
				class_q.la(b, 'kickingDamping', a.ef, .96);
				class_q.la(b, 'kickStrength', a.bf, 5);
				class_q.Oc(b, 'cGroup', a.w, 0);
				if (0 != a.oa.x || 0 != a.oa.y)
					b.gravity = [a.oa.x, a.oa.y];
				class_q.la(b, 'radius', a.V, 15);
				class_q.la(b, 'kickback', a.cf, 0);
				return b;
			}

			static Hp(a) {
				let b = new class_ac;
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
					m = a.cGroup
					,
					r = a.radius;
				a = a.kickback;
				null != c && (b.o = class_w.I(c, D));
				null != d && (b.ba = class_w.I(d, D));
				null != e && (b.Da = class_w.I(e, D));
				null != f && (b.Ne = class_w.I(f, D));
				null != g && (b.df = class_w.I(g, D));
				null != h && (b.ef = class_w.I(h, D));
				null != k && (b.bf = class_w.I(k, D));
				null != l && (c = b.oa,
					d = class_w.I(l[1], D),
					c.x = class_w.I(l[0], D),
					c.y = d);
				null != m && (b.w = class_q.Kc(m));
				null != r && (b.V = class_w.I(r, D));
				null != a && (b.cf = class_w.I(a, D));
				return b;
			}

			static Fo(a, b) {
				let c = {};
				if (a.a.x != b.a.x || a.a.y != b.a.y)
					c.pos = [a.a.x, a.a.y];
				if (a.G.x != b.G.x || a.G.y != b.G.y)
					c.speed = [a.G.x, a.G.y];
				if (a.oa.x != b.oa.x || a.oa.y != b.oa.y)
					c.gravity = [a.oa.x, a.oa.y];
				class_q.la(c, 'radius', a.V, b.V);
				class_q.la(c, 'bCoef', a.o, b.o);
				class_q.la(c, 'invMass', a.ba, b.ba);
				class_q.la(c, 'damping', a.Da, b.Da);
				class_q.Cg(c, a.S, b.S);
				class_q.Oc(c, 'cMask', a.h, b.h);
				class_q.Oc(c, 'cGroup', a.w, b.w);
				return c;
			}

			static al(a, b) {
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
					m = a.cMask;
				a = a.cGroup;
				if (null != c) {
					let r = b.a;
					r.x = c[0];
					r.y = c[1];
				}
				null != d && (c = b.G,
					c.x = d[0],
					c.y = d[1]);
				null != e && (d = b.oa,
					d.x = e[0],
					d.y = e[1]);
				null != f && (b.V = class_w.I(f, D));
				null != g && (b.o = class_w.I(g, D));
				null != h && (b.ba = class_w.I(h, D));
				null != k && (b.Da = class_w.I(k, D));
				null != l && (b.S = class_q.ng(l));
				null != m && (b.h = class_q.Kc(m));
				null != a && (b.w = class_q.Kc(a));
				return b;
			}

			static la(a, b, c, d) {
				c != d && (a[b] = c);
			}
		}

		class class_Fc {
			constructor(a) {
				this.current = 0;
				this.Cs = a;
			}

			next() {
				return this.Cs[this.current++];
			}
		}

		class class_Cb {
			static ei(a) {
				return new PerfectScrollbar(a, {
					handlers: class_Cb.np
				});
			}
		}

		class class_Ga {
			constructor(a) {
				this.Gd = new Map;
				this.f = class_x.Ha(class_Ga.O);
				this.f.className += ' ' + a.Bo;
				let b = class_x.Aa(this.f);
				this.bb = b.get('list');
				this.$h = b.get('join-btn');
				this.Di = b.get('reset-btn');
				a == class_u.Ma && this.Di.remove();
				this.$h.textContent = '' + a.B;
				this.f.ondragover = this.f.tt = function (d) {
					-1 != d.dataTransfer.types.indexOf('player') && d.preventDefault();
				}
				;
				let c = this;
				this.f.ondrop = function (d) {
					d.preventDefault();
					d = d.dataTransfer.getData('player');
					null != d && (d = class_Q.parseInt(d),
					null != d && class_Ha.i(c.yg, d, a));
				}
				;
				this.$h.onclick = function () {
					class_E.i(c.hq, a);
				}
				;
				this.Di.onclick = function () {
					class_E.i(c.le, a);
				};
			}

			D(a, b, c, d) {
				this.$h.disabled = b || c;
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
						f = this.Gd.get(e.X),
					null == f && (f = new class_pb(e),
						f.sf = function (h) {
							class_E.i(g.sf, h);
						}
						,
						this.Gd.set(e.X, f),
						this.bb.appendChild(f.f)),
						f.D(e, d),
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

		class class_Kc {
			static pj() {
				class_p.Ia(class_Gb);
				class_p.Ia(class_Fa);
				class_p.Ia(class_db);
				class_p.Ia(class_La);
				class_p.Ia(class_Ua);
				class_p.Ia(class_Ma);
				class_p.Ia(class_ka);
				class_p.Ia(class_Ra);
				class_p.Ia(class_Sa);
				class_p.Ia(class_Va);
				class_p.Ia(class_ra);
				class_p.Ia(class_Ca);
				class_p.Ia(class_fa);
				class_p.Ia(class_Da);
				class_p.Ia(class_Ea);
				class_p.Ia(class_Ta);
				class_p.Ia(class_Ba);
				class_p.Ia(class_Na);
				class_p.Ia(class_Ja);
				class_p.Ia(class_$a);
				class_p.Ia(class_Hb);
				class_p.Ia(class_Ia);
				class_p.Ia(class_Ib);
				class_p.Ia(class_Jb);
			}
		}

		class class_E {
			static i(a, b) {
				null != a && a(b);
			}
		}

		class class_za {
			constructor() {
				this.ed = new Map;
			}

			Ra(a, b) {
				this.ed.set(a, b);
			}

			C(a) {
				return this.ed.get(a);
			}

			gr(a) {
				this.ed.delete(a);
			}

			Xo(a) {
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
				let b = new class_za
					,
					c = class_Bc.cn(a)
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
				return class_za.dg(JSON.parse(a));
			}

			static qk() {
				let a = new class_za;
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

		class class_Kb {
			constructor() {
				this.Cf = null;
				this.f = class_x.Ha(class_Kb.O);
				var a = class_x.Aa(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.pb);
				}
				;
				this.zh = a.get('change');
				this.zh.disabled = true;
				this.zh.onclick = function () {
					null != b.Cf && b.qm(b.Cf.index);
				}
				;
				a = a.get('list');
				this.si(a);
				let c = class_Cb.ei(a);
				window.setTimeout(function () {
					c.update();
				}, 0);
			}

			si(a) {
				let b = this
					,
					c = 0
					,
					d = class_Oa.bb.length >> 2;
				for (; c < d;) {
					var e = c++;
					let f = e
						,
						g = class_Oa.bb[e << 2];
					e = class_Oa.bb[(e << 2) + 1].toLowerCase();
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
						b.qm(f);
					};
				}
			}

			qm(a) {
				let b = new class_na;
				b.ub = class_Oa.bb[(a << 2) + 1].toLowerCase();
				b.Jc = class_Oa.bb[(a << 2) + 2];
				b.Lc = class_Oa.bb[(a << 2) + 3];
				class_n.j.Ye.sa(b);
				class_H.i(this.pb);
			}
		}

		class class_eb {
			constructor() {
				this.list = [];
			}

			hn(a) {
				let b = 0
					,
					c = a.mb
					,
					d = a.Dc
					,
					e = 0
					,
					f = this.list;
				for (; e < f.length;) {
					var g = f[e];
					++e;
					let h = g.mb;
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

			gt(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].mb >= a);)
					++b;
				this.list.splice(0, b);
			}

			Gs(a, b) {
				let c = this.list;
				for (; 0 < c.length;)
					c.pop();
				class_eb.Ys(a.list, b.list, this.list);
			}

			ht(a) {
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

			Hs(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].mb >= a);)
					++b;
				return b;
			}

			static Ys(a, b, c) {
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
						if (h.mb <= k.mb) {
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

		class class_p {
			constructor() {
				class_p.yb || this.Ya();
			}

			Ya() {
				this.Dc = 0;
			}

			rn() {
				return true;
			}

			apply() {
				throw class_v.A('missing implementation');
			}

			wa() {
				throw class_v.A('missing implementation');
			}

			va() {
				throw class_v.A('missing implementation');
			}

			static Ga(a) {
				null == a.delay && (a.delay = true);
				null == a.Ba && (a.Ba = true);
				return a;
			}

			static Ia(a) {
				a.En = class_p.If;
				if (null == a.za)
					throw class_v.A('Class doesn\'t have a config');
				a.prototype.Jf = a.za;
				class_p.gn.set(class_p.If, a);
				class_p.If++;
			}

			static uj(a, b) {
				let c = class_w.dn(a).En;
				if (null == c)
					throw class_v.A('Tried to pack unregistered action');
				b.m(c);
				a.va(b);
			}

			static oh(a) {
				var b = a.F();
				b = Object.create(class_p.gn.get(b).prototype);
				b.Dc = 0;
				b.mb = 0;
				b.wa(a);
				return b;
			}
		}

		class class_Rb {
			constructor(a, b) {
				this.Vh = null;
				this.l = a;
				null != b && (this.Vh = '@' + class_Y.replace(b, ' ', '_'));
			}

			cj(a) {
				let b = this.l.Oa.Fc
					,
					c = []
					,
					d = 0;
				for (a = a.K; d < a.length;) {
					let e = a[d];
					++d;
					c.push({
						B: e.B,
						aa: e.X
					});
				}
				b.Uj = c;
			}

			zi(a) {
				function b(d) {
					return null == d ? '' : ' by ' + d.B;
				}

				// Invoking global fields begin
				/**
				 * @param {class_ta} fullPlayer
				 * @return {{}}
				 */
				function getPlayerObject(fullPlayer) {
					if (fullPlayer == null)
						return null;
					let pos = null;
					const playerDisc = fullPlayer.J;
					if (playerDisc != null) {
						pos = {
							x: playerDisc.a.x,
							y: playerDisc.a.y
						};
					}
					return {
						time: fullPlayer.Cc,
						fullPlayer: fullPlayer.sn,
						team: fullPlayer.ea?.aa,
						position: pos,
						// When a player kicks the ball, it is set to min and decrements every frame. When it reaches 0, the player can kick when kickMana > 0.
						nextKickIn: fullPlayer.Zc,
						// This equals to rate * burst. When the player kicks the ball, burst is subtracted from it, and it increments every frame.
						// When it goes below 0, the player can't kick.
						kickRateBurst: fullPlayer.Bc,
						isBlinking: fullPlayer.Yb,
						id: fullPlayer.X,
						inputKey: fullPlayer.Ea,
						name: fullPlayer.B,
						ping: fullPlayer.zb,
						u1: fullPlayer.dh,
						flag: fullPlayer.country,
						desynchronized: fullPlayer.Td,
						avatarOverride: fullPlayer.Sd,
						avatar: fullPlayer.Zb,
						order: fullPlayer.Lb,
						admin: fullPlayer.eb
					};
				}

				this.cj(a);
				let c = this;
				a.Ll = function (d) {
					c.l.Oa.Hb('' + d.B + ' has joined');
					class_n.Na.ld(class_n.Na.up);
					c.cj(a);

					if (window.parent.g.onPlayerJoin != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerJoin(player);
					}
				}
				;
				a.Ml = function (d, e, f, g) {
					class_E.i(c.mq, d.X);

					if (window.parent.g.onPlayerLeave != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerLeave(player);
					}

					let noticeText;
					if (null == e) {
						noticeText = '' + d.B + ' has left';
					}
					else {
						class_Wb.i(c.lq, d.X, e, null != g ? g.B : null, f);
						noticeText = '' + d.B + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' : '');
					}
					c.l.Oa.Hb(noticeText);
					class_n.Na.ld(class_n.Na.Ap);
					c.cj(a);
				}
				;
				a.Jl = function (d, e) {
					let f = null != c.Vh && -1 != e.indexOf(c.Vh);
					c.l.Oa.ca('' + d.B + ': ' + e, f ? 'highlight' : null);
					class_n.j.Gm.C() && f ? class_n.Na.ld(class_n.Na.Pk) : class_n.j.Qi.C() && class_n.Na.ld(class_n.Na.dk);

					if (window.parent.g.onPlayerChat != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerChat(player, e);
					}
				}
				;
				a.mm = function (d, e, f, g) {
					c.l.Oa.Lp(d, e, f);
					if (class_n.j.Qi.C())
						switch (g) {
							case 1:
								class_n.Na.ld(class_n.Na.dk);
								break;
							case 2:
								class_n.Na.ld(class_n.Na.Pk);
						}

					if (window.parent.g.onAnnouncement != null) {
						window.parent.g.onAnnouncement(d, e, f, g);
					}
				}
				;
				a.ri = function (byFullPlayer) {
					class_n.Na.ld(class_n.Na.wp);

					if (window.parent.g.onPlayerBallKick != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onPlayerBallKick(byPlayer);
					}
				}
				;
				a.Xi = function (d) {
					class_n.Na.ld(class_n.Na.ap);
					let e = c.l.gb.Nb.Cd;
					e.Ra(d == class_u.ga ? e.cr : e.Un);

					if (window.parent.g.onTeamGoal != null) {
						const teamId = d.aa;
						window.parent.g.onTeamGoal(teamId);
					}
				}
				;
				a.Yi = function (d) {
					let e = c.l.gb.Nb.Cd;
					e.Ra(d == class_u.ga ? e.dr : e.Vn);
					c.l.Oa.Hb('' + d.B + ' team won the match');

					if (window.parent.g.onTeamVictory != null) {
						const teamId = d.B;
						window.parent.g.onTeamVictory(teamId);
					}
				}
				;
				a.El = function (d, e, f) {
					e && !f && c.l.Oa.Hb('Game paused' + b(d));

					if (window.parent.g.onGamePause != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onGamePause(byPlayer, e);
					}
				}
				;
				a.Zi = function () {
					let d = c.l.gb.Nb.Cd;
					d.Ra(d.bs);

					if (window.parent.g.onTimeIsUp != null) {
						window.parent.g.onTimeIsUp();
					}
				}
				;
				a.Jq = () => {
					if (window.parent.g.onPositionsReset != null) {
						window.parent.g.onPositionsReset();
					}
				}
				;
				a.Ui = function (d) {
					c.l.ue(false);
					c.l.gb.Nb.Cd.ho();
					c.l.Oa.Hb('Game started' + b(d));

					if (window.parent.g.onGameStart != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onGameStart(byPlayer);
					}
				}
				;
				a.Gf = function (d) {
					null != d && c.l.Oa.Hb('Game stopped' + b(d));

					if (window.parent.g.onGameStop != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onGameStop(byPlayer);
					}
				}
				;
				a.Si = function (d, e) {
					let f = null;
					if (!e.$e()) {
						f = class_Y.eh(e.gk(), 8);
						c.l.Oa.Hb('Stadium "' + e.B + '" (' + f + ') loaded' + b(d));
					}

					if (window.parent.g.onStadiumChange != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onStadiumChange(byPlayer, e.B, f);
					}
				}
				;
				a.Kl = function (d) {
					c.l.Oa.Hb('' + d.B + ' ' + (d.Td ? 'has desynchronized' : 'is back in sync'));

					if (window.parent.g.onPlayerDesyncChange != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerDesyncChange(player, player.desynchronized);
					}
				}
				;
				a.Pl = function (d, e, f) {
					null != a.M && c.l.Oa.Hb('' + e.B + ' was moved to ' + f.B + b(d));

					if (window.parent.g.onPlayerTeamChange != null) {
						const player = getPlayerObject(e);
						const byPlayer = getPlayerObject(d);
						window.parent.g.onPlayerTeamChange(player, byPlayer, f.aa);
					}
				}
				;
				a.pi = function (d, e) {
					let f = e.B;
					d = (e.eb ? '' + f + ' was given admin rights' : '' + f + '\'s admin rights were taken away') + b(d);
					c.l.Oa.Hb(d);

					if (window.parent.g.onPlayerAdminChange != null) {
						const player = getPlayerObject(e);
						const byPlayer = getPlayerObject(d);
						window.parent.g.onPlayerAdminChange(player, byPlayer, player.admin);
					}
				}
				;
				a.Ol = function (d, e) {
					c.l.gb.Nb.ip(d, e);

					if (window.parent.g.onChatIndicatorStateChange != null) {
						const player = getPlayerObject(d);
						const chatIndicatorShown = e === 0;
						window.parent.g.onChatIndicatorStateChange(player, chatIndicatorShown);
					}
				}
				;
				a.Wk = function (d, e, f, g) {
					c.l.Oa.Hb('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(d));

					if (window.parent.g.onKickRateLimitSet != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onKickRateLimitSet(e, f, g, byPlayer);
					}
				};
				// Invoking global fields end
			}

			ps(a) {
				a.Ll = null;
				a.Ml = null;
				a.Jl = null;
				a.mm = null;
				a.ri = null;
				a.Xi = null;
				a.Yi = null;
				a.El = null;
				a.Zi = null;
				a.Ui = null;
				a.Gf = null;
				a.Si = null;
				a.Kl = null;
				a.Pl = null;
				a.pi = null;
				a.Ol = null;
				a.Wk = null;
			}
		}

		class class_ba {
			constructor(a, b, c) {
				this.f = class_x.Ha(class_ba.O);
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
						m = window.document.createElement('button');
					m.textContent = k;
					m.onclick = function () {
						class_E.i(g.Va, l);
					}
					;
					d.appendChild(m);
				}
				this.ce.textContent = b;
				e.textContent = a;
			}
		}

		class class_jb {
			constructor() {
				this.xk = null;
				this.f = class_x.Ha(class_jb.O);
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
					class_H.i(c.pb);
				};
			}

			Or(a) {
				this.xk != a && (this.xk = a,
					this.mg.value = a);
			}
		}

		class class_H {
			static i(a) {
				null != a && a();
			}
		}

		class class_xb {
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
							class_Zb.nh(f.objectStore('files').get(a)).then(function (g) {
								try {
									let h = new class_q;
									h.$k(g);
									b(h);
								}
								catch (h) {
									g = class_v.Kb(h).Fb(),
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
							class_Zb.nh(e.objectStore('meta').getAll()).then(a, b);
						};
					}
				);
			}

			static it() {
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
								class_Zb.nh(f.objectStore('files').add(a.Ae())).then(function (g) {
									g = {
										name: a.B,
										id: g
									};
									return class_Zb.nh(f.objectStore('meta').add(g));
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

		/** Team */
		class class_u {
			constructor(a, b, c, d, e, f, g, h) {
				this.Bg = null;
				this.aa = a;
				this.S = b;
				this.Hh = c;
				this.xp = d;
				this.B = e;
				this.Bo = f;
				this.w = h;
				this.Nm = new class_va;
				this.Nm.fb.push(b);
			}
		}

		/** Player physics */
		class class_ac {
			constructor() {
				this.cf = 0;
				this.V = 15;
				this.w = 0;
				this.oa = new class_P(0, 0);
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
				let b = this.oa;
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
				let b = this.oa;
				b.x = a.v();
				b.y = a.v();
				this.w = a.N();
				this.V = a.v();
				this.cf = a.v();
			}
		}

		class class_Db {
			constructor() {
				this.Fl = new class_sc;
				this.f = class_x.Ha(class_Db.O);
				let a = class_x.Aa(this.f);
				this.Dg = a.get('ping');
				this.Po = a.get('fps');
				class_x.replaceWith(a.get('graph'), this.Fl.f);
			}

			Qr(a, b) {
				this.Dg.textContent = 'Ping: ' + a + ' - ' + b;
			}

			zm(a) {
				this.Po.textContent = 'Fps: ' + a;
			}
		}

		class class_O {
			static lj(a, b) {
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

		class class_ha {
			static Xc(a, b) {
				return a.length <= b ? a : class_O.substr(a, 0, b);
			}

			static Es(a) {
				let b = ''
					,
					c = 0
					,
					d = a.byteLength;
				for (; c < d;)
					b += class_Y.eh(a[c++], 2);
				return b;
			}
		}

		class class_qc {
			constructor(a, b) {
				this.ph = null;
				this.mt = .025;
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
				let b = a - this.ln;
				this.ln = a;
				this.De += (this.mh - this.De) * this.mt;
				this.Of -= b;
				0 >= this.Of && (this.Of = this.mh = 0);
				0 >= this.mh && .05 > this.De && (window.clearInterval(this.ph),
					this.ph = null,
					this.De = 0);
				a = class_n.j.Fm.C() ? this.De : 0;
				this.bh.gain.value = a;
			}

			yj(a) {
				this.mh = a;
				this.Of = 166.66666666666666;
				let b = this;
				null == this.ph && (this.ph = window.setInterval(function () {
					b.update();
				}, 17),
					this.ln = window.performance.now());
			}

			connect(a) {
				this.bh.connect(a);
			}

			ot(a) {
				let b = a.M;
				if (null != b)
					if (2 == b.Cb)
						0 >= b.Qa && this.yj(1);
					else if (1 == b.Cb) {
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
							m = null
							,
							r = null
							,
							t = 0
							,
							z = class_u.ga.Hh
							,
							L = 0;
						for (a = a.K; L < a.length;) {
							let N = a[L];
							++L;
							if (null == N.J)
								continue;
							var c = N.J.a;
							let nb = e.a;
							var d = c.x - nb.x;
							c = c.y - nb.y;
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
								if (null == m || m.a.x * z > N.J.a.x * z)
									m = N.J;
								if (null == r || d < t)
									r = N.J,
										t = d;
							}
						}
						null != m && null != g && 0 >= b.Qa && (h.a.x > m.a.x && e.a.x > m.a.x && 20 < e.a.x && this.yj(.3),
						r.a.x < g.a.x && e.a.x < g.a.x && -20 > e.a.x && this.yj(.3));
					}
			}
		}

		class class_yc {
			constructor() {
				function a(g) {
					return new class_xa(g, f, function (h) {
							if (null == h)
								return null;
							try {
								return class_na.Mh(h);
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
							catch (m) {
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
							catch (m) {
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

				let f = class_Ec.fn();
				this.ne = e('player_name', '', 25);
				this.Ac = d('view_mode', -1);
				this.Kh = d('fps_limit', 0);
				this.uh = e('avatar', null, 2);
				e('rctoken', null, 1024);
				this.Om = b('team_colors', true);
				this.Qk = b('show_indicators', true);
				this.Ri = c('sound_volume', 1);
				this.ve = b('sound_main', true);
				this.Qi = b('sound_chat', true);
				this.Gm = b('sound_highlight', true);
				this.Fm = b('sound_crowd', true);
				this.Tj = e('player_auth_key', null, 1024);
				this.Ad = d('extrapolation', 0);
				this.Ei = c('resolution_scale', 1);
				this.Dm = b('show_avatars', true);
				this.fk = d('chat_height', 160);
				this.Ah = d('chat_focus_height', 140);
				this.Bh = c('chat_opacity', .8);
				this.ek = e('chat_bg_mode', 'compact', 50);
				this.Xe = a('geo');
				this.Ye = a('geo_override');
				this.me = function () {
					return new class_xa('player_keys', f, function (g) {
							if (null == g)
								return class_za.qk();
							try {
								return class_za.Mh(g);
							}
							catch (h) {
								return class_za.qk();
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
				return null != this.Ye.C() ? this.Ye.C() : null != this.Xe.C() ? this.Xe.C() : new class_na;
			}
		}

		class class_Ha {
			static i(a, b, c) {
				null != a && a(b, c);
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

		class class_Pa {
		}

		class class_bc {
			constructor(a, b) {
				this.Uj = [];
				this.fr = /[#@][^\s@#]*$/;
				this.Pb = a;
				this.pq = b;
				a.hidden = true;
			}

			Uh() {
				this.dj(null);
			}

			$n(a, b) {
				b = this.fr.exec(class_O.substr(a, 0, b));
				if (null != b) {
					var c = b[0]
						,
						d = class_O.substr(c, 1, null).split('')
						,
						e = class_bc.Oo
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
					this.Uk = '#' == c.charAt(0);
					this.Ai = b.index;
					this.tr = c.length;
					this.em = a;
					a = function (l) {
						l = k.exec(l.B);
						return null == l ? -1 : l.index + l[0].length;
					}
					;
					b = [];
					c = 0;
					for (d = this.Uj; c < d.length;)
						e = d[c],
							++c,
							f = a(e),
						0 <= f && b.push({
							vn: f,
							item: e
						});
					b.sort(function (l, m) {
						return l.vn - m.vn;
					});
					this.dj(b);
				}
				else
					this.dj(null);
			}

			Ck(a) {
				a = this.Uk ? '#' + a.aa : '@' + class_Y.replace(a.B, ' ', '_');
				this.pq(class_O.substr(this.em, 0, this.Ai) + a + ' ' + class_O.substr(this.em, this.Ai + this.tr, null), this.Ai + a.length + 1);
			}

			dj(a) {
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
						e = g.B;
						this.Uk && (e = '(' + g.aa + ') ' + e);
						f.textContent = e;
						this.Pb.appendChild(f);
						f.onclick = function () {
							c.Ck(g);
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

			ck(a) {
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

			Jo() {
				null != this.cd && (this.Ck(this.cd[this.zc].item),
					this.Uh());
			}

			static Oo(a) {
				return -1 != '.$^{[(|)*+?\\'.indexOf(a) ? '\\' + a : a;
			}
		}

		/** Full Player */
		class class_wa {
			constructor() {
				this.Cc = -1;
				this.sn = null;
				/** @type {class_u} */
				this.ea = class_u.Ma;
				/** @type {class_sa} */
				this.J = null;
				this.Bc = this.Zc = 0;
				this.Yb = false;
				this.Ea = this.X = 0;
				this.B = 'Player';
				this.dh = this.zb = 0;
				this.country = null;
				this.Td = false;
				this.Zb = this.Sd = null;
				this.Lb = 0;
				this.eb = false;
			}

			va(a) {
				a.m(this.eb ? 1 : 0);
				a.P(this.Lb);
				a.Eb(this.Zb);
				a.Eb(this.Sd);
				a.m(this.Td ? 1 : 0);
				a.Eb(this.country);
				a.P(this.dh);
				a.Eb(this.B);
				a.P(this.Ea);
				a.lb(this.X);
				a.m(this.Yb ? 1 : 0);
				a.gj(this.Bc);
				a.m(this.Zc);
				a.m(this.ea.aa);
				a.gj(null == this.J ? -1 : this.J.Bl);
			}

			wa(a, b) {
				this.eb = 0 != a.F();
				this.Lb = a.N();
				this.Zb = a.Ab();
				this.Sd = a.Ab();
				this.Td = 0 != a.F();
				this.country = a.Ab();
				this.dh = a.N();
				this.B = a.Ab();
				this.Ea = a.N();
				this.X = a.Bb();
				this.Yb = 0 != a.F();
				this.Bc = a.vi();
				this.Zc = a.F();
				let c = a.vf();
				this.ea = 1 == c ? class_u.ga : 2 == c ? class_u.Ca : class_u.Ma;
				a = a.vi();
				this.J = 0 > a ? null : b[a];
			}

			Os() {
				let a = class_ta.Cc
					,
					b = this.sn;
				this.Cc != a && (null == b && (this.sn = b = new class_wa),
					this.Cc = a,
					class_wa.Fs(b, this));
				return b;
			}

			static Fs(a, b) {
				a.eb = b.eb;
				a.Lb = b.Lb;
				a.Zb = b.Zb;
				a.Sd = b.Sd;
				a.Td = b.Td;
				a.country = b.country;
				a.dh = b.dh;
				a.zb = b.zb;
				a.B = b.B;
				a.Ea = b.Ea;
				a.X = b.X;
				a.Yb = b.Yb;
				a.Bc = b.Bc;
				a.Zc = b.Zc;
				a.J = null == b.J ? null : b.J.uc();
				a.ea = b.ea;
			}
		}

		class class_oc {
			constructor() {
				this.Wc = 0;
				this.bb = [];
				this.bs = new class_ea(['Time is', 'Up!'], 16777215);
				this.dr = new class_ea(['Red is', 'Victorious!'], 15035990);
				this.cr = new class_ea(['Red', 'Scores!'], 15035990);
				this.Vn = new class_ea(['Blue is', 'Victorious!'], 625603);
				this.Un = new class_ea(['Blue', 'Scores!'], 625603);
				this.Cq = new class_ea(['Game', 'Paused'], 16777215);
			}

			Ra(a) {
				this.bb.push(a);
			}

			ho() {
				this.bb = [];
				this.Wc = 0;
			}

			D(a) {
				0 < this.bb.length && (this.Wc += a) > this.bb[0].So() && (this.Wc = 0,
					this.bb.shift());
			}

			Qc(a) {
				0 < this.bb.length && this.bb[0].Qc(a, this.Wc);
			}
		}

		class class_Ub {
			constructor() {
			}

			bk() {
				this.B = class_ha.Xc(this.B, 40);
				this.ub = class_ha.Xc(this.ub, 3);
			}

			fa(a) {
				this.bk();
				a.Ta = true;
				a.Wb(this.Rd);
				a.$m(this.B);
				a.$m(this.ub);
				a.fj(this.Jc);
				a.fj(this.Lc);
				a.m(this.Jb ? 1 : 0);
				a.m(this.hf);
				a.m(this.K);
				a.Ta = false;
			}

			ka(a) {
				a.Ta = true;
				this.Rd = a.Rb();
				this.B = a.Xl();
				this.ub = a.Xl();
				this.Jc = a.ui();
				this.Lc = a.ui();
				this.Jb = 0 != a.F();
				this.hf = a.F();
				this.K = a.F();
				a.Ta = false;
				if (30 < this.K || 30 < this.hf)
					throw class_v.A(null);
				this.bk();
			}
		}

		class class_Ic {
			static es(a, b) {
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

		class class_ic {
			constructor(a, b) {
				this.on = 0;
				this.version = 1;
				this.kh = 0;
				this.Vd = class_A.ia(1E3);
				this.Nf = class_A.ia(16384);
				this.version = b;
				let c = this.kh = a.$;
				this.rj = a;
				a.U.fa(this.Nf);
				let d = this;
				a.hc = function (f) {
					let g = a.$;
					d.Nf.lb(g - c);
					c = g;
					d.Nf.Wb(f.R);
					class_p.uj(f, d.Nf);
				}
				;
				this.Vd.Wb(0);
				let e = this.kh;
				a.U.Bm(function (f) {
					let g = a.$;
					d.Vd.lb(g - e);
					d.Vd.m(f);
					d.on++;
					e = g;
				});
			}

			stop() {
				this.rj.hc = null;
				this.rj.U.Bm(null);
				this.Vd.s.setUint16(0, this.on, this.Vd.Ta);
				this.Vd.Xb(this.Nf.Vb());
				let a = pako.deflateRaw(this.Vd.Vb())
					,
					b = class_A.ia(a.byteLength + 32);
				b.Xg('HBR2');
				b.tb(this.version);
				b.tb(this.rj.$ - this.kh);
				b.Xb(a);
				return b.Vb();
			}
		}

		class class_W {
			constructor(a) {
				class_W.yb || this.Ya(a);
			}

			Ya(a) {
				this.$ = 0;
				this.U = a;
			}
		}

		class class_Fb {
			constructor() {
				this.S = 0;
				this.we = 1 / 0;
				this.Ib = this.fc = 100;
				this.fe = this.ge = 0;
			}

			fa(a) {
				a.m(this.fe);
				a.m(this.ge);
				a.u(this.Ib);
				a.u(this.fc);
				a.u(this.we);
				a.P(this.S);
			}

			ka(a) {
				this.fe = a.F();
				this.ge = a.F();
				this.Ib = a.v();
				this.fc = a.v();
				this.we = a.v();
				this.S = a.N();
			}

			D(a) {
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
						if (this.Ib >= this.fc) {
							var g = this.Ib;
							var h = 0;
						}
						else if (f <= this.Ib)
							g = this.Ib,
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

		class class_ya {
			constructor() {
				this.h = this.w = 63;
				this.S = 16777215;
				this.Da = .99;
				this.ba = 1;
				this.o = .5;
				this.V = 10;
				this.oa = new class_P(0, 0);
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
				b = this.oa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.V);
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Da);
				a.tb(this.S);
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
				b = this.oa;
				b.x = a.v();
				b.y = a.v();
				this.V = a.v();
				this.o = a.v();
				this.ba = a.v();
				this.Da = a.v();
				this.S = a.hb();
				this.h = a.N();
				this.w = a.N();
			}

			Np() {
				let a = new class_sa;
				this.Rk(a);
				return a;
			}

			Rk(a) {
				var b = a.a
					,
					c = this.a;
				b.x = c.x;
				b.y = c.y;
				b = a.G;
				c = this.G;
				b.x = c.x;
				b.y = c.y;
				b = a.oa;
				c = this.oa;
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

		class class_vc {
			constructor(a) {
				this.f = a;
				let b = class_x.Aa(a);
				this.Tn = b.get('sound-bar');
				this.pp = b.get('sound-icon');
				this.Sn = b.get('sound-bar-bg');
				let c = this;
				b.get('sound-btn').onclick = function () {
					class_n.j.ve.sa(!class_n.j.ve.C());
					c.D();
				}
				;
				b.get('sound-slider').onmousedown = function (d) {
					function e(g) {
						g.preventDefault();
						{
							let h = c.Sn.getBoundingClientRect();
							g = (g.clientY - h.top) / h.height;
						}
						g = 1 - g;
						class_n.j.Ri.sa(1 < g ? 1 : 0 > g ? 0 : g);
						class_n.j.ve.sa(true);
						c.D();
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
				this.D();
			}

			D() {
				let a = class_n.j.Ri.C()
					,
					b = !class_n.j.ve.C();
				if (this.zp != a || this.yp != b)
					this.zp = a,
					(this.yp = b) && (a = 0),
						this.pp.className = 'icon-' + (0 >= a ? 'volume-off' : .5 >= a ? 'volume-down' : 'volume-up'),
						this.Tn.style.top = 100 * (1 - a) + '%',
						class_n.Na.yi();
			}
		}

		class class_Lb {
			constructor() {
				this.f = class_x.Ha(class_Lb.O);
				let a = class_x.Aa(this.f);
				this.Db = a.get('input');
				this.mf = a.get('ok');
				let b = this;
				a.get('cancel').onclick = function () {
					null != b.Va && b.Va(null);
				}
				;
				this.Db.maxLength = 30;
				this.Db.oninput = function () {
					b.D();
				}
				;
				this.Db.onkeydown = function (c) {
					13 == c.keyCode && b.Ic() && null != b.Va && b.Va(b.Db.value);
				}
				;
				this.mf.onclick = function () {
					b.Ic() && null != b.Va && b.Va(b.Db.value);
				}
				;
				this.D();
			}

			Ic() {
				let a = this.Db.value;
				return 30 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.mf.disabled = !this.Ic();
			}
		}

		class class_ta {
		}

		class class_na {
			constructor() {
				this.ub = '';
				this.Jc = this.Lc = 0;
			}

			Ae() {
				return JSON.stringify({
					lat: this.Jc,
					lon: this.Lc,
					code: this.ub
				});
			}

			static Mh(a) {
				return class_na.dg(JSON.parse(a));
			}

			static dg(a) {
				let b = new class_na;
				b.Jc = a.lat;
				b.Lc = a.lon;
				b.ub = a.code.toLowerCase();
				return b;
			}

			static Yo() {
				return class_Z.Jk(class_n.Pe + 'api/geo').then(function (a) {
					return class_na.dg(a);
				});
			}
		}

		class class_uc {
			constructor(a, b) {
				this.r = new RegExp(a, b.split('u').join(''));
			}

			match(a) {
				this.r.global && (this.r.lastIndex = 0);
				this.r.pc = this.r.exec(a);
				this.r.lh = a;
				return null != this.r.pc;
			}

			nn(a) {
				if (null != this.r.pc && 0 <= a && a < this.r.pc.length)
					return this.r.pc[a];
				throw class_v.A('EReg::matched');
			}

			Vs() {
				if (null == this.r.pc)
					throw class_v.A('No string matched');
				return {
					vj: this.r.pc.index,
					Ss: this.r.pc[0].length
				};
			}

			Us(a, b) {
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

		class class_xc {
			constructor() {
				this.hash = 0;
			}

			Ds(a) {
				let b = 0
					,
					c = a.length;
				for (; b < c;)
					this.hash = (this.hash += a[b++]) + (this.hash << 10),
						this.hash ^= this.hash >>> 6;
			}
		}

		class class_J {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Ta = b;
				this.a = 0;
			}

			sb(a) {
				null == a && (a = this.s.byteLength - this.a);
				if (this.a + a > this.s.byteLength)
					throw class_v.A('Read too much');
				let b = new Uint8Array(this.s.buffer, this.s.byteOffset + this.a, a);
				this.a += a;
				return b;
			}

			Vl(a) {
				let b = this.sb(a);
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

			vi() {
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

			hb() {
				let a = this.s.getUint32(this.a, this.Ta);
				this.a += 4;
				return a;
			}

			ui() {
				let a = this.s.getFloat32(this.a, this.Ta);
				this.a += 4;
				return a;
			}

			v() {
				let a = this.s.getFloat64(this.a, this.Ta);
				this.a += 8;
				return a;
			}

			Bb() {
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
					c = class_J.Co(this.s, b),
						b += c.length,
						d += String.fromCodePoint(c.char);
				if (b != a)
					throw class_v.A('Actual string length differs from the specified: ' + (b - a) + ' bytes');
				this.a = b;
				return d;
			}

			Ab() {
				let a = this.Bb();
				return 0 >= a ? null : this.pe(a - 1);
			}

			kc() {
				return this.pe(this.Bb());
			}

			Xl() {
				return this.pe(this.F());
			}

			Hg() {
				let a = this.kc();
				return JSON.parse(a);
			}

			static Co(a, b) {
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
					throw class_v.A('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
				return {
					char: c,
					length: b - h
				};
			}
		}

		class class_Jc {
			static tf(a) {
				a = a.split(' ');
				let b = a[4];
				if ('typ' != a[6])
					throw class_v.A(null);
				return {
					ns: a[7],
					rp: b
				};
			}
		}

		class class_B {
			static Mp() {
				class_C.pj(function () {
					class_B.Ak(class_B.Vq);
				});
				class_B.Dp();
			}

			static Dp() {
				let a = class_n.j.Tj.C();
				null == a ? class_U.Ro().then(function (b) {
					class_B.Ue = b;
					class_n.j.Tj.sa(b.ks());
				}).catch(function () {
				}) : class_U.Qo(a).then(function (b) {
					return class_B.Ue = b;
				}).catch(function () {
				});
			}

			static Uo() {
				let a = class_Ec.fn();
				return null != a ? null != a.getItem('crappy_router') : false;
			}

			static Ak(a) {
				let b = new class_sb(class_n.j.ne.C());
				b.ul = function (c) {
					class_n.j.ne.sa(c);
					class_n.Na.km();
					a();
				}
				;
				class_C.La(b.f);
				b.Db.focus();
			}

			static Bk(a, b) {
				a = new class_ca(a);
				a.Va = b;
				class_C.La(a.f);
			}

			static Go(a, b) {
				function c() {
					let f = new class_ab('Failed', null);
					f.Va = function () {
						class_B.xb();
					}
					;
					class_C.La(f.f);
				}

				function d(f) {
					f = f.sitekey;
					if (null == f)
						throw class_v.A(null);
					class_B.Bk(f, function (g) {
						e(a, g);
					});
				}

				class_C.La((new class_ba('Connecting', 'Connecting...', [])).f);
				let e = null;
				e = function (f, g) {
					class_Z.Rl(class_n.Pe + 'api/client', 'room=' + f + '&rcr=' + g, class_Z.Fj).then(function (h) {
						switch (h.action) {
							case 'connect':
								h = h.token;
								if (null == h)
									throw class_v.A(null);
								b(h);
								break;
							case 'recaptcha':
								d(h);
								break;
							default:
								throw class_v.A(null);
						}
					}).catch(function () {
						c();
					});
				}
				;
				e(a, '');
			}

			static Vq() {
				let a = class_Dc.C()
					,
					b = a.get('c')
					,
					c = a.get('p');
				a.get('v');
				null != b ? null != c ? class_B.Ih(b) : class_B.ag(b) : class_B.xb();
			}

			static xb() {
				let a = new class_bb(class_n.j.Ph());
				class_C.La(a.Ja);
				a.pn = function (b) {
					if (9 != b.Ed.Rd) {
						let c;
						9 > b.Ed.Rd ? (b = 'Old version room',
							c = 'The room is running an older version, an update must have happened recently.') : (b = 'New version',
							c = 'The room is running a new version of haxball, refresh the site to update.');
						let d = new class_ba(b, c, ['Ok']);
						class_C.La(d.f);
						d.Va = function () {
							class_C.La(a.Ja);
							d.Va = null;
						};
					}
					else
						b.Ed.Jb ? class_B.Ih(b.aa) : class_B.ag(b.aa);
				}
				;
				a.at = function () {
					class_B.Ho();
				}
				;
				a.$s = function () {
					class_B.Ak(class_B.xb);
				}
				;
				a.ct = function () {
					class_B.Dk();
				}
				;
				a.bt = function (b) {
					class_B.Io(b);
				};
			}

			static Dk() {
				let a = new class_la(true)
					,
					b = window.document.createElement('div');
				b.className = 'view-wrapper';
				b.appendChild(a.f);
				class_C.La(b);
				a.pb = function () {
					class_B.xb();
				}
				;
				a.aq = function () {
					let c = new class_Kb
						,
						d = window.document.createElement('div');
					d.className = 'view-wrapper';
					d.appendChild(c.f);
					class_C.La(d);
					c.pb = function () {
						class_B.Dk();
					};
				};
			}

			static gi(a, b) {
				return '' + globalScope.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
			}

			static Ho() {
				let a = class_n.j.ne.C()
					,
					b = new class_wb('' + a + '\'s room');
				class_C.La(b.f);
				b.ji = function () {
					class_B.xb();
				}
				;
				b.gq = function (c) {
					function d() {
						if (!c.nt) {
							var t = new class_Ub;
							t.Rd = 9;
							t.B = g.lc;
							t.K = g.K.length;
							t.hf = k.rg + 1;
							t.ub = f.ub;
							t.Jb = null != k.Jb;
							t.Jc = f.Jc;
							t.Lc = f.Lc;
							var z = class_A.ia(16);
							t.fa(z);
							k.Oi(z.Sg());
						}
					}

					class_C.La((new class_ba('Creating room', 'Connecting...', [])).f);
					let e = null
						,
						f = class_n.j.Ph()
						,
						g = new class_ua;
					g.lc = c.name;
					let h = new class_wa;
					h.B = a;
					h.eb = true;
					h.country = f.ub;
					h.Zb = class_n.j.uh.C();
					g.K.push(h);
					let k = new class_cc({
						iceServers: class_n.ig,
						sj: class_n.Pe + 'api/host',
						state: g,
						version: 9
					});
					k.rg = c.Ws - 1;
					k.Jb = c.password;
					d();
					let l = new class_Aa(k)
						,
						m = false;
					k.rf = function (t, z) {
						class_B.Bk(t, function (L) {
							z(L);
							class_C.La(l.l.f);
							m = true;
						});
					}
					;
					let r = window.setInterval(function () {
						k.ra(class_Na.ma(k));
					}, 3E3);
					k.rl = function (t) {
						null != g.na(t) && k.ra(class_ka.ma(t, 'Bad actor', false));
					}
					;
					k.eq = function (t, z) {
						let L = z.kc();
						if (25 < L.length)
							throw class_v.A('name too long');
						let N = z.kc();
						if (3 < N.length)
							throw class_v.A('country too long');
						z = z.Ab();
						if (null != z && 2 < z.length)
							throw class_v.A('avatar too long');
						k.ra(class_Ma.ma(t, L, N, z));
						d();
					}
					;
					k.fq = function (t) {
						null != g.na(t) && k.ra(class_ka.ma(t, null, false));
					}
					;
					k.wg = function (t) {
						e = t;
						l.Lg = class_B.gi(t, null != k.Jb);
						m || (m = true,
							class_C.La(l.l.f));
					}
					;
					l.Nh.lq = function (t, z, L, N) {
						k.Mo(t, z, L, N);
					}
					;
					l.Nh.mq = function () {
						d();
					}
					;
					l.l.ke = function () {
						k.ja();
						l.ja();
						class_B.xb();
						window.clearInterval(r);
					}
					;
					l.$f.Og = function (t) {
						k.Jb = t;
						d();
						null != e && (l.Lg = class_B.gi(e, null != k.Jb));
					}
					;
					l.$f.Am = function (t) {
						k.Ni(t);
					}
					;
					l.$f.be = function_M(k, k.be);
				};
			}

			static Ih(a) {
				let b = new class_Lb;
				class_C.La(b.f);
				b.Va = function (c) {
					null == c ? class_B.xb() : class_B.ag(a, c);
				};
			}

			static Io(a) {
				try {
					let b = new class_rc(new class_dc(new Uint8Array(a), new class_ua, 3));
					b.qe.ke = function () {
						b.ja();
						class_B.xb();
					}
					;
					class_C.La(b.l.f);
				}
				catch (b) {
					let c = class_v.Kb(b).Fb();
					if (c instanceof class_Yb)
						a = new class_ba('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']),
							class_C.La(a.f),
							a.Va = function (d) {
								0 == d ? (d = window.top.location,
									window.top.open(d.protocol + '//' + d.hostname + (null != d.port ? ':' + d.port : '') + '/replay?v=' + c.Rd, '_self')) : class_B.xb();
							}
						;
					else {
						let d = new class_ba('Replay error', 'Couldn\'t load the file.', ['Ok']);
						class_C.La(d.f);
						d.Va = function () {
							d.Va = null;
							class_B.xb();
						};
					}
				}
			}

			static ag(a, b, c) {
				try {
					let d = class_B.Uo()
						,
						e = new class_ua
						,
						f = class_A.ia();
					f.oc(class_n.j.ne.C());
					f.oc(class_n.j.Ph().ub);
					f.Eb(class_n.j.uh.C());
					let g = new class_Qa(a, {
							iceServers: class_n.ig,
							sj: class_n.zs,
							state: e,
							version: 9,
							pt: f.Sg(),
							password: b,
							un: d,
							yn: c,
							Js: class_B.Ue
						})
						,
						h = new class_ob;
					h.ca('Connecting to master...');
					h.yh.onclick = function () {
						g.Jd = null;
						g.qf = null;
						g.ja();
						class_B.xb();
					}
					;
					class_C.La(h.f);
					let k = function (r, t) {
							r = new class_ab(r, t);
							r.Va = function () {
								class_B.xb();
							}
							;
							class_C.La(r.f);
						}
						,
						l = function () {
							let r = new class_ba('Connection Failed', '', ['Ok']);
							r.ce.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
							r.Va = function () {
								class_B.xb();
							}
							;
							class_C.La(r.f);
						}
						,
						m = function () {
							let r = new class_Aa(g);
							g.vl = function (t) {
								r.l.Ff.Qr(g.Eg.jh() | 0, g.Eg.max() | 0);
								r.l.Ff.Fl.Kn(t);
							}
							;
							r.Lg = class_B.gi(a, false);
							class_C.La(r.l.f);
							r.l.ke = function () {
								g.Jd = null;
								g.ja();
								r.ja();
								class_B.xb();
							}
							;
							g.Jd = function () {
								g.Jd = null;
								r.ja();
								let t = null == r.Od ? null : r.Od.stop();
								k(g.vk, t);
							};
						};
					g.qf = function (r) {
						g.qf = null;
						g.Jd = null;
						switch (r.nb) {
							case 1:
								l();
								break;
							case 2:
								switch (r.reason) {
									case 4004:
										class_B.Go(a, function (t) {
											class_B.ag(a, b, t);
										});
										break;
									case 4101:
										null == b ? class_B.Ih(a) : k(class_Qa.Ch(r), null);
										break;
									default:
										k(class_Qa.Ch(r), null);
								}
								break;
							default:
								k(class_Qa.Ch(r), null);
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
								m();
						}
					}
					;
					g.qq = function () {
						h.ca('Trying reverse connection...');
					};
				}
				catch (d) {
					c = class_v.Kb(d).Fb(),
						globalScope.console.log(c),
						c = new class_ba('Unexpected Error', '', []),
						c.ce.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.',
						class_C.La(c.f);
				}
			}
		}

		class class_cb {
			constructor() {
				this.gg = this.Yh = false;
				this.f = class_x.Ha(class_cb.O);
				let a = class_x.Aa(this.f);
				this.hd = a.get('log');
				this.ci = a.get('log-contents');
				this.Za = a.get('input');
				this.Za.maxLength = 140;
				let b = this;
				a.get('drag').onmousedown = function (c) {
					function d(h) {
						h.preventDefault();
						class_n.j.fk.sa(function_fc(function_fc(e + (f - h.y))));
						b.Za.blur();
						b.gg = false;
						b.wf();
					}

					b.f.classList.add('dragging');
					let e = b.jk()
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
				this.Fc = new class_bc(a.get('autocompletebox'), function (c, d) {
						b.Za.value = c;
						b.Za.setSelectionRange(d, d);
					}
				);
				this.Za.onkeydown = function (c) {
					switch (c.keyCode) {
						case 9:
							c.preventDefault();
							b.Fc.Pb.hidden ? b.Za.blur() : b.Fc.Jo();
							break;
						case 13:
							null != b.xl && '' != b.Za.value && b.xl(b.Za.value);
							b.Za.value = '';
							b.Za.blur();
							break;
						case 27:
							b.Fc.Pb.hidden ? (b.Za.value = '',
								b.Za.blur()) : b.Fc.Uh();
							break;
						case 38:
							b.Fc.ck(-1);
							break;
						case 40:
							b.Fc.ck(1);
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
					b.Fc.$n(b.Za.value, b.Za.selectionStart);
				}
				;
				this.wf();
			}

			ls() {
				this.gg = !this.gg;
				this.wf();
			}

			wf() {
				let a = '' + this.jk();
				this.f.style.height = a + 'px';
			}

			jk() {
				let a = function_fc(class_n.j.fk.C());
				if (this.Yh) {
					let b = function_fc(class_n.j.Ah.C());
					a <= b && (a = b);
				}
				else
					this.gg && (a = 0);
				return a;
			}

			Lp(a, b, c) {
				let d = window.document.createElement('p');
				d.className = 'announcement';
				d.textContent = a;
				0 <= b && (d.style.color = class_V.nc(b));
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
				this.cl(d);
			}

			cl(a) {
				var b = this.hd.clientHeight;
				b = this.hd.scrollTop + b - this.hd.scrollHeight >= .5 * -b || !class_cb.sp(this.hd);
				this.ci.appendChild(a);
				b && (this.hd.scrollTop = this.hd.scrollHeight);
				for (a = b ? 50 : 100; this.ci.childElementCount > a;)
					this.ci.firstElementChild.remove();
			}

			ca(a, b) {
				let c = window.document.createElement('p');
				null != b && (c.className = b);
				c.textContent = a;
				this.cl(c);
			}

			Hb(a) {
				this.ca(a, 'notice');
			}

			static sp(a) {
				return a.parentElement.querySelector(':hover') == a;
			}
		}

		class class_Ka {
			constructor(a) {
				function b() {
					let t = g[f];
					a.Hl = e ? t : 0;
					c.get('spd').textContent = t + 'x';
				}

				this.jg = false;
				this.f = class_x.Ha(class_Ka.O);
				let c = class_x.Aa(this.f);
				this.Bi = a;
				let d = this;
				c.get('reset').onclick = function () {
					a.Ci();
					d.wl();
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
				this.fs = c.get('time');
				let k = c.get('timebar');
				this.Yq = c.get('progbar');
				let l = c.get('timetooltip')
					,
					m = 0
					,
					r = a.jl;
				for (; m < r.length;) {
					let t = r[m];
					++m;
					let z = window.document.createElement('div');
					z.className = 'marker';
					z.classList.add('k' + t.kind);
					z.style.left = 100 * t.vj + '%';
					k.appendChild(z);
				}
				k.onclick = function (t) {
					a.Dr((t.pageX - k.offsetLeft) / k.clientWidth * a.qh * a.xf);
					d.jg || (d.jg = true,
						d.tq(),
						d.wl());
				}
				;
				k.onmousemove = function (t) {
					t = (t.pageX - k.offsetLeft) / k.clientWidth;
					l.textContent = class_Ka.kl(a.xf * a.qh * t);
					return l.style.left = 'calc(' + 100 * t + '% - 30px)';
				}
				;
				this.Bp = c.get('leave');
				this.Bp.onclick = function () {
					class_H.i(d.ke);
				};
			}

			D() {
				this.fs.textContent = class_Ka.kl(this.Bi.Tb);
				this.Yq.style.width = 100 * this.Bi.Zo() + '%';
				!this.jg || 0 < this.Bi.Pd || (this.jg = false,
					this.sq());
			}

			static kl(a) {
				a = a / 1E3 | 0;
				return (a / 60 | 0) + ':' + class_Y.Kf(class_Q.Fe(a % 60));
			}
		}

		class class_ca {
			constructor(a) {
				let b = new class_ba('Only humans', '', []);
				this.f = b.f;
				b.ce.style.minHeight = '78px';
				let c = this;
				class_ub.Cp().then(function (d) {
					null == class_ca.Ig && (class_ca.Ig = window.document.createElement('div'),
						b.ce.appendChild(class_ca.Ig),
						class_ca.ar = d.render(class_ca.Ig, {
							sitekey: a,
							callback: function (e) {
								class_E.i(class_ca.Zl, e);
							},
							theme: 'dark'
						}));
					d.reset(class_ca.ar);
					class_ca.Zl = function (e) {
						window.setTimeout(function () {
							class_E.i(c.Va, e);
						}, 1E3);
						class_ca.Zl = null;
					}
					;
					b.ce.appendChild(class_ca.Ig);
				});
			}
		}

		class class_Wb {
			static i(a, b, c, d, e) {
				null != a && a(b, c, d, e);
			}
		}

		class class_ib {
			constructor(a, b) {
				this.f = class_x.Ha(class_ib.O);
				let c = class_x.Aa(this.f);
				this.kf = c.get('name');
				this.Tf = c.get('admin');
				this.af = c.get('kick');
				this.wd = c.get('close');
				let d = this;
				this.Tf.onclick = function () {
					class_Ha.i(d.Zp, d.Qb, !d.Il);
				}
				;
				this.af.onclick = function () {
					class_E.i(d.li, d.Qb);
				}
				;
				this.wd.onclick = function () {
					class_H.i(d.pb);
				}
				;
				this.Qb = a.X;
				this.Rj(a.B);
				this.Qj(a.eb);
				this.Tf.disabled = !b || 0 == this.Qb;
				this.af.disabled = !b || 0 == this.Qb;
			}

			D(a, b) {
				a = a.na(this.Qb);
				null == a ? class_H.i(this.pb) : (this.rs(a),
					this.Tf.disabled = !b || 0 == this.Qb,
					this.af.disabled = !b || 0 == this.Qb);
			}

			rs(a) {
				this.ne != a.B && this.Rj(a.B);
				this.Il != a.eb && this.Qj(a.eb);
			}

			Rj(a) {
				this.ne = a;
				this.kf.textContent = a;
			}

			Qj(a) {
				this.Il = a;
				this.Tf.textContent = a ? 'Remove Admin' : 'Give Admin';
			}
		}

		class class_Oa {
		}

		class class_ec {
			constructor(a) {
				this.Xs = a;
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
				b >= this.Xs ? (b = this.ab[c],
					this.Yd -= b.weight,
					this.ab.splice(c, 1)) : b = new class_gc;
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

		class class_db extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.mo(this.$g);
			}

			va(a) {
				a.lb(this.$g.byteLength);
				a.Vg(this.$g);
			}

			wa(a) {
				this.$g = a.Vl(a.Bb());
			}
		}

		class class_oa extends class_W {
			constructor(a) {
				class_W.yb ? super() : (class_W.yb = true,
					super(),
					class_W.yb = false,
					this.Ya(a));
			}

			Ya(a) {
				this.aj = new class_eb;
				this.Be = this.ec = 0;
				this.te = new class_eb;
				this.xc = this.dc = this.Ad = 0;
				this.Ec = .06;
				this.qh = 16.666666666666668;
				this.Rf = 120;
				super.Ya(a);
			}

			ra() {
				throw class_v.A('missing implementation');
			}

			eg() {
				throw class_v.A('missing implementation');
			}

			D() {
				throw class_v.A('missing implementation');
			}

			Mj(a) {
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
						if (f.mb != this.$)
							break;
						f.apply(this.U);
						null != this.hc && this.hc(f);
						this.ec++;
						++c;
					}
					this.U.D(1);
					this.Be += this.ec;
					this.ec = 0;
					this.$++;
				}
				for (; c < d;) {
					a = b[c];
					if (a.mb != this.$ || a.Dc != this.ec)
						break;
					a.apply(this.U);
					null != this.hc && this.hc(a);
					this.ec++;
					++c;
				}
				b.splice(0, c);
			}

			Mg(a) {
				a.mb == this.$ && a.Dc <= this.ec ? (a.Dc = this.ec++,
					a.apply(this.U),
				null != this.hc && this.hc(a)) : this.te.hn(a);
			}

			Mk(a, b) {
				if (0 >= a)
					return this.U;
				a > this.Rf && (a = this.Rf);
				class_ta.Cc++;
				let c = this.U.uc();
				null != b ? (this.aj.Gs(this.te, b),
					b = this.aj) : b = this.te;
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
						if (k.mb > f)
							break;
						k.Jf.Ba && k.apply(c);
						++d;
					}
					c.D(f != h ? 1 : a - g);
					++f;
				}
				for (a = this.aj.list; 0 < a.length;)
					a.pop();
				return c;
			}

			Lr(a) {
				300 < a && (a = 300);
				0 > a && (a = 0);
				this.dc = this.Ec * a | 0;
			}

			ym(a) {
				this.Ad = this.Ec * (-200 > a ? -200 : 1E3 < a ? 1E3 : a);
			}
		}

		class class_Qa extends class_oa {
			constructor(a, b) {
				class_W.yb = true;
				super();
				class_W.yb = false;
				this.Ya(a, b);
			}

			Ya(a, b) {
				this.Mi = [];
				this.xi = [];
				this.Fg = new class_eb;
				this.Vp = 1;
				this.yd = this.Qm = 0;
				this.$i = new class_ec(50);
				this.Eg = new class_ec(50);
				this.Dn = 1E3;
				this.vk = '';
				super.Ya(b.state);
				this.Zh = b.pt;
				this.Ue = b.Js;
				let c = null
					,
					d = this;
				c = function (e) {
					d.Ef(0);
					let f = class_A.ia();
					f.Wb(b.version);
					f.Eb(b.password);
					d.rc = new class_$b(b.sj, b.iceServers, a, class_tc.channels, f, b.yn);
					d.rc.th = e;
					d.rc.Id = function (h) {
						d.rc = null;
						d.pa = h;
						h.xg = function (k) {
							k = new class_J(new DataView(k));
							d.Sq(k);
						}
						;
						h.pf = function () {
							3 != d.yd && class_E.i(d.qf, ia.Pf('Connection closed'));
							d.ja();
						}
						;
						h = window.setTimeout(function () {
							class_E.i(d.qf, ia.Pf('Game state timeout'));
							d.ja();
						}, 1E4);
						d.ze = h;
						d.Ef(2);
					}
					;
					d.rc.yl = function () {
						d.Ef(1);
					}
					;
					let g = false;
					d.rc.ql = function () {
						g = true;
					}
					;
					d.rc.kd = function (h) {
						if (!e && 1 == d.yd && g)
							class_H.i(d.qq),
								c(true);
						else {
							let k = class_$b.Wo(h);
							switch (h.nb) {
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
							class_E.i(d.qf, h);
							d.ja(k);
						}
					};
				}
				;
				c(null != b.un && b.un);
			}

			ja(a) {
				null != this.rc && (this.rc.kd = null,
					this.rc.Zn(),
					this.rc = null);
				window.clearTimeout(this.ze);
				null != this.pa && (this.pa.pf = null,
					this.pa.ja(),
					this.pa = null);
				this.vk = null == a ? 'Connection closed' : a;
				this.Ef(4);
			}

			Ef(a) {
				this.yd != a && (this.yd = a,
				null != this.Jd && this.Jd(a));
			}

			Fd() {
				return 3 == this.yd;
			}

			D() {
				this.Fd() && window.performance.now() - this.Qm > this.Dn && this.Ii();
				this.dd = window.performance.now() * this.Ec + this.$i.jh() - this.$;
				this.ak();
			}

			eg() {
				return this.Fd() ? (0 > this.dc && (this.dc = 0),
					this.Mk(window.performance.now() * this.Ec + this.$i.jh() - this.$ + this.dc + this.Ad, this.Fg)) : this.U;
			}

			ak() {
				0 > this.dd && (this.dd = 0);
				this.dd > this.Rf && (this.dd = this.Rf);
			}

			Sq(a) {
				switch (a.F()) {
					case 0:
						this.Pq(a);
						break;
					case 1:
						this.Oq(a);
						break;
					case 2:
						this.Lq(a);
						break;
					case 3:
						this.Uq(a);
						break;
					case 4:
						this.Rq(a);
						break;
					case 5:
						this.Nq(a);
						break;
					case 6:
						this.Tq(a);
				}
			}

			Pq(a) {
				a = a.sb(a.Bb());
				let b = Promise.resolve(null);
				null != this.Ue && (b = this.Ue.Xr(a));
				let c = this;
				b.catch(function () {
					return null;
				}).then(function (d) {
					c.Hr(d);
				});
			}

			Oq(a) {
				a = pako.inflateRaw(a.sb());
				a = new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength));
				this.xc = a.Rb();
				this.$ = a.hb();
				this.Be = a.hb();
				this.ec = a.Bb();
				this.dd = 10;
				for (this.U.ka(a); 0 < a.s.byteLength - a.a;)
					this.Mg(this.Xm(a));
				window.clearTimeout(this.ze);
				this.Ef(3);
			}

			Hr(a) {
				let b = class_A.ia();
				b.m(0);
				null != a ? (b.lb(a.byteLength),
					b.Xb(a)) : b.lb(0);
				b.lb(this.Zh.byteLength);
				b.Vg(this.Zh);
				this.Ub(b);
				this.Zh = null;
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.pa.Ub(b, a);
			}

			Xm(a) {
				let b = a.hb()
					,
					c = a.Bb()
					,
					d = a.Rb()
					,
					e = a.hb();
				a = class_p.oh(a);
				a.R = d;
				a.Ce = e;
				a.mb = b;
				a.Dc = c;
				return a;
			}

			Lq(a) {
				a = this.Xm(a);
				this.Mg(a);
				a.R == this.xc && this.Fg.ht(a.Ce);
				this.Tl();
			}

			Tq(a) {
				a = class_p.oh(a);
				a.R = 0;
				a.Ce = 0;
				a.apply(this.U);
				null != this.hc && this.hc(a);
			}

			Uq(a) {
				let b = a.hb();
				a = a.hb();
				this.xi.push({
					frame: b,
					If: a
				});
				this.Tl();
			}

			Tl() {
				if (3 == this.yd) {
					for (var a = 0, b = this.xi; a < b.length;) {
						var c = b[a];
						++a;
						c.frame <= this.$ || c.If == this.Be + this.ec + this.te.Hs(c.frame) && this.Mn(c.frame - this.$);
					}
					a = 0;
					b = this.xi;
					c = 0;
					for (var d = b.length; c < d;) {
						let e = b[c++];
						e.frame > this.$ && (b[a] = e,
							++a);
					}
					for (; b.length > a;)
						b.pop();
					this.Fg.gt(this.$);
				}
			}

			Nq(a) {
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

			Rq(a) {
				var b = a.v();
				a = a.v();
				let c = window.performance.now() - a;
				this.$i.add(b - a * this.Ec);
				this.Eg.add(c);
				let d = b = 0
					,
					e = this.Mi;
				for (; d < e.length;) {
					let f = e[d];
					++d;
					if (f > a)
						break;
					f < a ? class_E.i(this.vl, -1) : class_E.i(this.vl, c);
					++b;
				}
				this.Mi.splice(0, b);
			}

			Ii() {
				let a = window.performance.now();
				this.Qm = a;
				this.Mi.push(a);
				let b = this.Eg.jh() | 0
					,
					c = class_A.ia();
				c.m(2);
				c.u(a);
				c.lb(b);
				this.Ub(c, 2);
			}

			Mn(a) {
				this.Mj(a);
				this.dd -= a;
				this.ak();
			}

			ra(a) {
				if (3 == this.yd) {
					var b = this.Vp++
						,
						c = 0;
					0 > this.dc && (this.dc = 0);
					a.Jf.delay && (c = this.$ + (this.dd | 0) + this.dc);
					var d = class_A.ia();
					d.m(1);
					d.tb(c);
					d.tb(b);
					class_p.uj(a, d);
					this.Ub(d);
					a.Jf.Ba && (a.Ce = b,
						a.R = this.xc,
						a.mb = c,
						this.Fg.hn(a));
				}
			}

			static Ch(a) {
				switch (a.nb) {
					case 0:
						return 'Cancelled';
					case 1:
						return 'Failed to connect to peer.';
					case 2:
						return class_Hc.description(a.reason);
					case 3:
						return a.description;
				}
			}
		}

		class class_cc extends class_oa {
			constructor(a) {
				class_W.yb = true;
				super();
				class_W.yb = false;
				this.Ya(a);
			}

			Ya(a) {
				this.Xj = new Map;
				this.Jb = null;
				this.rg = 32;
				this.Te = new Map;
				this.class_cc = [];
				this.Fi = 2;
				this.fo = 600;
				super.Ya(a.state);
				this.Pp = a.sj;
				this.ws = a.version;
				this.Qp = 1;
				this.Yk = this.xc = 0;
				this.Vi = window.performance.now();
				this.Nc = new class_yb(this.Pp, a.iceServers, class_tc.channels, a.yn);
				this.Nc.kk = function_M(this, this.hp);
				let b = this;
				this.Nc.tl = function (c) {
					b.jq(c);
				}
				;
				this.Nc.wg = function (c) {
					class_E.i(b.wg, c);
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
					b = this.class_cc;
				for (; a < b.length;) {
					let c = b[a++].pa;
					c.pf = null;
					c.xg = null;
					c.ja();
				}
			}

			Mo(a, b, c, d) {
				let e = this.Te.get(a);
				if (null != e) {
					if (d) {
						let f = this.Nc.Qn(e.pa);
						this.Xj.set(a, f);
					}
					a = class_A.ia();
					a.m(5);
					a.m(d ? 1 : 0);
					a.oc(b);
					null == c && (c = '');
					a.oc(c);
					e.Ub(a);
					e.pa.ja();
				}
			}

			be() {
				this.Nc.be();
				this.Xj.clear();
			}

			Oi(a) {
				this.Nc.Oi(a);
			}

			Ni(a) {
				this.Nc.Ni(a);
			}

			ra(a) {
				a.R = 0;
				let b = this.$ + this.Fi + this.dc;
				a.Jf.delay || (b = this.$);
				a.mb = b;
				this.Mg(a);
				this.Li();
				0 < this.class_cc.length && this.Ng(this.fi(a), 1);
			}

			D() {
				let a = ((window.performance.now() - this.Vi) * this.Ec | 0) - this.$;
				0 < a && this.Mj(a);
				7 <= this.$ - this.Zk && this.Li();
				this.$ - this.Yk >= this.fo && (this.Li(),
					this.Fr());
			}

			eg() {
				0 > this.dc && (this.dc = 0);
				return this.Mk((window.performance.now() - this.Vi) * this.Ec - this.$ + this.Fi + this.dc + this.Ad);
			}

			hp(a, b) {
				if (this.class_cc.length >= this.rg)
					return fb.Qf(4100);
				try {
					if (b.Rb() != this.ws)
						throw class_v.A(null);
				}
				catch (c) {
					return fb.Qf(4103);
				}
				try {
					let c = b.Ab();
					if (null != this.Jb && c != this.Jb)
						throw class_v.A(null);
				}
				catch (c) {
					return fb.Qf(4101);
				}
				return fb.Ej;
			}

			jq(a) {
				if (this.class_cc.length >= this.rg)
					a.ja();
				else {
					var b = new class_wc(a);
					this.class_cc.push(b);
					var c = this;
					a.xg = function (d) {
						d = new class_J(new DataView(d));
						c.Mq(d, b);
					}
					;
					a.pf = function () {
						class_O.remove(c.class_cc, b);
						c.Te.delete(b.aa);
						class_E.i(c.fq, b.aa);
					}
					;
					a = class_A.ia(1 + b.Se.byteLength);
					a.m(0);
					a.lb(b.Se.byteLength);
					a.Xb(b.Se);
					b.Ub(a);
				}
			}

			fi(a) {
				let b = class_A.ia();
				b.m(2);
				this.Al(a, b);
				return b;
			}

			Al(a, b) {
				b.tb(a.mb);
				b.lb(a.Dc);
				b.Wb(a.R);
				b.tb(a.Ce);
				class_p.uj(a, b);
			}

			Li() {
				if (!(0 >= this.$ - this.Zk) && 0 != this.class_cc.length) {
					var a = class_A.ia();
					a.m(3);
					a.tb(this.$);
					a.tb(this.Be);
					this.Ng(a, 2);
					this.Zk = this.$;
				}
			}

			Ng(a, b) {
				null == b && (b = 0);
				let c = 0
					,
					d = this.class_cc;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.Jg && e.Ub(a, b);
				}
			}

			Gr(a) {
				let b = class_A.ia();
				b.m(1);
				let c = class_A.ia();
				c.Wb(a.aa);
				c.tb(this.$);
				c.tb(this.Be);
				c.lb(this.ec);
				this.U.fa(c);
				let d = this.te.list
					,
					e = 0
					,
					f = d.length;
				for (; e < f;)
					this.Al(d[e++], c);
				b.Xb(pako.deflateRaw(c.Vb()));
				a.Ub(b);
			}

			Fr() {
				this.Yk = this.$;
				if (0 != this.class_cc.length) {
					var a = new class_db;
					a.mb = this.$;
					a.Dc = this.ec++;
					a.R = 0;
					a.$g = this.U.To();
					this.Ng(this.fi(a));
				}
			}

			Wq(a, b) {
				let c = a.sb(a.Bb())
					,
					d = a.sb(a.Bb());
				a = b.Se;
				b.Se = null;
				let e = this;
				class_U.vs(c, a).catch(function () {
					return null;
				}).then(function (f) {
					try {
						if (-1 != e.class_cc.indexOf(b)) {
							b.qt = f;
							var g = e.Qp++;
							b.aa = g;
							e.Te.set(g, b);
							class_Ha.i(e.eq, g, new class_J(new DataView(d.buffer, d.byteOffset, d.byteLength), false));
							b.Jg = true;
							e.Gr(b);
						}
					}
					catch (h) {
						f = class_v.Kb(h).Fb(),
							e.Nk(b, f);
					}
				});
			}

			Mq(a, b) {
				this.D();
				try {
					if (!b.$o.Tm())
						throw class_v.A(1);
					let c = a.F();
					if (b.Jg)
						switch (c) {
							case 1:
								this.Xq(a, b);
								break;
							case 2:
								this.Qq(a, b);
								break;
							default:
								throw class_v.A(0);
						}
					else if (0 == c)
						this.Wq(a, b);
					else
						throw class_v.A(0);
					if (0 < a.s.byteLength - a.a)
						throw class_v.A(2);
				}
				catch (c) {
					this.Nk(b, class_v.Kb(c).Fb());
				}
			}

			Nk(a, b) {
				globalScope.console.log(b);
				this.Te.delete(a.aa);
				class_O.remove(this.class_cc, a);
				a.Jg && null != this.rl && this.rl(a.aa);
				a.pa.ja();
			}

			Qq(a, b) {
				let c = a.v();
				b.zb = a.Bb();
				a = class_A.ia();
				a.m(4);
				a.u((window.performance.now() - this.Vi) * this.Ec + this.Fi);
				a.u(c);
				b.Ub(a, 2);
			}

			Xq(a, b) {
				let c = a.hb()
					,
					d = a.hb();
				a = class_p.oh(a);
				var e = a.Jf.wj;
				if (null != e) {
					var f = b.Kj.get(e);
					null == f && (f = new class_hb(e.jj, e.Cj),
						b.Kj.set(e, f));
					if (!f.Tm())
						throw class_v.A(3);
				}
				e = this.$;
				f = this.$ + 20;
				c < e ? c = e : c > f && (c = f);
				a.Ce = d;
				a.R = b.aa;
				a.mb = c;
				a.rn(this.U) && (this.Mg(a),
					this.Ng(this.fi(a), 1));
			}
		}

		class class_dc extends class_oa {
			constructor(a, b, c) {
				class_W.yb = true;
				super();
				class_W.yb = false;
				this.Ya(a, b, c);
			}

			Ya(a, b, c) {
				this.jl = [];
				this.Hl = 5;
				this.Pd = -1;
				this.tg = this.Tb = this.ai = this.Ik = 0;
				super.Ya(b);
				a = new class_J(new DataView(a.buffer), false);
				if (1212305970 != a.hb())
					throw class_v.A('');
				b = a.hb();
				if (c != b)
					throw class_v.A(new class_Yb(b));
				this.xf = a.hb();
				c = pako.inflateRaw(a.sb());
				this.Rc = new class_J(new DataView(c.buffer, c.byteOffset, c.byteLength));
				this.$q(this.Rc);
				c = this.Rc.sb();
				this.Rc = new class_J(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
				this.Ci();
				this.ai = window.performance.now();
				this.xc = -1;
			}

			$q(a) {
				let b = a.Rb()
					,
					c = 0
					,
					d = 0;
				for (; d < b;) {
					++d;
					c += a.Bb();
					let e = a.F();
					this.jl.push({
						vj: c / this.xf,
						kind: e
					});
				}
			}

			Wl() {
				var a = this.Rc;
				0 < a.s.byteLength - a.a ? (a = this.Rc.Bb(),
					this.tg += a,
					a = this.Rc.Rb(),
					this.sg = class_p.oh(this.Rc),
					this.sg.R = a) : this.sg = null;
			}

			Zo() {
				return this.$ / this.xf;
			}

			ra() {
			}

			eg() {
				this.D();
				class_ta.Cc++;
				let a = this.U.uc();
				a.D(this.Ik);
				return a;
			}

			D() {
				var a = window.performance.now()
					,
					b = a - this.ai;
				this.ai = a;
				0 < this.Pd ? (this.Tb += 1E4,
				this.Tb > this.Pd && (this.Tb = this.Pd,
					this.Pd = -1)) : this.Tb += b * this.Hl;
				a = this.xf * this.qh;
				this.Tb > a && (this.Tb = a);
				b = this.Tb * this.Ec;
				a = b | 0;
				for (this.Ik = b - a; this.$ < a;) {
					for (; null != this.sg && this.tg == this.$;)
						b = this.sg,
							b.apply(this.U),
						null != this.hc && this.hc(b),
							this.Wl();
					this.$++;
					this.U.D(1);
				}
			}

			Dr(a) {
				this.Pd = a;
				a < this.Tb && this.Ci();
			}

			Ci() {
				this.tg = 0;
				this.Tb = this.$ = this.Rc.a = 0;
				this.U.ka(this.Rc);
				this.Wl();
			}
		}

		class class_Ba extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.R);
				null != b && this.hh != b.Td && (b.Td = this.hh,
					class_E.i(a.Kl, b));
			}

			va(a) {
				a.m(this.hh ? 1 : 0);
			}

			wa(a) {
				this.hh = 0 != a.F();
			}

			static ma(a) {
				let b = new class_Ba;
				b.hh = a;
				return b;
			}
		}

		class class_Gb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				0 == this.R && class_Wb.i(a.mm, this.$c, this.color, this.style, this.xn);
			}

			va(a) {
				a.oc(class_ha.Xc(this.$c, 1E3));
				a.P(this.color);
				a.m(this.style);
				a.m(this.xn);
			}

			wa(a) {
				this.$c = a.kc();
				if (1E3 < this.$c.length)
					throw class_v.A('message too long');
				this.color = a.N();
				this.style = a.F();
				this.xn = a.F();
			}
		}

		class class_Ta extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					for (var b = a.na(this.R), c = a.K, d = [], e = 0, f = 0, g = 0; g < c.length;) {
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

		class class_ra extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R) && null == a.M)
					switch (this.zj) {
						case 0:
							var b = this.newValue;
							a.ib = 0 > b ? 0 : 99 < b ? 99 : b;
							break;
						case 1:
							b = this.newValue,
								a.Fa = 0 > b ? 0 : 99 < b ? 99 : b;
					}
			}

			va(a) {
				a.P(this.zj);
				a.P(this.newValue);
			}

			wa(a) {
				this.zj = a.N();
				this.newValue = a.N();
			}

			static ma(a, b) {
				let c = new class_ra;
				c.zj = a;
				c.newValue = b;
				return c;
			}
		}

		class class_Ea extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.na(this.R)
						,
						c = a.na(this.Ud);
					null != c && 0 != c.X && c.eb != this.gh && (c.eb = this.gh,
					null != a.pi && a.pi(b, c));
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

			static ma(a, b) {
				let c = new class_Ea;
				c.Ud = a;
				c.gh = b;
				return c;
			}
		}

		class class_Ja extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a = a.na(this.R);
				null != a && (a.Zb = this.ac);
			}

			va(a) {
				a.Eb(this.ac);
			}

			wa(a) {
				this.ac = a.Ab();
				null != this.ac && (this.ac = class_ha.Xc(this.ac, 2));
			}

			static ma(a) {
				let b = new class_Ja;
				b.ac = a;
				return b;
			}
		}

		class class_fa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.Ud);
				if (null != b) {
					var c = a.na(this.R)
						,
						d = a.Ob(this.R);
					(d = d || b == c && !a.Vc && null == a.M) && a.Yf(c, b, this.tj);
				}
			}

			va(a) {
				a.P(this.Ud);
				a.m(this.tj.aa);
			}

			wa(a) {
				this.Ud = a.N();
				a = a.vf();
				this.tj = 1 == a ? class_u.ga : 2 == a ? class_u.Ca : class_u.Ma;
			}

			static ma(a, b) {
				let c = new class_fa;
				c.Ud = a;
				c.tj = b;
				return c;
			}
		}

		class class_Ca extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.na(this.R);
					null == a.M && (a.T = this.Xd,
					null != a.Si && a.Si(b, this.Xd));
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
				a = pako.inflateRaw(a.sb(a.Rb()));
				this.Xd = class_q.ka(new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength)));
			}

			static ma(a) {
				let b = new class_Ca;
				b.Xd = a;
				return b;
			}
		}

		class class_$a extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && this.ea != class_u.Ma && (a.kb[this.ea.aa] = this.ah);
			}

			va(a) {
				a.m(this.ea.aa);
				this.ah.fa(a);
			}

			wa(a) {
				let b = a.vf();
				this.ea = 1 == b ? class_u.ga : 2 == b ? class_u.Ca : class_u.Ma;
				this.ah = new class_va;
				this.ah.ka(a);
			}
		}

		class class_Da extends class_p {
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

			static ma(a) {
				let b = new class_Da;
				b.newValue = a;
				return b;
			}
		}

		class class_Ma extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = new class_wa;
					b.X = this.X;
					b.B = this.name;
					b.country = this.mj;
					b.Zb = this.Zb;
					a.K.push(b);
					a = a.Ll;
					null != a && a(b);
				}
			}

			va(a) {
				a.P(this.X);
				a.Eb(this.name);
				a.Eb(this.mj);
				a.Eb(this.Zb);
			}

			wa(a) {
				this.X = a.N();
				this.name = a.Ab();
				this.mj = a.Ab();
				this.Zb = a.Ab();
			}

			static ma(a, b, c, d) {
				let e = new class_Ma;
				e.X = a;
				e.name = b;
				e.mj = c;
				e.Zb = d;
				return e;
			}
		}

		class class_Ib extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a = a.na(this.Ge);
				null != a && 0 == this.R && (a.Sd = this.ac);
			}

			va(a) {
				a.Eb(this.ac);
				a.P(this.Ge);
			}

			wa(a) {
				this.ac = a.Ab();
				this.Ge = a.N();
				null != this.ac && (this.ac = class_ha.Xc(this.ac, 2));
			}
		}

		class class_Va extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.M;
				if (null != b && a.Ob(this.R)) {
					var c = a.na(this.R)
						,
						d = 120 == b.Qa
						,
						e = 0 < b.Qa;
					this.Lf ? b.Qa = 120 : 120 == b.Qa && (b.Qa = 119);
					d != this.Lf && class_kc.i(a.El, c, this.Lf, e);
				}
			}

			va(a) {
				a.m(this.Lf ? 1 : 0);
			}

			wa(a) {
				this.Lf = 0 != a.F();
			}
		}

		class class_Ua extends class_p {
			constructor() {
				super();
			}

			rn(a) {
				if (null != a.Fq) {
					let b = a.na(this.R);
					return null == b ? false : a.Fq(b, this.$c);
				}
				return true;
			}

			apply(a) {
				let b = a.na(this.R);
				null != b && class_Ha.i(a.Jl, b, this.$c);
			}

			va(a) {
				a.oc(class_ha.Xc(this.$c, 140));
			}

			wa(a) {
				this.$c = a.kc();
				if (140 < this.$c.length)
					throw class_v.A('message too long');
			}
		}

		class class_La extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.R);
				if (null != b) {
					var c = this.input;
					0 == (b.Ea & 16) && 0 != (c & 16) && (b.Yb = true);
					b.Ea = c;
					null != a.Gq && a.Gq(b);
				}
			}

			va(a) {
				a.tb(this.input);
			}

			wa(a) {
				this.input = a.hb();
			}
		}

		class class_Fa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.R);
				null != b && class_Ha.i(a.Ol, b, this.Aj);
			}

			va(a) {
				a.m(this.Aj);
			}

			wa(a) {
				this.Aj = a.F();
			}

			static ma(a) {
				let b = new class_Fa;
				b.Aj = a;
				return b;
			}
		}

		class class_ka extends class_p {
			constructor() {
				class_p.yb = true;
				super();
				class_p.yb = false;
				this.Ya();
			}

			Ya() {
				this.Zg = false;
				super.Ya();
			}

			apply(a) {
				if (0 != this.X && a.Ob(this.R)) {
					var b = a.na(this.X);
					if (null != b) {
						var c = a.na(this.R);
						class_O.remove(a.K, b);
						null != a.M && class_O.remove(a.M.ua.H, b.J);
						class_Wb.i(a.Ml, b, this.pd, this.Zg, c);
					}
				}
			}

			va(a) {
				null != this.pd && (this.pd = class_ha.Xc(this.pd, 100));
				a.P(this.X);
				a.Eb(this.pd);
				a.m(this.Zg ? 1 : 0);
			}

			wa(a) {
				this.X = a.N();
				this.pd = a.Ab();
				this.Zg = 0 != a.F();
				if (null != this.pd && 100 < this.pd.length)
					throw class_v.A('string too long');
			}

			static ma(a, b, c) {
				let d = new class_ka;
				d.X = a;
				d.pd = b;
				d.Zg = c;
				return d;
			}
		}

		class class_Hb extends class_p {
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
					a.K = this.qn ? c.concat(d) : d.concat(c);
				}
			}

			va(a) {
				a.m(this.qn ? 1 : 0);
				a.m(this.ih.length);
				let b = 0
					,
					c = this.ih;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			wa(a) {
				this.qn = 0 != a.F();
				let b = a.F();
				this.ih = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.ih.push(a.N());
			}
		}

		class class_Jb extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = a.M;
					if (null != b) {
						if (this.jn) {
							a = a.na(this.Ge);
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
						null != this.Ka[4] && (a.oa.x = this.Ka[4]),
						null != this.Ka[5] && (a.oa.y = this.Ka[5]),
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
				a.m(this.jn ? 1 : 0);
				let b = a.a;
				a.Wb(0);
				let c = 0;
				for (var d = 1, e = 0, f = this.Ka; e < f.length;) {
					var g = f[e];
					++e;
					null != g && (c |= d,
						a.fj(g));
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
				this.jn = 0 != a.F();
				let b = a.Rb();
				this.Ka = [];
				for (var c = 0; 10 > c;) {
					var d = c++;
					this.Ka[d] = null;
					0 != (b & 1) && (this.Ka[d] = a.ui());
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

		class class_Ia extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && a.Nr(a.na(this.R), this.min, this.rate, this.kj);
			}

			va(a) {
				a.P(this.min);
				a.P(this.rate);
				a.P(this.kj);
			}

			wa(a) {
				this.min = a.N();
				this.rate = a.N();
				this.kj = a.N();
			}

			static ma(a, b, c) {
				let d = new class_Ia;
				d.min = a;
				d.rate = b;
				d.kj = c;
				return d;
			}
		}

		class class_Ra extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && a.Zr(a.na(this.R));
			}

			va() {
			}

			wa() {
			}
		}

		class class_Sa extends class_p {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.na(this.R);
					if (null != a.M) {
						a.M = null;
						let c = 0
							,
							d = a.K;
						for (; c < d.length;) {
							let e = d[c];
							++c;
							e.J = null;
							e.Lb = 0;
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

		class class_Na extends class_p {
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
						a[d].zb = this.Ee[d];
					}
				}
			}

			va(a) {
				a.lb(this.Ee.length);
				let b = 0
					,
					c = this.Ee;
				for (; b < c.length;)
					a.lb(c[b++]);
			}

			wa(a) {
				this.Ee = [];
				let b = a.Bb()
					,
					c = 0;
				for (; c < b;)
					++c,
						this.Ee.push(a.Bb());
			}

			static ma(a) {
				let b = new class_Na
					,
					c = a.U.K
					,
					d = []
					,
					e = 0;
				for (; e < c.length;) {
					let f = a.Te.get(c[e++].X);
					d.push(null == f ? 0 : f.zb);
				}
				b.Ee = d;
				return b;
			}
		}

		class class_v extends Error {
			constructor(a, b, c) {
				super(a);
				this.message = a;
				this.Jj = null != c ? c : this;
			}

			Fb() {
				return this.Jj;
			}

			static Kb(a) {
				return a instanceof v ? a : a instanceof Error ? new class_v(a.message, null, a) : new class_Mb(a, null, a);
			}

			static A(a) {
				return a instanceof v ? a.Jj : a instanceof Error ? a : new class_Mb(a);
			}
		}

		class class_Mb extends class_v {
			constructor(a, b, c) {
				super(String(a), b, c);
				this.value = a;
			}

			Fb() {
				return this.value;
			}
		}

		var gb = gb || {},
			X;
		class_uc.b = true;
		Object.assign(class_uc.prototype, {
			g: class_uc
		});
		class_O.b = true;
		Math.b = true;
		class_Bc.b = true;
		class_Q.b = true;
		class_Y.b = true;
		class_ha.b = true;
		class_xc.b = true;
		Object.assign(class_xc.prototype, {
			g: class_xc
		});
		var ma = gb['bas.basnet.FailReason'] = {
			Sf: true,
			Zd: null,
			Je: {
				wc: 'PeerFailed',
				nb: 0,
				Gb: 'bas.basnet.FailReason',
				toString: ja
			},
			Ke: (X = function (a) {
				return {
					nb: 1,
					code: a,
					Gb: 'bas.basnet.FailReason',
					toString: ja
				};
			}
				,
				X.wc = 'Rejected',
				X.Le = ['code'],
				X),
			Ie: {
				wc: 'Cancelled',
				nb: 2,
				Gb: 'bas.basnet.FailReason',
				toString: ja
			},
			Error: {
				wc: 'Error',
				nb: 3,
				Gb: 'bas.basnet.FailReason',
				toString: ja
			}
		};
		ma.Zd = [ma.Je, ma.Ke, ma.Ie, ma.Error];
		class_$b.b = true;
		Object.assign(class_$b.prototype, {
			g: class_$b
		});
		class_Za.b = true;
		Object.assign(class_Za.prototype, {
			g: class_Za
		});
		var fb = gb['bas.basnet.ConnectionRequestResponse'] = {
			Sf: true,
			Zd: null,
			Ej: {
				wc: 'Accept',
				nb: 0,
				Gb: 'bas.basnet.ConnectionRequestResponse',
				toString: ja
			},
			Qf: (X = function (a) {
				return {
					nb: 1,
					reason: a,
					Gb: 'bas.basnet.ConnectionRequestResponse',
					toString: ja
				};
			}
				,
				X.wc = 'Reject',
				X.Le = ['reason'],
				X)
		};
		fb.Zd = [fb.Ej, fb.Qf];
		class_yb.b = true;
		Object.assign(class_yb.prototype, {
			g: class_yb
		});
		class_Jc.b = true;
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
		class_Cb.b = true;
		class_Sb.b = true;
		class_Vb.b = true;
		Object.assign(class_Vb.prototype, {
			g: class_Vb
		});
		class_x.b = true;
		class_Zb.b = true;
		class_Ic.b = true;
		class_p.b = true;
		Object.assign(class_p.prototype, {
			g: class_p
		});
		class_eb.b = true;
		Object.assign(class_eb.prototype, {
			g: class_eb
		});
		class_W.b = true;
		Object.assign(class_W.prototype, {
			g: class_W
		});
		class_db.b = true;
		class_db.ha = class_p;
		Object.assign(class_db.prototype, {
			g: class_db
		});
		class_Ob.b = true;
		class_Ob.Hj = true;
		Object.assign(class_Ob.prototype, {
			g: class_Ob
		});
		class_ec.b = true;
		Object.assign(class_ec.prototype, {
			g: class_ec
		});
		class_gc.b = true;
		Object.assign(class_gc.prototype, {
			g: class_gc
		});
		class_ic.b = true;
		Object.assign(class_ic.prototype, {
			g: class_ic
		});
		class_Pa.b = true;
		class_Pa.Hj = true;
		class_ta.b = true;
		class_oa.b = true;
		class_oa.ha = class_W;
		Object.assign(class_oa.prototype, {
			g: class_oa
		});
		var ia = gb['bas.marf.net.ConnFailReason'] = {
			Sf: true,
			Zd: null,
			Ie: {
				wc: 'Cancelled',
				nb: 0,
				Gb: 'bas.marf.net.ConnFailReason',
				toString: ja
			},
			Je: {
				wc: 'PeerFailed',
				nb: 1,
				Gb: 'bas.marf.net.ConnFailReason',
				toString: ja
			},
			Ke: (X = function (a) {
				return {
					nb: 2,
					reason: a,
					Gb: 'bas.marf.net.ConnFailReason',
					toString: ja
				};
			}
				,
				X.wc = 'Rejected',
				X.Le = ['reason'],
				X),
			Pf: (X = function (a) {
				return {
					nb: 3,
					description: a,
					Gb: 'bas.marf.net.ConnFailReason',
					toString: ja
				};
			}
				,
				X.wc = 'Other',
				X.Le = ['description'],
				X)
		};
		ia.Zd = [ia.Ie, ia.Je, ia.Ke, ia.Pf];
		class_Qa.b = true;
		class_Qa.ha = class_oa;
		Object.assign(class_Qa.prototype, {
			g: class_Qa
		});
		class_cc.b = true;
		class_cc.ha = class_oa;
		Object.assign(class_cc.prototype, {
			g: class_cc
		});
		class_wc.b = true;
		Object.assign(class_wc.prototype, {
			g: class_wc
		});
		class_tc.b = true;
		class_Yb.b = true;
		Object.assign(class_Yb.prototype, {
			g: class_Yb
		});
		class_dc.b = true;
		class_dc.ha = class_oa;
		Object.assign(class_dc.prototype, {
			g: class_dc
		});
		class_Xb.b = true;
		Object.assign(class_Xb.prototype, {
			g: class_Xb
		});
		class_Cc.b = true;
		Object.assign(class_Cc.prototype, {
			g: class_Cc
		});
		class_P.b = true;
		Object.assign(class_P.prototype, {
			g: class_P
		});
		class_Z.b = true;
		class_H.b = true;
		class_E.b = true;
		class_Ha.b = true;
		class_kc.b = true;
		class_Wb.b = true;
		class_hb.b = true;
		Object.assign(class_hb.prototype, {
			g: class_hb
		});
		class_Dc.b = true;
		class_Qb.b = true;
		Object.assign(class_Qb.prototype, {
			g: class_Qb
		});
		class_Oa.b = true;
		class_Aa.b = true;
		Object.assign(class_Aa.prototype, {
			g: class_Aa
		});
		class_Rb.b = true;
		Object.assign(class_Rb.prototype, {
			g: class_Rb
		});
		class_hc.b = true;
		Object.assign(class_hc.prototype, {
			g: class_hc
		});
		class_na.b = true;
		Object.assign(class_na.prototype, {
			g: class_na
		});
		class_yc.b = true;
		Object.assign(class_yc.prototype, {
			g: class_yc
		});
		class_Ec.b = true;
		class_xa.b = true;
		Object.assign(class_xa.prototype, {
			g: class_xa
		});
		class_za.b = true;
		Object.assign(class_za.prototype, {
			g: class_za
		});
		class_n.b = true;
		class_jc.b = true;
		Object.assign(class_jc.prototype, {
			g: class_jc
		});
		class_B.b = true;
		class_C.b = true;
		class_rc.b = true;
		Object.assign(class_rc.prototype, {
			g: class_rc
		});
		class_Ub.b = true;
		Object.assign(class_Ub.prototype, {
			g: class_Ub
		});
		class_Tb.b = true;
		class_xb.b = true;
		class_pc.b = true;
		Object.assign(class_pc.prototype, {
			g: class_pc
		});
		class_qc.b = true;
		Object.assign(class_qc.prototype, {
			g: class_qc
		});
		class_ya.b = true;
		Object.assign(class_ya.prototype, {
			g: class_ya
		});
		class_aa.b = true;
		class_aa.qd = [class_Pa];
		Object.assign(class_aa.prototype, {
			g: class_aa
		});
		class_Eb.b = true;
		Object.assign(class_Eb.prototype, {
			g: class_Eb
		});
		class_ac.b = true;
		Object.assign(class_ac.prototype, {
			g: class_ac
		});
		class_Ya.b = true;
		Object.assign(class_Ya.prototype, {
			g: class_Ya
		});
		class_q.b = true;
		Object.assign(class_q.prototype, {
			g: class_q
		});
		class_va.b = true;
		Object.assign(class_va.prototype, {
			g: class_va
		});
		class_u.b = true;
		Object.assign(class_u.prototype, {
			g: class_u
		});
		class_ua.b = true;
		class_ua.qd = [class_Pa, class_Ob];
		Object.assign(class_ua.prototype, {
			g: class_ua
		});
		class_wa.b = true;
		class_wa.qd = [class_Pa];
		Object.assign(class_wa.prototype, {
			g: class_wa
		});
		class_Ba.b = true;
		class_Ba.ha = class_p;
		Object.assign(class_Ba.prototype, {
			g: class_Ba
		});
		class_Gb.b = true;
		class_Gb.ha = class_p;
		Object.assign(class_Gb.prototype, {
			g: class_Gb
		});
		class_Ta.b = true;
		class_Ta.ha = class_p;
		Object.assign(class_Ta.prototype, {
			g: class_Ta
		});
		class_ra.b = true;
		class_ra.ha = class_p;
		Object.assign(class_ra.prototype, {
			g: class_ra
		});
		class_Ea.b = true;
		class_Ea.ha = class_p;
		Object.assign(class_Ea.prototype, {
			g: class_Ea
		});
		class_Ja.b = true;
		class_Ja.ha = class_p;
		Object.assign(class_Ja.prototype, {
			g: class_Ja
		});
		class_fa.b = true;
		class_fa.ha = class_p;
		Object.assign(class_fa.prototype, {
			g: class_fa
		});
		class_Ca.b = true;
		class_Ca.ha = class_p;
		Object.assign(class_Ca.prototype, {
			g: class_Ca
		});
		class_$a.b = true;
		class_$a.ha = class_p;
		Object.assign(class_$a.prototype, {
			g: class_$a
		});
		class_Da.b = true;
		class_Da.ha = class_p;
		Object.assign(class_Da.prototype, {
			g: class_Da
		});
		class_Ma.b = true;
		class_Ma.ha = class_p;
		Object.assign(class_Ma.prototype, {
			g: class_Ma
		});
		class_Ib.b = true;
		class_Ib.ha = class_p;
		Object.assign(class_Ib.prototype, {
			g: class_Ib
		});
		class_Va.b = true;
		class_Va.ha = class_p;
		Object.assign(class_Va.prototype, {
			g: class_Va
		});
		class_Ua.b = true;
		class_Ua.ha = class_p;
		Object.assign(class_Ua.prototype, {
			g: class_Ua
		});
		class_La.b = true;
		class_La.ha = class_p;
		Object.assign(class_La.prototype, {
			g: class_La
		});
		class_Fa.b = true;
		class_Fa.ha = class_p;
		Object.assign(class_Fa.prototype, {
			g: class_Fa
		});
		class_Kc.b = true;
		class_ka.b = true;
		class_ka.ha = class_p;
		Object.assign(class_ka.prototype, {
			g: class_ka
		});
		class_Hb.b = true;
		class_Hb.ha = class_p;
		Object.assign(class_Hb.prototype, {
			g: class_Hb
		});
		class_Jb.b = true;
		class_Jb.ha = class_p;
		Object.assign(class_Jb.prototype, {
			g: class_Jb
		});
		class_Ia.b = true;
		class_Ia.ha = class_p;
		Object.assign(class_Ia.prototype, {
			g: class_Ia
		});
		class_Ra.b = true;
		class_Ra.ha = class_p;
		Object.assign(class_Ra.prototype, {
			g: class_Ra
		});
		class_Sa.b = true;
		class_Sa.ha = class_p;
		Object.assign(class_Sa.prototype, {
			g: class_Sa
		});
		class_Na.b = true;
		class_Na.ha = class_p;
		Object.assign(class_Na.prototype, {
			g: class_Na
		});
		class_sa.b = true;
		class_sa.qd = [class_Pa];
		Object.assign(class_sa.prototype, {
			g: class_sa
		});
		class_Fb.b = true;
		class_Fb.qd = [class_Pa];
		Object.assign(class_Fb.prototype, {
			g: class_Fb
		});
		class_Xa.b = true;
		class_Xa.qd = [class_Pa];
		Object.assign(class_Xa.prototype, {
			g: class_Xa
		});
		class_S.b = true;
		Object.assign(class_S.prototype, {
			g: class_S
		});
		class_I.b = true;
		Object.assign(class_I.prototype, {
			g: class_I
		});
		class_G.b = true;
		Object.assign(class_G.prototype, {
			g: class_G
		});
		class_V.b = true;
		Object.assign(class_V.prototype, {
			g: class_V
		});
		class_ea.b = true;
		Object.assign(class_ea.prototype, {
			g: class_ea
		});
		class_oc.b = true;
		Object.assign(class_oc.prototype, {
			g: class_oc
		});
		class_tb.b = true;
		Object.assign(class_tb.prototype, {
			g: class_tb
		});
		class_Kb.b = true;
		Object.assign(class_Kb.prototype, {
			g: class_Kb
		});
		class_cb.b = true;
		Object.assign(class_cb.prototype, {
			g: class_cb
		});
		class_bc.b = true;
		Object.assign(class_bc.prototype, {
			g: class_bc
		});
		class_sb.b = true;
		Object.assign(class_sb.prototype, {
			g: class_sb
		});
		class_ob.b = true;
		Object.assign(class_ob.prototype, {
			g: class_ob
		});
		class_wb.b = true;
		Object.assign(class_wb.prototype, {
			g: class_wb
		});
		class_ab.b = true;
		Object.assign(class_ab.prototype, {
			g: class_ab
		});
		class_rb.b = true;
		Object.assign(class_rb.prototype, {
			g: class_rb
		});
		class_lc.b = true;
		Object.assign(class_lc.prototype, {
			g: class_lc
		});
		class_vc.b = true;
		Object.assign(class_vc.prototype, {
			g: class_vc
		});
		class_qa.b = true;
		Object.assign(class_qa.prototype, {
			g: class_qa
		});
		class_kb.b = true;
		Object.assign(class_kb.prototype, {
			g: class_kb
		});
		class_vb.b = true;
		Object.assign(class_vb.prototype, {
			g: class_vb
		});
		class_Bb.b = true;
		Object.assign(class_Bb.prototype, {
			g: class_Bb
		});
		class_sc.b = true;
		Object.assign(class_sc.prototype, {
			g: class_sc
		});
		class_ib.b = true;
		Object.assign(class_ib.prototype, {
			g: class_ib
		});
		class_pb.b = true;
		Object.assign(class_pb.prototype, {
			g: class_pb
		});
		class_Ga.b = true;
		Object.assign(class_Ga.prototype, {
			g: class_Ga
		});
		class_ca.b = true;
		Object.assign(class_ca.prototype, {
			g: class_ca
		});
		class_Ka.b = true;
		Object.assign(class_Ka.prototype, {
			g: class_Ka
		});
		class_jb.b = true;
		Object.assign(class_jb.prototype, {
			g: class_jb
		});
		class_zb.b = true;
		Object.assign(class_zb.prototype, {
			g: class_zb
		});
		class_bb.b = true;
		Object.assign(class_bb.prototype, {
			g: class_bb
		});
		class_Ab.b = true;
		Object.assign(class_Ab.prototype, {
			g: class_Ab
		});
		class_Lb.b = true;
		Object.assign(class_Lb.prototype, {
			g: class_Lb
		});
		class_qb.b = true;
		Object.assign(class_qb.prototype, {
			g: class_qb
		});
		class_la.b = true;
		Object.assign(class_la.prototype, {
			g: class_la
		});
		class_ba.b = true;
		Object.assign(class_ba.prototype, {
			g: class_ba
		});
		class_Db.b = true;
		Object.assign(class_Db.prototype, {
			g: class_Db
		});
		class_lb.b = true;
		Object.assign(class_lb.prototype, {
			g: class_lb
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
		class_Fc.b = true;
		Object.assign(class_Fc.prototype, {
			g: class_Fc
		});
		class_w.b = true;
		globalScope.Dj |= 0;
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
		var Pb = {}
			,
			Lc = {}
			,
			D = Number
			,
			zc = Boolean
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
		class_w.Jn = {}.toString;
		class_Za.so = {
			mandatory: {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false
			}
		};
		class_U.sh = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};
		class_U.Em = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};
		class_Cb.np = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
		class_p.yb = false;
		class_p.gn = new Map;
		class_p.If = 0;
		class_W.yb = false;
		class_db.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_ta.Cc = 0;
		class_tc.channels = [{
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
		class_Z.Fj = 'application/x-www-form-urlencoded';
		class_Oa.bb = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
		class_n.zs = 'wss://p2p.haxball.com/';
		class_n.Pe = 'https://www.haxball.com/rs/';
		class_n.ig = [{
			urls: 'stun:stun.l.google.com:19302'
		}];
		class_n.j = new class_yc;
		class_aa.ol = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(new class_P(0, 0));
			}
			return a;
		}(this);
		class_aa.uk = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(0);
			}
			return a;
		}(this);
		class_q.gs = class_A.ia(1024);
		class_Ba.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Gb.za = class_p.Ga({
			Ba: false,
			delay: false,
			wj: {
				jj: 10,
				Cj: 900
			}
		});
		class_Ta.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_ra.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ea.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ja.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_fa.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ca.za = class_p.Ga({
			Ba: false,
			delay: false,
			wj: {
				jj: 10,
				Cj: 2E3
			}
		});
		class_$a.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Da.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ma.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ib.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Va.za = class_p.Ga({});
		class_Ua.za = class_p.Ga({
			Ba: false,
			delay: false,
			wj: {
				jj: 10,
				Cj: 900
			}
		});
		class_La.za = class_p.Ga({});
		class_Fa.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_ka.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Hb.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Jb.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ia.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Ra.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Sa.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_Na.za = class_p.Ga({
			Ba: false,
			delay: false
		});
		class_I.Cn = .17435839227423353;
		class_I.Bn = 5.934119456780721;
		class_ea.zn = new class_Xb([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
		class_ea.An = new class_Xb([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
		class_Kb.O = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_cb.O = '<div class=\'chatbox-view\'><div class=\'chatbox-view-contents\'><div data-hook=\'drag\' class=\'drag\'></div><div data-hook=\'log\' class=\'log subtle-thin-scrollbar\'><div data-hook=\'log-contents\' class=\'log-contents\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /></div></div></div>';
		class_sb.O = '<div class=\'choose-nickname-view\'><img src="' + window.parent._gdir + 'images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
		class_ob.O = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
		class_wb.O = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
		class_ab.O = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
		class_rb.O = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
		class_qa.O = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'gameplay-section\' data-hook=\'gameplay\'></div><div class=\'top-section\' data-hook=\'top-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'bottom-spacer\'></div></div><div class=\'buttons\'><div class=\'sound-button-container\' data-hook="sound"><div class=\'sound-slider\' data-hook=\'sound-slider\'><div class=\'sound-slider-bar-bg\' data-hook=\'sound-bar-bg\'><div class=\'sound-slider-bar\' data-hook=\'sound-bar\'></div></div></div><button data-hook=\'sound-btn\'><i class=\'icon-volume-up\' data-hook=\'sound-icon\'></i></button></div><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i></button></div><div data-hook=\'popups\'></div></div>';
		class_kb.O = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
		class_vb.O = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
		class_Bb.O = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_ib.O = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
		class_pb.O = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
		class_Ga.O = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list thin-scrollbar\' data-hook=\'list\'></div></div>';
		class_Ka.O = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
		class_jb.O = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
		class_zb.Bj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
		class_bb.Bj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span><span class=\'bool\' data-hook=\'fil-empty\'>Show empty <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
		class_Lb.O = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
		class_qb.O = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
		class_la.O = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat opacity </div><div style="width: 40px" data-hook="chatopacity-value">1</div><input class="slider" type="range" min="0.5" max="1" step="0.01" data-hook="chatopacity-range"></div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat focus height </div><div style="width: 40px" data-hook="chatfocusheight-value">200</div><input class="slider" type="range" min="0" max="400" step="10" data-hook="chatfocusheight-range"></div><div>Chat background width:<select data-hook=\'chatbgmode\'><option>Full</option><option>Compact</option></select></div></div></div></div>';
		class_la.rm = 0;
		class_ba.O = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
		class_Db.O = '<div class="stats-view-container"><div class=\'stats-view\'><p data-hook=\'ping\'></p><p data-hook=\'fps\'></p><div data-hook=\'graph\'></div></div></div>';
		class_lb.O = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="' + window.parent._gdir + 'images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="' + window.parent._gdir + 'images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="' + window.parent._gdir + 'images/opera-icon.png"/>Opera</a></div></div></div>';
		class_B.Mp();
	}
)('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this);
