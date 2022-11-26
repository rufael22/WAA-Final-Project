import React, { useState } from 'react';
import { Button, Card, styled, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import './MultiUploader.scss';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const initChip = [
  { key: 0, label: 'Angular', main: true },
  { key: 1, label: 'jQuery', main: false },
  { key: 2, label: 'Polymer', main: false },
  { key: 3, label: 'React', main: false },
  { key: 4, label: 'Vue.js', main: false }
];

export const MultiUploader = (props) => {
  const { id, label, picker, pictures, ...other  } = props;
  const [selectedPictures, setSelectedPictures] = useState([]);

  const onChange = async (evt) => {
  }

  const handleCapture = (evt) => {
    const selectedFiles = Array.prototype.slice.call(evt.target.files);
  }
  const handleDelete = (deletedItem) => {
    setSelectedPictures(prev => prev.filter(item => item.key !== deletedItem.key));
  }
  const selectMainItem = (selectedItem) => {
    setSelectedPictures(old => {
      return old.map(item => {
        if (item.key === selectedItem.key) {
          item.main = true;
        } else {
          item.main = false;
        }
        return item;
      });
    })
  }

  return (
    <>
      <Button variant='contained' component='label' startIcon={<CloudUploadIcon />} {...other}>
        {label}
        <input
          hidden
          accept=".jpg, .png, .jpeg, .webp"
          multiple
          type='file'
          id={id}
          onChange={handleCapture}
        />
      </Button>
      {
        selectedPictures.length > 0 &&
        <Card spacing={2}  className='picture-capture' id='pictureContent'>
          {
            selectedPictures.map(pic => (
              <ListItem
                key={pic.key}
              >
                <Chip
                  variant="outlined"
                  label={pic.label}
                  onDelete={() => handleDelete(pic)}
                  onClick={() => selectMainItem(pic)}
                  color={pic.main === true ? 'primary' : undefined}
                />
              </ListItem>
            ))
          }
        </Card>
      }
      
      {/* <Button variant='contained' startIcon={<CloudUploadIcon />}>
        {labelUpload}
      </Button> */}
    </>
  )
}
