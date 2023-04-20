
const { ccclass, property } = cc._decorator;

enum COLOR {
    RED,
    GREEN,
    BLUE,
    ALPHA,
    WIDTH,
    THICK
}

@ccclass
export default class glow extends cc.Component {

    @property([cc.Slider])
    private sliderList: cc.Slider[] = [];

    private colorList = [];
    protected update(): void {
        let material: cc.Material = this.node.getComponent(cc.Sprite).getMaterial(0);

        let r = this.sliderList[COLOR.RED].progress;
        let g = this.sliderList[COLOR.GREEN].progress;
        let b = this.sliderList[COLOR.BLUE].progress;
        let a = this.sliderList[COLOR.ALPHA].progress;

        material.setProperty("glowColor", [r, g, b, a]);
        material.setProperty("glowRange", this.sliderList[COLOR.WIDTH].progress);
        material.setProperty("glowThreshold", this.sliderList[COLOR.THICK].progress);


        this.node.getComponent(cc.Sprite).setMaterial(0, material);
    }
}
