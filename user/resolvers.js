const { PubSub } = require("apollo-server");

const pubSub = new PubSub();
const NEW_ITEM = "NEW_ITEM";

module.exports = {
  Query: {
    pets(initialVal, { input }, context) {
      // return input.name || input.type
      //   ? context.models.Pet.findMany().filter(
      //       (pet) => pet.name === input.name && pet.type === input.type
      //     )
      //   : context.models.Pet.findMany();

      return context.models.Pet.findMany();
    }
  },
  Mutation: {
    newPet(initVal, { input }, ctx) {
      return ctx.models.Pet.create(input);
    },

    newItem(_, { input }, ctx) {
      pubSub.publish(NEW_ITEM, { newItem: { name: input } });
      return { name: input };
    }
  },
  Subscription: {
    newItem: {
      subscribe: () => pubSub.asyncIterator(NEW_ITEM)
    }
  },
  Pet: {
    __resolveType(pet) {
      console.log(" pet ", pet);
      if (pet.willBark) {
        return "Dog";
      } else if (pet.willMeow) {
        return "Cat";
      } else if (pet.willTweet) {
        return "Cuckoo";
      }
    }
  },
  Dog: {
    user(pet) {
      return {
        name: "User 1",
        pets: []
      };
    }
  },
  Cat: {
    user(pet) {
      return {
        name: "User 2",
        pets: []
      };
    }
  },
  Cuckoo: {
    user(pet) {
      return {
        name: "User 3",
        pets: []
      };
    }
  }
};
