import EventBus from './EventBus'

export default class Time extends EventBus {
  start: number
  current: number
  elapsed: number
  delta: number
  hiddenDelta: number

  constructor() {
    super()
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.hiddenDelta = 0

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const current = Date.now()
    this.delta = current - this.current
    this.current = current
    this.elapsed = this.current - this.start
    this.trigger('tick')
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
