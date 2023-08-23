import express, { Application, Request, Response } from "express";
import { ErrorHandler } from "./http/middlewares/ErrorHandler";

import bodyParser from "body-parser";
import cors from "cors";
import AuthRouter from "./routes/auth.router";
import UserRouter from "./routes/user.router";
import itemRouter from "./routes/item.router";

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupGlobalMiddleware();
    this.setupRouters();
  }

  start(port: string | number = 3000) {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    return this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`listening on :${port}`);
    });
  }

  private setupGlobalMiddleware() {
    this.app.use(express.json());
  }

  private setupRouters() {
    this.app.get('/', (_, res) => {
      res.json({ message: 'Welcome to our service!' });
    });

    this.app.use('/uploads', express.static('./uploads'));
    this.app.use('/api', AuthRouter.getRouter());
    this.app.use('/api/user', UserRouter.getRouter());
    this.app.use('/api/item', itemRouter.getRouter());

    this.setupSwagger();

    this.app.use("*", (req: Request, res: Response) => {
      return res.status(404).json({
        success: false,
        message: "Invalid route",
      });
    });

    this.app.use(ErrorHandler.handleErrors);
  }

  private setupSwagger() {
    const swaggerJsdoc = require("swagger-jsdoc"), swaggerUi = require("swagger-ui-express");
    const options = {
      definition: {
        openapi: "3.1.0",
        info: {
          title: "API Stock Items",
          version: "1.0.0"
        },
        // servers: [
        //   {
        //     url: process.env.APP_URL,
        //   },
        // ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            }
          },
          schemas: {
            update_status: {
              type: "object",
              required: "is_active",
              properties: {
                is_active: {
                  type: "string",
                  description: "is active"
                }
              }

            },
            json_success: {
              type: "object",
              properties: {
                success: {
                  description: "Success Status",
                  type: "boolean",
                  example: true
                },
                message: {
                  description: "Return Message",
                  type: "string",
                  example: "successfully get data"
                },
                data: {
                  description: "Result Data",
                  type: "object"
                }
              }
            }
          }
        },
        tags: [
          {
            name: "Auth",
            description: "Auth Endpoint"
          },
          {
            name: "User",
            description: "User Endpoint"
          },
          {
            name: "Item",
            description: "Item Endpoint"
          },
        ]
      },
      apis: ["./src/routes/*.ts"],
    };

    const specs = swaggerJsdoc(options);
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs)
    );
  }
}

export default new App();