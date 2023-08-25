import { Paginator } from "@/database/Paginator";
import { AppDataSource } from "@/database/data-source";
import { Item } from "@/database/entities/Item";
import { createItemDTO, updateItemDTO } from "@/http/dtos/ItemDTO";
import { ResponseUtil } from "@/utils/Response";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { Not } from "typeorm";

class ItemController {

    async getData(req: Request, res: Response) {
        const builder = await AppDataSource.getRepository(Item).createQueryBuilder("item");
        const { records: item, meta } = await Paginator.paginate(builder, req, Item.getSearchableColumns(), 'item', Item.getSearchableParams())
        const itemData = item.map((item: Item) => {
            return item.toResponse();
        });

        return ResponseUtil.sendResponseDatatable(res, "fetched item successfully", itemData, meta);
    }

    async getDataByID(req: Request, res: Response) {
        const { id } = req.params;
        const item = await AppDataSource.getRepository(Item).findOneByOrFail({ id: String(id) });
        return ResponseUtil.sendResponseDatatable(res, "Fetch item successfully", item.toResponse());
    }

    async store(req: Request, res: Response) {
        let itemData: any = {
            ...req.body,
            purchase_price: Number(req?.body?.purchase_price),
            selling_price: Number(req?.body?.selling_price),
            stock: Number(req?.body?.stock),
        };
        if (req?.file?.path)
            itemData.image = req?.file?.path

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
        let itemData: any = {
            ...req.body,
            purchase_price: +req?.body?.purchase_price,
            selling_price: +req?.body?.selling_price,
            stock: +req?.body?.stock,
            image: req?.file?.path,
        };
        if (req?.file?.path)
            itemData.image = req?.file?.path
        else
            delete itemData.image
        const dto = new updateItemDTO();
        Object.assign(dto, itemData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Item);

        const itemExistCheckt = await repo.findBy({
            id: Not(String(id)),
            name: itemData?.name
        });

        if (itemExistCheckt?.length > 0)
            return ResponseUtil.sendErrror(res, "Name already exist", 422, null);
        else {
            const item = await repo.findOneByOrFail({
                id: String(id),
            });
            repo.merge(item, itemData);
            await repo.save(item);

            return ResponseUtil.sendResponse(res, "Successfully updated item", {});
        }

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Item);
        const item = await repo.findOneByOrFail({
            id: String(id)
        });

        await repo.remove(item);

        return ResponseUtil.sendResponse(res, "Successfully updated status item", {});
    }
}

export default new ItemController();