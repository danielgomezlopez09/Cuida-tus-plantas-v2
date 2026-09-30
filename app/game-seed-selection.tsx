import { View, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useGame } from '@/lib/contexts/GameContext';
import { useColors } from '@/hooks/use-colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Seed } from '@/lib/types/game';

/**
 * Pantalla de selección de semilla para comenzar el juego
 */
export default function GameSeedSelectionScreen() {
  const router = useRouter();
  const colors = useColors();
  const { gameState, plantSeed, getSeeds } = useGame();
  const [selectedSeedId, setSelectedSeedId] = useState<number | null>(null);

  const seeds = getSeeds();
  const firstSeedFree = !gameState.seedsOwned.some((s) => s.seedId === 1);

  const handleSelectSeed = (seedId: number) => {
    setSelectedSeedId(seedId);
  };

  const handlePlantSeed = async () => {
    if (selectedSeedId === null) return;

    const seed = seeds.find((s) => s.id === selectedSeedId);
    if (!seed) return;

    const cost = selectedSeedId === 1 ? 0 : 10;

    if (gameState.coins < cost && selectedSeedId !== 1) {
      alert('No tienes suficientes doblones');
      return;
    }

    await plantSeed(selectedSeedId);
    router.back();
  };

  const renderSeedCard = ({ item }: { item: Seed }) => {
    const cost = item.id === 1 ? 0 : 10;
    const isSelected = selectedSeedId === item.id;
    const isAffordable = gameState.coins >= cost || item.id === 1;

    return (
      <Pressable
        onPress={() => handleSelectSeed(item.id)}
        className={`flex-1 rounded-lg p-4 m-2 border-2 ${
          isSelected ? 'border-primary bg-primary/10' : 'border-border bg-surface'
        } ${!isAffordable ? 'opacity-50' : ''}`}
      >
        <View className="items-center">
          <Text className="text-5xl mb-2">{item.emoji}</Text>
          <Text className="text-sm font-bold text-foreground text-center mb-1">{item.name}</Text>
          <Text className="text-xs text-muted mb-2">{item.type}</Text>

          {/* Costo */}
          {cost > 0 ? (
            <View className="flex-row items-center gap-1 bg-warning/10 rounded-full px-2 py-1">
              <MaterialIcons name="monetization-on" size={14} color={colors.warning} />
              <Text className="text-xs font-bold text-warning">{cost}</Text>
            </View>
          ) : (
            <View className="bg-success/10 rounded-full px-2 py-1">
              <Text className="text-xs font-bold text-success">¡GRATIS!</Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable onPress={() => router.back()} className="flex-row items-center">
          <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
        </Pressable>
        <Text className="text-2xl font-bold text-foreground">Elige una Semilla</Text>
        <View className="w-6" />
      </View>

      {/* Información */}
      <View className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/20">
        <Text className="text-sm text-foreground leading-relaxed">
          Selecciona una semilla para comenzar. Tu primera semilla es gratis. Las siguientes cuestan 10 doblones cada una.
        </Text>
      </View>

      {/* Grid de Semillas */}
      <View
  style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  }}
>
  {seeds.map((seed) => (
    <View
      key={seed.id}
      style={{
        width: '48%',
        marginBottom: 12,
      }}
    >
      {renderSeedCard({ item: seed })}
    </View>
  ))}
</View>
      

      {/* Información de la Semilla Seleccionada */}
      {selectedSeedId !== null && (
        <View className="bg-surface rounded-lg p-4 mb-6 border border-border">
          {(() => {
            const seed = seeds.find((s) => s.id === selectedSeedId);
            if (!seed) return null;

            return (
              <View>
                <Text className="text-base font-bold text-foreground mb-2">{seed.name}</Text>
                <Text className="text-sm text-muted mb-3">{seed.description}</Text>

                <View className="gap-2">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="schedule" size={16} color={colors.primary} />
                    <Text className="text-sm text-foreground">
                      Tiempo de crecimiento: {seed.growthTime} días
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="eco" size={16} color={colors.success} />
                    <Text className="text-sm text-foreground">
                      Tipo: {seed.type}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="monetization-on" size={16} color={colors.warning} />
                    <Text className="text-sm text-foreground">
                      Recompensa: {seed.coinsPerHarvest} doblones
                    </Text>
                  </View>
                </View>
              </View>
            );
          })()}
        </View>
      )}

      {/* Botón de Plantar */}
      <TouchableOpacity
  onPress={handlePlantSeed}
  disabled={selectedSeedId === null}
  activeOpacity={0.75}
  style={{
    backgroundColor: selectedSeedId === null ? '#D1D5DB' : '#16A34A',
    opacity: selectedSeedId === null ? 0.5 : 1,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Text className="text-white text-lg font-bold">
    ✓ Plantar Semilla
  </Text>
</TouchableOpacity>
    </ScreenContainer>
  );
}
