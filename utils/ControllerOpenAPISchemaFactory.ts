import {OpenAPIV3} from 'openapi-types';
import {z, ZodTypeAny} from "zod";

export interface ControllerOpenAPISchemaFactoryConfigResponse {
    code: number;
    description: string;
    schema: {
        [key: string]: OpenAPIV3.NonArraySchemaObject;
    };
}

export type ControllerOpenAPISchemaFactoryConfig = {
    path: string;
    patterns: {
        method: OpenAPIV3.HttpMethods;
        tags: string[];
        description: string;
        summary: string;
        responses: ControllerOpenAPISchemaFactoryConfigResponse[];
        requestBody?: {
            schema: {
                [key: string]: OpenAPIV3.NonArraySchemaObject;
            };
        };
    }[];
};

export function zodToOpenAPISchema(zodSchema: ZodTypeAny): { [key: string]: OpenAPIV3.NonArraySchemaObject } {
    const schema: { [key: string]: OpenAPIV3.NonArraySchemaObject } = {};
    const shape = zodSchema._def.shape();

    for (const key in shape) {
        const field = shape[key];
        if (field instanceof z.ZodString) {
            schema[key] = {type: "string"};
            if (field._def.checks.some((check: any) => check.kind === "email")) {
                schema[key].format = "email";
            }
        } else if (field instanceof z.ZodNumber) {
            schema[key] = {type: "number"};
        } else if (field instanceof z.ZodBoolean) {
            schema[key] = {type: "boolean"};
        } else if (field instanceof z.ZodEnum) {
            schema[key] = {
                type: "string",
                enum: field._def.values,
            };
        } else if (field instanceof z.ZodObject) {
            schema[key] = {type: "object", properties: zodToOpenAPISchema(field)};
        } else if (field instanceof z.ZodArray) {
            schema[key] = {
                // @ts-ignore
                type: "array",
                items: zodToOpenAPISchema(field._def.type),
            };
        }
    }

    return schema;
}

export function mapToObject<T>(arr: T[], fn: (item: T) => any) {
    return arr.reduce((acc, item) => {
        return {
            ...acc,
            ...fn(item),
        };
    }, {});
}

export function controllerOpenAPISchemaFactory(config: ControllerOpenAPISchemaFactoryConfig) {
    return {
        [config.path]: {
            ...mapToObject(config.patterns, (pattern) => {
                return {
                    [pattern.method]: {
                        tags: pattern.tags,
                        description: pattern.description,
                        summary: pattern.summary,
                        responses: mapToObject(pattern.responses, (response) => {
                            return {
                                [response.code]: {
                                    description: response.description,
                                    content: {
                                        'application/json': {
                                            schema: {
                                                type: 'object',
                                                properties: response.schema,
                                            },
                                        },
                                    },
                                },
                            };
                        }),
                        requestBody: pattern.requestBody
                            ? {
                                required: true,
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: pattern.requestBody.schema,
                                        },
                                    },
                                },
                            }
                            : undefined,
                    },
                };
            }),
        },
    };
}