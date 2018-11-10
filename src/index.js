

const typeDefs = [
	`
		type User {
			_id: String
			email: String
		}

		type Artist {
			_id: String
			age: Int
			description: String
			region: String
			yearStarted: Int
			albums: [Album]
			score: Array
		}

		type Album {
			_id: String
			name: String
			releaseDate: Date
		}

		type Score {
			category: String
			amount: Int
		}

		type Query {
			user(_id: String): User
			users: User
			artst(_id: String, name: String): Artist
			artists: Artist
			album:(_id:String, name: String): Album
			albums: Album
		}

		type Mutation {
			updateArtist(category: String, amount: Int) : Score
		}

		schema {
			query: Query
			muation: Mutation
		}
	`
]