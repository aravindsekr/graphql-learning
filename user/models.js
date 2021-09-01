module.exports = {
  Pet: {
    findMany: () => {
      return [
        {
          createdAt: "Today",
          name: "Pet 1",
          type: "DOG",
          willBark: true,
          user: 1
        },
        {
          createdAt: "Yesterday",
          name: "Pet 2",
          type: "CAT",
          willMeow: true,
          user: 2
        },
        {
          createdAt: "Day before yesterday",
          name: "Pet 3",
          type: "CUCKOO",
          willTweet: true,
          user: 2
        }
      ];
    },
    create: (pet) => {
      return pet;
    }
  }
};
