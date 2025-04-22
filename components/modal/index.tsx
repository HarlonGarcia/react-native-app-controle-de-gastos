import React, { useEffect, useState } from 'react'
import { View, Animated, Dimensions, TextInput } from 'react-native'
import styles from './styles';
import Button from '../button';
import Colors from '@/constants/Colors';
import { View as ThemedView, Text } from '../Themed';
import Dropdown from '../dropdown';

interface ModalProps {
    title: string;
    visible: boolean;
    onClose: () => void;
}

const { height } = Dimensions.get('window');

const categories = [
    {
        id: '1',
        label: 'Renda',
        value: '1'
    },
    {
        id: '2',
        label: 'Despesa',
        value: '2'
    },
];

export default function Modal({ title, visible, onClose }: ModalProps) {
    const [state] = useState({
        opacity: new Animated.Value(0),
        container: new Animated.Value(height),
        modal: new Animated.Value(height)
    });

    const open = () => {
        Animated.sequence([
            Animated.timing(state.container, { toValue: 0, duration: 100, useNativeDriver: true }),
            Animated.timing(state.opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true }),
        ]).start();
    };

    const close = () => {
        Animated.sequence([
            Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
            Animated.timing(state.opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    useEffect(function triggerAnimations() {
        if (visible) {
            open()
        } else {
            close()
        }
    }, [visible])

    return ( 
        <Animated.View 
            style={[styles.container, {
                opacity: state.opacity,
                transform: [
                    { translateY: state.container }
                ]
            }]}
        >
            <Animated.View 
                style={[styles.wrapper, {
                    transform: [
                        { translateY: state.modal }
                    ]
                }]}
            >
                <ThemedView
                    darkColor='#1c1c1e'
                    style={styles.modal}
                >
                    <View style={styles.indicator} />

                    <Text style={styles.text}>
                        {title}
                    </Text>

                    <View style={{ marginTop: 24, marginBottom: 16 }}>
                        <Dropdown
                            data={categories}
                            placeholder='Selecione a categoria'
                            value='1'
                            onChange={() => {}}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Button
                            title='Cancelar'
                            onPress={onClose}
                            style={[styles.button, { backgroundColor: '#f74444' }]}
                            textStyle={{ fontWeight: '600' }}
                        />
                        <Button
                            title='Salvar'
                            onPress={onClose}
                            style={[styles.button, { backgroundColor: Colors['theme'].primary }]}
                            textStyle={{ color: Colors['theme'].white, fontWeight: '600' }}
                        />
                    </View>
                </ThemedView>
            </Animated.View>
        </Animated.View>
    );
}