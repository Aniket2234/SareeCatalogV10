export default function AnimatedBorder() {
  return (
    <div
      className="w-full overflow-hidden relative"
      data-testid="animated-border"
      style={{
        height: "60px",
        backgroundColor: "#FAF8F5",
        marginTop: "0px",
        marginBottom: "0px",
      }}
    >
      <div
        className="animate-scroll-horizontal absolute top-0 left-0 h-full"
        style={{
          display: "flex",
          width: "max-content",
        }}
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            style={{ display: "flex", height: "60px", flexShrink: 0 }}
          >
            <img
              src="/images/flower.svg"
              alt="decorative border"
              style={{
                height: "60px",
                width: "auto",
                display: "block",
                flexShrink: 0,
              }}
            />
            <img
              src="/images/flower.svg"
              alt="decorative border"
              style={{
                height: "60px",
                width: "auto",
                display: "block",
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-horizontal {
          animation: scroll-horizontal 200s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
