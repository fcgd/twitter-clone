export const Avatar = ({ src }) => {
  return (
    <div className="rounded-full overflow-hidden w-12">
      <img src={src} alt="avatar" referrerpolicy="no-referrer" />
    </div>
  );
};
