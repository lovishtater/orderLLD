import mongoose from "mongoose";

export class Repository implements IRepository {
  constructor() {}

  async transaction(callback: (session: any) => Promise<void>) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await callback(session);
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
  async get(collection: string, query: any) {
    return {};
  }
  async insert(collection: string, data: any) {
    return {};
  }
}

export interface IRepository {
  transaction: (callback: (session: any) => Promise<void>) => Promise<void>;
  get: (collection: string, query: any) => Promise<any>;
  insert: (collection: string, data: any) => Promise<any>;
}
