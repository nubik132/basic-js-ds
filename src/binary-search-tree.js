const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');
 
/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(value) {
    if(this.rootNode != null){
      this.get(value, (cur, prev) => 
        {cur = new Node(); 
        cur.data = value;
        if(value > prev.data)
          prev.right = cur;
        else if(value < prev.data)
          prev.left = cur;
        })
      }
    else {
      this.rootNode = new Node();
      this.rootNode.data = value;
    }
  }

  has(value) {//исправить undefined на [undefined, currentNode]
    if(Array.isArray(this.get(value, () => false))) return true;
    return false;
  }

  find(value) {//исправить undefined на [undefined, currentNode] 
    if(Array.isArray(this.get(value, () => 0))) return this.get(value, () => 0)[1];
    else return null;
  }

  remove(value) {
    if(Array.isArray(this.get(value, () => {false}))){
      this.get(value, () => {false})[1] = null;
    }
  }

  min() {
    return this.get(-Infinity, (cur, prev) => prev.data); 
  }

  max() {
    return this.get(Infinity, (cur, prev) => prev.data); 
  }

  get(value, func){
    var previousNode = null;
    let currentNode = this.rootNode;
    while(currentNode !== null){
      previousNode = currentNode; 
      if(value > currentNode.data)
      {
        currentNode = currentNode.right;
      }
      else if(value < currentNode.data)
      {
        currentNode = currentNode.left;
      }
      else return [undefined, previousNode];
    }
    return func(currentNode, previousNode);
  }
}

const tree = new BinarySearchTree();
tree.add(1);
tree.add(2);
tree.add(3);
tree.add(4);
tree.add(5);
console.log(tree);
console.log(tree.min());
console.log(tree.max());
tree.remove(5);
console.log(tree.has(5));
module.exports = {
  BinarySearchTree
};