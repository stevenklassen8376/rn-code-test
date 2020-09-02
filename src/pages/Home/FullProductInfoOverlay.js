import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import InfoBar from '../../components/Product/InfoBar';

export default class FullProductInfoOverlay extends Component {
  state = {
    product: null,
  };

  onOrientationChanged = () => this.forceUpdate();

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.onOrientationChanged);
  }

  render() {
    const dimensions = Dimensions.get('window');
    const isLandscape = dimensions.width > dimensions.height;

    const style = {
      zIndex: 200,
      position: 'absolute',
      top: isLandscape ? 0 : 40,
      left: isLandscape ? 40 : 0,
      width: '100%',
      height: isLandscape ? dimensions.height - 100 : dimensions.height - 160,
      backgroundColor: 'white',
      display: this.state.product == null ? 'none' : 'flex',
    };

    return (
      <SafeAreaView style={style}>
        <Button onPress={() => this.dismiss()} title={'< Back'} />
        <View style={{ height: 'auto', maxHeight: dimensions.height }}>
          <ScrollView>{this.getProductDisplay()}</ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  getProductDisplay() {
    if (this.state.product != null) {
      const product = this.state.product;
      return (
        <View style={styles.container}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <InfoBar product={product} displaySizeHint={'full'} />
        </View>
      );
    }
    return null;
  }

  showWithProduct(product) {
    this.state.product = product;
    this.forceUpdate();
  }

  dismiss() {
    this.state.product = null;
    this.forceUpdate();
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
  },
});
