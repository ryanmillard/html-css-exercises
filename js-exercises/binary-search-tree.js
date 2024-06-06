class Node {
  constructor() {
    this.left = null;
    this.right = null;
    this.value = null;
  }
}

export class Tree {
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
            let node = new Node();
            node.value = value;
            currentNode.left = node;
            positionFound = true;
          } else {
            currentNode = currentNode.left;
          }
        } else {
          if (currentNode.right === null) {
            let node = new Node();
            node.value = value;
            currentNode.right = node;
            positionFound = true;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }
  }
}