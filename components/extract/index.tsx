import { styles } from './styles';

import Separator from '../separator';
import { View, Text } from '../Themed';
import { View as NativeView } from 'react-native';

const fakeData =  {
    currency: 'R$',
    values: {
        initial: 2000,
        income: 1000,
        expense: 2200,
    },
}

export default function Extract() {
    const finalBalance = (fakeData.values.initial + fakeData.values.income) - fakeData.values.expense;

    return (
        <View
            darkColor='#222'
            lightColor='#f6f6f6'
            style={styles.container}
        >
            <Row
                type='initial'
                label='Saldo inicial'
                currency={fakeData.currency}
                value={fakeData.values.initial}
            />
            <Row
                type='income'
                label='Renda'
                currency={fakeData.currency}
                value={fakeData.values.income}
            />
            <Row
                type='expense'
                label='Despesas'
                currency={fakeData.currency}
                value={fakeData.values.expense}
            />
            <Separator style={{ marginVertical: 8 }} />
            <Row
                type='final'
                label='Saldo final'
                currency={fakeData.currency}
                value={finalBalance}
            />
        </View>
    )
}

interface RowProps {
    type?: 'income' | 'expense' | 'initial' | 'final';
    label: string;
    currency: string;
    value: number;
}

const Row = ({ type, label, currency, value }: RowProps) => {
    const formatValue = (value: number) => {
        return value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    const isExpenseOrIncome = type === 'income' || type === 'expense';
    
    const typeStyles = isExpenseOrIncome && { color: type === 'income' ? '#00aa00' : '#ff0000' };
    const finalBalanceStyle = value < 0 ? { color: '#ff0000' } : { color: '#00aa00' };
    const valueStyles = 'final' === type ? [styles.text, finalBalanceStyle] : styles.text;

    return (
        <NativeView style={styles.row}>
            <Text style={[styles.text, { fontWeight: '600' }]}>{label}</Text>
            <NativeView style={styles.value}>
                <Text style={[typeStyles, valueStyles]}>{currency}</Text>
                <Text style={[typeStyles, valueStyles]}>{formatValue(value)}</Text>
            </NativeView>
        </NativeView>
    )
}