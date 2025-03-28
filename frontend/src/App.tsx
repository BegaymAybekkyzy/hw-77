import MessageForm from "./components/MessageForm/MessageForm.tsx";
import {Box, Typography, Grid, Container} from "@mui/material";
import Layout from "./components/Layout/Layout.tsx";
import {IMessage} from "./types";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {fetchAllMessages, submitNewMessage} from "./store/Messages/messagesThunks.ts";
import React, {useEffect} from "react";
import {selectFetchingLoading, selectMessages} from "./store/Messages/messagesSlice.ts";
import MessagesCard from "./components/MessagesCard/MessagesCard.tsx";
import Loader from "./components/UI/Loader/Loader.tsx";

const App = () => {
    const dispatch = useAppDispatch();
    const allMessages = useAppSelector(selectMessages);
    const fetchingLoading = useAppSelector(selectFetchingLoading);

    useEffect(() => {
        dispatch(fetchAllMessages());
    }, [dispatch, allMessages.length]);

    const onCreateNewProduct = async (message: IMessage) => {
        try {
            await dispatch(submitNewMessage(message));
            await dispatch(fetchAllMessages());
        } catch (e) {
            console.error(e);
        }
    };

    let content: React.ReactNode = <Typography variant="h4" sx={{textAlign: "center"}}>No messages yet</Typography>;

    if (fetchingLoading) {
        content = (
            <Box sx={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
                <Loader/>
            </Box>
        );
    }

    if (!fetchingLoading && allMessages.length > 0) {
        content = (
            <Grid container spacing={2} direction="row">
                {allMessages.map((message, index) => (
                    <MessagesCard
                        key={index + message.image}
                        message={message.message}
                        author={message.author}
                        image={message.image}
                    />
                ))}
            </Grid>

        );
    }

    return (
        <Layout>
            <Container>
                {content}
            </Container>

            <Box sx={{
                position: "sticky",
                bottom: 0,
                width: "100%",
                background: "white",
                zIndex: 1000,
                marginTop: "50px"
            }}>
                <hr/>
                <Box sx={{width: "50%", ml: "auto", mr: "auto"}}>
                    <MessageForm onSubmitProduct={onCreateNewProduct}/>
                </Box>
            </Box>
        </Layout>
    )
};

export default App
