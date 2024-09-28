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

import SwipeCard from "@/components/navigation/SwipeCard";
import Swiper from "react-native-deck-swiper";

export default function TabTwoScreen() {
  const [dataList, setDataList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const dataList = querySnapshot.docs.map((doc) => doc.data());
        setDataList(dataList);
        console.log(dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Swiper
        cards={dataList}
        renderCard={(data) => <SwipeCard data={data} />}
        stackSize={3}
        backgroundColor="#f8f8f8"
        cardVerticalMargin={10}
        cardHorizontalMargin={10}
      />
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
});
