import { GeminiEntityBase } from '../GeminiEntityBase';
import type { GeminiSDK } from '../GeminiSDK';
import type { Control } from '../types';
import type { Interaction, InteractionCreateData } from '../GeminiTypes';
declare class InteractionEntity extends GeminiEntityBase<Interaction> {
    constructor(client: GeminiSDK, entopts: any);
    make(this: InteractionEntity): InteractionEntity;
    create(this: any, reqdata?: InteractionCreateData, ctrl?: Control): Promise<InteractionEntity>;
}
export { InteractionEntity };
