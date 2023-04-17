const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(value) {
    if (this.rootNode != null) {
      this.get(value, (cur, prev) => {
        cur = new Node();
        cur.data = value;
        if (value > prev.data)
          prev.right = cur;
        else if (value < prev.data)
          prev.left = cur;
      })
    }
    else {
      this.rootNode = new Node();
      this.rootNode.data = value;
    }
  }

  has(value) {
    if (Array.isArray(this.get(value, () => false))) return true;
    return false;
  }

  find(value) {
    if (Array.isArray(this.get(value, () => 0))) return this.get(value, () => 0)[2];
    else return null;
  }

  remove(value) {
    let array = this.get(value, () => { false });
    if (Array.isArray(array)) {
      if (array[1] == null) {
        this.rootNode = null;
        return;
      };
      let prev = array[1];
      if (value == prev.right.data)
        prev.right = null;
      else if (value == prev.left.data)
        prev.left = null;
    }
  }

  min() {
    return this.get(-Infinity, (cur, prev) => prev.data);
  }

  max() {
    return this.get(Infinity, (cur, prev) => prev.data);
  }

  get(value, func) {
    let previousNode = null;
    let currentNode = this.rootNode;
    while (currentNode !== null) {
      if (value > currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.right;
      }
      else if (value < currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.left;
      }
      else return [undefined, previousNode, currentNode];
    }
    return func(currentNode, previousNode);
  }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(54);
tree.add(2);
tree.add(6);
tree.add(8);
tree.add(31);
tree.add(1);
tree.remove(6);
tree.remove(2);
console.log(tree.min(), 1);
// console.log(tree.max());
// tree.remove(5);
// console.log(tree.has(5));
// console.log(tree.max());
module.exports = {
  BinarySearchTree
};