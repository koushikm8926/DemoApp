import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import {fetchProducts, resetData, setRefreshing} from '../store/dataSlice';
import {setQuery, searchProducts, clearSearch} from '../store/searchSlice';
import {COLORS, SPACING, RADIUS, SHADOW} from '../utils/theme';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {items, isLoading, isRefreshing, total, skip, error} = useSelector((state: RootState) => state.data);
  const {query, results, isSearching} = useSelector((state: RootState) => state.search);

  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  // Initial Load
  useEffect(() => {
    if (items.length === 0 && !query) {
      dispatch(fetchProducts({limit: 10, skip: 0}));
    }
  }, [dispatch]);

  // Pull to Refresh Handler
  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
    dispatch(resetData());
    dispatch(fetchProducts({limit: 10, skip: 0})).finally(() => {
      dispatch(setRefreshing(false));
    });
  }, [dispatch]);

  // Infinite Scroll Handler
  const loadMore = useCallback(() => {
    if (!isLoading && items.length < total && !query) {
      dispatch(fetchProducts({limit: 10, skip}));
    }
  }, [dispatch, isLoading, items.length, total, skip, query]);

  // Debounced Search Handler
  const handleSearch = useCallback((text: string) => {
    dispatch(setQuery(text));
    
    if (searchTimer.current) {
        clearTimeout(searchTimer.current);
    }

    if (text.trim() === '') {
        dispatch(clearSearch());
        return;
    }

    searchTimer.current = setTimeout(() => {
      dispatch(searchProducts(text));
    }, 500);
  }, [dispatch]);

  const goToDetails = useCallback((item: any) => {
    navigation.navigate('Details', {item});
  }, [navigation]);

  const renderItem = useCallback(({item}: {item: any}) => (
    <ProductCard 
        item={item} 
        onPress={() => goToDetails(item)} 
    />
  ), [goToDetails]);

  const activeData = query.trim() !== '' ? results : items;
  const isInitialLoading = isLoading && skip === 0 && !isRefreshing;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search our collection..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={activeData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing} 
            onRefresh={onRefresh} 
            colors={[COLORS.primary]} 
            tintColor={COLORS.primary}
          />
        }
        ListHeaderComponent={useCallback(() => (
           isInitialLoading ? (
            <View>
                {[1, 2, 3, 4, 5].map(i => <SkeletonLoader key={i} />)}
            </View>
           ) : null
        ), [isInitialLoading])}
        ListFooterComponent={useCallback(() => 
          isLoading && skip > 0 ? (
            <View style={styles.footerLoader}>
                <SkeletonLoader />
            </View>
          ) : null
        , [isLoading, skip])}
        ListEmptyComponent={useCallback(() => (
            !isLoading && !isSearching && !isRefreshing ? (
                <EmptyState 
                    title={error ? "Connection Error" : "No Results"} 
                    message={error ? "We couldn't reach the servers. Please check your internet." : "Try searching for something else!"}
                    actionLabel="Retry"
                    onAction={onRefresh}
                />
            ) : null
        ), [isLoading, isSearching, isRefreshing, error, onRefresh])}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOW.small,
    zIndex: 10,
  },
  searchWrapper: {
    height: 48,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    fontSize: 16,
    color: COLORS.text,
  },
  listContent: {
    paddingVertical: SPACING.sm,
    paddingBottom: 40,
  },
  footerLoader: {
    marginTop: 10,
  },
});

export default HomeScreen;
