export default function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="https://tysonskakun.dev/" target="_blank" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        ArtIsDead
        <br />
        tysonskakun.dev
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>
        after AI.
      </div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>2024</div>
    </div>
  )
}
