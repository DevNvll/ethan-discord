import request from 'axios';
import _ from 'lodash';
import cfg from '../../config.json';

export default {
  name: 'Steam Time',
  description: 'Get user\'s played hours on steam (owned games only)',
  command: "!steamtime <steamid>",
  trigger: '!steamtime',
  permissions: [],
  run: (bot, channel, message) => {
    if(message.content.match(/!steamtime (.*)/i)) {
      resolveId(message.content.match(/!steamtime (.*)/i)[1], (time) => {
        time ? bot.reply(message, "Total hours played: " + time) : bot.reply(message, 'Profile is private or doesn\'t exist');
      });
    } else {
      bot.reply(message, 'Invalid arguments. Usage: !steamtime <steamid|vanityurl>');
    }
  }
}


const getTime = (userid, callback) => {
  let hours = 0;
  request
  .get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+ cfg.steamKey +'&steamid='+ userid +'&format=json')
  .then((res) => {
    if(_.some(res.data.response)) {
      for(let game in res.data.response.games) {
        hours = hours + parseInt(res.data.response.games[game].playtime_forever/60);
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
    .then((res) => {
      getTime(res.data.response.steamid, (time) => {
        callback(time);
      });
    })
  }
}
