import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInput {
  [index: string]: string | number;
  name: string;
  companyType: number;
  companyPurpose: number;
  clientPhoneFirst: string;
  clientPhoneSecond: string;
  clientEmail: string;
}

const phoneRegExp = /^(\d{2,3})?[- ]?(\d{3,4})[- ]?(\d{4})$/;
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schema = yup.object({
  name: yup
    .string()
    .max(100, 'Max 100 characters')
    .required('Required'),
  companyType: yup
    .number()
    .min(1, 'Required')
    .max(3, 'Required')
    .required('Required'),
  companyPurpose: yup
    .number()
    .min(1, 'Required')
    .max(4, 'Required')
    .required('Required'),
  clientPhoneFirst: yup
    .string()
    .matches(phoneRegExp, 'Invalid format phone number'),
  clientPhoneSecond: yup
    .string()
    .matches(phoneRegExp, 'Invalid format phone number'),
  clientEmail: yup
    .string()
    .matches(emailRegExp, 'Invalid format email'),
});

function App() {
  const [values, setValues] = useState({ 
    name: '',
    companyType: 0,
    companyPurpose: 0,
    clientPhoneFirst: '',
    clientPhoneSecond: '',
    clientEmail: '',
  });
  const companyType = [
    {
      label: 'No data',
      value: 0
    },
    {
      label: 'Company',
      value: 1
    },
    {
      label: 'Government',
      value: 2
    },
    {
      label: 'School',
      value: 3
    }
  ];
  const companyPurpose = [
    {
      label: 'No data',
      value: 0
    },
    {
      label: 'Demo',
      value: 1
    },
    {
      label: 'Sell',
      value: 3
    },
    {
      label: 'Test',
      value: 4
    }
  ];
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    for (let key in data) {
      data[key] = (data[key] === undefined) ? '' : data[key];
    }
    setValues(data);
  };

  useEffect(() => {
    console.log(values);
  }, [values])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => 
        <TextField 
          autoFocus
          margin='dense'
          label='Name'
          fullWidth
          variant='outlined'
          error={Boolean(errors.name)} 
          helperText={errors.name ? errors.name?.message : ''} 
          {...field} 
        />}
      />
      <Controller
        name="companyType"
        control={control}
        render={({ field }) => 
        <TextField 
          select
          margin='dense'
          label='Type'
          fullWidth
          variant='outlined'
          error={Boolean(errors.companyType)} 
          helperText={errors.companyType ? errors.companyType?.message : ''} 
          {...field}>
          {companyType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>}
      />
      <Controller
        name="companyPurpose"
        control={control}
        render={({ field }) => 
        <TextField 
          select
          margin='dense'
          label='Purpose'
          fullWidth
          variant='outlined'
          error={Boolean(errors.companyPurpose)} 
          helperText={errors.companyPurpose ? errors.companyPurpose?.message : ''} 
          {...field}>
          {companyPurpose.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>}
      />
      <Controller
        name="clientPhoneFirst"
        control={control}
        render={({ field }) => 
        <TextField 
          margin='dense'
          label='Phone 1'
          fullWidth
          variant='outlined'
          error={Boolean(errors.clientPhoneFirst)} 
          helperText={errors.clientPhoneFirst ? errors.clientPhoneFirst?.message : ''} 
          {...field} 
        />}
      />
      <Controller
        name="clientPhoneSecond"
        control={control}
        render={({ field }) => 
        <TextField 
          margin='dense'
          label='Phone 2'
          fullWidth
          variant='outlined'
          error={Boolean(errors.clientPhoneSecond)} 
          helperText={errors.clientPhoneSecond ? errors.clientPhoneSecond?.message : ''} 
          {...field} 
        />}
      />
      <Controller
        name="clientEmail"
        control={control}
        render={({ field }) => 
        <TextField 
          margin='dense'
          label='Email'
          fullWidth
          variant='outlined'
          error={Boolean(errors.clientEmail)} 
          helperText={errors.clientEmail ? errors.clientEmail?.message : ''} 
          {...field}
        />}
      />
      <Button type='submit' variant="outlined">Submit</Button>
    </form>
  );
}

export default App;
