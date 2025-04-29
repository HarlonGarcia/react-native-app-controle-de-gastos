import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 48,
        padding: 12,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
    },
    icon: {
        marginRight: 4,
    },
    error: {
        borderColor: '#ff0000',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
})