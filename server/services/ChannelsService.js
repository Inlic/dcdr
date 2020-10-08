import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ChannelsService {
  delete(id) {
    throw new Error("Method not implemented.")
  }
  edit(id) {
    throw new Error("Method not implemented.")
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
  getAllUser() {
    
  }


}

export const channelsService = new ChannelsService