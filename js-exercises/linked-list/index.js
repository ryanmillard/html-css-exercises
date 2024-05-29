class Node {
  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    let node = new Node();
    node.value = value;

    if (this.head === null) {
      this.head = node;
    } else if (this.size === 1) {
      this.head.nextNode = node;
      this.tail = node;
    } else {
      this.tail.nextNode = node;
      this.tail = node;
    }

    this.size += 1;
  }

  prepend(value) {
    let node = new Node()
    node.value = value;

    let oldHead = this.head;
    node.nextNode = oldHead;
    this.head = node;

    this.size += 1;

    if (this.size === 1) {
      this.tail = node;
    }
  }

  at(index) {
    if (this.size === 0) return null;
    if (index > this.size - 1) return null;

    let count = 0;
    let currentNode = this.head;
    while (count < index) {
      currentNode = currentNode.nextNode;
      count++;
    }

    return currentNode.value;
  }

  pop() {
    if (this.head === null) return;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }

    let endNode = this.head;
    let previousNode = null;

    while (endNode.nextNode) {
      previousNode = endNode;
      endNode = endNode.nextNode;
    }

    // No reference to the endNode will
    // delete it through garbage collection
    previousNode.nextNode = null;

    this.size -= 1;
  }

  contains(value) {
    if (this.head === null) return false;

    let currentNode = this.head;

    while (currentNode.nextNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode
    }

    return currentNode.value === value;
  }

  find(value) {
    if (this.head === null) return null;
    
    let currentNode = this.head;
    let counter = 0;

    while (currentNode.nextNode) {
      if (currentNode.value === value) return counter;
      currentNode = currentNode.nextNode;
      counter++;
    }

    return currentNode.value === value ? counter : null;
  }

  toString() {
    if (this.size === 0) return 'null';
    let listString = '';

    let currentNode = this.head;

    while (currentNode.nextNode) {
      listString += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    listString += `( ${currentNode.value} ) -> `;
    listString += 'null';
    return listString;
  }

  insertAt(value, index) {
    if (index < 0) return;
    if (this.size === 0 && index != 0) return;
    if (index > this.size) return;

    let node = new Node();
    node.value = value;

    if (index === 0) {
      this.prepend(value);
      this.size += 1;
      return;
    } else if (index === this.size) {
      this.append(value);
      this.size += 1;
      return;
    }

    let previousNode = this.head;
    let currentNode = this.head.nextNode;
    // currentNode is the one we are replacing
    let counter = 1;

    while (currentNode.nextNode) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      counter++;
      if (counter === index) break;
    }

    previousNode.nextNode = node;
    node.nextNode = currentNode;
    this.size += 1;
  }

  removeAt(index) {
    if (index < 0) return;
    if (this.size === 0) return;
    if (index > this.size - 1) return;
    
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    } else if (index === this.size - 1) {
      this.pop();
      return;
    }

    let previousNode = this.head;
    let currentNode = this.head.nextNode;
    let counter = 1;

    while (currentNode.nextNode) {
      if (counter === index) break;
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      counter++;
    }

    previousNode.nextNode = currentNode.nextNode;
    this.size -= 1;
  }
}

let list = new LinkedList();
list.append(10);
console.log(list.toString());
list.append(20);
console.log(list.toString());
list.append(30);
console.log(list.toString());
list.append(40);
console.log(list.toString());
list.insertAt(15, 3);
console.log(list.toString());
list.removeAt(4);
console.log(list.toString());