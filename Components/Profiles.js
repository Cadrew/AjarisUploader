import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements'
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
        <View style={{ flex: 1 }}>
            <View>
                { this.rows }
            </View>

            <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:'rgb(93, 156, 236)',
                    alignItems:'center',
                    justifyContent:'center',
                    width: 70,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    height: 70,
                    backgroundColor: 'rgb(93, 156, 236)',
                    zIndex: 100,
                    borderRadius: 100,
                    shadowColor: '#000',
                    elevation: 5,
                }}
            >
                <Image style={{width: 50, height: 50}} source={require('../Images/ic_plus.png')} />
            </TouchableOpacity>
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