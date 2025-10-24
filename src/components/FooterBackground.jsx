const FooterBackground = () => {
  return (
    <>
      {/* 3D Grid Background - Perspective Cube */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Perspective Grid - Floor */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, 
                transparent 0%, 
                transparent 40%,
                rgba(0, 255, 255, 0.03) 40%,
                rgba(0, 255, 255, 0.03) 100%
              )
            `,
          }}
        >
          {/* Horizontal perspective lines */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0"
              style={{
                bottom: `${i * 8}%`,
                height: '1px',
                background: `linear-gradient(to right, 
                  transparent 0%, 
                  rgba(0, 255, 255, ${0.1 + i * 0.05}) ${20 - i}%, 
                  rgba(255, 0, 255, ${0.1 + i * 0.05}) 50%, 
                  rgba(0, 255, 255, ${0.1 + i * 0.05}) ${80 + i}%, 
                  transparent 100%
                )`,
                opacity: 0.6 - i * 0.03,
              }}
            />
          ))}
          
          {/* Vertical vanishing point lines */}
          {[...Array(20)].map((_, i) => {
            const position = (i / 19) * 100;
            const skew = Math.abs(50 - position) / 50;
            return (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${position}%`,
                  width: '1px',
                  background: `linear-gradient(to bottom, 
                    transparent 0%, 
                    rgba(0, 255, 255, ${0.15 * (1 - skew * 0.5)}) 40%, 
                    rgba(255, 0, 255, ${0.2 * (1 - skew * 0.5)}) 70%, 
                    transparent 100%
                  )`,
                  opacity: 0.4,
                  transform: `perspective(500px) rotateX(45deg)`,
                  transformOrigin: 'bottom center',
                }}
              />
            );
          })}
        </div>

        {/* Side walls effect */}
        <div 
          className="absolute inset-y-0 left-0 w-1/4"
          style={{
            background: `linear-gradient(to right, 
              rgba(255, 0, 255, 0.05) 0%, 
              transparent 100%
            )`,
          }}
        />
        <div 
          className="absolute inset-y-0 right-0 w-1/4"
          style={{
            background: `linear-gradient(to left, 
              rgba(0, 255, 255, 0.05) 0%, 
              transparent 100%
            )`,
          }}
        />
      </div>

      {/* City Skyline Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-5">
        {/* Building 1 - Left Edge */}
        <div className="absolute bottom-0 left-[2%] w-12 h-24 bg-black/80 border-l border-r border-cyan-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 40%, 50% 35%, 100% 40%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(0, 255, 255, 0.08)',
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1.5 bg-cyan-400/30"
              style={{
                left: `${30 + (i % 2) * 35}%`,
                top: `${50 + Math.floor(i / 2) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Building 2 */}
        <div className="absolute bottom-0 left-[5%] w-16 h-32 bg-black/80 border-l border-r border-cyan-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 20%, 20% 20%, 20% 10%, 80% 10%, 80% 20%, 100% 20%, 100% 100%)',
            boxShadow: '0 -20px 40px rgba(0, 255, 255, 0.1)',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-2 bg-cyan-400/30"
              style={{
                left: `${20 + (i % 3) * 25}%`,
                top: `${30 + Math.floor(i / 3) * 30}%`,
              }}
            />
          ))}
        </div>

        {/* Building 3 */}
        <div className="absolute bottom-0 left-[12%] w-14 h-28 bg-black/85 border-l border-r border-purple-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 35%, 100% 30%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(139, 92, 246, 0.08)',
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1.5 bg-purple-400/30"
              style={{
                left: `${25 + (i % 2) * 40}%`,
                top: `${45 + Math.floor(i / 2) * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Building 4 - Tall */}
        <div className="absolute bottom-0 left-[18%] w-20 h-40 bg-black/90 border-l border-r border-pink-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 0, 100% 0, 100% 100%)',
            boxShadow: '0 -20px 40px rgba(255, 0, 255, 0.1)',
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-2 bg-pink-400/30"
              style={{
                left: `${15 + (i % 4) * 20}%`,
                top: `${15 + Math.floor(i / 4) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Building 5 */}
        <div className="absolute bottom-0 left-[26%] w-12 h-28 bg-black/85 border-l border-r border-cyan-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 30%, 50% 25%, 100% 30%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(0, 255, 255, 0.08)',
          }}
        />

        {/* Building 6 */}
        <div className="absolute bottom-0 left-[32%] w-18 h-34 bg-black/80 border-l border-r border-pink-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 25%, 100% 20%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(255, 0, 255, 0.08)',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1.5 bg-pink-400/30"
              style={{
                left: `${20 + (i % 3) * 30}%`,
                top: `${35 + Math.floor(i / 3) * 30}%`,
              }}
            />
          ))}
        </div>

        {/* Building 7 - Center Tallest */}
        <div className="absolute bottom-0 left-[42%] w-24 h-44 bg-black/90 border-l border-r border-purple-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 12%, 10% 8%, 10% 3%, 90% 3%, 90% 8%, 100% 12%, 100% 100%)',
            boxShadow: '0 -25px 50px rgba(139, 92, 246, 0.12)',
          }}
        >
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-2 bg-purple-400/30"
              style={{
                left: `${10 + (i % 5) * 18}%`,
                top: `${20 + Math.floor(i / 5) * 22}%`,
              }}
            />
          ))}
        </div>

        {/* Building 8 */}
        <div className="absolute bottom-0 left-[52%] w-16 h-30 bg-black/85 border-l border-r border-cyan-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 30%, 50% 25%, 100% 30%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(0, 255, 255, 0.08)',
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1.5 bg-cyan-400/30"
              style={{
                left: `${25 + (i % 2) * 40}%`,
                top: `${40 + Math.floor(i / 2) * 30}%`,
              }}
            />
          ))}
        </div>

        {/* Building 9 */}
        <div className="absolute bottom-0 left-[60%] w-14 h-32 bg-black/80 border-l border-r border-pink-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 28%, 100% 25%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(255, 0, 255, 0.08)',
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1.5 bg-pink-400/30"
              style={{
                left: `${25 + (i % 2) * 40}%`,
                top: `${35 + Math.floor(i / 2) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Building 10 */}
        <div className="absolute bottom-0 right-[30%] w-16 h-32 bg-black/80 border-l border-r border-cyan-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 25%, 100% 20%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(0, 255, 255, 0.08)',
          }}
        />

        {/* Building 11 - Tall */}
        <div className="absolute bottom-0 right-[20%] w-20 h-38 bg-black/85 border-l border-r border-pink-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 0, 100% 0, 100% 100%)',
            boxShadow: '0 -20px 40px rgba(255, 0, 255, 0.1)',
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-2 bg-pink-400/30"
              style={{
                left: `${20 + (i % 3) * 30}%`,
                top: `${20 + Math.floor(i / 3) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Building 12 */}
        <div className="absolute bottom-0 right-[13%] w-18 h-30 bg-black/80 border-l border-r border-cyan-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 35%, 50% 30%, 100% 35%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(0, 255, 255, 0.08)',
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1.5 bg-cyan-400/30"
              style={{
                left: `${25 + (i % 2) * 40}%`,
                top: `${45 + Math.floor(i / 2) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Building 13 */}
        <div className="absolute bottom-0 right-[7%] w-14 h-34 bg-black/85 border-l border-r border-purple-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 20%, 20% 15%, 80% 15%, 100% 20%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(139, 92, 246, 0.08)',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-2 bg-purple-400/30"
              style={{
                left: `${25 + (i % 2) * 40}%`,
                top: `${30 + Math.floor(i / 2) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Building 14 */}
        <div className="absolute bottom-0 right-[2%] w-16 h-28 bg-black/80 border-l border-r border-pink-500/20"
          style={{
            clipPath: 'polygon(0 100%, 0 30%, 100% 25%, 100% 100%)',
            boxShadow: '0 -15px 30px rgba(255, 0, 255, 0.08)',
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1.5 bg-pink-400/30"
              style={{
                left: `${25 + (i % 2) * 40}%`,
                top: `${40 + Math.floor(i / 2) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Ground fog effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background: 'linear-gradient(to top, rgba(0, 255, 255, 0.05), transparent)',
          }}
        />
      </div>
    </>
  );
};

export default FooterBackground;
