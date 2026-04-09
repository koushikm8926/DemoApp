import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';
import {COLORS, RADIUS} from '../utils/theme';

const {width} = Dimensions.get('window');

const SkeletonLoader = () => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [shimmerAnim]);

    const opacity = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={styles.card}>
            <Animated.View style={[styles.thumbnail, {opacity}]} />
            <View style={styles.content}>
                <Animated.View style={[styles.line, {width: '70%', opacity}]} />
                <Animated.View style={[styles.line, {width: '40%', opacity}]} />
                <Animated.View style={[styles.line, {width: '30%', opacity, marginTop: 15}]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: COLORS.surface,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: RADIUS.lg,
    },
    thumbnail: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.skeleton,
        borderRadius: RADIUS.md,
    },
    content: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    line: {
        height: 12,
        backgroundColor: COLORS.skeleton,
        borderRadius: RADIUS.sm,
        marginVertical: 4,
    },
});

export default SkeletonLoader;
