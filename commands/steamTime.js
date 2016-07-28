const request = require('superagent');
const _ = require('lodash');
const cfg = require('../botCfg.json');

module.exports = {
  name: 'Steam Time',
  description: 'Get user\'s played hours on steam (owned games only)',
  command: "!steamtime <steamid>",
  trigger: /!steamtime (.*)/i,
  run: (bot, channel, message) => {
    resolveId(message.content.match(/!steamtime (.*)/i)[1], (time) => {
      time ? bot.reply(message, "Total hours played: " + time) : bot.reply(message, 'Profile is private or doesn\'t exist');
    });
  }
}


let getTime = (userid, callback) => {
  let hours = 0;
  request
  .get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+ cfg.steamKey +'&steamid='+ userid +'&format=json')
  .end((err, res) => {
    if(_.some(res.body.response)) {
      for(let game in res.body.response.games) {
        hours = hours + parseInt(res.body.response.games[game].playtime_forever/60);
      }
      callback(hours);
    } else {
      callback()
    }

  });
}

const resolveId = (id, callback) => {
  if(id.match(/^7656119[0-9]{10}$/i)) {
    getTime(id, (time) => {
      callback(time);
    });
  } else {
    request.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key='+ cfg.steamKey +'&vanityurl='+ id)
    .end((err, res) => {
      getTime(res.body.response.steamid, (time) => {
        callback(time);
      });
    })
  }
}
