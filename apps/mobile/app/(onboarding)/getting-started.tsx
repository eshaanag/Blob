import { useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GettingStartedScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const descriptionFade = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.95)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(titleFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(descriptionFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-950" edges={['top', 'left', 'right']}>
      <Animated.View
        className="flex-1 items-center justify-center px-6"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}>
        <Animated.Image
          source={require('../../assets/adaptive-icon.png')}
          style={{
            width: 150,
            height: 150,
            marginBottom: 32,
            transform: [{ scale: logoScale }],
          }}
          resizeMode="contain"
        />

        <Animated.View style={{ opacity: titleFade }}>
          <Text className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Learn Smarter with <Text className="text-orange-500">Blob</Text>
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: descriptionFade }}>
          <Text className="px-5 text-center text-lg leading-6 text-gray-500 dark:text-gray-400">
            Your AI-powered study companion. Transform notes into interactive flashcards and quizzes
            instantly.
          </Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        className="px-6 pb-8"
        style={{ transform: [{ scale: buttonScale }], opacity: buttonOpacity }}>
        <Pressable
          className="mb-4 h-14 flex-row items-center justify-center rounded-2xl bg-orange-500 shadow-sm active:bg-orange-600 dark:bg-orange-600 dark:active:bg-orange-700"
          onPress={() => router.push('/(onboarding)/login')}>
          <Text className="mr-2 text-lg font-semibold text-white">Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </Pressable>

        <Text className="px-4 text-center text-xs leading-5 text-gray-400 dark:text-gray-500">
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}
