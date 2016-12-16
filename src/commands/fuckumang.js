import path from 'path'

export default {
  name: 'Fuck u mang',
  description: 'Ey b0ss fak yu mang',
  command: '!fuckumang',
  trigger: '!fuckumang',
  permissions: ['The Master Memer'],
  run: (bot, channel, message) => {
    message.member.voiceChannel.join().then((connection) => {
      const dispatcher = connection.playFile(path.join(__dirname, 'assets', 'fuckumang.mp3'), {volume: 1})
      dispatcher.on('end', () => {
        message.member.voiceChannel.leave()
      })
    })
  }
}
