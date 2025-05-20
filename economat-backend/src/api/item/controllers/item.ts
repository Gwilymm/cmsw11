/**
 * item controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::item.item",
  ({ strapi }) => ({
    async create(ctx) {
      const { user } = ctx.state;
      if (!user) {
        return ctx.unauthorized(
          "Vous devez être connecté pour créer un article."
        );
      }
      // Préparer les données en incluant l'ID user
      const payload = ctx.request.body.data || {};
      const data = {
        ...payload,
        user: user.id,
      };
      // Créer l'entité via le service de bas niveau
      const entity = await strapi.db.query("api::item.item").create({ data });
      // Sanitize et formater la réponse
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
