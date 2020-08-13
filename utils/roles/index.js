export const getPermissionRoles = (roles = []) => roles.reduce((t, v, i) => {
  if (roles.length === 1) {
    return t + v;
  }
  if (i === roles.length - 1) {
    return t + v;
  }
  return `${t + v} or `;
}, '');
