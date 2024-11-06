import {
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  View,
  Text,
  Button,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import List from './Components/List';
import DatePicker from 'react-native-date-picker';
import MultiSelect from 'react-native-multiple-select';
const data = [
  {id: 1, label: 'To Do', value: 'To Do'},
  {id: 2, label: 'In Progress', value: 'In Progress'},
  {id: 3, label: 'Done', value: 'Done'},
];
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>();
  const [toDate, setToDate] = useState<Date | null>();
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [select_status, setSelect_Status] = useState<any[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const reset_filter = () => {
    setFromDate(null);
    setToDate(null);
    setSelect_Status([]);
  };
  const apply_Filters = () => {
    setModalVisible(false);
  };
  console.log('Selected Status:', select_status);

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <TextInput
          placeholder="Search for the content"
          style={styles.search_container}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Pressable style={styles.filter} onPress={() => setModalVisible(true)}>
          <Image
            source={require('./assets/filter.png')}
            style={{width: 20, height: 20}}
          />
          <Text style={styles.icons}>Filter</Text>
        </Pressable>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.drawerContainer}>
          <View style={styles.formcontainer}>
            <View style={styles.cancel}>
              <Text style={styles.drawerHeader}>Filters</Text>
              <Pressable
                style={styles.filter}
                onPress={() => setModalVisible(false)}>
                <Image
                  source={require('./assets/remove.png')}
                  style={{width: 20, height: 20}}
                />
              </Pressable>
            </View>

            <View style={styles.filters_container}>
              <Text style={styles.heading}>Due Tasks:-</Text>
              <View style={styles.date_container}>
                <Text style={styles.heading}>From:-</Text>
                <DatePicker
                  modal
                  open={open}
                  date={fromDate ? fromDate : new Date()}
                  mode="date"
                  onConfirm={date => {
                    setOpen(false);
                    setFromDate(date);
                  }}
                  onCancel={() => setOpen(false)}
                />
                <Text onPress={() => setOpen(true)} style={styles.input}>
                  {fromDate?.toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.date_container}>
                <Text style={styles.heading}>To:-</Text>
                <DatePicker
                  modal
                  open={open}
                  date={toDate ? toDate : new Date()}
                  mode="date"
                  onConfirm={date => {
                    setOpen(false);
                    setToDate(date);
                  }}
                  onCancel={() => setOpen(false)}
                />
                <Text onPress={() => setOpen(true)} style={styles.input}>
                  {toDate?.toLocaleDateString()}
                </Text>
              </View>
              <View>
                <Text style={styles.heading}>Task Status:-</Text>
                <MultiSelect
                  items={data}
                  uniqueKey="value"
                  selectedItems={select_status}
                  onSelectedItemsChange={setSelect_Status} 
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
                  tagRemoveIconColor="#007AFF"
                  tagBorderColor="007AFF"
                  tagTextColor="#007AFF"
                  selectedItemTextColor="#007AFF"
                  selectedItemIconColor="#007AFF"
                  itemTextColor="#000"
                  displayKey="label"
                  searchInputStyle={{color: '#007AFF'}}
                  submitButtonColor="#CaC"
                  submitButtonText="Submit"
                />
              </View>
              <View style={styles.filter_button}>
                <Button
                  title="Reset"
                  color={'#cac'}
                  onPress={() => reset_filter()}
                />
                <Button
                  title="Done"
                  color={'#007AFF'}
                  onPress={() => apply_Filters()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <List
        filter={filter}
        fromDate={fromDate}
        toDate={toDate}
        statusFilter={select_status}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  form_container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search_container: {
    width: '75%',
    height: 45,
    padding: 10,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: '#f1f1f1',
    fontSize: 17,
    backgroundColor: '#ffffff',
    elevation: 20,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  icons: {
    fontSize: 18,
  },
  drawerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    elevation: 20,
  },
  formcontainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    elevation: 60,
  },
  drawerHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  drawerMessage: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    width: '50%',
    height: 45,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 20,
    borderColor: 'lightblue',
    fontSize: 16,
    marginBottom: 10,
  },
  heading: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '700',
  },
  filters_container: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 20,
    elevation: 10,
  },
  date_container: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filter_button: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
