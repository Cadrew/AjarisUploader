import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { postLogIn, getUrl, postLogOut, postProfile, postSend } from "../API/AjarisAPI";

class AddProfiles extends React.Component {
    profiles = {
        data: ''
    }
    componentDidMount = () => {
        //this.profiles.data = postLogIn("mistale", "software");
    }

  render() {
    return (
        <Text style={{ fontSize: 20, color: "black" }}>{this.profiles.data}</Text>
    )
  }
}

const styles = StyleSheet.create({})
