const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10)

	const user = await context.db.mutation.createUser({
		data: { ...args, password},
	}, `{ id }`)

	const token = jwt.sign({ userId: user.id}, APP_SECRET)

	return {
		token,
		user
	}
}


async function login(parent, args, context, info) {
	const user = await context.db.query.user({ where: {email: args.email}}, ` {id password }`)
	if(!user) {
		throw new Error('No such user found')
	}

	const valid = await bcrypt.compare(args.password, user.password)
	if(!valid) {
		throw new Error('Invalid password')
	}

	const token = jwt.sign({ userId: user.id}, APP_SECRET)

	return {
		token,
		user
	}
}

async function newArtist(parent, args, context, info) {
	// const userId = getUserId(context)
	return context.db.mutation.createArtist({
		data: {
			description: args.description,
			name: args.name,
			age: args.age,
			image: args.image,
			region: args.region,
			albums: args.albums,
			scores: args.scores
			// createdBy: {connect: {id: userId}}
		},
	}, info)

}

async function newAlbum(parent, args, context, info) {
	return context.db.mutation.createAlbum({
		data: {
			name: args.name,
			artist: {connect: {name: args.artistName}},
			releaseDate: args.releaseDate
		},
	}, info)

}

async function newScore(parent, args, context, info) {

	return context.db.mutation.createScore({
		data: {
			category: args.category,
			artist: {connect: {name: args.name}},
			amount: args.amount,
			user: {connect: {email: args.email}}
		},
	}, info)

}

async function updateScore(parent, args, context, info) {

	return context.db.mutation.createScore({
		data: {
			amount: args.amount
		},
		where: {
			user: {connect: {email: args.email}},
			category: args.category,
			artist: {connect: {name: args.name}},
		}
	}, info)

}

async function upsertScore(parent, args, context, info) {

	return context.db.mutation.upsertScore({
		create: {
			user: {connect: {email: args.email}},
			category: args.category,
			artist: {connect: {name: args.name}},
			amount: args.amount
		},
		where: {
			id: args.id
		},
		update: {
			amount: args.amount
		}
	}, info)

}

async function updateArtist(parent, args, context, info) {

	return context.db.mutation.updateArtist({
		data: {
			description: args.description,
			name: args.name,
			age: args.age,
			image: args.image,
			region: args.region,
			albums: args.albums,
			scores: args.scores
		},
		where: {
			id: args.id
		},
	}, info)

}

async function addArtist(parent, args, context, info) {

	return context.db.mutation.updateArtist({
		data: {
			description: args.description,
			name: args.name,
			age: args.age,
			image: args.image,
			region: args.region,
			albums: args.albums,
			scores: args.scores
		},
		where: {
			id: args.id
		},
	}, info)

}

async function updateArtist(parent, args, context, info) {

	return context.db.mutation.updateArtist({
		data: {
			description: args.description,
			name: args.name,
			age: args.age,
			image: args.image,
			region: args.region,
			albums: args.albums,
			scores: args.scores
		},
		where: {
			id: args.id
		},
	}, info)

}

async function addTopArtist(parent, args, context, info) {

	return context.db.mutation.updateUser({
		data: {
			artists: {
				connect: {id: args.id}
			}
		},
		where: {
			email: args.email
		},
	}, info)

}

async function removeTopArtist(parent, args, context, info) {


		return context.db.mutation.updateUser({
			data: {
				artists: {
					disconnect: {id: args.id}
				}
			},
			where: {
				email: args.email
			},
		}, info)

}
async function updateTopArtist(parent, args, context, info) {
	let currentUser = await context.db.query.user({where: {email: args.email}})

	console.log("CURRNT USER:", currentUser)

	// return context.db.mutation.updateUser({
	// 	data: {
	// 		artists: {
	// 			connect: {id: args.id}
	// 		}
	// 	},
	// 	where: {
	// 		email: args.email
	// 	},
	// }, info)

}



module.exports = {
	signup,
	login,
	newArtist,
	newAlbum,
	newScore,
	updateArtist,
	addTopArtist,
	removeTopArtist,
	updateScore,
	upsertScore,
	updateTopArtist
}
