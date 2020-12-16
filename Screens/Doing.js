
import *  as React  from 'react';
import {useState, useEffect} from 'react';
import* as SQLite from'expo-sqlite';
import {Icon, ListItem} from 'react-native-elements';
import { StyleSheet, View, FlatList} from 'react-native';

const db = SQLite.openDatabase('issue.db');

const Doing = ({ navigation }) => {       
                
    const [todoList, setTodoList] = useState([])
    
    // Mapping  doingList table data to todoList array state
    useEffect(()=> {
       
            db.transaction(tx =>{
              tx.executeSql('select * from doingLists', [], (_, {rows}) => setTodoList(rows._array));         
            })
          
          
        });
      
        // updating todolist array after each update in database
        const updateList = () => {
            db.transaction(tx =>{
              tx.executeSql('select * from doingLists', [], (_, {rows}) => setTodoList(rows._array));
              
             
            })
          }

          // deleteing a issue after user press delte button
          const deleteItem =(id) => {
            db.transaction(tx => {
              tx.executeSql('delete from doingLists where id = ?;', [id]);}, null, updateList)
              
            }
        
            // updating the todolist array and database after user change the issue stage to Done
        const updateItemList = (id) => {
          
            db.transaction(tx => {
                tx.executeSql('UPDATE  doingLists SET visible = 1 where id = ?;', [id]);
                tx.executeSql('insert  into doneLists select * from doingLists where id = ?;', [id]);}, null, updateList)
                alert('issue marked as completed')
              }   
            

    return (
        <View style={{ flex: 1 }}>
          <View style={{  flex: 1, padding: 5}}>
            <View
              style={{
                flex: 2,
                
              }}>
                   <FlatList
                    keyExtractor={item => item.id.toString()}
                    data = {todoList}
                    renderItem = {({item}) =>                                  
                    <View style={ item.visible =='1' ? { display:'none'} : {display:'flex'}}>
                    <ListItem bottomDivider >
                    <View style= {{flex: 1, flexDirection:'row', backgroundColor:'#daa520'}}>
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
});
export default Doing;