import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import IconButton from '@/components/ui/IconButton';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(screens)/AllPlace" 
          options={{ 
            headerShown: true, 
            title: 'All Places', 
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor || 'black'}
                onPress={() => {
                  // Navigate to AddPlace screen
                  router.push('/AddPlace');
                }}
              />
            ),  
          }} 
        />
        <Stack.Screen 
          name="(screens)/AddPlace" 
          options={{ title: 'Add New Place' }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
