function start () {
    jacdac.startSelfServers(() => {
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
        const server = new jacdac.LedServer(
            N,
            jacdac.LedPixelLayout.RgbGrb,
            (pixels, brightness) => {
                light.sendWS2812BufferWithBrightness(
                    pixels,
                    DigitalPin.P0,
                    brightness
                )
            },
            {
                variant: jacdac.LedVariant.Matrix,
                numColumns: 8,
            }
        )
        return [server]
    })
}
namespace modules {
    /**
     * The 8x8 LED display
     */
    //% fixedInstance whenUsed block="Callimatrix8x8"
    export const calliMatrix = new LedClient("Callimatrix8x8?dev=self&num_pixels=64&num_columns=8&variant=Matrix")
}
let N = 64
start()
