import express from 'express'
import BaseController from "../utils/BaseController";
// @ts-ignore
import { channelsService } from '../services/ChannelsService';
import { profilesService } from "../services/ProfilesService";


//PUBLIC
export class ChannelsController extends BaseController {
  constructor() {
      super("api/channels")
      this.router
      .get('/:email/user', this.getUser)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .put('/:id/rooms', this.addRoom)
      .delete('/:id', this.delete)
    }
  async addRoom(req, res, next) {
    try {
      let data = await channelsService.addRoom(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
    
  }
  async getUser(req, res, next) {
    try {
      let data = await channelsService.getByUser(req.params.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }


    async getById(req, res, next) {
      try {
          let data = await channelsService.getById(req.params.id)
          return res.send(data)
      } catch (error) { next(error) }
  }

    async create(req, res, next) {
    try {
        let data = await channelsService.create(req.body)
        // let profile = await profilesService.updateUserChannels(req.body.user, data.id)
        return res.send(data)
    } catch (error) { next(error) }
  }

    async edit(req, res, next) {
  try {
      let data = await channelsService.edit(req.params.id)
      return res.send(data)
  } catch (error) { next(error) }
  }


    async delete(req, res, next) {
  try {
      let data = await channelsService.delete(req.params.id)
      return res.send(data)
  } catch (error) { next(error) }
  }
}