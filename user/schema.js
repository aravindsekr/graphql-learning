const { gql } = require("apollo-server");

const typeDefs = gql`
  directive @log(message: String = "my message") on FIELD_DEFINITION

  enum AnimalType {
    DOG
    CAT
    CUCKOO
  }

  #union PetStore = Dog | Cat | Cuckoo

  type User {
    id: ID!
    name: String!
    pets: [Pet]
  }

  interface Pet {
    id: ID!
    createdAt: String!
    name: String! @log
    type: AnimalType!
    user: User!
  }

  type Dog implements Pet {
    id: ID!
    createdAt: String!
    name: String! @log
    type: AnimalType!
    willBark: Boolean!
    user: User!
  }

  type Cat implements Pet {
    id: ID!
    createdAt: String!
    name: String! @log
    type: AnimalType!
    willMeow: Boolean!
    user: User!
  }

  type Cuckoo implements Pet {
    id: ID!
    createdAt: String!
    name: String! @log
    type: AnimalType!
    willTweet: Boolean!
    user: User!
  }

  input PetInput {
    name: String
    type: AnimalType
  }

  type Query {
    pets(input: PetInput): [Pet]!
  }

  type Mutation {
    newPet(input: PetInput): Pet
    newItem(input: String): Item
  }

  type Item {
    name: String!
  }

  type Subscription {
    newItem: Item
  }
`;

module.exports = typeDefs;
