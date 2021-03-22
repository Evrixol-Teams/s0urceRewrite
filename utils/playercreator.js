module.exports = function createPlayer(name,id,rank,level,desc,position,comms = [".........","........."]) {
  return {
    id: id,
    name: name,
    achievmentRank: rank,
    country: "kp",
    desc: desc,
    level: level,
    rank: position,
    comm: {first: comms[0], second: comms[1]}
  }
};