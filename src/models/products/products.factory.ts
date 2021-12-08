import { ProductosMemDAO } from './DAOs/memory';
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosMongoDAO } from './DAOs/mongo';
import { logger } from '../../utils/logger';
import { ProductI, ProductQuery } from './products.interface';
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
export interface IModel {
  get: (id?: string) => Promise<ProductI | ProductI[]>;
  add: (producto: ProductI) => Promise<ProductI>;
  update: (id: string, producto: ProductI) => Promise<ProductI>;
  delete: (id: string) => Promise<void>;
  query: (options: ProductQuery) => Promise<ProductI | ProductI[]>;
}

export class NoticiasFactoryDAO {
  private static instance: IModel;
  private static value: number;

  static model(type: any): IModel {
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
