class Hand{
  constructor(x, y, deck, player){
    this.x = x;
    this.y = y;
    this.cards_list = [];
    this.player = player;
  }

  display(){
    let x = this.x;
    let y = this.y;
    for (let card of this.cards_list){
      card.x = x;
      card.y = y;
      card.display();
      x += CARD_WIDTH + 20;
    }
  }

  count(){
    return this.cards_list.length;
  }

  getCard(index){
    return this.cards_list[index];
  }

  addCard(card, to_reveal){
    if (to_reveal){
      card.reveal();
    }
    this.cards_list.push(card);
  }

  popCard(index){
    this.cards_list.splice(index, 1);
  }

  sortHand(){
    this.cards_list.sort(compare);
  }

  rank(){
    return calcRank(this);
  }
}
