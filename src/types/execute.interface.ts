import { FieldPacket, RowDataPacket } from "mysql2";

export type IExecute = [RowDataPacket[], FieldPacket[]];
