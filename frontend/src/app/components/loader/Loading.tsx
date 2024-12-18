import React from "react"

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-[9999]">
      <div
        className="w-12 aspect-square rounded-full animate-spin"
        style={{
          background: "radial-gradient(farthest-side, #007575 94%, transparent) top/8px 8px no-repeat, conic-gradient(transparent 30%, #007575)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
        }}
      ></div>
    </div>
  )
}

export default Loading