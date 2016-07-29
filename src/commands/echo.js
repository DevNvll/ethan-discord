export default {
  name: 'Echo',
  description: 'Echoes the message',
  command: '!echo <message>',
  trigger: '!echo',
  permissions: [],
  run: (bot, channel, message) => {
    bot.sendMessage(channel.id, message.content.match(/!echo (.*)/i)[1])
  }
}
