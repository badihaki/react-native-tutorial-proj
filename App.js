import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TextInput, Button } from 'react-native';

export default function App() {
  const [todoList, setTodoList] = useState([
    {
      id:0,
      subject:'To-Do List',
      content:'Finish the list'
    }
  ])
  const [subject, changeSubject] = useState('');
  const [content, changeContent] = useState('');
  const [formErrer, setError] = useState('');

  function mapItems({item}){
    function removeTask(){
      console.log(item.id);
    }

    return (
      <View style={sectionStyles.task}>
        <Text style={textStyles.taskText}>{item.subject} : {item.content}</Text>
        { /* <Button title='Remove Task' style={sectionStyles.deleteButton} onPress={removeTask} /> */ }
        <Text onPress={removeTask} style={sectionStyles.deleteButton}>Remove Task</Text>
      </View>
    )
  }

  function submitNewTodo(){
    //
    if(subject == '' || content == ''){
      console.log('cant be empty');
      setError(`Subject and content must be filled`);
      setTimeout(() => setError(''), 3000);
    }
    else{
      console.log(`${subject} : ${content}`);
      console.log(todoList.length);
      const newItem = {
        id:todoList.length+1,
        subject:subject,
        content:content,
      };
      console.log(newItem);
      setTodoList([...todoList, newItem])
    }
    resetForm();
  }

  function resetForm(){
    changeContent('');
    changeSubject('');
  }

  return (
    <View style={sectionStyles.container}>
      <View style={sectionStyles.header}>
      {/* Header */}
        <Text style={textStyles.headerText}>Todo</Text>
      </View>
      <View style={sectionStyles.content}>
        {/* Content */}
        <View style={sectionStyles.form}>
          {/* Form */}
          <Text style={textStyles.formText}>Subject</Text>
          <TextInput onChangeText={changeSubject} value={subject} style={inputStyles.textInput} />
          <Text style={textStyles.formText}>Content</Text>
          <TextInput onChangeText={changeContent} value={content} style={inputStyles.textInput} />
          <Button title='Create New Task' onPress={submitNewTodo} />
          <Text>{formErrer}</Text>
        </View>
        <FlatList data={todoList} renderItem={mapItems} style={sectionStyles.list} keyExtractor={(item)=>item.id} />
      </View>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    display:'flex',
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    backgroundColor: '#DFF5F7',
    borderStyle:'solid',
    borderRadius:50,
    borderColor: '#560C66'
  },
  content:{
    alignContent:'center',
    padding: 10
  },
  form:{
    backgroundColor: '#A8BAF0',
    marginBottom: 25
  },
  list:{
    backgroundColor: '#F0A8BC',
  },
  task:{
    alignSelf:'center',
    margin:25,
    backgroundColor: '#A8BAF0',
    borderStyle:'dotted',
    borderColor:'#A8BAF0',
    borderRadius:50,
    borderWidth:25,
  },
  deleteButton:{
    borderRadius:5,
    borderWidth:3,
    borderStyle:'solid',
    borderColor:'#374AEC',
    color:'#F0A8BC',
    backgroundColor:'#374AEC',
    fontWeight:'bold',
    fontSize:11,
    margin:3,
    marginLeft:75,
    alignContent:'center',
    alignSelf:'center',
    alignItems:'center',
  }
});

const textStyles = StyleSheet.create({
  headerText:{
    fontSize: 22,
    color: '#350047'
  },
  formText:{
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  taskText:{
    fontSize:15,
    color: '#B20031'
  },
});

const inputStyles = StyleSheet.create({
  textInput:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})