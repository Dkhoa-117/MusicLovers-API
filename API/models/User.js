const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "uploads/default_avatar.jpg"
    },
    artistId: [{ //danh sach nghe si da yeu thich
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Artist'
    }],
    create_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model('User', userSchema);
