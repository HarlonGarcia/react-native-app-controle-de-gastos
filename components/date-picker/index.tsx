import dayjs, { Dayjs } from 'dayjs';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { styles } from './styles';

export interface DatePickerProps {
    value: Dayjs;
    onChange: (date: Dayjs) => void;
    timePicker?: boolean;
}

export default function DatePicker({
    value,
    onChange,
    timePicker = false,
}: DatePickerProps) {
    const defaultStyles = useDefaultStyles();

    const onDateChange = (date: DateType) => {
        if (!date) {
            return;
        }
        
        onChange(dayjs(date));
    };

    return (
        <DateTimePicker
            mode={'single'}
            date={value}
            onChange={({ date }) =>  onDateChange(date)}
            timePicker={timePicker}
            styles={{
                ...defaultStyles,
                ...styles,
            }}
        />
    );
};