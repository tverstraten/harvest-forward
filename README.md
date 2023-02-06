# Harvest Forward Runtime

![Build Status](https://github.com/tverstraten/runtime/actions/workflows/ci.yml/badge.svg)
![Jest Coverage](badges/coverage-jest%20coverage.svg)
![Types](https://img.shields.io/npm/types/typescript)
![Node](https://img.shields.io/node/v/typescript)

# Overview

Harvest, transform, generate and repeat.

If you have one or more artifacts that systematically define what other artifacts should be then Harvest Forward may be able to assist. Write or annotate one artifact and using tooling to produce as much of the other artifacts as possible, _turn it over to the machine_.

Harvest Forward is a framework built to assist with artifact(code) generation, more specifically allowing harvesters, transformers and generators to be decomposed into reusable pieces and then recombined by configuration as needed. It maintains an internal model that is created, altered and consumed to produce output via the [configuration](#compositionconfiguration) of [plugins](#plugins).

The harvestors, transformers and generators can be arbitrarily ordered so the output of one can be used as the input for another. For example, if we have a model of a REST API layer that produces an open api json file we can then use that json file to generate client side stubs. Alternatively, if we want all service (business logic) layer methods to be exposed via a REST API we can simply parse those classes to read the appropriate methods and extract their signatures and documentation so that we have a model sufficient to generate the api code.

Some simple examples include:

1. Use the typescript harvestors to read model classes into the Harvest Forward model then generate mongoose schemas for working with Mongo
1. Use Java harvestors to read in your spring REST mappings to generate a client api library
1. Use MySql harvestors to read in your model and emit a laravel model with rules to enforce rules such as domains and column length
1. As shown in our [sample application](https://github.com/tverstraten/hf-sample-app-ts-mysql-express), a typescript model is used to produce

    1. A Mysql schema
    1. A basic data access layer with CRUD operations
    1. A basic service layer with CRUD operations proxied to the dal
    1. A base REST API layer for exposing all service layer operations as endpoints

# Quick start

Install Harvest Forward runtime:

```
npm install -g @tverstraten/harvest-forward
```

Create your confirugation file as ./.hf.json

```json
{
    "plugins": [],
    "name": "Harvest Forward sample",
    "configuration": {
        "builder": "SequentialAggregateBuilder",
        "settings": {
            "configurations": [
                {
                    "builder": "builtIn/typescript/enumValueHarvester"
                    "description": "Read a set of typescript enumerations",
                    "settings": {
                        "sourcePath": "./src/model",
                        "fileNamePattern": ".*(?<!_ex)$",
                        "classNamePattern": ".*"
                    }
                },
                {
                    "builder": "builtIn/handlebars/handlebarsGenerator",
                    "description": "Emit the current system as a json file",
                    "settings": {
                        "templateName": "handlebars/builtIn/handlebars/systemAsJson",
                        "targetPath": "./System.json",
                        "overwrite": true
                    }
                }
            ]
        }
    }
}
```

and run Harvest Forward

```
harvest-forward
```

# CLI options

| Switch                        | Description                                                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| -h                            | Output details of cli options                                                                                                                   |
| -config=&lt;file name&gt;     | Specifies the name of the file to read the configuration from. The default is .hf.json                                                          |
| -c=&lt;file name&gt;          | Specifies the name of the file to read the configuration from. The default is .hf.json                                                          |
| -logging=&lt;logging spec&gt; | Provides a specification for what gets logged, see [@tverstraten/log-annotations](https://github.com/tverstraten/log-annotations) for specifics |
| -l=&lt;logging spec&gt;       | Provides a specification for what gets logged, see [@tverstraten/log-annotations](https://github.com/tverstraten/log-annotations) for specifics |

# Plugins

Plugins are pieces of code that are dynamically loaded at startup to provide functionality. You can find some [plugins included](#included-plugins) with this basic repository, find [shared plugs](#finding-and-sharing-plugins) or build your own. In general, when using Harvest Forward you will be creating a [configuration](#compositionconfiguration) that makes use of existing plugins and creating templates or your own plugins.

You can refer to the built in plugins for examples of what and how to build them plus review the [sample](https://github.com/tverstraten/sample-template) and its [tests](src/tests/.hf.json) on how to configure them.

# Models

Models are essentially the data that provides a representation of whatever is being built. In the case of an application it would typically describe classes, enumerations, endpoints, etc. Models are typically created and populated by plugins designed to collect information [Harvesters](#harvesters) but are often modified by plugins that alter or extend them [Transformers](#transformers) and then used to produce some for of output [Generators](#generators-with-templates).

Model shape can be specified by plugins as well. These can be provided to ensure proper coordination of data between various builders. To start with 3 model defintion plugins are include they are [Application Architecture](src/plugins/application-architecture/index.ts), [Information Architecture](/src/plugins/information-architecture/index.ts) and [WebSite](/src/plugins/website/index.ts). You do not have to use these, feel free to use dynamically structure data or add your own plugins to define structure. These are simply Typescript classes.

# Harvesters

A harvester is a builder that extracts information from an external source and then updates the internal model. The built in

Some examples include harvesting information from typescript files such as [classes](/src/plugins/typescript/TypeScriptClassToModelHarvester.ts), [fields](/src/plugins//typescript/TypeScriptClassFieldToModelHarvester.ts), [properties](/src/plugins/typescript/TypeScriptClassPropertyToModelHarvester.ts) and [enumerations](/src/plugins/typescript/TypeScriptEnumValueHarvester.ts), etc.

# Transformers

A transformer is a builder that takes elements of the model and converts it into something else. This can take the form of creating new elements, modifying existing elements or even removing them.

Some examples include [class to table](/src/plugins/application-architecture/builders/ClassToTableTransformer.ts), [model to crud dal](/src/plugins/application-architecture/builders/ModelToDalTransformer.ts) or [service to endpoint](/src/plugins/application-architecture/builders/ServiceToEndpointTransformer.ts).

# Generators (with templates)

Generators are plugins designed to produce output. Harvest Forward comes with one built in generator for [handlebars](src/plugins/handlebars/HandlebarsGenerator.ts), it allows the user to specify elements of the model to iterate over that are then passed to handlebars along with a specified hanlebars template. The output is then saved to file(s) based on the configuration.

# Builtin builders

In order to bootstrap some basic functionality some builders are built in and do not needed to be referenced from a plugin.

## SequentialAggregateBuilder

This builder does not affect the input, model or output by itself. It is used to configure a set of builders that will be run in series, one after the other.

To configure an aggregate builder its settings should look like below:

```json
"builder": "SequentialAggregateBuilder",
"settings": {
    "configurations": [
        {
            "builder": "builtIn/typescript/enumValueHarvester"
        },
        {
            "builder": "builtIn/typescript/classToModelHarvester"
        }
    ]
}
```

## ConcurrentAggregateBuilder

This builder does not affect the input, model or output by itself. It is used to configure a set of builders that will be run in asynchronous, arbitrary order. Each configured builder will be initiated with an awaited promise allowing them to complete with the least possible blocking. This does not use multiple thread or processes, it is still single threaded as per the runtime.

See SequentialAggregateBuilder above on how to configure it.

# Composition/Configuration

In general, the configuration is saved in a root level file called .hf.json. It begins with a section of which external plugins to load, the name of the "system, the name of the builder to load and its settings.

```json
{
    "plugins": [
        "@tverstraten/hf-sample-template"
    ],
    "name": "Test System",
    "configuration": {
    "builder": "SequentialAggregateBuilder",
    "settings": "[]"
}
```

# Included Plugins

To help people get started a number of plugins are built in, you do not have to use any of these, they can all be replaced by using other plugins or building your own.

1. [application-architecture](/src/plugins/application-architecture/README.md)
1. [handlebars](/src/plugins/handlebars/README.md)
1. [information-architecture](/src/plugins/information-architecture/README.md)
1. [javascript](/src/plugins/javascript/README.md)
1. [javascriptRunner](/src/plugins/javascriptRunner/README.md)
1. [nodeRunner](/src/plugins/nodeRunner/README.md)
1. [npmRunner](/src/plugins/npmRunner/README.md)
1. [rdbms-basic](/src/plugins/rdbms-basic/README.md)
1. [rest](/src/plugins/rest/README.md)
1. [typescript-builder](/src/plugins/typescript-builder/README.md)
1. [typescript](/src/plugins/typescript/README.md)
1. [validation](/src/plugins/validation/README.md)

# See also

A sample project demonstrating usage of Harvest Forward can be found at [hf-sample-app-ts-mysql-express](https://github.com/tverstraten/hf-sample-app-ts-mysql-express)

# Finding and Sharing plugins and temples

Coming soon.
