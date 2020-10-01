import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { roomsService } from '../services/RoomsService'
import { codeGenerator } from "../utils/CodeGenerator"
import socketService from "../services/SocketService";



//PUBLIC
export class RoomsController extends BaseController {
    constructor() {
        super("api/rooms")
        this.router
        .get('', this.getAll)
        .get('/:id', this.getByCode)
        .get('/:id/games', this.getRoomGames)
        .get('/:id/responses', this.getRoomResponses)
        .put('/:id', this.edit)
        .use(auth0provider.getAuthorizedUserInfo)
        .post('', this.create)
        .delete('/:id', this.delete)
    }


    async getAll(req, res, next) {
        try {
            let data = await roomsService.getAll()
            return res.send(data)
        }
        catch (err) { next(err) }
    }

    async getByCode(req, res, next) {
        try {
            let data = await roomsService.getByCode(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async getRoomGames(req, res, next) {
        try {
            let data = await roomsService.getRoomGames(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async getRoomResponses(req, res, next) {
        try {
            let data = await roomsService.getRoomResponses(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            req.body.code = codeGenerator.generateCode()
            let data = await roomsService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await roomsService.edit(req.params.id, req.body)
            socketService.messageRoom("room", "updateRoom", data)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await roomsService.delete(req.params.id)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}


