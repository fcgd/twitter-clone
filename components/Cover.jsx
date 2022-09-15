import EditableImage from "./EditableImage";

export default function Cover({ src, onChange, editable }) {
  return (
    <EditableImage
      src={src}
      onChange={onChange}
      editable={editable}
      className={"h-36"}
    />
  );
}
