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
    } else if (this.tail === null) {
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
    if (this.tail === null) {
      this.head = null;
      this.size -= 1;
      return;
    }

    let endNode = this.head;
    let previousNode = null;

    while (currentNode.nextNode) {
      previousNode = currentNode;
      endNode = endNode.nextNode;
    }

    // No reference to the endNode will
    // delete it through garbage collection
    previousNode.nextNode = null;

    this.size -= 1;
  }
}
