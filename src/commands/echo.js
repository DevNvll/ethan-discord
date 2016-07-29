import minimist from 'minimist';

export default {
  name: 'Echo',
  description: 'Echoes the message',
  command: '!echo <message>',
  trigger: '!echo',
  permissions: [],
  run: (bot, channel, message) => {
    if(message.content.match(/!echo (.*)/i)) {
      let args = minimist(message.content.match(/!echo (.*)/i)[1].split(' '));
      let msg = message.content.match(/!echo (.*)/i)[1];
      bot.sendMessage(channel.id, Object.keys(args).length > 1 ? JSON.stringify(args) : msg);
    } else {
      bot.reply(message, 'Usage: !echo <message>');
    }

  }
}
