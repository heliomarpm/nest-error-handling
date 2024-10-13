import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	HttpException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Logger } from "@nestjs/common";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private logger = new Logger(LoggingInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const response = context.switchToHttp().getResponse();

		return next.handle().pipe(
			tap({
				next: data => {
					// Log da resposta (opcional)
					this.logger.log(`Response: ${JSON.stringify(data)}`);
				},
				error: error => {
					// Log do erro
					this.logger.error(`Error: ${error.message}`, error.stack);
					// // Se for uma exceção HTTP, você pode querer capturá-la e não lançar
					// if (error instanceof HttpException) {
					// 	response.status(200); // Force para sempre 200
					// }
				},
			}),
		);
	}
}
