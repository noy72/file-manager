import assert from "assert";
import { isValidTagString, parseTagString } from "../../../../src/main/domain/service/tag";

it("parseTagString", () => {
    assert.deepStrictEqual(
        parseTagString("`1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:ZXCVBNM<>?"),
        ["`1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL", "ZXCVBNM<>?"]
    );
    assert.deepStrictEqual(
        parseTagString("a:b"),
        ["a", "b"]
    );
    assert.deepStrictEqual(
        parseTagString("aa"),
        ["Prop", "aa"]
    );
    assert.deepStrictEqual(
        parseTagString(""),
        ["Prop", ""]
    );
});

it("isValidTagString", () => {
    for (const str of [
        "`1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:ZXCVBNM<>?",
        "a:a",
        "aa",
        "", // 空文字列はUIで弾かれる
    ]) {
        assert.ok(isValidTagString(str));
    }
    for (const str of [
        "`1234567890-=q:wertyuiop[]asdf:ghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:ZXCVBNM<>?",
        "a:",
        ":a",
        ":",
    ]) {
        assert.ok(!isValidTagString(str));
    }
});