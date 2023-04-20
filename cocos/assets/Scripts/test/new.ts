

const { ccclass, property } = cc._decorator;
const GAME_ID_LIST: number[] = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 29,
    30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 53, 56, 58, 60, 61, 62, 63, 64, 66, 67, 68, 72, 139];

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    private spine: cc.Node = null;

    @property(cc.Node)
    private content: cc.Node = null

    @property(cc.Float)
    private countMax: number = 20;

    @property(cc.Node)
    private MGNode: cc.Node = null;

    @property(cc.Node)
    private FGNode: cc.Node = null;

    private spineList: sp.SkeletonData[] = [];
    private BGspineList: sp.SkeletonData[] = [];

    start() {
        this.scheduleOnce(this.init, 5);
    }

    private async init() {
        // await this.loadSpine();
        this.setSpine();
    }

    private loadSpine(): Promise<void> {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle("Test", (error: Error, bundle: cc.AssetManager.Bundle) => {
                if (cc.isValid(error)) {
                    console.error("讀取 bundle 失敗", error);
                    return;
                }
                GAME_ID_LIST.forEach(gameid => {
                    bundle.load(`new/2D_icon_G${gameid}`, sp.SkeletonData, (err, res: sp.SkeletonData) => {
                        if (cc.isValid(err)) {
                            cc.error("讀取 gameIcon 失敗 : ", err);
                        } else {
                            this.spineList.push(res);
                            if (this.spineList.length === GAME_ID_LIST.length) {
                                resolve();
                            }
                        }
                    })
                })
            })
        })
    }

    private setSpine(): void {
        // GAME_ID_LIST.forEach((gameid, index) => {

        //     if (this.spineList[index].name == "2D_icon_G52") {

        for (let i = 0; i < 100; i++) {

            let item = cc.instantiate(this.spine);
            let sk = item.getComponentInChildren(sp.Skeleton);
            // index > this.countMax ? item.opacity = 0 : item.opacity = 255;
            item.setParent(this.content);
            item.active = true;
            // this.scheduleOnce(() => {
            // let spine: sp.Skeleton = this[`spine_${gameid}`];
            // sk.skeletonData = this.spineList[index];
            sk.updateAnimationCache("play_normal");
            this.scheduleOnce(() => {
                sk.setAnimation(0, "play_normal", true);
            }, 0)
        }
        // }, 0.5 * index)
        //     }
        // })
    }
}
