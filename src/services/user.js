import { User } from "../models/user/index.js";

const getUser = async (username, password) => {
  const user = await User.findOne({
    where: {
      username,
      password,
    },
  });

  return user;
};

export { getUser };
