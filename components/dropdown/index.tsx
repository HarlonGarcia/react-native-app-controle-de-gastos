import { LucideIcon } from 'lucide-react-native';
import { ComponentProps, useState } from 'react';
import { View } from 'react-native';
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown';
import { ThemeProps, useThemeColor } from '../Themed';

import styles from './styles';

type NativeDropdownProps = ComponentProps<typeof NativeDropdown>;

interface DropdownProps extends Partial<NativeDropdownProps>, ThemeProps {
    data: Array<{ label: string; value: string }>;
    placeholder: string;
    value: NativeDropdownProps['value'];
    onChange: NativeDropdownProps['onChange'];
    leftIcon?: LucideIcon;
    style?: NativeDropdownProps['style'];
}

export default function Dropdown({
    data,
    value,
    onChange,
    placeholder,
    maxHeight = 300,
    leftIcon,
    search,
    searchPlaceholder = 'Digite algo...',
    darkColor: dark,
    lightColor: light,
    style,
}: DropdownProps) {
    const [isFocus, setIsFocus] = useState(false);

    const LeftIcon = leftIcon;
    const accentColor = '#2f95ff';

    return (
        <View style={[styles.container, style]}>
            <NativeDropdown
                style={[styles.dropdown, isFocus && { borderColor: accentColor }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={[styles.iconStyle, { tintColor: isFocus ? accentColor : '#000' }]}
                data={data}
                search={search}
                maxHeight={maxHeight}
                labelField='label'
                valueField='value'
                placeholder={placeholder}
                searchPlaceholder={searchPlaceholder}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={({ value }) => {
                    onChange?.(value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => 
                    LeftIcon
                        ? <LeftIcon color={isFocus ? accentColor : '#000'} size={20} />
                        : <></>
                }
            />
        </View>
    );
};