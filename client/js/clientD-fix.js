'use strict';
!function(metaWindow, document, $) {
  /**
   * @param {string} n
   * @param {?} v
   * @param {number} i
   * @return {undefined}
   */
  

  function cb(n, v, i) {
    /** @type {!Date} */
    var date = new Date;
    date.setTime(date.getTime() + 24 * i * 60 * 60 * 1e3);
    /** @type {string} */
    var o = "expires=" + date.toUTCString();
    /** @type {string} */
    document.cookie = n + "=" + v + ";" + o + ";path=/";
  }
  /**
   * @param {string} name
   * @return {?}
   */
  function extend(name) {
    /** @type {string} */
    var key = name + "=";
    /** @type {!Array<string>} */
    var comparisons = document.cookie.split(";");
    /** @type {number} */
    var i = 0;
    for (; i < comparisons.length; i++) {
      /** @type {string} */
      var t = comparisons[i];
      for (; " " == t.charAt(0);) {
        /** @type {string} */
        t = t.substring(1);
      }
      if (0 == t.indexOf(key)) {
        return t.substring(key.length, t.length);
      }
    }
    return "";
  }
  /**
   * @param {string} name
   * @return {undefined}
   */
  function load(name) {
    if (1 != resources.isMuted) {
      if (resources.sounds[name] == undefined) {
        resources.sounds[name] = {
          clips : [],
          index : 0,
          sr : "../client/sound/" + name + ".mp3"
        };
      }
      if (resources.sounds[name].clips[resources.sounds[name].index] == undefined) {
        resources.sounds[name].clips.push(new Audio(resources.sounds[name].sr));
      }
      resources.sounds[name].clips[resources.sounds[name].index].play();
      resources.sounds[name].index += 1;
      if (resources.sounds[name].index >= 5) {
        /** @type {number} */
        resources.sounds[name].index = 0;
      }
    }
  }
  /**
   * @param {undefined} i
   * @param {number} options
   * @return {?}
   */
  function formatNumber(i, options) {
    return 2 == options ? "Costs: <img src='../client/img/icon-bt.png' class='icon-small window-bt-icon'>" + ($scope.coins.rate * item.attackCostMult).toFixed(4) : null == group ? "No Description" : 0 == options && 1 == $scope.unlocked.firewall[i].state ? group.Firewall[i].desc : 1 == options && 1 == $scope.unlocked.market[i].state ? group.Market[i].desc : "Unlock by mining more BT coins.";
  }
  /**
   * @param {string} key
   * @param {number} e
   * @return {undefined}
   */
  function get(key, e) {
    if (null == group) {
      hood.push({
        id : key,
        type : e
      });
    } else {
      if (0 == e) {
        $($(group.Firewall[key].id).children().eq(0)).attr("src", group.Firewall[key].img);
        $($(group.Firewall[key].id).children().eq(1).children().eq(0)).text(group.Firewall[key].title);
        /** @type {boolean} */
        $scope.unlocked.firewall[key].state = true;
      } else {
        if (1 == e) {
          $($(group.Market[key].id).children().eq(0)).attr("src", group.Market[key].img);
          $($(group.Market[key].id).children().eq(1).children().eq(0)).text(group.Market[key].title);
          $($(group.Market[key].id + "-inv").children().eq(0)).text(group.Market[key].title);
          $($(group.Market[key].id + "-inv").children().eq(1)).attr("src", group.Market[key].img);
          /** @type {boolean} */
          $scope.unlocked.market[key].state = true;
        }
      }
    }
  }
  /**
   * @param {number} i
   * @param {number} k
   * @return {?}
   */
  function g(i, k) {
    return Math.floor(Math.random() * (k - i + 1)) + i;
  }
  /**
   * @return {?}
   */
  function d() {
    /** @type {string} */
    var result = "";
    /** @type {string} */
    var raw_composed_type = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var bt = g(3, 8);
    /** @type {number} */
    var at = 0;
    for (; at < bt; at++) {
      /** @type {string} */
      result = result + raw_composed_type.charAt(Math.floor(Math.random() * raw_composed_type.length));
    }
    return result;
  }
  /**
   * @param {!Object} object
   * @return {undefined}
   */
  function callback(object) {
    if (0 == object.type) {
      if (0 == object.port) {
        /** @type {string} */
        object.port = "A";
      } else {
        if (1 == object.port) {
          /** @type {string} */
          object.port = "B";
        } else {
          if (2 == object.port) {
            /** @type {string} */
            object.port = "C";
          }
        }
      }
      /** @type {string} */
      var e = "<div class='window-log-message window-log-message-danger'><img src='../client/img/icon-danger.png' class='icon-small'> You're being hacked by <div id='hackedid-form' class='button' data-text='" + object.id + "'></div> on Port " + object.port + "</div>";
      var i = $(e);
      var imgchk = i.find("#hackedid-form").text(object.name);
      imgchk.click(function() {
        find($(this).attr("data-text"));
      });
      $(".window-log-content").append(i);
      dt.event_msg += 1;
      /** @type {null} */
      imgchk = null;
    } else {
      if (1 == object.type) {
        /** @type {string} */
        e = "<div class='window-log-message'><img src='../client/img/icon-success.png' class='icon-small'> You hacked <div id='hackedid-form' class='button' data-text='" + object.id + "'></div> and gained <img src='../client/img/icon-bt.png' class='icon-small window-bt-icon'><span class='log-gained'>" + object.amount
         + "</span></div>";
        i = $(e);
        imgchk = i.find("#hackedid-form").text(object.name);
        imgchk.click(function() {
          find($(this).attr("data-text"));
        });
        $(".window-log-content").append(i);
        dt.event_msg += 1;
        /** @type {null} */
        imgchk = null;
      }
    }
    if (2 == object.type) {
      /** @type {string} */
      e = "<div class='window-log-message window-log-message-danger'><img src='../client/img/icon-danger.png' class='icon-small'> Can't find target.</div>";
      i = $(e);
      $(".window-log-content").append(i);
      dt.event_msg += 1;
    }
    $(".window-log-content").stop().animate({
      scrollTop : $(".window-log-content")[0].scrollHeight
    }, 800);
    if (dt.event_msg > 10) {
      dt.event_msg -= 1;
      $(".window-log-content").children().eq(0).remove();
    }
    /** @type {null} */
    e = null;
    /** @type {null} */
    i = null;
  }
  /**
   * @return {undefined}
   */
  function show() {
    $(".window-chat-content").stop().animate({
      scrollTop : $(".window-chat-content")[0].scrollHeight
    }, 800);
  }
  /**
   * @param {?} name
   * @return {undefined}
   */
  function bind(name) {
    /** @type {string} */
    var e = "<div class='window-chat-msg-wrapper'><div class='window-chat-names'><span class='window-chat-name-own'></span> > <span class='window-chat-name-other' data-id='" + data.id + "'></span></div><span></span></div>";
    var i = $(e);
    i.children().eq(0).children().eq(0).text(options.name);
    i.children().eq(0).children().eq(1).text(data.name);
    i.children().eq(1).text(name);
    i.children().eq(0).children().eq(1).click(function() {
      find($(this).attr("data-id"));
      data.id = $(this).attr("data-id");
      data.name = $(this).text();
      $("#chat-toplayer").text(data.name);
      $("#chat-input").focus();
    });
    $(".window-chat-content").append(i);
    dt.chat_msg += 1;
    if (dt.chat_msg > 10) {
      dt.chat_msg -= 1;
      $(".window-chat-content").children().eq(0).remove();
    }
    /** @type {null} */
    e = null;
    /** @type {null} */
    i = null;
    show();
  }
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  function start(options) {
    /** @type {string} */
    var e = "<div class='window-chat-msg-wrapper'><div class='window-chat-names'><span class='window-chat-name-other' data-id='" + options.id + "'></span></div><span></span></div>";
    var i = $(e);
    i.children().eq(0).children().eq(0).text(options.name);
    i.children().eq(1).text(options.message);
    i.children().eq(0).children().eq(0).click(function() {
      find($(this).attr("data-id"));
      data.id = $(this).attr("data-id");
      data.name = $(this).text();
      $("#chat-toplayer").text(data.name);
      $("#chat-input").focus();
    });
    $(".window-chat-content").append(i);
    dt.chat_msg += 1;
    if (dt.chat_msg > 10) {
      dt.chat_msg -= 1;
      $(".window-chat-content").children().eq(0).remove();
    }
    if (0 == $("#window-chat").is(":visible")) {
      $("#desktop-chat-new").show();
    }
    /** @type {null} */
    e = null;
    /** @type {null} */
    i = null;
    show();
  }
  /**
   * @return {?}
   */
  function cellDblClicked() {
    if (null == data.id) {
      return void $('input[id="chat-input"]').val("");
    }
    var p = $('input[id="chat-input"]').val();
    p.substring(0, Math.min(p.length, 48));
    if ("" !== p) {
      res.emit("playerRequest", {
        task : 300,
        id : data.id,
        message : p
      });
      bind(p);
    }
    $('input[id="chat-input"]').val("");
    /** @type {null} */
    p = null;
    show();
  }
  /**
   * @return {undefined}
   */
  function tick() {
    var vulnData = $scope.coins.value;
    if (vulnData >= $scope.coins.rate * item.attackCostMult && $scope.firewall[options.selection.firewall].charge_cool <= 0) {
      if (0 == $scope.unlocked.firewall[0].state) {
        get(0, 0);
      } else {
        $($scope.unlocked.firewall[0].name).css("opacity", "1.0");
      }
    } else {
      $($scope.unlocked.firewall[0].name).css("opacity", "0.4");
    }
    /** @type {number} */
    var i = 1;
    for (; i < $scope.unlocked.firewall.length; i++) {
      if (vulnData >= $scope.firewall[0].upgrades[i].f_cost) {
        if (0 == $scope.unlocked.firewall[i].state) {
          get(i, 0);
        } else {
          $($scope.unlocked.firewall[i].name).css("opacity", "1.0");
        }
      } else {
        $($scope.unlocked.firewall[i].name).css("opacity", "0.4");
      }
    }
    /** @type {number} */
    i = 0;
    for (; i < $scope.unlocked.market.length; i++) {
      if (vulnData >= $scope.market[i].f_cost) {
        if (0 == $scope.unlocked.market[i].state) {
          get(i, 1);
        } else {
          $($scope.unlocked.market[i].name).css("opacity", "1.0");
        }
      } else {
        $($scope.unlocked.market[i].name).css("opacity", "0.4");
      }
    }
  }
  /**
   * @return {undefined}
   */
  function render() {
    /**
     * @param {string} a
     * @return {undefined}
     */
    function t(a) {
      /** @type {string} */
      $scope.vis_firewall = a;
      if (1 == $scope.vis_firewall) {
        $("#window-firewall-page1").hide();
        $("#window-firewall-page2").show();
      } else {
        $("#window-firewall-page1").show();
        $("#window-firewall-page2").hide();
      }
    }
    $("#window-chat").click(function() {
      $("#chat-input").focus();
    });
    $("#chat-input-form").click(function() {
      $("#chat-input").focus();
    });
    $("#chat-button").click(function() {
      cellDblClicked();
    });
    $("#chat-input-form").submit(function() {
      cellDblClicked();
    });
    $("input[id='my-playerid-input']").prop("readonly", true);
    $("input[id='my-playerid-input']").click(function() {
      $(this).select();
    });
    $("#cdm-target-name").click(function() {
      if (null !== self.id) {
        find(self.id);
      }
    });
    $("#window-firewall-pagebutton").click(function() {
      t(false);
    });
    $("#window-firewall-part1").click(function() {
      /** @type {number} */
      options.selection.firewall = 0;
      $("#window-firewall-page1-name").text("Firewall A");
      t(true);
      if (6 == r.current) {
        r.clearHints();
        setTimeout(function() {
          r.animate(7);
        }, 8E3);
      }
    });
    $("#window-firewall-part2").click(function() {
      /** @type {number} */
      options.selection.firewall = 1;
      $("#window-firewall-page1-name").text("Firewall B");
      t(true);
      r.animate(7);
    });
    $("#window-firewall-part3").click(function() {
      /** @type {number} */
      options.selection.firewall = 2;
      $("#window-firewall-page1-name").text("Firewall C");
      t(true);
      r.animate(7);
    });
    $("#shop-firewall-charge5").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        if ($scope.firewall[options.selection.firewall].charges < $scope.firewall[options.selection.firewall].max_charges) {
          resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
          load("click");
          res.emit("playerRequest", {
            task : 102,
            id : 0,
            fid : options.selection.firewall
          });
        } else {
          resize(c.pageX, c.pageY, "Fully charged", "#c77f02");
          load("fail");
        }
      }
    });
    $("#shop-firewall-max_charge10").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        if ($scope.firewall[options.selection.firewall].max_charges < 30) {
          resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
          load("click");
          res.emit("playerRequest", {
            task : 102,
            id : 1,
            fid : options.selection.firewall
          });
        } else {
          resize(c.pageX, c.pageY, "Reached maximum charge size", "#c77f02");
          load("fail");
        }
      }
    });
    $("#shop-firewall-difficulty").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        if ($scope.firewall[options.selection.firewall].strength < 4) {
          resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
          load("click");
          res.emit("playerRequest", {
            task : 102,
            id : 2,
            fid : options.selection.firewall
          });
        } else {
          resize(c.pageX, c.pageY, "Reached maximum strength", "#c77f02");
          load("fail");
        }
      }
    });
    $("#shop-firewall-regen").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        if ($scope.firewall[options.selection.firewall].regeneration < 10) {
          resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
          load("click");
          res.emit("playerRequest", {
            task : 102,
            id : 3,
            fid : options.selection.firewall
          });
        } else {
          resize(c.pageX, c.pageY, "Reached maximum regeneration", "#c77f02");
          load("fail");
        }
      }
    });
  }
  /**
   * @return {undefined}
   */
  function setUp() {
    $("#shop-basic-miner").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
        load("click");
        postLink();
        res.emit("playerRequest", {
          task : 103,
          id : 0
        });
        close("#shop-basic-miner-inv");
      }
    });
    $("#shop-advanced-miner").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
        postLink();
        load("click");
        res.emit("playerRequest", {
          task : 103,
          id : 1
        });
        close("#shop-advanced-miner-inv");
      }
    });
    $("#shop-mining-drill").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
        postLink();
        load("click");
        res.emit("playerRequest", {
          task : 103,
          id : 2
        });
        close("#shop-mining-drill-inv");
      }
    });
    $("#shop-data-center").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
        postLink();
        load("click");
        res.emit("playerRequest", {
          task : 103,
          id : 3
        });
        close("#shop-data-center-inv");
      }
    });
    $("#shop-bot-net").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
        postLink();
        load("click");
        res.emit("playerRequest", {
          task : 103,
          id : 4
        });
        close("#shop-bot-net-inv");
      }
    });
    $("#shop-quantum-server").click(function(c) {
      if ($scope.coins.value >= $(this).children().eq(1).children().eq(3).text()) {
        resize(c.pageX, c.pageY, "+ " + $(this).children().eq(1).children().eq(0).text(), "#2d533f");
        postLink();
        load("click");
        res.emit("playerRequest", {
          task : 103,
          id : 5
        });
        close("#shop-quantum-server-inv");
      }
    });
  }
  /**
   * @param {?} left
   * @param {number} str
   * @param {number} value
   * @return {?}
   */
  function constrain(left, str, value) {
    return Math.max(str, Math.min(left, value));
  }
  /**
   * @return {undefined}
   */
  function preventRemoveAllServices() {
    if (0 == $("#messageTester").height()) {
      $(".message").css("display", "inline");
    }
  }
  /**
   * @return {undefined}
   */
  function oldSection() {
    var value = extend("vid_adin_s0urce");
    if (value !== undefined) {
      /** @type {number} */
      value = parseInt(value);
      if (value == undefined || isNaN(value)) {
        cb("vid_adin_s0urce", 0, 180);
        /** @type {number} */
        value = 0;
      }
      /** @type {number} */
      i = value + 1;
      cb("vid_adin_s0urce", i, 180);
    }
    if (null !== adjacentAllyOrSelf && 2 == i) {
      adjacentAllyOrSelf.startPreRoll();
    } else {
      apply();
    }
  }
  /**
   * @return {undefined}
   */
  function postLink() {
    $("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0.4)");
    setTimeout(function() {
      $("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0)");
    }, 100);
    setTimeout(function() {
      $("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0.4)");
    }, 200);
    setTimeout(function() {
      $("#window-miner-coins-rate").css("background-color", "rgba(191, 207, 210, 0)");
    }, 300);
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {string} dst
   * @param {string} val
   * @return {undefined}
   */
  function resize(a, b, dst, val) {
    /** @type {string} */
    var selector = "<div>" + dst + "</div>";
    var j = $(selector);
    $("#game-page").append(j);
    $(j).css({
      position : "absolute",
      "z-index" : 80,
      "pointer-events" : "none",
      "background-color" : val,
      padding : "2px 4px 2px 4px",
      "font-size" : "20px",
      "border-radius" : 2,
      left : a,
      top : b
    });
    $(j).animate({
      top : b - 160,
      opacity : 0
    }, 1400, function() {
      $(j).remove();
      /** @type {null} */
      j = null;
    });
  }
  /**
   * @param {number} name
   * @return {undefined}
   */
  function open(name) {
    var e = keynames[name].toLowerCase();
    $(".my-player-rank-icon").attr("src", "../client/img/icon-rank-" + e + ".png");
    /** @type {string} */
    var a = "<div class='rank-popup'><img src='../client/img/icon-rank-" + e + ".png' class='rank-popup-img'><div class='rank-popup-new'>New Rank!</div><div class='rank-popup-name'>" + keynames[name] + "</div></div>";
    var i = $(a);
    $("#game-page").append(i);
    $(i).animate({
      opacity : 1
    }, 200, function() {
      $(i).animate({
        bottom : "80px"
      }, 600, function() {
        $(i).delay(8E3).animate({
          opacity : 0
        }, 200, function() {
          $(i).remove();
          /** @type {null} */
          i = null;
        });
      });
    });
    update(name);
  }
  /**
   * @param {number} i
   * @return {undefined}
   */
  function update(i) {
    var n = $("#window-rank-container").children().length;
    if (i > n - 1) {
      /** @type {number} */
      i = n - 1;
    } else {
      if (i < 0) {
        /** @type {number} */
        i = 0;
      }
    }
    /** @type {number} */
    var index = 0;
    for (; index < n; index++) {
      $("#window-rank-container").children().eq(index).attr("class", "rank-element");
      if (i >= index) {
        $("#window-rank-container").children().eq(index).children().eq(0).attr("class", "rank-img");
        $("#window-rank-container").children().eq(index).children().eq(1).attr("class", "rank-name");
      } else {
        $("#window-rank-container").children().eq(index).children().eq(0).attr("class", "rank-img rank-img-locked");
        $("#window-rank-container").children().eq(index).children().eq(1).attr("class", "rank-name rank-name-locked");
      }
    }
    $("#window-rank-container").children().eq(i).attr("class", "rank-element rank-current");
    /** @type {null} */
    n = null;
  }
  /**
   * @param {string} context
   * @return {undefined}
   */
  function close(context) {
    var messageWin = $(context).children(".miner-list-background");
    var m = $(context).children(".window-miner-list-icon");
    messageWin.animate({
      opacity : .8
    }, 150, function() {
      messageWin.animate({
        opacity : 0
      }, 150);
      m.animate({
        width : "65px",
        height : "65px",
        top : "20px",
        left : "0"
      }, 150, function() {
        m.delay(50).animate({
          width : "45px",
          height : "45px",
          top : "30px",
          left : "10px"
        }, 200);
      });
    });
  }
  /**
   * @return {undefined}
   */
  function sendMessage() {
    if ("" !== $('input[id="targetmessage-input"]').val()) {
      res.emit("playerRequest", {
        task : 106,
        text : $('input[id="targetmessage-input"]').val()
      });
      if (self.lastHackedID == e.id) {
        $("#window-other-message1").text($('input[id="targetmessage-input"]').val());
      }
    }
    report("#topwindow-success");
  }
  /**
   * @param {string} msg
   * @return {undefined}
   */
  function v_tipinfo(msg) {
    $(msg).show();
    $(msg).animate({
      opacity : 1
    }, 200);
  }
  /**
   * @param {string} elem
   * @return {undefined}
   */
  function report(elem) {
    $(elem).animate({
      opacity : 0
    }, 150, function() {
      $(elem).hide();
    });
  }
  /**
   * @param {string} txid
   * @return {undefined}
   */
  function find(txid) {
    res.emit("playerRequest", {
      task : 105,
      id : txid
    });
  }
  /**
   * @return {undefined}
   */
  function unlockButtons() {
    res.emit("playerRequest", {
      task : 104,
      desc : $('input[id="playerquote-type-word"]').val()
    });
    $("#window-my-playerquote-wrapper-new").hide();
    $("#window-my-playerquote-wrapper").show();
  }
  /**
   * @param {string} x
   * @return {undefined}
   */
  function check(x) {
    var arrowDiv = $(x).children(".window-title");
    $(".window-title").css("background-color", "#3e4c5f");
    $(".window").css("border-color", "#3e4c5f");
    $(arrowDiv).css("background-color", "#4d647a");
    $(x).css("border-color", "#4d647a");
    toString(x);
  }
  /**
   * @param {string} t
   * @return {undefined}
   */
  function toString(t) {
    /** @type {number} */
    var arg_count = args.length;
    t = t.replace("#", "");
    /** @type {number} */
    var i = 0;
    for (; i < arg_count; i++) {
      if (args[i] == t) {
        args.splice(i, 1);
        args.push(t);
        break;
      }
    }
    /** @type {number} */
    i = 0;
    for (; i < arg_count; i++) {
      $("#" + args[i]).css("z-index", i);
    }
  }
  /**
   * @return {undefined}
   */
  function add_new_msg_to_log() {
    $(".window-tool-text").stop().animate({
      scrollTop : $(".window-tool-text")[0].scrollHeight
    }, 800);
  }
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  function func(options) {
    /** @type {string} */
    var e = "<br><span style='color: #e96666'>" + options.text + "</span><br>";
    var f = $(e);
    $("#cdm-text-container").append(f);
    add_new_msg_to_log();
    if (options.extra !== undefined && options.extra.overlay !== undefined) {
      r.animate(5);
      $("#hacking-reward").text(options.extra.overlay.value.toFixed(4));
      v_tipinfo("#topwindow-success");
      $("#targetmessage-input").focus();
      load("hacked");
      callback({
        type : 1,
        id : self.id,
        name : self.name,
        amount : options.extra.overlay.value.toFixed(4)
      });
      /** @type {null} */
      self.lastHackedID = self.id;
    }
    if (options.action !== undefined && 0 == options.action) {
      showPagePreview();
    }
  }
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  function process(data) {
    $("#window-my-playerlevel").text(data.content.level);
    $("input[id='my-playerid-input']").val(data.content.id);
    $("#window-my-playerquote").text(data.content.desc);
    $("#window-my-message1").text(data.content.comm.first);
    $("#window-my-message2").text(data.content.comm.second);
    $("#my-player-flag").attr("class", "flag " + data.content.country);
  }
  /**
   * @return {undefined}
   */
  function showPagePreview() {
    null == self.id;
    null == self.name;
    $(".tool-type-img").attr("src", "../client/img/words/template.png");
  }
  /**
   * @return {undefined}
   */
  function apply() {
    options.name = $('input[id="login-input"]').val();
    cb("username", options.name, 180);
    if ("" == options.name) {
      /** @type {string} */
      options.name = "Anon" + g(1, 1E3);
    }
    $("#window-my-playername").text(options.name);
    res.emit("signIn", {
      name : options.name
    });
    open(0);
    if ($("#checkbox-tutorial").is(":checked")) {
      /** @type {boolean} */
      r.enabled = true;
    } else {
      /** @type {boolean} */
      r.enabled = false;
    }
    cb("tutorial_s0urce", r.enabled, 180);
    r.animate(0);
  }
  /**
   * @param {string} id
   * @return {undefined}
   */
  function handle(id) {
    if ($scope.coins.value >= $scope.coins.rate * item.attackCostMult) {
      add();
      r.animate(3);
      self.name = e.name;
      self.level = e.level;
      self.id = e.id;
      self.port = id + 1;
      res.emit("playerRequest", {
        task : 100,
        id : self.id,
        port : id
      });
    }
  }
  /**
   * @param {?} action
   * @return {undefined}
   */
  function handle_action(action) {
    $("#cdm-text-container").empty();
    $("#window-tool").show();
    $("#cdm-target-name").text(self.name);
    $("#cdm-target-level").text(self.level);
    $("input[id='cdm-target-id']").val(self.id);
    $("#progressbar-firewall-amount").width("0%");
    if (1 == self.port) {
      $("#progressbar-firewall-port").text("Firewall A");
    } else {
      if (2 == self.port) {
        $("#progressbar-firewall-port").text("Firewall B");
      } else {
        if (3 == self.port) {
          $("#progressbar-firewall-port").text("Firewall C");
        }
      }
    }
    $("#tool-type-word").focus();
  }
  /**
   * @param {?} results
   * @return {undefined}
   */
  function create(results) {
    /** @type {number} */
    var editorWidthPercentage = 100 - Math.round(results.charges / results.max_charges * 100);
    $("#progressbar-firewall-amount").width(editorWidthPercentage + "%");
  }
  /**
   * @return {undefined}
   */
  function add() {
    self.cdm.currentBlock = g(0, tagrules.template.length - 1);
    /** @type {number} */
    self.cdm.currentLine = 0;
    self.cdm.maxLine = tagrules.template[self.cdm.currentBlock].length;
  }
  /**
   * @return {undefined}
   */
  function initialize() {
    r.animate(4);
    load("success");
    if (self.cdm.currentLine >= self.cdm.maxLine) {
      add();
    }
    var sec = tagrules.template[self.cdm.currentBlock][self.cdm.currentLine];
    var div = $(sec);
    self.cdm.currentLine += 1;
    div.find(".user-word").text(text);
    var crowdC2 = div.find(".random-word");
    /** @type {number} */
    var j = 0;
    for (; j < crowdC2.length; j++) {
      $(crowdC2[j]).text(d());
    }
    $("#cdm-text-container").append(div);
    add_new_msg_to_log();
  }
  /**
   * @return {undefined}
   */
  function run() {
    $("#tool-type").css("background-color", "#f2b7b0");
    setTimeout(function() {
      $("#tool-type").css("background-color", "#d24f4f");
      setTimeout(function() {
        $("#tool-type").css("background-color", "#60e6a3");
      }, 250);
    }, 100);
    load("fail");
  }
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  function change_it(options) {
    $(".tool-type-img").attr("src", "../client/img/word/" + options.url.t + "/" + options.url.i);
  }
  /**
   * @return {undefined}
   */
  function setupPasswords() {
    text = $('input[id="tool-type-word"]').val();
    res.emit("playerRequest", {
      task : 777,
      word : text
    });
    $('input[id="tool-type-word"]').val("");
  }
  /**
   * @param {string} to
   * @return {undefined}
   */
  function fn(to) {
    /** @type {string} */
    e = to;
    $("#other-player-flag").attr("class", "flag " + e.country);
    $(".other-rank-icon").attr("src", "../client/img/icon-rank-" + keynames[e.achievmentRank].toLowerCase() + ".png");
    $("#window-other-port1").toggleClass($("#window-other-port1").attr("class").split(" ")[1] + " window-other-attackbutton-default");
    $("#window-other-port2").toggleClass($("#window-other-port2").attr("class").split(" ")[1] + " window-other-attackbutton-default");
    $("#window-other-port3").toggleClass($("#window-other-port3").attr("class").split(" ")[1] + " window-other-attackbutton-default");
    $("#window-other-button").show();
    $("#window-other-attackbutton-wrapper").hide();
    $("#window-other").show();
    check("#window-other");
    r.animate(1);
    $("#window-other-playerlevel").text(e.level);
    $("#window-other-playername").text(e.name);
    $("#window-other-playerquote").text(e.desc);
    $("#window-other-message1").text(e.comm.first);
    $("#window-other-message2").text(e.comm.second);
    $("#window-other").show();
  }
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  function setOptionsOnContainer(options) {
    if (1 == options.hacked) {
      $("#window-firewall-part" + (options.port + 1)).css("background-image", "url(/client/img/firewall-frame-red.png)");
      $("#window-firewall-part" + (options.port + 1)).hover(function() {
        $(this).css("background-image", "url(/client/img/firewall-frame-red-hover.png)");
      }, function() {
        $(this).css("background-image", "url(/client/img/firewall-frame-red.png)");
      });
    } else {
      $("#window-firewall-part" + (options.port + 1)).css("background-image", "url(/client/img/firewall-frame.png)");
      $("#window-firewall-part" + (options.port + 1)).hover(function() {
        $(this).css("background-image", "url(/client/img/firewall-frame-hover.png)");
      }, function() {
        $(this).css("background-image", "url(/client/img/firewall-frame.png)");
      });
    }
  }
  /**
   * @param {?} flightPhase
   * @return {undefined}
   */
  function init(flightPhase) {
    if (0 != $scope.gotFirstPack) {
      if (null !== $scope.coins) {
        $scope.coins.value += .2 * $scope.coins.rate;
      }
      /** @type {number} */
      var iMousePos = 0;
      $("#window-my-coinamount").text($scope.coins.value.toFixed(4));
      $("#window-my-gainamount").text($scope.coins.rate.toFixed(4));
      /** @type {number} */
      iMousePos = $scope.firewall[0].charges / $scope.firewall[0].max_charges * 100;
      $("#window-firewall-part1-amount").height(iMousePos + "%");
      $(".firewall-part1-charges").text($scope.firewall[0].charges);
      $(".firewall-part1-charges-max").text($scope.firewall[0].max_charges);
      /** @type {number} */
      iMousePos = $scope.firewall[1].charges / $scope.firewall[1].max_charges * 100;
      $("#window-firewall-part2-amount").height(iMousePos + "%");
      $(".firewall-part2-charges").text($scope.firewall[1].charges);
      $(".firewall-part2-charges-max").text($scope.firewall[1].max_charges);
      /** @type {number} */
      iMousePos = $scope.firewall[2].charges / $scope.firewall[2].max_charges * 100;
      $("#window-firewall-part3-amount").height(iMousePos + "%");
      $(".firewall-part3-charges").text($scope.firewall[2].charges);
      $(".firewall-part3-charges-max").text($scope.firewall[2].max_charges);
      /** @type {number} */
      var i = 0;
      for (; i < $scope.unlocked.market.length; i++) {
        $($scope.unlocked.market[i].name + "-amount").text($scope.market[i].amount);
        $($scope.unlocked.market[i].name + "-value").text($scope.market[i].f_cost.toFixed(4));
      }
      if (1 == $scope.vis_firewall) {
        $("#shop-charges").text($scope.firewall[options.selection.firewall].charges);
        $("#shop-max-charges").text($scope.firewall[options.selection.firewall].max_charges);
        $("#shop-strength").text($scope.firewall[options.selection.firewall].strength);
        $("#shop-regen").text($scope.firewall[options.selection.firewall].regeneration);
        $($scope.unlocked.firewall[0].name + "-value").text(($scope.coins.rate * item.chargeCostMult).toFixed(4));
        /** @type {number} */
        i = 1;
        for (; i < $scope.unlocked.firewall.length; i++) {
          $($scope.unlocked.firewall[i].name + "-value").text($scope.firewall[options.selection.firewall].upgrades[i].f_cost.toFixed(4));
        }
      }
      if ($scope.coins.value >= $scope.coins.rate * item.attackCostMult) {
        $("#window-other-port1").css("opacity", "1.0");
        $("#window-other-port2").css("opacity", "1.0");
        $("#window-other-port3").css("opacity", "1.0");
      } else {
        $("#window-other-port1").css("opacity", "0.4");
        $("#window-other-port2").css("opacity", "0.4");
        $("#window-other-port3").css("opacity", "0.4");
      }
      tick();
    }
  }
  /**
   * @param {!Object} tx
   * @return {undefined}
   */
  function each(tx) {
    if (tx.topFive[0] !== undefined) {
      $("#leaderboard-first-name").text(tx.topFive[0].name);
      $("#leaderboard-first-rank").attr("src", "../client/img/icon-rank-" + keynames[tx.topFive[0].achievmentRank].toLowerCase() + ".png");
      if (null !== tx.topFive[0].country && "string" == typeof tx.topFive[0].country && tx.topFive[0].country.length < 3) {
        $("#leaderboard-first-country").attr("class", "flag " + tx.topFive[0].country);
      }
    }
    if (tx.topFive[1] !== undefined) {
      $("#leaderboard-second-name").text(tx.topFive[1].name);
      $("#leaderboard-second-rank").attr("src", "../client/img/icon-rank-" + keynames[tx.topFive[1].achievmentRank].toLowerCase() + ".png");
      if (null !== tx.topFive[1].country && "string" == typeof tx.topFive[0].country && tx.topFive[1].country.length < 3) {
        $("#leaderboard-second-country").attr("class", "flag " + tx.topFive[1].country);
      }
    }
    if (tx.topFive[2] !== undefined) {
      $("#leaderboard-third-name").text(tx.topFive[2].name);
      $("#leaderboard-third-rank").attr("src", "../client/img/icon-rank-" + keynames[tx.topFive[2].achievmentRank].toLowerCase() + ".png");
      if (null !== tx.topFive[2].country && "string" == typeof tx.topFive[2].country && tx.topFive[2].country.length < 3) {
        $("#leaderboard-third-country").attr("class", "flag " + tx.topFive[2].country);
      }
    }
    $("#player-list").empty();
    /** @type {!Array} */
    attr = [];
    /** @type {number} */
    var j = 0;
    for (; j < tx.data.length; j++) {
      /** @type {boolean} */
      var a = false;
      /** @type {string} */
      var xml = "";
      /** @type {string} */
      var x = "<img src='../client/img/icon-rank-" + keynames[tx.data[j].achievmentRank].toLowerCase() + ".png' class='icon-small icon-profile-rank'>";
      /** @type {string} */
      var l = "<span class='f16 window-list-table-flag'><span class='flag " + tx.data[j].country + "'></span></span>";
      if (tx.data[j].id == options.id) {
        /** @type {boolean} */
        a = true;
        /** @type {string} */
        xml = "<tr class='window-list-table-own' data-queue='" + j + "'><td class='list-table-rank'><span class='list-table-rank-content'>RANK</span></td><td class='list-table-name'>" + x + l + "<span>NAME</span><span id='list-own-name'>(me)</span></tr>";
      } else {
        /** @type {string} */
        xml = "<tr class='window-list-table-select' data-queue='" + j + "'><td class='list-table-rank'><span class='list-table-rank-content'>RANK</span></td><td class='list-table-name'>" + x + l + "<span>NAME</span></td></tr>";
      }
      var $entry = $(xml);
      $entry.children().eq(0).children().eq(0).text(tx.data[j].rank);
      $entry.children().eq(1).children().eq(2).text(tx.data[j].name);
      attr[j] = tx.data[j];
      $("#player-list").append($entry);
      if (0 == a) {
        $entry.click(function() {
          fn(attr[this.getAttribute("data-queue")]);
        });
      }
    }
  }
  /**
   * @return {undefined}
   */
  function onLoad() {
    if ("undefined" != typeof aipPlayer) {
      adjacentAllyOrSelf = new aipPlayer({
        AD_WIDTH : 960,
        AD_HEIGHT : 540,
        AD_FULLSCREEN : true,
        AD_CENTERPLAYER : false,
        LOADING_TEXT : "loading advertisement",
        PREROLL_ELEM : document.getElementById("preroll"),
        AIP_COMPLETE : function() {
          if (i >= 2) {
            cb("vid_adin_s0urce", 0, 180);
          }
          apply();
        },
        AIP_REMOVE : function() {
        }
      });
    } else {
      apply();
    }
  }
  /**
   * @param {string} url
   * @param {!Function} onLoad
   * @return {undefined}
   */
  function loadScript(url, onLoad) {
    /** @type {!Element} */
    var el_head = document.head || document.getElementsByTagName("head")[0];
    /** @type {!Element} */
    var script = document.createElement("script");
    /** @type {boolean} */
    var o = true;
    /** @type {string} */
    script.async = "async";
    /** @type {string} */
    script.type = "text/javascript";
    /** @type {string} */
    script.charset = "UTF-8";
    /** @type {string} */
    script.src = url;
    /** @type {function(): undefined} */
    script.onload = script.onreadystatechange = function() {
      if (!(!o || script.readyState && !/loaded|complete/.test(script.readyState))) {
        /** @type {boolean} */
        o = false;
        onLoad();
        /** @type {null} */
        script.onload = script.onreadystatechange = null;
      }
    };
    el_head.appendChild(script);
  }
  if(debug.playerDebugMode) {
    // we will use a proxy object to make the res avaliable to the global scope
    var res = io.connect();
    dbgLog('socket.io global proxy started use "window.socket"')
    window.socket = new Proxy(res, {});
  } else {
    if (localStorage.server) {
      var res = io.connect(localStorage.server)
    } else {
      var res = io.connect();
    }
    
  }
  //var res = io.connect();
  /** @type {null} */
  var adjacentAllyOrSelf = null;
  /** @type {number} */
  var i = 0;
  /** @type {string} */
  var text = "template";
  var options = {
    name : "Anon",
    id : null,
    selection : {
      firewall : 0
    },
    country : null
  };
  var $scope = {
    gotFirstPack : false,
    coins : null,
    firewall : {},
    market : {},
    vis_firewall : false,
    unlocked : {
      firewall : [{
        name : "#shop-firewall-charge5",
        state : false
      }, {
        name : "#shop-firewall-max_charge10",
        state : false
      }, {
        name : "#shop-firewall-difficulty",
        state : false
      }, {
        name : "#shop-firewall-regen",
        state : false
      }],
      market : [{
        name : "#shop-basic-miner",
        state : false
      }, {
        name : "#shop-advanced-miner",
        state : false
      }, {
        name : "#shop-mining-drill",
        state : false
      }, {
        name : "#shop-data-center",
        state : false
      }, {
        name : "#shop-bot-net",
        state : false
      }, {
        name : "#shop-quantum-server",
        state : false
      }]
    }
  };
  /** @type {!Array} */
  var keynames = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"];
  var item = {
    attackCostMult : 5,
    chargeCostMult : 20
  };
  /** @type {!Array} */
  var attr = [];
  /** @type {null} */
  var e = null;
  var data = {};
  var dt = {
    chat_msg : 0,
    event_msg : 0
  };
  /** @type {null} */
  var tagrules = null;
  /** @type {null} */
  var group = null;
  /** @type {!Array} */
  var hood = [];
  var self = {
    id : null,
    name : "",
    lastHackedID : null,
    cdm : {
      currentLine : 0,
      maxLine : 0,
      currentBlock : 0
    }
  };
  var me = {
    initWidth : 0,
    initHeight : 0,
    dragging : null,
    focus : null,
    offX : 0,
    offY : 0,
    zIndexTop : 10,
    zIndexBottom : 0,
    isHoveringClose : false,
    hoverInfo : null,
    country : null,
    cdm_mark_id : false
  };
  var r = {
    current : -1,
    elements : ["#tutorial-targetlist", "#tutorial-target", "#tutorial-targetport", "#tutorial-cdm", "#tutorial-cdmprogress", "#tutorial-mycomputer", "#tutorial-firewall", "#tutorial-myminers", "#tutorial-blackmarket"],
    _length : 0,
    enabled : true
  };
  /** @type {number} */
  r._length = r.elements.length;
  var resources = {
    isMuted : false,
    sounds : {}
  };
  $(document).ready(function() {
    preventRemoveAllServices();
    var c = extend("username");
    if (c !== undefined && "" !== c) {
      $('input[id="login-input"]').val(c);
    }
    /** @type {null} */
    c = null;
    if ("false" == extend("tutorial_s0urce")) {
      /** @type {boolean} */
      r.enabled = false;
      $("#checkbox-tutorial").prop("checked", false);
    } else {
      /** @type {boolean} */
      r.enabled = true;
      $("#checkbox-tutorial").prop("checked", true);
    }
    if ("false" == extend("sound_s0urce")) {
      $("#settings-button-sound").text("Sound: Off");
      /** @type {boolean} */
      resources.isMuted = true;
    } else {
      $("#settings-button-sound").text("Sound: On");
      /** @type {boolean} */
      resources.isMuted = false;
    }
    me.initWidth = $(document).width();
    me.initHeight = $(document).height();
    $(document).ready(function() {
      $("#tool-type-word").bind("cut copy paste", function(event) {
        event.preventDefault();
      });
    });
    $(document).on("contextmenu", function() {
      return false;
    });
    $("#settings-button-sound").click(function() {
      if (0 == resources.isMuted) {
        $(this).text("Sound: Off");
        /** @type {boolean} */
        resources.isMuted = true;
        cb("sound_s0urce", "false", 180);
      } else {
        $(this).text("Sound: On");
        /** @type {boolean} */
        resources.isMuted = false;
        cb("sound_s0urce", "true", 180);
      }
    });
    render();
    setUp();
    $("#targetid-button").click(function() {
      find($('input[id="targetid-input"]').val());
    });
    $("#targetid-input-form").submit(function() {
      find($('input[id="targetid-input"]').val());
    });
    $("#toppower-restart-button").click(function() {
      res.emit("playerRequest", {
        task : 666
      });
      update(0);
      report("#topwindow-power");
    });
    $("#login-play").click(function() {
      oldSection();
    });
    $("#login-input-form").submit(function() {
      oldSection();
    });
    $("#targetmessage-input-form").submit(function() {
      sendMessage();
    });
    $("#targetmessage-button-send").click(function() {
      sendMessage();
    });
    $("#tool-type-form").submit(function() {
      setupPasswords();
    });
    $("input[id='cdm-target-id']").prop("readonly", true);
    $("input[id='cdm-target-id']").click(function() {
      /** @type {boolean} */
      me.cdm_mark_id = true;
      $(this).select();
    });
    $("#window-other").css({
      top : $(document).height() / 2 - 185,
      left : 120
    });
    $("#window-shop").css({
      top : $(document).height() / 2 - 221,
      left : $(document).width() / 2 - 175
    });
    $("#window-log").css({
      top : $(document).height() - 210,
      left : 30
    });
    $("#window-power").css({
      top : $(document).height() / 2 - 95,
      left : $(document).width() / 2 - 181
    });
    $("#window-settings").css({
      top : $(document).height() / 2 - 95,
      left : $(document).width() / 2 - 181
    });
    $("#window-chat").css({
      top : $(document).height() / 2 - 155,
      left : $(document).width() / 2 - 181
    });
    $("#window-rank").css({
      top : $(document).height() / 2 - 238,
      left : $(document).width() / 2 - 101
    });
    if (me.initWidth > 1500) {
      $("#window-miner").css({
        top : 110,
        left : 1145
      });
      $("#window-computer").css({
        top : 110,
        left : 545
      });
      $("#window-list").css({
        top : 110,
        left : 265
      });
      $("#window-tool").css({
        top : 460,
        left : 560
      });
    } else {
      if (me.initWidth > 1380) {
        $("#window-miner").css({
          top : 110,
          left : 1035
        });
        $("#window-computer").css({
          top : 110,
          left : 435
        });
        $("#window-list").css({
          top : 110,
          left : 155
        });
        $("#window-tool").css({
          top : 460,
          left : 450
        });
      } else {
        $("#window-miner").css({
          top : 110,
          left : me.initWidth - 352
        });
        $("#window-computer").css({
          top : 110,
          left : 435
        });
        $("#window-list").css({
          top : 110,
          left : 155
        });
        $("#window-tool").css({
          top : me.initHeight - 436,
          left : 450
        });
      }
    }
    $("#power-restart-button").click(function() {
      v_tipinfo("#topwindow-power");
    });
    $(".targetmessage-button-cancel").click(function() {
      report("#topwindow-success");
    });
    $(".toppower-button-cancel").click(function() {
      report("#topwindow-power");
    });
    $("#window-other-port1").click(function() {
      if (!($scope.coins.value < $scope.coins.rate * item.attackCostMult)) {
        $("#window-other-port1").attr("class", "button window-other-attackbutton-clicked");
        $("#window-other-port2").attr("class", "button window-other-attackbutton-default");
        $("#window-other-port3").attr("class", "button window-other-attackbutton-default");
        check("#window-tool");
        $("#tool-type-word").focus();
        handle(0);
      }
    });
    $("#window-other-port2").click(function() {
      if (!($scope.coins.value < $scope.coins.rate * item.attackCostMult)) {
        $("#window-other-port1").attr("class", "button window-other-attackbutton-default");
        $("#window-other-port2").attr("class", "button window-other-attackbutton-clicked");
        $("#window-other-port3").attr("class", "button window-other-attackbutton-default");
        check("#window-tool");
        $("#tool-type-word").focus();
        handle(1);
      }
    });
    $("#window-other-port3").click(function() {
      if (!($scope.coins.value < $scope.coins.rate * item.attackCostMult)) {
        $("#window-other-port1").attr("class", "button window-other-attackbutton-default");
        $("#window-other-port2").attr("class", "button window-other-attackbutton-default");
        $("#window-other-port3").attr("class", "button window-other-attackbutton-clicked");
        check("#window-tool");
        $("#tool-type-word").focus();
        handle(2);
      }
    });
    $("#window-other-chatbutton").click(function() {
      data = e;
      $("#chat-toplayer").text(data.name);
      $("#window-chat").show();
      check("#window-chat");
      $("#chat-input").focus();
    });
    $("#chat-toplayer").click(function() {
      find(data.id);
    });
    $(".desktop-element").click(function() {
      var t = "#" + this.id.replace("desktop", "window");
      $(t).show();
      check(t);
      if ("#window-chat" == t) {
        $("#chat-input").focus();
      }
      if ("desktop-chat" == $(this).attr("id")) {
        $("#desktop-chat-new").hide();
      } else {
        if ("desktop-computer" == $(this).attr("id")) {
          r.animate(6);
        } else {
          if ("desktop-miner" == $(this).attr("id")) {
            r.animate(8);
          } else {
            if ("desktop-shop" == $(this).attr("id")) {
              r.clearHints();
            }
          }
        }
      }
    });
    $(".window").click(function() {
      me.focus = $(this).attr("id");
      if ("window-tool" == me.focus) {
        $("#tool-type-word").focus();
        if (1 == me.cdm_mark_id) {
          /** @type {boolean} */
          me.cdm_mark_id = false;
          $("input[id='cdm-target-id']").select();
        }
      }
    });
    $("#window-other-button").click(function() {
      r.animate(2);
      $(this).hide();
      $("#window-other-attackbutton-wrapper").show();
    });
    $(".window-close").click(function() {
      $(this).parent().parent().hide();
    });
    $(".topwindow-close").click(function() {
      $(this).parent().parent().parent().hide();
    });
    $(".topwindow-close-button").click(function() {
      $(this).parent().parent().parent().parent().hide();
    });
    $(".window-close").hover(function() {
      /** @type {boolean} */
      me.isHoveringClose = true;
    }, function() {
      /** @type {boolean} */
      me.isHoveringClose = false;
    });
    $("#window-my-playerquote-wrapper").click(function() {
      $(this).hide();
      $("#window-my-playerquote-wrapper-new").show();
      $("#playerquote-type-word").focus();
    });
    $("#playerquote-input-form").submit(function() {
      unlockButtons();
    });
    $("#playerquote-button").click(function() {
      unlockButtons();
    });
    $(".window-title").mousedown(function(evt) {
      var file = $(this).parent().attr("id");
      if (null == me.dragging && !me.isHoveringClose && file) {
        me.dragging = file;
        check("#" + me.dragging);
        var stop_offset = $(this).offset();
        /** @type {number} */
        me.offX = evt.pageX - stop_offset.left;
        /** @type {number} */
        me.offY = evt.pageY - stop_offset.top;
      }
    });
    $(".window").mousedown(function() {
      var t = "#" + $(this).attr("id");
      if (t) {
        check(t);
      }
    });
    $(".window-shop-element").hover(function() {
      me.hoverInfo = $(this).attr("id");
      $("#hoverinfo-name").html(formatNumber($(this).attr("data-id"), $(this).attr("data-type")));
      $("#hoverinfo").show();
    }, function() {
      /** @type {null} */
      me.hoverInfo = null;
      $("#hoverinfo").hide();
    });
    $(".window-shop-element").click(function(c) {
      if (2 == $(this).attr("data-type") && $scope.coins.value >= $scope.coins.rate * item.attackCostMult) {
        resize(c.pageX, c.pageY, "- " + ($scope.coins.rate * item.attackCostMult).toFixed(4), "#c77f02");
        load("click");
      }
    });
    $(document.body).mousemove(function(event) {
      if (me.dragging) {
        $("#" + me.dragging).css("left", event.pageX - me.offX);
        $("#" + me.dragging).css("top", event.pageY - me.offY);
        if ($("#" + me.dragging).position().top < 90) {
          $("#" + me.dragging).css("top", 90);
        }
      }
      if (null !== me.hoverInfo) {
        $("#hoverinfo").css({
          left : constrain(event.pageX + 30, 0, $(document).width() - $("#hoverinfo").width() - 60),
          top : event.pageY + 15
        });
      }
    });
    $(document.body).mouseup(function() {
      /** @type {null} */
      me.dragging = null;
    });
    dbgLog('Loading codeTemplate.json File')
    $.getJSON("/client/js/codeTemplate.json", function(trackInfoUrl) {
      /** @type {!Object} */
      tagrules = trackInfoUrl;
    });
    dbgLog('Loading shop.json File...')
    $.getJSON("/client/js/shop.json", function(createdGroup) {
      /** @type {string} */
      group = createdGroup;
      /** @type {number} */
      var i = 0;
      for (; i < hood.length; i++) {
        get(hood[i].id, hood[i].type);
      }
    });
  });
  /**
   * @param {number} i
   * @return {undefined}
   */
  r.animate = function(i) {
    if (0 != r.enabled && r.current + 1 === i) {
      /** @type {number} */
      r.current = i;
      r.clearHints();
      $(r.elements[i]).show();
    }
  };
  /**
   * @return {undefined}
   */
  r.clearHints = function() {
    /** @type {number} */
    var i = 0;
    for (; i < r._length; i++) {
      $(r.elements[i]).hide();
    }
  };
  /** @type {!Array} */
  var args = ["window-computer", "window-miner", "window-shop", "window-tool", "window-list", "window-other", "window-log", "window-power", "window-settings", "window-chat", "window-rank"];
  res.on("prepareClient", function(variationAttrs) {
    options.id = variationAttrs.id;
    $("#login-page").hide();
    $("#game-page").show();
    setInterval(init, 200);
  });
  res.on("mainPackage", function(object) {
    /** @type {number} */
    //dbgLog('Recieved New Packet', object)
    object.unique.forEach((a) => {
      if (debug.filterTasks.includes(a.task)) return;
      dbgLog('Received A New Task Object',a)
    })
    var i = 0;
    for (; i < object.unique.length; i++) {
      if (2010 == object.unique[i].task) {
        $scope.coins = object.unique[i].data.coins;
        $scope.firewall = object.unique[i].data.firewall;
        $scope.market = object.unique[i].data.market;
        /** @type {boolean} */
        $scope.gotFirstPack = true;
      } else {
        if (333 == object.unique[i].task) {
          if (0 == object.unique[i].opt) {
            run();
          } else {
            if (1 == object.unique[i].opt) {
              change_it(object.unique[i]);
            } else {
              if (2 == object.unique[i].opt) {
                initialize();
              }
            }
          }
        } else {
          let taskobject = {
              2008: function(e) {
                  each(object.unique[i])
              },
              2009: function() {
                process(object.unique[i]);
              },
              2006: function() {
                start(object.unique[i]);
              },
              2002: function() {
                handle_action(object.unique[i]);
              },
              2004: function() {
                create(object.unique[i].state);
              },
              2003: function() {
                func(object.unique[i]);
              },
              2007: function() {
                fn(object.unique[i].data);
              },
              2005: function() {
                setOptionsOnContainer(object.unique[i].data);
              },
              2E3: function() {
                callback(object.unique[i].data);
              },
              3001: function() {
                open(object.unique[i].rank);
              }
          }
          
          taskobject[object.unique[i].task]();
          /*if (2008 == object.unique[i].task) {
            each(object.unique[i]);
          } else {
            if (2009 == object.unique[i].task) {
              process(object.unique[i]);
            } else {
              if (2006 == object.unique[i].task) {
                start(object.unique[i]);
              } else {
                if (2002 == object.unique[i].task) {
                  handle_action(object.unique[i]);
                } else {
                  if (2004 == object.unique[i].task) {
                    create(object.unique[i].state);
                  } else {
                    if (2003 == object.unique[i].task) {
                      func(object.unique[i]);
                    } else {
                      if (2007 == object.unique[i].task) {
                        fn(object.unique[i].data);
                      } else {
                        if (2005 == object.unique[i].task) {
                          setOptionsOnContainer(object.unique[i].data);
                        } else {
                          if (2E3 == object.unique[i].task) {
                            callback(object.unique[i].data);
                          } else {
                            if (3001 == object.unique[i].task) {
                              open(object.unique[i].rank);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }*/
        }
      }
    }
  });
  
}(window, document, jQuery);