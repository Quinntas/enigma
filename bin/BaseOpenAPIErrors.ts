import {ControllerOpenAPISchemaFactoryConfigResponse} from "../utils/ControllerOpenAPISchemaFactory";

export const openAPIInternalServerError: ControllerOpenAPISchemaFactoryConfigResponse = {
    code: 500,
    description: 'Internal server error',
    schema: {
        message: {
            type: 'string',
            default: 'Internal server error',
        },
    },
}

export const openAPIRateLimitExceeded: ControllerOpenAPISchemaFactoryConfigResponse = {
    code: 429,
    description: 'Rate limit exceeded',
    schema: {
        message: {
            type: 'string',
            default: 'Rate limit exceeded',
        },
    },
}


export const openAPIZodValidationError: ControllerOpenAPISchemaFactoryConfigResponse = {
    code: 422,
    description: 'Validation Error',
    schema: {
        message: {
            type: 'string',
            default: 'Validation Error',
        },
        errors: {
            type: 'object',
            properties: {
                validation: {
                    type: 'string'
                },
                code: {
                    type: 'string'
                },
                message: {
                    type: 'string'
                },
                path: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            },
        },
    },
};

export const baseOpenAPIErrors: ControllerOpenAPISchemaFactoryConfigResponse[] = [
    openAPIInternalServerError,
    openAPIRateLimitExceeded,
    openAPIZodValidationError
]
