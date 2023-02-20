/* eslint-disable max-lines-per-function */
import ts, { ClassDeclaration, SyntaxKind } from 'typescript'
import { Artifact } from '../../../system/Artifact'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { Class } from '../../information-architecture'
import { AbstractTypeScriptAstHarvester } from '../../typescript/AbstractTypeScriptAstHarvester'

/**
 * A harvester that takes typescript code for service classes and harvest service dependencies
 */
export class TypescriptServiceHarvester extends AbstractTypeScriptAstHarvester {
	/**
	 * create a new instance of the harvester
	 */
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that reads services from typescript files', {}, configurationValues)
	}

	/**
	 * harvest imports from a file and add them to the appropriate service class
	 *
	 * @param system - the system the imports should be added to
	 * @param ast - the ast to harvest the imports from
	 * @returns the artifacts that have been created
	 */
	async harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]> {
		const results = [] as Artifact[]
		try {
			ts.forEachChild(ast, function visit(node: ts.Node) {
				switch (node.kind) {
					case SyntaxKind.ClassDeclaration:
						const classDeclaration = node as ClassDeclaration
						const modifiers = classDeclaration.modifiers
						let isConcrete = true
						if (modifiers != null) {
							modifiers.forEach((modifier) => {
								const text = modifier.getText(ast)
								if (text === 'abstract' || text === 'interface') isConcrete = false
							})
						}
						const name = classDeclaration.name?.getText(ast)
						if (isConcrete && name != null && name.length > 0) {
							const fullName = SystemComponent.fullConstantCase('service', name)
							let serviceClass = system.descendants[fullName] as Class
							if (serviceClass == null) {
								const memberJsDoc = (node as any).jsDoc as any[]
								let memberDocumentationText = ''
								if (memberJsDoc != null) {
									memberJsDoc.forEach((jsDocItem) => {
										memberDocumentationText += jsDocItem.comment as string
									})
								}

								serviceClass = new Class('service', name, memberDocumentationText, SystemComponentType.service)
								serviceClass.permanence = Permanence.constant
								serviceClass.informational = true
								serviceClass.functional = false
								serviceClass.origin = ComponentOrigin.harvested
								system.addChild(serviceClass)
								results.push(new SystemComponentArtifact(serviceClass))
							}
						}
						break
					default:
						// ignore
						break
				}
				//console.log(node.kind);
			})
		} catch (problem) {
			this.logger.error(`harvestFromAst(failed) ${problem}`)
		}
		return results
	}
}
