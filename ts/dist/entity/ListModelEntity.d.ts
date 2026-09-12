import { GeminiEntityBase } from '../GeminiEntityBase';
import type { GeminiSDK } from '../GeminiSDK';
import type { ListModel } from '../GeminiTypes';
declare class ListModelEntity extends GeminiEntityBase<ListModel> {
    constructor(client: GeminiSDK, entopts: any);
    make(this: ListModelEntity): ListModelEntity;
}
export { ListModelEntity };
