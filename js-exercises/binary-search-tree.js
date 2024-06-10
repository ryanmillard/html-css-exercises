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

  insert(value) {
    if (this.root === null) {
      let node = new Node();
      node.value = value;
      this.root = node;
      return;
    }

    // Traverse to find place for value
    let currentNode = this.root;
    while (true) {
      // Value already exists in tree so ignore it
      if (currentNode.value === value) return;

      // Go left if value is smaller than current node value
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          let node = new Node();
          node.value = value;
          currentNode.left = node;
          return;
        }
        // Go to the left node if not empty
        currentNode = currentNode.left;

      } else {
        if (currentNode.right === null) {
          let node = new Node();
          node.value = value;
          currentNode.right = node;
          return;
        }
        // Go to the right node if not empty
        currentNode = currentNode.right;
      }
    }
  }

  deleteItem(value) {
    // Different deletion cases:
    // 1 - No children (Easy)
    // 2 - 1 child (Connect child to parent)
    // 3 - 2 children (Replace)
    
    // Can't just recreate the tree because
    // that is too inefficient and might as
    // well not use this type of data structure

    // First determine how many children the node has
    // - Which will also check for if it exists
    let currentNode = this.root;
    let previousNode = null;
    let connectionDirection = null; // 'left' or 'right'
    
    while (true) {
      if (!currentNode) return; // Node doesn't exist
      if (value === currentNode.value) break; // Node found
      previousNode = currentNode;
      connectionDirection = value < currentNode.value ? 'left' : 'right';
      currentNode = currentNode[connectionDirection];
    }

    if ( // Case 1: No Children
      currentNode.left === null
      && currentNode.right === null
      && currentNode.value === value
    ) {
      if (previousNode === null) {
        this.root = null;
      } else {
        previousNode[connectionDirection] = null;
      }
    } else if ( // Case 2: 1 Child
      currentNode.left === null && currentNode.right !== null
      || currentNode.left !== null && currentNode.right === null
    ) {
      let childNodeDirection = currentNode.left === null ? 'right' : 'left';
      let childNode = currentNode[childNodeDirection];
      
      // Deletes currentNode
      previousNode[connectionDirection] = childNode;
    } else { // Case 3: 2 Children
      // 1. Go to the right child node of currentNode
      // 2. Then go to the furthest left descendant of that child
      // Which will find closest value to currentNodes value.
      // 3. If that closest value node has a child then reparent it.

      let closestValue = currentNode.right;
      let closestValueParent = null;
      while (closestValue.left !== null) {
        closestValueParent = closestValue;
        closestValue = closestValue.left;
      }

      currentNode.value = closestValue.value;

      // Remove closestValue node and move its child.
      // Won't have a left child because it's the furthest left node
      // also account for if first right node didn't have a left child
      if (closestValueParent !== null) {
        closestValueParent.left = closestValue.right;
      } else {
        currentNode.right = closestValue.right;
      }
    }
  }

  buildTree(array) {
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      this.insert(value);
    }
  }

  printTree(node=this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.printTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  find(value) {
    let currentNode = this.root;
    while (true) {
      if (!currentNode) return null; // Node doesn't exist
      if (value === currentNode.value) break; // Node found
      previousNode = currentNode;
      currentNode = currentNode[value < currentNode.value ? 'left' : 'right'];
    }
    return currentNode;
  }

  levelOrder(callback) {
    if (this.root === null) return [];
    let queue = [this.root];
    let levelOrderValues = [];
    let isValidCallback = typeof callback === "function";
    let currentNode;

    while (queue.length !== 0) {
      currentNode = queue[0];

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);

      if (isValidCallback) {
        callback(currentNode);
      } else {
        levelOrderValues.push(currentNode.value);
      }

      queue.shift();
    }

    if (!isValidCallback) return levelOrderValues;
  }

  inOrder(callback) {
    let inOrderValues = [];
    let isValidCallback = typeof callback === "function";

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      inOrderValues.push(node.value);
      if (isValidCallback) callback(node);
      traverse(node.right);
    }

    traverse(this.root);
    return inOrderValues;
  }

  postOrder(callback) {
    let postOrderValues = [];
    let isValidCallback = typeof callback === "function";

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      postOrderValues.push(node.value);
      if (isValidCallback) callback(node);
    }

    traverse(this.root);
    return postOrderValues;
  }
  
  preOrder(callback) {
    let preOrderValues = [];
    let isValidCallback = typeof callback === "function";

    function traverse(node) {
      if (!node) return;
      preOrderValues.push(node.value);
      if (isValidCallback) callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return preOrderValues;
  }
}