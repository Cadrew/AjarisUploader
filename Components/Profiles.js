import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import { _removeProfile, _removeAllProfiles, _addProfile, _retrieveProfiles, getProfiles } from "../Store/Storage";

class Profiles extends React.Component {
    profiles = []
    rows = []

    componentDidMount = () => {
        //_removeAllProfiles().then(() => {
            //_addProfile({ name: "Alexandre Do-o Almeida", login: "Thulium", url: "test.com", pwd: "test", base: 1, avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }).then(() => {
                _retrieveProfiles().then(() => {
                    this.profiles = getProfiles();
                    this.rows = this.profiles.map((profile, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: profile.avatar_url } }}
                            title={ profile.name }
                            subtitle={ profile.login }
                            bottomDivider
                        />
                    ));    
                    this.forceUpdate();
                });
            //});
        //});
    }

  render() {
    return (
        <View>
            { this.rows }
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

export default connect(mapStateToProps)(Profiles)