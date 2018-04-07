/*
  *@returns {string}
*/
export const newId = () =>
  Math.random().toString(36).substr(2, 9)
;
/*
  *drag and drop
    *from react-beautiful-dnd docs
    *helper function to reorder items after drop
*/
export const reorderResults = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


/*
  *@param {array}
  *@returns {array}
    helper function to take comments array and nest the replies accoring to the parent
*/

export function addRepliesKey(arr) {
  const results = arr.map(comment => {
    const newObj = Object.assign({}, comment)
    newObj.replies = []
    return newObj
  })
  return results
}


export function nestReplies(arr) {
  var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for(var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['replies'] = []
  }

  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.originid) {
        mappedArr[mappedElem['originid']]['replies'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

