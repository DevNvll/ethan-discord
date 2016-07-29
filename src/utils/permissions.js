let bypassRoles = ['master'];

const checkPermissions = (message, command, client) => {

  let user = message.author;
  let permissions = command.permissions;
  if(!(permissions instanceof Array)) {

    let userRoles = client.servers.get('id', message.server.id).rolesOfUser(user);
      if(message.content.match(command.regex)) {
        if(message.content.match(command.regex)[1] in permissions) {
          for(let role of userRoles) {
            if(inArray(role.name.toLowerCase(), permissions[message.content.match(command.regex)[1]]) || inArray(role.name.toLowerCase(), bypassRoles)) {
              return true;
            }
          }
        } else {
          return true;
        }
      } else {
        return true
      }

  } else {
    if(permissions.length == 0) {
      return true;
    }

    let userRoles = client.servers.get('id', message.server.id).rolesOfUser(user);

    for(let role of userRoles) {
      if(inArray(role.name.toLowerCase(), permissions) || inArray(role.name.toLowerCase(), bypassRoles)) {
        return true;
      }
    }
  }

  return false;

}


//thanks to Paolo Bergantino in http://stackoverflow.com/questions/784012/javascript-equivalent-of-phps-in-array
const inArray = (needle, haystack) => {
  let length = haystack.length;
  for(let i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
  }
  return false;
}

export default checkPermissions;
