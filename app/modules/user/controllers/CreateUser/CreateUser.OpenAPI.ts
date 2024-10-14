import {OpenAPIV3} from 'openapi-types';
import {controllerOpenAPISchemaFactory, zodToOpenAPISchema} from "../../../../../utils/ControllerOpenAPISchemaFactory";
import {baseOpenAPIErrors} from "../../../../../bin/BaseOpenAPIErrors";
import {createUserSchema} from "./CreateUser.Schema";

export const createUserOpenAPI = controllerOpenAPISchemaFactory({
    path: '/users',
    patterns: [
        {
            method: OpenAPIV3.HttpMethods.POST,
            tags: ['Users'],
            description: 'Create a new user',
            summary: 'Create a new user',
            responses: [
                ...baseOpenAPIErrors,
                {
                    code: 201,
                    description: 'User created successfully',
                    schema: {
                        message: {
                            type: 'string',
                            default: 'Created Successfully',
                        },
                    },
                },
            ],
            requestBody: {
                schema: zodToOpenAPISchema(createUserSchema)
            }
        },
    ],
});