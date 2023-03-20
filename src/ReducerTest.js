import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useReducer, useState } from 'react';
import Button from './components/Button';

const init = 0;

const ReducerTest = () => {
  const [result, setResult] = useState(0);
  // const [state, dispatch] = useReducer(reducer, init);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result}</Text>

      <Button title={'+'} onPress={() => setResult((prev) => prev + 1)} />
      <Button title={'-'} onPress={() => setResult((prev) => prev - 1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default ReducerTest;
