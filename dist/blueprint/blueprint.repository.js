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
exports.BlueprintRepository = void 0;
const config_service_1 = require("../config/config.service");
const json_service_1 = require("../json/json.service");
const common_1 = require("@nestjs/common");
let BlueprintRepository = (() => {
    let BlueprintRepository = class BlueprintRepository {
        constructor(jsonService, configService) {
            this.jsonService = jsonService;
            this.configService = configService;
            this.logger = new common_1.Logger('BlueprintRepository');
            this.blueprintsPath = `${this.configService.get('flattt.blueprintsPath')}`;
        }
        async find() {
            this.logger.verbose(`Called find with ${this.blueprintsPath}`);
            return this.jsonService.readDir(this.blueprintsPath);
        }
        async findOne(path) {
            const filePath = `${this.blueprintsPath}/${path}`;
            this.logger.verbose('Called findOne with %s', filePath);
            return this.jsonService.readFile(filePath);
        }
    };
    BlueprintRepository = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [json_service_1.JsonService,
            config_service_1.ConfigService])
    ], BlueprintRepository);
    return BlueprintRepository;
})();
exports.BlueprintRepository = BlueprintRepository;
//# sourceMappingURL=blueprint.repository.js.map