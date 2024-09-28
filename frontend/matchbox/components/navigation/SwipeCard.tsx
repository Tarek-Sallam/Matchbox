import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface SwipeCardProps {
  data: any;
}

export default function SwipeCard({ data }: SwipeCardProps) {
  if (!data) {
    return null;
  }
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  useEffect(() => {
    // fetch request to get users data
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const dataList = querySnapshot.docs.map((doc) => doc.data());

        // test case for now to render in first user's name
        if (dataList.length > 0) {
          const firstInstance = dataList[0];
          setFirstName(firstInstance.fname);
          setLastName(firstInstance.lname);
        }

        console.log(dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.swipeCard}>
        <ImageBackground
          source={{ uri: "https://placehold.co/600x400" }}
          resizeMode="cover"
          style={styles.overlay}
        >
          <View style={styles.content}>
            <Text style={styles.title}>
              {data.fname} {data.lname} - 3rd Year
            </Text>
            <Text style={styles.subtitle}>School</Text>
          </View>
          <View style={styles.skills}>
            <View style={styles.skill}>
              <Text>skill 1</Text>
            </View>
            <View style={styles.skill}>
              <Text>skill 2</Text>
            </View>
            <View style={styles.skill}>
              <Text>skill 3</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeCard: {
    display: "flex",
    width: "90%",
    height: "80%",
    backgroundColor: "#d9d9d9",
    margin: "auto",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textDecorationStyle: "solid",
  },
  skills: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 5,
  },
  skill: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  content: {},
});