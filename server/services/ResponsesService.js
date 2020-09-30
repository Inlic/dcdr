import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ResponsesService {
    async getAll() {
        return await dbContext.Responses.find({}).populate("creator", "name picture")
    }

    async getById(id) {
        let data = await dbContext.Responses.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Responses.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Responses.findOneAndUpdate({ _id: id }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Responses.findOneAndRemove({ _id: IDBKeyRange });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
    }

}


export const responsesService = new ResponsesService()