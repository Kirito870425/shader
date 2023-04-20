module.exports = {
    toVertical() {
        let _scene = cc.director.getScene();

        if (_scene) {
            let tools = _scene.getComponentsInChildren("OrientationTool");
            let managers = _scene.getComponentsInChildren("OrientationToolManager");
            let fitStages = _scene.getComponentsInChildren("OrientationFitStage");
            let widgets = _scene.getComponentsInChildren("OrientationWidget");

            if (managers.length) {
                managers[0].canvasToVerticall();
            }

            fitStages.forEach(fitStage => {
                fitStage.syncCanvasSize();
            })

            widgets.forEach(widget => {
                widget.align();
            })

            tools.forEach(tool => {
                tool.toVerticall();
            })
        }
    },

    toHorizontal() {
        let _scene = cc.director.getScene();

        if (_scene) {
            let tools = _scene.getComponentsInChildren("OrientationTool");
            let managers = _scene.getComponentsInChildren("OrientationToolManager");
            let fitStages = _scene.getComponentsInChildren("OrientationFitStage");
            let widgets = _scene.getComponentsInChildren("OrientationWidget");

            if (managers.length) {
                managers[0].canvasToHorizontal();
            }

            fitStages.forEach(fitStage => {
                fitStage.syncCanvasSize();
            })

            widgets.forEach(widget => {
                widget.align();
            })

            tools.forEach(tool => {
                tool.toHorizontal();
            })
        }
    }
}

