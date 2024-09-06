import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";


const TodoListScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [alert, setAlert] = useState({ title: "", message: "", visible: false });



  const showAlert = (title, message) => {
    setAlert({
      title,
      message,
      visible: true,
    });

    // Masquer l'alerte après quelques secondes (ajustez le délai selon vos préférences)
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 3000);
  };

  const renderAlert = () => {
    if (!alert.visible) {
      return null;
    }

    return (
      <View style={styles.alertContainer}>
        <Text style={styles.alertTitle}>{alert.title}</Text>
        <Text style={styles.alertMessage}>{alert.message}</Text>
      </View>
    );
  };

  const AddTodo = () => {
    if (todo === "") {
      return;
    }

    setTodoList([...todoList, { id: Date.now().toString(), title: todo, completed: false }]);
    showAlert('Nouvelle Tâche', `La tâche "${todo}" a été ajoutée.`);
    setTodo("");
  };

  const DeleteTodo = (id) => {
    const deletedTodo = todoList.find((todo) => todo.id === id);
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    showAlert('Tâche Supprimée', `La tâche "${deletedTodo.title}" a été supprimée.`);
    setTodoList(updatedTodoList);
  };

  const EditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  const UpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        showAlert('Tâche Modifiée', `La tâche "${item.title}" a été modifiée.`);
        return { ...item, title: todo };
      }

      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  const ToggleTodo = (id) => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === id) {
        if (!item.completed) {
          showAlert('Tâche Terminée', `La tâche "${item.title}" est maintenant terminée.`);
        }
        return { ...item, completed: !item.completed };
      }

      return item;
    });
    setTodoList(updatedTodos);
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: item.completed ? "#888" : "#000",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}
      >
        <Text style={{ color: item.completed ? "#555" : "#ADFF2F", fontSize: 20, fontWeight: "800", flex: 1 }}>
          {item.title}
        </Text>

        <IconButton
          icon="pencil"
          iconColor="#ADFF2F"
          onPress={() => EditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#ADFF2F"
          onPress={() => DeleteTodo(item.id)}
        />
        {!item.completed && (
          <IconButton
            icon="check"
            iconColor="#ADFF2F"
            onPress={() => ToggleTodo(item.id)}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
          }}
          onPress={() => UpdateTodo()}
        >
          <Text style={{ color: "#ADFF2F", fontWeight: "bold", fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
          }}
          onPress={() => AddTodo()}
        >
          <Text style={{ color: "#ADFF2F", fontWeight: "bold", fontSize: 20 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      {renderAlert()}

      <FlatList data={todoList} renderItem={renderTodos} />
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  alertTitle: {
    color: '#ADFF2F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertMessage: {
    color: '#ADFF2F',
    fontSize: 16,
    marginTop: 8,
  },
});

export default TodoListScreen;
