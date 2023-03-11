import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './BackLink.css';

const BackLink = () => {
  const navigate = useNavigate();

  const handleGoBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Button variant="outlined" onClick={handleGoBack} className="back-link">Back</Button>
  );
};

export default BackLink;
