function compare(card1, card2){
  if (card1.value != card2.value){
    return card1.value - card2.value;
  }
  return card1.shape_id - card2.shape_id;
}
