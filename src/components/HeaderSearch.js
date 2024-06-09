import { CloseSquare, SearchNormal1 } from 'iconsax-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 3;

export default HeaderSearch = ({
    filters,
    setFilters,
    selectedFilter,
    setSelectedFilter,
    searchText,
    setSearchText,
}) => {
    const renderFilterItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.filterItem]} onPress={() => setSelectedFilter(item.id)}>
                <Text style={styles.filterText}>{item.label}</Text>
                {selectedFilter === item.id && <View style={styles.selectedFilterItem} />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchNormal1 name="search" size={20} color="#C8C8C8" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập gì đó ..."
                    placeholderTextColor="gray"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                        <CloseSquare name="close" size={20} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={filters}
                renderItem={renderFilterItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#FCFCFC',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 10,
        height: 40,
        margin: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        paddingVertical: 0,
    },
    filterContainer: {
        backgroundColor: '#FCFCFC',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterItem: {
        width: itemWidth,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedFilterItem: {
        width: 40,
        height: 2,
        backgroundColor: 'black',
        alignItems: 'stretch',
    },
    filterText: {
        color: 'black',
        padding: 5,
    },
    clearButton: {
        marginLeft: 10,
    },
});
