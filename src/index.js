import { HashMap } from "./classes.js";

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("apple", "fruit");
test.set("moon", "silver");
test.set("apple", "blue");
test.clear();
test.set("apple", "fruit");
console.log(test);
console.log(test.values());
console.log(test.get("apple"));
