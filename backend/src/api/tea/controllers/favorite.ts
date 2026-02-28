import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async toggle(ctx: any) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized("Authentication required");
    }

    const { documentId } = ctx.params as { documentId: string };

    // Fetch the tea's numeric id from its documentId
    const tea = await strapi.db
      .query("api::tea.tea")
      .findOne({ where: { documentId } });

    if (!tea) {
      return ctx.notFound("Tea not found");
    }

    // Fetch user with current favorites
    const userWithFavorites = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { id: user.id },
        populate: { favorites: { select: ["id"] } },
      });

    const isFavorite = (
      userWithFavorites?.favorites as { id: number }[]
    )?.some(f => f.id === tea.id);

    // Toggle the relation
    await strapi.db.query("plugin::users-permissions.user").update({
      where: { id: user.id },
      data: {
        favorites: {
          [isFavorite ? "disconnect" : "connect"]: [{ id: tea.id }],
        },
      },
    });

    ctx.send({ isFavorite: !isFavorite, teaDocumentId: documentId });
  },
});
