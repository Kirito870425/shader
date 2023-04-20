
const { ccclass, property } = cc._decorator;

enum mosaicList {
    xBlockCount,
    yBlockCount,
    totalxBlockCount
}

@ccclass
export default class mosaicEffect extends cc.Component {

    @property([cc.Slider])
    private slider: cc.Slider[] = [];

    // * 最大值，只有 slider 太小
    @property(cc.Float)
    private maxmosaic: number = 500;

    protected update(): void {
        let material: cc.Material = this.node.getComponent(cc.Sprite).getMaterial(0);

        material.setProperty("xBlockCount", this.slider[mosaicList.xBlockCount].progress * this.maxmosaic);
        material.setProperty("yBlockCount", this.slider[mosaicList.yBlockCount].progress * this.maxmosaic);
        // material.setProperty("totalxBlockCount", this.slider[mosaicList.totalxBlockCount].progress);

        this.node.getComponent(cc.Sprite).setMaterial(0, material);
    }
}
