import { Client, Room } from "colyseus";
import {
  ESChatMessage,
  ESJoinOptions,
  ESMessageType,
} from "../shared/eventserver.type";
import { GalleryRoomState } from "./schema/GalleryRoomState";

export class GalleryRoom extends Room<GalleryRoomState> {
  onCreate(options: any) {
    this.autoDispose = false;

    console.log("GalleryRoom created!", options);

    this.setState(new GalleryRoomState());

    this.onMessage(ESMessageType.CLIENT_CHAT_MESSAGE, (client, message) => {
      const player = this.state.players.get(client.sessionId);
      const chatMessage: ESChatMessage = {
        sessionId: client.sessionId,
        nickname: player.GetNickname(),
        message,
        timestamp: Date.now(),
      };
      console.log("Chat message received!", chatMessage);

      this.broadcast(ESMessageType.SERVER_CHAT_MESSAGE, chatMessage);
    });
  }

  onJoin(client: Client, options: ESJoinOptions) {
    const sessionId = client.sessionId;

    const player = this.state.players.get(sessionId);
    console.log("GalleryRoom joined!", options.nickname, sessionId);

    this.state.CreatePlayer(sessionId, options.nickname);
  }

  onLeave(client: Client, consented: boolean) {
    const sessionId = client.sessionId;

    const player = this.state.players.get(sessionId);
    console.log("GalleryRoom left!", player.GetNickname(), sessionId);

    this.state.RemovePlayer(sessionId);
  }

  onDispose() {
    console.log("Dispose GalleryRoom");
  }
}
