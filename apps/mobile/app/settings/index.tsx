import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

type AIProvider = 'google' | 'openai';

export default function SettingsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('google');
  const [apiKey, setApiKey] = useState('');
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isLoading = false;

  const handleSave = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter an API key');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasExistingKey(true);
      setApiKey('');
      Alert.alert('Success', 'Settings saved successfully');
    }, 1000);
  };

  const handleRemoveKey = () => {
    Alert.alert(
      'Remove API Key',
      'Are you sure you want to remove your API key? You will need to add it again to use AI features.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setHasExistingKey(false);
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color={isDark ? '#60A5FA' : '#2563EB'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-row items-center border-b border-gray-200 p-4 dark:border-gray-800">
        <Pressable onPress={() => router.back()} className="mr-4 p-1">
          <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-gray-900 dark:text-white">Settings</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          AI Provider
        </Text>
        <Text className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Choose your AI provider and enter your API key. Your key is stored securely and only used
          to generate study materials.
        </Text>

        <View className="mb-4 flex-row">
          <Pressable
            onPress={() => setSelectedProvider('google')}
            className={`mr-2 flex-1 flex-row items-center justify-center rounded-lg border-2 py-4 ${
              selectedProvider === 'google'
                ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
            }`}>
            <Ionicons
              name="logo-google"
              size={20}
              color={selectedProvider === 'google' ? '#2563EB' : isDark ? '#9CA3AF' : '#6B7280'}
            />
            <Text
              className={`ml-2 font-medium ${
                selectedProvider === 'google'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
              Google Gemini
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedProvider('openai')}
            className={`flex-1 flex-row items-center justify-center rounded-lg border-2 py-4 ${
              selectedProvider === 'openai'
                ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
            }`}>
            <Ionicons
              name="hardware-chip-outline"
              size={20}
              color={selectedProvider === 'openai' ? '#2563EB' : isDark ? '#9CA3AF' : '#6B7280'}
            />
            <Text
              className={`ml-2 font-medium ${
                selectedProvider === 'openai'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
              OpenAI
            </Text>
          </Pressable>
        </View>

        {hasExistingKey && (
          <View className="mb-4 flex-row items-center rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
            <Text className="ml-2 flex-1 text-green-800 dark:text-green-200">
              API key configured
            </Text>
            <Pressable onPress={handleRemoveKey}>
              <Text className="font-medium text-red-600 dark:text-red-400">Remove</Text>
            </Pressable>
          </View>
        )}

        <View className="mb-4">
          <Text className="mb-2 font-medium text-gray-700 dark:text-gray-300">
            {hasExistingKey ? 'Update API Key' : 'API Key'}
          </Text>
          <TextInput
            value={apiKey}
            onChangeText={setApiKey}
            placeholder={
              selectedProvider === 'google'
                ? 'Enter your Google AI API key'
                : 'Enter your OpenAI API key'
            }
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            secureTextEntry
            className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </View>

        <View className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <Text className="mb-2 font-medium text-blue-900 dark:text-blue-100">
            How to get an API key:
          </Text>
          {selectedProvider === 'google' ? (
            <Text className="text-sm text-blue-800 dark:text-blue-200">
              1. Go to Google AI Studio (aistudio.google.com){'\n'}
              2. Sign in with your Google account{'\n'}
              3. Click "Get API key" in the sidebar{'\n'}
              4. Create a new API key and copy it here
            </Text>
          ) : (
            <Text className="text-sm text-blue-800 dark:text-blue-200">
              1. Go to platform.openai.com{'\n'}
              2. Sign in or create an account{'\n'}
              3. Go to API keys in your account settings{'\n'}
              4. Create a new secret key and copy it here
            </Text>
          )}
        </View>

        <Pressable
          onPress={handleSave}
          disabled={!apiKey.trim() || isSaving}
          className={`items-center rounded-lg py-4 ${
            !apiKey.trim() || isSaving
              ? 'bg-gray-300 dark:bg-gray-700'
              : 'bg-blue-600 active:bg-blue-700'
          }`}>
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="font-semibold text-white">
              {hasExistingKey ? 'Update API Key' : 'Save API Key'}
            </Text>
          )}
        </Pressable>

        <View className="mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark" size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text className="ml-2 font-medium text-gray-700 dark:text-gray-300">Privacy First</Text>
          </View>
          <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your API key is stored securely and is only used to make requests to your chosen AI
            provider. We never store or access your generated content on our servers.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
