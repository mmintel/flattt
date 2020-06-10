"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mount = void 0;
const boot_1 = require("./boot");
async function mount(app, mountPath, options) {
    const subApp = await boot_1.boot(options);
    await subApp.init();
    app.use(mountPath, subApp.getHttpAdapter().getInstance());
    return app;
}
exports.mount = mount;
//# sourceMappingURL=mount.js.map