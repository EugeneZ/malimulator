import * as React from 'react';
// TODO import Crafty from 'craftyjs';
// TODO declare const Crafty: any;

declare global {
  interface Window { Crafty: any; }
}

export default class Code extends React.PureComponent<{}> {
  id: string = 'code_null';

  constructor(props: {}) {
    super(props);
    do {
      const suffix = Math.floor(Math.random() * 10000);
      this.id = `code_${suffix}`;
    } while (document.getElementById(this.id));
  }

  componentDidMount() {
    const target = document.getElementById(this.id);
    const width = target.offsetWidth;
    const height = target.offsetHeight;

    window.Crafty.init(width, height, target);

    const dim1 = { x: 5, y: 5, w: 50, h: 50 };
    const dim2 = { x: 20, y: 10, w: 60, h: 40 };

    const rect1 = window.Crafty.e('2D, Canvas, Color')
      .attr(dim1)
      .color('red');

    const rect2 = window.Crafty.e('2D, Canvas, Color, Keyboard, Draggable')
      .attr(dim2)
      .color('blue');

    rect2.bind('EnterFrame', function() {
      if (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y
      ) {
        // collision detected!
        this.color('green');
      } else {
        // no collision
        this.color('blue');
      }
    });
  }

  render() {
    return <div id={this.id} />;
  }
}