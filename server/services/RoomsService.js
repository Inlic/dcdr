import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class RoomsService {
    async startPoll(code) {
        let room = await dbContext.Rooms.findOne({ code: code })
        //TODO add a variable for consensus, not 0
        let reqScore = Math.floor(room.names.length *.75)
        await dbContext.Games.updateMany({roomId: room._id}, {reqScore: reqScore})
        return await dbContext.Rooms.findOneAndUpdate({code: code}, {started:true}, {new: true})
    }
    async addName(data, id) {
        if(data.addName == null){
            throw new BadRequest("Please Enter a Name")
        }
        return await dbContext.Rooms.findOneAndUpdate({_id: id}, {$push:{"names": data.addName}}, {new: true})
        
    }
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

    async getRoomGames(code) {
        let room = await dbContext.Rooms.findOne({code: code})
        let data = await dbContext.Games.find({ roomId: room._id })
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
        let data = await dbContext.Rooms.findOneAndUpdate({ _id: id }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        return data;
    }

    //FIXME function doesn't use either input
    async delete(id) {
        let data = await dbContext.Rooms.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
    }

}


export const roomsService = new RoomsService()