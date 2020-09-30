import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Response = new Schema({
    userId: { type: ObjectId, required: true },
    roomId: { type: ObjectId, required: true },
    gameId: { type: ObjectId, required: true },
    userName: { type: String, required: true },
    vote: { type: Number, enum: [-1, 0, 1] },
}, { timestamps: true, toJSON: { virtuals: true } })

Response.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default Response