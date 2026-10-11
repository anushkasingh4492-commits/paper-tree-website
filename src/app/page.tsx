
export default function Home() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        overflow: "auto",
      }}
    >
      <iframe
        src="/index.html"
        title="Paper Tree Educational Studio"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          border: "none",
        }}
      />
    </main>
  );
}
