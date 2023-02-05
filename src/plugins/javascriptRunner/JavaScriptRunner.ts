import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'
import { LogAsyncMethod } from '@tverstraten/log-annotations'

/**
 * NOTE: clearly there is a security risk with this, only use with thoroughly trusted, safe code. If using external or un-trusted
 * code the SafeJavaScriptBuilder should be used.
 */
export class JavaScriptRunner extends AbstractSingularBuilder {
	constructor(configurationValues?: Record<string, any>) {
		super(
			'A builder that executes arbitrary JavaScript code',
			{
				scriptToRun: {
					name: 'scriptToRun',
					required: true,
					description: `The JavaScript to invoke, it should have the signature of Builder.build 'function(system: System, component: SystemComponent): Promise<Artifact[]>, for example function( system, component ){ return [ system ] }'`,
					valueType: ValueType.string,
					defaultValue: ``,
				},
			},
			configurationValues ? configurationValues : []
		)
	}

	@LogAsyncMethod()
	protected async buildInternal(system: System, component: SystemComponent): Promise<Artifact[]> {
		const scriptBody = this.getConfiguredValue('scriptToRun')

		const wrap = (__stub: any): string => `{ return ${scriptBody} };`
		const functionToExecute = new Function(wrap(scriptBody))
		return functionToExecute.call(null).call(null, system, component)
	}
}
