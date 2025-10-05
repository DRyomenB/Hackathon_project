import React from 'react';

export default function PlayerRelationships({ name, relationship, gender }) {
  // Convert neutral relationship into a gendered term
  const genderedTerm = (() => {
    const lower = relationship.toLowerCase();
    switch (lower) {
      case 'parent':
        return gender === 'female' ? 'Mom' : 'Dad';
      case 'sibling':
        return gender === 'female' ? 'Sister' : 'Brother';
      case 'child':
        return gender === 'female' ? 'Daughter' : 'Son';
      case 'grandparent':
        return gender === 'female' ? 'Grandma' : 'Grandpa';
      case 'friend':
        return gender === 'female' ? 'Friend (F)' : 'Friend (M)';
      case 'partner':
        return gender === 'female' ? 'Girlfriend' : 'Boyfriend';
      default:
        return relationship;
    }
  })();

  return (
    <button className="p-3 bg-gray-50 rounded-lg shadow-sm text-left
    hover:bg-gray-100 transition-colors duration-150">
      <p className="font-medium text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">{genderedTerm}</p>
    </button>
  );
}
