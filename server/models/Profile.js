import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    steamId: {type: String},
    picture: { type: String },
    channels: [{type: ObjectId}],
    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Profile;
