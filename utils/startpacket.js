module.exports = function(socket,io) {
  socket.emit('mainPackage',{"unique":[{"task":2010,"data":{"coins":{"value":0.15,"rate":0},"firewall":{"0":{"charges":10,"max_charges":10,"strength":0,"regeneration":0,"nextRegenIn":120,"charge_cool":0,"recoveryIn":30,"is_hacked":false,"upgrades":{"0":{"f_cost":0.5},"1":{"amount":0,"f_cost":6,"s_cost":6},"2":{"amount":0,"f_cost":10,"s_cost":10},"3":{"amount":0,"f_cost":3,"s_cost":3}}},"1":{"charges":10,"max_charges":10,"strength":0,"regeneration":0,"nextRegenIn":120,"charge_cool":0,"recoveryIn":30,"is_hacked":false,"upgrades":{"0":{"f_cost":0.5},"1":{"amount":0,"f_cost":6,"s_cost":6},"2":{"amount":0,"f_cost":10,"s_cost":10},"3":{"amount":0,"f_cost":3,"s_cost":3}}},"2":{"charges":10,"max_charges":10,"strength":0,"regeneration":0,"nextRegenIn":120,"charge_cool":0,"recoveryIn":30,"is_hacked":false,"upgrades":{"0":{"f_cost":0.5},"1":{"amount":0,"f_cost":6,"s_cost":6},"2":{"amount":0,"f_cost":10,"s_cost":10},"3":{"amount":0,"f_cost":3,"s_cost":3}}}},"market":{"0":{"amount":1,"rate":0.0002,"f_cost":0.006,"s_cost":0.006},"1":{"amount":0,"rate":0.0075,"f_cost":0.25,"s_cost":0.25},"2":{"amount":0,"rate":0.039,"f_cost":18.4,"s_cost":18.4},"3":{"amount":0,"rate":1.07,"f_cost":512,"s_cost":512},"4":{"amount":0,"rate":6.4,"f_cost":3072,"s_cost":3072},"5":{"amount":0,"rate":53.33,"f_cost":25600,"s_cost":25600}}}}]})
}


/* nicified js: 

'use strict';

// @param {!Object} store
// @param {?} io
// @return {undefined}

module.exports = function(store, io) {
  store.emit("mainPackage", {
    "unique" : [{
      "task" : 2010,
      "data" : {
        "coins" : {
          "value" : 0.15,
          "rate" : 0
        },
        "firewall" : {
          0 : {
            "charges" : 10,
            "max_charges" : 10,
            "strength" : 0,
            "regeneration" : 0,
            "nextRegenIn" : 120,
            "charge_cool" : 0,
            "recoveryIn" : 30,
            "is_hacked" : false,
            "upgrades" : {
              0 : {
                "f_cost" : 0.5
              },
              1 : {
                "amount" : 0,
                "f_cost" : 6,
                "s_cost" : 6
              },
              2 : {
                "amount" : 0,
                "f_cost" : 10,
                "s_cost" : 10
              },
              3 : {
                "amount" : 0,
                "f_cost" : 3,
                "s_cost" : 3
              }
            }
          },
          1 : {
            "charges" : 10,
            "max_charges" : 10,
            "strength" : 0,
            "regeneration" : 0,
            "nextRegenIn" : 120,
            "charge_cool" : 0,
            "recoveryIn" : 30,
            "is_hacked" : false,
            "upgrades" : {
              0 : {
                "f_cost" : 0.5
              },
              1 : {
                "amount" : 0,
                "f_cost" : 6,
                "s_cost" : 6
              },
              2 : {
                "amount" : 0,
                "f_cost" : 10,
                "s_cost" : 10
              },
              3 : {
                "amount" : 0,
                "f_cost" : 3,
                "s_cost" : 3
              }
            }
          },
          2 : {
            "charges" : 10,
            "max_charges" : 10,
            "strength" : 0,
            "regeneration" : 0,
            "nextRegenIn" : 120,
            "charge_cool" : 0,
            "recoveryIn" : 30,
            "is_hacked" : false,
            "upgrades" : {
              0 : {
                "f_cost" : 0.5
              },
              1 : {
                "amount" : 0,
                "f_cost" : 6,
                "s_cost" : 6
              },
              2 : {
                "amount" : 0,
                "f_cost" : 10,
                "s_cost" : 10
              },
              3 : {
                "amount" : 0,
                "f_cost" : 3,
                "s_cost" : 3
              }
            }
          }
        },
        "market" : {
          0 : {
            "amount" : 1,
            "rate" : 0.0002,
            "f_cost" : 0.006,
            "s_cost" : 0.006
          },
          1 : {
            "amount" : 0,
            "rate" : 0.0075,
            "f_cost" : 0.25,
            "s_cost" : 0.25
          },
          2 : {
            "amount" : 0,
            "rate" : 0.039,
            "f_cost" : 18.4,
            "s_cost" : 18.4
          },
          3 : {
            "amount" : 0,
            "rate" : 1.07,
            "f_cost" : 512,
            "s_cost" : 512
          },
          4 : {
            "amount" : 0,
            "rate" : 6.4,
            "f_cost" : 3072,
            "s_cost" : 3072
          },
          5 : {
            "amount" : 0,
            "rate" : 53.33,
            "f_cost" : 25600,
            "s_cost" : 25600
          }
        }
      }
    }]
  });
};


*/