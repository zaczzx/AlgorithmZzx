// 写一个处理加法可能产生精度的函数，比如 0.1 + 0.2 = 0.3
// a: float, b: float
// expect res = a + b : Integer
function accAdd(arg1,arg2){ //两个参数相加，函数直接调用即可
	var r1,r2,m;  
	try{
	　　r1 = arg1.toString().split(".")[1].length;
	} catch(e){r1=0} 
	try{
	　　r2 = arg2.toString().split(".")[1].length;
	}catch(e){r2=0}
	m = Math.pow(10, Math.max(r1,r2));
	return (arg1*m+arg2*m)/m;
}

console.log(accAdd(0.11, 0.2));
console.log(0.1 + 0.2);

// 大数相加
let multiply = function (num1, num2) {
    if (isNaN(num1) || isNaN(num2)) return '';
    if (num1 === '0' || num2 === '0') return '0';

    let l1 = num1.length,
        l2 = num2.length;

    let result = [];

    for (let i = l1 -1; i >= 0; i--) {
        for (let j = l2 - 1; j >= 0; j--) {
            let index1 = i + j;
            let index2 = i + j + 1;

            let product = num1[i] * num2[j] + (result[index2] || 0);
            result[index2] = product % 10;
            result[index1] = Math.floor(product / 10) + (result[index1] || 0);
        }
    }
    return result.join('').replace(/^0+/, '');
}

console.log(multiply('123', '234')) //28782
