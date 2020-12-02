import NIM from '../sdk/NIM_Web_NIM_v8.1.0.js'
import store from '../store/index.js'


export function initImSDK(accid, token) {
	var data = {};
	var sum = 0;
	var nim = NIM.getInstance({
		// 初始化SDK
		debug: false,
		appKey: '4978d5cca3342fc4e975e015c2e16812',
		account: accid,
		token: token,
		db: false,
		syncSessionUnread: true,
		onconnect: onConnect,
		onerror: onError,
		onwillreconnect: onWillReconnect,
		ondisconnect: onDisconnect,
		// 会话
		onsessions: onSessions,
		onupdatesession: onUpdateSession,
		// 消息
		onroamingmsgs: onRoamingMsgs,
		onofflinemsgs: onOfflineMsgs,
		onmsg: onMsg,

		// 同步完成
		onsyncdone: onSyncDone
	});

	function onConnect() {
		console.log('连接成功');
	}

	function onWillReconnect(obj) {
		console.log('即将重连');
		console.log(obj.retryCount);
		console.log(obj.duration);
	}

	function onDisconnect(error) {
		console.log('丢失连接');
		console.log(error);
		if (error) {
			switch (error.code) {
				// 账号或者密码错误, 请跳转到登录页面并提示错误
				case 302:
					break;
					// 被踢, 请提示错误后跳转到登录页面
				case 'kicked':
					break;
				default:
					break;
			}
		}
	}

	function onError(error) {
		console.log(error);
	}

	function onSessions(sessions) {
		console.log('收到会话列表', sessions);
		data.sessions = nim.mergeSessions(data.sessions, sessions);

		if (sessions && sessions.length) {
			sessions.forEach((item) => {
				sum = sum + parseInt(item.unread)
			})
		}
		console.log(sum)
		updateSessionsUI();
	}

	function onUpdateSession(session) {
		console.log('会话更新了', session);
		data.sessions = nim.mergeSessions(data.sessions, session);

		if (data.sessions && data.sessions.length) {
			data.sessions.forEach((item) => {
				sum = sum + parseInt(item.unread)
			})
		}
		console.log(sum)
		updateSessionsUI();

	}

	function updateSessionsUI() {
		// 刷新界面
	}

	function onRoamingMsgs(obj) {
		console.log('漫游消息', obj);
		pushMsg(obj.msgs);
	}

	function onOfflineMsgs(obj) {
		console.log('离线消息', obj);
		pushMsg(obj.msgs);
	}

	function onMsg(msg) {
		console.log('收到消息', msg.scene, msg.type, msg);
		pushMsg(msg);
	}

	function onBroadcastMsg(msg) {
		console.log('收到广播消息', msg);
	}

	function onBroadcastMsgs(msgs) {
		console.log('收到广播消息列表', msgs);
	}

	function pushMsg(msgs) {
		if (!Array.isArray(msgs)) {
			msgs = [msgs];
		}
		var sessionId = msgs[0].sessionId;
		data.msgs = data.msgs || {};
		data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
	}



	function onSysMsgUnread(obj) {
		data.sysMsgUnread = obj;
		refreshSysMsgsUI();
	}

	function onUpdateSysMsgUnread(obj) {
		console.log('系统通知未读数更新了', obj);
		data.sysMsgUnread = obj;
		refreshSysMsgsUI();
	}

	function refreshSysMsgsUI() {
		// 刷新界面
	}

	function onSyncDone() {
		console.log('同步完成');
	}

	return sum
}
