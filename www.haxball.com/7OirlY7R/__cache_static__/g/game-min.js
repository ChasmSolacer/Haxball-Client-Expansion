/*
 HaxBall @ 2023 - Mario Carbajal - All rights reserved.
 afe1e882
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
			min_hc: 77,
			max_hc: 400
		};

		function CastJa() {
			return class_w.Je(this, '');
		}

		function hc(a) {
			return Constants.min_hc > a ? Constants.min_hc : Constants.max_hc < a ? Constants.max_hc : a;
		}

		function createHandlerFromInstance(a, b) {
			if (null == b)
				return null;
			if (null == b.oh)
				b.oh = globalScope.xj++;
			let c;
			if (null == a.ij)
				a.ij = {};
			else
				c = a.ij[b.oh];
			if (null == c) {
				c = b.bind(a);
				a.ij[b.oh] = c;
			}
			return c;
		}

		function Nb() {
			return hc(ConnectionConstants.o.$j.H());
		}

		class Ob {
			constructor(a) {
				this.od = null;
				this.Lq = 10000;
				this.Dd = true;
				a.bk();
				this.Ra = a.Ra;
				this.$c = a.$c;
				this.ve = a.ve;
				this.od = a.od;
				this.Hm = window.performance.now();
				let bFun = null;
				let c = this;
				bFun = function () {
					var e = c.Lq - c.Ir();
					if (e <= 0) {
						c.ja();
					}
					else {
						window.clearTimeout(c.Jm);
						e = window.setTimeout(bFun, e + 1000);
						c.Jm = e;
					}
				};
				bFun();
				this.Ra.oniceconnectionstatechange = function () {
					let e = c.Ra.iceConnectionState;
					e != 'closed' && e != 'failed' || c.ja();
				};
				a = 0;
				let d = this.$c;
				for (; a < d.length;) {
					let e = d[a];
					++a;
					e.onmessage = function (f) {
						c.Dd && (c.Hm = window.performance.now(),
						null != c.ug && c.ug(f.data));
					};
					e.onclose = function () {
						c.ja();
					};
				}
			}

			Ir() {
				return window.performance.now() - this.Hm;
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
				window.clearTimeout(this.Jm);
				this.Dd && (this.Dd = false,
					this.Ra.close(),
				null != this.lf && this.lf());
			}
		}

		class CreateRoomView {
			constructor(a) {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(CreateRoomView.O);
				var b = ViewUtil.Da(this.f);
				this.uh = b.get('cancel');
				this.ek = b.get('create');
				this.hf = b.get('name');
				this.tl = b.get('pass');
				this.bi = b.get('max-pl');
				this.Nm = b.get('unlisted');
				this.hf.maxLength = Constants.maxRoomNameLen;
				this.hf.value = a;
				let self = this;
				this.hf.oninput = function () {
					self.D();
				};
				this.tl.maxLength = 30;
				this.Nm.onclick = function () {
					self.updateShowInRoomListButton(!self.Om);
				};
				this.uh.onclick = function () {
					H.i(self.di);
				};
				this.ek.onclick = function () {
					if (self.isBetweenLimits()) {
						let d = self.tl.value;
						if (d == '')
							d = null;
						class_E.i(self.Qp, {
							name: self.hf.value,
							password: d,
							As: self.bi.selectedIndex + 2,
							Ss: self.Om
						});
					}
				};
				for (a = 2; a < 21; a++) {
					b = window.document.createElement('option');
					b.textContent = '' + a;
					this.bi.appendChild(b);
				}
				this.bi.selectedIndex = 10;
				this.updateShowInRoomListButton(false);
				this.D();
			}

			updateShowInRoomListButton(isPrivate) {
				this.Om = isPrivate;
				this.Nm.textContent = 'Show in room list: ' + (isPrivate ? 'No' : 'Yes');
			}

			isBetweenLimits() {
				let roomName = this.hf.value;
				return Constants.maxRoomNameLen >= roomName.length ? Constants.minRoomNameLen < roomName.length : false;
			}

			D() {
				this.ek.disabled = !this.isBetweenLimits();
			}
		}

		class class_fb {
			constructor() {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_fb.O);
				let a = ViewUtil.Da(this.f);
				this.Bb = a.get('input');
				this.jf = a.get('ok');
				let self = this;
				a.get('cancel').onclick = function () {
					self.Ua != null && self.Ua(null);
				};
				this.Bb.maxLength = 30;
				this.Bb.oninput = function () {
					self.D();
				};
				this.Bb.onkeydown = function (c) {
					if (c.keyCode == 13 && self.isBetweenLimits() && null != self.Ua)
						self.Ua(self.Bb.value);
				};
				this.jf.onclick = function () {
					self.isBetweenLimits() && null != self.Ua && self.Ua(self.Bb.value);
				};
				this.D();
			}

			isBetweenLimits() {
				let a = this.Bb.value;
				return a.length <= 30 ? a.length > 0 : false;
			}

			D() {
				this.jf.disabled = !this.isBetweenLimits();
			}
		}

		class Pb {
			constructor(a) {
				this.Od = a;
			}
		}

		class PlayerListItem {
			constructor(a) {
				this.A = a.A;
				this.xb = a.xb;
				this.aa = a.W;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(PlayerListItem.O);
				let b = ViewUtil.Da(this.f);
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
					d.dataTransfer.setData('player', StringOpsInt.De(c.aa));
				};
				this.f.oncontextmenu = function (d) {
					d.preventDefault();
					class_E.i(c.pf, c.aa);
				};
				this.nm(a.bb);
			}

			D(a, isDraggable) {
				this.f.draggable = isDraggable;
				if (this.xb != a.xb) {
					this.xb = a.xb;
					this.Ag.textContent = '' + this.xb;
				}
				this.Cn != a.bb && this.nm(a.bb);
			}

			nm(isAdmin) {
				this.Cn = isAdmin;
				this.f.className = 'player-list-item' + (isAdmin ? ' admin' : '');
			}
		}

		class Plane {
			constructor() {
				this.w = 32;
				this.h = 63;
				this.m = 1;
				this.Ta = 0;
				this.wa = new Point(0, 0);
			}

			fa(a) {
				let b = this.wa;
				a.u(b.x);
				a.u(b.y);
				a.u(this.Ta);
				a.u(this.m);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				let b = this.wa;
				b.x = a.v();
				b.y = a.v();
				this.Ta = a.v();
				this.m = a.v();
				this.h = a.N();
				this.w = a.N();
			}
		}

		class RoomMenuView {
			constructor(a) {
				this.pk = false;
				this.zm = new class_Aa(Team.spec);
				this.Sj = new class_Aa(Team.blue);
				this.Rl = new class_Aa(Team.red);
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(RoomMenuView.O);
				let dataHookMap = ViewUtil.Da(this.f);
				this.mc = dataHookMap.get('room-name');
				this.Cm = dataHookMap.get('start-btn');
				this.Em = dataHookMap.get('stop-btn');
				this.hi = dataHookMap.get('pause-btn');
				this.Fn = dataHookMap.get('auto-btn');
				this.Wk = dataHookMap.get('lock-btn');
				this.am = dataHookMap.get('reset-all-btn');
				this.Pl = dataHookMap.get('rec-btn');
				let c = dataHookMap.get('link-btn');
				let d = dataHookMap.get('leave-btn');
				let e = dataHookMap.get('rand-btn');
				this.Ef = dataHookMap.get('time-limit-sel');
				this.wf = dataHookMap.get('score-limit-sel');
				this.Am = dataHookMap.get('stadium-name');
				this.Bm = dataHookMap.get('stadium-pick');
				let self = this;
				this.Bm.onclick = function () {
					H.i(self.eq);
				};
				this.Th(dataHookMap.get('red-list'), this.Rl, a);
				this.Th(dataHookMap.get('blue-list'), this.Sj, a);
				this.Th(dataHookMap.get('spec-list'), this.zm, a);
				this.cl(this.Ef, this.bl());
				this.cl(this.wf, this.bl());
				this.Ef.onchange = function () {
					class_E.i(self.iq, self.Ef.selectedIndex);
				};
				this.wf.onchange = function () {
					class_E.i(self.$p, self.wf.selectedIndex);
				};
				this.Cm.onclick = function () {
					H.i(self.fq);
				};
				this.Em.onclick = function () {
					H.i(self.gq);
				};
				this.hi.onclick = function () {
					H.i(self.Tp);
				};
				this.Fn.onclick = function () {
					H.i(self.Kp);
				};
				this.Wk.onclick = function () {
					class_E.i(self.hq, !self.Xh);
				};
				this.am.onclick = function () {
					null != self.je && (self.je(Team.blue),
						self.je(Team.red));
				};
				this.Pl.onclick = function () {
					H.i(self.Xp);
				};
				c.onclick = function () {
					H.i(self.cq);
				};
				d.onclick = function () {
					H.i(self.ie);
				};
				e.onclick = function () {
					H.i(self.Wp);
				};
				this.Ij(false);
				this.Jj(false);
			}

			Th(a, b, c) {
				ViewUtil.replaceWith(a, b.f);
				let d = this;
				b.vg = function (e, f) {
					Ba.i(d.vg, e, f);
				};
				b.je = function (e) {
					class_E.i(d.je, e);
				};
				b.Rp = function (e) {
					Ba.i(d.vg, c, e);
				};
				b.pf = function (e) {
					class_E.i(d.pf, e);
				};
			}

			bl() {
				let a = []
					,
					b = 0;
				for (; 15 > b;) {
					let c = b++;
					a.push(null == c ? 'null' : '' + c);
				}
				return a;
			}

			cl(a, b) {
				let c = 0;
				for (; c < b.length;) {
					let d = b[c++]
						,
						e = window.document.createElement('option');
					e.textContent = d;
					a.appendChild(e);
				}
			}

			yr(a) {
				this.Pl.classList.toggle('active', a);
			}

			D(a, b) {
				this.ar != a.mc && (this.ar = a.mc,
					this.mc.textContent = a.mc);
				b = null == b ? false : b.bb;
				this.pk != b && (this.f.className = 'room-view' + (b ? ' admin' : ''),
					this.pk = b);
				var c = !b || null != a.M;
				this.Ef.disabled = c;
				this.wf.disabled = c;
				this.Bm.disabled = c;
				c = null != a.M;
				this.Cm.hidden = c;
				this.Em.hidden = !c;
				this.hi.hidden = !c;
				this.Ef.selectedIndex = a.Ca;
				this.wf.selectedIndex = a.gb;
				this.Am.textContent = a.T.A;
				this.Am.classList.toggle('custom', !a.T.Xe());
				let d = a.Tc;
				for (var e = this.Rl, f = a.K, g = [], h = 0; h < f.length;) {
					var k = f[h];
					++h;
					k.ea == Team.red && g.push(k);
				}
				e.D(g, d, c, b);
				e = this.Sj;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == Team.blue && g.push(k);
				e.D(g, d, c, b);
				e = this.zm;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.ea == Team.spec && g.push(k);
				e.D(g, d, c, b);
				this.am.disabled = c;
				this.Xh != a.Tc && this.Ij(a.Tc);
				c && (a = 120 == a.M.Pa,
				this.ul != a && this.Jj(a));
			}

			Ij(a) {
				this.Xh = a;
				this.Wk.innerHTML = this.Xh ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
			}

			Jj(a) {
				this.ul = a;
				this.hi.innerHTML = '<i class=\'icon-pause\'></i>' + (this.ul ? 'Resume (P)' : 'Pause (P)');
			}
		}

		class Ra {
			constructor() {
				this.list = [];
			}

			Zm(a) {
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

			Ls(a) {
				let b = 0;
				let c = 0;
				let d = this.list;
				for (; c < d.length && !(d[c++].kb >= a);)
					++b;
				this.list.splice(0, b);
			}

			ls(a, b) {
				let c = this.list;
				for (; 0 < c.length;)
					c.pop();
				Ra.Cs(a.list, b.list, this.list);
			}

			Ms(a) {
				let b = 0;
				let c = this.list;
				let d = 0;
				let e = c.length;
				for (; d < e;) {
					let f = c[d++];
					f.Ae != a && (c[b] = f,
						++b);
				}
				for (; c.length > b;)
					c.pop();
			}

			ms(a) {
				let b = 0;
				let c = 0;
				let d = this.list;
				for (; c < d.length && !(d[c++].kb >= a);)
					++b;
				return b;
			}

			static Cs(a, b, c) {
				if (0 == a.length)
					for (a = 0; a < b.length;)
						c.push(b[a++]);
				else if (0 == b.length)
					for (b = 0; b < a.length;)
						c.push(a[b++]);
				else {
					let d = 0;
					let e = a.length;
					let f = 0;
					let g = b.length;
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

		class LocalStorageUnit {
			constructor(lsKey, lsInst, processingFun, funD) {
				this.A = lsKey;
				this.cs = funD;
				this.Yh = lsInst;
				funD = null;
				null != lsInst && (funD = lsInst.getItem(lsKey));
				this.Qm = processingFun(funD);
			}

			H() {
				return this.Qm;
			}

			Ma(a) {
				this.Qm = a;
				if (null != this.Yh)
					try {
						let b = this.cs(a);
						null == b ? this.Yh.removeItem(this.A) : this.Yh.setItem(this.A, b);
					}
					catch (b) {
					}
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
				let a = new ArrayBuffer(this.a);
				let b = new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
				(new Uint8Array(a)).set(b);
				return a;
			}

			Vb() {
				return new Uint8Array(this.s.buffer, this.s.byteOffset, this.a);
			}

			Nd() {
				return new DataView(this.s.buffer, this.s.byteOffset, this.a);
			}

			Nr() {
				return new J(this.Nd(), this.Sa);
			}

			uc(a) {
				this.s.byteLength < a && this.er(2 * this.s.byteLength >= a ? 2 * this.s.byteLength : a);
			}

			er(a) {
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

			Rm(a) {
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
					b += StreamWriter.Co(P.fj(a, d++), this.s, b);
				this.a = b;
			}

			jb(a) {
				let b = this.a;
				a >>>= 0;
				this.uc(b + StreamWriter.Nn(a));
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

			static Co(a, b, c) {
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

			static Mn(a) {
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
					b += StreamWriter.Mn(P.fj(a, d++));
				return b;
			}

			static Nn(a) {
				a >>>= 0;
				return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5;
			}
		}

		class AudioUtil {
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
				this.rm(ConnectionConstants.o.ym.H() ? 1 : 0);
				this.lg.connect(this.c.destination);
				let c = this;
				this.zo = Promise.all([b('sounds/chat.ogg').then(function (d) {
					return c.Zj = d;
				}), b('sounds/highlight.wav').then(function (d) {
					return c.Ik = d;
				}), b('sounds/kick.ogg').then(function (d) {
					return c.kp = d;
				}), b('sounds/goal.ogg').then(function (d) {
					return c.Qo = d;
				}), b('sounds/join.ogg').then(function (d) {
					return c.ip = d;
				}), b('sounds/leave.ogg').then(function (d) {
					return c.mp = d;
				}), b('sounds/crowd.ogg').then(function (d) {
					c.po = d;
					c.fk = new jc(c.po, c.c);
					c.fk.connect(c.lg);
				})]);
			}

			bm() {
				this.c.resume();
			}

			hd(a) {
				let b = this.c.createBufferSource();
				b.buffer = a;
				b.connect(this.lg);
				b.start();
			}

			rm(a) {
				this.lg.gain.value = a;
			}
		}

		class Segment {
			constructor() {
				this.wa = null;
				this.Og = null;
				this.Ng = null;
				this.gk = 0;
				this.be = null;
				this.X = null;
				this.da = null;
				this.Gc = 0;
				this.m = 1;
				this.h = 63;
				this.w = 32;
				this.tb = Infinity;
				this.Ya = true;
				this.S = 0;
			}

			fa(a) {
				let b = 0;
				let c = a.a;
				a.l(0);
				a.l(this.X.Bd);
				a.l(this.da.Bd);
				0 != this.Gc && (b = 1,
					a.u(this.Gc));
				this.tb != Infinity && (b |= 2,
					a.u(this.tb));
				0 != this.S && (b |= 4,
					a.P(this.S));
				this.Ya && (b |= 8);
				a.s.setUint8(c, b);
				a.u(this.m);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a, b) {
				let c = a.C();
				this.X = b[a.C()];
				this.da = b[a.C()];
				this.Gc = 0 != (c & 1) ? a.v() : 0;
				this.tb = 0 != (c & 2) ? a.v() : Infinity;
				this.S = 0 != (c & 4) ? a.N() : 0;
				this.Ya = 0 != (c & 8);
				this.m = a.v();
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
				a > Segment.tn && a < Segment.sn && (this.tb = 1 / Math.tan(a / 2));
			}

			Ko() {
				return 0 != 0 * this.tb ? 0 : 114.59155902616465 * Math.atan(1 / this.tb);
			}

			me() {
				if (0 == 0 * this.tb) {
					var a = this.da.a;
					var b = this.X.a;
					var c = .5 * (a.x - b.x);
					a = .5 * (a.y - b.y);
					b = this.X.a;
					let d = this.tb;
					this.be = new Point(b.x + c + -a * d, b.y + a + c * d);
					a = this.X.a;
					b = this.be;
					c = a.x - b.x;
					a = a.y - b.y;
					this.gk = Math.sqrt(c * c + a * a);
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

		class Qb {
			constructor(a, b, c, d, e, f) {
				this.qh = this.zh = false;
				this.pa = new Sa(0, b, d);
				let g = this;
				this.pa.gd = function () {
					g.We(ka.Ge);
				};
				this.pa.Gd = function () {
					null != g.Gd && g.Gd(new Ob(g.pa));
					g.pa = null;
					g.ck();
				};
				this.pa.ei = function (h) {
					g.rr = h;
					g.Y = new WebSocket(a + 'client?id=' + c + (null == f ? '' : '&token=' + f));
					g.Y.binaryType = 'arraybuffer';
					g.Y.onclose = function (k) {
						g.zh || g.We(ka.He(k.code));
					};
					g.Y.onerror = function () {
						g.zh || g.We(ka.Error);
					};
					g.Y.onmessage = createHandlerFromInstance(g, g.Ph);
					g.Y.onopen = function () {
						null != g.pl && g.pl();
						g.pa.Pi();
						g.Ei(g.rr, g.pa.eg, e);
						g.pa.sg = createHandlerFromInstance(g, g.Bi);
						g.pa.Sh.then(function () {
							g.Rc(0, null);
						});
					};
				};
				this.pa.no();
			}

			On() {
				this.We(ka.Fe);
			}

			ck() {
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
				this.ck();
			}

			Ph(a) {
				var b = new J(new DataView(a.data));
				a = b.C();
				0 < b.s.byteLength - b.a && (b = new J(new DataView(pako.inflateRaw(b.qb()).buffer), false));
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
				this.pa.Pi(this.qh ? 10000 : 4000);
				this.zh = true;
				null != this.hl && this.hl();
				let c = this;
				this.pa.Ra.setRemoteDescription(new RTCSessionDescription({
					sdp: a,
					type: 'answer'
				}), function () {
					let d = 0;
					for (; d < b.length;)
						c.pa.Ra.addIceCandidate(b[d++]);
				}, function () {
					c.We(ka.Error);
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

			static Lo(a) {
				switch (a.lb) {
					case 0:
						return 'Failed';
					case 1:
						return Gc.description(a.code);
					case 2:
						return '';
					case 3:
						return 'Master connection error';
				}
			}
		}

		class ib {
			static op() {
				if (null != ib.ni)
					return ib.ni;
				ib.ni = new Promise(function (a, b) {
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
				return ib.ni;
			}
		}

		class Rb {
			constructor(a) {
				this.Bs = a;
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
				b >= this.Bs ? (b = this.Za[c],
					this.Vd -= b.weight,
					this.Za.splice(c, 1)) : b = new kc;
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

		class class_lc {
			constructor() {
			}
		}

		class class_jb {
			constructor(a, b) {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_jb.O);
				let c = ViewUtil.Da(this.f);
				this.gf = c.get('name');
				this.Rf = c.get('admin');
				this.Ye = c.get('kick');
				this.ud = c.get('close');
				let d = this;
				this.Rf.onclick = function () {
					Ba.i(d.Jp, d.Qb, !d.zl);
				};
				this.Ye.onclick = function () {
					class_E.i(d.fi, d.Qb);
				};
				this.ud.onclick = function () {
					H.i(d.ob);
				};
				this.Qb = a.W;
				this.Lj(a.A);
				this.Kj(a.bb);
				this.Rf.disabled = !b || 0 == this.Qb;
				this.Ye.disabled = !b || 0 == this.Qb;
			}

			D(a, b) {
				a = a.getFullPlayerById(this.Qb);
				null == a ? H.i(this.ob) : (this.Vr(a),
					this.Rf.disabled = !b || 0 == this.Qb,
					this.Ye.disabled = !b || 0 == this.Qb);
			}

			Vr(a) {
				this.ke != a.A && this.Lj(a.A);
				this.zl != a.bb && this.Kj(a.bb);
			}

			Lj(a) {
				this.ke = a;
				this.gf.textContent = a;
			}

			Kj(a) {
				this.zl = a;
				this.Rf.textContent = a ? 'Remove Admin' : 'Give Admin';
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

			Qq(a) {
				this.cd.delete(a);
			}

			Mo(a) {
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
				let b = new class_ra
					,
					c = zc.Um(a)
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
				return class_ra.ag(JSON.parse(a));
			}

			static ik() {
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

		class zc {
			static Um(a) {
				let b = [];
				if (null != a) {
					let d = Object.prototype.hasOwnProperty;
					for (var c in a)
						'__id__' != c && 'hx__closures__' != c && d.call(a, c) && b.push(c);
				}
				return b;
			}
		}

		class Ac {
			static qf(a) {
				let b = new mc('([^&=]+)=?([^&]*)', 'g');
				a = a.substring(1);
				var c = 0;
				let d = new Map;
				for (; b.ys(a, c);) {
					c = b.dn(1);
					c = decodeURIComponent(c.split('+').join(' '));
					let e = b.dn(2);
					d.set(c, decodeURIComponent(e.split('+').join(' ')));
					c = b.zs();
					c = c.pj + c.ws;
				}
				return d;
			}

			static H() {
				return Ac.qf(window.top.location.search);
			}
		}

		class Y {
			static Zl(a, b, c, d, e) {
				return new Promise(function (f, g) {
						let h = new XMLHttpRequest;
						h.open(b, a);
						h.responseType = c;
						h.onload = function () {
							200 <= h.status && 300 > h.status ? null != h.response ? f(h.response) : g(null) : g('status: ' + h.status);
						};
						h.onerror = function (k) {
							g(k);
						};
						null != e && h.setRequestHeader('Content-type', e);
						h.send(d);
					}
				);
			}

			static H(a, b) {
				return Y.Zl(a, 'GET', b, null);
			}

			static Ck(a) {
				return Y.H(a, 'json').then(function (b) {
					let c = b.error;
					if (null != c)
						throw GlobalError.B(c);
					return b.data;
				});
			}

			static tq(a, b, c) {
				return Y.Zl(a, 'POST', 'json', b, c);
			}

			static Il(a, b, c) {
				return Y.tq(a, b, c).then(function (d) {
					let e = d.error;
					if (null != e)
						throw GlobalError.B(e);
					return d.data;
				});
			}
		}

		class kb {
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
						};
						d.onsuccess = function () {
							let e = d.result;
							e.onerror = c;
							let f = e.transaction(['meta', 'files'], 'readwrite');
							f.onerror = f.onabort = function (g) {
								c(g);
								e.close();
							};
							f.oncomplete = function () {
								b(0);
								e.close();
							};
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
						};
						d.onsuccess = function () {
							let e = d.result;
							e.onerror = c;
							let f = e.transaction(['files']);
							f.onerror = f.onabort = function (g) {
								c(g);
								e.close();
							};
							f.oncomplete = function () {
								e.close();
							};
							Sb.kh(f.objectStore('files').get(a)).then(function (g) {
								try {
									let h = new Stadium;
									h.Uk(g);
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
						};
						c.onsuccess = function () {
							let d = c.result;
							d.onerror = b;
							let e = d.transaction(['meta']);
							e.onerror = e.onabort = function (f) {
								b(f);
								d.close();
							};
							e.oncomplete = function () {
								d.close();
							};
							Sb.kh(e.objectStore('meta').getAll()).then(a, b);
						};
					}
				);
			}

			static Ns() {
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
						};
						d.onsuccess = function () {
							let e = d.result;
							e.onerror = c;
							let f = e.transaction(['files', 'meta'], 'readwrite');
							f.onerror = f.onabort = function (g) {
								c(g);
								e.close();
							};
							f.oncomplete = function () {
								b(0);
								e.close();
							};
							try {
								Sb.kh(f.objectStore('files').add(a.ye())).then(function (g) {
									g = {
										name: a.A,
										id: g
									};
									return Sb.kh(f.objectStore('meta').add(g));
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

		class nc {
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
				a.m = .5;
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

			Sr(a) {
				function b() {
					let f = [];
					let g = a.C();
					let h = 0;
					for (; h < g;) {
						++h;
						let k = new Point(0, 0);
						k.x = a.v();
						k.y = a.v();
						f.push(k);
					}
					return f;
				}

				// Stadium name
				this.A = a.yb();
				this.sd = a.N();
				this.Yd = a.v();
				this.Xd = a.v();
				this.rd = a.v();
				this.Zc = a.v();
				this.Ne = a.v();
				this.qd = a.N();
				// Stadium width
				this.bc = a.v();
				// Stadium height
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

			wp(a) {
				a = a.canBeStored;
				return null != a ? class_w.I(a, Bc) : true;
			}

			ye() {
				return JSON.stringify(this.Or());
			}

			Or() {
				if (!this.Vf) {
					//throw GlobalError.B(0); // disabled canBeStored check
					console.debug(this.A + ' canBeStored bypassed');
				}
				let a = {};
				for (var b = 0, c = [], d = 0, e = this.L; d < e.length;) {
					var f = e[d];
					++d;
					f.Bd = b++;
					c.push(Stadium.bs(f));
				}
				d = new Segment;
				b = [];
				e = 0;
				for (f = this.V; e < f.length;)
					b.push(Stadium.mr(f[e++], d));
				d = [];
				e = 0;
				for (f = this.qa; e < f.length;)
					d.push(Stadium.nq(f[e++]));
				e = [];
				f = 0;
				for (var g = this.wc; f < g.length;)
					e.push(Stadium.Ro(g[f++]));
				f = Stadium.qq(this.le);
				var h = new Disc;
				g = [];
				for (var k = 0, l = this.G; k < l.length;)
					g.push(Stadium.uo(l[k++], h));
				h = [];
				k = 0;
				for (l = this.nb; k < l.length;)
					h.push(Stadium.jp(l[k++]));
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

			Uk(a) {
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
									Stadium.En(t, f),
										h.push(l(t));
								}
								catch (z) {
									throw GlobalError.B(new Ub('Error in "' + k + '" index: ' + h.length));
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
				this.Vf = this.wp(d);
				this.vf = 'full' == d.kickOffReset;
				let f = d.traits;
				a = d.ballPhysics;
				'disc0' != a && (null != a ? (a = Stadium.Vk(a, this.mg()),
					a.w |= 192,
					this.G.push(a)) : this.G.push(this.mg()));
				c(this.L, 'vertexes', Stadium.vp);
				let g = this;
				c(this.V, 'segments', function (h) {
					return Stadium.up(h, g.L);
				});
				c(this.wc, 'goals', Stadium.qp);
				c(this.G, 'discs', function (h) {
					return Stadium.Vk(h, new Disc);
				});
				c(this.qa, 'planes', Stadium.sp);
				c(this.nb, 'joints', function (h) {
					return Stadium.rp(h, g.G);
				}, true);
				c(this.Kd, 'redSpawnPoints', b, true);
				c(this.td, 'blueSpawnPoints', b, true);
				a = d.playerPhysics;
				null != a && (this.le = Stadium.tp(a));
				if (255 < this.L.length || 255 < this.V.length || 255 < this.qa.length || 255 < this.wc.length || 255 < this.G.length)
					throw GlobalError.B('Error');
				this.me();
			}

			ak() {
				let a = Stadium.Mr;
				a.a = 0;
				this.fa(a);
				let b = new oc;
				b.hs(a.Vb());
				b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
				b.hash += b.hash << 15;
				return b.hash | 0;
			}

			Sn(a, b) {
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
				a.m = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 0;
				k.y = -1;
				a.Ta = -c;
				a.m = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 1;
				k.y = 0;
				a.Ta = -b;
				a.m = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = -1;
				k.y = 0;
				a.Ta = -b;
				a.m = 0;
				this.qa.push(a);
				this.ng(d, 1, f, 13421823, Team.blue);
				this.ng(-d, -1, f, 16764108, Team.red);
				this.$k(g, c);
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
				let K = new Segment;
				K.X = r;
				K.da = b;
				K.h = 1;
				K.Ya = false;
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
				this.V.push(K);
				this.Yk(d, e, h);
				this.me();
			}

			Zk(a, b, c, d, e, f, g, h) {
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
				a.m = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 0;
				k.y = -1;
				a.Ta = -c;
				a.m = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = 1;
				k.y = 0;
				a.Ta = -b;
				a.m = 0;
				this.qa.push(a);
				a = new Plane;
				k = a.wa;
				k.x = -1;
				k.y = 0;
				a.Ta = -b;
				a.m = 0;
				this.qa.push(a);
				this.ng(d - g, 1, f, 13421823, Team.blue, 63);
				this.ng(-d + g, -1, f, 16764108, Team.red, 63);
				this.$k(75, c);
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
				this.Yk(d, e, h);
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
						this.L[k].m = .1;
				b = this.V.length;
				this.V.push(l);
				this.V.push(t);
				this.V.push(z);
				h = b;
				for (b = this.V.length; h < b;)
					k = h++,
						this.V[k].h = f,
						this.V[k].w = g,
						this.V[k].m = .1;
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

			$k(a, b) {
				let c = new Vertex;
				var d = c.a;
				d.x = 0;
				d.y = -b;
				c.m = .1;
				c.w = 24;
				c.h = 6;
				d = new Vertex;
				var e = d.a;
				e.x = 0;
				e.y = -a;
				d.m = .1;
				d.w = 24;
				d.h = 6;
				e = new Vertex;
				var f = e.a;
				f.x = 0;
				f.y = a;
				e.m = .1;
				e.w = 24;
				e.h = 6;
				a = new Vertex;
				f = a.a;
				f.x = 0;
				f.y = b;
				a.m = .1;
				a.w = 24;
				a.h = 6;
				b = new Segment;
				b.X = c;
				b.da = d;
				b.w = 24;
				b.h = 6;
				b.Ya = false;
				b.m = .1;
				f = new Segment;
				f.X = e;
				f.da = a;
				f.w = 24;
				f.h = 6;
				f.Ya = false;
				f.m = .1;
				let g = new Segment;
				g.X = d;
				g.da = e;
				g.w = 8;
				g.h = 6;
				g.Ya = false;
				g.Sc(180);
				g.m = .1;
				let h = new Segment;
				h.X = e;
				h.da = d;
				h.w = 16;
				h.h = 6;
				h.Ya = false;
				h.Sc(180);
				h.m = .1;
				this.L.push(c);
				this.L.push(d);
				this.L.push(e);
				this.L.push(a);
				this.V.push(b);
				this.V.push(f);
				this.V.push(g);
				this.V.push(h);
			}

			Yk(a, b, c) {
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
					a.m = 1;
					a.Sc(-90);
					b = new Segment;
					b.X = f;
					b.da = g;
					b.h = 1;
					b.Ya = false;
					b.m = 1;
					b.Sc(90);
					c = new Segment;
					c.X = h;
					c.da = k;
					c.h = 1;
					c.Ya = false;
					c.m = 1;
					c.Sc(-90);
					r = new Segment;
					r.X = l;
					r.da = n;
					r.h = 1;
					r.Ya = false;
					r.m = 1;
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
					b.Sr(a),
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
					a.Zk('Hockey', 420, 204, 398, 182, 68, 120, 100);
					Stadium.ub.push(a);
					a = new Stadium;
					a.Zk('Big Hockey', 600, 270, 550, 240, 90, 160, 150);
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

			static En(a, b) {
				if (null != a.trait && (b = b[class_w.I(a.trait, String)],
				null != b)) {
					let c = 0
						,
						d = zc.Um(b);
					for (; c < d.length;) {
						let e = d[c];
						++c;
						null == a[e] && (a[e] = b[e]);
					}
				}
			}

			static Ln(a) {
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
				c != d && (a[b] = Stadium.Ln(c));
			}

			static zg(a, b, c) {
				b != c && (a.color = Stadium.Zn(b));
			}

			static Zn(a) {
				a |= 0;
				return 0 > a ? 'transparent' : StringOps3.ah(a);
			}

			static kg(a) {
				if ('transparent' == a)
					return -1;
				if ('string' == typeof a)
					return StringOpsInt.parseInt('0x' + StringOpsInt.De(a));
				if (a instanceof Array)
					return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
				throw GlobalError.B('Bad color');
			}

			static bs(a) {
				let b = {
					x: a.a.x,
					y: a.a.y
				};
				Stadium.la(b, 'bCoef', a.m, 1);
				Stadium.Nc(b, 'cMask', a.h, 63);
				Stadium.Nc(b, 'cGroup', a.w, 32);
				return b;
			}

			static vp(a) {
				let b = new Vertex;
				b.a.x = class_w.I(a.x, D);
				b.a.y = class_w.I(a.y, D);
				var c = a.bCoef;
				null != c && (b.m = class_w.I(c, D));
				c = a.cMask;
				null != c && (b.h = Stadium.Jc(c));
				a = a.cGroup;
				null != a && (b.w = Stadium.Jc(a));
				return b;
			}

			static mr(a, b) {
				let c = {
					v0: a.X.Bd,
					v1: a.da.Bd
				};
				Stadium.la(c, 'bias', a.Gc, b.Gc);
				Stadium.la(c, 'bCoef', a.m, b.m);
				let d = a.Ko();
				Stadium.la(c, 'curve', d, 0);
				0 != d && (c.curveF = a.tb);
				Stadium.la(c, 'vis', a.Ya, b.Ya);
				Stadium.Nc(c, 'cMask', a.h, b.h);
				Stadium.Nc(c, 'cGroup', a.w, b.w);
				Stadium.zg(c, a.S, b.S);
				return c;
			}

			static up(a, b) {
				let c = new Segment;
				var d = class_w.I(a.v1, Vb);
				c.X = b[class_w.I(a.v0, Vb)];
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
				null != d && (c.m = class_w.I(d, D));
				null != f ? c.tb = class_w.I(f, D) : null != e && c.Sc(class_w.I(e, D));
				null != g && (c.Ya = class_w.I(g, Bc));
				null != h && (c.h = Stadium.Jc(h));
				null != k && (c.w = Stadium.Jc(k));
				null != a && (c.S = Stadium.kg(a));
				return c;
			}

			static jp(a) {
				let b = {
					d0: a.ce,
					d1: a.de,
					length: a.Gb >= a.hc ? a.Gb : [a.Gb, a.hc]
				};
				Stadium.zg(b, a.S, 0);
				Stadium.la(b, 'strength', a.ue, Infinity);
				return b;
			}

			static rp(a, b) {
				let c = new Joint;
				var d = class_w.I(a.d0, Vb)
					,
					e = class_w.I(a.d1, Vb);
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
				c.ue = null == g || 'rigid' == g ? Infinity : class_w.I(g, D);
				null != f && (c.S = Stadium.kg(f));
				return c;
			}

			static nq(a) {
				let b = {
					normal: [a.wa.x, a.wa.y],
					dist: a.Ta
				};
				Stadium.la(b, 'bCoef', a.m, 1);
				Stadium.Nc(b, 'cMask', a.h, 63);
				Stadium.Nc(b, 'cGroup', a.w, 32);
				return b;
			}

			static sp(a) {
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
				null != c && (b.m = class_w.I(c, D));
				null != d && (b.h = Stadium.Jc(d));
				null != a && (b.w = Stadium.Jc(a));
				return b;
			}

			static Ro(a) {
				return {
					p0: [a.X.x, a.X.y],
					p1: [a.da.x, a.da.y],
					team: a.we == Team.red ? 'red' : 'blue'
				};
			}

			static qp(a) {
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
						a = Team.blue;
						break;
					case 'red':
						a = Team.red;
						break;
					default:
						throw GlobalError.B('Bad team value');
				}
				b.we = a;
				return b;
			}

			static qq(a) {
				let b = {};
				Stadium.la(b, 'bCoef', a.m, .5);
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

			static tp(a) {
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
				null != c && (b.m = class_w.I(c, D));
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

			static uo(a, b) {
				let c = {};
				if (a.a.x != b.a.x || a.a.y != b.a.y)
					c.pos = [a.a.x, a.a.y];
				if (a.F.x != b.F.x || a.F.y != b.F.y)
					c.speed = [a.F.x, a.F.y];
				if (a.oa.x != b.oa.x || a.oa.y != b.oa.y)
					c.gravity = [a.oa.x, a.oa.y];
				Stadium.la(c, 'radius', a.$, b.$);
				Stadium.la(c, 'bCoef', a.m, b.m);
				Stadium.la(c, 'invMass', a.ba, b.ba);
				Stadium.la(c, 'damping', a.Ba, b.Ba);
				Stadium.zg(c, a.S, b.S);
				Stadium.Nc(c, 'cMask', a.h, b.h);
				Stadium.Nc(c, 'cGroup', a.w, b.w);
				return c;
			}

			static Vk(a, b) {
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
				null != g && (b.m = class_w.I(g, D));
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

		class DynamicDisc {
			constructor() {
				this.kc = -1;
				this.jc = null;
				this.sl = 0;
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
				this.m = .5;
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
				a.u(this.m);
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
				this.m = a.v();
				this.ba = a.v();
				this.Ba = a.v();
				this.S = a.fb();
				this.h = a.N();
				this.w = a.N();
			}

			Xn(a) {
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
					0 > e && (e *= this.m * a.m + 1,
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

			Yn(a) {
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
					g = c - a.gk;
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
				0 > g && (g *= this.m * a.m + 1,
					c = a = this.F,
					a.x = c.x - b * g,
					a.y = c.y - d * g));
			}

			vc() {
				let a = ua.Cc
					,
					b = this.jc;
				this.kc != a && (null == b && (this.jc = b = new DynamicDisc),
					this.kc = a,
					DynamicDisc.xd(b, this));
				return b;
			}

			static xd(a, b) {
				a.$ = b.$;
				a.m = b.m;
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

		class class_B {
			static yp() {
				class_C.jj(function () {
					class_B.tk(class_B.Eq);
				});
				class_B.pp();
			}

			static pp() {
				let a = ConnectionConstants.o.Nj.H();
				null == a ? T.Go().then(function (b) {
					class_B.Re = b;
					ConnectionConstants.o.Nj.Ma(b.Pr());
				}).catch(function () {
				}) : T.Fo(a).then(function (b) {
					return class_B.Re = b;
				}).catch(function () {
				});
			}

			static Jo() {
				let a = class_Cc.Xm();
				return null != a ? null != a.getItem('crappy_router') : false;
			}

			static tk(a) {
				let b = new class_nb(ConnectionConstants.o.ke.H());
				b.ll = function (c) {
					ConnectionConstants.o.ke.Ma(c);
					ConnectionConstants.Na.bm();
					a();
				};
				class_C.Ja(b.f);
				b.Bb.focus();
			}

			static uk(a, b) {
				a = new aa(a);
				a.Ua = b;
				class_C.Ja(a.f);
			}

			static vo(a, b) {
				function c() {
					let f = new class_Ta('Failed', null);
					f.Ua = function () {
						class_B.vb();
					};
					class_C.Ja(f.f);
				}

				function d(f) {
					f = f.sitekey;
					if (null == f)
						throw GlobalError.B(null);
					class_B.uk(f, function (g) {
						e(a, g);
					});
				}

				class_C.Ja((new class_ba('Connecting', 'Connecting...', [])).f);
				let e = null;
				e = function (f, g) {
					Y.Il(ConnectionConstants.Me + 'api/client', 'room=' + f + '&rcr=' + g, Y.zj).then(function (h) {
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
				};
				e(a, '');
			}

			static Eq() {
				let a = Ac.H()
					,
					b = a.get('c')
					,
					c = a.get('p');
				a.get('v');
				null != b ? null != c ? class_B.Eh(b) : class_B.Zf(b) : class_B.vb();
			}

			static vb() {
				let a = new RoomListView(ConnectionConstants.o.Lh());
				class_C.Ja(a.Ha);
				a.fn = function (b) {
					if (9 != b.Cd.Od) {
						let c;
						9 > b.Cd.Od ? (b = 'Old version room',
							c = 'The room is running an older version, an update must have happened recently.') : (b = 'New version',
							c = 'The room is running a new version of haxball, refresh the site to update.');
						let d = new class_ba(b, c, ['Ok']);
						class_C.Ja(d.f);
						d.Ua = function () {
							class_C.Ja(a.Ha);
							d.Ua = null;
						};
					}
					else
						b.Cd.Hb ? class_B.Eh(b.aa) : class_B.Zf(b.aa);
				};
				a.Fs = function () {
					class_B.wo();
				};
				a.Es = function () {
					class_B.tk(class_B.vb);
				};
				a.Hs = function () {
					class_B.wk();
				};
				a.Gs = function (b) {
					class_B.xo(b);
				};
			}

			static wk() {
				let a = new class_la(true)
					,
					b = window.document.createElement('div');
				b.className = 'view-wrapper';
				b.appendChild(a.f);
				class_C.Ja(b);
				a.ob = function () {
					class_B.vb();
				};
				a.Lp = function () {
					let c = new class_ob
						,
						d = window.document.createElement('div');
					d.className = 'view-wrapper';
					d.appendChild(c.f);
					class_C.Ja(d);
					c.class_ob = function () {
						class_B.wk();
					};
				};
			}

			static ai(a, b) {
				return '' + globalScope.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
			}

			static wo() {
				let a = ConnectionConstants.o.ke.H()
					,
					b = new CreateRoomView('' + a + '\'s room');
				class_C.Ja(b.f);
				b.di = function () {
					class_B.vb();
				};
				b.Qp = function (c) {
					function d() {
						if (!c.Ss) {
							var t = new Wb;
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

					class_C.Ja((new class_ba('Creating room', 'Connecting...', [])).f);
					let e = null
						,
						f = ConnectionConstants.o.Lh()
						,
						g = new Room;
					g.mc = c.name;
					let h = new FullPlayer;
					h.A = a;
					h.bb = true;
					h.country = f.sb;
					h.Zb = ConnectionConstants.o.rh.H();
					g.K.push(h);
					let k = new Xb({
						iceServers: ConnectionConstants.fg,
						mj: ConnectionConstants.Me + 'api/host',
						state: g,
						version: 9
					});
					k.og = c.As - 1;
					k.Hb = c.password;
					d();
					let l = new ConnCa(k)
						,
						n = false;
					k.nf = function (t, z) {
						class_B.uk(t, function (K) {
							z(K);
							class_C.Ja(l.j.f);
							n = true;
						});
					};
					let r = window.setInterval(function () {
						k.ra(class_Da.ma(k));
					}, 3000);
					k.il = function (t) {
						null != g.getFullPlayerById(t) && k.ra(ma.ma(t, 'Bad actor', false));
					};
					k.Op = function (t, z) {
						let K = z.lc();
						if (25 < K.length)
							throw GlobalError.B('name too long');
						let N = z.lc();
						if (3 < N.length)
							throw GlobalError.B('country too long');
						z = z.yb();
						if (null != z && 2 < z.length)
							throw GlobalError.B('avatar too long');
						k.ra(Ea.ma(t, K, N, z));
						d();
					};
					k.Pp = function (t) {
						null != g.getFullPlayerById(t) && k.ra(ma.ma(t, null, false));
					};
					k.tg = function (t) {
						e = t;
						l.Ig = class_B.ai(t, null != k.Hb);
						n || (n = true,
							class_C.Ja(l.j.f));
					};
					l.Jh.Up = function (t, z, K, N) {
						k.Bo(t, z, K, N);
					};
					l.Jh.Vp = function () {
						d();
					};
					l.j.ie = function () {
						k.ja();
						l.ja();
						class_B.vb();
						window.clearInterval(r);
					};
					l.Yf.Mg = function (t) {
						k.Hb = t;
						d();
						null != e && (l.Ig = class_B.ai(e, null != k.Hb));
					};
					l.Yf.sm = function (t) {
						k.Hi(t);
					};
					l.Yf.Zd = createHandlerFromInstance(k, k.Zd);
				};
			}

			static Eh(a) {
				let b = new class_fb;
				class_C.Ja(b.f);
				b.Ua = function (c) {
					null == c ? class_B.vb() : class_B.Zf(a, c);
				};
			}

			static xo(a) {
				try {
					let b = new class_pc(new Yb(new Uint8Array(a), new Room, 3));
					b.pe.ie = function () {
						b.ja();
						class_B.vb();
					};
					class_C.Ja(b.j.f);
				}
				catch (b) {
					let c = GlobalError.Jb(b).Db();
					if (c instanceof Pb)
						a = new class_ba('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']),
							class_C.Ja(a.f),
							a.Ua = function (d) {
								0 == d ? (d = window.top.location,
									window.top.open(d.protocol + '//' + d.hostname + (null != d.port ? ':' + d.port : '') + '/replay?v=' + c.Od, '_self')) : class_B.vb();
							};
					else {
						let d = new class_ba('Replay error', 'Couldn\'t load the file.', ['Ok']);
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
					let d = class_B.Jo()
						,
						e = new Room
						,
						f = StreamWriter.ia();
					f.pc(ConnectionConstants.o.ke.H());
					f.pc(ConnectionConstants.o.Lh().sb);
					f.Cb(ConnectionConstants.o.rh.H());
					let g = new class_Fa(a, {
							iceServers: ConnectionConstants.fg,
							mj: ConnectionConstants.ds,
							state: e,
							version: 9,
							Us: f.Qg(),
							password: b,
							ln: d,
							pn: c,
							os: class_B.Re
						})
						,
						h = new class_pb;
					h.ca('Connecting to master...');
					h.uh.onclick = function () {
						g.Hd = null;
						g.mf = null;
						g.ja();
						class_B.vb();
					};
					class_C.Ja(h.f);
					let k = function (r, t) {
							r = new class_Ta(r, t);
							r.Ua = function () {
								class_B.vb();
							};
							class_C.Ja(r.f);
						}
						,
						l = function () {
							let r = new class_ba('Connection Failed', '', ['Ok']);
							r.$d.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
							r.Ua = function () {
								class_B.vb();
							};
							class_C.Ja(r.f);
						}
						,
						n = function () {
							let r = new ConnCa(g);
							g.ml = function (t) {
								r.j.Cf.xr(g.Bg.gh() | 0, g.Bg.max() | 0);
								r.j.Cf.wl.Bn(t);
							};
							r.Ig = class_B.ai(a, false);
							class_C.Ja(r.j.f);
							r.j.ie = function () {
								g.Hd = null;
								g.ja();
								r.ja();
								class_B.vb();
							};
							g.Hd = function () {
								g.Hd = null;
								r.ja();
								let t = null == r.Ld ? null : r.Ld.stop();
								k(g.nk, t);
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
										class_B.vo(a, function (t) {
											class_B.Zf(a, b, t);
										});
										break;
									case 4101:
										null == b ? class_B.Eh(a) : k(class_Fa.yh(r), null);
										break;
									default:
										k(class_Fa.yh(r), null);
								}
								break;
							default:
								k(class_Fa.yh(r), null);
						}
					};
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
					};
					g.Zp = function () {
						h.ca('Trying reverse connection...');
					};
				}
				catch (d) {
					c = GlobalError.Jb(d).Db(),
						globalScope.console.log(c),
						c = new class_ba('Unexpected Error', '', []),
						c.$d.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.',
						class_C.Ja(c.f);
				}
			}
		}

		class ConnectionConstants {
		}

		class Team {
			constructor(id, bColor, side, d, name, className, gColor, cGroup) {
				this.enemyTeam = null;
				this.aa = id;
				this.S = bColor;
				this.Dh = side;
				this.lp = d;
				this.A = name;
				this.qo = className;
				this.w = cGroup;
				this.Fm = new TeamColors;
				this.Fm.cb.push(bColor);
			}
		}

		class class_C {
			static us() {
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
						};
						d.onerror = function () {
							URL.revokeObjectURL(d.src);
							c(null);
						};
						d.src = URL.createObjectURL(new Blob([a], {
							type: 'image/png'
						}));
					}
				);
			}

			static jj(a) {
				class_C.us() && class_C.ps(function () {
					class_Hc.jj();
					let b = null == ConnectionConstants.o.Ue.H() ? class_na.No().then(function (d) {
							ConnectionConstants.o.Ue.Ma(d);
						}, function () {
						}) : Promise.resolve(null)
						,
						c = Y.H('res.dat', 'arraybuffer').then(function (d) {
							d = new JSZip(d);
							ConnectionConstants.Na = new AudioUtil(d);
							return Promise.all([ConnectionConstants.Na.zo, class_C.bh(d.file('images/grass.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.So = e;
							}), class_C.bh(d.file('images/concrete.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.co = e;
							}), class_C.bh(d.file('images/concrete2.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.ao = e;
							}), class_C.bh(d.file('images/typing.png').asArrayBuffer()).then(function (e) {
								return ConnectionConstants.Mm = e;
							})]);
						});
					Promise.all([c, b]).then(function () {
						class_C.Ds(a);
					});
				});
			}

			static ps(a) {
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
					a = new class_qb(d),
					class_C.Ja(a.f)) : a();
			}

			static Ds(a) {
				window.document.body.innerHTML = '';
				class_C.Vg = window.document.createElement('div');
				window.document.body.appendChild(class_C.Vg);
				let b = null;
				b = function () {
					ConnectionConstants.Na.bm();
					window.document.removeEventListener('click', b, true);
				};
				window.document.addEventListener('click', b, true);
				a();
			}

			static Ja(a) {
				null != class_C.cn && class_C.cn.remove();
				null != a && (class_C.Vg.appendChild(a),
					class_C.cn = a);
			}
		}

		class Sa {
			constructor(a, b, c) {
				this.od = this.xe = null;
				this.ve = [];
				this.jk = 0;
				this.ql = false;
				this.eg = [];
				this.$c = [];
				this.Ra = new RTCPeerConnection({
					iceServers: b
				}, Sa.ho);
				let d = this;
				this.Sh = new Promise(function (e) {
						d.cp = e;
					}
				);
				this.Ra.onicecandidate = function (e) {
					null == e.candidate ? d.cp(d.eg) : (e = e.candidate,
					null != e.candidate && e.candidate != '' && (null != d.sg && d.sg(e),
						d.eg.push(e)));
				};
				for (b = 0; b < c.length;)
					this.mo(c[b++]);
				this.aa = a;
			}

			Pi(a) {
				null == a && (a = 10000);
				window.clearTimeout(this.xe);
				this.xe = window.setTimeout(createHandlerFromInstance(this, this.ap), a);
			}

			lo(a, b) {
				let c = this;
				this.lk(this.Ra.setRemoteDescription(a).then(function () {
					return c.Ra.createAnswer();
				}), b, 500);
			}

			no() {
				this.lk(this.Ra.createOffer(), [], 1000);
			}

			lk(a, b, c) {
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
					return Ic.Kr(d.Sh, c).then(f, f);
				}).then(function (e) {
					d.ei(e);
				}).catch(function () {
					d.dg();
				});
			}

			mo(a) {
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
				};
				a.onclose = function () {
					c.dg();
				};
				a.onmessage = function () {
					c.dg();
				};
				this.$c.push(a);
			}

			Fj(a) {
				let b = this;
				window.setTimeout(function () {
					b.Ra.addIceCandidate(a);
				}, this.jk);
			}

			ap() {
				this.dg();
			}

			dg() {
				null != this.gd && this.gd();
				this.ja();
			}

			ja() {
				this.bk();
				this.Ra.close();
			}

			bk() {
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

		class kc {
			constructor() {
			}
		}

		class class_qc {
			constructor() {
				function a(g) {
					return new LocalStorageUnit(g, f, function (h) {
							if (null == h)
								return null;
							try {
								return class_na.Ih(h);
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
					return new LocalStorageUnit(g, f, function (k) {
							return null != k ? '0' != k : h;
						}
						, function (k) {
							return k ? '1' : '0';
						}
					);
				}

				function c(g, h) {
					return new LocalStorageUnit(g, f, function (k) {
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
					return new LocalStorageUnit(g, f, function (k) {
							let l = h;
							try {
								null != k && (l = StringOpsInt.parseInt(k));
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
					return new LocalStorageUnit(g, f, function (l) {
							return null == l ? h : StringOpsLimit.Vc(l, k);
						}
						, function (l) {
							return l;
						}
					);
				}

				let f = class_Cc.Xm();
				this.ke = e('player_name', '', 25);
				this.Ib = d('view_mode', -1);
				this.Gh = d('fps_limit', 0);
				this.rh = e('avatar', null, 2);
				e('rctoken', null, 1024);
				this.Gm = b('team_colors', true);
				this.Jk = b('show_indicators', true);
				this.ym = b('sound_main', true);
				this.Ki = b('sound_chat', true);
				this.xm = b('sound_highlight', true);
				this.wm = b('sound_crowd', true);
				this.Nj = e('player_auth_key', null, 1024);
				this.yd = d('extrapolation', 0);
				this.yi = c('resolution_scale', 1);
				this.um = b('show_avatars', true);
				this.$j = d('chat_height', 160);
				this.wh = d('chat_focus_height', 200);
				this.xh = c('chat_opacity', .8);
				this.Ue = a('geo');
				this.Ve = a('geo_override');
				this.Cg = function () {
					return new LocalStorageUnit('player_keys', f, function (g) {
							if (null == g)
								return class_ra.ik();
							try {
								return class_ra.Ih(g);
							}
							catch (h) {
								return class_ra.ik();
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
				return null != this.Ve.H() ? this.Ve.H() : null != this.Ue.H() ? this.Ue.H() : new class_na;
			}
		}

		class Disc {
			constructor() {
				this.w = 63;
				this.h = 63;
				this.S = 16777215;
				this.Ba = .99;
				this.ba = 1;
				this.m = .5;
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
				a.u(this.m);
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
				this.m = a.v();
				this.ba = a.v();
				this.Ba = a.v();
				this.S = a.fb();
				this.h = a.N();
				this.w = a.N();
			}

			zp() {
				let a = new DynamicDisc;
				this.Kk(a);
				return a;
			}

			Kk(a) {
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
				a.m = this.m;
				a.ba = this.ba;
				a.Ba = this.Ba;
				a.S = this.S;
				a.h = this.h;
				a.w = this.w;
			}
		}

		class Zb {
			static parse(a) {
				a.C();
				let b = [];
				for (; 0 != a.s.byteLength - a.a;) {
					let c = a.oe(a.Rb())
						,
						d = a.Ml(a.Rb());
					try {
						let e = new Wb;
						e.ka(new J(new DataView(d), false));
						let f = new class_lc;
						f.Cd = e;
						f.aa = c;
						b.push(f);
					}
					catch (e) {
					}
				}
				return b;
			}

			static ts(a, b, c, d) {
				return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
			}

			static Qs(a, b) {
				let c = a.Ic;
				a = a.Kc;
				let d = 0;
				for (; d < b.length;) {
					let e = b[d];
					++d;
					let f = e.Cd;
					e.Te = 6378 * Zb.ts(.017453292519943295 * f.Ic, .017453292519943295 * f.Kc, .017453292519943295 * c, .017453292519943295 * a);
					isFinite(e.Te) || (e.Te = 22000);
				}
			}

			static get() {
				return Y.H(ConnectionConstants.Me + 'api/list', 'arraybuffer').then(function (a) {
					return Zb.parse(new J(new DataView(a), false));
				});
			}
		}

		class class_pb {
			constructor() {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_pb.O);
				let a = ViewUtil.Da(this.f);
				this.Pb = a.get('log');
				this.uh = a.get('cancel');
			}

			ca(a) {
				let b = window.document.createElement('p');
				b.textContent = a;
				this.Pb.appendChild(b);
			}
		}

		class TeamColors {
			constructor() {
				this.ld = 16777215;
				this.cb = [];
			}

			fa(a) {
				a.l(this.pd);
				a.P(this.ld);
				a.l(this.cb.length);
				let b = 0
					,
					c = this.cb;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			ka(a) {
				this.pd = a.C();
				this.ld = a.N();
				let b = a.C();
				if (3 < b)
					throw GlobalError.B('too many');
				this.cb = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.cb.push(a.N());
			}
		}

		class GameView {
			constructor(a) {
				this.Ob = new GameStateView;
				this.kd = false;
				this.Cf = new StatsView;
				this.field_chatboxViewInst = new ChatboxView;
				this.Va = new RoomMenuView(a);
				this.Ob.Qb = a;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(GameView.O);
				a = ViewUtil.Da(this.f);
				this.Qr = a.get('top-section');
				this.rf = a.get('popups');
				this.rf.style.display = 'none';
				a.get('gameplay').appendChild(this.Ob.f);
				ViewUtil.replaceWith(a.get('chatbox'), this.field_chatboxViewInst.f);
				ViewUtil.replaceWith(a.get('stats'), this.Cf.f);
				this.ci = a.get('menu');
				let b = this;
				this.ci.onclick = function () {
					b.te(!b.kd);
					b.ci.blur();
				};
				a.get('settings').onclick = function () {
					let c = new class_la;
					c.ob = function () {
						b.ab(null);
					};
					b.ab(c.f);
				};
				this.Va.ie = function () {
					let c = new class_tb;
					c.ob = function (d) {
						b.ab(null);
						d && H.i(b.ie);
					};
					b.ab(c.f);
				};
				this.Va.eq = function () {
					let c = new class_ub;
					c.di = function () {
						b.ab(null);
					};
					c.xg = function (d) {
						class_E.i(b.xg, d);
						b.ab(null);
					};
					c.gi = function (d) {
						d = new class_ba('Error loading stadium', d, ['Ok']);
						d.Ua = function () {
							b.ab(null);
						};
						b.ab(d.f);
					};
					b.ab(c.f);
				};
			}

			D(a) {
				null == a.U.M && this.te(true);
				H.i(this.Hl);
				this.ci.disabled = null == a.U.M;
				this.f.style.setProperty('--chat-opacity', '' + ConnectionConstants.o.xh.H());
				this.kd && this.Va.D(a.U, a.U.getFullPlayerById(a.yc));
				a = a.cg();
				let b = this.field_chatboxViewInst.f.getBoundingClientRect().height;
				this.Ob.cc.Uj = b * window.devicePixelRatio;
				this.Ob.D(a);
				ConnectionConstants.Na.fk.Ts(a);
			}

			te(a) {
				this.kd != a && (this.kd = a,
					this.f.classList.toggle('showing-room-view', this.kd),
					this.kd ? this.Qr.appendChild(this.Va.f) : this.Va.f.remove());
			}

			hp() {
				return null != GameView.rq;
			}

			ab(a, b) {
				ViewUtil.Jf(this.rf);
				GameView.rq = a;
				null != a ? (this.rf.style.display = 'flex',
					this.rf.appendChild(a),
					this.Hl = b) : (this.rf.style.display = 'none',
					this.Hl = null);
			}
		}

		class $b {
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

		class class_vb {
			constructor() {
				this.ee = this.ig = 0;
				window.document.addEventListener('focusout', createHandlerFromInstance(this, this.jl));
			}

			ja() {
				window.document.removeEventListener('focusout', createHandlerFromInstance(this, this.jl));
			}

			D() {
				let a = this.ee;
				if (null != this.wg && a != this.ig) {
					this.ig = a;
					let b = new Ga;
					b.input = a;
					this.wg(b);
				}
			}

			Id(a) {
				this.ee |= class_vb.Ok(a);
			}

			Jd(a) {
				this.ee &= ~class_vb.Ok(a);
			}

			jl() {
				if (null != this.wg && 0 != this.ig) {
					this.ig = this.ee = 0;
					let a = new Ga;
					a.input = 0;
					this.wg(a);
				}
			}

			static Ok(a) {
				switch (ConnectionConstants.o.Cg.H().H(a)) {
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

		class class_ub {
			constructor() {
				this.hb = null;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_ub.O);
				let a = ViewUtil.Da(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					H.i(b.di);
				};
				this.ii = a.get('pick');
				this.kk = a.get('delete');
				this.Ak = a.get('export');
				let c = a.get('list')
					,
					d = a.get('file');
				this.Rg();
				this.ii.onclick = function () {
					null != b.hb && b.hb.Ud().then(function (e) {
						class_E.i(b.xg, e);
					});
				};
				this.kk.onclick = function () {
					if (null != b.hb) {
						var e = b.hb.Tm;
						null != e && (b.hb.Ha.remove(),
							b.hb = null,
							e(),
							b.Rg());
					}
				};
				this.Ak.onclick = function () {
					null != b.hb && b.hb.Ud().then(function (e) {
						ac.ir(e.ye(), e.A + '.hbs');
					});
				};
				this.li(c);
				this.Ll = class_wb.Zh(c);
				window.setTimeout(function () {
					b.Ll.update();
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
								h.Uk(g);
								class_E.i(b.xg, h);
							}
							catch (h) {
								g = GlobalError.Jb(h).Db(),
									g instanceof SyntaxError ? class_E.i(b.gi, 'SyntaxError in line: ' + StringOpsInt.De(g.lineNumber)) : g instanceof Ub ? class_E.i(b.gi, g.Ep) : class_E.i(b.gi, 'Error loading stadium file.');
							}
						};
						f.readAsText(e);
					}
				};
			}

			Rg() {
				this.ii.disabled = null == this.hb;
				this.kk.disabled = null == this.hb || null == this.hb.Tm;
				this.Ak.disabled = null == this.hb;
			}

			al(a, b, c) {
				let d = window.document.createElement('div');
				d.textContent = a;
				d.className = 'elem';
				null != c && d.classList.add('custom');
				let e = {
						Ha: d,
						Ud: b,
						Tm: c
					}
					,
					f = this;
				d.onclick = function () {
					null != f.hb && f.hb.Ha.classList.remove('selected');
					f.hb = e;
					d.classList.add('selected');
					f.Rg();
				};
				d.ondblclick = function () {
					f.hb = e;
					f.Rg();
					return f.ii.onclick();
				};
				return d;
			}

			li(a) {
				let b = Stadium.Kh()
					,
					c = 0;
				for (; c < b.length;) {
					let e = b[c];
					++c;
					a.appendChild(this.al(e.A, function () {
						return Promise.resolve(e);
					}, null));
				}
				let d = this;
				kb.getAll().then(function (e) {
					let f = 0;
					for (; f < e.length;) {
						let g = e[f];
						++f;
						let h = g.id;
						a.appendChild(d.al(g.name, function () {
							return kb.get(h);
						}, function () {
							return kb.delete(h);
						}));
					}
					d.Ll.update();
				});
			}
		}

		class PlayerPhysics {
			constructor() {
				this.$e = 0;
				this.$ = 15;
				this.w = 0;
				this.oa = new Point(0, 0);
				this.ba = this.m = .5;
				this.Ba = .96;
				this.Ke = .1;
				this.af = .07;
				this.bf = .96;
				this.Ze = 5;
			}

			fa(a) {
				a.u(this.m);
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
				this.m = a.v();
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

		class class_Aa {
			constructor(a) {
				this.Ed = new Map;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_Aa.O);
				this.f.className += ' ' + a.qo;
				let b = ViewUtil.Da(this.f);
				this.$a = b.get('list');
				this.Vh = b.get('join-btn');
				this.xi = b.get('reset-btn');
				a == Team.spec && this.xi.remove();
				this.Vh.textContent = '' + a.A;
				this.f.ondragover = this.f.Ys = function (d) {
					-1 != d.dataTransfer.types.indexOf('player') && d.preventDefault();
				};
				let c = this;
				this.f.ondrop = function (d) {
					d.preventDefault();
					d = d.dataTransfer.getData('player');
					null != d && (d = StringOpsInt.parseInt(d),
					null != d && Ba.i(c.vg, d, a));
				};
				this.Vh.onclick = function () {
					class_E.i(c.Rp, a);
				};
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
					null == f && (f = new PlayerListItem(e),
						f.pf = function (h) {
							class_E.i(g.pf, h);
						}
						,
						this.Ed.set(e.W, f),
						this.$a.appendChild(f.f)),
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
					c.nextSibling != e && this.$a.insertBefore(c, e);
			}
		}

		class P {
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

		class class_nb {
			constructor(a) {
				function b() {
					d.isBetweenLimits() && null != d.ll && d.ll(d.Bb.value);
				}

				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_nb.O);
				let c = ViewUtil.Da(this.f);
				this.Bb = c.get('input');
				this.jf = c.get('ok');
				let d = this;
				this.Bb.maxLength = 25;
				this.Bb.value = a;
				this.Bb.oninput = function () {
					d.D();
				};
				this.Bb.onkeydown = function (e) {
					13 == e.keyCode && b();
				};
				this.jf.onclick = b;
				this.D();
			}

			isBetweenLimits() {
				let a = this.Bb.value;
				return 25 >= a.length ? 0 < a.length : false;
			}

			D() {
				this.jf.disabled = !this.isBetweenLimits();
			}
		}

		class Ic {
			static Kr(a, b) {
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

		class Jc {
			static qf(a) {
				a = a.split(' ');
				let b = a[4];
				if ('typ' != a[6])
					throw GlobalError.B(null);
				return {
					Rr: a[7],
					fp: b
				};
			}
		}

		class rc {
			static i(a, b, c, d) {
				null != a && a(b, c, d);
			}
		}

		class Ha {
		}

		class T {
			constructor() {
			}

			Pr() {
				return 'idkey.' + this.bj + '.' + this.cj + '.' + this.hk;
			}

			Dr(a) {
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
					return window.crypto.subtle.sign(T.vm, this.Jl, f).then(function (g) {
						b.Sg(g);
						return b.Vb();
					});
				}
				catch (b) {
					return Promise.reject(GlobalError.Jb(b).Db());
				}
			}

			static Go() {
				try {
					return window.crypto.subtle.generateKey(T.ph, true, ['sign', 'verify']).then(function (a) {
						let b = a.privateKey;
						return window.crypto.subtle.exportKey('jwk', b).then(function (c) {
							let d = c.y
								,
								e = c.d
								,
								f = new T;
							f.bj = c.x;
							f.cj = d;
							f.hk = e;
							f.Jl = b;
							return f;
						});
					});
				}
				catch (a) {
					return Promise.reject(GlobalError.Jb(a).Db());
				}
			}

			static Fo(a) {
				a = a.split('.');
				if (4 != a.length || 'idkey' != a[0])
					return Promise.reject('Invalid id format');
				let b = a[1]
					,
					c = a[2]
					,
					d = a[3];
				return T.fs(b, c, d).then(function (e) {
					let f = new T;
					f.bj = b;
					f.cj = c;
					f.hk = d;
					f.Jl = e;
					return f;
				});
			}

			static Zr(a, b) {
				try {
					let c = new J(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
					c.C();
					let d = c.qb(c.Rb())
						,
						e = c.qb()
						,
						f = new J(new DataView(d.buffer, d.byteOffset, d.byteLength), false)
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
					return T.es(g, h).then(function (n) {
						return window.crypto.subtle.verify(T.vm, n, e, d);
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

			static fs(a, b, c) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['sign'],
						kty: 'EC',
						d: c,
						x: a,
						y: b
					}, T.ph, true, ['sign']);
				}
				catch (d) {
					return Promise.reject(GlobalError.Jb(d).Db());
				}
			}

			static es(a, b) {
				try {
					return window.crypto.subtle.importKey('jwk', {
						crv: 'P-256',
						ext: true,
						key_ops: ['verify'],
						kty: 'EC',
						x: a,
						y: b
					}, T.ph, true, ['verify']);
				}
				catch (c) {
					return Promise.reject(GlobalError.Jb(c).Db());
				}
			}
		}

		class PingGraph {
			constructor() {
				this.Bh = 0;
				this.Dp = 400;
				this.Hk = 64;
				this.Zi = 32;
				this.sa = window.document.createElement('canvas');
				this.$f = window.document.createElement('canvas');
				this.f = window.document.createElement('div');
				this.$f.width = this.sa.width = this.Zi;
				this.$f.height = this.sa.height = this.Hk;
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
				this.mq = a;
				this.f.appendChild(this.$f);
				this.f.className = 'graph';
				this.f.hidden = true;
			}

			Bn(a) {
				this.f.hidden = false;
				0 > a ? (a = 150,
					this.c.fillStyle = '#c13535') : this.c.fillStyle = '#32FF32';
				let b = this.Zi
					,
					c = this.Hk
					,
					d = this.Bh++;
				this.Bh >= b && (this.Bh = 0);
				this.mq[d] = a;
				this.c.clearRect(d, 0, 1, c);
				a = a * c / this.Dp;
				this.c.fillRect(d, c - a, 1, a);
				this.Fh.clearRect(0, 0, b, c);
				this.Fh.drawImage(this.sa, b - d - 1, 0);
				this.Fh.drawImage(this.sa, -d - 1, 0);
			}
		}

		class tc {
			constructor(a) {
				this.Ej = new Map;
				this.Po = new class_xb(100, 16);
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

		class ConnCa {
			constructor(majorInst) {
				this.Xf = null;
				this.Ah = false;
				this.Rk = false;
				this.ed = window.performance.now();
				this.Ld = null;
				this.Le = 0;
				this.Rn = new class_xb(3, 1000);
				this.mb = new class_vb;
				this.Ig = 'Waiting for link';
				this.Ai = this.jm = false;
				this.zd = 0;
				let b = this;
				this.Yf = new CommandUtil(majorInst, function (text) {
						b.j.field_chatboxViewInst.addNoticeToLogAndHandle(text);
					}
				);
				this.xa = majorInst;
				majorInst.U.so = function (d) {
					b.jm != d && (b.jm = d,
						majorInst.ra(Ia.ma(d)));
				};
				this.j = new GameView(majorInst.yc);
				window.top.document.body.classList.add('hb-playing');
				this.Jh = new ImportantUtil(this.j, majorInst.U.getFullPlayerById(majorInst.yc).A);
				this.Jh.ti(majorInst.U);
				this.j.field_chatboxViewInst.ol = createHandlerFromInstance(this, this.Np);
				this.j.field_chatboxViewInst.rg = createHandlerFromInstance(this, this.Mp);
				window.document.addEventListener('keydown', createHandlerFromInstance(this, this.Id));
				window.document.addEventListener('keyup', createHandlerFromInstance(this, this.Jd));
				window.onbeforeunload = function () {
					return 'Are you sure you want to leave the room?';
				};
				this.mb.wg = function (d) {
					majorInst.ra(d);
				};
				this.j.Va.iq = function (d) {
					majorInst.ra(za.ma(1, d));
				};
				this.j.Va.$p = function (d) {
					majorInst.ra(za.ma(0, d));
				};
				this.j.xg = function (d) {
					majorInst.ra(Ja.ma(d));
				};
				this.j.Va.fq = function () {
					majorInst.ra(new class_Wa);
				};
				this.j.Va.gq = function () {
					majorInst.ra(new class_Xa);
				};
				this.j.Va.Tp = function () {
					b.Km();
				};
				this.j.Va.vg = function (d, e) {
					majorInst.ra(fa.ma(d, e));
				};
				this.j.Va.je = createHandlerFromInstance(this, this.cr);
				this.j.Va.Kp = function () {
					majorInst.ra(new Ya);
				};
				this.j.Va.Wp = function () {
					ConnCa.Iq(majorInst);
				};
				this.j.Va.hq = function (d) {
					majorInst.ra(class_Ka.ma(d));
				};
				this.j.Va.pf = function (d) {
					let e = majorInst.U.getFullPlayerById(d);
					if (null != e) {
						let f = new class_jb(e, b.Ai);
						f.ob = function () {
							b.j.ab(null);
						};
						f.Jp = function (g, h) {
							majorInst.ra(La.ma(g, h));
						};
						f.fi = function () {
							b.Cr(e);
						};
						b.j.ab(f.f, function () {
							f.D(majorInst.U, b.Ai);
						});
					}
				};
				this.j.Va.cq = function () {
					let d = new class_yb;
					d.ob = function () {
						b.j.ab(null);
					};
					b.j.ab(d.f, function () {
						d.vr(b.Ig);
					});
				};
				this.j.Va.Xp = function () {
					if (null == b.Ld)
						b.Gr();
					else {
						let d = b.Ld.stop();
						b.Ld = null;
						ConnCa.gm(d);
					}
					b.j.Va.yr(null != b.Ld);
				};
				window.requestAnimationFrame(createHandlerFromInstance(this, this.kf));
				this.Hh = window.setInterval(function () {
					b.j.Cf.qm(b.zd);
					b.zd = 0;
				}, 1000);
				this.Yr = window.setInterval(function () {
					majorInst.D();
				}, 50);
				this.Bf();
				var c = ConnectionConstants.o.yd.H();
				c = Constants.minE > c ? Constants.minE : Constants.maxE < c ? Constants.maxE : c;
				if (c != 0) {
					majorInst.pm(ConnectionConstants.o.yd.H());
					this.j.field_chatboxViewInst.addNoticeToLogAndHandle('Extrapolation set to ' + c + ' msec');
				}

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
						bCoeff: dynDisc.m,
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
						admin: fullPlayer.bb,
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
				window.parent.g.sendChat = this.j.field_chatboxViewInst.ol;
				window.parent.g.showChatIndicator = this.j.field_chatboxViewInst.rg;
				window.parent.g.setAvatar = text => this.Yf.om(text);

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

			Gr() {
				this.Ld = new uc(this.xa, 3);
			}

			Cr(a) {
				a = new class_zb(a);
				let b = this;
				a.ob = function () {
					b.j.ab(null);
				};
				a.fi = function (c, d, e) {
					b.xa.ra(ma.ma(c, d, e));
					b.j.ab(null);
				};
				this.j.ab(a.f);
			}

			ja() {
				window.document.removeEventListener('keydown', createHandlerFromInstance(this, this.Id));
				window.document.removeEventListener('keyup', createHandlerFromInstance(this, this.Jd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.Le);
				window.top.document.body.classList.remove('hb-playing');
				this.mb.ja();
				window.clearInterval(this.Hh);
				window.clearInterval(this.Yr);
				window.clearTimeout(this.Xf);
			}

			cr(a) {
				let b = []
					,
					c = 0
					,
					d = this.xa.U.K;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.ea == a && b.push(fa.ma(e.W, Team.spec));
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
				1 == ConnectionConstants.o.Gh.H() && 28.333333333333336 > a - this.ed || (this.ed = a,
					this.zd++,
					this.Bf(),
					a = this.xa.U.getFullPlayerById(this.xa.yc),
				null != a && (this.Ai = a.bb),
					this.j.D(this.xa));
			}

			Np(a) {
				let b = this;
				this.Yf.qf(a) || this.Rn.io(function () {
					let c = new Za;
					c.Yc = a;
					b.xa.ra(c);
				});
			}

			Mp(a) {
				this.Ah = a;
				let b = this;
				null == this.Xf && (this.Xf = window.setTimeout(function () {
					b.Xf = null;
					b.km(b.Ah);
				}, 1000),
					this.km(this.Ah));
			}

			km(a) {
				a != this.Rk && (this.xa.ra(Ma.ma(a ? 0 : 1)),
					this.Rk = a);
			}

			Km() {
				if (null != this.xa.U.M) {
					let a = new $a;
					a.If = 120 != this.xa.U.M.Pa;
					this.xa.ra(a);
				}
			}

			Id(kbEvent) {
				switch (kbEvent.keyCode) {
					case 9: // Tab
					case 13: // Enter
						this.j.field_chatboxViewInst.eb.focus();
						kbEvent.preventDefault();
						break;
					case 27: // Esc
						if (this.j.hp())
							this.j.ab(null);
						else {
							let b = this.j;
							b.te(!b.kd);
						}
						kbEvent.preventDefault();
						break;
					case 49: // 1
						ConnectionConstants.o.Ib.Ma(1);
						break;
					case 50: // 2
						ConnectionConstants.o.Ib.Ma(2);
						break;
					case 51: // 3
						ConnectionConstants.o.Ib.Ma(3);
						break;
					case 52: // 4
						ConnectionConstants.o.Ib.Ma(4);
						break;
					case 53: // 5
						ConnectionConstants.o.Ib.Ma(5);
						break;
					case 54: // 6
						ConnectionConstants.o.Ib.Ma(6);
						break;
					case 55: // 7
						ConnectionConstants.o.Ib.Ma(7);
						break;
					case 56: // 8
						ConnectionConstants.o.Ib.Ma(15);
						break;
					case 57: // 9
						ConnectionConstants.o.Ib.Ma(-1.5);
						break;
					case 48: // 0
						ConnectionConstants.o.Ib.Ma(-0.5);
						break;
					case 80: // p
						this.Km();
						break;
					default:
						this.mb.Id(kbEvent.code);
				}
			}

			Bf() {
				let a = ConnectionConstants.o.Ib.H();
				let b = this.j.Ob.cc;
				b.qe = ConnectionConstants.o.yi.H();
				b.Wi = 35;
				/*
				if (a <= 0) {
					b.ne = 610;
				}
				else {
					b.ne = 0;
					b.mi = 1 + .25 * (a - 1);
				}
				*/
				b.ne = 0;
				b.mi = 1 + .25 * (a - 1);
			}

			Jd(a) {
				this.mb.Jd(a.code);
			}

			static gm(a) {
				let b = new Date;
				ac.hr(a, 'HBReplay-' + b.getFullYear() + '-' + StringOps3.Hf('' + (b.getMonth() + 1)) + '-' + StringOps3.Hf('' + b.getDate()) + '-' + StringOps3.Hf('' + b.getHours()) + 'h' + StringOps3.Hf('' + b.getMinutes()) + 'm.hbr2');
			}

			static Iq(a) {
				var b = a.U.K;
				let c = [];
				var d = 0;
				let e = 0;
				for (var f = 0; f < b.length;) {
					let g = b[f];
					++f;
					g.ea == Team.spec && c.push(g.W);
					g.ea == Team.red ? ++d : g.ea == Team.blue && ++e;
				}
				f = c.length;
				f != 0 && (b = function () {
					return c.splice(Math.random() * c.length | 0, 1)[0];
				}
					,
					e == d ? 2 > f || (a.ra(fa.ma(b(), Team.red)),
						a.ra(fa.ma(b(), Team.blue))) : (d = e > d ? Team.red : Team.blue,
						a.ra(fa.ma(b(), d))));
			}
		}

		class class_wb {
			static Zh(a) {
				return new PerfectScrollbar(a, {
					handlers: class_wb.bp
				});
			}
		}

		class class_E {
			static i(a, text) {
				if (null != a)
					a(text);
			}
		}

		class BigTextUtil {
			constructor() {
				this.Uc = 0;
				this.$a = [];
				this.Hr = new BigAnimatedText(['Time is', 'Up!'], 16777215);
				this.Nq = new BigAnimatedText(['Red is', 'Victorious!'], 15035990);
				this.Mq = new BigAnimatedText(['Red', 'Scores!'], 15035990);
				this.Kn = new BigAnimatedText(['Blue is', 'Victorious!'], 625603);
				this.Jn = new BigAnimatedText(['Blue', 'Scores!'], 625603);
				this.lq = new BigAnimatedText(['Game', 'Paused'], 16777215);
			}

			Qa(a) {
				this.$a.push(a);
			}

			Vn() {
				this.$a = [];
				this.Uc = 0;
			}

			D(a) {
				0 < this.$a.length && (this.Uc += a) > this.$a[0].Ho() && (this.Uc = 0,
					this.$a.shift());
			}

			Oc(a) {
				0 < this.$a.length && this.$a[0].Oc(a, this.Uc);
			}
		}

		class Joint {
			constructor() {
				this.S = 0;
				this.ue = Infinity;
				this.hc = 100;
				this.Gb = 100;
				this.de = 0;
				this.ce = 0;
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
					var c = b.a;
					var d = a.a;
					var e = c.x - d.x;
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

		class Notice {
			constructor(a) {
				this.fl = a.get('notice');
				this.jo = a.get('notice-contents');
				this.ud = a.get('notice-close');
				this.Sl();
			}

			Sl() {
				let a = this;
				Y.Ck(ConnectionConstants.Me + 'api/notice').then(function (b) {
					let c = b.content;
					if (c != null && c != '' && c != Notice.Wn) {
						a.jo.innerHTML = c;
						a.fl.hidden = false;
						a.ud.onclick = function () {
							Notice.Wn = c;
							return a.fl.hidden = true;
						};
					}
				});
			}
		}

		class Vertex {
			constructor() {
				this.Bd = 0;
				this.w = 32;
				this.h = 63;
				this.m = 1;
				this.a = new Point(0, 0);
			}

			fa(a) {
				let b = this.a;
				a.u(b.x);
				a.u(b.y);
				a.u(this.m);
				a.P(this.h);
				a.P(this.w);
			}

			ka(a) {
				let b = this.a;
				b.x = a.v();
				b.y = a.v();
				this.m = a.v();
				this.h = a.N();
				this.w = a.N();
			}
		}

		class ChatboxView {
			constructor() {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(ChatboxView.O);
				let a = ViewUtil.Da(this.f);
				this.Pb = a.get('log');
				this.eb = a.get('input');
				this.eb.maxLength = 140;
				let self = this;
				a.get('drag').onmousedown = function (c) {
					function d(h) {
						h.preventDefault();
						ConnectionConstants.o.$j.Ma(hc(hc(e + (f - h.y))));
						self.Lg(Nb());
					}

					self.f.classList.add('dragging');
					let e = Nb();
					let f = c.y;
					c.preventDefault();
					let g = null;
					g = function (h) {
						self.f.classList.remove('dragging');
						d(h);
						window.document.removeEventListener('mousemove', d, false);
						window.document.removeEventListener('mouseup', g, false);
					};
					window.document.addEventListener('mousemove', d, false);
					window.document.addEventListener('mouseup', g, false);
				};
				this.Fc = new dc(a.get('autocompletebox'), function (c, d) {
						self.eb.value = c;
						self.eb.setSelectionRange(d, d);
					}
				);
				this.eb.onkeydown = function (c) {
					switch (c.keyCode) {
						case 9: // Tab
							self.Fc.Nb.hidden || (self.Fc.yo(),
								c.preventDefault());
							break;
						case 13: // Enter
							if (self.ol != null && self.eb.value != '')
								self.ol(self.eb.value);
							self.eb.value = '';
							self.eb.blur();
							break;
						case 27: // Esc
							if (self.Fc.Nb.hidden) {
								self.eb.value = '';
								self.eb.blur();
							}
							else {
								self.Fc.Qh();
							}
							break;
						case 38: // Up
							self.Fc.Yj(-1);
							break;
						case 40: // Down
							self.Fc.Yj(1);
					}
					c.stopPropagation();
				};
				this.eb.onfocus = function () {
					null != self.rg && self.rg(true);
					let c = hc(ConnectionConstants.o.wh.H());
					Nb() < c && self.Lg(c);
				};
				this.eb.onblur = function () {
					null != self.rg && self.rg(false);
					self.Fc.Qh();
					self.Lg(Nb());
				};
				this.eb.oninput = function () {
					self.Fc.Pn(self.eb.value, self.eb.selectionStart);
				};
				this.Lg(Nb());
			}

			Lg(a) {
				this.Pb.scrollTop = this.Pb.scrollHeight;
				this.f.style.height = '' + a + 'px';
			}

			xp(a, b, c) {
				let d = window.document.createElement('p');
				d.className = 'announcement';
				d.textContent = a;
				0 <= b && (d.style.color = class_V.oc(b));
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
				this.Xk(d);
			}

			Xk(a) {
				var b = this.Pb.clientHeight;
				b = this.Pb.scrollTop + b - this.Pb.scrollHeight >= .5 * -b || !ChatboxView.gp(this.Pb);
				this.Pb.prepend(a);
				b && (this.Pb.scrollTop = a.offsetTop);
				for (a = b ? 50 : 100; this.Pb.childElementCount > a;)
					this.Pb.lastElementChild.remove();
			}

			ca(a, b) {
				let c = window.document.createElement('p');
				null != b && (c.className = b);
				c.textContent = a;
				this.Xk(c);
			}

			addNoticeToLogAndHandle(a) {
				this.ca(a, 'notice');
			}

			static gp(a) {
				return a.parentElement.querySelector(':hover') == a;
			}
		}

		class Ba {
			static i(a, b, c) {
				null != a && a(b, c);
			}
		}

		class StringOps3 {
			static vs(a, b) {
				a = P.fj(a, b);
				return 8 < a && 14 > a ? true : 32 == a;
			}

			static Ps(a) {
				let b = a.length
					,
					c = 0;
				for (; c < b && StringOps3.vs(a, b - c - 1);)
					++c;
				return 0 < c ? P.substr(a, 0, b - c) : a;
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

		class oc {
			constructor() {
				this.hash = 0;
			}

			hs(a) {
				let b = 0
					,
					c = a.length;
				for (; b < c;)
					this.hash = (this.hash += a[b++]) + (this.hash << 10),
						this.hash ^= this.hash >>> 6;
			}
		}

		class ec {
		}

		class ViewUtil {
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

			static getFirstElemChildFromHtmlContents(htmlContents, baseHtmlTag = 'div') {
				const element = window.document.createElement(baseHtmlTag);
				element.innerHTML = htmlContents;
				return element.firstElementChild;
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

		class fc {
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

		class GameStateView {
			constructor() {
				this.Qb = -1;
				this.cc = new class_V;
				this.Uc = new wc;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(GameStateView.O);
				let a = ViewUtil.Da(this.f);
				this.Sb = new fc(a.get('red-score'), 0);
				this.Lb = new fc(a.get('blue-score'), 0);
				ViewUtil.replaceWith(a.get('timer'), this.Uc.f);
				ViewUtil.replaceWith(a.get('canvas'), this.cc.sa);
			}

			D(a) {
				let b = a.M;
				null == b ? this.f.hidden = true : (this.f.hidden = false,
					this.Uc.Ar(60 * a.Ca),
					this.Uc.zr(b.Lc | 0),
					this.Lb.set(b.Lb),
					this.Sb.set(b.Sb),
					this.cc.Oc(a, this.Qb));
			}
		}

		class ac {
			static hr(a, b) {
				ac.fm(new Blob([a], {
					type: 'octet/stream'
				}), b);
			}

			static ir(a, b) {
				ac.fm(new Blob([a], {
					type: 'text/plain'
				}), b);
			}

			static fm(a, b) {
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

		class class_ba {
			constructor(a, b, c) {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_ba.O);
				var d = ViewUtil.Da(this.f);
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
					};
					d.appendChild(n);
				}
				this.$d.textContent = b;
				e.textContent = a;
			}
		}

		class Sb {
			static kh(a) {
				return new Promise(function (b, c) {
						a.onsuccess = function () {
							b(a.result);
						};
						a.onerror = c;
					}
				);
			}
		}

		class FullPlayer {
			constructor() {
				this.Cc = -1;
				this.jn = null;
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
				this.bb = false;
			}

			ua(a) {
				a.l(this.bb ? 1 : 0);
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
				a.aj(null == this.J ? -1 : this.J.sl);
			}

			va(a, b) {
				this.bb = 0 != a.C();
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
				this.ea = 1 == c ? Team.red : 2 == c ? Team.blue : Team.spec;
				a = a.pi();
				this.J = 0 > a ? null : b[a];
			}

			ss() {
				let a = ua.Cc
					,
					b = this.jn;
				this.Cc != a && (null == b && (this.jn = b = new FullPlayer),
					this.Cc = a,
					FullPlayer.ks(b, this));
				return b;
			}

			static ks(a, b) {
				a.bb = b.bb;
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

		class class_na {
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
				return class_na.ag(JSON.parse(a));
			}

			static ag(a) {
				let b = new class_na;
				b.Ic = a.lat;
				b.Kc = a.lon;
				b.sb = a.code.toLowerCase();
				return b;
			}

			static No() {
				return Y.Ck(ConnectionConstants.Me + 'api/geo').then(function (a) {
					return class_na.ag(a);
				});
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
				this.we = 1 == a ? Team.red : 2 == a ? Team.blue : Team.spec;
			}
		}

		class class_Na {
			constructor(a) {
				function b() {
					let t = g[f];
					a.yl = e ? t : 0;
					c.get('spd').textContent = t + 'x';
				}

				this.gg = false;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_Na.O);
				let c = ViewUtil.Da(this.f);
				this.vi = a;
				let d = this;
				c.get('reset').onclick = function () {
					a.wi();
					d.nl();
				};
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
				};
				c.get('spdup').onclick = function () {
					f += 1;
					let t = g.length - 1;
					f > t && (f = t);
					b();
				};
				c.get('spddn').onclick = function () {
					--f;
					0 > f && (f = 0);
					b();
				};
				this.Lr = c.get('time');
				let k = c.get('timebar');
				this.Hq = c.get('progbar');
				let l = c.get('timetooltip')
					,
					n = 0
					,
					r = a.dl;
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
					a.lr((t.pageX - k.offsetLeft) / k.clientWidth * a.nh * a.tf);
					d.gg || (d.gg = true,
						d.bq(),
						d.nl());
				};
				k.onmousemove = function (t) {
					t = (t.pageX - k.offsetLeft) / k.clientWidth;
					l.textContent = class_Na.el(a.tf * a.nh * t);
					return l.style.left = 'calc(' + 100 * t + '% - 30px)';
				};
				this.np = c.get('leave');
				this.np.onclick = function () {
					H.i(d.ie);
				};
			}

			D() {
				this.Lr.textContent = class_Na.el(this.vi.Tb);
				this.Hq.style.width = 100 * this.vi.Oo() + '%';
				!this.gg || 0 < this.vi.Md || (this.gg = false,
					this.aq());
			}

			static el(a) {
				a = a / 1000 | 0;
				return (a / 60 | 0) + ':' + StringOps3.Hf(StringOpsInt.De(a % 60));
			}
		}

		class class_Bb {
			constructor(a) {
				this.Ha = ViewUtil.getFirstElemChildFromHtmlContents(class_Bb.vj, 'tbody');
				var b = ViewUtil.Da(this.Ha);
				let c = b.get('name')
					,
					d = b.get('players')
					,
					e = b.get('distance')
					,
					f = b.get('pass');
				b = b.get('flag');
				this.Os = a;
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

		class class_tb {
			constructor() {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_tb.O);
				let a = ViewUtil.Da(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					class_E.i(b.ob, false);
				};
				a.get('leave').onclick = function () {
					class_E.i(b.ob, true);
				};
			}
		}

		class class_w {
			static Vm(a) {
				if (a == null)
					return null;
				if (a instanceof Array)
					return Array;
				{
					let b = a.g;
					if (b != null)
						return b;
					a = class_w.Cj(a);
					return a != null ? class_w.zn(a) : null;
				}
			}

			static Je(a, b) {
				if (a == null)
					return 'null';
				if (b.length >= 5)
					return '<...>';
				var c = typeof a;
				c == 'function' && (a.b || a.Qf) && (c = 'object');
				switch (c) {
					case 'function':
						return '<function>';
					case 'object':
						if (a.Eb) {
							var d = Cb[a.Eb].Wd[a.lb];
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

			static xn(a, b) {
				if (null == b)
					return false;
				switch (b) {
					case Array:
						return a instanceof Array;
					case Bc:
						return 'boolean' == typeof a;
					case Lc:
						return null != a;
					case D:
						return 'number' == typeof a;
					case Vb:
						return 'number' == typeof a ? (a | 0) === a : false;
					case String:
						return 'string' == typeof a;
					default:
						if (null != a)
							if ('function' == typeof b) {
								if (class_w.wn(a, b))
									return true;
							}
							else {
								if ('object' == typeof b && class_w.yn(b) && a instanceof b)
									return true;
							}
						else
							return false;
						return b == Mc && null != a.b || b == Nc && null != a.Qf ? true : null != a.Eb ? Cb[a.Eb] == b : false;
				}
			}

			static wn(a, b) {
				return a instanceof b ? true : b.Bj ? class_w.Aj(class_w.Vm(a), b) : false;
			}

			static I(a, b) {
				if (null == a || class_w.xn(a, b))
					return a;
				throw GlobalError.B('Cannot cast ' + StringOpsInt.De(a) + ' to ' + StringOpsInt.De(b));
			}

			static Cj(a) {
				a = class_w.An.call(a).slice(8, -1);
				return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a;
			}

			static yn(a) {
				return null != class_w.Cj(a);
			}

			static zn(a) {
				return globalScope[a];
			}
		}

		class Point {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class class_Ta {
			constructor(a, b) {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_Ta.O);
				let c = ViewUtil.Da(this.f);
				this.Ip = c.get('ok');
				let d = this;
				this.Ip.onclick = function () {
					H.i(d.Ua);
				};
				this.Xl = c.get('replay');
				let e = null != b;
				this.Xl.hidden = !e;
				e && (this.Xl.onclick = function () {
						ConnCa.gm(b);
					}
				);
				c.get('reason').textContent = a;
			}
		}

		class Db {
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
				this.oo();
			}

			oo() {
				let a = window.document.createElement('canvas');
				a.width = 160;
				a.height = 34;
				this.El = a.getContext('2d', null);
			}

			Wr() {
				let a = this.El;
				a.resetTransform();
				a.clearRect(0, 0, 160, 34);
				a.font = '26px sans-serif';
				a.fillStyle = 'white';
				160 < a.measureText(this.A).width ? (a.textAlign = 'left',
					a.translate(2, 29)) : (a.textAlign = 'center',
					a.translate(80, 29));
				a.fillText(this.A, 0, 0);
			}

			Ao(a, b, c) {
				a.drawImage(this.El.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17);
			}

			D(a, b) {
				if (null != a.J) {
					let c = ConnectionConstants.o.Gm.H() ? b.ib[a.ea.aa] : a.ea.Fm
						,
						d = null != a.Pd ? a.Pd : a.Zb
						,
						e = ConnectionConstants.o.um.H() && null != d;
					if (!Db.Tn(this.ib, c) || !e && a.Kb != this.th || e && this.Tf != d)
						Db.ko(this.ib, c),
							e ? (this.Tf = d,
								this.th = -1) : (this.Tf = '' + a.Kb,
								this.th = a.Kb),
							this.Oq(this.Tf);
				}
				this.to = 0 < b.M.Pa || !a.Yb ? 'black' : a.Yb && 0 >= a.Xc && 0 <= a.Bc ? 'white' : 'black';
				a.A != this.A && (this.A = a.A,
					this.Wr());
			}

			Oq(a) {
				let b = this.ib.cb;
				if (!(1 > b.length)) {
					this.pb.save();
					this.pb.translate(32, 32);
					this.pb.rotate(3.141592653589793 * this.ib.pd / 128);
					for (var c = -32, d = 64 / b.length, e = 0; e < b.length;)
						this.pb.fillStyle = class_V.oc(b[e++]),
							this.pb.fillRect(c, -32, d + 4, 64),
							c += d;
					this.pb.restore();
					this.pb.fillStyle = class_V.oc(this.ib.ld);
					this.pb.textAlign = 'center';
					this.pb.textBaseline = 'alphabetic';
					this.pb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
					this.pb.fillText(a, 32, 44);
					this.Pj = this.pb.createPattern(this.pb.canvas, 'no-repeat');
				}
			}

			static Tn(a, b) {
				if (a.pd != b.pd || a.ld != b.ld)
					return false;
				a = a.cb;
				b = b.cb;
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

			static ko(a, b) {
				a.pd = b.pd;
				a.ld = b.ld;
				a.cb = b.cb.slice(0);
			}
		}

		class class_m {
			constructor() {
				class_m.wb || this.Xa();
			}

			Xa() {
				this.Dc = 0;
			}

			hn() {
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
				a.vn = class_m.Ff;
				if (null == a.ya)
					throw GlobalError.B('Class doesn\'t have a config');
				a.prototype.Gf = a.ya;
				class_m.Ym.set(class_m.Ff, a);
				class_m.Ff++;
			}

			static oj(a, b) {
				let c = class_w.Vm(a).vn;
				if (null == c)
					throw GlobalError.B('Tried to pack unregistered action');
				b.l(c);
				a.ua(b);
			}

			static lh(a) {
				var b = a.C();
				b = Object.create(class_m.Ym.get(b).prototype);
				b.Dc = 0;
				b.kb = 0;
				b.va(a);
				return b;
			}
		}

		class class_xb {
			constructor(a, b) {
				this.Vj = a;
				this.Vi = b;
				this.rc = a;
				this.cf = window.performance.now();
			}

			Lm() {
				var a;
				null == a && (a = 1);
				this.D();
				return a <= this.rc ? (this.rc -= a,
					true) : false;
			}

			Jr() {
				this.D();
				let a = 1 - this.rc;
				if (0 >= a)
					return 0;
				let b = window.performance.now();
				return this.cf + a * this.Vi - b;
			}

			io(a) {
				let b = this.Jr();
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

		class class_zb {
			constructor(a) {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_zb.O);
				let b = ViewUtil.Da(this.f);
				this.gf = b.get('title');
				this.ri = b.get('reason');
				this.Gn = b.get('ban-btn');
				this.In = b.get('ban-text');
				this.Ye = b.get('kick');
				this.ud = b.get('close');
				let c = this;
				this.Gn.onclick = function () {
					c.Hj(!c.Qj);
				};
				this.ud.onclick = function () {
					H.i(c.ob);
				};
				this.Ye.onclick = function () {
					rc.i(c.fi, c.Qb, c.ri.value, c.Qj);
				};
				this.ri.onkeydown = function (d) {
					return d.stopPropagation();
				};
				this.ri.maxLength = 100;
				this.Qb = a.W;
				this.gf.textContent = 'Kick ' + a.A;
				this.Hj(false);
			}

			Hj(a) {
				this.Qj = a;
				this.In.textContent = a ? 'Yes' : 'No';
			}
		}

		class Wb {
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
				a.Rm(this.A);
				a.Rm(this.sb);
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
				this.A = a.Ol();
				this.sb = a.Ol();
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

		class StringOpsLimit {
			static Vc(a, b) {
				return a.length <= b ? a : P.substr(a, 0, b);
			}

			static js(a) {
				let b = ''
					,
					c = 0
					,
					d = a.byteLength;
				for (; c < d;)
					b += StringOps3.ah(a[c++], 2);
				return b;
			}
		}

		class Dc {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class Eb {
			constructor(a, b, c, d) {
				this.sh = new Set;
				this.Sf = new Set;
				this.Hg = this.uf = this.mm = false;
				this.Qc = null;
				this.xf = this.aa = '';
				this.gr = 50000;
				this.fr = 10000;
				this.vd = new Map;
				this.Er = a;
				this.fg = b;
				this.Qn = c;
				this.xf = d;
				null == this.xf && (this.xf = '');
				this.Mi();
			}

			ja() {
				window.clearTimeout(this.cm);
				window.clearTimeout(this.re);
				this.re = null;
				window.clearInterval(this.xl);
				this.Y.onmessage = null;
				this.Y.onerror = null;
				this.Y.onclose = null;
				this.Y.onopen = null;
				this.Y.close();
				this.Y = null;
				this.zk();
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
						}, 10000));
				}
			}

			Hi(a) {
				function b() {
					null != c.Y && 1 == c.Y.readyState && c.uf != c.mm && c.lm();
					c.$l = null;
				}

				this.uf = a;
				let c = this;
				null == this.$l && (b(),
					this.$l = window.setTimeout(b, 1000));
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
						d.$o();
					};
					d.Y.onclose = function (g) {
						d.Mh(4001 != g.code);
					};
					d.Y.onerror = function () {
						d.Mh(true);
					};
					d.Y.onmessage = createHandlerFromInstance(d, d.Ph);
				}

				null == a && (a = '');
				let d = this;
				Y.Il(this.Er, 'token=' + this.xf + '&rcr=' + a, Y.zj).then(function (e) {
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

			$o() {
				null != this.Qc && this.Di();
				0 != this.uf && this.lm();
				let a = this;
				this.xl = window.setInterval(function () {
					a.Ci();
				}, 40000);
			}

			Ph(a) {
				a = new J(new DataView(a.data), false);
				switch (a.C()) {
					case 1:
						this.Oh(a);
						break;
					case 4:
						this.Nh(a);
						break;
					case 5:
						this.Vo(a);
						break;
					case 6:
						this.Yo(a);
				}
			}

			Oh(a) {
				let b = a.fb(),
					c = StringOpsLimit.js(a.qb(a.C())),
					d,
					e,
					f;
				try {
					a = new J(new DataView(pako.inflateRaw(a.qb()).buffer), false);
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
				this.Zo(b, c, e, f, a, d);
			}

			Zo(a, b, c, d, e, f) {
				if (16 <= this.vd.size)
					this.zf(a, 4104);
				else if (this.sh.has(b))
					this.zf(a, 4102);
				else {
					for (var g = [], h = 0; h < d.length;) {
						let n = Eb.Ek(d[h++]);
						if (null != n) {
							if (this.Sf.has(n)) {
								this.zf(a, 4102);
								return;
							}
							g.push(n);
						}
					}
					if (null != this.dk && (h = new J(e.s),
						h.a = e.a,
						e = this.dk(b, h),
					1 == e.lb)) {
						this.zf(a, e.reason);
						return;
					}
					var k = new Sa(a, this.fg, this.Qn);
					f && (k.jk = 2500);
					k.ve = g;
					k.od = b;
					this.vd.set(a, k);
					var l = this;
					k.gd = function () {
						l.Rc(0, k, null);
						l.vd.delete(k.aa);
					};
					k.Gd = function () {
						l.vd.delete(k.aa);
						l.Rc(0, k, null);
						null != l.kl && l.kl(new Ob(k));
					};
					k.ei = function (n) {
						l.Ei(k, n, k.eg, null);
						k.Sh.then(function () {
							l.Rc(0, k, null);
						});
						k.sg = function (r) {
							l.Bi(k, r);
						};
					};
					k.Pi();
					k.lo(new RTCSessionDescription({
						sdp: c,
						type: 'offer'
					}), d);
				}
			}

			Nh(a) {
				let b = a.fb(),
					c;
				try {
					a = new J(new DataView(pako.inflateRaw(a.qb()).buffer), false),
						c = new RTCIceCandidate(a.Eg());
				}
				catch (d) {
					return;
				}
				this.Uo(b, c);
			}

			Uo(a, b) {
				a = this.vd.get(a);
				if (null != a) {
					let c = Eb.Ek(b);
					if (null != c && (a.ve.push(c),
						this.Sf.has(c)))
						return;
					a.Fj(b);
				}
			}

			Vo(a) {
				this.aa = a.oe(a.C());
				null != this.tg && this.tg(this.aa);
			}

			Yo(a) {
				this.xf = a.oe(a.s.byteLength - a.a);
			}

			Rc(a, b, c) {
				if (!b.ql) {
					0 == a && (b.ql = true);
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

			lm() {
				let a = StreamWriter.ia(2, false);
				a.l(9);
				a.l(this.uf ? 1 : 0);
				this.Y.send(a.Nd());
				this.mm = this.uf;
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

			zk() {
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
				this.zk();
				window.clearTimeout(this.re);
				this.re = null;
				this.Hg = false;
				window.clearInterval(this.xl);
				window.clearTimeout(this.cm);
				let b = this;
				a && (this.cm = window.setTimeout(function () {
					b.Mi();
				}, this.fr + Math.random() * this.gr | 0));
			}

			Hn(a) {
				let b = 0
					,
					c = a.ve;
				for (; b < c.length;)
					this.Sf.add(c[b++]);
				null != a.od && this.sh.add(a.od);
				return {
					Zs: a.ve,
					Xs: a.od
				};
			}

			Zd() {
				this.Sf.clear();
				this.sh.clear();
			}

			static Ek(a) {
				try {
					let b = Jc.qf(a.candidate);
					if ('srflx' == b.Rr)
						return b.fp;
				}
				catch (b) {
				}
				return null;
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
					e.sl = d;
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
						0 != (f.h & c.w) && 0 != (f.w & c.h) && c.Xn(f);
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
									0 > g && (g *= c.m * f.m + 1,
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
							0 != (f.h & c.w) && 0 != (f.w & c.h) && c.Yn(f);
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
								0 > k && (k *= c.m * f.m + 1,
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
				let a = ua.Cc
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

		class class_V {
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
				this.Mk = false;
				this.Ad = new BigTextUtil;
				this.sa = window.document.createElement('canvas');
				this.sa.mozOpaque = true;
				this.c = this.sa.getContext('2d', {
					alpha: false
				});
				this.To = this.c.createPattern(ConnectionConstants.So, null);
				this.eo = this.c.createPattern(ConnectionConstants.co, null);
				this.bo = this.c.createPattern(ConnectionConstants.ao, null);
			}

			Xo(a, b) {
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

			Xr() {
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
				let d = (c - this.ed) / 1000;
				this.ed = c;
				this.Pg.clear();
				this.Xr();
				class_V.Ji(this.c, true);
				this.c.resetTransform();
				if (null != a.M) {
					c = a.M;
					var e = c.ta;
					var f = a.getFullPlayerById(b);
					var g = null != f ? f.J : null;
					var h = 0 != this.ne ? this.sa.height / this.ne : this.mi * window.devicePixelRatio * this.qe;
					b = this.Wi * this.qe;
					var k = this.Uj * this.qe
						,
						l = c.T.ff
						,
						n = this.sa.width / h;
					0 < l && n > l && (n = l,
						h = this.sa.width / l);
					l = (this.sa.height - b - k) / h;
					this.Ur(c, g, n, l, d);
					for (var r = 0, t = a.K; r < t.length;) {
						let z = t[r];
						++r;
						if (null == z.J)
							continue;
						let K = this.jd.get(z.W);
						null == K && (K = new Db,
							this.jd.set(z.W, K));
						K.D(z, a);
						this.Pg.set(z.J, K);
					}
					this.c.translate(this.sa.width / 2, (this.sa.height + b - k) / 2);
					this.c.scale(h, h);
					this.c.translate(-this.Wa.x, -this.Wa.y);
					this.c.lineWidth = 3;
					this.Zq(c.T);
					this.Yq(c.T);
					h = e.G;
					r = 0;
					for (t = e.nb; r < t.length;)
						this.Tq(t[r++], h);
					this.Sq(a, n, l);
					this.Uq(a, f);
					null != g && this.Wq(g.a);
					this.c.lineWidth = 2;
					f = 0;
					for (g = a.K; f < g.length;)
						l = g[f],
							++f,
							n = l.J,
						null != n && (l = this.jd.get(l.W),
							this.Vl(n, l));
					f = 0;
					for (e = e.G; f < e.length;)
						g = e[f],
							++f,
						null == this.Pg.get(g) && this.Vl(g, null);
					this.c.lineWidth = 3;
					this.c.resetTransform();
					this.c.translate(this.sa.width / 2, b + (this.sa.height - b - k) / 2);
					this.Vq(c);
					0 >= c.Pa && (this.Ad.D(d),
						this.Ad.Oc(this.c));
					this.Pg.clear();
					this.Rq(a);
				}
			}

			Rq(a) {
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

			Ur(a, b, c, d, e) {
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
				this.fo(c, d, a.T);
			}

			fo(a, b, c) {
				a > 2 * c.bc ? this.Wa.x = 0 : this.Wa.x + .5 * a > c.bc ? this.Wa.x = c.bc - .5 * a : this.Wa.x - .5 * a < -c.bc && (this.Wa.x = -c.bc + .5 * a);
				b > 2 * c.tc ? this.Wa.y = 0 : this.Wa.y + .5 * b > c.tc ? this.Wa.y = c.tc - .5 * b : this.Wa.y - .5 * b < -c.tc && (this.Wa.y = -c.tc + .5 * b);
			}

			Wq(a) {
				this.c.beginPath();
				this.c.strokeStyle = 'white';
				this.c.globalAlpha = .3;
				this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, false);
				this.c.stroke();
				this.c.globalAlpha = 1;
			}

			Vq(a) {
				let b = 0 < a.Pa;
				this.tr(b);
				b && (120 != a.Pa && (a = a.Pa / 120 * 200,
					this.c.fillStyle = 'white',
					this.c.fillRect(.5 * -a, 100, a, 20)),
					this.Ad.lq.$q(this.c));
			}

			tr(a) {
				this.Mk != a && (this.sa.style.filter = a ? 'grayscale(70%)' : '',
					this.Mk = a);
			}

			em(a, b, c, d, e, f) {
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

			Zq(a) {
				class_V.Ji(this.c, false);
				var b = a.Yd;
				let c = a.Xd
					,
					d = this;
				if (1 == a.sd)
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_V.oc(a.qd),
						this.c.fillRect(0, 0, this.sa.width, this.sa.height),
						this.c.restore(),
						this.c.strokeStyle = '#C7E6BD',
						this.c.fillStyle = this.To,
						this.em(this.c, -b, -c, 2 * b, 2 * c, a.Zc),
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
					this.c.rect(this.Wa.x - 10000, this.Wa.y - 10000, 20000, 20000);
					this.c.scale(2, 2);
					this.c.fillStyle = this.bo;
					this.c.fill();
					this.c.restore();
					this.c.save();
					this.em(this.c, -b, -c, 2 * b, 2 * c, a.Zc);
					this.c.scale(2, 2);
					this.c.fillStyle = this.eo;
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
					};
					e('#85ACF3', b, false);
					e('#E18977', -b, true);
				}
				else
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = class_V.oc(a.qd),
						this.c.fillRect(0, 0, this.sa.width, this.sa.height),
						this.c.restore();
				class_V.Ji(this.c, true);
			}

			Uq(a, b) {
				let c = ConnectionConstants.o.Jk.H()
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
					c && g.hg && this.c.drawImage(ConnectionConstants.Mm, e.x - .5 * ConnectionConstants.Mm.width, e.y - 35);
					f != b && g.Ao(this.c, e.x, e.y + 50);
				}
			}

			Vl(a, b) {
				this.c.beginPath();
				null == b ? (this.c.fillStyle = class_V.oc(a.S),
					this.c.strokeStyle = 'black') : (this.c.fillStyle = b.Pj,
					this.c.strokeStyle = b.to);
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

			Yq(a) {
				if (null != a) {
					var b = 0;
					for (a = a.V; b < a.length;)
						this.Xq(a[b++]);
				}
			}

			Tq(a, b) {
				if (!(0 > a.S)) {
					this.c.beginPath();
					this.c.strokeStyle = class_V.oc(a.S);
					var c = b[a.ce];
					a = b[a.de];
					null != c && null != a && (c = c.a,
						a = a.a,
						this.c.moveTo(c.x, c.y),
						this.c.lineTo(a.x, a.y),
						this.c.stroke());
				}
			}

			Xq(a) {
				if (a.Ya) {
					this.c.beginPath();
					this.c.strokeStyle = class_V.oc(a.S);
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

			Sq(a, b, c) {
				var d = a.M;
				if (null != d)
					for (d = d.ta.G[0],
						     this.xk(d.a, d.S, b, c),
						     d = 0,
						     a = a.K; d < a.length;) {
						let e = a[d];
						++d;
						null != e.J && this.xk(e.J.a, e.ea.S, b, c);
					}
			}

			xk(a, b, c, d) {
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
					this.yk(d + 2, c + 2, Math.atan2(a, e)),
					this.c.fillStyle = class_V.oc(b),
					this.yk(d - 2, c - 2, Math.atan2(a, e)));
			}

			yk(a, b, c) {
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

			dr() {
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

		class CommandUtil {
			constructor(a, b) {
				this.xa = a;
				this.ca = b;
			}

			qf(cmdArray) {
				if ('/' != cmdArray.charAt(0))
					return false;
				if (1 == cmdArray.length)
					return true;
				cmdArray = StringOps3.Ps(P.substr(cmdArray, 1, null)).split(' ');
				let b = cmdArray[0]
					,
					c = this;
				switch (b) {
					case 'avatar':
						2 == cmdArray.length && (this.om(cmdArray[1]),
							this.ca('Avatar set'));
						break;
					case 'checksum':
						var d = this.xa.U.T;
						cmdArray = d.A;
						d.Xe() ? this.ca('Current stadium is original: "' + cmdArray + '"') : (d = StringOps3.ah(d.ak(), 8),
							this.ca('Stadium: "' + cmdArray + '" (checksum: ' + d + ')'));
						break;
					case 'clear_avatar':
						this.om(null);
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
							d = CommandUtil.kq(cmdArray),
								this.xa.ra(d);
						}
						catch (g) {
							cmdArray = GlobalError.Jb(g).Db(),
							'string' == typeof cmdArray && this.ca(cmdArray);
						}
						break;
					case 'extrapolation':
						if (cmdArray.length == 2) {
							cmdArray = StringOpsInt.parseInt(cmdArray[1]);
							if (cmdArray != null && cmdArray >= Constants.minE && cmdArray <= Constants.maxE) {
								ConnectionConstants.o.yd.Ma(cmdArray);
								this.xa.pm(cmdArray);
								this.ca('Extrapolation set to ' + cmdArray + ' msec');
							}
							else {
								this.ca('Extrapolation must be a value between ' + Constants.minE + ' and ' + Constants.maxE + ' milliseconds');
							}
						}
						else
							this.ca('Extrapolation requires a value in milliseconds.');
						break;
					case 'handicap':
						if (cmdArray.length == 2) {
							cmdArray = StringOpsInt.parseInt(cmdArray[1]);
							if (null != cmdArray && cmdArray >= Constants.minH && cmdArray <= Constants.maxH) {
								this.xa.sr(cmdArray);
								this.ca('Ping handicap set to ' + cmdArray + ' msec');
							}
							else {
								this.ca('Ping handicap must be a value between ' + Constants.minH + ' and ' + Constants.maxH + ' milliseconds');
							}
						}
						else {
							this.ca('Ping handicap requires a value in milliseconds.');
						}
						break;
					case 'kick_ratelimit':
						if (cmdArray.length < 4)
							this.ca('Usage: /kick_ratelimit <min> <rate> <burst>');
						else {
							d = StringOpsInt.parseInt(cmdArray[1]);
							var e = StringOpsInt.parseInt(cmdArray[2]);
							cmdArray = StringOpsInt.parseInt(cmdArray[3]);
							null == d || null == e || null == cmdArray ? this.ca('Invalid arguments') : this.xa.ra(class_Oa.ma(d, e, cmdArray));
						}
						break;
					case 'recaptcha':
						if (null == this.sm)
							this.ca('Only the host can set recaptcha mode');
						else
							try {
								if (cmdArray.length == 2) {
									switch (cmdArray[1]) {
										case 'off':
											e = false;
											break;
										case 'on':
											e = true;
											break;
										default:
											throw GlobalError.B(null);
									}
									this.sm(e);
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
						2 == cmdArray.length && (null == this.Mg ? this.ca('Only the host can change the password') : (this.Mg(cmdArray[1]),
							this.ca('Password set')));
						break;
					case 'store':
						let f = this.xa.U.T;
						f.Xe() ? this.ca('Can\'t store default stadium.') : kb.Ns().then(function () {
							return kb.add(f);
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

			om(text) {
				text != null && (text = StringOpsLimit.Vc(text, 2));
				ConnectionConstants.o.rh.Ma(text);
				this.xa.ra(Pa.ma(text));
			}

			static kq(a) {
				if (3 > a.length)
					throw GlobalError.B('Not enough arguments');
				if (7 < a.length)
					throw GlobalError.B('Too many arguments');
				let b = new bb
					,
					c = new TeamColors;
				b.Yg = c;
				switch (a[1]) {
					case 'blue':
						c.cb = [Team.blue.S];
						b.ea = Team.blue;
						break;
					case 'red':
						c.cb = [Team.red.S];
						b.ea = Team.red;
						break;
					default:
						throw GlobalError.B('First argument must be either "red" or "blue"');
				}
				if ('clear' == a[2])
					return b;
				c.pd = 256 * StringOpsInt.parseInt(a[2]) / 360 | 0;
				c.ld = StringOpsInt.parseInt('0x' + a[3]);
				if (4 < a.length) {
					c.cb = [];
					let d = 4
						,
						e = a.length;
					for (; d < e;)
						c.cb.push(StringOpsInt.parseInt('0x' + a[d++]));
				}
				return b;
			}
		}

		class Ec {
			constructor(a) {
				this.current = 0;
				this.gs = a;
			}

			next() {
				return this.gs[this.current++];
			}
		}

		class class_pc {
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
					c.j.Cf.qm(c.zd);
					c.zd = 0;
				}, 1000);
				this.Bf(ConnectionConstants.o.Ib.H());
				this.j.f.classList.add('replayer');
				this.pe = new class_Na(a);
				this.pe.bq = function () {
					b.resetRoomEventHandlers(a.U);
				};
				this.pe.aq = function () {
					c.j.te(null == a.U.M);
					b.ti(a.U);
				};
				this.pe.nl = function () {
					c.j.Ob.cc.dr();
				};
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
				1 == ConnectionConstants.o.Gh.H() && 28.333333333333336 > a - this.ed || (this.ed = a,
					this.zd++,
					this.Bf(ConnectionConstants.o.Ib.H()),
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
						ConnectionConstants.o.Ib.Ma(1);
						break;
					case 50: // 2
						ConnectionConstants.o.Ib.Ma(2);
						break;
					case 51: // 3
						ConnectionConstants.o.Ib.Ma(3);
						break;
					case 52: // 4
						ConnectionConstants.o.Ib.Ma(4);
						break;
					case 53: // 5
						ConnectionConstants.o.Ib.Ma(5);
						break;
					case 54: // 6
						ConnectionConstants.o.Ib.Ma(6);
						break;
					case 55: // 7
						ConnectionConstants.o.Ib.Ma(7);
						break;
					case 56: // 8
						ConnectionConstants.o.Ib.Ma(15);
						break;
					case 57: // 9
						ConnectionConstants.o.Ib.Ma(-1.5);
						break;
					case 48: // 0
						ConnectionConstants.o.Ib.Ma(-0.5);
						break;
				}
			}

			Bf() {
				let a = ConnectionConstants.o.Ib.H();
				let b = this.j.Ob.cc;
				b.qe = ConnectionConstants.o.yi.H();
				b.Wi = 35;
				/*
				if (a <= 0) {
					b.ne = 610;
				}
				else {
					b.ne = 0;
					b.mi = 1 + .25 * (a - 1);
				}
				*/
				b.ne = 0;
				b.mi = 1 + .25 * (a - 1);
			}

			Jd() {
			}
		}

		class Gc {
			static description(code) {
				switch (code) {
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
						return 'Connection closed (' + code + ')';
				}
			}
		}

		class wc {
			constructor() {
				this.Ca = 0;
				this.rk = this.sk = false;
				this.Se = 0;
				this.f = window.document.createElement('div');
				this.f.className = 'game-timer-view';
				this.f.appendChild(this.jq = this.ae('OVERTIME!', 'overtime'));
				this.f.appendChild(this.Gp = this.ae('0', 'digit'));
				this.f.appendChild(this.Fp = this.ae('0', 'digit'));
				this.f.appendChild(this.ae(':', null));
				this.f.appendChild(this.kr = this.ae('0', 'digit'));
				this.f.appendChild(this.jr = this.ae('0', 'digit'));
			}

			ae(a, b) {
				let c = window.document.createElement('span');
				c.textContent = a;
				c.className = b;
				return c;
			}

			zr(a) {
				if (a != this.Se) {
					let b = a % 60;
					let c = a / 60 | 0;
					this.jr.textContent = '' + b % 10;
					this.kr.textContent = '' + (b / 10 | 0) % 10;
					this.Fp.textContent = '' + c % 10;
					this.Gp.textContent = '' + (c / 10 | 0) % 10;
					this.Se = a;
				}
				this.Tl();
				this.Ul();
			}

			Ar(a) {
				this.Ca = a;
				this.Tl();
				this.Ul();
			}

			Tl() {
				this.wr(0 != this.Ca && this.Se > this.Ca);
			}

			Ul() {
				this.Br(this.Se < this.Ca && this.Se > this.Ca - 30);
			}

			wr(a) {
				a != this.rk && (this.jq.className = a ? 'overtime on' : 'overtime',
					this.rk = a);
			}

			Br(a) {
				a != this.sk && (this.f.className = a ? 'game-timer-view time-warn' : 'game-timer-view',
					this.sk = a);
			}
		}

		class class_qb {
			constructor(a) {
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_qb.O);
				ViewUtil.Da(this.f).get('features').textContent = a.join(', ');
			}
		}

		class aa {
			constructor(a) {
				let b = new class_ba('Only humans', '', []);
				this.f = b.f;
				b.$d.style.minHeight = '78px';
				let c = this;
				ib.op().then(function (d) {
					null == aa.Fg && (aa.Fg = window.document.createElement('div'),
						b.$d.appendChild(aa.Fg),
						aa.Kq = d.render(aa.Fg, {
							sitekey: a,
							callback: function (e) {
								class_E.i(aa.Ql, e);
							},
							theme: 'dark'
						}));
					d.reset(aa.Kq);
					aa.Ql = function (e) {
						window.setTimeout(function () {
							class_E.i(c.Ua, e);
						}, 1000);
						aa.Ql = null;
					};
					b.$d.appendChild(aa.Fg);
				});
			}
		}

		class class_Hc {
			static jj() {
				class_m.Ga(class_Fb);
				class_m.Ga(Ma);
				class_m.Ga(class_cb);
				class_m.Ga(Ga);
				class_m.Ga(Za);
				class_m.Ga(Ea);
				class_m.Ga(ma);
				class_m.Ga(class_Wa);
				class_m.Ga(class_Xa);
				class_m.Ga($a);
				class_m.Ga(za);
				class_m.Ga(Ja);
				class_m.Ga(fa);
				class_m.Ga(class_Ka);
				class_m.Ga(La);
				class_m.Ga(Ya);
				class_m.Ga(Ia);
				class_m.Ga(class_Da);
				class_m.Ga(Pa);
				class_m.Ga(bb);
				class_m.Ga(Gb);
				class_m.Ga(class_Oa);
				class_m.Ga(Hb);
				class_m.Ga(class_Ib);
			}
		}

		class gc {
			static i(a, b, c, d, e) {
				null != a && a(b, c, d, e);
			}
		}

		class class_ob {
			constructor() {
				this.yf = null;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_ob.O);
				var a = ViewUtil.Da(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					H.i(b.class_ob);
				};
				this.vh = a.get('change');
				this.vh.disabled = true;
				this.vh.onclick = function () {
					null != b.yf && b.hm(b.yf.index);
				};
				a = a.get('list');
				this.li(a);
				let c = class_wb.Zh(a);
				window.setTimeout(function () {
					c.update();
				}, 0);
			}

			li(a) {
				let b = this
					,
					c = 0
					,
					d = Ha.$a.length >> 2;
				for (; c < d;) {
					var e = c++;
					let f = e
						,
						g = Ha.$a[e << 2];
					e = Ha.$a[(e << 2) + 1].toLowerCase();
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
					};
					h.ondblclick = function () {
						b.hm(f);
					};
				}
			}

			hm(a) {
				let b = new class_na;
				b.sb = Ha.$a[(a << 2) + 1].toLowerCase();
				b.Ic = Ha.$a[(a << 2) + 2];
				b.Kc = Ha.$a[(a << 2) + 3];
				ConnectionConstants.o.Ve.Ma(b);
				H.i(this.class_ob);
			}
		}

		class BigAnimatedText {
			constructor(a, b) {
				let c = []
					,
					d = 0;
				for (; d < a.length;)
					c.push(this.Ap(a[d++], b));
				this.df = c;
			}

			Ho() {
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
					let h = BigAnimatedText.qn.eval(f)
						,
						k = 35 * -(this.df.length - 1) + 70 * c;
					f = 180 * BigAnimatedText.rn.eval(f);
					a.globalAlpha = h;
					a.drawImage(g, f * (0 != (c & 1) ? -1 : 1) - .5 * g.width, k - .5 * g.height);
					a.globalAlpha = 1;
					++c;
				}
				a.imageSmoothingEnabled = false;
			}

			$q(a) {
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

			Ap(a, b) {
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

		class ua {
		}

		class H {
			static i(a) {
				null != a && a();
			}
		}

		class WMajor {
			constructor(a) {
				if (!WMajor.wb)
					this.Xa(a);
			}

			Xa(a) {
				// Frame no
				this.Z = 0;
				this.U = a;
			}
		}

		class Ub {
			constructor(a) {
				this.Ep = a;
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
					L = Jb.Mo(y);
					let ea = 0;
					for (; ea < L.length;) {
						let U = L[ea];
						++ea;
						let xc = window.document.createElement('div');
						var S = U;
						U.startsWith('Key') && (S = P.substr(U, 3, null));
						xc.textContent = S;
						F.appendChild(xc);
						S = window.document.createElement('i');
						S.className = 'icon-cancel';
						S.onclick = function () {
							Jb.Qq(U);
							ConnectionConstants.o.Cg.Ma(Jb);
							xc.remove();
						};
						xc.appendChild(S);
					}
					L = window.document.createElement('i');
					L.className = 'icon-plus';
					F.appendChild(L);
					L.onclick = function () {
						yc.classList.toggle('show', true);
						yc.focus();
						yc.onkeydown = function (U) {
							yc.classList.toggle('show', false);
							U.stopPropagation();
							U = U.code;
							null == Jb.H(U) && (Jb.Qa(U, y),
								ConnectionConstants.o.Cg.Ma(Jb),
								Fc());
						};
					};
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
							F.classList.add('f-' + L.sb);
						}
						catch (ea) {
						}
						y.textContent = L.sb.toUpperCase();
					}
				}

				function d() {
					let y = ConnectionConstants.o.wh.H();
					K.textContent = '' + y;
					N.value = '' + y;
				}

				function e() {
					let y = ConnectionConstants.o.xh.H();
					t.textContent = '' + y;
					z.value = '' + y;
				}

				function f(y, F, L, ea) {
					let S = l.get(y);
					y = F.H();
					S.selectedIndex = ea(y);
					S.onchange = function () {
						F.Ma(L(S.selectedIndex));
					};
				}

				function g(y, F, L) {
					function ea(U) {
						S.classList.toggle('icon-ok', U);
						S.classList.toggle('icon-cancel', !U);
					}

					y = l.get(y);
					y.classList.add('toggle');
					let S = window.document.createElement('i');
					S.classList.add('icon-ok');
					y.insertBefore(S, y.firstChild);
					y.onclick = function () {
						let U = !F.H();
						F.Ma(U);
						ea(U);
						null != L && L(U);
					};
					ea(F.H());
				}

				function h(y) {
					let F = {
						Sm: l.get(y + 'btn'),
						ih: l.get(y + 'sec')
					};
					n.push(F);
					F.Sm.onclick = function () {
						k(F);
					};
				}

				function k(y) {
					let F = 0;
					let L = 0;
					for (; L < n.length;) {
						let ea = n[L];
						++L;
						let S = ea == y;
						S && (class_la.im = F);
						ea.ih.classList.toggle('selected', S);
						ea.Sm.classList.toggle('selected', S);
						++F;
					}
				}

				null == a && (a = false);
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_la.O);
				let l = ViewUtil.Da(this.f);
				this.ud = l.get('close');
				let n = [];
				h('sound');
				h('video');
				h('misc');
				h('input');
				k(n[class_la.im]);
				g('tsound-main', ConnectionConstants.o.ym, function (y) {
					ConnectionConstants.Na.rm(y ? 1 : 0);
				});
				g('tsound-chat', ConnectionConstants.o.Ki);
				g('tsound-highlight', ConnectionConstants.o.xm);
				g('tsound-crowd', ConnectionConstants.o.wm);
				f('viewmode', ConnectionConstants.o.Ib, function (y) {
					return 0 == y ? -1 : y;
				}, function (y) {
					return 0 >= y ? 0 : y;
				});
				f('fps', ConnectionConstants.o.Gh, function (y) {
					return y;
				}, function (y) {
					return y;
				});
				let r = [1, .75, .5, .25];
				f('resscale', ConnectionConstants.o.yi, function (y) {
					return r[y];
				}, function (y) {
					let F = 0
						,
						L = r.length - 1;
					for (; F < L && !(r[F] <= y);)
						++F;
					return F;
				});
				g('tvideo-teamcol', ConnectionConstants.o.Gm);
				g('tvideo-showindicators', ConnectionConstants.o.Jk);
				g('tvideo-showavatars', ConnectionConstants.o.um);
				let t = l.get('chatopacity-value')
					,
					z = l.get('chatopacity-range');
				e();
				z.oninput = function () {
					ConnectionConstants.o.xh.Ma(parseFloat(z.value));
					e();
				};
				let K = l.get('chatfocusheight-value')
					,
					N = l.get('chatfocusheight-range');
				d();
				N.oninput = function () {
					ConnectionConstants.o.wh.Ma(StringOpsInt.parseInt(N.value));
					d();
				};
				let Kb = null
					,
					Kc = this;
				Kb = function () {
					let y = ConnectionConstants.o.Ve.H();
					c('loc', 'Detected location', ConnectionConstants.o.Ue.H());
					c('loc-ovr', 'Location override', y);
					let F = l.get('loc-ovr-btn');
					F.disabled = !a;
					null == y ? (F.textContent = 'Override location',
							F.onclick = function () {
								H.i(Kc.Lp);
							}
					) : (F.textContent = 'Remove override',
							F.onclick = function () {
								ConnectionConstants.o.Ve.Ma(null);
								Kb();
							}
					);
				};
				Kb();
				let Jb = ConnectionConstants.o.Cg.H()
					,
					yc = l.get('presskey')
					,
					Fc = null
					,
					Lb = l.get('inputsec');
				Fc = function () {
					ViewUtil.Jf(Lb);
					Lb.appendChild(b('Up'));
					Lb.appendChild(b('Down'));
					Lb.appendChild(b('Left'));
					Lb.appendChild(b('Right'));
					Lb.appendChild(b('Kick'));
				};
				Fc();
				this.ud.onclick = function () {
					H.i(Kc.ob);
				};
			}
		}

		class Qa {
		}

		class mc {
			constructor(a, b) {
				this.r = new RegExp(a, b.split('u').join(''));
			}

			match(a) {
				this.r.global && (this.r.lastIndex = 0);
				this.r.qc = this.r.exec(a);
				this.r.ih = a;
				return null != this.r.qc;
			}

			dn(a) {
				if (null != this.r.qc && 0 <= a && a < this.r.qc.length)
					return this.r.qc[a];
				throw GlobalError.B('EReg::matched');
			}

			zs() {
				if (null == this.r.qc)
					throw GlobalError.B('No string matched');
				return {
					pj: this.r.qc.index,
					ws: this.r.qc[0].length
				};
			}

			ys(a, b) {
				var c;
				null == c && (c = -1);
				if (this.r.global) {
					this.r.lastIndex = b;
					this.r.qc = this.r.exec(0 > c ? a : P.substr(a, 0, b + c));
					if (b = null != this.r.qc)
						this.r.ih = a;
					return b;
				}
				if (c = this.match(0 > c ? P.substr(a, b, null) : P.substr(a, b, c)))
					this.r.ih = a,
						this.r.qc.index += b;
				return c;
			}
		}

		class class_Cc {
			static Xm() {
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

		class J {
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

			Ml(a) {
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
					c = J.ro(this.s, b),
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

			Ol() {
				return this.oe(this.C());
			}

			Eg() {
				let a = this.lc();
				return JSON.parse(a);
			}

			static ro(a, b) {
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

		class Room {
			constructor() {
				this.kc = -1;
				// Room instance
				this.jc = null;
				// Stadium
				this.T = null;
				this.Fd = 2;
				this.dd = 0;
				this.he = 1;
				// Time limit
				this.Ca = 3;
				// Score limit
				this.gb = 3;
				this.Tc = false;
				// Game instance
				this.M = null;
				// Full players list
				this.K = [];
				// Room name
				this.mc = '';
				this.T = Stadium.Kh()[0];
				// Team colors list
				this.ib = [null, new TeamColors, new TeamColors];
				this.ib[1].cb.push(Team.red.S);
				this.ib[2].cb.push(Team.blue.S);
			}

			Fr(a) {
				if (this.M == null) {
					this.M = new Game;
					for (var b = 0, c = this.K; b < c.length;) {
						let d = c[b];
						++b;
						d.J = null;
						d.Kb = 0;
					}
					this.M.ep(this);
					this.onGameStartFun != null && this.onGameStartFun(a);
				}
			}

			Wf(a, b, c) {
				if (b.ea != c) {
					b.ea = c;
					P.remove(this.K, b);
					this.K.push(b);
					if (null != this.M) {
						null != b.J && (P.remove(this.M.ta.G, b.J),
							b.J = null);
						this.M.Lk(b);
						let d = 0;
						let e = false;
						for (; !e;) {
							++d;
							e = true;
							let f = 0;
							let g = this.K;
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
					rc.i(this.onPlayerTeamChangeFun, a, b, c);
				}
			}

			/**
			 * @param {number} id
			 * @return {FullPlayer}
			 */
			getFullPlayerById(id) {
				let b = 0;
				let c = this.K;
				for (; b < c.length;) {
					let d = c[b];
					++b;
					if (d.W == id)
						return d;
				}
				return null;
			}

			D(a) {
				this.M != null && this.M.D(a);
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
				let b = 0;
				let c = this.K;
				for (; b < c.length;)
					c[b++].ua(a);
				this.ib[1].fa(a);
				this.ib[2].fa(a);
			}

			ka(a) {
				this.mc = a.yb();
				this.Tc = a.C() != 0;
				this.gb = a.N();
				this.Ca = a.N();
				this.he = a.pi();
				this.dd = a.C();
				this.Fd = a.C();
				this.T = Stadium.ka(a);
				var b = a.C() != 0;
				this.M = null;
				b && (this.M = new Game,
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

			Dk() {
				let a = 0;
				var b = StreamWriter.ia();
				this.fa(b);
				for (b = b.Nr(); 4 <= b.s.byteLength - b.a;)
					a ^= b.N();
				return a;
			}

			Io() {
				let a = StreamWriter.ia(4);
				a.P(this.Dk());
				return a.Qg();
			}

			$n(a) {
				a = (new J(new DataView(a))).N();
				class_E.i(this.so, this.Dk() != a);
			}

			tm(a) {
				this.Yl = a;
			}

			Mb(a) {
				if (0 == a)
					return true;
				a = this.getFullPlayerById(a);
				return null != a && a.bb ? true : false;
			}

			ur(a, b, c, d) {
				this.Fd = 0 > b ? 0 : 255 < b ? 255 : b;
				this.dd = 0 > c ? 0 : 255 < c ? 255 : c;
				0 > d ? d = 0 : 100 < d && (d = 100);
				this.he = this.dd * d;
				gc.i(this.onKickRateLimitSetFun, a, this.Fd, this.dd, d);
			}

			vc() {
				let a = ua.Cc
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
						d[g] = e[g].ss();
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

		class StringOpsInt {
			static De(a) {
				return class_w.Je(a, '');
			}

			static parseInt(a) {
				a = parseInt(a);
				return isNaN(a) ? null : a;
			}
		}

		class jc {
			constructor(a, b) {
				this.mh = null;
				this.Rs = .025;
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
				let b = a - this.bn;
				this.bn = a;
				this.Be += (this.jh - this.Be) * this.Rs;
				this.Lf -= b;
				0 >= this.Lf && (this.Lf = this.jh = 0);
				0 >= this.jh && .05 > this.Be && (window.clearInterval(this.mh),
					this.mh = null,
					this.Be = 0);
				a = ConnectionConstants.o.wm.H() ? this.Be : 0;
				this.Zg.gain.value = a;
			}

			sj(a) {
				this.jh = a;
				this.Lf = 166.66666666666666;
				let b = this;
				null == this.mh && (this.mh = window.setInterval(function () {
					b.update();
				}, 17),
					this.bn = window.performance.now());
			}

			connect(a) {
				this.Zg.connect(a);
			}

			Ts(a) {
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
							z = Team.red.Dh
							,
							K = 0;
						for (a = a.K; K < a.length;) {
							let N = a[K];
							++K;
							if (null == N.J)
								continue;
							var c = N.J.a;
							let Kb = e.a;
							var d = c.x - Kb.x;
							c = c.y - Kb.y;
							d = d * d + c * c;
							if (N.ea == Team.red) {
								if (null == f || f.a.x * z < N.J.a.x * z)
									f = N.J;
								if (null == g || g.a.x * z > N.J.a.x * z)
									g = N.J;
								if (null == h || d < k)
									h = N.J,
										k = d;
							}
							else if (N.ea == Team.blue) {
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

		class RoomListView {
			constructor(a) {
				function bChecked(g, checkedByDefault = true) {
					function k() {
						l.className = n.Mf ? 'icon-ok' : 'icon-cancel';
					}

					g = c.get(g);
					let l = g.querySelector('i');
					let n = {Mf: checkedByDefault};
					k();
					g.onclick = function () {
						n.Mf = !n.Mf;
						k();
						e.kn(e.hj);
					};
					return n;
				}

				this.hj = [];
				this.rs = a;
				this.Ha = ViewUtil.getFirstElemChildFromHtmlContents(RoomListView.vj);
				let c = ViewUtil.Da(this.Ha);
				let d = new Notice(c);
				this.rj = c.get('refresh');
				this.an = c.get('join');
				a = c.get('create');
				this.ns = c.get('count');
				let e = this;
				a.onclick = function () {
					H.i(e.Fs);
				};
				c.get('changenick').onclick = function () {
					H.i(e.Es);
				};
				c.get('settings').onclick = function () {
					H.i(e.Hs);
				};
				let f = c.get('replayfile');
				f.onchange = function () {
					var g = f.files;
					if (!(1 > g.length)) {
						g = g.item(0);
						var h = new FileReader;
						h.onload = function () {
							class_E.i(e.Gs, h.result);
						};
						h.readAsArrayBuffer(g);
					}
				};
				// Show full
				this.qs = bChecked('fil-full', true);
				// Show locked
				this.Is = bChecked('fil-pass', false);
				this.xs = c.get('listscroll');
				this.Ks = class_wb.Zh(this.xs);
				this.kj = c.get('list');
				this.rj.onclick = function () {
					d.Sl();
					e.Wm();
				};
				this.an.onclick = function () {
					null != e.Td && class_E.i(e.fn, e.Td.Os);
				};
				this.Wm();
			}

			Wm() {
				function a() {
					d.rj.disabled = false;
					d.kn(b);
					return null;
				}

				this.nn(null);
				this.rj.disabled = true;
				ViewUtil.Jf(this.kj);
				let b = [];
				this.hj = [];
				let c = Zb.get().then(function (e) {
					return b = e;
				}, function () {
					return null;
				});
				let d = this;
				RoomListView.Js(c).then(a, a);
			}

			kn(a) {
				this.hj = a;
				Zb.Qs(this.rs, a);
				a.sort(function (h, k) {
					return h.Te - k.Te;
				});
				ViewUtil.Jf(this.kj);
				let b = 0;
				let c = 0;
				let d = !this.qs.Mf;
				let e = !this.Is.Mf;
				let f = this;
				let g = 0;
				for (; g < a.length;) {
					let h = a[g];
					++g;
					let k = h.Cd;
					if (d && k.K >= k.ef)
						continue;
					if (e && k.Hb)
						continue;
					let l = new class_Bb(h);
					l.Ha.ondblclick = function () {
						class_E.i(f.fn, h);
					};
					l.Ha.onclick = function () {
						f.nn(l);
					};
					this.kj.appendChild(l.Ha);
					b += k.K;
					++c;
				}
				this.ns.textContent = '' + b + ' players in ' + c + ' rooms';
				this.Ks.update();
			}

			nn(a) {
				null != this.Td && this.Td.Ha.classList.remove('selected');
				this.Td = a;
				null != this.Td && this.Td.Ha.classList.add('selected');
				this.an.disabled = null == this.Td;
			}

			static Js(a) {
				let b = new Promise(function (c, d) {
						window.setTimeout(function () {
							d(null);
						}, 5000);
					}
				);
				return Promise.race([b, a]);
			}
		}

		class dc {
			constructor(a, b) {
				this.Oj = [];
				this.Pq = /[#@][^\s@#]*$/;
				this.Nb = a;
				this.Yp = b;
				a.hidden = true;
			}

			Qh() {
				this.Yi(null);
			}

			Pn(a, b) {
				b = this.Pq.exec(P.substr(a, 0, b));
				if (null != b) {
					var c = b[0]
						,
						d = P.substr(c, 1, null).split('')
						,
						e = dc.Do
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
					this.Nk = '#' == c.charAt(0);
					this.ui = b.index;
					this.br = c.length;
					this.Wl = a;
					a = function (l) {
						l = k.exec(l.A);
						return null == l ? -1 : l.index + l[0].length;
					};
					b = [];
					c = 0;
					for (d = this.Oj; c < d.length;)
						e = d[c],
							++c,
							f = a(e),
						0 <= f && b.push({
							mn: f,
							item: e
						});
					b.sort(function (l, n) {
						return l.mn - n.mn;
					});
					this.Yi(b);
				}
				else
					this.Yi(null);
			}

			vk(a) {
				a = this.Nk ? '#' + a.aa : '@' + StringOps3.replace(a.A, ' ', '_');
				this.Yp(P.substr(this.Wl, 0, this.ui) + a + ' ' + P.substr(this.Wl, this.ui + this.br, null), this.ui + a.length + 1);
			}

			Yi(a) {
				var b = null != a && 0 != a.length;
				this.Nb.hidden || ViewUtil.Jf(this.Nb);
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
						this.Nk && (e = '(' + g.aa + ') ' + e);
						f.textContent = e;
						this.Nb.appendChild(f);
						f.onclick = function () {
							c.vk(g);
						};
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

			yo() {
				null != this.ad && (this.vk(this.ad[this.Ac].item),
					this.Qh());
			}

			static Do(a) {
				return -1 != '.$^{[(|)*+?\\'.indexOf(a) ? '\\' + a : a;
			}
		}

		class Game {
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
				// Team
				this.fe = Team.red;
				// Game state
				this.Ab = 0;
				this.zc = 0;
				this.ta = new DynamicObjectsUtil;
				// Time limit
				this.Ca = 0;
				// Score limit
				this.gb = 5;
				// Stadium
				this.T = null;
			}

			ep(roomInst) {
				// Room instance
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
					this.ta.G.push(b[roomInst++].zp());
				this.Pk();
			}

			Lk(a) {
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
					b.m = c.m;
					b.h = 39;
					b.w = a.ea.w | c.w;
					var d = a.ea == Team.red ? this.T.Kd : this.T.td;
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

					var b = this.La.Ws;
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
										var l = k.a;
										var n = d.J.a;
										var r = l.x - n.x;
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
								if (f) {
									if (null != this.La.onPlayerBallKickFun)
										this.La.onPlayerBallKickFun(d);
									d.Yb = false;
									d.Xc = this.La.Fd;
									d.Bc -= this.La.dd;
								}
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
						0 != (h.w & 128) && (Game.mk[c] = f,
							f = Game.gl[c],
							h = h.a,
							f.x = h.x,
							f.y = h.y,
							++c);
					this.ta.D(a);
					if (this.Ab == 0) {
						for (a = 0; a < b.length;)
							c = b[a],
								++a,
							null != c.J && (c.J.h = 39 | this.fe.lp);
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
							d = this.T.Sn(b[Game.mk[d]].a, Game.gl[d]),
						d == Team.spec);) ;
						d != Team.spec ? (this.Ab = 2,
							this.zc = 150,
							this.fe = d,
							d == Team.red ? this.Lb++ : this.Sb++,
						null != this.La.onTeamGoalFun && this.La.onTeamGoalFun(d.enemyTeam),
						null != this.La.Yl && this.La.Yl(d.aa)) : 0 < this.Ca && this.Lc >= 60 * this.Ca && this.Sb != this.Lb && (null != this.La.onTimeIsUpFun && this.La.onTimeIsUpFun(),
							this.Dm());
					}
					else if (this.Ab == 2) {
						this.zc--;
						if (this.zc <= 0) {
							if (this.gb > 0 && (this.Sb >= this.gb || this.Lb >= this.gb) || 0 < this.Ca && this.Lc >= 60 * this.Ca && this.Sb != this.Lb) {
								this.Dm();
							}
							else {
								this.Pk();
								if (this.La.onPositionsResetFun != null)
									this.La.onPositionsResetFun();
							}
						}
					}
					else if (this.Ab == 3 && (this.zc--,
					this.zc <= 0 && (b = this.La,
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

			Dm() {
				this.zc = 300;
				this.Ab = 3;
				null != this.La.onTeamVictoryFun && this.La.onTeamVictoryFun(this.Sb > this.Lb ? Team.red : Team.blue);
			}

			Pk() {
				let a = this.La.K;
				this.Ab = 0;
				for (var b = this.T.G, c = this.ta.G, d = 0, e = this.T.vf ? b.length : 1; d < e;) {
					var f = d++;
					b[f].Kk(c[f]);
				}
				b = [0, 0, 0];
				for (c = 0; c < a.length;)
					if (d = a[c],
						++c,
						this.Lk(d),
						e = d.ea,
					e != Team.spec) {
						f = d.J.a;
						var g = this.T;
						var h = b[e.aa];
						var k = e == Team.red ? g.Kd : g.td;
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
				this.fe = 1 == a ? Team.red : 2 == a ? Team.blue : Team.spec;
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
				let a = ua.Cc;
				let b = this.jc;
				this.kc != a && (null == b && (this.jc = b = new Game),
					this.kc = a,
					Game.xd(b, this));
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

		class uc {
			constructor(a, b) {
				this.en = 0;
				this.version = 1;
				this.hh = 0;
				this.Sd = StreamWriter.ia(1000);
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
				};
				this.Sd.Wb(0);
				let e = this.hh;
				a.U.tm(function (f) {
					let g = a.Z;
					d.Sd.jb(g - e);
					d.Sd.l(f);
					d.en++;
					e = g;
				});
			}

			stop() {
				this.lj.ic = null;
				this.lj.U.tm(null);
				this.Sd.s.setUint16(0, this.en, this.Sd.Sa);
				this.Sd.Xb(this.Kf.Vb());
				let a = pako.deflateRaw(this.Sd.Vb());
				let b = StreamWriter.ia(a.byteLength + 32);
				b.Ug('HBR2');
				b.rb(this.version);
				b.rb(this.lj.Z - this.hh);
				b.Xb(a);
				return b.Vb();
			}
		}

		class class_yb {
			constructor() {
				this.qk = null;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(class_yb.O);
				var a = ViewUtil.Da(this.f);
				this.jg = a.get('link');
				let b = a.get('copy');
				a = a.get('close');
				let c = this;
				this.jg.onfocus = function () {
					c.jg.select();
				};
				b.onclick = function () {
					c.jg.select();
					return window.document.execCommand('Copy');
				};
				a.onclick = function () {
					H.i(c.ob);
				};
			}

			vr(a) {
				this.qk != a && (this.qk = a,
					this.jg.value = a);
			}
		}

		class StatsView {
			constructor() {
				this.wl = new PingGraph;
				this.f = ViewUtil.getFirstElemChildFromHtmlContents(StatsView.O);
				let a = ViewUtil.Da(this.f);
				this.Ag = a.get('ping');
				this.Eo = a.get('fps');
				ViewUtil.replaceWith(a.get('graph'), this.wl.f);
			}

			xr(a, b) {
				this.Ag.textContent = 'Ping: ' + a + ' - ' + b;
			}

			qm(a) {
				this.Eo.textContent = 'Fps: ' + a;
			}
		}

		class ImportantUtil {
			constructor(gameViewInst, b) {
				this.Rh = null;
				this.j = gameViewInst;
				null != b && (this.Rh = '@' + StringOps3.replace(b, ' ', '_'));
			}

			updateMentions(a) {
				let mention = this.j.field_chatboxViewInst.Fc;
				let c = [];
				let d = 0;
				for (a = a.K; d < a.length;) {
					let e = a[d];
					++d;
					c.push({
						A: e.A,
						aa: e.W
					});
				}
				mention.Oj = c;
			}

			ti(roomInst) {
				function byPlayerNameText(fullPlayer) {
					return null == fullPlayer ? '' : ' by ' + fullPlayer.A;
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
						admin: fullPlayer.bb,
						position: pos,
						avatar: fullPlayer.Zb,
						flag: fullPlayer.country,
						isBlinking: fullPlayer.Yb,
						//inputKey: fullPlayer.inputKey,
						ping: fullPlayer.xb,
						desynchronized: fullPlayer.Qd
					};
				}

				this.updateMentions(roomInst);
				let self = this;

				roomInst.onPlayerJoinFun = function (fullPlayer) {
					self.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + fullPlayer.A + ' has joined');
					ConnectionConstants.Na.hd(ConnectionConstants.Na.ip);
					self.updateMentions(roomInst);

					if (window.parent.g.onPlayerJoin != null) {
						const player = getPlayerObject(fullPlayer);
						window.parent.g.onPlayerJoin(player);
					}
				};
				roomInst.onPlayerLeaveFun = function (fullPlayer, reason, ban, byFullPlayer) {
					class_E.i(self.Vp, fullPlayer.W);

					if (window.parent.g.onPlayerLeave != null) {
						const player = getPlayerObject(fullPlayer);
						window.parent.g.onPlayerLeave(player);
					}

					let noticeText;
					if (reason == null) {
						noticeText = '' + fullPlayer.A + ' has left';
					}
					else {
						gc.i(self.Up, fullPlayer.W, reason, null != byFullPlayer ? byFullPlayer.A : null, ban);
						noticeText = '' + fullPlayer.A + ' was ' + (ban ? 'banned' : 'kicked') + byPlayerNameText(byFullPlayer) + (reason != '' ? ' (' + reason + ')' : '');

						if (window.parent.g.onPlayerKicked != null) {
							const player = getPlayerObject(fullPlayer);
							const byPlayer = getPlayerObject(byFullPlayer);
							window.parent.g.onPlayerKicked(player, reason, ban, byPlayer);
						}
					}
					self.j.field_chatboxViewInst.addNoticeToLogAndHandle(noticeText);
					ConnectionConstants.Na.hd(ConnectionConstants.Na.mp);
					self.updateMentions(roomInst);
				};
				roomInst.onPlayerChatFun = function (fullPlayer, message) {
					const f = null != self.Rh && -1 != message.indexOf(self.Rh);
					self.j.field_chatboxViewInst.ca('' + fullPlayer.A + ': ' + message, f ? 'highlight' : null);
					if (ConnectionConstants.o.xm.H() && f)
						ConnectionConstants.Na.hd(ConnectionConstants.Na.Ik);
					else
						ConnectionConstants.o.Ki.H() && ConnectionConstants.Na.hd(ConnectionConstants.Na.Zj);

					if (window.parent.g.onPlayerChat != null) {
						const player = getPlayerObject(fullPlayer);
						window.parent.g.onPlayerChat(player, message);
					}
				};
				roomInst.onAnnouncementFun = function (message, color, style, sound) {
					self.j.field_chatboxViewInst.xp(message, color, style);
					if (ConnectionConstants.o.Ki.H())
						switch (sound) {
							case 1:
								ConnectionConstants.Na.hd(ConnectionConstants.Na.Zj);
								break;
							case 2:
								ConnectionConstants.Na.hd(ConnectionConstants.Na.Ik);
						}

					if (window.parent.g.onAnnouncement != null) {
						window.parent.g.onAnnouncement(message, color, style, sound);
					}
				};
				roomInst.onPlayerBallKickFun = function (byFullPlayer) {
					ConnectionConstants.Na.hd(ConnectionConstants.Na.kp);

					if (window.parent.g.onPlayerBallKick != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onPlayerBallKick(byPlayer);
					}
				};
				roomInst.onTeamGoalFun = function (team) {
					ConnectionConstants.Na.hd(ConnectionConstants.Na.Qo);
					const bigTextUtilInst = self.j.Ob.cc.Ad;
					bigTextUtilInst.Qa(team == Team.red ? bigTextUtilInst.Mq : bigTextUtilInst.Jn);

					if (window.parent.g.onTeamGoal != null) {
						const teamId = team.aa;
						window.parent.g.onTeamGoal(teamId);
					}
				};
				roomInst.onTeamVictoryFun = function (team) {
					const bigTextUtilInst = self.j.Ob.cc.Ad;
					bigTextUtilInst.Qa(team == Team.red ? bigTextUtilInst.Nq : bigTextUtilInst.Kn);
					self.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + team.A + ' team won the match');

					if (window.parent.g.onTeamVictory != null) {
						const teamId = team.$;
						window.parent.g.onTeamVictory(teamId);
					}
				};
				roomInst.onGamePauseFun = function (byFullPlayer, isPaused, isBeingResumed) {
					if (isPaused && !isBeingResumed) {
						self.j.field_chatboxViewInst.addNoticeToLogAndHandle('Game paused' + byPlayerNameText(byFullPlayer));

						if (window.parent.g.onGamePause != null) {
							const byPlayer = getPlayerObject(byFullPlayer);
							window.parent.g.onGamePause(byPlayer, isPaused);
						}
					}
				};
				roomInst.onTimeIsUpFun = function () {
					const bigTextUtilInst = self.j.Ob.cc.Ad;
					bigTextUtilInst.Qa(bigTextUtilInst.Hr);

					if (window.parent.g.onTimeIsUp != null) {
						window.parent.g.onTimeIsUp();
					}
				};
				roomInst.onPositionsResetFun = () => {
					if (window.parent.g.onPositionsReset != null) {
						window.parent.g.onPositionsReset();
					}
				};
				roomInst.onGameStartFun = function (byFullPlayer) {
					self.j.te(false);
					self.j.Ob.cc.Ad.Vn();
					self.j.field_chatboxViewInst.addNoticeToLogAndHandle('Game started' + byPlayerNameText(byFullPlayer));

					if (window.parent.g.onGameStart != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onGameStart(byPlayer);
					}
				};
				roomInst.onGameStopFun = function (byFullPlayer) {
					if (byFullPlayer != null)
						self.j.field_chatboxViewInst.addNoticeToLogAndHandle('Game stopped' + byPlayerNameText(byFullPlayer));

					if (window.parent.g.onGameStop != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onGameStop(byPlayer);
					}
				};
				roomInst.onStadiumChangeFun = function (byFullPlayer, stadium) {
					let checksum = null;
					// If it isn't a default stadium
					if (!stadium.Xe()) {
						checksum = StringOps3.ah(stadium.ak(), 8);
						self.j.field_chatboxViewInst.addNoticeToLogAndHandle('Stadium "' + stadium.A + '" (' + checksum + ') loaded' + byPlayerNameText(byFullPlayer));
					}

					if (window.parent.g.onStadiumChange != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onStadiumChange(byPlayer, stadium.A, checksum);
					}
				};
				roomInst.onPlayerDesyncChangeFun = function (fullPlayer) {
					self.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + fullPlayer.A + ' ' + (fullPlayer.Qd ? 'has desynchronized' : 'is back in sync'));

					if (window.parent.g.onPlayerDesyncChange != null) {
						const player = getPlayerObject(fullPlayer);
						window.parent.g.onPlayerDesyncChange(player, fullPlayer.Ld);
					}
				};
				roomInst.onPlayerTeamChangeFun = function (byFullPlayer, fullPlayer, team) {
					null != roomInst.M && self.j.field_chatboxViewInst.addNoticeToLogAndHandle('' + fullPlayer.A + ' was moved to ' + team.A + byPlayerNameText(byFullPlayer));

					if (window.parent.g.onPlayerTeamChange != null) {
						const player = getPlayerObject(fullPlayer);
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onPlayerTeamChange(player, byPlayer, team.aa);
					}
				};
				roomInst.onPlayerAdminChangeFun = function (byFullPlayer, fullPlayer) {
					const playerName = fullPlayer.A;
					const noticeText = (fullPlayer.bb ? '' + playerName + ' was given admin rights' : '' + playerName + '\'s admin rights were taken away') + byPlayerNameText(byFullPlayer);
					self.j.field_chatboxViewInst.addNoticeToLogAndHandle(noticeText);

					if (window.parent.g.onPlayerAdminChange != null) {
						const player = getPlayerObject(fullPlayer);
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onPlayerAdminChange(player, byPlayer, fullPlayer.bb);
					}
				};
				roomInst.onChatIndicatorStateChangeFun = function (fullPlayer, chatIndicatorState) {
					self.j.Ob.cc.Xo(fullPlayer, chatIndicatorState);

					if (window.parent.g.onChatIndicatorStateChange != null) {
						const player = getPlayerObject(fullPlayer);
						const chatIndicatorShown = chatIndicatorState === 0;
						window.parent.g.onChatIndicatorStateChange(player, chatIndicatorShown);
					}
				};
				roomInst.onKickRateLimitSetFun = function (byFullPlayer, min, rate, burst) {
					self.j.field_chatboxViewInst.addNoticeToLogAndHandle('Kick Rate Limit set to (min: ' + min + ', rate: ' + rate + ', burst: ' + burst + ')' + byPlayerNameText(byFullPlayer));

					if (window.parent.g.onKickRateLimitSet != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onKickRateLimitSet(min, rate, burst, byPlayer);
					}
				};
			}

			resetRoomEventHandlers(roomInstance) {
				roomInstance.onPlayerJoinFun = null;
				roomInstance.onPlayerLeaveFun = null;
				roomInstance.onPlayerChatFun = null;
				roomInstance.onAnnouncementFun = null;
				roomInstance.onPlayerBallKickFun = null;
				roomInstance.onTeamGoalFun = null;
				roomInstance.onTeamVictoryFun = null;
				roomInstance.onGamePauseFun = null;
				roomInstance.onTimeIsUpFun = null;
				roomInstance.onGameStartFun = null;
				roomInstance.onGameStopFun = null;
				roomInstance.onStadiumChangeFun = null;
				roomInstance.onPlayerDesyncChangeFun = null;
				roomInstance.onPlayerTeamChangeFun = null;
				roomInstance.onPlayerAdminChangeFun = null;
				roomInstance.onChatIndicatorStateChangeFun = null;
				roomInstance.onKickRateLimitSetFun = null;
			}
		}

		class class_cb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.$n(this.Xg);
			}

			ua(a) {
				a.jb(this.Xg.byteLength);
				a.Sg(this.Xg);
			}

			va(a) {
				this.Xg = a.Ml(a.zb());
			}
		}

		class class_oa extends WMajor {
			constructor(a) {
				if (WMajor.wb) {
					super();
				}
				else {
					WMajor.wb = true;
					super();
					WMajor.wb = false;
					this.Xa(a);
				}
			}

			Xa(a) {
				this.Ui = new Ra;
				this.ze = this.fc = 0;
				this.se = new Ra;
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
				let b = this.se.list;
				let c = 0;
				let d = b.length;
				let e = 0;
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
				null != this.ic && this.ic(a)) : this.se.Zm(a);
			}

			Fk(a, b) {
				if (0 >= a)
					return this.U;
				a > this.Pf && (a = this.Pf);
				ua.Cc++;
				let c = this.U.vc();
				null != b ? (this.Ui.ls(this.se, b),
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

			sr(a) {
				300 < a && (a = 300);
				0 > a && (a = 0);
				this.ec = this.Ec * a | 0;
			}

			pm(a) {
				this.yd = this.Ec * (-200 > a ? -200 : 200 < a ? 200 : a);
			}
		}

		class class_Fa extends class_oa {
			constructor(a, b) {
				WMajor.wb = true;
				super();
				WMajor.wb = false;
				this.Xa(a, b);
			}

			Xa(a, b) {
				this.Gi = [];
				this.si = [];
				this.Dg = new Ra;
				this.Hp = 1;
				this.wd = this.Im = 0;
				this.Ti = new Rb(50);
				this.Bg = new Rb(50);
				this.un = 1000;
				this.nk = '';
				super.Xa(b.state);
				this.Uh = b.Us;
				this.Re = b.os;
				let c = null
					,
					d = this;
				c = function (e) {
					d.Af(0);
					let f = StreamWriter.ia();
					f.Wb(b.version);
					f.Cb(b.password);
					d.sc = new Qb(b.mj, b.iceServers, a, nc.channels, f, b.pn);
					d.sc.qh = e;
					d.sc.Gd = function (h) {
						d.sc = null;
						d.pa = h;
						h.ug = function (k) {
							k = new J(new DataView(k));
							d.Bq(k);
						};
						h.lf = function () {
							3 != d.wd && class_E.i(d.mf, ia.Nf('Connection closed'));
							d.ja();
						};
						h = window.setTimeout(function () {
							class_E.i(d.mf, ia.Nf('Game state timeout'));
							d.ja();
						}, 10000);
						d.xe = h;
						d.Af(2);
					};
					d.sc.pl = function () {
						d.Af(1);
					};
					let g = false;
					d.sc.hl = function () {
						g = true;
					};
					d.sc.gd = function (h) {
						if (!e && 1 == d.wd && g)
							H.i(d.Zp),
								c(true);
						else {
							let k = Qb.Lo(h);
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
				};
				c(null != b.ln && b.ln);
			}

			ja(a) {
				null != this.sc && (this.sc.gd = null,
					this.sc.On(),
					this.sc = null);
				window.clearTimeout(this.xe);
				null != this.pa && (this.pa.lf = null,
					this.pa.ja(),
					this.pa = null);
				this.nk = null == a ? 'Connection closed' : a;
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
				this.Dd() && window.performance.now() - this.Im > this.un && this.Ci();
				this.bd = window.performance.now() * this.Ec + this.Ti.gh() - this.Z;
				this.Wj();
			}

			cg() {
				return this.Dd() ? (0 > this.ec && (this.ec = 0),
					this.Fk(window.performance.now() * this.Ec + this.Ti.gh() - this.Z + this.ec + this.yd, this.Dg)) : this.U;
			}

			Wj() {
				0 > this.bd && (this.bd = 0);
				this.bd > this.Pf && (this.bd = this.Pf);
			}

			Bq(a) {
				switch (a.C()) {
					case 0:
						this.yq(a);
						break;
					case 1:
						this.xq(a);
						break;
					case 2:
						this.uq(a);
						break;
					case 3:
						this.Dq(a);
						break;
					case 4:
						this.Aq(a);
						break;
					case 5:
						this.wq(a);
						break;
					case 6:
						this.Cq(a);
				}
			}

			yq(a) {
				a = a.qb(a.zb());
				let b = Promise.resolve(null);
				null != this.Re && (b = this.Re.Dr(a));
				let c = this;
				b.catch(function () {
					return null;
				}).then(function (d) {
					c.qr(d);
				});
			}

			xq(a) {
				a = pako.inflateRaw(a.qb());
				a = new J(new DataView(a.buffer, a.byteOffset, a.byteLength));
				this.yc = a.Rb();
				this.Z = a.fb();
				this.ze = a.fb();
				this.fc = a.zb();
				this.bd = 10;
				for (this.U.ka(a); 0 < a.s.byteLength - a.a;)
					this.Jg(this.Pm(a));
				window.clearTimeout(this.xe);
				this.Af(3);
			}

			qr(a) {
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

			Pm(a) {
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

			uq(a) {
				a = this.Pm(a);
				this.Jg(a);
				a.R == this.yc && this.Dg.Ms(a.Ae);
				this.Kl();
			}

			Cq(a) {
				a = class_m.lh(a);
				a.R = 0;
				a.Ae = 0;
				a.apply(this.U);
				null != this.ic && this.ic(a);
			}

			Dq(a) {
				let b = a.fb();
				a = a.fb();
				this.si.push({
					frame: b,
					Ff: a
				});
				this.Kl();
			}

			Kl() {
				if (3 == this.wd) {
					for (var a = 0, b = this.si; a < b.length;) {
						var c = b[a];
						++a;
						c.frame <= this.Z || c.Ff == this.ze + this.fc + this.se.ms(c.frame) && this.Dn(c.frame - this.Z);
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
					this.Dg.Ls(this.Z);
				}
			}

			wq(a) {
				let b = 0 != a.C();
				let c = a.lc();
				let d = '';
				0 < a.s.byteLength - a.a && (d = a.lc());
				a = b ? 'You were banned' : 'You were kicked';
				d != '' && (a += ' by ' + d);
				c != '' && (a += ' (' + c + ')');
				this.ja(a);
			}

			Aq(a) {
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
					f < a ? class_E.i(this.ml, -1) : class_E.i(this.ml, c);
					++b;
				}
				this.Gi.splice(0, b);
			}

			Ci() {
				let a = window.performance.now();
				this.Im = a;
				this.Gi.push(a);
				let b = this.Bg.gh() | 0
					,
					c = StreamWriter.ia();
				c.l(2);
				c.u(a);
				c.jb(b);
				this.Ub(c, 2);
			}

			Dn(a) {
				this.Gj(a);
				this.bd -= a;
				this.Wj();
			}

			ra(a) {
				if (3 == this.wd) {
					var b = this.Hp++
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
						this.Dg.Zm(a));
				}
			}

			static yh(a) {
				switch (a.lb) {
					case 0:
						return 'Cancelled';
					case 1:
						return 'Failed to connect to peer.';
					case 2:
						return Gc.description(a.reason);
					case 3:
						return a.description;
				}
			}
		}

		class Xb extends class_oa {
			constructor(a) {
				WMajor.wb = true;
				super();
				WMajor.wb = false;
				this.Xa(a);
			}

			Xa(a) {
				this.Rj = new Map;
				this.Hb = null;
				this.og = 32;
				this.Qe = new Map;
				this.dc = [];
				this.zi = 4;
				this.Un = 600;
				super.Xa(a.state);
				this.Bp = a.mj;
				this.$r = a.version;
				this.Cp = 1;
				this.Sk = this.yc = 0;
				this.Oi = window.performance.now();
				this.Mc = new Eb(this.Bp, a.iceServers, nc.channels, a.pn);
				this.Mc.dk = createHandlerFromInstance(this, this.Wo);
				let b = this;
				this.Mc.kl = function (c) {
					b.Sp(c);
				};
				this.Mc.tg = function (c) {
					class_E.i(b.tg, c);
				};
				this.Mc.nf = function (c, d) {
					null != b.nf && b.nf(c, d);
				};
			}

			ja() {
				this.Mc.ja();
				let a = 0
					,
					b = this.dc;
				for (; a < b.length;) {
					let c = b[a++].pa;
					c.lf = null;
					c.ug = null;
					c.ja();
				}
			}

			Bo(a, b, c, d) {
				let e = this.Qe.get(a);
				if (null != e) {
					if (d) {
						let f = this.Mc.Hn(e.pa);
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
				0 < this.dc.length && this.Kg(this.$h(a), 1);
			}

			D() {
				let a = ((window.performance.now() - this.Oi) * this.Ec | 0) - this.Z;
				0 < a && this.Gj(a);
				7 <= this.Z - this.Tk && this.Fi();
				this.Z - this.Sk >= this.Un && (this.Fi(),
					this.nr());
			}

			cg() {
				0 > this.ec && (this.ec = 0);
				return this.Fk((window.performance.now() - this.Oi) * this.Ec - this.Z + this.zi + this.ec + this.yd);
			}

			Wo(a, b) {
				if (this.dc.length >= this.og)
					return db.Of(4100);
				try {
					if (b.Rb() != this.$r)
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

			Sp(a) {
				if (this.dc.length >= this.og)
					a.ja();
				else {
					var b = new tc(a);
					this.dc.push(b);
					var c = this;
					a.ug = function (d) {
						d = new J(new DataView(d));
						c.vq(d, b);
					};
					a.lf = function () {
						P.remove(c.dc, b);
						c.Qe.delete(b.aa);
						class_E.i(c.Pp, b.aa);
					};
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
				this.rl(a, b);
				return b;
			}

			rl(a, b) {
				b.rb(a.kb);
				b.jb(a.Dc);
				b.Wb(a.R);
				b.rb(a.Ae);
				class_m.oj(a, b);
			}

			Fi() {
				if (!(0 >= this.Z - this.Tk) && 0 != this.dc.length) {
					var a = StreamWriter.ia();
					a.l(3);
					a.rb(this.Z);
					a.rb(this.ze);
					this.Kg(a, 2);
					this.Tk = this.Z;
				}
			}

			Kg(a, b) {
				null == b && (b = 0);
				let c = 0
					,
					d = this.dc;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.Gg && e.Ub(a, b);
				}
			}

			pr(a) {
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
					this.rl(d[e++], c);
				b.Xb(pako.deflateRaw(c.Vb()));
				a.Ub(b);
			}

			nr() {
				this.Sk = this.Z;
				if (0 != this.dc.length) {
					var a = new class_cb;
					a.kb = this.Z;
					a.Dc = this.fc++;
					a.R = 0;
					a.Xg = this.U.Io();
					this.Kg(this.$h(a));
				}
			}

			Fq(a, b) {
				let c = a.qb(a.zb())
					,
					d = a.qb(a.zb());
				a = b.Pe;
				b.Pe = null;
				let e = this;
				T.Zr(c, a).catch(function () {
					return null;
				}).then(function (f) {
					try {
						if (-1 != e.dc.indexOf(b)) {
							b.Vs = f;
							var g = e.Cp++;
							b.aa = g;
							e.Qe.set(g, b);
							Ba.i(e.Op, g, new J(new DataView(d.buffer, d.byteOffset, d.byteLength), false));
							b.Gg = true;
							e.pr(b);
						}
					}
					catch (h) {
						f = GlobalError.Jb(h).Db(),
							e.Gk(b, f);
					}
				});
			}

			vq(a, b) {
				this.D();
				try {
					if (!b.Po.Lm())
						throw GlobalError.B(1);
					let c = a.C();
					if (b.Gg)
						switch (c) {
							case 1:
								this.Gq(a, b);
								break;
							case 2:
								this.zq(a, b);
								break;
							default:
								throw GlobalError.B(0);
						}
					else if (0 == c)
						this.Fq(a, b);
					else
						throw GlobalError.B(0);
					if (0 < a.s.byteLength - a.a)
						throw GlobalError.B(2);
				}
				catch (c) {
					this.Gk(b, GlobalError.Jb(c).Db());
				}
			}

			Gk(a, b) {
				globalScope.console.log(b);
				this.Qe.delete(a.aa);
				P.remove(this.dc, a);
				a.Gg && null != this.il && this.il(a.aa);
				a.pa.ja();
			}

			zq(a, b) {
				let c = a.v();
				b.xb = a.zb();
				a = StreamWriter.ia();
				a.l(4);
				a.u((window.performance.now() - this.Oi) * this.Ec + this.zi);
				a.u(c);
				b.Ub(a, 2);
			}

			Gq(a, b) {
				let c = a.fb()
					,
					d = a.fb();
				a = class_m.lh(a);
				var e = a.Gf.qj;
				if (null != e) {
					var f = b.Ej.get(e);
					null == f && (f = new class_xb(e.dj, e.wj),
						b.Ej.set(e, f));
					if (!f.Lm())
						throw GlobalError.B(3);
				}
				e = this.Z;
				f = this.Z + 120;
				c < e ? c = e : c > f && (c = f);
				a.Ae = d;
				a.R = b.aa;
				a.kb = c;
				a.hn(this.U) && (this.Jg(a),
					this.Kg(this.$h(a), 1));
			}
		}

		class Yb extends class_oa {
			constructor(a, b, c) {
				WMajor.wb = true;
				super();
				WMajor.wb = false;
				this.Xa(a, b, c);
			}

			Xa(a, b, c) {
				this.dl = [];
				this.yl = 5;
				this.Md = -1;
				this.qg = this.Tb = this.Wh = this.Bk = 0;
				super.Xa(b);
				a = new J(new DataView(a.buffer), false);
				if (1212305970 != a.fb())
					throw GlobalError.B('');
				b = a.fb();
				if (c != b)
					throw GlobalError.B(new Pb(b));
				this.tf = a.fb();
				c = pako.inflateRaw(a.qb());
				this.Pc = new J(new DataView(c.buffer, c.byteOffset, c.byteLength));
				this.Jq(this.Pc);
				c = this.Pc.qb();
				this.Pc = new J(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
				this.wi();
				this.Wh = window.performance.now();
				this.yc = -1;
			}

			Jq(a) {
				let b = a.Rb()
					,
					c = 0
					,
					d = 0;
				for (; d < b;) {
					++d;
					c += a.zb();
					let e = a.C();
					this.dl.push({
						pj: c / this.tf,
						kind: e
					});
				}
			}

			Nl() {
				var a = this.Pc;
				0 < a.s.byteLength - a.a ? (a = this.Pc.zb(),
					this.qg += a,
					a = this.Pc.Rb(),
					this.pg = class_m.lh(this.Pc),
					this.pg.R = a) : this.pg = null;
			}

			Oo() {
				return this.Z / this.tf;
			}

			ra() {
			}

			cg() {
				this.D();
				ua.Cc++;
				let a = this.U.vc();
				a.D(this.Bk);
				return a;
			}

			D() {
				var a = window.performance.now()
					,
					b = a - this.Wh;
				this.Wh = a;
				0 < this.Md ? (this.Tb += 10000,
				this.Tb > this.Md && (this.Tb = this.Md,
					this.Md = -1)) : this.Tb += b * this.yl;
				a = this.tf * this.nh;
				this.Tb > a && (this.Tb = a);
				b = this.Tb * this.Ec;
				a = b | 0;
				for (this.Bk = b - a; this.Z < a;) {
					for (; null != this.pg && this.qg == this.Z;)
						b = this.pg,
							b.apply(this.U),
						null != this.ic && this.ic(b),
							this.Nl();
					this.Z++;
					this.U.D(1);
				}
			}

			lr(a) {
				this.Md = a;
				a < this.Tb && this.wi();
			}

			wi() {
				this.qg = 0;
				this.Tb = this.Z = this.Pc.a = 0;
				this.U.ka(this.Pc);
				this.Nl();
			}
		}

		class Ia extends class_m {
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
				let b = new Ia;
				b.eh = a;
				return b;
			}
		}

		class class_Fb extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				0 == this.R && gc.i(a.onAnnouncementFun, this.Yc, this.color, this.style, this.on);
			}

			ua(a) {
				a.pc(StringOpsLimit.Vc(this.Yc, 1000));
				a.P(this.color);
				a.l(this.style);
				a.l(this.on);
			}

			va(a) {
				this.Yc = a.lc();
				if (1000 < this.Yc.length)
					throw GlobalError.B('message too long');
				this.color = a.N();
				this.style = a.C();
				this.on = a.C();
			}
		}

		class Ya extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R)) {
					for (var b = a.getFullPlayerById(this.R), c = a.K, d = [], e = 0, f = 0, g = 0; g < c.length;) {
						let h = c[g];
						++g;
						h.ea == Team.spec && d.push(h);
						h.ea == Team.red ? ++e : h.ea == Team.blue && ++f;
					}
					c = d.length;
					0 != c && (f == e ? 2 > c || (a.Wf(b, d[0], Team.red),
						a.Wf(b, d[1], Team.blue)) : a.Wf(b, d[0], f > e ? Team.red : Team.blue));
				}
			}

			ua() {
			}

			va() {
			}
		}

		class za extends class_m {
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
				let c = new za;
				c.tj = a;
				c.newValue = b;
				return c;
			}
		}

		class La extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R)) {
					var b = a.getFullPlayerById(this.R);
					var c = a.getFullPlayerById(this.Rd);
					null != c && 0 != c.W && c.bb != this.dh && (c.bb = this.dh,
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
				let c = new La;
				c.Rd = a;
				c.dh = b;
				return c;
			}
		}

		class Pa extends class_m {
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
				let b = new Pa;
				b.ac = a;
				return b;
			}
		}

		class fa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.Rd);
				if (null != b) {
					var c = a.getFullPlayerById(this.R);
					var d = a.Mb(this.R);
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
				this.nj = 1 == a ? Team.red : 2 == a ? Team.blue : Team.spec;
			}

			static ma(a, b) {
				let c = new fa;
				c.Rd = a;
				c.nj = b;
				return c;
			}
		}

		class Ja extends class_m {
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
				this.Ud = Stadium.ka(new J(new DataView(a.buffer, a.byteOffset, a.byteLength)));
			}

			static ma(a) {
				let b = new Ja;
				b.Ud = a;
				return b;
			}
		}

		class bb extends class_m {
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
				this.ea = 1 == b ? Team.red : 2 == b ? Team.blue : Team.spec;
				this.Yg = new TeamColors;
				this.Yg.ka(a);
			}
		}

		class class_Ka extends class_m {
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
				let b = new class_Ka;
				b.newValue = a;
				return b;
			}
		}

		class Ea extends class_m {
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
				let e = new Ea;
				e.W = a;
				e.name = b;
				e.gj = c;
				e.Zb = d;
				return e;
			}
		}

		class Hb extends class_m {
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

		class $a extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.M;
				if (null != b && a.Mb(this.R)) {
					var c = a.getFullPlayerById(this.R);
					var d = 120 == b.Pa;
					var e = 0 < b.Pa;
					this.If ? b.Pa = 120 : 120 == b.Pa && (b.Pa = 119);
					d != this.If && rc.i(a.onGamePauseFun, c, this.If, e);
				}
			}

			ua(a) {
				a.l(this.If ? 1 : 0);
			}

			va(a) {
				this.If = 0 != a.C();
			}
		}

		class Za extends class_m {
			constructor() {
				super();
			}

			hn(a) {
				if (null != a.oq) {
					let b = a.getFullPlayerById(this.R);
					return null == b ? false : a.oq(b, this.Yc);
				}
				return true;
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && Ba.i(a.onPlayerChatFun, b, this.Yc);
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

		class Ga extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				if (null != b) {
					var c = this.input;
					0 == (b.mb & 16) && 0 != (c & 16) && (b.Yb = true);
					b.mb = c;
					null != a.pq && a.pq(b);
				}
			}

			ua(a) {
				a.rb(this.input);
			}

			va(a) {
				this.input = a.fb();
			}
		}

		class Ma extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && Ba.i(a.onChatIndicatorStateChangeFun, b, this.uj);
			}

			ua(a) {
				a.l(this.uj);
			}

			va(a) {
				this.uj = a.C();
			}

			static ma(a) {
				let b = new Ma;
				b.uj = a;
				return b;
			}
		}

		class ma extends class_m {
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
						P.remove(a.K, b);
						null != a.M && P.remove(a.M.ta.G, b.J);
						gc.i(a.onPlayerLeaveFun, b, this.md, this.Wg, c);
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
				let d = new ma;
				d.W = a;
				d.md = b;
				d.Wg = c;
				return d;
			}
		}

		class Gb extends class_m {
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
					a.K = this.gn ? c.concat(d) : d.concat(c);
				}
			}

			ua(a) {
				a.l(this.gn ? 1 : 0);
				a.l(this.fh.length);
				let b = 0
					,
					c = this.fh;
				for (; b < c.length;)
					a.P(c[b++]);
			}

			va(a) {
				this.gn = 0 != a.C();
				let b = a.C();
				this.fh = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.fh.push(a.N());
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
						if (this.$m) {
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
						null != this.Ia[7] && (a.m = this.Ia[7]),
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
				a.l(this.$m ? 1 : 0);
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
				this.$m = 0 != a.C();
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

		class class_Oa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Mb(this.R) && a.ur(a.getFullPlayerById(this.R), this.min, this.rate, this.ej);
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
				let d = new class_Oa;
				d.min = a;
				d.rate = b;
				d.ej = c;
				return d;
			}
		}

		class class_Wa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				a.Mb(this.R) && a.Fr(a.getFullPlayerById(this.R));
			}

			ua() {
			}

			va() {
			}
		}

		class class_Xa extends class_m {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Mb(this.R)) {
					var b = a.getFullPlayerById(this.R);
					if (null != a.M) {
						a.M = null;
						let c = 0;
						let d = a.K;
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

		class class_Da extends class_m {
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
				let b = new class_Da
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
				return a instanceof v ? a : a instanceof Error ? new GlobalError(a.message, null, a) : new MbError(a, null, a);
			}

			static B(a) {
				return a instanceof v ? a.Dj : a instanceof Error ? a : new MbError(a);
			}
		}

		class MbError extends GlobalError {
			constructor(a, b, c) {
				super(String(a), b, c);
				this.value = a;
			}

			Db() {
				return this.value;
			}
		}

		var Cb = Cb || {},
			X;
		mc.b = true;
		Object.assign(mc.prototype, {
			g: mc
		});
		P.b = true;
		Math.b = true;
		zc.b = true;
		StringOpsInt.b = true;
		StringOps3.b = true;
		StringOpsLimit.b = true;
		oc.b = true;
		Object.assign(oc.prototype, {
			g: oc
		});
		var ka = Cb['bas.basnet.FailReason'] = {
			Qf: true,
			Wd: null,
			Ge: {
				xc: 'PeerFailed',
				lb: 0,
				Eb: 'bas.basnet.FailReason',
				toString: CastJa
			},
			He: (X = function (a) {
				return {
					lb: 1,
					code: a,
					Eb: 'bas.basnet.FailReason',
					toString: CastJa
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
				toString: CastJa
			},
			Error: {
				xc: 'Error',
				lb: 3,
				Eb: 'bas.basnet.FailReason',
				toString: CastJa
			}
		};
		ka.Wd = [ka.Ge, ka.He, ka.Fe, ka.Error];
		Qb.b = true;
		Object.assign(Qb.prototype, {
			g: Qb
		});
		Sa.b = true;
		Object.assign(Sa.prototype, {
			g: Sa
		});
		var db = Cb['bas.basnet.ConnectionRequestResponse'] = {
			Qf: true,
			Wd: null,
			yj: {
				xc: 'Accept',
				lb: 0,
				Eb: 'bas.basnet.ConnectionRequestResponse',
				toString: CastJa
			},
			Of: (X = function (a) {
				return {
					lb: 1,
					reason: a,
					Eb: 'bas.basnet.ConnectionRequestResponse',
					toString: CastJa
				};
			}
				,
				X.xc = 'Reject',
				X.Ie = ['reason'],
				X)
		};
		db.Wd = [db.yj, db.Of];
		Eb.b = true;
		Object.assign(Eb.prototype, {
			g: Eb
		});
		Jc.b = true;
		Ob.b = true;
		Object.assign(Ob.prototype, {
			g: Ob
		});
		J.b = true;
		Object.assign(J.prototype, {
			g: J
		});
		StreamWriter.b = true;
		Object.assign(StreamWriter.prototype, {
			g: StreamWriter
		});
		T.b = true;
		Object.assign(T.prototype, {
			g: T
		});
		ib.b = true;
		class_wb.b = true;
		ac.b = true;
		fc.b = true;
		Object.assign(fc.prototype, {
			g: fc
		});
		ViewUtil.b = true;
		Sb.b = true;
		Ic.b = true;
		class_m.b = true;
		Object.assign(class_m.prototype, {
			g: class_m
		});
		Ra.b = true;
		Object.assign(Ra.prototype, {
			g: Ra
		});
		WMajor.b = true;
		Object.assign(WMajor.prototype, {
			g: WMajor
		});
		class_cb.b = true;
		class_cb.ha = class_m;
		Object.assign(class_cb.prototype, {
			g: class_cb
		});
		ec.b = true;
		ec.Bj = true;
		Object.assign(ec.prototype, {
			g: ec
		});
		Rb.b = true;
		Object.assign(Rb.prototype, {
			g: Rb
		});
		kc.b = true;
		Object.assign(kc.prototype, {
			g: kc
		});
		uc.b = true;
		Object.assign(uc.prototype, {
			g: uc
		});
		Qa.b = true;
		Qa.Bj = true;
		ua.b = true;
		class_oa.b = true;
		class_oa.ha = WMajor;
		Object.assign(class_oa.prototype, {
			g: class_oa
		});
		var ia = Cb['bas.marf.net.ConnFailReason'] = {
			Qf: true,
			Wd: null,
			Fe: {
				xc: 'Cancelled',
				lb: 0,
				Eb: 'bas.marf.net.ConnFailReason',
				toString: CastJa
			},
			Ge: {
				xc: 'PeerFailed',
				lb: 1,
				Eb: 'bas.marf.net.ConnFailReason',
				toString: CastJa
			},
			He: (X = function (a) {
				return {
					lb: 2,
					reason: a,
					Eb: 'bas.marf.net.ConnFailReason',
					toString: CastJa
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
					toString: CastJa
				};
			}
				,
				X.xc = 'Other',
				X.Ie = ['description'],
				X)
		};
		ia.Wd = [ia.Fe, ia.Ge, ia.He, ia.Nf];
		class_Fa.b = true;
		class_Fa.ha = class_oa;
		Object.assign(class_Fa.prototype, {
			g: class_Fa
		});
		Xb.b = true;
		Xb.ha = class_oa;
		Object.assign(Xb.prototype, {
			g: Xb
		});
		tc.b = true;
		Object.assign(tc.prototype, {
			g: tc
		});
		nc.b = true;
		Pb.b = true;
		Object.assign(Pb.prototype, {
			g: Pb
		});
		Yb.b = true;
		Yb.ha = class_oa;
		Object.assign(Yb.prototype, {
			g: Yb
		});
		$b.b = true;
		Object.assign($b.prototype, {
			g: $b
		});
		Dc.b = true;
		Object.assign(Dc.prototype, {
			g: Dc
		});
		Point.b = true;
		Object.assign(Point.prototype, {
			g: Point
		});
		Y.b = true;
		H.b = true;
		class_E.b = true;
		Ba.b = true;
		rc.b = true;
		gc.b = true;
		class_xb.b = true;
		Object.assign(class_xb.prototype, {
			g: class_xb
		});
		Ac.b = true;
		CommandUtil.b = true;
		Object.assign(CommandUtil.prototype, {
			g: CommandUtil
		});
		Ha.b = true;
		ConnCa.b = true;
		Object.assign(ConnCa.prototype, {
			g: ConnCa
		});
		ImportantUtil.b = true;
		Object.assign(ImportantUtil.prototype, {
			g: ImportantUtil
		});
		class_vb.b = true;
		Object.assign(class_vb.prototype, {
			g: class_vb
		});
		class_na.b = true;
		Object.assign(class_na.prototype, {
			g: class_na
		});
		class_qc.b = true;
		Object.assign(class_qc.prototype, {
			g: class_qc
		});
		class_Cc.b = true;
		LocalStorageUnit.b = true;
		Object.assign(LocalStorageUnit.prototype, {
			g: LocalStorageUnit
		});
		class_ra.b = true;
		Object.assign(class_ra.prototype, {
			g: class_ra
		});
		ConnectionConstants.b = true;
		class_lc.b = true;
		Object.assign(class_lc.prototype, {
			g: class_lc
		});
		class_B.b = true;
		class_C.b = true;
		class_pc.b = true;
		Object.assign(class_pc.prototype, {
			g: class_pc
		});
		Wb.b = true;
		Object.assign(Wb.prototype, {
			g: Wb
		});
		Zb.b = true;
		kb.b = true;
		AudioUtil.b = true;
		Object.assign(AudioUtil.prototype, {
			g: AudioUtil
		});
		jc.b = true;
		Object.assign(jc.prototype, {
			g: jc
		});
		Disc.b = true;
		Object.assign(Disc.prototype, {
			g: Disc
		});
		Game.b = true;
		Game.nd = [Qa];
		Object.assign(Game.prototype, {
			g: Game
		});
		Goal.b = true;
		Object.assign(Goal.prototype, {
			g: Goal
		});
		PlayerPhysics.b = true;
		Object.assign(PlayerPhysics.prototype, {
			g: PlayerPhysics
		});
		Ub.b = true;
		Object.assign(Ub.prototype, {
			g: Ub
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
		Room.nd = [Qa, ec];
		Object.assign(Room.prototype, {
			g: Room
		});
		FullPlayer.b = true;
		FullPlayer.nd = [Qa];
		Object.assign(FullPlayer.prototype, {
			g: FullPlayer
		});
		Ia.b = true;
		Ia.ha = class_m;
		Object.assign(Ia.prototype, {
			g: Ia
		});
		class_Fb.b = true;
		class_Fb.ha = class_m;
		Object.assign(class_Fb.prototype, {
			g: class_Fb
		});
		Ya.b = true;
		Ya.ha = class_m;
		Object.assign(Ya.prototype, {
			g: Ya
		});
		za.b = true;
		za.ha = class_m;
		Object.assign(za.prototype, {
			g: za
		});
		La.b = true;
		La.ha = class_m;
		Object.assign(La.prototype, {
			g: La
		});
		Pa.b = true;
		Pa.ha = class_m;
		Object.assign(Pa.prototype, {
			g: Pa
		});
		fa.b = true;
		fa.ha = class_m;
		Object.assign(fa.prototype, {
			g: fa
		});
		Ja.b = true;
		Ja.ha = class_m;
		Object.assign(Ja.prototype, {
			g: Ja
		});
		bb.b = true;
		bb.ha = class_m;
		Object.assign(bb.prototype, {
			g: bb
		});
		class_Ka.b = true;
		class_Ka.ha = class_m;
		Object.assign(class_Ka.prototype, {
			g: class_Ka
		});
		Ea.b = true;
		Ea.ha = class_m;
		Object.assign(Ea.prototype, {
			g: Ea
		});
		Hb.b = true;
		Hb.ha = class_m;
		Object.assign(Hb.prototype, {
			g: Hb
		});
		$a.b = true;
		$a.ha = class_m;
		Object.assign($a.prototype, {
			g: $a
		});
		Za.b = true;
		Za.ha = class_m;
		Object.assign(Za.prototype, {
			g: Za
		});
		Ga.b = true;
		Ga.ha = class_m;
		Object.assign(Ga.prototype, {
			g: Ga
		});
		Ma.b = true;
		Ma.ha = class_m;
		Object.assign(Ma.prototype, {
			g: Ma
		});
		class_Hc.b = true;
		ma.b = true;
		ma.ha = class_m;
		Object.assign(ma.prototype, {
			g: ma
		});
		Gb.b = true;
		Gb.ha = class_m;
		Object.assign(Gb.prototype, {
			g: Gb
		});
		class_Ib.b = true;
		class_Ib.ha = class_m;
		Object.assign(class_Ib.prototype, {
			g: class_Ib
		});
		class_Oa.b = true;
		class_Oa.ha = class_m;
		Object.assign(class_Oa.prototype, {
			g: class_Oa
		});
		class_Wa.b = true;
		class_Wa.ha = class_m;
		Object.assign(class_Wa.prototype, {
			g: class_Wa
		});
		class_Xa.b = true;
		class_Xa.ha = class_m;
		Object.assign(class_Xa.prototype, {
			g: class_Xa
		});
		class_Da.b = true;
		class_Da.ha = class_m;
		Object.assign(class_Da.prototype, {
			g: class_Da
		});
		DynamicDisc.b = true;
		DynamicDisc.nd = [Qa];
		Object.assign(DynamicDisc.prototype, {
			g: DynamicDisc
		});
		Joint.b = true;
		Joint.nd = [Qa];
		Object.assign(Joint.prototype, {
			g: Joint
		});
		DynamicObjectsUtil.b = true;
		DynamicObjectsUtil.nd = [Qa];
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
		class_V.b = true;
		Object.assign(class_V.prototype, {
			g: class_V
		});
		BigAnimatedText.b = true;
		Object.assign(BigAnimatedText.prototype, {
			g: BigAnimatedText
		});
		BigTextUtil.b = true;
		Object.assign(BigTextUtil.prototype, {
			g: BigTextUtil
		});
		Db.b = true;
		Object.assign(Db.prototype, {
			g: Db
		});
		class_ob.b = true;
		Object.assign(class_ob.prototype, {
			g: class_ob
		});
		ChatboxView.b = true;
		Object.assign(ChatboxView.prototype, {
			g: ChatboxView
		});
		dc.b = true;
		Object.assign(dc.prototype, {
			g: dc
		});
		class_nb.b = true;
		Object.assign(class_nb.prototype, {
			g: class_nb
		});
		class_pb.b = true;
		Object.assign(class_pb.prototype, {
			g: class_pb
		});
		CreateRoomView.b = true;
		Object.assign(CreateRoomView.prototype, {
			g: CreateRoomView
		});
		class_Ta.b = true;
		Object.assign(class_Ta.prototype, {
			g: class_Ta
		});
		GameStateView.b = true;
		Object.assign(GameStateView.prototype, {
			g: GameStateView
		});
		wc.b = true;
		Object.assign(wc.prototype, {
			g: wc
		});
		GameView.b = true;
		Object.assign(GameView.prototype, {
			g: GameView
		});
		class_zb.b = true;
		Object.assign(class_zb.prototype, {
			g: class_zb
		});
		class_tb.b = true;
		Object.assign(class_tb.prototype, {
			g: class_tb
		});
		class_ub.b = true;
		Object.assign(class_ub.prototype, {
			g: class_ub
		});
		PingGraph.b = true;
		Object.assign(PingGraph.prototype, {
			g: PingGraph
		});
		class_jb.b = true;
		Object.assign(class_jb.prototype, {
			g: class_jb
		});
		PlayerListItem.b = true;
		Object.assign(PlayerListItem.prototype, {
			g: PlayerListItem
		});
		class_Aa.b = true;
		Object.assign(class_Aa.prototype, {
			g: class_Aa
		});
		aa.b = true;
		Object.assign(aa.prototype, {
			g: aa
		});
		class_Na.b = true;
		Object.assign(class_Na.prototype, {
			g: class_Na
		});
		class_yb.b = true;
		Object.assign(class_yb.prototype, {
			g: class_yb
		});
		class_Bb.b = true;
		Object.assign(class_Bb.prototype, {
			g: class_Bb
		});
		RoomListView.b = true;
		Object.assign(RoomListView.prototype, {
			g: RoomListView
		});
		Notice.b = true;
		Object.assign(Notice.prototype, {
			g: Notice
		});
		class_fb.b = true;
		Object.assign(class_fb.prototype, {
			g: class_fb
		});
		RoomMenuView.b = true;
		Object.assign(RoomMenuView.prototype, {
			g: RoomMenuView
		});
		class_la.b = true;
		Object.assign(class_la.prototype, {
			g: class_la
		});
		class_ba.b = true;
		Object.assign(class_ba.prototype, {
			g: class_ba
		});
		StatsView.b = true;
		Object.assign(StatsView.prototype, {
			g: StatsView
		});
		class_qb.b = true;
		Object.assign(class_qb.prototype, {
			g: class_qb
		});
		GlobalError.b = true;
		GlobalError.ha = Error;
		Object.assign(GlobalError.prototype, {
			g: GlobalError
		});
		MbError.b = true;
		MbError.ha = GlobalError;
		Object.assign(MbError.prototype, {
			g: MbError
		});
		Ec.b = true;
		Object.assign(Ec.prototype, {
			g: Ec
		});
		class_w.b = true;
		globalScope.xj |= 0;
		'undefined' != typeof performance && 'function' == typeof performance.now && (P.now = performance.now.bind(performance));
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
		var Vb = {}
			,
			Lc = {}
			,
			D = Number
			,
			Bc = Boolean
			,
			Mc = {}
			,
			Nc = {};
		Team.spec = new Team(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
		Team.red = new Team(1, 15035990, -1, 8, 'Red', 't-red', 15035990, 2);
		Team.blue = new Team(2, 5671397, 1, 16, 'Blue', 't-blue', 625603, 4);
		Team.spec.enemyTeam = Team.spec;
		Team.red.enemyTeam = Team.blue;
		Team.blue.enemyTeam = Team.red;
		class_w.An = {}.toString;
		Sa.ho = {
			mandatory: {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false
			}
		};
		T.ph = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};
		T.vm = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};
		class_wb.bp = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
		class_m.wb = false;
		class_m.Ym = new Map;
		class_m.Ff = 0;
		WMajor.wb = false;
		class_cb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		ua.Cc = 0;
		nc.channels = [{
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
		Y.zj = 'application/x-www-form-urlencoded';
		Ha.$a = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
		ConnectionConstants.ds = 'wss://p2p.haxball.com/';
		ConnectionConstants.Me = 'https://www.haxball.com/rs/';
		ConnectionConstants.fg = [{
			urls: 'stun:stun.l.google.com:19302'
		}];
		ConnectionConstants.o = new class_qc;
		Game.gl = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(new Point(0, 0));
			}
			return a;
		}(this);
		Game.mk = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(0);
			}
			return a;
		}(this);
		Stadium.Mr = StreamWriter.ia(1024);
		Ia.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Fb.ya = class_m.Ea({
			za: false,
			delay: false,
			qj: {
				dj: 10,
				wj: 900
			}
		});
		Ya.ya = class_m.Ea({
			za: false,
			delay: false
		});
		za.ya = class_m.Ea({
			za: false,
			delay: false
		});
		La.ya = class_m.Ea({
			za: false,
			delay: false
		});
		Pa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		fa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		Ja.ya = class_m.Ea({
			za: false,
			delay: false,
			qj: {
				dj: 10,
				wj: 2000
			}
		});
		bb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ka.ya = class_m.Ea({
			za: false,
			delay: false
		});
		Ea.ya = class_m.Ea({
			za: false,
			delay: false
		});
		Hb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		$a.ya = class_m.Ea({});
		Za.ya = class_m.Ea({
			za: false,
			delay: false,
			qj: {
				dj: 10,
				wj: 900
			}
		});
		Ga.ya = class_m.Ea({});
		Ma.ya = class_m.Ea({
			za: false,
			delay: false
		});
		ma.ya = class_m.Ea({
			za: false,
			delay: false
		});
		Gb.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Ib.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Oa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Wa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Xa.ya = class_m.Ea({
			za: false,
			delay: false
		});
		class_Da.ya = class_m.Ea({
			za: false,
			delay: false
		});
		Segment.tn = .17435839227423353;
		Segment.sn = 5.934119456780721;
		BigAnimatedText.qn = new $b([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
		BigAnimatedText.rn = new $b([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
		class_ob.O = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		ChatboxView.O = '<div class=\'chatbox-view\'><div data-hook=\'drag\' class=\'drag\'></div><div data-hook=\'log\' class=\'log thin-scrollbar\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /></div></div>';
		class_nb.O = '<div class=\'choose-nickname-view\'><img src="images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
		class_pb.O = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
		CreateRoomView.O = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
		class_Ta.O = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
		GameStateView.O = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
		GameView.O = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'gameplay-section\' data-hook=\'gameplay\'></div><div class=\'top-section\' data-hook=\'top-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'buttons\'><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i>Settings</button></div></div><div data-hook=\'popups\'></div></div>';
		class_zb.O = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
		class_tb.O = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
		class_ub.O = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		class_jb.O = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
		PlayerListItem.O = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
		class_Aa.O = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list thin-scrollbar\' data-hook=\'list\'></div></div>';
		class_Na.O = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
		class_yb.O = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
		class_Bb.vj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
		RoomListView.vj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
		class_fb.O = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
		RoomMenuView.O = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
		class_la.O = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat opacity </div><div style="width: 40px" data-hook="chatopacity-value">1</div><input class="slider" type="range" min="0.5" max="1" step="0.01" data-hook="chatopacity-range"></div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat focus height </div><div style="width: 40px" data-hook="chatfocusheight-value">200</div><input class="slider" type="range" min="0" max="400" step="10" data-hook="chatfocusheight-range"></div></div></div></div>';
		class_la.im = 0;
		class_ba.O = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
		StatsView.O = '<div class=\'stats-view\'><p data-hook=\'ping\'></p><p data-hook=\'fps\'></p><div data-hook=\'graph\'></div></div>';
		class_qb.O = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="images/opera-icon.png"/>Opera</a></div></div></div>';
		class_B.yp();
	}
)(typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : this);
