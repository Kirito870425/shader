

const FontTool = {

    changeAll(event, font) {
        let _scene = cc.director.getScene();
        if(_scene) {
            let _result = "";
            _result += this.changeFamily(_scene, font, cc.Label);
            _result += this.changeFamily(_scene, font, cc.RichText);
            Editor.Ipc.sendToPanel("scene", "scene:stash-and-save");
            event && event.reply && event.reply(`系統預設字體 已全部更改為 ${font} ${_result}`);
            return;
        } 
        event && event.reply && event.reply("找不到可替換的場景");
    },

    changeFamily(node, font, componentType) {
        let _components = node.getComponentsInChildren(componentType);
        let _result = `\n \n===== 已修改所有 ${componentType.name} 為 ${font}`;
        _components.forEach(item =>{
            _result = _result + `\n${this.getNodeTreePath(item.node)}`;
            item.fontFamily = font;
        })
        return _components.length > 0 ? _result : "";
    },

    getNodeTreePath(node) {
        let _name = node.name;
        if(node.parent) {
            _name = `${this.getNodeTreePath(node.parent)}/${_name}`;
        }
        return _name;
    },
}

module.exports = FontTool;