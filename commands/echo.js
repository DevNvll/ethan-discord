const core = require('../core.js');

const command = {
  name: 'Echo',
  description: 'Echoes the message',
  trigger: /!echo (.*)/i,
  run: (channel, message) => {
    core.client.sendMessage(channel, message.content.match(/!echo (.*)/i)[1])
  }
}

core.addCmd(command);
