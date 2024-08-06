import {
  Button,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goalList, setGoalList] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setGoalList((currentGoalList) => [...currentGoalList, { text: enteredGoalText, id: Math.random().toString() }]);
    setModalIsVisible(false)
  }

  function deleteGoalHandler(id) {
    setGoalList(currentGoalList => {
      return currentGoalList.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
     <StatusBar style="light"/>
    <View style={styles.container}>
      <Button title="Add New Goal" color="#8649d5" onPress={startAddGoalHandler}/>
      {modalIsVisible && <GoalInput visible = {modalIsVisible} onAddGoal = {addGoalHandler} onCancelModal = {endAddGoalHandler}/>}
      <View style={styles.goalsContainer}>
        <FlatList
          data={goalList}
          renderItem={(itemData) => {
            return (
              <GoalItem text={itemData.item.text} id = {itemData.item.id} onDeleteItem = {deleteGoalHandler}/>
            )
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#311b6b"
  },

  goalsContainer: {
    flex: 4,
  },
});
