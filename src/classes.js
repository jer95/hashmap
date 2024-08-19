import { LinkedList } from "./linked-list.js";

export class HashMap {
  constructor() {
    this.size = 16;
    this.buckets = [];
    this.loadFactor = 0.75;
    for (let a = 0; a < this.size; a++) {
      this.buckets[a] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let a = 0; a < key.length; a++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(a)) % this.size;
    }
    return hashCode;
  }

  set(key, value) {
    // add buckets if exceeds loadfactor * size
    if (this.length() >= this.size * this.loadFactor) {
      let moreBuckets = new Array(this.size * 2)
        .fill()
        .map(() => new LinkedList());
      let entries = this.entries();
      this.buckets = moreBuckets;
      this.size = this.size * 2;
      for (let a = 0; a < entries.length; a++) {
        this.set(entries[a][0], entries[a][1]);
      }
    }

    let index = this.hash(key);
    if (index < 0 || index >= this.size) {
      throw new Error("Trying to access index out of bound");
    }

    let current = this.buckets[index].head;
    let counter = 0;

    if (this.buckets[index].contains(key)) {
      while (counter < this.buckets[index].find(key)) {
        current = current.next;
        counter++;
      }
      current.key = key;
      current.value = value;
      return;
    }
    this.buckets[index].append(key, value);
  }

  get(key) {
    let index = this.hash(key);
    let current = this.buckets[index].head;
    if (this.buckets[index].contains(key)) {
      for (let a = 0; a < this.buckets[index].find(key); a++) {
        current = current.next;
      }
      return current.value;
    } else {
      return null;
    }
  }

  has(key) {
    let index = this.hash(key);
    return this.buckets[index].contains(key);
  }

  remove(key) {
    let index = this.hash(key);
    if (this.buckets[index].contains(key)) {
      this.buckets[index].removeAt(this.buckets[index].find(key));
      return true;
    }
    return false;
  }

  length() {
    const length = this.buckets.reduce((length, element) => {
      return (length += element.getSize());
    }, 0);
    return length;
  }

  clear() {
    for (let a = 0; a < this.size; a++) {
      let current = this.buckets[a].head;
      while (current !== null) {
        let nextNode = current.next;
        current.next = null;
        current = nextNode;
      }
      this.buckets[a].head = null;
    }
  }

  keys() {
    const keysArr = [];
    for (let a = 0; a < this.size; a++) {
      let current = this.buckets[a].head;
      while (current !== null) {
        keysArr.push(current.key);
        current = current.next;
      }
    }
    return keysArr;
  }

  values() {
    const valuesArr = [];
    for (let a = 0; a < this.size; a++) {
      let current = this.buckets[a].head;
      while (current !== null) {
        valuesArr.push(current.value);
        current = current.next;
      }
    }
    return valuesArr;
  }

  entries() {
    let nodesArr = [];
    for (let a = 0; a < this.size; a++) {
      let current = this.buckets[a].head;
      while (current !== null) {
        nodesArr.push([current.key, current.value]);
        current = current.next;
      }
    }
    return nodesArr;
  }
}
