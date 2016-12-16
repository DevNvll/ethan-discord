export default {
  name: 'Echo',
  description: 'Echoes the message',
  command: '!clear',
  trigger: '!clear',
  permissions: ['the master memer'],
  onMessage: (bot, channel, message) => {
    channel.sendMessage('Deleting messages..').then(() => {
      message.channel.fetchMessages().then(msgs => {
        msgs.deleteAll()
      })
    })
  }
}
