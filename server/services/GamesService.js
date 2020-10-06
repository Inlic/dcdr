import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class GamesService {
    async update(id, data) {
        let res= await dbContext.Games.findOneAndUpdate({_id : id}, data, {new: true})
        return res
    }
    async getAll() {
        return await dbContext.Games.find({}).populate("creator", "name picture")
    }


    //FIXME These look like a duplicate functions
    async getById(id) {
        let data = await dbContext.Games.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async getGameResponses(id) {
        let data = await dbContext.Games.find({ gameId: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }
    //FIXME


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


    async delete(id, userEmail) {
        let data = await dbContext.Games.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
    }

}


export const gamesService = new GamesService()