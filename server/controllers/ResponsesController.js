import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { responsesService } from '../services/ResponsesService'



//PUBLIC
export class ResponsesController extends BaseController {
    constructor() {
        super("api/responses")
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }


    async getAll(req, res, next) {
        try {
            let data = await responsesService.getAll()
            return res.send(data)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let data = await responsesService.getById(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await responsesService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await responsesService.edit(req.params.id, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await responsesService.delete(req.params.id)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}


