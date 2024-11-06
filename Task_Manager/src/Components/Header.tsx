import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

  const Header =() => {
    const navigation = useNavigation<HeaderNavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TaskManager</Text>
      <Button title='AddTask' onPress={() => navigation.navigate('AddTask')}/>
    </View>
  )

}

export default Header

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingRight:30,
        padding:10,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        
    },
    heading:{
        fontSize:18,
        fontWeight:600,
    },
  
})