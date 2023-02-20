# MySql Plugin

A plugin that provides harvesters and transformers for reverse engineering a MySql database plus a template for generating a MySql schema file. There are no model classes included in this, the shape of the model is dervied from the model classes in the [rdbms basic](../rdbms-basic/README.md) plugin.

The harvesters that are included are:

1. [](./MySqlColumnHarvester.ts) - Harvests column metadata and adds it to the model
1. [](./MySqlConstraintHarvester.ts) - Harvests column metadata and adds it to the model
1. [](./MySqlDomainHarvester.ts) - Harvests domain metadata and adds it to the model
1. [](./MySqlFkHarvester.ts) - Harvests foreign key metadata and adds it to the model
1. [](./MySqlPkHarvester.ts) - Harvests primary key metadata and adds it to the model
1. [](./MySqlTableHarvester.ts) - Harvests table metadata and adds it to the model
1. [](./MySqlViewHarvester.ts) - Harvests view metadata and adds it to the model

The templates that are included are:

1. [MySqlSchema](./MySqlSchema.handlebars) - Emits an entire database schema.

It is important to recognize that the base aggregated builders allow settings to be pushed down so a typical configuration for reverse engineering a MySql database might look like

```json
{
	"builder": "SequentialAggregateBuilder",
	"serverUrl": "localhost",
	"database": "fs4",
	"userName": "app",
	"password": "23Skidoo",
	"schemaPattern": "/app/i",
	"tablePattern": "/^((?!_HISTORY$).)*i",
	"settings": [
			{
				"builder": "builtIn/mysql/MySqlColumnHarvester",
				"settings": {},
			},
			{
				"builder": "builtIn/mysql/MySqlConstraintHarvester",
				"settings": {},
			},
			{
				"builder": "builtIn/mysql/MySqlDomainHarvester",
				"settings": {},
			},
			{
				"builder": "builtIn/mysql/MySqlFkHarvester",
				"settings": {},
			},
			{
				"builder": "builtIn/mysql/MySqlPkHarvester",
				"settings": {},
			},
			{
				"builder": "builtIn/mysql/MySqlTableHarvester",
				"settings": {},
			},
			{
				"builder": "builtIn/mysql/MySqlViewHarvester",
				"settings": {},
			},
		],
	},
	{
		"builder": "SequentialAggregateBuilder",
		"settings": [
			{
				"builder": "builtIn/rdbmsBasic/RdbmsColumnStitcher",
				"settings": {},
			},
			{
				"builder": "builtIn/rdbmsBasic/RdbmsPkStitcher",
				"settings": {},
			},
			{
				"builder": "builtIn/rdbmsBasic/RdbmsFkStitcher",
				"settings": {},
			},
			{
				"builder": "builtIn/rdbmsBasic/RdbmsConstraintStitcher",
				"settings": {},
			},
		],
	},
```
