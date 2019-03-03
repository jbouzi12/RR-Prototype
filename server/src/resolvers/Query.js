function artists(parent, args, context, info) {
    return context.db.query.artists({}, info)
}

function users(parent, args, context, info) {
    return context.db.query.users({}, info)
}

function albums(parent, args, context, info) {
    return context.db.query.albums({}, info)
}

function artist(root, args, context, info) {
	return context.db.query.artist({ where: {id: root.artist.id}}, info)
}

function album(root, args, context, info) {
	return context.db.query.album({ where: {id: root.album.id}}, info)
}

module.exports = {
	artists,
	users,
	albums,
	artist,
	album
}