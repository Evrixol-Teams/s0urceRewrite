! function(t, e, n, i) {
	"use strict";

	function a(t, n, i) {
		var a = new Date;
		a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3);
		var o = "expires=" + a.toUTCString();
		e.cookie = t + "=" + n + ";" + o + ";path=/"
	}

	function o(t) {
		for (var n = t + "=", i = e.cookie.split(";"), a = 0; a < i.length; a++) {
			for (var o = i[a];
				" " == o.charAt(0);) o = o.substring(1);
			if (0 == o.indexOf(n)) return o.substring(n.length, o.length)
		}
		return ""
	}

	function r(t) {
		1 != gt.isMuted && (gt.sounds[t] == i && (gt.sounds[t] = {
			clips: [],
			index: 0,
			sr: "../client/sound/" + t + ".mp3"
		}), gt.sounds[t].clips[gt.sounds[t].index] == i && gt.sounds[t].clips.push(new Audio(gt.sounds[t].sr)), gt.sounds[t].clips[gt.sounds[t].index].play(), gt.sounds[t].index += 1, gt.sounds[t].index >= 5 && (gt.sounds[t].index = 0))
	}

	function l(t, e) {
		return 2 == e ? "Costs: <img src='../client/img/icon-bt.png' class='icon-small window-bt-icon'>" + (at.coins.rate * rt.attackCostMult).toFixed(4) : null == wt ? "No Description" : 0 == e && 1 == at.unlocked.firewall[t].state ? wt.Firewall[t].desc : 1 == e && 1 == at.unlocked.market[t].state ? wt.Market[t].desc : "Unlock by mining more BT coins."
	}

	function c(t, e) {
		null == wt ? pt.push({
			id: t,
			type: e
		}) : 0 == e ? (n(n(wt.Firewall[t].id).children().eq(0)).attr("src", wt.Firewall[t].img), n(n(wt.Firewall[t].id).children().eq(1).children().eq(0)).text(wt.Firewall[t].title), at.unlocked.firewall[t].state = !0) : 1 == e && (n(n(wt.Market[t].id).children().eq(0)).attr("src", wt.Market[t].img), n(n(wt.Market[t].id).children().eq(1).children().eq(0)).text(wt.Market[t].title), n(n(wt.Market[t].id + "-inv").children().eq(0)).text(wt.Market[t].title), n(n(wt.Market[t].id + "-inv").children().eq(1)).attr("src", wt.Market[t].img), at.unlocked.market[t].state = !0)
	}

	function s(t, e) {
		return Math.floor(Math.random() * (e - t + 1)) + t
	}

	function d() {
		for (var t = "", e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", n = s(3, 8), i = 0; i < n; i++) t += e.charAt(Math.floor(Math.random() * e.length));
		return t
	}

	function u(t) {
		if (0 == t.type) {
			0 == t.port ? t.port = "A" : 1 == t.port ? t.port = "B" : 2 == t.port && (t.port = "C");
			var e = "<div class='window-log-message window-log-message-danger'><img src='../client/img/icon-danger.png' class='icon-small'> You're being hacked by <div id='hackedid-form' class='button' data-text='" + t.id + "'></div> on Port " + t.port + "</div>",
				i = n(e),
				a = i.find("#hackedid-form").text(t.name);
			a.click(function() {
				Y(n(this).attr("data-text"))
			}), n(".window-log-content").append(i), dt.event_msg += 1, a = null
		} else if (1 == t.type) {
			var e = "<div class='window-log-message'><img src='../client/img/icon-success.png' class='icon-small'> You hacked <div id='hackedid-form' class='button' data-text='" + t.id + "'></div> and gained <img src='../client/img/icon-bt.png' class='icon-small window-bt-icon'><span class='log-gained'>" + t.amount + "</span></div>",
				i = n(e),
				a = i.find("#hackedid-form").text(t.name);
			a.click(function() {
				Y(n(this).attr("data-text"))
			}), n(".window-log-content").append(i), dt.event_msg += 1, a = null
		}
		if (2 == t.type) {
			var e = "<div class='window-log-message window-log-message-danger'><img src='../client/img/icon-danger.png' class='icon-small'> Can't find target.</div>",
				i = n(e);
			n(".window-log-content").append(i), dt.event_msg += 1
		}
		n(".window-log-content").stop().animate({
			scrollTop: n(".window-log-content")[0].scrollHeight
		}, 800), dt.event_msg > 10 && (dt.event_msg -= 1, n(".window-log-content").children().eq(0).remove()), e = null, i = null
	}

	function w() {
		n(".window-chat-content").stop().animate({
			scrollTop: n(".window-chat-content")[0].scrollHeight
		}, 800)
	}

	function p(t) {
		var e = "<div class='window-chat-msg-wrapper'><div class='window-chat-names'><span class='window-chat-name-own'></span> > <span class='window-chat-name-other' data-id='" + st.id + "'></span></div><span></span></div>",
			i = n(e);
		i.children().eq(0).children().eq(0).text(it.name), i.children().eq(0).children().eq(1).text(st.name), i.children().eq(1).text(t), i.children().eq(0).children().eq(1).click(function() {
			Y(n(this).attr("data-id")), st.id = n(this).attr("data-id"), st.name = n(this).text(), n("#chat-toplayer").text(st.name), n("#chat-input").focus()
		}), n(".window-chat-content").append(i), dt.chat_msg += 1, dt.chat_msg > 10 && (dt.chat_msg -= 1, n(".window-chat-content").children().eq(0).remove()), e = null, i = null, w()
	}

	function h(t) {
		var e = "<div class='window-chat-msg-wrapper'><div class='window-chat-names'><span class='window-chat-name-other' data-id='" + t.id + "'></span></div><span></span></div>",
			i = n(e);
		i.children().eq(0).children().eq(0).text(t.name), i.children().eq(1).text(t.message), i.children().eq(0).children().eq(0).click(function() {
			Y(n(this).attr("data-id")), st.id = n(this).attr("data-id"), st.name = n(this).text(), n("#chat-toplayer").text(st.name), n("#chat-input").focus()
		}), n(".window-chat-content").append(i), dt.chat_msg += 1, dt.chat_msg > 10 && (dt.chat_msg -= 1, n(".window-chat-content").children().eq(0).remove()), 0 == n("#window-chat").is(":visible") && n("#desktop-chat-new").show(), e = null, i = null, w()
	}

	function f() {
		if (null == st.id) return void n('input[id="chat-input"]').val("");
		var t = n('input[id="chat-input"]').val();
		t.substring(0, Math.min(t.length, 48)), "" !== t && ($.emit("playerRequest", {
			task: 300,
			id: st.id,
			message: t
		}), p(t)), n('input[id="chat-input"]').val(""), t = null, w()
	}

	function m() {
		var t = at.coins.value;
		t >= at.coins.rate * rt.attackCostMult && at.firewall[it.selection.firewall].charge_cool <= 0 ? 0 == at.unlocked.firewall[0].state ? c(0, 0) : n(at.unlocked.firewall[0].name).css("opacity", "1.0") : n(at.unlocked.firewall[0].name).css("opacity", "0.4");
		for (var e = 1; e < at.unlocked.firewall.length; e++) t >= at.firewall[0].upgrades[e].f_cost ? 0 == at.unlocked.firewall[e].state ? c(e, 0) : n(at.unlocked.firewall[e].name).css("opacity", "1.0") : n(at.unlocked.firewall[e].name).css("opacity", "0.4");
		for (var e = 0; e < at.unlocked.market.length; e++) t >= at.market[e].f_cost ? 0 == at.unlocked.market[e].state ? c(e, 1) : n(at.unlocked.market[e].name).css("opacity", "1.0") : n(at.unlocked.market[e].name).css("opacity", "0.4")
	}

	function g() {
		function t(t) {
			at.vis_firewall = t, 1 == at.vis_firewall ? (n("#window-firewall-page1").hide(), n("#window-firewall-page2").show()) : (n("#window-firewall-page1").show(), n("#window-firewall-page2").hide())
		}
		n("#window-chat").click(function() {
			n("#chat-input").focus()
		}), n("#chat-input-form").click(function() {
			n("#chat-input").focus()
		}), n("#chat-button").click(function() {
			f()
		}), n("#chat-input-form").submit(function() {
			f()
		}), n("input[id='my-playerid-input']").prop("readonly", !0), n("input[id='my-playerid-input']").click(function() {
			n(this).select()
		}), n("#cdm-target-name").click(function() {
			null !== ht.id && Y(ht.id)
		}), n("#window-firewall-pagebutton").click(function() {
			t(!1)
		}), n("#window-firewall-part1").click(function() {
			it.selection.firewall = 0, n("#window-firewall-page1-name").text("Firewall A"), t(!0), 6 == mt.current && (mt.clearHints(), setTimeout(function() {
				mt.animate(7)
			}, 8e3))
		}), n("#window-firewall-part2").click(function() {
			it.selection.firewall = 1, n("#window-firewall-page1-name").text("Firewall B"), t(!0), mt.animate(7)
		}), n("#window-firewall-part3").click(function() {
			it.selection.firewall = 2, n("#window-firewall-page1-name").text("Firewall C"), t(!0), mt.animate(7)
		}), n("#shop-firewall-charge5").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (at.firewall[it.selection.firewall].charges < at.firewall[it.selection.firewall].max_charges ? (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), r("click"), $.emit("playerRequest", {
				task: 102,
				id: 0,
				fid: it.selection.firewall
			})) : (b(t.pageX, t.pageY, "Fully charged", "#c77f02"), r("fail")))
		}), n("#shop-firewall-max_charge10").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (at.firewall[it.selection.firewall].max_charges < 30 ? (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), r("click"), $.emit("playerRequest", {
				task: 102,
				id: 1,
				fid: it.selection.firewall
			})) : (b(t.pageX, t.pageY, "Reached maximum charge size", "#c77f02"), r("fail")))
		}), n("#shop-firewall-difficulty").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (at.firewall[it.selection.firewall].strength < 4 ? (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), r("click"), $.emit("playerRequest", {
				task: 102,
				id: 2,
				fid: it.selection.firewall
			})) : (b(t.pageX, t.pageY, "Reached maximum strength", "#c77f02"), r("fail")))
		}), n("#shop-firewall-regen").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (at.firewall[it.selection.firewall].regeneration < 10 ? (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), r("click"), $.emit("playerRequest", {
				task: 102,
				id: 3,
				fid: it.selection.firewall
			})) : (b(t.pageX, t.pageY, "Reached maximum regeneration", "#c77f02"), r("fail")))
		})
	}

	function k() {
		n("#shop-basic-miner").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), r("click"), q(), $.emit("playerRequest", {
				task: 103,
				id: 0
			}), M("#shop-basic-miner-inv"))
		}), n("#shop-advanced-miner").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), q(), r("click"), $.emit("playerRequest", {
				task: 103,
				id: 1
			}), M("#shop-advanced-miner-inv"))
		}), n("#shop-mining-drill").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), q(), r("click"), $.emit("playerRequest", {
				task: 103,
				id: 2
			}), M("#shop-mining-drill-inv"))
		}), n("#shop-data-center").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), q(), r("click"), $.emit("playerRequest", {
				task: 103,
				id: 3
			}), M("#shop-data-center-inv"))
		}), n("#shop-bot-net").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), q(), r("click"), $.emit("playerRequest", {
				task: 103,
				id: 4
			}), M("#shop-bot-net-inv"))
		}), n("#shop-quantum-server").click(function(t) {
			at.coins.value >= n(this).children().eq(1).children().eq(3).text() && (b(t.pageX, t.pageY, "+ " + n(this).children().eq(1).children().eq(0).text(), "#2d533f"), q(), r("click"), $.emit("playerRequest", {
				task: 103,
				id: 5
			}), M("#shop-quantum-server-inv"))
		})
	}

	function v(t, e, n) {
		return Math.max(e, Math.min(t, n))
	}

	function y() {
		0 == n("#messageTester").height() && n(".message").css("display", "inline")
	}

	function x() {
		var t = o("vid_adin_s0urce");
		t !== i && (t = parseInt(t), (t == i || isNaN(t)) && (a("vid_adin_s0urce", 0, 180), t = 0), et = t + 1, a("vid_adin_s0urce", et, 180)), null !== tt && 2 == et ? tt.startPreRoll() : P()
	}

	function q() {
		n("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0.4)"), setTimeout(function() {
			n("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0)")
		}, 100), setTimeout(function() {
			n("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0.4)")
		}, 200), setTimeout(function() {
			n("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0)")
		}, 300)
	}

	function b(t, e, i, a) {
		var o = "<div>" + i + "</div>",
			r = n(o);
		n("#game-page").append(r), n(r).css({
			position: "absolute",
			"z-index": 80,
			"pointer-events": "none",
			"background-color": a,
			padding: "2px 4px 2px 4px",
			"font-size": "20px",
			"border-radius": 2,
			left: t,
			top: e
		}), n(r).animate({
			top: e - 160,
			opacity: 0
		}, 1400, function() {
			n(r).remove(), r = null
		})
	}

	function _(t) {
		var e = ot[t].toLowerCase();
		n(".my-player-rank-icon").attr("src", "../client/img/icon-rank-" + e + ".png");
		var i = "<div class='rank-popup'><img src='../client/img/icon-rank-" + e + ".png' class='rank-popup-img'><div class='rank-popup-new'>New Rank!</div><div class='rank-popup-name'>" + ot[t] + "</div></div>",
			a = n(i);
		n("#game-page").append(a), n(a).animate({
			opacity: 1
		}, 200, function() {
			n(a).animate({
				bottom: "80px"
			}, 600, function() {
				n(a).delay(8e3).animate({
					opacity: 0
				}, 200, function() {
					n(a).remove(), a = null
				})
			})
		}), F(t)
	}

	function F(t) {
		var e = n("#window-rank-container").children().length;
		t > e - 1 ? t = e - 1 : t < 0 && (t = 0);
		for (var i = 0; i < e; i++) n("#window-rank-container").children().eq(i).attr("class", "rank-element"), t >= i ? (n("#window-rank-container").children().eq(i).children().eq(0).attr("class", "rank-img"), n("#window-rank-container").children().eq(i).children().eq(1).attr("class", "rank-name")) : (n("#window-rank-container").children().eq(i).children().eq(0).attr("class", "rank-img rank-img-locked"), n("#window-rank-container").children().eq(i).children().eq(1).attr("class", "rank-name rank-name-locked"));
		n("#window-rank-container").children().eq(t).attr("class", "rank-element rank-current"), e = null
	}

	function M(t) {
		var e = n(t).children(".miner-list-background"),
			i = n(t).children(".window-miner-list-icon");
		e.animate({
			opacity: .8
		}, 150, function() {
			e.animate({
				opacity: 0
			}, 150), i.animate({
				width: "65px",
				height: "65px",
				top: "20px",
				left: "0"
			}, 150, function() {
				i.delay(50).animate({
					width: "45px",
					height: "45px",
					top: "30px",
					left: "10px"
				}, 200)
			})
		})
	}

	function C() {
		"" !== n('input[id="targetmessage-input"]').val() && ($.emit("playerRequest", {
			task: 106,
			text: n('input[id="targetmessage-input"]').val()
		}), ht.lastHackedID == ct.id && n("#window-other-message1").text(n('input[id="targetmessage-input"]').val())), T("#topwindow-success")
	}

	function R(t) {
		n(t).show(), n(t).animate({
			opacity: 1
		}, 200)
	}

	function T(t) {
		n(t).animate({
			opacity: 0
		}, 150, function() {
			n(t).hide()
		})
	}

	function Y(t) {
		$.emit("playerRequest", {
			task: 105,
			id: t
		})
	}

	function L() {
		$.emit("playerRequest", {
			task: 104,
			desc: n('input[id="playerquote-type-word"]').val()
		}), n("#window-my-playerquote-wrapper-new").hide(), n("#window-my-playerquote-wrapper").show()
	}

	function X(t) {
		var e = n(t).children(".window-title");
		n(".window-title").css("background-color", "#3e4c5f"), n(".window").css("border-color", "#3e4c5f"), n(e).css("background-color", "#4d647a"), n(t).css("border-color", "#4d647a"), A(t)
	}

	function A(t) {
		var e = kt.length;
		t = t.replace("#", "");
		for (var i = 0; i < e; i++)
			if (kt[i] == t) {
				kt.splice(i, 1), kt.push(t);
				break
			} for (var i = 0; i < e; i++) n("#" + kt[i]).css("z-index", i)
	}

	function H() {
		n(".window-tool-text").stop().animate({
			scrollTop: n(".window-tool-text")[0].scrollHeight
		}, 800)
	}

	function E(t) {
		var e = "<br><span style='color: #e96666'>" + t.text + "</span><br>",
			a = n(e);
		n("#cdm-text-container").append(a), H(), t.extra !== i && t.extra.overlay !== i && (mt.animate(5), n("#hacking-reward").text(t.extra.overlay.value.toFixed(4)), R("#topwindow-success"), n("#targetmessage-input").focus(), r("hacked"), u({
			type: 1,
			id: ht.id,
			name: ht.name,
			amount: t.extra.overlay.value.toFixed(4)
		}), ht.lastHackedID = ht.id), t.action !== i && 0 == t.action && N()
	}

	function I(t) {
		n("#window-my-playerlevel").text(t.content.level), n("input[id='my-playerid-input']").val(t.content.id), n("#window-my-playerquote").text(t.content.desc), n("#window-my-message1").text(t.content.comm.first), n("#window-my-message2").text(t.content.comm.second), n("#my-player-flag").attr("class", "flag " + t.content.country)
	}

	function N() {
		null == ht.id, null == ht.name, n(".tool-type-img").attr("src", "../client/img/words/template.png")
	}

	function P() {
		it.name = n('input[id="login-input"]').val(), a("username", it.name, 180), "" == it.name && (it.name = "Anon" + s(1, 1e3)), n("#window-my-playername").text(it.name), $.emit("signIn", {
			name: it.name
		}), _(0), n("#checkbox-tutorial").is(":checked") ? mt.enabled = !0 : mt.enabled = !1, a("tutorial_s0urce", mt.enabled, 180), mt.animate(0)
	}

	function D(t) {
		at.coins.value >= at.coins.rate * rt.attackCostMult && (S(), mt.animate(3), ht.name = ct.name, ht.level = ct.level, ht.id = ct.id, ht.port = t + 1, $.emit("playerRequest", {
			task: 100,
			id: ht.id,
			port: t
		}))
	}

	function B(t) {
		n("#cdm-text-container").empty(), n("#window-tool").show(), n("#cdm-target-name").text(ht.name), n("#cdm-target-level").text(ht.level), n("input[id='cdm-target-id']").val(ht.id), n("#progressbar-firewall-amount").width("0%"), 1 == ht.port ? n("#progressbar-firewall-port").text("Firewall A") : 2 == ht.port ? n("#progressbar-firewall-port").text("Firewall B") : 3 == ht.port && n("#progressbar-firewall-port").text("Firewall C"), n("#tool-type-word").focus()
	}

	function O(t) {
		var e = 100 - Math.round(t.charges / t.max_charges * 100);
		n("#progressbar-firewall-amount").width(e + "%")
	}

	function S() {
		ht.cdm.currentBlock = s(0, ut.template.length - 1), ht.cdm.currentLine = 0, ht.cdm.maxLine = ut.template[ht.cdm.currentBlock].length
	}

	function j() {
		mt.animate(4), r("success"), ht.cdm.currentLine >= ht.cdm.maxLine && S();
		var t = ut.template[ht.cdm.currentBlock][ht.cdm.currentLine],
			e = n(t);
		ht.cdm.currentLine += 1, e.find(".user-word").text(nt);
		for (var i = e.find(".random-word"), a = 0; a < i.length; a++) n(i[a]).text(d());
		n("#cdm-text-container").append(e), H()
	}

	function z() {
		n("#tool-type").css("background-color", "#f2b7b0"), setTimeout(function() {
			n("#tool-type").css("background-color", "#d24f4f"), setTimeout(function() {
				n("#tool-type").css("background-color", "#60e6a3")
			}, 250)
		}, 100), r("fail")
	}

	function W(t) {
		n(".tool-type-img").attr("src", "../client/img/word/" + t.url.t + "/" + t.url.i)
	}

	function G() {
		nt = n('input[id="tool-type-word"]').val(), $.emit("playerRequest", {
			task: 777,
			word: nt
		}), n('input[id="tool-type-word"]').val("")
	}

	function U(t) {
		ct = t, n("#other-player-flag").attr("class", "flag " + ct.country), n(".other-rank-icon").attr("src", "../client/img/icon-rank-" + ot[ct.achievmentRank].toLowerCase() + ".png"), n("#window-other-port1").toggleClass(n("#window-other-port1").attr("class").split(" ")[1] + " window-other-attackbutton-default"), n("#window-other-port2").toggleClass(n("#window-other-port2").attr("class").split(" ")[1] + " window-other-attackbutton-default"), n("#window-other-port3").toggleClass(n("#window-other-port3").attr("class").split(" ")[1] + " window-other-attackbutton-default"), n("#window-other-button").show(), n("#window-other-attackbutton-wrapper").hide(), n("#window-other").show(), X("#window-other"), mt.animate(1), n("#window-other-playerlevel").text(ct.level), n("#window-other-playername").text(ct.name), n("#window-other-playerquote").text(ct.desc), n("#window-other-message1").text(ct.comm.first), n("#window-other-message2").text(ct.comm.second), n("#window-other").show()
	}

	function J(t) {
		1 == t.hacked ? (n("#window-firewall-part" + (t.port + 1)).css("background-image", "url(/client/img/firewall-frame-red.png)"), n("#window-firewall-part" + (t.port + 1)).hover(function() {
			n(this).css("background-image", "url(/client/img/firewall-frame-red-hover.png)")
		}, function() {
			n(this).css("background-image", "url(/client/img/firewall-frame-red.png)")
		})) : (n("#window-firewall-part" + (t.port + 1)).css("background-image", "url(/client/img/firewall-frame.png)"), n("#window-firewall-part" + (t.port + 1)).hover(function() {
			n(this).css("background-image", "url(/client/img/firewall-frame-hover.png)")
		}, function() {
			n(this).css("background-image", "url(/client/img/firewall-frame.png)")
		}))
	}

	function K(t) {
		if (0 != at.gotFirstPack) {
			null !== at.coins && (at.coins.value += .2 * at.coins.rate);
			var e = 0;
			n("#window-my-coinamount").text(at.coins.value.toFixed(4)), n("#window-my-gainamount").text(at.coins.rate.toFixed(4)), e = at.firewall[0].charges / at.firewall[0].max_charges * 100, n("#window-firewall-part1-amount").height(e + "%"), n(".firewall-part1-charges").text(at.firewall[0].charges), n(".firewall-part1-charges-max").text(at.firewall[0].max_charges), e = at.firewall[1].charges / at.firewall[1].max_charges * 100, n("#window-firewall-part2-amount").height(e + "%"), n(".firewall-part2-charges").text(at.firewall[1].charges), n(".firewall-part2-charges-max").text(at.firewall[1].max_charges), e = at.firewall[2].charges / at.firewall[2].max_charges * 100, n("#window-firewall-part3-amount").height(e + "%"), n(".firewall-part3-charges").text(at.firewall[2].charges), n(".firewall-part3-charges-max").text(at.firewall[2].max_charges);
			for (var i = 0; i < at.unlocked.market.length; i++) n(at.unlocked.market[i].name + "-amount").text(at.market[i].amount), n(at.unlocked.market[i].name + "-value").text(at.market[i].f_cost.toFixed(4));
			if (1 == at.vis_firewall) {
				n("#shop-charges").text(at.firewall[it.selection.firewall].charges), n("#shop-max-charges").text(at.firewall[it.selection.firewall].max_charges), n("#shop-strength").text(at.firewall[it.selection.firewall].strength), n("#shop-regen").text(at.firewall[it.selection.firewall].regeneration), n(at.unlocked.firewall[0].name + "-value").text((at.coins.rate * rt.chargeCostMult).toFixed(4));
				for (var i = 1; i < at.unlocked.firewall.length; i++) n(at.unlocked.firewall[i].name + "-value").text(at.firewall[it.selection.firewall].upgrades[i].f_cost.toFixed(4))
			}
			at.coins.value >= at.coins.rate * rt.attackCostMult ? (n("#window-other-port1").css("opacity", "1.0"), n("#window-other-port2").css("opacity", "1.0"), n("#window-other-port3").css("opacity", "1.0")) : (n("#window-other-port1").css("opacity", "0.4"), n("#window-other-port2").css("opacity", "0.4"), n("#window-other-port3").css("opacity", "0.4")), m()
		}
	}

	function Q(t) {
		t.topFive[0] !== i && (n("#leaderboard-first-name").text(t.topFive[0].name), n("#leaderboard-first-rank").attr("src", "../client/img/icon-rank-" + ot[t.topFive[0].achievmentRank].toLowerCase() + ".png"), null !== t.topFive[0].country && "string" == typeof t.topFive[0].country && t.topFive[0].country.length < 3 && n("#leaderboard-first-country").attr("class", "flag " + t.topFive[0].country)), t.topFive[1] !== i && (n("#leaderboard-second-name").text(t.topFive[1].name), n("#leaderboard-second-rank").attr("src", "../client/img/icon-rank-" + ot[t.topFive[1].achievmentRank].toLowerCase() + ".png"), null !== t.topFive[1].country && "string" == typeof t.topFive[0].country && t.topFive[1].country.length < 3 && n("#leaderboard-second-country").attr("class", "flag " + t.topFive[1].country)), t.topFive[2] !== i && (n("#leaderboard-third-name").text(t.topFive[2].name), n("#leaderboard-third-rank").attr("src", "../client/img/icon-rank-" + ot[t.topFive[2].achievmentRank].toLowerCase() + ".png"), null !== t.topFive[2].country && "string" == typeof t.topFive[2].country && t.topFive[2].country.length < 3 && n("#leaderboard-third-country").attr("class", "flag " + t.topFive[2].country)), n("#player-list").empty(), lt = [];
		for (var e = 0; e < t.data.length; e++) {
			var a = !1,
				o = "",
				r = "<img src='../client/img/icon-rank-" + ot[t.data[e].achievmentRank].toLowerCase() + ".png' class='icon-small icon-profile-rank'>",
				l = "<span class='f16 window-list-table-flag'><span class='flag " + t.data[e].country + "'></span></span>";
			t.data[e].id == it.id ? (a = !0, o = "<tr class='window-list-table-own' data-queue='" + e + "'><td class='list-table-rank'><span class='list-table-rank-content'>RANK</span></td><td class='list-table-name'>" + r + l + "<span>NAME</span><span id='list-own-name'>(me)</span></tr>") : o = "<tr class='window-list-table-select' data-queue='" + e + "'><td class='list-table-rank'><span class='list-table-rank-content'>RANK</span></td><td class='list-table-name'>" + r + l + "<span>NAME</span></td></tr>";
			var c = n(o);
			c.children().eq(0).children().eq(0).text(t.data[e].rank), c.children().eq(1).children().eq(2).text(t.data[e].name), lt[e] = t.data[e], n("#player-list").append(c), 0 == a && c.click(function() {
				U(lt[this.getAttribute("data-queue")])
			})
		}
	}

	function V() {
		"undefined" != typeof aipPlayer ? tt = new aipPlayer({
			AD_WIDTH: 960,
			AD_HEIGHT: 540,
			AD_FULLSCREEN: !0,
			AD_CENTERPLAYER: !1,
			LOADING_TEXT: "loading advertisement",
			PREROLL_ELEM: e.getElementById("preroll"),
			AIP_COMPLETE: function() {
				et >= 2 && a("vid_adin_s0urce", 0, 180), P()
			},
			AIP_REMOVE: function() {}
		}) : P()
	}

	function Z(t, n) {
		var i = e.head || e.getElementsByTagName("head")[0],
			a = e.createElement("script"),
			o = !0;
		a.async = "async", a.type = "text/javascript", a.charset = "UTF-8", a.src = t, a.onload = a.onreadystatechange = function() {
			!o || a.readyState && !/loaded|complete/.test(a.readyState) || (o = !1, n(), a.onload = a.onreadystatechange = null)
		}, i.appendChild(a)
	}
	var $ = io.connect(),
		tt = null,
		et = 0,
		nt = "template",
		it = {
			name: "Anon",
			id: null,
			selection: {
				firewall: 0
			},
			country: null
		},
		at = {
			gotFirstPack: !1,
			coins: null,
			firewall: {},
			market: {},
			vis_firewall: !1,
			unlocked: {
				firewall: [{
					name: "#shop-firewall-charge5",
					state: !1
				}, {
					name: "#shop-firewall-max_charge10",
					state: !1
				}, {
					name: "#shop-firewall-difficulty",
					state: !1
				}, {
					name: "#shop-firewall-regen",
					state: !1
				}],
				market: [{
					name: "#shop-basic-miner",
					state: !1
				}, {
					name: "#shop-advanced-miner",
					state: !1
				}, {
					name: "#shop-mining-drill",
					state: !1
				}, {
					name: "#shop-data-center",
					state: !1
				}, {
					name: "#shop-bot-net",
					state: !1
				}, {
					name: "#shop-quantum-server",
					state: !1
				}]
			}
		},
		ot = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"],
		rt = {
			attackCostMult: 5,
			chargeCostMult: 20
		},
		lt = [],
		ct = null,
		st = {},
		dt = {
			chat_msg: 0,
			event_msg: 0
		},
		ut = null,
		wt = null,
		pt = [],
		ht = {
			id: null,
			name: "",
			lastHackedID: null,
			cdm: {
				currentLine: 0,
				maxLine: 0,
				currentBlock: 0
			}
		},
		ft = {
			initWidth: 0,
			initHeight: 0,
			dragging: null,
			focus: null,
			offX: 0,
			offY: 0,
			zIndexTop: 10,
			zIndexBottom: 0,
			isHoveringClose: !1,
			hoverInfo: null,
			country: null,
			cdm_mark_id: !1
		},
		mt = {
			current: -1,
			elements: ["#tutorial-targetlist", "#tutorial-target", "#tutorial-targetport", "#tutorial-cdm", "#tutorial-cdmprogress", "#tutorial-mycomputer", "#tutorial-firewall", "#tutorial-myminers", "#tutorial-blackmarket"],
			_length: 0,
			enabled: !0
		};
	mt._length = mt.elements.length;
	var gt = {
		isMuted: !1,
		sounds: {}
	};
	n(e).ready(function() {
		y();
		var t = o("username");
		t !== i && "" !== t && n('input[id="login-input"]').val(t), t = null, "false" == o("tutorial_s0urce") ? (mt.enabled = !1, n("#checkbox-tutorial").prop("checked", !1)) : (mt.enabled = !0, n("#checkbox-tutorial").prop("checked", !0)), "false" == o("sound_s0urce") ? (n("#settings-button-sound").text("Sound: Off"), gt.isMuted = !0) : (n("#settings-button-sound").text("Sound: On"), gt.isMuted = !1), ft.initWidth = n(e).width(), ft.initHeight = n(e).height(), n(e).ready(function() {
			n("#tool-type-word").bind("cut copy paste", function(t) {
				t.preventDefault()
			})
		}), n(e).on("contextmenu", function() {
			return !1
		}), n("#settings-button-sound").click(function() {
			0 == gt.isMuted ? (n(this).text("Sound: Off"), gt.isMuted = !0, a("sound_s0urce", "false", 180)) : (n(this).text("Sound: On"), gt.isMuted = !1, a("sound_s0urce", "true", 180))
		}), g(), k(), n("#targetid-button").click(function() {
			Y(n('input[id="targetid-input"]').val())
		}), n("#targetid-input-form").submit(function() {
			Y(n('input[id="targetid-input"]').val())
		}), n("#toppower-restart-button").click(function() {
			$.emit("playerRequest", {
				task: 666
			}), F(0), T("#topwindow-power")
		}), n("#login-play").click(function() {
			x()
		}), n("#login-input-form").submit(function() {
			x()
		}), n("#targetmessage-input-form").submit(function() {
			C()
		}), n("#targetmessage-button-send").click(function() {
			C()
		}), n("#tool-type-form").submit(function() {
			G()
		}), n("input[id='cdm-target-id']").prop("readonly", !0), n("input[id='cdm-target-id']").click(function() {
			ft.cdm_mark_id = !0, n(this).select()
		}), n("#window-other").css({
			top: n(e).height() / 2 - 185,
			left: 120
		}), n("#window-shop").css({
			top: n(e).height() / 2 - 221,
			left: n(e).width() / 2 - 175
		}), n("#window-log").css({
			top: n(e).height() - 210,
			left: 30
		}), n("#window-power").css({
			top: n(e).height() / 2 - 95,
			left: n(e).width() / 2 - 181
		}), n("#window-settings").css({
			top: n(e).height() / 2 - 95,
			left: n(e).width() / 2 - 181
		}), n("#window-chat").css({
			top: n(e).height() / 2 - 155,
			left: n(e).width() / 2 - 181
		}), n("#window-rank").css({
			top: n(e).height() / 2 - 238,
			left: n(e).width() / 2 - 101
		}), ft.initWidth > 1500 ? (n("#window-miner").css({
			top: 110,
			left: 1145
		}), n("#window-computer").css({
			top: 110,
			left: 545
		}), n("#window-list").css({
			top: 110,
			left: 265
		}), n("#window-tool").css({
			top: 460,
			left: 560
		})) : ft.initWidth > 1380 ? (n("#window-miner").css({
			top: 110,
			left: 1035
		}), n("#window-computer").css({
			top: 110,
			left: 435
		}), n("#window-list").css({
			top: 110,
			left: 155
		}), n("#window-tool").css({
			top: 460,
			left: 450
		})) : (n("#window-miner").css({
			top: 110,
			left: ft.initWidth - 352
		}), n("#window-computer").css({
			top: 110,
			left: 435
		}), n("#window-list").css({
			top: 110,
			left: 155
		}), n("#window-tool").css({
			top: ft.initHeight - 436,
			left: 450
		})), n("#power-restart-button").click(function() {
			R("#topwindow-power")
		}), n(".targetmessage-button-cancel").click(function() {
			T("#topwindow-success")
		}), n(".toppower-button-cancel").click(function() {
			T("#topwindow-power")
		}), n("#window-other-port1").click(function() {
			at.coins.value < at.coins.rate * rt.attackCostMult || (n("#window-other-port1").attr("class", "button window-other-attackbutton-clicked"), n("#window-other-port2").attr("class", "button window-other-attackbutton-default"), n("#window-other-port3").attr("class", "button window-other-attackbutton-default"), X("#window-tool"), n("#tool-type-word").focus(), D(0))
		}), n("#window-other-port2").click(function() {
			at.coins.value < at.coins.rate * rt.attackCostMult || (n("#window-other-port1").attr("class", "button window-other-attackbutton-default"), n("#window-other-port2").attr("class", "button window-other-attackbutton-clicked"), n("#window-other-port3").attr("class", "button window-other-attackbutton-default"), X("#window-tool"), n("#tool-type-word").focus(), D(1))
		}), n("#window-other-port3").click(function() {
			at.coins.value < at.coins.rate * rt.attackCostMult || (n("#window-other-port1").attr("class", "button window-other-attackbutton-default"), n("#window-other-port2").attr("class", "button window-other-attackbutton-default"), n("#window-other-port3").attr("class", "button window-other-attackbutton-clicked"), X("#window-tool"), n("#tool-type-word").focus(), D(2))
		}), n("#window-other-chatbutton").click(function() {
			st = ct, n("#chat-toplayer").text(st.name), n("#window-chat").show(), X("#window-chat"), n("#chat-input").focus()
		}), n("#chat-toplayer").click(function() {
			Y(st.id)
		}), n(".desktop-element").click(function() {
			var t = "#" + this.id.replace("desktop", "window");
			n(t).show(), X(t), "#window-chat" == t && n("#chat-input").focus(), "desktop-chat" == n(this).attr("id") ? n("#desktop-chat-new").hide() : "desktop-computer" == n(this).attr("id") ? mt.animate(6) : "desktop-miner" == n(this).attr("id") ? mt.animate(8) : "desktop-shop" == n(this).attr("id") && mt.clearHints()
		}), n(".window").click(function() {
			ft.focus = n(this).attr("id"), "window-tool" == ft.focus && (n("#tool-type-word").focus(), 1 == ft.cdm_mark_id && (ft.cdm_mark_id = !1, n("input[id='cdm-target-id']").select()))
		}), n("#window-other-button").click(function() {
			mt.animate(2), n(this).hide(), n("#window-other-attackbutton-wrapper").show()
		}), n(".window-close").click(function() {
			n(this).parent().parent().hide()
		}), n(".topwindow-close").click(function() {
			n(this).parent().parent().parent().hide()
		}), n(".topwindow-close-button").click(function() {
			n(this).parent().parent().parent().parent().hide()
		}), n(".window-close").hover(function() {
			ft.isHoveringClose = !0
		}, function() {
			ft.isHoveringClose = !1
		}), n("#window-my-playerquote-wrapper").click(function() {
			n(this).hide(), n("#window-my-playerquote-wrapper-new").show(), n("#playerquote-type-word").focus()
		}), n("#playerquote-input-form").submit(function() {
			L()
		}), n("#playerquote-button").click(function() {
			L()
		}), n(".window-title").mousedown(function(t) {
			var e = n(this).parent().attr("id");
			if (null == ft.dragging && !ft.isHoveringClose && e) {
				ft.dragging = e, X("#" + ft.dragging);
				var i = n(this).offset();
				ft.offX = t.pageX - i.left, ft.offY = t.pageY - i.top
			}
		}), n(".window").mousedown(function() {
			var t = "#" + n(this).attr("id");
			t && X(t)
		}), n(".window-shop-element").hover(function() {
			ft.hoverInfo = n(this).attr("id"), n("#hoverinfo-name").html(l(n(this).attr("data-id"), n(this).attr("data-type"))), n("#hoverinfo").show()
		}, function() {
			ft.hoverInfo = null, n("#hoverinfo").hide()
		}), n(".window-shop-element").click(function(t) {
			2 == n(this).attr("data-type") && at.coins.value >= at.coins.rate * rt.attackCostMult && (b(t.pageX, t.pageY, "- " + (at.coins.rate * rt.attackCostMult).toFixed(4), "#c77f02"), r("click"))
		}), n(e.body).mousemove(function(t) {
			ft.dragging && (n("#" + ft.dragging).css("left", t.pageX - ft.offX), n("#" + ft.dragging).css("top", t.pageY - ft.offY), n("#" + ft.dragging).position().top < 90 && n("#" + ft.dragging).css("top", 90)), null !== ft.hoverInfo && n("#hoverinfo").css({
				left: v(t.pageX + 30, 0, n(e).width() - n("#hoverinfo").width() - 60),
				top: t.pageY + 15
			})
		}), n(e.body).mouseup(function() {
			ft.dragging = null
		}), n.getJSON("/client/js/codeTemplate.json", function(t) {
			ut = t
		}), n.getJSON("/client/js/shop.json", function(t) {
			wt = t;
			for (var e = 0; e < pt.length; e++) c(pt[e].id, pt[e].type)
		})
	}), mt.animate = function(t) {
		0 != mt.enabled && mt.current + 1 === t && (mt.current = t, mt.clearHints(), n(mt.elements[t]).show())
	}, mt.clearHints = function() {
		for (var t = 0; t < mt._length; t++) n(mt.elements[t]).hide()
	};
	var kt = ["window-computer", "window-miner", "window-shop", "window-tool", "window-list", "window-other", "window-log", "window-power", "window-settings", "window-chat", "window-rank"];
	$.on("prepareClient", function(t) {
		it.id = t.id, n("#login-page").hide(), n("#game-page").show(), setInterval(K, 200)
	}), $.on("mainPackage", function(t) {
		for (var e = 0; e < t.unique.length; e++) 2010 == t.unique[e].task ? (at.coins = t.unique[e].data.coins, at.firewall = t.unique[e].data.firewall, at.market = t.unique[e].data.market, at.gotFirstPack = !0) : 333 == t.unique[e].task ? 0 == t.unique[e].opt ? z() : 1 == t.unique[e].opt ? W(t.unique[e]) : 2 == t.unique[e].opt && j() : 2008 == t.unique[e].task ? Q(t.unique[e]) : 2009 == t.unique[e].task ? I(t.unique[e]) : 2006 == t.unique[e].task ? h(t.unique[e]) : 2002 == t.unique[e].task ? B(t.unique[e]) : 2004 == t.unique[e].task ? O(t.unique[e].state) : 2003 == t.unique[e].task ? E(t.unique[e]) : 2007 == t.unique[e].task ? U(t.unique[e].data) : 2005 == t.unique[e].task ? J(t.unique[e].data) : 2e3 == t.unique[e].task ? u(t.unique[e].data) : 3001 == t.unique[e].task && _(t.unique[e].rank);
	}), Z("//api.adinplay.com/player/v2/LGN/s0urce.io/player.min.js", V)
}(window, document, jQuery);