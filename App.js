import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Loading from "./Loading";
import * as Location from "expo-location";

export default class extends React.Component {
  state = {
    isLoading: true
  }

  getLocation = async() => {
    try {
      const respose = await Location.requestPermissionsAsync();
      console.log(respose);
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.setState({isLoading: false});

      console.log(latitude, longitude);

    } catch(error) {
      Alert.alert("당신을 찾을수 없습니다!", "ㅠㅠ");
    }

  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;

    return (
      isLoading ? <Loading/> : null
    );
  }
}
