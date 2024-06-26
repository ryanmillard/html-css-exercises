// import { HashMap } from './hash-map.js';
// import { HashSet } from './hash-set.js';
import { Tree } from './binary-search-tree.js';

// let dict = new HashMap();
// console.log(dict);
// dict.set("london", "uk");
// dict.set("birmingham", "uk");
// dict.set("paris", "france");
// dict.set("a", "b");
// dict.set("c", "d");
// dict.set("e", "f");
// dict.set("g", "h");
// dict.set("i", "j");
// dict.set("k", "l");
// dict.set("m", "n");
// dict.set("o", "p"),
// dict.set("q", "r");
// dict.set("s", "t");
// dict.set("u", "v");
// dict.set("w", "x");
// dict.set("y", "z");
// console.log(dict);
// console.log(dict.entries());
// console.log(dict.length());
// console.log(dict.keys());
// console.log(dict.values());
// console.log(dict.has("test1"), dict.has("paris"));
// console.log("paris:", dict.get("paris"));
// console.log(dict.get("test2"));
// dict.set("aa", "bb");
// dict.set("cc", "dd");
// dict.set("ee", "ff");
// dict.set("gg", "hh");
// dict.set("ii", "jj");
// dict.set("kk", "ll");
// dict.set("mm", "nn");
// dict.set("oo", "pp"),
// dict.set("qq", "rr");
// dict.set("ss", "tt");
// dict.set("uu", "vv");
// dict.set("ww", "xx");
// dict.set("yy", "zz");
// console.log(dict);
// console.log(dict.length());

// let set = new HashSet();
// console.log(set);
// set.set("hi");
// console.log(set);
// console.log(set.has("hi"), set.length());
// set.remove("hi");
// console.log(set.has("hi"), set.length());

let tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// tree.buildTree([1,2,3,4,5,6,7]);
tree.printTree();
// console.log(tree.find(1));

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
console.log(tree.preOrder());
console.log(tree.height(tree.root));
// console.log(tree.depth(tree.find(67)));
tree.printTree();
tree.rebalance();
tree.printTree();

tree.rebalance();