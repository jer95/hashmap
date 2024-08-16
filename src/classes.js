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
}
