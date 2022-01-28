### graphql-events-exercise

> patika.dev graphql ödevi için oluşturduğum şema

```graphql
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
  events: [Event!]!
  event(id: ID!): Event!
  locations: [Location!]!
  location(id: ID!): Location!
  users: [User!]!
  user(id: ID!): User!
  participants: [Participant!]!
  participant(id: ID!): Participant!
}
```
