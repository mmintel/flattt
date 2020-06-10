"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintService = void 0;
const blueprint_repository_1 = require("./blueprint.repository");
const common_1 = require("@nestjs/common");
let BlueprintService = (() => {
    let BlueprintService = class BlueprintService {
        constructor(blueprintRepository) {
            this.blueprintRepository = blueprintRepository;
            this.logger = new common_1.Logger('BlueprintService');
        }
        async getBlueprints() {
            this.logger.verbose('Called getBlueprints');
            return this.blueprintRepository.find();
        }
    };
    BlueprintService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [blueprint_repository_1.BlueprintRepository])
    ], BlueprintService);
    return BlueprintService;
})();
exports.BlueprintService = BlueprintService;
//# sourceMappingURL=blueprint.service.js.map