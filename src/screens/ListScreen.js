import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getPosts } from '../api/post';
import PostItem from '../components/PostItem';

const post = {
  createdTs: 1679653300105,
  id: 'aswOo96W8A4DtDv9XXn8',
  location: 'Toronto, ON, Canada',
  photos: [
    'file:///Users/junseongkim/Library/Developer/CoreSimulator/Devices/2E7D07A5-D719-40DD-8E4E-943353D76B68/data/Media/DCIM/100APPLE/IMG_0114.JPEG',
    'file:///Users/junseongkim/Library/Developer/CoreSimulator/Devices/2E7D07A5-D719-40DD-8E4E-943353D76B68/data/Media/DCIM/100APPLE/IMG_0105.JPEG',
  ],
  text: '11',
  user: {
    displayName: null,
    photoURL: null,
    uid: '4EkLe7ul0TNCAOhKfaFHOZHd3XM2',
  },
};

const ListScreen = () => {
  useEffect(() => {
    (async () => {
      const list = await getPosts();
      console.log(list, list.length);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <PostItem post={post} />
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

export default ListScreen;
