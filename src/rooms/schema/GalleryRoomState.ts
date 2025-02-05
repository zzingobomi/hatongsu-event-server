import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import { PlayerSchema } from "./PlayerSchema";

export class GalleryRoomState extends Schema {
  @type({ map: PlayerSchema })
  players = new MapSchema<PlayerSchema>();

  CreatePlayer(sessionId: string, nickname: string) {
    this.players.set(sessionId, new PlayerSchema(nickname));
  }

  RemovePlayer(sessionId: string) {
    this.players.delete(sessionId);
  }
}
