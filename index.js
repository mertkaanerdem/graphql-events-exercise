const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { events, users, locations, participants } = require("./data.json");

const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
  }

  type Query {
    #events
    events: [Event!]!

    #locations
    locations: [Location!]!

    #users
    users: [User!]!

    #participants
    participants: [Participant!]!
  }
`;

const resolvers = {
  Query: {
    events: () => events,
    locations: () => locations,
    users: () => users,
    participants: () => participants,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
