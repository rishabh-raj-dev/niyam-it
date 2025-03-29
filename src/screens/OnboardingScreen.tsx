import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, ImageBackground, Animated } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setFirstLaunch } from '../store/slices/appSlice';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: any; // We'd use actual image imports in a real app
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to TrackFlow',
    description: 'Your personal habit tracker to build better routines and achieve your goals.',
    image: require('../../assets/icon.png'),
  },
  {
    id: '2',
    title: 'Track Your Progress',
    description: 'Visualize your streaks and get insights on your daily, weekly, and monthly habits.',
    image: require('../../assets/icon.png'),
  },
  {
    id: '3',
    title: 'Stay Motivated',
    description: 'Get reminders and motivational quotes to keep you on track with your habits.',
    image: require('../../assets/icon.png'),
  },
];

const OnboardingScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Animation values with regular React Native Animated
  const opacity = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];
  
  // Reset animations when slide changes
  useEffect(() => {
    // Animate in the new slide
    opacity.setValue(0);
    translateY.setValue(50);
    
    // Start animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true
      })
    ]).start();
  }, [currentSlideIndex]);
  
  const animatedStyle = {
    opacity,
    transform: [{ translateY }]
  };
  
  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      // Animate out current slide then change to next
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 30,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        setCurrentSlideIndex(currentSlideIndex + 1);
      });
    } else {
      handleGetStarted();
    }
  };
  
  const handleSkip = () => {
    handleGetStarted();
  };
  
  const handleGetStarted = () => {
    // Animate out before navigation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      // Mark first launch as complete
      dispatch(setFirstLaunch(false));
      // Navigate to Home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' as never }],
      });
    });
  };
  
  const currentSlide = slides[currentSlideIndex];
  
  return (
    <ImageBackground
      source={require('../../assets/adaptive-icon.png')}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.slideContainer, animatedStyle]}>
            <Image 
              source={currentSlide.image} 
              style={styles.slideImage}
              resizeMode="contain"
            />
            <Text variant="headlineMedium" style={styles.slideTitle}>
              {currentSlide.title}
            </Text>
            <Text variant="bodyLarge" style={styles.slideDescription}>
              {currentSlide.description}
            </Text>
          </Animated.View>
          
          <View style={styles.indicatorContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentSlideIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
          
          <View style={styles.buttonContainer}>
            {currentSlideIndex < slides.length - 1 ? (
              <>
                <Button
                  mode="text"
                  onPress={handleSkip}
                  style={styles.skipButton}
                  textColor="white"
                >
                  Skip
                </Button>
                <Button
                  mode="contained"
                  onPress={handleNext}
                  style={styles.nextButton}
                  buttonColor="white"
                  textColor={theme.colors.primary}
                >
                  Next
                </Button>
              </>
            ) : (
              <Button
                mode="contained"
                onPress={handleGetStarted}
                style={styles.getStartedButton}
                buttonColor="white"
                textColor={theme.colors.primary}
              >
                Get Started
              </Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 48,
  },
  slideImage: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  slideTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  slideDescription: {
    textAlign: 'center',
    marginBottom: 24,
    color: 'white',
    opacity: 0.9,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#6200ee',
    width: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  skipButton: {
    alignSelf: 'flex-start',
  },
  nextButton: {
    alignSelf: 'flex-end',
    borderRadius: 30,
    paddingHorizontal: 24,
  },
  getStartedButton: {
    width: '100%',
    borderRadius: 30,
    paddingHorizontal: 24,
  },
});

export default OnboardingScreen;
