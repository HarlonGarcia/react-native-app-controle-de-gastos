import Button from '@/components/button';
import { useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, View as NativeView } from 'react-native';
import DatePicker, { DatePickerProps } from '..';
import { Calendar } from 'lucide-react-native';
import { styles } from './styles';
import dayjs, { Dayjs } from 'dayjs';
import Dates from '@/constants/Dates';
import { View } from '@/components/Themed';

interface DatePickerModalProps extends DatePickerProps {
    title?: string;
}

export default function DatePickerModal({
    title = 'Selecione uma data',
    value,
    onChange,
    ...rest
}: DatePickerModalProps) {
    const [date, setDate] = useState(value);
    const [open, setOpen] = useState(false);

    const handleDateChange = (date: Dayjs) => {
        setOpen(Platform.OS === 'ios');
        setDate(date);
        onChange(date);
    };
    
    return (
        <>
            <Button
                iconBefore={Calendar}
                style={styles.button}
                title={dayjs(date).format(Dates.datepicker) || title}
                onPress={() => setOpen(true)}
            />

            <Modal
                visible={open}
                transparent={true}
                animationType='slide'
                onRequestClose={() => setOpen(false)}
            >
                <NativeView style={styles.overlay}>
                <View style={styles.datePicker}>
                    <DatePicker
                        value={value}
                        onChange={handleDateChange}
                        {...rest}
                    />
                    {Platform.OS === 'ios' && (
                        <TouchableOpacity
                            onPress={() => setOpen(false)}
                            style={{ marginTop: 20 }}
                        >
                            <Text style={styles.confirmButton}>
                                Confirmar
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                </NativeView>
            </Modal>
        </>
    );
}