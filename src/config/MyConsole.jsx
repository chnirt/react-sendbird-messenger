import { LOG, INFO, WARN, ERROR } from '@constants'

export const MyConsole = {
    run() {
        // define a new console
        function config(status, oldCons, msg) {
            if (process.env.NODE_ENV === 'production') return

            if (typeof msg === 'object') {
                oldCons.log(msg)
                return
            }
            switch (status) {
                case 'log':
                    oldCons.log('%c' + msg, `color:${LOG};font-weight:bold;`)
                    break
                case 'info':
                    oldCons.log('%c' + msg, `color:${INFO};font-weight:bold;`)
                    break
                case 'warm':
                    oldCons.log('%c' + msg, `color:${WARN};font-weight:bold;`)
                    break
                default:
                    oldCons.log('%c' + msg, `color:${ERROR};font-weight:bold;`)
            }
        }

        var console = ((oldCons) => ({
            log: (msg) => config('log', oldCons, msg),
            info: (msg) => config('info', oldCons, msg),
            warn: (msg) => config('warn', oldCons, msg),
            error: (msg) => config('error', oldCons, msg),
        }))(window.console)

        //Then redefine the old console
        window.console = console
    },
}
