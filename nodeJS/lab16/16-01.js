const http =require('http');
const fs=require('fs');
const {graphql,buildSchema}=require('graphql');
const schema=buildSchema(fs.readFileSync('./graphql.gql').toString());
const { Error400, Error200, IsError } = require('./m607.js');
const {DB,resolver } = require('./16-02mssql');


console.log(DB);
const server = http.createServer();

const context = DB((err, connect) => {
    if (err) {
        console.error('Database connection failed');
    }
    else {
        console.log('Database connection successful');
        server.listen(3000, () => {
            console.log('Server running at http://localhost:3000/')})
            .on('error', (err) => { console.log('Error:', err.code); })
            .on('request', handler);
    }
});

const handler = (request, response) => {
    if (request.method === 'POST') {
        let result = '';
        request.on('data', (data) => { result += data; });
        request.on('end', () => {
            try {
                let obj = JSON.parse(result);
                if (obj.mutation) {
                    graphql(schema, obj.mutation, resolver, context, obj.variables?obj.variables:{})
                        .then((result) => {
                            new IsError(result)
                                .then((json) => { Error400(response, '', json) })
                                .else((json) => { Error200(response, '', json) });
                        })
                }
                if (obj.query) {
                    graphql(schema, obj.query, resolver, context, obj.variables ? obj.variables : {})
                        .then((result) => {
                            new IsError(result)
                                .then((json) => { Error400(response, '', json) })
                                .else((json) => { Error200(response, '', json) });
                        })
                }
            }
            catch (e) {
                Error400(response, JSON.stringify({error: 'Bad Request'}));
            }
        })
    }
};