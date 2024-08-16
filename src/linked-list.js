export class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const node = new Node(value);
    if (this.getHead() == null) {
      this.head = node;
    } else {
      let currentNode = this.getHead();
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
  }

  prepend(value) {
    const node = new Node(value);
    if (this.getHead() !== null) {
      let prevHead = this.getHead();
      this.head = node;
      node.next = prevHead;
    } else {
      this.head = node;
    }
  }

  getSize() {
    let nodes = 0;
    let currentNode = this.getHead();
    if (currentNode == null) {
      return nodes;
    } else {
      while (currentNode !== null) {
        currentNode = currentNode.next;
        nodes++;
      }
      return nodes;
    }
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let currentNode = this.getHead();
    if (currentNode == null) {
      return null;
    } else {
      while (currentNode.next !== null) currentNode = currentNode.next;
      return currentNode;
    }
  }

  getNodeAt(index) {
    let currentNode = this.getHead();
    if (index >= this.size() || index < 0) return null;

    let node = 0;
    while (node < index) {
      currentNode = currentNode.next;
      node++;
    }
    return currentNode;
  }

  popNode() {
    if (this.size() == 1) {
      this.head = null;
      return;
    }
    let tailNode = this.getTail();
    let currentNode = this.getHead();
    while (currentNode.next !== tailNode) {
      currentNode = currentNode.next;
    }
    currentNode.next = tailNode.next;
  }

  contains(value) {
    let currentNode = this.getHead();
    while (currentNode !== null) {
      if (currentNode.value == value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  find(value) {
    let index = 0;
    let currentNode = this.getHead();
    while (currentNode !== null) {
      if (currentNode.value == value) {
        return index;
      }
      index++;
      currentNode = currentNode.next;
    }
    return null;
  }

  toString() {
    let currentNode = this.getHead();
    let str = "";
    while (currentNode !== null) {
      str += `(${currentNode.value}) -> `;
      currentNode = currentNode.next;
    }
    str += `null`;
    return str;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.getSize()) return;

    let node = 0;
    let currentNode = this.getHead();
    let prevNode;
    const newNode = new Node(value);

    if (index === 0) {
      this.prepend(value);
      return;
    }
    while (currentNode !== null && node < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      node++;
    }
    prevNode.next = newNode;
    newNode.next = currentNode;
  }

  removeAt(index) {
    if (index < 0 || index >= this.getSize()) return;

    let currentNode = this.getHead();

    if (index === 0) {
      this.head = currentNode.next;
      return;
    }

    let prevNode;
    let node = 0;

    while (currentNode !== null && node < index) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      node++;
    }
    prevNode.next = currentNode.next;
  }
}

export class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}
