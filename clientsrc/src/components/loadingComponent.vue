<template>
    <div class="d-flex loading-component justify-content-center m-2">
        <canvas id="animationCanvas" class="loading-animations">

        </canvas>
    </div>
</template>

<script>
    export default {
        name: "loadingComponent",
        mounted() {
            this.scribbleAnimation(255, 255, 255, 0, 0)
        },
        data() {
            return {

            }
        },
        methods: {
            scribbleAnimation(r, g, b, x, y) {
                let shapeSize = 2
                let colorSpeed = 10
                let animationSpeed = 5
                let animationRate = 1 //lower is faster, minimum value is 1

                let c = document.getElementById("animationCanvas")
                let ctx = c.getContext("2d")

                let red = r
                let green = g
                let blue = b
                let xPos = x
                let yPos = y

                //color logic
                red += (Math.random() - 0.5) * colorSpeed
                if (red > 255) { red = 255 }
                if (red < 0) { red = 0 }
                green += (Math.random() - 0.5) * colorSpeed
                if (green > 255) { green = 255 }
                if (green < 0) { green = 0 }
                blue += (Math.random() - 0.5) * colorSpeed
                if (blue > 255) { blue = 255 }
                if (blue < 0) { blue = 0 }

                //movement logic
                xPos += (Math.random() - 0.5) * animationSpeed
                if (xPos > (c.width / 2)) { xPos = (c.width / 2) }
                if (xPos < -(c.width / 2)) { xPos = -(c.width / 2) }
                yPos += (Math.random() - 0.5) * animationSpeed
                if (yPos > (c.height / 2)) { yPos = (c.height / 2) }
                if (yPos < -(c.height / 2)) { yPos = -(c.height / 2) }

                //draws shape
                ctx.fillStyle = `rgb(${red}, ${blue}, ${green})`
                ctx.fillRect((c.width / 2) + xPos, (c.height / 2) + yPos, shapeSize, shapeSize)

                setTimeout(() => {
                    if (document.getElementById("animationCanvas")) {
                        this.scribbleAnimation(red, green, blue, xPos, yPos)
                    }
                }, animationRate);
            }

        }
    }
</script>

<style>

</style>