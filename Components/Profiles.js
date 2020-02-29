import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Icon } from 'react-native-elements'
import { Provider } from "react-redux";
import Store from "../Store/configureStore";
import { _removeProfile, _removeAllProfiles, _addProfile, _retrieveProfiles, getProfiles } from "../Store/Storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

let rows = [];

function getRows() {
    return rows;
}

function setRows(data) {
    rows = data.map((profile, i) => (
        <ListItem
            key={i}
            leftAvatar={{ source: { uri: profile.avatar_url } }}
            title={ profile.name }
            subtitle={ profile.login }
            bottomDivider
        />
    ));
}

function Profile({ navigation }) {
    let r = getRows();
    return (
        <View style={{ flex: 1 }}>
            <View>
                { r }
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('AddProfile')}
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
                    elevation: 3,
                }}
            >
                <Image style={{width: 50, height: 50}} source={require('../Images/ic_plus.png')} />
            </TouchableOpacity>
        </View>
    )
}

function AddProfile({ navigation }) {
    return (
        <Text style={{ fontSize: 20, color: "black" }} onPress={() => navigation.goBack() }> Add Profile </Text>
    )
}

const Stack = createStackNavigator();

function AjarisStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AddProfile" component={AddProfile} />
    </Stack.Navigator>
  );
}

class Profiles extends React.Component {
    constructor () {
        super()
        this.state = { profiles: [] }
    }

    componentDidMount = () => {
        //_removeAllProfiles().then(() => {
            //_addProfile({ name: "Alexandre Do-o Almeida", login: "Thulium", url: "test.com", pwd: "test", base: 1, avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }).then(() => {
                _retrieveProfiles().then(() => {
                    setRows(getProfiles());
                    this.setState({ profiles: getProfiles() });
                });
            //});
        //});
    }

    render() {
        return (this.state.profiles.length <= 0 ? <Text></Text> :
            <Provider store={Store}>
                <NavigationContainer independent={true}>
                    <AjarisStack />
                </NavigationContainer>
            </Provider>
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