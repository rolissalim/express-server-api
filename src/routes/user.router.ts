import { Router } from "express";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import AuthMiddleware from "@/http/middlewares/AuthMiddleware";
import UserController from "@/http/controllers/user/UserController";
import path from "path";

class UserRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.setup();
        this.setupAnnotation();
    }

    getRouter() {
        return this.router;
    }

    private setupAnnotation() {
        const fs = require('fs');
        fs.readFile(__dirname + '/user.documentation.ts', function (err, data) {
            if (err) {
                throw err;
            }
            return data.toString();
        })
    }

    private setup() {
        const multer = require("multer");
        var storage = multer.diskStorage({
            destination: (req, file, callBack) => {
                callBack(null, 'uploads/users')     // './public/images/' directory name where save the file
            },
            filename: (req, file, callBack) => {
                callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        })
        const upload = multer({ storage: storage });
        this.router.get('/', ErrorHandler.catchErrors(AuthMiddleware.authenticate), ErrorHandler.catchErrors(UserController.getData));
        this.router.get('/:id', ErrorHandler.catchErrors(AuthMiddleware.authenticate), ErrorHandler.catchErrors(UserController.getDataByID));
        this.router.post('', upload.single('image'), ErrorHandler.catchErrors(AuthMiddleware.authenticate), ErrorHandler.catchErrors(UserController.store));
        this.router.post('/:id', upload.single('image'), ErrorHandler.catchErrors(AuthMiddleware.authenticate), ErrorHandler.catchErrors(UserController.update));
        this.router.delete('/:id', ErrorHandler.catchErrors(AuthMiddleware.authenticate), ErrorHandler.catchErrors(UserController.delete));
    }
}

export default new UserRouter();