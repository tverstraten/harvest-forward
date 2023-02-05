# Application Architecture Plugin

This plugin includes a few model classes and transformers for architecting a server side application into data, service and endpoint layers.

The model classes are:

1. [DataAccessLayer](./DataAccessLayer.ts)
1. [ServiceLayer](./ServiceLayer.ts)
1. [EndpointLayer](./EndpointLayer.ts)

This plugin also includes several transformers for created pieces of one layer into pieces of another. Those transformers are:

1. [ClassToTableTransformer](./builders/ClassToTableTransformer.ts) - Take a model class from [Information Architecture](../information-architecture/README.md) and turn it into a [table](../rdbms-basic/Table.ts) with a [primary key](../rdbms-basic/PrimaryKey.ts)
1. [DalToServiceTransformer](./builders/DalToServiceTransformer.ts) - Take a data access class and proxy them in a corresponding service class
1. [ModelToDalTransformer](./builders/ModelToDalTransformer.ts) - Take a model classes and create a CRUD dal class for it
1. [PropertyToColumnTransformer](./builders/PropertyToColumnTransformer.ts) - Take all properties of a model class and ensure they are reflected as [columns](../rdbms-basic/Column.ts) in a coresponding table
1. [ServiceToEndpointTransformer](./builders/ServiceToEndpointTransformer.ts) - Take all methods in a service class and ensure they are exposed in a REST endpoint
