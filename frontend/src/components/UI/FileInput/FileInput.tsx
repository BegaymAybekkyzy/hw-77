import {useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {Button, TextField} from "@mui/material";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    helperText?: string;
    errors?: boolean;
    disabled?: boolean;
    resetFileInput?: () => void;
}

const FileInput: React.FC<Props> = (
    {onChange, name, label, helperText, errors = false, disabled = false, resetFileInput}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState('');

    useEffect(() => {
        setFilename('');
    }, []);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }

        onChange(e);
    };

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(() => {
        setFilename('');
    }, [resetFileInput]);

    return (
        <>
            <input
                style={{display: 'none'}}
                type="file"
                name={name}
                disabled={disabled}
                onChange={onFileChange}
                ref={inputRef}
            />

            <Grid container spacing={2} direction="row" alignItems="center">
                <Grid>
                    <TextField
                        disabled
                        label={label}
                        value={filename}
                        onClick={activateInput}
                        error={errors}
                        helperText={helperText}
                    />
                </Grid>
                <Grid>
                    <Button disabled={disabled} variant="contained" onClick={activateInput}>
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;