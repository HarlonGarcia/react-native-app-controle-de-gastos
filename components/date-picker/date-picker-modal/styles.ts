import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 48,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    datePicker: {
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
    },
    confirmButton: {
        textAlign: 'center',
        color: '#007AFF',
        fontWeight: '600',
    },
});