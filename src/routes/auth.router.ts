import { Router } from "express";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import AuthController from "@/http/controllers/auth/AuthController";
import AuthMiddleware from "@/http/middlewares/AuthMiddleware";

class AuthRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.setup();
        this.setupAnnotation();
    }

    getRouter() {
        return this.router;
    }   

    private setupAnnotation(){
        const fs = require('fs');        
        fs.readFile( __dirname + '/auth.documentation.ts', function (err, data) {
            if (err) {
                throw err; 
            }
            return data.toString(); 
        })
    }

    private setup() {
        this.router.post('/login', ErrorHandler.catchErrors(AuthController.login));
        this.router.post('/register', ErrorHandler.catchErrors(AuthController.register));
        this.router.post('/refresh-token', ErrorHandler.catchErrors(AuthController.refreshToken));
        this.router.post('/logout', ErrorHandler.catchErrors(AuthMiddleware.authenticate), ErrorHandler.catchErrors(AuthController.logout));
    }
    
}

export default new AuthRouter();
