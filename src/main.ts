import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
// import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
// import { LoggingInterceptor } from "./interceptors/logging.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.useGlobalFilters(new AllExceptionsFilter());
	// app.useGlobalInterceptors(new LoggingInterceptor());

	const config = new DocumentBuilder()
		.setTitle("BFF Example")
		.setDescription("The BFF Example API description")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("", app, document);

	await app.listen(3000);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
