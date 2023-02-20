import fs from 'fs'
import * as sh from 'shelljs'
import { CircularReplacer, Level } from '@tverstraten/log-annotations'
import { HttpVerb } from '../HttpVerb'
import { Path } from '../Path'
import { PathParameter } from '../PathParameter'
import { Resource } from '../Resource'
import { RestParameterLocation } from '../RestParameterLocation'
import { AbstractSingularBuilder } from '../../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../../system/Artifact'
import { ProgrammingLanguage } from '../../../../system/ProgrammingLanguage'
import { SystemComponent } from '../../../../system/SystemComponent'
import { SystemComponentType } from '../../../../system/SystemComponentType'
import { ValueType } from '../../../../system/ValueType'
import { Variable } from '../../../../system/Variable'
import { InformationModel, Class, Method } from '../../../information-architecture'
import { System } from '../../../../system/System'

export class OpenApiJsonToApiHarvester extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		super(
			'A harvester that reads an openapi.json file and creates an api spec from it',
			{
				sourcePath: {
					name: 'Source Path',
					required: true,
					description: 'The fully qualified file name and path to the open api json specification file',
					valueType: ValueType.string,
				},
			},
			configurationValues
		)
	}

	valueTypeFromJson(system: System, typeSpec: any): ValueType {
		const typeString = typeSpec['type']
		if (typeString != null) {
			const upperSpec = typeString.toUpperCase()
			if (upperSpec == 'ARRAY') {
				const componentType = this.valueTypeFromJson(system, typeSpec.items)
				return componentType.asCollection
			}

			const builtInTypes = ValueType.getValues()
			for (let index = 0; index < builtInTypes.length; index++) {
				const type = builtInTypes[index]
				if (type.name == typeString || type.name.toUpperCase() === upperSpec) return type
				const typeScriptName = type.toNameInLanguage(ProgrammingLanguage.typeScript)
				if (typeScriptName == typeString || typeScriptName == upperSpec) return type
			}
		}

		const referenceString = typeSpec['$ref']
		if (referenceString != null) {
			const model = InformationModel.fromSystem(system)
			const referenceName = referenceString.replace(/#.components.schemas./, '')
			const fullName = SystemComponent.fullConstantCase(model.fullConstantCaseName, referenceName)
			let referencedClass = system.descendants[fullName] as ValueType 
			if (referenceName === '') {
				this.logger.info(`valueTypeFromJson(${JSON.stringify(typeSpec, CircularReplacer())}) has empty type specification`)
				return referencedClass
			}
			if (referencedClass != null) return referencedClass

			try {
				referencedClass = ValueType.fromNameInLanguage(ProgrammingLanguage.typeScript, referenceName.toLowerCase()) as ValueType
			} catch (problem) {
				this.logger.error(`valueTypeFromJson(failed) looking for type '${referenceName.toLowerCase()}' ${problem}`)
			}
			if (referencedClass) return referencedClass
		}

		return ValueType.string
	}

	harvestContentType(system: System, returnContext: any): ValueType {
		if (returnContext == null) return ValueType.void
		if (returnContext['application/json'] != null && returnContext['application/json']['schema'] != null)
			return this.valueTypeFromJson(system, returnContext['application/json']['schema'])
		return ValueType.string
	}

	harvestParameter(system: System, proxyClass: Class, method: Method, parameterAsJson: any): void {
		const name = parameterAsJson['name']
		const required = parameterAsJson['required']
		const location = parameterAsJson['in']
		const description = parameterAsJson['description']
		const schema = parameterAsJson['schema']
		const valueType = this.valueTypeFromJson(system, schema)
		const parameter = new PathParameter(method.fullConstantCaseName, name, description, valueType, 0)
		parameter.required = required
		parameter.location = location == 'path' ? RestParameterLocation.path : location == 'query' ? RestParameterLocation.query : RestParameterLocation.body
		let rawType = valueType
		this.logger.isLevelEnabled(Level.debug)
			? this.logger.debug(`harvestParameter(${parameterAsJson}) trying to add parameter dependency to ${rawType.name}`)
			: ''
		while (rawType != null && rawType.isCollection) rawType = rawType.collectedType as Class
		if (rawType instanceof Class) {
			if (!proxyClass.specifiedDependencies.includes(rawType)) {
				this.logger.isLevelEnabled(Level.debug)
					? this.logger.debug(`harvestFromPathAndVerb(${parameterAsJson}) adding parameter type dependency to ${rawType.name}`)
					: ''
				proxyClass.specifiedDependencies.push(rawType)
			}
		}

		// order!
		method.addChild(parameter)
	}

	// eslint-disable-next-line max-lines-per-function
	harvestFromPathAndVerb(system: System, verb: HttpVerb, pathUrlSpec: string, pathDetails: any): void {
		const urlPieces = pathUrlSpec.split('/')
		let index = 0
		while (urlPieces[index] == '') index++
		const resourceName = urlPieces[index++]
		/*
		if (urlPieces[index] != null && !urlPieces[index].match(/^{.*}$/))
			methodName = urlPieces[index];
		else {
			*/
		const pathNamePieces = pathDetails['operationId'].split('_')
		const pathName = pathNamePieces[1]
		//}

		if (pathName != null) {
			const summary = pathDetails['summary']
			const parameters = pathDetails['parameters']

			const proxyName = SystemComponent.fullConstantCase('api', resourceName)
			let proxyResource = system.descendants[proxyName] as Resource
			if (proxyResource == null) {
				proxyResource = new Resource(
					'api',
					resourceName,
					`Service proxy class representing the path at ${resourceName}`,
					SystemComponentType.clientApiProxy
				)
				system.addChild(proxyResource)
			}
			let path = proxyResource.paths[pathName]
			if (path == null) {
				path = new Path(proxyName, pathName, summary)
				path.httpVerb = verb
				proxyResource.addChild(path)
			}
			path.urlPath = pathUrlSpec

			if (pathDetails['requestBody'] != null && pathDetails['requestBody']['content'] != null) {
				const bodyParameterName = 'body'
				const bodyValue = pathDetails['requestBody']['content']
				const bodyType = this.harvestContentType(system, bodyValue)
				this.logger.isLevelEnabled(Level.debug)
					? this.logger.debug(`harvestFromPathAndVerb(${pathUrlSpec}) trying to add body type dependency to ${bodyType.name}`)
					: ''
				if (bodyType instanceof Class) {
					if (!proxyResource.allDependencies.includes(bodyType)) {
						this.logger.isLevelEnabled(Level.debug)
							? this.logger.debug(`harvestFromPathAndVerb(${pathUrlSpec}) adding body type dependency to ${bodyType.name}`)
							: ''
						proxyResource.specifiedDependencies.push(bodyType)
					}
				} else
					this.logger.isLevelEnabled(Level.debug)
						? this.logger.debug(
								`harvestFromPathAndVerb(${pathUrlSpec}) skipping body type dependency ${JSON.stringify(bodyType, CircularReplacer())}`
						  )
						: ''
				const bodyParameter = new PathParameter(path.constantCaseFullName, bodyParameterName, '', bodyType, 0)
				bodyParameter.location = RestParameterLocation.body
				path.addChild(bodyParameter)
			}

			if (parameters != null) {
				// first path parameters
				parameters.forEach((parameterAsJson: any) => {
					if (parameterAsJson['in'] == 'path') this.harvestParameter(system, proxyResource, path, parameterAsJson)
				})

				// then query parameters
				parameters.forEach((parameterAsJson: any) => {
					if (parameterAsJson['in'] == 'query') this.harvestParameter(system, proxyResource, path, parameterAsJson)
				})
			}

			const responses = pathDetails['responses']

			let responseDetails
			if (responses['200'] != null) responseDetails = responses['200']
			if (responses['201'] != null) responseDetails = responses['201']
			if (responseDetails != null) {
				const returnsDescription = responseDetails['description']
				const returnValue = responseDetails['content']
				const returnType = this.harvestContentType(system, returnValue)
				path.returns = new Variable(
					'ValueSpecification',
					`${proxyResource.constantCaseFullName}/${pathName}`,
					'returns',
					returnsDescription,
					returnType,
					0
				)
				let rawReturn = returnType
				this.logger.isLevelEnabled(Level.debug)
					? this.logger.debug(`harvestFromPathAndVerb(${pathUrlSpec}) trying to add return type dependency to ${rawReturn.name}`)
					: ''
				while (rawReturn != null && rawReturn.isCollection) rawReturn = rawReturn.collectedType as Resource
				if (rawReturn instanceof Resource) {
					if (!proxyResource.specifiedDependencies.includes(rawReturn)) {
						this.logger.isLevelEnabled(Level.debug)
							? this.logger.debug(`harvestFromPathAndVerb(${pathUrlSpec}) adding return type dependency to ${rawReturn.name}`)
							: ''
						proxyResource.specifiedDependencies.push(rawReturn)
					}
				} else
					this.logger.isLevelEnabled(Level.debug)
						? this.logger.debug(
								`harvestFromPathAndVerb(${pathUrlSpec}) skipping return type dependency ${JSON.stringify(rawReturn, CircularReplacer())}`
						  )
						: ''
			}
		}
	}

	harvestFromPath(system: System, pathUrlSpec: string, pathDetails: any): void {
		Object.entries(HttpVerb).forEach((verbEntry) => {
			const verb = verbEntry[1] as HttpVerb
			const verbName = verbEntry[0]
			const verbPaths = pathDetails[verbName]
			if (Array.isArray(verbPaths)) {
				verbPaths.forEach((verbPath) => {
					this.harvestFromPathAndVerb(system, verb, pathUrlSpec, verbPath)
				})
			} else if (verbPaths != null) this.harvestFromPathAndVerb(system, verb, pathUrlSpec, verbPaths)
		})
	}

	async harvestFromFile(system: System, fileNameFullPath: string): Promise<void> {
		// parse them out
		try {
			const cwd = sh.pwd()
			// eslint-disable-next-line spellcheck/spell-checker
			const realPath = fs.realpathSync(`${cwd}/${fileNameFullPath}`)
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`harvestFromFile(${this.name}) loading ${realPath}`) : ''

			const sourceText = await fs.promises.readFile(fileNameFullPath)
			const openApiAst = JSON.parse(sourceText.toString())
			const paths = openApiAst['paths']
			Object.keys(paths).forEach((pathUrlSpec) => {
				const pathDetails = paths[pathUrlSpec]
				this.harvestFromPath(system, pathUrlSpec, pathDetails)
			})
		} catch (problem) {
			this.logger.error(`harvestFromFile(failed) ${problem}`)
		}
	}

	async _doesConfigurationWork(): Promise<boolean> {
		const sourcePath = this.getConfiguredValue('sourcePath')
		const result = fs.existsSync(sourcePath)
		return result
	}

	async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		const result = [] as Artifact[]
		const sourcePath = this.getConfiguredValue('sourcePath')
		await this.harvestFromFile(system, sourcePath)

		return result
	}
}
