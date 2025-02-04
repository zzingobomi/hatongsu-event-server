const { exec } = require("child_process");
const fs = require("fs");

const schemaSrc = "./src/rooms/schema";
const schemaDest =
  "/Users/oscar/Documents/study/hatongsu/hatongsu-frontend/src/world/schema";
const sharedSrc = "./src/shared";
const sharedDest =
  "/Users/oscar/Documents/study/hatongsu/hatongsu-frontend/src/world/shared";

// Colyseus Schema
fs.readdir(schemaSrc, (error, files) => {
  if (error) {
    console.error("Error reading schema files:", error);
    return;
  }

  console.log("Schema files:", files);

  files.forEach((filename) => {
    const command = `npx schema-codegen ${schemaSrc}/${filename} --ts --output ${schemaDest}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating schema for ${filename}:`, error);
      } else {
        console.log(`Schema generated for ${filename}`);
      }
    });
  });
});

// Shared
const copyCommand = `cp ${sharedSrc}/*.ts ${sharedDest}`;
exec(copyCommand, (error, stdout, stderr) => {
  if (error) {
    console.error("Error copying shared files:", error);
  } else {
    console.log("Shared files copied successfully");
  }
});
