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
    this.draw()
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
      this.bgColor = '#000'
      this.app.fillStyle = this.bgColor
      this.app.fillRect(0, 0, this.width, this.height)
      this.recoverLineWidth(1)
      this.lineColor = 'white'
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
    this.colors.forEach((color, index) => {
      const div = document.createElement('div')
      if (index === 0) {
        div.classList.add('active')
        this.lineColor = color
      }
      div.classList.add('color')
      div.style.backgroundColor = color
      container.insertAdjacentElement('beforeend', div)

      div.addEventListener('click', () => {
        this.removeClass('active')
        div.classList.add('active')
        this.lineColor = color
      })
    })

    this.btns.insertAdjacentElement('beforeend', container)

    return this
  }

  private removeClass(className: string) {
    const colors = document.querySelectorAll('.color')
    colors.forEach(div => div.classList.remove(className))
    return this
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

  // 橡皮
  public erase() {
    const btn = document.createElement('button')
    btn.innerText = '橡皮擦'
    btn.addEventListener('click', () => {
      this.lineColor = this.bgColor
      this.recoverLineWidth(10)
    })
    this.btns.insertAdjacentElement('beforeend', btn)
    return this
  }

  // 修改画笔大小
  private recoverLineWidth(width: number) {
    this.app.lineWidth = width
  }

  // 恢复画笔
  public draw() {
    const btn = document.createElement('button')
    btn.innerText = '画笔'
    this.recoverLineWidth(1)
    btn.addEventListener('click', () => {
      this.lineColor = 'white'
      this.recoverLineWidth(1)
    })
    this.btns.insertAdjacentElement('beforeend', btn)
    return this
  }

  // 截图
  public short() {
    const btn = document.createElement('button')
    btn.innerText = '截图'
    btn.addEventListener('click', () => {
      const img = document.querySelector<HTMLImageElement>('.canvas-image')
      if (img) {
        img.src = this.el.toDataURL('image/jpeg')
      } else {
        const image = document.createElement('img')!
        image.classList.add('canvas-image')
        image.src = this.el.toDataURL('image/jpeg')
        this.btns.insertAdjacentElement('afterend', image)
      }
    })
    this.btns.insertAdjacentElement('beforeend', btn)
    return this
  }
}

const instance = new Board().clear().erase().short().setLineColor()
