import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class RoomsService {
    async getAll() {
        return await dbContext.Rooms.find({}).populate("creator", "name picture")
    }

    async getByCode(code) {
        let data = await dbContext.Rooms.findOne({ code: code })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async getRoomGames(id) {
        let data = await dbContext.Games.find({ roomId: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async getRoomResponses(id) {
        let data = await dbContext.Responses.find({ roomId: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Rooms.create(rawData)
        return data
    }

    async edit(id, update) {
        let data = await dbContext.Rooms.findOneAndUpdate({ code: id }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Rooms.findOneAndRemove({ _id: IDBKeyRange });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
    }

}


export const roomsService = new RoomsService()