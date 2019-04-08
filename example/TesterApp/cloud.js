import React from 'react';
import {Text, View} from 'react-native';

export default class CloudApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      App: null,
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/bundle-main.js');
    const cloudJS = await response.text();
    const bundleJs = `
    ;(function bundleJS(qmrequire) {
      ${cloudJS}
    })(qmrequire);
    `;
    const cloudNative = eval(`
       ;(function(qmrequire) {
         ${bundleJs};
       });
    `);
    cloudNative(require);
    this.setState({
      App: global.__registry,
      loading: false,
    });
  }

  render() {
    const {loading, App} = this.state;
    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return <App />;
    }
  }
}
