import {OpenAPIV3} from 'openapi-types';
import {controllerOpenAPISchemaFactory} from "../../../../../utils/ControllerOpenAPISchemaFactory";
import {baseOpenAPIErrors} from "../../../../../bin/BaseOpenAPIErrors";

export const healthCheckOpenAPI = controllerOpenAPISchemaFactory({
    path: '/',
    patterns: [
        {
            method: OpenAPIV3.HttpMethods.POST,
            tags: ['/'],
            description: 'Health check',
            summary: 'Health check',
            responses: [
                ...baseOpenAPIErrors,
                {
                    code: 200,
                    description: 'Health check successful',
                    schema: {
                        message: {
                            type: 'string',
                            default: 'ok',
                        },
                    },
                },
            ],
        },
    ],
});