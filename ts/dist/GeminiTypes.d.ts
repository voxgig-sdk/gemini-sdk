export interface EmbedContent {
    content: Record<string, any>;
    taskType?: string;
    title?: string;
    values?: any[];
}
export interface EmbedContentCreateData {
    model: string;
    key: string;
    content: Record<string, any>;
    taskType?: string;
    title?: string;
    values?: any[];
}
export interface GenerateContent {
    candidates?: any[];
    contents: any[];
    generationConfig?: Record<string, any>;
    promptFeedback?: Record<string, any>;
    safetySettings?: any[];
    tools?: any[];
    usageMetadata?: Record<string, any>;
}
export interface GenerateContentCreateData {
    model: string;
    key: string;
    candidates?: any[];
    contents: any[];
    generationConfig?: Record<string, any>;
    promptFeedback?: Record<string, any>;
    safetySettings?: any[];
    tools?: any[];
    usageMetadata?: Record<string, any>;
}
export interface Interaction {
    config?: Record<string, any>;
    input: string;
    model: string;
}
export interface InteractionCreateData {
    config?: Record<string, any>;
    input: string;
    model: string;
}
export interface ListModel {
}
export interface Model {
    description?: string;
    displayName?: string;
    id?: string;
    inputTokenLimit?: number;
    name?: string;
    outputTokenLimit?: number;
    supportedGenerationMethods?: any[];
    version?: string;
}
export interface ModelLoadMatch {
    id: string;
    key: string;
}
export interface ModelListMatch {
    key: string;
    page_size?: number;
    page_token?: string;
}
