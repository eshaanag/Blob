import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

const PLACEHOLDER_FLASHCARDS = [
  {
    id: '1',
    front: 'What is a variable?',
    back: 'A container for storing data values',
    difficulty: 'easy',
  },
  {
    id: '2',
    front: 'What is a function?',
    back: 'A reusable block of code that performs a specific task',
    difficulty: 'medium',
  },
  {
    id: '3',
    front: 'What is closure?',
    back: 'A function that has access to variables from its outer scope',
    difficulty: 'hard',
  },
];

export default function FlashcardsListScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const isLoading = false;
  const flashcards = PLACEHOLDER_FLASHCARDS;

  const handleStudy = () => {
    router.push(`/flashcard/study?topicId=${topicId}`);
  };

  const handleCreateFlashcard = () => {
    router.push(`/flashcard/create?topicId=${topicId}`);
  };

  const handleGenerateWithAI = () => {
    console.log('Generate flashcards with AI for topic:', topicId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
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
        <Text className="flex-1 text-xl font-bold text-gray-900 dark:text-white">Flashcards</Text>
        <Pressable onPress={handleCreateFlashcard} className="p-1">
          <Ionicons name="add" size={24} color={isDark ? '#fff' : '#000'} />
        </Pressable>
      </View>

      <View className="flex-1 p-4">
        <View className="mb-4 flex-row">
          <Pressable
            onPress={handleStudy}
            className="mr-2 flex-1 flex-row items-center justify-center rounded-lg bg-blue-600 py-3 active:bg-blue-700">
            <Ionicons name="play" size={18} color="white" />
            <Text className="ml-2 font-semibold text-white">Study</Text>
          </Pressable>
          <Pressable
            onPress={handleGenerateWithAI}
            className="flex-1 flex-row items-center justify-center rounded-lg bg-purple-600 py-3 active:bg-purple-700">
            <Ionicons name="sparkles" size={18} color="white" />
            <Text className="ml-2 font-semibold text-white">Generate</Text>
          </Pressable>
        </View>

        {flashcards.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="albums-outline" size={64} color={isDark ? '#4B5563' : '#9CA3AF'} />
            <Text className="mt-4 text-center text-lg text-gray-500 dark:text-gray-400">
              No flashcards yet
            </Text>
            <Text className="mt-2 text-center text-gray-400 dark:text-gray-500">
              Generate with AI or create manually
            </Text>
          </View>
        ) : (
          <FlatList
            data={flashcards}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Pressable className="mb-3 rounded-xl bg-gray-50 p-4 active:bg-gray-100 dark:bg-gray-900 dark:active:bg-gray-800">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-sm text-gray-500 dark:text-gray-400">Card {index + 1}</Text>
                  {item.difficulty && (
                    <Text
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                      {item.difficulty}
                    </Text>
                  )}
                </View>
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  {item.front}
                </Text>
                <View className="mt-2 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">{item.back}</Text>
                </View>
              </Pressable>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
