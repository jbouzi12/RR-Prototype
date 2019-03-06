const {getUserId} = require('../utils')

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

function score(root, args, context, info) {
	return context.db.query.score({ where: {id: root.score.id}}, info)
}


function scores(parent, args, context, info) {
    return context.db.query.scores({}, info)
}

function user(parent, args, context, info) {
    const userId = getUserId(context)
    return context.db.query.user({where: {id: userId}}, info)
}

module.exports = {
	artists,
	users,
	albums,
	artist,
	album,
  score,
  scores,
  user
}
