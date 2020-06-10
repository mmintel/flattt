"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function boot(options) {
    return core_1.NestFactory.create(app_module_1.AppModule.register(options));
}
exports.boot = boot;
//# sourceMappingURL=boot.js.map