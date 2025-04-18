import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Button from '@/components/button';
import Extract from '@/components/extract';

import { useState } from 'react';
import ActionSheet from '@/components/action-sheet';
import { ChevronDown } from 'lucide-react-native';

const scenarios = [
    'Abril 2025',
    'Marco 2025',
    'Fevereiro 2025',
    'Janeiro 2025',
    'Dezembro 2024',
    'Novembro 2024',
    'Outubro 2024',
    'Cancelar'
];

export default function TabOneScreen() {
  const [scenario, setScenario] = useState<number>();
  const name = 'Hailton';

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Olá, {name}!</Text>

        <ActionSheet
            title='Selecione o cenário'
            options={scenarios}
            cancelButtonIndex={scenarios.length - 1}
            onSelect={(index) => setScenario(index)}
            icon={<ChevronDown />}
            style={{ marginBottom: 32, padding: 12, boxShadow: '0px 1px 3px #00000034' }}
            textStyle={{ fontWeight: '600' }}
            lightColor='#eeeeeeaa'
        />

        <Extract />

        <View style={styles.buttons}>
            <Button
                title='Adicionar renda'
                style={styles.buttonIncome}
                textStyle={{ color: '#006600', fontWeight: '600' }}
            />
            <Button
                title='Adicionar despesa'
                style={styles.buttonExpense}
                textStyle={{ color: '#660000', fontWeight: '600' }}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
