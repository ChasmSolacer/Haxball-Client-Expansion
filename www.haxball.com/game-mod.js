/*
 HaxBall @ 2023 - Mario Carbajal - All rights reserved.
 88c4da30
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
			return class_w.Je(this, '');
		}

		function hc(a) {
			return 66 > a ? 66 : 400 < a ? 400 : a;
		}

		function M(a, b) {
			if (null == b)
				return null;
			null == b.ph && (b.ph = globalScope.yj++);
			var c;
			null == a.jj ? a.jj = {} : c = a.jj[b.ph];
			null == c && (c = b.bind(a),
				a.jj[b.ph] = c);
			return c;
		}

		function Nb() {
			return hc(class_p.l.ak.H());
		}

		class class_ic {
			constructor() {
				function a(g) {
					return new class_qa(g, f, function (h) {
							if (null == h)
								return null;
							try {
								return class_ka.Kh(h);
							}
							catch (k) {
								return null;
							}
						}
						, function (h) {
							if (null == h)
								return null;
							try {
								return h.ye();
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
							return null == l ? h : class_ha.Vc(l, k);
						}
						, function (l) {
							return l;
						}
					);
				}

				let f = class_zc.bn();
				this.le = e('player_name', '', 25);
				this.Db = d('view_mode', -1);
				this.Ih = d('fps_limit', 0);
				this.sh = e('avatar', null, 2);
				e('rctoken', null, 1024);
				this.Lm = b('team_colors', true);
				this.Kk = b('show_indicators', true);
				this.Dm = b('sound_main', true);
				this.Mi = b('sound_chat', true);
				this.Cm = b('sound_highlight', true);
				this.Bm = b('sound_crowd', true);
				this.Oj = e('player_auth_key', null, 1024);
				this.yd = d('extrapolation', 0);
				this.Ai = c('resolution_scale', 1);
				this.zm = b('show_avatars', true);
				this.ak = d('chat_height', 160);
				this.yh = d('chat_focus_height', 140);
				this.zh = c('chat_opacity', .8);
				this.$j = e('chat_bg_mode', 'compact', 50);
				this.Ue = a('geo');
				this.Ve = a('geo_override');
				this.Bg = function () {
					return new class_qa('player_keys', f, function (g) {
							if (null == g)
								return class_ra.jk();
							try {
								return class_ra.Kh(g);
							}
							catch (h) {
								return class_ra.jk();
							}
						}
						, function (g) {
							try {
								return g.ye();
							}
							catch (h) {
								return null;
							}
						}
					);
				}();
			}

			Nh() {
				return null != this.Ve.H() ? this.Ve.H() : null != this.Ue.H() ? this.Ue.H() : new class_ka;
			}
		}

		class class_eb {
			constructor() {
				this.we = class_u.La;
				this.da = new class_O(0, 0);
				this.X = new class_O(0, 0);
			}

			fa(a) {
				var b = this.X;
				a.u(b.x);
				a.u(b.y);
				b = this.da;
				a.u(b.x);
				a.u(b.y);
				a.m(this.we.aa);
			}

			ka(a) {
				var b = this.X;
				b.x = a.v();
				b.y = a.v();
				b = this.da;
				b.x = a.v();
				b.y = a.v();
				a = a.sf();
				this.we = 1 == a ? class_u.ga : 2 == a ? class_u.Aa : class_u.La;
			}
		}

		class class_jc {
			static i(a, b, c, d) {
				null != a && a(b, c, d);
			}
		}

		class class_fb {
			constructor() {
				this.fe = this.hg = 0;
				window.document.addEventListener('focusout', M(this, this.nl));
			}

			ja() {
				window.document.removeEventListener('focusout', M(this, this.nl));
			}

			D() {
				let a = this.fe;
				// After removing this check, it can work in the background, however it will always trigger onPlayerActivity
				if (null != this.vg /*&& a != this.hg*/) {
					this.hg = a;
					let b = new class_Aa;
					// Add emulatedInput to keyboard input
					//b.input = a;
					b.input = (a | window.parent.g.emulatedInput);
					this.vg(b);
				}
			}

			Id(a) {
				this.fe |= class_fb.Pk(a);
			}

			Jd(a) {
				this.fe &= ~class_fb.Pk(a);
			}

			nl() {
				if (null != this.vg && 0 != this.hg) {
					this.hg = this.fe = 0;
					let a = new class_Aa;
					a.input = 0;
					this.vg(a);
				}
			}

			static Pk(a) {
				switch (class_p.l.Bg.H().H(a)) {
					case 'Down':
						return 2;
					case 'Kick':
						return 16;
					case 'Left':
						return 4;
					case 'Right':
						return 8;
					case 'Up':
						return 1;
					default:
						return 0;
				}
			}
		}

		class class_gb {
			constructor(a) {
				this.f = class_x.Fa(class_gb.O);
				var b = class_x.Da(this.f);
				this.wh = b.get('cancel');
				this.fk = b.get('create');
				this.hf = b.get('name');
				this.xl = b.get('pass');
				this.ei = b.get('max-pl');
				this.Sm = b.get('unlisted');
				this.hf.maxLength = 40;
				this.hf.value = a;
				let c = this;
				this.hf.oninput = function () {
					c.D();
				}
				;
				this.xl.maxLength = 30;
				this.Sm.onclick = function () {
					c.Nj(!c.Tm);
				}
				;
				this.wh.onclick = function () {
					class_H.i(c.gi);
				}
				;
				this.fk.onclick = function () {
					if (c.Hc()) {
						let d = c.xl.value;
						'' == d && (d = null);
						class_E.i(c.Vp, {
							name: c.hf.value,
							password: d,
							Is: c.ei.selectedIndex + 2,
							at: c.Tm
						});
					}
				}
				;
				for (a = 2; 21 > a;)
					b = window.document.createElement('option'),
						b.textContent = '' + a++,
						this.ei.appendChild(b);
				this.ei.selectedIndex = 10;
				this.Nj(false);
				this.D();
			}

			Nj(a) {
				this.Tm = a;
				this.Sm.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes');
			}

			Hc() {
				let a = this.hf.value;
				return 40 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.fk.disabled = !this.Hc();
			}
		}

		class class_G {
			constructor() {
				this.Bd = 0;
				this.w = 32;
				this.h = 63;
				this.o = 1;
				this.a = new class_O(0, 0);
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

		class class_B {
			static Dp() {
				class_C.kj(function () {
					class_B.uk(class_B.Jq);
				});
				class_B.up();
			}

			static up() {
				let a = class_p.l.Oj.H();
				null == a ? class_T.Lo().then(function (b) {
					class_B.Re = b;
					class_p.l.Oj.Ha(b.Xr());
				}).catch(function () {
				}) : class_T.Ko(a).then(function (b) {
					return class_B.Re = b;
				}).catch(function () {
				});
			}

			static Oo() {
				let a = class_zc.bn();
				return null != a ? null != a.getItem('crappy_router') : false;
			}

			static uk(a) {
				let b = new class_hb(class_p.l.le.H());
				b.pl = function (c) {
					class_p.l.le.Ha(c);
					class_p.Na.fm();
					a();
				}
				;
				class_C.Ka(b.f);
				b.Cb.focus();
			}

			static vk(a, b) {
				a = new class_Y(a);
				a.Ua = b;
				class_C.Ka(a.f);
			}

			static Ao(a, b) {
				function c() {
					let f = new class_Ra('Failed', null);
					f.Ua = function () {
						class_B.wb();
					}
					;
					class_C.Ka(f.f);
				}

				function d(f) {
					f = f.sitekey;
					if (null == f)
						throw class_v.B(null);
					class_B.vk(f, function (g) {
						e(a, g);
					});
				}

				class_C.Ka((new class_Z('Connecting', 'Connecting...', [])).f);
				let e = null;
				e = function (f, g) {
					class_aa.Ml(class_p.Me + 'api/client', 'room=' + f + '&rcr=' + g, class_aa.Aj).then(function (h) {
						switch (h.action) {
							case 'connect':
								h = h.token;
								if (null == h)
									throw class_v.B(null);
								b(h);
								break;
							case 'recaptcha':
								d(h);
								break;
							default:
								throw class_v.B(null);
						}
					}).catch(function () {
						c();
					});
				}
				;
				e(a, '');
			}

			static Jq() {
				let a = class_Ac.H()
					,
					b = a.get('c')
					,
					c = a.get('p');
				a.get('v');
				null != b ? null != c ? class_B.Gh(b) : class_B.Yf(b) : class_B.wb();
			}

			static wb() {
				let a = new class_Sa(class_p.l.Nh());
				class_C.Ka(a.Ia);
				a.ln = function (b) {
					if (9 != b.Cd.Pd) {
						let c;
						9 > b.Cd.Pd ? (b = 'Old version room',
							c = 'The room is running an older version, an update must have happened recently.') : (b = 'New version',
							c = 'The room is running a new version of haxball, refresh the site to update.');
						let d = new class_Z(b, c, ['Ok']);
						class_C.Ka(d.f);
						d.Ua = function () {
							class_C.Ka(a.Ia);
							d.Ua = null;
						};
					}
					else
						b.Cd.Jb ? class_B.Gh(b.aa) : class_B.Yf(b.aa);
				}
				;
				a.Ns = function () {
					class_B.Bo();
				}
				;
				a.Ms = function () {
					class_B.uk(class_B.wb);
				}
				;
				a.Ps = function () {
					class_B.xk();
				}
				;
				a.Os = function (b) {
					class_B.Co(b);
				};
			}

			static xk() {
				let a = new class_la(true)
					,
					b = window.document.createElement('div');
				b.className = 'view-wrapper';
				b.appendChild(a.f);
				class_C.Ka(b);
				a.pb = function () {
					class_B.wb();
				}
				;
				a.Qp = function () {
					let c = new class_ib
						,
						d = window.document.createElement('div');
					d.className = 'view-wrapper';
					d.appendChild(c.f);
					class_C.Ka(d);
					c.pb = function () {
						class_B.xk();
					};
				};
			}

			static di(a, b) {
				return '' + globalScope.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
			}

			static Bo() {
				let a = class_p.l.le.H()
					,
					b = new class_gb('' + a + '\'s room');
				class_C.Ka(b.f);
				b.gi = function () {
					class_B.wb();
				}
				;
				b.Vp = function (c) {
					function d() {
						if (!c.at) {
							var t = new class_Ob;
							t.Pd = 9;
							t.A = g.lc;
							t.K = g.K.length;
							t.ef = k.ng + 1;
							t.tb = f.tb;
							t.Jb = null != k.Jb;
							t.Ic = f.Ic;
							t.Kc = f.Kc;
							var z = class_A.ia(16);
							t.fa(z);
							k.Ki(z.Qg());
						}
					}

					class_C.Ka((new class_Z('Creating room', 'Connecting...', [])).f);
					let e = null
						,
						f = class_p.l.Nh()
						,
						g = new class_sa;
					g.lc = c.name;
					let h = new class_ta;
					h.A = a;
					h.cb = true;
					h.country = f.tb;
					h.Zb = class_p.l.sh.H();
					g.K.push(h);
					let k = new class_Pb({
						iceServers: class_p.eg,
						nj: class_p.Me + 'api/host',
						state: g,
						version: 9
					});
					k.ng = c.Is - 1;
					k.Jb = c.password;
					d();
					let l = new class_Ba(k)
						,
						n = false;
					k.nf = function (t, z) {
						class_B.vk(t, function (J) {
							z(J);
							class_C.Ka(l.j.f);
							n = true;
						});
					}
					;
					let r = window.setInterval(function () {
						k.ra(class_Ca.ma(k));
					}, 3E3);
					k.ml = function (t) {
						null != g.na(t) && k.ra(class_ma.ma(t, 'Bad actor', false));
					}
					;
					k.Tp = function (t, z) {
						let J = z.kc();
						if (25 < J.length)
							throw class_v.B('name too long');
						let N = z.kc();
						if (3 < N.length)
							throw class_v.B('country too long');
						z = z.zb();
						if (null != z && 2 < z.length)
							throw class_v.B('avatar too long');
						k.ra(class_Da.ma(t, J, N, z));
						d();
					}
					;
					k.Up = function (t) {
						null != g.na(t) && k.ra(class_ma.ma(t, null, false));
					}
					;
					k.sg = function (t) {
						e = t;
						l.Ig = class_B.di(t, null != k.Jb);
						n || (n = true,
							class_C.Ka(l.j.f));
					}
					;
					l.Lh.Zp = function (t, z, J, N) {
						k.Go(t, z, J, N);
					}
					;
					l.Lh.$p = function () {
						d();
					}
					;
					l.j.je = function () {
						k.ja();
						l.ja();
						class_B.wb();
						window.clearInterval(r);
					}
					;
					l.Xf.Mg = function (t) {
						k.Jb = t;
						d();
						null != e && (l.Ig = class_B.di(e, null != k.Jb));
					}
					;
					l.Xf.wm = function (t) {
						k.Ji(t);
					}
					;
					l.Xf.$d = M(k, k.$d);
				};
			}

			static Gh(a) {
				let b = new class_jb;
				class_C.Ka(b.f);
				b.Ua = function (c) {
					null == c ? class_B.wb() : class_B.Yf(a, c);
				};
			}

			static Co(a) {
				try {
					let b = new class_kc(new class_Qb(new Uint8Array(a), new class_sa, 3));
					b.pe.je = function () {
						b.ja();
						class_B.wb();
					}
					;
					class_C.Ka(b.j.f);
				}
				catch (b) {
					let c = class_v.Kb(b).Fb();
					if (c instanceof class_Rb)
						a = new class_Z('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']),
							class_C.Ka(a.f),
							a.Ua = function (d) {
								0 == d ? (d = window.top.location,
									window.top.open(d.protocol + '//' + d.hostname + (null != d.port ? ':' + d.port : '') + '/replay?v=' + c.Pd, '_self')) : class_B.wb();
							}
						;
					else {
						let d = new class_Z('Replay error', 'Couldn\'t load the file.', ['Ok']);
						class_C.Ka(d.f);
						d.Ua = function () {
							d.Ua = null;
							class_B.wb();
						};
					}
				}
			}

			static Yf(a, b, c) {
				try {
					let d = class_B.Oo()
						,
						e = new class_sa
						,
						f = class_A.ia();
					f.oc(class_p.l.le.H());
					f.oc(class_p.l.Nh().tb);
					f.Eb(class_p.l.sh.H());
					let g = new class_Ea(a, {
							iceServers: class_p.eg,
							nj: class_p.ms,
							state: e,
							version: 9,
							ct: f.Qg(),
							password: b,
							qn: d,
							un: c,
							ws: class_B.Re
						})
						,
						h = new class_kb;
					h.ca('Connecting to master...');
					h.wh.onclick = function () {
						g.Hd = null;
						g.mf = null;
						g.ja();
						class_B.wb();
					}
					;
					class_C.Ka(h.f);
					let k = function (r, t) {
							r = new class_Ra(r, t);
							r.Ua = function () {
								class_B.wb();
							}
							;
							class_C.Ka(r.f);
						}
						,
						l = function () {
							let r = new class_Z('Connection Failed', '', ['Ok']);
							r.ae.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
							r.Ua = function () {
								class_B.wb();
							}
							;
							class_C.Ka(r.f);
						}
						,
						n = function () {
							let r = new class_Ba(g);
							g.ql = function (t) {
								r.j.Bf.Er(g.Ag.hh() | 0, g.Ag.max() | 0);
								r.j.Bf.Al.Gn(t);
							}
							;
							r.Ig = class_B.di(a, false);
							class_C.Ka(r.j.f);
							r.j.je = function () {
								g.Hd = null;
								g.ja();
								r.ja();
								class_B.wb();
							}
							;
							g.Hd = function () {
								g.Hd = null;
								r.ja();
								let t = null == r.Md ? null : r.Md.stop();
								k(g.pk, t);
							};
						};
					g.mf = function (r) {
						g.mf = null;
						g.Hd = null;
						switch (r.mb) {
							case 1:
								l();
								break;
							case 2:
								switch (r.reason) {
									case 4004:
										class_B.Ao(a, function (t) {
											class_B.Yf(a, b, t);
										});
										break;
									case 4101:
										null == b ? class_B.Gh(a) : k(class_Ea.Ah(r), null);
										break;
									default:
										k(class_Ea.Ah(r), null);
								}
								break;
							default:
								k(class_Ea.Ah(r), null);
						}
					}
					;
					g.Hd = function (r) {
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
					g.eq = function () {
						h.ca('Trying reverse connection...');
					};
				}
				catch (d) {
					c = class_v.Kb(d).Fb(),
						globalScope.console.log(c),
						c = new class_Z('Unexpected Error', '', []),
						c.ae.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.',
						class_C.Ka(c.f);
				}
			}
		}

		class class_Ta {
			constructor() {
				this.jc = -1;
				this.ic = null;
				/** @type {class_ua[]} */
				this.G = [];
			}

			fa(a) {
				a.m(this.G.length);
				let b = 0
					,
					c = this.G.length;
				for (; b < c;) {
					let d = b++
						,
						e = this.G[d];
					e.wl = d;
					e.fa(a);
				}
			}

			ka(a) {
				this.G = [];
				let b = a.C()
					,
					c = 0;
				for (; c < b;) {
					++c;
					let d = new class_ua;
					d.ka(a);
					this.G.push(d);
				}
			}

			D(a) {
				for (var b = 0, c = this.G; b < c.length;) {
					var d = c[b];
					++b;
					var e = d.a
						,
						f = d.a
						,
						g = d.F;
					e.x = f.x + g.x * a;
					e.y = f.y + g.y * a;
					f = e = d.F;
					g = d.oa;
					d = d.Ba;
					e.x = (f.x + g.x) * d;
					e.y = (f.y + g.y) * d;
				}
				a = 0;
				for (b = this.G.length; a < b;) {
					d = a++;
					c = this.G[d];
					d += 1;
					for (e = this.G.length; d < e;)
						f = this.G[d++],
						0 != (f.h & c.w) && 0 != (f.w & c.h) && c.bo(f);
					if (0 != c.ba) {
						d = 0;
						for (e = this.qa; d < e.length;)
							if (f = e[d],
								++d,
							0 != (f.h & c.w) && 0 != (f.w & c.h)) {
								g = f.wa;
								var h = c.a;
								g = f.Ta - (g.x * h.x + g.y * h.y) + c.$;
								if (0 < g) {
									var k = h = c.a
										,
										l = f.wa;
									h.x = k.x + l.x * g;
									h.y = k.y + l.y * g;
									g = c.F;
									h = f.wa;
									g = g.x * h.x + g.y * h.y;
									0 > g && (g *= c.o * f.o + 1,
										k = h = c.F,
										f = f.wa,
										h.x = k.x - f.x * g,
										h.y = k.y - f.y * g);
								}
							}
						d = 0;
						for (e = this.V; d < e.length;)
							f = e[d],
								++d,
							0 != (f.h & c.w) && 0 != (f.w & c.h) && c.co(f);
						d = 0;
						for (e = this.L; d < e.length;)
							if (f = e[d],
								++d,
							0 != (f.h & c.w) && 0 != (f.w & c.h) && (h = c.a,
								k = f.a,
								g = h.x - k.x,
								h = h.y - k.y,
								k = g * g + h * h,
							0 < k && k <= c.$ * c.$)) {
								k = Math.sqrt(k);
								g /= k;
								h /= k;
								k = c.$ - k;
								let n = l = c.a;
								l.x = n.x + g * k;
								l.y = n.y + h * k;
								k = c.F;
								k = g * k.x + h * k.y;
								0 > k && (k *= c.o * f.o + 1,
									l = f = c.F,
									f.x = l.x - g * k,
									f.y = l.y - h * k);
							}
					}
				}
				for (a = 0; 2 > a;)
					for (++a,
						     b = 0,
						     c = this.ob; b < c.length;)
						c[b++].D(this.G);
			}

			uc() {
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_Ta),
					this.jc = a,
					class_Ta.xd(b, this));
				return b;
			}

			static xd(a, b) {
				if (null == b.G)
					a.G = null;
				else {
					null == a.G && (a.G = []);
					let d = a.G
						,
						e = b.G;
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
				a.V = b.V;
				a.qa = b.qa;
				a.ob = b.ob;
			}
		}

		class class_Ba {
			constructor(a) {
				this.Wf = null;
				this.Sk = this.Ch = false;
				this.ed = window.performance.now();
				this.Md = null;
				this.Le = 0;
				this.Wn = new class_lb(3, 1E3);
				this.nb = new class_fb;
				this.Ig = 'Waiting for link';
				this.Ci = this.nm = false;
				this.zd = 0;
				let b = this;
				this.Xf = new class_Sb(a, function (d) {
						b.j.Oa.Hb(d);
					}
				);
				this.xa = a;
				a.U.xo = function (d) {
					b.nm != d && (b.nm = d,
						a.ra(class_Fa.ma(d)));
				}
				;
				this.j = new class_wa(a.yc);
				window.top.document.body.classList.add('hb-playing');
				this.Lh = new class_Tb(this.j, a.U.na(a.yc).A);
				this.Lh.vi(a.U);
				this.j.Oa.sl = M(this, this.Sp);
				this.j.Oa.qg = M(this, this.Rp);
				window.document.addEventListener('keydown', M(this, this.Id));
				window.document.addEventListener('keyup', M(this, this.Jd));
				window.onbeforeunload = function () {
					return 'Are you sure you want to leave the room?';
				}
				;
				this.nb.vg = function (d) {
					a.ra(d);
				}
				;
				this.j.Va.nq = function (d) {
					a.ra(class_xa.ma(1, d));
				}
				;
				this.j.Va.fq = function (d) {
					a.ra(class_xa.ma(0, d));
				}
				;
				this.j.wg = function (d) {
					a.ra(class_Ga.ma(d));
				}
				;
				this.j.Va.kq = function () {
					a.ra(new class_Ua);
				}
				;
				this.j.Va.lq = function () {
					a.ra(new class_Va);
				}
				;
				this.j.Va.Yp = function () {
					b.Pm();
				}
				;
				this.j.Va.ug = function (d, e) {
					a.ra(class_fa.ma(d, e));
				}
				;
				this.j.Va.ke = M(this, this.hr);
				this.j.Va.Pp = function () {
					a.ra(new class_Wa);
				}
				;
				this.j.Va.aq = function () {
					class_Ba.Nq(a);
				}
				;
				this.j.Va.mq = function (d) {
					a.ra(class_Ha.ma(d));
				}
				;
				this.j.Va.pf = function (d) {
					let e = a.U.na(d);
					if (null != e) {
						let f = new class_mb(e, b.Ci);
						f.pb = function () {
							b.j.bb(null);
						}
						;
						f.Op = function (g, h) {
							a.ra(class_Ia.ma(g, h));
						}
						;
						f.ii = function () {
							b.Kr(e);
						}
						;
						b.j.bb(f.f, function () {
							f.D(a.U, b.Ci);
						});
					}
				}
				;
				this.j.Va.iq = function () {
					let d = new class_nb;
					d.pb = function () {
						b.j.bb(null);
					}
					;
					b.j.bb(d.f, function () {
						d.Cr(b.Ig);
					});
				}
				;
				this.j.Va.bq = function () {
					if (null == b.Md)
						b.Or();
					else {
						let d = b.Md.stop();
						b.Md = null;
						class_Ba.km(d);
					}
					b.j.Va.Fr(null != b.Md);
				}
				;
				window.requestAnimationFrame(M(this, this.kf));
				this.Jh = window.setInterval(function () {
					b.j.Bf.um(b.zd);
					b.zd = 0;
				}, 1E3);
				this.gs = window.setInterval(function () {
					a.D();
				}, 50);
				var c = class_p.l.yd.H();
				c = -200 > c ? -200 : 200 < c ? 200 : c;
				0 != c && (a.tm(class_p.l.yd.H()),
					this.j.Oa.Hb('Extrapolation set to ' + c + ' msec'));

				// Exposing global fields begin
				/** @type {class_sa} */
				const theRoom = a.U;

				/**
				 * @param {class_ua} dynDisc
				 * @return {{}}
				 */
				function getDiscObject(dynDisc) {
					return dynDisc == null ? null : {
						x: dynDisc.a.x,
						y: dynDisc.a.y,
						xspeed: dynDisc.F.x,
						yspeed: dynDisc.F.y,
						xgravity: dynDisc.oa.x,
						ygravity: dynDisc.oa.y,
						radius: dynDisc.$,
						bCoeff: dynDisc.o,
						invMass: dynDisc.ba,
						damping: dynDisc.Ba,
						color: dynDisc.S,
						cMask: dynDisc.h,
						cGroup: dynDisc.w
					};
				}

				function getScoresObject() {
					/** @type {class_ca} */
					const currentGame = theRoom.M;
					return currentGame == null ? null : {
						red: currentGame.Sb,
						blue: currentGame.Mb,
						time: currentGame.Lc,
						scoreLimit: currentGame.hb,
						timeLimit: 60 * currentGame.Ca,
						phase: currentGame.Bb
					};
				}

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
						fullPlayer: fullPlayer.on,
						team: fullPlayer.ea?.aa,
						position: pos,
						// When a player kicks the ball, it is set to min and decrements every frame. When it reaches 0, the player can kick when kickMana > 0.
						nextKickIn: fullPlayer.Xc,
						// This equals to rate * burst. When the player kicks the ball, burst is subtracted from it, and it increments every frame.
						// When it goes below 0, the player can't kick.
						kickRateBurst: fullPlayer.Bc,
						isBlinking: fullPlayer.Yb,
						id: fullPlayer.W,
						inputKey: fullPlayer.nb,
						name: fullPlayer.A,
						ping: fullPlayer.yb,
						u1: fullPlayer.ah,
						flag: fullPlayer.country,
						desynchronized: fullPlayer.Rd,
						avatarOverride: fullPlayer.Qd,
						avatar: fullPlayer.Zb,
						order: fullPlayer.Lb,
						admin: fullPlayer.cb
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
						segments: stadium.V,
						planes: stadium.qa,
						goals: stadium.vc,
						discs: stadium.G,
						joints: stadium.ob,
						redSpawnPoints: stadium.Ld,
						blueSpawnPoints: stadium.td,
						playerPhysics: stadium.me,
						limit: stadium.Eh,
						maxViewWidth: stadium.ff,
						cameraFollowsPlayer: stadium.Oe,
						canBeStored: stadium.Uf,
						kickOffResetFull: stadium.vf
					};
				}

				window.parent.g.majorInst = this.xa;
				window.parent.g.sendChat = this.j.Oa.sl;
				window.parent.g.showChatIndicator = this.j.Oa.qg;
				window.parent.g.setAvatar = text => this.Xf.sm(text);

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
					const ballPos = currentGame.ta.G[0].a;
					return {
						x: ballPos.x,
						y: ballPos.y
					};
				};
				window.parent.g.getDiscProperties = discIndex => {
					const currentGame = theRoom.M;
					return currentGame == null ? null : getDiscObject(currentGame.ta.G[discIndex]);
				};
				window.parent.g.getPlayerDiscProperties = playerId => {
					if (theRoom.M == null)
						return null;
					const fullPlayer = theRoom.na(playerId);
					return fullPlayer == null ? null : getDiscObject(fullPlayer.J);
				};
				window.parent.g.getDiscCount = () => {
					const currentGame = theRoom.M;
					return currentGame == null ? 0 : currentGame.ta.G.length;
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
								x: Math.abs(goals[0].X.x),
								y: Math.abs(goals[0].X.y)
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

			Or() {
				this.Md = new class_lc(this.xa, 3);
			}

			Kr(a) {
				a = new class_ob(a);
				let b = this;
				a.pb = function () {
					b.j.bb(null);
				}
				;
				a.ii = function (c, d, e) {
					b.xa.ra(class_ma.ma(c, d, e));
					b.j.bb(null);
				}
				;
				this.j.bb(a.f);
			}

			ja() {
				window.document.removeEventListener('keydown', M(this, this.Id));
				window.document.removeEventListener('keyup', M(this, this.Jd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Le);
				window.top.document.body.classList.remove('hb-playing');
				this.nb.ja();
				window.clearInterval(this.Jh);
				window.clearInterval(this.gs);
				window.clearTimeout(this.Wf);
			}

			hr(a) {
				let b = []
					,
					c = 0
					,
					d = this.xa.U.K;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.ea == a && b.push(class_fa.ma(e.W, class_u.La));
				}
				for (a = 0; a < b.length;)
					this.xa.ra(b[a++]);
			}

			kf() {
				this.Le = window.requestAnimationFrame(M(this, this.kf));
				this.nb.D();
				this.xa.D();
				this.Oc();
			}

			Oc() {
				var a = window.performance.now();
				1 == class_p.l.Ih.H() && 28.333333333333336 > a - this.ed || (this.ed = a,
					this.zd++,
					a = this.xa.U.na(this.xa.yc),
				null != a && (this.Ci = a.cb),
					this.j.D(this.xa));
			}

			Sp(a) {
				let b = this;
				this.Xf.qf(a) || this.Wn.no(function () {
					let c = new class_Xa;
					c.Yc = a;
					b.xa.ra(c);
				});
			}

			Rp(a) {
				this.Ch = a;
				let b = this;
				null == this.Wf && (this.Wf = window.setTimeout(function () {
					b.Wf = null;
					b.om(b.Ch);
				}, 1E3),
					this.om(this.Ch));
			}

			om(a) {
				a != this.Sk && (this.xa.ra(class_Ja.ma(a ? 0 : 1)),
					this.Sk = a);
			}

			Pm() {
				if (null != this.xa.U.M) {
					let a = new class_Ya;
					a.Hf = 120 != this.xa.U.M.Pa;
					this.xa.ra(a);
				}
			}

			Id(a) {
				switch (a.keyCode) {
					case 9:
					case 13:
						this.j.Oa.$a.focus();
						a.preventDefault();
						break;
					case 27:
						if (this.j.mp())
							this.j.bb(null);
						else {
							let b = this.j;
							b.te(!b.kd);
						}
						a.preventDefault();
						break;
					case 48:
						class_p.l.Db.Ha(0.1);
						break;
					case 49:
						class_p.l.Db.Ha(1);
						break;
					case 50:
						class_p.l.Db.Ha(2);
						break;
					case 51:
						class_p.l.Db.Ha(3);
						break;
					case 52:
						class_p.l.Db.Ha(4);
						break;
					case 53:
						class_p.l.Db.Ha(5);
						break;
					case 54:
						class_p.l.Db.Ha(6);
						break;
					case 55:
						class_p.l.Db.Ha(7);
						break;
					case 56:
						class_p.l.Db.Ha(15);
						break;
					case 57:
						class_p.l.Db.Ha(-1.5);
						break;
					case 80:
						this.Pm();
						break;
					default:
						this.nb.Id(a.code);
				}
			}

			Jd(a) {
				this.nb.Jd(a.code);
			}

			static km(a) {
				let b = new Date;
				class_Ub.mr(a, 'HBReplay-' + b.getFullYear() + '-' + class_ba.Gf('' + (b.getMonth() + 1)) + '-' + class_ba.Gf('' + b.getDate()) + '-' + class_ba.Gf('' + b.getHours()) + 'h' + class_ba.Gf('' + b.getMinutes()) + 'm.hbr2');
			}

			static Nq(a) {
				var b = a.U.K;
				let c = [];
				var d = 0;
				let e = 0;
				for (var f = 0; f < b.length;) {
					let g = b[f];
					++f;
					g.ea == class_u.La && c.push(g.W);
					g.ea == class_u.ga ? ++d : g.ea == class_u.Aa && ++e;
				}
				f = c.length;
				0 != f && (b = function () {
					return c.splice(Math.random() * c.length | 0, 1)[0];
				}
					,
					e == d ? 2 > f || (a.ra(class_fa.ma(b(), class_u.ga)),
						a.ra(class_fa.ma(b(), class_u.Aa))) : (d = e > d ? class_u.ga : class_u.Aa,
						a.ra(class_fa.ma(b(), d))));
			}
		}

		class class_pb {
			static bi(a) {
				return new PerfectScrollbar(a, {
					handlers: class_pb.hp
				});
			}
		}

		class class_V {
			constructor(a) {
				class_V.xb || this.Xa(a);
			}

			Xa(a) {
				this.Z = 0;
				this.U = a;
			}
		}

		class class_Vb {
			constructor(a) {
				this.Jp = a;
			}
		}

		class class_Sa {
			constructor(a) {
				function b(g, h) {
					function k() {
						l.className = n.Lf ? 'icon-ok' : 'icon-cancel';
					}

					g = c.get(g);
					let l = g.querySelector('i')
						,
						n = {
							Lf: h
						};
					k();
					g.onclick = function () {
						n.Lf = !n.Lf;
						k();
						e.pn(e.ij);
					}
					;
					return n;
				}

				this.ij = [];
				this.zs = a;
				this.Ia = class_x.Fa(class_Sa.wj);
				let c = class_x.Da(this.Ia)
					,
					d = new class_qb(c);
				this.sj = c.get('refresh');
				this.fn = c.get('join');
				a = c.get('create');
				this.vs = c.get('count');
				let e = this;
				a.onclick = function () {
					class_H.i(e.Ns);
				}
				;
				c.get('changenick').onclick = function () {
					class_H.i(e.Ms);
				}
				;
				c.get('settings').onclick = function () {
					class_H.i(e.Ps);
				}
				;
				let f = c.get('replayfile');
				f.onchange = function () {
					var g = f.files;
					if (!(1 > g.length)) {
						g = g.item(0);
						var h = new FileReader;
						h.onload = function () {
							class_E.i(e.Os, h.result);
						}
						;
						h.readAsArrayBuffer(g);
					}
				}
				;
				this.ys = b('fil-full', true);
				this.Qs = b('fil-pass', false); // Hide locked rooms
				this.Fs = c.get('listscroll');
				this.Ss = class_pb.bi(this.Fs);
				this.lj = c.get('list');
				this.sj.onclick = function () {
					d.Wl();
					e.an();
				}
				;
				this.fn.onclick = function () {
					null != e.Ud && class_E.i(e.ln, e.Ud.Ws);
				}
				;
				this.an();
			}

			an() {
				function a() {
					d.sj.disabled = false;
					d.pn(b);
					return null;
				}

				this.sn(null);
				this.sj.disabled = true;
				class_x.If(this.lj);
				let b = [];
				this.ij = [];
				let c = class_Wb.get().then(function (e) {
						return b = e;
					}, function () {
						return null;
					})
					,
					d = this;
				class_Sa.Rs(c).then(a, a);
			}

			pn(a) {
				this.ij = a;
				class_Wb.Zs(this.zs, a);
				a.sort(function (h, k) {
					return h.Te - k.Te;
				});
				class_x.If(this.lj);
				let b = 0
					,
					c = 0
					,
					d = !this.ys.Lf
					,
					e = !this.Qs.Lf
					,
					f = this
					,
					g = 0;
				for (; g < a.length;) {
					let h = a[g];
					++g;
					let k = h.Cd;
					if (d && k.K >= k.ef)
						continue;
					if (e && k.Jb)
						continue;
					let l = new class_rb(h);
					l.Ia.ondblclick = function () {
						class_E.i(f.ln, h);
					}
					;
					l.Ia.onclick = function () {
						f.sn(l);
					}
					;
					this.lj.appendChild(l.Ia);
					b += k.K;
					++c;
				}
				this.vs.textContent = '' + b + ' players in ' + c + ' rooms';
				this.Ss.update();
			}

			sn(a) {
				null != this.Ud && this.Ud.Ia.classList.remove('selected');
				this.Ud = a;
				null != this.Ud && this.Ud.Ia.classList.add('selected');
				this.fn.disabled = null == this.Ud;
			}

			static Rs(a) {
				let b = new Promise(function (c, d) {
						window.setTimeout(function () {
							d(null);
						}, 5E3);
					}
				);
				return Promise.race([b, a]);
			}
		}

		class class_Xb {
			constructor(a) {
				this.Js = a;
				this.Za = [];
			}

			add(a) {
				var b = this.Za.length;
				let c = 0
					,
					d = this.Wd = 0;
				for (; d < b;) {
					let e = d++
						,
						f = this.Za[e];
					f.index++;
					f.weight *= .97;
					this.Za[c].index < f.index && (c = e);
					this.Wd += f.weight;
				}
				b >= this.Js ? (b = this.Za[c],
					this.Wd -= b.weight,
					this.Za.splice(c, 1)) : b = new class_mc;
				b.value = a;
				b.weight = 1;
				b.index = 0;
				this.Wd += b.weight;
				for (a = 0; a < this.Za.length && this.Za[a].value <= b.value;)
					++a;
				this.Za.splice(a, 0, b);
			}

			hh() {
				if (0 == this.Za.length)
					return 0;
				if (1 == this.Za.length)
					return this.Za[0].value;
				var a = .5 * this.Wd;
				let b = this.Za[0].weight
					,
					c = 0;
				for (; c < this.Za.length - 1 && !(b >= a);)
					++c,
						b += this.Za[c].weight;
				return this.Za[c].value;
			}

			max() {
				return 0 == this.Za.length ? 0 : this.Za[this.Za.length - 1].value;
			}
		}

		class class_nc {
			constructor() {
				this.Dh = 0;
				this.Ip = 400;
				this.Ik = 64;
				this.$i = 32;
				this.sa = window.document.createElement('canvas');
				this.Zf = window.document.createElement('canvas');
				this.f = window.document.createElement('div');
				this.Zf.width = this.sa.width = this.$i;
				this.Zf.height = this.sa.height = this.Ik;
				this.Hh = this.Zf.getContext('2d', null);
				this.c = this.sa.getContext('2d', null);
				this.c.fillStyle = 'green';
				let a = []
					,
					b = 0
					,
					c = this.$i;
				for (; b < c;)
					++b,
						a.push(0);
				this.rq = a;
				this.f.appendChild(this.Zf);
				this.f.className = 'graph';
				this.f.hidden = true;
			}

			Gn(a) {
				this.f.hidden = false;
				0 > a ? (a = 150,
					this.c.fillStyle = '#c13535') : this.c.fillStyle = '#32FF32';
				let b = this.$i
					,
					c = this.Ik
					,
					d = this.Dh++;
				this.Dh >= b && (this.Dh = 0);
				this.rq[d] = a;
				this.c.clearRect(d, 0, 1, c);
				a = a * c / this.Ip;
				this.c.fillRect(d, c - a, 1, a);
				this.Hh.clearRect(0, 0, b, c);
				this.Hh.drawImage(this.sa, b - d - 1, 0);
				this.Hh.drawImage(this.sa, -d - 1, 0);
			}
		}

		class class_Gc {
			static Sr(a, b) {
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

		class class_T {
			constructor() {
			}

			Xr() {
				return 'idkey.' + this.cj + '.' + this.dj + '.' + this.ik;
			}

			Lr(a) {
				try {
					let b = class_A.ia(1024);
					b.m(1);
					let c = b.a;
					b.Wb(0);
					let d = b.a;
					b.oc(this.cj);
					b.oc(this.dj);
					b.Xb(a);
					let e = b.a - d;
					b.s.setUint16(c, e, b.Sa);
					let f = new Uint8Array(b.s.buffer, b.s.byteOffset + d, e);
					return window.crypto.subtle.sign(class_T.Am, this.Nl, f).then(function (g) {
						b.Tg(g);
						return b.Vb();
					});
				}
				catch (b) {
					return Promise.reject(class_v.Kb(b).Fb());
				}
			}

			static Lo() {
				try {
					return window.crypto.subtle.generateKey(class_T.qh, true, ['sign', 'verify']).then(function (a) {
						let b = a.privateKey;
						return window.crypto.subtle.exportKey('jwk', b).then(function (c) {
							let d = c.y
								,
								e = c.d
								,
								f = new class_T;
							f.cj = c.x;
							f.dj = d;
							f.ik = e;
							f.Nl = b;
							return f;
						});
					});
				}
				catch (a) {
					return Promise.reject(class_v.Kb(a).Fb());
				}
			}

			static Ko(a) {
				a = a.split('.');
				if (4 != a.length || 'idkey' != a[0])
					return Promise.reject('Invalid id format');
				let b = a[1]
					,
					c = a[2]
					,
					d = a[3];
				return class_T.os(b, c, d).then(function (e) {
					let f = new class_T;
					f.cj = b;
					f.dj = c;
					f.ik = d;
					f.Nl = e;
					return f;
				});
			}

			static hs(a, b) {
				try {
					let c = new class_K(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
					c.C();
					let d = c.rb(c.Rb())
						,
						e = c.rb()
						,
						f = new class_K(new DataView(d.buffer, d.byteOffset, d.byteLength), false)
						,
						g = f.kc()
						,
						h = f.kc()
						,
						k = f.rb();
					if (k.byteLength != b.byteLength)
						return Promise.reject(null);
					a = 0;
					let l = k.byteLength;
					for (; a < l;) {
						let n = a++;
						if (k[n] != b[n])
							return Promise.reject(null);
					}
					return class_T.ns(g, h).then(function (n) {
						return window.crypto.subtle.verify(class_T.Am, n, e, d);
					}).then(function (n) {
						if (!n)
							throw class_v.B(null);
						return g;
					});
				}
				catch (c) {
					return Promise.reject(class_v.Kb(c).Fb());
				}
			}

			static os(a, b, c) {
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
					return Promise.reject(class_v.Kb(d).Fb());
				}
			}

			static ns(a, b) {
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
					return Promise.reject(class_v.Kb(c).Fb());
				}
			}
		}

		class class_da {
			constructor(a, b) {
				let c = []
					,
					d = 0;
				for (; d < a.length;)
					c.push(this.Fp(a[d++], b));
				this.df = c;
			}

			Mo() {
				return 2.31 + .1155 * (this.df.length - 1);
			}

			Oc(a, b) {
				b /= 2.31;
				let c = 0;
				a.imageSmoothingEnabled = true;
				let d = 0
					,
					e = this.df;
				for (; d < e.length;) {
					let g = e[d];
					++d;
					var f = b - .05 * c;
					let h = class_da.vn.eval(f)
						,
						k = 35 * -(this.df.length - 1) + 70 * c;
					f = 180 * class_da.wn.eval(f);
					a.globalAlpha = h;
					a.drawImage(g, f * (0 != (c & 1) ? -1 : 1) - .5 * g.width, k - .5 * g.height);
					a.globalAlpha = 1;
					++c;
				}
				a.imageSmoothingEnabled = false;
			}

			er(a) {
				let b = 0;
				a.imageSmoothingEnabled = true;
				let c = 0
					,
					d = this.df;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					a.drawImage(e, .5 * -e.width, 35 * -(this.df.length - 1) + 70 * b - .5 * e.height);
					++b;
				}
				a.imageSmoothingEnabled = false;
			}

			nc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			Fp(a, b) {
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

		class class_Yb {
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

		class class_Ka {
			constructor(a) {
				function b() {
					let t = g[f];
					a.Cl = e ? t : 0;
					c.get('spd').textContent = t + 'x';
				}

				this.fg = false;
				this.f = class_x.Fa(class_Ka.O);
				let c = class_x.Da(this.f);
				this.xi = a;
				let d = this;
				c.get('reset').onclick = function () {
					a.yi();
					d.rl();
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
				this.Tr = c.get('time');
				let k = c.get('timebar');
				this.Mq = c.get('progbar');
				let l = c.get('timetooltip')
					,
					n = 0
					,
					r = a.el;
				for (; n < r.length;) {
					let t = r[n];
					++n;
					let z = window.document.createElement('div');
					z.className = 'marker';
					z.classList.add('k' + t.kind);
					z.style.left = 100 * t.qj + '%';
					k.appendChild(z);
				}
				k.onclick = function (t) {
					a.rr((t.pageX - k.offsetLeft) / k.clientWidth * a.oh * a.tf);
					d.fg || (d.fg = true,
						d.hq(),
						d.rl());
				}
				;
				k.onmousemove = function (t) {
					t = (t.pageX - k.offsetLeft) / k.clientWidth;
					l.textContent = class_Ka.fl(a.tf * a.oh * t);
					return l.style.left = 'calc(' + 100 * t + '% - 30px)';
				}
				;
				this.sp = c.get('leave');
				this.sp.onclick = function () {
					class_H.i(d.je);
				};
			}

			D() {
				this.Tr.textContent = class_Ka.fl(this.xi.Tb);
				this.Mq.style.width = 100 * this.xi.To() + '%';
				!this.fg || 0 < this.xi.Nd || (this.fg = false,
					this.gq());
			}

			static fl(a) {
				a = a / 1E3 | 0;
				return (a / 60 | 0) + ':' + class_ba.Gf(class_Q.De(a % 60));
			}
		}

		class class_Wb {
			static parse(a) {
				a.C();
				let b = [];
				for (; 0 != a.s.byteLength - a.a;) {
					let c = a.oe(a.Rb())
						,
						d = a.Ql(a.Rb());
					try {
						let e = new class_Ob;
						e.ka(new class_K(new DataView(d), false));
						let f = new class_oc;
						f.Cd = e;
						f.aa = c;
						b.push(f);
					}
					catch (e) {
					}
				}
				return b;
			}

			static Bs(a, b, c, d) {
				return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
			}

			static Zs(a, b) {
				let c = a.Ic;
				a = a.Kc;
				let d = 0;
				for (; d < b.length;) {
					let e = b[d];
					++d;
					let f = e.Cd;
					e.Te = 6378 * class_Wb.Bs(.017453292519943295 * f.Ic, .017453292519943295 * f.Kc, .017453292519943295 * c, .017453292519943295 * a);
					isFinite(e.Te) || (e.Te = 22E3);
				}
			}

			static get() {
				return class_aa.H(class_p.Me + 'api/list', 'arraybuffer').then(function (a) {
					return class_Wb.parse(new class_K(new DataView(a), false));
				});
			}
		}

		class class_rb {
			constructor(a) {
				this.Ia = class_x.Fa(class_rb.wj, 'tbody');
				var b = class_x.Da(this.Ia);
				let c = b.get('name')
					,
					d = b.get('players')
					,
					e = b.get('distance')
					,
					f = b.get('pass');
				b = b.get('flag');
				this.Ws = a;
				let g = a.Cd;
				c.textContent = g.A;
				d.textContent = '' + g.K + '/' + g.ef;
				f.textContent = g.Jb ? 'Yes' : 'No';
				e.textContent = '' + (a.Te | 0) + 'km';
				try {
					b.classList.add('f-' + g.tb.toLowerCase());
				}
				catch (h) {
				}
				9 > a.Cd.Pd && this.Ia.classList.add('old');
			}
		}

		class class_Zb {
			static i(a, b, c, d, e) {
				null != a && a(b, c, d, e);
			}
		}

		class class_ra {
			constructor() {
				this.cd = new Map;
			}

			Qa(a, b) {
				this.cd.set(a, b);
			}

			H(a) {
				return this.cd.get(a);
			}

			Vq(a) {
				this.cd.delete(a);
			}

			Ro(a) {
				let b = []
					,
					c = this.cd.keys()
					,
					d = c.next();
				for (; !d.done;) {
					let e = d.value;
					d = c.next();
					this.cd.get(e) == a && b.push(e);
				}
				return b;
			}

			ye() {
				let a = {}
					,
					b = this.cd.keys()
					,
					c = b.next();
				for (; !c.done;) {
					let d = c.value;
					c = b.next();
					a[d] = this.cd.get(d);
				}
				return JSON.stringify(a);
			}

			static $f(a) {
				let b = new class_ra
					,
					c = class_Bc.Zm(a)
					,
					d = 0;
				for (; d < c.length;) {
					let e = c[d];
					++d;
					b.cd.set(e, a[e]);
				}
				return b;
			}

			static Kh(a) {
				return class_ra.$f(JSON.parse(a));
			}

			static jk() {
				let a = new class_ra;
				a.Qa('ArrowUp', 'Up');
				a.Qa('KeyW', 'Up');
				a.Qa('ArrowDown', 'Down');
				a.Qa('KeyS', 'Down');
				a.Qa('ArrowLeft', 'Left');
				a.Qa('KeyA', 'Left');
				a.Qa('ArrowRight', 'Right');
				a.Qa('KeyD', 'Right');
				a.Qa('KeyX', 'Kick');
				a.Qa('Space', 'Kick');
				a.Qa('ControlLeft', 'Kick');
				a.Qa('ControlRight', 'Kick');
				a.Qa('ShiftLeft', 'Kick');
				a.Qa('ShiftRight', 'Kick');
				a.Qa('Numpad0', 'Kick');
				return a;
			}
		}

		class class_pc {
			constructor(a) {
				this.Fj = new Map;
				this.Uo = new class_lb(100, 16);
				this.Gg = false;
				this.yb = 0;
				this.pa = a;
				a = class_A.ia(8);
				a.u(Math.random());
				this.Pe = a.Vb();
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.pa.Ub(b, a);
			}
		}

		class class_w {
			static $m(a) {
				if (null == a)
					return null;
				if (a instanceof Array)
					return Array;
				{
					let b = a.g;
					if (null != b)
						return b;
					a = class_w.Dj(a);
					return null != a ? class_w.En(a) : null;
				}
			}

			static Je(a, b) {
				if (null == a)
					return 'null';
				if (5 <= b.length)
					return '<...>';
				var c = typeof a;
				'function' == c && (a.b || a.Pf) && (c = 'object');
				switch (c) {
					case 'function':
						return '<function>';
					case 'object':
						if (a.Gb) {
							var d = sb[a.Gb].Xd[a.mb];
							c = d.wc;
							if (d.Ie) {
								b += '\t';
								var e = []
									,
									f = 0;
								for (d = d.Ie; f < d.length;) {
									let g = d[f];
									f += 1;
									e.push(class_w.Je(a[g], b));
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
									c += (0 < d ? ',' : '') + class_w.Je(a[d], b);
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
								c += b + f + ' : ' + class_w.Je(a[f], b));
						b = b.substring(1);
						return c += '\n' + b + '}';
					case 'string':
						return a;
					default:
						return String(a);
				}
			}

			static Bj(a, b) {
				for (; ;) {
					if (null == a)
						return false;
					if (a == b)
						return true;
					let c = a.nd;
					if (null != c && (null == a.ha || a.ha.nd != c)) {
						let d = 0
							,
							e = c.length;
						for (; d < e;) {
							let f = c[d++];
							if (f == b || class_w.Bj(f, b))
								return true;
						}
					}
					a = a.ha;
				}
			}

			static Cn(a, b) {
				if (null == b)
					return false;
				switch (b) {
					case Array:
						return a instanceof Array;
					case Cc:
						return 'boolean' == typeof a;
					case Lc:
						return null != a;
					case D:
						return 'number' == typeof a;
					case $b:
						return 'number' == typeof a ? (a | 0) === a : false;
					case String:
						return 'string' == typeof a;
					default:
						if (null != a)
							if ('function' == typeof b) {
								if (class_w.Bn(a, b))
									return true;
							}
							else {
								if ('object' == typeof b && class_w.Dn(b) && a instanceof b)
									return true;
							}
						else
							return false;
						return b == Mc && null != a.b || b == Nc && null != a.Pf ? true : null != a.Gb ? sb[a.Gb] == b : false;
				}
			}

			static Bn(a, b) {
				return a instanceof b ? true : b.Cj ? class_w.Bj(class_w.$m(a), b) : false;
			}

			static I(a, b) {
				if (null == a || class_w.Cn(a, b))
					return a;
				throw class_v.B('Cannot cast ' + class_Q.De(a) + ' to ' + class_Q.De(b));
			}

			static Dj(a) {
				a = class_w.Fn.call(a).slice(8, -1);
				return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a;
			}

			static Dn(a) {
				return null != class_w.Dj(a);
			}

			static En(a) {
				return globalScope[a];
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

		class class_tb {
			constructor() {
				this.gg = false;
				this.A = '';
				this.uh = 0;
				this.Sf = '';
				this.jb = new class_ya;
				let a = window.document.createElement('canvas');
				a.width = 64;
				a.height = 64;
				this.qb = a.getContext('2d', null);
				this.Qj = this.qb.createPattern(this.qb.canvas, 'no-repeat');
				this.to();
			}

			to() {
				let a = window.document.createElement('canvas');
				a.width = 160;
				a.height = 34;
				this.Il = a.getContext('2d', null);
			}

			es() {
				let a = this.Il;
				a.resetTransform();
				a.clearRect(0, 0, 160, 34);
				a.font = '26px sans-serif';
				a.fillStyle = 'white';
				160 < a.measureText(this.A).width ? (a.textAlign = 'left',
					a.translate(2, 29)) : (a.textAlign = 'center',
					a.translate(80, 29));
				a.fillText(this.A, 0, 0);
			}

			Fo(a, b, c) {
				a.drawImage(this.Il.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17);
			}

			D(a, b) {
				if (null != a.J) {
					let c = class_p.l.Lm.H() ? b.jb[a.ea.aa] : a.ea.Km
						,
						d = null != a.Qd ? a.Qd : a.Zb
						,
						e = class_p.l.zm.H() && null != d;
					if (!class_tb.Yn(this.jb, c) || !e && a.Lb != this.uh || e && this.Sf != d)
						class_tb.po(this.jb, c),
							e ? (this.Sf = d,
								this.uh = -1) : (this.Sf = '' + a.Lb,
								this.uh = a.Lb),
							this.Tq(this.Sf);
				}
				this.yo = 0 < b.M.Pa || !a.Yb ? 'black' : a.Yb && 0 >= a.Xc && 0 <= a.Bc ? 'white' : 'black';
				a.A != this.A && (this.A = a.A,
					this.es());
			}

			Tq(a) {
				let b = this.jb.eb;
				if (!(1 > b.length)) {
					this.qb.save();
					this.qb.translate(32, 32);
					this.qb.rotate(3.141592653589793 * this.jb.pd / 128);
					for (var c = -32, d = 64 / b.length, e = 0; e < b.length;)
						this.qb.fillStyle = class_W.nc(b[e++]),
							this.qb.fillRect(c, -32, d + 4, 64),
							c += d;
					this.qb.restore();
					this.qb.fillStyle = class_W.nc(this.jb.ld);
					this.qb.textAlign = 'center';
					this.qb.textBaseline = 'alphabetic';
					this.qb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
					this.qb.fillText(a, 32, 44);
					this.Qj = this.qb.createPattern(this.qb.canvas, 'no-repeat');
				}
			}

			static Yn(a, b) {
				if (a.pd != b.pd || a.ld != b.ld)
					return false;
				a = a.eb;
				b = b.eb;
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

			static po(a, b) {
				a.pd = b.pd;
				a.ld = b.ld;
				a.eb = b.eb.slice(0);
			}
		}

		class class_Za {
			constructor(a, b, c) {
				this.od = this.xe = null;
				this.ve = [];
				this.kk = 0;
				this.ul = false;
				this.dg = [];
				this.$c = [];
				this.Ra = new RTCPeerConnection({
					iceServers: b
				}, class_Za.mo);
				let d = this;
				this.Uh = new Promise(function (e) {
						d.ip = e;
					}
				);
				this.Ra.onicecandidate = function (e) {
					null == e.candidate ? d.ip(d.dg) : (e = e.candidate,
					null != e.candidate && '' != e.candidate && (null != d.rg && d.rg(e),
						d.dg.push(e)));
				}
				;
				for (b = 0; b < c.length;)
					this.ro(c[b++]);
				this.aa = a;
			}

			Ri(a) {
				null == a && (a = 1E4);
				window.clearTimeout(this.xe);
				this.xe = window.setTimeout(M(this, this.gp), a);
			}

			qo(a, b) {
				let c = this;
				this.mk(this.Ra.setRemoteDescription(a).then(function () {
					return c.Ra.createAnswer();
				}), b, 500);
			}

			so() {
				this.mk(this.Ra.createOffer(), [], 1E3);
			}

			mk(a, b, c) {
				let d = this;
				a.then(function (e) {
					return d.Ra.setLocalDescription(e).then(function () {
						return e;
					});
				}).then(function (e) {
					function f() {
						return e;
					}

					let g = 0;
					for (; g < b.length;)
						d.Gj(b[g++]);
					return class_Gc.Sr(d.Uh, c).then(f, f);
				}).then(function (e) {
					d.hi(e);
				}).catch(function () {
					d.cg();
				});
			}

			ro(a) {
				let b = {
					id: this.$c.length,
					negotiated: true,
					ordered: a.ordered
				};
				a.reliable || (b.maxRetransmits = 0);
				a = this.Ra.createDataChannel(a.name, b);
				a.binaryType = 'arraybuffer';
				let c = this;
				a.onopen = function () {
					let d = 0
						,
						e = c.$c;
					for (; d < e.length;)
						if ('open' != e[d++].readyState)
							return;
					null != c.Gd && c.Gd();
				}
				;
				a.onclose = function () {
					c.cg();
				}
				;
				a.onmessage = function () {
					c.cg();
				}
				;
				this.$c.push(a);
			}

			Gj(a) {
				let b = this;
				window.setTimeout(function () {
					b.Ra.addIceCandidate(a);
				}, this.kk);
			}

			gp() {
				this.cg();
			}

			cg() {
				null != this.gd && this.gd();
				this.ja();
			}

			ja() {
				this.ck();
				this.Ra.close();
			}

			ck() {
				window.clearTimeout(this.xe);
				this.hi = this.Gd = this.rg = this.gd = null;
				this.Ra.onicecandidate = null;
				this.Ra.ondatachannel = null;
				this.Ra.onsignalingstatechange = null;
				this.Ra.oniceconnectionstatechange = null;
				let a = 0
					,
					b = this.$c;
				for (; a < b.length;) {
					let c = b[a];
					++a;
					c.onopen = null;
					c.onclose = null;
					c.onmessage = null;
				}
			}
		}

		class class_ub {
			constructor() {
				this.Al = new class_nc;
				this.f = class_x.Fa(class_ub.O);
				let a = class_x.Da(this.f);
				this.zg = a.get('ping');
				this.Jo = a.get('fps');
				class_x.replaceWith(a.get('graph'), this.Al.f);
			}

			Er(a, b) {
				this.zg.textContent = 'Ping: ' + a + ' - ' + b;
			}

			um(a) {
				this.Jo.textContent = 'Fps: ' + a;
			}
		}

		class class_Bc {
			static Zm(a) {
				let b = [];
				if (null != a) {
					let d = Object.prototype.hasOwnProperty;
					for (var c in a)
						'__id__' != c && 'hx__closures__' != c && d.call(a, c) && b.push(c);
				}
				return b;
			}
		}

		class class_ac {
			constructor(a, b, c, d, e, f) {
				this.rh = this.Bh = false;
				this.pa = new class_Za(0, b, d);
				let g = this;
				this.pa.gd = function () {
					g.We(na.Ge);
				}
				;
				this.pa.Gd = function () {
					null != g.Gd && g.Gd(new class_bc(g.pa));
					g.pa = null;
					g.dk();
				}
				;
				this.pa.hi = function (h) {
					g.wr = h;
					g.Y = new WebSocket(a + 'client?id=' + c + (null == f ? '' : '&token=' + f));
					g.Y.binaryType = 'arraybuffer';
					g.Y.onclose = function (k) {
						g.Bh || g.We(na.He(k.code));
					}
					;
					g.Y.onerror = function () {
						g.Bh || g.We(na.Error);
					}
					;
					g.Y.onmessage = M(g, g.Rh);
					g.Y.onopen = function () {
						null != g.tl && g.tl();
						g.pa.Ri();
						g.Gi(g.wr, g.pa.dg, e);
						g.pa.rg = M(g, g.Di);
						g.pa.Uh.then(function () {
							g.Rc(0, null);
						});
					};
				}
				;
				this.pa.so();
			}

			Tn() {
				this.We(na.Fe);
			}

			dk() {
				null != this.Y && (this.Y.onclose = null,
					this.Y.onmessage = null,
					this.Y.onerror = null,
					this.Y.onopen = null,
					this.Y.close(),
					this.Y = null);
				null != this.pa && (this.pa.ja(),
					this.pa = null);
			}

			We(a) {
				null != this.gd && this.gd(a);
				this.dk();
			}

			Rh(a) {
				var b = new class_K(new DataView(a.data));
				a = b.C();
				0 < b.s.byteLength - b.a && (b = new class_K(new DataView(pako.inflateRaw(b.rb()).buffer), false));
				switch (a) {
					case 1:
						a = b.kc();
						b = b.Eg();
						let c = []
							,
							d = 0;
						for (; d < b.length;)
							c.push(new RTCIceCandidate(b[d++]));
						this.Qh(a, c);
						break;
					case 4:
						this.Ph(new RTCIceCandidate(b.Eg()));
				}
			}

			Qh(a, b) {
				this.pa.Ri(this.rh ? 1E4 : 4E3);
				this.Bh = true;
				null != this.ll && this.ll();
				let c = this;
				this.pa.Ra.setRemoteDescription(new RTCSessionDescription({
					sdp: a,
					type: 'answer'
				}), function () {
					let d = 0;
					for (; d < b.length;)
						c.pa.Ra.addIceCandidate(b[d++]);
				}, function () {
					c.We(na.Error);
				});
			}

			Ph(a) {
				this.pa.Ra.addIceCandidate(a);
			}

			Rc(a, b) {
				if (null != this.Y) {
					var c = class_A.ia(32, false);
					c.m(a);
					null != b && (a = pako.deflateRaw(b.Vb()),
						c.Xb(a));
					this.Y.send(c.Od());
				}
			}

			Gi(a, b, c) {
				let d = class_A.ia(32, false);
				d.m(this.rh ? 1 : 0);
				d.oc(a.sdp);
				d.Ug(b);
				null != c && d.Xb(c.Vb());
				this.Rc(1, d);
			}

			Di(a) {
				let b = class_A.ia(32, false);
				b.Ug(a);
				this.Rc(4, b);
			}

			static Qo(a) {
				switch (a.mb) {
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

		class class_vb {
			constructor(a) {
				this.f = class_x.Fa(class_vb.O);
				class_x.Da(this.f).get('features').textContent = a.join(', ');
			}
		}

		class class_bc {
			constructor(a) {
				this.od = null;
				this.Qq = 1E4;
				this.Dd = true;
				a.ck();
				this.Ra = a.Ra;
				this.$c = a.$c;
				this.ve = a.ve;
				this.od = a.od;
				this.Mm = window.performance.now();
				let b = null
					,
					c = this;
				b = function () {
					var e = c.Qq - c.Qr();
					0 >= e ? c.ja() : (window.clearTimeout(c.Om),
						e = window.setTimeout(b, e + 1E3),
						c.Om = e);
				}
				;
				b();
				this.Ra.oniceconnectionstatechange = function () {
					let e = c.Ra.iceConnectionState;
					'closed' != e && 'failed' != e || c.ja();
				}
				;
				a = 0;
				let d = this.$c;
				for (; a < d.length;) {
					let e = d[a];
					++a;
					e.onmessage = function (f) {
						c.Dd && (c.Mm = window.performance.now(),
						null != c.tg && c.tg(f.data));
					}
					;
					e.onclose = function () {
						c.ja();
					};
				}
			}

			Qr() {
				return window.performance.now() - this.Mm;
			}

			Ub(a, b) {
				if (this.Dd && (a = this.$c[a],
				'open' == a.readyState)) {
					b = b.Qg();
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
				window.clearTimeout(this.Om);
				this.Dd && (this.Dd = false,
					this.Ra.close(),
				null != this.lf && this.lf());
			}
		}

		class class_I {
			constructor() {
				this.Ng = this.Og = this.wa = null;
				this.hk = 0;
				this.da = this.X = this.ce = null;
				this.Gc = 0;
				this.o = 1;
				this.h = 63;
				this.w = 32;
				this.ub = 1 / 0;
				this.Ya = true;
				this.S = 0;
			}

			fa(a) {
				let b = 0
					,
					c = a.a;
				a.m(0);
				a.m(this.X.Bd);
				a.m(this.da.Bd);
				0 != this.Gc && (b = 1,
					a.u(this.Gc));
				this.ub != 1 / 0 && (b |= 2,
					a.u(this.ub));
				0 != this.S && (b |= 4,
					a.P(this.S));
				this.Ya && (b |= 8);
				a.s.setUint8(c, b);
				a.u(this.o);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a, b) {
				let c = a.C();
				this.X = b[a.C()];
				this.da = b[a.C()];
				this.Gc = 0 != (c & 1) ? a.v() : 0;
				this.ub = 0 != (c & 2) ? a.v() : 1 / 0;
				this.S = 0 != (c & 4) ? a.N() : 0;
				this.Ya = 0 != (c & 8);
				this.o = a.v();
				this.h = a.N();
				this.w = a.N();
			}

			Sc(a) {
				a *= .017453292519943295;
				if (0 > a) {
					a = -a;
					let b = this.X;
					this.X = this.da;
					this.da = b;
					this.Gc = -this.Gc;
				}
				a > class_I.yn && a < class_I.xn && (this.ub = 1 / Math.tan(a / 2));
			}

			Po() {
				return 0 != 0 * this.ub ? 0 : 114.59155902616465 * Math.atan(1 / this.ub);
			}

			ne() {
				if (0 == 0 * this.ub) {
					var a = this.da.a
						,
						b = this.X.a
						,
						c = .5 * (a.x - b.x);
					a = .5 * (a.y - b.y);
					b = this.X.a;
					let d = this.ub;
					this.ce = new class_O(b.x + c + -a * d, b.y + a + c * d);
					a = this.X.a;
					b = this.ce;
					c = a.x - b.x;
					a = a.y - b.y;
					this.hk = Math.sqrt(c * c + a * a);
					c = this.X.a;
					a = this.ce;
					this.Ng = new class_O(-(c.y - a.y), c.x - a.x);
					c = this.ce;
					a = this.da.a;
					this.Og = new class_O(-(c.y - a.y), c.x - a.x);
					0 >= this.ub && (a = c = this.Ng,
						c.x = -a.x,
						c.y = -a.y,
						a = c = this.Og,
						c.x = -a.x,
						c.y = -a.y);
				}
				else
					a = this.X.a,
						b = this.da.a,
						c = a.x - b.x,
						a = -(a.y - b.y),
						b = Math.sqrt(a * a + c * c),
						this.wa = new class_O(a / b, c / b);
			}
		}

		class class_lb {
			constructor(a, b) {
				this.Vj = a;
				this.Xi = b;
				this.qc = a;
				this.cf = window.performance.now();
			}

			Qm() {
				var a;
				null == a && (a = 1);
				this.D();
				return a <= this.qc ? (this.qc -= a,
					true) : false;
			}

			Rr() {
				this.D();
				let a = 1 - this.qc;
				if (0 >= a)
					return 0;
				let b = window.performance.now();
				return this.cf + a * this.Xi - b;
			}

			no(a) {
				let b = this.Rr();
				--this.qc;
				window.setTimeout(a, b | 0);
			}

			D() {
				let a = window.performance.now()
					,
					b = Math.floor((a - this.cf) / this.Xi);
				this.cf += b * this.Xi;
				this.qc += b;
				this.qc >= this.Vj && (this.qc = this.Vj,
					this.cf = a);
			}
		}

		class class_kb {
			constructor() {
				this.f = class_x.Fa(class_kb.O);
				let a = class_x.Da(this.f);
				this.xc = a.get('log');
				this.wh = a.get('cancel');
			}

			ca(a) {
				let b = window.document.createElement('p');
				b.textContent = a;
				this.xc.appendChild(b);
			}
		}

		class class_kc {
			constructor(a) {
				this.ed = window.performance.now();
				this.zd = this.Le = 0;
				this.xa = a;
				this.j = new class_wa(a.yc);
				let b = new class_Tb(this.j);
				b.vi(a.U);
				window.document.addEventListener('keydown', M(this, this.Id));
				window.document.addEventListener('keyup', M(this, this.Jd));
				window.requestAnimationFrame(M(this, this.kf));
				let c = this;
				this.Jh = window.setInterval(function () {
					c.j.Bf.um(c.zd);
					c.zd = 0;
				}, 1E3);
				this.ym(class_p.l.Db.H());
				this.j.f.classList.add('replayer');
				this.pe = new class_Ka(a);
				this.pe.hq = function () {
					b.bs(a.U);
				}
				;
				this.pe.gq = function () {
					c.j.te(null == a.U.M);
					b.vi(a.U);
				}
				;
				this.pe.rl = function () {
					c.j.fb.Nb.ir();
				}
				;
				this.j.f.appendChild(this.pe.f);
			}

			ja() {
				window.document.removeEventListener('keydown', M(this, this.Id));
				window.document.removeEventListener('keyup', M(this, this.Jd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Le);
				window.clearInterval(this.Jh);
			}

			kf() {
				this.Le = window.requestAnimationFrame(M(this, this.kf));
				this.xa.D();
				this.Oc();
			}

			Oc() {
				this.pe.D();
				let a = window.performance.now();
				1 == class_p.l.Ih.H() && 28.333333333333336 > a - this.ed || (this.ed = a,
					this.zd++,
					this.ym(class_p.l.Db.H()),
				0 < this.xa.Nd || this.j.D(this.xa));
			}

			Id(a) {
				switch (a.keyCode) {
					case 27:
						let b = this.j;
						b.te(!b.kd);
						a.preventDefault();
						break;
					case 48:
						class_p.l.Db.Ha(0.1);
						break;
					case 49:
						class_p.l.Db.Ha(1);
						break;
					case 50:
						class_p.l.Db.Ha(2);
						break;
					case 51:
						class_p.l.Db.Ha(3);
						break;
					case 52:
						class_p.l.Db.Ha(4);
						break;
					case 53:
						class_p.l.Db.Ha(5);
						break;
					case 54:
						class_p.l.Db.Ha(6);
						break;
					case 55:
						class_p.l.Db.Ha(7);
						break;
					case 56:
						class_p.l.Db.Ha(15);
						break;
					case 57:
						class_p.l.Db.Ha(-1.5);
						break;
				}
			}

			ym() {
				let a = class_p.l.Db.H()
					,
					b = this.j.fb.Nb;
				b.qe = class_p.l.Ai.H();
				b.Rg = 35;
				// Modified zoom
				b.Kd = 0;
				b.Dg = 1 + .25 * (a - 1);
			}

			Jd() {
			}
		}

		class class_qc {
			constructor(a, b) {
				this.r = new RegExp(a, b.split('u').join(''));
			}

			match(a) {
				this.r.global && (this.r.lastIndex = 0);
				this.r.pc = this.r.exec(a);
				this.r.jh = a;
				return null != this.r.pc;
			}

			jn(a) {
				if (null != this.r.pc && 0 <= a && a < this.r.pc.length)
					return this.r.pc[a];
				throw class_v.B('EReg::matched');
			}

			Hs() {
				if (null == this.r.pc)
					throw class_v.B('No string matched');
				return {
					qj: this.r.pc.index,
					Es: this.r.pc[0].length
				};
			}

			Gs(a, b) {
				var c;
				null == c && (c = -1);
				if (this.r.global) {
					this.r.lastIndex = b;
					this.r.pc = this.r.exec(0 > c ? a : class_P.substr(a, 0, b + c));
					if (b = null != this.r.pc)
						this.r.jh = a;
					return b;
				}
				if (c = this.match(0 > c ? class_P.substr(a, b, null) : class_P.substr(a, b, c)))
					this.r.jh = a,
						this.r.pc.index += b;
				return c;
			}
		}

		class class_mb {
			constructor(a, b) {
				this.f = class_x.Fa(class_mb.O);
				let c = class_x.Da(this.f);
				this.gf = c.get('name');
				this.Qf = c.get('admin');
				this.Ye = c.get('kick');
				this.ud = c.get('close');
				let d = this;
				this.Qf.onclick = function () {
					class_La.i(d.Op, d.Qb, !d.Dl);
				}
				;
				this.Ye.onclick = function () {
					class_E.i(d.ii, d.Qb);
				}
				;
				this.ud.onclick = function () {
					class_H.i(d.pb);
				}
				;
				this.Qb = a.W;
				this.Mj(a.A);
				this.Lj(a.cb);
				this.Qf.disabled = !b || 0 == this.Qb;
				this.Ye.disabled = !b || 0 == this.Qb;
			}

			D(a, b) {
				a = a.na(this.Qb);
				null == a ? class_H.i(this.pb) : (this.ds(a),
					this.Qf.disabled = !b || 0 == this.Qb,
					this.Ye.disabled = !b || 0 == this.Qb);
			}

			ds(a) {
				this.le != a.A && this.Mj(a.A);
				this.Dl != a.cb && this.Lj(a.cb);
			}

			Mj(a) {
				this.le = a;
				this.gf.textContent = a;
			}

			Lj(a) {
				this.Dl = a;
				this.Qf.textContent = a ? 'Remove Admin' : 'Give Admin';
			}
		}

		class class_va {
		}

		class class_Dc {
			constructor(a) {
				this.current = 0;
				this.ps = a;
			}

			next() {
				return this.ps[this.current++];
			}
		}

		class class_wb {
			constructor() {
				this.ib = null;
				this.f = class_x.Fa(class_wb.O);
				let a = class_x.Da(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.gi);
				}
				;
				this.li = a.get('pick');
				this.lk = a.get('delete');
				this.Bk = a.get('export');
				let c = a.get('list')
					,
					d = a.get('file');
				this.Sg();
				this.li.onclick = function () {
					null != b.ib && b.ib.Vd().then(function (e) {
						class_E.i(b.wg, e);
					});
				}
				;
				this.lk.onclick = function () {
					if (null != b.ib) {
						var e = b.ib.Ym;
						null != e && (b.ib.Ia.remove(),
							b.ib = null,
							e(),
							b.Sg());
					}
				}
				;
				this.Bk.onclick = function () {
					null != b.ib && b.ib.Vd().then(function (e) {
						class_Ub.nr(e.ye(), e.A + '.hbs');
					});
				}
				;
				this.oi(c);
				this.Pl = class_pb.bi(c);
				window.setTimeout(function () {
					b.Pl.update();
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
								h.Vk(g);
								class_E.i(b.wg, h);
							}
							catch (h) {
								g = class_v.Kb(h).Fb(),
									g instanceof SyntaxError ? class_E.i(b.ji, 'SyntaxError in line: ' + class_Q.De(g.lineNumber)) : g instanceof class_Vb ? class_E.i(b.ji, g.Jp) : class_E.i(b.ji, 'Error loading stadium file.');
							}
						}
						;
						f.readAsText(e);
					}
				};
			}

			Sg() {
				this.li.disabled = null == this.ib;
				this.lk.disabled = null == this.ib || null == this.ib.Ym;
				this.Bk.disabled = null == this.ib;
			}

			bl(a, b, c) {
				let d = window.document.createElement('div');
				d.textContent = a;
				d.className = 'elem';
				null != c && d.classList.add('custom');
				let e = {
						Ia: d,
						Vd: b,
						Ym: c
					}
					,
					f = this;
				d.onclick = function () {
					null != f.ib && f.ib.Ia.classList.remove('selected');
					f.ib = e;
					d.classList.add('selected');
					f.Sg();
				}
				;
				d.ondblclick = function () {
					f.ib = e;
					f.Sg();
					return f.li.onclick();
				}
				;
				return d;
			}

			oi(a) {
				let b = class_q.Mh()
					,
					c = 0;
				for (; c < b.length;) {
					let e = b[c];
					++c;
					a.appendChild(this.bl(e.A, function () {
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
						a.appendChild(d.bl(g.name, function () {
							return class_xb.get(h);
						}, function () {
							return class_xb.delete(h);
						}));
					}
					d.Pl.update();
				});
			}
		}

		class class_P {
			static gj(a, b) {
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

		class class_C {
			static Cs() {
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

			static kj(a) {
				class_C.Cs() && class_C.xs(function () {
					class_Ic.kj();
					let b = null == class_p.l.Ue.H() ? class_ka.So().then(function (d) {
							class_p.l.Ue.Ha(d);
						}, function () {
						}) : Promise.resolve(null)
						,
						c = class_aa.H(window.parent._gdir + 'res.dat', 'arraybuffer').then(function (d) {
							d = new JSZip(d);
							class_p.Na = new class_rc(d);
							return Promise.all([class_p.Na.Eo, class_C.dh(d.file('images/grass.png').asArrayBuffer()).then(function (e) {
								return class_p.Xo = e;
							}), class_C.dh(d.file('images/concrete.png').asArrayBuffer()).then(function (e) {
								return class_p.jo = e;
							}), class_C.dh(d.file('images/concrete2.png').asArrayBuffer()).then(function (e) {
								return class_p.ho = e;
							}), class_C.dh(d.file('images/typing.png').asArrayBuffer()).then(function (e) {
								return class_p.Rm = e;
							})]);
						});
					Promise.all([c, b]).then(function () {
						class_C.Ls(a);
					});
				});
			}

			static xs(a) {
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
					a = new class_vb(d),
					class_C.Ka(a.f)) : a();
			}

			static Ls(a) {
				window.document.body.innerHTML = '';
				class_C.Wg = window.document.createElement('div');
				window.document.body.appendChild(class_C.Wg);
				let b = null;
				b = function () {
					class_p.Na.fm();
					window.document.removeEventListener('click', b, true);
				}
				;
				window.document.addEventListener('click', b, true);
				a();
			}

			static Ka(a) {
				null != class_C.hn && class_C.hn.remove();
				null != a && (class_C.Wg.appendChild(a),
					class_C.hn = a);
			}
		}

		class class_sc {
			constructor(a, b) {
				this.nh = null;
				this.$s = .025;
				this.Be = this.kh = this.Kf = 0;
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
				let b = a - this.gn;
				this.gn = a;
				this.Be += (this.kh - this.Be) * this.$s;
				this.Kf -= b;
				0 >= this.Kf && (this.Kf = this.kh = 0);
				0 >= this.kh && .05 > this.Be && (window.clearInterval(this.nh),
					this.nh = null,
					this.Be = 0);
				a = class_p.l.Bm.H() ? this.Be : 0;
				this.$g.gain.value = a;
			}

			tj(a) {
				this.kh = a;
				this.Kf = 166.66666666666666;
				let b = this;
				null == this.nh && (this.nh = window.setInterval(function () {
					b.update();
				}, 17),
					this.gn = window.performance.now());
			}

			connect(a) {
				this.$g.connect(a);
			}

			bt(a) {
				let b = a.M;
				if (null != b)
					if (2 == b.Bb)
						0 >= b.Pa && this.tj(1);
					else if (1 == b.Bb) {
						let e = b.ta.G[0]
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
							z = class_u.ga.Fh
							,
							J = 0;
						for (a = a.K; J < a.length;) {
							let N = a[J];
							++J;
							if (null == N.J)
								continue;
							var c = N.J.a;
							let yb = e.a;
							var d = c.x - yb.x;
							c = c.y - yb.y;
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
							else if (N.ea == class_u.Aa) {
								if (null == l || l.a.x * z < N.J.a.x * z)
									l = N.J;
								if (null == n || n.a.x * z > N.J.a.x * z)
									n = N.J;
								if (null == r || d < t)
									r = N.J,
										t = d;
							}
						}
						null != n && null != g && 0 >= b.Pa && (h.a.x > n.a.x && e.a.x > n.a.x && 20 < e.a.x && this.tj(.3),
						r.a.x < g.a.x && e.a.x < g.a.x && -20 > e.a.x && this.tj(.3));
					}
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
					L = zb.Ro(y);
					let ea = 0;
					for (; ea < L.length;) {
						let U = L[ea];
						++ea;
						let tc = window.document.createElement('div');
						var R = U;
						U.startsWith('Key') && (R = class_P.substr(U, 3, null));
						tc.textContent = R;
						F.appendChild(tc);
						R = window.document.createElement('i');
						R.className = 'icon-cancel';
						R.onclick = function () {
							zb.Vq(U);
							class_p.l.Bg.Ha(zb);
							tc.remove();
						}
						;
						tc.appendChild(R);
					}
					L = window.document.createElement('i');
					L.className = 'icon-plus';
					F.appendChild(L);
					L.onclick = function () {
						uc.classList.toggle('show', true);
						uc.focus();
						uc.onkeydown = function (U) {
							uc.classList.toggle('show', false);
							U.stopPropagation();
							U = U.code;
							null == zb.H(U) && (zb.Qa(U, y),
								class_p.l.Bg.Ha(zb),
								Ec());
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
							F.classList.add('f-' + L.tb);
						}
						catch (ea) {
						}
						y.textContent = L.tb.toUpperCase();
					}
				}

				function d() {
					let y = class_p.l.yh.H();
					J.textContent = '' + y;
					N.value = '' + y;
				}

				function e() {
					let y = class_p.l.zh.H();
					t.textContent = '' + y;
					z.value = '' + y;
				}

				function f(y, F, L, ea) {
					let R = l.get(y);
					y = F.H();
					R.selectedIndex = ea(y);
					R.onchange = function () {
						F.Ha(L(R.selectedIndex));
					};
				}

				function g(y, F, L) {
					function ea(U) {
						R.classList.toggle('icon-ok', U);
						R.classList.toggle('icon-cancel', !U);
					}

					y = l.get(y);
					y.classList.add('toggle');
					let R = window.document.createElement('i');
					R.classList.add('icon-ok');
					y.insertBefore(R, y.firstChild);
					y.onclick = function () {
						let U = !F.H();
						F.Ha(U);
						ea(U);
						null != L && L(U);
					}
					;
					ea(F.H());
				}

				function h(y) {
					let F = {
						Xm: l.get(y + 'btn'),
						jh: l.get(y + 'sec')
					};
					n.push(F);
					F.Xm.onclick = function () {
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
						let R = ea == y;
						R && (class_la.mm = F);
						ea.jh.classList.toggle('selected', R);
						ea.Xm.classList.toggle('selected', R);
						++F;
					}
				}

				null == a && (a = false);
				this.f = class_x.Fa(class_la.O);
				let l = class_x.Da(this.f);
				this.ud = l.get('close');
				let n = [];
				h('sound');
				h('video');
				h('misc');
				h('input');
				k(n[class_la.mm]);
				g('tsound-main', class_p.l.Dm, function (y) {
					class_p.Na.vm(y ? 1 : 0);
				});
				g('tsound-chat', class_p.l.Mi);
				g('tsound-highlight', class_p.l.Cm);
				g('tsound-crowd', class_p.l.Bm);
				f('viewmode', class_p.l.Db, function (y) {
					return y - 1;
				}, function (y) {
					return y + 1;
				});
				f('fps', class_p.l.Ih, function (y) {
					return y;
				}, function (y) {
					return y;
				});
				let r = [1, .75, .5, .25];
				f('resscale', class_p.l.Ai, function (y) {
					return r[y];
				}, function (y) {
					let F = 0
						,
						L = r.length - 1;
					for (; F < L && !(r[F] <= y);)
						++F;
					return F;
				});
				g('tvideo-teamcol', class_p.l.Lm);
				g('tvideo-showindicators', class_p.l.Kk);
				g('tvideo-showavatars', class_p.l.zm);
				let t = l.get('chatopacity-value')
					,
					z = l.get('chatopacity-range');
				e();
				z.oninput = function () {
					class_p.l.zh.Ha(parseFloat(z.value));
					e();
				}
				;
				let J = l.get('chatfocusheight-value')
					,
					N = l.get('chatfocusheight-range');
				d();
				N.oninput = function () {
					class_p.l.yh.Ha(class_Q.parseInt(N.value));
					d();
				}
				;
				f('chatbgmode', class_p.l.$j, function (y) {
					return 0 == y ? 'full' : 'compact';
				}, function (y) {
					return 'full' == y ? 0 : 1;
				});
				let yb = null
					,
					Jc = this;
				yb = function () {
					let y = class_p.l.Ve.H();
					c('loc', 'Detected location', class_p.l.Ue.H());
					c('loc-ovr', 'Location override', y);
					let F = l.get('loc-ovr-btn');
					F.disabled = !a;
					null == y ? (F.textContent = 'Override location',
							F.onclick = function () {
								class_H.i(Jc.Qp);
							}
					) : (F.textContent = 'Remove override',
							F.onclick = function () {
								class_p.l.Ve.Ha(null);
								yb();
							}
					);
				}
				;
				yb();
				let zb = class_p.l.Bg.H()
					,
					uc = l.get('presskey')
					,
					Ec = null
					,
					Ab = l.get('inputsec');
				Ec = function () {
					class_x.If(Ab);
					Ab.appendChild(b('Up'));
					Ab.appendChild(b('Down'));
					Ab.appendChild(b('Left'));
					Ab.appendChild(b('Right'));
					Ab.appendChild(b('Kick'));
				}
				;
				Ec();
				this.ud.onclick = function () {
					class_H.i(Jc.pb);
				};
			}
		}

		class class_cc {
			constructor(a, b) {
				this.Ia = a;
				this.value = b;
				a.textContent = '' + b;
			}

			set(a) {
				this.value != a && (this.value = a,
					this.Ia.textContent = '' + this.value);
			}
		}

		class class_E {
			static i(a, b) {
				null != a && a(b);
			}
		}

		class class_sa {
			constructor() {
				this.jc = -1;
				this.T = this.ic = null;
				this.Fd = 2;
				this.dd = 0;
				this.ie = 1;
				this.hb = this.Ca = 3;
				this.Tc = false;
				/** @type {class_ca} */
				this.M = null;
				/** @type {class_ta[]} */
				this.K = [];
				this.lc = '';
				this.T = class_q.Mh()[0];
				this.jb = [null, new class_ya, new class_ya];
				this.jb[1].eb.push(class_u.ga.S);
				this.jb[2].eb.push(class_u.Aa.S);
			}

			Nr(a) {
				if (null == this.M) {
					this.M = new class_ca;
					for (var b = 0, c = this.K; b < c.length;) {
						let d = c[b];
						++b;
						d.J = null;
						d.Lb = 0;
					}
					this.M.jp(this);
					null != this.Pi && this.Pi(a);
				}
			}

			Vf(a, b, c) {
				if (b.ea != c) {
					b.ea = c;
					class_P.remove(this.K, b);
					this.K.push(b);
					if (null != this.M) {
						null != b.J && (class_P.remove(this.M.ta.G, b.J),
							b.J = null);
						this.M.Mk(b);
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
					class_jc.i(this.Kl, a, b, c);
				}
			}

			na(a) {
				let b = 0
					,
					c = this.K;
				for (; b < c.length;) {
					let d = c[b];
					++b;
					if (d.W == a)
						return d;
				}
				return null;
			}

			D(a) {
				null != this.M && this.M.D(a);
			}

			fa(a) {
				a.Eb(this.lc);
				a.m(this.Tc ? 1 : 0);
				a.P(this.hb);
				a.P(this.Ca);
				a.bj(this.ie);
				a.m(this.dd);
				a.m(this.Fd);
				this.T.fa(a);
				a.m(null != this.M ? 1 : 0);
				null != this.M && this.M.fa(a);
				a.m(this.K.length);
				let b = 0
					,
					c = this.K;
				for (; b < c.length;)
					c[b++].ua(a);
				this.jb[1].fa(a);
				this.jb[2].fa(a);
			}

			ka(a) {
				this.lc = a.zb();
				this.Tc = 0 != a.C();
				this.hb = a.N();
				this.Ca = a.N();
				this.ie = a.si();
				this.dd = a.C();
				this.Fd = a.C();
				this.T = class_q.ka(a);
				var b = 0 != a.C();
				this.M = null;
				b && (this.M = new class_ca,
					this.M.ka(a, this));
				b = null == this.M ? null : this.M.ta.G;
				let c = a.C();
				for (var d = this.K; d.length > c;)
					d.pop();
				for (d = 0; d < c;) {
					let e = new class_ta;
					e.va(a, b);
					this.K[d++] = e;
				}
				this.jb[1].ka(a);
				this.jb[2].ka(a);
			}

			Ek() {
				let a = 0;
				var b = class_A.ia();
				this.fa(b);
				for (b = b.Vr(); 4 <= b.s.byteLength - b.a;)
					a ^= b.N();
				return a;
			}

			No() {
				let a = class_A.ia(4);
				a.P(this.Ek());
				return a.Qg();
			}

			fo(a) {
				a = (new class_K(new DataView(a))).N();
				class_E.i(this.xo, this.Ek() != a);
			}

			xm(a) {
				this.bm = a;
			}

			Ob(a) {
				if (0 == a)
					return true;
				a = this.na(a);
				return null != a && a.cb ? true : false;
			}

			Br(a, b, c, d) {
				this.Fd = 0 > b ? 0 : 255 < b ? 255 : b;
				this.dd = 0 > c ? 0 : 255 < c ? 255 : c;
				0 > d ? d = 0 : 100 < d && (d = 100);
				this.ie = this.dd * d;
				class_Zb.i(this.Rk, a, this.Fd, this.dd, d);
			}

			uc() {
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_sa),
					this.jc = a,
					class_sa.xd(b, this));
				return b;
			}

			static xd(a, b) {
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
						d[g] = e[g].As();
					}
				}
				a.M = null == b.M ? null : b.M.uc();
				a.Tc = b.Tc;
				a.hb = b.hb;
				a.Ca = b.Ca;
				a.ie = b.ie;
				a.dd = b.dd;
				a.Fd = b.Fd;
				a.T = b.T;
				a.jb = b.jb;
			}
		}

		class class_A {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Sa = b;
				this.a = 0;
			}

			Qg() {
				let a = new ArrayBuffer(this.a)
					,
					b = new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
				(new Uint8Array(a)).set(b);
				return a;
			}

			Vb() {
				return new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
			}

			Od() {
				return new DataView(this.s.buffer, this.s.byteOffset, this.a);
			}

			Vr() {
				return new class_K(this.Od(), this.Sa);
			}

			tc(a) {
				this.s.byteLength < a && this.jr(2 * this.s.byteLength >= a ? 2 * this.s.byteLength : a);
			}

			jr(a) {
				if (1 > a)
					throw class_v.B('Can\'t resize buffer to a capacity lower than 1');
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

			bj(a) {
				let b = this.a;
				this.a += 2;
				this.tc(this.a);
				this.s.setInt16(b, a, this.Sa);
			}

			Wb(a) {
				let b = this.a;
				this.a += 2;
				this.tc(this.a);
				this.s.setUint16(b, a, this.Sa);
			}

			P(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setInt32(b, a, this.Sa);
			}

			sb(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setUint32(b, a, this.Sa);
			}

			aj(a) {
				let b = this.a;
				this.a += 4;
				this.tc(this.a);
				this.s.setFloat32(b, a, this.Sa);
			}

			u(a) {
				let b = this.a;
				this.a += 8;
				this.tc(this.a);
				this.s.setFloat64(b, a, this.Sa);
			}

			Xb(a) {
				let b = this.a;
				this.a += a.byteLength;
				this.tc(this.a);
				(new Uint8Array(this.s.buffer, this.s.byteOffset, this.s.byteLength)).set(a, b);
			}

			Tg(a) {
				this.Xb(new Uint8Array(a));
			}

			oc(a) {
				this.kb(class_A.Tf(a));
				this.Vg(a);
			}

			Eb(a) {
				null == a ? this.kb(0) : (this.kb(class_A.Tf(a) + 1),
					this.Vg(a));
			}

			Wm(a) {
				let b = class_A.Tf(a);
				if (255 < b)
					throw class_v.B(null);
				this.m(b);
				this.Vg(a);
			}

			Ug(a) {
				this.oc(JSON.stringify(a));
			}

			Vg(a) {
				let b = this.a;
				this.tc(b + class_A.Tf(a));
				let c = a.length
					,
					d = 0;
				for (; d < c;)
					b += class_A.Ho(class_P.gj(a, d++), this.s, b);
				this.a = b;
			}

			kb(a) {
				let b = this.a;
				a >>>= 0;
				this.tc(b + class_A.Sn(a));
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

			static Ho(a, b, c) {
				let d = c;
				if (0 > a)
					throw class_v.B('Cannot encode UTF8 character: charCode (' + a + ') is negative');
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
					throw class_v.B('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
				return c - d;
			}

			static Rn(a) {
				if (0 > a)
					throw class_v.B('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
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
				throw class_v.B('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
			}

			static Tf(a) {
				let b = 0
					,
					c = a.length
					,
					d = 0;
				for (; d < c;)
					b += class_A.Rn(class_P.gj(a, d++));
				return b;
			}

			static Sn(a) {
				a >>>= 0;
				return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5;
			}
		}

		class class_lc {
			constructor(a, b) {
				this.kn = 0;
				this.version = 1;
				this.ih = 0;
				this.Td = class_A.ia(1E3);
				this.Jf = class_A.ia(16384);
				this.version = b;
				let c = this.ih = a.Z;
				this.mj = a;
				a.U.fa(this.Jf);
				let d = this;
				a.hc = function (f) {
					let g = a.Z;
					d.Jf.kb(g - c);
					c = g;
					d.Jf.Wb(f.R);
					class_m.pj(f, d.Jf);
				}
				;
				this.Td.Wb(0);
				let e = this.ih;
				a.U.xm(function (f) {
					let g = a.Z;
					d.Td.kb(g - e);
					d.Td.m(f);
					d.kn++;
					e = g;
				});
			}

			stop() {
				this.mj.hc = null;
				this.mj.U.xm(null);
				this.Td.s.setUint16(0, this.kn, this.Td.Sa);
				this.Td.Xb(this.Jf.Vb());
				let a = pako.deflateRaw(this.Td.Vb())
					,
					b = class_A.ia(a.byteLength + 32);
				b.Vg('HBR2');
				b.sb(this.version);
				b.sb(this.mj.Z - this.ih);
				b.Xb(a);
				return b.Vb();
			}
		}

		class class_Y {
			constructor(a) {
				let b = new class_Z('Only humans', '', []);
				this.f = b.f;
				b.ae.style.minHeight = '78px';
				let c = this;
				class_Bb.tp().then(function (d) {
					null == class_Y.Fg && (class_Y.Fg = window.document.createElement('div'),
						b.ae.appendChild(class_Y.Fg),
						class_Y.Pq = d.render(class_Y.Fg, {
							sitekey: a,
							callback: function (e) {
								class_E.i(class_Y.Ul, e);
							},
							theme: 'dark'
						}));
					d.reset(class_Y.Pq);
					class_Y.Ul = function (e) {
						window.setTimeout(function () {
							class_E.i(c.Ua, e);
						}, 1E3);
						class_Y.Ul = null;
					}
					;
					b.ae.appendChild(class_Y.Fg);
				});
			}
		}

		class class_rc {
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
				this.kg = this.c.createGain();
				this.vm(class_p.l.Dm.H() ? 1 : 0);
				this.kg.connect(this.c.destination);
				let c = this;
				this.Eo = Promise.all([b('sounds/chat.ogg').then(function (d) {
					return c.Zj = d;
				}), b('sounds/highlight.wav').then(function (d) {
					return c.Jk = d;
				}), b('sounds/kick.ogg').then(function (d) {
					return c.pp = d;
				}), b('sounds/goal.ogg').then(function (d) {
					return c.Vo = d;
				}), b('sounds/join.ogg').then(function (d) {
					return c.np = d;
				}), b('sounds/leave.ogg').then(function (d) {
					return c.rp = d;
				}), b('sounds/crowd.ogg').then(function (d) {
					c.uo = d;
					c.gk = new class_sc(c.uo, c.c);
					c.gk.connect(c.kg);
				})]);
			}

			fm() {
				this.c.resume();
			}

			hd(a) {
				let b = this.c.createBufferSource();
				b.buffer = a;
				b.connect(this.kg);
				b.start();
			}

			vm(a) {
				this.kg.gain.value = a;
			}
		}

		class class_qa {
			constructor(a, b, c, d) {
				this.A = a;
				this.ls = d;
				this.ai = b;
				d = null;
				null != b && (d = b.getItem(a));
				this.Vm = c(d);
			}

			H() {
				return this.Vm;
			}

			Ha(a) {
				this.Vm = a;
				if (null != this.ai)
					try {
						let b = this.ls(a);
						null == b ? this.ai.removeItem(this.A) : this.ai.setItem(this.A, b);
					}
					catch (b) {
					}
			}
		}

		class class_Ub {
			static mr(a, b) {
				class_Ub.jm(new Blob([a], {
					type: 'octet/stream'
				}), b);
			}

			static nr(a, b) {
				class_Ub.jm(new Blob([a], {
					type: 'text/plain'
				}), b);
			}

			static jm(a, b) {
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

		class class_Fc {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_u {
			constructor(a, b, c, d, e, f, g, h) {
				this.xg = null;
				this.aa = a;
				this.S = b;
				this.Fh = c;
				this.qp = d;
				this.A = e;
				this.vo = f;
				this.w = h;
				this.Km = new class_ya;
				this.Km.eb.push(b);
			}
		}

		class class_zc {
			static bn() {
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

		class class_hb {
			constructor(a) {
				function b() {
					d.Hc() && null != d.pl && d.pl(d.Cb.value);
				}

				this.f = class_x.Fa(class_hb.O);
				let c = class_x.Da(this.f);
				this.Cb = c.get('input');
				this.jf = c.get('ok');
				let d = this;
				this.Cb.maxLength = 25;
				this.Cb.value = a;
				this.Cb.oninput = function () {
					d.D();
				}
				;
				this.Cb.onkeydown = function (e) {
					13 == e.keyCode && b();
				}
				;
				this.jf.onclick = b;
				this.D();
			}

			Hc() {
				let a = this.Cb.value;
				return 25 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.jf.disabled = !this.Hc();
			}
		}

		class class_ca {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Sb = this.Mb = this.Lc = this.Pa = 0;
				this.ge = class_u.ga;
				this.zc = this.Bb = 0;
				this.ta = new class_Ta;
				this.Ca = 0;
				this.hb = 5;
				/** @type {class_q} */
				this.T = null;
			}

			jp(a) {
				this.Ma = a;
				this.hb = a.hb;
				this.Ca = a.Ca;
				this.T = a.T;
				this.ta.L = this.T.L;
				this.ta.qa = this.T.qa;
				this.ta.V = this.T.V;
				this.ta.ob = this.T.ob;
				a = 0;
				let b = this.T.G;
				for (; a < b.length;)
					this.ta.G.push(b[a++].Ep());
				this.Qk();
			}

			Mk(a) {
				if (a.ea == class_u.La)
					a.J = null;
				else {
					a.nb = 0;
					var b = a.J;
					null == b && (b = new class_ua,
						a.J = b,
						this.ta.G.push(b));
					var c = this.T.me;
					b.S = 0;
					b.$ = c.$;
					b.ba = c.ba;
					b.Ba = c.Ba;
					b.o = c.o;
					b.h = 39;
					b.w = a.ea.w | c.w;
					var d = a.ea == class_u.ga ? this.T.Ld : this.T.td;
					0 == d.length ? (b.a.x = a.ea.Fh * this.T.bc,
						b.a.y = 0) : (a = b.a,
						d = d[d.length - 1],
						a.x = d.x,
						a.y = d.y);
					d = b.F;
					d.x = 0;
					d.y = 0;
					b = b.oa;
					c = c.oa;
					b.x = c.x;
					b.y = c.y;
				}
			}

			D(a) {
				if (0 < this.Pa)
					120 > this.Pa && this.Pa--;
				else {
					// Exposing global fields begin
					const onGameTickFun = window.parent.g.onGameTick;
					if (onGameTickFun != null)
						onGameTickFun(this);
					// Exposing global fields end

					var b = this.Ma.et;
					null != b && b();
					b = this.Ma.K;
					for (var c = 0; c < b.length;) {
						var d = b[c];
						++c;
						if (null != d.J) {
							0 == (d.nb & 16) && (d.Yb = false);
							var e = this.T.me;
							0 < d.Xc && d.Xc--;
							d.Bc < this.Ma.ie && d.Bc++;
							if (d.Yb && 0 >= d.Xc && 0 <= d.Bc) {
								for (var f = false, g = 0, h = this.ta.G; g < h.length;) {
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
										if (4 > n - k.$ - d.J.$) {
											f = r / n;
											r = l / n;
											l = e.Ze;
											var t = n = k.F;
											k = k.ba;
											n.x = t.x + f * l * k;
											n.y = t.y + r * l * k;
											t = d.J;
											k = -e.$e;
											n = l = t.F;
											t = t.ba;
											l.x = n.x + f * k * t;
											l.y = n.y + r * k * t;
											f = true;
										}
									}
								}
								f && (null != this.Ma.ni && this.Ma.ni(d),
									d.Yb = false,
									d.Xc = this.Ma.Fd,
									d.Bc -= this.Ma.dd);
							}
							f = d.nb;
							h = g = 0;
							0 != (f & 1) && --h;
							0 != (f & 2) && ++h;
							0 != (f & 4) && --g;
							0 != (f & 8) && ++g;
							0 != g && 0 != h && (f = Math.sqrt(g * g + h * h),
								g /= f,
								h /= f);
							f = d.J.F;
							k = d.Yb ? e.af : e.Ke;
							f.x += g * k;
							f.y += h * k;
							d.J.Ba = d.Yb ? e.bf : e.Ba;
						}
					}
					c = 0;
					d = this.ta.G;
					e = 0;
					for (g = d.length; e < g;)
						f = e++,
							h = d[f],
						0 != (h.w & 128) && (class_ca.nk[c] = f,
							f = class_ca.jl[c],
							h = h.a,
							f.x = h.x,
							f.y = h.y,
							++c);
					this.ta.D(a);
					if (0 == this.Bb) {
						for (a = 0; a < b.length;)
							c = b[a],
								++a,
							null != c.J && (c.J.h = 39 | this.ge.qp);
						b = this.ta.G[0].F;
						0 < b.x * b.x + b.y * b.y && (this.Bb = 1);
					}
					else if (1 == this.Bb) {
						this.Lc += .016666666666666666;
						for (a = 0; a < b.length;)
							d = b[a],
								++a,
							null != d.J && (d.J.h = 39);
						d = class_u.La;
						b = this.ta.G;
						for (a = 0; a < c && (d = a++,
							d = this.T.Xn(b[class_ca.nk[d]].a, class_ca.jl[d]),
						d == class_u.La);)
							;
						d != class_u.La ? (this.Bb = 2,
							this.zc = 150,
							this.ge = d,
							d == class_u.ga ? this.Mb++ : this.Sb++,
						null != this.Ma.Si && this.Ma.Si(d.xg),
						null != this.Ma.bm && this.Ma.bm(d.aa)) : 0 < this.Ca && this.Lc >= 60 * this.Ca && this.Sb != this.Mb && (null != this.Ma.Ui && this.Ma.Ui(),
							this.Im());
					}
					else if (2 == this.Bb) {
						this.zc--;
						if (0 >= this.zc) {
							if (0 < this.hb && (this.Sb >= this.hb || this.Mb >= this.hb) || 0 < this.Ca && this.Lc >= 60 * this.Ca && this.Sb != this.Mb) {
								this.Im();
							}
							else {
								this.Qk();
								null != this.Ma.xq && this.Ma.xq();
							}
						}
					}
					else if (3 == this.Bb && (this.zc--,
					0 >= this.zc && (b = this.Ma,
					null != b.M))) {
						b.M = null;
						a = 0;
						for (c = b.K; a < c.length;)
							d = c[a],
								++a,
								d.J = null,
								d.Lb = 0;
						null != b.Cf && b.Cf(null);
					}
				}
			}

			Im() {
				this.zc = 300;
				this.Bb = 3;
				null != this.Ma.Ti && this.Ma.Ti(this.Sb > this.Mb ? class_u.ga : class_u.Aa);
			}

			Qk() {
				let a = this.Ma.K;
				this.Bb = 0;
				for (var b = this.T.G, c = this.ta.G, d = 0, e = this.T.vf ? b.length : 1; d < e;) {
					var f = d++;
					b[f].Lk(c[f]);
				}
				b = [0, 0, 0];
				for (c = 0; c < a.length;)
					if (d = a[c],
						++c,
						this.Mk(d),
						e = d.ea,
					e != class_u.La) {
						f = d.J.a;
						var g = this.T
							,
							h = b[e.aa]
							,
							k = e == class_u.ga ? g.Ld : g.td;
						0 == k.length ? (k = h + 1 >> 1,
						0 == (h & 1) && (k = -k),
							g = g.mc * e.Fh,
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
				this.ta.fa(a);
				a.P(this.zc);
				a.P(this.Bb);
				a.P(this.Sb);
				a.P(this.Mb);
				a.u(this.Lc);
				a.P(this.Pa);
				a.m(this.ge.aa);
			}

			ka(a, b) {
				this.ta.ka(a);
				this.zc = a.N();
				this.Bb = a.N();
				this.Sb = a.N();
				this.Mb = a.N();
				this.Lc = a.v();
				this.Pa = a.N();
				a = a.sf();
				this.ge = 1 == a ? class_u.ga : 2 == a ? class_u.Aa : class_u.La;
				this.Ma = b;
				this.hb = b.hb;
				this.Ca = b.Ca;
				this.T = b.T;
				this.ta.L = this.T.L;
				this.ta.V = this.T.V;
				this.ta.qa = this.T.qa;
				this.ta.ob = this.T.ob;
			}

			uc() {
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_ca),
					this.jc = a,
					class_ca.xd(b, this));
				return b;
			}

			static xd(a, b) {
				a.Ma = b.Ma.uc();
				a.hb = b.hb;
				a.Ca = b.Ca;
				a.ta = b.ta.uc();
				a.zc = b.zc;
				a.Bb = b.Bb;
				a.Sb = b.Sb;
				a.Mb = b.Mb;
				a.Lc = b.Lc;
				a.Pa = b.Pa;
				a.T = b.T;
				a.ge = b.ge;
			}
		}

		class class_$a {
			constructor() {
				this.list = [];
			}

			dn(a) {
				let b = 0
					,
					c = a.lb
					,
					d = a.Dc
					,
					e = 0
					,
					f = this.list;
				for (; e < f.length;) {
					var g = f[e];
					++e;
					let h = g.lb;
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

			Ts(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].lb >= a);)
					++b;
				this.list.splice(0, b);
			}

			ts(a, b) {
				let c = this.list;
				for (; 0 < c.length;)
					c.pop();
				class_$a.Ks(a.list, b.list, this.list);
			}

			Us(a) {
				let b = 0
					,
					c = this.list
					,
					d = 0
					,
					e = c.length;
				for (; d < e;) {
					let f = c[d++];
					f.Ae != a && (c[b] = f,
						++b);
				}
				for (; c.length > b;)
					c.pop();
			}

			us(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].lb >= a);)
					++b;
				return b;
			}

			static Ks(a, b, c) {
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
						if (h.lb <= k.lb) {
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

		class class_Rb {
			constructor(a) {
				this.Pd = a;
			}
		}

		class class_Ma {
		}

		class class_ta {
			constructor() {
				this.Cc = -1;
				this.on = null;
				/** @type {class_u} */
				this.ea = class_u.La;
				/** @type {class_ua} */
				this.J = null;
				this.Bc = this.Xc = 0;
				this.Yb = false;
				this.nb = this.W = 0;
				this.A = 'Player';
				this.ah = this.yb = 0;
				this.country = null;
				this.Rd = false;
				this.Zb = this.Qd = null;
				this.Lb = 0;
				this.cb = false;
			}

			ua(a) {
				a.m(this.cb ? 1 : 0);
				a.P(this.Lb);
				a.Eb(this.Zb);
				a.Eb(this.Qd);
				a.m(this.Rd ? 1 : 0);
				a.Eb(this.country);
				a.P(this.ah);
				a.Eb(this.A);
				a.P(this.nb);
				a.kb(this.W);
				a.m(this.Yb ? 1 : 0);
				a.bj(this.Bc);
				a.m(this.Xc);
				a.m(this.ea.aa);
				a.bj(null == this.J ? -1 : this.J.wl);
			}

			va(a, b) {
				this.cb = 0 != a.C();
				this.Lb = a.N();
				this.Zb = a.zb();
				this.Qd = a.zb();
				this.Rd = 0 != a.C();
				this.country = a.zb();
				this.ah = a.N();
				this.A = a.zb();
				this.nb = a.N();
				this.W = a.Ab();
				this.Yb = 0 != a.C();
				this.Bc = a.si();
				this.Xc = a.C();
				let c = a.sf();
				this.ea = 1 == c ? class_u.ga : 2 == c ? class_u.Aa : class_u.La;
				a = a.si();
				this.J = 0 > a ? null : b[a];
			}

			As() {
				let a = class_va.Cc;
				let b = this.on;
				this.Cc != a && (null == b && (this.on = b = new class_ta),
					this.Cc = a,
					class_ta.ss(b, this));
				return b;
			}

			static ss(a, b) {
				a.cb = b.cb;
				a.Lb = b.Lb;
				a.Zb = b.Zb;
				a.Qd = b.Qd;
				a.Rd = b.Rd;
				a.country = b.country;
				a.ah = b.ah;
				a.yb = b.yb;
				a.A = b.A;
				a.nb = b.nb;
				a.W = b.W;
				a.Yb = b.Yb;
				a.Bc = b.Bc;
				a.Xc = b.Xc;
				a.J = null == b.J ? null : b.J.uc();
				a.ea = b.ea;
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
							class_dc.lh(f.objectStore('files').get(a)).then(function (g) {
								try {
									let h = new class_q;
									h.Vk(g);
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
							class_dc.lh(e.objectStore('meta').getAll()).then(a, b);
						};
					}
				);
			}

			static Vs() {
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
								class_dc.lh(f.objectStore('files').add(a.ye())).then(function (g) {
									g = {
										name: a.A,
										id: g
									};
									return class_dc.lh(f.objectStore('meta').add(g));
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

		class class_nb {
			constructor() {
				this.rk = null;
				this.f = class_x.Fa(class_nb.O);
				var a = class_x.Da(this.f);
				this.ig = a.get('link');
				let b = a.get('copy');
				a = a.get('close');
				let c = this;
				this.ig.onfocus = function () {
					c.ig.select();
				}
				;
				b.onclick = function () {
					c.ig.select();
					return window.document.execCommand('Copy');
				}
				;
				a.onclick = function () {
					class_H.i(c.pb);
				};
			}

			Cr(a) {
				this.rk != a && (this.rk = a,
					this.ig.value = a);
			}
		}

		class class_Na {
			constructor(a) {
				this.Ed = new Map;
				this.f = class_x.Fa(class_Na.O);
				this.f.className += ' ' + a.vo;
				let b = class_x.Da(this.f);
				this.ab = b.get('list');
				this.Xh = b.get('join-btn');
				this.zi = b.get('reset-btn');
				a == class_u.La && this.zi.remove();
				this.Xh.textContent = '' + a.A;
				this.f.ondragover = this.f.gt = function (d) {
					-1 != d.dataTransfer.types.indexOf('player') && d.preventDefault();
				}
				;
				let c = this;
				this.f.ondrop = function (d) {
					d.preventDefault();
					d = d.dataTransfer.getData('player');
					null != d && (d = class_Q.parseInt(d),
					null != d && class_La.i(c.ug, d, a));
				}
				;
				this.Xh.onclick = function () {
					class_E.i(c.Wp, a);
				}
				;
				this.zi.onclick = function () {
					class_E.i(c.ke, a);
				};
			}

			D(a, b, c, d) {
				this.Xh.disabled = b || c;
				this.zi.disabled = c;
				b = new Set;
				c = this.Ed.keys();
				for (var e = c.next(); !e.done;) {
					var f = e.value;
					e = c.next();
					b.add(f);
				}
				let g = this;
				for (c = 0; c < a.length;)
					e = a[c],
						++c,
						f = this.Ed.get(e.W),
					null == f && (f = new class_Cb(e),
						f.pf = function (h) {
							class_E.i(g.pf, h);
						}
						,
						this.Ed.set(e.W, f),
						this.ab.appendChild(f.f)),
						f.D(e, d),
						b.delete(e.W);
				d = b.values();
				for (b = d.next(); !b.done;)
					c = b.value,
						b = d.next(),
						this.Ed.get(c).f.remove(),
						this.Ed.delete(c);
				d = 0;
				for (b = a.length - 1; d < b;)
					e = d++,
						c = this.Ed.get(a[e].W).f,
						e = this.Ed.get(a[e + 1].W).f,
					c.nextSibling != e && this.ab.insertBefore(c, e);
			}
		}

		class class_Q {
			static De(a) {
				return class_w.Je(a, '');
			}

			static parseInt(a) {
				a = parseInt(a);
				return isNaN(a) ? null : a;
			}
		}

		class class_ob {
			constructor(a) {
				this.f = class_x.Fa(class_ob.O);
				let b = class_x.Da(this.f);
				this.gf = b.get('title');
				this.ti = b.get('reason');
				this.Ln = b.get('ban-btn');
				this.Nn = b.get('ban-text');
				this.Ye = b.get('kick');
				this.ud = b.get('close');
				let c = this;
				this.Ln.onclick = function () {
					c.Ij(!c.Rj);
				}
				;
				this.ud.onclick = function () {
					class_H.i(c.pb);
				}
				;
				this.Ye.onclick = function () {
					class_jc.i(c.ii, c.Qb, c.ti.value, c.Rj);
				}
				;
				this.ti.onkeydown = function (d) {
					return d.stopPropagation();
				}
				;
				this.ti.maxLength = 100;
				this.Qb = a.W;
				this.gf.textContent = 'Kick ' + a.A;
				this.Ij(false);
			}

			Ij(a) {
				this.Rj = a;
				this.Nn.textContent = a ? 'Yes' : 'No';
			}
		}

		class class_Ac {
			static qf(a) {
				let b = new class_qc('([^&=]+)=?([^&]*)', 'g');
				a = a.substring(1);
				var c = 0;
				let d = new Map;
				for (; b.Gs(a, c);) {
					c = b.jn(1);
					c = decodeURIComponent(c.split('+').join(' '));
					let e = b.jn(2);
					d.set(c, decodeURIComponent(e.split('+').join(' ')));
					c = b.Hs();
					c = c.qj + c.Es;
				}
				return d;
			}

			static H() {
				return class_Ac.qf(window.top.location.search);
			}
		}

		class class_x {
			static Da(a) {
				let b = new Map
					,
					c = 0;
				for (a = a.querySelectorAll('[data-hook]'); c < a.length;) {
					let d = a[c++];
					b.set(d.getAttribute('data-hook'), d);
				}
				return b;
			}

			static Fa(a, b) {
				null == b && (b = 'div');
				b = window.document.createElement(b);
				b.innerHTML = a;
				return b.firstElementChild;
			}

			static replaceWith(a, b) {
				a.parentElement.replaceChild(b, a);
			}

			static If(a) {
				let b = a.firstChild;
				for (; null != b;)
					a.removeChild(b),
						b = a.firstChild;
			}
		}

		class class_ua {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.wl = 0;
				this.h = this.w = 63;
				this.Uj = 0;
				this.S = 16777215;
				this.Ba = .99;
				this.ba = 1;
				this.o = .5;
				this.$ = 10;
				this.oa = new class_O(0, 0);
				this.F = new class_O(0, 0);
				this.a = new class_O(0, 0);
			}

			fa(a) {
				var b = this.a;
				a.u(b.x);
				a.u(b.y);
				b = this.F;
				a.u(b.x);
				a.u(b.y);
				b = this.oa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.$);
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Ba);
				a.sb(this.S);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				var b = this.a;
				b.x = a.v();
				b.y = a.v();
				b = this.F;
				b.x = a.v();
				b.y = a.v();
				b = this.oa;
				b.x = a.v();
				b.y = a.v();
				this.$ = a.v();
				this.o = a.v();
				this.ba = a.v();
				this.Ba = a.v();
				this.S = a.gb();
				this.h = a.N();
				this.w = a.N();
			}

			bo(a) {
				var b = this.a
					,
					c = a.a
					,
					d = b.x - c.x;
				b = b.y - c.y;
				var e = a.$ + this.$
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
					e = this.F;
					f = a.F;
					e = d * (e.x - f.x) + b * (e.y - f.y);
					0 > e && (e *= this.o * a.o + 1,
						c *= e,
						g = f = this.F,
						f.x = g.x - d * c,
						f.y = g.y - b * c,
						a = f = a.F,
						c = e - c,
						f.x = a.x + d * c,
						f.y = a.y + b * c);
				}
			}

			co(a) {
				if (0 != 0 * a.ub) {
					var b = a.X.a;
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
					d = a.wa;
					b = d.x;
					d = d.y;
					g = b * g + d * c;
				}
				else {
					d = a.ce;
					g = this.a;
					b = g.x - d.x;
					d = g.y - d.y;
					g = a.Ng;
					c = a.Og;
					if ((0 < g.x * b + g.y * d && 0 < c.x * b + c.y * d) == 0 >= a.ub)
						return;
					c = Math.sqrt(b * b + d * d);
					if (0 == c)
						return;
					g = c - a.hk;
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
				g >= this.$ || (g = this.$ - g,
					e = c = this.a,
					c.x = e.x + b * g,
					c.y = e.y + d * g,
					g = this.F,
					g = b * g.x + d * g.y,
				0 > g && (g *= this.o * a.o + 1,
					c = a = this.F,
					a.x = c.x - b * g,
					a.y = c.y - d * g));
			}

			uc() {
				let a = class_va.Cc
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new class_ua),
					this.jc = a,
					class_ua.xd(b, this));
				return b;
			}

			static xd(a, b) {
				a.$ = b.$;
				a.o = b.o;
				a.ba = b.ba;
				a.Ba = b.Ba;
				a.S = b.S;
				a.Uj = b.Uj;
				a.h = b.h;
				a.w = b.w;
				var c = a.a
					,
					d = b.a;
				c.x = d.x;
				c.y = d.y;
				c = a.F;
				d = b.F;
				c.x = d.x;
				c.y = d.y;
				a = a.oa;
				b = b.oa;
				a.x = b.x;
				a.y = b.y;
			}
		}

		class class_ib {
			constructor() {
				this.yf = null;
				this.f = class_x.Fa(class_ib.O);
				var a = class_x.Da(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.pb);
				}
				;
				this.xh = a.get('change');
				this.xh.disabled = true;
				this.xh.onclick = function () {
					null != b.yf && b.lm(b.yf.index);
				}
				;
				a = a.get('list');
				this.oi(a);
				let c = class_pb.bi(a);
				window.setTimeout(function () {
					c.update();
				}, 0);
			}

			oi(a) {
				let b = this
					,
					c = 0
					,
					d = class_Ma.ab.length >> 2;
				for (; c < d;) {
					var e = c++;
					let f = e
						,
						g = class_Ma.ab[e << 2];
					e = class_Ma.ab[(e << 2) + 1].toLowerCase();
					let h = window.document.createElement('div');
					h.className = 'elem';
					h.innerHTML = '<div class="flagico f-' + e + '"></div> ' + g;
					a.appendChild(h);
					h.onclick = function () {
						null != b.yf && b.yf.Ia.classList.remove('selected');
						b.xh.disabled = false;
						b.yf = {
							Ia: h,
							index: f
						};
						h.classList.add('selected');
					}
					;
					h.ondblclick = function () {
						b.lm(f);
					};
				}
			}

			lm(a) {
				let b = new class_ka;
				b.tb = class_Ma.ab[(a << 2) + 1].toLowerCase();
				b.Ic = class_Ma.ab[(a << 2) + 2];
				b.Kc = class_Ma.ab[(a << 2) + 3];
				class_p.l.Ve.Ha(b);
				class_H.i(this.pb);
			}
		}

		class class_Db {
			constructor(a) {
				this.qk = false;
				this.Em = new class_Na(class_u.La);
				this.Tj = new class_Na(class_u.Aa);
				this.Vl = new class_Na(class_u.ga);
				this.f = class_x.Fa(class_Db.O);
				let b = class_x.Da(this.f);
				this.lc = b.get('room-name');
				this.Hm = b.get('start-btn');
				this.Jm = b.get('stop-btn');
				this.ki = b.get('pause-btn');
				this.Kn = b.get('auto-btn');
				this.Xk = b.get('lock-btn');
				this.em = b.get('reset-all-btn');
				this.Tl = b.get('rec-btn');
				let c = b.get('link-btn')
					,
					d = b.get('leave-btn')
					,
					e = b.get('rand-btn');
				this.Df = b.get('time-limit-sel');
				this.wf = b.get('score-limit-sel');
				this.Fm = b.get('stadium-name');
				this.Gm = b.get('stadium-pick');
				let f = this;
				this.Gm.onclick = function () {
					class_H.i(f.jq);
				}
				;
				this.Vh(b.get('red-list'), this.Vl, a);
				this.Vh(b.get('blue-list'), this.Tj, a);
				this.Vh(b.get('spec-list'), this.Em, a);
				this.dl(this.Df, this.cl());
				this.dl(this.wf, this.cl());
				this.Df.onchange = function () {
					class_E.i(f.nq, f.Df.selectedIndex);
				}
				;
				this.wf.onchange = function () {
					class_E.i(f.fq, f.wf.selectedIndex);
				}
				;
				this.Hm.onclick = function () {
					class_H.i(f.kq);
				}
				;
				this.Jm.onclick = function () {
					class_H.i(f.lq);
				}
				;
				this.ki.onclick = function () {
					class_H.i(f.Yp);
				}
				;
				this.Kn.onclick = function () {
					class_H.i(f.Pp);
				}
				;
				this.Xk.onclick = function () {
					class_E.i(f.mq, !f.Zh);
				}
				;
				this.em.onclick = function () {
					null != f.ke && (f.ke(class_u.Aa),
						f.ke(class_u.ga));
				}
				;
				this.Tl.onclick = function () {
					class_H.i(f.bq);
				}
				;
				c.onclick = function () {
					class_H.i(f.iq);
				}
				;
				d.onclick = function () {
					class_H.i(f.je);
				}
				;
				e.onclick = function () {
					class_H.i(f.aq);
				}
				;
				this.Jj(false);
				this.Kj(false);
			}

			Vh(a, b, c) {
				class_x.replaceWith(a, b.f);
				let d = this;
				b.ug = function (e, f) {
					class_La.i(d.ug, e, f);
				}
				;
				b.ke = function (e) {
					class_E.i(d.ke, e);
				}
				;
				b.Wp = function (e) {
					class_La.i(d.ug, c, e);
				}
				;
				b.pf = function (e) {
					class_E.i(d.pf, e);
				};
			}

			cl() {
				let a = []
					,
					b = 0;
				for (; 15 > b;) {
					let c = b++;
					a.push(null == c ? 'null' : '' + c);
				}
				return a;
			}

			dl(a, b) {
				let c = 0;
				for (; c < b.length;) {
					let d = b[c++]
						,
						e = window.document.createElement('option');
					e.textContent = d;
					a.appendChild(e);
				}
			}

			Fr(a) {
				this.Tl.classList.toggle('active', a);
			}

			D(a, b) {
				this.fr != a.lc && (this.fr = a.lc,
					this.lc.textContent = a.lc);
				b = null == b ? false : b.cb;
				this.qk != b && (this.f.className = 'room-view' + (b ? ' admin' : ''),
					this.qk = b);
				var c = !b || null != a.M;
				this.Df.disabled = c;
				this.wf.disabled = c;
				this.Gm.disabled = c;
				c = null != a.M;
				this.Hm.hidden = c;
				this.Jm.hidden = !c;
				this.ki.hidden = !c;
				this.Df.selectedIndex = a.Ca;
				this.wf.selectedIndex = a.hb;
				this.Fm.textContent = a.T.A;
				this.Fm.classList.toggle('custom', !a.T.Xe());
				let d = a.Tc;
				for (var e = this.Vl, f = a.K, g = [], h = 0; h < f.length;) {
					var k = f[h];
					++h;
					k.ea == class_u.ga && g.push(k);
				}
				e.D(g, d, c, b);
				e = this.Tj;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == class_u.Aa && g.push(k);
				e.D(g, d, c, b);
				e = this.Em;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == class_u.La && g.push(k);
				e.D(g, d, c, b);
				this.em.disabled = c;
				this.Zh != a.Tc && this.Jj(a.Tc);
				c && (a = 120 == a.M.Pa,
				this.yl != a && this.Kj(a));
			}

			Jj(a) {
				this.Zh = a;
				this.Xk.innerHTML = this.Zh ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
			}

			Kj(a) {
				this.yl = a;
				this.ki.innerHTML = '<i class=\'icon-pause\'></i>' + (this.yl ? 'Resume (P)' : 'Pause (P)');
			}
		}

		class class_oc {
			constructor() {
			}
		}

		class class_Kc {
			static qf(a) {
				a = a.split(' ');
				let b = a[4];
				if ('typ' != a[6])
					throw class_v.B(null);
				return {
					Zr: a[7],
					kp: b
				};
			}
		}

		class class_S {
			constructor() {
				this.w = 32;
				this.h = 63;
				this.o = 1;
				this.Ta = 0;
				this.wa = new class_O(0, 0);
			}

			fa(a) {
				let b = this.wa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.Ta);
				a.u(this.o);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				let b = this.wa;
				b.x = a.v();
				b.y = a.v();
				this.Ta = a.v();
				this.o = a.v();
				this.h = a.N();
				this.w = a.N();
			}
		}

		class class_ya {
			constructor() {
				this.ld = 16777215;
				this.eb = [];
			}

			fa(a) {
				a.m(this.pd);
				a.P(this.ld);
				a.m(this.eb.length);
				let b = 0
					,
					c = this.eb;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			ka(a) {
				this.pd = a.C();
				this.ld = a.N();
				let b = a.C();
				if (3 < b)
					throw class_v.B('too many');
				this.eb = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.eb.push(a.N());
			}
		}

		class class_vc {
			constructor() {
				this.hash = 0;
			}

			qs(a) {
				let b = 0
					,
					c = a.length;
				for (; b < c;)
					this.hash = (this.hash += a[b++]) + (this.hash << 10),
						this.hash ^= this.hash >>> 6;
			}
		}

		class class_Eb {
			constructor(a, b, c, d) {
				this.th = new Set;
				this.Rf = new Set;
				this.Hg = this.uf = this.qm = false;
				this.Qc = null;
				this.xf = this.aa = '';
				this.lr = 5E4;
				this.kr = 1E4;
				this.vd = new Map;
				this.Mr = a;
				this.eg = b;
				this.Vn = c;
				this.xf = d;
				null == this.xf && (this.xf = '');
				this.Oi();
			}

			ja() {
				window.clearTimeout(this.gm);
				window.clearTimeout(this.re);
				this.re = null;
				window.clearInterval(this.Bl);
				this.Y.onmessage = null;
				this.Y.onerror = null;
				this.Y.onclose = null;
				this.Y.onopen = null;
				this.Y.close();
				this.Y = null;
				this.Ak();
			}

			Ki(a) {
				if (null != this.Qc || null != a) {
					if (null != this.Qc && null != a && this.Qc.byteLength == a.byteLength) {
						let c = new Uint8Array(this.Qc)
							,
							d = new Uint8Array(a)
							,
							e = false
							,
							f = 0
							,
							g = this.Qc.byteLength;
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
					this.Qc = a.slice(0);
					this.Hg = true;
					var b = this;
					null != this.Y && 1 == this.Y.readyState && null == this.re && (this.Fi(),
						this.re = window.setTimeout(function () {
							b.re = null;
							1 == b.Y.readyState && b.Hg && b.Fi();
						}, 1E4));
				}
			}

			Ji(a) {
				function b() {
					null != c.Y && 1 == c.Y.readyState && c.uf != c.qm && c.pm();
					c.dm = null;
				}

				this.uf = a;
				let c = this;
				null == this.dm && (b(),
					this.dm = window.setTimeout(b, 1E3));
			}

			Oi(a) {
				function b(e) {
					e = e.sitekey;
					if (null == e)
						throw class_v.B(null);
					null != d.nf && d.nf(e, function (f) {
						d.Oi(f);
					});
				}

				function c(e) {
					let f = e.url;
					if (null == f)
						throw class_v.B(null);
					e = e.token;
					if (null == e)
						throw class_v.B(null);
					d.Y = new WebSocket(f + '?token=' + e);
					d.Y.binaryType = 'arraybuffer';
					d.Y.onopen = function () {
						d.fp();
					}
					;
					d.Y.onclose = function (g) {
						d.Oh(4001 != g.code);
					}
					;
					d.Y.onerror = function () {
						d.Oh(true);
					}
					;
					d.Y.onmessage = M(d, d.Rh);
				}

				null == a && (a = '');
				let d = this;
				class_aa.Ml(this.Mr, 'token=' + this.xf + '&rcr=' + a, class_aa.Aj).then(function (e) {
					switch (e.action) {
						case 'connect':
							c(e);
							break;
						case 'recaptcha':
							b(e);
					}
				}).catch(function () {
					d.Oh(true);
				});
			}

			fp() {
				null != this.Qc && this.Fi();
				0 != this.uf && this.pm();
				let a = this;
				this.Bl = window.setInterval(function () {
					a.Ei();
				}, 4E4);
			}

			Rh(a) {
				a = new class_K(new DataView(a.data), false);
				switch (a.C()) {
					case 1:
						this.Qh(a);
						break;
					case 4:
						this.Ph(a);
						break;
					case 5:
						this.$o(a);
						break;
					case 6:
						this.cp(a);
				}
			}

			Qh(a) {
				let b = a.gb(),
					c = class_ha.rs(a.rb(a.C())),
					d,
					e,
					f;
				try {
					a = new class_K(new DataView(pako.inflateRaw(a.rb()).buffer), false);
					d = 0 != a.C();
					e = a.kc();
					let g = a.Eg()
						,
						h = []
						,
						k = 0;
					for (; k < g.length;)
						h.push(new RTCIceCandidate(g[k++]));
					f = h;
				}
				catch (g) {
					this.zf(b, 0);
					return;
				}
				this.ep(b, c, e, f, a, d);
			}

			ep(a, b, c, d, e, f) {
				if (16 <= this.vd.size)
					this.zf(a, 4104);
				else if (this.th.has(b))
					this.zf(a, 4102);
				else {
					for (var g = [], h = 0; h < d.length;) {
						let n = class_Eb.Fk(d[h++]);
						if (null != n) {
							if (this.Rf.has(n)) {
								this.zf(a, 4102);
								return;
							}
							g.push(n);
						}
					}
					if (null != this.ek && (h = new class_K(e.s),
						h.a = e.a,
						e = this.ek(b, h),
					1 == e.mb)) {
						this.zf(a, e.reason);
						return;
					}
					var k = new class_Za(a, this.eg, this.Vn);
					f && (k.kk = 2500);
					k.ve = g;
					k.od = b;
					this.vd.set(a, k);
					var l = this;
					k.gd = function () {
						l.Rc(0, k, null);
						l.vd.delete(k.aa);
					}
					;
					k.Gd = function () {
						l.vd.delete(k.aa);
						l.Rc(0, k, null);
						null != l.ol && l.ol(new class_bc(k));
					}
					;
					k.hi = function (n) {
						l.Gi(k, n, k.dg, null);
						k.Uh.then(function () {
							l.Rc(0, k, null);
						});
						k.rg = function (r) {
							l.Di(k, r);
						};
					}
					;
					k.Ri();
					k.qo(new RTCSessionDescription({
						sdp: c,
						type: 'offer'
					}), d);
				}
			}

			Ph(a) {
				let b = a.gb(),
					c;
				try {
					a = new class_K(new DataView(pako.inflateRaw(a.rb()).buffer), false),
						c = new RTCIceCandidate(a.Eg());
				}
				catch (d) {
					return;
				}
				this.Zo(b, c);
			}

			Zo(a, b) {
				a = this.vd.get(a);
				if (null != a) {
					let c = class_Eb.Fk(b);
					if (null != c && (a.ve.push(c),
						this.Rf.has(c)))
						return;
					a.Gj(b);
				}
			}

			$o(a) {
				this.aa = a.oe(a.C());
				null != this.sg && this.sg(this.aa);
			}

			cp(a) {
				this.xf = a.oe(a.s.byteLength - a.a);
			}

			Rc(a, b, c) {
				if (!b.ul) {
					0 == a && (b.ul = true);
					var d = b.aa;
					b = class_A.ia(32, false);
					b.m(a);
					b.sb(d);
					null != c && (a = pako.deflateRaw(c.Vb()),
						b.Xb(a));
					this.Y.send(b.Od());
				}
			}

			zf(a, b) {
				let c = class_A.ia(16, false);
				c.m(0);
				c.sb(a);
				c.Wb(b);
				this.Y.send(c.Od());
			}

			Ei() {
				let a = class_A.ia(1, false);
				a.m(8);
				this.Y.send(a.Od());
			}

			Fi() {
				this.Hg = false;
				let a = class_A.ia(256, false);
				a.m(7);
				null != this.Qc && a.Tg(this.Qc);
				this.Y.send(a.Od());
			}

			pm() {
				let a = class_A.ia(2, false);
				a.m(9);
				a.m(this.uf ? 1 : 0);
				this.Y.send(a.Od());
				this.qm = this.uf;
			}

			Gi(a, b, c, d) {
				let e = class_A.ia(32, false);
				e.oc(b.sdp);
				e.Ug(c);
				null != d && e.Xb(d.Vb());
				this.Rc(1, a, e);
			}

			Di(a, b) {
				let c = class_A.ia(32, false);
				c.Ug(b);
				this.Rc(4, a, c);
			}

			Ak() {
				let a = this.vd.values()
					,
					b = a.next();
				for (; !b.done;) {
					let c = b.value;
					b = a.next();
					c.ja();
				}
				this.vd.clear();
			}

			Oh(a) {
				this.Ak();
				window.clearTimeout(this.re);
				this.re = null;
				this.Hg = false;
				window.clearInterval(this.Bl);
				window.clearTimeout(this.gm);
				let b = this;
				a && (this.gm = window.setTimeout(function () {
					b.Oi();
				}, this.kr + Math.random() * this.lr | 0));
			}

			Mn(a) {
				let b = 0
					,
					c = a.ve;
				for (; b < c.length;)
					this.Rf.add(c[b++]);
				null != a.od && this.th.add(a.od);
				return {
					ht: a.ve,
					ft: a.od
				};
			}

			$d() {
				this.Rf.clear();
				this.th.clear();
			}

			static Fk(a) {
				try {
					let b = class_Kc.qf(a.candidate);
					if ('srflx' == b.Zr)
						return b.kp;
				}
				catch (b) {
				}
				return null;
			}
		}

		class class_Ic {
			static kj() {
				class_m.Ga(class_Fb);
				class_m.Ga(class_Ja);
				class_m.Ga(class_ab);
				class_m.Ga(class_Aa);
				class_m.Ga(class_Xa);
				class_m.Ga(class_Da);
				class_m.Ga(class_ma);
				class_m.Ga(class_Ua);
				class_m.Ga(class_Va);
				class_m.Ga(class_Ya);
				class_m.Ga(class_xa);
				class_m.Ga(class_Ga);
				class_m.Ga(class_fa);
				class_m.Ga(class_Ha);
				class_m.Ga(class_Ia);
				class_m.Ga(class_Wa);
				class_m.Ga(class_Fa);
				class_m.Ga(class_Ca);
				class_m.Ga(class_Oa);
				class_m.Ga(class_bb);
				class_m.Ga(class_Gb);
				class_m.Ga(class_Pa);
				class_m.Ga(class_Hb);
				class_m.Ga(class_Ib);
			}
		}

		class class_p {
		}

		class class_ha {
			static Vc(a, b) {
				return a.length <= b ? a : class_P.substr(a, 0, b);
			}

			static rs(a) {
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

		class class_K {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Sa = b;
				this.a = 0;
			}

			rb(a) {
				null == a && (a = this.s.byteLength - this.a);
				if (this.a + a > this.s.byteLength)
					throw class_v.B('Read too much');
				let b = new Uint8Array(this.s.buffer, this.s.byteOffset + this.a, a);
				this.a += a;
				return b;
			}

			Ql(a) {
				let b = this.rb(a);
				a = new ArrayBuffer(a);
				(new Uint8Array(a)).set(b);
				return a;
			}

			sf() {
				return this.s.getInt8(this.a++);
			}

			C() {
				return this.s.getUint8(this.a++);
			}

			si() {
				let a = this.s.getInt16(this.a, this.Sa);
				this.a += 2;
				return a;
			}

			Rb() {
				let a = this.s.getUint16(this.a, this.Sa);
				this.a += 2;
				return a;
			}

			N() {
				let a = this.s.getInt32(this.a, this.Sa);
				this.a += 4;
				return a;
			}

			gb() {
				let a = this.s.getUint32(this.a, this.Sa);
				this.a += 4;
				return a;
			}

			ri() {
				let a = this.s.getFloat32(this.a, this.Sa);
				this.a += 4;
				return a;
			}

			v() {
				let a = this.s.getFloat64(this.a, this.Sa);
				this.a += 8;
				return a;
			}

			Ab() {
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

			oe(a) {
				let b = this.a,
					c,
					d = '';
				for (a = b + a; b < a;)
					c = class_K.wo(this.s, b),
						b += c.length,
						d += String.fromCodePoint(c.char);
				if (b != a)
					throw class_v.B('Actual string length differs from the specified: ' + (b - a) + ' bytes');
				this.a = b;
				return d;
			}

			zb() {
				let a = this.Ab();
				return 0 >= a ? null : this.oe(a - 1);
			}

			kc() {
				return this.oe(this.Ab());
			}

			Sl() {
				return this.oe(this.C());
			}

			Eg() {
				let a = this.kc();
				return JSON.parse(a);
			}

			static wo(a, b) {
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
					throw class_v.B('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
				return {
					char: c,
					length: b - h
				};
			}
		}

		class class_q {
			constructor() {
				this.L = [];
				this.V = [];
				this.qa = [];
				this.vc = [];
				this.G = [];
				this.ob = [];
				this.Ld = [];
				this.td = [];
				this.me = new class_ec;
				this.Eh = 255;
				this.Oe = this.ff = 0;
				this.Uf = true;
				this.vf = false;
			}

			lg() {
				let a = new class_za;
				a.S = 16777215;
				a.h = 63;
				a.w = 193;
				a.$ = 10;
				a.Ba = .99;
				a.ba = 1;
				a.o = .5;
				return a;
			}

			fa(a) {
				a.m(this.Eh);
				if (!this.Xe()) {
					a.Eb(this.A);
					a.P(this.sd);
					a.u(this.Zd);
					a.u(this.Yd);
					a.u(this.rd);
					a.u(this.Zc);
					a.u(this.Ne);
					a.P(this.qd);
					a.u(this.bc);
					a.u(this.sc);
					a.u(this.mc);
					this.me.fa(a);
					a.Wb(this.ff);
					a.m(this.Oe);
					a.m(this.Uf ? 1 : 0);
					a.m(this.vf ? 1 : 0);
					a.m(this.L.length);
					for (var b = 0, c = this.L.length; b < c;) {
						var d = b++;
						let e = this.L[d];
						e.Bd = d;
						e.fa(a);
					}
					a.m(this.V.length);
					b = 0;
					for (c = this.V; b < c.length;)
						c[b++].fa(a);
					a.m(this.qa.length);
					b = 0;
					for (c = this.qa; b < c.length;)
						c[b++].fa(a);
					a.m(this.vc.length);
					b = 0;
					for (c = this.vc; b < c.length;)
						c[b++].fa(a);
					a.m(this.G.length);
					b = 0;
					for (c = this.G; b < c.length;)
						c[b++].fa(a);
					a.m(this.ob.length);
					b = 0;
					for (c = this.ob; b < c.length;)
						c[b++].fa(a);
					a.m(this.Ld.length);
					b = 0;
					for (c = this.Ld; b < c.length;)
						d = c[b],
							++b,
							a.u(d.x),
							a.u(d.y);
					a.m(this.td.length);
					b = 0;
					for (c = this.td; b < c.length;)
						d = c[b],
							++b,
							a.u(d.x),
							a.u(d.y);
				}
			}

			$r(a) {
				function b() {
					let f = []
						,
						g = a.C()
						,
						h = 0;
					for (; h < g;) {
						++h;
						let k = new class_O(0, 0);
						k.x = a.v();
						k.y = a.v();
						f.push(k);
					}
					return f;
				}

				this.A = a.zb();
				this.sd = a.N();
				this.Zd = a.v();
				this.Yd = a.v();
				this.rd = a.v();
				this.Zc = a.v();
				this.Ne = a.v();
				this.qd = a.N();
				this.bc = a.v();
				this.sc = a.v();
				this.mc = a.v();
				this.me.ka(a);
				this.ff = a.Rb();
				this.Oe = a.C();
				this.Uf = 0 != a.C();
				this.vf = 0 != a.C();
				this.L = [];
				for (var c = a.C(), d = 0; d < c;) {
					var e = new class_G;
					e.ka(a);
					e.Bd = d++;
					this.L.push(e);
				}
				this.V = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new class_I,
						e.ka(a, this.L),
						this.V.push(e);
				this.qa = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new class_S,
						e.ka(a),
						this.qa.push(e);
				this.vc = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new class_eb,
						e.ka(a),
						this.vc.push(e);
				this.G = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new class_za,
						e.ka(a),
						this.G.push(e);
				this.ob = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new class_Jb,
						e.ka(a),
						this.ob.push(e);
				this.Ld = b();
				this.td = b();
				this.ne();
			}

			ne() {
				let a = 0
					,
					b = this.V;
				for (; a < b.length;)
					b[a++].ne();
			}

			Xe() {
				return 255 != this.Eh;
			}

			he(a, b) {
				a = a[b];
				return null != a ? class_w.I(a, D) : 0;
			}

			Bp(a) {
				a = a.canBeStored;
				return null != a ? class_w.I(a, Cc) : true;
			}

			ye() {
				return JSON.stringify(this.Wr());
			}

			Wr() {
				if (!this.Uf) {
					//throw class_v.B(0);
					console.debug(this.A + ' canBeStored bypassed');
				}
				let a = {};
				for (var b = 0, c = [], d = 0, e = this.L; d < e.length;) {
					var f = e[d];
					++d;
					f.Bd = b++;
					c.push(class_q.ks(f));
				}
				d = new class_I;
				b = [];
				e = 0;
				for (f = this.V; e < f.length;)
					b.push(class_q.sr(f[e++], d));
				d = [];
				e = 0;
				for (f = this.qa; e < f.length;)
					d.push(class_q.sq(f[e++]));
				e = [];
				f = 0;
				for (var g = this.vc; f < g.length;)
					e.push(class_q.Wo(g[f++]));
				f = class_q.vq(this.me);
				var h = new class_za;
				g = [];
				for (var k = 0, l = this.G; k < l.length;)
					g.push(class_q.zo(l[k++], h));
				h = [];
				k = 0;
				for (l = this.ob; k < l.length;)
					h.push(class_q.op(l[k++]));
				k = [];
				l = 0;
				for (var n = this.Ld; l < n.length;) {
					var r = n[l];
					++l;
					k.push([r.x, r.y]);
				}
				l = [];
				n = 0;
				for (r = this.td; n < r.length;) {
					let t = r[n];
					++n;
					l.push([t.x, t.y]);
				}
				c = {
					name: this.A,
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
				class_q.la(c, 'maxViewWidth', this.ff, 0);
				class_q.la(c, 'cameraFollow', 1 == this.Oe ? 'player' : '', '');
				class_q.la(c, 'spawnDistance', this.mc, 200);
				0 != h.length && (c.joints = h);
				0 != k.length && (c.redSpawnPoints = k);
				0 != l.length && (c.blueSpawnPoints = l);
				class_q.la(c, 'kickOffReset', this.vf ? 'full' : 'partial', 'partial');
				switch (this.sd) {
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
				class_q.la(a, 'width', this.Zd, 0);
				class_q.la(a, 'height', this.Yd, 0);
				class_q.la(a, 'kickOffRadius', this.rd, 0);
				class_q.la(a, 'cornerRadius', this.Zc, 0);
				class_q.yg(a, this.qd, 7441498);
				class_q.la(a, 'goalLine', this.Ne, 0);
				return c;
			}

			Vk(a) {
				function b(h) {
					let k = class_w.I(h[0], D);
					h = class_w.I(h[1], D);
					null == h && (h = 0);
					null == k && (k = 0);
					return new class_O(k, h);
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
									class_q.Jn(t, f),
										h.push(l(t));
								}
								catch (z) {
									throw class_v.B(new class_Vb('Error in "' + k + '" index: ' + h.length));
								}
							}
				}

				let d = JSON5.parse(a);
				this.L = [];
				this.V = [];
				this.qa = [];
				this.vc = [];
				this.G = [];
				this.ob = [];
				this.A = class_w.I(d.name, String);
				this.bc = class_w.I(d.width, D);
				this.sc = class_w.I(d.height, D);
				this.ff = this.he(d, 'maxViewWidth') | 0;
				'player' == d.cameraFollow && (this.Oe = 1);
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
				this.sd = e;
				this.Zd = this.he(a, 'width');
				this.Yd = this.he(a, 'height');
				this.rd = this.he(a, 'kickOffRadius');
				this.Zc = this.he(a, 'cornerRadius');
				this.qd = 7441498;
				null != a.color && (this.qd = class_q.jg(a.color));
				this.Ne = this.he(a, 'goalLine');
				this.Uf = this.Bp(d);
				this.vf = 'full' == d.kickOffReset;
				let f = d.traits;
				a = d.ballPhysics;
				'disc0' != a && (null != a ? (a = class_q.Wk(a, this.lg()),
					a.w |= 192,
					this.G.push(a)) : this.G.push(this.lg()));
				c(this.L, 'vertexes', class_q.Ap);
				let g = this;
				c(this.V, 'segments', function (h) {
					return class_q.zp(h, g.L);
				});
				c(this.vc, 'goals', class_q.vp);
				c(this.G, 'discs', function (h) {
					return class_q.Wk(h, new class_za);
				});
				c(this.qa, 'planes', class_q.xp);
				c(this.ob, 'joints', function (h) {
					return class_q.wp(h, g.G);
				}, true);
				c(this.Ld, 'redSpawnPoints', b, true);
				c(this.td, 'blueSpawnPoints', b, true);
				a = d.playerPhysics;
				null != a && (this.me = class_q.yp(a));
				if (255 < this.L.length || 255 < this.V.length || 255 < this.qa.length || 255 < this.vc.length || 255 < this.G.length)
					throw class_v.B('Error');
				this.ne();
			}

			bk() {
				let a = class_q.Ur;
				a.a = 0;
				this.fa(a);
				let b = new class_vc;
				b.qs(a.Vb());
				b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
				b.hash += b.hash << 15;
				return b.hash | 0;
			}

			Xn(a, b) {
				let c = 0
					,
					d = this.vc;
				for (; c < d.length;) {
					let h = d[c];
					++c;
					var e = h.X
						,
						f = h.da
						,
						g = b.x - a.x;
					let k = b.y - a.y;
					0 < -(e.y - a.y) * g + (e.x - a.x) * k == 0 < -(f.y - a.y) * g + (f.x - a.x) * k ? e = false : (g = f.x - e.x,
						f = f.y - e.y,
						e = 0 < -(a.y - e.y) * g + (a.x - e.x) * f == 0 < -(b.y - e.y) * g + (b.x - e.x) * f ? false : true);
					if (e)
						return h.we;
				}
				return class_u.La;
			}

			fd(a, b, c, d, e, f, g, h) {
				null == h && (h = 0);
				this.A = a;
				this.G.push(this.lg());
				this.bc = b;
				this.sc = c;
				this.sd = 1;
				this.qd = 7441498;
				this.Zd = d;
				this.Yd = e;
				this.rd = g;
				this.Zc = h;
				this.mc = .75 * d;
				400 < this.mc && (this.mc = 400);
				a = new class_S;
				var k = a.wa;
				k.x = 0;
				k.y = 1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.wa;
				k.x = 0;
				k.y = -1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.wa;
				k.x = 1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.wa;
				k.x = -1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				this.mg(d, 1, f, 13421823, class_u.Aa);
				this.mg(-d, -1, f, 16764108, class_u.ga);
				this.al(g, c);
				b = new class_S;
				c = b.wa;
				c.x = 0;
				c.y = 1;
				b.Ta = -e;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.wa;
				c.x = 0;
				c.y = -1;
				b.Ta = -e;
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
				f.X = c;
				f.da = g;
				f.h = 1;
				f.Ya = false;
				t = new class_I;
				t.X = a;
				t.da = k;
				t.h = 1;
				t.Ya = false;
				let z = new class_I;
				z.X = l;
				z.da = n;
				z.h = 1;
				z.Ya = false;
				let J = new class_I;
				J.X = r;
				J.da = b;
				J.h = 1;
				J.Ya = false;
				this.L.push(b);
				this.L.push(c);
				this.L.push(g);
				this.L.push(a);
				this.L.push(k);
				this.L.push(l);
				this.L.push(n);
				this.L.push(r);
				this.V.push(f);
				this.V.push(t);
				this.V.push(z);
				this.V.push(J);
				this.Zk(d, e, h);
				this.ne();
			}

			$k(a, b, c, d, e, f, g, h) {
				this.A = a;
				this.G.push(this.lg());
				this.bc = b;
				this.sc = c;
				this.sd = 2;
				this.Zd = d;
				this.Yd = e;
				this.rd = 75;
				this.Zc = h;
				this.Ne = g;
				this.mc = .75 * (d - g);
				400 < this.mc && (this.mc = 400);
				a = new class_S;
				var k = a.wa;
				k.x = 0;
				k.y = 1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.wa;
				k.x = 0;
				k.y = -1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.wa;
				k.x = 1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				a = new class_S;
				k = a.wa;
				k.x = -1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				this.mg(d - g, 1, f, 13421823, class_u.Aa, 63);
				this.mg(-d + g, -1, f, 16764108, class_u.ga, 63);
				this.al(75, c);
				b = new class_S;
				c = b.wa;
				c.x = 0;
				c.y = 1;
				b.Ta = -e;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.wa;
				c.x = 0;
				c.y = -1;
				b.Ta = -e;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.wa;
				c.x = 1;
				c.y = 0;
				b.Ta = -d;
				b.h = 1;
				this.qa.push(b);
				b = new class_S;
				c = b.wa;
				c.x = -1;
				c.y = 0;
				b.Ta = -d;
				b.h = 1;
				this.qa.push(b);
				this.Zk(d, e, h);
				this.ne();
			}

			mg(a, b, c, d, e, f) {
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
				l.X = h;
				l.da = n;
				l.Sc(90 * b);
				let t = new class_I;
				t.X = r;
				t.da = n;
				let z = new class_I;
				z.X = r;
				z.da = k;
				z.Sc(90 * b);
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
				b = this.V.length;
				this.V.push(l);
				this.V.push(t);
				this.V.push(z);
				h = b;
				for (b = this.V.length; h < b;)
					k = h++,
						this.V[k].h = f,
						this.V[k].w = g,
						this.V[k].o = .1;
				f = new class_za;
				g = f.a;
				g.x = a;
				g.y = -c;
				f.ba = 0;
				f.$ = 8;
				f.S = d;
				this.G.push(f);
				f = new class_za;
				g = f.a;
				g.x = a;
				g.y = c;
				f.ba = 0;
				f.$ = 8;
				f.S = d;
				this.G.push(f);
				d = new class_eb;
				f = d.X;
				f.x = a;
				f.y = -c;
				f = d.da;
				f.x = a;
				f.y = c;
				d.we = e;
				this.vc.push(d);
			}

			al(a, b) {
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
				b.X = c;
				b.da = d;
				b.w = 24;
				b.h = 6;
				b.Ya = false;
				b.o = .1;
				f = new class_I;
				f.X = e;
				f.da = a;
				f.w = 24;
				f.h = 6;
				f.Ya = false;
				f.o = .1;
				let g = new class_I;
				g.X = d;
				g.da = e;
				g.w = 8;
				g.h = 6;
				g.Ya = false;
				g.Sc(180);
				g.o = .1;
				let h = new class_I;
				h.X = e;
				h.da = d;
				h.w = 16;
				h.h = 6;
				h.Ya = false;
				h.Sc(180);
				h.o = .1;
				this.L.push(c);
				this.L.push(d);
				this.L.push(e);
				this.L.push(a);
				this.V.push(b);
				this.V.push(f);
				this.V.push(g);
				this.V.push(h);
			}

			Zk(a, b, c) {
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
					a.X = d;
					a.da = e;
					a.h = 1;
					a.Ya = false;
					a.o = 1;
					a.Sc(-90);
					b = new class_I;
					b.X = f;
					b.da = g;
					b.h = 1;
					b.Ya = false;
					b.o = 1;
					b.Sc(90);
					c = new class_I;
					c.X = h;
					c.da = k;
					c.h = 1;
					c.Ya = false;
					c.o = 1;
					c.Sc(-90);
					r = new class_I;
					r.X = l;
					r.da = n;
					r.h = 1;
					r.Ya = false;
					r.o = 1;
					r.Sc(90);
					this.L.push(d);
					this.L.push(e);
					this.L.push(f);
					this.L.push(g);
					this.L.push(h);
					this.L.push(k);
					this.L.push(l);
					this.L.push(n);
					this.V.push(a);
					this.V.push(b);
					this.V.push(c);
					this.V.push(r);
				}
			}

			static ka(a) {
				var b = a.C();
				return 255 == b ? (b = new class_q,
					b.$r(a),
					b) : class_q.Mh()[b];
			}

			static Mh() {
				if (null == class_q.vb) {
					class_q.vb = [];
					var a = new class_q;
					a.fd('Classic', 420, 200, 370, 170, 64, 75);
					class_q.vb.push(a);
					a = new class_q;
					a.fd('Easy', 420, 200, 370, 170, 90, 75);
					class_q.vb.push(a);
					a = new class_q;
					a.fd('Small', 420, 200, 320, 130, 55, 70);
					class_q.vb.push(a);
					a = new class_q;
					a.fd('Big', 600, 270, 550, 240, 80, 80);
					class_q.vb.push(a);
					a = new class_q;
					a.fd('Rounded', 420, 200, 370, 170, 64, 75, 75);
					class_q.vb.push(a);
					a = new class_q;
					a.$k('Hockey', 420, 204, 398, 182, 68, 120, 100);
					class_q.vb.push(a);
					a = new class_q;
					a.$k('Big Hockey', 600, 270, 550, 240, 90, 160, 150);
					class_q.vb.push(a);
					a = new class_q;
					a.fd('Big Easy', 600, 270, 550, 240, 95, 80);
					class_q.vb.push(a);
					a = new class_q;
					a.fd('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
					class_q.vb.push(a);
					a = new class_q;
					a.fd('Huge', 750, 350, 700, 320, 100, 80);
					class_q.vb.push(a);
					a = 0;
					let b = class_q.vb.length;
					for (; a < b;) {
						let c = a++;
						class_q.vb[c].Eh = c;
					}
				}
				return class_q.vb;
			}

			static Jn(a, b) {
				if (null != a.trait && (b = b[class_w.I(a.trait, String)],
				null != b)) {
					let c = 0
						,
						d = class_Bc.Zm(b);
					for (; c < d.length;) {
						let e = d[c];
						++c;
						null == a[e] && (a[e] = b[e]);
					}
				}
			}

			static Qn(a) {
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

			static Nc(a, b, c, d) {
				c != d && (a[b] = class_q.Qn(c));
			}

			static yg(a, b, c) {
				b != c && (a.color = class_q.eo(b));
			}

			static eo(a) {
				a |= 0;
				return 0 > a ? 'transparent' : class_ba.bh(a);
			}

			static jg(a) {
				if ('transparent' == a)
					return -1;
				if ('string' == typeof a)
					return class_Q.parseInt('0x' + class_Q.De(a));
				if (a instanceof Array)
					return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
				throw class_v.B('Bad color');
			}

			static ks(a) {
				let b = {
					x: a.a.x,
					y: a.a.y
				};
				class_q.la(b, 'bCoef', a.o, 1);
				class_q.Nc(b, 'cMask', a.h, 63);
				class_q.Nc(b, 'cGroup', a.w, 32);
				return b;
			}

			static Ap(a) {
				let b = new class_G;
				b.a.x = class_w.I(a.x, D);
				b.a.y = class_w.I(a.y, D);
				var c = a.bCoef;
				null != c && (b.o = class_w.I(c, D));
				c = a.cMask;
				null != c && (b.h = class_q.Jc(c));
				a = a.cGroup;
				null != a && (b.w = class_q.Jc(a));
				return b;
			}

			static sr(a, b) {
				let c = {
					v0: a.X.Bd,
					v1: a.da.Bd
				};
				class_q.la(c, 'bias', a.Gc, b.Gc);
				class_q.la(c, 'bCoef', a.o, b.o);
				let d = a.Po();
				class_q.la(c, 'curve', d, 0);
				0 != d && (c.curveF = a.ub);
				class_q.la(c, 'vis', a.Ya, b.Ya);
				class_q.Nc(c, 'cMask', a.h, b.h);
				class_q.Nc(c, 'cGroup', a.w, b.w);
				class_q.yg(c, a.S, b.S);
				return c;
			}

			static zp(a, b) {
				let c = new class_I;
				var d = class_w.I(a.v1, $b);
				c.X = b[class_w.I(a.v0, $b)];
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
				null != b && (c.Gc = class_w.I(b, D));
				null != d && (c.o = class_w.I(d, D));
				null != f ? c.ub = class_w.I(f, D) : null != e && c.Sc(class_w.I(e, D));
				null != g && (c.Ya = class_w.I(g, Cc));
				null != h && (c.h = class_q.Jc(h));
				null != k && (c.w = class_q.Jc(k));
				null != a && (c.S = class_q.jg(a));
				return c;
			}

			static op(a) {
				let b = {
					d0: a.de,
					d1: a.ee,
					length: a.Ib >= a.fc ? a.Ib : [a.Ib, a.fc]
				};
				class_q.yg(b, a.S, 0);
				class_q.la(b, 'strength', a.ue, 1 / 0);
				return b;
			}

			static wp(a, b) {
				let c = new class_Jb;
				var d = class_w.I(a.d0, $b)
					,
					e = class_w.I(a.d1, $b);
				let f = a.color
					,
					g = a.strength;
				a = a.length;
				if (d >= b.length || 0 > d)
					throw class_v.B(null);
				if (e >= b.length || 0 > e)
					throw class_v.B(null);
				c.de = d;
				c.ee = e;
				null == a ? (d = b[d],
					e = b[e],
					null == d || null == e ? c.fc = c.Ib = 100 : (b = d.a,
						d = e.a,
						e = b.x - d.x,
						b = b.y - d.y,
						c.fc = c.Ib = Math.sqrt(e * e + b * b))) : a instanceof Array ? (c.Ib = class_w.I(a[0], D),
					c.fc = class_w.I(a[1], D)) : c.fc = c.Ib = class_w.I(a, D);
				c.ue = null == g || 'rigid' == g ? 1 / 0 : class_w.I(g, D);
				null != f && (c.S = class_q.jg(f));
				return c;
			}

			static sq(a) {
				let b = {
					normal: [a.wa.x, a.wa.y],
					dist: a.Ta
				};
				class_q.la(b, 'bCoef', a.o, 1);
				class_q.Nc(b, 'cMask', a.h, 63);
				class_q.Nc(b, 'cGroup', a.w, 32);
				return b;
			}

			static xp(a) {
				let b = new class_S;
				var c = class_w.I(a.normal, Array)
					,
					d = class_w.I(c[0], D)
					,
					e = class_w.I(c[1], D);
				c = b.wa;
				let f = d;
				var g = e;
				null == e && (g = 0);
				null == d && (f = 0);
				d = f;
				e = Math.sqrt(d * d + g * g);
				c.x = d / e;
				c.y = g / e;
				b.Ta = class_w.I(a.dist, D);
				c = a.bCoef;
				d = a.cMask;
				a = a.cGroup;
				null != c && (b.o = class_w.I(c, D));
				null != d && (b.h = class_q.Jc(d));
				null != a && (b.w = class_q.Jc(a));
				return b;
			}

			static Wo(a) {
				return {
					p0: [a.X.x, a.X.y],
					p1: [a.da.x, a.da.y],
					team: a.we == class_u.ga ? 'red' : 'blue'
				};
			}

			static vp(a) {
				let b = new class_eb;
				var c = class_w.I(a.p0, Array);
				let d = class_w.I(a.p1, Array)
					,
					e = b.X;
				e.x = c[0];
				e.y = c[1];
				c = b.da;
				c.x = d[0];
				c.y = d[1];
				switch (a.team) {
					case 'blue':
						a = class_u.Aa;
						break;
					case 'red':
						a = class_u.ga;
						break;
					default:
						throw class_v.B('Bad team value');
				}
				b.we = a;
				return b;
			}

			static vq(a) {
				let b = {};
				class_q.la(b, 'bCoef', a.o, .5);
				class_q.la(b, 'invMass', a.ba, .5);
				class_q.la(b, 'damping', a.Ba, .96);
				class_q.la(b, 'acceleration', a.Ke, .1);
				class_q.la(b, 'kickingAcceleration', a.af, .07);
				class_q.la(b, 'kickingDamping', a.bf, .96);
				class_q.la(b, 'kickStrength', a.Ze, 5);
				class_q.Nc(b, 'cGroup', a.w, 0);
				if (0 != a.oa.x || 0 != a.oa.y)
					b.gravity = [a.oa.x, a.oa.y];
				class_q.la(b, 'radius', a.$, 15);
				class_q.la(b, 'kickback', a.$e, 0);
				return b;
			}

			static yp(a) {
				let b = new class_ec;
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
				null != c && (b.o = class_w.I(c, D));
				null != d && (b.ba = class_w.I(d, D));
				null != e && (b.Ba = class_w.I(e, D));
				null != f && (b.Ke = class_w.I(f, D));
				null != g && (b.af = class_w.I(g, D));
				null != h && (b.bf = class_w.I(h, D));
				null != k && (b.Ze = class_w.I(k, D));
				null != l && (c = b.oa,
					d = class_w.I(l[1], D),
					c.x = class_w.I(l[0], D),
					c.y = d);
				null != n && (b.w = class_q.Jc(n));
				null != r && (b.$ = class_w.I(r, D));
				null != a && (b.$e = class_w.I(a, D));
				return b;
			}

			static zo(a, b) {
				let c = {};
				if (a.a.x != b.a.x || a.a.y != b.a.y)
					c.pos = [a.a.x, a.a.y];
				if (a.F.x != b.F.x || a.F.y != b.F.y)
					c.speed = [a.F.x, a.F.y];
				if (a.oa.x != b.oa.x || a.oa.y != b.oa.y)
					c.gravity = [a.oa.x, a.oa.y];
				class_q.la(c, 'radius', a.$, b.$);
				class_q.la(c, 'bCoef', a.o, b.o);
				class_q.la(c, 'invMass', a.ba, b.ba);
				class_q.la(c, 'damping', a.Ba, b.Ba);
				class_q.yg(c, a.S, b.S);
				class_q.Nc(c, 'cMask', a.h, b.h);
				class_q.Nc(c, 'cGroup', a.w, b.w);
				return c;
			}

			static Wk(a, b) {
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
				null != d && (c = b.F,
					c.x = d[0],
					c.y = d[1]);
				null != e && (d = b.oa,
					d.x = e[0],
					d.y = e[1]);
				null != f && (b.$ = class_w.I(f, D));
				null != g && (b.o = class_w.I(g, D));
				null != h && (b.ba = class_w.I(h, D));
				null != k && (b.Ba = class_w.I(k, D));
				null != l && (b.S = class_q.jg(l));
				null != n && (b.h = class_q.Jc(n));
				null != a && (b.w = class_q.Jc(a));
				return b;
			}

			static la(a, b, c, d) {
				c != d && (a[b] = c);
			}
		}

		class class_Kb {
			constructor() {
				this.f = class_x.Fa(class_Kb.O);
				let a = class_x.Da(this.f)
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

		class class_ka {
			constructor() {
				this.tb = '';
				this.Ic = this.Kc = 0;
			}

			ye() {
				return JSON.stringify({
					lat: this.Ic,
					lon: this.Kc,
					code: this.tb
				});
			}

			static Kh(a) {
				return class_ka.$f(JSON.parse(a));
			}

			static $f(a) {
				let b = new class_ka;
				b.Ic = a.lat;
				b.Kc = a.lon;
				b.tb = a.code.toLowerCase();
				return b;
			}

			static So() {
				return class_aa.Dk(class_p.Me + 'api/geo').then(function (a) {
					return class_ka.$f(a);
				});
			}
		}

		class class_ec {
			constructor() {
				this.$e = 0;
				this.$ = 15;
				this.w = 0;
				this.oa = new class_O(0, 0);
				this.ba = this.o = .5;
				this.Ba = .96;
				this.Ke = .1;
				this.af = .07;
				this.bf = .96;
				this.Ze = 5;
			}

			fa(a) {
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Ba);
				a.u(this.Ke);
				a.u(this.af);
				a.u(this.bf);
				a.u(this.Ze);
				let b = this.oa;
				a.u(b.x);
				a.u(b.y);
				a.P(this.w);
				a.u(this.$);
				a.u(this.$e);
			}

			ka(a) {
				this.o = a.v();
				this.ba = a.v();
				this.Ba = a.v();
				this.Ke = a.v();
				this.af = a.v();
				this.bf = a.v();
				this.Ze = a.v();
				let b = this.oa;
				b.x = a.v();
				b.y = a.v();
				this.w = a.N();
				this.$ = a.v();
				this.$e = a.v();
			}
		}

		class class_La {
			static i(a, b, c) {
				null != a && a(b, c);
			}
		}

		class class_aa {
			static cm(a, b, c, d, e) {
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

			static H(a, b) {
				return class_aa.cm(a, 'GET', b, null);
			}

			static Dk(a) {
				return class_aa.H(a, 'json').then(function (b) {
					let c = b.error;
					if (null != c)
						throw class_v.B(c);
					return b.data;
				});
			}

			static yq(a, b, c) {
				return class_aa.cm(a, 'POST', 'json', b, c);
			}

			static Ml(a, b, c) {
				return class_aa.yq(a, b, c).then(function (d) {
					let e = d.error;
					if (null != e)
						throw class_v.B(e);
					return d.data;
				});
			}
		}

		class class_W {
			constructor() {
				this.ed = window.performance.now();
				this.Pg = new Map;
				this.jd = new Map;
				this.qe = 1;
				this.vh = 100;
				this.Rg = 35;
				this.Kd = 0;
				this.Dg = 1.5;
				this.Wa = new class_O(0, 0);
				this.Nk = false;
				this.Ad = new class_wc;
				this.sa = window.document.createElement('canvas');
				this.sa.mozOpaque = true;
				this.c = this.sa.getContext('2d', {
					alpha: false
				});
				this.Yo = this.c.createPattern(class_p.Xo, null);
				this.ko = this.c.createPattern(class_p.jo, null);
				this.io = this.c.createPattern(class_p.ho, null);
			}

			bp(a, b) {
				a = this.jd.get(a.W);
				if (null != a)
					switch (b) {
						case 0:
							a.gg = true;
							break;
						case 1:
							a.gg = false;
					}
			}

			fs() {
				if (null != this.sa.parentElement) {
					var a = window.devicePixelRatio * this.qe;
					let b = this.sa.getBoundingClientRect()
						,
						c = Math.round(b.width * a);
					a = Math.round(b.height * a);
					if (this.sa.width != c || this.sa.height != a)
						this.sa.width = c,
							this.sa.height = a;
				}
			}

			Oc(a, b) {
				var c = window.performance.now();
				let d = (c - this.ed) / 1E3;
				this.ed = c;
				this.Pg.clear();
				this.fs();
				class_W.Li(this.c, true);
				this.c.resetTransform();
				if (null != a.M) {
					c = a.M;
					var e = c.ta
						,
						f = a.na(b)
						,
						g = null != f ? f.J : null
						,
						h = 0 != this.Kd ? this.sa.height / this.Kd : this.Dg * window.devicePixelRatio * this.qe;
					b = this.Rg * this.qe;
					var k = this.vh * this.qe
						,
						l = c.T.ff
						,
						n = this.sa.width / h;
					0 < l && n > l && (n = l,
						h = this.sa.width / l);
					l = (this.sa.height - b - k) / h;
					this.cs(c, g, n, l, d);
					for (var r = 0, t = a.K; r < t.length;) {
						let z = t[r];
						++r;
						if (null == z.J)
							continue;
						let J = this.jd.get(z.W);
						null == J && (J = new class_tb,
							this.jd.set(z.W, J));
						J.D(z, a);
						this.Pg.set(z.J, J);
					}
					this.c.translate(this.sa.width / 2, (this.sa.height + b - k) / 2);
					this.c.scale(h, h);
					this.c.translate(-this.Wa.x, -this.Wa.y);
					this.c.lineWidth = 3;
					this.dr(c.T);
					this.cr(c.T);
					h = e.G;
					r = 0;
					for (t = e.ob; r < t.length;)
						this.Yq(t[r++], h);
					this.Xq(a, n, l);
					this.Zq(a, f);
					null != g && this.ar(g.a);
					this.c.lineWidth = 2;
					f = 0;
					for (g = a.K; f < g.length;)
						l = g[f],
							++f,
							n = l.J,
						null != n && (l = this.jd.get(l.W),
							this.Zl(n, l));
					f = 0;
					for (e = e.G; f < e.length;)
						g = e[f],
							++f,
						null == this.Pg.get(g) && this.Zl(g, null);
					this.c.lineWidth = 3;
					this.c.resetTransform();
					this.c.translate(this.sa.width / 2, b + (this.sa.height - b - k) / 2);
					this.$q(c);
					0 >= c.Pa && (this.Ad.D(d),
						this.Ad.Oc(this.c));
					this.Pg.clear();
					this.Wq(a);
				}
			}

			Wq(a) {
				let b = new Set;
				var c = 0;
				for (a = a.K; c < a.length;)
					b.add(a[c++].W);
				c = this.jd.keys();
				for (a = c.next(); !a.done;) {
					let d = a.value;
					a = c.next();
					b.has(d) || this.jd.delete(d);
				}
			}

			cs(a, b, c, d, e) {
				if (null != b && 1 == a.T.Oe) {
					var f = b.a;
					var g = f.x;
					f = f.y;
					null == f && (f = 0);
					null == g && (g = 0);
				}
				else if (f = a.ta.G[0].a,
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
				b && (k = b = this.Wa,
					e *= .04,
					h = k.x,
					k = k.y,
					b.x = h + (g - h) * e,
					b.y = k + (f - k) * e);
				this.lo(c, d, a.T);
			}

			lo(a, b, c) {
				a > 2 * c.bc ? this.Wa.x = 0 : this.Wa.x + .5 * a > c.bc ? this.Wa.x = c.bc - .5 * a : this.Wa.x - .5 * a < -c.bc && (this.Wa.x = -c.bc + .5 * a);
				b > 2 * c.sc ? this.Wa.y = 0 : this.Wa.y + .5 * b > c.sc ? this.Wa.y = c.sc - .5 * b : this.Wa.y - .5 * b < -c.sc && (this.Wa.y = -c.sc + .5 * b);
			}

			ar(a) {
				this.c.beginPath();
				this.c.strokeStyle = 'white';
				this.c.globalAlpha = .3;
				this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, false);
				this.c.stroke();
				this.c.globalAlpha = 1;
			}

			$q(a) {
				let b = 0 < a.Pa;
				this.Ar(b);
				b && (120 != a.Pa && (a = a.Pa / 120 * 200,
					this.c.fillStyle = 'white',
					this.c.fillRect(.5 * -a, 100, a, 20)),
					this.Ad.qq.er(this.c));
			}

			Ar(a) {
				this.Nk != a && (this.sa.style.filter = a ? 'grayscale(70%)' : '',
					this.Nk = a);
			}

			im(a, b, c, d, e, f) {
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

			dr(a) {
				class_W.Li(this.c, false);
				var b = a.Zd;
				let c = a.Yd
					,
					d = this;
				if (1 == a.sd)
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_W.nc(a.qd),
						this.c.fillRect(0, 0, this.sa.width, this.sa.height),
						this.c.restore(),
						this.c.strokeStyle = '#C7E6BD',
						this.c.fillStyle = this.Yo,
						this.im(this.c, -b, -c, 2 * b, 2 * c, a.Zc),
						this.c.save(),
						this.c.scale(2, 2),
						this.c.fill(),
						this.c.restore(),
						this.c.moveTo(0, -c),
						this.c.lineTo(0, c),
						this.c.stroke(),
						this.c.beginPath(),
						this.c.arc(0, 0, a.rd, 0, 2 * Math.PI),
						this.c.stroke();
				else if (2 == a.sd) {
					this.c.strokeStyle = '#E9CC6E';
					this.c.save();
					this.c.beginPath();
					this.c.rect(this.Wa.x - 1E4, this.Wa.y - 1E4, 2E4, 2E4);
					this.c.scale(2, 2);
					this.c.fillStyle = this.io;
					this.c.fill();
					this.c.restore();
					this.c.save();
					this.im(this.c, -b, -c, 2 * b, 2 * c, a.Zc);
					this.c.scale(2, 2);
					this.c.fillStyle = this.ko;
					this.c.fill();
					this.c.restore();
					this.c.stroke();
					this.c.beginPath();
					this.c.moveTo(0, -c);
					this.c.setLineDash([15, 15]);
					this.c.lineTo(0, c);
					this.c.stroke();
					this.c.setLineDash([]);
					var e = a.Ne;
					b -= e;
					e < a.Zc && (b = 0);
					e = function (f, g, h) {
						d.c.beginPath();
						d.c.strokeStyle = f;
						d.c.arc(0, 0, a.rd, -1.5707963267948966, 1.5707963267948966, h);
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
						this.c.fillStyle = class_W.nc(a.qd),
						this.c.fillRect(0, 0, this.sa.width, this.sa.height),
						this.c.restore();
				class_W.Li(this.c, true);
			}

			Zq(a, b) {
				let c = class_p.l.Kk.H()
					,
					d = 0;
				for (a = a.K; d < a.length;) {
					let f = a[d];
					++d;
					var e = f.J;
					if (null == e)
						continue;
					e = e.a;
					let g = this.jd.get(f.W);
					c && g.gg && this.c.drawImage(class_p.Rm, e.x - .5 * class_p.Rm.width, e.y - 35);
					f != b && g.Fo(this.c, e.x, e.y + 50);
				}
			}

			Zl(a, b) {
				this.c.beginPath();
				null == b ? (this.c.fillStyle = class_W.nc(a.S),
					this.c.strokeStyle = 'black') : (this.c.fillStyle = b.Qj,
					this.c.strokeStyle = b.yo);
				this.c.beginPath();
				this.c.arc(a.a.x, a.a.y, a.$, 0, 2 * Math.PI, false);
				null != b ? (this.c.save(),
					b = a.$ / 32,
					this.c.translate(a.a.x, a.a.y),
					this.c.scale(b, b),
					this.c.translate(-32, -32),
					this.c.fill(),
					this.c.restore()) : -1 != (a.S | 0) && this.c.fill();
				this.c.stroke();
			}

			cr(a) {
				if (null != a) {
					var b = 0;
					for (a = a.V; b < a.length;)
						this.br(a[b++]);
				}
			}

			Yq(a, b) {
				if (!(0 > a.S)) {
					this.c.beginPath();
					this.c.strokeStyle = class_W.nc(a.S);
					var c = b[a.de];
					a = b[a.ee];
					null != c && null != a && (c = c.a,
						a = a.a,
						this.c.moveTo(c.x, c.y),
						this.c.lineTo(a.x, a.y),
						this.c.stroke());
				}
			}

			br(a) {
				if (a.Ya) {
					this.c.beginPath();
					this.c.strokeStyle = class_W.nc(a.S);
					var b = a.X.a
						,
						c = a.da.a;
					if (0 != 0 * a.ub)
						this.c.moveTo(b.x, b.y),
							this.c.lineTo(c.x, c.y);
					else {
						a = a.ce;
						let d = b.x - a.x;
						b = b.y - a.y;
						this.c.arc(a.x, a.y, Math.sqrt(d * d + b * b), Math.atan2(b, d), Math.atan2(c.y - a.y, c.x - a.x));
					}
					this.c.stroke();
				}
			}

			Xq(a, b, c) {
				var d = a.M;
				if (null != d)
					for (d = d.ta.G[0],
						     this.yk(d.a, d.S, b, c),
						     d = 0,
						     a = a.K; d < a.length;) {
						let e = a[d];
						++d;
						null != e.J && this.yk(e.J.a, e.ea.S, b, c);
					}
			}

			yk(a, b, c, d) {
				c = .5 * c - 25;
				var e = .5 * d - 25;
				null == e && (e = 0);
				null == c && (c = 0);
				d = c;
				c = e;
				var f = this.Wa;
				e = a.x - f.x;
				f = a.y - f.y;
				let g = -d
					,
					h = -c
					,
					k = this.Wa;
				d = k.x + (e > d ? d : e < g ? g : e);
				c = k.y + (f > c ? c : f < h ? h : f);
				e = a.x - d;
				a = a.y - c;
				900 < e * e + a * a && (this.c.fillStyle = 'rgba(0,0,0,0.5)',
					this.zk(d + 2, c + 2, Math.atan2(a, e)),
					this.c.fillStyle = class_W.nc(b),
					this.zk(d - 2, c - 2, Math.atan2(a, e)));
			}

			zk(a, b, c) {
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

			ir() {
				let a = this.jd.values()
					,
					b = a.next();
				for (; !b.done;) {
					let c = b.value;
					b = a.next();
					c.gg = false;
				}
			}

			static nc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			static Li(a, b) {
				a.imageSmoothingEnabled = b;
				a.mozImageSmoothingEnabled = b;
			}
		}

		class class_wc {
			constructor() {
				this.Uc = 0;
				this.ab = [];
				this.Pr = new class_da(['Time is', 'Up!'], 16777215);
				this.Sq = new class_da(['Red is', 'Victorious!'], 15035990);
				this.Rq = new class_da(['Red', 'Scores!'], 15035990);
				this.Pn = new class_da(['Blue is', 'Victorious!'], 625603);
				this.On = new class_da(['Blue', 'Scores!'], 625603);
				this.qq = new class_da(['Game', 'Paused'], 16777215);
			}

			Qa(a) {
				this.ab.push(a);
			}

			$n() {
				this.ab = [];
				this.Uc = 0;
			}

			D(a) {
				0 < this.ab.length && (this.Uc += a) > this.ab[0].Mo() && (this.Uc = 0,
					this.ab.shift());
			}

			Oc(a) {
				0 < this.ab.length && this.ab[0].Oc(a, this.Uc);
			}
		}

		class class_Sb {
			constructor(a, b) {
				this.xa = a;
				this.ca = b;
			}

			qf(a) {
				if ('/' != a.charAt(0))
					return false;
				if (1 == a.length)
					return true;
				a = class_ba.Xs(class_P.substr(a, 1, null)).split(' ');
				let b = a[0]
					,
					c = this;
				switch (b) {
					case 'avatar':
						2 == a.length && (this.sm(a[1]),
							this.ca('Avatar set'));
						break;
					case 'checksum':
						var d = this.xa.U.T;
						a = d.A;
						d.Xe() ? this.ca('Current stadium is original: "' + a + '"') : (d = class_ba.bh(d.bk(), 8),
							this.ca('Stadium: "' + a + '" (checksum: ' + d + ')'));
						break;
					case 'clear_avatar':
						this.sm(null);
						this.ca('Avatar cleared');
						break;
					case 'clear_bans':
						null == this.$d ? this.ca('Only the host can clear bans') : (this.$d(),
							this.ca('All bans have been cleared'));
						break;
					case 'clear_password':
						null == this.Mg ? this.ca('Only the host can change the password') : (this.Mg(null),
							this.ca('Password cleared'));
						break;
					case 'colors':
						try {
							d = class_Sb.pq(a),
								this.xa.ra(d);
						}
						catch (g) {
							a = class_v.Kb(g).Fb(),
							'string' == typeof a && this.ca(a);
						}
						break;
					case 'extrapolation':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && -200 <= a && 1E3 >= a ? (class_p.l.yd.Ha(a),
								this.xa.tm(a),
								this.ca('Extrapolation set to ' + a + ' msec')) : this.ca('Extrapolation must be a value between -200 and 50 milliseconds')) : this.ca('Extrapolation requires a value in milliseconds.');
						break;
					case 'handicap':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && 0 <= a && 300 >= a ? (this.xa.zr(a),
								this.ca('Ping handicap set to ' + a + ' msec')) : this.ca('Ping handicap must be a value between 0 and 300 milliseconds')) : this.ca('Ping handicap requires a value in milliseconds.');
						break;
					case 'kick_ratelimit':
						if (4 > a.length)
							this.ca('Usage: /kick_ratelimit <min> <rate> <burst>');
						else {
							d = class_Q.parseInt(a[1]);
							var e = class_Q.parseInt(a[2]);
							a = class_Q.parseInt(a[3]);
							null == d || null == e || null == a ? this.ca('Invalid arguments') : this.xa.ra(class_Pa.ma(d, e, a));
						}
						break;
					case 'recaptcha':
						if (null == this.wm)
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
											throw class_v.B(null);
									}
									this.wm(e);
									this.ca('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
								}
								else
									throw class_v.B(null);
							}
							catch (g) {
								this.ca('Usage: /recaptcha <on|off>');
							}
						break;
					case 'set_password':
						2 == a.length && (null == this.Mg ? this.ca('Only the host can change the password') : (this.Mg(a[1]),
							this.ca('Password set')));
						break;
					case 'store':
						let f = this.xa.U.T;
						f.Xe() ? this.ca('Can\'t store default stadium.') : class_xb.Vs().then(function () {
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

			sm(a) {
				null != a && (a = class_ha.Vc(a, 2));
				class_p.l.sh.Ha(a);
				this.xa.ra(class_Oa.ma(a));
			}

			static pq(a) {
				if (3 > a.length)
					throw class_v.B('Not enough arguments');
				if (7 < a.length)
					throw class_v.B('Too many arguments');
				let b = new class_bb
					,
					c = new class_ya;
				b.Zg = c;
				switch (a[1]) {
					case 'blue':
						c.eb = [class_u.Aa.S];
						b.ea = class_u.Aa;
						break;
					case 'red':
						c.eb = [class_u.ga.S];
						b.ea = class_u.ga;
						break;
					default:
						throw class_v.B('First argument must be either "red" or "blue"');
				}
				if ('clear' == a[2])
					return b;
				c.pd = 256 * class_Q.parseInt(a[2]) / 360 | 0;
				c.ld = class_Q.parseInt('0x' + a[3]);
				if (4 < a.length) {
					c.eb = [];
					let d = 4
						,
						e = a.length;
					for (; d < e;)
						c.eb.push(class_Q.parseInt('0x' + a[d++]));
				}
				return b;
			}
		}

		class class_qb {
			constructor(a) {
				this.gl = a.get('notice');
				this.oo = a.get('notice-contents');
				this.ud = a.get('notice-close');
				this.Wl();
			}

			Wl() {
				let a = this;
				class_aa.Dk(class_p.Me + 'api/notice').then(function (b) {
					let c = b.content;
					null != c && '' != c && class_qb.ao != c && (a.oo.innerHTML = c,
							a.gl.hidden = false,
							a.ud.onclick = function () {
								class_qb.ao = c;
								return a.gl.hidden = true;
							}
					);
				});
			}
		}

		class class_H {
			static i(a) {
				null != a && a();
			}
		}

		class class_Cb {
			constructor(a) {
				this.A = a.A;
				this.yb = a.yb;
				this.aa = a.W;
				this.f = class_x.Fa(class_Cb.O);
				let b = class_x.Da(this.f);
				this.gf = b.get('name');
				this.zg = b.get('ping');
				try {
					b.get('flag').classList.add('f-' + a.country);
				}
				catch (d) {
				}
				this.gf.textContent = this.A;
				this.zg.textContent = '' + this.yb;
				let c = this;
				this.f.ondragstart = function (d) {
					d.dataTransfer.setData('player', class_Q.De(c.aa));
				}
				;
				this.f.oncontextmenu = function (d) {
					d.preventDefault();
					class_E.i(c.pf, c.aa);
				}
				;
				this.rm(a.cb);
			}

			D(a, b) {
				this.f.draggable = b;
				this.yb != a.yb && (this.yb = a.yb,
					this.zg.textContent = '' + this.yb);
				this.Hn != a.cb && this.rm(a.cb);
			}

			rm(a) {
				this.Hn = a;
				this.f.className = 'player-list-item' + (a ? ' admin' : '');
			}
		}

		class class_jb {
			constructor() {
				this.f = class_x.Fa(class_jb.O);
				let a = class_x.Da(this.f);
				this.Cb = a.get('input');
				this.jf = a.get('ok');
				let b = this;
				a.get('cancel').onclick = function () {
					null != b.Ua && b.Ua(null);
				}
				;
				this.Cb.maxLength = 30;
				this.Cb.oninput = function () {
					b.D();
				}
				;
				this.Cb.onkeydown = function (c) {
					13 == c.keyCode && b.Hc() && null != b.Ua && b.Ua(b.Cb.value);
				}
				;
				this.jf.onclick = function () {
					b.Hc() && null != b.Ua && b.Ua(b.Cb.value);
				}
				;
				this.D();
			}

			Hc() {
				let a = this.Cb.value;
				return 30 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.jf.disabled = !this.Hc();
			}
		}

		class class_O {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_m {
			constructor() {
				class_m.xb || this.Xa();
			}

			Xa() {
				this.Dc = 0;
			}

			nn() {
				return true;
			}

			apply() {
				throw class_v.B('missing implementation');
			}

			va() {
				throw class_v.B('missing implementation');
			}

			ua() {
				throw class_v.B('missing implementation');
			}

			static Ea(a) {
				null == a.delay && (a.delay = true);
				null == a.za && (a.za = true);
				return a;
			}

			static Ga(a) {
				a.An = class_m.Ef;
				if (null == a.ya)
					throw class_v.B('Class doesn\'t have a config');
				a.prototype.Ff = a.ya;
				class_m.cn.set(class_m.Ef, a);
				class_m.Ef++;
			}

			static pj(a, b) {
				let c = class_w.$m(a).An;
				if (null == c)
					throw class_v.B('Tried to pack unregistered action');
				b.m(c);
				a.ua(b);
			}

			static mh(a) {
				var b = a.C();
				b = Object.create(class_m.cn.get(b).prototype);
				b.Dc = 0;
				b.lb = 0;
				b.va(a);
				return b;
			}
		}

		class class_Bb {
			static tp() {
				if (null != class_Bb.pi)
					return class_Bb.pi;
				class_Bb.pi = new Promise(function (a, b) {
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
				return class_Bb.pi;
			}
		}

		class class_ba {
			static Ds(a, b) {
				a = class_P.gj(a, b);
				return 8 < a && 14 > a ? true : 32 == a;
			}

			static Xs(a) {
				let b = a.length
					,
					c = 0;
				for (; c < b && class_ba.Ds(a, b - c - 1);)
					++c;
				return 0 < c ? class_P.substr(a, 0, b - c) : a;
			}

			static Gf(a) {
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

		class class_Ra {
			constructor(a, b) {
				this.f = class_x.Fa(class_Ra.O);
				let c = class_x.Da(this.f);
				this.Np = c.get('ok');
				let d = this;
				this.Np.onclick = function () {
					class_H.i(d.Ua);
				}
				;
				this.am = c.get('replay');
				let e = null != b;
				this.am.hidden = !e;
				e && (this.am.onclick = function () {
						class_Ba.km(b);
					}
				);
				c.get('reason').textContent = a;
			}
		}

		class class_Z {
			constructor(a, b, c) {
				this.f = class_x.Fa(class_Z.O);
				var d = class_x.Da(this.f);
				d.get('ok');
				d.get('cancel');
				this.ae = d.get('content');
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
						class_E.i(g.Ua, l);
					}
					;
					d.appendChild(n);
				}
				this.ae.textContent = b;
				e.textContent = a;
			}
		}

		class class_Qa {
		}

		class class_Lb {
			constructor() {
				this.Qb = -1;
				this.Nb = new class_W;
				this.Uc = new class_xc;
				this.f = class_x.Fa(class_Lb.O);
				let a = class_x.Da(this.f);
				this.Sb = new class_cc(a.get('red-score'), 0);
				this.Mb = new class_cc(a.get('blue-score'), 0);
				class_x.replaceWith(a.get('timer'), this.Uc.f);
				class_x.replaceWith(a.get('canvas'), this.Nb.sa);
			}

			D(a) {
				let b = a.M;
				null == b ? this.f.hidden = true : (this.f.hidden = false,
					this.Uc.Ir(60 * a.Ca),
					this.Uc.Hr(b.Lc | 0),
					this.Mb.set(b.Mb),
					this.Sb.set(b.Sb),
					this.Nb.Oc(a, this.Qb));
			}
		}

		class class_yc {
		}

		class class_Tb {
			constructor(a, b) {
				this.Th = null;
				this.j = a;
				null != b && (this.Th = '@' + class_ba.replace(b, ' ', '_'));
			}

			Yi(a) {
				let b = this.j.Oa.Fc
					,
					c = []
					,
					d = 0;
				for (a = a.K; d < a.length;) {
					let e = a[d];
					++d;
					c.push({
						A: e.A,
						aa: e.W
					});
				}
				b.Pj = c;
			}

			vi(a) {
				function b(d) {
					return null == d ? '' : ' by ' + d.A;
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
						fullPlayer: fullPlayer.on,
						team: fullPlayer.ea?.aa,
						position: pos,
						// When a player kicks the ball, it is set to min and decrements every frame. When it reaches 0, the player can kick when kickMana > 0.
						nextKickIn: fullPlayer.Xc,
						// This equals to rate * burst. When the player kicks the ball, burst is subtracted from it, and it increments every frame.
						// When it goes below 0, the player can't kick.
						kickRateBurst: fullPlayer.Bc,
						isBlinking: fullPlayer.Yb,
						id: fullPlayer.W,
						inputKey: fullPlayer.nb,
						name: fullPlayer.A,
						ping: fullPlayer.yb,
						u1: fullPlayer.ah,
						flag: fullPlayer.country,
						desynchronized: fullPlayer.Rd,
						avatarOverride: fullPlayer.Qd,
						avatar: fullPlayer.Zb,
						order: fullPlayer.Lb,
						admin: fullPlayer.cb
					};
				}

				this.Yi(a);
				let c = this;
				a.Gl = function (d) {
					c.j.Oa.Hb('' + d.A + ' has joined');
					class_p.Na.hd(class_p.Na.np);
					c.Yi(a);

					if (window.parent.g.onPlayerJoin != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerJoin(player);
					}
				}
				;
				a.Hl = function (d, e, f, g) {
					class_E.i(c.$p, d.W);

					if (window.parent.g.onPlayerLeave != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerLeave(player);
					}

					let noticeText;
					if (null == e) {
						noticeText = '' + d.A + ' has left';
					}
					else {
						class_Zb.i(c.Zp, d.W, e, null != g ? g.A : null, f);
						noticeText = '' + d.A + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' : '');

						if (window.parent.g.onPlayerKicked != null) {
							const player = getPlayerObject(d);
							const byPlayer = getPlayerObject(g);
							window.parent.g.onPlayerKicked(player, e, f, byPlayer);
						}
					}
					c.j.Oa.Hb(noticeText);
					class_p.Na.hd(class_p.Na.rp);
					c.Yi(a);
				}
				;
				a.El = function (d, e) {
					let f = null != c.Th && -1 != e.indexOf(c.Th);
					c.j.Oa.ca('' + d.A + ': ' + e, f ? 'highlight' : null);
					class_p.l.Cm.H() && f ? class_p.Na.hd(class_p.Na.Jk) : class_p.l.Mi.H() && class_p.Na.hd(class_p.Na.Zj);

					if (window.parent.g.onPlayerChat != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerChat(player, e);
					}
				}
				;
				a.hm = function (d, e, f, g) {
					c.j.Oa.Cp(d, e, f);
					if (class_p.l.Mi.H())
						switch (g) {
							case 1:
								class_p.Na.hd(class_p.Na.Zj);
								break;
							case 2:
								class_p.Na.hd(class_p.Na.Jk);
						}

					if (window.parent.g.onAnnouncement != null) {
						window.parent.g.onAnnouncement(d, e, f, g);
					}
				}
				;
				a.ni = function (byFullPlayer) {
					class_p.Na.hd(class_p.Na.pp);

					if (window.parent.g.onPlayerBallKick != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onPlayerBallKick(byPlayer);
					}
				}
				;
				a.Si = function (d) {
					class_p.Na.hd(class_p.Na.Vo);
					let e = c.j.fb.Nb.Ad;
					e.Qa(d == class_u.ga ? e.Rq : e.On);

					if (window.parent.g.onTeamGoal != null) {
						const teamId = d.aa;
						window.parent.g.onTeamGoal(teamId);
					}
				}
				;
				a.Ti = function (d) {
					let e = c.j.fb.Nb.Ad;
					e.Qa(d == class_u.ga ? e.Sq : e.Pn);
					c.j.Oa.Hb('' + d.A + ' team won the match');

					if (window.parent.g.onTeamVictory != null) {
						const teamId = d.A;
						window.parent.g.onTeamVictory(teamId);
					}
				}
				;
				a.zl = function (d, e, f) {
					e && !f && c.j.Oa.Hb('Game paused' + b(d));

					if (window.parent.g.onGamePause != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onGamePause(byPlayer, e);
					}
				}
				;
				a.Ui = function () {
					let d = c.j.fb.Nb.Ad;
					d.Qa(d.Pr);

					if (window.parent.g.onTimeIsUp != null) {
						window.parent.g.onTimeIsUp();
					}
				}
				;
				a.xq = () => {
					if (window.parent.g.onPositionsReset != null) {
						window.parent.g.onPositionsReset();
					}
				}
				;
				a.Pi = function (d) {
					c.j.te(false);
					c.j.fb.Nb.Ad.$n();
					c.j.Oa.Hb('Game started' + b(d));

					if (window.parent.g.onGameStart != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onGameStart(byPlayer);
					}
				}
				;
				a.Cf = function (d) {
					null != d && c.j.Oa.Hb('Game stopped' + b(d));

					if (window.parent.g.onGameStop != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onGameStop(byPlayer);
					}
				}
				;
				a.Ni = function (d, e) {
					let f = null;
					if (!e.Xe()) {
						f = class_ba.bh(e.bk(), 8);
						c.j.Oa.Hb('Stadium "' + e.A + '" (' + f + ') loaded' + b(d));
					}

					if (window.parent.g.onStadiumChange != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onStadiumChange(byPlayer, e.A, f);
					}
				}
				;
				a.Fl = function (d) {
					c.j.Oa.Hb('' + d.A + ' ' + (d.Rd ? 'has desynchronized' : 'is back in sync'));

					if (window.parent.g.onPlayerDesyncChange != null) {
						const player = getPlayerObject(d);
						window.parent.g.onPlayerDesyncChange(player, d.Rd);
					}
				}
				;
				a.Kl = function (d, e, f) {
					null != a.M && c.j.Oa.Hb('' + e.A + ' was moved to ' + f.A + b(d));

					if (window.parent.g.onPlayerTeamChange != null) {
						const player = getPlayerObject(e);
						const byPlayer = getPlayerObject(d);
						window.parent.g.onPlayerTeamChange(player, byPlayer, f.aa);
					}
				}
				;
				a.mi = function (d, e) {
					let f = e.A;
					d = (e.cb ? '' + f + ' was given admin rights' : '' + f + '\'s admin rights were taken away') + b(d);
					c.j.Oa.Hb(d);

					if (window.parent.g.onPlayerAdminChange != null) {
						const player = getPlayerObject(e);
						const byPlayer = getPlayerObject(d);
						window.parent.g.onPlayerAdminChange(player, byPlayer, e.cb);
					}
				}
				;
				a.Jl = function (d, e) {
					c.j.fb.Nb.bp(d, e);

					if (window.parent.g.onChatIndicatorStateChange != null) {
						const player = getPlayerObject(d);
						const chatIndicatorShown = e === 0;
						window.parent.g.onChatIndicatorStateChange(player, chatIndicatorShown);
					}
				}
				;
				a.Rk = function (d, e, f, g) {
					c.j.Oa.Hb('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(d));

					if (window.parent.g.onKickRateLimitSet != null) {
						const byPlayer = getPlayerObject(d);
						window.parent.g.onKickRateLimitSet(e, f, g, byPlayer);
					}
				};
				// Invoking global fields end
			}

			bs(a) {
				a.Gl = null;
				a.Hl = null;
				a.El = null;
				a.hm = null;
				a.ni = null;
				a.Si = null;
				a.Ti = null;
				a.zl = null;
				a.Ui = null;
				a.Pi = null;
				a.Cf = null;
				a.Ni = null;
				a.Fl = null;
				a.Kl = null;
				a.mi = null;
				a.Jl = null;
				a.Rk = null;
			}
		}

		class class_za {
			constructor() {
				this.h = this.w = 63;
				this.S = 16777215;
				this.Ba = .99;
				this.ba = 1;
				this.o = .5;
				this.$ = 10;
				this.oa = new class_O(0, 0);
				this.F = new class_O(0, 0);
				this.a = new class_O(0, 0);
			}

			fa(a) {
				var b = this.a;
				a.u(b.x);
				a.u(b.y);
				b = this.F;
				a.u(b.x);
				a.u(b.y);
				b = this.oa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.$);
				a.u(this.o);
				a.u(this.ba);
				a.u(this.Ba);
				a.sb(this.S);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				var b = this.a;
				b.x = a.v();
				b.y = a.v();
				b = this.F;
				b.x = a.v();
				b.y = a.v();
				b = this.oa;
				b.x = a.v();
				b.y = a.v();
				this.$ = a.v();
				this.o = a.v();
				this.ba = a.v();
				this.Ba = a.v();
				this.S = a.gb();
				this.h = a.N();
				this.w = a.N();
			}

			Ep() {
				let a = new class_ua;
				this.Lk(a);
				return a;
			}

			Lk(a) {
				var b = a.a
					,
					c = this.a;
				b.x = c.x;
				b.y = c.y;
				b = a.F;
				c = this.F;
				b.x = c.x;
				b.y = c.y;
				b = a.oa;
				c = this.oa;
				b.x = c.x;
				b.y = c.y;
				a.$ = this.$;
				a.o = this.o;
				a.ba = this.ba;
				a.Ba = this.Ba;
				a.S = this.S;
				a.h = this.h;
				a.w = this.w;
			}
		}

		class class_wa {
			constructor(a) {
				this.il = this.hl = this.kl = null;
				this.fb = new class_Lb;
				this.kd = false;
				this.Bf = new class_ub;
				this.Oa = new class_cb;
				this.Va = new class_Db(a);
				this.fb.Qb = a;
				this.f = class_x.Fa(class_wa.O);
				a = class_x.Da(this.f);
				this.Yr = a.get('top-section');
				this.rf = a.get('popups');
				this.rf.style.display = 'none';
				a.get('gameplay').appendChild(this.fb.f);
				class_x.replaceWith(a.get('chatbox'), this.Oa.f);
				class_x.replaceWith(a.get('stats'), this.Bf.f);
				this.fi = a.get('menu');
				let b = this;
				this.fi.onclick = function () {
					b.te(!b.kd);
					b.fi.blur();
				}
				;
				a.get('settings').onclick = function () {
					let c = new class_la;
					c.pb = function () {
						b.bb(null);
					}
					;
					b.bb(c.f);
				}
				;
				this.Va.je = function () {
					let c = new class_Kb;
					c.pb = function (d) {
						b.bb(null);
						d && class_H.i(b.je);
					}
					;
					b.bb(c.f);
				}
				;
				this.Va.jq = function () {
					let c = new class_wb;
					c.gi = function () {
						b.bb(null);
					}
					;
					c.wg = function (d) {
						class_E.i(b.wg, d);
						b.bb(null);
					}
					;
					c.ji = function (d) {
						d = new class_Z('Error loading stadium', d, ['Ok']);
						d.Ua = function () {
							b.bb(null);
						}
						;
						b.bb(d.f);
					}
					;
					b.bb(c.f);
				};
			}

			yr(a) {
				this.il != a && (this.il = a,
					this.f.style.setProperty('--chat-opacity', '' + a));
			}

			xr(a) {
				this.hl != a && (this.hl = a,
					this.f.classList.toggle('chat-bg-full', a));
			}

			Gr(a) {
				this.kl != a && (this.kl = a,
					this.fb.f.classList.toggle('restricted', a));
			}

			D(a) {
				null == a.U.M && this.te(true);
				this.kd && this.Va.D(a.U, a.U.na(a.yc));
				class_H.i(this.Ll);
				this.fi.disabled = null == a.U.M;
				let b = class_p.l.Db.H()
					,
					c = this.fb.Nb;
				c.qe = class_p.l.Ai.H();
				this.yr(class_p.l.zh.H());
				this.xr('full' == class_p.l.$j.H());
				this.Gr(0 == b);
				let d = this.Oa.f.getBoundingClientRect().height;
				if (0 == b) {
					c.Dg = 1;
					c.Kd = 0;
					c.Rg = 0;
					this.fb.Nb.vh = 0;
					this.fb.f.style.paddingBottom = d + 'px';
				}
				else {
					c.Rg = 35;
					// Mofified zoom
					c.Kd = 0;
					c.Dg = 1 + .25 * (b - 1);
					this.fb.Nb.vh = d * window.devicePixelRatio;
					this.fb.f.style.paddingBottom = '0';
				}
				a = a.ag();
				this.fb.D(a);
				class_p.Na.gk.bt(a);
			}

			te(a) {
				this.kd != a && (this.kd = a,
					this.f.classList.toggle('showing-room-view', this.kd),
					this.kd ? this.Yr.appendChild(this.Va.f) : this.Va.f.remove());
			}

			mp() {
				return null != class_wa.wq;
			}

			bb(a, b) {
				class_x.If(this.rf);
				class_wa.wq = a;
				null != a ? (this.rf.style.display = 'flex',
					this.rf.appendChild(a),
					this.Ll = b) : (this.rf.style.display = 'none',
					this.Ll = null);
			}
		}

		class class_fc {
			constructor(a, b) {
				this.Pj = [];
				this.Uq = /[#@][^\s@#]*$/;
				this.Pb = a;
				this.cq = b;
				a.hidden = true;
			}

			Sh() {
				this.Zi(null);
			}

			Un(a, b) {
				b = this.Uq.exec(class_P.substr(a, 0, b));
				if (null != b) {
					var c = b[0]
						,
						d = class_P.substr(c, 1, null).split('')
						,
						e = class_fc.Io
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
					this.Ok = '#' == c.charAt(0);
					this.wi = b.index;
					this.gr = c.length;
					this.$l = a;
					a = function (l) {
						l = k.exec(l.A);
						return null == l ? -1 : l.index + l[0].length;
					}
					;
					b = [];
					c = 0;
					for (d = this.Pj; c < d.length;)
						e = d[c],
							++c,
							f = a(e),
						0 <= f && b.push({
							rn: f,
							item: e
						});
					b.sort(function (l, n) {
						return l.rn - n.rn;
					});
					this.Zi(b);
				}
				else
					this.Zi(null);
			}

			wk(a) {
				a = this.Ok ? '#' + a.aa : '@' + class_ba.replace(a.A, ' ', '_');
				this.cq(class_P.substr(this.$l, 0, this.wi) + a + ' ' + class_P.substr(this.$l, this.wi + this.gr, null), this.wi + a.length + 1);
			}

			Zi(a) {
				var b = null != a && 0 != a.length;
				this.Pb.hidden || class_x.If(this.Pb);
				this.ad = null;
				this.Pb.hidden = !b;
				if (b) {
					var c = this;
					b = [];
					for (var d = 0; d < a.length;) {
						var e = a[d++];
						let f = window.document.createElement('div')
							,
							g = e.item;
						e = g.A;
						this.Ok && (e = '(' + g.aa + ') ' + e);
						f.textContent = e;
						this.Pb.appendChild(f);
						f.onclick = function () {
							c.wk(g);
						}
						;
						b.push({
							item: g,
							Ia: f
						});
					}
					this.ad = b;
					this.ad[0].Ia.classList.toggle('selected', true);
					this.Ac = 0;
				}
			}

			Yj(a) {
				if (null != this.ad) {
					var b = this.Ac;
					this.Ac += a;
					a = this.ad.length - 1;
					0 > this.Ac ? this.Ac = a : this.Ac > a && (this.Ac = 0);
					a = this.ad[this.Ac];
					b != this.Ac && (a.Ia.classList.toggle('selected', true),
						this.ad[b].Ia.classList.toggle('selected', false));
					a = a.Ia;
					b = a.offsetTop;
					a = b + a.offsetHeight;
					var c = this.Pb.scrollTop + this.Pb.clientHeight;
					b < this.Pb.scrollTop ? this.Pb.scrollTop = b : a > c && (this.Pb.scrollTop = a - this.Pb.clientHeight);
				}
			}

			Do() {
				null != this.ad && (this.wk(this.ad[this.Ac].item),
					this.Sh());
			}

			static Io(a) {
				return -1 != '.$^{[(|)*+?\\'.indexOf(a) ? '\\' + a : a;
			}
		}

		class class_xc {
			constructor() {
				this.Ca = 0;
				this.sk = this.tk = false;
				this.Se = 0;
				this.f = window.document.createElement('div');
				this.f.className = 'game-timer-view';
				this.f.appendChild(this.oq = this.be('OVERTIME!', 'overtime'));
				this.f.appendChild(this.Lp = this.be('0', 'digit'));
				this.f.appendChild(this.Kp = this.be('0', 'digit'));
				this.f.appendChild(this.be(':', null));
				this.f.appendChild(this.qr = this.be('0', 'digit'));
				this.f.appendChild(this.pr = this.be('0', 'digit'));
			}

			be(a, b) {
				let c = window.document.createElement('span');
				c.textContent = a;
				c.className = b;
				return c;
			}

			Hr(a) {
				if (a != this.Se) {
					let b = a % 60
						,
						c = a / 60 | 0;
					this.pr.textContent = '' + b % 10;
					this.qr.textContent = '' + (b / 10 | 0) % 10;
					this.Kp.textContent = '' + c % 10;
					this.Lp.textContent = '' + (c / 10 | 0) % 10;
					this.Se = a;
				}
				this.Xl();
				this.Yl();
			}

			Ir(a) {
				this.Ca = a;
				this.Xl();
				this.Yl();
			}

			Xl() {
				this.Dr(0 != this.Ca && this.Se > this.Ca);
			}

			Yl() {
				this.Jr(this.Se < this.Ca && this.Se > this.Ca - 30);
			}

			Dr(a) {
				a != this.sk && (this.oq.className = a ? 'overtime on' : 'overtime',
					this.sk = a);
			}

			Jr(a) {
				a != this.tk && (this.f.className = a ? 'game-timer-view time-warn' : 'game-timer-view',
					this.tk = a);
			}
		}

		class class_gc {
		}

		class class_Ob {
			constructor() {
			}

			Xj() {
				this.A = class_ha.Vc(this.A, 40);
				this.tb = class_ha.Vc(this.tb, 3);
			}

			fa(a) {
				this.Xj();
				a.Sa = true;
				a.Wb(this.Pd);
				a.Wm(this.A);
				a.Wm(this.tb);
				a.aj(this.Ic);
				a.aj(this.Kc);
				a.m(this.Jb ? 1 : 0);
				a.m(this.ef);
				a.m(this.K);
				a.Sa = false;
			}

			ka(a) {
				a.Sa = true;
				this.Pd = a.Rb();
				this.A = a.Sl();
				this.tb = a.Sl();
				this.Ic = a.ri();
				this.Kc = a.ri();
				this.Jb = 0 != a.C();
				this.ef = a.C();
				this.K = a.C();
				a.Sa = false;
				if (30 < this.K || 30 < this.ef)
					throw class_v.B(null);
				this.Xj();
			}
		}

		class class_cb {
			constructor() {
				this.f = class_x.Fa(class_cb.O);
				let a = class_x.Da(this.f);
				this.xc = a.get('log');
				this.$h = a.get('log-contents');
				this.$a = a.get('input');
				this.$a.maxLength = 140;
				let b = this;
				a.get('drag').onmousedown = function (c) {
					function d(h) {
						h.preventDefault();
						class_p.l.ak.Ha(hc(hc(e + (f - h.y))));
						b.Lg(Nb());
					}

					b.f.classList.add('dragging');
					let e = Nb()
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
				this.Fc = new class_fc(a.get('autocompletebox'), function (c, d) {
						b.$a.value = c;
						b.$a.setSelectionRange(d, d);
					}
				);
				this.$a.onkeydown = function (c) {
					switch (c.keyCode) {
						case 9:
							c.preventDefault();
							b.Fc.Pb.hidden ? b.$a.blur() : b.Fc.Do();
							break;
						case 13:
							null != b.sl && '' != b.$a.value && b.sl(b.$a.value);
							b.$a.value = '';
							b.$a.blur();
							break;
						case 27:
							b.Fc.Pb.hidden ? (b.$a.value = '',
								b.$a.blur()) : b.Fc.Sh();
							break;
						case 38:
							b.Fc.Yj(-1);
							break;
						case 40:
							b.Fc.Yj(1);
					}
					c.stopPropagation();
				}
				;
				this.$a.onfocus = function () {
					null != b.qg && b.qg(true);
					let c = hc(class_p.l.yh.H());
					Nb() < c && b.Lg(c);
				}
				;
				this.$a.onblur = function () {
					null != b.qg && b.qg(false);
					b.Fc.Sh();
					b.Lg(Nb());
				}
				;
				this.$a.oninput = function () {
					b.Fc.Un(b.$a.value, b.$a.selectionStart);
				}
				;
				this.Lg(Nb());
			}

			Lg(a) {
				this.xc.scrollTop = this.xc.Ys;
				this.f.style.height = '' + a + 'px';
			}

			Cp(a, b, c) {
				let d = window.document.createElement('p');
				d.className = 'announcement';
				d.textContent = a;
				0 <= b && (d.style.color = class_W.nc(b));
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
				this.Yk(d);
			}

			Yk(a) {
				var b = this.xc.clientHeight;
				b = this.xc.scrollTop + b - this.xc.scrollHeight >= .5 * -b || !class_cb.lp(this.xc);
				this.$h.appendChild(a);
				b && (this.xc.scrollTop = this.xc.Ys);
				for (a = b ? 50 : 100; this.$h.childElementCount > a;)
					this.$h.firstElementChild.remove();
			}

			ca(a, b) {
				let c = window.document.createElement('p');
				null != b && (c.className = b);
				c.textContent = a;
				this.Yk(c);
			}

			Hb(a) {
				this.ca(a, 'notice');
			}

			static lp(a) {
				return a.parentElement.querySelector(':hover') == a;
			}
		}

		class class_Jb {
			constructor() {
				this.S = 0;
				this.ue = 1 / 0;
				this.Ib = this.fc = 100;
				this.de = this.ee = 0;
			}

			fa(a) {
				a.m(this.de);
				a.m(this.ee);
				a.u(this.Ib);
				a.u(this.fc);
				a.u(this.ue);
				a.P(this.S);
			}

			ka(a) {
				this.de = a.C();
				this.ee = a.C();
				this.Ib = a.v();
				this.fc = a.v();
				this.ue = a.v();
				this.S = a.N();
			}

			D(a) {
				var b = a[this.de];
				a = a[this.ee];
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
						if (0 == 0 * this.ue)
							d = this.ue * f * .5,
								e *= d,
								c *= d,
								h = d = b.F,
								b = b.ba,
								d.x = h.x + e * b,
								d.y = h.y + c * b,
								d = b = a.F,
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
							f = b.F;
							g = a.F;
							f = e * (f.x - g.x) + c * (f.y - g.y);
							0 >= f * h && (d *= f,
								b = h = b.F,
								h.x = b.x - e * d,
								h.y = b.y - c * d,
								a = b = a.F,
								d = f - d,
								b.x = a.x + e * d,
								b.y = a.y + c * d);
						}
					}
				}
			}
		}

		class class_dc {
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

		class class_mc {
			constructor() {
			}
		}

		class class_ab extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.fo(this.Yg);
			}

			ua(a) {
				a.kb(this.Yg.byteLength);
				a.Tg(this.Yg);
			}

			va(a) {
				this.Yg = a.Ql(a.Ab());
			}
		}

		class class_oa extends class_V {
			constructor(a) {
				class_V.xb ? super() : (class_V.xb = true,
					super(),
					class_V.xb = false,
					this.Xa(a));
			}

			Xa(a) {
				this.Wi = new class_$a;
				this.ze = this.ec = 0;
				this.se = new class_$a;
				this.yc = this.dc = this.yd = 0;
				this.Ec = .06;
				this.oh = 16.666666666666668;
				this.Of = 120;
				super.Xa(a);
			}

			ra() {
				throw class_v.B('missing implementation');
			}

			ag() {
				throw class_v.B('missing implementation');
			}

			D() {
				throw class_v.B('missing implementation');
			}

			Hj(a) {
				let b = this.se.list
					,
					c = 0
					,
					d = b.length
					,
					e = 0;
				for (; e < a;) {
					for (++e; c < d;) {
						let f = b[c];
						if (f.lb != this.Z)
							break;
						f.apply(this.U);
						null != this.hc && this.hc(f);
						this.ec++;
						++c;
					}
					this.U.D(1);
					this.ze += this.ec;
					this.ec = 0;
					this.Z++;
				}
				for (; c < d;) {
					a = b[c];
					if (a.lb != this.Z || a.Dc != this.ec)
						break;
					a.apply(this.U);
					null != this.hc && this.hc(a);
					this.ec++;
					++c;
				}
				b.splice(0, c);
			}

			Jg(a) {
				a.lb == this.Z && a.Dc <= this.ec ? (a.Dc = this.ec++,
					a.apply(this.U),
				null != this.hc && this.hc(a)) : this.se.dn(a);
			}

			Gk(a, b) {
				if (0 >= a)
					return this.U;
				a > this.Of && (a = this.Of);
				class_va.Cc++;
				let c = this.U.uc();
				null != b ? (this.Wi.ts(this.se, b),
					b = this.Wi) : b = this.se;
				b = b.list;
				let d = 0
					,
					e = b.length
					,
					f = this.Z
					,
					g = a | 0
					,
					h = f + g;
				for (; f <= h;) {
					for (; d < e;) {
						let k = b[d];
						if (k.lb > f)
							break;
						k.Ff.za && k.apply(c);
						++d;
					}
					c.D(f != h ? 1 : a - g);
					++f;
				}
				for (a = this.Wi.list; 0 < a.length;)
					a.pop();
				return c;
			}

			zr(a) {
				300 < a && (a = 300);
				0 > a && (a = 0);
				this.dc = this.Ec * a | 0;
			}

			tm(a) {
				this.yd = this.Ec * (-200 > a ? -200 : 1E3 < a ? 1E3 : a);
			}
		}

		class class_Ea extends class_oa {
			constructor(a, b) {
				class_V.xb = true;
				super();
				class_V.xb = false;
				this.Xa(a, b);
			}

			Xa(a, b) {
				this.Ii = [];
				this.ui = [];
				this.Cg = new class_$a;
				this.Mp = 1;
				this.wd = this.Nm = 0;
				this.Vi = new class_Xb(50);
				this.Ag = new class_Xb(50);
				this.zn = 1E3;
				this.pk = '';
				super.Xa(b.state);
				this.Wh = b.ct;
				this.Re = b.ws;
				let c = null
					,
					d = this;
				c = function (e) {
					d.Af(0);
					let f = class_A.ia();
					f.Wb(b.version);
					f.Eb(b.password);
					d.rc = new class_ac(b.nj, b.iceServers, a, class_yc.channels, f, b.un);
					d.rc.rh = e;
					d.rc.Gd = function (h) {
						d.rc = null;
						d.pa = h;
						h.tg = function (k) {
							k = new class_K(new DataView(k));
							d.Gq(k);
						}
						;
						h.lf = function () {
							3 != d.wd && class_E.i(d.mf, ia.Mf('Connection closed'));
							d.ja();
						}
						;
						h = window.setTimeout(function () {
							class_E.i(d.mf, ia.Mf('Game state timeout'));
							d.ja();
						}, 1E4);
						d.xe = h;
						d.Af(2);
					}
					;
					d.rc.tl = function () {
						d.Af(1);
					}
					;
					let g = false;
					d.rc.ll = function () {
						g = true;
					}
					;
					d.rc.gd = function (h) {
						if (!e && 1 == d.wd && g)
							class_H.i(d.eq),
								c(true);
						else {
							let k = class_ac.Qo(h);
							switch (h.mb) {
								case 0:
									h = ia.Ge;
									break;
								case 1:
									h = ia.He(h.code);
									break;
								case 2:
									h = ia.Fe;
									break;
								default:
									h = ia.Mf(k);
							}
							class_E.i(d.mf, h);
							d.ja(k);
						}
					};
				}
				;
				c(null != b.qn && b.qn);
			}

			ja(a) {
				null != this.rc && (this.rc.gd = null,
					this.rc.Tn(),
					this.rc = null);
				window.clearTimeout(this.xe);
				null != this.pa && (this.pa.lf = null,
					this.pa.ja(),
					this.pa = null);
				this.pk = null == a ? 'Connection closed' : a;
				this.Af(4);
			}

			Af(a) {
				this.wd != a && (this.wd = a,
				null != this.Hd && this.Hd(a));
			}

			Dd() {
				return 3 == this.wd;
			}

			D() {
				this.Dd() && window.performance.now() - this.Nm > this.zn && this.Ei();
				this.bd = window.performance.now() * this.Ec + this.Vi.hh() - this.Z;
				this.Wj();
			}

			ag() {
				return this.Dd() ? (0 > this.dc && (this.dc = 0),
					this.Gk(window.performance.now() * this.Ec + this.Vi.hh() - this.Z + this.dc + this.yd, this.Cg)) : this.U;
			}

			Wj() {
				0 > this.bd && (this.bd = 0);
				this.bd > this.Of && (this.bd = this.Of);
			}

			Gq(a) {
				switch (a.C()) {
					case 0:
						this.Dq(a);
						break;
					case 1:
						this.Cq(a);
						break;
					case 2:
						this.zq(a);
						break;
					case 3:
						this.Iq(a);
						break;
					case 4:
						this.Fq(a);
						break;
					case 5:
						this.Bq(a);
						break;
					case 6:
						this.Hq(a);
				}
			}

			Dq(a) {
				a = a.rb(a.Ab());
				let b = Promise.resolve(null);
				null != this.Re && (b = this.Re.Lr(a));
				let c = this;
				b.catch(function () {
					return null;
				}).then(function (d) {
					c.vr(d);
				});
			}

			Cq(a) {
				a = pako.inflateRaw(a.rb());
				a = new class_K(new DataView(a.buffer, a.byteOffset, a.byteLength));
				this.yc = a.Rb();
				this.Z = a.gb();
				this.ze = a.gb();
				this.ec = a.Ab();
				this.bd = 10;
				for (this.U.ka(a); 0 < a.s.byteLength - a.a;)
					this.Jg(this.Um(a));
				window.clearTimeout(this.xe);
				this.Af(3);
			}

			vr(a) {
				let b = class_A.ia();
				b.m(0);
				null != a ? (b.kb(a.byteLength),
					b.Xb(a)) : b.kb(0);
				b.kb(this.Wh.byteLength);
				b.Tg(this.Wh);
				this.Ub(b);
				this.Wh = null;
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.pa.Ub(b, a);
			}

			Um(a) {
				let b = a.gb()
					,
					c = a.Ab()
					,
					d = a.Rb()
					,
					e = a.gb();
				a = class_m.mh(a);
				a.R = d;
				a.Ae = e;
				a.lb = b;
				a.Dc = c;
				return a;
			}

			zq(a) {
				a = this.Um(a);
				this.Jg(a);
				a.R == this.yc && this.Cg.Us(a.Ae);
				this.Ol();
			}

			Hq(a) {
				a = class_m.mh(a);
				a.R = 0;
				a.Ae = 0;
				a.apply(this.U);
				null != this.hc && this.hc(a);
			}

			Iq(a) {
				let b = a.gb();
				a = a.gb();
				this.ui.push({
					frame: b,
					Ef: a
				});
				this.Ol();
			}

			Ol() {
				if (3 == this.wd) {
					for (var a = 0, b = this.ui; a < b.length;) {
						var c = b[a];
						++a;
						c.frame <= this.Z || c.Ef == this.ze + this.ec + this.se.us(c.frame) && this.In(c.frame - this.Z);
					}
					a = 0;
					b = this.ui;
					c = 0;
					for (var d = b.length; c < d;) {
						let e = b[c++];
						e.frame > this.Z && (b[a] = e,
							++a);
					}
					for (; b.length > a;)
						b.pop();
					this.Cg.Ts(this.Z);
				}
			}

			Bq(a) {
				let b = 0 != a.C()
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

			Fq(a) {
				var b = a.v();
				a = a.v();
				let c = window.performance.now() - a;
				this.Vi.add(b - a * this.Ec);
				this.Ag.add(c);
				let d = b = 0
					,
					e = this.Ii;
				for (; d < e.length;) {
					let f = e[d];
					++d;
					if (f > a)
						break;
					f < a ? class_E.i(this.ql, -1) : class_E.i(this.ql, c);
					++b;
				}
				this.Ii.splice(0, b);
			}

			Ei() {
				let a = window.performance.now();
				this.Nm = a;
				this.Ii.push(a);
				let b = this.Ag.hh() | 0
					,
					c = class_A.ia();
				c.m(2);
				c.u(a);
				c.kb(b);
				this.Ub(c, 2);
			}

			In(a) {
				this.Hj(a);
				this.bd -= a;
				this.Wj();
			}

			ra(a) {
				if (3 == this.wd) {
					var b = this.Mp++
						,
						c = 0;
					0 > this.dc && (this.dc = 0);
					a.Ff.delay && (c = this.Z + (this.bd | 0) + this.dc);
					var d = class_A.ia();
					d.m(1);
					d.sb(c);
					d.sb(b);
					class_m.pj(a, d);
					this.Ub(d);
					a.Ff.za && (a.Ae = b,
						a.R = this.yc,
						a.lb = c,
						this.Cg.dn(a));
				}
			}

			static Ah(a) {
				switch (a.mb) {
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

		class class_Pb extends class_oa {
			constructor(a) {
				class_V.xb = true;
				super();
				class_V.xb = false;
				this.Xa(a);
			}

			Xa(a) {
				this.Sj = new Map;
				this.Jb = null;
				this.ng = 32;
				this.Qe = new Map;
				this.cc = [];
				this.Bi = 4;
				this.Zn = 600;
				super.Xa(a.state);
				this.Gp = a.nj;
				this.js = a.version;
				this.Hp = 1;
				this.Tk = this.yc = 0;
				this.Qi = window.performance.now();
				this.Mc = new class_Eb(this.Gp, a.iceServers, class_yc.channels, a.un);
				this.Mc.ek = M(this, this.ap);
				let b = this;
				this.Mc.ol = function (c) {
					b.Xp(c);
				}
				;
				this.Mc.sg = function (c) {
					class_E.i(b.sg, c);
				}
				;
				this.Mc.nf = function (c, d) {
					null != b.nf && b.nf(c, d);
				};
			}

			ja() {
				this.Mc.ja();
				let a = 0
					,
					b = this.cc;
				for (; a < b.length;) {
					let c = b[a++].pa;
					c.lf = null;
					c.tg = null;
					c.ja();
				}
			}

			Go(a, b, c, d) {
				let e = this.Qe.get(a);
				if (null != e) {
					if (d) {
						let f = this.Mc.Mn(e.pa);
						this.Sj.set(a, f);
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

			$d() {
				this.Mc.$d();
				this.Sj.clear();
			}

			Ki(a) {
				this.Mc.Ki(a);
			}

			Ji(a) {
				this.Mc.Ji(a);
			}

			ra(a) {
				a.R = 0;
				let b = this.Z + this.Bi + this.dc;
				a.Ff.delay || (b = this.Z);
				a.lb = b;
				this.Jg(a);
				this.Hi();
				0 < this.cc.length && this.Kg(this.ci(a), 1);
			}

			D() {
				let a = ((window.performance.now() - this.Qi) * this.Ec | 0) - this.Z;
				0 < a && this.Hj(a);
				7 <= this.Z - this.Uk && this.Hi();
				this.Z - this.Tk >= this.Zn && (this.Hi(),
					this.tr());
			}

			ag() {
				0 > this.dc && (this.dc = 0);
				return this.Gk((window.performance.now() - this.Qi) * this.Ec - this.Z + this.Bi + this.dc + this.yd);
			}

			ap(a, b) {
				if (this.cc.length >= this.ng)
					return db.Nf(4100);
				try {
					if (b.Rb() != this.js)
						throw class_v.B(null);
				}
				catch (c) {
					return db.Nf(4103);
				}
				try {
					let c = b.zb();
					if (null != this.Jb && c != this.Jb)
						throw class_v.B(null);
				}
				catch (c) {
					return db.Nf(4101);
				}
				return db.zj;
			}

			Xp(a) {
				if (this.cc.length >= this.ng)
					a.ja();
				else {
					var b = new class_pc(a);
					this.cc.push(b);
					var c = this;
					a.tg = function (d) {
						d = new class_K(new DataView(d));
						c.Aq(d, b);
					}
					;
					a.lf = function () {
						class_P.remove(c.cc, b);
						c.Qe.delete(b.aa);
						class_E.i(c.Up, b.aa);
					}
					;
					a = class_A.ia(1 + b.Pe.byteLength);
					a.m(0);
					a.kb(b.Pe.byteLength);
					a.Xb(b.Pe);
					b.Ub(a);
				}
			}

			ci(a) {
				let b = class_A.ia();
				b.m(2);
				this.vl(a, b);
				return b;
			}

			vl(a, b) {
				b.sb(a.lb);
				b.kb(a.Dc);
				b.Wb(a.R);
				b.sb(a.Ae);
				class_m.pj(a, b);
			}

			Hi() {
				if (!(0 >= this.Z - this.Uk) && 0 != this.cc.length) {
					var a = class_A.ia();
					a.m(3);
					a.sb(this.Z);
					a.sb(this.ze);
					this.Kg(a, 2);
					this.Uk = this.Z;
				}
			}

			Kg(a, b) {
				null == b && (b = 0);
				let c = 0
					,
					d = this.cc;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.Gg && e.Ub(a, b);
				}
			}

			ur(a) {
				let b = class_A.ia();
				b.m(1);
				let c = class_A.ia();
				c.Wb(a.aa);
				c.sb(this.Z);
				c.sb(this.ze);
				c.kb(this.ec);
				this.U.fa(c);
				let d = this.se.list
					,
					e = 0
					,
					f = d.length;
				for (; e < f;)
					this.vl(d[e++], c);
				b.Xb(pako.deflateRaw(c.Vb()));
				a.Ub(b);
			}

			tr() {
				this.Tk = this.Z;
				if (0 != this.cc.length) {
					var a = new class_ab;
					a.lb = this.Z;
					a.Dc = this.ec++;
					a.R = 0;
					a.Yg = this.U.No();
					this.Kg(this.ci(a));
				}
			}

			Kq(a, b) {
				let c = a.rb(a.Ab())
					,
					d = a.rb(a.Ab());
				a = b.Pe;
				b.Pe = null;
				let e = this;
				class_T.hs(c, a).catch(function () {
					return null;
				}).then(function (f) {
					try {
						if (-1 != e.cc.indexOf(b)) {
							b.dt = f;
							var g = e.Hp++;
							b.aa = g;
							e.Qe.set(g, b);
							class_La.i(e.Tp, g, new class_K(new DataView(d.buffer, d.byteOffset, d.byteLength), false));
							b.Gg = true;
							e.ur(b);
						}
					}
					catch (h) {
						f = class_v.Kb(h).Fb(),
							e.Hk(b, f);
					}
				});
			}

			Aq(a, b) {
				this.D();
				try {
					if (!b.Uo.Qm())
						throw class_v.B(1);
					let c = a.C();
					if (b.Gg)
						switch (c) {
							case 1:
								this.Lq(a, b);
								break;
							case 2:
								this.Eq(a, b);
								break;
							default:
								throw class_v.B(0);
						}
					else if (0 == c)
						this.Kq(a, b);
					else
						throw class_v.B(0);
					if (0 < a.s.byteLength - a.a)
						throw class_v.B(2);
				}
				catch (c) {
					this.Hk(b, class_v.Kb(c).Fb());
				}
			}

			Hk(a, b) {
				globalScope.console.log(b);
				this.Qe.delete(a.aa);
				class_P.remove(this.cc, a);
				a.Gg && null != this.ml && this.ml(a.aa);
				a.pa.ja();
			}

			Eq(a, b) {
				let c = a.v();
				b.yb = a.Ab();
				a = class_A.ia();
				a.m(4);
				a.u((window.performance.now() - this.Qi) * this.Ec + this.Bi);
				a.u(c);
				b.Ub(a, 2);
			}

			Lq(a, b) {
				let c = a.gb()
					,
					d = a.gb();
				a = class_m.mh(a);
				var e = a.Ff.rj;
				if (null != e) {
					var f = b.Fj.get(e);
					null == f && (f = new class_lb(e.ej, e.xj),
						b.Fj.set(e, f));
					if (!f.Qm())
						throw class_v.B(3);
				}
				e = this.Z;
				f = this.Z + 120;
				c < e ? c = e : c > f && (c = f);
				a.Ae = d;
				a.R = b.aa;
				a.lb = c;
				a.nn(this.U) && (this.Jg(a),
					this.Kg(this.ci(a), 1));
			}
		}

		class class_Qb extends class_oa {
			constructor(a, b, c) {
				class_V.xb = true;
				super();
				class_V.xb = false;
				this.Xa(a, b, c);
			}

			Xa(a, b, c) {
				this.el = [];
				this.Cl = 5;
				this.Nd = -1;
				this.pg = this.Tb = this.Yh = this.Ck = 0;
				super.Xa(b);
				a = new class_K(new DataView(a.buffer), false);
				if (1212305970 != a.gb())
					throw class_v.B('');
				b = a.gb();
				if (c != b)
					throw class_v.B(new class_Rb(b));
				this.tf = a.gb();
				c = pako.inflateRaw(a.rb());
				this.Pc = new class_K(new DataView(c.buffer, c.byteOffset, c.byteLength));
				this.Oq(this.Pc);
				c = this.Pc.rb();
				this.Pc = new class_K(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
				this.yi();
				this.Yh = window.performance.now();
				this.yc = -1;
			}

			Oq(a) {
				let b = a.Rb()
					,
					c = 0
					,
					d = 0;
				for (; d < b;) {
					++d;
					c += a.Ab();
					let e = a.C();
					this.el.push({
						qj: c / this.tf,
						kind: e
					});
				}
			}

			Rl() {
				var a = this.Pc;
				0 < a.s.byteLength - a.a ? (a = this.Pc.Ab(),
					this.pg += a,
					a = this.Pc.Rb(),
					this.og = class_m.mh(this.Pc),
					this.og.R = a) : this.og = null;
			}

			To() {
				return this.Z / this.tf;
			}

			ra() {
			}

			ag() {
				this.D();
				class_va.Cc++;
				let a = this.U.uc();
				a.D(this.Ck);
				return a;
			}

			D() {
				var a = window.performance.now()
					,
					b = a - this.Yh;
				this.Yh = a;
				0 < this.Nd ? (this.Tb += 1E4,
				this.Tb > this.Nd && (this.Tb = this.Nd,
					this.Nd = -1)) : this.Tb += b * this.Cl;
				a = this.tf * this.oh;
				this.Tb > a && (this.Tb = a);
				b = this.Tb * this.Ec;
				a = b | 0;
				for (this.Ck = b - a; this.Z < a;) {
					for (; null != this.og && this.pg == this.Z;)
						b = this.og,
							b.apply(this.U),
						null != this.hc && this.hc(b),
							this.Rl();
					this.Z++;
					this.U.D(1);
				}
			}

			rr(a) {
				this.Nd = a;
				a < this.Tb && this.yi();
			}

			yi() {
				this.pg = 0;
				this.Tb = this.Z = this.Pc.a = 0;
				this.U.ka(this.Pc);
				this.Rl();
			}
		}

		class class_Fa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.R);
				null != b && this.fh != b.Rd && (b.Rd = this.fh,
					class_E.i(a.Fl, b));
			}

			ua(a) {
				a.m(this.fh ? 1 : 0);
			}

			va(a) {
				this.fh = 0 != a.C();
			}

			static ma(a) {
				let b = new class_Fa;
				b.fh = a;
				return b;
			}
		}

		class class_Fb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				0 == this.R && class_Zb.i(a.hm, this.Yc, this.color, this.style, this.tn);
			}

			ua(a) {
				a.oc(class_ha.Vc(this.Yc, 1E3));
				a.P(this.color);
				a.m(this.style);
				a.m(this.tn);
			}

			va(a) {
				this.Yc = a.kc();
				if (1E3 < this.Yc.length)
					throw class_v.B('message too long');
				this.color = a.N();
				this.style = a.C();
				this.tn = a.C();
			}
		}

		class class_Wa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					for (var b = a.na(this.R), c = a.K, d = [], e = 0, f = 0, g = 0; g < c.length;) {
						let h = c[g];
						++g;
						h.ea == class_u.La && d.push(h);
						h.ea == class_u.ga ? ++e : h.ea == class_u.Aa && ++f;
					}
					c = d.length;
					0 != c && (f == e ? 2 > c || (a.Vf(b, d[0], class_u.ga),
						a.Vf(b, d[1], class_u.Aa)) : a.Vf(b, d[0], f > e ? class_u.ga : class_u.Aa));
				}
			}

			ua() {
			}

			va() {
			}
		}

		class class_xa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R) && null == a.M)
					switch (this.uj) {
						case 0:
							var b = this.newValue;
							a.hb = 0 > b ? 0 : 99 < b ? 99 : b;
							break;
						case 1:
							b = this.newValue,
								a.Ca = 0 > b ? 0 : 99 < b ? 99 : b;
					}
			}

			ua(a) {
				a.P(this.uj);
				a.P(this.newValue);
			}

			va(a) {
				this.uj = a.N();
				this.newValue = a.N();
			}

			static ma(a, b) {
				let c = new class_xa;
				c.uj = a;
				c.newValue = b;
				return c;
			}
		}

		class class_Ia extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.na(this.R)
						,
						c = a.na(this.Sd);
					null != c && 0 != c.W && c.cb != this.eh && (c.cb = this.eh,
					null != a.mi && a.mi(b, c));
				}
			}

			ua(a) {
				a.P(this.Sd);
				a.m(this.eh ? 1 : 0);
			}

			va(a) {
				this.Sd = a.N();
				this.eh = 0 != a.C();
			}

			static ma(a, b) {
				let c = new class_Ia;
				c.Sd = a;
				c.eh = b;
				return c;
			}
		}

		class class_Oa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a = a.na(this.R);
				null != a && (a.Zb = this.ac);
			}

			ua(a) {
				a.Eb(this.ac);
			}

			va(a) {
				this.ac = a.zb();
				null != this.ac && (this.ac = class_ha.Vc(this.ac, 2));
			}

			static ma(a) {
				let b = new class_Oa;
				b.ac = a;
				return b;
			}
		}

		class class_fa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.Sd);
				if (null != b) {
					var c = a.na(this.R)
						,
						d = a.Ob(this.R);
					(d = d || b == c && !a.Tc && null == a.M) && a.Vf(c, b, this.oj);
				}
			}

			ua(a) {
				a.P(this.Sd);
				a.m(this.oj.aa);
			}

			va(a) {
				this.Sd = a.N();
				a = a.sf();
				this.oj = 1 == a ? class_u.ga : 2 == a ? class_u.Aa : class_u.La;
			}

			static ma(a, b) {
				let c = new class_fa;
				c.Sd = a;
				c.oj = b;
				return c;
			}
		}

		class class_Ga extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Ob(this.R)) {
					var b = a.na(this.R);
					null == a.M && (a.T = this.Vd,
					null != a.Ni && a.Ni(b, this.Vd));
				}
			}

			ua(a) {
				var b = class_A.ia();
				this.Vd.fa(b);
				b = pako.deflateRaw(b.Vb());
				a.Wb(b.byteLength);
				a.Xb(b);
			}

			va(a) {
				a = pako.inflateRaw(a.rb(a.Rb()));
				this.Vd = class_q.ka(new class_K(new DataView(a.buffer, a.byteOffset, a.byteLength)));
			}

			static ma(a) {
				let b = new class_Ga;
				b.Vd = a;
				return b;
			}
		}

		class class_bb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && this.ea != class_u.La && (a.jb[this.ea.aa] = this.Zg);
			}

			ua(a) {
				a.m(this.ea.aa);
				this.Zg.fa(a);
			}

			va(a) {
				let b = a.sf();
				this.ea = 1 == b ? class_u.ga : 2 == b ? class_u.Aa : class_u.La;
				this.Zg = new class_ya;
				this.Zg.ka(a);
			}
		}

		class class_Ha extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && (a.Tc = this.newValue);
			}

			ua(a) {
				a.m(this.newValue ? 1 : 0);
			}

			va(a) {
				this.newValue = 0 != a.C();
			}

			static ma(a) {
				let b = new class_Ha;
				b.newValue = a;
				return b;
			}
		}

		class class_Da extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = new class_ta;
					b.W = this.W;
					b.A = this.name;
					b.country = this.hj;
					b.Zb = this.Zb;
					a.K.push(b);
					a = a.Gl;
					null != a && a(b);
				}
			}

			ua(a) {
				a.P(this.W);
				a.Eb(this.name);
				a.Eb(this.hj);
				a.Eb(this.Zb);
			}

			va(a) {
				this.W = a.N();
				this.name = a.zb();
				this.hj = a.zb();
				this.Zb = a.zb();
			}

			static ma(a, b, c, d) {
				let e = new class_Da;
				e.W = a;
				e.name = b;
				e.hj = c;
				e.Zb = d;
				return e;
			}
		}

		class class_Hb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a = a.na(this.Ee);
				null != a && 0 == this.R && (a.Qd = this.ac);
			}

			ua(a) {
				a.Eb(this.ac);
				a.P(this.Ee);
			}

			va(a) {
				this.ac = a.zb();
				this.Ee = a.N();
				null != this.ac && (this.ac = class_ha.Vc(this.ac, 2));
			}
		}

		class class_Ya extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.M;
				if (null != b && a.Ob(this.R)) {
					var c = a.na(this.R)
						,
						d = 120 == b.Pa
						,
						e = 0 < b.Pa;
					this.Hf ? b.Pa = 120 : 120 == b.Pa && (b.Pa = 119);
					d != this.Hf && class_jc.i(a.zl, c, this.Hf, e);
				}
			}

			ua(a) {
				a.m(this.Hf ? 1 : 0);
			}

			va(a) {
				this.Hf = 0 != a.C();
			}
		}

		class class_Xa extends class_m {
			constructor() {
				super();
			}

			nn(a) {
				if (null != a.tq) {
					let b = a.na(this.R);
					return null == b ? false : a.tq(b, this.Yc);
				}
				return true;
			}

			apply(a) {
				let b = a.na(this.R);
				null != b && class_La.i(a.El, b, this.Yc);
			}

			ua(a) {
				a.oc(class_ha.Vc(this.Yc, 140));
			}

			va(a) {
				this.Yc = a.kc();
				if (140 < this.Yc.length)
					throw class_v.B('message too long');
			}
		}

		class class_Aa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.R);
				if (null != b) {
					var c = this.input;
					0 == (b.nb & 16) && 0 != (c & 16) && (b.Yb = true);
					b.nb = c;
					null != a.uq && a.uq(b);
				}
			}

			ua(a) {
				a.sb(this.input);
			}

			va(a) {
				this.input = a.gb();
			}
		}

		class class_Ja extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.na(this.R);
				null != b && class_La.i(a.Jl, b, this.vj);
			}

			ua(a) {
				a.m(this.vj);
			}

			va(a) {
				this.vj = a.C();
			}

			static ma(a) {
				let b = new class_Ja;
				b.vj = a;
				return b;
			}
		}

		class class_ma extends class_m {
			constructor() {
				class_m.xb = true;
				super();
				class_m.xb = false;
				this.Xa();
			}

			Xa() {
				this.Xg = false;
				super.Xa();
			}

			apply(a) {
				if (0 != this.W && a.Ob(this.R)) {
					var b = a.na(this.W);
					if (null != b) {
						var c = a.na(this.R);
						class_P.remove(a.K, b);
						null != a.M && class_P.remove(a.M.ta.G, b.J);
						class_Zb.i(a.Hl, b, this.md, this.Xg, c);
					}
				}
			}

			ua(a) {
				null != this.md && (this.md = class_ha.Vc(this.md, 100));
				a.P(this.W);
				a.Eb(this.md);
				a.m(this.Xg ? 1 : 0);
			}

			va(a) {
				this.W = a.N();
				this.md = a.zb();
				this.Xg = 0 != a.C();
				if (null != this.md && 100 < this.md.length)
					throw class_v.B('string too long');
			}

			static ma(a, b, c) {
				let d = new class_ma;
				d.W = a;
				d.md = b;
				d.Xg = c;
				return d;
			}
		}

		class class_Gb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					for (var b = new Map, c = 0, d = a.K; c < d.length;) {
						var e = d[c];
						++c;
						b.set(e.W, e);
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
					a.K = this.mn ? c.concat(d) : d.concat(c);
				}
			}

			ua(a) {
				a.m(this.mn ? 1 : 0);
				a.m(this.gh.length);
				let b = 0
					,
					c = this.gh;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			va(a) {
				this.mn = 0 != a.C();
				let b = a.C();
				this.gh = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.gh.push(a.N());
			}
		}

		class class_Ib extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = a.M;
					if (null != b) {
						if (this.en) {
							a = a.na(this.Ee);
							if (null == a)
								return;
							a = a.J;
						}
						else
							a = b.ta.G[this.Ee];
						null != a && (null != this.Ja[0] && (a.a.x = this.Ja[0]),
						null != this.Ja[1] && (a.a.y = this.Ja[1]),
						null != this.Ja[2] && (a.F.x = this.Ja[2]),
						null != this.Ja[3] && (a.F.y = this.Ja[3]),
						null != this.Ja[4] && (a.oa.x = this.Ja[4]),
						null != this.Ja[5] && (a.oa.y = this.Ja[5]),
						null != this.Ja[6] && (a.$ = this.Ja[6]),
						null != this.Ja[7] && (a.o = this.Ja[7]),
						null != this.Ja[8] && (a.ba = this.Ja[8]),
						null != this.Ja[9] && (a.Ba = this.Ja[9]),
						null != this.Wc[0] && (a.S = this.Wc[0]),
						null != this.Wc[1] && (a.h = this.Wc[1]),
						null != this.Wc[2] && (a.w = this.Wc[2]));
					}
				}
			}

			ua(a) {
				a.P(this.Ee);
				a.m(this.en ? 1 : 0);
				let b = a.a;
				a.Wb(0);
				let c = 0;
				for (var d = 1, e = 0, f = this.Ja; e < f.length;) {
					var g = f[e];
					++e;
					null != g && (c |= d,
						a.aj(g));
					d <<= 1;
				}
				e = 0;
				for (f = this.Wc; e < f.length;)
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

			va(a) {
				this.Ee = a.N();
				this.en = 0 != a.C();
				let b = a.Rb();
				this.Ja = [];
				for (var c = 0; 10 > c;) {
					var d = c++;
					this.Ja[d] = null;
					0 != (b & 1) && (this.Ja[d] = a.ri());
					b >>>= 1;
				}
				this.Wc = [];
				for (c = 0; 3 > c;)
					d = c++,
						this.Wc[d] = null,
					0 != (b & 1) && (this.Wc[d] = a.N()),
						b >>>= 1;
			}
		}

		class class_Pa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && a.Br(a.na(this.R), this.min, this.rate, this.fj);
			}

			ua(a) {
				a.P(this.min);
				a.P(this.rate);
				a.P(this.fj);
			}

			va(a) {
				this.min = a.N();
				this.rate = a.N();
				this.fj = a.N();
			}

			static ma(a, b, c) {
				let d = new class_Pa;
				d.min = a;
				d.rate = b;
				d.fj = c;
				return d;
			}
		}

		class class_Ua extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Ob(this.R) && a.Nr(a.na(this.R));
			}

			ua() {
			}

			va() {
			}
		}

		class class_Va extends class_m {
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
						null != a.Cf && a.Cf(b);
					}
				}
			}

			ua() {
			}

			va() {
			}
		}

		class class_Ca extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					a = a.K;
					for (var b = 0, c = a.length; b < c;) {
						let d = b++;
						if (d >= this.Ce.length)
							break;
						a[d].yb = this.Ce[d];
					}
				}
			}

			ua(a) {
				a.kb(this.Ce.length);
				let b = 0
					,
					c = this.Ce;
				for (; b < c.length;)
					a.kb(c[b++]);
			}

			va(a) {
				this.Ce = [];
				let b = a.Ab()
					,
					c = 0;
				for (; c < b;)
					++c,
						this.Ce.push(a.Ab());
			}

			static ma(a) {
				let b = new class_Ca
					,
					c = a.U.K
					,
					d = []
					,
					e = 0;
				for (; e < c.length;) {
					let f = a.Qe.get(c[e++].W);
					d.push(null == f ? 0 : f.yb);
				}
				b.Ce = d;
				return b;
			}
		}

		class class_v extends Error {
			constructor(a, b, c) {
				super(a);
				this.message = a;
				this.Ej = null != c ? c : this;
			}

			Fb() {
				return this.Ej;
			}

			static Kb(a) {
				return a instanceof v ? a : a instanceof Error ? new class_v(a.message, null, a) : new class_Mb(a, null, a);
			}

			static B(a) {
				return a instanceof v ? a.Ej : a instanceof Error ? a : new class_Mb(a);
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

		var sb = sb || {},
			X;
		class_qc.b = true;
		Object.assign(class_qc.prototype, {
			g: class_qc
		});
		class_P.b = true;
		Math.b = true;
		class_Bc.b = true;
		class_Q.b = true;
		class_ba.b = true;
		class_ha.b = true;
		class_vc.b = true;
		Object.assign(class_vc.prototype, {
			g: class_vc
		});
		var na = sb['bas.basnet.FailReason'] = {
			Pf: true,
			Xd: null,
			Ge: {
				wc: 'PeerFailed',
				mb: 0,
				Gb: 'bas.basnet.FailReason',
				toString: ja
			},
			He: (X = function (a) {
				return {
					mb: 1,
					code: a,
					Gb: 'bas.basnet.FailReason',
					toString: ja
				};
			}
				,
				X.wc = 'Rejected',
				X.Ie = ['code'],
				X),
			Fe: {
				wc: 'Cancelled',
				mb: 2,
				Gb: 'bas.basnet.FailReason',
				toString: ja
			},
			Error: {
				wc: 'Error',
				mb: 3,
				Gb: 'bas.basnet.FailReason',
				toString: ja
			}
		};
		na.Xd = [na.Ge, na.He, na.Fe, na.Error];
		class_ac.b = true;
		Object.assign(class_ac.prototype, {
			g: class_ac
		});
		class_Za.b = true;
		Object.assign(class_Za.prototype, {
			g: class_Za
		});
		var db = sb['bas.basnet.ConnectionRequestResponse'] = {
			Pf: true,
			Xd: null,
			zj: {
				wc: 'Accept',
				mb: 0,
				Gb: 'bas.basnet.ConnectionRequestResponse',
				toString: ja
			},
			Nf: (X = function (a) {
				return {
					mb: 1,
					reason: a,
					Gb: 'bas.basnet.ConnectionRequestResponse',
					toString: ja
				};
			}
				,
				X.wc = 'Reject',
				X.Ie = ['reason'],
				X)
		};
		db.Xd = [db.zj, db.Nf];
		class_Eb.b = true;
		Object.assign(class_Eb.prototype, {
			g: class_Eb
		});
		class_Kc.b = true;
		class_bc.b = true;
		Object.assign(class_bc.prototype, {
			g: class_bc
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
		class_Bb.b = true;
		class_pb.b = true;
		class_Ub.b = true;
		class_cc.b = true;
		Object.assign(class_cc.prototype, {
			g: class_cc
		});
		class_x.b = true;
		class_dc.b = true;
		class_Gc.b = true;
		class_m.b = true;
		Object.assign(class_m.prototype, {
			g: class_m
		});
		class_$a.b = true;
		Object.assign(class_$a.prototype, {
			g: class_$a
		});
		class_V.b = true;
		Object.assign(class_V.prototype, {
			g: class_V
		});
		class_ab.b = true;
		class_ab.ha = class_m;
		Object.assign(class_ab.prototype, {
			g: class_ab
		});
		class_gc.b = true;
		class_gc.Cj = true;
		Object.assign(class_gc.prototype, {
			g: class_gc
		});
		class_Xb.b = true;
		Object.assign(class_Xb.prototype, {
			g: class_Xb
		});
		class_mc.b = true;
		Object.assign(class_mc.prototype, {
			g: class_mc
		});
		class_lc.b = true;
		Object.assign(class_lc.prototype, {
			g: class_lc
		});
		class_Qa.b = true;
		class_Qa.Cj = true;
		class_va.b = true;
		class_oa.b = true;
		class_oa.ha = class_V;
		Object.assign(class_oa.prototype, {
			g: class_oa
		});
		var ia = sb['bas.marf.net.ConnFailReason'] = {
			Pf: true,
			Xd: null,
			Fe: {
				wc: 'Cancelled',
				mb: 0,
				Gb: 'bas.marf.net.ConnFailReason',
				toString: ja
			},
			Ge: {
				wc: 'PeerFailed',
				mb: 1,
				Gb: 'bas.marf.net.ConnFailReason',
				toString: ja
			},
			He: (X = function (a) {
				return {
					mb: 2,
					reason: a,
					Gb: 'bas.marf.net.ConnFailReason',
					toString: ja
				};
			}
				,
				X.wc = 'Rejected',
				X.Ie = ['reason'],
				X),
			Mf: (X = function (a) {
				return {
					mb: 3,
					description: a,
					Gb: 'bas.marf.net.ConnFailReason',
					toString: ja
				};
			}
				,
				X.wc = 'Other',
				X.Ie = ['description'],
				X)
		};
		ia.Xd = [ia.Fe, ia.Ge, ia.He, ia.Mf];
		class_Ea.b = true;
		class_Ea.ha = class_oa;
		Object.assign(class_Ea.prototype, {
			g: class_Ea
		});
		class_Pb.b = true;
		class_Pb.ha = class_oa;
		Object.assign(class_Pb.prototype, {
			g: class_Pb
		});
		class_pc.b = true;
		Object.assign(class_pc.prototype, {
			g: class_pc
		});
		class_yc.b = true;
		class_Rb.b = true;
		Object.assign(class_Rb.prototype, {
			g: class_Rb
		});
		class_Qb.b = true;
		class_Qb.ha = class_oa;
		Object.assign(class_Qb.prototype, {
			g: class_Qb
		});
		class_Yb.b = true;
		Object.assign(class_Yb.prototype, {
			g: class_Yb
		});
		class_Fc.b = true;
		Object.assign(class_Fc.prototype, {
			g: class_Fc
		});
		class_O.b = true;
		Object.assign(class_O.prototype, {
			g: class_O
		});
		class_aa.b = true;
		class_H.b = true;
		class_E.b = true;
		class_La.b = true;
		class_jc.b = true;
		class_Zb.b = true;
		class_lb.b = true;
		Object.assign(class_lb.prototype, {
			g: class_lb
		});
		class_Ac.b = true;
		class_Sb.b = true;
		Object.assign(class_Sb.prototype, {
			g: class_Sb
		});
		class_Ma.b = true;
		class_Ba.b = true;
		Object.assign(class_Ba.prototype, {
			g: class_Ba
		});
		class_Tb.b = true;
		Object.assign(class_Tb.prototype, {
			g: class_Tb
		});
		class_fb.b = true;
		Object.assign(class_fb.prototype, {
			g: class_fb
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
		class_p.b = true;
		class_oc.b = true;
		Object.assign(class_oc.prototype, {
			g: class_oc
		});
		class_B.b = true;
		class_C.b = true;
		class_kc.b = true;
		Object.assign(class_kc.prototype, {
			g: class_kc
		});
		class_Ob.b = true;
		Object.assign(class_Ob.prototype, {
			g: class_Ob
		});
		class_Wb.b = true;
		class_xb.b = true;
		class_rc.b = true;
		Object.assign(class_rc.prototype, {
			g: class_rc
		});
		class_sc.b = true;
		Object.assign(class_sc.prototype, {
			g: class_sc
		});
		class_za.b = true;
		Object.assign(class_za.prototype, {
			g: class_za
		});
		class_ca.b = true;
		class_ca.nd = [class_Qa];
		Object.assign(class_ca.prototype, {
			g: class_ca
		});
		class_eb.b = true;
		Object.assign(class_eb.prototype, {
			g: class_eb
		});
		class_ec.b = true;
		Object.assign(class_ec.prototype, {
			g: class_ec
		});
		class_Vb.b = true;
		Object.assign(class_Vb.prototype, {
			g: class_Vb
		});
		class_q.b = true;
		Object.assign(class_q.prototype, {
			g: class_q
		});
		class_ya.b = true;
		Object.assign(class_ya.prototype, {
			g: class_ya
		});
		class_u.b = true;
		Object.assign(class_u.prototype, {
			g: class_u
		});
		class_sa.b = true;
		class_sa.nd = [class_Qa, class_gc];
		Object.assign(class_sa.prototype, {
			g: class_sa
		});
		class_ta.b = true;
		class_ta.nd = [class_Qa];
		Object.assign(class_ta.prototype, {
			g: class_ta
		});
		class_Fa.b = true;
		class_Fa.ha = class_m;
		Object.assign(class_Fa.prototype, {
			g: class_Fa
		});
		class_Fb.b = true;
		class_Fb.ha = class_m;
		Object.assign(class_Fb.prototype, {
			g: class_Fb
		});
		class_Wa.b = true;
		class_Wa.ha = class_m;
		Object.assign(class_Wa.prototype, {
			g: class_Wa
		});
		class_xa.b = true;
		class_xa.ha = class_m;
		Object.assign(class_xa.prototype, {
			g: class_xa
		});
		class_Ia.b = true;
		class_Ia.ha = class_m;
		Object.assign(class_Ia.prototype, {
			g: class_Ia
		});
		class_Oa.b = true;
		class_Oa.ha = class_m;
		Object.assign(class_Oa.prototype, {
			g: class_Oa
		});
		class_fa.b = true;
		class_fa.ha = class_m;
		Object.assign(class_fa.prototype, {
			g: class_fa
		});
		class_Ga.b = true;
		class_Ga.ha = class_m;
		Object.assign(class_Ga.prototype, {
			g: class_Ga
		});
		class_bb.b = true;
		class_bb.ha = class_m;
		Object.assign(class_bb.prototype, {
			g: class_bb
		});
		class_Ha.b = true;
		class_Ha.ha = class_m;
		Object.assign(class_Ha.prototype, {
			g: class_Ha
		});
		class_Da.b = true;
		class_Da.ha = class_m;
		Object.assign(class_Da.prototype, {
			g: class_Da
		});
		class_Hb.b = true;
		class_Hb.ha = class_m;
		Object.assign(class_Hb.prototype, {
			g: class_Hb
		});
		class_Ya.b = true;
		class_Ya.ha = class_m;
		Object.assign(class_Ya.prototype, {
			g: class_Ya
		});
		class_Xa.b = true;
		class_Xa.ha = class_m;
		Object.assign(class_Xa.prototype, {
			g: class_Xa
		});
		class_Aa.b = true;
		class_Aa.ha = class_m;
		Object.assign(class_Aa.prototype, {
			g: class_Aa
		});
		class_Ja.b = true;
		class_Ja.ha = class_m;
		Object.assign(class_Ja.prototype, {
			g: class_Ja
		});
		class_Ic.b = true;
		class_ma.b = true;
		class_ma.ha = class_m;
		Object.assign(class_ma.prototype, {
			g: class_ma
		});
		class_Gb.b = true;
		class_Gb.ha = class_m;
		Object.assign(class_Gb.prototype, {
			g: class_Gb
		});
		class_Ib.b = true;
		class_Ib.ha = class_m;
		Object.assign(class_Ib.prototype, {
			g: class_Ib
		});
		class_Pa.b = true;
		class_Pa.ha = class_m;
		Object.assign(class_Pa.prototype, {
			g: class_Pa
		});
		class_Ua.b = true;
		class_Ua.ha = class_m;
		Object.assign(class_Ua.prototype, {
			g: class_Ua
		});
		class_Va.b = true;
		class_Va.ha = class_m;
		Object.assign(class_Va.prototype, {
			g: class_Va
		});
		class_Ca.b = true;
		class_Ca.ha = class_m;
		Object.assign(class_Ca.prototype, {
			g: class_Ca
		});
		class_ua.b = true;
		class_ua.nd = [class_Qa];
		Object.assign(class_ua.prototype, {
			g: class_ua
		});
		class_Jb.b = true;
		class_Jb.nd = [class_Qa];
		Object.assign(class_Jb.prototype, {
			g: class_Jb
		});
		class_Ta.b = true;
		class_Ta.nd = [class_Qa];
		Object.assign(class_Ta.prototype, {
			g: class_Ta
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
		class_W.b = true;
		Object.assign(class_W.prototype, {
			g: class_W
		});
		class_da.b = true;
		Object.assign(class_da.prototype, {
			g: class_da
		});
		class_wc.b = true;
		Object.assign(class_wc.prototype, {
			g: class_wc
		});
		class_tb.b = true;
		Object.assign(class_tb.prototype, {
			g: class_tb
		});
		class_ib.b = true;
		Object.assign(class_ib.prototype, {
			g: class_ib
		});
		class_cb.b = true;
		Object.assign(class_cb.prototype, {
			g: class_cb
		});
		class_fc.b = true;
		Object.assign(class_fc.prototype, {
			g: class_fc
		});
		class_hb.b = true;
		Object.assign(class_hb.prototype, {
			g: class_hb
		});
		class_kb.b = true;
		Object.assign(class_kb.prototype, {
			g: class_kb
		});
		class_gb.b = true;
		Object.assign(class_gb.prototype, {
			g: class_gb
		});
		class_Ra.b = true;
		Object.assign(class_Ra.prototype, {
			g: class_Ra
		});
		class_Lb.b = true;
		Object.assign(class_Lb.prototype, {
			g: class_Lb
		});
		class_xc.b = true;
		Object.assign(class_xc.prototype, {
			g: class_xc
		});
		class_wa.b = true;
		Object.assign(class_wa.prototype, {
			g: class_wa
		});
		class_ob.b = true;
		Object.assign(class_ob.prototype, {
			g: class_ob
		});
		class_Kb.b = true;
		Object.assign(class_Kb.prototype, {
			g: class_Kb
		});
		class_wb.b = true;
		Object.assign(class_wb.prototype, {
			g: class_wb
		});
		class_nc.b = true;
		Object.assign(class_nc.prototype, {
			g: class_nc
		});
		class_mb.b = true;
		Object.assign(class_mb.prototype, {
			g: class_mb
		});
		class_Cb.b = true;
		Object.assign(class_Cb.prototype, {
			g: class_Cb
		});
		class_Na.b = true;
		Object.assign(class_Na.prototype, {
			g: class_Na
		});
		class_Y.b = true;
		Object.assign(class_Y.prototype, {
			g: class_Y
		});
		class_Ka.b = true;
		Object.assign(class_Ka.prototype, {
			g: class_Ka
		});
		class_nb.b = true;
		Object.assign(class_nb.prototype, {
			g: class_nb
		});
		class_rb.b = true;
		Object.assign(class_rb.prototype, {
			g: class_rb
		});
		class_Sa.b = true;
		Object.assign(class_Sa.prototype, {
			g: class_Sa
		});
		class_qb.b = true;
		Object.assign(class_qb.prototype, {
			g: class_qb
		});
		class_jb.b = true;
		Object.assign(class_jb.prototype, {
			g: class_jb
		});
		class_Db.b = true;
		Object.assign(class_Db.prototype, {
			g: class_Db
		});
		class_la.b = true;
		Object.assign(class_la.prototype, {
			g: class_la
		});
		class_Z.b = true;
		Object.assign(class_Z.prototype, {
			g: class_Z
		});
		class_ub.b = true;
		Object.assign(class_ub.prototype, {
			g: class_ub
		});
		class_vb.b = true;
		Object.assign(class_vb.prototype, {
			g: class_vb
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
		globalScope.yj |= 0;
		'undefined' != typeof performance && 'function' == typeof performance.now && (class_P.now = performance.now.bind(performance));
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
		var $b = {}
			,
			Lc = {}
			,
			D = Number
			,
			Cc = Boolean
			,
			Mc = {}
			,
			Nc = {};
		class_u.La = new class_u(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
		class_u.ga = new class_u(1, 15035990, -1, 8, 'Red', 't-red', 15035990, 2);
		class_u.Aa = new class_u(2, 5671397, 1, 16, 'Blue', 't-blue', 625603, 4);
		class_u.La.xg = class_u.La;
		class_u.ga.xg = class_u.Aa;
		class_u.Aa.xg = class_u.ga;
		class_w.Fn = {}.toString;
		class_Za.mo = {
			mandatory: {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false
			}
		};
		class_T.qh = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};
		class_T.Am = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};
		class_pb.hp = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
		class_m.xb = false;
		class_m.cn = new Map;
		class_m.Ef = 0;
		class_V.xb = false;
		class_ab.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_va.Cc = 0;
		class_yc.channels = [{
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
		class_aa.Aj = 'application/x-www-form-urlencoded';
		class_Ma.ab = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
		class_p.ms = 'wss://p2p.haxball.com/';
		class_p.Me = 'https://www.haxball.com/rs/';
		class_p.eg = [{
			urls: 'stun:stun.l.google.com:19302'
		}];
		class_p.l = new class_ic;
		class_ca.jl = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(new class_O(0, 0));
			}
			return a;
		}(this);
		class_ca.nk = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(0);
			}
			return a;
		}(this);
		class_q.Ur = class_A.ia(1024);
		class_Fa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Fb.ya = class_m.Ea({
			za: false,
			delay: false,
			rj: {
				ej: 10,
				xj: 900
			}
		});
		class_Wa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_xa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ia.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Oa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_fa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ga.ya = class_m.Ea({
			za: false,
			delay: false,
			rj: {
				ej: 10,
				xj: 2E3
			}
		});
		class_bb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ha.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Da.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Hb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ya.ya = class_m.Ea({});
		class_Xa.ya = class_m.Ea({
			za: false,
			delay: false,
			rj: {
				ej: 10,
				xj: 900
			}
		});
		class_Aa.ya = class_m.Ea({});
		class_Ja.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_ma.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Gb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ib.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Pa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ua.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Va.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ca.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_I.yn = .17435839227423353;
		class_I.xn = 5.934119456780721;
		class_da.vn = new class_Yb([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
		class_da.wn = new class_Yb([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
		class_ib.O = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_cb.O = '<div class=\'chatbox-view\'><div data-hook=\'drag\' class=\'drag\'></div><div data-hook=\'log\' class=\'log subtle-thin-scrollbar\'><div data-hook=\'log-contents\' class=\'log-contents\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /></div></div>';
		class_hb.O = '<div class=\'choose-nickname-view\'><img src="' + window.parent._gdir + 'images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
		class_kb.O = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
		class_gb.O = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
		class_Ra.O = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
		class_Lb.O = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
		class_wa.O = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'gameplay-section\' data-hook=\'gameplay\'></div><div class=\'top-section\' data-hook=\'top-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'buttons\'><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i>Settings</button></div></div><div data-hook=\'popups\'></div></div>';
		class_ob.O = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
		class_Kb.O = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
		class_wb.O = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_mb.O = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
		class_Cb.O = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
		class_Na.O = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list thin-scrollbar\' data-hook=\'list\'></div></div>';
		class_Ka.O = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
		class_nb.O = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
		class_rb.wj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
		class_Sa.wj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
		class_jb.O = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
		class_Db.O = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
		class_la.O = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat opacity </div><div style="width: 40px" data-hook="chatopacity-value">1</div><input class="slider" type="range" min="0.5" max="1" step="0.01" data-hook="chatopacity-range"></div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat focus height </div><div style="width: 40px" data-hook="chatfocusheight-value">200</div><input class="slider" type="range" min="0" max="400" step="10" data-hook="chatfocusheight-range"></div><div>Chat background width:<select data-hook=\'chatbgmode\'><option>Full</option><option>Compact</option></select></div></div></div></div>';
		class_la.mm = 0;
		class_Z.O = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
		class_ub.O = '<div class=\'stats-view\'><p data-hook=\'ping\'></p><p data-hook=\'fps\'></p><div data-hook=\'graph\'></div></div>';
		class_vb.O = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="' + window.parent._gdir + 'images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="' + window.parent._gdir + 'images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="' + window.parent._gdir + 'images/opera-icon.png"/>Opera</a></div></div></div>';
		class_B.Dp();
	}
)('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this);
