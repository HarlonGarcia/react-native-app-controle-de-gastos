import { Text, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { ComponentProps, ReactNode } from 'react';
import { ThemeProps, useThemeColor } from '../Themed';

interface ButtonProps extends ComponentProps<typeof TouchableOpacity>, ThemeProps {
    title: string;
    textStyle?: React.ComponentProps<typeof Text>['style'];
    icon?: ReactNode;
}

export default function Button({
    title,
    style,
    textStyle,
    lightColor: light,
    darkColor: dark,
    icon,
    ...rest
}: ButtonProps) {
    const backgroundColor = useThemeColor({ light, dark }, 'tint');
    const Icon = icon;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.container, { backgroundColor }, style]}
            {...rest}
        >
            <Text style={[styles.text, textStyle]}>
                {title}
            </Text>

            {icon && Icon}
        </TouchableOpacity>
    )
}