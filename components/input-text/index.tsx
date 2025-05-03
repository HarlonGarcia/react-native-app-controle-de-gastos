import { View, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { Text } from '../Themed';
import { styles } from './styles';
import { LucideIcon } from 'lucide-react-native';

interface InputTextProps extends TextInputProps {
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
    icon?: LucideIcon;
    error?: string;
    type?: 'numeric' | 'default';
}

export default function InputText({
    label,
    containerStyle,
    style,
    error,
    type = 'default',
    icon: Icon,
    ...rest
}: InputTextProps) {
    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}

            <View style={[styles.inputContainer, containerStyle, !!error && styles.error]}>
                {Icon && (
                    <Icon
                        size={20}
                        color='#bbb'
                        style={styles.icon}
                    />
                )}

                <TextInput
                    keyboardType={type}
                    placeholderTextColor='#bbb'
                    style={[styles.input, style]}
                    {...rest}
                />
            </View>
        </View>
    );
}
  