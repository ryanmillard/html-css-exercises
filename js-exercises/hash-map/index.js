import { LinkedList } from './linkedlist.js';

class HashMap {
  constructor(capacity=10, loadFactor=0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity)
      .map(() => new LinkedList());
  }

  #reconstruct() {

  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.buckets.length; // index
  }

  #getEmptyBucketAmount() {
    let bucketCount = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i].head === null) {
        bucketCount++;
      }
    }
    return bucketCount;
  }

  set(key, value) {
    // If the array is too full, start expanding it and 'rehashing'
    const emptyNum = this.#getEmptyBucketAmount();
    const fullPercentage = (this.capacity - emptyNum) / this.capacity;
    if (fullPercentage >= this.loadFactor) {
      this.#reconstruct();
    }

    const index = this.#hash(key);
    const bucket = this.buckets[index];
    bucket.append([key, value]);
  }

  get(key) {
    const index = this.#hash(key);
    const bucket = this.buckets[index];

    if (bucket.head === null) return null;

    let currentNode = bucket.head;
    while (currentNode.nextNode) {
      if (currentNode.value[0] === key) break;
      currentNode = currentNode.nextNode;
    }

    return currentNode.value[0] === key ? currentNode.value[1] : null;
  }

  has(key) {
    // Can't just use get(key) because they could store null
    const index = this.#hash(key);
    const bucket = this.buckets[key];

    if (bucket.head === null) return false;

    let currentNode = bucket.head;
    while (currentNode.nextNode) {
      if (currentNode.value[0] === key) break;
      currentNode = currentNode.nextNode;
    }

    return currentNode.value[0] === key;
  }
}

