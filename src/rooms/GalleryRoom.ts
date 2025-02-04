import { Client, Room } from "colyseus";
import { ESMessageType } from "../shared/eventserver.type";

export class GalleryRoom extends Room {
  onCreate(options: any) {
    this.autoDispose = false;

    console.log("GalleryRoom created!", options);

    this.onMessage(ESMessageType.CLIENT_CHAT_MESSAGE, (client, message) => {
      console.log(
        "GalleryRoom received message from",
        client.sessionId,
        ":",
        message
      );
      this.broadcast(
        ESMessageType.SERVER_CHAT_MESSAGE,
        `(${client.sessionId}) ${message}`
      );
    });
  }

  onJoin(client: Client, options: any) {
    this.broadcast(
      ESMessageType.SERVER_NEW_PLAYER,
      `${client.sessionId} joined.`
    );
  }

  onLeave(client: Client, consented: boolean) {
    this.broadcast(
      ESMessageType.SERVER_PLAYER_DISCONNECTED,
      `${client.sessionId} left.`
    );
  }

  onDispose() {
    console.log("Dispose GalleryRoom");
  }
}
