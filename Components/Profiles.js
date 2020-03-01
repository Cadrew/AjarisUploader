import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text, TextInput, ActivityIndicator } from 'react-native'
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
    //const [listProfiles, setListProfiles] = React.useState("");
    //setListProfiles(getRows());
    return (
        <View style={{ flex: 1 }}>
            <View>
                { r }
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('AddProfile')}
                style={ styles.newProfileButton }
            >
                <Image style={{width: 50, height: 50}} source={require('../Images/ic_plus.png')} />
            </TouchableOpacity>
        </View>
    )
}

function AddProfile({ navigation }) {
    const [name, setName] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [login, setLogin] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [base, setBase] = React.useState("");
    const [profile, setProfile] = React.useState("");
    return (
        <View>
            <Text>Nom du profil utilisateur :</Text>
            <TextInput
                style={ styles.textInputAddProfile }
                placeholder="Nom du profil utilisateur"
                value={ name }
                onChangeText={text => setName(text) }
            />
            <Text>URL :</Text>
            <TextInput
                style={ styles.textInputAddProfile }
                placeholder="URL"
                value={ url }
                onChangeText={text => setUrl(text) }
            />
            <Text>Identifiant :</Text>
            <TextInput
                style={ styles.textInputAddProfile }
                placeholder="Identifiant"
                value={ login }
                onChangeText={text => setLogin(text) }
            />
            <Text>Mot de passe :</Text>
            <TextInput
                secureTextEntry={ true }
                style={ styles.textInputAddProfile }
                placeholder="Mot de passe"
                value={ pwd }
                onChangeText={text => setPwd(text) }
            />
            <Text>Base :</Text>
            <TextInput
                style={ styles.textInputAddProfile }
                placeholder="Base"
                value={ base }
                onChangeText={text => setBase(text) }
            />
            <Text>Profil d'import :</Text>
            <TextInput
                style={ styles.textInputAddProfile }
                placeholder="Profil d'import"
                value={ profile }
                onChangeText={text => setProfile(text) }
            />
            <Text>{'\n'}</Text>
            <TouchableOpacity
                onPress={() => 
                    _addProfile({ name: name, login: login, url: url, pwd: pwd, base: base, avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }).then(() => {
                        navigation.navigate('Profile');
                    })
                }
                style={ styles.addProfileButton }
            >
                <Text>Ajouter le profil</Text>
            </TouchableOpacity>
            <Text>{'\n'}</Text>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ styles.cancelProfileButton }
            >
                <Text>Annuler</Text>
            </TouchableOpacity>
        </View>
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
        this.state = { isLoading: true }
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({ count: 0 });
        });
        //_removeAllProfiles().then(() => {
            //_addProfile({ name: "Adrien Canino", login: "Cadrew", url: "test.com", pwd: "test", base: 1, avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }).then(() => {
                _retrieveProfiles().then(() => {
                    setRows(getProfiles());
                    this.setState({ isLoading: false });
                });
            //});
        //});
    }

    render() {
        return (this.state.isLoading ?         
            <View style={ styles.loadingContainer }>
                <ActivityIndicator size='large' />
            </View> :
            <Provider store={Store}>
                <NavigationContainer independent={ true }>
                    <AjarisStack />
                </NavigationContainer>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    newProfileButton: {
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
    },
    addProfileButton: {
        borderWidth: 1,
        borderColor: 'rgb(93, 156, 236)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(93, 156, 236)',
    },
    cancelProfileButton: {
        borderWidth: 1,
        borderColor: 'rgb(93, 156, 236)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(93, 156, 236)',
    },
    textInputAddProfile: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Profiles)