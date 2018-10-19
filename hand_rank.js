const HAND_RANKS = {
  1: 'High Card',
  2: 'Pair',
  3: 'Two Pairs',
  4: 'Three of a Kind',
  5: 'Straight',
  6: 'Flush',
  7: 'Full House',
  8: 'Four of a Kind',
  9: 'Straight Flush',
  10: 'Royal Flush'
};

function isRoyalFlush(handValues){
  return (isAscendingSequence(handValues) && suitHist.includes(5) && handValues[0] == 10);
}

function isStraightFlush(handValues, suitHist){
  return isStraight(handValues) && isFlush(suitHist);
}

function isFourOfAKind(handDiffValues){
  return handDiffValues.size == 2;
}

function isFullHouse(valuesHist){
  return valuesHist.includes(2) && valuesHist.includes(3);
}

function isFlush(suitHist){
  return suitHist.includes(5);
}

function isStraight(handValues){
  return isAscendingSequence(handValues);
}

function isThreeOfAKind(handDiffValues, valuesHist){
  return handDiffValues.size == 3 && valuesHist.includes(3);
}

function isTwoPairs(handDiffValues, valuesHist){
  return handDiffValues.size == 3 && !valuesHist.includes(3);
}

function isPair(handDiffValues){
  return handDiffValues.size == 4;
}

function isHighCard(handDiffValues){
  return handDiffValues.size == 5;
}



function getValuesByCount(hist, count){
  let card_values = [];
  for (let i = 2; i <= 14; i++){
    if (hist[i] == count){
      card_values.push(i);
    }
  }
  return card_values;
}

function isAscendingSequence(values_list){
  for (let i = 0; i < values_list.length - 1; i++){
    if (values_list[i] + 1 != values_list[i + 1]){
      return false;
    }
  }
  return true;
}

function isFirstCardValue10(values_list){
  return handValues[0] == 10;
}



function calcRank(hand){
  hand.sortHand();

  let handValues = hand.cards_list.map(card => card.value);

  valuesHist = [];
  for (let i = 0; i <= 14; i++){
    valuesHist[i] = 0;
  }
  for (let val of handValues){
    valuesHist[val]++;
  }

  let handDiffValues = new Set(handValues);

  let handSuits = hand.cards_list.map(card => card.shape_id);
  suitHist = [];
  for (let i = 0; i < 4; i++){
    suitHist[i] = 0;
  }
  for (let suit of handSuits){
    suitHist[suit]++;
  }

  // Royal Flush
  if (isRoyalFlush(handValues)){
    return [10, handSuits[0]];
  }

  // Straight Flush
  if (isStraightFlush(handValues, suitHist)){
    return [9, max(handValues)];
  }

  // Four of a Kind
  if (isFourOfAKind(handDiffValues)){
    let res = getValuesByCount(valuesHist, 2);
    if (res.length > 0){
      return [8, max(res)];
    }
  }

  // Full House
  if (isFullHouse(valuesHist)){
    return [7, max(handValues)];
  }

  // Flush
  if (isFlush(suitHist)){
    return [6, max(handValues)];
  }

  // Straight
  if (isStraight(handValues)){
    return [5, max(handValues)];
  }

  // Three of a Kind
  if  (isThreeOfAKind(handDiffValues, valuesHist)){
    let res = getValuesByCount(valuesHist, 3);
    if (res.length > 0){
      return [4, max(res)];
    }
  }

  // Two Pairs
  if  (isTwoPairs(handDiffValues, valuesHist)){
    let res = getValuesByCount(valuesHist, 2);
    if (res.length > 0){
      return [3, max(res)];
    }
  }

  // Pair
  if (isPair(handDiffValues)){
    let res = getValuesByCount(valuesHist, 2);
    if (res.length > 0){
      return [2, max(res)];
    }
  }

  // High Card
  if (isHighCard(handDiffValues)){
    return [1, max(handValues)];
  }

  return 0;
}
