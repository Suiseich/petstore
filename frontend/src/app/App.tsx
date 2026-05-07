import { useState } from 'react';
import PetBrowsingPage from '../endpoints/browsing/PetBrowsingPage';
import PetDetailPage from '../endpoints/browsing/PetDetailPage';

export default function App() {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  if (selectedPetId) {
    return <PetDetailPage petId={selectedPetId} onBack={() => setSelectedPetId(null)} />;
  }

  return <PetBrowsingPage onSelectPet={setSelectedPetId} />;
}

