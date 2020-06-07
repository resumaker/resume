import isEmpty from 'lodash.isempty';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FilePond, registerPlugin } from 'react-filepond';
import { Segment, Portal, Header, Button } from 'semantic-ui-react';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';

import Input from '../elements/input';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const styles = {
  portal: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 200,
    height: 150,
    zIndex: 1000,
    margin: 'auto',
    position: 'fixed',
  },
};

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const Summary = ({ data }) => {
  const filePond = useRef(null);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [invalidFile, setInvalidFile] = useState(false);

  const { mode, resume } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const setProfilePicture = src => 
    dispatch({
      type: 'SET_FIELD',
      payload: {
        path: 'resume.profilePicture',
        value: src,
      },
    });

  return (
    <section className="py-5 border-b border-neutral-300 lg:flex items-center">
      <div className="my-5" style={{width:'25%'}}>
        {isEdit ? (
          <FilePond
            files={files}
            ref={filePond}
            allowMultiple={false}
            onupdatefiles={async fileItems => {
              if (isEmpty(fileItems)) {
                setProfilePicture('./profile.png');
              } else {
                if (!fileItems[0].file.type.startsWith('image/')) {
                  if (filePond && filePond.current) {
                    filePond.current.removeFiles();
                  }
                  return setInvalidFile(true);
                }
                const base64Image = await toBase64(fileItems[0].file);
                setProfilePicture(base64Image);
              }
              setFiles(fileItems);
            }}
            labelIdle='Drag & Drop your profile picture or <span class="filepond--label-action">Browse</span>'
          />
        ) : (
          <img
            alt="profile"
            src={resume.profilePicture}
            style={{borderColor: '#eee'}}
            className="rounded-full border mx-auto w-32 lg:w-full xl:w-4/5"
          />
        )}
      </div>
      <div style={{width:'75%'}}>
        {mode === 'edit' ? (
          <Input type="textarea" value={data} path="resume.summary" />
        ) : (
          <p className="text-center tracking-wide leading-relaxed lg:text-left lg:mx-8 lg:text-lg">
            {data}
          </p>
        )}
      </div>

      <Portal onClose={() => setInvalidFile(false)} open={invalidFile}>
        <Segment style={styles.portal}>
          <Header>Invalid File Type</Header>
          <p className="mb-4">Only image files can be uploaded.</p>
          <Button
            negative
            content="Close"
            onClick={() => setInvalidFile(false)}
          />
        </Segment>
      </Portal>
    </section>
  );
};

export default Summary;
