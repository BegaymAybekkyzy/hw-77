import React from 'react';
import {Button, TextField} from "@mui/material";
import Grid from '@mui/material/Grid';
import {IMessage} from "../../types";
import {zodResolver} from "@hookform/resolvers/zod";
import {messageSchema} from "../../zodSchemas/messagesSchemas.ts";
import {useForm} from "react-hook-form";
import FileInput from "../UI/FileInput/FileInput.tsx";

interface Props {
    onSubmitProduct: (product: IMessage) => void;
}

const MessageForm: React.FC<Props> = ({onSubmitProduct}) => {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm(
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
                            sx={{marginBottom: 2}}
                        />
                    </Grid>
                </Grid>

                <Grid sx={{marginBottom: 2}}>
                    <FileInput onChange={fileInputChangeHandler} name="image" label="image"/>
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{background: "#6A5ACD"}}
                    >Send</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MessageForm;