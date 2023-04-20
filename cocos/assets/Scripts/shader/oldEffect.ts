
const { ccclass, property } = cc._decorator;

@ccclass
export default class OldEffect extends cc.Component {

    @property(cc.Slider)
    private slider: cc.Slider = null;

    protected update(): void {
        let material: cc.Material = this.node.getComponent(cc.Sprite).getMaterial(0);

        material.setProperty("oldLevel", this.slider.progress);

        this.node.getComponent(cc.Sprite).setMaterial(0, material);
    }
}
