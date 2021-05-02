import * as assert from "assert";

it('instanceof', () => {
    interface Inter {
        x: number;
    }

    class Cls implements Inter {
        x: number = 1;
        y: number = 2;
    }

    const cls: Cls = new Cls();
    const inter: Inter = new Cls();
    assert.ok(cls instanceof Cls);
    assert.ok(inter instanceof Cls);
    assert.strictEqual(cls.y, inter.y);

    assert.strictEqual(cls.x, 1);
    cls['x'] = 3;
    assert.strictEqual(cls.x, 3);

    const inter2: Inter = { x: 1 };
    assert.ok(!(inter2 instanceof Cls));

});

it('index signature', () => {
    interface Inter {
        [key: string]: number;
    }

    class Cls implements Inter {
        [key: string]: number;
    }

    const cls = new Cls();
    cls["a"] = 4;
    assert.strictEqual(cls.a, 4);
    assert.strictEqual(cls["a"], 4);
});

it('interface', () => {
    interface I {
        x: number;
    }

    const obj = { x: 4 };
    const i: I = obj;
    assert.strictEqual(obj.x, i.x);
});

it('interface?', () => {
    interface I {
        x: number;
        y?: number;
    }

    const obj = { x: 4 };
    const i: I = obj;
    assert.strictEqual(i.x, 4);
    assert.strictEqual(i.y, undefined);

    const obj2 = { y: 3 };
    //const i2 : I = obj2; // Property 'x' is missing in type '{ y: number; }' but required in type 'I'.ts(2741)
});

it('static property', () => {
    interface I {
        y: number;
    }

    class A implements I {
        static x: number = 10;
        y: number;
        constructor(value: I) {
            this.y = value.y;
        }
        public get() {
            return A.x + this.y;
        }
    }

    class B extends A {
        static x: number = 100;
        public get() {
            return B.x + this.y;
        }
    }

    const a = new A({ y: 1 });
    const b = new B({ y: 2 });
    assert.strictEqual(a.get(), 11);
    assert.strictEqual(b.get(), 102);

    const b2: A = b;
    assert.strictEqual(b2.get(), 102);

    const a2: A = new A(b);
    assert.strictEqual(a2.get(), 12);
});

it('array', () => {
    const xs = [1, 2, 3];
    const x = [1];

    const [a, b] = xs;
    assert.strictEqual(a, 1);
    assert.strictEqual(b, 2);

    const [c, d] = x;
    assert.strictEqual(c, 1);
    assert.strictEqual(d, undefined);

    const [e, ...f] = xs;
    assert.strictEqual(e, 1);
    assert.deepStrictEqual(f, [2, 3]);

    const [g, ...h] = x;
    assert.strictEqual(g, 1);
    assert.deepStrictEqual(h, []);
});

it('object function', () => {
    const a = {
        f() {
            console.log("return 1");
            return 1;
        }
    }
    const b = {
        f: () => {
            console.log("return 1");
            return 1;

        }
    }
    console.log(a.f)
    console.log(b.f)
    assert.strictEqual(a.f(), b.f())

    const c = [
        { f() {return 1 } },
        { f: () => 1}
    ]

});