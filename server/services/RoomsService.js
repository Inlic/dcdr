import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class RoomsService {
    async getAll() {
        return await dbContext.Rooms.find({}).populate("creator", "name picture")
    }

    async getById(id) {
        let data = await dbContext.Rooms.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Rooms.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Rooms.findOneAndUpdate({ _id: id }, update, { new: true })
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