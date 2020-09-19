import { LOG, INFO, WARN, ERROR } from '@constants'

export const MyConsole = {
    run() {
        if (process.env.NODE_ENV === 'production') {
            console.log = function () {}
            console.info = function () {}
            console.warn = function () {}
            console.error = function () {}
        }

        var LOG_PREFIX =
            // new Date().getDate() +
            // '.' +
            // new Date().getMonth() +
            // '.' +
            // new Date().getFullYear() +
            // ' / ' +
            new Date().getHours() +
            ':' +
            new Date().getMinutes() +
            ':' +
            new Date().getSeconds()

        const styles = (color) =>
            [
                `background: ${color}`,
                'border-radius: 3px',
                'color: white',
                'font-weight: bold',
                'padding: 2px 5px',
            ].join(';')

        console.log = (function () {
            return Function.prototype.bind.call(
                console.log,
                console,
                `%c${LOG_PREFIX} Log`,
                styles(LOG)
            )
        })()
        console.info = (function () {
            return Function.prototype.bind.call(
                console.info,
                console,
                `%c${LOG_PREFIX} Info`,
                styles(INFO)
            )
        })()
        console.warn = (function () {
            return Function.prototype.bind.call(
                console.warn,
                console,
                `%c${LOG_PREFIX} Warn`,
                styles(WARN)
            )
        })()
        console.error = (function () {
            return Function.prototype.bind.call(
                console.error,
                console,
                `%c${LOG_PREFIX} Error`,
                styles(ERROR)
            )
        })()
    },
}
