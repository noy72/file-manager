import deserialize from "../../src/utils/deserialize";

it('deserialize', () => {
    class Cls {
        x: number = 3;
        y: string = "str";

        getX() {
            return this.x;
        }

        getY() {
            return this.y;
        }
    }

    const obj = JSON.parse(JSON.stringify(new Cls()));
    const cls = deserialize(obj, new Cls);
    console.log(cls);
    console.assert(new Cls().getX(), cls.getX());
    console.assert(new Cls().getY(), cls.getY());
});
