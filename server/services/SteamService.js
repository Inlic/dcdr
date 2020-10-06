import {steamApi} from "../services/AxiosService.js"
import { BadRequest } from "../utils/Errors"

class SteamService {
//TODO obfuscate steam api key
  async getAll(id) {
    let data = await steamApi.get(`/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${id}&format=json&include_appinfo=true`)
    if(!data){
     throw new BadRequest("Invalid ID")
    }
    return data
}
}

export const steamService = new SteamService