const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')



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