import { updateData } from "../../../src/main/infrastructure/lowdb";
import { execCommand } from "../../../src/main/infrastructure/exec";
import { createData } from "../../utils";

test('execCommand', (done) => {
    const data = createData();
    data.commands.other = ["echo"];
    updateData(data);

    const str = "random string";
    const echo = execCommand('other', str)
    echo.stdout.on('data', data => {
        expect(data.toString()).toBe(str + '\n');
    });
    echo.on('close', code => {
        expect(code).toBe(0);
        done();
    })
});
