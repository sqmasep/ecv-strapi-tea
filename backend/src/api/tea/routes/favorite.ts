export default {
  routes: [
    {
      method: "POST",
      path: "/teas/:documentId/favorite",
      handler: "favorite.toggle",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
