import Layers from '../layers';
import { Entity } from '../types';
import testZone, { Position } from '../util/testZone';

const Crafty = window.Crafty;

Crafty.c('UnderstandingBoundary', {
  init() {
    this.addComponent('2D, DOM');
    this.z = Layers.stage;
    this.css({
      border: '3px double lime',
      boxSizing: 'border-box',
    });
    this.bind('Change', this._attachOutput);
  },

  _attachOutput({ x, y, w }: { x: number; y: number; w: number }) {
    this._output = Crafty.e('2D, DOM')
      .attr({
        w: 50,
        h: 20,
        y: y - 2,
        x: x + w / 2 - 25, // 25 = half width
        z: Layers.stage + 1,
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
        z: Layers.stage + 2,
      })
      .css({ fontFamily: `'Share Tech Mono', monospace`, fontSize: 16 })
      .text('OUT')
      .textColor('white')
      .unselectable()
      .textAlign('center');

    this._output.attach(outputText);
  },

  _registerComponent(comp: Entity) {
    this._testZone(comp);

    comp.bind('Dragging', () => this._testZone(comp)).bind('MouseUp', () => {
      if (testZone(this, comp) === Position.INSIDE) {
        this.trigger('CodeComplete');
      }
    });

    return this;
  },

  _testZone(comp: Entity) {
    const position = testZone(this, comp);
    if (position === Position.INSIDE) {
      comp.color('limegreen');
    } else if (position === Position.BORDERING) {
      comp.color('mediumseagreen');
    } else {
      comp.color('maroon');
    }

    return this;
  },
});
