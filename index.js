const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
const { buildQuery } = require('graphql-query-builder');
const { graphql } = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: GraphQLString,
                args: {
                    id: { type: GraphQLString },
                },
                resolve: (parent, args) => {
                    return `{
            user(id: ${args.id}) {
              name
              email
            }
          }`;
                },
            },
        },
    }),
});

app.post('/convert', (req, res) => {
    const { text } = req.body;

    const query = buildQuery('query', {
        user: {
            __args: {
                id: 123,
            },
            name: true,
            email: true,
        },
    });

    graphql(schema, query).then(result => {
        res.json({ query: result });
    });
});
