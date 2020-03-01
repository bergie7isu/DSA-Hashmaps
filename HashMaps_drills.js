//1. Create a HashMap class
const HashMap = require('./HashMap');
const main = function() {
  const lotr = new HashMap();
  lotr.MAX_LOAD_RATIO = 0.5;
  lotr.SIZE_RATIO = 3;
  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandolf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');
  console.log(lotr);
  console.log(lotr.get('Maiar'));
  console.log(lotr.get('Hobbit'));
};
main();
//Hashed everything, but Hobbit and Maiar were overwritten since we can't have duplicate keys.  Length is 9, though we set 11 items.
//Maiar = Sauron, Hobbit = Frodo - Since we can't have duplicate keys, only the most recent value set for a given key is provided.
//Capacity is 24.  Initial capacity was 8.  When we got to a load ratio greater than .5 (when setting the 5th item), we tripled
//the capacity from 8 to 24.  When we try to enter our 13th item, we'll triple again from 24 to 72

//2. WhatDoesThisDo
//map1 will have just one item - {key: 'Hello World.', value: 20, DELETED: false}
//map2 will have just one item - {key: 'Hello World.', value: 10, DELETED: false}
//So the two console.logs will output 20 and 10, respectively.
//Since str1 and str2 are the same key, only the most recent entry will be output.

//3. Demonstrate understanding of Hash maps
    //1.
    //location: 0   1   2     3     4  5   6   7   8   9   10
    //hashmap  [22, 88, open, open, 4, 15, 28, 17, 59, 31, 10]
    //2.
    //location: 0     1   2   3   4     5  6   7     8
    //hashmap  [open,   , 20, 12, open, 5,   , open, 17]
    //                28                   15
    //                19                   33
    //                10

//4. Remove duplicates
const removeDuplicates = function(string) {
    const characters = new HashMap();
    characters.MAX_LOAD_RATIO = 0.5;
    characters.SIZE_RATIO = 3;
    for (let i = string.length - 1; i >= 0; i--) {
      characters.set(string[i], i);
    };
    const newString = characters._hashTable.map(object => object)
      .sort((a, b) => a.value - b.value)
      .map(object => object.key)
      .join('');
    return newString;
  };
  console.log(removeDuplicates('google'));
  console.log(removeDuplicates('google all that you think can think of'));

  //5. Any permutation a palindrome
  const anyPalindrome = function(string) {
    if (string.length === 0) {
      return `You didn't give me anything!`;
    };
    const palindromes = new HashMap();
    palindromes.MAX_LOAD_RATIO = 0.5;
    palindromes.SIZE_RATIO = 3;
    for (let i = 0; i < string.length; i++) {
      if (!palindromes._hashTable[palindromes._findSlot(string[i])]) {
        palindromes.set(string[i], 1);
      } else {
        palindromes.set(string[i], palindromes.get(string[i]) + 1);
      };
    };
    let count = 0;
    for (i in palindromes._hashTable) {
      if (count > 1) {
        return false;
      };
      if (palindromes._hashTable[i].value % 2 !== 0) {
        count++;
      };
      i++;
    };
    return true;
  };
  console.log(anyPalindrome('acecarr'));
  console.log(anyPalindrome('north'));
  console.log(anyPalindrome(''));

  //6. Anagram grouping
  const anagramGroups = function(array) {
    const anagrams = new HashMap();
    anagrams.MAX_LOAD_RATIO = 0.5;
    anagrams.SIZE_RATIO = 3;
    for (let i = 0; i < array.length; i++) {
      let alpha = array[i].split('').sort().join('');
      if (!anagrams._hashTable[anagrams._findSlot(alpha)]) {
        anagrams.set(alpha, [array[i]]);
      } else {
        anagrams.get(alpha).push(array[i]);
      };
    };
    const output = [];
    for (i in anagrams._hashTable) {
      if (anagrams._hashTable[i]) {
        output.push(anagrams._hashTable[i].value);
      };
      i++;
    };
    return output;
  };
  console.log(anagramGroups(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

  //7. Separate Chaining
  //Import LinkedList class.  Create linked list when collision occurs.
