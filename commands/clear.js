module.exports = {
  name: 'Echo',
  description: 'Echoes the message',
  command: "!clear",
  trigger: /!clear/i,
  run: (bot, channel, message) => {
    bot.sendMessage(channel.id, 'Deleting messages..', (msg) => {
      bot.getChannelLogs(channel, 1000, {}, (err, messages) => {
        bot.deleteMessages(messages);
      });
    })

  }
}
