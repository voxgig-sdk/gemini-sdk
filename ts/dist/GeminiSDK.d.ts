import { EmbedContentEntity } from './entity/EmbedContentEntity';
import { GenerateContentEntity } from './entity/GenerateContentEntity';
import { InteractionEntity } from './entity/InteractionEntity';
import { ListModelEntity } from './entity/ListModelEntity';
import { ModelEntity } from './entity/ModelEntity';
export type * from './GeminiTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GeminiEntityBase } from './GeminiEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GeminiSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    EmbedContent(entopts?: Record<string, any>): EmbedContentEntity;
    GenerateContent(entopts?: Record<string, any>): GenerateContentEntity;
    Interaction(entopts?: Record<string, any>): InteractionEntity;
    ListModel(entopts?: Record<string, any>): ListModelEntity;
    Model(entopts?: Record<string, any>): ModelEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GeminiSDK;
    tester(testopts?: any, sdkopts?: any): GeminiSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GeminiSDK;
export { stdutil, config, BaseFeature, GeminiEntityBase, GeminiSDK, SDK, };
