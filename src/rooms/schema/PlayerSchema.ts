import { Schema, type } from "@colyseus/schema";

export class PlayerSchema extends Schema {
  @type("string")
  nickname: string = "";

  constructor(nickname: string) {
    super();
    this.nickname = nickname;
  }

  GetNickname() {
    return this.nickname;
  }

  SetNickname(nickname: string) {
    this.nickname = nickname;
  }
}
