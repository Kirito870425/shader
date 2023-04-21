
const { ccclass, property } = cc._decorator;

enum COLOR {
    RED,
    GREEN,
    BLUE,
    ALPHA,
    RADIUS,
    CROP,
    FOG
}

@ccclass
export default class glow extends cc.Component {

    // @property([cc.Slider])
    // private sliderList: cc.Slider[] = [];
    @property(cc.Node)
    private layoutNode: cc.Node = null;

    protected update(): void {
        let material: cc.Material = this.node.getComponent(cc.Sprite).getMaterial(0);

        let r = this.layoutNode.children[COLOR.RED].getComponent(cc.Slider).progress;
        let g = this.layoutNode.children[COLOR.GREEN].getComponent(cc.Slider).progress;
        let b = this.layoutNode.children[COLOR.BLUE].getComponent(cc.Slider).progress;
        let a = this.layoutNode.children[COLOR.ALPHA].getComponent(cc.Slider).progress;
        let radius = this.layoutNode.children[COLOR.RADIUS].getComponent(cc.Slider).progress;
        let crop = this.layoutNode.children[COLOR.CROP].getComponent(cc.Toggle).isChecked;
        let fog = this.layoutNode.children[COLOR.FOG].getComponent(cc.Toggle).isChecked;

        material.setProperty("centerColor", [r, g, b, a]);
        // 接滑鼠事件
        // material.setProperty("centerPoint", [r, g, b, a]);
        material.setProperty("radius", radius);
        material.setProperty("cropAlpha", crop);
        material.setProperty("enableFog", fog);


        this.node.getComponent(cc.Sprite).setMaterial(0, material);
    }
}
