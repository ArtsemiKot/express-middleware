const express = require('express');
const { Service } = require('../service/user.service')
const { isValidUserId, isValidUserData } = require('../helper/validation.js');
const { buildRespons } = require('../helper/buildREspons.js')

const service = new Service();

class Controller {
    constructor() {
        this.route = express.Router();
        this.initRoute()
    }
    initRoute() {
        this.route.get('/', (req, res) => {
            try {
                const data = getAllUsers();
                buildRespons(res, 200, data);
            } catch (error) {
                buildRespons(res, 404, error.message);
            }
        });

        this.route.get('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const data = service.getUserByID(id);
                buildRespons(res, 200, data);
            } catch (error) {
                buildRespons(res, 404, error.message);
            }
        })

        this.route.post('/', isValidUserData, (req, res) => {
            try {
                const { name, surname, email, pwd } = req.body;
                const data = service.createUser(name, surname, email, pwd);
                buildRespons(res, 200, data);
            } catch (error) {
                buildRespons(res, 404, error.message);
            }
        })

        this.route.patch('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const clientObj = req.body;
                const data = service.patchUser(id, clientObj);
                buildRespons(res, 200, data);
            } catch (error) {
                buildRespons(res, 404, error.message);
            }
        })

        this.route.put('/:id', isValidUserId, isValidUserData, (req, res) => {
            try {
                const { id } = req.params;
                const { name, surname, email, pwd } = req.body;
                const data = service.updateUser(id, name, surname, email, pwd);
                buildRespons(res, 200, data);
            } catch (error) {
                buildRespons(res, 404, error.message);
            }
        })

        this.route.delete('/:id', isValidUserId, (req, res) => {
            try {
                const { id } = req.params;
                const data = service.deleteUserById(id);
                buildRespons(res, 200, data);
            } catch (error) {
                buildRespons(res, 401, error.message);

            }

        })
    }
}



module.exports = { Controller };