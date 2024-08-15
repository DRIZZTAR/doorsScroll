import React from 'react'

export default function ScrollContent() {
  return (
    <>
      <h1 className="title">The Doors</h1>
      <p className="belowTitle">
        Touch Me
        <div className="scroll-indicator">
          {/* Down Arrow SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L6 10H18L12 16Z" fill="currentColor" />
          </svg>
        </div>
      </p>
      <h1 className="large-text when">When</h1>
      <p className="subtitle">Los Angeles 1965</p>
      <h1 className="large-text youre">You're</h1>
      <h1 className="large-text strange">Strange</h1>
      <p className="end">People Come Outta the Rain</p>
    </>
  )
}
