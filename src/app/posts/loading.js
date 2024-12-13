export default function Loading() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );
}
