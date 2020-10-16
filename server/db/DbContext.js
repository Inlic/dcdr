import mongoose from "mongoose";
import RoomSchema from "../models/Room";
import GameSchema from "../models/Game";
import ResponseSchema from "../models/Response";
import ProfileSchema from "../models/Profile";
import ChannelSchema from "../models/Channel";

class DbContext {
  Rooms = mongoose.model("Room", RoomSchema);
  Games = mongoose.model("Game", GameSchema);
  Responses = mongoose.model("Response", ResponseSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Channels = mongoose.model("Channel", ChannelSchema);
}

export const dbContext = new DbContext();
