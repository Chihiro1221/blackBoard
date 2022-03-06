import './style.css'
class Board {
  constructor(
    private el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private width = el.width,
    private height = el.height,
    private app = el.getContext('2d')!
  ) {
    this.initCanvas()
    this.bindEvnet()
  }

  // 初始化画布
  private initCanvas() {
    this.app.fillStyle = '#000'
    this.app.fillRect(0, 0, this.width, this.height)
  }

  // 绑定事件
  private bindEvnet() {
    const callback = this.drawLine.bind(this)
    this.el.addEventListener('mousedown', () => {
      this.app.beginPath()
      this.app.strokeStyle = 'white'
      this.el.addEventListener('mousemove', callback)

      // 移除事件
      document.addEventListener('mouseup', () => {
        this.el.removeEventListener('mousemove', callback)
      })
    })
  }

  // 画线
  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY)
    this.app.stroke()
  }
}

const instance = new Board()
