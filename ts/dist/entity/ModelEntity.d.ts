import { GeminiEntityBase } from '../GeminiEntityBase';
import type { GeminiSDK } from '../GeminiSDK';
import type { Control } from '../types';
import type { Model, ModelLoadMatch, ModelListMatch } from '../GeminiTypes';
declare class ModelEntity extends GeminiEntityBase<Model> {
    constructor(client: GeminiSDK, entopts: any);
    make(this: ModelEntity): ModelEntity;
    load(this: any, reqmatch?: ModelLoadMatch, ctrl?: Control): Promise<ModelEntity>;
    list(this: any, reqmatch?: ModelListMatch, ctrl?: Control): Promise<ModelEntity[]>;
}
export { ModelEntity };
