
import * as React from 'react';
import {useState, useEffect} from 'react';
import {  TouchableOpacity,  StyleSheet,  View,  FlatList} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import* as SQLite from'expo-sqlite';
const db = SQLite.openDatabase('issue.db');
const Done = ({ navigation }) => {
              
    const [todoList, setTodoList] = useState([])

    useEffect(()=> {
       
            db.transaction(tx =>{
              tx.executeSql('select * from doneLists', [], (_, {rows}) => setTodoList(rows._array));    
                 
            })
          
          
        });

        const updateList = () => {
            db.transaction(tx =>{
              tx.executeSql('select * from doneLists', [], (_, {rows}) => setTodoList(rows._array));
              
             
            })
          }
          const deleteItem =(id) => {
            db.transaction(tx => {
              tx.executeSql('delete from doneLists where id = ?;', [id]);}, null, updateList)
              
            }

            const updateItemList = (id) => {
                db.transaction(tx => {
                    tx.executeSql('UPDATE  doingLists SET visible = 2 where id = ?;', [id]);
                    tx.executeSql('delete  from doneLists  where id = ?;', [id]);}, null, updateList)
                    alert('moved to doing stage')
                    };   
        
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
                                  <View style={ item.visible =='3' ? { display:'none'} : {display:'flex'}}>
                                  <ListItem bottomDivider >
                                  <View style= {{flex: 1, flexDirection:'row', backgroundColor:'#20b2aa'}}>
                                  <ListItem.Content style= {{padding: 10}} >
                                      <ListItem.Title style={{textDecorationLine:'line-through', color:'#800080', textDecorationStyle:'double', fontStyle:'italic'}}>{item.todos}</ListItem.Title>
                                      <ListItem.Subtitle>{item.priority}</ListItem.Subtitle>
                                  </ListItem.Content>
                                  <Icon raised  name='delete'  type='material'  color='#eb3434' onPress = {() => deleteItem(item.id)} />
                                  <Icon raised  name='undo'  type='font-awesome'   color='#006400' onPress = {() => updateItemList(item.id)} />
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



export default Done;