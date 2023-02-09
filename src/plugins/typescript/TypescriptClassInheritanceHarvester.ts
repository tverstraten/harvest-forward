import ts, { ClassDeclaration, InterfaceDeclaration, SyntaxKind } from 'typescript'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { Class, InformationModel, Interface } from '../information-architecture'
import { AbstractTypeScriptAstHarvester } from './AbstractTypeScriptAstHarvester'

export class TypescriptClassInheritanceHarvester extends AbstractTypeScriptAstHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		super('A harvester that extracts inheritance relationships from a model of typescript classes', {}, configurationValues)
	}

	// eslint-disable-next-line max-lines-per-function
	async harvestFromAst(system: System, ast: ts.SourceFile): Promise<Artifact[]> {
		const _thisThis = this
		const results = [] as Artifact[]
		const model = InformationModel.fromSystem(system)

		try {
			// eslint-disable-next-line @typescript-eslint/naming-convention, max-lines-per-function
			ts.forEachChild(ast, function visit(node: ts.Node) {
				switch (node.kind) {
					case SyntaxKind.InterfaceDeclaration:
						const interfaceDeclaration = node as InterfaceDeclaration
						const interfaceName = interfaceDeclaration.name?.getText(ast) as string
						if (interfaceName != null && _thisThis.validClass(interfaceName)) {
							const fullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, interfaceName)
							const valueClass = system.descendants[fullName] as Class

							interfaceDeclaration.heritageClauses?.forEach((clause) => {
								clause.types.forEach((parentTypeNode) => {
									console.log(`child ${parentTypeNode.kind}`)
									const identifierNode = parentTypeNode.expression
									const baseClassName = identifierNode.getText(ast) as string
									const baseClassFullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, baseClassName)
									const baseClass = system.descendants[baseClassFullName]
									if (baseClass instanceof Interface) valueClass.inheritsFrom.push(baseClass as Interface)
								})
							})

							if (valueClass) {
								ts.forEachChild(node, visit)
							}
						}
						break
					case SyntaxKind.ClassDeclaration:
						const classDeclaration = node as ClassDeclaration
						const className = classDeclaration.name?.getText(ast) as string
						if (className != null && _thisThis.validClass(className)) {
							const fullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, className)
							const valueClass = system.descendants[fullName] as Class

							classDeclaration.heritageClauses?.forEach((clause) => {
								clause.types.forEach((parentTypeNode) => {
									console.log(`child ${parentTypeNode.kind}`)
									const identifierNode = parentTypeNode.expression
									const baseClassName = identifierNode.getText(ast) as string
									const baseClassFullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, baseClassName)
									const baseClass = system.descendants[baseClassFullName]
									if (baseClass instanceof Class) valueClass.inheritsFrom.push(baseClass as Class)
									else if (baseClass instanceof Interface) valueClass.implements.push(baseClass as Interface)
								})
							})

							if (valueClass) {
								ts.forEachChild(node, visit)
							}
						}
						break
					default:
						// ignore
						break
				}
				//console.log(node.kind);
			})

			return results
		} catch (problem) {
			this.logger.error(`harvestFromAst(failed) ${problem}`)
			throw problem
		}
	}
}
