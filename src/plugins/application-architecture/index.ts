import { Builder } from '../../runtime/Builder'
import { ClassToTableTransformer } from './builders/ClassToTableTransformer'
import { DalToServiceTransformer } from './builders/DalToServiceTransformer'
import { ModelToDalTransformer } from './builders/ModelToDalTransformer'
import { PropertyToColumnTransformer } from './builders/PropertyToColumnTransformer'
import { PropertyToForeignKeyTransformer } from './builders/PropertyToForeignKeyTransformer'
import { ServiceToEndpointTransformer } from './builders/ServiceToEndpointTransformer'

export const BUILDERS = {
	classToTableTransformer: (settings: any): Builder => new ClassToTableTransformer(settings),
	dalToServiceTransformer: (settings: any): Builder => new DalToServiceTransformer(settings),
	modelToDalTransformer: (settings: any): Builder => new ModelToDalTransformer(settings),
	propertyToColumnTransformer: (settings: any): Builder => new PropertyToColumnTransformer(settings),
	serviceToEndpointTransformer: (settings: any): Builder => new ServiceToEndpointTransformer(settings),
	propertyToForeignKeyTransformer: (settings: any): Builder => new PropertyToForeignKeyTransformer(settings),
}

export * from './builders/ClassToTableTransformer'
export * from './builders/DalToServiceTransformer'
export * from './builders/ModelToDalTransformer'
export * from './builders/PropertyToColumnTransformer'
export * from './builders/PropertyToForeignKeyTransformer'
export * from './builders/ServiceToEndpointTransformer'
export * from './DataAccessLayer'
export * from './EndpointLayer'
export * from './ServiceLayer'
