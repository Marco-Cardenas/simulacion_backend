import { Controller, Get, Post, HttpStatus, Res, Body, Param, Put } from '@nestjs/common';
import { CrudService } from './crud.service';

@Controller('api')
export class CrudController {
  constructor(
    private readonly crudService: CrudService
  ){}

  @Post('register')
  async register(@Res() respuesta, @Body() inputData) {
    const isUser = await this.crudService.isUser(inputData.email);

    if(isUser) { //Vemos si el email a registrar ya existe como usuario
      return respuesta.status(HttpStatus.OK).json({ process: false });
    }

    //Se registra si no aparecio
    const outputData = await this.crudService.register(inputData);
    return respuesta.status(HttpStatus.OK).json({ process: true });
  }

  @Get('getUsers')
  async getUsers(@Res() respuesta) {
    const users = await this.crudService.users();
    return respuesta.status(HttpStatus.OK).json({
      users
    });
  }

  @Post('login')
  async login(@Res() respuesta, @Body() inputData) {
    const isUser = await this.crudService.login(inputData);
    if(!isUser) {
      return respuesta.status(HttpStatus.OK).json({ process: false });
    }

    return respuesta.status(HttpStatus.OK).json({ process: true, isUser });
  }

  @Get('main_page')
  async main_page(@Res() respuesta) {
    const games = await this.crudService.getGames();
    return respuesta.status(HttpStatus.OK).json({ process: true, games });
  }

  @Put('add-carrito')
  async addCarrito(@Res() respuesta, @Body() inputData) {
    const r = await this.crudService.addGamesToList(inputData.userID, inputData.gameID);
    return respuesta.status(HttpStatus.OK).json({ process: true });
  }

  @Get('myList/:id')
  async myList(@Res() respuesta, @Param('id') userID) {
    const r = await this.crudService.myList(userID);
    if(!r) {
      return respuesta.status(HttpStatus.OK).json({ process: false });
    }

    return respuesta.status(HttpStatus.OK).json({ process: true, lista: r });
  }

  @Get('myListToBuy/:id')
  async myListToBuy(@Res() respuesta, @Param('id') userID) {
    const r = await this.crudService.myListToBuy(userID);
    if(!r) {
      return respuesta.status(HttpStatus.OK).json({ process: false });
    }

    return respuesta.status(HttpStatus.OK).json({ process: true, lista: r });
  }

  @Get('myGames/:id')
  async myGames(@Res() respuesta, @Param('id') userID) {
    const r = await this.crudService.myGames(userID);
    if(!r) {
      return respuesta.status(HttpStatus.OK).json({ process: false });
    }

    return respuesta.status(HttpStatus.OK).json({ process: true, games: r });
  }

  @Put('comprar-carrito/:id')
  async miCompra(@Res() respuesta, @Param('id') userID) {
    const r = await this.crudService.buyList(userID);
    if(!r) {
      return respuesta.status(HttpStatus.OK).json({ process: false });
    }

    return respuesta.status(HttpStatus.OK).json({ process: true });
  }
}
