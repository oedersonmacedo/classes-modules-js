import Parser from "./parser.mjs";
import DatabaseError from "./database-error.mjs";

export default class Database {
    constructor (){
        this.tables = {};
        this.parser = new Parser();
    }

    create(parsedStatement) {
        const [,tableName, columns] = parsedStatement;
    
        let tables =  {"columns": {}, "data": []};
        for (let column of columns) {
            const splitColumn = column.split(" ");
            const [nameColumn, typeColumn] = splitColumn;
        
            tables.columns[nameColumn] = typeColumn
        }

        this.tables[tableName]= tables;

        return true;
    }

    insert(parsedStatement){
        let [,tableName, columns, values] = parsedStatement;
        columns = columns.split(',');
        values = values.split(',');
        
        const row = {};

        for (let position in columns) {
            row[columns[position].trim()] = values[position].trim()
        }

        this.tables[tableName].data.push(row);

        return true;
    }

    select(parsedStatement){
        let [, columns, table, whereStatement] = parsedStatement;

        let rows = this.tables[table].data;
        if (whereStatement) {
            const whereValues = whereStatement.split(' and ');
            for (whereValue in whereValues) {
                const [columnSearch, valueSearch] = whereValues[whereValue].split('=');
                
                rows = rows.filter(function(row) { return row[columnSearch]===valueSearch })
            }

        }

        columns = columns.split(',')
        rows = rows.map(function (row) {
            const valuesTransfom = {}
            for(let column of columns){
                valuesTransfom[column.trim()] = row[column.trim()]
            }
            
            return valuesTransfom
        });
        return rows
    }

    delete(parsedStatement){
        let [, table, wherestatement] = parsedStatement;

        let rows = this.tables[table].data;
        if (wherestatement) {
            const [columnSearch, valueSearch] = wherestatement.split('=');
            rows = rows.filter(function(row) { return row[columnSearch.trim()]!=valueSearch.trim() });

        } else {
            rows = []
        }
        this.tables[table].data = rows
        return true
    }

    execute(statement) {
        const parse = this.parser.parse(statement);
        if (parse){
            return this[parse.command](parse.parsedStatement)
        }
        const message = `Syntax error: '${statement}'`
        throw new DatabaseError(statement, message)
    }
}