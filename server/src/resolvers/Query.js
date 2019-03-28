const {getUserId} = require('../utils')

function artists(parent, args, context, info) {
  const { filter } = args // destructure input arguments
  const where = filter
    ? { OR: [{ name_contains: filter }] }
    : {}

  let artistQuery = filter && filter.length > 0 ? {where} : {}

  return context.db.query.artists(artistQuery, info)

}

function scores(parent, args, context, info) {
    const where = args.email && args.name ?
    {AND: [{user: {email: args.email}}, {artist: {name: args.name}}]} :
    {}

    let scoreQuery = !args.email && !args.name ? {} : {where}

    return context.db.query.scores(scoreQuery, info)
}

async function scoreAverage(parent, args, context, info) {

  const where = args.name && args.category ?
  {AND: [{artist: {name: args.name}},{category: args.category}]}
  : {}

  const scores = await context.db.query.scores({where})

  let scoreSum = 0;

  if(scores && scores.length) {
    scores.map((score) => {
      scoreSum = scoreSum + score.amount
    })
    return scoreSum/scores.length

  }

  return 0
}

function artistSearch(parent, args, context, info) {
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
  user,
  artistSearch,
  scoreAverage
}
