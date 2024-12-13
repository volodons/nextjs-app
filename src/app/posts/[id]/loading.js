export default function Loading() {
    return (
        <div className="max-w-2xl mx-auto p-6 animate-pulse">
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
            <div className="space-y-3 mt-6">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
    );
}
