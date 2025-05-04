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

export const mocks = {
    categories,
    paymentMethods,
}