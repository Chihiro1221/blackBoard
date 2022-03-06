import './style.css'
class Board {
  constructor(
    private el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private width = el.width,
    private height = el.height,
    private app = el.getContext('2d')!
  ) {
    this.app.fillStyle = '#000'
    this.app.fillRect(0, 0, this.width, this.height)
  }
}

const instance = new Board()
