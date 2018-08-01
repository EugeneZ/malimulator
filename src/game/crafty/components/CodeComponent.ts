import Layers from '../layers';

const Crafty = window.Crafty;

Crafty.c('CodeComponent', {
  init() {
    this.addComponent('2D, DOM, Color, Draggable, Mouse');
    this.z = Layers.component;
    this.color('blue')
    this.bind('MouseDown', function(e: any) {
      if (e.mouseButton === Crafty.mouseButtons.RIGHT) {
        this._handleRightClick()
      }
    });
  },

  _handleRightClick() {
    Crafty.e('ConnectorOverlay').attr({
      _originComponent: this,
    });
  }
});