const userDataController = require("../models/user.data");
const AppError = require("../utils/AppError");

class UserServices {
    async deleteUser(userId) {
        // Checking if user exists
        const isUser = await userDataController.userExists({ _id: userId });
        if (!isUser) throw new AppError("User does not exists!", 404);

        return await userDataController.deleteUser(userId);
    }
    async getUser(userId) {
        // Checking if user exists
        const isUser = await userDataController.userExists({ _id: userId });
        if (!isUser) throw new AppError("User does not exists!", 404);

        return await userDataController.getUser(userId);
    }
}

module.exports = UserServices;
