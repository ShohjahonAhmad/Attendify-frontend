export default function ErrorMessage({error, setError}) {
    return (
        <div
            className="m-auto flex items-center gap-3 bg-red-600/20 border border-red-500 text-red-200 px-4 py-2 rounded-md"
            role="alert"
            aria-live="polite"
        >
            <span className="font-semibold">Error:</span>
            <p className="whitespace-pre-wrap">{String(error)}</p>
            <button
                type="button"
                className="ml-2 text-red-200 hover:text-white font-semibold"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
            >
                ×
            </button>
        </div>
    )
}