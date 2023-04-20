

const { ccclass, property } = cc._decorator;
const GAME_ID_LIST: number[] = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 29,
    30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 53, 56, 58, 60, 61, 62, 63, 64, 66, 67, 68, 139];

@ccclass
export default class NewClass extends cc.Component {

    private spineList: sp.SkeletonData[] = [];

    @property(cc.Node)
    private spine: cc.Node = null;

    @property(cc.Node)
    private content: cc.Node = null

    @property(cc.Float)
    private countMax: number = 20;

    start() {
        this.scheduleOnce(this.init, 5);
    }

    // update (dt) {}

    private async init() {
        await this.loadSpine();
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
                    bundle.load(`old/2D_icon_G${gameid}/2D_icon_G${gameid}`, sp.SkeletonData, (err, res: sp.SkeletonData) => {
                        if (cc.isValid(err)) {
                            cc.error("讀取 gameIcon 失敗 : ", err);
                        } else {
                            this.spineList.push(res);
                            if (this.spineList.length === this.countMax) {
                                resolve();
                            }
                        }
                    })
                })
            })
        })
    }

    private setSpine(): void {
        GAME_ID_LIST.forEach((gameid, index) => {
            let item = cc.instantiate(this.spine).getComponent(sp.Skeleton);
            index > this.countMax ? item.node.opacity = 0 : item.node.opacity = 255;
            item.node.setParent(this.content);
            item.node.active = true;
            this.scheduleOnce(() => {
                // let spine: sp.Skeleton = this[`spine_${gameid}`];
                item.skeletonData = this.spineList[index];
                item.updateAnimationCache("play_normal");
                this.scheduleOnce(() => {
                    item.setAnimation(0, "play_normal", true);
                }, 0)
            }, 0.5 * index)
        })
    }
}
