const path = require('path');

module.exports = {
  name: 'Fuck u mang',
  description: 'Ey b0ss fak yu mang',
  command: "!fuckumang",
  trigger: "!fuckumang",
  permissions: ['The Master Memer'],
  run: (bot, channel, message) => {
    bot.joinVoiceChannel(message.author.voiceChannel.id, (err, connection) => {
      connection.playFile(path.join(__dirname, 'assets', 'fuckumang.mp3'), {volume: 1}, (err, callback) => {
        callback.on('end', () => {
          bot.leaveVoiceChannel(message.author.voiceChannel);
        });
      });
    });
  }
}
