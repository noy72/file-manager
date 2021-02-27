import * as assert from "assert";
import * as fs from "fs";
import { sampleDirPath } from "./testUtils";

it('readdirSync', function () {
    const dirs = fs.readdirSync(sampleDirPath);
    assert.strictEqual(dirs.length, 7);
    for (let i = 1; i < dirs.length; i++) {
        assert.strictEqual(dirs[i], `dir0${i}`);
    }
});

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
