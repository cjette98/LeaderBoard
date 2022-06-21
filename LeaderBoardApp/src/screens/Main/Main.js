import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Cards} from '../../components';
import {array, TopUsers, FilterUserInput} from '../../services/users';

const Main = () => {
  const [usersWithHighestBanana, setusersWithHighestBanana] =
    useState(TopUsers);
  const [search, setSearch] = useState('');
  const [dropDown, setDropDown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = array.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.includes(textData);
      });
      setFilteredData(newData);
      setSearch(text);
      setDropDown(true);
    } else {
      setusersWithHighestBanana(TopUsers);
      setSearch(text);
      setDropDown(false);
    }
  };

  const handleOnpress = text => {
    setSearch(text);
    setDropDown(false);

    try {
      const data = FilterUserInput(text);
      console.log(data);
      setusersWithHighestBanana(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <View style={{padding: 10}}>
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 5,
              height: 42,
            }}
            value={search}
            placeholder={`Search user by name:`}
            onChangeText={text => searchFilterFunction(text)}
          />
        </View>
        {dropDown && (
          <View style={styles.dropDownContainer}>
            {filteredData.length > 0 ? (
              filteredData.splice(0, 10).map((item, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOnpress(item.name)}
                    key={i}
                    style={{
                      marginVertical: 2,
                    }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text>
                Current user does not exist! Please specify an existing user!
              </Text>
            )}
          </View>
        )}
      </View>
      <ScrollView style={styles.containerWrapper}>
        {usersWithHighestBanana?.map((item, i) => {
          return <Cards data={item} key={i} />;
        })}
      </ScrollView>
    </React.Fragment>
  );
};

export default Main;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    padding: 10,
    zIndex: 10,
  },
  dropDownContainer: {
    shadowColor: 'black',
    padding: 5,
    borderWidth: 1,
  },
});
