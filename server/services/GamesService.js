import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class GamesService {
    async update(id, data) {
        // REVIEW check if you want to runValidators on updates this insures the edit still adheres to the Schema
        let res= await dbContext.Games.findOneAndUpdate({_id : id}, data, {new: true, runValidators: true})
        return res
    }
    async getAll() {
        return await dbContext.Games.find({}).populate("creator", "name picture")
    }

    async getById(id) {
        let data = await dbContext.Games.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Games.create(rawData)
        return data
    }

    async edit(id, update) {
        let data = await dbContext.Games.findOneAndUpdate({ _id: id }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        return data;
    }


    async delete(id) {
        let data = await dbContext.Games.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
    }

}


export const gamesService = new GamesService()