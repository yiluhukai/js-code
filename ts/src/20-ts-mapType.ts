type keys = "name" | "age"

// 定义映射类型
// in类似for...in
// flag类型实质上是 {name:boolean,string:boolean }
type flags = { [ key in keys]:boolean}


const s1:flags = { name:true,age:true}

interface Person {
    name: string;
    age: number;
}

const p1:Person = { name:"zz",age: 26 }

// 基于商民的Person创建新的类型


type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
type RequiredPerson = Required<Person>

const p2 : PersonPartial = { name: 'zz' }
const p3:ReadonlyPerson = p1



// Cannot assign to 'age' because it is a read-only property.ts(2540)
p3.age ="zzz"

const  p4: RequiredPerson = p1
// 'p5' is declared but its value is never read.ts(6133)
// Type 'Partial<Person>' is not assignable to type 'Required<Person>'.
//   Types of property 'name' are incompatible.
const p5:RequiredPerson =p2


export ={}