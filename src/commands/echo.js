export default {
  name: 'Echo',
  description: 'Echoes the message',
  command: '!echo <message>',
  trigger: '!echo',
  permissions: [],
  run: (bot, channel, message) => {
    if(message.content.match(/!echo (.*)/i)) {
      bot.sendMessage(channel.id, message.content.match(/!echo (.*)/i)[1]);
    } else {
      bot.reply(message, 'Usage: !echo <message>');
    }

  }
}
