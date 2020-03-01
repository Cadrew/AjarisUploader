import React from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { connect } from 'react-redux'
import { version } from "../package.json";

class About extends React.Component {
    
    componentDidMount = () => {
        
    }

  render() {
    return (
        <View>
            <Text style={{ fontSize: 25, color: "black" }}>Ajaris UpLoader Mobile { version }</Text>
            <Text style={{ fontSize: 20, color: "black" }}>Ajaris est un produit <Text style={{ fontSize: 20, color: "blue", textDecorationLine: "underline" }} onPress={ ()=> Linking.openURL('https://orkis.com') }>orkis.com</Text></Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(About)