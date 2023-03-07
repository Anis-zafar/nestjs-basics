import { sign } from "jsonwebtoken";

export class RefreshToken {
  id: number;
  userId: number;
  userAgent: string;
  ipAddress: string;
}
sign():String{
    return sign({...this},'MYNAMEISKHAN')
}
