const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  website: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Member",
  },
  bio: {
    type: String,
    default: "",
  },
  githubusername: {
    type: String,
    default: "",
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        default: "requested",
      },
    },
  ],
  pendingFriendsRequests: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        default: "pending",
      },
    },
  ],
  joined: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
