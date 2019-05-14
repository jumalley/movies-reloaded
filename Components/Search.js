import React from 'react'
import { StyleSheet, Button, View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem.js'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi.js'

class Search extends React.Component {

  constructor(props) {
      super(props)
      this.page = 0
      this.totalPages = 0
      this.searchedText = ""
      this.state = { films: [],
      isLoading: false
    }
  }

  _loadFilms() {
    this.setState({ isLoading: true })
    if (this.searchedText.length > 0 ) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
           })
      })
  }
}

  _displayLoading(){
    if(this.state.isLoading) {
      return (
      <View style={styles.loading_container}>
      <ActivityIndicator size='large' />
      </View>
    )}
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
    console.log("Page: " + this.page + " / Pages total " + this.totalPages + " nombre de films " + this.state.films.length)
    this._loadFilms()
    })
  }

render() {
  //version
  console.log("movies-reloaded v.1.2")
  //debug info state isLoading
  //console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
        <TextInput onSubmitEditing= {() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder='Titre du film'/>
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachThreashold= {0.5}
          onEndReached= {() => {
            if (this.page < this.totalPages) {
              this._loadFilms()
            }
          }}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  main_container: {
    flex: 1,
    marginTop: 25
  },
  textinput: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 100,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}
})

export default Search
