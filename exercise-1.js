class DatabaseError {
    constructor(statement,message){
        this.statement = statement
        this.message = message
    }
}

class Parser {
    constructor(){
        this.commands = new Map([
            [ 'create', /^create table ([a-z]+) \((.+)\)/ ],
            [ 'insert', /^insert into (\w+)\s*\(([\w\s,]+)\) values \(([\w\s,]+)\)/ ],
            [ 'select', /^select\s([\w\s,]+)\s+from\s+(\w+)(?: where (.+))?/ ],
            [ 'delete', /^delete\s+from\s+(\w+)(?: where (.+))?/ ]
        ]);
    }

    parse = function(statement) {
        for (const [command, regexp] of this.commands) {
            const parsedStatement = statement.match(regexp);
            if(parsedStatement !== null) {
                return {
                    command,
                    parsedStatement
                }
            }
            
        }
    }
}

class Database {
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

const database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
database.execute("delete from author where id = 2");
console.log(JSON.stringify(database.execute("select name, age from author"), undefined,"   "));
