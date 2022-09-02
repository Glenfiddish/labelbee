import { BasicToolOperation } from './basicToolOperation';

enum ScribbleMode {
  Scribble,
  Erase,
}

class ScribbleTool extends BasicToolOperation {
  private action = ScribbleMode.Scribble;

  constructor(e) {
    super(e);
    if (this.ctx) {
      this.ctx.globalAlpha = 0.5;
    }

    console.log(this.ctx.globalAlpha);
  }

  public setResult(data: any) {
    console.log(data);
  }

  public eventBinding() {
    super.eventBinding();
  }

  public onMouseUp = (e: MouseEvent) => {
    this.mouseEvents('onMouseUp').call(this, e);
  };

  public onMouseMove = (e: MouseEvent) => {
    this.mouseEvents('onMouseMove').call(this, e);
  };

  public onMouseDown = (e: MouseEvent) => {
    this.mouseEvents('onMouseDown').call(this, e);
  };

  public mouseEvents = (eventType: 'onMouseMove' | 'onMouseUp' | 'onMouseDown') => {
    const events = {
      [ScribbleMode.Scribble]: {
        onMouseMove: this.onScribbleMove,
        onMouseUp: this.onScribbleEnd,
        onMouseDown: this.onScribbleStart,
      },
      [ScribbleMode.Erase]: {
        onMouseMove: this.onEraseMove,
        onMouseUp: this.onEraseEnd,
        onMouseDown: this.onEraseStart,
      },
    };

    return events[this.action][eventType];
  };

  public toggleMode = () => {
    this.action = this.action === ScribbleMode.Scribble ? ScribbleMode.Erase : ScribbleMode.Scribble;
  };

  public onContextmenu = () => {
    this.toggleMode();
  };

  public onScribbleStart(e: MouseEvent) {
    if (this.ctx) {
      this.ctx.globalCompositeOperation = 'destination-atop';
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(143, 122, 69, 0.3)';
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.moveTo(e.offsetX, e.offsetY);

      this.prevAxis = { x: e.offsetX, y: e.offsetY };
    }
  }

  public onScribbleMove(e: MouseEvent) {
    if (e.buttons === 1 && this.ctx) {
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
      this.prevAxis = { x: e.offsetX, y: e.offsetY };
    }
  }

  public onScribbleEnd() {
    this.ctx?.restore();
  }

  public eraseArc(e: MouseEvent) {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(e.offsetX, e.offsetY, 10 / 2, 0, Math.PI * 2, false);
      this.ctx.clip();
      this.ctx.restore();
    }
  }

  public onEraseStart(e: MouseEvent) {
    this.eraseArc(e);
    return;

    if (this.ctx) {
      this.ctx.save();
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.moveTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  public onEraseMove(e: MouseEvent) {
    if (e.buttons === 1 && this.ctx) {
      this.eraseArc(e);
      return;

      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx?.clip();
      this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.stroke();
      this.ctx?.restore();
    }
  }

  public onEraseEnd() {}
}

export default ScribbleTool;
