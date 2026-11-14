const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const Hexo = require('hexo');
const frontMatter = require('hexo-front-matter');

const root = path.resolve(__dirname, '..');

test('Vue article preserves literal template examples when rendered', async () => {
  const hexo = new Hexo(root, { silent: true });
  try {
    await hexo.init();
    const source = path.join(root, 'source/_posts/vue-basics-and-directives.md');
    const data = frontMatter.parse(readFileSync(source, 'utf8'));
    data.content = data._content;
    const result = await hexo.post.render(source, data);
    const decoded = result.content.replaceAll('&#123;', '{').replaceAll('&#125;', '}');
    assert.match(decoded, /\{\{ message \}\}/);
    assert.match(decoded, /\{\{\}\}/);
    assert.doesNotMatch(result.content, /<!--(?:swig|code)\uFFFC/);
  } finally {
    await hexo.exit();
  }
});

for (const [maxDepth, expected] of [[1, [true, false, false]], [2, [true, true, false]], [0, [true, true, true]]]) {
  test(`category tree respects configured max_depth=${maxDepth}`, () => {
    const categories = [
      { _id: 'a', name: 'LevelOne', path: '/one/', length: 1 },
      { _id: 'b', parent: 'a', name: 'LevelTwo', path: '/two/', length: 1 },
      { _id: 'c', parent: 'b', name: 'LevelThree', path: '/three/', length: 1 }
    ];
    const helpers = {};
    let generateAfter;
    const hexo = {
      theme: { config: { categories: { max_depth: maxDepth } } },
      extend: { helper: {
        get: () => value => value,
        register: (name, helper) => { helpers[name] = helper; }
      } },
      locals: { get: () => ({ find: () => ({ data: categories }) }) },
      on: (event, handler) => {
        assert.equal(event, 'generateAfter');
        generateAfter = handler;
      }
    };
    vm.runInNewContext(readFileSync(path.join(root, 'themes/vivia/scripts/categories-process.js'), 'utf8'), { hexo });
    generateAfter();
    const html = helpers.categories_tree();
    ['LevelOne', 'LevelTwo', 'LevelThree'].forEach((name, index) => {
      assert.equal(html.includes(name), expected[index], name);
    });
  });
}
