import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { BLACK, GRAY, PRIMARY } from '../colors';
import { MainRoutes } from '../navigations/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import HeaderRight from '../components/HeaderRight';
import { getLocalUri } from '../components/ImagePicker';
import Swiper from 'react-native-swiper';
import { BlurView } from 'expo-blur';

const SelectPhotosScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const width = useWindowDimensions().width;

  const [photos, setPhotos] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(isLoading || !photos.length);
  }, [isLoading, photos.length]);

  useEffect(() => {
    if (params) {
      setPhotos(params.selectPhotos ?? []);
    }
  }, [params]);

  const onConfirm = useCallback(async () => {
    if (!disabled) {
      setIsLoading(true);
      try {
        const localUris = await Promise.all(
          photos.map((photo) =>
            Platform.select({
              ios: getLocalUri(photo.id),
              android: photo.uri,
            })
          )
        );
      } catch (e) {
        Alert.alert('Failed to fetch image information', e.message);
      }
      setIsLoading(false);
    }
  }, [disabled, photos]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight disabled={disabled} onPress={onConfirm} />
      ),
    });
  }, [disabled, navigation, onConfirm]);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        You can select up to a maximum of 4 images.
      </Text>

      <View style={{ width, height: width }}>
        (photos.length ? (
        <Swiper
          loop={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}
        >
          {photos.map(({ uri }, idx) => (
            <View key={idx} style={styles.photo}>
              <Image
                source={{ uri }}
                resizeMode={'cover'}
                style={StyleSheet.absoluteFillObject}
              />
              <BlurView intensity={Platform.select({ ios: 10, android: 90 })}>
                <Image
                  source={{ uri }}
                  resizeMode={'contain'}
                  style={styles.photo}
                />
              </BlurView>
            </View>
          ))}
        </Swiper>
        ) : (
        <Pressable
          onPress={() =>
            navigation.navigate(MainRoutes.IMAGE_PICKER, { maxCount: 4 })
          }
          style={styles.photoButton}
        >
          <MaterialCommunityIcons
            name="image-plus"
            size={80}
            color={GRAY.DEFAULT}
          />
        </Pressable>
        ))
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: GRAY.DARK,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  photoButton: {
    backgroundColor: GRAY.LIGHT,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  dot: {
    backgroundColor: BLACK,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: PRIMARY.DEFAULT,
  },
});

export default SelectPhotosScreen;
