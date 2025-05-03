import { Text, TouchableOpacity } from "react-native";
import { styles } from './styles';
import { ComponentProps } from 'react';
import { ThemeProps, useThemeColor } from '../Themed';
import { LucideIcon } from 'lucide-react-native';

const ICON_SIZE = 20;

interface ButtonProps extends ComponentProps<typeof TouchableOpacity>, ThemeProps {
    title: string;
    textStyle?: React.ComponentProps<typeof Text>['style'];
    iconColor?: string;
    iconBefore?: LucideIcon;
    iconAfter?: LucideIcon;
}

export default function Button({
    title,
    style,
    textStyle,
    lightColor: light,
    darkColor: dark,
    iconColor,
    iconBefore: IconBefore,
    iconAfter: IconAfter,
    ...rest
}: ButtonProps) {
    const backgroundColor = useThemeColor({ light, dark }, 'tint');

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.container, { backgroundColor }, style]}
            {...rest}
        >
            {IconBefore && (
                <IconBefore
                    color={iconColor}
                    size={ICON_SIZE}
                />
            )}

            <Text style={[styles.text, textStyle]}>
                {title}
            </Text>

            {IconAfter && (
                <IconAfter
                    color={iconColor}
                    style={{ marginLeft: 'auto' }}
                    size={ICON_SIZE}
                />
            )}
        </TouchableOpacity>
    )
}