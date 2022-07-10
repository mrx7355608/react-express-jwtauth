const User = require("./user.model");

exports.getUser = async (userId) => {
    return await User.findById(userId);
};
exports.createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};
exports.userExists = async (filter) => {
    return await User.findOne(filter);
};
exports.updatePassword = async (userId, newData) => {
    const { password } = newData;
    const user = await User.findById(userId);
    user.password = password;
    user.vers++;
    await user.save();
    user.password = undefined;
    return user;
};
exports.deleteUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { active: false });
};
