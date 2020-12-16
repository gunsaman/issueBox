
import * as React from 'react';
import {useState, useEffect, useContext} from 'react';

import { StyleSheet,  View,  Text, Modal,   FlatList} from 'react-native';
import {Icon, ListItem, Input, Button} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import* as SQLite from'expo-sqlite';



const db = SQLite.openDatabase('issue.db');

const Todo = ({ navigation }) => {
    
    const [todos, setTodos] = useState('');
    const [priority, setPriority] = useState('');
    const [visible, setVisible] = useState('1');
    const [todoList, setTodoList] = useState([]);
    const [totalIssues,setTotalIssues] = useState(0);
    
    
    const [modalVisible, setModalVisible] = useState(false);

      // creating tables in database when application starts
    useEffect(()=> {
        db.transaction(tx => {
          tx.executeSql('create table if not exists issueLists (id integer primary key not null, todos text, priority text, visible text)');
          tx.executeSql('create table if not exists doingLists (id integer primary key not null, todos text, priority text, visible text)');
          tx.executeSql('create table if not exists doneLists (id integer primary key not null, todos text, priority text, visible text)');},
          null, 
          updateList);
          
        },[]);
      
        // saving issue list entered by the user in the database
        const saveItem = () => {
          
          db.transaction(tx => {
              tx.executeSql('insert into issueLists (todos, priority, visible) values (?, ?, ?);', [todos, priority, visible]);    
            }, null, updateList)
          setTotalIssues((prevCount)=> prevCount+1);
          setTodos('');
          
        }
        // updating the array state of shopList by fetching the data from database
        const updateList = () => {
          
          db.transaction(tx =>{
            tx.executeSql('select * from issueLists', [], (_, {rows}) => setTodoList(rows._array));
            
           
          })
        }
        //deleting an item from databse when user press delte button
        const deleteItem =(id) => {
          db.transaction(tx => {
            tx.executeSql('delete from issueLists where id = ?;', [id]);}, null, updateList)
            setTotalIssues((prevCount)=> prevCount-1);
          }
          
          
        // updating database table visible attribute
             // updating the todolist array and database after user change the issue stage to Done
             const updateItemList = (id) => {
          
              db.transaction(tx => {
                  tx.executeSql('UPDATE  issueLists SET visible = 2 where id = ?;', [id]);
                  tx.executeSql('insert  into doingLists select * from issueLists where id = ?;', [id]);}, null, updateList)
                  alert('issue moved to doing stage')
                }                      

      // function to save a new issue and close the modal dialogue window)
       const saveTodoList = () => {
          setModalVisible(false);
          saveItem();
       }
       
       const showInputModal = () => {
        setModalVisible(true);
    }
    
    
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1}}>
        <View
          style={{
            flex: 12,
            
          }}>
               <FlatList
                    keyExtractor={item => item.id.toString()}
                    data = {todoList}
                    renderItem = {({item}) =>                                  
                    <View style={ item.visible =='2' ? { display:'none'} : {display:'flex'}}>
                      <ListItem bottomDivider >
                        <View style= {{flex: 1, flexDirection:'row', backgroundColor:'#ff4500'}}>
                      <ListItem.Content style= {{padding: 10}} >
                          <ListItem.Title>{item.todos}</ListItem.Title>
                          <ListItem.Subtitle>{item.priority}</ListItem.Subtitle>
                      </ListItem.Content>
                        <Icon raised  name='delete'  type='material'  color='#eb3434' onPress = {() => deleteItem(item.id)} />
                        <Icon raised  name='check-circle'  type='font-awesome'   color='#006400' onPress = {() => updateItemList(item.id)} />
                      </View>
                      </ListItem>
                    
                    </View>
                    }
                    
                    
                    />
          
         
        </View>
       
       
        <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                     <Input placeholder= "text here........................"
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        label="New Issue"
                        labelStyle={{color:'blue', textAlign:'center'}}
                        style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setTodos(text)}
                        value={todos}                    
                    />       
                      <View style={{flexDirection:'row'}}>            
                        <Button style={styles.button} icon icon={{name:'save'}} title="SAVE" onPress= {saveTodoList}/>
                            <View style={styles.space} />
                        <Button style={styles.button} iconRight icon={{name:'cancel'}} title="BACK" onPress= {()=> setModalVisible(false)}/>
                      </View> 
                    </View>
                </View>
             </Modal>
            
            </View>
            <View style={{backgroundColor:'#ffe4e1', width:60, marginLeft:20}}>
            <Icon            
                    name='alarm'
                    size = {20}
                    type='material'
                    color='#006400'
                    
                 />
              <Text style={styles.issueText}>{totalIssues} Issues</Text>
            </View>
                <View style={{flexDirection:'column-reverse', flex:1}}>
                  <Text style={{color:"#008b8b", textAlign:'center'}}>Add an issue</Text>
                  <Icon            
                    name='add'
                    size = {80}
                    type='material'
                    color='#006400'
                    onPress={showInputModal}
                 />
              </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    button: {
      marginBottom: 20,
      padding: 30
    },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
    issueText: {
      color:'red'
    }
  
});
export default Todo;