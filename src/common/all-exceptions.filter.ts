import { Request, Response } from 'express';
import { throwError } from 'rxjs';

import {
    ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

interface ResponseObj {
    statusCode: number;
    timestamp: string;
    path?: string;
    response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger("service-auth");

    constructor() {
        super();
    }

    catch(exception: ResponseObj, host: ArgumentsHost) {
        const responseObj = this.createResponseObj(exception);
        const contextType = host.getType();

        // Determine context (HTTP or RPC) and set the path accordingly
        if (contextType === "http") {
            this.handleHttpContext(host, responseObj);
        } else if (contextType === "rpc") {
            this.handleRpcContext(host, responseObj);
        }

        // Determine the exception type and customize the response
        this.handleExceptionType(exception, responseObj);

        // Send the response based on context type
        if (contextType === "http") {
            this.sendHttpResponse(host, responseObj, exception);
        } else if (contextType === "rpc") {
            return this.sendRpcResponse(responseObj);
        }
    }

    // Creates a basic response object
    private createResponseObj(exception: ResponseObj): ResponseObj {
        return {
            statusCode: exception?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            response: exception?.response || "something-went-wrong-please-try-again-later"
        };
    }

    // Handles setting up the response for HTTP context
    private handleHttpContext(host: ArgumentsHost, responseObj: ResponseObj) {
        const httpHost = host.switchToHttp();
        const request = httpHost.getRequest<Request>();
        responseObj.path = request.url;
    }

    // Handles setting up the response for RPC context
    private handleRpcContext(host: ArgumentsHost, responseObj: ResponseObj) {
        const rpcHost = host.switchToRpc();
        const context = rpcHost.getContext();
        responseObj.path = context.args[2] || "triggered_action";
    }

    // Handles sending the HTTP response
    private sendHttpResponse(host: ArgumentsHost, responseObj: ResponseObj, exception: unknown) {
        const httpHost = host.switchToHttp();
        const response = httpHost.getResponse<Response>();
        const request = httpHost.getRequest<Request>();

        response.status(responseObj.statusCode).json(responseObj);
        this.logger.error({ type: "http-exception", path: responseObj.path, method: request.method, statusCode: responseObj.statusCode, response: responseObj.response });
        super.catch(exception, host);
    }

    // Handles sending the RPC response
    private sendRpcResponse(responseObj: ResponseObj) {
        this.logger.error({ type: "rpc-exception", path: responseObj.path, method: "rpc", statusCode: responseObj.statusCode, response: responseObj.response });
        return throwError(() => responseObj);
    }

    // Handles determining the type of exception and setting the response accordingly
    private handleExceptionType(exception: unknown, responseObj: ResponseObj) {
        if (exception instanceof HttpException) {
            this.handleHttpException(exception, responseObj);
        }
    }

    // Handles HTTP exceptions specifically
    private handleHttpException(exception: HttpException, responseObj: ResponseObj) {
        responseObj.statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        if (typeof exceptionResponse === "object" && "message" in exceptionResponse) {
            const message = exceptionResponse.message;
            responseObj.response = Array.isArray(message) ? message[0] : message;
        }
    }
}
