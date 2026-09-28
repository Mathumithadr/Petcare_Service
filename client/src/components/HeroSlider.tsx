import { useState } from 'react';
import { FlatList, Image, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { heroSlides, HeroSlide } from '../data/mockHero';
import colors from '../theme/colors';

const slideImage = { width: 140, height: "100%" as const };

function Slide({ slide }: { slide: HeroSlide }) {
    if (slide.type === 'welcome') {
        return (
            <View className="flex-row overflow-hidden rounded-2xl bg-[#A9CBF0]" style={{ height: 180 }}>
                <View className="flex-1 justify-center p-4">
                    <Text className="text-xs text-petora-navy">{slide.greeting}</Text>
                    <Text className="mt-1 text-xl font-bold text-petora-navy">{slide.headline}</Text>
                    <Text className="mt-2 text-xs text-petora-inkMuted" numberOfLines={3}>{slide.subtext}</Text>
                </View>
                <Image source={slide.image} style={slideImage} resizeMode="contain" />
            </View>
        );
    }

    if (slide.type === 'offer') {
        return (
            <View className="flex-row overflow-hidden rounded-2xl bg-[#FDEBDD]" style={{ height: 180 }}>
                <View className="flex-1 justify-center p-4">
                    <View className="self-start rounded-full bg-petora-orange px-3 py-1">
                        <Text className="text-[10px] font-semibold text-petora-onPrimary">{slide.badge}</Text>
                    </View>
                    <Text className="mt-2 text-lg font-bold text-petora-navy">{slide.title}</Text>
                    <Text className="text-xs text-petora-inkMuted">{slide.subtitle}</Text>
                    <Pressable className="mt-3 flex-row items-center self-start rounded-full bg-petora-orange px-5 py-2">
                        <Text className="mr-1 text-sm font-semibold text-petora-onPrimary">{slide.cta}</Text>
                        <MaterialCommunityIcons name="arrow-right" size={16} color="white" />
                    </Pressable>
                </View>
               <Image source={slide.image} style={slideImage} resizeMode="contain" />
            </View>
        );
    }

    return (
        <View className="justify-center rounded-2xl bg-[#1F3A6E] p-4" style={{ height: 180 }}>
            <Text className="text-[10px] font-semibold tracking-widest text-[#F9A15A]">{slide.tier}</Text>
            <Text className="mt-1 text-lg font-bold text-petora-onPrimary">{slide.title}</Text>
            {slide.perks.map((perk) => (
                <View key={perk} className="mt-1 flex-row items-center">
                    <MaterialCommunityIcons name="check-circle" size={14} color={colors.orange} />
                    <Text className="ml-2 text-xs text-petora-onPrimary">{perk}</Text>
                </View>
            ))}
            <Pressable className="mt-3 self-start rounded-full bg-petora-orange px-5 py-2">
                <Text className="text-sm font-semibold text-petora-onPrimary">{slide.cta}</Text>
            </Pressable>
        </View>
    );
}

export default function HeroSlider() {
    const { width } = useWindowDimensions();
    const [index, setIndex] = useState(0);

    return (
        <View className="mt-4">
            <FlatList
                data={heroSlides}
                keyExtractor={(s) => s.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
                renderItem={({ item }) => (
                    <View style={{ width }} className="px-4">
                        <Slide slide={item} />
                    </View>
                )}
            />
            <View className="mt-2 flex-row justify-center">
                {heroSlides.map((s, i) => (
                    <View
                        key={s.id}
                        className={`mx-1 h-1.5 rounded-full ${i === index ? 'w-4 bg-petora-orange' : 'w-1.5 bg-[#C9D3E3]'}`}
                    />
                ))}
            </View>
        </View>
    );
}