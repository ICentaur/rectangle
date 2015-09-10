'use strict';

var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var pickerOpt = {
  title: 'Select Image',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo of card...',
  takePhotoButtonHidden: false,
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  chooseFromLibraryButtonHidden: false,
  returnBase64Image: true,
  returnIsVertical: false,
  quality: 0.2
};

var ImportCard = React.createClass({
  getInitialState: function() {
    return {
      cardSource: '',
    };
  },
  render: function(){
    var spacer=<View style={styles.spacer}/>;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.containerBox}>
            <View style={styles.header}>
              <Text style={styles.titleText}>Update your business card</Text>
            </View>
            <Image source={this.state.cardSource} style={styles.card_photo}/>
            {spacer}
            <View style={styles.footer}>
              <TouchableHighlight  
                style={styles.button}
                underlayColor={'orange'}
                onPress={(event) => 
                  this._uploadImg()}>
                <Text 
                style={styles.buttonText}>Upload a card</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  },
  _uploadImg: function(){
    UIImagePickerManager.showImagePicker(pickerOpt, (type, response) => {
      if (type !== 'cancel') {
        var source;
        if (type === 'data') { // New photo taken OR passed returnBase64Image true -  response is the 64 bit encoded image data string
          source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
        } else { // Selected from library - response is the URI to the local file asset
          source = {uri: response};
        }

        this.setState({cardSource:source});
      } else {
        console.log('Cancel');
      }
    });
  }
});

var styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#ffffff',
    borderColor: '#1abc9c',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#1abc9c',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  containerBox: {
    flex: 1,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#1abc9c',
    margin: 0,
    marginVertical: 0,
    overflow: 'hidden',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 64,
  },
  header: {
    backgroundColor: '#1abc9c',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 24,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  spacer: {
    flex: 4,
    backgroundColor: '#1abc9c'
  },
  card_photo: {
    width: 200,
    height: 200,
    alignSelf: 'center',    
  },
});

module.exports = ImportCard;


