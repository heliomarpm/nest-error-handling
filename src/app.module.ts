import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

@Module({
	imports: [],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_FILTER, useClass: AllExceptionsFilter },
		{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
	],
})
export class AppModule {}
