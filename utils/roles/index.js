export const getPermissionRoles = (roles = []) => {
  return roles.reduce((t, v, i) => {
    if (roles.length === 1) {
      return t + v;
    } else {
      if (i === roles.length - 1) {
        return t + v;
      } else {
        return t + v + ' or ';
      }
    }
  }, '');
};
