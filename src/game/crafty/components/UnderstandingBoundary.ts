import Layers from '../layers';
import { Entity } from '../types';

const Crafty = window.Crafty;

Crafty.c('UnderstandingBoundary', {
  init() {
    this.addComponent('2D, DOM');
    this.z = Layers.stage;
    this.css({
      border: '3px double lime',
      boxSizing: 'border-box',
    });
    this.bind('onEnter', this._handleEnter)
  },

  _handleEnter() {
    this._output = Crafty.e('2D, DOM')
    .attr({
      w: 50,
      h: 20,
      y: this.y - 2,
      x: this.x + this.w / 2 - 25, // 25 = half width
    })
    .css({
      border: '2px solid steelblue',
      backgroundColor: '#333',
      boxSizing: 'border-box',
    });

    const outputText = Crafty.e('2D, DOM, Text')
    .attr({
      w: this._output.w,
      h: this._output.h,
      x: this._output.x,
      y: this._output.y + 1,
    })
    .css({ fontFamily: `'Share Tech Mono', monospace`, fontSize: 16 })
    .text('OUT')
    .textColor('white')
    .unselectable()
    .textAlign('center');

    this._output.attach(outputText);
  },

  _registerComponent(comp: Entity) {
    comp.bind('EnterFrame', () => {
      if (
        this.x < comp.x &&
        this.x + this.w >
          comp.x + comp.w &&
        this.y < comp.y &&
        this.h + this.y >
          comp.y + comp.h
      ) {
        this.color('limegreen');
      } else if (
        this.x < comp.x + comp.w &&
        this.x + this.w > comp.x &&
        this.y < comp.y + comp.h &&
        this.h + this.y > comp.y
      ) {
        comp.color('mediumseagreen');
      } else {
        comp.color('maroon');
      }
    });

    return this;
  }
});
  