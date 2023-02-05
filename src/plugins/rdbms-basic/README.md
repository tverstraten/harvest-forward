# RDBMS Plugin

This plugin includes a number of model classes to define the shape of data to define a relational database. It also includes a generic base harvestor and some transformers for rationalizing information about a relational database.

The model classes available are:

1. [Column](./Column.ts)
1. [Constraint](./Constraint.ts)
1. [Domain](./Domain.ts)
1. [DomainValue](./DomainValue.ts)
1. [ForeignKey](./ForeignKey.ts)
1. [PrimaryKey](./PrimaryKey.ts)
1. [RelationalComponent](./RelationalComponent.ts)
1. [RelationalDatabase](./RelationalDatabase.ts)
1. [RelationalStorage](./RelationalStorage.ts)
1. [Schema](./Schema.ts)
1. [Table](./Table.ts)
1. [TableType](./TableType.ts)
1. [TableTypeInfo](./TableTypeInfo.ts)
1. [View](./View.ts)

The builders that are available are:

1. [AbstractSqlSchemaHarvester](./builders/AbstractSqlSchemaHarvester.ts) - A base point of inheritence for harvesters of sql meta data
1. [RdbmsColumnStitcher](./builders/RdbmsColumnStitcher.ts) - A transformer for connecting columns to related objects
1. [RdbmsConstraintStitcher](./builders/RdbmsConstraintStitcher.ts) - A transformer for connecting constraints to related objects
1. [RdbmsFkStitcher](./builders/RdbmsFkStitcher.ts) - A transformer for connecting foreigh keys to related objects
1. [RdbmsPkStitcher](./builders/RdbmsPkStitcher.ts) - A transformer for connecting primary keys to related objects
