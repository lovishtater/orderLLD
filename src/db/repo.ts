import mongoose from "mongoose";

export const repo = {
  transaction: async (callback: (session: any) => Promise<void>) => {
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
  },
};
