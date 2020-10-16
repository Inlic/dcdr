import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ChannelsService {
  async getByUser(email) {
    let data = await dbContext.Channels.find({users: {$in: email}}).populate('rooms')
    return data
  }
  async delete(id) {
    let data = await dbContext.Channels.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
  }
  async edit(id, update) {
    let data = await dbContext.Channels.findOneAndUpdate({ _id: id }, update, { new: true }).populate('rooms')
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
        return data;
  }
  async create(rawData) {
    let data = await dbContext.Channels.create(rawData)
        return data
  }
  async getById(id) {
    let data = await dbContext.Channels.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
  }

  async addRoom(payload){
    let data = await dbContext.Channels.findOneAndUpdate({_id: payload._id},{$push:{rooms: payload.rooms}}, {new: true}).populate('rooms')
    if (!data) {
      throw new BadRequest("Invalid ID")
  }
  return data
  }


}

export const channelsService = new ChannelsService