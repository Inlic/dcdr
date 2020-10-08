import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ChannelsService {
  async delete(id) {
    let data = await dbContext.Channels.findOneAndRemove({ _id: id });
        if (!data) {
            throw new BadRequest("Invalid ID");
        }
  }
  async edit(id, update) {
    let data = await dbContext.Channels.findOneAndUpdate({ _id: id }, update, { new: true })
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
  getAllUser(data) {

    
  }


}

export const channelsService = new ChannelsService