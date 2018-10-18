class Deck{
  constructor(packs){
    this.cards_list = [];
    var x = 20;
    var y = 50;
    for (let pack_num=0; pack_num<packs; pack_num++){
      for (let suit=0; suit<4; suit++){
        x = 0;
        for (let value=2; value<=14; value++){
          var card = new Card(value, suit, x * (CARD_WIDTH + 20) + 10, y, CARD_WIDTH, CARD_HEIGHT)
          this.cards_list.push(card);
          x++;
        }
        y += CARD_HEIGHT + 20;
      }
    }
  }

  length(){
    return this.cards_list.length;
  }

  display(){
    for (let card of this.cards_list){
      card.display();
    }
  }

  popCard(){
    return this.cards_list.pop();
  }

  shuffleCards(){
    this.cards_list = shuffle(this.cards_list);
  }

  reverseCards(){
    this.cards_list = reverse(this.cards_list);
  }
}
