let permissions = {
  "add": ['test']
}

import minimist from 'minimist';

export default {
  name: 'Echo',
  description: 'Echoes the message',
  command: '!test <message>',
  regex: /!test (.*)/i,
  trigger: '!test',
  permissions: permissions,
  run: (bot, channel, message) => {
    if(message.content.match(/!test (.*)/i)) {
      let args = message.content.match(/!test (.*)/i)[1].split(' ');
      switch(args[0]) {
        case 'add':
          bot.reply(message, 'Add');
          break;
        case 'help':
          bot.reply(message, 'Help');
          break;
        default:
          bot.reply(message, 'Invalid arg');
          break;
      }
    } else {
      bot.reply(message, 'Usage: !test <message>');
    }

  }
}
