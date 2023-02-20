/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'

export const templates = {
	Dal_generated: {
		type: 'handlebars',
		contents: (): string => fs.readFileSync(`${__dirname}/Dal.generated.handlebars`).toString(),
	},
	Dal: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Dal.handlebars`).toString() },
	IntegrationTest: {
		type: 'handlebars',
		contents: (): string => fs.readFileSync(`${__dirname}/IntegrationTest.handlebars`).toString(),
	},
	Mapping: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Mapping.handlebars`).toString() },
	TestHelper: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/TestHelper.handlebars`).toString() },
}
