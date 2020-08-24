import Memory from './memory.js';
const memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }
  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }
  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }
  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }
  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }
  remove(index) {
    if (index < 0 || index >= this.length) {
      console.log(index);
      throw new Error('Index error');
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.push(13);
  arr.push(22);
  arr.push(23);
  arr.push(24);
  arr.push(25);
  arr.push(26);
  arr.push(27);
  //length is the number of times arr.push is called
  //_capacity is the number of block that are available. It automatically
  //starts with 3, when length = 4 it jumps to 12 (length * Array.SIZE_RATIO)
  //at 13 it * 3(array.size_ratio) = 39
  //ptr starts with 0, every time the capacity updates it adds the ptr and the capacity
  //3 + 12 = new value is 15
  //length: 13, _capacity: 39, ptr: 15
  arr.pop();
  arr.pop();
  arr.pop();
  //length is 10
  //_capacity is 39
  // ptr is 15
  //when the push ran length (13), _capacity (39), ptr (15)
  //after arr.pop ran three times the only thing to change was the length
  //length is now 10. The reason nothing changed is because it
  //only calls on the length to change. Others will stay the same until more items
  //in the array exceed the _capacity.
  console.log(arr);
  //--------------------
  let index = arr.get(0);
  console.log(index);
  //use the arr.get to see the contents of the first item in the array
  // created variable (index) to be equal to item in the certain index

  arr.remove();
  arr.remove();
  arr.remove();
  arr.remove();
  arr.remove();
  arr.remove();
  arr.remove();
  arr.remove();
  arr.remove();
  arr.remove();
  console.log(arr);
  // removed all items in array each time you call on it it removes 1 index.
  arr.push('tauhida');
  console.log(arr);
  // added 'tauhida' into arr only display length(1), _capacity(39 - same), ptr(15 - same)
  // doesn't print the value, if I try to pull out the value it
  //returns NaN
  arr._resize(12);
  console.log(arr);
  //resets the _capacity to a number you decide,
  //if left empty it will return 'undefined'
}
main();
function URL(string) {
  for (let i = 0; i < string.length; i++) {
    if (string.includes(' ')) {
      return string.split(' ').join('%20');
    } else {
      return string;
    }
  }
}
console.log(URL('tauhida parveen'));
console.log(URL('www.thinkful.com /tauh ida parv een'));
function filterArray(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 0) {
      return;
    }
  }
}
Array.SIZE_RATIO = 3;
// export default Array;
