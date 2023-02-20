/* eslint-disable max-lines-per-function */

import ts, { ClassDeclaration, ImportDeclaration, SyntaxKind } from 'typescript'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { Class } from '../../information-architecture'
import { AbstractTypeScriptAstHarvester } from '../../typescript/AbstractTypeScriptAstHarvester'

/**
 * A harvester that takes typescript code for service classes and harvest service dependencies
 */
export class TypescriptServiceDependencyHarvester extends AbstractTypeScriptAstHarvester {
	/**
	 * create a new instance of the harvester
	 */
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that reads service dependency information from typescript files', {}, configurationValues)
	}

	/**
	 * harvest imports from a file and add them to the appropriate service class
	 *
	 * @param system - the system the imports should be added to
	 * @param ast - the ast to harvest the imports from
	 * @returns the artifacts that have been created
	 */
	async harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]> {
		const importedClasses: Class[] = []
		const results = [] as Artifact[]
		try {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			ts.forEachChild(ast, function visit(node: ts.Node) {
				switch (node.kind) {
					case SyntaxKind.ImportDeclaration:
						const importStatement = node as ImportDeclaration
						const importedNamesContainer = importStatement.importClause?.namedBindings
						const names = (importedNamesContainer as any).elements
						//const module = (importedNamesContainer as any).moduleSpecifier;
						const text = importStatement.getText(ast)
						if (names && text.includes('.service'))
							names.forEach((nameObject: any) => {
								const name = nameObject.getText(ast)
								if (name != null && name.length > 0) {
									// is it the name of a service?
									let fullName = SystemComponent.fullConstantCase('service', name)
									let match = system.descendants[fullName] as Class
									if (match != null && !importedClasses.includes(match)) {
										importedClasses.push(match)
									}
									fullName = SystemComponent.fullConstantCase('service', `${name}_service`)
									match = system.descendants[fullName] as Class
									if (match != null && !importedClasses.includes(match)) {
										importedClasses.push(match)
										importedClasses.sort()
									}
								}
							})
						break
					case SyntaxKind.ClassDeclaration:
						const classDeclaration = node as ClassDeclaration
						const name = classDeclaration.name?.getText(ast)
						if (name != null && name.length > 0) {
							const fullName = SystemComponent.fullConstantCase('service', name)
							const serviceClass = system.descendants[fullName] as Class
							if (serviceClass != null) {
								serviceClass.specifiedDependencies = importedClasses
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
