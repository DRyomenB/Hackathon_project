export default function PlayerStats () {
    return (
        <div className="flex flex-col gap-6">
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center">
                <span className="font-medium text-gray-700">Happiness</span>
                <span className="font-semibold text-blue-600">85%</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center">
                <span className="font-medium text-gray-700">Health</span>
                <span className="font-semibold text-green-600">92%</span>
            </div>
            </div>

            {/* LAST 3 ACTIVITIES */}
            <div>
            <h3 className="text-gray-700 font-semibold mb-2">Last 3 Activities</h3>
            <ul className="bg-gray-50 rounded-lg p-3 space-y-1 shadow-sm">
                <li className="text-gray-600">🏃 Went for a run</li>
                <li className="text-gray-600">📚 Read a book</li>
                <li className="text-gray-600">🎮 Played a game</li>
            </ul>
            </div>

            {/* FAVORITE THINGS */}
            <div>
            <h3 className="text-gray-700 font-semibold mb-2">Favorite Things</h3>
            <ul className="bg-gray-50 rounded-lg p-3 space-y-1 shadow-sm">
                <li className="text-gray-600">🍕 Pizza</li>
                <li className="text-gray-600">🎵 Music</li>
                <li className="text-gray-600">🐶 Dogs</li>
            </ul>
            </div>
        </div>
    ) ;
}

