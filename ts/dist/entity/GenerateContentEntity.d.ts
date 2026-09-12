import { GeminiEntityBase } from '../GeminiEntityBase';
import type { GeminiSDK } from '../GeminiSDK';
import type { Control } from '../types';
import type { GenerateContent, GenerateContentCreateData } from '../GeminiTypes';
declare class GenerateContentEntity extends GeminiEntityBase<GenerateContent> {
    constructor(client: GeminiSDK, entopts: any);
    make(this: GenerateContentEntity): GenerateContentEntity;
    create(this: any, reqdata?: GenerateContentCreateData, ctrl?: Control): Promise<GenerateContentEntity>;
}
export { GenerateContentEntity };
