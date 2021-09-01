const { ApolloServer, SchemaDirectiveVisitor } = require("apollo-server");

const typeDefs = require("./user/schema");
const resolvers = require("./user/resolvers");
const models = require("./user/models");

const { defaultFieldResolver, GraphQLString } = require("graphql");

class LogDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, type) {
    const resolver = field.resolve || defaultFieldResolver;
    //default argument from defintion
    const { message: defaultMessage } = this.args;

    //for dynamic args from client
    field.args.push({
      type: GraphQLString,
      name: "message"
    });

    field.resolve = (root, { message, ...rest }, ctx, info) => {
      console.log(" hello 👍 ", message || defaultMessage);
      return resolver.call(this, root, rest, ctx, info);
    };

    field.type = GraphQLString;
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    log: LogDirective
  },
  context({ connection }) {
    if (connection) {
      return { ...connection.context, models };
    }
    return { models };
  },
  subscriptions: {
    onConnect(connectionParams) {
      //handle auth here, headers will be passed into that params
    }
  }
});

server.listen(4000).then(() => console.log(" on port 4000"));
