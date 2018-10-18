class Card{
  constructor(value, shape_id, x, y, w, h){
    this.value = value;
    this.symbol = CARD_SYMBOLS[value];
    this.shape_id = shape_id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.visible = false;
  }

  display(){
    strokeWeight(1);
    stroke(255);
    fill(240);
    rect(this.x, this.y, this.w, this.h);
    if (this.visible){
      textSize(CARD_FONT_SIZE);
      fill((this.shape_id % 2 == 1) * 255, 0, 0);

      text(this.symbol, this.x + 2, this.y + CARD_FONT_SIZE);
      text(CARD_SHAPES[this.shape_id], this.x + 2, this.y + CARD_FONT_SIZE * 1.8);
      text(CARD_SHAPES[this.shape_id], this.x + CARD_WIDTH - 18, this.y + CARD_HEIGHT - 1.8 * CARD_FONT_SIZE + 10);
      text(this.symbol, this.x + CARD_WIDTH - 18, this.y + CARD_HEIGHT - CARD_FONT_SIZE + 10);

      textSize(CARD_FONT_SIZE * 2);

      // center
      if (this.value > 10 || this.value == 1){
        textSize(CARD_FONT_SIZE); //  * 5
        text(CARD_SHAPES[this.shape_id], (2 * this.x + CARD_WIDTH) / 2 - 5, (2 * this.y + CARD_HEIGHT) / 2 + 5);
      }
      else{
        textSize(CARD_FONT_SIZE);
        text(CARD_SHAPES[this.shape_id], (2 * this.x + CARD_WIDTH) / 2 - 5, (2 * this.y + CARD_HEIGHT) / 2 + 5);
      }

    }

    else{
      stroke(0, 0, 255);
      for (let i = 2; i <= 12; i += 2){
        rect(this.x + i, this.y + i, this.w - 2*i, this.h - 2*i);
      }
    }
  }

  isVisible(){
    return this.visible;
  }

  setVisible(value){
    this.visible = value;
  }

  reveal(){
    this.visible = true;
  }

  isClicked(x, y){
    return x > this.x && x < 2 * this.x + width && y > this.y && y < 2 * this.y + height;
  }
}
