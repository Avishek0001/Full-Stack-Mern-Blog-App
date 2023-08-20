import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function Editor({name,value,onChange}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <div className="content">
    <ReactQuill
      name="description"
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
    </div>
  );
}