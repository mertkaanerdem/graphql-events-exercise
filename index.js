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
    user: User!
    location: Location!
    participants: [Participant!]!
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
    events: [Event!]!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
  }

  type Query {
    #events
    events: [Event!]!
    event(id: ID!): Event!

    #locations
    locations: [Location!]!
    location(id: ID!): Location!

    #users
    users: [User!]!
    user(id: ID!): User!

    #participants
    participants: [Participant!]!
  }
`;

const resolvers = {
  Query: {
    // events & single event
    events: () => events,
    event: (parent, args) => events.find((event) => event.id == args.id),

    // locations
    locations: () => locations,
    location: (parent, args) =>
      locations.find((location) => location.id == args.id),

    // users & single user
    users: () => users,
    user: (parent, args) => {
      const user = users.find((user) => user.id == args.id); //yukarıda query e eklenen user(id:ID!)... devamı ve &&tekil user'a ulaşmak için gerekli olan func.
      if (!user) new Error("user not found");
      return user;
    },

    // participants
    participants: () => participants,
  },

  //Custom Queries
  Event: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    location: (parent, args) =>
      locations.find((location) => location.id === parent.location_id),
    participants: (parent, args) =>
      participants.filter((participant) => participant.event_id === parent.id),
  },
  User: {
    events: (parent, args) =>
      events.filter((event) => event.user_id === parent.id),
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
