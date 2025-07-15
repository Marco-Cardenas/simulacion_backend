import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../base_datos/games.schema';
import { User } from '../base_datos/users.schema';

@Injectable()
export class CrudService {
  constructor(
    @InjectModel('users_s') private readonly userModel: Model<User>,
    @InjectModel('games_s') private readonly gamesModel: Model<Game>
  ){}

  async register(inputData: any) {
    const outputData = await this.userModel.create(inputData);
    return await outputData.save();
  }

  async users() {
    const users = await this.userModel.find();
    return users;
  }

  async isUser(email) {
    const outputData = await this.userModel.findOne({email});
    if(!outputData) {
      return false;
    }

    return true;
  }

  async login(inputData) {
    const user = await this.userModel.findOne({email: inputData.email});
    if(!user) {
      return false; // Email no registrado | Credenciales Invalidas
    }

    if(user.password != inputData.password) {
      return false; // Clave erronea | Credenciales Invalidas
    }

    return user;
  }

  async getGames() {
    const games = await this.gamesModel.find();
    return games;
  }

  async createGame(inputData) {
    const game = await this.gamesModel.create(inputData);
    return await game.save();
  }

  async addGamesToList(userID, gameID) {
    const x = await this.userModel.findByIdAndUpdate(userID, { $push: { toBuy: gameID } }, { new: true });
    return x;
  }

  async myList(userID) {
    const x = await this.userModel.findById(userID);
    return x?.toBuy;
  }

  async myGames(userID) {
    const x = await this.userModel.findById(userID);
    return x?.bought;
  }

  async buyList(userID) {
    const lt= await this.userModel.findById(userID);
    const lista = lt?.toBuy;

    lista?.forEach(async obj => {
      await this.userModel.findByIdAndUpdate(userID, { $push: { bought: obj }, toBuy: [] }, { new: true });
    });

    return true;
  }

  async myListToBuy(userID) {
    const user = await this.userModel.findById(userID);
    const lista = user?.toBuy;
    var games: {}[] = [];
    if(lista != undefined) {
      for(let i = 0; i < lista.length; i++) {
        const v = await this.gamesModel.findById(lista[i]);
        games.push({title:v?.name, price: v?.price, tax: v?.tax});
      }
    }

    return games;
  }

}
