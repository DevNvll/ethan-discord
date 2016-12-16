// I'M REALLY SORRY FOR THIS MESS
// at least it's working
import url from 'url'

import low from 'lowdb'
const db = low('./data/music_queue.json')
import mp3 from './getVideoMp3'

db.defaults({ queue: [] }).value()
let queue = db.get('queue')

const play = (bot, channel, message) => {
  bot.joinVoiceChannel(message.author.voiceChannel.id, (err, connection) => {
    if (err) console.log('error on connecting on a voice channel', err)
    connection.playFile(db.get('queue[0].url').value(), {volume: 1}, (err, callback) => {
      if (err) console.log('error on playing file', err)
      callback.on('end', () => {
        connection.destroy()
        nextSong(bot, channel, message)
      })
    })
    bot.on('stopMusic', () => {
      connection.destroy()
    })
    bot.on('musicVolume', (volume) => {
      connection.setVolume(volume)
    })
  })
}

const nextSong = (bot, channel, message) => {
  queue.shift().value()
  if (db.get('queue').size().value()) {
    bot.sendMessage(channel, JSON.stringify(queue))
    play(bot, channel, message)
  } else {
    bot.sendMessage(channel, 'No more musics to play')
  }
}
export default {
  name: 'Fuck u mang',
  description: 'Ey b0ss fak yu mang',
  command: '!music',
  trigger: '!music',
  permissions: ['the master memer'],
  run: (bot, channel, message) => {
    if (message.content.match(/!music (.*)/i)) {
      let args = message.content.match(/!music (.*)/i)[1].split(' ')
      switch (args[0]) {
        case 'add':
          if (args[1].match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)) { // eslint-disable-line
            let videoid = url.parse(args[1]).query.split('=')[1]
            mp3(videoid).then((data) => {
              queue.push({
                url: data.url,
                title: data.title,
                user: message.author.username
              }).value()
              bot.sendMessage(channel, data.title + ' has been added to the queue.')
              if (db.get('queue').size().value() === 1) play(bot, channel, message)
            })
          } else {
            bot.reply(message, 'Invalid youtube url')
          }
          break
        case 'queue':
          bot.reply(message, JSON.stringify(queue.value()))
          break
        case 'next':
          nextSong(bot, channel, message)
          break
        case 'clear':
          db.set('queue', []).value()
          break
        case 'play':
          if (db.get('queue').size().value()) {
            play(bot, channel, message)
          } else {
            bot.reply(message, 'No musics in queue. Use !music add <youtube url>')
          }
          break
        case 'stop':
          bot.emit('stopMusic')
          break
        case 'volume':
          bot.emit('musicVolume', args[1])
          break
        default:
          bot.reply(message, 'Invalid argument')
          break
      }
    } else {
      bot.reply(message, 'Invalid argument. Usage: !music <play|add|next|stop|volume|queue|clear>')
    }
  }
}
