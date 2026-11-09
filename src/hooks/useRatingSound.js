import { useEffect, useRef } from 'react'
import dropSound from '../assets/sounds/coffee-drop.wav'

export default function useRatingSound() {
  const contextRef = useRef(null)
  const bufferRef = useRef(null)

  useEffect(() => () => {
    contextRef.current?.close().catch(() => {})
    contextRef.current = null
    bufferRef.current = null
  }, [])

  // Unlock audio during the user's click, before waiting for the server.
  const prepareRatingSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const context = contextRef.current ?? new AudioContext()
      contextRef.current = context
      context.resume().catch(() => {})
      bufferRef.current ??= fetch(dropSound)
        .then(response => {
          if (!response.ok) throw new Error('Sound unavailable')
          return response.arrayBuffer()
        })
        .then(data => context.decodeAudioData(data))
        .catch(() => null)
    } catch {
      // Sound is optional; rating submission must still work.
    }
  }

  const playRatingSound = async () => {
    try {
      const context = contextRef.current
      const buffer = await bufferRef.current
      if (!context || !buffer || context.state !== 'running') return
      const source = context.createBufferSource()
      const volume = context.createGain()
      source.buffer = buffer
      volume.gain.value = 1
      source.connect(volume)
      volume.connect(context.destination)
      source.onended = () => { source.disconnect(); volume.disconnect() }
      source.start()
    } catch {
      // A blocked sound must not change successful rating feedback.
    }
  }

  return { prepareRatingSound, playRatingSound }
}
