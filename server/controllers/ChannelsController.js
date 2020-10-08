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
      .get('', this.getAllUser)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
    }

    async getAllUser(req, res, next) {
        try {
            let data = await channelsService.getAllUser()
            return res.send(data)
        } catch (error) { next(error) }
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
        await profilesService.updateUserChannels(req.body.user, data.id)

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