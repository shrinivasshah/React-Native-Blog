import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Context } from "../context/BlogContext";

const IndexScreen = ({ navigation: { navigate } }) => {
  const { state, deleteBlogPost } = useContext(Context);

  return (
    <View>
      <Text>Index Screen</Text>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigate("Show", { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title}-{item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation: { navigate } }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
