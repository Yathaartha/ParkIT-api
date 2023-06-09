import { getUser } from "../user.js";

export const login = async (username, password) => {
  const user = await getUser(username, password);

  if (user) {
    return {
      id: user.id,
      username: user.username,
    };
  }

  return null;
};
