export default class Parser {
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