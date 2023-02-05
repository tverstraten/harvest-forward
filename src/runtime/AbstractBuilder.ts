import { Artifact } from '../system/Artifact'
import { System } from '../system/System'
import { Loggable } from '@tverstraten/log-annotations'
import { Builder } from './Builder'
import { ConfigurationParameter } from './ConfigurationParameter'
import { Logging } from '@tverstraten/log-annotations'
// eslint-disable-next-line spellcheck/spell-checker
import { v4 as uuidv4 } from 'uuid'

export abstract class AbstractBuilder implements Builder, Loggable {
	logger = Logging.newLogger(this.constructor.name)

	readonly id: string

	readonly name: string

	readonly description: string

	constructor(descriptionToUse: string) {
		// eslint-disable-next-line spellcheck/spell-checker
		this.id = uuidv4()
		this.name = this.constructor.name
		this.description = descriptionToUse
	}

	isConfigured(): boolean {
		const configs = this.getConfiguration()
		const keys = Object.keys(configs)
		for (let index = 0; index < keys.length; index++) {
			const key = keys[index]
			const config = configs[key]
			if (config.required && this.getConfiguredValue(key) == null) return false
		}
		return true
	}

	getMissingConfigurationValues(): string[] {
		const result = [] as string[]
		const configs = this.getConfiguration()
		const keys = Object.keys(configs)
		keys.forEach((key) => {
			const config = configs[key]
			if (config.required && this.getConfiguredValue(key) == null) result.push(key)
		})
		return result
	}

	abstract getConfigurationNames(): string[]

	hasConfigurableValue(name: string): boolean {
		const names = this.getConfigurationNames()
		return names.includes(name)
	}

	abstract getConfiguredValue(name: string): any

	abstract setConfiguredValue(name: string, value: any): void

	abstract getConfiguration(): Record<string, ConfigurationParameter>

	abstract doesConfigurationWork(): Promise<boolean>

	regexFromConfigurationString(configurationString: string): RegExp {
		let pattern = configurationString
		let options = ''

		// extract options off of the end
		if (pattern.match(/^[/].*[/][dgimsuy]*$/)) {
			const lastSlash = pattern.lastIndexOf('/')
			options = pattern.substring(lastSlash + 1)
			pattern = pattern.substring(1, lastSlash)
		}
		return new RegExp(pattern, options)
	}

	protected async settleArtifactResults(promises: Promise<Artifact[]>[]): Promise<Artifact[]> {
		const promiseResults = await Promise.allSettled(promises)
		let results = [] as Artifact[]
		promiseResults.forEach((promiseResult) => {
			if (promiseResult.status == 'fulfilled') results = results.concat(promiseResult.value)
			else {
				if (typeof promiseResult.reason === 'string') throw new RangeError(promiseResult.reason)
				throw promiseResult.reason
			}
		})
		return results
	}

	protected getIdString(): string {
		return ''
	}

	abstract build(system: System): Promise<Artifact[]>
}
