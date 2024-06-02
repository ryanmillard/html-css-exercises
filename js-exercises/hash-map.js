import { LinkedList } from './linked-list.js';

export class HashMap {
  constructor(capacity=10, loadFactor=0.75) {
    this.firstCapacity = capacity;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.firstCapacity)
      .fill(null) // Won't work unless you do this
      .map(() => new LinkedList());
  }

  #reconstruct() {
    let newBuckets = new Array(this.capacity * 2)
      .fill(null) // Won't work unless you do this
      .map(() => new LinkedList());

    const pairs = this.entries();
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let index = this.#hash(pair[0], this.capacity*2);
      let bucket = newBuckets[index];
      bucket.append([pair[0], pair[1]]);
    }
    
    this.buckets = newBuckets;
    this.capacity *= 2;
  }

  #hash(key, modFactor=this.capacity) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % modFactor;
    }
    return hashCode % modFactor; // index
  }

  #getEmptyBucketAmount() {
    let bucketCount = 0;
    for (let i = 0; i < this.capacity; i++) {
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

    // Reassign value of key
    if (this.has(key)) this.remove(key);

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
  }

  remove(key) {
    const index = this.#hash(key);
    const bucket = this.buckets[index];

    if (bucket.head === null) return false;

    let currentNode = bucket.head;
    let nodeIndex = 0;

    while (currentNode.nextNode) {
      if (currentNode.value[0] === key) break;
      currentNode = currentNode.nextNode;
      nodeIndex++;
    }

    if (currentNode.value[0] === key) {
      bucket.removeAt(nodeIndex);
      return true;
    }
    return false;
  }

  length() {
    let totalKeys = 0;
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket.head === null) continue;

      let currentNode = bucket.head;
      totalKeys += 1;

      while (currentNode.nextNode) {
        totalKeys += 1;
        currentNode = currentNode.nextNode;
      }
    }
    return totalKeys;
  }

  clear() {
    this.buckets = new Array(this.firstCapacity)
      .fill(null)
      .map(() => new LinkedList());
    this.capacity = this.firstCapacity;
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket.head === null) continue;

      let currentNode = bucket.head;
      keys.push(currentNode.value[0]);

      while (currentNode.nextNode) {
        keys.push(currentNode.value[0]);
        currentNode = currentNode.nextNode;
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket.head === null) continue;

      let currentNode = bucket.head;
      values.push(currentNode.value[1]);

      while (currentNode.nextNode) {
        values.push(currentNode.value[1]);
        currentNode = currentNode.nextNode;
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket.head === null) continue;

      let currentNode = bucket.head;
      entries.push(currentNode.value);

      while (currentNode.nextNode) {
        entries.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    }
    return entries;
  }
}