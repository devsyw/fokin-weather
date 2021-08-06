import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Loading from "./Loading";
import axios from "axios";
import * as Location from "expo-location";
i

const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

export default class extends React.Component {
  state = {
    isLoading: true
  }

  getWeather = async(latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
  }

  getLocation = async() => {
    try {
      const response = await Location.requestPermissionsAsync();
      console.log(response);
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();

      this.getWeather(latitude, longitude);
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
