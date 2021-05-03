import { Application } from 'spectron';
import * as assert from 'assert';
import { Element } from 'webdriverio';
import { applicationConfig, getInnerTexts, wait } from './utils';
import { copyFileSync } from 'fs';
import path from 'path';

describe('Tag page', function () {
    this.timeout(10000);

    let app: Application;

    beforeEach(async function () {
        app = new Application(applicationConfig);
        await app.start();

        await app.client.waitUntilWindowLoaded();
        //@ts-ignore
        app.electron.ipcRenderer.send('open-tag-modal', '/Users/anoy/work/WebstormProjects/explower/tests/sample_dir/dir01');
        await wait(async () => {
            const count = await app.client.getWindowCount();
            return count == 2;
        });
        await app.client.windowByIndex(1);
    });

    afterEach(function () {
        copyFileSync(
            path.join(__dirname, 'data_sample.json'),
            path.join(__dirname, 'data.json')
        )
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    async function getTag(tag: string): Promise<Element> {
        const tag_elements = await app.client.$$('.checkbox');
        const label = (await Promise.all(tag_elements.map(tag => tag.getText())));
        return tag_elements[label.indexOf(tag)];
    }

    it('attach the tag', async function () {
        const tag = await getTag('タグ');
        await tag.click()
        const submitButton = await app.client.$('#submit-button');
        await submitButton.click();

        await wait(async () => {
            const count = await app.client.getWindowCount();
            return count == 1;
        });
        await app.client.windowByIndex(0);
        assert.deepStrictEqual(
            new Set(await getInnerTexts(app.client, '.label')),
            new Set(['1', 'タグ'])
        )
    });


    it('add the new tag', async function () {
        const inputBox = await app.client.$('#add-tag-box');
        await inputBox.setValue('sample:sample_tag');
        const submitButton = await app.client.$('#add-tag-button');
        await submitButton.click();
        assert.deepStrictEqual(
            new Set(await getInnerTexts(app.client, 'label')),
            new Set(['1', 'a', 'sample_tag', 'タグ']),
        )
    })
});