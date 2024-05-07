/*
 HaxBall @ 2023 - Mario Carbajal - All rights reserved.
 00f80ea7
*/
'use strict';
const version = 'Indev 0.7.2';
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
		};

		/* Utility functions begin */
		/**
		 * @param {DynamicDisc} dynDisc
		 * @return {{}}
		 */
		function getDynamicDiscObject(dynDisc) {
			if (dynDisc == null)
				return null;
			return {
				self: dynDisc,
				frameNo: dynDisc.jc,
				extrapolated: getDynamicDiscObject(dynDisc.ic),
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
		 * @param {FullPlayer} fullPlayer
		 * @return {{}}
		 */
		function getFullPlayerObject(fullPlayer) {
			if (fullPlayer == null)
				return null;
			const playerDisc = getDynamicDiscObject(fullPlayer.J);
			return {
				self: fullPlayer,
				frameNo: fullPlayer.Bc,
				extrapolated: getFullPlayerObject(fullPlayer.xn),
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
		 * @param {GameObjects} gameObjects
		 * @return {{}}
		 */
		function getGameObjectsObject(gameObjects) {
			return gameObjects == null ? null : {
				self: gameObjects,
				frameNo: gameObjects.jc,
				extrapolated: getGameObjectsObject(gameObjects.ic),
				dynamicDiscs: gameObjects.H.map(rawDynDisc => getDynamicDiscObject(rawDynDisc))
			};
		}

		/**
		 * @param {Game} game
		 * @return {{id, self, time, blue, red, team, phase, gameObjects, timeLimit, scoreLimit, stadium}}
		 */
		function getGameObject(game) {
			if (game == null) {
				return null;
			}
			else {
				return {
					self: game,
					frameNo: game.jc,
					extrapolated: getGameObject(game.ic),
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
		 * @param {Stadium} stadium
		 * @return {{}}
		 */
		function getStadiumObject(stadium) {
			if (stadium == null)
				return null;
			return {
				vertexes: stadium.L,
				segments: stadium.X,
				planes: stadium.ta,
				goals: stadium.vc.map(rawGoal => Stadium.hp(rawGoal)),
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
		 * @param {RoomState} roomState
		 * @return {{id, self, stadium, game, players, name, teamColors}}
		 */
		function getRoomStateObject(roomState) {
			if (roomState == null)
				return null;
			return {
				self: roomState,
				frameNo: roomState.jc,
				extrapolated: getRoomStateObject(roomState.ic),
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

				getFullPlayerById: id => roomState.getFullPlayerById(id)
			};
		}

		/**
		 * @param {JoinedRoom|HostRoom} room
		 * @return {{}}
		 */
		function getRoomObject(room) {
			return {
				self: room,
				password: room.Kb,
				playerId: room.roomClientPlayerId,
				roomState: getRoomStateObject(room.U)
			};
		}

		/**
		 * @param {PlayableRoomManager} playableRoomManager
		 * @return {{}}
		 */
		function getPRMObject(playableRoomManager) {
			return {
				self: playableRoomManager,
				roomLink: playableRoomManager.prmRoomLink,
				replay: playableRoomManager.prmReplay,
				room: getRoomObject(playableRoomManager.prmRoom),
				raw_gameContainer: playableRoomManager.field_gameContainer,
				raw_gameCanvas: playableRoomManager.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas,

				sendChat: playableRoomManager.field_gameContainer.gameContChatboxCont.Bl,
				showChatIndicator: playableRoomManager.field_gameContainer.gameContChatboxCont.tg,
				setAvatar: text => playableRoomManager.prmChatHandler.Bm(text),
				startReplay: () => {
					if (playableRoomManager.prmReplay == null) {
						// Start replaying
						playableRoomManager.es();
						// Mark rec button as active
						playableRoomManager.field_gameContainer.gameContRoomMenuCont.Vr(true);
					}
				},
				stopReplay: () => {
					if (playableRoomManager.prmReplay != null) {
						// Stop replaying and save Uint8Array
						const replayArray = playableRoomManager.prmReplay.stop();
						playableRoomManager.prmReplay = null;
						// Mark rec button as inactive
						playableRoomManager.field_gameContainer.gameContRoomMenuCont.Vr(false);
						return replayArray;
					}
				}
			};
		}

		/**
		 * @param {ReplayManager} replayManager
		 * @return {{}}
		 */
		function getReplayManagerObject(replayManager) {
			return {
				self: replayManager,
				roomLink: '',
				replay: null,
				room: getRoomObject(replayManager.za),
				raw_gameContainer: replayManager.field_gameContainer,
				raw_gameCanvas: replayManager.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas,

				sendChat: replayManager.field_gameContainer.gameContChatboxCont.Bl,
				showChatIndicator: replayManager.field_gameContainer.gameContChatboxCont.tg,
				setAvatar: () => {
				},
				startReplay: () => {
				},
				stopReplay: () => {
				}
			};
		}

		window.parent.g.getCurrentStadium = () => {
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
			return roomState.stadium;
		};
		// Assuming that goal posts are symmetric with respect to the origin (that only a sign changes in the coordinates)
		window.parent.g.getGoalPostPoint = () => {
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
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
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
			const fullPlayer = roomState.getFullPlayerById(playerId);
			return fullPlayer == null ? null : getFullPlayerObject(fullPlayer);
		};
		window.parent.g.getPlayerList = () => {
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
			return roomState.players;
		};
		window.parent.g.getScores = () => {
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
			return roomState.game;
		};
		window.parent.g.getBallPosition = () => {
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
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
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
			const currentGame = roomState.game;
			return currentGame == null ? null : currentGame.gameObjects.dynamicDiscs[discIndex];
		};
		window.parent.g.getPlayerDiscProperties = playerId => {
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
			const currentGame = roomState.game;
			if (currentGame == null)
				return null;
			const fullPlayer = roomState.getFullPlayerById(playerId);
			const player = getFullPlayerObject(fullPlayer);
			return player?.disc;
		};
		window.parent.g.getDiscCount = () => {
			const roomState = window.parent.g.getRoomManager?.()?.room?.roomState;
			if (roomState == null) {
				console.warn('Join a room or open a replay first');
				return;
			}
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

		/* Utility functions end */

		function function_ja() {
			return CastUtil.Me(this, '');
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

		class Room1 {
			/** @param {RoomState} roomState */
			constructor(roomState) {
				Room1.zb || this.Za(roomState);
			}

			/** @param {RoomState} roomState */
			Za(roomState) {
				this.aa = 0;
				this.U = roomState;
			}
		}

		class PlayableRoomManager {
			/** @param {HostRoom|JoinedRoom} room */
			constructor(room) {
				this.prmChatIndicatorTimeout = null;
				this.prmChatIndicatorState1 = false;
				this.prmChatIndicatorState2 = false;
				this.field_timestamp = window.performance.now();
				/** @type {Replay} */
				this.prmReplay = null;
				this.field_animationFrame = 0;
				this.prmTimestampUtil = new TimestampUtil(3, 1E3);
				this.W = new PlayerActivityManager;
				this.prmRoomLink = 'Waiting for link';
				this.prmSync = false;
				this.prmIsClientPlayerAdmin = false;
				this.field_fps = 0;
				let self = this;
				this.prmChatHandler = new ChatHandler(room, function (d) {
						self.field_gameContainer.gameContChatboxCont.Ib(d);
					}
				);
				this.prmRoom = room;
				room.U.Io = function (d) {
					self.prmSync != d && (self.prmSync = d,
						room.ua(SyncChangeAction.pa(d)));
				}
				;
				this.field_gameContainer = new GameContainer(room.roomClientPlayerId);
				window.top.document.body.classList.add('hb-playing');
				this.prmInsideRoomMan = new InsideRoomManager(this.field_gameContainer, room.U.getFullPlayerById(room.roomClientPlayerId).D);
				this.prmInsideRoomMan.setRoomStateEvents(room.U);
				/** Send chat */
				this.field_gameContainer.gameContChatboxCont.Bl = function_M(this, this.hq);
				/** Show chat indicator */
				this.field_gameContainer.gameContChatboxCont.tg = function_M(this, this.gq);
				window.document.addEventListener('keydown', function_M(this, this.Fa));
				window.document.addEventListener('keyup', function_M(this, this.kd));
				window.onbeforeunload = function () {
					return 'Are you sure you want to leave the room?';
				}
				;
				this.W.yg = function (d) {
					room.A();
					room.ua(d);
				}
				;
				this.W.ul = function (d) {
					'ToggleChat' == d && self.field_gameContainer.gameContChatboxCont.Wm();
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.Dq = function (d) {
					room.ua(SetLimitsAction.pa(1, d));
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.vq = function (d) {
					room.ua(SetLimitsAction.pa(0, d));
				}
				;
				this.field_gameContainer.zg = function (d) {
					room.ua(SetStadiumAction.pa(d));
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.Aq = function () {
					room.ua(new GameStartAction);
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.Bq = function () {
					room.ua(new GameStopAction);
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.oq = function () {
					self.Xm();
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.xg = function (d, e) {
					room.ua(MoveToTeamAction.pa(d, e));
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.me = function_M(this, this.yr);
				this.field_gameContainer.gameContRoomMenuCont.eq = function () {
					room.ua(new AutoAction);
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.rq = function () {
					PlayableRoomManager.cr(room);
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.Cq = function (d) {
					room.ua(LockTeamsAction.pa(d));
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.tf = function (d) {
					let fullPlayer = room.U.getFullPlayerById(d);
					if (null != fullPlayer) {
						let playerDialog = new PlayerDialogContainer(fullPlayer, self.prmIsClientPlayerAdmin);
						playerDialog.rb = function () {
							self.field_gameContainer.ab(null);
						}
						;
						playerDialog.cq = function (g, h) {
							room.ua(GiveAdminAction.pa(g, h));
						}
						;
						playerDialog.li = function () {
							self.$r(fullPlayer);
						}
						;
						self.field_gameContainer.ab(playerDialog.f, function () {
							playerDialog.A(room.U, self.prmIsClientPlayerAdmin);
						});
					}
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.yq = function () {
					let roomLinkContainer = new RoomLinkContainer;
					roomLinkContainer.rb = function () {
						self.field_gameContainer.ab(null);
					}
					;
					self.field_gameContainer.ab(roomLinkContainer.f, function () {
						roomLinkContainer.Sr(self.prmRoomLink);
					});
				}
				;
				this.field_gameContainer.gameContRoomMenuCont.sq = function () {
					if (null == self.prmReplay)
						self.es();
					else {
						let d = self.prmReplay.stop();
						self.prmReplay = null;
						PlayableRoomManager.tm(d);
					}
					self.field_gameContainer.gameContRoomMenuCont.Vr(null != self.prmReplay);
				}
				;
				window.requestAnimationFrame(function_M(this, this.pf));
				this.Kh = window.setInterval(function () {
					self.field_gameContainer.gameContStatsCont.Dm(self.field_fps);
					self.field_fps = 0;
				}, 1E3);
				this.ej = window.setInterval(function () {
					room.A();
				}, 50);
				var c = ConnectionConstants.localStorageUtilInst.lsExtrapolation.v();
				c = -200 > c ? -200 : 1E3 < c ? 1E3 : c;
				0 != c && (room.Cm(ConnectionConstants.localStorageUtilInst.lsExtrapolation.v()),
					this.field_gameContainer.gameContChatboxCont.Ib('Extrapolation set to ' + c + ' msec'));

				// Exposing global fields begin
				window.parent.g.getRoomManager = () => getPRMObject(self);
				window.parent.g.getRoomState = () => window.parent.g.getRoomManager().room.roomState;
				const onRoomJoinFun = window.parent.g.onRoomJoin;
				if (onRoomJoinFun != null)
					onRoomJoinFun(window.parent.g.getRoomManager());
				// Exposing global fields end
			}

			es() {
				this.prmReplay = new Replay(this.prmRoom, 3);
			}

			$r(a) {
				let kickDialogContainer = new KickDialogContainer(a);
				let self = this;
				kickDialogContainer.rb = function () {
					self.field_gameContainer.ab(null);
				}
				;
				kickDialogContainer.li = function (c, d, e) {
					self.prmRoom.ua(KickAction.pa(c, d, e));
					self.field_gameContainer.ab(null);
				}
				;
				this.field_gameContainer.ab(kickDialogContainer.f);
			}

			la() {
				// Exposing global fields begin
				const onRoomLeaveFun = window.parent.g.onRoomLeave;
				if (onRoomLeaveFun != null)
					onRoomLeaveFun(window.parent.g.getRoomManager());
				// Exposing global fields end
				window.document.removeEventListener('keydown', function_M(this, this.Fa));
				window.document.removeEventListener('keyup', function_M(this, this.kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.field_animationFrame);
				window.top.document.body.classList.remove('hb-playing');
				this.W.la();
				window.clearInterval(this.Kh);
				window.clearInterval(this.ej);
				window.clearTimeout(this.prmChatIndicatorTimeout);
			}

			yr(a) {
				let b = []
					,
					c = 0
					,
					d = this.prmRoom.U.K;
				for (; c < d.length;) {
					let e = d[c];
					++c;
					e.fa == a && b.push(MoveToTeamAction.pa(e.Y, Team.spec));
				}
				for (a = 0; a < b.length;)
					this.prmRoom.ua(b[a++]);
			}

			pf() {
				this.field_animationFrame = window.requestAnimationFrame(function_M(this, this.pf));
				this.W.A();
				this.prmRoom.A();
				this.Qc();
			}

			Qc() {
				var a = window.performance.now();
				1 == ConnectionConstants.localStorageUtilInst.lsFpsLimit.v() && 28.333333333333336 > a - this.field_timestamp || (this.field_timestamp = a,
					this.field_fps++,
					a = this.prmRoom.U.getFullPlayerById(this.prmRoom.roomClientPlayerId),
				null != a && (this.prmIsClientPlayerAdmin = a.fb),
					this.field_gameContainer.A(this.prmRoom));
			}

			hq(a) {
				let self = this;
				this.prmChatHandler.uf(a) || this.prmTimestampUtil.yo(function () {
					let chatAction = new ChatAction;
					chatAction.$c = a;
					self.prmRoom.ua(chatAction);
				});
			}

			gq(a) {
				this.prmChatIndicatorState1 = a;
				let self = this;
				null == this.prmChatIndicatorTimeout && (this.prmChatIndicatorTimeout = window.setTimeout(function () {
					self.prmChatIndicatorTimeout = null;
					self.xm(self.prmChatIndicatorState1);
				}, 1E3),
					this.xm(this.prmChatIndicatorState1));
			}

			xm(a) {
				a != this.prmChatIndicatorState2 && (this.prmRoom.ua(ChatIndicatorAction.pa(a ? 0 : 1)),
					this.prmChatIndicatorState2 = a);
			}

			Xm() {
				if (null != this.prmRoom.U.M) {
					let gamePauseAction = new GamePauseAction;
					gamePauseAction.Mf = 120 != this.prmRoom.U.M.Ra;
					this.prmRoom.ua(gamePauseAction);
				}
			}

			Fa(a) {
				var viewModeLSI = ConnectionConstants.localStorageUtilInst.lsViewMode;
				let c = null != ConnectionConstants.localStorageUtilInst.lsPlayerKeys.v().v(a.code);
				switch (a.keyCode) {
					case 9:
					case 13:
						this.field_gameContainer.gameContChatboxCont.$a.focus({
							preventScroll: true
						});
						a.preventDefault();
						break;
					case 27:
						if (this.field_gameContainer.Xk()) {
							this.field_gameContainer.ab(null);
						}
						else {
							let gameContainer = this.field_gameContainer;
							gameContainer.ue(!gameContainer.gameContShowing);
						}
						a.preventDefault();
						break;
					case 48: // Modified zoom
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(0.1);
						break;
					case 49:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(1);
						break;
					case 50:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(2);
						break;
					case 51:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(3);
						break;
					case 52:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(4);
						break;
					case 53:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(5);
						break;
					case 54:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(6);
						break;
					case 55:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(7);
						break;
					case 56: // Modified zoom keys
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(15);
						break;
					case 57:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(-1.5);
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
				ReplayDownloader.Dr(a, 'HBReplay-' + b.getFullYear() + '-' + class_ba.Lf('' + (b.getMonth() + 1)) + '-' + class_ba.Lf('' + b.getDate()) + '-' + class_ba.Lf('' + b.getHours()) + 'h' + class_ba.Lf('' + b.getMinutes()) + 'm.hbr2');
			}

			static cr(a) {
				var b = a.U.K;
				let c = [];
				var d = 0;
				let e = 0;
				for (var f = 0; f < b.length;) {
					let g = b[f];
					++f;
					g.fa == Team.spec && c.push(g.Y);
					g.fa == Team.red ? ++d : g.fa == Team.blue && ++e;
				}
				f = c.length;
				0 != f && (b = function () {
					return c.splice(Math.random() * c.length | 0, 1)[0];
				}
					,
					e == d ? 2 > f || (a.ua(MoveToTeamAction.pa(b(), Team.red)),
						a.ua(MoveToTeamAction.pa(b(), Team.blue))) : (d = e > d ? Team.red : Team.blue,
						a.ua(MoveToTeamAction.pa(b(), d))));
			}
		}

		class RoomState {
			constructor() {
				this.jc = -1;
				this.T = this.ic = null;
				this.Hd = 2;
				this.fd = 0;
				this.ke = 1;
				this.kb = this.Ga = 3;
				this.Vc = false;
				/** @type {Game} */
				this.M = null;
				/** @type {FullPlayer[]} */
				this.K = [];
				this.lc = '';
				/** @type {Stadium} */
				this.T = Stadium.Nh()[0];
				this.mb = [null, new TeamColors, new TeamColors];
				this.mb[1].hb.push(Team.red.S);
				this.mb[2].hb.push(Team.blue.S);
			}

			ds(a) {
				if (null == this.M) {
					this.M = new Game;
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
					FunctionRunner4.i(this.Tl, a, b, c);
				}
			}

			getFullPlayerById(id) {
				let b = 0
					,
					c = this.K;
				for (; b < c.length;) {
					let d = c[b];
					++b;
					if (d.Y == id)
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
				this.T = Stadium.ma(a);
				var b = 0 != a.F();
				this.M = null;
				b && (this.M = new Game,
					this.M.ma(a, this));
				b = null == this.M ? null : this.M.va.H;
				let c = a.F();
				for (var d = this.K; d.length > c;)
					d.pop();
				for (d = 0; d < c;) {
					let e = new FullPlayer;
					e.xa(a, b);
					this.K[d++] = e;
				}
				this.mb[1].ma(a);
				this.mb[2].ma(a);
			}

			Mk() {
				let a = 0;
				var b = StreamWriter.ka();
				this.ga(b);
				for (b = b.ms(); 4 <= b.s.byteLength - b.a;)
					a ^= b.N();
				return a;
			}

			Yo() {
				let a = StreamWriter.ka(4);
				a.P(this.Mk());
				return a.Rg();
			}

			ro(a) {
				a = (new StreamReader(new DataView(a))).N();
				FunctionRunner2.i(this.Io, this.Mk() != a);
			}

			Fm(a) {
				this.km = a;
			}

			Pb(a) {
				if (0 == a)
					return true;
				a = this.getFullPlayerById(a);
				return null != a && a.fb ? true : false;
			}

			Rr(a, b, c, d) {
				this.Hd = 0 > b ? 0 : 255 < b ? 255 : b;
				this.fd = 0 > c ? 0 : 255 < c ? 255 : c;
				0 > d ? d = 0 : 100 < d && (d = 100);
				this.ke = this.fd * d;
				FunctionRunner5.i(this.Zk, a, this.Hd, this.fd, d);
			}

			uc() {
				let frameCount = CounterUtil.frameCount;
				let extrapolatedRoomState = this.ic;
				this.jc != frameCount && (null == extrapolatedRoomState && (this.ic = extrapolatedRoomState = new RoomState),
					this.jc = frameCount,
					RoomState.zd(extrapolatedRoomState, this));
				return extrapolatedRoomState;
			}

			/**
			 *
			 * @param {RoomState} extrapolatedRoomState
			 * @param {RoomState} roomState
			 */
			static zd(extrapolatedRoomState, roomState) {
				extrapolatedRoomState.lc = roomState.lc;
				if (null == roomState.K)
					extrapolatedRoomState.K = null;
				else {
					null == extrapolatedRoomState.K && (extrapolatedRoomState.K = []);
					let d = extrapolatedRoomState.K
						,
						e = roomState.K;
					for (var c = e.length; d.length > c;)
						d.pop();
					c = 0;
					let f = e.length;
					for (; c < f;) {
						let g = c++;
						d[g] = e[g].getExtrapolatedFullPlayer();
					}
				}
				extrapolatedRoomState.M = null == roomState.M ? null : roomState.M.uc();
				extrapolatedRoomState.Vc = roomState.Vc;
				extrapolatedRoomState.kb = roomState.kb;
				extrapolatedRoomState.Ga = roomState.Ga;
				extrapolatedRoomState.ke = roomState.ke;
				extrapolatedRoomState.fd = roomState.fd;
				extrapolatedRoomState.Hd = roomState.Hd;
				extrapolatedRoomState.T = roomState.T;
				extrapolatedRoomState.mb = roomState.mb;
			}
		}

		class Room2 extends Room1 {
			/** @param {RoomState} roomState */
			constructor(roomState) {
				if (Room1.zb) {
					super();
				}
				else {
					Room1.zb = true;
					super();
					Room1.zb = false;
					this.Za(roomState);
				}
			}

			/** @param {RoomState} roomState */
			Za(roomState) {
				this.aj = new ImportantActions;
				this.Be = this.ec = 0;
				this.te = new ImportantActions;
				this.roomClientPlayerId = this.dc = this.Ad = 0;
				this.Dc = .06;
				this.oh = 16.666666666666668;
				this.Sf = 120;
				super.Za(roomState);
			}

			ua() {
				throw GlobalError.C('missing implementation');
			}

			/** @returns {RoomState|null} */
			eg() {
				throw GlobalError.C('missing implementation');
			}

			A() {
				throw GlobalError.C('missing implementation');
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
				CounterUtil.frameCount++;
				let extrapolatedRoomState = this.U.uc();
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
						k.Kf.Ca && k.apply(extrapolatedRoomState);
						++d;
					}
					extrapolatedRoomState.A(f != h ? 1 : a - g);
					++f;
				}
				for (a = this.aj.list; 0 < a.length;)
					a.pop();
				return extrapolatedRoomState;
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

		class JoinedRoom extends Room2 {
			constructor(roomId, iceObject) {
				Room1.zb = true;
				super();
				Room1.zb = false;
				this.Za(roomId, iceObject);
			}

			Za(roomId, iceObject) {
				this.Mi = [];
				this.xi = [];
				this.Eg = new ImportantActions;
				this.$p = 1;
				this.yd = this.Um = 0;
				this.$i = new RoomPingUtil(50);
				this.Dg = new RoomPingUtil(50);
				this.In = 500;
				this.xk = '';
				super.Za(iceObject.state);
				this.Yh = iceObject.st;
				this.Ue = iceObject.Ms;
				let self = this;
				let cFun = function (e) {
						self.Ff(0);
						let writer = StreamWriter.ka();
						writer.Xb(iceObject.version);
						writer.Fb(iceObject.password);
						self.rc = new ConnectingManager(iceObject.iceUrl, iceObject.iceServers, roomId, ChannelUtil.channels, writer, iceObject.iceToken);
						self.rc.rh = e;
						self.rc.Id = function (h) {
							self.rc = null;
							self.sa = h;
							h.wg = function (k) {
								k = new StreamReader(new DataView(k));
								self.Wq(k);
							}
							;
							h.qf = function () {
								3 != self.yd && FunctionRunner2.i(self.rf, iaVar.Qf('Connection closed'));
								self.la();
							}
							;
							h = window.setTimeout(function () {
								FunctionRunner2.i(self.rf, iaVar.Qf('Game state timeout'));
								self.la();
							}, 1E4);
							self.ze = h;
							self.Ff(2);
						}
						;
						self.rc.Cl = function () {
							self.Ff(1);
						}
						;
						let g = false;
						self.rc.tl = function () {
							g = true;
						}
						;
						self.rc.jd = function (h) {
							if (!e && 1 == self.yd && g)
								FunctionRunner1.i(self.uq),
									cFun(true);
							else {
								let k = ConnectingManager.ap(h);
								switch (h.pb) {
									case 0:
										h = iaVar.Je;
										break;
									case 1:
										h = iaVar.Ke(h.code);
										break;
									case 2:
										h = iaVar.Ie;
										break;
									default:
										h = iaVar.Qf(k);
								}
								FunctionRunner2.i(self.rf, h);
								self.la(k);
							}
						};
					}
				;
				cFun(null != iceObject.iceCrappyRouter && iceObject.iceCrappyRouter);
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
				let self = this;
				b.catch(function () {
					return null;
				}).then(function (d) {
					self.Lr(d);
				});
			}

			Sq(a) {
				a = pako.inflateRaw(a.tb());
				a = new StreamReader(new DataView(a.buffer, a.byteOffset, a.byteLength));
				this.roomClientPlayerId = a.Sb();
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
				let b = StreamWriter.ka();
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
				a = Action.mh(a);
				a.R = d;
				a.Ce = e;
				a.ob = b;
				a.Cc = c;
				return a;
			}

			Pq(a) {
				a = this.bn(a);
				this.Lg(a);
				a.R == this.roomClientPlayerId && this.Eg.kt(a.Ce);
				this.Xl();
			}

			Xq(a) {
				a = Action.mh(a);
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
					f < a ? FunctionRunner2.i(this.zl, -1) : FunctionRunner2.i(this.zl, c);
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
					c = StreamWriter.ka();
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
					var d = StreamWriter.ka();
					d.m(1);
					d.ub(c);
					d.ub(b);
					Action.wj(a, d);
					this.Vb(d);
					a.Kf.Ca && (a.Ce = b,
						a.R = this.roomClientPlayerId,
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

		class HostRoom extends Room2 {
			constructor(iceObject) {
				Room1.zb = true;
				super();
				Room1.zb = false;
				this.Za(iceObject);
			}

			Za(iceObject) {
				/** @type {Map<number, {}>} */
				this.Zj = new Map;
				this.Kb = null;
				this.qg = 32;
				/** @type {Map<number, PlayerConnection>} */
				this.Te = new Map;
				/** @type {PlayerConnection[]} */
				this.cc = [];
				this.Fi = 2;
				this.lo = 600;
				super.Za(iceObject.state);
				this.Up = iceObject.iceUrl;
				this.ys = iceObject.version;
				this.Vp = 1;
				this.al = this.roomClientPlayerId = 0;
				this.Vi = window.performance.now();
				this.Nc = new WebSocketManager(this.Up, iceObject.iceServers, ChannelUtil.channels, iceObject.iceToken);
				this.Nc.mk = function_M(this, this.mp);
				let self = this;
				this.Nc.xl = function (c) {
					self.nq(c);
				}
				;
				this.Nc.vg = function (c) {
					FunctionRunner2.i(self.vg, c);
				}
				;
				this.Nc.sf = function (c, d) {
					null != self.sf && self.sf(c, d);
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
					a = StreamWriter.ka();
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
					return basnetConnectionRequestResponseVar.Rf(4100);
				try {
					if (b.Sb() != this.ys)
						throw GlobalError.C(null);
				}
				catch (c) {
					return basnetConnectionRequestResponseVar.Rf(4103);
				}
				try {
					let c = b.Bb();
					if (null != this.Kb && c != this.Kb)
						throw GlobalError.C(null);
				}
				catch (c) {
					return basnetConnectionRequestResponseVar.Rf(4101);
				}
				return basnetConnectionRequestResponseVar.Gj;
			}

			nq(a) {
				if (this.cc.length >= this.qg)
					a.la();
				else {
					var b = new PlayerConnection(a);
					this.cc.push(b);
					var c = this;
					a.wg = function (d) {
						d = new StreamReader(new DataView(d));
						c.Qq(d, b);
					}
					;
					a.qf = function () {
						class_O.remove(c.cc, b);
						c.Te.delete(b.ba);
						FunctionRunner2.i(c.jq, b.ba);
					}
					;
					a = StreamWriter.ka(1 + b.Se.byteLength);
					a.m(0);
					a.nb(b.Se.byteLength);
					a.Lb(b.Se);
					b.Vb(a);
				}
			}

			fi(a) {
				let b = StreamWriter.ka();
				b.m(2);
				this.El(a, b);
				return b;
			}

			El(a, b) {
				b.ub(a.ob);
				b.nb(a.Cc);
				b.Xb(a.R);
				b.ub(a.Ce);
				Action.wj(a, b);
			}

			Li() {
				if (!(0 >= this.aa - this.bl) && 0 != this.cc.length) {
					var a = StreamWriter.ka();
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
				let b = StreamWriter.ka();
				b.m(1);
				let c = StreamWriter.ka();
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
					var a = new CheckSyncAction;
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
				AuthUtil.xs(c, a).catch(function () {
					return null;
				}).then(function (f) {
					try {
						if (-1 != e.cc.indexOf(b)) {
							b.tt = f;
							var g = e.Vp++;
							b.ba = g;
							e.Te.set(g, b);
							FunctionRunner3.i(e.iq, g, new StreamReader(new DataView(d.buffer, d.byteOffset, d.byteLength), false));
							b.Ig = true;
							e.Kr(b);
						}
					}
					catch (h) {
						f = GlobalError.Mb(h).Gb(),
							e.Pk(b, f);
					}
				});
			}

			Qq(a, b) {
				this.A();
				try {
					if (!b.fp.Ym())
						throw GlobalError.C(1);
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
								throw GlobalError.C(0);
						}
					else if (0 == c)
						this.$q(a, b);
					else
						throw GlobalError.C(0);
					if (0 < a.s.byteLength - a.a)
						throw GlobalError.C(2);
				}
				catch (c) {
					this.Pk(b, GlobalError.Mb(c).Gb());
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
				a = StreamWriter.ka();
				a.m(4);
				a.u((window.performance.now() - this.Vi) * this.Dc + this.Fi);
				a.u(c);
				b.Vb(a, 2);
			}

			ar(a, b) {
				var c = a.jb();
				let d = a.jb();
				a = Action.mh(a);
				var e = a.Kf.yj;
				if (null != e) {
					var f = b.Mj.get(e);
					null == f && (f = new TimestampUtil(e.lj, e.Ej),
						b.Mj.set(e, f));
					if (!f.Ym())
						throw GlobalError.C(3);
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
						b.playerConnPlayerPingUtil.pingUtil_method1(g < h ? h : g > k ? k : g);
					}
					f < e && -.85 > b.playerConnPlayerPingUtil.pingUtil_getMean() && (f = e);
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

		class ReplayRoom extends Room2 {
			/**
			 * @param {Uint8Array} replayUint8Array
			 * @param {RoomState} roomState
			 * @param {number} version
			 */
			constructor(replayUint8Array, roomState, version) {
				Room1.zb = true;
				super();
				Room1.zb = false;
				this.Za(replayUint8Array, roomState, version);
			}

			/**
			 * @param {Uint8Array} replayUint8Array
			 * @param {RoomState} roomState
			 * @param {number} version
			 */
			Za(replayUint8Array, roomState, version) {
				this.ml = [];
				this.Ll = 5;
				this.Pd = -1;
				this.sg = this.Ub = this.$h = this.Kk = 0;
				super.Za(roomState);
				let reader = new StreamReader(new DataView(replayUint8Array.buffer), false);
				if (1212305970 != reader.jb())
					throw GlobalError.C('');
				roomState = reader.jb();
				if (version != roomState)
					throw GlobalError.C(new ErrorIncompatible(roomState));
				this.yf = reader.jb();
				version = pako.inflateRaw(reader.tb());
				this.Rc = new StreamReader(new DataView(version.buffer, version.byteOffset, version.byteLength));
				this.dr(this.Rc);
				version = this.Rc.tb();
				this.Rc = new StreamReader(new DataView(version.buffer, version.byteOffset, version.byteLength), false);
				this.Ci();
				this.$h = window.performance.now();
				this.roomClientPlayerId = -1;
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
					this.rg = Action.mh(this.Rc),
					this.rg.R = a) : this.rg = null;
			}

			ep() {
				return this.aa / this.yf;
			}

			ua() {
			}

			eg() {
				this.A();
				CounterUtil.frameCount++;
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

		class Game {
			constructor() {
				this.jc = -1;
				this.ic = null;
				this.Tb = this.Ob = this.Mc = this.Ra = 0;
				this.ie = Team.red;
				this.yc = this.Db = 0;
				this.va = new GameObjects;
				this.Ga = 0;
				this.kb = 5;
				/** @type {Stadium} */
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
				if (a.fa == Team.spec)
					a.J = null;
				else {
					a.W = 0;
					var b = a.J;
					null == b && (b = new DynamicDisc,
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
					var d = a.fa == Team.red ? this.T.Nd : this.T.vd;
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
						0 != (h.B & 128) && (Game.wk[c] = f,
							f = Game.rl[c],
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
						d = Team.spec;
						b = this.va.H;
						for (a = 0; a < c && (d = a++,
							d = this.T.jo(b[Game.wk[d]].a, Game.rl[d]),
						d == Team.spec);)
							;
						d != Team.spec ? (this.Db = 2,
							this.yc = 150,
							this.ie = d,
							d == Team.red ? this.Ob++ : this.Tb++,
						null != this.Qa.Xi && this.Qa.Xi(d.enemyTeam),
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
				null != this.Qa.Yi && this.Qa.Yi(this.Tb > this.Ob ? Team.red : Team.blue);
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
					e != Team.spec) {
						f = d.J.a;
						var g = this.T
							,
							h = b[e.ba]
							,
							k = e == Team.red ? g.Nd : g.vd;
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
				this.ie = 1 == a ? Team.red : 2 == a ? Team.blue : Team.spec;
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
				let a = CounterUtil.frameCount
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new Game),
					this.jc = a,
					Game.zd(b, this));
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

		class GameObjects {
			constructor() {
				this.jc = -1;
				this.ic = null;
				/** @type {DynamicDisc[]} */
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
					let d = new DynamicDisc;
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
				let a = CounterUtil.frameCount
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new GameObjects),
					this.jc = a,
					GameObjects.zd(b, this));
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

		class TeamColors {
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
					throw GlobalError.C('too many');
				this.hb = [];
				let c = 0;
				for (; c < b;)
					++c,
						this.hb.push(a.N());
			}
		}

		class Team {
			constructor(a, b, c, d, e, f, g, h) {
				/** @type {Team} */
				this.enemyTeam = null;
				this.ba = a;
				this.S = b;
				this.Gh = c;
				this.Cp = d;
				this.D = e;
				this.Go = f;
				this.B = h;
				this.Rm = new TeamColors;
				this.Rm.hb.push(b);
			}
		}

		class StadiumPlayerPhysics {
			constructor() {
				this.df = 0;
				this.V = 15;
				this.B = 0;
				this.ra = new Point(0, 0);
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

		class FullPlayer {
			constructor() {
				this.Bc = -1;
				/** @type {FullPlayer} */
				this.xn = null;
				/** @type {Team} */
				this.fa = Team.spec;
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
				this.fa = 1 == c ? Team.red : 2 == c ? Team.blue : Team.spec;
				a = a.vi();
				this.J = 0 > a ? null : b[a];
			}

			getExtrapolatedFullPlayer() {
				let frameCount = CounterUtil.frameCount;
				let extrapolatedFullPlayer = this.xn;
				if (this.Bc != frameCount) {
					null == extrapolatedFullPlayer && (this.xn = extrapolatedFullPlayer = new FullPlayer);
					this.Bc = frameCount;
					FullPlayer.Is(extrapolatedFullPlayer, this);
				}
				return extrapolatedFullPlayer;
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

		class Stadium {
			constructor() {
				this.L = [];
				this.X = [];
				this.ta = [];
				this.vc = [];
				this.H = [];
				this.qb = [];
				this.Nd = [];
				this.vd = [];
				this.Ld = new StadiumPlayerPhysics;
				this.Fh = 255;
				this.Re = this.kf = 0;
				this.Xf = true;
				this.Af = false;
			}

			og() {
				let a = new Disc;
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
						let k = new Point(0, 0);
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
					var e = new Vertex;
					e.ma(a);
					e.Dd = d++;
					this.L.push(e);
				}
				this.X = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new Segment,
						e.ma(a, this.L),
						this.X.push(e);
				this.ta = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new Plane,
						e.ma(a),
						this.ta.push(e);
				this.vc = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new Goal,
						e.ma(a),
						this.vc.push(e);
				this.H = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new Disc,
						e.ma(a),
						this.H.push(e);
				this.qb = [];
				c = a.F();
				for (d = 0; d < c;)
					++d,
						e = new Joint,
						e.ma(a),
						this.qb.push(e);
				this.Nd = b();
				this.vd = b();
				this.oe();
				if (!this.cn())
					throw GlobalError.C(new DialogError('Invalid stadium'));
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
				return null != a ? CastUtil.I(a, number1) : 0;
			}

			Pp(a) {
				a = a.canBeStored;
				return null != a ? CastUtil.I(a, number2) : true;
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
					c.push(Stadium.zs(f));
				}
				d = new Segment;
				b = [];
				e = 0;
				for (f = this.X; e < f.length;)
					b.push(Stadium.Ir(f[e++], d));
				d = [];
				e = 0;
				for (f = this.ta; e < f.length;)
					d.push(Stadium.Iq(f[e++]));
				e = [];
				f = 0;
				for (var g = this.vc; f < g.length;)
					e.push(Stadium.hp(g[f++]));
				f = Stadium.Lq(this.Ld);
				var h = new Disc;
				g = [];
				for (var k = 0, l = this.H; k < l.length;)
					g.push(Stadium.Ko(l[k++], h));
				h = [];
				k = 0;
				for (l = this.qb; k < l.length;)
					h.push(Stadium.Ap(l[k++]));
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
				Stadium.oa(c, 'maxViewWidth', this.kf, 0);
				Stadium.oa(c, 'cameraFollow', 1 == this.Re ? 'player' : '', '');
				Stadium.oa(c, 'spawnDistance', this.mc, 200);
				0 != h.length && (c.joints = h);
				0 != k.length && (c.redSpawnPoints = k);
				0 != l.length && (c.blueSpawnPoints = l);
				Stadium.oa(c, 'kickOffReset', this.Af ? 'full' : 'partial', 'partial');
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
				Stadium.oa(a, 'type', b, 'none');
				Stadium.oa(a, 'width', this.be, 0);
				Stadium.oa(a, 'height', this.ae, 0);
				Stadium.oa(a, 'kickOffRadius', this.ad, 0);
				Stadium.oa(a, 'cornerRadius', this.Fc, 0);
				Stadium.Bg(a, this.td, 7441498);
				Stadium.oa(a, 'goalLine', this.Qe, 0);
				return c;
			}

			cl(a) {
				function b(h) {
					let k = CastUtil.I(h[0], number1);
					h = CastUtil.I(h[1], number1);
					null == h && (h = 0);
					null == k && (k = 0);
					return new Point(k, h);
				}

				function c(h, k, l, n) {
					null == n && (n = false);
					var r = d[k];
					if (!n || null != r)
						if (n = CastUtil.I(r, Array),
						null != n)
							for (r = 0; r < n.length;) {
								let t = n[r];
								++r;
								try {
									Stadium.Sn(t, f),
										h.push(l(t));
								}
								catch (z) {
									throw GlobalError.C(new DialogError('Error in "' + k + '" index: ' + h.length));
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
				this.D = CastUtil.I(d.name, String);
				this.bc = CastUtil.I(d.width, number1);
				this.sc = CastUtil.I(d.height, number1);
				this.kf = this.je(d, 'maxViewWidth') | 0;
				'player' == d.cameraFollow && (this.Re = 1);
				this.mc = 200;
				a = d.spawnDistance;
				null != a && (this.mc = CastUtil.I(a, number1));
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
				null != a.color && (this.td = Stadium.mg(a.color));
				this.Qe = this.je(a, 'goalLine');
				this.Xf = this.Pp(d);
				this.Af = 'full' == d.kickOffReset;
				let f = d.traits;
				a = d.ballPhysics;
				'disc0' != a && (null != a ? (a = Stadium.dl(a, this.og()),
					a.B |= 192,
					this.H.push(a)) : this.H.push(this.og()));
				c(this.L, 'vertexes', Stadium.Op);
				let g = this;
				c(this.X, 'segments', function (h) {
					return Stadium.Np(h, g.L);
				});
				c(this.vc, 'goals', Stadium.Jp);
				c(this.H, 'discs', function (h) {
					return Stadium.dl(h, new Disc);
				});
				c(this.ta, 'planes', Stadium.Lp);
				c(this.qb, 'joints', function (h) {
					return Stadium.Kp(h, g.H);
				}, true);
				c(this.Nd, 'redSpawnPoints', b, true);
				c(this.vd, 'blueSpawnPoints', b, true);
				a = d.playerPhysics;
				null != a && (this.Ld = Stadium.Mp(a));
				if (255 < this.L.length || 255 < this.X.length || 255 < this.ta.length || 255 < this.vc.length || 255 < this.H.length)
					throw GlobalError.C('Error');
				this.oe();
				if (!this.cn())
					throw GlobalError.C(new DialogError('Invalid stadium'));
			}

			ik() {
				let a = Stadium.ls;
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
				return Team.spec;
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
				a = new Plane;
				var k = a.ya;
				k.x = 0;
				k.y = 1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new Plane;
				k = a.ya;
				k.x = 0;
				k.y = -1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new Plane;
				k = a.ya;
				k.x = 1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				a = new Plane;
				k = a.ya;
				k.x = -1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				this.pg(d, 1, f, 13421823, Team.blue);
				this.pg(-d, -1, f, 16764108, Team.red);
				this.il(g, c);
				b = new Plane;
				c = b.ya;
				c.x = 0;
				c.y = 1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
				b = new Plane;
				c = b.ya;
				c.x = 0;
				c.y = -1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
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
				f.Z = c;
				f.ea = g;
				f.h = 1;
				f.bb = false;
				t = new Segment;
				t.Z = a;
				t.ea = k;
				t.h = 1;
				t.bb = false;
				let z = new Segment;
				z.Z = l;
				z.ea = n;
				z.h = 1;
				z.bb = false;
				let J = new Segment;
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
				a = new Plane;
				var k = a.ya;
				k.x = 0;
				k.y = 1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new Plane;
				k = a.ya;
				k.x = 0;
				k.y = -1;
				a.Va = -c;
				a.o = 0;
				this.ta.push(a);
				a = new Plane;
				k = a.ya;
				k.x = 1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				a = new Plane;
				k = a.ya;
				k.x = -1;
				k.y = 0;
				a.Va = -b;
				a.o = 0;
				this.ta.push(a);
				this.pg(d - g, 1, f, 13421823, Team.blue, 63);
				this.pg(-d + g, -1, f, 16764108, Team.red, 63);
				this.il(75, c);
				b = new Plane;
				c = b.ya;
				c.x = 0;
				c.y = 1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
				b = new Plane;
				c = b.ya;
				c.x = 0;
				c.y = -1;
				b.Va = -e;
				b.h = 1;
				this.ta.push(b);
				b = new Plane;
				c = b.ya;
				c.x = 1;
				c.y = 0;
				b.Va = -d;
				b.h = 1;
				this.ta.push(b);
				b = new Plane;
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
				l.Z = h;
				l.ea = n;
				l.Uc(90 * b);
				let t = new Segment;
				t.Z = r;
				t.ea = n;
				let z = new Segment;
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
				f = new Disc;
				g = f.a;
				g.x = a;
				g.y = -c;
				f.ca = 0;
				f.V = 8;
				f.S = d;
				this.H.push(f);
				f = new Disc;
				g = f.a;
				g.x = a;
				g.y = c;
				f.ca = 0;
				f.V = 8;
				f.S = d;
				this.H.push(f);
				d = new Goal;
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
				let c = new Vertex;
				var d = c.a;
				d.x = 0;
				d.y = -b;
				c.o = .1;
				c.B = 24;
				c.h = 6;
				d = new Vertex;
				var e = d.a;
				e.x = 0;
				e.y = -a;
				d.o = .1;
				d.B = 24;
				d.h = 6;
				e = new Vertex;
				var f = e.a;
				f.x = 0;
				f.y = a;
				e.o = .1;
				e.B = 24;
				e.h = 6;
				a = new Vertex;
				f = a.a;
				f.x = 0;
				f.y = b;
				a.o = .1;
				a.B = 24;
				a.h = 6;
				b = new Segment;
				b.Z = c;
				b.ea = d;
				b.B = 24;
				b.h = 6;
				b.bb = false;
				b.o = .1;
				f = new Segment;
				f.Z = e;
				f.ea = a;
				f.B = 24;
				f.h = 6;
				f.bb = false;
				f.o = .1;
				let g = new Segment;
				g.Z = d;
				g.ea = e;
				g.B = 8;
				g.h = 6;
				g.bb = false;
				g.Uc(180);
				g.o = .1;
				let h = new Segment;
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
					a.Z = d;
					a.ea = e;
					a.h = 1;
					a.bb = false;
					a.o = 1;
					a.Uc(-90);
					b = new Segment;
					b.Z = f;
					b.ea = g;
					b.h = 1;
					b.bb = false;
					b.o = 1;
					b.Uc(90);
					c = new Segment;
					c.Z = h;
					c.ea = k;
					c.h = 1;
					c.bb = false;
					c.o = 1;
					c.Uc(-90);
					r = new Segment;
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
				return 255 == b ? (b = new Stadium,
					b.rs(a),
					b) : Stadium.Nh()[b];
			}

			static Nh() {
				if (null == Stadium.xb) {
					Stadium.xb = [];
					var a = new Stadium;
					a.hd('Classic', 420, 200, 370, 170, 64, 75);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hd('Easy', 420, 200, 370, 170, 90, 75);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hd('Small', 420, 200, 320, 130, 55, 70);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hd('Big', 600, 270, 550, 240, 80, 80);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hd('Rounded', 420, 200, 370, 170, 64, 75, 75);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hl('Hockey', 420, 204, 398, 182, 68, 120, 100);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hl('Big Hockey', 600, 270, 550, 240, 90, 160, 150);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hd('Big Easy', 600, 270, 550, 240, 95, 80);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hd('Big Rounded', 600, 270, 550, 240, 80, 75, 100);
					Stadium.xb.push(a);
					a = new Stadium;
					a.hd('Huge', 750, 350, 700, 320, 100, 80);
					Stadium.xb.push(a);
					a = 0;
					let b = Stadium.xb.length;
					for (; a < b;) {
						let c = a++;
						Stadium.xb[c].Fh = c;
					}
				}
				return Stadium.xb;
			}

			static Sn(a, b) {
				if (null != a.trait && (b = b[CastUtil.I(a.trait, String)],
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
				a = CastUtil.I(a, Array);
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
				c != d && (a[b] = Stadium.ao(c));
			}

			static Bg(a, b, c) {
				b != c && (a.color = Stadium.qo(b));
			}

			static qo(a) {
				a |= 0;
				return 0 > a ? 'transparent' : class_ba.bh(a);
			}

			static mg(a) {
				if ('transparent' == a)
					return -1;
				if ('string' == typeof a)
					return StringOpsInt.parseInt('0x' + StringOpsInt.Fe(a));
				if (a instanceof Array)
					return ((a[0] | 0) << 16) + ((a[1] | 0) << 8) + (a[2] | 0);
				throw GlobalError.C('Bad color');
			}

			static zs(a) {
				let b = {
					x: a.a.x,
					y: a.a.y
				};
				Stadium.oa(b, 'bCoef', a.o, 1);
				Stadium.Oc(b, 'cMask', a.h, 63);
				Stadium.Oc(b, 'cGroup', a.B, 32);
				return b;
			}

			static Op(a) {
				let b = new Vertex;
				b.a.x = CastUtil.I(a.x, number1);
				b.a.y = CastUtil.I(a.y, number1);
				var c = a.bCoef;
				null != c && (b.o = CastUtil.I(c, number1));
				c = a.cMask;
				null != c && (b.h = Stadium.Jc(c));
				a = a.cGroup;
				null != a && (b.B = Stadium.Jc(a));
				return b;
			}

			static Ir(a, b) {
				let c = {
					v0: a.Z.Dd,
					v1: a.ea.Dd
				};
				Stadium.oa(c, 'bias', a.Gc, b.Gc);
				Stadium.oa(c, 'bCoef', a.o, b.o);
				let d = a.$o();
				Stadium.oa(c, 'curve', d, 0);
				0 != d && (c.curveF = a.wb);
				Stadium.oa(c, 'vis', a.bb, b.bb);
				Stadium.Oc(c, 'cMask', a.h, b.h);
				Stadium.Oc(c, 'cGroup', a.B, b.B);
				Stadium.Bg(c, a.S, b.S);
				return c;
			}

			static Np(a, b) {
				let c = new Segment;
				var d = CastUtil.I(a.v1, object1);
				c.Z = b[CastUtil.I(a.v0, object1)];
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
				null != b && (c.Gc = CastUtil.I(b, number1));
				null != d && (c.o = CastUtil.I(d, number1));
				null != f ? c.wb = CastUtil.I(f, number1) : null != e && c.Uc(CastUtil.I(e, number1));
				null != g && (c.bb = CastUtil.I(g, number2));
				null != h && (c.h = Stadium.Jc(h));
				null != k && (c.B = Stadium.Jc(k));
				null != a && (c.S = Stadium.mg(a));
				return c;
			}

			static Ap(a) {
				let b = {
					d0: a.ge,
					d1: a.he,
					length: a.Jb >= a.fc ? a.Jb : [a.Jb, a.fc]
				};
				Stadium.Bg(b, a.S, 0);
				Stadium.oa(b, 'strength', a.we, 1 / 0);
				return b;
			}

			static Kp(a, b) {
				let c = new Joint;
				var d = CastUtil.I(a.d0, object1)
					,
					e = CastUtil.I(a.d1, object1);
				let f = a.color
					,
					g = a.strength;
				a = a.length;
				if (d >= b.length || 0 > d)
					throw GlobalError.C(null);
				if (e >= b.length || 0 > e)
					throw GlobalError.C(null);
				c.ge = d;
				c.he = e;
				null == a ? (d = b[d],
					e = b[e],
					null == d || null == e ? c.fc = c.Jb = 100 : (b = d.a,
						d = e.a,
						e = b.x - d.x,
						b = b.y - d.y,
						c.fc = c.Jb = Math.sqrt(e * e + b * b))) : a instanceof Array ? (c.Jb = CastUtil.I(a[0], number1),
					c.fc = CastUtil.I(a[1], number1)) : c.fc = c.Jb = CastUtil.I(a, number1);
				c.we = null == g || 'rigid' == g ? 1 / 0 : CastUtil.I(g, number1);
				null != f && (c.S = Stadium.mg(f));
				return c;
			}

			static Iq(a) {
				let b = {
					normal: [a.ya.x, a.ya.y],
					dist: a.Va
				};
				Stadium.oa(b, 'bCoef', a.o, 1);
				Stadium.Oc(b, 'cMask', a.h, 63);
				Stadium.Oc(b, 'cGroup', a.B, 32);
				return b;
			}

			static Lp(a) {
				let b = new Plane;
				var c = CastUtil.I(a.normal, Array)
					,
					d = CastUtil.I(c[0], number1)
					,
					e = CastUtil.I(c[1], number1);
				c = b.ya;
				let f = d;
				var g = e;
				null == e && (g = 0);
				null == d && (f = 0);
				d = f;
				e = Math.sqrt(d * d + g * g);
				c.x = d / e;
				c.y = g / e;
				b.Va = CastUtil.I(a.dist, number1);
				c = a.bCoef;
				d = a.cMask;
				a = a.cGroup;
				null != c && (b.o = CastUtil.I(c, number1));
				null != d && (b.h = Stadium.Jc(d));
				null != a && (b.B = Stadium.Jc(a));
				return b;
			}

			static hp(a) {
				return {
					p0: [a.Z.x, a.Z.y],
					p1: [a.ea.x, a.ea.y],
					team: a.ye == Team.red ? 'red' : 'blue'
				};
			}

			static Jp(a) {
				let b = new Goal;
				var c = CastUtil.I(a.p0, Array);
				let d = CastUtil.I(a.p1, Array)
					,
					e = b.Z;
				e.x = c[0];
				e.y = c[1];
				c = b.ea;
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
						throw GlobalError.C('Bad team value');
				}
				b.ye = a;
				return b;
			}

			static Lq(a) {
				let b = {};
				Stadium.oa(b, 'bCoef', a.o, .5);
				Stadium.oa(b, 'invMass', a.ca, .5);
				Stadium.oa(b, 'damping', a.Ea, .96);
				Stadium.oa(b, 'acceleration', a.Ne, .1);
				Stadium.oa(b, 'kickingAcceleration', a.ef, .07);
				Stadium.oa(b, 'kickingDamping', a.ff, .96);
				Stadium.oa(b, 'kickStrength', a.cf, 5);
				Stadium.Oc(b, 'cGroup', a.B, 0);
				if (0 != a.ra.x || 0 != a.ra.y)
					b.gravity = [a.ra.x, a.ra.y];
				Stadium.oa(b, 'radius', a.V, 15);
				Stadium.oa(b, 'kickback', a.df, 0);
				return b;
			}

			static Mp(a) {
				let b = new StadiumPlayerPhysics;
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
				null != c && (b.o = CastUtil.I(c, number1));
				null != d && (b.ca = CastUtil.I(d, number1));
				null != e && (b.Ea = CastUtil.I(e, number1));
				null != f && (b.Ne = CastUtil.I(f, number1));
				null != g && (b.ef = CastUtil.I(g, number1));
				null != h && (b.ff = CastUtil.I(h, number1));
				null != k && (b.cf = CastUtil.I(k, number1));
				null != l && (c = b.ra,
					d = CastUtil.I(l[1], number1),
					c.x = CastUtil.I(l[0], number1),
					c.y = d);
				null != n && (b.B = Stadium.Jc(n));
				null != r && (b.V = CastUtil.I(r, number1));
				null != a && (b.df = CastUtil.I(a, number1));
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
				Stadium.oa(c, 'radius', a.V, b.V);
				Stadium.oa(c, 'bCoef', a.o, b.o);
				Stadium.oa(c, 'invMass', a.ca, b.ca);
				Stadium.oa(c, 'damping', a.Ea, b.Ea);
				Stadium.Bg(c, a.S, b.S);
				Stadium.Oc(c, 'cMask', a.h, b.h);
				Stadium.Oc(c, 'cGroup', a.B, b.B);
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
				null != f && (b.V = CastUtil.I(f, number1));
				null != g && (b.o = CastUtil.I(g, number1));
				null != h && (b.ca = CastUtil.I(h, number1));
				null != k && (b.Ea = CastUtil.I(k, number1));
				null != l && (b.S = Stadium.mg(l));
				null != n && (b.h = Stadium.Jc(n));
				null != a && (b.B = Stadium.Jc(a));
				return b;
			}

			static oa(a, b, c, d) {
				c != d && (a[b] = c);
			}
		}

		class Vertex {
			constructor() {
				this.Dd = 0;
				this.B = 32;
				this.h = 63;
				this.o = 1;
				this.a = new Point(0, 0);
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

		class Segment {
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
				a > Segment.segVal1 && a < Segment.segVal2 && (this.wb = 1 / Math.tan(a / 2));
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
					this.fe = new Point(b.x + c + -a * d, b.y + a + c * d);
					a = this.Z.a;
					b = this.fe;
					c = a.x - b.x;
					a = a.y - b.y;
					this.qk = Math.sqrt(c * c + a * a);
					c = this.Z.a;
					a = this.fe;
					this.Og = new Point(-(c.y - a.y), c.x - a.x);
					c = this.fe;
					a = this.ea.a;
					this.Pg = new Point(-(c.y - a.y), c.x - a.x);
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
						this.ya = new Point(a / b, c / b);
			}
		}

		class Plane {
			constructor() {
				this.B = 32;
				this.h = 63;
				this.o = 1;
				this.Va = 0;
				this.ya = new Point(0, 0);
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

		class Disc {
			constructor() {
				this.h = this.B = 63;
				this.S = 16777215;
				this.Ea = .99;
				this.ca = 1;
				this.o = .5;
				this.V = 10;
				this.ra = new Point(0, 0);
				this.G = new Point(0, 0);
				this.a = new Point(0, 0);
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
				let a = new DynamicDisc;
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

		class Goal {
			constructor() {
				this.ye = Team.spec;
				this.ea = new Point(0, 0);
				this.Z = new Point(0, 0);
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
				this.ye = 1 == a ? Team.red : 2 == a ? Team.blue : Team.spec;
			}
		}

		class Joint {
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

		class DynamicDisc {
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
				this.ra = new Point(0, 0);
				this.G = new Point(0, 0);
				this.a = new Point(0, 0);
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
				let a = CounterUtil.frameCount
					,
					b = this.ic;
				this.jc != a && (null == b && (this.ic = b = new DynamicDisc),
					this.jc = a,
					DynamicDisc.zd(b, this));
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

		class Point {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class Replay {
			constructor(a, b) {
				this.tn = 0;
				this.version = 1;
				this.ih = 0;
				this.Wd = StreamWriter.ka(1E3);
				this.Of = StreamWriter.ka(16384);
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
					Action.wj(f, d.Of);
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
					b = StreamWriter.ka(a.byteLength + 32);
				b.ij('HBR2');
				b.ub(this.version);
				b.ub(this.tj.aa - this.ih);
				b.Lb(a);
				return b.Wb();
			}
		}

		class ReplayDownloader {
			static Dr(a, b) {
				ReplayDownloader.sm(new Blob([a], {
					type: 'octet/stream'
				}), b);
			}

			static Er(a, b) {
				ReplayDownloader.sm(new Blob([a], {
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

		class PlayerPingUtil {
			constructor(a) {
				let b = []
					,
					c = 0;
				for (; c < a;)
					++c,
						b.push(0);
				this.pingUtilArray1 = b;
				this.pingUtilSum = this.pingUtilNumber2 = 0;
			}

			pingUtil_method1(a) {
				this.pingUtilSum -= this.pingUtilArray1[this.pingUtilNumber2];
				this.pingUtilArray1[this.pingUtilNumber2] = a;
				this.pingUtilSum += a;
				this.pingUtilNumber2++;
				this.pingUtilNumber2 >= this.pingUtilArray1.length && (this.pingUtilNumber2 = 0);
			}

			pingUtil_getMean() {
				return this.pingUtilSum / this.pingUtilArray1.length;
			}
		}

		class class_Cast3 {
		}

		class PingGraph {
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

		class Connection1 {
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
						b = GlobalError.Mb(c).Gb(),
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

		class BigTextManager {
			constructor() {
				this.Wc = 0;
				this.eb = [];
				this.fs = new BigAnimatedText(['Time is', 'Up!'], 16777215);
				this.hr = new BigAnimatedText(['Red is', 'Victorious!'], 15035990);
				this.gr = new BigAnimatedText(['Red', 'Scores!'], 15035990);
				this.$n = new BigAnimatedText(['Blue is', 'Victorious!'], 625603);
				this.Zn = new BigAnimatedText(['Blue', 'Scores!'], 625603);
				this.Gq = new BigAnimatedText(['Game', 'Paused'], 16777215);
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

		class LocalStorageUtil {
			constructor() {
				function getLSItem(key) {
					return new LocalStorageItem(key, ls, function (h) {
							if (null == h)
								return null;
							try {
								return GeoLocation.Lh(h);
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

				function getLSBoolItem(key, defaultValue) {
					return new LocalStorageItem(key, ls, function (k) {
							return null != k ? '0' != k : defaultValue;
						}
						, function (k) {
							return k ? '1' : '0';
						}
					);
				}

				function getLSFloatItem(key, defaultValue) {
					return new LocalStorageItem(key, ls, function (k) {
							let l = defaultValue;
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

				function getLSIntItem(key, defaultValue) {
					return new LocalStorageItem(key, ls, function (k) {
							let l = defaultValue;
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

				function getLSStringItem(key, defaultValue, maxLength) {
					return new LocalStorageItem(key, ls, function (l) {
							return null == l ? defaultValue : StringOpsSubstr.Xc(l, maxLength);
						}
						, function (l) {
							return l;
						}
					);
				}

				let ls = LocalStorageInitializer.ln();
				this.lsPlayerName = getLSStringItem('player_name', '', 25);
				this.lsViewMode = getLSIntItem('view_mode', -1);
				this.lsFpsLimit = getLSIntItem('fps_limit', 0);
				this.lsAvatar = getLSStringItem('avatar', null, 2);
				getLSStringItem('rctoken', null, 1024);
				this.lsTeamColors = getLSBoolItem('team_colors', true);
				this.lsShowIndicators = getLSBoolItem('show_indicators', true);
				this.lsSoundVolume = getLSFloatItem('sound_volume', 1);
				this.lsSoundMain = getLSBoolItem('sound_main', true);
				this.lsSoundChat = getLSBoolItem('sound_chat', true);
				this.lsSoundHighlight = getLSBoolItem('sound_highlight', true);
				this.lsSoundCrowd = getLSBoolItem('sound_crowd', true);
				this.lsPlayerAuthKey = getLSStringItem('player_auth_key', null, 1024);
				this.lsExtrapolation = getLSIntItem('extrapolation', 0);
				this.lsResolutionScale = getLSFloatItem('resolution_scale', 1);
				this.lsShowAvatars = getLSBoolItem('show_avatars', true);
				this.lsChatHeight = getLSIntItem('chat_height', 160);
				this.lsChatFocusHeight = getLSIntItem('chat_focus_height', 140);
				this.lsChatOpacity = getLSFloatItem('chat_opacity', .8);
				this.lsChatBgMode = getLSStringItem('chat_bg_mode', 'compact', 50);
				this.lsLowLatencyCanvas = getLSBoolItem('low_latency_canvas', true);
				this.lsGeo = getLSItem('geo');
				this.lsGeoOverride = getLSItem('geo_override');
				this.lsPlayerKeys = function () {
					return new LocalStorageItem('player_keys', ls, function (g) {
							if (null == g)
								return ControlsUtil.sk();
							try {
								return ControlsUtil.Lh(g);
							}
							catch (h) {
								return ControlsUtil.sk();
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

			getPlayerGeoFromLS() {
				return null != this.lsGeoOverride.v() ? this.lsGeoOverride.v() : null != this.lsGeo.v() ? this.lsGeo.v() : new GeoLocation;
			}
		}

		class RoomMenuContainer {
			constructor(clientPlayerId) {
				this.yk = false;
				this.Lm = new PlayerListContainer(Team.spec);
				this.$j = new PlayerListContainer(Team.blue);
				this.dm = new PlayerListContainer(Team.red);
				this.f = ViewUtil.Ia(RoomMenuContainer.htmlContents);
				let b = ViewUtil.Ba(this.f);
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
					FunctionRunner1.i(f.zq);
				}
				;
				this.Wh(b.get('red-list'), this.dm, clientPlayerId);
				this.Wh(b.get('blue-list'), this.$j, clientPlayerId);
				this.Wh(b.get('spec-list'), this.Lm, clientPlayerId);
				this.ll(this.If, this.kl());
				this.ll(this.Bf, this.kl());
				this.If.onchange = function () {
					FunctionRunner2.i(f.Dq, f.If.selectedIndex);
				}
				;
				this.Bf.onchange = function () {
					FunctionRunner2.i(f.vq, f.Bf.selectedIndex);
				}
				;
				this.Om.onclick = function () {
					FunctionRunner1.i(f.Aq);
				}
				;
				this.Qm.onclick = function () {
					FunctionRunner1.i(f.Bq);
				}
				;
				this.ni.onclick = function () {
					FunctionRunner1.i(f.oq);
				}
				;
				this.Tn.onclick = function () {
					FunctionRunner1.i(f.eq);
				}
				;
				this.el.onclick = function () {
					FunctionRunner2.i(f.Cq, !f.ai);
				}
				;
				this.nm.onclick = function () {
					null != f.me && (f.me(Team.blue),
						f.me(Team.red));
				}
				;
				this.bm.onclick = function () {
					FunctionRunner1.i(f.sq);
				}
				;
				c.onclick = function () {
					FunctionRunner1.i(f.yq);
				}
				;
				d.onclick = function () {
					FunctionRunner1.i(f.le);
				}
				;
				e.onclick = function () {
					FunctionRunner1.i(f.rq);
				}
				;
				this.Qj(false);
				this.Rj(false);
			}

			Wh(a, b, c) {
				ViewUtil.replaceWith(a, b.f);
				let d = this;
				b.xg = function (e, f) {
					FunctionRunner3.i(d.xg, e, f);
				}
				;
				b.me = function (e) {
					FunctionRunner2.i(d.me, e);
				}
				;
				b.lq = function (e) {
					FunctionRunner3.i(d.xg, c, e);
				}
				;
				b.tf = function (e) {
					FunctionRunner2.i(d.tf, e);
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
					k.fa == Team.red && g.push(k);
				}
				e.A(g, d, c, b);
				e = this.$j;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.fa == Team.blue && g.push(k);
				e.A(g, d, c, b);
				e = this.Lm;
				f = a.K;
				g = [];
				for (h = 0; h < f.length;)
					k = f[h],
						++h,
					k.fa == Team.spec && g.push(k);
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

		class ChangeLocationDialogContainer {
			constructor() {
				this.Df = null;
				this.f = ViewUtil.Ia(ChangeLocationDialogContainer.htmlContents);
				var a = ViewUtil.Ba(this.f);
				let b = this;
				a.get('cancel').onclick = function () {
					FunctionRunner1.i(b.rb);
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
				let c = ScrollUtil.ei(a);
				window.setTimeout(function () {
					c.update();
				}, 0);
			}

			si(a) {
				let b = this
					,
					c = 0
					,
					d = CountriesUtil.codesArray.length >> 2;
				for (; c < d;) {
					var e = c++;
					let f = e
						,
						g = CountriesUtil.codesArray[e << 2];
					e = CountriesUtil.codesArray[(e << 2) + 1].toLowerCase();
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
				let geoLocation = new GeoLocation;
				geoLocation.vb = CountriesUtil.codesArray[(a << 2) + 1].toLowerCase();
				geoLocation.Ic = CountriesUtil.codesArray[(a << 2) + 2];
				geoLocation.Lc = CountriesUtil.codesArray[(a << 2) + 3];
				ConnectionConstants.localStorageUtilInst.lsGeoOverride.setLSItem(geoLocation);
				FunctionRunner1.i(this.rb);
			}
		}

		class ContainerUtil {
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

			static rj(aFun) {
				ContainerUtil.Ts() && ContainerUtil.Ns(function () {
					ActionManager.rj();
					let b = null == ConnectionConstants.localStorageUtilInst.lsGeo.v() ? GeoLocation.cp().then(function (d) {
						ConnectionConstants.localStorageUtilInst.lsGeo.setLSItem(d);
					}, function () {
					}) : Promise.resolve(null);
					let c = WebserverApiOps.v(window.parent._gdir + 'res.dat', 'arraybuffer').then(function (res) {
						res = new JSZip(res);
						ConnectionConstants.audioUtil = new AudioUtil(res);
						return Promise.all([ConnectionConstants.audioUtil.Po, ContainerUtil.dh(res.file('images/grass.png').asArrayBuffer()).then(function (e) {
							return ConnectionConstants.grassImage = e;
						}), ContainerUtil.dh(res.file('images/concrete.png').asArrayBuffer()).then(function (e) {
							return ConnectionConstants.concreteImage = e;
						}), ContainerUtil.dh(res.file('images/concrete2.png').asArrayBuffer()).then(function (e) {
							return ConnectionConstants.concrete2Image = e;
						}), ContainerUtil.dh(res.file('images/typing.png').asArrayBuffer()).then(function (e) {
							return ConnectionConstants.typingImage = e;
						})]);
					});
					Promise.all([c, b]).then(function () {
						ContainerUtil.bt(aFun);
					});
				});
			}

			static Ns(a) {
				let modernizr = Modernizr
					,
					c = ['canvas', 'datachannel', 'dataview', 'es6collections', 'peerconnection', 'promises', 'websockets']
					,
					d = []
					,
					e = 0;
				for (; e < c.length;) {
					let f = c[e];
					++e;
					modernizr[f] || d.push(f);
				}
				0 != d.length ? (window.document.body.innerHTML = '',
					ContainerUtil.Wg = window.document.createElement('div'),
					window.document.body.appendChild(ContainerUtil.Wg),
					a = new UnsupportedBrowserContainer(d),
					ContainerUtil.Na(a.f)) : a();
			}

			static bt(aFun) {
				window.document.body.innerHTML = '';
				ContainerUtil.Wg = window.document.createElement('div');
				window.document.body.appendChild(ContainerUtil.Wg);
				let b = null;
				b = function () {
					ConnectionConstants.audioUtil.om();
					window.document.removeEventListener('click', b, true);
				}
				;
				window.document.addEventListener('click', b, true);
				aFun();
			}

			static Na(a) {
				null != ContainerUtil.rn && ContainerUtil.rn.remove();
				null != a && (ContainerUtil.Wg.appendChild(a),
					ContainerUtil.rn = a);
			}
		}

		class GameStateContainer {
			constructor() {
				this.field_clientPlayerId = -1;
				this.gameStateContGameCanvas = new GameCanvas(ConnectionConstants.localStorageUtilInst.lsLowLatencyCanvas.v());
				this.gameStateContGameTimerCont = new GameTimerContainer;
				this.f = ViewUtil.Ia(GameStateContainer.htmlContents);
				let viewMap = ViewUtil.Ba(this.f);
				this.gameStateContRedScoreItem = new ScoreItem(viewMap.get('red-score'), 0);
				this.gameStateContBlueScoreItem = new ScoreItem(viewMap.get('blue-score'), 0);
				ViewUtil.replaceWith(viewMap.get('timer'), this.gameStateContGameTimerCont.f);
				ViewUtil.replaceWith(viewMap.get('canvas'), this.gameStateContGameCanvas.gameCanvasCanvas);
			}

			/** @param {RoomState} roomState */
			A(roomState) {
				var lowLatencyLSI = ConnectionConstants.localStorageUtilInst.lsLowLatencyCanvas.v();
				if (this.gameStateContGameCanvas.gameCanvasLowLatency != lowLatencyLSI) {
					let canvas = this.gameStateContGameCanvas.gameCanvasCanvas;
					this.gameStateContGameCanvas = new GameCanvas(lowLatencyLSI);
					ViewUtil.replaceWith(canvas, this.gameStateContGameCanvas.gameCanvasCanvas);
				}
				const game = roomState.M;
				if (null == game) {
					this.f.hidden = true;
				}
				else {
					this.f.hidden = false;
					this.gameStateContGameTimerCont.Yr(60 * roomState.Ga);
					this.gameStateContGameTimerCont.Xr(game.Mc | 0);
					this.gameStateContBlueScoreItem.set(game.Ob);
					this.gameStateContRedScoreItem.set(game.Tb);
					this.gameStateContGameCanvas.Qc(roomState, this.field_clientPlayerId);
				}
			}
		}

		class Connection2 {
			constructor(a, iceServers, channels) {
				this.rd = this.ze = null;
				this.xe = [];
				this.tk = 0;
				this.Dl = false;
				this.gg = [];
				this.bd = [];
				this.Ta = new RTCPeerConnection({
					iceServers: iceServers
				}, Connection2.mediaConstraints);
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
				for (iceServers = 0; iceServers < channels.length;)
					this.Co(channels[iceServers++]);
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
					await TimeoutUtil.js(this.Vh, 500);
				}
				catch (d) {
				}
				return a;
			}

			async Do() {
				let a = await this.Ta.createOffer();
				await this.Ta.setLocalDescription(a);
				try {
					await TimeoutUtil.js(this.Vh, 1E3);
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

		class LocalStorageInitializer {
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

		class StreamReader {
			constructor(a, b) {
				null == b && (b = false);
				this.s = a;
				this.Ua = b;
				this.a = 0;
			}

			tb(a) {
				null == a && (a = this.s.byteLength - this.a);
				if (this.a + a > this.s.byteLength)
					throw GlobalError.C('Read too much');
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
					c = StreamReader.Ho(this.s, b),
						b += c.length,
						d += String.fromCodePoint(c.char);
				if (b != a)
					throw GlobalError.C('Actual string length differs from the specified: ' + (b - a) + ' bytes');
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
					throw GlobalError.C('Cannot decode UTF8 character at offset ' + b + ': charCode (' + c + ') is invalid');
				return {
					char: c,
					length: b - h
				};
			}
		}

		class PlayerListContainer {
			constructor(a) {
				this.Gd = new Map;
				this.f = ViewUtil.Ia(PlayerListContainer.htmlContents);
				this.f.className += ' ' + a.Go;
				let b = ViewUtil.Ba(this.f);
				this.eb = b.get('list');
				this.Zh = b.get('join-btn');
				this.Di = b.get('reset-btn');
				a == Team.spec && this.Di.remove();
				this.Zh.textContent = '' + a.D;
				this.f.ondragover = this.f.wt = function (d) {
					-1 != d.dataTransfer.types.indexOf('player') && d.preventDefault();
				}
				;
				let c = this;
				this.f.ondrop = function (d) {
					d.preventDefault();
					d = d.dataTransfer.getData('player');
					null != d && (d = StringOpsInt.parseInt(d),
					null != d && FunctionRunner3.i(c.xg, d, a));
				}
				;
				this.Zh.onclick = function () {
					FunctionRunner2.i(c.lq, a);
				}
				;
				this.Di.onclick = function () {
					FunctionRunner2.i(c.me, a);
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
					null == f && (f = new PlayerListItem(e),
						f.tf = function (h) {
							FunctionRunner2.i(g.tf, h);
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

		class AudioUtil {
			constructor(a) {
				function b(d) {
					return new Promise(function (e) {
							let f = a.file(d).asArrayBuffer();
							self.c.decodeAudioData(f, e, function () {
								e(null);
							});
						}
					);
				}

				this.c = new AudioContext;
				this.ng = this.c.createGain();
				this.yi();
				this.ng.connect(this.c.destination);
				let self = this;
				this.Po = Promise.all([b('sounds/chat.wav').then(function (d) {
					return self.fk = d;
				}), b('sounds/highlight.wav').then(function (d) {
					return self.Rk = d;
				}), b('sounds/kick.wav').then(function (d) {
					return self.Bp = d;
				}), b('sounds/goal.wav').then(function (d) {
					return self.gp = d;
				}), b('sounds/join.wav').then(function (d) {
					return self.zp = d;
				}), b('sounds/leave.wav').then(function (d) {
					return self.Fp = d;
				}), b('sounds/crowd.ogg').then(function (d) {
					self.Fo = d;
					self.pk = new AudioContextUtil(self.Fo, self.c);
					self.pk.connect(self.ng);
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
				let a = ConnectionConstants.localStorageUtilInst.lsSoundVolume.v();
				ConnectionConstants.localStorageUtilInst.lsSoundMain.v() || (a = 0);
				this.ng.gain.value = a;
			}
		}

		class RegexUtil {
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
				throw GlobalError.C('EReg::matched');
			}

			Ys() {
				if (null == this.r.pc)
					throw GlobalError.C('No string matched');
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

		class StatsContainer {
			constructor() {
				this.Jl = new PingGraph;
				this.f = ViewUtil.Ia(StatsContainer.htmlContents);
				let a = ViewUtil.Ba(this.f);
				this.Cg = a.get('ping');
				this.Uo = a.get('fps');
				ViewUtil.replaceWith(a.get('graph'), this.Jl.f);
			}

			Ur(a, b) {
				this.Cg.textContent = 'Ping: ' + a + ' - ' + b;
			}

			Dm(a) {
				this.Uo.textContent = 'Fps: ' + a;
			}
		}

		class StringOpsInt {
			static Fe(a) {
				return CastUtil.Me(a, '');
			}

			static parseInt(a) {
				a = parseInt(a);
				return isNaN(a) ? null : a;
			}
		}

		class AuthUtil {
			constructor() {
			}

			os() {
				return 'idkey.' + this.jj + '.' + this.kj + '.' + this.rk;
			}

			bs(a) {
				try {
					let b = StreamWriter.ka(1024);
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
					return window.crypto.subtle.sign(AuthUtil.Im, this.Wl, f).then(function (g) {
						b.Ug(g);
						return b.Wb();
					});
				}
				catch (b) {
					return Promise.reject(GlobalError.Mb(b).Gb());
				}
			}

			static generateAuth() {
				try {
					return window.crypto.subtle.generateKey(AuthUtil.EcKeyImportParams, true, ['sign', 'verify']).then(function (a) {
						let b = a.privateKey;
						return window.crypto.subtle.exportKey('jwk', b).then(function (c) {
							let d = c.y
								,
								e = c.d
								,
								f = new AuthUtil;
							f.jj = c.x;
							f.kj = d;
							f.rk = e;
							f.Wl = b;
							return f;
						});
					});
				}
				catch (a) {
					return Promise.reject(GlobalError.Mb(a).Gb());
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
				return AuthUtil.Es(b, c, d).then(function (e) {
					let crypt = new AuthUtil;
					crypt.jj = b;
					crypt.kj = c;
					crypt.rk = d;
					crypt.Wl = e;
					return crypt;
				});
			}

			static xs(a, b) {
				try {
					let c = new StreamReader(new DataView(a.buffer, a.byteOffset, a.byteLength), false);
					c.F();
					let d = c.tb(c.Sb())
						,
						e = c.tb()
						,
						f = new StreamReader(new DataView(d.buffer, d.byteOffset, d.byteLength), false)
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
					return AuthUtil.Ds(g, h).then(function (n) {
						return window.crypto.subtle.verify(AuthUtil.Im, n, e, d);
					}).then(function (n) {
						if (!n)
							throw GlobalError.C(null);
						return g;
					});
				}
				catch (c) {
					return Promise.reject(GlobalError.Mb(c).Gb());
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
					}, AuthUtil.EcKeyImportParams, true, ['sign']);
				}
				catch (d) {
					return Promise.reject(GlobalError.Mb(d).Gb());
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
					}, AuthUtil.EcKeyImportParams, true, ['verify']);
				}
				catch (c) {
					return Promise.reject(GlobalError.Mb(c).Gb());
				}
			}
		}

		class HaxballClientManager {
			static initializeClient() {
				ContainerUtil.rj(function () {
					HaxballClientManager.showChooseNickView(HaxballClientManager.joinRoomFromCurrentUrl);
				});
				HaxballClientManager.initAuth();
			}

			static initAuth() {
				let auth = ConnectionConstants.localStorageUtilInst.lsPlayerAuthKey.v();
				if (null == auth) {
					AuthUtil.generateAuth().then(function (b) {
						HaxballClientManager.Ue = b;
						ConnectionConstants.localStorageUtilInst.lsPlayerAuthKey.setLSItem(b.os());
					}).catch(function () {
					});
				}
				else {
					AuthUtil.Vo(auth).then(function (b) {
						HaxballClientManager.Ue = b;
						return HaxballClientManager.Ue;
					}).catch(function () {
					});
				}
			}

			static isCrappyRouter() {
				let ls = LocalStorageInitializer.ln();
				return null != ls ? null != ls.getItem('crappy_router') : false;
			}

			static showChooseNickView(okClickFun) {
				let chooseNickContainer = new ChooseNickContainer(ConnectionConstants.localStorageUtilInst.lsPlayerName.v());
				chooseNickContainer.yl = function (c) {
					ConnectionConstants.localStorageUtilInst.lsPlayerName.setLSItem(c);
					ConnectionConstants.audioUtil.om();
					okClickFun();
				}
				;
				ContainerUtil.Na(chooseNickContainer.f);
				chooseNickContainer.Eb.focus();
			}

			static showCaptchaDialog(sitekey, bFun) {
				let captchaDialog = new CaptchaDialogContainer(sitekey);
				captchaDialog.Wa = bFun;
				ContainerUtil.Na(captchaDialog.f);
			}

			static handleConnectToRoom(a, b) {
				function showDisconnected() {
					let disconnectedContainer = new DisconnectedContainer('Failed', null);
					disconnectedContainer.Wa = function () {
						HaxballClientManager.showRoomListView();
					}
					;
					ContainerUtil.Na(disconnectedContainer.f);
				}

				function showRecaptcha(f) {
					f = f.sitekey;
					if (null == f)
						throw GlobalError.C(null);
					HaxballClientManager.showCaptchaDialog(f, function (g) {
						e(a, g);
					});
				}

				ContainerUtil.Na((new SimpleDialogContainer('Connecting', 'Connecting...', [])).f);
				let e = null;
				e = function (f, g) {
					WebserverApiOps.Vl(ConnectionConstants.rsUrl + 'api/client', 'room=' + f + '&rcr=' + g, WebserverApiOps.contentType).then(function (h) {
						switch (h.action) {
							case 'connect':
								h = h.token;
								if (null == h)
									throw GlobalError.C(null);
								b(h);
								break;
							case 'recaptcha':
								showRecaptcha(h);
								break;
							default:
								throw GlobalError.C(null);
						}
					}).catch(function () {
						showDisconnected();
					});
				}
				;
				e(a, '');
			}

			static joinRoomFromCurrentUrl() {
				let roomLinkMap = RoomLinkUtil.mapCurrentUrl();
				let roomId = roomLinkMap.get('c');
				let isPassword = roomLinkMap.get('p');
				roomLinkMap.get('v');
				null != roomId ? null != isPassword ? HaxballClientManager.showPasswordView(roomId) : HaxballClientManager.joinRoom(roomId) : HaxballClientManager.showRoomListView();
			}

			static showRoomListView() {
				let roomListContainer = new RoomListContainer(ConnectionConstants.localStorageUtilInst.getPlayerGeoFromLS());
				ContainerUtil.Na(roomListContainer.La);
				roomListContainer.handleRoomJoin = function (roomInfoWithGeo) {
					if (9 != roomInfoWithGeo.roomInfoInst.Rd) {
						let title;
						let msg;
						if (9 > roomInfoWithGeo.roomInfoInst.Rd) {
							title = 'Old version room';
							msg = 'The room is running an older version, an update must have happened recently.';
						}
						else {
							title = 'New version';
							msg = 'The room is running a new version of haxball, refresh the site to update.';
						}
						let simpleDialogContainer = new SimpleDialogContainer(title, msg, ['Ok']);
						ContainerUtil.Na(simpleDialogContainer.f);
						simpleDialogContainer.Wa = function () {
							ContainerUtil.Na(roomListContainer.La);
							simpleDialogContainer.Wa = null;
						};
					}
					else
						roomInfoWithGeo.roomInfoInst.Kb ? HaxballClientManager.showPasswordView(roomInfoWithGeo.ba) : HaxballClientManager.joinRoom(roomInfoWithGeo.ba);
				}
				;
				roomListContainer.handleCreateRoomClick = function () {
					HaxballClientManager.showCreateRoomView();
				}
				;
				roomListContainer.handleChangeNickClick = function () {
					HaxballClientManager.showChooseNickView(HaxballClientManager.showRoomListView);
				}
				;
				roomListContainer.handleSettingsClick = function () {
					HaxballClientManager.showSettingsView();
				}
				;
				roomListContainer.handleReplayFileLoad = function (fileBuffer) {
					HaxballClientManager.showReplayView(fileBuffer);
				};
			}

			static showSettingsView() {
				let settingsDialogContainer = new SettingsDialogContainer(true)
					,
					divViewWrapper = window.document.createElement('div');
				divViewWrapper.className = 'view-wrapper';
				divViewWrapper.appendChild(settingsDialogContainer.f);
				ContainerUtil.Na(divViewWrapper);
				settingsDialogContainer.rb = function () {
					HaxballClientManager.showRoomListView();
				}
				;
				settingsDialogContainer.fq = function () {
					let changeLocationDialogContainer = new ChangeLocationDialogContainer
						,
						divViewWrapper = window.document.createElement('div');
					divViewWrapper.className = 'view-wrapper';
					divViewWrapper.appendChild(changeLocationDialogContainer.f);
					ContainerUtil.Na(divViewWrapper);
					changeLocationDialogContainer.rb = function () {
						HaxballClientManager.showSettingsView();
					};
				};
			}

			static gi(roomId, isPassword) {
				// Exposing global fields begin
				let roomLink = '' + globalScope.location.origin + '/play?c=' + roomId + (isPassword ? '&p=1' : '');
				const onRoomLinkFun = window.parent.g.onRoomLink;
				if (onRoomLinkFun != null)
					onRoomLinkFun(roomLink);
				return roomLink;
				// Exposing global fields end
			}

			static showCreateRoomView() {
				let clientPlayerName = ConnectionConstants.localStorageUtilInst.lsPlayerName.v();
				let createRoomContainer = new CreateRoomContainer('' + clientPlayerName + '\'s room');
				ContainerUtil.Na(createRoomContainer.f);
				createRoomContainer.ji = function () {
					HaxballClientManager.showRoomListView();
				}
				;
				createRoomContainer.handleRoomCreate = function (formObj) {
					function d() {
						if (!formObj.unlisted) {
							var roomInfo = new RoomInfo;
							roomInfo.Rd = 9;
							roomInfo.D = newRoomState.lc;
							roomInfo.K = newRoomState.K.length;
							roomInfo.jf = hostRoom.qg + 1;
							roomInfo.vb = geoLocation.vb;
							roomInfo.Kb = null != hostRoom.Kb;
							roomInfo.Ic = geoLocation.Ic;
							roomInfo.Lc = geoLocation.Lc;
							var writer = StreamWriter.ka(16);
							roomInfo.ga(writer);
							hostRoom.Oi(writer.Rg());
						}
					}

					ContainerUtil.Na((new SimpleDialogContainer('Creating room', 'Connecting...', [])).f);
					let e = null
						,
						geoLocation = ConnectionConstants.localStorageUtilInst.getPlayerGeoFromLS()
						,
						newRoomState = new RoomState;
					newRoomState.lc = formObj.name;
					let clientFullPlayer = new FullPlayer;
					clientFullPlayer.D = clientPlayerName;
					clientFullPlayer.fb = true;
					clientFullPlayer.country = geoLocation.vb;
					clientFullPlayer.Zb = ConnectionConstants.localStorageUtilInst.lsAvatar.v();
					newRoomState.K.push(clientFullPlayer);
					let hostRoom = new HostRoom({
						iceServers: ConnectionConstants.iceServersArray,
						iceUrl: ConnectionConstants.rsUrl + 'api/host',
						state: newRoomState,
						version: 9
					});
					hostRoom.qg = formObj.maxPlayers - 1;
					hostRoom.Kb = formObj.password;
					d();
					let hostRoomManager = new PlayableRoomManager(hostRoom)
						,
						n = false;
					hostRoom.sf = function (t, z) {
						HaxballClientManager.showCaptchaDialog(t, function (J) {
							z(J);
							ContainerUtil.Na(hostRoomManager.field_gameContainer.f);
							n = true;
						});
					}
					;
					let r = window.setInterval(function () {
						hostRoom.ua(UpdatePlayerPingsAction.pa(hostRoom));
					}, 3E3);
					hostRoom.vl = function (t) {
						null != newRoomState.getFullPlayerById(t) && hostRoom.ua(KickAction.pa(t, 'Bad actor', false));
					}
					;
					hostRoom.iq = function (t, z) {
						let J = z.kc();
						if (25 < J.length)
							throw GlobalError.C('name too long');
						let N = z.kc();
						if (3 < N.length)
							throw GlobalError.C('country too long');
						z = z.Bb();
						if (null != z && 2 < z.length)
							throw GlobalError.C('avatar too long');
						hostRoom.ua(PlayerJoinAction.pa(t, J, N, z));
						d();
					}
					;
					hostRoom.jq = function (t) {
						null != newRoomState.getFullPlayerById(t) && hostRoom.ua(KickAction.pa(t, null, false));
					}
					;
					hostRoom.vg = function (t) {
						e = t;
						hostRoomManager.prmRoomLink = HaxballClientManager.gi(t, null != hostRoom.Kb);
						n || (n = true,
							ContainerUtil.Na(hostRoomManager.field_gameContainer.f));
					}
					;
					hostRoomManager.prmInsideRoomMan.pq = function (t, z, J, N) {
						hostRoom.Ro(t, z, J, N);
					}
					;
					hostRoomManager.prmInsideRoomMan.qq = function () {
						d();
					}
					;
					hostRoomManager.field_gameContainer.le = function () {
						hostRoom.la();
						hostRoomManager.la();
						HaxballClientManager.showRoomListView();
						window.clearInterval(r);
					}
					;
					hostRoomManager.prmChatHandler.Ng = function (t) {
						hostRoom.Kb = t;
						d();
						null != e && (hostRoomManager.prmRoomLink = HaxballClientManager.gi(e, null != hostRoom.Kb));
					}
					;
					hostRoomManager.prmChatHandler.Em = function (t) {
						hostRoom.Ni(t);
					}
					;
					hostRoomManager.prmChatHandler.ce = function_M(hostRoom, hostRoom.ce);
				};
			}

			static showPasswordView(roomId) {
				let roomPasswordContainer = new RoomPasswordContainer;
				ContainerUtil.Na(roomPasswordContainer.f);
				roomPasswordContainer.Wa = function (pass) {
					null == pass ? HaxballClientManager.showRoomListView() : HaxballClientManager.joinRoom(roomId, pass);
				};
			}

			static showReplayView(replayDataArray) {
				try {
					let replayContainer = new ReplayManager(new ReplayRoom(new Uint8Array(replayDataArray), new RoomState, 3));
					replayContainer.replayManRCCont.le = function () {
						replayContainer.la();
						HaxballClientManager.showRoomListView();
					}
					;
					ContainerUtil.Na(replayContainer.field_gameContainer.f);
				}
				catch (b) {
					let c = GlobalError.Mb(b).Gb();
					if (c instanceof ErrorIncompatible) {
						let incompatibleReplayDialog = new SimpleDialogContainer('Incompatible replay version', 'The replay file is of a different version', ['Open player', 'Cancel']);
						ContainerUtil.Na(incompatibleReplayDialog.f);
						incompatibleReplayDialog.Wa = function (d) {
							if (0 == d) {
								d = window.top.location;
								window.top.open(d.protocol + '//' + d.hostname + (null != d.port ? ':' + d.port : '') + '/replay?v=' + c.Rd, '_self');
							}
							else {
								HaxballClientManager.showRoomListView();
							}
						}
						;
					}
					else {
						let replayErrorDialog = new SimpleDialogContainer('Replay error', 'Couldn\'t load the file.', ['Ok']);
						ContainerUtil.Na(replayErrorDialog.f);
						replayErrorDialog.Wa = function () {
							replayErrorDialog.Wa = null;
							HaxballClientManager.showRoomListView();
						};
					}
				}
			}

			static joinRoom(roomId, pass, token) {
				try {
					let isCrappyRouter = HaxballClientManager.isCrappyRouter();
					let newRoomState = new RoomState;
					let writer = StreamWriter.ka();
					writer.oc(ConnectionConstants.localStorageUtilInst.lsPlayerName.v());
					writer.oc(ConnectionConstants.localStorageUtilInst.getPlayerGeoFromLS().vb);
					writer.Fb(ConnectionConstants.localStorageUtilInst.lsAvatar.v());
					let joinedRoom = new JoinedRoom(roomId, {
						iceServers: ConnectionConstants.iceServersArray,
						iceUrl: ConnectionConstants.p2pWss,
						state: newRoomState,
						version: 9,
						st: writer.Rg(),
						password: pass,
						iceCrappyRouter: isCrappyRouter,
						iceToken: token,
						Ms: HaxballClientManager.Ue
					});
					let connectingContainer = new ConnectingContainer;
					connectingContainer.da('Connecting to master...');
					connectingContainer.cont_cancelBtn.onclick = function () {
						joinedRoom.Jd = null;
						joinedRoom.rf = null;
						joinedRoom.la();
						HaxballClientManager.showRoomListView();
					}
					;
					ContainerUtil.Na(connectingContainer.f);
					let k = function (r, t) {
						let disconnectedContainer = new DisconnectedContainer(r, t);
						disconnectedContainer.Wa = function () {
							HaxballClientManager.showRoomListView();
						}
						;
						ContainerUtil.Na(disconnectedContainer.f);
					};
					let l = function () {
						let connectionFailedDialog = new SimpleDialogContainer('Connection Failed', '', ['Ok']);
						connectionFailedDialog.de.innerHTML = '<p>Failed to connect to room host.</p><p>If this problem persists please see the <a href=\'https://github.com/haxball/haxball-issues/wiki/Connection-Issues\' target=\'_blank\'>troubleshooting guide</a>.</p>';
						connectionFailedDialog.Wa = function () {
							HaxballClientManager.showRoomListView();
						}
						;
						ContainerUtil.Na(connectionFailedDialog.f);
					};
					let n = function () {
						let joinedRoomManager = new PlayableRoomManager(joinedRoom);
						joinedRoom.zl = function (t) {
							joinedRoomManager.field_gameContainer.gameContStatsCont.Ur(joinedRoom.Dg.hh() | 0, joinedRoom.Dg.max() | 0);
							joinedRoomManager.field_gameContainer.gameContStatsCont.Jl.Pn(t);
						}
						;
						joinedRoomManager.prmRoomLink = HaxballClientManager.gi(roomId, false);
						ContainerUtil.Na(joinedRoomManager.field_gameContainer.f);
						joinedRoomManager.field_gameContainer.le = function () {
							joinedRoom.Jd = null;
							joinedRoom.la();
							joinedRoomManager.la();
							HaxballClientManager.showRoomListView();
						}
						;
						joinedRoom.Jd = function () {
							joinedRoom.Jd = null;
							joinedRoomManager.la();
							let t = null == joinedRoomManager.prmReplay ? null : joinedRoomManager.prmReplay.stop();
							k(joinedRoom.xk, t);
						};
					};
					joinedRoom.rf = function (r) {
						joinedRoom.rf = null;
						joinedRoom.Jd = null;
						switch (r.pb) {
							case 1:
								l();
								break;
							case 2:
								switch (r.reason) {
									case 4004:
										HaxballClientManager.handleConnectToRoom(roomId, function (token) {
											HaxballClientManager.joinRoom(roomId, pass, token);
										});
										break;
									case 4101:
										null == pass ? HaxballClientManager.showPasswordView(roomId) : k(JoinedRoom.Bh(r), null);
										break;
									default:
										k(JoinedRoom.Bh(r), null);
								}
								break;
							default:
								k(JoinedRoom.Bh(r), null);
						}
					}
					;
					joinedRoom.Jd = function (r) {
						switch (r) {
							case 1:
								connectingContainer.da('Connecting to peer...');
								break;
							case 2:
								connectingContainer.da('Awaiting state...');
								break;
							case 3:
								n();
						}
					}
					;
					joinedRoom.uq = function () {
						connectingContainer.da('Trying reverse connection...');
					};
				}
				catch (d) {
					token = GlobalError.Mb(d).Gb();
					globalScope.console.log(token);
					token = new SimpleDialogContainer('Unexpected Error', '', []);
					token.de.innerHTML = 'An error ocurred while attempting to join the room.<br><br>This might be caused by a browser extension, try disabling all extensions and refreshing the site.<br><br>The error has been printed to the inspector console.';
					ContainerUtil.Na(token.f);
				}
			}
		}

		class PlayerDialogContainer {
			/**
			 * @param {FullPlayer} fullPlayer
			 * @param {boolean} isAdmin
			 */
			constructor(fullPlayer, isAdmin) {
				this.f = ViewUtil.Ia(PlayerDialogContainer.htmlContents);
				let c = ViewUtil.Ba(this.f);
				this.lf = c.get('name');
				this.Uf = c.get('admin');
				this.bf = c.get('kick');
				this.wd = c.get('close');
				let d = this;
				this.Uf.onclick = function () {
					FunctionRunner3.i(d.cq, d.field_clientPlayerId, !d.Ml);
				}
				;
				this.bf.onclick = function () {
					FunctionRunner2.i(d.li, d.field_clientPlayerId);
				}
				;
				this.wd.onclick = function () {
					FunctionRunner1.i(d.rb);
				}
				;
				this.field_clientPlayerId = fullPlayer.Y;
				this.Tj(fullPlayer.D);
				this.Sj(fullPlayer.fb);
				this.Uf.disabled = !isAdmin || 0 == this.field_clientPlayerId;
				this.bf.disabled = !isAdmin || 0 == this.field_clientPlayerId;
			}

			/**
			 * @param {RoomState} roomState
			 * @param {boolean} isAdmin
			 */
			A(roomState, isAdmin) {
				const fullPlayer = roomState.getFullPlayerById(this.field_clientPlayerId);
				null == fullPlayer ? FunctionRunner1.i(this.rb) : (this.us(fullPlayer),
					this.Uf.disabled = !isAdmin || 0 == this.field_clientPlayerId,
					this.bf.disabled = !isAdmin || 0 == this.field_clientPlayerId);
			}

			/** @param {FullPlayer} fullPlayer */
			us(fullPlayer) {
				this.ne != fullPlayer.D && this.Tj(fullPlayer.D);
				this.Ml != fullPlayer.fb && this.Sj(fullPlayer.fb);
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

		class ImportantActions {
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
				ImportantActions.at(a.list, b.list, this.list);
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

		class ViewUtil {
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

		class FunctionRunner4 {
			static i(a, b, c, d) {
				null != a && a(b, c, d);
			}
		}

		class GameNoticeContainer {
			constructor(a) {
				this.ol = a.get('notice');
				this.zo = a.get('notice-contents');
				this.wd = a.get('notice-close');
				this.em();
			}

			em() {
				let a = this;
				WebserverApiOps.Lk(ConnectionConstants.rsUrl + 'api/notice').then(function (b) {
					let c = b.content;
					null != c && '' != c && GameNoticeContainer.no != c && (a.zo.innerHTML = c,
							a.ol.hidden = false,
							a.wd.onclick = function () {
								GameNoticeContainer.no = c;
								return a.ol.hidden = true;
							}
					);
				});
			}
		}

		class RoomLinkContainer {
			constructor() {
				this.zk = null;
				this.f = ViewUtil.Ia(RoomLinkContainer.htmlContents);
				var a = ViewUtil.Ba(this.f);
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
					FunctionRunner1.i(c.rb);
				};
			}

			Sr(a) {
				this.zk != a && (this.zk = a,
					this.lg.value = a);
			}
		}

		class GrecaptchaLoader {
			static Hp() {
				if (null != GrecaptchaLoader.ti)
					return GrecaptchaLoader.ti;
				GrecaptchaLoader.ti = new Promise(function (a, b) {
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
				return GrecaptchaLoader.ti;
			}
		}

		class DisconnectedContainer {
			constructor(a, b) {
				this.f = ViewUtil.Ia(DisconnectedContainer.htmlContents);
				let c = ViewUtil.Ba(this.f);
				this.aq = c.get('ok');
				let d = this;
				this.aq.onclick = function () {
					FunctionRunner1.i(d.Wa);
				}
				;
				this.jm = c.get('replay');
				let e = null != b;
				this.jm.hidden = !e;
				e && (this.jm.onclick = function () {
						PlayableRoomManager.tm(b);
					}
				);
				c.get('reason').textContent = a;
			}
		}

		class BigAnimatedText {
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
					let h = BigAnimatedText.En.eval(f)
						,
						k = 35 * -(this.hf.length - 1) + 70 * c;
					f = 180 * BigAnimatedText.Fn.eval(f);
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

			getRgbaFromColorInt(colorInt) {
				return 'rgba(' + [(colorInt & 16711680) >>> 16, (colorInt & 65280) >>> 8, colorInt & 255].join() + ',255)';
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
				d.fillStyle = this.getRgbaFromColorInt(b);
				d.fillText(a, 0, 45);
				return c;
			}
		}

		class KeyFramesUtil {
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

		class ChooseNickContainer {
			constructor(a) {
				function b() {
					d.Hc() && null != d.yl && d.yl(d.Eb.value);
				}

				this.f = ViewUtil.Ia(ChooseNickContainer.htmlContents);
				let c = ViewUtil.Ba(this.f);
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

		class StringOpsSubstr {
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

		class PickStadiumDialogContainer {
			constructor() {
				this.lb = null;
				this.f = ViewUtil.Ia(PickStadiumDialogContainer.htmlContents);
				let a = ViewUtil.Ba(this.f)
					,
					b = this;
				a.get('cancel').onclick = function () {
					FunctionRunner1.i(b.ji);
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
						FunctionRunner2.i(b.zg, e);
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
						ReplayDownloader.Er(e.Ae(), e.D + '.hbs');
					});
				}
				;
				this.si(c);
				this.Yl = ScrollUtil.ei(c);
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
								let h = new Stadium;
								h.cl(g);
								FunctionRunner2.i(b.zg, h);
							}
							catch (h) {
								g = GlobalError.Mb(h).Gb(),
									g instanceof SyntaxError ? FunctionRunner2.i(b.mi, 'SyntaxError in line: ' + StringOpsInt.Fe(g.lineNumber)) : g instanceof DialogError ? FunctionRunner2.i(b.mi, g.dialogErrorMessage) : FunctionRunner2.i(b.mi, 'Error loading stadium file.');
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
				let b = Stadium.Nh()
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
				IdbStadiumUtil.getAll().then(function (e) {
					let f = 0;
					for (; f < e.length;) {
						let g = e[f];
						++f;
						let h = g.id;
						a.appendChild(d.jl(g.name, function () {
							return IdbStadiumUtil.get(h);
						}, function () {
							return IdbStadiumUtil.delete(h);
						}));
					}
					d.Yl.update();
				});
			}
		}

		class AudioContextUtil {
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
				a = ConnectionConstants.localStorageUtilInst.lsSoundCrowd.v() ? this.De : 0;
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
							z = Team.red.Gh
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
							if (N.fa == Team.red) {
								if (null == f || f.a.x * z < N.J.a.x * z)
									f = N.J;
								if (null == g || g.a.x * z > N.J.a.x * z)
									g = N.J;
								if (null == h || d < k)
									h = N.J,
										k = d;
							}
							else if (N.fa == Team.blue) {
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

		class InsideRoomManager {
			constructor(gameContainer, playerName) {
				this.playerMentionString = null;
				this.field_gameContainer = gameContainer;
				null != playerName && (this.playerMentionString = '@' + class_ba.replace(playerName, ' ', '_'));
			}

			/** @param {RoomState} roomState */
			cj(roomState) {
				let b = this.field_gameContainer.gameContChatboxCont.Ec
					,
					c = []
					,
					d = 0;
				for (roomState = roomState.K; d < roomState.length;) {
					let e = roomState[d];
					++d;
					c.push({
						D: e.D,
						ba: e.Y
					});
				}
				b.Wj = c;
			}

			/** @param {RoomState} roomState */
			setRoomStateEvents(roomState) {
				function b(d) {
					return null == d ? '' : ' by ' + d.D;
				}

				this.cj(roomState);
				let self = this;
				// Invoking global fields begin
				roomState.Pl = function (d) {
					self.field_gameContainer.gameContChatboxCont.Ib('' + d.D + ' has joined');
					ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.zp);
					self.cj(roomState);

					if (window.parent.g.onPlayerJoin != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerJoin(player);
					}
				}
				;
				roomState.Ql = function (d, e, f, g) {
					FunctionRunner2.i(self.qq, d.Y);

					if (window.parent.g.onPlayerLeave != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerLeave(player);
					}

					let noticeText;
					if (null == e) {
						noticeText = '' + d.D + ' has left';
					}
					else {
						FunctionRunner5.i(self.pq, d.Y, e, null != g ? g.D : null, f);
						noticeText = '' + d.D + ' was ' + (f ? 'banned' : 'kicked') + b(g) + ('' != e ? ' (' + e + ')' : '');

						if (window.parent.g.onPlayerKicked != null) {
							const player = getFullPlayerObject(d);
							const byPlayer = getFullPlayerObject(g);
							window.parent.g.onPlayerKicked(player, e, f, byPlayer);
						}
					}
					self.field_gameContainer.gameContChatboxCont.Ib(noticeText);
					ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.Fp);
					self.cj(roomState);
				}
				;
				roomState.Nl = function (d, e) {
					let f = null != self.playerMentionString && -1 != e.indexOf(self.playerMentionString);
					self.field_gameContainer.gameContChatboxCont.da('' + d.D + ': ' + e, f ? 'highlight' : null);
					ConnectionConstants.localStorageUtilInst.lsSoundHighlight.v() && f ? ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.Rk) : ConnectionConstants.localStorageUtilInst.lsSoundChat.v() && ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.fk);

					if (window.parent.g.onPlayerChat != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerChat(player, e);
					}
				}
				;
				roomState.qm = function (d, e, f, g) {
					self.field_gameContainer.gameContChatboxCont.Qp(d, e, f);
					if (ConnectionConstants.localStorageUtilInst.lsSoundChat.v())
						switch (g) {
							case 1:
								ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.fk);
								break;
							case 2:
								ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.Rk);
						}

					if (window.parent.g.onAnnouncement != null) {
						window.parent.g.onAnnouncement(d, e, f, g);
					}
				}
				;
				roomState.ri = function (byFullPlayer) {
					ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.Bp);

					if (window.parent.g.onPlayerBallKick != null) {
						const byPlayer = getFullPlayerObject(byFullPlayer);
						window.parent.g.onPlayerBallKick(byPlayer);
					}
				}
				;
				roomState.Xi = function (d) {
					ConnectionConstants.audioUtil.ld(ConnectionConstants.audioUtil.gp);
					let e = self.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas.gameCanvasBigTextMan;
					e.Sa(d == Team.red ? e.gr : e.Zn);

					if (window.parent.g.onTeamGoal != null) {
						const teamId = d.ba;
						window.parent.g.onTeamGoal(teamId);
					}
				}
				;
				roomState.Yi = function (d) {
					let e = self.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas.gameCanvasBigTextMan;
					e.Sa(d == Team.red ? e.hr : e.$n);
					self.field_gameContainer.gameContChatboxCont.Ib('' + d.D + ' team won the match');

					if (window.parent.g.onTeamVictory != null) {
						const teamId = d.ba;
						window.parent.g.onTeamVictory(teamId);
					}
				}
				;
				roomState.Il = function (d, e, f) {
					e && !f && self.field_gameContainer.gameContChatboxCont.Ib('Game paused' + b(d));

					if (window.parent.g.onGamePause != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGamePause(byPlayer, e);
					}
				}
				;
				roomState.Zi = function () {
					let d = self.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas.gameCanvasBigTextMan;
					d.Sa(d.fs);

					if (window.parent.g.onTimeIsUp != null) {
						window.parent.g.onTimeIsUp();
					}
				}
				;
				roomState.Nq = () => {
					if (window.parent.g.onPositionsReset != null) {
						window.parent.g.onPositionsReset();
					}
				}
				;
				roomState.Ui = function (d) {
					self.field_gameContainer.ue(false);
					self.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas.gameCanvasBigTextMan.mo();
					self.field_gameContainer.gameContChatboxCont.Ib('Game started' + b(d));

					if (window.parent.g.onGameStart != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGameStart(byPlayer);
					}
				}
				;
				roomState.Hf = function (d) {
					null != d && self.field_gameContainer.gameContChatboxCont.Ib('Game stopped' + b(d));

					if (window.parent.g.onGameStop != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onGameStop(byPlayer);
					}
				}
				;
				roomState.Si = function (d, e) {
					if (!e.af()) {
						let f = class_ba.bh(e.ik(), 8);
						self.field_gameContainer.gameContChatboxCont.Ib('Stadium "' + e.D + '" (' + f + ') loaded' + b(d));

						if (window.parent.g.onStadiumChange != null) {
							const byPlayer = getFullPlayerObject(d);
							window.parent.g.onStadiumChange(byPlayer, e.D, f);
						}
					}
				}
				;
				roomState.Ol = function (d) {
					self.field_gameContainer.gameContChatboxCont.Ib('' + d.D + ' ' + (d.Ud ? 'has desynchronized' : 'is back in sync'));

					if (window.parent.g.onPlayerDesyncChange != null) {
						const player = getFullPlayerObject(d);
						window.parent.g.onPlayerDesyncChange(player, player.desynchronized);
					}
				}
				;
				roomState.Tl = function (d, e, f) {
					null != roomState.M && self.field_gameContainer.gameContChatboxCont.Ib('' + e.D + ' was moved to ' + f.D + b(d));

					if (window.parent.g.onPlayerTeamChange != null) {
						const player = getFullPlayerObject(e);
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onPlayerTeamChange(player, byPlayer, player.team);
					}
				}
				;
				roomState.pi = function (d, e) {
					let f = e.D;
					const noticeText = (e.fb ? '' + f + ' was given admin rights' : '' + f + '\'s admin rights were taken away') + b(d);
					self.field_gameContainer.gameContChatboxCont.Ib(noticeText);

					if (window.parent.g.onPlayerAdminChange != null) {
						const player = getFullPlayerObject(e);
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onPlayerAdminChange(player, byPlayer, player.admin);
					}
				}
				;
				roomState.onGameTickFun = function (gameInst) {
					if (window.parent.g.onGameTick != null) {
						window.parent.g.onGameTick(gameInst);
					}
				}
				;
				roomState.Sl = function (d, e) {
					self.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas.showHideChatIndicator(d, e);

					if (window.parent.g.onChatIndicatorStateChange != null) {
						const player = getFullPlayerObject(d);
						const chatIndicatorShown = e === 0;
						window.parent.g.onChatIndicatorStateChange(player, chatIndicatorShown);
					}
				}
				;
				roomState.Zk = function (d, e, f, g) {
					self.field_gameContainer.gameContChatboxCont.Ib('Kick Rate Limit set to (min: ' + e + ', rate: ' + f + ', burst: ' + g + ')' + b(d));

					if (window.parent.g.onKickRateLimitSet != null) {
						const byPlayer = getFullPlayerObject(d);
						window.parent.g.onKickRateLimitSet(e, f, g, byPlayer);
					}
				};
				// Invoking global fields end
			}

			/** @param {RoomState} roomState */
			resetRoomStateEvents(roomState) {
				roomState.Pl = null;
				roomState.Ql = null;
				roomState.Nl = null;
				roomState.qm = null;
				roomState.ri = null;
				roomState.Xi = null;
				roomState.Yi = null;
				roomState.Il = null;
				roomState.Zi = null;
				roomState.Nq = null;
				roomState.Ui = null;
				roomState.Hf = null;
				roomState.Si = null;
				roomState.Ol = null;
				roomState.Tl = null;
				roomState.pi = null;
				roomState.Sl = null;
				roomState.Zk = null;
			}
		}

		class FunctionRunner1 {
			static i(a) {
				null != a && a();
			}
		}

		class RoomPingUtil {
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
					this.cb.splice(c, 1)) : b = new PingItem;
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

		class SettingsDialogContainer {
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
							ConnectionConstants.localStorageUtilInst.lsPlayerKeys.setLSItem(Lb);
							wc.remove();
						}
						;
						wc.appendChild(S);
					}
					L = window.document.createElement('i');
					L.className = 'icon-plus';
					F.appendChild(L);
					L.onclick = function () {
						presskey.classList.toggle('show', true);
						presskey.focus();
						presskey.onkeydown = function (V) {
							presskey.classList.toggle('show', false);
							V.stopPropagation();
							V = V.code;
							null == Lb.v(V) && (Lb.Sa(V, y),
								ConnectionConstants.localStorageUtilInst.lsPlayerKeys.setLSItem(Lb),
								Fc());
						};
					}
					;
					return F;
				}

				function c(key, label, L) {
					key = lMap.get(key);
					if (null == L)
						key.hidden = true;
					else {
						key.innerHTML = label + ': <div class=\'flagico\'></div> <span></span>';
						label = key.querySelector('.flagico');
						key = key.querySelector('span');
						try {
							label.classList.add('f-' + L.vb);
						}
						catch (ea) {
						}
						key.textContent = L.vb.toUpperCase();
					}
				}

				function d() {
					let y = ConnectionConstants.localStorageUtilInst.lsChatFocusHeight.v();
					J.textContent = '' + y;
					N.value = '' + y;
				}

				function e() {
					let y = ConnectionConstants.localStorageUtilInst.lsChatOpacity.v();
					t.textContent = '' + y;
					z.value = '' + y;
				}

				function f(key, lsItem, L, ea) {
					let S = lMap.get(key);
					key = lsItem.v();
					S.selectedIndex = ea(key);
					S.onchange = function () {
						lsItem.setLSItem(L(S.selectedIndex));
					};
				}

				function g(key, lsItem, L) {
					function ea(V) {
						S.classList.toggle('icon-ok', V);
						S.classList.toggle('icon-cancel', !V);
					}

					key = lMap.get(key);
					key.classList.add('toggle');
					let S = window.document.createElement('i');
					S.classList.add('icon-ok');
					key.insertBefore(S, key.firstChild);
					key.onclick = function () {
						let V = !lsItem.v();
						lsItem.setLSItem(V);
						ea(V);
						null != L && L(V);
					}
					;
					ea(lsItem.v());
				}

				function h(y) {
					let F = {
						fn: lMap.get(y + 'btn'),
						jh: lMap.get(y + 'sec')
					};
					nArr.push(F);
					F.fn.onclick = function () {
						k(F);
					};
				}

				function k(y) {
					let F = 0
						,
						L = 0;
					for (; L < nArr.length;) {
						let ea = nArr[L];
						++L;
						let S = ea == y;
						S && (SettingsDialogContainer.vm = F);
						ea.jh.classList.toggle('selected', S);
						ea.fn.classList.toggle('selected', S);
						++F;
					}
				}

				null == a && (a = false);
				this.f = ViewUtil.Ia(SettingsDialogContainer.htmlContents);
				let lMap = ViewUtil.Ba(this.f);
				this.wd = lMap.get('close');
				let nArr = [];
				h('sound');
				h('video');
				h('misc');
				h('input');
				k(nArr[SettingsDialogContainer.vm]);
				g('tsound-main', ConnectionConstants.localStorageUtilInst.lsSoundMain, function () {
					ConnectionConstants.audioUtil.yi();
				});
				g('tsound-chat', ConnectionConstants.localStorageUtilInst.lsSoundChat);
				g('tsound-highlight', ConnectionConstants.localStorageUtilInst.lsSoundHighlight);
				g('tsound-crowd', ConnectionConstants.localStorageUtilInst.lsSoundCrowd);
				f('viewmode', ConnectionConstants.localStorageUtilInst.lsViewMode, function (y) {
					return y - 1;
				}, function (y) {
					return y + 1;
				});
				f('fps', ConnectionConstants.localStorageUtilInst.lsFpsLimit, function (y) {
					return y;
				}, function (y) {
					return y;
				});
				let r = [1, .75, .5, .25];
				f('resscale', ConnectionConstants.localStorageUtilInst.lsResolutionScale, function (y) {
					return r[y];
				}, function (y) {
					let F = 0
						,
						L = r.length - 1;
					for (; F < L && !(r[F] <= y);)
						++F;
					return F;
				});
				g('tvideo-lowlatency', ConnectionConstants.localStorageUtilInst.lsLowLatencyCanvas);
				g('tvideo-teamcol', ConnectionConstants.localStorageUtilInst.lsTeamColors);
				g('tvideo-showindicators', ConnectionConstants.localStorageUtilInst.lsShowIndicators);
				g('tvideo-showavatars', ConnectionConstants.localStorageUtilInst.lsShowAvatars);
				let t = lMap.get('chatopacity-value')
					,
					z = lMap.get('chatopacity-range');
				e();
				z.oninput = function () {
					ConnectionConstants.localStorageUtilInst.lsChatOpacity.setLSItem(parseFloat(z.value));
					e();
				}
				;
				let J = lMap.get('chatfocusheight-value')
					,
					N = lMap.get('chatfocusheight-range');
				d();
				N.oninput = function () {
					ConnectionConstants.localStorageUtilInst.lsChatFocusHeight.setLSItem(StringOpsInt.parseInt(N.value));
					d();
				}
				;
				f('chatbgmode', ConnectionConstants.localStorageUtilInst.lsChatBgMode, function (y) {
					return 0 == y ? 'full' : 'compact';
				}, function (y) {
					return 'full' == y ? 0 : 1;
				});
				let Gb = null
					,
					Kc = this;
				Gb = function () {
					let y = ConnectionConstants.localStorageUtilInst.lsGeoOverride.v();
					c('loc', 'Detected location', ConnectionConstants.localStorageUtilInst.lsGeo.v());
					c('loc-ovr', 'Location override', y);
					let F = lMap.get('loc-ovr-btn');
					F.disabled = !a;
					null == y ? (F.textContent = 'Override location',
							F.onclick = function () {
								FunctionRunner1.i(Kc.fq);
							}
					) : (F.textContent = 'Remove override',
							F.onclick = function () {
								ConnectionConstants.localStorageUtilInst.lsGeoOverride.setLSItem(null);
								Gb();
							}
					);
				}
				;
				Gb();
				let Lb = ConnectionConstants.localStorageUtilInst.lsPlayerKeys.v()
					,
					presskey = lMap.get('presskey')
					,
					Fc = null
					,
					eb = lMap.get('inputsec');
				Fc = function () {
					ViewUtil.Nf(eb);
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
					FunctionRunner1.i(Kc.rb);
				};
			}
		}

		class ConnectingManager {
			constructor(baseUrl, iceServers, roomId, channels, writer, token) {
				this.rh = this.Ch = false;
				this.sa = new Connection2(0, iceServers, channels);
				let self = this;
				this.sa.jd = function () {
					self.Ze(basnetFailReasonVar.Je);
				}
				;
				this.sa.Id = function () {
					null != self.Id && self.Id(new Connection1(self.sa));
					self.sa = null;
					self.kk();
				}
				;
				(async function () {
						try {
							let rtcSessionDesc = await self.sa.Do();
							self.$ = new WebSocket(baseUrl + 'client?id=' + roomId + (null == token ? '' : '&token=' + token));
							self.$.binaryType = 'arraybuffer';
							self.$.onclose = function (k) {
								self.Ch || self.Ze(basnetFailReasonVar.Ke(k.code));
							}
							;
							self.$.onerror = function () {
								self.Ch || self.Ze(basnetFailReasonVar.Error);
							}
							;
							self.$.onmessage = function_M(self, self.Sh);
							self.$.onopen = function () {
								null != self.Cl && self.Cl();
								self.sa.Wi();
								self.Ki(rtcSessionDesc, self.sa.gg, writer);
								self.sa.ug = function_M(self, self.Hi);
								self.sa.Vh.then(function () {
									self.Tc(0, null);
								});
							};
						}
						catch (h) {
							self.Ze(basnetFailReasonVar.Je);
						}
					}
				)();
			}

			eo() {
				this.Ze(basnetFailReasonVar.Ie);
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
				var b = new StreamReader(new DataView(a.data));
				a = b.F();
				0 < b.s.byteLength - b.a && (b = new StreamReader(new DataView(pako.inflateRaw(b.tb()).buffer), false));
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
					c.Ze(basnetFailReasonVar.Error);
				});
			}

			Qh(a) {
				this.sa.Ta.addIceCandidate(a);
			}

			Tc(a, b) {
				if (null != this.$) {
					var c = StreamWriter.ka(32, false);
					c.m(a);
					null != b && (a = pako.deflateRaw(b.Wb()),
						c.Lb(a));
					this.$.send(c.Qd());
				}
			}

			Ki(a, b, c) {
				let d = StreamWriter.ka(32, false);
				d.m(this.rh ? 1 : 0);
				d.oc(a.sdp);
				d.Vg(b);
				null != c && d.Lb(c.Wb());
				this.Tc(1, d);
			}

			Hi(a) {
				let b = StreamWriter.ka(32, false);
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

		class RoomItem {
			/** @param {RoomInfoWithGeo} roomInfoWithGeo */
			constructor(roomInfoWithGeo) {
				this.La = ViewUtil.Ia(RoomItem.Dj, 'tbody');
				var b = ViewUtil.Ba(this.La);
				let c = b.get('name')
					,
					d = b.get('players')
					,
					e = b.get('distance')
					,
					f = b.get('pass');
				b = b.get('flag');
				this.mt = roomInfoWithGeo;
				let g = roomInfoWithGeo.roomInfoInst;
				c.textContent = g.D;
				d.textContent = '' + g.K + '/' + g.jf;
				f.textContent = g.Kb ? 'Yes' : '-';
				e.textContent = '' + (roomInfoWithGeo.distanceKm | 0) + 'km';
				try {
					b.classList.add('f-' + g.vb.toLowerCase());
				}
				catch (h) {
				}
				9 > roomInfoWithGeo.roomInfoInst.Rd && this.La.classList.add('old');
			}
		}

		class TimestampUtil {
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

		class PlayerListItem {
			constructor(a) {
				this.D = a.D;
				this.Ab = a.Ab;
				this.ba = a.Y;
				this.f = ViewUtil.Ia(PlayerListItem.htmlContents);
				let b = ViewUtil.Ba(this.f);
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
					d.dataTransfer.setData('player', StringOpsInt.Fe(c.ba));
				}
				;
				this.f.oncontextmenu = function (d) {
					d.preventDefault();
					FunctionRunner2.i(c.tf, c.ba);
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

		class WebSocketManager {
			/**
			 * @param {string} rsApiHostUrl
			 * @param {{urls: string}[]} iceServers
			 * @param {{name: string, reliable: boolean, ordered: boolean}[]} channels
			 * @param {string} token
			 */
			constructor(rsApiHostUrl, iceServers, channels, token) {
				this.th = new Set;
				this.Vf = new Set;
				this.Jg = this.zf = this.zm = false;
				this.Sc = null;
				this.Cf = this.ba = '';
				this.Cr = 5E4;
				this.Br = 1E4;
				this.xd = new Map;
				this.cs = rsApiHostUrl;
				this.hg = iceServers;
				this.ho = channels;
				this.Cf = token;
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
						throw GlobalError.C(null);
					null != d.sf && d.sf(e, function (f) {
						d.Ti(f);
					});
				}

				function c(e) {
					let f = e.url;
					if (null == f)
						throw GlobalError.C(null);
					e = e.token;
					if (null == e)
						throw GlobalError.C(null);
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
				WebserverApiOps.Vl(this.cs, 'token=' + this.Cf + '&rcr=' + a, WebserverApiOps.contentType).then(function (e) {
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
				a = new StreamReader(new DataView(a.data), false);
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
					c = StringOpsSubstr.Hs(a.tb(a.F())),
					d,
					e,
					f;
				try {
					a = new StreamReader(new DataView(pako.inflateRaw(a.tb()).buffer), false);
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
						let n = WebSocketManager.Nk(d[h++]);
						if (null != n) {
							if (this.Vf.has(n)) {
								this.Ef(a, 4102);
								return;
							}
							g.push(n);
						}
					}
					if (null != this.mk && (h = new StreamReader(e.s),
						h.a = e.a,
						e = this.mk(b, h),
					1 == e.pb)) {
						this.Ef(a, e.reason);
						return;
					}
					var k = new Connection2(a, this.hg, this.ho);
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
						null != l.xl && l.xl(new Connection1(k));
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
					a = new StreamReader(new DataView(pako.inflateRaw(a.tb()).buffer), false),
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
					let c = WebSocketManager.Nk(b);
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
					b = StreamWriter.ka(32, false);
					b.m(a);
					b.ub(d);
					null != c && (a = pako.deflateRaw(c.Wb()),
						b.Lb(a));
					this.$.send(b.Qd());
				}
			}

			Ef(a, b) {
				let c = StreamWriter.ka(16, false);
				c.m(0);
				c.ub(a);
				c.Xb(b);
				this.$.send(c.Qd());
			}

			Ii() {
				let a = StreamWriter.ka(1, false);
				a.m(8);
				this.$.send(a.Qd());
			}

			Ji() {
				this.Jg = false;
				let a = StreamWriter.ka(256, false);
				a.m(7);
				null != this.Sc && a.Ug(this.Sc);
				this.$.send(a.Qd());
			}

			ym() {
				let a = StreamWriter.ka(2, false);
				a.m(9);
				a.m(this.zf ? 1 : 0);
				this.$.send(a.Qd());
				this.zm = this.zf;
			}

			Ki(a, b, c, d) {
				let e = StreamWriter.ka(32, false);
				e.oc(b.sdp);
				e.Vg(c);
				null != d && e.Lb(d.Wb());
				this.Tc(1, a, e);
			}

			Hi(a, b) {
				let c = StreamWriter.ka(32, false);
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
					let b = CandidateUtil.uf(a.candidate);
					if ('srflx' == b.qs)
						return b.wp;
				}
				catch (b) {
				}
				return null;
			}
		}

		class GameContainer {
			constructor(clientPlayerId) {
				this.gameContRestricted = null;
				this.gameContChatBgFull = null;
				this.gameContChatOpacity = null;
				this.gameContGameStateCont = new GameStateContainer;
				this.gameContShowing = false;
				this.gameContStatsCont = new StatsContainer;
				this.gameContChatboxCont = new ChatboxContainer;
				this.gameContRoomMenuCont = new RoomMenuContainer(clientPlayerId);
				this.gameContGameStateCont.field_clientPlayerId = clientPlayerId;
				this.f = ViewUtil.Ia(GameContainer.htmlContents);
				let viewMap = ViewUtil.Ba(this.f);
				this.gameContTopSection = viewMap.get('top-section');
				this.gameContPopups = viewMap.get('popups');
				this.gameContPopups.style.display = 'none';
				viewMap.get('gameplay').appendChild(this.gameContGameStateCont.f);
				ViewUtil.replaceWith(viewMap.get('chatbox'), this.gameContChatboxCont.f);
				ViewUtil.replaceWith(viewMap.get('stats'), this.gameContStatsCont.f);
				this.ii = viewMap.get('menu');
				let self = this;
				this.ii.onclick = function () {
					self.ue(!self.gameContShowing);
					self.ii.blur();
				}
				;
				new SoundSliderContainer(viewMap.get('sound'));
				viewMap.get('settings').onclick = function () {
					let settingsDialog = new SettingsDialogContainer;
					settingsDialog.rb = function () {
						self.ab(null);
					}
					;
					self.ab(settingsDialog.f);
				}
				;
				this.gameContRoomMenuCont.le = function () {
					let leaveRoomDialog = new LeaveRoomDialogContainer;
					leaveRoomDialog.rb = function (d) {
						self.ab(null);
						d && FunctionRunner1.i(self.le);
					}
					;
					self.ab(leaveRoomDialog.f);
				}
				;
				this.gameContRoomMenuCont.zq = function () {
					let pickStadiumDialog = new PickStadiumDialogContainer;
					pickStadiumDialog.ji = function () {
						self.ab(null);
					}
					;
					pickStadiumDialog.zg = function (d) {
						FunctionRunner2.i(self.zg, d);
						self.ab(null);
					}
					;
					pickStadiumDialog.mi = function (d) {
						let errorDialog = new SimpleDialogContainer('Error loading stadium', d, ['Ok']);
						errorDialog.Wa = function () {
							self.ab(null);
						}
						;
						self.ab(errorDialog.f);
					}
					;
					self.ab(pickStadiumDialog.f);
				};
			}

			Or(a) {
				this.gameContChatOpacity != a && (this.gameContChatOpacity = a,
					this.f.style.setProperty('--chat-opacity', '' + a));
			}

			Nr(a) {
				this.gameContChatBgFull != a && (this.gameContChatBgFull = a,
					this.f.classList.toggle('chat-bg-full', a));
			}

			Wr(a) {
				this.gameContRestricted != a && (this.gameContRestricted = a,
					this.gameContGameStateCont.f.classList.toggle('restricted', a));
			}

			/** @param {Room2} room */
			A(room) {
				null == room.U.M && this.ue(true);
				this.gameContShowing && this.gameContRoomMenuCont.A(room.U, room.U.getFullPlayerById(room.roomClientPlayerId));
				FunctionRunner1.i(this.Ul);
				this.ii.disabled = null == room.U.M;
				let viewModeLSI = ConnectionConstants.localStorageUtilInst.lsViewMode.v()
					,
					gameCanvas = this.gameContGameStateCont.gameStateContGameCanvas;
				gameCanvas.gameCanvasResolutionScale = ConnectionConstants.localStorageUtilInst.lsResolutionScale.v();
				this.Or(ConnectionConstants.localStorageUtilInst.lsChatOpacity.v());
				this.Nr('full' == ConnectionConstants.localStorageUtilInst.lsChatBgMode.v());
				this.Wr(0 == viewModeLSI);
				let chatboxHeight = this.gameContChatboxCont.f.getBoundingClientRect().height;
				if (0 == viewModeLSI) {
					gameCanvas.gameCanvasZoom = 1;
					gameCanvas.Md = 0;
					gameCanvas.gameCanvasBottomOffset = 0;
					this.gameContGameStateCont.gameStateContGameCanvas.gameCanvasChatboxHeight = 0;
					this.gameContGameStateCont.f.style.paddingBottom = chatboxHeight + 'px';
				}
				else {
					gameCanvas.gameCanvasBottomOffset = 35;
					// Modified zoom
					gameCanvas.Md = 0;
					gameCanvas.gameCanvasZoom = 1 + .25 * (viewModeLSI - 1);
					this.gameContGameStateCont.gameStateContGameCanvas.gameCanvasChatboxHeight = chatboxHeight * window.devicePixelRatio;
					this.gameContGameStateCont.f.style.paddingBottom = '0';
				}
				const roomState = room.eg();
				this.gameContGameStateCont.A(roomState);
				ConnectionConstants.audioUtil.pk.rt(roomState);
			}

			ue(a) {
				this.gameContShowing != a && (this.gameContShowing = a,
					this.f.classList.toggle('showing-room-view', this.gameContShowing),
					this.gameContShowing ? this.gameContTopSection.appendChild(this.gameContRoomMenuCont.f) : this.gameContRoomMenuCont.f.remove());
			}

			Xk() {
				return null != GameContainer.Mq;
			}

			ab(element, bFun) {
				ViewUtil.Nf(this.gameContPopups);
				GameContainer.Mq = element;
				if (null != element) {
					this.gameContPopups.style.display = 'flex';
					this.gameContPopups.appendChild(element);
					this.Ul = bFun;
				}
				else {
					this.gameContPopups.style.display = 'none';
					this.Ul = null;
				}
			}
		}

		class PlayerConnection {
			constructor(a) {
				this.playerConnPlayerPingUtil = new PlayerPingUtil(15);
				this.yc_field_number2 = 0;
				this.Mj = new Map;
				this.fp = new TimestampUtil(100, 16);
				this.Ig = false;
				this.Ab = 0;
				this.sa = a;
				a = StreamWriter.ka(8);
				a.u(Math.random());
				this.Se = a.Wb();
			}

			Vb(a, b) {
				null == b && (b = 0);
				this.sa.Vb(b, a);
			}
		}

		class GeoLocation {
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
				return GeoLocation.dg(JSON.parse(a));
			}

			static dg(a) {
				let b = new GeoLocation;
				b.Ic = a.lat;
				b.Lc = a.lon;
				b.vb = a.code.toLowerCase();
				return b;
			}

			static cp() {
				return WebserverApiOps.Lk(ConnectionConstants.rsUrl + 'api/geo').then(function (a) {
					return GeoLocation.dg(a);
				});
			}
		}

		class IDBUtil {
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

		class GameCanvas {
			constructor(lowLatency) {
				this.field_timestamp = window.performance.now();
				/** @type {Map<DynamicDisc, PlayerDiscCanvasItem>} */
				this.gameCanvasPlayerDiscItemByDynDiscMap = new Map;
				/** @type {Map<number, PlayerDiscCanvasItem>} */
				this.gameCanvasPlayerDiscItemByIdMap = new Map;
				this.gameCanvasResolutionScale = 1;
				this.gameCanvasChatboxHeight = 100;
				this.gameCanvasBottomOffset = 35;
				this.Md = 0;
				this.gameCanvasZoom = 1.5;
				this.gameCanvasCameraPoint = new Point(0, 0);
				this.gameCanvasDimmed = false;
				this.gameCanvasBigTextMan = new BigTextManager;
				this.gameCanvasLowLatency = lowLatency;
				this.gameCanvasCanvas = window.document.createElement('canvas');
				this.gameCanvasCanvas.mozOpaque = true;
				this.c = this.gameCanvasCanvas.getContext('2d', {
					alpha: false,
					desynchronized: lowLatency
				});
				this.gameCanvasGrassPattern = this.c.createPattern(ConnectionConstants.grassImage, null);
				this.gameCanvasConcretePattern = this.c.createPattern(ConnectionConstants.concreteImage, null);
				this.gameCanvasConcrete2Pattern = this.c.createPattern(ConnectionConstants.concrete2Image, null);
			}

			/**
			 * @param {FullPlayer} fullPlayer
			 * @param {number} b
			 */
			showHideChatIndicator(fullPlayer, b) {
				const playerDiscCanvasItem = this.gameCanvasPlayerDiscItemByIdMap.get(fullPlayer.Y);
				if (null != playerDiscCanvasItem)
					switch (b) {
						case 0:
							playerDiscCanvasItem.pdciChatIndicatorShown = true;
							break;
						case 1:
							playerDiscCanvasItem.pdciChatIndicatorShown = false;
					}
			}

			ws() {
				if (null != this.gameCanvasCanvas.parentElement) {
					var ratio1 = window.devicePixelRatio * this.gameCanvasResolutionScale;
					let boundingClientRect = this.gameCanvasCanvas.getBoundingClientRect();
					let widthRatio = Math.round(boundingClientRect.width * ratio1);
					let heigthRatio = Math.round(boundingClientRect.height * ratio1);
					if (this.gameCanvasCanvas.width != widthRatio || this.gameCanvasCanvas.height != heigthRatio) {
						this.gameCanvasCanvas.width = widthRatio;
						this.gameCanvasCanvas.height = heigthRatio;
					}
				}
			}

			/**
			 * @param {RoomState} roomState
			 * @param {number} playerId
			 */
			Qc(roomState, playerId) {
				var c = window.performance.now();
				let d = (c - this.field_timestamp) / 1E3;
				this.field_timestamp = c;
				this.gameCanvasPlayerDiscItemByDynDiscMap.clear();
				this.ws();
				GameCanvas.Pi(this.c, true);
				this.c.resetTransform();
				if (null != roomState.M) {
					let game = roomState.M;
					var gameObjects = game.va;
					var clientFullPlayer = roomState.getFullPlayerById(playerId);
					var playerDynDisc = null != clientFullPlayer ? clientFullPlayer.J : null;
					var h = 0 != this.Md ? this.gameCanvasCanvas.height / this.Md : this.gameCanvasZoom * window.devicePixelRatio * this.gameCanvasResolutionScale;
					let realBottomOffset = this.gameCanvasBottomOffset * this.gameCanvasResolutionScale;
					var realChatboxHeight = this.gameCanvasChatboxHeight * this.gameCanvasResolutionScale;
					var l = game.T.kf;
					var n = this.gameCanvasCanvas.width / h;
					0 < l && n > l && (n = l,
						h = this.gameCanvasCanvas.width / l);
					l = (this.gameCanvasCanvas.height - realBottomOffset - realChatboxHeight) / h;
					this.ts(game, playerDynDisc, n, l, d);
					for (var r = 0, t = roomState.K; r < t.length;) {
						let fullPlayer = t[r];
						++r;
						if (null == fullPlayer.J)
							continue;
						let playerDiscCanvasItem = this.gameCanvasPlayerDiscItemByIdMap.get(fullPlayer.Y);
						null == playerDiscCanvasItem && (playerDiscCanvasItem = new PlayerDiscCanvasItem,
							this.gameCanvasPlayerDiscItemByIdMap.set(fullPlayer.Y, playerDiscCanvasItem));
						playerDiscCanvasItem.A(fullPlayer, roomState);
						this.gameCanvasPlayerDiscItemByDynDiscMap.set(fullPlayer.J, playerDiscCanvasItem);
					}
					this.c.translate(this.gameCanvasCanvas.width / 2, (this.gameCanvasCanvas.height + realBottomOffset - realChatboxHeight) / 2);
					this.c.scale(h, h);
					this.c.translate(-this.gameCanvasCameraPoint.x, -this.gameCanvasCameraPoint.y);
					this.c.lineWidth = 3;
					this.ur(game.T);
					this.tr(game.T);
					h = gameObjects.H;
					r = 0;
					for (t = gameObjects.qb; r < t.length;)
						this.drawJoint(t[r++], h);
					this.mr(roomState, n, l);
					this.drawChatIndicatorsAndNicks(roomState, clientFullPlayer);
					null != playerDynDisc && this.rr(playerDynDisc.a);
					this.c.lineWidth = 2;
					let index = 0;
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
					for (playerDynDisc = roomState.K; index < playerDynDisc.length;)
						l = playerDynDisc[index],
							++index,
							n = l.J,
						null != n && (l = this.gameCanvasPlayerDiscItemByIdMap.get(l.Y),
							this.drawDynDisc(n, l));
					index = 0;
					for (gameObjects = gameObjects.H; index < gameObjects.length;)
						if (playerDynDisc = gameObjects[index],
							++index,
						null == this.gameCanvasPlayerDiscItemByDynDiscMap.get(playerDynDisc)) {
							if (0 > playerDynDisc.V)
								break;
							this.drawDynDisc(playerDynDisc, null);
						}
					this.c.lineWidth = 3;
					this.c.resetTransform();
					this.c.translate(this.gameCanvasCanvas.width / 2, realBottomOffset + (this.gameCanvasCanvas.height - realBottomOffset - realChatboxHeight) / 2);
					this.qr(game);
					0 >= game.Ra && (this.gameCanvasBigTextMan.A(d),
						this.gameCanvasBigTextMan.Qc(this.c));
					this.gameCanvasPlayerDiscItemByDynDiscMap.clear();
					this.lr(roomState);
				}
			}

			lr(a) {
				let b = new Set;
				var c = 0;
				for (a = a.K; c < a.length;)
					b.add(a[c++].Y);
				c = this.gameCanvasPlayerDiscItemByIdMap.keys();
				for (a = c.next(); !a.done;) {
					let d = a.value;
					a = c.next();
					b.has(d) || this.gameCanvasPlayerDiscItemByIdMap.delete(d);
				}
			}

			/**
			 * @param {Game} game
			 * @param {DynamicDisc} dynDisc
			 * @param {number} c
			 * @param {number} d
			 * @param {number} e
			 */
			ts(game, dynDisc, c, d, e) {
				if (null != dynDisc && 1 == game.T.Re) {
					var f = dynDisc.a;
					var g = f.x;
					f = f.y;
					null == f && (f = 0);
					null == g && (g = 0);
				}
				else if (f = game.va.H[0].a,
					g = f.x,
					f = f.y,
				null != dynDisc) {
					var h = dynDisc.a;
					g = .5 * (g + h.x);
					f = .5 * (f + h.y);
					var k = c;
					dynDisc = d;
					null == d && (dynDisc = 0);
					null == c && (k = 0);
					var l = .5 * k;
					let n = .5 * dynDisc;
					dynDisc = h.x - l + 50;
					k = h.y - n + 50;
					l = h.x + l - 50;
					h = h.y + n - 50;
					g = g > l ? l : g < dynDisc ? dynDisc : g;
					f = f > h ? h : f < k ? k : f;
				}
				e *= 60;
				1 < e && (e = 1);
				dynDisc = g;
				dynDisc == dynDisc ? (dynDisc = f,
					dynDisc = dynDisc == dynDisc) : dynDisc = false;
				dynDisc && (k = dynDisc = this.gameCanvasCameraPoint,
					e *= .04,
					h = k.x,
					k = k.y,
					dynDisc.x = h + (g - h) * e,
					dynDisc.y = k + (f - k) * e);
				this.wo(c, d, game.T);
			}

			wo(a, b, c) {
				a > 2 * c.bc ? this.gameCanvasCameraPoint.x = 0 : this.gameCanvasCameraPoint.x + .5 * a > c.bc ? this.gameCanvasCameraPoint.x = c.bc - .5 * a : this.gameCanvasCameraPoint.x - .5 * a < -c.bc && (this.gameCanvasCameraPoint.x = -c.bc + .5 * a);
				b > 2 * c.sc ? this.gameCanvasCameraPoint.y = 0 : this.gameCanvasCameraPoint.y + .5 * b > c.sc ? this.gameCanvasCameraPoint.y = c.sc - .5 * b : this.gameCanvasCameraPoint.y - .5 * b < -c.sc && (this.gameCanvasCameraPoint.y = -c.sc + .5 * b);
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
					this.gameCanvasBigTextMan.Gq.vr(this.c));
			}

			Qr(a) {
				if (this.gameCanvasDimmed != a) {
					this.gameCanvasCanvas.style.filter = a ? 'grayscale(70%)' : '';
					this.gameCanvasDimmed = a;
				}
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
				GameCanvas.Pi(this.c, false);
				var b = a.be;
				let c = a.ae
					,
					d = this;
				if (1 == a.ud)
					this.c.save(),
						this.c.resetTransform(),
						this.c.fillStyle = GameCanvas.getRgbaFromColorInt(a.td),
						this.c.fillRect(0, 0, this.gameCanvasCanvas.width, this.gameCanvasCanvas.height),
						this.c.restore(),
						this.c.strokeStyle = '#C7E6BD',
						this.c.fillStyle = this.gameCanvasGrassPattern,
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
					this.c.rect(this.gameCanvasCameraPoint.x - 1E4, this.gameCanvasCameraPoint.y - 1E4, 2E4, 2E4);
					this.c.scale(2, 2);
					this.c.fillStyle = this.gameCanvasConcrete2Pattern;
					this.c.fill();
					this.c.restore();
					this.c.save();
					this.rm(this.c, -b, -c, 2 * b, 2 * c, a.Fc);
					this.c.scale(2, 2);
					this.c.fillStyle = this.gameCanvasConcretePattern;
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
						this.c.fillStyle = GameCanvas.getRgbaFromColorInt(a.td),
						this.c.fillRect(0, 0, this.gameCanvasCanvas.width, this.gameCanvasCanvas.height),
						this.c.restore();
				GameCanvas.Pi(this.c, true);
			}

			/**
			 * @param {RoomState} roomState
			 * @param {FullPlayer} fullPlayer
			 */
			drawChatIndicatorsAndNicks(roomState, fullPlayer) {
				let showIndicators = ConnectionConstants.localStorageUtilInst.lsShowIndicators.v();
				let fpIndex = 0;
				let fullPlayers = roomState.K;
				while (fpIndex < fullPlayers.length) {
					let fullPlayer1 = fullPlayers[fpIndex];
					++fpIndex;
					var player1DynDisc = fullPlayer1.J;
					if (null == player1DynDisc)
						continue;
					let player1Pos = player1DynDisc.a;
					let playerDiscCanvasItem = this.gameCanvasPlayerDiscItemByIdMap.get(fullPlayer1.Y);
					if (showIndicators && playerDiscCanvasItem.pdciChatIndicatorShown)
						this.c.drawImage(ConnectionConstants.typingImage, player1Pos.x - .5 * ConnectionConstants.typingImage.width, player1Pos.y - 35);
					fullPlayer1 != fullPlayer && playerDiscCanvasItem.drawNickAtPos(this.c, player1Pos.x, player1Pos.y + 50);
				}
			}

			/**
			 * @param {DynamicDisc} dynamicDisc
			 * @param {PlayerDiscCanvasItem} pdci
			 */
			drawDynDisc(dynamicDisc, pdci) {
				if (!(0 > dynamicDisc.V)) {
					this.c.beginPath();
					if (null == pdci) {
						this.c.fillStyle = GameCanvas.getRgbaFromColorInt(dynamicDisc.S);
						this.c.strokeStyle = 'black';
					}
					else {
						this.c.fillStyle = pdci.pdciPattern;
						this.c.strokeStyle = pdci.pdciOutlineColor;
					}
					this.c.beginPath();
					this.c.arc(dynamicDisc.a.x, dynamicDisc.a.y, dynamicDisc.V, 0, 2 * Math.PI, false);
					if (null != pdci) {
						this.c.save();
						const radius = dynamicDisc.V / 32;
						this.c.translate(dynamicDisc.a.x, dynamicDisc.a.y);
						this.c.scale(radius, radius);
						this.c.translate(-32, -32);
						this.c.fill();
						this.c.restore();
					}
					else {
						-1 != (dynamicDisc.S | 0) && this.c.fill();
					}
					this.c.stroke();
				}
			}

			/** @param {Stadium} stadium */
			tr(stadium) {
				if (null != stadium) {
					var b = 0;
					for (stadium = stadium.X; b < stadium.length;)
						this.sr(stadium[b++]);
				}
			}

			/**
			 * @param {Joint} joint
			 * @param {DynamicDisc[]} dynDiscs
			 */
			drawJoint(joint, dynDiscs) {
				if (!(0 > joint.S)) {
					this.c.beginPath();
					this.c.strokeStyle = GameCanvas.getRgbaFromColorInt(joint.S);
					var c = dynDiscs[joint.ge];
					joint = dynDiscs[joint.he];
					null != c && null != joint && (c = c.a,
						joint = joint.a,
						this.c.moveTo(c.x, c.y),
						this.c.lineTo(joint.x, joint.y),
						this.c.stroke());
				}
			}

			/** @param {Segment} segment */
			sr(segment) {
				if (segment.bb) {
					this.c.beginPath();
					this.c.strokeStyle = GameCanvas.getRgbaFromColorInt(segment.S);
					var b = segment.Z.a
						,
						c = segment.ea.a;
					if (0 != 0 * segment.wb)
						this.c.moveTo(b.x, b.y),
							this.c.lineTo(c.x, c.y);
					else {
						segment = segment.fe;
						let d = b.x - segment.x;
						b = b.y - segment.y;
						this.c.arc(segment.x, segment.y, Math.sqrt(d * d + b * b), Math.atan2(b, d), Math.atan2(c.y - segment.y, c.x - segment.x));
					}
					this.c.stroke();
				}
			}

			/**
			 * @param {RoomState} roomState
			 * @param {number} b
			 * @param {number} c
			 */
			mr(roomState, b, c) {
				var game = roomState.M;
				if (null != game)
					for (game = game.va.H[0],
						     this.Gk(game.a, game.S, b, c),
						     game = 0,
						     roomState = roomState.K; game < roomState.length;) {
						let e = roomState[game];
						++game;
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
				var f = this.gameCanvasCameraPoint;
				e = a.x - f.x;
				f = a.y - f.y;
				let g = -d
					,
					h = -c
					,
					k = this.gameCanvasCameraPoint;
				d = k.x + (e > d ? d : e < g ? g : e);
				c = k.y + (f > c ? c : f < h ? h : f);
				e = a.x - d;
				a = a.y - c;
				900 < e * e + a * a && (this.c.fillStyle = 'rgba(0,0,0,0.5)',
					this.Hk(d + 2, c + 2, Math.atan2(a, e)),
					this.c.fillStyle = GameCanvas.getRgbaFromColorInt(b),
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

			resetChatIndicators() {
				let playerDiscCanvasItems = this.gameCanvasPlayerDiscItemByIdMap.values()
					,
					b = playerDiscCanvasItems.next();
				for (; !b.done;) {
					let pdci = b.value;
					b = playerDiscCanvasItems.next();
					pdci.pdciChatIndicatorShown = false;
				}
			}

			static getRgbaFromColorInt(colorInt) {
				return 'rgba(' + [(colorInt & 16711680) >>> 16, (colorInt & 65280) >>> 8, colorInt & 255].join() + ',255)';
			}

			static Pi(a, b) {
				a.imageSmoothingEnabled = b;
				a.mozImageSmoothingEnabled = b;
			}
		}

		class UnsupportedBrowserContainer {
			constructor(a) {
				this.f = ViewUtil.Ia(UnsupportedBrowserContainer.htmlContents);
				ViewUtil.Ba(this.f).get('features').textContent = a.join(', ');
			}
		}

		class ControlsUtil {
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
				let b = new ControlsUtil
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
				return ControlsUtil.dg(JSON.parse(a));
			}

			static sk() {
				let a = new ControlsUtil;
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

		class PlayerDiscCanvasItem {
			constructor() {
				this.pdciChatIndicatorShown = false;
				this.D = '';
				this.uh = 0;
				this.Wf = '';
				this.mb = new TeamColors;
				let canvas = window.document.createElement('canvas');
				canvas.width = 64;
				canvas.height = 64;
				this.pdciDiscCtx = canvas.getContext('2d', null);
				this.pdciPattern = this.pdciDiscCtx.createPattern(this.pdciDiscCtx.canvas, 'no-repeat');
				this.createNickCanvas();
			}

			createNickCanvas() {
				let canvas = window.document.createElement('canvas');
				canvas.width = 160;
				canvas.height = 34;
				this.pdciNickCtx = canvas.getContext('2d', null);
			}

			prepareNickCanvas() {
				let ctx = this.pdciNickCtx;
				ctx.resetTransform();
				ctx.clearRect(0, 0, 160, 34);
				ctx.font = '26px sans-serif';
				ctx.fillStyle = 'white';
				160 < ctx.measureText(this.D).width ? (ctx.textAlign = 'left',
					ctx.translate(2, 29)) : (ctx.textAlign = 'center',
					ctx.translate(80, 29));
				ctx.fillText(this.D, 0, 0);
			}

			/**
			 * @param {CanvasRenderingContext2D} ctx
			 * @param {number} x
			 * @param {number} y
			 */
			drawNickAtPos(ctx, x, y) {
				ctx.drawImage(this.pdciNickCtx.canvas, 0, 0, 160, 34, x - 40, y - 34, 80, 17);
			}

			/**
			 * @param {FullPlayer} fullPlayer
			 * @param {RoomState} roomState
			 */
			A(fullPlayer, roomState) {
				if (null != fullPlayer.J) {
					let teamColors = ConnectionConstants.localStorageUtilInst.lsTeamColors.v() ? roomState.mb[fullPlayer.fa.ba] : fullPlayer.fa.Rm;
					let avatar = null != fullPlayer.Td ? fullPlayer.Td : fullPlayer.Zb;
					let shouldDrawAvatar = ConnectionConstants.localStorageUtilInst.lsShowAvatars.v() && null != avatar;
					if (!PlayerDiscCanvasItem.ko(this.mb, teamColors) || !shouldDrawAvatar && fullPlayer.Nb != this.uh || shouldDrawAvatar && this.Wf != avatar) {
						PlayerDiscCanvasItem.Ao(this.mb, teamColors);
						if (shouldDrawAvatar) {
							this.Wf = avatar;
							this.uh = -1;
						}
						else {
							this.Wf = '' + fullPlayer.Nb;
							this.uh = fullPlayer.Nb;
						}
						this.preparePlayerDiscDecoration(this.Wf);
					}
				}
				this.pdciOutlineColor = 0 < roomState.M.Ra || !fullPlayer.Yb ? 'black' : fullPlayer.Yb && 0 >= fullPlayer.Zc && 0 <= fullPlayer.Ac ? 'white' : 'black';
				if (fullPlayer.D != this.D) {
					this.D = fullPlayer.D;
					this.prepareNickCanvas();
				}
			}

			preparePlayerDiscDecoration(avatar) {
				let teamColorsStripes = this.mb.hb;
				if (!(1 > teamColorsStripes.length)) {
					this.pdciDiscCtx.save();
					this.pdciDiscCtx.translate(32, 32);
					this.pdciDiscCtx.rotate(3.141592653589793 * this.mb.sd / 128);
					for (var c = -32, d = 64 / teamColorsStripes.length, e = 0; e < teamColorsStripes.length;)
						this.pdciDiscCtx.fillStyle = GameCanvas.getRgbaFromColorInt(teamColorsStripes[e++]),
							this.pdciDiscCtx.fillRect(c, -32, d + 4, 64),
							c += d;
					this.pdciDiscCtx.restore();
					this.pdciDiscCtx.fillStyle = GameCanvas.getRgbaFromColorInt(this.mb.od);
					this.pdciDiscCtx.textAlign = 'center';
					this.pdciDiscCtx.textBaseline = 'alphabetic';
					this.pdciDiscCtx.font = '900 34px \'Arial Black\',\'Arial Bold\',Gadget,sans-serif';
					this.pdciDiscCtx.fillText(avatar, 32, 44);
					this.pdciPattern = this.pdciDiscCtx.createPattern(this.pdciDiscCtx.canvas, 'no-repeat');
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

		class IdbStadiumUtil {
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
							IDBUtil.lh(f.objectStore('files').get(a)).then(function (g) {
								try {
									let h = new Stadium;
									h.cl(g);
									b(h);
								}
								catch (h) {
									g = GlobalError.Mb(h).Gb(),
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
							IDBUtil.lh(e.objectStore('meta').getAll()).then(a, b);
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
								IDBUtil.lh(f.objectStore('files').add(a.Ae())).then(function (g) {
									g = {
										name: a.D,
										id: g
									};
									return IDBUtil.lh(f.objectStore('meta').add(g));
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

		class GameTimerContainer {
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

		class RoomListContainer {
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
						self.yn(self.pj);
					}
					;
					return n;
				}

				this.pj = [];
				this.Qs = a;
				this.La = ViewUtil.Ia(RoomListContainer.Dj);
				let c = ViewUtil.Ba(this.La)
					,
					gameNoticeCont = new GameNoticeContainer(c);
				this.zj = c.get('refresh');
				this.pn = c.get('join');
				a = c.get('create');
				this.Ls = c.get('count');
				let self = this;
				a.onclick = function () {
					FunctionRunner1.i(self.handleCreateRoomClick);
				}
				;
				c.get('changenick').onclick = function () {
					FunctionRunner1.i(self.handleChangeNickClick);
				}
				;
				c.get('settings').onclick = function () {
					FunctionRunner1.i(self.handleSettingsClick);
				}
				;
				let replayFileInput = c.get('replayfile');
				replayFileInput.onchange = function () {
					var g = replayFileInput.files;
					if (!(1 > g.length)) {
						g = g.item(0);
						var fileReader = new FileReader;
						fileReader.onload = function () {
							FunctionRunner2.i(self.handleReplayFileLoad, fileReader.result);
						}
						;
						fileReader.readAsArrayBuffer(g);
					}
				}
				;
				this.Ps = b('fil-full', true);
				this.gt = b('fil-pass', false); // Hide locked rooms
				this.Os = b('fil-empty', true);
				this.Ws = c.get('listscroll');
				this.it = ScrollUtil.ei(this.Ws);
				this.sj = c.get('list');
				this.zj.onclick = function () {
					gameNoticeCont.em();
					self.kn();
				}
				;
				this.pn.onclick = function () {
					null != self.Xd && FunctionRunner2.i(self.handleRoomJoin, self.Xd.mt);
				}
				;
				this.kn();
			}

			kn() {
				function a() {
					d.zj.disabled = false;
					d.yn(roomGeos);
					return null;
				}

				this.Bn(null);
				this.zj.disabled = true;
				ViewUtil.Nf(this.sj);
				let roomGeos = [];
				this.pj = [];
				let c = RoomDataParser.get().then(function (e) {
						return roomGeos = e;
					}, function () {
						return null;
					})
					,
					d = this;
				RoomListContainer.ht(c).then(a, a);
			}

			yn(a) {
				this.pj = a;
				RoomDataParser.ot(this.Qs, a);
				a.sort(function (k, l) {
					return k.distanceKm - l.distanceKm;
				});
				ViewUtil.Nf(this.sj);
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
					self = this
					,
					h = 0;
				for (; h < a.length;) {
					let roomInfoWithGeo = a[h];
					++h;
					let roomInfo = roomInfoWithGeo.roomInfoInst;
					if (d && roomInfo.K >= roomInfo.jf)
						continue;
					if (e && roomInfo.Kb)
						continue;
					if (f && 0 == roomInfo.K)
						continue;
					let roomItem = new RoomItem(roomInfoWithGeo);
					roomItem.La.ondblclick = function () {
						FunctionRunner2.i(self.handleRoomJoin, roomInfoWithGeo);
					}
					;
					roomItem.La.onclick = function () {
						self.Bn(roomItem);
					}
					;
					this.sj.appendChild(roomItem.La);
					b += roomInfo.K;
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

		class ScrollUtil {
			static ei(a) {
				return new PerfectScrollbar(a, {
					handlers: ScrollUtil.scrollbarHandlers
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

		class RoomPasswordContainer {
			constructor() {
				this.f = ViewUtil.Ia(RoomPasswordContainer.htmlContents);
				let a = ViewUtil.Ba(this.f);
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

		class CreateRoomContainer {
			constructor(defaultRoomName) {
				this.f = ViewUtil.Ia(CreateRoomContainer.htmlContents);
				var b = ViewUtil.Ba(this.f);
				this.cont_cancelBtn = b.get('cancel');
				this.nk = b.get('create');
				this.mf = b.get('name');
				this.Gl = b.get('pass');
				this.hi = b.get('max-pl');
				this.$m = b.get('unlisted');
				this.mf.maxLength = 40;
				this.mf.value = defaultRoomName;
				let self = this;
				this.mf.oninput = function () {
					self.A();
				}
				;
				this.Gl.maxLength = 30;
				this.$m.onclick = function () {
					self.Uj(!self.an);
				}
				;
				this.cont_cancelBtn.onclick = function () {
					FunctionRunner1.i(self.ji);
				}
				;
				this.nk.onclick = function () {
					if (self.Hc()) {
						let pass = self.Gl.value;
						'' == pass && (pass = null);
						FunctionRunner2.i(self.handleRoomCreate, {
							name: self.mf.value,
							password: pass,
							maxPlayers: self.hi.selectedIndex + 1, // Max players in rooms from 1-30
							unlisted: self.an
						});
					}
				}
				;
				// Max players in rooms from 1-30
				for (defaultRoomName = 1; 31 > defaultRoomName;)
					b = window.document.createElement('option'),
						b.textContent = '' + defaultRoomName++,
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

		class ActionManager {
			static rj() {
				Action.Ja(AnnouncementAction);
				Action.Ja(ChatIndicatorAction);
				Action.Ja(CheckSyncAction);
				Action.Ja(PlayerActivityAction);
				Action.Ja(ChatAction);
				Action.Ja(PlayerJoinAction);
				Action.Ja(KickAction);
				Action.Ja(GameStartAction);
				Action.Ja(GameStopAction);
				Action.Ja(GamePauseAction);
				Action.Ja(SetLimitsAction);
				Action.Ja(SetStadiumAction);
				Action.Ja(MoveToTeamAction);
				Action.Ja(LockTeamsAction);
				Action.Ja(GiveAdminAction);
				Action.Ja(AutoAction);
				Action.Ja(SyncChangeAction);
				Action.Ja(UpdatePlayerPingsAction);
				Action.Ja(CmdAvatarAction);
				Action.Ja(SetTeamColorsAction);
				Action.Ja(ReorderPlayersAction);
				Action.Ja(KickRateAction);
				Action.Ja(AvatarOverrideAction);
				Action.Ja(SetDiscPropertiesAction);
			}
		}

		class LocalStorageItem {
			constructor(a, localStorageInst, c, d) {
				this.D = a;
				this.Bs = d;
				this.di = localStorageInst;
				d = null;
				null != localStorageInst && (d = localStorageInst.getItem(a));
				this.dn = c(d);
			}

			v() {
				return this.dn;
			}

			setLSItem(value) {
				this.dn = value;
				if (null != this.di)
					try {
						let b = this.Bs(value);
						null == b ? this.di.removeItem(this.D) : this.di.setItem(this.D, b);
					}
					catch (b) {
					}
			}
		}

		class ReplayManager {
			/** @param {ReplayRoom} replayRoom */
			constructor(replayRoom) {
				this.field_timestamp = window.performance.now();
				this.W = new PlayerActivityManager; /// Last change
				this.field_fps = this.field_animationFrame = 0;
				this.za = replayRoom;
				this.field_gameContainer = new GameContainer(replayRoom.roomClientPlayerId);
				let insideRoomManager = new InsideRoomManager(this.field_gameContainer);
				insideRoomManager.setRoomStateEvents(replayRoom.U);
				window.document.addEventListener('keydown', function_M(this, this.Fa));
				window.document.addEventListener('keyup', function_M(this, this.kd));
				let self = this;
				/// Last change
				this.W.ul = function (d) {
					'ToggleChat' == d && self.field_gameContainer.gameContChatboxCont.Wm();
				}
				;
				window.requestAnimationFrame(function_M(this, this.pf));
				this.Kh = window.setInterval(function () {
					self.field_gameContainer.gameContStatsCont.Dm(self.field_fps);
					self.field_fps = 0;
				}, 1E3);
				this.Gm(ConnectionConstants.localStorageUtilInst.lsViewMode.v());
				this.field_gameContainer.f.classList.add('replayer');
				this.replayManRCCont = new ReplayControlsContainer(replayRoom);
				this.replayManRCCont.xq = function () {
					insideRoomManager.resetRoomStateEvents(replayRoom.U);
				}
				;
				this.replayManRCCont.wq = function () {
					self.field_gameContainer.ue(null == replayRoom.U.M);
					insideRoomManager.setRoomStateEvents(replayRoom.U);
				}
				;
				this.replayManRCCont.Al = function () {
					self.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas.resetChatIndicators();
				}
				;
				this.field_gameContainer.f.appendChild(this.replayManRCCont.f);
				/// Last change
				this.ej = window.setInterval(function () {
					replayRoom.A();
				}, 50);

				// Exposing global fields begin
				window.parent.g.getRoomManager = () => getReplayManagerObject(self);
				window.parent.g.getRoomState = () => window.parent.g.getRoomManager().room.roomState;
				const onRoomJoinFun = window.parent.g.onRoomJoin;
				if (onRoomJoinFun != null)
					onRoomJoinFun(window.parent.g.getRoomManager());
				// Exposing global fields end
			}

			la() {
				// Exposing global fields begin
				const onRoomLeaveFun = window.parent.g.onRoomLeave;
				if (onRoomLeaveFun != null)
					onRoomLeaveFun(window.parent.g.getRoomManager());
				// Exposing global fields end
				window.document.removeEventListener('keydown', function_M(this, this.Fa));
				window.document.removeEventListener('keyup', function_M(this, this.kd));
				window.onbeforeunload = null;
				window.cancelAnimationFrame(this.field_animationFrame);
				window.clearInterval(this.Kh);
				/// Last change
				window.clearInterval(this.ej);
				this.W.la();
			}

			pf() {
				this.field_animationFrame = window.requestAnimationFrame(function_M(this, this.pf));
				this.za.A();
				this.Qc();
			}

			Qc() {
				this.replayManRCCont.A();
				let a = window.performance.now();
				1 == ConnectionConstants.localStorageUtilInst.lsFpsLimit.v() && 28.333333333333336 > a - this.field_timestamp || (this.field_timestamp = a,
					this.field_fps++,
					this.Gm(ConnectionConstants.localStorageUtilInst.lsViewMode.v()),
				0 < this.za.Pd || this.field_gameContainer.A(this.za));
			}

			Fa(a) {
				/// Last changes
				var viewModeLSI = ConnectionConstants.localStorageUtilInst.lsViewMode;
				let c = null != ConnectionConstants.localStorageUtilInst.lsPlayerKeys.v().v(a.code);
				switch (a.keyCode) {
					case 27:
						if (this.field_gameContainer.Xk()) {
							this.field_gameContainer.ab(null);
						}
						else {
							let gameContainer = this.field_gameContainer;
							gameContainer.ue(!gameContainer.gameContShowing);
						}
						a.preventDefault();
						break;
					case 48: // Modified zoom
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(0.1);
						break;
					case 49:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(1);
						break;
					case 50:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(2);
						break;
					case 51:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(3);
						break;
					case 52:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(4);
						break;
					case 53:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(5);
						break;
					case 54:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(6);
						break;
					case 55:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(7);
						break;
					case 56: // Modified zoom keys
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(15);
						break;
					case 57:
						c ? this.W.Fa(a) : viewModeLSI.setLSItem(-1.5);
						break;
				}
			}

			/// Last change
			kd(a) {
				this.W.kd(a);
			}

			Gm() {
				let viewModeLSI = ConnectionConstants.localStorageUtilInst.lsViewMode.v()
					,
					gameCanvas = this.field_gameContainer.gameContGameStateCont.gameStateContGameCanvas;
				gameCanvas.gameCanvasResolutionScale = ConnectionConstants.localStorageUtilInst.lsResolutionScale.v();
				gameCanvas.gameCanvasBottomOffset = 35;
				// Modified zoom
				gameCanvas.Md = 0;
				gameCanvas.gameCanvasZoom = 1 + .25 * (viewModeLSI - 1);
			}
		}

		class KickDialogContainer {
			constructor(a) {
				this.f = ViewUtil.Ia(KickDialogContainer.htmlContents);
				let b = ViewUtil.Ba(this.f);
				this.lf = b.get('title');
				this.wi = b.get('reason');
				this.Un = b.get('ban-btn');
				this.Wn = b.get('ban-text');
				this.bf = b.get('kick');
				this.wd = b.get('close');
				let self = this;
				this.Un.onclick = function () {
					self.Pj(!self.Yj);
				}
				;
				this.wd.onclick = function () {
					FunctionRunner1.i(self.rb);
				}
				;
				this.bf.onclick = function () {
					FunctionRunner4.i(self.li, self.field_clientPlayerId, self.wi.value, self.Yj);
				}
				;
				this.wi.onkeydown = function (d) {
					return d.stopPropagation();
				}
				;
				this.wi.maxLength = 100;
				this.field_clientPlayerId = a.Y;
				this.lf.textContent = 'Kick ' + a.D;
				this.Pj(false);
			}

			Pj(a) {
				this.Yj = a;
				this.Wn.textContent = a ? 'Yes' : 'No';
			}
		}

		class SimpleDialogContainer {
			constructor(a, b, c) {
				this.f = ViewUtil.Ia(SimpleDialogContainer.htmlContents);
				var d = ViewUtil.Ba(this.f);
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
						FunctionRunner2.i(g.Wa, l);
					}
					;
					d.appendChild(n);
				}
				this.de.textContent = b;
				e.textContent = a;
			}
		}

		class ChatboxContainer {
			constructor() {
				this.$e = this.Xh = false;
				this.f = ViewUtil.Ia(ChatboxContainer.htmlContents);
				let a = ViewUtil.Ba(this.f);
				this.Kc = a.get('log');
				this.bi = a.get('log-contents');
				this.$a = a.get('input');
				this.$a.maxLength = 140;
				let b = this;
				a.get('drag').onmousedown = function (c) {
					function d(h) {
						h.preventDefault();
						ConnectionConstants.localStorageUtilInst.lsChatHeight.setLSItem(function_gc(function_gc(e + (f - h.y))));
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
				this.Ec = new Mention(a.get('autocompletebox'), function (c, d) {
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
				let a = function_gc(ConnectionConstants.localStorageUtilInst.lsChatHeight.v());
				if (this.Xh) {
					let b = function_gc(ConnectionConstants.localStorageUtilInst.lsChatFocusHeight.v());
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
				0 <= b && (d.style.color = GameCanvas.getRgbaFromColorInt(b));
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
				b = this.Kc.scrollTop + b - this.Kc.scrollHeight >= .5 * -b || !ChatboxContainer.xp(this.Kc);
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

		class CandidateUtil {
			static uf(a) {
				a = a.split(' ');
				let b = a[4];
				if ('typ' != a[6])
					throw GlobalError.C(null);
				return {
					qs: a[7],
					wp: b
				};
			}
		}

		class Mention {
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
						e = Mention.To
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
				this.Qb.hidden || ViewUtil.Nf(this.Qb);
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

		class ReplayControlsContainer {
			/** @param {ReplayRoom} replayRoom */
			constructor(replayRoom) {
				function b() {
					let t = g[f];
					replayRoom.Ll = e ? t : 0;
					c.get('spd').textContent = t + 'x';
				}

				this.ig = false;
				this.f = ViewUtil.Ia(ReplayControlsContainer.htmlContents);
				let c = ViewUtil.Ba(this.f);
				this.Bi = replayRoom;
				let d = this;
				c.get('reset').onclick = function () {
					replayRoom.Ci();
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
					r = replayRoom.ml;
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
					replayRoom.Hr((t.pageX - k.offsetLeft) / k.clientWidth * replayRoom.oh * replayRoom.yf);
					d.ig || (d.ig = true,
						d.xq(),
						d.Al());
				}
				;
				k.onmousemove = function (t) {
					t = (t.pageX - k.offsetLeft) / k.clientWidth;
					l.textContent = ReplayControlsContainer.nl(replayRoom.yf * replayRoom.oh * t);
					return l.style.left = 'calc(' + 100 * t + '% - 30px)';
				}
				;
				this.Gp = c.get('leave');
				this.Gp.onclick = function () {
					FunctionRunner1.i(d.le);
				};
			}

			A() {
				this.ks.textContent = ReplayControlsContainer.nl(this.Bi.Ub);
				this.br.style.width = 100 * this.Bi.ep() + '%';
				!this.ig || 0 < this.Bi.Pd || (this.ig = false,
					this.wq());
			}

			static nl(a) {
				a = a / 1E3 | 0;
				return (a / 60 | 0) + ':' + class_ba.Lf(StringOpsInt.Fe(a % 60));
			}
		}

		class class_Cc_Unused {
			constructor(a) {
				this.current = 0;
				this.Fs = a;
			}

			next() {
				return this.Fs[this.current++];
			}
		}

		class ScoreItem {
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

		class ChatHandler {
			/**
			 * @param {HostRoom|JoinedRoom} room
			 * @param {Function} showNoticeFun
			 */
			constructor(room, showNoticeFun) {
				this.za = room;
				this.da = showNoticeFun;
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
							d = ChatHandler.Fq(a),
								this.za.ua(d);
						}
						catch (g) {
							a = GlobalError.Mb(g).Gb(),
							'string' == typeof a && this.da(a);
						}
						break;
					case 'extrapolation':
						2 == a.length ? (a = StringOpsInt.parseInt(a[1]),
							null != a && -200 <= a && 1E3 >= a ? (ConnectionConstants.localStorageUtilInst.lsExtrapolation.setLSItem(a),
								this.za.Cm(a),
								this.da('Extrapolation set to ' + a + ' msec')) : this.da('Extrapolation must be a value between -200 and 1000 milliseconds')) : this.da('Extrapolation requires a value in milliseconds.');
						break;
					case 'handicap':
						2 == a.length ? (a = StringOpsInt.parseInt(a[1]),
							null != a && 0 <= a && 300 >= a ? (this.za.Pr(a),
								this.da('Ping handicap set to ' + a + ' msec')) : this.da('Ping handicap must be a value between 0 and 300 milliseconds')) : this.da('Ping handicap requires a value in milliseconds.');
						break;
					case 'kick_ratelimit':
						if (4 > a.length)
							this.da('Usage: /kick_ratelimit <min> <rate> <burst>');
						else {
							d = StringOpsInt.parseInt(a[1]);
							var e = StringOpsInt.parseInt(a[2]);
							a = StringOpsInt.parseInt(a[3]);
							null == d || null == e || null == a ? this.da('Invalid arguments') : this.za.ua(KickRateAction.pa(d, e, a));
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
											throw GlobalError.C(null);
									}
									this.Em(e);
									this.da('Room join Recaptcha ' + (e ? 'enabled' : 'disabled'));
								}
								else
									throw GlobalError.C(null);
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
						f.af() ? this.da('Can\'t store default stadium.') : IdbStadiumUtil.lt().then(function () {
							return IdbStadiumUtil.add(f);
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

			/** Set avatar */
			Bm(a) {
				null != a && (a = StringOpsSubstr.Xc(a, 2));
				ConnectionConstants.localStorageUtilInst.lsAvatar.setLSItem(a);
				this.za.ua(CmdAvatarAction.pa(a));
			}

			static Fq(a) {
				if (3 > a.length)
					throw GlobalError.C('Not enough arguments');
				if (7 < a.length)
					throw GlobalError.C('Too many arguments');
				let b = new SetTeamColorsAction
					,
					c = new TeamColors;
				b.Zg = c;
				switch (a[1]) {
					case 'blue':
						c.hb = [Team.blue.S];
						b.fa = Team.blue;
						break;
					case 'red':
						c.hb = [Team.red.S];
						b.fa = Team.red;
						break;
					default:
						throw GlobalError.C('First argument must be either "red" or "blue"');
				}
				if ('clear' == a[2])
					return b;
				c.sd = 256 * StringOpsInt.parseInt(a[2]) / 360 | 0;
				c.od = StringOpsInt.parseInt('0x' + a[3]);
				if (4 < a.length) {
					c.hb = [];
					let d = 4
						,
						e = a.length;
					for (; d < e;)
						c.hb.push(StringOpsInt.parseInt('0x' + a[d++]));
				}
				return b;
			}
		}

		class SoundSliderContainer {
			constructor(a) {
				this.f = a;
				let b = ViewUtil.Ba(a);
				this.Yn = b.get('sound-bar');
				this.up = b.get('sound-icon');
				this.Xn = b.get('sound-bar-bg');
				let self = this;
				b.get('sound-btn').onclick = function () {
					ConnectionConstants.localStorageUtilInst.lsSoundMain.setLSItem(!ConnectionConstants.localStorageUtilInst.lsSoundMain.v());
					self.A();
				}
				;
				b.get('sound-slider').onmousedown = function (d) {
					function e(g) {
						g.preventDefault();
						{
							let h = self.Xn.getBoundingClientRect();
							g = (g.clientY - h.top) / h.height;
						}
						g = 1 - g;
						ConnectionConstants.localStorageUtilInst.lsSoundVolume.setLSItem(1 < g ? 1 : 0 > g ? 0 : g);
						ConnectionConstants.localStorageUtilInst.lsSoundMain.setLSItem(true);
						self.A();
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
				let a = ConnectionConstants.localStorageUtilInst.lsSoundVolume.v()
					,
					b = !ConnectionConstants.localStorageUtilInst.lsSoundMain.v();
				if (this.Ep != a || this.Dp != b)
					this.Ep = a,
					(this.Dp = b) && (a = 0),
						this.up.className = 'icon-' + (0 >= a ? 'volume-off' : .5 >= a ? 'volume-down' : 'volume-up'),
						this.Yn.style.top = 100 * (1 - a) + '%',
						ConnectionConstants.audioUtil.yi();
			}
		}

		class RoomDataParser {
			/**
			 * @param {StreamReader} reader
			 * @return {RoomInfoWithGeo[]}
			 */
			static parse(reader) {
				reader.F();
				let roomInfoWithGeoArray = [];
				for (; 0 != reader.s.byteLength - reader.a;) {
					let c = reader.pe(reader.Sb());
					let d = reader.Zl(reader.Sb());
					try {
						let roomInfo = new RoomInfo;
						roomInfo.ma(new StreamReader(new DataView(d), false));
						let roomInfoWithGeo = new RoomInfoWithGeo;
						roomInfoWithGeo.roomInfoInst = roomInfo;
						roomInfoWithGeo.ba = c;
						roomInfoWithGeoArray.push(roomInfoWithGeo);
					}
					catch (e) {
					}
				}
				return roomInfoWithGeoArray;
			}

			static Ss(a, b, c, d) {
				return Math.acos(Math.sin(a) * Math.sin(c) + Math.cos(a) * Math.cos(c) * Math.cos(b - d));
			}

			static ot(a, b) {
				let c = a.Ic;
				a = a.Lc;
				let d = 0;
				for (; d < b.length;) {
					let roomInfoWithGeo = b[d];
					++d;
					let f = roomInfoWithGeo.roomInfoInst;
					roomInfoWithGeo.distanceKm = 6378 * RoomDataParser.Ss(.017453292519943295 * f.Ic, .017453292519943295 * f.Lc, .017453292519943295 * c, .017453292519943295 * a);
					isFinite(roomInfoWithGeo.distanceKm) || (roomInfoWithGeo.distanceKm = 22E3);
				}
			}

			static get() {
				return WebserverApiOps.v(ConnectionConstants.rsUrl + 'api/list', 'arraybuffer').then(function (a) {
					return RoomDataParser.parse(new StreamReader(new DataView(a), false));
				});
			}
		}

		class RoomInfo {
			constructor() {
			}

			dk() {
				this.D = StringOpsSubstr.Xc(this.D, 40);
				this.vb = StringOpsSubstr.Xc(this.vb, 3);
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
					throw GlobalError.C(null);
				this.dk();
			}
		}

		class Action {
			constructor() {
				Action.zb || this.Za();
			}

			Za() {
				this.Cc = 0;
			}

			wn() {
				return true;
			}

			apply() {
				throw GlobalError.C('missing implementation');
			}

			xa() {
				throw GlobalError.C('missing implementation');
			}

			wa() {
				throw GlobalError.C('missing implementation');
			}

			static Ha(a) {
				null == a.delay && (a.delay = true);
				null == a.Ca && (a.Ca = true);
				return a;
			}

			static Ja(a) {
				a.Jn = Action.actionCounter;
				if (null == a.Aa)
					throw GlobalError.C('Class doesn\'t have a config');
				a.prototype.Kf = a.Aa;
				Action.allActionsMap.set(Action.actionCounter, a);
				Action.actionCounter++;
			}

			static wj(a, b) {
				let c = CastUtil.jn(a).Jn;
				if (null == c)
					throw GlobalError.C('Tried to pack unregistered action');
				b.m(c);
				a.wa(b);
			}

			static mh(a) {
				var b = a.F();
				b = Object.create(Action.allActionsMap.get(b).prototype);
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

		class LeaveRoomDialogContainer {
			constructor() {
				this.f = ViewUtil.Ia(LeaveRoomDialogContainer.htmlContents);
				let a = ViewUtil.Ba(this.f)
					,
					self = this;
				a.get('cancel').onclick = function () {
					FunctionRunner2.i(self.rb, false);
				}
				;
				a.get('leave').onclick = function () {
					FunctionRunner2.i(self.rb, true);
				};
			}
		}

		class RoomLinkUtil {
			static mapRoomUrl(url) {
				let b = new RegexUtil('([^&=]+)=?([^&]*)', 'g');
				url = url.substring(1);
				var c = 0;
				let map = new Map;
				for (; b.Xs(url, c);) {
					c = b.sn(1);
					c = decodeURIComponent(c.split('+').join(' '));
					let e = b.sn(2);
					map.set(c, decodeURIComponent(e.split('+').join(' ')));
					c = b.Ys();
					c = c.xj + c.Vs;
				}
				return map;
			}

			static mapCurrentUrl() {
				return RoomLinkUtil.mapRoomUrl(window.top.location.search);
			}
		}

		class StreamWriter {
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
				return new StreamReader(this.Qd(), this.Ua);
			}

			tc(a) {
				this.s.byteLength < a && this.Ar(2 * this.s.byteLength >= a ? 2 * this.s.byteLength : a);
			}

			Ar(a) {
				if (1 > a)
					throw GlobalError.C('Can\'t resize buffer to a capacity lower than 1');
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
				this.nb(StreamWriter.wh(a));
				this.ij(a);
			}

			Fb(a) {
				null == a ? this.nb(0) : (this.nb(StreamWriter.wh(a) + 1),
					this.ij(a));
			}

			en(a) {
				/// Last change
				a = (new TextEncoder).encode(a);
				let b = a.length;
				if (255 < b)
					throw GlobalError.C(null);
				this.m(b);
				this.As(a);
			}

			Vg(a) {
				this.oc(JSON.stringify(a));
			}

			ij(a) {
				let b = this.a;
				this.tc(b + StreamWriter.wh(a));
				let c = a.length
					,
					d = 0;
				for (; d < c;)
					b += StreamWriter.So(class_O.nj(a, d++), this.s, b);
				this.a = b;
			}

			nb(a) {
				let b = this.a;
				a >>>= 0;
				this.tc(b + StreamWriter.co(a));
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
				return new StreamWriter(new DataView(new ArrayBuffer(a)), b);
			}

			static So(a, b, c) {
				let d = c;
				if (0 > a)
					throw GlobalError.C('Cannot encode UTF8 character: charCode (' + a + ') is negative');
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
					throw GlobalError.C('Cannot encode UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
				return c - d;
			}

			static bo(a) {
				if (0 > a)
					throw GlobalError.C('Cannot calculate length of UTF8 character: charCode (' + a + ') is negative');
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
				throw GlobalError.C('Cannot calculate length of UTF8 character: charCode (' + a + ') is too large (>= 0x80000000)');
			}

			static wh(a) {
				let b = 0
					,
					c = a.length
					,
					d = 0;
				for (; d < c;)
					b += StreamWriter.bo(class_O.nj(a, d++));
				return b;
			}

			static co(a) {
				a >>>= 0;
				return 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5;
			}
		}

		class CaptchaDialogContainer {
			constructor(sitekey) {
				let simpleDialogContainer = new SimpleDialogContainer('Only humans', '', []);
				this.f = simpleDialogContainer.f;
				simpleDialogContainer.de.style.minHeight = '78px';
				let self = this;
				GrecaptchaLoader.Hp().then(function (d) {
					null == CaptchaDialogContainer.Hg && (CaptchaDialogContainer.Hg = window.document.createElement('div'),
						simpleDialogContainer.de.appendChild(CaptchaDialogContainer.Hg),
						CaptchaDialogContainer.er = d.render(CaptchaDialogContainer.Hg, {
							sitekey: sitekey,
							callback: function (e) {
								FunctionRunner2.i(CaptchaDialogContainer.cm, e);
							},
							theme: 'dark'
						}));
					d.reset(CaptchaDialogContainer.er);
					CaptchaDialogContainer.cm = function (e) {
						window.setTimeout(function () {
							FunctionRunner2.i(self.Wa, e);
						}, 1E3);
						CaptchaDialogContainer.cm = null;
					}
					;
					simpleDialogContainer.de.appendChild(CaptchaDialogContainer.Hg);
				});
			}
		}

		class CastUtil {
			static jn(a) {
				if (null == a)
					return null;
				if (a instanceof Array)
					return Array;
				{
					let b = a.g;
					if (null != b)
						return b;
					a = CastUtil.Kj(a);
					return null != a ? CastUtil.Nn(a) : null;
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
							var d = basObject[a.Hb].$d[a.pb];
							c = d.wc;
							if (d.Le) {
								b += '\t';
								var e = []
									,
									f = 0;
								for (d = d.Le; f < d.length;) {
									let g = d[f];
									f += 1;
									e.push(CastUtil.Me(a[g], b));
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
									c += (0 < d ? ',' : '') + CastUtil.Me(a[d], b);
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
								c += b + f + ' : ' + CastUtil.Me(a[f], b));
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
							if (f == b || CastUtil.Ij(f, b))
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
					case number2:
						return 'boolean' == typeof a;
					case object2:
						return null != a;
					case number1:
						return 'number' == typeof a;
					case object1:
						return 'number' == typeof a ? (a | 0) === a : false;
					case String:
						return 'string' == typeof a;
					default:
						if (null != a)
							if ('function' == typeof b) {
								if (CastUtil.Kn(a, b))
									return true;
							}
							else {
								if ('object' == typeof b && CastUtil.Mn(b) && a instanceof b)
									return true;
							}
						else
							return false;
						return b == object3 && null != a.b || b == object4 && null != a.Tf ? true : null != a.Hb ? basObject[a.Hb] == b : false;
				}
			}

			static Kn(a, b) {
				return a instanceof b ? true : b.Jj ? CastUtil.Ij(CastUtil.jn(a), b) : false;
			}

			static I(a, b) {
				if (null == a || CastUtil.Ln(a, b))
					return a;
				throw GlobalError.C('Cannot cast ' + StringOpsInt.Fe(a) + ' to ' + StringOpsInt.Fe(b));
			}

			static Kj(a) {
				a = CastUtil.On.call(a).slice(8, -1);
				return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a ? null : a;
			}

			static Mn(a) {
				return null != CastUtil.Kj(a);
			}

			static Nn(a) {
				return globalScope[a];
			}
		}

		class PlayerActivityManager {
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
					let b = new PlayerActivityAction;
					b.input = a;
					this.yg(b);
				}
			}

			Fa(a) {
				var b = a.code;
				b = ConnectionConstants.localStorageUtilInst.lsPlayerKeys.v().v(b);
				null != b && (a.preventDefault(),
					this.mq(b));
			}

			kd(a) {
				a = ConnectionConstants.localStorageUtilInst.lsPlayerKeys.v().v(a.code);
				null != a && this.bq(a);
			}

			mq(a) {
				this.Pc.has(a) || (this.Pc.add(a),
					this.A(),
					FunctionRunner2.i(this.ul, a));
			}

			bq(a) {
				this.Pc.delete(a) && this.A();
			}

			wl() {
				if (null != this.yg && 0 != this.kg) {
					this.Pc.clear();
					this.kg = 0;
					let a = new PlayerActivityAction;
					a.input = 0;
					this.yg(a);
				}
			}
		}

		class WebserverApiOps {
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
				return WebserverApiOps.lm(a, 'GET', b, null);
			}

			static Lk(a) {
				return WebserverApiOps.v(a, 'json').then(function (b) {
					let c = b.error;
					if (null != c)
						throw GlobalError.C(c);
					return b.data;
				});
			}

			static Oq(a, b, c) {
				return WebserverApiOps.lm(a, 'POST', 'json', b, c);
			}

			static Vl(a, b, c) {
				return WebserverApiOps.Oq(a, b, c).then(function (d) {
					let e = d.error;
					if (null != e)
						throw GlobalError.C(e);
					return d.data;
				});
			}
		}

		class ConnectingContainer {
			constructor() {
				this.f = ViewUtil.Ia(ConnectingContainer.htmlContents);
				let a = ViewUtil.Ba(this.f);
				this.Kc = a.get('log');
				this.cont_cancelBtn = a.get('cancel');
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

		class TimeoutUtil {
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

		class CheckSyncAction extends Action {
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

		class SyncChangeAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && this.fh != b.Ud && (b.Ud = this.fh,
					FunctionRunner2.i(a.Ol, b));
			}

			wa(a) {
				a.m(this.fh ? 1 : 0);
			}

			xa(a) {
				this.fh = 0 != a.F();
			}

			static pa(a) {
				let b = new SyncChangeAction;
				b.fh = a;
				return b;
			}
		}

		class AnnouncementAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				0 == this.R && FunctionRunner5.i(a.qm, this.$c, this.color, this.style, this.Cn);
			}

			wa(a) {
				a.oc(StringOpsSubstr.Xc(this.$c, 1E3));
				a.P(this.color);
				a.m(this.style);
				a.m(this.Cn);
			}

			xa(a) {
				this.$c = a.kc();
				if (1E3 < this.$c.length)
					throw GlobalError.C('message too long');
				this.color = a.N();
				this.style = a.F();
				this.Cn = a.F();
			}
		}

		class AutoAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					for (var b = a.getFullPlayerById(this.R), c = a.K, d = [], e = 0, f = 0, g = 0; g < c.length;) {
						let h = c[g];
						++g;
						h.fa == Team.spec && d.push(h);
						h.fa == Team.red ? ++e : h.fa == Team.blue && ++f;
					}
					c = d.length;
					0 != c && (f == e ? 2 > c || (a.Yf(b, d[0], Team.red),
						a.Yf(b, d[1], Team.blue)) : a.Yf(b, d[0], f > e ? Team.red : Team.blue));
				}
			}

			wa() {
			}

			xa() {
			}
		}

		class SetLimitsAction extends Action {
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
				let c = new SetLimitsAction;
				c.Bj = a;
				c.newValue = b;
				return c;
			}
		}

		class GiveAdminAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					var b = a.getFullPlayerById(this.R)
						,
						c = a.getFullPlayerById(this.Vd);
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
				let c = new GiveAdminAction;
				c.Vd = a;
				c.eh = b;
				return c;
			}
		}

		class CmdAvatarAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				a = a.getFullPlayerById(this.R);
				null != a && (a.Zb = this.ac);
			}

			wa(a) {
				a.Fb(this.ac);
			}

			xa(a) {
				this.ac = a.Bb();
				null != this.ac && (this.ac = StringOpsSubstr.Xc(this.ac, 2));
			}

			static pa(a) {
				let b = new CmdAvatarAction;
				b.ac = a;
				return b;
			}
		}

		class MoveToTeamAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.Vd);
				if (null != b) {
					var c = a.getFullPlayerById(this.R)
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
				this.vj = 1 == a ? Team.red : 2 == a ? Team.blue : Team.spec;
			}

			static pa(a, b) {
				let c = new MoveToTeamAction;
				c.Vd = a;
				c.vj = b;
				return c;
			}
		}

		class SetStadiumAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					var b = a.getFullPlayerById(this.R);
					null == a.M && (a.T = this.Yd,
					null != a.Si && a.Si(b, this.Yd));
				}
			}

			wa(a) {
				var b = StreamWriter.ka();
				this.Yd.ga(b);
				b = pako.deflateRaw(b.Wb());
				a.Xb(b.byteLength);
				a.Lb(b);
			}

			xa(a) {
				a = pako.inflateRaw(a.tb(a.Sb()));
				this.Yd = Stadium.ma(new StreamReader(new DataView(a.buffer, a.byteOffset, a.byteLength)));
			}

			static pa(a) {
				let b = new SetStadiumAction;
				b.Yd = a;
				return b;
			}
		}

		class SetTeamColorsAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				a.Pb(this.R) && this.fa != Team.spec && (a.mb[this.fa.ba] = this.Zg);
			}

			wa(a) {
				a.m(this.fa.ba);
				this.Zg.ga(a);
			}

			xa(a) {
				let b = a.wf();
				this.fa = 1 == b ? Team.red : 2 == b ? Team.blue : Team.spec;
				this.Zg = new TeamColors;
				this.Zg.ma(a);
			}
		}

		class LockTeamsAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
					var b = a.Ac;
					a.Vc = this.newValue;
					b != this.newValue && FunctionRunner3.i(a.onTeamsLockedFun, a.getFullPlayerById(this.R), this.newValue);
				}
			}

			wa(a) {
				a.m(this.newValue ? 1 : 0);
			}

			xa(a) {
				this.newValue = 0 != a.F();
			}

			static pa(a) {
				let b = new LockTeamsAction;
				b.newValue = a;
				return b;
			}
		}

		class PlayerJoinAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = new FullPlayer;
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
				let e = new PlayerJoinAction;
				e.Y = a;
				e.name = b;
				e.oj = c;
				e.Zb = d;
				return e;
			}
		}

		class AvatarOverrideAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				a = a.getFullPlayerById(this.Ge);
				null != a && 0 == this.R && (a.Td = this.ac);
			}

			wa(a) {
				a.Fb(this.ac);
				a.P(this.Ge);
			}

			xa(a) {
				this.ac = a.Bb();
				this.Ge = a.N();
				null != this.ac && (this.ac = StringOpsSubstr.Xc(this.ac, 2));
			}
		}

		class GamePauseAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.M;
				if (null != b && a.Pb(this.R)) {
					var c = a.getFullPlayerById(this.R)
						,
						d = 120 == b.Ra
						,
						e = 0 < b.Ra;
					this.Mf ? b.Ra = 120 : 120 == b.Ra && (b.Ra = 119);
					d != this.Mf && FunctionRunner4.i(a.Il, c, this.Mf, e);
				}
			}

			wa(a) {
				a.m(this.Mf ? 1 : 0);
			}

			xa(a) {
				this.Mf = 0 != a.F();
			}
		}

		class ChatAction extends Action {
			constructor() {
				super();
			}

			wn(a) {
				if (null != a.Jq) {
					let b = a.getFullPlayerById(this.R);
					return null == b ? false : a.Jq(b, this.$c);
				}
				return true;
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && FunctionRunner3.i(a.Nl, b, this.$c);
			}

			wa(a) {
				a.oc(StringOpsSubstr.Xc(this.$c, 140));
			}

			xa(a) {
				this.$c = a.kc();
				if (140 < this.$c.length)
					throw GlobalError.C('message too long');
			}
		}

		class PlayerActivityAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
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

		class ChatIndicatorAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				let b = a.getFullPlayerById(this.R);
				null != b && FunctionRunner3.i(a.Sl, b, this.Cj);
			}

			wa(a) {
				a.m(this.Cj);
			}

			xa(a) {
				this.Cj = a.F();
			}

			static pa(a) {
				let b = new ChatIndicatorAction;
				b.Cj = a;
				return b;
			}
		}

		class KickAction extends Action {
			constructor() {
				Action.zb = true;
				super();
				Action.zb = false;
				this.Za();
			}

			Za() {
				this.Xg = false;
				super.Za();
			}

			apply(a) {
				if (0 != this.Y && a.Pb(this.R)) {
					var b = a.getFullPlayerById(this.Y);
					if (null != b) {
						var c = a.getFullPlayerById(this.R);
						class_O.remove(a.K, b);
						null != a.M && class_O.remove(a.M.va.H, b.J);
						FunctionRunner5.i(a.Ql, b, this.pd, this.Xg, c);
					}
				}
			}

			wa(a) {
				null != this.pd && (this.pd = StringOpsSubstr.Xc(this.pd, 100));
				a.P(this.Y);
				a.Fb(this.pd);
				a.m(this.Xg ? 1 : 0);
			}

			xa(a) {
				this.Y = a.N();
				this.pd = a.Bb();
				this.Xg = 0 != a.F();
				if (null != this.pd && 100 < this.pd.length)
					throw GlobalError.C('string too long');
			}

			static pa(a, b, c) {
				let d = new KickAction;
				d.Y = a;
				d.pd = b;
				d.Xg = c;
				return d;
			}
		}

		class ReorderPlayersAction extends Action {
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

		class SetDiscPropertiesAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				if (0 == this.R) {
					var b = a.M;
					if (null != b) {
						if (this.on) {
							a = a.getFullPlayerById(this.Ge);
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

		class KickRateAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				a.Pb(this.R) && a.Rr(a.getFullPlayerById(this.R), this.min, this.rate, this.mj);
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
				let d = new KickRateAction;
				d.min = a;
				d.rate = b;
				d.mj = c;
				return d;
			}
		}

		class GameStartAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				a.Pb(this.R) && a.ds(a.getFullPlayerById(this.R));
			}

			wa() {
			}

			xa() {
			}
		}

		class GameStopAction extends Action {
			constructor() {
				super();
			}

			apply(a) {
				if (a.Pb(this.R)) {
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

		class UpdatePlayerPingsAction extends Action {
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
				let b = new UpdatePlayerPingsAction
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

		class GlobalError extends Error {
			constructor(a, b, c) {
				super(a);
				this.message = a;
				this.Lj = null != c ? c : this;
			}

			Gb() {
				return this.Lj;
			}

			static Mb(a) {
				return a instanceof GlobalError ? a : a instanceof Error ? new GlobalError(a.message, null, a) : new class_Mb_Error(a, null, a);
			}

			static C(a) {
				return a instanceof GlobalError ? a.Lj : a instanceof Error ? a : new class_Mb_Error(a);
			}
		}

		class class_Mb_Error extends GlobalError {
			constructor(a, b, c) {
				super(String(a), b, c);
				this.value = a;
			}

			Gb() {
				return this.value;
			}
		}

		class FunctionRunner2 {
			static i(a, b) {
				null != a && a(b);
			}
		}

		class CountriesUtil {
		}

		class DummyPoint {
			constructor(a, b) {
				this.x = a;
				this.y = b;
			}
		}

		class PingItem {
			constructor() {
			}
		}

		class CounterUtil {
		}

		class ConnectionConstants {
		}

		class FunctionRunner3 {
			static i(a, b, c) {
				null != a && a(b, c);
			}
		}

		class ChannelUtil {
		}

		class DialogError {
			constructor(a) {
				this.dialogErrorMessage = a;
			}
		}

		class class_Cast1 {
		}

		class ErrorIncompatible {
			constructor(a) {
				this.Rd = a;
			}
		}

		class FunctionRunner5 {
			static i(a, b, c, d, e) {
				null != a && a(b, c, d, e);
			}
		}

		class class_Cast2 {
		}

		class RoomInfoWithGeo {
			constructor() {
			}
		}

		var basObject = basObject || {};
		var xFun;
		RegexUtil.b = true;
		Object.assign(RegexUtil.prototype, {
			g: RegexUtil
		});
		class_O.b = true;
		Math.b = true;
		class_zc.b = true;
		StringOpsInt.b = true;
		class_ba.b = true;
		StringOpsSubstr.b = true;
		class_vc.b = true;
		Object.assign(class_vc.prototype, {
			g: class_vc
		});
		basObject['bas.basnet.FailReason'] = {
			Tf: true,
			$d: null,
			Je: {
				wc: 'PeerFailed',
				pb: 0,
				Hb: 'bas.basnet.FailReason',
				toString: function_ja
			},
			Ke: (xFun = function (a) {
				return {
					pb: 1,
					code: a,
					Hb: 'bas.basnet.FailReason',
					toString: function_ja
				};
			}
				,
				xFun.wc = 'Rejected',
				xFun.Le = ['code'],
				xFun),
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
		var basnetFailReasonVar = basObject['bas.basnet.FailReason'];
		basnetFailReasonVar.$d = [basnetFailReasonVar.Je, basnetFailReasonVar.Ke, basnetFailReasonVar.Ie, basnetFailReasonVar.Error];
		ConnectingManager.b = true;
		Object.assign(ConnectingManager.prototype, {
			g: ConnectingManager
		});
		class_Cast3.b = true;
		class_Cast3.uh = true;
		Connection2.b = true;
		Connection2.qd = [class_Cast3];
		Object.assign(Connection2.prototype, {
			g: Connection2
		});
		basObject['bas.basnet.ConnectionRequestResponse'] = {
			Tf: true,
			$d: null,
			Gj: {
				wc: 'Accept',
				pb: 0,
				Hb: 'bas.basnet.ConnectionRequestResponse',
				toString: function_ja
			},
			Rf: (xFun = function (a) {
				return {
					pb: 1,
					reason: a,
					Hb: 'bas.basnet.ConnectionRequestResponse',
					toString: function_ja
				};
			}
				,
				xFun.wc = 'Reject',
				xFun.Le = ['reason'],
				xFun)
		};
		var basnetConnectionRequestResponseVar = basObject['bas.basnet.ConnectionRequestResponse'];
		basnetConnectionRequestResponseVar.$d = [basnetConnectionRequestResponseVar.Gj, basnetConnectionRequestResponseVar.Rf];
		WebSocketManager.b = true;
		Object.assign(WebSocketManager.prototype, {
			g: WebSocketManager
		});
		CandidateUtil.b = true;
		Connection1.b = true;
		Object.assign(Connection1.prototype, {
			g: Connection1
		});
		StreamReader.b = true;
		Object.assign(StreamReader.prototype, {
			g: StreamReader
		});
		StreamWriter.b = true;
		Object.assign(StreamWriter.prototype, {
			g: StreamWriter
		});
		AuthUtil.b = true;
		Object.assign(AuthUtil.prototype, {
			g: AuthUtil
		});
		GrecaptchaLoader.b = true;
		ScrollUtil.b = true;
		ReplayDownloader.b = true;
		ScoreItem.b = true;
		Object.assign(ScoreItem.prototype, {
			g: ScoreItem
		});
		ViewUtil.b = true;
		IDBUtil.b = true;
		TimeoutUtil.b = true;
		Action.b = true;
		Object.assign(Action.prototype, {
			g: Action
		});
		ImportantActions.b = true;
		Object.assign(ImportantActions.prototype, {
			g: ImportantActions
		});
		Room1.b = true;
		Object.assign(Room1.prototype, {
			g: Room1
		});
		CheckSyncAction.b = true;
		CheckSyncAction.ja = Action;
		Object.assign(CheckSyncAction.prototype, {
			g: CheckSyncAction
		});
		class_Cast2.b = true;
		class_Cast2.Jj = true;
		Object.assign(class_Cast2.prototype, {
			g: class_Cast2
		});
		RoomPingUtil.b = true;
		Object.assign(RoomPingUtil.prototype, {
			g: RoomPingUtil
		});
		PingItem.b = true;
		Object.assign(PingItem.prototype, {
			g: PingItem
		});
		Replay.b = true;
		Object.assign(Replay.prototype, {
			g: Replay
		});
		class_Cast1.b = true;
		class_Cast1.Jj = true;
		CounterUtil.b = true;
		Room2.b = true;
		Room2.ja = Room1;
		Object.assign(Room2.prototype, {
			g: Room2
		});
		var iaVar = basObject['bas.marf.net.ConnFailReason'] = {
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
			Ke: (xFun = function (a) {
				return {
					pb: 2,
					reason: a,
					Hb: 'bas.marf.net.ConnFailReason',
					toString: function_ja
				};
			}
				,
				xFun.wc = 'Rejected',
				xFun.Le = ['reason'],
				xFun),
			Qf: (xFun = function (a) {
				return {
					pb: 3,
					description: a,
					Hb: 'bas.marf.net.ConnFailReason',
					toString: function_ja
				};
			}
				,
				xFun.wc = 'Other',
				xFun.Le = ['description'],
				xFun)
		};
		iaVar.$d = [iaVar.Ie, iaVar.Je, iaVar.Ke, iaVar.Qf];
		JoinedRoom.b = true;
		JoinedRoom.ja = Room2;
		Object.assign(JoinedRoom.prototype, {
			g: JoinedRoom
		});
		HostRoom.b = true;
		HostRoom.ja = Room2;
		Object.assign(HostRoom.prototype, {
			g: HostRoom
		});
		PlayerConnection.b = true;
		Object.assign(PlayerConnection.prototype, {
			g: PlayerConnection
		});
		PlayerPingUtil.b = true;
		Object.assign(PlayerPingUtil.prototype, {
			g: PlayerPingUtil
		});
		ChannelUtil.b = true;
		ErrorIncompatible.b = true;
		Object.assign(ErrorIncompatible.prototype, {
			g: ErrorIncompatible
		});
		ReplayRoom.b = true;
		ReplayRoom.ja = Room2;
		Object.assign(ReplayRoom.prototype, {
			g: ReplayRoom
		});
		KeyFramesUtil.b = true;
		Object.assign(KeyFramesUtil.prototype, {
			g: KeyFramesUtil
		});
		DummyPoint.b = true;
		Object.assign(DummyPoint.prototype, {
			g: DummyPoint
		});
		Point.b = true;
		Object.assign(Point.prototype, {
			g: Point
		});
		WebserverApiOps.b = true;
		FunctionRunner1.b = true;
		FunctionRunner2.b = true;
		FunctionRunner3.b = true;
		FunctionRunner4.b = true;
		FunctionRunner5.b = true;
		TimestampUtil.b = true;
		Object.assign(TimestampUtil.prototype, {
			g: TimestampUtil
		});
		RoomLinkUtil.b = true;
		ChatHandler.b = true;
		Object.assign(ChatHandler.prototype, {
			g: ChatHandler
		});
		CountriesUtil.b = true;
		PlayableRoomManager.b = true;
		Object.assign(PlayableRoomManager.prototype, {
			g: PlayableRoomManager
		});
		InsideRoomManager.b = true;
		Object.assign(InsideRoomManager.prototype, {
			g: InsideRoomManager
		});
		PlayerActivityManager.b = true;
		Object.assign(PlayerActivityManager.prototype, {
			g: PlayerActivityManager
		});
		GeoLocation.b = true;
		Object.assign(GeoLocation.prototype, {
			g: GeoLocation
		});
		LocalStorageUtil.b = true;
		Object.assign(LocalStorageUtil.prototype, {
			g: LocalStorageUtil
		});
		LocalStorageInitializer.b = true;
		LocalStorageItem.b = true;
		Object.assign(LocalStorageItem.prototype, {
			g: LocalStorageItem
		});
		ControlsUtil.b = true;
		Object.assign(ControlsUtil.prototype, {
			g: ControlsUtil
		});
		ConnectionConstants.b = true;
		RoomInfoWithGeo.b = true;
		Object.assign(RoomInfoWithGeo.prototype, {
			g: RoomInfoWithGeo
		});
		HaxballClientManager.b = true;
		ContainerUtil.b = true;
		ReplayManager.b = true;
		Object.assign(ReplayManager.prototype, {
			g: ReplayManager
		});
		RoomInfo.b = true;
		Object.assign(RoomInfo.prototype, {
			g: RoomInfo
		});
		RoomDataParser.b = true;
		IdbStadiumUtil.b = true;
		AudioUtil.b = true;
		Object.assign(AudioUtil.prototype, {
			g: AudioUtil
		});
		AudioContextUtil.b = true;
		Object.assign(AudioContextUtil.prototype, {
			g: AudioContextUtil
		});
		Disc.b = true;
		Object.assign(Disc.prototype, {
			g: Disc
		});
		Game.b = true;
		Game.qd = [class_Cast1];
		Object.assign(Game.prototype, {
			g: Game
		});
		Goal.b = true;
		Object.assign(Goal.prototype, {
			g: Goal
		});
		StadiumPlayerPhysics.b = true;
		Object.assign(StadiumPlayerPhysics.prototype, {
			g: StadiumPlayerPhysics
		});
		DialogError.b = true;
		Object.assign(DialogError.prototype, {
			g: DialogError
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
		RoomState.b = true;
		RoomState.qd = [class_Cast1, class_Cast2];
		Object.assign(RoomState.prototype, {
			g: RoomState
		});
		FullPlayer.b = true;
		FullPlayer.qd = [class_Cast1];
		Object.assign(FullPlayer.prototype, {
			g: FullPlayer
		});
		SyncChangeAction.b = true;
		SyncChangeAction.ja = Action;
		Object.assign(SyncChangeAction.prototype, {
			g: SyncChangeAction
		});
		AnnouncementAction.b = true;
		AnnouncementAction.ja = Action;
		Object.assign(AnnouncementAction.prototype, {
			g: AnnouncementAction
		});
		AutoAction.b = true;
		AutoAction.ja = Action;
		Object.assign(AutoAction.prototype, {
			g: AutoAction
		});
		SetLimitsAction.b = true;
		SetLimitsAction.ja = Action;
		Object.assign(SetLimitsAction.prototype, {
			g: SetLimitsAction
		});
		GiveAdminAction.b = true;
		GiveAdminAction.ja = Action;
		Object.assign(GiveAdminAction.prototype, {
			g: GiveAdminAction
		});
		CmdAvatarAction.b = true;
		CmdAvatarAction.ja = Action;
		Object.assign(CmdAvatarAction.prototype, {
			g: CmdAvatarAction
		});
		MoveToTeamAction.b = true;
		MoveToTeamAction.ja = Action;
		Object.assign(MoveToTeamAction.prototype, {
			g: MoveToTeamAction
		});
		SetStadiumAction.b = true;
		SetStadiumAction.ja = Action;
		Object.assign(SetStadiumAction.prototype, {
			g: SetStadiumAction
		});
		SetTeamColorsAction.b = true;
		SetTeamColorsAction.ja = Action;
		Object.assign(SetTeamColorsAction.prototype, {
			g: SetTeamColorsAction
		});
		LockTeamsAction.b = true;
		LockTeamsAction.ja = Action;
		Object.assign(LockTeamsAction.prototype, {
			g: LockTeamsAction
		});
		PlayerJoinAction.b = true;
		PlayerJoinAction.ja = Action;
		Object.assign(PlayerJoinAction.prototype, {
			g: PlayerJoinAction
		});
		AvatarOverrideAction.b = true;
		AvatarOverrideAction.ja = Action;
		Object.assign(AvatarOverrideAction.prototype, {
			g: AvatarOverrideAction
		});
		GamePauseAction.b = true;
		GamePauseAction.ja = Action;
		Object.assign(GamePauseAction.prototype, {
			g: GamePauseAction
		});
		ChatAction.b = true;
		ChatAction.ja = Action;
		Object.assign(ChatAction.prototype, {
			g: ChatAction
		});
		PlayerActivityAction.b = true;
		PlayerActivityAction.ja = Action;
		Object.assign(PlayerActivityAction.prototype, {
			g: PlayerActivityAction
		});
		ChatIndicatorAction.b = true;
		ChatIndicatorAction.ja = Action;
		Object.assign(ChatIndicatorAction.prototype, {
			g: ChatIndicatorAction
		});
		ActionManager.b = true;
		KickAction.b = true;
		KickAction.ja = Action;
		Object.assign(KickAction.prototype, {
			g: KickAction
		});
		ReorderPlayersAction.b = true;
		ReorderPlayersAction.ja = Action;
		Object.assign(ReorderPlayersAction.prototype, {
			g: ReorderPlayersAction
		});
		SetDiscPropertiesAction.b = true;
		SetDiscPropertiesAction.ja = Action;
		Object.assign(SetDiscPropertiesAction.prototype, {
			g: SetDiscPropertiesAction
		});
		KickRateAction.b = true;
		KickRateAction.ja = Action;
		Object.assign(KickRateAction.prototype, {
			g: KickRateAction
		});
		GameStartAction.b = true;
		GameStartAction.ja = Action;
		Object.assign(GameStartAction.prototype, {
			g: GameStartAction
		});
		GameStopAction.b = true;
		GameStopAction.ja = Action;
		Object.assign(GameStopAction.prototype, {
			g: GameStopAction
		});
		UpdatePlayerPingsAction.b = true;
		UpdatePlayerPingsAction.ja = Action;
		Object.assign(UpdatePlayerPingsAction.prototype, {
			g: UpdatePlayerPingsAction
		});
		DynamicDisc.b = true;
		DynamicDisc.qd = [class_Cast1];
		Object.assign(DynamicDisc.prototype, {
			g: DynamicDisc
		});
		Joint.b = true;
		Joint.qd = [class_Cast1];
		Object.assign(Joint.prototype, {
			g: Joint
		});
		GameObjects.b = true;
		GameObjects.qd = [class_Cast1];
		Object.assign(GameObjects.prototype, {
			g: GameObjects
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
		GameCanvas.b = true;
		Object.assign(GameCanvas.prototype, {
			g: GameCanvas
		});
		BigAnimatedText.b = true;
		Object.assign(BigAnimatedText.prototype, {
			g: BigAnimatedText
		});
		BigTextManager.b = true;
		Object.assign(BigTextManager.prototype, {
			g: BigTextManager
		});
		PlayerDiscCanvasItem.b = true;
		Object.assign(PlayerDiscCanvasItem.prototype, {
			g: PlayerDiscCanvasItem
		});
		ChangeLocationDialogContainer.b = true;
		Object.assign(ChangeLocationDialogContainer.prototype, {
			g: ChangeLocationDialogContainer
		});
		ChatboxContainer.b = true;
		Object.assign(ChatboxContainer.prototype, {
			g: ChatboxContainer
		});
		Mention.b = true;
		Object.assign(Mention.prototype, {
			g: Mention
		});
		ChooseNickContainer.b = true;
		Object.assign(ChooseNickContainer.prototype, {
			g: ChooseNickContainer
		});
		ConnectingContainer.b = true;
		Object.assign(ConnectingContainer.prototype, {
			g: ConnectingContainer
		});
		CreateRoomContainer.b = true;
		Object.assign(CreateRoomContainer.prototype, {
			g: CreateRoomContainer
		});
		DisconnectedContainer.b = true;
		Object.assign(DisconnectedContainer.prototype, {
			g: DisconnectedContainer
		});
		GameStateContainer.b = true;
		Object.assign(GameStateContainer.prototype, {
			g: GameStateContainer
		});
		GameTimerContainer.b = true;
		Object.assign(GameTimerContainer.prototype, {
			g: GameTimerContainer
		});
		SoundSliderContainer.b = true;
		Object.assign(SoundSliderContainer.prototype, {
			g: SoundSliderContainer
		});
		GameContainer.b = true;
		Object.assign(GameContainer.prototype, {
			g: GameContainer
		});
		KickDialogContainer.b = true;
		Object.assign(KickDialogContainer.prototype, {
			g: KickDialogContainer
		});
		LeaveRoomDialogContainer.b = true;
		Object.assign(LeaveRoomDialogContainer.prototype, {
			g: LeaveRoomDialogContainer
		});
		PickStadiumDialogContainer.b = true;
		Object.assign(PickStadiumDialogContainer.prototype, {
			g: PickStadiumDialogContainer
		});
		PingGraph.b = true;
		Object.assign(PingGraph.prototype, {
			g: PingGraph
		});
		PlayerDialogContainer.b = true;
		Object.assign(PlayerDialogContainer.prototype, {
			g: PlayerDialogContainer
		});
		PlayerListItem.b = true;
		Object.assign(PlayerListItem.prototype, {
			g: PlayerListItem
		});
		PlayerListContainer.b = true;
		Object.assign(PlayerListContainer.prototype, {
			g: PlayerListContainer
		});
		CaptchaDialogContainer.b = true;
		Object.assign(CaptchaDialogContainer.prototype, {
			g: CaptchaDialogContainer
		});
		ReplayControlsContainer.b = true;
		Object.assign(ReplayControlsContainer.prototype, {
			g: ReplayControlsContainer
		});
		RoomLinkContainer.b = true;
		Object.assign(RoomLinkContainer.prototype, {
			g: RoomLinkContainer
		});
		RoomItem.b = true;
		Object.assign(RoomItem.prototype, {
			g: RoomItem
		});
		RoomListContainer.b = true;
		Object.assign(RoomListContainer.prototype, {
			g: RoomListContainer
		});
		GameNoticeContainer.b = true;
		Object.assign(GameNoticeContainer.prototype, {
			g: GameNoticeContainer
		});
		RoomPasswordContainer.b = true;
		Object.assign(RoomPasswordContainer.prototype, {
			g: RoomPasswordContainer
		});
		RoomMenuContainer.b = true;
		Object.assign(RoomMenuContainer.prototype, {
			g: RoomMenuContainer
		});
		SettingsDialogContainer.b = true;
		Object.assign(SettingsDialogContainer.prototype, {
			g: SettingsDialogContainer
		});
		SimpleDialogContainer.b = true;
		Object.assign(SimpleDialogContainer.prototype, {
			g: SimpleDialogContainer
		});
		StatsContainer.b = true;
		Object.assign(StatsContainer.prototype, {
			g: StatsContainer
		});
		UnsupportedBrowserContainer.b = true;
		Object.assign(UnsupportedBrowserContainer.prototype, {
			g: UnsupportedBrowserContainer
		});
		GlobalError.b = true;
		GlobalError.ja = Error;
		Object.assign(GlobalError.prototype, {
			g: GlobalError
		});
		class_Mb_Error.b = true;
		class_Mb_Error.ja = GlobalError;
		Object.assign(class_Mb_Error.prototype, {
			g: class_Mb_Error
		});
		class_Cc_Unused.b = true;
		Object.assign(class_Cc_Unused.prototype, {
			g: class_Cc_Unused
		});
		CastUtil.b = true;
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
		var object1 = {}
			,
			object2 = {}
			,
			number1 = Number
			,
			number2 = Boolean
			,
			object3 = {}
			,
			object4 = {};
		Team.spec = new Team(0, 16777215, 0, -1, 'Spectators', 't-spec', 0, 0);
		Team.red = new Team(1, 15035990, -1, 8, 'Red', 't-red', 15035990, 2);
		Team.blue = new Team(2, 5671397, 1, 16, 'Blue', 't-blue', 625603, 4);
		Team.spec.enemyTeam = Team.spec;
		Team.red.enemyTeam = Team.blue;
		Team.blue.enemyTeam = Team.red;
		CastUtil.On = {}.toString;
		Connection2.mediaConstraints = {
			mandatory: {
				OfferToReceiveAudio: false,
				OfferToReceiveVideo: false
			}
		};
		AuthUtil.EcKeyImportParams = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};
		AuthUtil.Im = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};
		ScrollUtil.scrollbarHandlers = ['click-rail', 'drag-thumb', 'wheel', 'touch'];
		Action.zb = false;
		Action.allActionsMap = new Map;
		Action.actionCounter = 0;
		Room1.zb = false;
		CheckSyncAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		CounterUtil.frameCount = 0;
		ChannelUtil.channels = [{
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
		WebserverApiOps.contentType = 'application/x-www-form-urlencoded';
		CountriesUtil.codesArray = ['Afghanistan', 'AF', 33.3, 65.1, 'Albania', 'AL', 41.1, 20.1, 'Algeria', 'DZ', 28, 1.6, 'American Samoa', 'AS', -14.2, -170.1, 'Andorra', 'AD', 42.5, 1.6, 'Angola', 'AO', -11.2, 17.8, 'Anguilla', 'AI', 18.2, -63, 'Antigua and Barbuda', 'AG', 17, -61.7, 'Argentina', 'AR', -34.5, -58.4, 'Armenia', 'AM', 40, 45, 'Aruba', 'AW', 12.5, -69.9, 'Australia', 'AU', -25.2, 133.7, 'Austria', 'AT', 47.5, 14.5, 'Azerbaijan', 'AZ', 40.1, 47.5, 'Bahamas', 'BS', 25, -77.3, 'Bahrain', 'BH', 25.9, 50.6, 'Bangladesh', 'BD', 23.6, 90.3, 'Barbados', 'BB', 13.1, -59.5, 'Belarus', 'BY', 53.7, 27.9, 'Belgium', 'BE', 50.5, 4.4, 'Belize', 'BZ', 17.1, -88.4, 'Benin', 'BJ', 9.3, 2.3, 'Bermuda', 'BM', 32.3, -64.7, 'Bhutan', 'BT', 27.5, 90.4, 'Bolivia', 'BO', -16.2, -63.5, 'Bosnia and Herzegovina', 'BA', 43.9, 17.6, 'Botswana', 'BW', -22.3, 24.6, 'Bouvet Island', 'BV', -54.4, 3.4, 'Brazil', 'BR', -14.2, -51.9, 'British Indian Ocean Territory', 'IO', -6.3, 71.8, 'British Virgin Islands', 'VG', 18.4, -64.6, 'Brunei', 'BN', 4.5, 114.7, 'Bulgaria', 'BG', 42.7, 25.4, 'Burkina Faso', 'BF', 12.2, -1.5, 'Burundi', 'BI', -3.3, 29.9, 'Cambodia', 'KH', 12.5, 104.9, 'Cameroon', 'CM', 7.3, 12.3, 'Canada', 'CA', 56.1, -106.3, 'Cape Verde', 'CV', 16, -24, 'Cayman Islands', 'KY', 19.5, -80.5, 'Central African Republic', 'CF', 6.6, 20.9, 'Chad', 'TD', 15.4, 18.7, 'Chile', 'CL', -35.6, -71.5, 'China', 'CN', 35.8, 104.1, 'Christmas Island', 'CX', -10.4, 105.6, 'Colombia', 'CO', 4.5, -74.2, 'Comoros', 'KM', -11.8, 43.8, 'Congo [DRC]', 'CD', -4, 21.7, 'Congo [Republic]', 'CG', -.2, 15.8, 'Cook Islands', 'CK', -21.2, -159.7, 'Costa Rica', 'CR', 9.7, -83.7, 'Croatia', 'HR', 45.1, 15.2, 'Cuba', 'CU', 21.5, -77.7, 'Cyprus', 'CY', 35.1, 33.4, 'Czech Republic', 'CZ', 49.8, 15.4, 'C\u00f4te d\'Ivoire', 'CI', 7.5, -5.5, 'Denmark', 'DK', 56.2, 9.5, 'Djibouti', 'DJ', 11.8, 42.5, 'Dominica', 'DM', 15.4, -61.3, 'Dominican Republic', 'DO', 18.7, -70.1, 'Ecuador', 'EC', -1.8, -78.1, 'Egypt', 'EG', 26.8, 30.8, 'El Salvador', 'SV', 13.7, -88.8, 'England', 'ENG', 55.3, -3.4, 'Equatorial Guinea', 'GQ', 1.6, 10.2, 'Eritrea', 'ER', 15.1, 39.7, 'Estonia', 'EE', 58.5, 25, 'Ethiopia', 'ET', 9.1, 40.4, 'Faroe Islands', 'FO', 61.8, -6.9, 'Fiji', 'FJ', -16.5, 179.4, 'Finland', 'FI', 61.9, 25.7, 'France', 'FR', 46.2, 2.2, 'French Guiana', 'GF', 3.9, -53.1, 'French Polynesia', 'PF', -17.6, -149.4, 'Gabon', 'GA', -.8, 11.6, 'Gambia', 'GM', 13.4, -15.3, 'Georgia', 'GE', 42.3, 43.3, 'Germany', 'DE', 51.1, 10.4, 'Ghana', 'GH', 7.9, -1, 'Gibraltar', 'GI', 36.1, -5.3, 'Greece', 'GR', 39, 21.8, 'Greenland', 'GL', 71.7, -42.6, 'Grenada', 'GD', 12.2, -61.6, 'Guadeloupe', 'GP', 16.9, -62, 'Guam', 'GU', 13.4, 144.7, 'Guatemala', 'GT', 15.7, -90.2, 'Guinea', 'GN', 9.9, -9.6, 'Guinea-Bissau', 'GW', 11.8, -15.1, 'Guyana', 'GY', 4.8, -58.9, 'Haiti', 'HT', 18.9, -72.2, 'Honduras', 'HN', 15.1, -86.2, 'Hong Kong', 'HK', 22.3, 114.1, 'Hungary', 'HU', 47.1, 19.5, 'Iceland', 'IS', 64.9, -19, 'India', 'IN', 20.5, 78.9, 'Indonesia', 'ID', -.7, 113.9, 'Iran', 'IR', 32.4, 53.6, 'Iraq', 'IQ', 33.2, 43.6, 'Ireland', 'IE', 53.4, -8.2, 'Israel', 'IL', 31, 34.8, 'Italy', 'IT', 41.8, 12.5, 'Jamaica', 'JM', 18.1, -77.2, 'Japan', 'JP', 36.2, 138.2, 'Jordan', 'JO', 30.5, 36.2, 'Kazakhstan', 'KZ', 48, 66.9, 'Kenya', 'KE', -0, 37.9, 'Kiribati', 'KI', -3.3, -168.7, 'Kosovo', 'XK', 42.6, 20.9, 'Kuwait', 'KW', 29.3, 47.4, 'Kyrgyzstan', 'KG', 41.2, 74.7, 'Laos', 'LA', 19.8, 102.4, 'Latvia', 'LV', 56.8, 24.6, 'Lebanon', 'LB', 33.8, 35.8, 'Lesotho', 'LS', -29.6, 28.2, 'Liberia', 'LR', 6.4, -9.4, 'Libya', 'LY', 26.3, 17.2, 'Liechtenstein', 'LI', 47.1, 9.5, 'Lithuania', 'LT', 55.1, 23.8, 'Luxembourg', 'LU', 49.8, 6.1, 'Macau', 'MO', 22.1, 113.5, 'Macedonia [FYROM]', 'MK', 41.6, 21.7, 'Madagascar', 'MG', -18.7, 46.8, 'Malawi', 'MW', -13.2, 34.3, 'Malaysia', 'MY', 4.2, 101.9, 'Maldives', 'MV', 3.2, 73.2, 'Mali', 'ML', 17.5, -3.9, 'Malta', 'MT', 35.9, 14.3, 'Marshall Islands', 'MH', 7.1, 171.1, 'Martinique', 'MQ', 14.6, -61, 'Mauritania', 'MR', 21, -10.9, 'Mauritius', 'MU', -20.3, 57.5, 'Mayotte', 'YT', -12.8, 45.1, 'Mexico', 'MX', 23.6, -102.5, 'Micronesia', 'FM', 7.4, 150.5, 'Moldova', 'MD', 47.4, 28.3, 'Monaco', 'MC', 43.7, 7.4, 'Mongolia', 'MN', 46.8, 103.8, 'Montenegro', 'ME', 42.7, 19.3, 'Montserrat', 'MS', 16.7, -62.1, 'Morocco', 'MA', 31.7, -7, 'Mozambique', 'MZ', -18.6, 35.5, 'Myanmar [Burma]', 'MM', 21.9, 95.9, 'Namibia', 'NA', -22.9, 18.4, 'Nauru', 'NR', -.5, 166.9, 'Nepal', 'NP', 28.3, 84.1, 'Netherlands', 'NL', 52.1, 5.2, 'Netherlands Antilles', 'AN', 12.2, -69, 'New Caledonia', 'NC', -20.9, 165.6, 'New Zealand', 'NZ', -40.9, 174.8, 'Nicaragua', 'NI', 12.8, -85.2, 'Niger', 'NE', 17.6, 8, 'Nigeria', 'NG', 9, 8.6, 'Niue', 'NU', -19, -169.8, 'Norfolk Island', 'NF', -29, 167.9, 'North Korea', 'KP', 40.3, 127.5, 'Northern Mariana Islands', 'MP', 17.3, 145.3, 'Norway', 'NO', 60.4, 8.4, 'Oman', 'OM', 21.5, 55.9, 'Pakistan', 'PK', 30.3, 69.3, 'Palau', 'PW', 7.5, 134.5, 'Palestinian Territories', 'PS', 31.9, 35.2, 'Panama', 'PA', 8.5, -80.7, 'Papua New Guinea', 'PG', -6.3, 143.9, 'Paraguay', 'PY', -23.4, -58.4, 'Peru', 'PE', -9.1, -75, 'Philippines', 'PH', 12.8, 121.7, 'Pitcairn Islands', 'PN', -24.7, -127.4, 'Poland', 'PL', 51.9, 19.1, 'Portugal', 'PT', 39.3, -8.2, 'Puerto Rico', 'PR', 18.2, -66.5, 'Qatar', 'QA', 25.3, 51.1, 'Romania', 'RO', 45.9, 24.9, 'Russia', 'RU', 61.5, 105.3, 'Rwanda', 'RW', -1.9, 29.8, 'R\u00e9union', 'RE', -21.1, 55.5, 'Saint Helena', 'SH', -24.1, -10, 'Saint Kitts', 'KN', 17.3, -62.7, 'Saint Lucia', 'LC', 13.9, -60.9, 'Saint Pierre', 'PM', 46.9, -56.2, 'Saint Vincent', 'VC', 12.9, -61.2, 'Samoa', 'WS', -13.7, -172.1, 'San Marino', 'SM', 43.9, 12.4, 'Saudi Arabia', 'SA', 23.8, 45, 'Scotland', 'SCT', 56.5, 4.2, 'Senegal', 'SN', 14.4, -14.4, 'Serbia', 'RS', 44, 21, 'Seychelles', 'SC', -4.6, 55.4, 'Sierra Leone', 'SL', 8.4, -11.7, 'Singapore', 'SG', 1.3, 103.8, 'Slovakia', 'SK', 48.6, 19.6, 'Slovenia', 'SI', 46.1, 14.9, 'Solomon Islands', 'SB', -9.6, 160.1, 'Somalia', 'SO', 5.1, 46.1, 'South Africa', 'ZA', -30.5, 22.9, 'South Georgia', 'GS', -54.4, -36.5, 'South Korea', 'KR', 35.9, 127.7, 'Spain', 'ES', 40.4, -3.7, 'Sri Lanka', 'LK', 7.8, 80.7, 'Sudan', 'SD', 12.8, 30.2, 'Suriname', 'SR', 3.9, -56, 'Svalbard and Jan Mayen', 'SJ', 77.5, 23.6, 'Swaziland', 'SZ', -26.5, 31.4, 'Sweden', 'SE', 60.1, 18.6, 'Switzerland', 'CH', 46.8, 8.2, 'Syria', 'SY', 34.8, 38.9, 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', 'ST', .1, 6.6, 'Taiwan', 'TW', 23.6, 120.9, 'Tajikistan', 'TJ', 38.8, 71.2, 'Tanzania', 'TZ', -6.3, 34.8, 'Thailand', 'TH', 15.8, 100.9, 'Timor-Leste', 'TL', -8.8, 125.7, 'Togo', 'TG', 8.6, .8, 'Tokelau', 'TK', -8.9, -171.8, 'Tonga', 'TO', -21.1, -175.1, 'Trinidad and Tobago', 'TT', 10.6, -61.2, 'Tunisia', 'TN', 33.8, 9.5, 'Turkey', 'TR', 38.9, 35.2, 'Turkmenistan', 'TM', 38.9, 59.5, 'Turks and Caicos Islands', 'TC', 21.6, -71.7, 'Tuvalu', 'TV', -7.1, 177.6, 'U.S. Minor Outlying Islands', 'UM', 0, 0, 'U.S. Virgin Islands', 'VI', 18.3, -64.8, 'Uganda', 'UG', 1.3, 32.2, 'Ukraine', 'UA', 48.3, 31.1, 'United Arab Emirates', 'AE', 23.4, 53.8, 'United Kingdom', 'GB', 55.3, -3.4, 'United States', 'US', 37, -95.7, 'Uruguay', 'UY', -32.5, -55.7, 'Uzbekistan', 'UZ', 41.3, 64.5, 'Vanuatu', 'VU', -15.3, 166.9, 'Vatican City', 'VA', 41.9, 12.4, 'Venezuela', 'VE', 6.4, -66.5, 'Vietnam', 'VN', 14, 108.2, 'Wales', 'WLS', 55.3, -3.4, 'Wallis and Futuna', 'WF', -13.7, -177.1, 'Western Sahara', 'EH', 24.2, -12.8, 'Yemen', 'YE', 15.5, 48.5, 'Zambia', 'ZM', -13.1, 27.8, 'Zimbabwe', 'ZW', -19, 29.1];
		ConnectionConstants.p2pWss = 'wss://p2p.haxball.com/';
		ConnectionConstants.rsUrl = 'https://www.haxball.com/rs/';
		ConnectionConstants.iceServersArray = [{
			urls: 'stun:stun.l.google.com:19302'
		}];
		ConnectionConstants.localStorageUtilInst = new LocalStorageUtil;
		Game.rl = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(new Point(0, 0));
			}
			return a;
		}(this);
		Game.wk = function () {
			let a = [];
			{
				let b = 0;
				for (; 256 > b;)
					++b,
						a.push(0);
			}
			return a;
		}(this);
		Stadium.ls = StreamWriter.ka(1024);
		SyncChangeAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		AnnouncementAction.Aa = Action.Ha({
			Ca: false,
			delay: false,
			yj: {
				lj: 10,
				Ej: 900
			}
		});
		AutoAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		SetLimitsAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		GiveAdminAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		CmdAvatarAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		MoveToTeamAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		SetStadiumAction.Aa = Action.Ha({
			Ca: false,
			delay: false,
			yj: {
				lj: 10,
				Ej: 2E3
			}
		});
		SetTeamColorsAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		LockTeamsAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		PlayerJoinAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		AvatarOverrideAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		GamePauseAction.Aa = Action.Ha({});
		ChatAction.Aa = Action.Ha({
			Ca: false,
			delay: false,
			yj: {
				lj: 10,
				Ej: 900
			}
		});
		PlayerActivityAction.Aa = Action.Ha({});
		ChatIndicatorAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		KickAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		ReorderPlayersAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		SetDiscPropertiesAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		KickRateAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		GameStartAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		GameStopAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		UpdatePlayerPingsAction.Aa = Action.Ha({
			Ca: false,
			delay: false
		});
		Segment.segVal1 = .17435839227423353;
		Segment.segVal2 = 5.934119456780721;
		BigAnimatedText.En = new KeyFramesUtil([0, 0, 2, 1, 0, .35, 1, 0, 1, 0, .7, 1, 0, 0, 0, 1]);
		BigAnimatedText.Fn = new KeyFramesUtil([0, -1, 3, 0, 0, .35, 0, 0, 0, 0, .65, 0, 0, 1, 3, 1]);
		ChangeLocationDialogContainer.htmlContents = '<div class=\'dialog change-location-view\'><h1>Change Location</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'change\'>Change</button><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		ChatboxContainer.htmlContents = '<div class=\'chatbox-view\'><div class=\'chatbox-view-contents\'><div data-hook=\'drag\' class=\'drag\'></div><div data-hook=\'log\' class=\'log subtle-thin-scrollbar\'><div data-hook=\'log-contents\' class=\'log-contents\'><p>Controls:<br/>Move: WASD or Arrows<br/>Kick: X, Space, Ctrl, Shift, Numpad 0<br/>View: Numbers 1 to 4</p></div></div><div class=\'autocompletebox\' data-hook=\'autocompletebox\'></div><div class=\'input\'><input data-hook=\'input\' type=\'text\' /></div></div></div>';
		ChooseNickContainer.htmlContents = '<div class=\'choose-nickname-view\'><img src="' + window.parent._gdir + 'images/haxball.png" /><div class=\'dialog\'><h1>Choose nickname</h1><div class=\'label-input\'><label>Nick:</label><input data-hook=\'input\' type=\'text\' /></div><button data-hook=\'ok\'>Ok</button></div></div>';
		ConnectingContainer.htmlContents = '<div class=\'connecting-view\'><div class=\'dialog\'><h1>Connecting</h1><div class=\'connecting-view-log\' data-hook=\'log\'></div><button data-hook=\'cancel\'>Cancel</button></div></div>';
		CreateRoomContainer.htmlContents = '<div class=\'create-room-view\'><div class=\'dialog\'><h1>Create room</h1><div class=\'label-input\'><label>Room name:</label><input data-hook=\'name\' required /></div><div class=\'label-input\'><label>Password:</label><input data-hook=\'pass\' /></div><div class=\'label-input\'><label>Max players:</label><select data-hook=\'max-pl\'></select></div><button data-hook=\'unlisted\'></button><div class=\'row\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'create\'>Create</button></div></div></div>';
		DisconnectedContainer.htmlContents = '<div class=\'disconnected-view\'><div class=\'dialog basic-dialog\'><h1>Disconnected</h1><p data-hook=\'reason\'></p><div class=\'buttons\'><button data-hook=\'ok\'>Ok</button><button data-hook=\'replay\'>Save replay</button></div></div></div>';
		GameStateContainer.htmlContents = '<div class=\'game-state-view\'><div class=\'bar-container\'><div class=\'bar\'><div class=\'scoreboard\'><div class=\'teamicon red\'></div><div class=\'score\' data-hook=\'red-score\'>0</div><div>-</div><div class=\'score\' data-hook=\'blue-score\'>0</div><div class=\'teamicon blue\'></div></div><div class="fps-limit-fix"></div><div data-hook=\'timer\'></div></div></div><div class=\'canvas\' data-hook=\'canvas\'></div></div>';
		GameContainer.htmlContents = '<div class=\'game-view\' tabindex=\'-1\'><div class=\'gameplay-section\' data-hook=\'gameplay\'></div><div class=\'top-section\' data-hook=\'top-section\'></div><div class=\'bottom-section\'><div data-hook=\'stats\'></div><div data-hook=\'chatbox\'></div><div class=\'bottom-spacer\'></div></div><div class=\'buttons\'><div class=\'sound-button-container\' data-hook="sound"><div class=\'sound-slider\' data-hook=\'sound-slider\'><div class=\'sound-slider-bar-bg\' data-hook=\'sound-bar-bg\'><div class=\'sound-slider-bar\' data-hook=\'sound-bar\'></div></div></div><button data-hook=\'sound-btn\'><i class=\'icon-volume-up\' data-hook=\'sound-icon\'></i></button></div><button data-hook=\'menu\'><i class=\'icon-menu\'></i>Menu<span class=\'tooltip\'>Toggle room menu [Escape]</span></button><button data-hook=\'settings\'><i class=\'icon-cog\'></i></button></div><div data-hook=\'popups\'></div></div>';
		KickDialogContainer.htmlContents = '<div class=\'dialog kick-player-view\'><h1 data-hook=\'title\'></h1><div class=label-input><label>Reason: </label><input type=\'text\' data-hook=\'reason\' /></div><button data-hook=\'ban-btn\'><i class=\'icon-block\'></i>Ban from rejoining: <span data-hook=\'ban-text\'></span></button><div class="row"><button data-hook=\'close\'>Cancel</button><button data-hook=\'kick\'>Kick</button></div></div>';
		LeaveRoomDialogContainer.htmlContents = '<div class=\'dialog basic-dialog leave-room-view\'><h1>Leave room?</h1><p>Are you sure you want to leave the room?</p><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'leave\'><i class=\'icon-logout\'></i>Leave</button></div></div>';
		PickStadiumDialogContainer.htmlContents = '<div class=\'dialog pick-stadium-view\'><h1>Pick a stadium</h1><div class=\'splitter\'><div class=\'list\' data-hook=\'list\'></div><div class=\'buttons\'><button data-hook=\'pick\'>Pick</button><button data-hook=\'delete\'>Delete</button><div class=\'file-btn\'><label for=\'stadfile\'>Load</label><input id=\'stadfile\' type=\'file\' accept=\'.hbs,.json,.json5\' data-hook=\'file\'/></div><button data-hook=\'export\'>Export</button><div class=\'spacer\'></div><button data-hook=\'cancel\'>Cancel</button></div></div></div>';
		PlayerDialogContainer.htmlContents = '<div class=\'dialog\' style=\'min-width:200px\'><h1 data-hook=\'name\'></h1><button data-hook=\'admin\'></button><button data-hook=\'kick\'>Kick</button><button data-hook=\'close\'>Close</button></div>';
		PlayerListItem.htmlContents = '<div class=\'player-list-item\'><div data-hook=\'flag\' class=\'flagico\'></div><div data-hook=\'name\'></div><div data-hook=\'ping\'></div></div>';
		PlayerListContainer.htmlContents = '<div class=\'player-list-view\'><div class=\'buttons\'><button data-hook=\'join-btn\'>Join</button><button data-hook=\'reset-btn\' class=\'admin-only\'></button></div><div class=\'list thin-scrollbar\' data-hook=\'list\'></div></div>';
		ReplayControlsContainer.htmlContents = '<div class=\'replay-controls-view\'><button data-hook=\'reset\'><i class=\'icon-to-start\'></i></button><button data-hook=\'play\'><i data-hook=\'playicon\'></i></button><div data-hook=\'spd\'>1x</div><button data-hook=\'spddn\'>-</button><button data-hook=\'spdup\'>+</button><div data-hook=\'time\'>00:00</div><div class=\'timebar\' data-hook=\'timebar\'><div class=\'barbg\'><div class=\'bar\' data-hook=\'progbar\'></div></div><div class=\'timetooltip\' data-hook=\'timetooltip\'></div></div><button data-hook=\'leave\'>Leave</button></div>';
		RoomLinkContainer.htmlContents = '<div class=\'dialog basic-dialog room-link-view\'><h1>Room link</h1><p>Use this url to link others directly into this room.</p><input data-hook=\'link\' readonly></input><div class=\'buttons\'><button data-hook=\'close\'>Close</button><button data-hook=\'copy\'>Copy to clipboard</button></div></div>';
		RoomItem.Dj = '<tr><td><span data-hook=\'tag\'></span><span data-hook=\'name\'></span></td><td data-hook=\'players\'></td><td data-hook=\'pass\'></td><td><div data-hook=\'flag\' class=\'flagico\'></div><span data-hook=\'distance\'></span></td></tr>';
		RoomListContainer.Dj = '<div class=\'roomlist-view\'><div class=\'notice\' data-hook=\'notice\' hidden><div data-hook=\'notice-contents\'>Testing the notice.</div><div data-hook=\'notice-close\'><i class=\'icon-cancel\'></i></div></div><div class=\'dialog\'><h1>Room list</h1><p>Tip: Join rooms near you to reduce lag.</p><div class=\'splitter\'><div class=\'list\'><table class=\'header\'><colgroup><col><col><col><col></colgroup><thead><tr><td>Name</td><td>Players</td><td>Pass</td><td>Distance</td></tr></thead></table><div class=\'separator\'></div><div class=\'content\' data-hook=\'listscroll\'><table><colgroup><col><col><col><col></colgroup><tbody data-hook=\'list\'></tbody></table></div><div class=\'filters\'><span class=\'bool\' data-hook=\'fil-pass\'>Show locked <i></i></span><span class=\'bool\' data-hook=\'fil-full\'>Show full <i></i></span><span class=\'bool\' data-hook=\'fil-empty\'>Show empty <i></i></span></div></div><div class=\'buttons\'><button data-hook=\'refresh\'><i class=\'icon-cw\'></i><div>Refresh</div></button><button data-hook=\'join\'><i class=\'icon-login\'></i><div>Join Room</div></button><button data-hook=\'create\'><i class=\'icon-plus\'></i><div>Create Room</div></button><div class=\'spacer\'></div><div class=\'file-btn\'><label for=\'replayfile\'><i class=\'icon-play\'></i><div>Replays</div></label><input id=\'replayfile\' type=\'file\' accept=\'.hbr2\' data-hook=\'replayfile\'/></div><button data-hook=\'settings\'><i class=\'icon-cog\'></i><div>Settings</div></button><button data-hook=\'changenick\'><i class=\'icon-cw\'></i><div>Change Nick</div></button></div></div><p data-hook=\'count\'></p></div></div>';
		RoomPasswordContainer.htmlContents = '<div class=\'room-password-view\'><div class=\'dialog\'><h1>Password required</h1><div class=\'label-input\'><label>Password:</label><input data-hook=\'input\' /></div><div class=\'buttons\'><button data-hook=\'cancel\'>Cancel</button><button data-hook=\'ok\'>Ok</button></div></div></div>';
		RoomMenuContainer.htmlContents = '<div class=\'room-view\'><div class=\'container\'><h1 data-hook=\'room-name\'></h1><div class=\'header-btns\'><button data-hook=\'rec-btn\'><i class=\'icon-circle\'></i>Rec</button><button data-hook=\'link-btn\'><i class=\'icon-link\'></i>Link</button><button data-hook=\'leave-btn\'><i class=\'icon-logout\'></i>Leave</button></div><div class=\'teams\'><div class=\'tools admin-only\'><button data-hook=\'auto-btn\'>Auto</button><button data-hook=\'rand-btn\'>Rand</button><button data-hook=\'lock-btn\'>Lock</button><button data-hook=\'reset-all-btn\'>Reset</button></div><div data-hook=\'red-list\'></div><div data-hook=\'spec-list\'></div><div data-hook=\'blue-list\'></div><div class=\'spacer admin-only\'></div></div><div class=\'settings\'><div><label class=\'lbl\'>Time limit</label><select data-hook=\'time-limit-sel\'></select></div><div><label class=\'lbl\'>Score limit</label><select data-hook=\'score-limit-sel\'></select></div><div><label class=\'lbl\'>Stadium</label><label class=\'val\' data-hook=\'stadium-name\'>testing the stadium name</label><button class=\'admin-only\' data-hook=\'stadium-pick\'>Pick</button></div></div><div class=\'controls admin-only\'><button data-hook=\'start-btn\'><i class=\'icon-play\'></i>Start game</button><button data-hook=\'stop-btn\'><i class=\'icon-stop\'></i>Stop game</button><button data-hook=\'pause-btn\'><i class=\'icon-pause\'></i>Pause</button></div></div></div>';
		SettingsDialogContainer.htmlContents = '<div class=\'dialog settings-view\'><h1>Settings</h1><button data-hook=\'close\'>Close</button><div class=\'tabs\'><button data-hook=\'soundbtn\'>Sound</button><button data-hook=\'videobtn\'>Video</button><button data-hook=\'inputbtn\'>Input</button><button data-hook=\'miscbtn\'>Misc</button></div><div data-hook=\'presskey\' tabindex=\'-1\'><div>Press a key</div></div><div class=\'tabcontents\'><div class=\'section\' data-hook=\'miscsec\'><div class=\'loc\' data-hook=\'loc\'></div><div class=\'loc\' data-hook=\'loc-ovr\'></div><button data-hook=\'loc-ovr-btn\'></button></div><div class=\'section\' data-hook=\'soundsec\'><div data-hook="tsound-main">Sounds enabled</div><div data-hook="tsound-chat">Chat sound enabled</div><div data-hook="tsound-highlight">Nick highlight sound enabled</div><div data-hook="tsound-crowd">Crowd sound enabled</div></div><div class=\'section\' data-hook=\'inputsec\'></div><div class=\'section\' data-hook=\'videosec\'><div>Viewport Mode:<select data-hook=\'viewmode\'><option>Dynamic</option><option>Restricted 840x410</option><option>Full 1x Zoom</option><option>Full 1.25x Zoom</option><option>Full 1.5x Zoom</option><option>Full 1.75x Zoom</option><option>Full 2x Zoom</option><option>Full 2.25x Zoom</option><option>Full 2.5x Zoom</option></select></div><div>FPS Limit:<select data-hook=\'fps\'><option>None (Recommended)</option><option>30</option></select></div><div>Resolution Scaling:<select data-hook=\'resscale\'><option>100%</option><option>75%</option><option>50%</option><option>25%</option></select></div><div data-hook="tvideo-lowlatency">Use low latency canvas</div><div data-hook="tvideo-teamcol">Custom team colors enabled</div><div data-hook="tvideo-showindicators">Show chat indicators</div><div data-hook="tvideo-showavatars">Show player avatars</div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat opacity </div><div style="width: 40px" data-hook="chatopacity-value">1</div><input class="slider" type="range" min="0.5" max="1" step="0.01" data-hook="chatopacity-range"></div><div class="option-row"><div style="margin-right: 10px; flex: 1; max-width: 115px;">Chat focus height </div><div style="width: 40px" data-hook="chatfocusheight-value">200</div><input class="slider" type="range" min="0" max="400" step="10" data-hook="chatfocusheight-range"></div><div>Chat background width:<select data-hook=\'chatbgmode\'><option>Full</option><option>Compact</option></select></div></div></div></div>';
		SettingsDialogContainer.vm = 0;
		SimpleDialogContainer.htmlContents = '<div class=\'simple-dialog-view\'><div class=\'dialog basic-dialog\'><h1 data-hook=\'title\'></h1><p data-hook=\'content\'></p><div class=\'buttons\' data-hook=\'buttons\'></div></div></div>';
		StatsContainer.htmlContents = '<div class="stats-view-container"><div class=\'stats-view\'><p data-hook=\'ping\'></p><p data-hook=\'fps\'></p><div data-hook=\'graph\'></div></div></div>';
		UnsupportedBrowserContainer.htmlContents = '<div class=\'unsupported-browser-view\'><div class=\'dialog\'><h1>Unsupported Browser</h1><p>Sorry! Your browser doesn\'t yet implement some features which are required for HaxBall to work.</p><p>The missing features are: <span data-hook=\'features\'></span></p><h2>Recommended browsers:</h2><div><a href="https://www.mozilla.org/firefox/new/"><img src="' + window.parent._gdir + 'images/firefox-icon.png"/>Firefox</a></div><div><a href="https://www.google.com/chrome/"><img src="' + window.parent._gdir + 'images/chrome-icon.png"/>Chrome</a></div><div><a href="http://www.opera.com/"><img src="' + window.parent._gdir + 'images/opera-icon.png"/>Opera</a></div></div></div>';
		HaxballClientManager.initializeClient();
	}
)('undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this);
