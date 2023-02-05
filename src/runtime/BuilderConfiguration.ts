import { IsNotEmpty, IsString } from 'class-validator'
import { Builder } from './Builder'

export class BuilderConfiguration {
	@IsNotEmpty()
	builder: string | Builder

	@IsString()
	settings: string | Record<string, any>

	constructor() {
		this.builder = ''
		this.settings = ''
	}
}
