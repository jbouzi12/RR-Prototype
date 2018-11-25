const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

  // artist(_id: ID, name: String): Artist




			// type Query {
			
			// 	artist(_id: String, name: String): Artist
			// 	artists: Artist
			// }



// albums: [Album]
// 				scores: [Score]

			// type Album {
			// 	_id: String
			// 	name: String
			// 	releaseDate: String
			// }

			// type Score {
			// 	category: String
			// 	amount: Int
			// }

			// type Query {
			// 	user(_id: String): User
			// 	users: User
			// 	artist(_id: String, name: String): Artist
			// 	artists: Artist
			// 	album(_id: String, name: String): Album
			// 	albums: Album
			// }

			// type Mutation {
			// 	updateArtist(category: String, amount: Int): Score
			// }

			// schema {
			// 	query: Query
			// 	mutation: Mutation
			// }




// const resolvers = {
	// Query: {	
 //    	artists: () => (root, args, context, info) => {
 //    		return context.db.query.artists({}, info)
 //    	}
	// },
// 	Artist: {
// 		id: (root) => root._id,
// 		name: (root) => root.name,
// 		age: (root) => root.age,
// 		description: (root) => root.description

// 		},
// 	Mutation: {
// 		newArtist: (root, args, context, info) => {
// 			return context.db.mutation.createArtist({
// 				data: {
// 					description: args.description,
// 					name: args.name,
// 					age: args.age,
// 					region: args.region
// 				},
// 			}, info)
		
// 		}
// 	}
		 
// }

const resolvers = {
	Query,
	Mutation,
	AuthPayload
}


const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: 'src/generated/prisma.graphql',
			endpoint: 'https://us1.prisma.sh/mrbouzi/database/dev',
			secret: 'mysecret123',
			debug: true
		})
	})
})

server.start(() => console.log("Server is running on http://localhost:4000"))