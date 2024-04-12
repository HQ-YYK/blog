

const TimeFun = () => {
  const timeData = {
    start: 0,
    current: 0,
    elapsed: 0,
    delta: 16,
    hiddenDelta: 0
  }

  const Timetick = () => {
    const current = Date.now()
    timeData.delta = current - timeData.current
    timeData.current = current
    timeData.elapsed = timeData.current - timeData.start

    window.requestAnimationFrame(() => {
      Timetick()
    })
  }

  window.requestAnimationFrame(() => {
    Timetick()
  })

  return {
    timeData,
    Timetick
  }
}

export default TimeFun