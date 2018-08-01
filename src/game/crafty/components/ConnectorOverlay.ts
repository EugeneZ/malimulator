import Layers from '../layers';

const Crafty = window.Crafty;

Crafty.createLayer('ConnectorCanvas', 'Canvas', { z: Layers.connectors });

Crafty.c('ConnectorOverlay', {
  init() {
    this.addComponent('2D, ConnectorCanvas, Mouse');
    this.x = 0;
    this.y = 0;
    this.z = Layers.connectors;
    this.w = Crafty.viewport._width;
    this.h = Crafty.viewport._height;
    this.bind('Change', this._change);
    this.bind('Draw', this._draw);
    this.bind('MouseMove', this._move);
    this.bind('MouseUp', this._done);
    this.ready = true;
  },
  _change({ _originComponent }: any) {
    this._originX = _originComponent.pos()._x + _originComponent.w / 2;
    this._originY = _originComponent.pos()._y + _originComponent.h / 2;
  },
  _move(e: any) {
    this._toX = e.realX;
    this._toY = e.realY;
    this.trigger('Invalidate');
  },
  _done(e: any) {
    this.destroy();
  },
  _draw(e: any) {
    const ctx = e.ctx;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this._originX || this._toX, this._originY || this._toX);
    ctx.lineTo(this._toX, this._toY);
    ctx.stroke();
  },
});