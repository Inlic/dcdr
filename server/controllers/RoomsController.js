// @ts-ignore
import express from 'express'
import BaseController from "../utils/BaseController";
// @ts-ignore
import auth0provider from "@bcwdev/auth0provider";
import { roomsService } from '../services/RoomsService'
import { codeGenerator } from "../utils/CodeGenerator"
import socketService from "../services/SocketService";
import { gamesService } from "../services/GamesService";



//PUBLIC
export class RoomsController extends BaseController {
    constructor() {
        super("api/rooms")
        this.router
        .get('', this.getAll)
        .get('/:code', this.getByCode)
        .get('/:code/games', this.getRoomGames)
        .get('/:id/responses', this.getRoomResponses)
        .put('/:id', this.edit)
        .put('/:id/names', this.addName)
        .use(auth0provider.getAuthorizedUserInfo)
        .put('/:code/start', this.startPoll)
        .post('', this.create)
        .delete('/:id', this.delete)
    }
    async startPoll(req, res, next) {
        try {
            let room = await roomsService.startPoll(req.params.code)  
            return res.send("lets go")  
        } catch (error) {
            next(error)
        }
        
        // @ts-ignore
        // socketService.messageRoom(room.code, "startPoll", room.code)
        
    }   
    // @ts-ignore
    async addName(req, res, next) {
        try {
            let data = await roomsService.addName(req.body, req.params.id)
            // @ts-ignore
            socketService.messageRoom(data.code, "updateRoom", data)
            return res.send("added name")
        } catch (error) {
            next(error)
        }
    }


    // @ts-ignore
    async getAll(req, res, next) {
        try {
            let data = await roomsService.getAll()
            
            return res.send(data)
        }
        catch (err) {  }
    }

    async getByCode(req, res, next) {
        try {
            let data = await roomsService.getByCode(req.params.code)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async getRoomGames(req, res, next) {
        try {
            let data = await roomsService.getRoomGames(req.params.code)
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
            // @ts-ignore
            socketService.messageRoom(data.code, "updateRoom", data)
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


