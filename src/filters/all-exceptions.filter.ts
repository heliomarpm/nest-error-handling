import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		// Estrutura de resposta padrão
		const errorResponse = {
			data: null,
			error: {
				statusCode: null,
				message: "Internal Server Error",
				error: "InternalError",
				timestamp: new Date().toISOString(),
				path: request.url,
			},
		};

		if (exception instanceof HttpException) {
			const httpExceptionResponse = exception.getResponse();
			errorResponse.error.statusCode = exception.getStatus();
			errorResponse.error.message =
				typeof httpExceptionResponse === "string"
					? httpExceptionResponse
					: httpExceptionResponse["message"] || "Erro inesperado";
			errorResponse.error.error = exception.name || "HttpException";
		} else {
			errorResponse.error.message = "Erro inesperado";
			errorResponse.error.error = "InternalError";
		}

		// Retorna sempre com status 200
		response.status(HttpStatus.OK).json(errorResponse);
	}
}
