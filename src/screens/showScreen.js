import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Context } from "../context/BlogContext";

const ShowScreen = ({ navigation: { getParam } }) => {
  const { state } = useContext(Context);

  const blogPost = state.find((blogPost) => blogPost.id === getParam("id"));

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation: { navigate, getParam } }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigate("Edit", { id: getParam("id") })}
      >
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
