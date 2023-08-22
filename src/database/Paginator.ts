import { QueryParamsDefault } from "@/constants/QueryParamsUrl";
import { Brackets } from "typeorm";

interface meta {
  page: number;
  perpage: number;
  total: number;
  pages: number;
  sort?: string;
  field?: string;
  hasNext: boolean;
  hasPrevious: boolean;
}

export class Paginator {
  static async paginate(queryBuilder: any, req, searchableColumns: any = null, alias?: string, configParams: any = QueryParamsDefault()) {
    let params = req?.query;
    let currentPage = Number(req.query.page) || 1;
    let perpage = Number(req.query.perpage) || 10;
    // let field = String(req.query.field || this.getDefaultSortField()) || "updated_at";
    // let sort = String(req.query.sort || this.getDefaultSort()).toUpperCase() || "DESC";
    let keyword = req.query.keywords || null;
    const offset = (currentPage - 1) * perpage;
    const parameter = { queryBuilder, searchableColumns, keyword, params, alias }

    queryBuilder = Paginator.searchDatatable(parameter, configParams)

    const records = await queryBuilder
      // .orderBy(`${alias}.${field}`, sort)
      .skip(offset).take(perpage).getMany();
    const total = await queryBuilder.getCount();

    const pages = Math.ceil(total / perpage);
    const page = offset / perpage + 1;
    const hasNext = page < pages;
    const hasPrevious = page > 1;

    const meta: meta = {
      page: page,
      pages,
      perpage: perpage,
      total,
      // sort,
      // field,
      hasNext,
      hasPrevious,
    };
    return { records, meta };
  }

  static searchDatatable(parameter, configParams) {

    if (parameter?.keyword && parameter.searchableColumns) {
      parameter.queryBuilder = parameter.queryBuilder.where(
        new Brackets((qb) => {
          function buildGrouppedSearchablesQuery(keyword, field) {
            let keys: any = field
            if (field && field.includes(".")) {
              keys = field.split(".")
            }
            qb.orWhere(`${field.includes(".") ? `${keys[0]}.${keys[1]}` : `${parameter.alias}.${field}`} like :keyword`, { keyword: `%${keyword}%` })
          }
          parameter?.searchableColumns?.forEach(field => {
            buildGrouppedSearchablesQuery(parameter.keyword, field);
          });
        }),
      )
    }

    Object.keys(configParams).map((key: any) => {
      let keys: any = key
      let ky: any = key
      if (key && key.includes(".")) {
        keys = key.split(".")
        keys = keys
        ky = keys[1]
      }
      if (keys != "keywords" && parameter?.params?.[keys] && parameter?.params?.[keys] != undefined) {
        parameter.queryBuilder = parameter.queryBuilder.andWhere(
          new Brackets((qb) => {
            // qb.andWhere(`${key.includes(".") ? `${key}=:${keys}` : `${parameter.alias}.${keys} =: ${keys}`}`, { [keys]: keys == "is_active" ? parameter?.params?.[keys] == "true" ? 1 : 0 : `${parameter?.params?.[keys]}` });
            if (key.includes("."))
              qb.andWhere(`${key[0]}=:${key[1]}`, { [ky]: ky == "is_active" ? parameter.params?.[ky] == "true" ? 1 : 0 : `${parameter.params?.[ky]}` });
            else
              qb.andWhere(`${parameter.alias}.${key}=:${key}`, { [keys]: keys == "is_active" ? parameter.params?.[keys] == "true" ? 1 : 0 : `${parameter.params?.[keys]}` });
          }),
        )
      }
    })

    return parameter.queryBuilder
  }

  static getDefaultSortField() {
    return "updated_at";
  }

  static getDefaultSort() {
    return 'DESC';
  }
}
