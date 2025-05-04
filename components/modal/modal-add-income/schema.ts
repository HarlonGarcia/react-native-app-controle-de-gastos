import { Dayjs } from 'dayjs';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    title: yup
        .string()
        .required('O título não pode ser vazio'),
    category: yup
        .string()
        .required('A categoria não pode ser vazia'),
    amount: yup
        .number()
        .required('O valor não pode ser vazio')
        .moreThan(-1, 'O valor deve ser maior que zero')
        .typeError('O valor deve ser um número'),
    installments: yup
        .number(),
    paymentMethod: yup
        .string()
        .required('O método de pagamento não pode ser vazio'),
    datetime: yup
        .mixed<Dayjs>()
        .required('A data não pode ser vazia')
        .typeError('A data deve ser uma data válida'),
});
  