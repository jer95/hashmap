import { LinkedList } from "./linked-list.js";

class HashMap {
  constructor() {
    this.size = 16;
    this.bucket = [];
    this.loadFactor = 0.75;
    for (let a = 0; a < this.size; a++) {
      this.bucket[a] = new LinkedList();
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
    let index = this.hash(key);
    if (index < 0 || index >= this.size) {
      throw new Error("Trying to access index out of bound");
    }

    let current = this.bucket[index].head;
    let counter = 0;

    if (this.bucket[index].contains(key)) {
      while (counter < this.bucket[index].find(key)) {
        current = current.next;
        counter++;
      }
      current.key = key;
      current.value = value;
      return;
    }
    this.bucket[index].append(key, value);
  }

  get(key) {
    let index = this.hash(key);
    let current = this.bucket[index].head;
    if (this.bucket[index].contains(key)) {
      for (let a = 0; a < this.bucket[index].find(key); a++) {
        current = current.next;
      }
      return current.value;
    } else {
      return null;
    }
  }

  has(key) {
    let index = this.hash(key);
    return this.bucket[index].contains(key);
  }

  remove(key) {
    let index = this.hash(key);
    if (this.bucket[index].contains(key)) {
      this.bucket[index].removeAt(this.bucket[index].find(key));
      return true;
    }
    return false;
  }

  length() {
    const length = this.bucket.reduce((length, element) => {
      return (length += element.getSize());
    }, 0);
    return length;
  }

  clear() {
    for (let a = 0; a < this.size; a++) {
      let current = this.bucket[a].head;
      while (current !== null) {
        let nextNode = current.next;
        current.next = null;
        current = nextNode;
      }
      this.bucket[a].head = null;
    }
  }

  keys() {
    const keysArr = [];
    for (let a = 0; a < this.size; a++) {
      let current = this.bucket[a].head;
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
      let current = this.bucket[a].head;
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
      let current = this.bucket[a].head;
      while (current !== null) {
        nodesArr.push([current.key, current.value]);
        current = current.next;
      }
    }
    return nodesArr;
  }
}

const hash = new HashMap();
hash.set("Carlos", "Name");
hash.set("Carla", "Name");
hash.set("Brooks", "lastname");
hash.get("Carlos");
console.log(hash);
console.log(hash.entries());
