

const { ccclass, property } = cc._decorator;

@ccclass
export default class leetCode extends cc.Component {
    twoSum(nums: number[], target: number): number[] {
        let arr = [];
        let targetArr = nums.filter(num => (num < target));
        targetArr.map((key, value) => {
            let temp = target - key;
            if (targetArr.includes(temp)) {
                arr.push(value);
            }
        })

        console.log(arr);
        return arr;
    }

    protected start(): void {
        // this.twoSum([1, 3, 5, 2, 7, 9, 11, 15], 9);
        this.twoSum([3, 2, 4], 6);
    }

}
