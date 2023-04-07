(function (qc) {
	window.parent.g = {};

	const Constants = {
		minH: 0,
		maxH: 5000,
		minE: -1000,
		maxE: 1000
	};

	function Mhc() {
	}

	function ObjectCastUtil() {
	}

	function GlobalError(a) {
		this.Ta = a;
		if (Error.captureStackTrace)
			Error.captureStackTrace(this, GlobalError);
	}

	function UnsupportedBrowserView(a) {
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(UnsupportedBrowserView.htmlContents);
		ViewUtil.getDataHookMap(this.g).get('features').textContent = a.join(', ');
	}

	function StatsView() {
		this.nl = new PingGraph;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(StatsView.htmlContents);
		var a = ViewUtil.getDataHookMap(this.g);
		this.rg = a.get('ping');
		this.wp = a.get('max-ping');
		this.wo = a.get('fps');
		ViewUtil.replaceParentsChild(a.get('graph'), this.nl.g);
	}

	function SimpleDialogView(a, b, c) {
		var d = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(SimpleDialogView.htmlContents);
		var e = ViewUtil.getDataHookMap(this.g);
		e.get('ok');
		e.get('cancel');
		this.Vd = e.get('content');
		for (var f = e.get('title'), e = e.get('buttons'), g = 0, k = 0; k < c.length;) {
			var l = c[k++];
			var t = window.document.createElement('button');
			t.textContent = l;
			t.onclick = (a => () => Yyy.i(d.Va, a[0]))([g++]);
			e.appendChild(t);
		}
		this.Vd.textContent = b;
		f.textContent = a;
	}

	function SettingsView(a) {
		let tArr = [];

		function settingsBFun(a) {
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
				if (StringOps3.startsWith(e[0], 'Key'))
					g = StringOpsSubstr.substr(e[0], 3, null);
				f[0].textContent = g;
				b.appendChild(f[0]);
				g = window.document.createElement('i');
				g.className = 'icon-cancel';
				g.onclick = ((a, b) => () => {
					p.Jq(b[0]);
					ConnectionConstants.localStorageWrapperInst.playerKeysStorageUnit.setLSItem(p);
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
						ConnectionConstants.localStorageWrapperInst.playerKeysStorageUnit.setLSItem(p);
						r();
					}
				};
			};
			return b;
		}

		function settingsFlagFun(a, b, c) {
			a = dataHookMap.get(a);
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

		function settingsDFun(lsKey, lsUnit, cFun, dFun) {
			var e = dataHookMap.get(lsKey);
			e.selectedIndex = dFun(lsUnit.getLSUValue());
			e.onchange = () => {
				var a = cFun(e.selectedIndex);
				lsUnit.setLSItem(a);
			};
		}

		function settingsOkCancelFun(tKey, lsUnit, cFun) {
			function d(a) {
				e.classList.toggle('icon-ok', a);
				e.classList.toggle('icon-cancel', !a);
			}

			tKey = dataHookMap.get(tKey);
			tKey.classList.add('toggle');
			var e = window.document.createElement('i');
			e.classList.add('icon-ok');
			tKey.insertBefore(e, tKey.firstChild);
			tKey.onclick = () => {
				var a = !lsUnit.getLSUValue();
				lsUnit.setLSItem(a);
				d(a);
				if (cFun != null)
					cFun(a);
			};
			d(lsUnit.getLSUValue());
		}

		function settingsBtnSecFun(a) {
			const b = {Jm: dataHookMap.get(a + 'btn'), bh: dataHookMap.get(a + 'sec')};
			tArr.push(b);
			b.Jm.onclick = () => settingsSelectedFun(b);
		}

		function settingsSelectedFun(a) {
			for (var b = 0, c = 0; tArr.length > c; b++, c++) {
				var d = tArr[c];
				var e = a == d;
				if (e)
					SettingsView.$l = b;
				d.bh.classList.toggle('selected', e);
				d.Jm.classList.toggle('selected', e);
			}
		}

		if (a == null)
			a = false;
		const selfSettingsView = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(SettingsView.htmlContents);
		var dataHookMap = ViewUtil.getDataHookMap(this.g);
		this.closeBtnField = dataHookMap.get('close');
		settingsBtnSecFun('sound');
		settingsBtnSecFun('video');
		settingsBtnSecFun('misc');
		settingsBtnSecFun('input');
		settingsSelectedFun(tArr[SettingsView.$l]);
		settingsOkCancelFun('tsound-main', ConnectionConstants.localStorageWrapperInst.soundMainStorageUnit, a => ConnectionConstants.audioUtilInst.im(a ? 1 : 0));
		settingsOkCancelFun('tsound-chat', ConnectionConstants.localStorageWrapperInst.soundChatStorageUnit);
		settingsOkCancelFun('tsound-highlight', ConnectionConstants.localStorageWrapperInst.soundHighlightStorageUnit);
		settingsOkCancelFun('tsound-crowd', ConnectionConstants.localStorageWrapperInst.soundCrowdStorageUnit);
		settingsDFun('viewmode', ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit, a => a - 1, a => a + 1);
		settingsDFun('fps', ConnectionConstants.localStorageWrapperInst.fpsLimitStorageUnit, a => a, a => a);
		var h = [1, 0.75, 0.5, 0.25];
		settingsDFun('resscale', ConnectionConstants.localStorageWrapperInst.resolutionScaleStorageUnit, a => h[a], a => {
			for (var b = 0, c = h.length - 1; c > b && !(a >= h[b]);) {
				++b;
			}
			return b;
		});
		settingsOkCancelFun('tvideo-teamcol', ConnectionConstants.localStorageWrapperInst.teamColorsStorageUnit);
		settingsOkCancelFun('tvideo-showindicators', ConnectionConstants.localStorageWrapperInst.showIndicatorsStorageUnit);
		settingsOkCancelFun('tvideo-showavatars', ConnectionConstants.localStorageWrapperInst.showAvatarsStorageUnit);
		var m = () => {
			var b = ConnectionConstants.localStorageWrapperInst.Ne.getLSUValue();
			settingsFlagFun('loc', 'Detected location', ConnectionConstants.localStorageWrapperInst.Me.getLSUValue());
			settingsFlagFun('loc-ovr', 'Location override', b);
			var d = dataHookMap.get('loc-ovr-btn');
			d.disabled = !a;
			if (b == null) {
				d.textContent = 'Override location';
				d.onclick = () => Daa.i(selfSettingsView.Ep);
			}
			else {
				d.textContent = 'Remove override';
				d.onclick = () => {
					ConnectionConstants.localStorageWrapperInst.Ne.setLSItem(null);
					m();
				};
			}
		};
		m();
		var p = ConnectionConstants.localStorageWrapperInst.playerKeysStorageUnit.getLSUValue();
		var q = dataHookMap.get('presskey');
		var r;
		var u = dataHookMap.get('inputsec');
		r = () => {
			ViewUtil.removeFirstChildren(u);
			var a = settingsBFun('Up');
			u.appendChild(a);
			a = settingsBFun('Down');
			u.appendChild(a);
			a = settingsBFun('Left');
			u.appendChild(a);
			a = settingsBFun('Right');
			u.appendChild(a);
			a = settingsBFun('Kick');
			u.appendChild(a);
		};
		r();
		this.closeBtnField.onclick = () => Daa.i(selfSettingsView.qb);
	}

	function RoomMenuView(a) {
		this.fk = false;
		this.qm = new PlayerListView(Team.spec);
		this.Lj = new PlayerListView(Team.blue);
		this.Hl = new PlayerListView(Team.red);
		var b = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(RoomMenuView.htmlContents);
		var c = ViewUtil.getDataHookMap(this.g);
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
		this.sm.onclick = () => Daa.i(b.Xp);
		this.Th(c.get('red-list'), this.Hl, Team.red, a);
		this.Th(c.get('blue-list'), this.Lj, Team.blue, a);
		this.Th(c.get('spec-list'), this.qm, Team.spec, a);
		this.Uk(this.wf, this.Tk(15));
		this.Uk(this.qf, this.Tk(15));
		this.wf.onchange = () => Yyy.i(b.aq, b.wf.selectedIndex);
		this.qf.onchange = () => Yyy.i(b.Tp, b.qf.selectedIndex);
		this.tm.onclick = () => Daa.i(b.Yp);
		this.vm.onclick = () => Daa.i(b.Zp);
		this.gi.onclick = () => Daa.i(b.Mp);
		this.xn.onclick = () => Daa.i(b.Dp);
		this.Nk.onclick = () => Yyy.i(b.$p, !b.Xh);
		this.Rl.onclick = () => {
			if (b.ee != null) {
				b.ee(Team.blue);
				b.ee(Team.red);
			}
		};
		this.Fl.onclick = () => Daa.i(b.Qp);
		d.onclick = () => Daa.i(b.Wp);
		e.onclick = () => Daa.i(b.de);
		f.onclick = () => Daa.i(b.Pp);
		this.Bj(false);
		this.Cj(false);
	}

	function PasswordView() {
		var a = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(PasswordView.htmlContents);
		var b = ViewUtil.getDataHookMap(this.g);
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

	function Notice(a) {
		this.Xk = a.get('notice');
		this.$n = a.get('notice-contents');
		this.closeBtnField = a.get('notice-close');
		this.Il();
	}

	function RoomListView(a) {
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
		this.Ja = ViewUtil.getFirstElemChildFromHtmlContents(RoomListView.tj);
		var d = ViewUtil.getDataHookMap(this.Ja);
		var e = new Notice(d);
		this.pj = d.get('refresh');
		this.Tm = d.get('join');
		a = d.get('create');
		this.cs = d.get('count');
		a.onclick = () => Daa.i(c.ws);
		d.get('changenick').onclick = () => Daa.i(c.vs);
		d.get('settings').onclick = () => Daa.i(c.ys);
		var f = d.get('replayfile');
		f.onchange = () => {
			var a = f.files;
			if (a.length >= 1) {
				var a = a.item(0);
				var b = new FileReader;
				b.onload = () => Yyy.i(c.xs, b.result);
				b.readAsArrayBuffer(a);
			}
		};
		this.fs = b('fil-full', true);
		this.zs = b('fil-pass', false);
		this.ns = d.get('listscroll');
		this.Bs = Dba.cg(this.ns);
		this.gj = d.get('list');
		this.pj.onclick = () => {
			e.Il();
			c.Om();
		};
		this.Tm.onclick = () => {
			if (c.Od != null)
				Yyy.i(c.Ym, c.Od.Fs);
		};
		this.Om();
	}

	function RoomListHeader(a) {
		this.Ja = ViewUtil.getFirstElemChildFromHtmlContents(RoomListHeader.tj, 'tbody');
		var b = ViewUtil.getDataHookMap(this.Ja);
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

	function RoomLinkView() {
		this.gk = null;
		var a = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(RoomLinkView.htmlContents);
		var b = ViewUtil.getDataHookMap(this.g);
		this.Zf = b.get('link');
		var c = b.get('copy');
		var b = b.get('close');
		this.Zf.onfocus = () => a.Zf.select();
		c.onclick = () => {
			a.Zf.select();
			return window.document.execCommand('Copy');
		};
		b.onclick = () => Daa.i(a.qb);
	}

	function ReplayControlsView(a) {
		function b() {
			var b = g[f];
			a.pl = e ? b : 0;
			d.get('spd').textContent = b + 'x';
		}

		this.Wf = false;
		var c = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(ReplayControlsView.htmlContents);
		var d = ViewUtil.getDataHookMap(this.g);
		this.ti = a;
		d.get('reset').onclick = () => {
			a.ui();
			c.el();
		};
		var e = true;
		var f = 2;
		var g = [.5, 0.75, 1, 2, 3];
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
			t.textContent = ReplayControlsView.Wk(a.mf * a.mh * b);
			return t.style.left = 'calc(' + 100 * b + '% - 30px)';
		};
		this.fp = d.get('leave');
		this.fp.onclick = () => Daa.i(c.de);
	}

	function CaptchaDialogView(a) {
		var b = this;
		var c = new SimpleDialogView('Only humans', '', []);
		this.g = c.g;
		c.Vd.style.minHeight = '78px';
		Dja.gp().then(d => {
			if (CaptchaDialogView.xg == null) {
				CaptchaDialogView.xg = window.document.createElement('div');
				c.Vd.appendChild(CaptchaDialogView.xg);
				CaptchaDialogView.Dq = d.render(CaptchaDialogView.xg, {
					sitekey: a, callback: a => Yyy.i(CaptchaDialogView.Gl, a), theme: 'dark'
				});
			}
			d.reset(CaptchaDialogView.Dq);
			CaptchaDialogView.Gl = a => {
				window.setTimeout(() => Yyy.i(b.Va, a), 1000);
				CaptchaDialogView.Gl = null;
			};
			c.Vd.appendChild(CaptchaDialogView.xg);
		});
	}

	function PlayerListView(a) {
		this.xd = new Map;
		var b = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(PlayerListView.htmlContents);
		this.g.className += ' ' + a.io;
		var c = ViewUtil.getDataHookMap(this.g);
		this.ab = c.get('list');
		this.Vh = c.get('join-btn');
		this.vi = c.get('reset-btn');
		if (Team.spec == a)
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
				c = StringOpsInt.parseInt(c);
				if (c != null)
					Mia.i(b.mg, c, a);
			}
		};
		this.Vh.onclick = () => Yyy.i(b.Kp, a);
		this.vi.onclick = () => Yyy.i(b.ee, a);
	}

	function PlayerListItem(a) {
		var b = this;
		this.w = a.w;
		this.yb = a.yb;
		this.$ = a.V;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(PlayerListItem.htmlContents);
		var c = ViewUtil.getDataHookMap(this.g);
		this.Ze = c.get('name');
		this.rg = c.get('ping');
		try {
			c.get('flag').classList.add('f-' + a.Kd);
		}
		catch (d) {
		}
		this.Ze.textContent = this.w;
		this.rg.textContent = '' + this.yb;
		this.g.ondragstart = a => a.dataTransfer.setData('player', StringOpsInt.ye(b.$));
		this.g.oncontextmenu = a => {
			a.preventDefault();
			Yyy.i(b.ff, b.$);
		};
		this.em(a.cb);
	}

	function PlayerMenuView(a, b) {
		var c = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(PlayerMenuView.htmlContents);
		var d = ViewUtil.getDataHookMap(this.g);
		this.Ze = d.get('name');
		this.Hf = d.get('admin');
		this.Qe = d.get('kick');
		this.closeBtnField = d.get('close');
		this.Hf.onclick = () => Mia.i(c.Cp, c.Nb, !c.ql);
		this.Qe.onclick = () => Yyy.i(c.ei, c.Nb);
		this.closeBtnField.onclick = () => Daa.i(c.qb);
		this.Nb = a.V;
		this.Ej(a.w);
		this.Dj(a.cb);
		this.Hf.disabled = !b || this.Nb == 0;
		this.Qe.disabled = !b || this.Nb == 0;
	}

	function PingGraph() {
		this.Ah = 0;
		this.vp = 400;
		this.yk = 64;
		this.Vi = 32;
		this.pingCanvasField1 = window.document.createElement('canvas');
		this.pingCanvasField2 = window.document.createElement('canvas');
		this.g = window.document.createElement('div');
		this.pingCanvasField1.width = this.Vi;
		this.pingCanvasField2.width = this.Vi;
		this.pingCanvasField1.height = this.yk;
		this.pingCanvasField2.height = this.yk;
		this.Eh = this.pingCanvasField2.getContext('2d', null);
		this.c = this.pingCanvasField1.getContext('2d', null);
		this.c.fillStyle = 'green';
		for (var a = [], b = 0, c = this.Vi; c > b; b++) {
			a.push(0);
		}
		this.fq = a;
		this.g.appendChild(this.pingCanvasField2);
		this.g.className = 'graph';
	}

	function PickStadiumView() {
		this.jb = null;
		var a = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(PickStadiumView.htmlContents);
		var b = ViewUtil.getDataHookMap(this.g);
		b.get('cancel').onclick = () => Daa.i(a.ci);
		this.hi = b.get('pick');
		this.bk = b.get('delete');
		this.rk = b.get('export');
		var c = b.get('list');
		var d = b.get('file');
		this.Lg();
		this.hi.onclick = () => a.jb != null && a.jb.Pd().then(b => Yyy.i(a.og, b));
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
		this.rk.onclick = () => a.jb != null && a.jb.Pd().then(a => Dca.br(a.se(), a.w + '.hbs'));
		this.ki(c);
		this.vg = Dba.cg(c);
		window.setTimeout(() => a.vg.update(), 0);
		d.onchange = () => {
			var b = d.files;
			if (b.length >= 1) {
				var b = b.item(0);
				var c = new FileReader;
				c.onload = () => {
					try {
						var b = new Stadium;
						b.Lk(c.result);
						Yyy.i(a.og, b);
					}
					catch (k) {
						if (k instanceof GlobalError) {
							b = k.Ta;
							if (b instanceof SyntaxError)
								Yyy.i(a.fi, 'SyntaxError in line: ' + StringOpsInt.ye(b.lineNumber));
							else {
								if (b instanceof Dbb)
									Yyy.i(a.fi, b.xp);
								else
									Yyy.i(a.fi, 'Error loading stadium file.');
							}
						}
						else {
							b = k;
							if (b instanceof SyntaxError)
								Yyy.i(a.fi, 'SyntaxError in line: ' + StringOpsInt.ye(b.lineNumber));
							else {
								if (b instanceof Dbb)
									Yyy.i(a.fi, b.xp);
								else
									Yyy.i(a.fi, 'Error loading stadium file.');
							}
						}
					}
				};
				c.readAsText(b);
			}
		};
	}

	function LeaveRoomView() {
		var a = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(LeaveRoomView.htmlContents);
		var b = ViewUtil.getDataHookMap(this.g);
		b.get('cancel').onclick = () => Yyy.i(a.qb, false);
		b.get('leave').onclick = () => Yyy.i(a.qb, true);
	}

	function KickPlayerView(a) {
		var b = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(KickPlayerView.htmlContents);
		var c = ViewUtil.getDataHookMap(this.g);
		this.Ze = c.get('title');
		this.oi = c.get('reason');
		this.yn = c.get('ban-btn');
		this.An = c.get('ban-text');
		this.Qe = c.get('kick');
		this.closeBtnField = c.get('close');
		this.yn.onclick = () => b.Aj(!b.Jj);
		this.closeBtnField.onclick = () => Daa.i(b.qb);
		this.Qe.onclick = () => Dcb.i(b.ei, b.Nb, b.oi.value, b.Jj);
		this.oi.onkeydown = a => a.stopPropagation();
		this.oi.maxLength = 100;
		this.Nb = a.V;
		this.Ze.textContent = 'Kick ' + a.w;
		this.Aj(false);
	}

	function GameView(a) {
		this.gameStateViewInstField = new GameStateView;
		this.Gd = false;
		this.statsViewInstField = new StatsView;
		this.chatboxViewInstField = new ChatboxView;
		const selfGameView = this;
		this.roomMenuViewInstField = new RoomMenuView(a);
		this.gameStateViewInstField.Nb = a;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(GameView.htmlContents);
		const dataHookMap = ViewUtil.getDataHookMap(this.g);
		this.Jh = dataHookMap.get('gameplay-section');
		this.hf = dataHookMap.get('popups');
		this.hf.style.display = 'none';
		ViewUtil.replaceParentsChild(dataHookMap.get('chatbox'), this.chatboxViewInstField.g);
		ViewUtil.replaceParentsChild(dataHookMap.get('stats'), this.statsViewInstField.g);
		this.bi = dataHookMap.get('menu');
		this.bi.onclick = () => {
			selfGameView.me(!selfGameView.Gd);
			selfGameView.bi.blur();
		};
		dataHookMap.get('settings').onclick = () => {
			var a = new SettingsView;
			a.qb = () => selfGameView.bb(null);
			selfGameView.bb(a.g);
		};
		this.Jh.appendChild(this.gameStateViewInstField.g);
		this.roomMenuViewInstField.de = () => {
			var a = new LeaveRoomView;
			a.qb = a => {
				selfGameView.bb(null);
				if (a)
					Daa.i(selfGameView.de);
			};
			selfGameView.bb(a.g);
		};
		this.roomMenuViewInstField.Xp = () => {
			var a = new PickStadiumView;
			a.ci = () => selfGameView.bb(null);
			a.og = a => {
				Yyy.i(selfGameView.og, a);
				selfGameView.bb(null);
			};
			a.fi = a => {
				a = new SimpleDialogView('Error loading stadium', a, ['Ok']);
				a.Va = () => selfGameView.bb(null);
				selfGameView.bb(a.g);
			};
			selfGameView.bb(a.g);
		};
	}

	function GameTimerView() {
		this.Da = 0;
		this.ik = false;
		this.hk = false;
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

	function GameStateView() {
		this.Nb = -1;
		this.Eb = new MajorCanvas;
		this.xc = new GameTimerView;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(GameStateView.htmlContents);
		var a = ViewUtil.getDataHookMap(this.g);
		this.Pb = new ScoreUtil(a.get('red-score'), 0);
		this.Kb = new ScoreUtil(a.get('blue-score'), 0);
		ViewUtil.replaceParentsChild(a.get('timer'), this.xc.g);
		ViewUtil.replaceParentsChild(a.get('canvas'), this.Eb.canvasElemField);
	}

	function DisconnectedView(a, b) {
		var c = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(DisconnectedView.htmlContents);
		var d = ViewUtil.getDataHookMap(this.g);
		this.Bp = d.get('ok');
		this.Bp.onclick = () => Daa.i(c.Va);
		this.Nl = d.get('replay');
		var e = b != null;
		this.Nl.hidden = !e;
		if (e) {
			this.Nl.onclick = () => ConnBa.Yl(b);
		}
		d.get('reason').textContent = a;
	}

	function CreateRoomView(a) {
		var b = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(CreateRoomView.htmlContents);
		var c = ViewUtil.getDataHookMap(this.g);
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
		this.vh.onclick = () => Daa.i(b.ci);
		this.Wj.onclick = () => {
			if (b.Dc()) {
				var a = b.kl.value;
				if (a == '')
					a = null;
				Yyy.i(b.Jp, {name: b.$e.value, password: a, qs: b.ai.selectedIndex + 2, Ks: b.Fm});
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

	function ConnectingView() {
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(ConnectingView.htmlContents);
		var a = ViewUtil.getDataHookMap(this.g);
		this.logNodeField = a.get('log');
		this.vh = a.get('cancel');
	}

	function ChooseNicknameView(a) {
		function confirmNick() {
			if (c.Dc() && c.cl != null)
				c.cl(c.Cb.value);
		}

		var c = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(ChooseNicknameView.htmlContents);
		var d = ViewUtil.getDataHookMap(this.g);
		this.Cb = d.get('input');
		this.af = d.get('ok');
		this.Cb.maxLength = 25;
		this.Cb.value = a;
		this.Cb.oninput = () => c.C();
		this.Cb.onkeydown = a => {
			if (a.keyCode == 13)
				confirmNick();
		};
		this.af.onclick = confirmNick;
		this.C();
	}

	function Mention(a, b) {
		this.Hj = [];
		this.Iq = /[#@][^\s@#]*$/;
		this.Mb = a;
		this.Rp = b;
		a.hidden = true;
	}

	function ChatboxView() {
		const selfChatBoxView = this;

		function handleSend() {
			if (selfChatBoxView.flSendChat != null && selfChatBoxView.chatInputField.value != '')
				selfChatBoxView.flSendChat(selfChatBoxView.chatInputField.value);
			selfChatBoxView.chatInputField.value = '';
			selfChatBoxView.chatInputField.blur();
		}

		this.g = ViewUtil.getFirstElemChildFromHtmlContents(ChatboxView.htmlContents);
		const dataHookMap = ViewUtil.getDataHookMap(this.g);
		this.logNodeField = dataHookMap.get('log');
		this.vg = Dba.cg(this.logNodeField);
		this.chatInputField = dataHookMap.get('input');
		this.chatInputField.maxLength = 140;
		dataHookMap.get('send').onclick = handleSend;
		this.Bc = new Mention(dataHookMap.get('autocompletebox'), (a, c) => {
			selfChatBoxView.chatInputField.value = a;
			selfChatBoxView.chatInputField.setSelectionRange(c, c);
		});
		this.chatInputField.onkeydown = c => {
			switch (c.keyCode) {
				case 9: // Tab
					if (!selfChatBoxView.Bc.Mb.hidden) {
						selfChatBoxView.Bc.qo();
						c.preventDefault();
					}
					break;
				case 13: // Enter
					handleSend();
					break;
				case 27: // Esc
					if (selfChatBoxView.Bc.Mb.hidden) {
						selfChatBoxView.chatInputField.value = '';
						selfChatBoxView.chatInputField.blur();
					}
					else
						selfChatBoxView.Bc.Qh();
					break;
				case 38: // up
					selfChatBoxView.Bc.Qj(-1);
					break;
				case 40: // down
					selfChatBoxView.Bc.Qj(1);
			}
			c.stopPropagation();
		};
		this.chatInputField.onfocus = () => {
			if (selfChatBoxView.igShowChatIndicator != null)
				selfChatBoxView.igShowChatIndicator(true);
		};
		this.chatInputField.onblur = () => {
			if (selfChatBoxView.igShowChatIndicator != null)
				selfChatBoxView.igShowChatIndicator(false);
			selfChatBoxView.Bc.Qh();
		};
		this.chatInputField.oninput = () => selfChatBoxView.Bc.Hn(selfChatBoxView.chatInputField.value, selfChatBoxView.chatInputField.selectionStart);
	}

	function ChangeLocationView() {
		this.rf = null;
		var a = this;
		this.g = ViewUtil.getFirstElemChildFromHtmlContents(ChangeLocationView.htmlContents);
		var b = ViewUtil.getDataHookMap(this.g);
		b.get('cancel').onclick = () => Daa.i(a.qb);
		this.wh = b.get('change');
		this.wh.disabled = true;
		this.wh.onclick = () => {
			if (a.rf != null)
				a.Zl(a.rf.index);
		};
		b = b.get('list');
		this.ki(b);
		var c = Dba.cg(b);
		window.setTimeout(() => c.update(), 0);
	}

	function PlayerBallCanvas() {
		this.Xf = false;
		this.w = '';
		this.uh = 0;
		this.Jf = '';
		this.kb = new TeamColors;
		var a = window.document.createElement('canvas');
		a.width = 64;
		a.height = 64;
		this.rb = a.getContext('2d', null);
		this.Ij = this.rb.createPattern(this.rb.canvas, 'no-repeat');
		this.fo();
	}

	function BigTextUtil() {
		this.xc = 0;
		this.ab = [];
		this.Ar = new BigAnimatedText(['Time is', 'Up!'], 16777215);
		this.Gq = new BigAnimatedText(['Red is', 'Victorious!'], 15035990);
		this.Fq = new BigAnimatedText(['Red', 'Scores!'], 15035990);
		this.Cn = new BigAnimatedText(['Blue is', 'Victorious!'], 625603);
		this.Bn = new BigAnimatedText(['Blue', 'Scores!'], 625603);
		this.eq = new BigAnimatedText(['Game', 'Paused'], 16777215);
	}

	function BigAnimatedText(a, b) {
		for (var c = [], d = 0; a.length > d; d++)
			c.push(this.sp(a[d], b));
		this.We = c;
	}

	function MajorCanvas() {
		this.$cPerf = window.performance.now();
		this.jgMap = new Map;
		this.ddMap = new Map;
		this.zg = 1;
		this.xf = 35;
		this.jf = 0;
		this.kf = 1.5;
		this.yaPoint = new Point(0, 0);
		this.Dk = false;
		this.td = new BigTextUtil;
		this.canvasElemField = window.document.createElement('canvas');
		this.canvasElemField.mozOpaque = true;
		this.c = this.canvasElemField.getContext('2d', {alpha: false});
		this.Lo = this.c.createPattern(ConnectionConstants.grassImage, null);
		this.Wn = this.c.createPattern(ConnectionConstants.concreteImage, null);
		this.Un = this.c.createPattern(ConnectionConstants.concrete2Image, null);
	}

	function Vertex() {
		this.ud = 0;
		this.v = 32;
		this.h = 63;
		this.m = 1;
		this.a = new Point(0, 0);
	}

	function Segment() {
		this.wa = null;
		this.Ig = null;
		this.Hg = null;
		this.Yj = 0;
		this.Xd = null;
		this.W = null;
		this.ca = null;
		this.Cc = 0;
		this.m = 1;
		this.h = 63;
		this.v = 32;
		this.vb = Infinity;
		this.Za = true;
		this.R = 0;
	}

	function Plane() {
		this.v = 32;
		this.h = 63;
		this.m = 1;
		this.Ua = 0;
		this.wa = new Point(0, 0);
	}

	function DynamicObjectsUtil() {
		this.hc = -1;
		this.gc = null;
		this.F = [];
	}

	function Joint() {
		this.R = 0;
		this.ne = Infinity;
		this.Hb = this.ec = 100;
		this.Yd = this.Zd = 0;
	}

	function DynamicDisc() {
		this.hc = -1;
		this.gc = null;
		this.jl = 0;
		this.h = this.v = 63;
		this.Mj = 0;
		this.R = 16777215;
		this.Ca = 0.99;
		this.aa = 1;
		this.m = 0.5;
		this.Z = 10;
		this.oa = new Point(0, 0);
		this.D = new Point(0, 0);
		this.a = new Point(0, 0);
	}

	function Mla() {
		this.da = 0;
	}

	function Dla() {
		this.da = 0;
	}

	function Dma() {
		this.da = 0;
	}

	function Mma() {
		this.da = 0;
	}

	function Mob() {
		this.da = 0;
	}

	function Mpb() {
		this.da = 0;
	}

	function Dyy() {
		this.Qg = false;
		this.da = 0;
	}

	function Mkc() {
	}

	function Mna() {
		this.da = 0;
	}

	function Dga() {
		this.da = 0;
	}

	function Dna() {
		this.da = 0;
	}

	function Doa() {
		this.da = 0;
	}

	function Mqb() {
		this.da = 0;
	}

	function Moa() {
		this.da = 0;
	}

	function Mpa() {
		this.da = 0;
	}

	function TeamColorsUtil() {
		this.da = 0;
	}

	function Mqa() {
		this.da = 0;
	}

	function Dss() {
		this.da = 0;
	}

	function Mra() {
		this.da = 0;
	}

	function Msa() {
		this.da = 0;
	}

	function Mda() {
		this.da = 0;
	}

	function Dqa() {
		this.da = 0;
	}

	function Mrb() {
		this.da = 0;
	}

	function Mta() {
		this.da = 0;
	}

	function FullPlayer() {
		this.zc = -1;
		this.an = null;
		this.ea = Team.spec;
		this.H = null;
		this.Sc = 0;
		this.yc = 0;
		this.Wb = false;
		this.V = 0;
		this.ob = 0;
		this.w = 'Player';
		this.yb = 0;
		this.Ug = 0;
		this.Kd = null;
		this.Ld = false;
		this.Jd = null;
		this.Xb = null;
		this.Jb = 0;
		this.cb = false;
	}

	function Room() {
		this.hc = -1;
		this.gc = null;
		this.S = null;
		this.yd = 2;
		this.Zc = 0;
		this.ce = 1;
		this.Da = 3;
		this.ib = 3;
		this.Pc = false;
		this.K = null;
		this.I = [];
		this.jc = '';
		this.S = Stadium.Kh()[0];
		this.kb = [null, new TeamColors, new TeamColors];
		this.kb[1].fb.push(Team.red.R);
		this.kb[2].fb.push(Team.blue.R);
	}

	function Team(a, b, c, d, e, f, g, k) {
		this.enemyTeam = null;
		this.$ = a;
		this.R = b;
		this.Ch = c;
		this.cp = d;
		this.w = e;
		this.io = f;
		this.v = k;
		this.wm = new TeamColors;
		this.wm.fb.push(b);
	}

	function TeamColors() {
		this.ed = 16777215;
		this.fb = [];
	}

	function Stadium() {
		this.J = [];
		this.U = [];
		this.qa = [];
		this.tc = [];
		this.F = [];
		this.pb = [];
		this.Dd = [];
		this.md = [];
		this.ge = new PlayerPhysics;
		this.Bh = 255;
		this.Ye = 0;
		this.Ge = 0;
		this.Lf = true;
		this.pf = false;
	}

	function Dbb(a) {
		this.xp = a;
	}

	function PlayerPhysics() {
		this.Se = 0;
		this.Z = 15;
		this.v = 0;
		this.oa = new Point(0, 0);
		this.m = 0.5;
		this.aa = 0.5;
		this.Ca = 0.96;
		this.Ce = 0.1;
		this.Te = 0.07;
		this.Ue = 0.96;
		this.Re = 5;
	}

	function Goal() {
		this.qe = Team.spec;
		this.ca = new Point(0, 0);
		this.W = new Point(0, 0);
	}

	function Game() {
		this.hc = -1;
		this.gc = null;
		this.OaFramesField = 0;
		this.Hc = 0;
		this.Kb = 0;
		this.Pb = 0;
		this.ae = Team.red;
		this.Bb = 0;
		this.vc = 0;
		this.ta = new DynamicObjectsUtil;
		this.Da = 0;
		this.ib = 5;
		this.S = null;
	}

	function Disc() {
		this.v = 63;
		this.h = 63;
		this.R = 16777215;
		this.Ca = 0.99;
		this.aa = 1;
		this.m = 0.5;
		this.Z = 10;
		this.oa = new Point(0, 0);
		this.D = new Point(0, 0);
		this.a = new Point(0, 0);
	}

	function AudioTb(a, b) {
		this.gh = null;
		this.Js = 0.025;
		this.Ef = 0;
		this.dh = 0;
		this.ve = 0;
		this.Tg = b.createGain();
		this.Tg.gain.value = 0;
		var c = b.createBufferSource();
		c.buffer = a;
		c.connect(this.Tg);
		c.loop = true;
		c.start();
	}

	function AudioUtil(a) {
		function b(b) {
			return new Promise((resolve, reject) => {
				var e = a.file(b).asArrayBuffer();
				return c.c.decodeAudioData(e, resolve, reject);
			});
		}

		var c = this;
		this.c = new AudioContext;
		this.ag = this.c.createGain();
		this.im(ConnectionConstants.localStorageWrapperInst.soundMainStorageUnit.getLSUValue() ? 1 : 0);
		this.ag.connect(this.c.destination);
		this.ro = Promise.all([
			b('sounds/chat.ogg').then(a => c.chatSoundField = a),
			b('sounds/highlight.wav').then(a => c.highlightSoundField = a),
			b('sounds/kick.ogg').then(a => c.kickSoundField = a),
			b('sounds/goal.ogg').then(a => c.goalSoundField = a),
			b('sounds/join.ogg').then(a => c.joinSoundField = a),
			b('sounds/leave.ogg').then(a => c.leaveSoundField = a),
			b('sounds/crowd.ogg').then(a => {
				c.crowdSoundField = a;
				c.Xj = new AudioTb(c.crowdSoundField, c.c);
				c.Xj.connect(c.ag);
			})
		]);
	}

	function Dzz() {
	}

	function RoomListOps() {
	}

	function Dfb() {
	}

	function ReplayUtil(a) {
		this.$cPerf = window.performance.now();
		this.De = 0;
		this.sd = 0;
		var b = this;
		this.ya = a;
		this.j = new GameView(a.uc);
		var c = new ImportantUtil(this.j);
		c.ri(a.T);
		window.document.addEventListener('keydown', createHandlerFromInstance(this, this.handleKeyboardEvent));
		window.document.addEventListener('keyup', createHandlerFromInstance(this, this.Cd));
		window.requestAnimationFrame(createHandlerFromInstance(this, this.bf));
		this.Gh = window.setInterval(() => {
			b.j.statsViewInstField.hm(b.sd);
			b.sd = 0;
		}, 1000);
		this.updateViewport(ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.getLSUValue());
		this.j.g.classList.add('replayer');
		this.je = new ReplayControlsView(a);
		this.je.Vp = () => c.resetRoomEventHandlers(a.T);
		this.je.Up = () => {
			b.j.me(a.T.K == null);
			c.ri(a.T);
		};
		this.je.el = () => b.j.gameStateViewInstField.Eb.Xq();
		this.j.g.appendChild(this.je.g);
	}

	function DisplayUtil() {
	}

	function Muu() {
	}

	function DObj() {
	}

	function ConnectionConstants() {
	}

	function DwwMap() {
		this.Yc = new Map;
	}

	function LocalStorageUnit(lsKey, localStorageInst, processingFun, funD) {
		this.w = lsKey;
		this.lsuFunDField = funD;
		this.localStorageInstField = localStorageInst;
		funD = null;
		if (localStorageInst != null)
			funD = localStorageInst.getItem(lsKey);
		this.lsUnitValue = processingFun(funD);
	}

	function LocalStorageUtil() {
	}

	function LocalStorageWrapper() {
		var localStorage1 = LocalStorageUtil.Pm();

		function buildGeoLSU(key) {
			return new LocalStorageUnit(key, localStorage1, jsonString => {
				if (jsonString == null)
					return null;
				try {
					return GeoLocation.Hh(jsonString);
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

		function buildBinaryLSU(key) {
			return new LocalStorageUnit(key, localStorage1, a => a != null ? a != '0' : true, a => a ? '1' : '0');
		}

		function buildLSUWithDefVal(key, defaultValue) {
			return new LocalStorageUnit(key, localStorage1, a => {
				let defaultValue1 = defaultValue;
				try {
					if (a != null)
						defaultValue1 = StringOpsInt.parseInt(a);
				}
				catch (t) {
				}
				return defaultValue1;
			}, a => '' + a);
		}

		function buildLSUWithDefValAndMaxLen(key, defaultValue, maxLen) {
			return new LocalStorageUnit(key, localStorage1, a => a == null ? defaultValue : StringOpsLimit.Qc(a, maxLen), a => a);
		}

		this.fe = buildLSUWithDefValAndMaxLen('player_name', '', 25);
		this.viewModeStorageUnit = buildLSUWithDefVal('view_mode', 1);
		this.fpsLimitStorageUnit = buildLSUWithDefVal('fps_limit', 0);
		this.avatarStorageUnit = buildLSUWithDefValAndMaxLen('avatar', null, 2);
		buildLSUWithDefValAndMaxLen('rctoken', null, 1024);
		this.teamColorsStorageUnit = buildBinaryLSU('team_colors');
		this.showIndicatorsStorageUnit = buildBinaryLSU('show_indicators');
		this.soundMainStorageUnit = buildBinaryLSU('sound_main');
		this.soundChatStorageUnit = buildBinaryLSU('sound_chat');
		this.soundHighlightStorageUnit = buildBinaryLSU('sound_highlight');
		this.soundCrowdStorageUnit = buildBinaryLSU('sound_crowd');
		this.playerAuthKeyStorageUnit = buildLSUWithDefValAndMaxLen('player_auth_key', null, 1024);
		this.rd = buildLSUWithDefVal('extrapolation', 0);
		this.resolutionScaleStorageUnit = ((key, bNum) => new LocalStorageUnit(key, localStorage1, a => {
			var cNum = bNum;
			try {
				if (a != null)
					cNum = parseFloat(a);
			}
			catch (t) {
			}
			return cNum;
		}, a => '' + a))('resolution_scale', 1);
		this.showAvatarsStorageUnit = buildBinaryLSU('show_avatars');
		this.Me = buildGeoLSU('geo');
		this.Ne = buildGeoLSU('geo_override');
		this.playerKeysStorageUnit = (() => new LocalStorageUnit('player_keys', localStorage1, a => {
			if (a == null)
				return DwwMap.$j();
			try {
				return DwwMap.Hh(a);
			}
			catch (g) {
				return DwwMap.$j();
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

	function GeoLocation() {
		this.ub = '';
		this.Gc = 0;
		this.Ec = 0;
	}

	function Dra() {
		this.Yf = 0;
		this.$d = 0;
		window.document.addEventListener('focusout', createHandlerFromInstance(this, this.al));
	}

	function ImportantUtil(gameViewInst, b) {
		this.Rh = null;
		this.j = gameViewInst;
		if (b != null)
			this.Rh = '@' + StringOps3.replace(b, ' ', '_');
	}

	function ConnBa(majorInst) {
		this.Nf = null;
		this.zh = false;
		this.Ik = false;
		this.$cPerf = window.performance.now();
		this.Ed = null;
		this.De = 0;
		this.Jn = new Mtb(3, 1000);
		this.ob = new Dra;
		this.Bg = 'Waiting for link';
		this.am = false;
		this.xi = false;
		this.sd = 0;
		const selfConnBa = this;
		this.Of = new CommandUtil(majorInst, text => selfConnBa.j.chatboxViewInstField.addNoticeToLogAndHandle(text));
		this.ya = majorInst;
		majorInst.T.ko = c => {
			if (c != selfConnBa.am) {
				selfConnBa.am = c;
				c = Mta.la(c);
				majorInst.ra(c);
			}
		};
		this.j = new GameView(majorInst.uc);
		this.Ih = new ImportantUtil(this.j, majorInst.T.getFullPlayerById(majorInst.uc).w);
		this.Ih.ri(majorInst.T);
		this.j.chatboxViewInstField.flSendChat = createHandlerFromInstance(this, this.Gp);
		this.j.chatboxViewInstField.igShowChatIndicator = createHandlerFromInstance(this, this.Fp);
		window.document.addEventListener('keydown', createHandlerFromInstance(this, this.handleKeyboardEvent));
		window.document.addEventListener('keyup', createHandlerFromInstance(this, this.Cd));
		window.onbeforeunload = () => 'Are you sure you want to leave the room?';
		this.ob.ng = b => majorInst.ra(b);
		this.j.roomMenuViewInstField.aq = b => {
			b = Mda.la(1, b);
			majorInst.ra(b);
		};
		this.j.roomMenuViewInstField.Tp = b => {
			b = Mda.la(0, b);
			majorInst.ra(b);
		};
		this.j.og = b => {
			b = Mqa.la(b);
			majorInst.ra(b);
		};
		this.j.roomMenuViewInstField.Yp = () => majorInst.ra(new Dma);
		this.j.roomMenuViewInstField.Zp = () => majorInst.ra(new Dla);
		this.j.roomMenuViewInstField.Mp = () => selfConnBa.handleGamePause();
		this.j.roomMenuViewInstField.mg = (b, c) => {
			var d = Dss.la(b, c);
			majorInst.ra(d);
		};
		this.j.roomMenuViewInstField.ee = createHandlerFromInstance(this, this.Wq);
		this.j.roomMenuViewInstField.Dp = () => majorInst.ra(new Dqa);
		this.j.roomMenuViewInstField.Pp = () => ConnBa.Bq(majorInst);
		this.j.roomMenuViewInstField.$p = b => {
			b = Mpa.la(b);
			majorInst.ra(b);
		};
		this.j.roomMenuViewInstField.ff = c => {
			var d = majorInst.T.getFullPlayerById(c);
			if (d != null) {
				var e = new PlayerMenuView(d, selfConnBa.xi);
				e.qb = () => selfConnBa.j.bb(null);
				e.Cp = (b, c) => {
					var d = Msa.la(b, c);
					majorInst.ra(d);
				};
				e.ei = () => selfConnBa.vr(d);
				selfConnBa.j.bb(e.g, () => e.C(majorInst.T, selfConnBa.xi));
			}
		};
		this.j.roomMenuViewInstField.Wp = () => {
			var a = new RoomLinkView;
			a.qb = () => selfConnBa.j.bb(null);
			selfConnBa.j.bb(a.g, () => a.nr(selfConnBa.Bg));
		};
		this.j.roomMenuViewInstField.Qp = () => {
			if (selfConnBa.Ed == null)
				selfConnBa.zr();
			else {
				var a = selfConnBa.Ed.stop();
				selfConnBa.Ed = null;
				ConnBa.Yl(a);
			}
			selfConnBa.j.roomMenuViewInstField.rr(selfConnBa.Ed != null);
		};
		window.requestAnimationFrame(createHandlerFromInstance(this, this.bf));
		this.Gh = window.setInterval(() => {
			selfConnBa.j.statsViewInstField.hm(selfConnBa.sd);
			selfConnBa.sd = 0;
		}, 1000);
		this.Qr = window.setInterval(() => majorInst.C(), 50);
		this.updateViewport();
		var c = ConnectionConstants.localStorageWrapperInst.rd.getLSUValue();
		var c = c < Constants.minE ? Constants.minE : c > Constants.maxE ? Constants.maxE : c;
		if (c != 0) {
			var d = ConnectionConstants.localStorageWrapperInst.rd.getLSUValue();
			majorInst.gm(d);
			this.j.chatboxViewInstField.addNoticeToLogAndHandle('Extrapolation set to ' + c + ' msec');
		}

		// Exposing global fields begin
		const theRoom = majorInst.T;

		/**
		 * @param {DynamicDisc} dynDisc
		 * @return {{}}
		 */
		function getDiscObject(dynDisc) {
			return dynDisc == null ? null : {
				x: dynDisc.a.x,
				y: dynDisc.a.y,
				xspeed: dynDisc.D.x,
				yspeed: dynDisc.D.y,
				xgravity: dynDisc.oa.x,
				ygravity: dynDisc.oa.y,
				radius: dynDisc.Z,
				bCoeff: dynDisc.m,
				invMass: dynDisc.aa,
				damping: dynDisc.Ca,
				color: dynDisc.R,
				cMask: dynDisc.h,
				cGroup: dynDisc.v
			};
		}

		function getScoresObject() {
			const currentGame = theRoom.K;
			return currentGame == null ? null : {
				red: currentGame.Pb,
				blue: currentGame.Kb,
				time: currentGame.Hc,
				scoreLimit: currentGame.ib,
				timeLimit: 60 * currentGame.Da,
				state: currentGame.Bb
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
			const playerDisc = fullPlayer.H;
			if (playerDisc != null) {
				pos = {
					x: playerDisc.a.x,
					y: playerDisc.a.y
				};
			}
			return {
				name: fullPlayer.w,
				team: fullPlayer.ea.$,
				id: fullPlayer.V,
				admin: fullPlayer.cb,
				position: pos,
				avatar: fullPlayer.Xb,
				flag: fullPlayer.Kd,
				isBlinking: fullPlayer.Wb,
				//inputKey: fullPlayer.inputKey,
				ping: fullPlayer.yb,
				desynchronized: fullPlayer.Ld
			};
		}

		function getRoomPropertiesObject() {
			return {
				name: theRoom.jc
				//maxPlayers: faMajor1.cap,
				//public: !roomHidden,
				//flag: hostGeo.flagCode,
				//lat: hostGeo.latitude,
				//lon: hostGeo.longitude
			};
		}

		window.parent.g.majorInst = this.ya;

		window.parent.g.sendChat = this.j.chatboxViewInstField.flSendChat;
		window.parent.g.showChatIndicator = this.j.chatboxViewInstField.igShowChatIndicator;
		window.parent.g.setAvatar = text => this.Of.fmSetPlayerAvatar(text);

		window.parent.g.getPlayer = playerId => {
			const fullPlayer = theRoom.getFullPlayerById(playerId);
			return fullPlayer == null ? null : getPlayerObject(fullPlayer);
		};
		window.parent.g.getPlayerList = () => {
			const playerList = [];
			const fullPlayers = theRoom.I;
			for (let i = 0; i < fullPlayers.length; i++)
				playerList.push(getPlayerObject(fullPlayers[i]));
			return playerList;
		};
		window.parent.g.getScores = () => getScoresObject();
		window.parent.g.getBallPosition = () => {
			const currentGame = theRoom.K;
			if (currentGame == null)
				return null;
			const xy = currentGame.ta.F[0].a;
			return {
				x: xy.x,
				y: xy.y
			};
		};
		window.parent.g.getDiscProperties = discIndex => {
			const currentGame = theRoom.K;
			return currentGame == null ? null : getDiscObject(currentGame.ta.F[discIndex]);
		};
		window.parent.g.getPlayerDiscProperties = playerId => {
			if (theRoom.K == null)
				return null;
			const fullPlayer = theRoom.getFullPlayerById(playerId);
			return fullPlayer == null ? null : getDiscObject(fullPlayer.H);
		};
		window.parent.g.getDiscCount = () => {
			const currentGame = theRoom.K;
			return currentGame == null ? 0 : currentGame.ta.F.length;
		};
		window.parent.g.getRoomProperties = () => getRoomPropertiesObject();
		// Assuming that goal posts are symmetric with respect to the origin (that only a sign changes in the coordinates)
		window.parent.g.getGoalPostPoint = () => {
			let goalPostPoint = null;
			const currentGame = theRoom.K;
			if (currentGame != null) {
				const goals = currentGame.S.tc;
				if (goals?.length > 0)
					goalPostPoint = {
						x: Math.abs(goals[0].W.x),
						y: Math.abs(goals[0].W.y)
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

	function Dha() {
	}

	function CommandUtil(majorInst, addParagraphFun) {
		this.ya = majorInst;
		this.ba = addParagraphFun;
	}

	function Dhb() {
	}

	function Mtb(a, b) {
		this.Nj = a;
		this.Si = b;
		this.oc = a;
		this.Ve = window.performance.now();
	}

	function FunM() {
	}

	function Dcb() {
	}

	function Mia() {
	}

	function Yyy() {
	}

	function Daa() {
	}

	function WebserverApiOps() {
	}

	function Point(a, b) {
		this.x = a;
		this.y = b;
	}

	function KeyFramesManager(a) {
		this.Yb = a.slice();
	}

	function HasStreamReader(a, b, c) {
		this.Vk = [];
		this.pl = 5;
		this.Fd = -1;
		this.sk = 0;
		this.Wh = 0;
		this.Qb = 0;
		this.hg = 0;
		VMajor.call(this, b);
		a = new StreamReader(new DataView(a.buffer), false);
		if (a.hb() != 1212305970)
			throw new GlobalError('');
		b = a.hb();
		if (b != c)
			throw new GlobalError(new Dkb(b));
		this.mf = a.hb();
		c = pako.inflateRaw(a.sb());
		this.Lc = new StreamReader(new DataView(c.buffer, c.byteOffset, c.byteLength));
		this.Cq(this.Lc);
		c = this.Lc.sb();
		this.Lc = new StreamReader(new DataView(c.buffer, c.byteOffset, c.byteLength), false);
		this.ui();
		this.Wh = window.performance.now();
		this.uc = -1;
	}

	function Dkb(a) {
		this.Id = a;
	}

	function RoRuUu() {
	}

	function HasMtb(a) {
		this.xj = new Map;
		this.Ho = new Mtb(100, 16);
		this.yg = false;
		this.yb = 0;
		this.pa = a;
		a = StreamWriter.ha(8);
		a.s(Math.random());
		this.He = a.Sb();
	}

	function IceLb(a) {
		this.Kj = new Map;
		this.Ib = null;
		this.fg = 32;
		this.Ie = new Map;
		this.ac = [];
		this.wi = 4;
		this.Mn = 600;
		var b = this;
		VMajor.call(this, a.state);
		this.tp = a.ij;
		this.Sr = a.version;
		this.up = 1;
		this.uc = 0;
		this.Jk = 0;
		this.Li = window.performance.now();
		this.Ic = new IceSa(this.tp, a.iceServers, RoRuUu.Km, a.gn);
		this.Ic.Vj = createHandlerFromInstance(this, this.Oo);
		this.Ic.bl = a => b.Lp(a);
		this.Ic.kg = a => Yyy.i(b.kg, a);
		this.Ic.ef = (a, d) => {
			if (b.ef != null)
				b.ef(a, d);
		};
	}

	function ConnectionUtil(a, b) {
		this.Di = [];
		this.pi = [];
		this.ug = new Dia;
		this.Ap = 1;
		this.zm = 0;
		this.pd = 0;
		this.Qi = new PingUtil(50);
		this.sg = new PingUtil(50);
		this.nn = 1000;
		this.ek = '';
		var c = this;
		VMajor.call(this, b.state);
		this.Uh = b.Ms;
		this.Je = b.ds;
		var d = null;
		var d = e => {
			c.tf(0);
			var f = StreamWriter.ha();
			f.Ub(b.version);
			f.Db(b.password);
			c.pc = new SockWb(b.ij, b.iceServers, a, RoRuUu.Km, f, b.gn);
			c.pc.rh = e;
			c.pc.zd = a => {
				c.pc = null;
				c.pa = a;
				a.lg = a => {
					a = new StreamReader(new DataView(a));
					c.uq(a);
				};
				a.cf = () => {
					if (c.pd != 3)
						Yyy.i(c.df, xb.ih('Connection closed'));
					c.ia();
				};
				a = window.setTimeout(() => {
					Yyy.i(c.df, xb.ih('Game state timeout'));
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
					Daa.i(c.Sp);
					d(true);
				}
				else {
					var b = SockWb.Do(a);
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
					Yyy.i(c.df, a);
					c.ia(b);
				}
			};
		};
		d(b.cn != null && b.cn);
	}

	function VMajor(a) {
		this.Ri = new Dia;
		this.cc = 0;
		this.te = 0;
		this.le = new Dia;
		this.rd = 0;
		this.bc = 0;
		this.uc = 0;
		this.Ac = 0.06;
		this.mh = 16.666666666666668;
		this.Ff = 120;
		YMajor.call(this, a);
	}

	function Mya() {
	}

	function Dta() {
	}

	function Mac(a, b) {
		this.Xm = 0;
		this.version = 1;
		this.ah = 0;
		this.Nd = StreamWriter.ha(1000);
		this.Df = StreamWriter.ha(16384);
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
			Manager.lj(b, c.Df);
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

	function Ping() {
	}

	function PingUtil(a) {
		this.rs = a;
		this.$a = [];
	}

	function Mcc() {
	}

	function Dua() {
		this.da = 0;
	}

	function YMajor(a) {
		this.Y = 0; // frame no
		this.T = a;
	}

	function Dia() {
		this.list = [];
	}

	function Manager() {
		this.da = 0;
	}

	function Mlc() {
	}

	function Mzb() {
	}

	function ViewUtil() {
	}

	function ScoreUtil(a, b) {
		this.Ja = a;
		this.value = b;
		a.textContent = '' + b;
	}

	function Dca() {
	}

	function Mmc() {
	}

	function Dba() {
	}

	function Dja() {
	}

	function Dii() {
	}

	function StreamWriter(a, b) {
		if (b == null)
			b = false;
		this.o = a;
		this.Sa = b;
		this.a = 0;
	}

	function StreamReader(a, b) {
		if (b == null)
			b = false;
		this.o = a;
		this.Sa = b;
		this.a = 0;
	}

	function IceNb(a) {
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

	function Mnc() {
	}

	function IceSa(a, b, c, d) {
		this.th = new Set;
		this.If = new Set;
		this.dm = false;
		this.nf = false;
		this.Ag = false;
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

	function IceVa(a, b, c) {
		this.re = null;
		this.gd = null;
		this.oe = [];
		this.ak = 0;
		this.hl = false;
		this.Uf = [];
		this.Vc = [];
		var d = this;
		this.Ra = new RTCPeerConnection({iceServers: b}, IceVa.mediaConstraints);
		this.Sh = new Promise(resolve => {
			d.Vo = resolve;
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

	function SockWb(a, b, c, d, e, f) {
		this.rh = this.yh = false;
		var g = this;
		this.pa = new IceVa(0, b, d);
		this.pa.bd = () => g.Oe(Ob.jh);
		this.pa.zd = () => {
			if (g.zd != null)
				g.zd(new IceNb(g.pa));
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
			g.X.onmessage = createHandlerFromInstance(g, g.Ph);
			g.X.onopen = () => {
				if (g.gl != null)
					g.gl();
				g.pa.Mi();
				g.Bi(g.jr, g.pa.Uf, e);
				g.pa.jg = createHandlerFromInstance(g, g.yi);
				g.pa.Sh.then(() => g.Nc(0, null));
			};
		};
		this.pa.eo();
	}

	function HashDc() {
		this.hash = 0;
	}

	function StringOpsLimit() {
	}

	function StringOps3() {
	}

	function StringOpsInt() {
	}

	function Mec() {
	}

	function StringOpsSubstr() {
	}

	function RegexUtil(a, b) {
		this.r = new RegExp(a, b.split('u').join(''));
	}

	function CastGa() {
		return ObjectCastUtil.Be(this, '');
	}

	function Extend(a, b) {
		var c = Object.create(a);
		var d;
		for (d in b)
			c[d] = b[d];
		if (Object.prototype.toString !== b.toString)
			c.toString = b.toString;
		return c;
	}

	function createHandlerFromInstance(instance, b) {
		if (b == null)
			return null;
		if (b.oh == null)
			b.oh = rcCounter++;
		var c;
		if (instance.ej == null)
			instance.ej = {};
		else
			c = instance.ej[b.oh];
		if (c == null) {
			c = b.bind(instance);
			instance.ej[b.oh] = c;
		}
		return c;
	}

	var BasnetArr = BasnetArr || {};
	var xFun;
	RegexUtil.b = true;
	RegexUtil.prototype = {
		match: function (a) {
			if (this.r.global)
				this.r.lastIndex = 0;
			this.r.nc = this.r.exec(a);
			this.r.bh = a;
			return this.r.nc != null;
		}, Wm: function (a) {
			if (this.r.nc != null && a >= 0 && this.r.nc.length > a)
				return this.r.nc[a];
			throw new GlobalError('EReg::matched');
		}, ps: function () {
			if (this.r.nc == null)
				throw new GlobalError('No string matched');
			return {mj: this.r.nc.index, ms: this.r.nc[0].length};
		}, os: function (a, b, c) {
			if (c == null)
				c = -1;
			if (this.r.global) {
				this.r.lastIndex = b;
				this.r.nc = this.r.exec(c < 0 ? a : StringOpsSubstr.substr(a, 0, b + c));
				if (b = this.r.nc != null)
					this.r.bh = a;
				return b;
			}
			if (c = this.match(c < 0 ? StringOpsSubstr.substr(a, b, null) : StringOpsSubstr.substr(a, b, c))) {
				this.r.bh = a;
				this.r.nc.index += b;
			}
			return c;
		}, f: RegexUtil
	};
	StringOpsSubstr.b = true;
	StringOpsSubstr.bj = (a, b) => {
		var c = a.charCodeAt(b);
		if (c == c)
			return c;
	};
	StringOpsSubstr.substr = (text, from, length) => {
		if (length == null)
			length = text.length;
		else if (length < 0)
			if (from == 0)
				length = text.length + length;
			else
				return '';
		return text.substr(from, length);
	};
	StringOpsSubstr.remove = (a, b) => {
		var c = a.indexOf(b);
		if (c == -1)
			return false;
		a.splice(c, 1);
		return true;
	};
	Math.b = true;
	Mec.b = true;
	Mec.Mm = a => {
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
	StringOpsInt.b = true;
	StringOpsInt.ye = a => ObjectCastUtil.Be(a, '');
	StringOpsInt.parseInt = a => {
		a = parseInt(a, !a || a[0] != '0' || a[1] != 'x' && a[1] != 'X' ? 10 : 16);
		return isNaN(a) ? null : a;
	};
	StringOps3.b = true;
	StringOps3.startsWith = (a, b) => b.length <= a.length ? b == StringOpsSubstr.substr(a, 0, b.length) : false;
	StringOps3.ls = (a, b) => {
		var c = StringOpsSubstr.bj(a, b);
		return c > 8 && c < 14 ? true : c == 32;
	};
	StringOps3.Gs = a => {
		for (var b = a.length, c = 0; b > c && StringOps3.ls(a, b - c - 1);)
			++c;
		return c > 0 ? StringOpsSubstr.substr(a, 0, b - c) : a;
	};
	StringOps3.Af = a => {
		var b;
		var c = '';
		for (b = 2 - a.length; b > c.length;)
			c += '0';
		return c + (a == null ? 'null' : '' + a);
	};
	StringOps3.replace = (a, b, c) => a.split(b).join(c);
	StringOps3.Vg = (a, b) => {
		for (var c = ''; c = "0123456789ABCDEF".charAt(a & 15) + c, a >>>= 4, a > 0;) ;
		if (b != null)
			for (; b > c.length;)
				c = '0' + c;
		return c;
	};
	StringOpsLimit.b = true;
	StringOpsLimit.Qc = (a, b) => b >= a.length ? a : StringOpsSubstr.substr(a, 0, b);
	StringOpsLimit.Zr = a => {
		for (var b = '', c = 0, d = a.byteLength; d > c;)
			b += StringOps3.Vg(a[c++], 2);
		return b;
	};
	HashDc.b = true;
	HashDc.prototype = {
		Yr: function (a) {
			for (var b = 0, c = a.length; c > b;) {
				this.hash += a[b++];
				this.hash += this.hash << 10;
				this.hash ^= this.hash >>> 6;
			}
		}, f: HashDc
	};
	var Ob = BasnetArr['bas.basnet.FailReason'] = {
		Gf: true, nh: ['PeerFailed', 'Rejected', 'Cancelled', 'Error'], jh: {nb: 0, eb: 'bas.basnet.FailReason', toString: CastGa}, lh: (xFun = a => ({nb: 1, code: a, eb: 'bas.basnet.FailReason', toString: CastGa}), xFun.Ae = ['code'], xFun), hh: {nb: 2, eb: 'bas.basnet.FailReason', toString: CastGa}, Error: {nb: 3, eb: 'bas.basnet.FailReason', toString: CastGa}
	};
	SockWb.b = true;
	SockWb.Do = a => {
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
	SockWb.prototype = {
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
			a = new StreamReader(new DataView(a.data));
			var b = a.B();
			if (a.o.byteLength - a.a > 0)
				a = new StreamReader(new DataView(pako.inflateRaw(a.sb()).buffer), false);
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
				var c = StreamWriter.ha(32, false);
				c.l(a);
				if (b != null)
					c.Vb(pako.deflateRaw(b.Sb()));
				this.X.send(c.Hd());
			}
		}, Bi: function (a, b, c) {
			var d = StreamWriter.ha(32, false);
			d.l(this.rh ? 1 : 0);
			d.mc(a.sdp);
			d.Ng(b);
			if (c != null)
				d.Vb(c.Sb());
			this.Nc(1, d);
		}, yi: function (a) {
			var b = StreamWriter.ha(32, false);
			b.Ng(a);
			this.Nc(4, b);
		}, f: SockWb
	};
	IceVa.b = true;
	IceVa.prototype = {
		Mi: function (a) {
			if (a == null)
				a = 10000;
			window.clearTimeout(this.re);
			this.re = window.setTimeout(createHandlerFromInstance(this, this.To), a);
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
				return Mlc.Dr(d.Sh, c).then(e, e);
			}).then(a => d.di(a)).catch(() => d.Tf());
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
		}, f: IceVa
	};
	var gc = BasnetArr['bas.basnet.ConnectionRequestResponse'] = {
		Gf: true, nh: ['Accept', 'Reject'], hn: {nb: 0, eb: 'bas.basnet.ConnectionRequestResponse', toString: CastGa}, kh: (xFun = a => ({nb: 1, reason: a, eb: 'bas.basnet.ConnectionRequestResponse', toString: CastGa}), xFun.Ae = ['reason'], xFun)
	};
	IceSa.b = true;
	IceSa.vk = a => {
		try {
			var b = Mnc.gf(a.candidate);
			if (b.Jr == 'srflx')
				return b.Xo;
		}
		catch (c) {
		}
		return null;
	};
	IceSa.prototype = {
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
					throw new GlobalError(null);
				d.ef != null && d.ef(a, a => d.Ji(a));
			}

			function c(a) {
				var b = a.url;
				if (b == null)
					throw new GlobalError(null);
				a = a.token;
				if (a == null)
					throw new GlobalError(null);
				d.X = new WebSocket(b + '?token=' + a);
				d.X.binaryType = 'arraybuffer';
				d.X.onopen = () => d.So();
				d.X.onclose = a => d.Mh(a.code != 4001);
				d.X.onerror = () => d.Mh(true);
				d.X.onmessage = createHandlerFromInstance(d, d.Ph);
			}

			if (a == null)
				a = '';
			var d = this;
			WebserverApiOps.zl(this.xr, 'token=' + this.Dg + '&rcr=' + a, WebserverApiOps.vj).then(a => {
				switch (a.action) {
					case 'connect':
						c(a);
						break;
					case 'recaptcha':
						b(a);
				}
			}).catch(() => d.Mh(true));
		}, So: function () {
			var a = this;
			if (this.Mc != null)
				this.Ai();
			if (this.nf != 0)
				this.cm();
			this.ol = window.setInterval(() => a.zi(), 40000);
		}, Ph: function (a) {
			a = new StreamReader(new DataView(a.data), false);
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
			var c = StringOpsLimit.Zr(a.sb(a.B()));
			var d;
			var e;
			var f;
			try {
				a = new StreamReader(new DataView(pako.inflateRaw(a.sb()).buffer), false);
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
					var t = IceSa.vk(d[l++]);
					if (t != null) {
						if (this.If.has(t)) {
							this.sf(a, 4102);
							return;
						}
						k.push(t);
					}
				}
				if (this.Vj != null && (l = new StreamReader(e.o), l.a = e.a, e = this.Vj(b, l), e.nb == 1)) {
					this.sf(a, e.reason);
					return;
				}
				var h = new IceVa(a, this.Vf, this.In);
				if (f)
					h.ak = 2500;
				h.oe = k;
				h.gd = b;
				this.od.set(a, h);
				h.bd = () => {
					g.Nc(0, h, null);
					g.od.delete(h.$);
				};
				h.zd = () => {
					g.od.delete(h.$);
					g.Nc(0, h, null);
					if (g.bl != null)
						g.bl(new IceNb(h));
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
				a = new StreamReader(new DataView(pako.inflateRaw(a.sb()).buffer), false), c = new RTCIceCandidate(a.wg());
			}
			catch (d) {
				return;
			}
			this.Mo(b, c);
		}, Mo: function (a, b) {
			var c = this.od.get(a);
			if (c != null) {
				var d = IceSa.vk(b);
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
				var d = StreamWriter.ha(32, false);
				d.l(a);
				d.tb(b);
				if (c != null)
					d.Vb(pako.deflateRaw(c.Sb()));
				this.X.send(d.Hd());
			}
		}, sf: function (a, b) {
			var c = StreamWriter.ha(16, false);
			c.l(0);
			c.tb(a);
			c.Ub(b);
			this.X.send(c.Hd());
		}, zi: function () {
			var a = StreamWriter.ha(1, false);
			a.l(8);
			this.X.send(a.Hd());
		}, Ai: function () {
			this.Ag = false;
			var a = StreamWriter.ha(256, false);
			a.l(7);
			if (this.Mc != null)
				a.Mg(this.Mc);
			this.X.send(a.Hd());
		}, cm: function () {
			var a = StreamWriter.ha(2, false);
			a.l(9);
			a.l(this.nf ? 1 : 0);
			this.X.send(a.Hd());
			this.dm = this.nf;
		}, Bi: function (a, b, c, d) {
			var e = StreamWriter.ha(32, false);
			e.mc(b.sdp);
			e.Ng(c);
			if (d != null)
				e.Vb(d.Sb());
			this.Nc(1, a, e);
		}, yi: function (a, b) {
			var c = StreamWriter.ha(32, false);
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
		}, f: IceSa
	};
	Mnc.b = true;
	Mnc.gf = a => {
		a = a.split(' ');
		if (a[6] != 'typ')
			throw new GlobalError(null);
		return {Jr: a[7], Xo: a[4]};
	};
	IceNb.b = true;
	IceNb.prototype = {
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
						window.console.log(e instanceof GlobalError ? e.Ta : e);
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
		}, f: IceNb
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
	StreamReader.b = true;
	StreamReader.jo = (a, b) => {
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
			throw new GlobalError('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
		return {char: c, length: b - l};
	};
	StreamReader.prototype = {
		sb: function (a) {
			if (a == null)
				a = this.o.byteLength - this.a;
			if (this.o.byteLength < this.a + a)
				throw new GlobalError('Read too much');
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
				c = StreamReader.jo(this.o, b);
				b += c.length;
				d += String.fromCodePoint(c.char);
			}
			if (a != b)
				throw new GlobalError('Actual string length differs from the specified: ' + (b - a) + ' bytes');
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
		}, f: StreamReader
	};
	StreamWriter.b = true;
	StreamWriter.ha = (a, b) => {
		if (b == null)
			b = false;
		if (a == null)
			a = 16;
		return new StreamWriter(new DataView(new ArrayBuffer(a)), b);
	};
	StreamWriter.uo = (a, b, c) => {
		var d = c;
		if (a < 0)
			throw new GlobalError('Cannot encode UTF8 character: charCode (' + a + ') is negative');
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
			throw new GlobalError('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
		return c - d;
	};
	StreamWriter.En = a => {
		if (a < 0)
			throw new GlobalError('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
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
		throw new GlobalError('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
	};
	StreamWriter.Kf = a => {
		for (var b = 0, c = a.length, d = 0; c > d; d++)
			b += StreamWriter.En(StringOpsSubstr.bj(a, d));
		return b;
	};
	StreamWriter.Fn = a => {
		a >>>= 0;
		return a < 128 ? 1 : a < 16384 ? 2 : a < 2097152 ? 3 : a < 268435456 ? 4 : 5;
	};
	StreamWriter.prototype = {
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
			return new StreamReader(this.Hd(), this.Sa);
		}, rc: function (a) {
			if (a > this.o.byteLength)
				this.Yq(a <= 2 * this.o.byteLength ? 2 * this.o.byteLength : a);
		}, Yq: function (a) {
			if (a < 1)
				throw new GlobalError('Can\'t resize buffer to a capacity lower than 1');
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
			this.lb(StreamWriter.Kf(a));
			this.Og(a);
		}, Db: function (a) {
			if (a == null)
				this.lb(0);
			else {
				this.lb(StreamWriter.Kf(a) + 1);
				this.Og(a);
			}
		}, Im: function (a) {
			var b = StreamWriter.Kf(a);
			if (b > 255)
				throw new GlobalError(null);
			this.l(b);
			this.Og(a);
		}, Ng: function (a) {
			this.mc(JSON.stringify(a));
		}, Og: function (a) {
			var b = this.a;
			this.rc(b + StreamWriter.Kf(a));
			for (var c = a.length, d = 0; c > d; d++)
				b += StreamWriter.uo(StringOpsSubstr.bj(a, d), this.o, b);
			this.a = b;
		}, lb: function (a) {
			var b = this.a;
			a >>>= 0;
			this.rc(b + StreamWriter.Fn(a));
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
		}, f: StreamWriter
	};
	Dii.b = true;
	Dii.yo = () => {
		try {
			return window.crypto.subtle.generateKey(Dii.ecKeyGenParams, true, ['sign', 'verify']).then(a => {
				var b = a.privateKey;
				return window.crypto.subtle.exportKey('jwk', b).then(a => {
					var c = a.y;
					var e = a.d;
					var f = new Dii;
					f.Yi = a.x;
					f.Zi = c;
					f.Zj = e;
					f.Al = b;
					return f;
				});
			});
		}
		catch (a) {
			return Promise.reject(a instanceof GlobalError ? a.Ta : a);
		}
	};
	Dii.xo = a => {
		a = a.split('.');
		if (a.length != 4 || a[0] != 'idkey')
			return Promise.reject('Invalid id format');
		var b = a[1];
		var c = a[2];
		var d = a[3];
		return Dii.Xr(b, c, d).then(a => {
			var e = new Dii;
			e.Yi = b;
			e.Zi = c;
			e.Zj = d;
			e.Al = a;
			return e;
		});
	};
	Dii.Rr = (a, b) => {
		try {
			var c = new StreamReader(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
			c.B();
			var d = c.sb(c.Ob());
			var e = c.sb();
			var f = new StreamReader(new DataView(d.buffer, d.byteOffset, d.byteLength), false);
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
			return Dii.Wr(g, k).then(a => window.crypto.subtle.verify(Dii.ecdsaParams, a, e, d)).then(a => {
				if (!a)
					throw new GlobalError(null);
				return g;
			});
		}
		catch (jc) {
			return Promise.reject(jc instanceof GlobalError ? jc.Ta : jc);
		}
	};
	Dii.Xr = (a, b, c) => {
		try {
			return window.crypto.subtle.importKey('jwk', {crv: 'P-256', ext: true, key_ops: ['sign'], kty: 'EC', d: c, x: a, y: b}, Dii.ecKeyGenParams, true, ['sign']);
		}
		catch (d) {
			return Promise.reject(d instanceof GlobalError ? d.Ta : d);
		}
	};
	Dii.Wr = (a, b) => {
		try {
			return window.crypto.subtle.importKey('jwk', {crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: a, y: b}, Dii.ecKeyGenParams, true, ['verify']);
		}
		catch (c) {
			return Promise.reject(c instanceof GlobalError ? c.Ta : c);
		}
	};
	Dii.prototype = {
		Ir: function () {
			return 'idkey.' + this.Yi + '.' + this.Zi + '.' + this.Zj;
		}, wr: function (a) {
			try {
				var b = StreamWriter.ha(1024);
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
				return window.crypto.subtle.sign(Dii.ecdsaParams, this.Al, f).then(a => {
					b.Mg(a);
					return b.Sb();
				});
			}
			catch (g) {
				return Promise.reject(g instanceof GlobalError ? g.Ta : g);
			}
		}, f: Dii
	};
	Dja.b = true;
	Dja.gp = () => {
		if (Dja.li != null)
			return Dja.li;
		Dja.li = new Promise((resolve, reject) => {
			var c = window.grecaptcha;
			if (c != null)
				resolve(c);
			else {
				c = window.document.createElement('script');
				c.src = 'https://www.google.com/recaptcha/api.js?onload=___recaptchaload&render=explicit';
				window.document.head.appendChild(c);
				window.___recaptchaload = () => resolve(window.grecaptcha);
				c.onerror = () => reject(null);
			}
		});
		return Dja.li;
	};
	Dba.b = true;
	Dba.cg = a => new PerfectScrollbar(a, {handlers: Dba.scrollHandlers});
	Mmc.b = true;
	Mmc.ts = () => {
		var a = window;
		a.RTCPeerConnection = a.webkitRTCPeerConnection || a.mozRTCPeerConnection || a.RTCPeerConnection;
		a.RTCIceCandidate = a.webkitRTCIceCandidate || a.mozRTCIceCandidate || a.RTCIceCandidate;
		a.RTCSessionDescription = a.webkitRTCSessionDescription || a.mozRTCSessionDescription || a.RTCSessionDescription;
		var b = new RTCPeerConnection({iceServers: []});
		try {
			b.createAnswer().catch(() => {
			});
		}
		catch (e) {
			var a = a.RTCPeerConnection.prototype;
			var c = a.createOffer;
			var d = a.createAnswer;
			a.createOffer = function (a) {
				var b = this;
				return new Promise((resolve, reject) => c.call(b, resolve, reject, a));
			};
			a.createAnswer = function (a) {
				var b = this;
				return new Promise((resolve, reject) => d.call(b, resolve, reject, a));
			};
		}
	};
	Dca.b = true;
	Dca.ar = (a, b) => Dca.Xl(new Blob([a], {type: 'octet/stream'}), b);
	Dca.br = (a, b) => Dca.Xl(new Blob([a], {type: 'text/plain'}), b);
	Dca.Xl = (a, b) => {
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
	ScoreUtil.b = true;
	ScoreUtil.prototype = {
		set: function (a) {
			if (a != this.value) {
				this.value = a;
				this.Ja.textContent = '' + this.value;
			}
		}, f: ScoreUtil
	};
	ViewUtil.b = true;
	ViewUtil.getDataHookMap = element => {
		const dataHookMap = new Map;
		const dataHooks = element.querySelectorAll('[data-hook]');
		for (let c = 0; c < dataHooks.length; c++) {
			const dataHook = dataHooks[c];
			dataHookMap.set(dataHook.getAttribute('data-hook'), dataHook);
		}
		return dataHookMap;
	};
	ViewUtil.getFirstElemChildFromHtmlContents = (htmlContents, baseHtmlTag = 'div') => {
		const element = window.document.createElement(baseHtmlTag);
		element.innerHTML = htmlContents;
		return element.firstElementChild;
	};
	ViewUtil.replaceParentsChild = (a, b) => a.parentElement.replaceChild(b, a);
	ViewUtil.removeFirstChildren = element => {
		let firstChild = element.firstChild;
		while (firstChild != null) {
			element.removeChild(firstChild);
			firstChild = element.firstChild;
		}
	};
	Mzb.b = true;
	Mzb.eh = a => new Promise((resolve, reject) => {
		a.onsuccess = () => resolve(a.result);
		a.onerror = reject;
	});
	Mlc.b = true;
	Mlc.Dr = (a, b) => new Promise((resolve, reject) => {
		var e = window.setTimeout(() => reject('Timed out'), b);
		a.then(a => {
			window.clearTimeout(e);
			resolve(a);
		}).catch(a => {
			window.clearTimeout(e);
			reject(a);
		});
	});
	Manager.b = true;
	Manager.Fa = a => {
		if (a.Aa == null)
			a.Aa = true;
		if (a.Ba == null)
			a.Ba = true;
		return a;
	};
	Manager.Ha = a => {
		a.on = Manager.yf;
		if (a.configProp == null)
			throw new GlobalError('Class doesn\'t have a config');
		a.prototype.zf = a.configProp;
		Manager.yfMap.set(Manager.yf, a);
		Manager.yf++;
	};
	Manager.lj = (a, b) => {
		var c = (a == null ? null : ObjectCastUtil.Nm(a)).on;
		if (c == null)
			throw new GlobalError('Tried to pack unregistered action');
		b.l(c);
		a.ua(b);
	};
	Manager.fh = a => {
		var b = a.B();
		var b = Object.create(Manager.yfMap.get(b).prototype);
		b.da = 0;
		b.mb = 0;
		b.va(a);
		return b;
	};
	Manager.prototype = {
		$m: () => true, apply: () => {
			throw new GlobalError('missing implementation');
		}, va: () => {
			throw new GlobalError('missing implementation');
		}, ua: () => {
			throw new GlobalError('missing implementation');
		}, f: Manager
	};
	Dia.b = true;
	Dia.ss = (a, b, c) => {
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
	Dia.prototype = {
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
			Dia.ss(a.list, b.list, this.list);
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
		}, f: Dia
	};
	YMajor.b = true;
	YMajor.prototype = {f: YMajor};
	Dua.b = true;
	Dua.ma = Manager;
	Dua.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			a.Sn(this.Rg);
		}, ua: function (a) {
			a.lb(this.Rg.byteLength);
			a.Mg(this.Rg);
		}, va: function (a) {
			this.Rg = a.Cl(a.Ab());
		}, f: Dua
	});
	Mcc.b = true;
	Mcc.prototype = {f: Mcc};
	PingUtil.b = true;
	PingUtil.prototype = {
		add: function (a) {
			for (var b = this.$a.length, c = 0, d = this.Qd = 0; b > d;) {
				var e = d++;
				var f = this.$a[e];
				f.index++;
				f.weight *= 0.97;
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
				b = new Ping;
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
		}, f: PingUtil
	};
	Ping.b = true;
	Ping.prototype = {f: Ping};
	Mac.b = true;
	Mac.prototype = {
		stop: function () {
			this.hj.fc = null;
			this.hj.T.km(null);
			this.Nd.o.setUint16(0, this.Xm, this.Nd.Sa);
			this.Nd.Vb(this.Df.Sb());
			var a = pako.deflateRaw(this.Nd.Sb());
			var b = StreamWriter.ha(a.byteLength + 32);
			b.Og('HBR2');
			b.tb(this.version);
			b.tb(this.hj.Y - this.ah);
			b.Vb(a);
			return b.Sb();
		}, f: Mac
	};
	Dta.b = true;
	Mya.b = true;
	VMajor.b = true;
	VMajor.ma = YMajor;
	VMajor.prototype = Extend(YMajor.prototype, {
		ra: () => {
			throw new GlobalError('missing implementation');
		}, Sf: () => {
			throw new GlobalError('missing implementation');
		}, C: () => {
			throw new GlobalError('missing implementation');
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
			Mya.zc++;
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
		}, f: VMajor
	});
	var xb = BasnetArr['bas.marf.net.ConnFailReason'] = {
		Gf: true, nh: ['Cancelled', 'PeerFailed', 'Rejected', 'Other'], hh: {nb: 0, eb: 'bas.marf.net.ConnFailReason', toString: CastGa}, jh: {nb: 1, eb: 'bas.marf.net.ConnFailReason', toString: CastGa}, lh: (xFun = a => ({nb: 2, reason: a, eb: 'bas.marf.net.ConnFailReason', toString: CastGa}), xFun.Ae = ['reason'], xFun), ih: (xFun = a => ({
			nb: 3, description: a, eb: 'bas.marf.net.ConnFailReason', toString: CastGa
		}), xFun.Ae = ['description'], xFun)
	};
	ConnectionUtil.b = true;
	ConnectionUtil.xh = a => {
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
	ConnectionUtil.ma = VMajor;
	ConnectionUtil.prototype = Extend(VMajor.prototype, {
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
			c.catch(() => null).then(a => b.ir(a));
		}, qq: function (a) {
			a = pako.inflateRaw(a.sb());
			a = new StreamReader(new DataView(a.buffer, a.byteOffset, a.byteLength));
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
			var b = StreamWriter.ha();
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
			a = Manager.fh(a);
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
			a = Manager.fh(a);
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
					Yyy.i(this.dl, -1);
				else
					Yyy.i(this.dl, c);
				++b;
			}
			this.Di.splice(0, b);
		}, zi: function () {
			var a = window.performance.now();
			this.zm = a;
			this.Di.push(a);
			var b = this.sg.$g(.5) | 0;
			var c = StreamWriter.ha();
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
				var d = StreamWriter.ha();
				d.l(1);
				d.tb(c);
				d.tb(b);
				Manager.lj(a, d);
				this.Rb(d);
				if (a.zf.Ba) {
					a.ue = b;
					a.P = this.uc;
					a.mb = c;
					this.ug.Rm(a);
				}
			}
		}, f: ConnectionUtil
	});
	IceLb.b = true;
	IceLb.ma = VMajor;
	IceLb.prototype = Extend(VMajor.prototype, {
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
				a = StreamWriter.ha();
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
					throw new GlobalError(null);
			}
			catch (d) {
				return gc.kh(4103);
			}
			try {
				var c = b.zb();
				if (this.Ib != null && this.Ib != c)
					throw new GlobalError(null);
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
				var c = new HasMtb(a);
				this.ac.push(c);
				a.lg = a => {
					a = new StreamReader(new DataView(a));
					b.oq(a, c);
				};
				a.cf = () => {
					StringOpsSubstr.remove(b.ac, c);
					b.Ie.delete(c.$);
					Yyy.i(b.Ip, c.$);
				};
				a = StreamWriter.ha(1 + c.He.byteLength);
				a.l(0);
				a.lb(c.He.byteLength);
				a.Vb(c.He);
				c.Rb(a);
			}
		}, Zh: function (a) {
			var b = StreamWriter.ha();
			b.l(2);
			this.il(a, b);
			return b;
		}, il: (a, b) => {
			b.tb(a.mb);
			b.lb(a.da);
			b.Ub(a.P);
			b.tb(a.ue);
			Manager.lj(a, b);
		}, Ci: function () {
			// Don't negate – this.Kk can be undefined
			if (!(this.Y - this.Kk <= 0) && this.ac.length != 0) {
				var a = StreamWriter.ha();
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
			var b = StreamWriter.ha();
			b.l(1);
			var c = StreamWriter.ha();
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
				var a = new Dua;
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
			Dii.Rr(d, f).catch(() => null).then(a => {
				try {
					if (c.ac.indexOf(b) != -1) {
						b.Ns = a;
						var d = c.up++;
						b.$ = d;
						c.Ie.set(d, b);
						Mia.i(c.Hp, d, new StreamReader(new DataView(e.buffer, e.byteOffset, e.byteLength), false));
						b.yg = true;
						c.hr(b);
					}
				}
				catch (l) {
					c.xk(b, l instanceof GlobalError ? l.Ta : l);
				}
			});
		}, oq: function (a, b) {
			this.C();
			try {
				if (!b.Ho.Cm())
					throw new GlobalError(1);
				var c = a.B();
				if (b.yg) switch (c) {
					case 1:
						this.zq(a, b);
						break;
					case 2:
						this.sq(a, b);
						break;
					default:
						throw new GlobalError(0);
				}
				else if (c == 0)
					this.yq(a, b);
				else
					throw new GlobalError(0);
				if (a.o.byteLength - a.a > 0)
					throw new GlobalError(2);
			}
			catch (d) {
				this.xk(b, d instanceof GlobalError ? d.Ta : d);
			}
		}, xk: function (a, b) {
			window.console.log(b);
			this.Ie.delete(a.$);
			StringOpsSubstr.remove(this.ac, a);
			if (a.yg && this.$k != null)
				this.$k(a.$);
			a.pa.ia();
		}, sq: function (a, b) {
			var c = a.u();
			b.yb = a.Ab();
			var d = StreamWriter.ha();
			d.l(4);
			d.s((window.performance.now() - this.Li) * this.Ac + this.wi);
			d.s(c);
			b.Rb(d, 2);
		}, zq: function (a, b) {
			var c = a.hb();
			var d = a.hb();
			var e = Manager.fh(a);
			var f = e.zf.oj;
			if (f != null) {
				var g = b.xj.get(f);
				if (g == null) {
					g = new Mtb(f.$i, f.uj);
					b.xj.set(f, g);
				}
				if (!g.Cm())
					throw new GlobalError(3);
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
		}, f: IceLb
	});
	HasMtb.b = true;
	HasMtb.prototype = {
		Rb: function (a, b) {
			if (b == null)
				b = 0;
			this.pa.Rb(b, a);
		}, f: HasMtb
	};
	RoRuUu.b = true;
	Dkb.b = true;
	Dkb.prototype = {f: Dkb};
	HasStreamReader.b = true;
	HasStreamReader.ma = VMajor;
	HasStreamReader.prototype = Extend(VMajor.prototype, {
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
				this.gg = Manager.fh(this.Lc);
				this.gg.P = a;
			}
			else
				this.gg = null;
		}, Go: function () {
			return this.Y / this.mf;
		}, ra: () => {
		}, Sf: function () {
			this.C();
			Mya.zc++;
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
		}, f: HasStreamReader
	});
	KeyFramesManager.b = true;
	KeyFramesManager.prototype = {
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
		}, f: KeyFramesManager
	};
	Point.b = true;
	Point.prototype = {f: Point};
	WebserverApiOps.b = true;
	WebserverApiOps.Pl = (a, b, c, d, e) => new Promise((resolve, reject) => {
		var k = new XMLHttpRequest;
		k.open(b, a);
		k.responseType = c;
		k.onload = () => {
			if (k.status >= 200 && k.status < 300) {
				if (k.response != null)
					resolve(k.response);
				else
					reject(null);
			}
			else
				reject('status: ' + k.status);
		};
		k.onerror = a => reject(a);
		if (e != null)
			k.setRequestHeader('Content-type', e);
		k.send(d);
	});
	WebserverApiOps.L = (a, b) => WebserverApiOps.Pl(a, 'GET', b, null);
	WebserverApiOps.tk = a => WebserverApiOps.L(a, 'json').then(a => {
		var b = a.error;
		if (b != null)
			throw new GlobalError(b);
		return a.data;
	});
	WebserverApiOps.mq = (a, b, c) => WebserverApiOps.Pl(a, 'POST', 'json', b, c);
	WebserverApiOps.zl = (a, b, c) => WebserverApiOps.mq(a, b, c).then(a => {
		var b = a.error;
		if (b != null)
			throw new GlobalError(b);
		return a.data;
	});
	Daa.b = true;
	Daa.i = a => {
		if (a != null)
			a();
	};
	Yyy.b = true;
	Yyy.i = (a, text) => {
		if (a != null)
			a(text);
	};
	Mia.b = true;
	Mia.i = (a, b, c) => {
		if (a != null)
			a(b, c);
	};
	Dcb.b = true;
	Dcb.i = (a, b, c, d) => {
		if (a != null)
			a(b, c, d);
	};
	FunM.b = true;
	FunM.i = (a, b, c, d, e) => {
		if (a != null)
			a(b, c, d, e);
	};
	Mtb.b = true;
	Mtb.prototype = {
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
		}, f: Mtb
	};
	Dhb.b = true;
	Dhb.gf = a => {
		var b = new RegexUtil('([^&=]+)=?([^&]*)', 'g');
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
	Dhb.L = () => Dhb.gf(window.top.location.search);
	CommandUtil.b = true;
	CommandUtil.cq = a => {
		if (a.length < 3)
			throw new GlobalError('Not enough arguments');
		if (a.length > 7)
			throw new GlobalError('Too many arguments');
		var b = new TeamColorsUtil;
		var c = new TeamColors;
		b.Sg = c;
		switch (a[1]) {
			case 'blue':
				c.fb = [Team.blue.R];
				b.ea = Team.blue;
				break;
			case 'red':
				c.fb = [Team.red.R];
				b.ea = Team.red;
				break;
			default:
				throw new GlobalError('First argument must be either "red" or "blue"');
		}
		if (a[2] == 'clear')
			return b;
		c.hd = 256 * StringOpsInt.parseInt(a[2]) / 360 | 0;
		c.ed = StringOpsInt.parseInt('0x' + a[3]);
		if (a.length > 4) {
			c.fb = [];
			for (var d = 4, e = a.length; e > d;)
				c.fb.push(StringOpsInt.parseInt('0x' + a[d++]));
		}
		return b;
	};
	CommandUtil.prototype = {
		gf: function (text) {
			const selfCommandUtil = this;
			if (text.charAt(0) != '/')
				return false;
			if (text.length == 1)
				return true;
			var cmdArray = StringOps3.Gs(StringOpsSubstr.substr(text, 1, null)).split(' ');
			var cmdName = cmdArray[0];
			switch (cmdName) {
				case 'avatar':
					if (cmdArray.length == 2) {
						this.fmSetPlayerAvatar(cmdArray[1]);
						this.ba('Avatar set');
					}
					break;
				case 'checksum':
					var d = this.ya.T.S;
					cmdArray = d.w;
					if (d.Pe())
						this.ba('Current stadium is original: "' + cmdArray + '"');
					else {
						d = StringOps3.Vg(d.Sj(), 8);
						this.ba('Stadium: "' + cmdArray + '" (checksum: ' + d + ')');
					}
					break;
				case 'clear_avatar':
					this.fmSetPlayerAvatar(null);
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
						d = CommandUtil.cq(cmdArray);
						this.ya.ra(d);
					}
					catch (g) {
						if (g instanceof GlobalError) {
							cmdArray = g.Ta;
							typeof cmdArray == 'string' && this.ba(cmdArray);
						}
						else {
							cmdArray = g;
							typeof cmdArray == 'string' && this.ba(cmdArray);
						}
					}
					break;
				case 'extrapolation':
					if (cmdArray.length == 2) {
						cmdArray = StringOpsInt.parseInt(cmdArray[1]);
						if (cmdArray != null && cmdArray >= Constants.minE && cmdArray <= Constants.maxE) {
							ConnectionConstants.localStorageWrapperInst.rd.setLSItem(cmdArray);
							this.ya.gm(cmdArray);
							this.ba('Extrapolation set to ' + cmdArray + ' msec');
						}
						else
							this.ba('Extrapolation must be a value between ' + Constants.minE + ' and ' + Constants.maxE + ' milliseconds');
					}
					else
						this.ba('Extrapolation requires a value in milliseconds.');
					break;
				case 'handicap':
					if (cmdArray.length == 2) {
						cmdArray = StringOpsInt.parseInt(cmdArray[1]);
						if (cmdArray != null && cmdArray >= Constants.minH && cmdArray <= Constants.maxH) {
							this.ya.kr(cmdArray);
							this.ba('Ping handicap set to ' + cmdArray + ' msec');
						}
						else
							this.ba('Ping handicap must be a value between ' + Constants.minH + ' and ' + Constants.maxH + ' milliseconds');
					}
					else
						this.ba('Ping handicap requires a value in milliseconds.');
					break;
				case 'kick_ratelimit':
					if (cmdArray.length < 4)
						this.ba('Usage: /kick_ratelimit <min> <rate> <burst>');
					else {
						var d = StringOpsInt.parseInt(cmdArray[1]);
						var e = StringOpsInt.parseInt(cmdArray[2]);
						cmdArray = StringOpsInt.parseInt(cmdArray[3]);
						if (d == null || e == null || cmdArray == null)
							this.ba('Invalid arguments');
						else
							this.ya.ra(Mma.la(d, e, cmdArray));
					}
					break;
				case 'recaptcha':
					if (this.jm == null)
						this.ba('Only the host can set recaptcha mode');
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
										throw new GlobalError(null);
								}
								this.jm(e);
								this.ba('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
							}
							else
								throw new GlobalError(null);
						}
						catch (g) {
							this.ba('Usage: /recaptcha <on|off>');
						}
					break;
				case 'set_password':
					if (cmdArray.length == 2) {
						if (this.Fg == null)
							this.ba('Only the host can change the password');
						else {
							this.Fg(cmdArray[1]);
							this.ba('Password set');
						}
					}
					break;
				case 'store':
					var f = this.ya.T.S;
					if (f.Pe())
						this.ba('Can\'t store default stadium.');
					else {
						Dzz.Es()
							.then(() => Dzz.add(f))
							.then(() => selfCommandUtil.ba('Stadium stored'))
							.catch(() => selfCommandUtil.ba('Couldn\'t store stadium'));
					}
					break;
				default:
					this.ba('Unrecognized command: "' + cmdName + '"');
			}
			return true;
		}, fmSetPlayerAvatar: function (text) {
			if (text != null)
				text = StringOpsLimit.Qc(text, 2);
			ConnectionConstants.localStorageWrapperInst.avatarStorageUnit.setLSItem(text);
			this.ya.ra(Mra.la(text));
		}, f: CommandUtil
	};
	Dha.b = true;
	ConnBa.b = true;
	ConnBa.Yl = a => {
		var b = new Date;
		Dca.ar(a, 'HBReplay-' + b.getFullYear() + '-' + StringOps3.Af('' + (b.getMonth() + 1)) + '-' + StringOps3.Af('' + b.getDate()) + '-' + StringOps3.Af('' + b.getHours()) + 'h' + StringOps3.Af('' + b.getMinutes()) + 'm.hbr2');
	};
	ConnBa.Bq = a => {
		for (var b = a.T.I, c = [], d = 0, e = 0, f = 0; b.length > f;) {
			var g = b[f];
			++f;
			if (Team.spec == g.ea)
				c.push(g.V);
			if (Team.red == g.ea)
				++d;
			else if (Team.blue == g.ea)
				++e;
		}
		f = c.length;
		if (f != 0) {
			b = () => c.splice(Math.random() * c.length | 0, 1)[0];
			if (d == e) {
				if (f >= 2) {
					a.ra(Dss.la(b(), Team.red));
					a.ra(Dss.la(b(), Team.blue));
				}
			}
			else {
				if (d < e)
					d = Team.red;
				else
					d = Team.blue;
				a.ra(Dss.la(b(), d));
			}
		}
	};
	ConnBa.prototype = {
		zr: function () {
			this.Ed = new Mac(this.ya, 3);
		}, vr: function (a) {
			var b = this;
			a = new KickPlayerView(a);
			a.qb = () => b.j.bb(null);
			a.ei = (a, d, e) => {
				b.ya.ra(Dyy.la(a, d, e));
				b.j.bb(null);
			};
			this.j.bb(a.g);
		}, ia: function () {
			window.document.removeEventListener('keydown', createHandlerFromInstance(this, this.handleKeyboardEvent));
			window.document.removeEventListener('keyup', createHandlerFromInstance(this, this.Cd));
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
					b.push(Dss.la(e.V, Team.spec));
			}
			for (a = 0; b.length > a;)
				this.ya.ra(b[a++]);
		}, bf: function () {
			this.De = window.requestAnimationFrame(createHandlerFromInstance(this, this.bf));
			this.ob.C();
			this.ya.C();
			this.Kc();
		}, Kc: function () {
			var a = window.performance.now();
			if (ConnectionConstants.localStorageWrapperInst.fpsLimitStorageUnit.getLSUValue() != 1 || a - this.$cPerf >= 28.333333333333336) {
				this.$cPerf = a;
				this.sd++;
				this.updateViewport();
				a = this.ya.T.getFullPlayerById(this.ya.uc);
				if (a != null)
					this.xi = a.cb;
				this.j.C(this.ya);
			}
		}, Gp: function (str) {
			var selfConnBa = this;
			this.Of.gf(str) || this.Jn.Zn(1, () => {
				var c = new Dna;
				c.Tc = str;
				selfConnBa.ya.ra(c);
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
				this.ya.ra(Mna.la(a ? 0 : 1));
				this.Ik = a;
			}
		}, handleGamePause: function () {
			if (this.ya.T.K != null) {
				const doa1 = new Doa;
				doa1.Bf = this.ya.T.K.OaFramesField != 120;
				this.ya.ra(doa1);
			}
		}, handleKeyboardEvent: function (kbEvent) {
			switch (kbEvent.keyCode) {
				case 9: // tab
				case 13: // enter
					this.j.chatboxViewInstField.chatInputField.focus();
					kbEvent.preventDefault();
					break;
				case 27: // esc
					if (this.j.Zo())
						this.j.bb(null);
					else {
						var b = this.j;
						b.me(!b.Gd);
					}
					kbEvent.preventDefault();
					break;
				case 49: // 1
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(1);
					break;
				case 50: // 2
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(2);
					break;
				case 51: // 3
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(3);
					break;
				case 52: // 4
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(0);
					break;
				case 53: // 5
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(4);
					break;
				case 54: // 6
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(5);
					break;
				case 55: // 7
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(6);
					break;
				case 56: // 8
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(7);
					break;
				case 57: // 9
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(15);
					break;
				case 48: // 0
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(-1.2);
					break;
				case 80: // p
					this.handleGamePause();
					break;
				default:
					this.ob.handleKeyCode(kbEvent.code);
					break;
			}
		}, updateViewport: function () {
			const currentViewMode = ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.getLSUValue();
			const gameStateView = this.j.gameStateViewInstField;
			const majorCanvas1 = gameStateView.Eb;
			majorCanvas1.zg = ConnectionConstants.localStorageWrapperInst.resolutionScaleStorageUnit.getLSUValue();
			if (currentViewMode == 0) {
				gameStateView.Gg(true);
				majorCanvas1.kf = 1;
				majorCanvas1.jf = 0;
				majorCanvas1.xf = 0;
			}
			else {
				gameStateView.Gg(false);
				majorCanvas1.xf = 35;
				if (currentViewMode == -1)
					majorCanvas1.jf = 450;
				else {
					majorCanvas1.jf = 0;
					majorCanvas1.kf = 1 + 0.25 * (currentViewMode - 1);
				}
			}
		}, Cd: function (a) {
			this.ob.Cd(a.code);
		}, f: ConnBa
	};
	ImportantUtil.b = true;
	ImportantUtil.prototype = {
		updateMentions: function (roomInst) {
			const mention = this.j.chatboxViewInstField.Bc;
			const nameIdArr = [];
			let dNum = 0;
			for (let fullPlayers = roomInst.I; fullPlayers.length > dNum; dNum++) {
				const fullPlayer = fullPlayers[dNum];
				nameIdArr.push({w: fullPlayer.w, $: fullPlayer.V});
			}
			mention.Hj = nameIdArr;
		}, ri: function (roomInst) {
			function byPlayerNameText(fullPlayer) {
				return fullPlayer == null ? '' : ' by ' + fullPlayer.w;
			}

			/**
			 * @param {FullPlayer} fullPlayer
			 * @return {{}}
			 */
			function getPlayerObject(fullPlayer) {
				if (fullPlayer == null)
					return null;
				let pos = null;
				const playerDisc = fullPlayer.H;
				if (playerDisc != null) {
					pos = {
						x: playerDisc.a.x,
						y: playerDisc.a.y
					};
				}
				return {
					name: fullPlayer.w,
					team: fullPlayer.ea?.$,
					id: fullPlayer.V,
					admin: fullPlayer.cb,
					position: pos,
					avatar: fullPlayer.Xb,
					flag: fullPlayer.Kd,
					isBlinking: fullPlayer.Wb,
					//inputKey: fullPlayer.inputKey,
					ping: fullPlayer.yb,
					desynchronized: fullPlayer.Ld
				};
			}

			const selfImportantUtil = this;
			this.updateMentions(roomInst);

			roomInst.onPlayerJoinFun = fullPlayer => {
				selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('' + fullPlayer.w + ' has joined');
				ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.joinSoundField);
				selfImportantUtil.updateMentions(roomInst);

				if (window.parent.g.onPlayerJoin != null) {
					const player = getPlayerObject(fullPlayer);
					window.parent.g.onPlayerJoin(player);
				}
			};
			roomInst.onPlayerLeaveFun = (fullPlayer, reason, ban, byFullPlayer) => {
				Yyy.i(selfImportantUtil.Op, fullPlayer.V);

				if (window.parent.g.onPlayerLeave != null) {
					const player = getPlayerObject(fullPlayer);
					window.parent.g.onPlayerLeave(player);
				}

				if (reason == null)
					fullPlayer = '' + fullPlayer.w + ' has left';
				else {
					FunM.i(selfImportantUtil.Np, fullPlayer.V, reason, byFullPlayer != null ? byFullPlayer.w : null, ban);
					fullPlayer = '' + fullPlayer.w + ' was ' + (ban ? 'banned' : 'kicked') + byPlayerNameText(byFullPlayer) + (reason != '' ? ' (' + reason + ')' : '');

					if (window.parent.g.onPlayerKicked != null) {
						const player = getPlayerObject(fullPlayer);
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onPlayerKicked(player, reason, ban, byPlayer);
					}
				}
				selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle(fullPlayer);
				ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.leaveSoundField);
				selfImportantUtil.updateMentions(roomInst);
			};
			roomInst.onPlayerChatFun = (fullPlayer, message) => {
				const d = selfImportantUtil.Rh != null && message.indexOf(selfImportantUtil.Rh) != -1;
				selfImportantUtil.j.chatboxViewInstField.ba('' + fullPlayer.w + ': ' + message, d ? 'highlight' : null);
				if (ConnectionConstants.localStorageWrapperInst.soundHighlightStorageUnit.getLSUValue() && d)
					ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.highlightSoundField);
				else if (ConnectionConstants.localStorageWrapperInst.soundChatStorageUnit.getLSUValue())
					ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.chatSoundField);

				if (window.parent.g.onPlayerChat != null) {
					const player = getPlayerObject(fullPlayer);
					window.parent.g.onPlayerChat(player, message);
				}
			};
			roomInst.onAnnouncementFun = (message, color, style, sound) => {
				selfImportantUtil.j.chatboxViewInstField.addAnnouncementToLogAndHandle(message, color, style);
				if (ConnectionConstants.localStorageWrapperInst.soundChatStorageUnit.getLSUValue()) {
					switch (sound) {
						case 1:
							ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.chatSoundField);
							break;
						case 2:
							ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.highlightSoundField);
					}
				}
				if (window.parent.g.onAnnouncement != null) {
					window.parent.g.onAnnouncement(message, color, style, sound);
				}
			};
			roomInst.onPlayerBallKickFun = byFullPlayer => {
				ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.kickSoundField);

				if (window.parent.g.onPlayerBallKick != null) {
					const byPlayer = getPlayerObject(byFullPlayer);
					window.parent.g.onPlayerBallKick(byPlayer);
				}
			};
			roomInst.onTeamGoalFun = team => {
				ConnectionConstants.audioUtilInst.cdPlaySound(ConnectionConstants.audioUtilInst.goalSoundField);
				const bigTextUtilInst = selfImportantUtil.j.gameStateViewInstField.Eb.td;
				bigTextUtilInst.Pa(team == Team.red ? bigTextUtilInst.Fq : bigTextUtilInst.Bn);

				if (window.parent.g.onTeamGoal != null) {
					const teamId = team.$;
					window.parent.g.onTeamGoal(teamId);
				}
			};
			roomInst.onTeamVictoryFun = team => {
				const bigTextUtilInst = selfImportantUtil.j.gameStateViewInstField.Eb.td;
				bigTextUtilInst.Pa(team == Team.red ? bigTextUtilInst.Gq : bigTextUtilInst.Cn);
				selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('' + team.w + ' team won the match');

				if (window.parent.g.onTeamVictory != null) {
					const teamId = team.$;
					window.parent.g.onTeamVictory(teamId);
				}
			};
			roomInst.onGamePauseFun = (byFullPlayer, isPaused, isBeingResumed) => {
				if (isPaused && !isBeingResumed) {
					selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('Game paused' + byPlayerNameText(byFullPlayer));

					if (window.parent.g.onGamePause != null) {
						const byPlayer = getPlayerObject(byFullPlayer);
						window.parent.g.onGamePause(byPlayer, isPaused);
					}
				}
			};
			roomInst.onTimeIsUpFun = () => {
				const bigTextUtilInst = selfImportantUtil.j.gameStateViewInstField.Eb.td;
				bigTextUtilInst.Pa(bigTextUtilInst.Ar);

				if (window.parent.g.onTimeIsUp != null) {
					window.parent.g.onTimeIsUp();
				}
			};
			roomInst.onPositionsResetFun = () => {
				if (window.parent.g.onPositionsReset != null) {
					window.parent.g.onPositionsReset();
				}
			};
			roomInst.onGameStartFun = byFullPlayer => {
				selfImportantUtil.j.me(false);
				selfImportantUtil.j.gameStateViewInstField.Eb.td.Nn();
				selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('Game started' + byPlayerNameText(byFullPlayer));

				if (window.parent.g.onGameStart != null) {
					const byPlayer = getPlayerObject(byFullPlayer);
					window.parent.g.onGameStart(byPlayer);
				}
			};
			roomInst.onGameStopFun = byFullPlayer => {
				if (byFullPlayer != null)
					selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('Game stopped' + byPlayerNameText(byFullPlayer));

				if (window.parent.g.onGameStop != null) {
					const byPlayer = getPlayerObject(byFullPlayer);
					window.parent.g.onGameStop(byPlayer);
				}
			};
			roomInst.onStadiumChangeFun = (byFullPlayer, stadium) => {
				let checksum = null;
				// If it isn't a default stadium
				if (!stadium.Pe()) {
					checksum = StringOps3.Vg(stadium.Sj(), 8);
					selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('Stadium "' + stadium.w + '" (' + checksum + ') loaded' + byPlayerNameText(byFullPlayer));
				}

				if (window.parent.g.onStadiumChange != null) {
					const byPlayer = getPlayerObject(byFullPlayer);
					window.parent.g.onStadiumChange(byPlayer, stadium.w, checksum);
				}
			};
			roomInst.onPlayerDesyncChangeFun = fullPlayer => {
				selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('' + fullPlayer.w + ' ' + (fullPlayer.Ld ? 'has desynchronized' : 'is back in sync'));

				if (window.parent.g.onPlayerDesyncChange != null) {
					const player = getPlayerObject(fullPlayer);
					window.parent.g.onPlayerDesyncChange(player, fullPlayer.Ld);
				}
			};
			roomInst.onPlayerTeamChangeFun = (byFullPlayer, fullPlayer, team) => {
				if (roomInst.K != null)
					selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('' + fullPlayer.w + ' was moved to ' + team.w + byPlayerNameText(byFullPlayer));

				if (window.parent.g.onPlayerTeamChange != null) {
					const player = getPlayerObject(fullPlayer);
					const byPlayer = getPlayerObject(byFullPlayer);
					window.parent.g.onPlayerTeamChange(player, byPlayer, team.$);
				}
			};
			roomInst.onPlayerAdminChangeFun = (byFullPlayer, fullPlayer) => {
				const playerName = fullPlayer.w;
				selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle((fullPlayer.cb ? '' + playerName + ' was given admin rights' : '' + playerName + '\'s admin rights were taken away') + byPlayerNameText(byFullPlayer));

				if (window.parent.g.onPlayerAdminChange != null) {
					const player = getPlayerObject(fullPlayer);
					const byPlayer = getPlayerObject(byFullPlayer);
					window.parent.g.onPlayerAdminChange(player, byPlayer, fullPlayer.cb);
				}
			};
			roomInst.onChatIndicatorStateChangeFun = (fullPlayer, chatIndicatorState) => {
				selfImportantUtil.j.gameStateViewInstField.Eb.Po(fullPlayer, chatIndicatorState);

				if (window.parent.g.onChatIndicatorStateChange != null) {
					const player = getPlayerObject(fullPlayer);
					const chatIndicatorShown = chatIndicatorState === 0;
					window.parent.g.onChatIndicatorStateChange(player, chatIndicatorShown);
				}
			};
			roomInst.onKickRateLimitSetFun = (byFullPlayer, min, rate, burst) => {
				selfImportantUtil.j.chatboxViewInstField.addNoticeToLogAndHandle('Kick Rate Limit set to (min: ' + min + ', rate: ' + rate + ', burst: ' + burst + ')' + byPlayerNameText(byFullPlayer));

				if (window.parent.g.onKickRateLimitSet != null) {
					const byPlayer = getPlayerObject(byFullPlayer);
					window.parent.g.onKickRateLimitSet(min, rate, burst, byPlayer);
				}
			};
		}, resetRoomEventHandlers: roomInstance => {
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
		}, f: ImportantUtil
	};
	Dra.b = true;
	Dra.Fk = keyCode => {
		switch (ConnectionConstants.localStorageWrapperInst.playerKeysStorageUnit.getLSUValue().L(keyCode)) {
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
	Dra.prototype = {
		ia: function () {
			window.document.removeEventListener('focusout', createHandlerFromInstance(this, this.al));
		}, C: function () {
			var a = this.$d;
			if (this.ng != null && this.Yf != a) {
				this.Yf = a;
				var b = new Dga;
				b.input = a;
				this.ng(b);
			}
		}, handleKeyCode: function (keyCode) {
			this.$d |= Dra.Fk(keyCode);
		}, Cd: function (a) {
			this.$d &= ~Dra.Fk(a);
		}, al: function () {
			if (this.ng != null && this.Yf != 0) {
				this.Yf = this.$d = 0;
				var a = new Dga;
				a.input = 0;
				this.ng(a);
			}
		}, f: Dra
	};
	GeoLocation.b = true;
	GeoLocation.Hh = jsonString => GeoLocation.Rf(JSON.parse(jsonString));
	GeoLocation.Rf = geoJson => {
		const geoLocation = new GeoLocation;
		geoLocation.Ec = geoJson.lat;
		geoLocation.Gc = geoJson.lon;
		geoLocation.ub = geoJson.code.toLowerCase();
		return geoLocation;
	};
	GeoLocation.Fo = () => WebserverApiOps.tk(ConnectionConstants.rsUrl + 'api/geo').then(a => GeoLocation.Rf(a));
	GeoLocation.prototype = {
		se: function () {
			return JSON.stringify({lat: this.Ec, lon: this.Gc, code: this.ub});
		}, f: GeoLocation
	};
	LocalStorageWrapper.b = true;
	LocalStorageWrapper.prototype = {
		Lh: function () {
			return this.Ne.getLSUValue() != null ? this.Ne.getLSUValue() : this.Me.getLSUValue() != null ? this.Me.getLSUValue() : new GeoLocation;
		}, f: LocalStorageWrapper
	};
	LocalStorageUtil.b = true;
	LocalStorageUtil.Pm = () => {
		try {
			var localStorage1 = window.localStorage;
			localStorage1.getItem('');
			if (localStorage1.length == 0) {
				var hxRandom = '_hx_' + Math.random();
				localStorage1.setItem(hxRandom, hxRandom);
				localStorage1.removeItem(hxRandom);
			}
			return localStorage1;
		}
		catch (c) {
			return null;
		}
	};
	LocalStorageUnit.b = true;
	LocalStorageUnit.prototype = {
		getLSUValue: function () {
			return this.lsUnitValue;
		}, setLSItem: function (num) {
			this.lsUnitValue = num;
			if (this.localStorageInstField != null) {
				try {
					var b = this.lsuFunDField(num);
					if (b == null)
						this.localStorageInstField.removeItem(this.w);
					else
						this.localStorageInstField.setItem(this.w, b);
				}
				catch (c) {
				}
			}
		}, f: LocalStorageUnit
	};
	DwwMap.b = true;
	DwwMap.Rf = a => {
		for (var b = new DwwMap, c = Mec.Mm(a), d = 0; c.length > d; d++) {
			var e = c[d];
			b.Yc.set(e, a[e]);
		}
		return b;
	};
	DwwMap.Hh = a => DwwMap.Rf(JSON.parse(a));
	DwwMap.$j = () => {
		var a = new DwwMap;
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
	DwwMap.prototype = {
		Pa: function (a, b) {
			this.Yc.set(a, b);
		}, L: function (a) {
			return this.Yc.get(a);
		}, Jq: function (a) {
			this.Yc.delete(a);
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
		}, f: DwwMap
	};
	ConnectionConstants.b = true;
	DObj.b = true;
	DObj.prototype = {f: DObj};
	Muu.b = true;
	Muu.qpDisplay = () => {
		Mmc.ts();
		DisplayUtil.fj(() => Muu.jk(Muu.xq));
		Muu.hp();
	};
	Muu.hp = () => {
		var a = ConnectionConstants.localStorageWrapperInst.playerAuthKeyStorageUnit.getLSUValue();
		if (a == null) Dii.yo().then(a => {
			Muu.Je = a;
			ConnectionConstants.localStorageWrapperInst.playerAuthKeyStorageUnit.setLSItem(a.Ir());
		}).catch(() => ({}));
		else
			Dii.xo(a).then(a => Muu.Je = a).catch(() => ({}));
	};
	Muu.Bo = () => {
		var a = LocalStorageUtil.Pm();
		return a != null ? a.getItem('crappy_router') != null : false;
	};
	Muu.jk = a => {
		var b = new ChooseNicknameView(ConnectionConstants.localStorageWrapperInst.fe.getLSUValue());
		b.cl = b => {
			ConnectionConstants.localStorageWrapperInst.fe.setLSItem(b);
			ConnectionConstants.audioUtilInst.Tl();
			a();
		};
		DisplayUtil.La(b.g);
		b.Cb.focus();
	};
	Muu.kk = (a, b) => {
		var c = new CaptchaDialogView(a);
		c.Va = b;
		DisplayUtil.La(c.g);
	};
	Muu.no = (a, b) => {
		function c() {
			var a = new DisconnectedView('Failed', null);
			a.Va = () => Muu.xb();
			DisplayUtil.La(a.g);
		}

		function d(b) {
			b = b.sitekey;
			if (b == null)
				throw new GlobalError(null);
			Muu.kk(b, b => e(a, b));
		}

		DisplayUtil.La((new SimpleDialogView('Connecting', 'Connecting...', [])).g);
		var e;
		e = (a, e) =>
			WebserverApiOps.zl(ConnectionConstants.rsUrl + 'api/client', 'room=' + a + '&rcr=' + e, WebserverApiOps.vj).then(a => {
				switch (a.action) {
					case 'connect':
						a = a.token;
						if (a == null)
							throw new GlobalError(null);
						b(a);
						break;
					case 'recaptcha':
						d(a);
						break;
					default:
						throw new GlobalError(null);
				}
			}).catch(() => c());
		e(a, '');
	};
	Muu.xq = () => {
		var a = Dhb.L();
		var b = a.get('c');
		var c = a.get('p');
		a.get('v');
		if (c != null) {
			if (b != null)
				Muu.Dh(b);
			else
				Muu.xb();
		}
		else {
			if (b != null)
				Muu.Pf(b);
			else
				Muu.xb();
		}
	};
	Muu.xb = () => {
		var a = new RoomListView(ConnectionConstants.localStorageWrapperInst.Lh());
		DisplayUtil.La(a.Ja);
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
				var d = new SimpleDialogView(b, c, ['Ok']);
				DisplayUtil.La(d.g);
				d.Va = () => {
					DisplayUtil.La(a.Ja);
					return d.Va = null;
				};
			}
			else if (b.vd.Ib)
				Muu.Dh(b.$);
			else
				Muu.Pf(b.$);
		};
		a.ws = () => Muu.oo();
		a.vs = () => Muu.jk(Muu.xb);
		a.ys = () => Muu.mk();
		a.xs = a => Muu.po(a);
	};
	Muu.mk = () => {
		var a = new SettingsView(true);
		var b = window.document.createElement('div');
		b.className = 'view-wrapper';
		b.appendChild(a.g);
		DisplayUtil.La(b);
		a.qb = () => Muu.xb();
		a.Ep = () => {
			var a = new ChangeLocationView;
			var b = window.document.createElement('div');
			b.className = 'view-wrapper';
			b.appendChild(a.g);
			DisplayUtil.La(b);
			return a.qb = () => Muu.mk();
		};
	};
	Muu.$h = (a, b) => '' + window.location.origin + '/play?c=' + a + (b ? '&p=1' : '');
	Muu.oo = () => {
		var playerName = ConnectionConstants.localStorageWrapperInst.fe.getLSUValue();
		var createRoomView = new CreateRoomView('' + playerName + '\'s room');
		DisplayUtil.La(createRoomView.g);
		createRoomView.ci = () => Muu.xb();
		createRoomView.Jp = b => {
			function c() {
				if (!b.Ks) {
					var dfbInst = new Dfb;
					dfbInst.Id = 9;
					dfbInst.w = gRoom.jc;
					dfbInst.I = gRoom.I.length;
					dfbInst.Xe = iceLbInst.fg + 1;
					dfbInst.ub = fGeo.ub;
					dfbInst.Ib = iceLbInst.Ib != null;
					dfbInst.Ec = fGeo.Ec;
					dfbInst.Gc = fGeo.Gc;
					var streamWriter1 = StreamWriter.ha(16);
					dfbInst.ga(streamWriter1);
					dfbInst = streamWriter1.Kg();
					iceLbInst.Fi(dfbInst);
				}
			}

			DisplayUtil.La((new SimpleDialogView('Creating room', 'Connecting...', [])).g);
			var e = null;
			var fGeo = ConnectionConstants.localStorageWrapperInst.Lh();
			var gRoom = new Room;
			gRoom.jc = b.name;
			var kFullPlayer = new FullPlayer;
			kFullPlayer.w = playerName;
			kFullPlayer.cb = true;
			kFullPlayer.Kd = fGeo.ub;
			kFullPlayer.Xb = ConnectionConstants.localStorageWrapperInst.avatarStorageUnit.getLSUValue();
			gRoom.I.push(kFullPlayer);
			var iceLbInst = new IceLb({iceServers: ConnectionConstants.stuns, ij: ConnectionConstants.rsUrl + 'api/host', state: gRoom, version: 9});
			iceLbInst.fg = b.qs - 1;
			iceLbInst.Ib = b.password;
			c();
			var t = new ConnBa(iceLbInst);
			var h = false;
			iceLbInst.ef = (a, b) =>
				Muu.kk(a, a => {
					b(a);
					DisplayUtil.La(t.j.g);
					return h = true;
				});
			var m = window.setInterval(() => {
				var a = Mla.la(iceLbInst);
				iceLbInst.ra(a);
			}, 3000);
			iceLbInst.$k = a => {
				if (gRoom.getFullPlayerById(a) != null) {
					a = Dyy.la(a, 'Bad actor', false);
					iceLbInst.ra(a);
				}
			};
			iceLbInst.Hp = (a, b) => {
				var d = b.ic();
				if (d.length > 25)
					throw new GlobalError('name too long');
				var e = b.ic();
				if (e.length > 3)
					throw new GlobalError('country too long');
				var f = b.zb();
				if (f != null && f.length > 2)
					throw new GlobalError('avatar too long');
				d = Moa.la(a, d, e, f);
				iceLbInst.ra(d);
				c();
			};
			iceLbInst.Ip = a => {
				if (gRoom.getFullPlayerById(a) != null) {
					a = Dyy.la(a, null, false);
					iceLbInst.ra(a);
				}
			};
			iceLbInst.kg = a => {
				e = a;
				t.Bg = Muu.$h(a, iceLbInst.Ib != null);
				if (!h) {
					h = true;
					DisplayUtil.La(t.j.g);
				}
			};
			t.Ih.Np = (a, b, c, d) => iceLbInst.to(a, b, c, d);
			t.Ih.Op = () => c();
			t.j.de = () => {
				iceLbInst.ia();
				t.ia();
				Muu.xb();
				window.clearInterval(m);
			};
			t.Of.Fg = a => {
				iceLbInst.Ib = a;
				c();
				if (e != null)
					t.Bg = Muu.$h(e, iceLbInst.Ib != null);
			};
			t.Of.jm = a => iceLbInst.Ei(a);
			t.Of.Ud = createHandlerFromInstance(iceLbInst, iceLbInst.Ud);
		};
	};
	Muu.Dh = a => {
		var b = new PasswordView;
		DisplayUtil.La(b.g);
		b.Va = b => b == null ? Muu.xb() : Muu.Pf(a, b);
	};
	Muu.po = a => {
		try {
			var b = new ReplayUtil(new HasStreamReader(new Uint8Array(a), new Room, 3));
			b.je.de = () => {
				b.ia();
				Muu.xb();
			};
			DisplayUtil.La(b.j.g);
		}
		catch (e) {
			var c = e instanceof GlobalError ? e.Ta : e;
			if (c instanceof Dkb) {
				a = new SimpleDialogView('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']);
				DisplayUtil.La(a.g);
				a.Va = a => {
					if (a == 0) {
						a = window.top.location;
						window.top.open(a.protocol + '//' + a.hostname + (a.port != null ? ':' + a.port : '') + '/replay?v=' + c.Id, '_self');
					}
					else
						Muu.xb();
				};
			}
			else {
				var d = new SimpleDialogView('Replay error', 'Couldn\'t load the file.', ['Ok']);
				DisplayUtil.La(d.g);
				d.Va = () => {
					d.Va = null;
					Muu.xb();
				};
			}
		}
	};
	Muu.Pf = (a, b, c) => {
		try {
			var d = Muu.Bo();
			var e = new Room;
			var f = StreamWriter.ha();
			f.mc(ConnectionConstants.localStorageWrapperInst.fe.getLSUValue());
			f.mc(ConnectionConstants.localStorageWrapperInst.Lh().ub);
			f.Db(ConnectionConstants.localStorageWrapperInst.avatarStorageUnit.getLSUValue());
			var g = ConnectionConstants.stuns;
			var k = ConnectionConstants.p2pWss;
			var l = f.Kg();
			var t = new ConnectionUtil(a, {iceServers: g, ij: k, state: e, version: 9, Ms: l, password: b, cn: d, gn: c, ds: Muu.Je});
			var h = new ConnectingView;
			h.ba('Connecting to master...');
			h.vh.onclick = () => {
				t.Ad = null;
				t.df = null;
				t.ia();
				Muu.xb();
			};
			DisplayUtil.La(h.g);
			var m = (a, b) => {
				var c = new DisconnectedView(a, b);
				c.Va = () => Muu.xb();
				DisplayUtil.La(c.g);
			}, p = () => {
				var a = new SimpleDialogView('Connection Failed', '', ['Ok']);
				a.Vd.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
				a.Va = () => Muu.xb();
				DisplayUtil.La(a.g);
			}, r = () => {
				var b = new ConnBa(t);
				t.dl = a => {
					b.j.statsViewInstField.qr((10 * t.sg.$g(.5) | 0) / 10);
					b.j.statsViewInstField.or((10 * t.sg.max() | 0) / 10);
					b.j.statsViewInstField.nl.tn(a);
				};
				b.Bg = Muu.$h(a, false);
				DisplayUtil.La(b.j.g);
				b.j.de = () => {
					t.Ad = null;
					t.ia();
					b.ia();
					Muu.xb();
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
								Muu.no(a, c => Muu.Pf(a, b, c));
								break;
							case 4101:
								if (b == null)
									Muu.Dh(a);
								else
									m(ConnectionUtil.xh(c), null);
								break;
							default:
								m(ConnectionUtil.xh(c), null);
						}
						break;
					default:
						m(ConnectionUtil.xh(c), null);
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
			window.console.log(ic instanceof GlobalError ? ic.Ta : ic);
			c = new SimpleDialogView('Unexpected Error', '', []);
			c.Vd.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.';
			DisplayUtil.La(c.g);
		}
	};
	DisplayUtil.b = true;
	DisplayUtil.ks = () => {
		try {
			return window.top != window.self;
		}
		catch (a) {
			return true;
		}
	};
	DisplayUtil.Wg = a => new Promise((resolve, reject) => {
		var d = window.document.createElement('img');
		d.onload = () => {
			URL.revokeObjectURL(d.src);
			d.onload = null;
			resolve(d);
		};
		d.onerror = () => {
			URL.revokeObjectURL(d.src);
			reject(null);
		};
		return d.src = URL.createObjectURL(new Blob([a], {type: 'image/png'}));
	});
	DisplayUtil.fj = a => {
		if (DisplayUtil.ks()) {
			DisplayUtil.es(() => {
				Mkc.fj();
				var b;
				if (ConnectionConstants.localStorageWrapperInst.Me.getLSUValue() == null) {
					GeoLocation.Fo().then(a => ConnectionConstants.localStorageWrapperInst.Me.setLSItem(a)).catch(() => ({}));
				}
				else
					b = Promise.resolve(null);
				return Promise.all([
					WebserverApiOps.L('res.dat', 'arraybuffer').then(a => {
						a = new JSZip(a);
						ConnectionConstants.audioUtilInst = new AudioUtil(a);
						return Promise.all([
							ConnectionConstants.audioUtilInst.ro,
							DisplayUtil.Wg(a.file('images/grass.png').asArrayBuffer()).then(a => ConnectionConstants.grassImage = a),
							DisplayUtil.Wg(a.file('images/concrete.png').asArrayBuffer()).then(a => ConnectionConstants.concreteImage = a),
							DisplayUtil.Wg(a.file('images/concrete2.png').asArrayBuffer()).then(a => ConnectionConstants.concrete2Image = a),
							DisplayUtil.Wg(a.file('images/typing.png').asArrayBuffer()).then(a => ConnectionConstants.typingImage = a)
						]);
					}),
					b
				]).then(() => DisplayUtil.us(a));
			});
		}
	};
	DisplayUtil.es = a => {
		for (var b = Modernizr, c = 'canvas datachannel dataview es6collections peerconnection promises websockets'.split(' '), d = [], e = 0; c.length > e; e++) {
			var f = c[e];
			if (!b[f])
				d.push(f);
		}
		if (d.length != 0) {
			window.document.body.innerHTML = '';
			DisplayUtil.Pg = window.document.createElement('div');
			window.document.body.appendChild(DisplayUtil.Pg);
			a = new UnsupportedBrowserView(d);
			DisplayUtil.La(a.g);
		}
		else {
			a();
		}
	};
	DisplayUtil.us = a => {
		window.document.body.innerHTML = '';
		DisplayUtil.Pg = window.document.createElement('div');
		window.document.body.appendChild(DisplayUtil.Pg);
		var b = null;
		var b = () => {
			ConnectionConstants.audioUtilInst.Tl();
			window.document.removeEventListener('click', b, true);
		};
		window.document.addEventListener('click', b, true);
		a();
	};
	DisplayUtil.La = a => {
		if (DisplayUtil.Vm != null)
			DisplayUtil.Vm.remove();
		if (a != null) {
			DisplayUtil.Pg.appendChild(a);
			DisplayUtil.Vm = a;
		}
	};
	ReplayUtil.b = true;
	ReplayUtil.prototype = {
		ia: function () {
			window.document.removeEventListener('keydown', createHandlerFromInstance(this, this.handleKeyboardEvent));
			window.document.removeEventListener('keyup', createHandlerFromInstance(this, this.Cd));
			window.onbeforeunload = null;
			window.cancelAnimationFrame(this.De);
			window.clearInterval(this.Gh);
		}, bf: function () {
			this.De = window.requestAnimationFrame(createHandlerFromInstance(this, this.bf));
			this.ya.C();
			this.Kc();
		}, Kc: function () {
			this.je.C();
			var a = window.performance.now();
			if (ConnectionConstants.localStorageWrapperInst.fpsLimitStorageUnit.getLSUValue() != 1 || a - this.$cPerf >= 28.333333333333336) {
				this.$cPerf = a;
				this.sd++;
				this.updateViewport(ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.getLSUValue());
				if (this.ya.Fd <= 0)
					this.j.C(this.ya);
			}
		}, handleKeyboardEvent: function (kbEvent) {
			switch (kbEvent.keyCode) {
				case 27: // esc
					const gameView = this.j;
					gameView.me(!gameView.Gd);
					kbEvent.preventDefault();
					break;
				case 49: // 1
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(1);
					break;
				case 50: // 2
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(2);
					break;
				case 51: // 3
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(3);
					break;
				case 52: // 4
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(0);
					break;
				case 53: // 5
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(4);
					break;
				case 54: // 6
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(5);
					break;
				case 55: // 7
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(6);
					break;
				case 56: // 8
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(7);
					break;
				case 57: // 9
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(15);
					break;
				case 48: // 0
					ConnectionConstants.localStorageWrapperInst.viewModeStorageUnit.setLSItem(-1.2);
					break;
			}
		}, updateViewport: function (a) {
			var gameStateView = this.j.gameStateViewInstField;
			if (a <= 0) {
				gameStateView.Gg(true);
				gameStateView.Eb.kf = 1;
				gameStateView.Eb.xf = 0;
			}
			else {
				gameStateView.Gg(false);
				gameStateView.Eb.xf = 35;
				gameStateView.Eb.kf = 1 + 0.25 * (a - 1);
			}
		}, Cd: () => {
		}, f: ReplayUtil
	};
	Dfb.b = true;
	Dfb.prototype = {
		Pj: function () {
			this.w = StringOpsLimit.Qc(this.w, 40);
			this.ub = StringOpsLimit.Qc(this.ub, 3);
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
				throw new GlobalError(null);
			this.Pj();
		}, f: Dfb
	};
	RoomListOps.b = true;
	RoomListOps.parse = a => {
		a.B();
		for (var b = []; a.o.byteLength - a.a != 0;) {
			var c = a.ie(a.Ob());
			var d = a.Cl(a.Ob());
			try {
				var e = new Dfb;
				e.ja(new StreamReader(new DataView(d), false));
				var f = new DObj;
				f.vd = e;
				f.$ = c;
				b.push(f);
			}
			catch (g) {
			}
		}
		return b;
	};
	RoomListOps.js = (a, b, c, d) => Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
	RoomListOps.Hs = (a, b) => {
		for (var c = a.Ec, d = a.Gc, e = 0; b.length > e;) {
			var f = b[e];
			++e;
			var g = f.vd;
			f.Le = 6378 * RoomListOps.js(0.017453292519943295 * g.Ec, 0.017453292519943295 * g.Gc, 0.017453292519943295 * c, 0.017453292519943295 * d);
			if (!isFinite(f.Le))
				f.Le = 22000;
		}
	};
	RoomListOps.get = () => WebserverApiOps.L(ConnectionConstants.rsUrl + 'api/list', 'arraybuffer').then(a => RoomListOps.parse(new StreamReader(new DataView(a), false)));
	Dzz.b = true;
	Dzz.delete = a => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((resolve, reject) => {
		var d = window.indexedDB.open('stadiums', 1);
		d.onblocked = d.onerror = reject;
		d.onupgradeneeded = a => {
			var b = d.result;
			b.onerror = reject;
			if (a.oldVersion < 1) {
				b.createObjectStore('files', {autoIncrement: true});
				b.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		d.onsuccess = () => {
			var e = d.result;
			e.onerror = reject;
			var f = e.transaction(['meta', 'files'], 'readwrite');
			f.onerror = f.onabort = a => {
				reject(a);
				e.close();
			};
			f.oncomplete = () => {
				resolve(0);
				e.close();
			};
			f.objectStore('files').delete(a);
			f.objectStore('meta').delete(a);
		};
	});
	Dzz.get = a => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((resolve, reject) => {
		var d = window.indexedDB.open('stadiums', 1);
		d.onblocked = d.onerror = reject;
		d.onupgradeneeded = a => {
			var b = d.result;
			b.onerror = reject;
			if (a.oldVersion < 1) {
				b.createObjectStore('files', {autoIncrement: true});
				b.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		d.onsuccess = () => {
			var e = d.result;
			e.onerror = reject;
			var f = e.transaction(['files']);
			f.onerror = f.onabort = a => {
				reject(a);
				e.close();
			};
			f.oncomplete = () => e.close();
			Mzb.eh(f.objectStore('files').get(a)).then(a => {
				try {
					var d = new Stadium;
					d.Lk(a);
					resolve(d);
				}
				catch (l) {
					reject(l instanceof GlobalError ? l.Ta : l);
				}
			}).catch(reject);
		};
	});
	Dzz.getAll = () => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((resolve, reject) => {
		var c = window.indexedDB.open('stadiums', 1);
		c.onblocked = c.onerror = reject;
		c.onupgradeneeded = a => {
			var d = c.result;
			d.onerror = reject;
			if (a.oldVersion < 1) {
				d.createObjectStore('files', {autoIncrement: true});
				d.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		c.onsuccess = () => {
			var d = c.result;
			d.onerror = reject;
			var e = d.transaction(['meta']);
			e.onerror = e.onabort = a => {
				reject(a);
				d.close();
			};
			e.oncomplete = () => d.close();
			Mzb.eh(e.objectStore('meta').getAll()).then(resolve, reject);
		};
	});
	Dzz.Es = () => {
		var a = window.navigator.storage;
		if (a == null || a.persist == null)
			return Promise.resolve(false);
		try {
			return a.persisted().then(b => b ? true : a.persist()).catch(() => false);
		}
		catch (b) {
			return Promise.resolve(false);
		}
	};
	Dzz.add = a => window.indexedDB == null ? Promise.reject('IndexedDB not supported by browser.') : new Promise((resolve, reject) => {
		var d = window.indexedDB.open('stadiums', 1);
		d.onerror = reject;
		d.onblocked = d.onerror;
		d.onupgradeneeded = a => {
			var b = d.result;
			b.onerror = reject;
			if (a.oldVersion < 1) {
				b.createObjectStore('files', {autoIncrement: true});
				b.createObjectStore('meta', {keyPath: 'id'});
			}
		};
		d.onsuccess = () => {
			var e = d.result;
			e.onerror = reject;
			var f = e.transaction(['files', 'meta'], 'readwrite');
			f.onabort = a => {
				reject(a);
				e.close();
			};
			f.onerror = f.onabort;
			f.oncomplete = () => {
				resolve(0);
				e.close();
			};
			try {
				Mzb.eh(f.objectStore('files').add(a.se())).then(id => {
					let bObj = {name: a.w, id: id};
					return Mzb.eh(f.objectStore('meta').add(bObj));
				}).catch(reject);
			}
			catch (g) {
				reject(0);
			}
		};
	});
	AudioUtil.b = true;
	AudioUtil.prototype = {
		Tl: function () {
			this.c.resume();
		}, cdPlaySound: function (a) {
			var b = this.c.createBufferSource();
			b.buffer = a;
			b.connect(this.ag);
			b.start();
		}, im: function (a) {
			this.ag.gain.value = a;
		}, f: AudioUtil
	};
	AudioTb.b = true;
	AudioTb.prototype = {
		update: function () {
			var a = window.performance.now();
			var b = a - this.Um;
			this.Um = a;
			this.ve += (this.dh - this.ve) * this.Js;
			this.Ef -= b;
			if (this.Ef <= 0)
				this.Ef = this.dh = 0;
			if (this.dh <= 0 && this.ve < 0.05) {
				window.clearInterval(this.gh);
				this.gh = null;
				this.ve = 0;
			}
			this.Tg.gain.value = ConnectionConstants.localStorageWrapperInst.soundCrowdStorageUnit.getLSUValue() ? this.ve : 0;
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
					if (b.OaFramesField <= 0)
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
					var m = Team.red.Ch;
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
							if (Team.red == q.ea) {
								if (d == null || q.H.a.x * m > d.a.x * m)
									d = q.H;
								if (e == null || q.H.a.x * m < e.a.x * m)
									e = q.H;
								if (f == null || g > u)
									f = q.H, g = u;
							}
							else if (Team.blue == q.ea) {
								if (k == null || q.H.a.x * m > k.a.x * m)
									k = q.H;
								if (l == null || q.H.a.x * m < l.a.x * m)
									l = q.H;
								if (t == null || h > u)
									t = q.H, h = u;
							}
						}
					}
					if (l != null && e != null && b.OaFramesField <= 0) {
						if (l.a.x < f.a.x && l.a.x < c.a.x && c.a.x > 20)
							this.qj(.3);
						if (e.a.x > t.a.x && e.a.x > c.a.x && c.a.x < -20)
							this.qj(.3);
					}
				}
		}, f: AudioTb
	};
	Disc.b = true;
	Disc.prototype = {
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
			var a = new DynamicDisc;
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
		}, f: Disc
	};
	Game.b = true;
	Game.Rd = [Dta];
	Game.qd = (a, b) => {
		a.Ma = b.Ma.sc();
		a.ib = b.ib;
		a.Da = b.Da;
		a.ta = b.ta.sc();
		a.vc = b.vc;
		a.Bb = b.Bb;
		a.Pb = b.Pb;
		a.Kb = b.Kb;
		a.Hc = b.Hc;
		a.OaFramesField = b.OaFramesField;
		a.S = b.S;
		a.ae = b.ae;
	};
	Game.prototype = {
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
			if (Team.spec == a.ea)
				a.H = null;
			else {
				a.ob = 0;
				var b = a.H;
				if (b == null) {
					b = new DynamicDisc;
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
				var d = Team.red == a.ea ? this.S.Dd : this.S.md;
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
			// If game is paused
			if (this.OaFramesField > 0) {
				if (this.OaFramesField < 120)
					this.OaFramesField--;
			}
			// If game is running
			else {
				// Exposing global fields begin
				const onGameTickFun = window.parent.g.onGameTick;
				if (onGameTickFun != null)
					onGameTickFun(this);
				// Exposing global fields end

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
							// If ball kick was successful
							if (f) {
								if (this.Ma.onPlayerBallKickFun != null)
									this.Ma.onPlayerBallKickFun(d);
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
						Game.idsMaxArray[c] = f;
						f = Game.pointsMaxArray[c];
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
					this.Hc += 0.016666666666666666;
					for (a = 0; b.length > a;) {
						d = b[a];
						++a;
						if (d.H != null)
							d.H.h = 39;
					}
					d = Team.spec;
					b = this.ta.F;
					for (a = 0; c > a && (d = a++, d = this.S.Kn(b[Game.idsMaxArray[d]].a, Game.pointsMaxArray[d]), d == Team.spec);) ;
					if (d != Team.spec) {
						this.Bb = 2;
						this.vc = 150;
						this.ae = d;
						if (d == Team.red)
							this.Kb++;
						else
							this.Pb++;
						if (this.Ma.onTeamGoalFun != null)
							this.Ma.onTeamGoalFun(d.enemyTeam);
						if (this.Ma.Ol != null)
							this.Ma.Ol(d.$);
					}
					else {
						if (this.Da > 0 && this.Hc >= 60 * this.Da && this.Kb != this.Pb) {
							if (this.Ma.onTimeIsUpFun != null)
								this.Ma.onTimeIsUpFun();
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
							if (this.Ma.onPositionsResetFun != null)
								this.Ma.onPositionsResetFun();
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
					if (b.onGameStopFun != null)
						b.onGameStopFun(null);
				}
			}
		}, um: function () {
			this.vc = 300;
			this.Bb = 3;
			if (this.Ma.onTeamVictoryFun != null)
				this.Ma.onTeamVictoryFun(this.Kb < this.Pb ? Team.red : Team.blue);
		}, Gk: function () {
			var a = this.Ma.I;
			this.Bb = 0;
			for (var b = this.S.F, c = this.ta.F, d = 0, e = this.S.pf ? b.length : 1; e > d;) {
				var f = d++;
				b[f].Bk(c[f]);
			}
			b = [0, 0, 0];
			for (c = 0; a.length > c;) {
				if (d = a[c], ++c, this.Ck(d), e = d.ea, Team.spec != e) {
					var f = d.H.a;
					var g = this.S;
					var k = b[e.$];
					var l = Team.red == e ? g.Dd : g.md;
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
			a.O(this.OaFramesField);
			a.l(this.ae.$);
		}, ja: function (a, b) {
			this.ta.ja(a);
			this.vc = a.M();
			this.Bb = a.M();
			this.Pb = a.M();
			this.Kb = a.M();
			this.Hc = a.u();
			this.OaFramesField = a.M();
			var c = a.lf();
			this.ae = c == 1 ? Team.red : c == 2 ? Team.blue : Team.spec;
			this.Ma = b;
			this.ib = b.ib;
			this.Da = b.Da;
			this.S = b.S;
			this.ta.J = this.S.J;
			this.ta.U = this.S.U;
			this.ta.qa = this.S.qa;
			this.ta.pb = this.S.pb;
		}, sc: function () {
			var a = Mya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new Game;
				this.hc = a;
				Game.qd(b, this);
			}
			return b;
		}, f: Game
	};
	Goal.b = true;
	Goal.prototype = {
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
			this.qe = a == 1 ? Team.red : a == 2 ? Team.blue : Team.spec;
		}, f: Goal
	};
	PlayerPhysics.b = true;
	PlayerPhysics.prototype = {
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
		}, f: PlayerPhysics
	};
	Dbb.b = true;
	Dbb.prototype = {f: Dbb};
	Stadium.b = true;
	Stadium.ja = a => {
		var b = a.B();
		return b == 255 ? (b = new Stadium, b.Kr(a), b) : Stadium.Kh()[b];
	};
	Stadium.Kh = () => {
		if (Stadium.wb == null) {
			Stadium.wb = [];
			var a = new Stadium;
			a.ad('Classic', 420, 200, 370, 170, 64, 75);
			Stadium.wb.push(a);
			a = new Stadium;
			a.ad('Easy', 420, 200, 370, 170, 90, 75);
			Stadium.wb.push(a);
			a = new Stadium;
			a.ad('Small', 420, 200, 320, 130, 55, 70);
			Stadium.wb.push(a);
			a = new Stadium;
			a.ad('Big', 600, 270, 550, 240, 80, 80);
			Stadium.wb.push(a);
			a = new Stadium;
			a.ad('Rounded', 420, 200, 370, 170, 64, 75, 75);
			Stadium.wb.push(a);
			a = new Stadium;
			a.Qk('Hockey', 420, 204, 398, 182, 68, 120, 75, 100);
			Stadium.wb.push(a);
			a = new Stadium;
			a.Qk('Big Hockey', 600, 270, 550, 240, 90, 160, 75, 150);
			Stadium.wb.push(a);
			a = new Stadium;
			a.ad('Big Easy', 600, 270, 550, 240, 95, 80);
			Stadium.wb.push(a);
			a = new Stadium;
			a.ad('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
			Stadium.wb.push(a);
			a = new Stadium;
			a.ad('Huge', 750, 350, 700, 320, 100, 80);
			Stadium.wb.push(a);
			for (var a = 0, b = Stadium.wb.length; b > a; a++) {
				var c = a;
				Stadium.wb[c].Bh = c;
			}
		}
		return Stadium.wb;
	};
	Stadium.wn = (a, b) => {
		if (a.trait != null) {
			var c = b[ObjectCastUtil.G(a.trait, String)];
			if (c != null) {
				for (var d = 0, e = Mec.Mm(c); e.length > d; d++) {
					var f = e[d];
					if (a[f] == null)
						a[f] = c[f];
				}
			}
		}
	};
	Stadium.Dn = a => {
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
	Stadium.Fc = a => {
		a = ObjectCastUtil.G(a, Array);
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
	Stadium.Jc = (a, b, c, d) => {
		if (d != c)
			a[b] = Stadium.Dn(c);
	};
	Stadium.qg = (a, b, c) => {
		if (c != b)
			a.color = Stadium.Rn(b);
	};
	Stadium.Rn = a => {
		a |= 0;
		return a < 0 ? 'transparent' : StringOps3.Vg(a);
	};
	Stadium.$f = a => {
		if (a == 'transparent')
			return -1;
		if (typeof a == 'string')
			return StringOpsInt.parseInt('0x' + StringOpsInt.ye(a));
		if (a instanceof Array && a.eb == null)
			return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
		throw new GlobalError('Bad color');
	};
	Stadium.Tr = a => {
		var b = {
			x: a.a.x, y: a.a.y
		};
		Stadium.ka(b, 'bCoef', a.m, 1);
		Stadium.Jc(b, 'cMask', a.h, 63);
		Stadium.Jc(b, 'cGroup', a.v, 32);
		return b;
	};
	Stadium.np = a => {
		var b = new Vertex;
		b.a.x = ObjectCastUtil.G(a.x, objNumber);
		b.a.y = ObjectCastUtil.G(a.y, objNumber);
		var c = a.bCoef;
		if (c != null)
			b.m = ObjectCastUtil.G(c, objNumber);
		c = a.cMask;
		if (c != null)
			b.h = Stadium.Fc(c);
		a = a.cGroup;
		if (a != null)
			b.v = Stadium.Fc(a);
		return b;
	};
	Stadium.fr = (a, b) => {
		var c = {v0: a.W.ud, v1: a.ca.ud};
		Stadium.ka(c, 'bias', a.Cc, b.Cc);
		Stadium.ka(c, 'bCoef', a.m, b.m);
		var d = a.Co();
		Stadium.ka(c, 'curve', d, 0);
		if (d != 0)
			c.curveF = a.vb;
		Stadium.ka(c, 'vis', a.Za, b.Za);
		Stadium.Jc(c, 'cMask', a.h, b.h);
		Stadium.Jc(c, 'cGroup', a.v, b.v);
		Stadium.qg(c, a.R, b.R);
		return c;
	};
	Stadium.mp = (a, b) => {
		var c = new Segment;
		var d = ObjectCastUtil.G(a.v1, object1);
		c.W = b[ObjectCastUtil.G(a.v0, object1)];
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
			c.Cc = ObjectCastUtil.G(d, objNumber);
		if (e != null)
			c.m = ObjectCastUtil.G(e, objNumber);
		if (g != null)
			c.vb = ObjectCastUtil.G(g, objNumber);
		else if (f != null)
			c.Oc(ObjectCastUtil.G(f, objNumber));
		if (k != null)
			c.Za = ObjectCastUtil.G(k, objBoolean);
		if (l != null)
			c.h = Stadium.Fc(l);
		if (t != null)
			c.v = Stadium.Fc(t);
		if (m != null)
			c.R = Stadium.$f(m);
		return c;
	};
	Stadium.ap = a => {
		var b = {d0: a.Yd, d1: a.Zd, length: a.ec <= a.Hb ? a.Hb : [a.Hb, a.ec]};
		Stadium.qg(b, a.R, 0);
		Stadium.ka(b, 'strength', a.ne, Infinity);
		return b;
	};
	Stadium.jp = (a, b) => {
		var c = new Joint;
		var d = ObjectCastUtil.G(a.d0, object1);
		var e = ObjectCastUtil.G(a.d1, object1);
		var f = a.color;
		var g = a.strength;
		var k = a.length;
		if (b.length <= d || d < 0)
			throw new GlobalError(null);
		if (b.length <= e || e < 0)
			throw new GlobalError(null);
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
				c.Hb = ObjectCastUtil.G(k[0], objNumber);
				c.ec = ObjectCastUtil.G(k[1], objNumber);
			}
			else {
				c.ec = c.Hb = ObjectCastUtil.G(k, objNumber);
			}
		}
		c.ne = g == null || g == 'rigid' ? Infinity : ObjectCastUtil.G(g, objNumber);
		if (f != null)
			c.R = Stadium.$f(f);
		return c;
	};
	Stadium.gq = a => {
		var b = {
			normal: [a.wa.x, a.wa.y], dist: a.Ua
		};
		Stadium.ka(b, 'bCoef', a.m, 1);
		Stadium.Jc(b, 'cMask', a.h, 63);
		Stadium.Jc(b, 'cGroup', a.v, 32);
		return b;
	};
	Stadium.kp = a => {
		var b = new Plane;
		var c = ObjectCastUtil.G(a.normal, Array);
		var d = ObjectCastUtil.G(c[0], objNumber);
		var c = ObjectCastUtil.G(c[1], objNumber);
		var e = b.wa;
		var f = Math.sqrt(d * d + c * c);
		e.x = d / f;
		e.y = c / f;
		b.Ua = ObjectCastUtil.G(a.dist, objNumber);
		d = a.bCoef;
		c = a.cMask;
		a = a.cGroup;
		if (d != null)
			b.m = ObjectCastUtil.G(d, objNumber);
		if (c != null)
			b.h = Stadium.Fc(c);
		if (a != null)
			b.v = Stadium.Fc(a);
		return b;
	};
	Stadium.Jo = a => ({p0: [a.W.x, a.W.y], p1: [a.ca.x, a.ca.y], team: Team.red == a.qe ? 'red' : 'blue'});
	Stadium.ip = a => {
		var b = new Goal;
		var c = ObjectCastUtil.G(a.p0, Array);
		var d = ObjectCastUtil.G(a.p1, Array);
		var e = b.W;
		e.x = c[0];
		e.y = c[1];
		c = b.ca;
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
				throw new GlobalError('Bad team value');
		}
		b.qe = a;
		return b;
	};
	Stadium.jq = a => {
		var b = {};
		Stadium.ka(b, 'bCoef', a.m, 0.5);
		Stadium.ka(b, 'invMass', a.aa, 0.5);
		Stadium.ka(b, 'damping', a.Ca, 0.96);
		Stadium.ka(b, 'acceleration', a.Ce, 0.1);
		Stadium.ka(b, 'kickingAcceleration', a.Te, 0.07);
		Stadium.ka(b, 'kickingDamping', a.Ue, 0.96);
		Stadium.ka(b, 'kickStrength', a.Re, 5);
		Stadium.Jc(b, 'cGroup', a.v, 0);
		if (a.oa.x != 0 || a.oa.y != 0)
			b.gravity = [a.oa.x, a.oa.y];
		Stadium.ka(b, 'radius', a.Z, 15);
		Stadium.ka(b, 'kickback', a.Se, 0);
		return b;
	};
	Stadium.lp = a => {
		var b = new PlayerPhysics;
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
			b.m = ObjectCastUtil.G(c, objNumber);
		if (d != null)
			b.aa = ObjectCastUtil.G(d, objNumber);
		if (e != null)
			b.Ca = ObjectCastUtil.G(e, objNumber);
		if (f != null)
			b.Ce = ObjectCastUtil.G(f, objNumber);
		if (g != null)
			b.Te = ObjectCastUtil.G(g, objNumber);
		if (k != null)
			b.Ue = ObjectCastUtil.G(k, objNumber);
		if (l != null)
			b.Re = ObjectCastUtil.G(l, objNumber);
		if (t != null) {
			c = b.oa;
			d = ObjectCastUtil.G(t[1], objNumber);
			c.x = ObjectCastUtil.G(t[0], objNumber);
			c.y = d;
		}
		if (m != null)
			b.v = Stadium.Fc(m);
		if (n != null)
			b.Z = ObjectCastUtil.G(n, objNumber);
		if (a != null)
			b.Se = ObjectCastUtil.G(a, objNumber);
		return b;
	};
	Stadium.mo = (a, b) => {
		var c = {};
		if (b.a.x != a.a.x || b.a.y != a.a.y)
			c.pos = [a.a.x, a.a.y];
		if (b.D.x != a.D.x || b.D.y != a.D.y)
			c.speed = [a.D.x, a.D.y];
		if (b.oa.x != a.oa.x || b.oa.y != a.oa.y)
			c.gravity = [a.oa.x, a.oa.y];
		Stadium.ka(c, 'radius', a.Z, b.Z);
		Stadium.ka(c, 'bCoef', a.m, b.m);
		Stadium.ka(c, 'invMass', a.aa, b.aa);
		Stadium.ka(c, 'damping', a.Ca, b.Ca);
		Stadium.qg(c, a.R, b.R);
		Stadium.Jc(c, 'cMask', a.h, b.h);
		Stadium.Jc(c, 'cGroup', a.v, b.v);
		return c;
	};
	Stadium.Mk = (a, b) => {
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
			b.Z = ObjectCastUtil.G(f, objNumber);
		if (g != null)
			b.m = ObjectCastUtil.G(g, objNumber);
		if (k != null)
			b.aa = ObjectCastUtil.G(k, objNumber);
		if (l != null)
			b.Ca = ObjectCastUtil.G(l, objNumber);
		if (t != null)
			b.R = Stadium.$f(t);
		if (m != null)
			b.h = Stadium.Fc(m);
		if (n != null)
			b.v = Stadium.Fc(n);
		return b;
	};
	Stadium.ka = (a, b, c, d) => {
		if (d != c)
			a[b] = c;
	};
	Stadium.prototype = {
		dg: () => {
			var a = new Disc;
			a.R = 16777215;
			a.h = 63;
			a.v = 193;
			a.Z = 10;
			a.Ca = 0.99;
			a.aa = 1;
			a.m = 0.5;
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
					var e = new Point(0, 0);
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
				var e = new Vertex;
				e.ja(a);
				e.ud = d;
				this.J.push(e);
			}
			this.U = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new Segment;
				e.ja(a, this.J);
				this.U.push(e);
			}
			this.qa = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new Plane;
				e.ja(a);
				this.qa.push(e);
			}
			this.tc = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new Goal;
				e.ja(a);
				this.tc.push(e);
			}
			this.F = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new Disc;
				e.ja(a);
				this.F.push(e);
			}
			this.pb = [];
			c = a.B();
			for (d = 0; c > d; d++) {
				e = new Joint;
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
			return a != null ? ObjectCastUtil.G(a, objNumber) : c;
		}, op: (a, b, c) => {
			a = a[b];
			return a != null ? ObjectCastUtil.G(a, objBoolean) : c;
		}, se: function () {
			return JSON.stringify(this.Hr());
		}, Hr: function () {
			if (!this.Lf) {
				//throw new q(0); // disabled canBeStored check
				console.debug(this.w + ' canBeStored bypassed');
			}
			for (var a = {}, b = 0, c = [], d = 0, e = this.J; e.length > d;) {
				var f = e[d];
				++d;
				f.ud = b++;
				c.push(Stadium.Tr(f));
			}
			d = new Segment;
			b = [];
			e = 0;
			for (f = this.U; f.length > e; e++)
				b.push(Stadium.fr(f[e], d));
			d = [];
			e = 0;
			for (f = this.qa; f.length > e; e++)
				d.push(Stadium.gq(f[e]));
			for (var e = [], f = 0, g = this.tc; g.length > f; f++)
				e.push(Stadium.Jo(g[f]));
			for (var f = Stadium.jq(this.ge), k = new Disc, g = [], l = 0, t = this.F; t.length > l; l++)
				g.push(Stadium.mo(t[l], k));
			k = [];
			l = 0;
			for (t = this.pb; t.length > l; l++)
				k.push(Stadium.ap(t[l]));
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
			Stadium.ka(c, 'maxViewWidth', this.Ye, 0);
			Stadium.ka(c, 'cameraFollow', this.Ge == 1 ? 'player' : '', '');
			Stadium.ka(c, 'spawnDistance', this.kc, 200);
			if (k.length != 0)
				c.joints = k;
			if (l.length != 0)
				c.redSpawnPoints = l;
			if (t.length != 0)
				c.blueSpawnPoints = t;
			Stadium.ka(c, 'kickOffReset', this.pf ? 'full' : 'partial', 'partial');
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
			Stadium.ka(a, 'type', b, 'none');
			Stadium.ka(a, 'width', this.Td, 0);
			Stadium.ka(a, 'height', this.Sd, 0);
			Stadium.ka(a, 'kickOffRadius', this.kd, 0);
			Stadium.ka(a, 'cornerRadius', this.Uc, 0);
			Stadium.qg(a, this.jd, 7441498);
			Stadium.ka(a, 'goalLine', this.Fe, 0);
			return c;
		}, Lk: function (a) {
			function b(a) {
				var b = ObjectCastUtil.G(a[0], objNumber);
				a = ObjectCastUtil.G(a[1], objNumber);
				return new Point(b, a);
			}

			function c(a, b, c, d) {
				if (d == null)
					d = false;
				var f = e[b];
				if (!d || f != null) {
					if (d = ObjectCastUtil.G(f, Array), d != null) {
						for (f = 0; d.length > f; f++) {
							var k = d[f];
							try {
								Stadium.wn(k, g);
								a.push(c(k));
							}
							catch (wc) {
								throw new GlobalError(new Dbb('Error in "' + b + '" index: ' + a.length));
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
			this.w = ObjectCastUtil.G(e.name, String);
			this.$b = ObjectCastUtil.G(e.width, objNumber);
			this.qc = ObjectCastUtil.G(e.height, objNumber);
			this.Ye = this.be(e, 'maxViewWidth', 0) | 0;
			if (e.cameraFollow == 'player')
				this.Ge = 1;
			this.kc = 200;
			a = e.spawnDistance;
			if (a != null)
				this.kc = ObjectCastUtil.G(a, objNumber);
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
				this.jd = Stadium.$f(a.color);
			this.Fe = this.be(a, 'goalLine', 0);
			this.Lf = this.op(e, 'canBeStored', true);
			this.pf = e.kickOffReset == 'full';
			var g = e.traits;
			a = e.ballPhysics;
			if (a != 'disc0')
				if (a != null) {
					a = Stadium.Mk(a, this.dg());
					a.v |= 192;
					this.F.push(a);
				}
				else
					this.F.push(this.dg());
			c(this.J, 'vertexes', Stadium.np);
			c(this.U, 'segments', a => Stadium.mp(a, d.J));
			c(this.tc, 'goals', Stadium.ip);
			c(this.F, 'discs', a => Stadium.Mk(a, new Disc));
			c(this.qa, 'planes', Stadium.kp);
			c(this.pb, 'joints', a => Stadium.jp(a, d.F), true);
			c(this.Dd, 'redSpawnPoints', b, true);
			c(this.md, 'blueSpawnPoints', b, true);
			a = e.playerPhysics;
			if (a != null)
				this.ge = Stadium.lp(a);
			if (this.J.length > 255 || this.U.length > 255 || this.qa.length > 255 || this.tc.length > 255 || this.F.length > 255)
				throw new GlobalError('Error');
			this.he();
		}, Sj: function () {
			var a = Stadium.streamWriterInst;
			a.a = 0;
			this.ga(a);
			var b = new HashDc;
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
			return Team.spec;
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
			this.kc = 0.75 * d;
			if (this.kc > 400)
				this.kc = 400;
			a = new Plane;
			var l = a.wa;
			l.x = 0;
			l.y = 1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new Plane;
			l = a.wa;
			l.x = 0;
			l.y = -1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new Plane;
			l = a.wa;
			l.x = 1;
			l.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			a = new Plane;
			l = a.wa;
			l.x = -1;
			l.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			this.eg(d, 1, f, 13421823, Team.blue);
			this.eg(-d, -1, f, 16764108, Team.red);
			this.Rk(g, c);
			b = new Plane;
			c = b.wa;
			c.x = 0;
			c.y = 1;
			b.Ua = -e;
			b.h = 1;
			this.qa.push(b);
			b = new Plane;
			c = b.wa;
			c.x = 0;
			c.y = -1;
			b.Ua = -e;
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
			l = a.a;
			l.x = d;
			l.y = f;
			a.h = 0;
			var l = new Vertex;
			var h = l.a;
			h.x = d;
			h.y = e;
			l.h = 0;
			var h = new Vertex;
			var m = h.a;
			m.x = -d;
			m.y = e;
			h.h = 0;
			var m = new Vertex;
			var n = m.a;
			n.x = -d;
			n.y = f;
			m.h = 0;
			var n = new Vertex;
			var q = n.a;
			q.x = -d;
			q.y = -f;
			n.h = 0;
			f = new Segment;
			f.W = c;
			f.ca = g;
			f.h = 1;
			f.Za = false;
			q = new Segment;
			q.W = a;
			q.ca = l;
			q.h = 1;
			q.Za = false;
			var r = new Segment;
			r.W = h;
			r.ca = m;
			r.h = 1;
			r.Za = false;
			var u = new Segment;
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
			this.kc = 0.75 * (d - g);
			if (this.kc > 400)
				this.kc = 400;
			a = new Plane;
			var h = a.wa;
			h.x = 0;
			h.y = 1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new Plane;
			h = a.wa;
			h.x = 0;
			h.y = -1;
			a.Ua = -c;
			a.m = 0;
			this.qa.push(a);
			a = new Plane;
			h = a.wa;
			h.x = 1;
			h.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			a = new Plane;
			h = a.wa;
			h.x = -1;
			h.y = 0;
			a.Ua = -b;
			a.m = 0;
			this.qa.push(a);
			this.eg(d - g, 1, f, 13421823, Team.blue, 63);
			this.eg(-d + g, -1, f, 16764108, Team.red, 63);
			this.Rk(k, c);
			b = new Plane;
			c = b.wa;
			c.x = 0;
			c.y = 1;
			b.Ua = -e;
			b.h = 1;
			this.qa.push(b);
			b = new Plane;
			c = b.wa;
			c.x = 0;
			c.y = -1;
			b.Ua = -e;
			b.h = 1;
			this.qa.push(b);
			b = new Plane;
			c = b.wa;
			c.x = 1;
			c.y = 0;
			b.Ua = -d;
			b.h = 1;
			this.qa.push(b);
			b = new Plane;
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
			var k = new Vertex;
			var l = k.a;
			l.x = a + 8 * b;
			l.y = -c;
			var l = new Vertex;
			var h = l.a;
			h.x = a + 8 * b;
			h.y = c;
			var m = new Vertex;
			var h = m.a;
			h.x = k.a.x + 22 * b;
			h.y = k.a.y + 22;
			var n = new Vertex;
			var h = n.a;
			h.x = l.a.x + 22 * b;
			h.y = l.a.y - 22;
			h = new Segment;
			h.W = k;
			h.ca = m;
			h.Oc(90 * b);
			var p = new Segment;
			p.W = n;
			p.ca = m;
			var q = new Segment;
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
				this.J[l].m = 0.1;
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
				this.U[l].m = 0.1;
			}
			f = new Disc;
			g = f.a;
			g.x = a;
			g.y = -c;
			f.aa = 0;
			f.Z = 8;
			f.R = d;
			this.F.push(f);
			f = new Disc;
			g = f.a;
			g.x = a;
			g.y = c;
			f.aa = 0;
			f.Z = 8;
			f.R = d;
			this.F.push(f);
			d = new Goal;
			f = d.W;
			f.x = a;
			f.y = -c;
			f = d.ca;
			f.x = a;
			f.y = c;
			d.qe = e;
			this.tc.push(d);
		}, Rk: function (a, b) {
			var c = new Vertex;
			var d = c.a;
			d.x = 0;
			d.y = -b;
			c.m = 0.1;
			c.v = 24;
			c.h = 6;
			var d = new Vertex;
			var e = d.a;
			e.x = 0;
			e.y = -a;
			d.m = 0.1;
			d.v = 24;
			d.h = 6;
			var e = new Vertex;
			var f = e.a;
			f.x = 0;
			f.y = a;
			e.m = 0.1;
			e.v = 24;
			e.h = 6;
			var f = new Vertex;
			var g = f.a;
			g.x = 0;
			g.y = b;
			f.m = 0.1;
			f.v = 24;
			f.h = 6;
			g = new Segment;
			g.W = c;
			g.ca = d;
			g.v = 24;
			g.h = 6;
			g.Za = false;
			g.m = 0.1;
			var k = new Segment;
			k.W = e;
			k.ca = f;
			k.v = 24;
			k.h = 6;
			k.Za = false;
			k.m = 0.1;
			var l = new Segment;
			l.W = d;
			l.ca = e;
			l.v = 8;
			l.h = 6;
			l.Za = false;
			l.Oc(180);
			l.m = 0.1;
			var h = new Segment;
			h.W = e;
			h.ca = d;
			h.v = 16;
			h.h = 6;
			h.Za = false;
			h.Oc(180);
			h.m = 0.1;
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
				var d = new Vertex;
				var e = d.a;
				e.x = -a + c;
				e.y = -b;
				d.h = 0;
				var e = new Vertex;
				var f = e.a;
				f.x = -a;
				f.y = -b + c;
				e.h = 0;
				var f = new Vertex;
				var g = f.a;
				g.x = -a + c;
				g.y = b;
				f.h = 0;
				var g = new Vertex;
				var k = g.a;
				k.x = -a;
				k.y = b - c;
				g.h = 0;
				var k = new Vertex;
				var l = k.a;
				l.x = a - c;
				l.y = b;
				k.h = 0;
				var l = new Vertex;
				var h = l.a;
				h.x = a;
				h.y = b - c;
				l.h = 0;
				var h = new Vertex;
				var m = h.a;
				m.x = a - c;
				m.y = -b;
				h.h = 0;
				var m = new Vertex;
				var n = m.a;
				n.x = a;
				n.y = -b + c;
				m.h = 0;
				a = new Segment;
				a.W = d;
				a.ca = e;
				a.h = 1;
				a.Za = false;
				a.m = 1;
				a.Oc(-90);
				b = new Segment;
				b.W = f;
				b.ca = g;
				b.h = 1;
				b.Za = false;
				b.m = 1;
				b.Oc(90);
				c = new Segment;
				c.W = k;
				c.ca = l;
				c.h = 1;
				c.Za = false;
				c.m = 1;
				c.Oc(-90);
				n = new Segment;
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
		}, f: Stadium
	};
	TeamColors.b = true;
	TeamColors.prototype = {
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
				throw new GlobalError('too many');
			this.fb = [];
			for (var c = 0; b > c;) {
				++c;
				this.fb.push(a.M());
			}
		}, f: TeamColors
	};
	Team.b = true;
	Team.prototype = {f: Team};
	Room.b = true;
	Room.Rd = [Dta, Mcc];
	Room.qd = (a, b) => {
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
	Room.prototype = {
		yr: function (a) {
			if (this.K == null) {
				this.K = new Game;
				for (var b = 0, c = this.I; c.length > b; b++) {
					var d = c[b];
					d.H = null;
					d.Jb = 0;
				}
				this.K.Wo(this);
				if (this.onGameStartFun != null)
					this.onGameStartFun(a);
			}
		}, Mf: function (a, b, c) {
			if (c != b.ea) {
				b.ea = c;
				StringOpsSubstr.remove(this.I, b);
				this.I.push(b);
				if (this.K != null) {
					if (b.H != null) {
						StringOpsSubstr.remove(this.K.ta.F, b.H);
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
				Dcb.i(this.onPlayerTeamChangeFun, a, b, c);
			}
		}, getFullPlayerById: function (id) {
			for (var b = 0, c = this.I; c.length > b; b++) {
				var d = c[b];
				if (id == d.V)
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
			this.S = Stadium.ja(a);
			var b = a.B() != 0;
			this.K = null;
			if (b) {
				this.K = new Game;
				this.K.ja(a, this);
			}
			for (var b = this.K == null ? null : this.K.ta.F, c = a.B(), d = this.I; c < d.length;)
				d.pop();
			for (d = 0; c > d;) {
				var e = new FullPlayer;
				e.va(a, b);
				this.I[d++] = e;
			}
			this.kb[1].ja(a);
			this.kb[2].ja(a);
		}, uk: function () {
			var a = 0;
			var b = StreamWriter.ha();
			this.ga(b);
			for (b = b.Gr(); b.o.byteLength - b.a >= 4;)
				a ^= b.M();
			return a;
		}, Ao: function () {
			var a = StreamWriter.ha(4);
			a.O(this.uk());
			return a.Kg();
		}, Sn: function (a) {
			a = (new StreamReader(new DataView(a))).M();
			Yyy.i(this.ko, a != this.uk());
		}, km: function (a) {
			this.Ol = a;
		}, Lb: function (a) {
			if (a == 0)
				return true;
			a = this.getFullPlayerById(a);
			return a != null && a.cb ? true : false;
		}, mr: function (a, b, c, d) {
			this.yd = b < 0 ? 0 : b > 255 ? 255 : b;
			this.Zc = c < 0 ? 0 : c > 255 ? 255 : c;
			d = d < 0 ? 0 : d > 100 ? 100 : d;
			this.ce = this.Zc * d;
			FunM.i(this.onKickRateLimitSetFun, a, this.yd, this.Zc, d);
		}, sc: function () {
			var a = Mya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new Room;
				this.hc = a;
				Room.qd(b, this);
			}
			return b;
		}, f: Room
	};
	FullPlayer.b = true;
	FullPlayer.Rd = [Dta];
	FullPlayer.$r = (a, b) => {
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
	FullPlayer.prototype = {
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
			this.ea = c == 1 ? Team.red : c == 2 ? Team.blue : Team.spec;
			c = a.ni();
			this.H = c < 0 ? null : b[c];
		}, hs: function () {
			var a = Mya.zc;
			var b = this.an;
			if (a != this.zc) {
				if (b == null)
					this.an = b = new FullPlayer;
				this.zc = a;
				FullPlayer.$r(b, this);
			}
			return b;
		}, f: FullPlayer
	};
	Mta.b = true;
	Mta.la = a => {
		var b = new Mta;
		b.Yg = a;
		return b;
	};
	Mta.ma = Manager;
	Mta.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			var b = a.getFullPlayerById(this.P);
			if (b != null && b.Ld != this.Yg) {
				b.Ld = this.Yg;
				Yyy.i(a.onPlayerDesyncChangeFun, b);
			}
		}, ua: function (a) {
			a.l(this.Yg ? 1 : 0);
		}, va: function (a) {
			this.Yg = a.B() != 0;
		}, f: Mta
	});
	Mrb.b = true;
	Mrb.ma = Manager;
	Mrb.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (this.P == 0)
				FunM.i(a.onAnnouncementFun, this.Tc, this.color, this.style, this.fn);
		}, ua: function (a) {
			a.mc(StringOpsLimit.Qc(this.Tc, 1000));
			a.O(this.color);
			a.l(this.style);
			a.l(this.fn);
		}, va: function (a) {
			this.Tc = a.ic();
			if (this.Tc.length > 1000)
				throw new GlobalError('message too long');
			this.color = a.M();
			this.style = a.B();
			this.fn = a.B();
		}, f: Mrb
	});
	Dqa.b = true;
	Dqa.ma = Manager;
	Dqa.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 1)) {
				for (var b = a.getFullPlayerById(this.P), c = a.I, d = [], e = 0, f = 0, g = 0; c.length > g; g++) {
					var k = c[g];
					if (Team.spec == k.ea)
						d.push(k);
					if (Team.red == k.ea)
						++e;
					else if (Team.blue == k.ea)
						++f;
				}
				c = d.length;
				if (c != 0) {
					if (e == f) {
						if (c >= 2) {
							a.Mf(b, d[0], Team.red);
							a.Mf(b, d[1], Team.blue);
						}
					}
					else
						a.Mf(b, d[0], e < f ? Team.red : Team.blue);
				}
			}
		}, ua: () => {
		}, va: () => {
		}, f: Dqa
	});
	Mda.b = true;
	Mda.la = (a, b) => {
		var c = new Mda;
		c.rj = a;
		c.newValue = b;
		return c;
	};
	Mda.ma = Manager;
	Mda.prototype = Extend(Manager.prototype, {
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
		}, f: Mda
	});
	Msa.b = true;
	Msa.la = (a, b) => {
		var c = new Msa;
		c.Md = a;
		c.Xg = b;
		return c;
	};
	Msa.ma = Manager;
	Msa.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 4)) {
				var b = a.getFullPlayerById(this.P);
				var c = a.getFullPlayerById(this.Md);
				if (c != null && c.V != 0 && this.Xg != c.cb) {
					c.cb = this.Xg;
					if (a.onPlayerAdminChangeFun != null)
						a.onPlayerAdminChangeFun(b, c);
				}
			}
		}, ua: function (a) {
			a.O(this.Md);
			a.l(this.Xg ? 1 : 0);
		}, va: function (a) {
			this.Md = a.M();
			this.Xg = a.B() != 0;
		}, f: Msa
	});
	Mra.b = true;
	Mra.la = text => {
		const mra1 = new Mra;
		mra1.Zb = text;
		return mra1;
	};
	Mra.ma = Manager;
	Mra.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			a = a.getFullPlayerById(this.P);
			if (a != null)
				a.Xb = this.Zb;
		}, ua: function (a) {
			a.Db(this.Zb);
		}, va: function (a) {
			this.Zb = a.zb();
			if (this.Zb != null)
				this.Zb = StringOpsLimit.Qc(this.Zb, 2);
		}, f: Mra
	});
	Dss.b = true;
	Dss.la = (a, b) => {
		var c = new Dss;
		c.Md = a;
		c.jj = b;
		return c;
	};
	Dss.ma = Manager;
	Dss.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			var b = a.getFullPlayerById(this.Md);
			if (b != null) {
				var c = a.getFullPlayerById(this.P);
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
			this.jj = a == 1 ? Team.red : a == 2 ? Team.blue : Team.spec;
		}, f: Dss
	});
	Mqa.b = true;
	Mqa.la = a => {
		var b = new Mqa;
		b.Pd = a;
		return b;
	};
	Mqa.ma = Manager;
	Mqa.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 8)) {
				var b = a.getFullPlayerById(this.P);
				if (a.K == null) {
					a.S = this.Pd;
					if (a.onStadiumChangeFun != null)
						a.onStadiumChangeFun(b, this.Pd);
				}
			}
		}, ua: function (a) {
			var b = StreamWriter.ha();
			this.Pd.ga(b);
			b = pako.deflateRaw(b.Sb());
			a.Ub(b.byteLength);
			a.Vb(b);
		}, va: function (a) {
			a = pako.inflateRaw(a.sb(a.Ob()));
			this.Pd = Stadium.ja(new StreamReader(new DataView(a.buffer, a.byteOffset, a.byteLength)));
		}, f: Mqa
	});
	TeamColorsUtil.b = true;
	TeamColorsUtil.ma = Manager;
	TeamColorsUtil.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 2) && Team.spec != this.ea)
				a.kb[this.ea.$] = this.Sg;
		}, ua: function (a) {
			a.l(this.ea.$);
			this.Sg.ga(a);
		}, va: function (a) {
			var b = a.lf();
			this.ea = b == 1 ? Team.red : b == 2 ? Team.blue : Team.spec;
			this.Sg = new TeamColors;
			this.Sg.ja(a);
		}, f: TeamColorsUtil
	});
	Mpa.b = true;
	Mpa.la = a => {
		var b = new Mpa;
		b.newValue = a;
		return b;
	};
	Mpa.ma = Manager;
	Mpa.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 2))
				a.Pc = this.newValue;
		}, ua: function (a) {
			a.l(this.newValue ?
				1 : 0);
		}, va: function (a) {
			this.newValue = a.B() != 0;
		}, f: Mpa
	});
	Moa.b = true;
	Moa.la = (a, b, c, d) => {
		var e = new Moa;
		e.V = a;
		e.name = b;
		e.cj = c;
		e.Xb = d;
		return e;
	};
	Moa.ma = Manager;
	Moa.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (this.P == 0) {
				var b = new FullPlayer;
				b.V = this.V;
				b.w = this.name;
				b.Kd = this.cj;
				b.Xb = this.Xb;
				a.I.push(b);
				a = a.onPlayerJoinFun;
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
		}, f: Moa
	});
	Mqb.b = true;
	Mqb.ma = Manager;
	Mqb.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			a = a.getFullPlayerById(this.ze);
			if (a != null && this.P == 0)
				a.Jd = this.Zb;
		}, ua: function (a) {
			a.Db(this.Zb);
			a.O(this.ze);
		}, va: function (a) {
			this.Zb = a.zb();
			this.ze = a.M();
			if (this.Zb != null)
				this.Zb = StringOpsLimit.Qc(this.Zb, 2);
		}, f: Mqb
	});
	Doa.b = true;
	Doa.ma = Manager;
	Doa.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			var b = a.K;
			if (b != null && a.Lb(this.P, 16)) {
				var c = a.getFullPlayerById(this.P);
				var d = b.OaFramesField == 120;
				var e = b.OaFramesField > 0;
				if (this.Bf)
					b.OaFramesField = 120;
				else if (b.OaFramesField == 120)
					b.OaFramesField = 119;
				if (this.Bf != d)
					Dcb.i(a.onGamePauseFun, c, this.Bf, e);
			}
		}, ua: function (a) {
			a.l(this.Bf ? 1 : 0);
		}, va: function (a) {
			this.Bf = a.B() != 0;
		}, f: Doa
	});
	Dna.b = true;
	Dna.ma = Manager;
	Dna.prototype = Extend(Manager.prototype, {
		$m: function (a) {
			if (a.hq != null) {
				var b = a.getFullPlayerById(this.P);
				return b == null ? false : a.hq(b, this.Tc);
			}
			return true;
		}, apply: function (a) {
			var b = a.getFullPlayerById(this.P);
			if (b != null)
				Mia.i(a.onPlayerChatFun, b, this.Tc);
		}, ua: function (a) {
			a.mc(StringOpsLimit.Qc(this.Tc, 140));
		}, va: function (a) {
			this.Tc = a.ic();
			if (this.Tc.length > 140)
				throw new GlobalError('message too long');
		}, f: Dna
	});
	Dga.b = true;
	Dga.ma = Manager;
	Dga.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			var b = a.getFullPlayerById(this.P);
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
		}, f: Dga
	});
	Mna.b = true;
	Mna.la = a => {
		var b = new Mna;
		b.sj = a;
		return b;
	};
	Mna.ma = Manager;
	Mna.prototype = Extend(Manager.prototype, {
		apply: function (roomInst) {
			const fullPlayer = roomInst.getFullPlayerById(this.P);
			if (fullPlayer != null)
				Mia.i(roomInst.onChatIndicatorStateChangeFun, fullPlayer, this.sj);
		}, ua: function (a) {
			a.l(this.sj);
		}, va: function (a) {
			this.sj = a.B();
		}, f: Mna
	});
	Mkc.b = true;
	Mkc.fj = () => {
		Manager.Ha(Mrb);
		Manager.Ha(Mna);
		Manager.Ha(Dua);
		Manager.Ha(Dga);
		Manager.Ha(Dna);
		Manager.Ha(Moa);
		Manager.Ha(Dyy);
		Manager.Ha(Dma);
		Manager.Ha(Dla);
		Manager.Ha(Doa);
		Manager.Ha(Mda);
		Manager.Ha(Mqa);
		Manager.Ha(Dss);
		Manager.Ha(Mpa);
		Manager.Ha(Msa);
		Manager.Ha(Dqa);
		Manager.Ha(Mta);
		Manager.Ha(Mla);
		Manager.Ha(Mra);
		Manager.Ha(TeamColorsUtil);
		Manager.Ha(Mpb);
		Manager.Ha(Mma);
		Manager.Ha(Mqb);
		Manager.Ha(Mob);
	};
	Dyy.b = true;
	Dyy.la = (a, b, c) => {
		var d = new Dyy;
		d.V = a;
		d.fd = b;
		d.Qg = c;
		return d;
	};
	Dyy.ma = Manager;
	Dyy.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (this.V != 0 && a.Lb(this.P, 128)) {
				var fullPlayer = a.getFullPlayerById(this.V);
				if (fullPlayer != null) {
					var c = a.getFullPlayerById(this.P);
					StringOpsSubstr.remove(a.I, fullPlayer);
					if (a.K != null)
						StringOpsSubstr.remove(a.K.ta.F, fullPlayer.H);
					FunM.i(a.onPlayerLeaveFun, fullPlayer, this.fd, this.Qg, c);
				}
			}
		}, ua: function (a) {
			if (this.fd != null)
				this.fd = StringOpsLimit.Qc(this.fd, 100);
			a.O(this.V);
			a.Db(this.fd);
			a.l(this.Qg ? 1 : 0);
		}, va: function (a) {
			this.V = a.M();
			this.fd = a.zb();
			this.Qg = a.B() != 0;
			if (this.fd != null && this.fd.length > 100)
				throw new GlobalError('string too long');
		}, f: Dyy
	});
	Mpb.b = true;
	Mpb.ma = Manager;
	Mpb.prototype = Extend(Manager.prototype, {
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
						b.delete(f);
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
		}, f: Mpb
	});
	Mob.b = true;
	Mob.ma = Manager;
	Mob.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (this.P == 0) {
				var b = a.K;
				if (b != null) {
					if (this.Sm) {
						a = a.getFullPlayerById(this.ze);
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
		}, f: Mob
	});
	Mma.b = true;
	Mma.la = (a, b, c) => {
		var d = new Mma;
		d.min = a;
		d.nj = b;
		d.aj = c;
		return d;
	};
	Mma.ma = Manager;
	Mma.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 2))
				a.mr(a.getFullPlayerById(this.P), this.min, this.nj, this.aj);
		}, ua: function (a) {
			a.O(this.min);
			a.O(this.nj);
			a.O(this.aj);
		}, va: function (a) {
			this.min = a.M();
			this.nj = a.M();
			this.aj = a.M();
		}, f: Mma
	});
	Dma.b = true;
	Dma.ma = Manager;
	Dma.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 32))
				a.yr(a.getFullPlayerById(this.P), 0);
		}, ua: () => {
		}, va: () => {
		}, f: Dma
	});
	Dla.b = true;
	Dla.ma = Manager;
	Dla.prototype = Extend(Manager.prototype, {
		apply: function (a) {
			if (a.Lb(this.P, 32)) {
				var b = a.getFullPlayerById(this.P);
				if (a.K != null) {
					a.K = null;
					for (var c = 0, d = a.I; d.length > c; c++) {
						var e = d[c];
						e.H = null;
						e.Jb = 0;
					}
					if (a.onGameStopFun != null)
						a.onGameStopFun(b);
				}
			}
		}, ua: () => {
		}, va: () => {
		}, f: Dla
	});
	Mla.b = true;
	Mla.la = a => {
		for (var b = new Mla, c = a.T.I, d = [], e = 0; c.length > e;) {
			var f = a.Ie.get(c[e++].V);
			d.push(f == null ? 0 : f.yb);
		}
		b.we = d;
		return b;
	};
	Mla.ma = Manager;
	Mla.prototype = Extend(Manager.prototype, {
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
		}, f: Mla
	});
	DynamicDisc.b = true;
	DynamicDisc.Rd = [Dta];
	DynamicDisc.qd = (a, b) => {
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
	DynamicDisc.prototype = {
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
			var a = Mya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new DynamicDisc;
				this.hc = a;
				DynamicDisc.qd(b, this);
			}
			return b;
		}, f: DynamicDisc
	};
	Joint.b = true;
	Joint.Rd = [Dta];
	Joint.prototype = {
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
						d = 0.5;
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
						d = this.ne * f * 0.5, e *= d, c *= d, k = d = b.D, b = b.aa, d.x = k.x + e * b, d.y = k.y + c * b, d = b = a.D, a = a.aa, b.x = d.x + -e * a, b.y = d.y + -c * a;
					else {
						g = f * d;
						var l = b.a;
						var h = b.a;
						l.x = h.x + e * g * 0.5;
						l.y = h.y + c * g * 0.5;
						h = l = a.a;
						f -= g;
						l.x = h.x - e * f * 0.5;
						l.y = h.y - c * f * 0.5;
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
		}, f: Joint
	};
	DynamicObjectsUtil.b = true;
	DynamicObjectsUtil.Rd = [Dta];
	DynamicObjectsUtil.qd = (a, b) => {
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
	DynamicObjectsUtil.prototype = {
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
				var d = new DynamicDisc;
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
			var a = Mya.zc;
			var b = this.gc;
			if (a != this.hc) {
				if (b == null)
					this.gc = b = new DynamicObjectsUtil;
				this.hc = a;
				DynamicObjectsUtil.qd(b, this);
			}
			return b;
		}, f: DynamicObjectsUtil
	};
	Plane.b = true;
	Plane.prototype = {
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
		}, f: Plane
	};
	Segment.b = true;
	Segment.prototype = {
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
			a *= 0.017453292519943295;
			if (a < 0) {
				a = -a;
				var b = this.W;
				this.W = this.ca;
				this.ca = b;
				this.Cc = -this.Cc;
			}
			if (Segment.segVal1 < a && Segment.segVal2 > a)
				this.vb = 1 / Math.tan(a / 2);
		}, Co: function () {
			return 0 * this.vb != 0 ? 0 : 114.59155902616465 * Math.atan(1 / this.vb);
		}, he: function () {
			if (0 * this.vb == 0) {
				var a = this.ca.a;
				var b = this.W.a;
				var c = 0.5 * (a.x - b.x);
				var a = 0.5 * (a.y - b.y);
				var b = this.W.a;
				var d = this.vb;
				this.Xd = new Point(b.x + c + -a * d, b.y + a + c * d);
				a = this.W.a;
				b = this.Xd;
				c = a.x - b.x;
				a = a.y - b.y;
				this.Yj = Math.sqrt(c * c + a * a);
				c = this.W.a;
				a = this.Xd;
				this.Hg = new Point(-(c.y - a.y), c.x - a.x);
				c = this.Xd;
				a = this.ca.a;
				this.Ig = new Point(-(c.y - a.y), c.x - a.x);
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
				this.wa = new Point(a / b, c / b);
			}
		}, f: Segment
	};
	Vertex.b = true;
	Vertex.prototype = {
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
		}, f: Vertex
	};
	MajorCanvas.b = true;
	MajorCanvas.rgbaStringFromInt = a => 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)';
	MajorCanvas.setCtxImageSmoothing = (context, smoothingEnabled) => {
		context.imageSmoothingEnabled = smoothingEnabled;
		context.mozImageSmoothingEnabled = smoothingEnabled;
	};
	MajorCanvas.prototype = {
		Po: function (a, b) {
			const c = this.ddMap.get(a.V);
			if (c != null) switch (b) {
				case 0:
					c.Xf = true;
					break;
				case 1:
					c.Xf = false;
			}
		}, fixCanvasDimensions: function () {
			if (this.canvasElemField.parentElement != null) {
				const ratio = window.devicePixelRatio * this.zg;
				const boundingClientRect = this.canvasElemField.getBoundingClientRect();
				const width = Math.round(boundingClientRect.width * ratio);
				const height = Math.round(boundingClientRect.height * ratio);
				if (width != this.canvasElemField.width || height != this.canvasElemField.height) {
					this.canvasElemField.width = width;
					this.canvasElemField.height = height;
				}
			}
		}, Kc: function (a, b) {
			const perf = window.performance.now();
			const secondsElapsed = (perf - this.$cPerf) / 1000;
			this.$cPerf = perf;
			this.jgMap.clear();
			this.fixCanvasDimensions();
			MajorCanvas.setCtxImageSmoothing(this.c, true);
			this.c.resetTransform();
			if (a.K != null) {
				var c = a.K;
				var e = c.ta;
				var f = a.getFullPlayerById(b);
				var g = f != null ? f.H : null;
				var k = this.jf != 0 ? this.canvasElemField.height / this.jf : this.kf * window.devicePixelRatio * this.zg;
				var h = this.xf * this.zg;
				var m = c.S.Ye;
				var n = this.canvasElemField.width / k;
				if (m > 0 && m < n) {
					n = m;
					k = this.canvasElemField.width / m;
				}
				m = (this.canvasElemField.height - h) / k;
				this.Mr(c, g, n, m, secondsElapsed);
				for (var p = 0, q = a.I; q.length > p;) {
					var r = q[p];
					++p;
					if (r.H != null) {
						var u = this.ddMap.get(r.V);
						if (u == null) {
							u = new PlayerBallCanvas;
							this.ddMap.set(r.V, u);
						}
						u.C(r, a);
						this.jgMap.set(r.H, u);
					}
				}
				this.c.translate(this.canvasElemField.width / 2, (this.canvasElemField.height + h) / 2);
				this.c.scale(k, k);
				this.c.translate(-this.yaPoint.x, -this.yaPoint.y);
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
					this.drawMarkerCircle(g.a);
				this.c.lineWidth = 2;
				f = 0;
				for (g = a.I; g.length > f;) {
					n = g[f];
					++f;
					m = n.H;
					if (m != null)
						this.Ll(m, this.ddMap.get(n.V));
				}
				f = 0;
				for (e = e.F; e.length > f;) {
					g = e[f];
					++f;
					if (this.jgMap.get(g) == null)
						this.Ll(g, null);
				}
				this.c.lineWidth = 3;
				this.c.resetTransform();
				this.c.translate(this.canvasElemField.width / 2, this.canvasElemField.height / 2);
				this.drawUnpauseBar(c);
				if (c.OaFramesField <= 0) {
					this.td.C(secondsElapsed);
					this.td.Kc(this.c);
				}
				this.jgMap.clear();
				this.Kq(a);
			}
		}, Kq: function (a) {
			var b = new Set;
			var c = 0;
			for (a = a.I; a.length > c;)
				b.add(a[c++].V);
			c = this.ddMap.keys();
			for (a = c.next(); !a.done;) {
				var d = a.value;
				a = c.next();
				if (!b.has(d))
					this.ddMap.delete(d);
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
				f = 0.5 * (f + k.x);
				g = 0.5 * (g + k.y);
				var h = 0.5 * c;
				var m = 0.5 * d;
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
			e = this.yaPoint;
			b = this.yaPoint;
			n *= 0.04;
			h = b.x;
			b = b.y;
			e.x = h + (f - h) * n;
			e.y = b + (g - b) * n;
			this.Xn(c, d, a.S);
		}, Xn: function (a, b, c) {
			if (2 * c.$b < a)
				this.yaPoint.x = 0;
			else {
				if (c.$b < this.yaPoint.x + 0.5 * a)
					this.yaPoint.x = c.$b - 0.5 * a;
				else if (-c.$b > this.yaPoint.x - 0.5 * a)
					this.yaPoint.x = -c.$b + 0.5 * a;
			}
			if (2 * c.qc < b)
				this.yaPoint.y = 0;
			else {
				if (c.qc < this.yaPoint.y + 0.5 * b)
					this.yaPoint.y = c.qc - 0.5 * b;
				else if (-c.qc > this.yaPoint.y - 0.5 * b)
					this.yaPoint.y = -c.qc + 0.5 * b;
			}
		}, drawMarkerCircle: function (point) {
			this.c.beginPath();
			this.c.strokeStyle = 'white';
			this.c.globalAlpha = 0.3;
			this.c.arc(point.x, point.y, 25, 0, 2 * Math.PI, false);
			this.c.stroke();
			this.c.globalAlpha = 1;
		}, drawUnpauseBar: function (a) {
			var b = a.OaFramesField > 0;
			this.adjustGrayscale(b);
			if (b) {
				if (a.OaFramesField != 120) {
					a = a.OaFramesField / 120 * 200;
					this.c.fillStyle = 'white';
					this.c.fillRect(.5 * -a, 100, a, 20);
				}
				this.td.eq.Tq(this.c);
			}
		}, adjustGrayscale: function (a) {
			if (a != this.Dk) {
				this.canvasElemField.style.filter = a ? 'grayscale(70%)' : '';
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
			MajorCanvas.setCtxImageSmoothing(this.c, false);
			var c = a.Td;
			var d = a.Sd;
			if (a.ld == 1) {
				this.c.save();
				this.c.resetTransform();
				this.c.fillStyle = MajorCanvas.rgbaStringFromInt(a.jd);
				this.c.fillRect(0, 0, this.canvasElemField.width, this.canvasElemField.height);
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
				this.c.rect(this.yaPoint.x - 10000, this.yaPoint.y - 10000, 20000, 20000);
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
				this.c.fillStyle = MajorCanvas.rgbaStringFromInt(a.jd);
				this.c.fillRect(0, 0, this.canvasElemField.width, this.canvasElemField.height);
				this.c.restore();
			}
			MajorCanvas.setCtxImageSmoothing(this.c, true);
		}, Nq: function (a, b) {
			for (var c = ConnectionConstants.localStorageWrapperInst.showIndicatorsStorageUnit.getLSUValue(), d = 0, e = a.I; e.length > d;) {
				var f = e[d];
				++d;
				var g = f.H;
				if (g != null) {
					var g = g.a;
					var h = this.ddMap.get(f.V);
					if (c && h.Xf)
						this.c.drawImage(ConnectionConstants.typingImage, g.x - 0.5 * ConnectionConstants.typingImage.width, g.y - 35);
					if (b != f)
						h.so(this.c, g.x, g.y + 50);
				}
			}
		}, Ll: function (a, b) {
			this.c.beginPath();
			if (b == null) {
				this.c.fillStyle = MajorCanvas.rgbaStringFromInt(a.R);
				this.c.strokeStyle = 'black';
			}
			else {
				this.c.fillStyle = b.Ij;
				this.c.strokeStyle = b.lo;
			}
			this.c.beginPath();
			// It's possible to specify negative radius in hbs file
			if (a.Z < 0)
				a.Z = 0;
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
				this.c.strokeStyle = MajorCanvas.rgbaStringFromInt(a.R);
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
				this.c.strokeStyle = MajorCanvas.rgbaStringFromInt(a.R);
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
			c = 0.5 * c - 25;
			d = 0.5 * d - 25;
			var e = this.yaPoint;
			var f = a.x - e.x;
			var e = a.y - e.y;
			var g = -c;
			var h = -d;
			var l = this.yaPoint;
			c = l.x + (c < f ? c : g > f ? g : f);
			d = l.y + (d < e ? d : h > e ? h : e);
			f = a.x - c;
			a = a.y - d;
			if (f * f + a * a > 900) {
				this.c.fillStyle = 'rgba(0,0,0,0.5)';
				this.pk(c + 2, d + 2, Math.atan2(a, f));
				this.c.fillStyle = MajorCanvas.rgbaStringFromInt(b);
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
			for (var a = this.ddMap.values(), b = a.next(); !b.done;) {
				var c = b.value;
				var b = a.next();
				c.Xf = false;
			}
		}, f: MajorCanvas
	};
	BigAnimatedText.b = true;
	BigAnimatedText.prototype = {
		zo: function () {
			return 2.31 + 0.1155 * (this.We.length - 1);
		}, Kc: function (a, b) {
			var c = b / 2.31;
			var d = 0;
			a.imageSmoothingEnabled = true;
			for (var e = 0, f = this.We; f.length > e;) {
				var g = f[e];
				++e;
				var h = c - 0.05 * d;
				var l = 180 * BigAnimatedText.keyFrames2.eval(h) * ((d & 1) != 0 ? -1 : 1);
				a.globalAlpha = BigAnimatedText.keyFrames1.eval(h);
				a.drawImage(g, l - 0.5 * g.width, 35 * -(this.We.length - 1) + 70 * d - 0.5 * g.height);
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
				a.drawImage(e, 0.5 * -e.width, 35 * -(this.We.length - 1) + 70 * b - 0.5 * e.height);
				++b;
			}
			a.imageSmoothingEnabled = false;
		}, rgbaStringFromInt: a => 'rgba(' + [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() + ',255)', sp: function (a, b) {
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
			d.fillStyle = this.rgbaStringFromInt(b);
			d.fillText(a, 0, 45);
			return c;
		}, f: BigAnimatedText
	};
	BigTextUtil.b = true;
	BigTextUtil.prototype = {
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
		}, f: BigTextUtil
	};
	PlayerBallCanvas.b = true;
	PlayerBallCanvas.Ln = (a, b) => {
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
	PlayerBallCanvas.ao = (a, b) => {
		a.hd = b.hd;
		a.ed = b.ed;
		a.fb = b.fb.slice(0);
	};
	PlayerBallCanvas.prototype = {
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
				var c = ConnectionConstants.localStorageWrapperInst.teamColorsStorageUnit.getLSUValue() ? b.kb[a.ea.$] : a.ea.wm;
				var d = a.Jd != null ? a.Jd : a.Xb;
				var e = ConnectionConstants.localStorageWrapperInst.showAvatarsStorageUnit.getLSUValue() && d != null;
				if (!PlayerBallCanvas.Ln(this.kb, c) || !e && this.uh != a.Jb || e && d != this.Jf) {
					PlayerBallCanvas.ao(this.kb, c);
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
			this.lo = b.K.OaFramesField > 0 || !a.Wb ? 'black' : a.Wb && a.Sc <= 0 && a.yc >= 0 ? 'white' : 'black';
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
					this.rb.fillStyle = MajorCanvas.rgbaStringFromInt(b[e++]);
					this.rb.fillRect(c, -32, d + 4, 64);
					c += d;
				}
				this.rb.restore();
				this.rb.fillStyle = MajorCanvas.rgbaStringFromInt(this.kb.ed);
				this.rb.textAlign = 'center';
				this.rb.textBaseline = 'alphabetic';
				this.rb.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
				this.rb.fillText(a, 32, 44);
				this.Ij = this.rb.createPattern(this.rb.canvas, 'no-repeat');
			}
		}, f: PlayerBallCanvas
	};
	ChangeLocationView.b = true;
	ChangeLocationView.prototype = {
		ki: function (a) {
			for (var b = this, c = 0, d = Dha.ab.length >> 2; d > c;) {
				var e = c++;
				var f = [e];
				var g = Dha.ab[e << 2];
				var e = Dha.ab[(e << 2) + 1].toLowerCase();
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
			var b = new GeoLocation;
			b.ub = Dha.ab[(a << 2) + 1].toLowerCase();
			b.Ec = Dha.ab[(a << 2) + 2];
			b.Gc = Dha.ab[(a << 2) + 3];
			ConnectionConstants.localStorageWrapperInst.Ne.setLSItem(b);
			Daa.i(this.qb);
		}, f: ChangeLocationView
	};
	ChatboxView.b = true;
	ChatboxView.Yo = a => a == a.parentElement.querySelector(':hover');
	ChatboxView.prototype = {
		addAnnouncementToLogAndHandle: function (text, bColor, cStyle) {
			const paragraphElement = window.document.createElement('p');
			paragraphElement.className = 'announcement';
			paragraphElement.textContent = text;
			if (bColor >= 0)
				paragraphElement.style.color = MajorCanvas.rgbaStringFromInt(bColor);
			switch (cStyle) {
				case 1:
				case 4:
					paragraphElement.style.fontWeight = 'bold';
					break;
				case 2:
				case 5:
					paragraphElement.style.fontStyle = 'italic';
			}
			switch (cStyle) {
				case 3:
				case 4:
				case 5:
					paragraphElement.style.fontSize = '12px';
			}
			this.addElementToLogAndHandle(paragraphElement);
		}, addElementToLogAndHandle: function (element) {
			var logHeight = this.logNodeField.clientHeight;
			var bool = 0.5 * -logHeight <= this.logNodeField.scrollTop + logHeight - this.logNodeField.scrollHeight || !ChatboxView.Yo(this.logNodeField);
			this.logNodeField.appendChild(element);
			if (bool)
				this.logNodeField.scrollTop = element.offsetTop;
			for (element = bool ? 50 : 100; element < this.logNodeField.childElementCount;)
				this.logNodeField.firstElementChild.remove();
			this.vg.update();
		}, ba: function (text, paragraphType) {
			const paragraphElement = window.document.createElement('p');
			if (paragraphType != null)
				paragraphElement.className = paragraphType;
			paragraphElement.textContent = text;
			this.addElementToLogAndHandle(paragraphElement);
		}, addNoticeToLogAndHandle: function (text) {
			this.ba(text, 'notice');
		}, f: ChatboxView
	};
	Mention.b = true;
	Mention.vo = a => '.$^{[(|)*+?\\'.indexOf(a) != -1 ? '\\' + a : a;
	Mention.prototype = {
		Qh: function () {
			this.Ui(null);
		}, Hn: function (a, b) {
			var c = this.Iq.exec(StringOpsSubstr.substr(a, 0, b));
			if (c != null) {
				var d = c[0];
				var e = new RegExp(StringOpsSubstr.substr(d, 1, null).split('').map(Mention.vo).join('.*?'), 'i');
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
			a = this.Ek ? '#' + a.$ : '@' + StringOps3.replace(a.w, ' ', '_');
			this.Rp(StringOpsSubstr.substr(this.Ml, 0, this.si) + a + ' ' + StringOpsSubstr.substr(this.Ml, this.si + this.Vq, null), this.si + a.length + 1);
		}, Ui: function (a) {
			var b = this;
			var c = a != null && a.length != 0;
			if (!this.Mb.hidden)
				ViewUtil.removeFirstChildren(this.Mb);
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
		}, f: Mention
	};
	ChooseNicknameView.b = true;
	ChooseNicknameView.prototype = {
		Dc: function () {
			var a = this.Cb.value;
			return a.length <= 25;
		}, C: function () {
			this.af.disabled = !this.Dc();
		}, f: ChooseNicknameView
	};
	ConnectingView.b = true;
	ConnectingView.prototype = {
		ba: function (a) {
			var b = window.document.createElement('p');
			b.textContent = a;
			this.logNodeField.appendChild(b);
		}, f: ConnectingView
	};
	CreateRoomView.b = true;
	CreateRoomView.prototype = {
		Fj: function (a) {
			this.Fm = a;
			this.Em.textContent = 'Show in room list: ' + (a ? 'No' : 'Yes');
		}, Dc: function () {
			var a = this.$e.value;
			return a.length <= 40;
		}, C: function () {
			this.Wj.disabled = !this.Dc();
		}, f: CreateRoomView
	};
	DisconnectedView.b = true;
	DisconnectedView.prototype = {f: DisconnectedView};
	GameStateView.b = true;
	GameStateView.prototype = {
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
		}, f: GameStateView
	};
	GameTimerView.b = true;
	GameTimerView.prototype = {
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
		}, f: GameTimerView
	};
	GameView.b = true;
	GameView.prototype = {
		C: function (a) {
			if (a.T.K == null)
				this.me(true);
			Daa.i(this.yl);
			this.bi.disabled = a.T.K == null;
			if (this.Gd)
				this.roomMenuViewInstField.C(a.T, a.T.getFullPlayerById(a.uc));
			else {
				a = a.Sf();
				this.gameStateViewInstField.C(a);
				ConnectionConstants.audioUtilInst.Xj.Ls(a);
			}
		}, me: function (a) {
			if (a != this.Gd) {
				if (this.Gd = a) {
					this.Jh.appendChild(this.roomMenuViewInstField.g);
					this.gameStateViewInstField.g.remove();
				}
				else {
					this.Jh.appendChild(this.gameStateViewInstField.g);
					this.roomMenuViewInstField.g.remove();
				}
			}
		}, Zo: () => GameView.kq != null, bb: function (a, b) {
			ViewUtil.removeFirstChildren(this.hf);
			GameView.kq = a;
			if (a != null) {
				this.hf.style.display = 'flex';
				this.hf.appendChild(a);
				this.yl = b;
			}
			else {
				this.hf.style.display = 'none';
				this.yl = null;
			}
		}, f: GameView
	};
	KickPlayerView.b = true;
	KickPlayerView.prototype = {
		Aj: function (a) {
			this.Jj = a;
			this.An.textContent = a ? 'Yes' : 'No';
		}, f: KickPlayerView
	};
	LeaveRoomView.b = true;
	LeaveRoomView.prototype = {f: LeaveRoomView};
	PickStadiumView.b = true;
	PickStadiumView.prototype = {
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
			for (var b = this, c = Stadium.Kh(), d = 0; c.length > d;) {
				var e = [c[d]];
				++d;
				e = this.Sk(e[0].w, (a => () => Promise.resolve(a[0]))(e), null);
				a.appendChild(e);
			}
			Dzz.getAll().then(c => {
				for (var d = 0; c.length > d;) {
					var e = c[d];
					++d;
					var f = [e.id];
					var e = b.Sk(e.name, (a => () => Dzz.get(a[0]))(f), (a => () => Dzz.delete(a[0]))(f));
					a.appendChild(e);
				}
				b.vg.update();
			});
		}, f: PickStadiumView
	};
	PingGraph.b = true;
	PingGraph.prototype = {
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
			this.Eh.drawImage(this.pingCanvasField1, b - d - 1, 0);
			this.Eh.drawImage(this.pingCanvasField1, -d - 1, 0);
		}, f: PingGraph
	};
	PlayerMenuView.b = true;
	PlayerMenuView.prototype = {
		C: function (a, b) {
			var c = a.getFullPlayerById(this.Nb);
			if (c == null)
				Daa.i(this.qb);
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
		}, f: PlayerMenuView
	};
	PlayerListItem.b = true;
	PlayerListItem.prototype = {
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
		}, f: PlayerListItem
	};
	PlayerListView.b = true;
	PlayerListView.prototype = {
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
					g = new PlayerListItem(f);
					g.ff = a => Yyy.i(e.ff, a);
					this.xd.set(f.V, g);
					this.ab.appendChild(g.g);
				}
				g.C(f, d);
				b.delete(f.V);
			}
			d = b.values();
			for (b = d.next(); !b.done;) {
				c = b.value;
				b = d.next();
				this.xd.get(c).g.remove();
				this.xd.delete(c);
			}
			d = 0;
			for (b = a.length - 1; b > d; d++) {
				f = d;
				c = this.xd.get(a[f].V).g;
				f = this.xd.get(a[f + 1].V).g;
				if (f != c.nextSibling)
					this.ab.insertBefore(c, f);
			}
		}, f: PlayerListView
	};
	CaptchaDialogView.b = true;
	CaptchaDialogView.prototype = {f: CaptchaDialogView};
	ReplayControlsView.b = true;
	ReplayControlsView.Wk = a => {
		a = a / 1000 | 0;
		return (a / 60 | 0) + ':' + StringOps3.Af(StringOpsInt.ye(a % 60));
	};
	ReplayControlsView.prototype = {
		C: function () {
			this.Er.textContent = ReplayControlsView.Wk(this.ti.Qb);
			this.Aq.style.width = 100 * this.ti.Go() + '%';
			if (this.Wf && this.ti.Fd <= 0) {
				this.Wf = false;
				this.Up();
			}
		}, f: ReplayControlsView
	};
	RoomLinkView.b = true;
	RoomLinkView.prototype = {
		nr: function (a) {
			if (a != this.gk) {
				this.gk = a;
				this.Zf.value = a;
			}
		}, f: RoomLinkView
	};
	RoomListHeader.b = true;
	RoomListHeader.prototype = {f: RoomListHeader};
	RoomListView.b = true;
	RoomListView.As = a => Promise.race([
		new Promise((resolve, reject) => window.setTimeout(() => reject(null), 5000)),
		a
	]);
	RoomListView.prototype = {
		Om: function () {
			function a() {
				b.pj.disabled = false;
				b.bn(c);
			}

			var b = this;
			this.en(null);
			this.pj.disabled = true;
			ViewUtil.removeFirstChildren(this.gj);
			var c = [];
			this.dj = [];
			RoomListView.As(RoomListOps.get().then(a => c = a).catch(() => ({}))).then(a).catch(a);
		}, bn: function (a) {
			var b = this;
			this.dj = a;
			RoomListOps.Hs(this.gs, a);
			a.sort((a, b) => a.Le - b.Le);
			ViewUtil.removeFirstChildren(this.gj);
			for (var c = 0, d = 0, e = !this.fs.Ta, f = !this.zs.Ta, g = 0; a.length > g;) {
				var h = [a[g]];
				++g;
				var l = h[0].vd;
				if (!(e && l.Xe <= l.I || f && l.Ib)) {
					var m = [new RoomListHeader(h[0])];
					m[0].Ja.ondblclick = (a => () => Yyy.i(b.Ym, a[0]))(h);
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
		}, f: RoomListView
	};
	Notice.b = true;
	Notice.prototype = {
		Il: function () {
			var a = this;
			WebserverApiOps.tk(ConnectionConstants.rsUrl + 'api/notice').then(b => {
				var c = b.content;
				if (c != null && c != '' && c != Notice.On) {
					a.$n.innerHTML = c;
					a.Xk.hidden = false;
					a.closeBtnField.onclick = () => {
						Notice.On = c;
						return a.Xk.hidden = true;
					};
				}
			});
		}, f: Notice
	};
	PasswordView.b = true;
	PasswordView.prototype = {
		Dc: function () {
			var a = this.Cb.value;
			return a.length <= 30 ? a.length > 0 : false;
		}, C: function () {
			this.af.disabled = !this.Dc();
		}, f: PasswordView
	};
	RoomMenuView.b = true;
	RoomMenuView.prototype = {
		Th: function (a, b, c, d) {
			var e = this;
			ViewUtil.replaceParentsChild(a, b.g);
			b.mg = (a, b) => Mia.i(e.mg, a, b);
			b.ee = a => Yyy.i(e.ee, a);
			b.Kp = a => Mia.i(e.mg, d, a);
			b.ff = a => Yyy.i(e.ff, a);
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
			this.Hl.C(a.I.filter(a => Team.red == a.ea), e, d, c);
			this.Lj.C(a.I.filter(a => Team.blue == a.ea), e, d, c);
			this.qm.C(a.I.filter(a => Team.spec == a.ea), e, d, c);
			this.Rl.disabled = d;
			if (a.Pc != this.Xh)
				this.Bj(a.Pc);
			if (d) {
				c = a.K.OaFramesField == 120;
				if (c != this.ll)
					this.Cj(c);
			}
		}, Bj: function (a) {
			this.Xh = a;
			this.Nk.innerHTML = this.Xh ? '<i class=\'icon-lock\'></i>Unlock' : '<i class=\'icon-lock-open\'></i>Lock';
		}, Cj: function (a) {
			this.ll = a;
			this.gi.innerHTML = '<i class=\'icon-pause\'></i>' + (this.ll ? 'Resume (P)' : 'Pause (P)');
		}, f: RoomMenuView
	};
	SettingsView.b = true;
	SettingsView.prototype = {f: SettingsView};
	SimpleDialogView.b = true;
	SimpleDialogView.prototype = {f: SimpleDialogView};
	StatsView.b = true;
	StatsView.prototype = {
		qr: function (a) {
			this.rg.textContent = a == null ? 'null' : '' + a;
		}, or: function (a) {
			this.wp.textContent = '' + a;
		}, hm: function (a) {
			this.wo.textContent = a == null ? 'null' : '' + a;
		}, f: StatsView
	};
	UnsupportedBrowserView.b = true;
	UnsupportedBrowserView.prototype = {f: UnsupportedBrowserView};
	GlobalError.b = true;
	GlobalError.ma = Error;
	GlobalError.prototype = Extend(Error.prototype, {f: GlobalError});
	ObjectCastUtil.b = true;
	ObjectCastUtil.Nm = a => {
		if (a instanceof Array && a.eb == null)
			return Array;
		var b = a.f;
		if (b != null)
			return b;
		a = ObjectCastUtil.wj(a);
		return a != null ? ObjectCastUtil.rn(a) : null;
	};
	ObjectCastUtil.Be = (a, b) => {
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
					var d = BasnetArr[a.eb];
					var c = d.nh[a.nb];
					var e = d[c];
					if (e.Ae) {
						b += '\t';
						for (var c = c + '(', d = [], f = 0, e = e.Ae; e.length > f;) {
							var g = e[f];
							++f;
							d.push(ObjectCastUtil.Be(a[g], b));
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
						d += (e > 0 ? ',' : '') + ObjectCastUtil.Be(a[e], b);
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
						d += b + c + ' : ' + ObjectCastUtil.Be(a[c], b);
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
	ObjectCastUtil.ph = (a, b) => {
		if (a == null)
			return false;
		if (b == a)
			return true;
		var c = a.Rd;
		if (c != null) {
			for (var d = 0, e = c.length; e > d; d++) {
				var f = c[d];
				if (b == f || ObjectCastUtil.ph(f, b))
					return true;
			}
		}
		return ObjectCastUtil.ph(a.ma, b);
	};
	ObjectCastUtil.pn = (a, b) => {
		if (b == null)
			return false;
		switch (b) {
			case Array:
				return a instanceof Array ? a.eb == null : false;
			case objBoolean:
				return typeof a == 'boolean';
			case object2:
				return true;
			case objNumber:
				return typeof a == 'number';
			case object1:
				return typeof a == 'number' ? a === (a | 0) : false;
			case String:
				return typeof a == 'string';
			default:
				if (a != null) if (typeof b == 'function') {
					if (a instanceof b || ObjectCastUtil.ph(ObjectCastUtil.Nm(a), b))
						return true;
				}
				else {
					if (typeof b == 'object' && ObjectCastUtil.qn(b) && a instanceof b)
						return true;
				}
				else
					return false;
				return object3 == b && a.b != null || object4 == b && a.Gf != null ? true : b == BasnetArr[a.eb];
		}
	};
	ObjectCastUtil.G = (a, b) => {
		if (ObjectCastUtil.pn(a, b))
			return a;
		throw new GlobalError('Cannot cast ' + StringOpsInt.ye(a) + ' to ' + StringOpsInt.ye(b));
	};
	ObjectCastUtil.wj = a => {
		a = ObjectCastUtil.toStringObj.call(a).slice(8, -1);
		return a == 'Object' || a == 'Function' || a == 'Math' || a == 'JSON' ? null : a;
	};
	ObjectCastUtil.qn = a => ObjectCastUtil.wj(a) != null;
	ObjectCastUtil.rn = a => qc[a];
	Mhc.b = true;
	Mhc.sliceBuffer = function (a, b) {
		var c = new Uint8Array(this, a, b == null ? null : b - a);
		var d = new Uint8Array(c.byteLength);
		d.set(c);
		return d.buffer;
	};
	var rcCounter = 0;
	if (String.fromCodePoint == null) {
		String.fromCodePoint = a => a < 65536 ? String.fromCharCode(a) : String.fromCharCode((a >> 10) + 55232) + String.fromCharCode((a & 1023) + 56320);
	}
	String.prototype.f = String;
	String.b = true;
	Array.b = true;
	Date.prototype.f = Date;
	Date.b = 'Date';
	var object1 = {};
	var object2 = {};
	var objNumber = Number;
	var objBoolean = Boolean;
	var object3 = {};
	var object4 = {};
	Team.spec = new Team(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
	Team.red = new Team(1, 15035990, -1, 8, 'Red', 't-red', 0, 2);
	Team.blue = new Team(2, 5671397, 1, 16, 'Blue', 't-blue', 0, 4);
	Team.spec.enemyTeam = Team.spec;
	Team.red.enemyTeam = Team.blue;
	Team.blue.enemyTeam = Team.red;
	Object.defineProperty(GlobalError.prototype, 'message', {
		get: function () {
			return String(this.Ta);
		}
	});
	if (ArrayBuffer.prototype.slice == null)
		ArrayBuffer.prototype.slice = Mhc.sliceBuffer;
	IceVa.mediaConstraints = {mandatory: {OfferToReceiveAudio: false, OfferToReceiveVideo: false}};
	Dii.ecKeyGenParams = {name: 'ECDSA', namedCurve: 'P-256'};
	Dii.ecdsaParams = {name: 'ECDSA', hash: {name: 'SHA-256'}};
	Dba.scrollHandlers = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
	Manager.yfMap = new Map;
	Manager.yf = 0;
	Dua.configProp = Manager.Fa({Ba: false, Aa: false});
	Mya.zc = 0;
	RoRuUu.Km = [{name: 'ro', reliable: true, kj: true}, {name: 'ru', reliable: true, kj: false}, {name: 'uu', reliable: false, kj: false}];
	WebserverApiOps.vj = 'application/x-www-form-urlencoded';
	Dha.ab = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -0.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -0.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -0.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -0.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', 0.1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, 0.8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
	ConnectionConstants.p2pWss = 'wss://p2p.haxball.com/';
	ConnectionConstants.rsUrl = 'https://www.haxball.com/rs/';
	ConnectionConstants.stuns = [{urls: 'stun:stun.l.google.com:19302'}];
	ConnectionConstants.localStorageWrapperInst = new LocalStorageWrapper;
	Game.pointsMaxArray = (() => {
		for (var a = [], b = 0; b < 256; b++)
			a.push(new Point(0, 0));
		return a;
	})(this);
	Game.idsMaxArray = (() => {
		for (var a = [], b = 0; b < 256; b++)
			a.push(0);
		return a;
	})(this);
	Stadium.streamWriterInst = StreamWriter.ha(1024);
	Mta.configProp = Manager.Fa({Ba: false, Aa: false});
	Mrb.configProp = Manager.Fa({Ba: false, Aa: false, oj: {$i: 10, uj: 900}});
	Dqa.configProp = Manager.Fa({Ba: false, Aa: false});
	Mda.configProp = Manager.Fa({Ba: false, Aa: false});
	Msa.configProp = Manager.Fa({Ba: false, Aa: false});
	Mra.configProp = Manager.Fa({Ba: false, Aa: false});
	Dss.configProp = Manager.Fa({Ba: false, Aa: false});
	Mqa.configProp = Manager.Fa({Ba: false, Aa: false, oj: {$i: 10, uj: 2000}});
	TeamColorsUtil.configProp = Manager.Fa({Ba: false, Aa: false});
	Mpa.configProp = Manager.Fa({Ba: false, Aa: false});
	Moa.configProp = Manager.Fa({Ba: false, Aa: false});
	Mqb.configProp = Manager.Fa({Ba: false, Aa: false});
	Doa.configProp = Manager.Fa({});
	Dna.configProp = Manager.Fa({Ba: false, Aa: false, oj: {$i: 10, uj: 900}});
	Dga.configProp = Manager.Fa({});
	Mna.configProp = Manager.Fa({Ba: false, Aa: false});
	Dyy.configProp = Manager.Fa({Ba: false, Aa: false});
	Mpb.configProp = Manager.Fa({Ba: false, Aa: false});
	Mob.configProp = Manager.Fa({Ba: false, Aa: false});
	Mma.configProp = Manager.Fa({Ba: false, Aa: false});
	Dma.configProp = Manager.Fa({Ba: false, Aa: false});
	Dla.configProp = Manager.Fa({Ba: false, Aa: false});
	Mla.configProp = Manager.Fa({Ba: false, Aa: false});
	Segment.segVal1 = 0.17435839227423353;
	Segment.segVal2 = 5.934119456780721;
	BigAnimatedText.keyFrames1 = new KeyFramesManager([0, 0, 2, 1, 0, 0.35, 1, 0, 1, 0, 0.7, 1, 0, 0, 0, 1]);
	BigAnimatedText.keyFrames2 = new KeyFramesManager([0, -1, 3, 0, 0, 0.35, 0, 0, 0, 0, 0.65, 0, 0, 1, 3, 1]);
	ChangeLocationView.htmlContents = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
	ChatboxView.htmlContents = '<div class=\'chatbox-view\'><div data-hook=\'log\' class=\'log\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /><button data-hook=\'send\'>Send</button></div></div>';
	ChooseNicknameView.htmlContents = '<div class=\'choose-nickname-view\'><img src="images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
	ConnectingView.htmlContents = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
	CreateRoomView.htmlContents = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
	DisconnectedView.htmlContents = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
	GameStateView.htmlContents = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
	GameView.htmlContents = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'top-section\' data-hook=\'gameplay-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'buttons\'><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i>Settings</button></div></div><div data-hook=\'popups\'></div></div>';
	KickPlayerView.htmlContents = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
	LeaveRoomView.htmlContents = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
	PickStadiumView.htmlContents = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
	PlayerMenuView.htmlContents = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
	PlayerListItem.htmlContents = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
	PlayerListView.htmlContents = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list\' data-hook=\'list\'></div></div>';
	ReplayControlsView.htmlContents = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
	RoomLinkView.htmlContents = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
	RoomListHeader.tj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
	RoomListView.tj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
	PasswordView.htmlContents = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
	RoomMenuView.htmlContents = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
	SettingsView.htmlContents = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div></div></div></div>';
	SettingsView.$l = 0;
	SimpleDialogView.htmlContents = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
	StatsView.htmlContents = '<div class=\'stats-view\'><p>Ping: <span data-hook=\'ping\'></span></p><p>Max Ping: <span data-hook=\'max-ping\'></span></p><p>Fps: <span data-hook=\'fps\'></span></p><div data-hook=\'graph\'></div></div>';
	UnsupportedBrowserView.htmlContents = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="images/opera-icon.png"/>Opera</a></div></div></div>';
	ObjectCastUtil.toStringObj = {}.toString;
	Muu.qpDisplay();
})(typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : this);
