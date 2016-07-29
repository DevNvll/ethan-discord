let bypassRoles = ['master'];

const checkPermissions = (user, command, message, client) => {

  var permissions = command.permissions;

  if(permissions.length == 0) {
    return true;
  }

  var userRoles = client.servers.get('id', message.server.id).rolesOfUser(user);

  for(var i = 0; i < userRoles.length; i++) {
    if(inArray(userRoles[i].name.toLowerCase(), permissions) || inArray(userRoles[i].name.toLowerCase(), bypassRoles)) {
      return true;
    }
  }

  return false;

}

const inArray = (needle, haystack) => {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

export default checkPermissions;
