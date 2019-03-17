
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

async function removeArtist(parent, args, context, info) {

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
