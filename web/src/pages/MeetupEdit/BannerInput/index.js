import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput({ name }) {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;
    setPreview(url);
    setFile(id);
  }

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor="avatar">
        {!preview && (
          <div>
            <MdCameraAlt size={55} />
            <p>Selectionar imagem</p>
          </div>
        )}

        {preview && <img src={preview} alt="" />}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
          data-file={file}
          ref={ref}
        />
      </label>

      {error && <span>{error}</span>}
    </Container>
  );
}
