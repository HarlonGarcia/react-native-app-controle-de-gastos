import InputText from '@/components/input-text';
import Modal from '..';
import Dropdown from '@/components/dropdown';
import { ReturnKeyTypeOptions, View } from 'react-native';
import { DollarSign, CreditCard } from 'lucide-react-native';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { validationSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType  } from 'yup';
import DatePickerModal from '@/components/date-picker/date-picker-modal';
import { mocks } from '@/services/mock';
import { getAsArray, setAsValue } from '@/services/storage';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import Dates from '@/constants/Dates';

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
        handleSubmit,
        reset,
        control,
        formState: {
            errors,
        },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            category: mocks.categories[0].value,
            paymentMethod: mocks.paymentMethods[0].value,
            amount: 0,
            installments: 0,
            datetime: dayjs(),
        }
    });
    
    const closeModal = () => {
        onClose();
        reset({
            title: '',
            category: mocks.categories[0].value,
            amount: 0,
            installments: 0,
            paymentMethod: mocks.paymentMethods[0].value,
            datetime: dayjs(),
        });
    };

    const onSubmit = async (data: InferType<typeof validationSchema>) => {
        const incomes = await getAsArray('incomes');

        const newIncome = {
            ...data,
            id: uuid.v4(),
            datetime: dayjs(data.datetime).format(Dates.datetime),
        }

        await setAsValue('incomes', {
            ...incomes,
            ...newIncome,
        });

        closeModal();
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
            <Controller
                name='title'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <InputText
                        {...inputProps}
                        placeholder='Digite o título'
                        containerStyle={styles.inputText}
                        value={value}
                        onChangeText={onChange}
                        error={errors.title?.message}
                    />
                )}
            />
            <Controller
                name='category'
                control={control}
                render={({ field }) => (
                    <Dropdown
                        data={mocks.categories}
                        disable={mocks.categories.length === 0}
                        placeholder='Selecione a categoria'
                        style={{ marginBottom: 16 }}
                        error={errors.category?.message}
                        {...field}
                    />
                )}
            />
            <View style={styles.inputTextArea}>
                <Controller
                    name='amount'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputText
                            {...inputProps}
                            placeholder='Digite o valor'
                            containerStyle={{ flex: 1 }}
                            value={String(value)}
                            onChangeText={onChange}
                            type='numeric'
                            error={errors.amount?.message}
                            icon={DollarSign}
                        />
                    )}
                />
                <Controller
                    name='installments'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputText
                            {...inputProps}
                            placeholder='Nº de parcelas'
                            containerStyle={{ flex: 1 }}
                            value={String(value)}
                            onChangeText={onChange}
                            type='numeric'
                            error={errors.installments?.message}
                            icon={CreditCard}
                        />
                    )}
                />
            </View>
            <Controller
                name='paymentMethod'
                control={control}
                render={({ field }) => (
                    <Dropdown
                        data={mocks.paymentMethods}
                        disable={mocks.paymentMethods.length === 0}
                        placeholder='Forma de pagamento'
                        style={{ marginBottom: 16 }}
                        error={errors.paymentMethod?.message}
                        {...field}
                    />
                )}
            />
            <View style={styles.inputTextArea}>
                <Controller
                    name='datetime'
                    control={control}
                    render={({ field }) => (
                        <DatePickerModal
                            timePicker
                            {...field}
                        />
                    )}
                />
            </View>
        </Modal>
    );
}