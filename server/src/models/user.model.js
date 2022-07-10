const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    vers: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
});
userSchema.methods.comparePassword = async (dbpass, inputpass) => {
    return await bcrypt.compare(inputpass, dbpass);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
