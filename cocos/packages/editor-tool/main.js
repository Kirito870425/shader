const path = require("path");
const AssetCleaner = require("./AssetCleaner/AssetCleaner");
const SRC_PATH = path.resolve(__dirname, "../../assets");
const DEST_PATH = path.resolve(__dirname, "./AssetCleaner.txt");
module.exports = {
    load() {
        // execute when package loaded
    },

    unload() {
        // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        "getUuidToUrl"(event, uuid) {
            let path = Editor.assetdb.uuidToUrl(uuid);
            event.reply(path);
        },
        "findUnuseAsserts"() {
            AssetCleaner.start(SRC_PATH,DEST_PATH);
        },
        "changeFontToMicrosoftYahei"() {
            Editor.Scene.callSceneScript("editor-tool", "changeAll", "Microsoft Yahei", (result) => {
                Editor.log(result);
            });
        },
        "changeFontToArial"() {
            Editor.Scene.callSceneScript("editor-tool", "changeAll", "Arial", (result) => {
                Editor.log( result);
            });
        },
    },
};
