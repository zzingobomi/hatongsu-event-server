import { Schema, type } from "@colyseus/schema";

export class PlayerSchema extends Schema {
  @type("string")
  playerId: string = "";

  @type("string")
  nickname: string = "";

  constructor(playerId: string, nickname: string) {
    super();
    this.playerId = playerId;
    this.nickname = nickname;
  }

  GetPlayerId() {
    return this.playerId;
  }

  GetNickname() {
    return this.nickname;
  }

  SetNickname(nickname: string) {
    this.nickname = nickname;
  }
}
