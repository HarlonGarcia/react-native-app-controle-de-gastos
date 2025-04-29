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
        .positive('O valor deve ser positivo')
        .typeError('O valor deve ser um número'),
    installments: yup
        .number(),
});
  