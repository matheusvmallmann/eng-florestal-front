import { Button, Grid, Typography } from '@mui/material';
import { Form } from '@unform/web';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { TextField } from '../../../components/unform';
import Select from '../../../components/unform/Select';
import SelecionaAmostragemButton from '../components/SelecionaAmostragemButton';
import { TAmostragemTab } from '../types/tabs';
import FormBase from './forms/FormBase';
import AmostragemSimplesForm from './forms/Simples';
import AmostragemSistematicaForm from './forms/Sistematica';

type TFormData = {
  title: string;
};

type TEnviarAmostragemTemplateProps = {
  formErrors: { [key: string]: string };
  amostragens: TAmostragemTab[];
  onAmostragemChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (data: any) => void;
};

const EnviarAmostragemTemplate = ({
  formErrors,
  amostragens,
  onAmostragemChange,
  onFormSubmit,
}: TEnviarAmostragemTemplateProps) => {
  const formRef = useRef<any>(null);
  const [amostragem, setAmostragem] = useState<string>('sistematica');

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setErrors(formErrors);
    }
  }, [formErrors]);

  const handleAmostragemChange = (value: string) => {
    setAmostragem(value);
  };

  const forms: { [key: string]: ReactNode } = {
    // simples: <AmostragemSimplesForm />,
    sistematica: <AmostragemSistematicaForm />,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Envio de amostragem</Typography>
      </Grid>

      <Grid item xs={12}>
        <FormBase
          amostragens={amostragens}
          onSubmit={(data) => {
            console.log(data);
          }}
          onAmostragemChange={handleAmostragemChange}
        >
          {forms[amostragem]}
        </FormBase>
      </Grid>
    </Grid>
  );
};

export default EnviarAmostragemTemplate;
