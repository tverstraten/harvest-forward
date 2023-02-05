import { LogAsyncMethod } from '@tverstraten/log-annotations'
import { LogMethod } from '@tverstraten/log-annotations'
import { Logging } from '@tverstraten/log-annotations'

export class TemplateFactory {
	static logger = Logging.newLogger(TemplateFactory.name)

	static readonly templateResolvers: Record<string, any> = {}

	private static templates: Record<string, string> = {}

	@LogMethod()
	static registerTemplate(templateName: string, content: any): void {
		if (!templateName) throw new RangeError('templateName must be provided')
		if (!content) throw new RangeError('content must be provided')
		if (TemplateFactory.templateResolvers[templateName])
			throw new RangeError(`Template "${templateName}" has already been registered, there is a duplicate`)
		TemplateFactory.templateResolvers[templateName] = content
	}

	@LogAsyncMethod()
	static async getTemplate(name: string): Promise<string> {
		let content = TemplateFactory.templates[name]
		if (!content) {
			const resolver = TemplateFactory.templateResolvers[name]
			const resolverType = typeof resolver
			if (resolverType === 'string') {
				content = resolver
				TemplateFactory.templates[name] = content
			} else if (resolverType === 'function') {
				try {
					content = (await resolver()) as string
					TemplateFactory.templates[name] = content
				} catch (problem) {
					this.logger.error(`getTemplate failed for ${name} ${problem}`)
					throw problem
				}
			} else throw new RangeError(`Cannot resolve content for template with the name ${name}`)
		}

		return content
	}
}
