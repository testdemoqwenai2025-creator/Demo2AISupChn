'use client'

import React from 'react'

export function HeroDecorations() {
  return (
    <>
      {/* Grid Background */}
      <div 
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Gradient Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10 animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[128px] -z-10 animate-pulse delay-1000" />
    </>
  )
}
