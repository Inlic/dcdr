import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Channel = new Schema({
  name: { type: String, required: true},
  rooms: [{type: Schema.Types.ObjectId, ref: 'Room'}],
  users: [{type: String}],
})

Channel.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

    export default Channel