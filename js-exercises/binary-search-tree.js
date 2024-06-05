class Node {
  constructor() {
    this.left = null;
    this.right = null;
    this.value = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      
      if (this.root === null) {
        let node = new Node();
        node.value = value;
        this.root = node;
        continue;
      }

      // Traverse
      let positionFound = false;
      let currentNode = this.root;
      while (!positionFound) {
        // Go left
        if (value < currentNode.value) {
          if (currentNode.left === null) {
            
          }
        }
      }
    }
  }
}