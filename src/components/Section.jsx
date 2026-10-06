export default function Section({ id, title, children }) {
  // Section Component
  return (
    <div id={id} className="py-10 scroll-mt-[136px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );
}
