import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WHITE } from '../colors';
import { ContentRoutes } from '../navigations/routes';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const height = useWindowDimensions().height / 4;

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.topContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.icon} />
        <Text style={styles.title}>Travel Diary</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate(ContentRoutes.LIST)}>
          <Image
            source={require('../../assets/home-clock.png')}
            style={[styles.image, { height }]}
          />
          <Text style={styles.buttonTitle}>Timeline</Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate(ContentRoutes.MAP)}>
          <Image
            source={require('../../assets/home-map.png')}
            style={[styles.image, { height }]}
          />
          <Text style={styles.buttonTitle}>Map</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },
  title: {
    fontSize: 33,
    fontWeight: '700',
    marginLeft: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  image: {
    borderRadius: 10,
    width: '100%',
  },
  buttonTitle: {
    position: 'absolute',
    color: WHITE,
    fontSize: 40,
    fontWeight: '700',
    bottom: 30,
    left: 30,
  },
});

export default HomeScreen;
