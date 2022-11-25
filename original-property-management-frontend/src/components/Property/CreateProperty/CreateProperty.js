import React, { useState, forwardRef, useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Slide,
  Dialog,
  DialogContent,
  DialogActions,
  LinearProgress,
  Card, styled, Chip
} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ResetIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';

import { InputCurrencyFormat } from 'components/InputCurrencyFormat/InputCurrencyFormat';
import { DialogTitleCustom } from 'components/DialogTitleCustom/DialogTitleCustom';
import { createProperty, getAllProperties } from 'services/PropertyService';
import { SnackbarCustom } from 'components/SnackbarCustom/SnackbarCustom';
//import { awsS3Upload } from 'services/FileService';
import { initialProperty, initValidProperty } from './InitialDatas';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Constants from 'Constants';
import './CreateProperty.scss';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const CreateProperty = (props) => {
  const [property, setProperty] = useState(initialProperty);
  const [propertyType, setPropertyType] = useState('');
  const [homeType, setHomeType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [validProperty, setValidProperty] = useState(initValidProperty);
  const [openAlert, setOpenAlert] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [selectedPictures, setSelectedPictures] = useState([]);
  const [pictureChips, setPictureChips] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const propertyState = useSelector((state) => state.property);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setProgress(0);
            closeForm();
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }
  }, [loading]);

  const openForm = () => {
    setIsOpenForm(true);
  };
  const closeForm = () => {
    setIsOpenForm(false);
  };

  const handleChange = (evt) => {
    if (['street', 'city', 'zipCode'].includes(evt.target.name)) {
      setProperty({
        ...property,
        location: {
          ...property.location,
          [evt.target.name]: evt.target.value,
        },
      });
    } else {
      setProperty({
        ...property,
        [evt.target.name]: evt.target.value,
      });
    }

    if (evt.target.name === 'propertyType') {
      setPropertyType(evt.target.value);
    }
    if (evt.target.name === 'homeType') {
      setHomeType(evt.target.value);
    }
    validateField(evt.target.name, evt.target.value);
  };

  const handleCapture = (evt) => {
    const timestamp = dayjs().unix();
    const selectedFile = renameFile(evt.target.files[0], timestamp);
    const length = selectedPictures.length;
    const newPictureChip = { key: length + 1, label: selectedFile.name, main: length === 0 ? true : false };
    setPictureChips((prevChips) => [...prevChips, newPictureChip]);
    setSelectedPictures((prevSeletectPics) => [...prevSeletectPics, selectedFile]);
    setFileNames((prevFileNames) => [...prevFileNames, selectedFile.name]);
  };

  const renameFile = (originalFile, suffix) => {
    let name = originalFile.name;
    const idx = name.lastIndexOf('.');
    const newName = name.substring(0, idx) + `-${suffix}` + name.substring(idx);
  
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified
    });
  }

  const handleDelete = (deletedPicture) => {
    const idx = deletedPicture.key;
    setPictureChips(prev => prev.filter(item => item.key !== deletedPicture.key));
    setSelectedPictures((prevSelectedPics) => [...prevSelectedPics.slice(0, idx - 1), ...prevSelectedPics.slice(idx)]);
    setFileNames((prevFileNames) => [...prevFileNames.slice(0, idx - 1), ...prevFileNames.slice(idx)]);
  };

  const selectMainItem = (selectedPicture) => {
    const idxMain = selectedPicture.key;
    const nameMain = selectedPicture.label;
    setPictureChips(prevChips => {
      return prevChips.map(item => {
        if (item.key === idxMain) {
          item.main = true;
        } else {
          item.main = false;
        }
        return item;
      });
    });
    const tmpPictures = [...selectedPicture];
    tmpPictures.sort(function (x, y) { return x.name === nameMain ? -1 : y.name === nameMain ? 1 : 0; });
    setSelectedPictures(tmpPictures);
    const tmpFileName = [...fileNames];
    tmpFileName.sort(function (x, y) { return x === nameMain ? -1 : y === nameMain ? 1 : 0; });
    setFileNames(tmpFileName);
  }

  const handleReset = () => {
    setProperty(initialProperty);
    setHomeType('');
    setPropertyType('');
    setSelectedPictures([]);
    setPictureChips([]);
    setFileNames([]);
  };
  
  const validateField = (fieldName, fieldValue) => {
    let message = '';
    if (['street', 'city', 'zipCode'].includes(fieldName)) {
      if (fieldValue === '') {
        message = `${fieldName} is invalid!`;
      }
    } else if (!['overview', 'availableDate'].includes(fieldName)) {
      if (fieldValue === '') {
        message = `${fieldName} is invalid!`;
      } else {
        return message;
      }
    }
    setValidProperty({
      ...validProperty,
      [fieldName]: message
    })
  }

  const validateForm = () => {
    let flag = true;
    for (const key in property) {
      if (!['location', 'overview', 'availableDate'].includes(key) && property[key] === '') {
        flag = flag && false;
      } else if (key === 'location') {
        if (property.location.street === ''
          || property.location.city === ''
          || property.location.zipCode === '')
          flag = flag && false;
      }
    }
    setFormValid(flag);
  }

  useEffect(() => {
    validateForm();
  }, [property]);
  
  // const handleSave = () => {
  //   if (formValid) {
  //     setLoading(true);
  //     const price = parseFloat(property.price.substring(1).replace(/,/g, ''));
  //     const saveProperty = {
  //       ...property,
  //       price: price,
  //       pictures: fileNames
  //     };
  //     dispatch(createProperty(saveProperty))
  //       .then(async (response) => {
  //         //put images to aws s3
  //         const presignUrls = response.payload.presignPictures;
  //         await Promise.all(presignUrls.map((url, idx) => {
  //           return awsS3Upload(url, selectedPictures[idx]);
  //         }));
  //         dispatch(getAllProperties());
  //         //close dialog
  //         setLoading(false);
  //         closeForm();
  //         setOpenAlert(true);
  //         setAlertContent('Property is saved successful!');
  //       })
  //       .catch((error) => {
  //         if (error.message) {
  //           setAlertContent(error.message);
  //         } else {
  //           //status
  //           setAlertContent('You have not permission for this feature!'); 
  //         }
  //       });
  //   } else {
  //     //validation false
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Stack direction='row' spacing={2}>
        <Button onClick={openForm} variant='contained' startIcon={<AddIcon />}>
          Create
        </Button>
      </Stack>
      <Dialog
        open={isOpenForm}
        TransitionComponent={Transition}
        scroll={'paper'}
        //onClose={closeForm}
      >
        <LinearProgress variant='determinate' value={progress}></LinearProgress>
        <DialogTitleCustom id='dialog-title' onClose={closeForm} >
          Property Create
        </DialogTitleCustom>
        
        <DialogContent dividers={true}>
          <Grid container spacing={3} className='grid'>
            <Grid item xs={12} sm={6}>
              <TextField
                error={validProperty.price !== '' ? true : false}
                helperText={validProperty.price}
                label='Price'
                variant='standard'
                type='text'
                id='price'
                name='price'
                fullWidth
                required
                value={property.price}
                onChange={handleChange}
                InputProps={{
                  inputComponent: InputCurrencyFormat,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={validProperty.numOfRoom !== '' ? true : false}
                helperText={validProperty.numOfRoom}
                id='numOfRoom'
                name='numOfRoom'
                label='Num of room'
                variant='standard'
                value={property.numOfRoom}
                onChange={handleChange}
                type='number'
                inputProps={{
                  min: 1
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant='standard' required fullWidth
                error={validProperty.propertyType !== '' ? true : false}
              >
                <InputLabel htmlFor='propertyType'>Property Type</InputLabel>
                <Select
                  id='propertyType'
                  name='propertyType'
                  value={propertyType}
                  label='Property Type'
                  onChange={handleChange}
                >
                  <MenuItem value=''>
                    <em>Select property type</em>
                  </MenuItem>
                  {Constants.PROPERTY_TYPE.length > 0 &&
                    Constants.PROPERTY_TYPE.map((value, idx) => (
                      <MenuItem value={value} key={idx}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
                {
                  validProperty.propertyType !== '' && 
                  <FormHelperText className='capitalize'>{validProperty.propertyType}</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant='standard' required fullWidth
                error={validProperty.homeType !== '' ? true : false}
              >
                <InputLabel htmlFor='homeType'>Home Type</InputLabel>
                <Select
                  id='homeType'
                  name='homeType'
                  value={homeType}
                  label='Home Type'
                  onChange={handleChange}
                >
                  <MenuItem value=''>
                    <em>Select home type</em>
                  </MenuItem>
                  {Constants.HOME_TYPE.length > 0 &&
                    Constants.HOME_TYPE.map((value, idx) => (
                      <MenuItem value={value} key={idx}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
                {
                  validProperty.homeType !== '' &&
                  <FormHelperText className='capitalize'>{validProperty.homeType}</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={validProperty.street !== '' ? true : false}
                helperText={validProperty.street}
                id='street'
                name='street'
                label='Street'
                variant='standard'
                fullWidth
                required
                value={property.location.street}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={validProperty.city !== '' ? true : false}
                helperText={validProperty.city}
                id='city'
                name='city'
                label='City'
                variant='standard'
                fullWidth
                required
                value={property.location.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={validProperty.zipCode !== '' ? true : false}
                helperText={validProperty.zipCode}
                id='zipCode'
                name='zipCode'
                label='Zip Code'
                variant='standard'
                fullWidth
                required
                value={property.location.zipCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='overview'>Overview</InputLabel>
              <TextareaAutosize
                id='overview'
                name='overview'
                rows={5}
                aria-label='maximum height'
                value={property.overview}
                style={{ width: '100%', height: '60px' }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputLabel htmlFor='availableDate'>Available Date</InputLabel>
                <DatePicker
                  id='availableDate'
                  name='availableDate'
                  inputFormat='MM/DD/YYYY'
                  minDate={dayjs('01-01-2022')}
                  value={property.availableDate}
                  onChange={(newValue) => {
                    setProperty({
                      ...property,
                      availableDate: newValue,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' component='label' startIcon={<CloudUploadIcon />}>
                Upload Pictures
                <input
                  hidden
                  accept=".jpg, .png, .jpeg, .webp"
                  multiple
                  type='file'
                  id='pictures'
                  onChange={handleCapture}
                />
              </Button>
              {
                selectedPictures.length > 0 && pictureChips.length > 0 &&
                <Card spacing={2}  className='picture-capture' id='pictureContent'>
                  {
                    pictureChips.map(pic => (
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
              
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type='reset'
            variant='outlined'
            startIcon={<ResetIcon />}
            onClick={handleReset}
          >
            Clear
          </Button>
          <Button
            type='button'
            variant='contained'
            startIcon={<SaveIcon />}
            //onClick={handleSave}
            disabled={!formValid}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarCustom
        vertical='top'
        horizontal='right'
        open={openAlert}
        autoHideDuration={500}
        severity="success"
        closed={() => setOpenAlert(!openAlert)}
      >{alertContent}</SnackbarCustom>
    </>
  );
};
