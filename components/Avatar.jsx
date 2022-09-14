export default function Avatar({ big, src }) {
  const widthClass = big ? "w-24" : "w-12";
  return (
    <div className={"rounded-full overflow-hidden " + widthClass}>
      <img src={src} alt="avatar" referrerPolicy="no-referrer" />
    </div>
  );
}
