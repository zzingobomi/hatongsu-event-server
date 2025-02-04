import { Schema, Context, type } from "@colyseus/schema";

export class GalleryRoomState extends Schema {
  @type("string") mySynchronizedProperty: string = "Hello world";
}
