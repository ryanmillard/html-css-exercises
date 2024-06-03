import { LinkedList } from './linked-list.js';

export class HashSet {
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

    const entries = this.entries();
    for (let i = 0; i < pairs.length; i++) {
      let entry = entries[i];
      let index = this.#hash(entry, this.capacity*2);
      let bucket = newBuckets[index];
      bucket.append(entry);
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

  set(key) {
    // If the array is too full, start expanding it and 'rehashing'
    const emptyNum = this.#getEmptyBucketAmount();
    const fullPercentage = (this.capacity - emptyNum) / this.capacity;
    if (fullPercentage >= this.loadFactor) {
      this.#reconstruct();
    }

    const index = this.#hash(key);
    const bucket = this.buckets[index];
    bucket.append(key);
  }

  has(key) {
    // Can't just use get(key) because they could store null
    const index = this.#hash(key);
    const bucket = this.buckets[index];

    if (bucket.head === null) return false;

    let currentNode = bucket.head;
    while (currentNode.nextNode) {
      if (currentNode.value === key) break;
      currentNode = currentNode.nextNode;
    }

    return currentNode.value === key;
  }

  remove(key) {
    const index = this.#hash(key);
    const bucket = this.buckets[index];

    if (bucket.head === null) return false;

    let currentNode = bucket.head;
    let nodeIndex = 0;

    while (currentNode.nextNode) {
      if (currentNode.value === key) break;
      currentNode = currentNode.nextNode;
      nodeIndex++;
    }

    if (currentNode.value === key) {
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