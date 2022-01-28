/**
 * flat, 数组扁平化, ES6: [].flat(deepth);
 * 参数: 1 个有多层嵌套的数组
 * 返回值: 1 个只有 1 层的数组
 */
function flat(arr) {
  let res = [];
  for (let val of arr) {
    if (Array.isArray(val)) {
      res = [...res, ...flat(val)];
    } else {
      res.push(val);
    }
  }
  return res;
}

function testFlat() {
  console.log(flat([1, [1, 2, [2, 4]], 3, 5])); // [1, 1, 2, 2, 4, 3, 5]
  console.log([1, [1, 2, [2, 4]], 3, 5].flat(Infinity));
}
testFlat();

/**
 * unique, 去重
 * 参数: 一个有重复值得数组
 * 返回值: 一个没有重复值的数组
 * 方法: 1. Set 2. 循环 + indexOf / includes
 */
// uniqueSet, 用 Set 数据类型去重
function uniqueSet(arr) {
  return [...new Set(arr)];
}
function uniqueIncludes(arr) {
  let res = [];
  for (let n of arr) {
    if (!res.includes(n)) res.push(n);
  }
  return res;
}

function testUnique() {
  let arr = [1, 3, 3, 2, 1, 5, 3];
  console.log(uniqueSet(arr));
  console.log(uniqueIncludes(arr));
}
testUnique();

// 冒泡排序, bubbleSort
function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    // 从第一个元素开始，比较相邻的两个元素，前者大就交换位置
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let num = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = num
      }
    }
    // 每次遍历结束，都能找到一个最大值，放在数组最后
  }
  return arr
}

// 归并排序, mergeSort
// 快排, quickSort

function testSort(){
  // 对数字 / 字母排序，简写
  const arrNum = [3, 2, 4, 1, 5]
  arrNum.sort((a, b) => a - b)
  console.log(arrNum) // [1, 2, 3, 4, 5]
  const arrLetter = ['b', 'c', 'a', 'e', 'd']
  arrLetter.sort()
  console.log(arrLetter) // ['a', 'b', 'c', 'd', 'e']
  console.log(bubbleSort([2, 3, 1, 5, 4])) // [1, 2, 3, 4, 5]
}
testSort();