// 函数的重载
function add(a:number,b :number) :number

function add(a :number ,b :string) :string
// 实现
function add(a:number ,b:any):any{
    if(typeof b === 'number'){
        return a + b 
    }else if (typeof b === 'string'){
        return a + b
    }
}


console.log(add(1 , 2)) // 3

console.log(add( 1 ,"s")) // "1s"