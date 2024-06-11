import { HashMap } from './hash-map.js';
import { HashSet } from './hash-set.js';
import { Tree } from './binary-search-tree.js';

describe('HashMap Module', () => {
  test('', () => {
  });
});

describe('HashSet Module', () => {
  test('', () => {
  });
});

describe('Binary Search Tree Module', () => {
  const randomInt = (limit) => Math.floor(Math.random() * limit);

  function generateRandomNumbers(amount, limit) {
    let arr = [];
    for (let i = 0; i < amount; i++) arr.push(randomInt(limit));
    return arr;
  }
  
  let tree = new Tree();
  tree.buildTree(generateRandomNumbers(20, 100));

  test('Is the tree balanced?', () => {
    expect(tree.isBalanced()).toBe(true);
    console.log('LevelOrder', tree.levelOrder());
    console.log('PreOrder', tree.preOrder());
    console.log('PostOrder', tree.postOrder());
    console.log('InOrder', tree.inOrder());
  });

  test('After adding more values, is it unbalanced?', () => {
    for (let i = 100; i > 90; i--) {
      tree.insert(i);
    }
    expect(tree.isBalanced()).toBe(false);
  });

  test('After balancing the tree, is it balanced?', () => {
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
    console.log('2nd LevelOrder', tree.levelOrder());
    console.log('2nd PreOrder', tree.preOrder());
    console.log('2nd PostOrder', tree.postOrder());
    console.log('2nd InOrder', tree.inOrder());
  });
});