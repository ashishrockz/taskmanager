import { TextInput, Modal, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import useTasks from '../coustom_hooks/TaskManagementHooks';
import { useNavigation } from '@react-navigation/native';

const data = [
  { label: 'To Do', value: 'To Do' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Done', value: 'Done' },
];

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}

const Edit = ({ task }: { task: Task }) => {
  const { editTask, deleteTask } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const handleDeleteTask = () => {
    deleteTask(task.id);
    Alert.alert('The task was successfully deleted')
    setModalVisible(false);
    console.log('deleted')
    navigation.goBack();
  };

  const handleUpdateTask = () => {
    const updatedTask: Task = {
      id: task.id, // Include the id of the original task
      title,
      description,
      status,
      dueDate, // Convert Date to ISO string if necessary
    };
    editTask(task.id, updatedTask);
    console.log('updated')
    Alert.alert('The task was successfully updated')
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.buttonEdit]} onPress={() => setModalVisible(true)}>
          <Text style={styles.innerText}>Edit Task</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonDelete]} onPress={handleDeleteTask}>
          <Text style={styles.innerText}>Delete</Text>
        </Pressable>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.titleHeading}>Edit Task</Text>
            <View>
              <Text style={styles.heading}>Title</Text>
              <TextInput
                placeholder="Title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View>
              <Text style={styles.heading}>Description</Text>
              <TextInput
                placeholder="Description"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View>
              <Text style={styles.heading}>Status</Text>
              <Dropdown
                data={data}
                style={styles.input}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={status}
                onChange={item => setStatus(item.value)}
              />
            </View>
            <View>
              <Text style={styles.heading}>Due Date</Text>
              <DatePicker
                modal
                open={open}
                date={dueDate}
                mode="date"
                onConfirm={(date) => {
                  setOpen(false);
                  setDueDate(date);
                }}
                onCancel={() => setOpen(false)}
              />
              <Text onPress={() => setOpen(true)} style={styles.input}>{dueDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.buttonSub]} onPress={handleUpdateTask}>
                <Text style={styles.innerText}>Submit</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonDelete]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.innerText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonEdit: {
    backgroundColor: "green",
  },
  buttonSub: {
    backgroundColor: "#4169e1",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  innerText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  formContainer: {
    width: '100%',
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    elevation: 60,
  },
  input: {
    width: '100%',
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
    fontSize: 18,
    fontWeight: '700',
  },
  titleHeading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: '700',
  },
});
