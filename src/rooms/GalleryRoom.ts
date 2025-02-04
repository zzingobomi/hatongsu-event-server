import { Client, Room } from "colyseus";
import {
  ESJoinMessage,
  ESLeaveMessage,
  ESMessageType,
} from "../shared/eventserver.type";

export class GalleryRoom extends Room {
  onCreate(options: any) {
    this.autoDispose = false;

    console.log("GalleryRoom created!", options);

    this.onMessage(ESMessageType.CLIENT_CHAT_MESSAGE, (client, message) => {
      const chatMessage = {
        sessionId: client.sessionId,
        message,
      };
      console.log("Chat message received!", chatMessage);

      this.broadcast(ESMessageType.SERVER_CHAT_MESSAGE, chatMessage);
    });
  }

  onJoin(client: Client, options: any) {
    const joinMessage: ESJoinMessage = {
      sessionId: client.sessionId,
    };
    console.log("GalleryRoom joined!", joinMessage);

    this.broadcast(ESMessageType.SERVER_JOIN_MESSAGE, joinMessage);
  }

  onLeave(client: Client, consented: boolean) {
    const leaveMessage: ESLeaveMessage = {
      sessionId: client.sessionId,
    };
    console.log("GalleryRoom left!", leaveMessage);

    this.broadcast(ESMessageType.SERVER_LEAVE_MESSAGE, leaveMessage);
  }

  onDispose() {
    console.log("Dispose GalleryRoom");
  }
}
