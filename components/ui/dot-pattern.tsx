export function DotPattern() {
    return (
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 grid grid-cols-8 gap-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-300"></div>
          ))}
        </div>
      </div>
    )
  }
  