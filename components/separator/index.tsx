import { StyleSheet } from 'react-native';
import { View } from '../Themed';

type SeparatorProps = React.ComponentProps<typeof View>;

export default function Separator({ style, ...rest }: SeparatorProps) {
    return (
        <View
            style={[styles.separator, style]}
            lightColor="#ddd"
            darkColor="rgba(255, 255, 255, 0.2)"
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
  separator: {
    marginHorizontal: 'auto',
    height: 1,
    width: '100%',
  },
});