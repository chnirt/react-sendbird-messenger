import moment from 'moment'

export const formatLastTime = (lastTime = new Date()) => {
    var today = moment(new Date())
    var day = moment(lastTime)

    if (today.isSame(day, 'd')) {
        // They are on the same day
        return moment(lastTime).format('HH:mm A')
    }

    return moment(lastTime).format('DD/MM/YYYY')
}
