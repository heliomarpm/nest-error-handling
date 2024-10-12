import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, AllExceptionsFilter],
})
export class AppModule {}
