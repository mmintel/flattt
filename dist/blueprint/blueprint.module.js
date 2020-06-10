"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintModule = void 0;
const json_1 = require("../json");
const common_1 = require("@nestjs/common");
const blueprint_repository_1 = require("./blueprint.repository");
const blueprint_resolver_1 = require("./blueprint.resolver");
const blueprint_service_1 = require("./blueprint.service");
let BlueprintModule = (() => {
    let BlueprintModule = class BlueprintModule {
    };
    BlueprintModule = __decorate([
        common_1.Module({
            imports: [
                json_1.JsonModule,
            ],
            providers: [
                blueprint_resolver_1.BlueprintResolver,
                blueprint_service_1.BlueprintService,
                blueprint_repository_1.BlueprintRepository
            ]
        })
    ], BlueprintModule);
    return BlueprintModule;
})();
exports.BlueprintModule = BlueprintModule;
//# sourceMappingURL=blueprint.module.js.map