function queueGroupAdd({ emoji, message }, user_id) {
    if (message.channel.name !== "sales-queue" || emoji.name !== "💪") {
        return
    }

    console.log(`user with id ${user_id} is joining a sale group`)
}

function queueGroupRemove({ emoji, message }, user_id) {
    if (message.channel.name !== "sales-queue" || emoji.name !== "💪") {
        return
    }

    console.log(`user with id ${user_id} is leaving a sale group`)
}

module.exports = { add: queueGroupAdd, remove: queueGroupRemove }
