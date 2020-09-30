import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Game = new Schema({
    roomId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    imgUrl: { type: String },
    upvotes: { type: Number },
    downvotes: { type: Number },
}, { timestamps: true, toJSON: { virtuals: true } })

Game.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default Game