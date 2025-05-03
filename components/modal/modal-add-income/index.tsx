import InputText from '@/components/input-text';
import Modal from '..';
import Dropdown from '@/components/dropdown';
import { ReturnKeyTypeOptions, View } from 'react-native';
import { DollarSign, CreditCard } from 'lucide-react-native';
import { styles } from './styles';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { validationSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType  } from 'yup';
import DatePickerModal from '@/components/date-picker/date-picker-modal';
import dayjs from 'dayjs';
import { mocks } from '@/mock';

interface ModalAddIncomeProps {
    open: boolean;
    onClose: () => void;
}

export default function ModalAddIncome({
    open,
    onClose,
}: ModalAddIncomeProps) {
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        control,
        formState: {
            errors,
        },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const category = useWatch({
        control,
        name: 'category',
        defaultValue: mocks.categories[0].value,
    });

    const paymentMethod = useWatch({
        control,
        name: 'paymentMethod',
        defaultValue: mocks.paymentMethods[0].value,
    });

    const datetime = useWatch({
        control,
        name: 'datetime',
        defaultValue: dayjs(),
    });
    
    const closeModal = () => {
        reset();
        onClose();
    };

    const onSubmit = (data: InferType<typeof validationSchema>) => {
        console.log(data)
    };

    const inputProps = {
        autoCorrect: false,
        returnKeyType: 'done' as ReturnKeyTypeOptions,
    };

    useEffect(function registerFields() {
        register('title');
        register('category');
        register('amount');
        register('installments');
        register('datetime');
        register('paymentMethod');
    }, [register]);

    return (
        <Modal
            title='Adicionar renda'
            visible={open}
            onClose={closeModal}
            onConfirm={handleSubmit(onSubmit)}
        >
            <InputText
                {...inputProps}
                placeholder='Digite o título'
                containerStyle={styles.inputText}
                onChangeText={(value) => setValue('title', value)}
                error={errors.title?.message}
            />
            <Dropdown
                data={mocks.categories}
                disable={mocks.categories.length === 0}
                placeholder='Selecione a categoria'
                value={category}
                style={{ marginBottom: 16 }}
                onChange={(value) => setValue('category', value)}
                error={errors.category?.message}
            />
            <View style={styles.inputTextArea}>
                <InputText
                    {...inputProps}
                    placeholder='Digite o valor'
                    containerStyle={{ flex: 1 }}
                    onChangeText={(value) => setValue('amount', Number(value))}
                    error={errors.amount?.message}
                    type='numeric'
                    icon={DollarSign}
                />
                <InputText
                    {...inputProps}
                    placeholder='Nº de parcelas'
                    containerStyle={{ flex: 1 }}
                    onChangeText={(value) => setValue('installments', Number(value))}
                    error={errors.installments?.message}
                    type='numeric'
                    icon={CreditCard}
                />
            </View>
            <Dropdown
                data={mocks.paymentMethods}
                disable={mocks.paymentMethods.length === 0}
                placeholder='Forma de pagamento'
                value={paymentMethod}
                style={{ marginBottom: 16 }}
                onChange={(value) => setValue('paymentMethod', value)}
            />
            <View style={styles.inputTextArea}>
                <DatePickerModal
                    value={datetime}
                    onChange={(value) => setValue('datetime', value)}
                    timePicker
                />
            </View>
        </Modal>
    );
}