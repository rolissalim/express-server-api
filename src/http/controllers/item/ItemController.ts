import { Paginator } from "@/database/Paginator";
import { AppDataSource } from "@/database/data-source";
import { Item } from "@/database/entities/Item";
import { createItemDTO, updateItemDTO } from "@/http/dtos/ItemDTO";
import { ResponseUtil } from "@/utils/Response";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";

class ItemController {

    async getData(req: Request, res: Response) {
        const builder = await AppDataSource.getRepository(Item).createQueryBuilder("item");
        const { records: item, meta } = await Paginator.paginate(builder, req, Item.getSearchableColumns(), 'item')
        const itemData = item.map((item: Item) => {
            return item.toResponse();
        });

        return ResponseUtil.sendResponseDatatable(res, "fetched item successfully", itemData, meta);
    }

    async getDataByID(req: Request, res: Response) {
        const { id } = req.params;
        const item = await AppDataSource.getRepository(Item).findOneByOrFail({ id });
        return ResponseUtil.sendResponseDatatable(res, "Fetch item successfully", item.toResponse());
    }

    async store(req: Request, res: Response) {
        const itemData = req.body;
        const dto = new createItemDTO();
        Object.assign(dto, itemData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Item);
        const item = repo.create(itemData);
        await repo.save(item);

        return ResponseUtil.sendResponse(res, "Successfully created new item", {});
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const itemData = req.body;
        const dto = new updateItemDTO();
        Object.assign(dto, itemData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Item);
        const item = await repo.findOneByOrFail({
            id: String(id),
        });

        repo.merge(item, itemData);
        await repo.save(item);

        return ResponseUtil.sendResponse(res, "Successfully updated item", {});
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Item);
        const item = await repo.findOneByOrFail({
            id: String(id),
        });

        repo.merge(item);
        await repo.save(item);

        return ResponseUtil.sendResponse(res, "Successfully updated status item", {});
    }
}

export default new ItemController();