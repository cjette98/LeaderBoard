const customData = require('../data/leaderboard');

//Converting the custom Json Data objects to Array
var array = [];
for (var key in customData) {
  array.push(customData[key]);
}

// Rank highest banana Points
array.sort(function (a, b) {
  return b.bananas - a.bananas;
});

var rank = 1;
for (var i = 0; i < array.length; i++) {
  if (i > 0 && array[i].bananas < array[i - 1].bananas) {
    rank++;
  }
  array[i].rank = rank;
}

// Getting the First  Top 10
var NewArray = [];
array.map(item => NewArray.push({...item, isCurrentUser: 'no'}));
const TopUsers = NewArray.splice(0, 10);
//Apply Filter

const FilterUserInput = q => {
  const arrRes = [];
  array.map(item => {
    if (item.name === q) {
      arrRes.push({...item, isCurrentUser: 'yes'});
    } else {
      arrRes.push({...item, isCurrentUser: 'no'});
    }
  });

  const getCurrUser = arrRes.filter(item => item.name === q);
  const CurrUserData = getCurrUser[0];
  const getIndex = arrRes.findIndex(item => item.name == q);
  const userIndex = getIndex + 1;

  if (userIndex > 10) {
    const final = arrRes.map((item, i) => (i == 9 ? CurrUserData : item));
    return final.splice(0, 10);
  } else {
    return arrRes.splice(0, 10);
  }
};

export {array, TopUsers, FilterUserInput};
