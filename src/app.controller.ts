import {
	BadRequestException,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	NotFoundException,
	Query,
} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("ping")
	getPing(): string {
		return this.appService.getPong();
	}

	@Get("success")
	getSuccess() {
		return { statusCode: 200, data: "Operação bem-sucedida" };
	}

	@Get("error")
	getError(@Query("type") type: string) {
		if (!type) {
			throw new HttpException(
				{ message: 'O parâmetro "type" é necessário.' },
				HttpStatus.BAD_REQUEST,
			);
		}

		throw new Error("Erro desconhecido");
	}
	@Get("badrequest")
	getBadRequest() {
		throw new BadRequestException("Recurso inválido");
	}

	@Get("notfound")
	getNotFound() {
		throw new NotFoundException("Recurso não encontrado");
	}

	@Get("internalerror")
	getInternalError() {
		throw new InternalServerErrorException("Erro interno de servidor");
	}

	@Get("exception")
	getException() {
		throw new HttpException("Repositorio não encontrado", 404);
	}

	@Get("badgateway")
	getBadGateway() {
		throw new HttpException("Bad Gateway", 502);
	}
}
