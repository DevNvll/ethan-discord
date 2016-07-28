const core = require('../core.js');
const request = require('superagent');
const _ = require('lodash');
const cfg = require('../botCfg.json');

const command = {
  name: 'Steam Time',
  description: 'Get user\'s played hours on steam (owned games only)',
  trigger: /!steamtime (.*)/i,
  run: (channel, message) => {
    resolveId(message.content.match(/!steamtime (.*)/i)[1], (time) => {
      time ? core.client.reply(message, "Total hours played: " + time) : core.client.reply(message, 'Profile is private or doesn\'t exist');
    });
  }
}


let getTime = (userid, callback) => {
  let hours = 0;
  request
  .get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+ cfg.steamKey +'&steamid='+ userid +'&format=json')
  .end(function(err, res){
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

core.addCmd(command);
