import React, {Component} from 'react';
import {Text} from 'react-native';
import Navigation from "./Navigation/Navigation";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";

import RNFileShareIntent from "react-native-file-share-intent";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: null
    };
  }

  componentDidMount() {
    if (RNFileShareIntent) {
      RNFileShareIntent.getFilepath(url => {
        this.setState({ fileUrl: url });
      });
    }
  }
  render() {
    var uri = this.state.fileUrl;
    return (
      <Provider store={Store}>
        <Text style={{ fontSize: 20, color: "black" }}>Shared Url: {uri}</Text>
        <Navigation />
      </Provider>
    );
  }
}
