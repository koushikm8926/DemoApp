import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, SPACING, RADIUS, SHADOW} from '../utils/theme';

interface ProductCardProps {
    item: any;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({item, onPress}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>${item.price}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
        ...SHADOW.medium,
        overflow: 'hidden',
    },
    thumbnail: {
        width: 110,
        height: 110,
    },
    content: {
        flex: 1,
        padding: SPACING.md,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.accent,
    },
    category: {
        fontSize: 11,
        color: COLORS.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});

export default ProductCard;
