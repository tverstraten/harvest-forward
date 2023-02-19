# REST Api plugin

This plugin includes several model classes to define the shape of data that describes REST endpoints plus a harvester for reading OpenAPI specication files.

The model classes are:

1. [](./HttpVerb.ts)
1. [](./Path.ts)
1. [](./PathParameter.ts)
1. [](./Resource.ts)
1. [](./RestParameterLocation.ts)

The builders are:

1. [OpenApiJsonToApiHarvester](./builders/OpenApiJsonToApiHarvester.ts) - Read in an open api specification from a json file
