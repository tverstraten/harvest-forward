import fs from 'fs'
import { Builder } from '../../runtime/Builder'
import { HandlebarsGenerator } from './HandlebarsGenerator'

export const BUILDERS = { handlebarsGenerator: (settings: any): Builder => new HandlebarsGenerator(settings) }
export const TEMPLATES = {
	systemAsJson: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/SystemAsJson.handlebars`).toString() },
}
