import { Paginator } from "@/database/Paginator";
import { AppDataSource } from "@/database/data-source";
import { User } from "@/database/entities/User";
import { createUserDTO, updateUserDTO } from "@/http/dtos/UserDTO";
import { ResponseUtil } from "@/utils/Response";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";

class UserController {

    async getData(req: Request, res: Response) {
        const builder = await AppDataSource.getRepository(User).createQueryBuilder("user")
        const { records: user, meta } = await Paginator.paginate(builder, req, User.getSearchableColumns(), 'user')
        const userData = user.map((user: User) => {
            return user.toResponse();
        });

        return ResponseUtil.sendResponseDatatable(res, "fetched user successfully", userData, meta);
    }

    async getDataByID(req: Request, res: Response) {
        const { id } = req.params;
        const user = await AppDataSource.getRepository(User).findOneByOrFail({ id });
        return ResponseUtil.sendResponseDatatable(res, "Fetch user successfully", user.toResponse());
    }

    async store(req: Request, res: Response) {
        const userData = req.body;
        const dto = new createUserDTO();
        userData.is_active = (userData?.is_active === "true" || userData?.is_active) ? true : false
        userData.rele_id = parseInt(userData.rele_id)

        Object.assign(dto, userData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(User);
        const user = repo.create(userData);
        await repo.save(user);

        return ResponseUtil.sendResponse(res, "Successfully created new user", {});
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const userData = req.body;
        userData.is_active = (userData?.is_active === "true" || userData?.is_active) ? true : false

        const dto = new updateUserDTO();
        Object.assign(dto, userData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneByOrFail({
            id: String(id),
        });

        repo.merge(user, userData);
        await repo.save(user);

        return ResponseUtil.sendResponse(res, "Successfully updated user", {});
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneByOrFail({
            id: String(id),
        });

        repo.merge(user);
        await repo.save(user);

        return ResponseUtil.sendResponse(res, "Successfully updated status user", {});
    }
}

export default new UserController();