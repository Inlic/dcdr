import {steamApi} from "../services/AxiosService.js"
import { BadRequest } from "../utils/Errors"

class SteamService {
//TODO obfuscate steam api key
  async getAll(id) {
    let data = await steamApi.get(`/GetOwnedGames/v0001/?key=9675879B7E46EF196D01A72B72C90F02&steamid=${id}&format=json&include_appinfo=true`)
    if(!data){
     throw new BadRequest("Invalid ID")
    }
    return data
}
}

export const steamService = new SteamService