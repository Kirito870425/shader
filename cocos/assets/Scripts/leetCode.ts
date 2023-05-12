

const { ccclass, property } = cc._decorator;

@ccclass
export default class leetCode extends cc.Component {

    protected start(): void {
        // this.twoSum([1, 3, 5, 2, 7, 9, 11, 15], 9);
        // this.twoSum([3, 2, 4], 6);

        // let fre = new FrequencyTracker();
        // fre.add(1);
        // fre.deleteOne(1);
        // fre.hasFrequency(1);

    }

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

    // mostPoints(questions: number[][]): number {
    //     let ans = 0;
    //     let jump = 0;

    //     for (let i = 0; i < questions.length; i++) {
    //         // 跳過分數低的 比對還能補能繼續 如果可以 先不儲存這次的
    //         if (jump === 0) {
    //             for (let j = 0; j < questions[i].length; j++) {
    //                 // 只拿裡面的 value 分數代表要跳過幾題
    //                 // 判斷大的那個數
    //                 jump = questions[i][j];
    //                 ans += questions[i][j];
    //             }
    //         }
    //         else {
    //             jump--;
    //             continue;
    //         }
    //     }

    //     return ans;
    // };
}

class FrequencyTracker {
    private arr = [];
    constructor() {
        this.arr = [];
        console.error("constructor", this.arr);

    }

    add(number: number): void {
        this.arr.push(number);
        console.error("add", this.arr);

    }

    deleteOne(number: number): void {
        this.arr.pop();
        console.error("del", this.arr);
    }

    hasFrequency(frequency: number): boolean {
        // 取出 value.length 比對 frequency
        let temp = false;
        this.arr.forEach(i => {

            return temp = i === frequency;
        });
        console.error("==", temp)
        return temp;
    }
}
