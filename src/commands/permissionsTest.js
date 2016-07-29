let permissions = {
  "add": ['test']
}

export default {
  name: 'Permissions Test',
  description: 'To test permissions system for command args',
  command: '!test <message>',
  regex: /!test (.*)/i,
  trigger: '!test',
  permissions: permissions,
  run: (bot, channel, message) => {
    if(message.content.match(/!test (.*)/i)) {
      let args = message.content.match(/!test (.*)/i)[1].split(' ');
      switch(args[0]) {
        case 'add': //only for user with 'test' role
          bot.reply(message, 'Add');
          break;
        case 'help': //for everyone
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
