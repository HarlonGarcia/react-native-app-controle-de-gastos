import InputText from '@/components/input-text';
import Modal from '..';
import Dropdown from '@/components/dropdown';
import { ReturnKeyTypeOptions, View } from 'react-native';
import { Calendar, Clock, DollarSign, CreditCard } from 'lucide-react-native';
import { styles } from './styles';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { validationSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType  } from 'yup';

interface ModalAddIncomeProps {
    open: boolean;
    onClose: () => void;
}

const categories: { label: string; value: string; }[] = [
    { label: 'Alimentação', value: '1' },
    { label: 'Transporte', value: '2' },
    { label: 'Saúde', value: '3' },
    { label: 'Educação', value: '4' },
    { label: 'Lazer', value: '5' },
    { label: 'Outros', value: '6' },
];

const paymentMethods: { label: string; value: string; }[] = [
    { label: 'Cartão de crédito', value: '1' },
    { label: 'Cartão de débito', value: '2' },
    { label: 'Dinheiro', value: '3' },
    { label: 'Transferência', value: '4' },
    { label: 'Cheque', value: '5' },
];

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
                data={categories}
                disable={categories.length === 0}
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
                data={paymentMethods}
                disable={paymentMethods.length === 0}
                placeholder='Forma de pagamento'
                value='1'
                style={{ marginBottom: 16 }}
                onChange={() => {}}
            />
            <View style={styles.inputTextArea}>
                <InputText
                    {...inputProps}
                    containerStyle={{ flex: 1 }}
                    icon={Calendar}
                />
                <InputText
                    {...inputProps}
                    containerStyle={{ flex: 1 }}
                    icon={Clock}
                />
            </View>
        </Modal>
    );
}