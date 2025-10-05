import React from 'react';
import RelationshipInfoCard from './RelationshipInfoCard.jsx';

export default function CharacterList() {
  const characters = [
    { name: 'Ava', gender: 'female', relationship: 'Parent', category: 'Family' },
    { name: 'Liam', gender: 'male', relationship: 'Sibling', category: 'Family' },
    { name: 'Noah', gender: 'male', relationship: 'Friend', category: 'Friends' },
    { name: 'Mia', gender: 'female', relationship: 'Friend', category: 'Friends' },
    { name: 'Olivia', gender: 'female', relationship: 'Child', category: 'Family' },
  ];

  // Group characters by category
  const grouped = characters.reduce((acc, char) => {
    if (!acc[char.category]) acc[char.category] = [];
    acc[char.category].push(char);
    return acc;
  }, {});

  return (
    <div className="p-4 flex flex-col gap-6">
      {Object.entries(grouped).map(([category, people]) => (
        <div key={category}>
          <h3 className="text-gray-800 font-semibold mb-2">{category}</h3>
          <div className="flex flex-col gap-2">


            {people.map((char, index) => (
              <RelationshipInfoCard
                key={index}
                name={char.name}
                relationship={char.relationship}
                gender={char.gender}
              />
            ))}

            
          </div>
        </div>
      ))}
    </div>
  );
}
