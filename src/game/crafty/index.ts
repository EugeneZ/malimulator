declare global {
  interface Window {
    Crafty: any;
  }
}

export function playGame(target: HTMLElement) {
  const Crafty = window.Crafty;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  function offsetFromCenter(
    w: number,
    h: number,
    offsetX: number = 0,
    offsetY: number = 0,
  ) {
    return {
      w,
      h,
      x: screenWidth / 2 - w / 2 + offsetX,
      y: screenHeight / 2 - h / 2 + offsetY,
    };
  }

  Crafty.init(screenHeight, screenHeight, target);

  const understandingBoundary = Crafty.e('2D, DOM')
    .attr(offsetFromCenter(200, 200))
    .css({
      border: '3px double lime',
      boxSizing: 'border-box',
    });

  const output = Crafty.e('2D, DOM')
    .attr({
      w: 50,
      h: 20,
      y: understandingBoundary.y - 2,
      x: understandingBoundary.x + understandingBoundary.w / 2 - 25, // 25 = half width
    })
    .css({
      border: '2px solid steelblue',
      backgroundColor: '#333',
      boxSizing: 'border-box',
    });

  const outputText = Crafty.e('2D, DOM, Text')
    .attr({
      w: output.w,
      h: output.h,
      x: output.x,
      y: output.y + 1,
    })
    .css({ fontFamily: `'Share Tech Mono', monospace`, fontSize: 16 })
    .text('OUT')
    .textColor('white')
    .unselectable()
    .textAlign('center');

  output.attach(outputText);

  const component = Crafty.e('2D, DOM, Color, Draggable')
    .attr(offsetFromCenter(50, 50, understandingBoundary.w))
    .color('blue');

  component.bind('EnterFrame', function() {
    if (
      understandingBoundary.x < component.x &&
      understandingBoundary.x + understandingBoundary.w >
        component.x + component.w &&
      understandingBoundary.y < component.y &&
      understandingBoundary.h + understandingBoundary.y >
        component.y + component.h
    ) {
      this.color('limegreen');
    } else if (
      understandingBoundary.x < component.x + component.w &&
      understandingBoundary.x + understandingBoundary.w > component.x &&
      understandingBoundary.y < component.y + component.h &&
      understandingBoundary.h + understandingBoundary.y > component.y
    ) {
      this.color('mediumseagreen');
    } else {
      this.color('maroon');
    }
  });
}
