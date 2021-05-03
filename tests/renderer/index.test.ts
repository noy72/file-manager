import { Application } from 'spectron';
import * as assert from 'assert';
import path from 'path';
import { getItem } from '../../src/main/repositories/itemRepository';
import { exists } from '../../src/main/infrastructure/file';
import { ElementArray, Element } from 'webdriverio';
import { unlinkSync } from 'fs';
import { applicationConfig, getInnerText, getInnerTexts } from './utils';


describe('Application', function () {
    this.timeout(10000);

    before(function () {
        this.app = new Application(applicationConfig);
        return this.app.start();
    });

    after(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    it('launch', async function () {
        const windowCount = await this.app.client.getWindowCount();
        assert.strictEqual(windowCount, 1);
    });

    it('get the page title', async function () {
        const title = await this.app.browserWindow.getTitle();
        assert.strictEqual(title, 'Explower');
    });

});

describe('Index page', function () {
    this.timeout(10000);

    let app: Application;

    before(async function () {
        app = new Application(applicationConfig);
        await app.start();
    });

    beforeEach(async function () {
        const resetButton = await app.client.$('#times-icon');
        await resetButton.click();
    });

    after(function () {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    async function search(query: string): Promise<void> {
        const searchBox = await app.client.$('#search-box');
        await searchBox.setValue(query);
        const searchButton = await app.client.$('#search-icon');
        await searchButton.click();
    }

    it('display items as cards', async function () {
        const cardTitles = await getInnerTexts(app.client, '.card');
        assert.deepStrictEqual(new Set(cardTitles), new Set(cardTitles));
    });

    it('display tag', async function () {
        const tag = await getInnerText(app.client, '.ui .label');
        assert.strictEqual(tag, '1');
    });

    it('search by title', async function () {
        await search('dir02');
        assert.strictEqual(await getInnerText(app.client, '.header'), 'dir02');
    });

    it('search by tag', async function () {
        await search('#1');
        assert.strictEqual(await getInnerText(app.client, '.header'), 'dir01');
    });

    it('add red border if item.location is invalid', async function () {
        await search('not_exists');
        const card = await app.client.$('.card');
        assert.ok((await card.getAttribute('class')).includes('red'));
    });

    it('click the tag', async function () {
        const tag = await app.client.$('.label');
        await tag.click();

        const cards = await app.client.$$('.card');
        const titles = await getInnerTexts(app.client, '.header');
        assert.deepStrictEqual(
            new Set(titles),
            new Set(['dir01', 'sample.mov'])
        );
    });
});

describe('Commands', function () {
    this.timeout(10000);

    let app: Application;
    let cards: ElementArray;
    let titles: string[];

    before(async function () {
        app = new Application(applicationConfig);
        await app.start();
        cards = await app.client.$$('.card');
        titles = await Promise.all(cards.map(card => getInnerText(card, '.header')));
    });

    after(function () {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    async function check(title: string, tmp_file_name: string) {
        const dir = cards[titles.indexOf(title)];
        assert.ok(dir != undefined);
        await dir.click();

        const item = getItem(path.join(__dirname, `../sample_dir/${title}`));
        assert.ok(item != undefined);

        const copied_file_location = path.join(
            item.location,
            `${tmp_file_name}.txt`
        );
        assert.ok(exists(copied_file_location), 'not copied!');
        unlinkSync(copied_file_location);
        assert.ok(!exists(copied_file_location), 'not deleted!');
    }

    it('execute image commands', function (done) {
        check('dir01', 'images').then(() => done());
    });

    it('execute directory commands', function (done) {
        check('dir03', 'directory').then(() => done());
    });

    // TODO: アイテムがファイルのときのコマンドのテストを追加する
});

