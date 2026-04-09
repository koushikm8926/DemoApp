import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import {COLORS, SPACING, RADIUS, SHADOW} from '../utils/theme';

const DetailScreen = ({route, navigation}: any) => {
  const {item} = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);

  if (!item) {
    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No product data found.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Text style={styles.backBtnText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.imageContainer}>
            <Image source={{uri: item.images[0] || item.thumbnail}} style={styles.image} />
            <TouchableOpacity 
                style={styles.backCircle} 
                onPress={() => navigation.goBack()}>
                <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.favCircle, isFavorite && styles.favActive]} 
                onPress={() => setIsFavorite(!isFavorite)}>
                <Text style={[styles.favIcon, isFavorite && styles.favIconActive]}>♥</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
            <View style={styles.header}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.brand}>by {item.brand}</Text>
                </View>
                <View style={styles.priceTag}>
                    <Text style={styles.price}>\${item.price}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.ratingRow}>
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                </View>
                <Text style={styles.stockText}>{item.stock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
            </View>

            <Text style={styles.sectionTitle}>About the product</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.specGrid}>
                <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Weight</Text>
                    <Text style={styles.specValue}>{item.weight || 'N/A'}g</Text>
                </View>
                <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Discount</Text>
                    <Text style={styles.specValue}>{item.discountPercentage}% OFF</Text>
                </View>
                <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Warranty</Text>
                    <Text style={styles.specValue}>{item.warrantyInformation || '1 Year'}</Text>
                </View>
            </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  imageContainer: {
    height: 400,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.9,
  },
  backCircle: {
      position: 'absolute',
      top: 50,
      left: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignItems: 'center',
      justifyContent: 'center',
  },
  backIcon: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
  },
  favCircle: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.small,
  },
  favActive: {
      backgroundColor: COLORS.primary,
  },
  favIcon: {
      color: COLORS.text,
      fontSize: 20,
  },
  favIconActive: {
      color: '#fff',
  },
  content: {
    padding: SPACING.lg,
    marginTop: -RADIUS.xl,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  category: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  brand: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  priceTag: {
      backgroundColor: COLORS.accent,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: RADIUS.md,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  ratingBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D97706',
  },
  stockText: {
    marginLeft: 15,
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textMuted,
    marginBottom: SPACING.xl,
  },
  specGrid: {
      flexDirection: 'row',
      backgroundColor: COLORS.background,
      borderRadius: RADIUS.lg,
      padding: SPACING.md,
      marginBottom: 30,
  },
  specItem: {
      flex: 1,
      alignItems: 'center',
  },
  specLabel: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginBottom: 4,
  },
  specValue: {
      fontSize: 15,
      fontWeight: 'bold',
      color: COLORS.text,
  },
  bottomBar: {
      padding: SPACING.lg,
      paddingBottom: 40,
      backgroundColor: COLORS.surface,
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.medium,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backBtn: {
      marginTop: 20,
      padding: 15,
      backgroundColor: COLORS.primary,
      borderRadius: RADIUS.md,
  },
  backBtnText: {
      color: '#fff',
      fontWeight: 'bold',
  }
});

export default DetailScreen;
