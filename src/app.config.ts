import config from "@colyseus/tools";
import { matchMaker } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { GalleryRoom } from "./rooms/GalleryRoom";
import { ESGalleryRoomName } from "./shared/eventserver.type";
import cors from "cors";

matchMaker.controller.getCorsHeaders = function (req) {
  return {
    "Access-Control-Allow-Origin": "*",
    Vary: "*",
    // 'Vary': "<header-name>, <header-name>, ...",
  };
};

export default config({
  initializeGameServer: (gameServer) => {
    gameServer.define(ESGalleryRoomName, GalleryRoom);
    matchMaker.createRoom(ESGalleryRoomName, {});
  },

  initializeExpress: (app) => {
    // CORS 설정 강화 (모든 환경에서 적용)
    // app.use(
    //   cors({
    //     origin: "https://www.practice-zzingo.net",
    //     methods: ["GET", "POST", "OPTIONS"],
    //     allowedHeaders: ["Content-Type", "Authorization", "Range"],
    //     credentials: true,
    //   })
    // );

    // app.options("*", cors()); // 모든 OPTIONS 요청 처리
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
