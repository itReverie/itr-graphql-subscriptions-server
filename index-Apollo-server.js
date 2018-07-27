const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub(); 

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`

# Comments in GraphQL are defined with the hash (#) symbol.
type Traveller {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  location: Location! @relation(name: "TravellerLocation")
  messages: [Message!]! @relation(name: "MessagesFromTraveller")
}

type Message {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  text: String!
  sentBy: Traveller!  @relation(name: "MessagesFromTraveller")
}

type Location {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  traveller: Traveller! @relation(name: "TravellerLocation")
  latitude: Float!
  longitude: Float!
}

# # # # # # # # # # # # # # # # # # # # # # # # # # 
# # # # # # # # # # # # # # # # # # # # # # # # # # 

type Subscription{
   messageCreated: Message
   locationCreated: Location
}


type Query{
  allMessages:[Message]
  allTravellersCount: Int 
  allLocations:[Location]
  travellerForId($id: ID!):Traveller
  
}

  
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});