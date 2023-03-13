(function (qc) {
	function hc() {
	}

	function r() {
	}

	function q(a) {
		this.Ta = a;
		if (Error.captureStackTrace)
			Error.captureStackTrace(this, q);
	}

	function Wa(a) {
		this.g = v.Ga(Wa.N);
		v.Ea(this.g).get('features').textContent = a.join(', ');
	}

	function Xa() {
		this.nl = new Qb;
		this.g = v.Ga(Xa.N);
		var a = v.Ea(this.g);
		this.rg = a.get('ping');
		this.wp = a.get('max-ping');
		this.wo = a.get('fps');
		v.xe(a.get('graph'), this.nl.g);
	}

	function P(a, b, c) {
		var d = this;
		this.g = v.Ga(P.N);
		var e = v.Ea(this.g);
		e.get('ok');
		e.get('cancel');
		this.Vd = e.get('content');
		for (var f = e.get('title'), e = e.get('buttons'), g = 0, k = 0; k < c.length;) {
			var l = c[k++];
			var t = window.document.createElement('button');
			t.textContent = l;
			t.onclick = (a => () => y.i(d.Va, a[0]))([g++]);
			e.appendChild(t);
		}
		this.Vd.textContent = b;
		f.textContent = a;
	}

	function aa(a) {
		function b(a) {
			var b = window.document.createElement('div');
			b.className = 'inputrow';
			var c = window.document.createElement('div');
			c.textContent = a;
			b.appendChild(c);
			for (var c = p.Eo(a), d = 0; c.length > d;) {
				var e = [c[d]];
				++d;
				var f = [window.document.createElement('div')];
				var g = e[0];
				if (J.startsWith(e[0], 'Key'))
					g = D.substr(e[0], 3, null);
				f[0].textContent = g;
				b.appendChild(f[0]);
				g = window.document.createElement('i');
				g.className = 'icon-cancel';
				g.onclick = ((a, b) => () => {
					p.Jq(b[0]);
					n.A.tg.Xa(p);
					a[0].remove();
				})(f, e);
				f[0].appendChild(g);
			}
			c = window.document.createElement('i');
			c.className = 'icon-plus';
			b.appendChild(c);
			c.onclick = () => {
				q.classList.toggle('show', true);
				q.focus();
				q.onkeydown = b => {
					q.classList.toggle('show', false);
					b.stopPropagation();
					b = b.code;
					if (p.L(b) == null) {
						p.Pa(b, a);
						n.A.tg.Xa(p);
						r();
					}
				};
			};
			return b;
		}

		function c(a, b, c) {
			a = l.get(a);
			if (c == null)
				a.hidden = true;
			else {
				a.innerHTML = b + ': <div class=\'flagico\'></div> <span></span>';
				b = a.querySelector('.flagico');
				a = a.querySelector('span');
				try {
					b.classList.add('f-' + c.ub);
				}
				catch (vc) {
				}
				a.textContent = c.ub.toUpperCase();
			}
		}

		function d(a, b, c, d) {
			var e = l.get(a);
			e.selectedIndex = d(b.L());
			e.onchange = () => {
				var a = c(e.selectedIndex);
				b.Xa(a);
			};
		}

		function e(a, b, c) {
			function d(a) {
				e.classList.toggle('icon-ok', a);
				e.classList.toggle('icon-cancel', !a);
			}

			a = l.get(a);
			a.classList.add('toggle');
			var e = window.document.createElement('i');
			e.classList.add('icon-ok');
			a.insertBefore(e, a.firstChild);
			a.onclick = () => {
				var a = !b.L();
				b.Xa(a);
				d(a);
				if (c != null)
					c(a);
			};
			d(b.L());
		}

		function f(a) {
			var b = {Jm: l.get(a + 'btn'), bh: l.get(a + 'sec')};
			t.push(b);
			b.Jm.onclick = () => g(b);
		}

		function g(a) {
			for (var b = 0, c = 0; t.length > c;) {
				var d = t[c];
				++c;
				var e = a == d;
				if (e)
					aa.$l = b;
				d.bh.classList.toggle('selected', e);
				d.Jm.classList.toggle('selected', e);
				++b;
			}
		}

		if (a == null)
			a = false;
		var k = this;
		this.g = v.Ga(aa.N);
		var l = v.Ea(this.g);
		this.nd = l.get('close');
		var t = [];
		f('sound');
		f('video');
		f('misc');
		f('input');
		g(t[aa.$l]);
		e('tsound-main', n.A.pm, a => n.Na.im(a ? 1 : 0));
		e('tsound-chat', n.A.Hi);
		e('tsound-highlight', n.A.om);
		e('tsound-crowd', n.A.nm);
		d('viewmode', n.A.Tb, a => a - 1, a => a + 1);
		d('fps', n.A.Fh, a => a, a => a);
		var h = [1, .75, .5, .25];
		d('resscale', n.A.Sl, a => h[a], a => {
			for (var b = 0, c = h.length - 1; c > b && !(a >= h[b]);) {
				++b;
			}
			return b;
		});
		e('tvideo-teamcol', n.A.xm);
		e('tvideo-showindicators', n.A.Ak);
		e('tvideo-showavatars', n.A.lm);
		var m = null;
		var m = () => {
			var b = n.A.Ne.L();
			c('loc', 'Detected location', n.A.Me.L());
			c('loc-ovr', 'Location override', b);
			var d = l.get('loc-ovr-btn');
			d.disabled = !a;
			if (b == null) {
				d.textContent = 'Override location';
				d.onclick = () => A.i(k.Ep);
			}
			else {
				d.textContent = 'Remove override';
				d.onclick = () => {
					n.A.Ne.Xa(null);
					m();
				};
			}
		};
		m();
		var p = n.A.tg.L();
		var q = l.get('presskey');
		var r;
		var u = l.get('inputsec');
		r = () => {
			v.Cf(u);
			var a = b('Up');
			u.appendChild(a);
			a = b('Down');
			u.appendChild(a);
			a = b('Left');
			u.appendChild(a);
			a = b('Right');
			u.appendChild(a);
			a = b('Kick');
			u.appendChild(a);
		};
		r();
		this.nd.onclick = () => A.i(k.qb);
	}

	function Ya(a) {
		this.fk = false;
		this.qm = new za(p.Ia);
		this.Lj = new za(p.xa);
		this.Hl = new za(p.fa);
		var b = this;
		this.g = v.Ga(Ya.N);
		var c = v.Ea(this.g);
		this.jc = c.get('room-name');
		this.tm = c.get('start-btn');
		this.vm = c.get('stop-btn');
		this.gi = c.get('pause-btn');
		this.xn = c.get('auto-btn');
		this.Nk = c.get('lock-btn');
		this.Rl = c.get('reset-all-btn');
		this.Fl = c.get('rec-btn');
		var d = c.get('link-btn');
		var e = c.get('leave-btn');
		var f = c.get('rand-btn');
		this.wf = c.get('time-limit-sel');
		this.qf = c.get('score-limit-sel');
		this.rm = c.get('stadium-name');
		this.sm = c.get('stadium-pick');
		this.sm.onclick = () => A.i(b.Xp);
		this.Th(c.get('red-list'), this.Hl, p.fa, a);
		this.Th(c.get('blue-list'), this.Lj, p.xa, a);
		this.Th(c.get('spec-list'), this.qm, p.Ia, a);
		this.Uk(this.wf, this.Tk(15));
		this.Uk(this.qf, this.Tk(15));
		this.wf.onchange = () => y.i(b.aq, b.wf.selectedIndex);
		this.qf.onchange = () => y.i(b.Tp, b.qf.selectedIndex);
		this.tm.onclick = () => A.i(b.Yp);
		this.vm.onclick = () => A.i(b.Zp);
		this.gi.onclick = () => A.i(b.Mp);
		this.xn.onclick = () => A.i(b.Dp);
		this.Nk.onclick = () => y.i(b.$p, !b.Xh);
		this.Rl.onclick = () => {
			if (b.ee != null) {
				b.ee(p.xa);
				b.ee(p.fa);
			}
		};
		this.Fl.onclick = () => A.i(b.Qp);
		d.onclick = () => A.i(b.Wp);
		e.onclick = () => A.i(b.de);
		f.onclick = () => A.i(b.Pp);
		this.Bj(false);
		this.Cj(false);
	}

	function Za() {
		var a = this;
		this.g = v.Ga(Za.N);
		var b = v.Ea(this.g);
		this.Cb = b.get('input');
		this.af = b.get('ok');
		b.get('cancel').onclick = () => {
			if (a.Va != null)
				a.Va(null);
		};
		this.Cb.maxLength = 30;
		this.Cb.oninput = () => a.C();
		this.Cb.onkeydown = b => {
			if (b.keyCode == 13 && a.Dc() && a.Va != null)
				a.Va(a.Cb.value);
		};
		this.af.onclick = () => {
			if (a.Dc() && a.Va != null)
				a.Va(a.Cb.value);
		};
		this.C();
	}

	function $a(a) {
		this.Xk = a.get('notice');
		this.$n = a.get('notice-contents');
		this.nd = a.get('notice-close');
		this.Il();
	}

	function Aa(a) {
		function b(a, checkedByDefault = true) {
			function b() {
				e.className = f.Ta ? 'icon-ok' : 'icon-cancel';
			}

			a = d.get(a);
			var e = a.querySelector('i');
			var f = {Ta: checkedByDefault};
			b();
			a.onclick = () => {
				f.Ta = !f.Ta;
				b();
				c.bn(c.dj);
			};
			return f;
		}

		this.dj = [];
		var c = this;
		this.gs = a;
		this.Ja = v.Ga(Aa.tj);
		var d = v.Ea(this.Ja);
		var e = new $a(d);
		this.pj = d.get('refresh');
		this.Tm = d.get('join');
		a = d.get('create');
		this.cs = d.get('count');
		a.onclick = () => A.i(c.ws);
		d.get('changenick').onclick = () => A.i(c.vs);
		d.get('settings').onclick = () => A.i(c.ys);
		var f = d.get('replayfile');
		f.onchange = () => {
			var a = f.files;
			if (a.length >= 1) {
				var a = a.item(0);
				var b = new FileReader;
				b.onload = () => y.i(c.xs, b.result);
				b.readAsArrayBuffer(a);
			}
		};
		this.fs = b('fil-full', true);
		this.zs = b('fil-pass', false);
		this.ns = d.get('listscroll');
		this.Bs = Ba.cg(this.ns);
		this.gj = d.get('list');
		this.pj.onclick = () => {
			e.Il();
			c.Om();
		};
		this.Tm.onclick = () => {
			if (c.Od != null)
				y.i(c.Ym, c.Od.Fs);
		};
		this.Om();
	}

	function ab(a) {
		this.Ja = v.Ga(ab.tj, 'tbody');
		var b = v.Ea(this.Ja);
		var c = b.get('name');
		var d = b.get('players');
		var e = b.get('distance');
		var f = b.get('pass');
		var b = b.get('flag');
		this.Fs = a;
		var g = a.vd;
		c.textContent = g.w;
		d.textContent = '' + g.I + '/' + g.Xe;
		f.textContent = g.Ib ? 'Yes' : 'No';
		e.textContent = '' + (a.Le | 0) + 'km';
		try {
			b.classList.add('f-' + g.ub.toLowerCase());
		}
		catch (k) {
		}
		if (a.vd.Id < 9)
			this.Ja.classList.add('old');
	}

	function bb() {
		this.gk = null;
		var a = this;
		this.g = v.Ga(bb.N);
		var b = v.Ea(this.g);
		this.Zf = b.get('link');
		var c = b.get('copy');
		var b = b.get('close');
		this.Zf.onfocus = () => a.Zf.select();
		c.onclick = () => {
			a.Zf.select();
			return window.document.execCommand('Copy');
		};
		b.onclick = () => A.i(a.qb);
	}

	function ha(a) {
		function b() {
			var b = g[f];
			a.pl = e ? b : 0;
			d.get('spd').textContent = b + 'x';
		}

		this.Wf = false;
		var c = this;
		this.g = v.Ga(ha.N);
		var d = v.Ea(this.g);
		this.ti = a;
		d.get('reset').onclick = () => {
			a.ui();
			c.el();
		};
		var e = true;
		var f = 2;
		var g = [.5, .75, 1, 2, 3];
		b();
		var k = d.get('playicon');
		k.classList.add('icon-pause');
		d.get('play').onclick = () => {
			e = !e;
			var a = k.classList;
			a.toggle('icon-play', !e);
			a.toggle('icon-pause', e);
			b();
		};
		d.get('spdup').onclick = () => {
			f += 1;
			var a = g.length - 1;
			if (a < f)
				f = a;
			b();
		};
		d.get('spddn').onclick = () => {
			--f;
			if (f < 0)
				f = 0;
			b();
		};
		this.Er = d.get('time');
		var l = d.get('timebar');
		this.Aq = d.get('progbar');
		for (var t = d.get('timetooltip'), h = 0, m = a.Vk; m.length > h;) {
			var n = m[h];
			++h;
			var p = window.document.createElement('div');
			p.className = 'marker';
			p.classList.add('k' + n.kind);
			p.style.left = 100 * n.mj + '%';
			l.appendChild(p);
		}
		l.onclick = b => {
			a.er((b.pageX - l.offsetLeft) / l.clientWidth * a.mh * a.mf);
			if (!c.Wf) {
				c.Wf = true;
				c.Vp();
				c.el();
			}
		};
		l.onmousemove = b => {
			b = (b.pageX - l.offsetLeft) / l.clientWidth;
			t.textContent = ha.Wk(a.mf * a.mh * b);
			return t.style.left = 'calc(' + 100 * b + '% - 30px)';
		};
		this.fp = d.get('leave');
		this.fp.onclick = () => A.i(c.de);
	}

	function Q(a) {
		var b = this;
		var c = new P('Only humans', '', []);
		this.g = c.g;
		c.Vd.style.minHeight = '78px';
		Ja.gp().then(d => {
			if (Q.xg == null) {
				Q.xg = window.document.createElement('div');
				c.Vd.appendChild(Q.xg);
				Q.Dq = d.render(Q.xg, {
					sitekey: a, callback: a => y.i(Q.Gl, a), theme: 'dark'
				});
			}
			d.reset(Q.Dq);
			Q.Gl = a => {
				window.setTimeout(() => y.i(b.Va, a), 1000);
				Q.Gl = null;
			};
			c.Vd.appendChild(Q.xg);
		});
	}

	function za(a) {
		this.xd = new Map;
		var b = this;
		this.g = v.Ga(za.N);
		this.g.className += ' ' + a.io;
		var c = v.Ea(this.g);
		this.ab = c.get('list');
		this.Vh = c.get('join-btn');
		this.vi = c.get('reset-btn');
		if (p.Ia == a)
			this.vi.remove();
		this.Vh.textContent = '' + a.w;
		this.g.ondragover = this.g.Qs = a => {
			if (a.dataTransfer.types.indexOf('player') != -1)
				a.preventDefault();
		};
		this.g.ondrop = c => {
			c.preventDefault();
			c = c.dataTransfer.getData('player');
			if (c != null) {
				c = K.parseInt(c);
				if (c != null)
					ia.i(b.mg, c, a);
			}
		};
		this.Vh.onclick = () => y.i(b.Kp, a);
		this.vi.onclick = () => y.i(b.ee, a);
	}

	function cb(a) {
		var b = this;
		this.w = a.w;
		this.yb = a.yb;
		this.$ = a.V;
		this.g = v.Ga(cb.N);
		var c = v.Ea(this.g);
		this.Ze = c.get('name');
		this.rg = c.get('ping');
		try {
			c.get('flag').classList.add('f-' + a.Kd);
		}
		catch (d) {
		}
		this.Ze.textContent = this.w;
		this.rg.textContent = '' + this.yb;
		this.g.ondragstart = a => a.dataTransfer.setData('player', K.ye(b.$));
		this.g.oncontextmenu = a => {
			a.preventDefault();
			y.i(b.ff, b.$);
		};
		this.em(a.cb);
	}

	function db(a, b) {
		var c = this;
		this.g = v.Ga(db.N);
		var d = v.Ea(this.g);
		this.Ze = d.get('name');
		this.Hf = d.get('admin');
		this.Qe = d.get('kick');
		this.nd = d.get('close');
		this.Hf.onclick = () => ia.i(c.Cp, c.Nb, !c.ql);
		this.Qe.onclick = () => y.i(c.ei, c.Nb);
		this.nd.onclick = () => A.i(c.qb);
		this.Nb = a.V;
		this.Ej(a.w);
		this.Dj(a.cb);
		this.Hf.disabled = !b || this.Nb == 0;
		this.Qe.disabled = !b || this.Nb == 0;
	}

	function Qb() {
		this.Ah = 0;
		this.vp = 400;
		this.yk = 64;
		this.Vi = 32;
		this.sa = window.document.createElement('canvas');
		this.Qf = window.document.createElement('canvas');
		this.g = window.document.createElement('div');
		this.Qf.width = this.sa.width = this.Vi;
		this.Qf.height = this.sa.height = this.yk;
		this.Eh = this.Qf.getContext('2d', null);
		this.c = this.sa.getContext('2d', null);
		this.c.fillStyle = 'green';
		for (var a = [], b = 0, c = this.Vi; c > b; b++) {
			a.push(0);
		}
		this.fq = a;
		this.g.appendChild(this.Qf);
		this.g.className = 'graph';
	}

	function eb() {
		this.jb = null;
		var a = this;
		this.g = v.Ga(eb.N);
		var b = v.Ea(this.g);
		b.get('cancel').onclick = () => A.i(a.ci);
		this.hi = b.get('pick');
		this.bk = b.get('delete');
		this.rk = b.get('export');
		var c = b.get('list');
		var d = b.get('file');
		this.Lg();
		this.hi.onclick = () => a.jb != null && a.jb.Pd().then(b => y.i(a.og, b));
		this.bk.onclick = () => {
			if (a.jb != null) {
				var b = a.jb.Lm;
				if (b != null) {
					a.jb.Ja.remove();
					a.jb = null;
					b();
					a.Lg();
				}
			}
		};
		this.rk.onclick = () => a.jb != null && a.jb.Pd().then(a => Ca.br(a.se(), a.w + '.hbs'));
		this.ki(c);
		this.vg = Ba.cg(c);
		window.setTimeout(() => a.vg.update(), 0);
		d.onchange = () => {
			var b = d.files;
			if (b.length >= 1) {
				var b = b.item(0);
				var c = new FileReader;
				c.onload = () => {
					try {
						var b = new h;
						b.Lk(c.result);
						y.i(a.og, b);
					}
					catch (k) {
						if (k instanceof q) {
							b = k.Ta;
							if (b instanceof SyntaxError)
								y.i(a.fi, 'SyntaxError in line: ' + K.ye(b.lineNumber));
							else {
								if (b instanceof Bb)
									y.i(a.fi, b.xp);
								else
									y.i(a.fi, 'Error loading stadium file.');
							}
						}
						else {
							b = k;
							if (b instanceof SyntaxError)
								y.i(a.fi, 'SyntaxError in line: ' + K.ye(b.lineNumber));
							else {
								if (b instanceof Bb)
									y.i(a.fi, b.xp);
								else
									y.i(a.fi, 'Error loading stadium file.');
							}
						}
					}
				};
				c.readAsText(b);
			}
		};
	}

	function fb() {
		var a = this;
		this.g = v.Ga(fb.N);
		var b = v.Ea(this.g);
		b.get('cancel').onclick = () => y.i(a.qb, false);
		b.get('leave').onclick = () => y.i(a.qb, true);
	}

	function gb(a) {
		var b = this;
		this.g = v.Ga(gb.N);
		var c = v.Ea(this.g);
		this.Ze = c.get('title');
		this.oi = c.get('reason');
		this.yn = c.get('ban-btn');
		this.An = c.get('ban-text');
		this.Qe = c.get('kick');
		this.nd = c.get('close');
		this.yn.onclick = () => b.Aj(!b.Jj);
		this.nd.onclick = () => A.i(b.qb);
		this.Qe.onclick = () => Cb.i(b.ei, b.Nb, b.oi.value, b.Jj);
		this.oi.onkeydown = a => a.stopPropagation();
		this.oi.maxLength = 100;
		this.Nb = a.V;
		this.Ze.textContent = 'Kick ' + a.w;
		this.Aj(false);
	}

	function ja(a) {
		this.Fb = new hb;
		this.Gd = false;
		this.pe = new Xa;
		this.Qa = new Da;
		var b = this;
		this.Wa = new Ya(a);
		this.Fb.Nb = a;
		this.g = v.Ga(ja.N);
		a = v.Ea(this.g);
		this.Jh = a.get('gameplay-section');
		this.hf = a.get('popups');
		this.hf.style.display = 'none';
		v.xe(a.get('chatbox'), this.Qa.g);
		v.xe(a.get('stats'), this.pe.g);
		this.bi = a.get('menu');
		this.bi.onclick = () => {
			b.me(!b.Gd);
			b.bi.blur();
		};
		a.get('settings').onclick = () => {
			var a = new aa;
			a.qb = () => b.bb(null);
			b.bb(a.g);
		};
		this.Jh.appendChild(this.Fb.g);
		this.Wa.de = () => {
			var a = new fb;
			a.qb = a => {
				b.bb(null);
				if (a)
					A.i(b.de);
			};
			b.bb(a.g);
		};
		this.Wa.Xp = () => {
			var a = new eb;
			a.ci = () => b.bb(null);
			a.og = a => {
				y.i(b.og, a);
				b.bb(null);
			};
			a.fi = a => {
				a = new P('Error loading stadium', a, ['Ok']);
				a.Va = () => b.bb(null);
				b.bb(a.g);
			};
			b.bb(a.g);
		};
	}

	function Rb() {
		this.Da = 0;
		this.hk = this.ik = false;
		this.Ke = 0;
		this.g = window.document.createElement('div');
		this.g.className = 'game-timer-view';
		this.g.appendChild(this.bq = this.Wd('OVERTIME!', 'overtime'));
		this.g.appendChild(this.zp = this.Wd('0', 'digit'));
		this.g.appendChild(this.yp = this.Wd('0', 'digit'));
		this.g.appendChild(this.Wd(':', null));
		this.g.appendChild(this.dr = this.Wd('0', 'digit'));
		this.g.appendChild(this.cr = this.Wd('0', 'digit'));
	}

	function hb() {
		this.Nb = -1;
		this.Eb = new N;
		this.xc = new Rb;
		this.g = v.Ga(hb.N);
		var a = v.Ea(this.g);
		this.Pb = new Db(a.get('red-score'), 0);
		this.Kb = new Db(a.get('blue-score'), 0);
		v.xe(a.get('timer'), this.xc.g);
		v.xe(a.get('canvas'), this.Eb.sa);
	}

	function Ka(a, b) {
		var c = this;
		this.g = v.Ga(Ka.N);
		var d = v.Ea(this.g);
		this.Bp = d.get('ok');
		this.Bp.onclick = () => A.i(c.Va);
		this.Nl = d.get('replay');
		var e = b != null;
		this.Nl.hidden = !e;
		if (e) {
			this.Nl.onclick = () => ba.Yl(b);
		}
		d.get('reason').textContent = a;
	}

	function ib(a) {
		var b = this;
		this.g = v.Ga(ib.N);
		var c = v.Ea(this.g);
		this.vh = c.get('cancel');
		this.Wj = c.get('create');
		this.$e = c.get('name');
		this.kl = c.get('pass');
		this.ai = c.get('max-pl');
		this.Em = c.get('unlisted');
		this.$e.maxLength = 40;
		this.$e.value = a;
		this.$e.oninput = () => b.C();
		this.kl.maxLength = 30;
		this.Em.onclick = () => b.Fj(!b.Fm);
		this.vh.onclick = () => A.i(b.ci);
		this.Wj.onclick = () => {
			if (b.Dc()) {
				var a = b.kl.value;
				if (a == '')
					a = null;
				y.i(b.Jp, {name: b.$e.value, password: a, qs: b.ai.selectedIndex + 2, Ks: b.Fm});
			}
		};
		for (a = 2; a < 21; a++) {
			c = window.document.createElement('option');
			c.textContent = '' + a;
			this.ai.appendChild(c);
		}
		this.ai.selectedIndex = 10;
		this.Fj(false);
		this.C();
	}

	function jb() {
		this.g = v.Ga(jb.N);
		var a = v.Ea(this.g);
		this.dc = a.get('log');
		this.vh = a.get('cancel');
	}

	function kb(a) {
		function b() {
			if (c.Dc() && c.cl != null)
				c.cl(c.Cb.value);
		}

		var c = this;
		this.g = v.Ga(kb.N);
		var d = v.Ea(this.g);
		this.Cb = d.get('input');
		this.af = d.get('ok');
		this.Cb.maxLength = 25;
		this.Cb.value = a;
		this.Cb.oninput = () => c.C();
		this.Cb.onkeydown = a => {
			if (a.keyCode == 13)
				b();
		};
		this.af.onclick = b;
		this.C();
	}

	function lb(a, b) {
		this.Hj = [];
		this.Iq = /[#@][^\s@#]*$/;
		this.Mb = a;
		this.Rp = b;
		a.hidden = true;
	}

	function Da() {
		function a() {
			if (b.fl != null && b.gb.value != '')
				b.fl(b.gb.value);
			b.gb.value = '';
			b.gb.blur();
		}

		var b = this;
		this.g = v.Ga(Da.N);
		var c = v.Ea(this.g);
		this.dc = c.get('log');
		this.vg = Ba.cg(this.dc);
		this.gb = c.get('input');
		this.gb.maxLength = 140;
		c.get('send').onclick = a;
		this.Bc = new lb(c.get('autocompletebox'), (a, c) => {
			b.gb.value = a;
			b.gb.setSelectionRange(c, c);
		});
		this.gb.onkeydown = c => {
			switch (c.keyCode) {
				case 9:
					if (!b.Bc.Mb.hidden) {
						b.Bc.qo();
						c.preventDefault();
					}
					break;
				case 13:
					a();
					break;
				case 27:
					if (b.Bc.Mb.hidden) {
						b.gb.value = '';
						b.gb.blur();
					}
					else
						b.Bc.Qh();
					break;
				case 38:
					b.Bc.Qj(-1);
					break;
				case 40:
					b.Bc.Qj(1);
			}
			c.stopPropagation();
		};
		this.gb.onfocus = () => {
			if (b.ig != null)
				b.ig(true);
		};
		this.gb.onblur = () => {
			if (b.ig != null)
				b.ig(false);
			b.Bc.Qh();
		};
		this.gb.oninput = () => b.Bc.Hn(b.gb.value, b.gb.selectionStart);
	}

	function mb() {
		this.rf = null;
		var a = this;
		this.g = v.Ga(mb.N);
		var b = v.Ea(this.g);
		b.get('cancel').onclick = () => A.i(a.qb);
		this.wh = b.get('change');
		this.wh.disabled = true;
		this.wh.onclick = () => {
			if (a.rf != null)
				a.Zl(a.rf.index);
		};
		b = b.get('list');
		this.ki(b);
		var c = Ba.cg(b);
		window.setTimeout(() => c.update(), 0);
	}

	function Ea() {
		this.Xf = false;
		this.w = '';
		this.uh = 0;
		this.Jf = '';
		this.kb = new ka;
		var a = window.document.createElement('canvas');
		a.width = 64;
		a.height = 64;
		this.rb = a.getContext('2d', null);
		this.Ij = this.rb.createPattern(this.rb.canvas, 'no-repeat');
		this.fo();
	}

	function Sb() {
		this.xc = 0;
		this.ab = [];
		this.Ar = new R(['Time is', 'Up!'], 16777215);
		this.Gq = new R(['Red is', 'Victorious!'], 15035990);
		this.Fq = new R(['Red', 'Scores!'], 15035990);
		this.Cn = new R(['Blue is', 'Victorious!'], 625603);
		this.Bn = new R(['Blue', 'Scores!'], 625603);
		this.eq = new R(['Game', 'Paused'], 16777215);
	}

	function R(a, b) {
		for (var c = [], d = 0; a.length > d; d++)
			c.push(this.sp(a[d], b));
		this.We = c;
	}

	function N() {
		this.$c = window.performance.now();
		this.Jg = new Map;
		this.dd = new Map;
		this.zg = 1;
		this.xf = 35;
		this.jf = 0;
		this.kf = 1.5;
		this.Ya = new H(0, 0);
		this.Dk = false;
		this.td = new Sb;
		this.sa = window.document.createElement('canvas');
		this.sa.mozOpaque = true;
		this.c = this.sa.getContext('2d', {alpha: false});
		this.Lo = this.c.createPattern(n.Ko, null);
		this.Wn = this.c.createPattern(n.Vn, null);
		this.Un = this.c.createPattern(n.Tn, null);
	}

	function B() {
		this.ud = 0;
		this.v = 32;
		this.h = 63;
		this.m = 1;
		this.a = new H(0, 0);
	}

	function E() {
		this.Hg = this.Ig = this.wa = null;
		this.Yj = 0;
		this.ca = this.W = this.Xd = null;
		this.Cc = 0;
		this.m = 1;
		this.h = 63;
		this.v = 32;
		this.vb = Infinity;
		this.Za = true;
		this.R = 0;
	}

	function L() {
		this.v = 32;
		this.h = 63;
		this.m = 1;
		this.Ua = 0;
		this.wa = new H(0, 0);
	}

	function Fa() {
		this.hc = -1;
		this.gc = null;
		this.F = [];
	}

	function nb() {
		this.R = 0;
		this.ne = Infinity;
		this.Hb = this.ec = 100;
		this.Yd = this.Zd = 0;
	}

	function ca() {
		this.hc = -1;
		this.gc = null;
		this.jl = 0;
		this.h = this.v = 63;
		this.Mj = 0;
		this.R = 16777215;
		this.Ca = .99;
		this.aa = 1;
		this.m = .5;
		this.Z = 10;
		this.oa = new H(0, 0);
		this.D = new H(0, 0);
		this.a = new H(0, 0);
	}

	function la() {
		this.da = 0;
	}

	function La() {
		this.da = 0;
	}

	function Ma() {
		this.da = 0;
	}

	function ma() {
		this.da = 0;
	}

	function ob() {
		this.da = 0;
	}

	function pb() {
		this.da = 0;
	}

	function Y() {
		this.Qg = false;
		this.da = 0;
	}

	function kc() {
	}

	function na() {
		this.da = 0;
	}

	function Ga() {
		this.da = 0;
	}

	function Na() {
		this.da = 0;
	}

	function Oa() {
		this.da = 0;
	}

	function qb() {
		this.da = 0;
	}

	function oa() {
		this.da = 0;
	}

	function pa() {
		this.da = 0;
	}

	function Pa() {
		this.da = 0;
	}

	function qa() {
		this.da = 0;
	}

	function S() {
		this.da = 0;
	}

	function ra() {
		this.da = 0;
	}

	function sa() {
		this.da = 0;
	}

	function da() {
		this.da = 0;
	}

	function Qa() {
		this.da = 0;
	}

	function rb() {
		this.da = 0;
	}

	function ta() {
		this.da = 0;
	}

	function ea() {
		this.zc = -1;
		this.an = null;
		this.ea = p.Ia;
		this.H = null;
		this.yc = this.Sc = 0;
		this.Wb = false;
		this.ob = this.V = 0;
		this.w = 'Player';
		this.Ug = this.yb = 0;
		this.Kd = null;
		this.Ld = false;
		this.Xb = this.Jd = null;
		this.Jb = 0;
		this.cb = false;
	}

	function fa() {
		this.hc = -1;
		this.S = this.gc = null;
		this.yd = 2;
		this.Zc = 0;
		this.ce = 1;
		this.ib = this.Da = 3;
		this.Pc = false;
		this.K = null;
		this.I = [];
		this.jc = '';
		this.S = h.Kh()[0];
		this.kb = [null, new ka, new ka];
		this.kb[1].fb.push(p.fa.R);
		this.kb[2].fb.push(p.xa.R);
	}

	function p(a, b, c, d, e, f, g, k) {
		this.pg = null;
		this.$ = a;
		this.R = b;
		this.Ch = c;
		this.cp = d;
		this.w = e;
		this.io = f;
		this.v = k;
		this.wm = new ka;
		this.wm.fb.push(b);
	}

	function ka() {
		this.ed = 16777215;
		this.fb = [];
	}

	function h() {
		this.J = [];
		this.U = [];
		this.qa = [];
		this.tc = [];
		this.F = [];
		this.pb = [];
		this.Dd = [];
		this.md = [];
		this.ge = new Eb;
		this.Bh = 255;
		this.Ge = this.Ye = 0;
		this.Lf = true;
		this.pf = false;
	}

	function Bb(a) {
		this.xp = a;
	}

	function Eb() {
		this.Se = 0;
		this.Z = 15;
		this.v = 0;
		this.oa = new H(0, 0);
		this.aa = this.m = .5;
		this.Ca = .96;
		this.Ce = .1;
		this.Te = .07;
		this.Ue = .96;
		this.Re = 5;
	}

	function sb() {
		this.qe = p.Ia;
		this.ca = new H(0, 0);
		this.W = new H(0, 0);
	}

	function O() {
		this.hc = -1;
		this.gc = null;
		this.Pb = this.Kb = this.Hc = this.Oa = 0;
		this.ae = p.fa;
		this.vc = this.Bb = 0;
		this.ta = new Fa;
		this.Da = 0;
		this.ib = 5;
		this.S = null;
	}

	function ua() {
		this.h = this.v = 63;
		this.R = 16777215;
		this.Ca = .99;
		this.aa = 1;
		this.m = .5;
		this.Z = 10;
		this.oa = new H(0, 0);
		this.D = new H(0, 0);
		this.a = new H(0, 0);
	}

	function Tb(a, b) {
		this.gh = null;
		this.Js = .025;
		this.ve = this.dh = this.Ef = 0;
		this.Tg = b.createGain();
		this.Tg.gain.value = 0;
		var c = b.createBufferSource();
		c.buffer = a;
		c.connect(this.Tg);
		c.loop = true;
		c.start();
	}

	function Ub(a) {
		function b(b) {
			return new Promise((d, f) => {
				var e = a.file(b).asArrayBuffer();
				return c.c.decodeAudioData(e, d, f);
			});
		}

		var c = this;
		this.c = new AudioContext;
		this.ag = this.c.createGain();
		this.im(n.A.pm.L() ? 1 : 0);
		this.ag.connect(this.c.destination);
		this.ro = Promise.all([b('sounds/chat.ogg').then(a => c.Rj = a), b('sounds/highlight.wav').then(a => c.zk = a), b('sounds/kick.ogg').then(a => c.bp = a), b('sounds/goal.ogg').then(a => c.Io = a), b('sounds/join.ogg').then(a => c.$o = a), b('sounds/leave.ogg').then(a => c.ep = a), b('sounds/crowd.ogg').then(a => {
			c.ho = a;
			c.Xj = new Tb(c.ho, c.c);
			c.Xj.connect(c.ag);
		})]);
	}

	function Z() {
	}

	function va() {
	}

	function Fb() {
	}

	function Vb(a) {
		this.$c = window.performance.now();
		this.sd = this.De = 0;
		var b = this;
		this.ya = a;
		this.j = new ja(a.uc);
		var c = new Gb(this.j);
		c.ri(a.T);
		window.document.addEventListener('keydown', G(this, this.Bd));
		window.document.addEventListener('keyup', G(this, this.Cd));
		window.requestAnimationFrame(G(this, this.bf));
		this.Gh = window.setInterval(() => {
			b.j.pe.hm(b.sd);
			b.sd = 0;
		}, 1000);
		this.uf(n.A.Tb.L());
		this.j.g.classList.add('replayer');
		this.je = new ha(a);
		this.je.Vp = () => c.Lr(a.T);
		this.je.Up = () => {
			b.j.me(a.T.K == null);
			c.ri(a.T);
		};
		this.je.el = () => b.j.Fb.Eb.Xq();
		this.j.g.appendChild(this.je.g);
	}

	function x() {
	}

	function u() {
	}

	function Wb() {
	}

	function n() {
	}

	function W() {
		this.Yc = new Map;
	}

	function wa(a, b, c, d) {
		this.w = a;
		this.Ur = d;
		this.Yh = b;
		d = null;
		if (b != null)
			d = b.getItem(a);
		this.Hm = c(d);
	}

	function Xb() {
	}

	function Yb() {
		function a(a) {
			return new wa(a, e, a => {
				if (a == null)
					return null;
				try {
					return T.Hh(a);
				}
				catch (k) {
					return null;
				}
			}, a => {
				if (a == null)
					return null;
				try {
					return a.se();
				}
				catch (k) {
					return null;
				}
			});
		}

		function b(a) {
			return new wa(a, e, a => a != null ? a != '0' : true, a => a ? '1' : '0');
		}

		function c(a, b) {
			return new wa(a, e, a => {
				var c = b;
				try {
					if (a != null)
						c = K.parseInt(a);
				}
				catch (t) {
				}
				return c;
			}, a => '' + a);
		}

		function d(a, b, c) {
			return new wa(a, e, a => a == null ? b : U.Qc(a, c), a => a);
		}

		var e = Xb.Pm();
		this.fe = d('player_name', '', 25);
		this.Tb = c('view_mode', -1);
		this.Fh = c('fps_limit', 0);
		this.sh = d('avatar', null, 2);
		d('rctoken', null, 1024);
		this.xm = b('team_colors');
		this.Ak = b('show_indicators');
		this.pm = b('sound_main');
		this.Hi = b('sound_chat');
		this.om = b('sound_highlight');
		this.nm = b('sound_crowd');
		this.Gj = d('player_auth_key', null, 1024);
		this.rd = c('extrapolation', 0);
		this.Sl = ((a, b) => new wa(a, e, a => {
			var c = b;
			try {
				if (a != null)
					c = parseFloat(a);
			}
			catch (t) {
			}
			return c;
		}, a => '' + a))('resolution_scale', 1);
		this.lm = b('show_avatars');
		this.Me = a('geo');
		this.Ne = a('geo_override');
		this.tg = (() => new wa('player_keys', e, a => {
			if (a == null)
				return W.$j();
			try {
				return W.Hh(a);
			}
			catch (g) {
				return W.$j();
			}
		}, a => {
			try {
				return a.se();
			}
			catch (g) {
				return null;
			}
		}))();
	}

	function T() {
		this.ub = '';
		this.Ec = this.Gc = 0;
	}

	function Ra() {
		this.$d = this.Yf = 0;
		window.document.addEventListener('focusout', G(this, this.al));
	}

	function Gb(a, b) {
		this.Rh = null;
		this.j = a;
		if (b != null)
			this.Rh = '@' + J.replace(b, ' ', '_');
	}

	function ba(a) {
		this.Nf = null;
		this.Ik = this.zh = false;
		this.$c = window.performance.now();
		this.Ed = null;
		this.De = 0;
		this.Jn = new tb(3, 1000);
		this.ob = new Ra;
		this.Bg = 'Waiting for link';
		this.xi = this.am = false;
		this.sd = 0;
		var b = this;
		this.Of = new ub(a, a => b.j.Qa.Gb(a));
		this.ya = a;
		a.T.ko = c => {
			if (c != b.am) {
				b.am = c;
				c = ta.la(c);
				a.ra(c);
			}
		};
		this.j = new ja(a.uc);
		this.Ih = new Gb(this.j, a.T.na(a.uc).w);
		this.Ih.ri(a.T);
		this.j.Qa.fl = G(this, this.Gp);
		this.j.Qa.ig = G(this, this.Fp);
		window.document.addEventListener('keydown', G(this, this.Bd));
		window.document.addEventListener('keyup', G(this, this.Cd));
		window.onbeforeunload = () => 'Are you sure you want to leave the room?';
		this.ob.ng = b => a.ra(b);
		this.j.Wa.aq = b => {
			b = da.la(1, b);
			a.ra(b);
		};
		this.j.Wa.Tp = b => {
			b = da.la(0, b);
			a.ra(b);
		};
		this.j.og = b => {
			b = qa.la(b);
			a.ra(b);
		};
		this.j.Wa.Yp = () => a.ra(new Ma);
		this.j.Wa.Zp = () => a.ra(new La);
		this.j.Wa.Mp = () => b.Bm();
		this.j.Wa.mg = (b, c) => {
			var d = S.la(b, c);
			a.ra(d);
		};
		this.j.Wa.ee = G(this, this.Wq);
		this.j.Wa.Dp = () => a.ra(new Qa);
		this.j.Wa.Pp = () => ba.Bq(a);
		this.j.Wa.$p = b => {
			b = pa.la(b);
			a.ra(b);
		};
		this.j.Wa.ff = c => {
			var d = a.T.na(c);
			if (d != null) {
				var e = new db(d, b.xi);
				e.qb = () => b.j.bb(null);
				e.Cp = (b, c) => {
					var d = sa.la(b, c);
					a.ra(d);
				};
				e.ei = () => b.vr(d);
				b.j.bb(e.g, () => e.C(a.T, b.xi));
			}
		};
		this.j.Wa.Wp = () => {
			var a = new bb;
			a.qb = () => b.j.bb(null);
			b.j.bb(a.g, () => a.nr(b.Bg));
		};
		this.j.Wa.Qp = () => {
			if (b.Ed == null)
				b.zr();
			else {
				var a = b.Ed.stop();
				b.Ed = null;
				ba.Yl(a);
			}
			b.j.Wa.rr(b.Ed != null);
		};
		window.requestAnimationFrame(G(this, this.bf));
		this.Gh = window.setInterval(() => {
			b.j.pe.hm(b.sd);
			b.sd = 0;
		}, 1000);
		this.Qr = window.setInterval(() => a.C(), 50);
		this.uf();
		var c = n.A.rd.L();
		var c = c < -200 ? -200 : c > 200 ? 200 : c;
		if (c != 0) {
			var d = n.A.rd.L();
			a.gm(d);
			this.j.Qa.Gb('Extrapolation set to ' + c + ' msec');
		}
	}

	function Ha() {
	}

	function ub(a, b) {
		this.ya = a;
		this.ba = b;
	}

	function Hb() {
	}

	function tb(a, b) {
		this.Nj = a;
		this.Si = b;
		this.oc = a;
		this.Ve = window.performance.now();
	}

	function vb() {
	}

	function Cb() {
	}

	function ia() {
	}

	function y() {
	}

	function A() {
	}

	function M() {
	}

	function H(a, b) {
		this.x = a;
		this.y = b;
	}

	function Ib(a) {
		this.Yb = a.slice();
	}

	function Jb(a, b, c) {
		this.Vk = [];
		this.pl = 5;
		this.Fd = -1;
		this.hg = this.Qb = this.Wh = this.sk = 0;
		V.call(this, b);
		a = new F(new DataView(a.buffer), false);
		if (a.hb() != 1212305970)
			throw new q('');
		b = a.hb();
		if (b != c)
			throw new q(new Kb(b));
		this.mf = a.hb();
		c = pako.inflateRaw(a.sb());
		this.Lc = new F(new DataView(c.buffer, c.byteOffset, c.byteLength));
		this.Cq(this.Lc);
		c = this.Lc.sb();
		this.Lc = new F(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
		this.ui();
		this.Wh = window.performance.now();
		this.uc = -1;
	}

	function Kb(a) {
		this.Id = a;
	}

	function Zb() {
	}

	function $b(a) {
		this.xj = new Map;
		this.Ho = new tb(100, 16);
		this.yg = false;
		this.yb = 0;
		this.pa = a;
		a = w.ha(8);
		a.s(Math.random());
		this.He = a.Sb();
	}

	function Lb(a) {
		this.Kj = new Map;
		this.Ib = null;
		this.fg = 32;
		this.Ie = new Map;
		this.ac = [];
		this.wi = 4;
		this.Mn = 600;
		var b = this;
		V.call(this, a.state);
		this.tp = a.ij;
		this.Sr = a.version;
		this.up = 1;
		this.Jk = this.uc = 0;
		this.Li = window.performance.now();
		this.Ic = new Sa(this.tp, a.iceServers, Zb.Km, a.gn);
		this.Ic.Vj = G(this, this.Oo);
		this.Ic.bl = a => b.Lp(a);
		this.Ic.kg = a => y.i(b.kg, a);
		this.Ic.ef = (a, d) => {
			if (b.ef != null)
				b.ef(a, d);
		};
	}

	function xa(a, b) {
		this.Di = [];
		this.pi = [];
		this.ug = new Ia;
		this.Ap = 1;
		this.pd = this.zm = 0;
		this.Qi = new Mb(50);
		this.sg = new Mb(50);
		this.nn = 1000;
		this.ek = '';
		var c = this;
		V.call(this, b.state);
		this.Uh = b.Ms;
		this.Je = b.ds;
		var d = null;
		var d = e => {
			c.tf(0);
			var f = w.ha();
			f.Ub(b.version);
			f.Db(b.password);
			c.pc = new wb(b.ij, b.iceServers, a, Zb.Km, f, b.gn);
			c.pc.rh = e;
			c.pc.zd = a => {
				c.pc = null;
				c.pa = a;
				a.lg = a => {
					a = new F(new DataView(a));
					c.uq(a);
				};
				a.cf = () => {
					if (c.pd != 3)
						y.i(c.df, xb.ih('Connection closed'));
					c.ia();
				};
				a = window.setTimeout(() => {
					y.i(c.df, xb.ih('Game state timeout'));
					c.ia();
				}, 10000);
				c.re = a;
				c.tf(2);
			};
			c.pc.gl = () => c.tf(1);
			var g = false;
			c.pc.Zk = () => g = true;
			c.pc.bd = a => {
				if (!e && c.pd == 1 && g) {
					A.i(c.Sp);
					d(true);
				}
				else {
					var b = wb.Do(a);
					switch (a.nb) {
						case 0:
							a = xb.jh;
							break;
						case 1:
							a = xb.lh(a.code);
							break;
						case 2:
							a = xb.hh;
							break;
						default:
							a = xb.ih(b);
					}
					y.i(c.df, a);
					c.ia(b);
				}
			};
		};
		d(b.cn != null && b.cn);
	}

	function V(a) {
		this.Ri = new Ia;
		this.te = this.cc = 0;
		this.le = new Ia;
		this.uc = this.bc = this.rd = 0;
		this.Ac = .06;
		this.mh = 16.666666666666668;
		this.Ff = 120;
		yb.call(this, a);
	}

	function ya() {
	}

	function Ta() {
	}

	function ac(a, b) {
		this.Xm = 0;
		this.version = 1;
		this.ah = 0;
		this.Nd = w.ha(1000);
		this.Df = w.ha(16384);
		var c = this;
		this.version = b;
		var d = this.ah = a.Y;
		this.hj = a;
		a.T.ga(this.Df);
		a.fc = b => {
			var e = a.Y;
			c.Df.lb(e - d);
			d = e;
			c.Df.Ub(b.P);
			m.lj(b, c.Df);
		};
		this.Nd.Ub(0);
		var e = this.ah;
		a.T.km(b => {
			var d = a.Y;
			c.Nd.lb(d - e);
			c.Nd.l(b);
			c.Xm++;
			e = d;
		});
	}

	function bc() {
	}

	function Mb(a) {
		this.rs = a;
		this.$a = [];
	}

	function cc() {
	}

	function Ua() {
		this.da = 0;
	}

	function yb(a) {
		this.Y = 0;
		this.T = a;
	}

	function Ia() {
		this.list = [];
	}

	function m() {
		this.da = 0;
	}

	function lc() {
	}

	function zb() {
	}

	function v() {
	}

	function Db(a, b) {
		this.Ja = a;
		this.value = b;
		a.textContent = '' + b;
	}

	function Ca() {
	}

	function mc() {
	}

	function Ba() {
	}

	function Ja() {
	}

	function I() {
	}

	function w(a, b) {
		if (b == null)
			b = false;
		this.o = a;
		this.Sa = b;
		this.a = 0;
	}

	function F(a, b) {
		if (b == null)
			b = false;
		this.o = a;
		this.Sa = b;
		this.a = 0;
	}

	function Nb(a) {
		this.gd = null;
		this.Eq = 10000;
		this.wd = true;
		var b = this;
		a.Tj();
		this.Ra = a.Ra;
		this.Vc = a.Vc;
		this.oe = a.oe;
		this.gd = a.gd;
		this.ym = window.performance.now();
		var c = null;
		var c = () => {
			var a = b.Eq - b.Br();
			if (a <= 0)
				b.ia();
			else {
				window.clearTimeout(b.Am);
				a = window.setTimeout(c, a + 1000);
				b.Am = a;
			}
		};
		c();
		this.Ra.oniceconnectionstatechange = () => {
			var a = b.Ra.iceConnectionState;
			if (a == 'closed' || a == 'failed')
				b.ia();
		};
		a = 0;
		for (var d = this.Vc; d.length > a; a++) {
			var e = d[a];
			e.onmessage = a => {
				if (b.wd) {
					b.ym = window.performance.now();
					if (b.lg != null)
						b.lg(a.data);
				}
			};
			e.onclose = () => b.ia();
		}
	}

	function nc() {
	}

	function Sa(a, b, c, d) {
		this.th = new Set;
		this.If = new Set;
		this.Ag = this.nf = this.dm = false;
		this.Mc = null;
		this.$ = '';
		this.$q = 50000;
		this.Zq = 10000;
		this.od = new Map;
		this.xr = a;
		this.Vf = b;
		this.In = c;
		this.Dg = d;
		if (this.Dg == null)
			this.Dg = '';
		this.Ji();
	}

	function Va(a, b, c) {
		this.gd = this.re = null;
		this.oe = [];
		this.ak = 0;
		this.hl = false;
		this.Uf = [];
		this.Vc = [];
		var d = this;
		this.Ra = new RTCPeerConnection({iceServers: b}, Va.Yn);
		this.Sh = new Promise(a => {
			d.Vo = a;
		});
		this.Ra.onicecandidate = a => {
			if (a.candidate == null) {
				d.Vo(d.Uf);
			}
			else {
				a = a.candidate;
				if (a.candidate != null && a.candidate != '') {
					if (d.jg != null)
						d.jg(a);
					d.Uf.push(a);
				}
			}
		};
		for (b = 0; c.length > b; b++)
			this.co(c[b]);
		this.$ = a;
	}

	function wb(a, b, c, d, e, f) {
		this.rh = this.yh = false;
		var g = this;
		this.pa = new Va(0, b, d);
		this.pa.bd = () => g.Oe(Ob.jh);
		this.pa.zd = () => {
			if (g.zd != null)
				g.zd(new Nb(g.pa));
			g.pa = null;
			g.Uj();
		};
		this.pa.di = b => {
			g.jr = b;
			g.X = new WebSocket(a + 'client?id=' + c + (f == null ? '' : '&token=' + f));
			g.X.binaryType = 'arraybuffer';
			g.X.onclose = a => {
				if (!g.yh)
					g.Oe(Ob.lh(a.code));
			};
			g.X.onerror = () => {
				if (!g.yh)
					g.Oe(Ob.Error);
			};
			g.X.onmessage = G(g, g.Ph);
			g.X.onopen = () => {
				if (g.gl != null)
					g.gl();
				g.pa.Mi();
				g.Bi(g.jr, g.pa.Uf, e);
				g.pa.jg = G(g, g.yi);
				g.pa.Sh.then(() => g.Nc(0, null));
			};
		};
		this.pa.eo();
	}

	function dc() {
		this.hash = 0;
	}

	function U() {
	}

	function J() {
	}

	function K() {
	}

	function ec() {
	}

	function D() {
	}

	function fc(a, b) {
		this.r = new RegExp(a, b.split('u').join(''));
	}

	function ga() {
		return r.Be(this, '');
	}

	function C(a, b) {
		var c = Object.create(a);
		var d;
		for (d in b)
			c[d] = b[d];
		if (Object.prototype.toString !== b.toString)
			c.toString = b.toString;
		return c;
	}

	function G(a, b) {
		if (b == null)
			return null;
		if (b.oh == null)
			b.oh = rc++;
		var c;
		if (a.ej == null)
			a.ej = {};
		else
			c = a.ej[b.oh];
		if (c == null) {
			c = b.bind(a);
			a.ej[b.oh] = c;
		}
		return c;
	}

	var Ab = Ab || {};
	var X;
	fc.b = true;
	fc.prototype = {
		match: function (a) {
			if (this.r.global)
				this.r.lastIndex = 0;
			this.r.nc = this.r.exec(a);
			this.r.bh = a;
			return this.r.nc != null;
		}, Wm: function (a) {
			if (this.r.nc != null && a >= 0 && this.r.nc.length > a)
				return this.r.nc[a];
			throw new q('EReg::matched');
		}, ps: function () {
			if (this.r.nc == null)
				throw new q('No string matched');
			return {mj: this.r.nc.index, ms: this.r.nc[0].length};
		}, os: function (a, b, c) {
			if (c == null)
				c = -1;
			if (this.r.global) {
				this.r.lastIndex = b;
				this.r.nc = this.r.exec(c < 0 ? a : D.substr(a, 0, b + c));
				if (b = this.r.nc != null)
					this.r.bh = a;
				return b;
			}
			if (c = this.match(c < 0 ? D.substr(a, b, null) : D.substr(a, b, c))) {
				this.r.bh = a;
				this.r.nc.index += b;
			}
			return c;
		}, f: fc
	};
	D.b = true;
	D.bj = (a, b) => {
		var c = a.charCodeAt(b);
		if (c == c)
			return c;
	};
	D.substr = (a, b, c) => {
		if (c == null)
			c = a.length;
		else if (c < 0)
			if (b == 0)
				c = a.length + c;
			else
				return '';
		return a.substr(b, c);
	};
	D.remove = (a, b) => {
		var c = a.indexOf(b);
		if (c == -1)
			return false;
		a.splice(c, 1);
		return true;
	};
	Math.b = true;
	ec.b = true;
	ec.Mm = a => {
		var b = [];
		if (a != null) {
			var c = Object.prototype.hasOwnProperty;
			var d;
			for (d in a) {
				if (d != '__id__' && d != 'hx__closures__' && c.call(a, d))
					b.push(d);
			}
		}
		return b;
	};
	K.b = true;
	K.ye = a => r.Be(a, '');
	K.parseInt = a => {
		a = parseInt(a, !a || a[0] != '0' || a[1] != 'x' && a[1] != 'X' ? 10 : 16);
		return isNaN(a) ? null : a;
	};
	J.b = true;
	J.startsWith = (a, b) => b.length <= a.length ? b == D.substr(a, 0, b.length) : false;
	J.ls = (a, b) => {
		var c = D.bj(a, b);
		return c > 8 && c < 14 ? true : c == 32;
	};
	J.Gs = a => {
		for (var b = a.length, c = 0; b > c && J.ls(a, b - c - 1);)
			++c;
		return c > 0 ? D.substr(a, 0, b - c) : a;
	};
	J.Af = a => {
		var b;
		var c = '';
		for (b = 2 - a.length; b > c.length;)
			c += '0';
		return c + (a == null ? 'null' : '' + a);
	};
	J.replace = (a, b, c) => a.split(b).join(c);
	J.Vg = (a, b) => {
		for (var c = ''; c = "0123456789ABCDEF".charAt(a & 15) + c, a >>>= 4, a > 0;) ;
		if (b != null)
			for (; b > c.length;)
				c = '0' + c;
		return c;
	};
	U.b = true;
	U.Qc = (a, b) => b >= a.length ? a : D.substr(a, 0, b);
	U.Zr = a => {
		for (var b = '', c = 0, d = a.byteLength; d > c;)
			b += J.Vg(a[c++], 2);
		return b;
	};
	dc.b = true;
	dc.prototype = {
		Yr: function (a) {
			for (var b = 0, c = a.length; c > b;) {
				this.hash += a[b++];
				this.hash += this.hash << 10;
				this.hash ^= this.hash >>> 6;
			}
		}, f: dc
	};
	var Ob = Ab['bas.basnet.FailReason'] = {
		Gf: true, nh: ['PeerFailed', 'Rejected', 'Cancelled', 'Error'], jh: {nb: 0, eb: 'bas.basnet.FailReason', toString: ga}, lh: (X = a => ({nb: 1, code: a, eb: 'bas.basnet.FailReason', toString: ga}), X.Ae = ['code'], X), hh: {nb: 2, eb: 'bas.basnet.FailReason', toString: ga}, Error: {nb: 3, eb: 'bas.basnet.FailReason', toString: ga}
	};
	wb.b = true;
	wb.Do = a => {
		switch (a.nb) {
			case 0:
				return 'Failed';
			case 1:
				return pc.description(a.code);
			case 2:
				return '';
			case 3:
				return 'Master connection error';
		}
	};
	wb.prototype = {
		Gn: function () {
			this.Oe(Ob.hh);
		}, Uj: function () {
			if (this.X != null) {
				this.X.onclose = null;
				this.X.onmessage = null;
				this.X.onerror = null;
				this.X.onopen = null;
				this.X.close();
				this.X = null;
			}
			if (this.pa != null) {
				this.pa.ia();
				this.pa = null;
			}
		}, Oe: function (a) {
			if (this.bd != null)
				this.bd(a);
			this.Uj();
		}, Ph: function (a) {
			a = new F(new DataView(a.data));
			var b = a.B();
			if (a.o.byteLength - a.a > 0)
				a = new F(new DataView(pako.inflateRaw(a.sb()).buffer), false);
			switch (b) {
				case 1:
					for (var b = a.ic(), c = a.wg(), d = [], e = 0; c.length > e;)
						d.push(new RTCIceCandidate(c[e++]));
					this.Oh(b, d, a);
					break;
				case 4:
					this.Nh(new RTCIceCandidate(a.wg()));
			}
		}, Oh: function (a, b) {
			var c = this;
			this.pa.Mi(this.rh ? 10000 : 4000);
			this.yh = true;
			if (this.Zk != null)
				this.Zk();
			this.pa.Ra.setRemoteDescription(new RTCSessionDescription({sdp: a, type: 'answer'}), () => {
				for (var a = 0; b.length > a;)
					c.pa.Ra.addIceCandidate(b[a++]);
			}, () => c.Oe(Ob.Error));
		}, Nh: function (a) {
			this.pa.Ra.addIceCandidate(a);
		}, Nc: function (a, b) {
			if (this.X != null) {
				var c = w.ha(32, false);
				c.l(a);
				if (b != null)
					c.Vb(pako.deflateRaw(b.Sb()));
				this.X.send(c.Hd());
			}
		}, Bi: function (a, b, c) {
			var d = w.ha(32, false);
			d.l(this.rh ? 1 : 0);
			d.mc(a.sdp);
			d.Ng(b);
			if (c != null)
				d.Vb(c.Sb());
			this.Nc(1, d);
		}, yi: function (a) {
			var b = w.ha(32, false);
			b.Ng(a);
			this.Nc(4, b);
		}, f: wb
	};
	Va.b = true;
	Va.prototype = {
		Mi: function (a) {
			if (a == null)
				a = 10000;
			window.clearTimeout(this.re);
			this.re = window.setTimeout(G(this, this.To), a);
		}, bo: function (a, b) {
			var c = this;
			this.ck(this.Ra.setRemoteDescription(a).then(() => c.Ra.createAnswer()), b, 500);
		}, eo: function () {
			this.ck(this.Ra.createOffer(), [], 1000);
		}, ck: function (a, b, c) {
			var d = this;
			a.then(a => d.Ra.setLocalDescription(a).then(() => a)).then(a => {
				function e() {
					return a;
				}

				for (var g = 0; b.length > g;)
					d.yj(b[g++]);
				return lc.Dr(d.Sh, c).then(e, e);
			}).then(a => d.di(a))['catch'](() => d.Tf());
		}, co: function (a) {
			var b = this;
			var c = {id: this.Vc.length, negotiated: true, ordered: a.kj};
			if (!a.reliable)
				c.maxRetransmits = 0;
			a = this.Ra.createDataChannel(a.name, c);
			a.binaryType = 'arraybuffer';
			a.onopen = () => {
				for (var a = 0, c = b.Vc; c.length > a;) {
					if (c[a++].readyState != 'open')
						return;
				}
				if (b.zd != null)
					b.zd();
			};
			a.onclose = () => b.Tf();
			a.onmessage = () => b.Tf();
			this.Vc.push(a);
		}, yj: function (a) {
			var b = this;
			window.setTimeout(() => b.Ra.addIceCandidate(a), this.ak);
		}, To: function () {
			this.Tf();
		}, Tf: function () {
			if (this.bd != null)
				this.bd();
			this.ia();
		}, ia: function () {
			this.Tj();
			this.Ra.close();
		}, Tj: function () {
			window.clearTimeout(this.re);
			this.di = this.zd = this.jg = this.bd = null;
			this.Ra.onicecandidate = null;
			this.Ra.ondatachannel = null;
			this.Ra.onsignalingstatechange = null;
			this.Ra.oniceconnectionstatechange = null;
			for (var a = 0, b = this.Vc; b.length > a;) {
				var c = b[a];
				++a;
				c.onopen = null;
				c.onclose = null;
				c.onmessage = null;
			}
		}, f: Va
	};
	var gc = Ab['bas.basnet.ConnectionRequestResponse'] = {
		Gf: true, nh: ['Accept', 'Reject'], hn: {nb: 0, eb: 'bas.basnet.ConnectionRequestResponse', toString: ga}, kh: (X = a => ({nb: 1, reason: a, eb: 'bas.basnet.ConnectionRequestResponse', toString: ga}), X.Ae = ['reason'], X)
	};
	Sa.b = true;
	Sa.vk = a => {
		try {
			var b = nc.gf(a.candidate);
			if (b.Jr == 'srflx')
				return b.Xo;
		}
		catch (c) {
		}
		return null;
	};
	Sa.prototype = {
		ia: function () {
			window.clearTimeout(this.Ul);
			window.clearTimeout(this.ke);
			this.ke = null;
			window.clearInterval(this.ol);
			this.X.onmessage = null;
			this.X.onerror = null;
			this.X.onclose = null;
			this.X.onopen = null;
			this.X.close();
			this.X = null;
			this.qk();
		}, Fi: function (a) {
			var b = this;
			if (this.Mc != null || a != null) {
				if (this.Mc != null && a != null && a.byteLength == this.Mc.byteLength) {
					for (var c = new Uint8Array(this.Mc), d = new Uint8Array(a), e = false, f = 0, g = this.Mc.byteLength; g > f; f++) {
						var k = f;
						if (d[k] != c[k]) {
							e = true;
							break;
						}
					}
					if (!e)
						return;
				}
				this.Mc = a.slice(0);
				this.Ag = true;
				if (this.X != null && this.X.readyState == 1 && this.ke == null) {
					this.Ai();
					this.ke = window.setTimeout(() => {
						b.ke = null;
						if (b.X.readyState == 1 && b.Ag)
							b.Ai();
					}, 10000);
				}
			}
		}, Ei: function (a) {
			function b() {
				if (c.X != null && c.X.readyState == 1 && c.dm != c.nf)
					c.cm();
				c.Ql = null;
			}

			var c = this;
			this.nf = a;
			if (this.Ql == null) {
				b();
				this.Ql = window.setTimeout(b, 1000);
			}
		}, Ji: function (a) {
			function b(a) {
				a = a.sitekey;
				if (a == null)
					throw new q(null);
				d.ef != null && d.ef(a, a => d.Ji(a));
			}

			function c(a) {
				var b = a.url;
				if (b == null)
					throw new q(null);
				a = a.token;
				if (a == null)
					throw new q(null);
				d.X = new WebSocket(b + '?token=' + a);
				d.X.binaryType = 'arraybuffer';
				d.X.onopen = () => d.So();
				d.X.onclose = a => d.Mh(a.code != 4001);
				d.X.onerror = () => d.Mh(true);
				d.X.onmessage = G(d, d.Ph);
			}

			if (a == null)
				a = '';
			var d = this;
			M.zl(this.xr, 'token=' + this.Dg + '&rcr=' + a, M.vj).then(a => {
				switch (a.action) {
					case 'connect':
						c(a);
						break;
					case 'recaptcha':
						b(a);
				}
			})['catch'](() => d.Mh(true));
		}, So: function () {
			var a = this;
			if (this.Mc != null)
				this.Ai();
			if (this.nf != 0)
				this.cm();
			this.ol = window.setInterval(() => a.zi(), 40000);
		}, Ph: function (a) {
			a = new F(new DataView(a.data), false);
			switch (a.B()) {
				case 1:
					this.Oh(a);
					break;
				case 4:
					this.Nh(a);
					break;
				case 5:
					this.No(a);
					break;
				case 6:
					this.Qo(a);
			}
		}, Oh: function (a) {
			var b = a.hb();
			var c = U.Zr(a.sb(a.B()));
			var d;
			var e;
			var f;
			try {
				a = new F(new DataView(pako.inflateRaw(a.sb()).buffer), false);
				d = a.B() != 0;
				e = a.ic();
				for (var g = a.wg(), k = [], l = 0; g.length > l;)
					k.push(new RTCIceCandidate(g[l++]));
				f = k;
			}
			catch (t) {
				this.sf(b, 0);
				return;
			}
			this.Ro(b, c, e, f, a, d);
		}, Ro: function (a, b, c, d, e, f) {
			var g = this;
			if (this.od.size >= 16)
				this.sf(a, 4104);
			else if (this.th.has(b))
				this.sf(a, 4102);
			else {
				for (var k = [], l = 0; d.length > l;) {
					var t = Sa.vk(d[l++]);
					if (t != null) {
						if (this.If.has(t)) {
							this.sf(a, 4102);
							return;
						}
						k.push(t);
					}
				}
				if (this.Vj != null && (l = new F(e.o), l.a = e.a, e = this.Vj(b, l), e.nb == 1)) {
					this.sf(a, e.reason);
					return;
				}
				var h = new Va(a, this.Vf, this.In);
				if (f)
					h.ak = 2500;
				h.oe = k;
				h.gd = b;
				this.od.set(a, h);
				h.bd = () => {
					g.Nc(0, h, null);
					g.od['delete'](h.$);
				};
				h.zd = () => {
					g.od['delete'](h.$);
					g.Nc(0, h, null);
					if (g.bl != null)
						g.bl(new Nb(h));
				};
				h.di = a => {
					g.Bi(h, a, h.Uf, null);
					h.Sh.then(() => g.Nc(0, h, null));
					h.jg = a => g.yi(h, a);
				};
				h.Mi();
				h.bo(new RTCSessionDescription({sdp: c, type: 'offer'}), d);
			}
		}, Nh: function (a) {
			var b = a.hb();
			var c;
			try {
				a = new F(new DataView(pako.inflateRaw(a.sb()).buffer), false), c = new RTCIceCandidate(a.wg());
			}
			catch (d) {
				return;
			}
			this.Mo(b, c);
		}, Mo: function (a, b) {
			var c = this.od.get(a);
			if (c != null) {
				var d = Sa.vk(b);
				if (d != null && (c.oe.push(d), this.If.has(d)))
					return;
				c.yj(b);
			}
		}, No: function (a) {
			this.$ = a.ie(a.B());
			if (this.kg != null)
				this.kg(this.$);
		}, Qo: function (a) {
			this.Dg = a.ie(a.o.byteLength - a.a);
		}, Nc: function (a, b, c) {
			if (!b.hl) {
				if (a == 0)
					b.hl = true;
				b = b.$;
				var d = w.ha(32, false);
				d.l(a);
				d.tb(b);
				if (c != null)
					d.Vb(pako.deflateRaw(c.Sb()));
				this.X.send(d.Hd());
			}
		}, sf: function (a, b) {
			var c = w.ha(16, false);
			c.l(0);
			c.tb(a);
			c.Ub(b);
			this.X.send(c.Hd());
		}, zi: function () {
			var a = w.ha(1, false);
			a.l(8);
			this.X.send(a.Hd());
		}, Ai: function () {
			this.Ag = false;
			var a = w.ha(256, false);
			a.l(7);
			if (this.Mc != null)
				a.Mg(this.Mc);
			this.X.send(a.Hd());
		}, cm: function () {
			var a = w.ha(2, false);
			a.l(9);
			a.l(this.nf ? 1 : 0);
			this.X.send(a.Hd());
			this.dm = this.nf;
		}, Bi: function (a, b, c, d) {
			var e = w.ha(32, false);
			e.mc(b.sdp);
			e.Ng(c);
			if (d != null)
				e.Vb(d.Sb());
			this.Nc(1, a, e);
		}, yi: function (a, b) {
			var c = w.ha(32, false);
			c.Ng(b);
			this.Nc(4, a, c);
		}, qk: function () {
			for (var a = this.od.values(), b = a.next(); !b.done;) {
				var c = b.value;
				var b = a.next();
				c.ia();
			}
			this.od.clear();
		}, Mh: function (a) {
			var b = this;
			this.qk();
			window.clearTimeout(this.ke);
			this.ke = null;
			this.Ag = false;
			window.clearInterval(this.ol);
			window.clearTimeout(this.Ul);
			if (a) {
				this.Ul = window.setTimeout(() => b.Ji(), this.Zq + Math.random() * this.$q | 0);
			}
		}, zn: function (a) {
			for (var b = 0, c = a.oe; c.length > b; b++)
				this.If.add(c[b]);
			if (a.gd != null)
				this.th.add(a.gd);
			return {Rs: a.oe, Ps: a.gd};
		}, Ud: function () {
			this.If.clear();
			this.th.clear();
		}, f: Sa
	};
	nc.b = true;
	nc.gf = a => {
		a = a.split(' ');
		if (a[6] != 'typ')
			throw new q(null);
		return {Jr: a[7], Xo: a[4]};
	};
	Nb.b = true;
	Nb.prototype = {
		Br: function () {
			return window.performance.now() - this.ym;
		}, Rb: function (a, b) {
			if (this.wd) {
				var c = this.Vc[a];
				if (c.readyState == 'open') {
					var d = b.Kg();
					try {
						c.send(d);
					}
					catch (e) {
						window.console.log(e instanceof q ? e.Ta : e);
					}
				}
			}
		}, ia: function () {
			window.clearTimeout(this.Am);
			if (this.wd) {
				this.wd = false;
				this.Ra.close();
				if (this.cf != null)
					this.cf();
			}
		}, f: Nb
	};
	var pc = {
		b: true, description: a => {
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
	};
	F.b = true;
	F.jo = (a, b) => {
		var c = a.getUint8(b);
		var d;
		var e;
		var f;
		var g;
		var k;
		var l = b;
		if ((c & 128) == 0)
			++b;
		else if ((c & 224) == 192) {
			d = a.getUint8(b + 1);
			c = (c & 31) << 6 | d & 63;
			b += 2;
		}
		else if ((c & 240) == 224) {
			d = a.getUint8(b + 1);
			e = a.getUint8(b + 2);
			c = (c & 15) << 12 | (d & 63) << 6 | e & 63;
			b += 3;
		}
		else if ((c & 248) == 240) {
			d = a.getUint8(b + 1);
			e = a.getUint8(b + 2);
			f = a.getUint8(b + 3);
			c = (c & 7) << 18 | (d & 63) << 12 | (e & 63) << 6 | f & 63;
			b += 4;
		}
		else if ((c & 252) == 248) {
			d = a.getUint8(b + 1);
			e = a.getUint8(b + 2);
			f = a.getUint8(b + 3);
			g = a.getUint8(b + 4);
			c = (c & 3) << 24 | (d & 63) << 18 | (e & 63) << 12 | (f & 63) << 6 | g & 63;
			b += 5;
		}
		else if ((c & 254) == 252) {
			d = a.getUint8(b + 1);
			e = a.getUint8(b + 2);
			f = a.getUint8(b + 3);
			g = a.getUint8(b + 4);
			k = a.getUint8(b + 5);
			c = (c & 1) << 30 | (d & 63) << 24 | (e & 63) << 18 | (f & 63) << 12 | (g & 63) << 6 | k & 63;
			b += 6;
		}
		else
			throw new q('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
		return {'char': c, length: b - l};
	};
	F.prototype = {
		sb: function (a) {
			if (a == null)
				a = this.o.byteLength - this.a;
			if (this.o.byteLength < this.a + a)
				throw new q('Read too much');
			var b = new Uint8Array(this.o.buffer, this.o.byteOffset + this.a, a);
			this.a += a;
			return b;
		}, Cl: function (a) {
			var b = this.sb(a);
			a = new ArrayBuffer(a);
			(new Uint8Array(a)).set(b);
			return a;
		}, lf: function () {
			return this.o.getInt8(this.a++);
		}, B: function () {
			return this.o.getUint8(this.a++);
		}, ni: function () {
			var a = this.o.getInt16(this.a, this.Sa);
			this.a += 2;
			return a;
		}, Ob: function () {
			var a = this.o.getUint16(this.a, this.Sa);
			this.a += 2;
			return a;
		}, M: function () {
			var a = this.o.getInt32(this.a, this.Sa);
			this.a += 4;
			return a;
		}, hb: function () {
			var a = this.o.getUint32(this.a, this.Sa);
			this.a += 4;
			return a;
		}, mi: function () {
			var a = this.o.getFloat32(this.a, this.Sa);
			this.a += 4;
			return a;
		}, u: function () {
			var a = this.o.getFloat64(this.a, this.Sa);
			this.a += 8;
			return a;
		}, Ab: function () {
			for (var a = this.a, b = 0, c, d = 0; c = this.o.getUint8(a + b), b < 5 && (d |= (c & 127) << 7 * b >>> 0), ++b, (c & 128) != 0;) ;
			this.a += b;
			return d | 0;
		}, ie: function (a) {
			var b = this.a;
			var c;
			var d = '';
			for (a = b + a; a > b;) {
				c = F.jo(this.o, b);
				b += c.length;
				d += String.fromCodePoint(c['char']);
			}
			if (a != b)
				throw new q('Actual string length differs from the specified: ' + (b - a) + ' bytes');
			this.a = b;
			return d;
		}, zb: function () {
			var a = this.Ab();
			return a <= 0 ? null : this.ie(a - 1);
		}, ic: function () {
			return this.ie(this.Ab());
		}, El: function () {
			return this.ie(this.B());
		}, wg: function () {
			var a = this.ic();
			return JSON.parse(a);
		}, f: F
	};
	w.b = true;
	w.ha = (a, b) => {
		if (b == null)
			b = false;
		if (a == null)
			a = 16;
		return new w(new DataView(new ArrayBuffer(a)), b);
	};
	w.uo = (a, b, c) => {
		var d = c;
		if (a < 0)
			throw new q('Cannot encode UTF8 character: charCode (' + a + ') is negative');
		if (a < 128) {
			b.setUint8(c, a & 127);
			++c;
		}
		else if (a < 2048) {
			b.setUint8(c, a >> 6 & 31 | 192);
			b.setUint8(c + 1, a & 63 | 128);
			c += 2;
		}
		else if (a < 65536) {
			b.setUint8(c, a >> 12 & 15 | 224);
			b.setUint8(c + 1, a >> 6 & 63 | 128);
			b.setUint8(c + 2, a & 63 | 128);
			c += 3;
		}
		else if (a < 2097152) {
			b.setUint8(c, a >> 18 & 7 | 240);
			b.setUint8(c + 1, a >> 12 & 63 | 128);
			b.setUint8(c + 2, a >> 6 & 63 | 128);
			b.setUint8(c + 3, a & 63 | 128);
			c += 4;
		}
		else if (a < 67108864) {
			b.setUint8(c, a >> 24 & 3 | 248);
			b.setUint8(c + 1, a >> 18 & 63 | 128);
			b.setUint8(c + 2, a >> 12 & 63 | 128);
			b.setUint8(c + 3, a >> 6 & 63 | 128);
			b.setUint8(c + 4, a & 63 | 128);
			c += 5;
		}
		else if (a < -2147483648) {
			b.setUint8(c, a >> 30 & 1 | 252);
			b.setUint8(c + 1, a >> 24 & 63 | 128);
			b.setUint8(c + 2, a >> 18 & 63 | 128);
			b.setUint8(c + 3, a >> 12 & 63 | 128);
			b.setUint8(c + 4, a >> 6 & 63 | 128);
			b.setUint8(c + 5, a & 63 | 128);
			c += 6;
		}
		else
			throw new q('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
		return c - d;
	};
	w.En = a => {
		if (a < 0)
			throw new q('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
		if (a < 128)
			return 1;
		if (a < 2048)
			return 2;
		if (a < 65536)
			return 3;
		if (a < 2097152)
			return 4;
		if (a < 67108864)
			return 5;
		if (a < -2147483648)
			return 6;
		throw new q('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
	};
	w.Kf = a => {
		for (var b = 0, c = a.length, d = 0; c > d; d++)
			b += w.En(D.bj(a, d));
		return b;
	};
	w.Fn = a => {
		a >>>= 0;
		return a < 128 ? 1 : a < 16384 ? 2 : a < 2097152 ? 3 : a < 268435456 ? 4 : 5;
	};
	w.prototype = {
		Kg: function () {
			var a = new ArrayBuffer(this.a);
			var b = new Uint8Array(this.o.buffer, this.o.byteOffset, this.a);
			(new Uint8Array(a)).set(b);
			return a;
		}, Sb: function () {
			return new Uint8Array(this.o.buffer, this.o.byteOffset, this.a);
		}, Hd: function () {
			return new DataView(this.o.buffer, this.o.byteOffset, this.a);
		}, Gr: function () {
			return new F(this.Hd(), this.Sa);
		}, rc: function (a) {
			if (a > this.o.byteLength)
				this.Yq(a <= 2 * this.o.byteLength ? 2 * this.o.byteLength : a);
		}, Yq: function (a) {
			if (a < 1)
				throw new q('Can\'t resize buffer to a capacity lower than 1');
			if (a > this.o.byteLength) {
				var b = new Uint8Array(this.o.buffer);
				a = new ArrayBuffer(a);
				(new Uint8Array(a)).set(b);
				this.o = new DataView(a);
			}
		}, l: function (a) {
			var b = this.a++;
			this.rc(this.a);
			this.o.setUint8(b, a);
		}, Xi: function (a) {
			var b = this.a;
			this.a += 2;
			this.rc(this.a);
			this.o.setInt16(b, a, this.Sa);
		}, Ub: function (a) {
			var b = this.a;
			this.a += 2;
			this.rc(this.a);
			this.o.setUint16(b, a, this.Sa);
		}, O: function (a) {
			var b = this.a;
			this.a += 4;
			this.rc(this.a);
			this.o.setInt32(b, a, this.Sa);
		}, tb: function (a) {
			var b = this.a;
			this.a += 4;
			this.rc(this.a);
			this.o.setUint32(b, a, this.Sa);
		}, Wi: function (a) {
			var b = this.a;
			this.a += 4;
			this.rc(this.a);
			this.o.setFloat32(b, a, this.Sa);
		}, s: function (a) {
			var b = this.a;
			this.a += 8;
			this.rc(this.a);
			this.o.setFloat64(b, a, this.Sa);
		}, Vb: function (a) {
			var b = this.a;
			this.a += a.byteLength;
			this.rc(this.a);
			(new Uint8Array(this.o.buffer, this.o.byteOffset, this.o.byteLength)).set(a, b);
		}, Mg: function (a) {
			this.Vb(new Uint8Array(a));
		}, mc: function (a) {
			this.lb(w.Kf(a));
			this.Og(a);
		}, Db: function (a) {
			if (a == null)
				this.lb(0);
			else {
				this.lb(w.Kf(a) + 1);
				this.Og(a);
			}
		}, Im: function (a) {
			var b = w.Kf(a);
			if (b > 255)
				throw new q(null);
			this.l(b);
			this.Og(a);
		}, Ng: function (a) {
			this.mc(JSON.stringify(a));
		}, Og: function (a) {
			var b = this.a;
			this.rc(b + w.Kf(a));
			for (var c = a.length, d = 0; c > d; d++)
				b += w.uo(D.bj(a, d), this.o, b);
			this.a = b;
		}, lb: function (a) {
			var b = this.a;
			a >>>= 0;
			this.rc(b + w.Fn(a));
			this.o.setUint8(b, a | 128);
			if (a >= 128) {
				this.o.setUint8(b + 1, a >> 7 | 128);
				if (a >= 16384) {
					this.o.setUint8(b + 2, a >> 14 | 128);
					if (a >= 2097152) {
						this.o.setUint8(b + 3, a >> 21 | 128);
						if (a >= 268435456) {
							this.o.setUint8(b + 4, a >> 28 & 127);
							a = 5;
						}
						else {
							this.o.setUint8(b + 3, this.o.getUint8(b + 3) & 127);
							a = 4;
						}
					}
					else {
						this.o.setUint8(b + 2, this.o.getUint8(b + 2) & 127);
						a = 3;
					}
				}
				else {
					this.o.setUint8(b + 1, this.o.getUint8(b + 1) & 127);
					a = 2;
				}
			}
			else {
				this.o.setUint8(b, this.o.getUint8(b) & 127);
				a = 1;
			}
			this.a += a;
		}, f: w
	};
	I.b = true;
	I.yo = () => {
		try {
			return window.crypto.subtle.generateKey(I.qh, true, ['sign', 'verify']).then(a => {
				var b = a.privateKey;
				return window.crypto.subtle.exportKey('jwk', b).then(a => {
					var c = a.y;
					var e = a.d;
					var f = new I;
					f.Yi = a.x;
					f.Zi = c;
					f.Zj = e;
					f.Al = b;
					return f;
				});
			});
		}
		catch (a) {
			return Promise.reject(a instanceof q ? a.Ta : a);
		}
	};
	I.xo = a => {
		a = a.split('.');
		if (a.length != 4 || a[0] != 'idkey')
			return Promise.reject('Invalid id format');
		var b = a[1];
		var c = a[2];
		var d = a[3];
		return I.Xr(b, c, d).then(a => {
			var e = new I;
			e.Yi = b;
			e.Zi = c;
			e.Zj = d;
			e.Al = a;
			return e;
		});
	};
	I.Rr = (a, b) => {
		try {
			var c = new F(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
			c.B();
			var d = c.sb(c.Ob());
			var e = c.sb();
			var f = new F(new DataView(d.buffer, d.byteOffset, d.byteLength), false);
			var g = f.ic();
			var k = f.ic();
			var l = f.sb();
			if (b.byteLength != l.byteLength)
				return Promise.reject(null);
			for (var c = 0, t = l.byteLength; t > c; c++) {
				var h = c;
				if (b[h] != l[h])
					return Promise.reject(null);
			}
			return I.Wr(g, k).then(a => window.crypto.subtle.verify(I.mm, a, e, d)).then(a => {
				if (!a)
					throw new q(null);
				return g;
			});
		}
		catch (jc) {
			return Promise.reject(jc instanceof q ? jc.Ta : jc);
		}
	};
	I.Xr = (a, b, c) => {
		try {
			return window.crypto.subtle.importKey('jwk', {crv: 'P-256', ext: true, key_ops: ['sign'], kty: 'EC', d: c, x: a, y: b}, I.qh, true, ['sign']);
		}
		catch (d) {
			return Promise.reject(d instanceof q ? d.Ta : d);
		}
	};
	I.Wr = (a, b) => {
		try {
			return window.crypto.subtle.importKey('jwk', {crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: a, y: b}, I.qh, true, ['verify']);
		}
		catch (c) {
			return Promise.reject(c instanceof q ? c.Ta : c);
		}
	};
	I.prototype = {
		Ir: function () {
			return 'idkey.' + this.Yi + '.' + this.Zi + '.' + this.Zj;
		}, wr: function (a) {
			try {
				var b = w.ha(1024);
				b.l(1);
				var c = b.a;
				b.Ub(0);
				var d = b.a;
				b.mc(this.Yi);
				b.mc(this.Zi);
				b.Vb(a);
				var e = b.a - d;
				b.o.setUint16(c, e, b.Sa);
				var f = new Uint8Array(b.o.buffer, b.o.byteOffset + d, e);
				return window.crypto.subtle.sign(I.mm, this.Al, f).then(a => {
					b.Mg(a);
					return b.Sb();
				});
			}
			catch (g) {
				return Promise.reject(g instanceof q ? g.Ta : g);
			}
		}, f: I
	};
	Ja.b = true;
	Ja.gp = () => {
		if (Ja.li != null)
			return Ja.li;
		Ja.li = new Promise((a, b) => {
			var c = window.grecaptcha;
			if (c != null)
				a(c);
			else {
				c = window.document.createElement('script');
				c.src = 'https://www.google.com/recaptcha/api.js?onload=___recaptchaload&render=explicit';
				window.document.head.appendChild(c);
				window.___recaptchaload = () => a(window.grecaptcha);
				c.onerror = () => b(null);
			}
		});
		return Ja.li;
	};
	Ba.b = true;
	Ba.cg = a => new PerfectScrollbar(a, {handlers: Ba.Uo});
	mc.b = true;
	mc.ts = () => {
		var a = window;
		a.RTCPeerConnection = a.webkitRTCPeerConnection || a.mozRTCPeerConnection || a.RTCPeerConnection;
		a.RTCIceCandidate = a.webkitRTCIceCandidate || a.mozRTCIceCandidate || a.RTCIceCandidate;
		a.RTCSessionDescription = a.webkitRTCSessionDescription || a.mozRTCSessionDescription || a.RTCSessionDescription;
		var b = new RTCPeerConnection({iceServers: []});
		try {
			b.createAnswer()['catch'](() => {
			});
		}
		catch (e) {
			var a = a.RTCPeerConnection.prototype;
			var c = a.createOffer;
			var d = a.createAnswer;
			a.createOffer = function (a) {
				var b = this;
				return new Promise((d, e) => c.call(b, d, e, a));
			};
			a.createAnswer = function (a) {
				var b = this;
				return new Promise((c, e) => d.call(b, c, e, a));
			};
		}
	};
	Ca.b = true;
	Ca.ar = (a, b) => Ca.Xl(new Blob([a], {type: 'octet/stream'}), b);
	Ca.br = (a, b) => Ca.Xl(new Blob([a], {type: 'text/plain'}), b);
	Ca.Xl = (a, b) => {
		var c = window.document.createElement('a');
		c.style.display = 'display: none';
		window.document.body.appendChild(c);
		var d = URL.createObjectURL(a);
		c.href = d;
		c.download = b;
		c.click();
		URL.revokeObjectURL(d);
		c.remove();
	};
	Db.b = true;
	Db.prototype = {
		set: function (a) {
			if (a != this.value) {
				this.value = a;
				this.Ja.textContent = '' + this.value;
			}
		}, f: Db
	};
	v.b = true;
	v.Ea = a => {
		var b = new Map;
		var c = 0;
		for (a = a.querySelectorAll('[data-hook]'); a.length > c; c++) {
			var d = a[c];
			b.set(d.getAttribute('data-hook'), d);
		}
		return b;
	};
	v.Ga = (a, b) => {
		if (b == null)
			b = 'div';
		var c = window.document.createElement(b);
		c.innerHTML = a;
		return c.firstElementChild;
	};
	v.xe = (a, b) => a.parentElement.replaceChild(b, a);
	v.Cf = a => {
		for (var b = a.firstChild; b != null;) {
			a.removeChild(b);
			b = a.firstChild;
		}
	};
	zb.b = true;
	zb.eh = a => new Promise((b, c) => {
		a.onsuccess = () => b(a.result);
		a.onerror = c;
	});
	lc.b = true;
	lc.Dr = (a, b) => new Promise((c, d) => {
		var e = window.setTimeout(() => d('Timed out'), b);
		a.then(a => {
			window.clearTimeout(e);
			c(a);
		}, a => {
			window.clearTimeout(e);
			d(a);
		});
	});
	m.b = true;
	m.Fa = a => {
		if (a.Aa == null)
			a.Aa = true;
		if (a.Ba == null)
			a.Ba = true;
		return a;
	};
	m.Ha = a => {
		a.on = m.yf;
		if (a.za == null)
			throw new q('Class doesn\'t have a config');
		a.prototype.zf = a.za;
		m.Qm.set(m.yf, a);
		m.yf++;
	};
	m.lj = (a, b) => {
		var c = (a == null ? null : r.Nm(a)).on;
		if (c == null)
			throw new q('Tried to pack unregistered action');
		b.l(c);
		a.ua(b);
	};
	m.fh = a => {
		var b = a.B();
		var b = Object.create(m.Qm.get(b).prototype);
		b.da = 0;
		b.mb = 0;
		b.va(a);
		return b;
	};
	m.prototype = {
		$m: () => true, apply: () => {
			throw new q('missing implementation');
		}, va: () => {
			throw new q('missing implementation');
		}, ua: () => {
			throw new q('missing implementation');
		}, f: m
	};
	Ia.b = true;
	Ia.ss = (a, b, c) => {
		if (a.length == 0) {
			for (a = 0; b.length > a; a++)
				c.push(b[a]);
		}
		else if (b.length == 0) {
			for (b = 0; a.length > b; b++)
				c.push(a[b]);
		}
		else {
			for (var d = 0, e = a.length, f = 0, g = b.length; ;) {
				var k = a[d];
				var l = b[f];
				if (l.mb >= k.mb) {
					if (c.push(k), ++d, e <= d) {
						for (; g > f;)
							c.push(b[f++]);
						break;
					}
				}
				else if (c.push(l), ++f, g <= f) {
					for (; e > d;)
						c.push(a[d++]);
					break;
				}
			}
		}
	};
	Ia.prototype = {
		Rm: function (a) {
			for (var b = 0, c = a.mb, d = a.da, e = 0, f = this.list; f.length > e;) {
				var g = f[e];
				++e;
				var k = g.mb;
				if (c < k)
					break;
				if (c == k) {
					g = g.da;
					if (d < g)
						break;
					if (d == g)
						++d;
				}
				++b;
			}
			a.da = d;
			this.list.splice(b, 0, a);
		}, Cs: function (a) {
			for (var b = 0, c = 0, d = this.list; d.length > c && !(a <= d[c++].mb);)
				++b;
			this.list.splice(0, b);
		}, as: function (a, b) {
			for (var c = this.list; c.length > 0;)
				c.pop();
			Ia.ss(a.list, b.list, this.list);
		}, Ds: function (a) {
			for (var b = 0, c = this.list, d = 0, e = c.length; e > d;) {
				var f = c[d++];
				if (a != f.ue) {
					c[b] = f;
					++b;
				}
			}
			for (; b < c.length;)
				c.pop();
		}, bs: function (a) {
			for (var b = 0, c = 0, d = this.list; d.length > c && !(a <= d[c++].mb);)
				++b;
			return b;
		}, f: Ia
	};
	yb.b = true;
	yb.prototype = {f: yb};
	Ua.b = true;
	Ua.ma = m;
	Ua.prototype = C(m.prototype, {
		apply: function (a) {
			a.Sn(this.Rg);
		}, ua: function (a) {
			a.lb(this.Rg.byteLength);
			a.Mg(this.Rg);
		}, va: function (a) {
			this.Rg = a.Cl(a.Ab());
		}, f: Ua
	});
	cc.b = true;
	cc.prototype = {f: cc};
	Mb.b = true;
	Mb.prototype = {
		add: function (a) {
			for (var b = this.$a.length, c = 0, d = this.Qd = 0; b > d;) {
				var e = d++;
				var f = this.$a[e];
				f.index++;
				f.weight *= .97;
				if (f.index > this.$a[c].index)
					c = e;
				this.Qd += f.weight;
			}
			if (this.rs <= b) {
				b = this.$a[c];
				this.Qd -= b.weight;
				this.$a.splice(c, 1);
			}
			else
				b = new bc;
			b.value = a;
			b.weight = 1;
			b.index = 0;
			this.Qd += b.weight;
			for (a = 0; this.$a.length > a && b.value >= this.$a[a].value;)
				++a;
			this.$a.splice(a, 0, b);
		}, $g: function (a) {
			if (this.$a.length == 0)
				return 0;
			if (this.$a.length == 1)
				return this.$a[0].value;
			a *= this.Qd;
			for (var b = this.$a[0].weight, c = 0; this.$a.length - 1 > c && !(a <= b);) {
				++c;
				b += this.$a[c].weight;
			}
			return this.$a[c].value;
		}, max: function () {
			return this.$a.length == 0 ? 0 : this.$a[this.$a.length - 1].value;
		}, f: Mb
	};
	bc.b = true;
	bc.prototype = {f: bc};
	ac.b = true;
	ac.prototype = {
		stop: function () {
			this.hj.fc = null;
			this.hj.T.km(null);
			this.Nd.o.setUint16(0, this.Xm, this.Nd.Sa);
			this.Nd.Vb(this.Df.Sb());
			var a = pako.deflateRaw(this.Nd.Sb());
			var b = w.ha(a.byteLength + 32);
			b.Og('HBR2');
			b.tb(this.version);
			b.tb(this.hj.Y - this.ah);
			b.Vb(a);
			return b.Sb();
		}, f: ac
	};
	Ta.b = true;
	ya.b = true;
	V.b = true;
	V.ma = yb;
	V.prototype = C(yb.prototype, {
		ra: () => {
			throw new q('missing implementation');
		}, Sf: () => {
			throw new q('missing implementation');
		}, C: () => {
			throw new q('missing implementation');
		}, zj: function (a) {
			for (var b = this.le.list, c = 0, d = b.length, e = 0; a > e;) {
				for (++e; d > c;) {
					var f = b[c];
					if (this.Y != f.mb)
						break;
					f.apply(this.T);
					if (this.fc != null)
						this.fc(f);
					this.cc++;
					++c;
				}
				this.T.C(1);
				this.te += this.cc;
				this.cc = 0;
				this.Y++;
			}
			for (; d > c;) {
				a = b[c];
				if (this.Y != a.mb || this.cc != a.da)
					break;
				a.apply(this.T);
				if (this.fc != null)
					this.fc(a);
				this.cc++;
				++c;
			}
			b.splice(0, c);
		}, Cg: function (a) {
			if (this.Y == a.mb && this.cc >= a.da) {
				a.da = this.cc++;
				a.apply(this.T);
				if (this.fc != null)
					this.fc(a);
			}
			else
				this.le.Rm(a);
		}, wk: function (a, b) {
			if (a <= 0)
				return this.T;
			if (this.Ff < a)
				a = this.Ff;
			ya.zc++;
			var c = this.T.sc();
			var d;
			if (b != null) {
				this.Ri.as(this.le, b);
				d = this.Ri;
			}
			else
				d = this.le;
			d = d.list;
			for (var e = 0, f = d.length, g = this.Y, k = a | 0, l = g + k; l >= g;) {
				for (; f > e;) {
					var t = d[e];
					if (g < t.mb)
						break;
					if (t.zf.Ba)
						t.apply(c);
					++e;
				}
				c.C(l != g ? 1 : a - k);
				++g;
			}
			for (d = this.Ri.list; d.length > 0;)
				d.pop();
			return c;
		}, kr: function (a) {
			if (a > 300)
				a = 300;
			if (a < 0)
				a = 0;
			this.bc = this.Ac * a | 0;
		}, gm: function (a) {
			this.rd = this.Ac * (a < -200 ? -200 : a > 200 ? 200 : a);
		}, f: V
	});
	var xb = Ab['bas.marf.net.ConnFailReason'] = {
		Gf: true, nh: ['Cancelled', 'PeerFailed', 'Rejected', 'Other'], hh: {nb: 0, eb: 'bas.marf.net.ConnFailReason', toString: ga}, jh: {nb: 1, eb: 'bas.marf.net.ConnFailReason', toString: ga}, lh: (X = a => ({nb: 2, reason: a, eb: 'bas.marf.net.ConnFailReason', toString: ga}), X.Ae = ['reason'], X), ih: (X = a => ({
			nb: 3, description: a, eb: 'bas.marf.net.ConnFailReason', toString: ga
		}), X.Ae = ['description'], X)
	};
	xa.b = true;
	xa.xh = a => {
		switch (a.nb) {
			case 0:
				return 'Cancelled';
			case 1:
				return 'Failed to connect to peer.';
			case 2:
				return pc.description(a.reason);
			case 3:
				return a.description;
		}
	};
	xa.ma = V;
	xa.prototype = C(V.prototype, {
		ia: function (a) {
			if (this.pc != null) {
				this.pc.bd = null;
				this.pc.Gn();
				this.pc = null;
			}
			window.clearTimeout(this.re);
			if (this.pa != null) {
				this.pa.cf = null;
				this.pa.ia();
				this.pa = null;
			}
			this.ek = a == null ? 'Connection closed' : a;
			this.tf(4);
		}, tf: function (a) {
			if (a != this.pd) {
				this.pd = a;
				if (this.Ad != null)
					this.Ad(a);
			}
		}, wd: function () {
			return this.pd == 3;
		}, C: function () {
			if (this.wd() && this.nn < window.performance.now() - this.zm)
				this.zi();
			this.Xc = window.performance.now() * this.Ac + this.Qi.$g(.5) - this.Y;
			this.Oj();
		}, Sf: function () {
			if (this.wd()) {
				return this.bc < 0 && (this.bc = 0), this.wk(window.performance.now() * this.Ac + this.Qi.$g(.5) - this.Y + this.bc + this.rd, this.ug);
			}
			else
				return this.T;
		}, Oj: function () {
			if (this.Xc < 0)
				this.Xc = 0;
			if (this.Ff < this.Xc)
				this.Xc = this.Ff;
		}, uq: function (a) {
			switch (a.B()) {
				case 0:
					this.rq(a);
					break;
				case 1:
					this.qq(a);
					break;
				case 2:
					this.nq(a);
					break;
				case 3:
					this.wq(a);
					break;
				case 4:
					this.tq(a);
					break;
				case 5:
					this.pq(a);
					break;
				case 6:
					this.vq(a);
			}
		}, rq: function (a) {
			var b = this;
			a = a.sb(a.Ab());
			var c = Promise.resolve(null);
			if (this.Je != null)
				c = this.Je.wr(a);
			c['catch'](() => null).then(a => b.ir(a));
		}, qq: function (a) {
			a = pako.inflateRaw(a.sb());
			a = new F(new DataView(a.buffer, a.byteOffset, a.byteLength));
			this.uc = a.Ob();
			this.Y = a.hb();
			this.te = a.hb();
			this.cc = a.Ab();
			this.Xc = 10;
			for (this.T.ja(a); a.o.byteLength - a.a > 0;)
				this.Cg(this.Gm(a));
			window.clearTimeout(this.re);
			this.tf(3);
		}, ir: function (a) {
			var b = w.ha();
			b.l(0);
			if (a != null) {
				b.lb(a.byteLength);
				b.Vb(a);
			}
			else
				b.lb(0);
			b.lb(this.Uh.byteLength);
			b.Mg(this.Uh);
			this.Rb(b);
			this.Uh = null;
		}, Rb: function (a, b) {
			if (b == null)
				b = 0;
			this.pa.Rb(b, a);
		}, Gm: a => {
			var b = a.hb();
			var c = a.Ab();
			var d = a.Ob();
			var e = a.hb();
			a = m.fh(a);
			a.P = d;
			a.ue = e;
			a.mb = b;
			a.da = c;
			return a;
		}, nq: function (a) {
			a = this.Gm(a);
			this.Cg(a);
			if (this.uc == a.P)
				this.ug.Ds(a.ue);
			this.Bl();
		}, vq: function (a) {
			a = m.fh(a);
			a.P = 0;
			a.ue = 0;
			a.apply(this.T);
			if (this.fc != null)
				this.fc(a);
		}, wq: function (a) {
			var b = a.hb();
			a = a.hb();
			this.pi.push({frame: b, yf: a});
			this.Bl();
		}, Bl: function () {
			if (this.pd == 3) {
				for (var a = 0, b = this.pi; b.length > a; a++) {
					var c = b[a];
					if (this.Y < c.frame) {
						if (this.te + this.cc + this.le.bs(c.frame) == c.yf)
							this.vn(c.frame - this.Y);
					}
				}
				for (var a = 0, b = this.pi, c = 0, d = b.length; d > c;) {
					var e = b[c++];
					if (this.Y < e.frame) {
						b[a] = e;
						++a;
					}
				}
				for (; a < b.length;)
					b.pop();
				this.ug.Cs(this.Y);
			}
		}, pq: function (a) {
			var b = a.B() != 0;
			var c = a.ic();
			var d = '';
			if (a.o.byteLength - a.a > 0)
				d = a.ic();
			if (b)
				a = 'You were banned';
			else
				a = 'You were kicked';
			if (d != '')
				a += ' by ' + d;
			if (c != '')
				a += ' (' + c + ')';
			this.ia(a);
		}, tq: function (a) {
			var b = a.u();
			a = a.u();
			var c = window.performance.now() - a;
			this.Qi.add(b - a * this.Ac);
			this.sg.add(c);
			for (var d = b = 0, e = this.Di; e.length > d;) {
				var f = e[d];
				++d;
				if (a < f)
					break;
				if (a > f)
					y.i(this.dl, -1);
				else
					y.i(this.dl, c);
				++b;
			}
			this.Di.splice(0, b);
		}, zi: function () {
			var a = window.performance.now();
			this.zm = a;
			this.Di.push(a);
			var b = this.sg.$g(.5) | 0;
			var c = w.ha();
			c.l(2);
			c.s(a);
			c.lb(b);
			this.Rb(c, 2);
		}, vn: function (a) {
			this.zj(a);
			this.Xc -= a;
			this.Oj();
		}, ra: function (a) {
			if (this.pd == 3) {
				var b = this.Ap++;
				var c = 0;
				if (this.bc < 0)
					this.bc = 0;
				if (a.zf.Aa)
					c = this.Y + (this.Xc | 0) + this.bc;
				var d = w.ha();
				d.l(1);
				d.tb(c);
				d.tb(b);
				m.lj(a, d);
				this.Rb(d);
				if (a.zf.Ba) {
					a.ue = b;
					a.P = this.uc;
					a.mb = c;
					this.ug.Rm(a);
				}
			}
		}, f: xa
	});
	Lb.b = true;
	Lb.ma = V;
	Lb.prototype = C(V.prototype, {
		ia: function () {
			this.Ic.ia();
			for (var a = 0, b = this.ac; b.length > a;) {
				var c = b[a++].pa;
				c.cf = null;
				c.lg = null;
				c.ia();
			}
		}, to: function (a, b, c, d) {
			var e = this.Ie.get(a);
			if (e != null) {
				if (d) {
					var f = this.Ic.zn(e.pa);
					this.Kj.set(a, f);
				}
				a = w.ha();
				a.l(5);
				a.l(d ? 1 : 0);
				a.mc(b);
				if (c == null)
					c = '';
				a.mc(c);
				e.Rb(a);
				e.pa.ia();
			}
		}, Ud: function () {
			this.Ic.Ud();
			this.Kj.clear();
		}, Fi: function (a) {
			this.Ic.Fi(a);
		}, Ei: function (a) {
			this.Ic.Ei(a);
		}, ra: function (a) {
			a.P = 0;
			var b = this.Y + this.wi + this.bc;
			if (!a.zf.Aa)
				b = this.Y;
			a.mb = b;
			this.Cg(a);
			this.Ci();
			if (this.ac.length > 0)
				this.Eg(this.Zh(a), 1);
		}, C: function () {
			var a = ((window.performance.now() - this.Li) * this.Ac | 0) - this.Y;
			if (a > 0)
				this.zj(a);
			if (this.Y - this.Kk >= 7)
				this.Ci();
			if (this.Mn <= this.Y - this.Jk) {
				this.Ci();
				this.gr();
			}
		}, Sf: function () {
			if (this.bc < 0)
				this.bc = 0;
			return this.wk((window.performance.now() - this.Li) * this.Ac - this.Y + this.wi + this.bc + this.rd);
		}, Oo: function (a, b) {
			if (this.fg <= this.ac.length)
				return gc.kh(4100);
			try {
				if (this.Sr != b.Ob())
					throw new q(null);
			}
			catch (d) {
				return gc.kh(4103);
			}
			try {
				var c = b.zb();
				if (this.Ib != null && this.Ib != c)
					throw new q(null);
			}
			catch (d) {
				return gc.kh(4101);
			}
			return gc.hn;
		}, Lp: function (a) {
			var b = this;
			if (this.fg <= this.ac.length)
				a.ia();
			else {
				var c = new $b(a);
				this.ac.push(c);
				a.lg = a => {
					a = new F(new DataView(a));
					b.oq(a, c);
				};
				a.cf = () => {
					D.remove(b.ac, c);
					b.Ie['delete'](c.$);
					y.i(b.Ip, c.$);
				};
				a = w.ha(1 + c.He.byteLength);
				a.l(0);
				a.lb(c.He.byteLength);
				a.Vb(c.He);
				c.Rb(a);
			}
		}, Zh: function (a) {
			var b = w.ha();
			b.l(2);
			this.il(a, b);
			return b;
		}, il: (a, b) => {
			b.tb(a.mb);
			b.lb(a.da);
			b.Ub(a.P);
			b.tb(a.ue);
			m.lj(a, b);
		}, Ci: function () {
			if (this.Y - this.Kk > 0 && this.ac.length != 0) {
				var a = w.ha();
				a.l(3);
				a.tb(this.Y);
				a.tb(this.te);
				this.Eg(a, 2);
				this.Kk = this.Y;
			}
		}, Eg: function (a, b) {
			if (b == null)
				b = 0;
			for (var c = 0, d = this.ac; d.length > c;) {
				var e = d[c];
				++c;
				if (e.yg)
					e.Rb(a, b);
			}
		}, hr: function (a) {
			var b = w.ha();
			b.l(1);
			var c = w.ha();
			c.Ub(a.$);
			c.tb(this.Y);
			c.tb(this.te);
			c.lb(this.cc);
			this.T.ga(c);
			for (var d = this.le.list, e = 0, f = d.length; f > e;)
				this.il(d[e++], c);
			b.Vb(pako.deflateRaw(c.Sb()));
			a.Rb(b);
		}, gr: function () {
			this.Jk = this.Y;
			if (this.ac.length != 0) {
				var a = new Ua;
				a.mb = this.Y;
				a.da = this.cc++;
				a.P = 0;
				a.Rg = this.T.Ao();
				this.Eg(this.Zh(a));
			}
		}, yq: function (a, b) {
			var c = this;
			var d = a.sb(a.Ab());
			var e = a.sb(a.Ab());
			var f = b.He;
			b.He = null;
			I.Rr(d, f)['catch'](() => null).then(a => {
				try {
					if (c.ac.indexOf(b) != -1) {
						b.Ns = a;
						var d = c.up++;
						b.$ = d;
						c.Ie.set(d, b);
						ia.i(c.Hp, d, new F(new DataView(e.buffer, e.byteOffset, e.byteLength), false));
						b.yg = true;
						c.hr(b);
					}
				}
				catch (l) {
					c.xk(b, l instanceof q ? l.Ta : l);
				}
			});
		}, oq: function (a, b) {
			this.C();
			try {
				if (!b.Ho.Cm())
					throw new q(1);
				var c = a.B();
				if (b.yg) switch (c) {
					case 1:
						this.zq(a, b);
						break;
					case 2:
						this.sq(a, b);
						break;
					default:
						throw new q(0);
				}
				else if (c == 0)
					this.yq(a, b);
				else
					throw new q(0);
				if (a.o.byteLength - a.a > 0)
					throw new q(2);
			}
			catch (d) {
				this.xk(b, d instanceof q ? d.Ta : d);
			}
		}, xk: function (a, b) {
			window.console.log(b);
			this.Ie['delete'](a.$);
			D.remove(this.ac, a);
			if (a.yg && this.$k != null)
				this.$k(a.$);
			a.pa.ia();
		}, sq: function (a, b) {
			var c = a.u();
			b.yb = a.Ab();
			var d = w.ha();
			d.l(4);
			d.s((window.performance.now() - this.Li) * this.Ac + this.wi);
			d.s(c);
			b.Rb(d, 2);
		}, zq: function (a, b) {
			var c = a.hb();
			var d = a.hb();
			var e = m.fh(a);
			var f = e.zf.oj;
			if (f != null) {
				var g = b.xj.get(f);
				if (g == null) {
					g = new tb(f.$i, f.uj);
					b.xj.set(f, g);
				}
				if (!g.Cm())
					throw new q(3);
			}
			f = this.Y;
			g = this.Y + 120;
			e.ue = d;
			e.P = b.$;
			e.mb = f > c ? f : g < c ? g : c;
			if (e.$m(this.T)) {
				this.Cg(e);
				this.Eg(this.Zh(e), 1);
			}
		}, f: Lb
	});
	$b.b = true;
	$b.prototype = {
		Rb: function (a, b) {
			if (b == null)
				b = 0;
			this.pa.Rb(b, a);
		}, f: $b
	};
	Zb.b = true;
	Kb.b = true;
	Kb.prototype = {f: Kb};
	Jb.b = true;
	Jb.ma = V;
	Jb.prototype = C(V.prototype, {
		Cq: function (a) {
			for (var b = a.Ob(), c = 0, d = 0; b > d;) {
				++d;
				var c = c + a.Ab();
				var e = a.B();
				this.Vk.push({mj: c / this.mf, kind: e});
			}
		}, Dl: function () {
			var a = this.Lc;
			if (a.o.byteLength - a.a > 0) {
				a = this.Lc.Ab();
				this.hg += a;
				a = this.Lc.Ob();
				this.gg = m.fh(this.Lc);
				this.gg.P = a;
			}
			else
				this.gg = null;
		}, Go: function () {
			return this.Y / this.mf;
		}, ra: () => {
		}, Sf: function () {
			this.C();
			ya.zc++;
			var a = this.T.sc();
			a.C(this.sk);
			return a;
		}, C: function () {
			var a = window.performance.now();
			var b = a - this.Wh;
			this.Wh = a;
			if (this.Fd > 0) {
				this.Qb += 10000;
				if (this.Fd < this.Qb) {
					this.Qb = this.Fd;
					this.Fd = -1;
				}
			}
			else
				this.Qb += b * this.pl;
			a = this.mf * this.mh;
			if (a < this.Qb)
				this.Qb = a;
			b = this.Qb * this.Ac;
			a = b | 0;
			for (this.sk = b - a; a > this.Y;) {
				for (; this.gg != null && this.Y == this.hg;) {
					b = this.gg;
					b.apply(this.T);
					if (this.fc != null)
						this.fc(b);
					this.Dl();
				}
				this.Y++;
				this.T.C(1);
			}
		}, er: function (a) {
			this.Fd = a;
			if (this.Qb > a)
				this.ui();
		}, ui: function () {
			this.hg = 0;
			this.Qb = this.Y = this.Lc.a = 0;
			this.T.ja(this.Lc);
			this.Dl();
		}, f: Jb
	});
	Ib.b = true;
	Ib.prototype = {
		eval: function (a) {
			var b = this.Yb.length - 1;
			if (this.Yb[0] >= a)
				return this.Yb[1];
			if (this.Yb[b] <= a)
				return this.Yb[b - 2];
			for (var c = 0, b = b / 5 | 0; ;) {
				var d = b + c >>> 1;
				if (this.Yb[5 * d] < a)
					c = d + 1;
				else
					b = d - 1;
				if (b < c)
					break;
			}
			c = 5 * b;
			b = this.Yb[c];
			a = (a - b) / (this.Yb[c + 5] - b);
			b = a * a;
			d = b * a;
			return (2 * d - 3 * b + 1) * this.Yb[c + 1] + (d - 2 * b + a) * this.Yb[c + 2] + (-2 * d + 3 * b) * this.Yb[c + 3] + (d - b) * this.Yb[c + 4];
		}, f: Ib
	};
	H.b = true;
	H.prototype = {f: H};
	M.b = true;
	M.Pl = (a, b, c, d, e) => new Promise((f, g) => {
		var k = new XMLHttpRequest;
		k.open(b, a);
		k.responseType = c;
		k.onload = () => {
			if (k.status >= 200 && k.status < 300) {
				if (k.response != null)
					f(k.response);
				else
					g(null);
			}
			else
				g('status: ' + k.status);
		};
		k.onerror = a => g(a);
		if (e != null)
			k.setRequestHeader('Content-type', e);
		k.send(d);
	});
	M.L = (a, b) => M.Pl(a, 'GET', b, null);
	M.tk = a => M.L(a, 'json').then(a => {
		var b = a.error;
		if (b != null)
			throw new q(b);
		return a.data;
	});
	M.mq = (a, b, c) => M.Pl(a, 'POST', 'json', b, c);
	M.zl = (a, b, c) => M.mq(a, b, c).then(a => {
		var b = a.error;
		if (b != null)
			throw new q(b);
		return a.data;
	});
	A.b = true;
	A.i = a => {
		if (a != null)
			a();
	};
	y.b = true;
	y.i = (a, b) => {
		if (a != null)
			a(b);
	};
	ia.b = true;
	ia.i = (a, b, c) => {
		if (a != null)
			a(b, c);
	};
	Cb.b = true;
	Cb.i = (a, b, c, d) => {
		if (a != null)
			a(b, c, d);
	};
	vb.b = true;
	vb.i = (a, b, c, d, e) => {
		if (a != null)
			a(b, c, d, e);
	};
	tb.b = true;
	tb.prototype = {
		Cm: function (a) {
			if (a == null)
				a = 1;
			this.C();
			if (this.oc >= a) {
				return this.oc -= a, true;
			}
			else
				return false;
		}, Cr: function (a) {
			this.C();
			a -= this.oc;
			return a <= 0 ? 0 : this.Ve + a * this.Si - window.performance.now();
		}, Zn: function (a, b) {
			var c = this.Cr(a);
			this.oc -= a;
			window.setTimeout(b, c | 0);
		}, C: function () {
			var a = window.performance.now();
			var b = Math.floor((a - this.Ve) / this.Si);
			this.Ve += b * this.Si;
			this.oc += b;
			if (this.Nj <= this.oc) {
				this.oc = this.Nj;
				this.Ve = a;
			}
		}, f: tb
	};
	Hb.b = true;
	Hb.gf = a => {
		var b = new fc('([^&=]+)=?([^&]*)', 'g');
		a = a.substring(1);
		for (var c = 0, d = new Map; b.os(a, c);) {
			var c = b.Wm(1);
			var c = decodeURIComponent(c.split('+').join(' '));
			var e = b.Wm(2);
			d.set(c, decodeURIComponent(e.split('+').join(' ')));
			c = b.ps();
			c = c.mj + c.ms;
		}
		return d;
	};
	Hb.L = () => Hb.gf(window.top.location.search);
	ub.b = true;
	ub.cq = a => {
		if (a.length < 3)
			throw new q('Not enough arguments');
		if (a.length > 7)
			throw new q('Too many arguments');
		var b = new Pa;
		var c = new ka;
		b.Sg = c;
		switch (a[1]) {
			case 'blue':
				c.fb = [p.xa.R];
				b.ea = p.xa;
				break;
			case 'red':
				c.fb = [p.fa.R];
				b.ea = p.fa;
				break;
			default:
				throw new q('First argument must be either "red" or "blue"');
		}
		if (a[2] == 'clear')
			return b;
		c.hd = 256 * K.parseInt(a[2]) / 360 | 0;
		c.ed = K.parseInt('0x' + a[3]);
		if (a.length > 4) {
			c.fb = [];
			for (var d = 4, e = a.length; e > d;)
				c.fb.push(K.parseInt('0x' + a[d++]));
		}
		return b;
	};
	ub.prototype = {
		gf: function (a) {
			var b = this;
			if (a.charAt(0) != '/')
				return false;
			if (a.length == 1)
				return true;
			a = J.Gs(D.substr(a, 1, null)).split(' ');
			var c = a[0];
			switch (c) {
				case 'avatar':
					if (a.length == 2) {
						this.fm(a[1]);
						this.ba('Avatar set');
					}
					break;
				case 'checksum':
					var d = this.ya.T.S;
					a = d.w;
					if (d.Pe())
						this.ba('Current stadium is original: "' + a + '"');
					else {
						d = J.Vg(d.Sj(), 8);
						this.ba('Stadium: "' + a + '" (checksum: ' + d + ')');
					}
					break;
				case 'clear_avatar':
					this.fm(null);
					this.ba('Avatar cleared');
					break;
				case 'clear_bans':
					if (this.Ud == null)
						this.ba('Only the host can clear bans');
					else {
						this.Ud();
						this.ba('All bans have been cleared');
					}
					break;
				case 'clear_password':
					if (this.Fg == null)
						this.ba('Only the host can change the password');
					else {
						this.Fg(null);
						this.ba('Password cleared');
					}
					break;
				case 'colors':
					try {
						d = ub.cq(a);
						this.ya.ra(d);
					}
					catch (g) {
						if (g instanceof q) {
							a = g.Ta;
							typeof a == 'string' && this.ba(a);
						}
						else {
							a = g;
							typeof a == 'string' && this.ba(a);
						}
					}
					break;
				case 'extrapolation':
					if (a.length == 2) {
						a = K.parseInt(a[1]);
						if (a != null && a >= -200 && a <= 200) {
							n.A.rd.Xa(a);
							this.ya.gm(a);
							this.ba('Extrapolation set to ' + a + ' msec');
						}
						else
							this.ba('Extrapolation must be a value between -200 and 50 milliseconds');
					}
					else
						this.ba('Extrapolation requires a value in milliseconds.');
					break;
				case 'handicap':
					if (a.length == 2) {
						a = K.parseInt(a[1]);
						if (a != null && a >= 0 && a <= 300) {
							this.ya.kr(a);
							this.ba('Ping handicap set to ' + a + ' msec');
						}
						else
							this.ba('Ping handicap must be a value between 0 and 300 milliseconds');
					}
					else
						this.ba('Ping handicap requires a value in milliseconds.');
					break;
				case 'kick_ratelimit':
					if (a.length < 4)
						this.ba('Usage: /kick_ratelimit <min> <rate> <burst>');
					else {
						var d = K.parseInt(a[1]);
						var e = K.parseInt(a[2]);
						a = K.parseInt(a[3]);
						if (d == null || e == null || a == null)
							this.ba('Invalid arguments');
						else
							this.ya.ra(ma.la(d, e, a));
					}
					break;
				case 'recaptcha':
					if (this.jm == null)
						this.ba('Only the host can set recaptcha mode');
					else
						try {
							if (a.length == 2) {
								switch (a[1]) {
									case 'off':
										e = false;
										break;
									case 'on':
										e = true;
										break;
									default:
										throw new q(null);
								}
								this.jm(e);
								this.ba('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
							}
							else
								throw new q(null);
						}
						catch (g) {
							this.ba('Usage: /recaptcha <on|off>');
						}
					break;
				case 'set_password':
					if (a.length == 2) {
						if (this.Fg == null)
							this.ba('Only the host can change the password');
						else {
							this.Fg(a[1]);
							this.ba('Password set');
						}
					}
					break;
				case 'store':
					var f = this.ya.T.S;
					if (f.Pe())
						this.ba('Can\'t store default stadium.');
					else {
						Z.Es().then(() => Z.add(f)).then(() => b.ba('Stadium stored'), () => b.ba('Couldn\'t store stadium'));
					}
					break;
				default:
					this.ba('Unrecognized command: "' + c + '"');
			}
			return true;
		}, fm: function (a) {
			if (a != null)
				a = U.Qc(a, 2);
			n.A.sh.Xa(a);
			this.ya.ra(ra.la(a));
		}, f: ub
	};
	Ha.b = true;
	ba.b = true;
	ba.Yl = a => {
		var b = new Date;
		Ca.ar(a, 'HBReplay-' + b.getFullYear() + '-' + J.Af('' + (b.getMonth() + 1)) + '-' + J.Af('' + b.getDate()) + '-' + J.Af('' + b.getHours()) + 'h' + J.Af('' + b.getMinutes()) + 'm.hbr2');
	};
	ba.Bq = a => {
		for (var b = a.T.I, c = [], d = 0, e = 0, f = 0; b.length > f;) {
			var g = b[f];
			++f;
			if (p.Ia == g.ea)
				c.push(g.V);
			if (p.fa == g.ea)
				++d;
			else if (p.xa == g.ea)
				++e;
		}
		f = c.length;
		if (f != 0) {
			b = () => c.splice(Math.random() * c.length | 0, 1)[0];
			if (d == e) {
				if (f >= 2) {
					a.ra(S.la(b(), p.fa));
					a.ra(S.la(b(), p.xa));
				}
			}
			else {
				if (d < e)
					d = p.fa;
				else
					d = p.xa;
				a.ra(S.la(b(), d));
			}
		}
	};
	ba.prototype = {
		zr: function () {
			this.Ed = new ac(this.ya, 3);
		}, vr: function (a) {
			var b = this;
			a = new gb(a);
			a.qb = () => b.j.bb(null);
			a.ei = (a, d, e) => {
				b.ya.ra(Y.la(a, d, e));
				b.j.bb(null);
			};
			this.j.bb(a.g);
		}, ia: function () {
			window.document.removeEventListener('keydown', G(this, this.Bd));
			window.document.removeEventListener('keyup', G(this, this.Cd));
			window.onbeforeunload = null;
			window.cancelAnimationFrame(this.De);
			this.ob.ia();
			window.clearInterval(this.Gh);
			window.clearInterval(this.Qr);
			window.clearTimeout(this.Nf);
		}, Wq: function (a) {
			for (var b = [], c = 0, d = this.ya.T.I; d.length > c;) {
				var e = d[c];
				++c;
				if (a == e.ea)
					b.push(S.la(e.V, p.Ia));
			}
			for (a = 0; b.length > a;)
				this.ya.ra(b[a++]);
		}, bf: function () {
			this.De = window.requestAnimationFrame(G(this, this.bf));
			this.ob.C();
			this.ya.C();
			this.Kc();
		}, Kc: function () {
			var a = window.performance.now();
			if (n.A.Fh.L() != 1 || a - this.$c >= 28.333333333333336) {
				this.$c = a;
				this.sd++;
				this.uf();
				a = this.ya.T.na(this.ya.uc);
				if (a != null)
					this.xi = a.cb;
				this.j.C(this.ya);
			}
		}, Gp: function (a) {
			var b = this;
			this.Of.gf(a) || this.Jn.Zn(1, () => {
				var c = new Na;
				c.Tc = a;
				b.ya.ra(c);
			});
		}, Fp: function (a) {
			var b = this;
			this.zh = a;
			if (this.Nf == null) {
				this.Nf = window.setTimeout(() => {
					b.Nf = null;
					b.bm(b.zh);
				}, 1000);
				this.bm(this.zh);
			}
		}, bm: function (a) {
			if (this.Ik != a) {
				this.ya.ra(na.la(a ? 0 : 1));
				this.Ik = a;
			}
		}, Bm: function () {
			if (this.ya.T.K != null) {
				var a = new Oa;
				a.Bf = this.ya.T.K.Oa != 120;
				this.ya.ra(a);
			}
		}, Bd: function (a) {
			switch (a.keyCode) {
				case 9:
				case 13:
					this.j.Qa.gb.focus();
					a.preventDefault();
					break;
				case 27:
					if (this.j.Zo())
						this.j.bb(null);
					else {
						var b = this.j;
						b.me(!b.Gd);
					}
					a.preventDefault();
					break;
				case 49:
					n.A.Tb.Xa(1);
					break;
				case 50:
					n.A.Tb.Xa(2);
					break;
				case 51:
					n.A.Tb.Xa(3);
					break;
				case 52:
					n.A.Tb.Xa(0);
					break;
				case 80:
					this.Bm();
					break;
				default:
					this.ob.Bd(a.code);
			}
		}, uf: function () {
			var a = n.A.Tb.L();
			var b = this.j.Fb;
			var c = b.Eb;
			c.zg = n.A.Sl.L();
			if (a == 0) {
				b.Gg(true);
				c.kf = 1;
				c.jf = 0;
				c.xf = 0;
			}
			else {
				b.Gg(false);
				c.xf = 35;
				if (a == -1)
					c.jf = 450;
				else {
					c.jf = 0;
					c.kf = 1 + .25 * (a - 1);
				}
			}
		}, Cd: function (a) {
			this.ob.Cd(a.code);
		}, f: ba
	};
	Gb.b = true;
	Gb.prototype = {
		Ti: function (a) {
			var b = this.j.Qa.Bc;
			var c = [];
			var d = 0;
			for (a = a.I; a.length > d; d++) {
				var e = a[d];
				c.push({w: e.w, $: e.V});
			}
			b.Hj = c;
		}, ri: function (a) {
			function b(a) {
				return a == null ? '' : ' by ' + a.w;
			}

			var c = this;
			this.Ti(a);
			a.tl = b => {
				c.j.Qa.Gb('' + b.w + ' has joined');
				n.Na.cd(n.Na.$o);
				c.Ti(a);
			};
			a.ul = (d, e, f, g) => {
				y.i(c.Op, d.V);
				if (e == null)
					d = '' + d.w + ' has left';
				else {
					vb.i(c.Np, d.V, e, g != null ? g.w : null, f);
					d = '' + d.w + ' was ' + (f ? 'banned' : 'kicked') + b(g) + (e != '' ? ' (' + e + ')' : '');
				}
				c.j.Qa.Gb(d);
				n.Na.cd(n.Na.ep);
				c.Ti(a);
			};
			a.rl = (a, b) => {
				var d = c.Rh != null && b.indexOf(c.Rh) != -1;
				c.j.Qa.ba('' + a.w + ': ' + b, d ? 'highlight' : null);
				if (n.A.om.L() && d)
					n.Na.cd(n.Na.zk);
				else if (n.A.Hi.L())
					n.Na.cd(n.Na.Rj);
			};
			a.Vl = (a, b, f, g) => {
				c.j.Qa.pp(a, b, f);
				if (n.A.Hi.L()) switch (g) {
					case 1:
						n.Na.cd(n.Na.Rj);
						break;
					case 2:
						n.Na.cd(n.Na.zk);
				}
			};
			a.ji = () => n.Na.cd(n.Na.bp);
			a.Ni = a => {
				n.Na.cd(n.Na.Io);
				var b = c.j.Fb.Eb.td;
				b.Pa(p.fa == a ? b.Fq : b.Bn);
			};
			a.Oi = a => {
				var b = c.j.Fb.Eb.td;
				b.Pa(p.fa == a ? b.Gq : b.Cn);
				c.j.Qa.Gb('' + a.w + ' team won the match');
			};
			a.ml = (a, e, f) => {
				if (e && !f)
					c.j.Qa.Gb('Game paused' + b(a));
			};
			a.Pi = () => {
				var a = c.j.Fb.Eb.td;
				a.Pa(a.Ar);
			};
			a.Ki = a => {
				c.j.me(false);
				c.j.Fb.Eb.td.Nn();
				c.j.Qa.Gb('Game started' + b(a));
			};
			a.vf = a => {
				if (a != null)
					c.j.Qa.Gb('Game stopped' + b(a));
			};
			a.Ii = (a, e) => {
				if (!e.Pe()) {
					var d = J.Vg(e.Sj(), 8);
					c.j.Qa.Gb('Stadium "' + e.w + '" (' + d + ') loaded' + b(a));
				}
			};
			a.sl = a => c.j.Qa.Gb('' + a.w + ' ' + (a.Ld ? 'has desynchronized' : 'is back in sync'));
			a.xl = (d, e, f) => {
				if (a.K != null)
					c.j.Qa.Gb('' + e.w + ' was moved to ' + f.w + b(d));
			};
			a.ii = (a, e) => {
				var d = e.w;
				c.j.Qa.Gb((e.cb ? '' + d + ' was given admin rights' : '' + d + '\'s admin rights were taken away') + b(a));
			};
			a.wl = (a, b) => c.j.Fb.Eb.Po(a, b);
			a.Hk = (a, e, f, g) => c.j.Qa.Gb('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(a));
		}, Lr: a => {
			a.tl = null;
			a.ul = null;
			a.rl = null;
			a.Vl = null;
			a.ji = null;
			a.Ni = null;
			a.Oi = null;
			a.ml = null;
			a.Pi = null;
			a.Ki = null;
			a.vf = null;
			a.Ii = null;
			a.sl = null;
			a.xl = null;
			a.ii = null;
			a.wl = null;
			a.Hk = null;
		}, f: Gb
	};
	Ra.b = true;
	Ra.Fk = a => {
		switch (n.A.tg.L().L(a)) {
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
	};
	Ra.prototype = {
		ia: function () {
			window.document.removeEventListener('focusout', G(this, this.al));
		}, C: function () {
			var a = this.$d;
			if (this.ng != null && this.Yf != a) {
				this.Yf = a;
				var b = new Ga;
				b.input = a;
				this.ng(b);
			}
		}, Bd: function (a) {
			this.$d |= Ra.Fk(a);
		}, Cd: function (a) {
			this.$d &= ~Ra.Fk(a);
		}, al: function () {
			if (this.ng != null && this.Yf != 0) {
				this.Yf = this.$d = 0;
				var a = new Ga;
				a.input = 0;
				this.ng(a);
			}
		}, f: Ra
	};
	T.b = true;
	T.Hh = a => T.Rf(JSON.parse(a));
	T.Rf = a => {
		var b = new T;
		b.Ec = a.lat;
		b.Gc = a.lon;
		b.ub = a.code.toLowerCase();
		return b;
	};
	T.Fo = () => M.tk(n.Ee + 'api/geo').then(a => T.Rf(a));
	T.prototype = {
		se: function () {
			return JSON.stringify({lat: this.Ec, lon: this.Gc, code: this.ub});
		}, f: T
	};
	Yb.b = true;
	Yb.prototype = {
		Lh: function () {
			return this.Ne.L() != null ? this.Ne.L() : this.Me.L() != null ? this.Me.L() : new T;
		}, f: Yb
	};
	Xb.b = true;
	Xb.Pm = () => {
		try {
			var a = window.localStorage;
			a.getItem('');
			if (a.length == 0) {
				var b = '_hx_' + Math.random();
				a.setItem(b, b);
				a.removeItem(b);
			}
			return a;
		}
		catch (c) {
			return null;
		}
	};
	wa.b = true;
	wa.prototype = {
		L: function () {
			return this.Hm;
		}, Xa: function (a) {
			this.Hm = a;
			if (this.Yh != null) try {
				var b = this.Ur(a);
				if (b == null)
					this.Yh.removeItem(this.w);
				else
					this.Yh.setItem(this.w, b);
			}
			catch (c) {
			}
		}, f: wa
	};
	W.b = true;
	W.Rf = a => {
		for (var b = new W, c = ec.Mm(a), d = 0; c.length > d; d++) {
			var e = c[d];
			b.Yc.set(e, a[e]);
		}
		return b;
	};
	W.Hh = a => W.Rf(JSON.parse(a));
	W.$j = () => {
		var a = new W;
		a.Pa('ArrowUp', 'Up');
		a.Pa('KeyW', 'Up');
		a.Pa('ArrowDown', 'Down');
		a.Pa('KeyS', 'Down');
		a.Pa('ArrowLeft', 'Left');
		a.Pa('KeyA', 'Left');
		a.Pa('ArrowRight', 'Right');
		a.Pa('KeyD', 'Right');
		a.Pa('KeyX', 'Kick');
		a.Pa('Space', 'Kick');
		a.Pa('ControlLeft', 'Kick');
		a.Pa('ControlRight', 'Kick');
		a.Pa('ShiftLeft', 'Kick');
		a.Pa('ShiftRight', 'Kick');
		a.Pa('Numpad0', 'Kick');
		return a;
	};
	W.prototype = {
		Pa: function (a, b) {
			this.Yc.set(a, b);
		}, L: function (a) {
			return this.Yc.get(a);
		}, Jq: function (a) {
			this.Yc['delete'](a);
		}, Eo: function (a) {
			for (var b = [], c = this.Yc.keys(), d = c.next(); !d.done;) {
				var e = d.value;
				var d = c.next();
				if (a == this.Yc.get(e))
					b.push(e);
			}
			return b;
		}, se: function () {
			for (var a = {}, b = this.Yc.keys(), c = b.next(); !c.done;) {
				var d = c.value;
				var c = b.next();
				a[d] = this.Yc.get(d);
			}
			return JSON.stringify(a);
		}, f: W
	};
	n.b = true;
	Wb.b = true;
	Wb.prototype = {f: Wb};
	u.b = true;
	u.qp = () => {
		mc.ts();
		x.fj(() => u.jk(u.xq));
		u.hp();
	};
	u.hp = () => {
		var a = n.A.Gj.L();
		if (a == null) I.yo().then(a => {
			u.Je = a;
			n.A.Gj.Xa(a.Ir());
		})['catch'](() => ({}));
		else
			I.xo(a).then(a => u.Je = a)['catch'](() => ({}));
	};
	u.Bo = () => {
		var a = Xb.Pm();
		return a != null ? a.getItem('crappy_router') != null : false;
	};
	u.jk = a => {
		var b = new kb(n.A.fe.L());
		b.cl = b => {
			n.A.fe.Xa(b);
			n.Na.Tl();
			a();
		};
		x.La(b.g);
		b.Cb.focus();
	};
	u.kk = (a, b) => {
		var c = new Q(a);
		c.Va = b;
		x.La(c.g);
	};
	u.no = (a, b) => {
		function c() {
			var a = new Ka('Failed', null);
			a.Va = () => u.xb();
			x.La(a.g);
		}

		function d(b) {
			b = b.sitekey;
			if (b == null)
				throw new q(null);
			u.kk(b, b => e(a, b));
		}

		x.La((new P('Connecting', 'Connecting...', [])).g);
		var e;
		e = (a, e) =>
			M.zl(n.Ee + 'api/client', 'room=' + a + '&rcr=' + e, M.vj).then(a => {
				switch (a.action) {
					case 'connect':
						a = a.token;
						if (a == null)
							throw new q(null);
						b(a);
						break;
					case 'recaptcha':
						d(a);
						break;
					default:
						throw new q(null);
				}
			})['catch'](() => c());
		e(a, '');
	};
	u.xq = () => {
		var a = Hb.L();
		var b = a.get('c');
		var c = a.get('p');
		a.get('v');
		if (c != null) {
			if (b != null)
				u.Dh(b);
			else
				u.xb();
		}
		else {
			if (b != null)
				u.Pf(b);
			else
				u.xb();
		}
	};
	u.xb = () => {
		var a = new Aa(n.A.Lh());
		x.La(a.Ja);
		a.Ym = b => {
			if (b.vd.Id != 9) {
				var c;
				if (b.vd.Id < 9) {
					b = 'Old version room';
					c = 'The room is running an older version, an update must have happened recently.';
				}
				else {
					b = 'New version';
					c = 'The room is running a new version of haxball, refresh the site to update.';
				}
				var d = new P(b, c, ['Ok']);
				x.La(d.g);
				d.Va = () => {
					x.La(a.Ja);
					return d.Va = null;
				};
			}
			else if (b.vd.Ib)
				u.Dh(b.$);
			else
				u.Pf(b.$);
		};
		a.ws = () => u.oo();
		a.vs = () => u.jk(u.xb);
		a.ys = () => u.mk();
		a.xs = a => u.po(a);
	};
	u.mk = () => {
		var a = new aa(true);
		var b = window.document.createElement('div');
		b.className = 'view-wrapper';
		b.appendChild(a.g);
		x.La(b);
		a.qb = () => u.xb();
		a.Ep = () => {
			var a = new mb;
			var b = window.document.createElement('div');
			b.className = 'view-wrapper';
			b.appendChild(a.g);
			x.La(b);
			return a.qb = () => u.mk();
		};
	};
	u.$h = (a, b) => '' + window.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
	u.oo = () => {
		var a = n.A.fe.L();
		var b = new ib('' + a + '\'s room');
		x.La(b.g);
		b.ci = () => u.xb();
		b.Jp = b => {
			function c() {
				if (!b.Ks) {
					var a = new Fb;
					a.Id = 9;
					a.w = g.jc;
					a.I = g.I.length;
					a.Xe = l.fg + 1;
					a.ub = f.ub;
					a.Ib = l.Ib != null;
					a.Ec = f.Ec;
					a.Gc = f.Gc;
					var c = w.ha(16);
					a.ga(c);
					a = c.Kg();
					l.Fi(a);
				}
			}

			x.La((new P('Creating room', 'Connecting...', [])).g);
			var e = null;
			var f = n.A.Lh();
			var g = new fa;
			g.jc = b.name;
			var k = new ea;
			k.w = a;
			k.cb = true;
			k.Kd = f.ub;
			k.Xb = n.A.sh.L();
			g.I.push(k);
			var l = new Lb({iceServers: n.Vf, ij: n.Ee + 'api/host', state: g, version: 9});
			l.fg = b.qs - 1;
			l.Ib = b.password;
			c();
			var t = new ba(l);
			var h = false;
			l.ef = (a, b) =>
				u.kk(a, a => {
					b(a);
					x.La(t.j.g);
					return h = true;
				});
			var m = window.setInterval(() => {
				var a = la.la(l);
				l.ra(a);
			}, 3000);
			l.$k = a => {
				if (g.na(a) != null) {
					a = Y.la(a, 'Bad actor', false);
					l.ra(a);
				}
			};
			l.Hp = (a, b) => {
				var d = b.ic();
				if (d.length > 25)
					throw new q('name too long');
				var e = b.ic();
				if (e.length > 3)
					throw new q('country too long');
				var f = b.zb();
				if (f != null && f.length > 2)
					throw new q('avatar too long');
				d = oa.la(a, d, e, f);
				l.ra(d);
				c();
			};
			l.Ip = a => {
				if (g.na(a) != null) {
					a = Y.la(a, null, false);
					l.ra(a);
				}
			};
			l.kg = a => {
				e = a;
				t.Bg = u.$h(a, l.Ib != null);
				if (!h) {
					h = true;
					x.La(t.j.g);
				}
			};
			t.Ih.Np = (a, b, c, d) => l.to(a, b, c, d);
			t.Ih.Op = () => c();
			t.j.de = () => {
				l.ia();
				t.ia();
				u.xb();
				window.clearInterval(m);
			};
			t.Of.Fg = a => {
				l.Ib = a;
				c();
				if (e != null)
					t.Bg = u.$h(e, l.Ib != null);
			};
			t.Of.jm = a => l.Ei(a);
			t.Of.Ud = G(l, l.Ud);
		};
	};
	u.Dh = a => {
		var b = new Za;
		x.La(b.g);
		b.Va = b => b == null ? u.xb() : u.Pf(a, b);
	};
	u.po = a => {
		try {
			var b = new Vb(new Jb(new Uint8Array(a), new fa, 3));
			b.je.de = () => {
				b.ia();
				u.xb();
			};
			x.La(b.j.g);
		}
		catch (e) {
			var c = e instanceof q ? e.Ta : e;
			if (c instanceof Kb) {
				a = new P('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']);
				x.La(a.g);
				a.Va = a => {
					if (a == 0) {
						a = window.top.location;
						window.top.open(a.protocol + '//' + a.hostname + (a.port != null ? ':' + a.port : '') + '/replay?v=' + c.Id, '_self');
					}
					else
						u.xb();
				};
			}
			else {
				var d = new P('Replay error', 'Couldn\'t load the file.', ['Ok']);
				x.La(d.g);
				d.Va = () => {
					d.Va = null;
					u.xb();
				};
			}
		}
	};
	u.Pf = (a, b, c) => {
		try {
			var d = u.Bo();
			var e = new fa;
			var f = w.ha();
			f.mc(n.A.fe.L());
			f.mc(n.A.Lh().ub);
			f.Db(n.A.sh.L());
			var g = n.Vf;
			var k = n.Vr;
			var l = f.Kg();
			var t = new xa(a, {iceServers: g, ij: k, state: e, version: 9, Ms: l, password: b, cn: d, gn: c, ds: u.Je});
			var h = new jb;
			h.ba('Connecting to master...');
			h.vh.onclick = () => {
				t.Ad = null;
				t.df = null;
				t.ia();
				u.xb();
			};
			x.La(h.g);
			var m = (a, b) => {
				var c = new Ka(a, b);
				c.Va = () => u.xb();
				x.La(c.g);
			}, p = () => {
				var a = new P('Connection Failed', '', ['Ok']);
				a.Vd.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
				a.Va = () => u.xb();
				x.La(a.g);
			}, r = () => {
				var b = new ba(t);
				t.dl = a => {
					b.j.pe.qr((10 * t.sg.$g(.5) | 0) / 10);
					b.j.pe.or((10 * t.sg.max() | 0) / 10);
					b.j.pe.nl.tn(a);
				};
				b.Bg = u.$h(a, false);
				x.La(b.j.g);
				b.j.de = () => {
					t.Ad = null;
					t.ia();
					b.ia();
					u.xb();
				};
				t.Ad = () => {
					t.Ad = null;
					b.ia();
					var a = b.Ed == null ? null : b.Ed.stop();
					m(t.ek, a);
				};
			};
			t.df = c => {
				t.df = null;
				t.Ad = null;
				switch (c.nb) {
					case 1:
						p();
						break;
					case 2:
						switch (c.reason) {
							case 4004:
								u.no(a, c => u.Pf(a, b, c));
								break;
							case 4101:
								if (b == null)
									u.Dh(a);
								else
									m(xa.xh(c), null);
								break;
							default:
								m(xa.xh(c), null);
						}
						break;
					default:
						m(xa.xh(c), null);
				}
			};
			t.Ad = a => {
				switch (a) {
					case 1:
						h.ba('Connecting to peer...');
						break;
					case 2:
						h.ba('Awaiting state...');
						break;
					case 3:
						r();
				}
			};
			t.Sp = () => h.ba('Trying reverse connection...');
		}
		catch (ic) {
			window.console.log(ic instanceof q ? ic.Ta : ic);
			c = new P('Unexpected Error', '', []);
			c.Vd.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.';
			x.La(c.g);
		}
	};
	x.b = true;
	x.ks = () => {
		try {
			return window.top != window.self;
		}
		catch (a) {
			return true;
		}
	};
	x.Wg = a => new Promise((b, c) => {
		var d = window.document.createElement('img');
		d.onload = () => {
			URL.revokeObjectURL(d.src);
			d.onload = null;
			b(d);
		};
		d.onerror = () => {
			URL.revokeObjectURL(d.src);
			c(null);
		};
		return d.src = URL.createObjectURL(new Blob([a], {type: 'image/png'}));
	});
	x.fj = a => {
		if (x.ks()) {
			x.es(() => {
				kc.fj();
				var b;
				if (n.A.Me.L() == null) {
					T.Fo().then(a => n.A.Me.Xa(a), () => ({}));
				}
				else
					b = Promise.resolve(null);
				return Promise.all([M.L('res.dat', 'arraybuffer').then(a => {
					a = new JSZip(a);
					n.Na = new Ub(a);
					return Promise.all([n.Na.ro, x.Wg(a.file('images/grass.png').asArrayBuffer()).then(a => n.Ko = a), x.Wg(a.file('images/concrete.png').asArrayBuffer()).then(a => n.Vn = a), x.Wg(a.file('images/concrete2.png').asArrayBuffer()).then(a => n.Tn = a), x.Wg(a.file('images/typing.png').asArrayBuffer()).then(a => n.Dm = a)]);
				}), b]).then(() => x.us(a));
			});
		}
	};
	x.es = a => {
		for (var b = Modernizr, c = 'canvas datachannel dataview es6collections peerconnection promises websockets'.split(' '), d = [], e = 0; c.length > e; e++) {
			var f = c[e];
			if (!b[f])
				d.push(f);
		}
		if (d.length != 0) {
			window.document.body.innerHTML = '';
			x.Pg = window.document.createElement('div');
			window.document.body.appendChild(x.Pg);
			a = new Wa(d);
			x.La(a.g);
		}
		else {
			a();
		}
	};
	x.us = a => {
		window.document.body.innerHTML = '';
		x.Pg = window.document.createElement('div');
		window.document.body.appendChild(x.Pg);
		var b = null;
		var b = () => {
			n.Na.Tl();
			window.document.removeEventListener('click', b, true);
		};
		window.document.addEventListener('click', b, true);
		a();
	};
	x.La = a => {
		if (x.Vm != null)
			x.Vm.remove();
		if (a != null) {
			x.Pg.appendChild(a);
			x.Vm = a;
		}
	};
	Vb.b = true;
	Vb.prototype = {
		ia: function () {
			window.document.removeEventListener('keydown', G(this, this.Bd));
			window.document.removeEventListener('keyup', G(this, this.Cd));
			window.onbeforeunload = null;
			window.cancelAnimationFrame(this.De);
			window.clearInterval(this.Gh);
		}, bf: function () {
			this.De = window.requestAnimationFrame(G(this, this.bf));
			this.ya.C();
			this.Kc();
		}, Kc: function () {
			this.je.C();
			var a = window.performance.now();
			if (n.A.Fh.L() != 1 || a - this.$c >= 28.333333333333336) {
				this.$c = a;
				this.sd++;
				this.uf(n.A.Tb.L());
				if (this.ya.Fd <= 0)
					this.j.C(this.ya);
			}
		}, Bd: function (a) {
			switch (a.keyCode) {
				case 27:
					var b = this.j;
					b.me(!b.Gd);
					a.preventDefault();
					break;
				case 49:
					n.A.Tb.Xa(1);
					break;
				case 50:
					n.A.Tb.Xa(2);
					break;
				case 51:
					n.A.Tb.Xa(3);
					break;
				case 52:
					n.A.Tb.Xa(0);
			}
		}, uf: function (a) {
			var b = this.j.Fb;
			if (a <= 0) {
				b.Gg(true);
				b.Eb.kf = 1;
				b.Eb.xf = 0;
			}
			else {
				b.Gg(false);
				b.Eb.xf = 35;
				b.Eb.kf = 1 + .25 * (a - 1);
			}
		}, Cd: () => {
		}, f: Vb
	};
	Fb.b = true;
	Fb.prototype = {
		Pj: function () {
			this.w = U.Qc(this.w, 40);
			this.ub = U.Qc(this.ub, 3);
		}, ga: function (a) {
			this.Pj();
			a.Sa = true;
			a.Ub(this.Id);
			a.Im(this.w);
			a.Im(this.ub);
			a.Wi(this.Ec);
			a.Wi(this.Gc);
			a.l(this.Ib ? 1 : 0);
			a.l(this.Xe);
			a.l(this.I);
			a.Sa = false;
		}, ja: function (a) {
			a.Sa = true;
			this.Id = a.Ob();
			this.w = a.El();
			this.ub = a.El();
			this.Ec = a.mi();
			this.Gc = a.mi();
			this.Ib = a.B() != 0;
			this.Xe = a.B();
			this.I = a.B();
			a.Sa = false;
			if (this.I > 30 || this.Xe > 30)
				throw new q(null);
			this.Pj();
		}, f: Fb
	};
	va.b = true;
	va.parse = a => {
		a.B();
		for (var b = []; a.o.byteLength - a.a != 0;) {
			var c = a.ie(a.Ob());
			var d = a.Cl(a.Ob());
			try {
				var e = new Fb;
				e.ja(new F(new DataView(d), false));
				var f = new Wb;
				f.vd = e;
				f.$ = c;
				b.push(f);
			}
			catch (g) {
			}
		}
		return b;
	};
	va.js = (a, b, c, d) => Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
	va.Hs = (a, b) => {
		for (var c = a.Ec, d = a.Gc, e = 0; b.length > e;) {
			var f = b[e];
			++e;
			var g = f.vd;
			f.Le = 6378 * va.js(.017453292519943295 * g.Ec, .017453292519943295 * g.Gc, .017453292519943295 * c, .017453292519943295 * d);
			if (!isFinite(f.Le))
				f.Le = 22000;
		}
	};
	va.get = () => M.L(n.Ee + 'api/list', 'arraybuffer').then(a => va.parse(new F(new DataView(a), false)));
	Z.b = true;
	Z['delete'] = a => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((b, c) => {
		var d = window.indexedDB.open('stadiums', 1);
		d.onblocked = d.onerror = c;
		d.onupgradeneeded = a => {
			var b = d.result;
			b.onerror = c;
			if (a.oldVersion < 1) {
				b.createObjectStore('files', {autoIncrement: true});
				b.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		d.onsuccess = () => {
			var e = d.result;
			e.onerror = c;
			var f = e.transaction(['meta', 'files'], 'readwrite');
			f.onerror = f.onabort = a => {
				c(a);
				e.close();
			};
			f.oncomplete = () => {
				b(0);
				e.close();
			};
			f.objectStore('files')['delete'](a);
			f.objectStore('meta')['delete'](a);
		};
	});
	Z.get = a => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((b, c) => {
		var d = window.indexedDB.open('stadiums', 1);
		d.onblocked = d.onerror = c;
		d.onupgradeneeded = a => {
			var b = d.result;
			b.onerror = c;
			if (a.oldVersion < 1) {
				b.createObjectStore('files', {autoIncrement: true});
				b.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		d.onsuccess = () => {
			var e = d.result;
			e.onerror = c;
			var f = e.transaction(['files']);
			f.onerror = f.onabort = a => {
				c(a);
				e.close();
			};
			f.oncomplete = () => e.close();
			zb.eh(f.objectStore('files').get(a)).then(a => {
				try {
					var d = new h;
					d.Lk(a);
					b(d);
				}
				catch (l) {
					c(l instanceof q ? l.Ta : l);
				}
			}, c);
		};
	});
	Z.getAll = () => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((a, b) => {
		var c = window.indexedDB.open('stadiums', 1);
		c.onblocked = c.onerror = b;
		c.onupgradeneeded = a => {
			var d = c.result;
			d.onerror = b;
			if (a.oldVersion < 1) {
				d.createObjectStore('files', {autoIncrement: true});
				d.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		c.onsuccess = () => {
			var d = c.result;
			d.onerror = b;
			var e = d.transaction(['meta']);
			e.onerror = e.onabort = a => {
				b(a);
				d.close();
			};
			e.oncomplete = () => d.close();
			zb.eh(e.objectStore('meta').getAll()).then(a, b);
		};
	});
	Z.Es = () => {
		var a = window.navigator.storage;
		if (a == null || a.persist == null)
			return Promise.resolve(false);
		try {
			return a.persisted().then(b => b ? true : a.persist())['catch'](() => false);
		}
		catch (b) {
			return Promise.resolve(false);
		}
	};
	Z.add = a => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((b, c) => {
		var d = window.indexedDB.open('stadiums', 1);
		d.onblocked = d.onerror = c;
		d.onupgradeneeded = a => {
			var b = d.result;
			b.onerror = c;
			if (a.oldVersion < 1) {
				b.createObjectStore('files', {autoIncrement: true});
				b.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		d.onsuccess = () => {
			var e = d.result;
			e.onerror = c;
			var f = e.transaction(['files', 'meta'], 'readwrite');
			f.onerror = f.onabort = a => {
				c(a);
				e.close();
			};
			f.oncomplete = () => {
				b(0);
				e.close();
			};
			try {
				zb.eh(f.objectStore('files').add(a.se())).then(b => {
					b = {name: a.w, id: b};
					return zb.eh(f.objectStore('meta').add(b));
				})['catch'](c);
			}
			catch (g) {
				c(0);
			}
		};
	});
	Ub.b = true;
	Ub.prototype = {
		Tl: function () {
			this.c.resume();
		}, cd: function (a) {
			var b = this.c.createBufferSource();
			b.buffer = a;
			b.connect(this.ag);
			b.start();
		}, im: function (a) {
			this.ag.gain.value = a;
		}, f: Ub
	};
	Tb.b = true;
	Tb.prototype = {
		update: function () {
			var a = window.performance.now();
			var b = a - this.Um;
			this.Um = a;
			this.ve += (this.dh - this.ve) * this.Js;
			this.Ef -= b;
			if (this.Ef <= 0)
				this.Ef = this.dh = 0;
			if (this.dh <= 0 && this.ve < .05) {
				window.clearInterval(this.gh);
				this.gh = null;
				this.ve = 0;
			}
			this.Tg.gain.value = n.A.nm.L() ? this.ve : 0;
		}, qj: function (a) {
			var b = this;
			this.dh = a;
			this.Ef = 166.66666666666666;
			if (this.gh == null) {
				this.gh = window.setInterval(() => b.update(), 17);
				this.Um = window.performance.now();
			}
		}, connect: function (a) {
			this.Tg.connect(a);
		}, Ls: function (a) {
			var b = a.K;
			if (b != null)
				if (b.Bb == 2) {
					if (b.Oa <= 0)
						this.qj(1);
				}
				else if (b.Bb == 1) {
					var c = b.ta.F[0];
					var d = null;
					var e = null;
					var f = null;
					var g = 0;
					var k = null;
					var l = null;
					var t = null;
					var h = 0;
					var m = p.fa.Ch;
					var n = 0;
					for (a = a.I; a.length > n;) {
						var q = a[n];
						++n;
						if (q.H != null) {
							var r = q.H.a;
							var v = c.a;
							var u = r.x - v.x;
							var r = r.y - v.y;
							var u = u * u + r * r;
							if (p.fa == q.ea) {
								if (d == null || q.H.a.x * m > d.a.x * m)
									d = q.H;
								if (e == null || q.H.a.x * m < e.a.x * m)
									e = q.H;
								if (f == null || g > u)
									f = q.H, g = u;
							}
							else if (p.xa == q.ea) {
								if (k == null || q.H.a.x * m > k.a.x * m)
									k = q.H;
								if (l == null || q.H.a.x * m < l.a.x * m)
									l = q.H;
								if (t == null || h > u)
									t = q.H, h = u;
							}
						}
					}
					if (l != null && e != null && b.Oa <= 0) {
						if (l.a.x < f.a.x && l.a.x < c.a.x && c.a.x > 20)
							this.qj(.3);
						if (e.a.x > t.a.x && e.a.x > c.a.x && c.a.x < -20)
							this.qj(.3);
					}
				}
		}, f: Tb
	};
	ua.b = true;
	ua.prototype = {
		ga: function (a) {
			var b = this.a;
			a.s(b.x);
			a.s(b.y);
			b = this.D;
			a.s(b.x);
			a.s(b.y);
			b = this.oa;
			a.s(b.x);
			a.s(b.y);
			a.s(this.Z);
			a.s(this.m);
			a.s(this.aa);
			a.s(this.Ca);
			a.tb(this.R);
			a.O(this.h);
			a.O(this.v);
		}, ja: function (a) {
			var b = this.a;
			b.x = a.u();
			b.y = a.u();
			b = this.D;
			b.x = a.u();
			b.y = a.u();
			b = this.oa;
			b.x = a.u();
			b.y = a.u();
			this.Z = a.u();
			this.m = a.u();
			this.aa = a.u();
			this.Ca = a.u();
			this.R = a.hb();
			this.h = a.M();
			this.v = a.M();
		}, rp: function () {
			var a = new ca;
			this.Bk(a);
			return a;
		}, Bk: function (a) {
			var b = a.a;
			var c = this.a;
			b.x = c.x;
			b.y = c.y;
			b = a.D;
			c = this.D;
			b.x = c.x;
			b.y = c.y;
			b = a.oa;
			c = this.oa;
			b.x = c.x;
			b.y = c.y;
			a.Z = this.Z;
			a.m = this.m;
			a.aa = this.aa;
			a.Ca = this.Ca;
			a.R = this.R;
			a.h = this.h;
			a.v = this.v;
		}, f: ua
	};
	O.b = true;
	O.Rd = [Ta];
	O.qd = (a, b) => {
		a.Ma = b.Ma.sc();
		a.ib = b.ib;
		a.Da = b.Da;
		a.ta = b.ta.sc();
		a.vc = b.vc;
		a.Bb = b.Bb;
		a.Pb = b.Pb;
		a.Kb = b.Kb;
		a.Hc = b.Hc;
		a.Oa = b.Oa;
		a.S = b.S;
		a.ae = b.ae;
	};
	O.prototype = {
		Wo: function (a) {
			this.Ma = a;
			this.ib = a.ib;
			this.Da = a.Da;
			this.S = a.S;
			this.ta.J = this.S.J;
			this.ta.qa = this.S.qa;
			this.ta.U = this.S.U;
			this.ta.pb = this.S.pb;
			a = 0;
			for (var b = this.S.F; b.length > a;)
				this.ta.F.push(b[a++].rp());
			this.Gk();
		}, Ck: function (a) {
			if (p.Ia == a.ea)
				a.H = null;
			else {
				a.ob = 0;
				var b = a.H;
				if (b == null) {
					b = new ca;
					a.H = b;
					this.ta.F.push(b);
				}
				var c = this.S.ge;
				b.R = 0;
				b.Z = c.Z;
				b.aa = c.aa;
				b.Ca = c.Ca;
				b.m = c.m;
				b.h = 39;
				b.v = a.ea.v | c.v;
				var d = p.fa == a.ea ? this.S.Dd : this.S.md;
				if (d.length == 0) {
					b.a.x = a.ea.Ch * this.S.$b;
					b.a.y = 0;
				}
				else {
					a = b.a;
					d = d[d.length - 1];
					a.x = d.x;
					a.y = d.y;
				}
				d = b.D;
				d.x = 0;
				d.y = 0;
				b = b.oa;
				c = c.oa;
				b.x = c.x;
				b.y = c.y;
			}
		}, C: function (a) {
			if (this.Oa > 0) {
				if (this.Oa < 120)
					this.Oa--;
			}
			else {
				var b = this.Ma.Os;
				if (b != null)
					b();
				for (var b = this.Ma.I, c = 0; b.length > c;) {
					var d = b[c];
					++c;
					if (d.H != null) {
						if ((d.ob & 16) == 0)
							d.Wb = false;
						var e = this.S.ge;
						if (d.Sc > 0)
							d.Sc--;
						if (this.Ma.ce > d.yc)
							d.yc++;
						if (d.Wb && d.Sc <= 0 && d.yc >= 0) {
							for (var f = false, g = 0, k = this.ta.F; k.length > g;) {
								var l = k[g];
								++g;
								if ((l.v & 64) != 0 && d.H != l) {
									var t = l.a;
									var h = d.H.a;
									var m = t.x - h.x;
									var t = t.y - h.y;
									var h = Math.sqrt(m * m + t * t);
									if (h - l.Z - d.H.Z < 4) {
										var f = m / h;
										var m = t / h;
										var t = e.Re;
										var n = h = l.D;
										var l = l.aa;
										h.x = n.x + f * t * l;
										h.y = n.y + m * t * l;
										n = d.H;
										l = -e.Se;
										h = t = n.D;
										n = n.aa;
										t.x = h.x + f * l * n;
										t.y = h.y + m * l * n;
										f = true;
									}
								}
							}
							if (f) {
								if (this.Ma.ji != null)
									this.Ma.ji(d);
								d.Wb = false;
								d.Sc = this.Ma.yd;
								d.yc -= this.Ma.Zc;
							}
						}
						f = d.ob;
						k = g = 0;
						if ((f & 1) != 0)
							--k;
						if ((f & 2) != 0)
							++k;
						if ((f & 4) != 0)
							--g;
						if ((f & 8) != 0)
							++g;
						if (g != 0 && k != 0) {
							f = Math.sqrt(g * g + k * k);
							g /= f;
							k /= f;
						}
						f = d.H.D;
						if (d.Wb)
							l = e.Te;
						else
							l = e.Ce;
						f.x += g * l;
						f.y += k * l;
						if (d.Wb)
							d.H.Ca = e.Ue;
						else
							d.H.Ca = e.Ca;
					}
				}
				c = 0;
				d = this.ta.F;
				e = 0;
				for (g = d.length; g > e;) {
					f = e++;
					k = d[f];
					if ((k.v & 128) != 0) {
						O.dk[c] = f;
						f = O.Yk[c];
						k = k.a;
						f.x = k.x;
						f.y = k.y;
						++c;
					}
				}
				this.ta.C(a);
				if (this.Bb == 0) {
					for (a = 0; b.length > a;) {
						c = b[a];
						++a;
						if (c.H != null)
							c.H.h = 39 | this.ae.cp;
					}
					b = this.ta.F[0].D;
					if (b.x * b.x + b.y * b.y > 0)
						this.Bb = 1;
				}
				else if (this.Bb == 1) {
					this.Hc += .016666666666666666;
					for (a = 0; b.length > a;) {
						d = b[a];
						++a;
						if (d.H != null)
							d.H.h = 39;
					}
					d = p.Ia;
					b = this.ta.F;
					for (a = 0; c > a && (d = a++, d = this.S.Kn(b[O.dk[d]].a, O.Yk[d]), p.Ia == d);) ;
					if (p.Ia != d) {
						this.Bb = 2;
						this.vc = 150;
						this.ae = d;
						if (p.fa == d)
							this.Kb++;
						else
							this.Pb++;
						if (this.Ma.Ni != null)
							this.Ma.Ni(d.pg);
						if (this.Ma.Ol != null)
							this.Ma.Ol(d.$);
					}
					else {
						if (this.Da > 0 && 60 * this.Da <= this.Hc && this.Kb != this.Pb) {
							if (this.Ma.Pi != null)
								this.Ma.Pi();
							this.um();
						}
					}
				}
				else if (this.Bb == 2) {
					this.vc--;
					if (this.vc <= 0) {
						if (this.ib > 0 && (this.ib <= this.Pb || this.ib <= this.Kb) || this.Da > 0 && 60 * this.Da <= this.Hc && this.Kb != this.Pb)
							this.um();
						else {
							this.Gk();
							if (this.Ma.lq != null)
								this.Ma.lq();
						}
					}
				}
				else if (this.Bb == 3 && (this.vc--, this.vc <= 0 && (b = this.Ma, b.K != null))) {
					b.K = null;
					a = 0;
					for (c = b.I; c.length > a;) {
						d = c[a];
						++a;
						d.H = null;
						d.Jb = 0;
					}
					if (b.vf != null)
						b.vf(null);
				}
			}
		}, um: function () {
			this.vc = 300;
			this.Bb = 3;
			if (this.Ma.Oi != null)
				this.Ma.Oi(this.Kb < this.Pb ? p.fa : p.xa);
		}, Gk: function () {
			var a = this.Ma.I;
			this.Bb = 0;
			for (var b = this.S.F, c = this.ta.F, d = 0, e = this.S.pf ? b.length : 1; e > d;) {
				var f = d++;
				b[f].Bk(c[f]);
			}
			b = [0, 0, 0];
			for (c = 0; a.length > c;) {
				if (d = a[c], ++c, this.Ck(d), e = d.ea, p.Ia != e) {
					var f = d.H.a;
					var g = this.S;
					var k = b[e.$];
					var l = p.fa == e ? g.Dd : g.md;
					if (l.length == 0) {
						l = k + 1 >> 1;
						if ((k & 1) == 0)
							l = -l;
						g = g.kc * e.Ch;
						k = 55 * l;
					}
					else {
						if (l.length <= k)
							k = l.length - 1;
						k = l[k];
						g = k.x;
						k = k.y;
					}
					f.x = g;
					f.y = k;
					b[e.$]++;
					d.Jb = b[e.$];
				}
			}
		}, ga: function (a) {
			this.ta.ga(a);
			a.O(this.vc);
			a.O(this.Bb);
			a.O(this.Pb);
			a.O(this.Kb);
			a.s(this.Hc);
			a.O(this.Oa);
			a.l(this.ae.$);
		}, ja: function (a, b) {
			this.ta.ja(a);
			this.vc = a.M();
			this.Bb = a.M();
			this.Pb = a.M();
			this.Kb = a.M();
			this.Hc = a.u();
			this.Oa = a.M();
			var c = a.lf();
			this.ae = c == 1 ? p.fa : c == 2 ? p.xa : p.Ia;
			this.Ma = b;
			this.ib = b.ib;
			this.Da = b.Da;
			this.S = b.S;
			this.ta.J = this.S.J;
			this.ta.U = this.S.U;
			this.ta.qa = this.S.qa;
			this.ta.pb = this.S.pb;
		}, sc: function () {
			var a = ya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new O;
				this.hc = a;
				O.qd(b, this);
			}
			return b;
		}, f: O
	};
	sb.b = true;
	sb.prototype = {
		ga: function (a) {
			var b = this.W;
			a.s(b.x);
			a.s(b.y);
			b = this.ca;
			a.s(b.x);
			a.s(b.y);
			a.l(this.qe.$);
		}, ja: function (a) {
			var b = this.W;
			b.x = a.u();
			b.y = a.u();
			b = this.ca;
			b.x = a.u();
			b.y = a.u();
			a = a.lf();
			this.qe = a == 1 ? p.fa : a == 2 ? p.xa : p.Ia;
		}, f: sb
	};
	Eb.b = true;
	Eb.prototype = {
		ga: function (a) {
			a.s(this.m);
			a.s(this.aa);
			a.s(this.Ca);
			a.s(this.Ce);
			a.s(this.Te);
			a.s(this.Ue);
			a.s(this.Re);
			var b = this.oa;
			a.s(b.x);
			a.s(b.y);
			a.O(this.v);
			a.s(this.Z);
			a.s(this.Se);
		}, ja: function (a) {
			this.m = a.u();
			this.aa = a.u();
			this.Ca = a.u();
			this.Ce = a.u();
			this.Te = a.u();
			this.Ue = a.u();
			this.Re = a.u();
			var b = this.oa;
			b.x = a.u();
			b.y = a.u();
			this.v = a.M();
			this.Z = a.u();
			this.Se = a.u();
		}, f: Eb
	};
	Bb.b = true;
	Bb.prototype = {f: Bb};
	h.b = true;
	h.ja = a => {
		var b = a.B();
		return b == 255 ? (b = new h, b.Kr(a), b) : h.Kh()[b];
	};
	h.Kh = () => {
		if (h.wb == null) {
			h.wb = [];
			var a = new h;
			a.ad('Classic', 420, 200, 370, 170, 64, 75);
			h.wb.push(a);
			a = new h;
			a.ad('Easy', 420, 200, 370, 170, 90, 75);
			h.wb.push(a);
			a = new h;
			a.ad('Small', 420, 200, 320, 130, 55, 70);
			h.wb.push(a);
			a = new h;
			a.ad('Big', 600, 270, 550, 240, 80, 80);
			h.wb.push(a);
			a = new h;
			a.ad('Rounded', 420, 200, 370, 170, 64, 75, 75);
			h.wb.push(a);
			a = new h;
			a.Qk('Hockey', 420, 204, 398, 182, 68, 120, 75, 100);
			h.wb.push(a);
			a = new h;
			a.Qk('Big Hockey', 600, 270, 550, 240, 90, 160, 75, 150);
			h.wb.push(a);
			a = new h;
			a.ad('Big Easy', 600, 270, 550, 240, 95, 80);
			h.wb.push(a);
			a = new h;
			a.ad('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
			h.wb.push(a);
			a = new h;
			a.ad('Huge', 750, 350, 700, 320, 100, 80);
			h.wb.push(a);
			for (var a = 0, b = h.wb.length; b > a; a++) {
				var c = a;
				h.wb[c].Bh = c;
			}
		}
		return h.wb;
	};
	h.wn = (a, b) => {
		if (a.trait != null) {
			var c = b[r.G(a.trait, String)];
			if (c != null) {
				for (var d = 0, e = ec.Mm(c); e.length > d; d++) {
					var f = e[d];
					if (a[f] == null)
						a[f] = c[f];
				}
			}
		}
	};
	h.Dn = a => {
		if (a == 63)
			return ['all'];
		var b = [];
		if ((a & 2) != 0)
			b.push('red');
		if ((a & 4) != 0)
			b.push('blue');
		if ((a & 1) != 0)
			b.push('ball');
		if ((a & 8) != 0)
			b.push('redKO');
		if ((a & 16) != 0)
			b.push('blueKO');
		if ((a & 32) != 0)
			b.push('wall');
		if ((a & 64) != 0)
			b.push('kick');
		if ((a & 128) != 0)
			b.push('score');
		if ((a & 268435456) != 0)
			b.push('c0');
		if ((a & 536870912) != 0)
			b.push('c1');
		if ((a & 1073741824) != 0)
			b.push('c2');
		if ((a & -2147483648) != 0)
			b.push('c3');
		return b;
	};
	h.Fc = a => {
		a = r.G(a, Array);
		for (var b = 0, c = 0; a.length > c;) {
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
		}
		return b;
	};
	h.Jc = (a, b, c, d) => {
		if (d != c)
			a[b] = h.Dn(c);
	};
	h.qg = (a, b, c) => {
		if (c != b)
			a.color = h.Rn(b);
	};
	h.Rn = a => {
		a |= 0;
		return a < 0 ? 'transparent' : J.Vg(a);
	};
	h.$f = a => {
		if (a == 'transparent')
			return -1;
		if (typeof a == 'string')
			return K.parseInt('0x' + K.ye(a));
		if (a instanceof Array && a.eb == null)
			return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
		throw new q('Bad color');
	};
	h.Tr = a => {
		var b = {
			x: a.a.x, y: a.a.y
		};
		h.ka(b, 'bCoef', a.m, 1);
		h.Jc(b, 'cMask', a.h, 63);
		h.Jc(b, 'cGroup', a.v, 32);
		return b;
	};
	h.np = a => {
		var b = new B;
		b.a.x = r.G(a.x, z);
		b.a.y = r.G(a.y, z);
		var c = a.bCoef;
		if (c != null)
			b.m = r.G(c, z);
		c = a.cMask;
		if (c != null)
			b.h = h.Fc(c);
		a = a.cGroup;
		if (a != null)
			b.v = h.Fc(a);
		return b;
	};
	h.fr = (a, b) => {
		var c = {v0: a.W.ud, v1: a.ca.ud};
		h.ka(c, 'bias', a.Cc, b.Cc);
		h.ka(c, 'bCoef', a.m, b.m);
		var d = a.Co();
		h.ka(c, 'curve', d, 0);
		if (d != 0)
			c.curveF = a.vb;
		h.ka(c, 'vis', a.Za, b.Za);
		h.Jc(c, 'cMask', a.h, b.h);
		h.Jc(c, 'cGroup', a.v, b.v);
		h.qg(c, a.R, b.R);
		return c;
	};
	h.mp = (a, b) => {
		var c = new E;
		var d = r.G(a.v1, Pb);
		c.W = b[r.G(a.v0, Pb)];
		c.ca = b[d];
		var d = a.bias;
		var e = a.bCoef;
		var f = a.curve;
		var g = a.curveF;
		var k = a.vis;
		var l = a.cMask;
		var t = a.cGroup;
		var m = a.color;
		if (d != null)
			c.Cc = r.G(d, z);
		if (e != null)
			c.m = r.G(e, z);
		if (g != null)
			c.vb = r.G(g, z);
		else if (f != null)
			c.Oc(r.G(f, z));
		if (k != null)
			c.Za = r.G(k, oc);
		if (l != null)
			c.h = h.Fc(l);
		if (t != null)
			c.v = h.Fc(t);
		if (m != null)
			c.R = h.$f(m);
		return c;
	};
	h.ap = a => {
		var b = {d0: a.Yd, d1: a.Zd, length: a.ec <= a.Hb ? a.Hb : [a.Hb, a.ec]};
		h.qg(b, a.R, 0);
		h.ka(b, 'strength', a.ne, Infinity);
		return b;
	};
	h.jp = (a, b) => {
		var c = new nb;
		var d = r.G(a.d0, Pb);
		var e = r.G(a.d1, Pb);
		var f = a.color;
		var g = a.strength;
		var k = a.length;
		if (b.length <= d || d < 0)
			throw new q(null);
		if (b.length <= e || e < 0)
			throw new q(null);
		c.Yd = d;
		c.Zd = e;
		if (k == null) {
			d = b[d];
			k = b[e];
			if (d == null || k == null) {
				c.ec = c.Hb = 100;
			}
			else {
				e = d.a;
				k = k.a;
				d = e.x - k.x;
				e = e.y - k.y;
				c.ec = c.Hb = Math.sqrt(d * d + e * e);
			}
		}
		else {
			if (k instanceof Array && k.eb == null) {
				c.Hb = r.G(k[0], z);
				c.ec = r.G(k[1], z);
			}
			else {
				c.ec = c.Hb = r.G(k, z);
			}
		}
		c.ne = g == null || g == 'rigid' ? Infinity : r.G(g, z);
		if (f != null)
			c.R = h.$f(f);
		return c;
	};
	h.gq = a => {
		var b = {
			normal: [a.wa.x, a.wa.y], dist: a.Ua
		};
		h.ka(b, 'bCoef', a.m, 1);
		h.Jc(b, 'cMask', a.h, 63);
		h.Jc(b, 'cGroup', a.v, 32);
		return b;
	};
	h.kp = a => {
		var b = new L;
		var c = r.G(a.normal, Array);
		var d = r.G(c[0], z);
		var c = r.G(c[1], z);
		var e = b.wa;
		var f = Math.sqrt(d * d + c * c);
		e.x = d / f;
		e.y = c / f;
		b.Ua = r.G(a.dist, z);
		d = a.bCoef;
		c = a.cMask;
		a = a.cGroup;
		if (d != null)
			b.m = r.G(d, z);
		if (c != null)
			b.h = h.Fc(c);
		if (a != null)
			b.v = h.Fc(a);
		return b;
	};
	h.Jo = a => ({p0: [a.W.x, a.W.y], p1: [a.ca.x, a.ca.y], team: p.fa == a.qe ? 'red' : 'blue'});
	h.ip = a => {
		var b = new sb;
		var c = r.G(a.p0, Array);
		var d = r.G(a.p1, Array);
		var e = b.W;
		e.x = c[0];
		e.y = c[1];
		c = b.ca;
		c.x = d[0];
		c.y = d[1];
		switch (a.team) {
			case 'blue':
				a = p.xa;
				break;
			case 'red':
				a = p.fa;
				break;
			default:
				throw new q('Bad team value');
		}
		b.qe = a;
		return b;
	};
	h.jq = a => {
		var b = {};
		h.ka(b, 'bCoef', a.m, .5);
		h.ka(b, 'invMass', a.aa, .5);
		h.ka(b, 'damping', a.Ca, .96);
		h.ka(b, 'acceleration', a.Ce, .1);
		h.ka(b, 'kickingAcceleration', a.Te, .07);
		h.ka(b, 'kickingDamping', a.Ue, .96);
		h.ka(b, 'kickStrength', a.Re, 5);
		h.Jc(b, 'cGroup', a.v, 0);
		if (a.oa.x != 0 || a.oa.y != 0)
			b.gravity = [a.oa.x, a.oa.y];
		h.ka(b, 'radius', a.Z, 15);
		h.ka(b, 'kickback', a.Se, 0);
		return b;
	};
	h.lp = a => {
		var b = new Eb;
		var c = a.bCoef;
		var d = a.invMass;
		var e = a.damping;
		var f = a.acceleration;
		var g = a.kickingAcceleration;
		var k = a.kickingDamping;
		var l = a.kickStrength;
		var t = a.gravity;
		var m = a.cGroup;
		var n = a.radius;
		a = a.kickback;
		if (c != null)
			b.m = r.G(c, z);
		if (d != null)
			b.aa = r.G(d, z);
		if (e != null)
			b.Ca = r.G(e, z);
		if (f != null)
			b.Ce = r.G(f, z);
		if (g != null)
			b.Te = r.G(g, z);
		if (k != null)
			b.Ue = r.G(k, z);
		if (l != null)
			b.Re = r.G(l, z);
		if (t != null) {
			c = b.oa;
			d = r.G(t[1], z);
			c.x = r.G(t[0], z);
			c.y = d;
		}
		if (m != null)
			b.v = h.Fc(m);
		if (n != null)
			b.Z = r.G(n, z);
		if (a != null)
			b.Se = r.G(a, z);
		return b;
	};
	h.mo = (a, b) => {
		var c = {};
		if (b.a.x != a.a.x || b.a.y != a.a.y)
			c.pos = [a.a.x, a.a.y];
		if (b.D.x != a.D.x || b.D.y != a.D.y)
			c.speed = [a.D.x, a.D.y];
		if (b.oa.x != a.oa.x || b.oa.y != a.oa.y)
			c.gravity = [a.oa.x, a.oa.y];
		h.ka(c, 'radius', a.Z, b.Z);
		h.ka(c, 'bCoef', a.m, b.m);
		h.ka(c, 'invMass', a.aa, b.aa);
		h.ka(c, 'damping', a.Ca, b.Ca);
		h.qg(c, a.R, b.R);
		h.Jc(c, 'cMask', a.h, b.h);
		h.Jc(c, 'cGroup', a.v, b.v);
		return c;
	};
	h.Mk = (a, b) => {
		var c = a.pos;
		var d = a.speed;
		var e = a.gravity;
		var f = a.radius;
		var g = a.bCoef;
		var k = a.invMass;
		var l = a.damping;
		var t = a.color;
		var m = a.cMask;
		var n = a.cGroup;
		if (c != null) {
			var p = b.a;
			p.x = c[0];
			p.y = c[1];
		}
		if (d != null) {
			c = b.D;
			c.x = d[0];
			c.y = d[1];
		}
		if (e != null) {
			d = b.oa;
			d.x = e[0];
			d.y = e[1];
		}
		if (f != null)
			b.Z = r.G(f, z);
		if (g != null)
			b.m = r.G(g, z);
		if (k != null)
			b.aa = r.G(k, z);
		if (l != null)
			b.Ca = r.G(l, z);
		if (t != null)
			b.R = h.$f(t);
		if (m != null)
			b.h = h.Fc(m);
		if (n != null)
			b.v = h.Fc(n);
		return b;
	};
	h.ka = (a, b, c, d) => {
		if (d != c)
			a[b] = c;
	};
	h.prototype = {
		dg: () => {
			var a = new ua;
			a.R = 16777215;
			a.h = 63;
			a.v = 193;
			a.Z = 10;
			a.Ca = .99;
			a.aa = 1;
			a.m = .5;
			return a;
		}, ga: function (a) {
			a.l(this.Bh);
			if (!this.Pe()) {
				a.Db(this.w);
				a.O(this.ld);
				a.s(this.Td);
				a.s(this.Sd);
				a.s(this.kd);
				a.s(this.Uc);
				a.s(this.Fe);
				a.O(this.jd);
				a.s(this.$b);
				a.s(this.qc);
				a.s(this.kc);
				this.ge.ga(a);
				a.Ub(this.Ye);
				a.l(this.Ge);
				a.l(this.Lf ? 1 : 0);
				a.l(this.pf ? 1 : 0);
				a.l(this.J.length);
				for (var b = 0, c = this.J.length; c > b;) {
					var d = b++;
					var e = this.J[d];
					e.ud = d;
					e.ga(a);
				}
				a.l(this.U.length);
				b = 0;
				for (c = this.U; c.length > b; b++)
					c[b].ga(a);
				a.l(this.qa.length);
				b = 0;
				for (c = this.qa; c.length > b; b++)
					c[b].ga(a);
				a.l(this.tc.length);
				b = 0;
				for (c = this.tc; c.length > b; b++)
					c[b].ga(a);
				a.l(this.F.length);
				b = 0;
				for (c = this.F; c.length > b; b++)
					c[b].ga(a);
				a.l(this.pb.length);
				b = 0;
				for (c = this.pb; c.length > b; b++)
					c[b].ga(a);
				a.l(this.Dd.length);
				b = 0;
				for (c = this.Dd; c.length > b; b++) {
					d = c[b];
					a.s(d.x);
					a.s(d.y);
				}
				a.l(this.md.length);
				b = 0;
				for (c = this.md; c.length > b; b++) {
					d = c[b];
					a.s(d.x);
					a.s(d.y);
				}
			}
		}, Kr: function (a) {
			function b() {
				for (var b = [], c = a.B(), d = 0; c > d; d++) {
					var e = new H(0, 0);
					e.x = a.u();
					e.y = a.u();
					b.push(e);
				}
				return b;
			}

			this.w = a.zb();
			this.ld = a.M();
			this.Td = a.u();
			this.Sd = a.u();
			this.kd = a.u();
			this.Uc = a.u();
			this.Fe = a.u();
			this.jd = a.M();
			this.$b = a.u();
			this.qc = a.u();
			this.kc = a.u();
			this.ge.ja(a);
			this.Ye = a.Ob();
			this.Ge = a.B();
			this.Lf = a.B() != 0;
			this.pf = a.B() != 0;
			this.J = [];
			for (var c = a.B(), d = 0; c > d; d++) {
				var e = new B;
				e.ja(a);
				e.ud = d;
				this.J.push(e);
			}
			this.U = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new E;
				e.ja(a, this.J);
				this.U.push(e);
			}
			this.qa = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new L;
				e.ja(a);
				this.qa.push(e);
			}
			this.tc = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new sb;
				e.ja(a);
				this.tc.push(e);
			}
			this.F = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new ua;
				e.ja(a);
				this.F.push(e);
			}
			this.pb = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new nb;
				e.ja(a);
				this.pb.push(e);
			}
			this.Dd = b();
			this.md = b();
			this.he();
		}, he: function () {
			for (var a = 0, b = this.U; b.length > a; a++)
				b[a].he();
		}, Pe: function () {
			return this.Bh != 255;
		}, be: (a, b, c) => {
			a = a[b];
			return a != null ? r.G(a, z) : c;
		}, op: (a, b, c) => {
			a = a[b];
			return a != null ? r.G(a, oc) : c;
		}, se: function () {
			return JSON.stringify(this.Hr());
		}, Hr: function () {
			if (!this.Lf)
				throw new q(0);
			for (var a = {}, b = 0, c = [], d = 0, e = this.J; e.length > d;) {
				var f = e[d];
				++d;
				f.ud = b++;
				c.push(h.Tr(f));
			}
			d = new E;
			b = [];
			e = 0;
			for (f = this.U; f.length > e; e++)
				b.push(h.fr(f[e], d));
			d = [];
			e = 0;
			for (f = this.qa; f.length > e; e++)
				d.push(h.gq(f[e]));
			for (var e = [], f = 0, g = this.tc; g.length > f; f++)
				e.push(h.Jo(g[f]));
			for (var f = h.jq(this.ge), k = new ua, g = [], l = 0, t = this.F; t.length > l; l++)
				g.push(h.mo(t[l], k));
			k = [];
			l = 0;
			for (t = this.pb; t.length > l; l++)
				k.push(h.ap(t[l]));
			for (var l = [], t = 0, m = this.Dd; m.length > t; t++) {
				var n = m[t];
				l.push([n.x, n.y]);
			}
			t = [];
			m = 0;
			for (n = this.md; n.length > m; m++) {
				var p = n[m];
				t.push([p.x, p.y]);
			}
			c = {
				name: this.w, width: this.$b, height: this.qc, bg: a, vertexes: c, segments: b, planes: d, goals: e, discs: g, playerPhysics: f, ballPhysics: 'disc0'
			};
			h.ka(c, 'maxViewWidth', this.Ye, 0);
			h.ka(c, 'cameraFollow', this.Ge == 1 ? 'player' : '', '');
			h.ka(c, 'spawnDistance', this.kc, 200);
			if (k.length != 0)
				c.joints = k;
			if (l.length != 0)
				c.redSpawnPoints = l;
			if (t.length != 0)
				c.blueSpawnPoints = t;
			h.ka(c, 'kickOffReset', this.pf ? 'full' : 'partial', 'partial');
			switch (this.ld) {
				case 1:
					b = 'grass';
					break;
				case 2:
					b = 'hockey';
					break;
				default:
					b = 'none';
			}
			h.ka(a, 'type', b, 'none');
			h.ka(a, 'width', this.Td, 0);
			h.ka(a, 'height', this.Sd, 0);
			h.ka(a, 'kickOffRadius', this.kd, 0);
			h.ka(a, 'cornerRadius', this.Uc, 0);
			h.qg(a, this.jd, 7441498);
			h.ka(a, 'goalLine', this.Fe, 0);
			return c;
		}, Lk: function (a) {
			function b(a) {
				var b = r.G(a[0], z);
				a = r.G(a[1], z);
				return new H(b, a);
			}

			function c(a, b, c, d) {
				if (d == null)
					d = false;
				var f = e[b];
				if (!d || f != null) {
					if (d = r.G(f, Array), d != null) {
						for (f = 0; d.length > f; f++) {
							var k = d[f];
							try {
								h.wn(k, g);
								a.push(c(k));
							}
							catch (wc) {
								throw new q(new Bb('Error in "' + b + '" index: ' + a.length));
							}
						}
					}
				}
			}

			var d = this;
			var e = JSON5.parse(a);
			this.J = [];
			this.U = [];
			this.qa = [];
			this.tc = [];
			this.F = [];
			this.pb = [];
			this.w = r.G(e.name, String);
			this.$b = r.G(e.width, z);
			this.qc = r.G(e.height, z);
			this.Ye = this.be(e, 'maxViewWidth', 0) | 0;
			if (e.cameraFollow == 'player')
				this.Ge = 1;
			this.kc = 200;
			a = e.spawnDistance;
			if (a != null)
				this.kc = r.G(a, z);
			a = e.bg;
			var f;
			switch (a.type) {
				case 'grass':
					f = 1;
					break;
				case 'hockey':
					f = 2;
					break;
				default:
					f = 0;
			}
			this.ld = f;
			this.Td = this.be(a, 'width', 0);
			this.Sd = this.be(a, 'height', 0);
			this.kd = this.be(a, 'kickOffRadius', 0);
			this.Uc = this.be(a, 'cornerRadius', 0);
			this.jd = 7441498;
			if (a.color != null)
				this.jd = h.$f(a.color);
			this.Fe = this.be(a, 'goalLine', 0);
			this.Lf = this.op(e, 'canBeStored', true);
			this.pf = e.kickOffReset == 'full';
			var g = e.traits;
			a = e.ballPhysics;
			if (a != 'disc0')
				if (a != null) {
					a = h.Mk(a, this.dg());
					a.v |= 192;
					this.F.push(a);
				}
				else
					this.F.push(this.dg());
			c(this.J, 'vertexes', h.np);
			c(this.U, 'segments', a => h.mp(a, d.J));
			c(this.tc, 'goals', h.ip);
			c(this.F, 'discs', a => h.Mk(a, new ua));
			c(this.qa, 'planes', h.kp);
			c(this.pb, 'joints', a => h.jp(a, d.F), true);
			c(this.Dd, 'redSpawnPoints', b, true);
			c(this.md, 'blueSpawnPoints', b, true);
			a = e.playerPhysics;
			if (a != null)
				this.ge = h.lp(a);
			if (this.J.length > 255 || this.U.length > 255 || this.qa.length > 255 || this.tc.length > 255 || this.F.length > 255)
				throw new q('Error');
			this.he();
		}, Sj: function () {
			var a = h.Fr;
			a.a = 0;
			this.ga(a);
			var b = new dc;
			b.Yr(a.Sb());
			b.hash = (b.hash += b.hash << 3) ^ b.hash >>> 11;
			b.hash += b.hash << 15;
			return b.hash | 0;
		}, Kn: function (a, b) {
			for (var c = 0, d = this.tc; d.length > c;) {
				var e = d[c];
				++c;
				var f = e.W;
				var g = e.ca;
				var k = b.x - a.x;
				var l = b.y - a.y;
				if (-(g.y - a.y) * k + (g.x - a.x) * l > 0 == -(f.y - a.y) * k + (f.x - a.x) * l > 0)
					f = false;
				else {
					k = g.x - f.x;
					g = g.y - f.y;
					f = -(b.y - f.y) * k + (b.x - f.x) * g > 0 != -(a.y - f.y) * k + (a.x - f.x) * g > 0;
				}
				if (f)
					return e.qe;
			}
			return p.Ia;
		}, ad: function (a, b, c, d, e, f, g, k) {
			if (k == null)
				k = 0;
			this.w = a;
			this.F.push(this.dg());
			this.$b = b;
			this.qc = c;
			this.ld = 1;
			this.jd = 7441498;
			this.Td = d;
			this.Sd = e;
			this.kd = g;
			this.Uc = k;
			this.kc = .75 * d;
			if (this.kc > 400)
				this.kc = 400;
			a = new L;
			var l = a.wa;
			l.x = 0;
			l.y = 1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new L;
			l = a.wa;
			l.x = 0;
			l.y = -1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new L;
			l = a.wa;
			l.x = 1;
			l.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			a = new L;
			l = a.wa;
			l.x = -1;
			l.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			this.eg(d, 1, f, 13421823, p.xa);
			this.eg(-d, -1, f, 16764108, p.fa);
			this.Rk(g, c);
			b = new L;
			c = b.wa;
			c.x = 0;
			c.y = 1;
			b.Ua = -e;
			b.h = 1;
			this.qa.push(b);
			b = new L;
			c = b.wa;
			c.x = 0;
			c.y = -1;
			b.Ua = -e;
			b.h = 1;
			this.qa.push(b);
			b = new B;
			c = b.a;
			c.x = -d;
			c.y = -e;
			b.h = 0;
			c = new B;
			g = c.a;
			g.x = d;
			g.y = -e;
			c.h = 0;
			g = new B;
			a = g.a;
			a.x = d;
			a.y = -f;
			g.h = 0;
			a = new B;
			l = a.a;
			l.x = d;
			l.y = f;
			a.h = 0;
			var l = new B;
			var h = l.a;
			h.x = d;
			h.y = e;
			l.h = 0;
			var h = new B;
			var m = h.a;
			m.x = -d;
			m.y = e;
			h.h = 0;
			var m = new B;
			var n = m.a;
			n.x = -d;
			n.y = f;
			m.h = 0;
			var n = new B;
			var q = n.a;
			q.x = -d;
			q.y = -f;
			n.h = 0;
			f = new E;
			f.W = c;
			f.ca = g;
			f.h = 1;
			f.Za = false;
			q = new E;
			q.W = a;
			q.ca = l;
			q.h = 1;
			q.Za = false;
			var r = new E;
			r.W = h;
			r.ca = m;
			r.h = 1;
			r.Za = false;
			var u = new E;
			u.W = n;
			u.ca = b;
			u.h = 1;
			u.Za = false;
			this.J.push(b);
			this.J.push(c);
			this.J.push(g);
			this.J.push(a);
			this.J.push(l);
			this.J.push(h);
			this.J.push(m);
			this.J.push(n);
			this.U.push(f);
			this.U.push(q);
			this.U.push(r);
			this.U.push(u);
			this.Pk(d, e, k);
			this.he();
		}, Qk: function (a, b, c, d, e, f, g, k, l) {
			this.w = a;
			this.F.push(this.dg());
			this.$b = b;
			this.qc = c;
			this.ld = 2;
			this.Td = d;
			this.Sd = e;
			this.kd = k;
			this.Uc = l;
			this.Fe = g;
			this.kc = .75 * (d - g);
			if (this.kc > 400)
				this.kc = 400;
			a = new L;
			var h = a.wa;
			h.x = 0;
			h.y = 1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new L;
			h = a.wa;
			h.x = 0;
			h.y = -1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new L;
			h = a.wa;
			h.x = 1;
			h.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			a = new L;
			h = a.wa;
			h.x = -1;
			h.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			this.eg(d - g, 1, f, 13421823, p.xa, 63);
			this.eg(-d + g, -1, f, 16764108, p.fa, 63);
			this.Rk(k, c);
			b = new L;
			c = b.wa;
			c.x = 0;
			c.y = 1;
			b.Ua = -e;
			b.h = 1;
			this.qa.push(b);
			b = new L;
			c = b.wa;
			c.x = 0;
			c.y = -1;
			b.Ua = -e;
			b.h = 1;
			this.qa.push(b);
			b = new L;
			c = b.wa;
			c.x = 1;
			c.y = 0;
			b.Ua = -d;
			b.h = 1;
			this.qa.push(b);
			b = new L;
			c = b.wa;
			c.x = -1;
			c.y = 0;
			b.Ua = -d;
			b.h = 1;
			this.qa.push(b);
			this.Pk(d, e, l);
			this.he();
		}, eg: function (a, b, c, d, e, f, g) {
			if (g == null)
				g = 32;
			if (f == null)
				f = 1;
			var k = new B;
			var l = k.a;
			l.x = a + 8 * b;
			l.y = -c;
			var l = new B;
			var h = l.a;
			h.x = a + 8 * b;
			h.y = c;
			var m = new B;
			var h = m.a;
			h.x = k.a.x + 22 * b;
			h.y = k.a.y + 22;
			var n = new B;
			var h = n.a;
			h.x = l.a.x + 22 * b;
			h.y = l.a.y - 22;
			h = new E;
			h.W = k;
			h.ca = m;
			h.Oc(90 * b);
			var p = new E;
			p.W = n;
			p.ca = m;
			var q = new E;
			q.W = n;
			q.ca = l;
			q.Oc(90 * b);
			b = this.J.length;
			this.J.push(k);
			this.J.push(l);
			this.J.push(m);
			this.J.push(n);
			k = b;
			for (b = this.J.length; b > k;) {
				l = k++;
				this.J[l].h = f;
				this.J[l].v = g;
				this.J[l].m = .1;
			}
			b = this.U.length;
			this.U.push(h);
			this.U.push(p);
			this.U.push(q);
			k = b;
			for (b = this.U.length; b > k;) {
				l = k++;
				this.U[l].h = f;
				this.U[l].v = g;
				this.U[l].m = .1;
			}
			f = new ua;
			g = f.a;
			g.x = a;
			g.y = -c;
			f.aa = 0;
			f.Z = 8;
			f.R = d;
			this.F.push(f);
			f = new ua;
			g = f.a;
			g.x = a;
			g.y = c;
			f.aa = 0;
			f.Z = 8;
			f.R = d;
			this.F.push(f);
			d = new sb;
			f = d.W;
			f.x = a;
			f.y = -c;
			f = d.ca;
			f.x = a;
			f.y = c;
			d.qe = e;
			this.tc.push(d);
		}, Rk: function (a, b) {
			var c = new B;
			var d = c.a;
			d.x = 0;
			d.y = -b;
			c.m = .1;
			c.v = 24;
			c.h = 6;
			var d = new B;
			var e = d.a;
			e.x = 0;
			e.y = -a;
			d.m = .1;
			d.v = 24;
			d.h = 6;
			var e = new B;
			var f = e.a;
			f.x = 0;
			f.y = a;
			e.m = .1;
			e.v = 24;
			e.h = 6;
			var f = new B;
			var g = f.a;
			g.x = 0;
			g.y = b;
			f.m = .1;
			f.v = 24;
			f.h = 6;
			g = new E;
			g.W = c;
			g.ca = d;
			g.v = 24;
			g.h = 6;
			g.Za = false;
			g.m = .1;
			var k = new E;
			k.W = e;
			k.ca = f;
			k.v = 24;
			k.h = 6;
			k.Za = false;
			k.m = .1;
			var l = new E;
			l.W = d;
			l.ca = e;
			l.v = 8;
			l.h = 6;
			l.Za = false;
			l.Oc(180);
			l.m = .1;
			var h = new E;
			h.W = e;
			h.ca = d;
			h.v = 16;
			h.h = 6;
			h.Za = false;
			h.Oc(180);
			h.m = .1;
			this.J.push(c);
			this.J.push(d);
			this.J.push(e);
			this.J.push(f);
			this.U.push(g);
			this.U.push(k);
			this.U.push(l);
			this.U.push(h);
		}, Pk: function (a, b, c) {
			if (c > 0) {
				var d = new B;
				var e = d.a;
				e.x = -a + c;
				e.y = -b;
				d.h = 0;
				var e = new B;
				var f = e.a;
				f.x = -a;
				f.y = -b + c;
				e.h = 0;
				var f = new B;
				var g = f.a;
				g.x = -a + c;
				g.y = b;
				f.h = 0;
				var g = new B;
				var k = g.a;
				k.x = -a;
				k.y = b - c;
				g.h = 0;
				var k = new B;
				var l = k.a;
				l.x = a - c;
				l.y = b;
				k.h = 0;
				var l = new B;
				var h = l.a;
				h.x = a;
				h.y = b - c;
				l.h = 0;
				var h = new B;
				var m = h.a;
				m.x = a - c;
				m.y = -b;
				h.h = 0;
				var m = new B;
				var n = m.a;
				n.x = a;
				n.y = -b + c;
				m.h = 0;
				a = new E;
				a.W = d;
				a.ca = e;
				a.h = 1;
				a.Za = false;
				a.m = 1;
				a.Oc(-90);
				b = new E;
				b.W = f;
				b.ca = g;
				b.h = 1;
				b.Za = false;
				b.m = 1;
				b.Oc(90);
				c = new E;
				c.W = k;
				c.ca = l;
				c.h = 1;
				c.Za = false;
				c.m = 1;
				c.Oc(-90);
				n = new E;
				n.W = h;
				n.ca = m;
				n.h = 1;
				n.Za = false;
				n.m = 1;
				n.Oc(90);
				this.J.push(d);
				this.J.push(e);
				this.J.push(f);
				this.J.push(g);
				this.J.push(k);
				this.J.push(l);
				this.J.push(h);
				this.J.push(m);
				this.U.push(a);
				this.U.push(b);
				this.U.push(c);
				this.U.push(n);
			}
		}, f: h
	};
	ka.b = true;
	ka.prototype = {
		ga: function (a) {
			a.l(this.hd);
			a.O(this.ed);
			a.l(this.fb.length);
			for (var b = 0, c = this.fb; c.length > b; b++)
				a.O(c[b]);
		}, ja: function (a) {
			this.hd = a.B();
			this.ed = a.M();
			var b = a.B();
			if (b > 3)
				throw new q('too many');
			this.fb = [];
			for (var c = 0; b > c;) {
				++c;
				this.fb.push(a.M());
			}
		}, f: ka
	};
	p.b = true;
	p.prototype = {f: p};
	fa.b = true;
	fa.Rd = [Ta, cc];
	fa.qd = (a, b) => {
		a.jc = b.jc;
		if (b.I == null)
			a.I = null;
		else {
			if (a.I == null)
				a.I = [];
			for (var c = a.I, d = b.I, e = d.length; e < c.length;)
				c.pop();
			for (var e = 0, f = d.length; f > e; e++) {
				var g = e;
				c[g] = d[g].hs();
			}
		}
		a.K = b.K == null ? null : b.K.sc();
		a.Pc = b.Pc;
		a.ib = b.ib;
		a.Da = b.Da;
		a.ce = b.ce;
		a.Zc = b.Zc;
		a.yd = b.yd;
		a.S = b.S;
		a.kb = b.kb;
	};
	fa.prototype = {
		yr: function (a) {
			if (this.K == null) {
				this.K = new O;
				for (var b = 0, c = this.I; c.length > b; b++) {
					var d = c[b];
					d.H = null;
					d.Jb = 0;
				}
				this.K.Wo(this);
				if (this.Ki != null)
					this.Ki(a);
			}
		}, Mf: function (a, b, c) {
			if (c != b.ea) {
				b.ea = c;
				D.remove(this.I, b);
				this.I.push(b);
				if (this.K != null) {
					if (b.H != null) {
						D.remove(this.K.ta.F, b.H);
						b.H = null;
					}
					this.K.Ck(b);
					for (var d = 0, e = false; !e;) {
						++d;
						for (var e = true, f = 0, g = this.I; g.length > f; f++) {
							var k = g[f];
							if (b != k && b.ea == k.ea && d == k.Jb) {
								e = false;
								break;
							}
						}
					}
					b.Jb = d;
				}
				Cb.i(this.xl, a, b, c);
			}
		}, na: function (a) {
			for (var b = 0, c = this.I; c.length > b; b++) {
				var d = c[b];
				if (a == d.V)
					return d;
			}
			return null;
		}, C: function (a) {
			if (this.K != null)
				this.K.C(a);
		}, ga: function (a) {
			a.Db(this.jc);
			a.l(this.Pc ? 1 : 0);
			a.O(this.ib);
			a.O(this.Da);
			a.Xi(this.ce);
			a.l(this.Zc);
			a.l(this.yd);
			this.S.ga(a);
			a.l(this.K != null ? 1 : 0);
			if (this.K != null)
				this.K.ga(a);
			a.l(this.I.length);
			for (var b = 0, c = this.I; c.length > b; b++)
				c[b].ua(a);
			this.kb[1].ga(a);
			this.kb[2].ga(a);
		}, ja: function (a) {
			this.jc = a.zb();
			this.Pc = a.B() != 0;
			this.ib = a.M();
			this.Da = a.M();
			this.ce = a.ni();
			this.Zc = a.B();
			this.yd = a.B();
			this.S = h.ja(a);
			var b = a.B() != 0;
			this.K = null;
			if (b) {
				this.K = new O;
				this.K.ja(a, this);
			}
			for (var b = this.K == null ? null : this.K.ta.F, c = a.B(), d = this.I; c < d.length;)
				d.pop();
			for (d = 0; c > d;) {
				var e = new ea;
				e.va(a, b);
				this.I[d++] = e;
			}
			this.kb[1].ja(a);
			this.kb[2].ja(a);
		}, uk: function () {
			var a = 0;
			var b = w.ha();
			this.ga(b);
			for (b = b.Gr(); b.o.byteLength - b.a >= 4;)
				a ^= b.M();
			return a;
		}, Ao: function () {
			var a = w.ha(4);
			a.O(this.uk());
			return a.Kg();
		}, Sn: function (a) {
			a = (new F(new DataView(a))).M();
			y.i(this.ko, a != this.uk());
		}, km: function (a) {
			this.Ol = a;
		}, Lb: function (a) {
			if (a == 0)
				return true;
			a = this.na(a);
			return a != null && a.cb ? true : false;
		}, mr: function (a, b, c, d) {
			this.yd = b < 0 ? 0 : b > 255 ? 255 : b;
			this.Zc = c < 0 ? 0 : c > 255 ? 255 : c;
			d = d < 0 ? 0 : d > 100 ? 100 : d;
			this.ce = this.Zc * d;
			vb.i(this.Hk, a, this.yd, this.Zc, d);
		}, sc: function () {
			var a = ya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new fa;
				this.hc = a;
				fa.qd(b, this);
			}
			return b;
		}, f: fa
	};
	ea.b = true;
	ea.Rd = [Ta];
	ea.$r = (a, b) => {
		a.cb = b.cb;
		a.Jb = b.Jb;
		a.Xb = b.Xb;
		a.Jd = b.Jd;
		a.Ld = b.Ld;
		a.Kd = b.Kd;
		a.Ug = b.Ug;
		a.yb = b.yb;
		a.w = b.w;
		a.ob = b.ob;
		a.V = b.V;
		a.Wb = b.Wb;
		a.yc = b.yc;
		a.Sc = b.Sc;
		a.H = b.H == null ? null : b.H.sc();
		a.ea = b.ea;
	};
	ea.prototype = {
		ua: function (a) {
			a.l(this.cb ? 1 : 0);
			a.O(this.Jb);
			a.Db(this.Xb);
			a.Db(this.Jd);
			a.l(this.Ld ? 1 : 0);
			a.Db(this.Kd);
			a.O(this.Ug);
			a.Db(this.w);
			a.O(this.ob);
			a.lb(this.V);
			a.l(this.Wb ? 1 : 0);
			a.Xi(this.yc);
			a.l(this.Sc);
			a.l(this.ea.$);
			a.Xi(this.H == null ? -1 : this.H.jl);
		}, va: function (a, b) {
			this.cb = a.B() != 0;
			this.Jb = a.M();
			this.Xb = a.zb();
			this.Jd = a.zb();
			this.Ld = a.B() != 0;
			this.Kd = a.zb();
			this.Ug = a.M();
			this.w = a.zb();
			this.ob = a.M();
			this.V = a.Ab();
			this.Wb = a.B() != 0;
			this.yc = a.ni();
			this.Sc = a.B();
			var c = a.lf();
			this.ea = c == 1 ? p.fa : c == 2 ? p.xa : p.Ia;
			c = a.ni();
			this.H = c < 0 ? null : b[c];
		}, hs: function () {
			var a = ya.zc;
			var b = this.an;
			if (a != this.zc) {
				if (b == null)
					this.an = b = new ea;
				this.zc = a;
				ea.$r(b, this);
			}
			return b;
		}, f: ea
	};
	ta.b = true;
	ta.la = a => {
		var b = new ta;
		b.Yg = a;
		return b;
	};
	ta.ma = m;
	ta.prototype = C(m.prototype, {
		apply: function (a) {
			var b = a.na(this.P);
			if (b != null && b.Ld != this.Yg) {
				b.Ld = this.Yg;
				y.i(a.sl, b);
			}
		}, ua: function (a) {
			a.l(this.Yg ? 1 : 0);
		}, va: function (a) {
			this.Yg = a.B() != 0;
		}, f: ta
	});
	rb.b = true;
	rb.ma = m;
	rb.prototype = C(m.prototype, {
		apply: function (a) {
			if (this.P == 0)
				vb.i(a.Vl, this.Tc, this.color, this.style, this.fn);
		}, ua: function (a) {
			a.mc(U.Qc(this.Tc, 1000));
			a.O(this.color);
			a.l(this.style);
			a.l(this.fn);
		}, va: function (a) {
			this.Tc = a.ic();
			if (this.Tc.length > 1000)
				throw new q('message too long');
			this.color = a.M();
			this.style = a.B();
			this.fn = a.B();
		}, f: rb
	});
	Qa.b = true;
	Qa.ma = m;
	Qa.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 1)) {
				for (var b = a.na(this.P), c = a.I, d = [], e = 0, f = 0, g = 0; c.length > g; g++) {
					var k = c[g];
					if (p.Ia == k.ea)
						d.push(k);
					if (p.fa == k.ea)
						++e;
					else if (p.xa == k.ea)
						++f;
				}
				c = d.length;
				if (c != 0) {
					if (e == f) {
						if (c >= 2) {
							a.Mf(b, d[0], p.fa);
							a.Mf(b, d[1], p.xa);
						}
					}
					else
						a.Mf(b, d[0], e < f ? p.fa : p.xa);
				}
			}
		}, ua: () => {
		}, va: () => {
		}, f: Qa
	});
	da.b = true;
	da.la = (a, b) => {
		var c = new da;
		c.rj = a;
		c.newValue = b;
		return c;
	};
	da.ma = m;
	da.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 2) && a.K == null) switch (this.rj) {
				case 0:
					var b = this.newValue;
					a.ib = b < 0 ? 0 : b > 99 ? 99 : b;
					break;
				case 1:
					b = this.newValue;
					a.Da = b < 0 ? 0 : b > 99 ? 99 : b;
			}
		}, ua: function (a) {
			a.O(this.rj);
			a.O(this.newValue);
		}, va: function (a) {
			this.rj = a.M();
			this.newValue = a.M();
		}, f: da
	});
	sa.b = true;
	sa.la = (a, b) => {
		var c = new sa;
		c.Md = a;
		c.Xg = b;
		return c;
	};
	sa.ma = m;
	sa.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 4)) {
				var b = a.na(this.P);
				var c = a.na(this.Md);
				if (c != null && c.V != 0 && this.Xg != c.cb) {
					c.cb = this.Xg;
					if (a.ii != null)
						a.ii(b, c);
				}
			}
		}, ua: function (a) {
			a.O(this.Md);
			a.l(this.Xg ? 1 : 0);
		}, va: function (a) {
			this.Md = a.M();
			this.Xg = a.B() != 0;
		}, f: sa
	});
	ra.b = true;
	ra.la = a => {
		var b = new ra;
		b.Zb = a;
		return b;
	};
	ra.ma = m;
	ra.prototype = C(m.prototype, {
		apply: function (a) {
			a = a.na(this.P);
			if (a != null)
				a.Xb = this.Zb;
		}, ua: function (a) {
			a.Db(this.Zb);
		}, va: function (a) {
			this.Zb = a.zb();
			if (this.Zb != null)
				this.Zb = U.Qc(this.Zb, 2);
		}, f: ra
	});
	S.b = true;
	S.la = (a, b) => {
		var c = new S;
		c.Md = a;
		c.jj = b;
		return c;
	};
	S.ma = m;
	S.prototype = C(m.prototype, {
		apply: function (a) {
			var b = a.na(this.Md);
			if (b != null) {
				var c = a.na(this.P);
				var d = a.Lb(this.P, 1);
				if (d = d || c == b && !a.Pc && a.K == null)
					a.Mf(c, b, this.jj);
			}
		}, ua: function (a) {
			a.O(this.Md);
			a.l(this.jj.$);
		}, va: function (a) {
			this.Md = a.M();
			a = a.lf();
			this.jj = a == 1 ? p.fa : a == 2 ? p.xa : p.Ia;
		}, f: S
	});
	qa.b = true;
	qa.la = a => {
		var b = new qa;
		b.Pd = a;
		return b;
	};
	qa.ma = m;
	qa.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 8)) {
				var b = a.na(this.P);
				if (a.K == null) {
					a.S = this.Pd;
					if (a.Ii != null)
						a.Ii(b, this.Pd);
				}
			}
		}, ua: function (a) {
			var b = w.ha();
			this.Pd.ga(b);
			b = pako.deflateRaw(b.Sb());
			a.Ub(b.byteLength);
			a.Vb(b);
		}, va: function (a) {
			a = pako.inflateRaw(a.sb(a.Ob()));
			this.Pd = h.ja(new F(new DataView(a.buffer, a.byteOffset, a.byteLength)));
		}, f: qa
	});
	Pa.b = true;
	Pa.ma = m;
	Pa.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 2) && p.Ia != this.ea)
				a.kb[this.ea.$] = this.Sg;
		}, ua: function (a) {
			a.l(this.ea.$);
			this.Sg.ga(a);
		}, va: function (a) {
			var b = a.lf();
			this.ea = b == 1 ? p.fa : b == 2 ? p.xa : p.Ia;
			this.Sg = new ka;
			this.Sg.ja(a);
		}, f: Pa
	});
	pa.b = true;
	pa.la = a => {
		var b = new pa;
		b.newValue = a;
		return b;
	};
	pa.ma = m;
	pa.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 2))
				a.Pc = this.newValue;
		}, ua: function (a) {
			a.l(this.newValue ?
				1 : 0);
		}, va: function (a) {
			this.newValue = a.B() != 0;
		}, f: pa
	});
	oa.b = true;
	oa.la = (a, b, c, d) => {
		var e = new oa;
		e.V = a;
		e.name = b;
		e.cj = c;
		e.Xb = d;
		return e;
	};
	oa.ma = m;
	oa.prototype = C(m.prototype, {
		apply: function (a) {
			if (this.P == 0) {
				var b = new ea;
				b.V = this.V;
				b.w = this.name;
				b.Kd = this.cj;
				b.Xb = this.Xb;
				a.I.push(b);
				a = a.tl;
				if (a != null)
					a(b);
			}
		}, ua: function (a) {
			a.O(this.V);
			a.Db(this.name);
			a.Db(this.cj);
			a.Db(this.Xb);
		}, va: function (a) {
			this.V = a.M();
			this.name = a.zb();
			this.cj = a.zb();
			this.Xb = a.zb();
		}, f: oa
	});
	qb.b = true;
	qb.ma = m;
	qb.prototype = C(m.prototype, {
		apply: function (a) {
			a = a.na(this.ze);
			if (a != null && this.P == 0)
				a.Jd = this.Zb;
		}, ua: function (a) {
			a.Db(this.Zb);
			a.O(this.ze);
		}, va: function (a) {
			this.Zb = a.zb();
			this.ze = a.M();
			if (this.Zb != null)
				this.Zb = U.Qc(this.Zb, 2);
		}, f: qb
	});
	Oa.b = true;
	Oa.ma = m;
	Oa.prototype = C(m.prototype, {
		apply: function (a) {
			var b = a.K;
			if (b != null && a.Lb(this.P, 16)) {
				var c = a.na(this.P);
				var d = b.Oa == 120;
				var e = b.Oa > 0;
				if (this.Bf)
					b.Oa = 120;
				else if (b.Oa == 120)
					b.Oa = 119;
				if (this.Bf != d)
					Cb.i(a.ml, c, this.Bf, e);
			}
		}, ua: function (a) {
			a.l(this.Bf ? 1 : 0);
		}, va: function (a) {
			this.Bf = a.B() != 0;
		}, f: Oa
	});
	Na.b = true;
	Na.ma = m;
	Na.prototype = C(m.prototype, {
		$m: function (a) {
			if (a.hq != null) {
				var b = a.na(this.P);
				return b == null ? false : a.hq(b, this.Tc);
			}
			return true;
		}, apply: function (a) {
			var b = a.na(this.P);
			if (b != null)
				ia.i(a.rl, b, this.Tc);
		}, ua: function (a) {
			a.mc(U.Qc(this.Tc, 140));
		}, va: function (a) {
			this.Tc = a.ic();
			if (this.Tc.length > 140)
				throw new q('message too long');
		}, f: Na
	});
	Ga.b = true;
	Ga.ma = m;
	Ga.prototype = C(m.prototype, {
		apply: function (a) {
			var b = a.na(this.P);
			if (b != null) {
				var c = this.input;
				if ((b.ob & 16) == 0 && (c & 16) != 0)
					b.Wb = true;
				b.ob = c;
				if (a.iq != null)
					a.iq(b);
			}
		}, ua: function (a) {
			a.tb(this.input);
		}, va: function (a) {
			this.input = a.hb();
		}, f: Ga
	});
	na.b = true;
	na.la = a => {
		var b = new na;
		b.sj = a;
		return b;
	};
	na.ma = m;
	na.prototype = C(m.prototype, {
		apply: function (a) {
			var b = a.na(this.P);
			if (b != null)
				ia.i(a.wl, b, this.sj);
		}, ua: function (a) {
			a.l(this.sj);
		}, va: function (a) {
			this.sj = a.B();
		}, f: na
	});
	kc.b = true;
	kc.fj = () => {
		m.Ha(rb);
		m.Ha(na);
		m.Ha(Ua);
		m.Ha(Ga);
		m.Ha(Na);
		m.Ha(oa);
		m.Ha(Y);
		m.Ha(Ma);
		m.Ha(La);
		m.Ha(Oa);
		m.Ha(da);
		m.Ha(qa);
		m.Ha(S);
		m.Ha(pa);
		m.Ha(sa);
		m.Ha(Qa);
		m.Ha(ta);
		m.Ha(la);
		m.Ha(ra);
		m.Ha(Pa);
		m.Ha(pb);
		m.Ha(ma);
		m.Ha(qb);
		m.Ha(ob);
	};
	Y.b = true;
	Y.la = (a, b, c) => {
		var d = new Y;
		d.V = a;
		d.fd = b;
		d.Qg = c;
		return d;
	};
	Y.ma = m;
	Y.prototype = C(m.prototype, {
		apply: function (a) {
			if (this.V != 0 && a.Lb(this.P, 128)) {
				var b = a.na(this.V);
				if (b != null) {
					var c = a.na(this.P);
					D.remove(a.I, b);
					if (a.K != null)
						D.remove(a.K.ta.F, b.H);
					vb.i(a.ul, b, this.fd, this.Qg, c);
				}
			}
		}, ua: function (a) {
			if (this.fd != null)
				this.fd = U.Qc(this.fd, 100);
			a.O(this.V);
			a.Db(this.fd);
			a.l(this.Qg ? 1 : 0);
		}, va: function (a) {
			this.V = a.M();
			this.fd = a.zb();
			this.Qg = a.B() != 0;
			if (this.fd != null && this.fd.length > 100)
				throw new q('string too long');
		}, f: Y
	});
	pb.b = true;
	pb.ma = m;
	pb.prototype = C(m.prototype, {
		apply: function (a) {
			if (this.P == 0) {
				for (var b = new Map, c = 0, d = a.I; d.length > c; c++) {
					var e = d[c];
					b.set(e.V, e);
				}
				c = [];
				d = 0;
				for (e = this.Zg; e.length > d; d++) {
					var f = e[d];
					var g = b.get(f);
					if (g != null) {
						b['delete'](f);
						c.push(g);
					}
				}
				d = [];
				b = b.values();
				for (e = b.next(); !e.done;) {
					f = e.value;
					e = b.next();
					d.push(f);
				}
				a.I = this.Zm ? c.concat(d) : d.concat(c);
			}
		}, ua: function (a) {
			a.l(this.Zm ? 1 : 0);
			a.l(this.Zg.length);
			for (var b = 0, c = this.Zg; c.length > b; b++)
				a.O(c[b]);
		}, va: function (a) {
			this.Zm = a.B() != 0;
			var b = a.B();
			this.Zg = [];
			for (var c = 0; b > c; c++) {
				this.Zg.push(a.M());
			}
		}, f: pb
	});
	ob.b = true;
	ob.ma = m;
	ob.prototype = C(m.prototype, {
		apply: function (a) {
			if (this.P == 0) {
				var b = a.K;
				if (b != null) {
					if (this.Sm) {
						a = a.na(this.ze);
						if (a == null)
							return;
						a = a.H;
					}
					else
						a = b.ta.F[this.ze];
					if (a != null) {
						if (this.Ka[0] != null)
							a.a.x = this.Ka[0];
						if (this.Ka[1] != null)
							a.a.y = this.Ka[1];
						if (this.Ka[2] != null)
							a.D.x = this.Ka[2];
						if (this.Ka[3] != null)
							a.D.y = this.Ka[3];
						if (this.Ka[4] != null)
							a.oa.x = this.Ka[4];
						if (this.Ka[5] != null)
							a.oa.y = this.Ka[5];
						if (this.Ka[6] != null)
							a.Z = this.Ka[6];
						if (this.Ka[7] != null)
							a.m = this.Ka[7];
						if (this.Ka[8] != null)
							a.aa = this.Ka[8];
						if (this.Ka[9] != null)
							a.Ca = this.Ka[9];
						if (this.Rc[0] != null)
							a.R = this.Rc[0];
						if (this.Rc[1] != null)
							a.h = this.Rc[1];
						if (this.Rc[2] != null)
							a.v = this.Rc[2];
					}
				}
			}
		}, ua: function (a) {
			a.O(this.ze);
			a.l(this.Sm ? 1 : 0);
			var b = a.a;
			a.Ub(0);
			for (var c = 0, d = 1, e = 0, f = this.Ka; f.length > e;) {
				var g = f[e];
				++e;
				if (g != null) {
					c |= d;
					a.Wi(g);
				}
				d <<= 1;
			}
			e = 0;
			for (f = this.Rc; f.length > e;) {
				g = f[e];
				++e;
				if (g != null) {
					c |= d;
					a.O(g);
				}
				d <<= 1;
			}
			d = a.a;
			a.a = b;
			a.Ub(c);
			a.a = d;
		}, va: function (a) {
			this.ze = a.M();
			this.Sm = a.B() != 0;
			var b = a.Ob();
			this.Ka = [];
			for (var c = 0; c < 10; c++) {
				var d = c;
				this.Ka[d] = null;
				if ((b & 1) != 0)
					this.Ka[d] = a.mi();
				b >>>= 1;
			}
			this.Rc = [];
			for (c = 0; c < 3;) {
				d = c++;
				this.Rc[d] = null;
				if ((b & 1) != 0)
					this.Rc[d] = a.M();
				b >>>= 1;
			}
		}, f: ob
	});
	ma.b = true;
	ma.la = (a, b, c) => {
		var d = new ma;
		d.min = a;
		d.nj = b;
		d.aj = c;
		return d;
	};
	ma.ma = m;
	ma.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 2))
				a.mr(a.na(this.P), this.min, this.nj, this.aj);
		}, ua: function (a) {
			a.O(this.min);
			a.O(this.nj);
			a.O(this.aj);
		}, va: function (a) {
			this.min = a.M();
			this.nj = a.M();
			this.aj = a.M();
		}, f: ma
	});
	Ma.b = true;
	Ma.ma = m;
	Ma.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 32))
				a.yr(a.na(this.P), 0);
		}, ua: () => {
		}, va: () => {
		}, f: Ma
	});
	La.b = true;
	La.ma = m;
	La.prototype = C(m.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 32)) {
				var b = a.na(this.P);
				if (a.K != null) {
					a.K = null;
					for (var c = 0, d = a.I; d.length > c; c++) {
						var e = d[c];
						e.H = null;
						e.Jb = 0;
					}
					if (a.vf != null)
						a.vf(b);
				}
			}
		}, ua: () => {
		}, va: () => {
		}, f: La
	});
	la.b = true;
	la.la = a => {
		for (var b = new la, c = a.T.I, d = [], e = 0; c.length > e;) {
			var f = a.Ie.get(c[e++].V);
			d.push(f == null ? 0 : f.yb);
		}
		b.we = d;
		return b;
	};
	la.ma = m;
	la.prototype = C(m.prototype, {
		apply: function (a) {
			if (this.P == 0) {
				a = a.I;
				for (var b = 0, c = a.length; c > b; b++) {
					var d = b;
					if (this.we.length <= d)
						break;
					a[d].yb = this.we[d];
				}
			}
		}, ua: function (a) {
			a.lb(this.we.length);
			for (var b = 0, c = this.we; c.length > b; b++)
				a.lb(c[b]);
		}, va: function (a) {
			this.we = [];
			for (var b = a.Ab(), c = 0; b > c;) {
				++c;
				this.we.push(a.Ab());
			}
		}, f: la
	});
	ca.b = true;
	ca.Rd = [Ta];
	ca.qd = (a, b) => {
		a.Z = b.Z;
		a.m = b.m;
		a.aa = b.aa;
		a.Ca = b.Ca;
		a.R = b.R;
		a.Mj = b.Mj;
		a.h = b.h;
		a.v = b.v;
		var c = a.a;
		var d = b.a;
		c.x = d.x;
		c.y = d.y;
		c = a.D;
		d = b.D;
		c.x = d.x;
		c.y = d.y;
		c = a.oa;
		d = b.oa;
		c.x = d.x;
		c.y = d.y;
	};
	ca.prototype = {
		ga: function (a) {
			var b = this.a;
			a.s(b.x);
			a.s(b.y);
			b = this.D;
			a.s(b.x);
			a.s(b.y);
			b = this.oa;
			a.s(b.x);
			a.s(b.y);
			a.s(this.Z);
			a.s(this.m);
			a.s(this.aa);
			a.s(this.Ca);
			a.tb(this.R);
			a.O(this.h);
			a.O(this.v);
		}, ja: function (a) {
			var b = this.a;
			b.x = a.u();
			b.y = a.u();
			b = this.D;
			b.x = a.u();
			b.y = a.u();
			b = this.oa;
			b.x = a.u();
			b.y = a.u();
			this.Z = a.u();
			this.m = a.u();
			this.aa = a.u();
			this.Ca = a.u();
			this.R = a.hb();
			this.h = a.M();
			this.v = a.M();
		}, Pn: function (a) {
			var b = this.a;
			var c = a.a;
			var d = b.x - c.x;
			var b = b.y - c.y;
			var e = a.Z + this.Z;
			var f = d * d + b * b;
			if (f > 0 && e * e >= f) {
				var f = Math.sqrt(f);
				var d = d / f;
				var b = b / f;
				var c = this.aa / (this.aa + a.aa);
				var e = e - f;
				var f = e * c;
				var g = this.a;
				var k = this.a;
				g.x = k.x + d * f;
				g.y = k.y + b * f;
				k = g = a.a;
				e -= f;
				g.x = k.x - d * e;
				g.y = k.y - b * e;
				e = this.D;
				f = a.D;
				e = d * (e.x - f.x) + b * (e.y - f.y);
				if (e < 0) {
					e *= this.m * a.m + 1;
					c *= e;
					g = f = this.D;
					f.x = g.x - d * c;
					f.y = g.y - b * c;
					a = f = a.D;
					c = e - c;
					f.x = a.x + d * c;
					f.y = a.y + b * c;
				}
			}
		}, Qn: function (a) {
			var b;
			var c;
			var d;
			if (0 * a.vb != 0) {
				b = a.W.a;
				var e = a.ca.a;
				c = e.x - b.x;
				var f = e.y - b.y;
				var g = this.a;
				d = g.x - e.x;
				e = g.y - e.y;
				g = this.a;
				if ((g.x - b.x) * c + (g.y - b.y) * f <= 0 || d * c + e * f >= 0)
					return;
				c = a.wa;
				b = c.x;
				c = c.y;
				d = b * d + c * e;
			}
			else {
				c = a.Xd;
				d = this.a;
				b = d.x - c.x;
				c = d.y - c.y;
				d = a.Hg;
				e = a.Ig;
				if (a.vb <= 0 == (d.x * b + d.y * c > 0 && e.x * b + e.y * c > 0))
					return;
				e = Math.sqrt(b * b + c * c);
				if (e == 0)
					return;
				d = e - a.Yj;
				b /= e;
				c /= e;
			}
			e = a.Cc;
			if (e == 0) {
				if (d < 0) {
					d = -d;
					b = -b;
					c = -c;
				}
			}
			else if (e < 0 && (e = -e, d = -d, b = -b, c = -c), -e > d)
				return;
			if (this.Z > d) {
				d = this.Z - d;
				f = e = this.a;
				e.x = f.x + b * d;
				e.y = f.y + c * d;
				d = this.D;
				d = b * d.x + c * d.y;
				if (d < 0) {
					d *= this.m * a.m + 1;
					e = a = this.D;
					a.x = e.x - b * d;
					a.y = e.y - c * d;
				}
			}
		}, sc: function () {
			var a = ya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new ca;
				this.hc = a;
				ca.qd(b, this);
			}
			return b;
		}, f: ca
	};
	nb.b = true;
	nb.Rd = [Ta];
	nb.prototype = {
		ga: function (a) {
			a.l(this.Yd);
			a.l(this.Zd);
			a.s(this.Hb);
			a.s(this.ec);
			a.s(this.ne);
			a.O(this.R);
		}, ja: function (a) {
			this.Yd = a.B();
			this.Zd = a.B();
			this.Hb = a.u();
			this.ec = a.u();
			this.ne = a.u();
			this.R = a.M();
		}, C: function (a) {
			var b = a[this.Yd];
			a = a[this.Zd];
			if (b != null && a != null) {
				var c = b.a;
				var d = a.a;
				var e = c.x - d.x;
				var c = c.y - d.y;
				var f = Math.sqrt(e * e + c * c);
				if (f > 0) {
					e /= f;
					c /= f;
					d = b.aa / (b.aa + a.aa);
					if (d != d)
						d = .5;
					var g;
					var k;
					if (this.ec <= this.Hb)
						g = this.Hb, k = 0;
					else if (this.Hb >= f)
						g = this.Hb, k = 1;
					else if (this.ec <= f)
						g = this.ec, k = -1;
					else
						return;
					f = g - f;
					if (0 * this.ne == 0)
						d = this.ne * f * .5, e *= d, c *= d, k = d = b.D, b = b.aa, d.x = k.x + e * b, d.y = k.y + c * b, d = b = a.D, a = a.aa, b.x = d.x + -e * a, b.y = d.y + -c * a;
					else {
						g = f * d;
						var l = b.a;
						var h = b.a;
						l.x = h.x + e * g * .5;
						l.y = h.y + c * g * .5;
						h = l = a.a;
						f -= g;
						l.x = h.x - e * f * .5;
						l.y = h.y - c * f * .5;
						f = b.D;
						g = a.D;
						f = e * (f.x - g.x) + c * (f.y - g.y);
						if (f * k <= 0) {
							d *= f;
							b = k = b.D;
							k.x = b.x - e * d;
							k.y = b.y - c * d;
							a = b = a.D;
							d = f - d;
							b.x = a.x + e * d;
							b.y = a.y + c * d;
						}
					}
				}
			}
		}, f: nb
	};
	Fa.b = true;
	Fa.Rd = [Ta];
	Fa.qd = (a, b) => {
		if (b.F == null)
			a.F = null;
		else {
			if (a.F == null)
				a.F = [];
			for (var c = a.F, d = b.F, e = d.length; e < c.length;)
				c.pop();
			for (var e = 0, f = d.length; f > e; e++) {
				var g = e;
				c[g] = d[g].sc();
			}
		}
		a.J = b.J;
		a.U = b.U;
		a.qa = b.qa;
		a.pb = b.pb;
	};
	Fa.prototype = {
		ga: function (a) {
			a.l(this.F.length);
			for (var b = 0, c = this.F.length; c > b;) {
				var d = b++;
				var e = this.F[d];
				e.jl = d;
				e.ga(a);
			}
		}, ja: function (a) {
			this.F = [];
			for (var b = a.B(), c = 0; b > c;) {
				++c;
				var d = new ca;
				d.ja(a);
				this.F.push(d);
			}
		}, C: function (a) {
			for (var b = 0, c = this.F; c.length > b;) {
				var d = c[b];
				++b;
				var e = d.a;
				var f = d.a;
				var g = d.D;
				e.x = f.x + g.x * a;
				e.y = f.y + g.y * a;
				f = e = d.D;
				g = d.oa;
				d = d.Ca;
				e.x = (f.x + g.x) * d;
				e.y = (f.y + g.y) * d;
			}
			a = 0;
			for (b = this.F.length; b > a;) {
				d = a++;
				c = this.F[d];
				d += 1;
				for (e = this.F.length; e > d;) {
					f = this.F[d++];
					if ((f.h & c.v) != 0 && (f.v & c.h) != 0)
						c.Pn(f);
				}
				if (c.aa != 0) {
					d = 0;
					for (e = this.qa; e.length > d;) {
						if (f = e[d], ++d, (f.h & c.v) != 0 && (f.v & c.h) != 0) {
							var g = f.wa;
							var k = c.a;
							var g = f.Ua - (g.x * k.x + g.y * k.y) + c.Z;
							if (g > 0) {
								var l = k = c.a;
								var h = f.wa;
								k.x = l.x + h.x * g;
								k.y = l.y + h.y * g;
								g = c.D;
								k = f.wa;
								g = g.x * k.x + g.y * k.y;
								if (g < 0) {
									g *= c.m * f.m + 1;
									l = k = c.D;
									f = f.wa;
									k.x = l.x - f.x * g;
									k.y = l.y - f.y * g;
								}
							}
						}
					}
					d = 0;
					for (e = this.U; e.length > d;) {
						f = e[d];
						++d;
						if ((f.h & c.v) != 0 && (f.v & c.h) != 0)
							c.Qn(f);
					}
					d = 0;
					for (e = this.J; e.length > d;) {
						if (f = e[d], ++d, (f.h & c.v) != 0 && (f.v & c.h) != 0 && (k = c.a, l = f.a, g = k.x - l.x, k = k.y - l.y, l = g * g + k * k, l > 0 && l <= c.Z * c.Z)) {
							var l = Math.sqrt(l);
							var g = g / l;
							var k = k / l;
							var l = c.Z - l;
							var m = h = c.a;
							h.x = m.x + g * l;
							h.y = m.y + k * l;
							l = c.D;
							l = g * l.x + k * l.y;
							if (l < 0) {
								l *= c.m * f.m + 1;
								h = f = c.D;
								f.x = h.x - g * l;
								f.y = h.y - k * l;
							}
						}
					}
				}
			}
			for (a = 0; a < 2; a++) {
				for (b = 0, c = this.pb; c.length > b; b++)
					c[b].C(this.F);
			}
		}, sc: function () {
			var a = ya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new Fa;
				this.hc = a;
				Fa.qd(b, this);
			}
			return b;
		}, f: Fa
	};
	L.b = true;
	L.prototype = {
		ga: function (a) {
			var b = this.wa;
			a.s(b.x);
			a.s(b.y);
			a.s(this.Ua);
			a.s(this.m);
			a.O(this.h);
			a.O(this.v);
		}, ja: function (a) {
			var b = this.wa;
			b.x = a.u();
			b.y = a.u();
			this.Ua = a.u();
			this.m = a.u();
			this.h = a.M();
			this.v = a.M();
		}, f: L
	};
	E.b = true;
	E.prototype = {
		ga: function (a) {
			var b = 0;
			var c = a.a;
			a.l(0);
			a.l(this.W.ud);
			a.l(this.ca.ud);
			if (this.Cc != 0) {
				b = 1;
				a.s(this.Cc);
			}
			if (this.vb != Infinity) {
				b |= 2;
				a.s(this.vb);
			}
			if (this.R != 0) {
				b |= 4;
				a.O(this.R);
			}
			if (this.Za)
				b |= 8;
			a.o.setUint8(c, b);
			a.s(this.m);
			a.O(this.h);
			a.O(this.v);
		}, ja: function (a, b) {
			var c = a.B();
			this.W = b[a.B()];
			this.ca = b[a.B()];
			this.Cc = (c & 1) != 0 ? a.u() : 0;
			this.vb = (c & 2) != 0 ? a.u() : Infinity;
			this.R = (c & 4) != 0 ? a.M() : 0;
			this.Za = (c & 8) != 0;
			this.m = a.u();
			this.h = a.M();
			this.v = a.M();
		}, Oc: function (a) {
			a *= .017453292519943295;
			if (a < 0) {
				a = -a;
				var b = this.W;
				this.W = this.ca;
				this.ca = b;
				this.Cc = -this.Cc;
			}
			if (E.mn < a && E.ln > a)
				this.vb = 1 / Math.tan(a / 2);
		}, Co: function () {
			return 0 * this.vb != 0 ? 0 : 114.59155902616465 * Math.atan(1 / this.vb);
		}, he: function () {
			if (0 * this.vb == 0) {
				var a = this.ca.a;
				var b = this.W.a;
				var c = .5 * (a.x - b.x);
				var a = .5 * (a.y - b.y);
				var b = this.W.a;
				var d = this.vb;
				this.Xd = new H(b.x + c + -a * d, b.y + a + c * d);
				a = this.W.a;
				b = this.Xd;
				c = a.x - b.x;
				a = a.y - b.y;
				this.Yj = Math.sqrt(c * c + a * a);
				c = this.W.a;
				a = this.Xd;
				this.Hg = new H(-(c.y - a.y), c.x - a.x);
				c = this.Xd;
				a = this.ca.a;
				this.Ig = new H(-(c.y - a.y), c.x - a.x);
				if (this.vb <= 0) {
					a = c = this.Hg;
					c.x = -a.x;
					c.y = -a.y;
					a = c = this.Ig;
					c.x = -a.x;
					c.y = -a.y;
				}
			}
			else {
				a = this.W.a;
				b = this.ca.a;
				c = a.x - b.x;
				a = -(a.y - b.y);
				b = Math.sqrt(a * a + c * c);
				this.wa = new H(a / b, c / b);
			}
		}, f: E
	};
	B.b = true;
	B.prototype = {
		ga: function (a) {
			var b = this.a;
			a.s(b.x);
			a.s(b.y);
			a.s(this.m);
			a.O(this.h);
			a.O(this.v);
		}, ja: function (a) {
			var b = this.a;
			b.x = a.u();
			b.y = a.u();
			this.m = a.u();
			this.h = a.M();
			this.v = a.M();
		}, f: B
	};
	N.b = true;
	N.lc = a => 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
	N.Gi = (a, b) => {
		a.imageSmoothingEnabled = b;
		a.mozImageSmoothingEnabled = b;
	};
	N.prototype = {
		Po: function (a, b) {
			var c = this.dd.get(a.V);
			if (c != null) switch (b) {
				case 0:
					c.Xf = true;
					break;
				case 1:
					c.Xf = false;
			}
		}, Pr: function () {
			if (this.sa.parentElement != null) {
				var a = window.devicePixelRatio * this.zg;
				var b = this.sa.getBoundingClientRect();
				var c = Math.round(b.width * a);
				var a = Math.round(b.height * a);
				if (c != this.sa.width || a != this.sa.height)
					this.sa.width = c, this.sa.height = a;
			}
		}, Kc: function (a, b) {
			var c = window.performance.now();
			var d = (c - this.$c) / 1000;
			this.$c = c;
			this.Jg.clear();
			this.Pr();
			N.Gi(this.c, true);
			this.c.resetTransform();
			if (a.K != null) {
				var c = a.K;
				var e = c.ta;
				var f = a.na(b);
				var g = f != null ? f.H : null;
				var k = this.jf != 0 ? this.sa.height / this.jf : this.kf * window.devicePixelRatio * this.zg;
				var h = this.xf * this.zg;
				var m = c.S.Ye;
				var n = this.sa.width / k;
				if (m > 0 && m < n) {
					n = m;
					k = this.sa.width / m;
				}
				m = (this.sa.height - h) / k;
				this.Mr(c, g, n, m, d);
				for (var p = 0, q = a.I; q.length > p;) {
					var r = q[p];
					++p;
					if (r.H != null) {
						var u = this.dd.get(r.V);
						if (u == null) {
							u = new Ea;
							this.dd.set(r.V, u);
						}
						u.C(r, a);
						this.Jg.set(r.H, u);
					}
				}
				this.c.translate(this.sa.width / 2, (this.sa.height + h) / 2);
				this.c.scale(k, k);
				this.c.translate(-this.Ya.x, -this.Ya.y);
				this.c.lineWidth = 3;
				this.Sq(c.S);
				this.Rq(c.S);
				k = e.F;
				h = 0;
				for (p = e.pb; p.length > h;)
					this.Mq(p[h++], k);
				this.Lq(a, n, m);
				this.Nq(a, f);
				if (g != null)
					this.Pq(g.a);
				this.c.lineWidth = 2;
				f = 0;
				for (g = a.I; g.length > f;) {
					n = g[f];
					++f;
					m = n.H;
					if (m != null)
						this.Ll(m, this.dd.get(n.V));
				}
				f = 0;
				for (e = e.F; e.length > f;) {
					g = e[f];
					++f;
					if (this.Jg.get(g) == null)
						this.Ll(g, null);
				}
				this.c.lineWidth = 3;
				this.c.resetTransform();
				this.c.translate(this.sa.width / 2, this.sa.height / 2);
				this.Oq(c);
				if (c.Oa <= 0) {
					this.td.C(d);
					this.td.Kc(this.c);
				}
				this.Jg.clear();
				this.Kq(a);
			}
		}, Kq: function (a) {
			var b = new Set;
			var c = 0;
			for (a = a.I; a.length > c;)
				b.add(a[c++].V);
			c = this.dd.keys();
			for (a = c.next(); !a.done;) {
				var d = a.value;
				a = c.next();
				if (!b.has(d))
					this.dd['delete'](d);
			}
		}, Mr: function (a, b, c, d, e) {
			var f;
			var g;
			if (b != null && a.S.Ge == 1) {
				g = b.a;
				f = g.x;
				g = g.y;
			}
			else if (g = a.ta.F[0].a, f = g.x, g = g.y, b != null) {
				var k = b.a;
				f = .5 * (f + k.x);
				g = .5 * (g + k.y);
				var h = .5 * c;
				var m = .5 * d;
				b = k.x - h + 50;
				var n = k.y - m + 50;
				var h = k.x + h - 50;
				var k = k.y + m - 50;
				f = h < f ? h : b > f ? b : f;
				g = k < g ? k : n > g ? n : g;
			}
			n = 60 * e;
			if (n > 1)
				n = 1;
			b = e = this.Ya;
			n *= .04;
			h = b.x;
			b = b.y;
			e.x = h + (f - h) * n;
			e.y = b + (g - b) * n;
			this.Xn(c, d, a.S);
		}, Xn: function (a, b, c) {
			if (2 * c.$b < a)
				this.Ya.x = 0;
			else {
				if (c.$b < this.Ya.x + .5 * a)
					this.Ya.x = c.$b - .5 * a;
				else if (-c.$b > this.Ya.x - .5 * a)
					this.Ya.x = -c.$b + .5 * a;
			}
			if (2 * c.qc < b)
				this.Ya.y = 0;
			else {
				if (c.qc < this.Ya.y + .5 * b)
					this.Ya.y = c.qc - .5 * b;
				else if (-c.qc > this.Ya.y - .5 * b)
					this.Ya.y = -c.qc + .5 * b;
			}
		}, Pq: function (a) {
			this.c.beginPath();
			this.c.strokeStyle = 'white';
			this.c.globalAlpha = .3;
			this.c.arc(a.x, a.y, 25, 0, 2 * Math.PI, false);
			this.c.stroke();
			this.c.globalAlpha = 1;
		}, Oq: function (a) {
			var b = a.Oa > 0;
			this.lr(b);
			if (b) {
				if (a.Oa != 120) {
					a = a.Oa / 120 * 200;
					this.c.fillStyle = 'white';
					this.c.fillRect(.5 * -a, 100, a, 20);
				}
				this.td.eq.Tq(this.c);
			}
		}, lr: function (a) {
			if (a != this.Dk) {
				this.sa.style.filter = a ? 'grayscale(70%)' : '';
				this.Dk = a;
			}
		}, Wl: (a, b, c, d, e, f) => {
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
		}, Sq: function (a) {
			var b = this;
			N.Gi(this.c, false);
			var c = a.Td;
			var d = a.Sd;
			if (a.ld == 1) {
				this.c.save();
				this.c.resetTransform();
				this.c.fillStyle = N.lc(a.jd);
				this.c.fillRect(0, 0, this.sa.width, this.sa.height);
				this.c.restore();
				this.c.strokeStyle = '#C7E6BD';
				this.c.fillStyle = this.Lo;
				this.Wl(this.c, -c, -d, 2 * c, 2 * d, a.Uc);
				this.c.save();
				this.c.scale(2, 2);
				this.c.fill();
				this.c.restore();
				this.c.moveTo(0, -d);
				this.c.lineTo(0, d);
				this.c.stroke();
				this.c.beginPath();
				this.c.arc(0, 0, a.kd, 0, 2 * Math.PI);
				this.c.stroke();
			}
			else if (a.ld == 2) {
				this.c.strokeStyle = '#E9CC6E';
				this.c.save();
				this.c.beginPath();
				this.c.rect(this.Ya.x - 10000, this.Ya.y - 10000, 20000, 20000);
				this.c.scale(2, 2);
				this.c.fillStyle = this.Un;
				this.c.fill();
				this.c.restore();
				this.c.save();
				this.Wl(this.c, -c, -d, 2 * c, 2 * d, a.Uc);
				this.c.scale(2, 2);
				this.c.fillStyle = this.Wn;
				this.c.fill();
				this.c.restore();
				this.c.stroke();
				this.c.beginPath();
				this.c.moveTo(0, -d);
				this.c.setLineDash([15, 15]);
				this.c.lineTo(0, d);
				this.c.stroke();
				this.c.setLineDash([]);
				var e = a.Fe;
				var c = c - e;
				if (a.Uc > e)
					c = 0;
				e = (c, e, h) => {
					b.c.beginPath();
					b.c.strokeStyle = c;
					b.c.arc(0, 0, a.kd, -1.5707963267948966, 1.5707963267948966, h);
					if (e != 0) {
						b.c.moveTo(e, -d);
						b.c.lineTo(e, d);
					}
					b.c.stroke();
				};
				e('#85ACF3', c, false);
				e('#E18977', -c, true);
			}
			else {
				this.c.save();
				this.c.resetTransform();
				this.c.fillStyle = N.lc(a.jd);
				this.c.fillRect(0, 0, this.sa.width, this.sa.height);
				this.c.restore();
			}
			N.Gi(this.c, true);
		}, Nq: function (a, b) {
			for (var c = n.A.Ak.L(), d = 0, e = a.I; e.length > d;) {
				var f = e[d];
				++d;
				var g = f.H;
				if (g != null) {
					var g = g.a;
					var h = this.dd.get(f.V);
					if (c && h.Xf)
						this.c.drawImage(n.Dm, g.x - .5 * n.Dm.width, g.y - 35);
					if (b != f)
						h.so(this.c, g.x, g.y + 50);
				}
			}
		}, Ll: function (a, b) {
			this.c.beginPath();
			if (b == null) {
				this.c.fillStyle = N.lc(a.R);
				this.c.strokeStyle = 'black';
			}
			else {
				this.c.fillStyle = b.Ij;
				this.c.strokeStyle = b.lo;
			}
			this.c.beginPath();
			this.c.arc(a.a.x, a.a.y, a.Z, 0, 2 * Math.PI, false);
			if (b != null) {
				this.c.save();
				var c = a.Z / 32;
				this.c.translate(a.a.x, a.a.y);
				this.c.scale(c, c);
				this.c.translate(-32, -32);
				this.c.fill();
				this.c.restore();
			}
			else if ((a.R | 0) != -1)
				this.c.fill();
			this.c.stroke();
		}, Rq: function (a) {
			if (a != null) {
				var b = 0;
				for (a = a.U; a.length > b;)
					this.Qq(a[b++]);
			}
		}, Mq: function (a, b) {
			if (a.R >= 0) {
				this.c.beginPath();
				this.c.strokeStyle = N.lc(a.R);
				var c = b[a.Yd];
				var d = b[a.Zd];
				if (c != null && d != null) {
					c = c.a;
					d = d.a;
					this.c.moveTo(c.x, c.y);
					this.c.lineTo(d.x, d.y);
					this.c.stroke();
				}
			}
		}, Qq: function (a) {
			if (a.Za) {
				this.c.beginPath();
				this.c.strokeStyle = N.lc(a.R);
				var b = a.W.a;
				var c = a.ca.a;
				if (0 * a.vb != 0) {
					this.c.moveTo(b.x, b.y);
					this.c.lineTo(c.x, c.y);
				}
				else {
					a = a.Xd;
					var d = b.x - a.x;
					var b = b.y - a.y;
					this.c.arc(a.x, a.y, Math.sqrt(d * d + b * b), Math.atan2(b, d), Math.atan2(c.y - a.y, c.x - a.x));
				}
				this.c.stroke();
			}
		}, Lq: function (a, b, c) {
			var d = a.K;
			if (d != null) {
				for (d = d.ta.F[0], this.nk(d.a, d.R, b, c), d = 0, a = a.I; a.length > d;) {
					var e = a[d];
					++d;
					if (e.H != null)
						this.nk(e.H.a, e.ea.R, b, c);
				}
			}
		}, nk: function (a, b, c, d) {
			c = .5 * c - 25;
			d = .5 * d - 25;
			var e = this.Ya;
			var f = a.x - e.x;
			var e = a.y - e.y;
			var g = -c;
			var h = -d;
			var l = this.Ya;
			c = l.x + (c < f ? c : g > f ? g : f);
			d = l.y + (d < e ? d : h > e ? h : e);
			f = a.x - c;
			a = a.y - d;
			if (f * f + a * a > 900) {
				this.c.fillStyle = 'rgba(0,0,0,0.5)';
				this.pk(c + 2, d + 2, Math.atan2(a, f));
				this.c.fillStyle = N.lc(b);
				this.pk(c - 2, d - 2, Math.atan2(a, f));
			}
		}, pk: function (a, b, c) {
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
		}, Xq: function () {
			for (var a = this.dd.values(), b = a.next(); !b.done;) {
				var c = b.value;
				var b = a.next();
				c.Xf = false;
			}
		}, f: N
	};
	R.b = true;
	R.prototype = {
		zo: function () {
			return 2.31 + .1155 * (this.We.length - 1);
		}, Kc: function (a, b) {
			var c = b / 2.31;
			var d = 0;
			a.imageSmoothingEnabled = true;
			for (var e = 0, f = this.We; f.length > e;) {
				var g = f[e];
				++e;
				var h = c - .05 * d;
				var l = 180 * R.kn.eval(h) * ((d & 1) != 0 ? -1 : 1);
				a.globalAlpha = R.jn.eval(h);
				a.drawImage(g, l - .5 * g.width, 35 * -(this.We.length - 1) + 70 * d - .5 * g.height);
				a.globalAlpha = 1;
				++d;
			}
			a.imageSmoothingEnabled = false;
		}, Tq: function (a) {
			var b = 0;
			a.imageSmoothingEnabled = true;
			for (var c = 0, d = this.We; d.length > c;) {
				var e = d[c];
				++c;
				a.drawImage(e, .5 * -e.width, 35 * -(this.We.length - 1) + 70 * b - .5 * e.height);
				++b;
			}
			a.imageSmoothingEnabled = false;
		}, lc: a => 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)', sp: function (a, b) {
			var c = window.document.createElement('canvas');
			var d = c.getContext('2d', null);
			d.font = '900 70px Arial Black,Arial Bold,Gadget,sans-serif';
			c.width = Math.ceil(d.measureText(a).width) + 7;
			c.height = 90;
			d.font = '900 70px Arial Black,Arial Bold,Gadget,sans-serif';
			d.textAlign = 'left';
			d.textBaseline = 'middle';
			d.fillStyle = 'black';
			d.fillText(a, 7, 52);
			d.fillStyle = this.lc(b);
			d.fillText(a, 0, 45);
			return c;
		}, f: R
	};
	Sb.b = true;
	Sb.prototype = {
		Pa: function (a) {
			this.ab.push(a);
		}, Nn: function () {
			this.ab = [];
			this.xc = 0;
		}, C: function (a) {
			if (this.ab.length > 0) {
				this.xc += a;
				if (this.ab[0].zo() < this.xc) {
					this.xc = 0;
					this.ab.shift();
				}
			}
		}, Kc: function (a) {
			if (this.ab.length > 0)
				this.ab[0].Kc(a, this.xc);
		}, f: Sb
	};
	Ea.b = true;
	Ea.Ln = (a, b) => {
		if (b.hd != a.hd || b.ed != a.ed)
			return false;
		var c = a.fb;
		var d = b.fb;
		if (d.length != c.length)
			return false;
		for (var e = 0, f = c.length; f > e;) {
			var g = e++;
			if (d[g] != c[g])
				return false;
		}
		return true;
	};
	Ea.ao = (a, b) => {
		a.hd = b.hd;
		a.ed = b.ed;
		a.fb = b.fb.slice(0);
	};
	Ea.prototype = {
		fo: function () {
			var a = window.document.createElement('canvas');
			a.width = 160;
			a.height = 34;
			this.vl = a.getContext('2d', null);
		}, Or: function () {
			var a = this.vl;
			a.resetTransform();
			a.clearRect(0, 0, 160, 34);
			a.font = '26px sans-serif';
			a.fillStyle = 'white';
			if (a.measureText(this.w).width > 160) {
				a.textAlign = 'left';
				a.translate(2, 29);
			}
			else {
				a.textAlign = 'center';
				a.translate(80, 29);
			}
			a.fillText(this.w, 0, 0);
		}, so: function (a, b, c) {
			a.drawImage(this.vl.canvas, 0, 0, 160, 34, b - 40, c - 34, 80, 17);
		}, C: function (a, b) {
			if (a.H != null) {
				var c = n.A.xm.L() ? b.kb[a.ea.$] : a.ea.wm;
				var d = a.Jd != null ? a.Jd : a.Xb;
				var e = n.A.lm.L() && d != null;
				if (!Ea.Ln(this.kb, c) || !e && this.uh != a.Jb || e && d != this.Jf) {
					Ea.ao(this.kb, c);
					if (e) {
						this.Jf = d;
						this.uh = -1;
					}
					else {
						this.Jf = '' + a.Jb;
						this.uh = a.Jb;
					}
					this.Hq(this.Jf);
				}
			}
			this.lo = b.K.Oa > 0 || !a.Wb ? 'black' : a.Wb && a.Sc <= 0 && a.yc >= 0 ? 'white' : 'black';
			if (this.w != a.w) {
				this.w = a.w;
				this.Or();
			}
		}, Hq: function (a) {
			var b = this.kb.fb;
			if (b.length >= 1) {
				this.rb.save();
				this.rb.translate(32, 32);
				this.rb.rotate(3.141592653589793 * this.kb.hd / 128);
				for (var c = -32, d = 64 / b.length, e = 0; b.length > e;) {
					this.rb.fillStyle = N.lc(b[e++]);
					this.rb.fillRect(c, -32, d + 4, 64);
					c += d;
				}
				this.rb.restore();
				this.rb.fillStyle = N.lc(this.kb.ed);
				this.rb.textAlign = 'center';
				this.rb.textBaseline = 'alphabetic';
				this.rb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
				this.rb.fillText(a, 32, 44);
				this.Ij = this.rb.createPattern(this.rb.canvas, 'no-repeat');
			}
		}, f: Ea
	};
	mb.b = true;
	mb.prototype = {
		ki: function (a) {
			for (var b = this, c = 0, d = Ha.ab.length >> 2; d > c;) {
				var e = c++;
				var f = [e];
				var g = Ha.ab[e << 2];
				var e = Ha.ab[(e << 2) + 1].toLowerCase();
				var h = [window.document.createElement('div')];
				h[0].className = 'elem';
				h[0].innerHTML = '<div class="flagico f-' + e + '"></div> ' + g;
				a.appendChild(h[0]);
				h[0].onclick = ((a, c) => () => {
					if (b.rf != null)
						b.rf.Ja.classList.remove('selected');
					b.wh.disabled = false;
					b.rf = {Ja: a[0], index: c[0]};
					a[0].classList.add('selected');
				})(h, f);
				h[0].ondblclick = (a => () => b.Zl(a[0]))(f);
			}
		}, Zl: function (a) {
			var b = new T;
			b.ub = Ha.ab[(a << 2) + 1].toLowerCase();
			b.Ec = Ha.ab[(a << 2) + 2];
			b.Gc = Ha.ab[(a << 2) + 3];
			n.A.Ne.Xa(b);
			A.i(this.qb);
		}, f: mb
	};
	Da.b = true;
	Da.Yo = a => a == a.parentElement.querySelector(':hover');
	Da.prototype = {
		pp: function (a, b, c) {
			var d = window.document.createElement('p');
			d.className = 'announcement';
			d.textContent = a;
			if (b >= 0)
				d.style.color = N.lc(b);
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
			this.Ok(d);
		}, Ok: function (a) {
			var b = this.dc.clientHeight;
			var b = .5 * -b <= this.dc.scrollTop + b - this.dc.scrollHeight || !Da.Yo(this.dc);
			this.dc.appendChild(a);
			if (b)
				this.dc.scrollTop = a.offsetTop;
			for (a = b ? 50 : 100; a < this.dc.childElementCount;)
				this.dc.firstElementChild.remove();
			this.vg.update();
		}, ba: function (a, b) {
			var c = window.document.createElement('p');
			if (b != null)
				c.className = b;
			c.textContent = a;
			this.Ok(c);
		}, Gb: function (a) {
			this.ba(a, 'notice');
		}, f: Da
	};
	lb.b = true;
	lb.vo = a => '.$^{[(|)*+?\\'.indexOf(a) != -1 ? '\\' + a : a;
	lb.prototype = {
		Qh: function () {
			this.Ui(null);
		}, Hn: function (a, b) {
			var c = this.Iq.exec(D.substr(a, 0, b));
			if (c != null) {
				var d = c[0];
				var e = new RegExp(D.substr(d, 1, null).split('').map(lb.vo).join('.*?'), 'i');
				this.Ek = d.charAt(0) == '#';
				this.si = c.index;
				this.Vq = d.length;
				this.Ml = a;
				var c = a => {
					a = e.exec(a.w);
					return a == null ? -1 : a.index + a[0].length;
				};
				for (var d = [], f = 0, g = this.Hj; g.length > f; f++) {
					var h = g[f];
					var l = c(h);
					if (l >= 0)
						d.push({dn: l, item: h});
				}
				d.sort((a, b) => a.dn - b.dn);
				this.Ui(d);
			}
			else
				this.Ui(null);
		}, lk: function (a) {
			a = this.Ek ? '#' + a.$ : '@' + J.replace(a.w, ' ', '_');
			this.Rp(D.substr(this.Ml, 0, this.si) + a + ' ' + D.substr(this.Ml, this.si + this.Vq, null), this.si + a.length + 1);
		}, Ui: function (a) {
			var b = this;
			var c = a != null && a.length != 0;
			if (!this.Mb.hidden)
				v.Cf(this.Mb);
			this.Wc = null;
			this.Mb.hidden = !c;
			if (c) {
				for (var c = [], d = 0; a.length > d;) {
					var e = a[d++];
					var f = window.document.createElement('div');
					var e = [e.item];
					var g = e[0].w;
					if (this.Ek)
						g = '(' + e[0].$ + ') ' + g;
					f.textContent = g;
					this.Mb.appendChild(f);
					f.onclick = (a => () => b.lk(a[0]))(e);
					c.push({item: e[0], Ja: f});
				}
				this.Wc = c;
				this.Wc[0].Ja.classList.toggle('selected', true);
				this.wc = 0;
			}
		}, Qj: function (a) {
			if (this.Wc != null) {
				var b = this.wc;
				this.wc += a;
				a = this.Wc.length - 1;
				if (this.wc < 0)
					this.wc = a;
				else if (a < this.wc)
					this.wc = 0;
				a = this.Wc[this.wc];
				if (this.wc != b) {
					a.Ja.classList.toggle('selected', true);
					this.Wc[b].Ja.classList.toggle('selected', false);
				}
				a = a.Ja;
				b = a.offsetTop;
				a = b + a.offsetHeight;
				var c = this.Mb.scrollTop + this.Mb.clientHeight;
				if (this.Mb.scrollTop > b)
					this.Mb.scrollTop = b;
				else if (c < a)
					this.Mb.scrollTop = a - this.Mb.clientHeight;
			}
		}, qo: function () {
			if (this.Wc != null) {
				this.lk(this.Wc[this.wc].item);
				this.Qh();
			}
		}, f: lb
	};
	kb.b = true;
	kb.prototype = {
		Dc: function () {
			var a = this.Cb.value;
			return a.length <= 25 ? a.length > 0 : false;
		}, C: function () {
			this.af.disabled = !this.Dc();
		}, f: kb
	};
	jb.b = true;
	jb.prototype = {
		ba: function (a) {
			var b = window.document.createElement('p');
			b.textContent = a;
			this.dc.appendChild(b);
		}, f: jb
	};
	ib.b = true;
	ib.prototype = {
		Fj: function (a) {
			this.Fm = a;
			this.Em.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes');
		}, Dc: function () {
			var a = this.$e.value;
			return a.length <= 40 ? a.length > 0 : false;
		}, C: function () {
			this.Wj.disabled = !this.Dc();
		}, f: ib
	};
	Ka.b = true;
	Ka.prototype = {f: Ka};
	hb.b = true;
	hb.prototype = {
		Gg: function (a) {
			this.g.classList.toggle('restricted', a);
		}, C: function (a) {
			var b = a.K;
			if (b != null) {
				this.xc.tr(60 * a.Da);
				this.xc.sr(b.Hc | 0);
				this.Kb.set(b.Kb);
				this.Pb.set(b.Pb);
				this.Eb.Kc(a, this.Nb);
			}
		}, f: hb
	};
	Rb.b = true;
	Rb.prototype = {
		Wd: (a, b) => {
			var c = window.document.createElement('span');
			c.textContent = a;
			c.className = b;
			return c;
		}, sr: function (a) {
			if (this.Ke != a) {
				var b = a % 60;
				var c = a / 60 | 0;
				this.cr.textContent = '' + b % 10;
				this.dr.textContent = '' + (b / 10 | 0) % 10;
				this.yp.textContent = '' + c % 10;
				this.zp.textContent = '' + (c / 10 | 0) % 10;
				this.Ke = a;
			}
			this.Jl();
			this.Kl();
		}, tr: function (a) {
			this.Da = a;
			this.Jl();
			this.Kl();
		}, Jl: function () {
			this.pr(this.Da != 0 && this.Da < this.Ke);
		}, Kl: function () {
			this.ur(this.Da > this.Ke && this.Da - 30 < this.Ke);
		}, pr: function (a) {
			if (this.hk != a) {
				this.bq.className = a ? 'overtime on' : 'overtime';
				this.hk = a;
			}
		}, ur: function (a) {
			if (this.ik != a) {
				this.g.className = a ? 'game-timer-view time-warn' : 'game-timer-view';
				this.ik = a;
			}
		}, f: Rb
	};
	ja.b = true;
	ja.prototype = {
		C: function (a) {
			if (a.T.K == null)
				this.me(true);
			A.i(this.yl);
			this.bi.disabled = a.T.K == null;
			if (this.Gd)
				this.Wa.C(a.T, a.T.na(a.uc));
			else {
				a = a.Sf();
				this.Fb.C(a);
				n.Na.Xj.Ls(a);
			}
		}, me: function (a) {
			if (a != this.Gd) {
				if (this.Gd = a) {
					this.Jh.appendChild(this.Wa.g);
					this.Fb.g.remove();
				}
				else {
					this.Jh.appendChild(this.Fb.g);
					this.Wa.g.remove();
				}
			}
		}, Zo: () => ja.kq != null, bb: function (a, b) {
			v.Cf(this.hf);
			ja.kq = a;
			if (a != null) {
				this.hf.style.display = 'flex';
				this.hf.appendChild(a);
				this.yl = b;
			}
			else {
				this.hf.style.display = 'none';
				this.yl = null;
			}
		}, f: ja
	};
	gb.b = true;
	gb.prototype = {
		Aj: function (a) {
			this.Jj = a;
			this.An.textContent = a ? 'Yes' : 'No';
		}, f: gb
	};
	fb.b = true;
	fb.prototype = {f: fb};
	eb.b = true;
	eb.prototype = {
		Lg: function () {
			this.hi.disabled = this.jb == null;
			this.bk.disabled = this.jb == null || this.jb.Lm == null;
			this.rk.disabled = this.jb == null;
		}, Sk: function (a, b, c) {
			var d = this;
			var e = window.document.createElement('div');
			e.textContent = a;
			e.className = 'elem';
			if (c != null)
				e.classList.add('custom');
			var f = {
				Ja: e, Pd: b, Lm: c
			};
			e.onclick = () => {
				if (d.jb != null)
					d.jb.Ja.classList.remove('selected');
				d.jb = f;
				e.classList.add('selected');
				d.Lg();
			};
			e.ondblclick = () => {
				d.jb = f;
				d.Lg();
				return d.hi.onclick();
			};
			return e;
		}, ki: function (a) {
			for (var b = this, c = h.Kh(), d = 0; c.length > d;) {
				var e = [c[d]];
				++d;
				e = this.Sk(e[0].w, (a => () => Promise.resolve(a[0]))(e), null);
				a.appendChild(e);
			}
			Z.getAll().then(c => {
				for (var d = 0; c.length > d;) {
					var e = c[d];
					++d;
					var f = [e.id];
					var e = b.Sk(e.name, (a => () => Z.get(a[0]))(f), (a => () => Z['delete'](a[0]))(f));
					a.appendChild(e);
				}
				b.vg.update();
			});
		}, f: eb
	};
	Qb.b = true;
	Qb.prototype = {
		tn: function (a) {
			if (a < 0) {
				a = 150;
				this.c.fillStyle = '#c13535';
			}
			else
				this.c.fillStyle = 'green';
			var b = this.Vi;
			var c = this.yk;
			var d = this.Ah++;
			if (b <= this.Ah)
				this.Ah = 0;
			this.fq[d] = a;
			this.c.clearRect(d, 0, 1, c);
			a = a * c / this.vp;
			this.c.fillRect(d, c - a, 1, a);
			this.Eh.clearRect(0, 0, b, c);
			this.Eh.drawImage(this.sa, b - d - 1, 0);
			this.Eh.drawImage(this.sa, -d - 1, 0);
		}, f: Qb
	};
	db.b = true;
	db.prototype = {
		C: function (a, b) {
			var c = a.na(this.Nb);
			if (c == null)
				A.i(this.qb);
			else {
				this.Nr(c);
				this.Hf.disabled = !b || this.Nb == 0;
				this.Qe.disabled = !b || this.Nb == 0;
			}
		}, Nr: function (a) {
			if (a.w != this.fe)
				this.Ej(a.w);
			if (a.cb != this.ql)
				this.Dj(a.cb);
		}, Ej: function (a) {
			this.fe = a;
			this.Ze.textContent = a;
		}, Dj: function (a) {
			this.ql = a;
			this.Hf.textContent = a ? 'Remove Admin' : 'Give Admin';
		}, f: db
	};
	cb.b = true;
	cb.prototype = {
		C: function (a, b) {
			this.g.draggable = b;
			if (a.yb != this.yb) {
				this.yb = a.yb;
				this.rg.textContent = '' + this.yb;
			}
			if (a.cb != this.un)
				this.em(a.cb);
		}, em: function (a) {
			this.un = a;
			this.g.className = 'player-list-item' + (a ? ' admin' : '');
		}, f: cb
	};
	za.b = true;
	za.prototype = {
		C: function (a, b, c, d) {
			var e = this;
			this.Vh.disabled = b || c;
			this.vi.disabled = c;
			b = new Set;
			c = this.xd.keys();
			for (var f = c.next(); !f.done;) {
				var g = f.value;
				var f = c.next();
				b.add(g);
			}
			for (c = 0; a.length > c; c++) {
				f = a[c];
				g = this.xd.get(f.V);
				if (g == null) {
					g = new cb(f);
					g.ff = a => y.i(e.ff, a);
					this.xd.set(f.V, g);
					this.ab.appendChild(g.g);
				}
				g.C(f, d);
				b['delete'](f.V);
			}
			d = b.values();
			for (b = d.next(); !b.done;) {
				c = b.value;
				b = d.next();
				this.xd.get(c).g.remove();
				this.xd['delete'](c);
			}
			d = 0;
			for (b = a.length - 1; b > d; d++) {
				f = d;
				c = this.xd.get(a[f].V).g;
				f = this.xd.get(a[f + 1].V).g;
				if (f != c.nextSibling)
					this.ab.insertBefore(c, f);
			}
		}, f: za
	};
	Q.b = true;
	Q.prototype = {f: Q};
	ha.b = true;
	ha.Wk = a => {
		a = a / 1000 | 0;
		return (a / 60 | 0) + ':' + J.Af(K.ye(a % 60));
	};
	ha.prototype = {
		C: function () {
			this.Er.textContent = ha.Wk(this.ti.Qb);
			this.Aq.style.width = 100 * this.ti.Go() + '%';
			if (this.Wf && this.ti.Fd <= 0) {
				this.Wf = false;
				this.Up();
			}
		}, f: ha
	};
	bb.b = true;
	bb.prototype = {
		nr: function (a) {
			if (a != this.gk) {
				this.gk = a;
				this.Zf.value = a;
			}
		}, f: bb
	};
	ab.b = true;
	ab.prototype = {f: ab};
	Aa.b = true;
	Aa.As = a => Promise.race([new Promise((a, c) => window.setTimeout(() => c(null), 5000)), a]);
	Aa.prototype = {
		Om: function () {
			function a() {
				b.pj.disabled = false;
				b.bn(c);
			}

			var b = this;
			this.en(null);
			this.pj.disabled = true;
			v.Cf(this.gj);
			var c = [];
			this.dj = [];
			Aa.As(va.get().then(a => c = a, () => ({}))).then(a, a);
		}, bn: function (a) {
			var b = this;
			this.dj = a;
			va.Hs(this.gs, a);
			a.sort((a, b) => a.Le - b.Le);
			v.Cf(this.gj);
			for (var c = 0, d = 0, e = !this.fs.Ta, f = !this.zs.Ta, g = 0; a.length > g;) {
				var h = [a[g]];
				++g;
				var l = h[0].vd;
				if (!(e && l.Xe <= l.I || f && l.Ib)) {
					var m = [new ab(h[0])];
					m[0].Ja.ondblclick = (a => () => y.i(b.Ym, a[0]))(h);
					m[0].Ja.onclick = (a => () => b.en(a[0]))(m);
					this.gj.appendChild(m[0].Ja);
					c += l.I;
					++d;
				}
			}
			this.cs.textContent = '' + c + ' players in ' + d + ' rooms';
			this.Bs.update();
		}, en: function (a) {
			if (this.Od != null)
				this.Od.Ja.classList.remove('selected');
			this.Od = a;
			if (this.Od != null)
				this.Od.Ja.classList.add('selected');
			this.Tm.disabled = this.Od == null;
		}, f: Aa
	};
	$a.b = true;
	$a.prototype = {
		Il: function () {
			var a = this;
			M.tk(n.Ee + 'api/notice').then(b => {
				var c = b.content;
				if (c != null && c != '' && c != $a.On) {
					a.$n.innerHTML = c;
					a.Xk.hidden = false;
					a.nd.onclick = () => {
						$a.On = c;
						return a.Xk.hidden = true;
					};
				}
			});
		}, f: $a
	};
	Za.b = true;
	Za.prototype = {
		Dc: function () {
			var a = this.Cb.value;
			return a.length <= 30 ? a.length > 0 : false;
		}, C: function () {
			this.af.disabled = !this.Dc();
		}, f: Za
	};
	Ya.b = true;
	Ya.prototype = {
		Th: function (a, b, c, d) {
			var e = this;
			v.xe(a, b.g);
			b.mg = (a, b) => ia.i(e.mg, a, b);
			b.ee = a => y.i(e.ee, a);
			b.Kp = a => ia.i(e.mg, d, a);
			b.ff = a => y.i(e.ff, a);
		}, Tk: a => {
			for (var b = [], c = 0; a > c; c++) {
				var d = c;
				b.push(d == null ? 'null' : '' + d);
			}
			return b;
		}, Uk: (a, b) => {
			for (var c = 0; b.length > c; c++) {
				var d = b[c];
				var e = window.document.createElement('option');
				e.textContent = d;
				a.appendChild(e);
			}
		}, rr: function (a) {
			this.Fl.classList.toggle('active', a);
		}, C: function (a, b) {
			if (a.jc != this.Uq) {
				this.Uq = a.jc;
				this.jc.textContent = a.jc;
			}
			var c = b == null ? false : b.cb;
			if (c != this.fk) {
				this.g.className = 'room-view' + (c ? ' admin' : '');
				this.fk = c;
			}
			var d = !c || a.K != null;
			this.wf.disabled = d;
			this.qf.disabled = d;
			this.sm.disabled = d;
			d = a.K != null;
			this.tm.hidden = d;
			this.vm.hidden = !d;
			this.gi.hidden = !d;
			this.wf.selectedIndex = a.Da;
			this.qf.selectedIndex = a.ib;
			this.rm.textContent = a.S.w;
			this.rm.classList.toggle('custom', !a.S.Pe());
			var e = a.Pc;
			this.Hl.C(a.I.filter(a => p.fa == a.ea), e, d, c);
			this.Lj.C(a.I.filter(a => p.xa == a.ea), e, d, c);
			this.qm.C(a.I.filter(a => p.Ia == a.ea), e, d, c);
			this.Rl.disabled = d;
			if (a.Pc != this.Xh)
				this.Bj(a.Pc);
			if (d) {
				c = a.K.Oa == 120;
				if (c != this.ll)
					this.Cj(c);
			}
		}, Bj: function (a) {
			this.Xh = a;
			this.Nk.innerHTML = this.Xh ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
		}, Cj: function (a) {
			this.ll = a;
			this.gi.innerHTML = '<i class=\'icon-pause\'></i>' + (this.ll ? 'Resume (P)' : 'Pause (P)');
		}, f: Ya
	};
	aa.b = true;
	aa.prototype = {f: aa};
	P.b = true;
	P.prototype = {f: P};
	Xa.b = true;
	Xa.prototype = {
		qr: function (a) {
			this.rg.textContent = a == null ? 'null' : '' + a;
		}, or: function (a) {
			this.wp.textContent = '' + a;
		}, hm: function (a) {
			this.wo.textContent = a == null ? 'null' : '' + a;
		}, f: Xa
	};
	Wa.b = true;
	Wa.prototype = {f: Wa};
	q.b = true;
	q.ma = Error;
	q.prototype = C(Error.prototype, {f: q});
	r.b = true;
	r.Nm = a => {
		if (a instanceof Array && a.eb == null)
			return Array;
		var b = a.f;
		if (b != null)
			return b;
		a = r.wj(a);
		return a != null ? r.rn(a) : null;
	};
	r.Be = (a, b) => {
		if (a == null)
			return 'null';
		if (b.length >= 5)
			return '<...>';
		var c = typeof a;
		if (c == 'function' && (a.b || a.Gf))
			c = 'object';
		switch (c) {
			case 'function':
				return '<function>';
			case 'object':
				if (a.eb) {
					var d = Ab[a.eb];
					var c = d.nh[a.nb];
					var e = d[c];
					if (e.Ae) {
						b += '\t';
						for (var c = c + '(', d = [], f = 0, e = e.Ae; e.length > f;) {
							var g = e[f];
							++f;
							d.push(r.Be(a[g], b));
						}
						return c + d.join(',') + ')';
					}
					return c;
				}
				if (a instanceof Array) {
					c = a.length;
					d = '[';
					b += '\t';
					for (f = 0; c > f; f++) {
						e = f;
						d += (e > 0 ? ',' : '') + r.Be(a[e], b);
					}
					return d + ']';
				}
				try {
					d = a.toString;
				}
				catch (k) {
					return '???';
				}
				if (d != null && d != Object.toString && typeof d == 'function' && (c = a.toString(), c != '[object Object]'))
					return c;
				c = null;
				d = '{\n';
				b += '\t';
				f = a.hasOwnProperty != null;
				for (c in a) {
					if ((!f || a.hasOwnProperty(c)) && c != 'prototype' && c != '__class__' && c != '__super__' && c != '__interfaces__' && c != '__properties__') {
						if (d.length != 2)
							d += ', \n';
						d += b + c + ' : ' + r.Be(a[c], b);
					}
				}
				b = b.substring(1);
				return d + ('\n' + b + '}');
			case 'string':
				return a;
			default:
				return String(a);
		}
	};
	r.ph = (a, b) => {
		if (a == null)
			return false;
		if (b == a)
			return true;
		var c = a.Rd;
		if (c != null) {
			for (var d = 0, e = c.length; e > d; d++) {
				var f = c[d];
				if (b == f || r.ph(f, b))
					return true;
			}
		}
		return r.ph(a.ma, b);
	};
	r.pn = (a, b) => {
		if (b == null)
			return false;
		switch (b) {
			case Array:
				return a instanceof Array ? a.eb == null : false;
			case oc:
				return typeof a == 'boolean';
			case sc:
				return true;
			case z:
				return typeof a == 'number';
			case Pb:
				return typeof a == 'number' ? a === (a | 0) : false;
			case String:
				return typeof a == 'string';
			default:
				if (a != null) if (typeof b == 'function') {
					if (a instanceof b || r.ph(r.Nm(a), b))
						return true;
				}
				else {
					if (typeof b == 'object' && r.qn(b) && a instanceof b)
						return true;
				}
				else
					return false;
				return tc == b && a.b != null || uc == b && a.Gf != null ? true : b == Ab[a.eb];
		}
	};
	r.G = (a, b) => {
		if (r.pn(a, b))
			return a;
		throw new q('Cannot cast ' + K.ye(a) + ' to ' + K.ye(b));
	};
	r.wj = a => {
		a = r.sn.call(a).slice(8, -1);
		return a == 'Object' || a == 'Function' || a == 'Math' || a == 'JSON' ? null : a;
	};
	r.qn = a => r.wj(a) != null;
	r.rn = a => qc[a];
	hc.b = true;
	hc.Is = function (a, b) {
		var c = new Uint8Array(this, a, b == null ? null : b - a);
		var d = new Uint8Array(c.byteLength);
		d.set(c);
		return d.buffer;
	};
	var rc = 0;
	if (String.fromCodePoint == null) {
		String.fromCodePoint = a => a < 65536 ? String.fromCharCode(a) : String.fromCharCode((a >> 10) + 55232) + String.fromCharCode((a & 1023) + 56320);
	}
	String.prototype.f = String;
	String.b = true;
	Array.b = true;
	Date.prototype.f = Date;
	Date.b = 'Date';
	var Pb = {};
	var sc = {};
	var z = Number;
	var oc = Boolean;
	var tc = {};
	var uc = {};
	p.Ia = new p(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
	p.fa = new p(1, 15035990, -1, 8, 'Red', 't-red', 0, 2);
	p.xa = new p(2, 5671397, 1, 16, 'Blue', 't-blue', 0, 4);
	p.Ia.pg = p.Ia;
	p.fa.pg = p.xa;
	p.xa.pg = p.fa;
	Object.defineProperty(q.prototype, 'message', {
		get: function () {
			return String(this.Ta);
		}
	});
	if (ArrayBuffer.prototype.slice == null)
		ArrayBuffer.prototype.slice = hc.Is;
	Va.Yn = {mandatory: {OfferToReceiveAudio: false, OfferToReceiveVideo: false}};
	I.qh = {name: 'ECDSA', namedCurve: 'P-256'};
	I.mm = {name: 'ECDSA', hash: {name: 'SHA-256'}};
	Ba.Uo = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
	m.Qm = new Map;
	m.yf = 0;
	Ua.za = m.Fa({Ba: false, Aa: false});
	ya.zc = 0;
	Zb.Km = [{name: 'ro', reliable: true, kj: true}, {name: 'ru', reliable: true, kj: false}, {name: 'uu', reliable: false, kj: false}];
	M.vj = 'application/x-www-form-urlencoded';
	Ha.ab = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
	n.Vr = 'wss://p2p.haxball.com/';
	n.Ee = 'https://www.haxball.com/rs/';
	n.Vf = [{urls: 'stun:stun.l.google.com:19302'}];
	n.A = new Yb;
	O.Yk = (() => {
		for (var a = [], b = 0; b < 256; b++)
			a.push(new H(0, 0));
		return a;
	})(this);
	O.dk = (() => {
		for (var a = [], b = 0; b < 256; b++)
			a.push(0);
		return a;
	})(this);
	h.Fr = w.ha(1024);
	ta.za = m.Fa({Ba: false, Aa: false});
	rb.za = m.Fa({Ba: false, Aa: false, oj: {$i: 10, uj: 900}});
	Qa.za = m.Fa({Ba: false, Aa: false});
	da.za = m.Fa({Ba: false, Aa: false});
	sa.za = m.Fa({Ba: false, Aa: false});
	ra.za = m.Fa({Ba: false, Aa: false});
	S.za = m.Fa({Ba: false, Aa: false});
	qa.za = m.Fa({Ba: false, Aa: false, oj: {$i: 10, uj: 2000}});
	Pa.za = m.Fa({Ba: false, Aa: false});
	pa.za = m.Fa({Ba: false, Aa: false});
	oa.za = m.Fa({Ba: false, Aa: false});
	qb.za = m.Fa({Ba: false, Aa: false});
	Oa.za = m.Fa({});
	Na.za = m.Fa({Ba: false, Aa: false, oj: {$i: 10, uj: 900}});
	Ga.za = m.Fa({});
	na.za = m.Fa({Ba: false, Aa: false});
	Y.za = m.Fa({Ba: false, Aa: false});
	pb.za = m.Fa({Ba: false, Aa: false});
	ob.za = m.Fa({Ba: false, Aa: false});
	ma.za = m.Fa({Ba: false, Aa: false});
	Ma.za = m.Fa({Ba: false, Aa: false});
	La.za = m.Fa({Ba: false, Aa: false});
	la.za = m.Fa({Ba: false, Aa: false});
	E.mn = .17435839227423353;
	E.ln = 5.934119456780721;
	R.jn = new Ib([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
	R.kn = new Ib([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
	mb.N = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
	Da.N = '<div class=\'chatbox-view\'><div data-hook=\'log\' class=\'log\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /><button data-hook=\'send\'>Send</button></div></div>';
	kb.N = '<div class=\'choose-nickname-view\'><img src="images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
	jb.N = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
	ib.N = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
	Ka.N = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
	hb.N = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
	ja.N = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'top-section\' data-hook=\'gameplay-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'buttons\'><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i>Settings</button></div></div><div data-hook=\'popups\'></div></div>';
	gb.N = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
	fb.N = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
	eb.N = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
	db.N = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
	cb.N = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
	za.N = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list\' data-hook=\'list\'></div></div>';
	ha.N = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
	bb.N = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
	ab.tj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
	Aa.tj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
	Za.N = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
	Ya.N = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
	aa.N = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div></div></div></div>';
	aa.$l = 0;
	P.N = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
	Xa.N = '<div class=\'stats-view\'><p>Ping: <span data-hook=\'ping\'></span></p><p>Max Ping: <span data-hook=\'max-ping\'></span></p><p>Fps: <span data-hook=\'fps\'></span></p><div data-hook=\'graph\'></div></div>';
	Wa.N = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="images/opera-icon.png"/>Opera</a></div></div></div>';
	r.sn = {}.toString;
	u.qp();
})(typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : this);
