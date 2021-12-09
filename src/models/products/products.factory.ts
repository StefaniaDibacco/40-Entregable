import { ProductosMemDAO } from './DAOs/memory';
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosMongoDAO } from './DAOs/mongo';
import { logger } from '../../utils/logger';
import { ProductBaseClass } from './products.interface';
import path from 'path';

export enum TipoPersistencia {
  // eslint-disable-next-line no-unused-vars
  Memoria = 'MEM',
  // eslint-disable-next-line no-unused-vars
  FileSystem = 'FS',
  // MYSQL = 'MYSQL',
  // SQLITE3 = 'SQLITE3',
  // eslint-disable-next-line no-unused-vars
  LocalMongo = 'LOCAL-MONGO',
  // Firebase = 'FIREBASE',
}

export class NoticiasFactoryDAO {
  private static instance: ProductBaseClass;
  private static value: number;

  static model(type: any): ProductBaseClass {
    switch (type) {
      case TipoPersistencia.FileSystem:
        logger.info('Retornando Instancia Products FS');
        // eslint-disable-next-line no-case-declarations
        const filePath = path.resolve(__dirname, '../../DAOs/productos.json');
        if (!this.instance) this.instance = new ProductosFSDAO(filePath);
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;

      case TipoPersistencia.LocalMongo:
        logger.info('Retornando Instancia Products Mongo Local');
        if (!this.instance)
          this.instance = this.instance = new ProductosMongoDAO();
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;

      default:
        if (!this.instance)
          logger.info('Retornando Instancia Products Default');
        this.instance = this.instance = new ProductosMemDAO();
        if (!this.value) this.value = Math.random();
        console.log(this.value);
        return this.instance;
    }
  }
}
