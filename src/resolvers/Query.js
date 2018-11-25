function artists(parent, args, context, info) {
    return context.db.query.artists({}, info)
}

function users(parent, args, context, info) {
    return context.db.query.users({}, info)
}

function albums(parent, args, context, info) {
    return context.db.query.albums({}, info)
}

module.exports = {
	artists,
	users,
	albums
}