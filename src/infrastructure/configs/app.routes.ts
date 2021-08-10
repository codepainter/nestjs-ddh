const usersRoot = '/user';

export const routes = {
  user: {
    root: usersRoot,
    get: `${usersRoot}/:id`,
    delete: `${usersRoot}/:id`,
  },
};
