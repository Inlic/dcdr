import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Room = new Schema({
    name: { type: String, required: true },
    // startTime: { type: Date },
    // runTime: { type: Number },
    options: { type: Object },
    items: [{ type: Object }],
    creatorEmail: { type: String },
    names: [{type: String}],
    code: { type: String, required: true },
    completed: { type: Boolean, default: false },
    started: { type: Boolean, default: false },
    doneUsers: {type: Number, default: 0},
    winningItem:{type: ObjectId}
}, { timestamps: true, toJSON: { virtuals: true } })

Room.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })
    // CASCADE ON DELETE
Room.pre('findOneAndRemove', function (next) {
    Promise.all([
      // @ts-ignore
      dbContext.Games.deleteMany({ roomId: this._conditions._id })
    ])
      .then(() => next())
      .catch(err => next(err))
  })

export default Room