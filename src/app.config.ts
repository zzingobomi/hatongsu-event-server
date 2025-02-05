import config from "@colyseus/tools";
import { matchMaker } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { GalleryRoom } from "./rooms/GalleryRoom";
import { ESGalleryRoomName } from "./shared/eventserver.type";
import cors from "cors";

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define(ESGalleryRoomName, GalleryRoom);
    matchMaker.createRoom(ESGalleryRoomName, {});
  },

  initializeExpress: (app) => {
    if (process.env.NODE_ENV === "production") {
      app.use(
        cors({
          origin: "https://www.practice-zzingo.net",
          credentials: true,
        })
      );
    }
    /**
     * Bind your custom express routes here:
     * Read more: https://expressjs.com/en/starter/basic-routing.html
     */
    app.get("/hello_world", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground);
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
