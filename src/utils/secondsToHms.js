export const secondsToHms = (seconds) => {
    if (!seconds) return '0:0'

    let duration = seconds
    let hours = duration / 3600
    duration = duration % 3600

    let min = parseInt(duration / 60)
    duration = duration % 60

    let sec = parseInt(duration)

    if (sec < 10) {
        sec = `${sec}`
    }
    if (min < 10) {
        min = `${min}`
    }

    if (parseInt(hours, 10) > 0) {
        return `${parseInt(hours, 10)}h ${min}m ${sec}s`
    } else if (min === 0) {
        return sec
    } else {
        return `${min}:${sec}`
    }
}

export function getRandomColor() {
    var color = '#';
    for (var i = 0; i < 3; i++) {
        const component = (Math.floor(Math.random() * 64)).toString(16).toUpperCase();
        color += component.length === 1 ? '0' + component : component;
    }
     return color;
}