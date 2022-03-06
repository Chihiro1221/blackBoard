import './style.css'
class Board {
  constructor(
    private el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private width = el.width,
    private height = el.height,
    private app = el.getContext('2d')!,
    private btns: HTMLDivElement = document.createElement('div'),
    private bgColor = '#000',
    private lineColor = '#fff',
    private colors = ['#ecf0f1', '#1abc9c', '#3498db', '#9b59b6', '#2c3e50']
  ) {
    this.initCanvas()
    this.bindEvnet()
  }

  // 初始化画布
  private initCanvas() {
    this.app.fillStyle = this.bgColor
    this.app.fillRect(0, 0, this.width, this.height)
    this.btns.classList.add('btns')
    this.el.insertAdjacentElement('afterend', this.btns)
  }

  // 清屏
  public clear() {
    const btn = document.createElement('button')
    btn.innerText = '清屏'
    btn.addEventListener('click', () => {
      this.app.fillStyle = '#000'
      this.app.fillRect(0, 0, this.width, this.height)
    })
    this.btns.insertAdjacentElement('beforeend', btn)

    return this
  }

  // 设置画布颜色
  public setBgColor(color: string) {
    this.bgColor = color
    this.app.fillStyle = color
    this.app.fillRect(0, 0, this.width, this.height)

    return this
  }

  // 设置画笔颜色
  public setLineColor() {
    const container = document.createElement('div')
    container.classList.add('colors-container')
    container.innerText = '画笔颜色:'
    // 渲染按钮
    this.colors.forEach(color => {
      const div = document.createElement('div')
      div.classList.add('color')
      div.style.backgroundColor = color
      container.insertAdjacentElement('beforeend', div)

      div.addEventListener('click', () => {
        this.lineColor = color
      })
    })

    this.btns.insertAdjacentElement('beforeend', container)
  }

  // 绑定事件
  private bindEvnet() {
    const callback = this.drawLine.bind(this)
    this.el.addEventListener('mousedown', () => {
      this.app.beginPath()
      this.app.strokeStyle = this.lineColor
      this.el.addEventListener('mousemove', callback)
    })
    // 移除事件
    document.addEventListener('mouseup', () => {
      this.el.removeEventListener('mousemove', callback)
    })
  }

  // 画线
  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY)
    this.app.stroke()
  }
}

const instance = new Board().clear().setBgColor('#9b59b6').setLineColor()
