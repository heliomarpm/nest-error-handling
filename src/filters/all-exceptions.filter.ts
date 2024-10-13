import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const isHttpException = exception instanceof HttpException;
		const statusCode = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		// const error = isHttpException ? exception.name : "InternalError";

		const message = (): string => {
			if (isHttpException) {
				const httpExceptionResponse = exception.getResponse();
				return typeof httpExceptionResponse === "string"
					? httpExceptionResponse
					: httpExceptionResponse["message"] || "Erro inesperado";
			}

			return "Erro inesperado";
		};

		// Estrutura de resposta padrão
		const errorResponse = {
			data: null,
			error: {
				statusCode,
				type: HttpStatus[statusCode] || "UnknownError",
				message: message(),
				timestamp: new Date().toISOString(),
				path: request.url,
			},
		};

		response.status(statusCode).json(errorResponse);
		// Retorna sempre com status 200
		// response.status(HttpStatus.OK).json(errorResponse);
	}
}
