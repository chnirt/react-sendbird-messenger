import moment from 'moment'

export const formatHeaderTime = (time = new Date()) => {
    return moment(time).format('HH:mm, DD MMM, YYYY')
}
