import fs from 'fs'

export const templates = {
	AbstractCrudDal: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/AbstractCrudDal.handlebars`).toString() },
	AbstractDal: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/AbstractDal.handlebars`).toString() },
	Dal: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Dal.handlebars`).toString() },
	DalBase: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/DalBase.handlebars`).toString() },
	EntitySchema: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Model.handlebars`).toString() },
}
