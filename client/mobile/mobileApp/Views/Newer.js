var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Menu = require('./SideBar');

var {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var styles = StyleSheet.create({
  
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Button extends Component {
  handlePress(e) {
    this.props.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}>
        <Text style={this.props.style}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

class Simple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touchToClose: false,
    };
  }

  handleOpenWithTouchToClose() {
    this.setState({
      touchToClose: true,
    });
  }

  handleChange(isOpen) {
    if (!isOpen) {
      this.setState({
        touchToClose: false,
      });
    }
  }

  render() {
    return (
      <SideMenu
        menu={<Menu />}
        menuPosition='right'
        touchToClose={this.state.touchToClose}
        onChange={this.handleChange.bind(this)}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+Control+Z for dev menu
          </Text>
        </View>
      </SideMenu>
    );
  }
}

module.exports = Simple;