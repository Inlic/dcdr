import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Game = new Schema({
    roomId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    imgUrl: { type: String },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    score: {type:Number, default: 0},
    reqScore: {type:Number, default: 0},
    veto: {type: Boolean, default: false}
}, { timestamps: true, toJSON: { virtuals: true } })

Game.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })



export default Game