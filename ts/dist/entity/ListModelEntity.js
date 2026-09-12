"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModelEntity = void 0;
const GeminiEntityBase_1 = require("../GeminiEntityBase");
// TODO: needs Entity superclass
class ListModelEntity extends GeminiEntityBase_1.GeminiEntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'list_model';
        this.name_ = 'list_model';
        this.Name = 'ListModel';
    }
    make() {
        return new ListModelEntity(this._client, this.entopts());
    }
}
exports.ListModelEntity = ListModelEntity;
//# sourceMappingURL=ListModelEntity.js.map