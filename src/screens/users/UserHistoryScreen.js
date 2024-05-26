import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet ,FlatList,TouchableOpacity,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 3

class UserHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptions: [
                { id: 1, label: 'Tất cả' },
                { id: 2, label: 'Đã thanh toán' },
                { id: 3, label: 'Đã hủy' }
            ],
            selectedFilter: null
        };
    }
    renderFilterItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.filterItem,
                    this.state.selectedFilter === item.id && styles.selectedFilterItem
                ]}
                onPress={() => this.setState({ selectedFilter: item.id })}
            >
                <Text style={styles.filterText}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        placeholderTextColor="gray"
                    />
                </View>
                <FlatList
                    data={this.state.filterOptions}
                    renderItem={this.renderFilterItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#fff",
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: 'black',
    },
    filterContainer: {
        backgroundColor: "#fff",
        width: '100%',
        height: 30,
        justifyContent: 'space-between',
    },
    filterItem: {
        width: itemWidth,
        height: 'auto',
        alignItems: 'center',
    },
    selectedFilterItem: {
        backgroundColor: 'gray',
    },
    filterText: {
        color: 'black',
    },
});

export default UserHistoryScreen;
