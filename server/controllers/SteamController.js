import express from 'express'
import BaseController from "../utils/BaseController";
import {steamService} from "../services/SteamService.js"

export class SteamController extends BaseController {
  constructor() {
    super("api/steam")
    this.router
    .get('/:id', this.getAll)
  }

    async getAll(req, res, next) {
      try {
          let data = await steamService.getAll(req.params.id)
          return res.send(data.data.response)
      }
      catch (err) { next(err) }
  }


  }