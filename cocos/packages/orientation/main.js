module.exports = {
    load() {
    },

    unload() {
    },

    messages: {
        toVertical() {
            Editor.Scene.callSceneScript("orientation-tool", "toVertical");
        },
        toHorizontal() {
            Editor.Scene.callSceneScript("orientation-tool", "toHorizontal");
        }
    }
}