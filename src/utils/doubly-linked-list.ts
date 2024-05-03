class Node<T> {
  val: T;
  next: Node<T> | null;
  prev: Node<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: T) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
    }

    if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
    }

    this.length++;
    this.tail = newNode;

    return this;
  }

  pop() {
    const returnMe = this.tail;

    if (this.length === 0) return;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }

    if (this.length > 1) {
      const prevNode = this.tail?.prev!;

      prevNode.next = null;
      this.tail = prevNode;
    }

    this.length--;

    return returnMe;
  }

  shift() {
    const returnMe = this.head;

    if (this.length === 0) return;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }

    if (this.length > 1) {
      const nextNode = this.head?.next!;

      nextNode.prev = null;
      this.head = nextNode;
    }

    this.length--;

    return returnMe;
  }

  // add new item
  unshift(val: T) {
    const addMe = new Node(val);
    let prevHead = this.head;

    if (this.length === 0) {
      this.tail = addMe;
    } else {
      addMe.next = prevHead;
      prevHead!.prev = addMe;
    }

    this.head = addMe;
    this.length++;

    return true;
  }

  get(index: number) {
    let findMe;

    if (index >= this.length || index < 0) return null;
    if (index > this.length / 2) {
      // right side
      let border = this.length - index - 1;

      findMe = this.tail;
      for (let i = 0; i < border; i++) {
        findMe = findMe!.prev;
      }
    } else {
      // left side
      findMe = this.head;
      for (let i = 0; i < index; i++) {
        findMe = findMe!.next;
      }
    }

    return findMe;
  }

  print() {
    let val = this.head;

    for (let i = 0; i < this.length; i++) {
      val = val ? val!.next : null;
    }
  }

  set(index: number, val: T) {
    let node = this.get(index);

    if (node) {
      node.val = val;

      return true;
    }

    return false;
  }
  insert(index: number, val: T) {
    if (index === 0) this.unshift(val);
    if (index === this.length - 1) this.push(val);
    let node = this.get(index);

    if (node) {
      let prevNode = node.prev;
      let newNode = new Node(val);

      newNode.next = node;
      newNode.prev = node.prev;
      node.prev = newNode;
      if (prevNode) {
        prevNode.next = newNode;
      }

      this.length++;

      return true;
    }

    return false;
  }

  remove(index: number) {
    if (index === 0) this.shift();
    if (index === this.length - 1) this.pop();
    let node = this.get(index);

    if (node) {
      let prevNode = node.prev;
      let nextNode = node.next;

      prevNode!.next = nextNode;
      nextNode!.prev = prevNode;
      node.next = null;
      node.prev = null;

      this.length--;

      return node;
    }

    return undefined;
  }
}
