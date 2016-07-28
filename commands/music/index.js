//I'M REALLY SORRY FOR THIS MESS
//at least it's working
const path = require('path');
const url = require('url');

const low = require('lowdb');
const db = low('commands/music/queue.json');


const fetchMp3 = require('./getVideoMp3');



db.defaults({ queue: [] }).value();

let queue = db.get('queue');


const play = (bot, channel, message) => {
  bot.joinVoiceChannel(message.author.voiceChannel.id, (err, connection) => {
    connection.playFile(db.get('queue[0].url').value(), {volume: 1}, (err, callback) => {
      callback.on('end', () => {
        connection.destroy();
        nextSong(bot, channel, message);
      });
    });
    bot.on('stopMusic', () => {
      connection.destroy();
    });
    bot.on('musicVolume', (volume) => {
      connection.setVolume(volume);
    });

  });
}

const nextSong = (bot, channel, message) => {
  queue.shift().value();
  if(db.get('queue').size().value()) {
    bot.sendMessage(channel, JSON.stringify(queue));
    play(bot, channel, message);
  } else {
    bot.sendMessage(channel, 'No more musics to play');
  }
}
module.exports = {
  name: 'Fuck u mang',
  description: 'Ey b0ss fak yu mang',
  command: "!music",
  trigger: "!music",
  permissions: ['the master memer'],
  run: (bot, channel, message) => {
    let args = message.content.match(/!music (.*)/i)[1].split(' ');
    switch (args[0]) {
        case 'add':
            if (args[1].match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)) { //check if it's a valid youtube url
              fetchMp3(url.parse(args[1]).query.split("=")[1], (videoUrl, videoTitle) => {
                queue.push({
                    url: videoUrl,
                    title: videoTitle,
                    user: message.author.username
                }).value();
                bot.sendMessage(channel, videoTitle + ' has been added to the queue.');
                if(db.get('queue').size().value() == 1) {
                  play(bot, channel, message);
                }
              });
            } else {
                bot.reply(message, 'Invalid youtube url')
            }
            break;
        case 'queue':
            bot.reply(message, JSON.stringify(queue.value()));
            break;
        case 'next':
          nextSong(bot, channel, message);
          break;
        case 'clear':
          db.set('queue', []).value();
          break;
        case 'play':
          if(db.get('queue').size().value()) {
            play(bot, channel, message);
          } else {
            bot.reply(message, 'No musics in queue. Use !music add <youtube url>');
          }
          break;
        case 'stop':
          bot.emit('stopMusic');
          break;
        case 'volume':
          bot.emit('musicVolume', args[1]);
          break;
        default:
          bot.reply(message, 'Invalid argument');
          break;
    }


  }
}
