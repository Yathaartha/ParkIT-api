import { User } from "../models/user/User";

export const getUser = async (username, password) => {
  const user = await User.findOne({
    where: {
      username: username,
      password: password,
    },
  });

  return user;
};
