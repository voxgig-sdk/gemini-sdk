import { GeminiEntityBase } from '../GeminiEntityBase';
import type { GeminiSDK } from '../GeminiSDK';
import type { Control } from '../types';
import type { EmbedContent, EmbedContentCreateData } from '../GeminiTypes';
declare class EmbedContentEntity extends GeminiEntityBase<EmbedContent> {
    constructor(client: GeminiSDK, entopts: any);
    make(this: EmbedContentEntity): EmbedContentEntity;
    create(this: any, reqdata?: EmbedContentCreateData, ctrl?: Control): Promise<EmbedContentEntity>;
}
export { EmbedContentEntity };
