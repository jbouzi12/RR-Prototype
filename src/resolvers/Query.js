function artists(parent, args, context, info) {
    return context.db.query.artists({}, info)
}

module.exports = {
	artists
}