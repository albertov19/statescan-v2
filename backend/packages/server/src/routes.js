const Router = require("koa-router");
const router = new Router();

const routes = [
  require("./features/blocks/routes"),
  require("./features/extrinsics/routes"),
  require("./features/events/routes"),
  require("./features/calls/routes"),
];

module.exports = (app) => {
  for (const r of routes) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  app.use(router.routes());
}
