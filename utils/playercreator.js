module.exports = function createPlayer(name,id,rank,level,desc,position) {
  return {
    id: id,
    name: name,
    achievmentRank: rank,
    country: "kp",
    desc: desc,
    level: level,
    rank: position
  }
};