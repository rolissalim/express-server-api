import { QueryParams } from "@/constants/QueryParamsUrl";
import { Brackets } from "typeorm";

export class QueryBuilderParamsUtil {
    static queryBuild(req, queryBuilder, fieldKeyword, filterKeys: any = QueryParams()) {
        let params = req?.query;
        let iterasiQuery: any = 0;
        const builder = queryBuilder
        Object.keys(filterKeys).map((key: any) => {
            if (!params?.[key] && (params?.[key] == "" || params?.[key] == undefined))
                delete params[key]
            else if (key == "keywords" && params?.[key]) {
                if (iterasiQuery > 0)
                    queryBuilder.andWhere(
                        new Brackets((qb) => {
                            fieldKeyword?.map((item: any) => {
                                qb.orWhere(`${item} like :keyword`)
                                //   qb.orWhere(`${item} like :keyword`, { keyword: `${params?.keywords}%` })
                            });
                        }),
                    )
                else
                    queryBuilder.where(
                        new Brackets((qb) => {
                            fieldKeyword?.map((item: any) => {
                                qb.orWhere(`${item} like :keyword`)
                                //   qb.orWhere(`${item} like :keyword`, { keyword: `${params?.keywords}%` })
                            });
                        }),
                    )
                queryBuilder.setParameter('keyword', `${params?.keywords}%`);
                iterasiQuery++

            } else if (params?.[key]) {
                if (iterasiQuery > 0)
                    builder.andWhere(`${key}=:${key}`, { [key]: key == "is_active" ? Boolean(params?.[key]) : `${params?.[key]}` });
                else
                    builder.where(`${key}=:${key}`, { [key]: key == "is_active" ? Boolean(params?.[key]) : `${params?.[key]}` });
                iterasiQuery++
            }
        })

        return builder;
    }
}


