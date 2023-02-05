import * as childProcess from 'child_process'
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'
import { Level, LogAsyncMethod } from '@tverstraten/log-annotations'

export class NodeRunner extends AbstractSingularBuilder {
	constructor(configurationValues?: Record<string, any>) {
		super(
			'A builder that executes a node.js application',
			{
				fileToRun: {
					// eslint-disable-next-line spellcheck/spell-checker
					name: 'FileTorun',
					required: true,
					description: 'A full path to a node.js main file to run',
					valueType: ValueType.string,
					defaultValue: ``,
				},
				args: {
					name: 'args',
					required: true,
					description: 'A stringified array of the arguments to pass to the script',
					valueType: ValueType.string,
					defaultValue: ``,
				},
			},
			configurationValues ? configurationValues : []
		)
	}

	private async runScript(scriptPath: string, args: string[] = []): Promise<any> {
		const _thisThis = this
		// keep track of whether callback has been invoked to prevent multiple invocations
		const result = new Promise<any>((resolve: any, reject: any) => {
			let invoked = false
			const process = childProcess.fork(scriptPath, args)

			// listen for errors as they may prevent the exit event from firing
			process.on('error', function (err: any) {
				_thisThis.logger.isLevelEnabled(Level.debug) ? _thisThis.logger.debug(`runScript(${scriptPath}: ${args}) failed ${JSON.stringify(err)}`) : ''
				if (invoked) return
				invoked = true
				reject(err)
			})

			// execute the callback once the process has finished running
			process.on('exit', function (code: any) {
				_thisThis.logger.isLevelEnabled(Level.debug) ? _thisThis.logger.debug(`runScript(${scriptPath}: ${args}) success ${JSON.stringify(code)}`) : ''
				if (invoked) return
				invoked = true
				const err = code === 0 ? null : new Error('exit code ' + code)
				resolve(err)
			})
		})
		return result
	}

	@LogAsyncMethod()
	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		const targetPath = this.getConfiguredValue('fileToRun')
		const argsConfig = this.getConfiguredValue('args')

		const args = argsConfig ? JSON.parse(argsConfig) : []
		await this.runScript(targetPath, args)

		return []
	}
}
