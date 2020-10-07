// @ts-ignore
import express from 'express'
import BaseController from "../utils/BaseController";
// @ts-ignore
import auth0provider from "@bcwdev/auth0provider";
import { gamesService } from '../services/GamesService'
import socketService from "../services/SocketService";



//PUBLIC
export class GamesController extends BaseController {
    constructor() {
        super("api/games")
        this.router
        .get('', this.getAll)
        .get('/:id', this.getById)
        .get('/:id/responses', this.getGameResponses)
        .post('', this.create)
        .put('/:id', this.edit)
        .put('/:id/upvote', this.upvote)
        .put('/:id/downvote', this.downvote)
        .delete('/:id', this.delete)
        // .use(auth0provider.getAuthorizedUserInfo)
    }


    // @ts-ignore
    async getAll(req, res, next) {
        try {
            let data = await gamesService.getAll()
            return res.send(data)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let data = await gamesService.getById(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async getGameResponses(req, res, next) {
        try {
            let data = await gamesService.getGameResponses(req.params.id)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            let data = await gamesService.create(req.body)
            // REVIEW events by convention should be kabob case
            socketService.messageRoom(req.body.code, "new game", data)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await gamesService.edit(req.params.id, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }
    async upvote(req, res, next) {
        try {
            let data = await gamesService.update(req.params.id, {$inc:{upvotes: 1, score: 1 }})
            // @ts-ignore
            console.log(data.score);
            // @ts-ignore
            if(data.score >= data.reqScore){
                // REVIEW events by convention should be kabob case
                socketService.messageRoom(req.body.code,"poll ended", req.body.code)
            }
            return res.send(data)
        } catch (error) { next(error) }
    }

    async downvote(req, res, next) {
        try {
            let data = await gamesService.update(req.params.id, {$inc:{downvotes: 1, score: -1}})
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await gamesService.delete(req.params.id)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}


