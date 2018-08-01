declare global {
  interface Window {
    Crafty: Crafty;
  }
}

const Crafty = window.Crafty;

export interface Entity {
  readonly attr: (attributes: {})=>Entity,
  readonly attach: (entity: Entity)=>Entity,
  readonly css: (css: {})=>Entity,
  readonly color: (color: string)=>Entity,
  readonly bind: (event: string, handler: (e: {})=>void)=>Entity,
  readonly text: (text: string)=>Entity,
  readonly textColor: (color: string)=>Entity,
  readonly textAlign: (alignment: string)=>Entity,
  readonly unselectable: ()=>Entity,
  readonly _registerComponent: (comp: Entity)=>Entity;
  x: number,
  y: number,
  w: number,
  h: number,
}

interface CreateLayerOptions {
  readonly xResponse?: number,
  readonly yResponse?: number,
  readonly scaleResponse?: number,
  readonly z?: number,
}

interface Viewport {
  readonly _x: number,
  readonly _y: number,
  readonly _width: number,
  readonly _height: number,
}

export interface Crafty {
  readonly mouseButtons: {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
  },
  readonly init: (width: number, height: number, el: HTMLElement)=>void,
  readonly c: (components: string, definition: {})=>void,
  readonly e: (component: string)=>Entity,
  readonly createLayer: (name: string, type: 'DOM' | 'Canvas', options: CreateLayerOptions)=>void,
  readonly viewport: Viewport,
}