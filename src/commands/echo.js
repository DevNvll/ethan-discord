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
      bot.sendMessage(channel.id, JSON.stringify(args));
    } else {
      bot.reply(message, 'Usage: !echo <message>');
    }

  }
}
