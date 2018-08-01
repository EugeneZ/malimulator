import { Crafty } from './types';
import './components/ConnectorOverlay';
import './components/CodeComponent';
import './components/UnderstandingBoundary';
import Layers from './layers';

const Crafty = window.Crafty;

export function playGame(target: HTMLElement) {
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

  Crafty.init(screenWidth, screenHeight, target);

  const understandingBoundary = Crafty.e('UnderstandingBoundary')
    .attr(offsetFromCenter(200, 200))

  const component = Crafty.e('CodeComponent')
    .attr({
      ...offsetFromCenter(50, 50, understandingBoundary.w),
    });

  understandingBoundary._registerComponent(component);
}
