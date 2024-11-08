import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../src/state/todo/index';
import { addTodo, removeTodo } from '../../state/todo/slice';

export default function TodoApp() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (name) {
      dispatch(addTodo({ id: Date.now(), name, description: description || '' }));
      setName('');
      setDescription('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.firstInputCart}>
          <View>
            <Text>
              Name:
            </Text>
          </View>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.firstInputCart}>
          <View>
            <Text>
              Descp:
            </Text>
          </View>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <TouchableOpacity onPress={handleAddTodo} style={styles.btn} >
          <Text style={{ color: '#fff' }}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.circle}></View>
            <View>
              <Text style={styles.todoTitle}>{item.name}</Text>
              <Text style={styles.todoDescp}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveTodo(item.id)} style={{ backgroundColor: 'red' }}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    marginTop: 50,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 3,
    marginLeft: 5,
    width: '55%',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    paddingHorizontal: 20
  },
  todoTitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 18,
  },
  todoDescp: {
    fontWeight: '100',
    fontSize: 10
  },
  deleteButton: {
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  section: {
    // flexDirection: 'column'
  },
  firstInputCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: '100%',
    justifyContent: 'flex-start',
    // paddingRight:100,
  },
  secondInputCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginRight: 100
  },
  btn: {
    borderWidth: 1,
    width: 70,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 13,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 20,
    backgroundColor: 'blue',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: 'green',
    zIndex: 1,
    position: 'absolute',
    top: 10,
    left: 5,
  }
});