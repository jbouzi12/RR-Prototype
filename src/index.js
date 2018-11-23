const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
	type Query {
  info: String!
  feed: [Link!]!
  artists: [Artist!]!
}

	type Artist {
				_id: ID!
				name: String!
				age: Int!
				description: String!
				region: String
				yearStarted: Int
				
			}

type Link {
  _id: ID!
  description: String!
  url: String!
}

		


`

  // artist(_id: ID, name: String): Artist




			// type Query {
			
			// 	artist(_id: String, name: String): Artist
			// 	artists: Artist
			// }


// type User {
// 				_id: String
// 				email: String
// 			}
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

let links = [{
  _id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let artists = [{
  _id: 'artist-0',
  name: 'Drake',
  age: 31,
  description: 'Toroto idiot'
}]

const resolvers = {
	Query: {
			
			info: () => `This is the API of a Hackernews Clone`,
    		feed: () => links,
    		artists: () => artists
			// artists: async () => {
			// 	return (await Artists.find({}).toArray()).map(prepare)
			// }
		},
	Artist: {
		_id: (root) => root._id,
		name: (root) => root.name,
		age: (root) => root.age,
		description: (root) => root.description

		},
	Link: {
		_id: (root) => root._id,
		description: (root) => root.description,
		url: (root) => root.url,
	}
		 
}


const server = new GraphQLServer({
	typeDefs,
	resolvers
})

server.start(() => console.log("Server is running on http://localhost:4000"))