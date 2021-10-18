const gpu = new GPU()
const canvasDiv = document.getElementsByTagName('div')

var mouse = {
    x: 0,
    y: 0
}

var size = {
    x: 6000,
    y: 6000
}

var setMousePos = (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
}

setInterval(() => {
    const render = gpu.createKernel(function (data) {
            var r = this.thread.x / data[2]
            var g = this.thread.y / data[3]
            var b = (Math.sin(this.thread.x / data[2] * this.thread.y / data[3] * 1000) + 1) / 2

            var dist = Math.sqrt(Math.pow(this.thread.x - data[0], 2) + Math.pow(this.thread.y - data[1], 2))
            if (dist < 100) {
                r = dist
                g = 100 - dist
                b = (r+g)/2
            }

            this.color(r, g, b, 1)
        })
        .setOutput([size.x, size.y])
        .setGraphical(true)

    render([mouse.x, size.y - mouse.y, size.x, size.y]);

    const canvas = render.getCanvas()
    canvasDiv[0].appendChild(canvas)
}, 33)
