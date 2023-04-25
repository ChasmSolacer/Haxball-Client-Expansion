/*
 HaxBall @ 2023 - Mario Carbajal - All rights reserved.
 37537d20
*/
'use strict';
(function (globalScope) {
		window.parent.g = {};

		const Constants = {
			minH: 0,
			maxH: 5000,
			minE: -1000,
			maxE: 1000,
			minRoomNameLen: -1,
			maxRoomNameLen: 40,
			min_hc: 66,
			max_hc: 400
		};
		
		function ja() {
			return class_w.Je(this, '');
		}

		function hc(a) {
			return Constants.min_hc > a ? Constants.min_hc : Constants.max_hc < a ? Constants.max_hc : a;
		}

		function Nb() {
			return hc(ConnectionConstants.m.ak.H());
		}

		function createHandlerFromInstance(a, b) {
			if (null == b)
				return null;
			null == b.oh && (b.oh = globalScope.xj++);
			var c;
			null == a.ij ? a.ij = {} : c = a.ij[b.oh];
			null == c && (c = b.bind(a),
				a.ij[b.oh] = c);
			return c;
		}

		class class_ic {
			static i(a, b, c, d) {
				null != a && a(b, c, d);
			}
		}

		class class_eb {
			constructor(a) {
				function b() {
					d.Hc() && null != d.ml && d.ml(d.Bb.value);
				}

				this.f = class_x.Fa(class_eb.O);
				let c = class_x.Da(this.f);
				this.Bb = c.get('input');
				this.jf = c.get('ok');
				let d = this;
				this.Bb.maxLength = 25;
				this.Bb.value = a;
				this.Bb.oninput = function () {
					d.D();
				}
				;
				this.Bb.onkeydown = function (e) {
					13 == e.keyCode && b();
				}
				;
				this.jf.onclick = b;
				this.D();
			}

			Hc() {
				let a = this.Bb.value;
				return 25 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.jf.disabled = !this.Hc();
			}
		}

		class class_m {
			constructor() {
				class_m.wb || this.Xa();
			}

			Xa() {
				this.Dc = 0;
			}

			jn() {
				return true;
			}

			apply() {
				throw GlobalError.B('missing implementation');
			}

			va() {
				throw GlobalError.B('missing implementation');
			}

			ua() {
				throw GlobalError.B('missing implementation');
			}

			static Ea(a) {
				null == a.delay && (a.delay = true);
				null == a.za && (a.za = true);
				return a;
			}

			static Ga(a) {
				a.wn = class_m.Ff;
				if (null == a.ya)
					throw GlobalError.B('Class doesn\'t have a config');
				a.prototype.Gf = a.ya;
				class_m.Zm.set(class_m.Ff, a);
				class_m.Ff++;
			}

			static oj(a, b) {
				let c = class_w.Wm(a).wn;
				if (null == c)
					throw GlobalError.B('Tried to pack unregistered action');
				b.l(c);
				a.ua(b);
			}

			static lh(a) {
				var b = a.C();
				b = Object.create(class_m.Zm.get(b).prototype);
				b.Dc = 0;
				b.kb = 0;
				b.va(a);
				return b;
			}
		}

		class class_jc {
			constructor() {
				this.hash = 0;
			}

			js(a) {
				let b = 0
					,
					c = a.length;
				for (; b < c;)
					this.hash = (this.hash += a[b++]) + (this.hash << 10),
						this.hash ^= this.hash >>> 6;
			}
		}

		class class_Ob {
			constructor(a) {
				this.Od = a;
			}
		}

		class class_Aa {
			constructor(a) {
				function b() {
					let t = g[f];
					a.zl = e ? t : 0;
					c.get('spd').textContent = t + 'x';
				}

				this.gg = false;
				this.f = class_x.Fa(class_Aa.O);
				let c = class_x.Da(this.f);
				this.vi = a;
				let d = this;
				c.get('reset').onclick = function () {
					a.wi();
					d.ol();
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
				this.Mr = c.get('time');
				let k = c.get('timebar');
				this.Iq = c.get('progbar');
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
					z.style.left = 100 * t.pj + '%';
					k.appendChild(z);
				}
				k.onclick = function (t) {
					a.mr((t.pageX - k.offsetLeft) / k.clientWidth * a.nh * a.tf);
					d.gg || (d.gg = true,
						d.cq(),
						d.ol());
				}
				;
				k.onmousemove = function (t) {
					t = (t.pageX - k.offsetLeft) / k.clientWidth;
					l.textContent = class_Aa.fl(a.tf * a.nh * t);
					return l.style.left = 'calc(' + 100 * t + '% - 30px)';
				}
				;
				this.op = c.get('leave');
				this.op.onclick = function () {
					class_H.i(d.ie);
				};
			}

			D() {
				this.Mr.textContent = class_Aa.fl(this.vi.Tb);
				this.Iq.style.width = 100 * this.vi.Po() + '%';
				!this.gg || 0 < this.vi.Md || (this.gg = false,
					this.bq());
			}

			static fl(a) {
				a = a / 1E3 | 0;
				return (a / 60 | 0) + ':' + class_Y.Hf(class_Q.De(a % 60));
			}
		}

		class VMajor {
			constructor(a) {
				VMajor.wb || this.Xa(a);
			}

			Xa(a) {
				this.Z = 0;
				this.U = a;
			}
		}

		class class_Pb {
			static ir(a, b) {
				class_Pb.gm(new Blob([a], {
					type: 'octet/stream'
				}), b);
			}

			static jr(a, b) {
				class_Pb.gm(new Blob([a], {
					type: 'text/plain'
				}), b);
			}

			static gm(a, b) {
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

		class class_Qb {
			constructor(a) {
				this.Fp = a;
			}
		}

		class class_zc {
			constructor(a) {
				this.current = 0;
				this.hs = a;
			}

			next() {
				return this.hs[this.current++];
			}
		}

		class class_Ac {
			static Ym() {
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

		class class_fb {
			constructor(a, b) {
				this.f = class_x.Fa(class_fb.O);
				let c = class_x.Da(this.f);
				this.gf = c.get('name');
				this.Rf = c.get('admin');
				this.Ye = c.get('kick');
				this.ud = c.get('close');
				let d = this;
				this.Rf.onclick = function () {
					class_Ba.i(d.Kp, d.Qb, !d.Al);
				}
				;
				this.Ye.onclick = function () {
					class_E.i(d.fi, d.Qb);
				}
				;
				this.ud.onclick = function () {
					class_H.i(d.ob);
				}
				;
				this.Qb = a.W;
				this.Lj(a.A);
				this.Kj(a.cb);
				this.Rf.disabled = !b || 0 == this.Qb;
				this.Ye.disabled = !b || 0 == this.Qb;
			}

			D(a, b) {
				a = a.getFullPlayerById(this.Qb);
				null == a ? class_H.i(this.ob) : (this.Wr(a),
					this.Rf.disabled = !b || 0 == this.Qb,
					this.Ye.disabled = !b || 0 == this.Qb);
			}

			Wr(a) {
				this.ke != a.A && this.Lj(a.A);
				this.Al != a.cb && this.Kj(a.cb);
			}

			Lj(a) {
				this.ke = a;
				this.gf.textContent = a;
			}

			Kj(a) {
				this.Al = a;
				this.Rf.textContent = a ? 'Remove Admin' : 'Give Admin';
			}
		}

		class class_Rb {
			constructor(a, b) {
				this.Ha = a;
				this.value = b;
				a.textContent = '' + b;
			}

			set(a) {
				this.value != a && (this.value = a,
					this.Ha.textContent = '' + this.value);
			}
		}

		class Segment {
			constructor() {
				this.Ng = this.Og = this.wa = null;
				this.hk = 0;
				this.da = this.X = this.be = null;
				this.Gc = 0;
				this.o = 1;
				this.h = 63;
				this.w = 32;
				this.tb = 1 / 0;
				this.Ya = true;
				this.S = 0;
			}

			fa(a) {
				let b = 0
					,
					c = a.a;
				a.l(0);
				a.l(this.X.Bd);
				a.l(this.da.Bd);
				0 != this.Gc && (b = 1,
					a.u(this.Gc));
				this.tb != 1 / 0 && (b |= 2,
					a.u(this.tb));
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
				this.tb = 0 != (c & 2) ? a.v() : 1 / 0;
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
				a > Segment.un && a < Segment.tn && (this.tb = 1 / Math.tan(a / 2));
			}

			Lo() {
				return 0 != 0 * this.tb ? 0 : 114.59155902616465 * Math.atan(1 / this.tb);
			}

			me() {
				if (0 == 0 * this.tb) {
					var a = this.da.a
						,
						b = this.X.a
						,
						c = .5 * (a.x - b.x);
					a = .5 * (a.y - b.y);
					b = this.X.a;
					let d = this.tb;
					this.be = new Point(b.x + c + -a * d, b.y + a + c * d);
					a = this.X.a;
					b = this.be;
					c = a.x - b.x;
					a = a.y - b.y;
					this.hk = Math.sqrt(c * c + a * a);
					c = this.X.a;
					a = this.be;
					this.Ng = new Point(-(c.y - a.y), c.x - a.x);
					c = this.be;
					a = this.da.a;
					this.Og = new Point(-(c.y - a.y), c.x - a.x);
					0 >= this.tb && (a = c = this.Ng,
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
						this.wa = new Point(a / b, c / b);
			}
		}

		class CommandUtil {
			constructor(a, b) {
				this.xa = a;
				this.ca = b;
			}

			qf(a) {
				if ('/' != a.charAt(0))
					return false;
				if (1 == a.length)
					return true;
				a = class_Y.Qs(class_P.substr(a, 1, null)).split(' ');
				let b = a[0]
					,
					c = this;
				switch (b) {
					case 'avatar':
						2 == a.length && (this.pm(a[1]),
							this.ca('Avatar set'));
						break;
					case 'checksum':
						var d = this.xa.U.T;
						a = d.A;
						d.Xe() ? this.ca('Current stadium is original: "' + a + '"') : (d = class_Y.ah(d.bk(), 8),
							this.ca('Stadium: "' + a + '" (checksum: ' + d + ')'));
						break;
					case 'clear_avatar':
						this.pm(null);
						this.ca('Avatar cleared');
						break;
					case 'clear_bans':
						null == this.Zd ? this.ca('Only the host can clear bans') : (this.Zd(),
							this.ca('All bans have been cleared'));
						break;
					case 'clear_password':
						null == this.Mg ? this.ca('Only the host can change the password') : (this.Mg(null),
							this.ca('Password cleared'));
						break;
					case 'colors':
						try {
							d = CommandUtil.lq(a),
								this.xa.ra(d);
						}
						catch (g) {
							a = GlobalError.Jb(g).Db(),
							'string' == typeof a && this.ca(a);
						}
						break;
					case 'extrapolation':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && -200 <= a && 200 >= a ? (ConnectionConstants.m.yd.Ma(a),
								this.xa.qm(a),
								this.ca('Extrapolation set to ' + a + ' msec')) : this.ca('Extrapolation must be a value between -200 and 50 milliseconds')) : this.ca('Extrapolation requires a value in milliseconds.');
						break;
					case 'handicap':
						2 == a.length ? (a = class_Q.parseInt(a[1]),
							null != a && 0 <= a && 300 >= a ? (this.xa.tr(a),
								this.ca('Ping handicap set to ' + a + ' msec')) : this.ca('Ping handicap must be a value between 0 and 300 milliseconds')) : this.ca('Ping handicap requires a value in milliseconds.');
						break;
					case 'kick_ratelimit':
						if (4 > a.length)
							this.ca('Usage: /kick_ratelimit <min> <rate> <burst>');
						else {
							d = class_Q.parseInt(a[1]);
							var e = class_Q.parseInt(a[2]);
							a = class_Q.parseInt(a[3]);
							null == d || null == e || null == a ? this.ca('Invalid arguments') : this.xa.ra(class_Ca.ma(d, e, a));
						}
						break;
					case 'recaptcha':
						if (null == this.tm)
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
											throw GlobalError.B(null);
									}
									this.tm(e);
									this.ca('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
								}
								else
									throw GlobalError.B(null);
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
						f.Xe() ? this.ca('Can\'t store default stadium.') : class_gb.Os().then(function () {
							return class_gb.add(f);
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

			pm(a) {
				null != a && (a = StringOpsLimit.Vc(a, 2));
				ConnectionConstants.m.rh.Ma(a);
				this.xa.ra(class_Da.ma(a));
			}

			static lq(a) {
				if (3 > a.length)
					throw GlobalError.B('Not enough arguments');
				if (7 < a.length)
					throw GlobalError.B('Too many arguments');
				let b = new class_Ra
					,
					c = new TeamColors;
				b.Yg = c;
				switch (a[1]) {
					case 'blue':
						c.eb = [Team.Aa.S];
						b.ea = Team.Aa;
						break;
					case 'red':
						c.eb = [Team.ga.S];
						b.ea = Team.ga;
						break;
					default:
						throw GlobalError.B('First argument must be either "red" or "blue"');
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

		class TeamColors {
			constructor() {
				this.ld = 16777215;
				this.eb = [];
			}

			fa(a) {
				a.l(this.pd);
				a.P(this.ld);
				a.l(this.eb.length);
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
					throw GlobalError.B('too many');
				this.eb = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.eb.push(a.N());
			}
		}

		class class_Ea {
			constructor(a) {
				this.Ed = new Map;
				this.f = class_x.Fa(class_Ea.O);
				this.f.className += ' ' + a.ro;
				let b = class_x.Da(this.f);
				this.ab = b.get('list');
				this.Vh = b.get('join-btn');
				this.xi = b.get('reset-btn');
				a == Team.spec && this.xi.remove();
				this.Vh.textContent = '' + a.A;
				this.f.ondragover = this.f.Zs = function (d) {
					-1 != d.dataTransfer.types.indexOf('player') && d.preventDefault();
				}
				;
				let c = this;
				this.f.ondrop = function (d) {
					d.preventDefault();
					d = d.dataTransfer.getData('player');
					null != d && (d = class_Q.parseInt(d),
					null != d && class_Ba.i(c.vg, d, a));
				}
				;
				this.Vh.onclick = function () {
					class_E.i(c.Sp, a);
				}
				;
				this.xi.onclick = function () {
					class_E.i(c.je, a);
				};
			}

			D(a, b, c, d) {
				this.Vh.disabled = b || c;
				this.xi.disabled = c;
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
					null == f && (f = new class_hb(e),
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

		class class_ka {
			constructor() {
				this.sb = '';
				this.Ic = this.Kc = 0;
			}

			ye() {
				return JSON.stringify({
					lat: this.Ic,
					lon: this.Kc,
					code: this.sb
				});
			}

			static Ih(a) {
				return class_ka.ag(JSON.parse(a));
			}

			static ag(a) {
				let b = new class_ka;
				b.Ic = a.lat;
				b.Kc = a.lon;
				b.sb = a.code.toLowerCase();
				return b;
			}

			static Oo() {
				return class_Z.Dk(ConnectionConstants.Me + 'api/geo').then(function (a) {
					return class_ka.ag(a);
				});
			}
		}

		class StringOpsLimit {
			static Vc(a, b) {
				return a.length <= b ? a : class_P.substr(a, 0, b);
			}

			static ks(a) {
				let b = ''
					,
					c = 0
					,
					d = a.byteLength;
				for (; c < d;)
					b += class_Y.ah(a[c++], 2);
				return b;
			}
		}

		class class_ib {
			constructor(a) {
				this.qk = false;
				this.Am = new class_Ea(Team.spec);
				this.Sj = new class_Ea(Team.Aa);
				this.Sl = new class_Ea(Team.ga);
				this.f = class_x.Fa(class_ib.O);
				let b = class_x.Da(this.f);
				this.mc = b.get('room-name');
				this.Dm = b.get('start-btn');
				this.Fm = b.get('stop-btn');
				this.hi = b.get('pause-btn');
				this.Gn = b.get('auto-btn');
				this.Xk = b.get('lock-btn');
				this.bm = b.get('reset-all-btn');
				this.Ql = b.get('rec-btn');
				let c = b.get('link-btn')
					,
					d = b.get('leave-btn')
					,
					e = b.get('rand-btn');
				this.Ef = b.get('time-limit-sel');
				this.wf = b.get('score-limit-sel');
				this.Bm = b.get('stadium-name');
				this.Cm = b.get('stadium-pick');
				let f = this;
				this.Cm.onclick = function () {
					class_H.i(f.fq);
				}
				;
				this.Th(b.get('red-list'), this.Sl, a);
				this.Th(b.get('blue-list'), this.Sj, a);
				this.Th(b.get('spec-list'), this.Am, a);
				this.dl(this.Ef, this.cl());
				this.dl(this.wf, this.cl());
				this.Ef.onchange = function () {
					class_E.i(f.jq, f.Ef.selectedIndex);
				}
				;
				this.wf.onchange = function () {
					class_E.i(f.aq, f.wf.selectedIndex);
				}
				;
				this.Dm.onclick = function () {
					class_H.i(f.gq);
				}
				;
				this.Fm.onclick = function () {
					class_H.i(f.hq);
				}
				;
				this.hi.onclick = function () {
					class_H.i(f.Up);
				}
				;
				this.Gn.onclick = function () {
					class_H.i(f.Lp);
				}
				;
				this.Xk.onclick = function () {
					class_E.i(f.iq, !f.Xh);
				}
				;
				this.bm.onclick = function () {
					null != f.je && (f.je(Team.Aa),
						f.je(Team.ga));
				}
				;
				this.Ql.onclick = function () {
					class_H.i(f.Yp);
				}
				;
				c.onclick = function () {
					class_H.i(f.eq);
				}
				;
				d.onclick = function () {
					class_H.i(f.ie);
				}
				;
				e.onclick = function () {
					class_H.i(f.Xp);
				}
				;
				this.Ij(false);
				this.Jj(false);
			}

			Th(a, b, c) {
				class_x.replaceWith(a, b.f);
				let d = this;
				b.vg = function (e, f) {
					class_Ba.i(d.vg, e, f);
				}
				;
				b.je = function (e) {
					class_E.i(d.je, e);
				}
				;
				b.Sp = function (e) {
					class_Ba.i(d.vg, c, e);
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

			zr(a) {
				this.Ql.classList.toggle('active', a);
			}

			D(a, b) {
				this.br != a.mc && (this.br = a.mc,
					this.mc.textContent = a.mc);
				b = null == b ? false : b.cb;
				this.qk != b && (this.f.className = 'room-view' + (b ? ' admin' : ''),
					this.qk = b);
				var c = !b || null != a.M;
				this.Ef.disabled = c;
				this.wf.disabled = c;
				this.Cm.disabled = c;
				c = null != a.M;
				this.Dm.hidden = c;
				this.Fm.hidden = !c;
				this.hi.hidden = !c;
				this.Ef.selectedIndex = a.Ca;
				this.wf.selectedIndex = a.gb;
				this.Bm.textContent = a.T.A;
				this.Bm.classList.toggle('custom', !a.T.Xe());
				let d = a.Tc;
				for (var e = this.Sl, f = a.K, g = [], h = 0; h < f.length;) {
					var k = f[h];
					++h;
					k.ea == Team.ga && g.push(k);
				}
				e.D(g, d, c, b);
				e = this.Sj;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == Team.Aa && g.push(k);
				e.D(g, d, c, b);
				e = this.Am;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == Team.spec && g.push(k);
				e.D(g, d, c, b);
				this.bm.disabled = c;
				this.Xh != a.Tc && this.Ij(a.Tc);
				c && (a = 120 == a.M.Pa,
				this.vl != a && this.Jj(a));
			}

			Ij(a) {
				this.Xh = a;
				this.Xk.innerHTML = this.Xh ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
			}

			Jj(a) {
				this.vl = a;
				this.hi.innerHTML = '<i class=\'icon-pause\'></i>' + (this.vl ? 'Resume (P)' : 'Pause (P)');
			}
		}

		class class_jb {
			constructor(a, b, c, d) {
				this.sh = new Set;
				this.Sf = new Set;
				this.Hg = this.uf = this.nm = false;
				this.Qc = null;
				this.xf = this.aa = '';
				this.hr = 5E4;
				this.gr = 1E4;
				this.vd = new Map;
				this.Fr = a;
				this.fg = b;
				this.Rn = c;
				this.xf = d;
				null == this.xf && (this.xf = '');
				this.Mi();
			}

			ja() {
				window.clearTimeout(this.dm);
				window.clearTimeout(this.re);
				this.re = null;
				window.clearInterval(this.yl);
				this.Y.onmessage = null;
				this.Y.onerror = null;
				this.Y.onclose = null;
				this.Y.onopen = null;
				this.Y.close();
				this.Y = null;
				this.Ak();
			}

			Ii(a) {
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
					null != this.Y && 1 == this.Y.readyState && null == this.re && (this.Di(),
						this.re = window.setTimeout(function () {
							b.re = null;
							1 == b.Y.readyState && b.Hg && b.Di();
						}, 1E4));
				}
			}

			Hi(a) {
				function b() {
					null != c.Y && 1 == c.Y.readyState && c.uf != c.nm && c.mm();
					c.am = null;
				}

				this.uf = a;
				let c = this;
				null == this.am && (b(),
					this.am = window.setTimeout(b, 1E3));
			}

			Mi(a) {
				function b(e) {
					e = e.sitekey;
					if (null == e)
						throw GlobalError.B(null);
					null != d.nf && d.nf(e, function (f) {
						d.Mi(f);
					});
				}

				function c(e) {
					let f = e.url;
					if (null == f)
						throw GlobalError.B(null);
					e = e.token;
					if (null == e)
						throw GlobalError.B(null);
					d.Y = new WebSocket(f + '?token=' + e);
					d.Y.binaryType = 'arraybuffer';
					d.Y.onopen = function () {
						d.ap();
					}
					;
					d.Y.onclose = function (g) {
						d.Mh(4001 != g.code);
					}
					;
					d.Y.onerror = function () {
						d.Mh(true);
					}
					;
					d.Y.onmessage = createHandlerFromInstance(d, d.Ph);
				}

				null == a && (a = '');
				let d = this;
				class_Z.Jl(this.Fr, 'token=' + this.xf + '&rcr=' + a, class_Z.zj).then(function (e) {
					switch (e.action) {
						case 'connect':
							c(e);
							break;
						case 'recaptcha':
							b(e);
					}
				}).catch(function () {
					d.Mh(true);
				});
			}

			ap() {
				null != this.Qc && this.Di();
				0 != this.uf && this.mm();
				let a = this;
				this.yl = window.setInterval(function () {
					a.Ci();
				}, 4E4);
			}

			Ph(a) {
				a = new class_J(new DataView(a.data), false);
				switch (a.C()) {
					case 1:
						this.Oh(a);
						break;
					case 4:
						this.Nh(a);
						break;
					case 5:
						this.Wo(a);
						break;
					case 6:
						this.Zo(a);
				}
			}

			Oh(a) {
				let b = a.fb(),
					c = StringOpsLimit.ks(a.qb(a.C())),
					d,
					e,
					f;
				try {
					a = new class_J(new DataView(pako.inflateRaw(a.qb()).buffer), false);
					d = 0 != a.C();
					e = a.lc();
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
				this.$o(b, c, e, f, a, d);
			}

			$o(a, b, c, d, e, f) {
				if (16 <= this.vd.size)
					this.zf(a, 4104);
				else if (this.sh.has(b))
					this.zf(a, 4102);
				else {
					for (var g = [], h = 0; h < d.length;) {
						let n = class_jb.Fk(d[h++]);
						if (null != n) {
							if (this.Sf.has(n)) {
								this.zf(a, 4102);
								return;
							}
							g.push(n);
						}
					}
					if (null != this.ek && (h = new class_J(e.s),
						h.a = e.a,
						e = this.ek(b, h),
					1 == e.lb)) {
						this.zf(a, e.reason);
						return;
					}
					var k = new class_Sa(a, this.fg, this.Rn);
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
						null != l.ll && l.ll(new class_Tb(k));
					}
					;
					k.ei = function (n) {
						l.Ei(k, n, k.eg, null);
						k.Sh.then(function () {
							l.Rc(0, k, null);
						});
						k.sg = function (r) {
							l.Bi(k, r);
						};
					}
					;
					k.Pi();
					k.mo(new RTCSessionDescription({
						sdp: c,
						type: 'offer'
					}), d);
				}
			}

			Nh(a) {
				let b = a.fb(),
					c;
				try {
					a = new class_J(new DataView(pako.inflateRaw(a.qb()).buffer), false),
						c = new RTCIceCandidate(a.Eg());
				}
				catch (d) {
					return;
				}
				this.Vo(b, c);
			}

			Vo(a, b) {
				a = this.vd.get(a);
				if (null != a) {
					let c = class_jb.Fk(b);
					if (null != c && (a.ve.push(c),
						this.Sf.has(c)))
						return;
					a.Fj(b);
				}
			}

			Wo(a) {
				this.aa = a.oe(a.C());
				null != this.tg && this.tg(this.aa);
			}

			Zo(a) {
				this.xf = a.oe(a.s.byteLength - a.a);
			}

			Rc(a, b, c) {
				if (!b.rl) {
					0 == a && (b.rl = true);
					var d = b.aa;
					b = StreamWriter.ia(32, false);
					b.l(a);
					b.rb(d);
					null != c && (a = pako.deflateRaw(c.Vb()),
						b.Xb(a));
					this.Y.send(b.Nd());
				}
			}

			zf(a, b) {
				let c = StreamWriter.ia(16, false);
				c.l(0);
				c.rb(a);
				c.Wb(b);
				this.Y.send(c.Nd());
			}

			Ci() {
				let a = StreamWriter.ia(1, false);
				a.l(8);
				this.Y.send(a.Nd());
			}

			Di() {
				this.Hg = false;
				let a = StreamWriter.ia(256, false);
				a.l(7);
				null != this.Qc && a.Sg(this.Qc);
				this.Y.send(a.Nd());
			}

			mm() {
				let a = StreamWriter.ia(2, false);
				a.l(9);
				a.l(this.uf ? 1 : 0);
				this.Y.send(a.Nd());
				this.nm = this.uf;
			}

			Ei(a, b, c, d) {
				let e = StreamWriter.ia(32, false);
				e.pc(b.sdp);
				e.Tg(c);
				null != d && e.Xb(d.Vb());
				this.Rc(1, a, e);
			}

			Bi(a, b) {
				let c = StreamWriter.ia(32, false);
				c.Tg(b);
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

			Mh(a) {
				this.Ak();
				window.clearTimeout(this.re);
				this.re = null;
				this.Hg = false;
				window.clearInterval(this.yl);
				window.clearTimeout(this.dm);
				let b = this;
				a && (this.dm = window.setTimeout(function () {
					b.Mi();
				}, this.gr + Math.random() * this.hr | 0));
			}

			In(a) {
				let b = 0
					,
					c = a.ve;
				for (; b < c.length;)
					this.Sf.add(c[b++]);
				null != a.od && this.sh.add(a.od);
				return {
					$s: a.ve,
					Ys: a.od
				};
			}

			Zd() {
				this.Sf.clear();
				this.sh.clear();
			}

			static Fk(a) {
				try {
					let b = class_Gc.qf(a.candidate);
					if ('srflx' == b.Sr)
						return b.gp;
				}
				catch (b) {
				}
				return null;
			}
		}

		class class_kb {
			constructor() {
				this.xl = new class_kc;
				this.f = class_x.Fa(class_kb.O);
				let a = class_x.Da(this.f);
				this.Ag = a.get('ping');
				this.Fo = a.get('fps');
				class_x.replaceWith(a.get('graph'), this.xl.f);
			}

			yr(a, b) {
				this.Ag.textContent = 'Ping: ' + a + ' - ' + b;
			}

			rm(a) {
				this.Fo.textContent = 'Fps: ' + a;
			}
		}

		class class_lb {
			constructor() {
				this.hg = false;
				this.A = '';
				this.th = 0;
				this.Tf = '';
				this.ib = new TeamColors;
				let a = window.document.createElement('canvas');
				a.width = 64;
				a.height = 64;
				this.pb = a.getContext('2d', null);
				this.Pj = this.pb.createPattern(this.pb.canvas, 'no-repeat');
				this.po();
			}

			po() {
				let a = window.document.createElement('canvas');
				a.width = 160;
				a.height = 34;
				this.Fl = a.getContext('2d', null);
			}

			Xr() {
				let a = this.Fl;
				a.resetTransform();
				a.clearRect(0, 0, 160, 34);
				a.font = '26px sans-serif';
				a.fillStyle = 'white';
				160 < a.measureText(this.A).width ? (a.textAlign = 'left',
					a.translate(2, 29)) : (a.textAlign = 'center',
					a.translate(80, 29));
				a.fillText(this.A, 0, 0);
			}

			Bo(a, b, c) {
				a.drawImage(this.Fl.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17);
			}

			D(a, b) {
				if (null != a.J) {
					let c = ConnectionConstants.m.Hm.H() ? b.ib[a.ea.aa] : a.ea.Gm
						,
						d = null != a.Pd ? a.Pd : a.Zb
						,
						e = ConnectionConstants.m.vm.H() && null != d;
					if (!class_lb.Un(this.ib, c) || !e && a.Kb != this.th || e && this.Tf != d)
						class_lb.lo(this.ib, c),
							e ? (this.Tf = d,
								this.th = -1) : (this.Tf = '' + a.Kb,
								this.th = a.Kb),
							this.Pq(this.Tf);
				}
				this.uo = 0 < b.M.Pa || !a.Yb ? 'black' : a.Yb && 0 >= a.Xc && 0 <= a.Bc ? 'white' : 'black';
				a.A != this.A && (this.A = a.A,
					this.Xr());
			}

			Pq(a) {
				let b = this.ib.eb;
				if (!(1 > b.length)) {
					this.pb.save();
					this.pb.translate(32, 32);
					this.pb.rotate(3.141592653589793 * this.ib.pd / 128);
					for (var c = -32, d = 64 / b.length, e = 0; e < b.length;)
						this.pb.fillStyle = class_W.oc(b[e++]),
							this.pb.fillRect(c, -32, d + 4, 64),
							c += d;
					this.pb.restore();
					this.pb.fillStyle = class_W.oc(this.ib.ld);
					this.pb.textAlign = 'center';
					this.pb.textBaseline = 'alphabetic';
					this.pb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
					this.pb.fillText(a, 32, 44);
					this.Pj = this.pb.createPattern(this.pb.canvas, 'no-repeat');
				}
			}

			static Un(a, b) {
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

			static lo(a, b) {
				a.pd = b.pd;
				a.ld = b.ld;
				a.eb = b.eb.slice(0);
			}
		}

		class class_ra {
		}

		class class_Hc {
			static Lr(a, b) {
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

		class class_Bc {
			static qf(a) {
				let b = new class_lc('([^&=]+)=?([^&]*)', 'g');
				a = a.substring(1);
				var c = 0;
				let d = new Map;
				for (; b.zs(a, c);) {
					c = b.en(1);
					c = decodeURIComponent(c.split('+').join(' '));
					let e = b.en(2);
					d.set(c, decodeURIComponent(e.split('+').join(' ')));
					c = b.As();
					c = c.pj + c.xs;
				}
				return d;
			}

			static H() {
				return class_Bc.qf(window.top.location.search);
			}
		}

		class class_Cc {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_Ub {
		}

		class class_Ta {
			constructor(a, b) {
				this.f = class_x.Fa(class_Ta.O);
				let c = class_x.Da(this.f);
				this.Jp = c.get('ok');
				let d = this;
				this.Jp.onclick = function () {
					class_H.i(d.Ua);
				}
				;
				this.Yl = c.get('replay');
				let e = null != b;
				this.Yl.hidden = !e;
				e && (this.Yl.onclick = function () {
						ConnFa.hm(b);
					}
				);
				c.get('reason').textContent = a;
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
					K = mb.No(y);
					let da = 0;
					for (; da < K.length;) {
						let T = K[da];
						++da;
						let mc = window.document.createElement('div');
						var R = T;
						T.startsWith('Key') && (R = class_P.substr(T, 3, null));
						mc.textContent = R;
						F.appendChild(mc);
						R = window.document.createElement('i');
						R.className = 'icon-cancel';
						R.onclick = function () {
							mb.Rq(T);
							ConnectionConstants.m.Cg.Ma(mb);
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
							null == mb.H(T) && (mb.Qa(T, y),
								ConnectionConstants.m.Cg.Ma(mb),
								Dc());
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
							F.classList.add('f-' + K.sb);
						}
						catch (da) {
						}
						y.textContent = K.sb.toUpperCase();
					}
				}

				function d() {
					let y = ConnectionConstants.m.wh.H();
					L.textContent = '' + y;
					N.value = '' + y;
				}

				function e() {
					let y = ConnectionConstants.m.xh.H();
					t.textContent = '' + y;
					z.value = '' + y;
				}

				function f(y, F, K, da) {
					let R = l.get(y);
					y = F.H();
					R.selectedIndex = da(y);
					R.onchange = function () {
						F.Ma(K(R.selectedIndex));
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
						let T = !F.H();
						F.Ma(T);
						da(T);
						null != K && K(T);
					}
					;
					da(F.H());
				}

				function h(y) {
					let F = {
						Tm: l.get(y + 'btn'),
						ih: l.get(y + 'sec')
					};
					n.push(F);
					F.Tm.onclick = function () {
						k(F);
					};
				}

				function k(y) {
					let F = 0
						,
						K = 0;
					for (; K < n.length;) {
						let da = n[K];
						++K;
						let R = da == y;
						R && (class_la.jm = F);
						da.ih.classList.toggle('selected', R);
						da.Tm.classList.toggle('selected', R);
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
				k(n[class_la.jm]);
				g('tsound-main', ConnectionConstants.m.zm, function (y) {
					ConnectionConstants.Na.sm(y ? 1 : 0);
				});
				g('tsound-chat', ConnectionConstants.m.Ki);
				g('tsound-highlight', ConnectionConstants.m.ym);
				g('tsound-crowd', ConnectionConstants.m.xm);
				f('viewmode', ConnectionConstants.m.Ib, function (y) {
					return 0 == y ? -1 : y;
				}, function (y) {
					return 0 >= y ? 0 : y;
				});
				f('fps', ConnectionConstants.m.Gh, function (y) {
					return y;
				}, function (y) {
					return y;
				});
				let r = [1, .75, .5, .25];
				f('resscale', ConnectionConstants.m.yi, function (y) {
					return r[y];
				}, function (y) {
					let F = 0
						,
						K = r.length - 1;
					for (; F < K && !(r[F] <= y);)
						++F;
					return F;
				});
				g('tvideo-teamcol', ConnectionConstants.m.Hm);
				g('tvideo-showindicators', ConnectionConstants.m.Kk);
				g('tvideo-showavatars', ConnectionConstants.m.vm);
				let t = l.get('chatopacity-value')
					,
					z = l.get('chatopacity-range');
				e();
				z.oninput = function () {
					ConnectionConstants.m.xh.Ma(parseFloat(z.value));
					e();
				}
				;
				let L = l.get('chatfocusheight-value')
					,
					N = l.get('chatfocusheight-range');
				d();
				N.oninput = function () {
					ConnectionConstants.m.wh.Ma(class_Q.parseInt(N.value));
					d();
				}
				;
				f('chatbgmode', ConnectionConstants.m.$j, function (y) {
					return 0 == y ? 'full' : 'compact';
				}, function (y) {
					return 'full' == y ? 0 : 1;
				});
				let nb = null
					,
					Ic = this;
				nb = function () {
					let y = ConnectionConstants.m.Ve.H();
					c('loc', 'Detected location', ConnectionConstants.m.Ue.H());
					c('loc-ovr', 'Location override', y);
					let F = l.get('loc-ovr-btn');
					F.disabled = !a;
					null == y ? (F.textContent = 'Override location',
							F.onclick = function () {
								class_H.i(Ic.Mp);
							}
					) : (F.textContent = 'Remove override',
							F.onclick = function () {
								ConnectionConstants.m.Ve.Ma(null);
								nb();
							}
					);
				}
				;
				nb();
				let mb = ConnectionConstants.m.Cg.H()
					,
					nc = l.get('presskey')
					,
					Dc = null
					,
					ob = l.get('inputsec');
				Dc = function () {
					class_x.Jf(ob);
					ob.appendChild(b('Up'));
					ob.appendChild(b('Down'));
					ob.appendChild(b('Left'));
					ob.appendChild(b('Right'));
					ob.appendChild(b('Kick'));
				}
				;
				Dc();
				this.ud.onclick = function () {
					class_H.i(Ic.ob);
				};
			}
		}

		class class_Vb {
			constructor(a) {
				this.Cs = a;
				this.Za = [];
			}

			add(a) {
				var b = this.Za.length;
				let c = 0
					,
					d = this.Vd = 0;
				for (; d < b;) {
					let e = d++
						,
						f = this.Za[e];
					f.index++;
					f.weight *= .97;
					this.Za[c].index < f.index && (c = e);
					this.Vd += f.weight;
				}
				b >= this.Cs ? (b = this.Za[c],
					this.Vd -= b.weight,
					this.Za.splice(c, 1)) : b = new class_oc;
				b.value = a;
				b.weight = 1;
				b.index = 0;
				this.Vd += b.weight;
				for (a = 0; a < this.Za.length && this.Za[a].value <= b.value;)
					++a;
				this.Za.splice(a, 0, b);
			}

			gh() {
				if (0 == this.Za.length)
					return 0;
				if (1 == this.Za.length)
					return this.Za[0].value;
				var a = .5 * this.Vd;
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

		class class_Ga {
		}

		class class_pc {
			constructor(a, b) {
				this.fn = 0;
				this.version = 1;
				this.hh = 0;
				this.Sd = StreamWriter.ia(1E3);
				this.Kf = StreamWriter.ia(16384);
				this.version = b;
				let c = this.hh = a.Z;
				this.lj = a;
				a.U.fa(this.Kf);
				let d = this;
				a.ic = function (f) {
					let g = a.Z;
					d.Kf.jb(g - c);
					c = g;
					d.Kf.Wb(f.R);
					class_m.oj(f, d.Kf);
				}
				;
				this.Sd.Wb(0);
				let e = this.hh;
				a.U.um(function (f) {
					let g = a.Z;
					d.Sd.jb(g - e);
					d.Sd.l(f);
					d.fn++;
					e = g;
				});
			}

			stop() {
				this.lj.ic = null;
				this.lj.U.um(null);
				this.Sd.s.setUint16(0, this.fn, this.Sd.Sa);
				this.Sd.Xb(this.Kf.Vb());
				let a = pako.deflateRaw(this.Sd.Vb())
					,
					b = StreamWriter.ia(a.byteLength + 32);
				b.Ug('HBR2');
				b.rb(this.version);
				b.rb(this.lj.Z - this.hh);
				b.Xb(a);
				return b.Vb();
			}
		}

		class class_Gc {
			static qf(a) {
				a = a.split(' ');
				let b = a[4];
				if ('typ' != a[6])
					throw GlobalError.B(null);
				return {
					Sr: a[7],
					gp: b
				};
			}
		}

		class class_qc {
			constructor() {
			}
		}

		class class_pb {
			constructor() {
				this.hb = null;
				this.f = class_x.Fa(class_pb.O);
				let a = class_x.Da(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.di);
				}
				;
				this.ii = a.get('pick');
				this.lk = a.get('delete');
				this.Bk = a.get('export');
				let c = a.get('list')
					,
					d = a.get('file');
				this.Rg();
				this.ii.onclick = function () {
					null != b.hb && b.hb.Ud().then(function (e) {
						class_E.i(b.xg, e);
					});
				}
				;
				this.lk.onclick = function () {
					if (null != b.hb) {
						var e = b.hb.Um;
						null != e && (b.hb.Ha.remove(),
							b.hb = null,
							e(),
							b.Rg());
					}
				}
				;
				this.Bk.onclick = function () {
					null != b.hb && b.hb.Ud().then(function (e) {
						class_Pb.jr(e.ye(), e.A + '.hbs');
					});
				}
				;
				this.li(c);
				this.Ml = class_qb.Zh(c);
				window.setTimeout(function () {
					b.Ml.update();
				}, 0);
				d.onchange = function () {
					var e = d.files;
					if (!(1 > e.length)) {
						e = e.item(0);
						var f = new FileReader;
						f.onload = function () {
							try {
								var g = f.result;
								let h = new Stadium;
								h.Vk(g);
								class_E.i(b.xg, h);
							}
							catch (h) {
								g = GlobalError.Jb(h).Db(),
									g instanceof SyntaxError ? class_E.i(b.gi, 'SyntaxError in line: ' + class_Q.De(g.lineNumber)) : g instanceof class_Qb ? class_E.i(b.gi, g.Fp) : class_E.i(b.gi, 'Error loading stadium file.');
							}
						}
						;
						f.readAsText(e);
					}
				};
			}

			Rg() {
				this.ii.disabled = null == this.hb;
				this.lk.disabled = null == this.hb || null == this.hb.Um;
				this.Bk.disabled = null == this.hb;
			}

			bl(a, b, c) {
				let d = window.document.createElement('div');
				d.textContent = a;
				d.className = 'elem';
				null != c && d.classList.add('custom');
				let e = {
						Ha: d,
						Ud: b,
						Um: c
					}
					,
					f = this;
				d.onclick = function () {
					null != f.hb && f.hb.Ha.classList.remove('selected');
					f.hb = e;
					d.classList.add('selected');
					f.Rg();
				}
				;
				d.ondblclick = function () {
					f.hb = e;
					f.Rg();
					return f.ii.onclick();
				}
				;
				return d;
			}

			li(a) {
				let b = Stadium.Kh()
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
				class_gb.getAll().then(function (e) {
					let f = 0;
					for (; f < e.length;) {
						let g = e[f];
						++f;
						let h = g.id;
						a.appendChild(d.bl(g.name, function () {
							return class_gb.get(h);
						}, function () {
							return class_gb.delete(h);
						}));
					}
					d.Ml.update();
				});
			}
		}

		class Stadium {
			constructor() {
				/** @type {Vertex[]} */
				this.L = [];
				/** @type {Segment[]} */
				this.V = [];
				/** @type {Plane[]} */
				this.qa = [];
				/** @type {Goal[]} */
				this.wc = [];
				/** @type {Disc[]} */
				this.G = [];
				/** @type {[]} */
				this.nb = [];
				/** @type {Point[]} */
				this.Kd = [];
				/** @type {Point[]} */
				this.td = [];
				this.le = new PlayerPhysics;
				this.Ch = 255;
				this.ff = 0;
				this.Oe = 0;
				this.Vf = true;
				this.vf = false;
			}

			mg() {
				let a = new Disc;
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
				a.l(this.Ch);
				if (!this.Xe()) {
					a.Cb(this.A);
					a.P(this.sd);
					a.u(this.Yd);
					a.u(this.Xd);
					a.u(this.rd);
					a.u(this.Zc);
					a.u(this.Ne);
					a.P(this.qd);
					a.u(this.bc);
					a.u(this.tc);
					a.u(this.nc);
					this.le.fa(a);
					a.Wb(this.ff);
					a.l(this.Oe);
					a.l(this.Vf ? 1 : 0);
					a.l(this.vf ? 1 : 0);
					a.l(this.L.length);
					for (var b = 0, c = this.L.length; b < c;) {
						var d = b++;
						let e = this.L[d];
						e.Bd = d;
						e.fa(a);
					}
					a.l(this.V.length);
					b = 0;
					for (c = this.V; b < c.length;)
						c[b++].fa(a);
					a.l(this.qa.length);
					b = 0;
					for (c = this.qa; b < c.length;)
						c[b++].fa(a);
					a.l(this.wc.length);
					b = 0;
					for (c = this.wc; b < c.length;)
						c[b++].fa(a);
					a.l(this.G.length);
					b = 0;
					for (c = this.G; b < c.length;)
						c[b++].fa(a);
					a.l(this.nb.length);
					b = 0;
					for (c = this.nb; b < c.length;)
						c[b++].fa(a);
					a.l(this.Kd.length);
					b = 0;
					for (c = this.Kd; b < c.length;)
						d = c[b],
							++b,
							a.u(d.x),
							a.u(d.y);
					a.l(this.td.length);
					b = 0;
					for (c = this.td; b < c.length;)
						d = c[b],
							++b,
							a.u(d.x),
							a.u(d.y);
				}
			}

			Tr(a) {
				function b() {
					let f = []
						,
						g = a.C()
						,
						h = 0;
					for (; h < g;) {
						++h;
						let k = new Point(0, 0);
						k.x = a.v();
						k.y = a.v();
						f.push(k);
					}
					return f;
				}

				this.A = a.yb();
				this.sd = a.N();
				this.Yd = a.v();
				this.Xd = a.v();
				this.rd = a.v();
				this.Zc = a.v();
				this.Ne = a.v();
				this.qd = a.N();
				this.bc = a.v();
				this.tc = a.v();
				this.nc = a.v();
				this.le.ka(a);
				this.ff = a.Rb();
				this.Oe = a.C();
				this.Vf = 0 != a.C();
				this.vf = 0 != a.C();
				this.L = [];
				for (var c = a.C(), d = 0; d < c;) {
					var e = new Vertex;
					e.ka(a);
					e.Bd = d++;
					this.L.push(e);
				}
				this.V = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new Segment,
						e.ka(a, this.L),
						this.V.push(e);
				this.qa = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new Plane,
						e.ka(a),
						this.qa.push(e);
				this.wc = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new Goal,
						e.ka(a),
						this.wc.push(e);
				this.G = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new Disc,
						e.ka(a),
						this.G.push(e);
				this.nb = [];
				c = a.C();
				for (d = 0; d < c;)
					++d,
						e = new Joint,
						e.ka(a),
						this.nb.push(e);
				this.Kd = b();
				this.td = b();
				this.me();
			}

			me() {
				let a = 0
					,
					b = this.V;
				for (; a < b.length;)
					b[a++].me();
			}

			Xe() {
				return 255 != this.Ch;
			}

			ge(a, b) {
				a = a[b];
				return null != a ? class_w.I(a, D) : 0;
			}

			xp(a) {
				a = a.canBeStored;
				return null != a ? class_w.I(a, Ec) : true;
			}

			ye() {
				return JSON.stringify(this.Pr());
			}

			Pr() {
				if (!this.Vf) {
					//throw GlobalError.B(0); // disabled canBeStored check
					console.debug(this.A + ' canBeStored bypassed');
				}
				let a = {};
				for (var b = 0, c = [], d = 0, e = this.L; d < e.length;) {
					var f = e[d];
					++d;
					f.Bd = b++;
					c.push(Stadium.cs(f));
				}
				d = new Segment;
				b = [];
				e = 0;
				for (f = this.V; e < f.length;)
					b.push(Stadium.nr(f[e++], d));
				d = [];
				e = 0;
				for (f = this.qa; e < f.length;)
					d.push(Stadium.oq(f[e++]));
				e = [];
				f = 0;
				for (var g = this.wc; f < g.length;)
					e.push(Stadium.So(g[f++]));
				f = Stadium.rq(this.le);
				var h = new Disc;
				g = [];
				for (var k = 0, l = this.G; k < l.length;)
					g.push(Stadium.vo(l[k++], h));
				h = [];
				k = 0;
				for (l = this.nb; k < l.length;)
					h.push(Stadium.kp(l[k++]));
				k = [];
				l = 0;
				for (var n = this.Kd; l < n.length;) {
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
					height: this.tc,
					bg: a,
					vertexes: c,
					segments: b,
					planes: d,
					goals: e,
					discs: g,
					playerPhysics: f,
					ballPhysics: 'disc0'
				};
				Stadium.la(c, 'maxViewWidth', this.ff, 0);
				Stadium.la(c, 'cameraFollow', 1 == this.Oe ? 'player' : '', '');
				Stadium.la(c, 'spawnDistance', this.nc, 200);
				0 != h.length && (c.joints = h);
				0 != k.length && (c.redSpawnPoints = k);
				0 != l.length && (c.blueSpawnPoints = l);
				Stadium.la(c, 'kickOffReset', this.vf ? 'full' : 'partial', 'partial');
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
				Stadium.la(a, 'type', b, 'none');
				Stadium.la(a, 'width', this.Yd, 0);
				Stadium.la(a, 'height', this.Xd, 0);
				Stadium.la(a, 'kickOffRadius', this.rd, 0);
				Stadium.la(a, 'cornerRadius', this.Zc, 0);
				Stadium.zg(a, this.qd, 7441498);
				Stadium.la(a, 'goalLine', this.Ne, 0);
				return c;
			}

			Vk(a) {
				function b(h) {
					let k = class_w.I(h[0], D);
					h = class_w.I(h[1], D);
					null == h && (h = 0);
					null == k && (k = 0);
					return new Point(k, h);
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
									Stadium.Fn(t, f),
										h.push(l(t));
								}
								catch (z) {
									throw GlobalError.B(new class_Qb('Error in "' + k + '" index: ' + h.length));
								}
							}
				}

				let d = JSON5.parse(a);
				this.L = [];
				this.V = [];
				this.qa = [];
				this.wc = [];
				this.G = [];
				this.nb = [];
				this.A = class_w.I(d.name, String);
				this.bc = class_w.I(d.width, D);
				this.tc = class_w.I(d.height, D);
				this.ff = this.ge(d, 'maxViewWidth') | 0;
				'player' == d.cameraFollow && (this.Oe = 1);
				this.nc = 200;
				a = d.spawnDistance;
				null != a && (this.nc = class_w.I(a, D));
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
				this.Yd = this.ge(a, 'width');
				this.Xd = this.ge(a, 'height');
				this.rd = this.ge(a, 'kickOffRadius');
				this.Zc = this.ge(a, 'cornerRadius');
				this.qd = 7441498;
				null != a.color && (this.qd = Stadium.kg(a.color));
				this.Ne = this.ge(a, 'goalLine');
				this.Vf = this.xp(d);
				this.vf = 'full' == d.kickOffReset;
				let f = d.traits;
				a = d.ballPhysics;
				'disc0' != a && (null != a ? (a = Stadium.Wk(a, this.mg()),
					a.w |= 192,
					this.G.push(a)) : this.G.push(this.mg()));
				c(this.L, 'vertexes', Stadium.wp);
				let g = this;
				c(this.V, 'segments', function (h) {
					return Stadium.vp(h, g.L);
				});
				c(this.wc, 'goals', Stadium.rp);
				c(this.G, 'discs', function (h) {
					return Stadium.Wk(h, new Disc);
				});
				c(this.qa, 'planes', Stadium.tp);
				c(this.nb, 'joints', function (h) {
					return Stadium.sp(h, g.G);
				}, true);
				c(this.Kd, 'redSpawnPoints', b, true);
				c(this.td, 'blueSpawnPoints', b, true);
				a = d.playerPhysics;
				null != a && (this.le = Stadium.up(a));
				if (255 < this.L.length || 255 < this.V.length || 255 < this.qa.length || 255 < this.wc.length || 255 < this.G.length)
					throw GlobalError.B('Error');
				this.me();
			}

			bk() {
				let a = Stadium.Nr;
				a.a = 0;
				this.fa(a);
				let b = new class_jc;
				b.js(a.Vb());
				b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
				b.hash += b.hash << 15;
				return b.hash | 0;
			}

			Tn(a, b) {
				let c = 0
					,
					d = this.wc;
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
				return Team.spec;
			}

			fd(a, b, c, d, e, f, g, h) {
				null == h && (h = 0);
				this.A = a;
				this.G.push(this.mg());
				this.bc = b;
				this.tc = c;
				this.sd = 1;
				this.qd = 7441498;
				this.Yd = d;
				this.Xd = e;
				this.rd = g;
				this.Zc = h;
				this.nc = .75 * d;
				400 < this.nc && (this.nc = 400);
				a = new Plane;
				var k = a.wa;
				k.x = 0;
				k.y = 1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 0;
				k.y = -1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = -1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				this.ng(d, 1, f, 13421823, Team.Aa);
				this.ng(-d, -1, f, 16764108, Team.ga);
				this.al(g, c);
				b = new Plane;
				c = b.wa;
				c.x = 0;
				c.y = 1;
				b.Ta = -e;
				b.h = 1;
				this.qa.push(b);
				b = new Plane;
				c = b.wa;
				c.x = 0;
				c.y = -1;
				b.Ta = -e;
				b.h = 1;
				this.qa.push(b);
				b = new Vertex;
				c = b.a;
				c.x = -d;
				c.y = -e;
				b.h = 0;
				c = new Vertex;
				g = c.a;
				g.x = d;
				g.y = -e;
				c.h = 0;
				g = new Vertex;
				a = g.a;
				a.x = d;
				a.y = -f;
				g.h = 0;
				a = new Vertex;
				k = a.a;
				k.x = d;
				k.y = f;
				a.h = 0;
				k = new Vertex;
				var l = k.a;
				l.x = d;
				l.y = e;
				k.h = 0;
				l = new Vertex;
				var n = l.a;
				n.x = -d;
				n.y = e;
				l.h = 0;
				n = new Vertex;
				var r = n.a;
				r.x = -d;
				r.y = f;
				n.h = 0;
				r = new Vertex;
				var t = r.a;
				t.x = -d;
				t.y = -f;
				r.h = 0;
				f = new Segment;
				f.X = c;
				f.da = g;
				f.h = 1;
				f.Ya = false;
				t = new Segment;
				t.X = a;
				t.da = k;
				t.h = 1;
				t.Ya = false;
				let z = new Segment;
				z.X = l;
				z.da = n;
				z.h = 1;
				z.Ya = false;
				let L = new Segment;
				L.X = r;
				L.da = b;
				L.h = 1;
				L.Ya = false;
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
				this.V.push(L);
				this.Zk(d, e, h);
				this.me();
			}

			$k(a, b, c, d, e, f, g, h) {
				this.A = a;
				this.G.push(this.mg());
				this.bc = b;
				this.tc = c;
				this.sd = 2;
				this.Yd = d;
				this.Xd = e;
				this.rd = 75;
				this.Zc = h;
				this.Ne = g;
				this.nc = .75 * (d - g);
				400 < this.nc && (this.nc = 400);
				a = new Plane;
				var k = a.wa;
				k.x = 0;
				k.y = 1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 0;
				k.y = -1;
				a.Ta = -c;
				a.o = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = -1;
				k.y = 0;
				a.Ta = -b;
				a.o = 0;
				this.qa.push(a);
				this.ng(d - g, 1, f, 13421823, Team.Aa, 63);
				this.ng(-d + g, -1, f, 16764108, Team.ga, 63);
				this.al(75, c);
				b = new Plane;
				c = b.wa;
				c.x = 0;
				c.y = 1;
				b.Ta = -e;
				b.h = 1;
				this.qa.push(b);
				b = new Plane;
				c = b.wa;
				c.x = 0;
				c.y = -1;
				b.Ta = -e;
				b.h = 1;
				this.qa.push(b);
				b = new Plane;
				c = b.wa;
				c.x = 1;
				c.y = 0;
				b.Ta = -d;
				b.h = 1;
				this.qa.push(b);
				b = new Plane;
				c = b.wa;
				c.x = -1;
				c.y = 0;
				b.Ta = -d;
				b.h = 1;
				this.qa.push(b);
				this.Zk(d, e, h);
				this.me();
			}

			ng(a, b, c, d, e, f) {
				var g;
				null == g && (g = 32);
				null == f && (f = 1);
				var h = new Vertex
					,
					k = h.a;
				k.x = a + 8 * b;
				k.y = -c;
				k = new Vertex;
				var l = k.a;
				l.x = a + 8 * b;
				l.y = c;
				let n = new Vertex;
				l = n.a;
				l.x = h.a.x + 22 * b;
				l.y = h.a.y + 22;
				let r = new Vertex;
				l = r.a;
				l.x = k.a.x + 22 * b;
				l.y = k.a.y - 22;
				l = new Segment;
				l.X = h;
				l.da = n;
				l.Sc(90 * b);
				let t = new Segment;
				t.X = r;
				t.da = n;
				let z = new Segment;
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
				f = new Disc;
				g = f.a;
				g.x = a;
				g.y = -c;
				f.ba = 0;
				f.$ = 8;
				f.S = d;
				this.G.push(f);
				f = new Disc;
				g = f.a;
				g.x = a;
				g.y = c;
				f.ba = 0;
				f.$ = 8;
				f.S = d;
				this.G.push(f);
				d = new Goal;
				f = d.X;
				f.x = a;
				f.y = -c;
				f = d.da;
				f.x = a;
				f.y = c;
				d.we = e;
				this.wc.push(d);
			}

			al(a, b) {
				let c = new Vertex;
				var d = c.a;
				d.x = 0;
				d.y = -b;
				c.o = .1;
				c.w = 24;
				c.h = 6;
				d = new Vertex;
				var e = d.a;
				e.x = 0;
				e.y = -a;
				d.o = .1;
				d.w = 24;
				d.h = 6;
				e = new Vertex;
				var f = e.a;
				f.x = 0;
				f.y = a;
				e.o = .1;
				e.w = 24;
				e.h = 6;
				a = new Vertex;
				f = a.a;
				f.x = 0;
				f.y = b;
				a.o = .1;
				a.w = 24;
				a.h = 6;
				b = new Segment;
				b.X = c;
				b.da = d;
				b.w = 24;
				b.h = 6;
				b.Ya = false;
				b.o = .1;
				f = new Segment;
				f.X = e;
				f.da = a;
				f.w = 24;
				f.h = 6;
				f.Ya = false;
				f.o = .1;
				let g = new Segment;
				g.X = d;
				g.da = e;
				g.w = 8;
				g.h = 6;
				g.Ya = false;
				g.Sc(180);
				g.o = .1;
				let h = new Segment;
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
					var d = new Vertex
						,
						e = d.a;
					e.x = -a + c;
					e.y = -b;
					d.h = 0;
					e = new Vertex;
					var f = e.a;
					f.x = -a;
					f.y = -b + c;
					e.h = 0;
					f = new Vertex;
					var g = f.a;
					g.x = -a + c;
					g.y = b;
					f.h = 0;
					g = new Vertex;
					var h = g.a;
					h.x = -a;
					h.y = b - c;
					g.h = 0;
					h = new Vertex;
					var k = h.a;
					k.x = a - c;
					k.y = b;
					h.h = 0;
					k = new Vertex;
					var l = k.a;
					l.x = a;
					l.y = b - c;
					k.h = 0;
					l = new Vertex;
					var n = l.a;
					n.x = a - c;
					n.y = -b;
					l.h = 0;
					n = new Vertex;
					var r = n.a;
					r.x = a;
					r.y = -b + c;
					n.h = 0;
					a = new Segment;
					a.X = d;
					a.da = e;
					a.h = 1;
					a.Ya = false;
					a.o = 1;
					a.Sc(-90);
					b = new Segment;
					b.X = f;
					b.da = g;
					b.h = 1;
					b.Ya = false;
					b.o = 1;
					b.Sc(90);
					c = new Segment;
					c.X = h;
					c.da = k;
					c.h = 1;
					c.Ya = false;
					c.o = 1;
					c.Sc(-90);
					r = new Segment;
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
				return 255 == b ? (b = new Stadium,
					b.Tr(a),
					b) : Stadium.Kh()[b];
			}

			static Kh() {
				if (null == Stadium.ub) {
					Stadium.ub = [];
					var a = new Stadium;
					a.fd('Classic', 420, 200, 370, 170, 64, 75);
					Stadium.ub.push(a);
					a = new Stadium;
					a.fd('Easy', 420, 200, 370, 170, 90, 75);
					Stadium.ub.push(a);
					a = new Stadium;
					a.fd('Small', 420, 200, 320, 130, 55, 70);
					Stadium.ub.push(a);
					a = new Stadium;
					a.fd('Big', 600, 270, 550, 240, 80, 80);
					Stadium.ub.push(a);
					a = new Stadium;
					a.fd('Rounded', 420, 200, 370, 170, 64, 75, 75);
					Stadium.ub.push(a);
					a = new Stadium;
					a.$k('Hockey', 420, 204, 398, 182, 68, 120, 100);
					Stadium.ub.push(a);
					a = new Stadium;
					a.$k('Big Hockey', 600, 270, 550, 240, 90, 160, 150);
					Stadium.ub.push(a);
					a = new Stadium;
					a.fd('Big Easy', 600, 270, 550, 240, 95, 80);
					Stadium.ub.push(a);
					a = new Stadium;
					a.fd('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
					Stadium.ub.push(a);
					a = new Stadium;
					a.fd('Huge', 750, 350, 700, 320, 100, 80);
					Stadium.ub.push(a);
					a = 0;
					let b = Stadium.ub.length;
					for (; a < b;) {
						let c = a++;
						Stadium.ub[c].Ch = c;
					}
				}
				return Stadium.ub;
			}

			static Fn(a, b) {
				if (null != a.trait && (b = b[class_w.I(a.trait, String)],
				null != b)) {
					let c = 0
						,
						d = class_Fc.Vm(b);
					for (; c < d.length;) {
						let e = d[c];
						++c;
						null == a[e] && (a[e] = b[e]);
					}
				}
			}

			static Mn(a) {
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
				c != d && (a[b] = Stadium.Mn(c));
			}

			static zg(a, b, c) {
				b != c && (a.color = Stadium.$n(b));
			}

			static $n(a) {
				a |= 0;
				return 0 > a ? 'transparent' : class_Y.ah(a);
			}

			static kg(a) {
				if ('transparent' == a)
					return -1;
				if ('string' == typeof a)
					return class_Q.parseInt('0x' + class_Q.De(a));
				if (a instanceof Array)
					return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
				throw GlobalError.B('Bad color');
			}

			static cs(a) {
				let b = {
					x: a.a.x,
					y: a.a.y
				};
				Stadium.la(b, 'bCoef', a.o, 1);
				Stadium.Nc(b, 'cMask', a.h, 63);
				Stadium.Nc(b, 'cGroup', a.w, 32);
				return b;
			}

			static wp(a) {
				let b = new Vertex;
				b.a.x = class_w.I(a.x, D);
				b.a.y = class_w.I(a.y, D);
				var c = a.bCoef;
				null != c && (b.o = class_w.I(c, D));
				c = a.cMask;
				null != c && (b.h = Stadium.Jc(c));
				a = a.cGroup;
				null != a && (b.w = Stadium.Jc(a));
				return b;
			}

			static nr(a, b) {
				let c = {
					v0: a.X.Bd,
					v1: a.da.Bd
				};
				Stadium.la(c, 'bias', a.Gc, b.Gc);
				Stadium.la(c, 'bCoef', a.o, b.o);
				let d = a.Lo();
				Stadium.la(c, 'curve', d, 0);
				0 != d && (c.curveF = a.tb);
				Stadium.la(c, 'vis', a.Ya, b.Ya);
				Stadium.Nc(c, 'cMask', a.h, b.h);
				Stadium.Nc(c, 'cGroup', a.w, b.w);
				Stadium.zg(c, a.S, b.S);
				return c;
			}

			static vp(a, b) {
				let c = new Segment;
				var d = class_w.I(a.v1, Xb);
				c.X = b[class_w.I(a.v0, Xb)];
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
				null != f ? c.tb = class_w.I(f, D) : null != e && c.Sc(class_w.I(e, D));
				null != g && (c.Ya = class_w.I(g, Ec));
				null != h && (c.h = Stadium.Jc(h));
				null != k && (c.w = Stadium.Jc(k));
				null != a && (c.S = Stadium.kg(a));
				return c;
			}

			static kp(a) {
				let b = {
					d0: a.ce,
					d1: a.de,
					length: a.Gb >= a.hc ? a.Gb : [a.Gb, a.hc]
				};
				Stadium.zg(b, a.S, 0);
				Stadium.la(b, 'strength', a.ue, 1 / 0);
				return b;
			}

			static sp(a, b) {
				let c = new Joint;
				var d = class_w.I(a.d0, Xb)
					,
					e = class_w.I(a.d1, Xb);
				let f = a.color
					,
					g = a.strength;
				a = a.length;
				if (d >= b.length || 0 > d)
					throw GlobalError.B(null);
				if (e >= b.length || 0 > e)
					throw GlobalError.B(null);
				c.ce = d;
				c.de = e;
				null == a ? (d = b[d],
					e = b[e],
					null == d || null == e ? c.hc = c.Gb = 100 : (b = d.a,
						d = e.a,
						e = b.x - d.x,
						b = b.y - d.y,
						c.hc = c.Gb = Math.sqrt(e * e + b * b))) : a instanceof Array ? (c.Gb = class_w.I(a[0], D),
					c.hc = class_w.I(a[1], D)) : c.hc = c.Gb = class_w.I(a, D);
				c.ue = null == g || 'rigid' == g ? 1 / 0 : class_w.I(g, D);
				null != f && (c.S = Stadium.kg(f));
				return c;
			}

			static oq(a) {
				let b = {
					normal: [a.wa.x, a.wa.y],
					dist: a.Ta
				};
				Stadium.la(b, 'bCoef', a.o, 1);
				Stadium.Nc(b, 'cMask', a.h, 63);
				Stadium.Nc(b, 'cGroup', a.w, 32);
				return b;
			}

			static tp(a) {
				let b = new Plane;
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
				null != d && (b.h = Stadium.Jc(d));
				null != a && (b.w = Stadium.Jc(a));
				return b;
			}

			static So(a) {
				return {
					p0: [a.X.x, a.X.y],
					p1: [a.da.x, a.da.y],
					team: a.we == Team.ga ? 'red' : 'blue'
				};
			}

			static rp(a) {
				let b = new Goal;
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
						a = Team.Aa;
						break;
					case 'red':
						a = Team.ga;
						break;
					default:
						throw GlobalError.B('Bad team value');
				}
				b.we = a;
				return b;
			}

			static rq(a) {
				let b = {};
				Stadium.la(b, 'bCoef', a.o, .5);
				Stadium.la(b, 'invMass', a.ba, .5);
				Stadium.la(b, 'damping', a.Ba, .96);
				Stadium.la(b, 'acceleration', a.Ke, .1);
				Stadium.la(b, 'kickingAcceleration', a.af, .07);
				Stadium.la(b, 'kickingDamping', a.bf, .96);
				Stadium.la(b, 'kickStrength', a.Ze, 5);
				Stadium.Nc(b, 'cGroup', a.w, 0);
				if (0 != a.oa.x || 0 != a.oa.y)
					b.gravity = [a.oa.x, a.oa.y];
				Stadium.la(b, 'radius', a.$, 15);
				Stadium.la(b, 'kickback', a.$e, 0);
				return b;
			}

			static up(a) {
				let b = new PlayerPhysics;
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
				null != n && (b.w = Stadium.Jc(n));
				null != r && (b.$ = class_w.I(r, D));
				null != a && (b.$e = class_w.I(a, D));
				return b;
			}

			static vo(a, b) {
				let c = {};
				if (a.a.x != b.a.x || a.a.y != b.a.y)
					c.pos = [a.a.x, a.a.y];
				if (a.F.x != b.F.x || a.F.y != b.F.y)
					c.speed = [a.F.x, a.F.y];
				if (a.oa.x != b.oa.x || a.oa.y != b.oa.y)
					c.gravity = [a.oa.x, a.oa.y];
				Stadium.la(c, 'radius', a.$, b.$);
				Stadium.la(c, 'bCoef', a.o, b.o);
				Stadium.la(c, 'invMass', a.ba, b.ba);
				Stadium.la(c, 'damping', a.Ba, b.Ba);
				Stadium.zg(c, a.S, b.S);
				Stadium.Nc(c, 'cMask', a.h, b.h);
				Stadium.Nc(c, 'cGroup', a.w, b.w);
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
				null != l && (b.S = Stadium.kg(l));
				null != n && (b.h = Stadium.Jc(n));
				null != a && (b.w = Stadium.Jc(a));
				return b;
			}

			static la(a, b, c, d) {
				c != d && (a[b] = c);
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

		class class_tb {
			constructor() {
				this.ee = this.ig = 0;
				window.document.addEventListener('focusout', createHandlerFromInstance(this, this.kl));
			}

			ja() {
				window.document.removeEventListener('focusout', createHandlerFromInstance(this, this.kl));
			}

			D() {
				let a = this.ee;
				if (null != this.wg && a != this.ig) {
					this.ig = a;
					let b = new class_Ha;
					b.input = a;
					this.wg(b);
				}
			}

			Id(a) {
				this.ee |= class_tb.Pk(a);
			}

			Jd(a) {
				this.ee &= ~class_tb.Pk(a);
			}

			kl() {
				if (null != this.wg && 0 != this.ig) {
					this.ig = this.ee = 0;
					let a = new class_Ha;
					a.input = 0;
					this.wg(a);
				}
			}

			static Pk(a) {
				switch (ConnectionConstants.m.Cg.H().H(a)) {
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

		class PlayerPhysics {
			constructor() {
				this.$e = 0;
				this.$ = 15;
				this.w = 0;
				this.oa = new Point(0, 0);
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

		class class_C {
			static vs() {
				try {
					return window.self != window.top;
				}
				catch (a) {
					return true;
				}
			}

			static bh(a) {
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

			static jj(a) {
				class_C.vs() && class_C.qs(function () {
					class_Jc.jj();
					let b = null == ConnectionConstants.m.Ue.H() ? class_ka.Oo().then(function (d) {
							ConnectionConstants.m.Ue.Ma(d);
						}, function () {
						}) : Promise.resolve(null)
						,
						c = class_Z.H('res.dat', 'arraybuffer').then(function (d) {
							d = new JSZip(d);
							ConnectionConstants.Na = new class_rc(d);
							return Promise.all([ConnectionConstants.Na.Ao, class_C.bh(d.file('images/grass.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.To = e;
							}), class_C.bh(d.file('images/concrete.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.eo = e;
							}), class_C.bh(d.file('images/concrete2.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.bo = e;
							}), class_C.bh(d.file('images/typing.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.Nm = e;
							})]);
						});
					Promise.all([c, b]).then(function () {
						class_C.Es(a);
					});
				});
			}

			static qs(a) {
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
					class_C.Vg = window.document.createElement('div'),
					window.document.body.appendChild(class_C.Vg),
					a = new class_ub(d),
					class_C.Ja(a.f)) : a();
			}

			static Es(a) {
				window.document.body.innerHTML = '';
				class_C.Vg = window.document.createElement('div');
				window.document.body.appendChild(class_C.Vg);
				let b = null;
				b = function () {
					ConnectionConstants.Na.cm();
					window.document.removeEventListener('click', b, true);
				}
				;
				window.document.addEventListener('click', b, true);
				a();
			}

			static Ja(a) {
				null != class_C.dn && class_C.dn.remove();
				null != a && (class_C.Vg.appendChild(a),
					class_C.dn = a);
			}
		}

		class class_oc {
			constructor() {
			}
		}

		class class_Yb {
			constructor(a, b, c, d, e, f) {
				this.qh = this.zh = false;
				this.pa = new class_Sa(0, b, d);
				let g = this;
				this.pa.gd = function () {
					g.We(ma.Ge);
				}
				;
				this.pa.Gd = function () {
					null != g.Gd && g.Gd(new class_Tb(g.pa));
					g.pa = null;
					g.dk();
				}
				;
				this.pa.ei = function (h) {
					g.sr = h;
					g.Y = new WebSocket(a + 'client?id=' + c + (null == f ? '' : '&token=' + f));
					g.Y.binaryType = 'arraybuffer';
					g.Y.onclose = function (k) {
						g.zh || g.We(ma.He(k.code));
					}
					;
					g.Y.onerror = function () {
						g.zh || g.We(ma.Error);
					}
					;
					g.Y.onmessage = createHandlerFromInstance(g, g.Ph);
					g.Y.onopen = function () {
						null != g.ql && g.ql();
						g.pa.Pi();
						g.Ei(g.sr, g.pa.eg, e);
						g.pa.sg = createHandlerFromInstance(g, g.Bi);
						g.pa.Sh.then(function () {
							g.Rc(0, null);
						});
					};
				}
				;
				this.pa.oo();
			}

			Pn() {
				this.We(ma.Fe);
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

			Ph(a) {
				var b = new class_J(new DataView(a.data));
				a = b.C();
				0 < b.s.byteLength - b.a && (b = new class_J(new DataView(pako.inflateRaw(b.qb()).buffer), false));
				switch (a) {
					case 1:
						a = b.lc();
						b = b.Eg();
						let c = []
							,
							d = 0;
						for (; d < b.length;)
							c.push(new RTCIceCandidate(b[d++]));
						this.Oh(a, c);
						break;
					case 4:
						this.Nh(new RTCIceCandidate(b.Eg()));
				}
			}

			Oh(a, b) {
				this.pa.Pi(this.qh ? 1E4 : 4E3);
				this.zh = true;
				null != this.il && this.il();
				let c = this;
				this.pa.Ra.setRemoteDescription(new RTCSessionDescription({
					sdp: a,
					type: 'answer'
				}), function () {
					let d = 0;
					for (; d < b.length;)
						c.pa.Ra.addIceCandidate(b[d++]);
				}, function () {
					c.We(ma.Error);
				});
			}

			Nh(a) {
				this.pa.Ra.addIceCandidate(a);
			}

			Rc(a, b) {
				if (null != this.Y) {
					var c = StreamWriter.ia(32, false);
					c.l(a);
					null != b && (a = pako.deflateRaw(b.Vb()),
						c.Xb(a));
					this.Y.send(c.Nd());
				}
			}

			Ei(a, b, c) {
				let d = StreamWriter.ia(32, false);
				d.l(this.qh ? 1 : 0);
				d.pc(a.sdp);
				d.Tg(b);
				null != c && d.Xb(c.Vb());
				this.Rc(1, d);
			}

			Bi(a) {
				let b = StreamWriter.ia(32, false);
				b.Tg(a);
				this.Rc(4, b);
			}

			static Mo(a) {
				switch (a.lb) {
					case 0:
						return 'Failed';
					case 1:
						return class_Kc.description(a.code);
					case 2:
						return '';
					case 3:
						return 'Master connection error';
				}
			}
		}

		class Plane {
			constructor() {
				this.w = 32;
				this.h = 63;
				this.o = 1;
				this.Ta = 0;
				this.wa = new Point(0, 0);
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

		class class_E {
			static i(a, b) {
				null != a && a(b);
			}
		}

		class Vertex {
			constructor() {
				this.Bd = 0;
				this.w = 32;
				this.h = 63;
				this.o = 1;
				this.a = new Point(0, 0);
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

		class class_sc {
			constructor() {
				this.Uc = 0;
				this.ab = [];
				this.Ir = new class_ea(['Time is', 'Up!'], 16777215);
				this.Oq = new class_ea(['Red is', 'Victorious!'], 15035990);
				this.Nq = new class_ea(['Red', 'Scores!'], 15035990);
				this.Ln = new class_ea(['Blue is', 'Victorious!'], 625603);
				this.Kn = new class_ea(['Blue', 'Scores!'], 625603);
				this.mq = new class_ea(['Game', 'Paused'], 16777215);
			}

			Qa(a) {
				this.ab.push(a);
			}

			Wn() {
				this.ab = [];
				this.Uc = 0;
			}

			D(a) {
				0 < this.ab.length && (this.Uc += a) > this.ab[0].Io() && (this.Uc = 0,
					this.ab.shift());
			}

			Oc(a) {
				0 < this.ab.length && this.ab[0].Oc(a, this.Uc);
			}
		}

		class class_Y {
			static ws(a, b) {
				a = class_P.fj(a, b);
				return 8 < a && 14 > a ? true : 32 == a;
			}

			static Qs(a) {
				let b = a.length
					,
					c = 0;
				for (; c < b && class_Y.ws(a, b - c - 1);)
					++c;
				return 0 < c ? class_P.substr(a, 0, b - c) : a;
			}

			static Hf(a) {
				var b;
				let c = '';
				for (b = 2 - a.length; c.length < b;)
					c += '0';
				return c + (null == a ? 'null' : '' + a);
			}

			static replace(a, b, c) {
				return a.split(b).join(c);
			}

			static ah(a, b) {
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

		class class_tc {
			constructor() {
				this.Ca = 0;
				this.sk = this.tk = false;
				this.Se = 0;
				this.f = window.document.createElement('div');
				this.f.className = 'game-timer-view';
				this.f.appendChild(this.kq = this.ae('OVERTIME!', 'overtime'));
				this.f.appendChild(this.Hp = this.ae('0', 'digit'));
				this.f.appendChild(this.Gp = this.ae('0', 'digit'));
				this.f.appendChild(this.ae(':', null));
				this.f.appendChild(this.lr = this.ae('0', 'digit'));
				this.f.appendChild(this.kr = this.ae('0', 'digit'));
			}

			ae(a, b) {
				let c = window.document.createElement('span');
				c.textContent = a;
				c.className = b;
				return c;
			}

			Ar(a) {
				if (a != this.Se) {
					let b = a % 60
						,
						c = a / 60 | 0;
					this.kr.textContent = '' + b % 10;
					this.lr.textContent = '' + (b / 10 | 0) % 10;
					this.Gp.textContent = '' + c % 10;
					this.Hp.textContent = '' + (c / 10 | 0) % 10;
					this.Se = a;
				}
				this.Ul();
				this.Vl();
			}

			Br(a) {
				this.Ca = a;
				this.Ul();
				this.Vl();
			}

			Ul() {
				this.xr(0 != this.Ca && this.Se > this.Ca);
			}

			Vl() {
				this.Cr(this.Se < this.Ca && this.Se > this.Ca - 30);
			}

			xr(a) {
				a != this.sk && (this.kq.className = a ? 'overtime on' : 'overtime',
					this.sk = a);
			}

			Cr(a) {
				a != this.tk && (this.f.className = a ? 'game-timer-view time-warn' : 'game-timer-view',
					this.tk = a);
			}
		}

		class class_vb {
			constructor() {
				this.f = class_x.Fa(class_vb.O);
				let a = class_x.Da(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					class_E.i(b.ob, false);
				}
				;
				a.get('leave').onclick = function () {
					class_E.i(b.ob, true);
				};
			}
		}

		class class_Zb {
			static parse(a) {
				a.C();
				let b = [];
				for (; 0 != a.s.byteLength - a.a;) {
					let c = a.oe(a.Rb())
						,
						d = a.Nl(a.Rb());
					try {
						let e = new class_$b;
						e.ka(new class_J(new DataView(d), false));
						let f = new class_qc;
						f.Cd = e;
						f.aa = c;
						b.push(f);
					}
					catch (e) {
					}
				}
				return b;
			}

			static us(a, b, c, d) {
				return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
			}

			static Rs(a, b) {
				let c = a.Ic;
				a = a.Kc;
				let d = 0;
				for (; d < b.length;) {
					let e = b[d];
					++d;
					let f = e.Cd;
					e.Te = 6378 * class_Zb.us(.017453292519943295 * f.Ic, .017453292519943295 * f.Kc, .017453292519943295 * c, .017453292519943295 * a);
					isFinite(e.Te) || (e.Te = 22E3);
				}
			}

			static get() {
				return class_Z.H(ConnectionConstants.Me + 'api/list', 'arraybuffer').then(function (a) {
					return class_Zb.parse(new class_J(new DataView(a), false));
				});
			}
		}

		class GameView {
			constructor(a) {
				this.Ob = new class_wb;
				this.kd = false;
				this.Cf = new class_kb;
				this.field_chatboxViewInst = new class_Ua;
				this.Va = new class_ib(a);
				this.Ob.Qb = a;
				this.f = class_x.Fa(GameView.O);
				a = class_x.Da(this.f);
				this.Rr = a.get('top-section');
				this.rf = a.get('popups');
				this.rf.style.display = 'none';
				a.get('gameplay').appendChild(this.Ob.f);
				class_x.replaceWith(a.get('chatbox'), this.field_chatboxViewInst.f);
				class_x.replaceWith(a.get('stats'), this.Cf.f);
				this.ci = a.get('menu');
				let b = this;
				this.ci.onclick = function () {
					b.te(!b.kd);
					b.ci.blur();
				}
				;
				a.get('settings').onclick = function () {
					let c = new class_la;
					c.ob = function () {
						b.bb(null);
					}
					;
					b.bb(c.f);
				}
				;
				this.Va.ie = function () {
					let c = new class_vb;
					c.ob = function (d) {
						b.bb(null);
						d && class_H.i(b.ie);
					}
					;
					b.bb(c.f);
				}
				;
				this.Va.fq = function () {
					let c = new class_pb;
					c.di = function () {
						b.bb(null);
					}
					;
					c.xg = function (d) {
						class_E.i(b.xg, d);
						b.bb(null);
					}
					;
					c.gi = function (d) {
						d = new class_aa('Error loading stadium', d, ['Ok']);
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

			D(a) {
				null == a.U.M && this.te(true);
				class_H.i(this.Il);
				this.ci.disabled = null == a.U.M;
				this.f.style.setProperty('--chat-opacity', '' + ConnectionConstants.m.xh.H());
				this.f.classList.toggle('chat-bg-full', 'full' == ConnectionConstants.m.$j.H());
				this.kd && this.Va.D(a.U, a.U.getFullPlayerById(a.yc));
				a = a.cg();
				let b = this.field_chatboxViewInst.f.getBoundingClientRect().height;
				this.Ob.cc.Uj = b * window.devicePixelRatio;
				this.Ob.D(a);
				ConnectionConstants.Na.gk.Us(a);
			}

			te(a) {
				this.kd != a && (this.kd = a,
					this.f.classList.toggle('showing-room-view', this.kd),
					this.kd ? this.Rr.appendChild(this.Va.f) : this.Va.f.remove());
			}

			ip() {
				return null != GameView.sq;
			}

			bb(a, b) {
				class_x.Jf(this.rf);
				GameView.sq = a;
				null != a ? (this.rf.style.display = 'flex',
					this.rf.appendChild(a),
					this.Il = b) : (this.rf.style.display = 'none',
					this.Il = null);
			}
		}

		class FullPlayer {
			constructor() {
				this.Cc = -1;
				this.kn = null;
				// Player team
				this.ea = Team.spec;
				// Player disc
				this.J = null;
				this.Xc = 0;
				this.Bc = 0;
				this.Yb = false;
				this.W = 0;
				this.mb = 0;
				// Player name
				this.A = 'Player';
				this.xb = 0;
				this.$g = 0;
				// Player flag
				this.country = null;
				this.Qd = false;
				this.Pd = null;
				this.Zb = null;
				this.Kb = 0;
				// Player admin status
				this.cb = false;
			}

			ua(a) {
				a.l(this.cb ? 1 : 0);
				a.P(this.Kb);
				a.Cb(this.Zb);
				a.Cb(this.Pd);
				a.l(this.Qd ? 1 : 0);
				a.Cb(this.country);
				a.P(this.$g);
				a.Cb(this.A);
				a.P(this.mb);
				a.jb(this.W);
				a.l(this.Yb ? 1 : 0);
				a.aj(this.Bc);
				a.l(this.Xc);
				a.l(this.ea.aa);
				a.aj(null == this.J ? -1 : this.J.tl);
			}

			va(a, b) {
				this.cb = 0 != a.C();
				this.Kb = a.N();
				this.Zb = a.yb();
				this.Pd = a.yb();
				this.Qd = 0 != a.C();
				this.country = a.yb();
				this.$g = a.N();
				this.A = a.yb();
				this.mb = a.N();
				this.W = a.zb();
				this.Yb = 0 != a.C();
				this.Bc = a.pi();
				this.Xc = a.C();
				let c = a.sf();
				this.ea = 1 == c ? Team.ga : 2 == c ? Team.Aa : Team.spec;
				a = a.pi();
				this.J = 0 > a ? null : b[a];
			}

			ts() {
				let a = class_ra.Cc
					,
					b = this.kn;
				this.Cc != a && (null == b && (this.kn = b = new FullPlayer),
					this.Cc = a,
					FullPlayer.ls(b, this));
				return b;
			}

			static ls(a, b) {
				a.cb = b.cb;
				a.Kb = b.Kb;
				a.Zb = b.Zb;
				a.Pd = b.Pd;
				a.Qd = b.Qd;
				a.country = b.country;
				a.$g = b.$g;
				a.xb = b.xb;
				a.A = b.A;
				a.mb = b.mb;
				a.W = b.W;
				a.Yb = b.Yb;
				a.Bc = b.Bc;
				a.Xc = b.Xc;
				a.J = null == b.J ? null : b.J.vc();
				a.ea = b.ea;
			}
		}

		class class_xb {
			constructor(a) {
				this.f = class_x.Fa(class_xb.O);
				let b = class_x.Da(this.f);
				this.gf = b.get('title');
				this.ri = b.get('reason');
				this.Hn = b.get('ban-btn');
				this.Jn = b.get('ban-text');
				this.Ye = b.get('kick');
				this.ud = b.get('close');
				let c = this;
				this.Hn.onclick = function () {
					c.Hj(!c.Qj);
				}
				;
				this.ud.onclick = function () {
					class_H.i(c.ob);
				}
				;
				this.Ye.onclick = function () {
					class_ic.i(c.fi, c.Qb, c.ri.value, c.Qj);
				}
				;
				this.ri.onkeydown = function (d) {
					return d.stopPropagation();
				}
				;
				this.ri.maxLength = 100;
				this.Qb = a.W;
				this.gf.textContent = 'Kick ' + a.A;
				this.Hj(false);
			}

			Hj(a) {
				this.Qj = a;
				this.Jn.textContent = a ? 'Yes' : 'No';
			}
		}

		class Goal {
			constructor() {
				this.we = Team.spec;
				this.da = new Point(0, 0);
				this.X = new Point(0, 0);
			}

			fa(a) {
				var b = this.X;
				a.u(b.x);
				a.u(b.y);
				b = this.da;
				a.u(b.x);
				a.u(b.y);
				a.l(this.we.aa);
			}

			ka(a) {
				var b = this.X;
				b.x = a.v();
				b.y = a.v();
				b = this.da;
				b.x = a.v();
				b.y = a.v();
				a = a.sf();
				this.we = 1 == a ? Team.ga : 2 == a ? Team.Aa : Team.spec;
			}
		}

		class ImportantUtil {
			constructor(a, b) {
				this.Rh = null;
				this.j = a;
				null != b && (this.Rh = '@' + class_Y.replace(b, ' ', '_'));
			}

			Xi(a) {
				let b = this.j.field_chatboxViewInst.Fc
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
				b.Oj = c;
			}

			ti(a) {
				function b(d) {
					return null == d ? '' : ' by ' + d.A;
				}

				this.Xi(a);
				let c = this;
				a.onPlayerJoinFun = function (d) {
					c.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + d.A + ' has joined');
					ConnectionConstants.Na.hd(ConnectionConstants.Na.jp);
					c.Xi(a);
				}
				;
				a.onPlayerLeaveFun = function (d, e, f, g) {
					class_E.i(c.Wp, d.W);
					null == e ? d = '' + d.A + ' has left' : (class_bc.i(c.Vp, d.W, e, null != g ? g.A : null, f),
						d = '' + d.A + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' : ''));
					c.j.field_chatboxViewInst.addNoticeToLogAndHandle(d);
					ConnectionConstants.Na.hd(ConnectionConstants.Na.np);
					c.Xi(a);
				}
				;
				a.onPlayerChatFun = function (d, e) {
					let f = null != c.Rh && -1 != e.indexOf(c.Rh);
					c.j.field_chatboxViewInst.ca('' + d.A + ': ' + e, f ? 'highlight' : null);
					ConnectionConstants.m.ym.H() && f ? ConnectionConstants.Na.hd(ConnectionConstants.Na.Jk) : ConnectionConstants.m.Ki.H() && ConnectionConstants.Na.hd(ConnectionConstants.Na.Zj);
				}
				;
				a.onAnnouncementFun = function (d, e, f, g) {
					c.j.field_chatboxViewInst.yp(d, e, f);
					if (ConnectionConstants.m.Ki.H())
						switch (g) {
							case 1:
								ConnectionConstants.Na.hd(ConnectionConstants.Na.Zj);
								break;
							case 2:
								ConnectionConstants.Na.hd(ConnectionConstants.Na.Jk);
						}
				}
				;
				a.onPlayerBallKickFun = function () {
					ConnectionConstants.Na.hd(ConnectionConstants.Na.lp);
				}
				;
				a.onTeamGoalFun = function (d) {
					ConnectionConstants.Na.hd(ConnectionConstants.Na.Ro);
					let e = c.j.Ob.cc.Ad;
					e.Qa(d == Team.ga ? e.Nq : e.Kn);
				}
				;
				a.onTeamVictoryFun = function (d) {
					let e = c.j.Ob.cc.Ad;
					e.Qa(d == Team.ga ? e.Oq : e.Ln);
					c.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + d.A + ' team won the match');
				}
				;
				a.onGamePauseFun = function (d, e, f) {
					e && !f && c.j.field_chatboxViewInst.addNoticeToLogAndHandle('Game paused' + b(d));
				}
				;
				a.onTimeIsUpFun = function () {
					let d = c.j.Ob.cc.Ad;
					d.Qa(d.Ir);
				}
				;
				a.onGameStartFun = function (d) {
					c.j.te(false);
					c.j.Ob.cc.Ad.Wn();
					c.j.field_chatboxViewInst.addNoticeToLogAndHandle('Game started' + b(d));
				}
				;
				a.onGameStopFun = function (d) {
					null != d && c.j.field_chatboxViewInst.addNoticeToLogAndHandle('Game stopped' + b(d));
				}
				;
				a.onStadiumChangeFun = function (d, e) {
					if (!e.Xe()) {
						let f = class_Y.ah(e.bk(), 8);
						c.j.field_chatboxViewInst.addNoticeToLogAndHandle('Stadium "' + e.A + '" (' + f + ') loaded' + b(d));
					}
				}
				;
				a.onPlayerDesyncChangeFun = function (d) {
					c.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + d.A + ' ' + (d.Qd ? 'has desynchronized' : 'is back in sync'));
				}
				;
				a.onPlayerTeamChangeFun = function (d, e, f) {
					null != a.M && c.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + e.A + ' was moved to ' + f.A + b(d));
				}
				;
				a.onPlayerAdminChangeFun = function (d, e) {
					let f = e.A;
					d = (e.cb ? '' + f + ' was given admin rights' : '' + f + '\'s admin rights were taken away') + b(d);
					c.j.field_chatboxViewInst.addNoticeToLogAndHandle(d);
				}
				;
				a.onChatIndicatorStateChangeFun = function (d, e) {
					c.j.Ob.cc.Yo(d, e);
				}
				;
				a.onKickRateLimitSetFun = function (d, e, f, g) {
					c.j.field_chatboxViewInst.addNoticeToLogAndHandle('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(d));
				};
			}

			resetRoomEventHandlers(a) {
				a.onPlayerJoinFun = null;
				a.onPlayerLeaveFun = null;
				a.onPlayerChatFun = null;
				a.onAnnouncementFun = null;
				a.onPlayerBallKickFun = null;
				a.onTeamGoalFun = null;
				a.onTeamVictoryFun = null;
				a.onGamePauseFun = null;
				a.onTimeIsUpFun = null;
				a.onGameStartFun = null;
				a.onGameStopFun = null;
				a.onStadiumChangeFun = null;
				a.onPlayerDesyncChangeFun = null;
				a.onPlayerTeamChangeFun = null;
				a.onPlayerAdminChangeFun = null;
				a.onChatIndicatorStateChangeFun = null;
				a.onKickRateLimitSetFun = null;
			}
		}

		class class_Va {
			constructor() {
				this.list = [];
			}

			$m(a) {
				let b = 0;
				let c = a.kb;
				let d = a.Dc;
				let e = 0;
				let f = this.list;
				for (; e < f.length;) {
					var g = f[e];
					++e;
					let h = g.kb;
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

			Ms(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].kb >= a);)
					++b;
				this.list.splice(0, b);
			}

			ms(a, b) {
				let c = this.list;
				for (; 0 < c.length;)
					c.pop();
				class_Va.Ds(a.list, b.list, this.list);
			}

			Ns(a) {
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

			ns(a) {
				let b = 0
					,
					c = 0
					,
					d = this.list;
				for (; c < d.length && !(d[c++].kb >= a);)
					++b;
				return b;
			}

			static Ds(a, b, c) {
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
						if (h.kb <= k.kb) {
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

		class class_ba {
			constructor(a) {
				let b = new class_aa('Only humans', '', []);
				this.f = b.f;
				b.$d.style.minHeight = '78px';
				let c = this;
				class_yb.pp().then(function (d) {
					null == class_ba.Fg && (class_ba.Fg = window.document.createElement('div'),
						b.$d.appendChild(class_ba.Fg),
						class_ba.Lq = d.render(class_ba.Fg, {
							sitekey: a,
							callback: function (e) {
								class_E.i(class_ba.Rl, e);
							},
							theme: 'dark'
						}));
					d.reset(class_ba.Lq);
					class_ba.Rl = function (e) {
						window.setTimeout(function () {
							class_E.i(c.Ua, e);
						}, 1E3);
						class_ba.Rl = null;
					}
					;
					b.$d.appendChild(class_ba.Fg);
				});
			}
		}

		class Room {
			constructor() {
				this.kc = -1;
				/** @type {Room} */
				this.jc = null;
				/** @type {Stadium} */
				this.T = null;
				this.Fd = 2;
				this.dd = 0;
				this.he = 1;
				// Time limit
				this.Ca = 3;
				// Score limit
				this.gb = 3;
				this.Tc = false;
				/** @type {Game} */
				this.M = null;
				this.K = [];
				// Room name
				this.mc = '';
				this.T = Stadium.Kh()[0];
				this.ib = [null, new TeamColors, new TeamColors];
				this.ib[1].eb.push(Team.ga.S);
				this.ib[2].eb.push(Team.Aa.S);
			}

			Gr(a) {
				if (null == this.M) {
					this.M = new class_ca;
					for (var b = 0, c = this.K; b < c.length;) {
						let d = c[b];
						++b;
						d.J = null;
						d.Kb = 0;
					}
					this.M.fp(this);
					null != this.onGameStartFun && this.onGameStartFun(a);
				}
			}

			Wf(a, b, c) {
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
								if (h != b && h.ea == b.ea && h.Kb == d) {
									e = false;
									break;
								}
							}
						}
						b.Kb = d;
					}
					class_ic.i(this.onPlayerTeamChangeFun, a, b, c);
				}
			}

			getFullPlayerById(a) {
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
				a.Cb(this.mc);
				a.l(this.Tc ? 1 : 0);
				a.P(this.gb);
				a.P(this.Ca);
				a.aj(this.he);
				a.l(this.dd);
				a.l(this.Fd);
				this.T.fa(a);
				a.l(null != this.M ? 1 : 0);
				null != this.M && this.M.fa(a);
				a.l(this.K.length);
				let b = 0
					,
					c = this.K;
				for (; b < c.length;)
					c[b++].ua(a);
				this.ib[1].fa(a);
				this.ib[2].fa(a);
			}

			ka(a) {
				this.mc = a.yb();
				this.Tc = 0 != a.C();
				this.gb = a.N();
				this.Ca = a.N();
				this.he = a.pi();
				this.dd = a.C();
				this.Fd = a.C();
				this.T = Stadium.ka(a);
				var b = 0 != a.C();
				this.M = null;
				b && (this.M = new class_ca,
					this.M.ka(a, this));
				b = null == this.M ? null : this.M.ta.G;
				let c = a.C();
				for (var d = this.K; d.length > c;)
					d.pop();
				for (d = 0; d < c;) {
					let e = new FullPlayer;
					e.va(a, b);
					this.K[d++] = e;
				}
				this.ib[1].ka(a);
				this.ib[2].ka(a);
			}

			Ek() {
				let a = 0;
				var b = StreamWriter.ia();
				this.fa(b);
				for (b = b.Or(); 4 <= b.s.byteLength - b.a;)
					a ^= b.N();
				return a;
			}

			Jo() {
				let a = StreamWriter.ia(4);
				a.P(this.Ek());
				return a.Qg();
			}

			ao(a) {
				a = (new class_J(new DataView(a))).N();
				class_E.i(this.to, this.Ek() != a);
			}

			um(a) {
				this.Zl = a;
			}

			Mb(a) {
				if (0 == a)
					return true;
				a = this.getFullPlayerById(a);
				return null != a && a.cb ? true : false;
			}

			vr(a, b, c, d) {
				this.Fd = 0 > b ? 0 : 255 < b ? 255 : b;
				this.dd = 0 > c ? 0 : 255 < c ? 255 : c;
				0 > d ? d = 0 : 100 < d && (d = 100);
				this.he = this.dd * d;
				class_bc.i(this.onKickRateLimitSetFun, a, this.Fd, this.dd, d);
			}

			vc() {
				let a = class_ra.Cc
					,
					b = this.jc;
				this.kc != a && (null == b && (this.jc = b = new Room),
					this.kc = a,
					Room.xd(b, this));
				return b;
			}

			static xd(a, b) {
				a.mc = b.mc;
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
						d[g] = e[g].ts();
					}
				}
				a.M = null == b.M ? null : b.M.vc();
				a.Tc = b.Tc;
				a.gb = b.gb;
				a.Ca = b.Ca;
				a.he = b.he;
				a.dd = b.dd;
				a.Fd = b.Fd;
				a.T = b.T;
				a.ib = b.ib;
			}
		}

		class DynamicObjectsUtil {
			constructor() {
				this.kc = -1;
				this.jc = null;
				this.G = [];
			}

			fa(a) {
				a.l(this.G.length);
				let b = 0
					,
					c = this.G.length;
				for (; b < c;) {
					let d = b++
						,
						e = this.G[d];
					e.tl = d;
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
					let d = new DynamicDisc;
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
						0 != (f.h & c.w) && 0 != (f.w & c.h) && c.Yn(f);
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
							0 != (f.h & c.w) && 0 != (f.w & c.h) && c.Zn(f);
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
						     c = this.nb; b < c.length;)
						c[b++].D(this.G);
			}

			vc() {
				let a = class_ra.Cc
					,
					b = this.jc;
				this.kc != a && (null == b && (this.jc = b = new DynamicObjectsUtil),
					this.kc = a,
					DynamicObjectsUtil.xd(b, this));
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
						d[g] = e[g].vc();
					}
				}
				a.L = b.L;
				a.V = b.V;
				a.qa = b.qa;
				a.nb = b.nb;
			}
		}

		class RoomListView {
			constructor(a) {
				function b(g, h) {
					function k() {
						l.className = n.Mf ? 'icon-ok' : 'icon-cancel';
					}

					g = c.get(g);
					let l = g.querySelector('i')
						,
						n = {
							Mf: h
						};
					k();
					g.onclick = function () {
						n.Mf = !n.Mf;
						k();
						e.ln(e.hj);
					}
					;
					return n;
				}

				this.hj = [];
				this.ss = a;
				this.Ha = class_x.Fa(RoomListView.vj);
				let c = class_x.Da(this.Ha)
					,
					d = new class_zb(c);
				this.rj = c.get('refresh');
				this.bn = c.get('join');
				a = c.get('create');
				this.os = c.get('count');
				let e = this;
				a.onclick = function () {
					class_H.i(e.Gs);
				}
				;
				c.get('changenick').onclick = function () {
					class_H.i(e.Fs);
				}
				;
				c.get('settings').onclick = function () {
					class_H.i(e.Is);
				}
				;
				let f = c.get('replayfile');
				f.onchange = function () {
					var g = f.files;
					if (!(1 > g.length)) {
						g = g.item(0);
						var h = new FileReader;
						h.onload = function () {
							class_E.i(e.Hs, h.result);
						}
						;
						h.readAsArrayBuffer(g);
					}
				}
				;
				this.rs = b('fil-full', true);
				this.Js = b('fil-pass', true);
				this.ys = c.get('listscroll');
				this.Ls = class_qb.Zh(this.ys);
				this.kj = c.get('list');
				this.rj.onclick = function () {
					d.Tl();
					e.Xm();
				}
				;
				this.bn.onclick = function () {
					null != e.Td && class_E.i(e.gn, e.Td.Ps);
				}
				;
				this.Xm();
			}

			Xm() {
				function a() {
					d.rj.disabled = false;
					d.ln(b);
					return null;
				}

				this.on(null);
				this.rj.disabled = true;
				class_x.Jf(this.kj);
				let b = [];
				this.hj = [];
				let c = class_Zb.get().then(function (e) {
						return b = e;
					}, function () {
						return null;
					})
					,
					d = this;
				RoomListView.Ks(c).then(a, a);
			}

			ln(a) {
				this.hj = a;
				class_Zb.Rs(this.ss, a);
				a.sort(function (h, k) {
					return h.Te - k.Te;
				});
				class_x.Jf(this.kj);
				let b = 0
					,
					c = 0
					,
					d = !this.rs.Mf
					,
					e = !this.Js.Mf
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
					if (e && k.Hb)
						continue;
					let l = new class_Ab(h);
					l.Ha.ondblclick = function () {
						class_E.i(f.gn, h);
					}
					;
					l.Ha.onclick = function () {
						f.on(l);
					}
					;
					this.kj.appendChild(l.Ha);
					b += k.K;
					++c;
				}
				this.os.textContent = '' + b + ' players in ' + c + ' rooms';
				this.Ls.update();
			}

			on(a) {
				null != this.Td && this.Td.Ha.classList.remove('selected');
				this.Td = a;
				null != this.Td && this.Td.Ha.classList.add('selected');
				this.bn.disabled = null == this.Td;
			}

			static Ks(a) {
				let b = new Promise(function (c, d) {
						window.setTimeout(function () {
							d(null);
						}, 5E3);
					}
				);
				return Promise.race([b, a]);
			}
		}

		class class_uc {
			constructor(a) {
				this.Ej = new Map;
				this.Qo = new class_Bb(100, 16);
				this.Gg = false;
				this.xb = 0;
				this.pa = a;
				a = StreamWriter.ia(8);
				a.u(Math.random());
				this.Pe = a.Vb();
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.pa.Ub(b, a);
			}
		}

		class class_bc {
			static i(a, b, c, d, e) {
				null != a && a(b, c, d, e);
			}
		}

		class class_lc {
			constructor(a, b) {
				this.r = new RegExp(a, b.split('u').join(''));
			}

			match(a) {
				this.r.global && (this.r.lastIndex = 0);
				this.r.qc = this.r.exec(a);
				this.r.ih = a;
				return null != this.r.qc;
			}

			en(a) {
				if (null != this.r.qc && 0 <= a && a < this.r.qc.length)
					return this.r.qc[a];
				throw GlobalError.B('EReg::matched');
			}

			As() {
				if (null == this.r.qc)
					throw GlobalError.B('No string matched');
				return {
					pj: this.r.qc.index,
					xs: this.r.qc[0].length
				};
			}

			zs(a, b) {
				var c;
				null == c && (c = -1);
				if (this.r.global) {
					this.r.lastIndex = b;
					this.r.qc = this.r.exec(0 > c ? a : class_P.substr(a, 0, b + c));
					if (b = null != this.r.qc)
						this.r.ih = a;
					return b;
				}
				if (c = this.match(0 > c ? class_P.substr(a, b, null) : class_P.substr(a, b, c)))
					this.r.ih = a,
						this.r.qc.index += b;
				return c;
			}
		}

		class class_hb {
			constructor(a) {
				this.A = a.A;
				this.xb = a.xb;
				this.aa = a.W;
				this.f = class_x.Fa(class_hb.O);
				let b = class_x.Da(this.f);
				this.gf = b.get('name');
				this.Ag = b.get('ping');
				try {
					b.get('flag').classList.add('f-' + a.country);
				}
				catch (d) {
				}
				this.gf.textContent = this.A;
				this.Ag.textContent = '' + this.xb;
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
				this.om(a.cb);
			}

			D(a, b) {
				this.f.draggable = b;
				this.xb != a.xb && (this.xb = a.xb,
					this.Ag.textContent = '' + this.xb);
				this.Dn != a.cb && this.om(a.cb);
			}

			om(a) {
				this.Dn = a;
				this.f.className = 'player-list-item' + (a ? ' admin' : '');
			}
		}

		class class_Cb {
			constructor() {
				this.f = class_x.Fa(class_Cb.O);
				let a = class_x.Da(this.f);
				this.Pb = a.get('log');
				this.uh = a.get('cancel');
			}

			ca(a) {
				let b = window.document.createElement('p');
				b.textContent = a;
				this.Pb.appendChild(b);
			}
		}

		class class_cc {
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

		class class_Z {
			static $l(a, b, c, d, e) {
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
				return class_Z.$l(a, 'GET', b, null);
			}

			static Dk(a) {
				return class_Z.H(a, 'json').then(function (b) {
					let c = b.error;
					if (null != c)
						throw GlobalError.B(c);
					return b.data;
				});
			}

			static uq(a, b, c) {
				return class_Z.$l(a, 'POST', 'json', b, c);
			}

			static Jl(a, b, c) {
				return class_Z.uq(a, b, c).then(function (d) {
					let e = d.error;
					if (null != e)
						throw GlobalError.B(e);
					return d.data;
				});
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

			static Jf(a) {
				let b = a.firstChild;
				for (; null != b;)
					a.removeChild(b),
						b = a.firstChild;
			}
		}

		class Team {
			constructor(a, b, c, d, e, f, g, h) {
				this.enemyTeam = null;
				// Team id
				this.aa = a;
				this.S = b;
				this.Dh = c;
				this.mp = d;
				// Team name
				this.A = e;
				this.ro = f;
				this.w = h;
				this.Gm = new TeamColors;
				this.Gm.eb.push(b);
			}
		}

		class class_Kc {
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

		class class_Db {
			constructor() {
				this.rk = null;
				this.f = class_x.Fa(class_Db.O);
				var a = class_x.Da(this.f);
				this.jg = a.get('link');
				let b = a.get('copy');
				a = a.get('close');
				let c = this;
				this.jg.onfocus = function () {
					c.jg.select();
				}
				;
				b.onclick = function () {
					c.jg.select();
					return window.document.execCommand('Copy');
				}
				;
				a.onclick = function () {
					class_H.i(c.ob);
				};
			}

			wr(a) {
				this.rk != a && (this.rk = a,
					this.jg.value = a);
			}
		}

		class class_ca {
			constructor() {
				this.kc = -1;
				this.jc = null;
				this.Pa = 0;
				// Game time (seconds)
				this.Lc = 0;
				// Blue score
				this.Lb = 0;
				// Red score
				this.Sb = 0;
				/** @type {Team} */
				this.fe = Team.ga;
				// Game state
				this.Ab = 0;
				this.zc = 0;
				this.ta = new DynamicObjectsUtil;
				// Time limit
				this.Ca = 0;
				// Score limit
				this.gb = 5;
				/** @type {Stadium} */
				this.T = null;
			}

			fp(roomInst) {
				/** @type {Room} */
				this.La = roomInst;
				this.gb = roomInst.gb;
				this.Ca = roomInst.Ca;
				this.T = roomInst.T;
				this.ta.L = this.T.L;
				this.ta.qa = this.T.qa;
				this.ta.V = this.T.V;
				this.ta.nb = this.T.nb;
				roomInst = 0;
				let b = this.T.G;
				for (; roomInst < b.length;)
					this.ta.G.push(b[roomInst++].Ap());
				this.Qk();
			}

			Mk(a) {
				if (a.ea == Team.spec)
					a.J = null;
				else {
					a.mb = 0;
					var b = a.J;
					null == b && (b = new DynamicDisc,
						a.J = b,
						this.ta.G.push(b));
					var c = this.T.le;
					b.S = 0;
					b.$ = c.$;
					b.ba = c.ba;
					b.Ba = c.Ba;
					b.o = c.o;
					b.h = 39;
					b.w = a.ea.w | c.w;
					var d = a.ea == Team.ga ? this.T.Kd : this.T.td;
					0 == d.length ? (b.a.x = a.ea.Dh * this.T.bc,
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
				// If game is paused
				if (this.Pa > 0) {
					if (this.Pa < 120)
						this.Pa--;
				}
				// If game is running
				else {
					// Exposing global fields begin
					const onGameTickFun = window.parent.g.onGameTick;
					if (onGameTickFun != null)
						onGameTickFun(this);
					// Exposing global fields end
					
					var b = this.La.Xs;
					null != b && b();
					b = this.La.K;
					for (var c = 0; c < b.length;) {
						var d = b[c];
						++c;
						if (null != d.J) {
							0 == (d.mb & 16) && (d.Yb = false);
							var e = this.T.le;
							0 < d.Xc && d.Xc--;
							d.Bc < this.La.he && d.Bc++;
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
								f && (null != this.La.onPlayerBallKickFun && this.La.onPlayerBallKickFun(d),
									d.Yb = false,
									d.Xc = this.La.Fd,
									d.Bc -= this.La.dd);
							}
							f = d.mb;
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
							f = class_ca.hl[c],
							h = h.a,
							f.x = h.x,
							f.y = h.y,
							++c);
					this.ta.D(a);
					if (this.Ab == 0) {
						for (a = 0; a < b.length;)
							c = b[a],
								++a,
							null != c.J && (c.J.h = 39 | this.fe.mp);
						b = this.ta.G[0].F;
						0 < b.x * b.x + b.y * b.y && (this.Ab = 1);
					}
					else if (this.Ab == 1) {
						this.Lc += .016666666666666666;
						for (a = 0; a < b.length;)
							d = b[a],
								++a,
							null != d.J && (d.J.h = 39);
						d = Team.spec;
						b = this.ta.G;
						for (a = 0; a < c && (d = a++,
							d = this.T.Tn(b[class_ca.nk[d]].a, class_ca.hl[d]),
						d == Team.spec);)
							;
						d != Team.spec ? (this.Ab = 2,
							this.zc = 150,
							this.fe = d,
							d == Team.ga ? this.Lb++ : this.Sb++,
						null != this.La.onTeamGoalFun && this.La.onTeamGoalFun(d.enemyTeam),
						null != this.La.Zl && this.La.Zl(d.aa)) : 0 < this.Ca && this.Lc >= 60 * this.Ca && this.Sb != this.Lb && (null != this.La.onTimeIsUpFun && this.La.onTimeIsUpFun(),
							this.Em());
					}
					else if (this.Ab == 2) {
						this.zc--;
						if (this.zc <= 0) {
							if (this.gb > 0 && (this.Sb >= this.gb || this.Lb >= this.gb) || 0 < this.Ca && this.Lc >= 60 * this.Ca && this.Sb != this.Lb) {
								this.Em();
							}
							else {
								this.Qk();
								if (this.La.onPositionsResetFun != null)
									this.La.onPositionsResetFun();
							}
						}
					}
					else if (this.Ab == 3 && (this.zc--,
					0 >= this.zc && (b = this.La,
					null != b.M))) {
						b.M = null;
						a = 0;
						for (c = b.K; a < c.length;)
							d = c[a],
								++a,
								d.J = null,
								d.Kb = 0;
						null != b.onGameStopFun && b.onGameStopFun(null);
					}
				}
			}

			Em() {
				this.zc = 300;
				this.Ab = 3;
				null != this.La.onTeamVictoryFun && this.La.onTeamVictoryFun(this.Sb > this.Lb ? Team.ga : Team.Aa);
			}

			Qk() {
				let a = this.La.K;
				this.Ab = 0;
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
					e != Team.spec) {
						f = d.J.a;
						var g = this.T
							,
							h = b[e.aa]
							,
							k = e == Team.ga ? g.Kd : g.td;
						0 == k.length ? (k = h + 1 >> 1,
						0 == (h & 1) && (k = -k),
							g = g.nc * e.Dh,
							h = 55 * k) : (h >= k.length && (h = k.length - 1),
							h = k[h],
							g = h.x,
							h = h.y);
						f.x = g;
						f.y = h;
						b[e.aa]++;
						d.Kb = b[e.aa];
					}
			}

			fa(a) {
				this.ta.fa(a);
				a.P(this.zc);
				a.P(this.Ab);
				a.P(this.Sb);
				a.P(this.Lb);
				a.u(this.Lc);
				a.P(this.Pa);
				a.l(this.fe.aa);
			}

			ka(a, b) {
				this.ta.ka(a);
				this.zc = a.N();
				this.Ab = a.N();
				this.Sb = a.N();
				this.Lb = a.N();
				this.Lc = a.v();
				this.Pa = a.N();
				a = a.sf();
				this.fe = 1 == a ? Team.ga : 2 == a ? Team.Aa : Team.spec;
				this.La = b;
				this.gb = b.gb;
				this.Ca = b.Ca;
				this.T = b.T;
				this.ta.L = this.T.L;
				this.ta.V = this.T.V;
				this.ta.qa = this.T.qa;
				this.ta.nb = this.T.nb;
			}

			vc() {
				let a = class_ra.Cc
					,
					b = this.jc;
				this.kc != a && (null == b && (this.jc = b = new class_ca),
					this.kc = a,
					class_ca.xd(b, this));
				return b;
			}

			static xd(a, b) {
				a.La = b.La.vc();
				a.gb = b.gb;
				a.Ca = b.Ca;
				a.ta = b.ta.vc();
				a.zc = b.zc;
				a.Ab = b.Ab;
				a.Sb = b.Sb;
				a.Lb = b.Lb;
				a.Lc = b.Lc;
				a.Pa = b.Pa;
				a.T = b.T;
				a.fe = b.fe;
			}
		}

		class class_Sa {
			constructor(a, b, c) {
				this.od = this.xe = null;
				this.ve = [];
				this.kk = 0;
				this.rl = false;
				this.eg = [];
				this.$c = [];
				this.Ra = new RTCPeerConnection({
					iceServers: b
				}, class_Sa.io);
				let d = this;
				this.Sh = new Promise(function (e) {
						d.ep = e;
					}
				);
				this.Ra.onicecandidate = function (e) {
					null == e.candidate ? d.ep(d.eg) : (e = e.candidate,
					null != e.candidate && '' != e.candidate && (null != d.sg && d.sg(e),
						d.eg.push(e)));
				}
				;
				for (b = 0; b < c.length;)
					this.no(c[b++]);
				this.aa = a;
			}

			Pi(a) {
				null == a && (a = 1E4);
				window.clearTimeout(this.xe);
				this.xe = window.setTimeout(createHandlerFromInstance(this, this.bp), a);
			}

			mo(a, b) {
				let c = this;
				this.mk(this.Ra.setRemoteDescription(a).then(function () {
					return c.Ra.createAnswer();
				}), b, 500);
			}

			oo() {
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
						d.Fj(b[g++]);
					return class_Hc.Lr(d.Sh, c).then(f, f);
				}).then(function (e) {
					d.ei(e);
				}).catch(function () {
					d.dg();
				});
			}

			no(a) {
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
					c.dg();
				}
				;
				a.onmessage = function () {
					c.dg();
				}
				;
				this.$c.push(a);
			}

			Fj(a) {
				let b = this;
				window.setTimeout(function () {
					b.Ra.addIceCandidate(a);
				}, this.kk);
			}

			bp() {
				this.dg();
			}

			dg() {
				null != this.gd && this.gd();
				this.ja();
			}

			ja() {
				this.ck();
				this.Ra.close();
			}

			ck() {
				window.clearTimeout(this.xe);
				this.ei = this.Gd = this.sg = this.gd = null;
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

		class class_B {
			static zp() {
				class_C.jj(function () {
					class_B.uk(class_B.Fq);
				});
				class_B.qp();
			}

			static qp() {
				let a = ConnectionConstants.m.Nj.H();
				null == a ? class_U.Ho().then(function (b) {
					class_B.Re = b;
					ConnectionConstants.m.Nj.Ma(b.Qr());
				}).catch(function () {
				}) : class_U.Go(a).then(function (b) {
					return class_B.Re = b;
				}).catch(function () {
				});
			}

			static Ko() {
				let a = class_Ac.Ym();
				return null != a ? null != a.getItem('crappy_router') : false;
			}

			static uk(a) {
				let b = new class_eb(ConnectionConstants.m.ke.H());
				b.ml = function (c) {
					ConnectionConstants.m.ke.Ma(c);
					ConnectionConstants.Na.cm();
					a();
				}
				;
				class_C.Ja(b.f);
				b.Bb.focus();
			}

			static vk(a, b) {
				a = new class_ba(a);
				a.Ua = b;
				class_C.Ja(a.f);
			}

			static wo(a, b) {
				function c() {
					let f = new class_Ta('Failed', null);
					f.Ua = function () {
						class_B.vb();
					}
					;
					class_C.Ja(f.f);
				}

				function d(f) {
					f = f.sitekey;
					if (null == f)
						throw GlobalError.B(null);
					class_B.vk(f, function (g) {
						e(a, g);
					});
				}

				class_C.Ja((new class_aa('Connecting', 'Connecting...', [])).f);
				let e = null;
				e = function (f, g) {
					class_Z.Jl(ConnectionConstants.Me + 'api/client', 'room=' + f + '&rcr=' + g, class_Z.zj).then(function (h) {
						switch (h.action) {
							case 'connect':
								h = h.token;
								if (null == h)
									throw GlobalError.B(null);
								b(h);
								break;
							case 'recaptcha':
								d(h);
								break;
							default:
								throw GlobalError.B(null);
						}
					}).catch(function () {
						c();
					});
				}
				;
				e(a, '');
			}

			static Fq() {
				let a = class_Bc.H()
					,
					b = a.get('c')
					,
					c = a.get('p');
				a.get('v');
				null != b ? null != c ? class_B.Eh(b) : class_B.Zf(b) : class_B.vb();
			}

			static vb() {
				let a = new RoomListView(ConnectionConstants.m.Lh());
				class_C.Ja(a.Ha);
				a.gn = function (b) {
					if (9 != b.Cd.Od) {
						let c;
						9 > b.Cd.Od ? (b = 'Old version room',
							c = 'The room is running an older version, an update must have happened recently.') : (b = 'New version',
							c = 'The room is running a new version of haxball, refresh the site to update.');
						let d = new class_aa(b, c, ['Ok']);
						class_C.Ja(d.f);
						d.Ua = function () {
							class_C.Ja(a.Ha);
							d.Ua = null;
						};
					}
					else
						b.Cd.Hb ? class_B.Eh(b.aa) : class_B.Zf(b.aa);
				}
				;
				a.Gs = function () {
					class_B.xo();
				}
				;
				a.Fs = function () {
					class_B.uk(class_B.vb);
				}
				;
				a.Is = function () {
					class_B.xk();
				}
				;
				a.Hs = function (b) {
					class_B.yo(b);
				};
			}

			static xk() {
				let a = new class_la(true)
					,
					b = window.document.createElement('div');
				b.className = 'view-wrapper';
				b.appendChild(a.f);
				class_C.Ja(b);
				a.ob = function () {
					class_B.vb();
				}
				;
				a.Mp = function () {
					let c = new class_Eb
						,
						d = window.document.createElement('div');
					d.className = 'view-wrapper';
					d.appendChild(c.f);
					class_C.Ja(d);
					c.ob = function () {
						class_B.xk();
					};
				};
			}

			static ai(a, b) {
				return '' + globalScope.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
			}

			static xo() {
				let a = ConnectionConstants.m.ke.H()
					,
					b = new CreateRoomView('' + a + '\'s room');
				class_C.Ja(b.f);
				b.di = function () {
					class_B.vb();
				}
				;
				b.Rp = function (c) {
					function d() {
						if (!c.Ts) {
							var t = new class_$b;
							t.Od = 9;
							t.A = g.mc;
							t.K = g.K.length;
							t.ef = k.og + 1;
							t.sb = f.sb;
							t.Hb = null != k.Hb;
							t.Ic = f.Ic;
							t.Kc = f.Kc;
							var z = StreamWriter.ia(16);
							t.fa(z);
							k.Ii(z.Qg());
						}
					}

					class_C.Ja((new class_aa('Creating room', 'Connecting...', [])).f);
					let e = null
						,
						f = ConnectionConstants.m.Lh()
						,
						g = new Room;
					g.mc = c.name;
					let h = new FullPlayer;
					h.A = a;
					h.cb = true;
					h.country = f.sb;
					h.Zb = ConnectionConstants.m.rh.H();
					g.K.push(h);
					let k = new class_dc({
						iceServers: ConnectionConstants.fg,
						mj: ConnectionConstants.Me + 'api/host',
						state: g,
						version: 9
					});
					k.og = c.Bs - 1;
					k.Hb = c.password;
					d();
					let l = new ConnFa(k)
						,
						n = false;
					k.nf = function (t, z) {
						class_B.vk(t, function (L) {
							z(L);
							class_C.Ja(l.j.f);
							n = true;
						});
					}
					;
					let r = window.setInterval(function () {
						k.ra(class_Ia.ma(k));
					}, 3E3);
					k.jl = function (t) {
						null != g.getFullPlayerById(t) && k.ra(class_na.ma(t, 'Bad actor', false));
					}
					;
					k.Pp = function (t, z) {
						let L = z.lc();
						if (25 < L.length)
							throw GlobalError.B('name too long');
						let N = z.lc();
						if (3 < N.length)
							throw GlobalError.B('country too long');
						z = z.yb();
						if (null != z && 2 < z.length)
							throw GlobalError.B('avatar too long');
						k.ra(class_Ja.ma(t, L, N, z));
						d();
					}
					;
					k.Qp = function (t) {
						null != g.getFullPlayerById(t) && k.ra(class_na.ma(t, null, false));
					}
					;
					k.tg = function (t) {
						e = t;
						l.Ig = class_B.ai(t, null != k.Hb);
						n || (n = true,
							class_C.Ja(l.j.f));
					}
					;
					l.Jh.Vp = function (t, z, L, N) {
						k.Co(t, z, L, N);
					}
					;
					l.Jh.Wp = function () {
						d();
					}
					;
					l.j.ie = function () {
						k.ja();
						l.ja();
						class_B.vb();
						window.clearInterval(r);
					}
					;
					l.Yf.Mg = function (t) {
						k.Hb = t;
						d();
						null != e && (l.Ig = class_B.ai(e, null != k.Hb));
					}
					;
					l.Yf.tm = function (t) {
						k.Hi(t);
					}
					;
					l.Yf.Zd = createHandlerFromInstance(k, k.Zd);
				};
			}

			static Eh(a) {
				let b = new class_Gb;
				class_C.Ja(b.f);
				b.Ua = function (c) {
					null == c ? class_B.vb() : class_B.Zf(a, c);
				};
			}

			static yo(a) {
				try {
					let b = new class_vc(new class_ec(new Uint8Array(a), new Room, 3));
					b.pe.ie = function () {
						b.ja();
						class_B.vb();
					}
					;
					class_C.Ja(b.j.f);
				}
				catch (b) {
					let c = GlobalError.Jb(b).Db();
					if (c instanceof class_Ob)
						a = new class_aa('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']),
							class_C.Ja(a.f),
							a.Ua = function (d) {
								0 == d ? (d = window.top.location,
									window.top.open(d.protocol + '//' + d.hostname + (null != d.port ? ':' + d.port : '') + '/replay?v=' + c.Od, '_self')) : class_B.vb();
							}
						;
					else {
						let d = new class_aa('Replay error', 'Couldn\'t load the file.', ['Ok']);
						class_C.Ja(d.f);
						d.Ua = function () {
							d.Ua = null;
							class_B.vb();
						};
					}
				}
			}

			static Zf(a, b, c) {
				try {
					let d = class_B.Ko()
						,
						e = new Room
						,
						f = StreamWriter.ia();
					f.pc(ConnectionConstants.m.ke.H());
					f.pc(ConnectionConstants.m.Lh().sb);
					f.Cb(ConnectionConstants.m.rh.H());
					let g = new class_Ka(a, {
							iceServers: ConnectionConstants.fg,
							mj: ConnectionConstants.es,
							state: e,
							version: 9,
							Vs: f.Qg(),
							password: b,
							mn: d,
							qn: c,
							ps: class_B.Re
						})
						,
						h = new class_Cb;
					h.ca('Connecting to master...');
					h.uh.onclick = function () {
						g.Hd = null;
						g.mf = null;
						g.ja();
						class_B.vb();
					}
					;
					class_C.Ja(h.f);
					let k = function (r, t) {
							r = new class_Ta(r, t);
							r.Ua = function () {
								class_B.vb();
							}
							;
							class_C.Ja(r.f);
						}
						,
						l = function () {
							let r = new class_aa('Connection Failed', '', ['Ok']);
							r.$d.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
							r.Ua = function () {
								class_B.vb();
							}
							;
							class_C.Ja(r.f);
						}
						,
						n = function () {
							let r = new ConnFa(g);
							g.nl = function (t) {
								r.j.Cf.yr(g.Bg.gh() | 0, g.Bg.max() | 0);
								r.j.Cf.xl.Cn(t);
							}
							;
							r.Ig = class_B.ai(a, false);
							class_C.Ja(r.j.f);
							r.j.ie = function () {
								g.Hd = null;
								g.ja();
								r.ja();
								class_B.vb();
							}
							;
							g.Hd = function () {
								g.Hd = null;
								r.ja();
								let t = null == r.Ld ? null : r.Ld.stop();
								k(g.pk, t);
							};
						};
					g.mf = function (r) {
						g.mf = null;
						g.Hd = null;
						switch (r.lb) {
							case 1:
								l();
								break;
							case 2:
								switch (r.reason) {
									case 4004:
										class_B.wo(a, function (t) {
											class_B.Zf(a, b, t);
										});
										break;
									case 4101:
										null == b ? class_B.Eh(a) : k(class_Ka.yh(r), null);
										break;
									default:
										k(class_Ka.yh(r), null);
								}
								break;
							default:
								k(class_Ka.yh(r), null);
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
					g.$p = function () {
						h.ca('Trying reverse connection...');
					};
				}
				catch (d) {
					c = GlobalError.Jb(d).Db(),
						globalScope.console.log(c),
						c = new class_aa('Unexpected Error', '', []),
						c.$d.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.',
						class_C.Ja(c.f);
				}
			}
		}

		class class_Gb {
			constructor() {
				this.f = class_x.Fa(class_Gb.O);
				let a = class_x.Da(this.f);
				this.Bb = a.get('input');
				this.jf = a.get('ok');
				let b = this;
				a.get('cancel').onclick = function () {
					null != b.Ua && b.Ua(null);
				}
				;
				this.Bb.maxLength = 30;
				this.Bb.oninput = function () {
					b.D();
				}
				;
				this.Bb.onkeydown = function (c) {
					13 == c.keyCode && b.Hc() && null != b.Ua && b.Ua(b.Bb.value);
				}
				;
				this.jf.onclick = function () {
					b.Hc() && null != b.Ua && b.Ua(b.Bb.value);
				}
				;
				this.D();
			}

			Hc() {
				let a = this.Bb.value;
				return 30 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.jf.disabled = !this.Hc();
			}
		}

		class Disc {
			constructor() {
				this.h = this.w = 63;
				this.S = 16777215;
				this.Ba = .99;
				this.ba = 1;
				this.o = .5;
				this.$ = 10;
				this.oa = new Point(0, 0);
				this.F = new Point(0, 0);
				this.a = new Point(0, 0);
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
				a.rb(this.S);
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
				this.S = a.fb();
				this.h = a.N();
				this.w = a.N();
			}

			Ap() {
				let a = new DynamicDisc;
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

		class class_vc {
			constructor(a) {
				this.ed = window.performance.now();
				this.zd = this.Le = 0;
				this.xa = a;
				this.j = new GameView(a.yc);
				let b = new ImportantUtil(this.j);
				b.ti(a.U);
				window.document.addEventListener('keydown', createHandlerFromInstance(this, this.Id));
				window.document.addEventListener('keyup', createHandlerFromInstance(this, this.Jd));
				window.requestAnimationFrame(createHandlerFromInstance(this, this.kf));
				let c = this;
				this.Hh = window.setInterval(function () {
					c.j.Cf.rm(c.zd);
					c.zd = 0;
				}, 1E3);
				this.Bf(ConnectionConstants.m.Ib.H());
				this.j.f.classList.add('replayer');
				this.pe = new class_Aa(a);
				this.pe.cq = function () {
					b.resetRoomEventHandlers(a.U);
				}
				;
				this.pe.bq = function () {
					c.j.te(null == a.U.M);
					b.ti(a.U);
				}
				;
				this.pe.ol = function () {
					c.j.Ob.cc.er();
				}
				;
				this.j.f.appendChild(this.pe.f);
			}

			ja() {
				window.document.removeEventListener('keydown', createHandlerFromInstance(this, this.Id));
				window.document.removeEventListener('keyup', createHandlerFromInstance(this, this.Jd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Le);
				window.clearInterval(this.Hh);
			}

			kf() {
				this.Le = window.requestAnimationFrame(createHandlerFromInstance(this, this.kf));
				this.xa.D();
				this.Oc();
			}

			Oc() {
				this.pe.D();
				let a = window.performance.now();
				1 == ConnectionConstants.m.Gh.H() && 28.333333333333336 > a - this.ed || (this.ed = a,
					this.zd++,
					this.Bf(ConnectionConstants.m.Ib.H()),
				0 < this.xa.Md || this.j.D(this.xa));
			}

			Id(a) {
				switch (a.keyCode) {
					case 27: // Esc
						let b = this.j;
						b.te(!b.kd);
						a.preventDefault();
						break;
					case 49: // 1
						ConnectionConstants.m.Ib.Ma(1);
						break;
					case 50: // 2
						ConnectionConstants.m.Ib.Ma(2);
						break;
					case 51: // 3
						ConnectionConstants.m.Ib.Ma(3);
						break;
					case 52: // 4
						ConnectionConstants.m.Ib.Ma(4);
						break;
					case 53: // 5
						ConnectionConstants.m.Ib.Ma(5);
						break;
					case 54: // 6
						ConnectionConstants.m.Ib.Ma(6);
						break;
					case 55: // 7
						ConnectionConstants.m.Ib.Ma(7);
						break;
					case 56: // 8
						ConnectionConstants.m.Ib.Ma(15);
						break;
					case 57: // 9
						ConnectionConstants.m.Ib.Ma(-1.5);
						break;
					case 48: // 0
						ConnectionConstants.m.Ib.Ma(-0.5);
						break;
				}
			}

			Bf() {
				let a = ConnectionConstants.m.Ib.H();
				let b = this.j.Ob.cc;
				b.qe = ConnectionConstants.m.yi.H();
				b.Wi = 35;
				b.ne = 0;
				b.mi = 1 + .25 * (a - 1);
			}

			Jd() {
			}
		}

		class class_U {
			constructor() {
			}

			Qr() {
				return 'idkey.' + this.bj + '.' + this.cj + '.' + this.ik;
			}

			Er(a) {
				try {
					let b = StreamWriter.ia(1024);
					b.l(1);
					let c = b.a;
					b.Wb(0);
					let d = b.a;
					b.pc(this.bj);
					b.pc(this.cj);
					b.Xb(a);
					let e = b.a - d;
					b.s.setUint16(c, e, b.Sa);
					let f = new Uint8Array(b.s.buffer, b.s.byteOffset + d, e);
					return window.crypto.subtle.sign(class_U.wm, this.Kl, f).then(function (g) {
						b.Sg(g);
						return b.Vb();
					});
				}
				catch (b) {
					return Promise.reject(GlobalError.Jb(b).Db());
				}
			}

			static Ho() {
				try {
					return window.crypto.subtle.generateKey(class_U.ph, true, ['sign', 'verify']).then(function (a) {
						let b = a.privateKey;
						return window.crypto.subtle.exportKey('jwk', b).then(function (c) {
							let d = c.y
								,
								e = c.d
								,
								f = new class_U;
							f.bj = c.x;
							f.cj = d;
							f.ik = e;
							f.Kl = b;
							return f;
						});
					});
				}
				catch (a) {
					return Promise.reject(GlobalError.Jb(a).Db());
				}
			}

			static Go(a) {
				a = a.split('.');
				if (4 != a.length || 'idkey' != a[0])
					return Promise.reject('Invalid id format');
				let b = a[1]
					,
					c = a[2]
					,
					d = a[3];
				return class_U.gs(b, c, d).then(function (e) {
					let f = new class_U;
					f.bj = b;
					f.cj = c;
					f.ik = d;
					f.Kl = e;
					return f;
				});
			}

			static $r(a, b) {
				try {
					let c = new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
					c.C();
					let d = c.qb(c.Rb())
						,
						e = c.qb()
						,
						f = new class_J(new DataView(d.buffer, d.byteOffset, d.byteLength), false)
						,
						g = f.lc()
						,
						h = f.lc()
						,
						k = f.qb();
					if (k.byteLength != b.byteLength)
						return Promise.reject(null);
					a = 0;
					let l = k.byteLength;
					for (; a < l;) {
						let n = a++;
						if (k[n] != b[n])
							return Promise.reject(null);
					}
					return class_U.fs(g, h).then(function (n) {
						return window.crypto.subtle.verify(class_U.wm, n, e, d);
					}).then(function (n) {
						if (!n)
							throw GlobalError.B(null);
						return g;
					});
				}
				catch (c) {
					return Promise.reject(GlobalError.Jb(c).Db());
				}
			}

			static gs(a, b, c) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['sign'],
						kty: 'EC',
						d: c,
						x: a,
						y: b
					}, class_U.ph, true, ['sign']);
				}
				catch (d) {
					return Promise.reject(GlobalError.Jb(d).Db());
				}
			}

			static fs(a, b) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['verify'],
						kty: 'EC',
						x: a,
						y: b
					}, class_U.ph, true, ['verify']);
				}
				catch (c) {
					return Promise.reject(GlobalError.Jb(c).Db());
				}
			}
		}

		class class_P {
			static fj(a, b) {
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

		class class_ea {
			constructor(a, b) {
				let c = []
					,
					d = 0;
				for (; d < a.length;)
					c.push(this.Bp(a[d++], b));
				this.df = c;
			}

			Io() {
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
					let h = class_ea.rn.eval(f)
						,
						k = 35 * -(this.df.length - 1) + 70 * c;
					f = 180 * class_ea.sn.eval(f);
					a.globalAlpha = h;
					a.drawImage(g, f * (0 != (c & 1) ? -1 : 1) - .5 * g.width, k - .5 * g.height);
					a.globalAlpha = 1;
					++c;
				}
				a.imageSmoothingEnabled = false;
			}

			ar(a) {
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

			oc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			Bp(a, b) {
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
				d.fillStyle = this.oc(b);
				d.fillText(a, 0, 45);
				return c;
			}
		}

		class class_fc {
			constructor(a, b) {
				this.Oj = [];
				this.Qq = /[#@][^\s@#]*$/;
				this.Nb = a;
				this.Zp = b;
				a.hidden = true;
			}

			Qh() {
				this.Yi(null);
			}

			Qn(a, b) {
				b = this.Qq.exec(class_P.substr(a, 0, b));
				if (null != b) {
					var c = b[0]
						,
						d = class_P.substr(c, 1, null).split('')
						,
						e = class_fc.Eo
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
					this.ui = b.index;
					this.cr = c.length;
					this.Xl = a;
					a = function (l) {
						l = k.exec(l.A);
						return null == l ? -1 : l.index + l[0].length;
					}
					;
					b = [];
					c = 0;
					for (d = this.Oj; c < d.length;)
						e = d[c],
							++c,
							f = a(e),
						0 <= f && b.push({
							nn: f,
							item: e
						});
					b.sort(function (l, n) {
						return l.nn - n.nn;
					});
					this.Yi(b);
				}
				else
					this.Yi(null);
			}

			wk(a) {
				a = this.Ok ? '#' + a.aa : '@' + class_Y.replace(a.A, ' ', '_');
				this.Zp(class_P.substr(this.Xl, 0, this.ui) + a + ' ' + class_P.substr(this.Xl, this.ui + this.cr, null), this.ui + a.length + 1);
			}

			Yi(a) {
				var b = null != a && 0 != a.length;
				this.Nb.hidden || class_x.Jf(this.Nb);
				this.ad = null;
				this.Nb.hidden = !b;
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
						this.Nb.appendChild(f);
						f.onclick = function () {
							c.wk(g);
						}
						;
						b.push({
							item: g,
							Ha: f
						});
					}
					this.ad = b;
					this.ad[0].Ha.classList.toggle('selected', true);
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
					b != this.Ac && (a.Ha.classList.toggle('selected', true),
						this.ad[b].Ha.classList.toggle('selected', false));
					a = a.Ha;
					b = a.offsetTop;
					a = b + a.offsetHeight;
					var c = this.Nb.scrollTop + this.Nb.clientHeight;
					b < this.Nb.scrollTop ? this.Nb.scrollTop = b : a > c && (this.Nb.scrollTop = a - this.Nb.clientHeight);
				}
			}

			zo() {
				null != this.ad && (this.wk(this.ad[this.Ac].item),
					this.Qh());
			}

			static Eo(a) {
				return -1 != '.$^{[(|)*+?\\'.indexOf(a) ? '\\' + a : a;
			}
		}

		class class_w {
			static Wm(a) {
				if (null == a)
					return null;
				if (a instanceof Array)
					return Array;
				{
					let b = a.g;
					if (null != b)
						return b;
					a = class_w.Cj(a);
					return null != a ? class_w.An(a) : null;
				}
			}

			static Je(a, b) {
				if (null == a)
					return 'null';
				if (5 <= b.length)
					return '<...>';
				var c = typeof a;
				'function' == c && (a.b || a.Qf) && (c = 'object');
				switch (c) {
					case 'function':
						return '<function>';
					case 'object':
						if (a.Eb) {
							var d = Hb[a.Eb].Wd[a.lb];
							c = d.xc;
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

			static Aj(a, b) {
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
							if (f == b || class_w.Aj(f, b))
								return true;
						}
					}
					a = a.ha;
				}
			}

			static yn(a, b) {
				if (null == b)
					return false;
				switch (b) {
					case Array:
						return a instanceof Array;
					case Ec:
						return 'boolean' == typeof a;
					case Lc:
						return null != a;
					case D:
						return 'number' == typeof a;
					case Xb:
						return 'number' == typeof a ? (a | 0) === a : false;
					case String:
						return 'string' == typeof a;
					default:
						if (null != a)
							if ('function' == typeof b) {
								if (class_w.xn(a, b))
									return true;
							}
							else {
								if ('object' == typeof b && class_w.zn(b) && a instanceof b)
									return true;
							}
						else
							return false;
						return b == Mc && null != a.b || b == Nc && null != a.Qf ? true : null != a.Eb ? Hb[a.Eb] == b : false;
				}
			}

			static xn(a, b) {
				return a instanceof b ? true : b.Bj ? class_w.Aj(class_w.Wm(a), b) : false;
			}

			static I(a, b) {
				if (null == a || class_w.yn(a, b))
					return a;
				throw GlobalError.B('Cannot cast ' + class_Q.De(a) + ' to ' + class_Q.De(b));
			}

			static Cj(a) {
				a = class_w.Bn.call(a).slice(8, -1);
				return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a;
			}

			static zn(a) {
				return null != class_w.Cj(a);
			}

			static An(a) {
				return globalScope[a];
			}
		}

		class class_J {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Sa = b;
				this.a = 0;
			}

			qb(a) {
				null == a && (a = this.s.byteLength - this.a);
				if (this.a + a > this.s.byteLength)
					throw GlobalError.B('Read too much');
				let b = new Uint8Array(this.s.buffer, this.s.byteOffset + this.a, a);
				this.a += a;
				return b;
			}

			Nl(a) {
				let b = this.qb(a);
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

			pi() {
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

			fb() {
				let a = this.s.getUint32(this.a, this.Sa);
				this.a += 4;
				return a;
			}

			oi() {
				let a = this.s.getFloat32(this.a, this.Sa);
				this.a += 4;
				return a;
			}

			v() {
				let a = this.s.getFloat64(this.a, this.Sa);
				this.a += 8;
				return a;
			}

			zb() {
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
					c = class_J.so(this.s, b),
						b += c.length,
						d += String.fromCodePoint(c.char);
				if (b != a)
					throw GlobalError.B('Actual string length differs from the specified: ' + (b - a) + ' bytes');
				this.a = b;
				return d;
			}

			yb() {
				let a = this.zb();
				return 0 >= a ? null : this.oe(a - 1);
			}

			lc() {
				return this.oe(this.zb());
			}

			Pl() {
				return this.oe(this.C());
			}

			Eg() {
				let a = this.lc();
				return JSON.parse(a);
			}

			static so(a, b) {
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
					throw GlobalError.B('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
				return {
					char: c,
					length: b - h
				};
			}
		}

		class class_wb {
			constructor() {
				this.Qb = -1;
				this.cc = new class_W;
				this.Uc = new class_tc;
				this.f = class_x.Fa(class_wb.O);
				let a = class_x.Da(this.f);
				this.Sb = new class_Rb(a.get('red-score'), 0);
				this.Lb = new class_Rb(a.get('blue-score'), 0);
				class_x.replaceWith(a.get('timer'), this.Uc.f);
				class_x.replaceWith(a.get('canvas'), this.cc.sa);
			}

			D(a) {
				let b = a.M;
				null == b ? this.f.hidden = true : (this.f.hidden = false,
					this.Uc.Br(60 * a.Ca),
					this.Uc.Ar(b.Lc | 0),
					this.Lb.set(b.Lb),
					this.Sb.set(b.Sb),
					this.cc.Oc(a, this.Qb));
			}
		}

		class class_$b {
			constructor() {
			}

			Xj() {
				this.A = StringOpsLimit.Vc(this.A, 40);
				this.sb = StringOpsLimit.Vc(this.sb, 3);
			}

			fa(a) {
				this.Xj();
				a.Sa = true;
				a.Wb(this.Od);
				a.Sm(this.A);
				a.Sm(this.sb);
				a.$i(this.Ic);
				a.$i(this.Kc);
				a.l(this.Hb ? 1 : 0);
				a.l(this.ef);
				a.l(this.K);
				a.Sa = false;
			}

			ka(a) {
				a.Sa = true;
				this.Od = a.Rb();
				this.A = a.Pl();
				this.sb = a.Pl();
				this.Ic = a.oi();
				this.Kc = a.oi();
				this.Hb = 0 != a.C();
				this.ef = a.C();
				this.K = a.C();
				a.Sa = false;
				if (30 < this.K || 30 < this.ef)
					throw GlobalError.B(null);
				this.Xj();
			}
		}

		class class_xa {
			constructor() {
				this.cd = new Map;
			}

			Qa(a, b) {
				this.cd.set(a, b);
			}

			H(a) {
				return this.cd.get(a);
			}

			Rq(a) {
				this.cd.delete(a);
			}

			No(a) {
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

			static ag(a) {
				let b = new class_xa
					,
					c = class_Fc.Vm(a)
					,
					d = 0;
				for (; d < c.length;) {
					let e = c[d];
					++d;
					b.cd.set(e, a[e]);
				}
				return b;
			}

			static Ih(a) {
				return class_xa.ag(JSON.parse(a));
			}

			static jk() {
				let a = new class_xa;
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

		class DynamicDisc {
			constructor() {
				this.kc = -1;
				this.jc = null;
				this.tl = 0;
				// Disc cGroup
				this.w = 63;
				// Disc cMask
				this.h = 63;
				this.Tj = 0;
				// Disc color
				this.S = 16777215;
				// Disc damping
				this.Ba = .99;
				// Disc invMass
				this.ba = 1;
				// Disc bCoeff
				this.o = .5;
				// Disc radius
				this.$ = 10;
				// Disc gravity
				this.oa = new Point(0, 0);
				// Disc speed
				this.F = new Point(0, 0);
				// Disc position
				this.a = new Point(0, 0);
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
				a.rb(this.S);
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
				this.S = a.fb();
				this.h = a.N();
				this.w = a.N();
			}

			Yn(a) {
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

			Zn(a) {
				if (0 != 0 * a.tb) {
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
					d = a.be;
					g = this.a;
					b = g.x - d.x;
					d = g.y - d.y;
					g = a.Ng;
					c = a.Og;
					if ((0 < g.x * b + g.y * d && 0 < c.x * b + c.y * d) == 0 >= a.tb)
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

			vc() {
				let a = class_ra.Cc
					,
					b = this.jc;
				this.kc != a && (null == b && (this.jc = b = new DynamicDisc),
					this.kc = a,
					DynamicDisc.xd(b, this));
				return b;
			}

			static xd(a, b) {
				a.$ = b.$;
				a.o = b.o;
				a.ba = b.ba;
				a.Ba = b.Ba;
				a.S = b.S;
				a.Tj = b.Tj;
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

		class class_Tb {
			constructor(a) {
				this.od = null;
				this.Mq = 1E4;
				this.Dd = true;
				a.ck();
				this.Ra = a.Ra;
				this.$c = a.$c;
				this.ve = a.ve;
				this.od = a.od;
				this.Im = window.performance.now();
				let b = null
					,
					c = this;
				b = function () {
					var e = c.Mq - c.Jr();
					0 >= e ? c.ja() : (window.clearTimeout(c.Km),
						e = window.setTimeout(b, e + 1E3),
						c.Km = e);
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
						c.Dd && (c.Im = window.performance.now(),
						null != c.ug && c.ug(f.data));
					}
					;
					e.onclose = function () {
						c.ja();
					};
				}
			}

			Jr() {
				return window.performance.now() - this.Im;
			}

			Ub(a, b) {
				if (this.Dd && (a = this.$c[a],
				'open' == a.readyState)) {
					b = b.Qg();
					try {
						a.send(b);
					}
					catch (c) {
						b = GlobalError.Jb(c).Db(),
							globalScope.console.log(b);
					}
				}
			}

			ja() {
				window.clearTimeout(this.Km);
				this.Dd && (this.Dd = false,
					this.Ra.close(),
				null != this.lf && this.lf());
			}
		}

		class class_Fc {
			static Vm(a) {
				let b = [];
				if (null != a) {
					let d = Object.prototype.hasOwnProperty;
					for (var c in a)
						'__id__' != c && 'hx__closures__' != c && d.call(a, c) && b.push(c);
				}
				return b;
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
				this.lg = this.c.createGain();
				this.sm(ConnectionConstants.m.zm.H() ? 1 : 0);
				this.lg.connect(this.c.destination);
				let c = this;
				this.Ao = Promise.all([b('sounds/chat.ogg').then(function (d) {
					return c.Zj = d;
				}), b('sounds/highlight.wav').then(function (d) {
					return c.Jk = d;
				}), b('sounds/kick.ogg').then(function (d) {
					return c.lp = d;
				}), b('sounds/goal.ogg').then(function (d) {
					return c.Ro = d;
				}), b('sounds/join.ogg').then(function (d) {
					return c.jp = d;
				}), b('sounds/leave.ogg').then(function (d) {
					return c.np = d;
				}), b('sounds/crowd.ogg').then(function (d) {
					c.qo = d;
					c.gk = new class_wc(c.qo, c.c);
					c.gk.connect(c.lg);
				})]);
			}

			cm() {
				this.c.resume();
			}

			hd(a) {
				let b = this.c.createBufferSource();
				b.buffer = a;
				b.connect(this.lg);
				b.start();
			}

			sm(a) {
				this.lg.gain.value = a;
			}
		}

		class class_H {
			static i(a) {
				null != a && a();
			}
		}

		class class_zb {
			constructor(a) {
				this.gl = a.get('notice');
				this.ko = a.get('notice-contents');
				this.ud = a.get('notice-close');
				this.Tl();
			}

			Tl() {
				let a = this;
				class_Z.Dk(ConnectionConstants.Me + 'api/notice').then(function (b) {
					let c = b.content;
					null != c && '' != c && class_zb.Xn != c && (a.ko.innerHTML = c,
							a.gl.hidden = false,
							a.ud.onclick = function () {
								class_zb.Xn = c;
								return a.gl.hidden = true;
							}
					);
				});
			}
		}

		class class_xc {
		}

		class class_yc {
			constructor() {
				function a(g) {
					return new class_ya(g, f, function (h) {
							if (null == h)
								return null;
							try {
								return class_ka.Ih(h);
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
					return new class_ya(g, f, function (k) {
							return null != k ? '0' != k : h;
						}
						, function (k) {
							return k ? '1' : '0';
						}
					);
				}

				function c(g, h) {
					return new class_ya(g, f, function (k) {
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
					return new class_ya(g, f, function (k) {
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
					return new class_ya(g, f, function (l) {
							return null == l ? h : StringOpsLimit.Vc(l, k);
						}
						, function (l) {
							return l;
						}
					);
				}

				let f = class_Ac.Ym();
				this.ke = e('player_name', '', 25);
				this.Ib = d('view_mode', -1);
				this.Gh = d('fps_limit', 0);
				this.rh = e('avatar', null, 2);
				e('rctoken', null, 1024);
				this.Hm = b('team_colors', true);
				this.Kk = b('show_indicators', true);
				this.zm = b('sound_main', true);
				this.Ki = b('sound_chat', true);
				this.ym = b('sound_highlight', true);
				this.xm = b('sound_crowd', true);
				this.Nj = e('player_auth_key', null, 1024);
				this.yd = d('extrapolation', 0);
				this.yi = c('resolution_scale', 1);
				this.vm = b('show_avatars', true);
				this.ak = d('chat_height', 160);
				this.wh = d('chat_focus_height', 140);
				this.xh = c('chat_opacity', .8);
				this.$j = e('chat_bg_mode', 'compact', 50);
				this.Ue = a('geo');
				this.Ve = a('geo_override');
				this.Cg = function () {
					return new class_ya('player_keys', f, function (g) {
							if (null == g)
								return class_xa.jk();
							try {
								return class_xa.Ih(g);
							}
							catch (h) {
								return class_xa.jk();
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

			Lh() {
				return null != this.Ve.H() ? this.Ve.H() : null != this.Ue.H() ? this.Ue.H() : new class_ka;
			}
		}

		class Point {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_La {
		}

		class class_gb {
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
							class_gc.kh(f.objectStore('files').get(a)).then(function (g) {
								try {
									let h = new Stadium;
									h.Vk(g);
									b(h);
								}
								catch (h) {
									g = GlobalError.Jb(h).Db(),
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
							class_gc.kh(e.objectStore('meta').getAll()).then(a, b);
						};
					}
				);
			}

			static Os() {
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
								class_gc.kh(f.objectStore('files').add(a.ye())).then(function (g) {
									g = {
										name: a.A,
										id: g
									};
									return class_gc.kh(f.objectStore('meta').add(g));
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

		class class_wc {
			constructor(a, b) {
				this.mh = null;
				this.Ss = .025;
				this.Be = this.jh = this.Lf = 0;
				this.Zg = b.createGain();
				this.Zg.gain.value = 0;
				b = b.createBufferSource();
				b.buffer = a;
				b.connect(this.Zg);
				b.loop = true;
				b.start();
			}

			update() {
				var a = window.performance.now();
				let b = a - this.cn;
				this.cn = a;
				this.Be += (this.jh - this.Be) * this.Ss;
				this.Lf -= b;
				0 >= this.Lf && (this.Lf = this.jh = 0);
				0 >= this.jh && .05 > this.Be && (window.clearInterval(this.mh),
					this.mh = null,
					this.Be = 0);
				a = ConnectionConstants.m.xm.H() ? this.Be : 0;
				this.Zg.gain.value = a;
			}

			sj(a) {
				this.jh = a;
				this.Lf = 166.66666666666666;
				let b = this;
				null == this.mh && (this.mh = window.setInterval(function () {
					b.update();
				}, 17),
					this.cn = window.performance.now());
			}

			connect(a) {
				this.Zg.connect(a);
			}

			Us(a) {
				let b = a.M;
				if (null != b)
					if (2 == b.Ab)
						0 >= b.Pa && this.sj(1);
					else if (1 == b.Ab) {
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
							z = Team.ga.Dh
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
							if (N.ea == Team.ga) {
								if (null == f || f.a.x * z < N.J.a.x * z)
									f = N.J;
								if (null == g || g.a.x * z > N.J.a.x * z)
									g = N.J;
								if (null == h || d < k)
									h = N.J,
										k = d;
							}
							else if (N.ea == Team.Aa) {
								if (null == l || l.a.x * z < N.J.a.x * z)
									l = N.J;
								if (null == n || n.a.x * z > N.J.a.x * z)
									n = N.J;
								if (null == r || d < t)
									r = N.J,
										t = d;
							}
						}
						null != n && null != g && 0 >= b.Pa && (h.a.x > n.a.x && e.a.x > n.a.x && 20 < e.a.x && this.sj(.3),
						r.a.x < g.a.x && e.a.x < g.a.x && -20 > e.a.x && this.sj(.3));
					}
			}
		}

		class class_kc {
			constructor() {
				this.Bh = 0;
				this.Ep = 400;
				this.Ik = 64;
				this.Zi = 32;
				this.sa = window.document.createElement('canvas');
				this.$f = window.document.createElement('canvas');
				this.f = window.document.createElement('div');
				this.$f.width = this.sa.width = this.Zi;
				this.$f.height = this.sa.height = this.Ik;
				this.Fh = this.$f.getContext('2d', null);
				this.c = this.sa.getContext('2d', null);
				this.c.fillStyle = 'green';
				let a = []
					,
					b = 0
					,
					c = this.Zi;
				for (; b < c;)
					++b,
						a.push(0);
				this.nq = a;
				this.f.appendChild(this.$f);
				this.f.className = 'graph';
				this.f.hidden = true;
			}

			Cn(a) {
				this.f.hidden = false;
				0 > a ? (a = 150,
					this.c.fillStyle = '#c13535') : this.c.fillStyle = '#32FF32';
				let b = this.Zi
					,
					c = this.Ik
					,
					d = this.Bh++;
				this.Bh >= b && (this.Bh = 0);
				this.nq[d] = a;
				this.c.clearRect(d, 0, 1, c);
				a = a * c / this.Ep;
				this.c.fillRect(d, c - a, 1, a);
				this.Fh.clearRect(0, 0, b, c);
				this.Fh.drawImage(this.sa, b - d - 1, 0);
				this.Fh.drawImage(this.sa, -d - 1, 0);
			}
		}

		class class_aa {
			constructor(a, b, c) {
				this.f = class_x.Fa(class_aa.O);
				var d = class_x.Da(this.f);
				d.get('ok');
				d.get('cancel');
				this.$d = d.get('content');
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
				this.$d.textContent = b;
				e.textContent = a;
			}
		}

		class class_ub {
			constructor(a) {
				this.f = class_x.Fa(class_ub.O);
				class_x.Da(this.f).get('features').textContent = a.join(', ');
			}
		}

		class class_gc {
			static kh(a) {
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

		class class_yb {
			static pp() {
				if (null != class_yb.ni)
					return class_yb.ni;
				class_yb.ni = new Promise(function (a, b) {
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
				return class_yb.ni;
			}
		}

		class class_W {
			constructor() {
				this.ed = window.performance.now();
				this.Pg = new Map;
				this.jd = new Map;
				this.qe = 1;
				this.Uj = 100;
				this.Wi = 35;
				this.ne = 0;
				this.mi = 1.5;
				this.Wa = new Point(0, 0);
				this.Nk = false;
				this.Ad = new class_sc;
				this.sa = window.document.createElement('canvas');
				this.sa.mozOpaque = true;
				this.c = this.sa.getContext('2d', {
					alpha: false
				});
				this.Uo = this.c.createPattern(ConnectionConstants.To, null);
				this.fo = this.c.createPattern(ConnectionConstants.eo, null);
				this.co = this.c.createPattern(ConnectionConstants.bo, null);
			}

			Yo(a, b) {
				a = this.jd.get(a.W);
				if (null != a)
					switch (b) {
						case 0:
							a.hg = true;
							break;
						case 1:
							a.hg = false;
					}
			}

			Yr() {
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
				this.Yr();
				class_W.Ji(this.c, true);
				this.c.resetTransform();
				if (null != a.M) {
					c = a.M;
					var e = c.ta
						,
						f = a.getFullPlayerById(b)
						,
						g = null != f ? f.J : null
						,
						h = 0 != this.ne ? this.sa.height / this.ne : this.mi * window.devicePixelRatio * this.qe;
					b = this.Wi * this.qe;
					var k = this.Uj * this.qe
						,
						l = c.T.ff
						,
						n = this.sa.width / h;
					0 < l && n > l && (n = l,
						h = this.sa.width / l);
					l = (this.sa.height - b - k) / h;
					this.Vr(c, g, n, l, d);
					for (var r = 0, t = a.K; r < t.length;) {
						let z = t[r];
						++r;
						if (null == z.J)
							continue;
						let L = this.jd.get(z.W);
						null == L && (L = new class_lb,
							this.jd.set(z.W, L));
						L.D(z, a);
						this.Pg.set(z.J, L);
					}
					this.c.translate(this.sa.width / 2, (this.sa.height + b - k) / 2);
					this.c.scale(h, h);
					this.c.translate(-this.Wa.x, -this.Wa.y);
					this.c.lineWidth = 3;
					this.$q(c.T);
					this.Zq(c.T);
					h = e.G;
					r = 0;
					for (t = e.nb; r < t.length;)
						this.Uq(t[r++], h);
					this.Tq(a, n, l);
					this.Vq(a, f);
					null != g && this.Xq(g.a);
					this.c.lineWidth = 2;
					f = 0;
					for (g = a.K; f < g.length;)
						l = g[f],
							++f,
							n = l.J,
						null != n && (l = this.jd.get(l.W),
							this.Wl(n, l));
					f = 0;
					for (e = e.G; f < e.length;)
						g = e[f],
							++f,
						null == this.Pg.get(g) && this.Wl(g, null);
					this.c.lineWidth = 3;
					this.c.resetTransform();
					this.c.translate(this.sa.width / 2, b + (this.sa.height - b - k) / 2);
					this.Wq(c);
					0 >= c.Pa && (this.Ad.D(d),
						this.Ad.Oc(this.c));
					this.Pg.clear();
					this.Sq(a);
				}
			}

			Sq(a) {
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

			Vr(a, b, c, d, e) {
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
				this.ho(c, d, a.T);
			}

			ho(a, b, c) {
				a > 2 * c.bc ? this.Wa.x = 0 : this.Wa.x + .5 * a > c.bc ? this.Wa.x = c.bc - .5 * a : this.Wa.x - .5 * a < -c.bc && (this.Wa.x = -c.bc + .5 * a);
				b > 2 * c.tc ? this.Wa.y = 0 : this.Wa.y + .5 * b > c.tc ? this.Wa.y = c.tc - .5 * b : this.Wa.y - .5 * b < -c.tc && (this.Wa.y = -c.tc + .5 * b);
			}

			Xq(a) {
				this.c.beginPath();
				this.c.strokeStyle = 'white';
				this.c.globalAlpha = .3;
				this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, false);
				this.c.stroke();
				this.c.globalAlpha = 1;
			}

			Wq(a) {
				let b = 0 < a.Pa;
				this.ur(b);
				b && (120 != a.Pa && (a = a.Pa / 120 * 200,
					this.c.fillStyle = 'white',
					this.c.fillRect(.5 * -a, 100, a, 20)),
					this.Ad.mq.ar(this.c));
			}

			ur(a) {
				this.Nk != a && (this.sa.style.filter = a ? 'grayscale(70%)' : '',
					this.Nk = a);
			}

			fm(a, b, c, d, e, f) {
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

			$q(a) {
				class_W.Ji(this.c, false);
				var b = a.Yd;
				let c = a.Xd
					,
					d = this;
				if (1 == a.sd)
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_W.oc(a.qd),
						this.c.fillRect(0, 0, this.sa.width, this.sa.height),
						this.c.restore(),
						this.c.strokeStyle = '#C7E6BD',
						this.c.fillStyle = this.Uo,
						this.fm(this.c, -b, -c, 2 * b, 2 * c, a.Zc),
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
					this.c.fillStyle = this.co;
					this.c.fill();
					this.c.restore();
					this.c.save();
					this.fm(this.c, -b, -c, 2 * b, 2 * c, a.Zc);
					this.c.scale(2, 2);
					this.c.fillStyle = this.fo;
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
						this.c.fillStyle = class_W.oc(a.qd),
						this.c.fillRect(0, 0, this.sa.width, this.sa.height),
						this.c.restore();
				class_W.Ji(this.c, true);
			}

			Vq(a, b) {
				let c = ConnectionConstants.m.Kk.H()
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
					c && g.hg && this.c.drawImage(ConnectionConstants.Nm, e.x - .5 * ConnectionConstants.Nm.width, e.y - 35);
					f != b && g.Bo(this.c, e.x, e.y + 50);
				}
			}

			Wl(a, b) {
				this.c.beginPath();
				null == b ? (this.c.fillStyle = class_W.oc(a.S),
					this.c.strokeStyle = 'black') : (this.c.fillStyle = b.Pj,
					this.c.strokeStyle = b.uo);
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

			Zq(a) {
				if (null != a) {
					var b = 0;
					for (a = a.V; b < a.length;)
						this.Yq(a[b++]);
				}
			}

			Uq(a, b) {
				if (!(0 > a.S)) {
					this.c.beginPath();
					this.c.strokeStyle = class_W.oc(a.S);
					var c = b[a.ce];
					a = b[a.de];
					null != c && null != a && (c = c.a,
						a = a.a,
						this.c.moveTo(c.x, c.y),
						this.c.lineTo(a.x, a.y),
						this.c.stroke());
				}
			}

			Yq(a) {
				if (a.Ya) {
					this.c.beginPath();
					this.c.strokeStyle = class_W.oc(a.S);
					var b = a.X.a
						,
						c = a.da.a;
					if (0 != 0 * a.tb)
						this.c.moveTo(b.x, b.y),
							this.c.lineTo(c.x, c.y);
					else {
						a = a.be;
						let d = b.x - a.x;
						b = b.y - a.y;
						this.c.arc(a.x, a.y, Math.sqrt(d * d + b * b), Math.atan2(b, d), Math.atan2(c.y - a.y, c.x - a.x));
					}
					this.c.stroke();
				}
			}

			Tq(a, b, c) {
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
					this.c.fillStyle = class_W.oc(b),
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

			er() {
				let a = this.jd.values()
					,
					b = a.next();
				for (; !b.done;) {
					let c = b.value;
					b = a.next();
					c.hg = false;
				}
			}

			static oc(a) {
				return 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
			}

			static Ji(a, b) {
				a.imageSmoothingEnabled = b;
				a.mozImageSmoothingEnabled = b;
			}
		}

		class ConnectionConstants {
		}

		class Joint {
			constructor() {
				this.S = 0;
				this.ue = 1 / 0;
				this.Gb = this.hc = 100;
				this.ce = this.de = 0;
			}

			fa(a) {
				a.l(this.ce);
				a.l(this.de);
				a.u(this.Gb);
				a.u(this.hc);
				a.u(this.ue);
				a.P(this.S);
			}

			ka(a) {
				this.ce = a.C();
				this.de = a.C();
				this.Gb = a.v();
				this.hc = a.v();
				this.ue = a.v();
				this.S = a.N();
			}

			D(a) {
				var b = a[this.ce];
				a = a[this.de];
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
						if (this.Gb >= this.hc) {
							var g = this.Gb;
							var h = 0;
						}
						else if (f <= this.Gb)
							g = this.Gb,
								h = 1;
						else if (f >= this.hc)
							g = this.hc,
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

		class class_Ab {
			constructor(a) {
				this.Ha = class_x.Fa(class_Ab.vj, 'tbody');
				var b = class_x.Da(this.Ha);
				let c = b.get('name')
					,
					d = b.get('players')
					,
					e = b.get('distance')
					,
					f = b.get('pass');
				b = b.get('flag');
				this.Ps = a;
				let g = a.Cd;
				c.textContent = g.A;
				d.textContent = '' + g.K + '/' + g.ef;
				f.textContent = g.Hb ? 'Yes' : 'No';
				e.textContent = '' + (a.Te | 0) + 'km';
				try {
					b.classList.add('f-' + g.sb.toLowerCase());
				}
				catch (h) {
				}
				9 > a.Cd.Od && this.Ha.classList.add('old');
			}
		}

		class class_Ua {
			constructor() {
				this.f = class_x.Fa(class_Ua.O);
				let a = class_x.Da(this.f);
				this.Pb = a.get('log');
				this.$a = a.get('input');
				this.$a.maxLength = 140;
				let b = this;
				a.get('drag').onmousedown = function (c) {
					function d(h) {
						h.preventDefault();
						ConnectionConstants.m.ak.Ma(hc(hc(e + (f - h.y))));
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
							b.Fc.Nb.hidden ? b.$a.blur() : b.Fc.zo();
							break;
						case 13:
							null != b.pl && '' != b.$a.value && b.pl(b.$a.value);
							b.$a.value = '';
							b.$a.blur();
							break;
						case 27:
							b.Fc.Nb.hidden ? (b.$a.value = '',
								b.$a.blur()) : b.Fc.Qh();
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
					null != b.rg && b.rg(true);
					let c = hc(ConnectionConstants.m.wh.H());
					Nb() < c && b.Lg(c);
				}
				;
				this.$a.onblur = function () {
					null != b.rg && b.rg(false);
					b.Fc.Qh();
					b.Lg(Nb());
				}
				;
				this.$a.oninput = function () {
					b.Fc.Qn(b.$a.value, b.$a.selectionStart);
				}
				;
				this.Lg(Nb());
			}

			Lg(a) {
				this.Pb.scrollTop = this.Pb.scrollHeight;
				this.f.style.height = '' + a + 'px';
			}

			yp(a, b, c) {
				let d = window.document.createElement('p');
				d.className = 'announcement';
				d.textContent = a;
				0 <= b && (d.style.color = class_W.oc(b));
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
				var b = this.Pb.clientHeight;
				b = this.Pb.scrollTop + b - this.Pb.scrollHeight >= .5 * -b || !class_Ua.hp(this.Pb);
				this.Pb.prepend(a);
				b && (this.Pb.scrollTop = a.offsetTop);
				for (a = b ? 50 : 100; this.Pb.childElementCount > a;)
					this.Pb.lastElementChild.remove();
			}

			ca(a, b) {
				let c = window.document.createElement('p');
				null != b && (c.className = b);
				c.textContent = a;
				this.Yk(c);
			}

			addNoticeToLogAndHandle(a) {
				this.ca(a, 'notice');
			}

			static hp(a) {
				return a.parentElement.querySelector(':hover') == a;
			}
		}

		class class_qb {
			static Zh(a) {
				return new PerfectScrollbar(a, {
					handlers: class_qb.cp
				});
			}
		}

		class class_ya {
			constructor(a, b, c, d) {
				this.A = a;
				this.ds = d;
				this.Yh = b;
				d = null;
				null != b && (d = b.getItem(a));
				this.Rm = c(d);
			}

			H() {
				return this.Rm;
			}

			Ma(a) {
				this.Rm = a;
				if (null != this.Yh)
					try {
						let b = this.ds(a);
						null == b ? this.Yh.removeItem(this.A) : this.Yh.setItem(this.A, b);
					}
					catch (b) {
					}
			}
		}

		class class_Ba {
			static i(a, b, c) {
				null != a && a(b, c);
			}
		}

		class class_Bb {
			constructor(a, b) {
				this.Vj = a;
				this.Vi = b;
				this.rc = a;
				this.cf = window.performance.now();
			}

			Mm() {
				var a;
				null == a && (a = 1);
				this.D();
				return a <= this.rc ? (this.rc -= a,
					true) : false;
			}

			Kr() {
				this.D();
				let a = 1 - this.rc;
				if (0 >= a)
					return 0;
				let b = window.performance.now();
				return this.cf + a * this.Vi - b;
			}

			jo(a) {
				let b = this.Kr();
				--this.rc;
				window.setTimeout(a, b | 0);
			}

			D() {
				let a = window.performance.now()
					,
					b = Math.floor((a - this.cf) / this.Vi);
				this.cf += b * this.Vi;
				this.rc += b;
				this.rc >= this.Vj && (this.rc = this.Vj,
					this.cf = a);
			}
		}

		class CreateRoomView {
			constructor(a) {
				this.f = class_x.Fa(CreateRoomView.O);
				var b = class_x.Da(this.f);
				this.uh = b.get('cancel');
				this.fk = b.get('create');
				this.hf = b.get('name');
				this.ul = b.get('pass');
				this.bi = b.get('max-pl');
				this.Om = b.get('unlisted');
				this.hf.maxLength = 40;
				this.hf.value = a;
				let c = this;
				this.hf.oninput = function () {
					c.D();
				}
				;
				this.ul.maxLength = 30;
				this.Om.onclick = function () {
					c.Mj(!c.Pm);
				}
				;
				this.uh.onclick = function () {
					class_H.i(c.di);
				}
				;
				this.fk.onclick = function () {
					if (c.Hc()) {
						let d = c.ul.value;
						'' == d && (d = null);
						class_E.i(c.Rp, {
							name: c.hf.value,
							password: d,
							Bs: c.bi.selectedIndex + 2,
							Ts: c.Pm
						});
					}
				}
				;
				for (a = 2; 21 > a;)
					b = window.document.createElement('option'),
						b.textContent = '' + a++,
						this.bi.appendChild(b);
				this.bi.selectedIndex = 10;
				this.Mj(false);
				this.D();
			}

			Mj(a) {
				this.Pm = a;
				this.Om.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes');
			}

			Hc() {
				let a = this.hf.value;
				return 40 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.fk.disabled = !this.Hc();
			}
		}

		class class_Eb {
			constructor() {
				this.yf = null;
				this.f = class_x.Fa(class_Eb.O);
				var a = class_x.Da(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					class_H.i(b.ob);
				}
				;
				this.vh = a.get('change');
				this.vh.disabled = true;
				this.vh.onclick = function () {
					null != b.yf && b.im(b.yf.index);
				}
				;
				a = a.get('list');
				this.li(a);
				let c = class_qb.Zh(a);
				window.setTimeout(function () {
					c.update();
				}, 0);
			}

			li(a) {
				let b = this
					,
					c = 0
					,
					d = class_Ga.ab.length >> 2;
				for (; c < d;) {
					var e = c++;
					let f = e
						,
						g = class_Ga.ab[e << 2];
					e = class_Ga.ab[(e << 2) + 1].toLowerCase();
					let h = window.document.createElement('div');
					h.className = 'elem';
					h.innerHTML = '<div class="flagico f-' + e + '"></div> ' + g;
					a.appendChild(h);
					h.onclick = function () {
						null != b.yf && b.yf.Ha.classList.remove('selected');
						b.vh.disabled = false;
						b.yf = {
							Ha: h,
							index: f
						};
						h.classList.add('selected');
					}
					;
					h.ondblclick = function () {
						b.im(f);
					};
				}
			}

			im(a) {
				let b = new class_ka;
				b.sb = class_Ga.ab[(a << 2) + 1].toLowerCase();
				b.Ic = class_Ga.ab[(a << 2) + 2];
				b.Kc = class_Ga.ab[(a << 2) + 3];
				ConnectionConstants.m.Ve.Ma(b);
				class_H.i(this.ob);
			}
		}

		class StreamWriter {
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

			Nd() {
				return new DataView(this.s.buffer, this.s.byteOffset, this.a);
			}

			Or() {
				return new class_J(this.Nd(), this.Sa);
			}

			uc(a) {
				this.s.byteLength < a && this.fr(2 * this.s.byteLength >= a ? 2 * this.s.byteLength : a);
			}

			fr(a) {
				if (1 > a)
					throw GlobalError.B('Can\'t resize buffer to a capacity lower than 1');
				if (this.s.byteLength < a) {
					let b = new Uint8Array(this.s.buffer);
					a = new ArrayBuffer(a);
					(new Uint8Array(a)).set(b);
					this.s = new DataView(a);
				}
			}

			l(a) {
				let b = this.a++;
				this.uc(this.a);
				this.s.setUint8(b, a);
			}

			aj(a) {
				let b = this.a;
				this.a += 2;
				this.uc(this.a);
				this.s.setInt16(b, a, this.Sa);
			}

			Wb(a) {
				let b = this.a;
				this.a += 2;
				this.uc(this.a);
				this.s.setUint16(b, a, this.Sa);
			}

			P(a) {
				let b = this.a;
				this.a += 4;
				this.uc(this.a);
				this.s.setInt32(b, a, this.Sa);
			}

			rb(a) {
				let b = this.a;
				this.a += 4;
				this.uc(this.a);
				this.s.setUint32(b, a, this.Sa);
			}

			$i(a) {
				let b = this.a;
				this.a += 4;
				this.uc(this.a);
				this.s.setFloat32(b, a, this.Sa);
			}

			u(a) {
				let b = this.a;
				this.a += 8;
				this.uc(this.a);
				this.s.setFloat64(b, a, this.Sa);
			}

			Xb(a) {
				let b = this.a;
				this.a += a.byteLength;
				this.uc(this.a);
				(new Uint8Array(this.s.buffer, this.s.byteOffset, this.s.byteLength)).set(a, b);
			}

			Sg(a) {
				this.Xb(new Uint8Array(a));
			}

			pc(a) {
				this.jb(StreamWriter.Uf(a));
				this.Ug(a);
			}

			Cb(a) {
				null == a ? this.jb(0) : (this.jb(StreamWriter.Uf(a) + 1),
					this.Ug(a));
			}

			Sm(a) {
				let b = StreamWriter.Uf(a);
				if (255 < b)
					throw GlobalError.B(null);
				this.l(b);
				this.Ug(a);
			}

			Tg(a) {
				this.pc(JSON.stringify(a));
			}

			Ug(a) {
				let b = this.a;
				this.uc(b + StreamWriter.Uf(a));
				let c = a.length
					,
					d = 0;
				for (; d < c;)
					b += StreamWriter.Do(class_P.fj(a, d++), this.s, b);
				this.a = b;
			}

			jb(a) {
				let b = this.a;
				a >>>= 0;
				this.uc(b + StreamWriter.On(a));
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
				return new StreamWriter(new DataView(new ArrayBuffer(a)), b);
			}

			static Do(a, b, c) {
				let d = c;
				if (0 > a)
					throw GlobalError.B('Cannot encode UTF8 character: charCode (' + a + ') is negative');
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
					throw GlobalError.B('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
				return c - d;
			}

			static Nn(a) {
				if (0 > a)
					throw GlobalError.B('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
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
				throw GlobalError.B('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
			}

			static Uf(a) {
				let b = 0
					,
					c = a.length
					,
					d = 0;
				for (; d < c;)
					b += StreamWriter.Nn(class_P.fj(a, d++));
				return b;
			}

			static On(a) {
				a >>>= 0;
				return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5;
			}
		}

		class class_Jc {
			static jj() {
				class_m.Ga(class_Ib);
				class_m.Ga(class_Ma);
				class_m.Ga(class_Ya);
				class_m.Ga(class_Ha);
				class_m.Ga(class_Za);
				class_m.Ga(class_Ja);
				class_m.Ga(class_na);
				class_m.Ga(class_$a);
				class_m.Ga(class_ab);
				class_m.Ga(class_bb);
				class_m.Ga(class_za);
				class_m.Ga(class_Na);
				class_m.Ga(class_fa);
				class_m.Ga(class_Oa);
				class_m.Ga(class_Pa);
				class_m.Ga(class_cb);
				class_m.Ga(class_Qa);
				class_m.Ga(class_Ia);
				class_m.Ga(class_Da);
				class_m.Ga(class_Ra);
				class_m.Ga(class_Jb);
				class_m.Ga(class_Ca);
				class_m.Ga(class_Kb);
				class_m.Ga(class_Lb);
			}
		}

		class ConnFa {
			constructor(majorInst) {
				this.Xf = null;
				this.Sk = this.Ah = false;
				this.ed = window.performance.now();
				this.Ld = null;
				this.Le = 0;
				this.Sn = new class_Bb(3, 1E3);
				this.mb = new class_tb;
				this.Ig = 'Waiting for link';
				this.Ai = this.km = false;
				this.zd = 0;
				let self = this;
				this.Yf = new CommandUtil(majorInst, function (d) {
						self.j.field_chatboxViewInst.addNoticeToLogAndHandle(d);
					}
				);
				this.xa = majorInst;
				majorInst.U.to = function (d) {
					self.km != d && (self.km = d,
						majorInst.ra(class_Qa.ma(d)));
				}
				;
				this.j = new GameView(majorInst.yc);
				window.top.document.body.classList.add('hb-playing');
				this.Jh = new ImportantUtil(this.j, majorInst.U.getFullPlayerById(majorInst.yc).A);
				this.Jh.ti(majorInst.U);
				this.j.field_chatboxViewInst.pl = createHandlerFromInstance(this, this.Op);
				this.j.field_chatboxViewInst.rg = createHandlerFromInstance(this, this.Np);
				window.document.addEventListener('keydown', createHandlerFromInstance(this, this.Id));
				window.document.addEventListener('keyup', createHandlerFromInstance(this, this.Jd));
				window.onbeforeunload = function () {
					return 'Are you sure you want to leave the room?';
				}
				;
				this.mb.wg = function (d) {
					majorInst.ra(d);
				}
				;
				this.j.Va.jq = function (d) {
					majorInst.ra(class_za.ma(1, d));
				}
				;
				this.j.Va.aq = function (d) {
					majorInst.ra(class_za.ma(0, d));
				}
				;
				this.j.xg = function (d) {
					majorInst.ra(class_Na.ma(d));
				}
				;
				this.j.Va.gq = function () {
					majorInst.ra(new class_$a);
				}
				;
				this.j.Va.hq = function () {
					majorInst.ra(new class_ab);
				}
				;
				this.j.Va.Up = function () {
					self.Lm();
				}
				;
				this.j.Va.vg = function (d, e) {
					majorInst.ra(class_fa.ma(d, e));
				}
				;
				this.j.Va.je = createHandlerFromInstance(this, this.dr);
				this.j.Va.Lp = function () {
					majorInst.ra(new class_cb);
				}
				;
				this.j.Va.Xp = function () {
					ConnFa.Jq(majorInst);
				}
				;
				this.j.Va.iq = function (d) {
					majorInst.ra(class_Oa.ma(d));
				}
				;
				this.j.Va.pf = function (d) {
					let e = majorInst.U.getFullPlayerById(d);
					if (null != e) {
						let f = new class_fb(e, self.Ai);
						f.ob = function () {
							self.j.bb(null);
						}
						;
						f.Kp = function (g, h) {
							majorInst.ra(class_Pa.ma(g, h));
						}
						;
						f.fi = function () {
							self.Dr(e);
						}
						;
						self.j.bb(f.f, function () {
							f.D(majorInst.U, self.Ai);
						});
					}
				}
				;
				this.j.Va.eq = function () {
					let d = new class_Db;
					d.ob = function () {
						self.j.bb(null);
					}
					;
					self.j.bb(d.f, function () {
						d.wr(self.Ig);
					});
				}
				;
				this.j.Va.Yp = function () {
					if (null == self.Ld)
						self.Hr();
					else {
						let d = self.Ld.stop();
						self.Ld = null;
						ConnFa.hm(d);
					}
					self.j.Va.zr(null != self.Ld);
				}
				;
				window.requestAnimationFrame(createHandlerFromInstance(this, this.kf));
				this.Hh = window.setInterval(function () {
					self.j.Cf.rm(self.zd);
					self.zd = 0;
				}, 1E3);
				this.Zr = window.setInterval(function () {
					majorInst.D();
				}, 50);
				this.Bf();
				var c = ConnectionConstants.m.yd.H();
				c = c < Constants.minE ? Constants.minE : c > Constants.maxE ? Constants.maxE : c;
				0 != c && (majorInst.qm(ConnectionConstants.m.yd.H()),
					this.j.field_chatboxViewInst.addNoticeToLogAndHandle('Extrapolation set to ' + c + ' msec'));

				// Exposing global fields begin
				const theRoom = majorInst.U;

				/**
				 * @param {DynamicDisc} dynDisc
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
					/** @type {Game} */
					const currentGame = theRoom.M;
					return currentGame == null ? null : {
						red: currentGame.Sb,
						blue: currentGame.Lb,
						time: currentGame.Lc,
						scoreLimit: currentGame.gb,
						timeLimit: 60 * currentGame.Ca,
						state: currentGame.Ab
					};
				}

				/**
				 * @param {FullPlayer} fullPlayer
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
						name: fullPlayer.A,
						team: fullPlayer.ea?.aa,
						id: fullPlayer.W,
						admin: fullPlayer.cb,
						position: pos,
						avatar: fullPlayer.Zb,
						flag: fullPlayer.country,
						isBlinking: fullPlayer.Yb,
						//inputKey: fullPlayer.inputKey,
						ping: fullPlayer.xb,
						desynchronized: fullPlayer.Qd
					};
				}

				function getRoomPropertiesObject() {
					return {
						name: theRoom.mc
						//maxPlayers: faMajor1.cap,
						//public: !roomHidden,
						//flag: hostGeo.flagCode,
						//lat: hostGeo.latitude,
						//lon: hostGeo.longitude
					};
				}

				window.parent.g.majorInst = this.xa;
				window.parent.g.sendChat = this.j.field_chatboxViewInst.pl;
				window.parent.g.showChatIndicator = this.j.field_chatboxViewInst.rg;
				window.parent.g.setAvatar = text => this.Yf.pm(text);

				window.parent.g.getPlayer = playerId => {
					const fullPlayer = theRoom.getFullPlayerById(playerId);
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
					const xy = currentGame.ta.G[0].a;
					return {
						x: xy.x,
						y: xy.y
					};
				};
				window.parent.g.getDiscProperties = discIndex => {
					const currentGame = theRoom.M;
					return currentGame == null ? null : getDiscObject(currentGame.ta.G[discIndex]);
				};
				window.parent.g.getPlayerDiscProperties = playerId => {
					if (theRoom.M == null)
						return null;
					const fullPlayer = theRoom.getFullPlayerById(playerId);
					return fullPlayer == null ? null : getDiscObject(fullPlayer.J);
				};
				window.parent.g.getDiscCount = () => {
					const currentGame = theRoom.M;
					return currentGame == null ? 0 : currentGame.ta.G.length;
				};
				window.parent.g.getRoomProperties = () => getRoomPropertiesObject();
				// Assuming that goal posts are symmetric with respect to the origin (that only a sign changes in the coordinates)
				window.parent.g.getGoalPostPoint = () => {
					let goalPostPoint = null;
					const currentGame = theRoom.M;
					if (currentGame != null) {
						const goals = currentGame.T.wc;
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

			Hr() {
				this.Ld = new class_pc(this.xa, 3);
			}

			Dr(a) {
				a = new class_xb(a);
				let b = this;
				a.ob = function () {
					b.j.bb(null);
				}
				;
				a.fi = function (c, d, e) {
					b.xa.ra(class_na.ma(c, d, e));
					b.j.bb(null);
				}
				;
				this.j.bb(a.f);
			}

			ja() {
				window.document.removeEventListener('keydown', createHandlerFromInstance(this, this.Id));
				window.document.removeEventListener('keyup', createHandlerFromInstance(this, this.Jd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Le);
				window.top.document.body.classList.remove('hb-playing');
				this.mb.ja();
				window.clearInterval(this.Hh);
				window.clearInterval(this.Zr);
				window.clearTimeout(this.Xf);
			}

			dr(a) {
				let b = []
					,
					c = 0
					,
					d = this.xa.U.K;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.ea == a && b.push(class_fa.ma(e.W, Team.spec));
				}
				for (a = 0; a < b.length;)
					this.xa.ra(b[a++]);
			}

			kf() {
				this.Le = window.requestAnimationFrame(createHandlerFromInstance(this, this.kf));
				this.mb.D();
				this.xa.D();
				this.Oc();
			}

			Oc() {
				var a = window.performance.now();
				1 == ConnectionConstants.m.Gh.H() && 28.333333333333336 > a - this.ed || (this.ed = a,
					this.zd++,
					this.Bf(),
					a = this.xa.U.getFullPlayerById(this.xa.yc),
				null != a && (this.Ai = a.cb),
					this.j.D(this.xa));
			}

			Op(a) {
				let b = this;
				this.Yf.qf(a) || this.Sn.jo(function () {
					let c = new class_Za;
					c.Yc = a;
					b.xa.ra(c);
				});
			}

			Np(a) {
				this.Ah = a;
				let b = this;
				null == this.Xf && (this.Xf = window.setTimeout(function () {
					b.Xf = null;
					b.lm(b.Ah);
				}, 1E3),
					this.lm(this.Ah));
			}

			lm(a) {
				a != this.Sk && (this.xa.ra(class_Ma.ma(a ? 0 : 1)),
					this.Sk = a);
			}

			Lm() {
				if (null != this.xa.U.M) {
					let a = new class_bb;
					a.If = 120 != this.xa.U.M.Pa;
					this.xa.ra(a);
				}
			}

			Id(a) {
				switch (a.keyCode) {
					case 9:
					case 13:
						this.j.field_chatboxViewInst.$a.focus();
						a.preventDefault();
						break;
					case 27:
						if (this.j.ip())
							this.j.bb(null);
						else {
							let b = this.j;
							b.te(!b.kd);
						}
						a.preventDefault();
						break;
					case 49:
						ConnectionConstants.m.Ib.Ma(1);
						break;
					case 50:
						ConnectionConstants.m.Ib.Ma(2);
						break;
					case 51:
						ConnectionConstants.m.Ib.Ma(3);
						break;
					case 52:
						ConnectionConstants.m.Ib.Ma(4);
						break;
					case 53: // 5
						ConnectionConstants.m.Ib.Ma(5);
						break;
					case 54: // 6
						ConnectionConstants.m.Ib.Ma(6);
						break;
					case 55: // 7
						ConnectionConstants.m.Ib.Ma(7);
						break;
					case 56: // 8
						ConnectionConstants.m.Ib.Ma(15);
						break;
					case 57: // 9
						ConnectionConstants.m.Ib.Ma(-1.5);
						break;
					case 48: // 0
						ConnectionConstants.m.Ib.Ma(-0.5);
						break;
					case 80:
						this.Lm();
						break;
					default:
						this.mb.Id(a.code);
				}
			}

			Bf() {
				let a = ConnectionConstants.m.Ib.H();
				let b = this.j.Ob.cc;
				b.qe = ConnectionConstants.m.yi.H();
				b.Wi = 35;
				b.ne = 0;
				b.mi = 1 + .25 * (a - 1);
			}

			Jd(a) {
				this.mb.Jd(a.code);
			}

			static hm(a) {
				let b = new Date;
				class_Pb.ir(a, 'HBReplay-' + b.getFullYear() + '-' + class_Y.Hf('' + (b.getMonth() + 1)) + '-' + class_Y.Hf('' + b.getDate()) + '-' + class_Y.Hf('' + b.getHours()) + 'h' + class_Y.Hf('' + b.getMinutes()) + 'm.hbr2');
			}

			static Jq(a) {
				var b = a.U.K;
				let c = [];
				var d = 0;
				let e = 0;
				for (var f = 0; f < b.length;) {
					let g = b[f];
					++f;
					g.ea == Team.spec && c.push(g.W);
					g.ea == Team.ga ? ++d : g.ea == Team.Aa && ++e;
				}
				f = c.length;
				0 != f && (b = function () {
					return c.splice(Math.random() * c.length | 0, 1)[0];
				}
					,
					e == d ? 2 > f || (a.ra(class_fa.ma(b(), Team.ga)),
						a.ra(class_fa.ma(b(), Team.Aa))) : (d = e > d ? Team.ga : Team.Aa,
						a.ra(class_fa.ma(b(), d))));
			}
		}

		class class_Ya extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.ao(this.Xg);
			}

			ua(a) {
				a.jb(this.Xg.byteLength);
				a.Sg(this.Xg);
			}

			va(a) {
				this.Xg = a.Nl(a.zb());
			}
		}

		class oaMajor extends VMajor {
			constructor(a) {
				VMajor.wb ? super() : (VMajor.wb = true,
					super(),
					VMajor.wb = false,
					this.Xa(a));
			}

			Xa(a) {
				this.Ui = new class_Va;
				this.ze = this.fc = 0;
				this.se = new class_Va;
				this.yc = this.ec = this.yd = 0;
				this.Ec = .06;
				this.nh = 16.666666666666668;
				this.Pf = 120;
				super.Xa(a);
			}

			ra() {
				throw GlobalError.B('missing implementation');
			}

			cg() {
				throw GlobalError.B('missing implementation');
			}

			D() {
				throw GlobalError.B('missing implementation');
			}

			Gj(a) {
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
						if (f.kb != this.Z)
							break;
						f.apply(this.U);
						null != this.ic && this.ic(f);
						this.fc++;
						++c;
					}
					this.U.D(1);
					this.ze += this.fc;
					this.fc = 0;
					this.Z++;
				}
				for (; c < d;) {
					a = b[c];
					if (a.kb != this.Z || a.Dc != this.fc)
						break;
					a.apply(this.U);
					null != this.ic && this.ic(a);
					this.fc++;
					++c;
				}
				b.splice(0, c);
			}

			Jg(a) {
				a.kb == this.Z && a.Dc <= this.fc ? (a.Dc = this.fc++,
					a.apply(this.U),
				null != this.ic && this.ic(a)) : this.se.$m(a);
			}

			Gk(a, b) {
				if (0 >= a)
					return this.U;
				a > this.Pf && (a = this.Pf);
				class_ra.Cc++;
				let c = this.U.vc();
				null != b ? (this.Ui.ms(this.se, b),
					b = this.Ui) : b = this.se;
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
						if (k.kb > f)
							break;
						k.Gf.za && k.apply(c);
						++d;
					}
					c.D(f != h ? 1 : a - g);
					++f;
				}
				for (a = this.Ui.list; 0 < a.length;)
					a.pop();
				return c;
			}

			tr(a) {
				300 < a && (a = 300);
				0 > a && (a = 0);
				this.ec = this.Ec * a | 0;
			}

			qm(a) {
				this.yd = this.Ec * (-200 > a ? -200 : 200 < a ? 200 : a);
			}
		}

		class class_Ka extends oaMajor {
			constructor(a, b) {
				VMajor.wb = true;
				super();
				VMajor.wb = false;
				this.Xa(a, b);
			}

			Xa(a, b) {
				this.Gi = [];
				this.si = [];
				this.Dg = new class_Va;
				this.Ip = 1;
				this.wd = this.Jm = 0;
				this.Ti = new class_Vb(50);
				this.Bg = new class_Vb(50);
				this.vn = 1E3;
				this.pk = '';
				super.Xa(b.state);
				this.Uh = b.Vs;
				this.Re = b.ps;
				let c = null
					,
					d = this;
				c = function (e) {
					d.Af(0);
					let f = StreamWriter.ia();
					f.Wb(b.version);
					f.Cb(b.password);
					d.sc = new class_Yb(b.mj, b.iceServers, a, class_xc.channels, f, b.qn);
					d.sc.qh = e;
					d.sc.Gd = function (h) {
						d.sc = null;
						d.pa = h;
						h.ug = function (k) {
							k = new class_J(new DataView(k));
							d.Cq(k);
						}
						;
						h.lf = function () {
							3 != d.wd && class_E.i(d.mf, ia.Nf('Connection closed'));
							d.ja();
						}
						;
						h = window.setTimeout(function () {
							class_E.i(d.mf, ia.Nf('Game state timeout'));
							d.ja();
						}, 1E4);
						d.xe = h;
						d.Af(2);
					}
					;
					d.sc.ql = function () {
						d.Af(1);
					}
					;
					let g = false;
					d.sc.il = function () {
						g = true;
					}
					;
					d.sc.gd = function (h) {
						if (!e && 1 == d.wd && g)
							class_H.i(d.$p),
								c(true);
						else {
							let k = class_Yb.Mo(h);
							switch (h.lb) {
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
									h = ia.Nf(k);
							}
							class_E.i(d.mf, h);
							d.ja(k);
						}
					};
				}
				;
				c(null != b.mn && b.mn);
			}

			ja(a) {
				null != this.sc && (this.sc.gd = null,
					this.sc.Pn(),
					this.sc = null);
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
				this.Dd() && window.performance.now() - this.Jm > this.vn && this.Ci();
				this.bd = window.performance.now() * this.Ec + this.Ti.gh() - this.Z;
				this.Wj();
			}

			cg() {
				return this.Dd() ? (0 > this.ec && (this.ec = 0),
					this.Gk(window.performance.now() * this.Ec + this.Ti.gh() - this.Z + this.ec + this.yd, this.Dg)) : this.U;
			}

			Wj() {
				0 > this.bd && (this.bd = 0);
				this.bd > this.Pf && (this.bd = this.Pf);
			}

			Cq(a) {
				switch (a.C()) {
					case 0:
						this.zq(a);
						break;
					case 1:
						this.yq(a);
						break;
					case 2:
						this.vq(a);
						break;
					case 3:
						this.Eq(a);
						break;
					case 4:
						this.Bq(a);
						break;
					case 5:
						this.xq(a);
						break;
					case 6:
						this.Dq(a);
				}
			}

			zq(a) {
				a = a.qb(a.zb());
				let b = Promise.resolve(null);
				null != this.Re && (b = this.Re.Er(a));
				let c = this;
				b.catch(function () {
					return null;
				}).then(function (d) {
					c.rr(d);
				});
			}

			yq(a) {
				a = pako.inflateRaw(a.qb());
				a = new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength));
				this.yc = a.Rb();
				this.Z = a.fb();
				this.ze = a.fb();
				this.fc = a.zb();
				this.bd = 10;
				for (this.U.ka(a); 0 < a.s.byteLength - a.a;)
					this.Jg(this.Qm(a));
				window.clearTimeout(this.xe);
				this.Af(3);
			}

			rr(a) {
				let b = StreamWriter.ia();
				b.l(0);
				null != a ? (b.jb(a.byteLength),
					b.Xb(a)) : b.jb(0);
				b.jb(this.Uh.byteLength);
				b.Sg(this.Uh);
				this.Ub(b);
				this.Uh = null;
			}

			Ub(a, b) {
				null == b && (b = 0);
				this.pa.Ub(b, a);
			}

			Qm(a) {
				let b = a.fb()
					,
					c = a.zb()
					,
					d = a.Rb()
					,
					e = a.fb();
				a = class_m.lh(a);
				a.R = d;
				a.Ae = e;
				a.kb = b;
				a.Dc = c;
				return a;
			}

			vq(a) {
				a = this.Qm(a);
				this.Jg(a);
				a.R == this.yc && this.Dg.Ns(a.Ae);
				this.Ll();
			}

			Dq(a) {
				a = class_m.lh(a);
				a.R = 0;
				a.Ae = 0;
				a.apply(this.U);
				null != this.ic && this.ic(a);
			}

			Eq(a) {
				let b = a.fb();
				a = a.fb();
				this.si.push({
					frame: b,
					Ff: a
				});
				this.Ll();
			}

			Ll() {
				if (3 == this.wd) {
					for (var a = 0, b = this.si; a < b.length;) {
						var c = b[a];
						++a;
						c.frame <= this.Z || c.Ff == this.ze + this.fc + this.se.ns(c.frame) && this.En(c.frame - this.Z);
					}
					a = 0;
					b = this.si;
					c = 0;
					for (var d = b.length; c < d;) {
						let e = b[c++];
						e.frame > this.Z && (b[a] = e,
							++a);
					}
					for (; b.length > a;)
						b.pop();
					this.Dg.Ms(this.Z);
				}
			}

			xq(a) {
				let b = 0 != a.C()
					,
					c = a.lc()
					,
					d = '';
				0 < a.s.byteLength - a.a && (d = a.lc());
				a = b ? 'You were banned' : 'You were kicked';
				'' != d && (a += ' by ' + d);
				'' != c && (a += ' (' + c + ')');
				this.ja(a);
			}

			Bq(a) {
				var b = a.v();
				a = a.v();
				let c = window.performance.now() - a;
				this.Ti.add(b - a * this.Ec);
				this.Bg.add(c);
				let d = b = 0
					,
					e = this.Gi;
				for (; d < e.length;) {
					let f = e[d];
					++d;
					if (f > a)
						break;
					f < a ? class_E.i(this.nl, -1) : class_E.i(this.nl, c);
					++b;
				}
				this.Gi.splice(0, b);
			}

			Ci() {
				let a = window.performance.now();
				this.Jm = a;
				this.Gi.push(a);
				let b = this.Bg.gh() | 0
					,
					c = StreamWriter.ia();
				c.l(2);
				c.u(a);
				c.jb(b);
				this.Ub(c, 2);
			}

			En(a) {
				this.Gj(a);
				this.bd -= a;
				this.Wj();
			}

			ra(a) {
				if (3 == this.wd) {
					var b = this.Ip++
						,
						c = 0;
					0 > this.ec && (this.ec = 0);
					a.Gf.delay && (c = this.Z + (this.bd | 0) + this.ec);
					var d = StreamWriter.ia();
					d.l(1);
					d.rb(c);
					d.rb(b);
					class_m.oj(a, d);
					this.Ub(d);
					a.Gf.za && (a.Ae = b,
						a.R = this.yc,
						a.kb = c,
						this.Dg.$m(a));
				}
			}

			static yh(a) {
				switch (a.lb) {
					case 0:
						return 'Cancelled';
					case 1:
						return 'Failed to connect to peer.';
					case 2:
						return class_Kc.description(a.reason);
					case 3:
						return a.description;
				}
			}
		}

		class class_dc extends oaMajor {
			constructor(a) {
				VMajor.wb = true;
				super();
				VMajor.wb = false;
				this.Xa(a);
			}

			Xa(a) {
				this.Rj = new Map;
				this.Hb = null;
				this.og = 32;
				this.Qe = new Map;
				this.class_dc = [];
				this.zi = 4;
				this.Vn = 600;
				super.Xa(a.state);
				this.Cp = a.mj;
				this.bs = a.version;
				this.Dp = 1;
				this.Tk = this.yc = 0;
				this.Oi = window.performance.now();
				this.Mc = new class_jb(this.Cp, a.iceServers, class_xc.channels, a.qn);
				this.Mc.ek = createHandlerFromInstance(this, this.Xo);
				let b = this;
				this.Mc.ll = function (c) {
					b.Tp(c);
				}
				;
				this.Mc.tg = function (c) {
					class_E.i(b.tg, c);
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
					b = this.class_dc;
				for (; a < b.length;) {
					let c = b[a++].pa;
					c.lf = null;
					c.ug = null;
					c.ja();
				}
			}

			Co(a, b, c, d) {
				let e = this.Qe.get(a);
				if (null != e) {
					if (d) {
						let f = this.Mc.In(e.pa);
						this.Rj.set(a, f);
					}
					a = StreamWriter.ia();
					a.l(5);
					a.l(d ? 1 : 0);
					a.pc(b);
					null == c && (c = '');
					a.pc(c);
					e.Ub(a);
					e.pa.ja();
				}
			}

			Zd() {
				this.Mc.Zd();
				this.Rj.clear();
			}

			Ii(a) {
				this.Mc.Ii(a);
			}

			Hi(a) {
				this.Mc.Hi(a);
			}

			ra(a) {
				a.R = 0;
				let b = this.Z + this.zi + this.ec;
				a.Gf.delay || (b = this.Z);
				a.kb = b;
				this.Jg(a);
				this.Fi();
				0 < this.class_dc.length && this.Kg(this.$h(a), 1);
			}

			D() {
				let a = ((window.performance.now() - this.Oi) * this.Ec | 0) - this.Z;
				0 < a && this.Gj(a);
				7 <= this.Z - this.Uk && this.Fi();
				this.Z - this.Tk >= this.Vn && (this.Fi(),
					this.pr());
			}

			cg() {
				0 > this.ec && (this.ec = 0);
				return this.Gk((window.performance.now() - this.Oi) * this.Ec - this.Z + this.zi + this.ec + this.yd);
			}

			Xo(a, b) {
				if (this.class_dc.length >= this.og)
					return db.Of(4100);
				try {
					if (b.Rb() != this.bs)
						throw GlobalError.B(null);
				}
				catch (c) {
					return db.Of(4103);
				}
				try {
					let c = b.yb();
					if (null != this.Hb && c != this.Hb)
						throw GlobalError.B(null);
				}
				catch (c) {
					return db.Of(4101);
				}
				return db.yj;
			}

			Tp(a) {
				if (this.class_dc.length >= this.og)
					a.ja();
				else {
					var b = new class_uc(a);
					this.class_dc.push(b);
					var c = this;
					a.ug = function (d) {
						d = new class_J(new DataView(d));
						c.wq(d, b);
					}
					;
					a.lf = function () {
						class_P.remove(c.class_dc, b);
						c.Qe.delete(b.aa);
						class_E.i(c.Qp, b.aa);
					}
					;
					a = StreamWriter.ia(1 + b.Pe.byteLength);
					a.l(0);
					a.jb(b.Pe.byteLength);
					a.Xb(b.Pe);
					b.Ub(a);
				}
			}

			$h(a) {
				let b = StreamWriter.ia();
				b.l(2);
				this.sl(a, b);
				return b;
			}

			sl(a, b) {
				b.rb(a.kb);
				b.jb(a.Dc);
				b.Wb(a.R);
				b.rb(a.Ae);
				class_m.oj(a, b);
			}

			Fi() {
				if (!(0 >= this.Z - this.Uk) && 0 != this.class_dc.length) {
					var a = StreamWriter.ia();
					a.l(3);
					a.rb(this.Z);
					a.rb(this.ze);
					this.Kg(a, 2);
					this.Uk = this.Z;
				}
			}

			Kg(a, b) {
				null == b && (b = 0);
				let c = 0
					,
					d = this.class_dc;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.Gg && e.Ub(a, b);
				}
			}

			qr(a) {
				let b = StreamWriter.ia();
				b.l(1);
				let c = StreamWriter.ia();
				c.Wb(a.aa);
				c.rb(this.Z);
				c.rb(this.ze);
				c.jb(this.fc);
				this.U.fa(c);
				let d = this.se.list
					,
					e = 0
					,
					f = d.length;
				for (; e < f;)
					this.sl(d[e++], c);
				b.Xb(pako.deflateRaw(c.Vb()));
				a.Ub(b);
			}

			pr() {
				this.Tk = this.Z;
				if (0 != this.class_dc.length) {
					var a = new class_Ya;
					a.kb = this.Z;
					a.Dc = this.fc++;
					a.R = 0;
					a.Xg = this.U.Jo();
					this.Kg(this.$h(a));
				}
			}

			Gq(a, b) {
				let c = a.qb(a.zb())
					,
					d = a.qb(a.zb());
				a = b.Pe;
				b.Pe = null;
				let e = this;
				class_U.$r(c, a).catch(function () {
					return null;
				}).then(function (f) {
					try {
						if (-1 != e.class_dc.indexOf(b)) {
							b.Ws = f;
							var g = e.Dp++;
							b.aa = g;
							e.Qe.set(g, b);
							class_Ba.i(e.Pp, g, new class_J(new DataView(d.buffer, d.byteOffset, d.byteLength), false));
							b.Gg = true;
							e.qr(b);
						}
					}
					catch (h) {
						f = GlobalError.Jb(h).Db(),
							e.Hk(b, f);
					}
				});
			}

			wq(a, b) {
				this.D();
				try {
					if (!b.Qo.Mm())
						throw GlobalError.B(1);
					let c = a.C();
					if (b.Gg)
						switch (c) {
							case 1:
								this.Hq(a, b);
								break;
							case 2:
								this.Aq(a, b);
								break;
							default:
								throw GlobalError.B(0);
						}
					else if (0 == c)
						this.Gq(a, b);
					else
						throw GlobalError.B(0);
					if (0 < a.s.byteLength - a.a)
						throw GlobalError.B(2);
				}
				catch (c) {
					this.Hk(b, GlobalError.Jb(c).Db());
				}
			}

			Hk(a, b) {
				globalScope.console.log(b);
				this.Qe.delete(a.aa);
				class_P.remove(this.class_dc, a);
				a.Gg && null != this.jl && this.jl(a.aa);
				a.pa.ja();
			}

			Aq(a, b) {
				let c = a.v();
				b.xb = a.zb();
				a = StreamWriter.ia();
				a.l(4);
				a.u((window.performance.now() - this.Oi) * this.Ec + this.zi);
				a.u(c);
				b.Ub(a, 2);
			}

			Hq(a, b) {
				let c = a.fb()
					,
					d = a.fb();
				a = class_m.lh(a);
				var e = a.Gf.qj;
				if (null != e) {
					var f = b.Ej.get(e);
					null == f && (f = new class_Bb(e.dj, e.wj),
						b.Ej.set(e, f));
					if (!f.Mm())
						throw GlobalError.B(3);
				}
				e = this.Z;
				f = this.Z + 120;
				c < e ? c = e : c > f && (c = f);
				a.Ae = d;
				a.R = b.aa;
				a.kb = c;
				a.jn(this.U) && (this.Jg(a),
					this.Kg(this.$h(a), 1));
			}
		}

		class class_ec extends oaMajor {
			constructor(a, b, c) {
				VMajor.wb = true;
				super();
				VMajor.wb = false;
				this.Xa(a, b, c);
			}

			Xa(a, b, c) {
				this.el = [];
				this.zl = 5;
				this.Md = -1;
				this.qg = this.Tb = this.Wh = this.Ck = 0;
				super.Xa(b);
				a = new class_J(new DataView(a.buffer), false);
				if (1212305970 != a.fb())
					throw GlobalError.B('');
				b = a.fb();
				if (c != b)
					throw GlobalError.B(new class_Ob(b));
				this.tf = a.fb();
				c = pako.inflateRaw(a.qb());
				this.Pc = new class_J(new DataView(c.buffer, c.byteOffset, c.byteLength));
				this.Kq(this.Pc);
				c = this.Pc.qb();
				this.Pc = new class_J(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
				this.wi();
				this.Wh = window.performance.now();
				this.yc = -1;
			}

			Kq(a) {
				let b = a.Rb()
					,
					c = 0
					,
					d = 0;
				for (; d < b;) {
					++d;
					c += a.zb();
					let e = a.C();
					this.el.push({
						pj: c / this.tf,
						kind: e
					});
				}
			}

			Ol() {
				var a = this.Pc;
				0 < a.s.byteLength - a.a ? (a = this.Pc.zb(),
					this.qg += a,
					a = this.Pc.Rb(),
					this.pg = class_m.lh(this.Pc),
					this.pg.R = a) : this.pg = null;
			}

			Po() {
				return this.Z / this.tf;
			}

			ra() {
			}

			cg() {
				this.D();
				class_ra.Cc++;
				let a = this.U.vc();
				a.D(this.Ck);
				return a;
			}

			D() {
				var a = window.performance.now()
					,
					b = a - this.Wh;
				this.Wh = a;
				0 < this.Md ? (this.Tb += 1E4,
				this.Tb > this.Md && (this.Tb = this.Md,
					this.Md = -1)) : this.Tb += b * this.zl;
				a = this.tf * this.nh;
				this.Tb > a && (this.Tb = a);
				b = this.Tb * this.Ec;
				a = b | 0;
				for (this.Ck = b - a; this.Z < a;) {
					for (; null != this.pg && this.qg == this.Z;)
						b = this.pg,
							b.apply(this.U),
						null != this.ic && this.ic(b),
							this.Ol();
					this.Z++;
					this.U.D(1);
				}
			}

			mr(a) {
				this.Md = a;
				a < this.Tb && this.wi();
			}

			wi() {
				this.qg = 0;
				this.Tb = this.Z = this.Pc.a = 0;
				this.U.ka(this.Pc);
				this.Ol();
			}
		}

		class class_Qa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && this.eh != b.Qd && (b.Qd = this.eh,
					class_E.i(a.onPlayerDesyncChangeFun, b));
			}

			ua(a) {
				a.l(this.eh ? 1 : 0);
			}

			va(a) {
				this.eh = 0 != a.C();
			}

			static ma(a) {
				let b = new class_Qa;
				b.eh = a;
				return b;
			}
		}

		class class_Ib extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				0 == this.R && class_bc.i(a.onAnnouncementFun, this.Yc, this.color, this.style, this.pn);
			}

			ua(a) {
				a.pc(StringOpsLimit.Vc(this.Yc, 1E3));
				a.P(this.color);
				a.l(this.style);
				a.l(this.pn);
			}

			va(a) {
				this.Yc = a.lc();
				if (1E3 < this.Yc.length)
					throw GlobalError.B('message too long');
				this.color = a.N();
				this.style = a.C();
				this.pn = a.C();
			}
		}

		class class_cb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R)) {
					for (var b = a.getFullPlayerById(this.R), c = a.K, d = [], e = 0, f = 0, g = 0; g < c.length;) {
						let h = c[g];
						++g;
						h.ea == Team.spec && d.push(h);
						h.ea == Team.ga ? ++e : h.ea == Team.Aa && ++f;
					}
					c = d.length;
					0 != c && (f == e ? 2 > c || (a.Wf(b, d[0], Team.ga),
						a.Wf(b, d[1], Team.Aa)) : a.Wf(b, d[0], f > e ? Team.ga : Team.Aa));
				}
			}

			ua() {
			}

			va() {
			}
		}

		class class_za extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R) && null == a.M)
					switch (this.tj) {
						case 0:
							var b = this.newValue;
							a.gb = 0 > b ? 0 : 99 < b ? 99 : b;
							break;
						case 1:
							b = this.newValue,
								a.Ca = 0 > b ? 0 : 99 < b ? 99 : b;
					}
			}

			ua(a) {
				a.P(this.tj);
				a.P(this.newValue);
			}

			va(a) {
				this.tj = a.N();
				this.newValue = a.N();
			}

			static ma(a, b) {
				let c = new class_za;
				c.tj = a;
				c.newValue = b;
				return c;
			}
		}

		class class_Pa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R)) {
					var b = a.getFullPlayerById(this.R)
						,
						c = a.getFullPlayerById(this.Rd);
					null != c && 0 != c.W && c.cb != this.dh && (c.cb = this.dh,
					null != a.onPlayerAdminChangeFun && a.onPlayerAdminChangeFun(b, c));
				}
			}

			ua(a) {
				a.P(this.Rd);
				a.l(this.dh ? 1 : 0);
			}

			va(a) {
				this.Rd = a.N();
				this.dh = 0 != a.C();
			}

			static ma(a, b) {
				let c = new class_Pa;
				c.Rd = a;
				c.dh = b;
				return c;
			}
		}

		class class_Da extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a = a.getFullPlayerById(this.R);
				null != a && (a.Zb = this.ac);
			}

			ua(a) {
				a.Cb(this.ac);
			}

			va(a) {
				this.ac = a.yb();
				null != this.ac && (this.ac = StringOpsLimit.Vc(this.ac, 2));
			}

			static ma(a) {
				let b = new class_Da;
				b.ac = a;
				return b;
			}
		}

		class class_fa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.Rd);
				if (null != b) {
					var c = a.getFullPlayerById(this.R)
						,
						d = a.Mb(this.R);
					(d = d || b == c && !a.Tc && null == a.M) && a.Wf(c, b, this.nj);
				}
			}

			ua(a) {
				a.P(this.Rd);
				a.l(this.nj.aa);
			}

			va(a) {
				this.Rd = a.N();
				a = a.sf();
				this.nj = 1 == a ? Team.ga : 2 == a ? Team.Aa : Team.spec;
			}

			static ma(a, b) {
				let c = new class_fa;
				c.Rd = a;
				c.nj = b;
				return c;
			}
		}

		class class_Na extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R)) {
					var b = a.getFullPlayerById(this.R);
					null == a.M && (a.T = this.Ud,
					null != a.onStadiumChangeFun && a.onStadiumChangeFun(b, this.Ud));
				}
			}

			ua(a) {
				var b = StreamWriter.ia();
				this.Ud.fa(b);
				b = pako.deflateRaw(b.Vb());
				a.Wb(b.byteLength);
				a.Xb(b);
			}

			va(a) {
				a = pako.inflateRaw(a.qb(a.Rb()));
				this.Ud = Stadium.ka(new class_J(new DataView(a.buffer, a.byteOffset, a.byteLength)));
			}

			static ma(a) {
				let b = new class_Na;
				b.Ud = a;
				return b;
			}
		}

		class class_Ra extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Mb(this.R) && this.ea != Team.spec && (a.ib[this.ea.aa] = this.Yg);
			}

			ua(a) {
				a.l(this.ea.aa);
				this.Yg.fa(a);
			}

			va(a) {
				let b = a.sf();
				this.ea = 1 == b ? Team.ga : 2 == b ? Team.Aa : Team.spec;
				this.Yg = new TeamColors;
				this.Yg.ka(a);
			}
		}

		class class_Oa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Mb(this.R) && (a.Tc = this.newValue);
			}

			ua(a) {
				a.l(this.newValue ? 1 : 0);
			}

			va(a) {
				this.newValue = 0 != a.C();
			}

			static ma(a) {
				let b = new class_Oa;
				b.newValue = a;
				return b;
			}
		}

		class class_Ja extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = new FullPlayer;
					b.W = this.W;
					b.A = this.name;
					b.country = this.gj;
					b.Zb = this.Zb;
					a.K.push(b);
					a = a.onPlayerJoinFun;
					null != a && a(b);
				}
			}

			ua(a) {
				a.P(this.W);
				a.Cb(this.name);
				a.Cb(this.gj);
				a.Cb(this.Zb);
			}

			va(a) {
				this.W = a.N();
				this.name = a.yb();
				this.gj = a.yb();
				this.Zb = a.yb();
			}

			static ma(a, b, c, d) {
				let e = new class_Ja;
				e.W = a;
				e.name = b;
				e.gj = c;
				e.Zb = d;
				return e;
			}
		}

		class class_Kb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a = a.getFullPlayerById(this.Ee);
				null != a && 0 == this.R && (a.Pd = this.ac);
			}

			ua(a) {
				a.Cb(this.ac);
				a.P(this.Ee);
			}

			va(a) {
				this.ac = a.yb();
				this.Ee = a.N();
				null != this.ac && (this.ac = StringOpsLimit.Vc(this.ac, 2));
			}
		}

		class class_bb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.M;
				if (null != b && a.Mb(this.R)) {
					var c = a.getFullPlayerById(this.R)
						,
						d = 120 == b.Pa
						,
						e = 0 < b.Pa;
					this.If ? b.Pa = 120 : 120 == b.Pa && (b.Pa = 119);
					d != this.If && class_ic.i(a.onGamePauseFun, c, this.If, e);
				}
			}

			ua(a) {
				a.l(this.If ? 1 : 0);
			}

			va(a) {
				this.If = 0 != a.C();
			}
		}

		class class_Za extends class_m {
			constructor() {
				super();
			}

			jn(a) {
				if (null != a.pq) {
					let b = a.getFullPlayerById(this.R);
					return null == b ? false : a.pq(b, this.Yc);
				}
				return true;
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && class_Ba.i(a.onPlayerChatFun, b, this.Yc);
			}

			ua(a) {
				a.pc(StringOpsLimit.Vc(this.Yc, 140));
			}

			va(a) {
				this.Yc = a.lc();
				if (140 < this.Yc.length)
					throw GlobalError.B('message too long');
			}
		}

		class class_Ha extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				if (null != b) {
					var c = this.input;
					0 == (b.mb & 16) && 0 != (c & 16) && (b.Yb = true);
					b.mb = c;
					null != a.qq && a.qq(b);
				}
			}

			ua(a) {
				a.rb(this.input);
			}

			va(a) {
				this.input = a.fb();
			}
		}

		class class_Ma extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && class_Ba.i(a.onChatIndicatorStateChangeFun, b, this.uj);
			}

			ua(a) {
				a.l(this.uj);
			}

			va(a) {
				this.uj = a.C();
			}

			static ma(a) {
				let b = new class_Ma;
				b.uj = a;
				return b;
			}
		}

		class class_na extends class_m {
			constructor() {
				class_m.wb = true;
				super();
				class_m.wb = false;
				this.Xa();
			}

			Xa() {
				this.Wg = false;
				super.Xa();
			}

			apply(a) {
				if (0 != this.W && a.Mb(this.R)) {
					var b = a.getFullPlayerById(this.W);
					if (null != b) {
						var c = a.getFullPlayerById(this.R);
						class_P.remove(a.K, b);
						null != a.M && class_P.remove(a.M.ta.G, b.J);
						class_bc.i(a.onPlayerLeaveFun, b, this.md, this.Wg, c);
					}
				}
			}

			ua(a) {
				null != this.md && (this.md = StringOpsLimit.Vc(this.md, 100));
				a.P(this.W);
				a.Cb(this.md);
				a.l(this.Wg ? 1 : 0);
			}

			va(a) {
				this.W = a.N();
				this.md = a.yb();
				this.Wg = 0 != a.C();
				if (null != this.md && 100 < this.md.length)
					throw GlobalError.B('string too long');
			}

			static ma(a, b, c) {
				let d = new class_na;
				d.W = a;
				d.md = b;
				d.Wg = c;
				return d;
			}
		}

		class class_Jb extends class_m {
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
					for (e = this.fh; d < e.length;) {
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
					a.K = this.hn ? c.concat(d) : d.concat(c);
				}
			}

			ua(a) {
				a.l(this.hn ? 1 : 0);
				a.l(this.fh.length);
				let b = 0
					,
					c = this.fh;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			va(a) {
				this.hn = 0 != a.C();
				let b = a.C();
				this.fh = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.fh.push(a.N());
			}
		}

		class class_Lb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = a.M;
					if (null != b) {
						if (this.an) {
							a = a.getFullPlayerById(this.Ee);
							if (null == a)
								return;
							a = a.J;
						}
						else
							a = b.ta.G[this.Ee];
						null != a && (null != this.Ia[0] && (a.a.x = this.Ia[0]),
						null != this.Ia[1] && (a.a.y = this.Ia[1]),
						null != this.Ia[2] && (a.F.x = this.Ia[2]),
						null != this.Ia[3] && (a.F.y = this.Ia[3]),
						null != this.Ia[4] && (a.oa.x = this.Ia[4]),
						null != this.Ia[5] && (a.oa.y = this.Ia[5]),
						null != this.Ia[6] && (a.$ = this.Ia[6]),
						null != this.Ia[7] && (a.o = this.Ia[7]),
						null != this.Ia[8] && (a.ba = this.Ia[8]),
						null != this.Ia[9] && (a.Ba = this.Ia[9]),
						null != this.Wc[0] && (a.S = this.Wc[0]),
						null != this.Wc[1] && (a.h = this.Wc[1]),
						null != this.Wc[2] && (a.w = this.Wc[2]));
					}
				}
			}

			ua(a) {
				a.P(this.Ee);
				a.l(this.an ? 1 : 0);
				let b = a.a;
				a.Wb(0);
				let c = 0;
				for (var d = 1, e = 0, f = this.Ia; e < f.length;) {
					var g = f[e];
					++e;
					null != g && (c |= d,
						a.$i(g));
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
				this.an = 0 != a.C();
				let b = a.Rb();
				this.Ia = [];
				for (var c = 0; 10 > c;) {
					var d = c++;
					this.Ia[d] = null;
					0 != (b & 1) && (this.Ia[d] = a.oi());
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

		class class_Ca extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Mb(this.R) && a.vr(a.getFullPlayerById(this.R), this.min, this.rate, this.ej);
			}

			ua(a) {
				a.P(this.min);
				a.P(this.rate);
				a.P(this.ej);
			}

			va(a) {
				this.min = a.N();
				this.rate = a.N();
				this.ej = a.N();
			}

			static ma(a, b, c) {
				let d = new class_Ca;
				d.min = a;
				d.rate = b;
				d.ej = c;
				return d;
			}
		}

		class class_$a extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Mb(this.R) && a.Gr(a.getFullPlayerById(this.R));
			}

			ua() {
			}

			va() {
			}
		}

		class class_ab extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R)) {
					var b = a.getFullPlayerById(this.R);
					if (null != a.M) {
						a.M = null;
						let c = 0
							,
							d = a.K;
						for (; c < d.length;) {
							let e = d[c];
							++c;
							e.J = null;
							e.Kb = 0;
						}
						null != a.onGameStopFun && a.onGameStopFun(b);
					}
				}
			}

			ua() {
			}

			va() {
			}
		}

		class class_Ia extends class_m {
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
						a[d].xb = this.Ce[d];
					}
				}
			}

			ua(a) {
				a.jb(this.Ce.length);
				let b = 0
					,
					c = this.Ce;
				for (; b < c.length;)
					a.jb(c[b++]);
			}

			va(a) {
				this.Ce = [];
				let b = a.zb()
					,
					c = 0;
				for (; c < b;)
					++c,
						this.Ce.push(a.zb());
			}

			static ma(a) {
				let b = new class_Ia
					,
					c = a.U.K
					,
					d = []
					,
					e = 0;
				for (; e < c.length;) {
					let f = a.Qe.get(c[e++].W);
					d.push(null == f ? 0 : f.xb);
				}
				b.Ce = d;
				return b;
			}
		}

		class GlobalError extends Error {
			constructor(a, b, c) {
				super(a);
				this.message = a;
				this.Dj = null != c ? c : this;
			}

			Db() {
				return this.Dj;
			}

			static Jb(a) {
				return a instanceof v ? a : a instanceof Error ? new GlobalError(a.message, null, a) : new class_Mb(a, null, a);
			}

			static B(a) {
				return a instanceof v ? a.Dj : a instanceof Error ? a : new class_Mb(a);
			}
		}

		class class_Mb extends GlobalError {
			constructor(a, b, c) {
				super(String(a), b, c);
				this.value = a;
			}

			Db() {
				return this.value;
			}
		}

		var Hb = Hb || {},
			X;
		class_lc.b = true;
		Object.assign(class_lc.prototype, {
			g: class_lc
		});
		class_P.b = true;
		Math.b = true;
		class_Fc.b = true;
		class_Q.b = true;
		class_Y.b = true;
		StringOpsLimit.b = true;
		class_jc.b = true;
		Object.assign(class_jc.prototype, {
			g: class_jc
		});
		var ma = Hb['bas.basnet.FailReason'] = {
			Qf: true,
			Wd: null,
			Ge: {
				xc: 'PeerFailed',
				lb: 0,
				Eb: 'bas.basnet.FailReason',
				toString: ja
			},
			He: (X = function (a) {
				return {
					lb: 1,
					code: a,
					Eb: 'bas.basnet.FailReason',
					toString: ja
				};
			}
				,
				X.xc = 'Rejected',
				X.Ie = ['code'],
				X),
			Fe: {
				xc: 'Cancelled',
				lb: 2,
				Eb: 'bas.basnet.FailReason',
				toString: ja
			},
			Error: {
				xc: 'Error',
				lb: 3,
				Eb: 'bas.basnet.FailReason',
				toString: ja
			}
		};
		ma.Wd = [ma.Ge, ma.He, ma.Fe, ma.Error];
		class_Yb.b = true;
		Object.assign(class_Yb.prototype, {
			g: class_Yb
		});
		class_Sa.b = true;
		Object.assign(class_Sa.prototype, {
			g: class_Sa
		});
		var db = Hb['bas.basnet.ConnectionRequestResponse'] = {
			Qf: true,
			Wd: null,
			yj: {
				xc: 'Accept',
				lb: 0,
				Eb: 'bas.basnet.ConnectionRequestResponse',
				toString: ja
			},
			Of: (X = function (a) {
				return {
					lb: 1,
					reason: a,
					Eb: 'bas.basnet.ConnectionRequestResponse',
					toString: ja
				};
			}
				,
				X.xc = 'Reject',
				X.Ie = ['reason'],
				X)
		};
		db.Wd = [db.yj, db.Of];
		class_jb.b = true;
		Object.assign(class_jb.prototype, {
			g: class_jb
		});
		class_Gc.b = true;
		class_Tb.b = true;
		Object.assign(class_Tb.prototype, {
			g: class_Tb
		});
		class_J.b = true;
		Object.assign(class_J.prototype, {
			g: class_J
		});
		StreamWriter.b = true;
		Object.assign(StreamWriter.prototype, {
			g: StreamWriter
		});
		class_U.b = true;
		Object.assign(class_U.prototype, {
			g: class_U
		});
		class_yb.b = true;
		class_qb.b = true;
		class_Pb.b = true;
		class_Rb.b = true;
		Object.assign(class_Rb.prototype, {
			g: class_Rb
		});
		class_x.b = true;
		class_gc.b = true;
		class_Hc.b = true;
		class_m.b = true;
		Object.assign(class_m.prototype, {
			g: class_m
		});
		class_Va.b = true;
		Object.assign(class_Va.prototype, {
			g: class_Va
		});
		VMajor.b = true;
		Object.assign(VMajor.prototype, {
			g: VMajor
		});
		class_Ya.b = true;
		class_Ya.ha = class_m;
		Object.assign(class_Ya.prototype, {
			g: class_Ya
		});
		class_Ub.b = true;
		class_Ub.Bj = true;
		Object.assign(class_Ub.prototype, {
			g: class_Ub
		});
		class_Vb.b = true;
		Object.assign(class_Vb.prototype, {
			g: class_Vb
		});
		class_oc.b = true;
		Object.assign(class_oc.prototype, {
			g: class_oc
		});
		class_pc.b = true;
		Object.assign(class_pc.prototype, {
			g: class_pc
		});
		class_La.b = true;
		class_La.Bj = true;
		class_ra.b = true;
		oaMajor.b = true;
		oaMajor.ha = VMajor;
		Object.assign(oaMajor.prototype, {
			g: oaMajor
		});
		var ia = Hb['bas.marf.net.ConnFailReason'] = {
			Qf: true,
			Wd: null,
			Fe: {
				xc: 'Cancelled',
				lb: 0,
				Eb: 'bas.marf.net.ConnFailReason',
				toString: ja
			},
			Ge: {
				xc: 'PeerFailed',
				lb: 1,
				Eb: 'bas.marf.net.ConnFailReason',
				toString: ja
			},
			He: (X = function (a) {
				return {
					lb: 2,
					reason: a,
					Eb: 'bas.marf.net.ConnFailReason',
					toString: ja
				};
			}
				,
				X.xc = 'Rejected',
				X.Ie = ['reason'],
				X),
			Nf: (X = function (a) {
				return {
					lb: 3,
					description: a,
					Eb: 'bas.marf.net.ConnFailReason',
					toString: ja
				};
			}
				,
				X.xc = 'Other',
				X.Ie = ['description'],
				X)
		};
		ia.Wd = [ia.Fe, ia.Ge, ia.He, ia.Nf];
		class_Ka.b = true;
		class_Ka.ha = oaMajor;
		Object.assign(class_Ka.prototype, {
			g: class_Ka
		});
		class_dc.b = true;
		class_dc.ha = oaMajor;
		Object.assign(class_dc.prototype, {
			g: class_dc
		});
		class_uc.b = true;
		Object.assign(class_uc.prototype, {
			g: class_uc
		});
		class_xc.b = true;
		class_Ob.b = true;
		Object.assign(class_Ob.prototype, {
			g: class_Ob
		});
		class_ec.b = true;
		class_ec.ha = oaMajor;
		Object.assign(class_ec.prototype, {
			g: class_ec
		});
		class_cc.b = true;
		Object.assign(class_cc.prototype, {
			g: class_cc
		});
		class_Cc.b = true;
		Object.assign(class_Cc.prototype, {
			g: class_Cc
		});
		Point.b = true;
		Object.assign(Point.prototype, {
			g: Point
		});
		class_Z.b = true;
		class_H.b = true;
		class_E.b = true;
		class_Ba.b = true;
		class_ic.b = true;
		class_bc.b = true;
		class_Bb.b = true;
		Object.assign(class_Bb.prototype, {
			g: class_Bb
		});
		class_Bc.b = true;
		CommandUtil.b = true;
		Object.assign(CommandUtil.prototype, {
			g: CommandUtil
		});
		class_Ga.b = true;
		ConnFa.b = true;
		Object.assign(ConnFa.prototype, {
			g: ConnFa
		});
		ImportantUtil.b = true;
		Object.assign(ImportantUtil.prototype, {
			g: ImportantUtil
		});
		class_tb.b = true;
		Object.assign(class_tb.prototype, {
			g: class_tb
		});
		class_ka.b = true;
		Object.assign(class_ka.prototype, {
			g: class_ka
		});
		class_yc.b = true;
		Object.assign(class_yc.prototype, {
			g: class_yc
		});
		class_Ac.b = true;
		class_ya.b = true;
		Object.assign(class_ya.prototype, {
			g: class_ya
		});
		class_xa.b = true;
		Object.assign(class_xa.prototype, {
			g: class_xa
		});
		ConnectionConstants.b = true;
		class_qc.b = true;
		Object.assign(class_qc.prototype, {
			g: class_qc
		});
		class_B.b = true;
		class_C.b = true;
		class_vc.b = true;
		Object.assign(class_vc.prototype, {
			g: class_vc
		});
		class_$b.b = true;
		Object.assign(class_$b.prototype, {
			g: class_$b
		});
		class_Zb.b = true;
		class_gb.b = true;
		class_rc.b = true;
		Object.assign(class_rc.prototype, {
			g: class_rc
		});
		class_wc.b = true;
		Object.assign(class_wc.prototype, {
			g: class_wc
		});
		Disc.b = true;
		Object.assign(Disc.prototype, {
			g: Disc
		});
		class_ca.b = true;
		class_ca.nd = [class_La];
		Object.assign(class_ca.prototype, {
			g: class_ca
		});
		Goal.b = true;
		Object.assign(Goal.prototype, {
			g: Goal
		});
		PlayerPhysics.b = true;
		Object.assign(PlayerPhysics.prototype, {
			g: PlayerPhysics
		});
		class_Qb.b = true;
		Object.assign(class_Qb.prototype, {
			g: class_Qb
		});
		Stadium.b = true;
		Object.assign(Stadium.prototype, {
			g: Stadium
		});
		TeamColors.b = true;
		Object.assign(TeamColors.prototype, {
			g: TeamColors
		});
		Team.b = true;
		Object.assign(Team.prototype, {
			g: Team
		});
		Room.b = true;
		Room.nd = [class_La, class_Ub];
		Object.assign(Room.prototype, {
			g: Room
		});
		FullPlayer.b = true;
		FullPlayer.nd = [class_La];
		Object.assign(FullPlayer.prototype, {
			g: FullPlayer
		});
		class_Qa.b = true;
		class_Qa.ha = class_m;
		Object.assign(class_Qa.prototype, {
			g: class_Qa
		});
		class_Ib.b = true;
		class_Ib.ha = class_m;
		Object.assign(class_Ib.prototype, {
			g: class_Ib
		});
		class_cb.b = true;
		class_cb.ha = class_m;
		Object.assign(class_cb.prototype, {
			g: class_cb
		});
		class_za.b = true;
		class_za.ha = class_m;
		Object.assign(class_za.prototype, {
			g: class_za
		});
		class_Pa.b = true;
		class_Pa.ha = class_m;
		Object.assign(class_Pa.prototype, {
			g: class_Pa
		});
		class_Da.b = true;
		class_Da.ha = class_m;
		Object.assign(class_Da.prototype, {
			g: class_Da
		});
		class_fa.b = true;
		class_fa.ha = class_m;
		Object.assign(class_fa.prototype, {
			g: class_fa
		});
		class_Na.b = true;
		class_Na.ha = class_m;
		Object.assign(class_Na.prototype, {
			g: class_Na
		});
		class_Ra.b = true;
		class_Ra.ha = class_m;
		Object.assign(class_Ra.prototype, {
			g: class_Ra
		});
		class_Oa.b = true;
		class_Oa.ha = class_m;
		Object.assign(class_Oa.prototype, {
			g: class_Oa
		});
		class_Ja.b = true;
		class_Ja.ha = class_m;
		Object.assign(class_Ja.prototype, {
			g: class_Ja
		});
		class_Kb.b = true;
		class_Kb.ha = class_m;
		Object.assign(class_Kb.prototype, {
			g: class_Kb
		});
		class_bb.b = true;
		class_bb.ha = class_m;
		Object.assign(class_bb.prototype, {
			g: class_bb
		});
		class_Za.b = true;
		class_Za.ha = class_m;
		Object.assign(class_Za.prototype, {
			g: class_Za
		});
		class_Ha.b = true;
		class_Ha.ha = class_m;
		Object.assign(class_Ha.prototype, {
			g: class_Ha
		});
		class_Ma.b = true;
		class_Ma.ha = class_m;
		Object.assign(class_Ma.prototype, {
			g: class_Ma
		});
		class_Jc.b = true;
		class_na.b = true;
		class_na.ha = class_m;
		Object.assign(class_na.prototype, {
			g: class_na
		});
		class_Jb.b = true;
		class_Jb.ha = class_m;
		Object.assign(class_Jb.prototype, {
			g: class_Jb
		});
		class_Lb.b = true;
		class_Lb.ha = class_m;
		Object.assign(class_Lb.prototype, {
			g: class_Lb
		});
		class_Ca.b = true;
		class_Ca.ha = class_m;
		Object.assign(class_Ca.prototype, {
			g: class_Ca
		});
		class_$a.b = true;
		class_$a.ha = class_m;
		Object.assign(class_$a.prototype, {
			g: class_$a
		});
		class_ab.b = true;
		class_ab.ha = class_m;
		Object.assign(class_ab.prototype, {
			g: class_ab
		});
		class_Ia.b = true;
		class_Ia.ha = class_m;
		Object.assign(class_Ia.prototype, {
			g: class_Ia
		});
		DynamicDisc.b = true;
		DynamicDisc.nd = [class_La];
		Object.assign(DynamicDisc.prototype, {
			g: DynamicDisc
		});
		Joint.b = true;
		Joint.nd = [class_La];
		Object.assign(Joint.prototype, {
			g: Joint
		});
		DynamicObjectsUtil.b = true;
		DynamicObjectsUtil.nd = [class_La];
		Object.assign(DynamicObjectsUtil.prototype, {
			g: DynamicObjectsUtil
		});
		Plane.b = true;
		Object.assign(Plane.prototype, {
			g: Plane
		});
		Segment.b = true;
		Object.assign(Segment.prototype, {
			g: Segment
		});
		Vertex.b = true;
		Object.assign(Vertex.prototype, {
			g: Vertex
		});
		class_W.b = true;
		Object.assign(class_W.prototype, {
			g: class_W
		});
		class_ea.b = true;
		Object.assign(class_ea.prototype, {
			g: class_ea
		});
		class_sc.b = true;
		Object.assign(class_sc.prototype, {
			g: class_sc
		});
		class_lb.b = true;
		Object.assign(class_lb.prototype, {
			g: class_lb
		});
		class_Eb.b = true;
		Object.assign(class_Eb.prototype, {
			g: class_Eb
		});
		class_Ua.b = true;
		Object.assign(class_Ua.prototype, {
			g: class_Ua
		});
		class_fc.b = true;
		Object.assign(class_fc.prototype, {
			g: class_fc
		});
		class_eb.b = true;
		Object.assign(class_eb.prototype, {
			g: class_eb
		});
		class_Cb.b = true;
		Object.assign(class_Cb.prototype, {
			g: class_Cb
		});
		CreateRoomView.b = true;
		Object.assign(CreateRoomView.prototype, {
			g: CreateRoomView
		});
		class_Ta.b = true;
		Object.assign(class_Ta.prototype, {
			g: class_Ta
		});
		class_wb.b = true;
		Object.assign(class_wb.prototype, {
			g: class_wb
		});
		class_tc.b = true;
		Object.assign(class_tc.prototype, {
			g: class_tc
		});
		GameView.b = true;
		Object.assign(GameView.prototype, {
			g: GameView
		});
		class_xb.b = true;
		Object.assign(class_xb.prototype, {
			g: class_xb
		});
		class_vb.b = true;
		Object.assign(class_vb.prototype, {
			g: class_vb
		});
		class_pb.b = true;
		Object.assign(class_pb.prototype, {
			g: class_pb
		});
		class_kc.b = true;
		Object.assign(class_kc.prototype, {
			g: class_kc
		});
		class_fb.b = true;
		Object.assign(class_fb.prototype, {
			g: class_fb
		});
		class_hb.b = true;
		Object.assign(class_hb.prototype, {
			g: class_hb
		});
		class_Ea.b = true;
		Object.assign(class_Ea.prototype, {
			g: class_Ea
		});
		class_ba.b = true;
		Object.assign(class_ba.prototype, {
			g: class_ba
		});
		class_Aa.b = true;
		Object.assign(class_Aa.prototype, {
			g: class_Aa
		});
		class_Db.b = true;
		Object.assign(class_Db.prototype, {
			g: class_Db
		});
		class_Ab.b = true;
		Object.assign(class_Ab.prototype, {
			g: class_Ab
		});
		RoomListView.b = true;
		Object.assign(RoomListView.prototype, {
			g: RoomListView
		});
		class_zb.b = true;
		Object.assign(class_zb.prototype, {
			g: class_zb
		});
		class_Gb.b = true;
		Object.assign(class_Gb.prototype, {
			g: class_Gb
		});
		class_ib.b = true;
		Object.assign(class_ib.prototype, {
			g: class_ib
		});
		class_la.b = true;
		Object.assign(class_la.prototype, {
			g: class_la
		});
		class_aa.b = true;
		Object.assign(class_aa.prototype, {
			g: class_aa
		});
		class_kb.b = true;
		Object.assign(class_kb.prototype, {
			g: class_kb
		});
		class_ub.b = true;
		Object.assign(class_ub.prototype, {
			g: class_ub
		});
		GlobalError.b = true;
		GlobalError.ha = Error;
		Object.assign(GlobalError.prototype, {
			g: GlobalError
		});
		class_Mb.b = true;
		class_Mb.ha = GlobalError;
		Object.assign(class_Mb.prototype, {
			g: class_Mb
		});
		class_zc.b = true;
		Object.assign(class_zc.prototype, {
			g: class_zc
		});
		class_w.b = true;
		globalScope.xj |= 0;
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
		var Xb = {}
			,
			Lc = {}
			,
			D = Number
			,
			Ec = Boolean
			,
			Mc = {}
			,
			Nc = {};
		Team.spec = new Team(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
		Team.ga = new Team(1, 15035990, -1, 8, 'Red', 't-red', 15035990, 2);
		Team.Aa = new Team(2, 5671397, 1, 16, 'Blue', 't-blue', 625603, 4);
		Team.spec.enemyTeam = Team.spec;
		Team.ga.enemyTeam = Team.Aa;
		Team.Aa.enemyTeam = Team.ga;
		class_w.Bn = {}.toString;
		class_Sa.io = {
			mandatory: {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false
			}
		};
		class_U.ph = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};
		class_U.wm = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};
		class_qb.cp = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
		class_m.wb = false;
		class_m.Zm = new Map;
		class_m.Ff = 0;
		VMajor.wb = false;
		class_Ya.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_ra.Cc = 0;
		class_xc.channels = [{
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
		class_Z.zj = 'application/x-www-form-urlencoded';
		class_Ga.ab = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'onPlayerLeaveFun Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
		ConnectionConstants.es = 'wss://p2p.haxball.com/';
		ConnectionConstants.Me = 'https://www.haxball.com/rs/';
		ConnectionConstants.fg = [{
			urls: 'stun:stun.l.google.com:19302'
		}];
		ConnectionConstants.m = new class_yc;
		class_ca.hl = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(new Point(0, 0));
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
		Stadium.Nr = StreamWriter.ia(1024);
		class_Qa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ib.ya = class_m.Ea({
			za: false,
			delay: false,
			qj: {
				dj: 10,
				wj: 900
			}
		});
		class_cb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_za.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Pa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Da.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_fa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Na.ya = class_m.Ea({
			za: false,
			delay: false,
			qj: {
				dj: 10,
				wj: 2E3
			}
		});
		class_Ra.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Oa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ja.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Kb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_bb.ya = class_m.Ea({});
		class_Za.ya = class_m.Ea({
			za: false,
			delay: false,
			qj: {
				dj: 10,
				wj: 900
			}
		});
		class_Ha.ya = class_m.Ea({});
		class_Ma.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_na.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Jb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Lb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ca.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_$a.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_ab.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ia.ya = class_m.Ea({
			za: false,
			delay: false
		});
		Segment.un = .17435839227423353;
		Segment.tn = 5.934119456780721;
		class_ea.rn = new class_cc([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
		class_ea.sn = new class_cc([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
		class_Eb.O = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_Ua.O = '<div class=\'chatbox-view\'><div data-hook=\'drag\' class=\'drag\'></div><div data-hook=\'log\' class=\'log subtle-thin-scrollbar\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /></div></div>';
		class_eb.O = '<div class=\'choose-nickname-view\'><img src="images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
		class_Cb.O = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
		CreateRoomView.O = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
		class_Ta.O = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
		class_wb.O = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
		GameView.O = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'gameplay-section\' data-hook=\'gameplay\'></div><div class=\'top-section\' data-hook=\'top-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'buttons\'><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i>Settings</button></div></div><div data-hook=\'popups\'></div></div>';
		class_xb.O = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
		class_vb.O = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
		class_pb.O = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_fb.O = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
		class_hb.O = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
		class_Ea.O = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list thin-scrollbar\' data-hook=\'list\'></div></div>';
		class_Aa.O = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
		class_Db.O = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
		class_Ab.vj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
		RoomListView.vj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
		class_Gb.O = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
		class_ib.O = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
		class_la.O = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat opacity </div><div style="width: 40px" data-hook="chatopacity-value">1</div><input class="slider" type="range" min="0.5" max="1" step="0.01" data-hook="chatopacity-range"></div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat focus height </div><div style="width: 40px" data-hook="chatfocusheight-value">200</div><input class="slider" type="range" min="0" max="400" step="10" data-hook="chatfocusheight-range"></div><div>Chat background width:<select data-hook=\'chatbgmode\'><option>Full</option><option>Compact</option></select></div></div></div></div>';
		class_la.jm = 0;
		class_aa.O = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
		class_kb.O = '<div class=\'stats-view\'><p data-hook=\'ping\'></p><p data-hook=\'fps\'></p><div data-hook=\'graph\'></div></div>';
		class_ub.O = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="images/opera-icon.png"/>Opera</a></div></div></div>';
		class_B.zp();
	}
)('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this);