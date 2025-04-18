import { useActionSheet } from '@expo/react-native-action-sheet';
import Button from '../button';
import { ComponentProps, useState } from 'react';

interface ActionSheetProps extends ComponentProps<typeof Button> {
    title: string;
    options: string[];
    cancelButtonIndex?: number;
    onSelect: (index: number) => void;
}

export default function ActionSheet({
    title,
    options,
    cancelButtonIndex,
    onSelect,
    ...rest
}: ActionSheetProps) {
    const [buttonText, setButtonText] = useState<string>();

    const { showActionSheetWithOptions } = useActionSheet();

    const onPressHandler = (index?: number) => {
        switch (index) {
            case cancelButtonIndex:
                break;
            default:
                if ('number' === typeof index) {
                    onSelect(index);
                    setButtonText(options[index]);
                }

                break;
        }
    };

    const onPress = () => {
        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            cancelButtonTintColor: '#ff0000',
        }, onPressHandler);
    }

    const text = buttonText || title;

    return (
        <Button
            {...rest}
            title={text}
            onPress={onPress}
        />
    );
}