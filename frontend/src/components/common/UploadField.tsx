import { useState } from "react";
import { File, Upload, X } from "lucide-react";

export default function UploadField() {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className="upload-field">
      <span className="field-label">Priloge</span>
      <label className="upload-dropzone">
        <Upload size={22} />
        <strong>Izberi datoteke</strong>
        <input
          type="file"
          multiple
          aria-label="Izberi priloge"
          onChange={(event) =>
            setFiles(Array.from(event.target.files || [], (file) => file.name))
          }
        />
      </label>
      {files.length > 0 && (
        <ul className="upload-file-list">
          {files.map((file, index) => (
            <li key={`${file}-${index}`}>
              <File size={15} />
              <span>{file}</span>
              <button
                type="button"
                className="icon-button"
                aria-label={`Odstrani datoteko ${file}`}
                onClick={() =>
                  setFiles((current) => current.filter((_, i) => i !== index))
                }
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
