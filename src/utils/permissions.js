let bypassRoles = ['master'];

const checkPermissions = (message, command, client) => {

  let user = message.author;
  let permissions = command.permissions;

  if(permissions.length == 0) {
    return true;
  }

  let userRoles = client.servers.get('id', message.server.id).rolesOfUser(user);

  for(let role of userRoles) {
    if(inArray(role.name.toLowerCase(), permissions) || inArray(role.name.toLowerCase(), bypassRoles)) {
      return true;
    }
  }

  return false;

}

const inArray = (needle, haystack) => {
    for(let item of haystack) {
        if(item == needle) return true;
    }
    return false;
}

export default checkPermissions;
