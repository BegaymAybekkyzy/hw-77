import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import Grid from '@mui/material/Grid';
import {IMessage} from "../../types";
import {zodResolver} from "@hookform/resolvers/zod";
import {messageSchema} from "../../zodSchemas/messagesSchemas.ts";
import {useForm} from "react-hook-form";
import FileInput from "../UI/FileInput/FileInput.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectSendingLoading} from "../../store/Messages/messagesSlice.ts";

interface Props {
    onSubmitProduct: (product: IMessage) => void;
}

const MessageForm: React.FC<Props> = ({onSubmitProduct}) => {
    const loading = useAppSelector(selectSendingLoading);
    const [fileInputReset, setFileInputReset] = useState(false);

    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm(
        {
            resolver: zodResolver(messageSchema),
            defaultValues: {
                author: "",
                message: "",
                image: null,
            }
        });

    const onSubmitForm = async (data: IMessage) => {
        onSubmitProduct({...data});
        reset();
        setFileInputReset(true)
    };

    const fileInputChangeHandler = (eFile: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = eFile.target;

        if (files) {
            setValue('image', files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container direction="column">
                <Grid>
                    <TextField
                        label="Enter your name"
                        fullWidth
                        {...register("author")}
                        variant="outlined"
                        disabled={loading}
                        sx={{marginBottom: 2}}
                    />
                </Grid>

                <Grid>
                    <Grid>
                        <TextField
                            fullWidth
                            label="Enter a message"
                            {...register("message")}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            variant="outlined"
                            disabled={loading}
                            sx={{marginBottom: 2}}
                        />
                    </Grid>
                </Grid>

                <Grid sx={{marginBottom: 2}}>
                    <FileInput
                        disabled={loading}
                        onChange={fileInputChangeHandler}
                        name="image"
                        resetFileInput={() => setFileInputReset(!fileInputReset)}
                        label="365x240 image"/>
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{background: "#6A5ACD"}}
                    >Send</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MessageForm;