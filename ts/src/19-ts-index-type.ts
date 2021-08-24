
function pluck<T,K extends  keyof T>(o:T, names:K[]):T[K][] {
    return names.map(n => o[n]);
}


interface People {
    name:string,
    age:number
}

const  p:People = { name : "zzz", age:10 }


console.log(pluck(p,['name','age'])) // [ 'zzz', 10 ]