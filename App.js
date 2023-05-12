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
    return (
      <Text>{item.subject} : {item.content}</Text>
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
          <Text style={textStyles.formTags}>Subject</Text>
          <TextInput onChangeText={changeSubject} value={subject} style={inputStyles.textInput} />
          <Text style={textStyles.formTags}>Content</Text>
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
  }
});

const textStyles = StyleSheet.create({
  headerText:{
    fontSize: 22,
    color: '#350047'
  },
  formTags:{
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf:'center'
  }
});

const inputStyles = StyleSheet.create({
  textInput:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})