const pluralize = (word, number) => `${number} ${word}${number > 1 ? "s" : ""}`

module.exports = (message, uptime, hostname, freemem) => {
    if (message.channel.type !== "dm") {
        return
    }

    const one = {
        day: 86400,
        hour: 3600,
        minute: 60
    }

    let remaining = uptime
    const days = parseInt(remaining / one.day)
    remaining -= days * one.day
    const hours = parseInt(remaining / one.hour)
    remaining -= hours * one.hour
    const minutes = parseInt(remaining / one.minute)
    remaining -= minutes * one.minute
    const seconds = remaining

    let uptimeParts = []

    if (days > 0) {
        uptimeParts.push(pluralize("day", days))
    }

    if (hours > 0) {
        uptimeParts.push(pluralize("hour", hours))
    }

    if (minutes > 0) {
        uptimeParts.push(pluralize("minute", minutes))
    }

    if (seconds > 0) {
        uptimeParts.push(pluralize("second", seconds))
    }

    message.channel.send(
        `I've been up for ${uptimeParts.join(
            " "
        )} on ${hostname}. Free memory is ${freemem}MiB.`
    )
}
