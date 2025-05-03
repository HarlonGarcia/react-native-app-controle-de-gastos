import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Button from '@/components/button';
import Extract from '@/components/extract';

import { useState } from 'react';
import Dropdown from '@/components/dropdown';
import ModalAddIncome from '@/components/modal/modal-add-income';

const scenarios = [
    'Abril 2025',
    'Março 2025',
    'Fevereiro 2025',
    'Janeiro 2025',
    'Dezembro 2024',
    'Novembro 2024',
    'Outubro 2024',
    'Setembro 2024',
    'Agosto 2024',
    'Julho 2024',
    'Junho 2024',
    'Maio 2024',
    'Abril 2024',
    'Março 2024',
    'Fevereiro 2024',
    'Janeiro 2024',
];

export default function TabOneScreen() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [scenario, setScenario] = useState<number>(0);

    const name = 'Harlon';

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>Olá, {name}!</Text>
                
                <Dropdown
                    placeholder='Selecione o cenário'
                    value={scenario}
                    data={scenarios.map((item, index) => ({ label: item, value: String(index) }))}
                    onChange={setScenario}
                    style={{ marginBottom: 32 }}
                />

                <Extract />

                <View style={styles.buttons}>
                    <Button
                        title='Adicionar renda'
                        style={styles.buttonIncome}
                        textStyle={{ color: '#006600', fontWeight: '600' }}
                        onPress={() => setModalOpen(true)}
                    />
                    <Button
                        title='Adicionar despesa'
                        style={styles.buttonExpense}
                        textStyle={{ color: '#660000', fontWeight: '600' }}
                    />
                </View>
            </View>
            <ModalAddIncome
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 8,
    },
    buttonIncome: {
        backgroundColor: '#44ff44',
        borderColor: '#008800',
        borderWidth: 2,
        borderRadius: 12,
        padding: 12,
    },
    buttonExpense: {
        backgroundColor: '#ff6666',
        borderColor: '#980000',
        borderWidth: 2,
        borderRadius: 12,
        padding: 12,
    },
});
