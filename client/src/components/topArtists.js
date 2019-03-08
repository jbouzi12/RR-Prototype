// <Query query={USER_QUERY}>
// {({ loading, error, data: {user} }) => {
//   console.log("DATA:", user)
//   if (loading) return <Text>loading...</Text>
//   if(error) {
//     console.log("ERRORONE:", error)
//     return (
//       <Text> Error </Text>
//     )
//   }
//   let userArtists = user.artists;
//
//   return (<View
//     style={{
//       flexDirection: 'row',
//       alignContent: 'center',
//       alignItems: 'center',
//       marginTop: 350
//     }}
//   >
//      <Text
//       style={{
//         fontWeight: "bold",
//         margin: 10
//       }}
//      >
//       {user.name}
//      </Text>
//      {this.renderTopArtists(userArtists)}
//      <TouchableHighlight
//        // onPress={() => this.pressRow(this.state.currentArtist, user)}
//        underlayColor="#ddd"
//      >
//        <Text
//         style={{
//           fontWeight: "bold",
//           margin: 10,
//           color: "#FF365D"
//         }}
//        >
//         {this.state.currentArtist && this.state.currentArtist.name ? this.state.currentArtist.name : ""}
//        </Text>
//       </TouchableHighlight>
//
//    </View>
//  )
// }}
// </Query>
