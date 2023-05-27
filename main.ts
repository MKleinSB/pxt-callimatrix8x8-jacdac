namespace modules {
    /**
     * The 8x8 LED display
     */
    //% fixedInstance whenUsed block="gamezip screen"
    export const calliMatrix = new LedClient("Callimatrix8x8?dev=self&num_pixels=64&num_columns=8&variant=Matrix")
}

namespace servers {

    function start() {
        jacdac.productIdentifier = 0x34ef625f //e
        jacdac.deviceDescription = "Callimatrix8x8"
        jacdac.startSelfServers(() => {
            // p0 neopixels
            const strip = neopixel.create(DigitalPin.P0, 64, NeoPixelMode.RGB)
            const servers: jacdac.Server[] = [
              new jacdac.LedServer(
                    64,
                    jacdac.LedPixelLayout.RgbGrb,
                    (pixels, brightness) => {
                        strip.buf = pixels
                        strip.brightness = brightness
                        strip.show()
                    }, {
                    variant: jacdac.LedVariant.Matrix,
                    numColumns: 8
                }
                ),
            ]
            return servers
        })
    }
    start()
}