
import { 
    Stitch,
    RemoteMongoClient,
    AnonymousCredential,
    ObjectId
} from "mongodb-stitch-browser-sdk";
import {prepare} from "../utils/index"
import {makeExecutableSchema} from 'graphql-tools'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(cors())


const PORT = 3001


export const start = async () => {

	try {

	const client = Stitch.initializeDefaultAppClient('real_rap_test');

	const db =  await client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('rr_prototype');

	const Artists = db.collection('artists'),
		  Albums = db.collectoin('albums');	


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
				scores: Array
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
				artist(_id: String, name: String): Artist
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

	const resolvers = {
		Query: {
			artist: async (root, {_id}) => {
				return prepare(await Artists.findOne(ObjectId(_id)))
			},
			artists: async () => {
				return (await Artists.find({}).toArray()).map(prepare)
			}
		},
	}

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	})

	app.use('/graqhql', bodyParser.json(), graphqlExpress({schema}))

	app.use('/graqhql', graphiqlExpress({
		endpointURL: './graqhql'
	}))

	app.listen(PORT, () => {
		console.log(`Visit http://localhost:${PORT}`)
	})
} catch (e) {
	console.log(e)
}

}