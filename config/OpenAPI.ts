import {OpenAPIV3} from 'openapi-types';
import {healthCheckOpenAPI} from "../app/modules/shared/controllers/healthCheck/HealthCheck.OpenAPI";
import {createUserOpenAPI} from "../app/modules/user/controllers/CreateUser/CreateUser.OpenAPI";

export const openAPI: OpenAPIV3.Document = {
    info: {
        title: 'Enigma',
        description: 'This is the API documentation for the Enigma rest API.',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Production server',
        },
        {
            url: 'http://localhost:3000/api',
            description: 'Development server',
        },
        {
            url: 'http://localhost:3000/api',
            description: 'Staging server',
        },
    ],
    openapi: '3.0.0',
    paths: {
        ...healthCheckOpenAPI,
        ...createUserOpenAPI
    },
};