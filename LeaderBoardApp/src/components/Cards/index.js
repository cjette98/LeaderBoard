import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Cards = ({data}) => {
  const {name, rank, bananas, isCurrentUser} = data;
  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.contentWrapper}>
        <View
          style={{
            flex: 1,
          }}>
          <Text>{rank}</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            flex: 2,
          }}>
          <Text>{name}</Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: isCurrentUser === 'yes' ? 'green' : 'black',
            }}>
            Is current user: {isCurrentUser}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <Text>{bananas}</Text>
        </View>
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
