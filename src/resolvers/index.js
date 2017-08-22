module.exports = {
  Query: {
    user: () => ({
      name: 'Amanda',
      publicContent: 'Public'
    })
  },
  User: {
    privateContent: (user, args, context) => {
      return 'Private';
    }
  }
}
